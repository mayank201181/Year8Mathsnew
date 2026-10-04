// Procedural skill drills for "Constructions, Scale Drawings & Bearings".
// Every answer is built from integers (or tenths) so it is exact.
import type { Drill } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { br, clean, num, poly, term } from "./helpers.ts";

const T = "constructions-bearings";
const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

/** 47 → "47°". */
function deg(a: number): string {
  return `${num(a)}°`;
}

/** Three-figure bearing: 35 → "035°", 22.5 → "022.5°", 300 → "300°". */
function brg(b: number): string {
  const v = clean(b);
  const whole = Math.floor(v);
  const rest = clean(v - whole);
  return String(whole).padStart(3, "0") + (rest ? String(rest).slice(1) : "") + "°";
}

/** Large whole numbers with a space every three digits (UK map style): 50000 → "50 000". */
function spaced(n: number): string {
  const v = clean(n);
  if (!Number.isInteger(v) || Math.abs(v) < 10000) return num(v);
  return String(v).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

const mod360 = (x: number) => ((x % 360) + 360) % 360;
/** Back bearing: add 180° if under 180°, otherwise subtract 180°. */
const backOf = (b: number) => (b < 180 ? b + 180 : b - 180);

function numAns(v: number, display?: string): AnswerSpec {
  return display ? { type: "number", value: clean(v), display } : { type: "number", value: clean(v) };
}

/** Number traps, dropping any that equal the answer (or each other). */
function numTraps(answer: number, list: Array<[number, string]>): Trap[] {
  const seen = [clean(answer)];
  const out: Trap[] = [];
  for (const [v0, feedback] of list) {
    const v = clean(v0);
    if (!Number.isFinite(v) || seen.includes(v)) continue;
    seen.push(v);
    out.push({ spec: { type: "number", value: v }, feedback });
  }
  return out;
}

/** Ordered-pair traps, dropping any that equal the answer. */
function pairTraps(answer: [number, number], list: Array<[[number, number], string]>): Trap[] {
  const out: Trap[] = [];
  const seen = [answer.map((v) => clean(v)).join(",")];
  for (const [vals, feedback] of list) {
    const key = vals.map((v) => clean(v)).join(",");
    if (seen.includes(key)) continue;
    seen.push(key);
    out.push({ spec: { type: "list", values: vals.map((v) => clean(v)), ordered: true }, feedback });
  }
  return out;
}

const pt = (x: number, y: number) => `(${num(x)}, ${num(y)})`;

/**
 * A protractor (outer scale 0 on the left, inner scale 0 on the right) with two arms
 * drawn from the centre at directions phi1 and phi2 (degrees anticlockwise from the right).
 */
function protractorSvg(phi1: number, phi2: number, label: string): string {
  const cx = 180, cy = 182;
  const P = (r: number, phi: number): [number, number] => {
    const t = (phi * Math.PI) / 180;
    return [Math.round((cx + r * Math.cos(t)) * 10) / 10, Math.round((cy - r * Math.sin(t)) * 10) / 10];
  };
  let s = `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">`;
  s += `<rect x="0" y="0" width="360" height="200" fill="#ffffff"/>`;
  s += `<path d="M 30 182 A 150 150 0 0 1 330 182 Z" fill="#bae6fd" fill-opacity="0.5" stroke="#334155" stroke-width="1.5"/>`;
  for (let d = 0; d <= 180; d += 10) {
    const [x1, y1] = P(d % 30 === 0 ? 137 : 143, d);
    const [x2, y2] = P(150, d);
    s += `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="#334155" stroke-width="1"/>`;
  }
  for (let d = 0; d <= 180; d += 30) {
    const lift = d === 0 || d === 180 ? 9 : 0;
    const [ox, oy] = P(126, d);
    const [ix, iy] = P(104, d);
    s += `<text x="${ox}" y="${oy - lift}" font-size="11" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle" fill="#1f2937">${180 - d}</text>`;
    s += `<text x="${ix}" y="${iy - lift}" font-size="11" font-family="sans-serif" text-anchor="middle" dominant-baseline="middle" fill="#2563eb">${d}</text>`;
  }
  const [a1x, a1y] = P(170, phi1);
  const [a2x, a2y] = P(170, phi2);
  s += `<line x1="${cx}" y1="${cy}" x2="${a1x}" y2="${a1y}" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>`;
  s += `<line x1="${cx}" y1="${cy}" x2="${a2x}" y2="${a2y}" stroke="#1f2937" stroke-width="3" stroke-linecap="round"/>`;
  s += `<circle cx="${cx}" cy="${cy}" r="3.5" fill="#1f2937"/>`;
  s += `<text x="290" y="20" font-size="11" font-family="sans-serif" fill="#1f2937">outer scale</text>`;
  s += `<text x="290" y="36" font-size="11" font-family="sans-serif" fill="#2563eb">inner scale</text>`;
  s += `</svg>`;
  return s;
}

/** Place names used in pairs for bearing questions. */
const PLACES: Array<[string, string]> = [
  ["the lighthouse", "the harbour"],
  ["the school", "the MRT station"],
  ["the campsite", "the waterfall"],
  ["the ferry terminal", "the Sentosa jetty"],
  ["the library", "the hawker centre"],
  ["the jetty", "the buoy"],
  ["the bus interchange", "the sports hall"],
  ["the visitor centre", "the reservoir hut"],
];

export const drills: Drill[] = [
  // -------------------------------------------------------------------------
  // LEVEL 1
  // -------------------------------------------------------------------------
  {
    id: `${T}.read-protractor`,
    topicId: T,
    title: "Read a protractor and find reflex angles",
    level: 1,
    guideRef: "measuring-angles",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const angle = (): number => {
        for (let i = 0; i < 100; i++) {
          const a = tier === 1 ? rng.int(2, 16) * 10 : tier === 2 ? rng.int(3, 33) * 5 : rng.int(11, 169);
          if (Math.abs(a - 90) >= 15) return a;
        }
        return 40;
      };
      const modes = tier === 1 ? ["scale", "scale", "pair", "reflex"] : tier === 2 ? ["scale", "reflex", "clock", "pair"] : ["scale", "scale-reflex", "draw-reflex", "clock"];
      const mode = rng.pick(modes);

      if (mode === "scale" || mode === "scale-reflex") {
        const a = angle();
        const zero = rng.bool() ? "inner" : "outer";
        // Inner scale reads phi (0 on the right); outer scale reads 180 − phi (0 on the left).
        const phi1 = zero === "inner" ? 0 : 180;
        const phi2 = zero === "inner" ? a : 180 - a;
        const outer = 180 - phi2;
        const inner = phi2;
        const setup = `${who} puts the centre of a protractor on the vertex of the angle shown. One arm lies along the 0 line of the **${zero}** scale. The other arm passes the mark where the outer scale reads ${outer}° and the inner scale reads ${inner}°.`;
        const diagram = protractorSvg(phi1, phi2, `A protractor measuring an angle. One arm lies along the 0 line of the ${zero} scale.`);
        const kind = a < 90 ? "acute" : "obtuse";
        if (mode === "scale") {
          return {
            prompt: `${setup} What size is the angle?`,
            diagram,
            answer: numAns(a, deg(a)),
            solution: [
              `The first arm sits on the 0 of the ${zero} scale, so count up on the ${zero} scale.`,
              `The ${zero} scale reads ${a}° at the second arm, so the angle is ${a}°.`,
              `Check with an estimate: the angle in the picture is ${kind}, and ${a}° is ${kind}. The other reading, ${180 - a}°, is from the wrong scale.`,
            ],
            hint: "Estimate first: is the angle acute or obtuse? Then read the scale whose 0 sits on the first arm.",
            traps: numTraps(a, [[180 - a, "You read the other scale. Count up from the 0 that sits on the first arm — and check against your estimate."]]),
          };
        }
        return {
          prompt: `${setup} What is the size of the **reflex** angle between the two arms?`,
          diagram,
          answer: numAns(360 - a, deg(360 - a)),
          solution: [
            `The first arm is on the 0 of the ${zero} scale, so the angle inside the protractor is ${a}° (it looks ${kind}).`,
            "The reflex angle goes the long way round. An angle and its reflex angle make a full turn of 360°.",
            `Reflex angle = 360° − ${a}° = ${360 - a}°.`,
          ],
          hint: "First find the angle inside the protractor (read the scale whose 0 is on an arm). Then use the full turn.",
          traps: numTraps(360 - a, [
            [180 + a, "You read the wrong scale first. The scale with 0 on the first arm gives the inside angle."],
            [a, "That is the angle inside the protractor. The reflex angle is the one bigger than 180°."],
          ]),
        };
      }

      if (mode === "pair") {
        const x = angle();
        const given = rng.bool() ? "inner" : "outer";
        const other = given === "inner" ? "outer" : "inner";
        return {
          prompt: `At one mark on a protractor, the ${given} scale reads ${x}°. What does the ${other} scale read at the same mark?`,
          answer: numAns(180 - x, deg(180 - x)),
          solution: [
            "The two scales number the same marks, but from opposite ends of the half-circle.",
            "So the two readings at any mark always add to 180°.",
            `${other[0].toUpperCase() + other.slice(1)} reading = 180° − ${x}° = ${180 - x}°.`,
          ],
          hint: "The two scales count the same 180 steps from opposite ends.",
          traps: numTraps(180 - x, [[360 - x, "A protractor is a half-turn, so the two readings add to 180°, not 360°."]]),
        };
      }

      if (mode === "reflex") {
        const a = angle();
        const ctx = rng.pick([
          `${who} measures an angle with a protractor and gets ${a}°.`,
          `Two straight roads meet at a junction, making an angle of ${a}°.`,
          `The two arms of a pair of compasses are opened to an angle of ${a}°.`,
        ]);
        return {
          prompt: `${ctx} What is the reflex angle on the other side of the same two arms?`,
          answer: numAns(360 - a, deg(360 - a)),
          solution: [
            "The angle and the reflex angle together make a full turn.",
            "A full turn is 360°.",
            `Reflex angle = 360° − ${a}° = ${360 - a}°.`,
          ],
          hint: "Together, the two angles go all the way round.",
          traps: numTraps(360 - a, [[180 - a, "That uses a straight line (180°). The two angles go all the way round, so use 360°."]]),
        };
      }

      if (mode === "draw-reflex") {
        let R = 250;
        for (let i = 0; i < 100; i++) {
          R = rng.int(191, 349);
          if (R !== 270) break;
        }
        return {
          prompt: `${who} needs to draw a reflex angle of ${R}°. A protractor only goes up to 180°, so ${who} first draws the smaller angle on the other side of the arms. What size should that smaller angle be?`,
          answer: numAns(360 - R, deg(360 - R)),
          solution: [
            "The reflex angle and the smaller angle make a full turn of 360°.",
            `Smaller angle = 360° − ${R}° = ${360 - R}°.`,
            `Draw ${360 - R}° with the protractor; the reflex angle on the outside is then ${R}°.`,
          ],
          hint: "What do the reflex angle and the angle on the other side add up to?",
          traps: numTraps(360 - R, [[R - 180, "Subtracting 180° uses a straight line. The two angles make a full turn, 360°."]]),
        };
      }

      // clock: angle between the hands, then the reflex angle
      const half = tier === 3 && rng.bool(0.6);
      let h = 4;
      for (let i = 0; i < 100; i++) {
        h = rng.int(1, 12);
        if (half || (h !== 6 && h !== 12)) break;
      }
      const hourAngle = 30 * (h % 12) + (half ? 15 : 0);
      const minuteAngle = half ? 180 : 0;
      const d = Math.abs(hourAngle - minuteAngle);
      const small = Math.min(d, 360 - d);
      const reflex = 360 - small;
      const time = half ? `${h}:30` : `${h} o'clock`;
      const steps = half
        ? [
            "The minute hand points at 6, which is 180° round from 12.",
            `The hour hand moves 30° per hour and is halfway between ${h} and ${(h % 12) + 1}: 30° × ${h % 12} + 15° = ${hourAngle}° round from 12.`,
            `The hands are ${Math.max(hourAngle, minuteAngle)}° − ${Math.min(hourAngle, minuteAngle)}° = ${small}° apart, so the reflex angle is 360° − ${small}° = ${reflex}°.`,
          ]
        : [
            "Each hour mark is 360° ÷ 12 = 30° apart.",
            `At ${h} o'clock the hands are ${Math.min(h, 12 - h)} hour marks apart (the short way): ${Math.min(h, 12 - h)} × 30° = ${small}°.`,
            `Reflex angle = 360° − ${small}° = ${reflex}°.`,
          ];
      return {
        prompt: `What is the **reflex** angle between the hour hand and the minute hand of a clock at ${time}?`,
        answer: numAns(reflex, deg(reflex)),
        solution: steps,
        hint: half ? "At half past, the hour hand is halfway between two numbers. Each hour mark is 30°." : "Each hour mark on a clock is 30° apart.",
        traps: numTraps(reflex, [[small, "That is the smaller angle between the hands. The reflex angle is the one bigger than 180°."]]),
      };
    },
  },
  {
    id: `${T}.triangle-method`,
    topicId: T,
    title: "Choose SSS, SAS or ASA to construct a triangle",
    level: 1,
    guideRef: "constructing-triangles",
    generate(rng, tier) {
      const L = rng.pick(["ABC", "PQR", "XYZ", "DEF", "LMN", "KLM", "RST", "JKL"]).split("");
      const who = rng.pick(NAMES);
      const side = () => (tier === 1 ? rng.int(4, 11) : clean(rng.int(35, 115) / 10));
      const ang = () => (tier === 1 ? rng.int(5, 22) * 5 : rng.int(25, 115));
      const sideName = (i: number, j: number) => (i < j ? L[i] + L[j] : L[j] + L[i]);
      const angleName = (v: number) => {
        const o = [0, 1, 2].filter((k) => k !== v);
        return tier === 3 && rng.bool(0.5) ? `the angle at ${L[v]}` : `angle ${L[o[0]]}${L[v]}${L[o[1]]}`;
      };
      const kind = rng.pick(["SSS", "SAS", "ASA"] as const);
      const v = rng.int(0, 2);
      const [p, q] = [0, 1, 2].filter((k) => k !== v);
      let facts: string[];
      let steps: string[];
      if (kind === "SSS") {
        let s = [6, 7, 8];
        for (let i = 0; i < 100; i++) {
          s = [side(), side(), side()];
          const so = [...s].sort((x, y) => x - y);
          if (clean(so[0] + so[1]) >= so[2] + 1 && new Set(s).size >= 2) break;
        }
        facts = [`${sideName(0, 1)} = ${num(s[0])} cm`, `${sideName(1, 2)} = ${num(s[1])} cm`, `${sideName(0, 2)} = ${num(s[2])} cm`];
        steps = [
          "You are given all three sides and no angles, so this is **SSS** (side, side, side).",
          `Draw ${sideName(0, 1)} = ${num(s[0])} cm. Set the compasses to ${num(s[2])} cm and draw an arc from ${L[0]}; set them to ${num(s[1])} cm and draw an arc from ${L[1]}.`,
          `The arcs cross at ${L[2]}. Join ${L[2]} to ${L[0]} and to ${L[1]}, leaving the arcs visible.`,
        ];
      } else if (kind === "SAS") {
        const s1 = side(), s2 = side(), a = ang();
        const an = angleName(v);
        facts = [`${sideName(v, p)} = ${num(s1)} cm`, `${sideName(v, q)} = ${num(s2)} cm`, `${an} = ${a}°`];
        steps = [
          `The angle is at ${L[v]}, exactly where ${sideName(v, p)} and ${sideName(v, q)} meet. One angle *between* two sides: **SAS** (side, angle, side).`,
          `Draw ${sideName(v, p)} = ${num(s1)} cm. At ${L[v]}, measure ${a}° with a protractor and draw a long arm.`,
          `Mark ${L[q]} on that arm, ${num(s2)} cm from ${L[v]}. Join ${L[p]} to ${L[q]}.`,
        ];
      } else {
        let a1 = 50, a2 = 60;
        for (let i = 0; i < 100; i++) {
          a1 = ang();
          a2 = ang();
          if (a1 + a2 <= 160) break;
        }
        const s = side();
        facts = [`${sideName(p, q)} = ${num(s)} cm`, `${angleName(p)} = ${a1}°`, `${angleName(q)} = ${a2}°`];
        steps = [
          `The two angles are at ${L[p]} and ${L[q]}, the two ends of ${sideName(p, q)}. The side is *between* the two angles: **ASA** (angle, side, angle).`,
          `Draw ${sideName(p, q)} = ${num(s)} cm. Measure ${a1}° at ${L[p]} and ${a2}° at ${L[q]}, and draw long arms.`,
          `The arms cross at ${L[v]}. Check: the angle there should be 180° − ${a1}° − ${a2}° = ${180 - a1 - a2}°.`,
        ];
      }
      if (tier > 1) facts = rng.shuffle(facts);
      const accept =
        kind === "SSS" ? ["SSS", "side side side", "side-side-side"] : kind === "SAS" ? ["SAS", "side angle side", "side-angle-side"] : ["ASA", "angle side angle", "angle-side-angle"];
      const traps: Trap[] =
        kind === "SAS"
          ? [{ spec: { type: "text", accept: ["ASA"] }, feedback: "ASA needs two angles. Here there is one angle, sitting where the two given sides meet." }]
          : kind === "ASA"
            ? [{ spec: { type: "text", accept: ["SAS"] }, feedback: "SAS needs two sides. Here there are two angles, with the given side joining them." }]
            : [{ spec: { type: "text", accept: ["SAS"] }, feedback: "No angle is given here — only sides." }];
      const intro = rng.pick([`${who} is asked to construct`, "You need to construct", `For homework, ${who} must construct`]);
      return {
        prompt: `${intro} triangle ${L.join("")} with ${facts[0]}, ${facts[1]} and ${facts[2]}. Which construction is this: **SSS**, **SAS** or **ASA**? Type SSS, SAS or ASA.`,
        answer: { type: "text", accept, display: kind },
        solution: steps,
        hint: "Count the sides and angles you are given. If there is one angle, is it where the two given sides meet?",
        traps,
      };
    },
  },
  {
    id: `${T}.bisect-an-angle`,
    topicId: T,
    title: "Use an angle bisector to find angles",
    level: 1,
    guideRef: "angle-bisector",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const modes = tier === 1 ? ["half", "half", "double"] : tier === 2 ? ["half", "double", "line"] : ["line", "adjacent", "special", "double"];
      const mode = rng.pick(modes);
      const [P, Q, R, S] = rng.pick([["P", "Q", "R", "S"], ["A", "B", "C", "D"], ["X", "Y", "Z", "W"], ["K", "L", "M", "N"], ["E", "F", "G", "H"]]);

      if (mode === "half") {
        const a = tier === 1 ? rng.int(15, 85) * 2 : rng.int(21, 179);
        const h = clean(a / 2);
        return {
          prompt: `Angle ${P}${Q}${R} = ${a}°. ${who} constructs the bisector ${Q}${S} of this angle using compasses. What size is angle ${P}${Q}${S}?`,
          answer: numAns(h, deg(h)),
          solution: [
            "A bisector cuts an angle into two equal halves.",
            `Angle ${P}${Q}${S} = ${a}° ÷ 2 = ${num(h)}°.`,
          ],
          hint: "Bisect means cut into two equal parts.",
          traps: numTraps(h, [[2 * a, "Bisecting halves the angle — it does not double it."]]),
        };
      }

      if (mode === "double") {
        const h = tier === 1 ? rng.int(15, 85) : clean(rng.int(25, 175) / 2);
        const a = clean(2 * h);
        return {
          prompt: `${who} bisects angle ${P}${Q}${R}. Each of the two new angles measures ${num(h)}°. How big was angle ${P}${Q}${R}?`,
          answer: numAns(a, deg(a)),
          solution: [
            "The bisector splits the angle into two equal halves.",
            `So the whole angle is 2 × ${num(h)}° = ${num(a)}°.`,
          ],
          hint: "Work backwards: each half is the same size.",
          traps: numTraps(a, [[h / 2, "You halved again. The original angle is made of two halves, so double it."]]),
        };
      }

      if (mode === "line") {
        const a = tier === 2 ? rng.int(10, 80) * 2 : rng.int(21, 159);
        const half = clean(a / 2);
        const ans = clean(180 - a / 2);
        return {
          prompt: `AOB is a straight line. C is a point above the line, with angle AOC = ${a}°. OX bisects angle AOC. Find angle XOB.`,
          answer: numAns(ans, deg(ans)),
          solution: [
            `OX bisects angle AOC, so angle AOX = angle XOC = ${a}° ÷ 2 = ${num(half)}°.`,
            `Angles on a straight line add to 180°, so angle COB = 180° − ${a}° = ${180 - a}°.`,
            `Angle XOB = angle XOC + angle COB = ${num(half)}° + ${180 - a}° = ${num(ans)}°.`,
          ],
          hint: "Find angle XOC first, then use angles on a straight line.",
          traps: numTraps(ans, [
            [half, "That is angle AOX (or XOC). Angle XOB also includes angle COB."],
            [180 - a, "That is angle COB on its own — add on angle XOC."],
          ]),
        };
      }

      if (mode === "adjacent") {
        let a = 60, b = 80;
        for (let i = 0; i < 100; i++) {
          a = rng.int(25, 140);
          b = rng.int(25, 140);
          if (a !== b && a + b <= 240) break;
        }
        const ans = clean((a + b) / 2);
        return {
          prompt: `Angle AOC = ${a}° and angle COB = ${b}° sit side by side, sharing the arm OC. OX bisects angle AOC and OY bisects angle COB. Find angle XOY.`,
          answer: numAns(ans, deg(ans)),
          solution: [
            `Angle XOC = ${a}° ÷ 2 = ${num(a / 2)}°.`,
            `Angle COY = ${b}° ÷ 2 = ${num(b / 2)}°.`,
            `Angle XOY = ${num(a / 2)}° + ${num(b / 2)}° = ${num(ans)}° — half of the whole angle ${a + b}°.`,
          ],
          hint: "Angle XOY is made of half of each angle.",
          traps: numTraps(ans, [[a + b, "The bisectors only take half of each angle."]]),
        };
      }

      // special: constructing 60°, 90° or 120°, then bisecting repeatedly
      const base = rng.pick([
        { b: 60, how: "by drawing an equilateral triangle with compasses" },
        { b: 90, how: "by constructing a perpendicular" },
        { b: 120, how: "by placing two 60° angles side by side" },
      ]);
      const k = rng.int(1, 3);
      const chain = [base.b];
      for (let i = 0; i < k; i++) chain.push(clean(chain[chain.length - 1] / 2));
      const ans = chain[chain.length - 1];
      const times = k === 1 ? "once" : k === 2 ? "twice" : "three times";
      return {
        prompt: `Using only compasses and a straight edge, ${who} constructs an angle of ${base.b}° ${base.how}. ${who} then bisects it, and keeps bisecting one of the new smaller angles, so that ${times === "once" ? "one bisection is" : `${k} bisections are`} done in total. What size is the final angle?`,
        answer: numAns(ans, deg(ans)),
        solution: [
          "Each bisection halves the angle.",
          `${chain.map((c) => deg(c)).join(" → ")}.`,
          `After bisecting ${times}, the angle is ${deg(ans)}.`,
        ],
        hint: "Halve the angle once for each bisection.",
        traps: k >= 2 ? numTraps(ans, [[base.b / 2, `That is after one bisection — keep halving (${k} times in total).`]]) : undefined,
      };
    },
  },
  {
    id: `${T}.three-figure-bearings`,
    topicId: T,
    title: "Write directions as three-figure bearings",
    level: 1,
    guideRef: "bearings",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const modes = tier === 1 ? ["compass8", "clockwise", "described"] : tier === 2 ? ["described", "anticlockwise", "compass8", "described"] : ["turn", "turn", "described", "compass16"];
      const mode = rng.pick(modes);

      if (mode === "compass8") {
        const c = rng.pick([
          { name: "north-east", b: 45 },
          { name: "due East", b: 90 },
          { name: "south-east", b: 135 },
          { name: "due South", b: 180 },
          { name: "south-west", b: 225 },
          { name: "due West", b: 270 },
          { name: "north-west", b: 315 },
        ]);
        const prompt = rng.pick([
          `A ship sails ${c.name}. Write its direction as a three-figure bearing.`,
          `${who} walks ${c.name} from the park entrance. What three-figure bearing is this?`,
          `What is the three-figure bearing of the direction ${c.name}?`,
        ]);
        const quarter = c.b % 90 === 0;
        return {
          prompt,
          answer: numAns(c.b, brg(c.b)),
          solution: [
            "Bearings are measured clockwise from North: North 000°, East 090°, South 180°, West 270°.",
            quarter
              ? `${c.name[4].toUpperCase() + c.name.slice(5)} is ${c.b / 90} quarter turn${c.b > 90 ? "s" : ""} clockwise from North: ${brg(c.b)}.`
              : `${c.name[0].toUpperCase() + c.name.slice(1)} is halfway between ${c.b === 45 ? "North (000°) and East (090°)" : c.b === 135 ? "East (090°) and South (180°)" : c.b === 225 ? "South (180°) and West (270°)" : "West (270°) and North (360°)"}, so the bearing is ${brg(c.b)}.`,
          ],
          hint: "Start facing North and turn clockwise. A quarter turn is 90°.",
          traps: c.b !== 180 ? numTraps(c.b, [[360 - c.b, "Bearings turn clockwise from North, not anticlockwise."]]) : undefined,
        };
      }

      if (mode === "clockwise") {
        let t = 35;
        for (let i = 0; i < 100; i++) {
          t = rng.int(4, 99);
          if (t !== 45 && t !== 90) break;
        }
        return {
          prompt: `${who} faces North and turns ${t}° clockwise. Write this direction as a three-figure bearing.`,
          answer: numAns(t, brg(t)),
          solution: [
            "A bearing is the angle turned clockwise from North.",
            `The angle is ${t}°. Bearings always have three figures before the decimal point, so add ${t < 10 ? "two zeros" : "a zero"} in front: ${brg(t)}.`,
          ],
          hint: "Three figures: what goes in front of a two-digit angle?",
          traps: numTraps(t, [[360 - t, "Bearings go clockwise from North — this turn already is clockwise."]]),
        };
      }

      if (mode === "anticlockwise") {
        const t = rng.int(5, 175);
        return {
          prompt: `${who} faces North and turns ${t}° **anticlockwise**. What is the three-figure bearing of the direction ${who} now faces?`,
          answer: numAns(360 - t, brg(360 - t)),
          solution: [
            "Bearings are measured clockwise from North, and a full turn is 360°.",
            `Turning ${t}° anticlockwise ends in the same place as turning 360° − ${t}° = ${360 - t}° clockwise.`,
            `So the bearing is ${brg(360 - t)}.`,
          ],
          hint: "Bearings only go clockwise. How far clockwise reaches the same direction?",
          traps: numTraps(360 - t, [[t, "Bearings are measured clockwise. An anticlockwise turn of t° is a clockwise turn of 360° − t°."]]),
        };
      }

      if (mode === "described") {
        const all = [
          { from: "North", to: "East", base: 0, sign: 1 },
          { from: "North", to: "West", base: 360, sign: -1 },
          { from: "South", to: "East", base: 180, sign: -1 },
          { from: "South", to: "West", base: 180, sign: 1 },
          { from: "East", to: "North", base: 90, sign: -1 },
          { from: "East", to: "South", base: 90, sign: 1 },
          { from: "West", to: "North", base: 270, sign: 1 },
          { from: "West", to: "South", base: 270, sign: -1 },
        ];
        const d = rng.pick(tier === 1 ? all.slice(0, 4) : all);
        const th = tier === 1 ? rng.int(1, 17) * 5 : rng.int(5, 85);
        const ans = d.base + d.sign * th;
        const wrong = mod360(d.base - d.sign * th);
        const [A, B] = rng.pick(PLACES);
        const help = tier === 1 ? ` (Face ${d.from}, then turn ${th}° towards ${d.to}.)` : "";
        const baseText = d.from === "North" ? (d.sign > 0 ? "000°" : "360°") : `${brg(d.base)}`;
        return {
          prompt: `From ${A}, ${B} is in the direction ${th}° ${d.to.toLowerCase()} of ${d.from}.${help} What is the three-figure bearing of ${B} from ${A}?`,
          answer: numAns(ans, brg(ans)),
          solution: [
            `${d.from} is ${baseText === "360°" ? "000° (or 360° — a full turn)" : baseText}.`,
            `Turning from ${d.from} towards ${d.to} is ${d.sign > 0 ? "clockwise, so add" : "anticlockwise, so subtract"}: ${d.base} ${d.sign > 0 ? "+" : "−"} ${th} = ${ans}.`,
            `The bearing is ${brg(ans)}.`,
          ],
          hint: `Start at the bearing of ${d.from}. Is turning towards ${d.to} clockwise or anticlockwise?`,
          traps: numTraps(ans, [[wrong, `You turned the wrong way. From ${d.from}, turning towards ${d.to} is ${d.sign > 0 ? "clockwise" : "anticlockwise"}.`]]),
        };
      }

      if (mode === "compass16") {
        const c = rng.pick([
          { name: "north-north-east (NNE)", a: "North", b: "north-east", v: 22.5 },
          { name: "east-north-east (ENE)", a: "north-east", b: "East", v: 67.5 },
          { name: "east-south-east (ESE)", a: "East", b: "south-east", v: 112.5 },
          { name: "south-south-east (SSE)", a: "south-east", b: "South", v: 157.5 },
          { name: "south-south-west (SSW)", a: "South", b: "south-west", v: 202.5 },
          { name: "west-south-west (WSW)", a: "south-west", b: "West", v: 247.5 },
          { name: "west-north-west (WNW)", a: "West", b: "north-west", v: 292.5 },
          { name: "north-north-west (NNW)", a: "north-west", b: "North", v: 337.5 },
        ]);
        const lo = c.v - 22.5, hi = c.v + 22.5;
        const ctx = rng.pick(["A yacht sails", "A weather vane points", "A hiker walks", "A drone flies"]);
        return {
          prompt: `${ctx} ${c.name}, which is exactly halfway between ${c.a} and ${c.b}. What is its three-figure bearing?`,
          answer: numAns(c.v, brg(c.v)),
          solution: [
            `${c.a[0].toUpperCase() + c.a.slice(1)} is ${brg(lo)} and ${c.b} is ${hi === 360 ? "360° (North again)" : brg(hi)}.`,
            `Halfway: (${lo} + ${hi}) ÷ 2 = ${num(c.v)}.`,
            `The bearing is ${brg(c.v)}.`,
          ],
          hint: "Find the bearings of the two directions it lies between, then go halfway.",
        };
      }

      // turn: a new bearing after turning, with wrap-around past North
      let b = 300, t = 90, cw = true, ans = 30;
      for (let i = 0; i < 200; i++) {
        b = rng.int(1, 71) * 5;
        t = rng.int(4, 34) * 5;
        cw = rng.bool();
        ans = mod360(cw ? b + t : b - t);
        const wraps = cw ? b + t >= 360 : b - t < 0;
        if (ans !== 0 && (wraps || rng.bool(0.25))) break;
      }
      const raw = cw ? b + t : b - t;
      const vessel = rng.pick(["A ship", "A plane", "A yacht", "A drone"]);
      return {
        prompt: `${vessel} is travelling on a bearing of ${brg(b)}. It turns ${t}° ${cw ? "clockwise" : "anticlockwise"}. What is its new bearing?`,
        answer: numAns(ans, brg(ans)),
        solution: [
          `${cw ? "Clockwise adds" : "Anticlockwise subtracts"}: ${b} ${cw ? "+" : "−"} ${t} = ${raw}.`,
          raw >= 360
            ? `That is past a full turn, so subtract 360°: ${raw} − 360 = ${ans}.`
            : raw < 0
              ? `That has gone back past North, so add 360°: ${raw} + 360 = ${ans}.`
              : "That is between 000° and 360°, so no adjustment is needed.",
          `The new bearing is ${brg(ans)}.`,
        ],
        hint: "Add for clockwise, subtract for anticlockwise — then keep the answer between 000° and 360°.",
        traps: numTraps(ans, [[raw, raw >= 360 ? "Bearings stop at 360°. Subtract 360° to get the real bearing." : "A bearing cannot be negative. Add 360°."]]),
      };
    },
  },
  // -------------------------------------------------------------------------
  // LEVEL 2
  // -------------------------------------------------------------------------
  {
    id: `${T}.triangle-inequality`,
    topicId: T,
    title: "Can the triangle be made? Limits on the third side",
    level: 2,
    guideRef: "constructing-triangles",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const ask = rng.pick(["longest", "shortest", "count"] as const);
      let A10 = 70, B10 = 40;
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          A10 = rng.int(3, 12) * 10;
          B10 = rng.int(3, 12) * 10;
        } else if (tier === 2) {
          A10 = rng.int(4, 20) * 10 + (rng.bool(0.4) ? 5 : 0);
          B10 = rng.int(4, 20) * 10;
        } else {
          A10 = rng.int(25, 150);
          B10 = rng.int(25, 150);
          if (A10 % 10 === 0 && B10 % 10 === 0) continue;
        }
        if (Math.abs(A10 - B10) >= 10) break;
      }
      const a = clean(A10 / 10), b = clean(B10 / 10);
      const S10 = A10 + B10, D10 = Math.abs(A10 - B10);
      const S = clean(S10 / 10), D = clean(D10 / 10);
      const longest = S10 % 10 === 0 ? S10 / 10 - 1 : Math.floor(S10 / 10);
      const shortest = Math.floor(D10 / 10) + 1;
      const count = longest - shortest + 1;
      const big = Math.max(a, b), small = Math.min(a, b);
      const ctxKind = rng.pick(["construct", "straws", "garden"] as const);
      const unit = ctxKind === "garden" ? "m" : "cm";
      const noun = ctxKind === "garden" ? "edge" : ctxKind === "straws" ? "straw" : "side";
      const ctx =
        ctxKind === "garden"
          ? `A triangular garden bed has two edges of ${num(a)} m and ${num(b)} m. The third edge is a whole number of metres.`
          : ctxKind === "straws"
            ? `${who} has three straws to make a triangle. Two of them are ${num(a)} cm and ${num(b)} cm long. The third straw is a whole number of centimetres long.`
            : `${who} is constructing a triangle with ruler and compasses. Two of the sides are ${num(a)} cm and ${num(b)} cm. The third side is a whole number of centimetres.`;
      const rule = "Triangle rule: any two sides must add to **more** than the third side.";
      const sumStep = `The third ${noun} must be less than ${num(a)} + ${num(b)} = ${num(S)} ${unit}, so the longest whole number is ${longest} ${unit}.`;
      const diffStep = `The third ${noun} plus ${num(small)} must be more than ${num(big)}, so the third ${noun} must be more than ${num(big)} − ${num(small)} = ${num(D)} ${unit}. The shortest whole number is ${shortest} ${unit}.`;
      if (ask === "longest") {
        return {
          prompt: `${ctx} What is the **longest** the third ${noun} can be?`,
          answer: numAns(longest, `${longest} ${unit}`),
          solution: [rule, sumStep],
          hint: `What happens if the third ${noun} is as long as the other two put together?`,
          traps: numTraps(longest, [
            S10 % 10 === 0
              ? [S, `At exactly ${num(S)} ${unit} the other two sides would lie flat along it — no triangle. It must be shorter.`]
              : [Math.ceil(S), `${Math.ceil(S)} ${unit} is longer than ${num(a)} + ${num(b)} = ${num(S)} ${unit}, so the other two sides could not reach.`],
          ]),
        };
      }
      if (ask === "shortest") {
        return {
          prompt: `${ctx} What is the **shortest** the third ${noun} can be?`,
          answer: numAns(shortest, `${shortest} ${unit}`),
          solution: [rule, diffStep],
          hint: `Could the third ${noun} and the shorter one together still reach across the longer one?`,
          traps: numTraps(shortest, [
            D10 % 10 === 0
              ? [D, `At exactly ${num(D)} ${unit}, the two shorter sides only just equal the longest one — they lie flat. It must be longer.`]
              : [Math.floor(D), `${Math.floor(D)} ${unit} is less than ${num(big)} − ${num(small)} = ${num(D)} ${unit}, so the triangle cannot close.`],
          ]),
        };
      }
      return {
        prompt: `${ctx} How many different lengths are possible for the third ${noun}?`,
        answer: numAns(count),
        solution: [rule, sumStep, diffStep, `So the third ${noun} can be any whole number from ${shortest} to ${longest}: that is ${longest} − ${shortest} + 1 = ${count} lengths.`],
        hint: "Find the shortest and the longest possible lengths first, then count.",
        traps: S10 % 10 === 0 && D10 % 10 === 0 ? numTraps(count, [[count + 2, `You included ${num(D)} ${unit} and ${num(S)} ${unit}. At those lengths the triangle is flat, so they don't count.`]]) : undefined,
      };
    },
  },
  {
    id: `${T}.perpendicular-bisector`,
    topicId: T,
    title: "Use the perpendicular bisector: equal distances and midpoints",
    level: 2,
    guideRef: "perpendicular-bisector",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const modes = tier === 1 ? ["half", "perimeter", "midpoint"] : tier === 2 ? ["perimeter", "algebra", "midpoint", "half"] : ["algebra-length", "midpoint-reverse", "perimeter", "algebra"];
      const mode = rng.pick(modes);

      if (mode === "half") {
        const L10 = tier === 1 ? rng.int(4, 15) * 10 : rng.int(41, 149);
        const askPB = tier > 1 && rng.bool();
        if (askPB) {
          let Y10 = 60;
          for (let i = 0; i < 100; i++) {
            Y10 = rng.int(30, 140);
            if (2 * Y10 > L10 + 10 && Y10 !== L10) break;
          }
          const y = clean(Y10 / 10);
          return {
            prompt: `${who} constructs the perpendicular bisector of a line AB that is ${num(L10 / 10)} cm long. P is a point on the bisector with PA = ${num(y)} cm. How long is PB?`,
            answer: numAns(y, `${num(y)} cm`),
            solution: [
              "Every point on the perpendicular bisector of AB is the same distance from A as from B.",
              `So PB = PA = ${num(y)} cm. The length of AB does not matter.`,
            ],
            hint: "What is special about every point on a perpendicular bisector?",
            traps: numTraps(y, [[L10 / 20, "That is half of AB (the distance AM). P is not on AB — it is on the bisector, so PB = PA."]]),
          };
        }
        const h = clean(L10 / 20);
        return {
          prompt: `${who} constructs the perpendicular bisector of a line AB that is ${num(L10 / 10)} cm long. The bisector crosses AB at M. How long is AM?`,
          answer: numAns(h, `${num(h)} cm`),
          solution: [
            "The perpendicular bisector cuts AB exactly in half, at right angles.",
            `So M is the midpoint: AM = ${num(L10 / 10)} ÷ 2 = ${num(h)} cm.`,
          ],
          hint: "Bisect means cut into two equal parts.",
          traps: numTraps(h, [[L10 / 10, "M is the midpoint, so AM is half of AB."]]),
        };
      }

      if (mode === "perimeter") {
        let X10 = 60, Y10 = 80;
        for (let i = 0; i < 100; i++) {
          X10 = tier === 1 ? rng.int(4, 12) * 10 : rng.int(30, 120);
          Y10 = tier === 1 ? rng.int(4, 14) * 10 : rng.int(30, 140);
          if (2 * Y10 >= X10 + 10 && Y10 !== X10) break;
        }
        const x = clean(X10 / 10), y = clean(Y10 / 10);
        const per = clean((2 * Y10 + X10) / 10);
        const garden = rng.bool(0.4);
        const prompt = garden
          ? `Two trees A and B are ${num(x)} m apart. A sprinkler P stands on the perpendicular bisector of AB, ${num(y)} m from A. ${who} runs a string from A to P, then to B, then back to A. How long is the string, in metres?`
          : `P lies on the perpendicular bisector of the line AB. AB = ${num(x)} cm and PA = ${num(y)} cm. Find the perimeter of triangle PAB.`;
        const u = garden ? "m" : "cm";
        return {
          prompt,
          answer: numAns(per, `${num(per)} ${u}`),
          solution: [
            "Every point on the perpendicular bisector of AB is the same distance from A and from B.",
            `So PB = PA = ${num(y)} ${u}.`,
            `Total = ${num(y)} + ${num(y)} + ${num(x)} = ${num(per)} ${u}.`,
          ],
          hint: "You are not told PB — but P is on the perpendicular bisector.",
          traps: numTraps(per, [[(Y10 + X10) / 10, "PB is missing. P is on the perpendicular bisector, so PB = PA."]]),
        };
      }

      if (mode === "algebra" || mode === "algebra-length") {
        let x = 4, p = 5, q = 3, c = -2, d = 6;
        for (let i = 0; i < 300; i++) {
          x = rng.int(2, 9);
          p = rng.int(2, 8);
          q = rng.int(2, 8);
          if (Math.abs(p - q) < 2) continue;
          c = rng.int(-12, 15);
          if (c === 0) continue;
          d = p * x + c - q * x;
          if (d === 0 || Math.abs(d) > 30 || d === c) continue;
          if (p * x + c < 5) continue;
          break;
        }
        const len = p * x + c;
        const eL = poly([[p, "x"], [c, ""]]);
        const eR = poly([[q, "x"], [d, ""]]);
        const k = Math.abs(p - q);
        const rhs = k * x;
        const askLen = mode === "algebra-length";
        return {
          prompt: `P lies on the perpendicular bisector of AB. PA = ({{${eL}}}) cm and PB = ({{${eR}}}) cm. ${askLen ? "Find the length of PA, in cm." : "Find the value of x."}`,
          answer: askLen ? numAns(len, `${len} cm`) : numAns(x),
          solution: [
            "Points on the perpendicular bisector are the same distance from A and B, so PA = PB.",
            `{{${eL} = ${eR}}}`,
            `Collect the x terms on the side with more x, and the numbers on the other side: {{${term(k, "x")} = ${rhs}}}, so x = ${rhs} ÷ ${k} = ${x}.`,
            ...(askLen ? [`PA = ${p} × ${x} ${c < 0 ? "−" : "+"} ${Math.abs(c)} = ${len} cm. (Check: PB = ${q} × ${x} ${d < 0 ? "−" : "+"} ${Math.abs(d)} = ${len} cm too.)`] : []),
          ],
          hint: "What do you know about PA and PB? Write an equation.",
          traps: askLen
            ? numTraps(len, [[x, `x = ${x} is a step on the way — substitute it into PA to find the length.`]])
            : numTraps(x, [[len, "That is the length PA. The question asks for x."]]),
        };
      }

      if (mode === "midpoint") {
        let x1 = 2, y1 = 3, x2 = 8, y2 = 11;
        for (let i = 0; i < 200; i++) {
          const lo = tier === 1 ? 0 : -10;
          x1 = rng.int(lo, 12);
          y1 = rng.int(lo, 12);
          x2 = rng.int(lo, 12);
          y2 = rng.int(lo, 12);
          if (Math.abs(x1 - x2) < 2 || Math.abs(y1 - y2) < 2) continue;
          if ((x1 + x2) % 2 !== 0 || (y1 + y2) % 2 !== 0) continue;
          if (tier === 2 && Math.min(x1, x2, y1, y2) >= 0) continue;
          break;
        }
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        return {
          prompt: `A is ${pt(x1, y1)} and B is ${pt(x2, y2)}. The perpendicular bisector of AB crosses AB at its midpoint M. Find the coordinates of M. Give your answer as (x, y).`,
          answer: { type: "list", values: [mx, my], ordered: true, display: pt(mx, my) },
          solution: [
            "M is halfway between A and B, so find the mean of the x-coordinates and the mean of the y-coordinates.",
            `x: (${num(x1)} + ${br(x2)}) ÷ 2 = ${num(x1 + x2)} ÷ 2 = ${num(mx)}`,
            `y: (${num(y1)} + ${br(y2)}) ÷ 2 = ${num(y1 + y2)} ÷ 2 = ${num(my)}`,
            `M = ${pt(mx, my)}.`,
          ],
          hint: "Halfway between two numbers is their mean.",
          traps: pairTraps([mx, my], [
            [[x1 + x2, y1 + y2], "You added the coordinates but forgot to halve them."],
            [[(x2 - x1) / 2, (y2 - y1) / 2], "Halfway is the mean: add the coordinates, then halve. Don't subtract."],
          ]),
        };
      }

      // midpoint-reverse: given A and M, find B
      let ax = 1, ay = 2, mx = 4, my = 5;
      for (let i = 0; i < 200; i++) {
        ax = rng.int(-8, 10);
        ay = rng.int(-8, 10);
        mx = rng.int(-6, 8);
        my = rng.int(-6, 8);
        if (Math.abs(ax - mx) >= 2 && Math.abs(ay - my) >= 2) break;
      }
      const bx = 2 * mx - ax, by = 2 * my - ay;
      return {
        prompt: `The perpendicular bisector of AB crosses AB at M${pt(mx, my)}. A is ${pt(ax, ay)}. Find the coordinates of B. Give your answer as (x, y).`,
        answer: { type: "list", values: [bx, by], ordered: true, display: pt(bx, by) },
        solution: [
          "The perpendicular bisector crosses AB at its midpoint, so M is halfway from A to B.",
          `From A to M: x changes by ${num(mx)} − ${br(ax)} = ${num(mx - ax)} and y changes by ${num(my)} − ${br(ay)} = ${num(my - ay)}.`,
          `Do the same again from M: B = (${num(mx)} + ${br(mx - ax)}, ${num(my)} + ${br(my - ay)}) = ${pt(bx, by)}.`,
        ],
        hint: "M is halfway. How do you get from A to M? Do that step again.",
        traps: pairTraps([bx, by], [[[(ax + mx) / 2, (ay + my) / 2], "That is the midpoint of AM. M is the midpoint, so B is as far beyond M as A is before it."]]),
      };
    },
  },
  {
    id: `${T}.shortest-distance`,
    topicId: T,
    title: "Shortest distance from a point to a line",
    level: 2,
    guideRef: "angle-bisector",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const modes = tier === 1 ? ["fence", "dist", "dist"] : tier === 2 ? ["dist", "foot", "dist"] : ["area", "foot", "dist"];
      const mode = rng.pick(modes);

      if (mode === "fence") {
        let vals = [50, 61, 66, 73];
        for (let i = 0; i < 100; i++) {
          vals = [rng.int(30, 99), rng.int(30, 99), rng.int(30, 99), rng.int(30, 99)];
          const so = [...vals].sort((a, b) => a - b);
          if (new Set(vals).size === 4 && so[1] - so[0] >= 2) break;
        }
        const ms = vals.map((v) => clean(v / 10));
        const min = Math.min(...ms), max = Math.max(...ms);
        return {
          prompt: `${who} measures four straight paths from a tree to a long straight fence. They are ${ms.slice(0, 3).map(num).join(" m, ")} m and ${num(ms[3])} m long. Exactly one of these paths meets the fence at a right angle. How long is that path, in metres?`,
          answer: numAns(min, `${num(min)} m`),
          solution: [
            "The perpendicular from a point to a line is the **shortest** route from the point to the line.",
            "Any slanted path is the longest side of a right-angled triangle, so it is longer than the perpendicular.",
            `So the path at a right angle is the shortest one: ${num(min)} m.`,
          ],
          hint: "Which route from a point to a line is the shortest?",
          traps: numTraps(min, [[max, "The perpendicular path is the shortest one, not the longest."]]),
        };
      }

      // Work in a frame: along-line coordinate s, across coordinate t; the line is t = k.
      const vertical = rng.bool();
      const axis = vertical ? "x" : "y";
      const P = (s: number, t: number) => (vertical ? pt(t, s) : pt(s, t));
      let s0 = 3, t0 = 7, k = 2;
      for (let i = 0; i < 200; i++) {
        const lo = tier === 1 ? 0 : -9;
        s0 = rng.int(lo, 10);
        t0 = rng.int(lo, 10);
        k = rng.int(lo, 10);
        if (tier === 3 && mode === "dist" && rng.bool(0.5)) t0 = clean(t0 + 0.5);
        if (Math.abs(t0 - k) < 2 || s0 === k || s0 === t0) continue;
        if (tier === 2 && k >= 0 && t0 >= 0) continue;
        break;
      }
      const h = clean(Math.abs(t0 - k));
      const hi = Math.max(t0, k), lo2 = Math.min(t0, k);
      const distSteps = [
        `The line ${axis} = ${num(k)} is ${vertical ? "vertical" : "horizontal"}. The shortest route from P meets it at 90°, so it goes straight ${vertical ? "across" : "up or down"}.`,
        `Only the ${axis}-coordinate changes: from ${num(t0)} to ${num(k)}.`,
        `Distance = ${num(hi)} − ${br(lo2)} = ${num(h)} units.`,
      ];

      if (mode === "dist") {
        const wrong = clean(Math.abs(s0 - k));
        return {
          prompt: `Find the shortest distance from the point P${P(s0, t0)} to the line ${axis} = ${num(k)}.`,
          answer: numAns(h, `${num(h)} units`),
          solution: distSteps,
          hint: `Shortest means perpendicular. Which coordinate changes when you move straight to the line ${axis} = ${num(k)}?`,
          traps: numTraps(h, [[wrong, `That uses the ${vertical ? "y" : "x"}-coordinate. For the line ${axis} = ${num(k)}, only the ${axis}-coordinate matters.`]]),
        };
      }

      if (mode === "foot") {
        const ans: [number, number] = vertical ? [k, s0] : [s0, k];
        const swapped: [number, number] = [ans[1], ans[0]];
        return {
          prompt: `The perpendicular from P${P(s0, t0)} to the line ${axis} = ${num(k)} meets the line at F. Find the coordinates of F. Give your answer as (x, y).`,
          answer: { type: "list", values: ans, ordered: true, display: pt(ans[0], ans[1]) },
          solution: [
            `The line ${axis} = ${num(k)} is ${vertical ? "vertical" : "horizontal"}, so the perpendicular from P is ${vertical ? "horizontal" : "vertical"}.`,
            `Moving ${vertical ? "across" : "straight up or down"} keeps the ${vertical ? "y" : "x"}-coordinate ${num(s0)} and changes the ${axis}-coordinate to ${num(k)}.`,
            `F = ${pt(ans[0], ans[1])}.`,
          ],
          hint: `F is on the line, so its ${axis}-coordinate is ${num(k)}. Which coordinate stays the same as P's?`,
          traps: pairTraps(ans, [[swapped, `Coordinates go (x, y). F lies on the line ${axis} = ${num(k)}, so its ${axis}-coordinate is ${num(k)}.`]]),
        };
      }

      // area: base on the line, height = perpendicular distance
      let a = 1, b = 7;
      for (let i = 0; i < 100; i++) {
        a = rng.int(-6, 8);
        b = rng.int(-6, 10);
        if (Math.abs(a - b) >= 3) break;
      }
      const base = Math.abs(a - b);
      const area = clean((base * h) / 2);
      return {
        prompt: `A${P(a, k)} and B${P(b, k)} lie on the line ${axis} = ${num(k)}. P is the point ${P(s0, t0)}. Find the area of triangle PAB, in square units.`,
        answer: numAns(area),
        solution: [
          `AB lies along the line ${axis} = ${num(k)}, so AB = ${num(Math.max(a, b))} − ${br(Math.min(a, b))} = ${base} units.`,
          `The height of the triangle is the perpendicular distance from P to that line: ${num(hi)} − ${br(lo2)} = ${num(h)} units.`,
          `Area = {{1/2}} × ${base} × ${num(h)} = ${num(area)} square units.`,
        ],
        hint: "Use AB as the base. The height is the shortest distance from P to the line AB.",
        traps: numTraps(area, [[base * h, "Area of a triangle is half of base × height."]]),
      };
    },
  },
  {
    id: `${T}.map-scales`,
    topicId: T,
    title: "Use map scales: map ↔ real distances",
    level: 2,
    guideRef: "scale-drawings",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const modes = tier === 1 ? ["words", "map-to-real", "plan"] : tier === 2 ? ["map-to-real", "real-to-map", "plan", "words"] : ["find-scale", "real-to-map", "map-to-real", "find-scale"];
      const mode = rng.pick(modes);
      const things = [
        ["two MRT stations", "apart"],
        ["a cycling route", "long"],
        ["a hiking trail", "long"],
        ["two towns", "apart"],
        ["two hawker centres", "apart"],
        ["a ferry route", "long"],
      ];
      const [thing, word] = rng.pick(things);

      if (mode === "words") {
        const ks = tier === 1 ? [2, 3, 4, 5, 10, 20, 25] : [0.5, 1.5, 2, 2.5, 4, 5, 20, 25];
        const k = rng.pick(ks);
        const d10 = tier === 1 ? rng.int(2, 15) * 10 : rng.int(12, 150);
        const ans = clean((d10 * k) / 10);
        return {
          prompt: `On a map, 1 cm represents ${num(k)} km. On the map, ${thing} ${word === "apart" ? "are" : "is"} ${num(d10 / 10)} cm ${word}. How far is that in real life, in km?`,
          answer: numAns(ans, `${num(ans)} km`),
          solution: [
            `Each 1 cm on the map stands for ${num(k)} km.`,
            `Map → real: multiply. ${num(d10 / 10)} × ${num(k)} = ${num(ans)} km.`,
          ],
          hint: "Map to real life: multiply by what 1 cm represents.",
          traps: numTraps(ans, [[clean(d10 / 10 / k), "You divided. Going from the map to real life, the distance gets bigger — multiply."]]),
        };
      }

      if (mode === "plan") {
        const n = rng.pick([50, 100, 200]);
        const room = rng.pick(["bedroom", "living room", "kitchen", "study", "balcony"]);
        let d10 = 60;
        for (let i = 0; i < 100; i++) {
          d10 = tier === 1 ? rng.int(2, 12) * 10 : rng.int(15, 140);
          const m = (d10 * n) / 1000;
          if (m >= 1.5 && m <= 12) break;
        }
        const m = clean((d10 * n) / 1000);
        const toPlan = tier > 1 && rng.bool(0.4);
        if (toPlan) {
          return {
            prompt: `An architect draws a plan of an HDB flat with a scale of 1 : ${n}. The ${room} is ${num(m)} m long in real life. How long is it on the plan, in cm?`,
            answer: numAns(d10 / 10, `${num(d10 / 10)} cm`),
            solution: [
              `Convert to cm first: ${num(m)} m = ${num(m * 100)} cm.`,
              `Real → plan: divide by ${n}. ${num(m * 100)} ÷ ${n} = ${num(d10 / 10)} cm.`,
            ],
            hint: "Change the real length to cm, then divide by the scale number.",
            traps: numTraps(d10 / 10, [[clean(m / n), "Convert metres to centimetres before dividing: 1 m = 100 cm."]]),
          };
        }
        return {
          prompt: `A plan of an HDB flat has a scale of 1 : ${n}. The ${room} is ${num(d10 / 10)} cm long on the plan. How long is the real ${room}, in metres?`,
          answer: numAns(m, `${num(m)} m`),
          solution: [
            `1 : ${n} means 1 cm on the plan is ${n} cm in real life.`,
            `${num(d10 / 10)} × ${n} = ${num((d10 * n) / 10)} cm.`,
            `${num((d10 * n) / 10)} cm ÷ 100 = ${num(m)} m.`,
          ],
          hint: "Multiply by the scale number, then change cm to m.",
          traps: numTraps(m, [[clean((d10 * n) / 10), "That answer is in centimetres. Divide by 100 to get metres."]]),
        };
      }

      const scales = [10000, 20000, 25000, 50000, 100000, 200000, 250000];
      if (mode === "map-to-real") {
        let n = 50000, d10 = 60;
        for (let i = 0; i < 200; i++) {
          n = rng.pick(scales);
          d10 = tier === 1 ? rng.int(2, 15) * 10 : rng.int(12, 150);
          const cm = (d10 * n) / 10;
          if (cm >= 50000) break;
        }
        const cm = (d10 * n) / 10;
        const km = clean(cm / 100000);
        const useKm = cm >= 100000 && cm % 1000 === 0;
        const ans = useKm ? km : clean(cm / 100);
        const unit = useKm ? "km" : "m";
        return {
          prompt: `A map has a scale of 1 : ${spaced(n)}. On the map, ${thing} ${word === "apart" ? "are" : "is"} ${num(d10 / 10)} cm ${word}. How far is that in real life? Give your answer in ${useKm ? "km" : "metres"}.`,
          answer: numAns(ans, `${num(ans)} ${unit}`),
          solution: [
            `1 : ${spaced(n)} means 1 cm on the map is ${spaced(n)} cm in real life.`,
            `${num(d10 / 10)} × ${spaced(n)} = ${spaced(cm)} cm.`,
            useKm ? `1 km = 100 000 cm, so ${spaced(cm)} ÷ 100 000 = ${num(ans)} km.` : `1 m = 100 cm, so ${spaced(cm)} ÷ 100 = ${spaced(ans)} m.`,
          ],
          hint: "Multiply by the scale number to get centimetres, then convert.",
          traps: numTraps(ans, [
            [cm, `That is in centimetres. Divide by ${useKm ? "100 000 to get km" : "100 to get m"}.`],
            ...(useKm ? ([[clean(cm / 1000), "1 km = 100 000 cm (1000 m, and 100 cm in each metre)."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      if (mode === "real-to-map") {
        let n = 50000, d10 = 60;
        for (let i = 0; i < 200; i++) {
          n = rng.pick(scales);
          d10 = tier === 2 ? rng.int(2, 20) * 5 : rng.int(12, 150);
          const cm = (d10 * n) / 10;
          if (cm >= 100000 && cm % 1000 === 0) break;
        }
        const cm = (d10 * n) / 10;
        const km = clean(cm / 100000);
        const ans = clean(d10 / 10);
        return {
          prompt: `A map has a scale of 1 : ${spaced(n)}. ${thing[0].toUpperCase() + thing.slice(1)} ${word === "apart" ? "are" : "is"} ${num(km)} km ${word} in real life. How ${word === "apart" ? "far apart" : "long"} will ${word === "apart" ? "they" : "it"} be on the map, in cm?`,
          answer: numAns(ans, `${num(ans)} cm`),
          solution: [
            `Convert to cm first: ${num(km)} km = ${num(km)} × 100 000 = ${spaced(cm)} cm.`,
            `Real → map: divide by ${spaced(n)}. ${spaced(cm)} ÷ ${spaced(n)} = ${num(ans)} cm.`,
          ],
          hint: "Change km to cm (× 100 000), then divide by the scale number.",
          traps: numTraps(ans, [[clean(ans / 100), "1 km = 100 000 cm, not 1000 cm."]]),
        };
      }

      // find-scale
      const useWords = rng.bool(0.4);
      const n = rng.pick(scales);
      const d = rng.int(2, 12);
      if (useWords) {
        const inKm = n >= 100000;
        const k = inKm ? n / 100000 : n / 100;
        const u = inKm ? "km" : "m";
        return {
          prompt: `The scale of a map is "1 cm represents ${num(k)} ${u}". Write this scale as a ratio in the form 1 : n.`,
          answer: { type: "ratio", parts: [1, n], simplest: true, display: `1 : ${spaced(n)}` },
          solution: [
            "A ratio scale has no units, so both parts must be in the same unit.",
            inKm ? `${num(k)} km = ${num(k)} × 100 000 cm = ${spaced(n)} cm.` : `${num(k)} m = ${num(k)} × 100 cm = ${spaced(n)} cm.`,
            `So 1 cm : ${spaced(n)} cm, which is 1 : ${spaced(n)}.`,
          ],
          hint: `Change the ${u} into cm so both parts use the same unit.`,
          traps: [
            inKm
              ? { spec: { type: "ratio", parts: [1, n / 100] }, feedback: "That converts km to metres only. Both parts must be in cm: 1 km = 100 000 cm." }
              : { spec: { type: "ratio", parts: [1, n / 100] }, feedback: "Both parts must be in the same unit. Change the metres to cm: 1 m = 100 cm." },
          ],
        };
      }
      const cm = d * n;
      const km = clean(cm / 100000);
      return {
        prompt: `On a map, ${who} measures ${d} cm between two towns. The real distance is ${num(km)} km. Write the scale of the map as a ratio in the form 1 : n.`,
        answer: { type: "ratio", parts: [1, n], simplest: true, display: `1 : ${spaced(n)}` },
        solution: [
          `Use the same unit for both: ${num(km)} km = ${num(km)} × 100 000 = ${spaced(cm)} cm.`,
          `The ratio is ${d} : ${spaced(cm)}.`,
          `Divide both parts by ${d}: 1 : ${spaced(n)}.`,
        ],
        hint: "Write map : real in the same unit (cm), then divide so the first part is 1.",
        traps: [{ spec: { type: "ratio", parts: [1, n / 100] }, feedback: "Both parts must be in cm: 1 km = 100 000 cm, not 1000 cm." }],
      };
    },
  },
  {
    id: `${T}.back-bearing`,
    topicId: T,
    title: "Find a back bearing",
    level: 2,
    guideRef: "back-bearings",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const [A, B] = rng.pick(PLACES);
      const modes = tier === 1 ? ["basic", "return"] : tier === 2 ? ["basic", "return", "reverse"] : ["co-interior", "reverse", "return"];
      const mode = rng.pick(modes);
      let b = 70;
      for (let i = 0; i < 100; i++) {
        b = tier === 1 ? rng.int(1, 35) * 10 : rng.int(1, 359);
        if (mode === "co-interior" && (b >= 175 || b <= 5 || b === 90)) continue;
        if (b % 180 !== 0) break;
      }
      const back = backOf(b);
      const ruleStep = `${brg(b)} is ${b < 180 ? "less than 180°, so add" : "more than 180°, so subtract"} 180°: ${b} ${b < 180 ? "+" : "−"} 180 = ${back}.`;
      const traps = numTraps(back, [
        [360 - b, "360° − bearing turns the other way from North; it does not reverse the direction. A return journey is a half-turn: ±180°."],
        [b + 180, "That is more than 360°. When the bearing is over 180°, subtract 180° instead."],
      ]);

      if (mode === "co-interior") {
        const ang = 180 - b;
        return {
          prompt: `The bearing of ${B} from ${A} is ${brg(b)}. The North lines at ${A} and at ${B} are parallel. Find the angle between the North direction at ${B} and the line from ${B} to ${A}.`,
          answer: numAns(ang, deg(ang)),
          solution: [
            `Draw a North line at each place. The straight line between ${A} and ${B} crosses both parallel North lines.`,
            `The ${b}° at ${A} and the angle at ${B} are co-interior angles (a C-shape), so they add to 180°.`,
            `Angle = 180° − ${b}° = ${ang}°. (So the bearing of ${A} from ${B} is 360° − ${ang}° = ${brg(back)}.)`,
          ],
          hint: "Draw both North lines. Which pair of angles between parallel lines adds to 180°?",
          traps: numTraps(ang, [
            [b, "Those angles are co-interior (a C-shape), not alternate — they add to 180°, they are not equal."],
            [back, "That is the bearing of the return journey. The question asks for the angle between North and the line."],
          ]),
        };
      }

      if (mode === "return") {
        const how = rng.pick(["walks", "cycles", "kayaks", "sails"]);
        return {
          prompt: `${who} ${how} in a straight line from ${A} to ${B} on a bearing of ${brg(b)}. On what bearing must ${who} travel to go straight back to ${A}?`,
          answer: numAns(back, brg(back)),
          solution: ["Going straight back is a half-turn, so the two bearings differ by exactly 180°.", ruleStep, `The return bearing is ${brg(back)}.`],
          hint: "Turning round to go back is a half-turn. How many degrees is that?",
          traps,
        };
      }

      if (mode === "reverse") {
        return {
          prompt: `The bearing of ${A} from ${B} is ${brg(b)}. What is the bearing of ${B} from ${A}?`,
          answer: numAns(back, brg(back)),
          solution: [
            `"The bearing of ${A} from ${B}" is measured at ${B}. You need the bearing measured at ${A} — the opposite direction.`,
            ruleStep,
            `The bearing of ${B} from ${A} is ${brg(back)}.`,
          ],
          hint: "The two bearings point in exactly opposite directions.",
          traps,
        };
      }

      return {
        prompt: `The bearing of ${B} from ${A} is ${brg(b)}. Find the bearing of ${A} from ${B}.`,
        answer: numAns(back, brg(back)),
        solution: [`The bearing of ${A} from ${B} points the exact opposite way, so it differs by 180°.`, ruleStep, `The bearing of ${A} from ${B} is ${brg(back)}.`],
        hint: "Add 180° if the bearing is less than 180°; otherwise subtract 180°.",
        traps,
      };
    },
  },
  // -------------------------------------------------------------------------
  // LEVEL 3
  // -------------------------------------------------------------------------
  {
    id: `${T}.angle-at-turn`,
    topicId: T,
    title: "Angles at a turning point on a journey",
    level: 3,
    guideRef: "back-bearings",
    generate(rng, tier) {
      const [P, Q, R] = rng.pick([["P", "Q", "R"], ["A", "B", "C"], ["J", "K", "L"], ["S", "T", "U"], ["X", "Y", "Z"]]);
      const tr = rng.pick(["boat", "hiker", "drone", "yacht", "cyclist"]);
      const findBearing = tier === 3 && rng.bool(0.5);
      const step = tier === 1 ? 10 : tier === 2 ? 5 : 1;

      if (findBearing) {
        let p = 40, th = 90, right = true, q = 130;
        for (let i = 0; i < 200; i++) {
          p = rng.int(1, 359);
          th = rng.int(25, 155);
          right = rng.bool();
          q = mod360(right ? p + 180 - th : p - 180 + th);
          if (p % 90 !== 0 && q !== 0 && th !== 90) break;
        }
        const back = backOf(p);
        const raw = right ? p + 180 - th : p - 180 + th;
        const naive = mod360(right ? p + th : p - th);
        return {
          prompt: `A ${tr} travels from ${P} to ${Q} on a bearing of ${brg(p)}. At ${Q} the ${tr} turns ${right ? "clockwise (to the right)" : "anticlockwise (to the left)"} and travels to ${R}, so that angle ${P}${Q}${R} = ${th}°. Find the bearing of ${R} from ${Q}.`,
          answer: numAns(q, brg(q)),
          solution: [
            `At ${Q}, draw a North line. Carrying straight on (bearing ${brg(p)}) would make an angle of 180° with the line back to ${P} (bearing ${brg(back)}).`,
            `Angle ${P}${Q}${R} is only ${th}°, so the ${tr} turns through 180° − ${th}° = ${180 - th}°.`,
            `Turning ${right ? "clockwise adds" : "anticlockwise subtracts"}: ${p} ${right ? "+" : "−"} ${180 - th} = ${raw}${raw >= 360 ? `, and ${raw} − 360 = ${q}` : raw < 0 ? `, and ${raw} + 360 = ${q}` : ""}. The bearing of ${R} from ${Q} is ${brg(q)}.`,
          ],
          hint: `Draw a North line at ${Q}. The angle at ${Q} is measured from the line back to ${P}, not from the old direction of travel.`,
          traps: numTraps(q, [[naive, `${th}° is the angle inside the path at ${Q}, not the angle turned. The turn is 180° − ${th}°.`]]),
        };
      }

      let p = 60, q = 150, ang = 90, back = 240, d = 90;
      for (let i = 0; i < 300; i++) {
        p = rng.int(1, Math.floor(359 / step)) * step;
        q = rng.int(1, Math.floor(359 / step)) * step;
        back = backOf(p);
        d = Math.abs(back - q);
        ang = d > 180 ? 360 - d : d;
        if (p % 180 !== 0 && q !== p && ang >= 20 && ang <= 160) break;
      }
      return {
        prompt: `A ${tr} travels from ${P} to ${Q} on a bearing of ${brg(p)}. At ${Q} the ${tr} changes direction and travels to ${R} on a bearing of ${brg(q)}. Find angle ${P}${Q}${R}.`,
        answer: numAns(ang, deg(ang)),
        solution: [
          `Draw a new North line at ${Q}, parallel to the one at ${P}.`,
          `The bearing of ${P} from ${Q} is the back bearing of ${brg(p)}: ${p} ${p < 180 ? "+" : "−"} 180 = ${back}°.`,
          d <= 180
            ? `Angle ${P}${Q}${R} is the angle between the directions ${brg(back)} and ${brg(q)}: ${Math.max(back, q)} − ${Math.min(back, q)} = ${ang}°.`
            : `The directions ${brg(back)} and ${brg(q)} differ by ${Math.max(back, q)} − ${Math.min(back, q)} = ${d}°, which is the reflex angle. So angle ${P}${Q}${R} = 360° − ${d}° = ${ang}°.`,
        ],
        hint: `At ${Q}, what is the bearing pointing back to ${P}?`,
        traps: numTraps(ang, [
          [180 - ang, `That is the angle between the two directions of travel (the turn at ${Q}). Angle ${P}${Q}${R} is between the line back to ${P} and the line to ${R} — use the back bearing.`],
        ]),
      };
    },
  },
  {
    id: `${T}.scale-and-bearings`,
    topicId: T,
    title: "Journeys with scales and bearings",
    level: 3,
    guideRef: "scale-drawings",
    generate(rng, tier) {
      const who = rng.pick(NAMES);
      const mode = rng.pick(tier === 1 ? ["draw-leg", "out-back"] : ["draw-leg", "read-map", "out-back"]);
      const [A, B] = rng.pick([["H", "L"], ["P", "Q"], ["A", "B"], ["J", "K"], ["S", "T"]]);
      // A scale: either "1 cm to k km" or "1 : n" (n = k × 100 000).
      const ks = tier === 1 ? [2, 4, 5] : [0.5, 2, 2.5, 4, 5];
      const k = rng.pick(ks);
      const n = clean(k * 100000);
      const useRatio = tier > 1 && rng.bool(0.5);
      const scaleText = useRatio ? `1 : ${spaced(n)}` : `1 cm to ${num(k)} km`;
      const perCm = useRatio ? `1 : ${spaced(n)} means 1 cm stands for ${spaced(n)} cm = ${num(k)} km.` : `Each 1 cm stands for ${num(k)} km.`;
      let b = 60;
      for (let i = 0; i < 100; i++) {
        b = tier === 1 ? rng.int(1, 35) * 10 : rng.int(1, 71) * 5;
        if (b % 90 !== 0) break;
      }
      const back = backOf(b);

      if (mode === "out-back") {
        let L1 = 80, L2 = 30;
        for (let i = 0; i < 100; i++) {
          L1 = tier === 1 ? rng.int(4, 12) * 10 : rng.int(40, 150);
          L2 = tier === 1 ? rng.int(1, 8) * 10 : rng.int(10, 120);
          if (L1 - L2 >= 10) break;
        }
        const reverse = rng.bool(0.7);
        const r1 = clean((L1 * k) / 10), r2 = clean((L2 * k) / 10);
        const b2 = reverse ? back : b;
        const ansMap = clean((reverse ? L1 - L2 : L1 + L2) / 10);
        const realGap = clean(reverse ? r1 - r2 : r1 + r2);
        const how = rng.pick(["cycles", "sails", "rides a scooter"]);
        return {
          prompt: `${who} ${how} ${num(r1)} km from ${A} on a bearing of ${brg(b)}, then ${num(r2)} km on a bearing of ${brg(b2)}. ${who} draws the journey on a map with a scale of ${scaleText}. On the map, how far is the end point from ${A}, in cm?`,
          answer: numAns(ansMap, `${num(ansMap)} cm`),
          solution: [
            reverse
              ? `${brg(b2)} is the back bearing of ${brg(b)} (they differ by 180°), so the second part goes straight back towards ${A}.`
              : "Both parts are on the same bearing, so they continue along one straight line.",
            `Real distance from ${A}: ${num(r1)} ${reverse ? "−" : "+"} ${num(r2)} = ${num(realGap)} km.`,
            `${perCm} So the map distance is ${num(realGap)} ÷ ${num(k)} = ${num(ansMap)} cm.`,
          ],
          hint: `Compare the two bearings. Is the second part going the same way, or back the way ${who} came?`,
          traps: numTraps(ansMap, reverse
            ? [[clean((L1 + L2) / 10), `${brg(b2)} is the back bearing of ${brg(b)}, so the second part heads back towards ${A}. Subtract, don't add.`], [realGap, "That is the real distance in km. Use the scale to change it to cm on the map."]]
            : [[clean((L1 - L2) / 10), "Both parts are on the same bearing, so the distances add."], [realGap, "That is the real distance in km. Use the scale to change it to cm on the map."]]),
        };
      }

      let L10 = 60;
      for (let i = 0; i < 100; i++) {
        L10 = tier === 1 ? rng.int(3, 14) * 10 : rng.int(25, 150);
        if ((L10 * k) % 1 === 0 || tier > 1) break;
      }
      const L = clean(L10 / 10);
      const real = clean((L10 * k) / 10);

      if (mode === "draw-leg") {
        const ves = rng.pick(["A ferry sails", "A yacht sails", "A light aircraft flies", "A cargo ship sails"]);
        return {
          prompt: `${ves} ${num(real)} km in a straight line from ${A} to ${B} on a bearing of ${brg(b)}. ${who} makes a scale drawing with a scale of ${scaleText}. (a) How long is the line ${A}${B} on the drawing, in cm? (b) What is the bearing of ${A} from ${B}? Give both answers separated by a comma: the length first, then the bearing.`,
          answer: { type: "list", values: [L, back], ordered: true, display: `${num(L)} cm, ${brg(back)}` },
          solution: [
            `(a) ${perCm} So the line is ${num(real)} ÷ ${num(k)} = ${num(L)} cm long.`,
            `(b) The bearing of ${A} from ${B} is the back bearing: ${b} ${b < 180 ? "+" : "−"} 180 = ${back}, so ${brg(back)}.`,
            "Lengths shrink on a scale drawing but angles don't, so the bearing is drawn exactly as it is in real life.",
          ],
          hint: "Real → drawing: divide by what 1 cm represents. For (b), turn round: ±180°.",
          traps: pairTraps([L, back], [
            [[L, 360 - b], "For (b), going back is a half-turn (±180°), not 360° − bearing."],
            [[L, b], `For (b), that is the bearing of ${B} from ${A}. You need the opposite direction.`],
          ]),
        };
      }

      // read-map: map length → real distance, and the reverse bearing
      return {
        prompt: `On a map with a scale of ${scaleText}, the straight line from ${A} to ${B} is ${num(L)} cm long, on a bearing of ${brg(b)}. (a) What is the real distance from ${A} to ${B}, in km? (b) What is the real bearing of ${A} from ${B}? Give both answers separated by a comma: the distance first, then the bearing.`,
        answer: { type: "list", values: [real, back], ordered: true, display: `${num(real)} km, ${brg(back)}` },
        solution: [
          `(a) ${perCm} So the real distance is ${num(L)} × ${num(k)} = ${num(real)} km.`,
          `(b) A scale drawing keeps every angle the same, so the real bearing of ${B} from ${A} is the one on the map, ${brg(b)}.`,
          `The bearing of ${A} from ${B} is the back bearing: ${b} ${b < 180 ? "+" : "−"} 180 = ${back}, so ${brg(back)}.`,
        ],
        hint: "Map → real: multiply. Angles are not changed by a scale. For (b), turn round: ±180°.",
        traps: pairTraps([real, back], [
          [[real, b], `For (b), that is the bearing of ${B} from ${A}. You need the opposite direction.`],
          [[real, 360 - b], "For (b), going back is a half-turn (±180°), not 360° − bearing."],
        ]),
      };
    },
  },
  {
    id: `${T}.loci-on-a-grid`,
    topicId: T,
    title: "Loci on a coordinate grid",
    level: 3,
    guideRef: "loci",
    generate(rng, tier) {
      const mode = rng.pick(tier === 1 ? ["two-points", "two-lines"] : ["two-points", "two-lines", "distance-from-line", "circle"]);
      const lineAccept = (axis: string, v: number): string[] => {
        const s = String(clean(v));
        const out = [`${axis}=${s}`, `${s}=${axis}`];
        if (!Number.isInteger(v)) out.push(`${axis}=${clean(v * 2)}/2`);
        return out;
      };

      if (mode === "two-points") {
        const vertical = rng.bool(); // A and B share an x-coordinate → the locus is horizontal (y = c)
        let c = 3, u1 = 1, u2 = 9;
        for (let i = 0; i < 100; i++) {
          const lo = tier === 1 ? 0 : -8;
          c = rng.int(lo, 9);
          u1 = rng.int(lo, 10);
          u2 = rng.int(lo, 10);
          if (Math.abs(u1 - u2) < 2 || c === u1 || c === u2) continue;
          if (tier === 1 && (u1 + u2) % 2 !== 0) continue;
          break;
        }
        const m = clean((u1 + u2) / 2);
        const axis = vertical ? "y" : "x";
        const other = vertical ? "x" : "y";
        const A = vertical ? pt(c, u1) : pt(u1, c);
        const B = vertical ? pt(c, u2) : pt(u2, c);
        return {
          prompt: `The locus of points that are the same distance from A${A} and B${B} is a straight line. Write down its equation.`,
          answer: { type: "text", accept: lineAccept(axis, m), display: `${axis} = ${num(m)}` },
          solution: [
            "Points equidistant from A and B lie on the perpendicular bisector of AB.",
            `A and B have the same ${other}-coordinate, so AB is ${vertical ? "vertical" : "horizontal"} and its perpendicular bisector is ${vertical ? "horizontal" : "vertical"}.`,
            `It passes through the midpoint of AB, where ${axis} = (${num(u1)} + ${br(u2)}) ÷ 2 = ${num(m)}. So the locus is ${axis} = ${num(m)}.`,
          ],
          hint: "Equidistant from two points → the perpendicular bisector. Find the midpoint first.",
          traps: [{ spec: { type: "text", accept: lineAccept(other, m) }, feedback: `AB is ${vertical ? "vertical" : "horizontal"}, so its perpendicular bisector is ${vertical ? "horizontal: y = …" : "vertical: x = …"}.` }],
        };
      }

      if (mode === "two-lines") {
        const axis = rng.bool() ? "y" : "x";
        let k1 = 1, k2 = 7;
        for (let i = 0; i < 100; i++) {
          const lo = tier === 1 ? 0 : -9;
          k1 = rng.int(lo, 10);
          k2 = rng.int(lo, 10);
          if (Math.abs(k1 - k2) < 2) continue;
          if (tier === 1 && (k1 + k2) % 2 !== 0) continue;
          break;
        }
        const m = clean((k1 + k2) / 2);
        return {
          prompt: `Find the equation of the locus of points that are the same distance from the lines ${axis} = ${num(k1)} and ${axis} = ${num(k2)}.`,
          answer: { type: "text", accept: lineAccept(axis, m), display: `${axis} = ${num(m)}` },
          solution: [
            "The two lines are parallel, so the points equidistant from both form a parallel line exactly halfway between them.",
            `Halfway: (${num(k1)} + ${br(k2)}) ÷ 2 = ${num(m)}.`,
            `The locus is ${axis} = ${num(m)}.`,
          ],
          hint: "The locus is a line parallel to both, exactly in the middle.",
          traps: [{ spec: { type: "text", accept: lineAccept(axis === "y" ? "x" : "y", m) }, feedback: `The locus is parallel to the given lines, so it is also a "${axis} = …" line.` }],
        };
      }

      if (mode === "distance-from-line") {
        const axis = rng.bool() ? "y" : "x";
        const k = rng.int(-6, 8);
        const d = tier === 3 && rng.bool(0.4) ? clean(rng.int(3, 11) / 2) : rng.int(2, 7);
        const lo = clean(k - d), hi = clean(k + d);
        return {
          prompt: `The locus of points exactly ${num(d)} units from the line ${axis} = ${num(k)} is a pair of parallel lines. Write down the equations of both lines.`,
          answer: { type: "list", values: [lo, hi], display: `${axis} = ${num(lo)} and ${axis} = ${num(hi)}` },
          solution: [
            `The points can be on either side of ${axis} = ${num(k)}, so there are two lines, each parallel to it.`,
            `One is ${num(d)} more: ${axis} = ${num(k)} + ${num(d)} = ${num(hi)}. The other is ${num(d)} less: ${axis} = ${num(k)} − ${num(d)} = ${num(lo)}.`,
          ],
          hint: "Points can be on either side of the line.",
        };
      }

      // circle: points exactly r from P that lie on the line through P parallel to an axis
      const a = rng.int(-6, 8);
      const b = rng.int(-6, 8);
      const r = rng.int(2, 9);
      const along = rng.bool() ? "x" : "y"; // which coordinate is fixed (= P's)
      const fixed = along === "x" ? a : b;
      const free = along === "x" ? b : a;
      const freeAxis = along === "x" ? "y" : "x";
      const ctx = rng.pick([
        `A goat is tied to a post at P${pt(a, b)} with a rope ${r} m long. The edge of the area it can reach is the locus of points exactly ${r} m from P (1 unit = 1 m).`,
        `The locus of points exactly ${r} units from P${pt(a, b)} is a circle.`,
      ]);
      return {
        prompt: `${ctx} Two points on this locus have ${along}-coordinate ${num(fixed)}. Find their ${freeAxis}-coordinates.`,
        answer: { type: "list", values: [free - r, free + r], display: `${num(free - r)} and ${num(free + r)}` },
        solution: [
          `Points exactly ${r} from P form a circle with centre P and radius ${r}.`,
          `The points with ${along} = ${num(fixed)} are straight ${along === "x" ? "above and below" : "left and right of"} P, ${r} away.`,
          `${freeAxis} = ${num(free)} + ${r} = ${num(free + r)} and ${freeAxis} = ${num(free)} − ${r} = ${num(free - r)}.`,
        ],
        hint: "A fixed distance from a point gives a circle. Go straight along from P in both directions.",
      };
    },
  },
];
