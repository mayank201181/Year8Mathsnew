// Topic-level progress, computed the same way everywhere (home, topics,
// progress page, parent dashboard, certificates).
import type { ProgressDoc } from "./profileTypes.ts";
import { skillLevel } from "./learning.ts";

export interface TopicShape {
  id: string;
  sections: { id: string; stretch: boolean }[];
  challengeIds: string[];
  counts: { questions: number };
}

export interface TopicMastery {
  /** 0..100 overall. */
  pct: number;
  /** Lesson sections marked as understood (non-stretch). */
  sectionsRead: number;
  sectionsTotal: number;
  /** Skills by level for this topic. */
  skills: { total: number; practising: number; secure: number; mastered: number };
  /** Distinct curated questions solved. */
  solved: number;
  /** Challenge problems solved. */
  challengeSolved: number;
  /** Answer accuracy in this topic (0..1) or null if nothing answered. */
  accuracy: number | null;
  started: boolean;
}

/**
 * Weighted: lessons 15% · skills (avg level/3) 45% · questions solved (to 60) 25% · challenge solved (to 5) 15%
 * (missing parts are re-weighted away).
 * `skillIds` are the drill ids for the topic.
 */
export function topicMastery(t: TopicShape, d: ProgressDoc, skillIds: string[]): TopicMastery {
  const core = t.sections.filter((s) => !s.stretch);
  const sectionsRead = core.filter((s) => d.guidesRead[`${t.id}#${s.id}`]).length;
  const levels: number[] = skillIds.map((id) => skillLevel(d.skills[id]));
  const skills = {
    total: skillIds.length,
    practising: levels.filter((l) => l === 1).length,
    secure: levels.filter((l) => l === 2).length,
    mastered: levels.filter((l) => l === 3).length,
  };
  const prefix = `${t.id}-`;
  let solved = 0;
  for (const qid of Object.keys(d.solved)) if (qid.startsWith(prefix)) solved++;
  const challengeSolved = t.challengeIds.filter((id) => d.solved[id]).length;
  const stat = d.analytics.topics[t.id];
  const accuracy = stat && stat.answered > 0 ? stat.correct / stat.answered : null;
  const lessonPart = core.length ? sectionsRead / core.length : 0;
  const skillPart = skillIds.length ? levels.reduce((a, b) => a + b, 0) / (3 * skillIds.length) : 0;
  const solvedPart = Math.min(1, solved / 60);
  const chPart = Math.min(1, challengeSolved / 5);
  // Weights: lessons 15, skills 45, solved 25, challenge 15 — parts a topic doesn't have are left out
  // and the rest re-scaled, so a topic without drills (or challenge problems) can still reach 100%.
  const parts: Array<[number, number]> = [[0.15, lessonPart], [0.25, solvedPart]];
  if (skillIds.length) parts.push([0.45, skillPart]);
  if (t.challengeIds.length) parts.push([0.15, chPart]);
  const wsum = parts.reduce((a, [w]) => a + w, 0);
  const pct = Math.round((100 * parts.reduce((a, [w, v]) => a + w * v, 0)) / wsum);
  return {
    pct,
    sectionsRead,
    sectionsTotal: core.length,
    skills,
    solved,
    challengeSolved,
    accuracy,
    started: sectionsRead > 0 || solved > 0 || levels.some((l) => l > 0) || !!stat?.answered,
  };
}
