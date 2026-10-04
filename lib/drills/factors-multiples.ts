// Procedural skill drills for "Factors, Multiples & Primes".
// Every answer is computed from integers (no floats), and every generator uses
// bounded rejection loops with a known-good default.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { gcd, lcm, primeFactors, indexForm, isPrime } from "./helpers.ts";

const T = "factors-multiples";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

/** Prime factorisation as [prime, power] pairs, primes ascending. */
type PF = Array<[number, number]>;

/** All factors of n (n ≥ 1), ascending. */
function factorsOf(n: number): number[] {
  const small: number[] = [];
  const large: number[] = [];
  for (let i = 1; i * i <= n; i++) {
    if (n % i === 0) {
      small.push(i);
      if (i * i !== n) large.unshift(n / i);
    }
  }
  return [...small, ...large];
}

function pf(n: number): PF {
  const m = new Map<number, number>();
  for (const p of primeFactors(n)) m.set(p, (m.get(p) ?? 0) + 1);
  return Array.from(m.entries());
}

function valueOf(pairs: PF): number {
  let v = 1;
  for (const [p, e] of pairs) v *= Math.pow(p, e);
  return v;
}

/** "2^3 * 3 * 5^2" (no braces); powers of 0 are skipped. */
function idx(pairs: PF): string {
  return pairs
    .filter(([, e]) => e > 0)
    .map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`))
    .join(" * ");
}

/** "{{2^2 * 3}} = 12", or just "5" when there is nothing to show. */
function showIdx(pairs: PF): string {
  const s = idx(pairs);
  const v = valueOf(pairs);
  return s === String(v) ? s : `{{${s}}} = ${v}`;
}

/** "5 × 5 × 5" for p repeated e times. */
function repeated(p: number, e: number): string {
  return Array.from({ length: e }, () => String(p)).join(" × ");
}

function joinAnd(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return items.slice(0, -1).join(", ") + " and " + items[items.length - 1];
}

function multiplesUpTo(a: number, top: number): number[] {
  const out: number[] = [];
  for (let k = a; k <= top; k += a) out.push(k);
  return out;
}

function sameMultiset(x: number[], y: number[]): boolean {
  if (x.length !== y.length) return false;
  const a = [...x].sort((p, q) => p - q);
  const b = [...y].sort((p, q) => p - q);
  return a.every((v, i) => v === b[i]);
}

/** Ladder method as text: "60 ÷ 2 = 30, 30 ÷ 2 = 15, 15 ÷ 3 = 5, and 5 is prime." (n composite) */
function ladder(n: number): string {
  const parts: string[] = [];
  let m = n;
  for (const p of primeFactors(n)) {
    if (m === p) break;
    parts.push(`${m} ÷ ${p} = ${m / p}`);
    m /= p;
  }
  return `${parts.join(", ")}, and ${m} is prime.`;
}

/** Two numbers a = h·m and b = h·n whose HCF is exactly h (m, n coprime, distinct, both ≥ 2). */
function hcfPair(rng: Rng, hMin: number, hMax: number, mMin: number, mMax: number, maxVal: number) {
  for (let i = 0; i < 300; i++) {
    const h = rng.int(hMin, hMax);
    const m = rng.int(mMin, mMax);
    const n = rng.int(mMin, mMax);
    if (m < 2 || n < 2 || m === n || gcd(m, n) !== 1) continue;
    if (h * m > maxVal || h * n > maxVal) continue;
    return { h, m, n, a: h * m, b: h * n };
  }
  const h = Math.max(2, hMin);
  return { h, m: 2, n: 3, a: 2 * h, b: 3 * h };
}

/** Power of p in a prime factorisation (0 if absent). */
function powerIn(pairs: PF, p: number): number {
  const f = pairs.find(([q]) => q === p);
  return f ? f[1] : 0;
}

export const drills: Drill[] = [
  // ---------------------------------------------------------------------------
  // 1. Factors of a number
  // ---------------------------------------------------------------------------
  {
    id: `${T}.list-factors`,
    topicId: T,
    title: "List all the factors of a number",
    level: 1,
    guideRef: "factors-multiples-primes",
    generate(rng, tier) {
      const [lo, hi, kMin, kMax]: [number, number, number, number] =
        tier === 1 ? [12, 50, 4, 8] : tier === 2 ? [40, 120, 6, 12] : [100, 240, 8, 12];
      let n = tier === 1 ? 24 : tier === 2 ? 60 : 120;
      for (let i = 0; i < 300; i++) {
        const c = rng.int(lo, hi);
        const k = factorsOf(c).length;
        if (k >= kMin && k <= kMax) {
          n = c;
          break;
        }
      }
      const fs = factorsOf(n);
      const pairs = fs.filter((f) => f * f <= n).map((f) => `${f} × ${n / f}`);
      const who = rng.pick(NAMES);
      const t = rng.int(0, 2);
      const prompt =
        t === 0
          ? `List all the factors of ${n}. Separate them with commas.`
          : t === 1
            ? `${who} wants to put ${n} chairs into equal rows with none left over (one single long row is allowed). List every possible number of chairs in a row, separated by commas.`
            : `Which whole numbers divide exactly into ${n}? List them all, separated by commas.`;
      const multiples = fs.map((_, i) => n * (i + 1));
      return {
        prompt,
        answer: { type: "list", values: fs },
        solution: [
          `Find factor pairs, starting with 1: ${pairs.join(", ")}.`,
          `After ${pairs[pairs.length - 1]} the pairs would start repeating, so stop there.`,
          `So the ${fs.length} factors of ${n} are ${fs.join(", ")}.`,
        ],
        hint: `Work in factor pairs: 1 × ${n}, then try 2, 3, 4, … until the pairs meet in the middle.`,
        traps: [
          {
            spec: { type: "list", values: multiples },
            feedback: `Those are multiples of ${n}. Factors divide INTO ${n}, so none of them is bigger than ${n}.`,
          },
        ],
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 2. Primes in a range
  // ---------------------------------------------------------------------------
  {
    id: `${T}.primes-in-range`,
    topicId: T,
    title: "Find the prime numbers in a range",
    level: 1,
    guideRef: "factors-multiples-primes",
    generate(rng, tier) {
      const less = tier === 1 && rng.bool(0.4);
      let lo = 20;
      let hi = 30;
      if (less) {
        lo = 0;
        hi = rng.int(12, 26);
      } else {
        const [a0, a1, w0, w1]: [number, number, number, number] =
          tier === 1 ? [10, 40, 8, 14] : tier === 2 ? [20, 90, 10, 20] : [100, 190, 12, 22];
        for (let i = 0; i < 300; i++) {
          const a = rng.int(a0, a1);
          const b = a + rng.int(w0, w1);
          let cnt = 0;
          for (let x = a + 1; x < b; x++) if (isPrime(x)) cnt++;
          if (!isPrime(a) && !isPrime(b) && cnt >= 2 && cnt <= 7) {
            lo = a;
            hi = b;
            break;
          }
        }
      }
      const nums: number[] = [];
      for (let x = less ? 1 : lo + 1; x < hi; x++) nums.push(x);
      const primes = nums.filter(isPrime);
      const oddComposites = nums.filter((x) => x > 1 && x % 2 === 1 && !isPrime(x));
      const sp = (x: number) => primeFactors(x)[0];
      const who = rng.pick(NAMES);
      const t = rng.int(0, 2);
      const prompt = less
        ? `List all the prime numbers less than ${hi}. Separate them with commas.`
        : t === 0
          ? `List all the prime numbers between ${lo} and ${hi}. Separate them with commas.`
          : t === 1
            ? `${who}'s locker number is a prime number between ${lo} and ${hi}. List every number it could be, separated by commas.`
            : `Which numbers between ${lo} and ${hi} have exactly two factors? List them all, separated by commas.`;
      const solution: string[] = [
        less
          ? "1 is not prime (it has only one factor), and 2 is the only even prime — every other even number has 2 as a factor."
          : "Even numbers bigger than 2 have 2 as a factor, so only the odd numbers need checking.",
      ];
      if (tier >= 2) {
        const top = hi - 1;
        const testPrimes = [2, 3, 5, 7, 11, 13].filter((p) => p * p <= top);
        const next = [3, 5, 7, 11, 13, 17].find((p) => p * p > top) ?? 17;
        solution.push(
          `You only need to test the primes ${joinAnd(testPrimes.map(String))}: a number below ${hi} that factorises must have a factor smaller than ${next}, because ${next} × ${next} = ${next * next}.`,
        );
      }
      solution.push(
        oddComposites.length
          ? `Cross out the odd numbers that factorise: ${oddComposites.map((x) => `${x} = ${sp(x)} × ${x / sp(x)}`).join(", ")}.`
          : "None of the odd numbers in this range factorise.",
      );
      solution.push(`That leaves the primes: ${primes.join(", ")}.`);
      const traps: Trap[] = [];
      if (less) {
        traps.push({ spec: { type: "list", values: [1, ...primes] }, feedback: "1 is not a prime number — a prime has exactly two factors, and 1 has only one." });
      }
      const odds = nums.filter((x) => x > 1 && x % 2 === 1);
      if (oddComposites.length > 0 && !sameMultiset(odds, primes)) {
        const c = oddComposites[0];
        traps.push({ spec: { type: "list", values: odds }, feedback: `Not every odd number is prime: ${c} = ${sp(c)} × ${c / sp(c)}.` });
      }
      return {
        prompt,
        answer: { type: "list", values: primes },
        solution,
        hint: "A prime has exactly two factors. Test each odd number for division by 3, 5, 7, 11, …",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 3. Divisibility tests
  // ---------------------------------------------------------------------------
  {
    id: `${T}.divisibility-tests`,
    topicId: T,
    title: "Use divisibility tests",
    level: 1,
    guideRef: "factors-multiples-primes",
    generate(rng, tier) {
      const yn = (b: boolean) => (b ? "✓" : "✗");
      const who = rng.pick(NAMES);
      if (tier >= 2 && rng.bool(0.4)) {
        // Missing-digit version.
        const len = tier === 2 ? 4 : 5;
        let kind = rng.pick([9, 9, 3, 6]);
        let digits: number[] = len === 4 ? [5, 2, 3, 8] : [5, 2, 3, 8, 0];
        let pos = 1;
        let d = 2;
        let ok = false;
        for (let i = 0; i < 300 && !ok; i++) {
          const ds = Array.from({ length: len }, (_, j) => (j === 0 ? rng.int(1, 9) : rng.int(0, 9)));
          const p = rng.int(1, len - (kind === 6 ? 2 : 1));
          if (kind === 6 && ds[len - 1] % 2 !== 0) continue;
          const S0 = ds.reduce((s, x, j) => (j === p ? s : s + x), 0);
          let dd: number;
          if (kind === 9) {
            dd = (9 - (S0 % 9)) % 9;
            if (dd === 0) continue; // 0 and 9 would both work — not unique
          } else {
            dd = (3 - (S0 % 3)) % 3;
          }
          ds[p] = dd;
          digits = ds;
          pos = p;
          d = dd;
          ok = true;
        }
        if (!ok) kind = 9; // default digits 5□38 / 5□380 with □ = 2 (digit sum 18)
        const n = Number(digits.join(""));
        const shown = digits.map((x, j) => (j === pos ? "□" : String(x))).join("");
        const visible = digits.filter((_, j) => j !== pos);
        const S = visible.reduce((s, x) => s + x, 0);
        const prompt =
          kind === 9
            ? `One digit of the number ${shown} is hidden by the □. The number is divisible by 9. What is the hidden digit?`
            : `${who} covers one digit of a number: ${shown}. The number is divisible by ${kind}. What is the smallest digit that could be under the □?`;
        const solution: string[] = [`Add the digits you can see: ${visible.join(" + ")} = ${S}.`];
        if (kind === 6) solution.push(`It ends in ${digits[len - 1]}, so it is even and passes the test for 2. For 6 it must also pass the test for 3.`);
        if (kind === 9) {
          solution.push(`The digit sum must be a multiple of 9. The □ adds 0 to 9, so the total is between ${S} and ${S + 9}; the only multiple of 9 there is ${S + d}. So □ = ${d}.`);
        } else {
          solution.push(`The digit sum must be a multiple of 3. The smallest multiple of 3 that is at least ${S} is ${S + d}, so the smallest digit is ${d}.`);
        }
        solution.push(`Check: ${n} = ${kind} × ${n / kind}.`);
        const traps: Trap[] = [];
        if (kind === 9) {
          const d3 = (3 - (S % 3)) % 3;
          if (d3 !== d) traps.push({ spec: { type: "number", value: d3 }, feedback: `That makes the digit sum ${S + d3}: a multiple of 3, but not of 9.` });
        } else {
          traps.push({ spec: { type: "number", value: d + 3 }, feedback: "That digit works, but a smaller one works too." });
        }
        return {
          prompt,
          answer: { type: "number", value: d },
          solution,
          hint: kind === 9 ? "Use the digit-sum test for 9." : "Use the digit-sum test for 3.",
          traps,
        };
      }
      // Which of 2, 3, 4, 5, 6, 8, 9, 10 divide n?
      const tests = [2, 3, 4, 5, 6, 8, 9, 10];
      const [lo, hi]: [number, number] = tier === 1 ? [100, 999] : tier === 2 ? [1000, 9999] : [10000, 99999];
      let n = tier === 1 ? 312 : tier === 2 ? 7362 : 43128;
      for (let i = 0; i < 300; i++) {
        const base = rng.pick([3, 4, 6, 8, 9, 12, 15, 18, 20, 24, 30, 36, 40, 45, 72, 90]);
        const c = base * rng.int(Math.ceil(lo / base), Math.floor(hi / base));
        if (c < lo || c > hi || c % 100 === 0) continue;
        if (tests.filter((t) => c % t === 0).length >= 2) {
          n = c;
          break;
        }
      }
      const divs = tests.filter((t) => n % t === 0);
      const ds = String(n).split("").map(Number);
      const s = ds.reduce((a, x) => a + x, 0);
      const last = n % 10;
      const last2 = n % 100;
      const last3 = n % 1000;
      const two = String(n).slice(-2);
      const three = String(n).slice(-3);
      const prompt =
        rng.bool()
          ? `Without doing the full division, use divisibility tests to decide which of these go exactly into ${n}:\n\n2, 3, 4, 5, 6, 8, 9, 10\n\nList all the ones that do, separated by commas.`
          : `${who} says that ${n} can be divided exactly by several of the numbers 2, 3, 4, 5, 6, 8, 9 and 10. Use divisibility tests to find which ones. List them all, separated by commas.`;
      const traps: Trap[] = [];
      const plus = (x: number) => [...divs, x].sort((p, q) => p - q);
      if (n % 2 === 0 && n % 4 !== 0) traps.push({ spec: { type: "list", values: plus(4) }, feedback: `Being even isn't enough for 4 — the last two digits (${two}) must make a multiple of 4.` });
      if (n % 3 === 0 && n % 9 !== 0) traps.push({ spec: { type: "list", values: plus(9) }, feedback: `The digit sum ${s} is a multiple of 3 but not of 9.` });
      if (n % 4 === 0 && n % 8 !== 0) traps.push({ spec: { type: "list", values: plus(8) }, feedback: `For 8, test the last three digits: ${last3} is not a multiple of 8.` });
      return {
        prompt,
        answer: { type: "list", values: divs },
        solution: [
          `Last digit ${last}: 2 ${yn(n % 2 === 0)}, 5 ${yn(n % 5 === 0)}, 10 ${yn(n % 10 === 0)}.`,
          `Last two digits ${two}: ${last2 % 4 === 0 ? `a multiple of 4 (4 × ${last2 / 4} = ${last2})` : "not a multiple of 4"}, so 4 ${yn(n % 4 === 0)}. Last three digits ${three}: ${last3 % 8 === 0 ? `a multiple of 8 (8 × ${last3 / 8} = ${last3})` : "not a multiple of 8"}, so 8 ${yn(n % 8 === 0)}.`,
          `Digit sum ${ds.join(" + ")} = ${s}: 3 ${yn(s % 3 === 0)}, 9 ${yn(s % 9 === 0)}. 6 needs both 2 and 3: 6 ${yn(n % 6 === 0)}.`,
          `So ${n} is divisible by ${joinAnd(divs.map(String))}.`,
        ],
        hint: "2, 5, 10: last digit. 4: last two digits. 8: last three digits. 3 and 9: digit sum. 6: passes 2 and 3.",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 4. Prime factorisation
  // ---------------------------------------------------------------------------
  {
    id: `${T}.prime-factorisation`,
    topicId: T,
    title: "Write a number as a product of primes",
    level: 1,
    guideRef: "prime-factorisation",
    generate(rng, tier) {
      const [lo, hi, minOmega, minDistinct]: [number, number, number, number] =
        tier === 1 ? [13, 100, 3, 2] : tier === 2 ? [100, 600, 4, 2] : [500, 3000, 5, 3];
      const allowed = tier === 1 ? [2, 3, 5, 7] : tier === 2 ? [2, 3, 5, 7, 11] : [2, 3, 5, 7, 11, 13];
      let n = tier === 1 ? 60 : tier === 2 ? 360 : 2520;
      for (let i = 0; i < 300; i++) {
        const c = rng.int(lo, hi);
        const f = primeFactors(c);
        if (!f.every((p) => allowed.includes(p))) continue;
        if (f.length < minOmega || new Set(f).size < minDistinct) continue;
        n = c;
        break;
      }
      const f = primeFactors(n);
      const pairs = pf(n);
      const form = idx(pairs);
      const who = rng.pick(NAMES);
      const check = `Check: ${pairs.map(([p, e]) => String(Math.pow(p, e))).join(" × ")} = ${n}.`;
      if (rng.bool()) {
        // Ordered powers.
        const letters = ["a", "b", "c", "d", "e", "g"].slice(0, pairs.length);
        const shape = pairs.map(([p], i) => `${p}^${letters[i]}`).join(" * ");
        const exps = pairs.map(([, e]) => e);
        const traps: Trap[] = [];
        if (exps.includes(1)) {
          traps.push({
            spec: { type: "list", values: exps.map((e) => (e === 1 ? 0 : e)), ordered: true },
            feedback: "A prime that appears once has power 1 (for example {{5 = 5^1}}), not 0.",
          });
        }
        return {
          prompt: `Write ${n} in index form as {{${shape}}}. Give the values of ${joinAnd(letters)}, in that order, separated by commas.`,
          answer: { type: "list", values: exps, ordered: true, display: `${exps.join(", ")}, so {{${n} = ${form}}}` },
          solution: [
            `Divide by primes, smallest first: ${ladder(n)}`,
            `So ${n} = ${f.join(" × ")} = {{${form}}}.`,
            `Reading off the powers: ${letters.map((l, i) => `${l} = ${exps[i]}`).join(", ")}. ${check}`,
          ],
          hint: "Divide by 2 as many times as you can, then by 3, then 5, … and count how many times each prime is used.",
          traps,
        };
      }
      const prompt =
        rng.bool()
          ? `Write ${n} as a product of its prime factors. Type the primes separated by commas, including repeats (for 12 you would type 2, 2, 3).`
          : `${who} draws a factor tree for ${n}. Which primes end up at the ends of the branches? Type them all, including repeats, separated by commas.`;
      return {
        prompt,
        answer: { type: "list", values: f, display: `${f.join(", ")}, so {{${n} = ${form}}}` },
        solution: [`Divide by primes, smallest first: ${ladder(n)}`, `So ${n} = ${f.join(" × ")} = {{${form}}}.`, check],
        hint: "Divide by the smallest prime that goes in (2, then 3, then 5 …) until what is left is prime.",
        traps: [{ spec: { type: "list", values: [1, ...f] }, feedback: "Leave out 1 — it is not prime, and multiplying by 1 changes nothing." }],
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 5. Index form → number, and finding a missing power
  // ---------------------------------------------------------------------------
  {
    id: `${T}.index-form-value`,
    topicId: T,
    title: "Work with numbers in index form",
    level: 1,
    guideRef: "prime-factorisation",
    generate(rng, tier) {
      const missing = tier >= 2 && rng.bool(0.5);
      const pool = tier === 1 ? [2, 3, 5] : tier === 2 ? [2, 3, 5, 7] : [2, 3, 5, 7, 11];
      const maxV = tier === 1 ? 200 : tier === 2 ? 2000 : 10000;
      let pairs: PF = [[2, 3], [3, 2]];
      for (let i = 0; i < 300; i++) {
        const k = tier === 1 ? 2 : tier === 2 ? rng.int(2, 3) : 3;
        const ps = rng.shuffle(pool).slice(0, k).sort((x, y) => x - y);
        const cand: PF = ps.map((p) => [p, rng.int(1, p <= 3 ? 4 : 2)]);
        const v = valueOf(cand);
        if (v > maxV || v < 20) continue;
        if (!cand.some(([, e]) => e >= 2)) continue;
        pairs = cand;
        break;
      }
      const v = valueOf(pairs);
      const form = idx(pairs);
      const who = rng.pick(NAMES);
      if (missing) {
        const j = rng.pick(pairs.map((pr, i) => (pr[1] >= 2 ? i : -1)).filter((i) => i >= 0));
        const [p, e] = pairs[j];
        const pe = Math.pow(p, e);
        const shape = pairs.map(([q, f], i) => (i === j ? `${q}^k` : f > 1 ? `${q}^${f}` : `${q}`)).join(" * ");
        const restPairs = pairs.filter((_, i) => i !== j);
        const rest = valueOf(restPairs);
        const restIdx = idx(restPairs);
        return {
          prompt: rng.bool()
            ? `{{${shape} = ${v}}}. Find the value of k.`
            : `Prime factorisations are unique, so only one whole number k makes {{${shape} = ${v}}} true. Find k.`,
          answer: { type: "number", value: e },
          solution: [
            `The other primes multiply to ${restIdx === String(rest) ? "" : `{{${restIdx}}} = `}${rest}.`,
            `So {{${p}^k}} = ${v} ÷ ${rest} = ${pe}.`,
            `${pe} = ${repeated(p, e)} = {{${p}^${e}}}, so k = ${e}.`,
          ],
          hint: `Divide ${v} by the parts you know, then ask: how many ${p}s multiply to give what is left?`,
          traps: [{ spec: { type: "number", value: pe }, feedback: `${pe} is the value of {{${p}^k}} — the question asks for the power k.` }],
        };
      }
      const t = rng.int(0, 2);
      const prompt =
        t === 0
          ? `Work out the value of {{${form}}}.`
          : t === 1
            ? `${who} wrote a number as a product of primes: {{${form}}}. What was the number?`
            : `Write {{${form}}} as an ordinary number.`;
      const powered = pairs.filter(([, e]) => e > 1);
      const traps: Trap[] = [];
      const wrong = pairs.reduce((acc, [p, e]) => acc * (e > 1 ? p * e : p), 1);
      const bad = powered.find(([p, e]) => p * e !== Math.pow(p, e));
      if (wrong !== v && bad) {
        traps.push({
          spec: { type: "number", value: wrong },
          feedback: `{{${bad[0]}^${bad[1]}}} means ${repeated(bad[0], bad[1])} = ${Math.pow(bad[0], bad[1])}, not ${bad[0]} × ${bad[1]}.`,
        });
      }
      return {
        prompt,
        answer: { type: "number", value: v },
        solution: [
          `Work out each power: ${powered.map(([p, e]) => `{{${p}^${e}}} = ${repeated(p, e)} = ${Math.pow(p, e)}`).join("; ")}.`,
          `Multiply: ${pairs.map(([p, e]) => String(Math.pow(p, e))).join(" × ")} = ${v}.`,
        ],
        hint: "A power means repeated multiplication: {{2^3}} = 2 × 2 × 2.",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 6. HCF and LCM by listing (three numbers at tier 3)
  // ---------------------------------------------------------------------------
  {
    id: `${T}.hcf-lcm-listing`,
    topicId: T,
    title: "Find the HCF or LCM",
    level: 1,
    guideRef: "hcf-lcm",
    generate(rng, tier) {
      const askH = rng.bool();
      if (tier === 3 && rng.bool(0.5)) {
        // Three numbers (stretch).
        if (askH) {
          let h = 6, m = 2, n = 3, k = 5;
          for (let i = 0; i < 300; i++) {
            const hh = rng.int(2, 12);
            const ms = rng.shuffle([2, 3, 4, 5, 6, 7, 8, 9]).slice(0, 3);
            if (gcd(gcd(ms[0], ms[1]), ms[2]) !== 1) continue;
            if (hh * Math.max(...ms) > 150) continue;
            h = hh;
            [m, n, k] = ms;
            break;
          }
          const [a, b, c] = [h * m, h * n, h * k];
          const pairs = [pf(a), pf(b), pf(c)];
          const common: PF = pf(h);
          const g2 = gcd(a, b);
          const traps: Trap[] = [];
          if (g2 !== h) traps.push({ spec: { type: "number", value: g2 }, feedback: `That's the HCF of ${a} and ${b} only — it must also divide ${c}.` });
          return {
            prompt: `Find the highest common factor (HCF) of ${a}, ${b} and ${c}.`,
            answer: { type: "number", value: h },
            solution: [
              `Prime factors: ${a} = {{${idx(pairs[0])}}}, ${b} = {{${idx(pairs[1])}}}, ${c} = {{${idx(pairs[2])}}}.`,
              `Take each prime that is in ALL three, at its lowest power: ${showIdx(common)}.`,
              `So the HCF is ${h}. Check: ${a} ÷ ${h} = ${m}, ${b} ÷ ${h} = ${n}, ${c} ÷ ${h} = ${k}.`,
            ],
            hint: "Find the prime factors of all three numbers. Which primes are shared by every one?",
            traps,
          };
        }
        let trio = [4, 9, 10];
        for (let i = 0; i < 300; i++) {
          const t3 = rng.shuffle([4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24]).slice(0, 3).sort((x, y) => x - y);
          const L3 = lcm(lcm(t3[0], t3[1]), t3[2]);
          if (L3 > 360 || L3 === t3[2] || L3 === t3[0] * t3[1] * t3[2]) continue;
          trio = t3;
          break;
        }
        const [a, b, c] = trio;
        const L = lcm(lcm(a, b), c);
        const top: PF = pf(L);
        return {
          prompt: `Find the lowest common multiple (LCM) of ${a}, ${b} and ${c}.`,
          answer: { type: "number", value: L },
          solution: [
            `Prime factors: ${a} = {{${idx(pf(a))}}}, ${b} = {{${idx(pf(b))}}}, ${c} = {{${idx(pf(c))}}}.`,
            `Take every prime that appears, at its highest power: ${showIdx(top)}.`,
            `Check: ${L} ÷ ${a} = ${L / a}, ${L} ÷ ${b} = ${L / b}, ${L} ÷ ${c} = ${L / c} — all whole numbers.`,
          ],
          hint: "Write each number as a product of primes. The LCM needs enough of each prime to cover every number.",
          traps: [{ spec: { type: "number", value: a * b * c }, feedback: "Multiplying all three gives a common multiple, but not the lowest one." }],
        };
      }
      const { h, a, b } = tier === 1 ? hcfPair(rng, 2, 6, 2, 6, 36) : tier === 2 ? hcfPair(rng, 2, 15, 2, 9, 100) : hcfPair(rng, 4, 25, 2, 9, 150);
      const L = lcm(a, b);
      const t = rng.bool();
      if (askH) {
        const fa = factorsOf(a);
        const fb = factorsOf(b);
        const common = fa.filter((x) => b % x === 0);
        return {
          prompt: t
            ? `Find the highest common factor (HCF) of ${a} and ${b}.`
            : `What is the largest whole number that divides exactly into both ${a} and ${b}?`,
          answer: { type: "number", value: h },
          solution: [
            `Factors of ${a}: ${fa.join(", ")}.`,
            `Factors of ${b}: ${fb.join(", ")}.`,
            `Common factors: ${common.join(", ")}. The highest is ${h}.`,
          ],
          hint: `List the factors of ${a} and of ${b}. Which is the biggest number in both lists?`,
          traps: [{ spec: { type: "number", value: L }, feedback: `That's the LCM. The HCF is the biggest number that goes INTO both ${a} and ${b}.` }],
        };
      }
      const ma = multiplesUpTo(a, L);
      const mb = multiplesUpTo(b, L);
      return {
        prompt: t
          ? `Find the lowest common multiple (LCM) of ${a} and ${b}.`
          : `What is the smallest positive whole number that is a multiple of both ${a} and ${b}?`,
        answer: { type: "number", value: L },
        solution: [
          `Multiples of ${a}: ${ma.join(", ")}, …`,
          `Multiples of ${b}: ${mb.join(", ")}, …`,
          `The first number in both lists is ${L}, so the LCM is ${L}.`,
        ],
        hint: `Count up in ${Math.max(a, b)}s and stop at the first one that ${Math.min(a, b)} also goes into.`,
        traps: [
          { spec: { type: "number", value: a * b }, feedback: `${a} × ${b} is a common multiple, but not the lowest one.` },
          { spec: { type: "number", value: h }, feedback: `That's the HCF. The LCM is a multiple of both, so it is at least as big as ${Math.max(a, b)}.` },
        ],
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 7. HCF and LCM from prime factors (Venn diagram); algebraic terms at tier 3
  // ---------------------------------------------------------------------------
  {
    id: `${T}.hcf-lcm-prime-factors`,
    topicId: T,
    title: "HCF and LCM using prime factors",
    level: 2,
    guideRef: "hcf-lcm",
    generate(rng, tier) {
      const askH = rng.bool();
      const word = askH ? "HCF" : "LCM";
      if (tier === 3 && rng.bool(0.5)) {
        // Algebraic terms (stretch).
        const coefs = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 24, 27, 28, 30, 36];
        let c1 = 12, c2 = 18, x1 = 2, y1 = 1, x2 = 1, y2 = 3;
        for (let i = 0; i < 300; i++) {
          const [p, q] = rng.shuffle(coefs).slice(0, 2);
          const [a1, b1, a2, b2] = [rng.int(1, 3), rng.int(1, 3), rng.int(1, 3), rng.int(1, 3)];
          if (gcd(p, q) < 2 || (a1 === a2 && b1 === b2)) continue;
          [c1, c2, x1, y1, x2, y2] = [p, q, a1, b1, a2, b2];
          break;
        }
        const pw = (v: string, e: number) => (e === 1 ? v : `${v}^${e}`);
        const termShow = (c: number, x: number, y: number) => `${c}${pw("a", x)} ${pw("b", y)}`;
        const termExpr = (c: number, x: number, y: number) => `${c}${pw("a", x)}*${pw("b", y)}`;
        const g = gcd(c1, c2);
        const l = lcm(c1, c2);
        const [lx, ly, hx, hy] = [Math.min(x1, x2), Math.min(y1, y2), Math.max(x1, x2), Math.max(y1, y2)];
        const H = { expr: termExpr(g, lx, ly), show: termShow(g, lx, ly) };
        const Lm = { expr: termExpr(l, hx, hy), show: termShow(l, hx, hy) };
        const ans = askH ? H : Lm;
        const other = askH ? Lm : H;
        const traps: Trap[] = [{ spec: { type: "expression", expr: other.expr }, feedback: askH ? "That's the LCM. For the HCF use the HCF of the numbers and the LOWER power of each letter." : "That's the HCF. For the LCM use the LCM of the numbers and the HIGHER power of each letter." }];
        if (!askH) {
          traps.push({ spec: { type: "expression", expr: termExpr(c1 * c2, x1 + x2, y1 + y2) }, feedback: "Multiplying the two terms gives a common multiple, but not the lowest one." });
        }
        return {
          prompt: `Find the ${askH ? "highest common factor (HCF)" : "lowest common multiple (LCM)"} of {{${termShow(c1, x1, y1)}}} and {{${termShow(c2, x2, y2)}}}.`,
          answer: { type: "expression", expr: ans.expr, display: `{{${ans.show}}}` },
          solution: [
            `Numbers: the ${word} of ${c1} and ${c2} is ${askH ? g : l}.`,
            `Letters: take the ${askH ? "lower" : "higher"} power of each letter — {{${pw("a", askH ? lx : hx)}}} and {{${pw("b", askH ? ly : hy)}}}.`,
            `${word} = {{${ans.show}}}.`,
          ],
          hint: askH ? "Deal with the numbers and each letter separately: what do both terms definitely contain?" : "Deal with the numbers and each letter separately: what must the answer contain to be a multiple of both?",
          traps,
        };
      }
      const P = tier === 1 ? [2, 3, 5] : tier === 2 ? [2, 3, 5, 7] : [2, 3, 5, 7, 11];
      const lim = tier === 1 ? 400 : tier === 2 ? 3000 : 6000;
      let ea = [2, 1, 1, 0, 0].slice(0, P.length);
      let eb = [1, 2, 1, 0, 0].slice(0, P.length); // 60 and 90
      for (let i = 0; i < 300; i++) {
        const xa = P.map((p) => rng.int(0, p <= 3 ? 3 : p <= 5 ? 2 : 1));
        const xb = P.map((p) => rng.int(0, p <= 3 ? 3 : p <= 5 ? 2 : 1));
        const A0 = P.reduce((v, p, j) => v * Math.pow(p, xa[j]), 1);
        const B0 = P.reduce((v, p, j) => v * Math.pow(p, xb[j]), 1);
        const H0 = P.reduce((v, p, j) => v * Math.pow(p, Math.min(xa[j], xb[j])), 1);
        if (A0 > lim || B0 > lim || A0 === B0 || H0 < 2 || H0 === A0 || H0 === B0) continue;
        if (xa.filter((e) => e > 0).length < 2 || xb.filter((e) => e > 0).length < 2) continue;
        ea = xa;
        eb = xb;
        break;
      }
      const pa: PF = P.map((p, j) => [p, ea[j]]);
      const pb: PF = P.map((p, j) => [p, eb[j]]);
      const pmin: PF = P.map((p, j) => [p, Math.min(ea[j], eb[j])]);
      const pmax: PF = P.map((p, j) => [p, Math.max(ea[j], eb[j])]);
      const A = valueOf(pa);
      const B = valueOf(pb);
      const H = valueOf(pmin);
      const L = valueOf(pmax);
      const list = (pairs: PF) => pairs.flatMap(([p, e]) => Array.from({ length: e }, () => p));
      const middle = list(pmin);
      const onlyA = list(P.map((p, j) => [p, ea[j] - Math.min(ea[j], eb[j])]));
      const onlyB = list(P.map((p, j) => [p, eb[j] - Math.min(ea[j], eb[j])]));
      const showA = rng.bool();
      const prompt = showA
        ? `{{A = ${idx(pa)}}} and {{B = ${idx(pb)}}}.\n\nFind the ${word} of A and B. Give your answer as an ordinary number.`
        : `Write ${A} and ${B} as products of prime factors. Use them (a Venn diagram helps) to find the ${word} of ${A} and ${B}.`;
      const nA = showA ? "A" : String(A);
      const nB = showA ? "B" : String(B);
      const solution: string[] = [];
      if (!showA) solution.push(`${A} = {{${idx(pa)}}} and ${B} = {{${idx(pb)}}}.`);
      solution.push(
        `Venn diagram: the shared primes ${middle.join(", ")} go in the middle; only in ${nA}: ${onlyA.join(", ") || "nothing"}; only in ${nB}: ${onlyB.join(", ") || "nothing"}.`,
      );
      solution.push(
        askH
          ? `HCF = the middle = lowest power of each shared prime = ${showIdx(pmin)}.`
          : `LCM = everything in the diagram = highest power of each prime = ${showIdx(pmax)}.`,
      );
      const traps: Trap[] = [];
      if (askH) {
        traps.push({ spec: { type: "number", value: L }, feedback: "That's the LCM. The HCF only uses the primes in the middle of the Venn diagram." });
        const wrongH = P.reduce((v, p, j) => v * (ea[j] > 0 && eb[j] > 0 ? Math.pow(p, Math.max(ea[j], eb[j])) : 1), 1);
        if (wrongH !== H && wrongH !== L) traps.push({ spec: { type: "number", value: wrongH }, feedback: "For the HCF take the LOWER power of each shared prime — both numbers must contain it." });
      } else {
        traps.push({ spec: { type: "number", value: A * B }, feedback: "A × B counts the shared primes (the middle of the Venn diagram) twice." });
        traps.push({ spec: { type: "number", value: H }, feedback: "That's the HCF. The LCM uses everything in the Venn diagram." });
      }
      return {
        prompt,
        answer: { type: "number", value: askH ? H : L, display: askH ? showIdx(pmin) : showIdx(pmax) },
        solution,
        hint: askH ? "Which primes are in BOTH numbers? Use the lower power of each." : "Use every prime that appears in either number, at its higher power.",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 8. HCF × LCM = product of the two numbers
  // ---------------------------------------------------------------------------
  {
    id: `${T}.hcf-lcm-product`,
    topicId: T,
    title: "Use HCF × LCM = product of the numbers",
    level: 2,
    guideRef: "hcf-lcm",
    generate(rng, tier) {
      const { h, m, n, a, b } = tier === 1 ? hcfPair(rng, 2, 6, 2, 7, 50) : tier === 2 ? hcfPair(rng, 2, 12, 2, 11, 150) : hcfPair(rng, 6, 25, 2, 13, 400);
      const L = h * m * n;
      const t = rng.int(0, 2);
      if (t === 0) {
        return {
          prompt: `Two numbers have HCF ${h} and LCM ${L}. One of the numbers is ${a}. What is the other number?`,
          answer: { type: "number", value: b },
          solution: [
            "For any two whole numbers, HCF × LCM = the product of the two numbers.",
            `${h} × ${L} = ${h * L}.`,
            `Other number = ${h * L} ÷ ${a} = ${b}. Check: the HCF of ${a} and ${b} is ${h} ✓`,
          ],
          hint: "HCF × LCM equals the two numbers multiplied together.",
          traps: [{ spec: { type: "number", value: L / a }, feedback: `You divided the LCM by ${a}. Use HCF × LCM = product: multiply ${h} × ${L} first.` }],
        };
      }
      if (t === 1) {
        return {
          prompt: `The HCF of ${a} and ${b} is ${h}. Use this to find the LCM of ${a} and ${b} without listing multiples.`,
          answer: { type: "number", value: L },
          solution: [
            `HCF × LCM = ${a} × ${b} = ${a * b}.`,
            `LCM = ${a * b} ÷ ${h} = ${L}.`,
            `Check: ${L} ÷ ${a} = ${n} and ${L} ÷ ${b} = ${m} ✓`,
          ],
          hint: "HCF × LCM equals the two numbers multiplied together.",
          traps: [{ spec: { type: "number", value: a * b }, feedback: `${a} × ${b} is a common multiple, but not the lowest — divide by the HCF.` }],
        };
      }
      const P = a * b;
      return {
        prompt: `Two whole numbers multiply to give ${P}. Their highest common factor is ${h}. What is their lowest common multiple?`,
        answer: { type: "number", value: L },
        solution: [
          "For any two whole numbers, HCF × LCM = the product of the two numbers.",
          `So ${h} × LCM = ${P}.`,
          `LCM = ${P} ÷ ${h} = ${L}.`,
        ],
        hint: "HCF × LCM equals the two numbers multiplied together.",
        traps: [{ spec: { type: "number", value: P * h }, feedback: `Multiplying by the HCF goes the wrong way: ${h} × LCM = ${P}, so divide.` }],
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 9. HCF or LCM? Word problems
  // ---------------------------------------------------------------------------
  {
    id: `${T}.hcf-lcm-word-problems`,
    topicId: T,
    title: "HCF or LCM? Solve word problems",
    level: 2,
    guideRef: "hcf-lcm-problems",
    generate(rng, tier) {
      const ctx = rng.int(0, 7);
      const who = rng.pick(NAMES);
      const who2 = rng.pick(NAMES.filter((x) => x !== who));
      const deep = tier === 3 && rng.bool(0.6);
      const lcmTraps = (a: number, b: number, h: number, L: number): Trap[] => {
        const tr: Trap[] = [{ spec: { type: "number", value: h }, feedback: "That's the HCF. Here you need a time (or amount) that BOTH patterns reach — a common multiple." }];
        if (a * b !== L) tr.push({ spec: { type: "number", value: a * b }, feedback: `${a} × ${b} works, but it isn't the first time — find the LOWEST common multiple.` });
        return tr;
      };
      const hcfTrap = (L: number): Trap[] => [{ spec: { type: "number", value: L }, feedback: "That's the LCM. Splitting into equal parts with none left over needs a common FACTOR." }];

      if (ctx <= 1) {
        // Buses (ctx 0) or flashing lights (ctx 1): LCM.
        const { h, a, b } = tier === 1 ? hcfPair(rng, 2, 4, 2, 5, 20) : hcfPair(rng, 2, 6, 2, 7, 40);
        const L = lcm(a, b);
        const r1 = rng.int(10, 99);
        const r2 = rng.int(100, 199);
        if (ctx === 0 && deep) {
          // Count departures together in a 3-hour window; avoid a tie exactly at 10:00 am.
          let A = a, B = b, LL = L, H = h;
          for (let i = 0; i < 100 && (180 % LL === 0 || LL > 90); i++) {
            const q = hcfPair(rng, 2, 6, 2, 7, 40);
            [A, B, LL, H] = [q.a, q.b, lcm(q.a, q.b), q.h];
          }
          if (180 % LL === 0 || LL > 90) [A, B, LL, H] = [6, 8, 24, 2];
          const count = Math.floor(180 / LL) + 1;
          const times = Array.from({ length: count }, (_, i) => i * LL);
          const traps: Trap[] = [{ spec: { type: "number", value: count - 1 }, feedback: "Don't forget to count the departure at 7:00 am itself." }];
          if (H !== count && H !== count - 1) traps.push({ spec: { type: "number", value: H }, feedback: "The HCF doesn't tell you when they meet — you need the LCM." });
          return {
            prompt: `Bus ${r1} and bus ${r2} both leave the Tampines interchange at 7:00 am. Bus ${r1} leaves every ${A} minutes and bus ${r2} every ${B} minutes. From 7:00 am to 10:00 am, how many times do they leave together? Count the 7:00 am departure.`,
            answer: { type: "number", value: count },
            solution: [
              `They leave together every LCM(${A}, ${B}) = ${LL} minutes.`,
              `In the 180 minutes from 7:00 am to 10:00 am that happens at ${times.join(", ")} minutes after 7:00 am.`,
              `That is ${count} times (${Math.floor(180 / LL)} after the start, plus 7:00 am itself).`,
            ],
            hint: "First find how often they leave together. Then count those times inside the 3 hours.",
            traps,
          };
        }
        const prompt =
          ctx === 0
            ? `Bus ${r1} and bus ${r2} both leave the Tampines interchange at 7:00 am. Bus ${r1} leaves every ${a} minutes and bus ${r2} every ${b} minutes. How many minutes after 7:00 am do they next leave together?`
            : `Two lights in a Sentosa light show flash together. One flashes every ${a} seconds, the other every ${b} seconds. After how many seconds will they next flash at the same time?`;
        return {
          prompt,
          answer: { type: "number", value: L },
          solution: [
            `They meet again at a time that is a multiple of both ${a} and ${b}, so find the LCM.`,
            `Multiples of ${Math.max(a, b)}: ${multiplesUpTo(Math.max(a, b), L).join(", ")}. The first one that ${Math.min(a, b)} also divides is ${L}.`,
            `Answer: ${L} ${ctx === 0 ? "minutes" : "seconds"}.`,
          ],
          hint: "Is it a time both patterns reach (a common multiple) or a size that fits into both (a common factor)?",
          traps: lcmTraps(a, b, h, L),
        };
      }
      if (ctx === 2) {
        // Laps: LCM.
        const { h, a, b } = tier === 1 ? hcfPair(rng, 6, 10, 4, 7, 70) : hcfPair(rng, 8, 20, 4, 9, 180);
        const L = lcm(a, b);
        return {
          prompt: `${who} and ${who2} start running laps of a track at the same moment from the start line. ${who} takes ${a} seconds per lap and ${who2} takes ${b} seconds. After how many seconds are they next at the start line together?`,
          answer: { type: "number", value: L },
          solution: [
            `${who} is at the start line at multiples of ${a} s, ${who2} at multiples of ${b} s — you need the LCM.`,
            `${a} = {{${idx(pf(a))}}} and ${b} = {{${idx(pf(b))}}}, so the LCM is ${showIdx(pf(L))}.`,
            `Answer: ${L} seconds.`,
          ],
          hint: "Each runner is back at the start after a whole number of laps. When do the two lists of times first match?",
          traps: lcmTraps(a, b, h, L),
        };
      }
      if (ctx === 3) {
        // Packs: LCM.
        const { h, a, b } = hcfPair(rng, 2, 6, 2, 5, 30);
        const L = lcm(a, b);
        if (deep) {
          return {
            prompt: `Bread rolls come in packs of ${a} and veggie patties come in packs of ${b}. ${who} wants exactly the same number of rolls and patties, buying as few as possible. How many packs of rolls should ${who} buy?`,
            answer: { type: "number", value: L / a },
            solution: [
              `The number of rolls must be a multiple of ${a} and of ${b}: the smallest is LCM(${a}, ${b}) = ${L}.`,
              `Packs of rolls = ${L} ÷ ${a} = ${L / a}.`,
              `(And ${L} ÷ ${b} = ${L / b} packs of patties.)`,
            ],
            hint: "First find the smallest number that both pack sizes make exactly.",
            traps: [{ spec: { type: "number", value: L }, feedback: `${L} is the number of rolls — the question asks for packs.` }],
          };
        }
        return {
          prompt: `Bread rolls come in packs of ${a} and veggie patties come in packs of ${b}. ${who} wants exactly the same number of rolls and patties. What is the smallest number of rolls ${who} can buy?`,
          answer: { type: "number", value: L },
          solution: [
            `The number of rolls must be a multiple of ${a}, and the same number of patties must be a multiple of ${b}.`,
            `So find the LCM of ${a} and ${b}: ${L}.`,
            `That is ${L / a} packs of rolls and ${L / b} packs of patties.`,
          ],
          hint: "Is it something both packs can make (a common multiple) or a size that fits into both (a common factor)?",
          traps: lcmTraps(a, b, h, L),
        };
      }
      if (ctx === 4) {
        // Ribbons: HCF.
        const { h, m, n, a, b } = tier === 1 ? hcfPair(rng, 5, 12, 2, 6, 80) : hcfPair(rng, 6, 30, 2, 9, 250);
        const L = lcm(a, b);
        if (deep) {
          return {
            prompt: `${who} has two ribbons, ${a} cm and ${b} cm long. She cuts both into pieces that are all the same length, as long as possible, with nothing left over. How many pieces does she get altogether?`,
            answer: { type: "number", value: m + n },
            solution: [
              `The piece length must divide both ${a} and ${b}, and be as long as possible: HCF(${a}, ${b}) = ${h} cm.`,
              `${a} ÷ ${h} = ${m} pieces and ${b} ÷ ${h} = ${n} pieces.`,
              `Altogether ${m} + ${n} = ${m + n} pieces.`,
            ],
            hint: "First find the longest length that fits exactly into both ribbons.",
            traps: [{ spec: { type: "number", value: h }, feedback: `${h} cm is the length of each piece — the question asks how many pieces.` }],
          };
        }
        return {
          prompt: `${who} has two ribbons, ${a} cm and ${b} cm long. She cuts both into pieces that are all the same length, as long as possible, with nothing left over. How long is each piece, in cm?`,
          answer: { type: "number", value: h },
          solution: [
            `The piece length must divide exactly into ${a} and ${b}, so it is a common factor.`,
            `As long as possible means the HIGHEST common factor: ${a} = {{${idx(pf(a))}}}, ${b} = {{${idx(pf(b))}}}, HCF = ${h}.`,
            `Each piece is ${h} cm (${m} + ${n} pieces).`,
          ],
          hint: "Equal pieces with nothing left over: does the length go INTO both, or is it a multiple of both?",
          traps: hcfTrap(L),
        };
      }
      if (ctx === 5 || ctx === 6) {
        // Goody bags (5) or fruit bags (6): HCF.
        const { h, m, n, a, b } = tier === 1 ? hcfPair(rng, 2, 8, 2, 6, 48) : hcfPair(rng, 3, 15, 2, 9, 120);
        const L = lcm(a, b);
        const [itemA, itemB, bag] = ctx === 5 ? ["pencils", "erasers", "goody bags"] : ["mangoes", "rambutans", "fruit bags"];
        const setup = ctx === 5 ? `${who} has ${a} ${itemA} and ${b} ${itemB}.` : `A fruit stall at the hawker centre has ${a} ${itemA} and ${b} ${itemB}.`;
        if (deep) {
          return {
            prompt: `${setup} All of them are packed into identical ${bag} with nothing left over, making as many bags as possible. How many ${itemA} go in each bag?`,
            answer: { type: "number", value: m },
            solution: [
              `The number of bags must divide both ${a} and ${b}; the most bags is HCF(${a}, ${b}) = ${h}.`,
              `Each bag gets ${a} ÷ ${h} = ${m} ${itemA} (and ${b} ÷ ${h} = ${n} ${itemB}).`,
            ],
            hint: "First find the greatest number of bags, then share out the items.",
            traps: [{ spec: { type: "number", value: h }, feedback: `${h} is the number of bags — the question asks how many ${itemA} are in each.` }],
          };
        }
        return {
          prompt: `${setup} All of them are packed into identical ${bag} with nothing left over. What is the greatest number of bags that can be made?`,
          answer: { type: "number", value: h },
          solution: [
            `Identical bags with nothing left means the number of bags divides both ${a} and ${b}: a common factor.`,
            `Greatest number of bags = HCF(${a}, ${b}) = ${h}.`,
            `Each bag has ${m} ${itemA} and ${n} ${itemB}.`,
          ],
          hint: "Sharing equally with nothing left over — is that a common factor or a common multiple?",
          traps: hcfTrap(L),
        };
      }
      // ctx 7: square tiles: HCF.
      let hh = 30, mm = 4, nn = 7;
      for (let i = 0; i < 300; i++) {
        const q = rng.pick(tier === 1 ? [10, 20, 25, 30] : [12, 15, 18, 20, 24, 25, 30, 40, 45, 50, 60]);
        const x = rng.int(2, 9);
        const y = rng.int(2, 9);
        if (x === y || gcd(x, y) !== 1) continue;
        [hh, mm, nn] = [q, x, y];
        break;
      }
      const a = hh * mm;
      const b = hh * nn;
      const L = lcm(a, b);
      if (deep) {
        return {
          prompt: `A rectangular floor measures ${a} cm by ${b} cm. It is covered with identical square tiles, as large as possible, with no gaps and no cutting. How many tiles are needed?`,
          answer: { type: "number", value: mm * nn },
          solution: [
            `The tile side must divide both ${a} and ${b}; the largest is HCF(${a}, ${b}) = ${hh} cm.`,
            `Tiles along one side: ${a} ÷ ${hh} = ${mm}; along the other: ${b} ÷ ${hh} = ${nn}.`,
            `Number of tiles = ${mm} × ${nn} = ${mm * nn}.`,
          ],
          hint: "First find the largest square tile that fits exactly along both sides.",
          traps: [{ spec: { type: "number", value: hh }, feedback: `${hh} cm is the tile size — the question asks how many tiles.` }],
        };
      }
      return {
        prompt: `A rectangular floor measures ${a} cm by ${b} cm. It is covered with identical square tiles with no gaps and no cutting. What is the largest possible side length of a tile, in cm?`,
        answer: { type: "number", value: hh },
        solution: [
          `The tile side must fit exactly along ${a} cm and along ${b} cm: a common factor.`,
          `Largest tile = HCF(${a}, ${b}) = ${hh} cm.`,
          `That gives ${mm} × ${nn} = ${mm * nn} tiles.`,
        ],
        hint: "The tile side has to go exactly into both lengths.",
        traps: hcfTrap(L),
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 10. Square roots and cube roots from prime factors
  // ---------------------------------------------------------------------------
  {
    id: `${T}.roots-from-primes`,
    topicId: T,
    title: "Find square and cube roots using prime factors",
    level: 2,
    guideRef: "squares-cubes-from-primes",
    generate(rng, tier) {
      const cube = tier >= 2 && rng.bool(0.4);
      const okRoot = (r: number, maxP: number) => {
        const f = primeFactors(r);
        return f.length >= 2 && f.every((p) => p <= maxP);
      };
      const [rLo, rHi, maxP]: [number, number, number] = cube
        ? tier === 2 ? [6, 20, 5] : [10, 36, 7]
        : tier === 1 ? [6, 24, 7] : tier === 2 ? [12, 60, 7] : [24, 150, 11];
      let r = cube ? 12 : tier === 3 ? 42 : 18;
      for (let i = 0; i < 300; i++) {
        const c = rng.int(rLo, rHi);
        if (okRoot(c, maxP)) {
          r = c;
          break;
        }
      }
      const k = cube ? 3 : 2;
      const N = Math.pow(r, k);
      const pN = pf(N);
      const pr = pf(r);
      const rootSym = cube ? `{{cbrt(${N})}}` : `{{sqrt(${N})}}`;
      const t = rng.int(0, 2);
      const who = rng.pick(NAMES);
      const prompt =
        t === 0
          ? `The prime factorisation of ${N} is ${indexForm(N)}. Use it to find ${rootSym}.`
          : t === 1
            ? `A ${cube ? "cube" : "square"} number has prime factorisation ${indexForm(N)}. What is its ${cube ? "cube" : "square"} root?`
            : `${who} wants ${rootSym} without a calculator. Write ${N} as a product of prime factors and use it to find ${rootSym}.`;
      const traps: Trap[] = [];
      if (t !== 1 && N % k === 0) {
        traps.push({ spec: { type: "number", value: N / k }, feedback: `You divided the number by ${k}. A ${cube ? "cube" : "square"} root divides the POWERS by ${k}.` });
      }
      return {
        prompt,
        answer: { type: "number", value: r },
        solution: [
          `${N} = {{${idx(pN)}}}.`,
          `${cube ? "Cube root: divide every power by 3" : "Square root: halve every power"} → ${showIdx(pr)}.`,
          `Check: ${Array.from({ length: k }, () => String(r)).join(" × ")} = ${N} ✓`,
        ],
        hint: cube ? "Split the primes into three identical groups — divide each power by 3." : "Split the primes into two identical groups — halve each power.",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 11. Smallest multiplier / divisor to make a square or cube
  // ---------------------------------------------------------------------------
  {
    id: `${T}.make-square-or-cube`,
    topicId: T,
    title: "Make a square or cube number",
    level: 3,
    guideRef: "squares-cubes-from-primes",
    generate(rng, tier) {
      const mode = tier === 1 ? "sq" : tier === 2 ? rng.pick(["sq", "sq", "cube"] as const) : rng.pick(["sq", "div", "cube"] as const);
      const P = tier === 1 ? [2, 3, 5] : tier === 2 ? [2, 3, 5, 7] : [2, 3, 5, 7, 11];
      const [lo, hi]: [number, number] = tier === 1 ? [12, 200] : tier === 2 ? [40, 1000] : [100, 3000];
      const need = (pairs: PF) =>
        pairs.reduce((v, [p, e]) => v * Math.pow(p, mode === "cube" ? (3 - (e % 3)) % 3 : e % 2), 1);
      let N = mode === "cube" ? 72 : 180;
      for (let i = 0; i < 300; i++) {
        const c = rng.int(lo, hi);
        const f = primeFactors(c);
        if (!f.every((p) => P.includes(p)) || new Set(f).size < 2) continue;
        const k = need(pf(c));
        if (k < 2 || k === c) continue;
        if (mode === "cube" && k > 100) continue;
        N = c;
        break;
      }
      const pairs = pf(N);
      const k = need(pairs);
      const showForm = tier === 1 || rng.bool();
      const target = mode === "cube" ? "cube" : "square";
      const intro = showForm ? `${N} = ${indexForm(N)}. ` : "";
      const prompt =
        mode === "div"
          ? `${intro}What is the smallest whole number you can divide ${N} by to get a square number?`
          : `${intro}What is the smallest whole number you can multiply ${N} by to get a ${target} number?`;
      const fixList = pairs.filter(([, e]) => (mode === "cube" ? e % 3 !== 0 : e % 2 === 1));
      const result = mode === "div" ? N / k : N * k;
      const resPairs: PF = pf(result);
      const root = mode === "cube" ? Math.round(Math.cbrt(result)) : Math.round(Math.sqrt(result));
      const traps: Trap[] = [];
      if (mode === "sq") {
        traps.push({ spec: { type: "number", value: N }, feedback: `${N} × ${N} is a square, but it isn't the smallest multiplier — only the odd powers need fixing.` });
        const allP = pairs.reduce((v, [p]) => v * p, 1);
        if (allP !== k && allP !== N) traps.push({ spec: { type: "number", value: allP }, feedback: "Only the primes with an ODD power need another copy." });
      } else if (mode === "cube") {
        const sqK = pairs.reduce((v, [p, e]) => v * Math.pow(p, e % 2), 1);
        if (sqK !== k && sqK > 1) traps.push({ spec: { type: "number", value: sqK }, feedback: "That makes every power even (a square). For a cube every power must be a multiple of 3." });
      } else {
        traps.push({ spec: { type: "number", value: result }, feedback: `${result} is the square you end up with — the question asks what you divide by.` });
      }
      const rule = mode === "cube" ? "In a cube number every prime's power is a multiple of 3." : "In a square number every prime's power is even.";
      const fixText =
        mode === "div"
          ? `The odd powers are on ${joinAnd(fixList.map(([p, e]) => (e > 1 ? `{{${p}^${e}}}` : String(p))))}: remove one of each by dividing by ${k}.`
          : `Top up ${joinAnd(fixList.map(([p, e]) => (e > 1 ? `{{${p}^${e}}}` : String(p))))} to the next ${mode === "cube" ? "multiple of 3" : "even power"}: multiply by ${showIdx(pf(k))}.`;
      return {
        prompt,
        answer: { type: "number", value: k },
        solution: [
          `${showForm ? "" : `${N} = {{${idx(pairs)}}}. `}${rule}`,
          fixText,
          `${N} ${mode === "div" ? "÷" : "×"} ${k} = ${result} = {{${idx(resPairs)}}} = {{${root}^${mode === "cube" ? 3 : 2}}} ✓`,
        ],
        hint: mode === "cube" ? "Write it in index form. Which powers are not multiples of 3?" : "Write it in index form. Which powers are odd?",
        traps,
      };
    },
  },

  // ---------------------------------------------------------------------------
  // 12. Counting factors (stretch)
  // ---------------------------------------------------------------------------
  {
    id: `${T}.count-factors`,
    topicId: T,
    title: "Count factors from the prime factorisation",
    level: 3,
    guideRef: "counting-factors",
    generate(rng, tier) {
      const P = tier === 1 ? [2, 3, 5] : tier === 2 ? [2, 3, 5, 7] : [2, 3, 5, 7, 11];
      const maxV = tier === 1 ? 500 : tier === 2 ? 3000 : 5000;
      let pairs: PF = [[2, 3], [3, 2]];
      for (let i = 0; i < 300; i++) {
        const kk = tier === 1 ? 2 : rng.int(2, 3);
        const ps = rng.shuffle(P).slice(0, kk).sort((x, y) => x - y);
        const cand: PF = ps.map((p) => [p, rng.int(1, p <= 3 ? 4 : 2)]);
        const v = valueOf(cand);
        if (v > maxV || v < 12) continue;
        if (!cand.some(([, e]) => e >= 2)) continue;
        pairs = cand;
        break;
      }
      const N = valueOf(pairs);
      const count = pairs.reduce((c, [, e]) => c * (e + 1), 1);
      const form = idx(pairs);
      const letters = ["i", "j", "k"];
      const t = tier === 3 ? rng.int(0, 2) : rng.int(0, 1);
      const prompt =
        t === 0
          ? `${N} = {{${form}}}. How many factors does ${N} have? (Count 1 and ${N} too.)`
          : t === 1
            ? `How many factors does {{${form}}} have? (Count 1 and the number itself.)`
            : `How many factors does ${N} have? (Count 1 and ${N} too.) Hint: write ${N} in index form first.`;
      const traps: Trap[] = [{ spec: { type: "number", value: pairs.reduce((c, [, e]) => c * e, 1) }, feedback: "Each power can also be 0 (the prime isn't used), so add 1 to each power before multiplying." }];
      const sum = pairs.reduce((c, [, e]) => c + e + 1, 0);
      if (sum !== count) traps.push({ spec: { type: "number", value: sum }, feedback: "Multiply the numbers of choices — don't add them." });
      return {
        prompt,
        answer: { type: "number", value: count },
        solution: [
          `${t === 1 ? `{{${form}}} = ${N}.` : `${N} = {{${form}}}.`} Every factor looks like {{${pairs.map(([p], i) => `${p}^${letters[i]}`).join(" * ")}}}.`,
          `${pairs.map(([p, e], i) => `${letters[i]} can be 0 to ${e} (${e + 1} choices for the power of ${p})`).join("; ")}.`,
          `Number of factors = ${pairs.map(([, e]) => String(e + 1)).join(" × ")} = ${count}.`,
        ],
        hint: "A factor can use each prime from power 0 up to the power in the number. Count the choices.",
        traps,
      };
    },
  },
];
