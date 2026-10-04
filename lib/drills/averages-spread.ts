// Procedural skill drills for "Averages, Range & Comparing Data" (averages-spread).
//
// Every data value is an integer number of "units" (shown as units ÷ scale, so
// 134 tenths → 13.4). Totals and medians are therefore exact; rounding uses
// integer arithmetic and exact …5 ties are rejected so "1 d.p." is never ambiguous.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { num, clean, br, ordinal } from "./helpers.ts";

const T = "averages-spread";

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"];

const sum = (xs: readonly number[]) => xs.reduce((a, b) => a + b, 0);
/** Small counts as a capitalised word for the start of a sentence: 4 → "Four". */
const Count = (n: number) => ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"][n] ?? String(n);
const asc = (xs: readonly number[]) => [...xs].sort((a, b) => a - b);

/** Units → display string (134, 10 → "13.4"). */
const show = (u: number, scale = 1) => num(clean(u / scale));
/** Data value: tenths are always shown to 1 d.p. (43.0, not 43) so a list looks consistent. */
const showD = (u: number, scale = 1) => (scale === 10 ? num(clean(u / 10)).replace(/^(−?\d+)$/, "$1.0") : show(u, scale));
const listOf = (us: readonly number[], scale = 1) => us.map((u) => showD(u, scale)).join(", ");

/** "4 − 2 + 5" — a readable running total. */
function sumExpr(us: readonly number[], scale = 1): string {
  return us.map((u, i) => (i === 0 ? showD(u, scale) : u < 0 ? `− ${showD(-u, scale)}` : `+ ${showD(u, scale)}`)).join(" ");
}

/** n ÷ d (integers, d > 0) is a terminating decimal with at most dp decimal places. */
const exactTo = (n: number, d: number, dp: number) => (n * 10 ** dp) % d === 0;

/** n ÷ d rounded half-up (away from zero) to dp places, with integer arithmetic. */
function divRound(n: number, d: number, dp: number): number {
  const f = 10 ** dp;
  const q = Math.floor((2 * Math.abs(n) * f + d) / (2 * d));
  return clean((n < 0 ? -q : q) / f);
}

/** A value rounded to 1 d.p., always showing the decimal: 6 → "6.0". */
const d1 = (v: number) => v.toFixed(1).replace(/^-/, "−");

/** n ÷ d truncated to dp places (for "45.666…" in worked solutions). */
function divTrunc(n: number, d: number, dp: number): number {
  const f = 10 ** dp;
  const q = Math.floor((Math.abs(n) * f) / d);
  return clean((n < 0 ? -q : q) / f);
}

/** Rounding n ÷ d to dp places would land exactly on a …5 tie. */
const isTie = (n: number, d: number, dp: number) => {
  const f = 10 ** dp;
  return (2 * n * f) % d === 0 && (n * f) % d !== 0;
};

/** Median of integer units (may be a half-unit). */
function medianU(us: readonly number[]): number {
  const s = asc(us);
  const n = s.length;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

function ints(rng: Rng, n: number, lo: number, hi: number): number[] {
  return Array.from({ length: n }, () => rng.int(lo, hi));
}

/** n distinct integers from [lo, hi] in random order. */
function distinctInts(rng: Rng, n: number, lo: number, hi: number): number[] {
  const pool: number[] = [];
  for (let v = lo; v <= hi; v++) pool.push(v);
  return rng.shuffle(pool).slice(0, n);
}

/** Bounded rejection loop: keep calling make() until it returns a value. */
function attempt<X>(make: () => X | null, fallback: X): X {
  for (let i = 0; i < 400; i++) {
    const x = make();
    if (x !== null) return x;
  }
  return fallback;
}

/** Number traps: dropped if missing, untidy (> 2 d.p.), equal to the answer or repeated. */
function numTraps(answer: number, cands: Array<[number | null, string]>): Trap[] {
  const out: Trap[] = [];
  const used: number[] = [answer];
  for (const [raw, feedback] of cands) {
    if (raw === null || !Number.isFinite(raw)) continue;
    const v = clean(raw);
    if (Math.abs(v * 100 - Math.round(v * 100)) > 1e-6) continue;
    if (used.some((u) => Math.abs(u - v) < 1e-9)) continue;
    used.push(v);
    out.push({ spec: { type: "number", value: v }, feedback });
  }
  return out;
}

type Avg = "mean" | "median" | "mode";
const avgAccept = (w: Avg) => (w === "mode" ? ["mode", "the mode", "modal"] : [w, `the ${w}`]);
const avgAnswer = (w: Avg): AnswerSpec => ({ type: "text", accept: avgAccept(w), display: `the ${w}` });
const avgTrap = (w: Avg, feedback: string): Trap => ({ spec: { type: "text", accept: avgAccept(w) }, feedback });

// Contexts for ungrouped frequency tables (x = consecutive whole numbers).
interface FreqCtx {
  head: string;
  what: string;
  noun: string;
  x0: number[];
  k: number[];
}
const FREQ_CTX: FreqCtx[] = [
  { head: "Number of siblings", what: "the number of siblings of each pupil in a class", noun: "number of siblings", x0: [0], k: [4, 5] },
  { head: "Books read", what: "how many books each member of a reading club read during the holidays", noun: "number of books read", x0: [0, 1, 2], k: [4, 5, 6] },
  { head: "Goals scored", what: "the number of goals a futsal team scored in each match of a season", noun: "number of goals per match", x0: [0], k: [4, 5, 6] },
  { head: "Score on the dice", what: "the scores when a dice was rolled many times", noun: "score", x0: [1], k: [6] },
  { head: "Number of pets", what: "the number of pets owned by each pupil in Year 8", noun: "number of pets", x0: [0], k: [4, 5] },
  { head: "People in the car", what: "the number of people in each car arriving at a car park", noun: "number of people per car", x0: [1], k: [4, 5] },
  { head: "MRT trips", what: "how many MRT trips each pupil in a CCA group made last weekend", noun: "number of MRT trips", x0: [0, 1], k: [5, 6] },
];

function freqTable(head: string, xs: readonly number[], fs: readonly number[], hide = -1): string {
  return `| ${head} | Frequency |\n|---|---|\n` + xs.map((x, i) => `| ${num(x)} | ${i === hide ? "{{k}}" : fs[i]} |`).join("\n");
}

/** Frequencies for a table: tier 2 may contain one zero (never at either end). */
function freqs(rng: Rng, k: number, tier: 1 | 2 | 3): number[] | null {
  const fs = ints(rng, k, tier === 2 ? 0 : 1, tier === 1 ? 9 : tier === 2 ? 12 : 15);
  if (fs[0] === 0 || fs[k - 1] === 0 || fs.filter((f) => f === 0).length > 1) return null;
  return fs;
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ── Mean of a list ─────────────────────────────────────────────────────
  {
    id: `${T}.mean-of-list`,
    topicId: T,
    title: "Find the mean of a list",
    level: 1,
    guideRef: "mean-median-mode-range",
    generate(rng, tier) {
      type V = { us: number[]; scale: number; lead: string; ask: string; dp: number };
      const kind = rng.pick(
        tier === 1 ? ["plain", "spelling", "books"] : tier === 2 ? ["temps", "minutes", "mixed"] : ["race", "visitors", "level"],
      );
      const name = rng.pick(NAMES);
      const v = attempt<V>(() => {
        if (kind === "plain" || kind === "spelling" || kind === "books") {
          const n = rng.int(4, 6);
          const us = kind === "plain" ? ints(rng, n, 2, 20) : kind === "spelling" ? ints(rng, n, 8, 20) : ints(rng, n, 1, 15);
          if (sum(us) % n !== 0 || new Set(us).size < 3) return null;
          if (kind === "plain") return { us, scale: 1, lead: `Find the mean of ${listOf(us)}.`, ask: "", dp: -1 };
          if (kind === "spelling") return { us, scale: 1, lead: `${name} scored these marks (out of 20) in ${n} spelling tests:\n\n${listOf(us)}`, ask: "Find the mean mark.", dp: -1 };
          return { us, scale: 1, lead: `The numbers of books read last term by ${n} members of a book club were:\n\n${listOf(us)}`, ask: "Find the mean number of books.", dp: -1 };
        }
        if (kind === "temps" || kind === "mixed") {
          const n = rng.pick([4, 5, 6, 8]);
          const us = kind === "temps" ? ints(rng, n, -9, 9) : ints(rng, n, -12, 20);
          const S = sum(us);
          if (!us.some((u) => u < 0) || !us.some((u) => u > 0) || S === 0 || !exactTo(S, n, 2) || new Set(us).size < 3) return null;
          if (kind === "temps") return { us, scale: 1, lead: `The temperatures (°C) at midnight in a mountain village on ${n} nights were:\n\n${listOf(us)}`, ask: "Find the mean temperature in °C.", dp: -1 };
          return { us, scale: 1, lead: `Find the mean of these numbers:\n\n${listOf(us)}`, ask: "", dp: -1 };
        }
        if (kind === "minutes") {
          const n = rng.pick([4, 5, 8]);
          const us = ints(rng, n, 15, 60);
          if (!exactTo(sum(us), n, 2) || new Set(us).size < 3) return null;
          return { us, scale: 1, lead: `${name} practised the piano for these numbers of minutes on ${n} days:\n\n${listOf(us)}`, ask: "Find the mean time in minutes.", dp: -1 };
        }
        if (kind === "race") {
          const n = rng.pick([4, 5]);
          const us = ints(rng, n, 118, 165);
          if (!exactTo(sum(us), n * 10, 2) || new Set(us).size < 3) return null;
          return { us, scale: 10, lead: `The times (seconds) of ${n} runners in a 100 m race were:\n\n${listOf(us, 10)}`, ask: "Find the mean time in seconds.", dp: -1 };
        }
        if (kind === "visitors") {
          const n = rng.pick([6, 7]);
          const us = ints(rng, n, 20, 95);
          const S = sum(us);
          if (exactTo(S, n, 1) || isTie(S, n, 1)) return null;
          return { us, scale: 1, lead: `The numbers of customers at a hawker stall in each of ${n} hours were:\n\n${listOf(us)}`, ask: "Find the mean number of customers per hour. Give your answer to 1 decimal place.", dp: 1 };
        }
        // level: decimals with negatives
        const n = rng.pick([4, 5]);
        const us = ints(rng, n, -45, 45);
        const S = sum(us);
        if (!us.some((u) => u < 0) || !us.some((u) => u > 0) || S === 0 || !exactTo(S, n * 10, 2) || new Set(us).size < 3) return null;
        return { us, scale: 10, lead: `The change in the water level (cm) of a reservoir on each of ${n} days was:\n\n${listOf(us, 10)}`, ask: "Find the mean daily change in cm.", dp: -1 };
      }, { us: [12, 15, 9, 14, 10], scale: 1, lead: "Find the mean of 12, 15, 9, 14, 10.", ask: "", dp: -1 });

      const n = v.us.length;
      const S = sum(v.us);
      const d = n * v.scale;
      const ans = v.dp < 0 ? clean(S / d) : divRound(S, d, v.dp);
      const total = show(S, v.scale);
      const sAbs = sum(v.us.map(Math.abs));
      return {
        prompt: v.lead + (v.ask ? `\n\n${v.ask}` : ""),
        answer: v.dp < 0 ? { type: "number", value: ans } : { type: "number", value: ans, allowFraction: false, display: d1(ans) },
        solution: [
          `Add them all up: ${sumExpr(v.us, v.scale)} = ${total}.`,
          v.dp < 0
            ? `There are ${n} values, so mean = ${total} ÷ ${n} = ${num(ans)}.`
            : `There are ${n} values, so mean = ${total} ÷ ${n} = ${num(divTrunc(S, d, 3))}… = ${d1(ans)} (1 d.p.).`,
        ],
        hint: "Mean = total of all the values ÷ how many values there are.",
        traps: numTraps(ans, [
          [v.us.some((u) => u < 0) && sAbs !== S && exactTo(sAbs, d, 2) ? sAbs / d : null, "Careful with the negatives — adding a negative number makes the total smaller."],
          [v.dp < 0 && exactTo(S, (n - 1) * v.scale, 2) ? S / ((n - 1) * v.scale) : null, `Count the values again — there are ${n} of them, so divide by ${n}.`],
          [v.dp >= 0 ? divTrunc(S, d, 1) : null, "Round, don't chop: look at the next digit to decide whether to round up."],
        ]),
      };
    },
  },

  // 2 ── Median of a list ───────────────────────────────────────────────────
  {
    id: `${T}.median-of-list`,
    topicId: T,
    title: "Find the median (odd and even counts)",
    level: 1,
    guideRef: "mean-median-mode-range",
    generate(rng, tier) {
      type V = { us: number[]; scale: number; lead: string; ask: string };
      const kind = rng.pick(tier === 1 ? ["plain", "seedlings"] : tier === 2 ? ["temps", "plain", "queue"] : ["leaves", "mixed"]);
      const v = attempt<V>(() => {
        let us: number[];
        let scale = 1;
        let lead: string;
        let ask = "";
        if (tier === 1) {
          const n = rng.pick([5, 7]);
          if (kind === "plain") {
            us = ints(rng, n, 1, 40);
            lead = `Find the median of ${listOf(us)}.`;
          } else {
            us = ints(rng, n, 3, 30);
            lead = `The heights (cm) of ${n} seedlings are:\n\n${listOf(us)}`;
            ask = "Find the median height in cm.";
          }
        } else if (tier === 2) {
          const n = rng.pick([6, 8]);
          if (kind === "temps") {
            us = ints(rng, n, -8, 12);
            if (!us.some((u) => u < 0)) return null;
            lead = `The temperatures (°C) at 6 am in a mountain town on ${n} days were:\n\n${listOf(us)}`;
            ask = "Find the median temperature in °C.";
          } else if (kind === "plain") {
            us = ints(rng, n, 10, 60);
            lead = `Find the median of these numbers:\n\n${listOf(us)}`;
          } else {
            us = ints(rng, n, 2, 25);
            lead = `The waiting times (minutes) of ${n} customers at a hawker stall were:\n\n${listOf(us)}`;
            ask = "Find the median waiting time in minutes.";
          }
        } else {
          scale = 10;
          if (kind === "leaves") {
            const n = rng.pick([6, 8, 9]);
            us = ints(rng, n, 35, 95);
            lead = `The lengths (cm) of ${n} leaves picked from a tree are:\n\n${listOf(us, 10)}`;
            ask = "Find the median length in cm.";
          } else {
            const n = rng.pick([7, 8, 9]);
            us = ints(rng, n, -50, 50);
            if (!us.some((u) => u < 0)) return null;
            lead = `Find the median of these numbers:\n\n${listOf(us, 10)}`;
          }
        }
        const n = us.length;
        const s = asc(us);
        if (n % 2 === 0 && s[n / 2 - 1] === s[n / 2]) return null;
        const m = medianU(us);
        const mid = n % 2 ? us[(n - 1) / 2] : (us[n / 2 - 1] + us[n / 2]) / 2;
        if (mid === m) return null; // the unsorted list must not give the right answer by luck
        return { us, scale, lead, ask };
      }, { us: [7, 3, 9, 12, 5], scale: 1, lead: "Find the median of 7, 3, 9, 12, 5.", ask: "" });

      const { us, scale } = v;
      const n = us.length;
      const s = asc(us);
      const m = medianU(us);
      const ans = clean(m / scale);
      const mid = n % 2 ? us[(n - 1) / 2] : (us[n / 2 - 1] + us[n / 2]) / 2;
      const solution = [`Put them in order: ${listOf(s, scale)}.`];
      if (n % 2) {
        solution.push(`There are ${n} values, so the median is the ${ordinal((n + 1) / 2)} value: ${num(ans)}.`);
      } else {
        const a = s[n / 2 - 1], b = s[n / 2];
        solution.push(`There are ${n} values, so the median is halfway between the ${ordinal(n / 2)} and ${ordinal(n / 2 + 1)} values, ${show(a, scale)} and ${show(b, scale)}.`);
        solution.push(`Median = (${show(a, scale)} + ${br(clean(b / scale))}) ÷ 2 = ${show(a + b, scale)} ÷ 2 = ${num(ans)}.`);
      }
      return {
        prompt: v.lead + (v.ask ? `\n\n${v.ask}` : ""),
        answer: { type: "number", value: ans },
        solution,
        hint: n % 2 ? "Write the values in order first, then find the middle one." : "Order them first. With an even number of values there are two middle values.",
        traps: numTraps(ans, [
          [mid / scale, "Put the values in order first — the median is the middle of the *ordered* list."],
          [n % 2 ? null : s[n / 2 - 1] / scale, "There are two middle values — the median is halfway between them."],
          [n % 2 ? null : s[n / 2] / scale, "There are two middle values — the median is halfway between them."],
        ]),
      };
    },
  },

  // 3 ── Range and mode ─────────────────────────────────────────────────────
  {
    id: `${T}.range-and-mode`,
    topicId: T,
    title: "Find the range and the mode",
    level: 1,
    guideRef: "mean-median-mode-range",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      if (tier < 3 && rng.bool(tier === 1 ? 0.4 : 0.3)) {
        // Mode: exactly one value repeats (2 or 3 times), everything else appears once.
        const reps = rng.pick([2, 3]);
        const n = rng.int(7, 9);
        const v = attempt(() => {
          const base = tier === 1 ? distinctInts(rng, n - reps + 1, 1, 30) : distinctInts(rng, n - reps + 1, -6, 12);
          if (tier === 2 && !base.some((b) => b < 0)) return null;
          const mode = base[0];
          return { us: rng.shuffle([...base, ...Array.from({ length: reps - 1 }, () => mode)]), mode };
        }, { us: [4, 9, 2, 9, 7, 5, 11], mode: 9 });
        const lead = tier === 1
          ? rng.pick([`Find the mode of these numbers:\n\n${listOf(v.us)}`, `The numbers of goals scored by a netball team in ${v.us.length} matches were:\n\n${listOf(v.us)}\n\nFind the mode.`])
          : `The temperatures (°C) at dawn on ${v.us.length} days were:\n\n${listOf(v.us)}\n\nFind the mode.`;
        return {
          prompt: lead,
          answer: { type: "number", value: v.mode },
          solution: [`Count how often each value appears: ${num(v.mode)} appears ${reps} times and every other value appears once.`, `So the mode is ${num(v.mode)}.`],
          hint: "The mode is the value that appears most often.",
          traps: numTraps(v.mode, [[reps, "That's how many times it appears — the mode is the value itself."]]),
        };
      }

      if (tier === 3 && rng.bool(0.45)) {
        // Missing extreme value from the range.
        const highest = rng.bool();
        const v = attempt(() => {
          const known = ints(rng, 5, 20, 60);
          const mx = Math.max(...known), mn = Math.min(...known);
          if (mx - mn < 8) return null;
          const R = mx - mn + rng.int(3, 20);
          const x = highest ? mn + R : mx - R;
          if (x < 1) return null;
          return { known, R, x, mx, mn };
        }, { known: [34, 41, 28, 50, 37], R: 30, x: 58, mx: 50, mn: 28 });
        const x = highest ? v.mn + v.R : v.mx - v.R;
        return {
          prompt: `${name} played 6 rounds of a game. Five of the scores were:\n\n${listOf(v.known)}\n\nThe range of all six scores is ${v.R}, and the missing score was the **${highest ? "highest" : "lowest"}** of the six. What was the missing score?`,
          answer: { type: "number", value: x },
          solution: highest
            ? [`The missing score is the highest, so the smallest score is still ${v.mn}.`, `Range = highest − smallest, so highest = ${v.mn} + ${v.R} = ${x}.`]
            : [`The missing score is the lowest, so the largest score is still ${v.mx}.`, `Range = largest − lowest, so lowest = ${v.mx} − ${v.R} = ${x}.`],
          hint: "Range = largest − smallest. Which of those two do you already know?",
          traps: numTraps(x, [[highest ? v.mx + v.R : v.mn - v.R, `The range is measured between the two extremes — start from the ${highest ? "smallest" : "largest"} score, ${highest ? v.mn : v.mx}.`]]),
        };
      }

      // Range of a list (negatives from tier 2, decimals in tier 3).
      const scale = tier === 3 ? 10 : 1;
      const v = attempt(() => {
        const n = rng.int(6, 8);
        const us = tier === 1 ? ints(rng, n, 2, 50) : tier === 2 ? ints(rng, n, -12, 15) : ints(rng, n, -80, 60);
        const mx = Math.max(...us), mn = Math.min(...us);
        if (mx === mn || us.every((u, i) => i === 0 || us[i - 1] <= u)) return null;
        if (tier > 1 && (mn >= 0 || mx <= 0)) return null;
        return { us, mx, mn };
      }, { us: [12, 31, 7, 25, 18, 40], mx: 40, mn: 7 });
      const { us, mx, mn } = v;
      const r = clean((mx - mn) / scale);
      const lead = tier === 1
        ? rng.pick([`Find the range of ${listOf(us)}.`, `The numbers of push-ups ${us.length} pupils did in one minute were:\n\n${listOf(us)}\n\nFind the range.`])
        : tier === 2
          ? `The temperatures (°C) at the top of a mountain at noon on ${us.length} days were:\n\n${listOf(us)}\n\nFind the range of the temperatures in °C.`
          : `The temperatures (°C) at a weather station at 6 am on ${us.length} days in March were:\n\n${listOf(us, scale)}\n\nFind the range of the temperatures in °C.`;
      return {
        prompt: lead,
        answer: { type: "number", value: r },
        solution: [`Largest = ${show(mx, scale)}, smallest = ${show(mn, scale)}.`, `Range = ${show(mx, scale)} − ${br(clean(mn / scale))} = ${num(r)}.`],
        hint: "Range = largest value − smallest value. Watch out for negatives.",
        traps: numTraps(r, [
          [tier > 1 ? (mx + mn) / scale : null, `Subtracting a negative adds: ${show(mx, scale)} − ${br(clean(mn / scale))} = ${show(mx, scale)} + ${show(-mn, scale)}.`],
          [tier === 1 ? Math.abs(us[us.length - 1] - us[0]) : null, "Range = largest − smallest, not last − first. Find the biggest and smallest values first."],
        ]),
      };
    },
  },

  // 4 ── Mean from a frequency table ────────────────────────────────────────
  {
    id: `${T}.frequency-table-mean`,
    topicId: T,
    title: "Mean from a frequency table",
    level: 2,
    guideRef: "frequency-tables",
    generate(rng, tier) {
      const ctx = rng.pick(FREQ_CTX);
      const reverse = tier === 3 && rng.bool(0.5);
      type V = { xs: number[]; fs: number[]; h: number };
      const v = attempt<V | null>(() => {
        const k = rng.pick(ctx.k), x0 = rng.pick(ctx.x0);
        const xs = Array.from({ length: k }, (_, i) => x0 + i);
        const fs = freqs(rng, k, tier);
        if (!fs) return null;
        const N = sum(fs), S = sum(xs.map((x, i) => x * fs[i]));
        if (N < 8 || S === 0) return null;
        if (tier === 1 && (N > 40 || !exactTo(S, N, 1))) return null;
        if (tier > 1 && !reverse && isTie(S, N, 1)) return null;
        let h = -1;
        if (reverse) {
          if (!exactTo(S, N, 1)) return null;
          h = rng.int(0, k - 1);
          if (fs[h] < 2 || xs[h] * N === S) return null;
        }
        return { xs, fs, h };
      }, null);
      // Safe fallback (siblings table, mean 1.9 exactly; hidden frequency solvable).
      const { xs, fs, h } = v ?? { xs: [0, 1, 2, 3, 4], fs: [1, 3, 3, 2, 1], h: reverse ? 1 : -1 };
      const c = v ? ctx : FREQ_CTX[0];
      const k = xs.length;
      const N = sum(fs), S = sum(xs.map((x, i) => x * fs[i]));
      const table = freqTable(c.head, xs, fs, h);

      if (h >= 0) {
        // Missing frequency, given the mean.
        const m = clean(S / N);
        const F = N - fs[h], S1 = S - xs[h] * fs[h], xh = xs[h];
        const mF = clean((S * F) / N);
        const ck = (c: number) => (c === 1 ? "k" : `${num(c)}k`);
        const lhs = xh === 0 ? `${S1}` : `${S1} + ${ck(xh)}`;
        const coef = clean(Math.abs(xh - m)), rhs = clean(Math.abs(mF - S1));
        return {
          prompt: `The table shows ${c.what}. One frequency, {{k}}, is missing.\n\n${table}\n\nThe mean ${c.noun} is ${num(m)}. Find {{k}}.`,
          answer: { type: "number", value: fs[h] },
          solution: [
            `Total frequency = ${F} + k. Total of the fx column = ${lhs}.`,
            `Mean = total fx ÷ total frequency, so ${lhs} = ${num(m)} × (${F} + k) = ${num(mF)} + ${ck(m)}.`,
            `Collect the k terms: ${ck(coef)} = ${num(rhs)}, so k = ${num(rhs)} ÷ ${num(coef)} = ${fs[h]}.`,
          ],
          hint: "Call the missing frequency k. Write the total of fx and the total frequency in terms of k, then use mean = total ÷ frequency.",
        };
      }

      const ans = tier === 1 ? clean(S / N) : divRound(S, N, 1);
      const trapVal = (n: number, d: number) => (tier === 1 ? (exactTo(n, d, 2) ? n / d : null) : divRound(n, d, 1));
      const exact = exactTo(S, N, 1);
      return {
        prompt: `The table shows ${c.what}.\n\n${table}\n\nWork out the mean ${c.noun}.${tier > 1 ? " Give your answer to 1 decimal place." : ""}`,
        answer: tier === 1 ? { type: "number", value: ans } : { type: "number", value: ans, allowFraction: false, display: d1(ans) },
        solution: [
          `Multiply each value by its frequency (the fx column): ${xs.map((x, i) => `${x} × ${fs[i]} = ${x * fs[i]}`).join(", ")}.`,
          `Total of fx = ${S}. Total frequency = ${fs.join(" + ")} = ${N}.`,
          `Mean = ${S} ÷ ${N} = ${exact ? num(clean(S / N)) : `${num(divTrunc(S, N, 3))}… = ${d1(ans)} (1 d.p.)`}.`,
        ],
        hint: "Total of all the values = sum of (value × frequency). Divide by the total frequency.",
        traps: numTraps(ans, [
          [trapVal(S, k), `Divide by the total frequency (${N}), not by the number of rows (${k}).`],
          [trapVal(N, k), "That's the mean of the frequency column. Multiply each value by its frequency first."],
        ]),
      };
    },
  },

  // 5 ── Median and mode from a frequency table ─────────────────────────────
  {
    id: `${T}.frequency-table-median-mode`,
    topicId: T,
    title: "Median and mode from a frequency table",
    level: 2,
    guideRef: "frequency-tables",
    generate(rng, tier) {
      const ctx = rng.pick(FREQ_CTX);
      const ask: "median" | "mode" = tier < 3 && rng.bool(tier === 1 ? 0.4 : 0.3) ? "mode" : "median";
      const straddle = ask === "median" && tier === 3 && rng.bool(0.6);
      const v = attempt<{ xs: number[]; fs: number[] } | null>(() => {
        const k = rng.pick(ctx.k), x0 = rng.pick(ctx.x0);
        const xs = Array.from({ length: k }, (_, i) => x0 + i);
        const fs = freqs(rng, k, tier);
        if (!fs) return null;
        const N = sum(fs);
        if (N < 7) return null;
        if (ask === "mode") {
          const mx = Math.max(...fs);
          if (fs.filter((f) => f === mx).length !== 1) return null;
        } else {
          if (tier === 1 && N % 2 === 0) return null;
          if (straddle) {
            if (N % 2) return null;
            let c = 0, hit = false;
            for (let i = 0; i < k - 1; i++) {
              c += fs[i];
              if (c === N / 2) hit = true;
            }
            if (!hit) return null;
          }
        }
        return { xs, fs };
      }, null);
      const { xs, fs } = v ?? { xs: [0, 1, 2, 3, 4], fs: [3, 6, 5, 2, 1] };
      const c = v ? ctx : FREQ_CTX[0];
      const k = xs.length;
      const N = sum(fs);
      const table = freqTable(c.head, xs, fs);
      const vals = xs.flatMap((x, i) => Array.from({ length: fs[i] }, () => x));

      if (ask === "mode") {
        const mx = Math.max(...fs);
        const mode = xs[fs.indexOf(mx)];
        return {
          prompt: `The table shows ${c.what}.\n\n${table}\n\nWhat is the mode?`,
          answer: { type: "number", value: mode },
          solution: [`The highest frequency is ${mx}, in the row for ${mode}.`, `So the mode is ${mode} — the value, not the frequency.`],
          hint: "Find the biggest frequency, then read across to its value.",
          traps: numTraps(mode, [[mx, "That's the highest frequency. The mode is the value that has that frequency."]]),
        };
      }

      const med = medianU(vals);
      const cum: number[] = [];
      fs.forEach((f, i) => cum.push((cum[i - 1] ?? 0) + f));
      const solution: string[] = [];
      if (N % 2) {
        const p = (N + 1) / 2;
        solution.push(`There are ${N} values, so the median is the {{(${N} + 1)/2}} = ${ordinal(p)} value.`);
        solution.push(`Running totals of the frequencies: ${cum.join(", ")}.`);
        solution.push(`The ${ordinal(p)} value is in the row for ${med}, so the median is ${med}.`);
      } else {
        const a = vals[N / 2 - 1], b = vals[N / 2];
        solution.push(`There are ${N} values, so the median is halfway between the ${ordinal(N / 2)} and ${ordinal(N / 2 + 1)} values.`);
        solution.push(`Running totals of the frequencies: ${cum.join(", ")}.`);
        solution.push(a === b ? `Both of those values are ${a}, so the median is ${a}.` : `The ${ordinal(N / 2)} value is ${a} and the ${ordinal(N / 2 + 1)} is ${b}, so the median is (${a} + ${b}) ÷ 2 = ${num(med)}.`);
      }
      return {
        prompt: `The table shows ${c.what}.\n\n${table}\n\nFind the median ${c.noun}.`,
        answer: { type: "number", value: med },
        solution,
        hint: "Add up the frequencies to find how many values there are, then count down the table to the middle one.",
        traps: numTraps(med, [
          [N % 2 ? (N + 1) / 2 : null, "That's the *position* of the median, not its value — count down the frequencies to see which value is there."],
          [(xs[0] + xs[k - 1]) / 2, `The median is the middle of all ${N} values, not the middle of the first column.`],
        ]),
      };
    },
  },

  // 6 ── Stem-and-leaf diagrams ─────────────────────────────────────────────
  {
    id: `${T}.stem-and-leaf`,
    topicId: T,
    title: "Median, mode and range from a stem-and-leaf diagram",
    level: 2,
    guideRef: "stem-and-leaf-averages",
    generate(rng, tier) {
      const ctxs = tier < 3
        ? [
            { what: "the times (minutes) some pupils took to travel to school", unit: "minutes", s0: [0, 1], r: [3, 4], scale: 1 },
            { what: "the marks some pupils scored in a quiz (out of 50)", unit: "marks", s0: [1, 2], r: [3], scale: 1 },
            { what: "the number of push-ups some pupils did in one minute", unit: "push-ups", s0: [1, 2], r: [3], scale: 1 },
          ]
        : [
            { what: "the heights (cm) of the pupils in a class", unit: "cm", s0: [14], r: [3, 4], scale: 1 },
            { what: "the masses (kg) of the pineapples at a market stall", unit: "kg", s0: [1], r: [3], scale: 10 },
          ];
      const ctx = rng.pick(ctxs);
      const askRoll = rng.next();
      const ask: "median" | "range" | "mode" = askRoll < 0.45 ? "median" : askRoll < 0.75 ? "range" : "mode";
      const v = attempt<{ us: number[]; s0: number; r: number } | null>(() => {
        const s0 = rng.pick(ctx.s0), r = rng.pick(ctx.r);
        const N = tier === 1 ? rng.pick([11, 13, 15]) : tier === 2 ? rng.int(12, 18) : rng.int(13, 19);
        const us: number[] = [];
        for (let s = s0; s < s0 + r; s++) us.push(s * 10 + rng.int(0, 9));
        while (us.length < N) us.push(rng.int(s0 * 10, (s0 + r) * 10 - 1));
        if (ctx.unit === "minutes" && Math.min(...us) < 3) return null;
        if (ask === "mode") {
          const counts = new Map<number, number>();
          for (const u of us) counts.set(u, (counts.get(u) ?? 0) + 1);
          const mx = Math.max(...counts.values());
          if (mx < 2 || [...counts.values()].filter((c) => c === mx).length !== 1) return null;
        }
        return { us: asc(us), s0, r };
      }, null);
      const { us, s0, r } = v ?? { us: [12, 15, 18, 21, 23, 23, 27, 29, 30, 34, 36], s0: 1, r: 3 };
      const scale = v ? ctx.scale : 1;
      const unit = v ? ctx.unit : "marks";
      const what = v ? ctx.what : "the marks some pupils scored in a quiz (out of 50)";
      const N = us.length;
      const rows: string[] = [];
      for (let s = s0; s < s0 + r; s++) rows.push(`| ${s} | ${us.filter((u) => Math.floor(u / 10) === s).map((u) => u % 10).join(" ")} |`);
      const keyU = us[rng.int(0, N - 1)];
      const prompt0 = `The stem-and-leaf diagram shows ${what}.\n\n| Stem | Leaf |\n|---|---|\n${rows.join("\n")}\n\nKey: ${Math.floor(keyU / 10)} | ${keyU % 10} means ${showD(keyU, scale)} ${unit}`;
      const mn = us[0], mx = us[N - 1];

      if (ask === "range") {
        const ans = clean((mx - mn) / scale);
        return {
          prompt: `${prompt0}\n\nFind the range.`,
          answer: { type: "number", value: ans },
          solution: [`Smallest = first leaf on the top stem = ${showD(mn, scale)}. Largest = last leaf on the bottom stem = ${showD(mx, scale)}.`, `Range = ${showD(mx, scale)} − ${showD(mn, scale)} = ${num(ans)} ${unit}.`],
          hint: "The smallest value is at the very start of the diagram and the largest at the very end.",
          traps: numTraps(ans, [[(mx % 10) - (mn % 10) > 0 ? (mx % 10) - (mn % 10) : null, "Use the key to turn the leaves back into full values before you subtract."]]),
        };
      }
      if (ask === "mode") {
        const counts = new Map<number, number>();
        for (const u of us) counts.set(u, (counts.get(u) ?? 0) + 1);
        const top = Math.max(...counts.values());
        const modeU = [...counts.entries()].find(([, c]) => c === top)![0];
        const ans = clean(modeU / scale);
        return {
          prompt: `${prompt0}\n\nFind the mode.`,
          answer: { type: "number", value: ans },
          solution: [`Look for a leaf repeated on the same stem: ${Math.floor(modeU / 10)} | ${Array.from({ length: top }, () => modeU % 10).join(" ")}.`, `${showD(modeU, scale)} appears ${top} times, more than any other value, so the mode is ${showD(modeU, scale)} ${unit}.`],
          hint: "Look along each stem for the same leaf appearing more than once.",
          traps: numTraps(ans, [[modeU % 10, "Join the stem and the leaf together — the key shows how."]]),
        };
      }
      const med = medianU(us);
      const ans = clean(med / scale);
      const solution = N % 2
        ? [`There are ${N} values, so the median is the {{(${N} + 1)/2}} = ${ordinal((N + 1) / 2)} value.`, `The leaves are already in order, so count along from the start: the ${ordinal((N + 1) / 2)} value is ${showD(med, scale)} ${unit}.`]
        : [
            `There are ${N} values, so the median is halfway between the ${ordinal(N / 2)} and ${ordinal(N / 2 + 1)} values.`,
            `Counting along the ordered leaves, these are ${showD(us[N / 2 - 1], scale)} and ${showD(us[N / 2], scale)}.`,
            `Median = (${showD(us[N / 2 - 1], scale)} + ${showD(us[N / 2], scale)}) ÷ 2 = ${num(ans)} ${unit}.`,
          ];
      return {
        prompt: `${prompt0}\n\nFind the median.`,
        answer: { type: "number", value: ans },
        solution,
        hint: "Count the leaves to find how many values there are. The diagram is already in order.",
        traps: numTraps(ans, [[N % 2 ? (N + 1) / 2 : null, "That's the *position* of the median — count along the leaves to find the value in that position."]]),
      };
    },
  },

  // 7 ── Choosing the right average ─────────────────────────────────────────
  {
    id: `${T}.choose-average`,
    topicId: T,
    title: "Choose the best average",
    level: 2,
    guideRef: "choosing-an-average",
    generate(rng, tier) {
      const kind = rng.pick(
        tier === 1 ? ["category", "shoes", "outlier"] : tier === 2 ? ["category", "outlier", "affected", "shoes"] : ["outlier", "affected", "shoes", "always-value", "every-value"],
      );
      const pick = "Type mean, median or mode.";

      if (kind === "category") {
        const sets = [
          { thing: "drink at the canteen", plural: "drinks", head: "Drink", items: ["Milo", "bandung", "soya bean milk", "lime juice", "barley water"] },
          { thing: "CCA", plural: "CCAs", head: "CCA", items: ["football", "choir", "robotics", "badminton", "drama"] },
          { thing: "local fruit", plural: "fruits", head: "Fruit", items: ["durian", "mango", "rambutan", "mangosteen", "papaya"] },
          { thing: "hawker dish", plural: "dishes", head: "Dish", items: ["vegetable fried rice", "roti prata", "chee cheong fun", "laksa (vegetarian)", "popiah"] },
        ];
        const set = rng.pick(sets);
        const k = rng.int(4, 5);
        const items = rng.shuffle(set.items).slice(0, k);
        const counts = distinctInts(rng, k, 3, 15);
        const top = items[counts.indexOf(Math.max(...counts))];
        return {
          prompt: `${sum(counts)} pupils were asked for their favourite ${set.thing}.\n\n| ${set.head} | Number of pupils |\n|---|---|\n${items.map((it, i) => `| ${it} | ${counts[i]} |`).join("\n")}\n\nWhich average — mean, median or mode — can describe the most typical answer? ${pick}`,
          answer: avgAnswer("mode"),
          solution: ["The answers are categories (words), not numbers.", "You can't add them up (no mean) or put them in number order (no median).", `Only the mode works: the most popular ${set.thing} is ${top}.`],
          hint: "Can you add up or order these answers?",
          traps: [
            avgTrap("mean", `You can't add up ${set.plural} — the data aren't numbers, so there is no mean.`),
            avgTrap("median", "There's no number order for these answers, so there's no middle value. Only one average works for non-numerical data."),
          ],
        };
      }

      if (kind === "shoes") {
        const v = attempt(() => {
          const n = rng.int(10, 14);
          const us = ints(rng, n, 3, 8);
          const counts = [3, 4, 5, 6, 7, 8].map((s) => us.filter((u) => u === s).length);
          const mx = Math.max(...counts);
          // The mean must not look like a real size (whole or half), even after rounding to 1 d.p.
          if (counts.filter((c) => c === mx).length !== 1 || exactTo(2 * sum(us), n, 0) || Number.isInteger(2 * divRound(sum(us), n, 1))) return null;
          return { us, mode: 3 + counts.indexOf(mx), cnt: mx };
        }, { us: [5, 6, 4, 6, 7, 5, 6, 8, 3, 6, 5], mode: 6, cnt: 4 });
        const n = v.us.length;
        const meanTxt = num(divRound(sum(v.us), n, 1));
        return {
          prompt: `A shoe shop sold these sizes of school shoes on Monday:\n\n${listOf(v.us)}\n\nThe manager wants to know which size to order the most of. Which average should she use? ${pick}`,
          answer: avgAnswer("mode"),
          solution: ["The manager needs the most popular size — that is the mode.", `Size ${v.mode} appears ${v.cnt} times, more than any other size.`, `The mean (about ${meanTxt}) isn't even a size the shop sells, and the median is just the middle size.`],
          hint: "Which average tells you the most common value?",
          traps: [
            avgTrap("mean", `The mean is about ${meanTxt} — that isn't a shoe size you can order!`),
            avgTrap("median", "The median is the middle size, not the most popular one."),
          ],
        };
      }

      if (kind === "always-value") {
        return {
          prompt: `Which average, when it exists, is **always** one of the actual values in the data? ${pick}`,
          answer: avgAnswer("mode"),
          solution: ["The mode is the most common value, so it must be one of the data values.", "The mean of 1, 2 and 6 is 3, which isn't in the list.", "The median of 2, 3, 4 and 7 is 3.5, which isn't in the list either."],
          hint: "Try a few small examples: 1, 2, 6 and 2, 3, 4, 7.",
          traps: [
            avgTrap("median", "Not always: with an even number of values the median can fall between them — 2, 3, 4, 7 has median 3.5."),
            avgTrap("mean", "Not always: the mean of 1, 2 and 6 is 3, which isn't one of the values."),
          ],
        };
      }

      if (kind === "every-value") {
        return {
          prompt: `Which average uses the value of **every** piece of data in its calculation? ${pick}`,
          answer: avgAnswer("mean"),
          solution: ["The mean adds up every value, then divides by how many there are.", "The median only uses the middle value(s), and the mode only uses the most common value.", "That's why one extreme value changes the mean but barely moves the median."],
          hint: "Which average starts with 'add them all up'?",
          traps: [
            avgTrap("median", "The median only uses the middle value(s) — change the biggest value and the median doesn't notice."),
            avgTrap("mode", "The mode only looks at the most common value."),
          ],
        };
      }

      // "outlier" (best average → median) or "affected" (most affected → mean).
      const contexts = [
        { lead: "The weekly pocket money of 7 friends is:", pre: "$", post: "", lo: 10, hi: 30, olo: 150, ohi: 300, step: 1, high: true, noun: "amount of pocket money" },
        { lead: "The times 7 pupils took to finish a puzzle were:", pre: "", post: " min", lo: 8, hi: 20, olo: 60, ohi: 95, step: 1, high: true, noun: "time" },
        { lead: "The prices of 7 bicycles in a shop are:", pre: "$", post: "", lo: 15, hi: 35, olo: 28, ohi: 45, step: 10, high: true, noun: "price" },
        { lead: "The scores (out of 50) of 7 pupils in a quiz were:", pre: "", post: "", lo: 32, hi: 48, olo: 2, ohi: 6, step: 1, high: false, noun: "score" },
      ];
      const cx = rng.pick(contexts);
      const ostep = cx.step === 10 ? 100 : 1;
      const v = attempt(() => {
        const normal = distinctInts(rng, 6, cx.lo, cx.hi).map((u) => u * cx.step);
        const o = rng.int(cx.olo, cx.ohi) * ostep;
        const us = rng.shuffle([...normal, o]);
        const S = sum(us);
        const wrongSide = cx.high ? us.filter((u) => u < S / 7).length : us.filter((u) => u > S / 7).length;
        if (kind === "outlier" && wrongSide < 5) return null;
        return { us, o, normal, S };
      }, { us: [25, 18, 22, 240, 30, 27, 20], o: 240, normal: [25, 18, 22, 30, 27, 20], S: 382 });
      const f = (u: number) => (cx.pre === "$" && !Number.isInteger(u) ? `$${u.toFixed(2)}` : `${cx.pre}${num(u)}${cx.post}`);
      const fList = v.us.map(f).join(", ");
      const meanWith = divRound(v.S, 7, 0);
      const meanWithout = divRound(v.S - v.o, 6, 0);
      const medWith = medianU(v.us), medWithout = medianU(v.normal);
      const side = cx.high ? "bigger" : "smaller";
      const cnt = cx.high ? v.us.filter((u) => u < v.S / 7).length : v.us.filter((u) => u > v.S / 7).length;
      if (kind === "outlier") {
        return {
          prompt: `${cx.lead}\n\n${fList}\n\nWhich average — mean, median or mode — best represents a typical ${cx.noun}? ${pick}`,
          answer: avgAnswer("median"),
          solution: [
            `${f(v.o)} is an outlier — far ${cx.high ? "above" : "below"} the rest.`,
            `The mean is about ${f(meanWith)}, which is ${side} than ${cnt} of the 7 values, so it isn't typical.`,
            "Every value is different, so there is no mode.",
            `The median, ${f(medWith)}, sits among the typical values — use the median.`,
          ],
          hint: "Is there a value that is very different from the rest? Which average ignores how extreme it is?",
          traps: [
            avgTrap("mean", `The outlier drags the mean to about ${f(meanWith)} — ${side} than ${cnt} of the 7 values.`),
            avgTrap("mode", "Every value is different, so there's no mode here."),
          ],
        };
      }
      return {
        prompt: `${cx.lead}\n\n${fList}\n\nOne value is an outlier. Which average — mean, median or mode — is changed the most by the outlier? ${pick}`,
        answer: avgAnswer("mean"),
        solution: [
          `Mean with the outlier ≈ ${f(meanWith)}; without it ≈ ${f(meanWithout)}.`,
          `Median with the outlier = ${f(medWith)}; without it = ${f(medWithout)}.`,
          "The mean uses every value, so the outlier pulls it a long way. The median only uses the middle, so it hardly moves (and every value is different, so there's no mode).",
        ],
        hint: "Which average uses the actual size of every value?",
        traps: [
          avgTrap("median", "The median only depends on the middle value(s), so an outlier barely moves it."),
          avgTrap("mode", "Every value is different, so there's no mode here."),
        ],
      };
    },
  },

  // 8 ── Effect of an outlier ───────────────────────────────────────────────
  {
    id: `${T}.outlier-effect`,
    topicId: T,
    title: "How an outlier changes the mean and median",
    level: 2,
    guideRef: "choosing-an-average",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const contexts = [
        { lead: (n: number) => `${name} wrote down the time (minutes) spent on homework on each of ${n} evenings:`, lo: 30, hi: 60, olo: 150, ohi: 210, high: true },
        { lead: (n: number) => `The prices ($) of ${n} school bags in a shop are:`, lo: 20, hi: 45, olo: 180, ohi: 260, high: true },
        { lead: (n: number) => `The rainfall (mm) in a town on ${n} days — one of them during a monsoon storm — was:`, lo: 0, hi: 9, olo: 60, ohi: 95, high: true },
        { lead: (n: number) => `The scores (out of 50) of ${n} pupils in a quiz — one pupil arrived very late — were:`, lo: 34, hi: 48, olo: 2, ohi: 9, high: false },
        { lead: (n: number) => `The heights (cm) of ${n} sunflower seedlings in a tray are:`, lo: 20, hi: 35, olo: 1, ohi: 4, high: false },
      ];
      const cx = rng.pick(contexts);
      const q = tier === 3 ? (rng.bool(0.6) ? "median" : "change") : rng.pick(["new-mean", "change"]);
      const n = q === "median" ? rng.pick([5, 7]) : tier === 1 ? rng.pick([5, 6]) : rng.pick([6, 7]);
      const m = n - 1;
      const dp = tier === 1 ? 0 : 1;
      const v = attempt(() => {
        const normal = ints(rng, m - 1, cx.lo, cx.hi);
        const S0 = sum(normal);
        const lastC: number[] = [];
        for (let u = cx.lo; u <= cx.hi; u++) if (exactTo(S0 + u, m, dp)) lastC.push(u);
        if (!lastC.length) return null;
        normal.push(rng.pick(lastC));
        if (new Set(normal).size < 3) return null;
        const S1 = sum(normal);
        const oC: number[] = [];
        for (let o = cx.olo; o <= cx.ohi; o++) if (exactTo(S1 + o, n, dp)) oC.push(o);
        if (!oC.length) return null;
        const o = rng.pick(oC);
        const all = [...normal, o];
        if (q === "median" && medianU(all) === medianU(normal)) return null;
        return { normal, o, all: rng.shuffle(all) };
      }, null);
      const fb = { normal: [40, 35, 45, 50, 30], o: 184, all: [40, 35, 184, 45, 50, 30] };
      const { normal, o, all } = v ?? fb;
      const cxx = v ? cx : contexts[0];
      const N = all.length, M = normal.length;
      const S1 = sum(normal), S = S1 + o;
      const meanWith = clean(S / N), meanWithout = clean(S1 / M);
      const meanChange = clean(Math.abs(meanWith - meanWithout));
      const qq = v ? q : "new-mean";
      const intro = `${cxx.lead(N)}\n\n${listOf(all)}\n\nOne of these values is an outlier.`;
      const step1 = `The outlier is ${o} — far ${cxx.high ? "above" : "below"} the other values.`;

      if (qq === "new-mean") {
        return {
          prompt: `${intro} Remove the outlier and work out the mean of the remaining values.`,
          answer: { type: "number", value: meanWithout },
          solution: [step1, `Without it there are ${M} values with a total of ${sumExpr(normal)} = ${S1}.`, `Mean = ${S1} ÷ ${M} = ${num(meanWithout)}. (With the outlier it was ${num(meanWith)} — one value moved it a lot.)`],
          hint: "Spot the value that doesn't fit, take it out, then find the mean of what's left.",
          traps: numTraps(meanWithout, [
            [meanWith, `That's the mean *with* the outlier. Remove it first, then divide by ${M}.`],
            [exactTo(S1, N, 2) ? S1 / N : null, `After removing the outlier only ${M} values are left — divide by ${M}, not ${N}.`],
          ]),
        };
      }
      if (qq === "change") {
        return {
          prompt: `${intro} By how much does the mean ${cxx.high ? "decrease" : "increase"} when the outlier is removed?`,
          answer: { type: "number", value: meanChange },
          solution: [step1, `With it: mean = ${S} ÷ ${N} = ${num(meanWith)}. Without it: mean = ${S1} ÷ ${M} = ${num(meanWithout)}.`, `Change = ${num(Math.max(meanWith, meanWithout))} − ${num(Math.min(meanWith, meanWithout))} = ${num(meanChange)}.`],
          hint: "Work out the mean with the outlier and the mean without it, then find the difference.",
          traps: numTraps(meanChange, [
            [meanWithout, "That's the new mean. The question asks how much the mean *changes*."],
            [meanWith, "That's the original mean. Find the new mean too, then subtract."],
          ]),
        };
      }
      const medWith = medianU(all), medWithout = medianU(normal);
      const medChange = Math.abs(medWith - medWithout);
      const sw = asc(all), so = asc(normal);
      return {
        prompt: `${intro} By how much does the **median** change when the outlier is removed?`,
        answer: { type: "number", value: medChange },
        solution: [
          `With all ${N} values in order: ${listOf(sw)}. The median is the ${ordinal((N + 1) / 2)} value, ${num(medWith)}.`,
          `Without the outlier: ${listOf(so)}. The median is halfway between ${so[M / 2 - 1]} and ${so[M / 2]}, so it is ${num(medWithout)}.`,
          `The median changes by ${num(medChange)} — the mean changes by ${num(meanChange)}. The median resists outliers.`,
        ],
        hint: "Find the median with the outlier, then again without it (now there's an even number of values).",
        traps: numTraps(medChange, [[meanChange, "That's how much the *mean* changes. Find the median with and without the outlier."]]),
      };
    },
  },

  // 9 ── Missing value from the mean ────────────────────────────────────────
  {
    id: `${T}.missing-value`,
    topicId: T,
    title: "Find a missing value from the mean",
    level: 2,
    guideRef: "working-backwards",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const kind = rng.pick(tier === 1 ? ["plain", "cards"] : tier === 2 ? ["temps", "mangoes", "plain"] : ["two-equal", "x-and-2x", "temps"]);

      if (kind === "two-equal" || kind === "x-and-2x") {
        const parts = kind === "two-equal" ? 2 : 3;
        const v = attempt(() => {
          const n = rng.int(6, 7);
          const known = ints(rng, n - 2, 2, 30);
          const x = rng.int(3, 25);
          const T0 = sum(known) + parts * x;
          if (T0 % n !== 0) return null;
          return { known, x, n, m: T0 / n };
        }, parts === 2 ? { known: [4, 9, 12, 7], x: 11, n: 6, m: 9 } : { known: [4, 9, 12, 8], x: 7, n: 6, m: 9 });
        const { known, n, m } = v;
        const xx = (n * m - sum(known)) / parts;
        const tot = n * m;
        const rest = tot - sum(known);
        return {
          prompt: kind === "two-equal"
            ? `The mean of ${n} numbers is ${m}. ${Count(n - 2)} of them are ${listOf(known)}. The other two numbers are equal. What is each of them?`
            : `The mean of ${n} numbers is ${m}. ${Count(n - 2)} of them are ${listOf(known)}. The other two numbers are {{x}} and {{2x}}. Find {{x}}.`,
          answer: { type: "number", value: xx },
          solution: [
            `Total of all ${n} numbers = ${m} × ${n} = ${tot}.`,
            `The ${n - 2} you know add to ${sum(known)}, so the other two add to ${tot} − ${sum(known)} = ${rest}.`,
            kind === "two-equal" ? `Two equal numbers: each is ${rest} ÷ 2 = ${num(xx)}.` : `{{x + 2x = 3x = ${rest}}}, so {{x = ${rest}/3 = ${num(xx)}}}.`,
          ],
          hint: "Total = mean × how many. What must the missing numbers add up to?",
          traps: numTraps(xx, [[rest, kind === "two-equal" ? "That's the total of the two missing numbers — share it between them." : "That's x + 2x = 3x. Divide by 3 to find x."]]),
        };
      }

      const v = attempt(() => {
        const n = kind === "mangoes" ? rng.pick([5, 6]) : rng.int(4, 6);
        const lo = kind === "temps" ? -8 : kind === "mangoes" ? 160 : 1;
        const hi = kind === "temps" ? 10 : kind === "mangoes" ? 260 : 20;
        const known = ints(rng, n - 1, lo, hi);
        const x = rng.int(lo, hi);
        const tot = sum(known) + x;
        if (tier === 1 && tot % n !== 0) return null;
        if (tier > 1 && !exactTo(tot, n, 1)) return null;
        if (kind === "temps" && (!known.some((u) => u < 0) || tot === 0)) return null;
        if (kind !== "temps" && x < 1) return null;
        return { known, x, n, m: clean(tot / n) };
      }, { known: [6, 11, 3, 8], x: 12, n: 5, m: 8 });
      const { known, x, n, m } = v;
      const tot = clean(n * m);
      const S = sum(known);
      let prompt: string;
      if (kind === "cards") prompt = `${name} has ${n} number cards. The mean of the numbers on them is ${num(m)}. ${Count(n - 1)} of the cards show ${listOf(known)}. What number is on the last card?`;
      else if (kind === "temps") prompt = `The mean of ${n} temperatures is ${num(m)} °C. ${Count(n - 1)} of the temperatures (°C) are ${listOf(known)}. Find the other temperature in °C.`;
      else if (kind === "mangoes") prompt = `The mean mass of ${n} mangoes is ${num(m)} g. ${Count(n - 1)} of the mangoes have masses (g) of ${listOf(known)}. Find the mass of the last mango in grams.`;
      else prompt = `The mean of ${n} numbers is ${num(m)}. ${Count(n - 1)} of the numbers are ${listOf(known)}. Find the other number.`;
      return {
        prompt,
        answer: { type: "number", value: x },
        solution: [`Total of all ${n} = mean × count = ${num(m)} × ${n} = ${num(tot)}.`, `Total of the ${n - 1} you know = ${sumExpr(known)} = ${num(S)}.`, `Missing value = ${num(tot)} − ${br(S)} = ${num(x)}.`],
        hint: "Mean × how many = total. Then what is missing from the total?",
        traps: numTraps(x, [[clean(m * (n - 1) - S), `The total of all ${n} values is ${num(m)} × ${n} — multiply by ${n}, not ${n - 1}.`]]),
      };
    },
  },

  // 10 ── Comparing two distributions ───────────────────────────────────────
  {
    id: `${T}.compare-distributions`,
    topicId: T,
    title: "Compare two sets of data",
    level: 2,
    guideRef: "comparing-distributions",
    generate(rng, tier) {
      const [A, B] = rng.shuffle(NAMES).slice(0, 2);
      const contexts = [
        { lead: (n: number) => `${A} and ${B} each did ${n} maths quizzes, marked out of 20. Their scores were:`, lo: 6, hi: 20, higher: true, noun: "score", better: "A higher score is better", scale: 1 },
        { lead: (n: number) => `${A} and ${B} each did the long jump ${n} times. Their distances (cm) were:`, lo: 250, hi: 420, higher: true, noun: "distance", better: "A longer jump is better", scale: 1 },
        { lead: (n: number) => `${A} and ${B} each did ${n} typing tests. Their numbers of mistakes were:`, lo: 0, hi: 18, higher: false, noun: "number of mistakes", better: "Making fewer mistakes is better", scale: 1 },
        { lead: (n: number) => `${A} and ${B} each solved a puzzle cube ${n} times. Their times (seconds) were:`, lo: 40, hi: 120, higher: false, noun: "time", better: "A lower time is better (faster)", scale: 1 },
        { lead: (n: number) => `${A} and ${B} each timed ${n} swims of 50 m. Their times (seconds) were:`, lo: 320, hi: 480, higher: false, noun: "time", better: "A lower time is better (faster)", scale: 10 },
      ];
      const cx = tier === 3 ? rng.pick(contexts.slice(2)) : rng.pick(contexts.slice(0, 4));
      const ask: "range" | "mean" | "median" = rng.bool(0.45) ? "range" : tier === 3 && rng.bool(0.5) ? "median" : "mean";
      const n = tier === 1 ? 5 : rng.pick([5, 6]);
      const W = cx.hi - cx.lo;
      const v = attempt(() => {
        const sSmall = Math.max(1, Math.round((W * rng.int(6, 10)) / 100));
        const sBig = Math.max(sSmall + 2, Math.round((W * rng.int(20, 30)) / 100));
        const make = (sp: number) => {
          const c = rng.int(cx.lo + sp, cx.hi - sp);
          return Array.from({ length: n }, () => c + rng.int(-sp, sp));
        };
        const smallFirst = rng.bool();
        const a = make(smallFirst ? sSmall : sBig), b = make(smallFirst ? sBig : sSmall);
        const rA = Math.max(...a) - Math.min(...a), rB = Math.max(...b) - Math.min(...b);
        if (Math.abs(rA - rB) < Math.max(2, W / 15)) return null;
        if (!exactTo(sum(a), n * cx.scale, 2) || !exactTo(sum(b), n * cx.scale, 2)) return null;
        const avA = ask === "median" ? medianU(a) : sum(a) / n, avB = ask === "median" ? medianU(b) : sum(b) / n;
        if (Math.abs(avA - avB) < Math.max(1, W / 25)) return null;
        return { a, b, rA, rB, avA, avB };
      }, { a: [12, 14, 13, 15, 14], b: [8, 19, 11, 17, 15], rA: 3, rB: 11, avA: 13.6, avB: 14 });
      const { a, b, rA, rB, avA, avB } = v;
      const sc = cx.scale;
      const higherBetter = cx.higher;
      let winner: string;
      const solution: string[] = [];
      if (ask === "range") {
        winner = rA < rB ? A : B;
        solution.push(`Ranges: ${A}: ${show(Math.max(...a), sc)} − ${show(Math.min(...a), sc)} = ${show(rA, sc)}. ${B}: ${show(Math.max(...b), sc)} − ${show(Math.min(...b), sc)} = ${show(rB, sc)}.`);
        solution.push(`A smaller range means the results are closer together, so ${winner} was more consistent.`);
      } else {
        winner = (avA > avB) === higherBetter ? A : B;
        if (ask === "mean") {
          solution.push(`Means: ${A}: ${show(sum(a), sc)} ÷ ${n} = ${show(avA, sc)}. ${B}: ${show(sum(b), sc)} ÷ ${n} = ${show(avB, sc)}.`);
        } else {
          solution.push(`In order — ${A}: ${listOf(asc(a), sc)}; median ${show(avA, sc)}.`);
          solution.push(`In order — ${B}: ${listOf(asc(b), sc)}; median ${show(avB, sc)}.`);
        }
        solution.push(`${cx.better}, so ${winner} did better on average.`);
      }
      const loser = winner === A ? B : A;
      const question = ask === "range" ? "Use the range to decide who was more consistent." : `Use the ${ask} to decide who did better on average.`;
      const feedback = ask === "range"
        ? "Consistent means the results are close together — that's the smaller range."
        : higherBetter
          ? `Compare the ${ask}s carefully — the higher ${ask} wins here.`
          : `Careful — ${cx.better.toLowerCase()} here. Pick the lower ${ask}.`;
      return {
        prompt: `${cx.lead(n)}\n\n- **${A}:** ${listOf(a, sc)}\n- **${B}:** ${listOf(b, sc)}\n\n${question} Type their name.`,
        answer: { type: "text", accept: [winner], display: winner },
        solution,
        hint: ask === "range" ? "Range = largest − smallest. Whose results are less spread out?" : `Work out each person's ${ask}, then ask: is a higher or a lower ${cx.noun} better here?`,
        traps: [{ spec: { type: "text", accept: [loser] }, feedback }],
      };
    },
  },

  // 11 ── Working backwards: changing the mean ───────────────────────────────
  {
    id: `${T}.change-the-mean`,
    topicId: T,
    title: "Working backwards when the mean changes",
    level: 3,
    guideRef: "working-backwards",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const kind = rng.pick(tier === 1 ? ["add", "remove"] : tier === 2 ? ["add", "remove", "target", "combine", "fix"] : ["target", "combine", "fix", "add", "remove"]);

      if (kind === "add" || kind === "remove") {
        const v = attempt(() => {
          const n = rng.int(4, 8);
          const nn = kind === "add" ? n + 1 : n - 1;
          // Tier 3 allows means ending in .5, but every total must stay a whole number.
          const halves = tier === 3;
          const m = halves && n % 2 === 0 && rng.bool() ? rng.int(10, 30) / 2 : rng.int(5, 15);
          const d = rng.pick([-3, -2, -1, 1, 2, 3]);
          const opts = (halves ? [m + d, m + d + 0.5, m + d - 0.5] : [m + d]).filter((t) => Number.isInteger(t * nn) && t > 0 && t !== m);
          if (!opts.length) return null;
          const m2 = rng.pick(opts);
          const x = kind === "add" ? nn * m2 - n * m : n * m - nn * m2;
          if (x < 1 || x > 60) return null;
          return { n, m, m2 };
        }, kind === "add" ? { n: 5, m: 8, m2: 9 } : { n: 5, m: 8, m2: 7 });
        const { n, m, m2 } = v;
        const nn = kind === "add" ? n + 1 : n - 1;
        const x = kind === "add" ? clean(nn * m2 - n * m) : clean(n * m - nn * m2);
        const t1 = clean(n * m), t2 = clean(nn * m2);
        if (kind === "add") {
          return {
            prompt: rng.bool()
              ? `The mean of ${n} numbers is ${num(m)}. One more number is added and the mean becomes ${num(m2)}. What number was added?`
              : `${name}'s mean score over ${n} rounds of a quiz game is ${num(m)}. After one more round the mean is ${num(m2)}. What did ${name} score in that round?`,
            answer: { type: "number", value: x },
            solution: [`Old total = ${num(m)} × ${n} = ${num(t1)}.`, `New total = ${num(m2)} × ${nn} = ${num(t2)}.`, `The extra number = ${num(t2)} − ${num(t1)} = ${num(x)}.`],
            hint: "Turn each mean into a total (mean × how many). What was added to the total?",
            traps: numTraps(x, [[clean(n * m2 - n * m), `There are now ${nn} numbers — the new total is ${num(m2)} × ${nn}.`]]),
          };
        }
        return {
          prompt: `The mean of ${n} numbers is ${num(m)}. One number is removed and the mean of the other ${nn} numbers is ${num(m2)}. What number was removed?`,
          answer: { type: "number", value: x },
          solution: [`Total of all ${n} = ${num(m)} × ${n} = ${num(t1)}.`, `Total of the remaining ${nn} = ${num(m2)} × ${nn} = ${num(t2)}.`, `Removed number = ${num(t1)} − ${num(t2)} = ${num(x)}.`],
          hint: "Turn each mean into a total. What was taken away from the total?",
          traps: numTraps(x, [[clean(n * m - n * m2), `After removing one number only ${nn} are left — their total is ${num(m2)} × ${nn}.`]]),
        };
      }

      if (kind === "target") {
        const v = attempt(() => {
          const k = rng.int(3, 6);
          const m = rng.int(60, 85);
          const d = rng.int(1, 5);
          const x = m + d + k * d;
          if (x > 100) return null;
          return { k, m, d, x };
        }, { k: 4, m: 72, d: 3, x: 87 });
        const { k, m, d, x } = v;
        const m2 = m + d;
        return {
          prompt: `${name}'s mean mark in ${k} tests is ${m}. What mark does ${name} need in the next test to raise the mean to ${m2}?`,
          answer: { type: "number", value: x },
          solution: [`Total so far = ${m} × ${k} = ${m * k}.`, `Total needed after ${k + 1} tests = ${m2} × ${k + 1} = ${m2 * (k + 1)}.`, `Mark needed = ${m2 * (k + 1)} − ${m * k} = ${x}.`],
          hint: "What total is needed after the next test? What total is there already?",
          traps: numTraps(x, [
            [m2, `Scoring ${m2} isn't enough — the earlier marks average only ${m}, so the new mark must be higher to pull the mean up to ${m2}.`],
            [m2 + d, `The new mark has to make up ${d} for each of the ${k} earlier tests as well as reach ${m2} itself.`],
          ]),
        };
      }

      if (kind === "combine") {
        const v = attempt(() => {
          const [n1, n2] = distinctInts(rng, 2, 15, 32);
          const m1 = rng.int(50, 90), m2 = rng.int(50, 90);
          const S = n1 * m1 + n2 * m2, N = n1 + n2;
          if (Math.abs(m1 - m2) < 4 || isTie(S, N, 1)) return null;
          return { n1, n2, m1, m2 };
        }, { n1: 20, n2: 30, m1: 70, m2: 60 });
        const { n1, n2, m1, m2 } = v;
        const N = n1 + n2, S = n1 * m1 + n2 * m2;
        const ans = divRound(S, N, 1);
        return {
          prompt: `Class 8A has ${n1} pupils, and their mean test score is ${m1}. Class 8B has ${n2} pupils, and their mean score is ${m2}. Work out the mean score of all ${N} pupils together. Give your answer to 1 decimal place.`,
          answer: { type: "number", value: ans, allowFraction: false, display: d1(ans) },
          solution: [
            `Total for 8A = ${m1} × ${n1} = ${m1 * n1}. Total for 8B = ${m2} × ${n2} = ${m2 * n2}.`,
            `Combined total = ${S}, shared by ${N} pupils.`,
            `Mean = ${S} ÷ ${N} = ${exactTo(S, N, 1) ? num(ans) : `${num(divTrunc(S, N, 3))}… = ${d1(ans)} (1 d.p.)`}.`,
          ],
          hint: "You can't just average the two means — the classes are different sizes. Find each class's total first.",
          traps: numTraps(ans, [[(m1 + m2) / 2, `The classes are different sizes, so the bigger class counts for more. Use totals: (${m1} × ${n1} + ${m2} × ${n2}) ÷ ${N}.`]]),
        };
      }

      // fix: one value was wrong
      const v = attempt(() => {
        const n = rng.int(5, 10);
        const m = rng.int(8, 20);
        const a = rng.int(2, 2 * m);
        const b = rng.int(2, 2 * m + 10);
        if (Math.abs(b - a) < 3 || !exactTo(b - a, n, 2)) return null;
        return { n, m, a, b };
      }, { n: 8, m: 12, a: 5, b: 21 });
      const { n, m, a, b } = v;
      const ans = clean(m + (b - a) / n);
      const tot = n * m;
      return {
        prompt: rng.bool()
          ? `The mean of ${n} numbers is ${m}. One of the numbers, ${a}, is changed to ${b}. What is the new mean?`
          : `A teacher worked out that the mean mark of ${n} pupils was ${m}. Then she noticed that one mark had been typed as ${a} instead of ${b}. What is the correct mean?`,
        answer: { type: "number", value: ans },
        solution: [`Old total = ${m} × ${n} = ${tot}.`, `New total = ${tot} − ${a} + ${b} = ${tot - a + b}.`, `New mean = ${tot - a + b} ÷ ${n} = ${num(ans)}.`],
        hint: "Find the total first, fix it, then divide again.",
        traps: numTraps(ans, [[m + (b - a), `The change of ${num(b - a)} is shared among all ${n} values, so the mean only changes by ${num(b - a)} ÷ ${n}.`]]),
      };
    },
  },

  // 12 ── Estimated mean from grouped data (stretch) ─────────────────────────
  {
    id: `${T}.grouped-mean`,
    topicId: T,
    title: "Estimate the mean from grouped data",
    level: 3,
    guideRef: "grouped-data",
    generate(rng, tier) {
      const contexts = [
        { head: "Time, {{t}} (minutes)", v: "t", what: "how long some pupils spent on homework one evening", noun: "time", a0: [0], ws: tier === 1 ? [10, 20] : [10, 15, 20] },
        { head: "Height, {{h}} (cm)", v: "h", what: "the heights of the sunflower plants in a school garden", noun: "height", a0: [100, 120, 140], ws: tier === 1 ? [10, 20] : [5, 10, 15] },
        { head: "Mass, {{m}} (g)", v: "m", what: "the masses of the mangoes in a crate", noun: "mass", a0: [200, 250], ws: tier === 1 ? [20] : [20, 25] },
        { head: "Distance, {{d}} (km)", v: "d", what: "how far some pupils live from school", noun: "distance", a0: [0], ws: tier === 1 ? [2, 4] : [2, 3, 5] },
      ];
      const cx = rng.pick(contexts);
      const k = tier === 1 ? 4 : tier === 2 ? rng.int(4, 5) : rng.int(5, 6);
      const v = attempt(() => {
        const w = rng.pick(cx.ws), a0 = rng.pick(cx.a0);
        const fs = ints(rng, k, 1, tier === 1 ? 10 : 15);
        const N = sum(fs);
        const mid2 = fs.map((_, i) => 2 * (a0 + i * w) + w); // twice each midpoint (always a whole number)
        const S2 = sum(mid2.map((m2, i) => m2 * fs[i]));
        if (isTie(S2, 2 * N, 1)) return null;
        return { w, a0, fs };
      }, { w: 10, a0: 0, fs: [3, 7, 6, 4] });
      const { w, a0, fs } = v;
      const N = sum(fs);
      const bounds = fs.map((_, i) => [a0 + i * w, a0 + (i + 1) * w]);
      const mid2 = bounds.map(([lo, hi]) => lo + hi);
      const S2 = sum(mid2.map((m2, i) => m2 * fs[i]));
      const ans = divRound(S2, 2 * N, 1);
      const exact = exactTo(S2, 2 * N, 1);
      const rows = bounds.map(([lo, hi], i) => `| {{${lo} < ${cx.v} <= ${hi}}} | ${fs[i]} |`).join("\n");
      const S = clean(S2 / 2);
      const upperS = sum(bounds.map(([, hi], i) => hi * fs[i]));
      return {
        prompt: `The table shows ${cx.what}.\n\n| ${cx.head} | Frequency |\n|---|---|\n${rows}\n\nWork out an estimate of the mean ${cx.noun}. Give your answer to 1 decimal place.`,
        answer: { type: "number", value: ans, allowFraction: false, display: d1(ans) },
        solution: [
          `Use the midpoint of each class: ${mid2.map((m2) => show(m2, 2)).join(", ")}.`,
          `Midpoint × frequency: ${mid2.map((m2, i) => `${show(m2, 2)} × ${fs[i]} = ${show(m2 * fs[i], 2)}`).join(", ")}. Total = ${num(S)}.`,
          `Estimated mean = ${num(S)} ÷ ${N} = ${exact ? num(ans) : `${num(divTrunc(S2, 2 * N, 3))}… = ${d1(ans)} (1 d.p.)`}.`,
          "It's only an estimate: we don't know the exact values, so we assume each one sits at the middle of its class.",
        ],
        hint: "You don't know the exact values — use the midpoint of each class to stand for every value in it.",
        traps: numTraps(ans, [
          [divRound(upperS, N, 1), "You used the top of each class. Use the midpoint — the values are spread across the whole class."],
          [divRound(S2, 2 * k, 1), `Divide by the total frequency (${N}), not by the number of classes (${k}).`],
        ]),
      };
    },
  },
];
