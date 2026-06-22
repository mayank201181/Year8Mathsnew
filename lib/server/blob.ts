import { put, list, del } from "@vercel/blob";

// JSON key-value store backed by Vercel Blob.
// Keys: accounts/<id>.json, progress/<accountId>/<profileId>.json

export function blobConfigured(): boolean {
  return !!process.env.BLOB_READ_WRITE_TOKEN;
}

export async function writeJson(key: string, value: unknown): Promise<void> {
  await put(key, JSON.stringify(value), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
    contentType: "application/json",
  });
}

export async function readJson<T>(key: string): Promise<T | null> {
  const { blobs } = await list({ prefix: key, limit: 1 });
  const match = blobs.find((b) => b.pathname === key);
  if (!match) return null;
  const res = await fetch(`${match.url}?t=${Date.now()}`, { cache: "no-store" });
  if (!res.ok) return null;
  return (await res.json()) as T;
}

export async function deleteJson(key: string): Promise<void> {
  const { blobs } = await list({ prefix: key, limit: 1 });
  const match = blobs.find((b) => b.pathname === key);
  if (match) await del(match.url);
}
