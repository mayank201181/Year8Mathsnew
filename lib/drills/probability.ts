// Procedural skill drills for the "probability" topic.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, num, clean, roundTo, simplify } from "./helpers.ts";

// ---------------------------------------------------------------------------
// Local helpers
// ---------------------------------------------------------------------------

type Tier = 1 | 2 | 3;

/** Fraction answer in simplest form. */
function fs(n: number, d: number): AnswerSpec {
  const [a, b] = simplify(n, d);
  return { type: "fraction", n: a, d: b, simplest: true };
}

/** "{{6/36}} = {{1/6}}" (or just "{{5/36}}" when it is already simplest). */
function fShow(n: number, d: number): string {
  return gcd(n, d) > 1 ? `${frac(n, d, { simplify: false })} = ${frac(n, d)}` : frac(n, d, { simplify: false });
}

function sameFrac(a: number, b: number, c: number, d: number): boolean {
  return a * d === b * c;
}

/** A fraction trap, dropped if it equals the real answer or is meaningless. */
function fTrap(n: number, d: number, ansN: number, ansD: number, feedback: string): Trap[] {
  if (!Number.isInteger(n) || !Number.isInteger(d) || d <= 0 || n <= 0 || sameFrac(n, d, ansN, ansD)) return [];
  return [{ spec: { type: "fraction", n, d, allowDecimal: true }, feedback }];
}

/** A number trap, dropped if it equals the real answer. */
function nTrap(v: number, ans: number, feedback: string): Trap[] {
  const c = clean(v);
  if (!Number.isFinite(c) || c <= 0 || Math.abs(c - ans) < 1e-9) return [];
  return [{ spec: { type: "number", value: c }, feedback }];
}

/** Decimal answer (fractions not accepted). */
function decSpec(v: number): AnswerSpec {
  return { type: "number", value: clean(v), allowFraction: false };
}

function listAnd(xs: Array<string | number>): string {
  const s = xs.map(String);
  if (s.length <= 1) return s.join("");
  return s.slice(0, -1).join(", ") + " and " + s[s.length - 1];
}

function cap(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function range(a: number, b: number): number[] {
  const out: number[] = [];
  for (let i = a; i <= b; i++) out.push(i);
  return out;
}

function isPrimeN(n: number): boolean {
  if (n < 2) return false;
  for (let p = 2; p * p <= n; p++) if (n % p === 0) return false;
  return true;
}

function isSquare(n: number): boolean {
  const r = Math.round(Math.sqrt(n));
  return r * r === n;
}

const SIMPLEST = " Give your answer as a fraction in its simplest form.";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"];

// ---------------------------------------------------------------------------
// 1. Single events
// ---------------------------------------------------------------------------

function bagEvent(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick([
    { item: "counters", one: "counter", where: "A bag holds", colours: ["red", "blue", "green", "yellow", "white"] },
    { item: "marbles", one: "marble", where: "A box contains", colours: ["red", "blue", "green", "purple", "orange"] },
    { item: "sweets", one: "sweet", where: "A jar contains", colours: ["red", "green", "yellow", "purple", "orange"] },
    { item: "pens", one: "pen", where: "Zara's pencil case holds", colours: ["black", "blue", "red", "green"] },
  ]);
  const nCol = tier === 1 ? 3 : rng.pick([3, 4]);
  const cols = rng.shuffle(ctx.colours).slice(0, nCol);
  const max = tier === 1 ? 9 : tier === 2 ? 15 : 20;
  let counts: number[] = [1, 1, 1];
  let q = "single";
  let target = 0, other = 1, add = 2, fav = 1, tot = 3, T = 3;
  for (let i = 0; i < 100; i++) {
    counts = cols.map(() => rng.int(tier === 1 ? 1 : 2, max));
    T = counts.reduce((a, b) => a + b, 0);
    q = tier === 1 ? "single" : tier === 2 ? rng.pick(["single", "not", "or"]) : rng.pick(["not", "or", "add"]);
    target = rng.int(0, nCol - 1);
    other = (target + rng.int(1, nCol - 1)) % nCol;
    add = rng.int(2, 6);
    if (q === "single") { fav = counts[target]; tot = T; }
    else if (q === "not") { fav = T - counts[target]; tot = T; }
    else if (q === "or") { fav = counts[target] + counts[other]; tot = T; }
    else { fav = counts[target] + add; tot = T + add; }
    if (fav > 0 && fav < tot && (gcd(fav, tot) > 1 || rng.bool(0.4))) break;
  }
  const c = cols[target], c2 = cols[other];
  const stock = `${ctx.where} ${listAnd(cols.map((col, i) => `${counts[i]} ${col}`))} ${ctx.item}.`;
  const sumLine = `Total number of ${ctx.item}: ${counts.join(" + ")} = ${T}.`;
  let prompt: string;
  let solution: string[];
  let traps: Trap[] = [];
  const [an, ad] = simplify(fav, tot);
  if (q === "single") {
    prompt = `${stock} One ${ctx.one} is taken out at random. Find the probability that it is ${c}.${SIMPLEST}`;
    solution = [sumLine, `Number of ${c} ${ctx.item}: ${fav}.`, `P(${c}) = ${fShow(fav, tot)}`];
    traps = fTrap(fav, tot - fav, an, ad, `That compares ${c} with not-${c}, like a ratio. A probability divides by the **total** number of ${ctx.item}.`);
  } else if (q === "not") {
    prompt = `${stock} One ${ctx.one} is taken out at random. Find the probability that it is **not** ${c}.${SIMPLEST}`;
    solution = [sumLine, `Not ${c}: ${T} − ${counts[target]} = ${fav}.`, `P(not ${c}) = ${fShow(fav, tot)}`];
    traps = fTrap(counts[target], T, an, ad, `That's the probability that it IS ${c}. You want the ones that are not ${c}.`);
  } else if (q === "or") {
    prompt = `${stock} One ${ctx.one} is taken out at random. Find the probability that it is ${c} or ${c2}.${SIMPLEST}`;
    solution = [sumLine, `${cap(c)} or ${c2}: ${counts[target]} + ${counts[other]} = ${fav}.`, `P(${c} or ${c2}) = ${fShow(fav, tot)}`];
    traps = fTrap(fav, tot - fav, an, ad, `That compares the ones you want with the rest, like a ratio. A probability divides by the **total** number of ${ctx.item}.`);
  } else {
    prompt = `${stock} First, ${add} more ${c} ${ctx.item} are put in. Then one ${ctx.one} is taken out at random. Find the probability that it is ${c}.${SIMPLEST}`;
    solution = [
      sumLine,
      `After adding ${add} more: ${c} ${ctx.item} = ${counts[target]} + ${add} = ${fav}, total = ${T} + ${add} = ${tot}.`,
      `P(${c}) = ${fShow(fav, tot)}`,
    ];
    traps = [
      ...fTrap(fav, T, an, ad, `Adding ${ctx.item} changes the total as well — the new total is ${tot}.`),
      ...fTrap(counts[target], T, an, ad, `That was the probability before the extra ${ctx.item} were added.`),
    ];
  }
  return {
    prompt,
    answer: fs(fav, tot),
    solution,
    hint: "Probability = number of outcomes you want ÷ total number of equally likely outcomes.",
    traps,
  };
}

interface CardProp {
  label: string;
  test: (x: number) => boolean;
  kind: "plain" | "prime" | "gt" | "lt" | "or";
  m?: number;
  a?: number;
  b?: number;
  /** How to count without listing (used when there are too many to list). */
  explain?: (N: number, c: number) => string;
}

/** "k, 2k, …, last — that's q numbers" for an arithmetic run starting at `first`. */
function runText(first: number, step: number, N: number): string {
  const q = Math.floor((N - first) / step) + 1;
  const last = first + (q - 1) * step;
  return `${first}, ${first + step}, ${first + 2 * step}, …, ${last} — that's ${q} numbers`;
}

function cardEvent(rng: Rng, tier: Tier): DrillItem {
  let N = 10;
  let prop: CardProp = { label: "even", test: (x) => x % 2 === 0, kind: "plain" };
  let favList: number[] = [];
  for (let i = 0; i < 100; i++) {
    N = tier === 1 ? rng.pick([10, 12, 15, 20]) : tier === 2 ? rng.int(15, 30) : rng.int(25, 50);
    const k = rng.pick([3, 4, 5, 6]);
    const m = rng.int(3, N - 3);
    const F = rng.pick([12, 18, 20, 24, 30, 36]);
    const pairs: Array<[number, number]> = [[2, 3], [2, 5], [3, 4], [3, 5], [4, 5], [4, 6], [5, 6]];
    const [pa, pb] = rng.pick(pairs);
    const props: CardProp[] = [
      { label: "even", test: (x) => x % 2 === 0, kind: "plain", explain: (n) => `${runText(2, 2, n)}.` },
      { label: "odd", test: (x) => x % 2 === 1, kind: "plain", explain: (n) => `${runText(1, 2, n)}.` },
      { label: `a multiple of ${k}`, test: (x) => x % k === 0, kind: "plain", explain: (n) => `${runText(k, k, n)}.` },
      { label: `greater than ${m}`, test: (x) => x > m, kind: "gt", m },
      { label: `less than ${m}`, test: (x) => x < m, kind: "lt", m },
    ];
    if (tier >= 2) {
      props.push(
        { label: "a prime number", test: isPrimeN, kind: "prime" },
        { label: "a square number", test: isSquare, kind: "plain" },
        { label: `a factor of ${F}`, test: (x) => F % x === 0, kind: "plain" },
      );
    }
    if (tier === 3) {
      props.push(
        {
          label: `a multiple of ${pa} or a multiple of ${pb}`, test: (x) => x % pa === 0 || x % pb === 0, kind: "or", a: pa, b: pb,
          explain: (n, c) => {
            const l = (pa * pb) / gcd(pa, pb);
            const qa = Math.floor(n / pa), qb = Math.floor(n / pb), qab = Math.floor(n / l);
            return `${qa} multiples of ${pa} and ${qb} multiples of ${pb}, but the ${qab} multiples of ${l} are in both lists, so ${qa} + ${qb} − ${qab} = ${c} numbers.`;
          },
        },
        { label: `even and greater than ${m}`, test: (x) => x % 2 === 0 && x > m, kind: "plain", explain: (n) => `${runText(m % 2 === 0 ? m + 2 : m + 1, 2, n)}.` },
        { label: `**not** a multiple of ${k}`, test: (x) => x % k !== 0, kind: "plain", explain: (n, c) => `there are ${Math.floor(n / k)} multiples of ${k} (${k}, ${2 * k}, …, ${k * Math.floor(n / k)}), so ${n} − ${Math.floor(n / k)} = ${c} numbers are not.` },
      );
    }
    prop = tier === 3 ? rng.pick(props.slice(5).concat(props.slice(0, 5).filter(() => rng.bool(0.3)))) : rng.pick(props);
    favList = range(1, N).filter(prop.test);
    if (favList.length >= 2 && favList.length < N) break;
  }
  const c = favList.length;
  const [an, ad] = simplify(c, N);
  const intro = rng.pick([
    `Cards numbered 1 to ${N} are shuffled and one card is picked at random.`,
    `A fair spinner has ${N} equal sections numbered 1 to ${N}. It is spun once.`,
    `Raffle tickets numbered 1 to ${N} are put in a box, and Priya draws one at random.`,
  ]);
  const plainLabel = prop.label.replace(/\*\*/g, "");
  const listed = c <= 15 ? `${listAnd(favList)} — that's ${c} numbers.` : prop.explain ? prop.explain(N, c) : `there are ${c} of them.`;
  const solution = [
    `There are ${N} equally likely numbers.`,
    prop.kind === "gt"
      ? `Greater than ${prop.m} means ${prop.m! + 1} up to ${N}: ${N} − ${prop.m} = ${c} numbers.`
      : prop.kind === "lt"
        ? `Less than ${prop.m} means 1 up to ${prop.m! - 1}: ${c} numbers.`
        : `Numbers that are ${plainLabel}: ${listed}`,
    `P = ${fShow(c, N)}`,
  ];
  let traps: Trap[] = [];
  if (prop.kind === "prime") traps = fTrap(c + 1, N, an, ad, "1 is **not** a prime number — it has only one factor.");
  if (prop.kind === "gt") traps = fTrap(c + 1, N, an, ad, `"Greater than ${prop.m}" does not include ${prop.m} itself.`);
  if (prop.kind === "lt") traps = fTrap(c + 1, N, an, ad, `"Less than ${prop.m}" does not include ${prop.m} itself.`);
  if (prop.kind === "or") {
    const ca = range(1, N).filter((x) => x % prop.a! === 0).length;
    const cb = range(1, N).filter((x) => x % prop.b! === 0).length;
    traps = fTrap(ca + cb, N, an, ad, `Numbers that are multiples of both ${prop.a} and ${prop.b} were counted twice — count each number only once.`);
  }
  return {
    prompt: `${intro} Find the probability that the number is ${prop.label}.${SIMPLEST}`,
    answer: fs(c, N),
    solution,
    hint: "List the numbers that work, count them, then divide by how many numbers there are altogether.",
    traps,
  };
}

const WORDS = ["SINGAPORE", "MATHEMATICS", "STATISTICS", "PERCENTAGE", "DURIAN", "SENTOSA", "CALCULATOR", "MANGOSTEEN", "PINEAPPLE", "MISSISSIPPI", "BANANA", "PROBABILITIES", "ASSESSMENT", "RAMBUTAN"];

function letterEvent(rng: Rng, tier: Tier): DrillItem {
  const W = rng.pick(WORDS);
  const letters = W.split("");
  const L = letters.length;
  const vowels = letters.filter((ch) => "AEIOU".includes(ch));
  const v = vowels.length;
  const kind = rng.pick(tier === 3 ? ["consonant", "letter", "letter"] : ["vowel", "consonant", "letter"]);
  let fav: number;
  let ev: string;
  let solution: string[];
  let traps: Trap[] = [];
  if (kind === "letter") {
    const distinct = Array.from(new Set(letters));
    const repeated = distinct.filter((ch) => letters.filter((x) => x === ch).length > 1);
    const X = repeated.length && rng.bool(0.7) ? rng.pick(repeated) : rng.pick(distinct);
    fav = letters.filter((x) => x === X).length;
    ev = `the letter ${X}`;
    solution = [
      `**${W}** has ${L} letters, so there are ${L} cards.`,
      `The letter ${X} appears ${fav} time${fav === 1 ? "" : "s"}.`,
      `P(${X}) = ${fShow(fav, L)}`,
    ];
    const [an, ad] = simplify(fav, L);
    if (fav > 1) traps = fTrap(1, L, an, ad, `There are ${fav} cards with ${X} on them — count every one.`);
    if (fav < distinct.length) traps = traps.concat(fTrap(fav, distinct.length, an, ad, `Count cards, not different letters: there are ${L} cards in total.`));
  } else if (kind === "vowel") {
    fav = v;
    ev = "a vowel (A, E, I, O or U)";
    solution = [
      `**${W}** has ${L} letters, so there are ${L} cards.`,
      `Vowel cards: ${vowels.join(", ")} — that's ${v}.`,
      `P(vowel) = ${fShow(v, L)}`,
    ];
    const [an, ad] = simplify(v, L);
    traps = fTrap(L - v, L, an, ad, "That's the probability of a consonant. Count the vowel cards.");
  } else {
    fav = L - v;
    ev = "a consonant (any letter except A, E, I, O and U)";
    solution = [
      `**${W}** has ${L} letters, so there are ${L} cards.`,
      `Vowel cards: ${vowels.join(", ")} — that's ${v}, so there are ${L} − ${v} = ${fav} consonant cards.`,
      `P(consonant) = ${fShow(fav, L)}`,
    ];
    const [an, ad] = simplify(fav, L);
    traps = fTrap(v, L, an, ad, "That's the probability of a vowel. You want the consonants.");
  }
  return {
    prompt: `Each letter of the word **${W}** is written on its own card. The cards are shuffled and one is picked at random. Find the probability that the card shows ${ev}.${SIMPLEST}`,
    answer: fs(fav, L),
    solution,
    hint: "Count every card, including repeated letters. That total goes on the bottom of the fraction.",
    traps,
  };
}

// ---------------------------------------------------------------------------
// 2. Complement
// ---------------------------------------------------------------------------

// ev / notFull introduce the situation; evShort / not refer back to it.
const COMPLEMENTS = [
  { ev: "it rains on a given afternoon in Singapore", not: "it does **not** rain that afternoon", notFull: "it does **not** rain on a given afternoon in Singapore", evShort: "it rains that afternoon" },
  { ev: "Marcus's MRT train is late", not: "his train is **not** late", notFull: "Marcus's MRT train is **not** late", evShort: "his train is late" },
  { ev: "Hana scores from a penalty", not: "she does **not** score", notFull: "Hana does **not** score from a penalty", evShort: "she scores" },
  { ev: "a seed from this packet germinates", not: "the seed does **not** germinate", notFull: "a seed from this packet does **not** germinate", evShort: "the seed germinates" },
  { ev: "a durian from this stall is ripe", not: "the durian is **not** ripe", notFull: "a durian from this stall is **not** ripe", evShort: "the durian is ripe" },
  { ev: "Ravi's team wins their next match", not: "the team does **not** win", notFull: "Ravi's team does **not** win their next match", evShort: "the team wins" },
  { ev: "a student picked at random from the school cycles to school", not: "the student does **not** cycle to school", notFull: "a student picked at random from the school does **not** cycle to school", evShort: "the student cycles to school" },
  { ev: "Mei is picked for the debate team", not: "she is **not** picked", notFull: "Mei is **not** picked for the debate team", evShort: "she is picked" },
  { ev: "the school bus arrives on time", not: "it does **not** arrive on time", notFull: "the school bus does **not** arrive on time", evShort: "it arrives on time" },
];

/** The "no exchange" slip: 1 − 0.35 → 0.75 (each column 10 − digit). Only for 2 d.p. values. */
function noBorrowSlip(hundredths: number): number | null {
  const t = Math.floor(hundredths / 10), h = hundredths % 10;
  if (h === 0 || t === 0) return null;
  return clean((10 - t) / 10 + (10 - h) / 100);
}

function complementDrill(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick(COMPLEMENTS);
  const mode = tier === 1
    ? rng.pick(["tenths", "fives"])
    : tier === 2
      ? rng.pick(["hundredths", "hundredths", "fraction", "percent"])
      : rng.pick(["reverse", "thousandths", "fraction", "percentHalf", "diff"]);
  const hintText = "The event either happens or it doesn't, so the two probabilities add up to 1.";

  if (mode === "fraction") {
    let a = 1, b = 3;
    for (let i = 0; i < 100; i++) {
      b = tier === 2 ? rng.int(3, 12) : rng.int(9, 25);
      a = rng.int(1, b - 1);
      if (gcd(a, b) === 1 && 2 * a !== b) break;
    }
    const reverse = tier === 3 && rng.bool();
    const [given, want] = reverse ? [ctx.notFull, ctx.evShort] : [ctx.ev, ctx.not];
    return {
      prompt: `The probability that ${given} is ${frac(a, b)}. Find the probability that ${want}.${SIMPLEST}`,
      answer: fs(b - a, b),
      solution: [
        "The two probabilities add up to 1.",
        `1 − ${frac(a, b)} = ${frac(b, b, { simplify: false })} − ${frac(a, b)} = ${frac(b - a, b)}`,
      ],
      hint: hintText,
      traps: fTrap(a, b, b - a, b, "That's the probability you were given. Subtract it from 1."),
    };
  }

  if (mode === "percent" || mode === "percentHalf") {
    // Work in tenths of a percent so 12.5% is exact.
    let k10 = 350;
    for (let i = 0; i < 100; i++) {
      k10 = mode === "percent" ? rng.int(1, 99) * 10 : rng.int(1, 199) * 5;
      if (k10 !== 500 && (mode === "percent" || k10 % 10 !== 0)) break;
    }
    const p = clean(k10 / 10), ans = clean((1000 - k10) / 10);
    return {
      prompt: `The probability that ${ctx.ev} is ${num(p)}%. Find the probability that ${ctx.not}. Give your answer as a percentage.`,
      answer: { type: "number", value: ans, display: `${num(ans)}%` },
      solution: ["Certain = 100%, and the two probabilities add up to 100%.", `100% − ${num(p)}% = ${num(ans)}%`],
      hint: "As percentages, an event and its complement add up to 100%.",
      traps: [
        ...nTrap(p, ans, "That's the probability you were given. Subtract it from 100%."),
        ...nTrap(ans / 100, ans, `The question asks for a percentage: write ${num(ans / 100)} as ${num(ans)}%.`),
      ],
    };
  }

  if (mode === "diff") {
    const j = rng.int(5, 40); // difference = 2j hundredths
    const d = clean((2 * j) / 100);
    const ans = clean((50 + j) / 100);
    return {
      prompt: `The probability that ${ctx.ev} is ${num(d)} **more** than the probability that ${ctx.not}. Find the probability that ${ctx.evShort}. Give your answer as a decimal.`,
      answer: decSpec(ans),
      solution: [
        "Call the two probabilities P(yes) and P(no). They add up to 1, and P(yes) − P(no) = " + num(d) + ".",
        `Add the two facts: 2 × P(yes) = 1 + ${num(d)} = ${num(1 + d)}.`,
        `P(yes) = ${num(1 + d)} ÷ 2 = ${num(ans)}. Check: P(no) = ${num(clean(1 - ans))}, and ${num(ans)} − ${num(clean(1 - ans))} = ${num(d)}.`,
      ],
      hint: "Two unknowns that add to 1 and differ by a known amount — try a bar model, or guess and check.",
      traps: [
        ...nTrap(clean(1 - d), ans, `${num(d)} is the *difference* between the two probabilities, not one of them — so 1 − ${num(d)} isn't right.`),
        ...nTrap(clean((50 - j) / 100), ans, "That's the smaller probability — the event is the more likely one."),
      ],
    };
  }

  // Decimal modes.
  let given = 30, scale = 100;
  for (let i = 0; i < 100; i++) {
    if (mode === "tenths") { given = rng.int(1, 9) * 10; scale = 100; }
    else if (mode === "fives") { given = rng.int(1, 19) * 5; scale = 100; }
    else if (mode === "hundredths" || mode === "reverse") { given = rng.int(1, 99); scale = 100; }
    else { given = rng.int(1, 999); scale = 1000; }
    if (2 * given === scale) continue;
    if (mode === "fives" && given % 10 === 0) continue;
    if (mode === "hundredths" && given % 10 === 0) continue;
    if (mode === "thousandths" && given % 10 === 0) continue;
    break;
  }
  const p = clean(given / scale), ans = clean((scale - given) / scale);
  const reverse = mode === "reverse";
  const [gv, want] = reverse ? [ctx.notFull, ctx.evShort] : [ctx.ev, ctx.not];
  const traps: Trap[] = [...nTrap(p, ans, "That's the probability you were given. Subtract it from 1.")];
  if (scale === 100) {
    const slip = noBorrowSlip(given);
    if (slip !== null && Math.abs(slip - p) > 1e-9) traps.push(...nTrap(slip, ans, `Check the subtraction: line up the decimal points and exchange — 1.00 − ${num(p)} = ${num(ans)}. Adding your answer to ${num(p)} should give exactly 1.`));
  }
  return {
    prompt: `The probability that ${gv} is ${num(p)}. Find the probability that ${want}. Give your answer as a decimal.`,
    answer: decSpec(ans),
    solution: [
      "The event either happens or it doesn't, so the two probabilities add up to 1.",
      `1 − ${num(p)} = ${num(ans)}`,
      `Check: ${num(ans)} + ${num(p)} = 1 ✓`,
    ],
    hint: hintText,
    traps: traps.slice(0, 2),
  };
}

// ---------------------------------------------------------------------------
// 3. Product rule
// ---------------------------------------------------------------------------

const MAINS = ["roti prata", "vegetable fried rice", "mee goreng", "chapati with dhal", "tofu noodle soup"];
const DRINKS = ["kopi", "teh tarik", "bandung", "lime juice", "sugarcane juice", "barley water"];

function productRule(rng: Rng, tier: Tier): DrillItem {
  const kinds = tier === 1 ? ["mealList", "outfit", "code", "coinDice"] : tier === 2 ? ["meal3", "outfit", "code", "cca", "coinDice"] : ["back", "noRepeat", "letterCode", "code", "meal3"];
  const kind = rng.pick(kinds);
  const hint = "For each choice at the first stage, every choice at the next stage is possible — so multiply.";
  const sumTrap = (parts: number[], ans: number) =>
    nTrap(parts.reduce((a, b) => a + b, 0), ans, "Adding counts the options, not the combinations. Each choice pairs with every other choice, so multiply.");

  if (kind === "mealList") {
    const a = rng.int(2, 4), b = rng.int(2, 5);
    const mains = rng.shuffle(MAINS).slice(0, a), drinks = rng.shuffle(DRINKS).slice(0, b);
    const ans = a * b;
    return {
      prompt: `A hawker stall sells a meal deal: one main and one drink. The mains are ${listAnd(mains)}. The drinks are ${listAnd(drinks)}. How many different meal deals are possible?`,
      answer: { type: "number", value: ans },
      solution: [
        `List systematically: ${mains[0]} with each of the ${b} drinks gives ${b} deals.`,
        `Each of the ${a} mains gives ${b} deals, so ${a} × ${b} = ${ans}.`,
      ],
      hint,
      traps: sumTrap([a, b], ans),
    };
  }
  if (kind === "meal3") {
    const a = rng.int(3, 6), b = rng.int(3, 7), c = rng.int(2, 5);
    const ans = a * b * c;
    return {
      prompt: `A café's set lunch is one starter, one main and one dessert. There are ${a} starters, ${b} mains and ${c} desserts, all vegetarian. How many different set lunches can be chosen?`,
      answer: { type: "number", value: ans },
      solution: [`Product rule: multiply the number of choices at each stage.`, `${a} × ${b} × ${c} = ${ans}`],
      hint,
      traps: sumTrap([a, b, c], ans),
    };
  }
  if (kind === "outfit") {
    const three = tier >= 2 && rng.bool(0.6);
    const a = rng.int(2, tier === 1 ? 5 : 8), b = rng.int(2, tier === 1 ? 4 : 6), c = three ? rng.int(2, 4) : 1;
    const name = rng.pick(["Jun", "Arjun", "Wei Ling", "Siti", "Ethan", "Zara"]);
    const ans = a * b * c;
    return {
      prompt: `${name} packs ${a} T-shirts${three ? "," : " and"} ${b} pairs of shorts${three ? ` and ${c} caps` : ""} for a CCA camp. An outfit is one T-shirt${three ? "," : " and"} one pair of shorts${three ? " and one cap" : ""}. How many different outfits are possible?`,
      answer: { type: "number", value: ans },
      solution: three
        ? [`Each T-shirt goes with ${b} pairs of shorts: ${a} × ${b} = ${a * b} pairs.`, `Each of those goes with ${c} caps: ${a * b} × ${c} = ${ans}.`]
        : [`Each T-shirt goes with each of the ${b} pairs of shorts.`, `${a} × ${b} = ${ans}`],
      hint,
      traps: sumTrap(three ? [a, b, c] : [a, b], ans),
    };
  }
  if (kind === "cca") {
    const a = rng.int(3, 9), b = rng.int(3, 8), c = rng.int(2, 4);
    const ans = a * b * c;
    return {
      prompt: `Each student picks one sport (${a} choices), one club (${b} choices) and one language (${c} choices). How many different combinations are possible?`,
      answer: { type: "number", value: ans },
      solution: [`Multiply the choices at each stage.`, `${a} × ${b} × ${c} = ${ans}`],
      hint,
      traps: sumTrap([a, b, c], ans),
    };
  }
  if (kind === "coinDice") {
    const n = rng.pick([3, 4, 5, 8]);
    const setups = tier === 1
      ? [{ txt: "A coin is flipped and a dice is rolled.", parts: [2, 6] }, { txt: `A coin is flipped and a spinner with ${n} sections is spun.`, parts: [2, n] }, { txt: `A dice is rolled and a spinner with ${n} sections is spun.`, parts: [6, n] }]
      : [{ txt: "Two coins are flipped and a dice is rolled.", parts: [2, 2, 6] }, { txt: `A dice is rolled, a coin is flipped and a spinner with ${n} sections is spun.`, parts: [6, 2, n] }, { txt: "Two dice are rolled and a coin is flipped.", parts: [6, 6, 2] }];
    const s = rng.pick(setups);
    const ans = s.parts.reduce((x, y) => x * y, 1);
    return {
      prompt: `${s.txt} How many different outcomes are there in the sample space?`,
      answer: { type: "number", value: ans },
      solution: [`Count the outcomes of each part: ${listAnd(s.parts)}.`, `Product rule: ${s.parts.join(" × ")} = ${ans}`],
      hint,
      traps: sumTrap(s.parts, ans),
    };
  }
  if (kind === "code") {
    let k = 5, n = 2;
    if (tier === 1) { k = rng.int(3, 6); n = 2; }
    else if (tier === 2) { k = rng.int(4, 10); n = 3; }
    else { k = rng.int(3, 6); n = 4; }
    if (k === n) k++; // keep the "k × n" trap and its feedback unambiguous
    const ans = Math.pow(k, n);
    const digits = k === 10 ? "the digits 0 to 9" : `the digits 1 to ${k}`;
    return {
      prompt: `A lock has ${n} dials. Each dial shows ${digits}, and digits may repeat. How many different codes are possible?`,
      answer: { type: "number", value: ans },
      solution: [`Each of the ${n} dials has ${k} choices.`, `${Array(n).fill(k).join(" × ")} = ${ans}`],
      hint,
      traps: nTrap(k * n, ans, `Each dial *multiplies* the number of codes: that's ${k} × ${k} × …, not ${k} × ${n}.`),
    };
  }
  if (kind === "noRepeat") {
    const k = rng.int(5, 9);
    const ans = k * (k - 1) * (k - 2);
    return {
      prompt: `A 3-digit code uses the digits 1 to ${k}. No digit may be used more than once. How many different codes are possible?`,
      answer: { type: "number", value: ans },
      solution: [
        `First digit: ${k} choices. Second: ${k - 1} (one is used). Third: ${k - 2}.`,
        `${k} × ${k - 1} × ${k - 2} = ${ans}`,
      ],
      hint: "How many choices for the first digit? Once it's used, how many are left for the second?",
      traps: nTrap(k * k * k, ans, "Digits can't repeat, so there is one fewer choice at each stage."),
    };
  }
  if (kind === "letterCode") {
    const L = rng.int(3, 8);
    const last = String.fromCharCode(64 + L);
    const d = rng.pick([2, 3]);
    const ans = L * Math.pow(10, d);
    return {
      prompt: `A locker code is one letter from A to ${last}, followed by ${d} digits, each from 0 to 9 (digits may repeat). How many different locker codes are possible?`,
      answer: { type: "number", value: ans },
      solution: [`Letters: ${L} choices. Each digit: 10 choices.`, `${L} × ${Array(d).fill(10).join(" × ")} = ${ans}`],
      hint,
      traps: nTrap(L + 10 * d, ans, "Adding counts the options, not the codes. Multiply the choices at each position."),
    };
  }
  // "back": work backwards from the number of combinations.
  const ctxs = [
    { a: "drinks", b: "cakes", place: "A café offers" },
    { a: "mains", b: "desserts", place: "A hawker stall offers" },
    { a: "T-shirts", b: "pairs of shorts", place: "A shop's football kit comes in" },
  ];
  const ctx = rng.pick(ctxs);
  const a = rng.int(3, 9), b = rng.int(3, 12);
  const P = a * b;
  return {
    prompt: `${ctx.place} ${a} ${ctx.a} and some ${ctx.b}. Choosing one of each, there are ${P} different combinations. How many ${ctx.b} are there?`,
    answer: { type: "number", value: b },
    solution: [`Product rule: ${a} × (number of ${ctx.b}) = ${P}.`, `Work backwards: ${P} ÷ ${a} = ${b}.`],
    hint: "Combinations = choices × choices. Undo the multiplication.",
    traps: nTrap(P - a, b, "Combinations multiply, so undo with division, not subtraction."),
  };
}

// ---------------------------------------------------------------------------
// 4. Missing probabilities (mutually exclusive outcomes add to 1)
// ---------------------------------------------------------------------------

function listOr(xs: Array<string | number>): string {
  const s = xs.map(String);
  if (s.length <= 1) return s.join("");
  return s.slice(0, -1).join(", ") + " or " + s[s.length - 1];
}

const lc = (s: string) => s.toLowerCase();
const WAY: Record<string, string> = { MRT: "by MRT", Bus: "by bus", Car: "by car", Walk: "on foot" };

interface TableCtx {
  head: string;
  labels: string[];
  intro: (l: string[]) => string;
  ev: (l: string[]) => string;
  notEv: (x: string) => string;
  noun: (x: string) => string;
}

const TABLE_CTXS: TableCtx[] = [
  {
    head: "Colour", labels: ["Red", "Blue", "Green", "Yellow"],
    intro: (l) => `A biased spinner can land on ${listOr(l.map(lc))}. The table shows the probability of each colour.`,
    ev: (l) => `the spinner lands on ${listOr(l.map(lc))}`,
    notEv: (x) => `the spinner does **not** land on ${lc(x)}`,
    noun: (x) => `landing on ${lc(x)}`,
  },
  {
    head: "Way", labels: ["MRT", "Bus", "Car", "Walk"],
    intro: (l) => `Wei Ling gets to school ${listOr(l.map((x) => WAY[x]))}. The table shows the probability of each way.`,
    ev: (l) => `she goes ${listOr(l.map((x) => WAY[x]))}`,
    notEv: (x) => `she does **not** go ${WAY[x]}`,
    noun: (x) => `going ${WAY[x]}`,
  },
  {
    head: "Flavour", labels: ["Lemon", "Orange", "Mango", "Lime"],
    intro: (l) => `A jar holds sweets in ${l.length === 3 ? "three" : "four"} flavours: ${listAnd(l.map(lc))}. One sweet is taken at random. The table shows the probability of each flavour.`,
    ev: (l) => `the sweet is ${listOr(l.map(lc))}`,
    notEv: (x) => `the sweet is **not** ${lc(x)}`,
    noun: (x) => `getting ${lc(x)}`,
  },
  {
    head: "Score", labels: ["1", "2", "3", "4", "5", "6"],
    intro: () => "A biased dice is rolled. The table shows the probability of each score.",
    ev: (l) => `the dice shows ${listOr(l)}`,
    notEv: (x) => `the dice does **not** show ${x}`,
    noun: (x) => `a score of ${x}`,
  },
];

function missingProb(rng: Rng, tier: Tier): DrillItem {
  let ctx = TABLE_CTXS[0];
  let labs: string[] = ctx.labels;
  let n = 3;
  let vals: number[] = [];
  let mi = 0, mj = 1, k = 1;
  const kind = tier === 1 ? "find" : tier === 2 ? rng.pick(["find", "find", "or"]) : rng.pick(["ratio", "ratio", "ratioNot"]);
  for (let it = 0; it < 200; it++) {
    ctx = rng.pick(tier === 1 ? TABLE_CTXS.slice(0, 3) : TABLE_CTXS);
    n = ctx.labels.length === 6 ? 6 : tier === 1 ? 3 : 4;
    const drop = n < ctx.labels.length ? rng.int(0, ctx.labels.length - 1) : -1;
    labs = ctx.labels.filter((_, i) => i !== drop);
    const step = tier === 1 ? 10 : rng.pick([5, 1]);
    const lo = step === 10 ? 10 : 5;
    vals = [];
    for (let i = 0; i < n; i++) vals.push(Math.round(rng.int(lo, n === 6 ? 25 : 45) / step) * step);
    mi = rng.int(0, n - 1);
    mj = (mi + rng.int(1, n - 1)) % n;
    k = rng.pick([1, 2, 3]);
    if (kind === "ratio" || kind === "ratioNot") {
      // vals[mi] = x, vals[mj] = k·x, the rest are given.
      const rest = vals.reduce((s, v, i) => (i === mi || i === mj ? s : s + v), 0);
      const R = 100 - rest;
      if (R <= 0 || R % (k + 1) !== 0) continue;
      const x = R / (k + 1);
      if (x < 5) continue;
      vals[mi] = x;
      vals[mj] = k * x;
      break;
    } else {
      const rest = vals.reduce((s, v, i) => (i === mi ? s : s + v), 0);
      const x = 100 - rest;
      if (x < (tier === 1 ? 10 : 5) || x % (tier === 1 ? 10 : 1) !== 0) continue;
      vals[mi] = x;
      if (kind === "or" && vals[mi] + vals[mj] >= 100) continue;
      // Avoid the "sum of the others" trap coinciding with the answer.
      if (rest === x) continue;
      break;
    }
  }
  const show = (v: number) => num(clean(v / 100));
  const ratio = kind === "ratio" || kind === "ratioNot";
  const kx = k === 1 ? "x" : `${k}x`;
  const cells = vals.map((v, i) => (i === mi ? "x" : ratio && i === mj ? kx : show(v)));
  const table = `| ${ctx.head} | ${labs.join(" | ")} |\n|${"---|".repeat(n + 1)}\n| Probability | ${cells.join(" | ")} |`;
  const others = vals.map((_, i) => i).filter((i) => (ratio ? i !== mi && i !== mj : i !== mi));
  const knownSum = others.reduce((s, i) => s + vals[i], 0);
  const knownList = others.map((i) => show(vals[i])).join(" + ");
  const base = "The outcomes can't happen together and one of them must happen, so the probabilities add up to 1.";
  const intro = ctx.intro(labs);
  let prompt: string, ans: number, solution: string[], traps: Trap[] = [];
  if (kind === "find") {
    ans = clean(vals[mi] / 100);
    prompt = `${intro}\n\n${table}\n\nFind the probability that ${ctx.ev([labs[mi]])}.`;
    solution = [base, `Known probabilities: ${knownList} = ${show(knownSum)}.`, `x = 1 − ${show(knownSum)} = ${num(ans)}`];
    traps = nTrap(knownSum / 100, ans, "That's the total of the known probabilities — now subtract it from 1.");
  } else if (kind === "or") {
    ans = clean((vals[mi] + vals[mj]) / 100);
    const pair = mi < mj ? [labs[mi], labs[mj]] : [labs[mj], labs[mi]];
    prompt = `${intro}\n\n${table}\n\nFind the probability that ${ctx.ev(pair)}.`;
    solution = [
      base,
      `x = 1 − (${knownList}) = 1 − ${show(knownSum)} = ${show(vals[mi])}.`,
      `The outcomes are mutually exclusive, so add: ${show(vals[mi])} + ${show(vals[mj])} = ${num(ans)}.`,
    ];
    traps = nTrap(vals[mi] / 100, ans, `That's just x. Now add the probability for ${labs[mj]}.`);
  } else {
    const x = vals[mi];
    const R = 100 - knownSum;
    const notQ = kind === "ratioNot";
    const asked = notQ ? mj : rng.pick([mi, mj]);
    const askedVal = vals[asked];
    ans = clean((notQ ? 100 - askedVal : askedVal) / 100);
    const relation = k === 1
      ? `${cap(ctx.noun(labs[mi]))} and ${ctx.noun(labs[mj])} are equally likely.`
      : `${cap(ctx.noun(labs[mj]))} is ${k === 2 ? "twice" : "three times"} as likely as ${ctx.noun(labs[mi])}.`;
    prompt = `${intro} ${relation}\n\n${table}\n\nFind the probability that ${notQ ? ctx.notEv(labs[asked]) : ctx.ev([labs[asked]])}.`;
    solution = [
      `The probabilities add up to 1: ${knownList} + x + ${kx} = 1.`,
      `${k + 1}x = 1 − ${show(knownSum)} = ${show(R)}, so x = ${show(R)} ÷ ${k + 1} = ${show(x)}.`,
      notQ
        ? `P(${labs[asked]}) = ${kx} = ${show(askedVal)}, so P(not ${labs[asked]}) = 1 − ${show(askedVal)} = ${num(ans)}.`
        : `P(${labs[asked]}) = ${asked === mi ? "x" : kx} = ${num(ans)}.`,
    ];
    if (notQ) traps = nTrap(askedVal / 100, ans, `That's P(${labs[asked]}). The question asks for P(not ${labs[asked]}), so subtract it from 1.`);
    else if (k > 1) traps = nTrap((asked === mi ? k * x : x) / 100, ans, `That's the value of ${asked === mi ? kx : "x"} — check which outcome the question asks about.`);
    else traps = nTrap(R / 100, ans, "That's x + x together. Share it equally between the two outcomes.");
  }
  return {
    prompt,
    answer: { type: "number", value: ans },
    solution,
    hint: "All the probabilities in the table must add up to exactly 1.",
    traps,
  };
}

// ---------------------------------------------------------------------------
// Pair experiments (two dice / spinners) shared by sample-space drills
// ---------------------------------------------------------------------------

interface Part {
  desc: string;
  short: string;
  vals: number[];
}

function spinner(vals: number[], short: string): Part {
  const consecutive = vals.every((v, i) => v === vals[0] + i);
  const desc = consecutive && vals[0] === 1 && vals.length >= 3
    ? `a fair spinner with ${vals.length} equal sections numbered 1 to ${vals.length}`
    : `a fair spinner with ${vals.length} equal sections numbered ${listAnd(vals)}`;
  return { desc, short, vals };
}
/** "spinner A" stays as it is; "dice" → "the dice". */
const theP = (short: string) => (/^spinner [AB]$/.test(short) ? short : `the ${short}`);
const DICE = (short: string): Part => ({ desc: "a fair six-sided dice", short, vals: [1, 2, 3, 4, 5, 6] });

function pickPair(rng: Rng, tier: Tier): [Part, Part, string] {
  const opt = tier === 1 ? rng.pick(["ss"]) : tier === 2 ? rng.pick(["ss", "ds", "dd"]) : rng.pick(["dd", "ds", "custom"]);
  if (opt === "dd") return [DICE("first dice"), DICE("second dice"), "Two fair six-sided dice are rolled."];
  if (opt === "ds") {
    const B = spinner(range(1, rng.int(3, 5)), "spinner");
    return [DICE("dice"), B, `A fair six-sided dice is rolled and ${B.desc} is spun.`];
  }
  if (opt === "custom") {
    // No zeros: "is 0 even / square / a multiple of 3?" would be a distraction here.
    const A = spinner(rng.pick([[2, 4, 6], [1, 3, 5, 7], [1, 2, 4, 8], [2, 3, 5], [3, 4, 5, 6]]), "spinner A");
    const B = spinner(rng.pick([[1, 2, 3], [1, 2, 3, 4], [2, 3, 4], [1, 3, 5]]), "spinner B");
    return [A, B, `Spinner A is ${A.desc}. Spinner B is ${B.desc}. Both are spun.`];
  }
  const A = spinner(range(1, rng.int(3, 5)), "spinner A");
  const B = spinner(range(1, rng.int(2, 4)), "spinner B");
  return [A, B, `Spinner A is ${A.desc}. Spinner B is ${B.desc}. Both are spun.`];
}

type Op = "sum" | "product" | "diff";
const OPS: Record<Op, { f: (a: number, b: number) => number; res: string; how: string }> = {
  sum: { f: (a, b) => a + b, res: "total", how: "The two scores are added." },
  product: { f: (a, b) => a * b, res: "product", how: "The two scores are multiplied." },
  diff: { f: (a, b) => Math.abs(a - b), res: "difference", how: "The score is the difference between the two numbers (larger − smaller)." },
};

function rowCounts(A: Part, B: Part, ok: (a: number, b: number) => boolean): string {
  return A.vals.map((a) => `${a} → ${B.vals.filter((b) => ok(a, b)).length}`).join(", ");
}

// ---------------------------------------------------------------------------
// 5. Sample space: counting outcomes
// ---------------------------------------------------------------------------

function sampleSpaceCount(rng: Rng, tier: Tier): DrillItem {
  for (let it = 0; it < 200; it++) {
    const [A, B, setup] = pickPair(rng, tier);
    const op: Op = tier === 1 ? "sum" : rng.pick(["sum", "sum", "product", "diff"] as Op[]);
    const O = OPS[op];
    const T = A.vals.length * B.vals.length;
    const results: number[] = [];
    for (const a of A.vals) for (const b of B.vals) results.push(O.f(a, b));
    const distinct = Array.from(new Set(results)).sort((x, y) => x - y);
    const kinds = tier === 1 ? ["eq", "eq", "gt"] : tier === 2 ? ["eq", "gt", "lt", "parity"] : ["mode", "distinct", "mult", "gt", "eq"];
    const kind = rng.pick(kinds);
    const rowLabel = `Row by row (${A.short} score → number of outcomes that work)`;
    const hint = `Draw a grid with ${A.short}'s scores down the side and ${B.short}'s scores across the top. Fill in every ${O.res}, then count.`;
    const intro = `${setup} ${O.how}`;
    if (kind === "eq" || kind === "gt" || kind === "lt") {
      const k = rng.pick(distinct);
      // "greater than"/"less than" must leave at least two different values on the counted side.
      // Also keep at least two values on the other side, so the question isn't "everything but one".
      if (kind === "gt" && (distinct.filter((v) => v > k).length < 2 || distinct.filter((v) => v <= k).length < 2)) continue;
      if (kind === "lt" && (distinct.filter((v) => v < k).length < 2 || distinct.filter((v) => v >= k).length < 2)) continue;
      const ok = kind === "eq" ? (a: number, b: number) => O.f(a, b) === k : kind === "gt" ? (a: number, b: number) => O.f(a, b) > k : (a: number, b: number) => O.f(a, b) < k;
      const c = results.filter((r) => (kind === "eq" ? r === k : kind === "gt" ? r > k : r < k)).length;
      if (c < 2 || c === T) continue;
      const phrase = kind === "eq" ? `a ${O.res} of ${k}` : `a ${O.res} ${kind === "gt" ? "greater" : "less"} than ${k}`;
      const pairs: string[] = [];
      for (const a of A.vals) for (const b of B.vals) if (ok(a, b)) pairs.push(`(${a}, ${b})`);
      let traps: Trap[] = [];
      if (kind !== "eq") {
        const withK = results.filter((r) => (kind === "gt" ? r >= k : r <= k)).length;
        traps = nTrap(withK, c, `"${kind === "gt" ? "Greater" : "Less"} than ${k}" does not include a ${O.res} of exactly ${k}.`);
      } else if (A.vals.join() === B.vals.join()) {
        const xy = pairs.map((p) => p.slice(1, -1).split(", ").map(Number));
        const unordered = xy.filter(([x, y]) => x <= y).length;
        const asym = xy.find(([x, y]) => x < y);
        if (asym) traps = nTrap(unordered, c, `(${asym[0]}, ${asym[1]}) and (${asym[1]}, ${asym[0]}) are different outcomes — count both orders.`);
      }
      return {
        prompt: `${intro} How many of the ${T} outcomes in the sample space give ${phrase}?`,
        answer: { type: "number", value: c },
        solution: [
          `There are ${A.vals.length} × ${B.vals.length} = ${T} outcomes. Pairs are (${A.short}, ${B.short}).`,
          c <= 10 ? `Outcomes that work: ${pairs.join(", ")}.` : `${rowLabel}: ${rowCounts(A, B, ok)}.`,
          `That's ${c} outcomes.`,
        ],
        hint,
        traps,
      };
    }
    if ((kind === "parity" || kind === "mult") && results.some((r) => r === 0)) continue;
    if (kind === "parity") {
      const even = rng.bool();
      const ok = (a: number, b: number) => (O.f(a, b) % 2 === 0) === even;
      const c = results.filter((r) => (r % 2 === 0) === even).length;
      if (c === 0 || c === T) continue;
      return {
        prompt: `${intro} How many of the ${T} outcomes in the sample space give an ${even ? "even" : "odd"} ${O.res}?`,
        answer: { type: "number", value: c },
        solution: [
          `There are ${A.vals.length} × ${B.vals.length} = ${T} outcomes.`,
          `${rowLabel}: ${rowCounts(A, B, ok)}.`,
          `Total: ${c} outcomes.`,
        ],
        hint,
        traps: nTrap(T - c, c, `That's the number of ${even ? "odd" : "even"} ${O.res}s.`),
      };
    }
    if (kind === "mult") {
      const m = rng.pick([3, 4, 5]);
      const ok = (a: number, b: number) => O.f(a, b) % m === 0;
      const c = results.filter((r) => r % m === 0).length;
      if (c < 2 || c === T) continue;
      return {
        prompt: `${intro} How many of the ${T} outcomes in the sample space give a ${O.res} that is a multiple of ${m}?`,
        answer: { type: "number", value: c },
        solution: [
          `There are ${A.vals.length} × ${B.vals.length} = ${T} outcomes.`,
          `${rowLabel}: ${rowCounts(A, B, ok)}.`,
          `Total: ${c} outcomes.`,
        ],
        hint,
        traps: [],
      };
    }
    if (kind === "mode") {
      const counts = distinct.map((v) => results.filter((r) => r === v).length);
      const best = Math.max(...counts);
      if (counts.filter((x) => x === best).length !== 1) continue;
      const mode = distinct[counts.indexOf(best)];
      return {
        prompt: `${intro} Which ${O.res} is the most likely?`,
        answer: { type: "number", value: mode },
        solution: [
          `Fill in all ${T} outcomes in a sample space grid.`,
          `How often each ${O.res} appears: ${distinct.map((v, i) => `${v} (${counts[i]})`).join(", ")}.`,
          `${cap(O.res)} ${mode} appears most often (${best} times out of ${T}).`,
        ],
        hint,
        traps: [],
      };
    }
    // distinct
    if (distinct.length === T) continue;
    return {
      prompt: `${intro} How many **different** ${O.res}s are possible?`,
      answer: { type: "number", value: distinct.length },
      solution: [
        `List the ${O.res} for all ${T} outcomes in a grid.`,
        `The different values are ${listAnd(distinct)}.`,
        `That's ${distinct.length} different ${O.res}s.`,
      ],
      hint,
      traps: nTrap(T, distinct.length, `${T} is the number of outcomes, but many outcomes give the same ${O.res}. Count the different values.`),
    };
  }
  // Fallback (never expected): two dice, total of 7.
  return {
    prompt: "Two fair six-sided dice are rolled. The two scores are added. How many of the 36 outcomes in the sample space give a total of 7?",
    answer: { type: "number", value: 6 },
    solution: ["(1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1).", "That's 6 outcomes."],
    hint: "Draw the 6 × 6 grid of totals.",
  };
}

// ---------------------------------------------------------------------------
// 6. Combined events: probability from a sample space
// ---------------------------------------------------------------------------

function coinDice(rng: Rng): DrillItem {
  const side = rng.pick(["head", "tail"]);
  const k = rng.int(2, 4);
  const ev = rng.pick([
    { label: "an even number", ok: (x: number) => x % 2 === 0 },
    { label: "an odd number", ok: (x: number) => x % 2 === 1 },
    { label: "a 6", ok: (x: number) => x === 6 },
    { label: `a number greater than ${k}`, ok: (x: number) => x > k },
    { label: "a multiple of 3", ok: (x: number) => x % 3 === 0 },
    { label: "a prime number", ok: (x: number) => isPrimeN(x) },
    { label: "a square number", ok: (x: number) => isSquare(x) },
  ]);
  const good = range(1, 6).filter(ev.ok);
  const c = good.length;
  const S = side === "head" ? "H" : "T";
  const [an, ad] = simplify(c, 12);
  const addN = 3 + c, addD = 6; // 1/2 + c/6
  return {
    prompt: `A fair coin is flipped and a fair six-sided dice is rolled. Find the probability of getting a ${side} and ${ev.label}.${SIMPLEST}`,
    answer: fs(c, 12),
    solution: [
      "Sample space: H1, H2, …, H6 and T1, T2, …, T6 — that's 2 × 6 = 12 equally likely outcomes.",
      `Outcomes that work: ${good.map((g) => S + g).join(", ")} — ${c} outcome${c === 1 ? "" : "s"}.`,
      `P = ${fShow(c, 12)}`,
    ],
    hint: "List the sample space: each coin result goes with each dice score.",
    traps: addN < addD ? fTrap(addN, addD, an, ad, `You added the two probabilities. For a ${side} AND ${ev.label}, count the outcomes in the sample space where both happen.`) : [],
  };
}

function combinedEvents(rng: Rng, tier: Tier): DrillItem {
  if (rng.bool(tier === 1 ? 0.35 : 0.2)) return coinDice(rng);
  for (let it = 0; it < 200; it++) {
    const [A, B, setup] = pickPair(rng, tier);
    const T = A.vals.length * B.vals.length;
    const same = A.vals.join() === B.vals.join();
    const sums = Array.from(new Set(A.vals.flatMap((a) => B.vals.map((b) => a + b)))).sort((x, y) => x - y);
    const k = rng.pick(sums);
    const kp = rng.int(4, 15);
    const maxA = Math.max(...A.vals), maxB = Math.max(...B.vals);
    type Ev = { label: string; ok: (a: number, b: number) => boolean; trap?: "eq" | "gt" | "lt" | "atleast"; how: string };
    const evs: Ev[] = [
      { label: `the total is ${k}`, ok: (a, b) => a + b === k, trap: "eq", how: "The two scores are added." },
      { label: `the total is greater than ${k}`, ok: (a, b) => a + b > k, trap: "gt", how: "The two scores are added." },
      { label: "the product is even", ok: (a, b) => (a * b) % 2 === 0, how: "The two scores are multiplied." },
    ];
    if (tier >= 2) {
      evs.push(
        { label: `the product is greater than ${kp}`, ok: (a, b) => a * b > kp, how: "The two scores are multiplied." },
        { label: `the total is less than ${k}`, ok: (a, b) => a + b < k, trap: "lt", how: "The two scores are added." },
        { label: `the score on ${theP(A.short)} is higher than the score on ${theP(B.short)}`, ok: (a, b) => a > b, how: "" },
      );
      if (same) evs.push({ label: "both scores are the same", ok: (a, b) => a === b, how: "" });
    }
    if (tier === 3) {
      evs.push(
        { label: "the total is a prime number", ok: (a, b) => isPrimeN(a + b), how: "The two scores are added." },
        { label: "the product is a square number", ok: (a, b) => isSquare(a * b), how: "The two scores are multiplied." },
        { label: "the two scores differ by exactly 2", ok: (a, b) => Math.abs(a - b) === 2, how: "" },
      );
      if (same || (maxA === 6 && maxB === 6)) evs.push({ label: "at least one of the scores is a 6", ok: (a, b) => a === 6 || b === 6, trap: "atleast", how: "" });
    }
    const ev = rng.pick(evs);
    const goodPairs: string[] = [];
    for (const a of A.vals) for (const b of B.vals) if (ev.ok(a, b)) goodPairs.push(`(${a}, ${b})`);
    const c = goodPairs.length;
    if (c === 0 || c === T) continue;
    const [an, ad] = simplify(c, T);
    let traps: Trap[] = [];
    if (ev.trap === "eq") traps = fTrap(1, sums.length, an, ad, `There are ${sums.length} possible totals, but they are **not** equally likely. Count outcomes in the sample space instead.`);
    if (ev.trap === "gt") {
      const withK = A.vals.flatMap((a) => B.vals.map((b) => a + b)).filter((s) => s >= k).length;
      if (withK < T) traps = fTrap(withK, T, an, ad, `"Greater than ${k}" does not include a total of exactly ${k}.`);
    }
    if (ev.trap === "lt") {
      const withK = A.vals.flatMap((a) => B.vals.map((b) => a + b)).filter((s) => s <= k).length;
      if (withK < T) traps = fTrap(withK, T, an, ad, `"Less than ${k}" does not include a total of exactly ${k}.`);
    }
    if (ev.trap === "atleast") traps = fTrap(A.vals.length + B.vals.length, T, an, ad, "The outcome (6, 6) has been counted twice. Count each cell of the grid only once.");
    return {
      prompt: `${setup}${ev.how ? " " + ev.how : ""} Find the probability that ${ev.label}.${SIMPLEST}`,
      answer: fs(c, T),
      solution: [
        `Sample space: ${A.vals.length} × ${B.vals.length} = ${T} equally likely outcomes (${A.short}, ${B.short}).`,
        c <= 10 ? `Outcomes that work: ${goodPairs.join(", ")} — that's ${c}.` : `Row by row (${A.short} score → outcomes that work): ${rowCounts(A, B, ev.ok)}. That's ${c}.`,
        `P = ${fShow(c, T)}`,
      ],
      hint: "Draw the sample space grid, mark the cells where the event happens, and count.",
      traps,
    };
  }
  return coinDice(rng);
}

// ---------------------------------------------------------------------------
// 7. Two-way tables
// ---------------------------------------------------------------------------

const TWO_WAY = [
  {
    intro: "Some Year 8 students were asked how they usually travel to school. The two-way table shows the results.",
    who: "student", rows: ["Boys", "Girls"], rowPred: ["is a boy", "is a girl"], rowGroup: ["boys", "girls"],
    cols: ["MRT", "Bus", "Walk"], colPred: ["travels by MRT", "travels by bus", "walks"], colPredPl: ["travel by MRT", "travel by bus", "walk"],
  },
  {
    intro: "Students in Years 7 and 8 each chose one CCA. The two-way table shows their choices.",
    who: "student", rows: ["Year 7", "Year 8"], rowPred: ["is in Year 7", "is in Year 8"], rowGroup: ["Year 7 students", "Year 8 students"],
    cols: ["Sport", "Music", "Robotics"], colPred: ["chose sport", "chose music", "chose robotics"], colPredPl: ["chose sport", "chose music", "chose robotics"],
  },
  {
    intro: "Visitors leaving Sentosa were asked which attraction they enjoyed most. The two-way table shows the results.",
    who: "visitor", rows: ["Adult", "Child"], rowPred: ["is an adult", "is a child"], rowGroup: ["adults", "children"],
    cols: ["Beach", "Aquarium", "Cable car"], colPred: ["chose the beach", "chose the aquarium", "chose the cable car"], colPredPl: ["chose the beach", "chose the aquarium", "chose the cable car"],
  },
  {
    intro: "Customers at an ice-cream stall each chose one flavour, served in a cone or a cup. The two-way table shows the orders.",
    who: "customer", rows: ["Cone", "Cup"], rowPred: ["had a cone", "had a cup"], rowGroup: ["customers who had a cone", "customers who had a cup"],
    cols: ["Mango", "Chocolate", "Durian"], colPred: ["chose mango", "chose chocolate", "chose durian"], colPredPl: ["chose mango", "chose chocolate", "chose durian"],
  },
];

function twoWayTable(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick(TWO_WAY);
  const colIdx = tier === 1 ? rng.shuffle([0, 1, 2]).slice(0, 2).sort() : [0, 1, 2];
  const nc = colIdx.length;
  const lo = tier === 1 ? 2 : 3, hi = tier === 1 ? 15 : tier === 2 ? 30 : 40;
  const cells = [0, 1].map(() => colIdx.map(() => rng.int(lo, hi)));
  const R = cells.map((row) => row.reduce((a, b) => a + b, 0));
  const C = colIdx.map((_, j) => cells[0][j] + cells[1][j]);
  const G = R[0] + R[1];
  const kind = tier === 1 ? rng.pick(["and", "and", "row", "col"]) : tier === 2 ? rng.pick(["and", "col", "cond"]) : rng.pick(["cond", "or", "and"]);
  const r = rng.int(0, 1), j = rng.int(0, nc - 1);
  const hide = tier === 3 || (tier === 2 && rng.bool(0.3));
  // The hidden number is always one the question needs: the cell itself for
  // and / cond / or, otherwise the row or column total being asked about.
  const hideCell = hide && (kind === "and" || kind === "cond" || kind === "or");
  const hideRowTot = hide && kind === "row";
  const hideColTot = hide && kind === "col";
  const colNames = colIdx.map((i) => ctx.cols[i]);
  const colPreds = colIdx.map((i) => ctx.colPred[i]);
  const colPredsPl = colIdx.map((i) => ctx.colPredPl[i]);
  const rowsTxt = [0, 1].map((i) => `| ${ctx.rows[i]} | ${cells[i].map((v, jj) => (hideCell && i === r && jj === j ? "?" : String(v))).join(" | ")} | ${hideRowTot && i === r ? "?" : R[i]} |`);
  const table = `| | ${colNames.join(" | ")} | Total |\n|${"---|".repeat(nc + 2)}\n${rowsTxt.join("\n")}\n| Total | ${C.map((v, jj) => (hideColTot && jj === j ? "?" : String(v))).join(" | ")} | ${G} |`;
  const cell = cells[r][j];
  const pick = `One ${ctx.who} is chosen at random. Find the probability that this ${ctx.who}`;
  let q: string, n: number, d: number, steps: string[];
  let traps: Trap[] = [];
  if (kind === "and") {
    q = `${pick} ${ctx.rowPred[r]} and ${colPreds[j]}.`;
    n = cell; d = G;
    steps = [`The cell for ${ctx.rows[r]} and ${colNames[j]}: ${cell} out of ${G} altogether.`];
  } else if (kind === "row") {
    q = `${pick} ${ctx.rowPred[r]}.`;
    n = R[r]; d = G;
    steps = [`Row total for ${ctx.rows[r]}: ${R[r]} out of ${G} altogether.`];
  } else if (kind === "col") {
    q = `${pick} ${colPreds[j]}.`;
    n = C[j]; d = G;
    steps = [`Column total for ${colNames[j]}: ${C[j]} out of ${G} altogether.`];
  } else if (kind === "cond") {
    q = `One of the ${ctx.rowGroup[r]} is chosen at random. Find the probability that this ${ctx.who} ${colPreds[j]}.`;
    n = cell; d = R[r];
    steps = [`Only the ${ctx.rowGroup[r]} count: there are ${R[r]} of them.`, `Of these, ${cell} ${colPredsPl[j]}.`];
  } else {
    q = `${pick} ${ctx.rowPred[r]} or ${colPreds[j]} (or both).`;
    n = R[r] + C[j] - cell; d = G;
    steps = [`${ctx.rows[r]} row total ${R[r]} + ${colNames[j]} column total ${C[j]} counts the ${cell} in both twice.`, `${R[r]} + ${C[j]} − ${cell} = ${n}, out of ${G}.`];
  }
  const [an, ad] = simplify(n, d);
  if (kind === "and") traps = fTrap(cell, R[r], an, ad, `You divided by the number of ${ctx.rowGroup[r]}. The ${ctx.who} is chosen from everyone, so divide by the grand total, ${G}.`);
  if (kind === "cond") traps = fTrap(cell, G, an, ad, `The ${ctx.who} is chosen only from the ${ctx.rowGroup[r]}, so divide by ${R[r]}, not the grand total.`);
  if (kind === "or") traps = fTrap(R[r] + C[j], G, an, ad, `The ${cell} ${ctx.who}s in both groups have been counted twice — subtract them once.`);
  const missingStep = hideCell
    ? [`Missing value: ${ctx.rows[r]} row total ${R[r]} − ${cells[r].filter((_, jj) => jj !== j).join(" − ")} = ${cell}.`]
    : hideRowTot
      ? [`Missing total: ${cells[r].join(" + ")} = ${R[r]}.`]
      : hideColTot
        ? [`Missing total: ${cells[0][j]} + ${cells[1][j]} = ${C[j]}.`]
        : [];
  const solution = [...missingStep, ...steps, `P = ${fShow(n, d)}`];
  return {
    prompt: `${ctx.intro}${hide ? " One number is missing." : ""}\n\n${table}\n\n${q}${SIMPLEST}`,
    answer: fs(n, d),
    solution,
    hint: kind === "cond" ? "Who is being chosen from? That group's total goes on the bottom." : "Find the right cell or total for the top, and the number of people being chosen from for the bottom.",
    traps,
  };
}

// ---------------------------------------------------------------------------
// 8. Venn diagrams
// ---------------------------------------------------------------------------

const VENN = [
  {
    intro: "Students in a class were asked whether they play badminton and whether they swim.", who: "student",
    la: "Badminton", lb: "Swimming", predA: "plays badminton", predB: "swims", negA: "does not play badminton", negB: "does not swim",
    neither: "does neither activity", exactly: "does exactly one of the two activities", bothV: "do both", place: "in a class",
  },
  {
    intro: "Shoppers at a fruit stall were asked whether they like durian and whether they like mango.", who: "shopper",
    la: "Durian", lb: "Mango", predA: "likes durian", predB: "likes mango", negA: "does not like durian", negB: "does not like mango",
    neither: "likes neither fruit", exactly: "likes exactly one of the two fruits", bothV: "like both", place: "at a fruit stall",
  },
  {
    intro: "Students were asked whether they study French and whether they study Japanese.", who: "student",
    la: "French", lb: "Japanese", predA: "studies French", predB: "studies Japanese", negA: "does not study French", negB: "does not study Japanese",
    neither: "studies neither language", exactly: "studies exactly one of the two languages", bothV: "study both", place: "in Year 8",
  },
  {
    intro: "Families in an HDB block were asked whether they own a cat and whether they own a dog.", who: "family",
    la: "Cat", lb: "Dog", predA: "owns a cat", predB: "owns a dog", negA: "does not own a cat", negB: "does not own a dog",
    neither: "owns neither pet", exactly: "owns exactly one of the two pets", bothV: "own both", place: "in an HDB block",
  },
];

function vennSvg(la: string, lb: string, oA: number, both: number, oB: number, nei: number): string {
  const t = (x: number, y: number, s: string | number, size = 14, weight = "normal") =>
    `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" font-family="sans-serif" fill="#1f2937" text-anchor="middle">${s}</text>`;
  return `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram: ${oA} in ${la} only, ${both} in both, ${oB} in ${lb} only, ${nei} in neither"><rect x="0" y="0" width="340" height="220" fill="#ffffff"/><rect x="6" y="6" width="328" height="208" fill="none" stroke="#334155" stroke-width="2"/><text x="18" y="27" font-size="14" font-family="sans-serif" fill="#1f2937">ξ</text><circle cx="135" cy="120" r="72" fill="#c7d2fe" fill-opacity="0.6" stroke="#1f2937" stroke-width="2"/><circle cx="205" cy="120" r="72" fill="#fde68a" fill-opacity="0.6" stroke="#1f2937" stroke-width="2"/>${t(95, 38, la, 13)}${t(245, 38, lb, 13)}${t(98, 125, oA, 14, "bold")}${t(170, 125, both, 14, "bold")}${t(242, 125, oB, 14, "bold")}${t(312, 204, nei, 14, "bold")}</svg>`;
}

function vennDrill(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick(VENN);
  const lo = tier === 1 ? 1 : 2, hi = tier === 1 ? 12 : 20;
  const oA = rng.int(lo, hi), both = rng.int(lo, hi), oB = rng.int(lo, hi), nei = rng.int(lo, tier === 1 ? 10 : 15);
  const T = oA + both + oB + nei;
  const nA = oA + both, nB = oB + both;
  const kinds = tier === 1 ? ["A", "and", "neither", "onlyA"] : tier === 2 ? ["A", "or", "exactly", "notA", "onlyA"] : ["neither", "onlyA", "exactly", "or"];
  const kind = rng.pick(kinds);
  let fav: number, phrase: string, step: string, traps: Trap[] = [];
  switch (kind) {
    case "A": fav = nA; phrase = ctx.predA; step = `In the ${ctx.la} circle: ${oA} + ${both} = ${nA}.`; break;
    case "and": fav = both; phrase = `${ctx.predA} and ${ctx.predB}`; step = `Both: the overlap, ${both}.`; break;
    case "neither": fav = nei; phrase = ctx.neither; step = `Neither: outside both circles, ${nei}.`; break;
    case "onlyA": fav = oA; phrase = `${ctx.predA} but ${ctx.negB}`; step = `${ctx.la} only (the overlap is left out): ${oA}.`; break;
    case "or": fav = oA + both + oB; phrase = `${ctx.predA} or ${ctx.predB} (or both)`; step = `Inside at least one circle: ${oA} + ${both} + ${oB} = ${fav}.`; break;
    case "exactly": fav = oA + oB; phrase = ctx.exactly; step = `Exactly one (not the overlap): ${oA} + ${oB} = ${fav}.`; break;
    default: fav = oB + nei; phrase = ctx.negA; step = `Outside the ${ctx.la} circle: ${oB} + ${nei} = ${fav}.`;
  }
  const [an, ad] = simplify(fav, T);
  if (kind === "A") traps = fTrap(oA, T, an, ad, both === 1 ? `The 1 ${ctx.who} in the overlap also ${ctx.predA} — include it.` : `The ${both} in the overlap also ${verbPlural(ctx.predA)} — include them.`);
  if (kind === "or") traps = fTrap(nA + nB, T, an, ad, `Adding the two circle totals counts the ${both} in the overlap twice.`);
  if (kind === "onlyA") traps = fTrap(nA, T, an, ad, `"But not" means leave out the ${both} in the overlap.`);
  if (kind === "exactly") traps = fTrap(oA + both + oB, T, an, ad, "\"Exactly one\" leaves out the overlap — those do both.");
  if (kind === "notA") traps = fTrap(nA, T, an, ad, `That's the probability that the ${ctx.who} ${ctx.predA}. You want the ones outside that circle.`);

  if (tier === 3) {
    // Words only: the learner builds the Venn diagram.
    if (kind === "neither") {
      const naive = T - nA - nB;
      traps = naive > 0 ? fTrap(naive, T, an, ad, `The ${both} who are in both groups were subtracted twice. Fill in the overlap first.`) : [];
    }
    const groupWord = ctx.who === "family" ? "families" : `${ctx.who}s`;
    return {
      prompt: `There are ${T} ${groupWord} ${ctx.place}. ${nA} of them ${verbPlural(ctx.predA)}, ${nB} ${verbPlural(ctx.predB)} and ${both} ${ctx.bothV}. One ${ctx.who} is chosen at random. Find the probability that this ${ctx.who} ${phrase}.${SIMPLEST}`,
      answer: fs(fav, T),
      solution: [
        `Draw a Venn diagram. Overlap = ${both}. ${ctx.la} only = ${nA} − ${both} = ${oA}. ${ctx.lb} only = ${nB} − ${both} = ${oB}.`,
        `Neither = ${T} − (${oA} + ${both} + ${oB}) = ${nei}.`,
        step,
        `P = ${fShow(fav, T)}`,
      ],
      hint: "Fill in the overlap first, then the 'only' parts, then the outside.",
      traps,
    };
  }
  return {
    prompt: `${ctx.intro} The Venn diagram shows the results. ${rng.pick(NAMES)} picks one ${ctx.who} at random. Find the probability that this ${ctx.who} ${phrase}.${SIMPLEST}`,
    answer: fs(fav, T),
    solution: [`Total: ${oA} + ${both} + ${oB} + ${nei} = ${T}.`, step, `P = ${fShow(fav, T)}`],
    hint: "Add every number in the diagram (including the one outside the circles) for the total. Then decide which regions match the event.",
    traps,
    diagram: vennSvg(ctx.la, ctx.lb, oA, both, oB, nei),
  };
}

/** "plays badminton" → "play badminton" (for a plural subject). */
function verbPlural(pred: string): string {
  return pred
    .replace(/^plays\b/, "play")
    .replace(/^swims\b/, "swim")
    .replace(/^likes\b/, "like")
    .replace(/^studies\b/, "study")
    .replace(/^owns\b/, "own");
}

// ---------------------------------------------------------------------------
// 9. Relative frequency
// ---------------------------------------------------------------------------

const FLIPS = [
  { thing: "A drawing pin is dropped", yes: "landing point up", no: "landing point down", yesV: "lands point up" },
  { thing: "A plastic bottle is flipped", yes: "landing upright", no: "not landing upright", yesV: "lands upright" },
  { thing: "A paper cup is thrown", yes: "landing on its side", no: "not landing on its side", yesV: "lands on its side" },
  { thing: "A biased coin is flipped", yes: "landing heads", no: "landing tails", yesV: "lands heads" },
];

function relFreq(rng: Rng, tier: Tier): DrillItem {
  const kind = tier === 1 ? rng.pick(["flip", "table"]) : tier === 2 ? rng.pick(["flip", "table", "tableOr"]) : rng.pick(["pool", "reverse", "tableOr"]);
  const hint = "Relative frequency = number of times it happened ÷ total number of trials.";

  if (kind === "flip") {
    const ctx = rng.pick(FLIPS);
    const N = tier === 1 ? rng.pick([10, 20, 25, 50, 100]) : rng.pick([40, 50, 80, 125, 200, 250]);
    let f = 1;
    for (let i = 0; i < 100; i++) {
      f = rng.int(Math.ceil(N * 0.15), Math.floor(N * 0.85));
      if (2 * f !== N) break;
    }
    const askNo = rng.bool(0.35);
    const fav = askNo ? N - f : f;
    const ans = clean(fav / N);
    return {
      prompt: `${ctx.thing} ${N} times. It ${ctx.yesV} ${f} times. Find the relative frequency of ${askNo ? ctx.no : ctx.yes}. Give your answer as a decimal.`,
      answer: decSpec(ans),
      solution: [
        askNo ? `${cap(ctx.no)}: ${N} − ${f} = ${fav} times.` : `${cap(ctx.yes)}: ${f} times out of ${N} trials.`,
        `Relative frequency = ${frac(fav, N, { simplify: false })} = ${num(ans)}`,
      ],
      hint,
      traps: [
        ...nTrap((N - fav) / N, ans, `That's the relative frequency of ${askNo ? ctx.yes : ctx.no}.`),
        ...fTrap(fav, N - fav, fav, N, "Divide by the **total** number of trials, not by the number of times it didn't happen."),
      ].slice(0, 2),
    };
  }

  if (kind === "table" || kind === "tableOr") {
    const dice = rng.bool(0.4);
    const labels = dice ? ["1", "2", "3", "4", "5", "6"] : ["Red", "Blue", "Green", "Yellow"];
    const n = labels.length;
    const N = dice ? rng.pick([60, 120, 150, 200, 300]) : rng.pick([40, 50, 80, 100, 200]);
    const asDecimal = !dice || [200].includes(N) ? rng.bool(0.6) : false;
    let freqs: number[] = [];
    for (let it = 0; it < 200; it++) {
      freqs = [];
      for (let i = 0; i < n - 1; i++) freqs.push(Math.max(1, Math.round((N / n) * (0.55 + 0.9 * rng.next()))));
      const last = N - freqs.reduce((a, b) => a + b, 0);
      if (last >= Math.ceil(N / n / 3)) { freqs.push(last); break; }
    }
    if (freqs.length !== n) freqs = labels.map((_, i) => (i < n - 1 ? Math.floor(N / n) : N - Math.floor(N / n) * (n - 1)));
    const j1 = rng.int(0, n - 1);
    const j2 = (j1 + rng.int(1, n - 1)) % n;
    const [i1, i2] = j1 < j2 ? [j1, j2] : [j2, j1];
    const or = kind === "tableOr";
    const fav = or ? freqs[i1] + freqs[i2] : freqs[i1];
    const what = dice ? (or ? `rolling a ${labels[i1]} or a ${labels[i2]}` : `rolling a ${labels[i1]}`) : or ? `landing on ${labels[i1].toLowerCase()} or ${labels[i2].toLowerCase()}` : `landing on ${labels[i1].toLowerCase()}`;
    const intro = dice
      ? `Marcus rolls a dice ${N} times. His results are shown in the table.`
      : `Aisha has a spinner with four equal sections coloured red, blue, green and yellow. She spins it ${N} times. Her results are shown in the table.`;
    const table = `| ${dice ? "Score" : "Colour"} | ${labels.join(" | ")} |\n|${"---|".repeat(n + 1)}\n| Frequency | ${freqs.join(" | ")} |`;
    const theoryN = or ? 2 : 1;
    const [an, ad] = simplify(fav, N);
    const traps = fTrap(theoryN, n, an, ad, `That's the theoretical probability for a fair ${dice ? "dice" : "spinner"}. Relative frequency uses the actual results: frequency ÷ total.`);
    const steps = [
      `Total trials: ${N}.`,
      or ? `Frequency of ${labels[i1]} or ${labels[i2]}: ${freqs[i1]} + ${freqs[i2]} = ${fav}.` : `Frequency of ${labels[i1]}: ${fav}.`,
    ];
    if (asDecimal && (fav * 10000) % N === 0) {
      const ans = clean(fav / N);
      return {
        prompt: `${intro}\n\n${table}\n\nFind the relative frequency of ${what}. Give your answer as a decimal.`,
        answer: decSpec(ans),
        solution: [...steps, `Relative frequency = ${frac(fav, N, { simplify: false })} = ${num(ans)}`],
        hint,
        traps,
      };
    }
    return {
      prompt: `${intro}\n\n${table}\n\nFind the relative frequency of ${what}.${SIMPLEST}`,
      answer: fs(fav, N),
      solution: [...steps, `Relative frequency = ${fShow(fav, N)}`],
      hint,
      traps,
    };
  }

  if (kind === "pool") {
    // A short experiment and a long one whose relative frequencies differ
    // noticeably, so that averaging the two (the classic slip) gives a clearly
    // different answer from pooling. N is 2^a·5^b, so f ÷ N is a terminating decimal.
    let N = 100, N1 = 20, N2 = 80, f1 = 4, f2 = 40, f = 44, ans = 0.44, avg = 0.35;
    let found = false;
    for (let i = 0; i < 200 && !found; i++) {
      N = rng.pick([50, 80, 100, 125, 200, 250]);
      N1 = rng.pick([10, 20, 25, 30, 40, 50].filter((x) => x <= 0.4 * N));
      N2 = N - N1;
      const p = 0.25 + 0.45 * rng.next();
      f2 = Math.round(N2 * p);
      const shift = (rng.bool() ? 1 : -1) * (0.15 + 0.15 * rng.next());
      f1 = Math.round(N1 * (p + shift));
      if (f1 < 1 || f1 >= N1 || f2 < 1 || f2 >= N2) continue;
      const fx = f1 + f2, ax = clean(fx / N), vx = (f1 / N1 + f2 / N2) / 2;
      // Averaging must miss by more than the checker's 1% "very close" band, also when rounded to 2 d.p.
      if (Math.abs(vx - ax) >= 0.012 && Math.abs(roundTo(vx, 2) - ax) >= 0.008) {
        f = fx; ans = ax; avg = vx; found = true;
      }
    }
    if (!found) { N = 100; N1 = 20; N2 = 80; f1 = 4; f2 = 40; f = 44; ans = 0.44; avg = 0.35; }
    const traps: Trap[] = [];
    const avgFb = "Don't average the two relative frequencies — the experiments have different numbers of trials. Add all the successes and all the trials.";
    traps.push({ spec: { type: "number", value: roundTo(avg, 4), tolerance: 0.0006 }, feedback: avgFb });
    const avg2 = roundTo(avg, 2);
    if (Math.abs(avg2 - avg) > 0.0006) traps.push({ spec: { type: "number", value: avg2 }, feedback: avgFb });
    const [n1, n2] = rng.shuffle(["Aisha", "Jun", "Priya", "Ethan", "Siti", "Ravi"]).slice(0, 2);
    const shortFirst = rng.bool();
    const [a1, a2, g1, g2] = shortFirst ? [N1, N2, f1, f2] : [N2, N1, f2, f1];
    return {
      prompt: `${n1} spins a spinner ${a1} times and gets red ${g1} times. ${n2} spins the same spinner ${a2} times and gets red ${g2} times. Using **all** of their results, estimate the probability that the spinner lands on red. Give your answer as a decimal.`,
      answer: decSpec(ans),
      solution: [
        `Combine the experiments: red ${g1} + ${g2} = ${f} times in ${a1} + ${a2} = ${N} spins.`,
        `Estimate = ${frac(f, N, { simplify: false })} = ${num(ans)}`,
        "Don't average the two relative frequencies: the longer experiment should count for more. More trials give a more reliable estimate, so pooling all the results is best.",
      ],
      hint: "Pool the results: total reds ÷ total spins.",
      traps,
    };
  }

  // reverse: from relative frequency back to a frequency
  const which = rng.int(0, 2); // 0 spinner, 1 dice, 2 cars
  let N = 200, f = 50;
  for (let i = 0; i < 100; i++) {
    N = rng.pick([40, 50, 80, 125, 200, 250, 400, 500]);
    f = rng.int(Math.ceil(N * 0.1), Math.floor(N * (which === 1 ? 0.3 : 0.8)));
    if ((f * 1000) % N === 0 && 2 * f !== N) break;
  }
  const rf = clean(f / N);
  const ctx = ([
    { s: `After ${N} spins of a spinner, the relative frequency of landing on blue was ${num(rf)}. How many times did it land on blue?`, other: "did not land on blue" },
    { s: `Ravi rolled a dice ${N} times. The relative frequency of rolling a 6 was ${num(rf)}. How many 6s did he roll?`, other: "were not 6s" },
    { s: `In a survey of ${N} cars passing an HDB block, the relative frequency of white cars was ${num(rf)}. How many white cars were there?`, other: "were not white" },
  ])[which];
  return {
    prompt: ctx.s,
    answer: { type: "number", value: f },
    solution: [`Relative frequency = frequency ÷ trials, so frequency = relative frequency × trials.`, `${num(rf)} × ${N} = ${f}`],
    hint: "Work backwards: multiply the relative frequency by the number of trials.",
    traps: nTrap(N - f, f, `That's how many ${ctx.other}.`),
  };
}

// ---------------------------------------------------------------------------
// 10. Expected outcomes
// ---------------------------------------------------------------------------

const EXPECT_CTX = [
  { p: (s: string) => `The probability that a biased spinner lands on red is ${s}.`, n: (n: number) => `It is spun ${n} times. How many times would you expect it to land on red?` },
  { p: (s: string) => `A biased coin lands on heads with probability ${s}.`, n: (n: number) => `Marcus flips it ${n} times. How many heads would you expect?` },
  { p: (s: string) => `The probability that a seed germinates is ${s}.`, n: (n: number) => `Mei plants ${n} seeds. How many would you expect to germinate?` },
  { p: (s: string) => `The probability that a customer at a hawker stall orders teh tarik is ${s}.`, n: (n: number) => `Over one week, the stall serves ${n} customers. How many would you expect to order teh tarik?` },
  { p: (s: string) => `The probability that a student picked at random from a school walks to school is ${s}.`, n: (n: number) => `${n} students from the school are surveyed. How many would you expect to walk to school?` },
];

const DICE_EVENTS = [
  { label: "a 4", c: 1 },
  { label: "an even number", c: 3 },
  { label: "a number greater than 4", c: 2 },
  { label: "a multiple of 3", c: 2 },
  { label: "a prime number", c: 3 },
  { label: "a 1 or a 6", c: 2 },
  { label: "a square number", c: 2 },
];

function expected(rng: Rng, tier: Tier): DrillItem {
  const kind = tier === 1 ? rng.pick(["dice", "fraction"]) : tier === 2 ? rng.pick(["dice", "fraction", "decimal", "percent"]) : rng.pick(["complement", "fromRF", "observed", "decimal"]);
  const hint = "Expected number = probability × number of trials.";

  if (kind === "dice") {
    const ev = rng.pick(DICE_EVENTS);
    const n = 6 * rng.int(tier === 1 ? 5 : 8, tier === 1 ? 20 : 100);
    const ans = (n * ev.c) / 6;
    return {
      prompt: `A fair six-sided dice is rolled ${n} times. How many times would you expect to roll ${ev.label}?`,
      answer: { type: "number", value: ans },
      solution: [
        `P(${ev.label}) = ${frac(ev.c, 6, { simplify: false })}${ev.c > 1 ? ` = ${frac(ev.c, 6)}` : ""}.`,
        `Expected number = ${frac(ev.c, 6)} × ${n} = ${ans}`,
      ],
      hint,
      traps: ev.c > 1 ? nTrap(n / 6, ans, `${n / 6} is the expected number for just one score. Count how many scores give ${ev.label}.`) : [],
    };
  }
  if (kind === "fraction") {
    let a = 1, b = 4;
    for (let i = 0; i < 100; i++) {
      b = rng.pick(tier === 1 ? [3, 4, 5, 10] : [3, 4, 5, 8, 10, 12, 20]);
      a = rng.int(1, b - 1);
      if (gcd(a, b) === 1) break;
    }
    const n = b * rng.int(tier === 1 ? 3 : 5, tier === 1 ? 20 : 50);
    const ans = (n * a) / b;
    const ctx = rng.pick(EXPECT_CTX);
    return {
      prompt: `${ctx.p(frac(a, b))} ${ctx.n(n)}`,
      answer: { type: "number", value: ans },
      solution: a === 1
        ? [`Expected number = ${frac(a, b)} × ${n}.`, `${frac(1, b)} of ${n} is ${n} ÷ ${b} = ${ans}`]
        : [`Expected number = ${frac(a, b)} × ${n}.`, `${n} ÷ ${b} = ${n / b}, then × ${a} = ${ans}`],
      hint,
      traps: a > 1 ? nTrap(n / b, ans, `That's ${frac(1, b)} of ${n}. You need ${frac(a, b)} of it.`) : [],
    };
  }
  if (kind === "decimal" || kind === "percent") {
    let k = 15, n = 100;
    for (let i = 0; i < 100; i++) {
      k = tier === 2 ? rng.int(1, 19) * 5 : rng.int(1, 99);
      if (k % 10 === 0 && tier === 3) continue;
      const unit = 100 / gcd(k, 100);
      n = unit * rng.int(1, Math.max(1, Math.floor(600 / unit)));
      if (n >= 20 && n <= 1000 && k !== 50) break;
    }
    const ans = (n * k) / 100;
    const ctx = rng.pick(EXPECT_CTX);
    const pStr = kind === "percent" ? `${k}%` : num(clean(k / 100));
    return {
      prompt: `${ctx.p(pStr)} ${ctx.n(n)}`,
      answer: { type: "number", value: ans },
      solution: [
        "Expected number = probability × number of trials.",
        kind === "percent" ? `${k}% of ${n} = ${num(clean(k / 100))} × ${n} = ${ans}` : `${pStr} × ${n} = ${ans}`,
      ],
      hint,
      traps: nTrap(n - ans, ans, "That's the expected number for the opposite outcome."),
    };
  }
  if (kind === "complement") {
    let k = 85, n = 60;
    for (let i = 0; i < 100; i++) {
      k = rng.int(55, 95);
      if (k % 10 === 0) continue;
      const unit = 100 / gcd(k, 100);
      n = unit * rng.int(1, Math.max(1, Math.floor(400 / unit)));
      if (n >= 20 && n <= 400) break;
    }
    const ctx = rng.pick([
      { yes: "the school bus is on time", unit: "school days", q: "would you expect it **not** to be on time" },
      { yes: "Hana scores from a penalty", unit: "penalties", q: "would you expect her to **miss**" },
      { yes: "a seed germinates", unit: "seeds planted", q: "would you expect **not** to germinate" },
    ]);
    const pNot = 100 - k;
    const ans = (n * pNot) / 100;
    const qText = ctx.unit === "school days"
      ? `Over ${n} school days, on how many days ${ctx.q}?`
      : ctx.unit === "penalties"
        ? `She takes ${n} penalties. How many ${ctx.q}?`
        : `Ravi plants ${n} seeds. How many ${ctx.q}?`;
    return {
      prompt: `The probability that ${ctx.yes} is ${num(clean(k / 100))}. ${qText}`,
      answer: { type: "number", value: ans },
      solution: [`P(not) = 1 − ${num(clean(k / 100))} = ${num(clean(pNot / 100))}.`, `Expected number = ${num(clean(pNot / 100))} × ${n} = ${ans}`],
      hint: "First find the probability of the outcome you're asked about.",
      traps: nTrap((n * k) / 100, ans, "That's the expected number for the outcome you were given. The question asks about the opposite."),
    };
  }
  if (kind === "fromRF") {
    let x = 18, y = 60, n = 450, ans = 135;
    for (let i = 0; i < 100; i++) {
      y = rng.pick([20, 40, 50, 60, 80, 120]);
      x = rng.int(Math.ceil(y * 0.2), Math.floor(y * 0.85));
      const [rn, rd] = simplify(x, y);
      n = rd * rng.int(Math.ceil(100 / rd), Math.floor(900 / rd));
      ans = (n * rn) / rd;
      if (n !== y && rd > 1 && Number.isInteger(ans)) break;
    }
    const ctx = rng.pick([
      { trial: `In a trial, ${x} out of ${y} seeds germinated.`, q: `Estimate how many of ${n} seeds would germinate.` },
      { trial: `A drawing pin landed point up ${x} times in ${y} drops.`, q: `Estimate how many times it would land point up in ${n} drops.` },
      { trial: `Siti found that ${x} of the first ${y} customers at her stall paid by card.`, q: `Estimate how many of the next ${n} customers will pay by card.` },
    ]);
    return {
      prompt: `${ctx.trial} ${ctx.q}`,
      answer: { type: "number", value: ans },
      solution: [`Relative frequency = ${fShow(x, y)}, our best estimate of the probability.`, `Estimate = ${frac(x, y)} × ${n} = ${ans}`],
      hint: "Use the relative frequency from the trial as the probability, then multiply by the new number of trials.",
      traps: nTrap(n - ans, ans, "That's the estimate for the opposite outcome."),
    };
  }
  // observed vs expected (stretch flavour)
  const face = rng.int(1, 6);
  const n = 6 * rng.int(10, 100);
  const e = n / 6;
  const extra = rng.int(Math.max(3, Math.round(e * 0.1)), Math.max(4, Math.round(e * 0.6)));
  const obs = e + extra;
  return {
    prompt: `A dice is rolled ${n} times and lands on ${face} a total of ${obs} times. How many more times did it land on ${face} than you would expect for a fair dice?`,
    answer: { type: "number", value: extra },
    solution: [
      `For a fair dice, P(${face}) = ${frac(1, 6)}, so the expected number is ${frac(1, 6)} × ${n} = ${e}.`,
      `${obs} − ${e} = ${extra} more than expected.`,
      "Some difference from the expected number is normal. A big gap over many rolls suggests the dice may be biased.",
    ],
    hint: "First work out how many you'd expect from a fair dice, then compare.",
    traps: nTrap(e, extra, "That's the expected number. Now compare it with what actually happened."),
  };
}

// ---------------------------------------------------------------------------
// 11. Tree diagrams: independent events (stretch)
// ---------------------------------------------------------------------------

const TREE_CTXS = [
  {
    intro: (p: string, q: string) => `The probability that it rains on Saturday is ${p}. The probability that it rains on Sunday is ${q}. The two days are independent.`,
    h1: "Saturday", h2: "Sunday", yes: "Rain", no: "Dry", same: false,
    both: "it rains on both days", neither: "it rains on neither day", exactly: "it rains on exactly one of the two days", atLeast: "it rains on at least one of the two days",
  },
  {
    intro: (p: string) => `Arjun takes two penalties. Each time, the probability that he scores is ${p}, independently.`,
    h1: "1st penalty", h2: "2nd penalty", yes: "Score", no: "Miss", same: true,
    both: "he scores both", neither: "he misses both", exactly: "he scores exactly one", atLeast: "he scores at least one",
  },
  {
    intro: (p: string, q: string) => `The probability that Siti's bus is late is ${p}. The probability that her MRT train is late is ${q}. The two are independent.`,
    h1: "Bus", h2: "Train", yes: "Late", no: "On time", same: false,
    both: "both are late", neither: "neither is late", exactly: "exactly one of them is late", atLeast: "at least one of them is late",
  },
  {
    intro: (p: string) => `A biased coin lands on heads with probability ${p}. It is flipped twice.`,
    h1: "1st flip", h2: "2nd flip", yes: "Head", no: "Tail", same: true,
    both: "it lands on heads both times", neither: "it lands on tails both times", exactly: "it lands on heads exactly once", atLeast: "it lands on heads at least once",
  },
  {
    intro: (p: string, q: string) => `Priya and Zara each try a hard puzzle. The probability that Priya solves it is ${p} and the probability that Zara solves it is ${q}, independently.`,
    h1: "Priya", h2: "Zara", yes: "Solves", no: "Doesn't", same: false,
    both: "both of them solve it", neither: "neither of them solves it", exactly: "exactly one of them solves it", atLeast: "at least one of them solves it",
  },
];

function treeSvg(h1: string, h2: string, yes: string, no: string, p: string, pn: string, q: string, qn: string): string {
  const line = (x1: number, y1: number, x2: number, y2: number) => `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#1f2937" stroke-width="2"/>`;
  const txt = (x: number, y: number, s: string, anchor = "start", fill = "#1f2937") =>
    `<text x="${x}" y="${y}" font-size="13" font-family="sans-serif" fill="${fill}" text-anchor="${anchor}">${s}</text>`;
  return (
    `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tree diagram: ${h1} ${yes} ${p} or ${no} ${pn}, then ${h2} ${yes} ${q} or ${no} ${qn} on each branch">` +
    `<rect x="0" y="0" width="400" height="240" fill="#ffffff"/>` +
    txt(80, 16, h1, "middle", "#334155") + txt(262, 16, h2, "middle", "#334155") +
    line(20, 120, 140, 65) + line(20, 120, 140, 175) +
    txt(146, 70, yes) + txt(146, 180, no) +
    txt(68, 80, p, "middle") + txt(68, 168, pn, "middle") +
    line(205, 65, 320, 35) + line(205, 65, 320, 95) + line(205, 175, 320, 145) + line(205, 175, 320, 205) +
    txt(326, 40, yes) + txt(326, 100, no) + txt(326, 150, yes) + txt(326, 210, no) +
    txt(255, 40, q, "middle") + txt(255, 99, qn, "middle") + txt(255, 150, q, "middle") + txt(255, 209, qn, "middle") +
    `</svg>`
  );
}

function treeIndependent(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick(TREE_CTXS);
  let P = 30, Q = 60;
  for (let i = 0; i < 100; i++) {
    P = tier === 3 && rng.bool() ? rng.int(1, 19) * 5 : rng.int(1, 9) * 10;
    Q = ctx.same ? P : rng.int(1, 9) * 10;
    if (P !== 50 || Q !== 50) break;
  }
  const kind = tier === 1 ? "both" : tier === 2 ? rng.pick(["both", "neither", "exactly"]) : rng.pick(["exactly", "atLeast", "neither"]);
  const d = (h: number) => num(clean(h / 100));
  const p = d(P), pn = d(100 - P), q = d(Q), qn = d(100 - Q);
  const both = clean((P * Q) / 10000);
  const nei = clean(((100 - P) * (100 - Q)) / 10000);
  const yn = clean((P * (100 - Q)) / 10000);
  const ny = clean(((100 - P) * Q) / 10000);
  const exactly = clean(yn + ny);
  const atLeast = clean(1 - nei);
  let ans: number, phrase: string, steps: string[], traps: Trap[];
  if (kind === "both") {
    ans = both; phrase = ctx.both;
    steps = [`Follow the ${ctx.yes}–${ctx.yes} branches and multiply: ${p} × ${q} = ${num(both)}.`];
    traps = nTrap(clean((P + Q) / 100), ans, "For 'and' along a tree, multiply the probabilities — don't add them.");
  } else if (kind === "neither") {
    ans = nei; phrase = ctx.neither;
    steps = [`The "${ctx.no}" branches have probabilities 1 − ${p} = ${pn} (${ctx.h1}) and 1 − ${q} = ${qn} (${ctx.h2}).`, `Multiply along the ${ctx.no}–${ctx.no} route: ${pn} × ${qn} = ${num(nei)}.`];
    traps = nTrap(clean(1 - both), ans, `That's 1 − P(${ctx.yes}–${ctx.yes}), which still includes the mixed routes. You want only the ${ctx.no}–${ctx.no} route: multiply ${pn} × ${qn}.`);
  } else if (kind === "exactly") {
    ans = exactly; phrase = ctx.exactly;
    steps = [
      `Two routes: ${ctx.yes}–${ctx.no} gives ${p} × ${qn} = ${num(yn)}; ${ctx.no}–${ctx.yes} gives ${pn} × ${q} = ${num(ny)}.`,
      `Add the routes: ${num(yn)} + ${num(ny)} = ${num(exactly)}.`,
    ];
    traps = nTrap(yn, ans, `That's only one route (${ctx.yes} then ${ctx.no}). Add the other route too.`);
  } else {
    ans = atLeast; phrase = ctx.atLeast;
    steps = [
      `Quickest: use the opposite. P(neither) = ${pn} × ${qn} = ${num(nei)}.`,
      `P(at least one) = 1 − ${num(nei)} = ${num(atLeast)}.`,
    ];
    traps = nTrap(clean((P + Q) / 100), ans, `Adding ${p} + ${q} counts the "both" outcome twice. Try 1 − P(neither).`);
  }
  const diagram = tier < 3 ? treeSvg(ctx.h1, ctx.h2, ctx.yes, ctx.no, p, pn, q, qn) : undefined;
  return {
    prompt: `${ctx.intro(p, q)}${diagram ? " The tree diagram shows the probabilities." : " Draw a tree diagram to help."} Find the probability that ${phrase}. Give your answer as a decimal.`,
    answer: decSpec(ans),
    solution: [...steps, `Answer: ${num(ans)}`],
    hint: "Multiply along the branches for one route; add the results of different routes.",
    traps,
    ...(diagram ? { diagram } : {}),
  };
}

// ---------------------------------------------------------------------------
// 12. Two picks without replacement (stretch)
// ---------------------------------------------------------------------------

function withoutReplacement(rng: Rng, tier: Tier): DrillItem {
  const ctx = rng.pick([
    { setup: (r: number, b: number) => `A bag contains ${r} red and ${b} blue counters. Ethan takes a counter at random and does **not** put it back. He then takes a second counter.`, A: "red", B: "blue" },
    { setup: (r: number, b: number) => `A box holds ${r} mango and ${b} lychee jellies. Mei eats one at random, then eats a second one at random.`, A: "mango", B: "lychee" },
    { setup: (r: number, b: number) => `A pencil case holds ${r} blue pens and ${b} black pens. Two pens are taken out at random, one after the other, without replacement.`, A: "blue", B: "black" },
  ]);
  let r = 3, b = 4;
  const kind = tier === 1 ? "bothA" : tier === 2 ? rng.pick(["bothA", "bothB", "same"]) : rng.pick(["mixed", "atLeastA", "same"]);
  for (let i = 0; i < 100; i++) {
    r = rng.int(2, tier === 1 ? 6 : 9);
    b = rng.int(2, tier === 1 ? 6 : 9);
    if (r !== b || tier === 3) break;
  }
  const T = r + b, D = T * (T - 1);
  const fr = (n: number, d: number) => frac(n, d, { simplify: false });
  let n: number, phrase: string, steps: string[], traps: Trap[] = [];
  if (kind === "bothA" || kind === "bothB") {
    const c = kind === "bothA" ? r : b;
    const col = kind === "bothA" ? ctx.A : ctx.B;
    n = c * (c - 1);
    phrase = `both are ${col}`;
    steps = [`First ${col}: ${fr(c, T)}. One ${col} has gone, so second ${col}: ${fr(c - 1, T - 1)}.`, `${fr(c, T)} × ${fr(c - 1, T - 1)} = ${fShow(n, D)}`];
    const [an, ad] = simplify(n, D);
    traps = fTrap(c * c, T * T, an, ad, `That treats the first one as put back. Without replacement, the second fraction is ${fr(c - 1, T - 1)}.`);
  } else if (kind === "same") {
    n = r * (r - 1) + b * (b - 1);
    phrase = "both are the same colour";
    if (ctx.A === "mango") phrase = "both are the same flavour";
    steps = [
      `Both ${ctx.A}: ${fr(r, T)} × ${fr(r - 1, T - 1)} = ${fr(r * (r - 1), D)}.`,
      `Both ${ctx.B}: ${fr(b, T)} × ${fr(b - 1, T - 1)} = ${fr(b * (b - 1), D)}.`,
      `Add: ${fShow(n, D)}`,
    ];
    const [an, ad] = simplify(n, D);
    traps = fTrap(r * (r - 1), D, an, ad, `That's only "both ${ctx.A}". "The same" also includes "both ${ctx.B}".`);
  } else if (kind === "mixed") {
    n = 2 * r * b;
    phrase = `one is ${ctx.A} and one is ${ctx.B}`;
    steps = [
      `${cap(ctx.A)} then ${ctx.B}: ${fr(r, T)} × ${fr(b, T - 1)} = ${fr(r * b, D)}.`,
      `${cap(ctx.B)} then ${ctx.A}: ${fr(b, T)} × ${fr(r, T - 1)} = ${fr(r * b, D)}.`,
      `Add the two routes: ${fShow(n, D)}`,
    ];
    const [an, ad] = simplify(n, D);
    traps = fTrap(r * b, D, an, ad, `There are two orders: ${ctx.A} then ${ctx.B}, AND ${ctx.B} then ${ctx.A}.`);
  } else {
    n = D - b * (b - 1);
    phrase = `at least one is ${ctx.A}`;
    steps = [
      `Use the opposite: P(no ${ctx.A}) = P(both ${ctx.B}) = ${fr(b, T)} × ${fr(b - 1, T - 1)} = ${fr(b * (b - 1), D)}.`,
      `P(at least one ${ctx.A}) = 1 − ${fr(b * (b - 1), D)} = ${fShow(n, D)}`,
    ];
    const [an, ad] = simplify(n, D);
    traps = fTrap(T * T - b * b, T * T, an, ad, `That treats the first one as put back. Without replacement, the second fraction changes.`);
  }
  return {
    prompt: `${ctx.setup(r, b)} Find the probability that ${phrase}.${SIMPLEST}`,
    answer: fs(n, D),
    solution: steps,
    hint: "After the first pick there is one fewer item in total — and one fewer of the colour you took.",
    traps,
  };
}

// ---------------------------------------------------------------------------
// The drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  {
    id: "probability.single-event",
    topicId: "probability",
    title: "Find the probability of a single event",
    level: 1,
    guideRef: "probability-scale",
    generate(rng, tier) {
      const kinds = tier === 1 ? ["bag", "cards"] : ["bag", "cards", "letters"];
      const kind = rng.pick(kinds);
      if (kind === "bag") return bagEvent(rng, tier);
      if (kind === "cards") return cardEvent(rng, tier);
      return letterEvent(rng, tier);
    },
  },
  {
    id: "probability.complement",
    topicId: "probability",
    title: "Find the probability that something does NOT happen",
    level: 1,
    guideRef: "complementary-events",
    generate: complementDrill,
  },
  {
    id: "probability.product-rule",
    topicId: "probability",
    title: "Count outcomes with the product rule",
    level: 1,
    guideRef: "sample-spaces",
    generate: productRule,
  },
  {
    id: "probability.missing-probability",
    topicId: "probability",
    title: "Find a missing probability in a table",
    level: 2,
    guideRef: "complementary-events",
    generate: missingProb,
  },
  {
    id: "probability.sample-space-count",
    topicId: "probability",
    title: "Count outcomes in a sample space diagram",
    level: 2,
    guideRef: "sample-spaces",
    generate: sampleSpaceCount,
  },
  {
    id: "probability.combined-events",
    topicId: "probability",
    title: "Probability of combined events (two dice, coins, spinners)",
    level: 2,
    guideRef: "combined-events",
    generate: combinedEvents,
  },
  {
    id: "probability.two-way-table",
    topicId: "probability",
    title: "Probability from a two-way table",
    level: 2,
    guideRef: "two-way-tables-venn",
    generate: twoWayTable,
  },
  {
    id: "probability.venn-diagram",
    topicId: "probability",
    title: "Probability from a Venn diagram",
    level: 2,
    guideRef: "two-way-tables-venn",
    generate: vennDrill,
  },
  {
    id: "probability.relative-frequency",
    topicId: "probability",
    title: "Relative frequency from an experiment",
    level: 2,
    guideRef: "relative-frequency",
    generate: relFreq,
  },
  {
    id: "probability.expected-outcomes",
    topicId: "probability",
    title: "How many times would you expect it?",
    level: 2,
    guideRef: "expected-outcomes",
    generate: expected,
  },
  {
    id: "probability.tree-independent",
    topicId: "probability",
    title: "Tree diagrams for two independent events",
    level: 3,
    guideRef: "tree-diagrams",
    generate: treeIndependent,
  },
  {
    id: "probability.without-replacement",
    topicId: "probability",
    title: "Two picks without replacement",
    level: 3,
    guideRef: "tree-diagrams",
    generate: withoutReplacement,
  },
];
