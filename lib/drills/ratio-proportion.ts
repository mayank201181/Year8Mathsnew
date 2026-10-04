// Procedural skill drills — Ratio & Proportion (Year 8).
// Every question is built from whole numbers first (cents, tenths of a cm …)
// so the answers are exact; rejection loops keep the numbers friendly.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, lcm, num, money, clean, big } from "./helpers.ts";

const T = "ratio-proportion";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

function people(rng: Rng, k: number): string[] {
  return rng.shuffle(NAMES).slice(0, k);
}

function listAnd(xs: string[]): string {
  return xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

/** "3 : 4 : 5" (thousands separators for map scales). */
function rat(parts: number[]): string {
  return parts.map((p) => big(p)).join(" : ");
}

/** $12 for whole dollars, $12.50 otherwise. */
function dollars(v: number): string {
  const c = clean(v);
  return Number.isInteger(c) ? "$" + big(c) : money(c);
}

/** Number of decimal places of a (cleaned) number. */
function dp(n: number): number {
  const s = String(clean(n));
  const i = s.indexOf(".");
  return i < 0 ? 0 : s.length - i - 1;
}

function total(xs: number[]): number {
  return xs.reduce((a, b) => a + b, 0);
}

function hcfAll(xs: number[]): number {
  return xs.reduce((g, x) => gcd(g, x), 0);
}

/** Are two ratios equivalent (same direction)? */
function proportional(x: number[], y: number[]): boolean {
  return x.length === y.length && x.every((v, i) => Math.abs(v * y[0] - y[i] * x[0]) < 1e-9);
}

/** Round the positive fraction n/d to the nearest whole number (halves up), using integers only. */
function roundHalfUp(n: number, d: number): number {
  return Math.floor((2 * n + d) / (2 * d));
}

function plural(n: number, one: string, many = one + "s"): string {
  return `${big(n)} ${n === 1 ? one : many}`;
}

/** Two different numbers in 1..max with no common factor. */
function coprimePair(rng: Rng, max: number): [number, number] {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(1, max);
    const b = rng.int(1, max);
    if (a !== b && gcd(a, b) === 1) return [a, b];
  }
  return [2, 3];
}

/** Three different numbers in 1..max whose HCF is 1. */
function coprimeTriple(rng: Rng, max: number): [number, number, number] {
  for (let i = 0; i < 200; i++) {
    const a = rng.int(1, max);
    const b = rng.int(1, max);
    const c = rng.int(1, max);
    if (a !== b && b !== c && a !== c && hcfAll([a, b, c]) === 1) return [a, b, c];
  }
  return [2, 3, 4];
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function letter(i: number): string {
  return "ABC"[i];
}

// ---------------------------------------------------------------------------
// Data for contexts
// ---------------------------------------------------------------------------

interface UnitPair {
  small: string;
  f: number;
  steps: number[];
  bigs: number[];
  bigs3: number[];
  fs: (v: number) => string;
  fb: (v: number) => string;
  ctx: (x: string, y: string, name: string) => string;
  t1: boolean;
}

const UNIT_PAIRS: UnitPair[] = [
  {
    small: "cm", f: 100, steps: [5, 10, 15, 20, 25, 30, 40], bigs: [1, 2, 3, 4, 5], bigs3: [1.5, 2.5, 1.2, 0.8],
    fs: (v) => `${big(v)} cm`, fb: (v) => `${num(v)} m`,
    ctx: (x, y) => `Two pieces of ribbon are ${x} and ${y} long. Write the ratio of the first length to the second in its simplest form.`,
    t1: true,
  },
  {
    small: "mm", f: 10, steps: [2, 3, 4, 5, 6, 8], bigs: [2, 3, 4, 5, 6, 8], bigs3: [1.5, 2.5, 3.5],
    fs: (v) => `${big(v)} mm`, fb: (v) => `${num(v)} cm`,
    ctx: (x, y) => `Two screws are ${x} and ${y} long. Write the ratio of the first length to the second in its simplest form.`,
    t1: false,
  },
  {
    small: "g", f: 1000, steps: [50, 100, 125, 150, 200, 250], bigs: [1, 2, 3, 4, 5], bigs3: [1.5, 2.5, 1.2, 0.6],
    fs: (v) => `${big(v)} g`, fb: (v) => `${num(v)} kg`,
    ctx: (x, y) => `A recipe uses ${x} of lentils and ${y} of rice. Write the ratio lentils : rice in its simplest form.`,
    t1: true,
  },
  {
    small: "ml", f: 1000, steps: [50, 100, 150, 200, 250], bigs: [1, 2, 3], bigs3: [1.5, 2.5, 1.2],
    fs: (v) => `${big(v)} ml`, fb: (v) => (v === 1 ? "1 litre" : `${num(v)} litres`),
    ctx: (x, y) => `A drink is made from ${x} of mango juice and ${y} of water. Write the ratio juice : water in its simplest form.`,
    t1: true,
  },
  {
    small: "minutes", f: 60, steps: [5, 10, 15, 20, 30, 45], bigs: [1, 2, 3, 4], bigs3: [1.5, 2.5, 0.5],
    fs: (v) => `${big(v)} minutes`, fb: (v) => (v === 1 ? "1 hour" : `${num(v)} hours`),
    ctx: (x, y, name) => `${name} spends ${x} reading and ${y} practising the piano. Write the ratio reading time : piano time in its simplest form.`,
    t1: true,
  },
  {
    small: "seconds", f: 60, steps: [5, 10, 15, 20, 30, 40], bigs: [1, 2, 3, 4], bigs3: [1.5, 2.5, 0.5],
    fs: (v) => `${big(v)} seconds`, fb: (v) => (v === 1 ? "1 minute" : `${num(v)} minutes`),
    ctx: (x, y) => `Two video clips last ${x} and ${y}. Write the ratio of the first time to the second in its simplest form.`,
    t1: false,
  },
  {
    small: "m", f: 1000, steps: [50, 100, 150, 200, 250, 400, 500], bigs: [1, 2, 3, 4, 5], bigs3: [1.5, 2.5, 1.2],
    fs: (v) => `${big(v)} m`, fb: (v) => `${num(v)} km`,
    ctx: (x, y) => `Two running routes are ${x} and ${y} long. Write the ratio of the first distance to the second in its simplest form.`,
    t1: false,
  },
  {
    small: "cents", f: 100, steps: [5, 10, 20, 25, 30, 40, 50], bigs: [1, 2, 3, 4, 5], bigs3: [1.5, 2.5, 1.2],
    fs: (v) => `${big(v)} cents`, fb: (v) => dollars(v),
    ctx: (x, y) => `A pencil costs ${x} and a sticker book costs ${y}. Write the ratio pencil price : book price in its simplest form.`,
    t1: true,
  },
];

const GROUPS = [
  { A: "fiction books", B: "non-fiction books", where: "on a library shelf" },
  { A: "red beads", B: "blue beads", where: "in a jar" },
  { A: "cups of kopi", B: "cups of teh", where: "sold at a hawker stall one morning" },
  { A: "girls", B: "boys", where: "in a school choir" },
  { A: "sunflowers", B: "daisies", where: "in a garden" },
  { A: "adults", B: "children", where: "on a Sentosa tour" },
] as const;

const RF = [
  { A: "red sweets", B: "green sweets", all: "sweets", where: "in a bag" },
  { A: "girls", B: "boys", all: "members", where: "in a CCA club" },
  { A: "cats", B: "dogs", all: "animals", where: "at an animal shelter" },
  { A: "fiction books", B: "non-fiction books", all: "books", where: "on a shelf" },
  { A: "mango trees", B: "durian trees", all: "trees", where: "in an orchard" },
] as const;

const RF3 = [
  { intro: (r: string) => `The counters in a bag are red, blue or yellow in the ratio ${r}.`, cats: ["red", "blue", "yellow"], label: ["red", "blue", "yellow"], ask: (c: string, not: boolean) => `What fraction of the counters are ${not ? "not " : ""}${c}?` },
  { intro: (r: string) => `Students in a class travel to school by MRT, by bus or on foot in the ratio ${r}.`, cats: ["by MRT", "by bus", "on foot"], label: ["MRT", "bus", "walking"], ask: (c: string, not: boolean) => `What fraction of the students ${not ? "do not travel" : "travel"} ${c}?` },
  { intro: (r: string) => `The songs on a playlist are pop, rock or jazz in the ratio ${r}.`, cats: ["pop", "rock", "jazz"], label: ["pop", "rock", "jazz"], ask: (c: string, not: boolean) => `What fraction of the songs are ${not ? "not " : ""}${c}?` },
] as const;

const SHOP = [
  { one: "notebook", many: "notebooks", lo: 80, hi: 400 },
  { one: "pen", many: "pens", lo: 60, hi: 350 },
  { one: "mango", many: "mangoes", lo: 80, hi: 300 },
  { one: "cup of bubble tea", many: "cups of bubble tea", lo: 250, hi: 650 },
  { one: "packet of tissues", many: "packets of tissues", lo: 40, hi: 200 },
  { one: "cinema ticket", many: "cinema tickets", lo: 900, hi: 1500 },
  { one: "vegetable bun", many: "vegetable buns", lo: 80, hi: 250 },
] as const;

interface RateCtx {
  lead: (x: number, y: number, name: string) => string;
  askY: (x: number, name: string) => string;
  askX: (y: number, name: string) => string;
  xu: string;
  yu: string;
  lo: number;
  hi: number;
  isMoney: boolean;
}

const RATES: RateCtx[] = [
  {
    lead: (x, y) => `A printer prints ${y} pages in ${x} minutes.`,
    askY: (x) => `How many pages does it print in ${x} minutes?`,
    askX: (y) => `How many minutes does it take to print ${y} pages?`,
    xu: "minutes", yu: "pages", lo: 6, hi: 30, isMoney: false,
  },
  {
    lead: (x, y) => `A tap fills a tank with ${y} litres of water in ${x} minutes.`,
    askY: (x) => `How many litres does it fill in ${x} minutes?`,
    askX: (y) => `How many minutes does it take to fill ${y} litres?`,
    xu: "minutes", yu: "litres", lo: 4, hi: 15, isMoney: false,
  },
  {
    lead: (x, y) => `A machine at a bakery bakes ${y} buns in ${x} minutes.`,
    askY: (x) => `How many buns does it bake in ${x} minutes?`,
    askX: (y) => `How many minutes does it take to bake ${y} buns?`,
    xu: "minutes", yu: "buns", lo: 8, hi: 40, isMoney: false,
  },
  {
    lead: (x, y, n) => `${n} earns $${y} for ${x} hours of tutoring.`,
    askY: (x, n) => `How much does ${n} earn for ${x} hours at the same rate? Give your answer in dollars.`,
    askX: (y, n) => `How many hours must ${n} tutor to earn $${y}?`,
    xu: "hours", yu: "dollars", lo: 15, hi: 40, isMoney: true,
  },
];

interface Product {
  title: string;
  are: boolean;
  kind: "g" | "ml" | "count";
  lo: number;
  hi: number;
  one: string;
  many: string;
}

const PRODUCTS: Product[] = [
  { title: "Basmati rice", are: false, kind: "g", lo: 20, hi: 60, one: "", many: "" },
  { title: "Rolled oats", are: true, kind: "g", lo: 30, hi: 90, one: "", many: "" },
  { title: "Peanut butter", are: false, kind: "g", lo: 80, hi: 200, one: "", many: "" },
  { title: "Pasta", are: false, kind: "g", lo: 25, hi: 70, one: "", many: "" },
  { title: "Oat milk", are: false, kind: "ml", lo: 30, hi: 80, one: "", many: "" },
  { title: "Shampoo", are: false, kind: "ml", lo: 60, hi: 180, one: "", many: "" },
  { title: "Pencils", are: true, kind: "count", lo: 15, hi: 80, one: "pencil", many: "pencils" },
  { title: "Glue sticks", are: true, kind: "count", lo: 40, hi: 150, one: "glue stick", many: "glue sticks" },
];

interface Ingredient {
  name: string;
  unit: "g" | "ml";
  per: number[];
}

const RECIPES: { dish: string; items: Ingredient[] }[] = [
  {
    dish: "vegetable curry",
    items: [
      { name: "potatoes", unit: "g", per: [50, 60, 75, 80, 100, 120, 150] },
      { name: "coconut milk", unit: "ml", per: [40, 50, 60, 75, 80, 100] },
      { name: "chickpeas", unit: "g", per: [30, 40, 50, 60, 80] },
    ],
  },
  {
    dish: "pancakes",
    items: [
      { name: "flour", unit: "g", per: [25, 30, 40, 50, 60, 75] },
      { name: "milk", unit: "ml", per: [50, 60, 75, 80, 100, 120] },
      { name: "sugar", unit: "g", per: [5, 10, 15, 20] },
    ],
  },
  {
    dish: "vegetable fried rice",
    items: [
      { name: "rice", unit: "g", per: [60, 70, 75, 80, 90, 100] },
      { name: "peas", unit: "g", per: [20, 25, 30, 40, 50] },
      { name: "soy sauce", unit: "ml", per: [5, 10, 15] },
    ],
  },
  {
    dish: "dhal",
    items: [
      { name: "red lentils", unit: "g", per: [40, 50, 60, 75, 80] },
      { name: "water", unit: "ml", per: [100, 120, 150, 200] },
      { name: "chopped tomatoes", unit: "g", per: [30, 40, 50, 60] },
    ],
  },
  {
    dish: "mango lassi",
    items: [
      { name: "yoghurt", unit: "ml", per: [80, 100, 120, 150] },
      { name: "mango", unit: "g", per: [60, 75, 80, 100, 120] },
      { name: "milk", unit: "ml", per: [30, 40, 50, 60] },
    ],
  },
];

const UNIT_WORD = { g: "grams", ml: "millilitres" } as const;

interface Currency {
  name: string;
  /** Foreign units per S$1, × 100 (an integer). */
  r: number;
  show: (v: number) => string;
  /** S$ per 1 unit of the foreign currency, × 100 (for "£1 = S$1.72" questions). */
  back?: number;
  whole: boolean;
}

const CURRENCIES: Currency[] = [
  { name: "US dollars", r: 75, show: (v) => `US$${v.toFixed(2)}`, back: 133, whole: false },
  { name: "Malaysian ringgit", r: 340, show: (v) => `RM ${v.toFixed(2)}`, whole: false },
  { name: "Thai baht", r: 2500, show: (v) => `${big(v)} baht`, whole: true },
  { name: "Japanese yen", r: 11000, show: (v) => `¥${big(v)}`, whole: true },
  { name: "euros", r: 68, show: (v) => `€${v.toFixed(2)}`, back: 148, whole: false },
  { name: "Indian rupees", r: 6400, show: (v) => `₹${big(v)}`, whole: true },
  { name: "Australian dollars", r: 115, show: (v) => `A$${v.toFixed(2)}`, back: 87, whole: false },
  { name: "British pounds", r: 58, show: (v) => `£${v.toFixed(2)}`, back: 172, whole: false },
];

const SOUVENIRS = ["a souvenir T-shirt", "a pair of trainers", "a theme-park ticket", "a hotel night", "a set of postcards", "a backpack"];

/** Two similar rectangles drawn to scale, bottoms aligned. */
function rectsSvg(w: number, h: number, W: number, H: number, la: [string, string], lb: [string, string]): string {
  const s = Math.min(260 / (w + W), 190 / Math.max(h, H));
  const r = (v: number) => Math.round(v * 10) / 10;
  const aw = r(w * s), ah = r(h * s), bw = r(W * s), bh = r(H * s);
  const base = 240, ax = 60, bx = r(ax + aw + 70);
  return `<svg viewBox="0 0 460 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two similar rectangles, A and B, drawn to scale with their side lengths labelled">` +
    `<rect x="0" y="0" width="460" height="280" fill="#ffffff"/>` +
    `<rect x="${ax}" y="${r(base - ah)}" width="${aw}" height="${ah}" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/>` +
    `<rect x="${bx}" y="${r(base - bh)}" width="${bw}" height="${bh}" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/>` +
    `<text x="${r(ax + aw / 2)}" y="${r(base - ah - 8)}" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">A</text>` +
    `<text x="${r(bx + bw / 2)}" y="${r(base - bh - 8)}" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">B</text>` +
    `<text x="${r(ax + aw / 2)}" y="${base + 18}" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">${la[0]}</text>` +
    `<text x="${ax - 6}" y="${r(base - ah / 2 + 4)}" font-size="12" font-family="sans-serif" text-anchor="end" fill="#334155">${la[1]}</text>` +
    `<text x="${r(bx + bw / 2)}" y="${base + 18}" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">${lb[0]}</text>` +
    `<text x="${r(bx + bw + 6)}" y="${r(base - bh / 2 + 4)}" font-size="12" font-family="sans-serif" text-anchor="start" fill="#334155">${lb[1]}</text>` +
    `</svg>`;
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ─ Simplify a ratio ------------------------------------------------------
  {
    id: "ratio-proportion.simplify",
    topicId: T,
    title: "Simplify a ratio",
    level: 1,
    guideRef: "ratio-basics",
    generate(rng, tier) {
      const mode = tier === 1 ? rng.pick(["two", "two", "three"] as const) : tier === 2 ? rng.pick(["two", "three", "decimal"] as const) : rng.pick(["three", "decimal", "fraction"] as const);

      if (mode === "decimal") {
        let a = 3, b = 8, P = [1.5, 4];
        for (let i = 0; i < 100; i++) {
          const [a0, b0] = coprimePair(rng, 9);
          const k = rng.pick(tier === 2 ? [0.5, 1.5, 2.5, 0.2, 0.3, 0.4, 1.2] : [0.5, 1.5, 2.5, 0.2, 0.3, 0.4, 1.2, 0.25, 0.75, 1.25]);
          const P0 = [clean(a0 * k), clean(b0 * k)];
          if (Number.isInteger(P0[0]) && Number.isInteger(P0[1])) continue;
          a = a0; b = b0; P = P0;
          break;
        }
        const m = Math.max(dp(P[0]), dp(P[1])) >= 2 ? 100 : 10;
        const W = P.map((p) => Math.round(p * m));
        const g = gcd(W[0], W[1]);
        const ans = W.map((w) => w / g);
        const litres = (v: number) => (v === 1 ? "1 litre" : `${num(v)} litres`);
        const t = rng.int(0, 2);
        const prompt =
          t === 0 ? `Simplify the ratio ${rat(P)}. Give your answer using whole numbers, in its simplest form.`
          : t === 1 ? `A drink is made from ${litres(P[0])} of orange juice and ${litres(P[1])} of lemonade. Write the ratio juice : lemonade using whole numbers, in its simplest form.`
          : `A footpath is ${num(P[0])} km long and a cycle track is ${num(P[1])} km long. Write the ratio footpath : cycle track using whole numbers, in its simplest form.`;
        const traps: Trap[] = [];
        if (Number.isInteger(P[0]) !== Number.isInteger(P[1])) {
          const wrong = P.map((p) => (Number.isInteger(p) ? p : Math.round(p * m)));
          if (!proportional(wrong, ans)) traps.push({ spec: { type: "ratio", parts: wrong }, feedback: "Multiply BOTH parts by the same number — changing only one part changes the ratio." });
        }
        void a; void b;
        return {
          prompt,
          answer: { type: "ratio", parts: ans, simplest: true },
          solution: [
            `Multiply both parts by ${m} to clear the decimals: ${rat(P)} = ${rat(W)}.`,
            g > 1 ? `The HCF of ${W[0]} and ${W[1]} is ${g}. Divide both parts by ${g}: ${rat(ans)}.` : `${W[0]} and ${W[1]} have no common factor, so ${rat(W)} is already simplest.`,
            `So ${rat(P)} = ${rat(ans)}.`,
          ],
          hint: "Multiply both parts by 10 (or 100) to make them whole numbers, then simplify.",
          traps,
        };
      }

      if (mode === "fraction") {
        let n1 = 1, d1 = 2, n2 = 3, d2 = 4, L = 4, W = [2, 3], g = 1, ans = [2, 3];
        const dens = [2, 3, 4, 5, 6, 8, 10, 12];
        for (let i = 0; i < 200; i++) {
          const D1 = rng.pick(dens), D2 = rng.pick(dens);
          if (D1 === D2) continue;
          const N1 = rng.int(1, 2 * D1 - 1), N2 = rng.int(1, 2 * D2 - 1);
          if (gcd(N1, D1) !== 1 || gcd(N2, D2) !== 1) continue;
          const LL = lcm(D1, D2);
          const WW = [(N1 * LL) / D1, (N2 * LL) / D2];
          const gg = gcd(WW[0], WW[1]);
          const aa = WW.map((w) => w / gg);
          if (aa[0] === aa[1] || Math.max(aa[0], aa[1]) > 40) continue;
          n1 = N1; d1 = D1; n2 = N2; d2 = D2; L = LL; W = WW; g = gg; ans = aa;
          break;
        }
        const shown = `${frac(n1, d1, { mixed: true })} : ${frac(n2, d2, { mixed: true })}`;
        const steps: string[] = [];
        if (n1 > d1 || n2 > d2) steps.push(`Write any mixed numbers as improper fractions: ${frac(n1, d1)} : ${frac(n2, d2)}.`);
        steps.push(`Multiply both parts by ${L}, the LCM of ${d1} and ${d2}: ${frac(n1, d1)} × ${L} = ${W[0]} and ${frac(n2, d2)} × ${L} = ${W[1]}.`);
        steps.push(g > 1 ? `Divide ${W[0]} : ${W[1]} by the HCF, ${g}: ${rat(ans)}.` : `${W[0]} : ${W[1]} has no common factor, so it is already simplest.`);
        const traps: Trap[] = [];
        if (!proportional([n1, n2], ans)) traps.push({ spec: { type: "ratio", parts: [n1, n2] }, feedback: "You can't just compare the numerators — the denominators are different. Multiply both fractions by the LCM of the denominators first." });
        return {
          prompt: `Simplify the ratio ${shown}. Give your answer using whole numbers, in its simplest form.`,
          answer: { type: "ratio", parts: ans, simplest: true },
          solution: steps,
          hint: "Multiply both parts by a number that every denominator divides into.",
          traps,
        };
      }

      const base: number[] = mode === "two" ? coprimePair(rng, tier === 1 ? 8 : 12) : coprimeTriple(rng, tier === 1 ? 6 : 9);
      const k = rng.int(2, tier === 1 ? 9 : tier === 2 ? 15 : 20);
      const P = base.map((x) => x * k);
      const [n1] = people(rng, 1);
      const t = rng.int(0, 2);
      let prompt: string;
      if (mode === "two") {
        prompt =
          t === 0 ? `Simplify the ratio ${rat(P)}. Give your answer in its simplest form.`
          : t === 1 ? `A jar holds ${P[0]} red beads and ${P[1]} blue beads. Write the ratio of red beads to blue beads in its simplest form.`
          : `A paint mix uses ${P[0]} ml of blue paint and ${P[1]} ml of yellow paint. Write the ratio blue : yellow in its simplest form.`;
      } else {
        prompt =
          t === 0 ? `Simplify the ratio ${rat(P)}. Give your answer in its simplest form.`
          : t === 1 ? `A fruit stall sells ${P[0]} apples, ${P[1]} pears and ${P[2]} oranges one morning. Write the ratio apples : pears : oranges in its simplest form.`
          : `${n1} plants ${P[0]} sunflowers, ${P[1]} marigolds and ${P[2]} daisies. Write the ratio sunflowers : marigolds : daisies in its simplest form.`;
      }
      return {
        prompt,
        answer: { type: "ratio", parts: base, simplest: true },
        solution: [
          `Find the highest common factor (HCF) of ${listAnd(P.map(String))}: it is ${k}.`,
          `Divide every part by ${k}: ${P.map((p) => `${p} ÷ ${k} = ${p / k}`).join(", ")}.`,
          `So ${rat(P)} = ${rat(base)}, which has no common factor other than 1.`,
        ],
        hint: "Find the biggest number that divides into every part, then divide each part by it.",
      };
    },
  },

  // 2 ─ Ratios with different units ------------------------------------------
  {
    id: "ratio-proportion.simplify-units",
    topicId: T,
    title: "Simplify a ratio with different units",
    level: 2,
    guideRef: "ratio-basics",
    generate(rng, tier) {
      let pair = UNIT_PAIRS[0], q1 = 50, q2 = 2, Q2 = 200, g = 50;
      for (let i = 0; i < 300; i++) {
        const p = rng.pick(tier === 1 ? UNIT_PAIRS.filter((u) => u.t1) : UNIT_PAIRS);
        const b = tier === 3 && rng.bool(0.6) ? rng.pick(p.bigs3) : rng.pick(p.bigs);
        const B = Math.round(b * p.f);
        const a = rng.pick(p.steps) * rng.int(1, 12);
        if (a === B || a % p.f === 0 || a > 3 * B) continue;
        const gg = gcd(a, B);
        if (gg < 2 || a / gg > 60 || B / gg > 60) continue;
        pair = p; q1 = a; q2 = b; Q2 = B; g = gg;
        break;
      }
      const smallFirst = tier === 1 ? true : rng.bool();
      const [n1] = people(rng, 1);
      const sx = pair.fs(q1), bx = pair.fb(q2);
      const [x, y] = smallFirst ? [sx, bx] : [bx, sx];
      const raw = smallFirst ? [q1, Q2] : [Q2, q1];
      const ans = raw.map((v) => v / g);
      const prompt = rng.bool() ? `Write ${x} : ${y} as a ratio in its simplest form.` : pair.ctx(x, y, n1);
      const traps: Trap[] = [];
      if (Number.isInteger(q2)) {
        const wrong = smallFirst ? [q1, q2] : [q2, q1];
        if (!proportional(wrong, ans)) traps.push({ spec: { type: "ratio", parts: wrong }, feedback: "Change both quantities to the same unit before you simplify." });
      }
      return {
        prompt,
        answer: { type: "ratio", parts: ans, simplest: true },
        solution: [
          `Use the same units: ${bx} = ${pair.fs(Q2)}.`,
          `So the ratio is ${rat(raw)} — the units cancel, so leave them out.`,
          `Divide both parts by the HCF, ${g}: ${rat(ans)}.`,
        ],
        hint: "Convert both amounts into the smaller unit first.",
        traps,
      };
    },
  },

  // 3 ─ The form 1 : n --------------------------------------------------------
  {
    id: "ratio-proportion.one-to-n",
    topicId: T,
    title: "Write a ratio in the form 1 : n",
    level: 2,
    guideRef: "ratio-basics",
    generate(rng, tier) {
      const mode = tier === 1 ? "int" : tier === 2 ? rng.pick(["int", "dec", "dec"] as const) : rng.pick(["dec", "less", "units"] as const);
      let a = 4, b = 10, n = 2.5;
      let unitStep = "";
      let shown = "4 : 10";
      for (let i = 0; i < 300; i++) {
        let A = 0, B = 0;
        if (mode === "int") {
          A = rng.int(2, 12);
          B = A * rng.int(2, 12);
        } else if (mode === "dec") {
          A = rng.pick([2, 4, 5, 8, 10, 20, 25, 40, 50]);
          B = rng.int(A + 1, A * 10);
          if (B % A === 0) continue;
        } else if (mode === "less") {
          A = rng.pick([4, 5, 8, 10, 20, 25, 40, 50]);
          B = rng.int(1, A - 1);
        } else {
          const u = rng.pick([
            { f: 100, s: "cm", b: "m", q1: [20, 25, 40, 50, 80] },
            { f: 1000, s: "g", b: "kg", q1: [200, 250, 400, 500, 800] },
            { f: 1000, s: "ml", b: "litres", q1: [200, 250, 400, 500] },
          ]);
          const q1 = rng.pick(u.q1);
          const q2 = rng.int(2, 6);
          A = q1;
          B = q2 * u.f;
          const N = clean(B / A);
          if (Number.isInteger(N) || dp(N) > 2) continue;
          a = A; b = B; n = N;
          shown = `${q1} ${u.s} : ${q2} ${u.b}`;
          unitStep = `Use the same units: ${q2} ${u.b} = ${big(B)} ${u.s}, so the ratio is ${rat([A, B])}.`;
          break;
        }
        const N = clean(B / A);
        if (dp(N) > (tier === 3 ? 3 : 2)) continue;
        a = A; b = B; n = N;
        shown = rat([A, B]);
        break;
      }
      const [n1] = people(rng, 1);
      const t = unitStep ? 0 : rng.int(0, b > a ? 2 : 1);
      const prompt =
        t === 0 ? `Write ${shown} in the form 1 : n.`
        : t === 1 ? `A garden has ${a} rose bushes and ${b} tulips. Write the ratio roses : tulips in the form 1 : n.`
        : `${n1} mixes ${a} spoonfuls of cordial with ${b} spoonfuls of water. Write the ratio cordial : water in the form 1 : n.`;
      const steps: string[] = [];
      if (unitStep) steps.push(unitStep);
      steps.push(`Divide both parts by the first part, ${big(a)}, so that the first part becomes 1.`);
      steps.push(`${big(a)} ÷ ${big(a)} = 1 and ${big(b)} ÷ ${big(a)} = ${num(n)}, so the ratio is 1 : ${num(n)}.`);
      const traps: Trap[] = [];
      const inv = clean(a / b);
      if (dp(inv) <= 3 && Math.abs(inv - n) > 1e-9) traps.push({ spec: { type: "ratio", parts: [1, inv] }, feedback: "You divided the wrong way round — divide both parts by the FIRST number so the first part becomes 1." });
      return {
        prompt,
        answer: { type: "ratio", parts: [1, n], simplest: true, display: `1 : ${num(n)}` },
        solution: steps,
        hint: "Divide both parts by the first number. The second part can be a decimal.",
        traps,
      };
    },
  },

  // 4 ─ Share an amount in a ratio -------------------------------------------
  {
    id: "ratio-proportion.share-amount",
    topicId: T,
    title: "Share an amount in a ratio",
    level: 1,
    guideRef: "sharing-in-a-ratio",
    generate(rng, tier) {
      let parts: number[];
      if (tier === 1) parts = coprimePair(rng, 7);
      else if (tier === 2) parts = rng.bool() ? coprimePair(rng, 9) : coprimeTriple(rng, 6);
      else parts = rng.bool(0.3) ? coprimePair(rng, 12) : coprimeTriple(rng, 9);
      const S = total(parts);
      const isMoney = tier === 3 ? rng.bool(0.7) : rng.bool();
      // One part, in cents (money) or items.
      const unit = isMoney ? (tier === 1 ? 100 * rng.int(2, 12) : tier === 2 ? 100 * rng.int(2, 25) : 5 * rng.int(21, 199)) : rng.int(2, tier === 1 ? 10 : 20);
      const val = (x: number) => (isMoney ? clean(x / 100) : x);
      const fmt = (x: number) => (isMoney ? dollars(x / 100) : big(x));
      const shares = parts.map((p) => p * unit);
      const tot = S * unit;
      const who = people(rng, parts.length);
      const item = rng.pick(["stickers", "marbles", "trading cards", "beads"]);
      const what = isMoney ? fmt(tot) : `${tot} ${item}`;
      const intro = rng.bool()
        ? `${listAnd(who)} share ${what} in the ratio ${rat(parts)}.`
        : `${what} ${isMoney ? "is" : "are"} shared between ${listAnd(who)} in the ratio ${rat(parts)}.`;
      const much = isMoney ? "much" : "many";
      const mode = tier === 1 ? rng.pick(["all", "one"] as const) : rng.pick(["all", "one", "diff"] as const);
      const steps = [`Total number of parts: ${parts.join(" + ")} = ${S}.`, `One part = ${fmt(tot)} ÷ ${S} = ${fmt(unit)}.`];
      const traps: Trap[] = [];
      let prompt: string;
      let answer: AnswerSpec;
      if (mode === "all") {
        prompt = `${intro} How ${much} does each person get? ${parts.length === 2 ? `Give ${who[0]}'s share first.` : `Give the shares in the order ${who.join(", ")}.`}`;
        answer = { type: "list", values: shares.map(val), ordered: true, display: listAnd(shares.map(fmt)) };
        steps.push(`Multiply: ${parts.map((p, i) => `${who[i]} ${p} × ${fmt(unit)} = ${fmt(p * unit)}`).join(", ")}.`);
        steps.push(`Check: ${shares.map(fmt).join(" + ")} = ${fmt(tot)}.`);
        if (parts.length === 2 && parts.every((p) => Number.isInteger(tot / p))) {
          const wrong = parts.map((p) => val(tot / p));
          if (wrong.some((w, i) => w !== val(shares[i]))) traps.push({ spec: { type: "list", values: wrong, ordered: true }, feedback: `You divided the total by each number in the ratio. First add the parts (${S}) to find the value of one part.` });
        }
      } else if (mode === "one") {
        const i = rng.int(0, parts.length - 1);
        prompt = `${intro} How ${much} does ${who[i]} get?`;
        answer = { type: "number", value: val(shares[i]), display: fmt(shares[i]) };
        steps.push(`${who[i]} gets ${plural(parts[i], "part")}: ${parts[i]} × ${fmt(unit)} = ${fmt(shares[i])}.`);
        if (parts[i] !== 1) traps.push({ spec: { type: "number", value: val(unit) }, feedback: `That's the value of ONE part. Now multiply by ${who[i]}'s number of parts (${parts[i]}).` });
      } else {
        const order = parts.map((p, i) => i).sort((x, y) => parts[y] - parts[x]);
        const hi = order[0];
        const lo = order[order.length - 1];
        const dParts = parts[hi] - parts[lo];
        prompt = `${intro} How ${much} more does ${who[hi]} get than ${who[lo]}?`;
        answer = { type: "number", value: val(dParts * unit), display: fmt(dParts * unit) };
        steps.push(`The difference is ${parts[hi]} − ${parts[lo]} = ${plural(dParts, "part")}: ${dParts} × ${fmt(unit)} = ${fmt(dParts * unit)}.`);
        if (dParts !== 1) traps.push({ spec: { type: "number", value: val(unit) }, feedback: `That's the value of ONE part. The difference is ${dParts} parts.` });
      }
      return {
        prompt,
        answer,
        solution: steps,
        hint: "Add the parts of the ratio, then find what one part is worth.",
        traps,
      };
    },
  },

  // 5 ─ Given one share or the difference -------------------------------------
  {
    id: "ratio-proportion.share-from-part",
    topicId: T,
    title: "Ratio problems given one share or the difference",
    level: 2,
    guideRef: "sharing-in-a-ratio",
    generate(rng, tier) {
      const mode = tier === 1 ? rng.pick(["other", "total"] as const) : tier === 2 ? rng.pick(["other", "total", "diffShare", "diffTotal"] as const) : rng.pick(["diffShare", "diffTotal", "three", "three"] as const);
      const traps: Trap[] = [];

      if (mode === "three") {
        const parts = coprimeTriple(rng, 9);
        const u = rng.int(2, 20);
        const who = people(rng, 3);
        const order = [0, 1, 2].sort((x, y) => parts[y] - parts[x]);
        const [hi, mid, lo] = order;
        const dParts = parts[hi] - parts[lo];
        const D = dParts * u;
        const askTotal = rng.bool();
        const ans = askTotal ? total(parts) * u : parts[mid] * u;
        const steps = [
          `${who[hi]} has ${parts[hi]} parts and ${who[lo]} has ${parts[lo]}, so the difference is ${plural(dParts, "part")}, worth ${dollars(D)}.`,
          `One part = ${dollars(D)} ÷ ${dParts} = ${dollars(u)}.`,
          askTotal ? `Total: ${parts.join(" + ")} = ${total(parts)} parts, and ${total(parts)} × ${dollars(u)} = ${dollars(ans)}.` : `${who[mid]}: ${parts[mid]} × ${dollars(u)} = ${dollars(ans)}.`,
        ];
        if (dParts !== 1) {
          const wrong = askTotal ? D * total(parts) : D * parts[mid];
          if (wrong !== ans) traps.push({ spec: { type: "number", value: wrong }, feedback: `The difference ${dollars(D)} is ${dParts} parts, not 1 part. Divide by ${dParts} first.` });
        }
        return {
          prompt: `${listAnd(who)} share some money in the ratio ${rat(parts)}. ${who[hi]} gets ${dollars(D)} more than ${who[lo]}. ${askTotal ? "How much money is shared altogether?" : `How much does ${who[mid]} get?`}`,
          answer: { type: "number", value: ans, display: dollars(ans) },
          solution: steps,
          hint: "Which parts of the ratio does the difference match? That tells you how many parts it is worth.",
          traps,
        };
      }

      const [a, b] = coprimePair(rng, tier === 1 ? 7 : tier === 2 ? 9 : 11);
      const u = rng.int(2, tier === 1 ? 12 : tier === 2 ? 15 : 25);
      const isMoney = rng.bool(0.4);
      const g = rng.pick(GROUPS);
      const [n1, n2] = people(rng, 2);
      const lab = isMoney ? [n1, n2] : [g.A, g.B];
      const parts = [a, b];
      const fmt = (x: number) => (isMoney ? dollars(x) : big(x));
      const intro = isMoney ? `${n1} and ${n2} share some money in the ratio ${a} : ${b}.` : `The ratio of ${g.A} to ${g.B} ${g.where} is ${a} : ${b}.`;

      if (mode === "other" || mode === "total") {
        const gi = rng.int(0, 1), oi = 1 - gi;
        const X = parts[gi] * u;
        const given = isMoney ? `${lab[gi]} gets ${dollars(X)}.` : `There are ${X} ${lab[gi]}.`;
        let ask: string, ans: number;
        if (mode === "other") {
          ans = parts[oi] * u;
          ask = isMoney ? `How much does ${lab[oi]} get?` : `How many ${lab[oi]} are there?`;
          const add = X + (parts[oi] - parts[gi]);
          if (add > 0 && add !== ans) traps.push({ spec: { type: "number", value: add }, feedback: `Ratios work by multiplying, not adding. Find one part first: ${X} ÷ ${parts[gi]}.` });
        } else {
          ans = (a + b) * u;
          ask = isMoney ? "How much money is shared altogether?" : `How many ${g.A} and ${g.B} are there altogether?`;
          traps.push({ spec: { type: "number", value: parts[oi] * u }, feedback: `That's just the ${isMoney ? `amount ${lab[oi]} gets` : `number of ${lab[oi]}`} — the question asks for the total.` });
        }
        return {
          prompt: `${intro} ${given} ${ask}`,
          answer: { type: "number", value: ans, display: fmt(ans) },
          solution: [
            `${cap(lab[gi])} ${isMoney ? "has" : "are"} ${plural(parts[gi], "part")}, worth ${fmt(X)}. So one part = ${fmt(X)} ÷ ${parts[gi]} = ${fmt(u)}.`,
            mode === "other" ? `${cap(lab[oi])}: ${parts[oi]} × ${fmt(u)} = ${fmt(ans)}.` : `Total: ${a} + ${b} = ${a + b} parts, and ${a + b} × ${fmt(u)} = ${fmt(ans)}.`,
          ],
          hint: "Use the amount you know to find the value of one part.",
          traps,
        };
      }

      // Difference given.
      const hi = a > b ? 0 : 1, lo = 1 - hi;
      const dParts = parts[hi] - parts[lo];
      const D = dParts * u;
      const given = isMoney ? `${lab[hi]} gets ${dollars(D)} more than ${lab[lo]}.` : `There are ${D} more ${lab[hi]} than ${lab[lo]}.`;
      let ask: string, ans: number, last: string;
      if (mode === "diffShare") {
        const k = rng.int(0, 1);
        ans = parts[k] * u;
        ask = isMoney ? `How much does ${lab[k]} get?` : `How many ${lab[k]} are there?`;
        last = `${cap(lab[k])}: ${parts[k]} × ${fmt(u)} = ${fmt(ans)}.`;
        if (dParts !== 1 && D * parts[k] !== ans) traps.push({ spec: { type: "number", value: D * parts[k] }, feedback: `The difference is ${dParts} parts, not 1 part. One part = ${fmt(D)} ÷ ${dParts}.` });
      } else {
        ans = (a + b) * u;
        ask = isMoney ? "How much money is shared altogether?" : `How many ${g.A} and ${g.B} are there altogether?`;
        last = `Total: ${a} + ${b} = ${a + b} parts, and ${a + b} × ${fmt(u)} = ${fmt(ans)}.`;
        if (dParts !== 1 && D * (a + b) !== ans) traps.push({ spec: { type: "number", value: D * (a + b) }, feedback: `The difference is ${dParts} parts, not 1 part. One part = ${fmt(D)} ÷ ${dParts}.` });
      }
      return {
        prompt: `${intro} ${given} ${ask}`,
        answer: { type: "number", value: ans, display: fmt(ans) },
        solution: [
          `The difference is ${parts[hi]} − ${parts[lo]} = ${plural(dParts, "part")}, worth ${fmt(D)}.`,
          `One part = ${fmt(D)} ÷ ${dParts} = ${fmt(u)}.`,
          last,
        ],
        hint: "How many parts is the difference worth? Use it to find one part.",
        traps,
      };
    },
  },

  // 6 ─ Ratios and fractions --------------------------------------------------
  {
    id: "ratio-proportion.ratio-fraction",
    topicId: T,
    title: "Convert between ratios and fractions",
    level: 2,
    guideRef: "ratios-and-fractions",
    generate(rng, tier) {
      const mode = tier === 1 ? rng.pick(["toFrac", "toRatio"] as const) : tier === 2 ? rng.pick(["toFrac", "toRatio", "ofOther"] as const) : rng.pick(["ofOther", "three", "three", "toRatio"] as const);
      const c = rng.pick(RF);
      const traps: Trap[] = [];

      if (mode === "toFrac") {
        const [a, b] = coprimePair(rng, tier === 1 ? 7 : 11);
        const first = rng.bool();
        const part = first ? a : b, other = first ? b : a;
        const S = a + b;
        const g = gcd(part, S);
        traps.push({ spec: { type: "fraction", n: part, d: other }, feedback: `That compares the ${first ? c.A : c.B} with the ${first ? c.B : c.A}. For a fraction of the whole, divide by the total number of parts (${a} + ${b} = ${S}).` });
        return {
          prompt: `The ratio of ${c.A} to ${c.B} ${c.where} is ${a} : ${b}. What fraction of the ${c.all} are ${first ? c.A : c.B}? Give your answer in its simplest form.`,
          answer: { type: "fraction", n: part / g, d: S / g, simplest: true },
          solution: [
            `Total number of parts: ${a} + ${b} = ${S}.`,
            `The ${first ? c.A : c.B} are ${part} of those ${S} parts, so the fraction is ${frac(part, S, { simplify: false })}${g > 1 ? ` = ${frac(part, S)}` : ""}.`,
          ],
          hint: "A fraction compares a part with the WHOLE. How many parts are there altogether?",
          traps,
        };
      }

      if (mode === "toRatio") {
        let p = 3, q = 8;
        for (let i = 0; i < 100; i++) {
          const Q = rng.int(3, tier === 1 ? 10 : 15);
          const P = rng.int(1, Q - 1);
          if (gcd(P, Q) !== 1 || 2 * P === Q) continue;
          p = P; q = Q;
          break;
        }
        const swap = tier > 1 && rng.bool();
        const ans = swap ? [q - p, p] : [p, q - p];
        const wrong = swap ? [q, p] : [p, q];
        const askLabel = swap ? `${c.B} : ${c.A}` : `${c.A} : ${c.B}`;
        if (!proportional(wrong, ans)) traps.push({ spec: { type: "ratio", parts: wrong }, feedback: `${q} is the WHOLE, not the ${c.B}. The ${c.B} make up ${q} − ${p} = ${q - p} parts.` });
        return {
          prompt: `${frac(p, q)} of the ${c.all} ${c.where} are ${c.A} and the rest are ${c.B}. Write the ratio ${askLabel} in its simplest form.`,
          answer: { type: "ratio", parts: ans, simplest: true },
          solution: [
            `Think of the ${c.all} as ${q} equal parts: ${p} parts are ${c.A}.`,
            `The rest, ${q} − ${p} = ${plural(q - p, "part")}, ${q - p === 1 ? "is" : "are"} ${c.B}.`,
            `So ${askLabel} = ${rat(ans)}.`,
          ],
          hint: "The denominator tells you the total number of parts. How many parts are left for the rest?",
          traps,
        };
      }

      if (mode === "ofOther") {
        let p = 3, q = 4;
        for (let i = 0; i < 100; i++) {
          const Q = rng.int(2, 9), P = rng.int(1, 2 * Q - 1);
          if (P === Q || gcd(P, Q) !== 1) continue;
          if (P > Q && tier === 2 && rng.bool(0.6)) continue;
          p = P; q = Q;
          break;
        }
        if (q > p && q - p > 0 && !proportional([p, q - p], [p, q])) traps.push({ spec: { type: "ratio", parts: [p, q - p] }, feedback: `${frac(p, q)} here compares the ${c.A} with the ${c.B}, not with the whole group — so the ${c.B} are the ${q}.` });
        return {
          prompt: `The number of ${c.A} ${c.where} is ${frac(p, q)} of the number of ${c.B}. Write the ratio ${c.A} : ${c.B} in its simplest form.`,
          answer: { type: "ratio", parts: [p, q], simplest: true },
          solution: [
            `If there are ${q} ${c.B}, the number of ${c.A} is ${frac(p, q)} × ${q} = ${p}.`,
            `So ${c.A} : ${c.B} = ${p} : ${q}.`,
          ],
          hint: `Try a number of ${c.B} that the fraction works nicely with — the denominator is a good choice.`,
          traps,
        };
      }

      // Three-part ratio → fraction.
      const ctx = rng.pick(RF3);
      const parts = coprimeTriple(rng, 9);
      const S = total(parts);
      const i = rng.int(0, 2);
      const not = rng.bool();
      const top = not ? S - parts[i] : parts[i];
      const g = gcd(top, S);
      const steps = [`Total number of parts: ${parts.join(" + ")} = ${S}.`];
      if (not) steps.push(`${cap(ctx.label[i])} is ${plural(parts[i], "part")}, so the rest is ${S} − ${parts[i]} = ${plural(top, "part")}.`);
      steps.push(`Fraction = ${frac(top, S, { simplify: false })}${g > 1 ? ` = ${frac(top, S)}` : ""}.`);
      const wrongTop = not ? S - parts[i] : parts[i];
      const wrongBottom = not ? parts[i] : S - parts[i];
      if (wrongTop * S !== top * wrongBottom) traps.push({ spec: { type: "fraction", n: wrongTop, d: wrongBottom }, feedback: `That compares one group with the others. For a fraction of the whole, divide by ALL the parts (${S}).` });
      return {
        prompt: `${ctx.intro(rat(parts))} ${ctx.ask(ctx.cats[i], not)} Give your answer in its simplest form.`,
        answer: { type: "fraction", n: top / g, d: S / g, simplest: true },
        solution: steps,
        hint: "Add all the parts to find the whole first.",
        traps,
      };
    },
  },

  // 7 ─ Unitary method --------------------------------------------------------
  {
    id: "ratio-proportion.unitary",
    topicId: T,
    title: "Use the unitary method",
    level: 1,
    guideRef: "direct-proportion",
    generate(rng, tier) {
      const useMoney = tier === 1 ? true : rng.bool(0.55);
      const traps: Trap[] = [];
      const [nm] = people(rng, 1);

      if (useMoney) {
        const it = rng.pick(SHOP);
        if (tier === 3) {
          // Scale through a group: the price of ONE is not a whole number of cents.
          let g = 3, i = 2, j = 5, gp = 200;
          for (let t = 0; t < 200; t++) {
            const G = rng.pick([2, 3, 4]);
            const I = rng.int(2, 4), J = rng.int(2, 6);
            const GP = 5 * rng.int(Math.ceil((it.lo * G) / 5), Math.floor((it.hi * G) / 5));
            if (I === J || GP % G === 0) continue;
            g = G; i = I; j = J; gp = GP;
            break;
          }
          const n1 = g * i, n2 = g * j;
          const ans = clean((j * gp) / 100);
          traps.push({ spec: { type: "number", value: clean(gp / 100) }, feedback: `That's the cost of ${g} ${it.many}. You need ${n2} of them.` });
          return {
            prompt: `${n1} ${it.many} cost ${money((i * gp) / 100)}. How much do ${n2} ${it.many} cost at the same price?`,
            answer: { type: "number", value: ans, display: money(ans) },
            solution: [
              `${n1} = ${i} × ${g}, so ${g} ${it.many} cost ${money((i * gp) / 100)} ÷ ${i} = ${money(gp / 100)}.`,
              `${n2} = ${j} × ${g}, so ${n2} ${it.many} cost ${j} × ${money(gp / 100)} = ${money(ans)}.`,
            ],
            hint: "The price of one doesn't divide nicely — find the cost of a small group that goes into both numbers.",
            traps,
          };
        }
        const step = tier === 1 ? 50 : 5;
        const c = step * rng.int(Math.max(1, Math.ceil(it.lo / step)), Math.floor(it.hi / step));
        let n1 = 3, n2 = 5;
        for (let t = 0; t < 100; t++) {
          n1 = rng.int(tier === 1 ? 2 : 3, tier === 1 ? 6 : 9);
          n2 = rng.int(2, tier === 1 ? 10 : 15);
          if (n1 !== n2) break;
        }
        if (n1 === n2) n2 = n1 + 1;
        const ans = clean((n2 * c) / 100);
        traps.push({ spec: { type: "number", value: clean(c / 100) }, feedback: `That's the cost of ONE ${it.one}. Now multiply by ${n2}.` });
        return {
          prompt: rng.bool() ? `${n1} ${it.many} cost ${money((n1 * c) / 100)}. How much do ${n2} ${it.many} cost?` : `${nm} pays ${money((n1 * c) / 100)} for ${n1} ${it.many}. How much would ${n2} ${it.many} cost at the same price?`,
          answer: { type: "number", value: ans, display: money(ans) },
          solution: [
            `Cost of 1 ${it.one}: ${money((n1 * c) / 100)} ÷ ${n1} = ${money(c / 100)}.`,
            `Cost of ${n2}: ${n2} × ${money(c / 100)} = ${money(ans)}.`,
          ],
          hint: "Find the cost of ONE first, then multiply.",
          traps,
        };
      }

      const rc = rng.pick(RATES);
      const fmt = (v: number) => (rc.isMoney ? dollars(v) : big(v));
      if (tier === 3) {
        // Rate per one unit is not whole: e.g. 7.5 pages a minute.
        const q = 2;
        let p = 15, i = 2, j = 5;
        for (let t = 0; t < 200; t++) {
          const P = rng.int(rc.lo * 2, rc.hi * 2);
          const I = rng.int(2, 6), J = rng.int(2, 9);
          if (P % 2 === 0 || I === J) continue;
          p = P; i = I; j = J;
          break;
        }
        const x1 = q * i, y1 = p * i, x2 = q * j, y2 = p * j;
        traps.push({ spec: { type: "number", value: clean(p / q) }, feedback: `That's the amount for 1 ${rc.xu.replace(/s$/, "")}. Multiply up to ${x2} ${rc.xu}.` });
        return {
          prompt: `${rc.lead(x1, y1, nm)} ${rc.askY(x2, nm)}`,
          answer: { type: "number", value: y2, display: fmt(y2) },
          solution: [
            `${x1} ${rc.xu} is ${i} lots of ${q} ${rc.xu}, so ${q} ${rc.xu} gives ${fmt(y1)} ÷ ${i} = ${fmt(p)}.`,
            `${x2} ${rc.xu} is ${j} lots of ${q} ${rc.xu}: ${j} × ${fmt(p)} = ${fmt(y2)}.`,
          ],
          hint: "Scale down to a small amount that divides into both numbers, then scale up.",
          traps,
        };
      }
      const r = rng.int(rc.lo, rc.hi);
      let x1 = 3, x2 = 5;
      for (let t = 0; t < 100; t++) {
        x1 = rng.int(2, 9);
        x2 = rng.int(2, 15);
        if (x1 !== x2) break;
      }
      if (x1 === x2) x2 = x1 + 1;
      const y1 = r * x1, y2 = r * x2;
      if (rng.bool(0.35)) {
        return {
          prompt: `${rc.lead(x1, y1, nm)} ${rc.askX(y2, nm)}`,
          answer: { type: "number", value: x2 },
          solution: [
            `In 1 ${rc.xu.replace(/s$/, "")}: ${fmt(y1)} ÷ ${x1} = ${fmt(r)}.`,
            `${fmt(y2)} ÷ ${fmt(r)} = ${x2} ${rc.xu}.`,
          ],
          hint: `Work out how much for 1 ${rc.xu.replace(/s$/, "")} first.`,
        };
      }
      traps.push({ spec: { type: "number", value: r }, feedback: `That's the amount for 1 ${rc.xu.replace(/s$/, "")}. Multiply by ${x2}.` });
      return {
        prompt: `${rc.lead(x1, y1, nm)} ${rc.askY(x2, nm)}`,
        answer: { type: "number", value: y2, display: fmt(y2) },
        solution: [
          `In 1 ${rc.xu.replace(/s$/, "")}: ${fmt(y1)} ÷ ${x1} = ${fmt(r)}.`,
          `In ${x2} ${rc.xu}: ${x2} × ${fmt(r)} = ${fmt(y2)}.`,
        ],
        hint: `Work out how much for 1 ${rc.xu.replace(/s$/, "")} first.`,
        traps,
      };
    },
  },

  // 8 ─ Best buys -------------------------------------------------------------
  {
    id: "ratio-proportion.best-buy",
    topicId: T,
    title: "Find the best buy",
    level: 2,
    guideRef: "direct-proportion",
    generate(rng, tier) {
      const k = tier === 1 ? 2 : tier === 2 ? rng.pick([2, 3]) : 3;
      let prod = PRODUCTS[0];
      let sizes = [500, 1000], us = [40, 36];
      for (let t = 0; t < 300; t++) {
        const P = rng.pick(tier === 1 ? PRODUCTS.filter((x) => x.kind !== "ml") : PRODUCTS);
        const pool = P.kind === "count" ? [3, 4, 5, 6, 8, 10, 12, 15, 20, 24] : tier === 3 ? [200, 250, 300, 400, 500, 600, 750, 800, 1000, 1200, 1500, 2000] : [200, 300, 400, 500, 600, 800, 1000, 1200, 1500, 2000];
        const S = rng.shuffle(pool).slice(0, k);
        const U = S.map(() => (tier === 3 && P.kind !== "count" ? 2 * rng.int(Math.ceil(P.lo / 2), Math.floor(P.hi / 2)) : rng.int(P.lo, P.hi)));
        const gap = tier === 1 ? 5 : 3;
        let ok = true;
        for (let x = 0; x < k; x++) for (let y = x + 1; y < k; y++) if (Math.abs(U[x] - U[y]) < gap) ok = false;
        if (!ok) continue;
        if (P.kind !== "count" && S.some((s, x) => !Number.isInteger((s * U[x]) / 100))) continue;
        prod = P; sizes = S; us = U;
        break;
      }
      const priceC = sizes.map((s, x) => (prod.kind === "count" ? s * us[x] : (s * us[x]) / 100));
      const best = us.indexOf(Math.min(...us));
      const cheapest = priceC.indexOf(Math.min(...priceC));
      const biggest = sizes.indexOf(Math.max(...sizes));
      const unit = prod.kind === "g" ? "g" : "ml";
      const showSize = (s: number) => {
        if (prod.kind === "count") return `${s} ${prod.many}`;
        if (tier >= 2 && s >= 1000) return prod.kind === "g" ? `${num(s / 1000)} kg` : s === 1000 ? "1 litre" : `${num(s / 1000)} litres`;
        return `${s} ${unit}`;
      };
      const per = prod.kind === "count" ? prod.one : `100 ${unit}`;
      const table = ["| Pack | Size | Price |", "|---|---|---|", ...sizes.map((s, x) => `| ${letter(x)} | ${showSize(s)} | ${money(priceC[x] / 100)} |`)].join("\n");
      const letters = k === 2 ? "A or B" : "A, B or C";
      const L = letter(best);
      const [nm] = people(rng, 1);
      const lower = prod.title.charAt(0).toLowerCase() + prod.title.slice(1);
      const prompt = rng.bool()
        ? `${prod.title} ${prod.are ? "are" : "is"} sold in ${k === 2 ? "two" : "three"} pack sizes:\n\n${table}\n\nWhich pack is the best buy? Type ${letters}.`
        : `${nm} is comparing packs of ${lower} at a supermarket:\n\n${table}\n\nWhich pack gives the most for your money? Type ${letters}.`;
      const lines = sizes.map((s, x) => {
        const p = money(priceC[x] / 100);
        if (prod.kind === "count") return `Pack ${letter(x)}: ${p} ÷ ${s} = ${money(us[x] / 100)} per ${prod.one}.`;
        const conv = tier >= 2 && s >= 1000 ? ` (${big(s)} ${unit})` : "";
        return `Pack ${letter(x)}${conv}: ${p} ÷ ${num(s / 100)} = ${money(us[x] / 100)} per 100 ${unit}.`;
      });
      const traps: Trap[] = [];
      if (cheapest !== best) traps.push({ spec: { type: "text", accept: [letter(cheapest), `pack ${letter(cheapest)}`] }, feedback: `Pack ${letter(cheapest)} costs the least in total, but you get less. Compare the cost per ${per}.` });
      if (biggest !== best && biggest !== cheapest) traps.push({ spec: { type: "text", accept: [letter(biggest), `pack ${letter(biggest)}`] }, feedback: `Bigger isn't always better value. Work out the cost per ${per} for every pack.` });
      return {
        prompt,
        answer: { type: "text", accept: [L, `pack ${L}`, `${L} is the best buy`, `${L} is best`, `${L} is better`, `${L} is better value`, `${L} is the best value`, `pack ${L} is the best buy`, `pack ${L} is best`, `pack ${L} is better value`], display: `Pack ${L}` },
        solution: [...lines, `The lowest cost per ${per} is ${money(us[best] / 100)}, so pack ${L} is the best buy.`],
        hint: `Work out the cost per ${per} for every pack, then compare.`,
        traps,
      };
    },
  },

  // 9 ─ Recipes ---------------------------------------------------------------
  {
    id: "ratio-proportion.recipe",
    topicId: T,
    title: "Scale a recipe up or down",
    level: 2,
    guideRef: "recipes-and-currency",
    generate(rng, tier) {
      const rec = rng.pick(RECIPES);
      const [nm] = people(rng, 1);
      const mode = tier === 1 ? "single" : tier === 2 ? rng.pick(["single", "single", "two"] as const) : rng.pick(["two", "reverse", "limit"] as const);
      const traps: Trap[] = [];
      const [i1, i2] = rng.shuffle([0, 1, 2]).map((x) => rec.items[x]);

      if (mode === "limit") {
        const r1 = rng.pick(i1.per), r2 = rng.pick(i2.per);
        const n1 = rng.int(2, 6);
        let p1 = 8, p2 = 12, e1 = 0, e2 = 0;
        for (let t = 0; t < 100; t++) {
          p1 = rng.int(5, 24);
          p2 = rng.int(5, 24);
          if (p1 !== p2) break;
        }
        if (p1 === p2) p2 = p1 + 3;
        e1 = 5 * rng.int(0, Math.floor((r1 - 1) / 5));
        e2 = 5 * rng.int(0, Math.floor((r2 - 1) / 5));
        const H1 = r1 * p1 + e1, H2 = r2 * p2 + e2;
        const ans = Math.min(p1, p2);
        traps.push({ spec: { type: "number", value: Math.max(p1, p2) }, feedback: "You'd run out of the other ingredient first. The SMALLER number of people is the limit." });
        const rem = (e: number, u: string) => (e ? ` remainder ${e} ${u}` : "");
        return {
          prompt: `A recipe for ${rec.dish} for ${n1} people uses ${big(r1 * n1)} ${i1.unit} of ${i1.name} and ${big(r2 * n1)} ${i2.unit} of ${i2.name}. ${nm} has ${big(H1)} ${i1.unit} of ${i1.name} and ${big(H2)} ${i2.unit} of ${i2.name}, and plenty of everything else. What is the greatest number of people ${nm} can make it for?`,
          answer: { type: "number", value: ans },
          solution: [
            `For 1 person: ${big(r1 * n1)} ÷ ${n1} = ${r1} ${i1.unit} of ${i1.name} and ${big(r2 * n1)} ÷ ${n1} = ${r2} ${i2.unit} of ${i2.name}.`,
            `${cap(i1.name)}: ${big(H1)} ÷ ${r1} = ${p1}${rem(e1, i1.unit)}, enough for ${p1} people.`,
            `${cap(i2.name)}: ${big(H2)} ÷ ${r2} = ${p2}${rem(e2, i2.unit)}, enough for ${p2} people.`,
            `You run out of ${p1 < p2 ? i1.name : i2.name} first, so the greatest number is ${ans}.`,
          ],
          hint: "Work out how many people each ingredient could feed on its own.",
          traps,
        };
      }

      if (mode === "reverse") {
        const r = rng.pick(i1.per);
        const n1 = rng.int(2, 6);
        const p = rng.int(5, 30);
        const e = 5 * rng.int(0, Math.floor((r - 1) / 5));
        const H = r * p + e;
        if (e > 0 && 2 * e >= r) traps.push({ spec: { type: "number", value: p + 1 }, feedback: `${p + 1} people would need ${p + 1} × ${r} = ${big((p + 1) * r)} ${i1.unit}. Round DOWN — you can't serve someone with not enough.` });
        return {
          prompt: `A recipe for ${rec.dish} for ${n1} people uses ${big(r * n1)} ${i1.unit} of ${i1.name}. ${nm} has ${big(H)} ${i1.unit} of ${i1.name}, and plenty of everything else. What is the greatest number of people ${nm} can make it for?`,
          answer: { type: "number", value: p },
          solution: [
            `For 1 person: ${big(r * n1)} ÷ ${n1} = ${r} ${i1.unit}.`,
            `${big(H)} ÷ ${r} = ${p}${e ? ` remainder ${e}` : ""}, so there is enough for ${p} people.`,
          ],
          hint: "Find the amount for one person, then see how many times it fits.",
          traps,
        };
      }

      // Scale for a new number of people.
      let n1 = 4, n2 = 6;
      if (tier === 1) {
        if (rng.bool(0.7)) {
          n1 = rng.int(2, 5);
          n2 = n1 * rng.int(2, 4);
        } else {
          n1 = rng.pick([4, 6, 8, 10]);
          n2 = n1 / 2;
        }
      } else {
        for (let t = 0; t < 100; t++) {
          n1 = rng.int(2, 8);
          n2 = rng.int(3, tier === 2 ? 12 : 15);
          if (n1 !== n2 && n2 % n1 !== 0) break;
        }
        if (n1 === n2) n2 = n1 + 1;
      }
      const r1 = rng.pick(i1.per);
      const q1 = r1 * n1, a1 = r1 * n2;
      if (mode === "two") {
        const r2 = rng.pick(i2.per);
        const q2 = r2 * n1, a2 = r2 * n2;
        return {
          prompt: `A recipe for ${rec.dish} for ${n1} people uses ${big(q1)} ${i1.unit} of ${i1.name} and ${big(q2)} ${i2.unit} of ${i2.name}. How much of each is needed for ${n2} people? Give the ${i1.name} (in ${i1.unit}) first, then the ${i2.name} (in ${i2.unit}).`,
          answer: { type: "list", values: [a1, a2], ordered: true, display: `${big(a1)} ${i1.unit} of ${i1.name} and ${big(a2)} ${i2.unit} of ${i2.name}` },
          solution: [
            `For 1 person: ${big(q1)} ÷ ${n1} = ${r1} ${i1.unit} of ${i1.name} and ${big(q2)} ÷ ${n1} = ${r2} ${i2.unit} of ${i2.name}.`,
            `For ${n2} people: ${n2} × ${r1} = ${big(a1)} ${i1.unit} and ${n2} × ${r2} = ${big(a2)} ${i2.unit}.`,
          ],
          hint: "Find the amounts for one person, then multiply.",
        };
      }
      traps.push({ spec: { type: "number", value: q1 * n2 }, feedback: `You multiplied by ${n2} but didn't divide by ${n1}. Find the amount for 1 person first.` });
      const add = q1 + (n2 - n1);
      if (add > 0 && add !== a1) traps.push({ spec: { type: "number", value: add }, feedback: "Recipes scale by MULTIPLYING, not by adding the extra people on." });
      const steps = n2 % n1 === 0
        ? [`${n2} people is ${n2 / n1} times as many as ${n1}.`, `${big(q1)} × ${n2 / n1} = ${big(a1)} ${i1.unit}.`]
        : n1 % n2 === 0
          ? [`${n2} people is ${frac(n2, n1)} of ${n1} people, so divide by ${n1 / n2}.`, `${big(q1)} ÷ ${n1 / n2} = ${big(a1)} ${i1.unit}.`]
          : [`For 1 person: ${big(q1)} ÷ ${n1} = ${r1} ${i1.unit}.`, `For ${n2} people: ${n2} × ${r1} = ${big(a1)} ${i1.unit}.`];
      return {
        prompt: `A recipe for ${rec.dish} for ${n1} people uses ${big(q1)} ${i1.unit} of ${i1.name}. How many ${UNIT_WORD[i1.unit]} of ${i1.name} are needed for ${n2} people?`,
        answer: { type: "number", value: a1, display: `${big(a1)} ${i1.unit}` },
        solution: steps,
        hint: "Find the amount for ONE person, then multiply by the new number of people.",
        traps,
      };
    },
  },

  // 10 ─ Currency conversion --------------------------------------------------
  {
    id: "ratio-proportion.currency",
    topicId: T,
    title: "Convert between currencies",
    level: 2,
    guideRef: "recipes-and-currency",
    generate(rng, tier) {
      const [nm] = people(rng, 1);
      const traps: Trap[] = [];
      const mode = tier === 1 ? rng.pick(["toForeign", "toSGD"] as const) : tier === 2 ? rng.pick(["toForeign", "toSGD", "toSGD"] as const) : rng.pick(["roundSGD", "backMul", "backDiv"] as const);
      // Baht (÷ 25) always divides exactly, so it is no good for a rounding question.
      const pool = mode === "backMul" || mode === "backDiv" ? CURRENCIES.filter((c) => c.back) : mode === "roundSGD" ? CURRENCIES.filter((c) => c.r !== 2500) : CURRENCIES;
      const cur = rng.pick(pool);
      const rate = `S$1 = ${cur.show(cur.r / 100)}`;

      if (mode === "toForeign") {
        const S = tier === 1 ? 10 * rng.int(1, 30) : rng.int(12, 400);
        const F = clean((S * cur.r) / 100);
        const wrong = roundHalfUp(S * 100 * 100, cur.r) / 100;
        if (Math.abs(wrong - F) > 1e-9) traps.push({ spec: { type: "number", value: clean(wrong) }, feedback: `Each S$1 is worth ${cur.show(cur.r / 100)}, so you get MORE of the foreign money — multiply, don't divide.` });
        return {
          prompt: rng.bool()
            ? `${nm} changes S$${S} into ${cur.name} for a holiday. The exchange rate is ${rate}. How many ${cur.name} does ${nm} get?`
            : `Convert S$${S} into ${cur.name}, using the exchange rate ${rate}. Give your answer in ${cur.name}.`,
          answer: { type: "number", value: F, display: cur.show(F) },
          solution: [`Each S$1 becomes ${cur.show(cur.r / 100)}.`, `${S} × ${num(cur.r / 100)} = ${cur.show(F)}.`],
          hint: "S$1 buys a fixed amount of the other currency. How many S$1s do you have?",
          traps,
        };
      }

      if (mode === "toSGD") {
        let S = 40, F = 30;
        for (let t = 0; t < 100; t++) {
          S = tier === 1 ? 10 * rng.int(1, 30) : rng.int(8, 300);
          F = clean((S * cur.r) / 100);
          if (cur.whole || dp(F) <= 2) break;
        }
        const wrong = clean((S * cur.r * cur.r) / 10000);
        traps.push({ spec: { type: "number", value: Math.round(wrong * 100) / 100 }, feedback: `You multiplied by the rate. To change ${cur.name} BACK into Singapore dollars, divide by ${num(cur.r / 100)}.` });
        return {
          prompt: `${rng.pick(SOUVENIRS).replace(/^./, (m) => m.toUpperCase())} costs ${cur.show(F)}. The exchange rate is ${rate}. How much is this in Singapore dollars?`,
          answer: { type: "number", value: S, display: money(S, "S$") },
          solution: [`Each S$1 is worth ${cur.show(cur.r / 100)}, so divide by ${num(cur.r / 100)}.`, `${cur.whole ? big(F) : F.toFixed(2)} ÷ ${num(cur.r / 100)} = S$${S}.`],
          hint: "Going back to S$, how many lots of the rate fit into the price?",
          traps,
        };
      }

      if (mode === "roundSGD") {
        let F100 = 5000, S100 = 0;
        for (let t = 0; t < 200; t++) {
          const F = cur.whole ? rng.int(2, 60) * (cur.r >= 10000 ? 500 : 50) : rng.int(15, 400);
          F100 = F * 100;
          if ((F100 * 100) % cur.r === 0) continue;
          break;
        }
        S100 = roundHalfUp(F100 * 100, cur.r);
        const F = F100 / 100;
        const S = clean(S100 / 100);
        const wrong = roundHalfUp(F100 * cur.r, 100) / 100;
        traps.push({ spec: { type: "number", value: clean(wrong) }, feedback: `You multiplied by the rate. To change ${cur.name} into Singapore dollars, divide by ${num(cur.r / 100)}.` });
        return {
          prompt: `${nm} sees a jacket priced at ${cur.show(F)} while on holiday. The exchange rate is ${rate}. How much is this in Singapore dollars? Give your answer to the nearest cent.`,
          answer: { type: "number", value: S, display: money(S, "S$") },
          solution: [
            `Divide by the rate: ${cur.whole ? big(F) : F.toFixed(2)} ÷ ${num(cur.r / 100)} = ${num(Math.floor((F100 * 1000) / cur.r) / 1000)}…`,
            `To the nearest cent: S$${S.toFixed(2)}.`,
          ],
          hint: "Divide by the exchange rate, then round to 2 decimal places.",
          traps,
        };
      }

      // Rate quoted the other way: 1 unit of foreign money = S$x.
      const back = cur.back ?? 133;
      const brate = `${cur.show(1)} = S$${(back / 100).toFixed(2)}`;
      if (mode === "backMul") {
        const F = rng.int(12, 400);
        const S = clean((F * back) / 100);
        const wrong = roundHalfUp(F * 100 * 100, back) / 100;
        traps.push({ spec: { type: "number", value: clean(wrong) }, feedback: `Here each ${cur.show(1)} is worth MORE than S$1, so multiply by ${num(back / 100)}.` });
        return {
          prompt: `The exchange rate is ${brate}. ${nm} has ${cur.show(F)} left after a trip. How much is this in Singapore dollars?`,
          answer: { type: "number", value: S, display: money(S, "S$") },
          solution: [`Each ${cur.show(1)} is worth S$${(back / 100).toFixed(2)}.`, `${F} × ${num(back / 100)} = S$${S.toFixed(2)}.`],
          hint: "The rate tells you what ONE unit of the foreign money is worth in S$.",
          traps,
        };
      }
      let S = 100, F100 = 0;
      for (let t = 0; t < 200; t++) {
        S = rng.int(20, 500);
        if ((S * 100 * 100) % back !== 0) break;
      }
      F100 = roundHalfUp(S * 100 * 100, back);
      const F = clean(F100 / 100);
      const wrongM = clean((S * back) / 100);
      traps.push({ spec: { type: "number", value: wrongM }, feedback: `You multiplied. Each ${cur.show(1)} costs S$${(back / 100).toFixed(2)}, so divide S$${S} by ${num(back / 100)}.` });
      return {
        prompt: `The exchange rate is ${brate}. ${nm} changes S$${S} into ${cur.name}. How many ${cur.name} does ${nm} get? Give your answer to the nearest cent.`,
        answer: { type: "number", value: F, display: cur.show(F) },
        solution: [
          `Each ${cur.show(1)} costs S$${(back / 100).toFixed(2)}, so divide: ${S} ÷ ${num(back / 100)} = ${num(Math.floor((S * 100000) / back) / 1000)}…`,
          `To the nearest cent: ${cur.show(F)}.`,
        ],
        hint: "How many lots of S$" + (back / 100).toFixed(2) + " fit into S$" + S + "?",
        traps,
      };
    },
  },

  // 11 ─ Maps and scale drawings ----------------------------------------------
  {
    id: "ratio-proportion.map-scale",
    topicId: T,
    title: "Use map scales and scale drawings",
    level: 2,
    guideRef: "scale-and-maps",
    generate(rng, tier) {
      const mode = tier === 1 ? rng.pick(["mapToReal", "plan"] as const) : tier === 2 ? rng.pick(["mapToReal", "realToMap", "plan"] as const) : rng.pick(["mapToReal", "realToMap", "plan", "toScale"] as const);
      const traps: Trap[] = [];

      if (mode === "toScale") {
        const v = rng.pick([
          { text: "1 cm represents 0.5 km", n: 50000, wrong: 500 },
          { text: "1 cm represents 2 km", n: 200000, wrong: 2000 },
          { text: "1 cm represents 2.5 km", n: 250000, wrong: 2500 },
          { text: "1 cm represents 4 km", n: 400000, wrong: 4000 },
          { text: "1 cm represents 5 km", n: 500000, wrong: 5000 },
          { text: "1 cm represents 10 km", n: 1000000, wrong: 10000 },
          { text: "1 cm represents 250 m", n: 25000, wrong: 250 },
          { text: "1 cm represents 400 m", n: 40000, wrong: 400 },
          { text: "2 cm represent 1 km", n: 50000, wrong: 500 },
          { text: "4 cm represent 1 km", n: 25000, wrong: 250 },
          { text: "5 cm represent 1 km", n: 20000, wrong: 200 },
        ]);
        const steps = /m$/.test(v.text) && v.text.startsWith("1 cm") && v.text.endsWith(" m")
          ? [`Write both in cm: ${v.text.replace("1 cm represents ", "")} = ${big(v.n)} cm.`, `So 1 cm represents ${big(v.n)} cm: the scale is 1 : ${big(v.n)}.`]
          : v.text.startsWith("1 cm")
            ? [`1 km = 1000 m = 100,000 cm.`, `${v.text.replace("1 cm represents ", "")} = ${big(v.n)} cm, so the scale is 1 : ${big(v.n)}.`]
            : [`1 km = 100,000 cm, so ${v.text.split(" ")[0]} cm represent 100,000 cm.`, `Divide both by ${v.text.split(" ")[0]}: 1 cm represents ${big(v.n)} cm, so the scale is 1 : ${big(v.n)}.`];
        traps.push({ spec: { type: "ratio", parts: [1, v.wrong] }, feedback: "Check your unit conversion: 1 m = 100 cm and 1 km = 100,000 cm." });
        return {
          prompt: `On a map, ${v.text}. Write the map scale in the form 1 : n.`,
          answer: { type: "ratio", parts: [1, v.n], simplest: true, display: `1 : ${big(v.n)}` },
          solution: steps,
          hint: "A scale 1 : n has the SAME units on both sides — change everything into centimetres.",
          traps,
        };
      }

      if (mode === "plan") {
        const ctxs = [
          { lead: (n: number) => `A floor plan of an HDB flat is drawn to a scale of 1 : ${n}.`, thing: "the living room", what: "long", lo: 30, hi: 80, scales: [50, 100] },
          { lead: (n: number) => `A model bus is built to a scale of 1 : ${n}.`, thing: "the bus", what: "long", lo: 100, hi: 125, scales: [20, 25, 50, 100] },
          { lead: (n: number) => `A scale drawing of a school field uses a scale of 1 : ${n}.`, thing: "the field", what: "long", lo: 600, hi: 1000, scales: [500, 1000, 2000] },
          { lead: (n: number) => `A model of a sailing boat is built to a scale of 1 : ${n}.`, thing: "the boat", what: "long", lo: 80, hi: 200, scales: [20, 25, 50, 100] },
        ];
        let c = ctxs[0], n = 100, t10 = 45, d = 4.5;
        for (let t = 0; t < 300; t++) {
          const C = rng.pick(tier === 1 ? ctxs.filter((x) => x.scales.includes(50) || x.scales.includes(100)) : ctxs);
          const N = rng.pick(tier === 1 ? C.scales.filter((s) => s === 50 || s === 100 || s === 1000) : C.scales);
          if (N === undefined) continue;
          const T10 = rng.int(C.lo, C.hi);
          if (!Number.isInteger((T10 * 100) / N)) continue;
          const D = clean((T10 * 10) / N);
          if (D < 2 || D > 40) continue;
          if (tier === 1 && !Number.isInteger(D)) continue;
          c = C; n = N; t10 = T10; d = D;
          break;
        }
        const realM = clean(t10 / 10);
        const forward = tier === 1 || rng.bool(0.6);
        const isModel = c.thing !== "the living room" && c.thing !== "the field";
        const onDrawing = isModel ? "on the model" : "on the drawing";
        if (forward) {
          const wrongCm = clean(d * n);
          if (Math.abs(wrongCm - realM) > 1e-9) traps.push({ spec: { type: "number", value: wrongCm }, feedback: "That's the real length in centimetres. Divide by 100 to get metres." });
          return {
            prompt: `${c.lead(n)} ${c.thing.charAt(0).toUpperCase() + c.thing.slice(1)} is ${num(d)} cm ${c.what} ${onDrawing}. How ${c.what} is the real ${c.thing.replace("the ", "")}? Give your answer in metres.`,
            answer: { type: "number", value: realM, display: `${num(realM)} m` },
            solution: [`Real length = ${num(d)} × ${big(n)} = ${big(clean(d * n))} cm.`, `${big(clean(d * n))} cm ÷ 100 = ${num(realM)} m.`],
            hint: `Every 1 cm ${onDrawing} is ${big(n)} cm in real life.`,
            traps,
          };
        }
        const wrongD = clean((realM * n) / 100);
        if (Math.abs(wrongD - d) > 1e-9 && dp(wrongD) <= 3) traps.push({ spec: { type: "number", value: wrongD }, feedback: `Divide by the scale, don't multiply: ${num(realM)} m = ${big(clean(realM * 100))} cm, then ÷ ${big(n)}.` });
        return {
          prompt: `${c.lead(n)} The real ${c.thing.replace("the ", "")} is ${num(realM)} m ${c.what}. How ${c.what} is it ${onDrawing}? Give your answer in cm.`,
          answer: { type: "number", value: d, display: `${num(d)} cm` },
          solution: [`Change to cm: ${num(realM)} m = ${big(clean(realM * 100))} cm.`, `Divide by the scale: ${big(clean(realM * 100))} ÷ ${big(n)} = ${num(d)} cm.`],
          hint: "Real lengths are the scale number times bigger — so divide, after changing to cm.",
          traps,
        };
      }

      // Maps: work in tenths of a centimetre so everything stays exact.
      let n = 50000, d10 = 60;
      for (let t = 0; t < 300; t++) {
        const N = rng.pick(tier === 1 ? [25000, 50000, 100000, 200000] : [10000, 20000, 25000, 50000, 100000, 200000, 250000, 500000]);
        const D10 = tier === 1 ? 10 * rng.int(2, 12) : tier === 2 ? 5 * rng.int(3, 30) : rng.int(12, 150);
        const cm = (D10 * N) / 10;
        if (cm / 100000 < 0.3) continue;
        if (dp(cm / 100000) > 3) continue;
        if (tier === 1 && cm / 100000 < 1) continue;
        n = N; d10 = D10;
        break;
      }
      const d = clean(d10 / 10);
      const cm = (d10 * n) / 10;
      const km = clean(cm / 100000);
      const inM = km < 1;
      const realStr = inM ? `${big(clean(cm / 100))} m` : `${num(km)} km`;
      const place = rng.pick(km <= 4 ? ["MRT stations", "bus stops", "lamp posts", "parks"] : km <= 30 ? ["towns", "villages", "hilltops", "lighthouses"] : ["cities", "towns", "lighthouses"]);
      if (mode === "mapToReal") {
        const ans = inM ? clean(cm / 100) : km;
        traps.push({ spec: { type: "number", value: cm }, feedback: `That's the distance in centimetres. Convert to ${inM ? "metres (÷ 100)" : "kilometres (÷ 100,000)"}.` });
        if (!inM && Math.abs(cm / 1000 - ans) > 1e-9) traps.push({ spec: { type: "number", value: clean(cm / 1000) }, feedback: "1 km = 100,000 cm (100 cm in a metre, 1000 m in a kilometre), so divide by 100,000." });
        return {
          prompt: `A map has a scale of 1 : ${big(n)}. Two ${place} are ${num(d)} cm apart on the map. What is the real distance between them? Give your answer in ${inM ? "metres" : "km"}.`,
          answer: { type: "number", value: ans, display: realStr },
          solution: [
            `1 cm on the map is ${big(n)} cm in real life.`,
            `Real distance = ${num(d)} × ${big(n)} = ${big(cm)} cm.`,
            inM ? `${big(cm)} cm ÷ 100 = ${big(ans)} m.` : `${big(cm)} cm ÷ 100 = ${big(clean(cm / 100))} m, and ÷ 1000 = ${num(km)} km.`,
          ],
          hint: "Multiply by the scale number to get centimetres, then convert.",
          traps,
        };
      }
      const wrongD = clean((cm / 100000) * 1000 / n);
      if (dp(wrongD) <= 4 && Math.abs(wrongD - d) > 1e-9) traps.push({ spec: { type: "number", value: wrongD }, feedback: "Check the conversion: 1 km = 100,000 cm and 1 m = 100 cm." });
      return {
        prompt: `Two ${place} are ${realStr} apart. How far apart are they on a map with a scale of 1 : ${big(n)}? Give your answer in cm.`,
        answer: { type: "number", value: d, display: `${num(d)} cm` },
        solution: [
          `Change to cm: ${realStr} = ${big(cm)} cm.`,
          `Divide by the scale: ${big(cm)} ÷ ${big(n)} = ${num(d)} cm.`,
        ],
        hint: "Change the real distance into cm first, then divide by the scale number.",
        traps,
      };
    },
  },

  // 12 ─ Similar shapes -------------------------------------------------------
  {
    id: "ratio-proportion.similar-shapes",
    topicId: T,
    title: "Use a scale factor with similar shapes",
    level: 2,
    guideRef: "scale-and-maps",
    generate(rng, tier) {
      const ks = tier === 1 ? [2, 3, 4, 5] : tier === 2 ? [1.5, 2, 2.5, 3, 4, 0.5] : [1.2, 1.25, 1.5, 1.75, 2.5, 3.5, 0.4, 0.6, 0.75];
      const mode = tier === 1 ? rng.pick(["up", "up", "down"] as const) : tier === 2 ? rng.pick(["up", "down"] as const) : rng.pick(["up", "down", "factor"] as const);
      let k = 2, w = 4, h = 6;
      for (let t = 0; t < 300; t++) {
        const K = rng.pick(ks);
        const Wd = rng.int(2, 16), Hd = rng.int(2, 16);
        if (Wd === Hd) continue;
        const BW = clean(K * Wd), BH = clean(K * Hd);
        if (dp(BW) > 1 || dp(BH) > 1) continue;
        if (BW === Hd || BH === Wd || BW === Wd) continue;
        if (Math.max(Wd, Hd, BW, BH) > 60) continue;
        k = K; w = Wd; h = Hd;
        break;
      }
      const W = clean(k * w), H = clean(k * h);
      const photoOk = tier !== 3 && k > 1 && Math.min(w, h) >= 5;
      const ctx = rng.pick(photoOk ? ["rect", "triangle", "photo"] as const : ["rect", "triangle"] as const);
      const traps: Trap[] = [];
      const cm = (v: number) => `${num(v)} cm`;

      if (mode === "factor") {
        const inv = clean(w / W);
        if (dp(inv) <= 3 && Math.abs(inv - k) > 1e-9) traps.push({ spec: { type: "number", value: inv }, feedback: "That's the scale factor from B back to A. Divide B's length by A's length." });
        return {
          prompt: ctx === "rect"
            ? `Rectangles A and B are similar. A is ${cm(w)} wide and B is ${cm(W)} wide. What is the scale factor from A to B?`
            : `Triangles P and Q are similar. A side of P is ${cm(w)} long and the matching side of Q is ${cm(W)} long. What is the scale factor from P to Q?`,
          answer: { type: "number", value: k },
          solution: [
            `Scale factor = new length ÷ original length = ${num(W)} ÷ ${num(w)}.`,
            `= ${num(k)}${k < 1 ? " (less than 1, so the shape gets smaller)" : ""}.`,
          ],
          hint: "Divide a length on the new shape by the matching length on the original shape.",
          traps,
        };
      }

      const up = mode === "up";
      const ans = up ? H : h;
      const add = up ? clean(h + (W - w)) : clean(H - (W - w));
      if (add > 0 && Math.abs(add - ans) > 1e-9) traps.push({ spec: { type: "number", value: add }, feedback: "Similar shapes MULTIPLY every length by the same scale factor — they don't add the same amount." });
      const steps = up
        ? [`Scale factor = ${num(W)} ÷ ${num(w)} = ${num(k)}.`, `Missing length = ${num(h)} × ${num(k)} = ${num(H)} cm.`]
        : [`Scale factor from A to B = ${num(W)} ÷ ${num(w)} = ${num(k)}.`, `Going back from B to A, divide: ${num(H)} ÷ ${num(k)} = ${num(h)} cm.`];
      const names: [string, string] = ctx === "triangle" ? ["P", "Q"] : ctx === "photo" ? ["the photo", "the poster"] : ["A", "B"];
      if (!up) {
        steps[0] = `Scale factor from ${names[0]} to ${names[1]} = ${num(W)} ÷ ${num(w)} = ${num(k)}.`;
        steps[1] = `Going back from ${names[1]} to ${names[0]}, divide: ${num(H)} ÷ ${num(k)} = ${num(h)} cm.`;
      }
      let prompt: string;
      let diagram: string | undefined;
      if (ctx === "rect") {
        prompt = up
          ? `Rectangles A and B are similar. A is ${cm(w)} wide and ${cm(h)} tall. B is ${cm(W)} wide. How tall is B? Give your answer in cm.`
          : `Rectangles A and B are similar. B is ${cm(W)} wide and ${cm(H)} tall. A is ${cm(w)} wide. How tall is A? Give your answer in cm.`;
        diagram = rectsSvg(w, h, W, H, [cm(w), up ? cm(h) : "?"], [cm(W), up ? "?" : cm(H)]);
      } else if (ctx === "triangle") {
        prompt = up
          ? `Triangles P and Q are similar. Two sides of P are ${cm(w)} and ${cm(h)}. In Q, the side matching ${cm(w)} is ${cm(W)}. How long is the side of Q matching ${cm(h)}?`
          : `Triangles P and Q are similar. Two sides of Q are ${cm(W)} and ${cm(H)}. In P, the side matching ${cm(W)} is ${cm(w)}. How long is the side of P matching ${cm(H)}?`;
      } else {
        prompt = up
          ? `A photo is ${cm(w)} wide and ${cm(h)} tall. It is enlarged to make a poster ${cm(W)} wide. How tall is the poster? Give your answer in cm.`
          : `A poster is ${cm(W)} wide and ${cm(H)} tall. It was made by enlarging a photo that is ${cm(w)} wide. How tall is the photo? Give your answer in cm.`;
      }
      return {
        prompt,
        answer: { type: "number", value: ans, display: cm(ans) },
        solution: steps,
        hint: "Find the scale factor from a pair of matching sides first.",
        traps,
        diagram,
      };
    },
  },

  // 13 ─ Inverse proportion (stretch) ----------------------------------------
  {
    id: "ratio-proportion.inverse",
    topicId: T,
    title: "Solve inverse proportion problems",
    level: 3,
    guideRef: "inverse-proportion",
    generate(rng, tier) {
      const ctxs = [
        { lead: (a: number, b: number) => `${a} workers take ${b} days to build a garden wall.`, askY: (a: number) => `How many days would ${a} workers take, working at the same rate?`, askX: (b: number) => `How many workers are needed to build it in ${b} days?`, more: (b: number) => `How many **more** workers are needed to build it in ${b} days?`, xs: [2, 16], ys: [2, 30], xw: "workers", yw: "days", speed: false, stays: "the total amount of work", pu: "worker-days" },
        { lead: (a: number, b: number) => `${a} identical pumps can empty a pond in ${b} hours.`, askY: (a: number) => `How many hours would ${a} pumps take?`, askX: (b: number) => `How many pumps are needed to empty it in ${b} hours?`, more: (b: number) => `How many **more** pumps are needed to empty it in ${b} hours?`, xs: [2, 12], ys: [2, 24], xw: "pumps", yw: "hours", speed: false, stays: "the total amount of pumping", pu: "pump-hours" },
        { lead: (a: number, b: number) => `A camp has enough rice to feed ${a} hikers for ${b} days.`, askY: (a: number) => `How many days would the same rice last ${a} hikers?`, askX: (b: number) => `How many hikers would it feed for exactly ${b} days?`, more: (b: number) => `How many **fewer** hikers would make the rice last ${b} days?`, xs: [4, 30], ys: [2, 20], xw: "hikers", yw: "days", speed: false, stays: "the total amount of rice", pu: "hiker-days" },
        { lead: (a: number, b: number) => `At an average speed of ${a} km/h, a bus journey takes ${b} minutes.`, askY: (a: number) => `How many minutes would the journey take at ${a} km/h?`, askX: (b: number) => `What average speed, in km/h, would make the journey take ${b} minutes?`, more: (b: number) => `By how many km/h must the speed increase for the journey to take ${b} minutes?`, xs: [20, 90], ys: [10, 90], xw: "km/h", yw: "minutes", speed: true, stays: "the distance", pu: "" },
      ];
      const c = rng.pick(ctxs);
      let x1 = 6, y1 = 10, x2 = 4, y2 = 15;
      for (let t = 0; t < 400; t++) {
        const X1 = c.speed ? 5 * rng.int(c.xs[0] / 5, c.xs[1] / 5) : rng.int(c.xs[0], tier === 1 ? Math.min(c.xs[1], 10) : c.xs[1]);
        const Y1 = rng.int(c.ys[0], c.ys[1]);
        const X2 = c.speed ? 5 * rng.int(c.xs[0] / 5, c.xs[1] / 5) : rng.int(c.xs[0], tier === 1 ? Math.min(c.xs[1], 10) : c.xs[1]);
        const P = X1 * Y1;
        if (X2 === X1 || P % X2 !== 0) continue;
        const Y2 = P / X2;
        if (Y2 < 2 || Y2 === Y1) continue;
        x1 = X1; y1 = Y1; x2 = X2; y2 = Y2;
        break;
      }
      const P = x1 * y1;
      const mode = tier === 1 ? "askY" : tier === 2 ? rng.pick(["askY", "askY", "askX"] as const) : rng.pick(["askY", "askX", "more"] as const);
      const traps: Trap[] = [];
      const keep = c.speed ? `Inverse proportion: speed × time stays the same, ${x1} × ${y1} = ${P}.` : `Inverse proportion: ${c.stays} stays the same, ${x1} × ${y1} = ${P} ${c.pu}.`;
      if (mode === "askY") {
        const direct = (y1 * x2) / x1;
        if (Number.isInteger(direct * 100) && Math.abs(direct - y2) > 1e-9) traps.push({ spec: { type: "number", value: clean(direct) }, feedback: `That's direct proportion. With ${c.speed ? (x2 > x1 ? "a faster speed" : "a slower speed") : `${x2 > x1 ? "more" : "fewer"} ${c.xw}`}, the time should go ${x2 > x1 ? "down" : "up"}. Multiply to find the total, then divide.` });
        return {
          prompt: `${c.lead(x1, y1)} ${c.askY(x2)}`,
          answer: { type: "number", value: y2 },
          solution: [keep, `${P} ÷ ${x2} = ${y2} ${c.yw}.`],
          hint: `Will ${c.speed ? (x2 > x1 ? "a faster speed" : "a slower speed") : `${x2 > x1 ? "more" : "fewer"} ${c.xw}`} take more time or less? Multiply the two numbers you know.`,
          traps,
        };
      }
      // Ask for the other quantity (or the change in it).
      const direct = (x1 * y2) / y1;
      const askMore = mode === "more";
      const reduce = c.xw === "hikers";
      let ans = x2;
      if (askMore) {
        // "more" questions need x2 > x1 (or x2 < x1 for the hikers context).
        if (reduce ? x2 > x1 : x2 < x1) {
          [x1, y1, x2, y2] = [x2, y2, x1, y1];
        }
        ans = Math.abs(x2 - x1);
      }
      if (!askMore && Number.isInteger(direct * 100) && Math.abs(direct - x2) > 1e-9) traps.push({ spec: { type: "number", value: clean(direct) }, feedback: c.speed ? `That's direct proportion. To take ${y2 < y1 ? "less" : "more"} time the bus must go ${y2 < y1 ? "faster" : "slower"}.` : `That's direct proportion. To take ${y2 < y1 ? "less" : "more"} time you need ${y2 < y1 ? "more" : "fewer"} ${c.xw}.` });
      if (askMore && x2 !== ans) traps.push({ spec: { type: "number", value: x2 }, feedback: c.speed ? `That's the new speed. The question asks how much faster than ${x1} km/h it is.` : `That's the total number of ${c.xw}. The question asks how many ${reduce ? "fewer" : "more"} than ${x1}.` });
      return {
        prompt: `${c.lead(x1, y1)} ${askMore ? c.more(y2) : c.askX(y2)}`,
        answer: { type: "number", value: ans },
        solution: askMore
          ? [c.speed ? `Inverse proportion: speed × time stays the same, ${x1} × ${y1} = ${P}.` : `Inverse proportion: ${c.stays} stays the same, ${x1} × ${y1} = ${P} ${c.pu}.`, `${P} ÷ ${y2} = ${x2} ${c.xw}.`, `${c.speed ? "Change" : reduce ? "Fewer" : "Extra"}: ${Math.max(x1, x2)} − ${Math.min(x1, x2)} = ${ans}.`]
          : [keep, `${P} ÷ ${y2} = ${x2} ${c.xw}.`],
        hint: "Multiply the two numbers you know — that product stays the same.",
        traps,
      };
    },
  },

  // 14 ─ Combining ratios (stretch) -------------------------------------------
  {
    id: "ratio-proportion.combine-ratios",
    topicId: T,
    title: "Combine two ratios into one",
    level: 3,
    guideRef: "ratio-basics",
    generate(rng, tier) {
      const max = tier === 1 ? 5 : tier === 2 ? 7 : 9;
      let p = 2, q = 3, r = 4, s = 5, ans = [8, 12, 15];
      for (let t = 0; t < 300; t++) {
        const [P, Q] = coprimePair(rng, max);
        const [R, S] = coprimePair(rng, max);
        if (Q === R) continue;
        const L = lcm(Q, R);
        const raw = [(P * L) / Q, L, (S * L) / R];
        const g = hcfAll(raw);
        const A = raw.map((x) => x / g);
        if (Math.max(...A) > 60) continue;
        p = P; q = Q; r = R; s = S; ans = A;
        break;
      }
      const L = lcm(q, r);
      const m1 = L / q, m2 = L / r;
      const raw = [p * m1, L, s * m2];
      const g = hcfAll(raw);
      const who = people(rng, 3);
      const ctx = rng.int(0, 2);
      const lab = ctx === 0 ? ["red", "blue", "green"] : ctx === 1 ? who : ["a", "b", "c"];
      const intro =
        ctx === 0 ? `In a bag of counters, red : blue = ${p} : ${q} and blue : green = ${r} : ${s}.`
        : ctx === 1 ? `The ratio of ${who[0]}'s savings to ${who[1]}'s savings is ${p} : ${q}. The ratio of ${who[1]}'s savings to ${who[2]}'s savings is ${r} : ${s}.`
        : `a : b = ${p} : ${q} and b : c = ${r} : ${s}.`;
      const askTotal = tier === 3 && ctx === 0 && rng.bool();
      const steps = [
        `The shared quantity is ${lab[1]}: it is ${plural(q, "part")} in the first ratio and ${plural(r, "part")} in the second. Make these equal using the LCM of ${q} and ${r}, which is ${L}.`,
        `${p} : ${q} = ${p * m1} : ${L}${m1 > 1 ? ` (× ${m1})` : " (unchanged)"} and ${r} : ${s} = ${L} : ${s * m2}${m2 > 1 ? ` (× ${m2})` : " (unchanged)"}.`,
        `So ${lab.join(" : ")} = ${rat(raw)}${g > 1 ? ` = ${rat(ans)}` : ""}.`,
      ];
      const traps: Trap[] = [];
      if (askTotal) {
        const m = rng.int(2, 6);
        const tot = total(ans) * m;
        const green = ans[2] * m;
        steps.push(`${total(ans)} parts = ${tot} counters, so 1 part = ${m} and green = ${ans[2]} × ${m} = ${green}.`);
        return {
          prompt: `${intro} There are ${tot} counters altogether. How many green counters are there?`,
          answer: { type: "number", value: green },
          solution: steps,
          hint: "Combine the two ratios into red : blue : green first, then share the total.",
          traps,
        };
      }
      const naive = [p, q, s];
      if (!proportional(naive, ans)) traps.push({ spec: { type: "ratio", parts: naive }, feedback: `The ${lab[1]} parts don't match yet (${q} and ${r}). Scale both ratios so ${lab[1]} is the same number, then combine.` });
      return {
        prompt: `${intro} Write ${lab.join(" : ")} as a single ratio in its simplest form.`,
        answer: { type: "ratio", parts: ans, simplest: true },
        solution: steps,
        hint: `The middle quantity (${lab[1]}) appears in both ratios — make its number the same in each.`,
        traps,
      };
    },
  },
];
