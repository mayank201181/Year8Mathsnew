import "server-only";
import { readJson, writeJson, deleteJson } from "./blob";

// Failed-attempt counters stored in Blob so they survive across serverless
// instances. After MAX failures the scope is locked for LOCK_MS.
const MAX = 5;
const LOCK_MS = 15 * 60 * 1000;
const WINDOW_MS = 60 * 60 * 1000;

interface Counter {
  fails: number;
  first: number;
  until: number;
}

const key = (scope: string, id: string) => `ratelimit/${scope}-${id.replace(/[^a-z0-9-]/gi, "")}.json`;

/** Seconds remaining on a lock (0 = not locked). */
export async function lockedFor(scope: string, id: string): Promise<number> {
  const c = await readJson<Counter>(key(scope, id)).catch(() => null);
  if (!c || !c.until) return 0;
  const left = c.until - Date.now();
  return left > 0 ? Math.ceil(left / 1000) : 0;
}

/** Record a failure; returns how many tries remain before a lock. */
export async function recordFailure(scope: string, id: string): Promise<number> {
  const now = Date.now();
  let c = await readJson<Counter>(key(scope, id)).catch(() => null);
  if (!c || now - c.first > WINDOW_MS || (c.until && c.until < now)) c = { fails: 0, first: now, until: 0 };
  c.fails += 1;
  if (c.fails >= MAX) c.until = now + LOCK_MS;
  await writeJson(key(scope, id), c).catch(() => {});
  return Math.max(0, MAX - c.fails);
}

export async function clearFailures(scope: string, id: string): Promise<void> {
  await deleteJson(key(scope, id));
}

// Lightweight per-instance throttle for expensive endpoints (AI tutor).
const buckets = new Map<string, { count: number; reset: number }>();
export function throttle(id: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  const b = buckets.get(id);
  if (!b || b.reset < now) {
    buckets.set(id, { count: 1, reset: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}
