import "server-only";
import { put, head, del } from "@vercel/blob";
import { promises as fs } from "fs";
import path from "path";

// JSON key-value store on Vercel Blob. Keys (unchanged from v1 so existing
// families keep their data):
//   accounts/<id>.json            public account (no secrets)
//   secrets/<id>.json             password / PIN hashes
//   names/<slug>.json             family name → account id
//   progress/<acc>/<profile>.json learner progress
//   ratelimit/<scope>-<id>.json   failed-attempt counters
// Blob URLs are never sent to the browser.
//
// For local end-to-end testing only: set LOCAL_BLOB_DIR (ignored in production)
// to store the same keys as files on disk.

const LOCAL_DIR = process.env.NODE_ENV !== "production" ? process.env.LOCAL_BLOB_DIR : undefined;

function localPath(key: string): string {
  const safe = key.replace(/\.\.+/g, "").replace(/^\/+/, "");
  return path.join(LOCAL_DIR as string, safe);
}

export function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN || !!LOCAL_DIR;
}

function isNotFound(e: unknown): boolean {
  if (e && typeof e === "object" && "name" in e && (e as { name: string }).name === "BlobNotFoundError") return true;
  return e instanceof Error && /not.?found/i.test(e.message);
}

export async function readJson<T>(key: string): Promise<T | null> {
  if (LOCAL_DIR) {
    try {
      return JSON.parse(await fs.readFile(localPath(key), "utf8")) as T;
    } catch (e) {
      if ((e as NodeJS.ErrnoException).code === "ENOENT") return null;
      throw e;
    }
  }
  let url: string;
  try {
    url = (await head(key)).url;
  } catch (e) {
    if (isNotFound(e)) return null;
    throw e;
  }
  const res = await fetch(`${url}?t=${Date.now()}`, { cache: "no-store" });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Blob read failed (${res.status})`);
  return (await res.json()) as T;
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  if (LOCAL_DIR) {
    const p = localPath(key);
    await fs.mkdir(path.dirname(p), { recursive: true });
    await fs.writeFile(p, JSON.stringify(value));
    return;
  }
  await put(key, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    contentType: "application/json",
  });
}

export async function deleteJson(key: string): Promise<void> {
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
}
