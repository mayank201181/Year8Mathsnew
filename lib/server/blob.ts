import "server-only";
import { put, head, del, BlobNotFoundError, BlobPreconditionFailedError } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

// JSON key-value store on Vercel Blob. Keys (unchanged from v1 so existing
// families keep their data):
//   accounts/<id>.json            public account (no secrets)
//   secrets/<id>.json             password / PIN hashes
//   names/<slug>.json             family name → account id
//   progress/<acc>/<profile>.json learner progress
//   ratelimit/<scope>-<id>.json   attempt counters and daily allowances
// Blob URLs are never sent to the browser.
//
// For local end-to-end testing only: set LOCAL_BLOB_DIR (ignored in production)
// to store the same keys as files on disk.

const LOCAL_DIR = process.env.NODE_ENV !== "production" ? process.env.LOCAL_BLOB_DIR : undefined;

const PUT_OPTIONS = { access: "public", addRandomSuffix: false, cacheControlMaxAge: 0, contentType: "application/json" } as const;

function localPath(key: string): string {
  const safe = key.replace(/\.\.+/g, "").replace(/^\/+/, "");
  return path.join(LOCAL_DIR as string, safe);
}

export function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN || !!LOCAL_DIR;
}

// The library's error classes don't set `name` (it stays "Error") and BlobNotFoundError's
// message is "Vercel Blob: The requested blob does not exist", so match the class itself.
function isNotFound(e: unknown): boolean {
  if (e instanceof BlobNotFoundError) return true;
  if (e && typeof e === "object" && "name" in e && (e as { name: string }).name === "BlobNotFoundError") return true;
  return e instanceof Error && /not.?found|requested blob does not exist/i.test(e.message);
}

/** A create-only write found the key already taken. */
function isAlreadyExists(e: unknown): boolean {
  return e instanceof Error && /already exists/i.test(e.message);
}

/** Another writer got there first: the ETag no longer matches (or the blob went), or the key was created. */
function isWriteConflict(e: unknown): boolean {
  return e instanceof BlobPreconditionFailedError || isNotFound(e) || isAlreadyExists(e) || (e instanceof Error && /precondition/i.test(e.message));
}

interface Tagged<T> {
  value: T | null;
  found: boolean;
  /** The ETag the value was read at (Blob only). */
  etag?: string;
}
const MISSING = { value: null, found: false } as const;

async function readTagged<T>(key: string): Promise<Tagged<T>> {
  if (LOCAL_DIR) {
    try {
      return { value: JSON.parse(await fs.readFile(localPath(key), "utf8")) as T, found: true };
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return MISSING;
      throw e;
    }
  }
  let meta: { url: string; etag: string };
  try {
    meta = await head(key);
  } catch (e) {
    if (isNotFound(e)) return MISSING;
    throw e;
  }
  // If a write lands between head() and this fetch, the body is newer than the ETag and a
  // conditional write with it fails (and is retried), so nothing is lost.
  const res = await fetch(`${meta.url}?t=${Date.now()}`, { cache: "no-store" });
  if (res.status === 404) return MISSING;
  if (!res.ok) throw new Error(`Blob read failed (${res.status})`);
  return { value: (await res.json()) as T, found: true, etag: meta.etag };
}

export async function readJson<T>(key: string): Promise<T | null> {
  return (await readTagged<T>(key)).value;
}

/** Write via a temp file so a concurrent reader never sees half a file. `create` fails with EEXIST if the key exists. */
async function writeLocal(key: string, data: string, create = false): Promise<void> {
  const p = localPath(key);
  await fs.mkdir(path.dirname(p), { recursive: true });
  const tmp = `${p}.${process.pid}.${Math.random().toString(36).slice(2)}.tmp`;
  await fs.writeFile(tmp, data);
  try {
    if (create) await fs.link(tmp, p);
    else await fs.rename(tmp, p);
  } finally {
    await fs.rm(tmp, { force: true });
  }
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  if (LOCAL_DIR) return writeLocal(key, JSON.stringify(value));
  await put(key, JSON.stringify(value), { ...PUT_OPTIONS, allowOverwrite: true });
}

/** Create `key` only if it doesn't exist yet. False when it already does (someone else got it). */
export async function createJson(key: string, value: unknown): Promise<boolean> {
  try {
    if (LOCAL_DIR) await writeLocal(key, JSON.stringify(value), true);
    else await put(key, JSON.stringify(value), { ...PUT_OPTIONS, allowOverwrite: false });
    return true;
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === "EEXIST" || (!LOCAL_DIR && isAlreadyExists(e))) return false;
    // Don't rely on the wording of the error: if the key exists now, someone else created it.
    if (!LOCAL_DIR && (await readTagged(key).catch(() => MISSING)).found) return false;
    throw e;
  }
}

// Read-modify-write cycles on one key run one at a time within this instance.
const queues = new Map<string, Promise<void>>();
function withKeyLock<R>(key: string, task: () => Promise<R>): Promise<R> {
  const run = (queues.get(key) ?? Promise.resolve()).then(task);
  const done = run.then(
    () => {},
    () => {},
  );
  queues.set(key, done);
  void done.then(() => {
    if (queues.get(key) === done) queues.delete(key);
  });
  return run;
}

const UPDATE_TRIES = 6;

/**
 * Read-modify-write one JSON document without losing a concurrent update.
 * `mutate` gets the current value (null when missing) and returns the new value, or null to
 * leave the document as it is. It may run more than once, so it must not have side effects.
 * Callers on this instance are queued; across instances the write is conditional on the ETag
 * that was read (create-only when the key was missing), and a clash re-reads and re-applies.
 * Returns the document as it now stands and whether this call changed it. Throws on storage
 * errors or if the key stays contended.
 */
export async function updateJson<T>(key: string, mutate: (current: T | null) => T | null): Promise<{ value: T | null; changed: boolean }> {
  return withKeyLock(key, async () => {
    for (let attempt = 1; attempt <= UPDATE_TRIES; attempt++) {
      const { value, found, etag } = await readTagged<T>(key);
      const next = mutate(value);
      if (next === null) return { value, changed: false };
      try {
        if (LOCAL_DIR) await writeLocal(key, JSON.stringify(next));
        // (No ETag on an existing blob shouldn't happen; then fall back to a plain overwrite.)
        else await put(key, JSON.stringify(next), { ...PUT_OPTIONS, ...(!found ? { allowOverwrite: false } : etag ? { ifMatch: etag } : { allowOverwrite: true }) });
        return { value: next, changed: true };
      } catch (e) {
        if (LOCAL_DIR) throw e;
        // A create-only write that failed for any reason counts as a clash if the key exists now.
        const clash = isWriteConflict(e) || (!found && (await readTagged(key).catch(() => MISSING)).found);
        if (!clash) throw e;
        await new Promise((r) => setTimeout(r, 25 * attempt + Math.random() * 75));
      }
    }
    throw new Error(`Blob update kept clashing: ${key}`);
  });
}

export async function deleteJson(key: string): Promise<void> {
  await withKeyLock(key, async () => {
    if (LOCAL_DIR) {
      await fs.rm(localPath(key), { force: true });
      return;
    }
    try {
      const meta = await head(key);
      await del(meta.url);
    } catch {
      /* already gone */
    }
  });
}
