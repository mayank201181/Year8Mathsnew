// ---------------------------------------------------------------------------
// Fluency sprint: quick mental-maths facts with exact numeric answers.
// Pure (no React) so it can be unit-tested directly by Node.
//
// Every decimal is built from an integer and a power of ten (m / 10^s) so
// prompts never show floating-point noise, and every answer is either an
// integer or ONE division of an integer by a power of ten — which is the
// correctly-rounded double for that decimal (0.35, 0.0047 …).
// ---------------------------------------------------------------------------
import type { Rng } from "./drills/types.ts";
import { gcd } from "./drills/helpers.ts";

export type SprintMode = "tables" | "negatives" | "fdp" | "powers" | "mixed";
/** A mode that produces facts directly (everything except "mixed"). */
export type SprintFactMode = Exclude<SprintMode, "mixed">;

export const SPRINT_MODES: readonly SprintMode[] = ["tables", "negatives", "fdp", "powers", "mixed"];
const FACT_MODES: readonly SprintFactMode[] = ["tables", "negatives", "fdp", "powers"];

/** Length of a timed sprint. */
export const SPRINT_SECONDS = 60;

export interface SprintModeInfo {
  label: string;
  icon: string;
  description: string;
  /** Two sample prompts ({{ }} maths markup). */
  example: string;
}

export const SPRINT_MODE_INFO: Record<SprintMode, SprintModeInfo> = {
  tables: {
    label: "Times tables",
    icon: "✖️",
    description: "Multiplication and division facts up to 12 × 12.",
    example: "{{7 * 8}} · {{63 ÷ 9}}",
  },
  negatives: {
    label: "Negative numbers",
    icon: "🌡️",
    description: "Add, subtract, multiply and divide with integers from −12 to 12.",
    example: "{{-4 - (-9)}} · {{-6 * 7}}",
  },
  fdp: {
    label: "Fractions, decimals & %",
    icon: "🍰",
    description: "Percentages and fractions of amounts, and switching between fractions, decimals and percentages.",
    example: "{{15%}} of {{60}} · {{3/4}} of {{28}}",
  },
  powers: {
    label: "Powers, roots & ×10",
    icon: "🚀",
    description: "Squares to 15², cubes to 5³ and 10³, their roots, and × or ÷ by 10, 100, 1000, 0.1 and 0.01.",
    example: "{{13^2}} · {{4.7 ÷ 100}}",
  },
  mixed: {
    label: "Mixed",
    icon: "🎲",
    description: "A bit of everything — the truest test of fluency.",
    example: "{{8 * 7}} · {{sqrt(144)}} · {{-3 + 10}}",
  },
};

export interface SprintItem {
  /** Question shown to the learner (markdown-lite + {{maths}}). */
  prompt: string;
  /** Exact numeric answer. */
  answer: number;
  /** Unit shown after the answer box, e.g. "%". The box also accepts it typed. */
  suffix?: string;
  /** The complete fact, e.g. "{{7 * 8 = 56}}" — for feedback and the missed list. */
  fact: string;
  /** Which family the fact came from (useful when the mode is "mixed"). */
  mode: SprintFactMode;
}

export function isSprintMode(v: unknown): v is SprintMode {
  return typeof v === "string" && (SPRINT_MODES as readonly string[]).includes(v);
}

/** Personal-best key in ProgressDoc.bests. */
export function sprintBestKey(mode: SprintMode): string {
  return `sprint:${mode}`;
}

/** Idempotency key for the once-per-mode-per-day star award. */
export function sprintAwardKey(mode: SprintMode, day: string): string {
  return `sprint:${day}:${mode}`;
}

/** Stars for a sprint score: 1 per 5 correct, at most 5. */
export function sprintStars(score: number): number {
  return Math.max(0, Math.min(5, Math.floor(score / 5)));
}

// ---------------------------------------------------------------------------
// Formatting helpers (all plain ASCII inside {{ }}: "-" renders as −)
// ---------------------------------------------------------------------------

/** m / 10^s as a decimal string without float noise: (47, 1) → "4.7", (5, 3) → "0.005". */
export function scaled(m: number, s: number): string {
  const neg = m < 0;
  let digits = String(Math.abs(Math.trunc(m)));
  if (s > 0) {
    digits = digits.padStart(s + 1, "0");
    const whole = digits.slice(0, digits.length - s);
    const frac = digits.slice(digits.length - s).replace(/0+$/, "");
    digits = frac ? `${whole}.${frac}` : whole;
  }
  return (neg && digits !== "0" ? "-" : "") + digits;
}

/** Exact value of m / 10^s (one division of integers → correctly rounded). */
function scaledValue(m: number, s: number): number {
  return s <= 0 ? m * 10 ** -s : m / 10 ** s;
}

/** Second operand: negatives in brackets. */
function br(n: number): string {
  return n < 0 ? `(${n})` : String(n);
}

/** Answer as maths markup text. */
function ans(n: number): string {
  if (Number.isInteger(n)) return String(n);
  return String(parseFloat(n.toPrecision(12)));
}

/** Weighted pick: [weight, value][] */
function weighted<T>(rng: Rng, options: readonly (readonly [number, T])[]): T {
  const total = options.reduce((a, [w]) => a + w, 0);
  let r = rng.next() * total;
  for (const [w, v] of options) {
    r -= w;
    if (r < 0) return v;
  }
  return options[options.length - 1][1];
}

// ---------------------------------------------------------------------------
// Generators
// ---------------------------------------------------------------------------

/** Harder facts (6–9, 12) appear a little more often than 2s, 5s and 10s. */
const TABLE_FACTORS = [2, 3, 4, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 11, 12, 12] as const;

function tables(rng: Rng): SprintItem {
  const a = rng.pick(TABLE_FACTORS);
  const b = rng.pick(TABLE_FACTORS);
  if (rng.bool(0.55)) {
    return { prompt: `{{${a} * ${b}}}`, answer: a * b, fact: `{{${a} * ${b} = ${a * b}}}`, mode: "tables" };
  }
  const p = a * b;
  return { prompt: `{{${p} ÷ ${a}}}`, answer: b, fact: `{{${p} ÷ ${a} = ${b}}}`, mode: "tables" };
}

function negatives(rng: Rng): SprintItem {
  const op = rng.pick(["+", "-", "*", "/"] as const);
  for (let i = 0; i < 200; i++) {
    if (op === "*") {
      const a = rng.nonZero(-12, 12);
      const b = rng.nonZero(-12, 12);
      if ((a > 0 && b > 0) || Math.abs(a) === 1 || Math.abs(b) === 1) continue;
      return { prompt: `{{${a} * ${br(b)}}}`, answer: a * b, fact: `{{${a} * ${br(b)} = ${a * b}}}`, mode: "negatives" };
    }
    if (op === "/") {
      // The inverse of a multiplication fact: divisor and answer in −12..12.
      const b = rng.nonZero(-12, 12);
      const q = rng.nonZero(-12, 12);
      const a = b * q;
      if ((a > 0 && b > 0) || Math.abs(b) === 1 || Math.abs(q) === 1) continue;
      return { prompt: `{{${a} ÷ ${br(b)}}}`, answer: q, fact: `{{${a} ÷ ${br(b)} = ${q}}}`, mode: "negatives" };
    }
    const a = rng.int(-12, 12);
    const b = rng.int(-12, 12);
    const r = op === "+" ? a + b : a - b;
    if (a === 0 || b === 0) continue;
    if (a > 0 && b > 0 && r >= 0) continue; // needs a negative somewhere
    return { prompt: `{{${a} ${op} ${br(b)}}}`, answer: r, fact: `{{${a} ${op} ${br(b)} = ${r}}}`, mode: "negatives" };
  }
  return { prompt: "{{-5 + 8}}", answer: 3, fact: "{{-5 + 8 = 3}}", mode: "negatives" };
}

/** Percentages of amounts: [percent, largest amount]. */
const PERCENTS: readonly (readonly [number, number])[] = [
  [10, 500], [50, 300], [25, 200], [20, 250], [5, 400], [1, 900],
  [75, 120], [15, 200], [30, 200], [40, 150], [60, 150], [90, 100], [35, 100],
];

function percentOf(rng: Rng): SprintItem {
  const [p, hi] = rng.pick(PERCENTS);
  const step = 100 / gcd(p, 100); // amount must be a multiple of this for a whole-number answer
  const lo = Math.max(step * 2, 20);
  const k = rng.int(Math.ceil(lo / step), Math.floor(hi / step));
  const amount = step * k;
  const r = (p * amount) / 100;
  return { prompt: `{{${p}%}} of {{${amount}}}`, answer: r, fact: `{{${p}%}} of {{${amount}}} = {{${r}}}`, mode: "fdp" };
}

function fractionOf(rng: Rng): SprintItem {
  const d = rng.pick([2, 3, 4, 5, 6, 8, 10, 12] as const);
  let n = 1;
  for (let i = 0; i < 50; i++) {
    n = rng.int(1, d - 1);
    if (gcd(n, d) === 1) break;
  }
  const k = rng.int(2, 12);
  const amount = d * k;
  return { prompt: `{{${n}/${d}}} of {{${amount}}}`, answer: n * k, fact: `{{${n}/${d}}} of {{${amount}}} = {{${n * k}}}`, mode: "fdp" };
}

/** A percentage as hundredths (h), sometimes thousandths (t/10 %): returns [m, s] with value m / 10^s as a decimal. */
function decimalForPercent(rng: Rng): [number, number] {
  const kind = weighted(rng, [[7, "simple"], [2, "over"], [1, "thousandths"]] as const);
  if (kind === "simple") return [rng.int(1, 99), 2];
  if (kind === "over") return [rng.int(101, 250), 2];
  return [rng.pick([125, 375, 625, 875, 25, 75, 175] as const), 3];
}

function decimalToPercent(rng: Rng): SprintItem {
  const [m, s] = decimalForPercent(rng);
  const dec = scaled(m, s);
  const pct = scaledValue(m, s - 2); // ×100
  return { prompt: `Write {{${dec}}} as a percentage`, answer: pct, suffix: "%", fact: `{{${dec} = ${ans(pct)}%}}`, mode: "fdp" };
}

function percentToDecimal(rng: Rng): SprintItem {
  const [m, s] = decimalForPercent(rng);
  const pctText = scaled(m, s - 2);
  const dec = scaledValue(m, s);
  return { prompt: `Write {{${pctText}%}} as a decimal`, answer: dec, fact: `{{${pctText}% = ${scaled(m, s)}}}`, mode: "fdp" };
}

function coprimeNumerator(rng: Rng, d: number): number {
  for (let i = 0; i < 50; i++) {
    const n = rng.int(1, d - 1);
    if (gcd(n, d) === 1) return n;
  }
  return 1;
}

function fractionToPercent(rng: Rng): SprintItem {
  const d = rng.pick([2, 4, 5, 10, 20, 25, 50] as const);
  const n = coprimeNumerator(rng, d);
  const pct = (n * 100) / d;
  return { prompt: `Write {{${n}/${d}}} as a percentage`, answer: pct, suffix: "%", fact: `{{${n}/${d} = ${pct}%}}`, mode: "fdp" };
}

function fractionToDecimal(rng: Rng): SprintItem {
  const d = rng.pick([2, 4, 5, 8, 10, 20, 25] as const);
  const n = coprimeNumerator(rng, d);
  const thousandths = (n * 1000) / d; // whole number for these denominators
  return { prompt: `Write {{${n}/${d}}} as a decimal`, answer: scaledValue(thousandths, 3), fact: `{{${n}/${d} = ${scaled(thousandths, 3)}}}`, mode: "fdp" };
}

function fdp(rng: Rng): SprintItem {
  const gen = weighted(rng, [
    [30, percentOf],
    [25, fractionOf],
    [15, decimalToPercent],
    [10, percentToDecimal],
    [10, fractionToPercent],
    [10, fractionToDecimal],
  ] as const);
  return gen(rng);
}

function powerOfTen(rng: Rng): SprintItem {
  for (let i = 0; i < 200; i++) {
    // The starting number m / 10^s: a whole number, or one with 1–2 decimal places.
    const s = rng.pick([0, 1, 1, 2] as const);
    const m = s === 0 ? rng.int(2, 999) : rng.int(1, 999);
    if (s > 0 && m % 10 === 0) continue; // keep the written number tidy (no trailing zeros)
    if (s === 1 && m < 11) continue;
    const op = rng.pick(["×10", "×100", "×1000", "÷10", "÷100", "÷1000", "×0.1", "×0.01", "÷0.1", "÷0.01"] as const);
    const shift = { "×10": 1, "×100": 2, "×1000": 3, "÷10": -1, "÷100": -2, "÷1000": -3, "×0.1": -1, "×0.01": -2, "÷0.1": 1, "÷0.01": 2 }[op];
    const e = shift - s; // answer = m × 10^e
    if (e < -4 || m * 10 ** Math.max(0, e) > 1_000_000) continue;
    const answer = e >= 0 ? m * 10 ** e : m / 10 ** -e;
    const start = scaled(m, s);
    const sym = op[0] === "×" ? "*" : "÷";
    const by = op.slice(1);
    const resultText = e >= 0 ? String(m * 10 ** e) : scaled(m, -e);
    return { prompt: `{{${start} ${sym} ${by}}}`, answer, fact: `{{${start} ${sym} ${by} = ${resultText}}}`, mode: "powers" };
  }
  return { prompt: "{{3.6 * 10}}", answer: 36, fact: "{{3.6 * 10 = 36}}", mode: "powers" };
}

function powers(rng: Rng): SprintItem {
  const kind = weighted(rng, [
    [25, "square"],
    [20, "sqrt"],
    [10, "cube"],
    [10, "cbrt"],
    [35, "ten"],
  ] as const);
  if (kind === "ten") return powerOfTen(rng);
  if (kind === "square") {
    const n = rng.int(2, 15);
    if (rng.bool(0.15)) return { prompt: `{{(-${n})^2}}`, answer: n * n, fact: `{{(-${n})^2 = ${n * n}}}`, mode: "powers" };
    return { prompt: `{{${n}^2}}`, answer: n * n, fact: `{{${n}^2 = ${n * n}}}`, mode: "powers" };
  }
  if (kind === "sqrt") {
    const n = rng.int(2, 15);
    return { prompt: `{{sqrt(${n * n})}}`, answer: n, fact: `{{sqrt(${n * n}) = ${n}}}`, mode: "powers" };
  }
  const n = rng.pick([2, 3, 4, 5, 2, 3, 4, 5, 10] as const);
  const neg = rng.bool(0.2);
  const base = neg ? -n : n;
  const cube = base * base * base;
  if (kind === "cube") {
    const shown = neg ? `(${base})` : String(base);
    return { prompt: `{{${shown}^3}}`, answer: cube, fact: `{{${shown}^3 = ${cube}}}`, mode: "powers" };
  }
  return { prompt: `{{cbrt(${cube})}}`, answer: base, fact: `{{cbrt(${cube}) = ${base}}}`, mode: "powers" };
}

const GENERATORS: Record<SprintFactMode, (rng: Rng) => SprintItem> = { tables, negatives, fdp, powers };

/** One quick fact for a sprint mode ("mixed" picks a random family). */
export function sprintItem(mode: SprintMode, rng: Rng): SprintItem {
  const m: SprintFactMode = mode === "mixed" ? rng.pick(FACT_MODES) : mode;
  return GENERATORS[m](rng);
}
