import type { TopicExtras } from "../types";

// Engagement extras keyed by topic id. Authored separately from audited
// content so editing them never risks an answer key. Subagents fill these in.
export const EXTRAS: Record<string, TopicExtras> = {};

export function getExtras(topicId: string): TopicExtras | undefined {
  return EXTRAS[topicId];
}

export function registerExtras(extras: TopicExtras) {
  EXTRAS[extras.topicId] = extras;
}
