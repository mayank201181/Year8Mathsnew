// Procedural skill drills — Equations & Inequalities (topic "equations").
// Every answer is built from integers (money in cents, decimals in tenths) so
// nothing suffers float noise; bounded rejection loops keep numbers friendly
// and rule out trivial or degenerate cases.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, lcm, num, br, poly, money, clean, simplify, term, big } from "./helpers.ts";

const TOPIC = "equations";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                            */
/* ------------------------------------------------------------------------ */

/** Wrap in maths markup. */
const M = (s: string | number): string => `{{${s}}}`;

/** a·v + b as ASCII for {{ }}: lin(3, -2) → "3x - 2". */
const lin = (a: number, b: number, v = "x"): string => poly([[a, v], [b, ""]]);

/** b + a·v with the number first: linC(-3, 20) → "20 - 3x". */
const linC = (a: number, b: number, v = "x"): string => poly([[b, ""], [a, v]]);

/** Plain-text version of an ASCII expression (proper minus signs) for SVG labels. */
const plain = (s: string): string => s.replace(/-/g, "−");

const VARS = ["x", "y", "n", "m", "p", "t", "k", "w"] as const;

interface Person {
  name: string;
  sub: string;
  Sub: string;
  obj: string;
  pos: string;
}
const NAMES: Array<[string, "f" | "m"]> = [
  ["Aisha", "f"], ["Wei Ling", "f"], ["Arjun", "m"], ["Priya", "f"], ["Marcus", "m"], ["Siti", "f"],
  ["Ethan", "m"], ["Mei", "f"], ["Ravi", "m"], ["Hana", "f"], ["Jun", "m"], ["Zara", "f"],
];
const mkPerson = (name: string, g: "f" | "m"): Person =>
  g === "f" ? { name, sub: "she", Sub: "She", obj: "her", pos: "her" } : { name, sub: "he", Sub: "He", obj: "him", pos: "his" };
function person(rng: Rng, not?: string): Person {
  for (let i = 0; i < 30; i++) {
    const [name, g] = rng.pick(NAMES);
    if (name !== not) return mkPerson(name, g);
  }
  return not === "Aisha" ? mkPerson("Ravi", "m") : mkPerson("Aisha", "f");
}

/** "Subtract 5 from both sides" / "Add 5 to both sides" — the inverse of "+ b". */
function undo(b: number): string {
  return b > 0 ? `Subtract ${num(b)} from both sides` : `Add ${num(-b)} to both sides`;
}

/** Move a c·v term off a side: "Subtract {{3x}} from both sides" / "Add {{2x}} to both sides". */
function moveX(c: number, v: string): string {
  return c > 0 ? `Subtract ${M(term(c, v))} from both sides` : `Add ${M(term(-c, v))} to both sides`;
}

/** Substitution display for a·k + b (or b + a·k): "3 × (−2) + 5". */
function subLin(a: number, b: number, k: number, constFirst = false): string {
  if (a === 0) return num(b);
  const xt = a === 1 ? num(k) : a === -1 ? `−${br(k)}` : `${num(a)} × ${br(k)}`;
  if (b === 0) return xt;
  if (constFirst) {
    const mag = Math.abs(a) === 1 ? br(k) : `${num(Math.abs(a))} × ${br(k)}`;
    return `${num(b)} ${a < 0 ? "−" : "+"} ${mag}`;
  }
  return `${xt} ${b < 0 ? "−" : "+"} ${num(Math.abs(b))}`;
}

/** Final division step for A·v = R, simplifying a fractional answer. */
function divideStep(A: number, R: number, v: string): string {
  if (A === 1) return `So ${v} = ${num(R)}.`;
  if (R % A === 0) return `Divide both sides by ${num(A)}: ${v} = ${num(R)} ÷ ${br(A)} = ${num(R / A)}.`;
  const [p, q] = simplify(R, A);
  if (A > 0) return `Divide both sides by ${num(A)}: ${M(`${v} = ${R}/${A}`)}${gcd(R, A) > 1 ? ` = ${frac(p, q)}` : ""}.`;
  return `Divide both sides by ${num(A)}: ${v} = ${num(R)} ÷ ${br(A)} = ${frac(p, q)}.`;
}

/**
 * Steps to solve A·v + B = C·v + D (A ≠ C), collecting the unknown on the side
 * with the larger coefficient so it stays positive.
 */
function solveSteps(A: number, B: number, C: number, D: number, v: string): string[] {
  if (A === 0) return solveSteps(C, D, 0, B, v);
  const out: string[] = [];
  if (C === 0) {
    if (B !== 0) out.push(`${undo(B)}: ${M(`${term(A, v)} = ${D - B}`)}.`);
    if (A !== 1 || B === 0) out.push(divideStep(A, D - B, v));
    return out;
  }
  if (A > C) {
    const k = A - C, R = D - B;
    out.push(`${moveX(C, v)} (the left side has the larger ${v}-coefficient): ${M(`${lin(k, B, v)} = ${D}`)}.`);
    if (B !== 0) out.push(`${undo(B)}: ${M(`${term(k, v)} = ${R}`)}.`);
    if (k !== 1 || B === 0) out.push(divideStep(k, R, v));
  } else {
    const k = C - A, R = B - D;
    out.push(`${moveX(A, v)} (the right side has the larger ${v}-coefficient): ${M(`${B} = ${lin(k, D, v)}`)}.`);
    if (D !== 0) out.push(`${undo(D)}: ${M(`${R} = ${term(k, v)}`)}.`);
    out.push(divideStep(k, R, v));
  }
  return out;
}

/**
 * Answer spec for the exact value n/d: a whole number, or a simplest-form
 * fraction (prompts ask for a fraction, so a decimal is only "close").
 */
function valueSpec(n: number, d = 1, allowDecimal = false): AnswerSpec {
  const [p, q] = simplify(n, d);
  return q === 1 ? { type: "number", value: p } : { type: "fraction", n: p, d: q, simplest: true, allowDecimal };
}

/**
 * Collects traps for a numeric answer n/d. A trap is skipped when it is not a
 * clean rational, equals the real answer, or repeats an earlier trap.
 */
function trapper(ansN: number, ansD = 1) {
  const traps: Trap[] = [];
  const [an, ad] = simplify(ansN, ansD);
  const seen = new Set<string>([`${an}/${ad}`]);
  const add = (n: number, d: number, feedback: string) => {
    if (!Number.isInteger(n) || !Number.isInteger(d) || d === 0 || traps.length >= 3) return;
    const [p, q] = simplify(n, d);
    const key = `${p}/${q}`;
    if (seen.has(key)) return;
    seen.add(key);
    traps.push({ spec: valueSpec(p, q, true), feedback }); // traps also catch the equal decimal
  };
  return { traps, add };
}

/** Integer-safe "a ÷ b = 20.07…" for positive integers (shows 2 dp, truncated). */
/** Add a full stop unless the text already ends with an ellipsis. */
const stop = (t: string): string => (t.endsWith("…") ? t : `${t}.`);

function approx(a: number, b: number): string {
  if ((a * 100) % b === 0) return num(clean(a / b)); // exact within 2 dp
  return `${(Math.floor((a * 100) / b) / 100).toFixed(2)}…`;
}

/** Money from integer cents: whole dollars as "$1,250" / "$15", otherwise "$4.50". */
function cash(cents: number): string {
  return cents % 100 === 0 ? `$${big(cents / 100)}` : money(cents / 100);
}

/** Rational → ASCII for use inside {{ }}: 7/2 → "7/2", −6/3 → "-2". */
function ratStr(n: number, d: number): string {
  const [p, q] = simplify(n, d);
  return q === 1 ? `${p}` : `${p}/${q}`;
}

/* --------------------------- inequality helpers -------------------------- */

type Rel = "<" | "<=" | ">" | ">=";
/** Swap the two sides (x > 4 ⇔ 4 < x) — also the reversal when × or ÷ by a negative. */
const FLIP: Record<Rel, Rel> = { "<": ">", "<=": ">=", ">": "<", ">=": "<=" };
/** Change strict ↔ inclusive. */
const TOGGLE: Record<Rel, Rel> = { "<": "<=", "<=": "<", ">": ">=", ">=": ">" };
const SYM: Record<Rel, string> = { "<": "<", "<=": "≤", ">": ">", ">=": "≥" };

function holds(a: number, rel: Rel, b: number): boolean {
  return rel === "<" ? a < b : rel === "<=" ? a <= b : rel === ">" ? a > b : a >= b;
}

/** Answer spec for "v rel k" (k an integer or ASCII number), accepting both ways round. */
function ineqSpec(v: string, rel: Rel, k: number | string): AnswerSpec {
  return { type: "text", accept: [`${v}${rel}${k}`, `${k}${FLIP[rel]}${v}`], display: M(`${v} ${rel} ${k}`) };
}

/** Answer spec for "lo r1 v r2 hi" (r1, r2 are < or <=). */
function twoSpec(lo: number | string, r1: Rel, v: string, r2: Rel, hi: number | string): AnswerSpec {
  return {
    type: "text",
    accept: [`${lo}${r1}${v}${r2}${hi}`, `${hi}${FLIP[r2]}${v}${FLIP[r1]}${lo}`],
    display: M(`${lo} ${r1} ${v} ${r2} ${hi}`),
  };
}

const TYPE_TIP = "(Type ≤ as <= and ≥ as >= if you need to.)";

/* ------------------------------- diagrams -------------------------------- */

const f1 = (n: number): string => n.toFixed(1);

/** Number line lo … lo+10 with circles and a ray ("left"/"right") or a segment between two circles. */
function numberLine(lo: number, pts: Array<{ v: number; closed: boolean }>, ray: "left" | "right" | "none", aria: string): string {
  const X = (v: number) => 30 + 38 * (v - lo);
  const Y = 30, AX = 58;
  let s = `<svg viewBox="0 0 440 92" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect width="440" height="92" fill="#ffffff"/>`;
  s += `<line x1="12" y1="${AX}" x2="428" y2="${AX}" stroke="#334155" stroke-width="1.5"/>`;
  for (let i = 0; i <= 10; i++) {
    const x = 30 + 38 * i;
    s += `<line x1="${x}" y1="${AX - 5}" x2="${x}" y2="${AX + 5}" stroke="#334155" stroke-width="1.5"/>`;
    s += `<text x="${x}" y="${AX + 22}" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">${num(lo + i)}</text>`;
  }
  if (pts.length === 2) {
    s += `<line x1="${X(pts[0].v) + 7}" y1="${Y}" x2="${X(pts[1].v) - 7}" y2="${Y}" stroke="#1f2937" stroke-width="4"/>`;
  } else if (ray === "right") {
    s += `<line x1="${X(pts[0].v) + 7}" y1="${Y}" x2="418" y2="${Y}" stroke="#1f2937" stroke-width="4"/><polygon points="432,${Y} 418,${Y - 7} 418,${Y + 7}" fill="#1f2937"/>`;
  } else if (ray === "left") {
    s += `<line x1="22" y1="${Y}" x2="${X(pts[0].v) - 7}" y2="${Y}" stroke="#1f2937" stroke-width="4"/><polygon points="8,${Y} 22,${Y - 7} 22,${Y + 7}" fill="#1f2937"/>`;
  }
  for (const p of pts) {
    s += `<line x1="${X(p.v)}" y1="${Y + 8}" x2="${X(p.v)}" y2="${AX - 6}" stroke="#94a3b8" stroke-width="1" stroke-dasharray="2 2"/>`;
    s += `<circle cx="${X(p.v)}" cy="${Y}" r="7" fill="${p.closed ? "#1f2937" : "#ffffff"}" stroke="#1f2937" stroke-width="2.5"/>`;
  }
  return s + `</svg>`;
}

/** Two angles on a straight line; `right` is the true size (degrees) of the right-hand angle. */
function straightLineSvg(right: number, labL: string, labR: string, aria: string): string {
  const ox = 210, oy = 170, rad = Math.PI / 180;
  const c = Math.cos(right * rad), s = Math.sin(right * rad);
  const r1 = 30, r2 = 40, R = 95;
  const lr = (right / 2) * rad, ll = ((right + 180) / 2) * rad;
  return (
    `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect width="420" height="200" fill="#ffffff"/>` +
    `<path d="M${ox + r1},${oy} A${r1},${r1} 0 0,0 ${f1(ox + r1 * c)},${f1(oy - r1 * s)}" fill="none" stroke="#334155" stroke-width="1.8"/>` +
    `<path d="M${f1(ox + r2 * c)},${f1(oy - r2 * s)} A${r2},${r2} 0 0,0 ${ox - r2},${oy}" fill="none" stroke="#334155" stroke-width="1.8"/>` +
    `<line x1="30" y1="${oy}" x2="390" y2="${oy}" stroke="#1f2937" stroke-width="2.5"/>` +
    `<line x1="${ox}" y1="${oy}" x2="${f1(ox + 150 * c)}" y2="${f1(oy - 150 * s)}" stroke="#1f2937" stroke-width="2.5"/>` +
    `<circle cx="${ox}" cy="${oy}" r="3.5" fill="#1f2937"/>` +
    `<text x="${f1(ox + R * Math.cos(lr))}" y="${f1(oy - R * Math.sin(lr) + 5)}" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">${labR}</text>` +
    `<text x="${f1(ox + R * Math.cos(ll))}" y="${f1(oy - R * Math.sin(ll) + 5)}" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">${labL}</text>` +
    `</svg>`
  );
}

/** Rectangle drawn in proportion (true length L, width W) with side labels. */
function rectSvg(L: number, W: number, labL: string, labW: string, aria: string): string {
  const sc = Math.min(240 / L, 130 / W);
  const w = L * sc, h = W * sc;
  const x0 = (330 - w) / 2 + 10, y0 = 40 + (130 - h) / 2;
  const x1 = x0 + w, y1 = y0 + h, m = 9;
  const corners =
    `M${f1(x0 + m)},${f1(y0)} V${f1(y0 + m)} H${f1(x0)} M${f1(x1 - m)},${f1(y0)} V${f1(y0 + m)} H${f1(x1)} ` +
    `M${f1(x0 + m)},${f1(y1)} V${f1(y1 - m)} H${f1(x0)} M${f1(x1 - m)},${f1(y1)} V${f1(y1 - m)} H${f1(x1)}`;
  return (
    `<svg viewBox="0 0 420 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect width="420" height="200" fill="#ffffff"/>` +
    `<rect x="${f1(x0)}" y="${f1(y0)}" width="${f1(w)}" height="${f1(h)}" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/>` +
    `<path d="${corners}" fill="none" stroke="#334155" stroke-width="1.2"/>` +
    `<text x="${f1(x0 + w / 2)}" y="${f1(y0 - 10)}" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">${labL}</text>` +
    `<text x="${f1(x1 + 8)}" y="${f1(y0 + h / 2 + 5)}" font-size="14" font-family="sans-serif" text-anchor="start" fill="#1f2937">${labW}</text>` +
    `</svg>`
  );
}

/* ---------------------- equation "sides" (check-solution) ----------------- */

/** m·(a·v + b); m = 1 means no bracket; a = 0 means a plain number. */
interface Side {
  m: number;
  a: number;
  b: number;
}
const sideStr = (s: Side, v: string): string => (s.m === 1 ? lin(s.a, s.b, v) : `${s.m}(${lin(s.a, s.b, v)})`);
const sideVal = (s: Side, k: number): number => s.m * (s.a * k + s.b);
function sideSub(s: Side, k: number): string {
  if (s.a === 0) return num(s.m * s.b);
  const inner = subLin(s.a, s.b, k);
  return s.m === 1 ? `${inner} = ${num(sideVal(s, k))}` : `${num(s.m)} × (${inner}) = ${num(sideVal(s, k))}`;
}

/** "(2x + 10)°" or "3x°" in maths markup, and the SVG/plain-text twin. */
const angleLab = (a: number, b: number): string => (b === 0 ? `${M(term(a, "x"))}°` : `(${M(lin(a, b))})°`);
const angleLabSvg = (a: number, b: number): string => (b === 0 ? `${term(a, "x")}°` : `(${plain(lin(a, b))})°`);
const sideLab = (a: number, b: number): string => (b === 0 ? `${term(a, "x")} cm` : `(${plain(lin(a, b))}) cm`);

/** Steps for "these linear parts add up to total". */
function sumSteps(parts: Array<[number, number]>, total: number, fact: string): string[] {
  const A = parts.reduce((s, p) => s + p[0], 0), B = parts.reduce((s, p) => s + p[1], 0);
  const shown = parts.map(([a, b]) => (b === 0 ? term(a, "x") : `(${lin(a, b)})`)).join(" + ");
  return [`${fact}: ${M(`${shown} = ${total}`)}.`, `Collect like terms: ${M(`${lin(A, B)} = ${total}`)}.`, ...solveSteps(A, B, 0, total, "x")];
}

/* ------------------------------------------------------------------------ */
/* Drills                                                                    */
/* ------------------------------------------------------------------------ */

export const drills: Drill[] = [
  /* 1 ─────────────────────────── one-step equations ─────────────────────── */
  {
    id: "equations.one-step",
    topicId: TOPIC,
    title: "Solve a one-step equation",
    level: 1,
    guideRef: "solving-equations",
    generate(rng, tier) {
      const v = rng.pick(VARS);
      const flip = tier >= 2 && rng.bool(0.3);
      const eq = (l: string, r: string | number) => M(flip ? `${r} = ${l}` : `${l} = ${r}`);
      const lead = rng.pick(["Solve", "Solve the equation", `Find the value of ${v} when`]);
      const hint = `What has been done to ${v}? Do the inverse operation to both sides.`;
      const form = tier === 3 ? rng.pick(["subFrom", "frac", "dec", "mul"] as const) : rng.pick(["add", "sub", "mul", "div"] as const);

      if (form === "add" || form === "sub") {
        let x = 5, a = 3;
        for (let i = 0; i < 100; i++) {
          x = tier === 1 ? rng.int(1, 20) : rng.nonZero(-20, 20);
          a = tier === 1 ? rng.int(2, 15) : rng.int(2, 25);
          if (form === "sub" && tier === 1 && x <= a) continue;
          break;
        }
        const add = form === "add";
        const b = add ? x + a : x - a;
        const T = trapper(x);
        if (add) T.add(b + a, 1, `To undo + ${a}, subtract ${a} from both sides — you added it instead.`);
        else T.add(b - a, 1, `To undo − ${a}, add ${a} to both sides — you subtracted it instead.`);
        return {
          prompt: `${lead} ${eq(`${v} ${add ? "+" : "-"} ${a}`, b)}.`,
          answer: valueSpec(x),
          solution: [
            add ? `The inverse of adding ${a} is subtracting ${a}, so subtract ${a} from both sides.` : `The inverse of subtracting ${a} is adding ${a}, so add ${a} to both sides.`,
            `${v} = ${num(b)} ${add ? "−" : "+"} ${a} = ${num(x)}`,
            `Check: ${num(x)} ${add ? "+" : "−"} ${a} = ${num(b)} ✓`,
          ],
          hint,
          traps: T.traps,
        };
      }

      if (form === "mul") {
        const a = tier === 1 ? rng.int(2, 12) : rng.pick([-1, 1]) * rng.int(2, 12);
        const x = tier === 1 ? rng.int(2, 12) : rng.pick([-1, 1]) * rng.int(2, 15);
        const b = a * x;
        const T = trapper(x);
        T.add(b - a, 1, `${M(`${a}${v}`)} means ${num(a)} × ${v}, so divide by ${num(a)} — don't subtract.`);
        T.add(a, b, `That's upside down: work out ${num(b)} ÷ ${br(a)}, not ${num(a)} ÷ ${br(b)}.`);
        if (a < 0) T.add(-x, 1, "Check the sign: think carefully about the sign when you divide by a negative number.");
        return {
          prompt: `${lead} ${eq(`${a}${v}`, b)}.`,
          answer: valueSpec(x),
          solution: [
            `${M(`${a}${v}`)} means ${num(a)} × ${v}. The inverse of multiplying by ${num(a)} is dividing by ${num(a)}.`,
            `${v} = ${num(b)} ÷ ${br(a)} = ${num(x)}`,
            `Check: ${num(a)} × ${br(x)} = ${num(b)} ✓`,
          ],
          hint,
          traps: T.traps,
        };
      }

      if (form === "div") {
        const a = rng.int(2, 10);
        const q = tier === 1 ? rng.int(2, 12) : rng.nonZero(-15, 15);
        const x = a * q;
        const T = trapper(x);
        T.add(q, a, `${M(`${v}/${a}`)} means ${v} ÷ ${a}. Undo it by multiplying by ${a}, not dividing.`);
        return {
          prompt: `${lead} ${eq(`${v}/${a}`, q)}.`,
          answer: valueSpec(x),
          solution: [
            `${M(`${v}/${a}`)} means ${v} ÷ ${a}. The inverse is multiplying by ${a}, so multiply both sides by ${a}.`,
            `${v} = ${num(q)} × ${a} = ${num(x)}`,
            `Check: ${num(x)} ÷ ${a} = ${num(q)} ✓`,
          ],
          hint,
          traps: T.traps,
        };
      }

      if (form === "subFrom") {
        let a = 12, x = 5, b = 7;
        for (let i = 0; i < 100; i++) {
          a = rng.int(6, 30);
          x = rng.nonZero(-20, 20);
          b = a - x;
          if (b !== 0) break;
        }
        const T = trapper(x);
        T.add(b - a, 1, `Careful: ${M(`${a} - ${v} = ${b}`)} does not give ${v} = ${num(b)} − ${a}. Add ${v} to both sides first so the ${v} is positive.`);
        return {
          prompt: `${lead} ${eq(`${a} - ${v}`, b)}.`,
          answer: valueSpec(x),
          solution: [
            `Add ${v} to both sides so the ${v}-term is positive: ${M(`${a} = ${b} + ${v}`)}.`,
            `${undo(b)}: ${v} = ${a} ${b > 0 ? "−" : "+"} ${num(Math.abs(b))} = ${num(x)}.`,
            `Check: ${a} − ${br(x)} = ${num(b)} ✓`,
          ],
          hint: `Try adding ${v} to both sides first, so the ${v}-term is positive.`,
          traps: T.traps,
        };
      }

      if (form === "frac") {
        let a = 4, b = 10;
        for (let i = 0; i < 100; i++) {
          a = rng.int(2, 12);
          b = rng.nonZero(-40, 40);
          if (b % a !== 0) break;
        }
        const [p, q] = simplify(b, a);
        const g = gcd(b, a);
        const T = trapper(b, a);
        T.add(a, b, `That's upside down: ${v} = ${num(b)} ÷ ${a}, not ${a} ÷ ${br(b)}.`);
        return {
          prompt: `${lead} ${eq(`${a}${v}`, b)}. Give your answer as a fraction in its simplest form.`,
          answer: valueSpec(b, a),
          solution: [
            `Divide both sides by ${a}: ${M(`${v} = ${b}/${a}`)}.`,
            g > 1 ? `Simplify by dividing the top and bottom by ${g}: ${v} = ${frac(p, q)}.` : `${frac(p, q)} is already in its simplest form.`,
          ],
          hint: `Divide both sides by ${a}. The answer doesn't have to be a whole number.`,
          traps: T.traps,
        };
      }

      // dec: x ± 3.6 = 9.1 (tenths kept as integers)
      const add = rng.bool();
      let X = 25, P = 13;
      for (let i = 0; i < 100; i++) {
        X = rng.nonZero(-150, 150);
        P = rng.int(11, 99);
        if (X % 10 !== 0 && P % 10 !== 0 && Math.abs(X) >= 11) break;
      }
      const Q = add ? X + P : X - P;
      const xs = clean(X / 10), ps = clean(P / 10), qs = clean(Q / 10);
      const T = trapper(X, 10);
      if (add) T.add(Q + P, 10, `To undo + ${num(ps)}, subtract ${num(ps)} — you added it instead.`);
      else T.add(Q - P, 10, `To undo − ${num(ps)}, add ${num(ps)} — you subtracted it instead.`);
      return {
        prompt: `${lead} ${eq(`${v} ${add ? "+" : "-"} ${ps}`, qs)}.`,
        answer: { type: "number", value: xs },
        solution: [
          add ? `Subtract ${num(ps)} from both sides.` : `Add ${num(ps)} to both sides.`,
          `${v} = ${num(qs)} ${add ? "−" : "+"} ${num(ps)} = ${num(xs)}`,
          `Check: ${num(xs)} ${add ? "+" : "−"} ${num(ps)} = ${num(qs)} ✓`,
        ],
        hint: "Decimals work exactly like whole numbers: do the inverse operation to both sides. Line up the decimal points.",
        traps: T.traps,
      };
    },
  },

  /* 2 ─────────────────────────── two-step equations ─────────────────────── */
  {
    id: "equations.two-step",
    topicId: TOPIC,
    title: "Solve a two-step equation",
    level: 1,
    guideRef: "solving-equations",
    generate(rng, tier) {
      const v = rng.pick(VARS);
      const form = tier === 3 ? rng.pick(["std", "negx", "frac"] as const) : "std";
      let A = 3, B = 4, xn = 2, xd = 1, C = 10;
      for (let i = 0; i < 200; i++) {
        if (form === "std") {
          A = tier === 1 ? rng.int(2, 9) : rng.bool(0.25) ? -rng.int(2, 9) : rng.int(2, 9);
          xn = tier === 1 ? rng.int(1, 12) : rng.nonZero(-12, 12);
          xd = 1;
          B = tier === 1 ? (rng.bool(0.7) ? rng.int(1, 20) : -rng.int(1, 20)) : rng.nonZero(-25, 25);
          C = A * xn + B;
          if (tier === 1 && C <= 0) continue;
        } else if (form === "negx") {
          A = -rng.int(2, 9);
          B = rng.int(5, 30);
          xn = rng.nonZero(-12, 12);
          xd = 1;
          C = A * xn + B;
        } else {
          A = rng.int(2, 9);
          B = rng.nonZero(-20, 20);
          C = rng.int(-30, 30);
          if ((C - B) % A === 0) continue;
          [xn, xd] = simplify(C - B, A);
        }
        if (C === B) continue;
        break;
      }
      const constFirst = form === "negx" || (tier >= 2 && form === "std" && A > 0 && B > 0 && rng.bool(0.2));
      const lhs = constFirst ? linC(A, B, v) : lin(A, B, v);
      const eqs = tier >= 2 && rng.bool(0.25) ? `${C} = ${lhs}` : `${lhs} = ${C}`;
      const R = C - B;
      const solution = [`${undo(B)}: ${M(`${term(A, v)} = ${R}`)}.`, divideStep(A, R, v)];
      if (xd === 1) solution.push(`Check: ${subLin(A, B, xn, constFirst)} = ${num(C)} ✓`);
      const T = trapper(xn, xd);
      T.add(C + B, A, `To undo ${B > 0 ? `+ ${B}` : `− ${-B}`} you ${B > 0 ? "subtract" : "add"} ${Math.abs(B)} — you went the wrong way.`);
      T.add(C - A * B, A, `You divided before dealing with the ${Math.abs(B)}. Undo the ${B > 0 ? "+" : "−"} ${Math.abs(B)} first, then divide by ${num(A)}.`);
      if (A < 0) T.add(-R, A, "Dividing by a negative number changes the sign — check yours.");
      const lead = rng.pick(["Solve", "Solve the equation", `Find ${v} when`]);
      return {
        prompt: `${lead} ${M(eqs)}.${tier === 3 ? ` If ${v} is not a whole number, give it as a fraction in its simplest form.` : ""}`,
        answer: valueSpec(xn, xd),
        solution,
        hint: `Undo the operations in reverse order: first get rid of the ${Math.abs(B)}, then divide by ${num(A)}.`,
        traps: T.traps,
      };
    },
  },

  /* 3 ─────────────────────── inequality notation ────────────────────────── */
  {
    id: "equations.inequality-notation",
    topicId: TOPIC,
    title: "Read and write inequalities",
    level: 1,
    guideRef: "inequalities",
    generate(rng, tier) {
      const form = tier === 1 ? rng.pick(["line1", "line1", "words1"] as const) : tier === 2 ? rng.pick(["line1", "line2", "words1", "words2"] as const) : rng.pick(["line2", "words1", "words2"] as const);
      const lo = tier === 1 ? rng.int(-3, 0) : rng.int(-8, 0);

      if (form === "line1") {
        const k = rng.int(lo + 1, lo + 9);
        const rel = rng.pick(["<", "<=", ">", ">="] as const);
        const right = rel === ">" || rel === ">=";
        const closed = rel === "<=" || rel === ">=";
        const aria = `Number line from ${num(lo)} to ${num(lo + 10)} with ${closed ? "a filled-in (closed)" : "an open"} circle at ${num(k)} and an arrow pointing ${right ? "right" : "left"}.`;
        return {
          prompt: `Write down the inequality shown on the number line, using ${M("x")}. ${TYPE_TIP}`,
          diagram: numberLine(lo, [{ v: k, closed }], right ? "right" : "left", aria),
          answer: ineqSpec("x", rel, k),
          solution: [
            `The circle is at ${num(k)}. It is ${closed ? `filled in, so ${num(k)} is included` : `open, so ${num(k)} is not included`}.`,
            `The arrow points ${right ? "right, towards bigger numbers" : "left, towards smaller numbers"}, so x is ${right ? "greater" : "less"} than${closed ? " or equal to" : ""} ${num(k)}.`,
            `So ${M(`x ${rel} ${k}`)}.`,
          ],
          hint: "Two questions: is the circle open (not included) or filled in (included)? Which way does the arrow point?",
          traps: [
            { spec: ineqSpec("x", TOGGLE[rel], k), feedback: closed ? `The circle is filled in, so ${num(k)} IS included — use ${right ? "≥" : "≤"}.` : `The circle is open, so ${num(k)} is NOT included — use ${right ? ">" : "<"}.` },
            { spec: ineqSpec("x", FLIP[rel], k), feedback: `Look at the arrow: it points ${right ? "right, towards bigger" : "left, towards smaller"} numbers.` },
          ],
        };
      }

      if (form === "line2") {
        let a = lo + 2, b = lo + 6;
        for (let i = 0; i < 100; i++) {
          a = rng.int(lo + 1, lo + 7);
          b = a + rng.int(2, 7);
          if (b <= lo + 9) break;
        }
        const r1 = rng.pick(["<", "<="] as const), r2 = rng.pick(["<", "<="] as const);
        const aria = `Number line from ${num(lo)} to ${num(lo + 10)} with ${r1 === "<=" ? "a filled-in" : "an open"} circle at ${num(a)}, ${r2 === "<=" ? "a filled-in" : "an open"} circle at ${num(b)}, and a line joining them.`;
        const end = (val: number, r: Rel) => (r === "<=" ? `filled in at ${num(val)}, so ${num(val)} is included (≤)` : `open at ${num(val)}, so ${num(val)} is not included (<)`);
        return {
          prompt: `Write down the inequality shown on the number line, using ${M("x")}. ${TYPE_TIP}`,
          diagram: numberLine(lo, [{ v: a, closed: r1 === "<=" }, { v: b, closed: r2 === "<=" }], "none", aria),
          answer: twoSpec(a, r1, "x", r2, b),
          solution: [
            `The values lie between ${num(a)} and ${num(b)}, so write it as a two-sided inequality with the smaller number on the left.`,
            `Left end: ${end(a, r1)}. Right end: ${end(b, r2)}.`,
            `So ${M(`${a} ${r1} x ${r2} ${b}`)}.`,
          ],
          hint: "Write it as (smaller number) ? x ? (bigger number). Then decide < or ≤ at each end from the circles.",
          traps: [
            { spec: twoSpec(a, TOGGLE[r1], "x", r2, b), feedback: `Look again at the circle at ${num(a)}: ${r1 === "<=" ? "filled in means included, so use ≤" : "open means not included, so use <"}.` },
            { spec: twoSpec(a, r1, "x", TOGGLE[r2], b), feedback: `Look again at the circle at ${num(b)}: ${r2 === "<=" ? "filled in means included, so use ≤" : "open means not included, so use <"}.` },
          ],
        };
      }

      const v = rng.pick(["x", "n", "t", "y"] as const);
      if (form === "words1") {
        const rel = rng.pick(["<", "<=", ">", ">="] as const);
        const k = tier === 1 ? rng.int(1, 12) : rng.nonZero(-12, 12);
        const PH: Record<Rel, string[]> = {
          ">": ["is greater than", "is more than", "is bigger than"],
          ">=": tier === 1 ? ["is at least", "is greater than or equal to"] : ["is at least", "is greater than or equal to", "is no less than"],
          "<": ["is less than", "is smaller than"],
          "<=": tier === 1 ? ["is at most", "is less than or equal to"] : ["is at most", "is less than or equal to", "is no more than"],
        };
        const phrase = rng.pick(PH[rel]);
        const why: Record<Rel, string> = {
          ">": `${num(k)} itself is not allowed, only bigger numbers — so use >.`,
          ">=": `${num(k)} itself is allowed, and so is anything bigger — so use ≥.`,
          "<": `${num(k)} itself is not allowed, only smaller numbers — so use <.`,
          "<=": `${num(k)} itself is allowed, and so is anything smaller — so use ≤.`,
        };
        return {
          prompt: `Write this as an inequality: *${v} ${phrase} ${num(k)}*. ${TYPE_TIP}`,
          answer: ineqSpec(v, rel, k),
          solution: [`"${phrase}" — ${why[rel]}`, `So ${M(`${v} ${rel} ${k}`)}.`],
          hint: `Ask yourself: is ${num(k)} itself allowed? Then: bigger or smaller?`,
          traps: [
            { spec: ineqSpec(v, TOGGLE[rel], k), feedback: `Is ${num(k)} itself allowed? "${phrase}" ${rel.length === 2 ? "includes" : "does not include"} ${num(k)}.` },
            { spec: ineqSpec(v, FLIP[rel], k), feedback: `Your sign points the wrong way: "${phrase}" means ${v} is ${rel[0] === ">" ? "bigger" : "smaller"}.` },
          ],
        };
      }

      // words2: two-sided
      let a = -2, b = 5;
      for (let i = 0; i < 100; i++) {
        a = rng.int(-10, 6);
        b = a + rng.int(2, 9);
        if (a !== 0 && b !== 0) break;
      }
      const r1 = rng.pick(["<", "<="] as const), r2 = rng.pick(["<", "<="] as const);
      const lowP = r1 === "<" ? "greater than" : rng.pick(["at least", "greater than or equal to"]);
      const highP = r2 === "<" ? "less than" : rng.pick(["at most", "less than or equal to"]);
      return {
        prompt: `Write this as a single inequality: *${v} is ${lowP} ${num(a)} and ${highP} ${num(b)}*. ${TYPE_TIP}`,
        answer: twoSpec(a, r1, v, r2, b),
        solution: [
          `"${lowP} ${num(a)}" gives ${M(`${a} ${r1} ${v}`)}, and "${highP} ${num(b)}" gives ${M(`${v} ${r2} ${b}`)}.`,
          `Put them together with the smaller number on the left: ${M(`${a} ${r1} ${v} ${r2} ${b}`)}.`,
        ],
        hint: `Write each part separately, then join them as (smaller number) ? ${v} ? (bigger number).`,
        traps: [
          { spec: twoSpec(a, TOGGLE[r1], v, r2, b), feedback: `"${lowP}" ${r1 === "<=" ? "includes" : "does not include"} ${num(a)} — check the left-hand sign.` },
          { spec: twoSpec(a, r1, v, TOGGLE[r2], b), feedback: `"${highP}" ${r2 === "<=" ? "includes" : "does not include"} ${num(b)} — check the right-hand sign.` },
        ],
      };
    },
  },

  /* 4 ───────────────────── checking by substitution ─────────────────────── */
  {
    id: "equations.check-solution",
    topicId: TOPIC,
    title: "Check a solution by substituting",
    level: 2,
    guideRef: "solving-equations",
    generate(rng, tier) {
      const v = rng.pick(["x", "y", "n", "a"] as const);
      let L: Side = { m: 1, a: 2, b: 3 }, R: Side = { m: 1, a: 0, b: 9 }, s = 3;
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          s = rng.int(1, 10);
          const a = rng.int(2, 6), b = rng.int(1, 15);
          L = { m: 1, a, b };
          R = { m: 1, a: 0, b: a * s + b };
          break;
        } else if (tier === 2) {
          s = rng.nonZero(-8, 8);
          const a = rng.int(1, 9), c = rng.int(1, 9), b = rng.nonZero(-15, 15);
          if (a === c) continue;
          const d = (a - c) * s + b;
          if (d === 0 || Math.abs(d) > 40) continue;
          L = { m: 1, a, b };
          R = { m: 1, a: c, b: d };
          break;
        } else {
          s = rng.nonZero(-8, 8);
          const m = rng.int(2, 5), p = rng.nonZero(-8, 8), c = rng.int(1, 9);
          if (c === m || s + p === 0) continue;
          const d = m * (s + p) - c * s;
          if (d === 0 || Math.abs(d) > 50) continue;
          L = { m, a: 1, b: p };
          R = { m: 1, a: c, b: d };
          break;
        }
      }
      const eqs = `${sideStr(L, v)} = ${sideStr(R, v)}`;
      // Expanded form A·v + B = C·v + D, for the "solve it properly" steps.
      const A = L.m * L.a, B = L.m * L.b, C = R.m * R.a, D = R.m * R.b;
      const pool = rng.shuffle([...new Set([s + 1, s - 1, s + 2, s - 2, -s, s + 3, s - 3])].filter((k) => k !== s && (tier > 1 || k >= 1)));
      const T = trapper(s);

      if (rng.bool()) {
        const P = person(rng);
        const right = rng.bool(0.35);
        const k = right ? s : pool[0];
        const Lk = sideVal(L, k), Rk = sideVal(R, k);
        if (!right) T.add(k, 1, `With ${v} = ${num(k)} the left side is ${num(Lk)} but the right side is ${num(Rk)} — they don't balance, so ${num(k)} isn't the solution.`);
        const solution = [`Left side with ${v} = ${num(k)}: ${sideSub(L, k)}.`, `Right side: ${sideSub(R, k)}.`];
        if (right) solution.push(`Both sides equal ${num(Lk)}, so ${P.name} is right: ${v} = ${num(s)}.`);
        else {
          solution.push(`${num(Lk)} ≠ ${num(Rk)}, so ${v} = ${num(k)} is not the solution. Solve it properly:`);
          if (L.m !== 1) solution.push(`Expand: ${M(`${lin(A, B, v)} = ${sideStr(R, v)}`)}.`);
          solution.push(...solveSteps(A, B, C, D, v));
          solution.push(`Check: with ${v} = ${num(s)} both sides equal ${num(sideVal(L, s))} ✓`);
        }
        return {
          prompt: `${P.name} says that ${M(`${v} = ${k}`)} is the solution of ${M(eqs)}. Check by substituting ${M(`${v} = ${k}`)} into both sides. What is the correct value of ${v}?`,
          answer: valueSpec(s),
          solution,
          hint: `Work out each side separately with ${v} = ${num(k)}. A solution makes both sides equal; if they aren't equal, solve the equation yourself.`,
          traps: T.traps,
        };
      }

      const cands = rng.shuffle([s, pool[0], pool[1]]);
      for (const c of cands) if (c !== s) T.add(c, 1, `Try it: with ${v} = ${num(c)} the left side is ${num(sideVal(L, c))} but the right side is ${num(sideVal(R, c))}.`);
      const shown = cands.map((c) => M(`${v} = ${c}`));
      return {
        prompt: `One of ${shown[0]}, ${shown[1]} and ${shown[2]} is the solution of ${M(eqs)}. Substitute each value to find which one, then type that value of ${v}.`,
        answer: valueSpec(s),
        solution: [
          ...cands.map((c) => `${v} = ${num(c)}: left side ${sideSub(L, c)}; right side ${sideSub(R, c)}${sideVal(L, c) === sideVal(R, c) ? " — equal ✓" : " — not equal ✗"}`),
          `Only ${v} = ${num(s)} makes both sides equal, so ${v} = ${num(s)}.`,
        ],
        hint: "Substitute each value into the left side and the right side separately. The solution makes them equal.",
        traps: T.traps,
      };
    },
  },

  /* 5 ───────────────────────── equations with brackets ───────────────────── */
  {
    id: "equations.brackets",
    topicId: TOPIC,
    title: "Solve an equation with brackets",
    level: 2,
    guideRef: "equations-with-brackets",
    generate(rng, tier) {
      const v = rng.pick(VARS);
      const form = tier === 3 ? rng.pick(["plusq", "two", "fracx"] as const) : "one";
      const lead = rng.pick(["Solve", "Solve the equation"]);
      const fracNote = tier === 3 ? ` If ${v} is not a whole number, give it as a fraction in its simplest form.` : "";

      if (form === "one") {
        let m = 3, a = 1, p = 2, x = 4, inner = 6;
        for (let i = 0; i < 200; i++) {
          m = tier === 1 ? rng.int(2, 6) : rng.bool(0.3) ? -rng.int(2, 6) : rng.int(2, 8);
          a = tier === 1 ? 1 : rng.bool(0.6) ? 1 : rng.int(2, 5);
          p = tier === 1 ? (rng.bool(0.7) ? rng.int(1, 9) : -rng.int(1, 9)) : rng.nonZero(-9, 9);
          x = tier === 1 ? rng.int(1, 10) : rng.nonZero(-10, 10);
          inner = a * x + p;
          if (inner === 0 || (tier === 1 && inner < 0)) continue;
          break;
        }
        const c = m * inner;
        const solution = [`Divide both sides by ${num(m)}: ${M(`${lin(a, p, v)} = ${inner}`)}.`, `${undo(p)}: ${M(`${term(a, v)} = ${inner - p}`)}.`];
        if (a !== 1) solution.push(divideStep(a, inner - p, v));
        else solution[1] = `${undo(p)}: ${v} = ${num(x)}.`;
        solution.push(`Or expand first: ${M(`${lin(m * a, m * p, v)} = ${c}`)}, then ${M(`${term(m * a, v)} = ${c - m * p}`)} — same answer. Dividing first is quicker here because ${num(c)} ÷ ${br(m)} is a whole number.`);
        const T = trapper(x);
        T.add(c - p, m * a, `When you expand, ${num(m)} multiplies BOTH terms: ${num(m)} × ${br(p)} = ${num(m * p)}, not ${num(p)}.`);
        if (m < 0) T.add(c + m * p, m * a, `Sign slip: ${num(m)} × ${br(p)} = ${num(m * p)}.`);
        return {
          prompt: `${lead} ${M(`${m}(${lin(a, p, v)}) = ${c}`)}.`,
          answer: valueSpec(x),
          solution,
          hint: `Either divide both sides by ${num(m)} first, or expand the bracket first. Which is easier here?`,
          traps: T.traps,
        };
      }

      if (form === "plusq") {
        let m = 3, a = 2, p = 1, q = 4, x = 3, inner = 7, c = 25;
        for (let i = 0; i < 200; i++) {
          m = rng.bool(0.3) ? -rng.int(2, 6) : rng.int(2, 6);
          a = rng.int(1, 4);
          p = rng.nonZero(-9, 9);
          q = rng.nonZero(-15, 15);
          x = rng.nonZero(-10, 10);
          inner = a * x + p;
          c = m * inner + q;
          if (inner !== 0 && c !== 0) break;
        }
        const solution = [
          `${undo(q)}: ${M(`${m}(${lin(a, p, v)}) = ${c - q}`)}.`,
          `Divide both sides by ${num(m)}: ${M(`${lin(a, p, v)} = ${inner}`)}.`,
          `${undo(p)}: ${M(`${term(a, v)} = ${inner - p}`)}.`,
        ];
        if (a !== 1) solution.push(divideStep(a, inner - p, v));
        else solution[2] = `${undo(p)}: ${v} = ${num(x)}.`;
        const T = trapper(x);
        T.add(c - q - p, m * a, `Expand carefully: ${num(m)} multiplies both terms in the bracket, so the constant becomes ${num(m * p)}.`);
        T.add(c - m * p, m * a, `Deal with the ${num(q)} outside the bracket before you divide by ${num(m)}.`);
        return {
          prompt: `${lead} ${M(`${m}(${lin(a, p, v)}) ${q < 0 ? "-" : "+"} ${Math.abs(q)} = ${c}`)}.${fracNote}`,
          answer: valueSpec(x),
          solution,
          hint: `Get the bracket on its own first: deal with the ${q < 0 ? "−" : "+"} ${Math.abs(q)}.`,
          traps: T.traps,
        };
      }

      if (form === "two") {
        let m = 3, n = 2, p = 1, r = 4, x = 2, c = 20;
        for (let i = 0; i < 300; i++) {
          m = rng.int(2, 6);
          n = rng.bool(0.4) ? -rng.int(2, 6) : rng.int(2, 6);
          p = rng.nonZero(-9, 9);
          r = rng.nonZero(-9, 9);
          x = rng.nonZero(-10, 10);
          c = m * (x + p) + n * (x + r);
          if (Math.abs(m + n) >= 2 && c !== 0) break;
        }
        const K = m * p + n * r;
        const T = trapper(x);
        T.add(c - p - r, m + n, `Multiply every term inside each bracket: ${num(m)} × ${br(p)} and ${num(n)} × ${br(r)}.`);
        if (n < 0) T.add(c - m * p + n * r, m + n, `Careful with the minus: ${num(n)} × ${br(r)} = ${num(n * r)}.`);
        return {
          prompt: `${lead} ${M(`${m}(${lin(1, p, v)}) ${n < 0 ? "-" : "+"} ${Math.abs(n)}(${lin(1, r, v)}) = ${c}`)}.${fracNote}`,
          answer: valueSpec(x),
          solution: [
            `Expand both brackets: ${M(`${poly([[m, v], [m * p, ""], [n, v], [n * r, ""]])} = ${c}`)}.`,
            `Collect like terms: ${M(`${lin(m + n, K, v)} = ${c}`)}.`,
            ...solveSteps(m + n, K, 0, c, v),
          ],
          hint: `Expand both brackets${n < 0 ? ` (the ${num(n)} multiplies both terms in the second bracket)` : ""}, then collect like terms.`,
          traps: T.traps,
        };
      }

      // fracx: m(ax + p) = c with a fractional answer — expanding first is neater.
      let m = 4, a = 2, p = -1, c = 10;
      for (let i = 0; i < 300; i++) {
        m = rng.int(2, 6);
        a = rng.int(2, 5);
        p = rng.nonZero(-9, 9);
        c = rng.nonZero(-40, 40);
        const R = c - m * p;
        if (R !== 0 && R % (m * a) !== 0) break;
      }
      const R = c - m * p;
      const T = trapper(R, m * a);
      T.add(c - p, m * a, `When you expand, ${m} multiplies both terms: the constant is ${num(m * p)}, not ${num(p)}.`);
      T.add(c + m * p, m * a, `${undo(m * p)} — check which way you moved the ${num(m * p)}.`);
      return {
        prompt: `${lead} ${M(`${m}(${lin(a, p, v)}) = ${c}`)}.${fracNote}`,
        answer: valueSpec(R, m * a),
        solution: [
          `Expand the bracket: ${M(`${lin(m * a, m * p, v)} = ${c}`)}. (Dividing by ${m} first would give fractions straight away.)`,
          `${undo(m * p)}: ${M(`${term(m * a, v)} = ${R}`)}.`,
          divideStep(m * a, R, v),
        ],
        hint: `Expand the bracket first, then solve the two-step equation.`,
        traps: T.traps,
      };
    },
  },

  /* 6 ─────────────────────────── unknowns on both sides ─────────────────── */
  {
    id: "equations.both-sides",
    topicId: TOPIC,
    title: "Solve with the unknown on both sides",
    level: 2,
    guideRef: "unknowns-both-sides",
    generate(rng, tier) {
      const v = rng.pick(VARS);
      const form = tier === 3 ? rng.pick(["brk", "brk2", "frac"] as const) : "plain";
      let A = 5, B = 3, C = 2, D = 12, xn = 3, xd = 1;
      let shownL = "", shownR = "";
      const pre: string[] = [];
      for (let i = 0; i < 300; i++) {
        if (form === "plain") {
          if (tier === 1) {
            A = rng.int(3, 9);
            C = rng.int(1, A - 1);
            xn = rng.int(1, 10);
            B = rng.int(1, 15);
          } else {
            A = rng.nonZero(-9, 9);
            C = rng.nonZero(-9, 9);
            xn = rng.nonZero(-10, 10);
            B = rng.nonZero(-15, 15);
            if (A === C || (A < 0 && C < 0)) continue;
          }
          xd = 1;
          D = (A - C) * xn + B;
          if (D === 0 || Math.abs(D) > 60) continue;
          shownL = A < 0 && B > 0 ? linC(A, B, v) : lin(A, B, v);
          shownR = C < 0 && D > 0 ? linC(C, D, v) : lin(C, D, v);
          break;
        } else if (form === "brk") {
          const m = rng.int(2, 6), p = rng.nonZero(-8, 8);
          C = rng.nonZero(-9, 9);
          xn = rng.nonZero(-10, 10);
          xd = 1;
          if (C === m) continue;
          A = m;
          B = m * p;
          D = m * (xn + p) - C * xn;
          if (D === 0 || Math.abs(D) > 60) continue;
          shownL = `${m}(${lin(1, p, v)})`;
          shownR = C < 0 && D > 0 ? linC(C, D, v) : lin(C, D, v);
          pre.length = 0;
          pre.push(`Expand the bracket: ${M(`${lin(A, B, v)} = ${shownR}`)}.`);
          break;
        } else if (form === "brk2") {
          const m = rng.int(2, 7), n = rng.int(2, 7), p = rng.nonZero(-9, 9);
          xn = rng.nonZero(-10, 10);
          xd = 1;
          if (m === n) continue;
          const top = m * (xn + p) - n * xn;
          if (top % n !== 0) continue;
          const q = top / n;
          if (q === 0 || Math.abs(q) > 12) continue;
          A = m;
          B = m * p;
          C = n;
          D = n * q;
          shownL = `${m}(${lin(1, p, v)})`;
          shownR = `${n}(${lin(1, q, v)})`;
          pre.length = 0;
          pre.push(`Expand both brackets: ${M(`${lin(A, B, v)} = ${lin(C, D, v)}`)}.`);
          break;
        } else {
          A = rng.int(1, 9);
          C = rng.int(1, 9);
          B = rng.nonZero(-20, 20);
          D = rng.nonZero(-20, 20);
          if (A === C || (D - B) % (A - C) === 0) continue;
          [xn, xd] = simplify(D - B, A - C);
          shownL = lin(A, B, v);
          shownR = lin(C, D, v);
          break;
        }
      }
      const swap = tier === 1 && rng.bool(0.3);
      const eqs = swap ? `${shownR} = ${shownL}` : `${shownL} = ${shownR}`;
      const T = trapper(xn, xd);
      // Traps depend on which side the unknown is collected on (the larger coefficient).
      const leftSide = A > C;
      const moved = leftSide ? C : A; // x-term moved across
      const kept = leftSide ? B : D; // number moved across in the second step
      if (A + C !== 0) {
        const fb = `To move ${M(term(moved, v))} across, ${moved > 0 ? "subtract" : "add"} ${M(term(Math.abs(moved), v))} on both sides — its sign changes when it moves.`;
        if (leftSide) T.add(D - B, A + C, fb);
        else T.add(B - D, A + C, fb);
      }
      if (leftSide) T.add(D + B, A - C, `Sign slip: to move the ${kept > 0 ? "+" : "−"} ${Math.abs(kept)}, ${kept > 0 ? "subtract" : "add"} ${Math.abs(kept)} on both sides.`);
      else T.add(B + D, C - A, `Sign slip: to move the ${kept > 0 ? "+" : "−"} ${Math.abs(kept)}, ${kept > 0 ? "subtract" : "add"} ${Math.abs(kept)} on both sides.`);
      return {
        prompt: `Solve ${M(eqs)}.${tier === 3 ? ` If ${v} is not a whole number, give it as a fraction in its simplest form.` : ""}`,
        answer: valueSpec(xn, xd),
        solution: [...pre, ...(swap ? [`Turn it round if you like: ${M(`${shownL} = ${shownR}`)}.`] : []), ...solveSteps(A, B, C, D, v)],
        hint: `Get all the ${v}-terms on one side — the side with the bigger ${v}-coefficient, so they stay positive.`,
        traps: T.traps,
      };
    },
  },

  /* 7 ───────────────────────── equations with fractions ─────────────────── */
  {
    id: "equations.fractions",
    topicId: TOPIC,
    title: "Solve an equation with fractions",
    level: 2,
    guideRef: "fractional-equations",
    generate(rng, tier) {
      const v = rng.pick(VARS);
      const form = tier === 1 ? rng.pick(["xa", "brx", "coef"] as const) : tier === 2 ? rng.pick(["xa", "brx", "coef", "num"] as const) : rng.pick(["num", "two", "cross"] as const);
      const lead = rng.pick(["Solve", "Solve the equation"]);

      if (form === "xa") {
        let a = 3, q = 4, b = 2;
        for (let i = 0; i < 100; i++) {
          a = tier === 1 ? rng.int(2, 6) : rng.int(2, 9);
          q = tier === 1 ? rng.int(1, 10) : rng.nonZero(-10, 10);
          b = tier === 1 ? (rng.bool(0.7) ? rng.int(1, 12) : -rng.int(1, 12)) : rng.nonZero(-15, 15);
          if (tier === 1 && q + b <= 0) continue;
          break;
        }
        const c = q + b, x = a * q;
        const T = trapper(x);
        T.add(a * c - b, 1, `If you multiply through by ${a}, multiply EVERY term — the ${num(b)} becomes ${num(a * b)}. (Or deal with the ${num(b)} first.)`);
        T.add(q, a, `${M(`${v}/${a}`)} means ${v} ÷ ${a}, so multiply by ${a} — don't divide.`);
        return {
          prompt: `${lead} ${M(`${v}/${a} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${c}`)}.`,
          answer: valueSpec(x),
          solution: [
            `${undo(b)}: ${M(`${v}/${a} = ${q}`)}.`,
            `Multiply both sides by ${a}: ${v} = ${num(q)} × ${a} = ${num(x)}.`,
            `Check: ${num(x)} ÷ ${a} = ${num(q)}, and ${num(q)} ${b < 0 ? "−" : "+"} ${Math.abs(b)} = ${num(c)} ✓`,
          ],
          hint: `Get ${M(`${v}/${a}`)} on its own first, then undo the ÷ ${a}.`,
          traps: T.traps,
        };
      }

      if (form === "brx") {
        let a = 3, b = 2, c = 5, x = 13;
        for (let i = 0; i < 100; i++) {
          a = tier === 1 ? rng.int(2, 6) : rng.int(2, 9);
          b = tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 9);
          c = tier === 1 ? rng.int(2, 9) : rng.nonZero(-9, 9);
          x = a * c - b;
          if (x !== 0 && (tier > 1 || x > 0)) break;
        }
        const T = trapper(x);
        T.add(a * (c - b), 1, `The ${num(b)} is inside the fraction, so multiply both sides by ${a} first, then deal with it.`);
        T.add(a * c + b, 1, `${undo(b)} — you moved the ${num(Math.abs(b))} the wrong way.`);
        return {
          prompt: `${lead} ${M(`(${lin(1, b, v)})/${a} = ${c}`)}.`,
          answer: valueSpec(x),
          solution: [
            `The whole of ${M(lin(1, b, v))} is divided by ${a}, so multiply both sides by ${a}: ${M(`${lin(1, b, v)} = ${a * c}`)}.`,
            `${undo(b)}: ${v} = ${num(a * c)} ${b > 0 ? "−" : "+"} ${Math.abs(b)} = ${num(x)}.`,
            `Check: ${M(`(${x} ${b < 0 ? "-" : "+"} ${Math.abs(b)})/${a}`)} = ${M(`${x + b}/${a}`)} = ${num(c)} ✓`,
          ],
          hint: `Multiply both sides by ${a} to clear the fraction.`,
          traps: T.traps,
        };
      }

      if (form === "coef") {
        let p = 2, a = 3, k = 4;
        for (let i = 0; i < 100; i++) {
          p = rng.int(2, 5);
          a = rng.int(3, 9);
          k = tier === 1 ? rng.int(1, 8) : rng.nonZero(-10, 10);
          if (gcd(p, a) === 1 && p < a) break;
        }
        const x = a * k, c = p * k;
        const shown = rng.bool() ? `(${p}${v})/${a}` : `${p}/${a} ${v}`;
        const T = trapper(x);
        T.add(c * p, a, `You multiplied by ${M(`${p}/${a}`)}. To undo it, multiply by the reciprocal ${M(`${a}/${p}`)}.`);
        T.add(a * c, 1, `That's ${M(`${p}${v}`)}, not ${v} — divide by ${p} as well.`);
        return {
          prompt: `${lead} ${M(`${shown} = ${c}`)}.`,
          answer: valueSpec(x),
          solution: [
            `Multiply both sides by ${a}: ${M(`${p}${v} = ${a * c}`)}.`,
            `Divide both sides by ${p}: ${v} = ${num(a * c)} ÷ ${p} = ${num(x)}.`,
            `(Quicker: multiply both sides by the reciprocal ${M(`${a}/${p}`)}.)`,
          ],
          hint: `${M(`${p}/${a}`)} of ${v} is ${num(c)}. Multiply by ${a}, then divide by ${p}.`,
          traps: T.traps,
        };
      }

      if (form === "num") {
        let p = 2, q = -1, a = 5, x = 8, c = 3;
        for (let i = 0; i < 300; i++) {
          p = rng.int(2, 5);
          q = rng.nonZero(-12, 12);
          a = rng.int(2, 9);
          x = rng.nonZero(-10, 10);
          const top = p * x + q;
          if (top === 0 || top % a !== 0 || gcd(gcd(p, q), a) !== 1) continue;
          c = top / a;
          break;
        }
        const T = trapper(x);
        T.add(c - q, p, `Multiply both sides by ${a} first — the whole of ${M(lin(p, q, v))} is divided by ${a}.`);
        T.add(a * c + q, p, `${undo(q)} — check which way you moved the ${num(Math.abs(q))}.`);
        return {
          prompt: `${lead} ${M(`(${lin(p, q, v)})/${a} = ${c}`)}.`,
          answer: valueSpec(x),
          solution: [
            `Multiply both sides by ${a}: ${M(`${lin(p, q, v)} = ${a * c}`)}.`,
            `${undo(q)}: ${M(`${p}${v} = ${a * c - q}`)}.`,
            divideStep(p, a * c - q, v),
          ],
          hint: `Clear the fraction first: multiply both sides by ${a}.`,
          traps: T.traps,
        };
      }

      if (form === "two") {
        let a = 2, b = 3, s = 1, t = 2;
        for (let i = 0; i < 100; i++) {
          a = rng.int(2, 6);
          b = rng.int(2, 6);
          s = rng.bool(0.65) ? 1 : -1;
          t = rng.nonZero(-4, 4);
          if (a !== b && (s > 0 || a < b)) break;
        }
        const L = lcm(a, b);
        const K = L / a + s * (L / b);
        const x = L * t, c = t * K;
        const T = trapper(x);
        if (s > 0) T.add(c * (a + b), 1, `${M(`${v}/${a} + ${v}/${b}`)} is not ${M(`${v}/${a + b}`)} — you can't add denominators. Multiply every term by ${L}.`);
        T.add(c * L, 1, `After multiplying by ${L}, collect the ${v}-terms: ${M(`${term(L / a, v)} ${s > 0 ? "+" : "-"} ${term(L / b, v)} = ${term(K, v)}`)}.`);
        return {
          prompt: `${lead} ${M(`${v}/${a} ${s > 0 ? "+" : "-"} ${v}/${b} = ${c}`)}.`,
          answer: valueSpec(x),
          solution: [
            `The LCM of ${a} and ${b} is ${L}. Multiply every term by ${L}: ${M(`${term(L / a, v)} ${s > 0 ? "+" : "-"} ${term(L / b, v)} = ${L * c}`)}.`,
            `Collect like terms: ${M(`${term(K, v)} = ${L * c}`)}.`,
            divideStep(K, L * c, v),
          ],
          hint: `Multiply every term by the lowest common multiple of ${a} and ${b}.`,
          traps: T.traps,
        };
      }

      // cross: (x + p)/a = (x + q)/b
      let a = 3, b = 2, x = 4, p = 2, q = 0;
      for (let i = 0; i < 300; i++) {
        a = rng.int(2, 7);
        b = rng.int(2, 7);
        const t = rng.nonZero(-6, 6);
        x = rng.nonZero(-12, 12);
        p = a * t - x;
        q = b * t - x;
        if (a !== b && p !== 0 && q !== 0 && Math.abs(p) <= 15 && Math.abs(q) <= 15) break;
      }
      const T = trapper(x);
      T.add(b * q - a * p, a - b, `Cross-multiply the right way: the ${b} multiplies ${M(lin(1, p, v))} and the ${a} multiplies ${M(lin(1, q, v))}.`);
      return {
        prompt: `${lead} ${M(`(${lin(1, p, v)})/${a} = (${lin(1, q, v)})/${b}`)}.`,
        answer: valueSpec(x),
        solution: [
          `Multiply both sides by ${a * b} (the same as cross-multiplying): ${M(`${b}(${lin(1, p, v)}) = ${a}(${lin(1, q, v)})`)}.`,
          `Expand: ${M(`${lin(b, b * p, v)} = ${lin(a, a * q, v)}`)}.`,
          ...solveSteps(b, b * p, a, a * q, v),
        ],
        hint: `Multiply both sides by ${a} × ${b} to clear both fractions.`,
        traps: T.traps,
      };
    },
  },

  /* 8 ─────────────────────── forming equations from words ───────────────── */
  {
    id: "equations.form-words",
    topicId: TOPIC,
    title: "Form and solve an equation from words",
    level: 2,
    guideRef: "forming-equations",
    generate(rng, tier) {
      const form =
        tier === 1 ? rng.pick(["think1", "consec", "agesTimes", "shop"] as const)
        : tier === 2 ? rng.pick(["think2", "consec", "agesTimes", "agesDiff", "taxi"] as const)
        : rng.pick(["think3", "consecEven", "agesFuture", "shop2"] as const);
      const P = person(rng);

      if (form === "think1") {
        let a = 3, n = 7, b = 5, add = true, c = 26;
        for (let i = 0; i < 100; i++) {
          a = rng.int(2, 9);
          n = rng.int(2, 20);
          b = rng.int(1, 20);
          add = rng.bool();
          c = add ? a * n + b : a * n - b;
          if (c > 0) break;
        }
        const B = add ? b : -b;
        const T = trapper(n);
        T.add(c + B, a, `To undo ${add ? "adding" : "subtracting"} ${b}, ${add ? "subtract" : "add"} ${b} — work backwards.`);
        T.add(c - a * B, a, `Work backwards in reverse order: undo the ${add ? "+" : "−"} ${b} first, then divide by ${a}.`);
        return {
          prompt: `${P.name} thinks of a number. ${P.Sub} multiplies it by ${a} and then ${add ? `adds ${b}` : `subtracts ${b}`}. The result is ${c}. What number did ${P.sub} think of?`,
          answer: valueSpec(n),
          solution: [`Let the number be ${M("n")}. Then ${M(`${lin(a, B, "n")} = ${c}`)}.`, ...solveSteps(a, B, 0, c, "n"), `Check: ${a} × ${n} ${add ? "+" : "−"} ${b} = ${c} ✓`],
          hint: "Call the number n and write the steps as an equation — or work backwards with inverse operations.",
          traps: T.traps,
        };
      }

      if (form === "think2") {
        let a = 3, n = 7, b = 5, add = true, c = 36;
        for (let i = 0; i < 100; i++) {
          a = rng.int(2, 9);
          n = rng.int(1, 20);
          b = rng.int(1, 12);
          add = rng.bool();
          c = add ? a * (n + b) : a * (n - b);
          if (c !== 0) break;
        }
        const B = add ? b : -b;
        const T = trapper(n);
        T.add(c - B, a, `The whole result is multiplied by ${a}, so you need a bracket: ${M(`${a}(n ${add ? "+" : "-"} ${b})`)}.`);
        return {
          prompt: `${P.name} thinks of a number. ${P.Sub} ${add ? `adds ${b} to it` : `subtracts ${b} from it`}, then multiplies the result by ${a}. The answer is ${num(c)}. What number did ${P.sub} think of?`,
          answer: valueSpec(n),
          solution: [
            `Let the number be ${M("n")}. The ${add ? "adding" : "subtracting"} happens first, so use a bracket: ${M(`${a}(${lin(1, B, "n")}) = ${c}`)}.`,
            `Divide both sides by ${a}: ${M(`${lin(1, B, "n")} = ${c / a}`)}.`,
            `${undo(B)}: n = ${n}.`,
          ],
          hint: "Write it with a bracket — the multiplying happens to the whole result.",
          traps: T.traps,
        };
      }

      if (form === "think3") {
        let a = 5, c = 2, n = 6, b = 4, d = 14;
        for (let i = 0; i < 200; i++) {
          a = rng.int(4, 9);
          c = rng.int(2, a - 1);
          n = rng.int(2, 15);
          b = rng.int(1, 20);
          d = (a - c) * n - b;
          if (d >= 1 && d <= 40) break;
        }
        const T = trapper(n);
        T.add(d - b, a - c, `Sign slip: when you move the − ${b} across, it becomes + ${b}.`);
        T.add(b + d, a + c, `Subtract ${M(`${c}n`)} from both sides — don't add the n-terms.`);
        return {
          prompt: `${P.name} thinks of a number. Multiplying it by ${a} and then subtracting ${b} gives the same answer as multiplying it by ${c} and then adding ${d}. What is ${P.pos} number?`,
          answer: valueSpec(n),
          solution: [`Let the number be ${M("n")}. "The same answer" means ${M(`${lin(a, -b, "n")} = ${lin(c, d, "n")}`)}.`, ...solveSteps(a, -b, c, d, "n"), `Check: ${a} × ${n} − ${b} = ${a * n - b} and ${c} × ${n} + ${d} = ${c * n + d} ✓`],
          hint: "Write both descriptions in terms of n and set them equal. Then you have n on both sides.",
          traps: T.traps,
        };
      }

      if (form === "consec" || form === "consecEven") {
        const even = form === "consecEven";
        const k = tier === 1 ? rng.pick([2, 3]) : rng.pick([3, 4, 5]);
        const kk = even ? rng.pick([3, 4]) : k;
        const step = even ? 2 : 1;
        const parity = even ? rng.pick(["even", "odd"] as const) : null;
        let s = 10;
        for (let i = 0; i < 100; i++) {
          s = rng.int(3, 60);
          if (!parity || (parity === "even") === (s % 2 === 0)) break;
        }
        const extra = (step * kk * (kk - 1)) / 2;
        const S = kk * s + extra;
        const which = tier === 1 ? "smallest" : rng.pick(["smallest", "largest"] as const);
        const ans = which === "smallest" ? s : s + step * (kk - 1);
        const terms = Array.from({ length: kk }, (_, i) => (i ? `n + ${i * step}` : "n"));
        const T = trapper(ans);
        T.add(S, kk, `${num(S)} ÷ ${kk} is the mean${kk % 2 ? " (the middle number)" : ""}, not the ${which}.`);
        T.add(which === "smallest" ? s + step * (kk - 1) : s, 1, `That's the ${which === "smallest" ? "largest" : "smallest"} — the question asks for the ${which}.`);
        if (even) T.add(S - (kk * (kk - 1)) / 2 + (which === "largest" ? kk * (kk - 1) : 0), kk, `${parity === "even" ? "Even" : "Odd"} numbers go up in 2s: n, n + 2, n + 4, …`);
        const words = even ? `${parity} numbers` : rng.pick(["whole numbers", "integers"]);
        return {
          prompt: `The sum of ${kk} consecutive ${words} is ${S}. What is the ${which} of the numbers?`,
          answer: valueSpec(ans),
          solution: [
            `Call the smallest number ${M("n")}. The numbers are ${terms.map((t) => M(t)).join(", ")}.`,
            `Their sum: ${M(`${kk}n + ${extra} = ${S}`)}, so ${M(`${kk}n = ${S - extra}`)} and n = ${S - extra} ÷ ${kk} = ${s}.`,
            which === "smallest" ? `The numbers are ${Array.from({ length: kk }, (_, i) => s + i * step).join(", ")}, so the smallest is ${s}.` : `The largest is ${M(`n + ${step * (kk - 1)}`)} = ${ans}. (Numbers: ${Array.from({ length: kk }, (_, i) => s + i * step).join(", ")}.)`,
            `Check: ${Array.from({ length: kk }, (_, i) => s + i * step).join(" + ")} = ${S} ✓`,
          ],
          hint: `Call the smallest number n. What are the others${even ? " (they go up in 2s)" : ""}?`,
          traps: T.traps,
        };
      }

      if (form === "agesTimes") {
        let k = 3, b = 8;
        for (let i = 0; i < 100; i++) {
          k = rng.int(3, 6);
          b = rng.int(5, 14);
          if (k * b >= 25 && k * b <= 70) break;
        }
        const old = k * b >= 55 ? rng.pick(["grandmother", "grandfather"]) : rng.pick(["mother", "father", "aunt", "uncle"]);
        const S = (k + 1) * b;
        const askOld = tier > 1 && rng.bool();
        const ans = askOld ? k * b : b;
        const T = trapper(ans);
        T.add(S, k, `Count the parts: ${P.name} is 1 part and the ${old} is ${k} parts, so ${k + 1} parts in total.`);
        T.add(askOld ? b : k * b, 1, askOld ? `That's ${P.name}'s age — the question asks for the ${old}'s.` : `That's the ${old}'s age — the question asks for ${P.name}'s.`);
        return {
          prompt: `${P.name}'s ${old} is ${k} times as old as ${P.name}. The sum of their ages is ${S}. How old is ${askOld ? `${P.name}'s ${old}` : P.name}?`,
          answer: valueSpec(ans),
          solution: [
            `Let ${P.name}'s age be ${M("a")}. Then the ${old} is ${M(`${k}a`)}.`,
            `${M(`a + ${k}a = ${S}`)}, so ${M(`${k + 1}a = ${S}`)}.`,
            `a = ${S} ÷ ${k + 1} = ${b}.${askOld ? ` The ${old} is ${k} × ${b} = ${k * b}.` : ""}`,
          ],
          hint: `Let ${P.name}'s age be a. Write the ${old}'s age in terms of a, then add.`,
          traps: T.traps,
        };
      }

      if (form === "agesDiff") {
        const Q = person(rng, P.name);
        const sib = rng.bool();
        const b = sib ? rng.int(5, 12) : rng.int(5, 14);
        const d = sib ? rng.int(2, 6) : rng.int(22, 36);
        const S = 2 * b + d;
        const olderName = sib ? Q.name : `${P.name}'s ${rng.pick(["aunt", "uncle", "mother", "father"])}`;
        const askOld = rng.bool();
        const ans = askOld ? b + d : b;
        const T = trapper(ans);
        T.add(S, 2, `Halving ${S} would make them the same age — but one is ${d} years older.`);
        T.add(askOld ? b : b + d, 1, askOld ? `That's ${P.name}'s age — the question asks for the older person.` : `That's the older person's age — the question asks for ${P.name}.`);
        return {
          prompt: `${olderName} is ${d} years older than ${P.name}. Their ages add up to ${S}. How old is ${askOld ? olderName : P.name}?`,
          answer: valueSpec(ans),
          solution: [
            `Let ${P.name}'s age be ${M("a")}. Then ${olderName} is ${M(`a + ${d}`)}.`,
            `${M(`a + a + ${d} = ${S}`)}, so ${M(`2a + ${d} = ${S}`)}.`,
            `${M(`2a = ${S - d}`)}, so a = ${b}.${askOld ? ` ${olderName} is ${b} + ${d} = ${b + d}.` : ""}`,
          ],
          hint: `Let ${P.name}'s age be a. What is the other age in terms of a?`,
          traps: T.traps,
        };
      }

      if (form === "agesFuture") {
        let k = 4, j = 2, a = 8, y = 16;
        for (let i = 0; i < 300; i++) {
          k = rng.int(3, 5);
          j = rng.int(2, k - 1);
          a = rng.int(4, 14);
          const top = a * (k - j);
          if (top % (j - 1) !== 0) continue;
          y = top / (j - 1);
          if (y >= 2 && y <= 30 && k * a >= 24 && k * a <= 60) break;
        }
        const [rel, g] = rng.pick([["mother", "she"], ["father", "he"], ["aunt", "she"], ["uncle", "he"]] as const);
        const times = (n: number) => (n === 2 ? "twice" : `${n} times`);
        const T = trapper(a);
        T.add(k * a, 1, `That's the ${rel}'s age now — the question asks for ${P.name}'s age.`);
        T.add(a + y, 1, `That's ${P.name}'s age in ${y} years' time — the question asks for now.`);
        return {
          prompt: `${P.name}'s ${rel} is ${times(k)} as old as ${P.name}. In ${y} years' time, ${g} will be ${times(j)} as old as ${P.name}. How old is ${P.name} now?`,
          answer: valueSpec(a),
          solution: [
            `Let ${P.name}'s age now be ${M("a")}, so the ${rel} is ${M(`${k}a`)}.`,
            `In ${y} years: ${P.name} is ${M(`a + ${y}`)} and the ${rel} is ${M(`${k}a + ${y}`)}. So ${M(`${k}a + ${y} = ${j}(a + ${y})`)}.`,
            `Expand: ${M(`${k}a + ${y} = ${j}a + ${j * y}`)}.`,
            `Subtract ${M(`${j}a`)} and ${y}: ${M(`${term(k - j, "a")} = ${(j - 1) * y}`)}, so a = ${a}. (Check: ${k * a} + ${y} = ${k * a + y} = ${j} × ${a + y} ✓)`,
          ],
          hint: `Let ${P.name}'s age be a. Write both ages in ${y} years, then use "${times(j)} as old".`,
          traps: T.traps,
        };
      }

      if (form === "shop") {
        const items: Array<[string, string, number[]]> = [
          ["pen", "pens", [90, 120, 150]],
          ["notebook", "notebooks", [180, 250, 320]],
          ["potato curry puff", "potato curry puffs", [120, 140, 160]],
          ["kaya bun", "kaya buns", [90, 110, 130]],
          ["bottle of water", "bottles of water", [80, 100, 120]],
        ];
        const extras: Array<[string, number, number]> = [["a drink", 150, 250], ["a ruler", 80, 150], ["a pencil case", 300, 550], ["a packet of tissues", 50, 120]];
        const [, pl, prices] = rng.pick(items);
        const [ex, lo, hi] = rng.pick(extras);
        const p = rng.pick(prices);
        const q = rng.int(lo / 10, hi / 10) * 10;
        const n = rng.int(2, 12);
        const tot = n * p + q;
        const T = trapper(n);
        T.add(tot, p, `Take off the ${money(q / 100)} for ${ex} first.`);
        return {
          prompt: `${P.name} buys some ${pl} at ${money(p / 100)} each and ${ex} for ${money(q / 100)}. ${P.Sub} pays ${money(tot / 100)} altogether. How many ${pl} did ${P.sub} buy?`,
          answer: valueSpec(n),
          solution: [
            `Let ${M("n")} be the number of ${pl}: ${M(`${clean(p / 100)}n + ${clean(q / 100)} = ${clean(tot / 100)}`)}.`,
            `Subtract ${clean(q / 100)}: ${M(`${clean(p / 100)}n = ${clean((tot - q) / 100)}`)}.`,
            `Divide by ${clean(p / 100)}: n = ${clean((tot - q) / 100)} ÷ ${clean(p / 100)} = ${n}.`,
          ],
          hint: `Let n be the number of ${pl}. Total cost = (price × n) + the extra item.`,
          traps: T.traps,
        };
      }

      if (form === "taxi") {
        const F = rng.pick([390, 410, 450, 480]);
        const r = rng.pick([50, 55, 60, 65, 70, 75, 80]);
        const km = rng.int(3, 25);
        const tot = F + r * km;
        const T = trapper(km);
        T.add(tot, r, `Take off the fixed ${money(F / 100)} first — only the rest is charged per kilometre.`);
        return {
          prompt: `A taxi charges a fixed ${money(F / 100)} plus ${money(r / 100)} for every kilometre. ${P.name}'s journey costs ${money(tot / 100)}. How many kilometres long was the journey?`,
          answer: valueSpec(km),
          solution: [
            `Let the distance be ${M("d")} km: ${M(`${clean(F / 100)} + ${clean(r / 100)}d = ${clean(tot / 100)}`)}.`,
            `Subtract ${clean(F / 100)}: ${M(`${clean(r / 100)}d = ${clean((tot - F) / 100)}`)}.`,
            `d = ${clean((tot - F) / 100)} ÷ ${clean(r / 100)} = ${km} km.`,
          ],
          hint: "Let d be the distance in km. Cost = fixed charge + (rate × d).",
          traps: T.traps,
        };
      }

      // shop2: pens and twice/three times as many pencils
      const mult = rng.pick([2, 3]);
      const p = rng.pick([110, 120, 130, 150, 160, 180, 220]);
      const q = rng.pick([30, 35, 40, 45, 50, 55, 60]);
      const n = rng.int(2, 10);
      const unit = p + mult * q;
      const tot = n * unit;
      const T = trapper(n);
      T.add(tot, p + q, `There are ${mult === 2 ? "twice" : "three times"} as many pencils: each pen comes with ${mult} pencils, costing ${mult} × ${money(q / 100)}.`);
      T.add(mult * n, 1, "That's the number of pencils — the question asks for pens.");
      return {
        prompt: `${P.name} buys some pens at ${money(p / 100)} each and ${mult === 2 ? "twice" : "three times"} as many pencils at ${money(q / 100)} each. ${P.Sub} spends ${money(tot / 100)} in total. How many pens does ${P.sub} buy?`,
        answer: valueSpec(n),
        solution: [
          `Let the number of pens be ${M("n")}, so there are ${M(`${mult}n`)} pencils.`,
          `Cost: ${M(`${clean(p / 100)}n + ${clean(q / 100)} * ${mult}n = ${clean(tot / 100)}`)}, so ${M(`${clean(unit / 100)}n = ${clean(tot / 100)}`)}.`,
          `n = ${clean(tot / 100)} ÷ ${clean(unit / 100)} = ${n}.`,
        ],
        hint: "Let n be the number of pens. How many pencils is that? Write the total cost in terms of n.",
        traps: T.traps,
      };
    },
  },

  /* 9 ───────────────────── integer solutions of inequalities ─────────────── */
  {
    id: "equations.integer-solutions",
    topicId: TOPIC,
    title: "List the integers that satisfy an inequality",
    level: 2,
    guideRef: "inequalities",
    generate(rng, tier) {
      const form = tier === 1 ? rng.pick(["list2", "list2", "pos"] as const) : tier === 2 ? rng.pick(["list2", "extreme"] as const) : rng.pick(["solveList", "extreme", "list2"] as const);
      const range = (pred: (i: number) => boolean) => {
        const out: number[] = [];
        for (let i = -100; i <= 100; i++) if (pred(i)) out.push(i);
        return out;
      };

      if (form === "pos") {
        const rel = rng.pick(["<", "<="] as const);
        const k = rng.int(3, 8);
        const vals = range((i) => i >= 1 && holds(i, rel, k));
        const traps: Trap[] = [{ spec: { type: "list", values: [0, ...vals] }, feedback: "0 is not a positive integer — positive means greater than 0." }];
        if (rel === "<") traps.push({ spec: { type: "list", values: [...vals, k] }, feedback: `${k} is not less than ${k} — the < sign means ${k} is not included.` });
        return {
          prompt: `${M("x")} is a positive integer and ${M(`x ${rel} ${k}`)}. List all the possible values of ${M("x")}, separated by commas.`,
          answer: { type: "list", values: vals },
          solution: [`Positive integers start at 1. ${rel === "<" ? `${k} is not included (<)` : `${k} is included (≤)`}.`, `So x = ${vals.join(", ")}.`],
          hint: `Start at 1 and count up. Is ${k} itself allowed?`,
          traps,
        };
      }

      if (form === "list2") {
        let lo = -2, hi = 3, r1: Rel = "<", r2: Rel = "<=", vals: number[] = [];
        let loS = "-2", hiS = "3";
        for (let i = 0; i < 200; i++) {
          const half = tier === 3 && rng.bool(0.5);
          const base = tier === 1 ? rng.int(-3, 4) : rng.int(-9, 3);
          lo = half ? base + 0.5 * rng.pick([-1, 1]) : base;
          hi = base + rng.int(2, 7) + (half && rng.bool() ? 0.5 : 0);
          r1 = rng.pick(["<", "<="] as const);
          r2 = rng.pick(["<", "<="] as const);
          vals = range((x) => holds(lo, r1, x) && holds(x, r2, hi));
          if (vals.length >= 2 && vals.length <= 8) break;
        }
        loS = String(clean(lo));
        hiS = String(clean(hi));
        const traps: Trap[] = [];
        const alt1 = range((x) => holds(lo, TOGGLE[r1], x) && holds(x, r2, hi));
        const alt2 = range((x) => holds(lo, r1, x) && holds(x, TOGGLE[r2], hi));
        if (alt1.length > vals.length) traps.push({ spec: { type: "list", values: alt1 }, feedback: `${num(lo)} is not included: ${M(`${loS} < x`)} means x is strictly bigger than ${num(lo)}.` });
        if (alt2.length > vals.length) traps.push({ spec: { type: "list", values: alt2 }, feedback: `${num(hi)} is not included: ${M(`x < ${hiS}`)} means x is strictly less than ${num(hi)}.` });
        const endTxt = (val: number, r: Rel) => (Number.isInteger(val) ? `${num(val)} ${r === "<=" ? "is included (≤)" : "is not included (<)"}` : `${num(val)} is not an integer, so it can't be in the list anyway`);
        return {
          prompt: `List all the integers ${M("x")} that satisfy ${M(`${loS} ${r1} x ${r2} ${hiS}`)}. Separate them with commas.`,
          answer: { type: "list", values: vals },
          solution: [`Left end: ${endTxt(lo, r1)}. Right end: ${endTxt(hi, r2)}.`, `So x = ${vals.map(num).join(", ")}.`],
          hint: "Picture the number line between the two values. Which end values are allowed?",
          traps,
        };
      }

      if (form === "extreme") {
        const dir = rng.pick(["smallest", "largest"] as const);
        const rel: Rel = dir === "smallest" ? rng.pick([">", ">="] as const) : rng.pick(["<", "<="] as const);
        // boundary p/q (q = 1, 2, or tier 3 also 3 or 4), never a whole number when q > 1
        let p = 7, q = 2;
        for (let i = 0; i < 100; i++) {
          q = tier === 2 ? rng.pick([1, 2]) : rng.pick([1, 2, 3, 4]);
          p = rng.int(-12 * q, 12 * q);
          if (gcd(p, q) === 1 && p !== 0) break;
        }
        [p, q] = simplify(p, q);
        const ok = (i: number) => holds(i * q, rel, p); // i rel p/q, compared exactly
        const vals = range(ok);
        const ans = dir === "smallest" ? vals[0] : vals[vals.length - 1];
        const shown = q === 1 ? `${p}` : q === 2 || q === 4 ? String(clean(p / q)) : `${p}/${q}`;
        const said = q === 1 || q === 2 || q === 4 ? num(clean(p / q)) : frac(p, q);
        const near = dir === "smallest" ? ans - 1 : ans + 1;
        const why = near * q === p ? `${said} itself is not included because the sign is strict` : `${num(near)} is ${near * q > p ? "bigger" : "smaller"} than ${said}, so it doesn't satisfy the inequality`;
        const T = trapper(ans);
        T.add(near, 1, `${num(near)} doesn't work: ${why}.`);
        const list = dir === "smallest" ? `${num(ans)}, ${num(ans + 1)}, ${num(ans + 2)}, …` : `…, ${num(ans - 2)}, ${num(ans - 1)}, ${num(ans)}`;
        return {
          prompt: `What is the ${dir} integer ${M("x")} that satisfies ${M(`x ${rel} ${shown}`)}?`,
          answer: valueSpec(ans),
          solution: [
            `${M(`x ${rel} ${shown}`)} means x is ${rel[0] === ">" ? "bigger" : "smaller"} than ${said}${rel.length === 2 ? " or equal to it" : ""}.`,
            `The integers that work are ${stop(list)}`,
            `So the ${dir} is ${num(ans)}. (${why.charAt(0).toUpperCase() + why.slice(1)}.)`,
          ],
          hint: "Sketch a number line, mark the boundary, and test the integers either side of it.",
          traps: T.traps,
        };
      }

      // solveList: L r1 ax + b r2 R
      let a = 2, b = 1, Lb = -3, Rb = 7, r1: Rel = "<=", r2: Rel = "<", vals: number[] = [];
      for (let i = 0; i < 300; i++) {
        a = rng.int(2, 4);
        b = rng.nonZero(-9, 9);
        Lb = rng.int(-20, 10);
        Rb = Lb + rng.int(5, 20);
        r1 = rng.pick(["<", "<="] as const);
        r2 = rng.pick(["<", "<="] as const);
        vals = range((x) => holds(Lb, r1, a * x + b) && holds(a * x + b, r2, Rb));
        if (vals.length >= 2 && vals.length <= 7) break;
      }
      const traps: Trap[] = [];
      const alt1 = range((x) => holds(Lb, TOGGLE[r1], a * x + b) && holds(a * x + b, r2, Rb));
      const alt2 = range((x) => holds(Lb, r1, a * x + b) && holds(a * x + b, TOGGLE[r2], Rb));
      if (alt1.length > vals.length) traps.push({ spec: { type: "list", values: alt1 }, feedback: "Check the left-hand end: the < sign means that end value is not included." });
      if (alt2.length > vals.length) traps.push({ spec: { type: "list", values: alt2 }, feedback: "Check the right-hand end: the < sign means that end value is not included." });
      return {
        prompt: `List all the integers ${M("x")} such that ${M(`${Lb} ${r1} ${lin(a, b)} ${r2} ${Rb}`)}. Separate them with commas.`,
        answer: { type: "list", values: vals },
        solution: [
          `Do the same to all three parts. ${b > 0 ? `Subtract ${b} from` : `Add ${-b} to`} each part: ${M(`${Lb - b} ${r1} ${a}x ${r2} ${Rb - b}`)}.`,
          `Divide all three parts by ${a}: ${M(`${ratStr(Lb - b, a)} ${r1} x ${r2} ${ratStr(Rb - b, a)}`)}.`,
          `The integers in this range are ${vals.map(num).join(", ")}.`,
        ],
        hint: "Treat it like an equation, but do each step to all three parts. Then list the integers.",
        traps,
      };
    },
  },

  /* 10 ─────────────────────────── solving inequalities ──────────────────── */
  {
    id: "equations.solve-inequality",
    topicId: TOPIC,
    title: "Solve a linear inequality",
    level: 2,
    guideRef: "solving-inequalities",
    generate(rng, tier) {
      const v = rng.pick(["x", "y", "n"] as const);
      const rel = rng.pick(["<", "<=", ">", ">="] as const);
      const form = tier === 1 ? rng.pick(["lin", "lin", "xb", "ax"] as const) : tier === 2 ? rng.pick(["lin", "lin", "xdiv"] as const) : rng.pick(["both", "brk", "lin"] as const);
      const k = tier === 1 ? rng.int(1, 10) : rng.nonZero(-10, 10);
      let shown = "", D = 0;
      const steps: string[] = [];
      if (form === "lin" || form === "xb" || form === "ax") {
        const A = form === "xb" ? 1 : rng.int(2, tier === 1 ? 6 : 9);
        const B = form === "ax" ? 0 : tier === 1 ? rng.int(1, 15) : rng.nonZero(-20, 20);
        D = A * k + B;
        shown = tier >= 2 && B > 0 && rng.bool(0.25) ? linC(A, B, v) : lin(A, B, v);
        if (B !== 0) steps.push(`${undo(B)}: ${M(`${term(A, v)} ${rel} ${D - B}`)}.`);
        if (A !== 1) steps.push(`Divide both sides by ${A}. ${A} is positive, so the sign stays the same: ${M(`${v} ${rel} ${k}`)}.`);
      } else if (form === "xdiv") {
        const a = rng.int(2, 6);
        const q = rng.nonZero(-5, 5);
        const B = rng.nonZero(-12, 12);
        const kk = a * q;
        D = q + B;
        shown = `${v}/${a} ${B < 0 ? "-" : "+"} ${Math.abs(B)}`;
        steps.push(`${undo(B)}: ${M(`${v}/${a} ${rel} ${q}`)}.`);
        steps.push(`Multiply both sides by ${a} (positive, so the sign stays the same): ${M(`${v} ${rel} ${kk}`)}.`);
        return finishIneq(rng, v, rel, kk, shown, D, steps, tier);
      } else if (form === "both") {
        let A = 5, B = 2, C = 2, Dd = 10;
        for (let i = 0; i < 100; i++) {
          A = rng.int(2, 9);
          C = rng.nonZero(-6, A - 1);
          B = rng.nonZero(-15, 15);
          Dd = (A - C) * k + B;
          if (C !== 0 && Dd !== 0 && Math.abs(Dd) <= 50) break;
        }
        shown = lin(A, B, v);
        D = Dd;
        steps.push(`${moveX(C, v)}: ${M(`${lin(A - C, B, v)} ${rel} ${Dd}`)}.`);
        steps.push(`${undo(B)}: ${M(`${term(A - C, v)} ${rel} ${Dd - B}`)}.`);
        if (A - C !== 1) steps.push(`Divide both sides by ${A - C} (positive, so the sign stays the same): ${M(`${v} ${rel} ${k}`)}.`);
        return finishIneq(rng, v, rel, k, shown, lin(C, Dd, v), steps, tier);
      } else {
        const m = rng.int(2, 6);
        const p = rng.nonZero(-9, 9);
        D = m * (k + p);
        shown = `${m}(${lin(1, p, v)})`;
        steps.push(`Divide both sides by ${m} (positive, so the sign stays the same): ${M(`${lin(1, p, v)} ${rel} ${k + p}`)}.`);
        steps.push(`${undo(p)}: ${M(`${v} ${rel} ${k}`)}.`);
      }
      return finishIneq(rng, v, rel, k, shown, D, steps, tier);
    },
  },

  /* 11 ───────────────────────── forming equations: shapes ───────────────── */
  {
    id: "equations.form-shapes",
    topicId: TOPIC,
    title: "Form and solve equations from shapes and angles",
    level: 3,
    guideRef: "forming-equations",
    generate(rng, tier) {
      const form = tier === 1 ? rng.pick(["rect", "line", "tri"] as const) : tier === 2 ? rng.pick(["rect", "isos", "line", "tri", "point"] as const) : rng.pick(["isosAngle", "rectSides", "quad", "rect"] as const);
      const cst = (lo: number, hi: number) => (tier === 1 ? rng.int(0, hi) : rng.int(lo, hi));

      if (form === "rect") {
        let a = 2, b = 3, c = 1, d = 1, x = 5, L = 13, W = 6;
        for (let i = 0; i < 300; i++) {
          a = rng.int(1, 4);
          c = rng.int(1, 3);
          x = rng.int(2, 12);
          b = tier === 1 ? rng.int(1, 10) : rng.nonZero(-12, 12);
          d = tier === 1 ? rng.int(1, 10) : rng.nonZero(-12, 12);
          L = a * x + b;
          W = c * x + d;
          if (W >= 2 && L > W && L <= 4 * W && L <= 60) break;
        }
        const P = 2 * (L + W);
        const ask = tier === 3 ? rng.pick(["length", "area"] as const) : "x";
        const ans = ask === "x" ? x : ask === "length" ? L : L * W;
        const T = trapper(ans);
        if (ask === "x") T.add(P - b - d, a + c, "The perimeter goes all the way round: two lengths AND two widths.");
        else {
          T.add(x, 1, "That's x — now substitute it to find the " + (ask === "length" ? "length." : "length and width."));
          if (ask === "area") T.add(L, 1, "That's the length — the area is length × width.");
        }
        const steps = [
          "Perimeter = 2 × (length + width).",
          `${M(`2(${lin(a, b)} + ${lin(c, d)}) = ${P}`)}, so ${M(`2(${lin(a + c, b + d)}) = ${P}`)}.`,
          `Divide by 2: ${M(`${lin(a + c, b + d)} = ${P / 2}`)}.`,
          ...solveSteps(a + c, b + d, 0, P / 2, "x"),
        ];
        if (ask === "length") steps.push(`Length = ${subLin(a, b, x)} = ${L} cm.`);
        if (ask === "area") steps.push(`Length = ${subLin(a, b, x)} = ${L} cm and width = ${subLin(c, d, x)} = ${W} cm, so area = ${L} × ${W} = ${L * W} cm².`);
        return {
          prompt: `The rectangle has length ${M(lin(a, b))} cm and width ${M(lin(c, d))} cm. Its perimeter is ${P} cm. ${ask === "x" ? `Find ${M("x")}.` : ask === "length" ? "Find the length of the rectangle, in cm." : "Find the area of the rectangle, in cm²."}`,
          diagram: rectSvg(L, W, sideLab(a, b), sideLab(c, d), `A rectangle with length labelled ${sideLab(a, b)} and width labelled ${sideLab(c, d)}.`),
          answer: valueSpec(ans),
          solution: steps,
          hint: "Write the perimeter as an expression in x (add all four sides) and set it equal to the perimeter.",
          traps: T.traps,
        };
      }

      if (form === "isos") {
        let a = 2, b = 1, c = 1, d = 4, x = 5, E = 11, Bs = 9;
        for (let i = 0; i < 300; i++) {
          a = rng.int(1, 4);
          c = rng.int(1, 4);
          x = rng.int(2, 12);
          b = rng.nonZero(-10, 10);
          d = rng.nonZero(-10, 10);
          E = a * x + b;
          Bs = c * x + d;
          if (E >= 3 && Bs >= 2 && Bs < 2 * E && E <= 50 && Bs <= 60) break;
        }
        const P = 2 * E + Bs;
        const T = trapper(x);
        T.add(P - b - d, a + c, "An isosceles triangle has TWO equal sides — count that side twice.");
        return {
          prompt: `An isosceles triangle has two equal sides of length ${M(lin(a, b))} cm and a base of ${M(lin(c, d))} cm. Its perimeter is ${P} cm. Find ${M("x")}.`,
          answer: valueSpec(x),
          solution: [
            `Perimeter = equal side + equal side + base: ${M(`2(${lin(a, b)}) + ${lin(c, d)} = ${P}`)}.`,
            `Expand and collect like terms: ${M(`${lin(2 * a + c, 2 * b + d)} = ${P}`)}.`,
            ...solveSteps(2 * a + c, 2 * b + d, 0, P, "x"),
            `Check: the sides are ${E}, ${E} and ${Bs} cm, which add to ${P} cm ✓`,
          ],
          hint: "Add up all three sides — remember there are two equal sides.",
          traps: T.traps,
        };
      }

      if (form === "line") {
        let a = 2, b = 10, c = 3, d = -20, x = 30, thL = 70;
        for (let i = 0; i < 300; i++) {
          x = rng.int(5, 30);
          a = rng.int(1, 5);
          c = rng.int(1, 5);
          thL = rng.int(50, 130);
          b = thL - a * x;
          d = 180 - thL - c * x;
          if (tier === 1 && (b < 0 || d < 0)) continue;
          if (Math.abs(b) <= 60 && Math.abs(d) <= 60 && !(b === 0 && d === 0)) break;
        }
        const thR = 180 - thL;
        const T = trapper(x);
        T.add(360 - b - d, a + c, "Angles on a straight line add up to 180°, not 360°.");
        T.add(90 - b - d, a + c, "Angles on a straight line add up to 180°, not 90°.");
        return {
          prompt: `The diagram shows two angles on a straight line: ${angleLab(a, b)} and ${angleLab(c, d)}. Find ${M("x")}.`,
          diagram: straightLineSvg(thR, angleLabSvg(a, b), angleLabSvg(c, d), `A straight line with a ray from a point on it, making two angles: ${angleLabSvg(a, b)} on the left and ${angleLabSvg(c, d)} on the right.`),
          answer: valueSpec(x),
          solution: [...sumSteps([[a, b], [c, d]], 180, "Angles on a straight line add up to 180°"), `Check: the angles are ${thL}° and ${thR}°, and ${thL} + ${thR} = 180 ✓`],
          hint: "What do angles on a straight line add up to?",
          traps: T.traps,
        };
      }

      if (form === "tri") {
        let a = 2, b = 10, c = 3, d = -20, x = 20, A2 = 50, A3 = 110;
        for (let i = 0; i < 300; i++) {
          x = rng.int(10, 40);
          a = rng.int(1, 4);
          c = rng.int(1, 4);
          b = cst(-30, 40);
          d = 180 - x - a * x - b - c * x;
          A2 = a * x + b;
          A3 = c * x + d;
          if (tier === 1 && d < 0) continue;
          if (Math.abs(d) <= 60 && A2 >= 10 && A3 >= 10 && !(a === 1 && b === 0) && !(c === 1 && d === 0) && !(a === c && b === d)) break;
        }
        const T = trapper(x);
        T.add(360 - b - d, 1 + a + c, "Angles in a triangle add up to 180°, not 360°.");
        return {
          prompt: `The angles of a triangle are ${M("x")}°, ${angleLab(a, b)} and ${angleLab(c, d)}. Find ${M("x")}.`,
          answer: valueSpec(x),
          solution: [...sumSteps([[1, 0], [a, b], [c, d]], 180, "Angles in a triangle add up to 180°"), `Check: ${x}° + ${A2}° + ${A3}° = 180° ✓`],
          hint: "What do the angles in a triangle add up to?",
          traps: T.traps,
        };
      }

      if (form === "point") {
        let parts: Array<[number, number]> = [];
        let x = 20;
        for (let i = 0; i < 300; i++) {
          x = rng.int(10, 50);
          const a = rng.int(1, 4), b = rng.int(-20, 40), c = rng.int(1, 4), d = rng.int(-20, 40), e = rng.int(1, 4);
          const f = 360 - (a + c + e) * x - b - d;
          parts = [[a, b], [c, d], [e, f]];
          const angles = parts.map(([p, q]) => p * x + q);
          if (Math.abs(f) <= 80 && angles.every((t) => t >= 20 && t <= 250)) break;
        }
        const sA = parts.reduce((s, p) => s + p[0], 0), sB = parts.reduce((s, p) => s + p[1], 0);
        const T = trapper(x);
        T.add(180 - sB, sA, "Angles around a point add up to 360°, not 180°.");
        return {
          prompt: `Three angles meet at a point and fill the whole turn. They are ${parts.map(([p, q]) => angleLab(p, q)).join(", ").replace(/, ([^,]*)$/, " and $1")}. Find ${M("x")}.`,
          answer: valueSpec(x),
          solution: [...sumSteps(parts, 360, "Angles around a point add up to 360°"), `Check: ${parts.map(([p, q]) => `${p * x + q}°`).join(" + ")} = 360° ✓`],
          hint: "What do angles around a point add up to?",
          traps: T.traps,
        };
      }

      if (form === "quad") {
        let parts: Array<[number, number]> = [];
        let x = 30;
        for (let i = 0; i < 300; i++) {
          x = rng.int(15, 45);
          const cs = [rng.int(1, 3), rng.int(1, 3), rng.int(1, 3), rng.int(1, 3)];
          const ks = [0, rng.int(-20, 40), rng.int(-20, 40)];
          const k4 = 360 - cs.reduce((s, t) => s + t, 0) * x - ks[0] - ks[1] - ks[2];
          parts = [[cs[0], ks[0]], [cs[1], ks[1]], [cs[2], ks[2]], [cs[3], k4]];
          const angles = parts.map(([p, q]) => p * x + q);
          const keys = new Set(parts.map(([p, q]) => `${p},${q}`));
          if (Math.abs(k4) <= 60 && keys.size === 4 && angles.every((t) => t >= 20 && t < 180)) break;
        }
        const angles = parts.map(([p, q]) => p * x + q);
        const big = Math.max(...angles);
        const T = trapper(big);
        T.add(x, 1, "That's x — now substitute it to find each angle and pick the largest.");
        return {
          prompt: `The four angles of a quadrilateral are ${parts.map(([p, q]) => angleLab(p, q)).join(", ").replace(/, ([^,]*)$/, " and $1")}. Find the size of the largest angle, in degrees.`,
          answer: valueSpec(big),
          solution: [
            ...sumSteps(parts, 360, "Angles in a quadrilateral add up to 360°"),
            `The angles are ${angles.map((t) => `${t}°`).join(", ")} (they add to 360° ✓). The largest is ${big}°.`,
          ],
          hint: "Angles in a quadrilateral add up to 360°. Find x first, then work out each angle.",
          traps: T.traps,
        };
      }

      if (form === "isosAngle") {
        let a = 3, b = 10, c = 1, d = 40, x = 15, E = 55;
        for (let i = 0; i < 300; i++) {
          x = rng.int(5, 30);
          E = rng.int(30, 85);
          a = rng.int(1, 6);
          c = rng.int(1, 6);
          b = E - a * x;
          d = E - c * x;
          if (a !== c && Math.abs(b) <= 60 && Math.abs(d) <= 60 && E !== 60) break;
        }
        const third = 180 - 2 * E;
        const T = trapper(third);
        T.add(E, 1, "That's one of the two equal angles — the question asks for the third angle.");
        T.add(x, 1, "That's x — now use it to find the angles.");
        T.add(180 - E, 1, "There are TWO equal angles, so subtract both of them from 180°.");
        return {
          prompt: `In an isosceles triangle, the two equal angles are ${angleLab(a, b)} and ${angleLab(c, d)}. Find the size of the third angle, in degrees.`,
          answer: valueSpec(third),
          solution: [
            `The two angles are equal: ${M(`${lin(a, b)} = ${lin(c, d)}`)}.`,
            ...solveSteps(a, b, c, d, "x"),
            `Each equal angle is ${subLin(a, b, x)} = ${E}°.`,
            `Third angle = 180° − 2 × ${E}° = ${third}°.`,
          ],
          hint: "The two expressions are equal, so set them equal to each other and solve for x.",
          traps: T.traps,
        };
      }

      // rectSides: opposite sides equal → x → perimeter
      let a = 3, b = 2, c = 5, d = -6, x = 4, L = 14;
      const W = rng.int(3, 20);
      for (let i = 0; i < 300; i++) {
        x = rng.int(2, 12);
        a = rng.int(1, 6);
        c = rng.int(1, 6);
        L = rng.int(8, 40);
        b = L - a * x;
        d = L - c * x;
        if (a !== c && Math.abs(b) <= 30 && Math.abs(d) <= 30 && L !== W) break;
      }
      const Pm = 2 * (L + W);
      const T = trapper(Pm);
      T.add(L + W, 1, "That's only half way round — the perimeter is 2 × (length + width).");
      T.add(x, 1, "That's x — now find the side length, then the perimeter.");
      return {
        prompt: `Two opposite sides of a rectangle are ${M(lin(a, b))} cm and ${M(lin(c, d))} cm long. The other two sides are ${W} cm each. Find the perimeter of the rectangle, in cm.`,
        answer: valueSpec(Pm),
        solution: [
          `Opposite sides of a rectangle are equal: ${M(`${lin(a, b)} = ${lin(c, d)}`)}.`,
          ...solveSteps(a, b, c, d, "x"),
          `So that side is ${subLin(a, b, x)} = ${L} cm.`,
          `Perimeter = 2 × (${L} + ${W}) = ${Pm} cm.`,
        ],
        hint: "Opposite sides of a rectangle are equal — use that to write an equation.",
        traps: T.traps,
      };
    },
  },

  /* 12 ─────────────────────── forming inequalities in context ───────────── */
  {
    id: "equations.form-inequality",
    topicId: TOPIC,
    title: "Form and solve an inequality in context",
    level: 3,
    guideRef: "solving-inequalities",
    generate(rng, tier) {
      const form = tier === 1 ? rng.pick(["lift", "budget"] as const) : tier === 2 ? rng.pick(["lift", "budget", "save"] as const) : rng.pick(["save", "perim", "budget", "lift"] as const);
      const P = person(rng);
      const best = (pred: (n: number) => boolean, dir: "max" | "min") => {
        let out = -1;
        for (let n = 0; n <= 500; n++) {
          if (pred(n)) {
            if (dir === "min") return n;
            out = n;
          }
        }
        return out;
      };

      if (form === "lift") {
        let Mx = 600, w = 55, b = 25, n = 10;
        for (let i = 0; i < 200; i++) {
          Mx = rng.pick([450, 500, 600, 630, 700, 800]);
          w = rng.int(40, 80);
          b = rng.int(12, 40);
          n = best((k) => w + b * k <= Mx, "max");
          if (n >= 4 && n <= 40) break;
        }
        const exact = (Mx - w) % b === 0;
        const T = trapper(n);
        if (!exact) T.add(n + 1, 1, `Round down, not up: ${n + 1} boxes plus ${P.name} would be ${w + b * (n + 1)} kg, which is over ${Mx} kg.`);
        T.add(Math.floor(Mx / b), 1, `Don't forget ${P.name}'s own ${w} kg.`);
        return {
          prompt: `A lift can carry at most ${Mx} kg. ${P.name} weighs ${w} kg and is moving boxes that weigh ${b} kg each. What is the greatest number of boxes that can go in the lift with ${P.obj}?`,
          answer: valueSpec(n),
          solution: [
            `Let ${M("n")} be the number of boxes. "At most" means ≤: ${M(`${w} + ${b}n <= ${Mx}`)}.`,
            `${M(`${b}n <= ${Mx - w}`)}, so n ≤ ${Mx - w} ÷ ${b} = ${stop(approx(Mx - w, b))}`,
            `n must be a whole number${exact ? "" : ", so round DOWN"}: the greatest is ${n}.`,
          ],
          hint: "Write an inequality for the total mass, solve it, then think about whole numbers.",
          traps: T.traps,
        };
      }

      if (form === "budget") {
        const ctx = tier === 3 ? rng.pick(["trip", "party"] as const) : rng.pick(["shop", "party"] as const);
        let B = 2000, p = 450, q = 120, n = 10;
        for (let i = 0; i < 200; i++) {
          if (ctx === "shop") {
            B = rng.int(10, 40) * 100;
            p = rng.int(20, 120) * 10;
            q = rng.int(8, 45) * 10;
          } else if (ctx === "party") {
            B = rng.int(40, 120) * 100;
            p = rng.int(100, 400) * 10;
            q = rng.int(12, 40) * 10;
          } else {
            B = rng.int(8, 20) * 10000;
            p = rng.int(20, 60) * 1000;
            q = rng.int(6, 20) * 100;
          }
          n = best((k) => p + q * k <= B, "max");
          if (n >= 3 && n <= 60) break;
        }
        const exact = (B - p) % q === 0;
        const [thing, things, setup] =
          ctx === "shop" ? ["pen", "pens", `${P.name} has ${money(B / 100)} to spend. ${P.Sub} buys a file for ${money(p / 100)} and then some pens at ${money(q / 100)} each.`]
          : ctx === "party" ? ["carton", "cartons", `A class has ${money(B / 100)} to spend on a party. They spend ${money(p / 100)} on decorations and the rest on cartons of soya milk at ${money(q / 100)} each.`]
          : ["student", "students", `A school trip to the Science Centre costs ${cash(p)} for the coach plus ${cash(q)} entry for each student. The total cost must be no more than ${cash(B)}.`];
        const T = trapper(n);
        if (!exact) T.add(n + 1, 1, `Round down, not up: ${n + 1} ${things} would cost ${cash(p + q * (n + 1))} in total, which is too much.`);
        T.add(Math.floor(B / q), 1, `Don't forget the ${cash(p)} that is spent first.`);
        return {
          prompt: `${setup} What is the greatest number of ${things} ${ctx === "trip" ? "that can go" : ctx === "shop" ? `${P.sub} can buy` : "they can buy"}?`,
          answer: valueSpec(n),
          solution: [
            `Let ${M("n")} be the number of ${things}. Total cost: ${M(`${clean(p / 100)} + ${clean(q / 100)}n <= ${clean(B / 100)}`)}.`,
            `${M(`${clean(q / 100)}n <= ${clean((B - p) / 100)}`)}, so n ≤ ${clean((B - p) / 100)} ÷ ${clean(q / 100)} = ${stop(approx(B - p, q))}`,
            `n must be a whole number${exact ? "" : ", so round DOWN"}: the greatest number of ${things} is ${n}.`,
          ],
          hint: `Write an inequality for the total cost with n ${thing === "student" ? "students" : thing + "s"}, then solve it.`,
          traps: T.traps,
        };
      }

      if (form === "save") {
        let s = 30, w = 12, G = 150, n = 10;
        const strict = rng.bool();
        for (let i = 0; i < 200; i++) {
          s = rng.int(5, 80);
          w = rng.int(5, 25);
          G = s + rng.int(3, 25) * w + (rng.bool(0.4) ? 0 : rng.int(1, w - 1));
          n = best((k) => (strict ? s + w * k > G : s + w * k >= G), "min");
          if (n >= 3 && n <= 30) break;
        }
        const rel: Rel = strict ? ">" : ">=";
        const exact = (G - s) % w === 0;
        const T = trapper(n);
        T.add(n - 1, 1, exact && strict ? `After ${n - 1} weeks ${P.sub} has exactly ${money(G)} — that is not MORE than ${money(G)}.` : `After ${n - 1} weeks ${P.sub} only has ${money(s + w * (n - 1))} — not enough yet. Round UP here.`);
        return {
          prompt: `${P.name} has ${money(s)} saved and saves another ${money(w)} every week. What is the smallest number of whole weeks until ${P.sub} has ${strict ? "more than" : "at least"} ${money(G)}?`,
          answer: valueSpec(n),
          solution: [
            `After ${M("n")} weeks ${P.sub} has ${M(`${s} + ${w}n`)} dollars. "${strict ? "More than" : "At least"}" means ${SYM[rel]}: ${M(`${s} + ${w}n ${rel} ${G}`)}.`,
            `${M(`${w}n ${rel} ${G - s}`)}, so n ${SYM[rel]} ${G - s} ÷ ${w} = ${stop(approx(G - s, w))}`,
            exact && strict ? `n must be MORE than ${(G - s) / w}, so the smallest whole number is ${n}.` : `The smallest whole number that works is ${n}${exact ? "" : " (round UP)"}.`,
          ],
          hint: "Write an inequality for the amount after n weeks. Then decide: round up or down?",
          traps: T.traps,
        };
      }

      // perim: rectangle (cx + a) by x, perimeter < or ≤ Pm, largest whole x
      let c = 2, a = 3, Pm = 50, xmax = 7;
      const strict = rng.bool();
      for (let i = 0; i < 200; i++) {
        c = rng.int(1, 3);
        a = rng.int(1, 9);
        Pm = rng.int(30, 120);
        xmax = best((x) => x >= 1 && (strict ? 2 * (c * x + a) + 2 * x < Pm : 2 * (c * x + a) + 2 * x <= Pm), "max");
        if (xmax >= 2) break;
      }
      const rel: Rel = strict ? "<" : "<=";
      const K = 2 * c + 2;
      const T = trapper(xmax);
      T.add(xmax + 1, 1, `Check: with x = ${xmax + 1} the perimeter is ${K * (xmax + 1) + 2 * a} cm, which is ${strict ? "not less than" : "more than"} ${Pm} cm.`);
      return {
        prompt: `A rectangle has length ${M(lin(c, a))} cm and width ${M("x")} cm, where ${M("x")} is a whole number. Its perimeter must be ${strict ? "less than" : "no more than"} ${Pm} cm. What is the largest possible value of ${M("x")}?`,
        answer: valueSpec(xmax),
        solution: [
          `Perimeter = ${M(`2(${lin(c, a)}) + 2x = ${lin(K, 2 * a)}`)}.`,
          `${M(`${lin(K, 2 * a)} ${rel} ${Pm}`)}, so ${M(`${K}x ${rel} ${Pm - 2 * a}`)} and x ${SYM[rel]} ${Pm - 2 * a} ÷ ${K} = ${stop(approx(Pm - 2 * a, K))}`,
          `The largest whole number that works is ${xmax}.`,
        ],
        hint: "Write the perimeter in terms of x, make an inequality, solve it, then pick the largest whole number.",
        traps: T.traps,
      };
    },
  },

  /* 13 ─────────────── STRETCH: inequalities with a negative x-term ───────── */
  {
    id: "equations.inequality-negative",
    topicId: TOPIC,
    title: "Solve an inequality with a negative x-term (stretch)",
    level: 3,
    guideRef: "solving-inequalities",
    generate(rng, tier) {
      const v = rng.pick(["x", "y", "n"] as const);
      const rel = rng.pick(["<", "<=", ">", ">="] as const);
      const k = rng.nonZero(-9, 9);
      const out = FLIP[rel];
      const steps: string[] = [];
      let shown = "", rhs = "";
      let lhsAt = (t: number) => t, rhsAt = (t: number) => t, lhsSub = (t: number) => num(t), rhsSub = (t: number) => num(t);
      if (tier === 1 || tier === 2) {
        const A = -rng.int(2, 7);
        const B = tier === 1 ? 0 : rng.int(1, 20);
        const D = A * k + B;
        shown = B === 0 ? term(A, v) : linC(A, B, v);
        rhs = `${D}`;
        lhsAt = (t) => A * t + B;
        rhsAt = () => D;
        lhsSub = (t) => subLin(A, B, t, true);
        rhsSub = () => num(D);
        if (B !== 0) steps.push(`${undo(B)}: ${M(`${term(A, v)} ${rel} ${D - B}`)}.`);
        steps.push(`Divide both sides by ${num(A)}. Dividing by a NEGATIVE number reverses the inequality sign: ${M(`${v} ${out} ${k}`)}.`);
      } else {
        let a = 2, b = 3, c = 5, d = 0;
        for (let i = 0; i < 100; i++) {
          a = rng.int(1, 6);
          c = rng.int(a + 1, a + 5);
          b = rng.nonZero(-15, 15);
          d = (a - c) * k + b;
          if (d !== 0 && Math.abs(d) <= 50) break;
        }
        shown = lin(a, b, v);
        rhs = lin(c, d, v);
        lhsAt = (t) => a * t + b;
        rhsAt = (t) => c * t + d;
        lhsSub = (t) => subLin(a, b, t);
        rhsSub = (t) => subLin(c, d, t);
        steps.push(`Method 1 — ${moveX(c, v).toLowerCase()}: ${M(`${lin(a - c, b, v)} ${rel} ${d}`)}, then ${M(`${term(a - c, v)} ${rel} ${d - b}`)}.`);
        steps.push(`Divide by ${num(a - c)} — a negative number, so reverse the sign: ${M(`${v} ${out} ${k}`)}.`);
        steps.push(`Method 2 — avoid the flip: ${moveX(a, v).toLowerCase()} instead to get ${M(`${b} ${rel} ${lin(c - a, d, v)}`)}, so ${M(`${b - d} ${rel} ${term(c - a, v)}`)} and ${M(`${k} ${rel} ${v}`)} — the same as ${M(`${v} ${out} ${k}`)}.`);
      }
      // Check with a value inside the solution set (verified to satisfy the original inequality).
      const t = out === ">" || out === ">=" ? k + 2 : k - 2;
      const Lt = lhsAt(t), Rt = rhsAt(t);
      steps.push(`Check with ${v} = ${num(t)}, which should work: left side ${lhsSub(t)} = ${num(Lt)}, right side ${rhsSub(t) === num(Rt) ? num(Rt) : `${rhsSub(t)} = ${num(Rt)}`}, and ${num(Lt)} ${SYM[rel]} ${num(Rt)} is ${holds(Lt, rel, Rt) ? "true ✓" : "FALSE"}.`);
      return {
        prompt: `Solve ${M(`${shown} ${rel} ${rhs}`)}. ${TYPE_TIP}`,
        answer: ineqSpec(v, out, k),
        solution: steps,
        hint: "What happens to an inequality when you multiply or divide both sides by a negative number? (Test with 2 < 5.)",
        traps: [
          { spec: ineqSpec(v, rel, k), feedback: `You divided by a negative number, so the inequality sign must reverse: ${SYM[rel]} becomes ${SYM[out]}.` },
          { spec: ineqSpec(v, out, -k), feedback: "The sign of the number is wrong — redo the division carefully, watching the signs." },
        ],
      };
    },
  },

  /* 14 ─────────────────────── STRETCH: simultaneous equations ──────────── */
  {
    id: "equations.simultaneous",
    topicId: TOPIC,
    title: "Solve simultaneous equations by elimination (stretch)",
    level: 3,
    guideRef: "simultaneous-equations",
    generate(rng, tier) {
      let a = 2, b = 3, d = 1, e = -3, x = 2, y = 3;
      const ctx = tier === 3 && rng.bool(0.5);
      for (let i = 0; i < 300; i++) {
        if (ctx) {
          x = rng.int(12, 30) * 10;
          y = rng.int(8, 25) * 10;
          a = rng.int(1, 4);
          b = rng.int(1, 4);
          d = rng.int(1, 4);
          e = rng.int(1, 4);
          if (x === y) continue;
        } else if (tier === 1) {
          x = rng.int(1, 9);
          y = rng.int(1, 9);
          a = rng.int(1, 5);
          b = rng.int(1, 5);
          if (rng.bool()) {
            d = rng.int(1, 5);
            e = -b; // add to eliminate y
          } else {
            d = a; // subtract to eliminate x
            e = rng.int(1, 6);
          }
        } else if (tier === 2) {
          x = rng.nonZero(-9, 9);
          y = rng.nonZero(-9, 9);
          a = rng.nonZero(-6, 6);
          b = rng.nonZero(-5, 5);
          d = rng.nonZero(-6, 6);
          e = rng.pick([-1, 1]) * rng.int(2, 3) * b;
        } else {
          x = rng.nonZero(-8, 8);
          y = rng.nonZero(-8, 8);
          a = rng.int(2, 7);
          b = rng.nonZero(-7, 7);
          d = rng.int(2, 7);
          e = rng.nonZero(-7, 7);
          const L = lcm(Math.abs(b), Math.abs(e));
          if (L === Math.abs(b) || L === Math.abs(e)) continue;
        }
        const det = a * e - b * d;
        if (det === 0) continue;
        if (a === d && b === e) continue;
        break;
      }
      const c = a * x + b * y, f = d * x + e * y;
      const eqS = (p: number, q: number, r: number) => `${poly([[p, "x"], [q, "y"]])} = ${r}`;
      const elim: "x" | "y" = tier === 1 && a === d ? "x" : "y";
      // multipliers so the eliminated variable's coefficients match in size
      const p1 = elim === "y" ? b : a, p2 = elim === "y" ? e : d;
      const L = lcm(Math.abs(p1), Math.abs(p2));
      const m1 = L / Math.abs(p1), m2 = L / Math.abs(p2);
      const s1 = [a * m1, b * m1, c * m1], s2 = [d * m2, e * m2, f * m2];
      const same = p1 * m1 === p2 * m2;
      const r = same ? s1.map((t, i) => t - s2[i]) : s1.map((t, i) => t + s2[i]);
      const keep = elim === "y" ? "x" : "y";
      const K = elim === "y" ? r[0] : r[1];
      const keepVal = elim === "y" ? x : y, otherVal = elim === "y" ? y : x;
      const pairs: Array<[string, string, string, string, string]> = [
        ["At a hawker centre,", "kaya toast", "kaya toasts", "cup of teh", "cups of teh"],
        ["At a school canteen,", "potato curry puff", "potato curry puffs", "glass of sugarcane juice", "glasses of sugarcane juice"],
        ["At a bookshop,", "notebook", "notebooks", "pen", "pens"],
      ];
      const [intro, s1n, p1n, s2n, p2n] = rng.pick(pairs);
      const steps: string[] = [];
      if (ctx) steps.push(`Work in cents. Let x = the price of one ${s1n} and y = the price of one ${s2n}: ${M(eqS(a, b, c))} and ${M(eqS(d, e, f))}.`);
      if (m1 > 1) steps.push(`Multiply the first equation by ${m1}: ${M(eqS(s1[0], s1[1], s1[2]))}.`);
      if (m2 > 1) steps.push(`Multiply the second equation by ${m2}: ${M(eqS(s2[0], s2[1], s2[2]))}.`);
      steps.push(`The ${elim}-terms ${same ? "are the same, so subtract" : "have opposite signs, so add"} the equations: ${M(`${term(K, keep)} = ${r[2]}`)}${K === 1 ? "" : `, so ${keep} = ${num(keepVal)}`}.`);
      const kc = elim === "y" ? a : b; // coefficient of the kept variable in equation 1
      steps.push(`Substitute into the first equation: ${M(`${term(p1, elim)} = ${c} - ${kc * keepVal < 0 ? `(${kc * keepVal})` : kc * keepVal}`)} = ${num(c - kc * keepVal)}, so ${elim} = ${num(otherVal)}.`);
      steps.push(`Check in the second equation: ${subLin(d, 0, x)} ${e < 0 ? "−" : "+"} ${Math.abs(e) === 1 ? br(y) : `${Math.abs(e)} × ${br(y)}`} = ${num(f)} ✓`);

      if (ctx) {
        const cnt = (n: number, sg: string, pl: string) => `${n} ${n === 1 ? sg : pl}`;
        steps.push(`So one ${s1n} costs ${money(x / 100)} and one ${s2n} costs ${money(y / 100)}.`);
        return {
          prompt: `${intro} ${cnt(a, s1n, p1n)} and ${cnt(b, s2n, p2n)} cost ${money(c / 100)}. ${cnt(d, s1n, p1n)} and ${cnt(e, s2n, p2n)} cost ${money(f / 100)}. Find the cost of one ${s1n} and of one ${s2n}. Give the ${s1n} price first, then the ${s2n} price, in dollars.`,
          answer: { type: "list", values: [clean(x / 100), clean(y / 100)], ordered: true, display: `${money(x / 100)} and ${money(y / 100)}` },
          solution: steps,
          hint: "Write two equations in cents. Make the number of one item match, then subtract to eliminate it.",
        };
      }
      return {
        prompt: `Solve the simultaneous equations ${M(eqS(a, b, c))} and ${M(eqS(d, e, f))}. Give your answer as x, y (the value of x first).`,
        answer: { type: "list", values: [x, y], ordered: true, display: `x = ${num(x)}, y = ${num(y)}` },
        solution: steps,
        hint: m1 > 1 || m2 > 1 ? "Multiply one or both equations so that the y-terms have the same size, then add or subtract." : `Look at the ${elim}-terms: same signs → subtract; opposite signs → add.`,
      };
    },
  },
];

/* ------------------------------------------------------------------------ */

/** Shared finish for the "solve a linear inequality" drill. */
function finishIneq(rng: Rng, v: string, rel: Rel, k: number, shown: string, rhs: number | string, steps: string[], tier: 1 | 2 | 3) {
  const flipShow = tier >= 2 && rng.bool(0.3);
  const prompt = flipShow ? `Solve ${M(`${rhs} ${FLIP[rel]} ${shown}`)}. ${TYPE_TIP}` : `Solve ${M(`${shown} ${rel} ${rhs}`)}. ${TYPE_TIP}`;
  const pre = flipShow ? [`Read it the other way round: ${M(`${shown} ${rel} ${rhs}`)} means the same thing.`] : [];
  if (!steps.some((s) => s.includes(`${v} ${rel} ${k}`))) steps.push(`So ${M(`${v} ${rel} ${k}`)}.`);
  return {
    prompt,
    answer: ineqSpec(v, rel, k),
    solution: [...pre, ...steps],
    hint: "Solve it just like an equation, keeping the inequality sign. Dividing by a positive number doesn't change the sign.",
    traps: [
      { spec: ineqSpec(v, FLIP[rel], k), feedback: flipShow ? `Careful — the ${v}-terms are on the right. ${M(`${rhs} ${FLIP[rel]} ${shown}`)} means ${M(`${shown} ${rel} ${rhs}`)}.` : "Your sign points the wrong way. You only reverse it when you multiply or divide by a NEGATIVE number." },
      { spec: { type: "text", accept: [`${v}=${k}`, `${k}=${v}`] } as AnswerSpec, feedback: "An inequality has a whole range of answers — keep the inequality sign in your answer." },
      { spec: ineqSpec(v, TOGGLE[rel], k), feedback: `Keep the same type of sign all the way through: ${SYM[rel]} stays ${SYM[rel]}.` },
    ],
  };
}
