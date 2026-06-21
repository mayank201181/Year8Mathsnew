// Gamification: star-based ranks and the spaced-repetition ladder.

export interface Rank {
  name: string;
  minStars: number;
  emoji: string;
}

export const RANKS: Rank[] = [
  { name: "Number Novice", minStars: 0, emoji: "🌱" },
  { name: "Apprentice", minStars: 10, emoji: "🧮" },
  { name: "Problem Solver", minStars: 25, emoji: "🧩" },
  { name: "Sharp Thinker", minStars: 50, emoji: "⚡" },
  { name: "Maths Whiz", minStars: 90, emoji: "🌟" },
  { name: "Grand Mathematician", minStars: 140, emoji: "👑" },
];

export function rankForStars(stars: number): Rank {
  let current = RANKS[0];
  for (const r of RANKS) if (stars >= r.minStars) current = r;
  return current;
}

export function nextRank(stars: number): Rank | null {
  return RANKS.find((r) => r.minStars > stars) ?? null;
}

/** Spaced-repetition interval ladder, in days. */
export const SRS_LADDER = [1, 3, 7, 16, 35];

export function nextDue(step: number, now = Date.now()): number {
  const days = SRS_LADDER[Math.min(step, SRS_LADDER.length - 1)];
  return now + days * 24 * 60 * 60 * 1000;
}

/** A challenge or harder question is worth more stars. */
export function starsFor(difficulty: "warmup" | "core" | "challenge"): number {
  return difficulty === "challenge" ? 3 : difficulty === "core" ? 2 : 1;
}
