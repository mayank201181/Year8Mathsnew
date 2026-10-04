// ---------------------------------------------------------------------------
// Pure learning rules: stars, spaced repetition, skill mastery, ranks.
// No React — unit-tested directly by Node.
// ---------------------------------------------------------------------------
import type { Difficulty } from "./types.ts";
import type { SkillState, SrsItem } from "./profileTypes.ts";
import { emptySkill } from "./profileTypes.ts";
import { addDaysISO, dayDiff, todayISO } from "./dates.ts";

/** Review ladder for missed questions (days). Graduates after the last step. */
export const SRS_STEPS = [1, 3, 7, 16, 35];
/** Review ladder for skills (days), capped. */
export const SKILL_STEPS = [1, 3, 7, 16, 35, 60];
/** Drill stars per day cap (stops endless farming of easy drills). */
export const DRILL_STAR_CAP = 25;

/**
 * Stars for a first correct answer to a curated question.
 * Clean solve (first try, no hints) earns a bonus; a revealed solution earns nothing.
 */
export function starsFor(difficulty: Difficulty, o: { hints: number; tries: number; solutionShown: boolean }): number {
  if (o.solutionShown) return 0;
  const base = difficulty === "challenge" ? 4 : difficulty === "core" ? 2 : 1;
  if (o.tries > 1) return Math.max(1, Math.ceil(base / 2));
  return o.hints === 0 ? base + 1 : base;
}

/** Next SRS state after answering a scheduled question. null = graduated / not scheduled. */
export function nextSrs(cur: SrsItem | undefined, correct: boolean, today = todayISO()): SrsItem | null | undefined {
  if (!correct) return { due: addDaysISO(1), reps: 0 };
  if (!cur) return undefined; // correct and never missed: nothing to schedule
  if (cur.due > today) return cur; // answered early (e.g. in a paper): keep schedule
  const reps = cur.reps + 1;
  if (reps >= SRS_STEPS.length) return null;
  return { due: addDaysISO(SRS_STEPS[reps]), reps };
}

export type MasteryLevel = 0 | 1 | 2 | 3;
export const LEVEL_NAMES = ["New", "Practising", "Secure", "Mastered"] as const;

function ones(s: string): number {
  let n = 0;
  for (const c of s) if (c === "1") n++;
  return n;
}

/** New → Practising → Secure (8 of last 10 right, reached tier 2) → Mastered (also right in mixed practice on 2 days ≥3 apart). */
export function skillLevel(s: SkillState | undefined): MasteryLevel {
  if (!s || s.a === 0) return 0;
  const secure = s.recent.length >= 8 && ones(s.recent.slice(-10)) >= 8 && s.best >= 2;
  if (!secure) return 1;
  const m = s.mixed;
  if (m.length >= 2 && dayDiff(m[0], m[m.length - 1]) >= 3) return 3;
  return 2;
}

/** A secure/mastered skill whose review date has passed is "rusty". */
export function isRusty(s: SkillState | undefined, today = todayISO()): boolean {
  return !!s && skillLevel(s) >= 2 && !!s.due && s.due < today;
}

/** Skill is due for spaced review today (any practised skill). */
export function skillDue(s: SkillState | undefined, today = todayISO()): boolean {
  return !!s && s.a > 0 && !!s.due && s.due <= today;
}

export interface SkillOutcome {
  /** Correct AND without revealing the worked solution. */
  correct: boolean;
  tier: 1 | 2 | 3;
  /** Answered inside mixed practice (Daily 5 / review). */
  mixed: boolean;
}

export function updateSkill(prev: SkillState | undefined, o: SkillOutcome, now = Date.now(), today = todayISO()): SkillState {
  const s: SkillState = { ...(prev ?? emptySkill()), mixed: [...(prev?.mixed ?? [])] };
  s.a += 1;
  if (o.correct) s.c += 1;
  s.recent = (s.recent + (o.correct ? "1" : "0")).slice(-10);
  if (o.correct && o.tier > s.best) s.best = o.tier;
  s.tier = o.tier;
  if (o.correct && o.mixed && s.mixed[s.mixed.length - 1] !== today) s.mixed = [...s.mixed, today].slice(-4);
  if (!o.correct) {
    s.interval = 1;
    s.due = addDaysISO(1);
  } else if (!s.due || s.due <= today) {
    // Advance the review ladder at most once per due date.
    const idx = SKILL_STEPS.indexOf(s.interval);
    const nextIdx = s.interval === 0 ? 0 : Math.min(SKILL_STEPS.length - 1, (idx < 0 ? 0 : idx) + 1);
    s.interval = SKILL_STEPS[nextIdx];
    s.due = addDaysISO(s.interval);
  }
  s.lastAt = now;
  return s;
}

/**
 * Adaptive tier inside a drill session: up after 3 clean corrects in a row,
 * down after 2 misses in a row.
 */
export function adaptTier(tier: 1 | 2 | 3, history: boolean[]): 1 | 2 | 3 {
  const n = history.length;
  if (n >= 3 && history[n - 1] && history[n - 2] && history[n - 3] && tier < 3) return (tier + 1) as 1 | 2 | 3;
  if (n >= 2 && !history[n - 1] && !history[n - 2] && tier > 1) return (tier - 1) as 1 | 2 | 3;
  return tier;
}

export interface Rank {
  min: number;
  name: string;
  emoji: string;
}

export const RANKS: Rank[] = [
  { min: 0, name: "Explorer", emoji: "🧭" },
  { min: 40, name: "Apprentice", emoji: "🔢" },
  { min: 120, name: "Problem Solver", emoji: "🧩" },
  { min: 300, name: "Pattern Hunter", emoji: "🔍" },
  { min: 600, name: "Proof Builder", emoji: "📐" },
  { min: 1000, name: "Theorem Tamer", emoji: "🦉" },
  { min: 1600, name: "Grandmaster", emoji: "♾️" },
  { min: 2500, name: "Legend", emoji: "🏆" },
];

export function rankFor(stars: number): { rank: Rank; next?: Rank; progress: number } {
  let i = 0;
  for (let k = 0; k < RANKS.length; k++) if (stars >= RANKS[k].min) i = k;
  const rank = RANKS[i];
  const next = RANKS[i + 1];
  const progress = next ? (stars - rank.min) / (next.min - rank.min) : 1;
  return { rank, next, progress };
}

/** Stable short key for a slip (trap feedback) so repeats are counted together. */
export function slipKey(topicId: string, label: string): string {
  let h = 2166136261;
  for (let i = 0; i < label.length; i++) {
    h ^= label.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return `${topicId}:${(h >>> 0).toString(36)}`;
}

/** Topic id for a question id ("fractions-p1-q03" → "fractions"); exam ids return undefined. */
export function topicOfQid(qid: string, topicIds: readonly string[]): string | undefined {
  let best: string | undefined;
  for (const t of topicIds) if (qid.startsWith(`${t}-`) && (!best || t.length > best.length)) best = t;
  return best;
}
