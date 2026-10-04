// Procedural skill drills for "Fractions" (Year 8).
// Every answer is computed with exact integer rationals [numerator, denominator] —
// never with floating-point arithmetic — and every random choice uses rng.*.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, lcm, num, money, clean, simplify } from "./helpers.ts";

// ---------------------------------------------------------------------------
// Exact rational arithmetic
// ---------------------------------------------------------------------------

/** A fraction in lowest terms with a positive denominator. */
type Q = [number, number];

function q(n: number, d = 1): Q {
  if (d === 0 || !Number.isInteger(n) || !Number.isInteger(d)) throw new Error(`bad fraction ${n}/${d}`);
  const [a, b] = simplify(n, d);
  return [a === 0 ? 0 : a, b];
}
const add = (a: Q, b: Q): Q => q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const sub = (a: Q, b: Q): Q => q(a[0] * b[1] - b[0] * a[1], a[1] * b[1]);
const mul = (a: Q, b: Q): Q => q(a[0] * b[0], a[1] * b[1]);
const div = (a: Q, b: Q): Q => q(a[0] * b[1], a[1] * b[0]);
const same = (a: Q, b: Q) => a[0] === b[0] && a[1] === b[1];
const cmp = (a: Q, b: Q) => a[0] * b[1] - b[0] * a[1];
const val = (a: Q) => a[0] / a[1];
const isInt = (a: Q) => a[1] === 1;
const neg = (a: Q): Q => q(-a[0], a[1]);
const absQ = (a: Q): Q => [Math.abs(a[0]), a[1]];
const recip = (a: Q): Q => q(a[1], a[0]);
const topHeavy = (a: Q) => a[1] !== 1 && Math.abs(a[0]) > a[1];
const ONE: Q = [1, 1];

/** Nearest whole number, halves rounded away from zero (7 1/2 → 8). */
function nearestWhole(a: Q): number {
  const s = a[0] < 0 ? -1 : 1;
  const n = Math.abs(a[0]), d = a[1];
  const w = Math.floor(n / d), r = n % d;
  return s * (2 * r >= d ? w + 1 : w) || 0;
}
/** Whole-number part only ("chopping off" the fraction). */
function chop(a: Q): number {
  const s = a[0] < 0 ? -1 : 1;
  return s * Math.floor(Math.abs(a[0]) / a[1]) || 0;
}

// ---------------------------------------------------------------------------
// Display helpers ({{maths}} markup)
// ---------------------------------------------------------------------------

/** Fraction exactly as given (not simplified). */
const fx = (n: number, d: number) => frac(n, d, { simplify: false });
/** Proper/improper fraction. */
const F = (a: Q) => frac(a[0], a[1]);
/** Mixed number when top-heavy. */
const M = (a: Q) => frac(a[0], a[1], { mixed: true });
const inner = (s: string) => s.slice(2, -2);
const wrap = (s: string) => `{{(${inner(s)})}}`;
/** Bracket negatives that follow an operator. */
const FB = (a: Q) => (a[0] < 0 ? wrap(F(a)) : F(a));
const MB = (a: Q) => (a[0] < 0 ? wrap(M(a)) : M(a));
const fxB = (n: number, d: number) => (n < 0 ? wrap(fx(n, d)) : fx(n, d));
/** A mixed number written exactly as given, e.g. raw(3, 18, 15) → {{3 18/15}}. */
const raw = (w: number, n: number, d: number) => (n === 0 ? `{{${w}}}` : w === 0 ? `{{${n}/${d}}}` : `{{${w} ${n}/${d}}}`);
/** Inner maths text for use inside a bigger {{ }} expression. */
const ix = (a: Q) => inner(F(a));
const ixb = (a: Q) => (a[0] < 0 ? `(${ix(a)})` : ix(a));
const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
function andList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

interface Person {
  name: string;
  he: string;
  his: string;
}
const NAMES: Person[] = [
  { name: "Aisha", he: "she", his: "her" },
  { name: "Wei Ling", he: "she", his: "her" },
  { name: "Arjun", he: "he", his: "his" },
  { name: "Priya", he: "she", his: "her" },
  { name: "Marcus", he: "he", his: "his" },
  { name: "Siti", he: "she", his: "her" },
  { name: "Ethan", he: "he", his: "his" },
  { name: "Mei", he: "she", his: "her" },
  { name: "Ravi", he: "he", his: "his" },
  { name: "Hana", he: "she", his: "her" },
  { name: "Jun", he: "he", his: "his" },
  { name: "Zara", he: "she", his: "her" },
];

const SIMP = "Give your answer in its simplest form.";
const MIXP = "Give your answer as a mixed number in its simplest form.";
const TOPP = "Give your answer in its simplest form, writing any top-heavy fraction as a mixed number.";

// ---------------------------------------------------------------------------
// Random building blocks
// ---------------------------------------------------------------------------

/** A proper fraction in lowest terms with a denominator from `dens` (all ≥ 2). */
function proper(rng: Rng, dens: readonly number[]): Q {
  for (let i = 0; i < 60; i++) {
    const d = rng.pick(dens);
    const n = rng.int(1, d - 1);
    if (gcd(n, d) === 1) return [n, d];
  }
  return [1, rng.pick(dens)];
}

interface Mixed {
  w: number;
  f: Q;
  m: Q;
}
/** A mixed number w n/d (w ≥ 1); m is its improper form (always in lowest terms). */
function mixed(rng: Rng, wMin: number, wMax: number, dens: readonly number[]): Mixed {
  const f = proper(rng, dens);
  const w = rng.int(wMin, wMax);
  return { w, f, m: [w * f[1] + f[0], f[1]] };
}

// ---------------------------------------------------------------------------
// Answer + trap helpers
// ---------------------------------------------------------------------------

function fracAns(a: Q, mixedForm = false): AnswerSpec {
  if (mixedForm) return { type: "fraction", n: a[0], d: a[1], simplest: true, form: "mixed", display: M(a) };
  return { type: "fraction", n: a[0], d: a[1], simplest: true, display: topHeavy(a) ? `${F(a)} or ${M(a)}` : F(a) };
}

function trapF(list: Trap[], ans: Q, wrong: Q | null, feedback: string) {
  if (!wrong || wrong[0] === 0 || same(wrong, ans)) return;
  if (list.some((t) => t.spec.type === "fraction" && t.spec.n * wrong[1] === wrong[0] * t.spec.d)) return;
  list.push({ spec: { type: "fraction", n: wrong[0], d: wrong[1] }, feedback });
}

function trapN(list: Trap[], ans: number, wrong: number, feedback: string) {
  if (!Number.isFinite(wrong) || wrong === 0 || Math.abs(wrong - ans) < 1e-9) return;
  if (list.some((t) => t.spec.type === "number" && Math.abs(t.spec.value - wrong) < 1e-9)) return;
  list.push({ spec: { type: "number", value: clean(wrong) }, feedback });
}

// ---------------------------------------------------------------------------
// Worked-step helpers
// ---------------------------------------------------------------------------

function cancelPair(x: Q, y: Q) {
  const p = Math.abs(x[0]), r = x[1], s = Math.abs(y[0]), t = y[1];
  const g1 = gcd(p, t), g2 = gcd(s, r);
  return { p, r, s, t, g1, g2, p2: p / g1, t2: t / g1, s2: s / g2, r2: r / g2 };
}

/** Sizes only: cancel (if possible) then multiply. 1–2 steps. */
function mulWork(x: Q, y: Q): string[] {
  const c = cancelPair(x, y);
  const out: string[] = [];
  if (c.g1 > 1 || c.g2 > 1) {
    const parts: string[] = [];
    if (c.g1 > 1) parts.push(`${c.p} and ${c.t} by ${c.g1}`);
    if (c.g2 > 1) parts.push(`${c.s} and ${c.r} by ${c.g2}`);
    out.push(`Cancel first — divide ${parts.join(", and ")}: ${fx(c.p2, c.r2)} × ${fx(c.s2, c.t2)}.`);
  }
  out.push(`Multiply the numerators and the denominators: {{(${c.p2} * ${c.s2})/(${c.r2} * ${c.t2})}} = ${fx(c.p2 * c.s2, c.r2 * c.t2)}.`);
  return out;
}

/** Sizes only: the same as mulWork but in one line. */
function mulCompact(x: Q, y: Q): string {
  const c = cancelPair(x, y);
  const res = fx(c.p2 * c.s2, c.r2 * c.t2);
  if (c.g1 > 1 || c.g2 > 1) return `Cancel common factors, then multiply: ${fx(c.p, c.r)} × ${fx(c.s, c.t)} = ${fx(c.p2, c.r2)} × ${fx(c.s2, c.t2)} = ${res}.`;
  return `Multiply the numerators and the denominators: ${fx(c.p, c.r)} × ${fx(c.s, c.t)} = ${res}.`;
}

/** "x ± y = … = result" with a common denominator (signed values allowed). */
function combineLine(x: Q, y: Q, op: "+" | "-"): string {
  const L = lcm(x[1], y[1]);
  const xs = (x[0] * L) / x[1], ys = (y[0] * L) / y[1];
  const N = op === "+" ? xs + ys : xs - ys;
  const res = q(N, L);
  const sym = op === "+" ? "+" : "−";
  let s = `${F(x)} ${sym} ${FB(y)}`;
  if (x[1] !== L || y[1] !== L) s += ` = ${fx(xs, L)} ${sym} ${fxB(ys, L)}`;
  s += ` = ${fx(N, L)}`;
  if (!same(res, [N, L])) s += ` = ${F(res)}`;
  return s;
}

/** "x × y = … = result" (signed values allowed). */
function mulLine(x: Q, y: Q): string {
  const res = mul(x, y);
  const n = x[0] * y[0], d = x[1] * y[1];
  let s = `${F(x)} × ${FB(y)} = ${fx(n, d)}`;
  if (!same(res, [n, d])) s += ` = ${F(res)}`;
  return s;
}

/** "x ÷ y = x × 1/y = … = result" (signed values allowed). */
function divLine(x: Q, y: Q): string {
  const r = recip(y);
  const res = mul(x, r);
  const n = x[0] * r[0], d = x[1] * r[1];
  let s = `${F(x)} ÷ ${FB(y)} = ${F(x)} × ${FB(r)} = ${fx(n, d)}`;
  if (!same(res, [n, d])) s += ` = ${F(res)}`;
  return s;
}

function signNote(count: number): string {
  return count === 1 ? "One number is negative, so the answer is negative" : "Negative × negative = positive, so the answer is positive";
}

// ===========================================================================
// 1. Simplify a fraction fully
// ===========================================================================
const simplifyDrill: Drill = {
  id: "fractions.simplify",
  topicId: "fractions",
  title: "Simplify a fraction fully",
  level: 1,
  guideRef: "equivalence-ordering",
  generate(rng, tier) {
    let p = 1, d = 3, k = 2;
    for (let i = 0; i < 100; i++) {
      if (tier === 1) {
        d = rng.int(3, 10);
        p = rng.int(1, d - 1);
        k = rng.int(2, 6);
      } else if (tier === 2) {
        d = rng.int(3, 15);
        p = rng.int(1, d + 4);
        k = rng.int(3, 12);
      } else {
        d = rng.int(5, 20);
        p = rng.int(2, 2 * d - 1);
        k = rng.pick([7, 11, 12, 13, 14, 15, 16, 17, 18, 21, 24]);
      }
      if (gcd(p, d) === 1) break;
    }
    if (gcd(p, d) !== 1) p = 1;
    const s = tier >= 2 && rng.bool(0.25) ? -1 : 1;
    const A = k * p, B = k * d;
    const shown = fx(s * A, B);
    const ans: Q = [s * p, d];
    const steps: string[] = [];
    let prompt: string;
    if (s > 0 && p < d && rng.bool(0.4)) {
      const who = rng.pick(NAMES);
      const ctx =
        B <= 60
          ? [
              `${who.name} scored ${A} out of ${B} on a spelling test. What fraction of the marks did ${who.he} get?`,
              `A hawker centre has ${B} stalls, and ${A} of them sell only vegetarian food. What fraction of the stalls sell only vegetarian food?`,
              `${A} of the ${B} students in a school choir are in Year 8. What fraction of the choir is in Year 8?`,
              `An MRT train carriage has ${B} seats and ${A} of them are taken. What fraction of the seats are taken?`,
            ]
          : [
              `A school has ${B} students and ${A} of them walk to school. What fraction of the students walk to school?`,
              `In a survey, ${B} people named their favourite fruit and ${A} of them said durian. What fraction of the people said durian?`,
              `A library has ${B} books on one floor, and ${A} of them are mystery novels. What fraction of the books are mystery novels?`,
            ];
      prompt = `${rng.pick(ctx)} ${SIMP}`;
      steps.push(`The fraction is ${shown}.`);
    } else {
      prompt = rng.pick([`Write ${shown} in its simplest form.`, `Simplify ${shown} fully.`, `Cancel ${shown} down to its simplest form.`]);
    }
    steps.push(`The highest common factor (HCF) of ${A} and ${B} is ${k}.`);
    steps.push(`Divide the top and the bottom by ${k}: ${A} ÷ ${k} = ${p} and ${B} ÷ ${k} = ${d}.`);
    steps.push(`So ${shown} = ${F(ans)}. ${p} and ${d} have no common factor except 1, so it is fully simplified.`);
    return {
      prompt,
      answer: fracAns(ans),
      solution: steps,
      hint:
        tier === 3
          ? "Not sure of the HCF? Divide by any common factor (try 2, 3, 5, 7, 11, 13 …), then check again until nothing more cancels."
          : "What is the biggest number that divides exactly into both the top and the bottom?",
    };
  },
};

// ===========================================================================
// 2. Compare and order fractions (including negatives)
// ===========================================================================
const FAMILY: Record<1 | 2 | 3, number[]> = {
  1: [12, 20, 24, 30],
  2: [12, 18, 20, 24, 30, 36, 40, 42],
  3: [24, 30, 36, 40, 42, 45, 56, 60, 72],
};

/** Denominators that all divide one friendly common denominator. */
function cmpDens(rng: Rng, tier: 1 | 2 | 3): number[] {
  const L = rng.pick(FAMILY[tier]);
  const maxD = tier === 3 ? 15 : 12;
  const out: number[] = [];
  for (let d = 2; d <= maxD; d++) if (L % d === 0) out.push(d);
  return out;
}

function pickCmp(rng: Rng, tier: 1 | 2 | 3, dens: number[]): Q {
  for (let i = 0; i < 100; i++) {
    const d = rng.pick(dens);
    const n = tier === 3 && rng.bool(0.4) ? rng.int(d + 1, 3 * d - 1) : rng.int(1, d - 1);
    if (gcd(n, d) !== 1) continue;
    const s = tier >= 2 && rng.bool(0.5) ? -1 : 1;
    return [s * n, d];
  }
  return [1, dens[0]];
}

function cmpPair(rng: Rng, tier: 1 | 2 | 3, dens: number[]): [Q, Q] {
  for (let i = 0; i < 300; i++) {
    const x = pickCmp(rng, tier, dens), y = pickCmp(rng, tier, dens);
    if (x[1] === y[1]) continue;
    const sameSign = x[0] < 0 === y[0] < 0;
    if (!sameSign && !rng.bool(0.15)) continue;
    if (Math.abs(val(x) - val(y)) > (tier === 1 ? 0.3 : 0.25)) continue;
    return [x, y];
  }
  return [[2, 3], [3, 4]];
}

function compareSteps(x: Q, y: Q, show: (a: Q) => string): string[] {
  const L = lcm(x[1], y[1]);
  const xs = (x[0] * L) / x[1], ys = (y[0] * L) / y[1];
  const steps: string[] = [];
  const mixedShown = [x, y].filter((a) => show(a) !== F(a));
  if (mixedShown.length) steps.push(`Write mixed numbers as improper fractions: ${andList(mixedShown.map((a) => `${show(a)} = ${F(a)}`))}.`);
  const conv = [x, y].filter((a) => a[1] !== L).map((a) => `${F(a)} = ${fx((a[0] * L) / a[1], L)}`);
  steps.push(`Use the common denominator ${L}: ${andList(conv)}.`);
  const sym = xs < ys ? "<" : ">";
  steps.push(
    `Compare the numerators: ${num(xs)} ${sym} ${num(ys)}, so ${show(x)} ${sym} ${show(y)}.` +
      (x[0] < 0 && y[0] < 0 ? " (With negatives, the number further from zero is the smaller one.)" : ""),
  );
  return steps;
}

const LESS: AnswerSpec = { type: "text", accept: ["<", "less than", "is less than", "smaller than"], display: "<" };
const MORE: AnswerSpec = { type: "text", accept: [">", "greater than", "is greater than", "bigger than", "more than"], display: ">" };
const TRUE_A: AnswerSpec = { type: "text", accept: ["true", "t", "yes"], display: "True" };
const FALSE_A: AnswerSpec = { type: "text", accept: ["false", "f", "no"], display: "False" };

function orderAccept(list: Q[], sep: string): string[] {
  const s = list.map(ix);
  return [s.join(","), s.join(";"), s.join(""), s.join(sep), `${s.slice(0, -1).join(",")}and${s[s.length - 1]}`];
}

const compareDrill: Drill = {
  id: "fractions.compare-order",
  topicId: "fractions",
  title: "Compare and order fractions, including negatives",
  level: 2,
  guideRef: "equivalence-ordering",
  generate(rng, tier) {
    const dens = cmpDens(rng, tier);
    const mode = rng.pick(["symbol", "truefalse", "order"] as const);
    const negHint = tier >= 2 ? " With negatives, picture a number line: further left is smaller." : "";
    const hint = `Rewrite the fractions with a common denominator, then compare the numerators.${negHint}`;

    if (mode === "symbol") {
      const [x, y] = cmpPair(rng, tier, dens);
      const showMixed = tier === 3 && rng.bool(0.5);
      const show = (a: Q) => (showMixed ? M(a) : F(a));
      const lt = cmp(x, y) < 0;
      const steps = compareSteps(x, y, show);
      const bothNeg = x[0] < 0 && y[0] < 0;
      if (rng.bool(0.35)) {
        const askLarger = rng.bool();
        const target = askLarger ? (lt ? y : x) : lt ? x : y;
        const other = same(target, x) ? y : x;
        const traps: Trap[] = [];
        trapF(traps, target, other, bothNeg ? "Careful — with negatives, the number further from zero is the SMALLER one." : "Compare them over a common denominator before deciding.");
        return {
          prompt: `Which is ${askLarger ? "larger" : "smaller"}: ${show(x)} or ${show(y)}?`,
          answer: { type: "fraction", n: target[0], d: target[1], display: show(target) },
          solution: steps,
          hint,
          traps,
        };
      }
      return {
        prompt: rng.pick([
          `Write < or > in the box to make this true:\n\n${show(x)}   □   ${show(y)}`,
          `Which symbol, < or >, makes this statement true?\n\n${show(x)}   □   ${show(y)}`,
        ]),
        answer: lt ? LESS : MORE,
        solution: steps,
        hint,
        traps: [
          {
            spec: lt ? MORE : LESS,
            feedback: bothNeg ? "Careful — with negatives, the number further from zero is the smaller one." : "Not quite — compare them over a common denominator.",
          },
        ],
      };
    }

    if (mode === "truefalse") {
      const words: Record<string, string> = {
        "<": "is less than",
        ">": "is greater than",
        "<=": "is less than or equal to",
        ">=": "is greater than or equal to",
        "=": "is equal to",
        "!=": "is not equal to",
      };
      const plain: Record<string, string> = { "<": "<", ">": ">", "<=": "≤", ">=": "≥", "=": "=", "!=": "≠" };
      if (rng.bool(0.25)) {
        // Equivalent fractions: one side deliberately unsimplified.
        const x = pickCmp(rng, tier === 3 ? 2 : tier, dens);
        const k = rng.int(2, 5);
        const big = fx(k * x[0], k * x[1]);
        const sym = rng.pick(["=", "!=", "<=", ">="] as const);
        const truth = sym !== "!=";
        const flip = rng.bool();
        const left = flip ? big : F(x), right = flip ? F(x) : big;
        return {
          prompt: `True or false?\n\n{{${inner(left)} ${sym} ${inner(right)}}}`,
          answer: truth ? TRUE_A : FALSE_A,
          solution: [
            `Simplify ${big}: divide the top and the bottom by ${k} to get ${F(x)}.`,
            `So the two fractions are equal.`,
            `"${plain[sym]}" means "${words[sym]}", so the statement is **${truth ? "true" : "false"}**.`,
          ],
          hint: "Simplify any fraction that is not in its simplest form first.",
          traps: [{ spec: truth ? FALSE_A : TRUE_A, feedback: `Simplify ${big} first — then compare.` }],
        };
      }
      const [x, y] = cmpPair(rng, tier, dens);
      const showMixed = tier === 3 && rng.bool(0.5);
      const show = (a: Q) => (showMixed ? M(a) : F(a));
      const sym = rng.pick(["<", ">", "<=", ">="] as const);
      const c = cmp(x, y);
      const truth = sym === "<" || sym === "<=" ? c < 0 : c > 0;
      const steps = compareSteps(x, y, show);
      steps.push(`The statement says ${show(x)} ${words[sym]} ${show(y)}, so it is **${truth ? "true" : "false"}**.`);
      return {
        prompt: `True or false?\n\n{{${inner(show(x))} ${sym} ${inner(show(y))}}}`,
        answer: truth ? TRUE_A : FALSE_A,
        solution: steps.length > 4 ? [steps[0] + " " + steps[1], ...steps.slice(2)] : steps,
        hint,
        traps: [
          {
            spec: truth ? FALSE_A : TRUE_A,
            feedback: x[0] < 0 && y[0] < 0 ? "Careful with negatives — the number further from zero is the smaller one." : "Compare the fractions over a common denominator, then read the symbol carefully.",
          },
        ],
      };
    }

    // Order a list.
    const count = tier === 1 ? 3 : tier === 2 ? 4 : rng.pick([4, 5]);
    let vals: Q[] = [];
    for (let attempt = 0; attempt < 50; attempt++) {
      vals = [];
      for (let t = 0; vals.length < count && t < 200; t++) {
        const v = pickCmp(rng, tier, dens);
        if (!vals.some((w) => same(w, v))) vals.push(v);
      }
      if (vals.length < count) continue;
      if (new Set(vals.map((v) => v[1])).size < 2) continue;
      if (tier >= 2 && (!vals.some((v) => v[0] < 0) || !vals.some((v) => v[0] > 0))) continue;
      break;
    }
    if (vals.length < count) {
      const backup: Q[] = [[1, 2], [-1, 3], [3, 4], [-5, 6], [2, 3]];
      for (const b of backup) if (vals.length < count && !vals.some((w) => same(w, b))) vals.push(b);
    }
    const sorted = [...vals].sort(cmp);
    let shown = rng.shuffle(vals);
    for (let i = 0; i < 10 && (shown.every((v, j) => same(v, sorted[j])) || shown.every((v, j) => same(v, sorted[sorted.length - 1 - j]))); i++) shown = rng.shuffle(vals);
    const asc = !(tier >= 2 && rng.bool(0.3));
    const target = asc ? sorted : [...sorted].reverse();
    const reversed = [...target].reverse();
    const L = vals.reduce((acc, a) => lcm(acc, a[1]), 1);
    const nums = target.map((a) => (a[0] * L) / a[1]);
    const negs = vals.filter((v) => v[0] < 0);
    const traps: Trap[] = [
      {
        spec: { type: "text", accept: orderAccept(reversed, asc ? ">" : "<") },
        feedback: asc ? "That's largest first — the question asks for the smallest first." : "That's smallest first — the question asks for the largest first.",
      },
    ];
    if (negs.length >= 2) {
      // Classic slip: ordering negatives by their size, ignoring the minus sign.
      const wrongAsc = [...negs].sort((a, b) => cmp(absQ(a), absQ(b))).concat(sorted.filter((v) => v[0] > 0));
      const wrong = asc ? wrongAsc : [...wrongAsc].reverse();
      const differs = !wrong.every((v, j) => same(v, target[j])) && !wrong.every((v, j) => same(v, reversed[j]));
      if (differs) {
        traps.push({
          spec: { type: "text", accept: orderAccept(wrong, asc ? "<" : ">") },
          feedback: "Check the negatives: the bigger the number after the minus sign, the SMALLER the value (for example {{-3/4}} is less than {{-1/2}}).",
        });
      }
    }
    return {
      prompt:
        `${asc ? rng.pick(["Write these numbers in order, starting with the smallest:", "Put these fractions in ascending order (smallest first):"]) : rng.pick(["Write these numbers in order, starting with the largest:", "Put these fractions in descending order (largest first):"])}` +
        `\n\n${shown.map(F).join(",   ")}\n\nType them exactly as they are written, separated by commas.`,
      answer: { type: "text", accept: orderAccept(target, asc ? "<" : ">"), display: target.map(F).join(", ") },
      solution: [
        `Write every fraction over the common denominator ${L}: ${vals.map((a) => (a[1] === L ? F(a) : `${F(a)} = ${fx((a[0] * L) / a[1], L)}`)).join(", ")}.`,
        `Order the numerators: ${nums.map(num).join(asc ? " < " : " > ")}.` + (negs.length >= 2 ? " (Negatives further from zero are smaller.)" : ""),
        `So the order is ${target.map(F).join(", ")}.`,
      ],
      hint,
      traps,
    };
  },
};

// ===========================================================================
// 3. Add and subtract fractions
// ===========================================================================
const addSubDrill: Drill = {
  id: "fractions.add-subtract-fractions",
  topicId: "fractions",
  title: "Add and subtract fractions with different denominators",
  level: 1,
  guideRef: "adding-subtracting",
  generate(rng, tier) {
    const dens = tier === 1 ? [2, 3, 4, 5, 6, 8, 10, 12] : tier === 2 ? [3, 4, 5, 6, 7, 8, 9, 10, 12, 15] : [4, 5, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20];
    const nTerms = tier === 3 && rng.bool(0.5) ? 3 : 2;
    const maxL = tier === 1 ? 24 : tier === 2 ? 60 : 120;
    let terms: Q[] = [[1, 2], [1, 3]];
    let ops: ("+" | "-")[] = ["+"];
    let res: Q = [5, 6];
    let ok = false;
    for (let i = 0; i < 300 && !ok; i++) {
      const t: Q[] = [];
      const o: ("+" | "-")[] = [];
      for (let j = 0; j < nTerms; j++) {
        const f = proper(rng, dens);
        const negative = tier >= 2 && rng.bool(tier === 2 ? 0.25 : 0.35);
        t.push(negative ? neg(f) : f);
        if (j > 0) o.push(rng.bool() ? "+" : "-");
      }
      if (t[0][1] === t[1][1]) continue;
      if (nTerms === 3 && t[2][1] === t[0][1] && t[2][1] === t[1][1]) continue;
      if (t.reduce((acc, f) => lcm(acc, f[1]), 1) > maxL) continue;
      let r = t[0];
      o.forEach((op, j) => (r = op === "+" ? add(r, t[j + 1]) : sub(r, t[j + 1])));
      if (r[0] === 0 || isInt(r)) continue;
      if (tier === 1 && r[0] < 0) continue;
      terms = t;
      ops = o;
      res = r;
      ok = true;
    }
    const L = terms.reduce((acc, f) => lcm(acc, f[1]), 1);
    const scaled = terms.map((f) => (f[0] * L) / f[1]);
    let N = scaled[0];
    ops.forEach((op, j) => (N = op === "+" ? N + scaled[j + 1] : N - scaled[j + 1]));
    const sym = (op: "+" | "-") => (op === "+" ? "+" : "−");
    const expr = terms.map((f, j) => (j === 0 ? F(f) : `${sym(ops[j - 1])} ${FB(f)}`)).join(" ");
    const [a, b] = terms;
    const allPos = terms.every((f) => f[0] > 0);
    let prompt = `${rng.pick(["Work out", "Calculate"])} ${expr}. ${SIMP}`;
    if (nTerms === 2 && allPos && tier <= 2 && rng.bool(0.4)) {
      const who = rng.pick(NAMES);
      if (ops[0] === "+") {
        prompt = rng.pick([
          `${who.name} drinks ${F(a)} of a litre of water before school and ${F(b)} of a litre after school. How many litres does ${who.he} drink altogether? ${SIMP}`,
          `A recipe for vegetable fried rice uses ${F(a)} of a cup of peas and ${F(b)} of a cup of sweetcorn. How many cups of vegetables is that in total? ${SIMP}`,
        ]);
      } else if (res[0] > 0) {
        prompt = rng.pick([
          `A jug holds ${F(a)} of a litre of soy milk. ${who.name} pours out ${F(b)} of a litre. How much soy milk is left in the jug, in litres? ${SIMP}`,
          `${who.name} needs to walk ${F(a)} of a kilometre to the MRT station and has already walked ${F(b)} of a kilometre. How much further does ${who.he} have to walk, in km? ${SIMP}`,
        ]);
      }
    }
    const uniq = Array.from(new Set(terms.map((f) => f[1])));
    const steps = [
      `The lowest common multiple of ${andList(uniq.map(String))} is ${L}, so use ${L} as the common denominator.`,
      `Rewrite the fractions: ${andList(terms.filter((f) => f[1] !== L).map((f) => `${F(f)} = ${fx(f[0] * (L / f[1]), L)}`))}.`,
    ];
    let last = `Combine the numerators: ${scaled.map((s, j) => (j === 0 ? num(s) : `${sym(ops[j - 1])} ${s < 0 ? `(${num(s)})` : num(s)}`)).join(" ")} = ${num(N)}, so the answer is ${fx(N, L)}`;
    if (!same(res, [N, L])) last += ` = ${F(res)}`;
    if (topHeavy(res)) last += ` = ${M(res)}`;
    steps.push(`${last}.`);
    const traps: Trap[] = [];
    if (nTerms === 2 && allPos) {
      if (ops[0] === "+") {
        trapF(traps, res, q(a[0] + b[0], a[1] + b[1]), "You added the denominators too. The denominator gives the size of the pieces — make it the same first, then add only the numerators.");
        trapF(traps, res, q(a[0] + b[0], L), "You changed the denominators but not the numerators — whatever you multiply the bottom by, multiply the top by too.");
      } else {
        trapF(traps, res, q(a[0] - b[0], a[1] - b[1]), "You subtracted the denominators too. Rewrite both fractions over a common denominator, then subtract only the numerators.");
        trapF(traps, res, q(a[0] - b[0], L), "You changed the denominators but not the numerators — whatever you multiply the bottom by, multiply the top by too.");
      }
    }
    return {
      prompt,
      answer: fracAns(res),
      solution: steps,
      hint: "You can only add or subtract fractions when the pieces are the same size. What is the lowest common multiple of the denominators?",
      traps,
    };
  },
};

// ===========================================================================
// 4. Add and subtract mixed numbers
// ===========================================================================
const mixedAddSubDrill: Drill = {
  id: "fractions.mixed-add-subtract",
  topicId: "fractions",
  title: "Add and subtract mixed numbers",
  level: 2,
  guideRef: "adding-subtracting",
  generate(rng, tier) {
    type K = "add" | "sub" | "sub-borrow" | "whole-minus" | "three" | "negative";
    let kind: K = rng.pick<K>(tier === 1 ? ["add", "sub", "sub"] : tier === 2 ? ["add", "sub-borrow", "sub-borrow", "whole-minus"] : ["sub-borrow", "three", "negative"]);
    const dens = tier === 1 ? [2, 3, 4, 5, 6, 8, 10, 12] : tier === 2 ? [2, 3, 4, 5, 6, 7, 8, 9, 10, 12] : [3, 4, 5, 6, 7, 8, 9, 10, 12, 15];
    const maxL = tier === 1 ? 24 : tier === 2 ? 60 : 90;
    const wMax = tier === 1 ? 6 : tier === 2 ? 9 : 12;
    let A = mixed(rng, 2, wMax, dens), B = mixed(rng, 1, wMax, dens), C = mixed(rng, 1, wMax, dens);
    let W = 5;
    let signs: ("+" | "-")[] = ["-"];
    let ok = false;
    for (let i = 0; i < 400 && !ok; i++) {
      A = mixed(rng, 2, wMax, dens);
      B = mixed(rng, 1, wMax, dens);
      C = mixed(rng, 1, wMax, dens);
      if (kind === "whole-minus") {
        W = rng.int(3, 10);
        signs = ["-"];
        ok = B.w <= W - 2;
        continue;
      }
      if (A.f[1] === B.f[1] || lcm(A.f[1], B.f[1]) > maxL) continue;
      if (kind === "add") {
        signs = ["+"];
        if (tier === 2 && cmp(add(A.f, B.f), ONE) <= 0) continue;
        ok = !isInt(add(A.m, B.m));
      } else if (kind === "sub") {
        signs = ["-"];
        ok = A.w > B.w && cmp(A.f, B.f) > 0;
      } else if (kind === "sub-borrow") {
        signs = ["-"];
        ok = A.w - B.w >= 2 && cmp(A.f, B.f) < 0;
      } else if (kind === "negative") {
        signs = ["-"];
        const r = sub(A.m, B.m);
        ok = cmp(r, [-1, 1]) < 0 && !isInt(r);
      } else {
        signs = rng.bool() ? ["+", "-"] : ["-", "+"];
        if (lcm(lcm(A.f[1], B.f[1]), C.f[1]) > maxL) continue;
        const r = signs[0] === "+" ? sub(add(A.m, B.m), C.m) : add(sub(A.m, B.m), C.m);
        ok = cmp(r, ONE) > 0 && !isInt(r);
      }
    }
    if (!ok) {
      kind = "sub-borrow";
      A = { w: 4, f: [1, 5], m: [21, 5] };
      B = { w: 1, f: [2, 3], m: [5, 3] };
      signs = ["-"];
    }
    const terms: Q[] = kind === "whole-minus" ? [[W, 1], B.m] : kind === "three" ? [A.m, B.m, C.m] : [A.m, B.m];
    let res = terms[0];
    signs.forEach((s, j) => (res = s === "+" ? add(res, terms[j + 1]) : sub(res, terms[j + 1])));
    const sym = (s: "+" | "-") => (s === "+" ? "+" : "−");
    const expr = terms.map((t, j) => (j === 0 ? M(t) : `${sym(signs[j - 1])} ${M(t)}`)).join(" ");

    // Prompt
    let prompt = `${rng.pick(["Work out", "Calculate"])} ${expr}. ${MIXP}`;
    const who = rng.pick(NAMES);
    if (tier <= 2 && rng.bool(0.45)) {
      if (kind === "add") {
        prompt = rng.pick([
          `${who.name} cycles ${M(A.m)} km to the library and then ${M(B.m)} km to a friend's house. How far does ${who.he} cycle altogether? ${MIXP}`,
          `A hawker stall cooks ${M(A.m)} kg of rice for lunch and ${M(B.m)} kg for dinner. How many kilograms of rice does it cook altogether? ${MIXP}`,
        ]);
      } else if (kind === "sub" || kind === "sub-borrow") {
        prompt = rng.pick([
          `A plank of wood is ${M(A.m)} m long. ${who.name} cuts off ${M(B.m)} m. How long is the piece that is left? ${MIXP}`,
          `A bag holds ${M(A.m)} kg of rice. ${M(B.m)} kg is used to cook vegetable biryani for a class party. How much rice is left? ${MIXP}`,
        ]);
      } else if (kind === "whole-minus") {
        prompt = `${who.name} has ${W} m of ribbon and uses ${M(B.m)} m to wrap a present. How much ribbon is left? ${MIXP}`;
      }
    }

    // Solution
    const est = terms.map(nearestWhole);
    let estVal = est[0];
    signs.forEach((s, j) => (estVal = s === "+" ? estVal + est[j + 1] : estVal - est[j + 1]));
    const steps: string[] = [
      `Estimate first: about ${est.map((e, j) => (j === 0 ? num(e) : `${sym(signs[j - 1])} ${num(e)}`)).join(" ")} = ${num(estVal)}.`,
    ];
    const traps: Trap[] = [];
    const simp = (n: number, L: number) => (gcd(n, L) > 1 ? ` = ${M(res)}` : "");
    if (kind === "add" || kind === "sub" || kind === "sub-borrow") {
      const L = lcm(A.f[1], B.f[1]);
      const a = (A.f[0] * L) / A.f[1], b = (B.f[0] * L) / B.f[1];
      steps.push(`Write the fraction parts over ${L}: ${andList([A.f, B.f].filter((f) => f[1] !== L).map((f) => `${F(f)} = ${fx((f[0] * L) / f[1], L)}`))}.`);
      if (kind === "add") {
        steps.push(`Add the whole numbers: ${A.w} + ${B.w} = ${A.w + B.w}. Add the fractions: ${fx(a, L)} + ${fx(b, L)} = ${fx(a + b, L)}.`);
        if (a + b > L) steps.push(`${fx(a + b, L)} = ${raw(1, a + b - L, L)}, so carry the 1: the answer is ${raw(A.w + B.w + 1, a + b - L, L)}${simp(a + b - L, L)}.`);
        else steps.push(`So the answer is ${raw(A.w + B.w, a + b, L)}${simp(a + b, L)}.`);
        trapF(traps, res, q((A.w + B.w) * (A.f[1] + B.f[1]) + A.f[0] + B.f[0], A.f[1] + B.f[1]), "You added the denominators. Give the fraction parts a common denominator first, then add only the numerators.");
      } else if (kind === "sub") {
        steps.push(`Subtract the whole numbers: ${A.w} − ${B.w} = ${A.w - B.w}. Subtract the fractions: ${fx(a, L)} − ${fx(b, L)} = ${fx(a - b, L)}.`);
        steps.push(`So the answer is ${raw(A.w - B.w, a - b, L)}${simp(a - b, L)}.`);
      } else {
        steps.push(`${fx(a, L)} is smaller than ${fx(b, L)}, so borrow 1 whole: ${raw(A.w, a, L)} = ${raw(A.w - 1, a + L, L)}.`);
        steps.push(`Now subtract: ${raw(A.w - 1, a + L, L)} − ${raw(B.w, b, L)} = ${raw(A.w - 1 - B.w, a + L - b, L)}${simp(a + L - b, L)}.`);
        trapF(traps, res, q((A.w - B.w) * L + (b - a), L), "It looks like you took the smaller fraction away from the bigger one. When the first fraction part is smaller, borrow 1 whole first (or use improper fractions).");
      }
    } else if (kind === "whole-minus") {
      const d = B.f[1], n = B.f[0];
      steps.push(`Borrow 1 whole from ${W}: ${W} = ${raw(W - 1, d, d)}.`);
      steps.push(`Now subtract: ${raw(W - 1, d, d)} − ${M(B.m)} = ${raw(W - 1 - B.w, d - n, d)}.`);
      trapF(traps, res, q((W - B.w) * d + n, d), `You can't just bring the ${F(B.f)} down — it is being taken away too. Write ${W} as ${raw(W - 1, d, d)} first.`);
    } else {
      const L = terms.reduce((acc, t) => lcm(acc, t[1]), 1);
      const Ns = terms.map((t) => (t[0] * L) / t[1]);
      let tot = Ns[0];
      signs.forEach((s, j) => (tot = s === "+" ? tot + Ns[j + 1] : tot - Ns[j + 1]));
      steps.push(`Change to improper fractions over ${L}: ${terms.map((t, j) => `${M(t)} = ${fx(Ns[j], L)}`).join(", ")}.`);
      steps.push(
        `Combine the numerators: ${Ns.map((v, j) => (j === 0 ? num(v) : `${sym(signs[j - 1])} ${num(v)}`)).join(" ")} = ${num(tot)}, giving ${fx(tot, L)}.` +
          (kind === "negative" ? " The second number is bigger, so the answer is negative." : ""),
      );
      steps.push(`Simplify and write as a mixed number: ${!same(res, [tot, L]) ? `${fx(tot, L)} = ${F(res)} = ` : ""}${M(res)}.`);
      if (kind === "negative") trapF(traps, res, neg(res), "Check the sign: you are taking away the bigger number, so the answer is negative.");
    }
    return {
      prompt,
      answer: fracAns(res, true),
      solution: steps,
      hint:
        kind === "sub-borrow" || kind === "whole-minus"
          ? "Is the first fraction part big enough to take the second away from? If not, borrow 1 whole (or change to improper fractions)."
          : "Deal with the whole numbers and the fraction parts — or change everything to improper fractions with a common denominator.",
      traps,
    };
  },
};

// ===========================================================================
// 5. Multiply fractions (including integer × mixed number)
// ===========================================================================
const multiplyDrill: Drill = {
  id: "fractions.multiply",
  topicId: "fractions",
  title: "Multiply fractions, whole numbers and mixed numbers",
  level: 1,
  guideRef: "multiplying",
  generate(rng, tier) {
    type K = "ff" | "of" | "int-frac" | "int-mixed" | "mixed-mixed" | "three";
    const kind: K = rng.pick<K>(tier === 1 ? ["ff", "ff", "of", "int-frac", "int-mixed"] : tier === 2 ? ["ff", "of", "int-frac", "int-mixed", "int-mixed"] : ["ff", "three", "mixed-mixed", "int-mixed"]);
    const dens = tier === 1 ? [2, 3, 4, 5, 6, 8, 10] : tier === 2 ? [3, 4, 5, 6, 7, 8, 9, 10, 12] : [3, 4, 5, 6, 7, 8, 9, 10, 12, 14, 15];
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const steps: string[] = [];
    let prompt: string;
    let answer: AnswerSpec;
    const hint = "Multiply the numerators together and the denominators together — and cancel common factors first to keep the numbers small.";

    if (kind === "ff" || kind === "of") {
      let x: Q = [2, 3], y: Q = [9, 10];
      for (let i = 0; i < 100; i++) {
        x = proper(rng, dens);
        y = proper(rng, dens);
        const canCancel = gcd(x[0], y[1]) > 1 || gcd(y[0], x[1]) > 1;
        if (tier >= 2 && !canCancel) continue;
        if (x[1] * y[1] > 60 && !canCancel) continue;
        break;
      }
      if (tier === 3 && kind === "ff") {
        const r = rng.int(0, 2);
        if (r !== 1) x = neg(x);
        if (r !== 0) y = neg(y);
      }
      const res = mul(x, y);
      const negs = (x[0] < 0 ? 1 : 0) + (y[0] < 0 ? 1 : 0);
      if (kind === "of") {
        prompt = rng.pick([
          `Find ${F(x)} of ${F(y)}. ${SIMP}`,
          `What is ${F(x)} of ${F(y)}? ${SIMP}`,
          `${F(y)} of a vegetable pizza is left over. ${who.name} eats ${F(x)} of the leftover pizza. What fraction of the whole pizza does ${who.he} eat? ${SIMP}`,
          `In a school, ${F(y)} of the students travel by MRT, and ${F(x)} of those MRT travellers change trains on the way. What fraction of all the students change trains on the way to school? ${SIMP}`,
        ]);
        steps.push(`"Of" means multiply: ${F(x)} of ${F(y)} = ${F(x)} × ${F(y)}.`);
      } else {
        prompt = `${rng.pick(["Work out", "Calculate"])} ${F(x)} × ${FB(y)}. ${SIMP}`;
        if (negs) steps.push(`${signNote(negs)}. Now work with the sizes.`);
      }
      steps.push(...mulWork(absQ(x), absQ(y)));
      steps.push(`So the answer is ${F(res)}.`);
      answer = fracAns(res);
      trapF(traps, res, q(x[0] * y[1], x[1] * y[0]), "That's what you get when you divide. To multiply, multiply the numerators together and the denominators together.");
    } else if (kind === "int-frac") {
      let k = 5, x: Q = [3, 8];
      for (let i = 0; i < 100; i++) {
        x = proper(rng, dens);
        k = rng.int(2, tier === 1 ? 9 : 15);
        if ((k * x[0]) % x[1] !== 0) break;
      }
      if ((k * x[0]) % x[1] === 0) {
        x = [3, 8];
        k = 5;
      }
      const res = q(k * x[0], x[1]);
      prompt = rng.pick([
        `Work out ${k} × ${F(x)}. ${SIMP}`,
        `Work out ${F(x)} × ${k}. ${SIMP}`,
        `Each glass holds ${F(x)} of a litre of lime juice. How many litres are there in ${k} glasses? ${SIMP}`,
        `${who.name} walks ${F(x)} of a kilometre to school each day. How far does ${who.he} walk in ${k} days, in km? ${SIMP}`,
      ]);
      steps.push(`${k} × ${F(x)} means ${k} lots of ${F(x)}, so multiply the numerator by ${k}: ${fx(k * x[0], x[1])}.`);
      if (!same(res, [k * x[0], x[1]])) steps.push(`Simplify: ${fx(k * x[0], x[1])} = ${F(res)}.`);
      if (topHeavy(res)) steps.push(`As a mixed number that is ${M(res)}.`);
      if (steps.length < 2) steps.push(`Check: ${k} pieces of size ${fx(x[0], x[1])} make ${F(res)} — that's ${k * x[0]} lots of ${fx(1, x[1])}.`);
      answer = fracAns(res);
      trapF(traps, res, x, `Multiplying the top AND the bottom by ${k} just gives a fraction equal to ${F(x)}. Only the numerator is multiplied.`);
      trapF(traps, res, q(x[0], k * x[1]), "You multiplied the denominator — that makes the pieces smaller. Multiply the numerator instead.");
    } else if (kind === "int-mixed") {
      let k = 4, A: Mixed = { w: 2, f: [3, 5], m: [13, 5] };
      for (let i = 0; i < 100; i++) {
        A = mixed(rng, 1, tier === 3 ? 9 : tier === 2 ? 6 : 4, tier === 1 ? [2, 3, 4, 5, 8] : dens);
        k = rng.int(2, tier === 3 ? 12 : tier === 2 ? 9 : 6);
        if ((k * A.f[0]) % A.f[1] !== 0) break;
      }
      if ((k * A.f[0]) % A.f[1] === 0) {
        A = { w: 2, f: [3, 5], m: [13, 5] };
        k = 4;
      }
      const res = q(k * A.m[0], A.m[1]);
      // Real-life measures only use friendly fractions (no 7ths or 14ths of a cup).
      const friendly = [2, 3, 4, 5, 8, 10].includes(A.f[1]);
      prompt = rng.pick([
        `Work out ${k} × ${M(A.m)}. ${MIXP}`,
        `Work out ${M(A.m)} × ${k}. ${MIXP}`,
        ...(friendly
          ? [
              `A recipe needs ${M(A.m)} cups of flour. ${who.name} makes ${k} batches. How many cups of flour does ${who.he} need? ${MIXP}`,
              `A large water container holds ${M(A.m)} litres. How many litres are there in ${k} containers? ${MIXP}`,
            ]
          : []),
      ]);
      const raw1 = fx(k * A.m[0], A.m[1]);
      steps.push(`Change to an improper fraction: ${M(A.m)} = ${F(A.m)}.`);
      steps.push(`${k} × ${F(A.m)} = ${raw1}${same(res, [k * A.m[0], A.m[1]]) ? "" : ` = ${F(res)}`} = ${M(res)}.`);
      steps.push(`Check with the distributive law: ${k} × ${A.w} + ${k} × ${F(A.f)} = ${k * A.w} + ${M(q(k * A.f[0], A.f[1]))} = ${M(res)}.`);
      answer = fracAns(res, true);
      trapF(traps, res, q(k * A.w * A.f[1] + A.f[0], A.f[1]), `You multiplied the whole-number part but not the fraction part. Both parts must be multiplied by ${k}.`);
    } else if (kind === "mixed-mixed") {
      const md = [2, 3, 4, 5, 6, 8, 10];
      let A: Mixed = { w: 2, f: [1, 2], m: [5, 2] }, B: Mixed = { w: 1, f: [1, 3], m: [4, 3] };
      let res: Q = mul(A.m, B.m);
      for (let i = 0; i < 100; i++) {
        const a2 = mixed(rng, 1, 4, md), b2 = mixed(rng, 1, 4, md);
        const r = mul(a2.m, b2.m);
        if (isInt(r) || r[1] > 60) continue;
        A = a2;
        B = b2;
        res = r;
        break;
      }
      prompt = rng.pick([
        `Work out ${M(A.m)} × ${M(B.m)}. ${MIXP}`,
        `A rectangular vegetable garden is ${M(A.m)} m long and ${M(B.m)} m wide. What is its area, in m²? ${MIXP}`,
      ]);
      steps.push(`Change to improper fractions: ${M(A.m)} = ${F(A.m)} and ${M(B.m)} = ${F(B.m)}.`);
      steps.push(...mulWork(A.m, B.m));
      steps.push(`As a mixed number: ${M(res)}.`);
      answer = fracAns(res, true);
      trapF(traps, res, add(q(A.w * B.w), mul(A.f, B.f)), "You multiplied the whole numbers and the fractions separately — that misses part of the product. Change both to improper fractions first.");
    } else {
      // three fractions, with signs
      let fs: Q[] = [[2, 3], [9, 10], [5, 6]];
      let res: Q = mul(mul(fs[0], fs[1]), fs[2]);
      for (let i = 0; i < 200; i++) {
        const g = [proper(rng, dens), proper(rng, dens), proper(rng, dens)];
        const r = mul(mul(g[0], g[1]), g[2]);
        const D = g[0][1] * g[1][1] * g[2][1];
        if (r[1] > 60 || D / r[1] < 4) continue;
        fs = g;
        res = r;
        break;
      }
      const negIdx = rng.int(0, 2);
      const twoNeg = rng.bool(0.4);
      fs = fs.map((f, j) => (j === negIdx || (twoNeg && j === (negIdx + 1) % 3) ? neg(f) : f));
      res = mul(mul(fs[0], fs[1]), fs[2]);
      const negs = fs.filter((f) => f[0] < 0).length;
      const P = fs.reduce((acc, f) => acc * Math.abs(f[0]), 1), D = fs.reduce((acc, f) => acc * f[1], 1);
      prompt = `Work out ${F(fs[0])} × ${FB(fs[1])} × ${FB(fs[2])}. ${SIMP}`;
      steps.push(`${signNote(negs)}.`);
      steps.push(`Multiply all the numerators and all the denominators: {{(${fs.map((f) => Math.abs(f[0])).join(" * ")})/(${fs.map((f) => f[1]).join(" * ")})}} = ${fx(P, D)}.`);
      steps.push(`Simplify by dividing the top and the bottom by ${gcd(P, D)}: ${F(absQ(res))}. So the answer is ${F(res)}.`);
      answer = fracAns(res);
    }
    return { prompt, answer, solution: steps, hint, traps };
  },
};

// ===========================================================================
// 6. Reciprocals and dividing by a fraction
// ===========================================================================
const divideDrill: Drill = {
  id: "fractions.divide",
  topicId: "fractions",
  title: "Reciprocals and dividing by a fraction",
  level: 2,
  guideRef: "dividing",
  generate(rng, tier) {
    type K = "recip" | "int-div" | "int-div-ctx" | "ff" | "frac-div-int";
    const kind: K = rng.pick<K>(tier === 1 ? ["recip", "int-div", "int-div-ctx", "ff"] : tier === 2 ? ["recip", "int-div", "int-div-ctx", "ff", "ff", "frac-div-int"] : ["recip", "ff", "ff", "frac-div-int", "int-div"]);
    const dens = tier === 1 ? [2, 3, 4, 5, 6, 8] : tier === 2 ? [3, 4, 5, 6, 7, 8, 9, 10, 12] : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15];
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const steps: string[] = [];
    let prompt: string;
    let answer: AnswerSpec;
    let hint = "Dividing by a fraction is the same as multiplying by its reciprocal (flip the fraction you are dividing by).";

    if (kind === "recip") {
      hint = "The reciprocal is the number you multiply by to get 1. For a fraction, swap the top and the bottom.";
      let x: Q;
      let shown: string;
      let mx: Mixed | null = null;
      const r = rng.next();
      if (tier === 1 && r < 0.3) x = [rng.int(2, 12), 1];
      else if (tier === 1 || r < 0.35) x = proper(rng, dens);
      else if (r < 0.65) {
        const d = rng.pick(dens);
        let n = rng.int(d + 1, 3 * d - 1);
        if (gcd(n, d) !== 1) n = d + 1;
        x = [n, d];
      } else {
        mx = mixed(rng, 1, 5, dens);
        x = mx.m;
      }
      if (tier === 3) x = neg(x);
      shown = mx ? M(x) : F(x);
      const ans = recip(x);
      prompt = rng.pick([`Write down the reciprocal of ${shown}.`, `What is the reciprocal of ${shown}?`, `What number do you multiply ${shown} by to get 1?`]);
      if (mx) steps.push(`Change to an improper fraction first: ${shown} = ${F(x)}.`);
      if (isInt(x)) steps.push(`Write ${x[0]} as a fraction: {{${x[0]}/1}}.`);
      steps.push(`Flip it — swap the numerator and the denominator. The reciprocal is ${F(ans)}.`);
      steps.push(`Check: ${F(x)} × ${FB(ans)} = 1.`);
      answer = fracAns(ans);
      if (isInt(x)) trapF(traps, ans, x, "That's the number you started with. Write it as a fraction over 1, then flip it.");
      if (mx) trapF(traps, ans, q(x[0] < 0 ? -(mx.w * mx.f[0] + mx.f[1]) : mx.w * mx.f[0] + mx.f[1], mx.f[0]), "You only flipped the fraction part. Change the mixed number to an improper fraction first, then flip the whole thing.");
      if (tier === 3) trapF(traps, ans, neg(ans), "A number and its reciprocal multiply to +1, so they have the same sign — keep the minus sign.");
    } else if (kind === "int-div") {
      let x: Q = [3, 4], k = 6;
      for (let i = 0; i < 100; i++) {
        x = proper(rng, dens);
        k = rng.int(2, tier === 1 ? 10 : 15);
        if (tier >= 2 && x[0] === 1) continue;
        if (tier === 1 && (k * x[1]) % x[0] !== 0 && rng.bool(0.6)) continue;
        break;
      }
      if (tier === 3) {
        if (rng.bool()) k = -k;
        else x = neg(x);
      }
      const K: Q = [k, 1];
      const res = div(K, x);
      const rx = recip(x);
      prompt = `${rng.pick(["Work out", "Calculate"])} ${num(k)} ÷ ${FB(x)}. ${SIMP}`;
      steps.push(`Dividing by ${F(x)} is the same as multiplying by its reciprocal, ${F(rx)}.`);
      steps.push(`${num(k)} × ${FB(rx)} = ${fx(k * rx[0], rx[1])}${same(res, [k * rx[0], rx[1]]) ? "" : ` = ${F(res)}`}${topHeavy(res) ? ` = ${M(res)}` : ""}.`);
      steps.push(`Check: ${M(res)} × ${FB(x)} = ${num(k)}.`);
      answer = fracAns(res);
      trapF(traps, res, mul(K, x), `You multiplied by ${F(x)}. Dividing by a fraction means multiplying by its reciprocal.`);
    } else if (kind === "int-div-ctx") {
      let x: Q = [3, 4], j = 2;
      for (let i = 0; i < 100; i++) {
        x = proper(rng, dens);
        j = rng.int(1, tier === 1 ? 3 : 4);
        if (x[0] * j >= 2 && j * x[1] >= 3 && x[0] * j <= 30) break;
      }
      if (x[0] * j < 2 || j * x[1] < 3) {
        x = [3, 4];
        j = 2;
      }
      const k = x[0] * j, N = j * x[1];
      prompt = rng.pick([
        `A ${k}-litre jug of lime juice is poured into cups that each hold ${F(x)} of a litre. How many cups can be filled?`,
        `A ${k} m plank of wood is cut into pieces that are each ${F(x)} of a metre long. How many pieces are there?`,
        `${who.name} has ${k} hours to practise the piano. Each practice session lasts ${F(x)} of an hour. How many sessions can ${who.he} fit in?`,
        `How many lots of ${F(x)} are there in ${k}?`,
      ]);
      steps.push(`You need ${k} ÷ ${F(x)}: how many ${F(x)}s fit into ${k}?`);
      steps.push(`Multiply by the reciprocal: ${k} × ${F(recip(x))} = ${x[0] > 1 ? `${fx(k * x[1], x[0])} = ` : ""}${N}.`);
      steps.push(`Check: ${N} × ${F(x)} = ${k}.`);
      answer = { type: "number", value: N };
      trapN(traps, N, (k * x[0]) / x[1], `You multiplied by ${F(x)}. You want how many ${F(x)}s fit into ${k}, which is ${k} ÷ ${F(x)}.`);
    } else if (kind === "ff") {
      let x: Q = [3, 5], y: Q = [2, 3], res: Q = div(x, y);
      for (let i = 0; i < 100; i++) {
        const a = proper(rng, dens), b = proper(rng, dens);
        if (same(a, b)) continue;
        const r = div(a, b);
        if (r[1] > 60 || Math.abs(r[0]) > 120) continue;
        x = a;
        y = b;
        res = r;
        break;
      }
      if (tier === 3) {
        const r = rng.int(0, 2);
        if (r !== 1) x = neg(x);
        if (r !== 0) y = neg(y);
        res = div(x, y);
      }
      const negs = (x[0] < 0 ? 1 : 0) + (y[0] < 0 ? 1 : 0);
      prompt = rng.pick([`Work out ${F(x)} ÷ ${FB(y)}. ${SIMP}`, `Divide ${F(x)} by ${FB(y)}. ${SIMP}`, `Calculate ${F(x)} ÷ ${FB(y)}. ${SIMP}`]);
      steps.push(`Keep the first fraction, change ÷ to × and flip the second: ${F(absQ(x))} × ${F(recip(absQ(y)))}.`);
      steps.push(...mulWork(absQ(x), recip(absQ(y))));
      steps.push(`${negs ? `${signNote(negs)}: ` : "So the answer is "}${F(res)}${topHeavy(res) ? ` = ${M(res)}` : ""}.`);
      answer = fracAns(res);
      trapF(traps, res, mul(x, y), "You multiplied without flipping. To divide, multiply by the reciprocal of the second fraction.");
    } else {
      // fraction ÷ whole number
      let x: Q = [6, 7], k = 3;
      for (let i = 0; i < 100; i++) {
        x = proper(rng, dens);
        k = rng.int(2, 9);
        if (q(x[0], x[1] * k)[1] <= 100) break;
      }
      if (tier === 3 && rng.bool(0.6)) x = neg(x);
      const res = q(x[0], x[1] * k);
      prompt =
        x[0] > 0 && rng.bool(0.4)
          ? `${who.name} shares ${F(x)} of a cake equally between ${k} friends. What fraction of the whole cake does each friend get? ${SIMP}`
          : `Work out ${F(x)} ÷ ${k}. ${SIMP}`;
      steps.push(`Dividing by ${k} is the same as multiplying by its reciprocal, ${fx(1, k)}.`);
      steps.push(`${F(x)} × ${fx(1, k)} = ${fx(x[0], x[1] * k)}${same(res, [x[0], x[1] * k]) ? "" : ` = ${F(res)}`}.`);
      answer = fracAns(res);
      trapF(traps, res, q(x[0] * k, x[1]), `You multiplied by ${k}. Sharing into ${k} equal parts makes each part smaller.`);
    }
    return { prompt, answer, solution: steps, hint, traps };
  },
};

// ===========================================================================
// 7. Multiply and divide mixed numbers
// ===========================================================================
const mixedMulDivDrill: Drill = {
  id: "fractions.mixed-multiply-divide",
  topicId: "fractions",
  title: "Multiply and divide mixed numbers",
  level: 3,
  guideRef: "dividing",
  generate(rng, tier) {
    type K = "m-div-int" | "int-div-m-ctx" | "int-div-m" | "m-div-m" | "m-times-m" | "m-div-f";
    const kind: K = rng.pick<K>(
      tier === 1 ? ["m-div-int", "int-div-m-ctx", "m-div-m"] : tier === 2 ? ["m-div-m", "m-div-m", "m-times-m", "m-div-int", "int-div-m-ctx", "m-div-f"] : ["m-div-m", "m-div-m", "m-times-m", "int-div-m", "m-div-f"],
    );
    const dens = tier === 1 ? [2, 3, 4, 5] : tier === 2 ? [2, 3, 4, 5, 6, 8] : [2, 3, 4, 5, 6, 7, 8, 9, 10];
    const wMax = tier === 1 ? 4 : tier === 2 ? 5 : 7;
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const hint = "Change every mixed number to an improper fraction first. To divide, multiply by the reciprocal of the second number.";

    if (kind === "int-div-m-ctx") {
      // Whole-number answer: k ÷ (W n/d) = N.
      let A: Mixed = { w: 2, f: [1, 2], m: [5, 2] }, j = 2;
      for (let i = 0; i < 100; i++) {
        A = mixed(rng, 1, 3, [2, 3, 4]);
        j = rng.int(1, 3);
        if (j * A.m[0] <= 40) break;
      }
      if (j * A.m[0] > 40) {
        A = { w: 2, f: [1, 2], m: [5, 2] };
        j = 2;
      }
      const k = j * A.m[0], N = j * A.m[1];
      const prompt = rng.pick([
        `A ${k} m ribbon is cut into pieces that are each ${M(A.m)} m long. How many pieces are there?`,
        `Each cake needs ${M(A.m)} cups of flour. How many cakes can ${who.name} make with ${k} cups of flour?`,
        `How many lengths of ${M(A.m)} cm fit exactly into ${k} cm?`,
      ]);
      const traps2: Trap[] = [];
      trapN(traps2, N, (k * A.m[0]) / A.m[1], `You multiplied. You want how many ${M(A.m)}s fit into ${k}, which is a division.`);
      trapN(traps2, N, k / A.w, `You ignored the fraction part of ${M(A.m)}. Change it to an improper fraction first.`);
      return {
        prompt,
        answer: { type: "number", value: N },
        solution: [
          `You need ${k} ÷ ${M(A.m)}. Change to an improper fraction: ${M(A.m)} = ${F(A.m)}.`,
          `Multiply by the reciprocal: ${k} × ${F(recip(A.m))} = ${fx(k * A.m[1], A.m[0])} = ${N}.`,
          `Check: ${N} × ${M(A.m)} = ${k}.`,
        ],
        hint,
        traps: traps2,
      };
    }

    let x: Q = [9, 2], y: Q = [3, 1];
    let op: "×" | "÷" = "÷";
    let xMixed = true, yMixed = false;
    let A: Mixed = { w: 4, f: [1, 2], m: [9, 2] }, B: Mixed = { w: 1, f: [1, 3], m: [4, 3] };
    let k = 3;
    let res: Q = div(x, y);
    let found = false;
    for (let i = 0; i < 200 && !found; i++) {
      A = mixed(rng, 1, wMax, dens);
      B = mixed(rng, 1, wMax, dens);
      k = rng.int(2, tier === 1 ? 6 : 12);
      if (kind === "m-div-int") {
        x = A.m; y = [k, 1]; op = "÷"; xMixed = true; yMixed = false;
      } else if (kind === "int-div-m") {
        x = [k, 1]; y = B.m; op = "÷"; xMixed = false; yMixed = true;
      } else if (kind === "m-div-m") {
        x = A.m; y = B.m; op = "÷"; xMixed = true; yMixed = true;
      } else if (kind === "m-times-m") {
        x = A.m; y = B.m; op = "×"; xMixed = true; yMixed = true;
      } else {
        x = A.m; y = proper(rng, dens); op = "÷"; xMixed = true; yMixed = false;
      }
      if (same(x, y)) continue;
      const r = op === "×" ? mul(x, y) : div(x, y);
      if (r[1] > 60 || Math.abs(r[0]) > 400) continue;
      if (kind === "m-times-m" && isInt(r)) continue;
      res = r;
      found = true;
    }
    if (!found) {
      // Fallback (not expected): 4 1/2 ÷ 1 1/3.
      A = { w: 4, f: [1, 2], m: [9, 2] };
      B = { w: 1, f: [1, 3], m: [4, 3] };
      x = A.m;
      y = B.m;
      op = "÷";
      xMixed = true;
      yMixed = true;
    }
    let negs = 0;
    if (tier === 3 && rng.bool(0.4)) {
      if (rng.bool()) x = neg(x);
      else y = neg(y);
      negs = 1;
    }
    res = op === "×" ? mul(x, y) : div(x, y);
    const showX = xMixed ? M(x) : F(x);
    const showY = yMixed ? MB(y) : FB(y);
    const prompt = `${rng.pick(["Work out", "Calculate"])} ${showX} ${op} ${showY}. ${TOPP}`;
    const steps: string[] = [];
    const conv = [xMixed ? x : null, yMixed ? y : null].filter((a): a is Q => a !== null).map((a) => `${M(a)} = ${F(a)}`);
    let line = `Change to improper fractions: ${andList(conv)}.`;
    if (op === "÷") line += ` Then multiply by the reciprocal: ${F(absQ(x))} × ${F(recip(absQ(y)))}.`;
    steps.push(line);
    steps.push(mulCompact(absQ(x), op === "÷" ? recip(absQ(y)) : absQ(y)));
    steps.push(`${negs ? `${signNote(negs)}: ` : "So the answer is "}${F(res)}${topHeavy(res) ? ` = ${M(res)}` : ""}.`);

    if (negs === 0) {
      if (kind === "m-div-m") trapF(traps, res, add(q(A.w, B.w), div(A.f, B.f)), "You divided the whole numbers and the fractions separately — that doesn't work. Change both to improper fractions first.");
      if (kind === "m-times-m") trapF(traps, res, add(q(A.w * B.w), mul(A.f, B.f)), "You multiplied the whole numbers and the fractions separately — that misses part of the product. Change both to improper fractions first.");
      if (kind === "m-div-int") trapF(traps, res, add(q(A.w, k), A.f), "You only divided the whole-number part. Change the mixed number to an improper fraction, then divide all of it.");
    }
    if (op === "÷") trapF(traps, res, mul(x, y), "You multiplied. To divide, multiply by the reciprocal of the second number (flip it).");
    return { prompt, answer: fracAns(res, true), solution: steps, hint, traps };
  },
};

// ===========================================================================
// 8. Fractions of amounts — and finding the whole
// ===========================================================================
const ofAmountDrill: Drill = {
  id: "fractions.fraction-of-amount",
  topicId: "fractions",
  title: "Find a fraction of an amount, or the whole from a part",
  level: 1,
  guideRef: "fractions-of-amounts",
  generate(rng, tier) {
    type K = "fwd" | "fwd-ctx" | "fwd-money" | "fwd-improper" | "fwd-of-of" | "rev" | "rev-ctx" | "rev-left";
    const kind: K = rng.pick<K>(tier === 1 ? ["fwd", "fwd", "fwd-ctx", "rev"] : tier === 2 ? ["fwd-money", "fwd-ctx", "rev", "rev-ctx"] : ["fwd-improper", "fwd-of-of", "rev-left", "rev-ctx"]);
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const bMax = tier === 1 ? 10 : 12;
    const dens: number[] = [];
    for (let d = 2; d <= bMax; d++) dens.push(d);
    const mMax = tier === 1 ? 12 : 25;

    if (kind === "fwd" || kind === "fwd-ctx") {
      const f = proper(rng, dens);
      const [a, b] = f;
      const m = rng.int(2, mMax);
      const A = b * m, ans = a * m;
      let prompt: string;
      let display = String(ans);
      if (kind === "fwd") {
        const unit = rng.pick(["g", "kg", "km", "m", "ml", "cm", ""]);
        prompt = unit ? rng.pick([`Find ${F(f)} of ${A} ${unit}.`, `What is ${F(f)} of ${A} ${unit}?`]) : `Work out ${F(f)} of ${A}.`;
        if (unit) display = `${ans} ${unit}`;
      } else {
        const c = rng.int(0, 4);
        prompt = [
          `There are ${A} students in Year 8. ${F(f)} of them take the MRT to school. How many students take the MRT?`,
          `A water tank holds ${A} litres when it is full. It is ${F(f)} full. How many litres of water are in the tank?`,
          `${who.name} has $${A} and spends ${F(f)} of it on books. How much does ${who.he} spend?`,
          `A fruit stall has ${A} durians. By noon it has sold ${F(f)} of them. How many durians has it sold?`,
          `The bus ride to Sentosa takes ${A} minutes. ${who.name} spends ${F(f)} of the ride reading. How many minutes is that?`,
        ][c];
        if (c === 2) display = `$${ans}`;
      }
      if (a > 1) trapN(traps, ans, (A * b) / a, `You divided by the numerator and multiplied by the denominator — it's the other way round: divide by ${b}, then multiply by ${a}.`);
      else trapN(traps, ans, A * b, `To find ${F(f)} of an amount, DIVIDE by ${b} — don't multiply.`);
      return {
        prompt,
        answer: { type: "number", value: ans, display },
        solution:
          a > 1
            ? [`Find ${fx(1, b)} first: ${A} ÷ ${b} = ${m}.`, `${F(f)} is ${a} lots of that: ${a} × ${m} = ${ans}.`]
            : [`To find ${F(f)}, divide by ${b}: ${A} ÷ ${b} = ${ans}.`, `Check: ${b} lots of ${ans} make ${b} × ${ans} = ${A}.`],
        hint: "Divide by the denominator to find one part, then multiply by the numerator.",
        traps,
      };
    }

    if (kind === "fwd-money") {
      let f: Q = [3, 4];
      for (let i = 0; i < 50; i++) {
        f = proper(rng, [3, 4, 5, 6, 8, 10]);
        if (f[0] > 1) break;
      }
      if (f[0] === 1) f = [3, 4];
      const [a, b] = f;
      const part = 10 * rng.int(5, 150); // cents in one part
      const totalC = b * part, ansC = a * part;
      const prompt = rng.pick([
        `${who.name} has ${money(totalC / 100)} and spends ${F(f)} of it on a present. How much does ${who.he} spend?`,
        `Find ${F(f)} of ${money(totalC / 100)}.`,
        `A jacket costs ${money(totalC / 100)}. In a sale, ${F(f)} of the price is taken off. How much money is taken off?`,
      ]);
      trapN(traps, ansC / 100, (totalC * b) / a / 100, `You divided by ${a} and multiplied by ${b} — it's the other way round.`);
      return {
        prompt,
        answer: { type: "number", value: clean(ansC / 100), display: money(ansC / 100) },
        solution: [`Find ${fx(1, b)} first: ${money(totalC / 100)} ÷ ${b} = ${money(part / 100)}.`, `${F(f)} is ${a} lots of that: ${a} × ${money(part / 100)} = ${money(ansC / 100)}.`],
        hint: "Find one part first by dividing by the denominator.",
        traps,
      };
    }

    if (kind === "fwd-improper") {
      let f: Q = [5, 4];
      for (let i = 0; i < 50; i++) {
        const b = rng.int(2, 8);
        const a = rng.int(b + 1, 2 * b - 1);
        if (gcd(a, b) === 1) {
          f = [a, b];
          break;
        }
      }
      const [a, b] = f;
      const m = rng.int(3, 20);
      const A = b * m, ans = a * m;
      const c = rng.int(0, 2);
      const prompt = [
        `Find ${F(f)} of ${A} kg.`,
        `A school library has ${F(f)} times as many books as it had last year. Last year it had ${A} books. How many books does it have now?`,
        `A sunflower was ${A} cm tall. A month later its height is ${F(f)} of what it was. How tall is it now, in cm?`,
      ][c];
      trapN(traps, ans, (A * b) / a, `You divided by ${a} and multiplied by ${b} — it's the other way round.`);
      return {
        prompt,
        answer: { type: "number", value: ans, display: c === 0 ? `${ans} kg` : c === 2 ? `${ans} cm` : String(ans) },
        solution: [
          `Find ${fx(1, b)} first: ${A} ÷ ${b} = ${m}.`,
          `${F(f)} is ${a} lots of that: ${a} × ${m} = ${ans}.`,
          `The answer is more than ${A} because ${F(f)} is more than 1.`,
        ],
        hint: "A fraction bigger than 1 works the same way: divide by the denominator, multiply by the numerator.",
        traps,
      };
    }

    if (kind === "fwd-of-of") {
      const f1 = proper(rng, [2, 3, 4, 5, 6]), f2 = proper(rng, [2, 3, 4, 5, 6]);
      const m = rng.int(2, 10);
      const A = f1[1] * f2[1] * m;
      const first = (A / f1[1]) * f1[0];
      const ans = (first / f2[1]) * f2[0];
      const prompt = rng.pick([
        `${F(f1)} of the ${A} tickets for a school concert were sold on Monday, and ${F(f2)} of those were bought by students. How many student tickets were sold on Monday?`,
        `A school has ${A} students. ${F(f1)} of them signed up for a sports CCA, and ${F(f2)} of those chose badminton. How many students chose badminton?`,
      ]);
      trapN(traps, ans, first, `That's only the first step — now take ${F(f2)} of that.`);
      return {
        prompt,
        answer: { type: "number", value: ans },
        solution: [
          `First step: ${F(f1)} of ${A} = ${A} ÷ ${f1[1]}${f1[0] > 1 ? ` × ${f1[0]}` : ""} = ${first}.`,
          `Second step: ${F(f2)} of ${first} = ${first} ÷ ${f2[1]}${f2[0] > 1 ? ` × ${f2[0]}` : ""} = ${ans}.`,
          `(Or in one go: ${F(f1)} × ${F(f2)} = ${F(mul(f1, f2))}, and ${F(mul(f1, f2))} of ${A} is ${ans}.)`,
        ],
        hint: "Work in two steps: find the first fraction of the total, then the second fraction of THAT answer.",
        traps,
      };
    }

    if (kind === "rev-left") {
      const b = rng.int(3, 10);
      let s = rng.int(1, b - 1);
      if (gcd(s, b) !== 1) s = 1;
      const m = rng.int(3, 20);
      const sf: Q = [s, b], left: Q = [b - s, b];
      const L = (b - s) * m, W = b * m;
      const c = rng.int(0, 2);
      const prompt = [
        `${who.name} spends ${F(sf)} of ${who.his} pocket money on a book and has $${L} left. How much pocket money did ${who.he} start with?`,
        `A fruit stall sells ${F(sf)} of its durians in the morning and has ${L} durians left. How many durians did it have at the start?`,
        `${F(sf)} of the water in a tank has been used, and ${L} litres are left. How many litres were in the tank at the start?`,
      ][c];
      trapN(traps, W, (L / s) * b, `${c === 0 ? `$${L}` : L} is what is LEFT — that's ${F(left)} of the start, not ${F(sf)}.`);
      trapN(traps, W, s * m, "That's the amount used, not the amount at the start.");
      return {
        prompt,
        answer: { type: "number", value: W, display: c === 0 ? `$${W}` : String(W) },
        solution: [
          `The fraction left is 1 − ${F(sf)} = ${F(left)}.`,
          b - s > 1 ? `So ${F(left)} of the start is ${L}. One part (${fx(1, b)}) is ${L} ÷ ${b - s} = ${m}.` : `So ${F(left)} of the start is ${L}.`,
          `The start is ${b} × ${m} = ${W}.`,
          `Check: ${F(sf)} of ${W} is ${s * m}, and ${W} − ${s * m} = ${L}.`,
        ],
        hint: "What fraction is LEFT? That fraction of the starting amount is the number you are given.",
        traps,
      };
    }

    // rev / rev-ctx: the part is given, find the whole.
    const f = proper(rng, dens);
    const [a, b] = f;
    const m = rng.int(2, tier === 1 ? 12 : 25);
    const P = a * m, W = b * m;
    let prompt: string;
    let display = String(W);
    if (kind === "rev") {
      prompt = rng.pick([`${F(f)} of a number is ${P}. What is the number?`, `${P} is ${F(f)} of a number. Find the number.`]);
    } else {
      const c = rng.int(0, 3);
      prompt = [
        `${who.name} has read ${F(f)} of a book. That is ${P} pages. How many pages does the whole book have?`,
        `${who.name} has saved $${P}. This is ${F(f)} of the price of a new bicycle. How much does the bicycle cost?`,
        `${F(f)} of the members of a school CCA are in Year 8. There are ${P} Year 8 members. How many members does the CCA have altogether?`,
        `A water tank is ${F(f)} full and holds ${P} litres. How many litres does it hold when it is full?`,
      ][c];
      if (c === 1) display = `$${W}`;
    }
    trapN(traps, W, (P * a) / b, `That's ${F(f)} of ${P} — but ${P} is the part, not the whole. Work backwards from the part.`);
    if (a > 1) trapN(traps, W, P * b, `${F(f)} means ${a} parts out of ${b}. Find ONE part first by dividing by ${a}.`);
    return {
      prompt,
      answer: { type: "number", value: W, display },
      solution:
        a > 1
          ? [`${F(f)} of the whole is ${P}, so ${fx(1, b)} of the whole is ${P} ÷ ${a} = ${m}.`, `The whole is ${b} × ${m} = ${W}.`, `Check: ${F(f)} of ${W} = ${W} ÷ ${b} × ${a} = ${P}.`]
          : [`${F(f)} of the whole is ${P}, so the whole is ${b} × ${P} = ${W}.`, `Check: ${F(f)} of ${W} = ${W} ÷ ${b} = ${P}.`],
      hint: "Work backwards: the numerator tells you how many parts make the amount you're given. Find one part, then the whole.",
      traps,
    };
  },
};

// ===========================================================================
// 9. One quantity as a fraction of another
// ===========================================================================
interface UnitPair {
  small: string;
  big: string;
  one: string;
  f: number;
  step: number;
}
const UNIT_PAIRS: UnitPair[] = [
  { small: "minutes", big: "hours", one: "hour", f: 60, step: 5 },
  { small: "g", big: "kg", one: "kg", f: 1000, step: 50 },
  { small: "cm", big: "m", one: "m", f: 100, step: 5 },
  { small: "m", big: "km", one: "km", f: 1000, step: 50 },
  { small: "ml", big: "litres", one: "litre", f: 1000, step: 50 },
  { small: "seconds", big: "minutes", one: "minute", f: 60, step: 5 },
];

const asFractionDrill: Drill = {
  id: "fractions.one-as-fraction-of-another",
  topicId: "fractions",
  title: "Write one quantity as a fraction of another",
  level: 2,
  guideRef: "fractions-of-amounts",
  generate(rng, tier) {
    type K = "same" | "time" | "units" | "bigger" | "bigger-units";
    const kind: K = rng.pick<K>(tier === 1 ? ["same", "same", "time"] : tier === 2 ? ["units", "units", "bigger", "same"] : ["units", "bigger-units", "bigger"]);
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const hint = "The amount you are describing goes on top, the amount you compare it with goes on the bottom — and both must be in the same units.";

    if (kind === "same" || kind === "bigger") {
      let ans: Q = kind === "same" ? [3, 4] : [5, 3], s = 4;
      for (let i = 0; i < 100; i++) {
        const d = rng.int(kind === "same" ? 3 : 2, kind === "same" ? 12 : 9);
        const n = kind === "same" ? rng.int(1, d - 1) : rng.int(d + 1, 3 * d - 1);
        if (gcd(n, d) !== 1) continue;
        const s2 = rng.int(2, tier === 1 ? 6 : 12);
        if (d * s2 > (tier === 1 ? 60 : 150)) continue;
        ans = [n, d];
        s = s2;
        break;
      }
      const part = ans[0] * s, whole = ans[1] * s;
      let prompt: string;
      if (kind === "same") {
        prompt = rng.pick([
          `Write ${part} as a fraction of ${whole}. ${SIMP}`,
          `What fraction of ${whole} is ${part}? ${SIMP}`,
          `${who.name} has ${whole} stickers and gives away ${part} of them. What fraction of ${who.his} stickers does ${who.he} give away? ${SIMP}`,
          `A bag has ${whole} marbles and ${part} of them are blue. What fraction of the marbles are blue? ${SIMP}`,
        ]);
      } else {
        prompt = rng.pick([
          `Write ${part} as a fraction of ${whole}. ${SIMP}`,
          `Last year a school club had ${whole} members. This year it has ${part}. Write this year's number as a fraction of last year's. ${SIMP}`,
          `${who.name} ran ${part} m and ${rng.pick(NAMES.filter((p) => p.name !== who.name)).name} ran ${whole} m. Write ${who.name}'s distance as a fraction of the other distance. ${SIMP}`,
        ]);
      }
      const g = gcd(part, whole);
      const steps = [`The fraction is ${fx(part, whole)} — the amount you are describing goes on top.`, `The HCF of ${part} and ${whole} is ${g}, so ${fx(part, whole)} = ${F(ans)}.`];
      if (kind === "bigger") steps.push(`This is ${M(ans)} — more than 1, because ${part} is bigger than ${whole}.`);
      return { prompt, answer: fracAns(ans), solution: steps, hint, traps };
    }

    if (kind === "time") {
      const c = rng.int(0, 3);
      const spec = [
        { part: 5 * rng.int(1, 11), whole: 60, q: `What fraction of an hour is PART minutes?`, fact: "There are 60 minutes in an hour" },
        { part: rng.int(1, 23), whole: 24, q: `What fraction of a day is PART hours?`, fact: "There are 24 hours in a day" },
        { part: 5 * rng.int(1, 19), whole: 100, q: `What fraction of a metre is PART cm?`, fact: "There are 100 cm in a metre" },
        { part: 50 * rng.int(1, 19), whole: 1000, q: `What fraction of a kilogram is PART g?`, fact: "There are 1000 g in a kilogram" },
      ][c];
      const ans = q(spec.part, spec.whole);
      const g = gcd(spec.part, spec.whole);
      return {
        prompt: `${spec.q.replace("PART", String(spec.part))} ${SIMP}`,
        answer: fracAns(ans),
        solution: [
          `${spec.fact}, so the fraction is ${fx(spec.part, spec.whole)}.`,
          g > 1 ? `Divide the top and the bottom by ${g}: ${F(ans)}.` : `${F(ans)} is already in its simplest form.`,
        ],
        hint,
        traps,
      };
    }

    const U = rng.pick(UNIT_PAIRS);
    if (kind === "units") {
      let Bw = 2, part = 3 * U.step, ans: Q = q(part, Bw * U.f);
      for (let i = 0; i < 200; i++) {
        const Bw2 = rng.int(1, tier === 2 ? 4 : 5);
        const part2 = U.step * rng.int(1, Math.floor((Bw2 * U.f) / U.step) - 1);
        const r = q(part2, Bw2 * U.f);
        if (r[1] > (tier === 2 ? 60 : 100) || r[1] < 3) continue;
        Bw = Bw2;
        part = part2;
        ans = r;
        break;
      }
      const bigText = `${Bw} ${Bw === 1 ? U.one : U.big}`;
      const prompt = rng.pick([`Write ${part} ${U.small} as a fraction of ${bigText}. ${SIMP}`, `What fraction of ${bigText} is ${part} ${U.small}? ${SIMP}`]);
      trapF(traps, ans, q(part, Bw), `Make the units the same first: ${bigText} = ${Bw * U.f} ${U.small}.`);
      const g = gcd(part, Bw * U.f);
      return {
        prompt,
        answer: fracAns(ans),
        solution: [
          `Make the units the same: ${bigText} = ${Bw * U.f} ${U.small}.`,
          `The fraction is ${fx(part, Bw * U.f)}.`,
          g > 1 ? `Divide the top and the bottom by ${g}: ${F(ans)}.` : `${F(ans)} is already in its simplest form.`,
        ],
        hint,
        traps,
      };
    }

    // bigger-units: part in the big unit, whole in the small unit, answer > 1.
    let Bp = 0, Wsm = 0, ans: Q = ONE;
    for (let i = 0; i < 200; i++) {
      const Bp2 = rng.int(1, 3);
      const W2 = U.step * rng.int(2, Math.floor((Bp2 * U.f) / U.step) - 1);
      const r = q(Bp2 * U.f, W2);
      if (isInt(r) || r[1] > 30 || cmp(r, ONE) <= 0) continue;
      Bp = Bp2;
      Wsm = W2;
      ans = r;
      break;
    }
    if (Bp === 0) {
      // Fallback (not expected): 2 units of the big measure vs 7 steps of the small one.
      Bp = 2;
      Wsm = 7 * U.step;
      ans = q(2 * U.f, Wsm);
    }
    const bigText = `${Bp} ${Bp === 1 ? U.one : U.big}`;
    trapF(traps, ans, q(Bp, Wsm), `Make the units the same first: ${bigText} = ${Bp * U.f} ${U.small}.`);
    return {
      prompt: `Write ${bigText} as a fraction of ${Wsm} ${U.small}. ${SIMP}`,
      answer: fracAns(ans),
      solution: [
        `Make the units the same: ${bigText} = ${Bp * U.f} ${U.small}.`,
        `The fraction is ${fx(Bp * U.f, Wsm)}.`,
        `Simplify: ${F(ans)} = ${M(ans)}. It is more than 1 because ${bigText} is more than ${Wsm} ${U.small}.`,
      ],
      hint,
      traps,
    };
  },
};

// ===========================================================================
// 10. Estimate a fraction calculation
// ===========================================================================
function roughMixed(rng: Rng, wMin: number, wMax: number, dens: readonly number[], gap: number): Q {
  for (let i = 0; i < 100; i++) {
    const d = rng.pick(dens), n = rng.int(1, d - 1);
    if (gcd(n, d) !== 1 || Math.abs(n / d - 0.5) < gap) continue;
    const w = rng.int(wMin, wMax);
    return [w * d + n, d];
  }
  return [wMin * 4 + 3, 4];
}

const estimateDrill: Drill = {
  id: "fractions.estimate",
  topicId: "fractions",
  title: "Estimate a fraction calculation by rounding",
  level: 2,
  guideRef: "calculating-with-fractions",
  generate(rng, tier) {
    const dens = tier === 1 ? [3, 4, 5, 8, 10] : tier === 2 ? [3, 4, 5, 6, 7, 8, 9, 10, 12] : [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15];
    const gap = tier === 1 ? 0.2 : tier === 2 ? 0.1 : 0.05;
    type Op = "+" | "-" | "*" | "/";
    const apply = (a: number, b: number, op: Op) => (op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b);
    const applyQ = (a: Q, b: Q, op: Op) => (op === "+" ? add(a, b) : op === "-" ? sub(a, b) : op === "*" ? mul(a, b) : div(a, b));
    const sym = (op: Op) => (op === "+" ? "+" : op === "-" ? "−" : op === "*" ? "×" : "÷");
    const shape = tier === 3 ? rng.pick(["three", "neg", "two"] as const) : "two";

    let nums: Q[] = [[39, 8], [21, 10]];
    let ops: Op[] = ["*"];
    let est = 10, exact: Q = mul(nums[0], nums[1]);
    let chopVal = 8;
    let ok = false;
    for (let i = 0; i < 400 && !ok; i++) {
      if (shape === "two" || shape === "neg") {
        const op: Op = rng.pick<Op>(shape === "neg" ? ["*", "+"] : tier === 1 ? ["+", "-", "*"] : ["+", "-", "*", "/"]);
        const big = op === "+" || op === "-" ? (tier === 1 ? 9 : 15) : 9;
        const x = roughMixed(rng, op === "/" ? 3 : 1, op === "/" ? 20 : big, dens, gap);
        let y = roughMixed(rng, 1, big, dens, gap);
        if (op === "/") y = roughMixed(rng, 1, 6, dens, gap);
        let xx = x;
        if (shape === "neg") xx = neg(x);
        const rx = nearestWhole(xx), ry = nearestWhole(y);
        if (op === "-" && (rx <= ry || cmp(xx, y) <= 0)) continue;
        if (op === "*" && (Math.abs(rx) < 2 || ry < 2 || Math.abs(rx * ry) > 150)) continue;
        if (op === "/" && (ry < 2 || rx % ry !== 0 || rx / ry < 2)) continue;
        const e = apply(rx, ry, op);
        if (e === 0 || isInt(applyQ(xx, y, op))) continue;
        nums = [xx, y];
        ops = [op];
        est = e;
        exact = applyQ(xx, y, op);
        chopVal = apply(chop(xx), chop(y), op);
        ok = true;
      } else {
        const pattern = rng.pick(["*+", "*-", "+*"] as const);
        const x = roughMixed(rng, 1, 9, dens, gap), y = roughMixed(rng, 1, 6, dens, gap), z = roughMixed(rng, 1, 9, dens, gap);
        const [rx, ry, rz] = [x, y, z].map(nearestWhole);
        const [cx, cy, cz] = [x, y, z].map(chop);
        let e: number, ex: Q, ch: number;
        if (pattern === "*+") {
          e = rx * ry + rz; ex = add(mul(x, y), z); ch = cx * cy + cz; ops = ["*", "+"];
        } else if (pattern === "*-") {
          e = rx * ry - rz; ex = sub(mul(x, y), z); ch = cx * cy - cz; ops = ["*", "-"];
        } else {
          e = rx + ry * rz; ex = add(x, mul(y, z)); ch = cx + cy * cz; ops = ["+", "*"];
        }
        if (e <= 0 || ry < 2 || (pattern !== "+*" && rx < 2) || (pattern === "+*" && rz < 2) || e > 120 || isInt(ex)) continue;
        nums = [x, y, z];
        est = e;
        exact = ex;
        chopVal = ch;
        ok = true;
      }
    }
    if (!ok) {
      nums = [[39, 8], [21, 10]];
      ops = ["*"];
      est = 10;
      exact = mul(nums[0], nums[1]);
      chopVal = 8;
    }
    const expr = nums.map((v, j) => (j === 0 ? M(v) : `${sym(ops[j - 1])} ${MB(v)}`)).join(" ");
    const who = rng.pick(NAMES);
    const prompt = rng.pick([
      `Estimate ${expr} by rounding each number to the nearest whole number.`,
      `${who.name} works out ${expr} on a calculator. Round each number to the nearest whole number to estimate the answer, so ${who.he} can check it.`,
      `Round each number to the nearest whole number, then work out an estimate for ${expr}.`,
    ]);
    const rounded = nums.map(nearestWhole);
    const roundText = nums
      .map((v) => {
        const r = Math.abs(v[0]) % v[1];
        return `${M(v)} ≈ ${num(nearestWhole(v))} (${fx(r, v[1])} is ${2 * r > v[1] ? "more" : "less"} than {{1/2}})`;
      })
      .join(", ");
    const traps: Trap[] = [];
    trapN(traps, est, chopVal, "Round to the NEAREST whole number — don't just chop off the fraction. A fraction part bigger than {{1/2}} means round up.");
    return {
      prompt,
      answer: { type: "number", value: est },
      solution: [
        `Round each number: ${roundText}.`,
        `Estimate: ${rounded.map((r, j) => (j === 0 ? num(r) : `${sym(ops[j - 1])} ${r < 0 ? `(${num(r)})` : num(r)}`)).join(" ")} = ${num(est)}.` +
          (ops.length === 2 ? " (Multiplication first.)" : ""),
        `For comparison, the exact answer is ${M(exact)}, so ${num(est)} is a sensible estimate.`,
      ],
      hint: "Look at each fraction part: is it more or less than a half? That decides whether you round up or down.",
      traps,
    };
  },
};

// ===========================================================================
// 11. Multi-step calculations: order of operations and word problems
// ===========================================================================
const multiStepDrill: Drill = {
  id: "fractions.order-of-operations",
  topicId: "fractions",
  title: "Multi-step fraction calculations (order of operations)",
  level: 3,
  guideRef: "calculating-with-fractions",
  generate(rng, tier) {
    type K = "add-mul" | "mul-bracket" | "square" | "div-sub" | "distributive" | "rest" | "rest-money";
    const kind: K = rng.pick<K>(
      tier === 1 ? ["add-mul", "mul-bracket", "distributive"] : tier === 2 ? ["add-mul", "mul-bracket", "square", "div-sub", "rest", "distributive"] : ["add-mul", "mul-bracket", "square", "div-sub", "rest", "rest-money"],
    );
    const dens = tier === 1 ? [2, 3, 4, 5, 6, 8] : tier === 2 ? [2, 3, 4, 5, 6, 8, 9, 10, 12] : [2, 3, 4, 5, 6, 7, 8, 9, 10, 12];
    const maxDen = tier === 1 ? 36 : 72;
    const sgn = (a: Q): Q => (tier === 3 && rng.bool(0.3) ? neg(a) : a);
    const who = rng.pick(NAMES);
    const traps: Trap[] = [];
    const hint = "Use the order of operations: Brackets, then Indices (powers), then × and ÷, then + and −.";
    const opWord = (op: "+" | "-") => (op === "+" ? "addition" : "subtraction");
    const opS = (op: "+" | "-") => (op === "+" ? "+" : "-");
    const okRes = (r: Q) => r[0] !== 0 && r[1] <= maxDen && Math.abs(r[0]) <= 200 && (tier > 1 || r[0] > 0);
    const finish = (r: Q) => (topHeavy(r) ? [`So the answer is ${F(r)} = ${M(r)}.`] : []);

    if (kind === "add-mul") {
      let x: Q = [1, 2], y: Q = [2, 3], z: Q = [3, 4], op: "+" | "-" = "+", first = true, res: Q = [1, 1], wrong: Q = [1, 1];
      for (let i = 0; i < 300; i++) {
        x = sgn(proper(rng, dens));
        y = sgn(proper(rng, dens));
        z = sgn(proper(rng, dens));
        op = rng.bool() ? "+" : "-";
        first = rng.bool();
        const yz = mul(y, z);
        res = first ? (op === "+" ? add(x, yz) : sub(x, yz)) : op === "+" ? add(yz, x) : sub(yz, x);
        wrong = first ? mul(op === "+" ? add(x, y) : sub(x, y), z) : mul(y, op === "+" ? add(z, x) : sub(z, x));
        if (okRes(res) && !same(res, wrong)) break;
        if (i === 299) {
          [x, y, z, op, first] = [[1, 2], [2, 3], [3, 4], "+", true];
          res = add(x, mul(y, z));
          wrong = mul(add(x, y), z);
        }
      }
      const yz = mul(y, z);
      const expr = first ? `{{${ix(x)} ${opS(op)} ${ixb(y)} * ${ixb(z)}}}` : `{{${ix(y)} * ${ixb(z)} ${opS(op)} ${ixb(x)}}}`;
      trapF(traps, res, wrong, first ? `You worked from left to right. Multiplication comes before ${opWord(op)}.` : `Multiplication comes before ${opWord(op)} — do ${F(y)} × ${FB(z)} on its own first.`);
      return {
        prompt: `Work out ${expr}. ${SIMP}`,
        answer: fracAns(res),
        solution: [
          `Multiplication comes before ${opWord(op)}, so start with ${F(y)} × ${FB(z)}.`,
          `${mulLine(y, z)}.`,
          `${first ? combineLine(x, yz, op) : combineLine(yz, x, op)}.`,
          ...finish(res),
        ],
        hint,
        traps,
      };
    }

    if (kind === "mul-bracket") {
      let x: Q = [2, 3], y: Q = [1, 2], z: Q = [1, 4], op: "+" | "-" = "+", form1 = true, res: Q = [1, 2], wrong: Q = [1, 1], inn: Q = [3, 4];
      for (let i = 0; i < 300; i++) {
        x = sgn(proper(rng, dens));
        y = sgn(proper(rng, dens));
        z = sgn(proper(rng, dens));
        op = rng.bool() ? "+" : "-";
        form1 = rng.bool(0.6);
        inn = op === "+" ? add(y, z) : sub(y, z);
        if (inn[0] === 0) continue;
        res = form1 ? mul(x, inn) : div(inn, x);
        wrong = form1 ? (op === "+" ? add(mul(x, y), z) : sub(mul(x, y), z)) : op === "+" ? add(y, div(z, x)) : sub(y, div(z, x));
        if (okRes(res) && !same(res, wrong) && y[1] !== z[1]) break;
        if (i === 299) {
          [x, y, z, op, form1] = [[2, 3], [1, 2], [1, 4], "+", true];
          inn = add(y, z);
          res = mul(x, inn);
          wrong = add(mul(x, y), z);
        }
      }
      const brk = `(${ix(y)} ${opS(op)} ${ixb(z)})`;
      const expr = form1 ? `{{${ix(x)} * ${brk}}}` : `{{${brk} ÷ ${ixb(x)}}}`;
      trapF(traps, res, wrong, `Work out the bracket first, then ${form1 ? "multiply" : "divide"}.`);
      return {
        prompt: `Work out ${expr}. ${SIMP}`,
        answer: fracAns(res),
        solution: [`Brackets first: ${combineLine(y, z, op)}.`, `${form1 ? mulLine(x, inn) : divLine(inn, x)}.`, ...finish(res)],
        hint,
        traps,
      };
    }

    if (kind === "square") {
      let a: Q = [2, 3], c: Q = [1, 6], form1 = true, res: Q = [11, 18];
      for (let i = 0; i < 300; i++) {
        a = sgn(proper(rng, [2, 3, 4, 5, 6]));
        c = proper(rng, dens);
        form1 = rng.bool();
        const sq = mul(a, a);
        res = form1 ? add(sq, c) : sub(c, sq);
        if (okRes(res)) break;
        if (i === 299) {
          [a, c, form1] = [[2, 3], [1, 6], true];
          res = add(mul(a, a), c);
        }
      }
      const sq = mul(a, a);
      const expr = form1 ? `{{(${ix(a)})^2 + ${ix(c)}}}` : `{{${ix(c)} - (${ix(a)})^2}}`;
      const topOnly: Q = q(a[0] * a[0], a[1]);
      const doubled: Q = q(2 * a[0], a[1]);
      trapF(traps, res, form1 ? add(topOnly, c) : sub(c, topOnly), "Square the top AND the bottom of the fraction.");
      trapF(traps, res, form1 ? add(doubled, c) : sub(c, doubled), "Squaring means multiplying the fraction by itself, not by 2.");
      return {
        prompt: `Work out ${expr}. ${SIMP}`,
        answer: fracAns(res),
        solution: [
          `Powers come first: {{(${ix(a)})^2}} = ${F(a)} × ${FB(a)} = ${F(sq)}.`,
          `${form1 ? combineLine(sq, c, "+") : combineLine(c, sq, "-")}.`,
          ...finish(res),
        ],
        hint,
        traps,
      };
    }

    if (kind === "div-sub") {
      let x: Q = [3, 4], y: Q = [1, 2], z: Q = [1, 3], op: "+" | "-" = "-", divFirst = true, res: Q = [7, 6], wrong: Q | null = null;
      for (let i = 0; i < 300; i++) {
        x = sgn(proper(rng, dens));
        y = sgn(proper(rng, dens));
        z = sgn(proper(rng, dens));
        op = rng.bool() ? "+" : "-";
        divFirst = rng.bool();
        if (divFirst) {
          res = op === "+" ? add(div(x, y), z) : sub(div(x, y), z);
          const yz = op === "+" ? add(y, z) : sub(y, z);
          wrong = yz[0] === 0 ? null : div(x, yz);
        } else {
          res = op === "+" ? add(x, div(y, z)) : sub(x, div(y, z));
          wrong = div(op === "+" ? add(x, y) : sub(x, y), z);
        }
        if (okRes(res) && (!wrong || !same(res, wrong))) break;
        if (i === 299) {
          [x, y, z, op, divFirst] = [[3, 4], [1, 2], [1, 3], "-", true];
          res = sub(div(x, y), z);
          wrong = div(x, sub(y, z));
        }
      }
      const expr = divFirst ? `{{${ix(x)} ÷ ${ixb(y)} ${opS(op)} ${ixb(z)}}}` : `{{${ix(x)} ${opS(op)} ${ixb(y)} ÷ ${ixb(z)}}}`;
      trapF(traps, res, wrong, `Division comes before ${opWord(op)} — you can't do the ${opWord(op)} first.`);
      const d = divFirst ? div(x, y) : div(y, z);
      return {
        prompt: `Work out ${expr}. ${SIMP}`,
        answer: fracAns(res),
        solution: [
          `Division comes before ${opWord(op)}: ${divFirst ? divLine(x, y) : divLine(y, z)}.`,
          `${divFirst ? combineLine(d, z, op) : combineLine(x, d, op)}.`,
          ...finish(res),
        ],
        hint,
        traps,
      };
    }

    if (kind === "distributive") {
      let f: Q = [3, 7], p = 15, r = 6, plus = true;
      for (let i = 0; i < 300; i++) {
        f = proper(rng, [3, 4, 5, 6, 7, 8, 9]);
        p = rng.int(2, 20);
        r = rng.int(2, 20);
        plus = tier === 1 || rng.bool(0.7);
        const S = plus ? p + r : p - r;
        if (S <= 0 || S % f[1] !== 0 || p % f[1] === 0 || r % f[1] === 0 || p === r) continue;
        break;
      }
      const S = plus ? p + r : p - r;
      if (S <= 0 || S % f[1] !== 0) {
        f = [3, 7];
        p = 15;
        r = 6;
        plus = true;
      }
      const S2 = plus ? p + r : p - r;
      const ans = (S2 / f[1]) * f[0];
      return {
        prompt: `Work out {{${ix(f)} * ${p} ${plus ? "+" : "-"} ${ix(f)} * ${r}}}. Look for a shortcut before you calculate.`,
        answer: { type: "number", value: ans },
        solution: [
          `Both parts are ${F(f)} × something, so use the distributive law: ${F(f)} × (${p} ${plus ? "+" : "−"} ${r}) = ${F(f)} × ${S2}.`,
          `${F(f)} of ${S2} = ${S2} ÷ ${f[1]} × ${f[0]} = ${ans}.`,
        ],
        hint: "Both parts are multiplied by the same fraction. Can you factor it out?",
        traps,
      };
    }

    // "rest" problems: f2 is a fraction of what is LEFT.
    let f1: Q = [1, 4], f2: Q = [2, 3];
    for (let i = 0; i < 200; i++) {
      f1 = proper(rng, [2, 3, 4, 5, 6, 8]);
      f2 = proper(rng, [2, 3, 4, 5, 6]);
      const l = mul(sub(ONE, f1), sub(ONE, f2));
      if (l[1] <= 48) break;
    }
    const l1 = sub(ONE, f1);
    const u2 = mul(f2, l1);
    const ans = sub(l1, u2);
    if (kind === "rest-money") {
      const k = rng.int(1, Math.max(1, Math.floor(240 / (f1[1] * f2[1]))));
      const S = f1[1] * f2[1] * k;
      const spent1 = (S / f1[1]) * f1[0], left1 = S - spent1;
      const spent2 = (left1 / f2[1]) * f2[0], left2 = left1 - spent2;
      if (S - spent1 - (S / f2[1]) * f2[0] > 0) trapN(traps, left2, S - spent1 - (S / f2[1]) * f2[0], `The second fraction is ${F(f2)} of what is LEFT after the first step, not of the original $${S}.`);
      return {
        prompt: `${who.name} has $${S}. ${cap(who.he)} spends ${F(f1)} of it on a book and then ${F(f2)} of what is left on lunch at a hawker centre. How much money does ${who.he} have left?`,
        answer: { type: "number", value: left2, display: `$${left2}` },
        solution: [`Book: ${F(f1)} of $${S} = $${spent1}, leaving $${S} − $${spent1} = $${left1}.`, `Lunch: ${F(f2)} of $${left1} = $${spent2}.`, `Money left: $${left1} − $${spent2} = $${left2}.`],
        hint: "Work step by step: find what is left after the book first, then take the second fraction of THAT amount.",
        traps,
      };
    }
    const c = rng.int(0, 2);
    const prompt = [
      `${who.name} spends ${F(f1)} of ${who.his} pocket money on a book and then ${F(f2)} of what is left on lunch at a hawker centre. What fraction of ${who.his} pocket money is left?`,
      `A gardener plants ${F(f1)} of a field with spinach and ${F(f2)} of the remaining part with sweet potatoes. What fraction of the field is not planted?`,
      `${who.name} reads ${F(f1)} of a book on Monday and ${F(f2)} of the remaining pages on Tuesday. What fraction of the book is still unread?`,
    ][c];
    const naive = sub(sub(ONE, f1), f2);
    if (naive[0] > 0) trapF(traps, ans, naive, `The second fraction is ${F(f2)} of what is LEFT, not of the whole. Find what's left after the first step, then take ${F(f2)} of that.`);
    trapF(traps, ans, add(f1, u2), "That's the fraction that has been used — the question asks what is left.");
    return {
      prompt: `${prompt} ${SIMP}`,
      answer: fracAns(ans),
      solution: [
        `After the first step, 1 − ${F(f1)} = ${F(l1)} is left.`,
        `${F(f2)} of ${F(l1)} is ${mulLine(f2, l1)}.`,
        `What is left: ${combineLine(l1, u2, "-")}.`,
      ],
      hint: "Draw a bar. After the first part is used, split what is LEFT into equal pieces for the second fraction.",
      traps,
    };
  },
};

// ===========================================================================
// 12. STRETCH: multiply and divide simple algebraic fractions
// ===========================================================================
function coefExpr(c: Q, v: string): { expr: string; show: string } {
  const [n, d] = c;
  const top = n === 1 ? v : `${n}${v}`;
  if (d === 1) return { expr: top, show: `{{${top}}}` };
  return { expr: `${top}/${d}`, show: n === 1 ? `{{${v}/${d}}}` : `{{(${top})/${d}}}` };
}

const algebraicDrill: Drill = {
  id: "fractions.algebraic-fractions",
  topicId: "fractions",
  title: "Multiply and divide algebraic fractions",
  level: 3,
  guideRef: "algebraic-fractions",
  generate(rng, tier) {
    type K = "A" | "B" | "C" | "D" | "E" | "F" | "G" | "H" | "J" | "K";
    const kind: K = rng.pick<K>(tier === 1 ? ["A", "D", "C"] : tier === 2 ? ["B", "C", "E", "F", "G"] : ["B", "E", "G", "H", "J", "K"]);
    const traps: Trap[] = [];
    const hint = "Treat the letters like numbers: multiply tops and bottoms (flip the second fraction first if you are dividing), then cancel common factors — including letters.";
    const tail = " Type your answer as a single fraction, using ^ for powers if you need them.";
    const coprime = (a: number, b: number) => gcd(a, b) === 1;
    // Small coefficients: p in [2, 9], denominators in [2, 12], each given fraction in lowest terms.
    let p = 2, a = 3, b = 9, c = 4, r = 3, s = 2;
    for (let i = 0; i < 300; i++) {
      p = rng.int(2, 9);
      a = rng.int(2, 9);
      b = rng.int(2, 12);
      c = rng.int(2, 9);
      r = rng.int(2, 9);
      s = rng.int(2, 9);
      let good = true;
      if (kind === "A" || kind === "D") good = a !== b && b <= 9;
      else if (kind === "B") good = coprime(p, a) && coprime(b, c) && p * b !== a * c && gcd(p * b, a * c) > 1;
      else if (kind === "C") good = coprime(p, a) && coprime(b, c) && !same(q(p * b, a * c), ONE) && gcd(p * b, a * c) > 1;
      else if (kind === "E") good = coprime(p, a) && coprime(c, b) && p * b !== a * c && gcd(p * b, a * c) > 1;
      else if (kind === "F" || kind === "H") good = a !== b;
      else if (kind === "G") good = coprime(p, a);
      else if (kind === "J") good = coprime(p, c) && coprime(r, s) && p * r !== c * s && gcd(p * r, c * s) > 1;
      else good = coprime(p, a) && coprime(b, c) && gcd(p * b, a * c) > 1;
      if (good) break;
    }
    let display: string;
    let answer: AnswerSpec;
    let steps: string[];
    const numAns = (v: Q): AnswerSpec => fracAns(v);
    const exprAns = (e: { expr: string; show: string }): AnswerSpec => ({ type: "expression", expr: e.expr, form: "simplified", display: e.show });
    switch (kind) {
      case "A": {
        const v = q(b, a);
        display = `{{x/${a} * ${b}/x}}`;
        steps = [`Multiply the tops and the bottoms: {{(${b}x)/(${a}x)}}.`, `Cancel the common factor x (x ≠ 0): ${fx(b, a)}${same(v, [b, a]) ? "" : ` = ${F(v)}`}.`];
        answer = numAns(v);
        break;
      }
      case "B": {
        const v = q(p * b, a * c);
        display = `{{(${p}x)/${a} * ${b}/(${c}x)}}`;
        steps = [`Multiply the tops and the bottoms: {{(${p * b}x)/(${a * c}x)}}.`, `Cancel x (x ≠ 0), then simplify: ${fx(p * b, a * c)}${same(v, [p * b, a * c]) ? "" : ` = ${F(v)}`}.`];
        answer = numAns(v);
        break;
      }
      case "C": {
        const v = q(p * b, a * c);
        const e = coefExpr(v, "x");
        display = `{{(${p}x)/${a} * ${b}/${c}}}`;
        steps = [`Multiply the tops and the bottoms: {{(${p * b}x)/${a * c}}}.`, `Divide the top and the bottom by ${gcd(p * b, a * c)}: ${e.show}.`];
        answer = exprAns(e);
        break;
      }
      case "D": {
        const v = q(b, a);
        display = `{{x/${a} ÷ x/${b}}}`;
        steps = [`Flip the second fraction and multiply: {{x/${a} * ${b}/x}}.`, `= {{(${b}x)/(${a}x)}}. Cancel x (x ≠ 0): ${F(v)}.`];
        answer = numAns(v);
        trapF(traps, v, recip(v), "You flipped the wrong fraction. Keep the first fraction and flip the second.");
        break;
      }
      case "E": {
        const v = q(p * b, a * c);
        display = `{{(${p}x)/${a} ÷ (${c}x)/${b}}}`;
        steps = [`Flip the second fraction and multiply: {{(${p}x)/${a} * ${b}/(${c}x)}}.`, `= {{(${p * b}x)/(${a * c}x)}}. Cancel x (x ≠ 0): ${fx(p * b, a * c)}${same(v, [p * b, a * c]) ? "" : ` = ${F(v)}`}.`];
        answer = numAns(v);
        break;
      }
      case "F": {
        const v = q(a, b);
        const e = coefExpr(v, "x");
        display = `{{${a}/x * x^2/${b}}}`;
        steps = [`Multiply the tops and the bottoms: {{(${a}x^2)/(${b}x)}}.`, `Cancel one x (x ≠ 0): {{(${a}x)/${b}}}${same(v, [a, b]) ? "" : ` = ${e.show}`}.`];
        answer = exprAns(e);
        break;
      }
      case "G": {
        const v = q(p, a * b);
        const e = coefExpr(v, "x^2");
        display = `{{(${p}x)/${a} ÷ ${b}/x}}`;
        steps = [`Flip the second fraction and multiply: {{(${p}x)/${a} * x/${b}}}.`, `= {{(${p}x^2)/${a * b}}}${same(v, [p, a * b]) ? "" : ` = ${e.show}`}.`];
        answer = exprAns(e);
        trapF(traps, [1, 1], q(p * b, a), "You multiplied without flipping. To divide, flip the second fraction and multiply.");
        break;
      }
      case "H": {
        const v = q(a, b);
        const e = coefExpr(v, "x");
        display = `{{${a}/x ÷ ${b}/x^2}}`;
        steps = [`Flip the second fraction and multiply: {{${a}/x * x^2/${b}}}.`, `= {{(${a}x^2)/(${b}x)}}. Cancel one x (x ≠ 0): ${e.show}.`];
        answer = exprAns(e);
        break;
      }
      case "J": {
        const v = q(p * r, c * s);
        display = `{{(${p}x)/(${c}y) * (${r}y)/(${s}x)}}`;
        steps = [`Multiply the tops and the bottoms: {{(${p * r}xy)/(${c * s}xy)}}.`, `Cancel x and y (both ≠ 0): ${fx(p * r, c * s)}${same(v, [p * r, c * s]) ? "" : ` = ${F(v)}`}.`];
        answer = numAns(v);
        break;
      }
      default: {
        const v = q(p * b, a * c);
        const e = coefExpr(v, "x");
        display = `{{(${p}x^2)/${a} * ${b}/(${c}x)}}`;
        steps = [`Multiply the tops and the bottoms: {{(${p * b}x^2)/(${a * c}x)}}.`, `Cancel one x (x ≠ 0) and simplify the numbers: ${e.show}.`];
        answer = exprAns(e);
      }
    }
    const vars = kind === "J" ? "x ≠ 0 and y ≠ 0" : "x ≠ 0";
    return {
      prompt: `Simplify ${display}, where ${vars}.${answer.type === "expression" ? tail : ""}`,
      answer,
      solution: steps,
      hint,
      traps,
    };
  },
};

export const drills: Drill[] = [
  simplifyDrill,
  addSubDrill,
  multiplyDrill,
  ofAmountDrill,
  compareDrill,
  mixedAddSubDrill,
  divideDrill,
  asFractionDrill,
  estimateDrill,
  mixedMulDivDrill,
  multiStepDrill,
  algebraicDrill,
];
