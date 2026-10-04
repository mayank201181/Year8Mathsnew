// Procedural skill drills: each Drill generates unlimited fresh questions
// from a seeded RNG, with an auto-marked answer and a worked solution.
import type { AnswerSpec, Trap } from "../types.ts";

export interface Rng {
  /** Uniform in [0, 1). */
  next(): number;
  /** Integer in [min, max] inclusive. */
  int(min: number, max: number): number;
  /** Non-zero integer in [min, max] inclusive. */
  nonZero(min: number, max: number): number;
  pick<T>(items: readonly T[]): T;
  shuffle<T>(items: readonly T[]): T[];
  /** true with probability p (default 0.5). */
  bool(p?: number): boolean;
}

export interface DrillItem {
  /** Question text (markdown-lite + {{maths}}). */
  prompt: string;
  answer: AnswerSpec;
  /** Worked solution steps. */
  solution: string[];
  /** One-line nudge shown on request. */
  hint?: string;
  /** Predictable wrong answers with targeted feedback (sign slip, reciprocal …). */
  traps?: Trap[];
  /** Optional inline SVG. */
  diagram?: string;
}

export interface Drill {
  /** Globally unique: "<topicId>.<skill-slug>". */
  id: string;
  topicId: string;
  title: string;
  /** Where the skill sits in the topic: 1 = basics, 2 = core, 3 = harder / multi-step. */
  level: 1 | 2 | 3;
  /** GuideSection id this skill is taught in. */
  guideRef?: string;
  /**
   * Make a fresh question. `tier` widens the numbers / adds steps:
   * 1 = friendly numbers, 2 = typical Year 8 (negatives, decimals), 3 = stretch.
   */
  generate(rng: Rng, tier: 1 | 2 | 3): DrillItem;
}
