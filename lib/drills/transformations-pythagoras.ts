// Procedural skill drills for "Transformations & Symmetry" (topic id: transformations-pythagoras).
// Coordinates are always integers (or exact halves), so every image point is computed exactly.
// Square roots (Pythagoras) are rounded once, at the very end.
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { num, br, roundTo, clean, frac } from "./helpers.ts";

const TOPIC = "transformations-pythagoras";
type P2 = [number, number];
interface Win {
  x0: number;
  x1: number;
  y0: number;
  y1: number;
}

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"] as const;

// ---------------------------------------------------------------------------
// Small helpers
// ---------------------------------------------------------------------------

/** Turn −0 into 0. */
const z = (n: number): number => (n === 0 ? 0 : n);
const pt = (p: P2): string => `(${num(p[0])}, ${num(p[1])})`;
const vec = (p: P2): string => `(${num(p[0])} over ${num(p[1])})`;
const add = (p: P2, q: P2): P2 => [z(p[0] + q[0]), z(p[1] + q[1])];
const sub = (p: P2, q: P2): P2 => [z(p[0] - q[0]), z(p[1] - q[1])];
const scale = (k: number, p: P2): P2 => [z(clean(k * p[0])), z(clean(k * p[1]))];
const same = (p: P2, q: P2): boolean => p[0] === q[0] && p[1] === q[1];
const isZero = (p: P2): boolean => p[0] === 0 && p[1] === 0;
const units = (n: number): string => `${num(n)} unit${n === 1 ? "" : "s"}`;
const cap = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);
/** ASCII number for text-answer accept lists ("-2.5"). */
const ascii = (n: number): string => String(clean(n));
const listPts = (ps: P2[]): string => `${pt(ps[0])}, ${pt(ps[1])} and ${pt(ps[2])}`;
/** A value already rounded to 1 d.p., always shown with its decimal digit: 17 → "17.0". */
const dp1 = (x: number): string => num(x).replace(/^(−?\d+)$/, "$1.0");

function coordSpec(p: P2): AnswerSpec {
  return { type: "list", values: [z(p[0]), z(p[1])], ordered: true, display: pt(p) };
}
function vecSpec(p: P2): AnswerSpec {
  return { type: "list", values: [z(p[0]), z(p[1])], ordered: true, display: vec(p) };
}
function textSpec(accept: string[], display?: string): AnswerSpec {
  return display ? { type: "text", accept, display } : { type: "text", accept };
}

/** Traps for (x, y) answers: drops any candidate equal to the answer or to an earlier trap. */
function pairTraps(ans: P2, cands: Array<[P2, string]>, spec: (p: P2) => AnswerSpec = coordSpec): Trap[] {
  const used: P2[] = [ans];
  const out: Trap[] = [];
  for (const [p, feedback] of cands) {
    if (!Number.isFinite(p[0]) || !Number.isFinite(p[1]) || used.some((u) => same(u, p))) continue;
    used.push(p);
    out.push({ spec: spec(p), feedback });
  }
  return out;
}

/** Traps for single-number answers: drops candidates equal to the answer, duplicates and non-finite values. */
function numTraps(ans: number, cands: Array<[number, string] | [number, string, number]>): Trap[] {
  const used: number[] = [ans];
  const out: Trap[] = [];
  for (const [v, feedback, tolerance] of cands) {
    if (!Number.isFinite(v) || used.some((u) => Math.abs(u - v) < 0.11)) continue;
    used.push(v);
    out.push({ spec: tolerance ? { type: "number", value: v, tolerance } : { type: "number", value: v }, feedback });
  }
  return out;
}
/** A square root rounded to 1 d.p., as a trap that also catches 2-d.p. versions of the same slip. */
const rootTrap = (sq: number, feedback: string): [number, string, number] => [roundTo(Math.sqrt(sq), 1), feedback, 0.051];

// ---------------------------------------------------------------------------
// Triangles and grids
// ---------------------------------------------------------------------------

/** Scalene triangles (no two sides equal), so a congruent image fixes the transformation. First side is axis-aligned. */
const TRIS: P2[][] = [
  [[0, 0], [3, 0], [0, 2]],
  [[0, 0], [2, 0], [0, 3]],
  [[0, 0], [3, 0], [1, 2]],
  [[0, 0], [2, 0], [2, 3]],
  [[0, 0], [4, 0], [1, 2]],
  [[0, 0], [2, 0], [3, 2]],
];

function norm(t: P2[]): P2[] {
  const mx = Math.min(...t.map((p) => p[0]));
  const my = Math.min(...t.map((p) => p[1]));
  return t.map((p): P2 => [z(p[0] - mx), z(p[1] - my)]);
}

/** Random flip / swap of a template triangle, shifted back so its lowest-left corner is (0, 0). */
function orient(rng: Rng, t: P2[]): P2[] {
  const sw = rng.bool();
  const sx = rng.bool() ? 1 : -1;
  const sy = rng.bool() ? 1 : -1;
  return norm(t.map(([x, y]): P2 => (sw ? [z(sx * y), z(sy * x)] : [z(sx * x), z(sy * y)])));
}

function bbox(ps: P2[]): Win {
  const xs = ps.map((p) => p[0]);
  const ys = ps.map((p) => p[1]);
  return { x0: Math.min(...xs), x1: Math.max(...xs), y0: Math.min(...ys), y1: Math.max(...ys) };
}

/** True when the bounding boxes of the two shapes are separated (so the drawings never overlap). */
function apart(a: P2[], b: P2[]): boolean {
  const A = bbox(a);
  const B = bbox(b);
  return A.x1 < B.x0 || B.x1 < A.x0 || A.y1 < B.y0 || B.y1 < A.y0;
}

function inWin(ps: P2[], w: Win): boolean {
  return ps.every((p) => p[0] >= w.x0 && p[0] <= w.x1 && p[1] >= w.y0 && p[1] <= w.y1);
}

function signedArea(t: P2[]): number {
  let s = 0;
  for (let i = 0; i < t.length; i++) {
    const [x1, y1] = t[i];
    const [x2, y2] = t[(i + 1) % t.length];
    s += x1 * y2 - x2 * y1;
  }
  return s / 2;
}
const sense = (t: P2[]): string => (signedArea(t) > 0 ? "anticlockwise" : "clockwise");

interface GridShape {
  pts: P2[];
  fill: string;
  label: string;
}

/** A coordinate grid (one square = one unit) with labelled triangles, plotted exactly from their coordinates. */
function gridSvg(w: Win, shapes: GridShape[], aria: string): string {
  const S = Math.max(12, Math.min(18, Math.floor(280 / Math.max(w.x1 - w.x0, w.y1 - w.y0)))); // one grid square
  const [ML, MR, MT, MB] = [34, 22, 22, 26]; // margins: room for the edge numbers and axis letters
  const W = (w.x1 - w.x0) * S + ML + MR;
  const H = (w.y1 - w.y0) * S + MT + MB;
  const X = (x: number): number => ML + (x - w.x0) * S;
  const Y = (y: number): number => MT + (w.y1 - y) * S;
  const font = `font-family="sans-serif" fill="#334155"`;
  const parts: string[] = [`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`];
  for (let x = w.x0; x <= w.x1; x++) parts.push(`<line x1="${X(x)}" y1="${Y(w.y0)}" x2="${X(x)}" y2="${Y(w.y1)}" stroke="#e2e8f0" stroke-width="1"/>`);
  for (let y = w.y0; y <= w.y1; y++) parts.push(`<line x1="${X(w.x0)}" y1="${Y(y)}" x2="${X(w.x1)}" y2="${Y(y)}" stroke="#e2e8f0" stroke-width="1"/>`);
  const hasXAxis = w.y0 <= 0 && 0 <= w.y1;
  const hasYAxis = w.x0 <= 0 && 0 <= w.x1;
  if (hasXAxis) parts.push(`<line x1="${X(w.x0)}" y1="${Y(0)}" x2="${X(w.x1)}" y2="${Y(0)}" stroke="#334155" stroke-width="1.5"/>`);
  if (hasYAxis) parts.push(`<line x1="${X(0)}" y1="${Y(w.y0)}" x2="${X(0)}" y2="${Y(w.y1)}" stroke="#334155" stroke-width="1.5"/>`);
  for (const s of shapes) {
    parts.push(`<polygon points="${s.pts.map((p) => `${X(p[0])},${Y(p[1])}`).join(" ")}" fill="${s.fill}" fill-opacity="0.9" stroke="#1f2937" stroke-width="1.8" stroke-linejoin="round"/>`);
  }
  // Numbers run along the bottom and left edges, so they never sit on top of a shape.
  if (hasXAxis) parts.push(`<text x="${X(w.x1) + 8}" y="${Y(0) + 4}" font-size="12" font-style="italic" ${font}>x</text>`);
  if (hasYAxis) parts.push(`<text x="${X(0)}" y="${Y(w.y1) - 8}" font-size="12" font-style="italic" text-anchor="middle" ${font}>y</text>`);
  for (let x = w.x0; x <= w.x1; x++) {
    if (x % 2 === 0) parts.push(`<text x="${X(x)}" y="${Y(w.y0) + 15}" font-size="11" text-anchor="middle" ${font}>${num(x)}</text>`);
  }
  for (let y = w.y0; y <= w.y1; y++) {
    if (y % 2 === 0) parts.push(`<text x="${X(w.x0) - 5}" y="${Y(y) + 4}" font-size="11" text-anchor="end" ${font}>${num(y)}</text>`);
  }
  for (const s of shapes) {
    const cx = s.pts.reduce((a, p) => a + p[0], 0) / s.pts.length;
    const cy = s.pts.reduce((a, p) => a + p[1], 0) / s.pts.length;
    parts.push(`<text x="${clean(X(cx))}" y="${clean(Y(cy) + 5)}" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">${s.label}</text>`);
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}">${parts.join("")}</svg>`;
}

// ---------------------------------------------------------------------------
// Reflections and rotations
// ---------------------------------------------------------------------------

/** x: the vertical line x = a (a = 0 is the y-axis); y: the horizontal line y = a (a = 0 is the x-axis). */
type Mirror = { k: "x"; a: number } | { k: "y"; a: number } | { k: "yx" } | { k: "ynx" };

function mirrorName(m: Mirror): string {
  if (m.k === "x") return m.a === 0 ? "the y-axis" : `the line x = ${num(m.a)}`;
  if (m.k === "y") return m.a === 0 ? "the x-axis" : `the line y = ${num(m.a)}`;
  return m.k === "yx" ? "the line y = x" : "the line y = −x";
}

function mirrorEqn(m: Mirror): string {
  if (m.k === "x") return `x = ${num(m.a)}`;
  if (m.k === "y") return `y = ${num(m.a)}`;
  return m.k === "yx" ? "y = x" : "y = −x";
}

function reflectP(m: Mirror, p: P2): P2 {
  if (m.k === "x") return [z(clean(2 * m.a - p[0])), p[1]];
  if (m.k === "y") return [p[0], z(clean(2 * m.a - p[1]))];
  if (m.k === "yx") return [p[1], p[0]];
  return [z(-p[1]), z(-p[0])];
}

function onMirror(m: Mirror, p: P2): boolean {
  if (m.k === "x") return p[0] === m.a;
  if (m.k === "y") return p[1] === m.a;
  if (m.k === "yx") return p[0] === p[1];
  return p[0] === -p[1];
}

function sameMirror(m1: Mirror, m2: Mirror): boolean {
  if (m1.k !== m2.k) return false;
  if ((m1.k === "x" || m1.k === "y") && (m2.k === "x" || m2.k === "y")) return m1.a === m2.a;
  return true;
}

/** Worked steps for reflecting one point. */
function reflectSteps(m: Mirror, p: P2): string[] {
  const img = reflectP(m, p);
  if (m.k === "x" && m.a === 0) return [`Reflecting in the y-axis keeps the y-coordinate and changes the sign of the x-coordinate: ${pt(p)} → ${pt(img)}.`];
  if (m.k === "y" && m.a === 0) return [`Reflecting in the x-axis keeps the x-coordinate and changes the sign of the y-coordinate: ${pt(p)} → ${pt(img)}.`];
  if (m.k === "x") {
    const d = clean(p[0] - m.a);
    return [
      `x = ${num(m.a)} is a vertical line, so only the x-coordinate changes. The point is ${units(Math.abs(d))} to the ${d > 0 ? "right" : "left"} of it (${num(p[0])} − ${br(m.a)} = ${num(d)}).`,
      `Go the same distance to the other side: ${num(m.a)} ${d > 0 ? "−" : "+"} ${num(Math.abs(d))} = ${num(img[0])}. The y-coordinate stays ${num(p[1])}, so the image is ${pt(img)}.`,
    ];
  }
  if (m.k === "y") {
    const d = clean(p[1] - m.a);
    return [
      `y = ${num(m.a)} is a horizontal line, so only the y-coordinate changes. The point is ${units(Math.abs(d))} ${d > 0 ? "above" : "below"} it (${num(p[1])} − ${br(m.a)} = ${num(d)}).`,
      `Go the same distance to the other side: ${num(m.a)} ${d > 0 ? "−" : "+"} ${num(Math.abs(d))} = ${num(img[1])}. The x-coordinate stays ${num(p[0])}, so the image is ${pt(img)}.`,
    ];
  }
  if (m.k === "yx") return [`Reflecting in y = x swaps the two coordinates: ${pt(p)} → ${pt(img)}.`];
  return [`Reflecting in y = −x swaps the two coordinates and changes both signs: ${pt(p)} → ${pt(img)}.`];
}

/** Traps for reflecting one point (each a specific, common slip). */
function reflectTrapCands(m: Mirror, p: P2): Array<[P2, string]> {
  if (m.k === "x" && m.a === 0) return [[[p[0], z(-p[1])], "That's a reflection in the x-axis. The y-axis is vertical, so the point moves left or right and its y-coordinate stays the same."]];
  if (m.k === "y" && m.a === 0) return [[[z(-p[0]), p[1]], "That's a reflection in the y-axis. The x-axis is horizontal, so the point moves up or down and its x-coordinate stays the same."]];
  if (m.k === "x")
    return [
      [[p[0], z(2 * m.a - p[1])], `x = ${num(m.a)} is a vertical line (every point on it has x-coordinate ${num(m.a)}), so the point moves left or right and its y-coordinate stays the same.`],
      [[z(-p[0]), p[1]], `That's a reflection in the y-axis. Measure the distance to the line x = ${num(m.a)} instead.`],
    ];
  if (m.k === "y")
    return [
      [[z(2 * m.a - p[0]), p[1]], `y = ${num(m.a)} is a horizontal line (every point on it has y-coordinate ${num(m.a)}), so the point moves up or down and its x-coordinate stays the same.`],
      [[p[0], z(-p[1])], `That's a reflection in the x-axis. Measure the distance to the line y = ${num(m.a)} instead.`],
    ];
  if (m.k === "yx") return [[[z(-p[1]), z(-p[0])], "That's the rule for y = −x. For y = x, just swap the coordinates."]];
  return [
    [[p[1], p[0]], "Swapping the coordinates gives the reflection in y = x. For y = −x, swap them AND change both signs."],
    [[z(-p[0]), z(-p[1])], "Changing both signs without swapping is a half-turn about the origin, not a reflection in y = −x."],
  ];
}

/** Rotate p by q quarter-turns ANTICLOCKWISE about the origin (q = 3 is 90° clockwise). */
function rotQ(q: number, p: P2): P2 {
  const n = ((q % 4) + 4) % 4;
  let r: P2 = [p[0], p[1]];
  for (let i = 0; i < n; i++) r = [z(-r[1]), z(r[0])];
  return r;
}
const TURN_TEXT = ["no turn", "90° anticlockwise", "180°", "90° clockwise"];
const TURN_RULE = ["", "(x, y) → (−y, x)", "(x, y) → (−x, −y)", "(x, y) → (y, −x)"];

// ---------------------------------------------------------------------------
// Symmetry facts
// ---------------------------------------------------------------------------

interface ShapeInfo {
  a: string;
  lines: number;
  order: number;
  whyLines: string;
  whyOrder: string;
  linesTrap?: [number, string];
  orderTrap?: [number, string];
}

const SPECIAL_SHAPES: ShapeInfo[] = [
  {
    a: "a square",
    lines: 4,
    order: 4,
    whyLines: "Two lines join the midpoints of opposite sides and two more are the diagonals: 4 lines.",
    whyOrder: "It fits its outline after turns of 90°, 180°, 270° and 360°: 4 positions in a full turn.",
  },
  {
    a: "a rectangle that is not a square",
    lines: 2,
    order: 2,
    whyLines: "The two lines joining the midpoints of opposite sides work. The diagonals do not: fold along one and the corners miss each other. So 2 lines.",
    whyOrder: "It fits its outline after a half-turn (180°) and after a full turn (360°): 2 positions.",
    linesTrap: [4, "The diagonals of a rectangle are not lines of symmetry — fold along one and the corners don't meet. Only a square has 4."],
  },
  {
    a: "a rhombus that is not a square",
    lines: 2,
    order: 2,
    whyLines: "Both diagonals are lines of symmetry, but the lines joining the midpoints of opposite sides are not. So 2 lines.",
    whyOrder: "It fits its outline after a half-turn (180°) and after a full turn (360°): 2 positions.",
    linesTrap: [4, "Only the two diagonals of a rhombus work. Fold along the line joining the midpoints of opposite sides and the halves don't match."],
  },
  {
    a: "a parallelogram that is not a rectangle or a rhombus",
    lines: 0,
    order: 2,
    whyLines: "No fold makes the two halves match — not even along a diagonal. So 0 lines.",
    whyOrder: "It fits its outline after a half-turn about the point where the diagonals cross, and after a full turn: 2 positions.",
    linesTrap: [2, "Folding a parallelogram along a diagonal does not make the halves match, so it has no lines of symmetry. (It does have rotational symmetry.)"],
    orderTrap: [1, "Try a half-turn: a parallelogram fits its outline after 180° as well as after 360°."],
  },
  {
    a: "a kite that is not a rhombus",
    lines: 1,
    order: 1,
    whyLines: "Only the diagonal through the two corners where the pairs of equal sides meet works: 1 line.",
    whyOrder: "It only fits its outline after a full turn: 1 position.",
    linesTrap: [2, "Only one diagonal of a kite is a line of symmetry. Fold along the other and the halves don't match."],
  },
  {
    a: "an isosceles trapezium",
    lines: 1,
    order: 1,
    whyLines: "Only the line through the midpoints of the two parallel sides works: 1 line.",
    whyOrder: "It only fits its outline after a full turn: 1 position.",
  },
  {
    a: "an equilateral triangle",
    lines: 3,
    order: 3,
    whyLines: "Each line runs from a vertex to the midpoint of the opposite side: 3 lines.",
    whyOrder: "It fits its outline after turns of 120°, 240° and 360°: 3 positions.",
  },
  {
    a: "an isosceles triangle that is not equilateral",
    lines: 1,
    order: 1,
    whyLines: "Only the line from the vertex between the two equal sides to the midpoint of the opposite side works: 1 line.",
    whyOrder: "It only fits its outline after a full turn: 1 position.",
  },
  {
    a: "a scalene triangle",
    lines: 0,
    order: 1,
    whyLines: "All three sides are different lengths, so no fold makes the halves match: 0 lines.",
    whyOrder: "It only fits its outline after a full turn: 1 position.",
  },
];

const REG_NAMES: Record<number, string> = { 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon", 12: "dodecagon" };

function regularShape(n: number): ShapeInfo {
  const info: ShapeInfo = {
    a: REG_NAMES[n] ? `a regular ${REG_NAMES[n]} (${n} sides)` : `a regular polygon with ${n} sides`,
    lines: n,
    order: n,
    whyLines:
      n % 2 === 1
        ? `${n} is odd, so each line of symmetry runs from a vertex to the midpoint of the opposite side: ${n} lines. A regular polygon has as many lines of symmetry as sides.`
        : `${n / 2} lines join opposite vertices and ${n / 2} lines join the midpoints of opposite sides: ${n} lines. A regular polygon has as many lines of symmetry as sides.`,
    whyOrder: `It fits its outline once for each vertex position — ${n} times in one full turn.`,
  };
  if (n % 2 === 0) info.linesTrap = [n / 2, "You've counted only one kind of line. The lines through opposite vertices AND the lines through midpoints of opposite sides both count."];
  return info;
}

const DESIGNS = ["hubcap design", "company logo", "ceiling-fan pattern", "kaleidoscope pattern", "batik print motif", "window-grille design"] as const;

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // ------------------------------------------------------------ symmetry (L1)
  {
    id: `${TOPIC}.symmetry-lines-and-order`,
    topicId: TOPIC,
    title: "Lines of symmetry and order of rotational symmetry",
    level: 1,
    guideRef: "symmetry",
    generate(rng, tier) {
      const regs = tier === 1 ? [5, 6, 8] : tier === 2 ? [5, 6, 7, 8, 9, 10, 12] : [7, 9, 10, 12, 15, 18, 20];
      const pool = [...SPECIAL_SHAPES, ...regs.map(regularShape)];
      const r = rng.next();
      const type =
        tier === 1
          ? r < 0.4 ? "lines" : r < 0.8 ? "order" : "angle"
          : tier === 2
            ? r < 0.25 ? "lines" : r < 0.5 ? "order" : r < 0.75 ? "angle" : "fromAngle"
            : r < 0.2 ? (rng.bool() ? "lines" : "order") : r < 0.4 ? "angle" : r < 0.6 ? "fromAngle" : r < 0.8 ? "count" : "linesFromAngle";
      const name = rng.pick(NAMES);

      if (type === "lines") {
        const s = rng.pick(pool);
        const prompt = rng.pick([
          `How many lines of symmetry does ${s.a} have?`,
          `${name} cuts ${s.a} out of card. How many lines of symmetry does it have?`,
          `A floor tile is in the shape of ${s.a}. How many lines of symmetry does the tile have?`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: s.lines },
          solution: [s.whyLines, `So it has ${s.lines} line${s.lines === 1 ? "" : "s"} of symmetry.`],
          hint: "Imagine folding along a line: do the two halves land exactly on top of each other? Test the diagonals carefully.",
          traps: s.linesTrap ? numTraps(s.lines, [s.linesTrap]) : undefined,
        };
      }
      if (type === "order") {
        const s = rng.pick(pool);
        const prompt = rng.pick([
          `What is the order of rotational symmetry of ${s.a}?`,
          `${name} traces ${s.a} and turns the tracing paper about the shape's centre. What is the order of rotational symmetry of the shape?`,
          `A badge is in the shape of ${s.a}. What is the order of rotational symmetry of the badge?`,
        ]);
        const cands: Array<[number, string]> = [];
        if (s.order === 1) cands.push([0, "Every shape fits its own outline after a full turn, so the lowest possible order is 1, not 0."]);
        if (s.orderTrap) cands.push(s.orderTrap);
        return {
          prompt,
          answer: { type: "number", value: s.order },
          solution: [s.whyOrder, `So the order of rotational symmetry is ${s.order}.`],
          hint: "Count how many times the shape fits onto its outline during one full turn — and remember to count the full turn itself.",
          traps: numTraps(s.order, cands),
        };
      }
      if (type === "angle") {
        const s = rng.pick(pool.filter((x) => x.order >= 2 && 360 % x.order === 0));
        const ans = 360 / s.order;
        const prompt = rng.pick([
          `${cap(s.a)} is turned about its centre. What is the smallest angle of turn, in degrees, that makes it fit onto its own outline again?`,
          `What is the smallest angle, in degrees, through which ${s.a} can be turned about its centre so that it looks exactly the same as before?`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: ans },
          solution: [
            `${cap(s.a)} has rotational symmetry of order ${s.order}: it fits its outline ${s.order} times in one full turn.`,
            `Those turns are equally spaced, so the smallest one is 360° ÷ ${s.order} = ${ans}°.`,
          ],
          hint: "How many times does it fit in a full turn of 360°? Share the 360° equally between them.",
          traps: numTraps(ans, [[360, "Every shape fits after a full turn of 360°. You need the smallest turn that works."]]),
        };
      }
      if (type === "fromAngle") {
        const ang = rng.pick(tier === 2 ? [30, 36, 40, 45, 60, 72, 90, 120, 180] : [10, 12, 15, 18, 20, 24, 40, 45]);
        const n = 360 / ang;
        return {
          prompt: `A ${rng.pick(DESIGNS)} fits onto its own outline when it is turned through ${ang}° about its centre, and no smaller turn works. What is its order of rotational symmetry?`,
          answer: { type: "number", value: n },
          solution: [
            `The turns that work are ${ang}°, ${2 * ang}°, ${3 * ang}°, … all the way up to 360°.`,
            `Number of turns in one full turn: 360 ÷ ${ang} = ${n}, so the order is ${n}.`,
          ],
          hint: "How many turns of this size fit into one full turn of 360°?",
          traps: numTraps(n, [[n - 1, "The full turn of 360° is one of the positions too — count it."]]),
        };
      }
      if (type === "count") {
        const n = rng.pick([3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20]);
        const s = 360 / n;
        const turns = n <= 6 ? Array.from({ length: n }, (_, i) => `${s * (i + 1)}°`).join(", ") : `${s}°, ${2 * s}°, ${3 * s}°, …, 360°`;
        return {
          prompt: `A ${rng.pick(DESIGNS)} has rotational symmetry of order ${n}. Through how many different angles between 0° and 360° (not including 0° or 360°) can it be turned so that it fits onto its outline?`,
          answer: { type: "number", value: n - 1 },
          solution: [
            `The smallest turn that works is 360° ÷ ${n} = ${s}°.`,
            `The turns that work are ${turns}: that is ${n} turns, including the full turn.`,
            `Leave out the full turn: ${n} − 1 = ${n - 1}.`,
          ],
          hint: "List the turns that work, all the way to a full turn. Which one does the question leave out?",
          traps: numTraps(n - 1, [[n, "That includes the full turn of 360°, which the question leaves out."]]),
        };
      }
      // linesFromAngle
      const ang = rng.pick([20, 24, 30, 36, 40, 45, 60, 72]);
      const n = 360 / ang;
      return {
        prompt: `A regular polygon fits onto its own outline when it is turned through ${ang}° about its centre, and no smaller turn works. How many lines of symmetry does it have?`,
        answer: { type: "number", value: n },
        solution: [
          `Order of rotational symmetry = 360 ÷ ${ang} = ${n}.`,
          `A regular polygon has rotational symmetry of order equal to its number of sides, so it has ${n} sides.`,
          `A regular polygon also has as many lines of symmetry as sides: ${n}.`,
        ],
        hint: "First find the order of rotational symmetry. What does that tell you about the number of sides of a regular polygon?",
      };
    },
  },

  // ------------------------------------------------------------ translation (L1)
  {
    id: `${TOPIC}.translate-a-point`,
    topicId: TOPIC,
    title: "Translate a point by a column vector",
    level: 1,
    guideRef: "translation",
    generate(rng, tier) {
      const mode = tier === 3 ? rng.pick(["basic", "reverse", "double"] as const) : "basic";
      const name = rng.pick(NAMES);
      if (mode === "reverse") {
        const I: P2 = [rng.int(-9, 9), rng.int(-9, 9)];
        const v: P2 = [rng.nonZero(-9, 9), rng.nonZero(-9, 9)];
        const ans = sub(I, v);
        return {
          prompt: `${name} translates a point by the column vector ${vec(v)}. Its image is at ${pt(I)}. Where was the point before it moved? Give the coordinates as (x, y).`,
          answer: coordSpec(ans),
          solution: [
            `Work backwards: undo the translation by moving with ${vec([z(-v[0]), z(-v[1])])} instead (change both signs).`,
            `(${num(I[0])} − ${br(v[0])}, ${num(I[1])} − ${br(v[1])}) = ${pt(ans)}.`,
            `Check: ${pt(ans)} moved by ${vec(v)} lands on ${pt(I)} ✓.`,
          ],
          hint: "Work backwards: which translation undoes this one?",
          traps: pairTraps(ans, [[add(I, v), "You applied the translation again. To go backwards, subtract the vector (change both signs)."]]),
        };
      }
      if (mode === "double") {
        const P: P2 = [rng.int(-8, 8), rng.int(-8, 8)];
        let v1: P2 = [3, -2];
        let v2: P2 = [-5, 4];
        for (let i = 0; i < 100; i++) {
          v1 = [rng.nonZero(-7, 7), rng.nonZero(-7, 7)];
          v2 = [rng.nonZero(-7, 7), rng.nonZero(-7, 7)];
          if (!isZero(add(v1, v2))) break;
          v1 = [3, -2];
          v2 = [-5, 4];
        }
        const t = add(v1, v2);
        const ans = add(P, t);
        return {
          prompt: `The point P${pt(P)} is translated by the column vector ${vec(v1)}, and then its image is translated by ${vec(v2)}. Where does the point end up? Give the coordinates as (x, y).`,
          answer: coordSpec(ans),
          solution: [
            `Combine the two moves into one column vector: top ${num(v1[0])} + ${br(v2[0])} = ${num(t[0])}, bottom ${num(v1[1])} + ${br(v2[1])} = ${num(t[1])}, giving ${vec(t)}.`,
            `Move P: (${num(P[0])} + ${br(t[0])}, ${num(P[1])} + ${br(t[1])}) = ${pt(ans)}.`,
          ],
          hint: "Two translations in a row make one translation: add the top numbers, and add the bottom numbers.",
          traps: pairTraps(ans, [[add(P, v1), "That's where P is after the first translation only — now apply the second one too."]]),
        };
      }
      let P: P2 = [2, 3];
      let v: P2 = [3, 1];
      for (let i = 0; i < 100; i++) {
        const P2_: P2 = tier === 1 ? [rng.int(0, 8), rng.int(0, 8)] : [rng.int(-9, 9), rng.int(-9, 9)];
        const v2_: P2 = tier === 1 ? [rng.nonZero(-5, 5), rng.nonZero(-5, 5)] : [rng.nonZero(-9, 9), rng.nonZero(-9, 9)];
        const I = add(P2_, v2_);
        const ok = tier === 1 ? I[0] >= 0 && I[1] >= 0 : Math.abs(I[0]) <= 15 && Math.abs(I[1]) <= 15 && Math.min(P2_[0], P2_[1], v2_[0], v2_[1]) < 0;
        if (ok) {
          P = P2_;
          v = v2_;
          break;
        }
      }
      const ans = add(P, v);
      const prompt = rng.pick([
        `The point P${pt(P)} is translated by the column vector ${vec(v)}. Give the coordinates of its image P′ as (x, y).`,
        `Triangle ABC is translated by the column vector ${vec(v)}. Vertex A is at ${pt(P)}. Where is A′, the image of A? Give the coordinates as (x, y).`,
        `${name} is playing a board game on a coordinate grid. A counter on ${pt(P)} is moved by the column vector ${vec(v)}. Where does the counter land? Give the coordinates as (x, y).`,
        `On a map grid, the hawker centre is at ${pt(P)}. Translating the hawker centre by the column vector ${vec(v)} gives the position of the MRT station. Give the coordinates of the MRT station as (x, y).`,
      ]);
      return {
        prompt,
        answer: coordSpec(ans),
        solution: [
          `The top number is the move across: ${num(P[0])} + ${br(v[0])} = ${num(ans[0])}.`,
          `The bottom number is the move up or down: ${num(P[1])} + ${br(v[1])} = ${num(ans[1])}.`,
          `The image is ${pt(ans)}.`,
        ],
        hint: "Top number = move across (right is +). Bottom number = move up or down (up is +).",
        traps: pairTraps(ans, [
          [[z(P[0] + v[1]), z(P[1] + v[0])], "You used the bottom number for the move across. The top number is across, the bottom number is up or down."],
          [sub(P, v), "You moved the wrong way. Add the vector: positive means right or up, negative means left or down."],
        ]),
      };
    },
  },

  // ------------------------------------------------------------ reflection (L1)
  {
    id: `${TOPIC}.reflect-a-point`,
    topicId: TOPIC,
    title: "Reflect a point in a mirror line",
    level: 1,
    guideRef: "reflection",
    generate(rng, tier) {
      const double = tier === 3 && rng.bool();
      const pickMirror = (): Mirror => {
        const r = rng.next();
        if (tier === 1) {
          if (r < 0.2) return { k: "x", a: 0 };
          if (r < 0.4) return { k: "y", a: 0 };
          if (r < 0.65) return { k: "x", a: rng.int(1, 5) };
          if (r < 0.9) return { k: "y", a: rng.int(1, 5) };
          return { k: "yx" };
        }
        if (r < 0.3) return { k: "x", a: rng.int(-5, 5) };
        if (r < 0.6) return { k: "y", a: rng.int(-5, 5) };
        return r < 0.8 ? { k: "yx" } : { k: "ynx" };
      };
      let m1: Mirror = { k: "x", a: 1 };
      let m2: Mirror = { k: "y", a: 2 };
      let P: P2 = [4, 6];
      for (let i = 0; i < 200; i++) {
        const a = pickMirror();
        const b = pickMirror();
        const Q: P2 = tier === 1 ? [rng.int(0, 8), rng.int(0, 8)] : [rng.int(-8, 8), rng.int(-8, 8)];
        if (onMirror(a, Q)) continue;
        if (double && (sameMirror(a, b) || onMirror(b, reflectP(a, Q)))) continue;
        m1 = a;
        m2 = b;
        P = Q;
        break;
      }
      const name = rng.pick(NAMES);
      if (double) {
        const mid = reflectP(m1, P);
        const ans = reflectP(m2, mid);
        return {
          prompt: `The point P${pt(P)} is reflected in ${mirrorName(m1)}. Then its image is reflected in ${mirrorName(m2)}. Give the coordinates of the final image as (x, y).`,
          answer: coordSpec(ans),
          solution: [
            ...reflectSteps(m1, P).map((s, i) => (i === 0 ? `First reflection: ${s.charAt(0).toLowerCase()}${s.slice(1)}` : s)),
            ...reflectSteps(m2, mid).map((s, i) => (i === 0 ? `Second reflection: ${s.charAt(0).toLowerCase()}${s.slice(1)}` : s)),
            `The final image is ${pt(ans)}.`,
          ],
          hint: "Do one reflection at a time, in the order given. Write down the point after the first reflection.",
          traps: pairTraps(ans, [
            [mid, "That's after the first reflection only — now reflect that point in the second line."],
            [reflectP(m1, reflectP(m2, P)), "Do the reflections in the order given — the order can change the result."],
          ]),
        };
      }
      const ans = reflectP(m1, P);
      const prompt = rng.pick([
        `Reflect the point P${pt(P)} in ${mirrorName(m1)}. Give the coordinates of the image P′ as (x, y).`,
        `Triangle T has a vertex at ${pt(P)}. T is reflected in ${mirrorName(m1)}. Where does this vertex end up? Give the coordinates as (x, y).`,
        `${name} is making a symmetrical pattern on a coordinate grid by reflecting dots in ${mirrorName(m1)}. Where does the dot at ${pt(P)} go? Give the coordinates as (x, y).`,
      ]);
      return {
        prompt,
        answer: coordSpec(ans),
        solution: [...reflectSteps(m1, P), `Check: P and its image are the same distance from the mirror, on opposite sides ✓.`],
        hint: "Is the mirror line vertical, horizontal or diagonal? Count how far the point is from the line, then go the same distance on the other side.",
        traps: pairTraps(ans, reflectTrapCands(m1, P)),
      };
    },
  },

  // ------------------------------------------------------------ enlargement lengths (L1)
  {
    id: `${TOPIC}.scale-factor-and-lengths`,
    topicId: TOPIC,
    title: "Scale factors, lengths and areas in enlargements",
    level: 1,
    guideRef: "enlargement",
    generate(rng, tier) {
      const modes = tier === 1 ? (["findK", "image", "object"] as const) : tier === 2 ? (["findK", "image", "object", "perimeter"] as const) : (["fraction", "area", "areaGiven", "perimeter"] as const);
      const mode = rng.pick(modes);
      const name = rng.pick(NAMES);
      // Lengths: whole numbers in tier 1; halves and tenths in tiers 2–3 (built from integers).
      const len = (): number => (tier === 1 ? rng.int(2, 12) : rng.bool() ? rng.int(2, 15) : clean(rng.int(15, 95) / 10));

      if (mode === "findK") {
        const k = rng.int(2, 5);
        let L = len();
        for (let i = 0; i < 50 && clean(k * L - L) === k; i++) L = len();
        if (clean(k * L - L) === k) L = 7;
        const M = clean(k * L);
        const prompt = rng.pick([
          `Triangle P has a side of length ${num(L)} cm. P is enlarged to give triangle Q, and the matching side of Q is ${num(M)} cm long. What is the scale factor of the enlargement?`,
          `A photo is ${num(L)} cm wide. ${name} enlarges it for a poster, and the poster image is ${num(M)} cm wide. What is the scale factor of the enlargement?`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: k },
          solution: [`Scale factor = image length ÷ object length.`, `${num(M)} ÷ ${num(L)} = ${k}.`],
          hint: "How many times longer is the new length than the old one?",
          traps: numTraps(k, [[clean(M - L), "Scale factors multiply — they don't add. Divide the new length by the old one."]]),
        };
      }
      if (mode === "image") {
        const k = rng.int(2, tier === 1 ? 5 : 6);
        let a = len();
        let b = len();
        for (let i = 0; i < 50 && a === b; i++) b = len();
        if (a === b) {
          a = 3;
          b = 5;
        }
        const longer = rng.bool();
        const side = longer ? Math.max(a, b) : Math.min(a, b);
        const ans = clean(k * side);
        const prompt = rng.pick([
          `A rectangle measures ${num(a)} cm by ${num(b)} cm. It is enlarged by scale factor ${k}. How long is the ${longer ? "longer" : "shorter"} side of the image, in cm?`,
          `${name} prints a photo that is ${num(a)} cm by ${num(b)} cm, then enlarges it by scale factor ${k}. How long is the ${longer ? "longer" : "shorter"} side of the enlarged photo, in cm?`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: ans },
          solution: [`Every length is multiplied by the scale factor ${k}.`, `The ${longer ? "longer" : "shorter"} side: ${num(side)} × ${k} = ${num(ans)} cm.`],
          hint: "In an enlargement, every length is multiplied by the scale factor.",
          traps: numTraps(ans, [[clean(side + k), "Multiply by the scale factor — don't add it."]]),
        };
      }
      if (mode === "object") {
        const k = rng.int(2, tier === 1 ? 5 : 6);
        const L = len();
        const M = clean(k * L);
        return {
          prompt: `Shape B is an enlargement of shape A with scale factor ${k}. A side of B is ${num(M)} cm long. How long is the matching side of A, in cm?`,
          answer: { type: "number", value: L },
          solution: [`B is ${k} times as big as A, so go backwards: divide by ${k}.`, `${num(M)} ÷ ${k} = ${num(L)} cm.`],
          hint: "Which shape is bigger? Work backwards from B to A.",
          traps: numTraps(L, [[clean(M * k), "B is the bigger shape, so A's side must be shorter. Divide by the scale factor to go back to A."]]),
        };
      }
      if (mode === "perimeter") {
        const k = rng.int(2, 5);
        let a = len();
        let b = len();
        for (let i = 0; i < 50 && a === b; i++) b = len();
        if (a === b) {
          a = 4;
          b = 7;
        }
        const P0 = clean(2 * (a + b));
        const ans = clean(k * P0);
        return {
          prompt: `A rectangle ${num(a)} cm by ${num(b)} cm is enlarged by scale factor ${k}. What is the perimeter of the image, in cm?`,
          answer: { type: "number", value: ans },
          solution: [
            `The image measures ${num(clean(k * a))} cm by ${num(clean(k * b))} cm.`,
            `Perimeter = 2 × (${num(clean(k * a))} + ${num(clean(k * b))}) = ${num(ans)} cm.`,
            `Check: the original perimeter is ${num(P0)} cm, and ${num(P0)} × ${k} = ${num(ans)} — perimeter is a length, so it scales by ${k} too ✓.`,
          ],
          hint: "Find the side lengths of the image first, then add all four sides.",
          traps: numTraps(ans, [
            [P0, "That's the perimeter of the original rectangle. Enlarge first."],
            [clean(k * (a + b)), "A rectangle has four sides: two of each length."],
          ]),
        };
      }
      if (mode === "area") {
        const k = rng.int(2, 4);
        let a = rng.int(2, 9);
        let b = rng.int(2, 9);
        for (let i = 0; i < 50 && a === b; i++) b = rng.int(2, 9);
        if (a === b) {
          a = 3;
          b = 5;
        }
        const ans = k * k * a * b;
        return {
          prompt: `A rectangle ${a} cm by ${b} cm is enlarged by scale factor ${k}. What is the area of the image, in cm²?`,
          answer: { type: "number", value: ans },
          solution: [
            `The image measures ${k * a} cm by ${k * b} cm.`,
            `Area = ${k * a} × ${k * b} = ${ans} cm².`,
            `Notice: the original area is ${a * b} cm², and ${ans} = ${a * b} × ${k * k}. Area scales by ${k} × ${k} = ${k * k}, not by ${k}.`,
          ],
          hint: "Find the lengths of the image's sides first, then multiply.",
          traps: numTraps(ans, [[k * a * b, `Both the length and the width are multiplied by ${k}, so the area is multiplied by ${k} × ${k} = ${k * k}.`]]),
        };
      }
      if (mode === "areaGiven") {
        const k = rng.int(2, 5);
        const A = rng.int(3, 24);
        const ans = k * k * A;
        const shape = rng.pick(["triangle", "garden-plot plan", "logo", "trapezium"]);
        return {
          prompt: `A ${shape} has an area of ${A} cm². It is enlarged by scale factor ${k}. What is the area of the enlarged ${shape}, in cm²?`,
          answer: { type: "number", value: ans },
          solution: [
            `Every length is multiplied by ${k}, so every area is multiplied by ${k} × ${k} = ${k * k}.`,
            `${A} × ${k * k} = ${ans} cm².`,
          ],
          hint: "Picture a 1 cm by 1 cm square inside the shape. What does it become after the enlargement?",
          traps: numTraps(ans, [[k * A, `Lengths are multiplied by ${k}, but area involves two lengths multiplied together, so it is multiplied by ${k * k}.`]]),
        };
      }
      // fraction (stretch): a scale factor that is a fraction
      const [n, d] = rng.pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [3, 2], [5, 2], [4, 3], [2, 5], [5, 4]] as const);
      const m = rng.int(2, 6);
      const L = d * m;
      const M = n * m;
      return {
        prompt: `Shape Q is an enlargement of shape P. A side of P is ${L} cm long and the matching side of Q is ${M} cm long. Find the scale factor. Give your answer as a fraction in its simplest form.`,
        answer: { type: "fraction", n, d, simplest: true, allowDecimal: true },
        solution: [
          `Scale factor = Q's length ÷ P's length = ${frac(M, L, { simplify: false })}.`,
          `Simplify: ${frac(M, L, { simplify: false })} = ${frac(n, d)}.`,
          n < d ? `The scale factor is less than 1, so Q is smaller than P — mathematicians still call this an enlargement.` : `The scale factor is more than 1, so Q is bigger than P ✓.`,
        ],
        hint: "Divide the image length by the matching object length, even if the answer is not a whole number.",
        traps: [{ spec: { type: "fraction", n: d, d: n }, feedback: "That's the scale factor from Q back to P. Divide Q's length by P's length." }],
      };
    },
  },

  // ------------------------------------------------------------ translation vector (L2)
  {
    id: `${TOPIC}.find-the-column-vector`,
    topicId: TOPIC,
    title: "Describe a translation with a column vector",
    level: 2,
    guideRef: "translation",
    generate(rng, tier) {
      const mode = tier === 3 ? rng.pick(["combine", "undo", "missing"] as const) : rng.pick(tier === 1 ? (["points", "diagram"] as const) : (["points", "diagram", "map"] as const));
      const name = rng.pick(NAMES);
      const back = (v: P2): Array<[P2, string]> => [[[z(-v[0]), z(-v[1])], "That vector goes from the image back to the start. Work out new position minus old position."]];

      if (mode === "diagram") {
        const win: Win = tier === 1 ? { x0: 0, x1: 12, y0: 0, y1: 10 } : { x0: -6, x1: 6, y0: -6, y1: 6 };
        let A: P2[] = [[1, 1], [4, 1], [1, 3]].map((p): P2 => [p[0] + win.x0, p[1] + win.y0]);
        let v: P2 = [6, 4];
        for (let i = 0; i < 200; i++) {
          const t = orient(rng, rng.pick(TRIS));
          const anc: P2 = [rng.int(win.x0, win.x1), rng.int(win.y0, win.y1)];
          const A2 = t.map((p) => add(p, anc));
          const v2: P2 = [rng.int(-9, 9), rng.int(-8, 8)];
          if (isZero(v2)) continue;
          const B2 = A2.map((p) => add(p, v2));
          const inner: Win = { x0: win.x0 + 1, x1: win.x1 - 1, y0: win.y0 + 1, y1: win.y1 - 1 };
          if (inWin(A2, inner) && inWin(B2, inner) && apart(A2, B2)) {
            A = A2;
            v = v2;
            break;
          }
        }
        const B = A.map((p) => add(p, v));
        return {
          prompt: `The diagram shows triangles A and B on a coordinate grid. One vertex of A is at ${pt(A[0])}. Write down the column vector that translates A onto B. Type the top number, then the bottom number.`,
          diagram: gridSvg(win, [{ pts: A, fill: "#c7d2fe", label: "A" }, { pts: B, fill: "#fde68a", label: "B" }], `Coordinate grid showing triangle A with vertices ${listPts(A)} and triangle B with vertices ${listPts(B)}`),
          answer: vecSpec(v),
          solution: [
            `Vertex ${pt(A[0])} of A matches vertex ${pt(B[0])} of B.`,
            `Across: ${num(B[0][0])} − ${br(A[0][0])} = ${num(v[0])}. Up: ${num(B[0][1])} − ${br(A[0][1])} = ${num(v[1])}.`,
            `Check with another vertex: ${pt(A[1])} → ${pt(B[1])} is the same move ✓. The column vector is ${vec(v)}.`,
          ],
          hint: "Pick one corner of A and find the matching corner of B. Count across first, then up or down.",
          traps: pairTraps(v, back(v), vecSpec),
        };
      }
      if (mode === "points" || mode === "map") {
        let P: P2 = [2, -3];
        let v: P2 = [-6, 4];
        for (let i = 0; i < 100; i++) {
          const P2_: P2 = tier === 1 ? [rng.int(0, 9), rng.int(0, 9)] : [rng.int(-8, 8), rng.int(-8, 8)];
          const v2: P2 = tier === 1 ? [rng.int(-6, 6), rng.int(-6, 6)] : [rng.int(-9, 9), rng.int(-9, 9)];
          const Q = add(P2_, v2);
          if (isZero(v2) || (v2[0] === 0 && rng.bool(0.7)) || (v2[1] === 0 && rng.bool(0.7))) continue;
          if (tier === 1 ? Q[0] < 0 || Q[1] < 0 : Math.abs(Q[0]) > 12 || Math.abs(Q[1]) > 12) continue;
          P = P2_;
          v = v2;
          break;
        }
        const Q = add(P, v);
        let prompt: string;
        if (mode === "map") {
          const [from, to] = rng.pick([["HDB block", "MRT station"], ["school", "hawker centre"], ["home", "library"], ["condo", "bus stop"]] as const);
          prompt = `On a map grid, ${name}'s ${from} is at ${pt(P)} and the ${to} is at ${pt(Q)}. Which column vector describes the journey from the ${from} to the ${to}? Type the top number, then the bottom number.`;
        } else {
          prompt = rng.pick([
            `Point A${pt(P)} is translated to A′${pt(Q)}. Write the translation as a column vector. Type the top number, then the bottom number.`,
            `A translation maps the point ${pt(P)} onto ${pt(Q)}. Which column vector describes the translation? Type the top number, then the bottom number.`,
          ]);
        }
        return {
          prompt,
          answer: vecSpec(v),
          solution: [
            `Across (new x − old x): ${num(Q[0])} − ${br(P[0])} = ${num(v[0])}.`,
            `Up (new y − old y): ${num(Q[1])} − ${br(P[1])} = ${num(v[1])}.`,
            `The column vector is ${vec(v)}.`,
          ],
          hint: "Work out how far you move across (new x − old x), then how far up or down (new y − old y).",
          traps: pairTraps(v, back(v), vecSpec),
        };
      }
      // Tier 3: combining and undoing translations.
      let v1: P2 = [3, -2];
      let v2: P2 = [-5, 6];
      for (let i = 0; i < 100; i++) {
        const a: P2 = [rng.nonZero(-8, 8), rng.nonZero(-8, 8)];
        const b: P2 = [rng.nonZero(-8, 8), rng.nonZero(-8, 8)];
        if (isZero(add(a, b)) || isZero(sub(b, a))) continue;
        v1 = a;
        v2 = b;
        break;
      }
      const s = add(v1, v2);
      if (mode === "combine") {
        return {
          prompt: `A shape is translated by the column vector ${vec(v1)} and then by ${vec(v2)}. Which single column vector does both moves at once? Type the top number, then the bottom number.`,
          answer: vecSpec(s),
          solution: [
            `One translation after another: add the column vectors, top with top and bottom with bottom.`,
            `Top: ${num(v1[0])} + ${br(v2[0])} = ${num(s[0])}. Bottom: ${num(v1[1])} + ${br(v2[1])} = ${num(s[1])}.`,
            `The single translation is ${vec(s)}.`,
          ],
          hint: "Follow one point: how far across does it go in total, and how far up or down?",
          traps: pairTraps(s, [[sub(v1, v2), "Doing one translation after another ADDS the vectors: top + top, bottom + bottom."]], vecSpec),
        };
      }
      if (mode === "undo") {
        const ans: P2 = [z(-s[0]), z(-s[1])];
        return {
          prompt: `${name} translates a shape by the column vector ${vec(v1)}, then translates the image by ${vec(v2)}. Which single column vector would move the final image straight back to where the shape started? Type the top number, then the bottom number.`,
          answer: vecSpec(ans),
          solution: [
            `The total move is ${vec(v1)} + ${vec(v2)} = ${vec(s)}.`,
            `To undo a translation, change both signs: ${vec(ans)}.`,
          ],
          hint: "Find the single translation that does both moves first. How do you reverse a translation?",
          traps: pairTraps(ans, [[s, "That's the move from the start to the end. To go back, change both signs."]], vecSpec),
        };
      }
      // missing: v1 then ? = total s, so ? = v2
      return {
        prompt: `Translating a shape by the column vector ${vec(v1)} and then by a second column vector has the same effect as the single translation ${vec(s)}. Find the second column vector. Type the top number, then the bottom number.`,
        answer: vecSpec(v2),
        solution: [
          `The two vectors must add up to ${vec(s)}.`,
          `Top: ${num(s[0])} − ${br(v1[0])} = ${num(v2[0])}. Bottom: ${num(s[1])} − ${br(v1[1])} = ${num(v2[1])}.`,
          `Check: ${vec(v1)} + ${vec(v2)} = ${vec(s)} ✓.`,
        ],
        hint: "Translations add. What do you add to the first vector to make the total?",
        traps: pairTraps(v2, [[add(s, v1), "You added. The two vectors must ADD UP to the total, so subtract the first vector from the total."]], vecSpec),
      };
    },
  },

  // ------------------------------------------------------------ mirror line (L2)
  {
    id: `${TOPIC}.find-the-mirror-line`,
    topicId: TOPIC,
    title: "Find the equation of a mirror line",
    level: 2,
    guideRef: "reflection",
    generate(rng, tier) {
      const pickM = (): Mirror => {
        const r = rng.next();
        if (tier === 1) return r < 0.5 ? { k: "x", a: rng.int(-3, 6) } : { k: "y", a: rng.int(-3, 6) };
        if (tier === 2) return r < 0.3 ? { k: "x", a: rng.int(-5, 5) } : r < 0.6 ? { k: "y", a: rng.int(-5, 5) } : r < 0.8 ? { k: "yx" } : { k: "ynx" };
        const half = (2 * rng.int(-4, 4) + 1) / 2;
        return r < 0.3 ? { k: "x", a: half } : r < 0.6 ? { k: "y", a: half } : r < 0.8 ? { k: "yx" } : { k: "ynx" };
      };
      const tri = tier >= 2 && rng.bool();
      let m: Mirror = { k: "x", a: 2 };
      let A: P2[] = [[-1, 3], [-3, 3], [-1, 6]];
      for (let i = 0; i < 200; i++) {
        const mm = pickM();
        let pts: P2[];
        if (tri) {
          const t = orient(rng, rng.pick(TRIS));
          const anc: P2 = [rng.int(-7, 4), rng.int(-7, 4)];
          pts = t.map((p) => add(p, anc));
        } else {
          pts = [tier === 1 ? [rng.int(-2, 9), rng.int(-2, 9)] : [rng.int(-8, 8), rng.int(-8, 8)]];
        }
        if (pts.some((p) => onMirror(mm, p))) continue;
        const imgs = pts.map((p) => reflectP(mm, p));
        if (imgs.some((p) => Math.abs(p[0]) > 14 || Math.abs(p[1]) > 14)) continue;
        m = mm;
        A = pts;
        break;
      }
      if (!tri) A = [A[0]];
      const B = A.map((p) => reflectP(m, p));
      const P = A[0];
      const Q = B[0];

      // Accepted answers (text) — ASCII minus, spacing is ignored by the checker.
      let accept: string[];
      const traps: Trap[] = [];
      if (m.k === "x" || m.k === "y") {
        const v = m.k;
        const other = v === "x" ? "y" : "x";
        const a = m.a;
        accept = [`${v} = ${ascii(a)}`, `${ascii(a)} = ${v}`];
        if (!Number.isInteger(a)) {
          const h = Math.round(2 * a);
          const w = Math.floor(Math.abs(a));
          accept.push(`${v} = ${h}/2`);
          if (w >= 1) accept.push(`${v} = ${a < 0 ? "-" : ""}${w} 1/2`);
        }
        if (a === 0) accept.push(`${other}-axis`, `the ${other}-axis`, `${other} axis`, `the ${other} axis`);
        traps.push({ spec: textSpec([`${other} = ${ascii(a)}`]), feedback: `${other} = ${num(a)} is ${other === "y" ? "a horizontal" : "a vertical"} line. The point and its image share the same ${other}-coordinate, so the mirror between them is ${v === "x" ? "vertical" : "horizontal"}: ${v} = …` });
        const i = v === "x" ? 0 : 1;
        const hd = clean(Math.abs(Q[i] - P[i]) / 2);
        if (hd !== a) traps.push({ spec: textSpec([`${v} = ${ascii(hd)}`]), feedback: "That's half the distance between the point and its image. The mirror line goes through their midpoint: add the coordinates and halve." });
      } else if (m.k === "yx") {
        accept = ["y = x", "x = y", "y = 1x"];
        traps.push({ spec: textSpec(["y = -x"]), feedback: "Reflecting in y = −x swaps the coordinates AND changes both signs. Here they only swap." });
      } else {
        accept = ["y = -x", "x = -y", "y = -1x", "x + y = 0", "y + x = 0", "-x = y"];
        traps.push({ spec: textSpec(["y = x"]), feedback: "Reflecting in y = x only swaps the coordinates. Here they also change sign, so the mirror is the other diagonal." });
      }
      const display = m.k === "x" && m.a === 0 ? "x = 0 (the y-axis)" : m.k === "y" && m.a === 0 ? "y = 0 (the x-axis)" : mirrorEqn(m);

      const mid: P2 = [clean((P[0] + Q[0]) / 2), clean((P[1] + Q[1]) / 2)];
      let steps: string[];
      if (m.k === "x") {
        steps = [
          `${pt(P)} and ${pt(Q)} have the same y-coordinate, so the mirror line is vertical: x = something.`,
          `It is halfway between them: (${num(P[0])} + ${br(Q[0])}) ÷ 2 = ${num(m.a)}.`,
          `The mirror line is x = ${num(m.a)}.`,
        ];
      } else if (m.k === "y") {
        steps = [
          `${pt(P)} and ${pt(Q)} have the same x-coordinate, so the mirror line is horizontal: y = something.`,
          `It is halfway between them: (${num(P[1])} + ${br(Q[1])}) ÷ 2 = ${num(m.a)}.`,
          `The mirror line is y = ${num(m.a)}.`,
        ];
      } else if (m.k === "yx") {
        steps = [
          `The coordinates have swapped places: ${pt(P)} → ${pt(Q)}. Swapping x and y is exactly what a reflection in y = x does.`,
          `Check: the midpoint of the two points is ${pt(mid)}, which lies on y = x ✓.`,
          `The mirror line is y = x.`,
        ];
      } else {
        steps = [
          `The coordinates have swapped places AND both changed sign: ${pt(P)} → ${pt(Q)}. That is what a reflection in y = −x does.`,
          `Check: the midpoint of the two points is ${pt(mid)}, which lies on y = −x ✓.`,
          `The mirror line is y = −x.`,
        ];
      }
      if (tri) steps.splice(steps.length - 1, 0, `Check with another pair: ${pt(A[1])} → ${pt(B[1])} works with the same mirror ✓.`);
      const ask = "Find the equation of the mirror line. Type its equation (for example y = 4, x = −1 or y = x).";
      const prompt = tri
        ? `Triangle A has vertices ${listPts(A)}. It is reflected to give triangle B with vertices ${listPts(B)} (in matching order). ${ask}`
        : rng.pick([`Under a reflection, the point A${pt(P)} maps to A′${pt(Q)}. ${ask}`, `${rng.pick(NAMES)} reflects the point ${pt(P)} and it lands on ${pt(Q)}. ${ask}`]);
      return {
        prompt,
        answer: textSpec(accept, display),
        solution: steps,
        hint: "The mirror line passes through the midpoint of a point and its image. Is it vertical, horizontal or diagonal?",
        traps,
      };
    },
  },

  // ------------------------------------------------------------ rotation about the origin (L2)
  {
    id: `${TOPIC}.rotate-about-the-origin`,
    topicId: TOPIC,
    title: "Rotate a point about the origin",
    level: 2,
    guideRef: "rotation",
    generate(rng, tier) {
      const mode = tier === 3 ? rng.pick(["basic", "270", "twice"] as const) : "basic";
      let P: P2 = [3, 1];
      for (let i = 0; i < 100; i++) {
        const Q: P2 = tier === 1 ? [rng.int(1, 6), rng.int(1, 6)] : [rng.int(-8, 8), rng.int(-8, 8)];
        if (isZero(Q)) continue;
        if (tier > 1 && Q[0] > 0 && Q[1] > 0 && rng.bool(0.7)) continue; // mostly use negatives beyond tier 1
        P = Q;
        break;
      }
      const name = rng.pick(NAMES);
      const ruleSteps = (q: number, from: P2): string[] => {
        const img = rotQ(q, from);
        return [`A rotation of ${TURN_TEXT[q]} about the origin follows the rule ${TURN_RULE[q]}.`, `So ${pt(from)} → ${pt(img)}.`];
      };
      const swapTrap: [P2, string] = [[P[1], P[0]], "Swapping the coordinates on their own is a reflection in y = x — for a quarter-turn, one coordinate must also change sign."];

      if (mode === "270") {
        const q = rng.pick([1, 3]);
        const phrase = q === 1 ? "270° clockwise" : "270° anticlockwise";
        const ans = rotQ(q, P);
        return {
          prompt: `Rotate the point P${pt(P)} through ${phrase} about the origin. Give the coordinates of the image P′ as (x, y).`,
          answer: coordSpec(ans),
          solution: [`A turn of ${phrase} ends in the same place as ${TURN_TEXT[q]} (because 270° + 90° = 360°).`, ...ruleSteps(q, P)],
          hint: "Three quarter-turns one way end up in the same place as one quarter-turn the other way.",
          traps: pairTraps(ans, [[rotQ(4 - q, P), "That's a 90° turn in the direction given. 270° one way is the same as 90° the OTHER way."], swapTrap]),
        };
      }
      if (mode === "twice") {
        let q1 = 3;
        let q2 = 2;
        for (let i = 0; i < 50; i++) {
          q1 = rng.pick([1, 2, 3]);
          q2 = rng.pick([1, 2, 3]);
          if ((q1 + q2) % 4 !== 0) break;
          q1 = 3;
          q2 = 2;
        }
        const t = (q1 + q2) % 4;
        const signed = (q: number): number => (q === 3 ? -1 : q);
        const sum = signed(q1) + signed(q2);
        const ans = rotQ(t, P);
        return {
          prompt: `The point P${pt(P)} is rotated ${TURN_TEXT[q1]} about the origin. Its image is then rotated ${TURN_TEXT[q2]} about the origin. Give the coordinates of the final image as (x, y).`,
          answer: coordSpec(ans),
          solution: [
            `Count quarter-turns: anticlockwise = +1, clockwise = −1, a half-turn = 2. Total: ${signed(q1)} + ${br(signed(q2))} = ${sum}, which is the same as one rotation of ${TURN_TEXT[t]}.`,
            ...ruleSteps(t, P),
            `(Or do it in two steps: ${pt(P)} → ${pt(rotQ(q1, P))} → ${pt(ans)}.)`,
          ],
          hint: "Either do one rotation at a time, or first combine the two turns into a single turn.",
          traps: pairTraps(ans, [[rotQ(q1, P), "That's after the first rotation only — now apply the second rotation to that image."]]),
        };
      }
      const q = rng.pick([1, 2, 3]);
      const ans = rotQ(q, P);
      const prompt = rng.pick([
        `Rotate the point P${pt(P)} through ${TURN_TEXT[q]} about the origin. Give the coordinates of the image P′ as (x, y).`,
        `The point ${pt(P)} is rotated ${TURN_TEXT[q]} about (0, 0). Where does it land? Give the coordinates as (x, y).`,
        `In ${name}'s computer game, a spaceship at ${pt(P)} is rotated ${TURN_TEXT[q]} about the origin. Where does it end up? Give the coordinates as (x, y).`,
      ]);
      const cands: Array<[P2, string]> =
        q === 2
          ? ([
              [[z(-P[0]), P[1]], "Only one sign changed — that's a reflection in the y-axis. A half-turn changes both signs."],
              [[P[0], z(-P[1])], "Only one sign changed — that's a reflection in the x-axis. A half-turn changes both signs."],
            ] as Array<[P2, string]>).filter(([c]) => !same(c, P))
          : [[rotQ(4 - q, P), q === 1 ? "That's 90° clockwise. Anticlockwise turns the opposite way to clock hands." : "That's 90° anticlockwise. Clockwise turns the same way as clock hands."], swapTrap];
      return {
        prompt,
        answer: coordSpec(ans),
        solution: [
          ...ruleSteps(q, P),
          q === 2
            ? `Check: the origin is the midpoint of ${pt(P)} and ${pt(ans)} ✓.`
            : `Check: the step from O was across ${num(P[0])}, up ${num(P[1])}; after the turn it is across ${num(ans[0])}, up ${num(ans[1])} — the same staircase, turned a quarter-turn ✓.`,
        ],
        hint: "Sketch the point and the line from the origin to it, then turn that line. Or use the rule for this turn.",
        traps: pairTraps(ans, cands),
      };
    },
  },

  // ------------------------------------------------------------ enlarge a point (L2)
  {
    id: `${TOPIC}.enlarge-from-a-centre`,
    topicId: TOPIC,
    title: "Enlarge a point from a centre of enlargement",
    level: 2,
    guideRef: "enlargement",
    generate(rng, tier) {
      const halfK = tier === 3 && rng.bool(0.35);
      let k = 2;
      let C: P2 = [1, 1];
      let d: P2 = [2, 1];
      for (let i = 0; i < 200; i++) {
        let kk: number;
        let CC: P2;
        let dd: P2;
        if (halfK) {
          kk = 0.5;
          CC = [rng.int(-5, 5), rng.int(-5, 5)];
          dd = [2 * rng.int(-4, 4), 2 * rng.int(-4, 4)];
        } else if (tier === 1) {
          kk = rng.pick([2, 3]);
          CC = rng.bool() ? [0, 0] : [rng.int(0, 3), rng.int(0, 3)];
          dd = [rng.int(0, 4), rng.int(0, 4)];
        } else {
          kk = tier === 2 ? rng.pick([2, 3, 4]) : rng.pick([3, 4, 5]);
          CC = [rng.int(-4, 4), rng.int(-4, 4)];
          dd = [rng.int(-4, 4), rng.int(-4, 4)];
        }
        if (isZero(dd)) continue;
        const img = add(CC, scale(kk, dd));
        if (Math.abs(img[0]) > 20 || Math.abs(img[1]) > 20) continue;
        k = kk;
        C = CC;
        d = dd;
        break;
      }
      const P = add(C, d);
      const kd = scale(k, d);
      const ans = add(C, kd);
      const kTxt = k === 0.5 ? "{{1/2}}" : String(k);
      const centreTxt = isZero(C) ? "the origin" : pt(C);
      const prompt = rng.pick([
        `Enlarge the point P${pt(P)} by scale factor ${kTxt} with centre of enlargement ${centreTxt}. Give the coordinates of the image P′ as (x, y).`,
        `Triangle T has a vertex at ${pt(P)}. T is enlarged by scale factor ${kTxt}, centre ${pt(C)}. Where does this vertex end up? Give the coordinates as (x, y).`,
      ]);
      const cands: Array<[P2, string]> = [
        [scale(k, P), "You multiplied the coordinates of the point — that only works when the centre is the origin. Multiply the step from the centre instead."],
        [add(P, kd), "You measured the enlarged step from the point itself. Measure it from the centre of enlargement."],
      ];
      if (k === 0.5) cands.push([add(C, scale(2, d)), "A scale factor of {{1/2}} makes the step from the centre HALF as long, not twice as long."]);
      return {
        prompt,
        answer: coordSpec(ans),
        solution: [
          `Step from the centre ${pt(C)} to the point ${pt(P)}: across ${num(d[0])}, up ${num(d[1])}.`,
          `Multiply the step by ${kTxt}: across ${num(kd[0])}, up ${num(kd[1])}.`,
          `Add it to the centre: (${num(C[0])} + ${br(kd[0])}, ${num(C[1])} + ${br(kd[1])}) = ${pt(ans)}.`,
          `Check: the image is on the same ray from the centre as the original point, ${k === 0.5 ? "half as far away" : `${k} times as far away`} ✓.`,
        ],
        hint: "Work in steps from the centre: how far across and up is P from the centre? Multiply that step by the scale factor.",
        traps: pairTraps(ans, cands),
      };
    },
  },

  // ------------------------------------------------------------ describing / congruence (L2)
  {
    id: `${TOPIC}.name-the-transformation`,
    topicId: TOPIC,
    title: "Identify the transformation; congruent or similar?",
    level: 2,
    guideRef: "describing-transformations",
    generate(rng, tier) {
      if (rng.bool(0.4)) {
        // ---- Congruent, similar or neither, from side lengths (all lengths stored doubled, as integers).
        const BASE: Array<[number, number, number]> = [[3, 4, 5], [4, 5, 6], [5, 6, 8], [6, 7, 9], [2, 3, 4], [5, 5, 8], [4, 6, 7], [7, 8, 10], [5, 7, 9], [3, 5, 7]];
        const kind = rng.pick(["congruent", "similar", "neither"] as const);
        const ks2 = tier === 1 ? [4, 6] : tier === 2 ? [3, 4, 5, 6] : [1, 3, 5, 8]; // k × 2
        let A = BASE[0];
        let B2: number[] = [6, 8, 10];
        let k2 = 4;
        for (let i = 0; i < 100; i++) {
          A = rng.pick(BASE);
          k2 = rng.pick(ks2);
          const A2 = A.map((x) => 2 * x);
          let cand: number[];
          if (kind === "congruent") cand = A2;
          else if (kind === "similar") cand = A.map((x) => k2 * x);
          else if (rng.bool()) {
            const delta = rng.pick([-2, 2]); // ±1 cm on the longest side
            cand = [k2 * A[0], k2 * A[1], k2 * A[2] + delta];
          } else cand = [A2[0], A2[1], A2[2] + 2];
          const s = [...cand].sort((x, y) => x - y);
          if (s[0] + s[1] <= s[2] || s[0] <= 0) continue; // must be a real triangle
          const sa = [...A2].sort((x, y) => x - y);
          const similar = s.every((x, j) => x * sa[0] === sa[j] * s[0]);
          const congruent = s.every((x, j) => x === sa[j]);
          if (kind === "neither" && (similar || congruent)) continue;
          if (kind === "similar" && congruent) continue;
          B2 = cand;
          break;
        }
        if (kind === "similar" && B2.length === 3 && B2.every((x, j) => x === 2 * A[j])) B2 = A.map((x) => 4 * x);
        const Bshow = rng.shuffle(B2.map((x) => clean(x / 2)));
        const sa = [...A].sort((x, y) => x - y);
        const sb = [...Bshow].sort((x, y) => x - y);
        const ratios = sb.map((b, j) => frac(Math.round(2 * b), 2 * sa[j]));
        const [thing, things] = rng.pick([["triangle", "triangles"], ["triangular sail", "sails"], ["triangular flag", "flags"], ["triangular garden bed", "garden beds"]] as const);
        const prompt = `${cap(thing)} P has sides ${sa[0]} cm, ${sa[1]} cm and ${sa[2]} cm. ${cap(thing)} Q has sides ${num(Bshow[0])} cm, ${num(Bshow[1])} cm and ${num(Bshow[2])} cm. Which best describes the two ${things}: congruent, similar (but not congruent), or neither? Type congruent, similar or neither.`;
        const order = `Put both sets of sides in order. P: ${sa.join(", ")}. Q: ${sb.map(num).join(", ")}.`;
        const ratioLine = `Divide each side of Q by the matching side of P: ${ratios.join(", ")}.`;
        if (kind === "congruent") {
          return {
            prompt,
            answer: textSpec(["congruent", "they are congruent", "congruent triangles"], "congruent"),
            solution: [order, `The matching sides are exactly equal, so the ${things} are the same shape AND the same size.`, `They are congruent.`],
            hint: "Sort each set of side lengths from shortest to longest, then compare them pair by pair.",
            traps: [{ spec: textSpec(["similar"]), feedback: "They are similar, but they are also exactly the same size — so the best description is congruent." }],
          };
        }
        if (kind === "similar") {
          return {
            prompt,
            answer: textSpec(["similar", "similar but not congruent", "similar (but not congruent)", "similar not congruent", "they are similar"], "similar"),
            solution: [order, ratioLine, `Every ratio is the same, so Q is an enlargement of P with scale factor ${ratios[0]}: similar, but not congruent because the sizes differ.`],
            hint: "Sort the sides, then divide each side of Q by the matching side of P. Are all the answers the same?",
            traps: [{ spec: textSpec(["congruent"]), feedback: "Congruent shapes must be the same size. These sides are all in the same ratio, but not equal." }],
          };
        }
        return {
          prompt,
          answer: textSpec(["neither", "neither congruent nor similar", "not similar", "none"], "neither"),
          solution: [order, ratioLine, `The ratios are not all equal, so Q is not an enlargement of P. The ${things} are neither congruent nor similar.`],
          hint: "Sort the sides, then divide each side of Q by the matching side of P. Similar shapes need ALL the ratios to be equal.",
          traps: [{ spec: textSpec(["similar"]), feedback: "Check every pair of matching sides: for similar shapes ALL the ratios must be equal, not just some of them." }],
        };
      }

      // ---- Which transformation maps A onto B?
      const kinds = ["translation", "reflection", "rotation", "enlargement"] as const;
      const kind = rng.pick(kinds);
      const win: Win = { x0: -8, x1: 8, y0: -8, y1: 8 };
      let A: P2[] = [[-6, 1], [-3, 1], [-6, 3]];
      let B: P2[] = A.map((p) => add(p, [8, -4]));
      let detail = "a translation by the column vector (8 over −4)";
      let centre: P2 = [0, 0];
      let k = 2;
      let found = false;
      for (let i = 0; i < 300 && !found; i++) {
        const t = orient(rng, rng.pick(TRIS));
        const anc: P2 = [rng.int(-7, 5), rng.int(-7, 5)];
        let AA = t.map((p) => add(p, anc));
        let BB: P2[];
        let det: string;
        if (kind === "translation") {
          const v: P2 = [rng.int(-9, 9), rng.int(-9, 9)];
          if (isZero(v)) continue;
          BB = AA.map((p) => add(p, v));
          det = `a translation by the column vector ${vec(v)}`;
        } else if (kind === "reflection") {
          const r = rng.next();
          const mm: Mirror =
            tier === 1
              ? r < 0.5 ? { k: "x", a: rng.int(-2, 2) } : { k: "y", a: rng.int(-2, 2) }
              : r < 0.3 ? { k: "x", a: rng.int(-3, 3) } : r < 0.6 ? { k: "y", a: rng.int(-3, 3) } : r < 0.8 ? { k: "yx" } : { k: "ynx" };
          BB = AA.map((p) => reflectP(mm, p));
          det = `a reflection in the line ${mirrorEqn(mm)}`;
        } else if (kind === "rotation") {
          const q = rng.pick([1, 2, 3]);
          const C: P2 = tier === 1 ? [0, 0] : [rng.int(-3, 3), rng.int(-3, 3)];
          BB = AA.map((p) => add(C, rotQ(q, sub(p, C))));
          det = `a rotation of ${TURN_TEXT[q]} about ${pt(C)}`;
          centre = C;
        } else {
          // Place A a small step from the centre (all vertices in one quadrant from C) so B fits on the grid.
          const kk = tier === 3 ? rng.pick([2, 3]) : 2;
          const C: P2 = [rng.int(-7, 7), rng.int(-7, 7)];
          const off: P2 = [rng.int(0, 3), rng.int(0, 3)];
          if (isZero(off)) continue;
          const sx = rng.bool() ? 1 : -1;
          const sy = rng.bool() ? 1 : -1;
          AA = t.map((p): P2 => add(C, [z(sx * (off[0] + p[0])), z(sy * (off[1] + p[1]))]));
          BB = AA.map((p) => add(C, scale(kk, sub(p, C))));
          det = `an enlargement, scale factor ${kk}, centre ${pt(C)}`;
          centre = C;
          k = kk;
        }
        const inner: Win = { x0: win.x0 + 1, x1: win.x1 - 1, y0: win.y0 + 1, y1: win.y1 - 1 };
        if (!inWin(AA, inner) || !inWin(BB, inner) || !apart(AA, BB)) continue;
        A = AA;
        B = BB;
        detail = det;
        found = true;
      }
      if (!found) {
        // Safe fallbacks (checked by hand), one per kind.
        A = [[-6, 1], [-3, 1], [-6, 3]];
        if (kind === "translation") {
          B = A.map((p) => add(p, [8, -4]));
          detail = "a translation by the column vector (8 over −4)";
        } else if (kind === "reflection") {
          B = A.map((p) => reflectP({ k: "x", a: 0 }, p));
          detail = "a reflection in the line x = 0";
        } else if (kind === "rotation") {
          centre = [0, 0];
          B = A.map((p) => rotQ(2, p));
          detail = "a rotation of 180° about (0, 0)";
        } else {
          centre = [-7, 0];
          k = 2;
          A = [[-5, 1], [-3, 1], [-5, 3]];
          B = A.map((p) => add(centre, scale(2, sub(p, centre))));
          detail = "an enlargement, scale factor 2, centre (−7, 0)";
        }
      }
      const prompt = `The diagram shows triangle A and its image, triangle B. A has vertices ${listPts(A)}; B has vertices ${listPts(B)} (in matching order). Which single transformation maps A onto B? Type one word: translation, reflection, rotation or enlargement.`;
      const diagram = gridSvg(win, [{ pts: A, fill: "#c7d2fe", label: "A" }, { pts: B, fill: "#fde68a", label: "B" }], `Coordinate grid showing triangle A with vertices ${listPts(A)} and triangle B with vertices ${listPts(B)}`);
      const lenA = Math.abs(A[1][0] - A[0][0]) + Math.abs(A[1][1] - A[0][1]);
      const lenB = Math.abs(B[1][0] - B[0][0]) + Math.abs(B[1][1] - B[0][1]);
      const sizeLine = `Side ${pt(A[0])} to ${pt(A[1])} has length ${lenA}; the matching side of B has length ${lenB}.`;
      const hint = "Same size or not? If the same size: has B just slid, been flipped over (a mirror image), or been turned?";
      if (kind === "translation") {
        const v = sub(B[0], A[0]);
        return {
          prompt,
          diagram,
          answer: textSpec(["translation", "a translation", "translate"], "translation"),
          solution: [sizeLine, `Every vertex moves by the same column vector ${vec(v)} — for example ${pt(A[0])} → ${pt(B[0])} — so B faces exactly the same way as A.`, `It is a translation. Fully described: ${detail}.`],
          hint,
          traps: [{ spec: textSpec(["rotation"]), feedback: "B faces exactly the same way as A — nothing has turned. Every vertex has moved by the same amount." }],
        };
      }
      if (kind === "reflection") {
        return {
          prompt,
          diagram,
          answer: textSpec(["reflection", "a reflection", "reflect"], "reflection"),
          solution: [
            `${sizeLine} Same size, so it is a translation, reflection or rotation.`,
            `Go round the vertices in matching order: A goes ${sense(A)} but B goes ${sense(B)}. B is a mirror image of A, and only a reflection flips a shape over.`,
            `It is a reflection. Fully described: ${detail}.`,
          ],
          hint,
          traps: [{ spec: textSpec(["rotation"]), feedback: "Check the order of the vertices: B is a mirror image of A (flipped over). Turning can never flip a shape." }],
        };
      }
      if (kind === "rotation") {
        return {
          prompt,
          diagram,
          answer: textSpec(["rotation", "a rotation", "rotate"], "rotation"),
          solution: [
            `${sizeLine} Same size, so it is a translation, reflection or rotation.`,
            `Going round the vertices in matching order, A and B both go ${sense(A)}, so B has not been flipped. But the side from ${pt(A[0])} to ${pt(A[1])} has become the side from ${pt(B[0])} to ${pt(B[1])}, which points a different way, so B has been turned.`,
            `It is a rotation. Fully described: ${detail}.`,
          ],
          hint,
          traps: [{ spec: textSpec(["reflection"]), feedback: "Trace A and turn the tracing paper — it fits onto B without flipping over, so this is not a reflection." }],
        };
      }
      return {
        prompt,
        diagram,
        answer: textSpec(["enlargement", "an enlargement", "enlarge"], "enlargement"),
        solution: [sizeLine, `B is ${k} times as big as A (the angles stay the same). Only an enlargement changes the size, so B is similar to A but not congruent.`, `It is an enlargement. Fully described: ${detail}.`],
        hint,
        traps: [{ spec: textSpec(["translation"]), feedback: "B is bigger than A. A translation never changes size — only an enlargement does." }],
      };
    },
  },

  // ------------------------------------------------------------ rotation about a centre (L3)
  {
    id: `${TOPIC}.rotate-about-a-centre`,
    topicId: TOPIC,
    title: "Rotate about a centre, and find the centre of a half-turn",
    level: 3,
    guideRef: "rotation",
    generate(rng, tier) {
      const findCentre = rng.bool(0.35);
      if (findCentre) {
        // P and its image P′ under a half-turn about C; C = midpoint. Work with c2 = 2C to stay in integers.
        const tri = tier >= 2 && rng.bool();
        let c2: P2 = [6, 4];
        let A: P2[] = [[1, 2], [3, 2], [1, 3]];
        for (let i = 0; i < 200; i++) {
          const cc: P2 = tier === 3 ? [rng.int(-8, 8), rng.int(-8, 8)] : tier === 1 ? [2 * rng.int(0, 5), 2 * rng.int(0, 5)] : [2 * rng.int(-4, 4), 2 * rng.int(-4, 4)];
          let pts: P2[];
          if (tri) {
            const t = orient(rng, rng.pick(TRIS));
            const anc: P2 = [rng.int(-8, 6), rng.int(-8, 6)];
            pts = t.map((p) => add(p, anc));
          } else pts = [tier === 1 ? [rng.int(0, 9), rng.int(0, 9)] : [rng.int(-8, 8), rng.int(-8, 8)]];
          if (pts.some((p) => p[0] * 2 === cc[0] && p[1] * 2 === cc[1])) continue; // a vertex at the centre
          const imgs = pts.map((p) => sub(cc, p));
          if (imgs.some((p) => Math.abs(p[0]) > 14 || Math.abs(p[1]) > 14)) continue;
          if (tier === 3 && cc[0] % 2 === 0 && cc[1] % 2 === 0 && rng.bool(0.6)) continue; // prefer a half-unit centre
          c2 = cc;
          A = pts;
          break;
        }
        if (!tri) A = [A[0]];
        const B = A.map((p) => sub(c2, p));
        const C: P2 = [clean(c2[0] / 2), clean(c2[1] / 2)];
        const P = A[0];
        const Q = B[0];
        const prompt = tri
          ? `Triangle A has vertices ${listPts(A)}. A rotation of 180° maps it onto triangle B with vertices ${listPts(B)} (in matching order). Find the centre of rotation. Give the coordinates as (x, y).`
          : `A rotation of 180° maps the point P${pt(P)} onto P′${pt(Q)}. Find the centre of rotation. Give the coordinates as (x, y).`;
        const steps = [
          `In a half-turn, the centre is exactly halfway between each point and its image.`,
          `Midpoint of ${pt(P)} and ${pt(Q)}: ((${num(P[0])} + ${br(Q[0])}) ÷ 2, (${num(P[1])} + ${br(Q[1])}) ÷ 2) = ${pt(C)}.`,
        ];
        if (tri) steps.push(`Check with another pair: the midpoint of ${pt(A[1])} and ${pt(B[1])} is also ${pt(C)} ✓.`);
        else steps.push(`Check: the step from the centre to P is across ${num(clean(P[0] - C[0]))}, up ${num(clean(P[1] - C[1]))}, and the step to P′ is exactly the opposite ✓.`);
        return {
          prompt,
          answer: coordSpec(C),
          solution: steps,
          hint: "After a half-turn, the centre sits exactly halfway between a point and its image.",
          traps: pairTraps(C, [
            [[clean((Q[0] - P[0]) / 2), clean((Q[1] - P[1]) / 2)], "That's half the step from P to P′. The centre is the midpoint: add the coordinates, then halve."],
            [[z(P[0] + Q[0]), z(P[1] + Q[1])], "You added the coordinates but forgot to halve them."],
          ]),
        };
      }
      // Rotate P about C.
      const say270 = tier === 3 && rng.bool(0.4);
      let C: P2 = [2, 1];
      let d: P2 = [3, 1];
      for (let i = 0; i < 100; i++) {
        const cc: P2 = tier === 1 ? [rng.int(1, 4), rng.int(1, 4)] : [rng.int(-4, 4), rng.int(-4, 4)];
        const dd: P2 = tier === 1 ? [rng.int(0, 4), rng.int(0, 4)] : [rng.int(-5, 5), rng.int(-5, 5)];
        if (isZero(cc) || isZero(dd)) continue;
        C = cc;
        d = dd;
        break;
      }
      const q = say270 ? rng.pick([1, 3]) : rng.pick([1, 2, 3]);
      const phrase = say270 ? (q === 1 ? "270° clockwise" : "270° anticlockwise") : TURN_TEXT[q];
      const P = add(C, d);
      const s = rotQ(q, d);
      const ans = add(C, s);
      const prompt = rng.pick([
        `Rotate the point P${pt(P)} through ${phrase} about the centre C${pt(C)}. Give the coordinates of the image P′ as (x, y).`,
        `Triangle T has a vertex at ${pt(P)}. T is rotated ${phrase} about the point ${pt(C)}. Where does this vertex land? Give the coordinates as (x, y).`,
      ]);
      const steps = [`Step from the centre ${pt(C)} to the point ${pt(P)}: across ${num(d[0])}, up ${num(d[1])}.`];
      if (say270) steps.push(`${cap(phrase)} ends in the same place as ${TURN_TEXT[q]}.`);
      steps.push(
        `Turn the step ${TURN_TEXT[q]} using ${TURN_RULE[q]}: across ${num(s[0])}, up ${num(s[1])}.`,
        `Add the turned step to the centre: (${num(C[0])} + ${br(s[0])}, ${num(C[1])} + ${br(s[1])}) = ${pt(ans)}.`,
      );
      const cands: Array<[P2, string]> = [[rotQ(q, P), "You rotated about the origin. Use the step from the centre instead, turn it, then add it back on to the centre."]];
      if (q !== 2) cands.push([add(C, rotQ(4 - q, d)), say270 ? "270° one way ends where 90° the OTHER way does — check the direction." : "Check the direction — that's the turn the other way."]);
      return {
        prompt,
        answer: coordSpec(ans),
        solution: steps,
        hint: "Find the step from the centre to the point (across, up). Turn that step, then add it back on to the centre.",
        traps: pairTraps(ans, cands),
      };
    },
  },

  // ------------------------------------------------------------ centre of enlargement (L3)
  {
    id: `${TOPIC}.find-the-centre-of-enlargement`,
    topicId: TOPIC,
    title: "Find the centre of an enlargement",
    level: 3,
    guideRef: "enlargement",
    generate(rng, tier) {
      const ks = tier === 1 ? [2] : tier === 2 ? [2, 3] : [2, 3, 4];
      // Tier 1 stays in the first quadrant; otherwise every coordinate is between −12 and 12.
      const [lo, hi] = tier === 1 ? [0, 14] : [-12, 12];
      let k = 2;
      let C: P2 = [0, 0];
      let A: P2[] = [[3, 1], [5, 1], [3, 3]];
      for (let i = 0; i < 400; i++) {
        const kk = rng.pick(ks);
        const cc: P2 = tier === 1 ? [rng.int(0, 3), rng.int(0, 3)] : [rng.int(-6, 6), rng.int(-6, 6)];
        const tt = orient(rng, rng.pick(TRIS));
        const off: P2 = [rng.int(0, 4), rng.int(0, 4)];
        if (isZero(off)) continue;
        const sx = tier === 1 || rng.bool() ? 1 : -1;
        const sy = tier === 1 || rng.bool() ? 1 : -1;
        // Every vertex is in one quadrant relative to the centre, so the centre is outside the triangle.
        const AA = tt.map((p): P2 => add(cc, [z(sx * (off[0] + p[0])), z(sy * (off[1] + p[1]))]));
        const BB = AA.map((p) => add(cc, scale(kk, sub(p, cc))));
        if (!apart(AA, BB)) continue;
        const all = [...AA, ...BB, cc];
        const bb = bbox(all);
        if (bb.x1 - bb.x0 > 16 || bb.y1 - bb.y0 > 13 || bb.x0 < lo || bb.y0 < lo || bb.x1 > hi || bb.y1 > hi) continue;
        k = kk;
        C = cc;
        A = AA;
        break;
      }
      const B = A.map((p) => add(C, scale(k, sub(p, C))));
      const bb = bbox([...A, ...B, C]);
      const win: Win = { x0: bb.x0 - 1, x1: bb.x1 + 1, y0: bb.y0 - 1, y1: bb.y1 + 1 };
      const step = sub(B[0], A[0]); // = (k − 1) × (A − C)
      const back = scale(1 / (k - 1), step);
      const lenA = Math.abs(A[1][0] - A[0][0]) + Math.abs(A[1][1] - A[0][1]);
      const fromC1 = sub(A[1], C);
      const steps = [
        `Scale factor: side ${pt(A[0])} to ${pt(A[1])} has length ${lenA}, and the matching side of B has length ${k * lenA}, so the scale factor is ${k}.`,
        k === 2
          ? `From the centre, B's vertices are twice as far away as A's, so the step from ${pt(A[0])} to ${pt(B[0])} (across ${num(step[0])}, up ${num(step[1])}) equals the step from the centre to ${pt(A[0])}.`
          : `From the centre, B's vertices are ${k} times as far away as A's, so the step from ${pt(A[0])} to ${pt(B[0])} (across ${num(step[0])}, up ${num(step[1])}) is ${k} − 1 = ${k - 1} times the step from the centre to ${pt(A[0])}. That step is across ${num(back[0])}, up ${num(back[1])}.`,
        `Go back that step from ${pt(A[0])}: (${num(A[0][0])} − ${br(back[0])}, ${num(A[0][1])} − ${br(back[1])}) = ${pt(C)}.`,
        `Check with another vertex: from ${pt(C)} to ${pt(A[1])} is across ${num(fromC1[0])}, up ${num(fromC1[1])}; ${k} times that is across ${num(k * fromC1[0])}, up ${num(k * fromC1[1])}, which lands on ${pt(B[1])} ✓.`,
      ];
      return {
        prompt: `Triangle B is an enlargement of triangle A. A has vertices ${listPts(A)}; B has vertices ${listPts(B)} (in matching order). Find the centre of enlargement. Give the coordinates as (x, y).`,
        diagram: gridSvg(win, [{ pts: A, fill: "#c7d2fe", label: "A" }, { pts: B, fill: "#fde68a", label: "B" }], `Coordinate grid showing triangle A with vertices ${listPts(A)} and its enlargement, triangle B, with vertices ${listPts(B)}`),
        answer: coordSpec(C),
        solution: steps,
        hint: "Draw a ray line from a vertex of B through the matching vertex of A and keep going. Do the same for a second pair: where do the lines meet?",
        traps: pairTraps(C, [
          [[clean((A[0][0] + B[0][0]) / 2), clean((A[0][1] + B[0][1]) / 2)], "The centre is not halfway between the triangles. The ray lines carry on past A until they meet."],
          [sub(A[0], step), "That assumes the scale factor is 2. Find the scale factor first by comparing matching sides."],
        ]),
      };
    },
  },

  // ------------------------------------------------------------ Pythagoras (stretch, L3)
  {
    id: `${TOPIC}.pythagoras-missing-side`,
    topicId: TOPIC,
    title: "Pythagoras' theorem: find a missing side",
    level: 3,
    guideRef: "pythagoras",
    generate(rng, tier) {
      const isSq = (n: number): boolean => Number.isInteger(Math.sqrt(n));
      const trunc3 = (x: number): string => num(clean(Math.floor(x * 1000) / 1000));
      const name = rng.pick(NAMES);

      if (tier === 1) {
        const TRIPLES: Array<[number, number, number]> = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [9, 40, 41]];
        let t = TRIPLES[0];
        let m = 1;
        for (let i = 0; i < 50; i++) {
          t = rng.pick(TRIPLES);
          m = rng.int(1, t[2] > 20 ? 1 : t[2] > 10 ? 2 : 5);
          if (t[2] * m <= 45) break;
        }
        const [a0, b0] = rng.bool() ? [t[0] * m, t[1] * m] : [t[1] * m, t[0] * m];
        const c = t[2] * m;
        if (rng.bool(0.55)) {
          const s = a0 * a0 + b0 * b0;
          const prompt = rng.pick([
            `A right-angled triangle has shorter sides of ${a0} cm and ${b0} cm. Work out the length of the hypotenuse, in cm.`,
            `In triangle PQR, angle Q = 90°, PQ = ${a0} cm and QR = ${b0} cm. Work out the length of PR, in cm.`,
          ]);
          return {
            prompt,
            answer: { type: "number", value: c },
            solution: [
              `The hypotenuse is the unknown, so add the squares: {{c^2 = ${a0}^2 + ${b0}^2 = ${a0 * a0} + ${b0 * b0} = ${s}}}.`,
              `{{c = sqrt(${s}) = ${c}}} cm.`,
              `Check: ${c} is longer than both ${a0} and ${b0} ✓.`,
            ],
            hint: "Square both shorter sides and add. What's left to do to get the hypotenuse itself?",
            traps: numTraps(c, [
              [a0 + b0, "You added the lengths. Square each side first, add the squares, then square-root."],
              [s, "That's {{c^2}}. Take the square root to find c."],
            ]),
          };
        }
        const s = c * c - a0 * a0;
        const prompt = rng.pick([
          `A right-angled triangle has a hypotenuse of ${c} cm and one shorter side of ${a0} cm. Work out the length of the other shorter side, in cm.`,
          `In triangle PQR, angle Q = 90°, PR = ${c} cm and PQ = ${a0} cm. Work out the length of QR, in cm.`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: b0 },
          solution: [
            `A shorter side is unknown, so subtract the squares: {{b^2 = ${c}^2 - ${a0}^2 = ${c * c} - ${a0 * a0} = ${s}}}.`,
            `{{b = sqrt(${s}) = ${b0}}} cm.`,
            `Check: ${b0} is shorter than the hypotenuse, ${c} ✓.`,
          ],
          hint: "Which side is the hypotenuse? To find a shorter side, do you add or subtract the squares?",
          traps: numTraps(b0, [
            [c - a0, "You subtracted the lengths. Subtract the squares, then square-root."],
            rootTrap(c * c + a0 * a0, "You added the squares — that gives a side longer than the hypotenuse. For a shorter side, subtract."),
            [s, "That's the square of the side. Take the square root."],
          ]),
        };
      }

      if (tier === 2) {
        if (rng.bool(0.55)) {
          let a = 5;
          let b = 7;
          for (let i = 0; i < 100; i++) {
            a = rng.int(2, 15);
            b = rng.int(2, 15);
            if (a !== b && !isSq(a * a + b * b)) break;
            a = 5;
            b = 7;
          }
          const s = a * a + b * b;
          const ans = roundTo(Math.sqrt(s), 1);
          const prompt = rng.pick([
            `A right-angled triangle has shorter sides of ${a} cm and ${b} cm. Work out the length of the hypotenuse. Give your answer in cm, correct to 1 decimal place.`,
            `In triangle PQR, angle Q = 90°, PQ = ${a} cm and QR = ${b} cm. Work out the length of PR. Give your answer in cm, correct to 1 decimal place.`,
          ]);
          return {
            prompt,
            answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
            solution: [
              `Add the squares: {{c^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${s}}}.`,
              `{{c = sqrt(${s})}} = ${trunc3(Math.sqrt(s))}… = ${dp1(ans)} cm (1 d.p.).`,
              `Check: ${dp1(ans)} is longer than both ${a} and ${b} ✓.`,
            ],
            hint: "Square, add, square-root — then round at the very end.",
            traps: numTraps(ans, [
              [a + b, "You added the lengths. Square each side first, add the squares, then square-root."],
              rootTrap(Math.abs(a * a - b * b), "You subtracted the squares. For the hypotenuse, add them."),
              [s, "That's {{c^2}}. Take the square root to find c."],
            ]),
          };
        }
        let c = 12;
        let a = 5;
        for (let i = 0; i < 100; i++) {
          c = rng.int(6, 20);
          a = rng.int(2, c - 1);
          if (!isSq(c * c - a * a)) break;
          c = 12;
          a = 5;
        }
        const s = c * c - a * a;
        const ans = roundTo(Math.sqrt(s), 1);
        const prompt = rng.pick([
          `A right-angled triangle has a hypotenuse of ${c} cm and one shorter side of ${a} cm. Work out the length of the other shorter side. Give your answer in cm, correct to 1 decimal place.`,
          `In triangle PQR, angle Q = 90°, PR = ${c} cm and QR = ${a} cm. Work out the length of PQ. Give your answer in cm, correct to 1 decimal place.`,
        ]);
        return {
          prompt,
          answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
          solution: [
            `Subtract the squares: {{b^2 = ${c}^2 - ${a}^2 = ${c * c} - ${a * a} = ${s}}}.`,
            `{{b = sqrt(${s})}} = ${trunc3(Math.sqrt(s))}… = ${dp1(ans)} cm (1 d.p.).`,
            `Check: ${dp1(ans)} is shorter than the hypotenuse, ${c} ✓.`,
          ],
          hint: "The hypotenuse is the longest side. For a shorter side: square, subtract, square-root.",
          traps: numTraps(ans, [
            rootTrap(c * c + a * a, "You added the squares — that gives a side longer than the hypotenuse. For a shorter side, subtract."),
            [c - a, "You subtracted the lengths. Subtract the squares, then square-root."],
          ]),
        };
      }

      // Tier 3: problems in context.
      const ctx = rng.pick(["ladder", "diagonal", "shortcut", "distance"] as const);
      if (ctx === "ladder") {
        let L10 = 50;
        let d10 = 15;
        for (let i = 0; i < 100; i++) {
          L10 = rng.pick([40, 45, 50, 55, 60, 65, 70, 80]);
          d10 = rng.pick([10, 12, 15, 18, 20, 25]);
          if (2 * d10 < L10 && !isSq(L10 * L10 - d10 * d10)) break;
          L10 = 50;
          d10 = 15;
        }
        const s100 = L10 * L10 - d10 * d10;
        const exact = Math.sqrt(s100) / 10;
        const ans = roundTo(exact, 1);
        const L = L10 / 10;
        const d = d10 / 10;
        const L2 = clean((L10 * L10) / 100);
        const d2 = clean((d10 * d10) / 100);
        const h2 = clean(s100 / 100);
        return {
          prompt: `${num(L).startsWith("8") ? "An" : "A"} ${num(L)} m ladder leans against the wall of an HDB block. Its foot is on flat ground, ${num(d)} m from the wall. How far up the wall does the ladder reach? Give your answer in metres, correct to 1 decimal place.`,
          answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
          solution: [
            `The wall and the ground meet at a right angle, so the ladder is the hypotenuse.`,
            `A shorter side is missing, so subtract: {{h^2 = ${num(L)}^2 - ${num(d)}^2 = ${num(L2)} - ${num(d2)} = ${num(h2)}}}.`,
            `{{h = sqrt(${num(h2)})}} = ${trunc3(exact)}… = ${dp1(ans)} m (1 d.p.).`,
            `Check: ${dp1(ans)} m is less than the ladder's length, ${num(L)} m ✓.`,
          ],
          hint: "Sketch it. Which side of the right-angled triangle is the ladder?",
          traps: numTraps(ans, [[roundTo(Math.sqrt(L10 * L10 + d10 * d10) / 10, 1), "The ladder is the hypotenuse — the longest side — so subtract the squares to find the height.", 0.051]]),
        };
      }
      if (ctx === "diagonal" || ctx === "shortcut") {
        const [thing, unit, lo, hi] = rng.pick([
          ["school field", "m", 30, 90],
          ["park", "m", 40, 120],
          ["void deck", "m", 10, 30],
          ["community garden", "m", 5, 20],
        ] as const);
        let a = 40;
        let b = 30;
        for (let i = 0; i < 100; i++) {
          a = rng.int(lo, hi);
          b = rng.int(lo, hi);
          if (a !== b && !isSq(a * a + b * b)) break;
          a = lo + 1;
          b = lo + 3;
        }
        const s = a * a + b * b;
        const diag = Math.sqrt(s);
        if (ctx === "diagonal") {
          const ans = roundTo(diag, 1);
          return {
            prompt: `A ${thing} is a rectangle ${a} ${unit} long and ${b} ${unit} wide. ${name} walks in a straight line from one corner to the opposite corner. How far does ${name} walk? Give your answer in ${unit === "m" ? "metres" : unit}, correct to 1 decimal place.`,
            answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
            solution: [
              `The diagonal splits the rectangle into two right-angled triangles; the diagonal is the hypotenuse.`,
              `{{d^2 = ${a}^2 + ${b}^2 = ${a * a} + ${b * b} = ${s}}}.`,
              `{{d = sqrt(${s})}} = ${trunc3(diag)}… = ${dp1(ans)} ${unit} (1 d.p.).`,
            ],
            hint: "The walk is the diagonal of the rectangle. Which right-angled triangle has it as the hypotenuse?",
            traps: numTraps(ans, [[a + b, "That's the distance along two edges. The straight walk is the hypotenuse: square, add, square-root."]]),
          };
        }
        const exact = a + b - diag;
        const ans = roundTo(exact, 1);
        return {
          prompt: `A ${thing} is a rectangle ${a} ${unit} by ${b} ${unit}. Instead of walking along two edges from one corner to the opposite corner, ${name} walks straight across the diagonal. How much shorter is ${name}'s route? Give your answer in ${unit === "m" ? "metres" : unit}, correct to 1 decimal place.`,
          answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
          solution: [
            `Along the edges: ${a} + ${b} = ${a + b} ${unit}.`,
            `Diagonal (the hypotenuse): {{d = sqrt(${a}^2 + ${b}^2) = sqrt(${s})}} = ${trunc3(diag)}… ${unit}.`,
            `Saving: ${a + b} − ${trunc3(diag)}… = ${dp1(ans)} ${unit} (1 d.p.). Round only at the end.`,
          ],
          hint: "Work out both routes: along two edges, and along the diagonal. Then subtract.",
          traps: numTraps(ans, [rootTrap(s, "That's the length of the diagonal route. The question asks how much SHORTER it is than walking along the edges.")]),
        };
      }
      // distance between two points
      let P: P2 = [-2, 1];
      let Q: P2 = [4, 5];
      for (let i = 0; i < 100; i++) {
        const p: P2 = [rng.int(-8, 8), rng.int(-8, 8)];
        const q: P2 = [rng.int(-8, 8), rng.int(-8, 8)];
        const dx = q[0] - p[0];
        const dy = q[1] - p[1];
        if (dx === 0 || dy === 0 || isSq(dx * dx + dy * dy)) continue;
        P = p;
        Q = q;
        break;
      }
      const dx = Math.abs(Q[0] - P[0]);
      const dy = Math.abs(Q[1] - P[1]);
      const s = dx * dx + dy * dy;
      const ans = roundTo(Math.sqrt(s), 1);
      return {
        prompt: `On a centimetre grid, A is the point ${pt(P)} and B is the point ${pt(Q)}. Work out the length of the straight line AB. Give your answer in cm, correct to 1 decimal place.`,
        answer: { type: "number", value: ans, allowFraction: false, display: dp1(ans) },
        solution: [
          `Make a right-angled triangle with AB as the hypotenuse. Across: ${num(Q[0])} − ${br(P[0])} = ${num(Q[0] - P[0])}, so ${dx} units. Up or down: ${num(Q[1])} − ${br(P[1])} = ${num(Q[1] - P[1])}, so ${dy} units.`,
          `{{AB^2 = ${dx}^2 + ${dy}^2 = ${dx * dx} + ${dy * dy} = ${s}}}.`,
          `{{AB = sqrt(${s})}} = ${trunc3(Math.sqrt(s))}… = ${dp1(ans)} cm (1 d.p.).`,
        ],
        hint: "Draw a right-angled triangle under AB: how far across, and how far up or down? Then use Pythagoras.",
        traps: numTraps(ans, [[dx + dy, "That's the distance going across then up. The straight line is the hypotenuse: square, add, square-root."]]),
      };
    },
  },
];
