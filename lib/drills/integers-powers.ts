// Procedural skill drills for "Integers, Powers & Roots" (integers-powers).
// Every generator builds its numbers from integers and rejects awkward or
// ambiguous cases with bounded retry loops, so each answer is exact.
import type { Drill } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, num, br, big } from "./helpers.ts";

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

/** Try `make` up to `tries` times; return the first non-null result, else the fallback. */
function attempt<T>(make: () => T | null, fallback: T, tries = 300): T {
  for (let i = 0; i < tries; i++) {
    const r = make();
    if (r !== null) return r;
  }
  return fallback;
}

/** Operand inside {{ }} maths markup: negatives in brackets (ASCII minus renders as −). */
function mk(n: number): string {
  return n < 0 ? `(${n})` : String(n);
}

/** Plain-text operand with thousands separators: negatives in brackets. */
function bb(n: number): string {
  return n < 0 ? `(${big(n)})` : big(n);
}

/** A power in maths markup: (−3)^2, 5^(−2). */
function pw(b: number | string, e: number): string {
  const base = typeof b === "number" && b < 0 ? `(${b})` : String(b);
  return `${base}^${e < 0 ? `(${e})` : e}`;
}

/**
 * "Write as a single power" answers must be typed as a power, so they are
 * matched as text (an expression check would also accept the unsimplified question).
 */
function powerAns(b: number, e: number): AnswerSpec {
  return { type: "text", accept: [`${b}^${e}`, `${b}^(${e})`], display: `{{${pw(b, e)}}}` };
}

/** Monomial c·v^e in maths markup / ASCII. */
function mono(c: number, v: string, e: number): string {
  return `${c === 1 ? "" : c === -1 ? "-" : c}${v}^${e}`;
}

/** Text answer for a simplified monomial c·v^e, with the usual typing variants. */
function monoAns(c: number, v: string, e: number): AnswerSpec {
  const pows = [`${v}^${e}`, `${v}^(${e})`];
  const accept =
    c === 1
      ? [...pows, ...pows.map((p) => `1${p}`)]
      : c === -1
        ? [...pows.map((p) => `-${p}`), ...pows.map((p) => `-1${p}`)]
        : pows.flatMap((p) => [`${c}${p}`, `${c}*${p}`]);
  return { type: "text", accept, display: `{{${mono(c, v, e)}}}` };
}

/** Number traps, dropping any that equal the answer (or repeat). */
function numTraps(answer: number | null, cands: Array<[number, string]>): Trap[] {
  const seen = new Set<number>(answer === null ? [] : [answer]);
  const out: Trap[] = [];
  for (const [v, feedback] of cands) {
    if (!Number.isFinite(v) || seen.has(v)) continue;
    seen.add(v);
    out.push({ spec: { type: "number", value: v }, feedback });
  }
  return out;
}

/** Integer square root (floor). */
function isqrt(n: number): number {
  let k = Math.floor(Math.sqrt(n));
  while ((k + 1) * (k + 1) <= n) k++;
  while (k * k > n) k--;
  return k;
}

/** Integer cube root (floor) for n ≥ 0. */
function icbrt(n: number): number {
  let k = Math.floor(Math.cbrt(n));
  while ((k + 1) ** 3 <= n) k++;
  while (k ** 3 > n) k--;
  return k;
}

/** Round an integer to 1 significant figure. */
function round1sf(n: number): number {
  const m = Math.abs(n);
  const p = 10 ** (String(m).length - 1);
  return Math.sign(n) * Math.round(m / p) * p;
}

/** True when n is a fair "round to 1 s.f." number: not already 1 s.f., not an exact half, and does not round up to the next power of 10. */
function nice1sf(n: number): boolean {
  const m = Math.abs(n);
  if (m < 10) return false;
  const p = 10 ** (String(m).length - 1);
  return m % p !== 0 && 2 * (m % p) !== p && Math.round(m / p) < 10;
}

const PEOPLE: Array<[string, string, string]> = [
  ["Aisha", "she", "her"],
  ["Wei Ling", "she", "her"],
  ["Arjun", "he", "his"],
  ["Priya", "she", "her"],
  ["Marcus", "he", "his"],
  ["Siti", "she", "her"],
  ["Ethan", "he", "his"],
  ["Mei", "she", "her"],
  ["Ravi", "he", "his"],
  ["Hana", "she", "her"],
  ["Jun", "he", "his"],
  ["Zara", "she", "her"],
];

const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

const COLD_CITIES = ["Harbin", "Oslo", "Helsinki", "Moscow", "Ulaanbaatar", "Montreal", "Reykjavík", "Anchorage"];
const WARM_CITIES = ["Singapore", "Bangkok", "Jakarta", "Manila", "Kuala Lumpur", "Ho Chi Minh City"];
const MILD_WINTER = ["Seoul", "Beijing", "Oslo", "Stockholm", "Helsinki"];
const VERY_COLD = ["Yakutsk", "Norilsk", "Oymyakon"];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.add-subtract-negatives",
    topicId: "integers-powers",
    title: "Add and subtract negative numbers",
    level: 1,
    guideRef: "adding-subtracting-negatives",
    generate(rng, tier) {
      type Term = { op: 1 | -1; v: number };
      const max = tier === 1 ? 12 : tier === 2 ? 30 : 75;
      const count = tier === 1 ? 2 : tier === 2 ? rng.pick([2, 3, 3]) : rng.pick([3, 4]);
      const { first, rest } = attempt<{ first: number; rest: Term[] }>(
        () => {
          const first = rng.nonZero(-max, max);
          const rest: Term[] = [];
          for (let k = 1; k < count; k++) rest.push({ op: rng.bool() ? 1 : -1, v: rng.nonZero(-max, max) });
          const ans = first + rest.reduce((s, t) => s + t.op * t.v, 0);
          const doubles = rest.filter((t) => t.v < 0).length;
          if (ans === 0) return null;
          // Something negative must be involved.
          if (first > 0 && doubles === 0 && ans > 0) return null;
          // From tier 2, always include at least one "two signs together".
          if (tier > 1 && doubles === 0) return null;
          if (tier > 1 && rest.some((t) => Math.abs(t.v) === 1)) return null;
          return { first, rest };
        },
        { first: -7, rest: [{ op: -1, v: -12 }] },
      );
      const ans = first + rest.reduce((s, t) => s + t.op * t.v, 0);
      const expr = num(first) + rest.map((t) => ` ${t.op === 1 ? "+" : "−"} ${br(t.v)}`).join("");
      const effs = rest.map((t) => t.op * t.v);
      const simple = num(first) + effs.map((e) => ` ${e < 0 ? "−" : "+"} ${num(Math.abs(e))}`).join("");
      const hasDouble = rest.some((t) => t.v < 0);
      let run = first;
      const parts: string[] = [];
      for (const e of effs) {
        const next = run + e;
        parts.push(`${num(run)} ${e < 0 ? "−" : "+"} ${num(Math.abs(e))} = ${num(next)}`);
        run = next;
      }
      const solution = [
        hasDouble
          ? `Replace each pair of signs with one sign: − (−n) becomes + n, and + (−n) becomes − n. So ${expr} = ${simple}.`
          : `There are no double signs, so think of moves on a number line, starting at ${num(first)}.`,
        `Work from left to right: ${parts.join(", then ")}.`,
        `So ${expr} = ${num(ans)}.`,
      ];
      const wrong = first + rest.reduce((s, t) => s + t.op * Math.abs(t.v), 0);
      return {
        prompt: `${rng.pick(["Work out", "Calculate", "Find the value of"])} ${expr}.`,
        answer: { type: "number", value: ans },
        solution,
        hint: "Turn any two signs side by side into one sign first, then move along a number line.",
        traps: numTraps(ans, [
          [wrong, "Watch the double signs: subtracting a negative means adding, and adding a negative means subtracting."],
        ]),
      };
    },
  },

  // 2 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.multiply-divide-negatives",
    topicId: "integers-powers",
    title: "Multiply and divide negative numbers",
    level: 1,
    guideRef: "multiplying-dividing-negatives",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? (["mul", "div"] as const) : tier === 2 ? (["mul", "div", "chain", "mixed"] as const) : (["div", "chain", "mixed", "missing"] as const),
      );
      const top = tier === 1 ? 10 : tier === 2 ? 12 : 15;
      const sgn = (lo: number, hi: number) => rng.int(lo, hi) * (rng.bool() ? 1 : -1);
      const signWord = (negs: number) =>
        `${negs} negative sign${negs === 1 ? "" : "s"} — ${negs % 2 === 0 ? "an even number, so the answer is positive" : "an odd number, so the answer is negative"}`;

      if (kind === "mul") {
        let a = sgn(2, top);
        let b = sgn(2, top);
        if (a > 0 && b > 0) {
          if (rng.bool()) a = -a;
          else b = -b;
        }
        const ans = a * b;
        const same = (a < 0) === (b < 0);
        return {
          prompt: `${rng.pick(["Work out", "Calculate"])} ${num(a)} × ${br(b)}.`,
          answer: { type: "number", value: ans },
          solution: [
            same ? "The signs are the same, so the answer is positive." : "The signs are different, so the answer is negative.",
            `${Math.abs(a)} × ${Math.abs(b)} = ${Math.abs(ans)}, so ${num(a)} × ${br(b)} = ${num(ans)}.`,
          ],
          hint: "Find the size first, then the sign: same signs give +, different signs give −.",
          traps: numTraps(ans, [[-ans, same ? "Two negatives multiply to give a positive." : "A positive times a negative gives a negative."]]),
        };
      }

      if (kind === "div") {
        // At least one of dividend / divisor is negative:
        // flip 0 → (−D) ÷ d,  flip 1 → (−D) ÷ (−d),  flip 2 → D ÷ (−d).
        const qa = rng.int(2, top);
        const da = rng.int(2, tier === 3 ? 12 : top);
        const flip = rng.int(0, 2);
        const D = flip === 2 ? qa * da : -qa * da;
        const d = flip === 0 ? da : -da;
        const ans = D / d;
        const asFrac = tier > 1 && rng.bool();
        const shown = asFrac ? `{{${mk(D)}/${mk(d)}}}` : `${num(D)} ÷ ${br(d)}`;
        const same = (D < 0) === (d < 0);
        return {
          prompt: `${rng.pick(["Work out", "Calculate"])} ${shown}.`,
          answer: { type: "number", value: ans },
          solution: [
            same ? "The signs are the same, so the answer is positive." : "The signs are different, so the answer is negative.",
            `${Math.abs(D)} ÷ ${Math.abs(d)} = ${Math.abs(ans)}, so the answer is ${num(ans)}.`,
            `Check: ${num(ans)} × ${br(d)} = ${num(D)}.`,
          ],
          hint: "Divide the sizes, then use the same sign rules as for multiplying.",
          traps: numTraps(ans, [[-ans, same ? "Dividing two negatives gives a positive." : "Dividing numbers with different signs gives a negative."]]),
        };
      }

      if (kind === "chain") {
        const k = tier === 3 && rng.bool() ? 4 : 3;
        const hi = k === 4 ? 5 : tier === 3 ? 9 : 6;
        const factors = attempt<number[]>(
          () => {
            const f = Array.from({ length: k }, () => sgn(2, hi));
            const negs = f.filter((x) => x < 0).length;
            const prod = f.reduce((s, x) => s * x, 1);
            if (negs < 2) return null;
            if (Math.abs(prod) > (tier === 2 ? 300 : 1500)) return null;
            return f;
          },
          [-2, 3, -5],
        );
        const prod = factors.reduce((s, x) => s * x, 1);
        const negs = factors.filter((x) => x < 0).length;
        const shown = factors.map((f, i) => (i === 0 ? num(f) : br(f))).join(" × ");
        return {
          prompt: `${rng.pick(["Work out", "Calculate"])} ${shown}.`,
          answer: { type: "number", value: prod },
          solution: [
            `Count the negatives: ${signWord(negs)}.`,
            `Multiply the sizes: ${factors.map((f) => Math.abs(f)).join(" × ")} = ${Math.abs(prod)}.`,
            `So ${shown} = ${num(prod)}.`,
          ],
          hint: "Count how many negative numbers are being multiplied. Is that an odd or an even number?",
          traps: numTraps(prod, [[-prod, "Count the negative signs: an even number of them gives a positive answer, an odd number gives a negative."]]),
        };
      }

      if (kind === "mixed") {
        const [a, b, c] = attempt<number[]>(
          () => {
            const a = sgn(2, 12), b = sgn(2, 12), c = sgn(2, 9);
            if ((a * b) % c !== 0) return null;
            if (a > 0 && b > 0 && c > 0) return null;
            // Avoid the trivial a × b ÷ a (the divisor just cancels one factor).
            if (Math.abs(c) === Math.abs(a) || Math.abs(c) === Math.abs(b)) return null;
            if (Math.abs((a * b) / c) < 2) return null;
            return [a, b, c];
          },
          [-6, 4, -3],
        );
        const ab = a * b;
        const ans = ab / c;
        const negs = [a, b, c].filter((x) => x < 0).length;
        return {
          prompt: `${rng.pick(["Work out", "Calculate"])} ${num(a)} × ${br(b)} ÷ ${br(c)}.`,
          answer: { type: "number", value: ans },
          solution: [
            `× and ÷ have equal priority, so work from left to right: ${num(a)} × ${br(b)} = ${num(ab)}.`,
            `Then ${num(ab)} ÷ ${br(c)} = ${num(ans)}.`,
            `Check the sign: ${signWord(negs)}.`,
          ],
          hint: "Go left to right. Do the sizes first, then count the negative signs.",
          traps: numTraps(ans, [[-ans, "Count the negative signs: an even number gives a positive answer, an odd number gives a negative."]]),
        };
      }

      // missing number (tier 3)
      const form = rng.int(0, 2);
      const r = attempt<number[]>(
        () => {
          const x = sgn(2, 12), y = sgn(2, 12);
          if (x > 0 && y > 0) return null;
          return [x, y];
        },
        [-7, 6],
      );
      const [x, y] = r;
      let prompt: string, ans: number, solution: string[];
      if (form === 0) {
        // □ × y = x·y
        ans = x;
        prompt = `Find the missing number: □ × ${br(y)} = ${num(x * y)}.`;
        solution = [
          `Use the inverse: □ = ${num(x * y)} ÷ ${br(y)}.`,
          `${Math.abs(x * y)} ÷ ${Math.abs(y)} = ${Math.abs(x)}, and the signs are ${(x * y < 0) === (y < 0) ? "the same, so it is positive" : "different, so it is negative"}: □ = ${num(x)}.`,
          `Check: ${num(x)} × ${br(y)} = ${num(x * y)}.`,
        ];
      } else if (form === 1) {
        // (x·y) ÷ □ = x  → □ = y
        ans = y;
        prompt = `Find the missing number: ${num(x * y)} ÷ □ = ${num(x)}.`;
        solution = [
          `Use the inverse: □ = ${num(x * y)} ÷ ${br(x)}.`,
          `${Math.abs(x * y)} ÷ ${Math.abs(x)} = ${Math.abs(y)}, and the signs are ${(x * y < 0) === (x < 0) ? "the same, so it is positive" : "different, so it is negative"}: □ = ${num(y)}.`,
          `Check: ${num(x * y)} ÷ ${br(y)} = ${num(x)}.`,
        ];
      } else {
        // □ ÷ y = x → □ = x·y
        ans = x * y;
        prompt = `Find the missing number: □ ÷ ${br(y)} = ${num(x)}.`;
        solution = [
          `Use the inverse: □ = ${num(x)} × ${br(y)}.`,
          `${Math.abs(x)} × ${Math.abs(y)} = ${Math.abs(x * y)}, and the signs are ${(x < 0) === (y < 0) ? "the same, so it is positive" : "different, so it is negative"}: □ = ${num(x * y)}.`,
          `Check: ${num(x * y)} ÷ ${br(y)} = ${num(x)}.`,
        ];
      }
      return {
        prompt,
        answer: { type: "number", value: ans },
        solution,
        hint: "Use the inverse operation to undo what has been done to the box — then sort out the sign.",
        traps: numTraps(ans, [[-ans, "Right size, wrong sign — put your answer back into the box and check the sign rules."]]),
      };
    },
  },

  // 3 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.powers-roots-of-negatives",
    topicId: "integers-powers",
    title: "Squares, cubes and roots — including negatives",
    level: 1,
    guideRef: "squares-cubes-roots",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1
          ? (["negSq", "sqrt", "negCube", "cbrtNeg"] as const)
          : tier === 2
            ? (["negSq", "minusSq", "sqrt", "negCube", "cbrtNeg", "negPow"] as const)
            : (["minusSq", "negCube", "cbrtNeg", "negPow", "sqrt", "combo", "combo"] as const),
      );
      const sqMax = tier === 1 ? 12 : tier === 2 ? 15 : 20;
      const cuMax = tier === 1 ? 5 : tier === 2 ? 6 : 10;
      const verb = rng.pick(["Work out", "Find the value of", "Calculate"]);

      if (kind === "negSq") {
        const a = rng.int(2, sqMax);
        return {
          prompt: `${verb} {{(-${a})^2}}.`,
          answer: { type: "number", value: a * a },
          solution: [`{{(-${a})^2 = (-${a}) * (-${a})}}`, `A negative times a negative is positive, so the answer is ${a * a}.`],
          hint: "Write it as a multiplication. What sign does negative × negative give?",
          traps: numTraps(a * a, [[-a * a, `(−${a}) × (−${a}): a negative times a negative is positive.`], [-2 * a, "Squaring means multiplying by itself, not doubling."]]),
        };
      }
      if (kind === "minusSq") {
        const a = rng.int(2, sqMax);
        return {
          prompt: `${verb} {{-${a}^2}}.`,
          answer: { type: "number", value: -a * a },
          solution: [
            `There are no brackets, so only the ${a} is squared: {{${a}^2 = ${a * a}}}.`,
            `Then apply the minus sign: {{-${a}^2 = -(${a}^2) = -${a * a}}}.`,
            `Compare: {{(-${a})^2 = ${a * a}}} — the brackets make the difference.`,
          ],
          hint: "Is the minus sign inside a bracket? If not, the power belongs to the number only.",
          traps: numTraps(-a * a, [[a * a, `Without brackets, the square applies to the ${a} only: {{-${a}^2}} means {{-(${a} * ${a})}}.`]]),
        };
      }
      if (kind === "sqrt") {
        const a = rng.int(tier === 1 ? 2 : 4, tier === 1 ? 15 : sqMax);
        const negOutside = tier === 3 && rng.bool();
        const ans = negOutside ? -a : a;
        return {
          prompt: `${verb} {{${negOutside ? "-" : ""}sqrt(${a * a})}}.`,
          answer: { type: "number", value: ans },
          solution: [
            `{{${a}^2 = ${a * a}}}, so {{sqrt(${a * a}) = ${a}}}.`,
            ...(negOutside ? [`The minus sign is outside the root, so the answer is ${num(-a)}.`] : [`The √ sign means the positive square root, so the answer is ${a}.`]),
          ],
          hint: "Which number multiplied by itself gives the number under the root?",
          traps: numTraps(ans, [[(negOutside ? -1 : 1) * ((a * a) / 2), "A square root is not half of the number. Which number times itself gives it?"]]),
        };
      }
      if (kind === "negCube") {
        const a = rng.int(2, cuMax);
        const c = a ** 3;
        return {
          prompt: `${verb} {{(-${a})^3}}.`,
          answer: { type: "number", value: -c },
          solution: [
            `{{(-${a})^3 = (-${a}) * (-${a}) * (-${a})}}`,
            `{{(-${a}) * (-${a}) = ${a * a}}}, then {{${a * a} * (-${a}) = -${c}}}.`,
            `Three negatives multiplied give a negative: ${num(-c)}.`,
          ],
          hint: "Multiply two of them first, then the third. Watch the sign at each step.",
          traps: numTraps(-c, [[c, "Three negatives multiplied give a negative answer."], [-3 * a, "Cubing means multiplying the number by itself three times, not multiplying by 3."]]),
        };
      }
      if (kind === "cbrtNeg") {
        const a = rng.int(2, cuMax);
        const c = a ** 3;
        return {
          prompt: `${verb} {{cbrt(-${c})}}.`,
          answer: { type: "number", value: -a },
          solution: [
            `Which number cubes to {{-${c}}}? Try a negative number: {{(-${a})^3 = -${c}}}.`,
            `So {{cbrt(-${c}) = -${a}}}.`,
          ],
          hint: "A cube root of a negative number does exist. Which number, cubed, gives this?",
          traps: numTraps(-a, [[a, `{{${a}^3 = ${c}}}, which is positive. You need a number whose cube is {{-${c}}}.`]]),
        };
      }
      if (kind === "negPow") {
        const [b, e] = rng.pick([
          [-1, rng.int(9, 25)],
          [-2, rng.int(4, 7)],
          [-3, rng.int(3, 4)],
          [-10, rng.int(3, 5)],
        ] as Array<[number, number]>);
        const ans = b ** e;
        return {
          prompt: `${verb} {{(${b})^${e}}}.`,
          answer: { type: "number", value: ans },
          solution: [
            `The index ${e} is ${e % 2 === 0 ? "even, so the negatives pair up and the answer is positive" : "odd, so one negative is left over and the answer is negative"}.`,
            `{{${-b}^${e} = ${Math.abs(ans)}}}, so {{(${b})^${e} = ${ans}}}.`,
          ],
          hint: "Pair up the negative signs. Is there one left over?",
          traps: numTraps(ans, [[-ans, "An even power of a negative number is positive; an odd power is negative."]]),
        };
      }
      // combo (tier 3)
      type Combo = { shown: string; ans: number; wrong: number; solution: string[]; fb: string };
      const form = rng.int(0, 3);
      const cq = attempt<Combo>(
        () => {
          const a = rng.int(2, 9), b = rng.int(2, 5);
          let r: Combo;
          if (form === 0) {
            const ans = a * a - b ** 3;
            r = {
              shown: `(-${a})^2 + (-${b})^3`,
              ans,
              wrong: a * a + b ** 3,
              solution: [`{{(-${a})^2 = ${a * a}}} and {{(-${b})^3 = -${b ** 3}}}.`, `${a * a} + (−${b ** 3}) = ${num(ans)}`],
              fb: `{{(-${b})^3}} is negative: an odd number of negatives multiplied.`,
            };
          } else if (form === 1) {
            const ans = -a * a - b * b;
            r = {
              shown: `-${a}^2 - (-${b})^2`,
              ans,
              wrong: a * a - b * b,
              solution: [`{{-${a}^2 = -${a * a}}} (no brackets, so only the ${a} is squared).`, `{{(-${b})^2 = ${b * b}}}.`, `−${a * a} − ${b * b} = ${num(ans)}`],
              fb: `{{-${a}^2}} has no brackets, so it is {{-(${a}^2) = -${a * a}}}.`,
            };
          } else if (form === 2) {
            const ans = -(b ** 3) + a;
            r = {
              shown: `(-${b})^3 - cbrt(-${a ** 3})`,
              ans,
              wrong: -(b ** 3) - a,
              solution: [`{{(-${b})^3 = -${b ** 3}}} and {{cbrt(-${a ** 3}) = -${a}}}.`, `−${b ** 3} − (−${a}) = −${b ** 3} + ${a} = ${num(ans)}`],
              fb: `{{cbrt(-${a ** 3}) = -${a}}}, and subtracting a negative means adding.`,
            };
          } else {
            const rt = rng.int(4, 12);
            const ans = rt - b * b;
            r = {
              shown: `sqrt(${rt * rt}) - (-${b})^2`,
              ans,
              wrong: rt + b * b,
              solution: [`{{sqrt(${rt * rt}) = ${rt}}} and {{(-${b})^2 = ${b * b}}}.`, `${rt} − ${b * b} = ${num(ans)}`],
              fb: `{{(-${b})^2 = ${b * b}}} is positive, so you subtract ${b * b}.`,
            };
          }
          return r.ans === 0 || r.ans === r.wrong ? null : r;
        },
        {
          shown: "(-6)^2 + (-3)^3",
          ans: 9,
          wrong: 63,
          solution: ["{{(-6)^2 = 36}} and {{(-3)^3 = -27}}.", "36 + (−27) = 9"],
          fb: "{{(-3)^3}} is negative: an odd number of negatives multiplied.",
        },
      );
      return {
        prompt: `${verb} {{${cq.shown}}}.`,
        answer: { type: "number", value: cq.ans },
        solution: cq.solution,
        hint: "Work out each power or root on its own first, sign included, then combine.",
        traps: numTraps(cq.ans, [[cq.wrong, cq.fb]]),
      };
    },
  },

  // 4 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.index-notation-zero-power",
    topicId: "integers-powers",
    title: "Index notation and the power zero",
    level: 1,
    guideRef: "index-laws",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? (["eval", "eval", "zero", "write"] as const) : tier === 2 ? (["eval", "zero2", "write2", "combo"] as const) : (["combo", "zero3", "write2", "eval"] as const),
      );

      if (kind === "eval") {
        const pool: Array<[number, number]> =
          tier === 1
            ? [[2, 3], [2, 4], [2, 5], [2, 6], [3, 2], [3, 3], [3, 4], [4, 2], [4, 3], [5, 2], [5, 3], [6, 2], [7, 2], [8, 2], [9, 2], [10, 2], [10, 3], [10, 4], [10, 5], [10, 6], [11, 2], [12, 2], [1, 7], [6, 3]]
            : [[2, 7], [2, 8], [2, 9], [2, 10], [3, 5], [4, 4], [5, 4], [6, 3], [7, 3], [8, 3], [9, 3], [11, 2], [12, 2], [13, 2], [15, 2], [20, 2], [20, 3], [3, 4], [10, 7], [1, 12], [4, 5], [5, 5]];
        const [b, e] = rng.pick(pool);
        const v = b ** e;
        const written = Array(e).fill(b).join(" × ");
        return {
          prompt: `${rng.pick(["Work out", "Find the value of", "Evaluate"])} {{${b}^${e}}}.`,
          answer: { type: "number", value: v, display: big(v) },
          solution: [`{{${b}^${e}}} means ${e} lots of ${b} multiplied together: ${written}.`, `${written} = ${big(v)}`],
          hint: `The small number tells you how many ${b}s to multiply together.`,
          traps: numTraps(v, [
            [b * e, `{{${b}^${e}}} is not ${b} × ${e}: the index tells you how many ${b}s to multiply together.`],
            ...(e ** b <= 10000 ? ([[e ** b, `Check which number is the base: in {{${b}^${e}}} the base is ${b}.`]] as Array<[number, string]>) : []),
          ]),
        };
      }

      if (kind === "zero") {
        const b = rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 15, 17, 20, 25, 50, 99, 100, 365, 1000]);
        const c = b <= 12 ? b : 2;
        return {
          prompt: rng.pick([`Work out {{${b}^0}}.`, `What is the value of {{${b}^0}}?`, `Evaluate {{${b}^0}}.`]),
          answer: { type: "number", value: 1 },
          solution: [
            `Follow the pattern of powers of ${c}: {{${c}^3 = ${c ** 3}}}, {{${c}^2 = ${c * c}}}, {{${c}^1 = ${c}}} — each step down divides by ${c}.`,
            `So {{${c}^0 = ${c} ÷ ${c} = 1}}. The same happens for any non-zero base, so {{${b}^0 = 1}}.`,
          ],
          hint: "Write out the powers going down: the cube, the square, the first power … What do you divide by each time?",
          traps: numTraps(1, [
            [0, "Any non-zero number to the power 0 is 1, not 0. Follow the pattern: each step down divides by the base."],
            [b, `{{${b}^1 = ${b}}}, but {{${b}^0}} is one more step down the pattern.`],
          ]),
        };
      }

      if (kind === "zero2" || kind === "zero3") {
        const form = rng.int(0, kind === "zero2" ? 3 : 4);
        const b = rng.int(2, 15), c = rng.int(2, 9);
        let shown: string, ans: number, wrong: number, solution: string[];
        let fb = `{{${b}^0}} is 1, not 0: each step down the pattern of powers divides by ${b}, and {{${b}^1 ÷ ${b} = 1}}.`;
        if (form === 0) {
          shown = `${b}^0 + ${c}^2`;
          ans = 1 + c * c;
          wrong = c * c;
          solution = [`{{${b}^0 = 1}} and {{${c}^2 = ${c * c}}}.`, `1 + ${c * c} = ${ans}`];
        } else if (form === 1) {
          shown = `${b}^0 * ${c * 3}`;
          ans = c * 3;
          wrong = 0;
          solution = [`{{${b}^0 = 1}}.`, `1 × ${c * 3} = ${ans}`];
        } else if (form === 2) {
          shown = `(-${b})^0`;
          ans = 1;
          wrong = -1;
          fb = "Any non-zero number to the power 0 is 1 — a negative base included.";
          solution = [`Any non-zero number to the power 0 is 1 — negatives included.`, `So {{(-${b})^0 = 1}}.`];
        } else if (form === 3) {
          shown = `${c}^3 - ${b}^0`;
          ans = c ** 3 - 1;
          wrong = c ** 3;
          solution = [`{{${c}^3 = ${c ** 3}}} and {{${b}^0 = 1}}.`, `${c ** 3} − 1 = ${ans}`];
        } else {
          const d = rng.int(2, 9);
          shown = `${b}^0 + ${c}^0 + ${d}^0`;
          ans = 3;
          wrong = 0;
          solution = [`Each of {{${b}^0}}, {{${c}^0}} and {{${d}^0}} equals 1.`, `1 + 1 + 1 = 3`];
          fb = "Each power of 0 is 1, not 0.";
        }
        return {
          prompt: `${rng.pick(["Work out", "Evaluate"])} {{${shown}}}.`,
          answer: { type: "number", value: ans },
          solution,
          hint: "Anything (except 0) to the power 0 is 1. Replace those first.",
          traps: numTraps(ans, [[wrong, fb]]),
        };
      }

      if (kind === "write") {
        const b = rng.int(2, 9), n = rng.int(3, 7);
        return {
          prompt: `Write {{${Array(n).fill(b).join(" * ")}}} in index form.`,
          answer: powerAns(b, n),
          solution: [`There are ${n} lots of ${b} multiplied together.`, `So the base is ${b} and the index is ${n}: {{${b}^${n}}}.`],
          hint: "Count how many times the number appears. That count is the index.",
          traps: b === n ? [] : [{ spec: powerAns(n, b), feedback: `The base is the number being multiplied (${b}); the index counts how many there are (${n}).` }],
        };
      }

      if (kind === "write2") {
        const useLetters = rng.bool();
        const [p, q] = useLetters ? rng.pick([["a", "b"], ["x", "y"], ["m", "n"], ["p", "q"]]) : rng.pick([["2", "3"], ["2", "5"], ["3", "5"], ["2", "7"], ["3", "7"], ["5", "7"]]);
        const i = rng.int(2, 5), j = rng.int(2, 4);
        let factors = [...Array(i).fill(p), ...Array(j).fill(q)];
        if (tier === 3) factors = rng.shuffle(factors);
        const accept = useLetters
          ? [`${p}^${i}${q}^${j}`, `${p}^${i}*${q}^${j}`, `${q}^${j}${p}^${i}`, `${q}^${j}*${p}^${i}`]
          : [`${p}^${i}*${q}^${j}`, `${q}^${j}*${p}^${i}`, `${p}^${i}x${q}^${j}`, `${q}^${j}x${p}^${i}`];
        const disp = useLetters ? `${p}^${i}${q}^${j}` : `${p}^${i} * ${q}^${j}`;
        return {
          prompt: `Write {{${factors.join(" * ")}}} in index form.`,
          answer: { type: "text", accept, display: `{{${disp}}}` },
          solution: [`Count each one: there are ${i} lots of ${p} and ${j} lots of ${q}.`, `So it is {{${disp}}}.`],
          hint: `Count the factors of ${p} and the factors of ${q} separately.`,
          traps:
            i === j
              ? []
              : [
                  {
                    spec: { type: "text", accept: useLetters ? [`${p}^${j}${q}^${i}`, `${p}^${j}*${q}^${i}`, `${q}^${i}${p}^${j}`, `${q}^${i}*${p}^${j}`] : [`${p}^${j}*${q}^${i}`, `${q}^${i}*${p}^${j}`, `${p}^${j}x${q}^${i}`, `${q}^${i}x${p}^${j}`] },
                    feedback: `Recount: how many factors of ${p} are there, and how many of ${q}?`,
                  },
                ],
        };
      }

      // combo: two powers combined
      const small: Array<[number, number]> = [[2, 3], [2, 4], [2, 5], [3, 2], [3, 3], [4, 2], [5, 2], [4, 3], [5, 3], [6, 2], [7, 2], [10, 2], [10, 3], [2, 6], [3, 4], [9, 2]];
      const pick = attempt(
        () => {
          const [b1, e1] = rng.pick(small), [b2, e2] = rng.pick(small);
          if (b1 === b2) return null;
          const op = rng.pick(["+", "-", "*"] as const);
          const v1 = b1 ** e1, v2 = b2 ** e2;
          const ans = op === "+" ? v1 + v2 : op === "-" ? v1 - v2 : v1 * v2;
          if (ans === 0 || Math.abs(ans) > 2000) return null;
          return { b1, e1, b2, e2, op, v1, v2, ans };
        },
        { b1: 2, e1: 3, b2: 3, e2: 2, op: "*" as "+" | "-" | "*", v1: 8, v2: 9, ans: 72 },
      );
      const { b1, e1, b2, e2, op, v1, v2, ans } = pick;
      const glyph = op === "*" ? "×" : op === "-" ? "−" : "+";
      const w1 = b1 * e1, w2 = b2 * e2;
      const wrong = op === "+" ? w1 + w2 : op === "-" ? w1 - w2 : w1 * w2;
      return {
        prompt: `${rng.pick(["Work out", "Evaluate"])} {{${b1}^${e1} ${op} ${b2}^${e2}}}.`,
        answer: { type: "number", value: ans },
        solution: [`{{${b1}^${e1} = ${v1}}} and {{${b2}^${e2} = ${v2}}}.`, `${v1} ${glyph} ${v2} = ${num(ans)}`],
        hint: "Work out each power first (powers come before +, − and ×).",
        traps: numTraps(ans, [[wrong, `{{${b1}^${e1}}} means ${b1} multiplied by itself ${e1} times, not ${b1} × ${e1}.`]]),
      };
    },
  },

  // 5 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.negatives-in-context",
    topicId: "integers-powers",
    title: "Negative numbers in real life: temperature, depth and money",
    level: 2,
    guideRef: "adding-subtracting-negatives",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1
          ? (["change", "diff", "sea", "bank"] as const)
          : tier === 2
            ? (["change", "diff", "sea2", "gap", "bank", "bank2"] as const)
            : (["change2", "diff", "sea2", "gap", "bank2"] as const),
      );
      const [name, she, her] = rng.pick(PEOPLE);

      if (kind === "change") {
        const lim = tier === 1 ? 10 : 20;
        const { t0, d, up } = attempt(
          () => {
            const t0 = rng.nonZero(-lim, lim);
            const d = rng.int(2, tier === 1 ? 12 : 20);
            const up = rng.bool();
            const t1 = up ? t0 + d : t0 - d;
            if (t1 === 0 || t1 < -25) return null;
            if (t0 > 0 && t1 > 0) return null;
            return { t0, d, up };
          },
          { t0: -6, d: 9, up: true },
        );
        const t1 = up ? t0 + d : t0 - d;
        const city = rng.pick(COLD_CITIES);
        const [from, to] = up
          ? rng.pick([["6 am", "noon"], ["5 am", "1 pm"], ["midnight", "10 am"], ["7 am", "3 pm"]])
          : rng.pick([["noon", "midnight"], ["2 pm", "11 pm"], ["4 pm", "4 am"], ["1 pm", "10 pm"]]);
        return {
          prompt: `At ${from} the temperature in ${city} was ${num(t0)} °C. By ${to} it had ${up ? "risen" : "fallen"} by ${d} °C. What was the temperature at ${to}? Give your answer in °C.`,
          answer: { type: "number", value: t1 },
          solution: [
            `A ${up ? "rise" : "fall"} of ${d} °C means ${up ? "adding" : "subtracting"} ${d}.`,
            `${num(t0)} ${up ? "+" : "−"} ${d} = ${num(t1)}`,
            `The temperature at ${to} was ${num(t1)} °C.`,
          ],
          hint: `Sketch a vertical number line (a thermometer). Which way does a ${up ? "rise" : "fall"} move you?`,
          traps: numTraps(t1, [
            ...(up && t0 < 0 ? ([[t0 - d, "A rise moves you up the number line, towards zero — the temperature becomes less cold."]] as Array<[number, string]>) : []),
            ...(!up && t1 < 0 ? ([[-t1, "The temperature has dropped below zero, so the answer is negative."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      if (kind === "change2") {
        const { t0, d1, d2, up } = attempt(
          () => {
            const t0 = rng.nonZero(-20, 20);
            const d1 = rng.int(3, 15), d2 = rng.int(3, 15);
            const up = rng.bool();
            const t1 = up ? t0 + d1 : t0 - d1;
            const t2 = up ? t1 - d2 : t1 + d2;
            if (t1 === 0 || t2 === 0 || t2 === t0 || d1 === d2) return null;
            if (Math.min(t0, t1, t2) < -25 || Math.max(t0, t1, t2) > 30) return null;
            if (t0 > 0 && t1 > 0 && t2 > 0) return null;
            return { t0, d1, d2, up };
          },
          { t0: -8, d1: 13, d2: 17, up: true },
        );
        const t1 = up ? t0 + d1 : t0 - d1;
        const t2 = up ? t1 - d2 : t1 + d2;
        const city = rng.pick(COLD_CITIES);
        const [a, b, c] = up ? ["6 am", "2 pm", "midnight"] : ["noon", "4 am", "11 am"];
        const s1 = up ? "+" : "−", s2 = up ? "−" : "+";
        const wrong = up ? t0 - d1 + d2 : t0 + d1 - d2;
        return {
          prompt: `At ${a} the temperature in ${city} was ${num(t0)} °C. It ${up ? "rose" : "fell"} by ${d1} °C by ${b}, then ${up ? "fell" : "rose"} by ${d2} °C by ${c}. What was the temperature at ${c}? Give your answer in °C.`,
          answer: { type: "number", value: t2 },
          solution: [
            `First change: ${num(t0)} ${s1} ${d1} = ${num(t1)} °C at ${b}.`,
            `Second change: ${num(t1)} ${s2} ${d2} = ${num(t2)} °C at ${c}.`,
            `In one line: ${num(t0)} ${s1} ${d1} ${s2} ${d2} = ${num(t2)}.`,
          ],
          hint: "Write the whole journey as one calculation: start, then + for each rise and − for each fall.",
          traps: numTraps(t2, [[wrong, "Check the directions: a rise adds, a fall subtracts."]]),
        };
      }

      if (kind === "diff") {
        const both = tier > 1 && rng.bool(0.4);
        if (both) {
          const hi = -rng.int(2, 12);
          const lo = -rng.int(15, 45);
          const A = rng.pick(MILD_WINTER), B = rng.pick(VERY_COLD);
          const ans = hi - lo;
          return {
            prompt: `One winter morning it was ${num(hi)} °C in ${A} and ${num(lo)} °C in ${B}. How many degrees colder was ${B} than ${A}?`,
            answer: { type: "number", value: ans },
            solution: [
              `Difference = higher − lower = ${num(hi)} − ${br(lo)} = ${num(hi)} + ${-lo} = ${ans}.`,
              `On a number line, ${num(lo)} is ${ans} steps below ${num(hi)}.`,
              `So ${B} was ${ans} degrees colder.`,
            ],
            hint: "Both temperatures are below zero. How far apart are they on a number line?",
            traps: numTraps(ans, [[-hi - lo, `Both temperatures are below zero, so the gap is the difference between ${-lo} and ${-hi}, not their sum.`]]),
          };
        }
        const fall = tier === 1 ? rng.bool() : rng.bool(0.4);
        const hi = fall ? rng.int(1, 10) : rng.int(26, 33);
        const lo = -rng.int(2, fall ? (tier === 1 ? 10 : 15) : tier === 1 ? 12 : 25);
        const ans = hi - lo;
        const cold = rng.pick(COLD_CITIES);
        const prompt = fall
          ? `In ${cold} the temperature fell from ${hi} °C at noon to ${num(lo)} °C at midnight. By how many degrees did it fall?`
          : (() => {
              const warm = rng.pick(WARM_CITIES);
              return `On a January day it was ${hi} °C in ${warm} and ${num(lo)} °C in ${cold}. How many degrees warmer was ${warm} than ${cold}?`;
            })();
        const near = Math.abs(hi + lo);
        return {
          prompt,
          answer: { type: "number", value: ans },
          solution: [
            `Difference = higher − lower = ${hi} − ${br(lo)} = ${hi} + ${-lo}.`,
            `On a number line: from ${num(lo)} up to 0 is ${-lo} degrees, then from 0 up to ${hi} is ${hi} more.`,
            `${-lo} + ${hi} = ${ans} degrees.`,
          ],
          hint: "The gap crosses zero. How far is each temperature from 0?",
          traps: near === 0 ? [] : numTraps(ans, [[near, "The gap crosses zero: add the distance below zero to the distance above zero."]]),
        };
      }

      if (kind === "sea") {
        const { s, d, up } = attempt(
          () => {
            const s = rng.int(5, 30), d = rng.int(2, 25), up = rng.bool();
            const res = up ? -s + d : -s - d;
            if (res >= 0 || res < -40) return null;
            return { s, d, up };
          },
          { s: 18, d: 7, up: true },
        );
        const res = up ? -s + d : -s - d;
        return {
          prompt: `${name} is scuba diving at ${num(-s)} m (${s} m below sea level). ${cap(she)} ${up ? "swims up" : "dives down"} ${d} m. What is ${her} new position? Give your answer in metres, using a negative number for below sea level.`,
          answer: { type: "number", value: res },
          solution: [
            `${up ? "Up is the positive direction, so add" : "Down is the negative direction, so subtract"} ${d}.`,
            `${num(-s)} ${up ? "+" : "−"} ${d} = ${num(res)}`,
            `${cap(she)} is now at ${num(res)} m, which is ${-res} m below sea level.`,
          ],
          hint: "Treat sea level as 0, with up as positive. Which way is the diver moving?",
          traps: numTraps(res, [
            [up ? -s - d : -s + d, up ? "Swimming up moves towards the surface, so the number gets closer to zero." : "Diving down goes deeper, so the number becomes more negative."],
          ]),
        };
      }

      if (kind === "sea2") {
        const { s, u, w, upFirst } = attempt(
          () => {
            const s = rng.int(8, tier === 2 ? 30 : 38), u = rng.int(3, 20), w = rng.int(3, 25), upFirst = rng.bool();
            if (u === w) return null;
            const mid = upFirst ? -s + u : -s - w;
            const res = -s + u - w;
            if (mid >= 0 || res >= 0 || mid < -40 || res < -40) return null;
            return { s, u, w, upFirst };
          },
          { s: 18, u: 7, w: 12, upFirst: true },
        );
        const res = -s + u - w;
        const moves = upFirst ? `swims up ${u} m, then dives down ${w} m` : `dives down ${w} m, then swims up ${u} m`;
        const calc = upFirst ? `${num(-s)} + ${u} − ${w}` : `${num(-s)} − ${w} + ${u}`;
        return {
          prompt: `${name} is scuba diving at ${num(-s)} m. ${cap(she)} ${moves}. What is ${her} new position? Give your answer in metres, using a negative number for below sea level.`,
          answer: { type: "number", value: res },
          solution: [
            "Sea level is 0. Up is +, down is −.",
            `${calc} = ${num(res)}`,
            `${cap(she)} finishes at ${num(res)} m.`,
          ],
          hint: "Write the dive as one calculation: start, then + for up and − for down.",
          traps: numTraps(res, [[-s - u + w, "Check the directions: swimming up adds, diving down subtracts."]]),
        };
      }

      if (kind === "gap") {
        const [above, below, hMax, dMax] = rng.pick([
          ["A drone hovers", "a submarine", 120, 200],
          ["A seagull flies", "a diver", 80, 40],
          ["A helicopter hovers", "a submarine", 300, 250],
          ["A lighthouse lamp is", "a shipwreck on the sea bed", 60, 150],
        ] as Array<[string, string, number, number]>);
        const { h, d } = attempt(
          () => {
            const h = rng.int(5, hMax), d = rng.int(5, dMax);
            if (Math.abs(h - d) < 3) return null;
            return { h, d };
          },
          { h: 35, d: 30 },
        );
        const ans = h + d;
        return {
          prompt: `${above} ${h} m above sea level, directly above ${below} at ${num(-d)} m. What is the vertical distance between them? Give your answer in metres.`,
          answer: { type: "number", value: ans },
          solution: [
            `Distance = higher − lower = ${h} − ${br(-d)} = ${h} + ${d}.`,
            `${h} + ${d} = ${ans} m: ${h} m down to sea level, then another ${d} m below it.`,
          ],
          hint: "One is above sea level and one is below. How far is each from sea level?",
          traps: numTraps(ans, [[Math.abs(h - d), "One is above sea level and one is below, so add the two distances to sea level."]]),
        };
      }

      if (kind === "bank") {
        const B = rng.int(tier === 1 ? 10 : 20, tier === 1 ? 60 : 150);
        const S = B + rng.int(5, tier === 1 ? 40 : 90);
        const ans = B - S;
        const item = rng.pick(["concert tickets", "a new bicycle", "a pair of trainers", "a birthday present", "a school trip", "a keyboard"]);
        return {
          prompt: `${name} has $${B} in ${her} bank account. ${cap(she)} spends $${S} on ${item}. What is ${her} balance now? (A negative balance means ${she} owes the bank money.) Give your answer in dollars.`,
          answer: { type: "number", value: ans, display: `−$${-ans}` },
          solution: [
            `Spending takes money away: ${B} − ${S} = ${num(ans)}.`,
            `${cap(she)} spent $${S - B} more than ${she} had, so the balance is −$${S - B}.`,
          ],
          hint: "Start at the balance on a number line and move down by the amount spent. Do you pass zero?",
          traps: numTraps(ans, [[-ans, `${name} spent more than ${she} had, so the balance is below zero.`]]),
        };
      }

      // bank2: start overdrawn, pay in (tier 3: then spend)
      const twoStep = tier === 3;
      const { B, P, S } = attempt(
        () => {
          const B = rng.int(10, 120), P = rng.int(15, 200), S = twoStep ? rng.int(10, 90) : 0;
          const res = -B + P - S;
          if (res === 0 || P === B) return null;
          return { B, P, S };
        },
        { B: 45, P: 120, S: 0 },
      );
      const ans = -B + P - S;
      const dollars = (v: number) => (v < 0 ? `−$${-v}` : `$${v}`);
      return {
        prompt: `${name}'s bank balance is −$${B}. ${cap(she)} pays in $${P}${twoStep ? `, then spends $${S}` : ""}. What is ${her} balance now? Give your answer in dollars.`,
        answer: { type: "number", value: ans, display: dollars(ans) },
        solution: [
          `Paying in adds; spending subtracts. Start at −${B}.`,
          `${num(-B)} + ${P}${twoStep ? ` − ${S}` : ""} = ${num(ans)}`,
          `The balance is now ${dollars(ans)}.`,
        ],
        hint: "Start below zero on a number line. Paying in moves you up.",
        traps: numTraps(ans, [[-B - P - S, "Paying money in adds to the balance — move up the number line from −" + B + "."]]),
      };
    },
  },

  // 6 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.types-of-number",
    topicId: "integers-powers",
    title: "Natural numbers, integers and rational numbers",
    level: 2,
    guideRef: "types-of-number",
    generate(rng, tier) {
      type Kind = "nat" | "zero" | "negint" | "dec" | "frac" | "fracInt" | "rootInt" | "irr";
      type Item = { show: string; value: number; kind: Kind };
      const make = (k: Kind): Item => {
        switch (k) {
          case "nat": {
            const n = rng.int(1, 30);
            return { show: String(n), value: n, kind: k };
          }
          case "zero":
            return { show: "0", value: 0, kind: k };
          case "negint": {
            const n = -rng.int(1, 30);
            return { show: num(n), value: n, kind: k };
          }
          case "dec": {
            const twoDp = tier > 1 && rng.bool();
            const x = attempt(() => {
              const v = twoDp ? rng.int(-999, 999) : rng.int(-99, 99);
              return v % 10 === 0 ? null : v;
            }, 25);
            const v = twoDp ? x / 100 : x / 10;
            return { show: num(v), value: v, kind: k };
          }
          case "frac": {
            const [n, d] = attempt(() => {
              const d = rng.int(2, 9), n = rng.nonZero(-2 * d, 2 * d);
              return gcd(n, d) === 1 && n % d !== 0 ? [n, d] : null;
            }, [2, 3]);
            return { show: frac(n, d), value: n / d, kind: k };
          }
          case "fracInt": {
            const d = rng.int(2, 6), q = rng.nonZero(-9, 9);
            return { show: `{{${q < 0 ? "-" : ""}${Math.abs(q) * d}/${d}}}`, value: q, kind: k };
          }
          case "rootInt": {
            const r = rng.int(2, 12);
            return { show: `{{sqrt(${r * r})}}`, value: r, kind: k };
          }
          case "irr": {
            if (rng.bool(0.25)) return { show: "π", value: Math.PI, kind: k };
            const n = rng.pick([2, 3, 5, 6, 7, 8, 10, 11, 12, 13, 15, 17, 20, 50]);
            const neg = tier > 1 && rng.bool(0.25);
            return { show: `{{${neg ? "-" : ""}sqrt(${n})}}`, value: (neg ? -1 : 1) * Math.sqrt(n), kind: k };
          }
        }
      };
      const isInt = (it: Item) => ["nat", "zero", "negint", "fracInt", "rootInt"].includes(it.kind);
      const isNat = (it: Item) => isInt(it) && it.value > 0;
      const isRat = (it: Item) => it.kind !== "irr";
      const build = (kinds: Kind[]): Item[] =>
        attempt(
          () => {
            const items = kinds.map(make);
            const vals = items.map((i) => i.value);
            if (new Set(vals).size !== vals.length) return null;
            return rng.shuffle(items);
          },
          kinds.map(make),
        );
      const listOf = (items: Item[]) => items.map((i) => i.show).join(",   ");
      const kindQ = rng.pick(tier === 1 ? (["listInt", "listInt", "countNat", "countRat"] as const) : (["listInt", "countNat", "countRat", "countIrr"] as const));

      if (kindQ === "listInt") {
        const kinds: Kind[] = [
          "nat",
          "negint",
          rng.pick(["nat", "negint", "zero"] as Kind[]),
          "dec",
          rng.pick(["dec", "frac"] as Kind[]),
          tier === 3 ? "fracInt" : rng.pick(["frac", "negint"] as Kind[]),
        ];
        const items = build(kinds);
        const ints = items.filter(isInt);
        const nonInts = items.filter((i) => !isInt(i));
        const disguised = ints.filter((i) => i.kind === "fracInt");
        return {
          prompt: `Here is a list of numbers:\n\n${listOf(items)}\n\nWrite down all the **integers** in the list, separated by commas.`,
          answer: { type: "list", values: ints.map((i) => i.value), display: ints.map((i) => num(i.value)).join(", ") },
          solution: [
            "An integer is a whole number: positive, negative or zero.",
            `Integers: ${ints.map((i) => i.show).join(", ")}.`,
            ...(disguised.length ? [`${disguised.map((i) => `${i.show} = ${num(i.value)}`).join(" and ")}, so it is an integer in disguise.`] : []),
            `Not integers: ${nonInts.map((i) => i.show).join(", ")} — each has a part that isn't whole.`,
          ],
          hint: "Integers are whole numbers — and negative whole numbers and zero count too.",
        };
      }

      const several = (k: Kind, lo: number, hi: number): Kind[] => Array(rng.int(lo, hi)).fill(k);
      if (kindQ === "countNat") {
        const kinds: Kind[] = [
          ...several("nat", 1, 3),
          ...several("negint", 1, 2),
          ...several(rng.pick(["dec", "frac"] as Kind[]), 1, 2),
          ...(rng.bool() ? (["zero"] as Kind[]) : []),
        ];
        if (tier > 1) kinds.push("rootInt");
        if (tier === 3) kinds.push("fracInt");
        const items = build(kinds);
        const nat = items.filter(isNat);
        const hasZero = items.some((i) => i.kind === "zero");
        const disguised = nat.filter((i) => i.kind === "rootInt" || i.kind === "fracInt");
        const ans = nat.length;
        return {
          prompt: `Here are some numbers:\n\n${listOf(items)}\n\nHow many of them are **natural numbers** (the counting numbers 1, 2, 3, …)?`,
          answer: { type: "number", value: ans },
          solution: [
            "Natural numbers are the positive whole numbers 1, 2, 3, …",
            ...(disguised.length ? [`Simplify first: ${disguised.map((i) => `${i.show} = ${num(i.value)}`).join(", ")}.`] : []),
            `The natural numbers here are ${nat.map((i) => i.show).join(", ")}: that is ${ans}.`,
            ...(hasZero ? ["0 is not a counting number, so it is not natural (it is an integer)."] : []),
          ],
          hint: "Simplify anything that is a whole number in disguise, then count the positive whole numbers.",
          traps: numTraps(ans, [
            ...(disguised.length ? ([[ans - disguised.length, `${disguised[0].show} = ${num(disguised[0].value)}, which is a natural number in disguise.`]] as Array<[number, string]>) : []),
            ...(hasZero ? ([[ans + 1, "0 is not one of the counting numbers 1, 2, 3, …"]] as Array<[number, string]>) : []),
          ]),
        };
      }

      // countRat / countIrr
      const kinds: Kind[] = [
        ...several(rng.pick(["nat", "negint"] as Kind[]), 1, 2),
        ...(rng.bool(0.3) ? (["zero"] as Kind[]) : []),
        ...several(rng.pick(["dec", "frac"] as Kind[]), 1, 2),
        ...several("irr", 1, 3),
      ];
      if (tier > 1) kinds.push("rootInt");
      if (tier === 3) kinds.push(rng.pick(["fracInt", "irr", "frac"] as Kind[]));
      const items = build(kinds);
      const rat = items.filter(isRat);
      const irr = items.filter((i) => !isRat(i));
      const roots = items.filter((i) => i.kind === "rootInt");
      const intsCount = items.filter(isInt).length;
      if (kindQ === "countRat") {
        const ans = rat.length;
        return {
          prompt: `Here are some numbers:\n\n${listOf(items)}\n\nHow many of them are **rational** (can be written as a fraction {{a/b}}, where a and b are integers)?`,
          answer: { type: "number", value: ans },
          solution: [
            "Integers, terminating decimals and fractions are all rational: for example 7 = {{7/1}} and 0.3 = {{3/10}}.",
            ...(roots.length ? [`${roots.map((i) => `${i.show} = ${num(i.value)}`).join(", ")}, so ${roots.length === 1 ? "it is" : "they are"} rational too.`] : []),
            `Irrational (cannot be written as a fraction): ${irr.map((i) => i.show).join(", ")}.`,
            `So ${ans} of the numbers are rational.`,
          ],
          hint: "Square roots of square numbers are whole numbers. Only roots of non-square numbers (and π) are irrational here.",
          traps: numTraps(ans, [
            ...(roots.length ? ([[ans - roots.length, `${roots[0].show} = ${num(roots[0].value)}, which is rational.`]] as Array<[number, string]>) : []),
            [ans - intsCount, "Integers are rational too: for example 5 = {{5/1}}."],
          ]),
        };
      }
      const ans = irr.length;
      return {
        prompt: `Here are some numbers:\n\n${listOf(items)}\n\nHow many of them are **irrational** (cannot be written as a fraction of two integers)?`,
        answer: { type: "number", value: ans },
        solution: [
          "The square root of a number that is not a square number is irrational, and so is π.",
          ...(roots.length ? [`But ${roots.map((i) => `${i.show} = ${num(i.value)}`).join(", ")} — rational.`] : []),
          `Irrational: ${irr.map((i) => i.show).join(", ")}. That is ${ans}.`,
        ],
        hint: "Check every square root: is the number under it a square number?",
        traps: numTraps(ans, roots.length ? [[ans + roots.length, `${roots[0].show} = ${num(roots[0].value)}, a whole number — so it is rational.`]] : []),
      };
    },
  },

  // 7 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.order-of-operations",
    topicId: "integers-powers",
    title: "Order of operations with negatives, powers and roots",
    level: 2,
    guideRef: "order-of-operations",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? ([1, 2, 3, 4, 5, 6] as const) : tier === 2 ? ([1, 2, 3, 4, 5, 6, 9] as const) : ([3, 4, 6, 7, 8, 9] as const),
      );
      const neg = tier > 1;
      const s = (lo: number, hi: number) => (neg && rng.bool(0.4) ? -1 : 1) * rng.int(lo, hi);
      type Q = { shown: string; ans: number; wrong: number; steps: string[]; fb: string };
      const q = attempt<Q>(
        () => {
          let r: Q;
          if (kind === 1) {
            const a = s(2, 20), b = s(2, 9), c = s(2, 9);
            if (neg && a > 0 && b > 0 && c > 0) return null;
            r = {
              shown: `${a} + ${mk(b)} * ${mk(c)}`,
              ans: a + b * c,
              wrong: (a + b) * c,
              steps: [`Multiply before adding: {{${mk(b)} * ${mk(c)} = ${b * c}}}.`, `Then {{${a} + ${mk(b * c)} = ${a + b * c}}}.`],
              fb: "Multiplication comes before addition — don't just work left to right.",
            };
          } else if (kind === 2) {
            const a = s(2, 20), b = s(2, 9), c = s(2, 9);
            if (neg && a > 0 && b > 0 && c > 0) return null;
            r = {
              shown: `${a} - ${mk(b)} * ${mk(c)}`,
              ans: a - b * c,
              wrong: (a - b) * c,
              steps: [`Multiply before subtracting: {{${mk(b)} * ${mk(c)} = ${b * c}}}.`, `Then {{${a} - ${mk(b * c)} = ${a - b * c}}}.`],
              fb: "Multiplication comes before subtraction — don't just work left to right.",
            };
          } else if (kind === 3) {
            const a = s(2, 12), b = s(2, 12), c = s(2, 9);
            if (rng.bool()) {
              r = {
                shown: `(${a} + ${mk(b)}) * ${mk(c)}`,
                ans: (a + b) * c,
                wrong: a + b * c,
                steps: [`Brackets first: {{${a} + ${mk(b)} = ${a + b}}}.`, `Then {{${mk(a + b)} * ${mk(c)} = ${(a + b) * c}}}.`],
                fb: "Work out the bracket first.",
              };
            } else {
              r = {
                shown: `${c} * (${a} - ${mk(b)})`,
                ans: c * (a - b),
                wrong: c * a - b,
                steps: [`Brackets first: {{${a} - ${mk(b)} = ${a - b}}}.`, `Then {{${c} * ${mk(a - b)} = ${c * (a - b)}}}.`],
                fb: "Work out the bracket first, then multiply.",
              };
            }
            if (a + b === 0 || a - b === 0) return null;
          } else if (kind === 4) {
            const a = rng.int(2, 30), b = neg ? s(2, 9) : rng.int(2, 9);
            const minus = rng.bool();
            const base = b < 0 ? `(${b})` : `${b}`;
            r = {
              shown: `${a} ${minus ? "-" : "+"} ${base}^2`,
              ans: minus ? a - b * b : a + b * b,
              wrong: minus ? (a - b) ** 2 : (a + b) ** 2,
              steps: [`Indices before ${minus ? "subtraction" : "addition"}: {{${base}^2 = ${b * b}}}.`, `Then {{${a} ${minus ? "-" : "+"} ${b * b} = ${minus ? a - b * b : a + b * b}}}.`],
              fb: "Square first, then add or subtract — indices come before + and −.",
            };
          } else if (kind === 5) {
            const rr = rng.int(2, 10), b = rng.int(2, 16), c = rng.int(2, 9);
            r = {
              shown: `sqrt(${rr * rr}) + ${b} * ${c}`,
              ans: rr + b * c,
              wrong: (rr + b) * c,
              steps: [`Roots first: {{sqrt(${rr * rr}) = ${rr}}}.`, `Then multiply: {{${b} * ${c} = ${b * c}}}.`, `Finally add: {{${rr} + ${b * c} = ${rr + b * c}}}.`],
              fb: "Do the multiplication before the addition, even though it comes second.",
            };
          } else if (kind === 6) {
            const b = s(2, 9), qq = s(2, 9), c = s(2, 9), d = s(2, 9);
            const a = b * qq;
            if (neg && [a, b, c, d].every((v) => v > 0)) return null;
            r = {
              shown: `${a} ÷ ${mk(b)} + ${mk(c)} * ${mk(d)}`,
              ans: qq + c * d,
              wrong: (qq + c) * d,
              steps: [`Do ÷ and × first: {{${a} ÷ ${mk(b)} = ${qq}}} and {{${mk(c)} * ${mk(d)} = ${c * d}}}.`, `Then add: {{${qq} + ${mk(c * d)} = ${qq + c * d}}}.`],
              fb: "Do the division and the multiplication before the addition.",
            };
          } else if (kind === 7) {
            // fraction bar groups the top
            const sd = (rng.bool() ? -1 : 1) * rng.int(2, 6);
            const qq = s(2, 9);
            const N = sd * qq;
            const r2 = rng.int(2, 15);
            const p = N + r2;
            const t = s(1, 12);
            if (p === 0) return null;
            const wrongV = r2 % sd === 0 ? p - r2 / sd + t : NaN;
            r = {
              shown: `(${p} - ${r2})/${mk(sd)} + ${t < 0 ? `(${t})` : t}`,
              ans: qq + t,
              wrong: wrongV,
              steps: [`The fraction bar groups the top: {{${p} - ${r2} = ${N}}}.`, `Divide: {{${mk(N)} ÷ ${mk(sd)} = ${qq}}}.`, `Then {{${qq} + ${mk(t)} = ${qq + t}}}.`],
              fb: "The fraction bar acts like a bracket: work out the whole top before dividing.",
            };
          } else if (kind === 8) {
            const k = (rng.bool() ? -1 : 1) * rng.int(2, 9);
            const b = rng.int(-10, 10);
            const a = b + k;
            if (a === 0 || b === 0) return null;
            const sq = k * k;
            const divs = [2, 3, 4, 6, 9].filter((d) => sq % d === 0);
            if (!divs.length) return null;
            const c = rng.pick(divs);
            const d = s(2, 15);
            r = {
              shown: `(${a} - ${mk(b)})^2 ÷ ${c} - ${mk(d)}`,
              ans: sq / c - d,
              wrong: (2 * k) % c === 0 ? (2 * k) / c - d : NaN,
              steps: [`Brackets: {{${a} - ${mk(b)} = ${k}}}.`, `Index: {{${mk(k)}^2 = ${sq}}}.`, `Divide, then subtract: {{${sq} ÷ ${c} = ${sq / c}}}, and {{${sq / c} - ${mk(d)} = ${sq / c - d}}}.`],
              fb: "Squaring means multiplying the number by itself, not doubling it.",
            };
          } else {
            const base = -rng.int(2, 4), a = s(2, 9), b = s(2, 9);
            const cube = base ** 3;
            r = {
              shown: `(${base})^3 + ${mk(a)} * ${mk(b)}`,
              ans: cube + a * b,
              wrong: -cube + a * b,
              steps: [`Index first: {{(${base})^3 = ${cube}}} (three negatives make a negative).`, `Then {{${mk(a)} * ${mk(b)} = ${a * b}}}.`, `Finally {{${cube} + ${mk(a * b)} = ${cube + a * b}}}.`],
              fb: "A negative number cubed is negative.",
            };
          }
          if (r.ans === 0 || r.ans === r.wrong) return null;
          return r;
        },
        {
          shown: "sqrt(4) + 16 * 2",
          ans: 34,
          wrong: 36,
          steps: ["Roots first: {{sqrt(4) = 2}}.", "Then multiply: {{16 * 2 = 32}}.", "Finally add: {{2 + 32 = 34}}."],
          fb: "Do the multiplication before the addition, even though it comes second.",
        },
      );
      return {
        prompt: `${rng.pick(["Work out", "Calculate", "Evaluate"])} {{${q.shown}}}.`,
        answer: { type: "number", value: q.ans },
        solution: q.steps,
        hint: "Brackets first, then powers and roots, then × and ÷, then + and − (each pair from left to right).",
        traps: numTraps(q.ans, [[q.wrong, q.fb]]),
      };
    },
  },

  // 8 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.estimate-integer-calculations",
    topicId: "integers-powers",
    title: "Estimate calculations with negative numbers",
    level: 2,
    guideRef: "multiplying-dividing-negatives",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? (["mul", "mul", "div"] as const) : tier === 2 ? (["mul", "div"] as const) : (["mul", "div", "mixed"] as const));
      const withSign = (v: number) => (rng.bool() ? -v : v);
      /** A number that rounds to `r` (1 s.f.) but isn't r itself. */
      const near = (r: number): number => {
        const m = Math.abs(r);
        const p = 10 ** (String(m).length - 1);
        return attempt(
          () => {
            const v = m + rng.int(-Math.floor(p / 2) + 1, Math.ceil(p / 2) - 1);
            return v !== m && nice1sf(v) && round1sf(v) === m ? Math.sign(r) * v : null;
          },
          r + Math.sign(r) * Math.max(1, Math.floor(p / 5)),
        );
      };
      const ask = rng.pick([
        (e: string) => `By rounding each number to 1 significant figure, estimate ${e}.`,
        (e: string) => `Estimate ${e} by rounding each number to 1 significant figure.`,
      ]);

      if (kind === "mul") {
        const digitsA = tier === 1 ? 2 : tier === 2 ? 3 : rng.pick([3, 4]);
        const digitsB = tier === 3 && digitsA === 3 ? 3 : 2;
        const { a, b } = attempt(
          () => {
            const a = withSign(rng.int(10 ** (digitsA - 1), 10 ** digitsA - 1));
            const b = withSign(rng.int(10 ** (digitsB - 1), 10 ** digitsB - 1));
            if (a > 0 && b > 0) return null;
            if (!nice1sf(a) || !nice1sf(b)) return null;
            return { a, b };
          },
          { a: -387, b: 52 },
        );
        const ra = round1sf(a), rb = round1sf(b);
        const est = ra * rb;
        const shown = `${big(a)} × ${bb(b)}`;
        return {
          prompt: ask(shown),
          answer: { type: "number", value: est, display: big(est) },
          solution: [
            `Round to 1 significant figure: ${big(a)} ≈ ${big(ra)} and ${big(b)} ≈ ${big(rb)}.`,
            `Signs: ${(a < 0) === (b < 0) ? "same, so the answer is positive" : "different, so the answer is negative"}.`,
            `${big(ra)} × ${bb(rb)} = ${big(est)}`,
          ],
          hint: "Keep the first digit of each number and replace the rest with zeros (rounding properly), then multiply.",
          traps: numTraps(est, [
            [a * b, "That's the exact answer. Round each number to 1 significant figure first, then multiply the rounded numbers."],
            [-est, "Check the sign: same signs give a positive answer, different signs give a negative."],
          ]),
        };
      }

      if (kind === "div") {
        // Choose the rounded numbers first so that they divide exactly.
        const { rb, rq } = attempt(
          () => {
            const lb = rng.int(2, 9), lq = rng.int(1, 9);
            if (lb * lq > 9) return null;
            const rb = lb * 10 ** (tier === 3 ? rng.int(1, 2) : 1);
            const rq = lq * 10 ** (tier === 1 ? 0 : tier === 2 ? 1 : rng.int(1, 2));
            if (rq === 1) return null;
            return { rb, rq };
          },
          { rb: 30, rq: 200 },
        );
        const ra = rb * rq;
        const b = withSign(near(rb));
        const a = attempt(() => {
          const v = withSign(near(ra));
          return v > 0 && b > 0 ? null : v;
        }, -near(ra));
        const RA = Math.sign(a) * ra, RB = Math.sign(b) * rb;
        const est = RA / RB;
        const shown = `${big(a)} ÷ ${bb(b)}`;
        return {
          prompt: ask(shown),
          answer: { type: "number", value: est, display: big(est) },
          solution: [
            `Round to 1 significant figure: ${big(a)} ≈ ${big(RA)} and ${big(b)} ≈ ${big(RB)}.`,
            `Signs: ${(a < 0) === (b < 0) ? "same, so the answer is positive" : "different, so the answer is negative"}.`,
            `${big(RA)} ÷ ${bb(RB)} = ${big(est)}`,
          ],
          hint: "Round both numbers to 1 significant figure, then divide — the rounded numbers divide neatly.",
          traps: numTraps(est, [[-est, "Check the sign: same signs give a positive answer, different signs give a negative."]]),
        };
      }

      // mixed: a × b ÷ c
      const { ra, rb, rc } = attempt(
        () => {
          const ra = rng.int(1, 9) * 10 ** rng.int(1, 2);
          const rb = rng.int(1, 9) * 10;
          const rc = rng.int(1, 9) * 10;
          if (rb === 10 || rc === 10 || ra < 20) return null;
          if ((ra * rb) % rc !== 0) return null;
          const v = (ra * rb) / rc;
          if (v === ra || v === rb) return null;
          return { ra, rb, rc };
        },
        { ra: 600, rb: 50, rc: 30 },
      );
      const a = withSign(near(ra));
      const b = withSign(near(rb));
      const c = attempt(() => {
        const v = withSign(near(rc));
        return a > 0 && b > 0 && v > 0 ? null : v;
      }, -near(rc));
      const RA = Math.sign(a) * ra, RB = Math.sign(b) * rb, RC = Math.sign(c) * rc;
      const est = (RA * RB) / RC;
      const negs = [a, b, c].filter((v) => v < 0).length;
      return {
        prompt: ask(`${big(a)} × ${bb(b)} ÷ ${bb(c)}`),
        answer: { type: "number", value: est, display: big(est) },
        solution: [
          `Round to 1 significant figure: ${big(a)} ≈ ${big(RA)}, ${big(b)} ≈ ${big(RB)} and ${big(c)} ≈ ${big(RC)}.`,
          `${big(RA)} × ${bb(RB)} = ${big(RA * RB)}, then ${big(RA * RB)} ÷ ${bb(RC)} = ${big(est)}.`,
          `Check the sign: ${negs} negative${negs === 1 ? "" : "s"} — ${negs % 2 === 0 ? "even, so positive" : "odd, so negative"}.`,
        ],
        hint: "Round all three numbers to 1 significant figure. Then multiply and divide from left to right.",
        traps: numTraps(est, [[-est, "Count the negative signs: an even number gives a positive answer, an odd number gives a negative."]]),
      };
    },
  },

  // 9 ─────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.solve-squares-cubes",
    topicId: "integers-powers",
    title: "Square roots (±) and cube roots: solve x² = k and x³ = k",
    level: 2,
    guideRef: "squares-cubes-roots",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? (["sq", "sq", "both", "cube"] as const) : tier === 2 ? (["sq", "cube", "area", "both"] as const) : (["sq", "sq", "cube", "area"] as const));
      const every = "Give every possible value of x, separated by commas.";

      if (kind === "both") {
        const a = rng.int(2, tier === 1 ? 12 : 15);
        const N = a * a;
        return {
          prompt: `Write down both square roots of ${N}, separated by a comma.`,
          answer: { type: "list", values: [a, -a], display: `${a} and ${num(-a)}` },
          solution: [`{{${a}^2 = ${N}}} and {{(-${a})^2 = ${N}}} too.`, `So the square roots of ${N} are ${a} and ${num(-a)}.`],
          hint: "A negative number squared is positive as well.",
          traps: a === 2 ? [] : [{ spec: { type: "list", values: [N / 2, -N / 2] }, feedback: "A square root isn't half the number. Which number times itself gives it?" }],
        };
      }

      if (kind === "sq") {
        const useDec = tier === 3 && rng.bool(0.3);
        const k = useDec ? rng.pick([2, 3, 4, 5, 6, 7, 8, 9, 11, 12]) : rng.int(2, tier === 1 ? 12 : tier === 2 ? 15 : 20);
        const root = useDec ? k / 10 : k;
        const N = useDec ? (k * k) / 100 : k * k;
        const form = tier === 1 || useDec ? 0 : rng.int(0, 2);
        let eq: string, steps: string[];
        if (form === 0) {
          eq = `x^2 = ${N}`;
          steps = [];
        } else if (form === 1) {
          const c = rng.int(2, 30);
          const plus = rng.bool();
          eq = plus ? `x^2 + ${c} = ${N + c}` : `x^2 - ${c} = ${N - c}`;
          steps = [`${plus ? `Subtract ${c} from` : `Add ${c} to`} both sides: {{x^2 = ${N}}}.`];
        } else {
          const m = rng.int(2, 5);
          if (tier === 3 && rng.bool()) {
            const c = rng.int(2, 20);
            eq = `${m}x^2 - ${c} = ${m * N - c}`;
            steps = [`Add ${c} to both sides: {{${m}x^2 = ${m * N}}}.`, `Divide both sides by ${m}: {{x^2 = ${N}}}.`];
          } else {
            eq = `${m}x^2 = ${m * N}`;
            steps = [`Divide both sides by ${m}: {{x^2 = ${N}}}.`];
          }
        }
        const half = clean2(N / 2);
        return {
          prompt: `Solve {{${eq}}}. ${every}`,
          answer: { type: "list", values: [root, -root], display: `${num(root)} or ${num(-root)}` },
          solution: [
            ...steps,
            `Take the square root: {{${num(root)}^2 = ${N}}} and {{(-${num(root)})^2 = ${N}}}.`,
            `So x = ${num(root)} or x = ${num(-root)}.`,
          ],
          hint: "Get x² on its own, then ask: which numbers square to give that? There are two of them.",
          traps: form === 0 && half !== root ? [{ spec: { type: "list", values: [half, -half] }, feedback: "x² means x × x, not 2 × x — take the square root instead of halving." }] : [],
        };
      }

      if (kind === "cube") {
        const a = rng.int(2, tier === 1 ? 5 : tier === 2 ? 6 : 10);
        const x = tier === 1 && rng.bool(0.3) ? a : -a;
        const C = x ** 3;
        const form = tier === 1 ? 0 : rng.int(0, tier === 3 ? 2 : 1);
        let eq: string, steps: string[];
        if (form === 0) {
          eq = `x^3 = ${C}`;
          steps = [];
        } else if (form === 1) {
          const c = rng.int(2, 30);
          eq = `x^3 + ${c} = ${C + c}`;
          steps = [`Subtract ${c} from both sides: {{x^3 = ${C}}}.`];
        } else {
          const m = rng.int(2, 4);
          eq = `${m}x^3 = ${m * C}`;
          steps = [`Divide both sides by ${m}: {{x^3 = ${C}}}.`];
        }
        return {
          prompt: `Solve {{${eq}}}. ${every}`,
          answer: { type: "list", values: [x], display: num(x) },
          solution: [
            ...steps,
            `Take the cube root: {{${mk(x)}^3 = ${C}}}.`,
            `A cube root has only one value (${x < 0 ? `{{${-x}^3}} would be positive` : `{{(${-x})^3}} would be negative`}), so x = ${num(x)}.`,
          ],
          hint: "Get x³ on its own. Then think: which single number, multiplied by itself three times, gives that — including its sign?",
          traps: [
            { spec: { type: "list", values: [a, -a] }, feedback: `Only one of these works: {{${a}^3 = ${a ** 3}}} but {{(-${a})^3 = -${a ** 3}}}. A cube root has just one value.` },
            { spec: { type: "list", values: [-x] }, feedback: "Check the sign: a negative number cubed is negative, and a positive number cubed is positive." },
          ],
        };
      }

      // area context: only the positive root makes sense
      const a = rng.int(tier === 2 ? 5 : 11, tier === 2 ? 15 : 25);
      const N = a * a;
      const [thing, unit] = rng.pick([
        ["square floor tile", "cm"],
        ["square vegetable plot", "m"],
        ["square photo frame", "cm"],
        ["square courtyard", "m"],
        ["square chessboard", "cm"],
      ]);
      const quarter = N / 4;
      return {
        prompt: `A ${thing} has an area of ${big(N)} ${unit}². How long is each side? Give your answer in ${unit}.`,
        answer: { type: "number", value: a },
        solution: [
          `Side × side = ${big(N)}, so side = {{sqrt(${N})}}.`,
          `{{${a}^2 = ${N}}}, so the side is ${a} ${unit}.`,
          `{{(-${a})^2}} is also ${N}, but a length can't be negative, so only ${a} works.`,
        ],
        hint: "Which number multiplied by itself gives the area?",
        traps: quarter === a ? [] : numTraps(a, [[quarter, "Dividing the area by 4 doesn't give the side. Find the number that multiplies by itself to give the area."]]),
      };
    },
  },

  // 10 ────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.index-laws-numbers",
    topicId: "integers-powers",
    title: "Index laws with numbers: multiply, divide, power of a power",
    level: 2,
    guideRef: "index-laws",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? (["mul", "div", "mul", "div"] as const) : tier === 2 ? (["mul", "div", "pow", "missing"] as const) : (["combo", "combo", "pow", "missing"] as const),
      );
      const b = rng.pick(tier === 1 ? [2, 3, 5, 7, 10] : [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
      const hiE = tier === 1 ? 9 : 15;

      if (kind === "mul") {
        const m = rng.int(2, hiE), n = rng.int(2, hiE);
        const e = m + n;
        return {
          prompt: `Write {{${b}^${m} * ${b}^${n}}} as a single power of ${b}.`,
          answer: powerAns(b, e),
          solution: [
            `{{${b}^${m}}} is ${m} lots of ${b} and {{${b}^${n}}} is ${n} more: ${e} lots of ${b} in total.`,
            `Multiplying powers of the same base: add the indices. {{${b}^${m} * ${b}^${n} = ${b}^(${m} + ${n}) = ${b}^${e}}}`,
          ],
          hint: "Same base, multiplying: what happens to the indices?",
          traps: [
            ...(m * n !== e ? [{ spec: powerAns(b, m * n), feedback: "When you multiply powers of the same base, add the indices — don't multiply them." }] : []),
            { spec: powerAns(b * b, e), feedback: `Keep the base the same: the answer is still a power of ${b}.` },
          ],
        };
      }

      if (kind === "div") {
        const { m, n } = attempt(
          () => {
            const m = rng.int(5, hiE + 3), n = rng.int(2, m - 2);
            return { m, n };
          },
          { m: 9, n: 4 },
        );
        const e = m - n;
        const divTrap = m % n === 0 && m / n !== e;
        return {
          prompt: `Write {{${b}^${m} ÷ ${b}^${n}}} as a single power of ${b}.`,
          answer: powerAns(b, e),
          solution: [
            `${n} of the ${m} factors of ${b} on top cancel with the ${n} below, leaving ${e}.`,
            `Dividing powers of the same base: subtract the indices. {{${b}^${m} ÷ ${b}^${n} = ${b}^(${m} - ${n}) = ${b}^${e}}}`,
          ],
          hint: "Same base, dividing: what happens to the indices?",
          traps: [
            ...(divTrap ? [{ spec: powerAns(b, m / n), feedback: "When you divide powers of the same base, subtract the indices — don't divide them." }] : []),
            { spec: powerAns(b, m + n), feedback: "Dividing means subtracting the indices, not adding." },
          ],
        };
      }

      if (kind === "pow") {
        const m = rng.int(2, 7), n = rng.int(2, 5);
        const e = m * n;
        return {
          prompt: `Write {{(${b}^${m})^${n}}} as a single power of ${b}.`,
          answer: powerAns(b, e),
          solution: [
            `{{(${b}^${m})^${n}}} means ${n} lots of {{${b}^${m}}} multiplied together, so ${n} × ${m} = ${e} factors of ${b}.`,
            `Power of a power: multiply the indices. {{(${b}^${m})^${n} = ${b}^(${m} * ${n}) = ${b}^${e}}}`,
          ],
          hint: `Write it out as {{${b}^${m}}} multiplied by itself ${n} times. How many ${b}s is that?`,
          traps: m + n !== e ? [{ spec: powerAns(b, m + n), feedback: "For a power of a power, multiply the indices — you've added them." }] : [],
        };
      }

      if (kind === "missing") {
        const form = rng.int(0, 2);
        if (form === 0) {
          const m = rng.int(2, 12), k = rng.int(2, 12);
          const T = m + k;
          return {
            prompt: `{{${b}^${m} * ${b}^n = ${b}^${T}}}. Find the value of n.`,
            answer: { type: "number", value: k },
            solution: [`Multiplying adds the indices, so ${m} + n = ${T}.`, `n = ${T} − ${m} = ${k}`],
            hint: "Multiplying powers adds the indices. What do you add to the first index to get the answer's index?",
            traps: numTraps(k, [[T + m, "Work backwards: the indices add, so n is what you add to " + m + " to make " + T + "."]]),
          };
        }
        if (form === 1) {
          const r = rng.int(2, 9), k = rng.int(2, 9);
          const m = r + k;
          return {
            prompt: `{{${b}^${m} ÷ ${b}^n = ${b}^${r}}}. Find the value of n.`,
            answer: { type: "number", value: k },
            solution: [`Dividing subtracts the indices, so ${m} − n = ${r}.`, `n = ${m} − ${r} = ${k}`],
            hint: "Dividing powers subtracts the indices. What do you subtract from the first index to leave the answer's index?",
            traps: numTraps(k, [[m + r, "Dividing subtracts the indices, so n must be smaller than " + m + "."]]),
          };
        }
        const k = rng.int(2, 7), q = rng.int(2, 5);
        const T = k * q;
        return {
          prompt: `{{(${b}^n)^${q} = ${b}^${T}}}. Find the value of n.`,
          answer: { type: "number", value: k },
          solution: [`A power of a power multiplies the indices, so n × ${q} = ${T}.`, `n = ${T} ÷ ${q} = ${k}`],
          hint: "For a power of a power the indices multiply. What times the outer index gives the answer's index?",
          traps: numTraps(k, [[T - q, "For a power of a power the indices multiply, so divide: n = " + T + " ÷ " + q + "."]]),
        };
      }

      // combo (tier 3)
      const form = rng.int(0, 2);
      const r = attempt(
        () => {
          const m = rng.int(2, 12), n = rng.int(2, 12), p = rng.int(2, 15);
          let e: number, wrongE: number, shown: string, steps: string[];
          if (form === 0) {
            e = m + n - p;
            wrongE = m * n - p;
            shown = `(${b}^${m} * ${b}^${n})/${b}^${p}`;
            steps = [`Top: {{${b}^${m} * ${b}^${n} = ${b}^${m + n}}} (add the indices).`, `Divide: {{${b}^${m + n} ÷ ${b}^${p} = ${b}^${e}}} (subtract the indices).`];
          } else if (form === 1) {
            if (m > 6 || n > 5) return null;
            e = m * n - p;
            wrongE = m + n - p;
            shown = `(${b}^${m})^${n} ÷ ${b}^${p}`;
            steps = [`Power of a power: {{(${b}^${m})^${n} = ${b}^${m * n}}} (multiply the indices).`, `Divide: {{${b}^${m * n} ÷ ${b}^${p} = ${b}^${e}}} (subtract the indices).`];
          } else {
            e = m + n - p;
            wrongE = m + n + p;
            shown = `${b}^${m} * ${b}^${n} ÷ ${b}^${p}`;
            steps = [`Left to right: {{${b}^${m} * ${b}^${n} = ${b}^${m + n}}}.`, `Then {{${b}^${m + n} ÷ ${b}^${p} = ${b}^${e}}}.`];
          }
          if (e < 2 || e === wrongE) return null;
          return { e, wrongE, shown, steps };
        },
        { e: 4, wrongE: 11, shown: `(${b}^5 * ${b}^3)/${b}^4`, steps: [`Top: {{${b}^5 * ${b}^3 = ${b}^8}}.`, `Divide: {{${b}^8 ÷ ${b}^4 = ${b}^4}}.`] },
      );
      return {
        prompt: `Write {{${r.shown}}} as a single power of ${b}.`,
        answer: powerAns(b, r.e),
        solution: [...r.steps, `So the answer is {{${b}^${r.e}}}.`],
        hint: "Deal with one law at a time: × adds indices, ÷ subtracts, a power of a power multiplies.",
        traps: r.wrongE >= 0 ? [{ spec: powerAns(b, r.wrongE), feedback: "Check each step: multiplying powers adds the indices, a power of a power multiplies them, dividing subtracts." }] : [],
      };
    },
  },

  // 11 ────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.index-laws-algebra",
    topicId: "integers-powers",
    title: "Index laws with letters: simplify",
    level: 3,
    guideRef: "index-laws",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1
          ? (["mulPlain", "divPlain", "powPlain"] as const)
          : tier === 2
            ? (["mulCoef", "divCoef", "powPlain", "timesX"] as const)
            : (["powCoef", "frac", "chain", "mulCoef"] as const),
      );
      const v = rng.pick(["x", "y", "a", "b", "m", "n", "p", "t", "k"]);
      const say = rng.pick(["Simplify", "Simplify fully"]);
      // Format example in a different letter, so it can never coincide with the answer.
      const tail = ` Write your answer as a single term, like {{5${v === "x" ? "y" : "x"}^3}}.`;

      if (kind === "mulPlain") {
        const m = rng.int(2, 9), n = rng.int(2, 9);
        const e = m + n;
        return {
          prompt: `${say} {{${v}^${m} * ${v}^${n}}}.${tail}`,
          answer: monoAns(1, v, e),
          solution: [`Same base, multiplying: add the indices.`, `{{${v}^${m} * ${v}^${n} = ${v}^(${m} + ${n}) = ${v}^${e}}}`],
          hint: `How many factors of ${v} are multiplied together altogether?`,
          traps: m * n !== e ? [{ spec: monoAns(1, v, m * n), feedback: "When multiplying powers of the same letter, add the indices — don't multiply them." }] : [],
        };
      }
      if (kind === "divPlain") {
        const m = rng.int(5, 15), n = rng.int(2, m - 2);
        const e = m - n;
        const t = m % n === 0 && m / n !== e ? m / n : m + n;
        return {
          prompt: `${say} {{${v}^${m} ÷ ${v}^${n}}}.${tail}`,
          answer: monoAns(1, v, e),
          solution: [`Same base, dividing: subtract the indices.`, `{{${v}^${m} ÷ ${v}^${n} = ${v}^(${m} - ${n}) = ${v}^${e}}}`],
          hint: `${n} of the factors of ${v} on top cancel with the ${n} below. How many are left?`,
          traps: [{ spec: monoAns(1, v, t), feedback: "When dividing powers of the same letter, subtract the indices." }],
        };
      }
      if (kind === "powPlain") {
        const m = rng.int(2, 7), n = rng.int(2, 5);
        const e = m * n;
        return {
          prompt: `${say} {{(${v}^${m})^${n}}}.${tail}`,
          answer: monoAns(1, v, e),
          solution: [`{{(${v}^${m})^${n}}} is {{${v}^${m}}} multiplied by itself ${n} times.`, `Power of a power: multiply the indices. {{(${v}^${m})^${n} = ${v}^(${m} * ${n}) = ${v}^${e}}}`],
          hint: `Write out {{${v}^${m}}} ${n} times, multiplied. How many factors of ${v} is that?`,
          traps: m + n !== e ? [{ spec: monoAns(1, v, m + n), feedback: "For a power of a power, multiply the indices — you've added them." }] : [],
        };
      }
      if (kind === "timesX") {
        const n = rng.int(2, 9);
        const first = rng.bool();
        return {
          prompt: `${say} {{${first ? `${v} * ${v}^${n}` : `${v}^${n} * ${v}`}}}.${tail}`,
          answer: monoAns(1, v, n + 1),
          solution: [`A letter on its own has index 1: {{${v} = ${v}^1}}.`, `Add the indices: {{${v}^(1 + ${n}) = ${v}^${n + 1}}}.`],
          hint: `What power is a plain ${v}?`,
          traps: [{ spec: monoAns(1, v, n), feedback: `${v} on its own is {{${v}^1}}, so it adds 1 to the index.` }],
        };
      }
      if (kind === "mulCoef") {
        const { c1, c2, m, n } = attempt(
          () => {
            const c1 = (tier === 3 && rng.bool(0.4) ? -1 : 1) * rng.int(2, 9);
            const c2 = (rng.bool(0.3) ? -1 : 1) * rng.int(2, 9);
            const m = rng.int(2, 8), n = rng.int(2, 8);
            if (c1 + c2 === c1 * c2 || c1 + c2 === 0 || m * n === m + n) return null;
            return { c1, c2, m, n };
          },
          { c1: 3, c2: 5, m: 4, n: 3 },
        );
        const c = c1 * c2, e = m + n;
        return {
          prompt: `${say} {{${mono(c1, v, m)} * ${c2 < 0 ? `(${mono(c2, v, n)})` : mono(c2, v, n)}}}.${tail}`,
          answer: monoAns(c, v, e),
          solution: [
            `Multiply the numbers: ${num(c1)} × ${br(c2)} = ${num(c)}.`,
            `Multiply the powers of ${v}: add the indices, {{${v}^${m} * ${v}^${n} = ${v}^${e}}}.`,
            `So the answer is {{${mono(c, v, e)}}}.`,
          ],
          hint: `Deal with the numbers and the powers of ${v} separately.`,
          traps: [
            { spec: monoAns(c1 + c2, v, e), feedback: "Multiply the numbers in front — don't add them." },
            { spec: monoAns(c, v, m * n), feedback: "Multiply the numbers, but add the indices." },
          ],
        };
      }
      if (kind === "divCoef") {
        const { c1, c2, m, n } = attempt(
          () => {
            const c2 = rng.int(2, 6), q = rng.int(2, 9);
            const m = rng.int(5, 12), n = rng.int(2, m - 2);
            if (q === c2 * q - c2) return null;
            return { c1: c2 * q, c2, m, n };
          },
          { c1: 12, c2: 4, m: 9, n: 3 },
        );
        const c = c1 / c2, e = m - n;
        const asFrac = rng.bool();
        const shown = asFrac ? `(${mono(c1, v, m)})/(${mono(c2, v, n)})` : `${mono(c1, v, m)} ÷ ${mono(c2, v, n)}`;
        return {
          prompt: `${say} {{${shown}}}.${tail}`,
          answer: monoAns(c, v, e),
          solution: [`Divide the numbers: ${c1} ÷ ${c2} = ${c}.`, `Divide the powers of ${v}: subtract the indices, {{${v}^${m} ÷ ${v}^${n} = ${v}^${e}}}.`, `So the answer is {{${mono(c, v, e)}}}.`],
          hint: `Deal with the numbers and the powers of ${v} separately.`,
          traps: [
            ...(m % n === 0 && m / n !== e ? [{ spec: monoAns(c, v, m / n), feedback: "Divide the numbers, but subtract the indices." }] : []),
            { spec: monoAns(c1 - c2, v, e), feedback: "Divide the numbers in front — don't subtract them." },
          ],
        };
      }
      if (kind === "powCoef") {
        const [c, n] = rng.pick([[2, 2], [3, 2], [4, 2], [5, 2], [2, 3], [3, 3], [5, 3], [-2, 2], [-3, 2], [-2, 3], [-3, 3], [6, 2], [10, 2]] as Array<[number, number]>);
        const m = rng.int(2, 6);
        const C = c ** n, e = m * n;
        const inner = mono(c, v, m);
        return {
          prompt: `${say} {{(${inner})^${n}}}.${tail}`,
          answer: monoAns(C, v, e),
          solution: [
            `Everything inside the bracket is raised to the power ${n}.`,
            `Number: {{${mk(c)}^${n} = ${C}}}. Letter: {{(${v}^${m})^${n} = ${v}^${e}}}.`,
            `So the answer is {{${mono(C, v, e)}}}.`,
          ],
          hint: `Raise the number AND the ${v}-part to the power ${n}.`,
          traps: [
            ...(c !== C ? [{ spec: monoAns(c, v, e), feedback: `Raise the number to the power too: {{${mk(c)}^${n} = ${C}}}.` }] : []),
            ...(c * n !== C ? [{ spec: monoAns(c * n, v, e), feedback: `{{${mk(c)}^${n}}} means ${num(c)} multiplied by itself ${n} times, not ${num(c)} × ${n}.` }] : []),
          ],
        };
      }
      if (kind === "frac") {
        const r = attempt(
          () => {
            const c1 = rng.int(2, 9), c2 = rng.int(2, 9), c3 = rng.int(2, 12);
            const m1 = rng.int(2, 8), m2 = rng.int(2, 8), m3 = rng.int(2, 10);
            const top = c1 * c2;
            if (top % c3 !== 0) return null;
            const c = top / c3, e = m1 + m2 - m3;
            if (c < 2 || e < 2 || m1 * m2 - m3 === e) return null;
            if ((c3 === c1 && m3 === m1) || (c3 === c2 && m3 === m2)) return null;
            return { c1, c2, c3, m1, m2, m3, c, e };
          },
          { c1: 4, c2: 3, c3: 6, m1: 5, m2: 2, m3: 3, c: 2, e: 4 },
        );
        return {
          prompt: `${say} {{(${mono(r.c1, v, r.m1)} * ${mono(r.c2, v, r.m2)})/(${mono(r.c3, v, r.m3)})}}.${tail}`,
          answer: monoAns(r.c, v, r.e),
          solution: [
            `Top: {{${mono(r.c1, v, r.m1)} * ${mono(r.c2, v, r.m2)} = ${mono(r.c1 * r.c2, v, r.m1 + r.m2)}}}.`,
            `Divide: ${r.c1 * r.c2} ÷ ${r.c3} = ${r.c}, and {{${v}^${r.m1 + r.m2} ÷ ${v}^${r.m3} = ${v}^${r.e}}}.`,
            `So the answer is {{${mono(r.c, v, r.e)}}}.`,
          ],
          hint: "Simplify the top first (multiply numbers, add indices), then divide (divide numbers, subtract indices).",
          traps: r.m1 * r.m2 - r.m3 > 0 ? [{ spec: monoAns(r.c, v, r.m1 * r.m2 - r.m3), feedback: "On the top, the powers are multiplied, so add their indices." }] : [],
        };
      }
      // chain: v^a × v^b ÷ v^c
      const r = attempt(
        () => {
          const a = rng.int(2, 9), b = rng.int(2, 9), c = rng.int(2, 12);
          const e = a + b - c;
          if (e < 2 || a * b - c === e) return null;
          return { a, b, c, e };
        },
        { a: 7, b: 2, c: 4, e: 5 },
      );
      return {
        prompt: `${say} {{${v}^${r.a} * ${v}^${r.b} ÷ ${v}^${r.c}}}.${tail}`,
        answer: monoAns(1, v, r.e),
        solution: [`Multiply first (add the indices): {{${v}^${r.a} * ${v}^${r.b} = ${v}^${r.a + r.b}}}.`, `Then divide (subtract): {{${v}^${r.a + r.b} ÷ ${v}^${r.c} = ${v}^${r.e}}}.`],
        hint: "Combine the indices: + for each multiply, − for each divide.",
        traps: r.a * r.b - r.c > 0 ? [{ spec: monoAns(1, v, r.a * r.b - r.c), feedback: "Multiplying powers adds the indices — don't multiply them." }] : [],
      };
    },
  },

  // 12 ────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.estimate-roots",
    topicId: "integers-powers",
    title: "Estimate square roots and cube roots",
    level: 3,
    guideRef: "squares-cubes-roots",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? (["between", "between", "nearest"] as const) : tier === 2 ? (["between", "nearest", "cube"] as const) : (["cube", "negCube", "nearest", "between"] as const),
      );
      const sqMax = tier === 1 ? 150 : tier === 2 ? 400 : 1000;

      if (kind === "between" || kind === "nearest") {
        const n = attempt(() => {
          const n = rng.int(5, sqMax);
          const k = isqrt(n);
          return k * k === n ? null : n;
        }, 50);
        const k = isqrt(n);
        const lo = k * k, hi = (k + 1) * (k + 1);
        if (kind === "between") {
          return {
            prompt: `{{sqrt(${n})}} lies between two consecutive whole numbers. Write down the two numbers, separated by a comma.`,
            answer: { type: "list", values: [k, k + 1], display: `${k} and ${k + 1}` },
            solution: [
              `Find the square numbers either side of ${n}: {{${k}^2 = ${lo}}} and {{${k + 1}^2 = ${hi}}}.`,
              `${lo} < ${n} < ${hi}, so {{${k} < sqrt(${n}) < ${k + 1}}}.`,
            ],
            hint: `Which square numbers are just below and just above ${n}?`,
            traps: [{ spec: { type: "list", values: [lo, hi] }, feedback: `Those are the square numbers either side of ${n}. Now take their square roots.` }],
          };
        }
        const h = k * k + k + 0.25; // (k + 0.5)^2
        const ans = n < h ? k : k + 1;
        const other = ans === k ? k + 1 : k;
        return {
          prompt: `Without a calculator, find the whole number that {{sqrt(${n})}} is closest to.`,
          answer: { type: "number", value: ans },
          solution: [
            `{{${k}^2 = ${lo}}} and {{${k + 1}^2 = ${hi}}}, so {{sqrt(${n})}} is between ${k} and ${k + 1}.`,
            `Check the halfway value: {{${k}.5^2 = ${num(h)}}}.`,
            `${n} ${n < h ? "<" : ">"} ${num(h)}, so {{sqrt(${n})}} is ${n < h ? "less" : "more"} than ${k}.5 and closest to ${ans}.`,
          ],
          hint: `Find the square numbers either side of ${n}. Which one is ${n} closer to?`,
          traps: numTraps(ans, [[other, `Compare ${n} with {{${k}.5^2 = ${num(h)}}} to decide which whole number is nearer.`]]),
        };
      }

      // cube roots, positive or negative
      const cMax = tier === 2 ? 200 : 1000;
      const n = attempt(() => {
        const n = rng.int(3, cMax);
        const k = icbrt(n);
        return k ** 3 === n ? null : n;
      }, 50);
      const k = icbrt(n);
      const lo = k ** 3, hi = (k + 1) ** 3;
      if (kind === "cube") {
        return {
          prompt: `{{cbrt(${n})}} lies between two consecutive whole numbers. Write down the two numbers, separated by a comma.`,
          answer: { type: "list", values: [k, k + 1], display: `${k} and ${k + 1}` },
          solution: [`Find the cube numbers either side of ${n}: {{${k}^3 = ${lo}}} and {{${k + 1}^3 = ${hi}}}.`, `${lo} < ${n} < ${big(hi)}, so {{${k} < cbrt(${n}) < ${k + 1}}}.`],
          hint: `List the cube numbers 1, 8, 27, 64, 125, … Which two is ${n} between?`,
          traps: [{ spec: { type: "list", values: [lo, hi] }, feedback: `Those are the cube numbers either side of ${n}. Now take their cube roots.` }],
        };
      }
      return {
        prompt: `{{cbrt(-${n})}} lies between two consecutive integers. Write down the two integers, separated by a comma.`,
        answer: { type: "list", values: [-(k + 1), -k], display: `${num(-(k + 1))} and ${num(-k)}` },
        solution: [
          `{{${k}^3 = ${lo}}} and {{${k + 1}^3 = ${hi}}}, so {{cbrt(${n})}} is between ${k} and ${k + 1}.`,
          `A negative number has a negative cube root: {{(-${k})^3 = -${lo}}} and {{(-${k + 1})^3 = -${hi}}}.`,
          `So {{cbrt(-${n})}} lies between ${num(-(k + 1))} and ${num(-k)}.`,
        ],
        hint: "Find the cube root of the positive version first, then think about the sign.",
        traps: [{ spec: { type: "list", values: [k, k + 1] }, feedback: "The cube root of a negative number is negative." }],
      };
    },
  },

  // 13 ────────────────────────────────────────────────────────────────────────
  {
    id: "integers-powers.negative-indices",
    topicId: "integers-powers",
    title: "Negative indices",
    level: 3,
    guideRef: "negative-indices",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? (["toFrac", "tenDec", "toPower"] as const) : tier === 2 ? (["toFrac", "tenDec", "toPower", "combo"] as const) : (["combo", "fracBase", "toPower", "toFrac"] as const),
      );
      const pairs: Array<[number, number]> = [];
      for (const b of [2, 3, 4, 5, 6, 7, 8, 9, 11, 12]) for (let e = 1; e <= 6; e++) if (b ** e <= (tier === 1 ? 125 : 1000) && !(e === 1 && tier > 1)) pairs.push([b, e]);

      if (kind === "toFrac") {
        const [b, e] = rng.pick(pairs);
        const p = b ** e;
        return {
          prompt: `Write {{${b}^(-${e})}} as a fraction.`,
          answer: { type: "fraction", n: 1, d: p, display: `{{1/${p}}}` },
          solution: [
            `A negative index means "one over": {{${b}^(-${e}) = 1/${b}^${e}}}.`,
            `{{${b}^${e} = ${p}}}, so {{${b}^(-${e}) = 1/${p}}}.`,
          ],
          hint: `Continue the pattern {{${b}^2}}, {{${b}^1}}, {{${b}^0}}, … dividing by ${b} each time.`,
          traps: numTraps(null, [
            [-p, `A negative index doesn't make the number negative: {{${b}^(-${e})}} means {{1/${b}^${e}}}.`],
            [-b * e, "The index isn't a multiplier, and a negative index means 'one over'."],
          ]),
        };
      }
      if (kind === "tenDec") {
        const e = rng.int(1, tier === 1 ? 3 : 5);
        const v = Number(`1e-${e}`);
        return {
          prompt: `Write {{10^(-${e})}} as a decimal.`,
          answer: { type: "number", value: v, allowFraction: false },
          solution: [`{{10^(-${e}) = 1/10^${e} = 1/${10 ** e}}}.`, `As a decimal that is ${v.toFixed(e)}.`],
          hint: "Write it as a fraction with a power of 10 underneath first.",
          traps: numTraps(v, [
            [-(10 ** e), `A negative index doesn't make the number negative: {{10^(-${e}) = 1/10^${e}}}.`],
            [Number(`1e-${e + 1}`), `{{1/${10 ** e}}} = ${v.toFixed(e)}: the 1 goes in the ${["tenths", "hundredths", "thousandths", "ten-thousandths", "hundred-thousandths"][e - 1]} column.`],
          ]),
        };
      }
      if (kind === "toPower") {
        const [b, e] = rng.pick(pairs.filter(([, e]) => e >= 2));
        const p = b ** e;
        return {
          prompt: `Write {{1/${p}}} as a power of ${b}.`,
          answer: powerAns(b, -e),
          solution: [`{{${p} = ${b}^${e}}}.`, `"One over" a power gives a negative index: {{1/${b}^${e} = ${b}^(-${e})}}.`],
          hint: `First write ${p} as a power of ${b}.`,
          traps: [{ spec: powerAns(b, e), feedback: `{{${b}^${e} = ${p}}}, but you need one over ${p} — so the index is negative.` }],
        };
      }
      if (kind === "combo") {
        const b = rng.pick([2, 3, 5, 10]);
        const r = attempt(
          () => {
            const div = rng.bool();
            const m = rng.int(2, 7), n = rng.int(2, 8);
            const e = m - n; // b^m × b^(−n) and b^m ÷ b^n both give index m − n
            if (e === 0 || Math.abs(e) > 3 || b ** Math.abs(e) > 1000) return null;
            // b^m ÷ b^n with m > n never meets a negative index — only allow it when the result is negative.
            if (div && e > 0) return null;
            return { div, m, n, e };
          },
          { div: false, m: 3, n: 5, e: -2 },
        );
        const shown = r.div ? `${b}^${r.m} ÷ ${b}^${r.n}` : `${b}^${r.m} * ${b}^(-${r.n})`;
        const p = b ** Math.abs(r.e);
        const answer: AnswerSpec = r.e > 0 ? { type: "number", value: p } : { type: "fraction", n: 1, d: p, display: `{{1/${p}}}` };
        return {
          prompt: `Work out {{${shown}}}. Give your answer as a whole number or a fraction.`,
          answer,
          solution: [
            r.div ? `Subtract the indices: ${r.m} − ${r.n} = ${num(r.e)}.` : `Add the indices: ${r.m} + (−${r.n}) = ${num(r.e)}.`,
            r.e > 0 ? `{{${b}^${r.e} = ${p}}}` : `{{${b}^(${r.e}) = 1/${b}^${-r.e} = 1/${p}}}`,
          ],
          hint: "Use the index laws as normal, then deal with a negative index by writing 'one over'.",
          traps:
            r.e > 0
              ? [{ spec: { type: "fraction", n: 1, d: p }, feedback: "The index is positive here, so the answer is a whole number." }]
              : numTraps(null, [
                  [p, `The index is negative, so the answer is one over ${p}.`],
                  [-p, `A negative index means "one over", not a negative number.`],
                ]),
        };
      }
      // fracBase: (p/q)^(−e)
      const r = attempt(
        () => {
          const p = rng.int(2, 7), q = rng.int(2, 9), e = rng.int(1, 2);
          if (gcd(p, q) !== 1) return null;
          return { p, q, e };
        },
        { p: 2, q: 3, e: 2 },
      );
      const N = r.q ** r.e, D = r.p ** r.e;
      return {
        prompt: `Work out {{(${r.p}/${r.q})^(-${r.e})}}. Give your answer as a fraction.`,
        answer: { type: "fraction", n: N, d: D, display: frac(N, D) },
        solution: [
          `A negative index means "one over", which flips a fraction: {{(${r.p}/${r.q})^(-${r.e}) = (${r.q}/${r.p})^${r.e}}}.`,
          r.e === 1 ? `So the answer is ${frac(N, D)}.` : `Square the top and the bottom: {{(${r.q}/${r.p})^2 = ${N}/${D}}}.`,
        ],
        hint: "Flip the fraction to make the index positive, then apply the power.",
        traps: [
          { spec: { type: "fraction", n: D, d: N }, feedback: "A negative index means \"one over\", so flip the fraction before applying the power." },
          ...(r.e === 2 && 2 * r.p !== r.q
            ? [{ spec: { type: "fraction" as const, n: (2 * r.q) / gcd(2 * r.q, r.p), d: r.p / gcd(2 * r.q, r.p) }, feedback: "The index 2 means square the fraction, not double it." }]
            : []),
        ],
      };
    },
  },
];

/** Tidy a halved decimal (e.g. 0.49 ÷ 2) without float noise. */
function clean2(n: number): number {
  return parseFloat(n.toPrecision(12));
}
