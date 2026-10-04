// Skill drills for "Powers of 10 & Standard Form".
//
// Exactness: every number is held as an integer mantissa m and a power of 10 e
// (value = m × 10^e). Decimal strings are built by moving digits as text, never
// with String(float), so there is no floating-point noise and nothing like
// "4.5e-7" ever reaches a prompt. Values for answer specs use Number("me e"),
// the correctly rounded double.
//
// "Write as an ordinary number" answers are `text` specs (with and without
// commas, plus unit variants) so that simply retyping the standard form from
// the question is NOT accepted; a trap explains why.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { num } from "./helpers.ts";

const T = "standard-form";

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;
const POW: Record<number, string> = { 1: "10", 2: "100", 3: "1000" };
const PLACE: Record<number, string> = { 1: "tenths", 2: "hundredths", 3: "thousandths" };
const COLUMN: Record<string, string> = {
  "5": "hundred-thousands",
  "4": "ten-thousands",
  "3": "thousands",
  "2": "hundreds",
  "1": "tens",
  "0": "ones",
  "-1": "tenths",
  "-2": "hundredths",
  "-3": "thousandths",
  "-4": "ten-thousandths",
};
const UNIT_WORDS: Record<string, string[]> = {
  "": [],
  m: ["m", "metres", "meters"],
  km: ["km", "kilometres", "kilometers"],
  mm: ["mm", "millimetres", "millimeters"],
  g: ["g", "grams"],
  kg: ["kg", "kilograms"],
  years: ["years"],
  bytes: ["bytes"],
  people: ["people"],
  passengers: ["passengers"],
  cells: ["cells"],
};

// ---------------------------------------------------------------------------
// Exact number helpers
// ---------------------------------------------------------------------------

/** Strip trailing zeros from an integer mantissa: (4500, 3) → (45, 5). */
function strip(m: number, e: number): [number, number] {
  if (m === 0) return [0, 0];
  while (m % 10 === 0) {
    m = m / 10;
    e += 1;
  }
  return [m, e];
}

function groupDigits(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** Exact decimal string for m × 10^e (m an integer). Commas group the whole-number part. */
function dec(m: number, e: number, commas = true): string {
  if (m === 0) return "0";
  const neg = m < 0;
  const [mm, ee] = strip(Math.abs(m), e);
  let digits = String(mm);
  let out: string;
  if (ee >= 0) {
    const ip = digits + "0".repeat(ee);
    out = commas ? groupDigits(ip) : ip;
  } else {
    const k = -ee;
    digits = digits.padStart(k + 1, "0");
    const ip = digits.slice(0, digits.length - k);
    out = (commas ? groupDigits(ip) : ip) + "." + digits.slice(digits.length - k);
  }
  return (neg ? "−" : "") + out;
}

/** The double nearest to m × 10^e. */
function val(m: number, e: number): number {
  return Number(`${m}e${e}`);
}

/** Decimal places needed to write m × 10^e. */
function dp(m: number, e: number): number {
  const [, ee] = strip(Math.abs(m), e);
  return Math.max(0, -ee);
}

/** True if JS would print this value with no float-noise-looking tail (≤ 8 decimals). */
function tidy(v: number): boolean {
  return !/\d\.\d{9,}/.test(String(v));
}

/** Maths markup (no braces) for 10^n with the negative exponent bracketed. */
function p10(n: number): string {
  return n < 0 ? `10^(${n})` : `10^${n}`;
}

interface SF {
  /** Integer mantissa digits (no trailing zeros) and its power: value = m × 10^e. */
  m: number;
  e: number;
  /** A as text, 1 ≤ A < 10. */
  A: string;
  n: number;
  value: number;
  /** Maths markup without braces, e.g. "4.5 * 10^(-3)". */
  inner: string;
  /** "{{4.5 * 10^(-3)}}" */
  tex: string;
  /** Number of significant figures in A. */
  s: number;
}

/** Standard form of m × 10^e. */
function sf(m0: number, e0: number): SF {
  const [m, e] = strip(m0, e0);
  const s = String(m).length;
  const n = e + s - 1;
  const A = dec(m, -(s - 1), false);
  const inner = `${A} * ${p10(n)}`;
  return { m, e, A, n, value: val(m, e), inner, tex: `{{${inner}}}`, s };
}

/** Standard form with A having s significant figures (m has s digits) and power n. */
function sfOf(m: number, n: number): SF {
  return sf(m, n - (String(m).length - 1));
}

function sfSpec(x: SF): AnswerSpec {
  return { type: "number", value: x.value, standardForm: true, display: x.tex };
}

function sfTrap(x: SF, feedback: string): Trap {
  return { spec: sfSpec(x), feedback };
}

/** Accepted spellings of the ordinary number m × 10^e. */
function ordAccept(m: number, e: number): string[] {
  const withC = dec(m, e, true);
  const plain = dec(m, e, false);
  const out = [withC, plain];
  if (plain.startsWith("0.")) out.push(plain.slice(1));
  return Array.from(new Set(out));
}

/** Text answer for "write as an ordinary number" (optionally with a unit typed after it). */
function ordSpec(m: number, e: number, unit = ""): AnswerSpec {
  const base = ordAccept(m, e);
  const units = UNIT_WORDS[unit] ?? [];
  return { type: "text", accept: [...base, ...units.flatMap((u) => base.map((b) => b + u))], display: dec(m, e) };
}

function ordTrap(m: number, e: number, feedback: string): Trap {
  return { spec: { type: "text", accept: ordAccept(m, e) }, feedback };
}

function numTrap(v: number, feedback: string): Trap {
  return { spec: { type: "number", value: v }, feedback };
}

/** A random s-digit integer whose last digit is not 0 (so it has exactly s significant figures). */
function mantissa(rng: Rng, s: number): number {
  if (s <= 1) return rng.int(1, 9);
  for (let i = 0; i < 100; i++) {
    const m = rng.int(10 ** (s - 1), 10 ** s - 1);
    if (m % 10 !== 0) return m;
  }
  return 10 ** (s - 1) + 1;
}

/** A mantissa with a zero inside, e.g. 307 or 2005 (s ≥ 3). */
function zeroMantissa(rng: Rng, s: number): number {
  return rng.int(1, 9) * 10 ** (s - 1) + rng.int(1, 9);
}

function plural(k: number, word: string): string {
  return `${k} ${word}${k === 1 ? "" : "s"}`;
}

/** Feedback for writing A × 10^(−k) with one zero too many after the point. */
function extraZeroFb(k: number, A: string): string {
  const z = k - 1;
  return `Moving the point ${plural(k, "place")} left from ${A} leaves ${z === 0 ? "no zeros" : `only ${plural(z, "zero")}`} between the decimal point and the first digit — the first jump just moves the point past the digit ${A[0]}.`;
}

/** Calculator / spreadsheet E-notation for a standard-form number. */
function eNote(x: SF, style: number): string {
  const a = Math.abs(x.n);
  if (style === 0) return `${x.A}E${x.n < 0 ? "-" : "+"}${String(a).padStart(2, "0")}`;
  if (style === 1) return `${x.A}E${x.n}`;
  return `${x.A}e${x.n < 0 ? "-" : "+"}${a}`;
}

// ---------------------------------------------------------------------------
// Real-world facts (values checked; rounded as stated)
// ---------------------------------------------------------------------------

interface Fact {
  m: number;
  e: number;
  unit: string;
  say: (x: string) => string;
}

const BIG_FACTS: Fact[] = [
  { m: 15, e: 7, unit: "km", say: (x) => `The Sun is about ${x} km from Earth.` },
  { m: 3, e: 5, unit: "km", say: (x) => `Light travels about ${x} km in one second.` },
  { m: 384, e: 3, unit: "km", say: (x) => `The Moon is about ${x} km from Earth.` },
  { m: 604, e: 4, unit: "people", say: (x) => `In 2024, about ${x} people lived in Singapore.` },
  { m: 81, e: 8, unit: "people", say: (x) => `About ${x} people live on Earth.` },
  { m: 778, e: 6, unit: "km", say: (x) => `Jupiter is about ${x} km from the Sun.` },
  { m: 45, e: 8, unit: "km", say: (x) => `Neptune is about ${x} km from the Sun.` },
  { m: 2, e: 12, unit: "bytes", say: (x) => `A 2-terabyte hard drive stores about ${x} bytes.` },
  { m: 677, e: 5, unit: "passengers", say: (x) => `Changi Airport handled about ${x} passengers in 2024.` },
  { m: 37, e: 12, unit: "cells", say: (x) => `The human body is made of roughly ${x} cells.` },
  { m: 138, e: 8, unit: "years", say: (x) => `The universe is about ${x} years old.` },
  { m: 8849, e: 3, unit: "mm", say: (x) => `Mount Everest is about ${x} mm tall.` },
  { m: 597, e: 22, unit: "kg", say: (x) => `The mass of the Earth is about ${x} kg.` },
];

const SMALL_FACTS: Fact[] = [
  { m: 8, e: -6, unit: "m", say: (x) => `A red blood cell is about ${x} m across.` },
  { m: 8, e: -5, unit: "m", say: (x) => `A human hair is about ${x} m thick.` },
  { m: 25, e: -3, unit: "g", say: (x) => `A grain of rice has a mass of about ${x} g.` },
  { m: 2, e: -6, unit: "m", say: (x) => `A typical bacterium is about ${x} m long.` },
  { m: 1, e: -4, unit: "m", say: (x) => `A sheet of paper is about ${x} m thick.` },
  { m: 7, e: -7, unit: "m", say: (x) => `Red light has a wavelength of about ${x} m.` },
  { m: 1, e: -7, unit: "m", say: (x) => `A flu virus is about ${x} m across.` },
  { m: 3, e: -5, unit: "m", say: (x) => `A grain of pollen is about ${x} m across.` },
  { m: 25, e: -7, unit: "kg", say: (x) => `A mosquito has a mass of about ${x} kg.` },
  { m: 25, e: -5, unit: "m", say: (x) => `A dust mite is about ${x} m long.` },
];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ── × and ÷ by 10, 100, 1000 ───────────────────────────────────────────
  {
    id: `${T}.times-divide-10-100-1000`,
    topicId: T,
    title: "Multiply and divide by 10, 100 and 1000",
    level: 1,
    guideRef: "multiplying-dividing-by-powers-of-ten",
    generate(rng, tier) {
      const chain = tier === 3 && rng.bool(0.4);
      let m = 47, d = 1, k = 2, k2 = 1, mult = true, e = 1;
      for (let i = 0; i < 100; i++) {
        m = mantissa(rng, tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(2, 3) : rng.int(2, 4));
        d = rng.int(0, tier === 1 ? 1 : tier === 2 ? 2 : 3);
        k = rng.int(1, tier === 1 ? 2 : 3);
        k2 = rng.int(1, 3);
        mult = rng.bool();
        e = chain ? k - k2 - d : (mult ? k : -k) - d;
        if (chain && k === k2) continue;
        if (dp(m, e) <= 6 && val(m, e) < 1e7) break;
      }
      const a = dec(m, -d);
      const ans = dec(m, e);
      const answer: AnswerSpec = { type: "number", value: val(m, e), display: ans };
      const hint = "Will the answer be bigger or smaller? Then count how many places every digit moves.";

      if (chain) {
        const P1 = POW[k], P2 = POW[k2], net = k - k2;
        const mid = dec(m, k - d);
        return {
          prompt: `Work out ${a} × ${P1} ÷ ${P2}.`,
          answer,
          solution: [
            `Work from left to right: ${a} × ${P1} = ${mid}.`,
            `Then ${mid} ÷ ${P2} = ${ans}.`,
            `Shortcut: × ${P1} then ÷ ${P2} is the same as ${net > 0 ? "×" : "÷"} ${POW[Math.abs(net)]} overall.`,
          ],
          hint,
          traps: [
            ordTrap(m, -net - d, `That moved the digits the wrong way overall. × ${P1} then ÷ ${P2} is the same as ${net > 0 ? "×" : "÷"} ${POW[Math.abs(net)]}.`),
          ],
        };
      }

      const P = POW[k];
      const op = mult ? "×" : "÷";
      const start = val(m, -d);
      const options: Array<{ prompt: string; why?: string }> = [
        { prompt: `Work out ${a} ${op} ${P}.` },
        { prompt: `Without a calculator, work out ${a} ${op} ${P}.` },
      ];
      const conv: Record<number, Array<[string, string, string]>> = mult
        ? { 1: [["cm", "millimetres", "1 cm = 10 mm"]], 2: [["m", "centimetres", "1 m = 100 cm"]], 3: [["kg", "grams", "1 kg = 1000 g"], ["km", "metres", "1 km = 1000 m"]] }
        : { 1: [["mm", "centimetres", "10 mm = 1 cm"]], 2: [["cm", "metres", "100 cm = 1 m"]], 3: [["g", "kilograms", "1000 g = 1 kg"], ["m", "kilometres", "1000 m = 1 km"]] };
      const [from, to, fact] = rng.pick(conv[k]);
      options.push({ prompt: `Convert ${a} ${from} to ${to}.`, why: `${fact}, so ${mult ? "multiply" : "divide"} by ${P}.` });
      if (mult && start <= 50) {
        options.push({ prompt: `One bag of rice has a mass of ${a} kg. What is the total mass of ${P} of these bags, in kg?`, why: `Total mass = mass of one bag × ${P}.` });
      }
      if (!mult && k <= 2 && start >= 1 && start <= 200) {
        options.push({ prompt: `A roll of ribbon ${a} m long is cut into ${P} equal pieces. How long is each piece, in metres?`, why: `Share the length equally: divide by ${P}.` });
      }
      const chosen = rng.pick(options);
      const solution = [
        ...(chosen.why ? [chosen.why] : []),
        `${mult ? "Multiplying" : "Dividing"} by ${P} moves every digit ${plural(k, "place")} to the ${mult ? "left" : "right"}, so the number gets ${mult ? "bigger" : "smaller"}.`,
        `${a} ${op} ${P} = ${ans}`,
      ];
      const traps: Trap[] = [
        ordTrap(
          m,
          (mult ? -k : k) - d,
          mult
            ? `Multiplying by ${P} makes the number bigger, so the digits move left — you moved them right.`
            : `Dividing by ${P} makes the number smaller, so the digits move right — you moved them left.`,
        ),
      ];
      if (mult && d > 0) {
        traps.push({
          spec: { type: "text", accept: [`${a}${"0".repeat(k)}`, a] },
          feedback: `Writing zeros on the end of ${a} doesn't change its value. Multiplying by ${P} moves every digit ${plural(k, "place")} to the left.`,
        });
      }
      return { prompt: chosen.prompt, answer, solution, hint, traps };
    },
  },

  // 2 ── × and ÷ by 0.1 and 0.01 ────────────────────────────────────────────
  {
    id: `${T}.times-divide-0-1-0-01`,
    topicId: T,
    title: "Multiply and divide by 0.1 and 0.01",
    level: 2,
    guideRef: "multiplying-dividing-by-powers-of-ten",
    generate(rng, tier) {
      const ks = tier === 1 ? [1] : tier === 2 ? [1, 2] : [1, 2, 3];
      const r = rng.next();
      const style = tier === 1 ? (r < 0.7 ? "calc" : "missing") : r < 0.5 ? "calc" : r < 0.8 ? "missing" : "equiv";
      let m = 36, d = 0, k = 1, mult = true, e = -1;
      for (let i = 0; i < 100; i++) {
        m = mantissa(rng, tier === 1 ? rng.int(1, 2) : rng.int(2, 3));
        d = rng.int(0, tier === 1 ? 1 : 2);
        k = rng.pick(ks);
        mult = rng.bool();
        e = (mult ? -k : k) - d;
        if (dp(m, e) <= 6 && val(m, e) < 1e7) break;
      }
      const a = dec(m, -d), ans = dec(m, e);
      const D = dec(1, -k), P = POW[k], place = PLACE[k];
      const fr = `{{1/${P}}}`;
      const op = mult ? "×" : "÷";
      const inv = mult ? "÷" : "×";

      if (style === "calc") {
        return {
          prompt: rng.pick([`Work out ${a} ${op} ${D}.`, `Without a calculator, find ${a} ${op} ${D}.`]),
          answer: { type: "number", value: val(m, e), display: ans },
          solution: [
            mult
              ? `${D} = ${fr}, so multiplying by ${D} is the same as dividing by ${P}.`
              : `${D} = ${fr}, so dividing by ${D} asks "how many ${place} fit into ${a}?" — the same as multiplying by ${P}.`,
            `${a} ${inv} ${P} = ${ans}`,
          ],
          hint: `Write ${D} as a fraction. Will the answer be bigger or smaller than ${a}?`,
          traps: [
            ordTrap(
              m,
              (mult ? k : -k) - d,
              mult
                ? `Multiplying by ${D} makes the number smaller — it is the same as ÷ ${P}, not × ${P}.`
                : `Dividing by ${D} makes the number bigger — it is the same as × ${P}, not ÷ ${P}.`,
            ),
          ],
        };
      }

      if (style === "missing") {
        return {
          prompt: `Find the missing number: ${a} ${op} □ = ${ans}`,
          answer: { type: "number", value: val(1, -k), display: D },
          solution: [
            `${ans} = ${a} ${mult ? "÷" : "×"} ${P}: the digits have moved ${plural(k, "place")} to the ${mult ? "right" : "left"}.`,
            mult ? `Multiplying by ${D} = ${fr} divides by ${P}, so □ = ${D}.` : `Dividing by ${D} = ${fr} multiplies by ${P}, so □ = ${D}.`,
            `Check: ${a} ${op} ${D} = ${ans}`,
          ],
          hint: `Is ${ans} bigger or smaller than ${a}? How many places have the digits moved?`,
          traps: [
            numTrap(
              val(1, k),
              mult ? `${a} × ${P} would be bigger than ${a}, but ${ans} is smaller.` : `${a} ÷ ${P} would be smaller than ${a}, but ${ans} is bigger.`,
            ),
          ],
        };
      }

      // equiv: × 0.1 ↔ ÷ 10, ÷ 0.01 ↔ × 100
      return {
        prompt: `${a} ${op} ${D} gives the same answer as ${a} ${inv} □. What number goes in the box?`,
        answer: { type: "number", value: val(1, k), display: P },
        solution: [
          `${D} = ${fr}.`,
          mult ? `Multiplying by ${fr} is the same as dividing by ${P}.` : `Dividing by ${fr} is the same as multiplying by ${P}, because ${P} ${place} make 1.`,
          `Check: ${a} ${op} ${D} = ${ans} and ${a} ${inv} ${P} = ${ans}, so □ = ${P}.`,
        ],
        hint: `Write ${D} as a fraction first.`,
        traps: [
          numTrap(
            val(1, -k),
            mult ? `${a} ÷ ${D} would make ${a} bigger, but ${a} × ${D} makes it smaller.` : `${a} × ${D} would make ${a} smaller, but ${a} ÷ ${D} makes it bigger.`,
          ),
        ],
      };
    },
  },

  // 3 ── Powers of 10 (positive, zero, negative) ─────────────────────────────
  {
    id: `${T}.powers-of-ten`,
    topicId: T,
    title: "Positive, zero and negative powers of 10",
    level: 1,
    guideRef: "powers-of-ten",
    generate(rng, tier) {
      const r = rng.next();
      const style = r < 0.45 ? "value" : r < 0.8 ? "find" : "units";

      if (style === "value") {
        const n =
          tier === 1
            ? rng.bool(0.12) ? 0 : rng.int(1, 7)
            : tier === 2
              ? rng.pick([-5, -4, -3, -2, -1, 0, 2, 3, 4, 5, 6, 7, 8])
              : rng.pick([-8, -7, -6, -5, -4, -3, -2, -1, 0, 6, 7, 8, 9, 10, 11, 12]);
        const p = `{{${p10(n)}}}`;
        const k = Math.abs(n);
        const prompt =
          n < 0
            ? rng.pick([`Write ${p} as a decimal.`, `What is ${p} written as a decimal number?`])
            : rng.pick([`Write ${p} as an ordinary number.`, `What is ${p} written out in full?`]);
        const traps: Trap[] = [];
        let solution: string[];
        if (n > 0) {
          solution = [`${p} means ${n === 1 ? "just one 10" : `${n} tens multiplied together`}, which is 1 followed by ${plural(n, "zero")}.`, `${p} = ${dec(1, n)}`];
          if (n >= 2) traps.push(ordTrap(10 * n, 0, `${p} means ${n} tens multiplied together (10 × 10 × …), not 10 × ${n}.`));
        } else if (n === 0) {
          solution = ["Each step down the powers divides by 10: {{10^2}} = 100, {{10^1}} = 10, so {{10^0}} = 10 ÷ 10.", "{{10^0}} = 1"];
          traps.push(ordTrap(0, 0, "Going down the powers divides by 10 each time: {{10^1}} = 10, so {{10^0}} = 10 ÷ 10. It is not 0."));
        } else {
          solution = [
            "Keep dividing by 10: {{10^0}} = 1, {{10^(-1)}} = 0.1, {{10^(-2)}} = 0.01, …",
            `${p} = {{1/${POW[k] ?? dec(1, k, false)}}} = ${dec(1, n)}`,
          ];
          traps.push(ordTrap(1, n - 1, `${p} = {{1/${dec(1, k, false)}}}, so the 1 sits in decimal place number ${k}. Count decimal places, not zeros.`));
          traps.push({
            spec: { type: "text", accept: Array.from(new Set([`-${dec(1, k, false)}`, `-${dec(1, k, true)}`])) },
            feedback: `A negative power does not make a negative number. ${p} = {{1/${dec(1, k, false)}}}, a small positive number.`,
          });
          traps.push({
            spec: { type: "fraction", n: 1, d: 10 ** k },
            feedback: `{{1/${dec(1, k, false)}}} is the right value — now write it as a decimal.`,
          });
        }
        return {
          prompt,
          answer: ordSpec(1, n),
          solution,
          hint: n >= 0 ? "Think: 1 followed by how many zeros?" : "A negative power means 1 divided by a positive power of 10: {{10^(-n)}} = {{1/10^n}}.",
          traps,
        };
      }

      if (style === "find") {
        const n =
          tier === 1
            ? rng.int(1, 7)
            : tier === 2
              ? rng.pick([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8])
              : rng.pick([-8, -7, -6, -5, -4, -3, -2, -1, 6, 7, 8, 9, 10, 11, 12]);
        const k = Math.abs(n);
        const fracForm = tier === 3 && n < 0 && rng.bool(0.5);
        const shown = fracForm ? `{{1/${dec(1, k, false)}}}` : dec(1, n);
        const prompt = rng.pick([`Find n if ${shown} = {{10^n}}.`, `${shown} = {{10^n}}. What is the value of n?`]);
        const traps: Trap[] = [];
        let solution: string[];
        if (n > 0) {
          solution = [`${shown} is 1 followed by ${plural(n, "zero")}.`, `So ${shown} = {{${p10(n)}}} and n = ${n}.`];
          traps.push(numTrap(n + 1, "That is the number of digits. Count only the zeros after the 1."));
        } else if (n === 0) {
          solution = ["{{10^1}} = 10, and one step down divides by 10: {{10^0}} = 1.", "So n = 0."];
          traps.push(numTrap(1, "{{10^1}} is 10, not 1. Divide by 10 once more."));
        } else {
          solution = [
            fracForm ? `${shown} = {{1/10^${k}}}.` : `${shown} = {{1/${dec(1, k, false)}}} = {{1/10^${k}}}.`,
            `Dividing by {{10^${k}}} is the same as multiplying by {{${p10(n)}}}, so n = ${num(n)}.`,
          ];
          traps.push(numTrap(k, "Numbers between 0 and 1 are negative powers of 10."));
          if (!fracForm && n <= -2) traps.push(numTrap(n + 1, "Count the decimal places up to and including the 1 — not just the zeros."));
        }
        return { prompt, answer: { type: "number", value: n }, solution, hint: "Positive powers make 10, 100, 1000, …; negative powers make 0.1, 0.01, 0.001, …", traps };
      }

      // units: metric prefixes as powers of 10
      const sets: Array<{ units: Array<[string, number]>; facts: string }> = [
        { units: [["km", 3], ["m", 0], ["cm", -2], ["mm", -3]], facts: "1 km = 1000 m, 1 m = 100 cm and 1 cm = 10 mm" },
        { units: [["kg", 3], ["g", 0], ["mg", -3]], facts: "1 kg = 1000 g and 1 g = 1000 mg" },
      ];
      const set = rng.pick(sets);
      let [u1, q1] = rng.pick(set.units);
      let [u2, q2] = rng.pick(set.units.filter(([u]) => u !== u1));
      if (tier === 1 && q1 < q2) [u1, q1, u2, q2] = [u2, q2, u1, q1];
      const n = q1 - q2;
      return {
        prompt: `Use ${set.facts}.\n\nComplete: 1 ${u1} = {{10^n}} ${u2}. What is n?`,
        answer: { type: "number", value: n },
        solution: [`1 ${u1} = ${dec(1, n)} ${u2}.`, `${dec(1, n)} = {{${p10(n)}}}, so n = ${num(n)}.`],
        hint: `Is 1 ${u1} more or less than 1 ${u2}? More means a positive power; less means a negative power.`,
        traps: [numTrap(-n, `Check the direction: 1 ${u1} is ${n > 0 ? "much more" : "much less"} than 1 ${u2}, so the power must be ${n > 0 ? "positive" : "negative"}.`)],
      };
    },
  },

  // 4 ── Large numbers → standard form ───────────────────────────────────────
  {
    id: `${T}.large-to-standard-form`,
    topicId: T,
    title: "Write a large number in standard form",
    level: 1,
    guideRef: "large-numbers",
    generate(rng, tier) {
      const r = rng.next();
      const style = tier === 1 ? (r < 0.7 ? "bare" : "fact") : tier === 2 ? (r < 0.5 ? "bare" : r < 0.8 ? "fact" : "words") : r < 0.35 ? "bare" : r < 0.6 ? "fact" : "words";
      const hint = "Put the decimal point just after the first non-zero digit, then count how many places it has moved.";

      if (style === "words") {
        const scales: Array<[string, number]> = [["thousand", 3], ["million", 6], ["billion", 9]];
        const [word, w] = rng.pick(scales);
        let xm = 42, xd = 1;
        for (let i = 0; i < 50; i++) {
          xm = mantissa(rng, rng.int(2, 3));
          xd = rng.int(0, 1);
          if (val(xm, -xd) >= 1 && !(w === 3 && val(xm, -xd) < 10)) break;
        }
        const xs = dec(xm, -xd, false);
        const ans = sf(xm, w - xd);
        const x = val(xm, -xd);
        const prompts = [`Write ${xs} ${word} in standard form.`];
        // Keep the context believable: no video has hundreds of billions of views.
        if (w <= 6 || x < 10) prompts.push(`A video has ${xs} ${word} views. Write the number of views in standard form.`);
        const prompt = rng.pick(prompts);
        const traps: Trap[] = [];
        if (x >= 10) traps.push(sfTrap(sfOf(xm, w), `${xs} ${word} = {{${xs} * 10^${w}}}, but ${xs} is not between 1 and 10. Make A smaller and the power bigger to match.`));
        return {
          prompt,
          answer: sfSpec(ans),
          solution: [
            `1 ${word} = ${dec(1, w)} = {{10^${w}}}, so ${xs} ${word} = {{${xs} * 10^${w}}}.`,
            x >= 10
              ? `${xs} is not between 1 and 10: ${xs} = {{${ans.A} * ${p10(ans.n - w)}}}, so add the powers: ${ans.n - w} + ${w} = ${ans.n}.`
              : `${xs} is already between 1 and 10, so no adjusting is needed.`,
            `${xs} ${word} = ${ans.tex}`,
          ],
          hint: `Write 1 ${word} as a power of 10 first.`,
          traps,
        };
      }

      let m: number, e: number, say: (x: string) => string;
      if (style === "fact") {
        const pool = BIG_FACTS.filter((f) => (tier === 3 ? true : sf(f.m, f.e).n <= (tier === 1 ? 9 : 12)));
        const f = rng.pick(pool);
        m = f.m;
        e = f.e;
        say = f.say;
      } else {
        let s = 2, n = 5;
        for (let i = 0; i < 50; i++) {
          s = tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(2, 3) : rng.int(2, 4);
          n = tier === 1 ? rng.int(3, 6) : tier === 2 ? rng.int(4, 9) : rng.int(5, 12);
          if (n >= s) break;
        }
        m = mantissa(rng, s);
        e = n - (s - 1);
        // Contexts only where the size is believable.
        const says: Array<(x: string) => string> = [
          (x: string) => `Write ${x} in standard form.`,
          (x: string) => `Write the number ${x} in standard form.`,
        ];
        if (n >= 8) says.push((x: string) => `A computer can do ${x} calculations per second.`);
        if (n <= 8) says.push((x: string) => `A song has been streamed ${x} times.`);
        say = rng.pick(says);
      }
      const N = dec(m, e);
      const ans = sf(m, e);
      const stem = say(N);
      const prompt = stem.startsWith("Write") ? stem : `${stem} Write this number in standard form.`;
      const zeros = e; // trailing zeros of N (m has no trailing zeros)
      const traps: Trap[] = [];
      if (zeros !== ans.n) traps.push(sfTrap(sfOf(m, zeros), "Don't just count the zeros. Count how many places the decimal point jumps to land just after the first digit."));
      traps.push(sfTrap(sfOf(m, ans.n + 1), "That is the number of digits. The point moves one place fewer than the number of digits."));
      return {
        prompt,
        answer: sfSpec(ans),
        solution: [
          `The first digit is ${String(m)[0]}, so A = ${ans.A} (between 1 and 10).`,
          `From ${N} to ${ans.A}, the decimal point moves ${plural(ans.n, "place")} to the left — that is dividing by {{10^${ans.n}}}.`,
          `So ${N} = ${ans.tex}.`,
        ],
        hint,
        traps,
      };
    },
  },

  // 5 ── Large standard form → ordinary number ───────────────────────────────
  {
    id: `${T}.large-to-ordinary`,
    topicId: T,
    title: "Write a large standard-form number in full",
    level: 1,
    guideRef: "large-numbers",
    generate(rng, tier) {
      const useFact = rng.bool(tier === 1 ? 0.25 : 0.35);
      let m: number, e: number, unit = "";
      let prompt: string;
      if (useFact) {
        const f = rng.pick(BIG_FACTS.filter((x) => sf(x.m, x.e).n <= (tier === 1 ? 8 : 12)));
        m = f.m;
        e = f.e;
        unit = f.unit;
        prompt = `${f.say(sf(m, e).tex)} Write this as an ordinary number.`;
      } else {
        let s = 2, n = 5;
        for (let i = 0; i < 50; i++) {
          s = tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(2, 3) : rng.int(2, 4);
          n = tier === 1 ? rng.int(2, 6) : tier === 2 ? rng.int(3, 9) : rng.int(4, 12);
          if (n >= s - 1) break;
        }
        m = tier === 3 && s >= 3 && rng.bool(0.5) ? zeroMantissa(rng, s) : mantissa(rng, s);
        e = n - (s - 1);
        const x = sfOf(m, n);
        prompt = rng.pick([`Write ${x.tex} as an ordinary number.`, `Write ${x.tex} in full.`, `What is ${x.tex} as an ordinary number?`]);
      }
      const x = sf(m, e);
      const ans = dec(m, e);
      const traps: Trap[] = [];
      if (x.s >= 2) {
        traps.push(ordTrap(m, x.n, `{{10^${x.n}}} doesn't mean "write ${plural(x.n, "zero")} on the end". It means the digits of ${x.A} move ${plural(x.n, "place")} to the left — some of those places are already filled by digits.`));
      }
      traps.push(sfTrap(x, "That's the same number, still in standard form. Write it out in full, digit by digit."));
      return {
        prompt,
        answer: ordSpec(m, e, unit),
        solution: [
          `{{10^${x.n}}} = ${dec(1, x.n)}, so multiply ${x.A} by ${dec(1, x.n)}.`,
          `The digits of ${x.A} move ${plural(x.n, "place")} to the left; fill the empty places with zeros.`,
          `${x.tex} = ${ans}`,
        ],
        hint: `Start at ${x.A} and move the decimal point ${plural(x.n, "place")} to the right.`,
        traps,
      };
    },
  },

  // 6 ── Small numbers → standard form ───────────────────────────────────────
  {
    id: `${T}.small-to-standard-form`,
    topicId: T,
    title: "Write a small number in standard form",
    level: 2,
    guideRef: "small-numbers",
    generate(rng, tier) {
      let m = 56, e = -5;
      let stem: (x: string) => string;
      if (rng.bool(tier === 1 ? 0.25 : 0.35)) {
        const f = rng.pick(SMALL_FACTS);
        m = f.m;
        e = f.e;
        stem = (x) => `${f.say(x)} Write this number in standard form.`;
      } else {
        for (let i = 0; i < 100; i++) {
          const s = tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(2, 3) : rng.int(2, 4);
          const n = tier === 1 ? rng.int(-4, -1) : tier === 2 ? rng.int(-6, -2) : rng.int(-8, -3);
          m = mantissa(rng, s);
          e = n - (s - 1);
          if (dp(m, e) <= 8) break;
        }
        stem = rng.pick([
          (x: string) => `Write ${x} in standard form.`,
          (x: string) => `Write the number ${x} in standard form.`,
          (x: string) => `A scientist measures a length of ${x} m. Write this length in standard form.`,
        ]);
      }
      const N = dec(m, e);
      const ans = sf(m, e);
      const k = -ans.n;
      return {
        prompt: stem(N),
        answer: sfSpec(ans),
        solution: [
          `The first non-zero digit is ${String(m)[0]}, so A = ${ans.A}.`,
          `From ${N} to ${ans.A}, the decimal point moves ${plural(k, "place")} to the right — that is multiplying by {{10^${k}}}.`,
          `To undo that, multiply by {{${p10(ans.n)}}}: ${N} = ${ans.tex}.`,
        ],
        hint: "A number less than 1 has a negative power of 10. Count the places the point moves to land just after the first non-zero digit.",
        traps: [
          sfTrap(sfOf(m, ans.n + 1), "Count how many places the point moves to land just after the first non-zero digit — not just the zeros after the point."),
          sfTrap(sfOf(m, -ans.n), "Numbers between 0 and 1 have a negative power of 10 in standard form."),
        ],
      };
    },
  },

  // 7 ── Small standard form → decimal ───────────────────────────────────────
  {
    id: `${T}.small-to-ordinary`,
    topicId: T,
    title: "Write a small standard-form number as a decimal",
    level: 2,
    guideRef: "small-numbers",
    generate(rng, tier) {
      let m = 72, e = -6, unit = "";
      let prompt: string;
      if (rng.bool(tier === 1 ? 0.25 : 0.35)) {
        const f = rng.pick(SMALL_FACTS);
        m = f.m;
        e = f.e;
        unit = f.unit;
        prompt = `${f.say(sf(m, e).tex)} Write this as an ordinary decimal number.`;
      } else {
        for (let i = 0; i < 100; i++) {
          const s = tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(2, 3) : rng.int(2, 4);
          const n = tier === 1 ? rng.int(-4, -1) : tier === 2 ? rng.int(-6, -2) : rng.int(-8, -3);
          m = tier === 3 && s >= 3 && rng.bool(0.4) ? zeroMantissa(rng, s) : mantissa(rng, s);
          e = n - (s - 1);
          if (dp(m, e) <= 8) break;
        }
        const x = sf(m, e);
        prompt = rng.pick([`Write ${x.tex} as an ordinary number.`, `Write ${x.tex} as a decimal.`, `What is ${x.tex} as an ordinary number?`]);
      }
      const x = sf(m, e);
      const k = -x.n;
      const ans = dec(m, e);
      const zerosAfter = k - 1;
      return {
        prompt,
        answer: ordSpec(m, e, unit),
        solution: [
          `{{${p10(x.n)}}} means divide by ${dec(1, k)}: the digits of ${x.A} move ${plural(k, "place")} to the right (the point moves ${k} left).`,
          `That leaves ${zerosAfter === 0 ? "no zeros" : plural(zerosAfter, "zero")} between the decimal point and the first digit.`,
          `${x.tex} = ${ans}`,
        ],
        hint: `Start at ${x.A} and move the decimal point ${plural(k, "place")} to the left.`,
        traps: [
          ordTrap(m, e - 1, extraZeroFb(k, x.A)),
          ordTrap(m, -x.n - (x.s - 1), "A negative power makes the number small (less than 1), not big."),
          sfTrap(x, "That's the same number, still in standard form. Write it out as a decimal."),
        ],
      };
    },
  },

  // 8 ── Not quite standard form → fix it ────────────────────────────────────
  {
    id: `${T}.fix-standard-form`,
    topicId: T,
    title: "Fix a number that isn't quite in standard form",
    level: 2,
    guideRef: "large-numbers",
    generate(rng, tier) {
      let m = 34, s = 2, t = 1, nf = 6, nd = 5;
      for (let i = 0; i < 100; i++) {
        s = tier === 1 ? rng.int(1, 2) : rng.int(2, 3);
        m = mantissa(rng, s);
        t = tier === 1 ? 1 : tier === 2 ? rng.pick([1, 1, 2, -1]) : rng.pick([-2, -1, 1, 2, 3]);
        nf = tier === 1 ? rng.int(3, 8) : tier === 2 ? rng.nonZero(-6, 9) : rng.nonZero(-8, 12);
        nd = nf - t;
        if (nd !== 0 && nf !== 0 && dp(m, nf - (s - 1)) <= 8) break;
      }
      const ans = sfOf(m, nf);
      const shownA = dec(m, t - (s - 1), false); // A × 10^t
      const shown = `{{${shownA} * ${p10(nd)}}}`;
      const ordinaryOk = nf > 0 && nf <= 8;
      const name = rng.pick(NAMES);
      const prompts = [
        `${shown} is not in standard form. Write it in standard form.`,
        `Rewrite ${shown} so that it is in standard form.`,
      ];
      if (ordinaryOk) prompts.push(`${name} writes ${dec(ans.m, ans.e)} as ${shown}, but that is not standard form. Write ${dec(ans.m, ans.e)} correctly in standard form.`);
      return {
        prompt: rng.pick(prompts),
        answer: sfSpec(ans),
        solution: [
          `A must be at least 1 and less than 10, but ${shownA} ${t > 0 ? "is 10 or more" : "is less than 1"}.`,
          `${shownA} = {{${ans.A} * ${p10(t)}}}.`,
          `So ${shown} = {{${ans.A} * ${p10(t)} * ${p10(nd)}}} = ${ans.tex} (add the powers: ${num(t)} + ${nd < 0 ? `(${num(nd)})` : num(nd)} = ${num(nf)}).`,
        ],
        hint: `First write ${shownA} itself in standard form, then combine the two powers of 10.`,
        traps: [
          sfTrap(
            sfOf(m, nd - t),
            t > 0
              ? "You made A smaller, so the power of 10 must go UP to keep the value the same — not down."
              : "You made A bigger, so the power of 10 must go DOWN to keep the value the same — not up.",
          ),
        ],
      };
    },
  },

  // 9 ── Powers of 10 as place value ─────────────────────────────────────────
  {
    id: `${T}.place-value-powers`,
    topicId: T,
    title: "Place value with powers of 10",
    level: 2,
    guideRef: "powers-of-ten",
    generate(rng, tier) {
      if (rng.bool(0.55)) {
        // Expanded form → ordinary number
        const c = tier === 3 ? rng.int(3, 4) : 3;
        const pool = tier === 1 ? [0, 1, 2, 3, 4] : tier === 2 ? [-3, -2, -1, 0, 1, 2, 3] : [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5];
        let exps: number[] = [4, 2, 0];
        for (let i = 0; i < 100; i++) {
          exps = rng.shuffle(pool).slice(0, c).sort((a, b) => b - a);
          if (tier >= 2 && exps[c - 1] >= 0) continue; // need a negative power
          if (exps[0] - exps[c - 1] + 1 === c) continue; // need an empty column (placeholder zero)
          break;
        }
        const terms: Array<[number, number]> = exps.map((x) => [rng.int(1, 9), x]);
        const shown = tier === 3 ? rng.shuffle(terms) : terms;
        const minE = exps[c - 1];
        const M = terms.reduce((acc, [dg, x]) => acc + dg * 10 ** (x - minE), 0);
        const ans = dec(M, minE);
        const inner = shown.map(([dg, x]) => `${dg} * ${p10(x)}`).join(" + ");
        const concat = Number(terms.map(([dg]) => dg).join(""));
        const traps: Trap[] = [];
        if (concat !== val(M, minE)) traps.push(ordTrap(concat, 0, "Each power of 10 is a different column. The empty columns in between still need a 0 as a placeholder."));
        if (minE < 0) {
          const wrong = terms.reduce((acc, [dg, x]) => acc + (x < 0 ? -dg * 10 ** -x : dg * 10 ** x), 0);
          if (wrong !== val(M, minE)) traps.push(ordTrap(wrong, 0, "A negative power of 10 is not a negative number: {{10^(-1)}} = 0.1 and {{10^(-2)}} = 0.01."));
        }
        return {
          prompt: rng.pick([`Write {{${inner}}} as an ordinary number.`, `Work out {{${inner}}}. Give your answer as an ordinary number.`]),
          // Exact text answer: a number spec would call 734 "very close" to 730.4 instead of flagging the missing placeholder.
          answer: ordSpec(M, minE),
          solution: [
            `Work out each part: ${terms.map(([dg, x]) => `${dg} × {{${p10(x)}}} = ${dec(dg, x)}`).join(", ")}.`,
            `Add them, with 0 in any empty column: ${terms.map(([dg, x]) => dec(dg, x)).join(" + ")} = ${ans}`,
          ],
          hint: minE < 0 ? "Work out each part on its own first, e.g. 3 × {{10^(-2)}} = 0.03." : "Work out each part on its own first, e.g. 3 × {{10^2}} = 300.",
          traps,
        };
      }
      // Which power of 10 is a digit's column?
      const intLen = tier === 1 ? rng.int(3, 4) : tier === 2 ? rng.int(2, 4) : rng.int(1, 5);
      const decLen = tier === 1 ? rng.int(0, 1) : tier === 2 ? rng.int(1, 3) : rng.int(2, 4);
      const digits = rng.shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]).slice(0, intLen + decLen);
      const X = groupDigits(digits.slice(0, intLen).join("")) + (decLen ? "." + digits.slice(intLen).join("") : "");
      const idx = tier >= 2 && rng.bool(0.6) ? rng.int(intLen, intLen + decLen - 1) : rng.int(0, intLen - 1);
      const n = idx < intLen ? intLen - 1 - idx : -(idx - intLen + 1);
      const dg = digits[idx];
      const col = COLUMN[String(n)];
      return {
        prompt: rng.pick([
          `In the number ${X}, the digit ${dg} is in the {{10^n}} column. What is n?`,
          `In ${X}, the digit ${dg} is worth ${dg} × {{10^n}}. Find n.`,
        ]),
        answer: { type: "number", value: n },
        solution: [
          "Column headings as powers of 10: … tens = {{10^1}}, ones = {{10^0}}, tenths = {{10^(-1)}}, hundredths = {{10^(-2)}}, …",
          `The digit ${dg} is in the ${col} column, worth ${dec(1, n)} = {{${p10(n)}}} each.`,
          `So n = ${num(n)}.`,
        ],
        hint: "The ones column is {{10^0}}. Count columns from there: left is positive, right of the point is negative.",
        traps: n >= 0
          ? [numTrap(n + 1, "Start counting at the ones column, which is {{10^0}} — the tens column is {{10^1}}.")]
          : [numTrap(-n, "Columns after the decimal point have negative powers: tenths = {{10^(-1)}}, hundredths = {{10^(-2)}}.")],
      };
    },
  },

  // 10 ── Compare and order ──────────────────────────────────────────────────
  {
    id: `${T}.compare-order`,
    topicId: T,
    title: "Compare and order numbers in standard form",
    level: 2,
    guideRef: "comparing-standard-form",
    generate(rng, tier) {
      const r = rng.next();
      const style = tier === 1 ? (r < 0.6 ? "extreme" : "times") : r < 0.45 ? "extreme" : r < 0.75 ? "order" : "times";

      if (style === "times") {
        if (tier === 3 && rng.bool(0.25)) {
          const jupiter = rng.bool();
          const far = jupiter ? sfOf(78, 8) : sfOf(45, 9);
          const earth = sfOf(15, 8);
          const planet = jupiter ? "Jupiter" : "Neptune";
          const ansV = jupiter ? 5.2 : 30;
          return {
            prompt: `${planet} is about ${far.tex} km from the Sun. Earth is about ${earth.tex} km from the Sun. How many times further from the Sun is ${planet} than Earth?`,
            answer: { type: "number", value: ansV },
            solution: [
              `Divide: ${far.tex} ÷ ${earth.tex}.`,
              `A parts: ${far.A} ÷ ${earth.A} = ${jupiter ? "5.2" : "3"}. Powers: {{10^${far.n}}} ÷ {{10^8}} = {{10^${far.n - 8}}}.`,
              `So ${planet} is ${jupiter ? "5.2 × 1 = 5.2" : "3 × 10 = 30"} times further away.`,
            ],
            hint: "How many times bigger = bigger number ÷ smaller number. Divide the A parts and the powers separately.",
            traps: jupiter ? [] : [numTrap(3, "You divided the A parts but forgot the powers of 10: {{10^9}} ÷ {{10^8}} = 10.")],
          };
        }
        const dmax = tier === 1 ? 4 : 6;
        const diff = rng.int(1, dmax);
        let b = 1, ratio = 1;
        if (tier === 3) {
          for (let i = 0; i < 50; i++) {
            b = rng.int(1, 4);
            ratio = rng.int(2, 5);
            if (b * ratio <= 9) break;
          }
        } else {
          b = mantissa(rng, rng.int(1, 2));
        }
        const lo = tier === 1 ? 1 : tier === 2 ? -6 : -8;
        const q = rng.int(lo, (tier === 1 ? 8 : 10) - diff);
        const p = q + diff;
        const big = tier === 3 ? sfOf(b * ratio, p) : sfOf(b, p);
        const small = sfOf(b, q);
        const ansM = tier === 3 ? ratio : 1;
        const ans = dec(ansM, diff);
        const prompt = rng.pick([
          `How many times bigger is ${big.tex} than ${small.tex}?`,
          `${big.tex} is how many times as large as ${small.tex}?`,
        ]);
        const traps: Trap[] = [numTrap(diff, "That's the difference between the powers. Each 1 in the power is another × 10.")];
        if (ansM !== 1) traps.push(ordTrap(1, diff, `Don't forget the A parts: ${big.A} ÷ ${small.A} = ${ratio}.`));
        return {
          prompt,
          answer: { type: "number", value: val(ansM, diff), display: ans },
          solution: [
            `Divide the bigger number by the smaller: ${big.tex} ÷ ${small.tex}.`,
            `A parts: ${big.A} ÷ ${small.A} = ${ansM}. Powers: {{${p10(p)}}} ÷ {{${p10(q)}}} = {{10^${diff}}} (subtract: ${num(p)} − ${q < 0 ? `(${num(q)})` : num(q)} = ${diff}).`,
            `${ansM === 1 ? "" : `${ansM} × `}{{10^${diff}}} = ${ans}, so it is ${ans} times bigger.`,
          ],
          hint: "How many times bigger = bigger number ÷ smaller number.",
          traps,
        };
      }

      // Build 4 distinct numbers. Tier 3 shows one of them not quite in standard form.
      const allSmall = tier >= 2 && rng.bool(0.35);
      const [lo, hi] = tier === 1 ? [2, 8] : allSmall ? [-7, -1] : tier === 2 ? [-6, 8] : [-8, 10];
      type Item = { x: SF; shownA: string; shownAv: number; shownN: number; tex: string };
      let items: Item[] = [];
      const largest = rng.bool();
      let ok = false;
      for (let i = 0; i < 300 && !ok; i++) {
        items = [];
        for (let j = 0; j < 4; j++) {
          const s = rng.int(1, 2);
          const m = mantissa(rng, s);
          let n = rng.int(lo, hi);
          if (tier >= 2 && j > 0 && rng.bool(0.35)) n = items[rng.int(0, j - 1)].x.n;
          const x = sfOf(m, n);
          items.push({ x, shownA: x.A, shownAv: val(x.m, -(x.s - 1)), shownN: x.n, tex: x.tex });
        }
        if (tier === 3) {
          const j = rng.int(0, 3);
          const t = rng.pick([1, -1]);
          const it = items[j];
          const shownA = dec(it.x.m, t - (it.x.s - 1), false);
          const shownN = it.x.n - t;
          items[j] = { ...it, shownA, shownAv: val(it.x.m, t - (it.x.s - 1)), shownN, tex: `{{${shownA} * ${p10(shownN)}}}` };
        }
        const vals = items.map((it) => it.x.value);
        const As = items.map((it) => it.shownAv);
        if (new Set(vals).size < 4 || new Set(As).size < 4) continue;
        // ≤ 8 decimal places keeps every value a multiple of 10^(-8), well clear of the checker's tolerance.
        if (!items.every((it) => dp(it.x.m, it.x.e) <= 8)) continue;
        if (style === "extreme") {
          const ansI = vals.indexOf(largest ? Math.max(...vals) : Math.min(...vals));
          const mantI = As.indexOf(largest ? Math.max(...As) : Math.min(...As));
          ok = ansI !== mantI;
        } else {
          const byVal = [0, 1, 2, 3].sort((a, b) => vals[a] - vals[b]).join("");
          const byA = [0, 1, 2, 3].sort((a, b) => As[a] - As[b]).join("");
          ok = byVal !== byA;
        }
      }
      const vals = items.map((it) => it.x.value);
      const As = items.map((it) => it.shownAv);
      const sortedIdx = [0, 1, 2, 3].sort((a, b) => vals[a] - vals[b]);
      const fixStep = items
        .filter((it) => it.tex !== it.x.tex)
        .map((it) => `First rewrite ${it.tex} in standard form: ${it.x.tex}.`);
      const chain = sortedIdx.map((i) => items[i].x.tex).join(" < ");

      if (style === "extreme") {
        const ansI = vals.indexOf(largest ? Math.max(...vals) : Math.min(...vals));
        const mantI = As.indexOf(largest ? Math.max(...As) : Math.min(...As));
        const word = largest ? "largest" : "smallest";
        const traps: Trap[] = [];
        const valTrap = (i: number, feedback: string): Trap => sfTrap(items[i].x, feedback);
        if (mantI !== ansI) traps.push(valTrap(mantI, "That one has the " + (largest ? "biggest" : "smallest") + " A, but compare the powers of 10 first. A only matters when the powers are the same."));
        if (allSmall) {
          const ns = items.map((it) => it.shownN); // the powers the learner actually sees
          const target = largest ? Math.min(...ns) : Math.max(...ns);
          const cand = ns.filter((n) => n === target).length === 1 ? ns.indexOf(target) : -1;
          if (cand >= 0 && cand !== ansI && cand !== mantI) {
            const nC = items[cand].shownN, nA = items[ansI].shownN;
            traps.push(
              valTrap(
                cand,
                `Careful with negative powers: {{${p10(nC)}}} is ${largest ? "smaller" : "bigger"} than {{${p10(nA)}}}, because ${num(nC)} is ${largest ? "less" : "greater"} than ${num(nA)}.`,
              ),
            );
          }
        }
        return {
          prompt: `Which of these numbers is the ${word}? Give your answer in standard form.\n\n${items.map((it) => `- ${it.tex}`).join("\n")}`,
          answer: sfSpec(items[ansI].x),
          solution: [
            ...fixStep,
            "Compare the powers of 10 first; only when two powers are equal do you compare A.",
            `In order of size: ${chain}.`,
            `So the ${word} is ${items[ansI].x.tex}.`,
          ],
          hint: "Look at the powers of 10 first — the power decides the size.",
          traps,
        };
      }

      // order with letters
      const L = ["P", "Q", "R", "S"];
      const byVal = sortedIdx.map((i) => L[i]);
      const byA = [0, 1, 2, 3].sort((a, b) => As[a] - As[b]).map((i) => L[i]);
      const accept = (ls: string[]) => [ls.join(""), ls.join(","), ls.join("<"), ls.join(";"), `${ls.slice(0, 3).join(",")}and${ls[3]}`];
      const traps: Trap[] = [];
      if (byA.join("") !== byVal.join("")) {
        traps.push({ spec: { type: "text", accept: accept(byA) }, feedback: "That orders them by A only. Sort by the power of 10 first, then use A to break ties." });
      }
      return {
        // No example order in the prompt: an example like "P, Q, R, S" could be the answer itself.
        prompt: `Put these numbers in order of size, smallest first. Write the four letters in order, separated by commas.\n\n${items.map((it, i) => `- **${L[i]}** = ${it.tex}`).join("\n")}`,
        answer: { type: "text", accept: accept(byVal), display: byVal.join(", ") },
        solution: [
          ...fixStep,
          "Sort by the power of 10 first; for equal powers, compare A.",
          `Smallest to largest: ${chain}.`,
          `So the order is ${byVal.join(", ")}.`,
        ],
        hint: "Group the numbers by their power of 10 first. A smaller (more negative) power means a smaller number.",
        traps,
      };
    },
  },

  // 11 ── Calculator displays ────────────────────────────────────────────────
  {
    id: `${T}.calculator-display`,
    topicId: T,
    title: "Read a calculator's standard-form display",
    level: 2,
    guideRef: "comparing-standard-form",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const style = rng.int(0, 2);
      const r = rng.next();
      const kind = r < 0.3 ? "read" : r < 0.6 ? "ordinary" : r < 0.85 ? "calc" : "misread";
      const lo = tier === 1 ? -4 : tier === 2 ? -6 : -8;
      const hi = tier === 1 ? 7 : tier === 2 ? 9 : 12;
      const device = rng.pick(["calculator", "spreadsheet", "phone calculator"]);

      if (kind === "misread") {
        const A = rng.int(2, 9);
        const n = rng.int(3, 9);
        const x = sfOf(A, n);
        const E = `${A}E+${String(n).padStart(2, "0")}`;
        return {
          prompt: `${name} sees \`${E}\` on a calculator and thinks it means {{${A}^${n}}}. What number does the display really show? Write it as an ordinary number.`,
          answer: ordSpec(A, n),
          solution: [`\`E+${String(n).padStart(2, "0")}\` means "× 10 to the power ${n}", so \`${E}\` = ${x.tex}.`, `${x.tex} = ${dec(A, n)}`],
          hint: "The E stands for “× 10 to the power …”.",
          traps: [ordTrap(A ** n, 0, `\`E+${String(n).padStart(2, "0")}\` means × {{10^${n}}}, not "to the power ${n}".`), sfTrap(x, "Right number — but write it out in full as an ordinary number.")],
        };
      }

      if (kind === "calc") {
        // A real calculation whose result the display shows.
        let res = sf(12, 7), X = "", Y = "", op = "×", sense = "";
        for (let i = 0; i < 100; i++) {
          if (rng.bool(0.3)) {
            const y = rng.pick([2, 4, 5, 8]);
            const kk = rng.int(2, tier === 1 ? 4 : 6);
            const inv: Record<number, [number, number]> = { 2: [5, -1], 4: [25, -2], 5: [2, -1], 8: [125, -3] };
            const [im, ie] = inv[y];
            res = sf(im, ie - kk);
            X = "1";
            Y = dec(y, kk);
            op = "÷";
            sense = "1 divided by a big number is a small number, less than 1";
          } else if (rng.bool()) {
            const a = sfOf(rng.int(2, 9), rng.int(3, tier === 1 ? 6 : 8));
            const b = sfOf(rng.int(2, 9), rng.int(3, tier === 1 ? 6 : 8));
            res = sf(a.m * b.m, a.e + b.e);
            X = dec(a.m, a.e);
            Y = dec(b.m, b.e);
            op = "×";
            sense = "multiplying two big numbers gives a huge number";
          } else {
            const a = sfOf(rng.int(2, 9), -rng.int(2, tier === 1 ? 3 : 5));
            const b = sfOf(rng.int(2, 9), -rng.int(2, tier === 1 ? 3 : 4));
            res = sf(a.m * b.m, a.e + b.e);
            X = dec(a.m, a.e);
            Y = dec(b.m, b.e);
            op = "×";
            sense = "multiplying two numbers less than 1 gives an even smaller number";
          }
          if (dp(res.m, res.e) <= 8 && tidy(res.value) && res.value < 1e15) break;
        }
        const asOrd = rng.bool(0.4);
        const E = eNote(res, style);
        const traps: Trap[] = [];
        if (asOrd) {
          traps.push(sfTrap(res, "Right number — but write it out in full as an ordinary number."));
          if (res.n < 0) traps.push(ordTrap(res.m, res.e - 1, extraZeroFb(-res.n, res.A)));
        } else if (res.n < 0) {
          traps.push(sfTrap(sfOf(res.m, -res.n), "The minus sign in the display matters: it is a negative power of 10, so the number is less than 1."));
        }
        return {
          prompt: `${name} works out ${X} ${op} ${Y} on a calculator. The display shows \`${E}\`. Write the answer ${asOrd ? "as an ordinary number" : "in standard form"}.`,
          answer: asOrd ? ordSpec(res.m, res.e) : sfSpec(res),
          solution: [
            `\`${E}\` means ${res.A} × 10 to the power ${num(res.n)}: ${res.tex}.`,
            ...(asOrd ? [`${res.tex} = ${dec(res.m, res.e)}`] : []),
            `Sense check: ${sense}.`,
          ],
          hint: "The part after the E is the power of 10.",
          traps,
        };
      }

      // read / ordinary: a random display
      let x = sf(36, -6);
      for (let i = 0; i < 100; i++) {
        const s = tier === 1 ? rng.int(1, 2) : rng.int(2, 3);
        const n = rng.nonZero(lo, hi);
        x = sfOf(mantissa(rng, s), n);
        // Calculators only switch to E-notation for very big or very small numbers, so |n| ≥ 3.
        if (Math.abs(n) >= 3 && dp(x.m, x.e) <= 8 && tidy(x.value) && (kind === "read" || n <= 10)) break;
      }
      const E = eNote(x, style);
      if (kind === "read") {
        return {
          prompt: `A ${device} shows \`${E}\`. Write this number in standard form.`,
          answer: sfSpec(x),
          solution: [`\`E\` means "× 10 to the power": the number after it is the power of 10.`, `\`${E}\` = ${x.tex}`],
          hint: "The part after the E is the power of 10 (watch for a minus sign).",
          traps: x.n < 0 ? [sfTrap(sfOf(x.m, -x.n), "The minus sign after the E means a negative power of 10.")] : [],
        };
      }
      const traps: Trap[] = [sfTrap(x, "Right number — but write it out in full as an ordinary number.")];
      if (x.n < 0) {
        traps.push(ordTrap(x.m, x.e - 1, extraZeroFb(-x.n, x.A)));
        traps.push(ordTrap(x.m, -x.n - (x.s - 1), "The minus sign after the E means a negative power, so the number is less than 1."));
      } else if (x.s >= 2) {
        traps.push(ordTrap(x.m, x.n, `Don't just write ${plural(x.n, "zero")} after the digits — move the point ${plural(x.n, "place")} to the right.`));
      }
      return {
        prompt: `A ${device} shows \`${E}\`. Write this number as an ordinary number.`,
        answer: ordSpec(x.m, x.e),
        solution: [
          `\`${E}\` means ${x.tex}.`,
          `Start at ${x.A} and move the decimal point ${plural(Math.abs(x.n), "place")} to the ${x.n > 0 ? "right" : "left"}.`,
          `${x.tex} = ${dec(x.m, x.e)}`,
        ],
        hint: "The part after the E is the power of 10. Positive: a big number. Negative: a number less than 1.",
        traps,
      };
    },
  },

  // 12 ── Calculating in standard form (stretch) ─────────────────────────────
  {
    id: `${T}.calculate-standard-form`,
    topicId: T,
    title: "Multiply, divide, add and subtract in standard form",
    level: 3,
    guideRef: "calculating-standard-form",
    generate(rng, tier) {
      const r = rng.next();
      const style = tier === 1 ? (r < 0.5 ? "mul" : r < 0.8 ? "div" : "add") : r < 0.35 ? "mul" : r < 0.65 ? "div" : "add";
      const [lo, hi] = tier === 1 ? [2, 8] : tier === 2 ? [-6, 9] : [-9, 12];
      const ask = "Give your answer in standard form.";

      if (style === "mul") {
        let a = sfOf(2, 3), b = sfOf(3, 4), ans = sf(6, 7);
        const light = tier >= 2 && rng.bool(0.25);
        for (let i = 0; i < 200; i++) {
          if (light) {
            a = sfOf(3, 5);
            b = sfOf(rng.pick([2, 4, 5, 6, 8]), rng.int(1, 4));
          } else {
            a = sfOf(mantissa(rng, tier === 1 ? 1 : rng.int(1, 2)), rng.int(lo, hi));
            b = sfOf(rng.int(2, 9), rng.int(lo, hi)); // never × 1
          }
          ans = sf(a.m * b.m, a.e + b.e);
          if (tier === 1 && val(a.m * b.m, -(a.s - 1) - (b.s - 1)) >= 10) continue;
          if (a.m === 1 || a.n === 0 || b.n === 0 || ans.n === 0) continue;
          if (ans.s <= 3 && dp(ans.m, ans.e) <= 8 && tidy(ans.value)) break;
        }
        const prodA = dec(a.m * b.m, -(a.s - 1) - (b.s - 1), false);
        const sumN = a.n + b.n;
        const traps: Trap[] = [];
        const wrongPow = sf(a.m * b.m, -(a.s - 1) - (b.s - 1) + a.n * b.n);
        if (wrongPow.value !== ans.value && Math.abs(a.n * b.n) < 200) {
          traps.push(sfTrap(wrongPow, "When you multiply powers of 10 you ADD the indices: {{10^a * 10^b = 10^(a+b)}}."));
        }
        const prompt = light
          ? `Light travels about ${a.tex} km every second. How far does light travel in ${b.tex} seconds? ${ask}`
          : rng.pick([`Work out ${a.tex} × ${b.tex}. ${ask}`, `Calculate ${a.tex} × ${b.tex} without a calculator. ${ask}`]);
        return {
          prompt,
          answer: sfSpec(ans),
          solution: [
            `Multiply the A parts: ${a.A} × ${b.A} = ${prodA}.`,
            `Add the powers: {{${p10(a.n)} * ${p10(b.n)} = ${p10(sumN)}}}.`,
            prodA === ans.A ? `So the answer is ${ans.tex}.` : `{{${prodA} * ${p10(sumN)}}} is not standard form: ${prodA} = {{${ans.A} * 10^1}}, so the answer is ${ans.tex}.`,
          ],
          hint: "Multiply the A parts, add the powers, then check A is between 1 and 10.",
          traps,
        };
      }

      if (style === "div") {
        let d = sfOf(2, 3), q = sfOf(3, 2), x = sf(6, 5);
        for (let i = 0; i < 200; i++) {
          d = sfOf(rng.int(2, 9), rng.int(lo, hi)); // never ÷ 1
          q = sfOf(mantissa(rng, tier === 1 ? 1 : rng.int(1, 2)), rng.int(lo, hi));
          x = sf(d.m * q.m, d.e + q.e); // dividend = divisor × quotient
          if (tier === 1 && x.A !== dec(d.m * q.m, -(d.s - 1) - (q.s - 1), false)) continue; // no re-normalising at tier 1
          if (x.n === d.n || d.n === 0 || q.n === 0 || x.n === 0) continue;
          if (x.s <= 3 && dp(q.m, q.e) <= 8 && tidy(q.value)) break;
        }
        const quotA = dec(q.m, -(q.s - 1) + q.n + d.n - x.n, false); // x.A ÷ d.A = q × 10^(d.n − x.n)
        const diffN = x.n - d.n;
        const wrong = sfOf(q.m, q.n + 2 * (d.n - x.n));
        return {
          prompt: rng.pick([`Work out ${x.tex} ÷ ${d.tex}. ${ask}`, `Calculate ${x.tex} ÷ ${d.tex} without a calculator. ${ask}`]),
          answer: sfSpec(q),
          solution: [
            `Divide the A parts: ${x.A} ÷ ${d.A} = ${quotA}.`,
            `Subtract the powers: {{${p10(x.n)}}} ÷ {{${p10(d.n)}}} = {{${p10(diffN)}}}.`,
            quotA === q.A ? `So the answer is ${q.tex}.` : `{{${quotA} * ${p10(diffN)}}} is not standard form: ${quotA} = {{${q.A} * 10^(-1)}}, so the answer is ${q.tex}.`,
          ],
          hint: "Divide the A parts, subtract the powers, then check A is between 1 and 10.",
          traps: wrong.value !== q.value ? [sfTrap(wrong, "Subtract the powers in the right order: (power of the first number) − (power of the number you divide by).")] : [],
        };
      }

      // add / subtract
      let a = sfOf(32, 4), b = sfOf(5, 3), ans = sf(37, 3), plus = true;
      const [alo, ahi] = tier === 1 ? [2, 6] : tier === 2 ? [2, 8] : [-5, 9];
      for (let i = 0; i < 200; i++) {
        plus = tier === 1 ? true : rng.bool();
        const p = rng.int(alo, ahi);
        const gap = tier === 1 ? rng.int(0, 1) : rng.int(0, tier === 2 ? 2 : 3);
        a = sfOf(mantissa(rng, rng.int(1, 2)), p);
        b = sfOf(mantissa(rng, rng.int(1, 2)), p - gap);
        const ce = Math.min(a.e, b.e);
        const M = a.m * 10 ** (a.e - ce) + (plus ? 1 : -1) * b.m * 10 ** (b.e - ce);
        if (M <= 0) continue;
        ans = sf(M, ce);
        if (ans.n === 0 || a.n === 0 || b.n === 0) continue;
        if (dp(a.m, a.e) > 8 || dp(b.m, b.e) > 8 || dp(ans.m, ans.e) > 8) continue;
        if (ans.s <= 4 && tidy(ans.value)) break;
      }
      const opS = plus ? "+" : "−";
      const traps: Trap[] = [];
      // Classic slip: combine the A parts and keep the bigger power (only right when the powers match).
      const ceA = Math.min(-(a.s - 1), -(b.s - 1));
      const MA = a.m * 10 ** (-(a.s - 1) - ceA) + (plus ? 1 : -1) * b.m * 10 ** (-(b.s - 1) - ceA);
      if (a.n !== b.n && MA > 0) {
        const wrong = sf(MA, ceA + a.n);
        if (wrong.value !== ans.value) traps.push(sfTrap(wrong, "You can only combine the A parts when the powers of 10 are the same. Write both as ordinary numbers (or make the powers match) first."));
      } else if (a.n === b.n && MA > 0) {
        const wrong = sf(MA, ceA + 2 * a.n);
        if (wrong.value !== ans.value) traps.push(sfTrap(wrong, `When adding or subtracting, don't add the powers: you are combining lots of {{${p10(a.n)}}}, so the power stays the same.`));
      }
      return {
        prompt: rng.pick([`Work out ${a.tex} ${opS} ${b.tex}. ${ask}`, `Calculate ${a.tex} ${opS} ${b.tex} without a calculator. ${ask}`]),
        answer: sfSpec(ans),
        solution: [
          `Write both as ordinary numbers: ${a.tex} = ${dec(a.m, a.e)} and ${b.tex} = ${dec(b.m, b.e)}.`,
          `${plus ? "Add" : "Subtract"}: ${dec(a.m, a.e)} ${opS} ${dec(b.m, b.e)} = ${dec(ans.m, ans.e)}.`,
          `${dec(ans.m, ans.e)} = ${ans.tex}`,
        ],
        hint: "You can't just add or subtract the A parts unless the powers match. Try writing both numbers out in full.",
        traps,
      };
    },
  },
];
