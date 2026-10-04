// Procedural skill drills for "Collecting & Representing Data" (statistics).
// Every answer is computed from the exact data shown in the prompt/diagram.
import type { Drill, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { gcd, num, big, clean, roundTo, ordinal, isPrime } from "./helpers.ts";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function lower(s: string): string {
  return s.charAt(0).toLowerCase() + s.slice(1);
}

function sumOf(a: readonly number[]): number {
  let t = 0;
  for (const x of a) t += x;
  return t;
}

/** Lines indented 4 spaces render as a calculation/data block. */
function dataBlock(lines: string[]): string {
  return lines.map((l) => "    " + l).join("\n");
}

function roundStep(v: number, step: number): number {
  return clean(Math.round(v / step) * step);
}

function numTrap(value: number, feedback: string, tolerance?: number): Trap {
  return { spec: tolerance === undefined ? { type: "number", value } : { type: "number", value, tolerance }, feedback };
}

function textTrap(accept: string[], feedback: string): Trap {
  return { spec: { type: "text", accept }, feedback };
}

/** Split `units` into k random parts, each at least `min` (shuffled). */
function partition(rng: Rng, units: number, k: number, min: number): number[] | null {
  if (units < k * min) return null;
  const parts: number[] = [];
  let rem = units;
  for (let i = 0; i < k - 1; i++) {
    const left = k - 1 - i;
    const hi = rem - left * min;
    const avg = Math.round(rem / (left + 1));
    const p = rng.int(min, Math.max(min, Math.min(hi, avg * 2 - min)));
    parts.push(p);
    rem -= p;
  }
  parts.push(rem);
  return rem >= min ? rng.shuffle(parts) : null;
}

function pearson(pts: ReadonlyArray<readonly [number, number]>): number {
  const n = pts.length;
  const mx = sumOf(pts.map((p) => p[0])) / n;
  const my = sumOf(pts.map((p) => p[1])) / n;
  let sxy = 0, sxx = 0, syy = 0;
  for (const [x, y] of pts) {
    sxy += (x - mx) * (y - my);
    sxx += (x - mx) * (x - mx);
    syy += (y - my) * (y - my);
  }
  return sxx > 0 && syy > 0 ? sxy / Math.sqrt(sxx * syy) : 0;
}

// ---------------------------------------------------------------------------
// SVG builders (white background, dark strokes, soft fills)
// ---------------------------------------------------------------------------

interface Axis {
  lo: number;
  hi: number;
  step: number;
  label: string;
  /** Label every n-th gridline (default 1). */
  every?: number;
}

function scatterSvg(
  xa: Axis,
  ya: Axis,
  pts: ReadonlyArray<readonly [number, number]>,
  aria: string,
  line?: readonly [number, number, number, number],
): string {
  const L = 62, R = 346, T = 14, B = 206;
  const px = (x: number) => L + ((x - xa.lo) / (xa.hi - xa.lo)) * (R - L);
  const py = (y: number) => B - ((y - ya.lo) / (ya.hi - ya.lo)) * (B - T);
  const p = (n: number) => n.toFixed(1);
  let s = `<svg viewBox="0 0 360 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect x="0" y="0" width="360" height="252" fill="#ffffff"/>`;
  const nx = Math.round((xa.hi - xa.lo) / xa.step);
  const ny = Math.round((ya.hi - ya.lo) / ya.step);
  let labels = "";
  for (let i = 0; i <= nx; i++) {
    const v = clean(xa.lo + i * xa.step);
    const X = p(px(v));
    s += `<line x1="${X}" y1="${T}" x2="${X}" y2="${B}" stroke="#e2e8f0" stroke-width="1"/>`;
    if (i % (xa.every ?? 1) === 0) labels += `<text x="${X}" y="${B + 15}" font-size="11" text-anchor="middle">${num(v)}</text>`;
  }
  for (let j = 0; j <= ny; j++) {
    const v = clean(ya.lo + j * ya.step);
    const Y = p(py(v));
    s += `<line x1="${L}" y1="${Y}" x2="${R}" y2="${Y}" stroke="#e2e8f0" stroke-width="1"/>`;
    if (j % (ya.every ?? 1) === 0) labels += `<text x="${L - 6}" y="${p(py(v) + 4)}" font-size="11" text-anchor="end">${num(v)}</text>`;
  }
  s += `<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#334155" stroke-width="1.5"/><line x1="${L}" y1="${T}" x2="${L}" y2="${B}" stroke="#334155" stroke-width="1.5"/>`;
  if (line) {
    s += `<line x1="${p(px(line[0]))}" y1="${p(py(line[1]))}" x2="${p(px(line[2]))}" y2="${p(py(line[3]))}" stroke="#b91c1c" stroke-width="2"/>`;
  }
  for (const [x, y] of pts) s += `<circle cx="${p(px(x))}" cy="${p(py(y))}" r="3.5" fill="#1f2937"/>`;
  const midY = (T + B) / 2;
  s += `<g font-family="sans-serif" fill="#1f2937">${labels}<text x="${(L + R) / 2}" y="246" font-size="12" text-anchor="middle">${xa.label}</text><text x="14" y="${midY}" font-size="12" text-anchor="middle" transform="rotate(-90 14 ${midY})">${ya.label}</text></g></svg>`;
  return s;
}

/** Two-circle Venn diagram. vals = [A only, both, B only, outside]. */
function vennSvg(labA: string, labB: string, vals: readonly [string, string, string, string], aria: string): string {
  return (
    `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">` +
    `<rect x="0" y="0" width="360" height="230" fill="#ffffff"/>` +
    `<rect x="8" y="8" width="344" height="214" fill="none" stroke="#334155" stroke-width="2"/>` +
    `<circle cx="140" cy="122" r="78" fill="#c7d2fe" fill-opacity="0.6" stroke="#334155" stroke-width="2"/>` +
    `<circle cx="220" cy="122" r="78" fill="#fde68a" fill-opacity="0.6" stroke="#334155" stroke-width="2"/>` +
    `<g font-family="sans-serif" fill="#1f2937">` +
    `<text x="110" y="34" font-size="13" font-weight="bold" text-anchor="middle">${labA}</text>` +
    `<text x="250" y="34" font-size="13" font-weight="bold" text-anchor="middle">${labB}</text>` +
    `<text x="100" y="128" font-size="18" text-anchor="middle">${vals[0]}</text>` +
    `<text x="180" y="128" font-size="18" text-anchor="middle">${vals[1]}</text>` +
    `<text x="260" y="128" font-size="18" text-anchor="middle">${vals[2]}</text>` +
    `<text x="330" y="208" font-size="18" text-anchor="middle">${vals[3]}</text>` +
    `</g></svg>`
  );
}

/** Two-bar chart whose vertical axis starts at S (a truncated axis). */
function barSvg(S: number, top: number, tick: number, cats: readonly [string, string], vals: readonly [number, number], yLabel: string, aria: string): string {
  const L = 70, R = 340, T = 22, B = 196;
  const py = (v: number) => B - ((v - S) / (top - S)) * (B - T);
  const p = (n: number) => n.toFixed(1);
  let s = `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect x="0" y="0" width="360" height="240" fill="#ffffff"/>`;
  let labels = "";
  for (let v = S; v <= top; v += tick) {
    const Y = p(py(v));
    s += `<line x1="${L}" y1="${Y}" x2="${R}" y2="${Y}" stroke="#e2e8f0" stroke-width="1"/>`;
    labels += `<text x="${L - 6}" y="${p(py(v) + 4)}" font-size="11" text-anchor="end">${num(v)}</text>`;
  }
  const centres = [150, 265];
  const fills = ["#c7d2fe", "#fde68a"];
  for (let i = 0; i < 2; i++) {
    const yTop = py(vals[i]);
    s += `<rect x="${centres[i] - 32}" y="${p(yTop)}" width="64" height="${p(B - yTop)}" fill="${fills[i]}" stroke="#334155" stroke-width="1.5"/>`;
    labels += `<text x="${centres[i]}" y="${p(yTop - 6)}" font-size="12" font-weight="bold" text-anchor="middle">${num(vals[i])}</text>`;
    labels += `<text x="${centres[i]}" y="${B + 18}" font-size="12" text-anchor="middle">${cats[i]}</text>`;
  }
  s += `<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#334155" stroke-width="1.5"/><line x1="${L}" y1="${T}" x2="${L}" y2="${B}" stroke="#334155" stroke-width="1.5"/>`;
  const midY = (T + B) / 2;
  s += `<g font-family="sans-serif" fill="#1f2937">${labels}<text x="16" y="${midY}" font-size="12" text-anchor="middle" transform="rotate(-90 16 ${midY})">${yLabel}</text></g></svg>`;
  return s;
}

// ---------------------------------------------------------------------------
// 1. Types of data
// ---------------------------------------------------------------------------

type DType = "categorical" | "discrete" | "continuous";
interface DItem {
  v: string;
  t: DType;
  why?: string;
  trapT?: DType;
  trapFb?: string;
}

const DT_BASIC: DItem[] = [
  { v: "the favourite CCA of each pupil in 8B", t: "categorical" },
  { v: "the eye colour of each pupil in a class", t: "categorical" },
  { v: "the MRT line each pupil uses to get to school", t: "categorical" },
  { v: "the type of pet each family owns", t: "categorical" },
  { v: "each pupil's favourite fruit", t: "categorical" },
  { v: "the colour of each car in a car park", t: "categorical" },
  { v: "how each pupil travels to school (walk, bus, MRT or car)", t: "categorical" },
  { v: "each pupil's favourite subject", t: "categorical" },
  { v: "the main language each pupil speaks at home", t: "categorical" },
  { v: "the country each tourist at Sentosa comes from", t: "categorical" },
  { v: "the flavour of ice cream each customer chooses", t: "categorical" },
  { v: "the genre of each book borrowed from the library", t: "categorical" },
  { v: "the number of siblings each pupil has", t: "discrete" },
  { v: "the number of goals scored in each football match", t: "discrete" },
  { v: "the number of books each pupil read last month", t: "discrete" },
  { v: "the number of people living in each flat in an HDB block", t: "discrete" },
  { v: "the number of rainy days in each month of the year", t: "discrete" },
  { v: "the number of cars that pass the school gate each minute", t: "discrete" },
  { v: "the number of correct answers each pupil got in a 20-question quiz", t: "discrete" },
  { v: "the number of durians on each tree in an orchard", t: "discrete" },
  { v: "the number of emails a teacher receives each day", t: "discrete" },
  { v: "the number of MRT stops on each pupil's journey to school", t: "discrete" },
  { v: "the number of red sweets in each packet", t: "discrete" },
  { v: "the number of pages in each book on a shelf", t: "discrete" },
  { v: "the height of each pupil in the class", t: "continuous" },
  { v: "the time each runner takes to finish a 100 m race", t: "continuous" },
  { v: "the mass of each durian at a fruit stall", t: "continuous" },
  { v: "the temperature at noon each day in June", t: "continuous" },
  { v: "the length of each leaf collected on a nature walk", t: "continuous" },
  { v: "the volume of water each pupil drinks in a day", t: "continuous" },
  { v: "the amount of rain that falls each day during the monsoon", t: "continuous" },
  { v: "the distance each pupil travels to school", t: "continuous" },
  { v: "the time each pupil spends on homework each evening", t: "continuous" },
  { v: "the mass of each pupil's schoolbag", t: "continuous" },
  { v: "the arm span of each pupil", t: "continuous" },
  { v: "the time a kettle takes to boil", t: "continuous" },
];

const LABEL_WHY = "The numbers are just labels. Adding or averaging them would mean nothing, so they are not numerical data.";
const LABEL_TRAP = "These numbers are labels, not counts. You can't do sums with them, so the data is categorical.";
const ROUND_TRAP = "The values are rounded to whole numbers, but the quantity is *measured*, so it is still continuous.";

const DT_TRICKY: DItem[] = [
  { v: "the number on each player's football shirt", t: "categorical", why: LABEL_WHY, trapT: "discrete", trapFb: LABEL_TRAP },
  { v: "the bus service number each pupil takes to school (such as 36 or 190)", t: "categorical", why: LABEL_WHY, trapT: "discrete", trapFb: LABEL_TRAP },
  { v: "the postal code of each pupil's home", t: "categorical", why: LABEL_WHY, trapT: "discrete", trapFb: LABEL_TRAP },
  { v: "each pupil's locker number", t: "categorical", why: LABEL_WHY, trapT: "discrete", trapFb: LABEL_TRAP },
  {
    v: "each diner's rating of a hawker stall as poor, fair, good or excellent",
    t: "categorical",
    why: "The ratings are words. They come in an order, but they are still labels, not counted or measured amounts.",
  },
  {
    v: "each pupil's height, measured to the nearest centimetre",
    t: "continuous",
    why: "Height is *measured*. Rounding it to whole centimetres doesn't change that, so it is still continuous.",
    trapT: "discrete",
    trapFb: ROUND_TRAP,
  },
  {
    v: "the time each pupil takes to solve a puzzle, rounded to the nearest second",
    t: "continuous",
    why: "Time is *measured*. Rounding to whole seconds doesn't change that, so it is still continuous.",
    trapT: "discrete",
    trapFb: ROUND_TRAP,
  },
  {
    v: "the mass of each parcel at a post office, recorded to the nearest kilogram",
    t: "continuous",
    why: "Mass is *measured*. Recording it to the nearest kilogram doesn't change that, so it is still continuous.",
    trapT: "discrete",
    trapFb: ROUND_TRAP,
  },
  {
    v: "the volume of juice in each carton, recorded in whole millilitres",
    t: "continuous",
    why: "Volume is *measured*. Recording it in whole millilitres doesn't change that, so it is still continuous.",
    trapT: "discrete",
    trapFb: ROUND_TRAP,
  },
  {
    v: "the number of skips each pupil can do in 30 seconds",
    t: "discrete",
    why: "The 30 seconds is fixed. What you record is a *count* of skips, so only whole numbers are possible.",
    trapT: "continuous",
    trapFb: "The time is fixed at 30 seconds. The data you record is a count of skips, so it is discrete.",
  },
  {
    v: "the score shown on each roll of an ordinary dice",
    t: "discrete",
    why: "Only the separate values 1, 2, 3, 4, 5 and 6 are possible, so the data is discrete.",
    trapT: "categorical",
    trapFb: "The scores are numbers you can add and average, so this is numerical data, and only separate values are possible.",
  },
];

const DT_WHY: Record<DType, string> = {
  categorical: "The answers are labels (words or names), not amounts you can count or measure.",
  discrete: "It is *counted*, so only separate values are possible: 0, 1, 2, 3, … but never 2.5.",
  continuous: "It is *measured*, so any value in a range is possible, not just whole numbers.",
};

const DT_ACCEPT: Record<DType, string[]> = {
  categorical: ["categorical", "categorical data", "qualitative", "qualitative data"],
  discrete: ["discrete", "discrete data", "discrete numerical", "numerical discrete"],
  continuous: ["continuous", "continuous data", "continuous numerical", "numerical continuous"],
};

const DT_TRAP: Record<DType, { t: DType; fb: string }> = {
  categorical: { t: "discrete", fb: "The categories are separate, but they are labels, not counts. Data made of labels is categorical." },
  discrete: { t: "continuous", fb: "You *count* this, so only whole-number values are possible. That makes it discrete." },
  continuous: { t: "discrete", fb: "You *measure* this, so values in between are possible. That makes it continuous." },
};

// ---------------------------------------------------------------------------
// 2. Grouped frequency tables
// ---------------------------------------------------------------------------

interface GCtx {
  intro: (n: number) => string;
  v: string;
  /** Data are integers in units of 1/sc. */
  sc: number;
  lo: number;
  w: number;
  k: number;
}

const GC_T1: GCtx[] = [
  { intro: (n) => `${n} pupils took a quiz. Their marks, *m*, are:`, v: "m", sc: 1, lo: 0, w: 10, k: 5 },
  { intro: (n) => `The times, *t* minutes, that ${n} pupils spent on homework last night are:`, v: "t", sc: 1, lo: 10, w: 10, k: 5 },
  { intro: (n) => `The numbers of push-ups, *p*, that ${n} pupils did in one minute are:`, v: "p", sc: 1, lo: 10, w: 10, k: 4 },
  { intro: (n) => `The ages, *a* years, of ${n} people at a badminton club are:`, v: "a", sc: 1, lo: 10, w: 10, k: 5 },
];
const GC_T2: GCtx[] = [
  { intro: (n) => `The heights, *h* cm, of ${n} sunflower seedlings are:`, v: "h", sc: 1, lo: 10, w: 5, k: 6 },
  { intro: (n) => `The times, *t* minutes, that ${n} runners took to finish a cross-country race are:`, v: "t", sc: 1, lo: 20, w: 10, k: 4 },
  { intro: (n) => `The masses, *m* grams, of ${n} mangoes are:`, v: "m", sc: 1, lo: 180, w: 20, k: 5 },
  { intro: (n) => `The rainfall, *r* mm, on ${n} days during the monsoon season was:`, v: "r", sc: 1, lo: 0, w: 10, k: 5 },
];
const GC_T3: GCtx[] = [
  { intro: (n) => `The times, *t* seconds, of ${n} runners in a 100 m race are:`, v: "t", sc: 10, lo: 120, w: 10, k: 5 },
  { intro: (n) => `The lengths, *l* cm, of ${n} leaves collected on a nature walk are:`, v: "l", sc: 10, lo: 40, w: 10, k: 5 },
  { intro: (n) => `The masses, *m* kg, of ${n} durians are:`, v: "m", sc: 10, lo: 10, w: 5, k: 5 },
  { intro: (n) => `The heights, *h* m, of ${n} young trees in a park are:`, v: "h", sc: 10, lo: 15, w: 5, k: 5 },
];

// ---------------------------------------------------------------------------
// Pie chart contexts (used by both pie drills)
// ---------------------------------------------------------------------------

interface PieCtx {
  /** Table heading, e.g. "Favourite CCA". */
  topic: string;
  /** What each person was asked: "their favourite CCA" / "how they travel to school". */
  ask: string;
  /** "the favourite CCA of 40 pupils" / "how 40 pupils travel to school". */
  of: (group: string) => string;
  who: string;
  one: string;
  cats: string[];
}

const PIE_CTX: PieCtx[] = [
  { topic: "favourite CCA", ask: "their favourite CCA", of: (g) => `the favourite CCA of ${g}`, who: "pupils", one: "pupil", cats: ["Football", "Choir", "Robotics", "Swimming", "Drama", "Chess"] },
  { topic: "way of travelling to school", ask: "how they usually travel to school", of: (g) => `how ${g} usually travel to school`, who: "pupils", one: "pupil", cats: ["Walk", "Bus", "MRT", "Car", "Cycle"] },
  { topic: "favourite fruit", ask: "their favourite fruit", of: (g) => `the favourite fruit of ${g}`, who: "people", one: "person", cats: ["Mango", "Durian", "Banana", "Papaya", "Rambutan", "Watermelon"] },
  { topic: "favourite hawker breakfast", ask: "their favourite hawker breakfast", of: (g) => `the favourite hawker breakfast of ${g}`, who: "people", one: "person", cats: ["Roti prata", "Thosai", "Chwee kueh", "Kaya toast", "Bee hoon"] },
  { topic: "favourite sport to watch", ask: "their favourite sport to watch", of: (g) => `which sport ${g} most like to watch`, who: "people", one: "person", cats: ["Football", "Badminton", "Basketball", "Tennis", "Athletics"] },
  { topic: "favourite type of book", ask: "their favourite type of book", of: (g) => `which type of book ${g} like best`, who: "pupils", one: "pupil", cats: ["Adventure", "Fantasy", "Mystery", "Comics", "Science"] },
];

/** Totals that divide 360 (whole number of degrees per person). */
const PIE_N_EASY = [18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120];
/** Totals that do not divide 360. */
const PIE_N_HARD = [16, 25, 32, 48, 50, 75, 80, 150, 200];

/** Smallest frequency step that gives a whole-number angle. */
function pieStep(N: number): number {
  return N / gcd(N, 360);
}

// ---------------------------------------------------------------------------
// 4. Stem-and-leaf contexts
// ---------------------------------------------------------------------------

interface SLCtx {
  intro: (n: string) => string;
  s0: number;
  s1: number;
  /** 1 = value is stem×10 + leaf; 10 = value is (stem×10 + leaf) ÷ 10. */
  sc: 1 | 10;
  unit: string;
}

const SL_T1: SLCtx[] = [
  { intro: (n) => `The stem-and-leaf diagram shows the marks of ${n} pupils in a science test.`, s0: 2, s1: 9, sc: 1, unit: "marks" },
  { intro: (n) => `The stem-and-leaf diagram shows the ages of ${n} people at a badminton club.`, s0: 1, s1: 6, sc: 1, unit: "years" },
  { intro: (n) => `The stem-and-leaf diagram shows how many minutes ${n} pupils spent reading yesterday.`, s0: 1, s1: 6, sc: 1, unit: "minutes" },
  { intro: (n) => `The stem-and-leaf diagram shows how many push-ups ${n} pupils did in one minute.`, s0: 1, s1: 5, sc: 1, unit: "push-ups" },
];
const SL_T2: SLCtx[] = [
  { intro: (n) => `The stem-and-leaf diagram shows the times of ${n} pupils in a 50 m sprint.`, s0: 6, s1: 9, sc: 10, unit: "seconds" },
  { intro: (n) => `The stem-and-leaf diagram shows the heights of ${n} pupils.`, s0: 13, s1: 17, sc: 1, unit: "cm" },
  { intro: (n) => `The stem-and-leaf diagram shows the masses of ${n} mangoes.`, s0: 18, s1: 23, sc: 1, unit: "g" },
  { intro: (n) => `The stem-and-leaf diagram shows the lengths of ${n} leaves.`, s0: 3, s1: 7, sc: 10, unit: "cm" },
];

interface B2BCtx {
  intro: string;
  A: string;
  B: string;
  keyA: string;
  keyB: string;
  s0: number;
  s1: number;
  unit: string;
}

const SL_B2B: B2BCtx[] = [
  { intro: "The back-to-back stem-and-leaf diagram shows the test marks of the pupils in 8A and 8B.", A: "8A", B: "8B", keyA: "8A", keyB: "8B", s0: 2, s1: 6, unit: "marks" },
  { intro: "The back-to-back stem-and-leaf diagram shows the times, in seconds, that some boys and girls took to solve a puzzle.", A: "Boys", B: "Girls", keyA: "the boys", keyB: "the girls", s0: 1, s1: 5, unit: "seconds" },
  { intro: "The back-to-back stem-and-leaf diagram shows how many skips some pupils did in 30 seconds, before and after a month of training.", A: "Before", B: "After", keyA: "before training", keyB: "after training", s0: 3, s1: 7, unit: "skips" },
];

// ---------------------------------------------------------------------------
// 5. Sampling contexts
// ---------------------------------------------------------------------------

const SYS_CTX: Array<{ intro: (N: number) => string; pop: string; item: string }> = [
  { intro: (N) => `A school has ${big(N)} pupils, numbered 1 to ${big(N)} on an alphabetical list.`, pop: "pupils", item: "pupil" },
  { intro: (N) => `A badminton club has ${big(N)} members, numbered 1 to ${big(N)}.`, pop: "members", item: "member" },
  { intro: (N) => `A factory made ${big(N)} phone cases yesterday, numbered 1 to ${big(N)} in the order they were made.`, pop: "phone cases", item: "phone case" },
  { intro: (N) => `A library catalogue lists ${big(N)} books, numbered 1 to ${big(N)}.`, pop: "books", item: "book" },
  { intro: (N) => `An HDB estate has ${big(N)} households on a list, numbered 1 to ${big(N)}.`, pop: "households", item: "household" },
];

const STRAT_CTX: Array<{ intro: string; head: string; groups: string[]; unit: string }> = [
  { intro: "A secondary school wants to survey its pupils about the canteen.", head: "Year group", groups: ["Year 7", "Year 8", "Year 9", "Year 10"], unit: "pupils" },
  { intro: "A sports club wants to ask its members about new opening hours.", head: "Age group", groups: ["Under 18", "18 to 40", "41 to 60", "Over 60"], unit: "members" },
  { intro: "A company wants to ask its workers about a new lunch break.", head: "Department", groups: ["Office", "Factory", "Delivery", "Sales"], unit: "workers" },
  { intro: "A community centre wants to survey the people who come to its classes.", head: "Class", groups: ["Yoga", "Cooking", "Dance", "Art"], unit: "people" },
];

const EST_CTX: Array<{ sample: string; pop: string; verb: string; be: "are" | "were" }> = [
  { sample: "pupils at a school", pop: "pupils at the school", verb: "walk to school", be: "are" },
  { sample: "residents of an estate", pop: "residents in the estate", verb: "would use a community garden", be: "are" },
  { sample: "visitors to Sentosa one Sunday", pop: "visitors to Sentosa that day", verb: "were visiting for the first time", be: "were" },
  { sample: "Year 8 pupils", pop: "Year 8 pupils in the district", verb: "own a pet", be: "are" },
  { sample: "people at a hawker centre one evening", pop: "people at the hawker centre that evening", verb: "paid by card", be: "were" },
];

// ---------------------------------------------------------------------------
// 6. Two-way tables
// ---------------------------------------------------------------------------

interface TWCtx {
  what: string;
  rows: string[];
  cols: string[];
}

const TW_CTX: TWCtx[] = [
  { what: "how some Year 8 pupils travel to school", rows: ["Boys", "Girls"], cols: ["Walk", "Bus", "MRT"] },
  { what: "the lunch choices of some pupils", rows: ["Year 7", "Year 8", "Year 9"], cols: ["Noodles", "Rice", "Salad"] },
  { what: "the CCAs chosen by some pupils", rows: ["Year 7", "Year 8", "Year 9"], cols: ["Sports", "Arts", "Clubs"] },
  { what: "the favourite fruit of some pupils", rows: ["Boys", "Girls"], cols: ["Mango", "Durian", "Banana"] },
  { what: "the drinks sold at a hawker stall one morning", rows: ["Hot", "Iced"], cols: ["Kopi", "Teh", "Milo"] },
  { what: "the instruments played by members of a school band", rows: ["Lower sec", "Upper sec"], cols: ["Strings", "Brass", "Drums"] },
];

interface TWStep {
  cell: number;
  kind: "row" | "col";
  idx: number;
  deps: number[];
}

/** Cells are keyed r*10 + c; row R and column C hold the totals. */
function solveGrid(R: number, C: number, hidden: Set<number>): TWStep[] | null {
  const unk = new Set(hidden);
  const steps: TWStep[] = [];
  const lines: Array<{ kind: "row" | "col"; idx: number; cells: number[] }> = [];
  for (let r = 0; r <= R; r++) lines.push({ kind: "row", idx: r, cells: Array.from({ length: C + 1 }, (_, c) => r * 10 + c) });
  for (let c = 0; c <= C; c++) lines.push({ kind: "col", idx: c, cells: Array.from({ length: R + 1 }, (_, r) => r * 10 + c) });
  let progress = true;
  while (unk.size > 0 && progress) {
    progress = false;
    for (const ln of lines) {
      const u = ln.cells.filter((x) => unk.has(x));
      if (u.length !== 1) continue;
      unk.delete(u[0]);
      steps.push({ cell: u[0], kind: ln.kind, idx: ln.idx, deps: ln.cells.filter((x) => x !== u[0] && hidden.has(x)) });
      progress = true;
    }
  }
  return unk.size === 0 ? steps : null;
}

function neededSteps(steps: TWStep[], target: number): TWStep[] {
  const need = new Set<number>();
  const visit = (cell: number) => {
    if (need.has(cell)) return;
    need.add(cell);
    const st = steps.find((s) => s.cell === cell);
    if (st) st.deps.forEach(visit);
  };
  visit(target);
  return steps.filter((s) => need.has(s.cell));
}

// ---------------------------------------------------------------------------
// 8. Venn & Carroll contexts
// ---------------------------------------------------------------------------

interface VennCtx {
  who: string;
  A: string;
  notA: string;
  B: string;
  notB: string;
  neither: string;
  labA: string;
  labB: string;
  rowY: string;
  rowN: string;
  colY: string;
  colN: string;
}

const VENN_CTX: VennCtx[] = [
  {
    who: "pupils", A: "play badminton", notA: "do not play badminton", B: "swim", notB: "do not swim", neither: "do neither",
    labA: "Badminton", labB: "Swimming", rowY: "Plays badminton", rowN: "Does not play badminton", colY: "Swims", colN: "Does not swim",
  },
  {
    who: "pupils", A: "learn the piano", notA: "do not learn the piano", B: "learn the violin", notB: "do not learn the violin", neither: "learn neither instrument",
    labA: "Piano", labB: "Violin", rowY: "Learns piano", rowN: "Does not learn piano", colY: "Learns violin", colN: "Does not learn violin",
  },
  {
    who: "people", A: "have visited Sentosa", notA: "have not visited Sentosa", B: "have visited the Zoo", notB: "have not visited the Zoo", neither: "have visited neither place",
    labA: "Sentosa", labB: "Zoo", rowY: "Visited Sentosa", rowN: "Not visited Sentosa", colY: "Visited the Zoo", colN: "Not visited the Zoo",
  },
  {
    who: "pupils", A: "like mango", notA: "do not like mango", B: "like durian", notB: "do not like durian", neither: "like neither fruit",
    labA: "Mango", labB: "Durian", rowY: "Likes mango", rowN: "Does not like mango", colY: "Likes durian", colN: "Does not like durian",
  },
  {
    who: "families", A: "own a cat", notA: "do not own a cat", B: "own a dog", notB: "do not own a dog", neither: "own neither pet",
    labA: "Cat", labB: "Dog", rowY: "Owns a cat", rowN: "No cat", colY: "Owns a dog", colN: "No dog",
  },
];

interface NumProp {
  name: string;
  /** Used in a sentence: "is ___". */
  adj: string;
  not: string;
  plural: string;
  test: (n: number) => boolean;
}

const isSquare = (n: number) => Number.isInteger(Math.sqrt(n));

const PROPS: NumProp[] = [
  { name: "Even", adj: "even", not: "Not even", plural: "Even numbers", test: (n) => n % 2 === 0 }, // 0
  { name: "Odd", adj: "odd", not: "Not odd", plural: "Odd numbers", test: (n) => n % 2 === 1 }, // 1
  { name: "Multiple of 3", adj: "a multiple of 3", not: "Not a multiple of 3", plural: "Multiples of 3", test: (n) => n % 3 === 0 }, // 2
  { name: "Multiple of 4", adj: "a multiple of 4", not: "Not a multiple of 4", plural: "Multiples of 4", test: (n) => n % 4 === 0 }, // 3
  { name: "Multiple of 5", adj: "a multiple of 5", not: "Not a multiple of 5", plural: "Multiples of 5", test: (n) => n % 5 === 0 }, // 4
  { name: "Prime", adj: "prime", not: "Not prime", plural: "Prime numbers", test: isPrime }, // 5
  { name: "Square number", adj: "a square number", not: "Not a square number", plural: "Square numbers", test: isSquare }, // 6
  { name: "Factor of 60", adj: "a factor of 60", not: "Not a factor of 60", plural: "Factors of 60", test: (n) => 60 % n === 0 }, // 7
  { name: "Greater than 25", adj: "greater than 25", not: "Not greater than 25", plural: "Numbers greater than 25", test: (n) => n > 25 }, // 8
];

const PROP_PAIRS: Array<[number, number]> = [
  [0, 2], [0, 4], [1, 2], [1, 4], [6, 0], [6, 1], [5, 8], [2, 3], [3, 7], [7, 0], [4, 8], [2, 8],
];

// ---------------------------------------------------------------------------
// 9 & 10. Scatter graph contexts
// ---------------------------------------------------------------------------

type Dir = "positive" | "negative" | "none";

interface CorrCtx {
  x: Axis;
  y: Axis;
  xr: number;
  yr: number;
  who: string;
  dir: Dir;
}

const CORR_CTX: CorrCtx[] = [
  { x: { lo: 24, hi: 34, step: 2, label: "Temperature (°C)" }, y: { lo: 0, hi: 100, step: 20, label: "Cold drinks sold" }, xr: 0.5, yr: 1, who: "days", dir: "positive" },
  { x: { lo: 140, hi: 180, step: 10, label: "Height (cm)" }, y: { lo: 140, hi: 180, step: 10, label: "Arm span (cm)" }, xr: 1, yr: 1, who: "pupils", dir: "positive" },
  { x: { lo: 0, hi: 10, step: 2, label: "Hours of revision" }, y: { lo: 0, hi: 100, step: 20, label: "Test score (%)" }, xr: 0.5, yr: 1, who: "pupils", dir: "positive" },
  { x: { lo: 0, hi: 50, step: 10, label: "Age of tree (years)" }, y: { lo: 0, hi: 20, step: 5, label: "Height of tree (m)" }, xr: 1, yr: 0.5, who: "trees", dir: "positive" },
  { x: { lo: 0, hi: 40, step: 10, label: "Distance (km)" }, y: { lo: 0, hi: 50, step: 10, label: "Taxi fare ($)" }, xr: 1, yr: 0.5, who: "taxi journeys", dir: "positive" },
  { x: { lo: 24, hi: 34, step: 2, label: "Temperature (°C)" }, y: { lo: 0, hi: 100, step: 20, label: "Hot drinks sold" }, xr: 0.5, yr: 1, who: "days", dir: "negative" },
  { x: { lo: 0, hi: 10, step: 2, label: "Age of car (years)" }, y: { lo: 0, hi: 50, step: 10, label: "Value of car ($ thousands)" }, xr: 0.5, yr: 1, who: "cars", dir: "negative" },
  { x: { lo: 0, hi: 2000, step: 400, label: "Height above sea level (m)" }, y: { lo: 0, hi: 30, step: 5, label: "Temperature (°C)" }, xr: 50, yr: 0.5, who: "places", dir: "negative" },
  { x: { lo: 0, hi: 8, step: 2, label: "Screen time (hours a day)" }, y: { lo: 5, hi: 10, step: 1, label: "Hours of sleep" }, xr: 0.5, yr: 0.1, who: "pupils", dir: "negative" },
  { x: { lo: 20, hi: 100, step: 20, label: "Average speed (km/h)" }, y: { lo: 0, hi: 60, step: 10, label: "Journey time (minutes)" }, xr: 5, yr: 1, who: "journeys", dir: "negative" },
  { x: { lo: 140, hi: 180, step: 10, label: "Height (cm)" }, y: { lo: 0, hi: 100, step: 20, label: "Maths test score (%)" }, xr: 1, yr: 1, who: "pupils", dir: "none" },
  { x: { lo: 0, hi: 30, step: 5, label: "Day of the month born" }, y: { lo: 140, hi: 180, step: 10, label: "Height (cm)" }, xr: 1, yr: 1, who: "pupils", dir: "none" },
  { x: { lo: 34, hi: 44, step: 2, label: "Shoe size" }, y: { lo: 0, hi: 100, step: 20, label: "Spelling test score" }, xr: 0.5, yr: 1, who: "pupils", dir: "none" },
  { x: { lo: 0, hi: 100, step: 20, label: "House number" }, y: { lo: 5, hi: 10, step: 1, label: "Hours of sleep" }, xr: 1, yr: 0.1, who: "people", dir: "none" },
  { x: { lo: 0, hi: 20, step: 5, label: "Minutes to walk to school" }, y: { lo: 0, hi: 100, step: 20, label: "Test score (%)" }, xr: 1, yr: 1, who: "pupils", dir: "none" },
];

const CORR_ACCEPT: Record<Dir, string[]> = {
  positive: [
    "positive correlation", "positive", "strong positive", "weak positive", "moderate positive",
    "strong positive correlation", "weak positive correlation", "moderate positive correlation", "positively correlated",
  ],
  negative: [
    "negative correlation", "negative", "strong negative", "weak negative", "moderate negative",
    "strong negative correlation", "weak negative correlation", "moderate negative correlation", "negatively correlated",
  ],
  none: ["no correlation", "none", "no", "zero", "zero correlation", "no relationship", "not correlated", "nocorrelation"],
};

interface FitCtx {
  x: Axis;
  y: Axis;
  dir: 1 | -1;
  /** Allowed gradients in grid units (default 0.5 or 1). */
  slopes?: number[];
  who: string;
  fwd: (xv: string) => string;
  inv: (yv: string) => string;
  xu: string;
  yu: string;
}

const FIT_CTX: FitCtx[] = [
  {
    x: { lo: 0, hi: 10, step: 1, label: "Hours of revision" }, y: { lo: 0, hi: 100, step: 10, label: "Test score (%)" }, dir: 1, who: "pupils",
    fwd: (xv) => `Use the line of best fit to estimate the test score of a pupil who revised for ${xv} hours.`,
    inv: (yv) => `A pupil scored ${yv}% in the test. Use the line of best fit to estimate how many hours they revised.`,
    xu: "hours", yu: "%",
  },
  {
    x: { lo: 20, hi: 40, step: 2, label: "Temperature (°C)" }, y: { lo: 0, hi: 200, step: 20, label: "Cold drinks sold" }, dir: 1, who: "days",
    fwd: (xv) => `Use the line of best fit to estimate the number of cold drinks sold on a day when the temperature is ${xv} °C.`,
    inv: (yv) => `On one day, ${yv} cold drinks were sold. Use the line of best fit to estimate the temperature that day, in °C.`,
    xu: "°C", yu: "drinks",
  },
  {
    x: { lo: 0, hi: 10, step: 1, label: "Age of car (years)" }, y: { lo: 0, hi: 50, step: 5, label: "Value ($ thousands)" }, dir: -1, who: "cars",
    fwd: (xv) => `Use the line of best fit to estimate the value, in $ thousands, of a car that is ${xv} years old.`,
    inv: (yv) => `A car is worth $${yv} thousand. Use the line of best fit to estimate its age in years.`,
    xu: "years", yu: "thousand dollars",
  },
  {
    x: { lo: 130, hi: 180, step: 5, label: "Height (cm)" }, y: { lo: 130, hi: 180, step: 5, label: "Arm span (cm)", every: 2 }, dir: 1, slopes: [1], who: "pupils",
    fwd: (xv) => `Use the line of best fit to estimate the arm span, in cm, of a pupil who is ${xv} cm tall.`,
    inv: (yv) => `A pupil has an arm span of ${yv} cm. Use the line of best fit to estimate their height in cm.`,
    xu: "cm", yu: "cm",
  },
  {
    x: { lo: 0, hi: 2000, step: 200, label: "Height above sea level (m)", every: 2 }, y: { lo: 10, hi: 30, step: 2, label: "Temperature (°C)" }, dir: -1, who: "places",
    fwd: (xv) => `Use the line of best fit to estimate the temperature, in °C, at a place ${xv} m above sea level.`,
    inv: (yv) => `Use the line of best fit to estimate the height above sea level, in metres, of a place where the temperature is ${yv} °C.`,
    xu: "m", yu: "°C",
  },
  {
    x: { lo: 0, hi: 10, step: 1, label: "Screen time (hours a day)" }, y: { lo: 5, hi: 10, step: 0.5, label: "Hours of sleep", every: 2 }, dir: -1, who: "pupils",
    fwd: (xv) => `Use the line of best fit to estimate the hours of sleep of a pupil with ${xv} hours of screen time a day.`,
    inv: (yv) => `A pupil sleeps for ${yv} hours a night. Use the line of best fit to estimate their screen time, in hours a day.`,
    xu: "hours", yu: "hours",
  },
];

// ---------------------------------------------------------------------------
// 11. Misleading bar chart contexts
// ---------------------------------------------------------------------------

const BAR_CTX: Array<{ what: string; cats: [string, string]; yl: string; m: number }> = [
  { what: "the number of visitors to two museums one Saturday", cats: ["Art Museum", "Science Centre"], yl: "Visitors", m: 10 },
  { what: "the number of cups of bubble tea sold by two stalls in one day", cats: ["Stall P", "Stall Q"], yl: "Cups sold", m: 1 },
  { what: "the votes for two designs of a new school badge", cats: ["Design 1", "Design 2"], yl: "Votes", m: 1 },
  { what: "the number of phones sold by two brands in one month", cats: ["Brand X", "Brand Y"], yl: "Phones sold", m: 100 },
  { what: "the number of books borrowed from a library in two months", cats: ["March", "April"], yl: "Books borrowed", m: 10 },
];

/** Tick size and top of axis for a bar of height d above the axis start. */
function axisTop(d: number): { tick: number; top: number } {
  for (const t of [1, 2, 5, 10, 20]) {
    const steps = Math.ceil((d + 1) / t);
    if (steps <= 7) return { tick: t, top: t * Math.max(steps, 3) };
  }
  return { tick: 20, top: 20 * Math.ceil((d + 1) / 20) };
}

// ---------------------------------------------------------------------------
// 12. Frequency polygon contexts
// ---------------------------------------------------------------------------

interface FPCtx {
  intro: string;
  head: string;
  v: string;
  who: string;
  noun: string;
  unit: string;
  sc: number;
  lo: number;
  w: number;
  k: number;
}

const FP_T1: FPCtx[] = [
  { intro: "The table shows the times, *t* minutes, that some pupils took to finish a puzzle.", head: "Time, *t* (minutes)", v: "t", who: "pupils", noun: "time", unit: "minutes", sc: 1, lo: 0, w: 10, k: 5 },
  { intro: "The table shows the heights, *h* cm, of some seedlings.", head: "Height, *h* (cm)", v: "h", who: "seedlings", noun: "height", unit: "cm", sc: 1, lo: 0, w: 10, k: 5 },
  { intro: "The table shows the masses, *m* grams, of some apples.", head: "Mass, *m* (g)", v: "m", who: "apples", noun: "mass", unit: "g", sc: 1, lo: 100, w: 20, k: 5 },
];
const FP_T2: FPCtx[] = [
  { intro: "The table shows the times, *t* seconds, of some runners in a 200 m race.", head: "Time, *t* (seconds)", v: "t", who: "runners", noun: "time", unit: "seconds", sc: 1, lo: 20, w: 5, k: 5 },
  { intro: "The table shows the lengths, *l* cm, of some leaves.", head: "Length, *l* (cm)", v: "l", who: "leaves", noun: "length", unit: "cm", sc: 1, lo: 10, w: 5, k: 5 },
  { intro: "The table shows the masses, *m* grams, of some mangoes.", head: "Mass, *m* (g)", v: "m", who: "mangoes", noun: "mass", unit: "g", sc: 1, lo: 150, w: 25, k: 5 },
];
const FP_T3: FPCtx[] = [
  { intro: "The table shows the heights, *h* metres, of some pupils.", head: "Height, *h* (m)", v: "h", who: "pupils", noun: "height", unit: "m", sc: 100, lo: 140, w: 10, k: 5 },
  { intro: "The table shows the masses, *m* kg, of some durians.", head: "Mass, *m* (kg)", v: "m", who: "durians", noun: "mass", unit: "kg", sc: 10, lo: 10, w: 5, k: 5 },
  { intro: "The table shows the distances, *d* metres, of some long jumps.", head: "Distance, *d* (m)", v: "d", who: "jumps", noun: "distance", unit: "m", sc: 10, lo: 20, w: 4, k: 5 },
];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 -----------------------------------------------------------------------
  {
    id: "statistics.data-types",
    topicId: "statistics",
    title: "Categorical, discrete or continuous?",
    level: 1,
    guideRef: "data-and-sampling",
    generate(rng, tier) {
      const item = tier === 3 && rng.bool(0.65) ? rng.pick(DT_TRICKY) : rng.pick(DT_BASIC);
      const name = rng.pick(NAMES);
      const tpl = rng.int(0, tier === 1 ? 1 : 2);
      const prompt =
        tpl === 0
          ? `Is this data categorical, discrete or continuous?\n\n**${cap(item.v)}**`
          : tpl === 1
            ? `${name} is collecting data on ${item.v}. What type of data is this: categorical, discrete or continuous?`
            : `${name}'s survey records ${item.v}. Is this data categorical, discrete or continuous?`;
      const why = item.why ?? DT_WHY[item.t];
      const solution =
        item.t === "categorical"
          ? ["First ask: is it an amount you could count or measure?", why, "So it is **categorical** data."]
          : ["It is an amount, so the data is numerical: either discrete or continuous.", why, `So it is **${item.t}** data.`];
      const trapDef = item.trapT ? { t: item.trapT, fb: item.trapFb ?? DT_TRAP[item.t].fb } : DT_TRAP[item.t];
      return {
        prompt,
        answer: { type: "text", accept: DT_ACCEPT[item.t], display: item.t },
        solution,
        hint: "Is it a word or label, or an amount? If it's an amount: do you count it or measure it?",
        traps: trapDef.t !== item.t ? [textTrap(DT_ACCEPT[trapDef.t], trapDef.fb)] : [],
      };
    },
  },

  // 2 -----------------------------------------------------------------------
  {
    id: "statistics.grouped-class-frequency",
    topicId: "statistics",
    title: "Find a class frequency in a grouped table",
    level: 1,
    guideRef: "tables",
    generate(rng, tier) {
      const ctx = rng.pick(tier === 1 ? GC_T1 : tier === 2 ? GC_T2 : GC_T3);
      const lowerIncl = tier === 1 ? true : rng.bool();
      const hiU = ctx.lo + ctx.k * ctx.w;
      const dMin = lowerIncl ? ctx.lo : ctx.lo + 1;
      const dMax = lowerIncl ? hiU - 1 : hiU;
      const inC = (x: number, a: number, b: number) => (lowerIncl ? x >= a && x < b : x > a && x <= b);
      const inAlt = (x: number, a: number, b: number) => (lowerIncl ? x > a && x <= b : x >= a && x < b);
      let vals: number[] = [];
      let a = ctx.lo, b = ctx.lo + ctx.w, count = 0, alt = 0;
      for (let i = 0; i < 200; i++) {
        const n = rng.int(tier === 1 ? 12 : 14, tier === 1 ? 15 : 18);
        const ci = tier === 1 ? rng.int(0, ctx.k - 1) : lowerIncl ? rng.int(0, ctx.k - 2) : rng.int(1, ctx.k - 1);
        a = ctx.lo + ci * ctx.w;
        b = a + ctx.w;
        vals = Array.from({ length: n }, () => rng.int(dMin, dMax));
        if (tier >= 2) {
          // Plant the tricky boundary value(s).
          const excluded = lowerIncl ? b : a;
          const included = lowerIncl ? a : b;
          const nEx = rng.int(1, 2);
          const idx = rng.shuffle(Array.from({ length: n }, (_, j) => j));
          for (let j = 0; j < nEx; j++) vals[idx[j]] = excluded;
          if (rng.bool(0.4)) vals[idx[nEx]] = included;
        }
        count = vals.filter((x) => inC(x, a, b)).length;
        alt = vals.filter((x) => inAlt(x, a, b)).length;
        if (count >= 2 && count <= vals.length - 3 && (tier === 1 || alt !== count)) break;
      }
      const disp = (u: number) => (ctx.sc === 1 ? String(u) : (u / ctx.sc).toFixed(1));
      const A = num(clean(a / ctx.sc)), B = num(clean(b / ctx.sc));
      const cls = lowerIncl ? `{{${A} <= ${ctx.v} < ${B}}}` : `{{${A} < ${ctx.v} <= ${B}}}`;
      const inList = vals.filter((x) => inC(x, a, b)).sort((p, q) => p - q).map(disp);
      const exVal = lowerIncl ? b : a;
      const exPresent = vals.includes(exVal);
      const first = lowerIncl
        ? `The class ${cls} includes ${A} but not ${B}.${exPresent ? ` A value of exactly ${B} goes in the next class up.` : ""}`
        : `The class ${cls} includes ${B} but not ${A}.${exPresent ? ` A value of exactly ${A} belongs in the class below.` : ""}`;
      const traps: Trap[] = [];
      if (alt !== count) {
        traps.push(numTrap(alt, `Check the ends of the class: ${cls} includes ${lowerIncl ? A : B} but not ${lowerIncl ? B : A}.`));
      }
      return {
        prompt: `${ctx.intro(vals.length)}\n\n${dataBlock([vals.map(disp).join(", ")])}\n\nThey are sorted into a grouped frequency table. What is the frequency of the class ${cls}?`,
        answer: { type: "number", value: count },
        solution: [first, `Values in the class, in order: ${inList.join(", ")}.`, `Frequency = ${count}.`],
        hint: "Check each end of the class: which inequality sign includes \"equal to\"?",
        traps,
      };
    },
  },

  // 3 -----------------------------------------------------------------------
  {
    id: "statistics.pie-chart-angle",
    topicId: "statistics",
    title: "Work out a pie chart angle",
    level: 1,
    guideRef: "charts",
    generate(rng, tier) {
      const ctx = rng.pick(PIE_CTX);
      const name = rng.pick(NAMES);
      const k = rng.int(4, 5);
      const cats = rng.shuffle(ctx.cats).slice(0, k);
      let N = 40;
      let fs = [10, 14, 6, 10];
      let t = 0;
      let found = false;
      for (let i = 0; i < 200 && !found; i++) {
        N = rng.pick(tier === 1 ? PIE_N_EASY : tier === 2 ? PIE_N_HARD : [...PIE_N_EASY, ...PIE_N_HARD]);
        const p = partition(rng, N, k, 2);
        if (!p) continue;
        const ok = p.map((_, j) => j).filter((j) => (p[j] * 360) % N === 0);
        if (!ok.length) continue;
        fs = p;
        t = rng.pick(ok);
        found = true;
      }
      if (!found) {
        N = 40;
        fs = [10, 14, 6, 10, 0].slice(0, k);
        if (k === 5) fs = [10, 12, 6, 8, 4];
        t = 0;
      }
      const f = fs[t];
      const A = (f * 360) / N;
      const cat = cats[t];
      const tableRows = cats.map((c, j) => `| ${c} | ${tier === 3 && j === t ? "" : fs[j]} |`);
      const table = `| ${cap(ctx.topic)} | Frequency |\n|---|---|\n${tableRows.join("\n")}`;
      let prompt: string;
      let solution: string[];
      if (tier === 1) {
        const u = 360 / N;
        prompt = `${N} ${ctx.who} were asked ${ctx.ask}. The results are in the table.\n\n${table}\n\n${name} draws a pie chart. Work out the angle of the sector for **${cat}**. Give your answer in degrees.`;
        solution = [
          `There are ${N} ${ctx.who}, so each ${ctx.one} gets 360° ÷ ${N} = ${u}°.`,
          `${cat}: ${f} × ${u}° = ${A}°.`,
        ];
      } else if (tier === 2) {
        prompt = `The table shows ${ctx.of(`a group of ${ctx.who}`)}.\n\n${table}\n\nWork out the angle of the pie chart sector for **${cat}**. Give your answer in degrees.`;
        solution = [
          `Total = ${fs.join(" + ")} = ${N} ${ctx.who}.`,
          `${cat} is {{${f}/${N}}} of the total, so its sector is {{${f}/${N}}} of 360°.`,
          `{{${f}/${N}}} × 360° = ${A}°.`,
        ];
      } else {
        const others = fs.filter((_, j) => j !== t);
        prompt = `${N} ${ctx.who} were asked ${ctx.ask}. The frequency for **${cat}** is missing from the table.\n\n${table}\n\nWork out the angle of the **${cat}** sector in a pie chart. Give your answer in degrees.`;
        solution = [
          `${cat}: ${N} − (${others.join(" + ")}) = ${N} − ${sumOf(others)} = ${f} ${ctx.who}.`,
          `${cat} is {{${f}/${N}}} of the total, so its angle is {{${f}/${N}}} × 360°.`,
          `{{${f}/${N}}} × 360° = ${A}°.`,
        ];
      }
      const traps: Trap[] = [];
      if (f !== A) traps.push(numTrap(f, "That's the frequency, not the angle. Turn it into a share of 360°."));
      if ((f * 100) % N === 0) {
        const pct = (f * 100) / N;
        if (pct !== A && pct !== f) traps.push(numTrap(pct, `That's the percentage. A pie chart shares out 360°, not 100.`));
      }
      return {
        prompt,
        answer: { type: "number", value: A, display: `${A}°` },
        solution,
        hint: "What fraction of all the people is this category? The whole circle is 360°.",
        traps,
      };
    },
  },

  // 4 -----------------------------------------------------------------------
  {
    id: "statistics.stem-and-leaf-read",
    topicId: "statistics",
    title: "Read a stem-and-leaf diagram",
    level: 1,
    guideRef: "stem-and-leaf",
    generate(rng, tier) {
      if (tier === 3) {
        // Back-to-back diagram (stretch).
        const ctx = rng.pick(SL_B2B);
        const nRows = rng.int(3, 4);
        const s0 = rng.int(ctx.s0, ctx.s1 - nRows + 1);
        const stems = Array.from({ length: nRows }, (_, i) => s0 + i);
        const genSide = (): number[][] => stems.map(() => Array.from({ length: rng.int(1, 4) }, () => rng.int(0, 9)).sort((p, q) => p - q));
        let left = genSide();
        let right = genSide();
        const qTypes = ["minL", "maxL", "gtL", "ltR"] as const;
        let q: (typeof qTypes)[number] = "gtL";
        let X = 0;
        let ok = false;
        for (let i = 0; i < 200 && !ok; i++) {
          left = genSide();
          right = genSide();
          // Make the first and last left rows have at least two different leaves.
          if (left[0].length < 2 || new Set(left[0]).size < 2) continue;
          if (left[nRows - 1].length < 2 || new Set(left[nRows - 1]).size < 2) continue;
          q = rng.pick(qTypes);
          const valsL = left.flatMap((ls, i2) => ls.map((l) => stems[i2] * 10 + l));
          const valsR = right.flatMap((ls, i2) => ls.map((l) => stems[i2] * 10 + l));
          if (q === "gtL") {
            X = rng.pick(valsL);
            const c = valsL.filter((v) => v > X).length;
            ok = c >= 1 && c <= valsL.length - 2;
          } else if (q === "ltR") {
            X = rng.pick(valsR);
            const c = valsR.filter((v) => v < X).length;
            ok = c >= 1 && c <= valsR.length - 2 && valsR.length >= 5;
          } else ok = true;
        }
        if (!ok) {
          left = stems.map((_, i) => (i === 0 || i === nRows - 1 ? [2, 7] : [4]));
          q = "minL";
        }
        const valsL = left.flatMap((ls, i) => ls.map((l) => stems[i] * 10 + l)).sort((p, r) => p - r);
        const valsR = right.flatMap((ls, i) => ls.map((l) => stems[i] * 10 + l)).sort((p, r) => p - r);
        const rows = stems.map((s, i) => `| ${[...left[i]].reverse().join(" ")} | ${s} | ${right[i].join(" ")} |`);
        const kS = stems[1], kL = left[1][0], kR = right[1][right[1].length - 1];
        const table = `| ${ctx.A} | Stem | ${ctx.B} |\n|---|---|---|\n${rows.join("\n")}`;
        const key = `Key: ${kL} | ${kS} | ${kR} means ${kS * 10 + kL} ${ctx.unit} for ${ctx.keyA} and ${kS * 10 + kR} ${ctx.unit} for ${ctx.keyB}`;
        let question = "", ans = 0;
        let solution: string[] = [];
        const traps: Trap[] = [];
        const readL = `The leaves for **${ctx.A}** are on the left. They read outwards from the stem, right to left, so the smallest leaf is next to the stem.`;
        if (q === "minL") {
          const row = left[0];
          ans = stems[0] * 10 + row[0];
          const wrong = stems[0] * 10 + row[row.length - 1];
          question = `What is the smallest value for **${ctx.A}**?`;
          solution = [readL, `The smallest value is on the top stem (${stems[0]}), next to the stem: leaf ${row[0]}.`, `So the smallest value is ${ans} ${ctx.unit}.`];
          if (wrong !== ans) traps.push(numTrap(wrong, "On the left side, the leaf next to the stem is the smallest. Read outwards from the stem."));
        } else if (q === "maxL") {
          const row = left[nRows - 1];
          ans = stems[nRows - 1] * 10 + row[row.length - 1];
          const wrong = stems[nRows - 1] * 10 + row[0];
          question = `What is the largest value for **${ctx.A}**?`;
          solution = [readL, `The largest value is on the bottom stem (${stems[nRows - 1]}), furthest from the stem: leaf ${row[row.length - 1]}.`, `So the largest value is ${ans} ${ctx.unit}.`];
          if (wrong !== ans) traps.push(numTrap(wrong, "On the left side, the leaf furthest from the stem is the largest. Read outwards from the stem."));
        } else if (q === "gtL") {
          const list = valsL.filter((v) => v > X);
          ans = list.length;
          question = `How many of the values for **${ctx.A}** are greater than ${X}?`;
          solution = [readL, `Values for ${ctx.A} greater than ${X}: ${list.join(", ")}.`, `That's ${ans} ${ans === 1 ? "value" : "values"} (${X} itself is not greater than ${X}).`];
          const wrong = valsL.filter((v) => v >= X).length;
          if (wrong !== ans) traps.push(numTrap(wrong, `"Greater than ${X}" does not include ${X} itself.`));
        } else {
          const list = valsR.filter((v) => v < X);
          ans = list.length;
          question = `How many of the values for **${ctx.B}** are less than ${X}?`;
          solution = [`The leaves for **${ctx.B}** are on the right and read left to right as usual.`, `Values for ${ctx.B} less than ${X}: ${list.join(", ")}.`, `That's ${ans} ${ans === 1 ? "value" : "values"} (${X} itself is not less than ${X}).`];
          const wrong = valsR.filter((v) => v <= X).length;
          if (wrong !== ans) traps.push(numTrap(wrong, `"Less than ${X}" does not include ${X} itself.`));
        }
        return {
          prompt: `${ctx.intro}\n\n${table}\n\n${key}\n\n${question}`,
          answer: { type: "number", value: ans },
          solution,
          hint: "On a back-to-back diagram, the left-hand leaves read outwards from the stem.",
          traps,
        };
      }

      const ctx = rng.pick(tier === 1 ? SL_T1 : SL_T2);
      const nRows = rng.int(3, 4);
      const s0 = rng.int(ctx.s0, ctx.s1 - nRows + 1);
      const stems = Array.from({ length: nRows }, (_, i) => s0 + i);
      const qTypes = tier === 1 ? (["count", "max", "min", "gt", "lt"] as const) : (["max", "min", "gt", "lt"] as const);
      const q = rng.pick(qTypes);
      let leaves: number[][] = [];
      let units: number[] = [];
      let X = 0;
      let ok = false;
      for (let i = 0; i < 200 && !ok; i++) {
        leaves = stems.map(() => Array.from({ length: rng.int(2, 5) }, () => rng.int(0, 9)).sort((p, r) => p - r));
        units = leaves.flatMap((ls, j) => ls.map((l) => stems[j] * 10 + l));
        if (units.length < 9 || units.length > 16) continue;
        if (q === "gt" || q === "lt") {
          X = rng.pick(units);
          const c = q === "gt" ? units.filter((u) => u > X).length : units.filter((u) => u < X).length;
          ok = c >= 2 && c <= units.length - 2;
        } else ok = true;
      }
      if (!ok) {
        leaves = stems.map(() => [1, 4, 6]);
        units = leaves.flatMap((ls, j) => ls.map((l) => stems[j] * 10 + l));
        X = units[3];
      }
      const val = (u: number) => clean(u / ctx.sc);
      // Show one-decimal data as 7.0, not 7, so every value reads like the key.
      const show = (u: number) => (ctx.sc === 10 ? (u / 10).toFixed(1) : String(u));
      const n = units.length;
      const kS = stems[1], kL = leaves[1][0];
      const key = `Key: ${kS} | ${kL} means ${show(kS * 10 + kL)} ${ctx.unit}`;
      const diagram = dataBlock(stems.map((s, j) => `${s} | ${leaves[j].join(" ")}`));
      let question = "", ans = 0;
      let display: string | undefined;
      let solution: string[] = [];
      const traps: Trap[] = [];
      if (q === "count") {
        ans = n;
        question = "How many values are shown in the diagram?";
        solution = ["Each leaf is one value, so count the leaves on every row.", `${leaves.map((ls) => ls.length).join(" + ")} = ${n}.`];
      } else if (q === "max") {
        const last = leaves[nRows - 1];
        const u = stems[nRows - 1] * 10 + last[last.length - 1];
        ans = val(u);
        question = "What is the largest value in the diagram?";
        display = `${show(u)} ${ctx.unit}`;
        solution = [`The largest value is the last leaf on the bottom row: ${stems[nRows - 1]} | ${last[last.length - 1]}.`, `Using the key, that is ${show(u)} ${ctx.unit}.`];
        if (ctx.sc === 10) traps.push(numTrap(u, `Use the key: ${kS} | ${kL} means ${show(kS * 10 + kL)}, so the leaf is the tenths digit.`));
      } else if (q === "min") {
        const u = stems[0] * 10 + leaves[0][0];
        ans = val(u);
        question = "What is the smallest value in the diagram?";
        display = `${show(u)} ${ctx.unit}`;
        solution = [`The smallest value is the first leaf on the top row: ${stems[0]} | ${leaves[0][0]}.`, `Using the key, that is ${show(u)} ${ctx.unit}.`];
        if (ctx.sc === 10) traps.push(numTrap(u, `Use the key: ${kS} | ${kL} means ${show(kS * 10 + kL)}, so the leaf is the tenths digit.`));
      } else if (q === "gt") {
        const list = units.filter((u) => u > X);
        ans = list.length;
        question = `How many of the values are greater than ${show(X)} ${ctx.unit}?`;
        solution = [`Values greater than ${show(X)}: ${list.map(show).join(", ")}.`, `That's ${ans} values. ${show(X)} itself is not included, because "greater than" means strictly more.`];
        const wrong = units.filter((u) => u >= X).length;
        if (wrong !== ans) traps.push(numTrap(wrong, `"Greater than ${show(X)}" does not include ${show(X)} itself.`));
      } else {
        const list = units.filter((u) => u < X);
        ans = list.length;
        question = `How many of the values are less than ${show(X)} ${ctx.unit}?`;
        solution = [`Values less than ${show(X)}: ${list.map(show).join(", ")}.`, `That's ${ans} values. ${show(X)} itself is not included, because "less than" means strictly less.`];
        const wrong = units.filter((u) => u <= X).length;
        if (wrong !== ans) traps.push(numTrap(wrong, `"Less than ${show(X)}" does not include ${show(X)} itself.`));
      }
      return {
        prompt: `${ctx.intro(q === "count" ? "some" : String(n))}\n\n${diagram}\n\n${key}\n\n${question}`,
        answer: display ? { type: "number", value: ans, display } : { type: "number", value: ans },
        solution,
        hint: "Use the key to turn each stem and leaf into a value. The leaves are in order, smallest first.",
        traps,
      };
    },
  },

  // 5 -----------------------------------------------------------------------
  {
    id: "statistics.sampling-calculations",
    topicId: "statistics",
    title: "Systematic and stratified samples",
    level: 2,
    guideRef: "data-and-sampling",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const r = rng.next();
      const kind =
        tier === 1
          ? r < 0.5 ? "interval" : "estimate"
          : tier === 2
            ? r < 0.2 ? "interval" : r < 0.5 ? "nth" : r < 0.8 ? "strat" : "estimate"
            : r < 0.3 ? "nth" : r < 0.7 ? "strat" : "estimate";

      if (kind === "interval" || kind === "nth") {
        const ctx = rng.pick(SYS_CTX);
        let n = 20, k = 12;
        for (let i = 0; i < 100; i++) {
          n = rng.pick([10, 12, 15, 20, 24, 25, 30, 40, 50]);
          k = rng.int(tier === 1 ? 4 : 6, tier === 1 ? 20 : 40);
          if (n * k >= 100 && n * k <= 1500) break;
        }
        const N = n * k;
        if (kind === "interval") {
          return {
            prompt: `${ctx.intro(N)} ${name} wants a systematic sample of ${n} ${ctx.pop}: pick a random start, then take every *k*th ${ctx.item} on the list. What should *k* be?`,
            answer: { type: "number", value: k },
            solution: [
              "The interval is population size ÷ sample size.",
              `k = ${big(N)} ÷ ${n} = ${k}.`,
              `So ${name} takes every ${ordinal(k)} ${ctx.item}.`,
            ],
            hint: `How many ${ctx.pop} are there on the list for each one in the sample?`,
          };
        }
        const s = rng.int(1, k);
        const m = tier === 3 && rng.bool(0.5) ? n : rng.int(3, Math.min(n - 1, 12));
        const ans = s + (m - 1) * k;
        const traps: Trap[] = [];
        const t1 = s + m * k;
        traps.push(numTrap(t1, `Number ${s} is already the 1st one chosen, so add the interval only ${m - 1} times.`));
        const t2 = m * k;
        if (t2 !== ans && t2 !== t1) traps.push(numTrap(t2, `Start counting from ${s}, the first one chosen, not from 0.`));
        return {
          prompt: `${ctx.intro(N)} ${name} takes a systematic sample of ${n} ${ctx.pop}, starting with number ${s} and then taking every ${ordinal(k)} ${ctx.item}. What is the number of the ${m === n ? "last" : ordinal(m)} ${ctx.item} chosen?`,
          answer: { type: "number", value: ans },
          solution: [
            `The chosen numbers go up in steps of ${k}: ${s}, ${s + k}, ${s + 2 * k}, …`,
            `The ${ordinal(m)} one is ${s} + (${m} − 1) × ${k}.`,
            `= ${s} + ${(m - 1) * k} = ${ans}.`,
          ],
          hint: "Write out the first few numbers chosen and look for the pattern.",
          traps,
        };
      }

      if (kind === "strat") {
        const ctx = rng.pick(STRAT_CTX);
        const G = tier === 2 ? rng.int(2, 3) : rng.int(3, 4);
        const groups = ctx.groups.slice(0, G);
        let q = 10, p = 1, as: number[] = [3, 5, 4], t = 0;
        let found = false;
        for (let i = 0; i < 300 && !found; i++) {
          q = rng.pick(tier === 2 ? [5, 8, 10, 20, 25] : [10, 20, 25, 40, 50]);
          p = tier === 2 ? 1 : rng.pick([1, 2, 3]);
          if (gcd(p, q) !== 1 || p >= q) continue;
          as = Array.from({ length: G }, () => rng.int(tier === 2 ? 3 : 4, tier === 2 ? 25 : 30));
          const N = q * sumOf(as);
          const n = p * sumOf(as);
          if (N > 2500 || n < 10 || n > 150) continue;
          t = rng.int(0, G - 1);
          if (n % G === 0 && n / G === p * as[t]) continue;
          found = true;
        }
        if (!found) {
          q = 10; p = 1; as = [12, 8, 10, 6].slice(0, G); t = 0;
        }
        const gs = as.map((x) => q * x);
        const N = sumOf(gs);
        const n = p * sumOf(as);
        const ans = p * as[t];
        const g = gs[t];
        const table = `| ${ctx.head} | Number of ${ctx.unit} |\n|---|---|\n${groups.map((gr, j) => `| ${gr} | ${big(gs[j])} |`).join("\n")}`;
        const traps: Trap[] = [];
        if (n % G === 0 && n / G !== ans) traps.push(numTrap(n / G, "That's an equal split. Stratified sampling shares the sample *in proportion* to the group sizes."));
        return {
          prompt: `${ctx.intro} The table shows the number of ${ctx.unit} in each group.\n\n${table}\n\n${name} takes a stratified sample of ${n} ${ctx.unit}, in proportion to the size of each group. How many should be chosen from **${groups[t]}**?`,
          answer: { type: "number", value: ans },
          solution: [
            `Total = ${gs.map(big).join(" + ")} = ${big(N)}.`,
            `${groups[t]} is {{${g}/${N}}} of the population, so it gets {{${g}/${N}}} of the sample.`,
            `{{${g}/${N}}} × ${n} = ${ans}.`,
          ],
          hint: "Each group should make up the same fraction of the sample as it does of the population.",
          traps,
        };
      }

      // estimate a population count from a sample
      const ctx = rng.pick(EST_CTX);
      let n = 20, c = 7, P = 300;
      for (let i = 0; i < 300; i++) {
        n = rng.pick(tier <= 2 ? [10, 20, 25, 50] : [30, 40, 60, 80, 120]);
        c = rng.int(2, n - 2);
        P = tier <= 2 ? rng.int(4, 30) * 50 : rng.int(6, 40) * 60;
        if ((P * c) % n === 0 && P >= 4 * n && (P * c) / n !== c) break;
      }
      if ((P * c) % n !== 0) {
        n = 20; c = 7; P = 300;
      }
      const ans = (P * c) / n;
      return {
        prompt: `In a random sample of ${n} ${ctx.sample}, ${c} said they ${ctx.verb}. There ${ctx.be} ${big(P)} ${ctx.pop}. Estimate how many of them ${ctx.verb}.`,
        answer: { type: "number", value: ans },
        solution: [
          `In the sample, ${c} out of ${n} said yes: that's {{${c}/${n}}}.`,
          `Estimate = {{${c}/${n}}} × ${big(P)} = ${big(ans)}.`,
          "It is only an estimate: a different random sample would give a slightly different answer.",
        ],
        hint: "What fraction of the sample said yes? Assume the same fraction of everyone would.",
        traps: [numTrap(c, "That's the number in the sample. Scale it up to the whole population.")],
      };
    },
  },

  // 6 -----------------------------------------------------------------------
  {
    id: "statistics.two-way-table",
    topicId: "statistics",
    title: "Fill in a two-way table",
    level: 2,
    guideRef: "tables",
    generate(rng, tier) {
      const ctx = rng.pick(TW_CTX);
      const R = tier === 3 ? ctx.rows.length : 2;
      const C = tier === 1 ? 2 : 3;
      const [lo, hi] = tier === 1 ? [2, 15] : tier === 2 ? [3, 25] : [4, 40];
      let V: number[][] = [];
      let hidden = new Set<number>();
      let target = 0;
      let steps: TWStep[] = [];
      const buildGrid = () => {
        const g: number[][] = [];
        for (let r = 0; r < R; r++) {
          const row = Array.from({ length: C }, () => rng.int(lo, hi));
          row.push(sumOf(row));
          g.push(row);
        }
        const tot: number[] = [];
        for (let c = 0; c <= C; c++) tot.push(sumOf(g.map((row) => row[c])));
        g.push(tot);
        return g;
      };
      let found = false;
      for (let it = 0; it < 400 && !found; it++) {
        V = buildGrid();
        const all: number[] = [];
        for (let r = 0; r <= R; r++) for (let c = 0; c <= C; c++) all.push(r * 10 + c);
        const nHide = tier === 1 ? rng.int(1, 2) : tier === 2 ? rng.int(3, 4) : rng.int(4, 6);
        const hs = rng.shuffle(all).slice(0, nHide);
        target = hs[0];
        if (target === R * 10 + C) continue; // not the grand total
        hidden = new Set(hs);
        const sol = solveGrid(R, C, hidden);
        if (!sol) continue;
        const need = neededSteps(sol, target);
        const want = tier === 1 ? need.length === 1 : tier === 2 ? need.length === 2 : need.length >= 2 && need.length <= 3;
        if (!want) continue;
        steps = need;
        found = true;
      }
      if (!found) {
        V = buildGrid();
        target = 0;
        hidden = new Set([0]);
        steps = neededSteps(solveGrid(R, C, hidden) ?? [], target);
      }
      const rowName = (r: number) => (r === R ? "Total" : ctx.rows[r]);
      const colName = (c: number) => (c === C ? "Total" : ctx.cols[c]);
      const cellText = (r: number, c: number) => {
        const key = r * 10 + c;
        if (!hidden.has(key)) return String(V[r][c]);
        return key === target ? "**?**" : "";
      };
      const head = `|  | ${ctx.cols.slice(0, C).join(" | ")} | Total |`;
      const sep = "|" + "---|".repeat(C + 2);
      const body: string[] = [];
      for (let r = 0; r <= R; r++) {
        const cells: string[] = [];
        for (let c = 0; c <= C; c++) cells.push(cellText(r, c));
        body.push(`| **${rowName(r)}** | ${cells.join(" | ")} |`);
      }
      const table = [head, sep, ...body].join("\n");
      const tr = Math.floor(target / 10), tc = target % 10;
      const ans = V[tr][tc];
      const solution = steps.map((st) => {
        const r = Math.floor(st.cell / 10), c = st.cell % 10;
        const cells = st.kind === "row" ? Array.from({ length: C + 1 }, (_, j) => [st.idx, j] as const) : Array.from({ length: R + 1 }, (_, j) => [j, st.idx] as const);
        const totalCell = cells[cells.length - 1];
        const isTotal = totalCell[0] === r && totalCell[1] === c;
        const others = cells.slice(0, -1).filter(([a, b]) => !(a === r && b === c)).map(([a, b]) => V[a][b]);
        const expr = isTotal
          ? `${cells.slice(0, -1).map(([a, b]) => V[a][b]).join(" + ")} = ${V[r][c]}`
          : `${V[totalCell[0]][totalCell[1]]} − ${others.join(" − ")} = ${V[r][c]}`;
        const lineName = st.kind === "row" ? `the **${rowName(st.idx)}** row` : `the **${colName(st.idx)}** column`;
        return st.cell === target
          ? `Use ${lineName}: ${expr}. So **?** = ${V[r][c]}.`
          : `Use ${lineName}: ${expr} (that fills ${rowName(r)}, ${colName(c)}).`;
      });
      return {
        prompt: `The two-way table shows ${ctx.what}. Some numbers are missing.\n\n${table}\n\nWork out the number that goes in the cell marked **?**.`,
        answer: { type: "number", value: ans },
        solution,
        hint: "Find a row or column with only one gap. You can fill that one straight away.",
      };
    },
  },

  // 7 -----------------------------------------------------------------------
  {
    id: "statistics.pie-chart-frequency",
    topicId: "statistics",
    title: "Find frequencies from a pie chart",
    level: 2,
    guideRef: "charts",
    generate(rng, tier) {
      const ctx = rng.pick(PIE_CTX);
      const cats = rng.shuffle(ctx.cats);
      const r = rng.next();
      const kind = tier === 1 ? "fromTotal" : tier === 2 ? (r < 0.35 ? "fromTotal" : r < 0.7 ? "findTotal" : "fromOther") : r < 0.5 ? "missing" : r < 0.75 ? "fromOther" : "findTotal";
      const pickF = (N: number) => {
        const st = pieStep(N);
        const maxM = Math.floor(N / 2 / st);
        let f = st * rng.int(1, Math.max(1, maxM));
        if (f < 2) f = st * 2;
        return f;
      };

      if (kind === "fromTotal") {
        const N = rng.pick(tier === 1 ? PIE_N_EASY : rng.bool() ? PIE_N_EASY : PIE_N_HARD);
        const f = pickF(N);
        const A = (f * 360) / N;
        const easy = 360 % N === 0;
        return {
          prompt: `A pie chart shows ${ctx.of(`${N} ${ctx.who}`)}. The sector for **${cats[0]}** has an angle of ${A}°. How many ${ctx.who} chose ${cats[0]}?`,
          answer: { type: "number", value: f },
          solution: easy
            ? [`360° stands for all ${N} ${ctx.who}, so each ${ctx.one} is 360° ÷ ${N} = ${360 / N}°.`, `${A}° ÷ ${360 / N}° = ${f} ${ctx.who}.`]
            : [`The sector is {{${A}/360}} of the whole circle, so it shows {{${A}/360}} of the ${N} ${ctx.who}.`, `{{${A}/360}} × ${N} = ${f} ${ctx.who}.`],
          hint: `What fraction of the full 360° is ${A}°?`,
          traps: A !== f ? [numTrap(A, `That's the angle, not the number of ${ctx.who}. Work out what fraction of 360° it is.`)] : [],
        };
      }

      if (kind === "findTotal") {
        const N = rng.pick([...PIE_N_EASY, ...PIE_N_HARD]);
        const f = pickF(N);
        const A = (f * 360) / N;
        return {
          prompt: `In a pie chart showing ${ctx.of(`some ${ctx.who}`)}, the sector for **${cats[0]}** has an angle of ${A}° and stands for ${f} ${ctx.who}. How many ${ctx.who} does the whole pie chart represent?`,
          answer: { type: "number", value: N },
          solution: [
            `${A}° is {{${A}/360}} of the circle, so ${f} ${ctx.who} is {{${A}/360}} of the total.`,
            `Total = ${f} × 360 ÷ ${A} = ${N} ${ctx.who}.`,
          ],
          hint: `How many times does ${A}° fit into 360°? Or find how many degrees stand for one ${ctx.one}.`,
        };
      }

      if (kind === "fromOther") {
        let N = 60, f = 10, g = 15;
        for (let i = 0; i < 100; i++) {
          N = rng.pick([...PIE_N_EASY, ...PIE_N_HARD]);
          f = pickF(N);
          g = pickF(N);
          if (f !== g && f + g < N) break;
        }
        if (f === g || f + g >= N) {
          N = 60; f = 10; g = 15;
        }
        const A = (f * 360) / N, B = (g * 360) / N;
        const gAB = gcd(A, B);
        const ratio = A / gAB === 1 ? `${B / gAB}` : `{{${B / gAB}/${A / gAB}}}`;
        const traps: Trap[] = [];
        if (B !== g) traps.push(numTrap(B, `That's the angle of the ${cats[1]} sector. Turn it into a number of ${ctx.who}.`));
        return {
          prompt: `In a pie chart showing ${ctx.of(`some ${ctx.who}`)}, the **${cats[0]}** sector has an angle of ${A}° and stands for ${f} ${ctx.who}. The **${cats[1]}** sector has an angle of ${B}°. How many ${ctx.who} chose ${cats[1]}?`,
          answer: { type: "number", value: g },
          solution: [
            `Total: ${f} × 360 ÷ ${A} = ${N} ${ctx.who}.`,
            `${cats[1]}: {{${B}/360}} × ${N} = ${g} ${ctx.who}.`,
            `Check: ${B}° ÷ ${A}° = ${ratio}, and ${f} × ${ratio} = ${g}.`,
          ],
          hint: "Find the total first: how many people does the whole 360° stand for?",
          traps,
        };
      }

      // missing: three angles given, find the frequency of the fourth category
      let N = 60;
      let fs = [15, 20, 10, 15];
      let found = false;
      for (let i = 0; i < 200 && !found; i++) {
        N = rng.pick([24, 30, 36, 40, 45, 48, 60, 72, 80, 90, 120, 150]);
        const st = pieStep(N);
        const p = partition(rng, N / st, 4, st === 1 ? 2 : 1);
        if (!p) continue;
        fs = p.map((x) => x * st);
        const a4 = (fs[3] * 360) / N;
        found = a4 !== fs[3];
      }
      if (!found) {
        N = 60;
        fs = [15, 20, 10, 15];
      }
      const ang = fs.map((f) => (f * 360) / N);
      const table = `| ${cap(ctx.topic)} | Angle |\n|---|---|\n${cats.slice(0, 4).map((c, j) => `| ${c} | ${j === 3 ? "" : `${ang[j]}°`} |`).join("\n")}`;
      const traps: Trap[] = [];
      if (ang[3] !== fs[3]) traps.push(numTrap(ang[3], `That's the angle of the ${cats[3]} sector. Now turn it into a number of ${ctx.who}.`));
      return {
        prompt: `A pie chart shows ${ctx.of(`${N} ${ctx.who}`)}. The table gives the angles of three of the sectors.\n\n${table}\n\nHow many ${ctx.who} chose **${cats[3]}**?`,
        answer: { type: "number", value: fs[3] },
        solution: [
          `Angle for ${cats[3]} = 360° − (${ang[0]}° + ${ang[1]}° + ${ang[2]}°) = ${ang[3]}°.`,
          `${cats[3]}: {{${ang[3]}/360}} × ${N} = ${fs[3]} ${ctx.who}.`,
        ],
        hint: "The angles in a pie chart add up to 360°.",
        traps,
      };
    },
  },

  // 8 -----------------------------------------------------------------------
  {
    id: "statistics.venn-carroll",
    topicId: "statistics",
    title: "Sort and count with Venn and Carroll diagrams",
    level: 2,
    guideRef: "venn-carroll",
    generate(rng, tier) {
      const r = rng.next();
      const kind = tier === 1 ? (r < 0.55 ? "read" : "sort") : tier === 2 ? (r < 0.5 ? "read" : "sort") : r < 0.6 ? "overlap" : r < 0.8 ? "read" : "sort";

      if (kind === "read") {
        const ctx = rng.pick(VENN_CTX);
        const [lo, hi] = tier === 1 ? [1, 12] : [2, 20];
        const a = rng.int(lo, hi), b = rng.int(lo, hi), c = rng.int(lo, hi), d = rng.int(lo, hi);
        const carroll = rng.bool(0.4);
        const qs = tier === 1 ? (["inA", "both", "total", "aOnly"] as const) : (["inA", "inB", "aOnly", "exactlyOne", "notB", "total"] as const);
        const q = rng.pick(qs);
        let question = "", ans = 0;
        let sol: string[] = [];
        let trap: Trap | null = null;
        if (q === "inA") {
          ans = a + b;
          question = `How many ${ctx.who} ${ctx.A}?`;
          sol = carroll ? [`Add both boxes in the **${ctx.rowY}** row.`, `${b} + ${a} = ${ans}.`] : [`Everything inside the ${ctx.labA} circle counts, including the overlap.`, `${a} + ${b} = ${ans}.`];
          if (a !== ans) trap = numTrap(a, `Count all the ${ctx.who} who ${ctx.A}: that includes the ${b} who ${ctx.B} as well.`);
        } else if (q === "inB") {
          ans = c + b;
          question = `How many ${ctx.who} ${ctx.B}?`;
          sol = carroll ? [`Add both boxes in the **${ctx.colY}** column.`, `${b} + ${c} = ${ans}.`] : [`Everything inside the ${ctx.labB} circle counts, including the overlap.`, `${b} + ${c} = ${ans}.`];
          if (c !== ans) trap = numTrap(c, `Count all the ${ctx.who} who ${ctx.B}: that includes the ${b} who ${ctx.A} as well.`);
        } else if (q === "both") {
          ans = b;
          question = `How many ${ctx.who} ${ctx.A} and ${ctx.B}?`;
          sol = carroll ? [`Find the box in the **${ctx.rowY}** row and the **${ctx.colY}** column.`, `It shows ${b}.`] : ["Those who do both are in the overlap, where the circles cross.", `The overlap shows ${b}.`];
        } else if (q === "total") {
          ans = a + b + c + d;
          question = `How many ${ctx.who} were surveyed altogether?`;
          sol = carroll ? ["Add all four boxes.", `${b} + ${a} + ${c} + ${d} = ${ans}.`] : ["Add all four numbers, including the one outside both circles.", `${a} + ${b} + ${c} + ${d} = ${ans}.`];
          trap = numTrap(a + b + c, `Include the ${d} who ${ctx.neither}. They were surveyed too.`);
        } else if (q === "aOnly") {
          ans = a;
          question = `How many ${ctx.who} ${ctx.A} but ${ctx.notB}?`;
          sol = carroll ? [`Find the box in the **${ctx.rowY}** row and the **${ctx.colN}** column.`, `It shows ${a}.`] : [`Inside the ${ctx.labA} circle but outside the ${ctx.labB} circle.`, `That region shows ${a}.`];
          trap = numTrap(a + b, `Leave out the ${b} who ${ctx.B} as well.`);
        } else if (q === "exactlyOne") {
          ans = a + c;
          question = `How many ${ctx.who} ${ctx.A} or ${ctx.B}, but not both?`;
          sol = carroll
            ? [`Exactly one: **${ctx.rowY}** with **${ctx.colN}**, plus **${ctx.rowN}** with **${ctx.colY}**.`, `${a} + ${c} = ${ans}.`]
            : ["Exactly one means inside one circle but not in the overlap.", `${a} + ${c} = ${ans}.`];
          trap = numTrap(a + b + c, `Leave out the ${b} in the overlap: they do both.`);
        } else {
          ans = a + d;
          question = `How many ${ctx.who} ${ctx.notB}?`;
          sol = carroll
            ? [`Add both boxes in the **${ctx.colN}** column.`, `${a} + ${d} = ${ans}.`]
            : [`Everything outside the ${ctx.labB} circle: the ${ctx.labA}-only region and the outside.`, `${a} + ${d} = ${ans}.`];
          if (d !== ans) trap = numTrap(d, `Also count the ${a} who ${ctx.A} but ${ctx.notB}.`);
        }
        const traps = trap && trap.spec.type === "number" && trap.spec.value !== ans ? [trap] : [];
        if (carroll) {
          const table = `|  | ${ctx.colY} | ${ctx.colN} |\n|---|---|---|\n| **${ctx.rowY}** | ${b} | ${a} |\n| **${ctx.rowN}** | ${c} | ${d} |`;
          return {
            prompt: `The Carroll diagram shows the results of a survey of some ${ctx.who}.\n\n${table}\n\n${question}`,
            answer: { type: "number", value: ans },
            solution: sol,
            hint: "Each box is one combination. Which boxes match the description?",
            traps,
          };
        }
        return {
          prompt: `The Venn diagram shows the results of a survey of some ${ctx.who}: whether they ${ctx.A}, and whether they ${ctx.B}.\n\n${question}`,
          answer: { type: "number", value: ans },
          solution: sol,
          hint: "Each region is one combination. Which regions match the description?",
          traps,
          diagram: vennSvg(ctx.labA, ctx.labB, [String(a), String(b), String(c), String(d)], `Venn diagram with circles ${ctx.labA} and ${ctx.labB}: ${a} in ${ctx.labA} only, ${b} in both, ${c} in ${ctx.labB} only, ${d} outside both circles`),
        };
      }

      if (kind === "overlap") {
        const ctx = rng.pick(VENN_CTX);
        const a = rng.int(2, 25), b = rng.int(2, 25), c = rng.int(2, 25), d = rng.int(2, 15);
        const x = a + b, y = c + b, T = a + b + c + d;
        const askBoth = rng.bool(0.6);
        const base = [
          `${T} − ${d} = ${T - d} ${ctx.who} are in at least one group.`,
          `${x} + ${y} = ${x + y}. That is ${x + y - (T - d)} too many, because the ${ctx.who} in both groups were counted twice.`,
          `So ${b} ${ctx.who} are in both groups.`,
        ];
        const traps: Trap[] = [];
        if (askBoth) {
          if (b - d > 0) traps.push(numTrap(b - d, `You forgot the ${d} who ${ctx.neither}. Take them away from the total first.`));
        } else {
          traps.push(numTrap(x, `Some of those ${x} are in the overlap: they ${ctx.B} as well. Take away the ${ctx.who} in both groups.`));
        }
        return {
          prompt: `${T} ${ctx.who} were surveyed. ${x} ${ctx.A}, ${y} ${ctx.B}, and ${d} ${ctx.neither}. How many ${ctx.who} ${askBoth ? `${ctx.A} and ${ctx.B}` : `${ctx.A} but ${ctx.notB}`}?`,
          answer: { type: "number", value: askBoth ? b : a },
          solution: askBoth ? base : [...base, `Those who ${ctx.A} but ${ctx.notB}: ${x} − ${b} = ${a}.`],
          hint: "Draw a Venn diagram. Put the 'neither' number outside the circles first.",
          traps,
        };
      }

      // sort numbers into a Venn or Carroll diagram
      let P = PROPS[0], Q = PROPS[2];
      let nums: number[] = [];
      let region: "AB" | "A" | "B" | "none" = "AB";
      let found = false;
      const inR = (v: number, reg: "AB" | "A" | "B" | "none") => {
        const p = P.test(v), q = Q.test(v);
        return reg === "AB" ? p && q : reg === "A" ? p && !q : reg === "B" ? !p && q : !p && !q;
      };
      for (let i = 0; i < 300 && !found; i++) {
        const [pi, qi] = rng.pick(PROP_PAIRS);
        P = PROPS[pi];
        Q = PROPS[qi];
        const n = tier === 1 ? rng.int(8, 10) : rng.int(10, 12);
        const maxV = tier === 1 ? 30 : 50;
        const pool = rng.shuffle(Array.from({ length: maxV }, (_, j) => j + 1));
        nums = pool.slice(0, n).sort((p, q) => p - q);
        const regs = ["AB", "A", "B", "none"] as const;
        if (regs.some((rg) => !nums.some((v) => inR(v, rg)))) continue;
        region = rng.pick(regs);
        found = true;
      }
      if (!found) {
        P = PROPS[0];
        Q = PROPS[2];
        nums = [2, 3, 5, 6, 8, 9, 12, 14, 15, 18];
        region = "AB";
      }
      const listP = nums.filter((v) => P.test(v));
      const listQ = nums.filter((v) => Q.test(v));
      const listR = nums.filter((v) => inR(v, region));
      const ans = listR.length;
      const lp = P.adj, lq = Q.adj;
      const regionDesc =
        region === "AB" ? `${lp} *and* ${lq}` : region === "A" ? `${lp} but *not* ${lq}` : region === "B" ? `${lq} but *not* ${lp}` : `neither ${lp} nor ${lq}`;
      const notes: string[] = [];
      if ((P.name === "Prime" || Q.name === "Prime") && nums.includes(1)) notes.push("1 is not a prime number.");
      if ((P.name === "Square number" || Q.name === "Square number") && nums.includes(1)) notes.push("1 = 1 × 1 is a square number.");
      const solution = [
        `${P.plural}: ${listP.length ? listP.join(", ") : "none"}.${notes.length ? " " + notes.join(" ") : ""}`,
        `${Q.plural}: ${listQ.length ? listQ.join(", ") : "none"}.`,
        `The **?** region is ${regionDesc}: ${listR.join(", ")}. That's ${ans}.`,
      ];
      const traps: Trap[] = [];
      if (region === "A" && listP.length !== ans) traps.push(numTrap(listP.length, `Those are all the ${lower(P.plural)}. Leave out any that are also ${lq}.`));
      if (region === "B" && listQ.length !== ans) traps.push(numTrap(listQ.length, `Those are all the ${lower(Q.plural)}. Leave out any that are also ${lp}.`));
      const numsBlock = dataBlock([nums.join(", ")]);
      if (rng.bool(0.5)) {
        const mark = (reg: "AB" | "A" | "B" | "none") => (reg === region ? "**?**" : "");
        const table = `|  | ${Q.name} | ${Q.not} |\n|---|---|---|\n| **${P.name}** | ${mark("AB")} | ${mark("A")} |\n| **${P.not}** | ${mark("B")} | ${mark("none")} |`;
        return {
          prompt: `Here are some numbers:\n\n${numsBlock}\n\nThey are sorted into this Carroll diagram.\n\n${table}\n\nHow many of the numbers belong in the box marked **?**`,
          answer: { type: "number", value: ans },
          solution,
          hint: "Test each number against both properties, one at a time.",
          traps,
        };
      }
      const vals: [string, string, string, string] = [region === "A" ? "?" : "", region === "AB" ? "?" : "", region === "B" ? "?" : "", region === "none" ? "?" : ""];
      return {
        prompt: `Here are some numbers:\n\n${numsBlock}\n\nThey are sorted into the Venn diagram. How many of the numbers belong in the region marked **?**`,
        answer: { type: "number", value: ans },
        solution,
        hint: "Test each number against both properties, one at a time.",
        traps,
        diagram: vennSvg(P.name, Q.name, vals, `Venn diagram with circles ${P.name} and ${Q.name}, with a question mark in one region`),
      };
    },
  },

  // 9 -----------------------------------------------------------------------
  {
    id: "statistics.correlation-type",
    topicId: "statistics",
    title: "Describe the correlation on a scatter graph",
    level: 2,
    guideRef: "scatter-graphs",
    generate(rng, tier) {
      const dir: Dir = rng.pick(["positive", "negative", "none"] as const);
      const ctx = rng.pick(CORR_CTX.filter((c) => c.dir === dir));
      const name = rng.pick(NAMES);
      const n = tier === 3 ? 8 : rng.int(10, 13);
      const thr = tier === 1 ? 0.9 : tier === 2 ? 0.75 : 0.8;
      const nf = tier === 1 ? 0.07 : tier === 2 ? 0.16 : 0.11;
      const spanX = ctx.x.hi - ctx.x.lo, spanY = ctx.y.hi - ctx.y.lo;
      let pts: Array<[number, number]> = [];
      let ok = false;
      for (let it = 0; it < 400 && !ok; it++) {
        const xs = new Set<number>();
        for (let g = 0; g < 200 && xs.size < n; g++) xs.add(roundStep(ctx.x.lo + spanX * (0.06 + 0.88 * rng.next()), ctx.xr));
        if (xs.size < n) continue;
        pts = [];
        let inside = true;
        for (const x of [...xs].sort((p, q) => p - q)) {
          const t = (x - ctx.x.lo) / spanX;
          let frac: number;
          if (dir === "none") frac = 0.1 + 0.8 * rng.next();
          else frac = (dir === "positive" ? 0.12 + 0.76 * t : 0.88 - 0.76 * t) + (rng.next() * 2 - 1) * nf;
          const y = roundStep(ctx.y.lo + spanY * frac, ctx.yr);
          if (y < ctx.y.lo + 0.02 * spanY || y > ctx.y.hi - 0.02 * spanY) inside = false;
          pts.push([x, y]);
        }
        if (!inside) continue;
        const rr = pearson(pts);
        ok = dir === "positive" ? rr >= thr : dir === "negative" ? rr <= -thr : Math.abs(rr) <= 0.15;
      }
      if (!ok) {
        // Exact straight-line data (or a fixed patternless set) as a safe fallback.
        const fr = [0.5, 0.2, 0.8, 0.35, 0.65, 0.3, 0.75, 0.45, 0.25, 0.7, 0.55, 0.4, 0.6];
        pts = Array.from({ length: n }, (_, i) => {
          const x = roundStep(ctx.x.lo + spanX * (0.08 + (0.84 * i) / (n - 1)), ctx.xr);
          const t = (x - ctx.x.lo) / spanX;
          const f = dir === "none" ? fr[i] : dir === "positive" ? 0.12 + 0.76 * t : 0.88 - 0.76 * t;
          return [x, roundStep(ctx.y.lo + spanY * f, ctx.yr)];
        });
      }
      const xl = lower(ctx.x.label), yl = lower(ctx.y.label);
      const traps: Trap[] = [];
      if (dir === "positive") traps.push(textTrap(CORR_ACCEPT.negative, "Read from left to right: as the first quantity increases, does the second go up or down?"));
      if (dir === "negative") traps.push(textTrap(CORR_ACCEPT.positive, "Read from left to right: the points go down, so as one quantity increases the other decreases."));
      if (dir === "none") {
        traps.push(textTrap(CORR_ACCEPT.positive, "The points don't follow an upward line. They are scattered with no clear pattern."));
        traps.push(textTrap(CORR_ACCEPT.negative, "The points don't follow a downward line. They are scattered with no clear pattern."));
      }
      const solution =
        dir === "none"
          ? [tier === 3 ? `As ${xl} increases, ${yl} goes up and down with no pattern.` : "The points are scattered with no upward or downward trend.", `Knowing the ${xl} doesn't help you predict the ${yl}.`, "So there is **no correlation**."]
          : [
              `As ${xl} increases, ${yl} tends to ${dir === "positive" ? "increase" : "decrease"}.`,
              tier === 3 ? "The pattern isn't perfect, but the overall trend is clear." : `The points go ${dir === "positive" ? "up from bottom left to top right" : "down from top left to bottom right"}, close to a straight line.`,
              `So this is **${dir} correlation**.`,
            ];
      const ask = "What type of correlation is there? Type **positive**, **negative** or **none**.";
      if (tier === 3) {
        const table = `| ${ctx.x.label} | ${pts.map((p) => num(p[0])).join(" | ")} |\n|${"---|".repeat(n + 1)}\n| ${ctx.y.label} | ${pts.map((p) => num(p[1])).join(" | ")} |`;
        return {
          prompt: `${name} recorded two things for ${n} ${ctx.who}: ${xl} and ${yl}.\n\n${table}\n\n${ask}`,
          answer: { type: "text", accept: CORR_ACCEPT[dir], display: dir === "none" ? "no correlation" : `${dir} correlation` },
          solution,
          hint: "Imagine plotting the points. As the top row increases, what does the bottom row tend to do?",
          traps,
        };
      }
      return {
        prompt: `${name} drew a scatter graph of ${xl} and ${yl} for ${n} ${ctx.who}.\n\n${ask}`,
        answer: { type: "text", accept: CORR_ACCEPT[dir], display: dir === "none" ? "no correlation" : `${dir} correlation` },
        solution,
        hint: "Imagine a line through the middle of the points. Does it slope up, slope down, or is there no clear line?",
        traps,
        diagram: scatterSvg(ctx.x, ctx.y, pts, `Scatter graph of ${ctx.y.label} against ${ctx.x.label} for ${n} ${ctx.who}`),
      };
    },
  },

  // 10 ----------------------------------------------------------------------
  {
    id: "statistics.line-of-best-fit",
    topicId: "statistics",
    title: "Estimate using a line of best fit",
    level: 3,
    guideRef: "scatter-graphs",
    generate(rng, tier) {
      const ctx = rng.pick(FIT_CTX);
      const inverse = tier === 3 ? rng.bool(0.6) : tier === 2 ? rng.bool(0.3) : false;
      // Work in grid units (0–10 on each axis). Line: yg = c + s·xg.
      let s = 1, c = 0, xs = 1, xe = 9, xq = 5, yq = 5;
      let found = false;
      for (let i = 0; i < 300 && !found; i++) {
        s = ctx.dir * rng.pick(ctx.slopes ?? [0.5, 1]);
        c = s > 0 ? (s === 1 ? rng.int(-2, 2) / 2 : rng.int(2, 10) / 2) : s === -1 ? rng.int(18, 22) / 2 : rng.int(12, 20) / 2;
        // Data x-range where the line stays between 1 and 9.
        const xa = s > 0 ? (1 - c) / s : (9 - c) / s;
        const xb = s > 0 ? (9 - c) / s : (1 - c) / s;
        xs = Math.max(0.5, xa);
        xe = Math.min(9.5, xb);
        if (xe - xs < 5) continue;
        const cands: number[] = [];
        for (let xg = Math.ceil(xs + 1); xg <= Math.floor(xe - 1); xg++) {
          const yg = c + s * xg;
          if (Number.isInteger(yg) && yg >= 1 && yg <= 9) cands.push(xg);
        }
        if (!cands.length) continue;
        xq = rng.pick(cands);
        yq = c + s * xq;
        found = true;
      }
      if (!found) {
        s = ctx.dir; c = ctx.dir > 0 ? 0.5 : 9.5; xs = 1; xe = 9; xq = 5; yq = c + s * 5;
        if (!Number.isInteger(yq)) { c = ctx.dir > 0 ? 0 : 10; yq = c + s * 5; xs = ctx.dir > 0 ? 1 : 1; xe = 9; }
      }
      const X = (xg: number) => clean(ctx.x.lo + xg * ctx.x.step);
      const Y = (yg: number) => clean(ctx.y.lo + yg * ctx.y.step);
      // Scatter points around the line. The noise is adjusted to have zero mean and no
      // trend, so the drawn line is exactly the least-squares line through the points.
      const n = rng.int(10, 12);
      let pts: Array<[number, number]> = [];
      for (let g = 0; g < 200; g++) {
        const xgs = Array.from({ length: n }, () => xs + (xe - xs) * rng.next());
        // Make sure the data spans the whole range, so every estimate is an interpolation.
        xgs[0] = xs + 0.3 * rng.next();
        xgs[1] = xe - 0.3 * rng.next();
        const es = xgs.map(() => (rng.next() * 2 - 1) * 1.1);
        const mx = sumOf(xgs) / n, me = sumOf(es) / n;
        let sxe = 0, sxx = 0;
        for (let i = 0; i < n; i++) {
          sxe += (xgs[i] - mx) * (es[i] - me);
          sxx += (xgs[i] - mx) * (xgs[i] - mx);
        }
        const beta = sxx > 0 ? sxe / sxx : 0;
        const ygs = xgs.map((xg, i) => c + s * xg + es[i] - me - beta * (xg - mx));
        if (ygs.some((yg) => yg < 0.3 || yg > 9.7)) continue;
        pts = xgs.map((xg, i) => [ctx.x.lo + xg * ctx.x.step, ctx.y.lo + ygs[i] * ctx.y.step]);
        break;
      }
      if (!pts.length) {
        for (let i = 0; i < n; i++) {
          const xg = xs + ((xe - xs) * (i + 0.5)) / n;
          pts.push([ctx.x.lo + xg * ctx.x.step, ctx.y.lo + (c + s * xg + (i % 2 === 0 ? 0.6 : -0.6)) * ctx.y.step]);
        }
      }
      const l0 = Math.max(0, xs - 0.5), l1 = Math.min(10, xe + 0.5);
      const line = [ctx.x.lo + l0 * ctx.x.step, ctx.y.lo + (c + s * l0) * ctx.y.step, ctx.x.lo + l1 * ctx.x.step, ctx.y.lo + (c + s * l1) * ctx.y.step] as const;
      const xv = X(xq), yv = Y(yq);
      const withUnit = (v: number, u: string) => (u === "%" ? `${num(v)}%` : `${num(v)} ${u}`);
      const ans = inverse ? xv : yv;
      const tol = (inverse ? ctx.x.step : ctx.y.step) / 2;
      const question = inverse ? ctx.inv(num(yv)) : ctx.fwd(num(xv));
      const solution = inverse
        ? [
            `Find ${num(yv)} on the vertical axis.`,
            "Go straight across to the line of best fit, then straight down to the horizontal axis.",
            `You reach the horizontal axis at ${num(xv)}, so the estimate is about ${withUnit(xv, ctx.xu)}.`,
            "This is inside the range of the data, so the estimate is fairly reliable.",
          ]
        : [
            `Find ${num(xv)} on the horizontal axis.`,
            "Go straight up to the line of best fit, then straight across to the vertical axis.",
            `You reach the vertical axis at ${num(yv)}, so the estimate is about ${withUnit(yv, ctx.yu)}.`,
            "This is inside the range of the data, so the estimate is fairly reliable.",
          ];
      return {
        prompt: `The scatter graph shows ${lower(ctx.x.label)} and ${lower(ctx.y.label)} for some ${ctx.who}, with a line of best fit drawn.\n\n${question}`,
        answer: { type: "number", value: ans, tolerance: tol, display: `about ${num(ans)}` },
        solution,
        hint: "Use the LINE, not the nearest point. Go from the axis to the line, then across (or down) to the other axis.",
        diagram: scatterSvg(ctx.x, ctx.y, pts, `Scatter graph of ${ctx.y.label} against ${ctx.x.label} with a line of best fit`, line),
      };
    },
  },

  // 11 ----------------------------------------------------------------------
  {
    id: "statistics.misleading-axis",
    topicId: "statistics",
    title: "See through a misleading bar chart",
    level: 3,
    guideRef: "choosing-and-misleading",
    generate(rng, tier) {
      const ctx = rng.pick(BAR_CTX);
      const r = rng.next();
      const kind = tier === 1 ? "look" : tier === 2 ? (r < 0.4 ? "look" : "true") : r < 0.3 ? "true" : "percent";
      const [cA, cB] = ctx.cats;
      const m = ctx.m;
      let S0 = 40, V1 = 45, V2 = 60;
      let found = false;

      if (kind === "look") {
        let look = 3;
        for (let i = 0; i < 200 && !found; i++) {
          S0 = rng.pick([20, 30, 40, 50, 60, 80]);
          const d1 = rng.int(2, 10);
          look = tier === 1 ? rng.int(2, 4) : rng.pick([1.5, 2.5, 3, 3.5, 4, 5]);
          const d2 = look * d1;
          if (!Number.isInteger(d2)) continue;
          V1 = S0 + d1;
          V2 = S0 + d2;
          found = true;
        }
        if (!found) { S0 = 40; V1 = 45; V2 = 55; look = 3; }
        const { tick, top } = axisTop(V2 - S0);
        const S = S0 * m, a = V1 * m, b = V2 * m;
        const trueR = b / a;
        const trueStr = Number.isInteger(trueR * 100) ? `= ${num(trueR)}` : `≈ ${num(roundTo(trueR, 2))}`;
        return {
          prompt: `The bar chart shows ${ctx.what}. Notice that the vertical axis starts at ${S}, not 0.\n\nHow many times as tall as the **${cA}** bar does the **${cB}** bar look?`,
          answer: { type: "number", value: look },
          solution: [
            `The ${cA} bar goes from ${S} up to ${a}: a height of ${a - S}.`,
            `The ${cB} bar goes from ${S} up to ${b}: a height of ${b - S}.`,
            `${b - S} ÷ ${a - S} = ${num(look)}, so it looks ${num(look)} times as tall.`,
            `In fact ${b} ÷ ${a} ${trueStr}. The real difference is much smaller, which is why a bar chart's axis should start at 0.`,
          ],
          hint: `Measure each bar from the bottom of the axis, ${S}, not from 0.`,
          traps: [numTrap(roundTo(trueR, 2), `That's how many times bigger the real value is. The question asks how the bars *look*: measure them from ${S}.`, 0.006)],
          diagram: barSvg(S, S + top * m, tick * m, ctx.cats, [a, b], ctx.yl, `Bar chart with the vertical axis starting at ${S}: ${cA} ${a}, ${cB} ${b}`),
        };
      }

      if (kind === "true") {
        const QS: Array<[number, number]> = [[11, 10], [6, 5], [5, 4], [7, 5], [3, 2], [8, 5], [7, 4], [2, 1]];
        let qn = 5, qd = 4;
        for (let i = 0; i < 300 && !found; i++) {
          [qn, qd] = rng.pick(QS);
          const j = rng.int(1, 30);
          V1 = qd * j;
          V2 = qn * j;
          if (V1 < 20 || V1 > 95) continue;
          S0 = Math.floor((V1 - rng.int(2, 15)) / 5) * 5;
          if (S0 < 10 || V1 - S0 < 3) continue;
          const look = (V2 - S0) / (V1 - S0);
          if (look < qn / qd + 1 || look > 12) continue;
          found = true;
        }
        if (!found) { qn = 5; qd = 4; V1 = 40; V2 = 50; S0 = 35; }
        const look = (V2 - S0) / (V1 - S0);
        const { tick, top } = axisTop(V2 - S0);
        const S = S0 * m, a = V1 * m, b = V2 * m;
        const q = clean(qn / qd);
        const lookStr = Number.isInteger(look) ? num(look) : `about ${num(roundTo(look, 1))}`;
        return {
          prompt: `The bar chart shows ${ctx.what}. The vertical axis starts at ${S}.\n\nHow many times as large as the ${cA} value is the ${cB} value? Give your answer as a decimal.`,
          answer: { type: "number", value: q, allowFraction: false },
          solution: [
            `Read the real values from the labels: ${cA} = ${a}, ${cB} = ${b}.`,
            `${b} ÷ ${a} = ${num(q)}.`,
            `The ${cB} bar looks ${lookStr} times as tall, only because the axis starts at ${S}.`,
          ],
          hint: "Use the values themselves, not the heights of the bars.",
          traps: [numTrap(roundTo(look, 2), `That's how the bars *look*. Compare the actual values, ${b} and ${a}, instead.`, 0.006)],
          diagram: barSvg(S, S + top * m, tick * m, ctx.cats, [a, b], ctx.yl, `Bar chart with the vertical axis starting at ${S}: ${cA} ${a}, ${cB} ${b}`),
        };
      }

      // percent
      let p = 25;
      for (let i = 0; i < 300 && !found; i++) {
        p = rng.pick([10, 20, 25, 40, 50, 60, 75]);
        V1 = rng.int(20, 90);
        if ((V1 * (100 + p)) % 100 !== 0) continue;
        V2 = (V1 * (100 + p)) / 100;
        S0 = Math.floor((V1 - rng.int(2, 15)) / 5) * 5;
        if (S0 < 10 || V1 - S0 < 3) continue;
        const lookPct = ((V2 - V1) / (V1 - S0)) * 100;
        if (lookPct < 2 * p || V2 - S0 > 70 || (V2 - S0) / (V1 - S0) > 12) continue;
        found = true;
      }
      if (!found) { p = 25; V1 = 40; V2 = 50; S0 = 35; }
      const { tick, top } = axisTop(V2 - S0);
      const S = S0 * m, a = V1 * m, b = V2 * m;
      const lookPct = roundTo(((b - a) / (a - S)) * 100, 1);
      return {
        prompt: `The bar chart shows ${ctx.what}. The vertical axis starts at ${S}.\n\nBy what percentage is the ${cB} value greater than the ${cA} value?`,
        answer: { type: "number", value: p, display: `${p}%` },
        solution: [
          `Increase = ${b} − ${a} = ${b - a}.`,
          `Percentage increase = {{${b - a}/${a}}} × 100 = ${p}%.`,
          `The bars, measured from ${S}, suggest a rise of about ${num(Math.round(lookPct))}%. That's the truncated axis exaggerating the difference.`,
        ],
        hint: "Percentage increase = increase ÷ original value × 100. Use the real values, not the bar heights.",
        traps: [numTrap(lookPct, `That uses the bar heights measured from ${S}. Use the real values instead.`, 0.06)],
        diagram: barSvg(S, S + top * m, tick * m, ctx.cats, [a, b], ctx.yl, `Bar chart with the vertical axis starting at ${S}: ${cA} ${a}, ${cB} ${b}`),
      };
    },
  },

  // 12 ----------------------------------------------------------------------
  {
    id: "statistics.frequency-polygon",
    topicId: "statistics",
    title: "Frequency polygons and continuous data",
    level: 3,
    guideRef: "continuous-data",
    generate(rng, tier) {
      const ctx = rng.pick(tier === 1 ? FP_T1 : tier === 2 ? FP_T2 : FP_T3);
      const fs = Array.from({ length: ctx.k }, () => rng.int(tier === 1 ? 2 : 1, tier === 1 ? 15 : 24));
      const bound = (i: number) => clean((ctx.lo + i * ctx.w) / ctx.sc);
      const cls = (i: number) => `{{${num(bound(i))} <= ${ctx.v} < ${num(bound(i + 1))}}}`;
      const table = `| ${ctx.head} | Frequency |\n|---|---|\n${fs.map((f, i) => `| ${cls(i)} | ${f} |`).join("\n")}`;

      if (tier >= 2 && rng.bool(0.4)) {
        const j = rng.int(1, ctx.k - 1);
        const X = bound(j);
        const less = rng.bool();
        const below = fs.slice(0, j), above = fs.slice(j);
        const ans = less ? sumOf(below) : sumOf(above);
        const wrong = less ? sumOf(fs.slice(0, j + 1)) : sumOf(fs.slice(j + 1));
        const traps: Trap[] = [];
        if (wrong !== ans && wrong > 0) {
          traps.push(numTrap(wrong, less ? `The class ${cls(j)} starts at ${num(X)}, so those values are *not* less than ${num(X)}.` : `Values in ${cls(j)} are at least ${num(X)}, so include that class.`));
        }
        const used = less ? below.map((_, i) => cls(i)) : above.map((_, i) => cls(i + j));
        const usedF = less ? below : above;
        return {
          prompt: `${ctx.intro}\n\n${table}\n\nHow many ${ctx.who} had a ${ctx.noun} of ${less ? "less than" : "at least"} ${num(X)} ${ctx.unit}?`,
          answer: { type: "number", value: ans },
          solution: [
            `${less ? "Less than" : "At least"} ${num(X)} means the class${used.length > 1 ? "es" : ""} ${used.join(", ")}.`,
            usedF.length > 1 ? `${usedF.join(" + ")} = ${ans}.` : `That class has frequency ${ans}.`,
          ],
          hint: `Which classes contain only values ${less ? "below" : "of at least"} ${num(X)}? Look carefully at the inequality signs.`,
          traps,
        };
      }

      const i = rng.int(0, ctx.k - 1);
      const lo = bound(i), hi = bound(i + 1);
      const mid = clean((2 * ctx.lo + (2 * i + 1) * ctx.w) / (2 * ctx.sc));
      const f = fs[i];
      return {
        prompt: `${ctx.intro}\n\n${table}\n\nA frequency polygon is drawn for this data. Write down the coordinates of the point plotted for the class ${cls(i)}. Give your answer as (x, y).`,
        answer: { type: "list", values: [mid, f], ordered: true, display: `(${num(mid)}, ${f})` },
        solution: [
          "A frequency polygon plots each frequency at the midpoint of its class.",
          `Midpoint = (${num(lo)} + ${num(hi)}) ÷ 2 = ${num(mid)}.`,
          `The frequency is ${f}, so the point is (${num(mid)}, ${f}).`,
        ],
        hint: "Which x-value sits exactly in the middle of the class?",
        traps: [
          { spec: { type: "list", values: [lo, f], ordered: true }, feedback: "Points go at the *midpoint* of the class, not its lower end." },
          { spec: { type: "list", values: [hi, f], ordered: true }, feedback: "Points go at the *midpoint* of the class, not its upper end." },
        ],
      };
    },
  },
];
