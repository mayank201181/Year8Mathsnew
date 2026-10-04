// Procedural skill drills for the "percentages" topic.
// Every value is built from integers (tenths of a per cent, whole cents) so
// answers are exact; rounding is done with exact integer / BigInt arithmetic.
import type { Drill } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, num, big, clean, simplify } from "./helpers.ts";

const TOPIC = "percentages";

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

/** A percentage from tenths of a per cent: 375 → "37.5%". */
function pc(tenths: number): string {
  return `${num(tenths / 10)}%`;
}

/** Money from whole cents: 8000 → "$80", 1250 → "$12.50", 123456 → "$1,234.56". */
function cash(cents: number): string {
  const c = Math.round(Math.abs(cents));
  const d = Math.floor(c / 100);
  const r = c % 100;
  return (cents < 0 ? "−" : "") + "$" + big(d) + (r ? "." + String(r).padStart(2, "0") : "");
}

/** Dollars as a plain number for calculations: 8000 → "80", 1250 → "12.50". */
function dn(cents: number): string {
  return cents % 100 === 0 ? String(cents / 100) : (cents / 100).toFixed(2);
}

/** Is N/D (positive integers) exact with at most dp decimal places? */
function exactQ(N: number, D: number, dp: number): boolean {
  return (N * 10 ** dp) % D === 0;
}

/** Round the positive rational N/D to dp decimal places (half up), exactly. */
function roundQ(N: number, D: number, dp: number): number {
  const f = 10 ** dp;
  return clean(Math.floor((2 * N * f + D) / (2 * D)) / f);
}

/** Round the positive rational N/D (BigInts) to dp decimal places (half up). */
function roundBig(N: bigint, D: bigint, dp: number): number {
  const f = 10n ** BigInt(dp);
  const q = (2n * N * f + D) / (2n * D);
  return clean(Number(q) / 10 ** dp);
}

/** Decimal string of N/D (positive), exact if it ends within maxDp places, else truncated with "…". */
function bigDec(N: bigint, D: bigint, maxDp = 4): string {
  const f = 10n ** BigInt(maxDp);
  const scaled = (N * f) / D;
  const exact = (N * f) % D === 0n;
  const s = scaled.toString().padStart(maxDp + 1, "0");
  const ip = s.slice(0, s.length - maxDp);
  const fp = s.slice(s.length - maxDp).replace(/0+$/, "");
  return ip + (fp ? "." + fp : "") + (exact ? "" : "…");
}

function decStr(N: number, D: number, maxDp = 4): string {
  return bigDec(BigInt(N), BigInt(D), maxDp);
}

/** Number traps, skipping any that equal the answer (or each other) or are not finite. */
function numTraps(answer: number, list: Array<[number, string]>): Trap[] {
  const out: Trap[] = [];
  const seen: number[] = [answer];
  for (const [v, feedback] of list) {
    const c = clean(v);
    if (!Number.isFinite(c)) continue;
    if (seen.some((s) => Math.abs(s - c) <= 1e-9 * Math.max(1, Math.abs(s)))) continue;
    seen.push(c);
    out.push({ spec: { type: "number", value: c }, feedback });
  }
  return out;
}

/** Number answer shown as a percentage. */
function pctAnswer(value: number): AnswerSpec {
  return { type: "number", value, display: `${num(value)}%` };
}

/** Number answer in dollars from whole cents. */
function cashAnswer(cents: number): AnswerSpec {
  return { type: "number", value: clean(cents / 100), display: cash(cents) };
}

/** "{{a/b}} × 100 = 37.5%" or "… = 16.666… ≈ 16.7% (1 d.p.)" */
function pctOfStr(N: number, D: number, value: number): string {
  return exactQ(N, D, 1) && clean(N / D) === value ? `${num(value)}%` : `${decStr(N, D, 3)} ≈ ${num(value)}% (to 1 d.p.)`;
}

/** Non-calculator build-up of t tenths-of-a-per-cent of A (e.g. 35% = 3 × 10% + 5%). */
function mentalSteps(t: number, A: number): string[] {
  const v = (tt: number) => num(clean((tt * A) / 1000));
  const a = num(A);
  const ans = v(t);
  switch (t) {
    case 500:
      return [`50% is a half: ${a} ÷ 2 = ${ans}.`];
    case 250:
      return [`25% is a quarter: ${a} ÷ 4 = ${ans}.`];
    case 750:
      return [`25% is a quarter: ${a} ÷ 4 = ${v(250)}.`, `75% is three quarters: 3 × ${v(250)} = ${ans}.`];
    case 125:
      return [`12.5% is {{1/8}}: ${a} ÷ 8 = ${ans}.`];
    case 1500:
      return [`100% is ${a}, and 50% is half of it: ${v(500)}.`, `150% = 100% + 50% = ${a} + ${v(500)} = ${ans}.`];
  }
  const lines: string[] = [];
  if (t === 950 || t === 990) {
    const d = 1000 - t;
    if (d === 50) lines.push(`10% of ${a} = ${a} ÷ 10 = ${v(100)}, so 5% = half of that = ${v(50)}.`);
    else lines.push(`1% of ${a} = ${a} ÷ 100 = ${v(10)}.`);
    lines.push(`${pc(t)} = 100% − ${pc(d)} = ${a} − ${v(d)} = ${ans}.`);
    return lines;
  }
  const h = Math.floor(t / 1000);
  let r = t - 1000 * h;
  const tens = Math.floor(r / 100);
  r -= 100 * tens;
  const five = r >= 50 ? 1 : 0;
  r -= 50 * five;
  const twoHalf = r === 25 ? 1 : 0;
  if (twoHalf) r = 0;
  const ones = Math.floor(r / 10);
  r -= 10 * ones;
  const half = r === 5 ? 1 : 0;
  if (h) lines.push(`100% of ${a} is ${a} itself.`);
  if (tens || five || twoHalf) lines.push(`10% of ${a} = ${a} ÷ 10 = ${v(100)}.`);
  if (five || twoHalf) lines.push(`5% = half of 10% = ${v(50)}.`);
  if (twoHalf) lines.push(`2.5% = half of 5% = ${v(25)}.`);
  if (ones || half) lines.push(`1% of ${a} = ${a} ÷ 100 = ${v(10)}.`);
  if (half) lines.push(`0.5% = half of 1% = ${v(5)}.`);
  const labels: string[] = [];
  const vals: string[] = [];
  const add = (count: number, tt: number, label: string) => {
    if (!count) return;
    labels.push(count > 1 ? `${count} × ${label}` : label);
    vals.push(count > 1 ? `${count} × ${v(tt)}` : v(tt));
  };
  add(h, 1000, "100%");
  add(tens, 100, "10%");
  add(five, 50, "5%");
  add(twoHalf, 25, "2.5%");
  add(ones, 10, "1%");
  add(half, 5, "0.5%");
  if (labels.length === 1 && !labels[0].includes("×")) return lines;
  lines.push(`${pc(t)} = ${labels.join(" + ")} = ${vals.join(" + ")} = ${ans}.`);
  return lines;
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // ------------------------------------------------------------------ L1
  {
    id: "percentages.convert-fdp",
    topicId: TOPIC,
    title: "Convert between fractions, decimals and percentages",
    level: 1,
    guideRef: "fdp-conversions",
    generate(rng, tier) {
      const kind = rng.pick(["f2p", "d2p", "p2d", "p2f"] as const);

      if (kind === "f2p") {
        // Denominators that divide 1000, so the percentage has at most 1 d.p.
        const dens = tier === 1 ? [2, 4, 5, 10, 20, 25, 50] : tier === 2 ? [8, 20, 25, 40, 50, 200] : [2, 4, 5, 8, 20, 25, 40];
        let n = tier === 3 ? 5 : 3;
        let d = 4;
        for (let i = 0; i < 100; i++) {
          const dd = rng.pick(dens);
          const nn = tier === 3 ? rng.int(dd + 1, 3 * dd - 1) : rng.int(1, dd - 1);
          if (gcd(nn, dd) === 1) {
            n = nn;
            d = dd;
            break;
          }
        }
        const pct = clean((n * 100) / d);
        const dec = clean(n / d);
        const mixed = tier === 3 && rng.bool();
        const shown = frac(n, d, { mixed });
        const steps: string[] = [];
        if (mixed) steps.push(`As an improper fraction, ${shown} = ${frac(n, d)}.`);
        if (100 % d === 0) {
          const k = 100 / d;
          steps.push(`Make the denominator 100 by multiplying the top and bottom by ${k}: ${frac(n, d)} = ${frac(n * k, 100, { simplify: false })}.`);
          steps.push(`Per cent means "out of 100", so ${frac(n * k, 100, { simplify: false })} = ${num(pct)}%.`);
        } else {
          steps.push(`100 is not a multiple of ${d}, so divide the top by the bottom: ${n} ÷ ${d} = ${num(dec)}.`);
          steps.push(`Multiply by 100: ${num(dec)} × 100 = ${num(pct)}%.`);
        }
        if (tier === 3) steps.push(`Check: ${shown} is more than 1 whole, so it must be more than 100%.`);
        return {
          prompt: `Write ${shown} as a percentage.`,
          answer: pctAnswer(pct),
          solution: steps,
          hint: "Per cent means \"out of 100\". Can you make the denominator 100? If not, divide the top by the bottom and multiply by 100.",
          traps: numTraps(pct, [[dec, `${num(dec)} is the decimal. Multiply by 100 to turn it into a percentage.`]]),
        };
      }

      if (kind === "d2p") {
        // m = the decimal in thousandths.
        let m = 350;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) m = 10 * rng.int(1, 99);
          else if (tier === 2) m = rng.bool(0.65) ? rng.int(1, 999) : 10 * rng.int(1, 9);
          else m = rng.bool() ? 10 * rng.int(101, 350) : 5 * rng.int(201, 500);
          if (m % 1000 !== 0 && (tier !== 2 || m % 10 !== 0 || m < 100)) break;
        }
        if (m % 1000 === 0) m = 350;
        const dec = clean(m / 1000);
        const pct = clean(m / 10);
        const trapList: Array<[number, string]> = [];
        if (m % 100 === 0) trapList.push([m / 100, `${num(dec)} is ${m / 100} tenths, which is ${m / 10} hundredths — so it is ${num(pct)}%, not ${m / 100}%.`]);
        if (m < 100 && m % 10 === 0) trapList.push([m, `${num(dec)} is ${m / 10} hundredths, so it is ${num(pct)}%. (${m}% would be ${num(m / 100)}.)`]);
        return {
          prompt: `Write ${num(dec)} as a percentage.`,
          answer: pctAnswer(pct),
          solution: [
            "To change a decimal to a percentage, multiply by 100: every digit moves two places to the left.",
            `${num(dec)} × 100 = ${num(pct)}, so ${num(dec)} = ${num(pct)}%.`,
          ],
          hint: "A percentage is a number of hundredths. How many hundredths is this decimal?",
          traps: numTraps(pct, trapList),
        };
      }

      if (kind === "p2d") {
        // t = the percentage in tenths of a per cent.
        let t = 350;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) t = 10 * (rng.bool(0.35) ? rng.int(1, 9) : rng.int(10, 99));
          else if (tier === 2) {
            const r = rng.int(0, 2);
            t = r === 0 ? 10 * rng.int(1, 9) : r === 1 ? 10 * rng.int(0, 40) + 5 : 10 * rng.int(10, 99);
          } else t = rng.bool(0.7) ? 10 * rng.int(101, 400) : 10 * rng.int(100, 250) + 5;
          if (t % 1000 !== 0) break;
        }
        if (t % 1000 === 0) t = 350;
        const dec = clean(t / 1000);
        return {
          prompt: `Write ${pc(t)} as a decimal.`,
          answer: { type: "number", value: dec, allowFraction: false },
          solution: [
            "Per cent means \"out of 100\", so divide by 100: every digit moves two places to the right.",
            `${num(t / 10)} ÷ 100 = ${num(dec)}${t > 1000 ? " — more than 1, because it is more than 100%" : ""}.`,
          ],
          hint: "Per cent means \"out of 100\". What do you divide by?",
          traps: numTraps(dec, [[clean(t / 100), `You divided by 10. Per cent means "out of 100", so divide by 100: ${pc(t)} = ${num(dec)}.`]]),
        };
      }

      // p2f
      let t = 350;
      for (let i = 0; i < 100; i++) {
        if (tier === 1) t = 10 * (rng.bool() ? 5 * rng.int(1, 19) : 4 * rng.int(1, 24));
        else if (tier === 2) t = rng.bool(0.6) ? 10 * rng.int(1, 99) : 10 * rng.pick([2, 7, 12, 17, 22, 27, 32, 37, 42, 62, 87]) + 5;
        else t = rng.bool(0.7) ? 50 * rng.int(21, 79) : 10 * rng.pick([102, 112, 137, 162, 187, 212]) + 5;
        if (t % 1000 !== 0) break;
      }
      if (t % 1000 === 0) t = 350;
      const [fn, fd] = simplify(t, 1000);
      const improper = fn > fd;
      const steps: string[] = [];
      if (t % 10 === 0) {
        const p = t / 10;
        const g = gcd(p, 100);
        steps.push(`${p}% means ${p} out of 100: ${frac(p, 100, { simplify: false })}.`);
        steps.push(
          g > 1
            ? `Divide the top and bottom by ${g} (the HCF of ${p} and 100): ${frac(p, 100, { simplify: false })} = ${frac(fn, fd)}.`
            : `${p} and 100 have no common factor except 1, so ${frac(p, 100, { simplify: false })} is already in its simplest form.`,
        );
      } else {
        const g = gcd(t, 1000);
        steps.push(`${pc(t)} = {{${num(t / 10)}/100}}. Multiply the top and bottom by 10 to clear the decimal: ${frac(t, 1000, { simplify: false })}.`);
        steps.push(`Divide the top and bottom by ${g} (the HCF of ${t} and 1000): ${frac(fn, fd)}.`);
      }
      if (improper) steps.push(`As a mixed number this is ${frac(fn, fd, { mixed: true })}.`);
      return {
        prompt: `Write ${pc(t)} as a fraction in its simplest form.${improper ? " You may give an improper fraction or a mixed number." : ""}`,
        answer: improper
          ? { type: "fraction", n: fn, d: fd, simplest: true, display: `${frac(fn, fd)} = ${frac(fn, fd, { mixed: true })}` }
          : { type: "fraction", n: fn, d: fd, simplest: true },
        solution: steps,
        hint: "Write it as a fraction out of 100, then divide the top and bottom by their highest common factor.",
      };
    },
  },

  {
    id: "percentages.percent-of-amount-mental",
    topicId: TOPIC,
    title: "Find a percentage of an amount without a calculator",
    level: 1,
    guideRef: "percentage-of-amount",
    generate(rng, tier) {
      const pcts =
        tier === 1
          ? [10, 20, 25, 50, 5, 30, 40, 75, 15, 60, 1, 2, 70, 90]
          : tier === 2
            ? [15, 35, 45, 65, 85, 12, 4, 95, 55, 6, 11, 21, 99, 3, 2.5]
            : [12.5, 17.5, 2.5, 150, 175, 120, 0.5, 115, 7.5, 135, 37.5];
      const name = rng.pick(NAMES);
      let t = 100;
      let A = 200;
      let ctx: "plain" | "people" | "money" | "litres" = "plain";
      let ok = false;
      for (let i = 0; i < 300; i++) {
        t = Math.round(rng.pick(pcts) * 10);
        ctx = t > 1000 ? rng.pick(["plain", "money"] as const) : rng.pick(["plain", "people", "money", "litres"] as const);
        A = tier === 1 ? 10 * rng.int(2, 40) : tier === 2 ? 10 * rng.int(2, 90) : rng.bool() ? 10 * rng.int(2, 120) : 8 * rng.int(3, 100);
        const N = t * A; // answer = N / 1000
        const needWhole = tier === 1 || ctx === "people";
        const fits = needWhole ? N % 1000 === 0 : tier === 2 ? N % 100 === 0 : N % 10 === 0;
        if (fits && N > 0) {
          ok = true;
          break;
        }
      }
      if (!ok) {
        t = 100;
        A = 200;
        ctx = "plain";
      }
      const ans = clean((t * A) / 1000);
      const tail = " Work it out without a calculator.";
      let prompt: string;
      let answer: AnswerSpec = { type: "number", value: ans };
      if (ctx === "people") {
        prompt = `There are ${big(A)} students at a school. ${pc(t)} of them travel to school by MRT. How many students is that?${tail}`;
      } else if (ctx === "litres") {
        prompt = `A water tank holds ${big(A)} litres when it is full. It is ${pc(t)} full. How many litres of water are in it?${tail}`;
      } else if (ctx === "money") {
        prompt =
          t > 1000
            ? `A concert ticket cost ${cash(A * 100)} last year. This year it costs ${pc(t)} of last year's price. How much does it cost this year?${tail}`
            : `${name} has ${cash(A * 100)} in savings and spends ${pc(t)} of it on a new bicycle helmet. How much does ${name} spend?${tail}`;
        answer = cashAnswer((t * A) / 10);
      } else {
        prompt = `Work out ${pc(t)} of ${big(A)} without a calculator.`;
      }
      const trapList: Array<[number, string]> = [];
      if (t === 50) trapList.push([clean(A / 5), `Dividing by 5 gives 20%. 5% is half of 10%: ${num(A)} ÷ 10 ÷ 2.`]);
      trapList.push([clean(ans * 10), `Check the place value: 10% of ${num(A)} is ${num(clean(A / 10))}, so build up from that.`]);
      return {
        prompt,
        answer,
        solution: [...mentalSteps(t, A), `Check with a multiplier: ${num(clean(t / 1000))} × ${num(A)} = ${num(ans)}.`],
        hint: "Find 10% first (divide by 10). Can you build the percentage from 10%, 5% and 1%?",
        traps: numTraps(ans, trapList),
      };
    },
  },

  {
    id: "percentages.one-as-percent-of-another",
    topicId: TOPIC,
    title: "Write one amount as a percentage of another",
    level: 1,
    guideRef: "one-as-percentage-of-another",
    generate(rng, tier) {
      const useUnits = tier === 3 ? rng.bool(0.75) : tier === 2 ? rng.bool(0.35) : false;
      if (useUnits) {
        const U = [
          { s: "cm", L: "m", L1: "m", f: 100, step: 5, bMax: 5 },
          { s: "g", L: "kg", L1: "kg", f: 1000, step: 50, bMax: 5 },
          { s: "minutes", L: "hours", L1: "hour", f: 60, step: 5, bMax: 4 },
          { s: "ml", L: "litres", L1: "litre", f: 1000, step: 50, bMax: 3 },
          { s: "m", L: "km", L1: "km", f: 1000, step: 50, bMax: 5 },
          { s: "cents", L: "$", L1: "$", f: 100, step: 5, bMax: 0 },
        ] as const;
        let u: (typeof U)[number] = U[0];
        let a = 45;
        let B = 200;
        let ok = false;
        for (let i = 0; i < 300; i++) {
          u = rng.pick(U);
          B = u.s === "cents" ? 50 * rng.int(2, 10) : u.f * rng.int(1, u.bMax);
          a = u.step * rng.int(1, B / u.step - 1);
          if (a <= 0 || a >= B) continue;
          if (tier === 2 && !exactQ(100 * a, B, 1)) continue;
          ok = true;
          break;
        }
        if (!ok) {
          u = U[0];
          a = 45;
          B = 200;
        }
        const whole = u.s === "cents" ? cash(B) : `${B / u.f} ${B / u.f === 1 ? u.L1 : u.L}`;
        const exact = exactQ(100 * a, B, 1);
        const value = exact ? clean((100 * a) / B) : roundQ(100 * a, B, 1);
        const round = exact ? "" : " Give your answer to 1 decimal place.";
        const prompt = rng.bool()
          ? `Write ${a} ${u.s} as a percentage of ${whole}.${round}`
          : `What percentage of ${whole} is ${a} ${u.s}?${round}`;
        const noConv = roundQ(100 * a * u.f, B, 1);
        return {
          prompt,
          answer: pctAnswer(value),
          solution: [
            `Use the same units: ${whole} = ${B} ${u.s}.`,
            `Write the part as a fraction of the whole: ${frac(a, B, { simplify: false })}.`,
            `Multiply by 100: ${frac(a, B, { simplify: false })} × 100 = ${pctOfStr(100 * a, B, value)}.`,
          ],
          hint: "Both amounts must be in the same units before you divide.",
          traps: numTraps(value, [
            [noConv, `Change both amounts to the same units first: ${whole} = ${B} ${u.s}.`],
            [roundQ(100 * B, a, 1), `That's upside down. Divide the part (${a} ${u.s}) by the whole (${B} ${u.s}).`],
          ]),
        };
      }

      const bs = tier === 1 ? [4, 5, 10, 20, 25, 50] : [8, 16, 40, 80, 30, 60, 12, 15, 24, 75, 120, 150, 200, 250, 400, 35];
      let a = 17;
      let b = 25;
      let ok = false;
      for (let i = 0; i < 300; i++) {
        b = tier === 3 ? rng.int(12, 99) : rng.pick(bs);
        a = rng.int(1, b - 1);
        if (tier === 2 && !exactQ(100 * a, b, 1)) continue;
        if (tier === 3 && exactQ(100 * a, b, 0)) continue;
        ok = true;
        break;
      }
      if (!ok) {
        a = 17;
        b = 25;
      }
      const exact = exactQ(100 * a, b, 1);
      const value = exact ? clean((100 * a) / b) : roundQ(100 * a, b, 1);
      const round = exact ? "" : " Give your answer to 1 decimal place.";
      const name = rng.pick(NAMES);
      const ctxs = b <= 80 ? ["test", "club", "prata", "plain"] : b <= 100 ? ["test", "prata", "plain"] : ["prata", "plain"];
      const ctx = rng.pick(ctxs);
      let prompt: string;
      if (ctx === "test") {
        const subj = rng.pick(["maths", "science", "spelling", "history", "geography"]);
        prompt = `${name} scored ${a} out of ${b} in a ${subj} test. What percentage did ${name} score?${round}`;
      } else if (ctx === "club") {
        const cca = rng.pick(["robotics", "badminton", "choir", "chess", "drama", "netball"]);
        prompt = `${a} of the ${b} members of the school ${cca} club are in Year 8. What percentage of the members are in Year 8?${round}`;
      } else if (ctx === "prata") {
        prompt = `A hawker stall sold ${b} plates of roti prata on Saturday morning. ${a} of them were takeaways. What percentage were takeaways?${round}`;
      } else {
        prompt = `Write ${a} as a percentage of ${b}.${round}`;
      }
      return {
        prompt,
        answer: pctAnswer(value),
        solution: [
          `Write the part as a fraction of the whole: ${frac(a, b, { simplify: false })}.`,
          `Multiply by 100: ${frac(a, b, { simplify: false })} × 100 = ${pctOfStr(100 * a, b, value)}.`,
        ],
        hint: "Write it as a fraction: the part over the whole. Then multiply by 100.",
        traps: numTraps(value, [[roundQ(100 * b, a, 1), `That's upside down. Divide the part (${a}) by the whole (${b}).`]]),
      };
    },
  },

  // ------------------------------------------------------------------ L2
  {
    id: "percentages.order-fdp",
    topicId: TOPIC,
    title: "Order fractions, decimals and percentages",
    level: 2,
    guideRef: "fdp-conversions",
    generate(rng, tier) {
      // Work in tenths of a per cent so every value is an exact integer.
      type Item = { t: number; shown: string; how: string; kind: "f" | "d" | "p" };
      const dec = (t: number): Item => ({ t, shown: num(t / 1000), how: `${num(t / 1000)} = ${pc(t)}`, kind: "d" });
      const per = (t: number): Item => ({ t, shown: pc(t), how: `${pc(t)} is already a percentage`, kind: "p" });
      const lo = tier === 3 ? 1000 : 0;
      const hi = tier === 3 ? 2000 : 1000;
      let items: Item[] = [];
      let ok = false;
      for (let i = 0; i < 300; i++) {
        const dens = tier === 1 ? [4, 5, 10, 20, 25] : tier === 2 ? [8, 20, 25, 40] : [4, 5, 8, 20, 25, 40];
        const d = rng.pick(dens);
        const n = tier === 3 ? rng.int(d + 1, 2 * d - 1) : rng.int(1, d - 1);
        if (gcd(n, d) !== 1) continue;
        const tf = (1000 * n) / d;
        const mixed = tier === 3 && rng.bool();
        const fShown = frac(n, d, { mixed });
        items = [{ t: tf, shown: fShown, how: `${fShown} = ${n} ÷ ${d} = ${num(n / d)} = ${pc(tf)}`, kind: "f" }];
        if (tier === 1) {
          items.push(dec(tf + 10 * rng.nonZero(-8, 8)));
          items.push(per(tf + 10 * rng.nonZero(-8, 8)));
        } else {
          // One short decimal (1 or 2 d.p.), one 3 d.p. decimal, one percentage — all close together.
          const step = rng.bool() ? 100 : 10;
          items.push(dec(step * Math.round((tf + 10 * rng.nonZero(-6, 6)) / step)));
          items.push(dec(tf + rng.nonZero(-40, 40)));
          items.push(per(tf + 5 * rng.nonZero(-10, 10)));
        }
        const ts = items.map((x) => x.t);
        if (new Set(ts).size !== ts.length) continue;
        if (ts.some((x) => x <= lo || x >= hi)) continue;
        if (tier >= 2 && items[2].t % 10 === 0) continue; // the 3 d.p. decimal really has 3 d.p.
        ok = true;
        break;
      }
      if (!ok) items = [{ t: 375, shown: "{{3/8}}", how: "{{3/8}} = 3 ÷ 8 = 0.375 = 37.5%", kind: "f" }, dec(400), dec(385), per(380)];
      const shown = rng.shuffle(items);
      const sorted = [...items].sort((x, y) => x.t - y.t);
      const values = sorted.map((x) => clean(x.t / 10));
      const steps = [
        `Change each one to a percentage: ${shown.map((x) => x.how).join("; ")}.`,
        `Smallest first: ${sorted.map((x) => pc(x.t)).join(", ")}.`,
      ];
      // Point out the "more digits is bigger" misconception when it applies.
      const short = items.find((x) => x.kind === "d" && x.t % 10 === 0);
      const long = items.find((x) => x.kind === "d" && x.t % 10 !== 0);
      if (short && long && short.t > long.t) {
        steps.push(`Careful: ${short.shown} is bigger than ${long.shown}. More digits does not mean bigger — compare ${pc(short.t)} with ${pc(long.t)}.`);
      }
      return {
        prompt: `Write these in order of size, smallest first:\n\n${shown.map((x) => x.shown).join(",   ")}\n\nGive your answer as a list of percentages, smallest first.`,
        answer: {
          type: "list",
          values,
          ordered: true,
          display: sorted.map((x) => (x.kind === "p" ? x.shown : `${x.shown} (${pc(x.t)})`)).join(", "),
        },
        solution: steps,
        hint: "Turn every number into a percentage first, then compare like with like.",
        traps: [{ spec: { type: "list", values: [...values].reverse(), ordered: true }, feedback: "That's largest first — the question asks for smallest first." }],
      };
    },
  },

  {
    id: "percentages.percent-of-amount-calculator",
    topicId: TOPIC,
    title: "Find a percentage of an amount with a multiplier",
    level: 2,
    guideRef: "percentage-of-amount",
    generate(rng, tier) {
      let t = 170;
      for (let i = 0; i < 100; i++) {
        t = tier === 3 ? (rng.bool() ? 10 * rng.int(101, 250) : rng.int(3, 199)) : 10 * rng.int(1, 99);
        if (t % 50 !== 0) break;
      }
      if (t % 50 === 0) t = 170;
      const name = rng.pick(NAMES);
      const ctx = t > 1000 ? rng.pick(["plain", "rent", "plant"] as const) : rng.pick(tier === 1 ? (["plain", "field", "save"] as const) : (["plain", "field", "save", "deposit"] as const));
      let base: number; // cents for money contexts, otherwise the plain number
      if (ctx === "plain") base = tier === 1 ? rng.int(12, 900) : rng.int(12, 2000);
      else if (ctx === "field") base = tier === 1 ? 10 * rng.int(5, 300) : rng.int(50, 5000);
      else if (ctx === "plant") base = rng.int(20, 150);
      else if (ctx === "save") base = tier === 1 ? 100 * rng.int(800, 4000) : 5 * rng.int(16000, 80000);
      else if (ctx === "deposit") base = tier === 1 ? 100 * rng.int(100, 3000) : 5 * rng.int(2000, 60000);
      else base = 100 * rng.int(1500, 4000);
      const money = ctx === "save" || ctx === "deposit" || ctx === "rent";
      const mult = num(clean(t / 1000));
      const N = t * base;
      let answer: AnswerSpec;
      let value: number;
      let exactS: string;
      let rounded: boolean;
      let roundLine = "";
      if (money) {
        const cents = roundQ(N, 1000, 0);
        value = clean(cents / 100);
        answer = cashAnswer(cents);
        exactS = decStr(N, 100000, 5);
        rounded = N % 1000 !== 0;
        if (rounded) roundLine = `To the nearest cent: ${cash(cents)}.`;
      } else {
        value = roundQ(N, 1000, 2);
        answer = { type: "number", value };
        exactS = decStr(N, 1000, 4);
        rounded = N % 10 !== 0;
        if (rounded) roundLine = `To 2 decimal places: ${num(value)}.`;
      }
      const round = money ? " Give your answer to the nearest cent." : rounded ? " Give your answer to 2 decimal places." : "";
      let prompt: string;
      if (ctx === "plain") prompt = `Use a multiplier to work out ${pc(t)} of ${big(base)}.${round}`;
      else if (ctx === "field") prompt = `A farm has ${big(base)} m² of land. ${pc(t)} of it is used for growing vegetables. What area is that, in m²?${round}`;
      else if (ctx === "plant") prompt = `A sunflower was ${base} cm tall last month. Now it is ${pc(t)} of that height. How tall is it now, in cm?${round}`;
      else if (ctx === "save") prompt = `${name} earns ${cash(base)} a month and saves ${pc(t)} of it. How much does ${name} save each month?${round}`;
      else if (ctx === "deposit") prompt = `A piano costs ${cash(base)}. ${name} pays a deposit of ${pc(t)} of the price. How much is the deposit?${round}`;
      else prompt = `The monthly rent for an HDB flat was ${cash(base)}. The new rent is ${pc(t)} of the old rent. What is the new rent?${round}`;
      const fix = (n: number) => (money ? clean(roundQ(n, 1000, 0) / 100) : roundQ(n, 1000, 2));
      const trapList: Array<[number, string]> = [[fix(N * 10), `Check the multiplier: ${pc(t)} = ${mult}, not ${num(clean(t / 100))}.`]];
      if (t < 1000) {
        trapList.push([fix((1000 + t) * base), `That's the amount after a ${pc(t)} increase (× ${num(clean((1000 + t) / 1000))}). To find ${pc(t)} of it, multiply by ${mult}.`]);
      }
      return {
        prompt,
        answer,
        solution: [
          `${pc(t)} as a decimal is ${num(t / 10)} ÷ 100 = ${mult}.`,
          `${mult} × ${money ? dn(base) : num(base)} = ${exactS}${rounded ? "" : "."}`,
          ...(roundLine ? [roundLine] : []),
        ],
        hint: "Change the percentage to a decimal (divide by 100), then multiply.",
        traps: numTraps(value, trapList),
      };
    },
  },

  {
    id: "percentages.compare-by-percentage",
    topicId: TOPIC,
    title: "Compare two results using percentages",
    level: 2,
    guideRef: "one-as-percentage-of-another",
    generate(rng, tier) {
      const ctx = rng.pick(["tests", "schools", "discount", "shots"] as const);
      const bs = tier === 1 ? [10, 20, 25, 50, 40] : [8, 16, 20, 25, 40, 50, 80, 30, 60, 12, 24, 75];
      const lowF = ctx === "discount" ? 0.05 : 0.3;
      const highF = ctx === "discount" ? 0.6 : 0.97;
      let a1 = 34, b1 = 40, a2 = 42, b2 = 50, k1 = 1, k2 = 1, p1 = 85, p2 = 84;
      let ok = false;
      for (let i = 0; i < 400; i++) {
        b1 = tier === 3 ? rng.int(12, 90) : rng.pick(bs);
        b2 = tier === 3 ? rng.int(12, 90) : rng.pick(bs);
        if (b1 === b2) continue;
        a1 = rng.int(Math.ceil(lowF * b1), Math.floor(highF * b1));
        a2 = rng.int(Math.ceil(lowF * b2), Math.floor(highF * b2));
        if (a1 <= 0 || a2 <= 0 || a1 >= b1 || a2 >= b2) continue;
        const dp = tier === 1 ? 0 : 1;
        if (tier !== 3 && (!exactQ(100 * a1, b1, dp) || !exactQ(100 * a2, b2, dp))) continue;
        p1 = roundQ(100 * a1, b1, 1);
        p2 = roundQ(100 * a2, b2, 1);
        if (p1 === p2) continue;
        k1 = ctx === "discount" && b1 < 40 ? rng.pick([4, 5, 10]) : 1;
        k2 = ctx === "discount" && b2 < 40 ? rng.pick([4, 5, 10]) : 1;
        // Prefer cases where the bigger raw number has the SMALLER percentage.
        const misleading = (a1 * k1 - a2 * k2) * (p1 - p2) < 0;
        if (tier >= 2 && i < 300 && !misleading) continue;
        if (tier === 1 && i < 200 && !misleading && rng.bool(0.5)) continue;
        ok = true;
        break;
      }
      if (!ok) {
        a1 = 34; b1 = 40; a2 = 42; b2 = 50; k1 = 1; k2 = 1; p1 = 85; p2 = 84;
      }
      const r1 = a1 * k1, r2 = a2 * k2;
      const roundNote = tier === 3 ? " Give each to 1 decimal place where needed." : "";
      const name = rng.pick(NAMES);
      let L1: string, L2: string, prompt: string, verdict: string, raw1: string, raw2: string;
      if (ctx === "tests") {
        [L1, L2] = rng.shuffle(["maths", "science", "English", "geography", "history"]).slice(0, 2);
        prompt = `${name} scored ${a1} out of ${b1} in a ${L1} test and ${a2} out of ${b2} in a ${L2} test. Which was the better result?\n\nWrite each score as a percentage — ${L1} first, then ${L2}.${roundNote}`;
        verdict = `${p1 > p2 ? L1 : L2} was the better result`;
        raw1 = `${a1}`;
        raw2 = `${a2}`;
      } else if (ctx === "schools") {
        L1 = "Hillview";
        L2 = "Bayside";
        prompt = `At Hillview School, ${a1} of the ${b1} Year 8 students walk to school. At Bayside School, ${a2} of the ${b2} Year 8 students walk to school. Which school has the greater proportion of walkers?\n\nWrite each as a percentage — Hillview first, then Bayside.${roundNote}`;
        verdict = `${p1 > p2 ? L1 : L2} has the greater proportion of walkers`;
        raw1 = `${a1}`;
        raw2 = `${a2}`;
      } else if (ctx === "discount") {
        L1 = "Shop A";
        L2 = "Shop B";
        prompt = `Shop A takes ${cash(100 * r1)} off a jacket priced at ${cash(100 * b1 * k1)}. Shop B takes ${cash(100 * r2)} off a jacket priced at ${cash(100 * b2 * k2)}. Which shop gives the bigger percentage discount?\n\nWrite each discount as a percentage of the original price — Shop A first, then Shop B.${roundNote}`;
        verdict = `${p1 > p2 ? L1 : L2} gives the bigger percentage discount`;
        raw1 = cash(100 * r1);
        raw2 = cash(100 * r2);
      } else {
        L1 = "Jun";
        L2 = "Zara";
        prompt = `In basketball practice, Jun scores ${a1} of his ${b1} shots and Zara scores ${a2} of her ${b2} shots. Who has the better success rate?\n\nWrite each as a percentage — Jun first, then Zara.${roundNote}`;
        verdict = `${p1 > p2 ? L1 : L2} has the better success rate`;
        raw1 = `${a1}`;
        raw2 = `${a2}`;
      }
      const misleading = (r1 - r2) * (p1 - p2) < 0;
      const hiRaw = r1 > r2 ? raw1 : raw2;
      const loRaw = r1 > r2 ? raw2 : raw1;
      const cap = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
      return {
        prompt,
        answer: { type: "list", values: [p1, p2], ordered: true, display: `${num(p1)}%, ${num(p2)}%` },
        solution: [
          `${cap(L1)}: ${frac(r1, b1 * k1, { simplify: false })} × 100 = ${pctOfStr(100 * a1, b1, p1)}.`,
          `${cap(L2)}: ${frac(r2, b2 * k2, { simplify: false })} × 100 = ${pctOfStr(100 * a2, b2, p2)}.`,
          `${num(Math.max(p1, p2))}% is more than ${num(Math.min(p1, p2))}%, so ${verdict}${misleading ? ` — even though ${hiRaw} is more than ${loRaw}. The totals are different, so the raw numbers can't be compared directly.` : "."}`,
        ],
        hint: "The totals are different, so compare percentages (out of 100), not the raw numbers.",
        traps: [{ spec: { type: "list", values: [p2, p1], ordered: true }, feedback: `Right percentages, wrong order — give ${L1} first.` }],
      };
    },
  },

  {
    id: "percentages.increase-decrease-multiplier",
    topicId: TOPIC,
    title: "Increase or decrease by a percentage using a multiplier",
    level: 2,
    guideRef: "multipliers",
    generate(rng, tier) {
      const inc = rng.bool();
      if (rng.bool(0.35)) {
        // Write down the multiplier.
        let t: number;
        if (tier === 1) t = 50 * rng.int(1, 19);
        else if (tier === 2) t = 10 * (rng.bool(0.4) ? rng.int(1, 9) : rng.int(11, 99));
        else t = inc ? rng.pick([1500, 2000, 1200, 2500, 125, 175, 25, 5, 3000]) : rng.pick([125, 175, 25, 5, 75, 625, 375]);
        const after = inc ? 1000 + t : 1000 - t;
        const mult = clean(after / 1000);
        const trapList: Array<[number, string]> = inc
          ? [[clean(t / 1000), `× ${num(t / 1000)} only finds the increase. Keep the original 100% too: 1 + ${num(t / 1000)} = ${num(mult)}.`]]
          : [
              [clean(t / 1000), `× ${num(t / 1000)} finds the amount taken off. What is left is 100% − ${pc(t)} = ${pc(after)}.`],
              [clean((1000 + t) / 1000), "That multiplier would increase the amount. For a decrease the multiplier is less than 1."],
            ];
        if (inc && t < 100 && t % 10 === 0) trapList.push([clean(1 + t / 100), `${pc(t)} = ${num(t / 1000)}, so the multiplier is ${num(mult)}, not ${num(clean(1 + t / 100))}.`]);
        return {
          prompt: `What single number do you multiply by to ${inc ? "increase" : "decrease"} an amount by ${pc(t)}? Give your answer as a decimal.`,
          answer: { type: "number", value: mult, allowFraction: false },
          solution: [
            `After ${inc ? "an increase" : "a decrease"} of ${pc(t)} you have 100% ${inc ? "+" : "−"} ${pc(t)} = ${pc(after)} of the original.`,
            `${pc(after)} as a decimal is ${num(mult)}, so the multiplier is ${num(mult)}.`,
          ],
          hint: "Start from 100% (the original amount). Add or take away the percentage, then write the result as a decimal.",
          traps: numTraps(mult, trapList),
        };
      }

      // Apply the multiplier.
      const ctx = rng.pick(["plain", "money", "people", "rain"] as const);
      let t = 150;
      let A = ctx === "money" ? 8000 : 80; // cents for money, otherwise units
      let ok = false;
      for (let i = 0; i < 300; i++) {
        if (tier === 1) t = 50 * rng.int(1, inc ? 12 : 10);
        else if (tier === 2) t = 10 * rng.int(1, 60);
        else t = rng.bool() ? 10 * rng.int(1, 60) : 10 * rng.int(1, 40) + 5;
        if (ctx === "money") A = tier === 3 ? 5 * rng.int(100, 6000) : tier === 1 ? 2000 * rng.int(1, 40) : 100 * rng.int(5, 2000);
        else if (ctx === "people") A = tier === 1 ? 20 * rng.int(10, 60) : rng.int(150, 2500);
        else if (ctx === "rain") A = tier === 1 ? 20 * rng.int(5, 20) : rng.int(80, 450);
        else A = tier === 1 ? 20 * rng.int(2, 40) : rng.int(12, 2000);
        const N = A * (inc ? 1000 + t : 1000 - t); // answer = N / 1000 (in A's units)
        if ((ctx === "people" || tier === 1) && N % 1000 !== 0) continue;
        if (ctx !== "money" && N % 10 !== 0) continue;
        ok = true;
        break;
      }
      if (!ok) {
        t = 150;
        A = ctx === "money" ? 8000 : 80;
      }
      const money = ctx === "money";
      const after = inc ? 1000 + t : 1000 - t;
      const other = inc ? 1000 - t : 1000 + t;
      const mult = clean(after / 1000);
      const N = A * after;
      const rounded = money && N % 1000 !== 0;
      const val = (n: number) => (money ? clean(roundQ(n, 1000, 0) / 100) : clean(n / 1000));
      const value = val(N);
      const answer: AnswerSpec = money ? cashAnswer(roundQ(N, 1000, 0)) : { type: "number", value };
      const item = rng.pick(["bicycle", "school bag", "guitar", "board game", "desk lamp", "scooter"]);
      let prompt: string;
      if (ctx === "plain") prompt = `Use a multiplier to ${inc ? "increase" : "decrease"} ${big(A)} by ${pc(t)}.`;
      else if (ctx === "money")
        prompt = inc
          ? `A ${item} costs ${cash(A)}. Its price goes up by ${pc(t)}. What is the new price?${rounded ? " Give your answer to the nearest cent." : ""}`
          : `A ${item} costs ${cash(A)}. In a sale its price is cut by ${pc(t)}. What is the sale price?${rounded ? " Give your answer to the nearest cent." : ""}`;
      else if (ctx === "people") prompt = `A school had ${big(A)} students last year. This year the number ${inc ? "rose" : "fell"} by ${pc(t)}. How many students does it have now?`;
      else prompt = `In November, ${A} mm of rain fell in Singapore. In December, the rainfall was ${pc(t)} ${inc ? "higher" : "lower"}. How much rain fell in December, in mm?`;
      const steps = [
        `Multiplier: 100% ${inc ? "+" : "−"} ${pc(t)} = ${pc(after)} = ${num(mult)}.`,
        `${money ? dn(A) : num(A)} × ${num(mult)} = ${money ? decStr(N, 100000, 5) : decStr(N, 1000, 3)}${rounded ? "" : "."}`,
      ];
      if (rounded) steps.push(`To the nearest cent: ${cash(roundQ(N, 1000, 0))}.`);
      return {
        prompt,
        answer,
        solution: steps,
        hint: `${inc ? "An increase" : "A decrease"} of ${pc(t)} leaves you with what percentage of the original? Write that as a decimal and multiply.`,
        traps: numTraps(value, [
          [val(A * t), `That's only the ${inc ? "increase" : "decrease"}. ${inc ? "Add it to" : "Take it away from"} the original — or multiply by ${num(mult)} in one step.`],
          [val(A * other), `You ${inc ? "decreased" : "increased"} it. ${inc ? "An increase uses a multiplier bigger" : "A decrease uses a multiplier smaller"} than 1: ${num(mult)}.`],
        ]),
      };
    },
  },

  {
    id: "percentages.percentage-change",
    topicId: TOPIC,
    title: "Find a percentage increase or decrease",
    level: 2,
    guideRef: "percentage-change",
    generate(rng, tier) {
      const mode: "basic" | "absRel" | "points" =
        tier === 1 ? "basic" : tier === 2 ? (rng.bool(0.7) ? "basic" : "absRel") : rng.pick(["basic", "absRel", "points"] as const);

      if (mode === "points") {
        let r1 = 20, d = 5, up = true, ok = false;
        for (let i = 0; i < 200; i++) {
          r1 = rng.pick([2, 4, 5, 8, 10, 12, 15, 16, 20, 25, 30, 40, 50, 60]);
          up = rng.bool();
          const maxD = up ? Math.min(30, 99 - r1) : r1 - 1;
          d = rng.int(1, maxD);
          if (!exactQ(100 * d, r1, 1)) continue;
          ok = true;
          break;
        }
        if (!ok) {
          r1 = 20; d = 5; up = true;
        }
        const r2 = up ? r1 + d : r1 - d;
        const rel = clean((100 * d) / r1);
        const what =
          r1 <= 10 && rng.bool()
            ? `The interest rate on a savings account ${up ? "rises" : "falls"} from ${r1}% to ${r2}%.`
            : rng.pick([
                `The percentage of students at a school who cycle to school ${up ? "rose" : "fell"} from ${r1}% to ${r2}%.`,
                `The percentage of HDB blocks in a town with solar panels ${up ? "rose" : "fell"} from ${r1}% to ${r2}%.`,
                `The percentage of households that recycle their glass ${up ? "rose" : "fell"} from ${r1}% to ${r2}%.`,
              ]);
        const verb = up ? "rise" : "fall";
        return {
          prompt: `${what}\n\n(a) By how many percentage points did it ${verb}?\n\n(b) By what percentage did it ${verb}?\n\nGive (a) first, then (b).`,
          answer: { type: "list", values: [d, rel], ordered: true, display: `${d} percentage points, ${num(rel)}%` },
          solution: [
            `(a) Percentage points are a plain difference: ${up ? `${r2}% − ${r1}%` : `${r1}% − ${r2}%`} = ${d} percentage points.`,
            `(b) Compare the change with the original ${r1}%: ${frac(d, r1, { simplify: false })} × 100 = ${num(rel)}%.`,
            `So it ${up ? "rose" : "fell"} by ${d} percentage points, which is a ${num(rel)}% ${up ? "increase" : "decrease"}.`,
          ],
          hint: "Percentage points = the plain difference between the two percentages. Percentage change = that difference compared with the original.",
          traps: [
            { spec: { type: "list", values: [d, d], ordered: true }, feedback: `A change of ${d} percentage points is not a ${d}% change — divide the change by the original ${r1}% and multiply by 100.` },
            { spec: { type: "list", values: [rel, d], ordered: true }, feedback: "Right numbers, wrong order — give the percentage points first." },
          ],
        };
      }

      const inc = rng.bool();
      // Money is the only context for absRel; basic uses all four.
      const ctx = mode === "absRel" ? rng.pick(["money", "visitors"] as const) : rng.pick(["money", "visitors", "plain"] as const);
      // O and c are integers in base units; scale/format by context.
      let O = 40, c = 10, ok = false;
      const k = rng.pick([10, 100]);
      for (let i = 0; i < 400; i++) {
        if (tier === 1) {
          O = rng.pick([20, 25, 40, 50, 80, 200, 250, 400, 500, 60, 120]);
          c = rng.int(1, inc ? O : O - 1);
          if (!exactQ(100 * c, O, 0) || ((100 * c) / O) % 5 !== 0) continue;
        } else if (tier === 2 || mode === "absRel") {
          O = rng.int(12, 600);
          c = rng.int(1, inc ? O : O - 1);
          if (!exactQ(100 * c, O, 1)) continue;
        } else {
          O = rng.int(120, 900);
          c = rng.int(1, inc ? Math.floor(O * 0.8) : O - 1);
          if (exactQ(100 * c, O, 1)) continue; // tier 3 basic: a rounding question
        }
        if (!inc && c >= O) continue;
        ok = true;
        break;
      }
      if (!ok) {
        O = 40; c = 10;
      }
      const N = inc ? O + c : O - c;
      // tier 3 money is in cents (e.g. $2.40); otherwise whole dollars.
      const centsMode = ctx === "money" && tier === 3 && mode === "basic";
      const plainTenths = ctx === "plain" && tier === 3;
      const sh = (v: number) =>
        ctx === "money" ? cash(centsMode ? v : 100 * v) : ctx === "visitors" ? big(v * k) : plainTenths ? num(v / 10) : String(v);
      const cl = (v: number) =>
        ctx === "money" ? dn(centsMode ? v : 100 * v) : ctx === "visitors" ? String(v * k) : plainTenths ? num(v / 10) : String(v);
      const absVal = ctx === "money" ? (centsMode ? clean(c / 100) : c) : ctx === "visitors" ? c * k : plainTenths ? clean(c / 10) : c;
      const exact = exactQ(100 * c, O, 1);
      const pct = exact ? clean((100 * c) / O) : roundQ(100 * c, O, 1);
      const word = inc ? "increase" : "decrease";
      const item = rng.pick(["a cup of teh tarik", "a plate of roti prata", "a bowl of ice kacang", "a kaya toast set"]);
      const bigItem = rng.pick(["a bicycle", "a pair of headphones", "a desk", "a tablet"]);
      let what: string;
      if (ctx === "money") {
        const thing = centsMode ? item : bigItem;
        what = inc ? `The price of ${thing} rose from ${sh(O)} to ${sh(N)}.` : `In a sale, the price of ${thing} fell from ${sh(O)} to ${sh(N)}.`;
      } else if (ctx === "visitors") {
        what = `The number of visitors to a flower show ${inc ? "rose" : "fell"} from ${sh(O)} one year to ${sh(N)} the next year.`;
      } else {
        what = `A number ${inc ? "increases" : "decreases"} from ${sh(O)} to ${sh(N)}.`;
      }
      const changeLine = `Actual ${word} = ${inc ? `${cl(N)} − ${cl(O)}` : `${cl(O)} − ${cl(N)}`} = ${cl(c)}.`;
      const pctLine = `Percentage ${word} = ${word} ÷ original × 100 = {{${cl(c)}/${cl(O)}}} × 100 = ${pctOfStr(100 * c, O, pct)}.`;

      if (mode === "absRel" && absVal !== pct) {
        const unit = ctx === "money" ? "in dollars" : "(the number of visitors)";
        return {
          prompt: `${what}\n\nGive the actual ${word} ${unit} first, then the percentage ${word}.`,
          answer: { type: "list", values: [absVal, pct], ordered: true, display: `${sh(c)}, ${num(pct)}%` },
          solution: [changeLine, pctLine, `The actual ${word} has units; the percentage ${word} compares it with the original amount.`],
          hint: "The actual change is new − original (or original − new). For the percentage, divide that by the ORIGINAL and multiply by 100.",
          traps: [{ spec: { type: "list", values: [pct, absVal], ordered: true }, feedback: `Right numbers, wrong order — give the actual ${word} first.` }],
        };
      }

      const divNew = exactQ(100 * c, N, 1) ? clean((100 * c) / N) : roundQ(100 * c, N, 1);
      return {
        prompt: `${what} Find the percentage ${word}.${exact ? "" : " Give your answer to 1 decimal place."}`,
        answer: pctAnswer(pct),
        solution: [changeLine, pctLine],
        hint: "Find the actual change first. Then divide it by the ORIGINAL amount and multiply by 100.",
        traps: numTraps(pct, [
          [divNew, `You divided by the new value (${sh(N)}). Percentage change always compares with the original (${sh(O)}).`],
          [absVal, `${sh(c)} is the actual ${word}. Turn it into a percentage: divide by the original (${sh(O)}) and multiply by 100.`],
        ]),
      };
    },
  },

  {
    id: "percentages.gst-discount-profit",
    topicId: TOPIC,
    title: "GST, discounts, profit and loss",
    level: 2,
    guideRef: "money-percentages",
    generate(rng, tier) {
      const modes = tier === 3 ? (["gst", "discount", "profit", "service", "sell"] as const) : (["gst", "discount", "profit"] as const);
      const mode = rng.pick(modes);
      const name = rng.pick(NAMES);
      const nearest = " Give your answer to the nearest cent.";

      if (mode === "gst") {
        const Xc = tier === 1 ? 10000 * rng.int(1, 20) : tier === 2 ? 100 * rng.int(10, 600) : 10 * rng.int(100, 6000);
        const gstC = roundQ(Xc * 9, 100, 0);
        const totalC = Xc + gstC;
        const rounded = (Xc * 9) % 100 !== 0;
        const item = Xc >= 50000 ? rng.pick(["A laptop", "A bicycle", "A television", "A sofa"]) : rng.pick(["A pair of headphones", "A school bag", "A desk lamp", "A box of mooncakes", "A badminton racket"]);
        if (rng.bool(0.7)) {
          const steps = [`The price with GST is 100% + 9% = 109% of the price, so multiply by 1.09.`, `${dn(Xc)} × 1.09 = ${decStr(Xc * 109, 10000, 4)}${rounded ? "" : "."}`];
          if (rounded) steps.push(`To the nearest cent: ${cash(totalC)}.`);
          return {
            prompt: `${item} costs ${cash(Xc)} before GST. GST of 9% is added. How much does it cost including GST?${rounded ? nearest : ""}`,
            answer: cashAnswer(totalC),
            solution: steps,
            hint: "Adding 9% means you pay 109% of the price. What multiplier is that?",
            traps: numTraps(clean(totalC / 100), [
              [clean(gstC / 100), "That's just the GST. Add it to the price."],
              [clean((Xc + 900) / 100), "9% is not $9 — it is 9 cents in every dollar. Multiply by 1.09."],
            ]),
          };
        }
        const steps = [`9% as a decimal is 0.09.`, `${dn(Xc)} × 0.09 = ${decStr(Xc * 9, 10000, 4)}${rounded ? "" : "."}`];
        if (rounded) steps.push(`To the nearest cent: ${cash(gstC)}.`);
        return {
          prompt: `${item} costs ${cash(Xc)} before GST. How much GST (9%) is added to the price?${rounded ? nearest : ""}`,
          answer: cashAnswer(gstC),
          solution: steps,
          hint: "Find 9% of the price: multiply by 0.09.",
          traps: numTraps(clean(gstC / 100), [[clean(totalC / 100), "That's the full price including GST. The question asks only for the GST."]]),
        };
      }

      if (mode === "discount") {
        let t = 200, Xc = 8000, ok = false;
        for (let i = 0; i < 300; i++) {
          if (tier === 1) {
            t = 10 * rng.pick([10, 20, 25, 30, 40, 50]);
            Xc = 2000 * rng.int(1, 25);
          } else if (tier === 2) {
            t = 10 * rng.int(5, 70);
            Xc = 100 * rng.int(15, 500);
          } else {
            t = rng.bool() ? 10 * rng.int(5, 60) : rng.pick([125, 175, 225, 275, 375, 75, 25]);
            Xc = 5 * rng.int(300, 20000);
          }
          if ((Xc * (1000 - t)) % 1000 !== 0) continue; // sale price is a whole number of cents
          ok = true;
          break;
        }
        if (!ok) {
          t = 200; Xc = 8000;
        }
        const saleC = (Xc * (1000 - t)) / 1000;
        const saveC = Xc - saleC;
        const m = clean((1000 - t) / 1000);
        const item = rng.pick(["A jacket", "A pair of trainers", "A rice cooker", "A keyboard", "A suitcase", "A camera"]);
        const opener = `${item} is priced at ${cash(Xc)}. In the Great Singapore Sale it is ${pc(t)} off.`;
        if (rng.bool(0.7)) {
          return {
            prompt: `${opener} What is the sale price?`,
            answer: cashAnswer(saleC),
            solution: [`${pc(t)} off means you pay 100% − ${pc(t)} = ${pc(1000 - t)} of the price, so multiply by ${num(m)}.`, `${dn(Xc)} × ${num(m)} = ${dn(saleC)}.`],
            hint: `If ${pc(t)} is taken off, what percentage of the price do you still pay?`,
            traps: numTraps(clean(saleC / 100), [
              [clean(saveC / 100), "That's the amount you save. Take it off the original price."],
              [clean((Xc - 10 * t) / 100), `${pc(t)} off is not ${cash(10 * t)} off — work out ${pc(t)} of the price.`],
            ]),
          };
        }
        return {
          prompt: `${opener} How much money do you save?`,
          answer: cashAnswer(saveC),
          solution: [`You save ${pc(t)} of ${cash(Xc)}.`, `${num(t / 1000)} × ${dn(Xc)} = ${dn(saveC)}.`],
          hint: `The saving is ${pc(t)} of the original price.`,
          traps: numTraps(clean(saveC / 100), [[clean(saleC / 100), "That's the sale price. The question asks how much you save."]]),
        };
      }

      if (mode === "profit") {
        const isProfit = rng.bool(0.65);
        let C = 40, c = 10, ok = false; // whole dollars at tiers 1–2, cents at tier 3
        for (let i = 0; i < 400; i++) {
          if (tier === 1) {
            C = rng.pick([20, 25, 40, 50, 80, 200, 250, 400, 500]);
            c = rng.int(1, isProfit ? C : Math.floor(C * 0.6));
            if (!exactQ(100 * c, C, 0) || ((100 * c) / C) % 5 !== 0) continue;
          } else if (tier === 2) {
            C = rng.int(10, 500);
            c = rng.int(1, isProfit ? C : Math.floor(C * 0.6));
            if (!exactQ(100 * c, C, 1)) continue;
          } else {
            C = 10 * rng.int(50, 2000);
            c = 10 * rng.int(1, Math.floor((C / 10) * (isProfit ? 0.8 : 0.6)));
          }
          if (c <= 0 || (!isProfit && c >= C)) continue;
          ok = true;
          break;
        }
        if (!ok) {
          C = 40; c = 10;
        }
        const toC = (v: number) => (tier === 3 ? v : 100 * v);
        const S = isProfit ? C + c : C - c;
        const exact = exactQ(100 * c, C, 1);
        const pct = exact ? clean((100 * c) / C) : roundQ(100 * c, C, 1);
        const word = isProfit ? "profit" : "loss";
        const ctx = rng.pick([
          `${name} buys a second-hand bicycle for ${cash(toC(C))} and later sells it for ${cash(toC(S))}.`,
          `A market stall buys a box of mangoes for ${cash(toC(C))} and sells all the mangoes for ${cash(toC(S))} in total.`,
          `The school craft club spends ${cash(toC(C))} making candles and sells them all for ${cash(toC(S))}.`,
        ]);
        const divSell = exactQ(100 * c, S, 1) ? clean((100 * c) / S) : roundQ(100 * c, S, 1);
        return {
          prompt: `${ctx} Find the percentage ${word}.${exact ? "" : " Give your answer to 1 decimal place."}`,
          answer: pctAnswer(pct),
          solution: [
            `${isProfit ? "Profit" : "Loss"} = ${isProfit ? `${dn(toC(S))} − ${dn(toC(C))}` : `${dn(toC(C))} − ${dn(toC(S))}`} = ${dn(toC(c))}.`,
            `Percentage ${word} = ${word} ÷ cost price × 100 = {{${dn(toC(c))}/${dn(toC(C))}}} × 100 = ${pctOfStr(100 * c, C, pct)}.`,
          ],
          hint: `Profit and loss are always compared with the cost price (what was paid at the start).`,
          traps: numTraps(pct, [
            [divSell, `You divided by the selling price. Percentage ${word} compares the ${word} with the cost price (${cash(toC(C))}).`],
            [tier === 3 ? clean(c / 100) : c, `${cash(toC(c))} is the actual ${word}. Now write it as a percentage of the cost price.`],
          ]),
        };
      }

      if (mode === "service") {
        const X = rng.int(20, 400);
        const totalC = roundQ(X * 1199, 10, 0);
        const exact = (X * 1199) % 10 === 0;
        return {
          prompt: `A family's vegetarian dinner at a restaurant comes to ${cash(100 * X)} on the menu. The restaurant adds a 10% service charge, then adds 9% GST to the new total. How much is the final bill?${nearest}`,
          answer: cashAnswer(totalC),
          solution: [
            `Add the service charge: ${X} × 1.1 = ${dn(110 * X)}.`,
            `Add GST to that total: ${dn(110 * X)} × 1.09 = ${decStr(X * 1199, 1000, 3)}${exact ? "." : ""}`,
            `To the nearest cent: ${cash(totalC)}. (In one step: 1.1 × 1.09 = 1.199.)`,
          ],
          hint: "Apply the two increases one after the other: × 1.1, then × 1.09.",
          traps: numTraps(clean(totalC / 100), [
            [clean((119 * X) / 100), "You added 10% + 9% = 19%. But GST is charged on the bill after the service charge is added, so multiply by 1.1 and then by 1.09."],
          ]),
        };
      }

      // sell: selling price from a profit / loss percentage
      const isProfit = rng.bool(0.6);
      let t = 200, C = 50, ok = false;
      for (let i = 0; i < 300; i++) {
        t = rng.bool() ? 10 * rng.int(5, isProfit ? 80 : 60) : rng.pick([125, 175, 225, 375, 75]);
        C = rng.int(20, 800);
        if ((C * (isProfit ? 1000 + t : 1000 - t)) % 10 !== 0) continue; // whole cents
        ok = true;
        break;
      }
      if (!ok) {
        t = 200; C = 50;
      }
      const after = isProfit ? 1000 + t : 1000 - t;
      const Sc = (C * after) / 10;
      const m = clean(after / 1000);
      const prompt = isProfit
        ? `A fruit seller buys a crate of durians for ${cash(100 * C)} and wants to make a ${pc(t)} profit. For how much should the seller sell the whole crate?`
        : `${name} bought a used keyboard for ${cash(100 * C)} and sold it at a ${pc(t)} loss. How much did ${name} sell it for?`;
      return {
        prompt,
        answer: cashAnswer(Sc),
        solution: [`Selling price = 100% ${isProfit ? "+" : "−"} ${pc(t)} = ${pc(after)} of the cost price, so multiply by ${num(m)}.`, `${C} × ${num(m)} = ${dn(Sc)}.`],
        hint: `A ${pc(t)} ${isProfit ? "profit" : "loss"} means the selling price is what percentage of the cost price?`,
        traps: numTraps(clean(Sc / 100), [[clean((C * t) / 1000), `That's only the ${isProfit ? "profit" : "loss"}. ${isProfit ? "Add it to" : "Take it away from"} the cost price.`]]),
      };
    },
  },

  {
    id: "percentages.simple-interest",
    topicId: TOPIC,
    title: "Simple interest",
    level: 2,
    guideRef: "money-percentages",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const P = tier === 1 ? 100 * rng.int(2, 50) : 50 * rng.int(6, 240); // dollars
      const rt = tier === 1 ? 10 * rng.int(1, 8) : rng.pick([15, 20, 25, 30, 35, 40, 45, 50, 55]); // rate in tenths of a per cent
      const T = rng.int(2, tier === 1 ? 6 : 8);
      const Ic = (P * rt * T) / 10; // interest in cents (P is a multiple of 50, so this is whole)
      const perYearC = (P * rt) / 10;
      const R = num(rt / 10);
      const mode = tier === 3 ? rng.pick(["years", "rate", "total", "interest"] as const) : rng.pick(["interest", "total"] as const);
      const formula = "Simple interest: {{I = (PRT)/100}}, where P is the amount invested, R the rate per year and T the number of years.";
      const calc = `I = {{(${P} * ${R} * ${T})/100}} = ${dn(Ic)}.`;

      if (mode === "interest") {
        return {
          prompt: `${name} puts ${cash(100 * P)} into a savings account that pays ${R}% simple interest per year. How much interest does ${name} earn in ${T} years?`,
          answer: cashAnswer(Ic),
          solution: [formula, calc, `(Each year earns ${R}% of ${P} = ${dn(perYearC)}, and ${T} × ${dn(perYearC)} = ${dn(Ic)}.)`],
          hint: "Find one year's interest first. Simple interest is the same every year.",
          traps: numTraps(clean(Ic / 100), [
            [clean(perYearC / 100), `That's the interest for one year. Multiply by ${T} years.`],
            [clean((100 * P + Ic) / 100), "That's the total in the account. The question asks only for the interest."],
          ]),
        };
      }
      if (mode === "total") {
        const totalC = 100 * P + Ic;
        const compC = roundBig(BigInt(100 * P) * (1000n + BigInt(rt)) ** BigInt(T), 1000n ** BigInt(T), 0);
        return {
          prompt: `${name} invests ${cash(100 * P)} at ${R}% per year simple interest. How much is in the account after ${T} years?`,
          answer: cashAnswer(totalC),
          solution: [formula, calc, `Amount after ${T} years = ${P} + ${dn(Ic)} = ${dn(totalC)}.`],
          hint: "Work out the interest, then add it to the amount invested.",
          traps: numTraps(clean(totalC / 100), [
            [clean(Ic / 100), `That's just the interest. Add it to the ${cash(100 * P)} invested.`],
            [clean(compC / 100), "That's compound interest. Simple interest is always worked out on the original amount, so it is the same every year."],
          ]),
        };
      }
      if (mode === "years") {
        return {
          prompt: `${name} invests ${cash(100 * P)} at ${R}% per year simple interest. How many years will it take to earn ${cash(Ic)} in interest?`,
          answer: { type: "number", value: T, display: `${T} years` },
          solution: [`Interest each year = ${R}% of ${P} = ${num(rt / 1000)} × ${P} = ${dn(perYearC)}.`, `Number of years = ${dn(Ic)} ÷ ${dn(perYearC)} = ${T}.`],
          hint: "How much interest is earned in ONE year? How many of those make the total interest?",
        };
      }
      return {
        prompt: `${name} invests ${cash(100 * P)} for ${T} years at simple interest and earns ${cash(Ic)} in interest. What is the interest rate per year, as a percentage?`,
        answer: pctAnswer(clean(rt / 10)),
        solution: [`Interest each year = ${dn(Ic)} ÷ ${T} = ${dn(perYearC)}.`, `As a percentage of ${P}: {{${dn(perYearC)}/${P}}} × 100 = ${R}%.`],
        hint: "Find the interest for one year, then write it as a percentage of the amount invested.",
        traps: numTraps(clean(rt / 10), [[clean((rt * T) / 10), `That's the total percentage over all ${T} years. Divide by ${T} to get the rate per year.`]]),
      };
    },
  },

  // ------------------------------------------------------------------ L3
  {
    id: "percentages.reverse-percentages",
    topicId: TOPIC,
    title: "Find the original amount (reverse percentages)",
    level: 3,
    guideRef: "reverse-percentages",
    generate(rng, tier) {
      const mode =
        tier === 1
          ? rng.pick(["pctOf", "discount"] as const)
          : rng.pick(tier === 2 ? (["discount", "increase", "gst", "pctOf"] as const) : (["discount", "increase", "gst"] as const));
      const name = rng.pick(NAMES);

      if (mode === "pctOf") {
        let t = 300, O = 70, ok = false;
        for (let i = 0; i < 300; i++) {
          t = tier === 1 ? 10 * rng.pick([10, 20, 25, 30, 40, 75, 15, 60, 5]) : 10 * rng.int(3, 95);
          O = tier === 1 ? 10 * rng.int(2, 60) : rng.int(20, 800);
          const N = O * t; // Y = N / 1000
          if (tier === 1 && N % 1000 !== 0) continue;
          if (N % 10 !== 0) continue;
          ok = true;
          break;
        }
        if (!ok) {
          t = 300; O = 70;
        }
        const Y = clean((O * t) / 1000);
        return {
          prompt: `${pc(t)} of a number is ${num(Y)}. What is the number?`,
          answer: { type: "number", value: O },
          solution: [
            `${pc(t)} → ${num(Y)}.`,
            `1% → ${num(Y)} ÷ ${num(t / 10)} = ${num(clean(O / 100))}.`,
            `100% → ${num(clean(O / 100))} × 100 = ${O}. (Or in one step: ${num(Y)} ÷ ${num(t / 1000)} = ${O}.)`,
          ],
          hint: `${num(Y)} is ${pc(t)} of the number. What is 1% of it? What is 100%?`,
          traps: numTraps(O, [[roundQ(O * t * t, 1000000, 2), `You found ${pc(t)} of ${num(Y)}. But ${num(Y)} is already ${pc(t)} of the number — work backwards.`]]),
        };
      }

      if (mode === "gst") {
        const O = tier === 2 ? rng.int(10, 400) : rng.int(10, 2000); // dollars before GST
        const Nc = 109 * O; // cents with GST
        const item = rng.pick(["pair of trainers", "rice cooker", "printer", "bookshelf", "set of paints"]);
        return {
          prompt: `A ${item} costs ${cash(Nc)} including 9% GST. What was the price before GST was added?`,
          answer: cashAnswer(100 * O),
          solution: [
            "The price with GST is 100% + 9% = 109% of the price before GST, so: price before GST × 1.09 = price with GST.",
            `Price before GST = ${dn(Nc)} ÷ 1.09 = ${O}.`,
            `Check: ${O} × 1.09 = ${dn(Nc)}.`,
          ],
          hint: "The price with GST is 109% of the original. Undo the multiplier by dividing.",
          traps: numTraps(O, [[clean(roundQ(Nc * 91, 100, 0) / 100), `You took 9% off ${cash(Nc)}. But the 9% was added to the SMALLER, original price — divide by 1.09 instead.`]]),
        };
      }

      const isDiscount = mode === "discount";
      let t = 200, O = 80, ok = false;
      for (let i = 0; i < 300; i++) {
        if (tier === 1) {
          t = 10 * rng.pick([10, 20, 25, 30, 40, 50]);
          O = 10 * rng.int(2, 30);
        } else if (tier === 2) {
          t = 10 * rng.int(5, isDiscount ? 60 : 40);
          O = isDiscount ? rng.int(15, 500) : rng.int(1500, 6000);
        } else {
          t = rng.bool() ? 10 * rng.int(5, isDiscount ? 60 : 40) : rng.pick([125, 175, 225, 275, 375, 75, 25]);
          O = isDiscount ? rng.int(15, 800) : rng.int(1500, 6000);
        }
        const after = isDiscount ? 1000 - t : 1000 + t;
        if ((O * after) % 10 !== 0) continue; // whole cents
        if (tier === 1 && (O * after) % 1000 !== 0) continue; // whole dollars at tier 1
        ok = true;
        break;
      }
      if (!ok) {
        t = 200; O = 80;
      }
      const after = isDiscount ? 1000 - t : 1000 + t;
      const m = clean(after / 1000);
      const Sc = (O * after) / 10; // cents after the change
      if (isDiscount) {
        const item = rng.pick(["a pair of trainers", "a school bag", "a jacket", "a keyboard", "a bicycle helmet", "a pair of headphones"]);
        const prompt = rng.bool()
          ? `In a sale, everything is ${pc(t)} off. ${name} pays ${cash(Sc)} for ${item}. What was the price before the sale?`
          : `${name} buys ${item} for ${cash(Sc)} after a ${pc(t)} discount. What was the original price?`;
        return {
          prompt,
          answer: cashAnswer(100 * O),
          solution: [
            `After ${pc(t)} off, the sale price is 100% − ${pc(t)} = ${pc(after)} of the original, so original × ${num(m)} = ${dn(Sc)}.`,
            `Original = ${dn(Sc)} ÷ ${num(m)} = ${O}.`,
            `Check: ${O} × ${num(m)} = ${dn(Sc)}.`,
          ],
          hint: `The sale price is ${pc(after)} of the original price. Undo the multiplier by dividing.`,
          traps: numTraps(O, [
            [clean(roundQ(Sc * (1000 + t), 1000, 0) / 100), `You added ${pc(t)} of the sale price. The ${pc(t)} was taken off the original price, which is bigger — divide by ${num(m)} instead.`],
            [clean(roundQ(Sc * 1000, t, 0) / 100), `The sale price is ${pc(after)} of the original, not ${pc(t)} — divide by ${num(m)}.`],
          ]),
        };
      }
      return {
        prompt: `After a ${pc(t)} pay rise, ${name} earns ${cash(Sc)} a month. How much did ${name} earn each month before the pay rise?`,
        answer: cashAnswer(100 * O),
        solution: [
          `After the rise, the pay is 100% + ${pc(t)} = ${pc(after)} of the old pay, so old pay × ${num(m)} = ${dn(Sc)}.`,
          `Old pay = ${dn(Sc)} ÷ ${num(m)} = ${O}.`,
          `Check: ${O} × ${num(m)} = ${dn(Sc)}.`,
        ],
        hint: `The new pay is ${pc(after)} of the old pay. Undo the multiplier by dividing.`,
        traps: numTraps(O, [
          [clean(roundQ(Sc * (1000 - t), 1000, 0) / 100), `You took ${pc(t)} off the new pay. The rise was ${pc(t)} of the OLD (smaller) pay — divide by ${num(m)} instead.`],
        ]),
      };
    },
  },

  {
    id: "percentages.repeated-change",
    topicId: TOPIC,
    title: "Compound interest and repeated percentage change",
    level: 3,
    guideRef: "repeated-change",
    generate(rng, tier) {
      const mode = rng.pick(["compound", "depreciate", "successive"] as const);
      const name = rng.pick(NAMES);

      if (mode === "compound") {
        const rt = tier === 1 ? 10 * rng.pick([10, 5, 20, 4, 2]) : tier === 2 ? rng.pick([20, 30, 40, 50, 60, 25, 15, 35]) : rng.pick([15, 25, 35, 45, 32, 28, 18]);
        const P = tier === 1 ? 100 * rng.int(5, 50) : 50 * rng.int(10, tier === 2 ? 200 : 400);
        const n = tier === 1 ? rng.int(2, 3) : tier === 2 ? rng.int(2, 5) : rng.int(3, 8);
        const num1 = BigInt(P) * (1000n + BigInt(rt)) ** BigInt(n);
        const den = 1000n ** BigInt(n);
        const cents = roundBig(num1 * 100n, den, 0);
        const exact = (num1 * 100n) % den === 0n;
        const m = clean((1000 + rt) / 1000);
        const simpleC = 100 * P + (P * rt * n) / 10;
        return {
          prompt: `${name} puts ${cash(100 * P)} into a savings account that pays ${pc(rt)} compound interest per year. How much is in the account after ${n} years? Give your answer to the nearest cent.`,
          answer: cashAnswer(cents),
          solution: [
            `Each year the amount is multiplied by 100% + ${pc(rt)} = ${num(m)}.`,
            `After ${n} years: ${P} × {{${num(m)}^${n}}} = ${bigDec(num1, den, 4)}${exact ? "." : ""}`,
            exact ? `So the account holds ${cash(cents)}.` : `To the nearest cent: ${cash(cents)}.`,
          ],
          hint: `Each year's interest is added on and then earns interest too. Multiply by ${num(m)} once for every year.`,
          traps: numTraps(clean(cents / 100), [
            [clean(simpleC / 100), "That's simple interest. With compound interest each year's interest is added on, and then earns interest itself."],
            [clean((cents - 100 * P) / 100), "That's only the interest earned. The question asks how much is in the account."],
          ]),
        };
      }

      if (mode === "depreciate") {
        const rt = tier === 1 ? 10 * rng.pick([10, 20, 5]) : tier === 2 ? rng.pick([150, 120, 80, 250, 100, 200]) : rng.pick([125, 175, 85, 65, 225]);
        const n = tier === 1 ? rng.int(2, 3) : rng.int(2, 5);
        const thing = rng.pick([
          { what: "A car", V: 1000 * rng.int(40, 150) },
          { what: "A laptop", V: 100 * rng.int(8, 40) },
          { what: "A motorbike", V: 500 * rng.int(10, 40) },
        ]);
        const V = thing.V;
        const num1 = BigInt(V) * (1000n - BigInt(rt)) ** BigInt(n);
        const den = 1000n ** BigInt(n);
        const dollars = roundBig(num1, den, 0);
        const exact = num1 % den === 0n;
        const m = clean((1000 - rt) / 1000);
        const trapList: Array<[number, string]> = [];
        if (n * rt < 1000) {
          trapList.push([roundQ(V * (1000 - n * rt), 1000, 0), `You took ${n} × ${pc(rt)} off the original price. Each year's fall is ${pc(rt)} of the NEW, lower value, so multiply by ${num(m)} each year.`]);
        }
        return {
          prompt: `${thing.what} is bought for ${cash(100 * V)}. Its value falls by ${pc(rt)} each year. What is it worth after ${n} years? Give your answer to the nearest dollar.`,
          answer: cashAnswer(100 * dollars),
          solution: [
            `Each year the value is multiplied by 100% − ${pc(rt)} = ${num(m)}.`,
            `After ${n} years: ${V} × {{${num(m)}^${n}}} = ${bigDec(num1, den, 4)}${exact ? "." : ""}`,
            exact ? `So it is worth ${cash(100 * dollars)}.` : `To the nearest dollar: ${cash(100 * dollars)}.`,
          ],
          hint: `Each year the value is ${pc(1000 - rt)} of the year before. Multiply by ${num(m)} once for every year.`,
          traps: numTraps(dollars, trapList),
        };
      }

      // successive changes
      const pick = () => (tier === 1 ? rng.pick([10, 20, 25, 50]) : tier === 2 ? 5 * rng.int(1, 12) : rng.int(1, 60));
      const shape = rng.pick(["upDown", "upDown", "downUp", "upUp", "downDown"] as const);
      const s1 = shape === "upDown" || shape === "upUp" ? 1 : -1;
      const s2 = shape === "downUp" || shape === "upUp" ? 1 : -1;
      const a = pick();
      const b = pick();
      const f1 = 100 + s1 * a;
      const f2 = 100 + s2 * b;
      const overall = clean((f1 * f2 - 10000) / 100);
      const M = clean((f1 * f2) / 10000);
      const m1 = num(clean(f1 / 100));
      const m2 = num(clean(f2 / 100));
      const ch = (s: number, x: number) => (s > 0 ? `increased by ${x}%` : `decreased by ${x}%`);
      const what = rng.pick([
        `The price of a games console is ${ch(s1, a)}. A month later, the new price is ${ch(s2, b)}.`,
        `The number of members in a school robotics CCA is ${ch(s1, a)} one year, and the new number is ${ch(s2, b)} the next year.`,
        `${name}'s savings are ${ch(s1, a)} in January. In February, the new amount is ${ch(s2, b)}.`,
      ]);
      const verdict =
        overall < 0
          ? `${num(M)} is ${pc(M * 1000)} of the original, so the overall change is ${num(overall)}% (a ${num(-overall)}% decrease).`
          : overall > 0
            ? `${num(M)} is ${pc(M * 1000)} of the original, so the overall change is +${num(overall)}% (an increase).`
            : `The overall multiplier is exactly 1, so there is no overall change: 0%.`;
      return {
        prompt: `${what} Find the overall percentage change. Write a decrease as a negative number (for example, −4 for a 4% decrease).`,
        answer: {
          type: "number",
          value: overall,
          display: overall < 0 ? `${num(overall)}% (a ${num(-overall)}% decrease)` : overall > 0 ? `${num(overall)}% (an increase)` : "0% (no change)",
        },
        solution: [`The multipliers are ${m1} and ${m2}. The second change acts on the new amount, so multiply them.`, `Overall multiplier: ${m1} × ${m2} = ${num(M)}.`, verdict],
        hint: "Write each change as a multiplier, then multiply the multipliers together. Don't add the percentages.",
        traps: numTraps(overall, [[s1 * a + s2 * b, `You added the percentages. The second change is a percentage of the NEW amount, so multiply the multipliers: ${m1} × ${m2} = ${num(M)}.`]]),
      };
    },
  },
];
