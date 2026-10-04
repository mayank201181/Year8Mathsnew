import "server-only";
import { cookies } from "next/headers";
import { createHash, createHmac, randomBytes, scryptSync, timingSafeEqual } from "crypto";
import type { NextResponse } from "next/server";
import type { Account } from "../profileTypes";
import { blobConfigured, readJson, writeJson } from "./blob";

// Session cookie and token format are unchanged from v1 so existing sign-ins
// survive the upgrade: base64url("<accountId>.<issuedAtMs>") + "." + hex HMAC.
export const SESSION_COOKIE = "y8m_session";
const SESSION_MAX_AGE_S = 60 * 60 * 24 * 365;

/**
 * Signing secret. AUTH_SECRET is preferred; if it is missing we derive one from
 * the (server-only) Blob token rather than falling back to a public string.
 */
function secret(): string | null {
  if (process.env.AUTH_SECRET) return process.env.AUTH_SECRET;
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    return createHash("sha256").update(`y8m-session:${process.env.BLOB_READ_WRITE_TOKEN}`).digest("hex");
  }
  if (process.env.NODE_ENV !== "production") return "dev-only-secret";
  return null;
}

/** Accounts work only when storage and a signing secret are available. */
export function accountsEnabled(): boolean {
  return blobConfigured() && !!secret();
}

// ---------------------------------------------------------------------------
// Password / PIN hashing (scrypt, "salt:hash" — same format as v1).
// ---------------------------------------------------------------------------
export function hashSecret(plain: string): string {
  const salt = randomBytes(16).toString("hex");
  return `${salt}:${scryptSync(plain, salt, 64).toString("hex")}`;
}

export function verifySecret(plain: string, stored: string | undefined): boolean {
  if (!stored || typeof plain !== "string") return false;
  try {
    const [salt, hash] = stored.split(":");
    if (!salt || !hash) return false;
    const candidate = scryptSync(plain, salt, 64);
    const original = Buffer.from(hash, "hex");
    return candidate.length === original.length && timingSafeEqual(candidate, original);
  } catch {
    return false;
  }
}

// ---------------------------------------------------------------------------
// Session token
// ---------------------------------------------------------------------------
export function signToken(accountId: string): string | null {
  const s = secret();
  if (!s) return null;
  const payload = `${accountId}.${Date.now()}`;
  const sig = createHmac("sha256", s).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyToken(token: string | undefined): string | null {
  const s = secret();
  if (!s || !token) return null;
  const dot = token.indexOf(".");
  if (dot < 1) return null;
  const b64 = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!/^[0-9a-f]{64}$/.test(sig)) return null;
  const payload = Buffer.from(b64, "base64url").toString();
  const expected = createHmac("sha256", s).update(payload).digest("hex");
  if (!timingSafeEqual(Buffer.from(sig, "hex"), Buffer.from(expected, "hex"))) return null;
  const [accountId, issued] = payload.split(".");
  if (!accountId || !/^[a-z0-9-]{4,64}$/i.test(accountId)) return null;
  const issuedAt = Number(issued);
  if (!Number.isFinite(issuedAt) || Date.now() - issuedAt > SESSION_MAX_AGE_S * 1000 + 86400000) return null;
  return accountId;
}

export function setSessionCookie(res: NextResponse, accountId: string) {
  const token = signToken(accountId);
  if (!token) return;
  res.cookies.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_S,
  });
}

export function clearSessionCookie(res: NextResponse) {
  res.cookies.set(SESSION_COOKIE, "", { path: "/", maxAge: 0 });
}

export async function currentAccountId(): Promise<string | null> {
  if (!accountsEnabled()) return null;
  const jar = await cookies();
  return verifyToken(jar.get(SESSION_COOKIE)?.value);
}

// ---------------------------------------------------------------------------
// Account storage
// ---------------------------------------------------------------------------
export async function getAccount(id: string): Promise<Account | null> {
  const acc = await readJson<Account>(`accounts/${id}.json`);
  if (!acc || typeof acc !== "object") return null;
  return { ...acc, profiles: Array.isArray(acc.profiles) ? acc.profiles : [] };
}

export async function saveAccount(account: Account): Promise<void> {
  await writeJson(`accounts/${account.id}.json`, account);
}

export async function currentAccount(): Promise<Account | null> {
  const id = await currentAccountId();
  if (!id) return null;
  return getAccount(id);
}

export interface Secrets {
  passwordHash: string;
  pinHash: string;
}

export async function getSecrets(accountId: string): Promise<Secrets | null> {
  return readJson<Secrets>(`secrets/${accountId}.json`);
}

export async function saveSecrets(accountId: string, secrets: Secrets): Promise<void> {
  await writeJson(`secrets/${accountId}.json`, secrets);
}

export function nameSlug(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function lookupAccountIdByName(name: string): Promise<string | null> {
  const slug = nameSlug(name);
  if (!slug) return null;
  const doc = await readJson<{ id: string }>(`names/${slug}.json`);
  return typeof doc?.id === "string" ? doc.id : null;
}

export async function indexAccountName(name: string, id: string): Promise<void> {
  await writeJson(`names/${nameSlug(name)}.json`, { id });
}

/** Check the parent PIN for an account (with lockout), upgrading old hashes. */
export async function checkPin(accountId: string, pin: unknown): Promise<{ ok: true } | { ok: false; status: number; error: string }> {
  const { lockedFor, recordFailure, clearFailures } = await import("./ratelimit");
  const wait = await lockedFor("pin", accountId);
  if (wait > 0) return { ok: false, status: 429, error: `Too many wrong PINs. Try again in ${Math.ceil(wait / 60)} minute${wait > 60 ? "s" : ""}.` };
  const secrets = await getSecrets(accountId);
  const ok = verifySecret(typeof pin === "string" ? pin : String(pin ?? ""), secrets?.pinHash);
  if (!ok || !secrets) {
    const left = await recordFailure("pin", accountId);
    return { ok: false, status: 403, error: left > 0 ? `That PIN isn't right (${left} tr${left === 1 ? "y" : "ies"} left).` : "Too many wrong PINs. Try again in 15 minutes." };
  }
  await clearFailures("pin", accountId);
  return { ok: true };
}
