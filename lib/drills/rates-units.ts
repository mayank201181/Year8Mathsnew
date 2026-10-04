// Procedural skill drills — Measures, Units & Rates (Year 8).
// Every quantity is built from whole numbers first (tenths, hundredths,
// minutes, cents) so the answers are exact; bounded rejection loops keep the
// numbers friendly and the traps different from the real answer.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { big, clean, frac, gcd, money, num, roundTo } from "./helpers.ts";

const T = "rates-units";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** Number for display, with thousands separators from 10,000 up. */
function show(n: number): string {
  return Math.abs(n) >= 10000 ? big(n) : num(n);
}

/** Does x have at most dp decimal places? */
function hasDp(x: number, dp: number): boolean {
  const f = Math.pow(10, dp);
  return Math.abs(x * f - Math.round(x * f)) < 1e-6;
}

/** Try `make` until `ok` passes (bounded); otherwise use a known-good fallback. */
function find<X>(make: () => X, ok: (x: X) => boolean, fallback: X): X {
  for (let i = 0; i < 300; i++) {
    const x = make();
    if (ok(x)) return x;
  }
  return fallback;
}

/** A number answer shown with its unit. */
function numAns(value: number, unit: string, decimalOnly = false): AnswerSpec {
  const v = clean(value);
  const display = unit ? `${show(v)} ${unit}` : show(v);
  return decimalOnly ? { type: "number", value: v, allowFraction: false, display } : { type: "number", value: v, display };
}

function moneyAns(value: number): AnswerSpec {
  const v = clean(value);
  return { type: "number", value: v, display: money(v) };
}

/** Number traps, skipping any that are invalid, non-positive, repeated or equal to the answer. */
function numTraps(answer: number, cands: Array<[number, string]>): Trap[] {
  const out: Trap[] = [];
  const seen: number[] = [];
  for (const [raw, feedback] of cands) {
    if (!Number.isFinite(raw) || raw <= 0) continue;
    const w = hasDp(raw, 6) ? clean(raw) : roundTo(raw, 2);
    if (w <= 0 || /e/i.test(String(w))) continue;
    if (Math.abs(w - answer) <= 1e-9 * Math.max(1, Math.abs(answer))) continue;
    if (seen.some((s) => Math.abs(s - w) < 1e-12)) continue;
    seen.push(w);
    out.push({ spec: { type: "number", value: w }, feedback });
  }
  return out;
}

/** Minutes as a number of hours: a decimal when it terminates, else a fraction. */
function hoursStr(mins: number): string {
  return hasDp(mins / 60, 2) ? num(clean(mins / 60)) : frac(mins, 60, { mixed: true });
}

const pad2 = (n: number): string => String(n).padStart(2, "0");
const wrapDay = (t: number): number => ((t % 1440) + 1440) % 1440;

/** Minutes after midnight → 24-hour clock "07:05". */
function clock(t: number): string {
  const m = wrapDay(t);
  return `${pad2(Math.floor(m / 60))}:${pad2(m % 60)}`;
}

/** Minutes after midnight → 12-hour clock "7:05 pm". */
function clock12(t: number): string {
  const m = wrapDay(t);
  const h = Math.floor(m / 60);
  return `${h % 12 || 12}:${pad2(m % 60)} ${h < 12 ? "am" : "pm"}`;
}

/** "2 h 35 min" */
function hm(mins: number): string {
  const h = Math.floor(mins / 60), m = mins % 60;
  if (!h) return `${m} min`;
  return m ? `${h} h ${m} min` : `${h} h`;
}

/** "2 hours 35 minutes" */
function hmWords(mins: number): string {
  const h = Math.floor(mins / 60), m = mins % 60;
  const hs = h ? `${h} hour${h === 1 ? "" : "s"}` : "";
  const ms = m ? `${m} minute${m === 1 ? "" : "s"}` : "";
  return [hs, ms].filter(Boolean).join(" ");
}

/** Count-on explanation from s to e (minutes; e may pass midnight). */
function countOn(s: number, e: number): string {
  const h1 = Math.ceil(s / 60) * 60;
  const h2 = Math.floor(e / 60) * 60;
  if (h1 > h2) return `Count on: ${clock(s)} → ${clock(e)} is ${e - s} min.`;
  const parts: string[] = [];
  if (h1 > s) parts.push(`${clock(s)} → ${clock(h1)} is ${h1 - s} min`);
  if (h2 > h1) parts.push(`${clock(h1)} → ${clock(h2)} is ${(h2 - h1) / 60} h`);
  if (e > h2) parts.push(`${clock(h2)} → ${clock(e)} is ${e - h2} min`);
  return `Count on: ${parts.join(", ")}.`;
}

/** Every reasonable way of typing a clock time. */
function timeAccept(t: number): string[] {
  const m = wrapDay(t);
  const h = Math.floor(m / 60), mm = m % 60;
  const H = pad2(h), M = pad2(mm);
  const h12 = h % 12 || 12;
  const ap = h < 12 ? "am" : "pm";
  const out = [`${H}:${M}`, `${H}${M}`, `${H}.${M}`, `${H}:${M}h`, `${H}${M}h`, `${H}${M}hrs`, `${H}:${M}hrs`, `${H}${M}hours`];
  if (h < 10) out.push(`${h}:${M}`, `${h}.${M}`);
  out.push(`${h12}:${M}${ap}`, `${h12}.${M}${ap}`, `${h12}:${M}${ap[0]}.m`, `${h12}.${M}${ap[0]}.m`);
  return Array.from(new Set(out));
}

/** An "hours and minutes" answer typed like "2 h 35 min". */
function hmAns(mins: number): AnswerSpec {
  return { type: "list", values: [Math.floor(mins / 60), mins % 60], ordered: true, display: hm(mins) };
}

// ---------------------------------------------------------------------------
// 1. Metric conversions
// ---------------------------------------------------------------------------

interface MetricPair {
  big: string;
  one: string;
  bigWord: string;
  small: string;
  smallWord: string;
  f: number;
  tier: number;
}

const METRIC: MetricPair[] = [
  { big: "km", one: "1 km", bigWord: "kilometres", small: "m", smallWord: "metres", f: 1000, tier: 1 },
  { big: "m", one: "1 m", bigWord: "metres", small: "cm", smallWord: "centimetres", f: 100, tier: 1 },
  { big: "cm", one: "1 cm", bigWord: "centimetres", small: "mm", smallWord: "millimetres", f: 10, tier: 1 },
  { big: "kg", one: "1 kg", bigWord: "kilograms", small: "g", smallWord: "grams", f: 1000, tier: 1 },
  { big: "litres", one: "1 litre", bigWord: "litres", small: "ml", smallWord: "millilitres", f: 1000, tier: 1 },
  { big: "m", one: "1 m", bigWord: "metres", small: "mm", smallWord: "millimetres", f: 1000, tier: 2 },
  { big: "g", one: "1 g", bigWord: "grams", small: "mg", smallWord: "milligrams", f: 1000, tier: 2 },
  { big: "tonnes", one: "1 tonne", bigWord: "tonnes", small: "kg", smallWord: "kilograms", f: 1000, tier: 2 },
];

function metricBasic(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const p = rng.pick(METRIC.filter((m) => m.tier <= Math.min(tier, 2)));
  const f = p.f;
  if (rng.bool()) {
    // Bigger unit → smaller unit: multiply.
    const v = find(
      () => {
        if (tier === 1) return rng.bool() ? rng.int(2, 15) : rng.int(1, 9) + 0.5;
        const dp = f === 10 ? 1 : f === 100 ? rng.pick([1, 2]) : rng.pick([1, 2, 2, 3]);
        const k = rng.int(1, 20 * Math.pow(10, dp));
        return k % 10 === 0 ? 1 : clean(k / Math.pow(10, dp));
      },
      (x) => x !== 1 && hasDp(x * f, 0),
      3.5,
    );
    const ans = clean(v * f);
    const q = `${num(v)} ${p.big}`;
    return {
      prompt: rng.pick([`Convert ${q} to ${p.smallWord}.`, `How many ${p.smallWord} are there in ${q}?`, `Write ${q} in ${p.smallWord}.`]),
      answer: numAns(ans, p.small),
      solution: [
        `${p.one} = ${show(f)} ${p.small}. A smaller unit means more of them, so multiply by ${show(f)}.`,
        `${num(v)} × ${show(f)} = ${show(ans)} ${p.small}`,
      ],
      hint: `How many ${p.smallWord} make ${p.one}? Changing to a smaller unit makes the number bigger.`,
      traps: numTraps(ans, [
        [v / f, "You divided. Changing to a smaller unit gives a bigger number, so multiply."],
        [f === 1000 ? v * 100 : NaN, `Check the conversion factor: ${p.one} = 1000 ${p.small}, not 100.`],
      ]),
    };
  }
  // Smaller unit → bigger unit: divide.
  const s = find(
    () => {
      if (tier === 1) return clean((rng.bool() ? rng.int(2, 15) : rng.int(1, 9) + 0.5) * f);
      return rng.int(2, 99) * rng.pick([1, 10, 100].filter((x) => x <= f / 10));
    },
    (x) => Number.isInteger(x) && x !== f && (tier === 1 || x % f !== 0),
    2500,
  );
  const a = clean(s / f);
  const q = `${show(s)} ${p.small}`;
  return {
    prompt: rng.pick([`Convert ${q} to ${p.bigWord}.`, `Write ${q} in ${p.bigWord}.`, `How many ${p.bigWord} is ${q}?`]),
    answer: numAns(a, p.big),
    solution: [
      `${p.one} = ${show(f)} ${p.small}. A bigger unit means fewer of them, so divide by ${show(f)}.`,
      `${show(s)} ÷ ${show(f)} = ${num(a)} ${p.big}`,
    ],
    hint: `How many ${p.smallWord} make ${p.one}? Changing to a bigger unit makes the number smaller.`,
    traps: numTraps(a, [
      [s * f, "You multiplied. Changing to a bigger unit gives a smaller number, so divide."],
      [f === 1000 ? s / 100 : NaN, `Check the conversion factor: ${p.one} = 1000 ${p.small}, not 100.`],
    ]),
  };
}

function metricMassSum(rng: Rng): DrillItem {
  const nm = rng.pick(NAMES);
  const [x, y] = rng.pick([["flour", "sugar"], ["rice", "lentils"], ["potatoes", "carrots"], ["pasta", "cheese"], ["oats", "raisins"]] as const);
  const a10 = find(() => rng.int(11, 49), (v) => v % 10 !== 0, 12);
  const b = rng.int(3, 19) * 50;
  const aG = a10 * 100;
  const total = aG + b;
  const inKg = rng.bool();
  const ans = inKg ? clean(total / 1000) : total;
  return {
    prompt: `${nm} buys ${num(a10 / 10)} kg of ${x} and ${b} g of ${y}. What is the total mass in ${inKg ? "kilograms" : "grams"}?`,
    answer: numAns(ans, inKg ? "kg" : "g"),
    solution: [
      `Put both masses in the same unit: ${num(a10 / 10)} kg = ${aG} g.`,
      `${aG} + ${b} = ${total} g${inKg ? `, and ${total} ÷ 1000 = ${num(ans)} kg` : ""}.`,
    ],
    hint: "You can only add masses when they are in the same unit.",
    traps: numTraps(ans, [[a10 / 10 + b, "You added kilograms to grams. Change them to the same unit first."]]),
  };
}

function metricRibbon(rng: Rng): DrillItem {
  const nm = rng.pick(NAMES);
  const o = find(
    () => ({ L10: rng.int(12, 50), n: rng.int(1, 3), p: rng.int(5, 40) * 5 }),
    (z) => z.L10 % 10 !== 0 && z.L10 * 10 - z.n * z.p >= 10,
    { L10: 25, n: 2, p: 65 },
  );
  const lenCm = o.L10 * 10;
  const left = lenCm - o.n * o.p;
  const inM = rng.bool(0.35);
  const ans = inM ? clean(left / 100) : left;
  const what = rng.pick(["ribbon", "string", "wire", "rope"]);
  const cut = o.n === 1 ? `one piece ${o.p} cm long` : `${o.n} pieces, each ${o.p} cm long`;
  const steps = [`${num(o.L10 / 10)} m = ${lenCm} cm.`];
  if (o.n > 1) steps.push(`Cut off: ${o.n} × ${o.p} = ${o.n * o.p} cm.`);
  steps.push(`${lenCm} − ${o.n * o.p} = ${left} cm${inM ? ` = ${num(ans)} m` : ""}.`);
  return {
    prompt: `${nm} has ${num(o.L10 / 10)} m of ${what} and cuts off ${cut}. How much ${what} is left? Give your answer in ${inM ? "metres" : "centimetres"}.`,
    answer: numAns(ans, inM ? "m" : "cm"),
    solution: steps,
    hint: "Change the metres to centimetres before you subtract.",
    traps: numTraps(ans, [[o.n > 1 ? (inM ? (lenCm - o.p) / 100 : lenCm - o.p) : NaN, `There are ${o.n} pieces to cut off, not just one.`]]),
  };
}

function metricJuice(rng: Rng): DrillItem {
  const nm = rng.pick(NAMES);
  const o = find(
    () => ({ J10: rng.int(12, 30), n: rng.int(2, 5), g: rng.pick([150, 180, 200, 250, 300]) }),
    (z) => z.J10 % 10 !== 0 && z.J10 * 100 - z.n * z.g >= 100,
    { J10: 15, n: 3, g: 250 },
  );
  const drink = rng.pick(["mango juice", "soy milk", "lemonade", "barley water", "chrysanthemum tea"]);
  const jugMl = o.J10 * 100;
  const left = jugMl - o.n * o.g;
  const inL = rng.bool(0.35);
  const ans = inL ? clean(left / 1000) : left;
  return {
    prompt: `A jug holds ${num(o.J10 / 10)} litres of ${drink}. ${nm} pours out ${o.n} glasses of ${o.g} ml each. How much ${drink} is left in the jug? Give your answer in ${inL ? "litres" : "millilitres"}.`,
    answer: numAns(ans, inL ? "litres" : "ml"),
    solution: [
      `${num(o.J10 / 10)} litres = ${jugMl} ml.`,
      `Poured out: ${o.n} × ${o.g} = ${o.n * o.g} ml.`,
      `${jugMl} − ${o.n * o.g} = ${left} ml${inL ? ` = ${num(ans)} litres` : ""}.`,
    ],
    hint: "Work in millilitres: 1 litre = 1000 ml.",
    traps: numTraps(ans, [[inL ? (jugMl - o.g) / 1000 : jugMl - o.g, `${nm} pours ${o.n} glasses, not one.`]]),
  };
}

function metricTwoStep(rng: Rng): DrillItem {
  const k = find(() => rng.int(5, 450), (x) => x % 10 !== 0, 45);
  const v = clean(k / 100);
  const m = k * 10;
  const cm = k * 1000;
  return {
    prompt: rng.pick([`Convert ${num(v)} km to centimetres.`, `A running track loop is ${num(v)} km long. How many centimetres is that?`]),
    answer: numAns(cm, "cm"),
    solution: [`km → m: ${num(v)} × 1000 = ${show(m)} m.`, `m → cm: ${show(m)} × 100 = ${show(cm)} cm.`, `(In one go: 1 km = 100,000 cm.)`],
    hint: "Go one step at a time: kilometres to metres, then metres to centimetres.",
    traps: numTraps(cm, [
      [m, "That is the answer in metres. Now change metres to centimetres (× 100)."],
      [v * 100, "1 km = 1000 m and 1 m = 100 cm, so 1 km = 100,000 cm."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 2. Area units
// ---------------------------------------------------------------------------

const AREA = [
  { big: "m²", small: "cm²", len: "m", slen: "cm", lin: 100, f: 10000 },
  { big: "cm²", small: "mm²", len: "cm", slen: "mm", lin: 10, f: 100 },
  { big: "km²", small: "m²", len: "km", slen: "m", lin: 1000, f: 1000000 },
] as const;

function areaBasic(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const p = tier === 3 ? rng.pick(AREA) : rng.pick(AREA.slice(0, 2));
  // Value in the bigger unit, as k hundredths.
  const k = find(
    () => (tier === 1 ? (rng.bool() ? rng.int(2, 12) * 100 : rng.int(1, 9) * 100 + 50) : rng.int(5, 999)),
    (x) => x !== 100 && (tier === 1 || x % 100 !== 0),
    350,
  );
  const v = clean(k / 100);
  const sVal = clean((k * p.f) / 100);
  const facts = `1 ${p.len} = ${p.lin} ${p.slen}, so 1 ${p.big} = ${p.lin} × ${p.lin} = ${show(p.f)} ${p.small}.`;
  const linFb = `That uses the length factor. A square 1 ${p.len} by 1 ${p.len} is ${p.lin} ${p.slen} by ${p.lin} ${p.slen}, so 1 ${p.big} = ${show(p.f)} ${p.small}.`;
  if (rng.bool()) {
    return {
      prompt: rng.pick([`Convert ${num(v)} ${p.big} to ${p.small}.`, `How many ${p.small} are there in ${num(v)} ${p.big}?`]),
      answer: numAns(sVal, p.small),
      solution: [facts, `${num(v)} × ${show(p.f)} = ${show(sVal)} ${p.small}`],
      hint: `Picture a square 1 ${p.len} by 1 ${p.len}. How many ${p.slen} long is each side?`,
      traps: numTraps(sVal, [
        [v * p.lin, linFb],
        [v / p.f, "You divided. Changing to a smaller unit gives a bigger number."],
      ]),
    };
  }
  return {
    prompt: rng.pick([`Convert ${show(sVal)} ${p.small} to ${p.big}.`, `Write ${show(sVal)} ${p.small} in ${p.big}.`]),
    answer: numAns(v, p.big),
    solution: [facts, `${show(sVal)} ÷ ${show(p.f)} = ${num(v)} ${p.big}`],
    hint: `Picture a square 1 ${p.len} by 1 ${p.len}. How many ${p.small} fit inside it?`,
    traps: numTraps(v, [
      [sVal / p.lin, linFb],
      [sVal * p.f, "You multiplied. Changing to a bigger unit gives a smaller number."],
    ]),
  };
}

function areaRectCm(rng: Rng): DrillItem {
  const o = find(() => ({ w: rng.int(3, 20) * 10, h: rng.int(3, 25) * 10 }), (z) => z.w !== z.h, { w: 80, h: 120 });
  const cm2 = o.w * o.h;
  const m2 = clean(cm2 / 10000);
  const item = rng.pick(["poster", "noticeboard", "rug", "window", "tablecloth"]);
  return {
    prompt: `A rectangular ${item} measures ${o.w} cm by ${o.h} cm. What is its area in m²?`,
    answer: numAns(m2, "m²"),
    solution: [
      `Change to metres first: ${o.w} cm = ${num(o.w / 100)} m and ${o.h} cm = ${num(o.h / 100)} m.`,
      `Area = ${num(o.w / 100)} × ${num(o.h / 100)} = ${num(m2)} m².`,
      `Check: ${o.w} × ${o.h} = ${show(cm2)} cm², and ${show(cm2)} ÷ 10,000 = ${num(m2)} m².`,
    ],
    hint: "Either change the lengths to metres first, or remember 1 m² = 10,000 cm².",
    traps: numTraps(m2, [
      [cm2 / 100, "You divided by 100. 1 m² = 100 × 100 = 10,000 cm², so divide by 10,000."],
      [cm2, "That is the area in cm². Now change it to m²."],
    ]),
  };
}

function areaRectM(rng: Rng): DrillItem {
  const o = find(() => ({ a: rng.int(5, 30), b: rng.int(4, 25) }), (z) => z.a !== z.b && (z.a % 10 !== 0 || z.b % 10 !== 0), { a: 12, b: 8 });
  const wCm = o.a * 10, hCm = o.b * 10;
  const cm2 = wCm * hCm;
  const m2 = clean((o.a * o.b) / 100);
  const item = rng.pick(["table top", "whiteboard", "garden bed", "mirror"]);
  return {
    prompt: `A rectangular ${item} is ${num(o.a / 10)} m long and ${num(o.b / 10)} m wide. What is its area in cm²?`,
    answer: numAns(cm2, "cm²"),
    solution: [
      `Change to centimetres first: ${num(o.a / 10)} m = ${wCm} cm and ${num(o.b / 10)} m = ${hCm} cm.`,
      `Area = ${wCm} × ${hCm} = ${show(cm2)} cm².`,
      `Check: ${num(m2)} m² × 10,000 = ${show(cm2)} cm².`,
    ],
    hint: "Change both lengths to centimetres before multiplying.",
    traps: numTraps(cm2, [
      [m2 * 100, "You multiplied the area in m² by 100. 1 m² = 10,000 cm²."],
      [m2, "That is the area in m². Now change it to cm²."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 3. Volume and capacity
// ---------------------------------------------------------------------------

function volCm3ToL(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const s = find(
    () => (tier === 1 ? rng.int(3, 40) * 250 : rng.int(120, 9990)),
    (x) => x % 1000 !== 0 || (tier === 1 && x !== 1000),
    2500,
  );
  const ans = clean(s / 1000);
  return {
    prompt: rng.pick([`Convert ${show(s)} cm³ to litres.`, `A container holds ${show(s)} cm³ of water. How many litres is that?`]),
    answer: numAns(ans, "litres"),
    solution: ["1 cm³ = 1 ml, and 1000 cm³ = 1 litre.", `${show(s)} ÷ 1000 = ${num(ans)} litres`],
    hint: "How many cm³ make one litre?",
    traps: numTraps(ans, [
      [s / 100, "1 litre = 1000 cm³, not 100 cm³."],
      [s * 1000, "You multiplied. A litre is much bigger than a cm³, so the number should get smaller."],
    ]),
  };
}

function volLToCm3(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const k = find(
    () => (tier === 1 ? (rng.bool() ? rng.int(2, 12) * 100 : rng.int(1, 9) * 100 + 50) : rng.int(5, 999)),
    (x) => x !== 100 && (tier === 1 || x % 100 !== 0),
    150,
  );
  const v = clean(k / 100);
  const ans = k * 10;
  return {
    prompt: rng.pick([`Convert ${num(v)} litres to cm³.`, `How many cm³ of water fill a ${num(v)}-litre bottle?`]),
    answer: numAns(ans, "cm³"),
    solution: ["1 litre = 1000 cm³ (a cube 10 cm by 10 cm by 10 cm).", `${num(v)} × 1000 = ${show(ans)} cm³`],
    hint: "Think of a 10 cm cube: it holds exactly 1 litre.",
    traps: numTraps(ans, [
      [v * 100, "1 litre = 1000 cm³, not 100 cm³."],
      [v / 1000, "You divided. A cm³ is tiny, so there are lots of them in a litre."],
    ]),
  };
}

function volM3ToL(rng: Rng): DrillItem {
  const k = find(() => rng.int(5, 999), (x) => x % 100 !== 0, 250);
  const v = clean(k / 100);
  const ans = k * 10;
  return {
    prompt: rng.pick([`Convert ${num(v)} m³ to litres.`, `A water tank holds ${num(v)} m³. How many litres is that?`]),
    answer: numAns(ans, "litres"),
    solution: [
      "1 m = 100 cm, so 1 m³ = 100 × 100 × 100 = 1,000,000 cm³ = 1000 litres.",
      `${num(v)} × 1000 = ${show(ans)} litres`,
    ],
    hint: "How many 10 cm cubes (litres) fit along each edge of a 1 m cube?",
    traps: numTraps(ans, [
      [v * 1000000, "That is the volume in cm³. Divide by 1000 to get litres."],
      [v * 100, "1 m³ = 1000 litres, not 100."],
    ]),
  };
}

function volLToM3(rng: Rng): DrillItem {
  const L = find(() => rng.int(2, 199) * 50, (x) => x % 1000 !== 0, 750);
  const ans = clean(L / 1000);
  return {
    prompt: rng.pick([`Convert ${show(L)} litres to m³.`, `A pond holds ${show(L)} litres of water. What is this volume in m³?`]),
    answer: numAns(ans, "m³"),
    solution: ["1 m³ = 1000 litres.", `${show(L)} ÷ 1000 = ${num(ans)} m³`],
    hint: "How many litres fill a cube 1 m by 1 m by 1 m?",
    traps: numTraps(ans, [
      [L / 100, "1 m³ = 1000 litres, not 100."],
      [L * 1000, "You multiplied. A cubic metre is much bigger than a litre."],
    ]),
  };
}

function volCuboid(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const o = find(
    () =>
      tier === 1
        ? { a: rng.int(1, 5) * 10, b: rng.int(1, 4) * 10, c: rng.int(1, 4) * 10 }
        : { a: rng.int(2, 12) * 5, b: rng.int(2, 10) * 5, c: rng.int(2, 10) * 5 },
    (z) => {
      const V = z.a * z.b * z.c;
      return tier === 1 ? V % 1000 === 0 && V >= 2000 : V % 10 === 0 && V % 1000 !== 0 && V >= 1500;
    },
    { a: 30, b: 20, c: 15 },
  );
  const V = o.a * o.b * o.c;
  const L = clean(V / 1000);
  const thing = rng.pick(["fish tank", "water tank", "plastic tub", "glass vase"]);
  return {
    prompt: `A ${thing} is a cuboid ${o.a} cm long, ${o.b} cm wide and ${o.c} cm high. How many litres of water does it hold when full?`,
    answer: numAns(L, "litres"),
    solution: [`Volume = ${o.a} × ${o.b} × ${o.c} = ${show(V)} cm³.`, `1000 cm³ = 1 litre, so ${show(V)} ÷ 1000 = ${num(L)} litres.`],
    hint: "Find the volume in cm³ first, then change cm³ to litres.",
    traps: numTraps(L, [
      [V, "That is the volume in cm³. Divide by 1000 to change cm³ to litres."],
      [V / 100, "1 litre = 1000 cm³, not 100 cm³."],
    ]),
  };
}

function volCuboidMixed(rng: Rng): DrillItem {
  const o = find(
    () => ({ k: rng.int(5, 25), b: rng.int(2, 8) * 10, c: rng.int(2, 8) * 10 }),
    (z) => z.k % 10 !== 0,
    { k: 12, b: 40, c: 50 },
  );
  const aCm = o.k * 10;
  const V = aCm * o.b * o.c;
  const L = V / 1000;
  return {
    prompt: `A garden water trough is a cuboid ${num(o.k / 10)} m long, ${o.b} cm wide and ${o.c} cm deep. How many litres of water does it hold when full?`,
    answer: numAns(L, "litres"),
    solution: [
      `Use one unit: ${num(o.k / 10)} m = ${aCm} cm.`,
      `Volume = ${aCm} × ${o.b} × ${o.c} = ${show(V)} cm³.`,
      `${show(V)} ÷ 1000 = ${show(L)} litres.`,
    ],
    hint: "Make all three lengths centimetres before you multiply.",
    traps: numTraps(L, [
      [((o.k / 10) * o.b * o.c) / 1000, "You multiplied metres by centimetres. Change every length to cm first."],
      [V, "That is the volume in cm³. Divide by 1000 for litres."],
    ]),
  };
}

function volM3ToCm3(rng: Rng): DrillItem {
  const k = find(() => rng.int(5, 450), (x) => x % 100 !== 0, 35);
  const v = clean(k / 100);
  const ans = k * 10000;
  return {
    prompt: `Convert ${num(v)} m³ to cm³.`,
    answer: numAns(ans, "cm³"),
    solution: ["1 m = 100 cm, so 1 m³ = 100 × 100 × 100 = 1,000,000 cm³.", `${num(v)} × 1,000,000 = ${show(ans)} cm³`],
    hint: "A 1 m cube is 100 cm along each of its three edges.",
    traps: numTraps(ans, [
      [v * 1000, "That is the number of litres. 1 m³ = 1,000,000 cm³."],
      [v * 100, "Volume has three dimensions: multiply by 100 three times."],
      [v * 10000, "That uses the area factor. Volume needs 100 × 100 × 100."],
    ]),
  };
}

function volCups(rng: Rng): DrillItem {
  const o = find(
    () => ({ a: rng.int(2, 8) * 5, b: rng.int(2, 8) * 5, c: rng.int(2, 8) * 5, cup: rng.pick([125, 150, 200, 250, 300]) }),
    (z) => {
      const V = z.a * z.b * z.c;
      return V % z.cup === 0 && V / z.cup >= 6 && V / z.cup <= 80;
    },
    { a: 20, b: 15, c: 10, cup: 250 },
  );
  const V = o.a * o.b * o.c;
  const n = V / o.cup;
  const drink = rng.pick(["lemonade", "soy milk", "orange juice", "iced tea"]);
  return {
    prompt: `A cuboid container measures ${o.a} cm by ${o.b} cm by ${o.c} cm and is full of ${drink}. How many ${o.cup} ml cups can be filled from it?`,
    answer: numAns(n, "cups"),
    solution: [`Volume = ${o.a} × ${o.b} × ${o.c} = ${show(V)} cm³ = ${show(V)} ml (1 cm³ = 1 ml).`, `${show(V)} ÷ ${o.cup} = ${n} cups.`],
    hint: "1 cm³ holds exactly 1 ml.",
  };
}

// ---------------------------------------------------------------------------
// 4. Miles, km and other approximate conversions
// ---------------------------------------------------------------------------

function imperialOther(rng: Rng): DrillItem {
  const kind = rng.pick(["in-cm", "cm-in", "kg-lb", "lb-kg", "gal-l", "l-gal", "compare"] as const);
  const nm = rng.pick(NAMES);
  if (kind === "in-cm") {
    const i = rng.int(3, 60);
    const ans = clean((i * 5) / 2);
    return {
      prompt: `${rng.pick(["A tablet screen", "A margherita pizza", "A desk fan"])} measures ${i} inches across. Use 1 inch ≈ 2.5 cm to estimate this in centimetres.`,
      answer: numAns(ans, "cm"),
      solution: ["1 inch ≈ 2.5 cm, so multiply by 2.5.", `${i} × 2.5 = ${num(ans)} cm`],
      hint: "Centimetres are smaller than inches, so expect a bigger number.",
      traps: numTraps(ans, [[i / 2.5, "You divided. The cm number should be bigger than the inch number."]]),
    };
  }
  if (kind === "cm-in") {
    const c = rng.int(10, 180);
    const ans = clean((c * 2) / 5);
    return {
      prompt: `${nm} is measuring things for a UK website. A shelf is ${c} cm long. Use 1 inch ≈ 2.5 cm to estimate this in inches.`,
      answer: numAns(ans, "inches"),
      solution: ["1 inch ≈ 2.5 cm, so divide by 2.5.", `${c} ÷ 2.5 = ${num(ans)} inches`],
      hint: "Inches are bigger than centimetres, so expect a smaller number.",
      traps: numTraps(ans, [[c * 2.5, "You multiplied. There are fewer inches than centimetres in the same length."]]),
    };
  }
  if (kind === "kg-lb") {
    const k = rng.int(2, 80);
    const ans = clean((k * 11) / 5);
    return {
      prompt: `${nm}'s suitcase has a mass of ${k} kg. Use 1 kg ≈ 2.2 pounds (lb) to estimate its mass in pounds.`,
      answer: numAns(ans, "lb"),
      solution: ["1 kg ≈ 2.2 lb, so multiply by 2.2.", `${k} × 2.2 = ${num(ans)} lb`],
      hint: "A pound is lighter than a kilogram, so expect a bigger number.",
      traps: numTraps(ans, [[k / 2.2, "You divided. The number of pounds should be bigger than the number of kg."]]),
    };
  }
  if (kind === "lb-kg") {
    const lb = rng.int(1, 20) * 11;
    const ans = (lb * 5) / 11;
    return {
      prompt: `A recipe from the USA uses a ${lb} lb sack of flour for a bakery. Use 1 kg ≈ 2.2 lb to estimate its mass in kilograms.`,
      answer: numAns(ans, "kg"),
      solution: ["1 kg ≈ 2.2 lb, so divide by 2.2.", `${lb} ÷ 2.2 = ${num(ans)} kg`],
      hint: "There are more pounds than kilograms in the same mass.",
      traps: numTraps(ans, [[lb * 2.2, "You multiplied. The number of kg should be smaller than the number of pounds."]]),
    };
  }
  if (kind === "gal-l") {
    const g = rng.int(2, 40);
    const ans = clean((g * 9) / 2);
    return {
      prompt: `A water butt in an English garden holds ${g} gallons. Use 1 gallon ≈ 4.5 litres to estimate this in litres.`,
      answer: numAns(ans, "litres"),
      solution: ["1 gallon ≈ 4.5 litres, so multiply by 4.5.", `${g} × 4.5 = ${num(ans)} litres`],
      hint: "A gallon is bigger than a litre, so expect more litres than gallons.",
      traps: numTraps(ans, [[g / 4.5, "You divided. There are more litres than gallons."]]),
    };
  }
  if (kind === "l-gal") {
    const L = rng.int(2, 20) * 9;
    const ans = (L * 2) / 9;
    return {
      prompt: `A car's fuel tank holds ${L} litres. Use 1 gallon ≈ 4.5 litres to estimate this in gallons.`,
      answer: numAns(ans, "gallons"),
      solution: ["1 gallon ≈ 4.5 litres, so divide by 4.5.", `${L} ÷ 4.5 = ${num(ans)} gallons`],
      hint: "How many lots of 4.5 litres are there?",
      traps: numTraps(ans, [[L * 4.5, "You multiplied. There are fewer gallons than litres."]]),
    };
  }
  // compare miles and km
  const o = find(
    () => ({ M: rng.int(2, 20) * 5, K: rng.int(10, 160) }),
    (z) => z.K !== (z.M * 8) / 5 && Math.abs(z.K - (z.M * 8) / 5) <= 30 && z.K !== z.M,
    { M: 50, K: 75 },
  );
  const kmOfM = (o.M * 8) / 5;
  const ans = Math.abs(kmOfM - o.K);
  const milesFurther = kmOfM > o.K;
  return {
    prompt: `Route A is ${o.M} miles long. Route B is ${o.K} km long. Use 5 miles ≈ 8 km. Which route is longer, and by how many kilometres? Give the difference in km.`,
    answer: { type: "number", value: ans, display: `${num(ans)} km (route ${milesFurther ? "A" : "B"} is longer)` },
    solution: [
      `${o.M} miles = ${o.M / 5} × 5 miles ≈ ${o.M / 5} × 8 = ${kmOfM} km.`,
      `Compare: ${kmOfM} km and ${o.K} km. Route ${milesFurther ? "A" : "B"} is longer by ${milesFurther ? kmOfM : o.K} − ${milesFurther ? o.K : kmOfM} = ${num(ans)} km.`,
    ],
    hint: "Change the miles into km first, so both distances are in the same unit.",
    traps: numTraps(ans, [[Math.abs(o.M - o.K), "Miles and km are different units. Convert the miles to km before comparing."]]),
  };
}

// ---------------------------------------------------------------------------
// 5. Time durations on the 24-hour clock
// ---------------------------------------------------------------------------

interface DurCtx {
  lo: number;
  hi: number;
  text: (a: string, b: string, nm: string) => string;
}

const DAY_CTX: DurCtx[] = [
  { lo: 20, hi: 120, text: (a, b) => `A bus leaves the interchange at ${a} and reaches the last stop at ${b}. How long is the journey?` },
  { lo: 75, hi: 200, text: (a, b) => `A film starts at ${a} and finishes at ${b}. How long is the film?` },
  { lo: 45, hi: 180, text: (a, b, nm) => `${nm}'s CCA training starts at ${a} and ends at ${b}. How long does it last?` },
  { lo: 150, hi: 400, text: (a, b) => `A school trip to Sentosa leaves at ${a} and gets back at ${b}. How long is the trip?` },
  { lo: 240, hi: 400, text: (a, b) => `A coach leaves Singapore at ${a} and arrives in Kuala Lumpur at ${b}. How long is the journey?` },
];

const NIGHT_CTX: DurCtx[] = [
  { lo: 300, hi: 420, text: (a, b) => `An overnight coach leaves Singapore at ${a} and arrives in Kuala Lumpur at ${b} the next morning. How long is the journey?` },
  { lo: 120, hi: 330, text: (a, b) => `A New Year's Eve party starts at ${a} and ends at ${b} the next morning. How long does it last?` },
  { lo: 60, hi: 240, text: (a, b) => `A stargazing session starts at ${a} and ends at ${b} the next morning. How long does it last?` },
];

const TWELVE_CTX = [
  (a: string, b: string) => `A museum trip starts at ${a} and ends at ${b}. How long is the trip?`,
  (a: string, b: string, nm: string) => `${nm} starts a hike at MacRitchie Reservoir at ${a} and finishes at ${b}. How long is the hike?`,
  (a: string, b: string) => `A school open day runs from ${a} to ${b}. How long is it?`,
];

/** Answer + traps for a duration, asked either in minutes or in hours and minutes. */
function durationAnswer(rng: Rng, d: number, wrong: Array<[number, string]>): { suffix: string; answer: AnswerSpec; traps: Trap[] } {
  const asHm = d >= 60 && d % 60 !== 0 && rng.bool();
  if (asHm) {
    const tr: Trap[] = [];
    for (const [w, fb] of wrong) {
      if (!Number.isInteger(w) || w <= 0 || w === d) continue;
      const wh = Math.floor(w / 60), wm = w % 60;
      tr.push({ spec: { type: "list", values: [wh, wm], ordered: true }, feedback: fb });
    }
    return { suffix: " Give your answer in hours and minutes, e.g. 2 h 5 min.", answer: hmAns(d), traps: tr };
  }
  return { suffix: " Give your answer in minutes.", answer: numAns(d, "minutes"), traps: numTraps(d, wrong) };
}

function durationItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const nm = rng.pick(NAMES);
  const mode = tier === 1 ? "same" : tier === 2 ? rng.pick(["same", "same", "finish"] as const) : rng.pick(["midnight", "twelve", "finish", "same"] as const);

  if (mode === "finish") {
    const night = tier === 3;
    const o = find(
      () => (night ? { s: rng.int(1260, 1435), d: rng.int(40, 360) } : { s: rng.int(360, 1150), d: rng.int(25, 240) }),
      (z) => (night ? z.s + z.d >= 1445 && z.s + z.d <= 1440 + 600 : z.s + z.d <= 1435) && (z.s % 60) + (z.d % 60) !== 60,
      night ? { s: 1370, d: 135 } : { s: 948, d: 97 },
    );
    const e = o.s + o.d;
    const h = Math.floor(o.d / 60), m = o.d % 60;
    const dur = o.d < 60 || rng.bool(0.3) ? `${o.d} minutes` : hmWords(o.d);
    const ctxs = night
      ? [
          (a: string, t: string) => `A flight leaves Singapore at ${a} and the flight takes ${t}. What time is it in Singapore when the plane lands?`,
          (a: string, t: string) => `An overnight train leaves at ${a} and the journey takes ${t}. At what time does it arrive?`,
          (a: string, t: string) => `A film marathon starts at ${a} and lasts ${t}. At what time does it end?`,
        ]
      : [
          (a: string, t: string) => `A train leaves at ${a} and the journey takes ${t}. At what time does it arrive?`,
          (a: string, t: string) => `A film starts at ${a} and lasts ${t}. At what time does it end?`,
          (a: string, t: string) => `${nm} starts a science project at ${a} and works on it for ${t}. At what time does ${nm} stop?`,
        ];
    const steps: string[] = [];
    if (dur === `${o.d} minutes` && o.d >= 60) steps.push(`${o.d} minutes = ${hmWords(o.d)}.`);
    if (h > 0) steps.push(`Add the hours first: ${clock(o.s)} + ${h} h = ${clock(o.s + 60 * h)}.`);
    if (m > 0) steps.push(`${h > 0 ? "Then add" : "Add"} the minutes: ${clock(o.s + 60 * h)} + ${m} min = ${clock(e)}${e >= 1440 ? " (the next day)" : ""}.`);
    else if (e >= 1440) steps.push(`That is ${clock(e)} the next day.`);
    const traps: Trap[] = [];
    const carry = (o.s % 60) + m >= 60;
    if (carry) {
      const nh = (Math.floor(o.s / 60) + h) % 24;
      const nmn = (o.s % 60) + m;
      traps.push({
        spec: { type: "text", accept: [`${pad2(nh)}:${pad2(nmn)}`, `${pad2(nh)}${pad2(nmn)}`, `${pad2(nh)}.${pad2(nmn)}`] },
        feedback: "A clock can't show 60 minutes or more. Every 60 minutes makes another hour.",
      });
    }
    return {
      prompt: `${rng.pick(ctxs)(clock(o.s), dur)} Give your answer in 24-hour time, e.g. 09:05.`,
      answer: { type: "text", accept: timeAccept(e), display: clock(e) },
      solution: steps,
      hint: "Add the whole hours first, then the minutes. 60 minutes make one more hour.",
      traps,
    };
  }

  if (mode === "midnight") {
    const o = find(
      () => ({ s: rng.int(252, 287) * 5, d: rng.int(12, 84) * 5 }),
      (z) => z.d % 60 !== 0 && z.s + z.d >= 1450 && NIGHT_CTX.some((c) => z.d >= c.lo && z.d <= c.hi),
      { s: 1395, d: 395 },
    );
    const e = o.s + o.d;
    const ctx = rng.pick(NIGHT_CTX.filter((c) => o.d >= c.lo && o.d <= c.hi));
    const a = durationAnswer(rng, o.d, [[1440 - o.d, "That's the time from the end back to the start. Count forwards from the start time, through midnight."]]);
    return {
      prompt: ctx.text(clock(o.s), clock(e), nm) + a.suffix,
      answer: a.answer,
      solution: [
        `Split the time at midnight: ${clock(o.s)} → 00:00 is ${hm(1440 - o.s)}, and 00:00 → ${clock(e)} is ${hm(e - 1440)}.`,
        `Total: ${hm(1440 - o.s)} + ${hm(e - 1440)} = ${hm(o.d)}${a.answer.type === "number" ? ` = ${o.d} minutes` : ""}.`,
      ],
      hint: "Find the time up to midnight (00:00), then the time after midnight, and add.",
      traps: a.traps,
    };
  }

  if (mode === "twelve") {
    const o = find(
      () => ({ s: rng.int(96, 143) * 5, e: rng.int(145, 222) * 5 }),
      (z) => z.e - z.s >= 60 && z.e - z.s <= 480 && (z.e - z.s) % 60 !== 0,
      { s: 650, e: 855 },
    );
    const d = o.e - o.s;
    const wrong = o.e >= 780 ? o.s - (o.e - 720) : NaN;
    const a = durationAnswer(rng, d, [[wrong, `Change ${clock12(o.e)} to 24-hour time (${clock(o.e)}) first, then count on from the start.`]]);
    return {
      prompt: rng.pick(TWELVE_CTX)(clock12(o.s), clock12(o.e), nm) + a.suffix,
      answer: a.answer,
      solution: [
        `In 24-hour time: ${clock12(o.s)} = ${clock(o.s)} and ${clock12(o.e)} = ${clock(o.e)}.`,
        countOn(o.s, o.e),
        `Total: ${hm(d)}${a.answer.type === "number" ? ` = ${d} minutes` : ""}.`,
      ],
      hint: "Change both times to the 24-hour clock, then count on.",
      traps: a.traps,
    };
  }

  // Same day, 24-hour clock.
  const o = find(
    () => (tier === 1 ? { s: rng.int(72, 216) * 5, d: rng.int(7, 40) * 5 } : { s: rng.int(360, 1150), d: rng.int(25, 330) }),
    (z) => z.s + z.d <= 1435 && z.d % 60 !== 0,
    { s: 875, d: 155 },
  );
  const e = o.s + o.d;
  const ctx = rng.pick(DAY_CTX.filter((c) => o.d >= c.lo && o.d <= c.hi));
  const borrow = e % 60 < o.s % 60;
  const a = durationAnswer(rng, o.d, [
    [borrow ? o.d + 40 : NaN, "It looks like you subtracted the times like ordinary numbers. There are 60 minutes in an hour, not 100. Count on to the next whole hour instead."],
  ]);
  return {
    prompt: ctx.text(clock(o.s), clock(e), nm) + a.suffix,
    answer: a.answer,
    solution: [countOn(o.s, e), `Total: ${hm(o.d)}${a.answer.type === "number" ? ` = ${o.d} minutes` : ""}.`],
    hint: "Count on from the start time to the next whole hour, then to the end time.",
    traps: a.traps,
  };
}

// ---------------------------------------------------------------------------
// 6. Hours and minutes ↔ decimal hours
// ---------------------------------------------------------------------------

function decimalHoursItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const kinds = tier === 1 ? (["toHm", "toDec", "minToDec"] as const) : tier === 2 ? (["toHm", "toDec", "minToDec", "decToMin"] as const) : (["round", "fraction", "decToMin", "toHm"] as const);
  const kind = rng.pick(kinds);

  if (kind === "toHm") {
    const H = rng.int(1, tier === 1 ? 4 : 6);
    const k = tier === 1 ? rng.pick([25, 50, 75]) : rng.int(1, 19) * 5; // hundredths of an hour
    const x = clean(H + k / 100);
    const mins = (k * 60) / 100;
    const ctx = rng.pick(["A coach journey", "A hike", "A boat trip", "A school sports day", "A science fair"]);
    return {
      prompt: `${ctx} takes ${num(x)} hours. Write this time in hours and minutes. Give your answer like 2 h 5 min.`,
      answer: hmAns(H * 60 + mins),
      solution: [
        `The whole-number part is ${H} hour${H === 1 ? "" : "s"}.`,
        `${num(k / 100)} of an hour = ${num(k / 100)} × 60 = ${mins} minutes.`,
        `So ${num(x)} hours = ${H} h ${mins} min.`,
      ],
      hint: "The part after the decimal point is a fraction of an hour. What is that fraction of 60 minutes?",
      traps: [{ spec: { type: "list", values: [H, k], ordered: true }, feedback: `The decimal part is a fraction of an hour, not a number of minutes: ${num(k / 100)} h = ${num(k / 100)} × 60 = ${mins} min.` }],
    };
  }

  if (kind === "toDec" || kind === "minToDec") {
    const H = rng.int(1, tier === 1 ? 4 : 5);
    const m = tier === 1 ? rng.pick([15, 30, 45]) : rng.int(1, 19) * 3;
    const val = clean(H + m / 60);
    const wrong = clean(H + m / 100);
    if (kind === "toDec") {
      return {
        prompt: `Write ${H} h ${m} min as a decimal number of hours.`,
        answer: numAns(val, "hours", true),
        solution: [`${m} min = {{${m}/60}} of an hour = ${m} ÷ 60 = ${num(clean(m / 60))} h.`, `So ${H} h ${m} min = ${H} + ${num(clean(m / 60))} = ${num(val)} hours.`],
        hint: "Minutes are sixtieths of an hour, not hundredths.",
        traps: numTraps(val, [[wrong, `${m} minutes is {{${m}/60}} of an hour, not {{${m}/100}}. Divide the minutes by 60.`]]),
      };
    }
    const total = H * 60 + m;
    return {
      prompt: `Write ${total} minutes in hours, as a decimal.`,
      answer: numAns(val, "hours", true),
      solution: [`There are 60 minutes in an hour, so divide by 60.`, `${total} ÷ 60 = ${num(val)} hours (that is ${H} h ${m} min).`],
      hint: "How many lots of 60 minutes are there?",
      traps: numTraps(val, [
        [wrong, `${total} minutes is ${H} h ${m} min, but ${m} minutes is {{${m}/60}} of an hour, not 0.${pad2(m)}.`],
        [total / 100, "There are 60 minutes in an hour, not 100. Divide by 60."],
      ]),
    };
  }

  if (kind === "decToMin") {
    const o = find(() => ({ H: rng.int(0, 3), k: rng.int(1, 19) * 5 }), (z) => z.H + z.k / 100 >= 0.2 && z.k !== 50, { H: 1, k: 35 });
    const x = clean(o.H + o.k / 100);
    const mins = o.H * 60 + (o.k * 60) / 100;
    return {
      prompt: rng.pick([`How many minutes are there in ${num(x)} hours?`, `${rng.pick(NAMES)} spends ${num(x)} hours on homework. How many minutes is that?`]),
      answer: numAns(mins, "minutes"),
      solution: [`Multiply by 60: ${num(x)} × 60 = ${mins} minutes.`, `(Check: ${o.H} h = ${o.H * 60} min, and ${num(o.k / 100)} × 60 = ${(o.k * 60) / 100} min.)`],
      hint: "Each whole hour is 60 minutes, and the decimal part is a fraction of 60 minutes.",
      traps: numTraps(mins, [
        [o.H * 60 + o.k, `The decimal part is a fraction of an hour: ${num(o.k / 100)} h = ${(o.k * 60) / 100} min, not ${o.k} min.`],
        [x * 100, "There are 60 minutes in an hour, not 100. Multiply by 60."],
      ]),
    };
  }

  if (kind === "round") {
    const H = rng.int(1, 5);
    const m = find(() => rng.int(5, 55), (x) => x % 3 !== 0, 20);
    const exact = H + m / 60;
    const val = roundTo(exact, 2);
    return {
      prompt: `Write ${H} h ${m} min as a decimal number of hours. Give your answer correct to 2 decimal places.`,
      answer: numAns(val, "hours", true),
      solution: [`${m} min = ${m} ÷ 60 = ${num(roundTo(m / 60, 4))}… hours.`, `${H} + ${num(roundTo(m / 60, 4))}… = ${num(roundTo(exact, 4))}… ≈ ${num(val)} hours (2 d.p.).`],
      hint: "Divide the minutes by 60 on your calculator, add the whole hours, then round.",
      traps: numTraps(val, [[H + m / 100, `${m} minutes is {{${m}/60}} of an hour, not {{${m}/100}}.`]]),
    };
  }

  // fraction of an hour
  const m = find(() => rng.int(2, 58), (x) => gcd(x, 60) > 1 && x !== 30, 45);
  const g = gcd(m, 60);
  return {
    prompt: `Write ${m} minutes as a fraction of an hour. Give your answer in its simplest form.`,
    answer: { type: "fraction", n: m / g, d: 60 / g, simplest: true },
    solution: [`There are 60 minutes in an hour, so ${m} minutes = {{${m}/60}} of an hour.`, `Divide top and bottom by ${g}: {{${m}/60}} = ${frac(m / g, 60 / g)}.`],
    hint: "Put the minutes over 60, then simplify.",
    traps: [{ spec: { type: "fraction", n: m, d: 100 }, feedback: "An hour has 60 minutes, not 100. Put the minutes over 60." }],
  };
}

// ---------------------------------------------------------------------------
// 7. Speed, distance and time
// ---------------------------------------------------------------------------

interface Mover {
  who: string;
  verb: string;
  lo: number;
  hi: number;
  step: number;
}

const KMH_MOVERS: Mover[] = [
  { who: "A coach", verb: "travels", lo: 50, hi: 90, step: 5 },
  { who: "A car on the expressway", verb: "travels", lo: 60, hi: 90, step: 5 },
  { who: "A cyclist", verb: "rides", lo: 12, hi: 24, step: 1 },
  { who: "A hiker", verb: "walks", lo: 3, hi: 6, step: 1 },
  { who: "A ferry", verb: "sails", lo: 20, hi: 40, step: 2 },
  { who: "A high-speed train", verb: "travels", lo: 180, hi: 300, step: 20 },
];

const MS_MOVERS: Mover[] = [
  { who: "A sprinter", verb: "runs", lo: 6, hi: 10, step: 1 },
  { who: "A drone", verb: "flies", lo: 5, hi: 15, step: 1 },
  { who: "A lift", verb: "rises", lo: 2, hi: 5, step: 1 },
];

const pickSpeed = (rng: Rng, m: Mover): number => rng.int(Math.ceil(m.lo / m.step), Math.floor(m.hi / m.step)) * m.step;

function sdtItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  if (tier === 1) {
    const kmh = rng.bool(0.65);
    const mv = rng.pick(kmh ? KMH_MOVERS : MS_MOVERS);
    const S = pickSpeed(rng, mv);
    const t = kmh ? rng.int(2, 5) : mv.who === "A lift" ? rng.int(5, 20) : rng.int(5, 30);
    const D = S * t;
    const du = kmh ? "km" : "m", su = kmh ? "km/h" : "m/s", tu = kmh ? "hours" : "seconds";
    const unknown = rng.pick(["S", "D", "T"] as const);
    if (unknown === "S") {
      return {
        prompt: `${mv.who} ${mv.verb} ${D} ${du} in ${t} ${tu}. Work out the average speed in ${su}.`,
        answer: numAns(S, su),
        solution: ["Speed = distance ÷ time", `= ${D} ÷ ${t} = ${S} ${su}`],
        hint: "Speed is the distance covered in each hour (or each second).",
        traps: numTraps(S, [[D * t, "You multiplied. Speed = distance ÷ time."], [t / D, "That is time ÷ distance. Speed = distance ÷ time."]]),
      };
    }
    if (unknown === "D") {
      return {
        prompt: `${mv.who} ${mv.verb} for ${t} ${tu} at an average speed of ${S} ${su}. Work out the distance travelled, in ${du}.`,
        answer: numAns(D, du),
        solution: ["Distance = speed × time", `= ${S} × ${t} = ${D} ${du}`],
        hint: `In each ${kmh ? "hour" : "second"} it covers ${S} ${du}. How many of those are there?`,
        traps: numTraps(D, [[S / t, "Distance = speed × time, so multiply."], [t / S, "Distance = speed × time, so multiply."]]),
      };
    }
    return {
      prompt: `${mv.who} ${mv.verb} ${D} ${du} at an average speed of ${S} ${su}. How long does this take? Give your answer in ${tu}.`,
      answer: numAns(t, tu),
      solution: ["Time = distance ÷ speed", `= ${D} ÷ ${S} = ${t} ${tu}`],
      hint: `How many lots of ${S} ${du} make ${D} ${du}?`,
      traps: numTraps(t, [[S / D, "That is speed ÷ distance. Time = distance ÷ speed."], [D * S, "Time = distance ÷ speed, so divide."]]),
    };
  }

  if (tier === 2) {
    const kind = rng.pick(["S", "D", "T", "ms"] as const);
    if (kind === "ms") {
      const opts = [
        { who: "A sprinter", verb: "runs", ds: [100, 200, 400], lo: 5, hi: 10 },
        { who: "A swimmer", verb: "swims", ds: [50, 100, 200], lo: 1, hi: 2.2 },
        { who: "A drone", verb: "flies", ds: [60, 80, 120, 150, 300], lo: 4, hi: 15 },
      ];
      const mv = rng.pick(opts);
      const o = find(
        () => ({ D: rng.pick(mv.ds), t: rng.int(8, 200) }),
        (z) => {
          const S = z.D / z.t;
          return S >= mv.lo && S <= mv.hi && hasDp(S, 2) && !Number.isInteger(S);
        },
        mv.who === "A sprinter" ? { D: 100, t: 16 } : mv.who === "A swimmer" ? { D: 50, t: 40 } : { D: 60, t: 8 },
      );
      const S = clean(o.D / o.t);
      return {
        prompt: `${mv.who} ${mv.verb} ${o.D} m in ${o.t} seconds. Work out the average speed in m/s.`,
        answer: numAns(S, "m/s"),
        solution: ["Speed = distance ÷ time", `= ${o.D} ÷ ${o.t} = ${num(S)} m/s`],
        hint: "How many metres are covered in each second?",
        traps: numTraps(S, [[o.t / o.D, "That is time ÷ distance. Speed = distance ÷ time."]]),
      };
    }
    const mv = rng.pick(KMH_MOVERS.filter((m) => m.lo < 150));
    const times = kind === "D" ? [20, 30, 40, 45, 75, 80, 90, 100, 105, 135, 150, 165] : [12, 15, 18, 20, 24, 30, 36, 40, 45, 48, 50, 75, 80, 90, 105, 135, 150];
    const o = find(
      () => ({ S: pickSpeed(rng, mv), t: rng.pick(times) }),
      (z) => hasDp((z.S * z.t) / 60, 1) && (z.S * z.t) / 60 >= 1 && (kind !== "T" || z.t < 600),
      { S: 48, t: 45 },
    );
    const D = clean((o.S * o.t) / 60);
    const hs = hoursStr(o.t);
    const hh = Math.floor(o.t / 60), mm = o.t % 60;
    const misread = clean(hh + mm / 100);
    if (kind === "S") {
      return {
        prompt: `${mv.who} ${mv.verb} ${num(D)} km in ${hmWords(o.t)}. Work out the average speed in km/h.`,
        answer: numAns(o.S, "km/h"),
        solution: [
          `Change the time to hours: ${hmWords(o.t)} = ${hs} hours.`,
          `Speed = distance ÷ time = ${num(D)} ÷ ${hs} = ${o.S} km/h.`,
          `Check: ${num(D)} km in ${o.t} min means ${num(D)} ÷ ${o.t} × 60 = ${o.S} km in 60 min.`,
        ],
        hint: "The answer is in km per HOUR, so change the time into hours first.",
        traps: numTraps(o.S, [
          [D / o.t, "That is km per minute. Change the time to hours first (or multiply by 60)."],
          [D / misread, `${hmWords(o.t)} is not ${num(misread)} hours: there are 60 minutes in an hour, not 100.`],
        ]),
      };
    }
    if (kind === "D") {
      return {
        prompt: `${mv.who} ${mv.verb} for ${hmWords(o.t)} at an average speed of ${o.S} km/h. How far does it travel? Give your answer in km.`,
        answer: numAns(D, "km"),
        solution: [`Change the time to hours: ${hmWords(o.t)} = ${hs} hours.`, `Distance = speed × time = ${o.S} × ${hs} = ${num(D)} km.`],
        hint: "Write the time as a number of hours before multiplying.",
        traps: numTraps(D, [
          [o.S * misread, `${hmWords(o.t)} is not ${num(misread)} hours: there are 60 minutes in an hour, not 100.`],
          [o.S * o.t, "Change the minutes into hours before multiplying by a speed in km/h."],
        ]),
      };
    }
    return {
      prompt: `${mv.who} ${mv.verb} ${num(D)} km at an average speed of ${o.S} km/h. How many minutes does the journey take?`,
      answer: numAns(o.t, "minutes"),
      solution: [`Time = distance ÷ speed = ${num(D)} ÷ ${o.S} = ${hs} hours.`, `${hs} hours × 60 = ${o.t} minutes.`],
      hint: "Distance ÷ speed gives the time in hours. Then change hours to minutes.",
      traps: numTraps(o.t, [[D / o.S, "That is the time in hours. Multiply by 60 to get minutes."]]),
    };
  }

  // Tier 3: mixed units.
  const kind = rng.pick(["toKmh", "timeMin", "msKm"] as const);
  const nm = rng.pick(NAMES);
  if (kind === "msKm") {
    const mv = rng.pick([
      { who: "A train", vs: [15, 20, 25, 30] },
      { who: "A cyclist", vs: [4, 5, 6, 8] },
      { who: "A car", vs: [12, 15, 20, 25] },
    ]);
    const v = rng.pick(mv.vs);
    const t = rng.int(2, 20);
    const Dm = v * t * 60;
    const Dkm = clean(Dm / 1000);
    return {
      prompt: `${mv.who} travels at a steady ${v} m/s for ${t} minutes. How far does it travel? Give your answer in km.`,
      answer: numAns(Dkm, "km"),
      solution: [`${t} minutes = ${t} × 60 = ${t * 60} seconds.`, `Distance = ${v} × ${t * 60} = ${show(Dm)} m.`, `${show(Dm)} m = ${num(Dkm)} km.`],
      hint: "The speed is in metres per SECOND, so change the time into seconds first.",
      traps: numTraps(Dkm, [
        [v * t, "Change the minutes to seconds first: the speed is in metres per second."],
        [Dm, "That is the distance in metres. Divide by 1000 for km."],
      ]),
    };
  }
  const walk = rng.bool();
  const speeds = walk ? [3, 3.6, 4, 4.2, 4.5, 4.8, 5, 5.4, 6] : [10, 12, 13.5, 15, 16, 18, 20, 24];
  const o = find(
    () => ({ S: rng.pick(speeds), t: rng.pick([6, 8, 9, 10, 12, 15, 18, 20, 24, 25, 30, 36, 40, 45]) }),
    (z) => {
      const Dm = (z.S * 1000 * z.t) / 60;
      return hasDp(Dm, 0) && Math.round(Dm) % 10 === 0;
    },
    { S: 4.8, t: 15 },
  );
  const Dm = Math.round((o.S * 1000 * o.t) / 60);
  const Dkm = clean(Dm / 1000);
  const verb = walk ? "walks" : "cycles";
  const hs = hoursStr(o.t);
  if (kind === "toKmh") {
    return {
      prompt: `${nm} ${verb} ${show(Dm)} m in ${o.t} minutes. Work out ${nm}'s average speed in km/h.`,
      answer: numAns(o.S, "km/h"),
      solution: [
        `Change the units: ${show(Dm)} m = ${num(Dkm)} km and ${o.t} min = ${hs} h.`,
        `Speed = ${num(Dkm)} ÷ ${hs} = ${num(o.S)} km/h.`,
        `Check: in 60 minutes ${nm} would go ${num(Dkm)} × (60 ÷ ${o.t}) = ${num(o.S)} km.`,
      ],
      hint: "For km/h you need the distance in km and the time in hours.",
      traps: numTraps(o.S, [
        [Dm / o.t, "That is metres per minute. Change to km and hours first."],
        [Dkm / o.t, "That is km per minute. Multiply by 60 to get km per hour."],
      ]),
    };
  }
  return {
    prompt: `${nm} ${verb} ${show(Dm)} m at an average speed of ${num(o.S)} km/h. How many minutes does this take?`,
    answer: numAns(o.t, "minutes"),
    solution: [`${show(Dm)} m = ${num(Dkm)} km.`, `Time = ${num(Dkm)} ÷ ${num(o.S)} = ${hs} hours.`, `${hs} × 60 = ${o.t} minutes.`],
    hint: "Change metres to km so the units match the speed, then change hours to minutes at the end.",
    traps: numTraps(o.t, [
      [Dm / o.S, "Change the metres to kilometres before dividing by a speed in km/h."],
      [Dkm / o.S, "That is the time in hours. Multiply by 60 for minutes."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 8. km/h ↔ m/s
// ---------------------------------------------------------------------------

const KMH_THINGS = ["A cyclist", "A bus", "A train", "A car", "A cheetah", "A ferry", "A runner"];

function kmhMsItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const thing = rng.pick(KMH_THINGS);
  const toMsSteps = (kmh: number, v: string) => [
    "1 km = 1000 m and 1 hour = 3600 seconds.",
    `${num(kmh)} km/h means ${show(kmh * 1000)} m in 3600 s.`,
    `${show(kmh * 1000)} ÷ 3600 = ${v} m/s (the shortcut is ÷ 3.6).`,
  ];
  const toKmhSteps = (v: number, kmh: number) => [
    `In 1 hour (3600 s) you travel ${num(v)} × 3600 = ${show(clean(v * 3600))} m.`,
    `${show(clean(v * 3600))} m = ${num(kmh)} km, so the speed is ${num(kmh)} km/h (the shortcut is × 3.6).`,
  ];

  if (tier === 3) {
    const kind = rng.pick(["round", "compare", "toKmh"] as const);
    if (kind === "round") {
      const kmh = find(() => rng.int(10, 200), (x) => x % 9 !== 0, 100);
      const v = roundTo((kmh * 5) / 18, 1);
      return {
        prompt: `${thing} travels at ${kmh} km/h. Write this speed in m/s. Give your answer correct to 1 decimal place.`,
        answer: numAns(v, "m/s", true),
        solution: toMsSteps(kmh, `${num(roundTo((kmh * 5) / 18, 4))}…`).concat([`≈ ${num(v)} m/s (1 d.p.)`]),
        hint: "Change km to m (× 1000) and hours to seconds (÷ 3600).",
        traps: numTraps(v, [
          [kmh * 3.6, "You multiplied by 3.6. Going from km/h to m/s the number gets smaller, so divide."],
          [roundTo((kmh * 1000) / 60, 1), "That is metres per minute. An hour has 3600 seconds, so divide by 3600."],
        ]),
      };
    }
    if (kind === "compare") {
      const o = find(
        () => ({ kmh: rng.int(2, 7) * 18, ms: rng.int(10, 35) }),
        (z) => z.kmh / 3.6 !== z.ms && Math.abs((z.kmh * 5) / 18 - z.ms) <= 15,
        { kmh: 90, ms: 30 },
      );
      const a = (o.kmh * 5) / 18;
      const diff = Math.abs(a - o.ms);
      const carFaster = a > o.ms;
      return {
        prompt: `A car on the expressway travels at ${o.kmh} km/h. A cheetah can sprint at ${o.ms} m/s. Which is faster, and by how many metres per second? Give the difference in m/s.`,
        answer: { type: "number", value: diff, display: `${num(diff)} m/s (the ${carFaster ? "car" : "cheetah"} is faster)` },
        solution: [
          `Change the car's speed to m/s: ${o.kmh} ÷ 3.6 = ${num(a)} m/s.`,
          `Compare: ${num(a)} m/s and ${o.ms} m/s. The ${carFaster ? "car" : "cheetah"} is faster by ${num(diff)} m/s.`,
        ],
        hint: "Put both speeds in the same unit before you compare them.",
        traps: numTraps(diff, [[Math.abs(o.kmh - o.ms), "Those speeds are in different units. Change km/h to m/s first."]]),
      };
    }
    const k = find(() => rng.int(15, 120), (x) => x % 10 !== 0, 104);
    const v = clean(k / 10);
    const kmh = clean((k * 36) / 100);
    return {
      prompt: `A world-class sprinter's average speed in a race is ${num(v)} m/s. Write this speed in km/h.`,
      answer: numAns(kmh, "km/h"),
      solution: toKmhSteps(v, kmh),
      hint: "How many metres would the sprinter cover in a whole hour at this speed?",
      traps: numTraps(kmh, [[v / 3.6, "You divided by 3.6. Going from m/s to km/h the number gets bigger, so multiply."]]),
    };
  }

  if (rng.bool()) {
    // km/h → m/s with an exact answer.
    const j = tier === 1 ? rng.int(1, 8) : rng.int(1, 18);
    const kmh = tier === 1 ? 18 * j : 9 * j;
    const v = clean((kmh * 5) / 18);
    return {
      prompt: rng.pick([`Convert ${kmh} km/h to m/s.`, `${thing} moves at ${kmh} km/h. What is this speed in m/s?`]),
      answer: numAns(v, "m/s"),
      solution: toMsSteps(kmh, num(v)),
      hint: "Change km to m (× 1000) and hours to seconds (÷ 3600).",
      traps: numTraps(v, [
        [kmh * 3.6, "You multiplied by 3.6. Going from km/h to m/s the number gets smaller, so divide."],
        [(kmh * 1000) / 60, "That is metres per minute. An hour has 3600 seconds, so divide by 3600."],
      ]),
    };
  }
  // m/s → km/h
  const k = tier === 1 ? rng.int(2, 30) * 2 : find(() => rng.int(3, 60), (x) => x % 2 === 1 || rng.bool(0.3), 25);
  const v = clean(k / 2);
  const kmh = clean((k * 18) / 10);
  return {
    prompt: rng.pick([`Convert ${num(v)} m/s to km/h.`, `${thing} moves at ${num(v)} m/s. What is this speed in km/h?`]),
    answer: numAns(kmh, "km/h"),
    solution: toKmhSteps(v, kmh),
    hint: "How many metres would it cover in a whole hour (3600 seconds)?",
    traps: numTraps(kmh, [[v / 3.6, "You divided by 3.6. Going from m/s to km/h the number gets bigger, so multiply."]]),
  };
}

// ---------------------------------------------------------------------------
// 9. Average speed over a journey in two parts
// ---------------------------------------------------------------------------

interface Trip {
  name: string;
  lo: number;
  hi: number;
  step: number;
}

const TRIPS: Trip[] = [
  { name: "car journey", lo: 40, hi: 100, step: 5 },
  { name: "bike ride", lo: 10, hi: 30, step: 2 },
  { name: "train journey", lo: 60, hi: 150, step: 10 },
];

function averageSpeedItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const nm = rng.pick(NAMES);
  const trip = rng.pick(TRIPS);
  const kind = tier === 1 ? "st" : tier === 2 ? rng.pick(["st", "dt", "ds"] as const) : rng.pick(["stop", "reverse", "ds"] as const);
  const times = tier === 1 ? [60, 120, 180] : tier === 2 ? [15, 20, 30, 40, 45, 60, 75, 90, 120] : [15, 20, 30, 40, 45, 50, 60, 75, 90, 100, 120];
  const stop = kind === "stop" ? rng.pick([10, 15, 20, 30, 45]) : 0;
  const o = find(
    () => {
      const s1 = rng.int(Math.ceil(trip.lo / trip.step), Math.floor(trip.hi / trip.step)) * trip.step;
      const s2 = rng.int(Math.ceil(trip.lo / trip.step), Math.floor(trip.hi / trip.step)) * trip.step;
      return { s1, s2, t1: rng.pick(times), t2: rng.pick(times) };
    },
    (z) => {
      if (z.s1 === z.s2 || z.t1 === z.t2) return false;
      const d1 = (z.s1 * z.t1) / 60, d2 = (z.s2 * z.t2) / 60;
      if (!hasDp(d1, 1) || !hasDp(d2, 1)) return false;
      const avg = ((d1 + d2) * 60) / (z.t1 + z.t2 + stop);
      return hasDp(avg, tier === 1 ? 0 : 1) && (tier === 1 || hasDp(avg, 0) || rng.bool(0.4));
    },
    tier === 1 ? { s1: 60, s2: 90, t1: 120, t2: 60 } : { s1: 60, s2: 40, t1: 90, t2: 30 },
  );
  const d1 = clean((o.s1 * o.t1) / 60), d2 = clean((o.s2 * o.t2) / 60);
  const D = clean(d1 + d2);
  const Tm = o.t1 + o.t2 + stop;
  const avg = clean((D * 60) / Tm);
  const meanSpeeds = (o.s1 + o.s2) / 2;
  const avgLine = `Average speed = total distance ÷ total time = ${num(D)} ÷ ${hoursStr(Tm)} = ${num(avg)} km/h.`;

  if (kind === "reverse") {
    return {
      prompt: `On a ${trip.name}, ${nm} travels ${num(d1)} km at an average speed of ${o.s1} km/h, then travels for another ${hmWords(o.t2)}. The average speed for the whole ${trip.name} is ${num(avg)} km/h. What was the average speed for the second part, in km/h?`,
      answer: numAns(o.s2, "km/h"),
      solution: [
        `First part: time = ${num(d1)} ÷ ${o.s1} = ${hoursStr(o.t1)} hours (${hmWords(o.t1)}).`,
        `Whole ${trip.name}: time = ${hmWords(Tm)} = ${hoursStr(Tm)} hours, so distance = ${num(avg)} × ${hoursStr(Tm)} = ${num(D)} km.`,
        `Second part: ${num(D)} − ${num(d1)} = ${num(d2)} km in ${hoursStr(o.t2)} hours, so speed = ${num(d2)} ÷ ${hoursStr(o.t2)} = ${o.s2} km/h.`,
      ],
      hint: "Use the average speed to find the TOTAL distance first.",
      traps: numTraps(o.s2, [[2 * avg - o.s1, "The average speed is not halfway between the two speeds, because the two parts take different times. Work with total distance and total time."]]),
    };
  }

  let prompt: string;
  let first: string;
  if (kind === "st") {
    prompt = `On a ${trip.name}, ${nm} travels for ${hmWords(o.t1)} at an average speed of ${o.s1} km/h, then for ${hmWords(o.t2)} at ${o.s2} km/h.`;
    first = `Distance = speed × time: ${o.s1} × ${hoursStr(o.t1)} = ${num(d1)} km and ${o.s2} × ${hoursStr(o.t2)} = ${num(d2)} km.`;
  } else if (kind === "dt" || kind === "stop") {
    prompt = `The first part of ${nm}'s ${trip.name} is ${num(d1)} km and takes ${hmWords(o.t1)}. The second part is ${num(d2)} km and takes ${hmWords(o.t2)}.`;
    first = `Total distance = ${num(d1)} + ${num(d2)} = ${num(D)} km.`;
  } else {
    prompt = `On a ${trip.name}, ${nm} travels the first ${num(d1)} km at an average speed of ${o.s1} km/h and the next ${num(d2)} km at ${o.s2} km/h.`;
    first = `Time = distance ÷ speed: ${num(d1)} ÷ ${o.s1} = ${hoursStr(o.t1)} h and ${num(d2)} ÷ ${o.s2} = ${hoursStr(o.t2)} h.`;
  }
  if (stop) prompt += ` In between the two parts, ${nm} stops for a ${stop}-minute break.`;
  prompt += ` Work out the average speed for the whole ${trip.name}, in km/h.`;
  const timeLine = stop
    ? `Total time = ${hmWords(o.t1)} + ${stop} min break + ${hmWords(o.t2)} = ${hmWords(Tm)} = ${hoursStr(Tm)} hours.`
    : `Total distance = ${num(D)} km. Total time = ${hmWords(Tm)} = ${hoursStr(Tm)} hours.`;
  const solution = kind === "dt" || kind === "stop" ? [first, timeLine, avgLine] : [first, timeLine, avgLine];
  return {
    prompt,
    answer: numAns(avg, "km/h"),
    solution,
    hint: "Average speed = TOTAL distance ÷ TOTAL time. It is not the mean of the two speeds.",
    traps: numTraps(avg, [
      [kind === "dt" || kind === "stop" ? (d1 / o.t1 * 60 + d2 / o.t2 * 60) / 2 : meanSpeeds, "You averaged the two speeds. The parts take different times, so use total distance ÷ total time."],
      [stop ? (D * 60) / (o.t1 + o.t2) : NaN, "The break still counts as journey time. Include it in the total time."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 10. Density
// ---------------------------------------------------------------------------

interface Material {
  name: string;
  obj: string;
  d100: number;
  easy: boolean;
}

const MATERIALS: Material[] = [
  { name: "cork", obj: "cork block", d100: 24, easy: false },
  { name: "pine wood", obj: "block of wood", d100: 50, easy: true },
  { name: "ice", obj: "block of ice", d100: 92, easy: false },
  { name: "glass", obj: "glass paperweight", d100: 250, easy: true },
  { name: "aluminium", obj: "metal block", d100: 270, easy: true },
  { name: "iron", obj: "metal bar", d100: 790, easy: true },
  { name: "silver", obj: "metal bar", d100: 1050, easy: true },
  { name: "gold", obj: "small metal bar", d100: 1930, easy: true },
];

function densityItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const mat = rng.pick(MATERIALS.filter((m) => tier > 1 || m.easy));
  const d = clean(mat.d100 / 100);
  const Name = mat.name[0].toUpperCase() + mat.name.slice(1);

  if (tier === 3) {
    const kind = rng.pick(["cuboid", "kg", "kgm3"] as const);
    if (kind === "kgm3") {
      const ans = clean(mat.d100 * 10);
      return {
        prompt: `The density of ${mat.name} is ${num(d)} g/cm³. Write this density in kg/m³.`,
        answer: numAns(ans, "kg/m³"),
        solution: [
          `1 m³ = 1,000,000 cm³, so 1 m³ of ${mat.name} has a mass of ${num(d)} × 1,000,000 = ${show(clean(mat.d100 * 10000))} g.`,
          `${show(clean(mat.d100 * 10000))} g ÷ 1000 = ${show(ans)} kg, so the density is ${show(ans)} kg/m³.`,
        ],
        hint: "Find the mass of 1 m³ (that is 1,000,000 cm³), then change grams to kilograms.",
        traps: numTraps(ans, [
          [mat.d100 * 10000, "That is grams per m³. Divide by 1000 to get kg."],
          [d / 1000, "A cubic metre is huge, so the number should get much bigger."],
        ]),
      };
    }
    if (kind === "cuboid") {
      const o = find(
        () => ({ a: rng.int(2, 12), b: rng.int(2, 10), c: rng.int(2, 8) }),
        (z) => (mat.d100 * z.a * z.b * z.c) % 10 === 0 && !(z.a === z.b && z.b === z.c),
        { a: 5, b: 4, c: 2 },
      );
      const V = o.a * o.b * o.c;
      const M = clean((mat.d100 * V) / 100);
      return {
        prompt: `A cuboid of ${mat.name} measures ${o.a} cm by ${o.b} cm by ${o.c} cm. The density of ${mat.name} is ${num(d)} g/cm³. Work out its mass in grams.`,
        answer: numAns(M, "g"),
        solution: [`Volume = ${o.a} × ${o.b} × ${o.c} = ${V} cm³.`, `Mass = density × volume = ${num(d)} × ${V} = ${num(M)} g.`],
        hint: "Find the volume first, then use mass = density × volume.",
        traps: numTraps(M, [
          [V, "That is the volume. Multiply it by the density to get the mass."],
          [V / d, "Mass = density × volume, so multiply."],
        ]),
      };
    }
    const V = find(() => rng.int(20, 800), (x) => hasDp((mat.d100 * x) / 100000, 3) && (mat.d100 * x) / 100000 >= 0.01, 100);
    const Mg = clean((mat.d100 * V) / 100);
    const Mkg = clean(Mg / 1000);
    return {
      prompt: `A ${mat.obj} has a mass of ${num(Mkg)} kg and a volume of ${V} cm³. Work out its density in g/cm³.`,
      answer: numAns(d, "g/cm³"),
      solution: [`Change the mass to grams: ${num(Mkg)} kg = ${num(Mg)} g.`, `Density = mass ÷ volume = ${num(Mg)} ÷ ${V} = ${num(d)} g/cm³.`, `This matches the density of ${mat.name}.`],
      hint: "The answer is in grams per cm³, so the mass must be in grams.",
      traps: numTraps(d, [
        [Mkg / V, "Change kg to g first: the density is in g per cm³."],
        [V / Mg, "Density = mass ÷ volume, not volume ÷ mass."],
      ]),
    };
  }

  const V = find(
    () => (tier === 1 ? rng.int(1, 20) * 10 : rng.int(4, 400)),
    (x) => (mat.d100 * x) % 10 === 0 && x !== 100,
    tier === 1 ? 40 : 50,
  );
  const M = clean((mat.d100 * V) / 100);
  const kind = rng.pick(["density", "mass", "volume"] as const);
  if (kind === "density") {
    return {
      prompt: `A ${mat.obj} has a mass of ${num(M)} g and a volume of ${V} cm³. Work out its density in g/cm³.`,
      answer: numAns(d, "g/cm³"),
      solution: ["Density = mass ÷ volume", `= ${num(M)} ÷ ${V} = ${num(d)} g/cm³. This matches the density of ${mat.name}.`],
      hint: "Density is the mass of each 1 cm³.",
      traps: numTraps(d, [
        [V / M, "Density = mass ÷ volume, not volume ÷ mass."],
        [M * V, "You multiplied. Density = mass ÷ volume."],
      ]),
    };
  }
  if (kind === "mass") {
    return {
      prompt: rng.pick([
        `${Name} has a density of ${num(d)} g/cm³. Work out the mass of ${V} cm³ of ${mat.name}, in grams.`,
        `A ${mat.obj} made of ${mat.name} has a volume of ${V} cm³. The density of ${mat.name} is ${num(d)} g/cm³. What is its mass in grams?`,
      ]),
      answer: numAns(M, "g"),
      solution: ["Mass = density × volume", `= ${num(d)} × ${V} = ${num(M)} g`],
      hint: `Each cm³ has a mass of ${num(d)} g. How many cm³ are there?`,
      traps: numTraps(M, [
        [V / d, "Mass = density × volume, so multiply."],
        [d / V, "Mass = density × volume, so multiply."],
      ]),
    };
  }
  return {
    prompt: `The density of ${mat.name} is ${num(d)} g/cm³. What is the volume of a piece of ${mat.name} with a mass of ${num(M)} g? Give your answer in cm³.`,
    answer: numAns(V, "cm³"),
    solution: ["Volume = mass ÷ density", `= ${num(M)} ÷ ${num(d)} = ${V} cm³`],
    hint: `Each cm³ has a mass of ${num(d)} g. How many lots of ${num(d)} g make ${num(M)} g?`,
    traps: numTraps(V, [
      [M * d, "Volume = mass ÷ density, so divide."],
      [d / M, "That is density ÷ mass. Volume = mass ÷ density."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// 11. Unit pricing and other rates
// ---------------------------------------------------------------------------

function sizeG(g: number): string {
  return g >= 1000 ? `${num(g / 1000)} kg` : `${g} g`;
}

function sizeMl(ml: number): string {
  if (ml === 1000) return "1 litre";
  return ml > 1000 ? `${num(ml / 1000)} litres` : `${ml} ml`;
}

function ratesItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const nm = rng.pick(NAMES);
  const kinds =
    tier === 1
      ? (["perKg", "flow", "pay", "fuel"] as const)
      : tier === 2
        ? (["best100", "perKgDec", "useRate", "best100"] as const)
        : (["bestMixed", "rateDiff", "twoStep"] as const);
  const kind = rng.pick(kinds);

  if (kind === "perKg") {
    const size = rng.pick([2, 3, 4, 5, 10]);
    const u = rng.int(24, 120) * 5; // cents per kg
    const P = clean((u * size) / 100);
    const item = rng.pick(["rice", "potatoes", "apples", "onions", "flour"]);
    return {
      prompt: `A ${size} kg bag of ${item} costs ${money(P)}. What is the price per kg?`,
      answer: moneyAns(u / 100),
      solution: ["Price per kg = total cost ÷ number of kg.", `${money(P)} ÷ ${size} = ${money(u / 100)} per kg`],
      hint: "'Per kg' means 'for each 1 kg': share the cost between the kilograms.",
      traps: numTraps(u / 100, [[size / P, "That is kg per dollar. For the price per kg, divide the cost by the mass."]]),
    };
  }
  if (kind === "flow") {
    const r = rng.int(4, 25), t = rng.int(3, 15);
    return {
      prompt: `A tap fills a ${r * t}-litre tank in ${t} minutes. At what rate does the water flow, in litres per minute?`,
      answer: numAns(r, "litres per minute"),
      solution: ["Rate = amount ÷ time", `${r * t} ÷ ${t} = ${r} litres per minute`],
      hint: "How many litres flow in each single minute?",
      traps: numTraps(r, [[t / (r * t), "That is minutes per litre. Divide the litres by the minutes."]]),
    };
  }
  if (kind === "pay") {
    const r = rng.int(9, 20), h = rng.int(2, 8);
    return {
      prompt: `${nm}'s cousin earns $${r * h} for ${h} hours of work at a café. How much is that per hour?`,
      answer: moneyAns(r),
      solution: ["Pay per hour = total pay ÷ hours", `$${r * h} ÷ ${h} = $${r} per hour`],
      hint: "Share the pay equally between the hours.",
      traps: numTraps(r, [[(r * h) * h, "You multiplied. 'Per hour' means divide by the number of hours."]]),
    };
  }
  if (kind === "fuel") {
    const r = rng.int(10, 20), L = rng.int(4, 10) * 5;
    return {
      prompt: `A car travels ${r * L} km on ${L} litres of petrol. How many kilometres does it travel per litre?`,
      answer: numAns(r, "km per litre"),
      solution: ["km per litre = distance ÷ litres", `${r * L} ÷ ${L} = ${r} km per litre`],
      hint: "How far does the car go on just 1 litre?",
      traps: numTraps(r, [[L / (r * L), "That is litres per km. Divide the distance by the litres."]]),
    };
  }

  if (kind === "best100") {
    const item = rng.pick(["cereal", "pasta", "peanut butter", "rice crackers", "oats", "muesli"]);
    const o = find(
      () => {
        const [sA, sB] = rng.shuffle([200, 250, 300, 400, 450, 500, 600, 750, 800, 900]).slice(0, 2);
        return { sA, sB, uA: rng.int(35, 150), uB: rng.int(35, 150) };
      },
      (z) => Math.abs(z.uA - z.uB) >= 4 && (z.uA * z.sA) % 100 === 0 && (z.uB * z.sB) % 100 === 0,
      { sA: 400, sB: 650, uA: 80, uB: 70 },
    );
    const pA = clean((o.uA * o.sA) / 10000), pB = clean((o.uB * o.sB) / 10000);
    const best = Math.min(o.uA, o.uB), worst = Math.max(o.uA, o.uB);
    const bestSize = o.uA < o.uB ? o.sA : o.sB;
    return {
      prompt: `A ${o.sA} g box of ${item} costs ${money(pA)}. A ${o.sB} g box of the same ${item} costs ${money(pB)}. Work out the price per 100 g of each box. What is the price per 100 g of the better-value box? Give your answer in dollars, e.g. $0.85.`,
      answer: moneyAns(best / 100),
      solution: [
        `${o.sA} g box: ${o.sA} g is ${num(o.sA / 100)} lots of 100 g, so ${money(pA)} ÷ ${num(o.sA / 100)} = ${money(o.uA / 100)} per 100 g.`,
        `${o.sB} g box: ${money(pB)} ÷ ${num(o.sB / 100)} = ${money(o.uB / 100)} per 100 g.`,
        `The lower price per 100 g is better value: the ${bestSize} g box at ${money(best / 100)} per 100 g.`,
      ],
      hint: "Find what 100 g costs in each box. The cheaper 100 g is the better buy.",
      traps: numTraps(best / 100, [[worst / 100, "That is the worse buy. Better value means a LOWER price per 100 g."]]),
    };
  }
  if (kind === "perKgDec") {
    const o = find(
      () => ({ s10: rng.int(5, 35), u: rng.int(30, 180) * 5 }),
      (z) => z.s10 % 10 !== 0 && (z.u * z.s10) % 10 === 0,
      { s10: 15, u: 280 },
    );
    const P = clean((o.u * o.s10) / 1000);
    const item = rng.pick(["rice", "lentils", "chickpeas", "brown sugar", "basmati rice"]);
    return {
      prompt: `${num(o.s10 / 10)} kg of ${item} costs ${money(P)}. Work out the price per kg.`,
      answer: moneyAns(o.u / 100),
      solution: ["Price per kg = total cost ÷ number of kg.", `${money(P)} ÷ ${num(o.s10 / 10)} = ${money(o.u / 100)} per kg`],
      hint: "Divide the cost by the number of kilograms (a calculator is fine).",
      traps: numTraps(o.u / 100, [
        [P * (o.s10 / 10), "You multiplied. Price per kg = cost ÷ mass."],
        [o.s10 / 10 / P, "That is kg per dollar. For the price per kg, divide the cost by the mass."],
      ]),
    };
  }
  if (kind === "useRate") {
    const o = find(
      () => ({ r: rng.pick([2.5, 3.5, 4.5, 6, 7.5, 8, 12.5, 15]), t: rng.int(8, 40) }),
      (z) => hasDp(z.r * z.t, 0),
      { r: 4.5, t: 20 },
    );
    const V = clean(o.r * o.t);
    if (rng.bool()) {
      return {
        prompt: `Water flows into a pond at ${num(o.r)} litres per minute. How many minutes will it take to add ${V} litres of water?`,
        answer: numAns(o.t, "minutes"),
        solution: ["Time = amount ÷ rate", `${V} ÷ ${num(o.r)} = ${o.t} minutes`],
        hint: `Each minute adds ${num(o.r)} litres. How many minutes make ${V} litres?`,
        traps: numTraps(o.t, [[V * o.r, "Time = amount ÷ rate, so divide."], [o.r / V, "That is rate ÷ amount. Divide the litres by the rate."]]),
      };
    }
    return {
      prompt: `Water flows into a pond at ${num(o.r)} litres per minute. How many litres flow in during ${o.t} minutes?`,
      answer: numAns(V, "litres"),
      solution: ["Amount = rate × time", `${num(o.r)} × ${o.t} = ${V} litres`],
      hint: `Each minute adds ${num(o.r)} litres.`,
      traps: numTraps(V, [[o.t / o.r, "Amount = rate × time, so multiply."]]),
    };
  }

  if (kind === "bestMixed") {
    if (rng.bool()) {
      // grams vs kilograms → price per kg
      const item = rng.pick(["rice", "flour", "potatoes", "lentils"]);
      const o = find(
        () => ({ g: rng.pick([400, 500, 600, 750, 800, 900]), kg10: rng.pick([12, 15, 20, 25, 30, 50]), uA: rng.int(15, 90) * 10, uB: rng.int(15, 90) * 10 }),
        (z) => Math.abs(z.uA - z.uB) >= 20 && (z.uA * z.g) % 1000 === 0 && (z.uB * z.kg10) % 10 === 0,
        { g: 750, kg10: 20, uA: 360, uB: 340 },
      );
      const pA = clean((o.uA * o.g) / 100000), pB = clean((o.uB * o.kg10) / 1000);
      const best = Math.min(o.uA, o.uB), worst = Math.max(o.uA, o.uB);
      return {
        prompt: `A ${o.g} g bag of ${item} costs ${money(pA)}. A ${sizeG(o.kg10 * 100)} bag costs ${money(pB)}. Work out the price per kg of each bag. What is the price per kg of the better-value bag?`,
        answer: moneyAns(best / 100),
        solution: [
          `${o.g} g = ${num(o.g / 1000)} kg, so ${money(pA)} ÷ ${num(o.g / 1000)} = ${money(o.uA / 100)} per kg.`,
          `${sizeG(o.kg10 * 100)} bag: ${money(pB)} ÷ ${num(o.kg10 / 10)} = ${money(o.uB / 100)} per kg.`,
          `The lower price per kg is better value: ${money(best / 100)} per kg (the ${o.uA < o.uB ? `${o.g} g` : sizeG(o.kg10 * 100)} bag).`,
        ],
        hint: "Put both bags in the same unit (kg) before working out the price per kg.",
        traps: numTraps(best / 100, [
          [worst / 100, "That is the worse buy. Better value means a LOWER price per kg."],
          [o.uA < o.uB ? pA / o.g : NaN, "Change the grams to kilograms before dividing."],
        ]),
      };
    }
    // ml vs litres → price per litre
    const drink = rng.pick(["orange juice", "soy milk", "oat milk", "coconut water"]);
    const o = find(
      () => ({ a: rng.pick([250, 330, 500, 750]), b: rng.pick([1000, 1500, 2000]), uA: rng.int(10, 60) * 10, uB: rng.int(10, 60) * 10 }),
      (z) => Math.abs(z.uA - z.uB) >= 20 && (z.uA * z.a) % 1000 === 0 && (z.uB * z.b) % 1000 === 0,
      { a: 500, b: 2000, uA: 340, uB: 290 },
    );
    const pA = clean((o.uA * o.a) / 100000), pB = clean((o.uB * o.b) / 100000);
    const best = Math.min(o.uA, o.uB), worst = Math.max(o.uA, o.uB);
    return {
      prompt: `A ${o.a} ml carton of ${drink} costs ${money(pA)}. A ${sizeMl(o.b)} carton costs ${money(pB)}. Work out the price per litre of each carton. What is the price per litre of the better-value carton?`,
      answer: moneyAns(best / 100),
      solution: [
        `${o.a} ml = ${num(o.a / 1000)} litres, so ${money(pA)} ÷ ${num(o.a / 1000)} = ${money(o.uA / 100)} per litre.`,
        `${sizeMl(o.b)}: ${money(pB)} ÷ ${num(o.b / 1000)} = ${money(o.uB / 100)} per litre.`,
        `The lower price per litre is better value: ${money(best / 100)} per litre (the ${o.uA < o.uB ? `${o.a} ml` : sizeMl(o.b)} carton).`,
      ],
      hint: "Change the millilitres to litres first, then find the cost of 1 litre for each.",
      traps: numTraps(best / 100, [[worst / 100, "That is the worse buy. Better value means a LOWER price per litre."]]),
    };
  }
  if (kind === "rateDiff") {
    const ctx = rng.pick([
      { a: "Printer A", b: "Printer B", what: "pages", per: "pages per minute", lo: 12, hi: 40, verb: "prints" },
      { a: "Tap A", b: "Tap B", what: "litres", per: "litres per minute", lo: 4, hi: 20, verb: "fills" },
      { a: rng.pick(NAMES), b: "Wei Ling", what: "words", per: "words per minute", lo: 25, hi: 60, verb: "types" },
    ]);
    const bName = ctx.b === ctx.a ? "Jun" : ctx.b;
    const o = find(
      () => ({ rA: rng.int(ctx.lo, ctx.hi), rB: rng.int(ctx.lo, ctx.hi), tA: rng.int(3, 9), tB: rng.int(3, 9) }),
      (z) => z.rA !== z.rB && z.tA !== z.tB && z.rA * z.tA !== z.rB * z.tB,
      { rA: 24, rB: 25, tA: 5, tB: 8 },
    );
    const nA = o.rA * o.tA, nB = o.rB * o.tB;
    const diff = Math.abs(o.rA - o.rB);
    const fast = o.rA > o.rB ? ctx.a : bName;
    return {
      prompt: `${ctx.a} ${ctx.verb} ${nA} ${ctx.what} in ${o.tA} minutes. ${bName} ${ctx.verb} ${nB} ${ctx.what} in ${o.tB} minutes. How many more ${ctx.per} does the faster one manage?`,
      answer: numAns(diff, ctx.per),
      solution: [
        `${ctx.a}: ${nA} ÷ ${o.tA} = ${o.rA} ${ctx.per}.`,
        `${bName}: ${nB} ÷ ${o.tB} = ${o.rB} ${ctx.per}.`,
        `${fast} is faster by ${Math.max(o.rA, o.rB)} − ${Math.min(o.rA, o.rB)} = ${diff} ${ctx.per}.`,
      ],
      hint: "Compare the rates (amount per minute), not the totals: the times are different.",
      traps: numTraps(diff, [[Math.abs(nA - nB), "That compares the totals, but the times are different. Work out each rate per minute first."]]),
    };
  }
  // twoStep: find the rate, then use it.
  const o = find(
    () => ({ r: rng.pick([1.5, 2.5, 3.5, 4.5, 5.5, 6.5, 7.5, 12.5]), t1: rng.int(2, 8), t2: rng.int(10, 60) }),
    (z) => hasDp(z.r * z.t1, 0) && hasDp(z.r * z.t2, 0) && z.t2 !== z.t1,
    { r: 4.5, t1: 4, t2: 50 },
  );
  const V1 = clean(o.r * o.t1), V2 = clean(o.r * o.t2);
  return {
    prompt: `A hose puts ${V1} litres of water into a paddling pool in ${o.t1} minutes. At the same rate, how many minutes will it take to put ${V2} litres into the pool?`,
    answer: numAns(o.t2, "minutes"),
    solution: [`Rate = ${V1} ÷ ${o.t1} = ${num(o.r)} litres per minute.`, `Time = ${V2} ÷ ${num(o.r)} = ${o.t2} minutes.`],
    hint: "First find how many litres flow in ONE minute.",
    traps: numTraps(o.t2, [[V2 * o.r, "Time = amount ÷ rate, so divide by the rate."], [V2 / o.t1, "Find the rate (litres per minute) first, then divide by it."]]),
  };
}

// ---------------------------------------------------------------------------
// 12. Conversion graphs
// ---------------------------------------------------------------------------

interface GraphCtx {
  xTitle: string;
  yTitle: string;
  xWord: string;
  yWord: string;
  xu: (n: number) => string;
  yu: (n: number) => string;
  oneX: string;
  rateQ: string;
  p: number;
  q: number;
  xMax: number;
  xMinor: number;
  xMajor: number;
  yMax: number;
  yMinor: number;
  yMajor: number;
}

const GRAPHS: GraphCtx[] = [
  {
    xTitle: "Distance (miles)", yTitle: "Distance (km)", xWord: "miles", yWord: "kilometres",
    xu: (n) => `${show(n)} miles`, yu: (n) => `${show(n)} km`, oneX: "1 mile",
    rateQ: "Use a point on the line to work out how many kilometres are equal to 1 mile.",
    p: 8, q: 5, xMax: 50, xMinor: 5, xMajor: 10, yMax: 80, yMinor: 4, yMajor: 20,
  },
  {
    xTitle: "Length (inches)", yTitle: "Length (cm)", xWord: "inches", yWord: "centimetres",
    xu: (n) => `${show(n)} inches`, yu: (n) => `${show(n)} cm`, oneX: "1 inch",
    rateQ: "Use a point on the line to work out how many centimetres are equal to 1 inch.",
    p: 5, q: 2, xMax: 20, xMinor: 2, xMajor: 4, yMax: 50, yMinor: 5, yMajor: 10,
  },
  {
    xTitle: "Volume (gallons)", yTitle: "Volume (litres)", xWord: "gallons", yWord: "litres",
    xu: (n) => `${show(n)} gallons`, yu: (n) => `${show(n)} litres`, oneX: "1 gallon",
    rateQ: "Use a point on the line to work out how many litres are equal to 1 gallon.",
    p: 9, q: 2, xMax: 20, xMinor: 2, xMajor: 4, yMax: 90, yMinor: 3, yMajor: 15,
  },
  {
    xTitle: "Singapore dollars (S$)", yTitle: "US dollars (US$)", xWord: "Singapore dollars", yWord: "US dollars",
    xu: (n) => `S$${show(n)}`, yu: (n) => `US$${show(n)}`, oneX: "S$1",
    rateQ: "Use a point on the line to work out how many US dollars you get for S$1.",
    p: 3, q: 4, xMax: 80, xMinor: 4, xMajor: 20, yMax: 60, yMinor: 3, yMajor: 15,
  },
  {
    xTitle: "Singapore dollars (S$)", yTitle: "British pounds (£)", xWord: "Singapore dollars", yWord: "British pounds",
    xu: (n) => `S$${show(n)}`, yu: (n) => `£${show(n)}`, oneX: "S$1",
    rateQ: "Use a point on the line to work out how many British pounds you get for S$1.",
    p: 3, q: 5, xMax: 100, xMinor: 5, xMajor: 20, yMax: 60, yMinor: 3, yMajor: 15,
  },
];

/** Points on the line that sit exactly on grid-line crossings. */
function readablePoints(c: GraphCtx): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let i = 1; i * c.xMinor <= c.xMax; i++) {
    const x = i * c.xMinor;
    if ((x * c.p) % c.q !== 0) continue;
    const y = (x * c.p) / c.q;
    if (y % c.yMinor !== 0 || y > c.yMax) continue;
    out.push([x, y]);
  }
  return out;
}

function graphSvg(c: GraphCtx): string {
  const L = 64, R = 404, top = 20, B = 256;
  const r1 = (v: number) => Math.round(v * 10) / 10;
  const X = (x: number) => r1(L + (x / c.xMax) * (R - L));
  const Y = (y: number) => r1(B - (y / c.yMax) * (B - top));
  let s = `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph: ${c.xTitle} from 0 to ${c.xMax} across, ${c.yTitle} from 0 to ${c.yMax} up, with a straight line through the origin.">`;
  s += `<rect x="0" y="0" width="420" height="300" fill="#ffffff"/>`;
  for (let i = 0; i * c.xMinor <= c.xMax; i++) {
    const x = i * c.xMinor;
    const major = x % c.xMajor === 0;
    s += `<line x1="${X(x)}" y1="${top}" x2="${X(x)}" y2="${B}" stroke="${major ? "#94a3b8" : "#dbe3ec"}" stroke-width="${major ? 1 : 0.7}"/>`;
  }
  for (let j = 0; j * c.yMinor <= c.yMax; j++) {
    const y = j * c.yMinor;
    const major = y % c.yMajor === 0;
    s += `<line x1="${L}" y1="${Y(y)}" x2="${R}" y2="${Y(y)}" stroke="${major ? "#94a3b8" : "#dbe3ec"}" stroke-width="${major ? 1 : 0.7}"/>`;
  }
  s += `<line x1="${L}" y1="${B}" x2="${R}" y2="${B}" stroke="#1f2937" stroke-width="1.5"/>`;
  s += `<line x1="${L}" y1="${B}" x2="${L}" y2="${top}" stroke="#1f2937" stroke-width="1.5"/>`;
  for (let x = 0; x <= c.xMax; x += c.xMajor) {
    s += `<text x="${X(x)}" y="${B + 16}" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">${x}</text>`;
  }
  for (let y = 0; y <= c.yMax; y += c.yMajor) {
    s += `<text x="${L - 6}" y="${r1(Y(y) + 4)}" font-size="11" font-family="sans-serif" text-anchor="end" fill="#334155">${y}</text>`;
  }
  s += `<text x="${(L + R) / 2}" y="292" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">${c.xTitle}</text>`;
  s += `<text x="16" y="${(top + B) / 2}" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937" transform="rotate(-90 16 ${(top + B) / 2})">${c.yTitle}</text>`;
  s += `<line x1="${X(0)}" y1="${Y(0)}" x2="${X(c.xMax)}" y2="${Y((c.xMax * c.p) / c.q)}" stroke="#4338ca" stroke-width="2.5"/>`;
  s += `</svg>`;
  return s;
}

function conversionGraphItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const c = rng.pick(GRAPHS);
  const pts = readablePoints(c);
  const diagram = graphSvg(c);
  const intro = `The graph converts between ${c.xWord} and ${c.yWord}.`;
  const kind = tier === 1 ? rng.pick(["xy", "yx"] as const) : tier === 2 ? rng.pick(["xy", "yx", "rate"] as const) : rng.pick(["bigX", "bigY", "rate"] as const);
  const rate = clean(c.p / c.q);

  if (kind === "rate") {
    const [x, y] = pts[pts.length - 1];
    return {
      prompt: `${intro} ${c.rateQ}`,
      answer: { type: "number", value: rate, display: c.yu(rate) },
      solution: [
        `Pick a point where the line crosses grid lines exactly, e.g. ${c.xu(x)} ≈ ${c.yu(y)}.`,
        `Divide: ${y} ÷ ${x} = ${num(rate)}, so ${c.oneX} ≈ ${c.yu(rate)}.`,
        "The line goes through the origin, so every point gives the same rate: the quantities are in direct proportion.",
      ],
      hint: "Read one clear point on the line, then work out what 1 unit is worth.",
      traps: numTraps(rate, [[c.q / c.p, `That is the rate the other way round (${c.xWord} for each one of the ${c.yWord}).`]]),
      diagram,
    };
  }
  if (kind === "bigX" || kind === "bigY") {
    const o = find(
      () => {
        const [x, y] = rng.pick(pts);
        return { x, y, k: rng.int(2, 6) };
      },
      (z) => (kind === "bigX" ? z.x * z.k > c.xMax : z.y * z.k > c.yMax),
      { x: pts[pts.length - 1][0], y: pts[pts.length - 1][1], k: 3 },
    );
    const X = o.x * o.k, Y = o.y * o.k;
    if (kind === "bigX") {
      return {
        prompt: `${intro} The graph only goes up to ${c.xu(c.xMax)}. Use it to convert ${c.xu(X)} to ${c.yWord}.`,
        answer: { type: "number", value: Y, display: c.yu(Y) },
        solution: [
          `Read a value you can see: ${c.xu(o.x)} ≈ ${c.yu(o.y)}.`,
          `${c.xu(X)} is ${o.k} × ${c.xu(o.x)}, so it is about ${o.k} × ${o.y} = ${c.yu(Y)}.`,
          "This works because the line goes through the origin: the quantities are in direct proportion.",
        ],
        hint: "Find a value on the graph that divides exactly into the one you need, then scale up.",
        traps: numTraps(Y, [[(X * c.q) / c.p, `You converted the wrong way. Start from ${c.xWord} and read across to ${c.yWord}.`]]),
        diagram,
      };
    }
    return {
      prompt: `${intro} The graph only goes up to ${c.yu(c.yMax)}. Use it to convert ${c.yu(Y)} to ${c.xWord}.`,
      answer: { type: "number", value: X, display: c.xu(X) },
      solution: [
        `Read a value you can see: ${c.yu(o.y)} ≈ ${c.xu(o.x)}.`,
        `${c.yu(Y)} is ${o.k} × ${c.yu(o.y)}, so it is about ${o.k} × ${o.x} = ${c.xu(X)}.`,
        "This works because the line goes through the origin: the quantities are in direct proportion.",
      ],
      hint: "Find a value on the graph that divides exactly into the one you need, then scale up.",
      traps: numTraps(X, [[(Y * c.p) / c.q, `You converted the wrong way. Start from ${c.yWord} and read across to ${c.xWord}.`]]),
      diagram,
    };
  }
  const [x, y] = rng.pick(pts);
  if (kind === "xy") {
    return {
      prompt: `${intro} Use the graph to convert ${c.xu(x)} to ${c.yWord}.`,
      answer: { type: "number", value: y, display: c.yu(y) },
      solution: [
        `Find ${x} on the horizontal axis (${c.xTitle}), go up to the line, then across to the vertical axis.`,
        `The line passes through (${x}, ${y}), so ${c.xu(x)} ≈ ${c.yu(y)}.`,
      ],
      hint: "Start on the axis of the unit you are given, go to the line, then across to the other axis.",
      traps: numTraps(y, [[(x * c.q) / c.p, `You read the graph the wrong way round. Start on the ${c.xWord} axis.`]]),
      diagram,
    };
  }
  return {
    prompt: `${intro} Use the graph to convert ${c.yu(y)} to ${c.xWord}.`,
    answer: { type: "number", value: x, display: c.xu(x) },
    solution: [
      `Find ${y} on the vertical axis (${c.yTitle}), go across to the line, then down to the horizontal axis.`,
      `The line passes through (${x}, ${y}), so ${c.yu(y)} ≈ ${c.xu(x)}.`,
    ],
    hint: "Start on the axis of the unit you are given, go to the line, then across to the other axis.",
    traps: numTraps(x, [[(y * c.p) / c.q, `You read the graph the wrong way round. Start on the ${c.yWord} axis.`]]),
    diagram,
  };
}

// ---------------------------------------------------------------------------
// 13. Pressure (stretch)
// ---------------------------------------------------------------------------

function pressureItem(rng: Rng, tier: 1 | 2 | 3): DrillItem {
  const nm = rng.pick(NAMES);
  if (tier === 3) {
    const kind = rng.pick(["dims", "feet", "legs"] as const);
    if (kind === "dims") {
      const o = find(
        () => ({ a: rng.int(2, 10) * 10, b: rng.int(2, 10) * 10, P: rng.int(2, 60) * 100 }),
        (z) => z.a !== z.b && hasDp((z.P * z.a * z.b) / 10000, 0) && (z.P * z.a * z.b) / 10000 >= 50,
        { a: 50, b: 40, P: 1500 },
      );
      const A = clean((o.a * o.b) / 10000);
      const F = clean(o.P * A);
      return {
        prompt: `A crate with a weight of ${show(F)} N rests on the floor. Its base measures ${o.a} cm by ${o.b} cm. Work out the pressure on the floor in N/m².`,
        answer: numAns(o.P, "N/m²"),
        solution: [
          `Change to metres: ${o.a} cm = ${num(o.a / 100)} m and ${o.b} cm = ${num(o.b / 100)} m.`,
          `Area = ${num(o.a / 100)} × ${num(o.b / 100)} = ${num(A)} m².`,
          `Pressure = force ÷ area = ${show(F)} ÷ ${num(A)} = ${show(o.P)} N/m².`,
        ],
        hint: "For N/m² the area must be in m², so change the centimetres to metres first.",
        traps: numTraps(o.P, [
          [F / (o.a * o.b), "That is the pressure in N/cm². Change the area to m² first."],
          [F * A, "Pressure = force ÷ area, so divide."],
        ]),
      };
    }
    if (kind === "feet") {
      const o = find(
        () => ({ m: rng.int(35, 75), f: rng.int(10, 25) * 10 }),
        (z) => hasDp((10 * z.m) / (2 * z.f), 2),
        { m: 50, f: 125 },
      );
      const W = 10 * o.m;
      const P = clean(W / (2 * o.f));
      return {
        prompt: `${nm} has a mass of ${o.m} kg, so ${nm}'s weight is about ${W} N. ${nm} stands on both feet. Each foot has an area of ${o.f} cm² touching the floor. Work out the pressure on the floor in N/cm².`,
        answer: numAns(P, "N/cm²"),
        solution: [`Total area = 2 × ${o.f} = ${2 * o.f} cm².`, `Pressure = force ÷ area = ${W} ÷ ${2 * o.f} = ${num(P)} N/cm².`],
        hint: "The weight is spread over BOTH feet.",
        traps: numTraps(P, [
          [W / o.f, "There are two feet, so the total area is twice one foot."],
          [o.m / (2 * o.f), "Use the weight in newtons (the force), not the mass in kg."],
        ]),
      };
    }
    const o = find(
      () => ({ W: rng.int(10, 80) * 10, a: rng.pick([4, 5, 8, 10, 12.5, 16, 20, 25]) }),
      (z) => hasDp(z.W / (4 * z.a), 1),
      { W: 400, a: 10 },
    );
    const P = clean(o.W / (4 * o.a));
    return {
      prompt: `A table with a weight of ${o.W} N stands on 4 legs. The end of each leg has an area of ${num(o.a)} cm². Work out the pressure under the legs in N/cm².`,
      answer: numAns(P, "N/cm²"),
      solution: [`Total area = 4 × ${num(o.a)} = ${num(4 * o.a)} cm².`, `Pressure = ${o.W} ÷ ${num(4 * o.a)} = ${num(P)} N/cm².`],
      hint: "The weight is shared between all four legs.",
      traps: numTraps(P, [[o.W / o.a, "The weight is spread over all 4 legs, so use the total area."]]),
    };
  }

  const cm = tier === 2 && rng.bool();
  const unit = cm ? "N/cm²" : "N/m²";
  const aUnit = cm ? "cm²" : "m²";
  const o = find(
    () =>
      tier === 1
        ? { A: rng.int(2, 6), P: rng.int(1, 20) * 50 }
        : cm
          ? { A: rng.int(2, 40) * 5, P: rng.int(2, 30) }
          : { A: rng.pick([0.2, 0.25, 0.4, 0.5, 0.8, 1.2, 1.5, 2.5]), P: rng.int(2, 60) * 50 },
    (z) => hasDp(z.P * z.A, 0) && z.P * z.A >= 20,
    { A: 2, P: 300 },
  );
  const F = clean(o.P * o.A);
  const kind = rng.pick(["P", "F", "A"] as const);
  const obj = rng.pick(["A crate", "A box of books", "A large plant pot", "A stack of bricks"]);
  if (kind === "P") {
    return {
      prompt: `${obj} with a weight of ${show(F)} N rests on the ground. The area touching the ground is ${num(o.A)} ${aUnit}. Work out the pressure on the ground in ${unit}.`,
      answer: numAns(o.P, unit),
      solution: ["Pressure = force ÷ area", `= ${show(F)} ÷ ${num(o.A)} = ${show(o.P)} ${unit}`],
      hint: `Pressure is the force on each 1 ${aUnit}.`,
      traps: numTraps(o.P, [
        [o.A / F, "That is area ÷ force. Pressure = force ÷ area."],
        [F * o.A, "Pressure = force ÷ area, so divide."],
      ]),
    };
  }
  if (kind === "F") {
    return {
      prompt: `${obj} presses on the ground with a pressure of ${show(o.P)} ${unit}. The area touching the ground is ${num(o.A)} ${aUnit}. Work out its weight (the force) in newtons.`,
      answer: numAns(F, "N"),
      solution: ["Force = pressure × area", `= ${show(o.P)} × ${num(o.A)} = ${show(F)} N`],
      hint: `Each 1 ${aUnit} has a force of ${show(o.P)} N on it.`,
      traps: numTraps(F, [
        [o.P / o.A, "Force = pressure × area, so multiply."],
        [o.A / o.P, "Force = pressure × area, so multiply."],
      ]),
    };
  }
  return {
    prompt: `A force of ${show(F)} N produces a pressure of ${show(o.P)} ${unit}. What area is the force acting on? Give your answer in ${aUnit}.`,
    answer: numAns(o.A, aUnit),
    solution: ["Area = force ÷ pressure", `= ${show(F)} ÷ ${show(o.P)} = ${num(o.A)} ${aUnit}`],
    hint: `Each 1 ${aUnit} takes ${show(o.P)} N. How many lots of ${show(o.P)} N make ${show(F)} N?`,
    traps: numTraps(o.A, [
      [F * o.P, "Area = force ÷ pressure, so divide."],
      [o.P / F, "That is pressure ÷ force. Area = force ÷ pressure."],
    ]),
  };
}

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  {
    id: `${T}.metric-convert`,
    topicId: T,
    title: "Convert metric units of length, mass and capacity",
    level: 1,
    guideRef: "metric-units",
    generate(rng, tier) {
      if (tier === 1) return metricBasic(rng, 1);
      if (tier === 2) return rng.bool(0.75) ? metricBasic(rng, 2) : rng.pick([metricMassSum, metricJuice])(rng);
      return rng.pick([metricMassSum, metricRibbon, metricJuice, metricTwoStep, (r: Rng) => metricBasic(r, 3)])(rng);
    },
  },
  {
    id: `${T}.miles-km`,
    topicId: T,
    title: "Convert between miles and kilometres",
    level: 1,
    guideRef: "imperial-units",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.6)) return imperialOther(rng);
      const nm = rng.pick(NAMES);
      const useFive = rng.bool();
      const fact = useFive ? "5 miles ≈ 8 km" : "1 mile ≈ 1.6 km";
      if (rng.bool()) {
        const miles = tier === 1 ? rng.int(2, 20) * 5 : find(() => rng.int(3, 150), (x) => x % 5 !== 0, 13);
        const km = clean((miles * 8) / 5);
        const ctx = rng.pick([
          `A road sign in Scotland says Edinburgh is ${miles} miles away.`,
          `${nm}'s family drives ${miles} miles on a holiday in England.`,
          `A cycle route in the USA is ${miles} miles long.`,
          `A charity walk in London is ${miles} miles long.`,
        ]);
        const steps = miles % 5 === 0
          ? [`${miles} miles is ${miles} ÷ 5 = ${miles / 5} lots of 5 miles.`, `${miles / 5} × 8 = ${km}, so ${miles} miles ≈ ${km} km.`]
          : [`${useFive ? "5 miles ≈ 8 km, so 1 mile ≈ 8 ÷ 5 = 1.6 km." : "1 mile ≈ 1.6 km, so multiply by 1.6."}`, `${miles} × 1.6 = ${num(km)}, so ${miles} miles ≈ ${num(km)} km.`];
        return {
          prompt: `${ctx} Use ${fact} to estimate this distance in kilometres.`,
          answer: numAns(km, "km"),
          solution: steps,
          hint: "A kilometre is shorter than a mile, so the km number should be bigger.",
          traps: numTraps(km, [[(miles * 5) / 8, "You divided. A kilometre is shorter than a mile, so there are MORE km than miles."]]),
        };
      }
      const km = tier === 1 ? rng.int(2, 20) * 8 : find(() => rng.int(5, 100) * 2, (x) => x % 8 !== 0, 20);
      const miles = clean((km * 5) / 8);
      const ctx = rng.pick([
        `${nm} runs ${km} km in a charity run.`,
        `The drive from ${nm}'s home to the airport is ${km} km.`,
        `A cycling route around an island is ${km} km long.`,
        `A train line is ${km} km long.`,
      ]);
      const steps = km % 8 === 0
        ? [`${km} km is ${km} ÷ 8 = ${km / 8} lots of 8 km.`, `${km / 8} × 5 = ${miles}, so ${km} km ≈ ${miles} miles.`]
        : [`${useFive ? "5 miles ≈ 8 km, so 1 mile ≈ 1.6 km." : "1 mile ≈ 1.6 km"}: divide the km by 1.6.`, `${km} ÷ 1.6 = ${num(miles)}, so ${km} km ≈ ${num(miles)} miles.`];
      return {
        prompt: `${ctx} Use ${fact} to estimate this distance in miles.`,
        answer: numAns(miles, "miles"),
        solution: steps,
        hint: "A mile is longer than a kilometre, so the miles number should be smaller.",
        traps: numTraps(miles, [[(km * 8) / 5, "You multiplied. A mile is longer than a kilometre, so there are FEWER miles than km."]]),
      };
    },
  },
  {
    id: `${T}.time-durations`,
    topicId: T,
    title: "Work out time intervals with the 24-hour clock",
    level: 1,
    guideRef: "time",
    generate(rng, tier) {
      return durationItem(rng, tier);
    },
  },
  {
    id: `${T}.speed-distance-time`,
    topicId: T,
    title: "Use speed = distance ÷ time",
    level: 1,
    guideRef: "speed",
    generate(rng, tier) {
      return sdtItem(rng, tier);
    },
  },
  {
    id: `${T}.area-units`,
    topicId: T,
    title: "Convert area units (cm², m², mm²)",
    level: 2,
    guideRef: "area-volume-units",
    generate(rng, tier) {
      if (tier === 3) return rng.pick([areaRectCm, areaRectM, (r: Rng) => areaBasic(r, 3)])(rng);
      return areaBasic(rng, tier);
    },
  },
  {
    id: `${T}.volume-capacity`,
    topicId: T,
    title: "Convert volume units and find capacity in litres",
    level: 2,
    guideRef: "area-volume-units",
    generate(rng, tier) {
      if (tier === 1) return rng.pick([volCm3ToL, volLToCm3, volCuboid])(rng, 1);
      if (tier === 2) return rng.pick([(r: Rng) => volCm3ToL(r, 2), (r: Rng) => volLToCm3(r, 2), volM3ToL, volLToM3, (r: Rng) => volCuboid(r, 2)])(rng);
      return rng.pick([(r: Rng) => volCuboid(r, 3), volCuboidMixed, volM3ToCm3, volCups, volM3ToL])(rng);
    },
  },
  {
    id: `${T}.decimal-hours`,
    topicId: T,
    title: "Change between hours and minutes and decimal hours",
    level: 2,
    guideRef: "time",
    generate(rng, tier) {
      return decimalHoursItem(rng, tier);
    },
  },
  {
    id: `${T}.kmh-ms`,
    topicId: T,
    title: "Convert speeds between km/h and m/s",
    level: 2,
    guideRef: "speed",
    generate(rng, tier) {
      return kmhMsItem(rng, tier);
    },
  },
  {
    id: `${T}.density`,
    topicId: T,
    title: "Use density = mass ÷ volume",
    level: 2,
    guideRef: "density-and-rates",
    generate(rng, tier) {
      return densityItem(rng, tier);
    },
  },
  {
    id: `${T}.unit-rates`,
    topicId: T,
    title: "Work out unit prices and compare rates",
    level: 2,
    guideRef: "density-and-rates",
    generate(rng, tier) {
      return ratesItem(rng, tier);
    },
  },
  {
    id: `${T}.conversion-graph`,
    topicId: T,
    title: "Read a conversion graph",
    level: 2,
    guideRef: "conversion-graphs",
    generate(rng, tier) {
      return conversionGraphItem(rng, tier);
    },
  },
  {
    id: `${T}.average-speed`,
    topicId: T,
    title: "Find the average speed for a journey in two parts",
    level: 3,
    guideRef: "speed",
    generate(rng, tier) {
      return averageSpeedItem(rng, tier);
    },
  },
  {
    id: `${T}.pressure`,
    topicId: T,
    title: "Use pressure = force ÷ area",
    level: 3,
    guideRef: "pressure",
    generate(rng, tier) {
      return pressureItem(rng, tier);
    },
  },
];
