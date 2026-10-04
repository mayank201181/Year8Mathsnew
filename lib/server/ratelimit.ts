import "server-only";
import { createHmac } from "crypto";
import { deleteJson, updateJson } from "./blob";

// Attempt counters for sign-in, the parent PIN and sign-up. Each attempt is counted
// *before* the password or PIN is checked, in one read-modify-write that can't lose a
// concurrent update (updateJson), so a burst of parallel guesses can't all slip past the
// lock. Counters live in Blob so they hold across serverless instances; an in-memory copy
// also stops a burst on one instance before it costs any Blob round-trips.

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

export interface Rule {
  /** Attempts allowed in the window; the one that reaches it starts the lock. */
  max: number;
  windowMs: number;
  lockMs: number;
}

/** Stored as ratelimit/<scope>-<id>.json (field names unchanged from v1). */
export interface Counter {
  fails: number;
  first: number;
  until: number;
}

/** Parent PIN, per account: strict, since a signed-in child could otherwise try every 4-digit PIN. */
export const PIN_RULE: Rule = { max: 5, windowMs: HOUR, lockMs: 15 * MINUTE };
/** Sign-in, per account + client: a stranger can only lock out themselves. */
export const LOGIN_CLIENT_RULE: Rule = { max: 5, windowMs: HOUR, lockMs: 15 * MINUTE };
/** Sign-in, per account across all clients: bounds guessing spread over many addresses. */
export const LOGIN_ACCOUNT_RULE: Rule = { max: 50, windowMs: HOUR, lockMs: HOUR };
/** New accounts, per client. */
export const SIGNUP_RULE: Rule = { max: 5, windowMs: HOUR, lockMs: HOUR };

const key = (scope: string, id: string) => `ratelimit/${scope}-${id.replace(/[^a-z0-9-]/gi, "")}.json`;

/**
 * Count one attempt against counter `c` at time `now`. Returns the new counter, or null when
 * `c` is locked (the attempt is refused and not counted).
 */
export function countAttempt(c: Counter | null, rule: Rule, now: number): Counter | null {
  const cur = c && typeof c.fails === "number" && typeof c.first === "number" ? c : null;
  const until = Number(cur?.until) || 0;
  if (until > now) return null;
  const fresh = !cur || now - cur.first > rule.windowMs || until > 0;
  const next: Counter = fresh ? { fails: 1, first: now, until: 0 } : { fails: cur.fails + 1, first: cur.first, until: 0 };
  if (next.fails >= rule.max) next.until = now + rule.lockMs;
  return next;
}

export interface Attempt {
  /** Seconds until the lock ends (0 = this attempt may go ahead). */
  wait: number;
  /** Attempts left after this one before a lock. */
  left: number;
}

function outcome(c: Counter | null, counted: boolean, rule: Rule, now: number): Attempt {
  if (counted && c) return { wait: 0, left: Math.max(0, rule.max - c.fails) };
  return { wait: Math.max(1, Math.ceil(((Number(c?.until) || 0) - now) / 1000)), left: 0 };
}

// Per-instance copy of the counters (pruned so it can't grow without bound).
const memory = new Map<string, Counter>();
function remember(k: string, c: Counter, now: number) {
  if (memory.size >= 5000) {
    for (const [mk, mc] of memory) if (mc.until < now && now - mc.first > HOUR) memory.delete(mk);
    if (memory.size >= 5000) memory.clear();
  }
  memory.set(k, c);
}

/**
 * Count an attempt before doing the work it guards. `wait > 0` means refuse it.
 * Throws if the shared counter can't be updated (callers fail closed).
 */
export async function takeAttempt(scope: string, id: string, rule: Rule): Promise<Attempt> {
  const k = key(scope, id);
  const now = Date.now();
  const local = countAttempt(memory.get(k) ?? null, rule, now);
  if (!local) return outcome(memory.get(k) ?? null, false, rule, now);
  remember(k, local, now);
  const { value, changed } = await updateJson<Counter>(k, (c) => countAttempt(c, rule, Date.now()));
  // The shared counter is the truth: copy it here, so a lock set elsewhere stops further tries
  // before they reach Blob, and a count cleared elsewhere (right PIN on another instance)
  // doesn't leave this instance locking people out on a stale tally.
  if (value) remember(k, value, now);
  return outcome(value, changed, rule, Date.now());
}

/** Forget the attempts (after a correct password or PIN). */
export async function clearAttempts(scope: string, id: string): Promise<void> {
  const k = key(scope, id);
  memory.delete(k);
  await deleteJson(k);
}

/**
 * A stable, non-reversible id for the client: the first x-forwarded-for hop (set by Vercel's
 * edge), else x-real-ip. Hashed so raw addresses are never stored, and because key() would
 * merge "1.23.4.5" and "12.3.4.5" if it only stripped the dots. An IPv6 address counts by its
 * /64, since one home or server gets a whole /64 and could otherwise use a new address per try.
 */
export function clientId(req: Request): string {
  let ip = (req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip")?.trim() || "unknown").toLowerCase();
  if (ip.includes(":") && !ip.includes(".")) {
    const [head, tail] = ip.split("::");
    const h = head ? head.split(":") : [];
    const t = tail ? tail.split(":") : [];
    const groups = tail === undefined ? h : [...h, ...Array<string>(Math.max(0, 8 - h.length - t.length)).fill("0"), ...t];
    ip = `${groups.slice(0, 4).map((g) => g.replace(/^0+(?=.)/, "")).join(":")}::/64`;
  }
  const salt = process.env.AUTH_SECRET || process.env.BLOB_READ_WRITE_TOKEN || "y8m-client";
  return createHmac("sha256", salt).update(`client:${ip}`).digest("hex").slice(0, 16);
}

// ---------------------------------------------------------------------------
// Daily allowances (AI tutor). Shared across instances; approximate is fine.
// ---------------------------------------------------------------------------
export interface Daily {
  day: string;
  count: number;
}

/** Use one of today's uses: the new tally, or null when `limit` is already used up. */
export function countDaily(c: Daily | null, day: string, limit: number): Daily | null {
  const used = c && c.day === day && typeof c.count === "number" ? c.count : 0;
  return used >= limit ? null : { day, count: used + 1 };
}

/** Take one of today's (UTC) `limit` uses of `name`. False when none are left. Throws on storage errors. */
export async function takeDailyAllowance(name: string, limit: number): Promise<boolean> {
  const day = new Date().toISOString().slice(0, 10);
  const { changed } = await updateJson<Daily>(key("daily", name), (c) => countDaily(c, day, limit));
  return changed;
}

// Lightweight per-instance throttle for expensive endpoints (AI tutor).
const buckets = new Map<string, { count: number; reset: number }>();
export function throttle(id: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  if (buckets.size >= 5000) for (const [bk, b] of buckets) if (b.reset < now) buckets.delete(bk);
  const b = buckets.get(id);
  if (!b || b.reset < now) {
    buckets.set(id, { count: 1, reset: now + windowMs });
    return true;
  }
  if (b.count >= limit) return false;
  b.count++;
  return true;
}
