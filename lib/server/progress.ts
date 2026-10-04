import "server-only";
import { normalizeProgress, type ProgressDoc } from "../profileTypes";
import { readJson, writeJson, deleteJson } from "./blob";

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

export async function deleteProgress(accountId: string, profileId: string): Promise<void> {
  await deleteJson(key(accountId, profileId));
}
