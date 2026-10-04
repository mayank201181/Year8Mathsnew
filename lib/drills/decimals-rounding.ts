// Procedural skill drills for "Decimals, Rounding & Estimation".
//
// Every number is built from integers (value = integer ÷ 10^dp) so answers are
// exact, and every display string is produced from those integers, never from
// floating-point arithmetic.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, ordinal, primeFactors } from "./helpers.ts";

const TOPIC = "decimals-rounding";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;
/** Combining dot above (U+0307), used for recurring-decimal dot notation, e.g. 0.3̇. */
const DOT = String.fromCharCode(775);

// ---------------------------------------------------------------------------
// Exact decimal helpers. A decimal is an integer n with dp decimal places:
// value = n / 10^dp (dp may be negative: 34 with dp −2 is 3400).
// ---------------------------------------------------------------------------

function p10(k: number): number {
  return Math.pow(10, k);
}

/** n / 10^dp as a JS number. Dividing two exact numbers is correctly rounded, so this equals parseFloat of the decimal. */
function val(n: number, dp: number): number {
  return dp >= 0 ? n / p10(dp) : n * p10(-dp);
}

function digits(n: number): number {
  return String(Math.abs(n)).length;
}

function group(s: string): string {
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/** n / 10^dp written with exactly dp decimal places (end zeros kept). Real minus sign unless ascii. */
function fx(n: number, dp: number, opt: { commas?: boolean; ascii?: boolean } = {}): string {
  const neg = n < 0;
  let s = String(Math.abs(n));
  if (dp < 0) {
    if (s !== "0") s += "0".repeat(-dp);
    dp = 0;
  }
  let ip = s;
  let fp = "";
  if (dp > 0) {
    s = s.padStart(dp + 1, "0");
    ip = s.slice(0, s.length - dp);
    fp = s.slice(s.length - dp);
  }
  if (opt.commas) ip = group(ip);
  return (neg ? (opt.ascii ? "-" : "−") : "") + ip + (dp > 0 ? "." + fp : "");
}

/** Like fx, but with end zeros after the point removed (2.50 → 2.5, 3.00 → 3). */
function ft(n: number, dp: number, opt: { commas?: boolean; ascii?: boolean } = {}): string {
  while (dp > 0 && n % 10 === 0) {
    n = n / 10;
    dp--;
  }
  return fx(n, dp, opt);
}

/** Remove end zeros: [n, dp] → simplest [n', dp'] with the same value. */
function trim(n: number, dp: number): [number, number] {
  while (dp > 0 && n !== 0 && n % 10 === 0) {
    n = n / 10;
    dp--;
  }
  return [n, dp];
}

/** Round the integer n to a multiple of 10^k (half away from zero). */
function roundInt(n: number, k: number): number {
  if (k <= 0) return n;
  const f = p10(k);
  const a = Math.abs(n);
  const q = Math.floor(a / f);
  const r = a - q * f;
  return Math.sign(n) * (q + (2 * r >= f ? 1 : 0)) * f;
}

/** Truncate the integer n to a multiple of 10^k (towards zero). */
function truncInt(n: number, k: number): number {
  if (k <= 0) return n;
  const f = p10(k);
  return Math.sign(n) * Math.floor(Math.abs(n) / f) * f;
}

/** n/d (positive, any form) as an exact terminating decimal [N, k], or null if it recurs. */
function termDec(n: number, d: number): [number, number] | null {
  const g = gcd(n, d);
  n /= g;
  d /= g;
  for (let k = 0; k <= 8; k++) {
    if (p10(k) % d === 0) return [(n * p10(k)) / d, k];
  }
  return null;
}

/** Long-division expansion of n/d (n, d > 0): whole part, non-recurring digits and recurring block. */
function expand(n: number, d: number): { whole: number; pre: string; rep: string } {
  const whole = Math.floor(n / d);
  let r = n % d;
  const seen = new Map<number, number>();
  let ds = "";
  while (r !== 0 && !seen.has(r) && ds.length < 40) {
    seen.set(r, ds.length);
    r *= 10;
    ds += String(Math.floor(r / d));
    r %= d;
  }
  if (r === 0) return { whole, pre: ds, rep: "" };
  const start = seen.get(r) ?? 0;
  return { whole, pre: ds.slice(0, start), rep: ds.slice(start) };
}

/** Dot notation: dots over the first and last digits of the recurring block. */
function dotted(whole: number, pre: string, rep: string): string {
  if (!rep) return `${whole}.${pre}`;
  const block = rep.length === 1 ? rep + DOT : rep[0] + DOT + rep.slice(1, -1) + rep[rep.length - 1] + DOT;
  return `${whole}.${pre}${block}`;
}

/** Written-out form with an ellipsis, at most 8 decimal digits: 0.272727… */
function longForm(whole: number, pre: string, rep: string): string {
  let s = pre + rep;
  const target = Math.min(8, Math.max(6, pre.length + rep.length + 2));
  let i = 0;
  while (s.length < target) {
    s += rep[i % rep.length];
    i++;
  }
  return `${whole}.${s}…`;
}

// ---------------------------------------------------------------------------
// Answer / trap helpers
// ---------------------------------------------------------------------------

/**
 * Answer for a value that must be written to exactly dp decimal places. If the
 * last required digit is a 0 (3.00, 0.070) the zeros matter, and the number
 * checker cannot see them, so a text answer is used instead.
 */
function fixedAnswer(n: number, dp: number, commas = false): { spec: AnswerSpec; strict: boolean; shown: string } {
  const shown = fx(n, dp, { commas });
  if (dp > 0 && n % 10 === 0) {
    const a = fx(n, dp, { ascii: true });
    const accept = [a];
    if (Math.abs(n) < p10(dp)) accept.push(a.replace(/^(-?)0\./, "$1."));
    return { spec: { type: "text", accept, display: shown }, strict: true, shown };
  }
  return { spec: { type: "number", value: val(n, dp), allowFraction: false, display: shown }, strict: false, shown };
}

function same(a: number, b: number): boolean {
  return Math.abs(a - b) <= 1e-9 * Math.max(1, Math.abs(a), Math.abs(b));
}

/** Add a numeric trap unless it would equal the correct value. */
function numTrap(traps: Trap[], v: number, correct: number, feedback: string): void {
  if (!Number.isFinite(v) || same(v, correct)) return;
  if (traps.some((t) => t.spec.type === "number" && same(t.spec.value, v))) return;
  traps.push({ spec: { type: "number", value: v }, feedback });
}

function listTrap(traps: Trap[], v: number[], correct: number[], feedback: string): void {
  const equal = (w: number[]) => w.length === v.length && w.every((x, i) => same(x, v[i]));
  if (equal(correct)) return;
  if (traps.some((t) => t.spec.type === "list" && equal(t.spec.values))) return;
  traps.push({ spec: { type: "list", values: v, ordered: true }, feedback });
}

function fracTrap(traps: Trap[], n: number, d: number, cn: number, cd: number, feedback: string): void {
  if (n * cd === cn * d) return;
  traps.push({ spec: { type: "fraction", n, d }, feedback });
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

// ---------------------------------------------------------------------------
// Estimation helper: a 2–3 s.f. number that rounds to m × 10^e at 1 s.f.
// ---------------------------------------------------------------------------

interface Approx {
  /** Shown value = X / 10^dp. */
  X: number;
  dp: number;
  /** 1 s.f. value = m × 10^e. */
  m: number;
  e: number;
  /** +1 if rounding to 1 s.f. made it bigger, −1 if smaller. */
  dir: 1 | -1;
}

function approxNum(rng: Rng, m: number, e: number, want?: 1 | -1): Approx | null {
  for (let i = 0; i < 60; i++) {
    const sig = rng.pick([2, 3, 3]);
    const base = m * p10(sig - 1);
    const hr = sig === 3 ? 45 : 4;
    let off = rng.int(-hr, hr);
    if (want === 1) off = -Math.abs(off);
    if (want === -1) off = Math.abs(off);
    if (Math.abs(off) < (sig === 3 ? 3 : 1)) continue;
    const X = base + off;
    // Check it really rounds to m × 10^e at 1 s.f. (0.94 does not round to 1).
    if (roundInt(X, digits(X) - 1) !== base) continue;
    return { X, dp: sig - 1 - e, m, e, dir: off < 0 ? 1 : -1 };
  }
  return null;
}

const shownA = (a: Approx) => ft(a.X, a.dp);
const shownT = (a: Approx) => ft(a.m, -a.e);

const OVER = ["overestimate", "over", "an overestimate", "over-estimate", "overestimates", "too big", "too high"];
const UNDER = ["underestimate", "under", "an underestimate", "under-estimate", "underestimates", "too small", "too low"];
const TERM = ["terminating", "terminates", "terminate", "it terminates", "terminating decimal", "a terminating decimal"];
const RECUR = ["recurring", "recurs", "recur", "it recurs", "recurring decimal", "a recurring decimal", "repeating", "repeats", "it repeats"];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // ------------------------------------------------------------ level 1
  {
    id: `${TOPIC}.multiply-decimals`,
    topicId: TOPIC,
    title: "Multiply decimals",
    level: 1,
    guideRef: "multiplying-decimals",
    generate(rng, tier) {
      let A = 46, da = 1, B = 32, db = 1, sa = 1, sb = 1, kind = "decXdec";
      for (let i = 0; i < 100; i++) {
        const k =
          tier === 1
            ? rng.pick(["decXint", "tenths", "money"])
            : tier === 2
              ? rng.pick(["decXdec", "decXdec", "decXint", "small", "money"])
              : rng.pick(["decXdec", "small", "neg", "neg"]);
        let cA: number, cda: number, cB: number, cdb: number;
        let csa = 1, csb = 1;
        if (k === "decXint") {
          cA = rng.int(11, tier === 1 ? 99 : 999);
          cda = cA > 99 ? 2 : 1;
          cB = tier === 1 ? rng.int(2, 9) : rng.int(3, 15);
          cdb = 0;
        } else if (k === "tenths") {
          cA = rng.int(2, 9);
          cda = 1;
          cB = rng.int(2, 9);
          cdb = rng.pick([1, 1, 2]);
        } else if (k === "money") {
          cA = rng.int(105, 995);
          cda = 2;
          cB = rng.int(2, tier === 1 ? 6 : 12);
          cdb = 0;
        } else if (k === "small") {
          cA = rng.int(2, 125);
          cda = cA > 99 ? 3 : rng.pick([2, 3]);
          cB = rng.int(2, 9);
          cdb = rng.pick([1, 2]);
        } else {
          cA = rng.int(11, 99);
          cda = rng.pick([1, 1, 2]);
          cB = rng.bool() ? rng.int(2, 9) : rng.int(11, 49);
          cdb = rng.pick([1, 1, 2]);
          if (k === "neg") {
            if (rng.bool()) csa = -1;
            else csb = -1;
            if (rng.bool(0.3)) {
              csa = -1;
              csb = -1;
            }
          }
        }
        // Each decimal must really have its decimal places (no 4.0), and no ×10 shortcuts.
        if (cA % 10 === 0 || cB % 10 === 0 || cda + cdb > 4) continue;
        [A, da, B, db, sa, sb, kind] = [cA, cda, cB, cdb, csa, csb, k];
        break;
      }
      const P = A * B;
      const dp = da + db;
      const sign = sa * sb;
      const value = val(sign * P, dp);
      const aS = fx(sa * A, da);
      const bS = sb < 0 ? `(${fx(sb * B, db)})` : fx(B, db);
      const ansS = ft(sign * P, dp);
      const name = rng.pick(NAMES);
      let prompt: string;
      if (kind === "money") {
        prompt = rng.pick([
          `A cup of bubble tea costs $${fx(A, 2)}. ${name} buys ${B} cups for a CCA party. How much does ${name} pay altogether?`,
          `A notebook costs $${fx(A, 2)}. How much do ${B} notebooks cost?`,
          `Work out ${aS} × ${bS}.`,
        ]);
      } else if (kind === "decXint") {
        prompt = rng.pick([
          `Each strip of ribbon is ${aS} m long. ${name} cuts ${B} strips. What is the total length of ribbon, in metres?`,
          `Work out ${aS} × ${bS}.`,
          `Calculate ${aS} × ${bS} without a calculator.`,
        ]);
      } else if (sign > 0 && sa > 0 && A > p10(da) && B > p10(db)) {
        // A garden bed only makes sense when both lengths are over 1 m.
        prompt = rng.pick([
          `A rectangular garden bed measures ${aS} m by ${bS} m. Work out its area in m².`,
          `Work out ${aS} × ${bS}.`,
          `Calculate ${aS} × ${bS} without a calculator.`,
        ]);
      } else {
        prompt = rng.pick([`Work out ${aS} × ${bS}.`, `Calculate ${aS} × ${bS} without a calculator.`]);
      }
      const raw = fx(P, dp);
      const tidy = ft(P, dp);
      const solution = [
        `Ignore the decimal points and multiply whole numbers: ${A} × ${B} = ${P}.`,
        `The question has ${da} + ${db} = ${plural(dp, "decimal place")}, so the answer has ${dp}: ${raw}${raw !== tidy ? ` = ${tidy}` : ""}.`,
      ];
      if (sa < 0 && sb < 0) solution.push(`Negative × negative = positive, so the answer is ${ansS}.`);
      else if (sign < 0) solution.push(`One number is negative, so the answer is negative: ${ansS}.`);
      const rA = roundInt(A, digits(A) - 1);
      const rB = roundInt(B, digits(B) - 1);
      if (rA !== A || rB !== B) {
        solution.push(
          `Check the size with an estimate: ${ft(A, da)} × ${ft(B, db)} ≈ ${ft(rA, da)} × ${ft(rB, db)} = ${ft(rA * rB, dp)}. ${tidy} is about the same size, so the decimal point is in the right place.`,
        );
      }
      const traps: Trap[] = [];
      const slip = "Your decimal point is one place out. Count the decimal places in the question again: the answer has that many.";
      numTrap(traps, val(sign * P, dp - 1), value, slip);
      numTrap(traps, val(sign * P, dp + 1), value, slip);
      const answer: AnswerSpec =
        kind === "money" && prompt.includes("$")
          ? { type: "number", value, allowFraction: false, display: `$${fx(P, 2)}` }
          : { type: "number", value, allowFraction: false };
      return {
        prompt,
        answer,
        solution,
        hint: "Multiply as whole numbers first, then count the decimal places in the question.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.divide-by-whole-number`,
    topicId: TOPIC,
    title: "Divide a decimal by a whole number",
    level: 1,
    guideRef: "dividing-decimals",
    generate(rng, tier) {
      let d = 4, Q = 184, dq = 2, N = 736, dn = 2;
      for (let i = 0; i < 200; i++) {
        const cd = tier === 1 ? rng.pick([2, 3, 4, 5, 6]) : tier === 2 ? rng.int(3, 9) : rng.pick([6, 7, 8, 9, 11, 12, 15]);
        const cdq = tier === 1 ? rng.pick([1, 2]) : rng.pick([1, 2, 2, 3]);
        const maxV = tier === 1 ? 12 : tier === 2 ? 25 : 40;
        const cQ = rng.int(Math.max(2, p10(cdq - 1)), maxV * p10(cdq));
        if (cQ % 10 === 0) continue; // the answer really has cdq decimal places
        const [cN, cdn] = trim(cQ * cd, cdq);
        if (cdn === 0) continue; // the number being divided should be a decimal
        if (tier === 1 && cdn < cdq) continue; // no extra zeros needed at tier 1
        [d, Q, dq, N, dn] = [cd, cQ, cdq, cN, cdn];
        break;
      }
      const dividend = fx(N, dn);
      const qS = fx(Q, dq);
      const padded = fx(Q * d, dq);
      const name = rng.pick(NAMES);
      const size = val(N, dn);
      const prompts = [`Work out ${dividend} ÷ ${d}.`, `Calculate ${dividend} ÷ ${d} without a calculator.`];
      // Contexts only where the sizes are realistic.
      if (size <= 12) prompts.push(`A plank of wood ${dividend} m long is cut into ${d} equal pieces. How long is each piece, in metres?`);
      if (size <= 30) prompts.push(`${name} pours ${dividend} litres of sugarcane juice equally into ${d} jugs. How many litres go into each jug?`);
      if (size > 12 && size <= 150) prompts.push(`A roll of fabric ${dividend} m long is cut into ${d} equal lengths. How long is each length, in metres?`);
      // A bill in dollars and cents: only when the share is a whole number of cents and the bill is at least $10.
      const money = dq <= 2 && Q * d >= 10 * p10(dq);
      const cents = p10(2 - dq);
      if (money) prompts.push(`${d} friends share a bill of $${fx(Q * d * cents, 2)} equally. How much does each person pay?`);
      const prompt = rng.pick(prompts);
      const isMoney = prompt.includes("bill");
      const steps: string[] = [];
      let r = 0;
      for (const ch of padded.replace(".", "")) {
        const cur = r * 10 + Number(ch);
        const q = Math.floor(cur / d);
        r = cur % d;
        steps.push(`${cur} ÷ ${d} = ${q}${r ? ` r ${r}` : ""}`);
      }
      const solution = [
        `Use short division (the bus stop) and keep the decimal point in the answer directly above the point in ${dividend}.`,
      ];
      if (padded !== dividend) {
        solution.push(`Write ${dividend} as ${padded}. Zeros after the last decimal digit don't change the value, and they let the division finish.`);
      }
      solution.push(`Work along the digits, carrying each remainder: ${steps.join("; ")}.`);
      solution.push(`So ${dividend} ÷ ${d} = ${qS}. Check: ${qS} × ${d} = ${dividend}.`);
      const value = val(Q, dq);
      const traps: Trap[] = [];
      const slip = `Check where the point goes: in short division it sits directly above the point in ${dividend}.`;
      numTrap(traps, val(Q, dq - 1), value, slip);
      numTrap(traps, val(Q, dq + 1), value, slip);
      return {
        prompt,
        answer: isMoney
          ? { type: "number", value, allowFraction: false, display: `$${fx(Q * cents, 2)}` }
          : { type: "number", value, allowFraction: false },
        solution,
        hint: "Divide digit by digit as usual, and keep the decimal point lined up.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.round-decimal-places`,
    topicId: TOPIC,
    title: "Round to decimal places",
    level: 1,
    guideRef: "decimal-places",
    generate(rng, tier) {
      let n = 2, D = 4, mag = 70649, neg = false;
      for (let i = 0; i < 200; i++) {
        const cn = tier === 1 ? rng.pick([0, 1, 1, 2, 2]) : tier === 2 ? rng.pick([0, 1, 2, 2, 3]) : rng.pick([1, 2, 2, 3]);
        const cD = cn + rng.int(1, tier === 1 ? 2 : 3);
        const cneg = tier >= 2 && rng.bool(tier === 2 ? 0.2 : 0.3);
        const ip = rng.int(0, tier === 1 ? 60 : 250);
        let cm: number;
        if (tier === 3 && rng.bool(0.6)) {
          // Force a roll-over: the kept part ends in 9 (or 99) and the decider is 5–9.
          let K = ip * p10(cn) + rng.int(0, p10(cn) - 1);
          K = K - (K % 10) + 9;
          if (rng.bool(0.4)) K = K - (K % 100) + 99;
          const restDigits = cD - cn - 1;
          const rest = restDigits > 0 ? rng.int(1, p10(restDigits) - 1) : 0;
          cm = (K * 10 + rng.int(5, 9)) * p10(restDigits) + rest;
        } else {
          cm = ip * p10(cD) + rng.int(1, p10(cD) - 1);
        }
        if (cm % 10 === 0) continue; // must really have cD decimal places
        const f = p10(cD - cn);
        const r = cm % f;
        const R = roundInt(cm, cD - cn) / f;
        if (R === 0) continue;
        if (cneg && 2 * r === f) continue; // exactly halfway with a negative: avoid the ambiguity
        const up = 2 * r >= f;
        if (tier === 1 && up && Math.floor(cm / f) % 10 === 9) continue; // no carries at tier 1
        if (tier === 1 && cn > 0 && R % 10 === 0) continue; // no end zeros at tier 1
        [n, D, mag, neg] = [cn, cD, cm, cneg];
        break;
      }
      const sgn = neg ? -1 : 1;
      const f = p10(D - n);
      const R = roundInt(mag, D - n) / f;
      const kept = Math.floor(mag / f);
      const x = fx(sgn * mag, D);
      const full = fx(mag, D);
      const pt = full.indexOf(".");
      const left = n === 0 ? full.slice(0, pt) : full.slice(0, pt + 1 + n);
      const right = full.slice(pt + 1 + n);
      const decider = Number(right[0]);
      const up = decider >= 5;
      const carry = up && kept % 10 === 9;
      const ans = fixedAnswer(sgn * R, n);
      const place = n === 0 ? "the nearest whole number" : plural(n, "decimal place");
      const name = rng.pick(NAMES);
      const prompts =
        n === 0
          ? [`Round ${x} to the nearest whole number.`, `Write ${x} correct to the nearest whole number.`]
          : [`Round ${x} to ${place}.`, `Write ${x} correct to ${n} d.p.`];
      if (!neg) prompts.push(`${name}'s calculator shows ${x}. Round this to ${place}.`);
      if (!neg && n === 2 && !ans.strict && mag < 80 * p10(D)) {
        prompts.push(`${name} works out each person's share of a bill as $${x}. Round this to the nearest cent (2 decimal places).`);
      }
      const prompt = rng.pick(prompts);
      const solution: string[] = [];
      if (neg) solution.push(`Round the size, ${full}, then put the minus sign back.`);
      solution.push(
        `${n === 0 ? "Cut after the units digit" : `Cut after the ${ordinal(n)} decimal place`}: ${left} | ${right}. The decider is ${decider}.`,
      );
      solution.push(
        up
          ? `${decider} is 5 or more, so round up${carry ? (kept % 100 === 99 ? ". Each 9 becomes 0 and the 1 carries along, just like 199 + 1 = 200" : ". The 9 becomes 0 and 1 carries into the next column, just like 19 + 1 = 20") : ""}: ${fx(R, n)}.`
          : `${decider} is 4 or less, so the last digit you keep stays the same: ${fx(R, n)}.`,
      );
      const zeros = ans.strict ? (fx(R, n).match(/0+$/)?.[0].length ?? 1) : 0;
      solution.push(
        `${x} = ${ans.shown} (to ${place})` +
          (ans.strict ? `. Keep the end ${zeros > 1 ? "zeros" : "zero"}: the answer must show ${plural(n, "decimal place")}.` : "."),
      );
      const ansVal = sgn * val(R, n);
      const traps: Trap[] = [];
      if (ans.strict) {
        traps.push({
          spec: { type: "number", value: ansVal },
          feedback: `Right value, but ${plural(n, "decimal place")} means exactly ${plural(n, "digit")} after the point. Keep the end ${zeros > 1 ? "zeros" : "zero"}: ${ans.shown}.`,
        });
      }
      if (up) numTrap(traps, sgn * val(kept, n), ansVal, `The decider is ${decider}, which is 5 or more, so you need to round up.`);
      else numTrap(traps, sgn * val(kept + 1, n), ansVal, `The decider is ${decider}, which is 4 or less, so the last digit you keep doesn't change.`);
      return {
        prompt,
        answer: ans.spec,
        solution,
        hint: "Find the decider: the one digit just after the last place you keep.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.decimals-and-fractions`,
    topicId: TOPIC,
    title: "Convert between fractions and terminating decimals",
    level: 1,
    guideRef: "recurring-decimals",
    generate(rng, tier) {
      if (rng.bool()) {
        // Terminating decimal → fraction in simplest form.
        let N = 375, k = 3, whole = 0, neg = false;
        for (let i = 0; i < 100; i++) {
          const ck = tier === 1 ? rng.pick([1, 2, 2]) : rng.pick([1, 2, 3, 3]);
          const cw = tier === 1 ? 0 : rng.bool(tier === 2 ? 0.25 : 0.35) ? rng.int(1, 5) : 0;
          const fpart = rng.int(1, p10(ck) - 1);
          if (fpart % 10 === 0) continue;
          if (gcd(fpart, p10(ck)) === 1 && rng.bool(0.7)) continue; // mostly ones that need simplifying
          [N, k, whole] = [cw * p10(ck) + fpart, ck, cw];
          neg = tier === 3 && cw === 0 && rng.bool(0.3);
          break;
        }
        const s = neg ? -1 : 1;
        const den = p10(k);
        const g = gcd(N, den);
        const x = fx(s * N, k);
        const placeName = ["", "tenths", "hundredths", "thousandths"][k];
        const over = frac(s * N, den, { simplify: false, mixed: whole > 0 });
        const simp = frac(s * N, den, { mixed: whole > 0 });
        const prompt = rng.pick([
          `Write ${x} as a fraction in its simplest form.`,
          `Convert ${x} to a fraction. Give your answer in its simplest form.`,
          `Write ${x} as a fraction in its lowest terms.`,
        ]);
        const solution = [`The last digit of ${x} is in the ${placeName} column, so write it over ${den}: ${x} = ${over}.`];
        solution.push(
          g > 1
            ? `Divide the top and bottom by their highest common factor, ${g}: ${over} = ${simp}.`
            : `${N % den} and ${den} have no common factor except 1, so ${over} is already in its simplest form.`,
        );
        if (whole > 0) solution.push(`As an improper fraction, this is ${frac(N, den)}. Either form is fine.`);
        const fn = (s * N) / g;
        const fd = den / g;
        const traps: Trap[] = [];
        const wrongDen = k >= 2 ? p10(k - 1) : p10(k + 1);
        fracTrap(traps, s * N, wrongDen, fn, fd, `${x} ends in the ${placeName} column, so it goes over ${den}, not ${wrongDen}.`);
        if (whole === 0 && !neg && N >= 2) {
          fracTrap(traps, 1, N, fn, fd, `${x} is not one over ${N}. It means ${N} ${placeName}: ${frac(N, den, { simplify: false })}.`);
        }
        const answer: AnswerSpec =
          whole > 0
            ? { type: "fraction", n: fn, d: fd, simplest: true, display: frac(N, den, { mixed: true }) }
            : { type: "fraction", n: fn, d: fd, simplest: true };
        return {
          prompt,
          answer,
          solution,
          hint: "What is the place value of the last digit: tenths, hundredths or thousandths?",
          traps,
        };
      }
      // Fraction → terminating decimal.
      let n = 3, d = 8;
      for (let i = 0; i < 100; i++) {
        const cd = rng.pick(tier === 1 ? [2, 4, 5, 10, 20, 25, 50] : tier === 2 ? [4, 8, 20, 25, 40, 50, 125] : [8, 16, 40, 80, 125, 200, 250]);
        const cn = tier === 3 && rng.bool(0.4) ? rng.int(cd + 1, 3 * cd - 1) : rng.int(1, cd - 1);
        if (gcd(cn, cd) !== 1) continue;
        [n, d] = [cn, cd];
        break;
      }
      const [N, k] = termDec(n, d) ?? [375, 3];
      const m = p10(k) / d;
      const dec = fx(N, k);
      const F = frac(n, d);
      const prompt = rng.pick([
        `Write ${F} as a decimal.`,
        `Convert ${F} to a decimal without a calculator.`,
        `Write ${F} as a decimal by making the denominator a power of 10.`,
      ]);
      const solution =
        m === 1
          ? [`${F} means ${n} ÷ ${d}: the denominator is already 10, so ${F} = ${dec}.`]
          : [
              `Make the denominator a power of 10: ${d} × ${m} = ${p10(k)}, so multiply the top and bottom by ${m}.`,
              `${F} = ${frac(n * m, p10(k), { simplify: false })} = ${dec}.`,
            ];
      solution.push(`Check: ${dec} × ${d} = ${n}.`);
      const value = val(N, k);
      const traps: Trap[] = [];
      if (n < d) numTrap(traps, val(n * p10(digits(d)) + d, digits(d)), value, `${F} means ${n} ÷ ${d}. It isn't "${n} point ${d}".`);
      const rev = termDec(d, n);
      if (rev) numTrap(traps, val(rev[0], rev[1]), value, `That's ${d} ÷ ${n}. A fraction means top ÷ bottom: ${n} ÷ ${d}.`);
      return {
        prompt,
        answer: { type: "number", value, allowFraction: false },
        solution,
        hint: "Can you turn the denominator into 10, 100 or 1000?",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.order-decimals`,
    topicId: TOPIC,
    title: "Put decimals in order",
    level: 1,
    guideRef: "ordering-and-shortcuts",
    generate(rng, tier) {
      const count = tier === 1 ? 4 : 5;
      // Values are integers in thousandths.
      let vals = [700, 680, 609, 710];
      for (let i = 0; i < 200; i++) {
        const I = tier === 1 ? 0 : rng.int(0, 2);
        const t = rng.int(1, 8);
        const cand: number[] = [];
        for (let j = 0; j < count; j++) {
          const dp = rng.pick([1, 2, 3, 3]);
          let m = t * 100 + rng.int(-60, 160);
          if (dp === 1) m = Math.round(m / 100) * 100;
          else if (dp === 2) m = Math.round(m / 10) * 10;
          if (m <= 0 || m >= 1000) break;
          const negP = tier === 1 ? 0 : tier === 2 ? 0.45 : 0.65;
          cand.push((rng.bool(negP) ? -1 : 1) * (I * 1000 + m));
        }
        if (cand.length !== count) continue;
        if (new Set(cand).size !== count) continue;
        const negs = cand.filter((v) => v < 0).length;
        if (tier >= 2 && negs < (tier === 2 ? 2 : 3)) continue;
        if (new Set(cand.map((v) => ft(Math.abs(v), 3).length)).size < 2) continue; // mix of lengths
        if (tier === 1) {
          // The "longer means bigger" order must differ from the true order.
          const key = (v: number) => Number(ft(v, 3).split(".")[1] ?? "0");
          const byLen = [...cand].sort((a, b) => key(a) - key(b));
          const byVal = [...cand].sort((a, b) => a - b);
          if (byLen.every((v, j) => v === byVal[j])) continue;
        }
        vals = cand;
        break;
      }
      const asc = rng.bool(0.65);
      const sorted = [...vals].sort((a, b) => (asc ? a - b : b - a));
      let shown = rng.shuffle(vals);
      if (shown.every((v, j) => v === sorted[j]) || shown.every((v, j) => v === sorted[sorted.length - 1 - j])) {
        shown = [...shown.slice(1), shown[0]];
      }
      const show = (v: number) => ft(v, 3);
      const list = shown.map(show).join(", ");
      const dirText = asc ? "smallest first" : "largest first";
      const prompt = asc
        ? rng.pick([
            `Write these numbers in order, smallest first: ${list}. Separate them with commas.`,
            `Put these numbers in order of size, starting with the smallest: ${list}.`,
          ])
        : rng.pick([
            `Write these numbers in order, largest first: ${list}. Separate them with commas.`,
            `Put these numbers in order of size, starting with the largest: ${list}.`,
          ]);
      const solution: string[] = [];
      const pos = vals.filter((v) => v > 0).sort((a, b) => a - b);
      const neg = vals.filter((v) => v < 0).sort((a, b) => a - b);
      if (pos.length >= 2) {
        solution.push(
          `Pad with zeros so the numbers have the same number of decimal places, then compare column by column: ${pos.map((v) => fx(v, 3)).join(", ")}.`,
        );
      }
      if (neg.length) {
        solution.push(
          `Negative numbers are less than positive ones. For negatives, the bigger the size, the smaller the number: ${neg.map(show).join(" < ")}.`,
        );
      }
      solution.push(`In order, ${dirText}: ${sorted.map(show).join(", ")}.`);
      const values = sorted.map((v) => val(v, 3));
      const traps: Trap[] = [];
      if (!neg.length) {
        const key = (v: number) => Number(ft(v, 3).split(".")[1] ?? "0");
        const byLen = [...vals].sort((a, b) => (asc ? key(a) - key(b) : key(b) - key(a))).map((v) => val(v, 3));
        listTrap(traps, byLen, values, "A longer decimal isn't automatically bigger. Pad with zeros and compare tenths first, then hundredths.");
      } else if (neg.length >= 2) {
        // Negatives ordered by size as if they were positive.
        const wrongNeg = [...neg].sort((a, b) => b - a);
        const ascWrong = [...wrongNeg, ...pos];
        const w = (asc ? ascWrong : [...ascWrong].reverse()).map((v) => val(v, 3));
        listTrap(
          traps,
          w,
          values,
          `Check the negatives: the bigger the size, the smaller the number, so ${show(neg[0])} is less than ${show(neg[neg.length - 1])}.`,
        );
      }
      listTrap(traps, [...values].reverse(), values, `Right numbers, wrong direction: the question asks for ${dirText}.`);
      return {
        prompt,
        answer: { type: "list", values, ordered: true, display: sorted.map(show).join(", ") },
        solution,
        hint: "Line the numbers up by their decimal points and pad with zeros so they're the same length.",
        traps,
      };
    },
  },

  // ------------------------------------------------------------ level 2
  {
    id: `${TOPIC}.divide-by-decimal`,
    topicId: TOPIC,
    title: "Divide by a decimal",
    level: 2,
    guideRef: "dividing-decimals",
    generate(rng, tier) {
      let B = 4, db = 1, Q = 15, dq = 0;
      for (let i = 0; i < 200; i++) {
        const cdb = tier === 3 && rng.bool(0.5) ? 2 : 1;
        const cB = rng.pick(tier === 1 ? [2, 3, 4, 5, 6, 7, 8, 9] : [2, 3, 4, 5, 6, 7, 8, 9, 12, 15, 25, 35]);
        const cdq = tier === 1 ? 0 : tier === 2 ? rng.pick([0, 0, 1]) : rng.pick([0, 1, 1]);
        const cQ = cdq === 0 ? rng.int(2, tier === 1 ? 30 : 60) : rng.int(11, 199);
        if (cdq > 0 && cQ % 10 === 0) continue;
        if (trim(cB * cQ, cdb + cdq)[1] > 3) continue;
        [B, db, Q, dq] = [cB, cdb, cQ, cdq];
        break;
      }
      const s = p10(db);
      const [A, dA] = trim(B * Q, db + dq);
      let sa = 1, sb = 1;
      if (tier === 3 && rng.bool(0.35)) {
        if (rng.bool()) sa = -1;
        else sb = -1;
      }
      const sign = sa * sb;
      const absA = fx(A, dA);
      const absB = fx(B, db);
      const aS = fx(sa * A, dA);
      const bS = sb < 0 ? `(${fx(-B, db)})` : absB;
      const scaled = ft(B * Q, dq); // a × 10^db
      const qAbs = fx(Q, dq);
      const qS = fx(sign * Q, dq);
      const value = val(sign * Q, dq);
      const prompts = [`Work out ${aS} ÷ ${bS}.`, `Calculate ${aS} ÷ ${bS} without a calculator.`];
      if (sign > 0 && dq === 0) {
        prompts.push(`How many pieces of ribbon, each ${absB} m long, can be cut from ${absA} m of ribbon?`);
        // Only a realistic cup size (at most 0.5 litres).
        if (2 * B <= s) prompts.push(`A cup holds ${absB} litres. How many cups can be filled from ${absA} litres of soya milk?`);
      }
      const prompt = rng.pick(prompts);
      const solution: string[] = [];
      if (sign < 0) solution.push(`Work with the sizes first and sort out the sign at the end.`);
      solution.push(`Make the divisor a whole number: multiply both numbers by ${s}. The answer doesn't change.`);
      solution.push(`${absA} ÷ ${absB} = ${scaled} ÷ ${B}.`);
      solution.push(`${scaled} ÷ ${B} = ${qAbs}.`);
      if (sign < 0) solution.push(`A negative divided by a positive (or a positive by a negative) is negative: ${qS}.`);
      else solution.push(`Check: ${qAbs} × ${absB} = ${absA}.`);
      const traps: Trap[] = [];
      numTrap(traps, val(sign * Q, dq + db), value, `You multiplied ${absB} by ${s} but not ${absA}. Multiply BOTH numbers by ${s}.`);
      if (B < s) {
        numTrap(
          traps,
          val(sign * B * B * Q, 2 * db + dq),
          value,
          `That's ${aS} × ${bS}. Dividing by a number between 0 and 1 makes the answer bigger, not smaller.`,
        );
      }
      return {
        prompt,
        answer: { type: "number", value, allowFraction: false },
        solution,
        hint: "Multiply both numbers by the same power of 10 until you are dividing by a whole number.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.round-significant-figures`,
    topicId: TOPIC,
    title: "Round to significant figures",
    level: 2,
    guideRef: "significant-figures",
    generate(rng, tier) {
      let N = 54718, D = 0, n = 2, kind = "big";
      for (let i = 0; i < 200; i++) {
        const k = rng.pick(tier === 1 ? ["big", "small", "mid"] : ["big", "small", "small", "mid"]);
        let cN: number, cD: number, cn: number;
        if (k === "big") {
          const L = tier === 1 ? rng.int(3, 5) : rng.int(4, 7);
          const ipart = rng.int(p10(L - 1), p10(L) - 1);
          cD = tier === 1 ? 0 : rng.pick([0, 0, 1, 2]);
          cN = ipart * p10(cD) + (cD ? rng.int(1, p10(cD) - 1) : 0);
          cn = rng.int(1, Math.min(3, L - 1));
        } else if (k === "small") {
          const z = tier === 1 ? rng.int(0, 2) : rng.int(0, 4); // zeros straight after the point
          const sd = tier === 1 ? 3 : rng.int(3, 4);
          cN = rng.int(p10(sd - 1), p10(sd) - 1);
          cD = z + sd;
          cn = rng.int(1, sd - 1);
        } else {
          const ipart = rng.int(1, tier === 1 ? 9 : 99);
          cD = rng.int(2, tier === 1 ? 3 : 4);
          cN = ipart * p10(cD) + rng.int(1, p10(cD) - 1);
          cn = rng.int(1, Math.min(4, digits(cN) - 1));
        }
        if (cD > 0 && cN % 10 === 0) continue;
        const drop = digits(cN) - cn;
        if (drop <= 0) continue;
        if (cN % p10(drop) === 0) continue; // already has n s.f. (630 to 2 s.f.): nothing to round
        const R = roundInt(cN, drop);
        if (R === p10(digits(cN))) continue; // e.g. 9960 → 10 000 changes the number of digits: avoid
        const dpOut = Math.max(0, cD - drop);
        const M = R / p10(cD - dpOut);
        if (tier === 1 && dpOut > 0 && M % 10 === 0) continue; // no significant end zeros at tier 1
        [N, D, n, kind] = [cN, cD, cn, k];
        break;
      }
      const L = digits(N);
      const drop = L - n;
      const Rint = roundInt(N, drop);
      const dpOut = Math.max(0, D - drop);
      const M = Rint / p10(D - dpOut);
      const ans = fixedAnswer(M, dpOut, true);
      const xs = fx(N, D, { commas: true });
      const small = N < p10(D);
      const sf = plural(n, "significant figure");
      const prompts = [`Round ${xs} to ${sf}.`, `Write ${xs} correct to ${n} s.f.`];
      if (kind === "big" && D === 0) prompts.push(`A website had ${xs} visitors last month. Round this number to ${sf}.`);
      if (small) prompts.push(`A scientist measures a mass of ${xs} g. Write this mass correct to ${sf}.`);
      const prompt = rng.pick(prompts);
      // Cut display: after the n-th significant digit.
      const full = fx(N, D);
      let count = 0;
      let started = false;
      let idx = full.length - 1;
      for (let j = 0; j < full.length; j++) {
        const c = full[j];
        if (c < "0" || c > "9") continue;
        if (!started && c !== "0") started = true;
        if (started) {
          count++;
          if (count === n) {
            idx = j;
            break;
          }
        }
      }
      const left = full.slice(0, idx + 1);
      const right = full.slice(idx + 1);
      const decider = Number(right.replace(".", "")[0]);
      const up = decider >= 5;
      const first = full.replace(/[0.]/g, "")[0];
      const solution = [
        `The first significant figure is the first non-zero digit: ${first}.` +
          (small ? " The zeros in front of it only show the size, so they don't count." : ""),
        `Count ${sf} and cut: ${left} | ${right}. The decider is ${decider}.`,
        up ? `${decider} is 5 or more, so round up.` : `${decider} is 4 or less, so the last figure you keep stays the same.`,
      ];
      if (drop > D) solution.push(`Fill the places up to the decimal point with zeros so the number keeps its size: ${xs} = ${ans.shown} (to ${n} s.f.).`);
      else if (ans.strict) {
        const many = (ans.shown.match(/0+$/)?.[0].length ?? 1) > 1;
        solution.push(`The end ${many ? "zeros are significant figures, so they" : "zero is a significant figure, so it"} must be written: ${xs} = ${ans.shown} (to ${n} s.f.).`);
      }
      else solution.push(`So ${xs} = ${ans.shown} (to ${n} s.f.).`);
      const ansVal = val(Rint, D);
      const traps: Trap[] = [];
      if (ans.strict) {
        traps.push({
          spec: { type: "number", value: ansVal },
          feedback: `Right value, but ${n} s.f. needs ${n} significant figures. The end ${(ans.shown.match(/0+$/)?.[0].length ?? 1) > 1 ? "zeros count" : "zero counts"}, so write ${ans.shown}.`,
        });
      }
      if (drop > D) numTrap(traps, Rint / p10(drop), ansVal, `Keep the size of the number: ${xs} is about ${ans.shown}, not ${group(String(Rint / p10(drop)))}. Fill up to the decimal point with zeros.`);
      if (small && D - n > 0) {
        numTrap(traps, val(roundInt(N, D - n), D), ansVal, `That's ${plural(n, "decimal place")}. Significant figures start at the first non-zero digit, not at the decimal point.`);
      }
      if (up) numTrap(traps, val(truncInt(N, drop), D), ansVal, `The decider is ${decider}, which is 5 or more, so round up.`);
      return {
        prompt,
        answer: ans.spec,
        solution,
        hint: "Start counting at the first non-zero digit, then use the next digit to decide.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.estimate`,
    topicId: TOPIC,
    title: "Estimate by rounding to 1 significant figure",
    level: 2,
    guideRef: "estimation",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      // ---- Over- or underestimate? (tiers 2–3)
      if (tier >= 2 && rng.bool(tier === 2 ? 0.25 : 0.4)) {
        for (let i = 0; i < 100; i++) {
          const op = rng.pick(["×", "÷"]);
          const dir: 1 | -1 = rng.bool() ? 1 : -1;
          const ma = rng.int(2, 9);
          const mb = rng.int(2, 9);
          const a = approxNum(rng, ma, rng.int(0, 2), dir);
          const b = approxNum(rng, mb, op === "×" ? rng.int(-1, 1) : rng.int(0, 1), op === "×" ? dir : dir === 1 ? -1 : 1);
          if (!a || !b) continue;
          const expr = `${shownA(a)} ${op} ${shownA(b)}`;
          const over = dir === 1;
          const word = over ? "overestimate" : "underestimate";
          const solution = [
            `${shownA(a)} rounds ${a.dir === 1 ? "up" : "down"} to ${shownT(a)}, and ${shownA(b)} rounds ${b.dir === 1 ? "up" : "down"} to ${shownT(b)}.`,
          ];
          if (op === "×") {
            const est = ft(a.m * b.m, -(a.e + b.e));
            solution.push(
              over
                ? `Both numbers went up, so the product goes up: ${shownT(a)} × ${shownT(b)} = ${est} is bigger than the exact answer.`
                : `Both numbers went down, so the product goes down: ${shownT(a)} × ${shownT(b)} = ${est} is smaller than the exact answer.`,
            );
            if (a.dp + b.dp <= 6) solution.push(`(The exact answer is ${ft(a.X * b.X, a.dp + b.dp)}.)`);
          } else {
            solution.push(
              over
                ? "The number being divided went up and the number you divide by went down. Both changes make the answer bigger."
                : "The number being divided went down and the number you divide by went up. Both changes make the answer smaller.",
            );
          }
          solution.push(`So the estimate is an ${word}.`);
          return {
            prompt: `${name} estimates ${expr} by rounding each number to 1 significant figure. Is the estimate an overestimate or an underestimate of the exact answer? Answer overestimate or underestimate.`,
            answer: { type: "text", accept: over ? OVER : UNDER, display: word },
            solution,
            hint: "Did each number go up or down when it was rounded? What does that do to the answer?",
            traps: [
              {
                spec: { type: "text", accept: over ? UNDER : OVER },
                feedback:
                  op === "×"
                    ? `Look at which way the numbers were rounded: both went ${over ? "up" : "down"}, so the product went ${over ? "up" : "down"} too.`
                    : "Careful with division: making the number you divide by smaller makes the answer bigger.",
              },
            ],
          };
        }
      }
      // ---- Numerical estimate.
      for (let i = 0; i < 200; i++) {
        const kind = tier === 1 ? rng.pick(["prod", "prod", "quot"]) : tier === 2 ? rng.pick(["prod", "quot", "frac3"]) : rng.pick(["quot", "frac3", "frac3"]);
        const eRange: [number, number] = tier === 1 ? [0, 1] : tier === 2 ? [-1, 2] : [-2, 3];
        const pickE = () => rng.int(eRange[0], eRange[1]);
        const a = approxNum(rng, rng.int(1, 9), pickE());
        const b = approxNum(rng, rng.int(1, 9), kind === "prod" ? pickE() : tier === 1 ? rng.int(0, 1) : rng.int(eRange[0], 1));
        const c = kind === "frac3" ? approxNum(rng, rng.int(1, 9), rng.int(Math.max(-2, eRange[0]), 1)) : null;
        if (!a || !b || (kind === "frac3" && !c)) continue;
        const factors = c ? [a, b, c] : [a, b];
        if (factors.some((f) => f.m === 1 && f.e === 0)) continue; // no ×1 or ÷1
        // Exact estimate as [n, dp].
        let est: [number, number];
        let numer: [number, number]; // the part being divided (for frac3/quot)
        let divisor: Approx | null = null;
        if (kind === "prod") {
          est = trim(a.m * b.m, -(a.e + b.e));
          numer = est;
        } else {
          numer = kind === "quot" ? [a.m, -a.e] : [a.m * b.m, -(a.e + b.e)];
          divisor = kind === "quot" ? b : (c as Approx);
          let j = 0;
          while (j <= 2 && (numer[0] * p10(j)) % divisor.m !== 0) j++;
          if (j > 2) continue;
          // (n / 10^dp) ÷ (m × 10^e) = (n × 10^j ÷ m) / 10^(dp + j + e)
          est = [(numer[0] * p10(j)) / divisor.m, numer[1] + j + divisor.e];
        }
        if (est[1] < 0) est = [est[0] * p10(-est[1]), 0];
        est = trim(est[0], est[1]);
        const ev = val(est[0], est[1]);
        if (est[1] > 3 || ev > 1e6 || ev < 0.001) continue;
        const aS = shownA(a), bS = shownA(b);
        let expr: string;
        let prompt: string;
        if (kind === "prod") {
          expr = `${aS} × ${bS}`;
          const moneyOk = b.e === 0 && b.dp === 2 && a.e >= 0 && a.e <= 1;
          prompt =
            moneyOk && rng.bool(0.4)
              ? `${name}'s school buys ${aS} m of fabric at $${fx(b.X, 2)} per metre. Estimate the cost by rounding each number to 1 significant figure.`
              : `Estimate ${expr} by rounding each number to 1 significant figure.`;
        } else if (kind === "quot") {
          expr = `${aS} ÷ ${bS}`;
          prompt = `Estimate ${expr} by rounding each number to 1 significant figure.`;
        } else {
          const cS = shownA(c as Approx);
          expr = `{{(${aS} * ${bS})/${cS}}}`;
          prompt = rng.pick([
            `Estimate the value of ${expr} by rounding each number to 1 significant figure.`,
            `By rounding each number to 1 significant figure, find an estimate for ${expr}.`,
          ]);
        }
        const estS = ft(est[0], est[1]);
        const solution = [`Round each number to 1 s.f.: ${factors.map((f) => `${shownA(f)} ≈ ${shownT(f)}`).join(", ")}.`];
        if (kind === "prod") {
          solution.push(`${shownT(a)} × ${shownT(b)} = ${estS}.`);
        } else {
          const dv = divisor as Approx;
          const numS = ft(numer[0], numer[1]);
          if (kind === "frac3") solution.push(`Top: ${shownT(a)} × ${shownT(b)} = ${numS}.`);
          const recip = dv.e < 0 && [1, 2, 5].includes(dv.m) ? p10(-dv.e) / dv.m : 0;
          solution.push(
            `${numS} ÷ ${shownT(dv)} = ${estS}.` + (recip ? ` (Dividing by ${shownT(dv)} is the same as multiplying by ${recip}.)` : ""),
          );
        }
        solution.push(`So the answer is approximately ${estS}.`);
        const traps: Trap[] = [];
        if (divisor && divisor.e < 0) {
          numTrap(
            traps,
            val(est[0], est[1] - divisor.e),
            ev,
            `Dividing by ${shownT(divisor)} is not the same as dividing by ${divisor.m}. Dividing by a number less than 1 makes the answer bigger.`,
          );
        }
        if (divisor) {
          numTrap(traps, val(numer[0] * divisor.m, numer[1] - divisor.e), ev, `You multiplied by ${shownT(divisor)} instead of dividing by it.`);
        }
        return {
          prompt,
          answer: prompt.includes("$") ? { type: "number", value: ev, display: `$${estS}` } : { type: "number", value: ev },
          solution,
          hint: "Round every number to 1 significant figure first, then the calculation is easy to do in your head.",
          traps,
        };
      }
      // Fallback (never reached in practice).
      return {
        prompt: "Estimate 6.12 × 39.6 by rounding each number to 1 significant figure.",
        answer: { type: "number", value: 240 },
        solution: ["Round each number to 1 s.f.: 6.12 ≈ 6, 39.6 ≈ 40.", "6 × 40 = 240."],
        hint: "Round every number to 1 significant figure first.",
      };
    },
  },
  {
    id: `${TOPIC}.terminating-or-recurring`,
    topicId: TOPIC,
    title: "Terminating or recurring decimal?",
    level: 2,
    guideRef: "recurring-decimals",
    generate(rng, tier) {
      // Some fractions are deliberately NOT simplified here (e.g. 9/12): spotting
      // that you must simplify first is part of the skill.
      let n = 7, d = 12, a = 7, b = 12;
      for (let i = 0; i < 100; i++) {
        const terminating = rng.bool();
        const unsimplified = tier >= 2 && rng.bool(tier === 2 ? 0.3 : 0.5);
        let cb: number, k = 1;
        if (unsimplified) {
          cb = terminating ? rng.pick([2, 4, 5, 8, 10, 20, 25, 40]) : rng.pick([3, 6, 7, 9, 11]);
          k = terminating ? rng.pick([3, 7, 9, 11, 3]) : rng.pick([2, 4, 5, 10]);
        } else {
          cb = terminating
            ? rng.pick(tier === 1 ? [2, 4, 5, 8, 10, 20, 25] : tier === 2 ? [8, 16, 20, 25, 40, 50, 80, 125] : [16, 32, 40, 64, 80, 125, 160, 200, 250, 320, 625])
            : rng.pick(tier === 1 ? [3, 6, 7, 9, 11, 12] : tier === 2 ? [12, 15, 18, 22, 24, 30, 45, 60] : [21, 28, 33, 35, 36, 48, 55, 75, 96, 120]);
        }
        const ca = rng.int(1, cb - 1);
        if (gcd(ca, cb) !== 1) continue;
        [a, b, n, d] = [ca, cb, ca * k, cb * k];
        break;
      }
      const term = termDec(a, b);
      const F = frac(n, d, { simplify: false });
      const S = frac(a, b);
      const prompt = rng.pick([
        `Does ${F} give a terminating or a recurring decimal? Answer terminating or recurring.`,
        `Without dividing, decide whether ${F} is a terminating or a recurring decimal. Answer terminating or recurring.`,
        `When ${F} is written as a decimal, does it terminate or recur? Answer terminating or recurring.`,
      ]);
      const solution: string[] = [];
      if (n !== a) solution.push(`Simplify first: ${F} = ${S}.`);
      const pf = primeFactors(b);
      solution.push(`The prime factors of the denominator ${b} are ${pf.length > 1 ? pf.join(" × ") : `just ${b} (it's prime)`}.`);
      const e = expand(a, b);
      let shownDec: string;
      if (term) {
        shownDec = fx(term[0], term[1]);
        solution.push(`It has only 2s and 5s, so it can be written over a power of 10: it terminates. ${S} = ${shownDec}.`);
      } else {
        const bad = pf.filter((p) => p !== 2 && p !== 5);
        shownDec = dotted(e.whole, e.pre, e.rep);
        solution.push(
          `It has a factor of ${bad[0]}, which isn't 2 or 5, so the division never ends: it recurs. ${S} = ${longForm(e.whole, e.pre, e.rep)} = ${shownDec}.`,
        );
      }
      const traps: Trap[] = [
        {
          spec: { type: "text", accept: term ? RECUR : TERM },
          feedback: term
            ? n !== a
              ? `Simplify first: ${F} = ${S}, and ${b} has only 2s and 5s as prime factors.`
              : `The denominator ${b} has only 2s and 5s as prime factors, so the decimal stops.`
            : `Look at the prime factors of ${b} (after simplifying). Any prime other than 2 or 5 means it recurs.`,
        },
      ];
      return {
        prompt,
        answer: { type: "text", accept: term ? TERM : RECUR, display: `${term ? "terminating" : "recurring"} (${shownDec})` },
        solution,
        hint: "Simplify the fraction, then find the prime factors of the denominator.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.clever-calculation`,
    topicId: TOPIC,
    title: "Calculate cleverly with the laws of arithmetic",
    level: 2,
    guideRef: "ordering-and-shortcuts",
    generate(rng, tier) {
      const kind =
        tier === 1
          ? rng.pick(["near", "pairs", "compAdd"])
          : tier === 2
            ? rng.pick(["near", "factor", "pairs", "compAdd", "compSub"])
            : rng.pick(["near", "near", "factor", "pairs", "compSub"]);
      const intro = (e: string) =>
        rng.pick([
          `Work out ${e} without a calculator. Look for a shortcut first.`,
          `Use a mental shortcut to work out ${e}.`,
          `Find the value of ${e} without a calculator.`,
        ]);
      const pickA = (): [number, number] => {
        for (let i = 0; i < 50; i++) {
          const two = tier === 3 || (tier === 2 && rng.bool(0.4));
          const A = two ? rng.int(101, 999) : rng.int(11, 99);
          if (A % 10 !== 0) return [A, two ? 2 : 1];
        }
        return [47, 1];
      };
      if (kind === "near") {
        // multiplier b = base ± diff, each as [int, dp]
        type Near = { b: [number, number]; base: [number, number]; diff: [number, number]; op: 1 | -1 };
        const T1: Near[] = [
          { b: [99, 1], base: [10, 0], diff: [1, 1], op: -1 },
          { b: [99, 0], base: [100, 0], diff: [1, 0], op: -1 },
          { b: [101, 0], base: [100, 0], diff: [1, 0], op: 1 },
          { b: [101, 1], base: [10, 0], diff: [1, 1], op: 1 },
        ];
        const T2: Near[] = [
          { b: [99, 2], base: [1, 0], diff: [1, 2], op: -1 },
          { b: [101, 2], base: [1, 0], diff: [1, 2], op: 1 },
          { b: [199, 1], base: [20, 0], diff: [1, 1], op: -1 },
          { b: [49, 1], base: [5, 0], diff: [1, 1], op: -1 },
        ];
        const T3: Near[] = [
          { b: [299, 2], base: [3, 0], diff: [1, 2], op: -1 },
          { b: [999, 0], base: [1000, 0], diff: [1, 0], op: -1 },
        ];
        const nr = rng.pick(tier === 1 ? T1 : tier === 2 ? [...T1, ...T2] : [...T2, ...T3, T1[0]]);
        const [A, da] = tier === 1 && nr.b[1] === 0 && rng.bool() ? [rng.int(12, 89), 0] : pickA();
        const A2 = A % 10 === 0 ? A + 3 : A;
        const aS = fx(A2, da);
        const bS = ft(nr.b[0], nr.b[1]);
        const baseS = ft(nr.base[0], nr.base[1]);
        const diffS = ft(nr.diff[0], nr.diff[1]);
        const ab: [number, number] = [A2 * nr.base[0], da + nr.base[1]];
        const ad: [number, number] = [A2 * nr.diff[0], da + nr.diff[1]];
        const res: [number, number] = [A2 * nr.b[0], da + nr.b[1]];
        const value = val(res[0], res[1]);
        const sym = nr.op < 0 ? "−" : "+";
        const L = Math.max(ab[1], nr.diff[1]);
        const slip = ab[0] * p10(L - ab[1]) + nr.op * nr.diff[0] * p10(L - nr.diff[1]);
        const traps: Trap[] = [];
        numTrap(traps, val(slip, L), value, `Multiply ${aS} by BOTH parts: ${aS} × ${diffS} = ${ft(ad[0], ad[1])}, so you ${nr.op < 0 ? "subtract" : "add"} ${ft(ad[0], ad[1])}, not ${diffS}.`);
        return {
          prompt: intro(`${aS} × ${bS}`),
          answer: { type: "number", value, allowFraction: false },
          solution: [
            `${bS} = ${baseS} ${sym} ${diffS}, so ${aS} × ${bS} = ${aS} × ${baseS} ${sym} ${aS} × ${diffS}.`,
            `${aS} × ${baseS} = ${ft(ab[0], ab[1])} and ${aS} × ${diffS} = ${ft(ad[0], ad[1])}.`,
            `${ft(ab[0], ab[1])} ${sym} ${ft(ad[0], ad[1])} = ${ft(res[0], res[1])}.`,
          ],
          hint: `${bS} is very close to ${baseS}. How could you use that?`,
          traps,
        };
      }
      if (kind === "factor") {
        const [A, da] = pickA();
        const aS = fx(A, da);
        const mode = rng.pick(tier === 2 ? ["sum10", "sum10", "diff10"] : ["sum1", "sum100", "diff10", "sum10"]);
        let Bv = 37, dpb = 1, Cv = 63, total = 10, plus = true;
        for (let i = 0; i < 50; i++) {
          if (mode === "sum10" || mode === "sum1") {
            Bv = rng.int(11, 89);
            Cv = 100 - Bv;
            dpb = mode === "sum10" ? 1 : 2;
            total = mode === "sum10" ? 10 : 1;
          } else if (mode === "sum100") {
            Bv = rng.int(101, 899);
            Cv = 1000 - Bv;
            dpb = 1;
            total = 100;
          } else {
            Bv = rng.int(101, 199);
            Cv = Bv - 100;
            dpb = 1;
            total = 10;
            plus = false;
          }
          if (Bv % 10 !== 0 && Cv % 10 !== 0) break;
        }
        const bS = fx(Bv, dpb), cS = fx(Cv, dpb);
        const swap = rng.bool(0.3);
        const expr = swap ? `${bS} × ${aS} ${plus ? "+" : "−"} ${cS} × ${aS}` : `${aS} × ${bS} ${plus ? "+" : "−"} ${aS} × ${cS}`;
        const value = val(A * total, da);
        return {
          prompt: intro(expr),
          answer: { type: "number", value, allowFraction: false },
          solution: [
            `${aS} is in both products, so take it out as a common factor: ${expr} = ${aS} × (${bS} ${plus ? "+" : "−"} ${cS}).`,
            `${bS} ${plus ? "+" : "−"} ${cS} = ${total}.`,
            `${aS} × ${total} = ${ft(A * total, da)}.`,
          ],
          hint: "Which number appears in both products?",
        };
      }
      if (kind === "pairs") {
        const P = rng.pick(
          tier === 1
            ? [[[25, 2], [4, 0], 1], [[5, 1], [2, 0], 1], [[2, 1], [5, 0], 1]]
            : [[[25, 2], [4, 0], 1], [[125, 3], [8, 0], 1], [[25, 1], [4, 0], 10], [[125, 2], [8, 0], 10], [[4, 1], [25, 0], 10], [[5, 2], [20, 0], 1]],
        ) as [[number, number], [number, number], number];
        const [A, da] = pickA();
        const xS = fx(A, da);
        const pS = ft(P[0][0], P[0][1]);
        const qS = ft(P[1][0], P[1][1]);
        const expr = rng.bool() ? `${pS} × ${xS} × ${qS}` : `${qS} × ${xS} × ${pS}`;
        const value = val(A * P[2], da);
        return {
          prompt: intro(expr),
          answer: { type: "number", value, allowFraction: false },
          solution: [
            `You can multiply in any order (the commutative and associative laws), so pair up ${pS} × ${qS} first.`,
            `${pS} × ${qS} = ${P[2]}.`,
            `${P[2]} × ${xS} = ${ft(A * P[2], da)}.`,
          ],
          hint: "Multiplication can be done in any order. Which two numbers make a very friendly product?",
        };
      }
      // Round and compensate (addition or subtraction), everything in hundredths.
      const W = rng.int(2, tier === 1 ? 9 : 19);
      const dI = rng.pick([1, 2, 3, 10, 20]);
      const aI = W * 100 - dI;
      let bI = rng.int(101, 999);
      if (bI % 10 === 0) bI += 3;
      const aS = ft(aI, 2), dS = ft(dI, 2);
      const traps: Trap[] = [];
      if (kind === "compAdd") {
        const bS = fx(bI, 2);
        const value = val(aI + bI, 2);
        numTrap(traps, val(W * 100 + bI + dI, 2), value, `Using ${W} adds ${dS} too much, so you must subtract ${dS} afterwards, not add it.`);
        return {
          prompt: intro(rng.bool() ? `${aS} + ${bS}` : `${bS} + ${aS}`),
          answer: { type: "number", value, allowFraction: false },
          solution: [
            `${aS} is ${dS} less than ${W}. Add ${W} instead: ${W} + ${bS} = ${ft(W * 100 + bI, 2)}.`,
            `You added ${dS} too much, so take it off: ${ft(W * 100 + bI, 2)} − ${dS} = ${ft(aI + bI, 2)}.`,
          ],
          hint: `${aS} is very close to a whole number.`,
          traps,
        };
      }
      const big = W * 100 + rng.int(150, 1500);
      const BI = big % 10 === 0 ? big + 7 : big;
      const BS = fx(BI, 2);
      const value = val(BI - aI, 2);
      numTrap(traps, val(BI - W * 100 - dI, 2), value, `Subtracting ${W} takes away ${dS} too much, so add ${dS} back on.`);
      return {
        prompt: intro(`${BS} − ${aS}`),
        answer: { type: "number", value, allowFraction: false },
        solution: [
          `${aS} is ${dS} less than ${W}. Subtract ${W} instead: ${BS} − ${W} = ${ft(BI - W * 100, 2)}.`,
          `You took away ${dS} too much, so add it back: ${ft(BI - W * 100, 2)} + ${dS} = ${ft(BI - aI, 2)}.`,
        ],
        hint: `${aS} is very close to a whole number.`,
        traps,
      };
    },
  },

  // ------------------------------------------------------------ level 3 (stretch)
  {
    id: `${TOPIC}.recurring-to-fraction`,
    topicId: TOPIC,
    title: "Stretch: write a recurring decimal as a fraction",
    level: 3,
    guideRef: "recurring-decimals",
    generate(rng, tier) {
      const kind = tier === 1 ? "one" : tier === 2 ? rng.pick(["two", "two", "one"]) : rng.pick(["mixed", "mixed", "three", "two"]);
      let I = 0, pre = "", rep = "3";
      for (let i = 0; i < 100; i++) {
        if (kind === "one") {
          I = rng.int(0, tier === 1 ? 3 : 5);
          pre = "";
          rep = String(rng.int(1, 8));
        } else if (kind === "two") {
          rep = String(rng.int(1, 98)).padStart(2, "0");
          if (rep[0] === rep[1]) continue; // 0.3̇3̇ is really 0.3̇
          pre = "";
          I = tier === 3 ? rng.int(0, 2) : 0;
        } else if (kind === "three") {
          rep = String(rng.int(1, 998)).padStart(3, "0");
          if (rep[0] === rep[1] && rep[1] === rep[2]) continue;
          pre = "";
          I = 0;
        } else {
          const a = rng.int(0, 9), b = rng.int(1, 8); // b ≠ 0 (terminates) and ≠ 9 (0.29̇ = 0.3)
          if (a === b) continue;
          pre = String(a);
          rep = String(b);
          I = rng.int(0, 1);
        }
        break;
      }
      const r = rep.length;
      const p = pre.length;
      const den0 = (p10(r) - 1) * p10(p);
      const num0 = I * den0 + Number(pre + rep) - (p ? Number(pre) : 0);
      const g = gcd(num0, den0);
      const fn = num0 / g, fd = den0 / g;
      const dot = dotted(I, pre, rep);
      const long = longForm(I, pre, rep);
      const prompt = rng.pick([
        `Write ${dot} (that is, ${long}) as a fraction in its simplest form.`,
        `The recurring decimal ${dot} stands for ${long} with the digits repeating for ever. Write it as a fraction in its simplest form.`,
        `Use algebra to write ${dot} = ${long} as a fraction in its simplest form.`,
      ]);
      const tail = (k: number) => {
        // digits after the point once x has been multiplied so that only the recurring block follows
        let s = "";
        while (s.length < 6) s += rep;
        return s.slice(0, Math.max(6, r * 2)) + "…";
      };
      const fracAns = frac(num0, den0, { simplify: false });
      const simp = frac(fn, fd, { mixed: I > 0 });
      const finish = `x = ${fracAns}${g > 1 || I > 0 ? ` = ${simp}` : ""}.`;
      let solution: string[];
      if (p === 0) {
        const big = I * p10(r) + Number(rep);
        solution = [
          `Let x = ${long}`,
          `The recurring block has ${plural(r, "digit")}, so multiply by ${p10(r)}: ${p10(r)}x = ${big}.${tail(0)}`,
          `Subtract to cancel the recurring part: ${p10(r)}x − x = ${p10(r) - 1}x = ${big} − ${I} = ${num0}.`,
          finish,
        ];
      } else {
        const ten = I * 10 + Number(pre);
        const hund = I * 100 + Number(pre + rep);
        solution = [
          `Let x = ${long}`,
          `Multiply by 10 to move the non-recurring digit past the point: 10x = ${ten}.${tail(0)}`,
          `Multiply by 100: 100x = ${hund}.${tail(0)}`,
          `Subtract: 100x − 10x = 90x = ${hund} − ${ten} = ${num0}, so ${finish}`,
        ];
      }
      const traps: Trap[] = [];
      if (kind === "mixed") {
        fracTrap(traps, I * 99 + Number(pre + rep), 99, fn, fd, `Only the ${rep} recurs, not ${pre}${rep}. Use 10x and 100x so the recurring parts line up.`);
      }
      fracTrap(
        traps,
        I * p10(p + r) + Number(pre + rep),
        p10(p + r),
        fn,
        fd,
        `That's the terminating decimal ${I}.${pre}${rep}. The dot notation means the digits repeat for ever, so the value is a little bigger.`,
      );
      return {
        prompt,
        answer:
          I > 0
            ? { type: "fraction", n: fn, d: fd, simplest: true, display: simp }
            : { type: "fraction", n: fn, d: fd, simplest: true },
        solution,
        hint: "Let x be the decimal. Multiply by 10, 100 or 1000 so that the recurring parts line up, then subtract.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.error-interval`,
    topicId: TOPIC,
    title: "Stretch: find an error interval",
    level: 3,
    guideRef: "error-intervals",
    generate(rng, tier) {
      type Ctx = { what: string; v: string; unit: string; lo: number; hi: number };
      type Kind = "whole" | "ten" | "hundred" | "dp1" | "dp2" | "sf" | "trunc";
      const kind: Kind =
        tier === 1
          ? rng.pick(["whole", "ten", "hundred", "dp1"] as const)
          : tier === 2
            ? rng.pick(["dp1", "dp2", "ten", "whole", "dp1"] as const)
            : rng.pick(["sf", "sf", "trunc", "trunc", "dp2"] as const);
      const CTX: Record<Kind, Ctx[]> = {
        whole: [
          { what: "The mass of a sack of rice", v: "m", unit: "kg", lo: 5, hi: 25 },
          { what: "The length of a school corridor", v: "L", unit: "m", lo: 8, hi: 60 },
          { what: "The volume of water in a fish tank", v: "V", unit: "litres", lo: 20, hi: 300 },
        ],
        ten: [
          { what: "The height of an HDB block", v: "h", unit: "m", lo: 40, hi: 150 },
          { what: "The volume of water in a tank", v: "V", unit: "litres", lo: 200, hi: 990 },
          { what: "The distance Ravi cycles to school", v: "d", unit: "m", lo: 300, hi: 990 },
        ],
        hundred: [
          { what: "The length of a bridge", v: "L", unit: "m", lo: 300, hi: 2900 },
          { what: "The mass of a lorry's load", v: "M", unit: "kg", lo: 1000, hi: 9000 },
        ],
        dp1: [
          { what: "The length of a pencil", v: "L", unit: "cm", lo: 8, hi: 19 },
          { what: "The mass of a bag of rice", v: "m", unit: "kg", lo: 1, hi: 25 },
          { what: "The length of Jun's MRT journey", v: "d", unit: "km", lo: 2, hi: 30 },
          { what: "The rainfall on a monsoon afternoon", v: "r", unit: "mm", lo: 5, hi: 80 },
        ],
        dp2: [
          { what: "Siti's time for a 100 m sprint", v: "t", unit: "s", lo: 11, hi: 19 },
          { what: "The mass of a durian", v: "w", unit: "kg", lo: 1, hi: 4 },
          { what: "The width of a phone", v: "W", unit: "cm", lo: 6, hi: 9 },
        ],
        sf: [],
        trunc: [],
      };
      let X = 52, k = 1, ctx: Ctx = CTX.dp1[1], acc = "1 decimal place";
      let truncText = "";
      if (kind === "sf") {
        // lo starts above a power of 10 (11, not 10): a value like 1.0 (2 s.f.) has a smaller
        // rounding unit just below it (0.99 is also 2 s.f.), so its lower bound is 0.995, not 0.95.
        const opts: { c: Ctx; s: number; k: number }[] = [
          { c: { what: "The mass of a durian", v: "w", unit: "kg", lo: 11, hi: 39 }, s: 2, k: 1 },
          { c: { what: "The mass of a durian", v: "w", unit: "kg", lo: 101, hi: 399 }, s: 3, k: 2 },
          { c: { what: "The thickness of a sheet of card", v: "T", unit: "mm", lo: 11, hi: 95 }, s: 2, k: 2 },
          { c: { what: "The volume of water in a tank", v: "V", unit: "litres", lo: 12, hi: 98 }, s: 2, k: -1 },
          { c: { what: "The height of an HDB block", v: "h", unit: "m", lo: 40, hi: 99 }, s: 2, k: 0 },
        ];
        const o = rng.pick(opts);
        ctx = o.c;
        k = o.k;
        X = rng.int(o.c.lo, o.c.hi); // here lo/hi are already the integer range of the s.f. digits
        acc = `${o.s} significant figures`;
      } else if (kind === "trunc") {
        const o = rng.pick([
          { v: "t", unit: "s", k: 1, lo: 100, hi: 199, text: (x: string) => `Wei Ling's stopwatch truncates times to 1 decimal place: it chops off any further digits without rounding. It shows ${x} s for her run. Her actual time is t seconds.` },
          { v: "y", unit: "", k: 2, lo: 100, hi: 999, text: (x: string) => `A calculator truncates its answers to 2 decimal places: it chops off any further digits without rounding. It shows ${x} for an answer y.` },
          { v: "m", unit: "g", k: 0, lo: 100, hi: 999, text: (x: string) => `A kitchen scale truncates masses to a whole number of grams: it chops off any decimals without rounding. It shows ${x} g for a bag of flour of mass m grams.` },
        ]);
        k = o.k;
        X = rng.int(o.lo, o.hi);
        if (X % 10 === 0) X += 1;
        ctx = { what: "", v: o.v, unit: o.unit, lo: 0, hi: 0 };
        truncText = o.text(fx(X, k));
      } else {
        ctx = rng.pick(CTX[kind]);
        k = kind === "whole" ? 0 : kind === "ten" ? -1 : kind === "hundred" ? -2 : kind === "dp1" ? 1 : 2;
        const lo = k >= 0 ? ctx.lo * p10(k) : Math.ceil(ctx.lo / p10(-k));
        const hi = k >= 0 ? ctx.hi * p10(k) : Math.floor(ctx.hi / p10(-k));
        X = rng.int(lo, hi);
        acc = kind === "whole" ? `the nearest ${ctx.unit === "litres" ? "litre" : ctx.unit === "m" ? "metre" : ctx.unit}` : kind === "ten" ? `the nearest 10 ${ctx.unit}` : kind === "hundred" ? `the nearest 100 ${ctx.unit}` : kind === "dp1" ? "1 decimal place" : "2 decimal places";
      }
      const x = fx(X, k);
      const g = Math.max(k + 1, 0);
      const xg = X * p10(g - k);
      const half = 5 * p10(g - k - 1);
      const unitG = 2 * half; // one whole unit of the rounding, on the same grid
      const isTrunc = kind === "trunc";
      const lo = isTrunc ? xg : xg - half;
      const hi = isTrunc ? xg + unitG : xg + half;
      const loS = ft(lo, g, { ascii: true }), hiS = ft(hi, g, { ascii: true });
      const unitS = ft(1, k);
      const halfS = ft(5, k + 1);
      const u = ctx.unit ? ` ${ctx.unit}` : "";
      const unit1 = k === 0 && ctx.unit === "litres" ? " litre" : u; // "1 litre", not "1 litres"
      const v = ctx.v;
      const ask = rng.pick([
        `Write down the lower bound and the upper bound of ${v}, separated by a comma. Give the lower bound first.`,
        `Find the error interval for ${v}: give the lower bound, then the upper bound, separated by a comma.`,
      ]);
      const prompt = isTrunc ? `${truncText} ${ask}` : `${ctx.what}, ${v}${u}, is ${x}${u}, correct to ${acc}. ${ask}`;
      const interval = `{{${loS} <= ${v} < ${hiS}}}`;
      const solution = isTrunc
        ? [
            `Truncating chops digits off without rounding, so the full value starts ${x}… and can't be less than ${x}.`,
            `Even ${k > 0 ? `${x}99` : `${x}.99`} still shows as ${x}, but ${hiS} itself would show as ${fx(X + 1, k)}, so ${hiS} is not included.`,
            `Lower bound ${loS}, upper bound ${hiS}: ${interval}.`,
          ]
        : [
            (kind === "sf"
              ? `${x} to ${acc} means it was rounded to the nearest ${unitS}.`
              : kind === "dp1" || kind === "dp2"
                ? `Correct to ${acc} means to the nearest ${unitS}.`
                : `Rounding to ${acc} means the rounding unit is ${unitS}${unit1}.`) + ` Half of ${unitS} is ${halfS}.`,
            `Lower bound: ${x} − ${halfS} = ${ft(lo, g)}. Upper bound: ${x} + ${halfS} = ${ft(hi, g)}.`,
            `${ft(hi, g)} itself would round up to ${fx(X + 1, k)}, so it is not included: ${interval}.`,
          ];
      const values = [val(lo, g), val(hi, g)];
      const traps: Trap[] = [];
      listTrap(traps, [values[1], values[0]], values, "Right numbers, but give the lower bound first, then the upper bound.");
      if (isTrunc) {
        listTrap(traps, [val(xg - half, g), val(xg + half, g)], values, `That's the interval for rounding. Truncation only chops digits off, so the value can't be less than ${x}.`);
      } else {
        listTrap(traps, [val(xg - unitG, g), val(xg + unitG, g)], values, `The bounds are half a unit either side of ${x}: ± ${halfS}, not ± ${unitS}.`);
        listTrap(traps, [val(xg, g), val(xg + unitG, g)], values, `That's the interval for truncation. With rounding, values a little below ${x} also round to ${x}.`);
      }
      return {
        prompt,
        answer: { type: "list", values, ordered: true, display: `${ft(lo, g)} and ${ft(hi, g)}, so ${interval}` },
        solution,
        hint: isTrunc ? "Truncating never rounds up. What is the smallest the value could be?" : "The bounds are half a unit either side of the rounded value.",
        traps,
      };
    },
  },
];
