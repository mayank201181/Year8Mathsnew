// Procedural skill drills — "Sequences & Functions" (topic id "sequences-graphs").
// Spec: docs/DRILLS.md. Every answer is computed exactly: decimals are built from
// whole numbers of hundredths, fractions are kept as exact numerator/denominator
// pairs, and every trap is filtered so it can never equal the correct answer.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { br, clean, frac, gcd, num, ordinal, poly, signed, simplify, term } from "./helpers.ts";

const TOPIC = "sequences-graphs";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** a·v + b as tidy ASCII ("3n - 2", "28 - 5n", "0.5n + 1.5"); safe inside {{ }} and as an AnswerSpec expr. */
function lin(a: number, b: number, v = "n"): string {
  a = clean(a);
  b = clean(b);
  if (a < 0 && b > 0) return `${b} - ${term(-a, v)}`;
  return poly([[a, v], [b, ""]]);
}

/** Plain-text substitution for the rule lin(a, b) at n = k, e.g. "3 × 10 − 2" or "28 − 5 × 4". */
function subst(a: number, b: number, k: number): string {
  if (a < 0 && b > 0) return `${num(b)} − ${num(-a)} × ${br(k)}`;
  const first = `${num(a)} × ${br(k)}`;
  return b === 0 ? first : `${first} ${signed(b)}`;
}

/** "7, 11, 15, 19, …" */
function seq(vals: number[]): string {
  return vals.map(num).join(", ") + ", …";
}

/** "q remainder r" text for a positive division. */
function divText(m: number, d: number): string {
  return m % d === 0 ? `${m} ÷ ${d} = ${m / d}` : `${m} ÷ ${d} = ${Math.floor(m / d)} remainder ${m % d}`;
}

/**
 * Number traps, skipping anything equal to the answer (or to an earlier trap) and any
 * value a learner could never type exactly (recurring decimals like 15.444…).
 */
function numTraps(answer: number, list: Array<[number, string]>): Trap[] {
  const out: Trap[] = [];
  const seen: number[] = [answer];
  for (const [v, feedback] of list) {
    if (!Number.isFinite(v)) continue;
    const c = clean(v);
    if (Math.abs(c * 10000 - Math.round(c * 10000)) > 1e-6) continue;
    if (seen.some((s) => Math.abs(s - c) < 1e-9)) continue;
    seen.push(c);
    out.push({ spec: { type: "number", value: c }, feedback });
  }
  return out;
}

/** Linear-expression traps p·n + q, skipping any equal to the answer a·n + b. */
function linTraps(a: number, b: number, list: Array<[number, number, string]>, v = "n"): Trap[] {
  const out: Trap[] = [];
  const seen: Array<[number, number]> = [[clean(a), clean(b)]];
  for (const [p, q, feedback] of list) {
    const P = clean(p), Q = clean(q);
    if (!Number.isFinite(P) || !Number.isFinite(Q)) continue;
    if (seen.some(([x, y]) => Math.abs(x - P) < 1e-9 && Math.abs(y - Q) < 1e-9)) continue;
    seen.push([P, Q]);
    out.push({ spec: { type: "expression", expr: lin(P, Q, v) }, feedback });
  }
  return out;
}

const YES = ["yes", "y", "yes it is", "yes, it is", "it is", "true", "yes it's a term", "yes, it's a term", "it is a term"];
const NO = ["no", "n", "no it is not", "no, it is not", "no it isn't", "no, it isn't", "no it's not", "no, it's not", "it is not", "not a term", "it is not a term", "false"];

// Exact rationals --------------------------------------------------------------
interface Q {
  n: number;
  d: number;
}
function q(n: number, d = 1): Q {
  const [a, b] = simplify(n, d);
  return { n: a, d: b };
}
const qAdd = (x: Q, y: Q): Q => q(x.n * y.d + y.n * x.d, x.d * y.d);
const qMul = (x: Q, y: Q): Q => q(x.n * y.n, x.d * y.d);
const qDiv = (x: Q, y: Q): Q => q(x.n * y.d, x.d * y.n);
const qEq = (x: Q, y: Q): boolean => x.n === y.n && x.d === y.d;
/** Display: whole numbers as plain text, fractions as {{n/d}}. */
const qShow = (x: Q): string => (x.d === 1 ? num(x.n) : frac(x.n, x.d));
function qSpec(x: Q, simplest: boolean): AnswerSpec {
  return x.d === 1 ? { type: "number", value: x.n } : { type: "fraction", n: x.n, d: x.d, simplest };
}
function qTraps(answer: Q, list: Array<[Q, string]>): Trap[] {
  const out: Trap[] = [];
  const seen: Q[] = [answer];
  for (const [v, feedback] of list) {
    if (!Number.isFinite(v.n) || !Number.isFinite(v.d) || v.d === 0) continue;
    if (seen.some((s) => qEq(s, v))) continue;
    seen.push(v);
    out.push({ spec: qSpec(v, false), feedback });
  }
  return out;
}

/** n/q shown as a whole number, an improper fraction or a mixed number. */
function fq(n: number, d: number, mixed: boolean): string {
  return n % d === 0 ? num(n / d) : frac(n, d, { mixed });
}

// ---------------------------------------------------------------------------
// Matchstick pattern diagrams (Patterns 1, 2, 3 drawn from the real stick layout)
// ---------------------------------------------------------------------------
type Seg = [number, number, number, number];
type StickKind = "squares" | "triangles" | "grid";
const r1 = (v: number): number => Math.round(v * 10) / 10;

function stickPattern(kind: StickKind, n: number): { segs: Seg[]; w: number; h: number } {
  const segs: Seg[] = [];
  if (kind === "squares") {
    const s = 22;
    for (let i = 0; i < n; i++) segs.push([i * s, 0, (i + 1) * s, 0], [i * s, s, (i + 1) * s, s]);
    for (let j = 0; j <= n; j++) segs.push([j * s, 0, j * s, s]);
    return { segs, w: n * s, h: s };
  }
  if (kind === "grid") {
    const s = 20;
    for (let r = 0; r <= 2; r++) for (let i = 0; i < n; i++) segs.push([i * s, r * s, (i + 1) * s, r * s]);
    for (let j = 0; j <= n; j++) segs.push([j * s, 0, j * s, s], [j * s, s, j * s, 2 * s]);
    return { segs, w: n * s, h: 2 * s };
  }
  // Triangles alternate point-up / point-down along a strip; each new one shares a side.
  const s = 26, h = 22.5;
  const P = (i: number): [number, number] => (i % 2 === 0 ? [(i / 2) * s, h] : [s / 2 + ((i - 1) / 2) * s, 0]);
  let w = 0;
  for (let i = 0; i <= n; i++) {
    const a = P(i), b = P(i + 1);
    segs.push([a[0], a[1], b[0], b[1]]);
    w = Math.max(w, a[0], b[0]);
  }
  for (let j = 0; j < Math.ceil(n / 2); j++) segs.push([j * s, h, (j + 1) * s, h]);
  for (let j = 0; j < Math.floor(n / 2); j++) segs.push([s / 2 + j * s, 0, s / 2 + (j + 1) * s, 0]);
  return { segs, w, h };
}

function patternSvg(kind: StickKind, aria: string): string {
  const pats = [1, 2, 3].map((n) => stickPattern(kind, n));
  const margin = 30, gap = 40, top = 12;
  const maxH = Math.max(...pats.map((p) => p.h));
  const W = r1(margin * 2 + pats.reduce((s, p) => s + p.w, 0) + gap * 2);
  const H = top + maxH + 34;
  let x = margin;
  let body = "";
  pats.forEach((p, i) => {
    const y0 = top + (maxH - p.h);
    for (const [x1, y1, x2, y2] of p.segs) {
      body += `<line x1="${r1(x + x1)}" y1="${r1(y0 + y1)}" x2="${r1(x + x2)}" y2="${r1(y0 + y2)}" stroke="#334155" stroke-width="3" stroke-linecap="round"/>`;
    }
    body += `<text x="${r1(x + p.w / 2)}" y="${top + maxH + 24}" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Pattern ${i + 1}</text>`;
    x += p.w + gap;
  });
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>${body}</svg>`;
}

// ---------------------------------------------------------------------------
// 1. Continue a sequence (term-to-term)
// ---------------------------------------------------------------------------
function continueFractionSequence(rng: Rng): DrillItem {
  let qd = 3, p = 2, A = 1;
  for (let i = 0; i < 200; i++) {
    qd = rng.pick([3, 4, 5, 6, 8]);
    p = rng.int(1, 2 * qd - 1) * (rng.bool(0.7) ? 1 : -1);
    if (gcd(p, qd) !== 1) continue;
    A = rng.int(-qd, 4 * qd);
    const nums = [0, 1, 2, 3, 4].map((k) => A + k * p);
    if (nums.some((v) => v === 0)) continue;
    if (nums[4] % qd === 0) continue; // keep the answer a genuine fraction
    break;
  }
  const mixed = rng.bool();
  const nums = [0, 1, 2, 3, 4].map((k) => A + k * p);
  const shown = nums.slice(0, 4).map((v) => fq(v, qd, mixed)).join(", ") + ", …";
  const ans = q(nums[4], qd);
  const wrong = q(nums[3] - p, qd);
  const step = frac(Math.abs(p), qd);
  const op = p > 0 ? "+" : "−";
  const name = rng.pick(NAMES);
  const prompt = rng.pick([
    `Here are the first four terms of a sequence:\n\n${shown}\n\nFind the next term. Give your answer in its simplest form.`,
    `${name}'s sequence goes ${shown}\n\nWhat is the 5th term? Give your answer in its simplest form.`,
    `The sequence ${shown} goes up or down by the same amount each time.\n\nWork out the next term, in its simplest form.`,
  ]);
  const unsimplified = frac(nums[4], qd, { simplify: false });
  return {
    prompt,
    answer: {
      type: "fraction",
      n: ans.n,
      d: ans.d,
      simplest: true,
      display: Math.abs(ans.n) > ans.d ? `${frac(ans.n, ans.d)} = ${frac(ans.n, ans.d, { mixed: true })}` : frac(ans.n, ans.d),
    },
    solution: [
      `Write every term over ${qd}: ${nums.slice(0, 4).map((v) => frac(v, qd, { simplify: false })).join(", ")}.`,
      `The numerators ${p > 0 ? "go up" : "go down"} by ${Math.abs(p)} each time, so each term is ${step} ${p > 0 ? "more" : "less"} than the one before.`,
      `5th term: ${frac(nums[3], qd, { simplify: false })} ${op} ${step} = ${unsimplified}${ans.d !== qd ? ` = ${frac(ans.n, ans.d)}` : ""}.`,
    ],
    hint: "Rewrite the terms with the same denominator, then look at how the numerators change.",
    traps: qTraps(ans, [[wrong, "That goes the wrong way — check whether the sequence is going up or down."]]),
  };
}

const continueSequence: Drill = {
  id: `${TOPIC}.continue-sequence`,
  topicId: TOPIC,
  title: "Continue a sequence using its term-to-term rule",
  level: 1,
  guideRef: "term-to-term",
  generate(rng, tier) {
    if (tier === 3 && rng.bool(0.6)) return continueFractionSequence(rng);
    // Work in hundredths so decimal terms are exact.
    let A = 100, D = 300;
    for (let i = 0; i < 100; i++) {
      if (tier === 1) {
        const up = rng.bool(0.7);
        const d = rng.int(2, up ? 12 : 9);
        D = (up ? d : -d) * 100;
        A = (up ? rng.int(1, 25) : rng.int(6 * d, 6 * d + 30)) * 100;
      } else if (rng.bool(0.5)) {
        // Whole numbers that cross zero.
        const d = rng.int(3, tier === 3 ? 15 : 11) * (rng.bool() ? 1 : -1);
        D = d * 100;
        A = (d > 0 ? rng.int(-5 * d + 1, -1) : rng.int(1, -5 * d - 1)) * 100;
      } else {
        D = rng.pick([50, 150, 250, 25, 75, 20, 40, 120, 30, 60]) * (rng.bool(0.6) ? 1 : -1);
        A = Math.abs(D) % 10 === 0 ? rng.int(-20, 80) * 10 : rng.int(-8, 40) * 25;
      }
      if (A === 0) continue;
      break;
    }
    const t = [0, 1, 2, 3, 4, 5].map((k) => clean((A + k * D) / 100));
    const d = clean(D / 100);
    const up = d > 0;
    const step = num(Math.abs(d));
    const op = up ? "+" : "−";
    const shown = seq(t.slice(0, 4));
    const name = rng.pick(NAMES);
    const prompt = rng.pick([
      `Here are the first four terms of a sequence:\n\n${shown}\n\nWrite down the next two terms, separated by a comma.`,
      `${name} writes down a sequence: ${shown}\n\nWhat are the 5th and 6th terms? Give them in order, separated by a comma.`,
      `The sequence ${shown} follows a term-to-term rule.\n\nFind the next two terms. Give them in order, separated by a comma.`,
    ]);
    return {
      prompt,
      answer: { type: "list", values: [t[4], t[5]], ordered: true },
      solution: [
        `Find the gap between neighbouring terms: ${num(t[0])} ${op} ${step} = ${num(t[1])} and ${num(t[1])} ${op} ${step} = ${num(t[2])}.`,
        `So the term-to-term rule is **${up ? "add" : "subtract"} ${step}**.`,
        `5th term: ${num(t[3])} ${op} ${step} = ${num(t[4])}.`,
        `6th term: ${num(t[4])} ${op} ${step} = ${num(t[5])}.`,
      ],
      hint: "What do you add or subtract to get from one term to the next? Check it works for every pair.",
      traps: [
        {
          spec: { type: "list", values: [clean(t[3] - d), clean(t[3] - 2 * d)], ordered: true },
          feedback: "Those go the wrong way — is the sequence going up or down?",
        },
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// 2. Two-step term-to-term rules (forwards; tier 3 also backwards)
// ---------------------------------------------------------------------------
type RuleKind = "mul-add" | "mul-sub" | "add-mul" | "sub-mul" | "half-add";

function ruleStep(kind: RuleKind, m: number, b: number, T: number): number {
  switch (kind) {
    case "mul-add": return clean(T * m + b);
    case "mul-sub": return clean(T * m - b);
    case "add-mul": return clean((T + b) * m);
    case "sub-mul": return clean((T - b) * m);
    case "half-add": return clean(T / 2 + b);
  }
}
/** The same two operations done in the wrong order. */
function ruleSwapped(kind: RuleKind, m: number, b: number, T: number): number {
  switch (kind) {
    case "mul-add": return clean((T + b) * m);
    case "mul-sub": return clean((T - b) * m);
    case "add-mul": return clean(T * m + b);
    case "sub-mul": return clean(T * m - b);
    case "half-add": return clean((T + b) / 2);
  }
}
function ruleUndo(kind: RuleKind, m: number, b: number, T: number): number {
  switch (kind) {
    case "mul-add": return clean((T - b) / m);
    case "mul-sub": return clean((T + b) / m);
    case "add-mul": return clean(T / m - b);
    case "sub-mul": return clean(T / m + b);
    case "half-add": return clean((T - b) * 2);
  }
}
/** Undo steps done in the wrong order (a classic slip when working backwards). */
function ruleUndoSwapped(kind: RuleKind, m: number, b: number, T: number): number {
  switch (kind) {
    case "mul-add": return clean(T / m - b);
    case "mul-sub": return clean(T / m + b);
    case "add-mul": return clean((T - b) / m);
    case "sub-mul": return clean((T + b) / m);
    case "half-add": return clean(T * 2 - b);
  }
}
function ruleText(kind: RuleKind, m: number, b: number): string {
  switch (kind) {
    case "mul-add": return `multiply by ${num(m)}, then add ${b}`;
    case "mul-sub": return `multiply by ${num(m)}, then subtract ${b}`;
    case "add-mul": return `add ${b}, then multiply by ${num(m)}`;
    case "sub-mul": return `subtract ${b}, then multiply by ${num(m)}`;
    case "half-add": return `halve, then add ${b}`;
  }
}
function undoText(kind: RuleKind, m: number, b: number): string {
  switch (kind) {
    case "mul-add": return `subtract ${b}, then divide by ${num(m)}`;
    case "mul-sub": return `add ${b}, then divide by ${num(m)}`;
    case "add-mul": return `divide by ${num(m)}, then subtract ${b}`;
    case "sub-mul": return `divide by ${num(m)}, then add ${b}`;
    case "half-add": return `subtract ${b}, then double`;
  }
}
function stepLine(kind: RuleKind, m: number, b: number, T: number, V: number): string {
  switch (kind) {
    case "mul-add": return `${br(T)} × ${br(m)} + ${b} = ${num(V)}`;
    case "mul-sub": return `${br(T)} × ${br(m)} − ${b} = ${num(V)}`;
    case "add-mul": return `(${num(T)} + ${b}) × ${br(m)} = ${num(V)}`;
    case "sub-mul": return `(${num(T)} − ${b}) × ${br(m)} = ${num(V)}`;
    case "half-add": return `${num(T)} ÷ 2 + ${b} = ${num(V)}`;
  }
}
function undoLine(kind: RuleKind, m: number, b: number, T: number, V: number): string {
  switch (kind) {
    case "mul-add": return `(${num(T)} − ${b}) ÷ ${br(m)} = ${num(V)}`;
    case "mul-sub": return `(${num(T)} + ${b}) ÷ ${br(m)} = ${num(V)}`;
    case "add-mul": return `${num(T)} ÷ ${br(m)} − ${b} = ${num(V)}`;
    case "sub-mul": return `${num(T)} ÷ ${br(m)} + ${b} = ${num(V)}`;
    case "half-add": return `(${num(T)} − ${b}) × 2 = ${num(V)}`;
  }
}

const termToTermRule: Drill = {
  id: `${TOPIC}.term-to-term-rule`,
  topicId: TOPIC,
  title: "Use a two-step term-to-term rule",
  level: 2,
  guideRef: "term-to-term",
  generate(rng, tier) {
    const kinds: RuleKind[] = tier === 1 ? ["mul-add", "mul-sub", "add-mul"] : ["mul-add", "mul-sub", "add-mul", "sub-mul", "half-add"];
    let kind: RuleKind = "mul-add", m = 2, b = 1, k = 4, terms: number[] = [1];
    const backward = tier === 3 && rng.bool(0.5);
    for (let i = 0; i < 300; i++) {
      kind = rng.pick(kinds);
      m = kind === "half-add" ? 0.5 : rng.pick(tier === 1 ? [2, 3] : tier === 2 ? [2, 3, 4, -2] : [2, 3, -2, -3]);
      b = rng.int(1, tier === 1 ? 6 : tier === 2 ? 10 : 12);
      const t1 = tier === 1 ? rng.int(1, 8) : rng.nonZero(tier === 2 ? -6 : -8, tier === 2 ? 10 : 12);
      k = backward ? rng.pick([3, 4]) : tier === 1 ? rng.pick([3, 4]) : rng.pick([4, 5]);
      terms = [t1];
      for (let j = 1; j < k; j++) terms.push(ruleStep(kind, m, b, terms[j - 1]));
      const limit = tier === 1 ? 300 : 999;
      if (terms.some((v) => Math.abs(v) > limit)) continue;
      if (terms.some((v) => !Number.isInteger(v * 2))) continue; // halves at most
      if (kind !== "half-add" && terms.some((v) => !Number.isInteger(v))) continue;
      if (tier === 1 && terms.some((v) => v <= 0)) continue;
      if (terms.some((v, j) => j > 0 && v === terms[j - 1])) continue; // no fixed points
      if (new Set(terms).size !== terms.length) continue;
      break;
    }
    const rule = ruleText(kind, m, b);
    const name = rng.pick(NAMES);
    const t1 = terms[0], tk = terms[k - 1];
    if (backward) {
      const wrongUndo = (() => {
        let v = tk;
        for (let j = 1; j < k; j++) v = ruleUndoSwapped(kind, m, b, v);
        return v;
      })();
      const forwards = (() => {
        let v = tk;
        for (let j = 1; j < k; j++) v = ruleStep(kind, m, b, v);
        return v;
      })();
      const lines: string[] = [];
      for (let j = k - 1; j >= 1; j--) lines.push(`${ordinal(j)} term: ${undoLine(kind, m, b, terms[j], terms[j - 1])}`);
      return {
        prompt: rng.pick([
          `The term-to-term rule of a sequence is **${rule}**. The ${ordinal(k)} term is ${num(tk)}.\n\nFind the first term.`,
          `${name} uses the rule **${rule}** to get from each term to the next. The ${ordinal(k)} term is ${num(tk)}.\n\nWhat was the 1st term?`,
        ]),
        answer: { type: "number", value: t1 },
        solution: [`Work backwards. To undo “${rule}”, ${undoText(kind, m, b)}.`, ...lines],
        hint: "Work backwards: undo the last operation first, using the inverse operations.",
        traps: numTraps(t1, [
          [wrongUndo, `Undo the steps in reverse order: ${undoText(kind, m, b)}.`],
          [forwards, "You applied the rule forwards. To go back towards the 1st term, use the inverse operations."],
        ]),
      };
    }
    const wrongOrder = (() => {
      let v = t1;
      for (let j = 1; j < k; j++) v = ruleSwapped(kind, m, b, v);
      return v;
    })();
    const lines: string[] = [];
    for (let j = 1; j < k; j++) lines.push(`${ordinal(j + 1)} term: ${stepLine(kind, m, b, terms[j - 1], terms[j])}`);
    return {
      prompt: rng.pick([
        `A sequence starts with ${num(t1)}. The term-to-term rule is **${rule}**.\n\nFind the ${ordinal(k)} term.`,
        `${name} makes a sequence. The first term is ${num(t1)}, and each new term comes from the one before using the rule **${rule}**.\n\nWhat is the ${ordinal(k)} term?`,
        `The first term of a sequence is ${num(t1)}. To get the next term: **${rule}**.\n\nWork out the ${ordinal(k)} term.`,
      ]),
      answer: { type: "number", value: tk },
      solution: lines,
      hint: "Apply the rule one term at a time, doing the two operations in the order given.",
      traps: numTraps(tk, [
        [wrongOrder, `Do the operations in the order given: ${rule}.`],
        [terms[k - 2], `That's the ${ordinal(k - 1)} term. The 1st term is given, so you need ${k - 1} steps to reach the ${ordinal(k)} term.`],
        [ruleStep(kind, m, b, tk), `That's one step too far — it's the ${ordinal(k + 1)} term.`],
      ]),
    };
  },
};

// ---------------------------------------------------------------------------
// 3. Growing patterns (matchsticks, tables, tiles)
// ---------------------------------------------------------------------------
interface StickCtx {
  d: number;
  c: number;
  thing: string;
  label: string;
  intro: string;
  diagram?: string;
  tables?: boolean;
}

function stickContext(rng: Rng, tier: 1 | 2 | 3, name: string): StickCtx {
  const opts = ["squares", "triangles", "grid", "hexagons", "pentagons", "tables", "generic"];
  if (tier > 1) opts.push("generic");
  const pick = rng.pick(opts);
  switch (pick) {
    case "squares":
      return {
        d: 3, c: 1, thing: "matchsticks", label: "Matchsticks",
        intro: "Matchsticks are used to make rows of squares. Pattern 1 is one square, Pattern 2 is two squares in a row, and so on.",
        diagram: patternSvg("squares", "Patterns 1, 2 and 3: rows of 1, 2 and 3 squares made from matchsticks, using 4, 7 and 10 matchsticks"),
      };
    case "triangles":
      return {
        d: 2, c: 1, thing: "matchsticks", label: "Matchsticks",
        intro: "Matchsticks are used to make rows of triangles. Pattern 1 is one triangle, Pattern 2 is two triangles, and so on. Each new triangle shares a side with the one before.",
        diagram: patternSvg("triangles", "Patterns 1, 2 and 3: rows of 1, 2 and 3 triangles made from matchsticks, using 3, 5 and 7 matchsticks"),
      };
    case "grid":
      return {
        d: 5, c: 2, thing: "matchsticks", label: "Matchsticks",
        intro: "Matchsticks are used to make grids of squares that are two squares tall. Pattern 1 is one column of 2 squares, Pattern 2 has two columns, and so on.",
        diagram: patternSvg("grid", "Patterns 1, 2 and 3: grids two squares tall and 1, 2 and 3 squares long, using 7, 12 and 17 matchsticks"),
      };
    case "hexagons":
      return {
        d: 5, c: 1, thing: "matchsticks", label: "Matchsticks",
        intro: "Matchsticks are used to make a chain of hexagons. Pattern 1 is one hexagon, and each new pattern adds one more hexagon that shares a side with the last one.",
      };
    case "pentagons":
      return {
        d: 4, c: 1, thing: "matchsticks", label: "Matchsticks",
        intro: "Matchsticks are used to make a chain of pentagons. Pattern 1 is one pentagon, and each new pattern adds one more pentagon that shares a side with the last one.",
      };
    case "tables":
      return {
        d: 2, c: 2, thing: "people", label: "People", tables: true,
        intro: "Square tables are pushed together in a row at a hawker centre. One person can sit at each free side of a table.",
      };
    default: {
      let d = 3, c = 1;
      for (let i = 0; i < 50; i++) {
        d = rng.int(2, tier === 1 ? 6 : 8);
        c = tier === 1 ? rng.int(1, 6) : rng.nonZero(-3, 9);
        if (d + c >= 2) break;
      }
      const item = rng.pick(["square tiles", "counters", "beads", "cubes"]);
      return {
        d, c, thing: item, label: item[0].toUpperCase() + item.slice(1),
        intro: `${name} builds a sequence of patterns from ${item}. The table shows how many ${item} are in the first three patterns.`,
      };
    }
  }
}

const matchstickPatterns: Drill = {
  id: `${TOPIC}.matchstick-patterns`,
  topicId: TOPIC,
  title: "Growing patterns: matchsticks, tiles and tables",
  level: 2,
  guideRef: "term-to-term",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    const ctx = stickContext(rng, tier, name);
    const { d, c } = ctx;
    const t = [1, 2, 3].map((n) => d * n + c);
    const R = lin(d, c);
    const head = ctx.tables ? "Tables" : "Pattern";
    const table = `| ${head} | 1 | 2 | 3 |\n|---|---|---|---|\n| ${ctx.label} | ${t[0]} | ${t[1]} | ${t[2]} |`;
    const mode = tier === 1 ? "count" : tier === 2 ? rng.pick(["count", "expr", "which"]) : rng.pick(ctx.tables ? ["which", "expr"] : ["which", "most", "expr"]);
    const ruleSteps = [
      `Each step adds ${d} ${ctx.thing}, so the rule starts {{${d}n}}.`,
      `Zero term: ${t[0]} − ${d} = ${num(c)}, so the number of ${ctx.thing} is {{${R}}}.`,
    ];
    let question: string, answer: AnswerSpec, solution: string[], hint: string, traps: Trap[];
    if (mode === "count") {
      const k = tier === 1 ? rng.int(4, 12) : rng.int(12, 60);
      const v = d * k + c;
      question = ctx.tables
        ? `How many people can sit at ${k} tables pushed together in a row?`
        : `How many ${ctx.thing} are needed for Pattern ${k}?`;
      answer = { type: "number", value: v };
      solution = [...ruleSteps, `For ${ctx.tables ? `${k} tables` : `Pattern ${k}`}: ${subst(d, c, k)} = ${v}.`];
      hint = "How many are added each time? Use that to build a rule instead of drawing every pattern.";
      traps = numTraps(v, [
        [k * t[0], ctx.tables
          ? `${k} × 4 counts seats on the sides where tables are pushed together — nobody can sit there. Use the rule {{${R}}}.`
          : `Pattern ${k} is not ${k} copies of Pattern 1 — use the rule {{${R}}}.`],
        [d * k, `That's just the {{${d}n}} part — don't forget the constant: the rule is {{${R}}}.`],
      ]);
    } else if (mode === "expr") {
      question = ctx.tables
        ? "Write an expression for the number of people who can sit at n tables pushed together in a row."
        : `Write an expression, in terms of n, for the number of ${ctx.thing} in Pattern n.`;
      answer = { type: "expression", expr: R, form: "simplified" };
      solution = [...ruleSteps, `Check: n = 3 gives ${subst(d, c, 3)} = ${t[2]} ✓`];
      hint = "The number added each time goes in front of n. Then compare with the first pattern.";
      traps = linTraps(d, c, [
        [1, d, `“Add ${d} each time” is the term-to-term rule. The nth term needs ${d} × n: {{${d}n}}.`],
        [t[0], 0, ctx.tables ? "That counts seats on the joined sides, where nobody can sit." : "Pattern n is not n copies of Pattern 1 — check your rule against the table."],
        [d, 0, `Nearly — compare {{${d}n}} with the table. What must you add or subtract?`],
      ]);
    } else if (mode === "which") {
      const k = tier === 2 ? rng.int(10, 40) : rng.int(20, 100);
      const N = d * k + c;
      question = ctx.tables
        ? `How many tables are needed to seat exactly ${N} people?`
        : `Which pattern uses exactly ${N} ${ctx.thing}?`;
      answer = { type: "number", value: k };
      solution = [
        ...ruleSteps,
        `Solve {{${R} = ${N}}}: {{${d}n = ${N - c}}}, so n = ${N - c} ÷ ${d} = ${k}.`,
      ];
      hint = "Write the rule for the nth pattern, then set it equal to the number you are given.";
      traps = numTraps(k, [
        [(N + c) / d, `Undo the ${c > 0 ? "+" : "−"} ${num(Math.abs(c))} correctly: {{${d}n = ${N} ${c > 0 ? "-" : "+"} ${Math.abs(c)}}}.`],
        [N / d, `Don't forget the ${num(c)} in the rule {{${R}}}.`],
      ]);
    } else {
      const k = rng.int(20, 100);
      const r = rng.int(1, d - 1);
      const N = d * k + c + r;
      question = `${name} has ${N} ${ctx.thing} and wants to make just one pattern, as big as possible. What is the largest pattern number that can be made?`;
      answer = { type: "number", value: k };
      solution = [
        ...ruleSteps,
        `Need {{${R} <= ${N}}}, so {{${d}n <= ${N - c}}}. ${divText(N - c, d)}, so n can be at most ${k}.`,
        `Check: Pattern ${k} uses ${d * k + c}; Pattern ${k + 1} would need ${d * (k + 1) + c}, which is more than ${N}.`,
      ];
      hint = "Find the rule, then ask: which is the biggest whole number n that doesn't use too many?";
      traps = numTraps(k, [[k + 1, `Pattern ${k + 1} would need ${d * (k + 1) + c} ${ctx.thing} — more than ${N}. Round down here.`]]);
    }
    return {
      prompt: `${ctx.intro}\n\n${table}\n\n${question}`,
      diagram: ctx.diagram,
      answer,
      solution,
      hint,
      traps,
    };
  },
};

// ---------------------------------------------------------------------------
// 4. Terms from an nth-term rule
// ---------------------------------------------------------------------------
interface NthRule {
  show: string;
  val: (k: number) => number;
  sub: (k: number) => string;
  /** For whole-number linear rules: coefficient and constant. */
  a?: number;
  b?: number;
  kind: "linear" | "over" | "bracket" | "decimal";
  r?: number;
}

function makeNthRule(rng: Rng, tier: 1 | 2 | 3): NthRule {
  if (tier < 3) {
    let a = 3, b = -2;
    if (tier === 1) {
      a = rng.int(2, 9);
      b = rng.nonZero(-9, 12);
    } else if (rng.bool(0.5)) {
      a = -rng.int(2, 9);
      b = rng.int(10, 60);
    } else {
      a = rng.int(2, 12);
      b = -rng.int(1, 20);
    }
    return { show: lin(a, b), val: (k) => a * k + b, sub: (k) => subst(a, b, k), a, b, kind: "linear" };
  }
  const form = rng.pick(["over", "bracket", "decimal"] as const);
  if (form === "over") {
    const r = rng.pick([2, 4]);
    const e = rng.nonZero(-9, 9);
    return {
      show: `n/${r} ${e < 0 ? "-" : "+"} ${Math.abs(e)}`,
      val: (k) => clean(k / r + e),
      sub: (k) => `{{${k}/${r}}} ${signed(e)}`,
      kind: "over",
      r,
    };
  }
  if (form === "bracket") {
    const p = rng.pick([1, 3, 5, 7]);
    const qq = rng.nonZero(-9, 9);
    return {
      show: `(${lin(p, qq)})/2`,
      val: (k) => clean((p * k + qq) / 2),
      sub: (k) => `{{(${p === 1 ? `${k}` : `${p} * ${k}`} ${qq < 0 ? "-" : "+"} ${Math.abs(qq)})/2}}`,
      kind: "bracket",
    };
  }
  const c = rng.pick([0.5, 1.5, 2.5, 0.25, 0.75]) * (rng.bool(0.7) ? 1 : -1);
  const e = c > 0 ? rng.nonZero(-9, 9) : rng.int(5, 20);
  return { show: lin(c, e), val: (k) => clean(c * k + e), sub: (k) => subst(c, e, k), kind: "decimal" };
}

const termsFromNthTerm: Drill = {
  id: `${TOPIC}.terms-from-nth-term`,
  topicId: TOPIC,
  title: "Generate terms from an nth-term rule",
  level: 1,
  guideRef: "using-nth-term",
  generate(rng, tier) {
    const rule = makeNthRule(rng, tier);
    const name = rng.pick(NAMES);
    const intro = rng.pick([
      `The nth term of a sequence is {{${rule.show}}}.`,
      `A sequence has nth term {{${rule.show}}}.`,
      `${name} makes a sequence using the rule {{${rule.show}}}, where n is the position of the term.`,
    ]);
    if (rng.bool(0.45)) {
      const vals = [1, 2, 3].map(rule.val);
      return {
        prompt: `${intro}\n\nWrite down the first three terms, in order, separated by commas.${tier === 3 ? " Use decimals for any terms that are not whole numbers." : ""}`,
        answer: { type: "list", values: vals, ordered: true },
        solution: [
          "Substitute n = 1, 2 and 3 into the rule.",
          ...[1, 2, 3].map((k, i) => `n = ${k}: ${rule.sub(k)} = ${num(vals[i])}`),
        ],
        hint: "The first term has n = 1, the second has n = 2, and so on.",
        traps: [
          {
            spec: { type: "list", values: [0, 1, 2].map(rule.val), ordered: true },
            feedback: "The first term has n = 1, not n = 0.",
          },
        ],
      };
    }
    const k = tier === 1 ? rng.pick([5, 6, 7, 8, 9, 10, 11, 12, 20]) : tier === 2 ? rng.pick([10, 12, 15, 20, 25, 50, 100]) : rng.pick([10, 15, 25, 30, 100]);
    const v = rule.val(k);
    const traps: Array<[number, string]> = [];
    if (rule.kind === "linear" && rule.a! > 0) traps.push([rule.a! + k + rule.b!, `{{${rule.a}n}} means ${rule.a} × n, not ${rule.a} + n.`]);
    if (rule.kind === "linear" && rule.a! < 0) traps.push([-rule.a! * k - rule.b!, `The rule is {{${rule.show}}}: start with ${rule.b} and take away ${-rule.a!} × ${k}.`]);
    if (rule.kind === "over") traps.push([clean(k * rule.r! + rule.val(0)), `{{n/${rule.r}}} means n ÷ ${rule.r}, not n × ${rule.r}.`]);
    traps.push([rule.val(k - 1), `That's the ${ordinal(k - 1)} term — substitute n = ${k}.`]);
    return {
      prompt: `${intro}\n\nFind the ${ordinal(k)} term.`,
      answer: { type: "number", value: v },
      solution: [`The ${ordinal(k)} term has n = ${k}.`, `${rule.sub(k)} = ${num(v)}`],
      hint: `Replace n with ${k} and work it out — remember multiplication and division come before + and −.`,
      traps: numTraps(v, traps),
    };
  },
};

// ---------------------------------------------------------------------------
// 5. Find the nth term (whole-number difference)
// ---------------------------------------------------------------------------
const findNthTerm: Drill = {
  id: `${TOPIC}.find-nth-term`,
  topicId: TOPIC,
  title: "Find the nth term of a linear sequence",
  level: 2,
  guideRef: "finding-nth-term",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    if (tier === 3 && rng.bool(0.5)) {
      // Two non-consecutive terms given.
      const p = rng.int(2, 6);
      const g = rng.int(2, 6);
      const qPos = p + g;
      const d = rng.int(2, 9) * (rng.bool(0.65) ? 1 : -1);
      const c = rng.nonZero(-15, 25);
      const tp = d * p + c, tq = d * qPos + c;
      const R = lin(d, c);
      const D = tq - tp;
      return {
        prompt: rng.pick([
          `In a linear sequence, the ${ordinal(p)} term is ${num(tp)} and the ${ordinal(qPos)} term is ${num(tq)}.\n\nFind an expression for the nth term.`,
          `${name} knows two terms of a linear sequence: the ${ordinal(p)} term is ${num(tp)} and the ${ordinal(qPos)} term is ${num(tq)}.\n\nWhat is the nth term?`,
        ]),
        answer: { type: "expression", expr: R, form: "simplified" },
        solution: [
          `From the ${ordinal(p)} term to the ${ordinal(qPos)} term is ${g} steps, and the value changes by ${num(tq)} − ${br(tp)} = ${num(D)}.`,
          `So the common difference is ${num(D)} ÷ ${g} = ${num(d)}.`,
          `Zero term: ${num(tp)} − ${p} × ${br(d)} = ${num(c)}, so the nth term is {{${R}}}.`,
          `Check: n = ${qPos} gives ${subst(d, c, qPos)} = ${num(tq)} ✓`,
        ],
        hint: "How many steps are there between the two positions, and how much does the value change?",
        traps: linTraps(d, c, [
          [D, tp - p * D, `The change of ${num(D)} is spread over ${g} steps — divide by ${g} to get the difference.`],
          [d, tp, `The constant is the zero term (the value at n = 0), not the ${ordinal(p)} term.`],
        ]),
      };
    }
    let d = 3, c = 2;
    for (let i = 0; i < 100; i++) {
      if (tier === 1) {
        d = rng.int(2, 9);
        c = rng.nonZero(-5, 10);
      } else if (tier === 2) {
        d = rng.int(2, 12) * (rng.bool(0.6) ? 1 : -1);
        c = d > 0 ? rng.nonZero(-20, 15) : rng.int(10, 60);
      } else {
        d = rng.int(5, 15) * (rng.bool(0.6) ? 1 : -1);
        c = d > 0 ? rng.nonZero(-40, 40) : rng.int(20, 90);
      }
      if (tier === 1 && d + c < 1) continue;
      break;
    }
    const count = tier === 1 ? 4 : 5;
    const t = Array.from({ length: count }, (_, i) => d * (i + 1) + c);
    const R = lin(d, c);
    const shown = seq(t);
    const traps: Array<[number, number, string]> = [
      [1, d, `“${d > 0 ? "Add" : "Subtract"} ${Math.abs(d)}” is the term-to-term rule. In the nth term the difference multiplies n: {{${term(d, "n")}}}.`],
      [d, t[0], `The number added on is the zero term (first term − difference), not the first term.`],
    ];
    if (d < 0) traps.push([-d, t[0] + d, `The sequence goes DOWN, so the difference is ${num(d)} and the rule has {{${term(d, "n")}}}.`]);
    return {
      prompt: rng.pick([
        `Find the nth term of the sequence\n\n${shown}`,
        `Here is a linear sequence:\n\n${shown}\n\nWrite an expression for the nth term.`,
        `${name} is looking at the sequence ${shown}\n\nWhat is the nth term of the sequence?`,
      ]),
      answer: { type: "expression", expr: R, form: "simplified" },
      solution: [
        `The terms ${d > 0 ? "go up" : "go down"} by ${Math.abs(d)} each time, so the difference is ${num(d)} and the rule starts {{${term(d, "n")}}}.`,
        `Zero term = first term − difference = ${num(t[0])} − ${br(d)} = ${num(c)}.`,
        `nth term = {{${R}}}.`,
        `Check: n = 2 gives ${subst(d, c, 2)} = ${num(t[1])} ✓`,
      ],
      hint: "The common difference goes in front of n. Then work out the zero term: the term one step before the first.",
      traps: linTraps(d, c, traps),
    };
  },
};

// ---------------------------------------------------------------------------
// 6. Find the nth term (decimal or fraction difference)
// ---------------------------------------------------------------------------
const findNthTermFractions: Drill = {
  id: `${TOPIC}.find-nth-term-fractions`,
  topicId: TOPIC,
  title: "Find the nth term when the difference is a decimal or fraction",
  level: 3,
  guideRef: "finding-nth-term",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    const promptFor = (shown: string) =>
      rng.pick([
        `Find the nth term of the sequence\n\n${shown}`,
        `Here is a linear sequence:\n\n${shown}\n\nWrite an expression for the nth term.`,
        `${name} says the sequence ${shown} has a rule of the form “difference × n + zero term”. Find the nth term.`,
      ]);
    if (tier === 3) {
      let Qd = 3, P = 2, C = -1;
      for (let i = 0; i < 200; i++) {
        Qd = rng.pick([3, 4, 5, 6]);
        P = rng.int(1, 2 * Qd - 1) * (rng.bool(0.7) ? 1 : -1);
        if (gcd(P, Qd) !== 1) continue;
        C = rng.int(-Qd, 3 * Qd);
        const nums = [1, 2, 3, 4].map((k) => C + k * P);
        if (nums.some((v) => v === 0)) continue;
        break;
      }
      const mixed = rng.bool(0.4);
      const nums = [1, 2, 3, 4].map((k) => C + k * P);
      const shown = nums.map((v) => fq(v, Qd, mixed)).join(", ") + ", …";
      const top = poly([[P, "n"], [C, ""]]);
      const expr = `(${top})/${Qd}`;
      const coef = `${P < 0 ? "-" : ""}${Math.abs(P)}/${Qd}`;
      const [cn, cd] = simplify(C, Qd);
      const constPart = C === 0 ? "" : ` ${cn < 0 ? "-" : "+"} ${cd === 1 ? Math.abs(cn) : `${Math.abs(cn)}/${cd}`}`;
      const display = `{{${coef} n${constPart}}}, which is the same as {{${expr}}}`;
      const pFrac = frac(P, Qd, { simplify: false });
      const zero = C === 0 ? "0" : frac(C, Qd);
      return {
        prompt: promptFor(shown),
        answer: { type: "expression", expr, display },
        solution: [
          `Write the terms over ${Qd}: ${nums.map((v) => frac(v, Qd, { simplify: false })).join(", ")}. The numerators change by ${num(P)} each time, so the difference is ${pFrac}.`,
          `Zero term = first term − difference = ${frac(nums[0], Qd, { simplify: false })} − ${P < 0 ? `(${pFrac})` : pFrac} = ${zero}.`,
          `nth term = ${display}.`,
          `Check: n = 2 gives {{(${P} * 2 ${C < 0 ? "-" : "+"} ${Math.abs(C)})/${Qd}}} = ${frac(nums[1], Qd)} ✓`,
        ],
        hint: "Rewrite all the terms with the same denominator — then it is an ordinary linear sequence on top.",
        traps: [
          { spec: { type: "expression", expr: `n ${P < 0 ? "-" : "+"} ${Math.abs(P)}/${Qd}` }, feedback: "That's the term-to-term rule. In the nth term the difference multiplies n." },
          { spec: { type: "expression", expr: `(${poly([[P, "n"], [C + P, ""]])})/${Qd}` }, feedback: "The constant is the zero term (first term − difference), not the first term." },
        ],
      };
    }
    // Decimals, worked in hundredths.
    let P = 50, C = 150;
    for (let i = 0; i < 200; i++) {
      if (tier === 1) {
        P = rng.pick([50, 150, 250]);
        C = rng.int(-1, 10) * 50;
        if (C + P <= 0 || C === 0) continue;
      } else {
        P = rng.pick([25, 75, 125, 20, 40, 30, 120, 50, 150, 250]) * (rng.bool(0.7) ? 1 : -1);
        C = rng.int(-20, 40) * (Math.abs(P) % 10 === 0 ? 10 : 25);
        if (C === 0) continue;
        if ([1, 2, 3, 4].some((k) => C + k * P === 0)) continue;
      }
      break;
    }
    const d = clean(P / 100), c = clean(C / 100);
    const t = [1, 2, 3, 4].map((k) => clean((C + k * P) / 100));
    const R = lin(d, c);
    return {
      prompt: promptFor(seq(t)),
      answer: { type: "expression", expr: R },
      solution: [
        `The difference is ${num(t[1])} − ${br(t[0])} = ${num(d)}, so the rule starts {{${term(d, "n")}}}.`,
        `Zero term = first term − difference = ${num(t[0])} − ${br(d)} = ${num(c)}.`,
        `nth term = {{${R}}}.`,
        `Check: n = 3 gives ${subst(d, c, 3)} = ${num(t[2])} ✓`,
      ],
      hint: "Exactly the same method as whole numbers: difference × n, then adjust with the zero term.",
      traps: linTraps(d, c, [
        [1, d, "That's the term-to-term rule. In the nth term the difference multiplies n."],
        [d, t[0], "The constant is the zero term (first term − difference), not the first term."],
      ]),
    };
  },
};

// ---------------------------------------------------------------------------
// 7. Is it a term? Which term? First term past a value.
// ---------------------------------------------------------------------------
function firstPast(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const name = rng.pick(NAMES);
  if (tier === 3 && rng.bool(0.5)) {
    if (rng.bool()) {
      let S = 40, w = 15, T = 300, n = 18;
      for (let i = 0; i < 100; i++) {
        S = rng.int(4, 16) * 5;
        w = rng.int(8, 25);
        T = rng.int(20, 60) * 10;
        n = Math.floor((T - S) / w) + 1;
        if (n >= 3) break;
      }
      return {
        prompt: `${name} has $${S} in a money box and adds $${w} every week. After n weeks there is {{${w}n + ${S}}} dollars in the box.\n\nAfter how many weeks will there first be more than $${T} in the box?`,
        answer: { type: "number", value: n },
        solution: [
          `Solve {{${w}n + ${S} > ${T}}}, so {{${w}n > ${T - S}}}.`,
          `${divText(T - S, w)}, so the smallest whole number of weeks is ${n}.`,
          `Check: after ${n - 1} weeks there is $${w * (n - 1) + S} (not more than $${T}); after ${n} weeks there is $${w * n + S} ✓`,
        ],
        hint: "Write an inequality, solve it, then think about which whole number of weeks first works.",
        traps: numTraps(n, [
          [n - 1, `After ${n - 1} weeks there is only $${w * (n - 1) + S}, which is not more than $${T}.`],
          [w * n + S, "That's the amount of money. The question asks for the number of weeks."],
        ]),
      };
    }
    let C = 500, r = 35, L = 100, n = 12;
    for (let i = 0; i < 100; i++) {
      C = rng.int(6, 18) * 50;
      r = rng.int(3, 9) * 5;
      L = rng.int(5, 15) * 10;
      n = Math.floor((C - L) / r) + 1;
      if (n >= 3) break;
    }
    return {
      prompt: `After a monsoon storm, a rainwater tank at a community garden holds ${C} litres. The plants use ${r} litres every hour, so after n hours the tank holds {{${C} - ${r}n}} litres.\n\nAfter how many whole hours will the tank first hold less than ${L} litres?`,
      answer: { type: "number", value: n },
      solution: [
        `Solve {{${C} - ${r}n < ${L}}}, so {{${r}n > ${C - L}}}.`,
        `${divText(C - L, r)}, so the smallest whole number of hours is ${n}.`,
        `Check: after ${n - 1} hours it holds ${C - r * (n - 1)} litres (not less than ${L}); after ${n} hours it holds ${C - r * n} litres ✓`,
      ],
      hint: "Write an inequality, solve it, then think about which whole number of hours first works.",
      traps: numTraps(n, [
        [n - 1, `After ${n - 1} hours the tank still holds ${C - r * (n - 1)} litres, which is not less than ${L}.`],
        [C - r * n, "That's the amount of water. The question asks for the number of hours."],
      ]),
    };
  }
  const up = rng.bool(0.55);
  const askValue = rng.bool();
  let d = 5, c = 2, L = 100, n = 3;
  for (let i = 0; i < 200; i++) {
    if (up) {
      d = rng.int(3, tier === 2 ? 9 : 15);
      c = rng.nonZero(-10, 20);
      L = tier === 2 ? rng.int(5, 30) * 10 : rng.int(10, 100) * 10;
      if (L - c <= 0) continue;
      n = Math.floor((L - c) / d) + 1;
    } else {
      d = rng.int(3, 12);
      c = rng.int(60, tier === 2 ? 200 : 400);
      L = rng.bool(0.5) ? 0 : tier === 2 ? rng.int(1, 5) * 10 : rng.int(-5, 8) * 10;
      if (c - L <= 0) continue;
      n = Math.floor((c - L) / d) + 1;
    }
    if (n >= 3) break;
  }
  const a = up ? d : -d;
  const R = lin(a, c);
  const v = a * n + c, prev = a * (n - 1) + c;
  const target = up ? `greater than ${num(L)}` : L === 0 ? "negative" : `less than ${num(L)}`;
  const firstPhrase = up ? `the first term greater than ${num(L)}` : L === 0 ? "the first negative term" : `the first term less than ${num(L)}`;
  const ask = askValue
    ? `Find ${firstPhrase} in the sequence.`
    : `Which term is ${firstPhrase}? Give its position n (for example, 7 for the 7th term).`;
  const desc = tier === 3 ? `Here is a linear sequence: ${seq([1, 2, 3, 4].map((k) => a * k + c))}` : `A sequence has nth term {{${R}}}.`;
  const solveLine = up
    ? `Solve {{${R} > ${L}}}, so {{${d}n > ${L - c}}}.`
    : `Solve {{${R} < ${L}}}, so {{${d}n > ${c - L}}}.`;
  return {
    prompt: `${desc}\n\n${ask}`,
    answer: { type: "number", value: askValue ? v : n },
    solution: [
      ...(tier === 3 ? [`The difference is ${num(a)} and the zero term is ${num(c)}, so the nth term is {{${R}}}.`] : []),
      solveLine,
      `${divText(up ? L - c : c - L, d)}, so the smallest whole number n is ${n}.`,
      `Check: n = ${n - 1} gives ${num(prev)} (not ${target}); n = ${n} gives ${num(v)} ✓ ${askValue ? `So the term is ${num(v)}.` : `So it is the ${ordinal(n)} term.`}`,
    ],
    hint: "Turn it into an inequality and solve it — then pick the first whole number that works.",
    traps: askValue
      ? numTraps(v, [
          [prev, `${num(prev)} is not ${target} — it's the term just before.`],
          [n, "That's its position. The question asks for the term itself."],
        ])
      : numTraps(n, [
          [v, "That's the term itself. The question asks for its position n."],
          [n - 1, `n = ${n - 1} gives ${num(prev)}, which is not ${target}.`],
        ]),
  };
}

const isItATerm: Drill = {
  id: `${TOPIC}.is-it-a-term`,
  topicId: TOPIC,
  title: "Is a number in the sequence — and which term is it?",
  level: 2,
  guideRef: "is-it-a-term",
  generate(rng, tier) {
    const mode = tier === 1 ? "which" : rng.pick(tier === 2 ? ["which", "which", "yesno", "past"] : ["which", "yesno", "past", "past"]);
    if (mode === "past") return firstPast(rng, tier);
    let d = 3, c = 4;
    for (let i = 0; i < 100; i++) {
      if (tier === 1) {
        d = rng.int(2, 9);
        c = rng.nonZero(-9, 12);
      } else if (rng.bool(0.6)) {
        d = rng.int(2, tier === 2 ? 12 : 15);
        c = rng.nonZero(-20, 20);
      } else {
        d = -rng.int(2, tier === 2 ? 9 : 13);
        c = rng.int(30, 120);
      }
      if (d + c >= 1 || d < 0) break;
    }
    const byTerms = tier === 3 || (tier === 2 && rng.bool(0.4));
    const R = lin(d, c);
    const t = [1, 2, 3, 4].map((k) => d * k + c);
    const desc = byTerms ? `the sequence ${seq(t)}` : `the sequence with nth term {{${R}}}`;
    const stop = byTerms ? "" : "."; // "…" already ends the sentence — avoid "…."
    const ad = Math.abs(d);
    const k = tier === 1 ? rng.int(10, 40) : tier === 2 ? rng.int(8, 60) : rng.int(20, 150);
    const name = rng.pick(NAMES);
    const ruleStep = byTerms ? [`The difference is ${num(d)} and the zero term is ${num(t[0])} − ${br(d)} = ${num(c)}, so the nth term is {{${R}}}.`] : [];
    if (mode === "which") {
      const N = d * k + c;
      const M = d > 0 ? N - c : c - N; // = |d|·k
      return {
        prompt: rng.pick([
          `Which term of ${desc} is ${num(N)}?\n\nGive its position (for example, 7 for the 7th term).`,
          `${num(N)} is a term in ${desc}${stop}\n\nWhat is its position in the sequence?`,
          `${name} says that ${num(N)} appears in ${desc}${stop} Which term is it? Give the position n.`,
        ]),
        answer: { type: "number", value: k },
        solution: [
          ...ruleStep,
          `Solve {{${R} = ${N}}}.`,
          d > 0 ? `{{${d}n = ${N} ${c > 0 ? "-" : "+"} ${Math.abs(c)} = ${M}}}` : `{{${ad}n = ${c} - ${N < 0 ? `(${N})` : N} = ${M}}}`,
          `n = ${M} ÷ ${ad} = ${k}, so ${num(N)} is the ${ordinal(k)} term.`,
        ],
        hint: "Set the nth-term rule equal to the number and solve for n.",
        traps: numTraps(k, [
          [d > 0 ? (N + c) / d : (c + N) / ad, "Check how you undid the constant — use the inverse operation."],
          [N / d, `Don't forget the ${num(c)} in the rule {{${R}}}.`],
        ]),
      };
    }
    // Yes / no
    const yes = rng.bool();
    const r = yes ? 0 : rng.int(1, ad - 1);
    const N = d * k + c + (d > 0 ? r : -r);
    const M = d > 0 ? N - c : c - N; // = |d|·k + r
    const tk = d * k + c, tk1 = d * (k + 1) + c;
    return {
      prompt: rng.pick([
        `Is ${num(N)} a term of ${desc}?\n\nAnswer yes or no.`,
        `${name} thinks ${num(N)} is in ${desc}${stop} Is ${name} right? Answer yes or no.`,
      ]),
      answer: yes ? { type: "text", accept: YES, display: "Yes" } : { type: "text", accept: NO, display: "No" },
      solution: [
        ...ruleStep,
        `Solve {{${R} = ${N}}}: {{${ad}n = ${M}}}.`,
        yes
          ? `n = ${M} ÷ ${ad} = ${k}, a whole number — so yes, ${num(N)} is the ${ordinal(k)} term.`
          : `${divText(M, ad)}, so n is not a whole number — no, ${num(N)} is not in the sequence. It falls between the ${ordinal(k)} term (${num(tk)}) and the ${ordinal(k + 1)} term (${num(tk1)}).`,
      ],
      hint: "Set the rule equal to the number and solve. Is n a whole number?",
      traps: [
        yes
          ? { spec: { type: "text", accept: ["no"] }, feedback: `Solve {{${R} = ${N}}}: n = ${k}, a whole number, so it is a term.` }
          : { spec: { type: "text", accept: ["yes"] }, feedback: `Solve {{${R} = ${N}}}: n is not a whole number, so it can't be a term.` },
      ],
    };
  },
};

// ---------------------------------------------------------------------------
// 8. Name the type of sequence
// ---------------------------------------------------------------------------
type SeqType = "arithmetic" | "geometric" | "fibonacci" | "square" | "triangular" | "cube";

const tri = (s: number) => (s * (s + 1)) / 2;
function isArith(v: number[]): boolean {
  const d = clean(v[1] - v[0]);
  return v.every((x, i) => i === 0 || clean(x - v[i - 1]) === d);
}
function isGeo(v: number[]): boolean {
  if (v.some((x) => x === 0)) return false;
  const r = v[1] / v[0];
  return v.every((x, i) => i === 0 || Math.abs(x / v[i - 1] - r) < 1e-12);
}
function isFib(v: number[]): boolean {
  return v.every((x, i) => i < 2 || clean(v[i - 1] + v[i - 2]) === clean(x));
}
function isPowerRun(v: number[], f: (s: number) => number): boolean {
  for (let s = 1; s <= 40; s++) if (v.every((x, i) => x === f(s + i))) return true;
  return false;
}
function classify(v: number[]): SeqType[] {
  const out: SeqType[] = [];
  if (isArith(v)) out.push("arithmetic");
  if (isGeo(v)) out.push("geometric");
  if (isFib(v)) out.push("fibonacci");
  if (isPowerRun(v, (s) => s * s)) out.push("square");
  if (isPowerRun(v, tri)) out.push("triangular");
  if (isPowerRun(v, (s) => s * s * s)) out.push("cube");
  return out;
}

const TYPE_ACCEPT: Record<SeqType, string[]> = {
  arithmetic: ["arithmetic", "arithmetic sequence", "arithmetic progression", "an arithmetic sequence", "linear", "linear sequence", "a linear sequence"],
  geometric: ["geometric", "geometric sequence", "geometric progression", "a geometric sequence", "geometrical"],
  fibonacci: ["Fibonacci-type", "fibonacci type", "fibonacci", "fibonacci sequence", "fibonacci-type sequence", "fibonacci type sequence", "a fibonacci-type sequence", "a fibonacci sequence", "fibonacci-like", "fibonacci like", "fibonacci-like sequence", "fibonacci style"],
  square: ["square numbers", "square", "squares", "square number", "the square numbers", "square sequence"],
  triangular: ["triangular numbers", "triangular", "triangle numbers", "triangular number", "the triangular numbers", "triangle"],
  cube: ["cube numbers", "cube", "cubes", "cube number", "the cube numbers", "cubic numbers"],
};

function makeTyped(rng: Rng, type: SeqType, tier: 1 | 2 | 3): number[] {
  switch (type) {
    case "arithmetic": {
      if (tier === 1) {
        const a = rng.int(1, 20), d = rng.int(2, 9);
        return [0, 1, 2, 3, 4].map((k) => a + k * d);
      }
      if (rng.bool(0.6)) {
        const a = rng.int(-15, 40), d = rng.nonZero(-12, 12);
        return [0, 1, 2, 3, 4].map((k) => a + k * d);
      }
      const A = rng.int(-10, 30) * 5, D = rng.pick([5, 15, 25, -5, -15]) * 10; // hundredths
      return [0, 1, 2, 3, 4].map((k) => clean((A * 10 + k * D) / 100));
    }
    case "geometric": {
      if (tier === 1) {
        const r = rng.pick([2, 3, 5, 10]);
        const a = rng.int(1, r === 10 ? 4 : 6);
        return [0, 1, 2, 3, 4].map((k) => a * r ** k);
      }
      const r = rng.pick(tier === 2 ? [2, 3, -2, 0.5] : [-2, -3, 0.5, 1.5, -0.5, 3]);
      const a = Math.abs(r) < 1 || r === 1.5 ? rng.pick([1, 3, 5, 7]) * 16 : rng.nonZero(-6, 6);
      return [0, 1, 2, 3, 4].map((k) => clean(a * r ** k));
    }
    case "fibonacci": {
      const a = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 12);
      const b = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 12);
      const v = [a, b];
      for (let i = 2; i < 5; i++) v.push(v[i - 1] + v[i - 2]);
      return v;
    }
    case "square": {
      const s = tier === 1 ? 1 : tier === 2 ? rng.int(1, 5) : rng.int(3, 10);
      return [0, 1, 2, 3, 4].map((k) => (s + k) * (s + k));
    }
    case "triangular": {
      const s = tier === 1 ? 1 : tier === 2 ? rng.int(1, 5) : rng.int(3, 10);
      return [0, 1, 2, 3, 4].map((k) => tri(s + k));
    }
    case "cube": {
      const s = tier === 3 ? rng.int(1, 4) : 1;
      return [0, 1, 2, 3, 4].map((k) => (s + k) ** 3);
    }
  }
}

const sequenceTypes: Drill = {
  id: `${TOPIC}.sequence-types`,
  topicId: TOPIC,
  title: "Arithmetic, geometric, Fibonacci-type or special numbers?",
  level: 1,
  guideRef: "special-sequences",
  generate(rng, tier) {
    const pool: SeqType[] = tier === 1 ? ["arithmetic", "geometric", "fibonacci", "square", "triangular"] : ["arithmetic", "geometric", "fibonacci", "square", "triangular", "cube"];
    let type: SeqType = "arithmetic";
    let v: number[] = [1, 3, 5, 7, 9];
    for (let i = 0; i < 200; i++) {
      type = rng.pick(pool);
      v = makeTyped(rng, type, tier);
      if (v.some((x, j) => j > 0 && x === v[j - 1])) continue;
      const kinds = classify(v);
      if (kinds.length === 1 && kinds[0] === type) break;
    }
    const diffs = v.slice(1).map((x, i) => clean(x - v[i]));
    const diffLine = `Differences: ${diffs.map(num).join(", ")}${isArith(v) ? " — the same every time." : " — not constant, so it is not arithmetic."}`;
    let explain: string[];
    switch (type) {
      case "arithmetic":
        explain = [diffLine, "A constant difference means the sequence is **arithmetic** (linear)."];
        break;
      case "geometric": {
        const r = clean(v[1] / v[0]);
        explain = [diffLine, `Each term is the one before × ${num(r)}: ${num(v[0])} × ${br(r)} = ${num(v[1])}.`, "A constant multiplier means it is **geometric**."];
        break;
      }
      case "fibonacci":
        explain = [diffLine, `Each term is the sum of the two before: ${num(v[0])} + ${br(v[1])} = ${num(v[2])} and ${num(v[1])} + ${br(v[2])} = ${num(v[3])}.`, "So it is **Fibonacci-type**."];
        break;
      case "square": {
        const s = Math.round(Math.sqrt(v[0]));
        explain = [diffLine, `The terms are {{${s}^2}}, {{${s + 1}^2}}, {{${s + 2}^2}}, … — the **square numbers**.`];
        break;
      }
      case "triangular":
        explain = [diffLine, "The differences go up by 1 each time — these are the **triangular numbers** 1, 3, 6, 10, 15, 21, …"];
        break;
      case "cube": {
        const s = Math.round(Math.cbrt(v[0]));
        explain = [diffLine, `The terms are {{${s}^3}}, {{${s + 1}^3}}, {{${s + 2}^3}}, … — the **cube numbers**.`];
        break;
      }
    }
    const TRAP: Record<SeqType, Trap> = {
      arithmetic: { spec: { type: "text", accept: ["geometric"] }, feedback: "The terms aren't multiplied by the same number — but they do change by the same amount each time." },
      geometric: { spec: { type: "text", accept: ["arithmetic", "linear"] }, feedback: "The differences change. Try dividing each term by the one before." },
      fibonacci: { spec: { type: "text", accept: ["arithmetic", "linear"] }, feedback: "The differences are not constant. Try adding two neighbouring terms." },
      square: { spec: { type: "text", accept: ["triangular numbers", "triangular"] }, feedback: "Triangular numbers go 1, 3, 6, 10, … These terms are a number times itself." },
      triangular: { spec: { type: "text", accept: ["square numbers", "square", "squares"] }, feedback: "Square numbers go 1, 4, 9, 16, … Look at how the differences grow: by 1 each time." },
      cube: { spec: { type: "text", accept: ["square numbers", "square", "squares"] }, feedback: "Check: is each term n × n, or n × n × n?" },
    };
    const name = rng.pick(NAMES);
    const shown = seq(v);
    return {
      prompt: rng.pick([
        `What type of sequence is this?\n\n${shown}`,
        `${name} writes down the sequence ${shown}\n\nWhat type of sequence is it?`,
        `Look carefully at how this sequence changes:\n\n${shown}\n\nWhat type of sequence is it?`,
      ]) + "\n\nAnswer with one of: arithmetic, geometric, Fibonacci-type, square numbers, triangular numbers, cube numbers.",
      answer: { type: "text", accept: TYPE_ACCEPT[type], display: TYPE_ACCEPT[type][0] },
      solution: explain,
      hint: "Check the differences first. If they're not constant, try ratios, then try adding neighbouring terms.",
      traps: [TRAP[type]],
    };
  },
};

// ---------------------------------------------------------------------------
// 9. Geometric, Fibonacci-type and special sequences: next / missing terms
// ---------------------------------------------------------------------------
const specialTerms: Drill = {
  id: `${TOPIC}.special-sequences`,
  topicId: TOPIC,
  title: "Next and missing terms in geometric, Fibonacci-type and special sequences",
  level: 2,
  guideRef: "special-sequences",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    const kinds = tier === 1 ? ["geo", "fib", "sq", "tri"] : tier === 2 ? ["geo", "geo", "fib", "cube", "trik"] : ["fibback", "fibgap", "geogap", "geok", "trik"];
    const kind = rng.pick(kinds);
    const nextPrompt = (shown: string) =>
      rng.pick([
        `Find the next term of the sequence\n\n${shown}`,
        `What comes next?\n\n${shown}`,
        `${name} spots a pattern: ${shown}\n\nWhat is the next term?`,
      ]);
    const arithTrap = (v: number[], next: number, why: string) =>
      numTraps(next, [[clean(v[v.length - 1] * 2 - v[v.length - 2]), why]]);

    if (kind === "geo") {
      let a = 3, r = 2;
      if (tier === 1) {
        r = rng.pick([2, 3, 5, 10, 0.5]);
        a = r === 0.5 ? rng.pick([1, 3, 5, 7, 9, 11]) * 16 : rng.int(1, r === 10 ? 9 : 6);
      } else {
        r = rng.pick([-2, -3, 1.5, 0.5, 4]);
        a = r === 1.5 ? rng.pick([1, 3, 5]) * 16 : r === 0.5 ? rng.pick([1, 3, 5, 7, 9, 11, 13]) * 8 : rng.nonZero(-9, 9);
        if (r === -3 || r === 4) a = rng.nonZero(-5, 5);
      }
      const v = [0, 1, 2, 3].map((k) => clean(a * r ** k));
      const next = clean(a * r ** 4);
      return {
        prompt: nextPrompt(seq(v)),
        answer: { type: "number", value: next },
        solution: [
          `Each term is the one before × ${num(r)}${r === 0.5 ? " (halving)" : ""}: ${num(v[0])} × ${br(r)} = ${num(v[1])}.`,
          `This is a **geometric** sequence. Next term: ${num(v[3])} × ${br(r)} = ${num(next)}.`,
        ],
        hint: "The differences aren't constant — try dividing each term by the one before.",
        traps: arithTrap(v, next, "You added the last difference. Check the ratio: each term is multiplied by the same number."),
      };
    }
    if (kind === "fib") {
      let v: number[] = [];
      for (let i = 0; i < 100; i++) {
        const a = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 12);
        const b = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 12);
        v = [a, b];
        for (let j = 2; j < 5; j++) v.push(v[j - 1] + v[j - 2]);
        if (tier > 1 && v.every((x) => x > 0)) continue; // tier 2: include a negative
        if (v.some((x) => x === 0) || new Set(v).size !== 5) continue; // no zeros or repeats
        if (!isArith(v)) break;
      }
      const next = v[3] + v[4];
      return {
        prompt: nextPrompt(seq(v)),
        answer: { type: "number", value: next },
        solution: [
          `Each term is the sum of the two before it: ${num(v[0])} + ${br(v[1])} = ${num(v[2])}, ${num(v[1])} + ${br(v[2])} = ${num(v[3])}.`,
          `This is **Fibonacci-type**. Next term: ${num(v[3])} + ${br(v[4])} = ${num(next)}.`,
        ],
        hint: "The differences aren't constant and neither are the ratios. Try adding two neighbouring terms.",
        traps: arithTrap(v, next, "Adding the last difference doesn't work here. Try adding the two terms before."),
      };
    }
    if (kind === "sq" || kind === "tri" || kind === "cube") {
      const f = kind === "sq" ? (s: number) => s * s : kind === "tri" ? tri : (s: number) => s ** 3;
      const s = kind === "cube" ? rng.int(1, 3) : rng.int(1, 6);
      const count = kind === "cube" ? 4 : 5;
      const v = Array.from({ length: count }, (_, i) => f(s + i));
      const m = s + count;
      const next = f(m);
      const label = kind === "sq" ? "square numbers" : kind === "tri" ? "triangular numbers" : "cube numbers";
      const lines =
        kind === "tri"
          ? [`The differences are ${v.slice(1).map((x, i) => x - v[i]).join(", ")} — going up by 1 each time: these are the **triangular numbers**.`, `Next difference is ${m}, so the next term is ${v[count - 1]} + ${m} = ${next}.`]
          : [`The terms are {{${s}^${kind === "sq" ? 2 : 3}}}, {{${s + 1}^${kind === "sq" ? 2 : 3}}}, … — the **${label}**.`, `Next term: {{${m}^${kind === "sq" ? 2 : 3}}} = ${next}.`];
      return {
        prompt: nextPrompt(seq(v)),
        answer: { type: "number", value: next },
        solution: lines,
        hint: "Do you recognise these numbers? Look at the differences too.",
        traps: arithTrap(v, next, `The differences are not constant — these are ${label}.`),
      };
    }
    if (kind === "trik") {
      const k = tier === 2 ? rng.int(8, 15) : rng.int(12, 40);
      const ans = tri(k);
      return {
        prompt: rng.pick([
          `The triangular numbers are 1, 3, 6, 10, 15, …\n\nFind the ${ordinal(k)} triangular number.`,
          `${name} builds triangles of dots: 1 dot, then 3, then 6, then 10, and so on. How many dots are in the ${ordinal(k)} triangle?`,
        ]),
        answer: { type: "number", value: ans },
        solution: [
          `The ${ordinal(k)} triangular number is 1 + 2 + 3 + … + ${k}.`,
          `Pair the numbers from each end: the nth triangular number is {{(n(n + 1))/2}}.`,
          `${k} × ${k + 1} ÷ 2 = ${ans}`,
        ],
        hint: "The nth triangular number is 1 + 2 + … + n. Can you add these quickly by pairing them up?",
        traps: numTraps(ans, [
          [k * (k + 1), "Pairing the numbers counts every dot twice — halve it."],
          [k * k, `That's the ${ordinal(k)} square number.`],
        ]),
      };
    }
    if (kind === "fibback") {
      let v: number[] = [];
      for (let i = 0; i < 100; i++) {
        const a = rng.nonZero(-6, 12), b = rng.nonZero(-6, 12);
        v = [a, b, a + b, a + 2 * b, 2 * a + 3 * b];
        if (new Set(v).size === 5 && !v.some((x) => x === 0) && !isArith(v)) break;
      }
      return {
        prompt: `In a Fibonacci-type sequence, each term is the sum of the two terms before it. The 3rd, 4th and 5th terms are ${num(v[2])}, ${num(v[3])} and ${num(v[4])}.\n\nFind the 1st and 2nd terms. Give them in order, separated by a comma.`,
        answer: { type: "list", values: [v[0], v[1]], ordered: true },
        solution: [
          "Work backwards: (2nd term) + (3rd term) = 4th term.",
          `2nd term = ${num(v[3])} − ${br(v[2])} = ${num(v[1])}.`,
          `1st term = 3rd term − 2nd term = ${num(v[2])} − ${br(v[1])} = ${num(v[0])}.`,
        ],
        hint: "Work backwards: if two terms add to make the next one, you can subtract to go back.",
      };
    }
    if (kind === "fibgap") {
      let a = 3, x = 5;
      for (let i = 0; i < 100; i++) {
        a = rng.int(1, 12);
        x = rng.nonZero(-5, 15);
        if (x !== a) break;
      }
      const t4 = a + 2 * x;
      return {
        prompt: `In a Fibonacci-type sequence, each term is the sum of the two terms before it. The 1st term is ${a} and the 4th term is ${num(t4)}:\n\n${a}, □, □, ${num(t4)}\n\nFind the 2nd term.`,
        answer: { type: "number", value: x },
        solution: [
          `Call the 2nd term x. Then the 3rd term is {{${a} + x}} and the 4th term is {{x + (${a} + x) = 2x + ${a}}}.`,
          `So {{2x + ${a} = ${t4}}}, giving {{2x = ${t4 - a}}}.`,
          `x = ${num(t4 - a)} ÷ 2 = ${num(x)}. Check: ${a}, ${num(x)}, ${num(a + x)}, ${num(t4)} ✓`,
        ],
        hint: "Introduce a variable: call the missing 2nd term x and write the 3rd and 4th terms in terms of x.",
        traps: numTraps(x, [
          [t4 - a, "The 4th term is 2x + the 1st term, so divide by 2 at the end."],
          [(t4 - a) / 3, "The 4th term is 2x + the 1st term (not 3x)."],
        ]),
      };
    }
    if (kind === "geogap") {
      const a = rng.int(2, 6) * (rng.bool(0.75) ? 1 : -1);
      const r = rng.pick([2, 3, -2, -3]);
      const v = [a, a * r, a * r * r, a * r ** 3];
      const lin3 = (v[3] - v[0]) / 3;
      return {
        prompt: `Here is a geometric sequence with two terms missing:\n\n${num(v[0])}, □, □, ${num(v[3])}\n\nFind the two missing terms. Give them in order, separated by a comma.`,
        answer: { type: "list", values: [v[1], v[2]], ordered: true },
        solution: [
          `From the 1st to the 4th term you multiply by the ratio r three times, so {{r^3}} = ${num(v[3])} ÷ ${br(v[0])} = ${num(r ** 3)}.`,
          `So r = ${num(r)} (because ${br(r)} × ${br(r)} × ${br(r)} = ${num(r ** 3)}).`,
          `Missing terms: ${num(v[0])} × ${br(r)} = ${num(v[1])} and ${num(v[1])} × ${br(r)} = ${num(v[2])}.`,
        ],
        hint: "How many times do you multiply by the ratio to get from the 1st term to the 4th?",
        traps: Number.isInteger(lin3)
          ? [{ spec: { type: "list", values: [v[0] + lin3, v[0] + 2 * lin3], ordered: true }, feedback: "Those are equal steps (arithmetic). In a geometric sequence you multiply by the same number each time." }]
          : undefined,
      };
    }
    // geok: kth term of a geometric sequence
    let a = 2, r = 2, k = 7;
    for (let i = 0; i < 100; i++) {
      a = rng.int(1, 5);
      r = rng.pick([2, 3]);
      k = rng.int(6, 10);
      if (a * r ** (k - 1) <= 100000) break;
    }
    const v = [0, 1, 2].map((j) => a * r ** j);
    const ans = a * r ** (k - 1);
    return {
      prompt: `The geometric sequence ${seq(v)} keeps multiplying by ${r}.\n\nFind the ${ordinal(k)} term.`,
      answer: { type: "number", value: ans },
      solution: [
        `To get from the 1st term to the ${ordinal(k)} term you multiply by ${r} a total of ${k - 1} times.`,
        `${ordinal(k)} term = ${a === 1 ? "" : `${a} × `}{{${r}^${k - 1}}} = ${a === 1 ? "" : `${a} × ${r ** (k - 1)} = `}${ans}.`,
      ],
      hint: "How many times do you multiply by the ratio to go from the 1st term to this one?",
      traps: numTraps(ans, [
        [a * r ** k, `From the 1st term to the ${ordinal(k)} term is only ${k - 1} multiplications.`],
        [a * r * (k - 1), "Repeated multiplication is a power, not one multiplication."],
      ]),
    };
  },
};

// ---------------------------------------------------------------------------
// 10. Function machines and mappings
// ---------------------------------------------------------------------------
interface Op {
  k: "×" | "÷" | "+" | "−";
  v: number;
}
function applyOp(x: Q, op: Op): Q {
  switch (op.k) {
    case "×": return qMul(x, q(op.v));
    case "÷": return qDiv(x, q(op.v));
    case "+": return qAdd(x, q(op.v));
    case "−": return qAdd(x, q(-op.v));
  }
}
const invOp = (op: Op): Op => ({ k: op.k === "×" ? "÷" : op.k === "÷" ? "×" : op.k === "+" ? "−" : "+", v: op.v });
const runOps = (x: Q, ops: Op[]): Q => ops.reduce(applyOp, x);
const runBack = (y: Q, ops: Op[]): Q => [...ops].reverse().map(invOp).reduce(applyOp, y);
const opStr = (op: Op): string => `${op.k} ${op.v}`;

function buildOps(rng: Rng, pat: string, tier: 1 | 2 | 3): Op[] {
  const m = () => rng.int(2, 9);
  const dv = () => rng.int(2, 5);
  const b = () => rng.int(1, tier === 1 ? 12 : 20);
  switch (pat) {
    case "×+": return [{ k: "×", v: m() }, { k: "+", v: b() }];
    case "×−": return [{ k: "×", v: m() }, { k: "−", v: b() }];
    case "+×": return [{ k: "+", v: b() }, { k: "×", v: m() }];
    case "−×": return [{ k: "−", v: b() }, { k: "×", v: m() }];
    case "÷+": return [{ k: "÷", v: dv() }, { k: "+", v: b() }];
    case "÷−": return [{ k: "÷", v: dv() }, { k: "−", v: b() }];
    case "×+÷": return [{ k: "×", v: m() }, { k: "+", v: b() }, { k: "÷", v: dv() }];
    default: return [{ k: "−", v: b() }, { k: "×", v: m() }, { k: "+", v: b() }];
  }
}

/** Mapping notation x → … for two-step machines (null if not a neat 2-step pattern). */
function mappingOf(ops: Op[]): string | null {
  if (ops.length !== 2) return null;
  const [o1, o2] = ops;
  const sgn = (o: Op) => (o.k === "+" ? o.v : -o.v);
  if (o1.k === "×" && (o2.k === "+" || o2.k === "−")) return lin(o1.v, sgn(o2), "x");
  if ((o1.k === "+" || o1.k === "−") && o2.k === "×") return `${o2.v}(${lin(1, sgn(o1), "x")})`;
  if (o1.k === "÷" && (o2.k === "+" || o2.k === "−")) return `x/${o1.v} ${o2.k === "+" ? "+" : "-"} ${o2.v}`;
  return null;
}

const functionMachines: Drill = {
  id: `${TOPIC}.function-machines`,
  topicId: TOPIC,
  title: "Function machines: find the output or the input",
  level: 2,
  guideRef: "functions",
  generate(rng, tier) {
    const mode: "fwd" | "back" | "fracBack" | "fracFwd" =
      tier === 1 ? (rng.bool(0.6) ? "fwd" : "back") : tier === 2 ? (rng.bool(0.4) ? "fwd" : "back") : rng.pick(["fracBack", "fracBack", "fracFwd", "back", "fwd"] as const);
    const twoStep = ["×+", "×−", "+×", "−×", "÷+", "÷−"];
    const pats = tier === 1 ? ["×+", "×−", "+×", "−×", "÷+"] : tier === 2 ? twoStep : mode === "fracBack" ? ["×+", "×−", "+×", "−×"] : mode === "fracFwd" ? twoStep : ["×+÷", "−×+", ...twoStep];
    let ops: Op[] = [{ k: "×", v: 2 }, { k: "+", v: 1 }];
    let x = q(1), y = q(3);
    for (let i = 0; i < 300; i++) {
      ops = buildOps(rng, rng.pick(pats), tier);
      if (mode === "fracBack") {
        y = q(rng.int(-20, 40));
        x = runBack(y, ops);
        if (x.d === 1 || x.d > 9 || Math.abs(x.n) > 9 * x.d) continue; // a friendly fraction, |x| ≤ 9
        break;
      }
      if (mode === "fracFwd") {
        const qd = rng.pick([2, 3, 4, 5]);
        const pn = rng.nonZero(-9, 12);
        if (gcd(pn, qd) !== 1) continue;
        x = q(pn, qd);
        y = runOps(x, ops);
        if (y.d > 10 || Math.abs(y.n) > 30 * y.d || y.n === 0) continue;
        break;
      }
      const xi = tier === 1 ? rng.int(1, 12) : rng.nonZero(-10, 15);
      x = q(xi);
      const trace = ops.reduce<Q[]>((acc, op) => [...acc, applyOp(acc[acc.length - 1], op)], [x]);
      if (trace.some((v) => v.d !== 1)) continue;
      if (tier === 1 && trace.some((v) => v.n <= 0)) continue;
      y = trace[trace.length - 1];
      if (Math.abs(y.n) > 200 || qEq(x, y)) continue;
      break;
    }
    const backward = mode === "back" || mode === "fracBack";
    const map = tier > 1 && rng.bool(0.35) ? mappingOf(ops) : null;
    const name = rng.pick(NAMES);
    const machine = `Input → ${ops.map((o) => `**${opStr(o)}**`).join(" → ")} → Output`;
    const fracNote = tier === 3 ? " If your answer is not a whole number, give it as a fraction in its simplest form." : "";
    let prompt: string;
    if (map) {
      prompt = backward
        ? `A function is given by the mapping {{x -> ${map}}}.\n\nWhich input maps to ${qShow(y)}?${fracNote}`
        : `A function is given by the mapping {{x -> ${map}}}.\n\nWhat does ${qShow(x)} map to?${fracNote}`;
    } else {
      const intro = rng.pick([`Here is a function machine:\n\n${machine}`, `${name} uses this function machine:\n\n${machine}`]);
      prompt = backward ? `${intro}\n\nThe output is ${qShow(y)}. What was the input?${fracNote}` : `${intro}\n\nThe input is ${qShow(x)}. What is the output?${fracNote}`;
    }
    const steps: string[] = [];
    if (map) steps.push(`The mapping {{x -> ${map}}} is the machine ${machine}.`);
    if (backward) {
      const inv = [...ops].reverse().map(invOp);
      steps.push(`Work backwards from the output, undoing each step in reverse order: ${inv.map((o) => `**${opStr(o)}**`).join(", then ")}.`);
      let cur = y;
      const lines: string[] = [];
      for (const o of inv) {
        const nxt = applyOp(cur, o);
        lines.push(`${qShow(cur)} ${opStr(o)} = ${qShow(nxt)}`);
        cur = nxt;
      }
      steps.push(lines.join("; "));
      steps.push(`So the input was ${qShow(x)}. Check: putting ${qShow(x)} through the machine gives ${qShow(y)} ✓`);
    } else {
      let cur = x;
      const lines: string[] = [];
      for (const o of ops) {
        const nxt = applyOp(cur, o);
        lines.push(`${qShow(cur)} ${opStr(o)} = ${qShow(nxt)}`);
        cur = nxt;
      }
      steps.push(`Do each step in order: ${lines.join("; ")}.`);
      steps.push(`The output is ${qShow(y)}.`);
    }
    const ans = backward ? x : y;
    const trapList: Array<[Q, string]> = backward
      ? [
          [ops.map(invOp).reduce(applyOp, y), "Undo the steps in REVERSE order — the last thing the machine did must be undone first."],
          [runOps(y, ops), "You put the output through the machine forwards. Use the inverse operations to go backwards."],
        ]
      : [[runOps(x, [...ops].reverse()), "Do the operations in the order the machine shows them."]];
    return {
      prompt,
      answer: qSpec(ans, true),
      solution: steps,
      hint: backward ? "Start at the output and use inverse operations, undoing the last step first." : "Put the input through each step in order.",
      traps: qTraps(ans, trapList),
    };
  },
};

// ---------------------------------------------------------------------------
// 11. Function notation f(x) and inverse functions (stretch)
// ---------------------------------------------------------------------------
const functionNotation: Drill = {
  id: `${TOPIC}.function-notation`,
  topicId: TOPIC,
  title: "Function notation f(x) and inverse functions",
  level: 3,
  guideRef: "functions",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    const mode = tier === 1 ? rng.pick(["eval", "solve"]) : tier === 2 ? rng.pick(["eval", "solve", "square"]) : rng.pick(["solve", "square", "inverse", "inverse"]);
    if (mode === "eval") {
      const a = tier === 1 ? rng.int(2, 9) : rng.int(2, 9) * (rng.bool(0.6) ? 1 : -1);
      const b = a < 0 ? rng.int(5, 20) : rng.nonZero(-12, 12);
      const k = tier === 1 ? rng.int(2, 10) : rng.bool(0.6) ? -rng.int(2, 12) : rng.int(2, 12);
      const R = lin(a, b, "x");
      const v = a * k + b;
      const traps: Array<[number, string]> = [[a + k + b, `{{${term(a, "x")}}} means ${num(a)} × x, not ${num(a)} + x.`]];
      if (k < 0) traps.push([-a * k + b, `Keep the negative sign: x = ${num(k)}.`]);
      return {
        prompt: rng.pick([
          `A function is defined by {{f(x) = ${R}}}.\n\nFind {{f(${k})}}.`,
          `{{f(x) = ${R}}}\n\nWork out the value of {{f(${k})}}.`,
          `${name} is using the function {{f(x) = ${R}}}. What is {{f(${k})}}?`,
        ]),
        answer: { type: "number", value: v },
        solution: [`{{f(${k})}} means: replace x with ${num(k)}.`, `{{f(${k})}} = ${subst(a, b, k)} = ${num(v)}`],
        hint: "f(number) means: put that number in place of x.",
        traps: numTraps(v, traps),
      };
    }
    if (mode === "solve") {
      let a = 3, b = 2, N = 20;
      let ans = q(6);
      for (let i = 0; i < 200; i++) {
        a = tier === 1 ? rng.int(2, 9) : rng.int(2, 9) * (rng.bool(0.7) ? 1 : -1);
        b = a < 0 ? rng.int(5, 20) : rng.nonZero(-12, 12);
        if (tier === 3) {
          N = rng.int(-20, 40);
          ans = q(N - b, a);
          if (ans.d === 1) continue;
        } else {
          const x0 = tier === 1 ? rng.int(1, 12) : rng.nonZero(-10, 12);
          N = a * x0 + b;
          ans = q(x0);
        }
        break;
      }
      const R = lin(a, b, "x");
      return {
        prompt: rng.pick([
          `{{f(x) = ${R}}}\n\nFind the value of x for which {{f(x) = ${N}}}.`,
          `For the function {{f(x) = ${R}}}, solve {{f(x) = ${N}}}.`,
          `${name} puts a number x into the function {{f(x) = ${R}}} and gets ${num(N)}. What is x?`,
        ]) + (tier === 3 ? " If x is not a whole number, give it as a fraction in its simplest form." : ""),
        answer: qSpec(ans, true),
        solution: [
          `Set the rule equal to ${num(N)}: {{${R} = ${N}}}.`,
          `{{${term(a, "x")} = ${N - b}}}`,
          `x = ${num(N - b)} ÷ ${br(a)} = ${qShow(ans)}`,
        ],
        hint: `Here ${num(N)} is the OUTPUT. Write an equation and solve it.`,
        traps: qTraps(ans, [
          [q(a * N + b), `That's {{f(${N})}}. Here ${num(N)} is the output — you need the input x.`],
          [q(N + b, a), `Check how you undid the ${b > 0 ? "+" : "−"} ${Math.abs(b)}.`],
        ]),
      };
    }
    if (mode === "square") {
      const flip = tier === 3 && rng.bool(0.4);
      const b = flip ? rng.int(20, 60) : rng.nonZero(-15, 15);
      const k = tier === 2 ? -rng.int(2, 9) : rng.int(2, 9) * (rng.bool(0.7) ? -1 : 1);
      const show = flip ? `${b} - x^2` : poly([[1, "x^2"], [b, ""]]);
      const v = flip ? b - k * k : k * k + b;
      const sq = k < 0 ? `(${k})^2` : `${k}^2`;
      const sqTrap: Array<[number, string]> = flip
        ? [[b + k * k, `{{-x^2}} means −(x × x): subtract ${k * k}.`]]
        : k < 0
          ? [[-k * k + b, `{{${sq} = ${k * k}}}: a negative times a negative is positive.`]]
          : [];
      return {
        prompt: rng.pick([`A function is defined by {{f(x) = ${show}}}.\n\nFind {{f(${k})}}.`, `{{f(x) = ${show}}}\n\nWork out {{f(${k})}}.`]),
        answer: { type: "number", value: v },
        solution: [
          `Replace x with ${num(k)}: {{f(${k}) = ${flip ? `${b} - ${sq}` : `${sq} ${b < 0 ? "-" : "+"} ${Math.abs(b)}`}}}.`,
          `{{${sq} = ${k * k}}}, so {{f(${k})}} = ${flip ? `${b} − ${k * k}` : `${k * k} ${signed(b)}`} = ${num(v)}.`,
        ],
        hint: k < 0 ? "Square the input first (a negative number squared is positive), then do the rest." : "Square the input first, then do the rest.",
        traps: numTraps(v, [...sqTrap, [flip ? b - 2 * k : 2 * k + b, "{{x^2}} means x × x, not 2 × x."]]),
      };
    }
    // inverse
    const form = rng.pick(["ax+b", "(x+b)/a", "a(x+b)"] as const);
    const a = rng.int(2, 6);
    const b = rng.nonZero(-9, 9);
    const inner = poly([[1, "x"], [b, ""]]); // x + b
    let fShow: string, expr: string, steps: string, traps: Trap[];
    const x0 = rng.int(1, 6);
    let y0: Q;
    if (form === "ax+b") {
      fShow = lin(a, b, "x");
      expr = `(${poly([[1, "x"], [-b, ""]])})/${a}`;
      steps = `f does **× ${a}** then **${b > 0 ? "+" : "−"} ${Math.abs(b)}**, so the inverse does **${b > 0 ? "−" : "+"} ${Math.abs(b)}** then **÷ ${a}**.`;
      y0 = q(a * x0 + b);
      traps = [
        { spec: { type: "expression", expr: `(${inner})/${a}` }, feedback: `Undo ${b > 0 ? "+" : "−"} ${Math.abs(b)} with the opposite operation.` },
        { spec: { type: "expression", expr: `x/${a} ${b > 0 ? "-" : "+"} ${Math.abs(b)}` }, feedback: "Undo the steps in REVERSE order: the last step of f is undone first." },
      ];
    } else if (form === "(x+b)/a") {
      fShow = `(${inner})/${a}`;
      expr = lin(a, -b, "x");
      steps = `f does **${b > 0 ? "+" : "−"} ${Math.abs(b)}** then **÷ ${a}**, so the inverse does **× ${a}** then **${b > 0 ? "−" : "+"} ${Math.abs(b)}**.`;
      y0 = q(x0 + b, a);
      traps = [
        { spec: { type: "expression", expr: lin(a, b, "x") }, feedback: `Undo ${b > 0 ? "+" : "−"} ${Math.abs(b)} with the opposite operation.` },
        { spec: { type: "expression", expr: `${a}(${poly([[1, "x"], [-b, ""]])})` }, feedback: "Undo the steps in REVERSE order: f divides last, so the inverse multiplies first." },
      ];
    } else {
      fShow = `${a}(${inner})`;
      expr = `x/${a} ${b > 0 ? "-" : "+"} ${Math.abs(b)}`;
      steps = `f does **${b > 0 ? "+" : "−"} ${Math.abs(b)}** then **× ${a}**, so the inverse does **÷ ${a}** then **${b > 0 ? "−" : "+"} ${Math.abs(b)}**.`;
      y0 = q(a * (x0 + b));
      traps = [
        { spec: { type: "expression", expr: `x/${a} ${b > 0 ? "+" : "-"} ${Math.abs(b)}` }, feedback: `Undo ${b > 0 ? "+" : "−"} ${Math.abs(b)} with the opposite operation.` },
        { spec: { type: "expression", expr: `(${poly([[1, "x"], [-b, ""]])})/${a}` }, feedback: "Undo the steps in REVERSE order: f multiplies last, so the inverse divides first." },
      ];
    }
    return {
      prompt: rng.pick([
        `A function is defined by {{f(x) = ${fShow}}}.\n\nFind the inverse function {{f^(-1)(x)}}. Type just the expression in x.`,
        `{{f(x) = ${fShow}}}\n\nWrite down {{f^(-1)(x)}}, the function that undoes f. Type just the expression in x.`,
      ]),
      answer: { type: "expression", expr },
      solution: [steps, `{{f^(-1)(x) = ${expr}}}`, `Check: {{f(${x0}) = ${y0.d === 1 ? y0.n : `${y0.n}/${y0.d}`}}} and the inverse takes ${qShow(y0)} back to ${x0} ✓`],
      hint: "Write f as a function machine, then reverse it: inverse operations in reverse order.",
      traps,
    };
  },
};

// ---------------------------------------------------------------------------
// 12. Quadratic sequences (stretch)
// ---------------------------------------------------------------------------
/** a·n² + c as ASCII (no space): "2n^2 - 3"; display version keeps a space so 2 n^2 isn't read as (2n)². */
function quadStr(a: number, c: number, display: boolean): string {
  const coef = Math.abs(a) === 1 ? "" : `${Math.abs(a)}${display ? " " : ""}`;
  const sq = `${coef}n^2`;
  if (a < 0 && c > 0) return `${c} - ${sq}`;
  const head = `${a < 0 ? "-" : ""}${sq}`;
  return c === 0 ? head : `${head} ${c < 0 ? "-" : "+"} ${Math.abs(c)}`;
}

const quadraticSequences: Drill = {
  id: `${TOPIC}.quadratic-sequences`,
  topicId: TOPIC,
  title: "Quadratic sequences: second differences and n² rules",
  level: 3,
  guideRef: "quadratic-sequences",
  generate(rng, tier) {
    const name = rng.pick(NAMES);
    const wantRule = tier === 1 ? false : tier === 2 ? rng.bool(0.5) : rng.bool(0.6);
    if (wantRule) {
      const a = tier === 2 ? 1 : rng.pick([2, 3, -1, -2, 1]);
      const c = a < 0 ? rng.int(10, 60) : rng.nonZero(tier === 2 ? -20 : -30, tier === 2 ? 20 : 30);
      const t = [1, 2, 3, 4, 5].map((n) => a * n * n + c);
      const d1 = t.slice(1).map((x, i) => x - t[i]);
      const expr = quadStr(a, c, false);
      const shown = quadStr(a, c, true);
      const base = [1, 2, 3, 4].map((n) => a * n * n);
      const qTrap = (A: number, C: number): Trap => ({ spec: { type: "expression", expr: quadStr(A, C, false), display: `{{${quadStr(A, C, true)}}}` }, feedback: "" });
      const t1 = qTrap(2 * a, t[0] - 2 * a);
      t1.feedback = `The coefficient of {{n^2}} is HALF the second difference: ${num(2 * a)} ÷ 2 = ${num(a)}.`;
      const traps: Trap[] = [t1];
      traps.push({ spec: { type: "expression", expr: lin(d1[0], t[0] - d1[0]) }, feedback: "The first differences change, so the rule can't be linear. Look at the second differences." });
      return {
        prompt: rng.pick([
          `Find the nth term of the quadratic sequence\n\n${seq(t)}`,
          `${name} says this sequence has a rule involving {{n^2}}:\n\n${seq(t)}\n\nFind the nth term.`,
        ]),
        answer: { type: "expression", expr, form: "simplified", display: `{{${shown}}}` },
        solution: [
          `First differences: ${d1.map(num).join(", ")}. Second differences: all ${num(2 * a)}.`,
          `The coefficient of {{n^2}} is half the second difference: ${num(2 * a)} ÷ 2 = ${num(a)}.`,
          `Compare with {{${quadStr(a, 0, true)}}}: ${base.map(num).join(", ")}, … The sequence is always ${Math.abs(c)} ${c > 0 ? "more" : "less"}.`,
          `nth term = {{${shown}}}.`,
        ],
        hint: "Find the second differences. Half of the second difference is the number in front of n².",
        traps,
      };
    }
    // Next term from second differences.
    let a = 1, b = 0, c = 0;
    for (let i = 0; i < 100; i++) {
      a = tier === 1 ? 1 : tier === 2 ? rng.pick([1, 2]) : rng.pick([-1, 2, 3]);
      b = rng.int(tier === 1 ? -2 : -4, tier === 1 ? 3 : 4);
      c = rng.int(-5, tier === 1 ? 6 : 8);
      const t = [1, 2, 3, 4, 5].map((n) => a * n * n + b * n + c);
      if (new Set(t).size === 5) break;
    }
    const t = [1, 2, 3, 4, 5].map((n) => a * n * n + b * n + c);
    const next = 36 * a + 6 * b + c;
    const d1 = t.slice(1).map((x, i) => x - t[i]);
    const nd = d1[3] + 2 * a;
    return {
      prompt: rng.pick([
        `Find the next term of the sequence\n\n${seq(t)}`,
        `${name} writes down a sequence: ${seq(t)}\n\nWhat is the 6th term?`,
      ]),
      answer: { type: "number", value: next },
      solution: [
        `First differences: ${d1.map(num).join(", ")} — not constant.`,
        `Second differences: all ${num(2 * a)}, so the next first difference is ${num(d1[3])} ${signed(2 * a)} = ${num(nd)}.`,
        `Next term: ${num(t[4])} ${signed(nd)} = ${num(next)}.`,
      ],
      hint: "Find the differences, then the differences of the differences.",
      traps: numTraps(next, [[t[4] + d1[3], "The first differences are changing — use the second difference to find the next first difference."]]),
    };
  },
};

export const drills: Drill[] = [
  continueSequence,
  termsFromNthTerm,
  sequenceTypes,
  termToTermRule,
  matchstickPatterns,
  findNthTerm,
  isItATerm,
  specialTerms,
  functionMachines,
  findNthTermFractions,
  functionNotation,
  quadraticSequences,
];
