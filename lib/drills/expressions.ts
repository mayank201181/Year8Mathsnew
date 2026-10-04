// ---------------------------------------------------------------------------
// Skill drills — Expressions & Formulae (Year 8).
// Each drill generates unlimited fresh questions from a seeded RNG.
// ---------------------------------------------------------------------------
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { clean, frac, gcd, num, poly, roundTo, term } from "./helpers.ts";

type Tier = 1 | 2 | 3;
type Terms = Array<[number, string]>;
/** A monomial's letter part: [[letter, power], …]. */
type Fac = Array<[string, number]>;

const TOPIC = "expressions";

// ---------- formatting helpers ----------
/** Wrap in maths markup. */
const M = (s: string): string => `{{${s}}}`;
/** " + 3" / " - 3" for building {{ }} strings. */
const pm = (c: number): string => (c < 0 ? ` - ${clean(-c)}` : ` + ${clean(c)}`);
/** " + 3x" / " - 3x" for building {{ }} strings. */
const pmT = (c: number, v: string): string => (c < 0 ? ` - ${term(-c, v)}` : ` + ${term(c, v)}`);
/** A number inside {{ }}: negatives in brackets. */
const bq = (n: number): string => (n < 0 ? `(-${clean(-n)})` : `${clean(n)}`);
/** A term inside a product: negatives in brackets, e.g. (-5) or (-2x). */
const tb = (c: number, key: string): string => (c < 0 ? `(${term(c, key)})` : term(c, key));
/** Power of a letter as a key: 0 → "", 1 → "x", 2 → "x^2". */
const pw = (v: string, p: number): string => (p === 0 ? "" : p === 1 ? v : `${v}^${p}`);

const ntrap = (value: number, feedback: string): Trap => ({ spec: { type: "number", value }, feedback });
const etrap = (expr: string, feedback: string): Trap => ({ spec: { type: "expression", expr }, feedback });

const PAIRS: Array<[string, string]> = [["a", "b"], ["x", "y"], ["m", "n"], ["p", "q"], ["c", "d"], ["s", "t"]];
const ONE = ["x", "y", "a", "n", "m", "t"];

/** Canonical ASCII monomial: mono(12, [["x", 7]]) → "12x^7"; mono(-1, [["a",1],["b",2]]) → "-ab^2". */
function mono(c: number, f: Fac): string {
  const letters = f.filter(([, p]) => p !== 0).map(([v, p]) => pw(v, p)).join("");
  if (!letters) return String(clean(c));
  if (c === 1) return letters;
  if (c === -1) return "-" + letters;
  return String(clean(c)) + letters;
}

/** Join monomials into an ASCII sum: [[3,[["x",2]]],[-2,[["x",1]]]] → "3x^2 - 2x". */
function sumMono(list: Array<[number, Fac]>): string {
  let out = "";
  for (const [c, f] of list) {
    if (c === 0) continue;
    const body = mono(Math.abs(c), f);
    out += out ? (c < 0 ? ` - ${body}` : ` + ${body}`) : c < 0 ? `-${body}` : body;
  }
  return out || "0";
}

function perms<X>(a: X[]): X[][] {
  if (a.length <= 1) return [a];
  const out: X[][] = [];
  a.forEach((x, i) => {
    for (const p of perms([...a.slice(0, i), ...a.slice(i + 1)])) out.push([x, ...p]);
  });
  return out;
}

/** Every reasonable way to type a single term, for single-term "simplify" answers. */
function monoVariants(c: number, f: Fac): string[] {
  const fs = f.filter(([, p]) => p !== 0);
  const out = new Set<string>([mono(c, f)]);
  if (!fs.length) return [...out];
  const coefs = c === 1 ? ["", "1", "1*"] : c === -1 ? ["-", "-1", "-1*"] : [String(c), String(c) + "*"];
  for (const order of perms(fs)) {
    let partsList: string[][] = [[]];
    for (const [v, p] of order) {
      const forms = p === 1 ? [v, `${v}^1`] : [`${v}^${p}`, `${v}^(${p})`];
      partsList = partsList.flatMap((ps) => forms.map((fm) => [...ps, fm]));
    }
    for (const parts of partsList) {
      for (const j of ["", "*"]) {
        const body = parts.join(j);
        for (const co of coefs) out.add(co + body);
        if (c > 1) out.add(body + "*" + c);
      }
    }
  }
  return [...out];
}

/** Text answer for a single simplified term (so an unsimplified product is not accepted). */
function monoAnswer(c: number, f: Fac): AnswerSpec {
  return { type: "text", accept: monoVariants(c, f), display: M(mono(c, f)) };
}

function words(kind: string): AnswerSpec {
  const art = kind === "formula" ? "a" : "an";
  return { type: "text", accept: [kind, `${art} ${kind}`], display: kind };
}

// ---------- exact fractions (for substitution) ----------
type Q = [number, number];
function q(n: number, d = 1): Q {
  if (d < 0) { n = -n; d = -d; }
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}
const qadd = (a: Q, b: Q): Q => q(a[0] * b[1] + b[0] * a[1], a[1] * b[1]);
const qmul = (a: Q, b: Q): Q => q(a[0] * b[0], a[1] * b[1]);
const qpow = (a: Q, p: number): Q => q(Math.pow(a[0], p), Math.pow(a[1], p));
/** Fraction inside {{ }} (no braces): "3/4", "-3/4", "5". */
const qin = (a: Q): string => (a[1] === 1 ? `${a[0]}` : `${a[0] < 0 ? "-" : ""}${Math.abs(a[0])}/${a[1]}`);

// ===========================================================================
// 1. Vocabulary: terms, coefficients, equations, formulae, identities
// ===========================================================================

function vocabCoef(rng: Rng, tier: Tier): DrillItem {
  type K = "sq" | "lin" | "oth" | "cross" | "con";
  const [v, w] = rng.pick(PAIRS);
  const ask = rng.pick<K | "count">(
    tier === 1 ? ["sq", "lin", "con", "count"] : tier === 2 ? ["sq", "lin", "cross", "con", "count"] : ["sq", "lin", "lin", "cross", "con"],
  );
  const pool: K[] = (["sq", "lin", "oth", "cross", "con"] as K[]).filter((k) => !(ask === "lin" && k === "cross"));
  let kinds: K[];
  if (ask === "count") {
    const n = tier === 1 ? rng.int(2, 4) : rng.int(3, 5);
    kinds = rng.shuffle(pool).slice(0, n);
  } else {
    const n = tier === 1 ? 3 : rng.int(3, 4);
    kinds = rng.shuffle([ask, ...rng.shuffle(pool.filter((k) => k !== ask)).slice(0, n - 1)]);
  }
  const keyOf = (k: K): string => (k === "sq" ? `${v}^2` : k === "lin" ? v : k === "oth" ? w : k === "cross" ? v + w : "");
  const fracLin = tier === 3 && ask === "lin" && rng.bool(0.5);
  const pieces = kinds.map((k) => {
    let c = k === "con" ? (tier === 1 ? rng.int(1, 12) : rng.nonZero(-12, 12)) : tier === 1 ? rng.int(2, 9) : rng.nonZero(-9, 9);
    let fd = 1;
    let body = term(Math.abs(c), keyOf(k));
    if (k === "lin" && fracLin) {
      fd = rng.pick([2, 3, 4, 5]);
      let fn = 1;
      for (let i = 0; i < 20; i++) {
        fn = rng.int(1, fd - 1);
        if (gcd(fn, fd) === 1) break;
      }
      if (gcd(fn, fd) !== 1) fn = 1;
      c = rng.bool() ? fn : -fn;
      body = fn === 1 ? `${v}/${fd}` : `${fn}${v}/${fd}`;
    }
    return { k, c, fd, body };
  });
  const disp = pieces.map((p, i) => (i === 0 ? (p.c < 0 ? "-" : "") + p.body : (p.c < 0 ? " - " : " + ") + p.body)).join("");
  const signedBody = (p: (typeof pieces)[number]) => (p.c < 0 ? "-" : "") + p.body;

  if (ask === "count") {
    const n = pieces.length;
    return {
      prompt: `How many terms are there in the expression ${M(disp)}?`,
      answer: { type: "number", value: n },
      solution: [
        "Terms are the parts separated by + and − signs (each term keeps the sign in front of it).",
        `The terms are ${pieces.map((p) => M(signedBody(p))).join(", ")}.`,
        `So there are ${n} terms.`,
      ],
      hint: "Count the parts separated by + and − signs.",
    };
  }
  const p = pieces.find((x) => x.k === ask)!;
  const traps: Trap[] = [];
  let answer: AnswerSpec;
  let ansText: string;
  if (p.fd > 1) {
    answer = { type: "fraction", n: p.c, d: p.fd, allowDecimal: true };
    ansText = frac(p.c, p.fd);
  } else if (ask === "con") {
    answer = { type: "number", value: p.c };
    ansText = num(p.c);
  } else {
    // A text answer, so typing the whole term (e.g. "-5x") is not accepted as the coefficient −5.
    answer = { type: "text", accept: [String(p.c), p.c < 0 ? `(${p.c})` : `+${p.c}`], display: num(p.c) };
    ansText = num(p.c);
  }
  if (ask === "con") {
    return {
      prompt: rng.pick([`What is the constant term in ${M(disp)}?`, `In the expression ${M(disp)}, what is the constant term?`]),
      answer,
      solution: [`The constant term is the term with no letter: ${M(signedBody(p))}.`, `Include its sign: the constant term is ${ansText}.`],
      hint: "Look for the term with no letter in it — and keep its sign.",
    };
  }
  const key = keyOf(ask);
  const sol = [`The ${M(key)} term is ${M(signedBody(p))}.`];
  if (p.fd > 1) sol.push(`${M(signedBody(p))} means ${ansText} × ${M(key)}, so the coefficient is ${ansText}.`);
  else if (Math.abs(p.c) === 1) sol.push(`${M(signedBody(p))} means ${num(p.c)} × ${M(key)}, so the coefficient is ${num(p.c)}.`);
  else sol.push(`The coefficient is the number multiplying ${M(key)}, with its sign: ${ansText}.`);
  if (p.fd === 1) traps.push(etrap(term(p.c, key), `${M(signedBody(p))} is the whole term. The coefficient is just the number multiplying ${M(key)}: ${ansText}.`));
  if (ask === "sq" && Math.abs(p.c) !== 2) traps.push(ntrap(2, `2 is the power (index) in ${M(key)}. The coefficient is the number multiplying ${M(key)}.`));
  if (p.fd === 1 && Math.abs(p.c) === 1) traps.push(ntrap(0, `No number is written, but ${M(signedBody(p))} means ${num(p.c)} × ${M(key)}.`));
  return {
    prompt: rng.pick([`In the expression ${M(disp)}, what is the coefficient of ${M(key)}?`, `What is the coefficient of ${M(key)} in ${M(disp)}?`]),
    answer,
    solution: sol,
    hint: "The coefficient is the number multiplying the letter part. The sign in front belongs to it.",
    traps,
  };
}

function vocabClassify(rng: Rng, tier: Tier): DrillItem {
  const kind = rng.pick(["expression", "equation", "formula", "identity"] as const);
  const v = rng.pick(["x", "y", "n", "a", "m", "t"]);
  let shown = "";
  let why: string[] = [];
  const traps: Trap[] = [];
  if (kind === "expression") {
    const [a, b] = rng.pick(PAIRS);
    const t: Terms = tier === 1
      ? [[rng.int(2, 9), a], [rng.nonZero(-9, 9), b], [rng.int(-12, 12), ""]]
      : rng.pick([
          [[rng.nonZero(-9, 9), `${a}^2`], [rng.nonZero(-9, 9), a], [rng.int(-12, 12), ""]],
          [[rng.nonZero(-9, 9), a + b], [rng.nonZero(-9, 9), a], [rng.nonZero(-9, 9), b]],
          [[rng.int(2, 9), a], [rng.nonZero(-9, 9), b], [rng.nonZero(-12, 12), ""]],
        ] as Terms[]);
    shown = M(poly(t));
    why = [
      "There is no = sign and no ≡ sign.",
      "It is just terms added and subtracted, so it is an **expression**. You can simplify it or substitute into it, but you cannot solve it.",
    ];
    traps.push({ spec: words("equation"), feedback: "An equation needs an equals sign. This has none, so it is an expression." });
  } else if (kind === "equation") {
    const s = tier === 1 ? rng.int(1, 10) : rng.nonZero(-6, 12);
    const k = rng.int(2, 9);
    const c = tier === 1 ? rng.int(1, 15) : rng.nonZero(-15, 15);
    const form = tier === 1 ? 0 : rng.int(0, tier === 3 ? 3 : 2);
    let eq = `${term(k, v)}${pm(c)} = ${k * s + c}`;
    if (form === 1 && s + c !== 0) eq = `${k}(${v}${pm(c)}) = ${k * (s + c)}`;
    if (form === 2) {
      const j = rng.nonZero(-5, 6);
      eq = `${v}/${k}${pm(c)} = ${j + c}`;
      why = [`It has an equals sign, and it is only true for one value: ${M(`${v} = ${k * j}`)}.`];
    }
    if (form === 3) {
      let m = rng.int(1, 9);
      if (m === k) m = k === 9 ? 1 : k + 1;
      const d = (k - m) * s + c;
      if (d !== 0) eq = `${term(k, v)}${pm(c)} = ${term(m, v)}${pm(d)}`;
    }
    shown = M(eq);
    if (!why.length) why = [`It has an equals sign, and it is only true for one value: ${M(`${v} = ${s}`)}.`];
    why.push("So it is an **equation** — you can solve it to find the unknown.");
    traps.push({ spec: words("formula"), feedback: "A formula links two or more quantities that can each change. Here one unknown has just one value that works, so it is an equation." });
    traps.push({ spec: words("identity"), feedback: "An identity is true for every value of the letter. This one is only true for one value, so it is an equation." });
  } else if (kind === "identity") {
    const f = rng.int(0, tier === 1 ? 2 : 4);
    if (f === 0) {
      const k = rng.int(2, 9);
      const c = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 9);
      shown = M(`${k}(${v}${pm(c)}) ≡ ${term(k, v)}${pm(k * c)}`);
    } else if (f === 1) {
      const p = rng.int(2, 9), qq = rng.int(2, 9);
      shown = M(`${term(p, v)} + ${term(qq, v)} ≡ ${term(p + qq, v)}`);
    } else if (f === 2) {
      const p = rng.int(4, 12), qq = rng.int(1, p - 2);
      shown = M(`${term(p, v)} - ${term(qq, v)} ≡ ${term(p - qq, v)}`);
    } else if (f === 3) {
      const c = rng.nonZero(-6, 6);
      shown = M(`(${v}${pm(c)})^2 ≡ ${v}^2${pmT(2 * c, v)} + ${c * c}`);
    } else {
      const [a, b] = rng.pick(PAIRS);
      const k = rng.int(2, 9);
      shown = M(`${k}${a} × ${b} ≡ ${k}${a}${b}`);
    }
    why = [
      "The ≡ sign means the two sides are equal for **every** value of the letters — try any number and they match.",
      "So it is an **identity**, not an equation (there is nothing to solve).",
    ];
    traps.push({ spec: words("equation"), feedback: "The ≡ sign tells you it is true for every value of the letter. That makes it an identity, not an equation." });
  } else {
    const ctx = rng.int(0, 7);
    const a = rng.int(8, 20), b = rng.int(3, 15), r = rng.int(9, 16);
    shown = [
      `${M(`C = ${a}h + ${b}`)}, where C is the cost in dollars of hiring a kayak at Sentosa for h hours`,
      `${M("P = 2l + 2w")}, where P is the perimeter of a rectangle with length l and width w`,
      `${M("A = 1/2 bh")}, where A is the area of a triangle with base b and height h`,
      `${M("s = d/t")}, where s is the average speed for a journey of distance d that takes time t`,
      `${M(`W = ${r}h`)}, where W is the pay in dollars for h hours of work at a café`,
      `${M(`T = ${a}n + ${b}`)}, where T is the time in minutes to bake n trays of potato curry puffs`,
      `${M("F = 1.8C + 32")}, where F is a temperature in °F and C is the same temperature in °C`,
      `${M("v = u + at")}, where v is the final speed of a cyclist who starts at speed u and speeds up by a every second for t seconds`,
    ][ctx];
    why = [
      "It is a rule linking different quantities — each letter stands for something real that can change.",
      "Put values in for the letters on the right and it tells you the value on the left. So it is a **formula**.",
    ];
    traps.push({ spec: words("equation"), feedback: "It has an equals sign, but it is a rule linking quantities that can each take many values — that makes it a formula." });
  }
  return {
    prompt: `Look at ${shown}.\n\nIs it an **expression**, an **equation**, a **formula** or an **identity**? Type one word.`,
    answer: words(kind),
    solution: why,
    hint: "Is there an = sign or a ≡ sign? If there is an = sign, is it true for one value, or is it a rule linking quantities?",
    traps,
  };
}

function vocabIdentity(rng: Rng, tier: Tier): DrillItem {
  const v = rng.pick(["x", "n", "y"]);
  const kind = tier === 2 ? rng.int(0, 1) : rng.int(0, 3);
  const intro = `This is an identity, so it is true for **every** value of ${v}.`;
  if (kind === 0) {
    const k = rng.int(2, 9), c = rng.nonZero(-9, 9);
    return {
      prompt: `${M(`${k}(${v}${pm(c)}) ≡ ${term(k, v)} + a`)}\n\n${intro} Find the value of a.`,
      answer: { type: "number", value: k * c },
      solution: [
        `Expand the left-hand side: ${M(`${k}(${v}${pm(c)}) = ${term(k, v)}${pm(k * c)}`)}.`,
        `For both sides to match for every ${v}, the constant terms must be equal, so a = ${num(k * c)}.`,
      ],
      hint: "Expand the bracket, then compare the two sides term by term.",
      traps: [ntrap(c, `Multiply **both** terms in the bracket by ${k}: ${M(`${k} × ${bq(c)} = ${k * c}`)}.`)],
    };
  }
  if (kind === 1) {
    const k = rng.int(2, 9), c = rng.nonZero(-9, 9);
    return {
      prompt: `${M(`${k}(${v} + a) ≡ ${term(k, v)}${pm(k * c)}`)}\n\n${intro} Find the value of a.`,
      answer: { type: "number", value: c },
      solution: [
        `Expand the left-hand side: ${M(`${k}(${v} + a) = ${term(k, v)} + ${k}a`)}.`,
        `Match the constant terms: ${M(`${k}a = ${k * c}`)}, so a = ${num(c)}.`,
      ],
      hint: "Expand the left-hand side. Which term must equal the number on the right?",
      traps: [ntrap(k * c, `${num(k * c)} is ${k}a, not a. Divide by ${k}.`)],
    };
  }
  if (kind === 2) {
    for (let i = 0; i < 100; i++) {
      const k = rng.int(2, 6), m = rng.int(2, 6), c = rng.nonZero(-9, 9), d = rng.nonZero(-9, 9);
      const R = k * c + m * d;
      if (R === 0 || R - m * d === c) continue;
      return {
        prompt: `${M(`${k}(${v} + a) + ${m}(${v}${pm(d)}) ≡ ${term(k + m, v)}${pm(R)}`)}\n\n${intro} Find the value of a.`,
        answer: { type: "number", value: c },
        solution: [
          `Expand the left-hand side: ${M(`${term(k, v)} + ${k}a + ${term(m, v)}${pm(m * d)}`)} = ${M(`${term(k + m, v)} + ${k}a${pm(m * d)}`)}.`,
          `Match the constant terms: ${M(`${k}a${pm(m * d)} = ${R}`)}, so ${M(`${k}a = ${R - m * d}`)}.`,
          `So a = ${num(c)}.`,
        ],
        hint: "Expand both brackets, then compare the constant terms on each side.",
        traps: [ntrap(R - m * d, `That is the value of ${k}a. Divide by ${k} to find a.`)],
      };
    }
  }
  const k = rng.pick([2, 3, 4, 5, -2, -3]), p = rng.int(1, 5), c = rng.nonZero(-9, 9);
  return {
    prompt: `${M(`a${v} + b ≡ ${k}(${term(p, v)}${pm(c)})`)}\n\n${intro} Find a and b. Give a first, then b, separated by a comma.`,
    answer: { type: "list", values: [k * p, k * c], ordered: true, display: `a = ${num(k * p)}, b = ${num(k * c)}` },
    solution: [
      `Expand the right-hand side: ${M(`${k}(${term(p, v)}${pm(c)}) = ${term(k * p, v)}${pm(k * c)}`)}.`,
      `Match the ${v} terms: a = ${num(k * p)}. Match the constants: b = ${num(k * c)}.`,
    ],
    hint: "Expand the bracket, then match the coefficients of each kind of term.",
    traps: [{ spec: { type: "list", values: [p, c], ordered: true }, feedback: `Multiply both terms in the bracket by ${num(k)} before matching.` }],
  };
}

// ===========================================================================
// 4. Substitution helpers
// ===========================================================================

/** Single-letter polynomial: [[coef, power], …]. */
type Poly1 = Array<[number, number]>;
const polyStr = (t: Poly1, v: string): string => poly(t.map(([c, p]) => [c, pw(v, p)]));

/** The substituted calculation inside {{ }}, e.g. "2 × (-3)^2 - 5 × (-3) + 4". */
function subStr(t: Poly1, xs: string): string {
  return t
    .map(([c, p], i) => {
      const a = Math.abs(c);
      const base = p === 0 ? "" : p === 1 ? xs : `${xs}^${p}`;
      const body = p === 0 ? `${a}` : a === 1 ? base : `${a} × ${base}`;
      return i === 0 ? (c < 0 ? "-" : "") + body : (c < 0 ? " - " : " + ") + body;
    })
    .join("");
}

/** Values of each term joined: [18, -15, 4] → "18 - 15 + 4" (inside {{ }}). */
const joinVals = (vals: Q[]): string =>
  vals.map((x, i) => (i === 0 ? qin(x) : x[0] < 0 ? ` - ${qin([-x[0], x[1]])}` : ` + ${qin(x)}`)).join("");

function evalPoly(t: Poly1, x: Q): Q[] {
  return t.map(([c, p]) => qmul(q(c), qpow(x, p)));
}
const qsum = (vals: Q[]): Q => vals.reduce((s, x) => qadd(s, x), q(0));

// ===========================================================================
// Drills
// ===========================================================================

export const drills: Drill[] = [
  // -------------------------------------------------------------------------
  {
    id: "expressions.vocabulary",
    topicId: TOPIC,
    title: "Terms, coefficients, equations and identities",
    level: 1,
    guideRef: "language-of-algebra",
    generate(rng, tier) {
      const r = rng.next();
      if (tier === 1) return r < 0.5 ? vocabCoef(rng, tier) : vocabClassify(rng, tier);
      if (r < 0.35) return vocabCoef(rng, tier);
      if (r < 0.7) return vocabClassify(rng, tier);
      return vocabIdentity(rng, tier);
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.collect-like-terms",
    topicId: TOPIC,
    title: "Simplify by collecting like terms",
    level: 1,
    guideRef: "simplifying",
    generate(rng, tier) {
      let kinds: string[] = [];
      let pieces: Terms = [];
      let tot = new Map<string, number>();
      for (let i = 0; i < 200; i++) {
        const [v, w] = rng.pick(PAIRS);
        if (tier === 1) kinds = rng.bool() ? [v, w] : [v, ""];
        else if (tier === 2) kinds = rng.pick([[v, w], [v, ""], [w, ""], [v, w, ""]]);
        else kinds = rng.pick([[`${v}^2`, v], [`${v}^2`, v, ""], [`${v}^3`, `${v}^2`], [v + w, v, w], [`${v}^2`, v + w, ""]]);
        pieces = [];
        kinds.forEach((k, idx) => {
          const cnt = kinds.length === 3 && idx === 2 && rng.bool(0.4) ? 1 : 2;
          if (tier === 1) {
            const c1 = k === "" ? rng.int(2, 12) : rng.int(2, 9);
            pieces.push([c1, k]);
            if (cnt === 2) pieces.push([rng.bool(0.7) ? rng.int(1, 9) : -rng.int(1, c1 - 1), k]);
          } else {
            for (let j = 0; j < cnt; j++) pieces.push([k === "" ? rng.nonZero(-12, 12) : rng.nonZero(-9, 9), k]);
          }
        });
        tot = new Map(kinds.map((k) => [k, 0]));
        for (const [c, k] of pieces) tot.set(k, tot.get(k)! + c);
        if (kinds.some((k) => tot.get(k) === 0)) continue;
        pieces = rng.shuffle(pieces);
        if (tier === 1 && pieces[0][0] < 0) continue;
        // like terms must not all sit next to each other already
        const adjacent = pieces.every((p, j) => j === 0 || p[1] === pieces[j - 1][1] || pieces.slice(0, j).every((x) => x[1] !== p[1]));
        if (adjacent && rng.bool(0.7)) continue;
        break;
      }
      const ans = poly(kinds.map((k) => [tot.get(k)!, k] as [number, string]));
      const disp = poly(pieces);
      const groups = kinds
        .map((k) => pieces.filter((p) => p[1] === k))
        .filter((g) => g.length > 1)
        .map((g) => M(`${poly(g)} = ${poly([[tot.get(g[0][1])!, g[0][1]]])}`));
      const traps: Trap[] = [];
      const ni = pieces.findIndex((p, j) => j > 0 && p[0] < 0);
      if (ni > 0) {
        const t2 = new Map(tot);
        t2.set(pieces[ni][1], t2.get(pieces[ni][1])! - 2 * pieces[ni][0]);
        traps.push(etrap(poly(kinds.map((k) => [t2.get(k)!, k] as [number, string])), `Watch the signs: the − in front of ${M(term(-pieces[ni][0], pieces[ni][1]))} belongs to that term, so it is subtracted.`));
      }
      return {
        prompt: rng.pick([`Simplify ${M(disp)}.`, `Simplify ${M(disp)} by collecting like terms.`, `Collect like terms to simplify ${M(disp)}.`]),
        answer: { type: "expression", expr: ans, form: "simplified" },
        solution: [
          "Like terms have exactly the same letters and powers. Collect each set, keeping the sign in front of each term.",
          groups.join(" and "),
          `So ${M(disp)} simplifies to ${M(ans)}.`,
        ],
        hint: "Underline each set of like terms together with the sign in front of it, then add their coefficients.",
        traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.multiply-divide-terms",
    topicId: TOPIC,
    title: "Multiply and divide terms (index laws)",
    level: 2,
    guideRef: "simplifying",
    generate(rng, tier) {
      const kinds = tier === 1 ? ["ab", "xx", "powmul", "powdiv"] : tier === 2 ? ["coefmul", "coefdiv", "twovar", "ab", "powdiv"] : ["power", "mixed", "twodiv", "coefmul", "twovar"];
      const kind = rng.pick(kinds);
      const v = rng.pick(ONE);
      const [a, b] = rng.pick(PAIRS);
      const verb = rng.pick(["Simplify", "Simplify", "Write as a single term:"]);
      const hint = "Deal with the numbers first, then use the index laws on each letter: add indices when multiplying, subtract when dividing.";
      const traps: Trap[] = [];
      if (kind === "ab") {
        const p = rng.int(2, 9);
        let qq = tier === 1 ? rng.int(2, 9) : rng.nonZero(-9, 9);
        if (Math.abs(qq) < 2) qq = -3;
        const f: Fac = [[a, 1], [b, 1]];
        if (p + qq !== p * qq && p + qq !== 0) traps.push(etrap(mono(p + qq, f), `You added ${p} and ${num(qq)}. When terms are multiplied, multiply the numbers.`));
        return {
          prompt: `${verb} ${M(`${p}${a} × ${qq < 0 ? `(${qq}${b})` : `${qq}${b}`}`)}.`,
          answer: monoAnswer(p * qq, f),
          solution: [`Multiply the numbers: ${M(`${p} × ${bq(qq)} = ${p * qq}`)}.`, `Multiply the letters: ${M(`${a} × ${b} = ${a}${b}`)}.`, `So the answer is ${M(mono(p * qq, f))}.`],
          hint,
          traps,
        };
      }
      if (kind === "xx") {
        const p = rng.int(1, 9), qq = rng.int(2, 9);
        traps.push(etrap(mono(p * qq, [[v, 1]]), `${M(`${v} × ${v} = ${v}^2`)}, not ${M(v)}.`));
        if (p + qq !== p * qq) traps.push(etrap(mono(p + qq, [[v, 2]]), `Multiply the numbers, don't add them: ${M(`${p} × ${qq} = ${p * qq}`)}.`));
        return {
          prompt: `${verb} ${M(`${term(p, v)} × ${term(qq, v)}`)}.`,
          answer: monoAnswer(p * qq, [[v, 2]]),
          solution: [`Multiply the numbers: ${M(`${p} × ${qq} = ${p * qq}`)}.`, `Multiply the letters: ${M(`${v} × ${v} = ${v}^2`)}.`, `So the answer is ${M(mono(p * qq, [[v, 2]]))}.`],
          hint,
          traps,
        };
      }
      if (kind === "powmul") {
        const m = rng.int(2, 7), n = rng.bool(0.2) ? 1 : rng.int(2, 7);
        if (m * n !== m + n) traps.push(etrap(mono(1, [[v, m * n]]), `When you multiply powers of the same letter, **add** the indices (${m} + ${n}), don't multiply them.`));
        return {
          prompt: `${verb} ${M(`${pw(v, m)} × ${pw(v, n)}`)}.`,
          answer: monoAnswer(1, [[v, m + n]]),
          solution: [
            n === 1 ? `Remember ${M(`${v} = ${v}^1`)}. Multiplying powers of the same letter: add the indices.` : "Multiplying powers of the same letter: add the indices.",
            `${M(`${pw(v, m)} × ${pw(v, n)} = ${v}^(${m} + ${n}) = ${pw(v, m + n)}`)}`,
          ],
          hint,
          traps,
        };
      }
      if (kind === "powdiv") {
        const m = rng.int(5, 12), n = rng.int(2, m - 1);
        if (m % n === 0 && m / n !== m - n) traps.push(etrap(mono(1, [[v, m / n]]), `When you divide powers of the same letter, **subtract** the indices (${m} − ${n}), don't divide them.`));
        const shown = rng.bool() ? `${pw(v, m)} ÷ ${pw(v, n)}` : `${pw(v, m)}/${pw(v, n)}`;
        return {
          prompt: `${verb} ${M(shown)}.`,
          answer: monoAnswer(1, [[v, m - n]]),
          solution: ["Dividing powers of the same letter: subtract the indices.", `${M(`${pw(v, m)} ÷ ${pw(v, n)} = ${v}^(${m} - ${n}) = ${pw(v, m - n)}`)}`],
          hint,
          traps,
        };
      }
      if (kind === "coefmul") {
        const p = rng.int(2, 9);
        let qq = rng.nonZero(-9, 9);
        if (Math.abs(qq) < 2) qq = 4;
        const m = rng.int(1, 6), n = rng.int(2, 6);
        if (m * n !== m + n) traps.push(etrap(mono(p * qq, [[v, m * n]]), `Add the indices when multiplying: ${M(`${pw(v, m)} × ${v}^${n} = ${v}^(${m} + ${n})`)}.`));
        if (p + qq !== p * qq && p + qq !== 0) traps.push(etrap(mono(p + qq, [[v, m + n]]), "Multiply the numbers, don't add them."));
        const second = mono(qq, [[v, n]]);
        return {
          prompt: `${verb} ${M(`${mono(p, [[v, m]])} × ${qq < 0 ? `(${second})` : second}`)}.`,
          answer: monoAnswer(p * qq, [[v, m + n]]),
          solution: [
            `Multiply the numbers: ${M(`${p} × ${bq(qq)} = ${p * qq}`)}.`,
            `Add the indices: ${M(`${pw(v, m)} × ${v}^${n} = ${v}^(${m} + ${n}) = ${pw(v, m + n)}`)}.`,
            `So the answer is ${M(mono(p * qq, [[v, m + n]]))}.`,
          ],
          hint,
          traps,
        };
      }
      if (kind === "coefdiv") {
        const p = rng.bool(0.3) ? -rng.int(2, 9) : rng.int(2, 9);
        const qq = rng.int(2, 6), m = rng.int(4, 10), n = rng.int(1, m - 1);
        const top = mono(p * qq, [[v, m]]), bot = mono(qq, [[v, n]]);
        if (n > 1 && m % n === 0 && m / n !== m - n) traps.push(etrap(mono(p, [[v, m / n]]), `Subtract the indices when dividing: ${m} − ${n}, not ${m} ÷ ${n}.`));
        return {
          prompt: `${verb} ${M(rng.bool() ? `${top} ÷ ${bot}` : `${top}/(${bot})`)}.`,
          answer: monoAnswer(p, [[v, m - n]]),
          solution: [
            `Divide the numbers: ${M(`${bq(p * qq)} ÷ ${qq} = ${p}`)}.`,
            `Subtract the indices: ${M(`${pw(v, m)} ÷ ${pw(v, n)} = ${v}^(${m} - ${n}) = ${pw(v, m - n)}`)}.`,
            `So the answer is ${M(mono(p, [[v, m - n]]))}.`,
          ],
          hint,
          traps,
        };
      }
      if (kind === "twovar") {
        const p = rng.int(2, 6);
        const qq = tier === 3 ? rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]) : rng.int(2, 6);
        let e = [1, 1, 1, 1];
        for (let i = 0; i < 50; i++) {
          e = [rng.int(1, 4), rng.int(1, 4), rng.int(1, 4), rng.int(1, 4)];
          if (e.some((x) => x > 1)) break;
        }
        const f1: Fac = [[a, e[0]], [b, e[1]]], f2: Fac = [[a, e[2]], [b, e[3]]];
        const ans: Fac = [[a, e[0] + e[2]], [b, e[1] + e[3]]];
        if (e[0] * e[2] !== e[0] + e[2] || e[1] * e[3] !== e[1] + e[3]) {
          traps.push(etrap(mono(p * qq, [[a, e[0] * e[2]], [b, e[1] * e[3]]]), "When multiplying, **add** the indices of each letter — don't multiply them."));
        }
        const second = mono(qq, f2);
        return {
          prompt: `${verb} ${M(`${mono(p, f1)} × ${qq < 0 ? `(${second})` : second}`)}.`,
          answer: monoAnswer(p * qq, ans),
          solution: [
            `Multiply the numbers: ${M(`${p} × ${bq(qq)} = ${p * qq}`)}.`,
            `Add the indices for each letter: ${a}: ${e[0]} + ${e[2]} = ${e[0] + e[2]}, and ${b}: ${e[1]} + ${e[3]} = ${e[1] + e[3]}.`,
            `So the answer is ${M(mono(p * qq, ans))}.`,
          ],
          hint,
          traps,
        };
      }
      if (kind === "power") {
        const p = rng.pick([2, 3, 4, -2, -3]), m = rng.int(2, 5);
        const k = Math.abs(p) === 4 ? 2 : rng.int(2, 3);
        const pk = Math.pow(p, k);
        traps.push(etrap(mono(p, [[v, m * k]]), `The number is inside the bracket too, so raise it to the power ${k}: ${M(`${bq(p)}^${k} = ${pk}`)}.`));
        if (m + k !== m * k) traps.push(etrap(mono(pk, [[v, m + k]]), `${M(`(${v}^${m})^${k}`)} means ${k} lots of ${M(`${v}^${m}`)} multiplied together, so multiply the indices: ${m} × ${k}.`));
        if (p * k !== pk) traps.push(etrap(mono(p * k, [[v, m * k]]), `${M(`${bq(p)}^${k}`)} means ${num(p)} multiplied by itself ${k} times, not ${num(p)} × ${k}.`));
        return {
          prompt: `${verb} ${M(`(${mono(p, [[v, m]])})^${k}`)}.`,
          answer: monoAnswer(pk, [[v, m * k]]),
          solution: [
            `Everything inside the bracket is raised to the power ${k}.`,
            `The number: ${M(`${bq(p)}^${k} = ${pk}`)}. The letter: ${M(`(${v}^${m})^${k} = ${v}^(${m} × ${k}) = ${v}^${m * k}`)}.`,
            `So the answer is ${M(mono(pk, [[v, m * k]]))}.`,
          ],
          hint: "Raise the number AND the letter part to the power. For a power of a power, multiply the indices.",
          traps,
        };
      }
      if (kind === "mixed") {
        let p = 2, qq = 3, r = 2, a1 = 3, a2 = 2, c = 1;
        for (let i = 0; i < 100; i++) {
          p = rng.int(2, 6); qq = rng.int(2, 6); a1 = rng.int(2, 6); a2 = rng.int(1, 5);
          const divs = [];
          for (let d = 2; d <= p * qq; d++) if ((p * qq) % d === 0 && d !== p && d !== qq) divs.push(d);
          if (!divs.length) continue;
          r = rng.pick(divs);
          c = rng.int(1, a1 + a2 - 1);
          break;
        }
        const co = (p * qq) / r, e = a1 + a2 - c;
        if (a1 * a2 - c > 0 && a1 * a2 - c !== e) traps.push(etrap(mono(co, [[v, a1 * a2 - c]]), `In the top line, multiply ${M(`${pw(v, a1)} × ${pw(v, a2)}`)} by **adding** the indices.`));
        return {
          prompt: `${verb} ${M(`(${mono(p, [[v, a1]])} × ${mono(qq, [[v, a2]])})/(${mono(r, [[v, c]])})`)}.`,
          answer: monoAnswer(co, [[v, e]]),
          solution: [
            `Top: ${M(`${mono(p, [[v, a1]])} × ${mono(qq, [[v, a2]])} = ${mono(p * qq, [[v, a1 + a2]])}`)}.`,
            `Divide: ${M(`${p * qq} ÷ ${r} = ${co}`)} and ${M(`${pw(v, a1 + a2)} ÷ ${pw(v, c)} = ${v}^(${a1 + a2} - ${c}) = ${pw(v, e)}`)}.`,
            `So the answer is ${M(mono(co, [[v, e]]))}.`,
          ],
          hint: "Simplify the top first (multiply), then divide by the bottom.",
          traps,
        };
      }
      // twodiv
      const p = rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]), qq = rng.int(2, 5);
      const e1 = rng.int(3, 7), e3 = rng.int(1, e1 - 1), e2 = rng.int(2, 6), e4 = rng.int(1, e2 - 1);
      const top = mono(p * qq, [[a, e1], [b, e2]]), bot = mono(qq, [[a, e3], [b, e4]]);
      const ans: Fac = [[a, e1 - e3], [b, e2 - e4]];
      traps.push(etrap(mono(p, [[a, e1 + e3], [b, e2 + e4]]), "When dividing, **subtract** the indices — you added them."));
      return {
        // Bracket the two-letter numerator so the fraction line sits under all of it.
        prompt: `${verb} ${M(rng.bool() ? `${top} ÷ ${bot}` : `(${top})/(${bot})`)}.`,
        answer: monoAnswer(p, ans),
        solution: [
          `Divide the numbers: ${M(`${bq(p * qq)} ÷ ${qq} = ${p}`)}.`,
          `Subtract the indices for each letter: ${a}: ${e1} − ${e3} = ${e1 - e3}, and ${b}: ${e2} − ${e4} = ${e2 - e4}.`,
          `So the answer is ${M(mono(p, ans))}.`,
        ],
        hint,
        traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.substitute",
    topicId: TOPIC,
    title: "Substitute numbers (including negatives) into expressions",
    level: 1,
    guideRef: "substitution",
    generate(rng, tier) {
      const v = rng.pick(ONE);
      const [a, b] = rng.pick(PAIRS);
      const ask = (expr: string, vals: string) => rng.pick([`Find the value of ${M(expr)} when ${vals}.`, `Work out ${M(expr)} when ${vals}.`, `Evaluate ${M(expr)} when ${vals}.`]);
      if (tier === 1) {
        const kind = rng.int(0, 5);
        if (kind <= 1) {
          // one-letter polynomial with positive values
          const x = rng.int(2, 9);
          const t: Poly1 = kind === 0 ? [[rng.int(2, 9), 1], [-rng.int(1, 9), 0]] : [[1, 2], [rng.int(1, 20), 0]];
          if (kind === 0 && t[0][0] * x + t[1][0] <= 0) t[1][0] = -1;
          const vals = evalPoly(t, q(x));
          const ans = qsum(vals)[0];
          const traps: Trap[] = [];
          if (kind === 1 && x !== 2) traps.push(ntrap(2 * x + t[1][0], `${M(`${v}^2`)} means ${M(`${v} × ${v}`)}, not ${M(`2 × ${v}`)}.`));
          return {
            prompt: ask(polyStr(t, v), `${v} = ${x}`),
            answer: { type: "number", value: ans },
            solution: [`Replace ${v} with ${x}: ${M(subStr(t, `${x}`))}`, `${M(`= ${joinVals(vals)}`)}`, `${M(`= ${ans}`)}`],
            hint: `Write the expression again with ${x} in place of ${v}. Powers first, then multiply, then add or subtract.`,
            traps,
          };
        }
        const A = rng.int(2, 10), B = rng.int(2, 10);
        if (kind === 2) {
          const p = rng.int(2, 9), qq = rng.int(2, 9);
          return {
            prompt: ask(`${p}${a} + ${qq}${b}`, `${a} = ${A} and ${b} = ${B}`),
            answer: { type: "number", value: p * A + qq * B },
            solution: [`${M(`${p} × ${A} + ${qq} × ${B}`)}`, `${M(`= ${p * A} + ${qq * B} = ${p * A + qq * B}`)}`],
            hint: `${M(`${p}${a}`)} means ${M(`${p} × ${a}`)}.`,
            traps: Number(`${p}${A}`) + Number(`${qq}${B}`) !== p * A + qq * B ? [ntrap(Number(`${p}${A}`) + Number(`${qq}${B}`), `${M(`${p}${a}`)} means ${p} × ${a}, not the digits ${p} and ${A} side by side.`)] : [],
          };
        }
        if (kind === 3) {
          const p = rng.int(2, 9);
          const traps: Trap[] = [];
          if (p * A + B !== p * (A + B)) traps.push(ntrap(p * A + B, `The bracket means ${p} multiplies the whole of ${M(`${a} + ${b}`)}. Add first: ${A} + ${B} = ${A + B}.`));
          return {
            prompt: ask(`${p}(${a} + ${b})`, `${a} = ${A} and ${b} = ${B}`),
            answer: { type: "number", value: p * (A + B) },
            solution: [`${M(`${p}(${A} + ${B})`)}`, `Brackets first: ${M(`${A} + ${B} = ${A + B}`)}`, `${M(`${p} × ${A + B} = ${p * (A + B)}`)}`],
            hint: "Work out the bracket first.",
            traps,
          };
        }
        if (kind === 4) {
          const C = rng.int(1, A * B - 1);
          return {
            prompt: ask(`${a}${b} - ${a === "c" ? "e" : "c"}`, `${a} = ${A}, ${b} = ${B} and ${a === "c" ? "e" : "c"} = ${C}`),
            answer: { type: "number", value: A * B - C },
            solution: [`${M(`${a}${b}`)} means ${M(`${a} × ${b}`)}: ${M(`${A} × ${B} = ${A * B}`)}.`, `${M(`${A * B} - ${C} = ${A * B - C}`)}`],
            hint: `${M(`${a}${b}`)} means ${M(`${a} × ${b}`)}.`,
          };
        }
        const C = rng.int(2, 6), k = rng.int(2, 8), A2 = rng.int(1, C * k - 1), B2 = C * k - A2;
        const cL = a === "c" ? "e" : "c";
        return {
          prompt: ask(`(${a} + ${b})/${cL}`, `${a} = ${A2}, ${b} = ${B2} and ${cL} = ${C}`),
          answer: { type: "number", value: k },
          solution: [`${M(`(${A2} + ${B2})/${C}`)}`, `The top first: ${M(`${A2} + ${B2} = ${C * k}`)}`, `${M(`${C * k} ÷ ${C} = ${k}`)}`],
          hint: "The fraction line works like a bracket — add the top first, then divide.",
        };
      }
      // ---- tiers 2 and 3 ----
      const kind = tier === 2 ? rng.int(0, 5) : rng.int(0, 6);
      if (kind <= 1 || (tier === 3 && kind === 6)) {
        // one-letter polynomial
        let t: Poly1;
        let x: Q;
        let xs: string;
        let xText: string;
        let decimal = false;
        const style = tier === 2 ? 0 : rng.int(0, 2);
        if (style === 0) {
          const xi = rng.bool(0.85) ? -rng.int(1, tier === 2 ? 6 : 9) : rng.int(2, 6);
          x = q(xi);
          xs = bq(xi);
          xText = num(xi);
          t = rng.pick([
            [[rng.int(1, 3), 2], [rng.nonZero(-7, 7), 1], [rng.int(-9, 9), 0]],
            [[rng.int(-12, 20) || 5, 0], [-1, 2]],
            [[-1, 2], [rng.nonZero(-7, 7), 1]],
            [[1, 3], [rng.nonZero(-6, 6), 1]],
            [[rng.int(2, 3), 3], [-1, 2]],
          ] as Poly1[]).filter(([c]) => c !== 0);
          if (t.some(([, p]) => p === 3) && Math.abs(xi) > 4) {
            x = q(-rng.int(1, 3));
            xs = bq(x[0]);
            xText = num(x[0]);
          }
        } else if (style === 1) {
          const d = rng.pick([2, 3, 4, 5]);
          let n = 1;
          for (let i = 0; i < 20; i++) {
            n = rng.int(1, d - 1);
            if (gcd(n, d) === 1) break;
          }
          if (gcd(n, d) !== 1) n = 1;
          x = q(rng.bool() ? -n : n, d);
          xs = `(${qin(x)})`;
          xText = frac(x[0], x[1]);
          t = rng.pick([
            [[rng.int(2, 9) * (rng.bool(0.5) ? d : 1), 2], [rng.int(-9, 9), 0]],
            [[d * rng.int(1, 4), 1], [rng.nonZero(-9, 9), 0]],
            [[d * d, 2], [d * rng.nonZero(-4, 4), 1]],
          ] as Poly1[]).filter(([c]) => c !== 0);
        } else {
          decimal = true;
          const k = rng.pick([5, 15, 25, 2, 4, 12, 35]) * (rng.bool(0.6) ? -1 : 1);
          x = q(k, 10);
          xs = bq(clean(k / 10));
          xText = num(clean(k / 10));
          t = rng.pick([
            [[rng.int(1, 4), 2], [rng.nonZero(-6, 6), 1]],
            [[rng.int(-10, 20) || 4, 0], [-rng.int(1, 4), 2]],
            [[rng.nonZero(-9, 9), 1], [rng.int(-9, 9), 0]],
          ] as Poly1[]).filter(([c]) => c !== 0);
        }
        const vals = evalPoly(t, x);
        const ans = qsum(vals);
        const traps: Trap[] = [];
        const toSpec = (r: Q): AnswerSpec => (r[1] === 1 ? { type: "number", value: r[0] } : decimal ? { type: "number", value: clean(r[0] / r[1]) } : { type: "fraction", n: r[0], d: r[1] });
        if (x[0] < 0 && t.some(([, p]) => p === 2)) {
          const wrong = qsum(t.map(([c, p]) => qmul(q(c), p === 2 ? qmul(q(-1), qpow(x, 2)) : qpow(x, p))));
          traps.push({ spec: toSpec(wrong), feedback: `Square the whole negative number: ${M(`${xs}^2 = ${qin(qpow(x, 2))}`)} — a negative times a negative is positive. Then use the sign in front of the term.` });
        }
        if (x[0] < 0 && t.some(([, p]) => p === 3)) {
          const wrong = qsum(t.map(([c, p]) => qmul(q(c), p === 3 ? qmul(q(-1), qpow(x, 3)) : qpow(x, p))));
          traps.push({ spec: toSpec(wrong), feedback: `${M(`${xs}^3 = ${qin(qpow(x, 3))}`)} — three negatives multiplied together give a negative.` });
        }
        const sq = t.find(([c, p]) => p === 2 && Math.abs(c) >= 2);
        if (sq && x[1] === 1) {
          const wrong = qsum(t.map(([c, p]) => (p === 2 ? qpow(qmul(q(c), x), 2) : qmul(q(c), qpow(x, p)))));
          traps.push({ spec: toSpec(wrong), feedback: `Only ${v} is squared in ${M(`${sq[0]}${v}^2`)}: square first, then multiply by ${Math.abs(sq[0])}.` });
        }
        const isWhole = ans[1] === 1;
        const formNote = isWhole || decimal ? "" : " Give your answer as a fraction in its simplest form.";
        const answer: AnswerSpec = isWhole ? { type: "number", value: ans[0] } : decimal ? { type: "number", value: clean(ans[0] / ans[1]) } : { type: "fraction", n: ans[0], d: ans[1], simplest: true };
        const shown = decimal ? vals.map((r) => clean(r[0] / r[1])) : null;
        const valsLine = shown
          ? shown.map((x2, i) => (i === 0 ? num(x2).replace("−", "-") : x2 < 0 ? ` - ${clean(-x2)}` : ` + ${clean(x2)}`)).join("")
          : joinVals(vals);
        const ansText = isWhole ? `${ans[0]}` : decimal ? `${clean(ans[0] / ans[1])}` : qin(ans);
        return {
          prompt: ask(polyStr(t, v), `${v} = ${xText}`) + formNote,
          answer,
          solution: [
            `Replace ${v} with ${xText}: ${M(subStr(t, xs))}`,
            `Powers first, then multiply: ${M(`= ${valsLine}`)}`,
            `${M(`= ${ansText}`)}`,
          ],
          hint: `Put ${xText} in brackets wherever you see ${v}. Work out powers first.`,
          traps,
        };
      }
      if (kind === 2) {
        // p·a − q·b with negatives
        let A = 0, B = 0;
        for (let i = 0; i < 50; i++) {
          A = rng.nonZero(-9, 9); B = rng.nonZero(-9, 9);
          if (A < 0 || B < 0) break;
        }
        const p = rng.int(2, 9), qq = rng.int(2, 9), minus = rng.bool(0.6);
        const ans = minus ? p * A - qq * B : p * A + qq * B;
        const traps: Trap[] = [];
        if (minus && B < 0) traps.push(ntrap(p * A + qq * B, `${M(`-${qq} × (${B})`)} is positive: subtracting a negative is the same as adding.`));
        return {
          prompt: ask(`${p}${a} ${minus ? "-" : "+"} ${qq}${b}`, `${a} = ${num(A)} and ${b} = ${num(B)}`),
          answer: { type: "number", value: ans },
          solution: [`${M(`${p} × ${bq(A)} ${minus ? "-" : "+"} ${qq} × ${bq(B)}`)}`, `${M(`= ${p * A}${pm(minus ? -qq * B : qq * B)}`)}`, `${M(`= ${ans}`)}`],
          hint: "Put each negative number in brackets, then multiply before you add or subtract.",
          traps,
        };
      }
      if (kind === 3) {
        // (a + b)^2 vs a^2 + b^2
        let A = 0, B = 0;
        for (let i = 0; i < 50; i++) {
          A = rng.nonZero(-6, 6); B = rng.nonZero(-6, 6);
          if (A + B !== 0 && (A < 0 || B < 0)) break;
        }
        if (A + B === 0) B = A < 0 ? 2 : -2;
        const ans = (A + B) * (A + B);
        return {
          prompt: ask(`(${a} + ${b})^2`, `${a} = ${num(A)} and ${b} = ${num(B)}`),
          answer: { type: "number", value: ans },
          solution: [`${M(`(${bq(A)} + ${bq(B)})^2`)}`, `Bracket first: ${M(`${bq(A)} + ${bq(B)} = ${A + B}`)}`, `${M(`${bq(A + B)}^2 = ${ans}`)}`],
          hint: "Work out the bracket first, then square the result.",
          traps: [ntrap(A * A + B * B, `${M(`(${a} + ${b})^2`)} means square the **sum**. You squared each letter separately.`)],
        };
      }
      if (kind === 4) {
        // a(b − c)
        const A = rng.nonZero(-6, 6), B = rng.nonZero(-9, 9);
        let C = rng.nonZero(-9, 9);
        if (B - C === 0) C = B > 0 ? B - 3 : B + 3;
        if (C === 0) C = 2;
        const cL = a === "c" ? "e" : "c";
        const ans = A * (B - C);
        const traps: Trap[] = [];
        if (A * B - C !== ans) traps.push(ntrap(A * B - C, `The bracket means ${a} multiplies the whole of ${M(`${b} - ${cL}`)}. Do the bracket first.`));
        return {
          prompt: ask(`${a}(${b} - ${cL})`, `${a} = ${num(A)}, ${b} = ${num(B)} and ${cL} = ${num(C)}`),
          answer: { type: "number", value: ans },
          solution: [`${M(`${bq(A)} × (${bq(B)} - ${bq(C)})`)}`, `Bracket first: ${M(`${bq(B)} - ${bq(C)} = ${B - C}`)}`, `${M(`${bq(A)} × ${bq(B - C)} = ${ans}`)}`],
          hint: "Do the bracket first. Subtracting a negative is the same as adding.",
          traps,
        };
      }
      // kind 5: two letters — fractions (tier 3) or a product of negatives (tier 2)
      {
        if (tier === 3) {
          const d1 = rng.pick([2, 3, 4]), d2 = rng.pick([2, 3, 5]);
          const A: Q = q(rng.bool() ? 1 : -1, d1), B: Q = q(rng.pick([1, 2, -1, -2, 3].filter((n) => gcd(n, d2) === 1)), d2);
          const p = d1 * rng.int(1, 3), qq = rng.int(2, 9);
          const vals = [qmul(q(p), A), qmul(q(qq), B)];
          const ans = qsum(vals);
          const isWhole = ans[1] === 1;
          return {
            prompt: ask(`${p}${a} + ${qq}${b}`, `${a} = ${frac(A[0], A[1])} and ${b} = ${frac(B[0], B[1])}`) + (isWhole ? "" : " Give your answer as a fraction in its simplest form."),
            answer: isWhole ? { type: "number", value: ans[0] } : { type: "fraction", n: ans[0], d: ans[1], simplest: true },
            solution: [`${M(`${p} × ${A[0] < 0 ? `(${qin(A)})` : qin(A)} + ${qq} × ${B[0] < 0 ? `(${qin(B)})` : qin(B)}`)}`, `${M(`= ${joinVals(vals)}`)}`, `${M(`= ${qin(ans)}`)}`],
            hint: "Multiply each fraction by its coefficient, then add.",
          };
        }
        const A = -rng.int(2, 9), B = rng.nonZero(-9, 9);
        let C = rng.nonZero(-12, 12);
        if (A * B + C === 0) C = C > 0 ? C + 1 : C - 1;
        const cL = a === "c" ? "e" : "c";
        const ans = A * B + C;
        return {
          prompt: ask(`${a}${b} + ${cL}`, `${a} = ${num(A)}, ${b} = ${num(B)} and ${cL} = ${num(C)}`),
          answer: { type: "number", value: ans },
          solution: [`${M(`${bq(A)} × ${bq(B)} + ${bq(C)}`)}`, `Multiply first: ${M(`${bq(A)} × ${bq(B)} = ${A * B}`)}`, `${M(`${A * B}${pm(C)} = ${ans}`)}`],
          hint: "Multiply first, then add. Watch the signs.",
          traps: B < 0 ? [ntrap(-A * B + C, `A negative times a negative is positive: ${M(`${bq(A)} × ${bq(B)} = ${A * B}`)}.`)] : [],
        };
      }
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.substitute-formula",
    topicId: TOPIC,
    title: "Substitute into a formula",
    level: 2,
    guideRef: "substitution",
    generate(rng, tier) {
      const pool = tier === 1 ? ["v", "P", "A", "F", "s", "C"] : tier === 2 ? ["v", "P", "A", "F", "s", "C"] : ["E", "s2", "rev", "FC", "circle", "v"];
      const kind = rng.pick(pool);
      if (kind === "v") {
        let u = 0, A10 = 20, t = 2, V10 = 0;
        for (let i = 0; i < 100; i++) {
          t = rng.int(2, 6);
          if (tier === 1) { u = rng.int(0, 10); A10 = 10 * rng.int(2, 3); }
          else { u = rng.int(5, 25); A10 = rng.bool(0.5) ? -10 * rng.int(1, 4) : rng.pick([15, 25, 5, 10, 20]); }
          V10 = 10 * u + A10 * t;
          if (V10 >= 0 && V10 % 1 === 0) break;
        }
        const a = clean(A10 / 10), v = clean(V10 / 10);
        const traps: Trap[] = [];
        const wrong = clean((u + a) * t);
        if (wrong !== v) traps.push(ntrap(wrong, `Multiply before adding: work out ${M("at")} first, then add u.`));
        return {
          prompt: `The formula ${M("v = u + at")} gives the speed v (in m/s) of a car after t seconds, where u is its starting speed and a is its acceleration. Find v when u = ${u}, a = ${num(a)} and t = ${t}.`,
          answer: { type: "number", value: v },
          solution: [`${M(`v = ${u} + ${bq(a)} × ${t}`)}`, `Multiply first: ${M(`${bq(a)} × ${t} = ${clean(a * t)}`)}`, `${M(`v = ${u}${pm(clean(a * t))} = ${v}`)} m/s`],
          hint: `${M("at")} means a × t. Do the multiplication before the addition.`,
          traps,
        };
      }
      if (kind === "P") {
        const dec = tier === 2;
        const L = dec ? rng.int(21, 99) : 10 * rng.int(3, 20), W = dec ? rng.int(11, L - 1) : 10 * rng.int(2, L / 10 - 1);
        const l = clean(L / 10), w = clean(W / 10), P = clean((2 * (L + W)) / 10);
        return {
          prompt: `The perimeter of a rectangle is given by ${M("P = 2(l + w)")}. Find P when l = ${l} cm and w = ${w} cm. Give your answer in cm.`,
          answer: { type: "number", value: P },
          solution: [`${M(`P = 2(${l} + ${w})`)}`, `Bracket first: ${M(`${l} + ${w} = ${clean((L + W) / 10)}`)}`, `${M(`P = 2 × ${clean((L + W) / 10)} = ${P}`)} cm`],
          hint: "Work out the bracket first, then double it.",
          traps: [ntrap(clean((2 * L + W) / 10), "The 2 multiplies the whole bracket — double both l and w (add them first).")],
        };
      }
      if (kind === "A") {
        let b = 4, h = 6;
        for (let i = 0; i < 50; i++) {
          b = rng.int(3, 20); h = rng.int(3, 20);
          if (tier === 2 || (b * h) % 2 === 0) break;
        }
        const A = clean((b * h) / 2);
        return {
          prompt: `The area of a triangle is ${M("A = 1/2 bh")}. Find A when b = ${b} cm and h = ${h} cm. Give your answer in {{cm^2}}.`,
          answer: { type: "number", value: A },
          solution: [`${M(`A = 1/2 × ${b} × ${h}`)}`, `${M(`${b} × ${h} = ${b * h}`)}`, `${M(`${b * h} ÷ 2 = ${A}`)} {{cm^2}}`],
          hint: `${M("1/2 bh")} means half of b × h.`,
          traps: [ntrap(b * h, "Don't forget the half — a triangle is half of a rectangle.")],
        };
      }
      if (kind === "F") {
        const C = tier === 1 ? 5 * rng.int(0, 8) : rng.int(-20, 40);
        const F = clean((18 * C + 320) / 10);
        const wrong = clean((18 * (C + 32)) / 10);
        return {
          prompt: `To change a temperature from °C to °F you can use ${M("F = 1.8C + 32")}. Find F when C = ${num(C)}.`,
          answer: { type: "number", value: F },
          solution: [`${M(`F = 1.8 × ${bq(C)} + 32`)}`, `Multiply first: ${M(`1.8 × ${bq(C)} = ${clean((18 * C) / 10)}`)}`, `${M(`F = ${clean((18 * C) / 10)} + 32 = ${F}`)}`],
          hint: "Multiply by 1.8 first, then add 32.",
          traps: wrong !== F ? [ntrap(wrong, "Multiply C by 1.8 first, then add 32 — don't add 32 before multiplying.")] : [],
        };
      }
      if (kind === "s") {
        const t = rng.int(2, 6);
        const s = tier === 1 ? rng.int(3, 20) : clean(rng.int(7, 40) / 2);
        const d = clean(s * t);
        return {
          prompt: `Average speed is given by ${M("s = d/t")}. A cyclist rides ${d} km in ${t} hours. Find her average speed s in km/h.`,
          answer: { type: "number", value: s },
          solution: [`${M(`s = ${d}/${t}`)}`, `${M(`${d} ÷ ${t} = ${s}`)} km/h`],
          hint: `${M("d/t")} means distance divided by time.`,
          traps: [ntrap(clean(d * t), "Divide the distance by the time — don't multiply.")],
        };
      }
      if (kind === "C") {
        const f = rng.int(5, 30), r = tier === 1 ? rng.int(3, 15) : clean(rng.int(25, 90) / 10), n = rng.int(2, 12);
        const C = clean(f + r * n);
        const ctx = rng.pick([
          `The cost in dollars of a school CCA trip for n students is ${M(`C = ${f} + ${r}n`)}.`,
          `The cost in dollars of hiring a bike for n hours at East Coast Park is ${M(`C = ${f} + ${r}n`)}.`,
          `A printing shop charges ${M(`C = ${f} + ${r}n`)} dollars to print n posters.`,
        ]);
        const wrong = clean((f + r) * n);
        return {
          prompt: `${ctx} Find C when n = ${n}.`,
          answer: { type: "number", value: C, display: `$${C % 1 === 0 ? C : C.toFixed(2)}` },
          solution: [`${M(`C = ${f} + ${r} × ${n}`)}`, `Multiply first: ${M(`${r} × ${n} = ${clean(r * n)}`)}`, `${M(`C = ${f} + ${clean(r * n)} = ${C}`)}, so the cost is $${C % 1 === 0 ? C : C.toFixed(2)}.`],
          hint: `${M(`${r}n`)} means ${r} × n. Multiply before adding.`,
          traps: wrong !== C ? [ntrap(wrong, "Multiply before you add: work out the n part first, then add the fixed amount.")] : [],
        };
      }
      if (kind === "E") {
        const m = rng.int(2, 12), v = rng.int(2, 10);
        const E = clean((m * v * v) / 2);
        const traps: Trap[] = [ntrap(m * v * v, "Don't forget to halve.")];
        const w2 = clean((m * v) * (m * v) / 2);
        if (w2 !== E) traps.push(ntrap(w2, `Only v is squared: ${M(`v^2 = ${v * v}`)}. Then multiply by m and halve.`));
        return {
          prompt: `The kinetic energy (in joules) of a moving object is ${M("E = 1/2 m v^2")}, where m is its mass in kg and v its speed in m/s. Find E when m = ${m} and v = ${v}.`,
          answer: { type: "number", value: E },
          solution: [`Square first: ${M(`v^2 = ${v}^2 = ${v * v}`)}`, `${M(`E = 1/2 × ${m} × ${v * v} = ${E}`)} J`],
          hint: "Square v first, then multiply by m, then halve.",
          traps,
        };
      }
      if (kind === "s2") {
        const u = rng.int(0, 10), t = rng.int(2, 6), a = rng.int(2, 6);
        const s = clean(u * t + (a * t * t) / 2);
        const traps: Trap[] = [];
        if (u * t + a * t * t !== s) traps.push(ntrap(u * t + a * t * t, `Don't forget the half in ${M("1/2 at^2")}.`));
        const w2 = clean(u * t + (a * t) * (a * t) / 2);
        if (w2 !== s) traps.push(ntrap(w2, "Only t is squared, not a × t."));
        return {
          prompt: `The distance s metres travelled by a car is ${M("s = ut + 1/2 at^2")}. Find s when u = ${u}, a = ${a} and t = ${t}.`,
          answer: { type: "number", value: s },
          solution: [`${M(`ut = ${u} × ${t} = ${u * t}`)}`, `${M(`1/2 at^2 = 1/2 × ${a} × ${t}^2 = 1/2 × ${a} × ${t * t} = ${clean((a * t * t) / 2)}`)}`, `${M(`s = ${u * t} + ${clean((a * t * t) / 2)} = ${s}`)} m`],
          hint: "Work out each term separately. In the second term, square t first.",
          traps,
        };
      }
      if (kind === "rev") {
        const a = rng.int(2, 6), t = rng.int(2, 8), u = rng.int(0, 20);
        const v = u + a * t;
        if (rng.bool()) {
          return {
            prompt: `The formula ${M("v = u + at")} links the final speed v, the starting speed u, the acceleration a and the time t. Find u when v = ${v}, a = ${a} and t = ${t}.`,
            answer: { type: "number", value: u },
            solution: [`${M(`${v} = u + ${a} × ${t}`)}`, `${M(`${v} = u + ${a * t}`)}`, `Subtract ${a * t} from both sides: ${M(`u = ${v} - ${a * t} = ${u}`)}`],
            hint: "Substitute the values you know, then solve the equation for u.",
            traps: [ntrap(v + a * t, `Substitute first: ${M(`${v} = u + ${a * t}`)}. To undo + ${a * t}, subtract it.`)],
          };
        }
        const traps: Trap[] = [];
        if (v / a - u !== t && v / a - u > 0 && Number.isInteger(v / a - u)) traps.push(ntrap(v / a - u, "Subtract u before you divide by a."));
        return {
          prompt: `The formula ${M("v = u + at")} links the final speed v, the starting speed u, the acceleration a and the time t. Find t when v = ${v}, u = ${u} and a = ${a}.`,
          answer: { type: "number", value: t },
          solution: [`${M(`${v} = ${u} + ${a}t`)}`, `Subtract ${u}: ${M(`${v - u} = ${a}t`)}`, `Divide by ${a}: ${M(`t = ${t}`)}`],
          hint: "Substitute the values you know, then solve the equation for t.",
          traps,
        };
      }
      if (kind === "FC") {
        const k = rng.nonZero(-5, 12);
        const F = 32 + 9 * k, C = 5 * k;
        return {
          prompt: `To change °F to °C you can use ${M("C = 5(F - 32)/9")}. Find C when F = ${num(F)}.`,
          answer: { type: "number", value: C },
          solution: [`Bracket first: ${M(`${bq(F)} - 32 = ${F - 32}`)}`, `${M(`5 × ${bq(F - 32)} = ${5 * (F - 32)}`)}`, `${M(`${5 * (F - 32)} ÷ 9 = ${C}`)}, so C = ${num(C)}.`],
          hint: "Work out the bracket first, then multiply by 5 and divide by 9.",
          traps: [ntrap(5 * (F - 32), "Don't forget to divide by 9.")],
        };
      }
      // circle area to 1 dp
      const half = rng.bool(0.3);
      const r = half ? clean(rng.int(3, 15) + 0.5) : rng.int(2, 15);
      const A = roundTo(Math.PI * r * r, 1);
      const traps: Trap[] = [];
      const circ = roundTo(2 * Math.PI * r, 1);
      if (circ !== A) traps.push(ntrap(circ, `That is ${M("2 pi r")} (the circumference). The area uses ${M("r^2")}.`));
      const big = roundTo(Math.pow(Math.PI * r, 2), 1);
      if (big !== A) traps.push(ntrap(big, `Only r is squared, not ${M("pi r")}.`));
      return {
        prompt: `The area of a circle is ${M("A = pi r^2")}. Find A when r = ${r} cm. Use the {{pi}} button on your calculator and give your answer to 1 decimal place.`,
        answer: { type: "number", value: A, allowFraction: false },
        solution: [`Square first: ${M(`r^2 = ${r}^2 = ${clean(r * r)}`)}`, `${M(`A = pi × ${clean(r * r)} = ${roundTo(Math.PI * r * r, 4)}…`)}`, `To 1 decimal place, A = ${A} {{cm^2}}.`],
        hint: "Square the radius first, then multiply by π.",
        traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.expand-bracket",
    topicId: TOPIC,
    title: "Expand a single bracket",
    level: 1,
    guideRef: "expanding",
    generate(rng, tier) {
      const v = rng.pick(ONE);
      const verb = rng.pick(["Expand", "Expand", "Multiply out"]);
      const hint = "Multiply the term outside by EVERY term inside the bracket. Watch the signs.";
      // two-letter case (tier 2)
      if (tier === 2 && rng.bool(0.25)) {
        const [a, b] = rng.pick(PAIRS);
        const K = rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6, 7]);
        const p = rng.int(1, 6), qq = rng.nonZero(-7, 7);
        const inner = poly([[p, a], [qq, b]]);
        const ans = poly([[K * p, a], [K * qq, b]]);
        const traps: Trap[] = [etrap(poly([[K * p, a], [qq, b]]), "Multiply **both** terms inside the bracket by the number outside.")];
        if (K < 0) traps.push(etrap(poly([[K * p, a], [-K * qq, b]]), `The ${num(K)} multiplies the second term too: ${M(`${K} × ${tb(qq, b)} = ${term(K * qq, b)}`)}.`));
        return {
          prompt: `${verb} ${M(`${K}(${inner})`)}.`,
          answer: { type: "expression", expr: ans, form: "expanded" },
          solution: [`Multiply each term inside by ${num(K)}.`, `${M(`${K} × ${tb(p, a)} = ${term(K * p, a)}`)} and ${M(`${K} × ${tb(qq, b)} = ${term(K * qq, b)}`)}`, `So ${M(`${K}(${inner}) = ${ans}`)}.`],
          hint,
          traps,
        };
      }
      let K = 2, e = 0;
      let inner: Poly1 = [];
      if (tier === 1) {
        K = rng.int(2, 9);
        e = 0;
        inner = [[rng.bool(0.6) ? 1 : rng.int(2, 5), 1], [rng.bool(0.65) ? rng.int(1, 9) : -rng.int(1, 9), 0]];
      } else if (tier === 2) {
        const f = rng.int(0, 2);
        if (f === 0) {
          K = -rng.int(2, 9); e = 0;
          inner = [[rng.int(1, 5), 1], [rng.nonZero(-9, 9), 0]];
          if (rng.bool(0.3)) inner = [[rng.int(1, 9), 0], [-rng.int(1, 5), 1]];
        } else if (f === 1) {
          K = rng.pick([1, 1, -1]); e = 1;
          inner = [[1, 1], [rng.nonZero(-9, 9), 0]];
        } else {
          K = rng.pick([-4, -3, -2, 2, 3, 4, 5]); e = 0;
          inner = [[rng.int(2, 6), 1], [rng.nonZero(-9, 9), 0]];
        }
      } else {
        const f = rng.int(0, 3);
        if (f === 0) {
          K = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5, 6]); e = 1;
          inner = [[rng.int(2, 5), 1], [rng.nonZero(-9, 9), 0]];
        } else if (f === 1) {
          K = rng.pick([1, -1, 2, 3]); e = 2;
          inner = [[1, 1], [rng.nonZero(-9, 9), 0]];
        } else if (f === 2) {
          K = rng.pick([2, 3, 4, 5, -2, -3]); e = 1;
          inner = [[rng.int(1, 3), 2], [rng.nonZero(-9, 9), 0]];
        } else {
          K = rng.pick([-1, -2, -3]); e = 1;
          inner = [[rng.int(1, 9), 0], [rng.nonZero(-5, 5), 1]];
        }
      }
      const outer = e === 0 ? `${K}` : term(K, pw(v, e));
      const innerStr = polyStr(inner, v);
      const prods: Poly1 = inner.map(([c, p]) => [K * c, p + e]);
      const sorted = [...prods].sort((x, y) => y[1] - x[1]);
      const ans = polyStr(sorted, v);
      const traps: Trap[] = [etrap(polyStr([prods[0], inner[1]], v), `Multiply **every** term inside the bracket by ${M(outer)} — including the ${M(term(inner[1][0], pw(v, inner[1][1])))}.`)];
      if (K < 0) traps.push(etrap(polyStr([prods[0], [-prods[1][0], prods[1][1]]], v), `The minus sign multiplies the second term too: ${M(`${outer} × ${tb(inner[1][0], pw(v, inner[1][1]))} = ${term(prods[1][0], pw(v, prods[1][1]))}`)}.`));
      return {
        prompt: `${verb} ${M(`${outer}(${innerStr})`)}.`,
        answer: { type: "expression", expr: ans, form: "expanded" },
        solution: [
          `Multiply each term inside the bracket by ${M(outer)}.`,
          inner.map(([c, p], i) => M(`${outer} × ${tb(c, pw(v, p))} = ${term(prods[i][0], pw(v, prods[i][1]))}`)).join(" and "),
          `So ${M(`${outer}(${innerStr}) = ${ans}`)}.`,
        ],
        hint,
        traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.expand-and-simplify",
    topicId: TOPIC,
    title: "Expand and simplify two brackets added or subtracted",
    level: 2,
    guideRef: "expanding",
    generate(rng, tier) {
      const v = rng.pick(ONE);
      let b1: { K: number; e: number; inner: Poly1 } = { K: 2, e: 0, inner: [[1, 1], [1, 0]] };
      let b2 = b1;
      let res = new Map<number, number>();
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          b1 = { K: rng.int(2, 6), e: 0, inner: [[rng.int(1, 3), 1], [rng.int(1, 9), 0]] };
          b2 = { K: rng.int(2, 6), e: 0, inner: [[rng.int(1, 3), 1], [rng.int(1, 9), 0]] };
        } else if (tier === 2) {
          b1 = { K: rng.int(2, 7), e: 0, inner: [[rng.int(1, 4), 1], [rng.nonZero(-9, 9), 0]] };
          b2 = { K: rng.bool(0.6) ? -rng.int(2, 7) : rng.int(2, 7), e: 0, inner: [[rng.int(1, 4), 1], [rng.nonZero(-9, 9), 0]] };
        } else {
          const f = rng.int(0, 3);
          if (f === 0) {
            b1 = { K: 1, e: 1, inner: [[1, 1], [rng.nonZero(-9, 9), 0]] };
            b2 = { K: rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]), e: 0, inner: [[1, 1], [rng.nonZero(-9, 9), 0]] };
          } else if (f === 1) {
            b1 = { K: 1, e: 1, inner: [[1, 1], [rng.nonZero(-9, 9), 0]] };
            b2 = { K: -1, e: 1, inner: [[1, 1], [rng.nonZero(-9, 9), 0]] };
          } else if (f === 2) {
            b1 = { K: rng.int(2, 4), e: 1, inner: [[rng.int(1, 3), 1], [rng.nonZero(-7, 7), 0]] };
            b2 = { K: rng.pick([-3, -2, -1, 1, 2]), e: 1, inner: [[rng.int(1, 3), 1], [rng.nonZero(-7, 7), 0]] };
          } else {
            b1 = { K: rng.int(2, 8), e: 0, inner: [[rng.int(1, 5), 1], [rng.nonZero(-9, 9), 0]] };
            b2 = { K: -rng.int(2, 8), e: 0, inner: [[rng.int(1, 5), 1], [rng.nonZero(-9, 9), 0]] };
          }
        }
        res = new Map<number, number>();
        for (const br of [b1, b2]) for (const [c, p] of br.inner) res.set(p + br.e, (res.get(p + br.e) ?? 0) + br.K * c);
        const nonzero = [...res.values()].filter((c) => c !== 0).length;
        if (nonzero === 0) continue;
        if (tier < 3 && (res.get(1) === 0 || res.get(0) === 0)) continue;
        if (tier === 3 && nonzero === 1 && rng.bool(0.6)) continue;
        if (b1.inner[1][0] === b2.inner[1][0] && b1.K === b2.K) continue;
        break;
      }
      const outerStr = (br: { K: number; e: number }) => (br.e === 0 ? `${br.K}` : term(br.K, pw(v, br.e)));
      const prods = (br: { K: number; e: number; inner: Poly1 }): Poly1 => br.inner.map(([c, p]) => [br.K * c, p + br.e]);
      const p1 = prods(b1), p2 = prods(b2);
      const sec = b2.K < 0 ? ` - ${outerStr({ K: -b2.K, e: b2.e })}` : ` + ${outerStr(b2)}`;
      const shown = `${outerStr(b1)}(${polyStr(b1.inner, v)})${sec}(${polyStr(b2.inner, v)})`;
      const ansTerms: Poly1 = [...res.entries()].sort((x, y) => y[0] - x[0]).map(([p, c]) => [c, p]);
      const ans = polyStr(ansTerms, v);
      const traps: Trap[] = [];
      if (b2.K < 0) {
        const wrong = new Map(res);
        wrong.set(p2[1][1], wrong.get(p2[1][1])! - 2 * p2[1][0]);
        const wt: Poly1 = [...wrong.entries()].sort((x, y) => y[0] - x[0]).map(([p, c]) => [c, p]);
        traps.push(etrap(polyStr(wt, v), `The minus sign in front of the second bracket multiplies **both** terms inside it: ${M(`${outerStr(b2)} × ${bq(b2.inner[1][0])} = ${term(p2[1][0], pw(v, p2[1][1]))}`)}.`));
      }
      return {
        prompt: `Expand and simplify ${M(shown)}.`,
        answer: { type: "expression", expr: ans, form: "simplified" },
        solution: [
          `First bracket: ${M(`${outerStr(b1)}(${polyStr(b1.inner, v)}) = ${polyStr(p1, v)}`)}`,
          `Second bracket (the sign goes with it): ${M(`${outerStr(b2)}(${polyStr(b2.inner, v)}) = ${polyStr(p2, v)}`)}`,
          `Together: ${M(polyStr([...p1, ...p2], v))}. Collect like terms: ${M(ans)}.`,
        ],
        hint: "Expand each bracket separately — keep the sign in front of the second bracket with its number — then collect like terms.",
        traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.factorise",
    topicId: TOPIC,
    title: "Factorise by taking out the highest common factor",
    level: 2,
    guideRef: "factorising",
    generate(rng, tier) {
      const [v, w] = rng.pick(PAIRS);
      let H: { c: number; f: Fac } = { c: 2, f: [] };
      let inner: Array<[number, Fac]> = [];
      for (let i = 0; i < 300; i++) {
        const s = rng.int(0, tier === 1 ? 1 : 2);
        if (tier === 1) {
          H = { c: rng.int(2, 9), f: [] };
          inner = s === 0
            ? [[rng.int(1, 6), [[v, 1]]], [rng.bool(0.7) ? rng.int(1, 9) : -rng.int(1, 9), []]]
            : [[rng.int(1, 5), [[v, 1]]], [rng.nonZero(-5, 5), [[w, 1]]]];
        } else if (tier === 2) {
          if (s === 0) { H = { c: rng.int(1, 6), f: [[v, 1]] }; inner = [[rng.int(1, 5), [[v, 1]]], [rng.nonZero(-9, 9), []]]; }
          else if (s === 1) { H = { c: rng.int(2, 6), f: [[v, 1]] }; inner = [[rng.int(1, 5), [[w, 1]]], [rng.nonZero(-9, 9), []]]; }
          else { H = { c: rng.int(2, 9), f: [] }; inner = [[rng.int(1, 9), []], [-rng.int(1, 6), [[v, 1]]]]; }
        } else {
          if (s === 0) { H = { c: rng.int(1, 5), f: [[v, 2]] }; inner = [[rng.int(1, 5), [[v, 1]]], [rng.nonZero(-9, 9), []]]; }
          else if (s === 1) { H = { c: rng.int(1, 4), f: rng.bool() ? [] : [[v, 1]] }; inner = [[rng.int(1, 4), [[v, 2]]], [rng.nonZero(-6, 6), [[v, 1]]], [rng.nonZero(-9, 9), []]]; }
          else { H = { c: rng.int(1, 6), f: [[v, 1], [w, 1]] }; inner = [[rng.int(1, 5), [[v, 1]]], [rng.nonZero(-5, 5), [[w, 1]]]]; }
        }
        if (H.c === 1 && H.f.length === 0) continue;
        const g = inner.reduce((acc, [c]) => gcd(acc, c), 0);
        if (g !== 1) continue;
        // the bracket must not still share a letter
        const letters = inner.map(([, f]) => new Set(f.map(([x]) => x)));
        if ([v, w].some((x) => letters.every((L) => L.has(x)))) continue;
        break;
      }
      const mulF = (f1: Fac, f2: Fac): Fac => {
        const m = new Map<string, number>();
        for (const [x, p] of [...f1, ...f2]) m.set(x, (m.get(x) ?? 0) + p);
        return [v, w].filter((x) => m.has(x)).map((x) => [x, m.get(x)!] as [string, number]);
      };
      const orig: Array<[number, Fac]> = inner.map(([c, f]) => [H.c * c, mulF(H.f, f)]);
      const origStr = sumMono(orig);
      const Hs = mono(H.c, H.f);
      const innerStr = sumMono(inner);
      const ansStr = `${Hs}(${innerStr})`;
      const lettersText = H.f.length ? `, and every term contains ${M(mono(1, H.f))}` : "";
      // HCF-only question (two-term expressions)
      if (orig.length === 2 && rng.bool(0.25)) {
        const traps: Trap[] = [];
        if (H.f.length) traps.push(etrap(String(H.c), `Both terms also contain ${M(mono(1, H.f))} — include the letters in the HCF.`));
        const pf = [2, 3, 5, 7].find((p) => H.c % p === 0 && H.c > p);
        if (pf) traps.push(etrap(mono(H.c / pf, H.f), `That is a common factor, but not the highest — ${H.c} also divides both numbers.`));
        if (H.f.length) traps.push(etrap(mono(H.c, H.f.map(([x]) => [x, 1] as [string, number])), "Check the powers: use the lowest power of each letter that appears in both terms."));
        const okTraps = traps.filter((t) => t.spec.type === "expression" && t.spec.expr !== Hs);
        return {
          prompt: `What is the highest common factor (HCF) of ${M(mono(orig[0][0], orig[0][1]))} and ${M(mono(Math.abs(orig[1][0]), orig[1][1]))}?`,
          answer: { type: "expression", expr: Hs },
          solution: [
            `Numbers: the HCF of ${Math.abs(orig[0][0])} and ${Math.abs(orig[1][0])} is ${H.c}${lettersText}.`,
            `So the HCF is ${M(Hs)}.`,
          ],
          hint: "Find the HCF of the numbers, then see which letters (and what power of each) are in BOTH terms.",
          traps: okTraps,
        };
      }
      const firstOnly = `${Hs}(${sumMono([inner[0], ...orig.slice(1)])})`;
      return {
        prompt: rng.pick([`Factorise fully ${M(origStr)}.`, `Factorise ${M(origStr)} completely.`]),
        answer: { type: "expression", expr: ansStr, form: "factorised" },
        solution: [
          `HCF of the terms: the numbers have HCF ${H.c}${lettersText}. So the HCF is ${M(Hs)}.`,
          `Divide each term by ${M(Hs)}: ${orig.map(([c, f], i) => M(`${mono(c, f)} ÷ ${Hs} = ${mono(inner[i][0], inner[i][1])}`)).join(", ")}.`,
          `So ${M(`${origStr} = ${ansStr}`)}. Check: expanding gives back ${M(origStr)}, and the bracket has no common factor left.`,
        ],
        hint: "Find the HCF of ALL the terms (numbers and letters), write it outside the bracket, then divide each term by it.",
        traps: [etrap(firstOnly, `Divide **every** term by ${M(Hs)}. Expand your answer to check it gives back the original.`)],
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.words-to-expressions",
    topicId: TOPIC,
    title: "Write an expression from words",
    level: 1,
    guideRef: "writing-expressions",
    generate(rng, tier) {
      const v = rng.pick(["n", "x", "y", "m", "t", "w"]);
      const k = rng.int(2, 12), m = rng.int(2, 9);
      type W = { text: string; expr: string; traps?: Trap[]; steps: string[] };
      const t1: Array<() => W> = [
        () => ({ text: `${k} more than ${v}`, expr: `${v} + ${k}`, steps: ["'More than' means add."] }),
        () => ({ text: `${k} less than ${v}`, expr: `${v} - ${k}`, traps: [etrap(`${k} - ${v}`, `'${k} less than ${v}' starts with ${v} and takes ${k} away: ${M(`${v} - ${k}`)}.`)], steps: [`Start with ${v}, then take away ${k}.`] }),
        () => ({ text: `${v} multiplied by ${k}`, expr: `${k}${v}`, steps: [`Write the number in front of the letter: ${M(`${k}${v}`)}.`] }),
        () => ({ text: `${v} divided by ${k}`, expr: `${v}/${k}`, traps: [etrap(`${k}/${v}`, `Start with ${v}, then divide it by ${k}: ${M(`${v}/${k}`)}.`)], steps: [`Write the division as a fraction: ${v} on top, ${k} underneath.`] }),
        () => ({ text: `subtract ${v} from ${k}`, expr: `${k} - ${v}`, traps: [etrap(`${v} - ${k}`, `'Subtract ${v} from ${k}' means start with ${k}: ${M(`${k} - ${v}`)}.`)], steps: [`Start with ${k} and take ${v} away.`] }),
        () => {
          const [d, w] = rng.pick([[2, "half"], [3, "a third"], [4, "a quarter"], [5, "a fifth"]] as Array<[number, string]>);
          return { text: `${w} of ${v}`, expr: `${v}/${d}`, traps: [etrap(`${d}${v}`, `${w[0].toUpperCase() + w.slice(1)} of ${v} means divide by ${d}, not multiply.`)], steps: [`${w[0].toUpperCase() + w.slice(1)} of something means divide it by ${d}.`] };
        },
        () => ({ text: `${v} squared`, expr: `${v}^2`, traps: [etrap(`2${v}`, `Squared means ${M(`${v} × ${v}`)}, not ${M(`2 × ${v}`)}.`)], steps: [`${v} squared means ${M(`${v} × ${v}`)}.`] }),
        () => ({ text: `the sum of ${v} and ${k}, multiplied by ${m}`, expr: `${m}(${v} + ${k})`, traps: [etrap(`${m}${v} + ${k}`, "Use a bracket: the whole sum is multiplied.")], steps: [`The sum is ${M(`${v} + ${k}`)}. Multiply all of it by ${m} using a bracket.`] }),
      ];
      const t2: Array<() => W> = [
        () => ({ text: `multiply ${v} by ${m}, then add ${k}`, expr: `${m}${v} + ${k}`, traps: [etrap(`${m}(${v} + ${k})`, `Multiply first, then add — no bracket needed: ${M(`${m}${v} + ${k}`)}.`)], steps: [`${v} × ${m} = ${M(`${m}${v}`)}`, `Then add ${k}.`] }),
        () => ({ text: `add ${k} to ${v}, then multiply by ${m}`, expr: `${m}(${v} + ${k})`, traps: [etrap(`${m}${v} + ${k}`, `The whole of ${M(`${v} + ${k}`)} is multiplied by ${m}, so you need a bracket.`)], steps: [`First ${M(`${v} + ${k}`)}.`, `Multiply the whole thing by ${m}: ${M(`${m}(${v} + ${k})`)}.`] }),
        () => ({ text: `subtract ${k} from ${v}, then divide by ${m}`, expr: `(${v} - ${k})/${m}`, traps: [etrap(`${v} - ${k}/${m}`, `The whole of ${M(`${v} - ${k}`)} is divided by ${m}: ${M(`(${v} - ${k})/${m}`)}.`)], steps: [`First ${M(`${v} - ${k}`)}.`, `Divide all of it by ${m}: ${M(`(${v} - ${k})/${m}`)}.`] }),
        () => ({ text: `divide ${v} by ${m}, then subtract ${k}`, expr: `${v}/${m} - ${k}`, traps: [etrap(`(${v} - ${k})/${m}`, `Divide first, then subtract: ${M(`${v}/${m} - ${k}`)}.`)], steps: [`${v} divided by ${m} is ${M(`${v}/${m}`)}.`, `Then subtract ${k}.`] }),
        () => {
          const [n, d, w] = rng.pick([[2, 3, "two thirds"], [3, 4, "three quarters"], [2, 5, "two fifths"], [3, 5, "three fifths"]] as Array<[number, number, string]>);
          return { text: `${w} of ${v}`, expr: `${n}${v}/${d}`, traps: [etrap(`${d}${v}/${n}`, `${w[0].toUpperCase() + w.slice(1)} is ${M(`${n}/${d}`)} — the ${d} goes underneath.`)], steps: [`${w[0].toUpperCase() + w.slice(1)} of ${v} = ${M(`${n}/${d} × ${v}`)} = ${M(`${n}${v}/${d}`)}.`] };
        },
        () => ({ text: `square ${v}, then multiply by ${m}`, expr: `${m}${v}^2`, traps: [etrap(`(${m}${v})^2`, `Only ${v} is squared; the ${m} multiplies afterwards: ${M(`${m}${v}^2`)}.`)], steps: [`${v} squared is ${M(`${v}^2`)}.`, `Multiply by ${m}: ${M(`${m}${v}^2`)}.`] }),
        () => ({ text: `${k} less than ${m} times ${v}`, expr: `${m}${v} - ${k}`, traps: [etrap(`${k} - ${m}${v}`, `Start with ${m} times ${v}, then take ${k} away: ${M(`${m}${v} - ${k}`)}.`)], steps: [`${m} times ${v} is ${M(`${m}${v}`)}.`, `${k} less than that: ${M(`${m}${v} - ${k}`)}.`] }),
        () => ({
          text: `Wei Ling is ${v} years old. Her brother is ${k} years older than her, and her cousin is twice as old as her brother. Write an expression for her cousin's age`,
          expr: `2(${v} + ${k})`,
          traps: [etrap(`2${v} + ${k}`, `Her brother is ${M(`${v} + ${k}`)}. Twice that needs a bracket: ${M(`2(${v} + ${k})`)}.`)],
          steps: [`Brother: ${M(`${v} + ${k}`)}.`, `Cousin: twice the brother's age = ${M(`2(${v} + ${k})`)} (or ${M(`2${v} + ${2 * k}`)}).`],
        }),
        () => ({
          text: `A notebook costs ${v} cents. A pen costs ${k} cents more than the notebook. Write an expression for the total cost, in cents, of one notebook and one pen`,
          expr: `2${v} + ${k}`,
          traps: [etrap(`${v} + ${k}`, `That's just the pen. Add the notebook too: ${M(`${v} + (${v} + ${k})`)}.`)],
          steps: [`Pen: ${M(`${v} + ${k}`)} cents.`, `Total: ${M(`${v} + ${v} + ${k} = 2${v} + ${k}`)}.`],
        }),
      ];
      const t3: Array<() => W> = [
        () => {
          const a2 = rng.int(1, 8), b2 = rng.int(1, 8);
          return {
            text: `the mean of ${v}, ${v} + ${a2} and ${v} + ${b2}`,
            expr: `(3${v} + ${a2 + b2})/3`,
            traps: [etrap(`3${v} + ${a2 + b2}`, "That's the total. The mean is the total divided by 3.")],
            steps: [`Total: ${M(`${v} + ${v} + ${a2} + ${v} + ${b2} = 3${v} + ${a2 + b2}`)}.`, `Mean = total ÷ 3 = ${M(`(3${v} + ${a2 + b2})/3`)}.`],
          };
        },
        () => ({
          text: `the sum of three consecutive whole numbers, where the smallest is ${v}`,
          expr: `3${v} + 3`,
          traps: [etrap(`3${v}`, `The numbers are ${M(v)}, ${M(`${v} + 1`)} and ${M(`${v} + 2`)} — they are not all equal.`)],
          steps: [`The numbers are ${M(v)}, ${M(`${v} + 1`)} and ${M(`${v} + 2`)}.`, `Sum: ${M(`3${v} + 3`)}.`],
        }),
        () => ({
          text: `A rectangle is ${v} cm wide. Its length is ${k} cm more than ${m} times its width. Write an expression for its perimeter in cm`,
          expr: `${2 * m + 2}${v} + ${2 * k}`,
          traps: [etrap(`${m + 1}${v} + ${k}`, "That's only half the perimeter — a rectangle has two lengths and two widths.")],
          steps: [`Length: ${M(`${m}${v} + ${k}`)}.`, `Perimeter: ${M(`2(${m}${v} + ${k}) + 2${v} = ${2 * m + 2}${v} + ${2 * k}`)}.`],
        }),
        () => ({
          text: `Hana is ${m} times as old as her brother, who is ${v} years old. Write an expression for Hana's age in ${k} years' time`,
          expr: `${m}${v} + ${k}`,
          traps: [etrap(`${m}(${v} + ${k})`, `Hana is ${M(`${m}${v}`)} now. In ${k} years she will be ${k} years older: ${M(`${m}${v} + ${k}`)}.`)],
          steps: [`Hana now: ${M(`${m}${v}`)}.`, `In ${k} years: ${M(`${m}${v} + ${k}`)}.`],
        }),
        () => {
          const [w2] = rng.shuffle(["b", "k", "s"].filter((x) => x !== v));
          const p = rng.pick([3.2, 3.5, 2.8, 4.1]), q2 = rng.pick([1.2, 1.5, 1.8, 2.4]);
          return {
            text: `Bubble tea costs $${p.toFixed(2)} a cup and kaya toast costs $${q2.toFixed(2)} a slice. Write an expression for the cost in dollars of ${v} cups of bubble tea and ${w2} slices of kaya toast`,
            expr: `${p}${v} + ${q2}${w2}`,
            traps: [etrap(`${clean(p + q2)}${v}${w2}`, "Different items are unlike terms — keep them as two separate terms.")],
            steps: [`Bubble tea: ${M(`${p}${v}`)}. Toast: ${M(`${q2}${w2}`)}.`, `Total: ${M(`${p}${v} + ${q2}${w2}`)}.`],
          };
        },
        () => ({
          text: `Ravi has $${v}. He keeps $${k} for himself and shares the rest equally between ${m} friends. Write an expression for the amount each friend gets, in dollars`,
          expr: `(${v} - ${k})/${m}`,
          traps: [etrap(`${v}/${m} - ${k}`, `First find what is left (${M(`${v} - ${k}`)}), then divide all of it by ${m}.`)],
          steps: [`Left to share: ${M(`${v} - ${k}`)}.`, `Each friend: ${M(`(${v} - ${k})/${m}`)}.`],
        }),
        () => ({ text: `a fifth of the sum of ${v} and ${k}`, expr: `(${v} + ${k})/5`, traps: [etrap(`${v} + ${k}/5`, "The whole sum is divided by 5 — use a bracket or a fraction line under all of it.")], steps: [`Sum: ${M(`${v} + ${k}`)}.`, `A fifth of it: ${M(`(${v} + ${k})/5`)}.`] }),
      ];
      const pool = tier === 1 ? t1 : tier === 2 ? [...t2, ...t1.slice(6)] : [...t3, ...t2.slice(4)];
      const w = rng.pick(pool)();
      const isContext = /\./.test(w.text);
      return {
        prompt: isContext ? `${w.text}.` : `Write an expression for: **${w.text}**.`,
        answer: { type: "expression", expr: w.expr },
        solution: [...w.steps, `Answer: ${M(w.expr)}.`],
        hint: "Turn the words into operations in the order they happen. Use a bracket when a whole amount is multiplied or divided.",
        traps: w.traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.write-formula",
    topicId: TOPIC,
    title: "Write a formula from a situation",
    level: 2,
    guideRef: "writing-expressions",
    generate(rng, tier) {
      type F = { text: string; lhs: string; rhs: string; traps: Trap[]; steps: string[] };
      const f1: Array<() => F> = [
        () => {
          const f = rng.int(2, 8), r = f + rng.int(1, 6);
          return {
            text: `A bike-hire stall at East Coast Park charges $${f} to hire a bike plus $${r} for every hour. Write a formula for C, the total cost in dollars of hiring a bike for h hours.`,
            lhs: "C", rhs: `${r}h + ${f}`,
            traps: [etrap(`${f}h + ${r}`, `The $${r} is paid for every hour, so it multiplies h. The $${f} is paid once.`)],
            steps: [`Each hour costs $${r}, so h hours cost ${M(`${r}h`)} dollars.`, `Add the one-off $${f}: ${M(`C = ${r}h + ${f}`)}.`],
          };
        },
        () => {
          const a = 5 * rng.int(4, 40), b = rng.int(3, 15);
          return {
            text: `Priya has $${a} in her savings account. She saves another $${b} every week. Write a formula for A, the amount in dollars she has after w weeks.`,
            lhs: "A", rhs: `${a} + ${b}w`,
            traps: [etrap(`${a}w + ${b}`, `She starts with $${a} (once) and adds $${b} each week, so it's ${M(`${b}w`)}.`)],
            steps: [`Each week adds $${b}, so w weeks add ${M(`${b}w`)}.`, `Start amount plus savings: ${M(`A = ${a} + ${b}w`)}.`],
          };
        },
        () => {
          const t = rng.int(9, 16), f = rng.int(1, 4);
          return {
            text: `Cinema tickets cost $${t} each, and there is a $${f} booking fee for each order. Write a formula for T, the total cost in dollars of an order of n tickets.`,
            lhs: "T", rhs: `${t}n + ${f}`,
            traps: [etrap(`${t + f}n`, `The booking fee is paid once per order, not once per ticket.`)],
            steps: [`n tickets cost ${M(`${t}n`)} dollars.`, `Add the fee once: ${M(`T = ${t}n + ${f}`)}.`],
          };
        },
        () => {
          const p = rng.int(2, 6), qq = rng.int(2, 9);
          return {
            text: `Pens cost $${p} each and notebooks cost $${qq} each. Write a formula for T, the total cost in dollars of x pens and y notebooks.`,
            lhs: "T", rhs: `${p}x + ${qq}y`,
            traps: [etrap(`${p + qq}xy`, "Pens and notebooks are different items — keep x and y as separate terms.")],
            steps: [`Pens: ${M(`${p}x`)}. Notebooks: ${M(`${qq}y`)}.`, `${M(`T = ${p}x + ${qq}y`)}`],
          };
        },
      ];
      const f2: Array<() => F> = [
        () => {
          const L = 50 * rng.int(4, 20), r = rng.int(3, 25);
          return {
            text: `A water tank holds ${L} litres. Water drains out at ${r} litres per minute. Write a formula for V, the volume of water in litres left in the tank after t minutes.`,
            lhs: "V", rhs: `${L} - ${r}t`,
            traps: [etrap(`${L} + ${r}t`, "The water is draining out, so the volume goes down — subtract.")],
            steps: [`In t minutes, ${M(`${r}t`)} litres drain out.`, `${M(`V = ${L} - ${r}t`)}`],
          };
        },
        () => {
          const k = rng.pick([1.5, 2, 2.5, 3.2, 1.8]), note = rng.pick([10, 20, 50]);
          return {
            text: `Siti buys n cups of sugarcane juice at $${k.toFixed(2)} each and pays with a $${note} note. Write a formula for C, her change in dollars.`,
            lhs: "C", rhs: `${note} - ${k}n`,
            traps: [etrap(`${k}n - ${note}`, `Change is what's left from the $${note}: start with ${note} and subtract the cost.`)],
            steps: [`Cost of the juice: ${M(`${k}n`)} dollars.`, `Change: ${M(`C = ${note} - ${k}n`)}.`],
          };
        },
        () => {
          const f = rng.pick([3.9, 4.1, 4.5, 3.6]), r = rng.pick([0.6, 0.7, 0.75, 0.55]);
          return {
            text: `A taxi charges a flag-down fare of $${f.toFixed(2)} plus $${r.toFixed(2)} for every kilometre. Write a formula for C, the fare in dollars for a journey of d km.`,
            lhs: "C", rhs: `${f} + ${r}d`,
            traps: [etrap(`${f}d + ${r}`, "The flag-down fare is paid once; the per-kilometre charge multiplies d.")],
            steps: [`Distance charge: ${M(`${r}d`)} dollars.`, `${M(`C = ${f} + ${r}d`)}`],
          };
        },
        () => {
          const k = rng.int(2, 9);
          return {
            text: `A rectangle is w cm wide. Its length is ${k} cm more than its width. Write a formula for P, its perimeter in cm.`,
            lhs: "P", rhs: `4w + ${2 * k}`,
            traps: [etrap(`2w + ${k}`, "That's half the perimeter: there are two lengths and two widths.")],
            steps: [`Length: ${M(`w + ${k}`)}.`, `${M(`P = 2(w + ${k}) + 2w = 4w + ${2 * k}`)}`],
          };
        },
        () => {
          const s = rng.int(15, 40), r = rng.pick([2, 2.5, 3, 4, 1.5]);
          return {
            text: `A phone plan costs $${s} a month, plus $${r.toFixed(2)} for each GB of extra data. Write a formula for C, the monthly cost in dollars when g GB of extra data are used.`,
            lhs: "C", rhs: `${s} + ${r}g`,
            traps: [etrap(`${s}g + ${r}`, `The $${s} is paid once a month; the extra-data price multiplies g.`)],
            steps: [`Extra data: ${M(`${r}g`)} dollars.`, `${M(`C = ${s} + ${r}g`)}`],
          };
        },
      ];
      const f3: Array<() => F> = [
        () => {
          const vch = rng.pick([5, 8, 10]);
          return {
            text: `A group of n friends share a hawker-centre bill of $B equally, after using a $${vch} voucher. Write a formula for A, the amount in dollars each person pays.`,
            lhs: "A", rhs: `(B - ${vch})/n`,
            traps: [etrap(`B/n - ${vch}`, `The voucher comes off the whole bill before it is shared: ${M(`(B - ${vch})/n`)}.`)],
            steps: [`Bill after the voucher: ${M(`B - ${vch}`)}.`, `Shared between n: ${M(`A = (B - ${vch})/n`)}.`],
          };
        },
        () => ({
          text: "Write a formula for M, the mean of three numbers a, b and c.",
          lhs: "M", rhs: "(a + b + c)/3",
          traps: [etrap("a + b + c/3", "The whole total is divided by 3 — use a bracket or put the fraction line under all of it.")],
          steps: ["Mean = total ÷ how many.", `${M("M = (a + b + c)/3")}`],
        }),
        () => {
          const k = rng.int(2, 9);
          return {
            text: `A rectangle is w cm wide and its length is ${k} cm more than its width. Write a formula for A, its area in {{cm^2}}.`,
            lhs: "A", rhs: `w(w + ${k})`,
            traps: [etrap(`w + ${k}`, "That's the length. Area = length × width."), etrap(`4w + ${2 * k}`, "That's the perimeter. Area = length × width.")],
            steps: [`Length: ${M(`w + ${k}`)}.`, `Area = length × width: ${M(`A = w(w + ${k})`)}, which is ${M(`w^2 + ${k}w`)}.`],
          };
        },
        () => {
          const ad = rng.int(12, 25), ch = rng.int(5, 11), fee = rng.int(1, 4);
          return {
            text: `At the Science Centre, adult tickets cost $${ad} and child tickets cost $${ch}. There is a $${fee} booking fee for each order. Write a formula for T, the total cost in dollars of an order for x adults and y children.`,
            lhs: "T", rhs: `${ad}x + ${ch}y + ${fee}`,
            traps: [etrap(`${ad}x + ${ch}y`, `Don't forget the $${fee} booking fee.`)],
            steps: [`Adults: ${M(`${ad}x`)}. Children: ${M(`${ch}y`)}. Fee: ${fee}.`, `${M(`T = ${ad}x + ${ch}y + ${fee}`)}`],
          };
        },
        () => {
          const c = rng.int(30, 80), r = rng.int(15, 40);
          return {
            text: `A plumber charges a $${c} call-out fee plus $${r} for every 30 minutes of work. Write a formula for C, the cost in dollars of a job lasting h hours.`,
            lhs: "C", rhs: `${c} + ${2 * r}h`,
            traps: [etrap(`${c} + ${r}h`, `h is in hours, and there are two lots of 30 minutes in an hour: $${2 * r} per hour.`)],
            steps: [`Per hour: 2 × $${r} = $${2 * r}.`, `${M(`C = ${c} + ${2 * r}h`)}`],
          };
        },
        () => ({
          text: "Menu prices at a café are shown before 9% GST is added. Write a formula for T, the price in dollars including GST of an item whose menu price is $p.",
          lhs: "T", rhs: "1.09p",
          traps: [etrap("p + 9", "9% GST means 9% of p, not $9."), etrap("0.09p", "That's just the GST. Add it on to the price: p + 0.09p.")],
          steps: ["GST is 9% of p, which is 0.09p.", `${M("T = p + 0.09p = 1.09p")}`],
        }),
      ];
      const pool = tier === 1 ? f1 : tier === 2 ? [...f2, ...f1.slice(0, 2)] : [...f3, ...f2.slice(0, 2)];
      const f = rng.pick(pool)();
      return {
        prompt: f.text,
        answer: { type: "expression", expr: f.rhs, display: M(`${f.lhs} = ${f.rhs}`) },
        solution: f.steps,
        hint: "Which amount is paid (or counted) once, and which amount is repeated for each unit? The repeated one multiplies the letter.",
        traps: f.traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.change-subject",
    topicId: TOPIC,
    title: "Change the subject of a formula",
    level: 2,
    guideRef: "changing-the-subject",
    generate(rng, tier) {
      const [x, y] = rng.pick([["x", "y"], ["a", "b"], ["n", "m"], ["t", "s"], ["p", "q"], ["h", "k"]] as Array<[string, string]>);
      const k = rng.int(2, 9), c = rng.int(2, 15);
      type R = { f: string; subj: string; rhs: string; steps: string[]; traps: Trap[]; note?: string };
      const r1: Array<() => R> = [
        () => ({ f: `${y} = ${x} + ${c}`, subj: x, rhs: `${y} - ${c}`, steps: [`Subtract ${c} from both sides: ${M(`${y} - ${c} = ${x}`)}.`], traps: [etrap(`${y} + ${c}`, `To undo + ${c}, subtract ${c}.`)] }),
        () => ({ f: `${y} = ${x} - ${c}`, subj: x, rhs: `${y} + ${c}`, steps: [`Add ${c} to both sides: ${M(`${y} + ${c} = ${x}`)}.`], traps: [etrap(`${y} - ${c}`, `To undo − ${c}, add ${c}.`)] }),
        () => ({ f: `${y} = ${k}${x}`, subj: x, rhs: `${y}/${k}`, steps: [`Divide both sides by ${k}: ${M(`${y}/${k} = ${x}`)}.`], traps: [etrap(`${k}${y}`, `${x} is multiplied by ${k}, so divide by ${k} to undo it.`)] }),
        () => ({
          f: `${y} = ${k}${x} + ${c}`, subj: x, rhs: `(${y} - ${c})/${k}`,
          steps: [`Subtract ${c} from both sides: ${M(`${y} - ${c} = ${k}${x}`)}.`, `Divide both sides by ${k}: ${M(`${x} = (${y} - ${c})/${k}`)}.`],
          traps: [etrap(`(${y} + ${c})/${k}`, `To undo + ${c}, subtract ${c}.`), etrap(`${y}/${k} - ${c}`, `Undo the + ${c} first, then divide the WHOLE of ${M(`${y} - ${c}`)} by ${k}.`)],
        }),
        () => ({
          f: `${y} = ${k}${x} - ${c}`, subj: x, rhs: `(${y} + ${c})/${k}`,
          steps: [`Add ${c} to both sides: ${M(`${y} + ${c} = ${k}${x}`)}.`, `Divide both sides by ${k}: ${M(`${x} = (${y} + ${c})/${k}`)}.`],
          traps: [etrap(`(${y} - ${c})/${k}`, `To undo − ${c}, add ${c}.`), etrap(`${y}/${k} + ${c}`, `Undo the − ${c} first, then divide the WHOLE of ${M(`${y} + ${c}`)} by ${k}.`)],
        }),
      ];
      const r2: Array<() => R> = [
        () => ({
          f: `${y} = ${c} - ${k}${x}`, subj: x, rhs: `(${c} - ${y})/${k}`,
          steps: [`Add ${M(`${k}${x}`)} to both sides: ${M(`${y} + ${k}${x} = ${c}`)}.`, `Subtract ${y}: ${M(`${k}${x} = ${c} - ${y}`)}.`, `Divide by ${k}: ${M(`${x} = (${c} - ${y})/${k}`)}.`],
          traps: [etrap(`(${y} - ${c})/${k}`, `Check the signs: ${M(`${k}${x} = ${c} - ${y}`)}, not ${M(`${y} - ${c}`)}.`)],
        }),
        () => ({
          f: `${y} = ${k}(${x} + ${c})`, subj: x, rhs: `${y}/${k} - ${c}`,
          steps: [`Divide both sides by ${k}: ${M(`${y}/${k} = ${x} + ${c}`)}.`, `Subtract ${c}: ${M(`${x} = ${y}/${k} - ${c}`)}.`],
          traps: [etrap(`(${y} - ${c})/${k}`, `Undo the operations in reverse order: the bracket was worked out first, so divide by ${k} first.`)],
          note: `(${M(`(${y} - ${k * c})/${k}`)} is also correct.)`,
        }),
        () => ({
          f: `${y} = ${k}(${x} - ${c})`, subj: x, rhs: `${y}/${k} + ${c}`,
          steps: [`Divide both sides by ${k}: ${M(`${y}/${k} = ${x} - ${c}`)}.`, `Add ${c}: ${M(`${x} = ${y}/${k} + ${c}`)}.`],
          traps: [etrap(`(${y} + ${c})/${k}`, `Undo the operations in reverse order: divide by ${k} first, then add ${c}.`)],
          note: `(${M(`(${y} + ${k * c})/${k}`)} is also correct.)`,
        }),
        () => ({
          f: `${y} = ${x}/${k} + ${c}`, subj: x, rhs: `${k}(${y} - ${c})`,
          steps: [`Subtract ${c}: ${M(`${y} - ${c} = ${x}/${k}`)}.`, `Multiply both sides by ${k}: ${M(`${x} = ${k}(${y} - ${c})`)}.`],
          traps: [etrap(`${k}${y} - ${c}`, `Multiply the WHOLE of ${M(`${y} - ${c}`)} by ${k}.`)],
        }),
        () => ({
          f: `${y} = (${x} + ${c})/${k}`, subj: x, rhs: `${k}${y} - ${c}`,
          steps: [`Multiply both sides by ${k}: ${M(`${k}${y} = ${x} + ${c}`)}.`, `Subtract ${c}: ${M(`${x} = ${k}${y} - ${c}`)}.`],
          traps: [etrap(`${k}(${y} - ${c})`, `Undo the ÷ ${k} first (multiply by ${k}), then subtract ${c}.`)],
        }),
        () => ({ f: "P = 4s", subj: "s", rhs: "P/4", steps: [`Divide both sides by 4: ${M("s = P/4")}.`], traps: [etrap("4P", "s is multiplied by 4, so divide by 4.")] }),
        () => ({ f: "A = bh", subj: "h", rhs: "A/b", steps: [`Divide both sides by b: ${M("h = A/b")}.`], traps: [etrap("Ab", "h is multiplied by b, so divide by b.")] }),
        () => ({ f: "s = d/t", subj: "d", rhs: "st", steps: [`Multiply both sides by t: ${M("d = st")}.`], traps: [etrap("s/t", "d is divided by t, so multiply by t to undo it.")] }),
        () => ({ f: "v = u + at", subj: "u", rhs: "v - at", steps: [`Subtract ${M("at")} from both sides: ${M("u = v - at")}.`], traps: [etrap("v + at", "To undo + at, subtract at.")] }),
      ];
      const r3: Array<() => R> = [
        () => ({
          f: "v = u + at", subj: "a", rhs: "(v - u)/t",
          steps: [`Subtract u: ${M("v - u = at")}.`, `Divide by t: ${M("a = (v - u)/t")}.`],
          traps: [etrap("v/t - u", "Subtract u first, then divide the WHOLE of v − u by t.")],
        }),
        () => ({
          f: "P = 2l + 2w", subj: "l", rhs: "(P - 2w)/2",
          steps: [`Subtract 2w: ${M("P - 2w = 2l")}.`, `Divide by 2: ${M("l = (P - 2w)/2")}.`],
          traps: [etrap("P/2 - 2w", "Divide the WHOLE of P − 2w by 2 (the 2w gets halved too).")],
          note: `(${M("l = P/2 - w")} is also correct.)`,
        }),
        () => ({
          f: "A = 1/2 bh", subj: "h", rhs: "2A/b",
          steps: [`Multiply both sides by 2: ${M("2A = bh")}.`, `Divide by b: ${M("h = 2A/b")}.`],
          traps: [etrap("A/(2b)", "To undo halving, multiply by 2 (don't divide).")],
        }),
        () => ({
          f: "s = ((u + v)t)/2", subj: "t", rhs: "2s/(u + v)",
          steps: [`Multiply both sides by 2: ${M("2s = (u + v)t")}.`, `Divide by ${M("(u + v)")}: ${M("t = 2s/(u + v)")}.`],
          traps: [etrap("2s/u + v", "Divide by the WHOLE of u + v — keep it in a bracket.")],
        }),
        () => ({
          f: "F = 1.8C + 32", subj: "C", rhs: "(F - 32)/1.8",
          steps: [`Subtract 32: ${M("F - 32 = 1.8C")}.`, `Divide by 1.8: ${M("C = (F - 32)/1.8")}.`],
          traps: [etrap("F/1.8 - 32", "Subtract 32 first, then divide the WHOLE of F − 32 by 1.8.")],
          note: `(${M("C = 5(F - 32)/9")} is the same thing.)`,
        }),
        // stretch: the subject is squared or square-rooted
        () => {
          const kk = rng.int(2, 9);
          return {
            f: `A = ${kk}r^2`, subj: "r", rhs: `sqrt(A/${kk})`,
            steps: [`Divide by ${kk}: ${M(`A/${kk} = r^2`)}.`, `Square root both sides (r is positive): ${M(`r = sqrt(A/${kk})`)}.`],
            traps: [etrap(`A/${kk}`, `That gives ${M("r^2")}. Take the square root to get r.`)],
            note: "Here r is a length, so it is positive.",
          };
        },
        () => ({
          f: `${y} = ${x}^2 - ${c}`, subj: x, rhs: `sqrt(${y} + ${c})`,
          steps: [`Add ${c}: ${M(`${y} + ${c} = ${x}^2`)}.`, `Square root both sides (${x} is positive): ${M(`${x} = sqrt(${y} + ${c})`)}.`],
          traps: [etrap(`sqrt(${y}) + ${c}`, `Undo the − ${c} first, then square root the WHOLE of ${M(`${y} + ${c}`)}.`), etrap(`${y} + ${c}`, `That is ${M(`${x}^2`)}. Take the square root.`)],
          note: `Assume ${x} is positive.`,
        }),
        () => ({
          f: `${y} = sqrt(${x}) + ${c}`, subj: x, rhs: `(${y} - ${c})^2`,
          steps: [`Subtract ${c}: ${M(`${y} - ${c} = sqrt(${x})`)}.`, `Square both sides: ${M(`${x} = (${y} - ${c})^2`)}.`],
          traps: [etrap(`${y}^2 - ${c}`, `Undo the + ${c} first, then square the WHOLE of ${M(`${y} - ${c}`)}.`)],
          note: `Assume ${y} is at least ${c}.`,
        }),
        () => ({
          f: `${y} = ${k}${x}^2`, subj: x, rhs: `sqrt(${y}/${k})`,
          steps: [`Divide by ${k}: ${M(`${y}/${k} = ${x}^2`)}.`, `Square root both sides (${x} is positive): ${M(`${x} = sqrt(${y}/${k})`)}.`],
          traps: [etrap(`${y}/${k}`, `That is ${M(`${x}^2`)}. Take the square root.`)],
          note: `Assume ${x} is positive.`,
        }),
      ];
      const pool = tier === 1 ? r1 : tier === 2 ? [...r2, ...r1.slice(3)] : [...r3, ...r2.slice(0, 5)];
      const r = rng.pick(pool)();
      const steps = [...r.steps];
      if (r.note && !r.note.startsWith("(")) steps.unshift(r.note);
      if (r.note && r.note.startsWith("(")) steps.push(r.note);
      const assume = r.note && !r.note.startsWith("(") ? ` ${r.note}` : "";
      return {
        prompt: `Make ${r.subj} the subject of ${M(r.f)}.${assume}`,
        answer: { type: "expression", expr: r.rhs, display: M(`${r.subj} = ${r.rhs}`) },
        solution: steps,
        hint: `What has been done to ${r.subj}, and in what order? Undo those steps in reverse order, doing the same to both sides.`,
        traps: r.traps,
      };
    },
  },

  // -------------------------------------------------------------------------
  {
    id: "expressions.expand-double-brackets",
    topicId: TOPIC,
    title: "Expand double brackets (stretch)",
    level: 3,
    guideRef: "double-brackets",
    generate(rng, tier) {
      const v = rng.pick(["x", "y", "n", "a", "t"]);
      // (p v + a)(q v + b)
      let p = 1, qq = 1, a = 2, b = 3, square = false, twoVar = false;
      for (let i = 0; i < 200; i++) {
        square = false; twoVar = false;
        if (tier === 1) { p = 1; qq = 1; a = rng.int(1, 9); b = rng.int(1, 9); }
        else if (tier === 2) {
          p = 1; qq = 1;
          const f = rng.int(0, 3);
          if (f === 0) { a = rng.int(1, 9); b = -rng.int(1, 9); }
          else if (f === 1) { a = -rng.int(1, 9); b = -rng.int(1, 9); }
          else if (f === 2) { a = rng.nonZero(-9, 9); b = a; square = true; }
          else { a = rng.nonZero(-9, 9); b = rng.nonZero(-9, 9); }
          if (a + b === 0) continue;
        } else {
          const f = rng.int(0, 4);
          p = 1; qq = 1;
          if (f === 0) { p = rng.int(2, 3); qq = 1; a = rng.nonZero(-7, 7); b = rng.nonZero(-7, 7); }
          else if (f === 1) { p = rng.int(2, 3); qq = rng.int(2, 3); a = rng.nonZero(-7, 7); b = rng.nonZero(-7, 7); }
          else if (f === 2) { a = rng.int(1, 9); b = -a; }
          else if (f === 3) { p = rng.int(1, 3); qq = p; a = rng.nonZero(-6, 6); b = a; square = true; }
          else { twoVar = true; a = rng.nonZero(-9, 9); b = rng.nonZero(-9, 9); }
          if (!square && !twoVar && p === qq && a === b) continue;
        }
        if (!twoVar && p * b + qq * a === 0 && !(tier === 3 && p === 1 && qq === 1)) continue;
        break;
      }
      if (twoVar) {
        const w = v === "y" ? "x" : "y";
        const [s, t] = v < w ? [v, w] : [w, v];
        const ans = poly([[1, s + t], [b, s], [a, t], [a * b, ""]]);
        const shown = `(${s}${pm(a)})(${t}${pm(b)})`;
        return {
          prompt: `Expand ${M(shown)}.`,
          answer: { type: "expression", expr: ans, form: "simplified" },
          solution: [
            "Multiply each term in the first bracket by each term in the second (a grid helps).",
            `${M(`${s} × ${t} = ${s}${t}`)}, ${M(`${s} × ${bq(b)} = ${term(b, s)}`)}, ${M(`${bq(a)} × ${t} = ${term(a, t)}`)}, ${M(`${bq(a)} × ${bq(b)} = ${a * b}`)}.`,
            `There are no like terms to collect, so the answer is ${M(ans)}.`,
          ],
          hint: "Every term in the first bracket multiplies every term in the second — that's four products.",
          traps: [etrap(poly([[1, s + t], [a * b, ""]]), "You've only multiplied the first terms and the last terms. There are four products altogether.")],
        };
      }
      const A2 = p * qq, B1 = p * b + qq * a, C0 = a * b;
      const ans = poly([[A2, `${v}^2`], [B1, v], [C0, ""]]);
      const L = `${term(p, v)}${pm(a)}`, R = `${term(qq, v)}${pm(b)}`;
      const shown = square ? `(${L})^2` : `(${L})(${R})`;
      const traps: Trap[] = [];
      if (B1 !== 0) traps.push(etrap(poly([[A2, `${v}^2`], [C0, ""]]), square ? `${M(`(${L})^2`)} means ${M(`(${L})(${L})`)} — there is a middle term too.` : "You've missed the middle terms: multiply each term in the first bracket by each term in the second (four products)."));
      if (C0 < 0 || (C0 > 0 && a < 0 && b < 0)) {
        const wrong = poly([[A2, `${v}^2`], [B1, v], [-C0, ""]]);
        traps.push(etrap(wrong, `Check the sign of the last term: ${M(`${bq(a)} × ${bq(b)} = ${C0}`)}.`));
      }
      return {
        prompt: square ? `Expand and simplify ${M(shown)}.` : rng.pick([`Expand and simplify ${M(shown)}.`, `Multiply out and simplify ${M(shown)}.`]),
        answer: { type: "expression", expr: ans, form: "simplified" },
        solution: [
          square ? `${M(`(${L})^2 = (${L})(${L})`)}. Multiply each term in the first bracket by each term in the second.` : "Multiply each term in the first bracket by each term in the second (a grid helps).",
          `${M(`${term(p, v)} × ${term(qq, v)} = ${term(A2, `${v}^2`)}`)}, ${M(`${term(p, v)} × ${bq(b)} = ${term(p * b, v)}`)}, ${M(`${bq(a)} × ${term(qq, v)} = ${term(a * qq, v)}`)}, ${M(`${bq(a)} × ${bq(b)} = ${C0}`)}.`,
          `Add them and collect the middle terms: ${M(`${poly([[A2, `${v}^2`], [p * b, v], [a * qq, v], [C0, ""]])} = ${ans}`)}.`,
        ],
        hint: "Draw a 2 × 2 grid: one bracket along the top, one down the side. Fill in the four products, then collect like terms.",
        traps,
      };
    },
  },
];
