// Procedural skill drills for the "circles" topic.
//
// Exactness: lengths are whole numbers or whole tenths, so exact answers
// (in terms of π, with π = 3.14 or with π = 22/7) are built from integers.
// Calculator answers use Math.PI and are rounded by roundAcc(), which rejects
// any value sitting on a rounding tie so the stated rounding is unambiguous.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { big, clean, num, roundTo, simplify } from "./helpers.ts";

const TOPIC = "circles";
const PI = Math.PI;
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;
const TYPE_PI = "(Type it like 3π or 3pi.)";
const LEAVE_PI = "That's a rounded decimal. The question asks for an exact answer, so leave π in it (like 12π).";

type Tier = 1 | 2 | 3;

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** "a round plate" → "the round plate". */
function the(a: string): string {
  return a.replace(/^an? /, "the ");
}

/** Bounded rejection loop: keep asking `make` until it returns a valid item. */
function retry(make: () => DrillItem | null): DrillItem {
  for (let i = 0; i < 500; i++) {
    const item = make();
    if (item) return item;
  }
  throw new Error("circles drill: could not build a valid question");
}

// ---------------------------------------------------------------------------
// Rounding helpers (calculator answers)
// ---------------------------------------------------------------------------

type Acc = "1dp" | "2dp" | "3sf" | "whole";

interface Rounded {
  value: number;
  dp: number;
  /** The rounded value with its trailing zeros, e.g. "44.0". */
  text: string;
  /** "1 decimal place", "3 significant figures", "the nearest whole number". */
  phrase: string;
}

/** Round x to the accuracy asked; null when x sits (almost) on a rounding tie. */
function roundAcc(x: number, acc: Acc): Rounded | null {
  if (!Number.isFinite(x) || x <= 0) return null;
  let dp: number;
  if (acc === "1dp") dp = 1;
  else if (acc === "2dp") dp = 2;
  else if (acc === "whole") dp = 0;
  else {
    dp = 2 - Math.floor(Math.log10(x));
    if (dp < 0 || dp > 3) return null;
  }
  const s = x * 10 ** dp;
  if (Math.abs(s - Math.floor(s) - 0.5) < 1e-6) return null;
  const value = roundTo(x, dp);
  if (value <= 0) return null;
  if (acc === "3sf" && Math.floor(Math.log10(value)) !== Math.floor(Math.log10(x))) return null;
  const phrase = acc === "3sf" ? "3 significant figures" : dp === 0 ? "the nearest whole number" : `${dp} decimal place${dp === 1 ? "" : "s"}`;
  return { value, dp, text: value.toFixed(dp), phrase };
}

/** A sensible calculator accuracy for the tier (1 d.p. at tier 1; sometimes 3 s.f. or whole numbers later). */
function accFor(rng: Rng, tier: Tier, x: number): Rounded | null {
  const options: Acc[][] = [["3sf", "1dp"], ["1dp"], ["whole", "1dp"]];
  const order: Acc[] = tier === 1 ? ["1dp"] : tier === 2 ? (rng.bool(0.35) ? ["3sf", "1dp"] : ["1dp"]) : rng.pick(options);
  for (const a of order) {
    if (a === "3sf" && (x < 10 || x >= 999.5)) continue;
    if (a === "whole" && x < 100) continue;
    const r = roundAcc(x, a);
    if (r) return r;
  }
  return null;
}

/** Calculator display of an irrational value, truncated: 43.98229… → "43.982…". */
function dots(x: number): string {
  return (Math.floor(x * 1000) / 1000).toFixed(3) + "…";
}

function calcSpec(R: Rounded, unit: string): AnswerSpec {
  return { type: "number", value: R.value, allowFraction: false, display: `${R.text} ${unit}` };
}

function numSpec(v: number, unit: string): AnswerSpec {
  return { type: "number", value: clean(v), display: `${num(v)} ${unit}` };
}

// ---------------------------------------------------------------------------
// Exact answers in terms of π
// ---------------------------------------------------------------------------

interface PiForm {
  /** For the answer checker, e.g. "12pi", "4.5pi", "10pi/3", "64-16pi". */
  expr: string;
  /** For {{ }} display, e.g. "12 pi", "10/3 pi", "64 - 16 pi". */
  tex: string;
  value: number;
  /** Coefficient is a whole number or has at most 2 decimal places. */
  nice: boolean;
}

/** (n/d)·π in simplest form. Terminating coefficients are shown as decimals. */
function piTerm(n: number, d = 1): PiForm {
  const [a, b] = simplify(Math.round(n), Math.round(d));
  const value = (a / b) * PI;
  if (b === 1) return a === 1 ? { expr: "pi", tex: "pi", value, nice: true } : { expr: `${a}pi`, tex: `${a} pi`, value, nice: true };
  if (1000 % b === 0) {
    const c = String(clean(a / b));
    return { expr: `${c}pi`, tex: `${c} pi`, value, nice: 100 % b === 0 };
  }
  return { expr: `${a}pi/${b}`, tex: `${a}/${b} pi`, value, nice: false };
}

/** k ± (π term). */
function combo(k: number, sign: 1 | -1, t: PiForm): PiForm {
  const ks = String(clean(k));
  return {
    expr: `${ks}${sign > 0 ? "+" : "-"}${t.expr}`,
    tex: `${ks} ${sign > 0 ? "+" : "-"} ${t.tex}`,
    value: k + sign * t.value,
    nice: t.nice,
  };
}

function exactSpec(p: PiForm, unit: string): AnswerSpec {
  return { type: "expression", expr: p.expr, display: `{{${p.tex}}} ${unit}` };
}

/** Catches a learner who typed the rounded decimal instead of the exact π form. */
function decimalTrap(v: number): Trap {
  return { spec: { type: "number", value: roundTo(v, 1), tolerance: 0.051 }, feedback: LEAVE_PI };
}

/**
 * False when an exact π value happens to sit within the checker's tolerance of a
 * short decimal (e.g. 11.3π = 35.49999…), which would let "35.5" count as exact.
 */
function exactOk(v: number): boolean {
  for (let dp = 0; dp <= 4; dp++) {
    if (Math.abs(roundTo(v, dp) - v) <= 5e-7 * Math.max(1, Math.abs(v))) return false;
  }
  return true;
}

// ---------------------------------------------------------------------------
// Traps
// ---------------------------------------------------------------------------

interface Cand {
  value: number;
  spec: AnswerSpec;
  feedback: string;
}

/** Keep traps that are positive and clearly different from the answer and from each other. */
function pickTraps(correct: number, cands: Cand[], max = 2): Trap[] {
  const seen = [correct];
  const out: Trap[] = [];
  for (const c of cands) {
    if (out.length >= max) break;
    if (!Number.isFinite(c.value) || c.value <= 0) continue;
    if (seen.some((s) => Math.abs(s - c.value) <= 0.02 * Math.max(Math.abs(s), Math.abs(c.value)))) continue;
    seen.push(c.value);
    out.push({ spec: c.spec, feedback: c.feedback });
  }
  return out;
}

/** Trap for a calculator answer, rounded to the same number of decimal places. */
function rTrap(v: number, dp: number, feedback: string): Cand {
  const x = roundTo(v, dp);
  return { value: x, spec: { type: "number", value: x }, feedback };
}

/** Trap for an exact numeric answer. */
function nTrap(v: number, feedback: string): Cand {
  const x = clean(v);
  return { value: x, spec: { type: "number", value: x }, feedback };
}

/** Trap for an answer in terms of π. */
function pTrap(p: PiForm, feedback: string): Cand {
  return { value: p.value, spec: { type: "expression", expr: p.expr }, feedback };
}

// ---------------------------------------------------------------------------
// SVG helpers
// ---------------------------------------------------------------------------

const INK = "#1f2937";
const SOFT = "#c7d2fe";
const HI = "#2563eb";

type Pt = [number, number];

function f1(n: number): string {
  return String(Math.round(n * 10) / 10);
}

function svgWrap(w: number, h: number, aria: string, body: string): string {
  return `<svg viewBox="0 0 ${w} ${h}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect x="0" y="0" width="${w}" height="${h}" fill="#ffffff"/>${body}</svg>`;
}

function txt(x: number, y: number, s: string, anchor: "start" | "middle" | "end" = "middle"): string {
  return `<text x="${f1(x)}" y="${f1(y)}" font-size="13" font-family="sans-serif" fill="${INK}" stroke="#ffffff" stroke-width="3" paint-order="stroke" text-anchor="${anchor}">${s}</text>`;
}

/** Point at maths angle `deg` (anticlockwise from east) on a circle, in SVG coordinates. */
function polar(cx: number, cy: number, r: number, deg: number): Pt {
  const a = (deg * PI) / 180;
  return [cx + r * Math.cos(a), cy - r * Math.sin(a)];
}

function seg(p: Pt, q: Pt, extra = `stroke="${INK}" stroke-width="2"`): string {
  return `<line x1="${f1(p[0])}" y1="${f1(p[1])}" x2="${f1(q[0])}" y2="${f1(q[1])}" ${extra}/>`;
}

function dot(p: Pt): string {
  return `<circle cx="${f1(p[0])}" cy="${f1(p[1])}" r="3" fill="${INK}"/>`;
}

// ===========================================================================
// 1. Name the part of a circle
// ===========================================================================

type Part = "radius" | "diameter" | "circumference" | "chord" | "arc" | "sector" | "segment" | "tangent";
const BASIC_PARTS: Part[] = ["radius", "diameter", "circumference", "chord"];
const ALL_PARTS: Part[] = ["radius", "diameter", "circumference", "chord", "arc", "sector", "segment", "tangent"];

function partWords(w: string): string[] {
  return [w, `${/^[aeiou]/.test(w) ? "an" : "a"} ${w}`, `the ${w}`];
}

const PART_EXTRA: Record<Part, string[]> = {
  radius: ["radii"],
  diameter: [],
  circumference: ["circumfrence", "circumferance"],
  chord: [],
  arc: ["minor arc", "a minor arc"],
  sector: ["minor sector", "a minor sector"],
  segment: ["minor segment", "a minor segment"],
  tangent: ["tangent line", "a tangent line"],
};

const PART_DESC: Record<Part, { basic: string[]; hard: string[] }> = {
  radius: {
    basic: ["a straight line from the centre of a circle to a point on the circle", "the distance from the centre of a circle to its edge"],
    hard: ["half of a diameter", "any straight line joining the centre of a circle to its circumference"],
  },
  diameter: {
    basic: ["a straight line from one side of a circle to the other that passes through the centre", "the distance straight across a circle through its centre"],
    hard: ["a chord that passes through the centre of the circle", "the longest chord that can be drawn in a circle"],
  },
  circumference: {
    basic: ["the distance all the way around a circle", "the curved line that forms the whole outside edge of a circle"],
    hard: ["the length you would measure by wrapping a piece of string exactly once around a round tin"],
  },
  chord: {
    basic: ["a straight line joining two points on the circumference of a circle", "a straight line that cuts across a circle, with both ends on the circle"],
    hard: ["a straight line with both ends on the circumference that does not have to pass through the centre"],
  },
  arc: {
    basic: ["part of the circumference of a circle", "a curved piece of a circle's edge between two points"],
    hard: ["the curved edge of a slice of round cake"],
  },
  sector: {
    basic: ["the region of a circle between two radii and an arc", "a 'pizza slice' shaped region of a circle"],
    hard: ["the region cut out of a circle by two radii, like a slice of round cake"],
  },
  segment: {
    basic: ["the region of a circle between a chord and an arc", "the region cut off from a circle by a chord"],
    hard: ["the piece you get when you slice off the edge of a round roti prata with one straight cut"],
  },
  tangent: {
    basic: ["a straight line that touches a circle at exactly one point", "a straight line outside a circle that just touches it without crossing it"],
    hard: ["a line that meets a circle at exactly one point and is at right angles to the radius there"],
  },
};

const PART_DEF: Record<Part, string> = {
  radius: "A **radius** goes from the centre of a circle to the circumference. It is half the diameter.",
  diameter: "A **diameter** goes straight across a circle through the centre. It is the longest chord, and it is twice the radius.",
  circumference: "The **circumference** is the perimeter of a circle: the distance all the way round.",
  chord: "A **chord** is a straight line joining two points on the circumference. (A diameter is a chord through the centre.)",
  arc: "An **arc** is part of the circumference: a curved piece of the circle's edge.",
  sector: "A **sector** is the region between two radii and an arc, shaped like a pizza slice.",
  segment: "A **segment** is the region between a chord and an arc.",
  tangent: "A **tangent** is a straight line that touches a circle at exactly one point. It meets the radius there at 90°.",
};

const PART_TRAPS: Record<Part, Array<[string, string]>> = {
  radius: [["diameter", "A diameter goes all the way across through the centre. This only goes from the centre to the edge."]],
  diameter: [
    ["radius", "A radius only goes from the centre to the edge. This goes all the way across."],
    ["chord", "It is a chord, but a special one that passes through the centre, so it has its own name."],
  ],
  circumference: [
    ["perimeter", "Yes, it is the perimeter, but the perimeter of a circle has its own special name."],
    ["arc", "An arc is only part of the way round. This goes all the way round."],
  ],
  chord: [
    ["diameter", "A diameter must pass through the centre. This line doesn't have to, so it has a more general name."],
    ["tangent", "A tangent only touches the circle at one point. This line has both ends on the circle."],
  ],
  arc: [
    ["chord", "A chord is straight. This is a curved piece of the circumference."],
    ["circumference", "The circumference is the whole way round. This is only part of it."],
  ],
  sector: [["segment", "A segment is cut off by a chord (a straight line). This region is bounded by two radii, like a pizza slice."]],
  segment: [["sector", "A sector is bounded by two radii (a pizza slice). This region is cut off by a chord."]],
  tangent: [["chord", "A chord has both ends on the circle. This line only touches the circle at one point."]],
};

const LETTER_PAIRS: Array<[string, string]> = [["A", "B"], ["P", "Q"], ["C", "D"], ["M", "N"], ["X", "Y"], ["S", "T"], ["E", "F"], ["J", "K"]];

function partDiagram(rng: Rng, part: Part, A: string, B: string): { svg: string; what: string; aria: string } {
  const cx = 130, cy = 120, R = 80;
  const P = (deg: number, r = R): Pt => polar(cx, cy, r, deg);
  const lab = (deg: number, s: string): string => {
    const p = P(deg, R + 15);
    return txt(p[0], p[1] + 4, s);
  };
  const hiLine = (p: Pt, q: Pt): string => seg(p, q, `stroke="${HI}" stroke-width="3"`);
  const arcPath = (a1: number, a2: number): string => {
    const p = P(a1), q = P(a2);
    return `M ${f1(p[0])} ${f1(p[1])} A ${R} ${R} 0 0 0 ${f1(q[0])} ${f1(q[1])}`;
  };
  const base = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INK}" stroke-width="2"/>`;
  const a1 = rng.int(0, 11) * 30 + rng.pick([0, 15]);
  let body = base;
  let what = "";
  let aria = "";
  let oDeg = 225;
  switch (part) {
    case "radius":
      body += hiLine([cx, cy], P(a1)) + dot(P(a1)) + lab(a1, A);
      oDeg = a1 + 180;
      what = `the line O${A}`;
      aria = `a line from the centre O to the point ${A} on the circle`;
      break;
    case "diameter":
      body += hiLine(P(a1), P(a1 + 180)) + dot(P(a1)) + dot(P(a1 + 180)) + lab(a1, A) + lab(a1 + 180, B);
      oDeg = a1 + 90;
      what = `the line ${A}${B}`;
      aria = `a line ${A}${B} from one side of the circle to the other through O`;
      break;
    case "chord": {
      const span = rng.pick([70, 90, 110, 130]);
      body += hiLine(P(a1), P(a1 + span)) + dot(P(a1)) + dot(P(a1 + span)) + lab(a1, A) + lab(a1 + span, B);
      oDeg = a1 + span / 2 + 180;
      what = `the line ${A}${B}`;
      aria = `a line ${A}${B} joining two points on the circle, not through O`;
      break;
    }
    case "tangent": {
      const a = rng.int(0, 11) * 30;
      const T = P(a);
      const rad = (a * PI) / 180;
      const ux = -Math.sin(rad), uy = -Math.cos(rad);
      const E1: Pt = [T[0] + 62 * ux, T[1] + 62 * uy];
      const E2: Pt = [T[0] - 62 * ux, T[1] - 62 * uy];
      body += hiLine(E1, E2) + dot(T) + txt(T[0] + 76 * ux, T[1] + 76 * uy + 4, A) + txt(T[0] - 76 * ux, T[1] - 76 * uy + 4, B);
      oDeg = a + 180;
      what = `the line ${A}${B}`;
      aria = `a straight line ${A}${B} outside the circle that meets it at one point`;
      break;
    }
    case "arc": {
      const span = rng.pick([70, 90, 110, 130]);
      body += `<path d="${arcPath(a1, a1 + span)}" fill="none" stroke="${HI}" stroke-width="5"/>` + dot(P(a1)) + dot(P(a1 + span)) + lab(a1, A) + lab(a1 + span, B);
      oDeg = a1 + span / 2 + 180;
      what = `the thick curved line from ${A} to ${B}`;
      aria = `a thick curved part of the circle's edge from ${A} to ${B}`;
      break;
    }
    case "sector": {
      const span = rng.pick([60, 80, 100, 120]);
      body += `<path d="M ${cx} ${cy} L ${arcPath(a1, a1 + span).slice(2)} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>`;
      oDeg = a1 + span / 2 + 180;
      what = "the shaded region";
      aria = "a shaded region bounded by two radii and part of the circle";
      break;
    }
    case "segment": {
      const span = rng.pick([100, 120, 140]);
      body += `<path d="${arcPath(a1, a1 + span)} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>`;
      oDeg = a1 + span / 2 + 180;
      what = "the shaded region";
      aria = "a shaded region between a straight line across the circle and the curved edge";
      break;
    }
    case "circumference":
      body += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${HI}" stroke-width="5"/>`;
      what = "the thick line that goes all the way round the circle";
      aria = "the whole outline of the circle drawn thick";
      break;
  }
  const o = polar(cx, cy, 15, oDeg);
  body += dot([cx, cy]) + txt(o[0], o[1] + 4, "O");
  return { svg: svgWrap(260, 240, `Circle with centre O showing ${aria}`, body), what, aria };
}

const nameThePart: Drill = {
  id: "circles.name-the-part",
  topicId: TOPIC,
  title: "Name the parts of a circle",
  level: 1,
  guideRef: "parts-of-a-circle",
  generate(rng, tier) {
    const part = rng.pick(tier === 1 ? BASIC_PARTS : ALL_PARTS);
    let accept = [...partWords(part), ...PART_EXTRA[part]];
    let prompt: string;
    let diagram: string | undefined;
    if (rng.bool(tier === 1 ? 0.4 : 0.5)) {
      const [A, B] = rng.pick(LETTER_PAIRS);
      const d = partDiagram(rng, part, A, B);
      diagram = d.svg;
      prompt = `${rng.pick(["In the diagram, O is the centre of the circle.", "O is the centre of this circle."])} What is the name of ${d.what}?`;
    } else {
      const pool = tier === 3 && rng.bool(0.65) ? PART_DESC[part].hard : PART_DESC[part].basic;
      const desc = rng.pick(pool);
      prompt = rng.pick([
        `What is the name for ${desc}?`,
        `Which part of a circle is ${desc}?`,
        `${rng.pick(NAMES)} is describing ${desc}. What is the mathematical name for it?`,
      ]);
      if (part === "arc") accept = [...accept, "major arc", "a major arc"];
    }
    return {
      prompt,
      diagram,
      answer: { type: "text", accept, display: part },
      solution: [PART_DEF[part], `So the answer is **${part}**.`],
      hint: "Ask yourself: is it a line or a region? Straight or curved? Does it go through the centre?",
      traps: PART_TRAPS[part].map(([w, feedback]) => ({ spec: { type: "text", accept: partWords(w) }, feedback })),
    };
  },
};

// ===========================================================================
// 2. Radius ↔ diameter
// ===========================================================================

interface Thing {
  a: string;
  unit: string;
  d: [number, number];
}

const RD_THINGS: Thing[] = [
  { a: "a round pizza", unit: "cm", d: [24, 40] },
  { a: "a clock face", unit: "cm", d: [20, 36] },
  { a: "a bicycle wheel", unit: "cm", d: [50, 70] },
  { a: "a coin", unit: "mm", d: [16, 30] },
  { a: "a hula hoop", unit: "cm", d: [70, 100] },
  { a: "a round table", unit: "cm", d: [80, 150] },
  { a: "a circular pond", unit: "m", d: [4, 20] },
  { a: "a roti prata", unit: "cm", d: [18, 26] },
  { a: "an observation wheel", unit: "m", d: [100, 170] },
  { a: "a circular trampoline", unit: "m", d: [2, 5] },
];

function twoCirclesDiagram(D: number): string {
  const cx = 130, cy = 115, R = 95, r = 47.5;
  const body =
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="${cx - r}" cy="${cy}" r="${r}" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="${cx + r}" cy="${cy}" r="${r}" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    seg([cx - R, cy], [cx + R, cy], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    dot([cx - r, cy]) + dot([cx + r, cy]) + dot([cx, cy]) +
    seg([cx - R, 228], [cx + R, 228], `stroke="${INK}" stroke-width="1.5"`) +
    seg([cx - R, 222], [cx - R, 234], `stroke="${INK}" stroke-width="1.5"`) +
    seg([cx + R, 222], [cx + R, 234], `stroke="${INK}" stroke-width="1.5"`) +
    txt(cx, 246, `${D} cm`);
  return svgWrap(260, 254, `A large circle of diameter ${D} cm containing two equal small circles side by side along its diameter`, body);
}

function rdPuzzle(rng: Rng): DrillItem {
  const kind = rng.int(0, 4);
  if (kind === 0) {
    const L10 = 2 * rng.int(30, 150);
    const L = L10 / 10, r = clean(L10 / 20);
    return {
      prompt: `The longest chord that can be drawn in a circle is ${num(L)} cm long. What is the radius of the circle? Give your answer in cm.`,
      answer: numSpec(r, "cm"),
      solution: ["The longest chord passes through the centre, so it is the diameter.", `Diameter = ${num(L)} cm, so radius = ${num(L)} ÷ 2 = ${num(r)} cm.`],
      hint: "Which chord is the longest one you can draw?",
      traps: pickTraps(r, [nTrap(L, "That's the diameter (the longest chord). The radius is half of it.")]),
    };
  }
  if (kind === 1) {
    if (rng.bool()) {
      const s = rng.int(6, 40);
      const r = clean(s / 2);
      return {
        prompt: `A circle fits exactly inside a square, touching all four sides. The square has sides of ${s} cm. What is the radius of the circle? Give your answer in cm.`,
        answer: numSpec(r, "cm"),
        solution: ["The circle touches opposite sides, so its diameter equals the side of the square.", `Diameter = ${s} cm, so radius = ${s} ÷ 2 = ${num(r)} cm.`],
        hint: "Draw it. Which length of the circle stretches from one side of the square to the other?",
        traps: pickTraps(r, [nTrap(s, "That's the diameter of the circle. The radius is half of it.")]),
      };
    }
    const r = rng.int(3, 25);
    return {
      prompt: `A square is drawn around a circle of radius ${r} cm so that the circle touches all four sides. What is the perimeter of the square? Give your answer in cm.`,
      answer: numSpec(8 * r, "cm"),
      solution: [`Each side of the square equals the circle's diameter: 2 × ${r} = ${2 * r} cm.`, `Perimeter = 4 × ${2 * r} = ${8 * r} cm.`],
      hint: "How long is one side of the square compared with the circle?",
      traps: pickTraps(8 * r, [nTrap(4 * r, "The side of the square is the diameter (2 × radius), not the radius.")]),
    };
  }
  if (kind === 2) {
    const r = rng.int(8, 14), n = rng.int(3, 7);
    const L = 2 * r * n;
    return {
      prompt: `${n} identical coins are laid in a straight line, each touching the next. The row is ${L} mm long from end to end. What is the radius of one coin? Give your answer in mm.`,
      answer: numSpec(r, "mm"),
      solution: [`The row is ${n} diameters long, so one diameter = ${L} ÷ ${n} = ${2 * r} mm.`, `Radius = ${2 * r} ÷ 2 = ${r} mm.`],
      hint: "How many diameters fit along the row?",
      traps: pickTraps(r, [nTrap(2 * r, "That's the diameter of one coin. The radius is half of it.")]),
    };
  }
  if (kind === 3) {
    const k = rng.int(3, 15);
    const D = 4 * k;
    return {
      prompt: `Two identical small circles fit inside a large circle. They touch each other, and each one touches the large circle, with all three centres on one straight line (see the diagram). The large circle has diameter ${D} cm. What is the radius of each small circle? Give your answer in cm.`,
      diagram: twoCirclesDiagram(D),
      answer: numSpec(k, "cm"),
      solution: ["The large circle's diameter is made of two small diameters.", `Small diameter = ${D} ÷ 2 = ${2 * k} cm.`, `Small radius = ${2 * k} ÷ 2 = ${k} cm.`],
      hint: "How many small diameters fit across the large circle?",
      traps: pickTraps(k, [nTrap(2 * k, "That's the diameter of a small circle. Halve it for the radius.")]),
    };
  }
  let d1 = 2 * rng.int(2, 15), d2 = 2 * rng.int(2, 15);
  if (d1 === d2) d2 += 2;
  const ans = d1 / 2 + d2 / 2;
  return {
    prompt: `Two circles touch on the outside. One has diameter ${d1} cm and the other has diameter ${d2} cm. How far apart are their centres? Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [
      "From each centre to the touching point is one radius.",
      `Radii: ${d1} ÷ 2 = ${d1 / 2} cm and ${d2} ÷ 2 = ${d2 / 2} cm.`,
      `Distance between centres = ${d1 / 2} + ${d2 / 2} = ${ans} cm.`,
    ],
    hint: "Sketch the two circles. What joins each centre to the point where they touch?",
    traps: pickTraps(ans, [nTrap(d1 + d2, "From each centre to the touching point is a radius, not a diameter.")]),
  };
}

const radiusDiameter: Drill = {
  id: "circles.radius-diameter",
  topicId: TOPIC,
  title: "Radius and diameter",
  level: 1,
  guideRef: "parts-of-a-circle",
  generate(rng, tier) {
    if (tier === 3 && rng.bool(0.7)) return rdPuzzle(rng);
    const t = rng.pick(RD_THINGS);
    const giveD = rng.bool();
    const [lo, hi] = t.d;
    let d10: number;
    if (tier === 1 || rng.bool(0.5)) d10 = 20 * rng.int(Math.ceil(lo / 2), Math.floor(hi / 2));
    else d10 = 2 * rng.int(lo * 5, hi * 5);
    if (tier > 1 && d10 % 20 === 0 && rng.bool(0.5)) d10 += 10; // an odd whole-number diameter → radius ends in .5
    const d = clean(d10 / 10), r = clean(d10 / 20);
    const u = t.unit;
    const name = rng.pick(NAMES);
    if (giveD) {
      const prompt = rng.pick([
        `${cap(t.a)} has a diameter of ${num(d)} ${u}. What is its radius?`,
        `The diameter of a circle is ${num(d)} ${u}. Work out its radius.`,
        ...(u === "m" ? [] : [`${name} measures straight across ${t.a}, through its centre: ${num(d)} ${u}. What is the radius?`]),
      ]);
      return {
        prompt: `${prompt} Give your answer in ${u}.`,
        answer: numSpec(r, u),
        solution: ["The radius is half the diameter: r = d ÷ 2.", `r = ${num(d)} ÷ 2 = ${num(r)} ${u}`],
        hint: "Is the radius bigger or smaller than the diameter?",
        traps: pickTraps(r, [nTrap(2 * d, "You doubled. The radius is half the diameter.")]),
      };
    }
    const prompt = rng.pick([
      `${cap(t.a)} has a radius of ${num(r)} ${u}. What is its diameter?`,
      `A circle has radius ${num(r)} ${u}. Work out its diameter.`,
      ...(u === "m" ? [] : [`${name} measures from the centre of ${t.a} to its edge: ${num(r)} ${u}. How far is it straight across, through the centre?`]),
    ]);
    return {
      prompt: `${prompt} Give your answer in ${u}.`,
      answer: numSpec(d, u),
      solution: ["The diameter is twice the radius: d = 2r.", `d = 2 × ${num(r)} = ${num(d)} ${u}`],
      hint: "The diameter goes all the way across: centre to edge, twice.",
      traps: pickTraps(d, [nTrap(r / 2, "You halved. The diameter is twice the radius.")]),
    };
  },
};

// ===========================================================================
// 3. Discovering π from measurements
// ===========================================================================

const MEASURE_OBJS: Array<{ a: string; d: [number, number] }> = [
  { a: "a dinner plate", d: [20, 28] },
  { a: "a tin lid", d: [7, 12] },
  { a: "a bicycle wheel", d: [55, 70] },
  { a: "a round cake tin", d: [16, 26] },
  { a: "a hula hoop", d: [70, 95] },
  { a: "a wall clock", d: [25, 35] },
  { a: "a mug", d: [7, 10] },
  { a: "a frisbee", d: [20, 28] },
  { a: "a bucket", d: [25, 35] },
];

/** N/D (positive integers) rounded to dp places exactly; null on an exact tie. */
function roundRatio(N: number, D: number, dp: number): number | null {
  const f = 10 ** dp;
  const q = Math.floor((N * f) / D);
  const rem = N * f - q * D;
  if (2 * rem === D) return null;
  return clean((2 * rem > D ? q + 1 : q) / f);
}

/** N/D shown to 4 d.p. (truncated, with … when it keeps going). */
function showRatio(N: number, D: number): string {
  const q = Math.floor((N * 10000) / D);
  if (q * D === N * 10000) return num(clean(N / D));
  return (q / 10000).toFixed(4) + "…";
}

function piRatioItem(rng: Rng, tier: Tier): DrillItem | null {
  const o = rng.pick(MEASURE_OBJS);
  const name = rng.pick(NAMES);
  const d10 = tier === 1 ? 10 * rng.int(o.d[0], o.d[1]) : 2 * rng.int(o.d[0] * 5, o.d[1] * 5);
  const C10 = Math.round(PI * d10) + rng.int(-4, 4);
  const q = roundRatio(C10, d10, 2);
  if (q === null || q < 3.05 || q > 3.25) return null;
  const C = (C10 / 10).toFixed(1);
  const d = tier === 1 ? num(d10 / 10) : (d10 / 10).toFixed(1);
  const useR = tier === 3;
  const r = (d10 / 20).toFixed(2).replace(/0$/, "");
  const given = useR ? `radius ${r} cm` : `diameter ${d} cm`;
  const prompt = rng.pick([
    `${name} wraps a string once around ${o.a} and finds the circumference is ${C} cm. The ${useR ? `radius is ${r}` : `diameter is ${d}`} cm. Work out circumference ÷ diameter. Give your answer to 2 decimal places.`,
    `${name} measures ${o.a}: circumference ${C} cm, ${given}. Use these measurements to estimate π (circumference ÷ diameter). Give your answer to 2 decimal places.`,
    `In a class experiment, ${name} finds that ${o.a} has circumference ${C} cm and ${given}. Work out C ÷ d, where C is the circumference and d is the diameter. Give your answer to 2 decimal places.`,
  ]);
  const solution = [
    ...(useR ? [`The diameter is 2 × ${r} = ${d} cm.`] : []),
    `C ÷ d = ${C} ÷ ${d} = ${showRatio(C10, d10)}`,
    `To 2 decimal places: ${q.toFixed(2)}`,
    "Every circle gives C ÷ d close to π = 3.14159…; the small difference comes from measuring errors.",
  ];
  const cands: Cand[] = [rTrap(d10 / C10, 2, "You worked out diameter ÷ circumference. Divide the circumference by the diameter.")];
  if (useR) cands.unshift(rTrap((2 * C10) / d10, 2, "You divided by the radius. Double it first to get the diameter."));
  return {
    prompt,
    answer: { type: "number", value: q, allowFraction: false, display: q.toFixed(2) },
    solution,
    hint: useR ? "π is circumference ÷ diameter, and you have been given the radius." : "π is circumference ÷ diameter.",
    traps: pickTraps(q, cands),
  };
}

function piEstimateItem(rng: Rng, tier: Tier): DrillItem {
  const name = rng.pick(NAMES);
  if (rng.bool()) {
    const giveR = tier > 1 && rng.bool();
    let d: number;
    do d = giveR ? 2 * rng.int(6, 25) : rng.int(11, 49);
    while (!giveR && d % 10 === 0);
    const x = giveR ? d / 2 : d;
    const ans = 3 * d;
    return {
      prompt: `π is a little more than 3. Using π ≈ 3, estimate the circumference of a circle with ${giveR ? "radius" : "diameter"} ${x} cm.`,
      answer: numSpec(ans, "cm"),
      solution: [
        ...(giveR ? [`Diameter = 2 × ${x} = ${d} cm.`] : []),
        `Circumference ≈ 3 × ${d} = ${ans} cm.`,
        "The true circumference is a little more, because π is a little more than 3.",
      ],
      hint: "Circumference is about 3 diameters.",
      traps: giveR ? pickTraps(ans, [nTrap(3 * x, "Use the diameter: double the radius first.")]) : undefined,
    };
  }
  const thing = rng.pick(["tree trunk", "pillar", "lamp post", "drum", "bin", "water tank"]);
  const d = rng.int(8, 40);
  const C = 3 * d;
  return {
    prompt: `${name} measures the distance around a circular ${thing} as about ${C} cm. Using π ≈ 3, estimate its diameter.`,
    answer: numSpec(d, "cm"),
    solution: ["Circumference ≈ 3 × diameter, so diameter ≈ circumference ÷ 3.", `Diameter ≈ ${C} ÷ 3 = ${d} cm`],
    hint: "Circumference is about 3 diameters. Work backwards.",
    traps: pickTraps(d, [nTrap(3 * C, "You multiplied. To go from circumference back to diameter, divide by 3.")]),
  };
}

function piCompareItem(rng: Rng): DrillItem {
  const k = rng.int(1, 20);
  const d = 7 * k;
  const [n1, n2] = rng.shuffle(NAMES).slice(0, 2);
  const jun = 22 * k;
  const mei = clean((314 * d) / 100);
  const diff = clean(k / 50);
  return {
    prompt: `${n1} uses π ≈ 3.14 and ${n2} uses π ≈ {{22/7}} to work out the circumference of a circle with diameter ${d} cm. How much bigger is ${n2}'s answer? Give your answer in cm.`,
    answer: numSpec(diff, "cm"),
    solution: [
      `${n2}: {{22/7 * ${d}}} = 22 × ${k} = ${jun} cm`,
      `${n1}: 3.14 × ${d} = ${num(mei)} cm`,
      `Difference: ${jun} − ${num(mei)} = ${num(diff)} cm, because {{22/7}} = 3.1428… is slightly bigger than 3.14.`,
    ],
    hint: "Work out both circumferences, then subtract.",
  };
}

const piFromMeasurements: Drill = {
  id: "circles.pi-from-measurements",
  topicId: TOPIC,
  title: "Estimate π and use π ≈ 3",
  level: 1,
  guideRef: "discovering-pi",
  generate(rng, tier) {
    return retry(() => {
      const u = rng.next();
      if (tier === 1) return u < 0.6 ? piRatioItem(rng, tier) : piEstimateItem(rng, tier);
      if (u < 0.55) return piRatioItem(rng, tier);
      if (u < 0.78) return piEstimateItem(rng, tier);
      return piCompareItem(rng);
    });
  },
};

// ===========================================================================
// 4. Circumference with a calculator
// ===========================================================================

const CM_THINGS: Thing[] = [
  { a: "a round plate", unit: "cm", d: [18, 30] },
  { a: "a pizza", unit: "cm", d: [20, 40] },
  { a: "a clock face", unit: "cm", d: [20, 40] },
  { a: "a round cake tin", unit: "cm", d: [15, 30] },
  { a: "a bicycle wheel", unit: "cm", d: [50, 70] },
  { a: "a hula hoop", unit: "cm", d: [70, 100] },
  { a: "a round table", unit: "cm", d: [80, 150] },
  { a: "a roti prata", unit: "cm", d: [18, 26] },
  { a: "a drum", unit: "cm", d: [30, 60] },
];

/** Pick a diameter (in tenths) and whether the radius is given instead. */
function pickD10(rng: Rng, tier: Tier, giveR: boolean, lo: number, hi: number): number {
  if (tier === 1 || rng.bool(0.5)) {
    return giveR ? 20 * rng.int(Math.ceil(lo / 2), Math.floor(hi / 2)) : 10 * rng.int(lo, hi);
  }
  return 2 * rng.int(lo * 5, hi * 5);
}

function circContext(rng: Rng): DrillItem | null {
  const name = rng.pick(NAMES);
  const kind = rng.int(0, 4);
  if (kind === 0) {
    const d = rng.int(50, 70), n = rng.int(10, 60);
    const C = PI * d, dist = (n * C) / 100;
    const R = roundAcc(dist, "1dp");
    if (!R) return null;
    return {
      prompt: `A bicycle wheel has diameter ${d} cm. How far does the bicycle travel when the wheel turns ${n} times? Give your answer in metres to 1 decimal place.`,
      answer: calcSpec(R, "m"),
      solution: [
        `One turn moves the bicycle one circumference: {{C = pi * ${d}}} = ${dots(C)} cm.`,
        `${n} turns: ${n} × ${dots(C)} = ${dots(n * C)} cm.`,
        `Divide by 100 to change to metres: ${dots(dist)} m = ${R.text} m (to 1 decimal place).`,
      ],
      hint: "How far does the bicycle move in one turn of the wheel?",
      traps: pickTraps(R.value, [
        rTrap(n * C, 1, "That's in centimetres. Divide by 100 to change to metres."),
        rTrap((2 * n * C) / 100, 1, "You used 2 × π × diameter. With the diameter, C = πd."),
      ]),
    };
  }
  if (kind === 1) {
    const d = rng.int(50, 70), D = rng.pick([100, 200, 250, 500, 1000]);
    const C = PI * d, turns = (D * 100) / C;
    const fr = turns - Math.floor(turns);
    if (fr < 0.05 || fr > 0.95) return null;
    const ans = Math.floor(turns);
    return {
      prompt: `A wheel has diameter ${d} cm. How many complete turns does it make when it rolls ${D} m in a straight line?`,
      answer: { type: "number", value: ans, display: `${ans} turns` },
      solution: [
        `One turn = one circumference: {{pi * ${d}}} = ${dots(C)} cm.`,
        `${D} m = ${big(D * 100)} cm.`,
        `${big(D * 100)} ÷ ${dots(C)} = ${dots(turns)}`,
        `So it makes ${ans} complete turns (round down: the last turn isn't finished).`,
      ],
      hint: "Work in centimetres. How far does the wheel roll in one turn?",
      traps: pickTraps(ans, [nTrap(ans + 1, "Only complete turns count, so round down.")]),
    };
  }
  if (kind === 2) {
    const r = rng.int(30, 70), n = rng.int(2, 8);
    const dist = n * 2 * PI * r;
    const R = roundAcc(dist, "whole");
    if (!R) return null;
    return {
      prompt: `A circular running track has radius ${r} m. ${name} runs ${n} laps. How far does ${name} run? Give your answer to the nearest metre.`,
      answer: calcSpec(R, "m"),
      solution: [`One lap: {{C = 2 pi r = 2 * pi * ${r}}} = ${dots(2 * PI * r)} m.`, `${n} laps: ${n} × ${dots(2 * PI * r)} = ${dots(dist)} m`, `= ${R.text} m to the nearest metre.`],
      hint: "One lap is one circumference.",
      traps: pickTraps(R.value, [
        rTrap(n * PI * r, 0, "You used the radius as if it were the diameter. One lap is 2πr."),
        rTrap(2 * PI * r, 0, `That's only one lap. ${name} runs ${n} laps.`),
      ]),
    };
  }
  if (kind === 3) {
    const d = rng.int(100, 170);
    const C = PI * d;
    const R = roundAcc(C, "3sf");
    if (!R) return null;
    return {
      prompt: `An observation wheel has a diameter of ${d} m. How far does a capsule on its rim travel in one full turn? Give your answer to 3 significant figures.`,
      answer: calcSpec(R, "m"),
      solution: [`One turn is one circumference: {{C = pi d = pi * ${d}}} = ${dots(C)} m.`, `= ${R.text} m to 3 significant figures.`],
      hint: "The capsule travels once around the circle.",
      traps: pickTraps(R.value, [rTrap(2 * C, 0, "You used 2 × π × diameter. With the diameter, C = πd.")]),
    };
  }
  const r10 = rng.int(15, 60);
  const r = r10 / 10;
  const C = 2 * PI * r;
  const R = roundAcc(C, "1dp");
  if (!R) return null;
  return {
    prompt: `A circular flower bed has radius ${num(r)} m. How much edging is needed to go once around it? Give your answer in metres to 1 decimal place.`,
    answer: calcSpec(R, "m"),
    solution: [`The edging goes round the circumference: {{C = 2 pi r = 2 * pi * ${num(r)}}}`, `= ${dots(C)} m = ${R.text} m (to 1 decimal place).`],
    hint: "Edging goes round the outside. Which formula uses the radius?",
    traps: pickTraps(R.value, [
      rTrap(PI * r, 1, "You used the radius as if it were the diameter. C = 2πr."),
      rTrap(PI * r * r, 1, "That's the area (πr²). Edging goes round the edge."),
    ]),
  };
}

const circumferenceCalc: Drill = {
  id: "circles.circumference",
  topicId: TOPIC,
  title: "Circumference with a calculator",
  level: 1,
  guideRef: "circumference",
  generate(rng, tier) {
    return retry(() => {
      if (tier === 3 && rng.bool(0.6)) return circContext(rng);
      const giveR = rng.bool();
      const ctx = rng.bool(0.35) ? rng.pick(CM_THINGS) : null;
      const [lo, hi] = ctx ? ctx.d : tier === 1 ? [4, 30] : [5, 80];
      const d10 = pickD10(rng, tier, giveR, lo, hi);
      const d = clean(d10 / 10), r = clean(d10 / 20);
      const x = giveR ? r : d;
      const what = giveR ? "radius" : "diameter";
      const C = PI * d;
      const R = accFor(rng, tier, C);
      if (!R) return null;
      const prompt = ctx
        ? rng.pick([
            `${cap(ctx.a)} has a ${what} of ${num(x)} cm. Work out its circumference.`,
            `${cap(ctx.a)} has a ${what} of ${num(x)} cm. How far is it all the way round its edge?`,
          ])
        : rng.pick([
            `A circle has ${what} ${num(x)} cm. Work out its circumference.`,
            `Work out the circumference of a circle with ${what} ${num(x)} cm.`,
            `Find the distance all the way round a circle of ${what} ${num(x)} cm.`,
          ]);
      const solution = giveR
        ? [`The radius is ${num(r)} cm, so use {{C = 2 pi r}}.`, `{{C = 2 * pi * ${num(r)}}} = ${dots(C)} cm`, `= ${R.text} cm (to ${R.phrase})`]
        : [`The diameter is ${num(d)} cm, so use {{C = pi d}}.`, `{{C = pi * ${num(d)}}} = ${dots(C)} cm`, `= ${R.text} cm (to ${R.phrase})`];
      const cands = giveR
        ? [
            rTrap(PI * r, R.dp, "You used the radius as if it were the diameter. C = 2πr, or double the radius first."),
            rTrap(PI * r * r, R.dp, "That's the area (πr²). Circumference is 2πr."),
          ]
        : [
            rTrap(2 * PI * d, R.dp, "You doubled the diameter. With the diameter, C = πd. (2πr is for the radius.)"),
            rTrap((PI * d * d) / 4, R.dp, "That's the area. Circumference is πd."),
          ];
      return {
        prompt: `${prompt} Give your answer to ${R.phrase}.`,
        answer: calcSpec(R, "cm"),
        solution,
        hint: giveR ? "You have the radius. C = 2πr (or double it to get the diameter and use C = πd)." : "You have the diameter, so C = πd.",
        traps: pickTraps(R.value, cands),
      };
    });
  },
};

// ===========================================================================
// 5. Circumference without a calculator (exact, π = 3.14, π = 22/7)
// ===========================================================================

const SMALL_THINGS = ["a round coaster", "a circular badge", "a round mirror", "a circular plate", "a round biscuit tin", "a circular sticker"];

function circExactTerms(rng: Rng, tier: Tier): DrillItem | null {
  const giveR = rng.bool();
  let x10: number;
  if (tier === 1) x10 = 10 * rng.int(2, giveR ? 15 : 30);
  else if (tier === 2) x10 = rng.bool(0.6) ? 10 * rng.int(2, giveR ? 25 : 50) : 5 * (2 * rng.int(1, giveR ? 12 : 24) + 1);
  else x10 = rng.int(11, giveR ? 99 : 150);
  const x = clean(x10 / 10);
  const what = giveR ? "radius" : "diameter";
  const ans = piTerm(giveR ? 2 * x10 : x10, 10);
  if (!exactOk(ans.value)) return null;
  const prompt = rng.pick([
    `A circle has ${what} ${num(x)} cm. Find its circumference in terms of π.`,
    `Work out the exact circumference of a circle with ${what} ${num(x)} cm. Give your answer in terms of π.`,
    `${cap(rng.pick(SMALL_THINGS))} has a ${what} of ${num(x)} cm. Write its circumference in terms of π.`,
  ]);
  const solution = giveR
    ? [`With the radius, use {{C = 2 pi r}}.`, `{{C = 2 * pi * ${num(x)} = ${ans.tex}}} cm`, "Leaving π as a symbol keeps the answer exact."]
    : [`With the diameter, use {{C = pi d}}.`, `{{C = pi * ${num(x)} = ${ans.tex}}} cm`, "Leaving π as a symbol keeps the answer exact."];
  const cands = giveR
    ? [
        pTrap(piTerm(x10, 10), `That's π × radius. The circumference is π × diameter, and the diameter is 2 × ${num(x)}.`),
        pTrap(piTerm(x10 * x10, 100), "That's πr², the area. Circumference is 2πr."),
      ]
    : [
        pTrap(piTerm(2 * x10, 10), "You doubled the diameter. With the diameter, C = πd."),
        pTrap(piTerm(x10 * x10, 400), "That's the area. Circumference is πd."),
      ];
  return {
    prompt: `${prompt} ${TYPE_PI}`,
    answer: exactSpec(ans, "cm"),
    solution,
    hint: giveR ? "C = 2πr. Multiply the numbers and keep π as a letter." : "C = πd. Keep π as a letter.",
    traps: [...pickTraps(ans.value, cands), decimalTrap(ans.value)],
  };
}

function circExactCompare(rng: Rng): DrillItem | null {
  const a = rng.int(2, 12);
  const b = rng.int(2 * a + 2, 2 * a + 20);
  const longer = rng.bool();
  const ans = piTerm(longer ? b - 2 * a : b + 2 * a);
  if (!exactOk(ans.value)) return null;
  const prompt = longer
    ? `Circle A has radius ${a} cm. Circle B has diameter ${b} cm. How much longer is the circumference of circle B than the circumference of circle A? Give your answer in terms of π.`
    : `Circle A has radius ${a} cm and circle B has diameter ${b} cm. Work out the total of their two circumferences. Give your answer in terms of π.`;
  return {
    prompt: `${prompt} ${TYPE_PI}`,
    answer: exactSpec(ans, "cm"),
    solution: [
      `Circle A: {{C = 2 pi r = 2 * pi * ${a} = ${2 * a} pi}} cm`,
      `Circle B: {{C = pi d = pi * ${b} = ${b} pi}} cm`,
      longer ? `Difference: {{${b} pi - ${2 * a} pi = ${ans.tex}}} cm` : `Total: {{${b} pi + ${2 * a} pi = ${ans.tex}}} cm`,
    ],
    hint: "Find each circumference in terms of π first. Watch which one you were given the radius for.",
    traps: [
      ...pickTraps(ans.value, [pTrap(piTerm(longer ? b - a : b + a), "Circle A's circumference is 2πr, so use its diameter, 2 × the radius.")]),
      decimalTrap(ans.value),
    ],
  };
}

function circExact314(rng: Rng, tier: Tier): DrillItem {
  const giveR = rng.bool();
  let x10: number;
  if (tier === 1) x10 = 10 * rng.int(giveR ? 2 : 3, giveR ? 10 : 20);
  else if (tier === 2) x10 = 10 * rng.int(giveR ? 2 : 3, giveR ? 25 : 50);
  else x10 = 5 * rng.int(3, 25);
  const x = clean(x10 / 10);
  const d10 = giveR ? 2 * x10 : x10;
  const d = clean(d10 / 10);
  const C = clean((314 * d10) / 1000);
  const what = giveR ? "radius" : "diameter";
  const prompt = rng.pick([
    `Use π = 3.14 to work out the circumference of a circle with ${what} ${num(x)} cm.`,
    `Taking π as 3.14, find the circumference of a circle with ${what} ${num(x)} cm.`,
    `${cap(rng.pick(SMALL_THINGS))} has a ${what} of ${num(x)} cm. Using π = 3.14, work out its circumference.`,
  ]);
  const solution = [...(giveR ? [`Diameter = 2 × ${num(x)} = ${num(d)} cm.`] : []), `C = π × d = 3.14 × ${num(d)} = ${num(C)} cm`];
  const cands = giveR
    ? [
        nTrap((314 * x10) / 1000, "You used the radius as if it were the diameter. Double the radius first."),
        nTrap((314 * x10 * x10) / 10000, "That's the area (πr²). Circumference is π × d."),
      ]
    : [nTrap((628 * d10) / 1000, "You doubled the diameter. With the diameter, C = π × d.")];
  return {
    prompt: `${prompt} Give your answer in cm.`,
    answer: numSpec(C, "cm"),
    solution,
    hint: giveR ? "Find the diameter first, then multiply by 3.14." : "C = π × d, so multiply the diameter by 3.14.",
    traps: pickTraps(C, cands),
  };
}

function circExact227(rng: Rng, tier: Tier): DrillItem {
  const giveR = rng.bool();
  let k: number; // diameter = 7k
  let x: number;
  if (giveR) {
    if (tier === 3) {
      k = rng.int(1, 9);
      x = clean((7 * k) / 2);
    } else if (rng.bool(0.7)) {
      k = 2 * rng.int(1, 6);
      x = (7 * k) / 2;
    } else {
      k = rng.pick([1, 3]);
      x = clean((7 * k) / 2);
    }
  } else {
    k = rng.int(1, tier === 3 ? 20 : 10);
    x = 7 * k;
  }
  const d = 7 * k;
  const C = 22 * k;
  const what = giveR ? "radius" : "diameter";
  const solution = [
    ...(giveR ? [`Diameter = 2 × ${num(x)} = ${d} cm.`] : []),
    `{{C = pi d = 22/7 * ${d}}}`,
    `${d} ÷ 7 = ${k}, and 22 × ${k} = ${C}, so C = ${C} cm.`,
  ];
  const cands = giveR
    ? [nTrap((22 * x) / 7, "You used the radius as if it were the diameter. Double the radius first.")]
    : [nTrap(44 * k, "You doubled the diameter. With the diameter, C = π × d.")];
  return {
    prompt: `${rng.pick(["Use π = {{22/7}} to work out", "Taking π as {{22/7}}, find"])} the circumference of a circle with ${what} ${num(x)} cm. Give your answer in cm.`,
    answer: numSpec(C, "cm"),
    solution,
    hint: "Divide the diameter by 7 first, then multiply by 22.",
    traps: pickTraps(C, cands),
  };
}

const circumferenceExact: Drill = {
  id: "circles.circumference-exact",
  topicId: TOPIC,
  title: "Circumference in terms of π, or with π = 3.14 or 22/7",
  level: 2,
  guideRef: "circumference",
  generate(rng, tier) {
    return retry(() => {
      const u = rng.next();
      if (tier === 1) return u < 0.6 ? circExactTerms(rng, tier) : circExact314(rng, tier);
      if (tier === 2) return u < 0.4 ? circExactTerms(rng, tier) : u < 0.7 ? circExact314(rng, tier) : circExact227(rng, tier);
      if (u < 0.3) return circExactCompare(rng);
      if (u < 0.55) return circExactTerms(rng, tier);
      if (u < 0.8) return circExact314(rng, tier);
      return circExact227(rng, tier);
    });
  },
};

// ===========================================================================
// 6. Radius or diameter from the circumference
// ===========================================================================

function rFromCExact(rng: Rng, tier: Tier): DrillItem {
  const askR = rng.bool();
  const c = tier === 1 ? 2 * rng.int(2, 20) : rng.int(3, tier === 2 ? 50 : 99);
  const r = clean(c / 2);
  const ans = askR ? r : c;
  return {
    prompt: `A circle has a circumference of {{${c} pi}} cm. Find its ${askR ? "radius" : "diameter"}. Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [
      `{{C = pi d}}, so {{${c} pi = pi * d}}.`,
      `Divide both sides by π: d = ${c} cm.`,
      ...(askR ? [`Radius = ${c} ÷ 2 = ${num(r)} cm.`] : []),
    ],
    hint: "C = πd. What must d be to make π × d equal the circumference?",
    traps: pickTraps(ans, [
      askR ? nTrap(c, "That's the diameter. The radius is half of it.") : nTrap(r, "That's the radius. The diameter is twice it."),
    ]),
  };
}

function rFromC314(rng: Rng, tier: Tier): DrillItem {
  const askR = rng.bool();
  const d = tier === 1 ? 2 * rng.int(2, 15) : rng.int(3, 60);
  const C = clean((314 * d) / 100);
  const r = clean(d / 2);
  const ans = askR ? r : d;
  const what = askR ? "radius" : "diameter";
  const prompt = rng.pick([
    `Using π = 3.14, a circle has a circumference of ${num(C)} cm. Work out its ${what}.`,
    `${rng.pick(NAMES)} measures the circumference of ${rng.pick(SMALL_THINGS)} as ${num(C)} cm. Using π = 3.14, find its ${what}.`,
  ]);
  return {
    prompt: `${prompt} Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [`C = π × d, so d = C ÷ π.`, `d = ${num(C)} ÷ 3.14 = ${d} cm`, ...(askR ? [`r = ${d} ÷ 2 = ${num(r)} cm`] : [])],
    hint: "Work backwards: undo × π by dividing by 3.14.",
    traps: pickTraps(ans, [askR ? nTrap(d, "That's the diameter. The radius is half of it.") : nTrap(r, "That's the radius. The diameter is twice it.")]),
  };
}

function rFromCCalc(rng: Rng, tier: Tier): DrillItem | null {
  const askR = rng.bool();
  const C = tier === 1 || rng.bool(0.5) ? rng.int(10, 120) : clean(rng.int(100, 1500) / 10);
  const d = C / PI, r = d / 2;
  const x = askR ? r : d;
  const R = accFor(rng, tier === 1 ? 1 : 2, x);
  if (!R) return null;
  const what = askR ? "radius" : "diameter";
  return {
    prompt: `${rng.pick([`A circle has a circumference of ${num(C)} cm.`, `The circumference of a circle is ${num(C)} cm.`])} Work out its ${what}. Give your answer to ${R.phrase}.`,
    answer: calcSpec(R, "cm"),
    solution: [
      `{{C = pi d}}, so {{d = C / pi}}.`,
      `{{d = ${num(C)} / pi}} = ${dots(d)} cm`,
      ...(askR ? [`{{r = d / 2}} = ${dots(r)} cm`] : []),
      `= ${R.text} cm (to ${R.phrase})`,
    ],
    hint: "Work backwards from C = πd: divide by π.",
    traps: pickTraps(R.value, [
      askR ? rTrap(d, R.dp, "That's the diameter (C ÷ π). Halve it for the radius.") : rTrap(r, R.dp, "That's the radius. The diameter is C ÷ π."),
      askR ? rTrap(C / 2, R.dp, "Don't forget to divide by π.") : rTrap(C * PI, R.dp, "You multiplied by π. To undo × π, divide by π."),
    ]),
  };
}

function rFromCContext(rng: Rng): DrillItem | null {
  const kind = rng.int(0, 3);
  if (kind === 0) {
    const L = rng.int(20, 100);
    const r = L / (2 * PI);
    const R = roundAcc(r, "1dp");
    if (!R) return null;
    return {
      prompt: `A piece of string ${L} cm long is bent into a circle, with the ends just meeting. Find the radius of the circle. Give your answer to 1 decimal place.`,
      answer: calcSpec(R, "cm"),
      solution: [`The string is the circumference: {{2 pi r = ${L}}}.`, `{{r = ${L} / (2 pi)}} = ${dots(r)} cm`, `= ${R.text} cm (to 1 decimal place)`],
      hint: "The length of string becomes the circumference.",
      traps: pickTraps(R.value, [rTrap(L / PI, 1, "That's the diameter (C ÷ π). Halve it for the radius.")]),
    };
  }
  if (kind === 1) {
    const X10 = rng.int(15, 40);
    const X = X10 / 10;
    const d = (X10 * 10) / PI;
    const R = roundAcc(d, "whole");
    if (!R) return null;
    return {
      prompt: `The trunk of a rain tree has a circumference of ${num(X)} m. Find its diameter in centimetres, to the nearest centimetre.`,
      answer: calcSpec(R, "cm"),
      solution: [`Change to centimetres first: ${num(X)} m = ${X10 * 10} cm.`, `{{d = C / pi = ${X10 * 10} / pi}} = ${dots(d)} cm`, `= ${R.text} cm to the nearest centimetre.`],
      hint: "C = πd, so d = C ÷ π. Watch the units.",
      traps: pickTraps(R.value, [rTrap(d / 2, 0, "That's the radius. The diameter is C ÷ π.")]),
    };
  }
  if (kind === 2) {
    const L = 10 * rng.int(20, 60);
    const r = L / (2 * PI);
    const R = roundAcc(r, "whole");
    if (!R) return null;
    return {
      prompt: `One lap of a circular running track is ${L} m. Find the radius of the track, to the nearest metre.`,
      answer: calcSpec(R, "m"),
      solution: [`One lap is the circumference: {{2 pi r = ${L}}}.`, `{{r = ${L} / (2 pi)}} = ${dots(r)} m`, `= ${R.text} m to the nearest metre.`],
      hint: "Which formula links the radius and the circumference?",
      traps: pickTraps(R.value, [rTrap(L / PI, 0, "That's the diameter (C ÷ π). Halve it for the radius.")]),
    };
  }
  const D = rng.int(120, 220);
  const d = D / PI;
  const R = roundAcc(d, "1dp");
  if (!R) return null;
  return {
    prompt: `A wheel rolls ${D} cm along the ground in one complete turn. Find the diameter of the wheel. Give your answer to 1 decimal place.`,
    answer: calcSpec(R, "cm"),
    solution: [`In one turn the wheel rolls one circumference, so C = ${D} cm.`, `{{d = C / pi = ${D} / pi}} = ${dots(d)} cm`, `= ${R.text} cm (to 1 decimal place)`],
    hint: "How far does a wheel roll in one turn?",
    traps: pickTraps(R.value, [rTrap(d / 2, 1, "That's the radius. The diameter is C ÷ π.")]),
  };
}

const radiusFromCircumference: Drill = {
  id: "circles.radius-from-circumference",
  topicId: TOPIC,
  title: "Find the radius or diameter from the circumference",
  level: 2,
  guideRef: "circumference",
  generate(rng, tier) {
    return retry(() => {
      const u = rng.next();
      if (tier === 3 && u < 0.45) return rFromCContext(rng);
      if (u < 0.6 + (tier === 3 ? 0.1 : 0)) return u < 0.3 ? rFromCExact(rng, tier) : rFromC314(rng, tier);
      return rFromCCalc(rng, tier);
    });
  },
};

// ===========================================================================
// 7. Area of a circle
// ===========================================================================

function areaCalc(rng: Rng, tier: Tier): DrillItem | null {
  const giveR = tier === 1 ? rng.bool(0.7) : rng.bool();
  const ctx = tier > 1 && rng.bool(0.35) ? rng.pick(CM_THINGS) : null;
  const [lo, hi] = ctx ? ctx.d : tier === 1 ? [4, 24] : [4, 60];
  const d10 = pickD10(rng, tier, giveR, lo, hi);
  const d = clean(d10 / 10), r = clean(d10 / 20);
  const x = giveR ? r : d;
  const what = giveR ? "radius" : "diameter";
  const A = PI * r * r;
  const R = accFor(rng, tier, A);
  if (!R) return null;
  const prompt = ctx
    ? `${cap(ctx.a)} has a ${what} of ${num(x)} cm. Work out the area of ${the(ctx.a)}.`
    : rng.pick([`A circle has ${what} ${num(x)} cm. Work out its area.`, `Find the area of a circle with ${what} ${num(x)} cm.`]);
  const solution = [
    ...(giveR ? [] : [`Radius = ${num(d)} ÷ 2 = ${num(r)} cm.`]),
    `{{A = pi r^2 = pi * ${num(r)}^2}} = ${dots(A)} cm²`,
    `= ${R.text} cm² (to ${R.phrase})`,
  ];
  const cands = giveR
    ? [
        rTrap(2 * PI * r, R.dp, "That's 2πr, the circumference (or you doubled r instead of squaring it). Area is πr²."),
        rTrap(PI * r, R.dp, "You multiplied by r instead of r². Square the radius first."),
      ]
    : [
        rTrap(PI * d * d, R.dp, "You used the diameter in πr². Halve it first to get the radius."),
        rTrap(PI * d, R.dp, "That's πd, the circumference. Area is πr²."),
      ];
  return {
    prompt: `${prompt} Give your answer in cm² to ${R.phrase}.`,
    answer: calcSpec(R, "cm²"),
    solution,
    hint: giveR ? "A = πr². Square the radius before multiplying by π." : "Area needs the radius. Halve the diameter first.",
    traps: pickTraps(R.value, cands),
  };
}

function areaTerms(rng: Rng, tier: Tier): DrillItem | null {
  const giveR = rng.bool();
  let d10: number;
  if (tier === 1) d10 = 20 * rng.int(2, 12);
  else if (tier === 2) d10 = giveR ? 20 * rng.int(2, 20) : 10 * rng.int(3, 40);
  else d10 = giveR ? 10 * (2 * rng.int(1, 12) + 1) : 20 * rng.int(5, 30);
  const d = clean(d10 / 10), r = clean(d10 / 20);
  const x = giveR ? r : d;
  const what = giveR ? "radius" : "diameter";
  const ans = piTerm(d10 * d10, 400);
  if (!exactOk(ans.value)) return null;
  const r2 = clean(r * r);
  const prompt = rng.pick([
    `A circle has ${what} ${num(x)} cm. Find its area in terms of π.`,
    `Work out the exact area of a circle with ${what} ${num(x)} cm. Give your answer in terms of π.`,
  ]);
  const cands = giveR
    ? [pTrap(piTerm(2 * d10, 20), "That's 2πr, the circumference (or you doubled r instead of squaring it). Area is πr²."), pTrap(piTerm(d10 * d10, 100), "You used the diameter. Area uses the radius.")]
    : [pTrap(piTerm(d10 * d10, 100), "You used the diameter in πr². Halve it first to get the radius."), pTrap(piTerm(d10, 10), "That's πd, the circumference. Area is πr².")];
  return {
    prompt: `${prompt} ${TYPE_PI}`,
    answer: exactSpec(ans, "cm²"),
    solution: [...(giveR ? [] : [`Radius = ${num(d)} ÷ 2 = ${num(r)} cm.`]), `Square the radius: {{${num(r)}^2 = ${num(r2)}}}.`, `{{A = pi r^2 = ${ans.tex}}} cm²`],
    hint: "A = πr². Square the radius and keep π as a letter.",
    traps: [...pickTraps(ans.value, cands), decimalTrap(ans.value)],
  };
}

function area314(rng: Rng, tier: Tier): DrillItem {
  const giveR = tier === 1 ? true : rng.bool();
  let r10: number;
  if (tier === 1) r10 = 10 * rng.int(2, 10);
  else if (tier === 2) r10 = 10 * rng.int(2, 15);
  else r10 = 5 * rng.int(3, 25);
  const r = clean(r10 / 10), d = clean(r10 / 5);
  const x = giveR ? r : d;
  const A = clean((314 * r10 * r10) / 10000);
  const what = giveR ? "radius" : "diameter";
  return {
    prompt: `${rng.pick(["Use π = 3.14 to work out", "Taking π as 3.14, find"])} the area of a circle with ${what} ${num(x)} cm. Give your answer in cm².`,
    answer: numSpec(A, "cm²"),
    solution: [...(giveR ? [] : [`Radius = ${num(d)} ÷ 2 = ${num(r)} cm.`]), `{{${num(r)}^2 = ${num(clean(r * r))}}}`, `A = π × r² = 3.14 × ${num(clean(r * r))} = ${num(A)} cm²`],
    hint: giveR ? "Square the radius first, then multiply by 3.14." : "Halve the diameter, square it, then multiply by 3.14.",
    traps: pickTraps(
      A,
      giveR
        ? [nTrap((628 * r10) / 1000, "That's 2 × 3.14 × r, the circumference. Area is π × r².")]
        : [nTrap((314 * 4 * r10 * r10) / 10000, "You used the diameter in πr². Halve it first to get the radius.")],
    ),
  };
}

function areaContext(rng: Rng): DrillItem | null {
  const kind = rng.int(0, 2);
  if (kind === 0) {
    let D = 30, d = 20;
    for (let i = 0; i < 50; i++) {
      D = rng.pick([28, 30, 32, 34, 36, 40]);
      d = rng.pick([16, 18, 20, 22]);
      if (D * D > 2 * d * d + 40) break;
    }
    if (D * D <= 2 * d * d + 40) return null;
    const big2 = (D / 2) ** 2, small2 = 2 * (d / 2) ** 2;
    const coef = big2 - small2;
    const exact = rng.bool();
    const steps = [`Large: radius ${D / 2} cm, area {{pi * ${D / 2}^2 = ${big2} pi}} cm²`, `Two small: radius ${d / 2} cm, area {{2 * pi * ${d / 2}^2 = ${small2} pi}} cm²`];
    const base = `A large pizza has diameter ${D} cm. A small pizza has diameter ${d} cm. How much more pizza (by area) do you get from one large pizza than from two small pizzas?`;
    const cands = (dp: number | null): Cand[] => {
      const one = (D / 2) ** 2 - (d / 2) ** 2, diam = D * D - 2 * d * d;
      return dp === null
        ? [pTrap(piTerm(one), "There are two small pizzas, so double the small area."), pTrap(piTerm(diam), "You used the diameters. Halve them to get the radii.")]
        : [rTrap(PI * one, dp, "There are two small pizzas, so double the small area."), rTrap(PI * diam, dp, "You used the diameters. Halve them to get the radii.")];
    };
    if (exact) {
      const ans = piTerm(coef);
      if (!exactOk(ans.value)) return null;
      return {
        prompt: `${base} Give your answer in terms of π. ${TYPE_PI}`,
        answer: exactSpec(ans, "cm²"),
        solution: [...steps, `Difference: {{${big2} pi - ${small2} pi = ${ans.tex}}} cm²`],
        hint: "Find the area of the large pizza and the total area of two small ones.",
        traps: [...pickTraps(ans.value, cands(null)), decimalTrap(ans.value)],
      };
    }
    const v = coef * PI;
    const R = roundAcc(v, "1dp");
    if (!R) return null;
    return {
      prompt: `${base} Give your answer in cm² to 1 decimal place.`,
      answer: calcSpec(R, "cm²"),
      solution: [...steps, `Difference: {{${coef} pi}} = ${dots(v)} cm² = ${R.text} cm²`],
      hint: "Find the area of the large pizza and the total area of two small ones.",
      traps: pickTraps(R.value, cands(1)),
    };
  }
  if (kind === 1) {
    const d = rng.int(6, 20), c = rng.pick([5, 10, 20]);
    const r = d / 2, A = PI * r * r, q = A / c;
    const fr = q - Math.floor(q);
    if (fr < 0.05 || fr > 0.95) return null;
    const ans = Math.ceil(q);
    const q2 = (PI * d * d) / c;
    const fr2 = q2 - Math.floor(q2);
    return {
      prompt: `A circular lawn has diameter ${d} m. One box of grass seed covers ${c} m². How many boxes are needed to cover the whole lawn?`,
      answer: { type: "number", value: ans, display: `${ans} boxes` },
      solution: [`Radius = ${d} ÷ 2 = ${num(r)} m.`, `Area = {{pi * ${num(r)}^2}} = ${dots(A)} m²`, `${dots(A)} ÷ ${c} = ${dots(q)}`, `Round up: ${ans} boxes (${ans - 1} boxes would not be enough).`],
      hint: "Find the area of the lawn first. Can you buy part of a box?",
      traps: pickTraps(ans, [
        nTrap(ans - 1, `${ans - 1} boxes would leave part of the lawn bare. Round up.`),
        ...(fr2 > 0.001 ? [nTrap(Math.ceil(q2), "You used the diameter in πr². Halve it first to get the radius.")] : []),
      ]),
    };
  }
  const rc = rng.int(50, 150);
  const rm = rc / 100;
  const A = PI * rm * rm;
  const R = roundAcc(A, "2dp");
  if (!R) return null;
  return {
    prompt: `A circular rug has radius ${rc} cm. Work out its area in m². Give your answer to 2 decimal places.`,
    answer: calcSpec(R, "m²"),
    solution: [`Change to metres first: ${rc} cm = ${num(rm)} m.`, `{{A = pi r^2 = pi * ${num(rm)}^2}} = ${dots(A)} m²`, `= ${R.text} m² (to 2 decimal places)`],
    hint: "Change the radius to metres before you square it.",
    traps: pickTraps(R.value, [rTrap((PI * rc * rc) / 100, 2, "1 m² = 10 000 cm², not 100 cm². Change the radius to metres before squaring.")]),
  };
}

const circleArea: Drill = {
  id: "circles.area",
  topicId: TOPIC,
  title: "Area of a circle",
  level: 2,
  guideRef: "area-of-a-circle",
  generate(rng, tier) {
    return retry(() => {
      const u = rng.next();
      if (tier === 3 && u < 0.4) return areaContext(rng);
      if (u < 0.5) return areaCalc(rng, tier);
      if (u < 0.8) return areaTerms(rng, tier);
      return area314(rng, tier);
    });
  },
};

// ===========================================================================
// 8. Radius from the area
// ===========================================================================

function rFromAExact(rng: Rng, tier: Tier): DrillItem {
  const askR = rng.bool(0.7);
  const r10 = tier === 1 ? 10 * rng.int(2, 12) : rng.bool(0.6) ? 10 * rng.int(2, 15) : 10 * rng.int(1, 9) + 5;
  const r = clean(r10 / 10), k = clean((r10 * r10) / 100);
  const ans = askR ? r : clean(2 * r);
  const what = askR ? "radius" : "diameter";
  return {
    prompt: `A circle has an area of {{${num(k)} pi}} cm². Find its ${what}. Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [`{{A = pi r^2}}, so {{${num(k)} pi = pi r^2}}.`, `Divide by π: {{r^2 = ${num(k)}}}.`, `{{r = sqrt(${num(k)}) = ${num(r)}}} cm`, ...(askR ? [] : [`Diameter = 2 × ${num(r)} = ${num(ans)} cm.`])],
    hint: "A = πr². What number squared gives the number in front of π?",
    traps: pickTraps(ans, [
      nTrap(k, "That's r². Take the square root to find r."),
      askR ? nTrap(2 * r, "That's the diameter. The question asks for the radius.") : nTrap(r, "That's the radius. The diameter is twice it."),
    ]),
  };
}

function rFromA314(rng: Rng): DrillItem {
  const askR = rng.bool(0.7);
  const r = rng.int(2, 12);
  const A = clean((314 * r * r) / 100);
  const ans = askR ? r : 2 * r;
  const what = askR ? "radius" : "diameter";
  return {
    prompt: `Using π = 3.14, a circle has an area of ${num(A)} cm². Find its ${what}. Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [`A = π × r², so r² = A ÷ π.`, `r² = ${num(A)} ÷ 3.14 = ${r * r}`, `r = {{sqrt(${r * r})}} = ${r} cm`, ...(askR ? [] : [`Diameter = 2 × ${r} = ${2 * r} cm.`])],
    hint: "Work backwards: undo × π, then undo the squaring.",
    traps: pickTraps(ans, [
      nTrap(r * r, "That's r². Take the square root to find r."),
      askR ? nTrap(2 * r, "That's the diameter. The question asks for the radius.") : nTrap(r, "That's the radius. The diameter is twice it."),
    ]),
  };
}

function rFromA227(rng: Rng): DrillItem {
  const askR = rng.bool(0.7);
  const r = rng.pick([7, 14, 21, 3.5, 10.5]);
  const r2 = clean(r * r);
  const A = clean((22 * r2) / 7);
  const ans = askR ? r : clean(2 * r);
  const what = askR ? "radius" : "diameter";
  return {
    prompt: `Taking π as {{22/7}}, a circle has an area of ${num(A)} cm². Find its ${what}. Give your answer in cm.`,
    answer: numSpec(ans, "cm"),
    solution: [`r² = A ÷ π = {{${num(A)} * 7/22}} = ${num(r2)}`, `r = {{sqrt(${num(r2)})}} = ${num(r)} cm`, ...(askR ? [] : [`Diameter = 2 × ${num(r)} = ${num(ans)} cm.`])],
    hint: "Dividing by {{22/7}} is the same as multiplying by {{7/22}}.",
    traps: pickTraps(ans, [
      nTrap(r2, "That's r². Take the square root to find r."),
      askR ? nTrap(2 * r, "That's the diameter. The question asks for the radius.") : nTrap(r, "That's the radius. The diameter is twice it."),
    ]),
  };
}

function rFromACalc(rng: Rng, tier: Tier): DrillItem | null {
  const askR = tier === 1 ? true : rng.bool(0.6);
  let A: number;
  let unit = "cm";
  let lead: string;
  if (tier === 3 && rng.bool(0.6)) {
    const c = rng.pick([
      { s: "A circular garden has an area of", lo: 20, hi: 200, u: "m" },
      { s: "A round pizza has an area of", lo: 300, hi: 1200, u: "cm" },
      { s: "A circular pond has an area of", lo: 5, hi: 60, u: "m" },
      { s: "A round table top has an area of", lo: 4000, hi: 15000, u: "cm" },
    ]);
    A = rng.int(c.lo, c.hi);
    unit = c.u;
    lead = `${c.s} ${big(A)} ${unit}².`;
  } else {
    A = rng.int(tier === 1 ? 20 : 10, tier === 1 ? 300 : 800);
    lead = rng.pick([`A circle has an area of ${A} cm².`, `The area of a circle is ${A} cm².`]);
  }
  const r = Math.sqrt(A / PI);
  const x = askR ? r : 2 * r;
  const R = accFor(rng, tier === 1 ? 1 : 2, x);
  if (!R) return null;
  const what = askR ? "radius" : "diameter";
  return {
    prompt: `${lead} Find its ${what}. Give your answer to ${R.phrase}.`,
    answer: calcSpec(R, unit),
    solution: [
      `{{A = pi r^2}}, so {{r^2 = A / pi = ${A} / pi}} = ${dots(A / PI)}`,
      `{{r = sqrt(${A} / pi)}} = ${dots(r)} ${unit}`,
      ...(askR ? [] : [`Diameter = 2 × ${dots(r)} = ${dots(2 * r)} ${unit}`]),
      `= ${R.text} ${unit} (to ${R.phrase})`,
    ],
    hint: "Work backwards: divide by π, then square root.",
    traps: pickTraps(R.value, [
      rTrap(askR ? A / PI : (2 * A) / PI, R.dp, "You forgot the square root. A ÷ π gives r², not r."),
      rTrap(askR ? Math.sqrt(A) : 2 * Math.sqrt(A), R.dp, "Divide by π before taking the square root."),
      askR ? rTrap(2 * r, R.dp, "That's the diameter. The question asks for the radius.") : rTrap(r, R.dp, "That's the radius. The diameter is twice it."),
    ]),
  };
}

const radiusFromArea: Drill = {
  id: "circles.radius-from-area",
  topicId: TOPIC,
  title: "Find the radius from the area",
  level: 3,
  guideRef: "area-of-a-circle",
  generate(rng, tier) {
    return retry(() => {
      const u = rng.next();
      if (tier === 1) return u < 0.5 ? rFromAExact(rng, tier) : u < 0.8 ? rFromA314(rng) : rFromACalc(rng, tier);
      if (u < 0.3) return rFromAExact(rng, tier);
      if (u < 0.45) return rFromA314(rng);
      if (u < 0.6) return rFromA227(rng);
      return rFromACalc(rng, tier);
    });
  },
};

// ===========================================================================
// 9 & 10. Semicircles and quarter circles
// ===========================================================================

type Piece = "semi" | "quarter" | "three";
const PIECE: Record<Piece, { n: number; d: number; name: string; ftex: string; fword: string }> = {
  semi: { n: 1, d: 2, name: "semicircle", ftex: "1/2", fword: "half" },
  quarter: { n: 1, d: 4, name: "quarter circle", ftex: "1/4", fword: "a quarter" },
  three: { n: 3, d: 4, name: "three-quarter circle", ftex: "3/4", fword: "three quarters" },
};

const PIECE_CTX: Array<{ piece: Piece; a: string; short: string; unit: string; lo: number; hi: number; giveD: boolean }> = [
  { piece: "semi", a: "a semicircular window", short: "the window", unit: "cm", lo: 60, hi: 120, giveD: true },
  { piece: "semi", a: "a semicircular flower bed", short: "the flower bed", unit: "m", lo: 2, hi: 12, giveD: true },
  { piece: "semi", a: "a semicircular rug", short: "the rug", unit: "cm", lo: 80, hi: 160, giveD: true },
  { piece: "quarter", a: "a quarter-circle flower bed in the corner of a garden", short: "the flower bed", unit: "m", lo: 2, hi: 8, giveD: false },
  { piece: "quarter", a: "a quarter-circle corner shelf", short: "the shelf", unit: "cm", lo: 20, hi: 40, giveD: false },
  { piece: "quarter", a: "a quarter-circle sandpit", short: "the sandpit", unit: "m", lo: 2, hi: 5, giveD: false },
];

function pieceDiagram(piece: Piece, giveD: boolean, label: string): string {
  if (piece === "semi") {
    const body =
      `<path d="M 40 160 A 110 110 0 0 1 260 160 Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
      (giveD
        ? txt(150, 180, label)
        : seg([150, 160], [150, 50], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) + dot([150, 160]) + txt(156, 110, label, "start"));
    return svgWrap(300, 190, `A semicircle with ${giveD ? "diameter" : "radius"} ${label}`, body);
  }
  if (piece === "quarter") {
    const body =
      `<path d="M 50 190 H 200 A 150 150 0 0 0 50 40 Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
      `<path d="M 50 178 H 62 V 190" fill="none" stroke="${INK}" stroke-width="1.5"/>` +
      txt(125, 206, label);
    return svgWrap(260, 214, `A quarter circle with radius ${label}`, body);
  }
  const body =
    `<path d="M 130 120 H 225 A 95 95 0 1 1 130 25 Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<path d="M 142 120 V 108 H 130" fill="none" stroke="${INK}" stroke-width="1.5"/>` +
    txt(180, 112, label);
  return svgWrap(260, 230, `A three-quarter circle with radius ${label}`, body);
}

interface PieceSetup {
  piece: Piece;
  giveD: boolean;
  r10: number;
  unit: string;
  intro: string;
  shapeWord: string;
}

function pieceSetup(rng: Rng, tier: Tier, integerR: boolean): PieceSetup {
  const ctxP = tier > 1 && rng.bool(0.4) ? rng.pick(PIECE_CTX) : null;
  if (ctxP) {
    const d10 = ctxP.giveD ? 20 * rng.int(Math.ceil(ctxP.lo / 2), Math.floor(ctxP.hi / 2)) : 0;
    const r10 = ctxP.giveD ? d10 / 2 : 10 * rng.int(ctxP.lo, ctxP.hi);
    const x = ctxP.giveD ? clean(d10 / 10) : clean(r10 / 10);
    return {
      piece: ctxP.piece,
      giveD: ctxP.giveD,
      r10,
      unit: ctxP.unit,
      intro: `${cap(ctxP.a)} has ${ctxP.giveD ? "diameter" : "radius"} ${num(x)} ${ctxP.unit}.`,
      shapeWord: ctxP.short,
    };
  }
  const pieces: Piece[] = tier === 3 ? ["semi", "quarter", "three"] : ["semi", "quarter"];
  const piece = rng.pick(pieces);
  const giveD = piece === "semi" && rng.bool();
  let r10: number;
  if (tier === 1) r10 = 10 * rng.int(2, 12);
  else if (tier === 2 || integerR) r10 = 10 * rng.int(2, 20);
  else r10 = rng.bool() ? 10 * rng.int(2, 20) : 5 * (2 * rng.int(2, 15) + 1);
  const x = giveD ? clean(r10 / 5) : clean(r10 / 10);
  const P = PIECE[piece];
  const intro = rng.pick([
    `A ${P.name} has ${giveD ? "diameter" : "radius"} ${num(x)} cm.`,
    `The diagram shows a ${P.name} with ${giveD ? "diameter" : "radius"} ${num(x)} cm.`,
  ]);
  return { piece, giveD, r10, unit: "cm", intro, shapeWord: `the ${P.name}` };
}

const semicircleArea: Drill = {
  id: "circles.semicircle-quarter-area",
  topicId: TOPIC,
  title: "Area of semicircles and quarter circles",
  level: 2,
  guideRef: "semicircles-quarter-circles",
  generate(rng, tier) {
    return retry(() => {
      const mode = tier === 1 ? rng.pick(["calc", "calc", "terms"]) : rng.pick(["calc", "calc", "terms", "314"]);
      const S = pieceSetup(rng, tier, mode !== "calc");
      const P = PIECE[S.piece];
      const r = clean(S.r10 / 10);
      const u = S.unit;
      const xLabel = S.giveD ? `${num(2 * r)} ${u}` : `${num(r)} ${u}`;
      const diagram = pieceDiagram(S.piece, S.giveD, xLabel);
      const rStep = S.giveD ? [`Radius = ${num(2 * r)} ÷ 2 = ${num(r)} ${u}.`] : [];
      const ask = `Work out the area of ${S.shapeWord}.`;
      const hint = `Find the area of the whole circle (πr²), then take ${P.fword} of it.`;
      if (mode === "terms") {
        const ans = piTerm(P.n * S.r10 * S.r10, P.d * 100);
        if (!ans.nice || !exactOk(ans.value)) return null;
        const full = piTerm(S.r10 * S.r10, 100);
        return {
          prompt: `${S.intro} ${ask} Give your answer in terms of π. ${TYPE_PI}`,
          diagram,
          answer: exactSpec(ans, `${u}²`),
          solution: [...rStep, `Whole circle: {{pi * ${num(r)}^2 = ${full.tex}}} ${u}²`, `${cap(P.name)}: {{${P.ftex} * ${full.tex} = ${ans.tex}}} ${u}²`],
          hint,
          traps: [
            ...pickTraps(ans.value, [
              pTrap(full, `That's the whole circle. A ${P.name} is ${P.fword} of it.`),
              S.giveD ? pTrap(piTerm(P.n * 4 * S.r10 * S.r10, P.d * 100), "You used the diameter as the radius. Halve it first.") : pTrap(piTerm(S.r10 * S.r10, 200), "That's half a circle. A quarter circle is a quarter of it."),
            ]),
            decimalTrap(ans.value),
          ],
        };
      }
      if (mode === "314") {
        const A = clean((314 * P.n * S.r10 * S.r10) / (P.d * 10000));
        const full = clean((314 * S.r10 * S.r10) / 10000);
        return {
          prompt: `${S.intro} ${ask} Use π = 3.14. Give your answer in ${u}².`,
          diagram,
          answer: numSpec(A, `${u}²`),
          solution: [...rStep, `Whole circle: 3.14 × {{${num(r)}^2}} = 3.14 × ${num(clean(r * r))} = ${num(full)} ${u}²`, `${cap(P.name)}: {{${P.ftex}}} × ${num(full)} = ${num(A)} ${u}²`],
          hint,
          traps: pickTraps(A, [nTrap(full, `That's the whole circle. A ${P.name} is ${P.fword} of it.`)]),
        };
      }
      const full = PI * r * r;
      const A = (full * P.n) / P.d;
      const R = roundAcc(A, "1dp");
      if (!R) return null;
      return {
        prompt: `${S.intro} ${ask} Give your answer to 1 decimal place.`,
        diagram,
        answer: calcSpec(R, `${u}²`),
        solution: [...rStep, `Whole circle: {{pi * ${num(r)}^2}} = ${dots(full)} ${u}²`, `${cap(P.name)}: {{${P.ftex}}} × ${dots(full)} = ${dots(A)} ${u}²`, `= ${R.text} ${u}² (to 1 decimal place)`],
        hint,
        traps: pickTraps(R.value, [
          rTrap(full, 1, `That's the whole circle. A ${P.name} is ${P.fword} of it.`),
          S.giveD ? rTrap((PI * 4 * r * r * P.n) / P.d, 1, "You used the diameter as the radius. Halve it first.") : rTrap(full / 2, 1, "That's half a circle. Use the right fraction of the circle."),
        ]),
      };
    });
  },
};

const semicirclePerimeter: Drill = {
  id: "circles.semicircle-quarter-perimeter",
  topicId: TOPIC,
  title: "Perimeter of semicircles and quarter circles",
  level: 2,
  guideRef: "semicircles-quarter-circles",
  generate(rng, tier) {
    return retry(() => {
      const mode = tier === 1 ? rng.pick(["calc", "calc", "terms"]) : rng.pick(["calc", "calc", "terms", "314"]);
      const S = pieceSetup(rng, tier, mode !== "calc");
      const P = PIECE[S.piece];
      const r = clean(S.r10 / 10);
      const u = S.unit;
      const xLabel = S.giveD ? `${num(2 * r)} ${u}` : `${num(r)} ${u}`;
      const diagram = pieceDiagram(S.piece, S.giveD, xLabel);
      const straight = clean(2 * r);
      const straightWord = S.piece === "semi" ? `the diameter, ${num(straight)} ${u}` : `two radii, 2 × ${num(r)} = ${num(straight)} ${u}`;
      const ask = rng.pick([`Work out the perimeter of ${S.shapeWord}.`, `Work out the total distance around the edge of ${S.shapeWord}.`]);
      const hint = `Perimeter = curved part + straight edge${S.piece === "semi" ? "" : "s"}. The curved part is ${P.fword} of the circumference.`;
      const curvedFb = `That's only the curved part. Add the straight edge${S.piece === "semi" ? " (the diameter)" : "s (two radii)"} too.`;
      if (mode === "terms") {
        const curved = piTerm(P.n * 2 * S.r10, P.d * 10);
        if (!curved.nice) return null;
        const full = piTerm(2 * S.r10, 10);
        const ans = combo(straight, 1, curved);
        if (!exactOk(ans.value)) return null;
        const cands: Cand[] = [pTrap(curved, curvedFb)];
        if (S.piece === "semi") cands.push(pTrap(combo(straight, 1, full), "Only half the circumference is on the edge of a semicircle."));
        else cands.push(pTrap(combo(r, 1, curved), "There are two straight edges (two radii)."));
        return {
          prompt: `${S.intro} ${ask} Give your answer in terms of π. ${TYPE_PI}`,
          diagram,
          answer: exactSpec(ans, u),
          solution: [`Whole circumference: {{2 pi * ${num(r)} = ${full.tex}}} ${u}`, `Curved part: {{${P.ftex} * ${full.tex} = ${curved.tex}}} ${u}`, `Straight edges: ${straightWord}.`, `Perimeter = {{${ans.tex}}} ${u}`],
          hint,
          traps: [...pickTraps(ans.value, cands), decimalTrap(ans.value)],
        };
      }
      if (mode === "314") {
        const fullC = clean((628 * S.r10) / 1000);
        const curved = clean((628 * S.r10 * P.n) / (1000 * P.d));
        const total = clean(curved + straight);
        return {
          prompt: `${S.intro} ${ask} Use π = 3.14. Give your answer in ${u}.`,
          diagram,
          answer: numSpec(total, u),
          solution: [`Whole circumference: 2 × 3.14 × ${num(r)} = ${num(fullC)} ${u}`, `Curved part: {{${P.ftex}}} × ${num(fullC)} = ${num(curved)} ${u}`, `Straight edges: ${straightWord}.`, `Perimeter = ${num(curved)} + ${num(straight)} = ${num(total)} ${u}`],
          hint,
          traps: pickTraps(total, [nTrap(curved, curvedFb), S.piece === "semi" ? nTrap(fullC + straight, "Only half the circumference is on the edge of a semicircle.") : nTrap(curved + r, "There are two straight edges (two radii).")]),
        };
      }
      const fullC = 2 * PI * r;
      const curved = (fullC * P.n) / P.d;
      const total = curved + straight;
      const R = roundAcc(total, "1dp");
      if (!R) return null;
      return {
        prompt: `${S.intro} ${ask} Give your answer to 1 decimal place.`,
        diagram,
        answer: calcSpec(R, u),
        solution: [`Whole circumference: {{2 pi * ${num(r)}}} = ${dots(fullC)} ${u}`, `Curved part: {{${P.ftex}}} × ${dots(fullC)} = ${dots(curved)} ${u}`, `Straight edges: ${straightWord}.`, `Perimeter = ${dots(curved)} + ${num(straight)} = ${dots(total)} = ${R.text} ${u}`],
        hint,
        traps: pickTraps(R.value, [
          rTrap(curved, 1, curvedFb),
          S.piece === "semi" ? rTrap(fullC + straight, 1, "Only half the circumference is on the edge of a semicircle.") : rTrap(curved + r, 1, "There are two straight edges (two radii)."),
        ]),
      };
    });
  },
};

// ===========================================================================
// 11. Compound shapes with circles
// ===========================================================================

/** k + s·(n/d)π */
interface KPi {
  k: number;
  s: 1 | -1;
  n: number;
  d: number;
}

function kpiValue(q: KPi): number {
  return q.k + (q.s * q.n * PI) / q.d;
}

function kpiForm(q: KPi): PiForm {
  const t = piTerm(q.n, q.d);
  return q.k === 0 ? t : combo(q.k, q.s, t);
}

function diagRectSemi(L: number, W: number, u: string): string {
  const r = W / 2;
  const k = Math.min(200 / (L + r), 130 / W);
  const x0 = 55, y0 = 35, Lk = L * k, Wk = W * k, rk = r * k;
  const body =
    `<path d="M ${f1(x0)} ${f1(y0)} H ${f1(x0 + Lk)} A ${f1(rk)} ${f1(rk)} 0 0 1 ${f1(x0 + Lk)} ${f1(y0 + Wk)} H ${f1(x0)} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    seg([x0 + Lk, y0], [x0 + Lk, y0 + Wk], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    txt(x0 + Lk / 2, y0 - 9, `${L} ${u}`) +
    txt(x0 - 7, y0 + Wk / 2 + 4, `${W} ${u}`, "end");
  return svgWrap(320, 200, `A rectangle ${L} ${u} long and ${W} ${u} wide with a semicircle joined to one short side`, body);
}

function diagSquareQuarter(s: number, u: string): string {
  const S = 150, x0 = 85, y0 = 25;
  const body =
    `<path d="M ${x0} ${y0} H ${x0 + S} V ${y0 + S} A ${S} ${S} 0 0 0 ${x0} ${y0} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<path d="M ${x0} ${y0 + S} H ${x0 + S} A ${S} ${S} 0 0 0 ${x0} ${y0} Z" fill="#ffffff" stroke="${INK}" stroke-width="2"/>` +
    dot([x0, y0 + S]) +
    txt(x0 + S / 2, y0 + S + 18, `${s} ${u}`) +
    txt(x0 - 7, y0 + S / 2 + 4, `${s} ${u}`, "end");
  return svgWrap(320, 200, `A square of side ${s} ${u} with a quarter circle centred at its bottom-left corner; the part of the square outside the quarter circle is shaded`, body);
}

function diagSquareCircle(side: number, u: string): string {
  const S = 160, x0 = 80, y0 = 15;
  const body =
    `<rect x="${x0}" y="${y0}" width="${S}" height="${S}" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="${x0 + S / 2}" cy="${y0 + S / 2}" r="${S / 2}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>` +
    txt(x0 + S / 2, y0 + S + 18, `${side} ${u}`);
  return svgWrap(320, 200, `A circle fitting exactly inside a square of side ${side} ${u}; the four corners outside the circle are shaded`, body);
}

function diagRing(Rv: number, rv: number, u: string, width: number | null): string {
  const cx = 150, cy = 115, Rk = 95, rk = (95 * rv) / Rv;
  const o = polar(cx, cy, Rk, 35), i = polar(cx, cy, rk, 205);
  let body =
    `<circle cx="${cx}" cy="${cy}" r="${Rk}" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<circle cx="${cx}" cy="${cy}" r="${f1(rk)}" fill="#ffffff" stroke="${INK}" stroke-width="2"/>` +
    dot([cx, cy]) +
    seg([cx, cy], i, `stroke="${INK}" stroke-width="1.5"`) +
    txt((cx + i[0]) / 2, (cy + i[1]) / 2 - 7, `${rv} ${u}`);
  if (width === null) {
    body += seg([cx, cy], o, `stroke="${INK}" stroke-width="1.5"`) + txt(o[0] + 6, o[1] - 4, `${Rv} ${u}`, "start");
  } else {
    const a = polar(cx, cy, rk, -30), b = polar(cx, cy, Rk, -30);
    body += seg(a, b, `stroke="${INK}" stroke-width="2.5"`) + txt(b[0] + 6, b[1] + 12, `${width} ${u}`, "start");
  }
  return svgWrap(320, 230, width === null ? `Two circles with the same centre, radii ${Rv} ${u} and ${rv} ${u}; the ring between them is shaded` : `A circular pond of radius ${rv} ${u} with a shaded path ${width} ${u} wide all around it`, body);
}

function diagStadium(L: number, W: number, u: string): string {
  const k = Math.min(230 / (L + W), 110 / W);
  const Lk = L * k, Wk = W * k, rk = Wk / 2;
  const x0 = (320 - (Lk + Wk)) / 2, y0 = 40;
  const xa = x0 + rk, xb = x0 + rk + Lk;
  const body =
    `<path d="M ${f1(xa)} ${y0} H ${f1(xb)} A ${f1(rk)} ${f1(rk)} 0 0 1 ${f1(xb)} ${f1(y0 + Wk)} H ${f1(xa)} A ${f1(rk)} ${f1(rk)} 0 0 1 ${f1(xa)} ${y0} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    seg([xa, y0], [xa, y0 + Wk], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    seg([xb, y0], [xb, y0 + Wk], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    txt((xa + xb) / 2, y0 - 9, `${L} ${u}`) +
    txt(xa + 6, y0 + Wk / 2 + 4, `${W} ${u}`, "start");
  return svgWrap(320, Math.ceil(60 + Wk + 20), `A rectangle ${L} ${u} by ${W} ${u} with a semicircle on each short end`, body);
}

function diagCone(b: number, h: number, u: string): string {
  const k = Math.min(160 / b, 170 / (b / 2 + h));
  const bk = b * k, hk = h * k, rk = bk / 2;
  const xm = 160, yb = 20 + rk, x1 = xm - rk, x2 = xm + rk;
  const body =
    `<path d="M ${f1(x1)} ${f1(yb)} A ${f1(rk)} ${f1(rk)} 0 0 1 ${f1(x2)} ${f1(yb)} L ${xm} ${f1(yb + hk)} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    seg([x1, yb], [x2, yb], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    seg([xm, yb], [xm, yb + hk], `stroke="${INK}" stroke-width="1.5" stroke-dasharray="5 4"`) +
    `<path d="M ${xm + 8} ${f1(yb)} V ${f1(yb + 8)} H ${xm}" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
    txt(xm - rk / 2, yb - 6, `${b} ${u}`) +
    txt(xm + 6, yb + hk / 2 + 4, `${h} ${u}`, "start");
  return svgWrap(320, Math.ceil(yb + hk + 16), `An ice-cream shape: a semicircle on top of a triangle with base ${b} ${u} and height ${h} ${u}`, body);
}

interface CompoundCase {
  prompt: string;
  diagram: string;
  q: KPi;
  unit: string;
  steps: (exact: boolean) => string[];
  traps: Array<[KPi, string]>;
  hint: string;
}

function compoundCase(rng: Rng, tier: Tier): CompoundCase {
  const kinds = tier === 1 ? [0, 2, 3] : [0, 1, 2, 3, 4, 5];
  const kind = rng.pick(kinds);
  const u = "cm";
  if (kind === 0) {
    const L = rng.int(tier === 1 ? 6 : 8, tier === 1 ? 16 : 24), W = 2 * rng.int(2, tier === 1 ? 6 : 8);
    const r = W / 2;
    const perim = tier > 1 && rng.bool(0.45);
    const diagram = diagRectSemi(L, W, u);
    const intro = `The shape is a rectangle ${L} cm by ${W} cm with a semicircle joined to one ${W} cm side.`;
    if (perim) {
      return {
        prompt: `${intro} Work out the perimeter of the shape.`,
        diagram,
        q: { k: 2 * L + W, s: 1, n: r, d: 1 },
        unit: u,
        steps: () => [`Straight edges: ${L} + ${L} + ${W} = ${2 * L + W} cm (the dashed line is inside the shape, so it is not part of the perimeter).`, `Curved edge: half of {{pi * ${W}}} = {{${r} pi}} cm.`],
        traps: [
          [{ k: 2 * L + 2 * W, s: 1, n: r, d: 1 }, "Don't include the dashed line. It is inside the shape, not on its edge."],
          [{ k: 2 * L + W, s: 1, n: W, d: 1 }, "The curved edge is only half a circle: half of π × " + W + "."],
        ],
        hint: "Trace around the outside edge. Which edges are straight and which is curved?",
      };
    }
    return {
      prompt: `${intro} Work out the area of the shape.`,
      diagram,
      q: { k: L * W, s: 1, n: r * r, d: 2 },
      unit: `${u}²`,
      steps: () => [`Rectangle: ${L} × ${W} = ${L * W} cm²`, `Semicircle: radius ${W} ÷ 2 = ${r} cm, area {{1/2 * pi * ${r}^2 = ${piTerm(r * r, 2).tex}}} cm²`],
      traps: [
        [{ k: L * W, s: 1, n: r * r, d: 1 }, "You added a whole circle. It is only a semicircle, so halve the circle's area."],
        [{ k: L * W, s: 1, n: W * W, d: 2 }, `You used ${W} cm as the radius. It is the diameter, so the radius is ${r} cm.`],
      ],
      hint: "Split the shape into a rectangle and a semicircle.",
    };
  }
  if (kind === 1) {
    const s = rng.int(4, 14);
    const diagram = diagSquareQuarter(s, u);
    const intro = `The diagram shows a square of side ${s} cm. A quarter circle of radius ${s} cm is drawn with its centre at one corner of the square.`;
    if (tier === 3 && rng.bool(0.4)) {
      return {
        prompt: `${intro} Work out the perimeter of the shaded region.`,
        diagram,
        q: { k: 2 * s, s: 1, n: s, d: 2 },
        unit: u,
        steps: () => [`Straight edges: two sides of the square, ${s} + ${s} = ${2 * s} cm.`, `Curved edge: a quarter of {{2 pi * ${s}}} = {{${piTerm(s, 2).tex}}} cm.`],
        traps: [
          [{ k: 4 * s, s: 1, n: s, d: 2 }, "Only two sides of the square are on the edge of the shaded region."],
          [{ k: 2 * s, s: 1, n: 2 * s, d: 1 }, "The arc is only a quarter of a circle: a quarter of 2π × " + s + "."],
        ],
        hint: "Trace around the shaded region: two straight sides and one arc.",
      };
    }
    return {
      prompt: `${intro} Work out the area of the shaded region.`,
      diagram,
      q: { k: s * s, s: -1, n: s * s, d: 4 },
      unit: `${u}²`,
      steps: () => [`Square: ${s} × ${s} = ${s * s} cm²`, `Quarter circle: {{1/4 * pi * ${s}^2 = ${piTerm(s * s, 4).tex}}} cm²`, "Shaded = square − quarter circle."],
      traps: [
        [{ k: 0, s: 1, n: s * s, d: 4 }, "That's the quarter circle. The shaded part is the square minus the quarter circle."],
        [{ k: s * s, s: -1, n: s * s, d: 2 }, "The arc is a quarter circle, not a semicircle."],
      ],
      hint: "Shaded area = square − quarter circle.",
    };
  }
  if (kind === 2) {
    const r = rng.int(2, tier === 1 ? 8 : 12);
    const side = 2 * r;
    return {
      prompt: `A circle fits exactly inside a square of side ${side} cm, touching all four sides. Work out the shaded area (the parts of the square outside the circle).`,
      diagram: diagSquareCircle(side, u),
      q: { k: side * side, s: -1, n: r * r, d: 1 },
      unit: `${u}²`,
      steps: () => [`Square: ${side} × ${side} = ${side * side} cm²`, `The circle's diameter is ${side} cm, so its radius is ${r} cm. Circle: {{pi * ${r}^2 = ${piTerm(r * r).tex}}} cm²`, "Shaded = square − circle."],
      traps: [
        [{ k: 0, s: 1, n: r * r, d: 1 }, "That's the circle. The shaded part is the square minus the circle."],
        [{ k: side * side, s: -1, n: 2 * r, d: 1 }, "You subtracted the circumference (2πr). Subtract the circle's area, πr²."],
      ],
      hint: "Shaded area = square − circle. What is the circle's radius?",
    };
  }
  if (kind === 3) {
    if (tier === 3 && rng.bool(0.5)) {
      const r = rng.int(2, 10), w = rng.int(1, 4);
      const R = r + w;
      return {
        prompt: `A circular pond of radius ${r} m has a path ${w} m wide all the way around it. Work out the area of the path.`,
        diagram: diagRing(R, r, "m", w),
        q: { k: 0, s: 1, n: R * R - r * r, d: 1 },
        unit: "m²",
        steps: () => [`Outer radius = ${r} + ${w} = ${R} m.`, `Outer circle: {{pi * ${R}^2 = ${R * R} pi}} m². Pond: {{pi * ${r}^2 = ${r * r} pi}} m².`, `Path = {{${R * R} pi - ${r * r} pi}}`],
        traps: [
          [{ k: 0, s: 1, n: R * R, d: 1 }, "That's the whole outer circle. Take away the pond."],
          [{ k: 0, s: 1, n: w * w, d: 1 }, "The path is a ring around the pond, not a circle of radius " + w + " m."],
        ],
        hint: "Path = big circle − pond. What is the radius of the big circle?",
      };
    }
    const R = rng.int(5, 15);
    const r = rng.int(Math.max(2, Math.ceil(R / 4)), R - 2);
    return {
      prompt: `The shaded ring lies between two circles with the same centre. The outer radius is ${R} cm and the inner radius is ${r} cm. Work out the area of the ring.`,
      diagram: diagRing(R, r, u, null),
      q: { k: 0, s: 1, n: R * R - r * r, d: 1 },
      unit: `${u}²`,
      steps: () => [`Outer circle: {{pi * ${R}^2 = ${R * R} pi}} cm²`, `Inner circle: {{pi * ${r}^2 = ${r * r} pi}} cm²`, `Ring = {{${R * R} pi - ${r * r} pi}}`],
      traps: [
        [{ k: 0, s: 1, n: (R - r) * (R - r), d: 1 }, "You subtracted the radii before squaring. Find each circle's area first, then subtract."],
        [{ k: 0, s: 1, n: R * R, d: 1 }, "That's the whole outer circle. Take away the inner circle."],
      ],
      hint: "Ring = outer circle − inner circle.",
    };
  }
  if (kind === 4) {
    const track = rng.bool();
    const W = track ? 10 * rng.int(3, 5) : 2 * rng.int(2, 6);
    const L = track ? 10 * rng.int(6, 10) : rng.int(Math.max(8, W + 2), 20);
    const uu = track ? "m" : "cm";
    const diagram = diagStadium(L, W, uu);
    const intro = track
      ? `A running track is made of two straight sections, each ${L} m long, joined by two semicircles. The semicircles have diameter ${W} m.`
      : `The shape is made from a rectangle ${L} cm by ${W} cm with a semicircle on each of its two short sides.`;
    if (track || rng.bool()) {
      return {
        prompt: `${intro} Work out the ${track ? "distance once around the track" : "perimeter of the shape"}.`,
        diagram,
        q: { k: 2 * L, s: 1, n: W, d: 1 },
        unit: uu,
        steps: () => [`Straight parts: ${L} + ${L} = ${2 * L} ${uu}.`, `The two semicircles make one whole circle of diameter ${W} ${uu}: {{pi * ${W} = ${W} pi}} ${uu}.`, "The dashed lines are inside the shape, so they are not part of the perimeter."],
        traps: [
          [{ k: 2 * L + 2 * W, s: 1, n: W, d: 1 }, "The dashed lines are inside the shape. Don't add them."],
          [{ k: 2 * L, s: 1, n: W, d: 2 }, "There are two semicircles. Together they make a whole circle."],
        ],
        hint: "Two semicircles make one whole circle.",
      };
    }
    return {
      prompt: `${intro} Work out the area of the shape.`,
      diagram,
      q: { k: L * W, s: 1, n: W * W, d: 4 },
      unit: `${uu}²`,
      steps: () => [`Rectangle: ${L} × ${W} = ${L * W} ${uu}²`, `The two semicircles make one circle of radius ${W / 2} ${uu}: {{pi * ${W / 2}^2 = ${piTerm(W * W, 4).tex}}} ${uu}²`],
      traps: [
        [{ k: L * W, s: 1, n: W * W, d: 2 }, "Two semicircles make ONE circle, not two."],
        [{ k: L * W, s: 1, n: W * W, d: 1 }, `You used ${W} as the radius. It is the diameter.`],
      ],
      hint: "Rectangle + two semicircles (= one whole circle).",
    };
  }
  const b = 2 * rng.int(2, 6), h = rng.int(6, 16);
  const r = b / 2;
  return {
    prompt: `An ice-cream shape is made from a triangle with base ${b} cm and height ${h} cm, with a semicircle on the base. Work out the area of the whole shape.`,
    diagram: diagCone(b, h, u),
    q: { k: (b * h) / 2, s: 1, n: r * r, d: 2 },
    unit: `${u}²`,
    steps: () => [`Triangle: {{1/2}} × ${b} × ${h} = ${(b * h) / 2} cm²`, `Semicircle: radius ${b} ÷ 2 = ${r} cm, area {{1/2 * pi * ${r}^2 = ${piTerm(r * r, 2).tex}}} cm²`],
    traps: [
      [{ k: b * h, s: 1, n: r * r, d: 2 }, "The triangle's area is half of base × height."],
      [{ k: (b * h) / 2, s: 1, n: r * r, d: 1 }, "The top is a semicircle: half of the circle's area."],
    ],
    hint: "Split the shape into a triangle and a semicircle.",
  };
}

const compoundShapes: Drill = {
  id: "circles.compound-shapes",
  topicId: TOPIC,
  title: "Compound shapes with circles",
  level: 3,
  guideRef: "compound-circle-shapes",
  generate(rng, tier) {
    return retry(() => {
      const c = compoundCase(rng, tier);
      const exact = tier > 1 && rng.bool(0.4);
      const value = kpiValue(c.q);
      if (!(value > 0)) return null;
      if (exact) {
        const ans = kpiForm(c.q);
        if (!ans.nice || !exactOk(ans.value)) return null;
        return {
          prompt: `${c.prompt} Give your answer in terms of π. ${TYPE_PI}`,
          diagram: c.diagram,
          answer: exactSpec(ans, c.unit),
          solution: [...c.steps(true), `Answer: {{${ans.tex}}} ${c.unit}`],
          hint: c.hint,
          traps: [...pickTraps(value, c.traps.map(([q, fb]) => pTrap(kpiForm(q), fb))), decimalTrap(value)],
        };
      }
      const R = roundAcc(value, "1dp");
      if (!R) return null;
      const form = kpiForm(c.q);
      return {
        prompt: `${c.prompt} Give your answer to 1 decimal place.`,
        diagram: c.diagram,
        answer: calcSpec(R, c.unit),
        solution: [...c.steps(false), `Total: {{${form.tex}}} = ${dots(value)} = ${R.text} ${c.unit} (to 1 decimal place)`],
        hint: c.hint,
        traps: pickTraps(R.value, c.traps.map(([q, fb]) => rTrap(kpiValue(q), 1, fb))),
      };
    });
  },
};

// ===========================================================================
// 12. Arc length and sector area (stretch)
// ===========================================================================

function sectorDiagram(theta: number, rLabel: string): string {
  const cx = 150, cy = 120, R = 90;
  const a0 = 90 - theta / 2, a1 = a0 + theta;
  const P1 = polar(cx, cy, R, a0), P2 = polar(cx, cy, R, a1);
  const large = theta > 180 ? 1 : 0;
  const m1 = polar(cx, cy, 18, a0), m2 = polar(cx, cy, 18, a1);
  // Angle label inside the sector, or just below the vertex when the sector is too thin.
  const lab: Pt = theta < 60 ? [cx, cy + 22] : polar(cx, cy, 34, 90);
  // Radius label beside the first radius: outside a minor sector, inside a reflex one.
  const offDeg = theta > 180 ? a0 + 90 : a0 - 90;
  const mid = polar(cx, cy, R * 0.55, a0);
  const ox = Math.cos((offDeg * PI) / 180);
  const pos = polar(mid[0], mid[1], 9, offDeg);
  const anchor = ox > 0.3 ? "start" : ox < -0.3 ? "end" : "middle";
  const body =
    `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="4 4"/>` +
    `<path d="M ${cx} ${cy} L ${f1(P1[0])} ${f1(P1[1])} A ${R} ${R} 0 ${large} 0 ${f1(P2[0])} ${f1(P2[1])} Z" fill="${SOFT}" stroke="${INK}" stroke-width="2"/>` +
    `<path d="M ${f1(m1[0])} ${f1(m1[1])} A 18 18 0 ${large} 0 ${f1(m2[0])} ${f1(m2[1])}" fill="none" stroke="${INK}" stroke-width="1.2"/>` +
    txt(lab[0], lab[1] + 4, `${theta}°`) +
    txt(pos[0], pos[1] + (anchor === "middle" ? 12 : 4), rLabel, anchor);
  return svgWrap(300, 230, `A sector of a circle with angle ${theta} degrees and radius ${rLabel}`, body);
}

const arcsSectors: Drill = {
  id: "circles.arcs-sectors",
  topicId: TOPIC,
  title: "Arc length and sector area",
  level: 3,
  guideRef: "arcs-sectors",
  generate(rng, tier) {
    return retry(() => {
      const thetas = tier === 1 ? [90, 180, 60, 120, 45, 30, 270] : tier === 2 ? [30, 36, 40, 45, 60, 72, 80, 100, 120, 135, 150, 210, 240, 270, 300] : [20, 25, 35, 50, 70, 75, 105, 110, 140, 160, 200, 225, 250, 280, 320];
      const theta = rng.pick(thetas);
      const r = rng.int(tier === 1 ? 2 : 3, tier === 1 ? 12 : 20);
      const kinds = tier === 3 ? ["arc", "area", "perim"] : ["arc", "area"];
      const kind = rng.pick(kinds);
      const exact = tier > 1 && rng.bool(0.4);
      const name = rng.pick(NAMES);
      const fracTex = `${theta}/360`;
      const fs = simplify(theta, 360);
      const ctx = tier === 3 && theta <= (kind === "perim" ? 160 : 110) && rng.bool(0.6);
      let prompt: string;
      if (kind === "arc") {
        prompt = ctx
          ? `A pendulum ${r} cm long swings through an angle of ${theta}°. How far does the tip travel along its curved path (the arc)?`
          : `A sector has radius ${r} cm and angle ${theta}°. Work out the length of its arc.`;
      } else if (kind === "area") {
        prompt = ctx
          ? `${name} cuts a slice with angle ${theta}° from a round cake of radius ${r} cm. Work out the area of the top of the slice.`
          : `A sector has radius ${r} cm and angle ${theta}°. Work out its area.`;
      } else {
        prompt = ctx
          ? `A paper fan opens into a sector with radius ${r} cm and angle ${theta}°. Work out the perimeter of the open fan (the arc plus the two straight edges).`
          : `A sector has radius ${r} cm and angle ${theta}°. Work out its perimeter.`;
      }
      const diagram = sectorDiagram(theta, `${r} cm`);
      const unit = kind === "area" ? "cm²" : "cm";
      // exact coefficient of π
      const q: KPi =
        kind === "arc"
          ? { k: 0, s: 1, n: theta * 2 * r, d: 360 }
          : kind === "area"
            ? { k: 0, s: 1, n: theta * r * r, d: 360 }
            : { k: 2 * r, s: 1, n: theta * 2 * r, d: 360 };
      const fullTex = kind === "area" ? `pi * ${r}^2` : `2 pi * ${r}`;
      const fullForm = kind === "area" ? piTerm(r * r) : piTerm(2 * r);
      const part = piTerm(q.n, q.d);
      const trapsQ: Array<[KPi, string]> =
        kind === "arc"
          ? [
              [{ k: 0, s: 1, n: 2 * r, d: 1 }, "That's the whole circumference. The arc is only " + theta + "/360 of it."],
              [{ k: 0, s: 1, n: theta * r * r, d: 360 }, "That's the sector's area. Arc length uses 2πr."],
            ]
          : kind === "area"
            ? [
                [{ k: 0, s: 1, n: r * r, d: 1 }, "That's the whole circle. The sector is only " + theta + "/360 of it."],
                [{ k: 0, s: 1, n: theta * 2 * r, d: 360 }, "That's the arc length. Sector area uses πr²."],
              ]
            : [
                [{ k: 0, s: 1, n: theta * 2 * r, d: 360 }, "That's just the arc. Add the two radii as well."],
                [{ k: r, s: 1, n: theta * 2 * r, d: 360 }, "There are two straight edges, each one radius long."],
              ];
      const steps = [
        `Fraction of the circle: {{${fracTex}}}${fs[1] !== 360 ? ` = {{${fs[0]}/${fs[1]}}}` : ""}.`,
        kind === "area" ? `Whole circle area: {{${fullTex} = ${fullForm.tex}}} cm²` : `Whole circumference: {{${fullTex} = ${fullForm.tex}}} cm`,
        `${kind === "area" ? "Sector area" : "Arc length"} = {{${fracTex} * ${fullForm.tex} = ${part.tex}}} ${kind === "area" ? "cm²" : "cm"}`,
        ...(kind === "perim" ? [`Add the two radii: ${r} + ${r} = ${2 * r} cm.`] : []),
      ];
      const hint = kind === "area" ? `A ${theta}° sector is {{${fracTex}}} of the whole circle's area.` : `A ${theta}° arc is {{${fracTex}}} of the whole circumference.`;
      const value = kpiValue(q);
      if (exact) {
        const ans = kpiForm(q);
        if (!exactOk(ans.value)) return null;
        return {
          prompt: `${prompt} Give your answer in terms of π. ${TYPE_PI}`,
          diagram,
          answer: exactSpec(ans, unit),
          solution: [...steps, ...(kind === "perim" ? [`Perimeter = {{${ans.tex}}} cm`] : [])],
          hint,
          traps: [...pickTraps(value, trapsQ.map(([t, fb]) => pTrap(kpiForm(t), fb))), decimalTrap(value)],
        };
      }
      const R = roundAcc(value, "1dp");
      if (!R) return null;
      return {
        prompt: `${prompt} Give your answer to 1 decimal place.`,
        diagram,
        answer: calcSpec(R, unit),
        solution: [...steps, `${kind === "perim" ? `Perimeter = {{${kpiForm(q).tex}}} ` : ""}= ${dots(value)} = ${R.text} ${unit} (to 1 decimal place)`],
        hint,
        traps: pickTraps(R.value, trapsQ.map(([t, fb]) => rTrap(kpiValue(t), 1, fb))),
      };
    });
  },
};

export const drills: Drill[] = [
  nameThePart,
  radiusDiameter,
  piFromMeasurements,
  circumferenceCalc,
  circumferenceExact,
  radiusFromCircumference,
  circleArea,
  semicircleArea,
  semicirclePerimeter,
  radiusFromArea,
  compoundShapes,
  arcsSectors,
];
