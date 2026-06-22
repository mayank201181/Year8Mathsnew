import { cookies } from "next/headers";
import { randomBytes, scryptSync, timingSafeEqual, createHmac } from "crypto";
import type { Account } from "../profileTypes";
import { readJson, writeJson } from "./blob";

const COOKIE = "y8m_session";
const SECRET = process.env.AUTH_SECRET ?? "dev-insecure-secret-change-me";

// --- password & PIN hashing (scrypt) ---
export function hashSecret(secret: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(secret, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

export function verifySecret(secret: string, stored: string): boolean {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const candidate = scryptSync(secret, salt, 64);
  const original = Buffer.from(hash, "hex");
  return candidate.length === original.length && timingSafeEqual(candidate, original);
}

// --- session token (HMAC-signed) ---
export function signToken(accountId: string): string {
  const payload = `${accountId}.${Date.now()}`;
  const sig = createHmac("sha256", SECRET).update(payload).digest("hex");
  return `${Buffer.from(payload).toString("base64url")}.${sig}`;
}

export function verifyToken(token: string): string | null {
  const [b64, sig] = token.split(".");
  if (!b64 || !sig) return null;
  const payload = Buffer.from(b64, "base64url").toString();
  const expected = createHmac("sha256", SECRET).update(payload).digest("hex");
  if (sig !== expected) return null;
  return payload.split(".")[0] || null;
}

// --- cookie helpers ---
export function setSessionCookie(accountId: string) {
  cookies().set(COOKIE, signToken(accountId), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 365,
  });
}

export function clearSessionCookie() {
  cookies().delete(COOKIE);
}

export function currentAccountId(): string | null {
  const token = cookies().get(COOKIE)?.value;
  if (!token) return null;
  return verifyToken(token);
}

// --- account storage ---
export async function getAccount(id: string): Promise<Account | null> {
  return readJson<Account>(`accounts/${id}.json`);
}

export async function saveAccount(account: Account): Promise<void> {
  await writeJson(`accounts/${account.id}.json`, account);
}

export async function currentAccount(): Promise<Account | null> {
  const id = currentAccountId();
  if (!id) return null;
  return getAccount(id);
}

// We store password & PIN hashes in a side file so the public account JSON
// (returned to the client) never contains secrets.
interface Secrets {
  passwordHash: string;
  pinHash: string;
}

export async function getSecrets(accountId: string): Promise<Secrets | null> {
  return readJson<Secrets>(`secrets/${accountId}.json`);
}

export async function saveSecrets(accountId: string, secrets: Secrets): Promise<void> {
  await writeJson(`secrets/${accountId}.json`, secrets);
}

// --- name -> account id index (for login) ---
function nameSlug(name: string): string {
  return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

export async function lookupAccountIdByName(name: string): Promise<string | null> {
  const doc = await readJson<{ id: string }>(`names/${nameSlug(name)}.json`);
  return doc?.id ?? null;
}

export async function indexAccountName(name: string, id: string): Promise<void> {
  await writeJson(`names/${nameSlug(name)}.json`, { id });
}
