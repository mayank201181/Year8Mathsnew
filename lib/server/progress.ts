import "server-only";
import { normalizeProgress, type ProgressDoc } from "../profileTypes";
import { readJson, writeJson, deleteJson, updateJson } from "./blob";

const key = (accountId: string, profileId: string) => `progress/${accountId}/${profileId}.json`;

/** null when the learner has no saved document yet. Throws on storage errors. */
export async function getProgress(accountId: string, profileId: string): Promise<ProgressDoc | null> {
  const raw = await readJson<unknown>(key(accountId, profileId));
  return raw ? normalizeProgress(raw) : null;
}

export async function getRawProgress(accountId: string, profileId: string): Promise<unknown> {
  return readJson<unknown>(key(accountId, profileId));
}

export async function saveProgress(accountId: string, profileId: string, doc: ProgressDoc): Promise<void> {
  await writeJson(key(accountId, profileId), doc);
}

/**
 * Read, change and write the stored document without losing a save that lands at the same
 * moment from another device (the write is conditional on what was read, and re-applied on a
 * clash). `next` gets the stored value (null if none) and returns the document to store, or
 * null to leave it as it is. It may run more than once, so it must have no side effects.
 */
export async function updateProgress(accountId: string, profileId: string, next: (raw: unknown) => ProgressDoc | null): Promise<void> {
  await updateJson<unknown>(key(accountId, profileId), (raw) => next(raw));
}

export async function deleteProgress(accountId: string, profileId: string): Promise<void> {
  await deleteJson(key(accountId, profileId));
}
