// Procedural skill drills for "Angles, Parallel Lines & Polygons".
// Every diagram is drawn from the actual angle sizes (geometrically honest).
import type { Drill, Rng } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { num, poly, big } from "./helpers.ts";

const TOPIC = "angles-polygons";

// ---------------------------------------------------------------------------
// Text helpers
// ---------------------------------------------------------------------------

const deg = (n: number) => `${num(n)}°`;
const mv = (s: string) => `{{${s}}}`;

function andList(items: string[]): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

function angleAns(value: number): AnswerSpec {
  return { type: "number", value, display: deg(value) };
}

function countAns(value: number): AnswerSpec {
  return { type: "number", value };
}

/** Add a numeric trap only if it is a sensible positive number different from the answer (and not a repeat). */
function pushTrap(traps: Trap[], answer: number, value: number, feedback: string) {
  if (!Number.isFinite(value) || value <= 0 || Math.abs(value - answer) < 1e-9) return;
  if (traps.some((t) => t.spec.type === "number" && Math.abs(t.spec.value - value) < 1e-9)) return;
  traps.push({ spec: { type: "number", value }, feedback });
}

/** As pushTrap, but only for whole-number values (e.g. a number of sides). */
function pushIntTrap(traps: Trap[], answer: number, value: number, feedback: string) {
  if (Number.isInteger(value)) pushTrap(traps, answer, value, feedback);
}

/** Random multiple of `step` in [lo, hi]. */
function pickStep(rng: Rng, lo: number, hi: number, step: number): number {
  return step * rng.int(Math.ceil(lo / step), Math.floor(hi / step));
}

const PEOPLE: ReadonlyArray<readonly [string, "he" | "she"]> = [
  ["Aisha", "she"], ["Wei Ling", "she"], ["Arjun", "he"], ["Priya", "she"], ["Marcus", "he"], ["Siti", "she"],
  ["Ethan", "he"], ["Mei", "she"], ["Ravi", "he"], ["Hana", "she"], ["Jun", "he"], ["Zara", "she"],
];

// Regular polygon names: [singular, plural].
const REG_NAMES: Record<number, readonly [string, string]> = {
  3: ["equilateral triangle", "equilateral triangles"],
  4: ["square", "squares"],
  5: ["regular pentagon", "regular pentagons"],
  6: ["regular hexagon", "regular hexagons"],
  8: ["regular octagon", "regular octagons"],
  9: ["regular nonagon", "regular nonagons"],
  10: ["regular decagon", "regular decagons"],
  12: ["regular dodecagon", "regular dodecagons"],
};

/** "a regular hexagon", "a regular octagon (8 sides)", "a regular polygon with 15 sides". */
function regName(n: number): string {
  const nm = REG_NAMES[n];
  if (!nm) return `a regular polygon with ${n} sides`;
  const art = /^[aeiou]/.test(nm[0]) ? "an" : "a";
  return n >= 7 ? `${art} ${nm[0]} (${n} sides)` : `${art} ${nm[0]}`;
}

/** "regular hexagons", "regular octagons (8 sides)", "regular polygons with 15 sides". */
function regPlural(n: number): string {
  const nm = REG_NAMES[n];
  if (!nm) return `regular polygons with ${n} sides`;
  return n >= 7 ? `${nm[1]} (${n} sides)` : nm[1];
}

/** "a pentagon", "an octagon". */
const withArt = (nm: string) => `${/^[aeiou]/i.test(nm) ? "an" : "a"} ${nm}`;
const capFirst = (t: string) => t.charAt(0).toUpperCase() + t.slice(1);

const POLY_NAMES: Record<number, string> = { 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon", 12: "dodecagon" };

// ---------------------------------------------------------------------------
// Geometry + SVG (maths coordinates, y up; rendered with a uniform scale)
// ---------------------------------------------------------------------------

type Pt = [number, number];
const RAD = Math.PI / 180;
const f1 = (n: number) => String(Math.round(n * 10) / 10);

function dirOf(from: Pt, to: Pt): number {
  return ((Math.atan2(to[1] - from[1], to[0] - from[0]) / RAD) % 360 + 360) % 360;
}

function rotatePts(pts: Pt[], by: number): Pt[] {
  const c = Math.cos(by * RAD), s = Math.sin(by * RAD);
  return pts.map(([x, y]) => [x * c - y * s, x * s + y * c] as Pt);
}

function centroid(pts: Pt[]): Pt {
  return [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
}

type MarkKind = "given" | "unknown" | "plain";
interface Mark {
  v: Pt;
  /** Start direction (degrees, anticlockwise from east). */
  start: number;
  /** Angle size swept anticlockwise. */
  size: number;
  label: string;
  kind: MarkKind;
  right?: boolean;
}
interface Scene {
  segs: { a: Pt; b: Pt; thin?: boolean }[];
  fills: Pt[][];
  marks: Mark[];
  names: { p: Pt; text: string; dir: number }[];
  ticks: { a: Pt; b: Pt; n: number }[];
  arrows: { p: Pt; dir: number; n: number }[];
}

function newScene(): Scene {
  return { segs: [], fills: [], marks: [], names: [], ticks: [], arrows: [] };
}

/** Interior angle mark at vertex i of an anticlockwise polygon. */
function vertexMark(pts: Pt[], i: number, label: string, kind: MarkKind, right = false): Mark {
  const n = pts.length;
  const v = pts[i];
  const start = dirOf(v, pts[(i + 1) % n]);
  const end = dirOf(v, pts[(i - 1 + n) % n]);
  return { v, start, size: (end - start + 360) % 360, label, kind, right };
}

function addPolygon(sc: Scene, pts: Pt[], names?: string[]) {
  sc.fills.push(pts);
  pts.forEach((p, i) => sc.segs.push({ a: p, b: pts[(i + 1) % pts.length] }));
  if (names) {
    const c = centroid(pts);
    names.forEach((t, i) => sc.names.push({ p: pts[i], text: t, dir: dirOf(c, pts[i]) }));
  }
}

function render(sc: Scene, aria: string, maxW = 360, maxH = 250): string {
  const pts: Pt[] = [...sc.segs.flatMap((s) => [s.a, s.b]), ...sc.fills.flat(), ...sc.marks.map((m) => m.v)];
  const xs = pts.map((p) => p[0]), ys = pts.map((p) => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs), minY = Math.min(...ys), maxY = Math.max(...ys);
  const M = 36;
  const bw = Math.max(maxX - minX, 1e-6), bh = Math.max(maxY - minY, 1e-6);
  const s = Math.min((maxW - 2 * M) / bw, (maxH - 2 * M) / bh);
  // Fixed width (so text renders at a consistent size); height fits the content.
  const W = maxW, H = Math.round(s * bh + 2 * M);
  const left = (W - s * bw) / 2;
  const T = (p: Pt): Pt => [left + s * (p[0] - minX), M + s * (maxY - p[1])];
  const off = (p: Pt, d: number, r: number): Pt => [p[0] + r * Math.cos(d * RAD), p[1] - r * Math.sin(d * RAD)];
  const xy = (p: Pt) => `${f1(p[0])} ${f1(p[1])}`;
  const out: string[] = [`<rect x="0" y="0" width="${W}" height="${H}" fill="#ffffff"/>`];
  for (const f of sc.fills) {
    out.push(`<polygon points="${f.map((p) => T(p).map(f1).join(",")).join(" ")}" fill="#c7d2fe" fill-opacity="0.35" stroke="none"/>`);
  }
  const labels: string[] = [];
  for (const m of sc.marks) {
    const c = T(m.v);
    if (m.right) {
      const r = 13;
      const p1 = off(c, m.start, r), p3 = off(c, m.start + 90, r), p2 = off(p1, m.start + 90, r);
      out.push(`<path d="M ${xy(p1)} L ${xy(p2)} L ${xy(p3)}" fill="none" stroke="#334155" stroke-width="1.5"/>`);
    } else {
      const r = m.size < 40 ? 30 : m.size < 70 ? 24 : 20;
      const p1 = off(c, m.start, r), p2 = off(c, m.start + m.size, r);
      const fill = m.kind === "unknown" ? "#fde68a" : m.kind === "given" ? "#bae6fd" : "#e5e7eb";
      out.push(`<path d="M ${xy(c)} L ${xy(p1)} A ${r} ${r} 0 ${m.size > 180 ? 1 : 0} 0 ${xy(p2)} Z" fill="${fill}" stroke="#334155" stroke-width="1"/>`);
    }
    if (m.label) {
      const L = m.size < 35 ? 52 : m.size < 60 ? 42 : 35;
      const p = off(c, m.start + m.size / 2, L);
      const italic = /^[a-z]$/.test(m.label) ? ` font-style="italic"` : "";
      labels.push(`<text x="${f1(p[0])}" y="${f1(p[1])}" font-size="13" text-anchor="middle" dominant-baseline="central" fill="#1f2937"${italic}>${m.label}</text>`);
    }
  }
  for (const g of sc.segs) {
    const a = T(g.a), b = T(g.b);
    out.push(`<line x1="${f1(a[0])}" y1="${f1(a[1])}" x2="${f1(b[0])}" y2="${f1(b[1])}" stroke="#1f2937" stroke-width="${g.thin ? 1.5 : 2}" stroke-linecap="round"/>`);
  }
  for (const t of sc.ticks) {
    const a = T(t.a), b = T(t.b);
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]) || 1;
    const ux = (b[0] - a[0]) / len, uy = (b[1] - a[1]) / len;
    const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
    for (let k = 0; k < t.n; k++) {
      const o = (k - (t.n - 1) / 2) * 5;
      const cx = mx + ux * o, cy = my + uy * o;
      out.push(`<line x1="${f1(cx - uy * 6)}" y1="${f1(cy + ux * 6)}" x2="${f1(cx + uy * 6)}" y2="${f1(cy - ux * 6)}" stroke="#1f2937" stroke-width="1.5"/>`);
    }
  }
  for (const ar of sc.arrows) {
    const c = T(ar.p);
    const ux = Math.cos(ar.dir * RAD), uy = -Math.sin(ar.dir * RAD);
    for (let k = 0; k < ar.n; k++) {
      const o = (k - (ar.n - 1) / 2) * 7;
      const tip: Pt = [c[0] + ux * (o + 4), c[1] + uy * (o + 4)];
      const a1: Pt = [tip[0] - ux * 7 - uy * 5, tip[1] - uy * 7 + ux * 5];
      const a2: Pt = [tip[0] - ux * 7 + uy * 5, tip[1] - uy * 7 - ux * 5];
      out.push(`<path d="M ${xy(a1)} L ${xy(tip)} L ${xy(a2)}" fill="none" stroke="#1f2937" stroke-width="1.5"/>`);
    }
  }
  for (const nm of sc.names) {
    const p = off(T(nm.p), nm.dir, 15);
    labels.push(`<text x="${f1(p[0])}" y="${f1(p[1])}" font-size="14" font-weight="bold" text-anchor="middle" dominant-baseline="central" fill="#1f2937">${nm.text}</text>`);
  }
  return `<svg viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><g font-family="sans-serif">${out.join("")}${labels.join("")}</g></svg>`;
}

/**
 * Build a convex polygon with the given interior angles (anticlockwise, vertex 0 at the origin,
 * first side heading east). The first n−2 side lengths are given; the last two are solved so the
 * shape closes. Returns null if the shape would be degenerate.
 */
function polygonFromAngles(interior: number[], lens: number[], minRatio = 0.35): Pt[] | null {
  const n = interior.length;
  const dirs: number[] = [0];
  for (let i = 1; i < n; i++) dirs.push(dirs[i - 1] + 180 - interior[i]);
  const u = dirs.map((d) => [Math.cos(d * RAD), Math.sin(d * RAD)] as Pt);
  let sx = 0, sy = 0;
  for (let i = 0; i < n - 2; i++) {
    sx += lens[i] * u[i][0];
    sy += lens[i] * u[i][1];
  }
  const a = u[n - 2], b = u[n - 1];
  const det = a[0] * b[1] - a[1] * b[0];
  if (Math.abs(det) < 1e-9) return null;
  const la = (-sx * b[1] + sy * b[0]) / det;
  const lb = (-a[0] * sy + a[1] * sx) / det;
  const all = [...lens.slice(0, n - 2), la, lb];
  const mx = Math.max(...all), mn = Math.min(...all);
  if (!(mn > 0) || mn / mx < minRatio) return null;
  const pts: Pt[] = [[0, 0]];
  for (let i = 0; i < n - 1; i++) pts.push([pts[i][0] + all[i] * u[i][0], pts[i][1] + all[i] * u[i][1]]);
  return pts;
}

/** Try a deterministic set of side lengths until the polygon closes nicely. */
function findPolygon(interior: number[]): Pt[] | null {
  const n = interior.length;
  if (interior.some((x) => x <= 0 || x >= 180)) return null;
  const fr = (x: number) => x - Math.floor(x);
  // Keep the candidate whose shortest side is longest relative to its longest side (least crowded labels).
  let best: Pt[] | null = null, bestR = 0;
  for (let k = 0; k < 160; k++) {
    const lens = Array.from({ length: n - 2 }, (_, i) => (k === 0 ? 1 : 0.55 + 0.9 * fr(Math.sin((k + 1) * 12.9898 + (i + 1) * 78.233) * 43758.5453)));
    const p = polygonFromAngles(interior, lens);
    if (!p) continue;
    const sides = p.map((q, i) => Math.hypot(p[(i + 1) % n][0] - q[0], p[(i + 1) % n][1] - q[1]));
    const r = Math.min(...sides) / Math.max(...sides);
    if (r > bestR) { bestR = r; best = p; }
  }
  return best;
}

/** Triangle with angles b (at B, bottom left), c (at C, bottom right), a (at A, top). Points [B, C, A]. */
function triPts(b: number, c: number, a: number): Pt[] {
  const BA = Math.sin(c * RAD) / Math.sin(a * RAD);
  return [[0, 0], [1, 0], [BA * Math.cos(b * RAD), BA * Math.sin(b * RAD)]];
}

// --- Parallel lines crossed by a transversal --------------------------------

type Pos = "UR" | "UL" | "LL" | "LR";
type Cross = "T" | "B";
interface ARef { cross: Cross; pos: Pos }
const POSS: readonly Pos[] = ["UR", "UL", "LL", "LR"];

/** Size of the angle at position `pos` when the transversal makes angle th with the parallel lines. */
function posSize(pos: Pos, th: number): number {
  return pos === "UR" || pos === "LL" ? th : 180 - th;
}
function posStart(pos: Pos, th: number): number {
  return pos === "UR" ? 0 : pos === "UL" ? th : pos === "LL" ? 180 : 180 + th;
}
const POS_WORDS: Record<Pos, string> = {
  UR: "above their parallel line, to the right of the transversal",
  UL: "above their parallel line, to the left of the transversal",
  LL: "below their parallel line, to the left of the transversal",
  LR: "below their parallel line, to the right of the transversal",
};

function parallelSvg(th: number, marks: { ref: ARef; label: string; kind: MarkKind }[], aria: string): string {
  const G = 1.2;
  const cot = 1 / Math.tan(th * RAD);
  const T: Pt = [(G * cot) / 2, G], B: Pt = [(-G * cot) / 2, 0];
  const u: Pt = [Math.cos(th * RAD), Math.sin(th * RAD)];
  const ext = 0.55;
  const t1: Pt = [B[0] - ext * u[0], -ext * u[1]], t2: Pt = [T[0] + ext * u[0], G + ext * u[1]];
  const L = Math.max(2.1, Math.max(Math.abs(t1[0]), Math.abs(t2[0])) + 0.8);
  const sc = newScene();
  sc.segs.push({ a: [-L, G], b: [L, G] }, { a: [-L, 0], b: [L, 0] }, { a: t1, b: t2 });
  sc.arrows.push({ p: [-L + 0.35, G], dir: 0, n: 1 }, { p: [-L + 0.35, 0], dir: 0, n: 1 });
  for (const m of marks) {
    sc.marks.push({ v: m.ref.cross === "T" ? T : B, start: posStart(m.ref.pos, th), size: posSize(m.ref.pos, th), label: m.label, kind: m.kind });
  }
  return render(sc, aria, 360, 260);
}

/** Named relationship between angles at different crossings, or null if it needs two steps. */
function pairType(g: ARef, u: ARef): "corr" | "alt" | "coint" | null {
  if (g.cross === u.cross) return null;
  if (g.pos === u.pos) return "corr";
  const interior = (r: ARef) => (r.cross === "T" ? r.pos === "LL" || r.pos === "LR" : r.pos === "UL" || r.pos === "UR");
  if (!interior(g) || !interior(u)) return null;
  const left = (r: ARef) => r.pos === "LL" || r.pos === "UL";
  return left(g) === left(u) ? "coint" : "alt";
}

const ALT_ACCEPT = ["alternate", "alternate angles", "alternate angle", "alternate interior", "alternate interior angles", "alt", "alt angles"];
const CORR_ACCEPT = ["corresponding", "corresponding angles", "corresponding angle", "corr", "corr angles"];
const COINT_ACCEPT = ["co-interior", "cointerior", "co-interior angles", "cointerior angles", "co-interior angle", "allied", "allied angles", "same-side interior", "same side interior", "same-side interior angles", "consecutive interior", "consecutive interior angles"];
const VO_ACCEPT = ["vertically opposite", "vertically opposite angles", "vertically opposite angle", "vertical angles", "vertical", "vert opp", "opposite", "opposite angles"];

// ---------------------------------------------------------------------------
// Quadrilateral clue sets (each identifies exactly one most-specific shape)
// ---------------------------------------------------------------------------

const QUAD_ACCEPT: Record<string, string[]> = {
  square: ["square", "a square"],
  rectangle: ["rectangle", "a rectangle", "oblong"],
  rhombus: ["rhombus", "a rhombus"],
  parallelogram: ["parallelogram", "a parallelogram"],
  kite: ["kite", "a kite"],
  trapezium: ["trapezium", "a trapezium", "trapezoid"],
  "isosceles trapezium": ["isosceles trapezium", "an isosceles trapezium", "isosceles trapezoid"],
};

interface Clue {
  shape: string;
  text: string;
  why: string;
  hard: boolean;
  trap: [string, string];
}

const CLUES: Clue[] = [
  // ----- sides and angles -----
  { shape: "square", hard: false, text: "four equal sides and four right angles",
    why: "Four equal sides means a rhombus or a square. Four right angles means a rectangle or a square. Only the square is both.",
    trap: ["rhombus", "A rhombus does have four equal sides — but this shape also has four right angles, so there is a more specific name."] },
  { shape: "square", hard: false, text: "all four sides equal and all four angles equal",
    why: "Four equal angles must each be 360° ÷ 4 = 90°. Four right angles and four equal sides make a square.",
    trap: ["rhombus", "Equal angles in a quadrilateral are all 90° — so this rhombus is a special one."] },
  { shape: "rectangle", hard: false, text: "four right angles, but sides that are not all the same length",
    why: "Four right angles means a rectangle or a square. The sides are not all equal, so it can't be a square.",
    trap: ["square", "A square needs all four sides equal — these aren't."] },
  { shape: "rectangle", hard: false, text: "all four angles equal, and one pair of opposite sides longer than the other pair",
    why: "Four equal angles are each 90°, so it's a rectangle or a square. The sides are not all equal, so it's a rectangle.",
    trap: ["square", "A square needs all four sides equal — here one pair is longer."] },
  { shape: "rhombus", hard: false, text: "four equal sides, but no right angles",
    why: "Four equal sides means a rhombus or a square. A square has right angles, so this must be a rhombus.",
    trap: ["square", "A square needs four right angles — this shape has none."] },
  { shape: "rhombus", hard: false, text: "four equal sides and an angle of 70°",
    why: "Four equal sides means a rhombus or a square. A square's angles are all 90°, so the 70° angle rules it out.",
    trap: ["square", "A square's angles are all 90°, so a 70° angle rules it out."] },
  { shape: "parallelogram", hard: false, text: "two pairs of parallel sides, no right angles, and neighbouring sides of different lengths",
    why: "Two pairs of parallel sides puts it in the parallelogram family. No right angles rules out rectangles and squares; unequal neighbouring sides rules out the rhombus.",
    trap: ["rhombus", "A rhombus has all four sides equal — here neighbouring sides are different lengths."] },
  { shape: "parallelogram", hard: false, text: "opposite sides equal and parallel, angles of 65° and 115°, and neighbouring sides 4 cm and 7 cm long",
    why: "Opposite sides equal and parallel gives a parallelogram. A 65° angle rules out rectangles and squares, and sides of 4 cm and 7 cm rule out the rhombus.",
    trap: ["rectangle", "A rectangle needs four right angles — this one has angles of 65° and 115°."] },
  { shape: "kite", hard: false, text: "two pairs of equal adjacent sides, no parallel sides and no reflex angle",
    why: "Two pairs of equal adjacent (neighbouring) sides with no reflex angle is a kite. A rhombus is a special kite, but a rhombus has parallel sides.",
    trap: ["rhombus", "A rhombus has two pairs of parallel sides; this shape has none."] },
  { shape: "kite", hard: false, text: "two pairs of equal adjacent sides, where the two pairs are different lengths, and no reflex angle",
    why: "Two pairs of equal adjacent sides with no reflex angle is a kite. The pairs are different lengths, so it isn't a rhombus.",
    trap: ["rhombus", "A rhombus has all four sides equal — here the two pairs are different lengths."] },
  { shape: "trapezium", hard: false, text: "exactly one pair of parallel sides, with the other two sides different lengths",
    why: "Exactly one pair of parallel sides makes it a trapezium. If the other two sides were equal it would be an isosceles trapezium — they aren't.",
    trap: ["isosceles trapezium", "An isosceles trapezium needs its two non-parallel sides to be equal."] },
  { shape: "trapezium", hard: false, text: "exactly one pair of parallel sides and two right angles",
    why: "Exactly one pair of parallel sides makes it a trapezium (a right-angled one). It can't be a rectangle, which has two pairs of parallel sides.",
    trap: ["rectangle", "A rectangle has two pairs of parallel sides; this shape has exactly one pair."] },
  { shape: "isosceles trapezium", hard: false, text: "exactly one pair of parallel sides, with the other two sides equal in length",
    why: "Exactly one pair of parallel sides makes it a trapezium; equal non-parallel sides make it an isosceles trapezium.",
    trap: ["trapezium", "True — but there is a more specific name, because the other two sides are equal."] },
  { shape: "isosceles trapezium", hard: false, text: "exactly one pair of parallel sides, with the two angles at each end of the longer parallel side equal",
    why: "Exactly one pair of parallel sides makes it a trapezium. Equal angles at both ends of a parallel side make it symmetrical: an isosceles trapezium.",
    trap: ["trapezium", "True — but the equal angles make it symmetrical, so there is a more specific name."] },
  // ----- diagonals and symmetry -----
  { shape: "square", hard: true, text: "diagonals that are equal in length, bisect each other and cross at right angles",
    why: "Diagonals that bisect each other give a parallelogram. Equal diagonals make it a rectangle; diagonals crossing at right angles make it a rhombus. Both at once: a square.",
    trap: ["rectangle", "A rectangle's diagonals are equal, but they don't cross at right angles unless it's a square."] },
  { shape: "square", hard: true, text: "four lines of symmetry",
    why: "The square is the only quadrilateral with four lines of symmetry: two diagonals and two through the midpoints of opposite sides.",
    trap: ["rhombus", "A rhombus only has two lines of symmetry (its diagonals)."] },
  { shape: "square", hard: true, text: "rotational symmetry of order 4",
    why: "A quarter-turn maps it onto itself, so every side moves onto the next one and every angle onto the next: all sides and all angles are equal. That's a square.",
    trap: ["rhombus", "A rhombus only has rotational symmetry of order 2."] },
  { shape: "rectangle", hard: true, text: "diagonals that are equal in length and bisect each other, but do not cross at right angles",
    why: "Bisecting diagonals give a parallelogram. Equal diagonals make it a rectangle or square. They aren't perpendicular, so it isn't a square.",
    trap: ["square", "A square's diagonals cross at right angles — these don't."] },
  { shape: "rectangle", hard: true, text: "exactly two lines of symmetry, each joining the midpoints of opposite sides",
    why: "A rectangle's two lines of symmetry join the midpoints of opposite sides. A rhombus also has two, but they are its diagonals (through the corners).",
    trap: ["rhombus", "A rhombus's lines of symmetry go through its corners (they are its diagonals)."] },
  { shape: "rhombus", hard: true, text: "diagonals that bisect each other at right angles but are not equal in length",
    why: "Bisecting diagonals give a parallelogram. Perpendicular diagonals make it a rhombus or a square. Unequal diagonals rule out the square.",
    trap: ["kite", "Every rhombus is a special kite, but here BOTH diagonals are cut in half — there's a more specific name."] },
  { shape: "rhombus", hard: true, text: "exactly two lines of symmetry, which are its diagonals",
    why: "Symmetry in both diagonals makes all four sides equal: a rhombus. Only two lines of symmetry, so not a square.",
    trap: ["rectangle", "A rectangle's lines of symmetry go through the midpoints of its sides, not along its diagonals."] },
  { shape: "parallelogram", hard: true, text: "diagonals that bisect each other, but are not equal and do not cross at right angles",
    why: "Bisecting diagonals give a parallelogram. Equal diagonals would make a rectangle and perpendicular ones a rhombus — neither happens here.",
    trap: ["rectangle", "A rectangle's diagonals are equal in length — these aren't."] },
  { shape: "parallelogram", hard: true, text: "rotational symmetry of order 2 but no lines of symmetry",
    why: "Half-turn symmetry means opposite sides are equal and parallel: a parallelogram. Rectangles and rhombuses have lines of symmetry, so it's neither.",
    trap: ["rhombus", "A rhombus has two lines of symmetry (its diagonals)."] },
  { shape: "kite", hard: true, text: "exactly one line of symmetry, which is a diagonal, and no reflex angle",
    why: "Symmetry in a diagonal makes two pairs of equal adjacent sides: a kite. With only one line of symmetry it can't be a rhombus.",
    trap: ["isosceles trapezium", "An isosceles trapezium's line of symmetry goes through the midpoints of its parallel sides, not through its corners."] },
  { shape: "kite", hard: true, text: "diagonals that cross at right angles, where only one diagonal is cut in half by the other",
    why: "The diagonal that is cut in half has the other diagonal as its perpendicular bisector, so two pairs of adjacent sides are equal: a kite. If both were cut in half it would be a rhombus.",
    trap: ["rhombus", "In a rhombus both diagonals are cut in half."] },
  { shape: "trapezium", hard: true, text: "exactly one pair of parallel sides and no lines of symmetry",
    why: "Exactly one pair of parallel sides makes it a trapezium. An isosceles trapezium would have a line of symmetry.",
    trap: ["isosceles trapezium", "An isosceles trapezium has a line of symmetry."] },
  { shape: "isosceles trapezium", hard: true, text: "exactly one pair of parallel sides and exactly one line of symmetry",
    why: "Exactly one pair of parallel sides makes it a trapezium. A line of symmetry (through the midpoints of the parallel sides) makes it an isosceles trapezium.",
    trap: ["trapezium", "True — but the line of symmetry gives a more specific name."] },
  { shape: "isosceles trapezium", hard: true, text: "exactly one pair of parallel sides and diagonals that are equal in length",
    why: "A trapezium whose diagonals are equal is symmetrical about the line through the midpoints of its parallel sides: an isosceles trapezium.",
    trap: ["trapezium", "True — but equal diagonals give a more specific name."] },
];

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // ======================= LEVEL 1 =======================
  {
    id: `${TOPIC}.line-point-opposite`,
    topicId: TOPIC,
    title: "Angles on a straight line, at a point and vertically opposite",
    level: 1,
    guideRef: "angle-facts",
    generate(rng, tier) {
      const kinds = tier === 1 ? ["line2", "point3", "vo1"] : tier === 2 ? ["line3", "point3", "point4", "vo3"] : ["lineEq", "pointEq", "line3", "point4", "vo3"];
      const kind = rng.pick(kinds);
      const step = tier === 1 ? 5 : 1;
      const v = rng.pick(["x", "y", "a", "p"]);
      const V = mv(v);
      const traps: Trap[] = [];

      // ----- two crossing lines -----
      if (kind === "vo1" || kind === "vo3") {
        let a = 50;
        for (let i = 0; i < 100; i++) {
          const c = pickStep(rng, 30, 150, step);
          if (c !== 90) { a = c; break; }
        }
        const o = rng.int(0, 25);
        const sc = newScene();
        const d1: Pt = [Math.cos(o * RAD), Math.sin(o * RAD)], d2: Pt = [Math.cos((o + a) * RAD), Math.sin((o + a) * RAD)];
        sc.segs.push({ a: [-d1[0], -d1[1]], b: d1 }, { a: [-d2[0], -d2[1]], b: d2 });
        const O: Pt = [0, 0];
        const starts = [o, o + a, o + 180, o + 180 + a];
        const sizes = [a, 180 - a, a, 180 - a];
        sc.marks.push({ v: O, start: starts[0], size: sizes[0], label: deg(a), kind: "given" });
        if (kind === "vo1") {
          const ask = rng.pick([1, 2, 3]);
          sc.marks.push({ v: O, start: starts[ask], size: sizes[ask], label: v, kind: "unknown" });
          const x = sizes[ask];
          const opp = ask === 2;
          if (opp) pushTrap(traps, x, 180 - a, "Vertically opposite angles are equal — they don't add up to 180°.");
          else pushTrap(traps, x, a, "These two angles sit next to each other on a straight line, so they add up to 180°. It's the opposite angles that are equal.");
          const prompt = rng.bool()
            ? `Two straight lines cross, as shown. One of the angles is ${deg(a)}. Find the size of angle ${V}.`
            : `The diagram shows two straight lines crossing, making an angle of ${deg(a)}. Work out ${V}.`;
          return {
            prompt,
            answer: angleAns(x),
            solution: opp
              ? [`${V} is vertically opposite the ${deg(a)} angle.`, `Vertically opposite angles are equal, so ${V} = ${deg(x)}.`]
              : [`${V} and the ${deg(a)} angle lie next to each other on a straight line.`, `Angles on a straight line add up to 180°, so ${V} = 180° − ${deg(a)} = ${deg(x)}.`],
            hint: "Is the angle you want opposite the one you know, or next to it on a straight line?",
            traps,
            diagram: render(sc, `Two straight lines crossing, with one angle marked ${deg(a)} and angle ${v} marked`),
          };
        }
        const trio = rng.pick([["p", "q", "r"], ["x", "y", "z"], ["a", "b", "c"], ["e", "f", "g"]]);
        for (let k = 1; k <= 3; k++) sc.marks.push({ v: O, start: starts[k], size: sizes[k], label: trio[k - 1], kind: "unknown" });
        const vals = [180 - a, a, 180 - a];
        const [P, Q, R] = trio.map(mv);
        return {
          prompt: `Two straight lines cross, as shown. One angle is ${deg(a)}. Find ${P}, ${Q} and ${R}. Give your answers in that order, separated by commas.`,
          answer: { type: "list", values: vals, ordered: true, display: `${trio[0]} = ${deg(vals[0])}, ${trio[1]} = ${deg(vals[1])}, ${trio[2]} = ${deg(vals[2])}` },
          solution: [
            `${Q} is vertically opposite the ${deg(a)} angle, so ${Q} = ${deg(a)}.`,
            `${P} lies on a straight line with the ${deg(a)} angle, so ${P} = 180° − ${deg(a)} = ${deg(180 - a)}.`,
            `${R} is vertically opposite ${P}, so ${R} = ${deg(180 - a)}.`,
          ],
          hint: "Opposite angles are equal; neighbouring angles make a straight line.",
          traps: [{ spec: { type: "list", values: [a, 180 - a, a], ordered: true }, feedback: `Swapped! The angle opposite the ${deg(a)} angle equals it; the two next to it make 180° with it.` }],
          diagram: render(sc, `Two straight lines crossing, with one angle marked ${deg(a)} and the other three angles marked ${trio.join(", ")}`),
        };
      }

      // ----- straight line or point -----
      const isLine = kind.startsWith("line");
      const total = isLine ? 180 : 360;
      let sizes: number[] = isLine ? [70, 110] : [100, 130, 130];
      let unk: number[] = isLine ? [1] : [2];
      for (let i = 0; i < 200; i++) {
        if (kind === "line2") {
          const a = pickStep(rng, 25, 155, step);
          if (a === 90) continue;
          const first = rng.bool();
          sizes = first ? [180 - a, a] : [a, 180 - a];
          unk = [first ? 0 : 1];
          break;
        }
        if (kind === "line3") {
          const a = pickStep(rng, 25, 130, step), b = pickStep(rng, 25, 130, step), x = 180 - a - b;
          if (x < 25 || x === 90) continue;
          const pos = rng.int(0, 2);
          const g = [a, b];
          sizes = [0, 1, 2].map((k) => (k === pos ? x : g.shift() as number));
          unk = [pos];
          break;
        }
        if (kind === "point3") {
          const a = pickStep(rng, 40, 200, step), b = pickStep(rng, 40, 200, step), x = 360 - a - b;
          if (x < 30 || x > 200 || x === 90 || [a, b, x].some((t) => t >= 165 && t <= 195)) continue;
          const pos = rng.int(0, 2);
          const g = [a, b];
          sizes = [0, 1, 2].map((k) => (k === pos ? x : g.shift() as number));
          unk = [pos];
          break;
        }
        if (kind === "point4") {
          const a = pickStep(rng, 30, 150, step), b = pickStep(rng, 30, 150, step), c = pickStep(rng, 30, 150, step), x = 360 - a - b - c;
          if (x < 30 || x > 160 || x === 90) continue;
          const pos = rng.int(0, 3);
          const g = [a, b, c];
          sizes = [0, 1, 2, 3].map((k) => (k === pos ? x : g.shift() as number));
          unk = [pos];
          break;
        }
        if (kind === "lineEq") {
          const a = rng.int(20, 140);
          if ((180 - a) % 2 !== 0 || a === 60 || a === 90) continue;
          const x = (180 - a) / 2;
          const pos = rng.int(0, 2);
          sizes = [0, 1, 2].map((k) => (k === pos ? a : x));
          unk = [0, 1, 2].filter((k) => k !== pos);
          break;
        }
        // pointEq
        const a = rng.int(50, 170), b = rng.int(50, 170), r = 360 - a - b;
        if (r % 2 !== 0 || a === 90 || b === 90) continue;
        const x = r / 2;
        if (x < 30 || x > 150 || x === 90) continue;
        if (rng.bool()) { sizes = [a, x, b, x]; unk = [1, 3]; } else { sizes = [a, b, x, x]; unk = [2, 3]; }
        break;
      }
      const x = sizes[unk[0]];
      const known = sizes.filter((_, k) => !unk.includes(k));
      const S = known.reduce((p, q) => p + q, 0);
      const listed = sizes.map((s, k) => (unk.includes(k) ? V : deg(s)));
      const L = andList(listed);
      const eq = unk.length === 2;

      // Diagram: rays from O (a straight line is drawn as one segment).
      const sc = newScene();
      const O: Pt = [0, 0];
      const offset = isLine ? 0 : rng.int(0, 40);
      let cum = offset;
      if (isLine) sc.segs.push({ a: [-1, 0], b: [1, 0] });
      sizes.forEach((s, k) => {
        if (!isLine || k > 0) sc.segs.push({ a: O, b: [Math.cos(cum * RAD), Math.sin(cum * RAD)] });
        const right = s === 90 && !unk.includes(k);
        sc.marks.push({ v: O, start: cum, size: s, label: unk.includes(k) ? v : right ? "" : deg(s), kind: unk.includes(k) ? "unknown" : "given", right });
        cum += s;
      });

      const tpl = rng.int(0, 2);
      const eqNote = eq ? ` The two angles marked ${V} are equal.` : "";
      const prompt = isLine
        ? [`The angles ${L} lie on a straight line, as shown.${eqNote} Find the size of angle ${V}.`,
           `${L} are angles on a straight line.${eqNote} Work out ${V}.`,
           `In the diagram, a straight line is split into angles of ${L}.${eqNote} Find ${V}.`][tpl]
        : [`The angles ${L} meet at a point, as shown.${eqNote} Find the size of angle ${V}.`,
           `${L} are angles around a point.${eqNote} Work out ${V}.`,
           `In the diagram, angles of ${L} fit together around a point.${eqNote} Find ${V}.`][tpl];

      const fact = isLine ? "Angles on a straight line add up to 180°." : "Angles at a point add up to 360°.";
      let solution: string[];
      if (eq) {
        const r = total - S;
        solution = [fact, `The two equal angles share ${total}° − ${known.map(deg).join(" − ")} = ${deg(r)}.`, `${V} = ${deg(r)} ÷ 2 = ${deg(x)}.`];
        pushTrap(traps, x, r, `That's the total for both angles marked ${v} — share it between them.`);
        if (isLine) pushTrap(traps, x, (360 - S) / 2, "Angles on a straight line add up to 180°, not 360°.");
      } else if (isLine) {
        solution = [fact, `${V} = 180° − ${known.map(deg).join(" − ")} = ${deg(x)}.`];
        pushTrap(traps, x, 360 - S, "Angles on a straight line add up to 180°, not 360°.");
      } else {
        solution = [fact, `The known angles add up to ${known.map(deg).join(" + ")} = ${deg(S)}.`, `${V} = 360° − ${deg(S)} = ${deg(x)}.`];
        pushTrap(traps, x, 180 - S, "Angles at a point make a full turn: they add up to 360°, not 180°.");
      }
      return {
        prompt,
        answer: angleAns(x),
        solution,
        hint: isLine ? "What do angles on a straight line add up to?" : "What do the angles all the way round a point add up to?",
        traps,
        diagram: render(sc, (isLine ? `Angles on a straight line: ${listed.join(", ")}` : `Angles around a point: ${listed.join(", ")}`).replace(/\{\{|\}\}/g, "")),
      };
    },
  },
  {
    id: `${TOPIC}.name-parallel-pair`,
    topicId: TOPIC,
    title: "Name the angle pair: alternate, corresponding or co-interior",
    level: 1,
    guideRef: "parallel-lines",
    generate(rng, tier) {
      const type = rng.pick(tier === 1 ? ["corr", "alt", "coint"] : ["corr", "alt", "coint", "vo"]);
      let p1: ARef, p2: ARef;
      if (type === "corr") {
        const pos = rng.pick(POSS);
        p1 = { cross: "T", pos }; p2 = { cross: "B", pos };
      } else if (type === "alt") {
        const r = rng.bool();
        p1 = { cross: "T", pos: r ? "LL" : "LR" }; p2 = { cross: "B", pos: r ? "UR" : "UL" };
      } else if (type === "coint") {
        const r = rng.bool();
        p1 = { cross: "T", pos: r ? "LL" : "LR" }; p2 = { cross: "B", pos: r ? "UL" : "UR" };
      } else {
        const cross: Cross = rng.bool() ? "T" : "B";
        const r = rng.bool();
        p1 = { cross, pos: r ? "UR" : "UL" }; p2 = { cross, pos: r ? "LL" : "LR" };
      }
      if (rng.bool()) [p1, p2] = [p2, p1];
      const th = rng.bool() ? rng.int(50, 75) : rng.int(105, 130);
      const [l1, l2] = rng.shuffle(["a", "b", "c", "d", "e", "f", "g", "h", "p", "q", "r", "s", "t", "w", "x", "y"]).slice(0, 2);
      const A = mv(l1), B = mv(l2);
      const choices = tier === 1 ? "*alternate*, *corresponding* or *co-interior*" : "*alternate*, *corresponding*, *co-interior* or *vertically opposite*";
      const prompt = [
        `The two lines marked with arrows are parallel. What type of angle pair are angles ${A} and ${B}? Answer ${choices}.`,
        `A transversal crosses two parallel lines. Name the type of angle pair formed by ${A} and ${B}: ${choices}?`,
        `Look at angles ${A} and ${B} in the diagram (the arrows mark parallel lines). Are they ${choices} angles?`,
      ][rng.int(0, 2)];
      let accept: string[], display: string, solution: string[];
      const traps: Trap[] = [];
      if (type === "corr") {
        accept = CORR_ACCEPT; display = "corresponding angles";
        solution = [`${A} and ${B} are in matching positions at the two crossings: both are ${POS_WORDS[p1.pos]}.`, "So they are **corresponding** angles (an F shape). Corresponding angles are equal."];
        traps.push({ spec: { type: "text", accept: ["f", "f angles", "f angle", "f-angles"] }, feedback: "Right idea, but use the proper name: corresponding angles. 'F angles' won't get the mark in an exam." });
        traps.push({ spec: { type: "text", accept: ALT_ACCEPT }, feedback: "Alternate angles are both between the parallel lines, on opposite sides of the transversal. These two are in matching positions." });
      } else if (type === "alt") {
        accept = ALT_ACCEPT; display = "alternate angles";
        solution = [`${A} and ${B} are both between the parallel lines, on opposite sides of the transversal.`, "So they are **alternate** angles (a Z shape). Alternate angles are equal."];
        traps.push({ spec: { type: "text", accept: ["z", "z angles", "z angle", "z-angles"] }, feedback: "Right idea, but use the proper name: alternate angles. 'Z angles' won't get the mark in an exam." });
        traps.push({ spec: { type: "text", accept: COINT_ACCEPT }, feedback: "Co-interior angles are on the SAME side of the transversal. These two are on opposite sides." });
      } else if (type === "coint") {
        accept = COINT_ACCEPT; display = "co-interior angles";
        solution = [`${A} and ${B} are both between the parallel lines, on the same side of the transversal.`, "So they are **co-interior** angles (a C or U shape). Co-interior angles add up to 180°."];
        traps.push({ spec: { type: "text", accept: ["c", "c angles", "c angle", "u", "u angles", "u angle"] }, feedback: "Right idea, but use the proper name: co-interior angles." });
        traps.push({ spec: { type: "text", accept: ALT_ACCEPT }, feedback: "Alternate angles are on opposite sides of the transversal. These two are on the same side." });
      } else {
        accept = VO_ACCEPT; display = "vertically opposite angles";
        solution = [`${A} and ${B} are at the same crossing, directly opposite each other.`, "So they are **vertically opposite** angles. Vertically opposite angles are equal."];
        traps.push({ spec: { type: "text", accept: CORR_ACCEPT }, feedback: "Corresponding angles are at different crossings. These two are at the same crossing, opposite each other." });
      }
      return {
        prompt,
        answer: { type: "text", accept, display },
        solution,
        hint: "Are the angles at the same crossing? Are they between the parallel lines? Same side of the transversal or opposite sides?",
        traps,
        diagram: parallelSvg(th, [{ ref: p1, label: l1, kind: "unknown" }, { ref: p2, label: l2, kind: "given" }], `Two parallel lines crossed by a transversal, with angles ${l1} and ${l2} marked`),
      };
    },
  },
  {
    id: `${TOPIC}.triangle-missing-angle`,
    topicId: TOPIC,
    title: "Find the missing angle in a triangle",
    level: 1,
    guideRef: "triangles",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? ["two", "two", "right"] : tier === 2 ? ["two", "right", "half"] : ["half", "ratio", "context"]);
      const step = tier === 1 ? 5 : 1;
      const v = rng.pick(["x", "y", "a"]);
      const V = mv(v);
      const traps: Trap[] = [];

      if (kind === "ratio") {
        const pairs = [[1, 2], [1, 3], [2, 3], [1, 4], [3, 4], [2, 5], [3, 5], [4, 5], [1, 5], [2, 7]] as const;
        let a = 60, p = 1, q = 2;
        for (let i = 0; i < 200; i++) {
          const a2 = rng.int(20, 120);
          const [p2, q2] = rng.pick(pairs);
          const rem = 180 - a2;
          if (rem % (p2 + q2) !== 0 || (rem / (p2 + q2)) * p2 < 10) continue;
          a = a2; p = p2; q = q2;
          break;
        }
        const rem = 180 - a, one = rem / (p + q), ans = one * q;
        pushTrap(traps, ans, one * p, "That's the smaller of the two angles — the question asks for the larger one.");
        return {
          prompt: `One angle of a triangle is ${deg(a)}. The other two angles are in the ratio ${p} : ${q}. Find the larger of these two angles.`,
          answer: angleAns(ans),
          solution: [
            `Angles in a triangle add up to 180°, so the other two angles add up to 180° − ${deg(a)} = ${deg(rem)}.`,
            `Share ${deg(rem)} in the ratio ${p} : ${q}: that's ${p + q} parts, so one part = ${rem} ÷ ${p + q} = ${deg(one)}.`,
            `The larger angle is ${q} × ${deg(one)} = ${deg(ans)}.`,
          ],
          hint: "First find what the other two angles add up to, then share that total in the ratio.",
          traps,
        };
      }

      // Angles at [B, C, A] (bottom left, bottom right, top).
      let sizes = [60, 50, 70];
      let u = 2;
      let rightAt = -1;
      for (let i = 0; i < 200; i++) {
        let g1: number, g2: number;
        if (kind === "right") {
          g1 = 90;
          g2 = pickStep(rng, 20, 70, step);
          if (g2 === 45) continue;
        } else if (kind === "half" || kind === "context") {
          const halves = kind === "half" || rng.bool();
          g1 = halves ? rng.int(50, 250) / 2 : rng.int(25, 125);
          g2 = halves ? rng.int(50, 250) / 2 : rng.int(25, 125);
          if (kind === "half" && Number.isInteger(g1) && Number.isInteger(g2)) continue;
          if (kind === "context" && (g1 > 85 || g2 > 85)) continue;
        } else {
          g1 = pickStep(rng, 25, 130, step);
          g2 = pickStep(rng, 25, 130, step);
        }
        const x = 180 - g1 - g2;
        if (x < 25 || x === 90) continue;
        if (kind === "context") {
          sizes = [g1, g2, x];
          u = 2;
        } else {
          u = rng.int(0, 2);
          const g = rng.bool() ? [g1, g2] : [g2, g1];
          sizes = [0, 1, 2].map((k) => (k === u ? x : g.shift() as number));
        }
        rightAt = sizes.findIndex((s, k) => s === 90 && k !== u);
        break;
      }
      const x = sizes[u];
      const known = sizes.filter((_, k) => k !== u);
      const pts = triPts(sizes[0], sizes[1], sizes[2]);
      const sc = newScene();
      addPolygon(sc, pts);
      sizes.forEach((s, k) => sc.marks.push(vertexMark(pts, k, k === u ? v : k === rightAt ? "" : deg(s), k === u ? "unknown" : "given", k === rightAt)));
      const diagram = render(sc, `Triangle with angles ${known.map(deg).join(" and ")} and the unknown angle ${v}`);
      pushTrap(traps, x, 360 - known[0] - known[1], "Angles in a triangle add up to 180°, not 360°.");

      if (kind === "right") {
        const a = known.find((s) => s !== 90) as number;
        pushTrap(traps, x, 180 - a, "Don't forget the right angle: 180° − 90° − the other angle.");
        return {
          prompt: rng.bool()
            ? `A right-angled triangle has another angle of ${deg(a)}. Find the third angle, ${V}.`
            : `The diagram shows a right-angled triangle with one angle of ${deg(a)}. Work out ${V}.`,
          answer: angleAns(x),
          solution: ["Angles in a triangle add up to 180°, and the right angle uses 90° of that.", `So the other two angles add up to 90°: ${V} = 90° − ${deg(a)} = ${deg(x)}.`],
          hint: "The right angle is 90°. What's left for the other two angles?",
          traps,
          diagram,
        };
      }
      if (kind === "context") {
        const [g1, g2] = known;
        const ctx = rng.int(0, 2);
        const prompt = [
          `A triangular sail has angles of ${deg(g1)} and ${deg(g2)} at its two bottom corners. What is the angle at the top of the sail?`,
          `A roof frame is a triangle. The two sloping beams meet the flat beam at ${deg(g1)} and ${deg(g2)}. Find the angle between the sloping beams at the top.`,
          `A triangular garden bed at an HDB void deck has corners of ${deg(g1)} and ${deg(g2)}. Find the angle at its third corner.`,
        ][ctx];
        return {
          prompt,
          answer: angleAns(x),
          solution: ["The three angles of any triangle add up to 180°.", `Third angle = 180° − ${deg(g1)} − ${deg(g2)} = ${deg(x)}.`],
          hint: "The shape is a triangle — what do its three angles add up to?",
          traps,
          diagram,
        };
      }
      const [g1, g2] = known;
      const tpl = rng.int(0, 2);
      const prompt = [
        `Two angles of a triangle are ${deg(g1)} and ${deg(g2)}. Find the third angle, ${V}.`,
        `The diagram shows a triangle with angles ${deg(g1)}, ${deg(g2)} and ${V}. Work out ${V}.`,
        `Find the missing angle ${V} in a triangle whose other two angles are ${deg(g1)} and ${deg(g2)}.`,
      ][tpl];
      return {
        prompt,
        answer: angleAns(x),
        solution: ["Angles in a triangle add up to 180°.", `${V} = 180° − ${deg(g1)} − ${deg(g2)} = ${deg(x)}.`],
        hint: "What do the three angles of a triangle add up to?",
        traps,
        diagram,
      };
    },
  },
  {
    id: `${TOPIC}.regular-polygon-symmetry`,
    topicId: TOPIC,
    title: "Symmetry and tessellation of regular polygons",
    level: 1,
    guideRef: "regular-polygon-symmetry",
    generate(rng, tier) {
      const symKinds = tier === 1 ? ["lines", "order"] : ["lines", "order", "angle", "reverseLines", "reverseAngle"];
      const kind = tier === 3 && rng.bool(0.6) ? rng.pick(["fit", "gap", "combo"]) : rng.pick(symKinds);
      const ns = tier === 1 ? [3, 4, 5, 6, 8, 9, 10, 12] : [3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20];
      const n = rng.pick(ns);
      const traps: Trap[] = [];
      const int = (k: number) => 180 - 360 / k;

      if (kind === "lines") {
        const name = regName(n);
        if (n % 2 === 0) pushTrap(traps, n, n / 2, "You've only counted one kind of line. With an even number of sides, some lines go corner to corner and some go through the midpoints of opposite sides.");
        return {
          prompt: [
            `How many lines of symmetry does ${name} have?`,
            `Draw ${name} in your head. How many lines of symmetry does it have?`,
            `${capFirst(name)} is cut out of paper. How many different fold lines make one half land exactly on the other half?`,
          ][rng.int(0, 2)],
          answer: countAns(n),
          solution: [
            n % 2 === 1
              ? `With an odd number of sides, each line of symmetry goes through a corner and the midpoint of the opposite side: one line per corner.`
              : `With an even number of sides, ${n / 2} lines join opposite corners and ${n / 2} lines join midpoints of opposite sides.`,
            `So it has ${n} lines of symmetry — a regular polygon has as many lines of symmetry as sides.`,
          ],
          hint: "For a regular polygon, compare the number of lines of symmetry with the number of sides.",
          traps,
        };
      }
      if (kind === "order") {
        pushTrap(traps, n, 360 / n, "That's the angle of each turn. The order is HOW MANY turns map it onto itself in one full turn.");
        return {
          prompt: [
            `What is the order of rotational symmetry of ${regName(n)}?`,
            `${capFirst(regName(n))} is turned about its centre. What is its order of rotational symmetry?`,
            `${capFirst(regName(n))} is turned once all the way round its centre. How many times does it fit exactly onto its own outline?`,
          ][rng.int(0, 2)],
          answer: countAns(n),
          solution: [`Turning it by 360° ÷ ${n} = ${deg(360 / n)} maps it onto itself.`, `That happens ${n} times in one full turn, so the order of rotational symmetry is ${n}.`],
          hint: "How many times does it look exactly the same during one full turn?",
          traps,
        };
      }
      if (kind === "angle") {
        const e = 360 / n;
        if (n !== 4) pushTrap(traps, e, int(n), "That's the interior angle. The turn you need is 360° ÷ the number of sides.");
        pushTrap(traps, e, n, "That's the order of rotational symmetry. The question asks for the angle of the turn.");
        return {
          prompt: `${capFirst(regName(n))} is rotated about its centre. What is the smallest angle of rotation (more than 0°) that maps it onto itself?`,
          answer: angleAns(e),
          solution: [`It has rotational symmetry of order ${n}, so ${n} equal turns make a full turn of 360°.`, `Smallest turn = 360° ÷ ${n} = ${deg(e)}.`],
          hint: "How many equal turns fit into 360°?",
          traps,
        };
      }
      if (kind === "reverseLines") {
        const byLines = rng.bool();
        pushTrap(traps, n, 2 * n, byLines
          ? "A regular polygon has exactly as many lines of symmetry as sides — no doubling needed."
          : "A regular polygon's order of rotational symmetry is exactly its number of sides — no doubling needed.");
        return {
          prompt: byLines ? `A regular polygon has ${n} lines of symmetry. How many sides does it have?` : `A regular polygon has rotational symmetry of order ${n}. How many sides does it have?`,
          answer: countAns(n),
          solution: ["For a regular polygon: number of sides = number of lines of symmetry = order of rotational symmetry.", `So it has ${n} sides.`],
          hint: "For regular polygons these three numbers are always the same.",
          traps,
        };
      }
      if (kind === "reverseAngle") {
        const e = 360 / n;
        pushIntTrap(traps, n, 180 / e, "A full turn is 360°, not 180°.");
        return {
          prompt: `A regular polygon maps onto itself when it is rotated ${deg(e)} about its centre, and by no smaller angle. How many sides does it have?`,
          answer: countAns(n),
          solution: [`Equal turns of ${deg(e)} make a full turn of 360°: 360 ÷ ${num(e)} = ${n} turns.`, `So the order of rotational symmetry is ${n}, and the polygon has ${n} sides.`],
          hint: "How many turns of that size make a full turn?",
          traps,
        };
      }
      if (kind === "fit") {
        const m = rng.pick([3, 4, 6]);
        const k = 360 / int(m);
        return {
          prompt: rng.bool()
            ? `Identical ${regPlural(m)} tessellate (fit together with no gaps or overlaps). How many of them meet at each corner point?`
            : `A floor is tiled with identical ${regPlural(m)} with no gaps. How many tiles meet at each point where corners meet?`,
          answer: countAns(k),
          solution: [`Each interior angle of ${regName(m)} is 180° − 360° ÷ ${m} = ${deg(int(m))}.`, `The angles at a point add up to 360°, so ${deg(360)} ÷ ${deg(int(m))} = ${k} tiles meet there.`],
          hint: "Find one interior angle, then see how many fit into 360°.",
          traps: (() => {
            const t: Trap[] = [];
            pushTrap(t, k, m, "That's the number of sides. Use the interior angle: how many fit into 360°?");
            return t;
          })(),
        };
      }
      if (kind === "gap") {
        const m = rng.pick([5, 8, 9, 10, 12, 15, 18, 20]);
        const ia = int(m);
        const k = Math.floor(360 / ia);
        const gap = 360 - k * ia;
        const [who, pr] = rng.pick(PEOPLE);
        pushTrap(traps, gap, ia, "That's one interior angle. Now see how many fit around the point and what's left of 360°.");
        const extra = m === 8 ? " A square fits that gap exactly — that's how octagon-and-square floor tiles work." : m === 12 ? " An equilateral triangle fits that gap exactly." : "";
        return {
          prompt: `${who} tries to fit identical ${regPlural(m)} around a point with no overlaps. ${pr === "he" ? "He" : "She"} fits in as many as possible. What size is the gap left over?`,
          answer: angleAns(gap),
          solution: [
            `Each interior angle is 180° − 360° ÷ ${m} = ${deg(ia)}.`,
            `${k} fit: ${k} × ${deg(ia)} = ${deg(k * ia)} (one more would make ${deg((k + 1) * ia)}, more than 360°).`,
            `Gap = 360° − ${deg(k * ia)} = ${deg(gap)}, so these polygons can't tessellate on their own.${extra}`,
          ],
          hint: "Work out one interior angle first, then fit as many as you can into 360°.",
          traps,
        };
      }
      // combo: semi-regular vertex arrangements
      const combos: { have: [number, number][]; fill: number; ans: number }[] = [
        { have: [[1, 4]], fill: 8, ans: 2 },
        { have: [[1, 3]], fill: 12, ans: 2 },
        { have: [[2, 3]], fill: 6, ans: 2 },
        { have: [[4, 3]], fill: 6, ans: 1 },
        { have: [[3, 3]], fill: 4, ans: 2 },
        { have: [[2, 4]], fill: 3, ans: 3 },
        { have: [[1, 6], [1, 4]], fill: 12, ans: 1 },
        { have: [[1, 3], [2, 4]], fill: 6, ans: 1 },
        { have: [[2, 8]], fill: 4, ans: 1 },
        { have: [[2, 12]], fill: 3, ans: 1 },
      ];
      const c = rng.pick(combos);
      const haveText = andList(c.have.map(([cnt, m]) => (cnt === 1 ? regName(m) : `${cnt} ${regPlural(m)}`)));
      const used = c.have.reduce((s, [cnt, m]) => s + cnt * int(m), 0);
      const usedText = c.have.map(([cnt, m]) => `${cnt} × ${deg(int(m))}`).join(" + ");
      pushTrap(traps, c.ans, (360 - used), "That's the angle left over. Now divide it by one interior angle of the other shape.");
      return {
        prompt: rng.bool()
          ? `Regular polygons fit around a point with no gaps or overlaps. At the point there ${c.have.length === 1 && c.have[0][0] === 1 ? "is" : "are"} ${haveText}, and the rest of the space is filled by ${regPlural(c.fill)}. How many ${regPlural(c.fill)} are there?`
          : `A tiling pattern has ${haveText} meeting at a point, together with some ${regPlural(c.fill)}. There are no gaps. How many ${regPlural(c.fill)} meet at the point?`,
        answer: countAns(c.ans),
        solution: [
          `Interior angles: ${andList([...c.have.map(([, m]) => m), c.fill].map((m) => `${REG_NAMES[m][0]} ${deg(int(m))}`))}.`,
          `The known shapes use ${usedText} = ${deg(used)}, leaving 360° − ${deg(used)} = ${deg(360 - used)}.`,
          `${deg(360 - used)} ÷ ${deg(int(c.fill))} = ${c.ans}.`,
        ],
        hint: "Angles at a point add up to 360°. Work out each shape's interior angle.",
        traps,
      };
    },
  },

  // ======================= LEVEL 2 =======================
  {
    id: `${TOPIC}.parallel-find-angle`,
    topicId: TOPIC,
    title: "Find missing angles in parallel lines",
    level: 2,
    guideRef: "parallel-lines",
    generate(rng, tier) {
      const triangle = tier === 3 && rng.bool();
      // Avoid "angle p" next to the point P in the triangle diagram.
      const v = rng.pick(triangle ? ["x", "y", "a", "b"] : ["x", "y", "a", "b", "p"]);
      const V = mv(v);
      const traps: Trap[] = [];

      // ----- tier 3: a triangle between the parallel lines -----
      if (triangle) {
        let a = 60, b = 55;
        for (let i = 0; i < 200; i++) {
          const a2 = rng.int(45, 75), b2 = rng.int(45, 75);
          if (180 - a2 - b2 < 40) continue;
          a = a2; b = b2;
          break;
        }
        const c = 180 - a - b;
        const Q: Pt = [0, 0], P: Pt = [1 / Math.tan(a * RAD), 1], R: Pt = [1 / Math.tan(a * RAD) + 1 / Math.tan(b * RAD), 0];
        const sc = newScene();
        sc.segs.push({ a: [-0.75, 1], b: [R[0] + 0.75, 1] }, { a: [-0.75, 0], b: [R[0] + 0.75, 0] }, { a: P, b: Q }, { a: P, b: R }, { a: Q, b: R });
        sc.fills.push([Q, R, P]);
        sc.arrows.push({ p: [-0.45, 1], dir: 0, n: 1 }, { p: [-0.45, 0], dir: 0, n: 1 });
        sc.names.push({ p: P, text: "P", dir: 90 }, { p: Q, text: "Q", dir: 250 }, { p: R, text: "R", dir: 290 });
        const variant = rng.int(0, 2);
        const topLeft = (label: string, kind: MarkKind): Mark => ({ v: P, start: 180, size: a, label, kind });
        const topRight = (label: string, kind: MarkKind): Mark => ({ v: P, start: 360 - b, size: b, label, kind });
        const atP = (label: string, kind: MarkKind): Mark => ({ v: P, start: 180 + a, size: c, label, kind });
        const atQ = (label: string, kind: MarkKind): Mark => ({ v: Q, start: 0, size: a, label, kind });
        const atR = (label: string, kind: MarkKind): Mark => ({ v: R, start: 180 - b, size: b, label, kind });
        const extR = (label: string, kind: MarkKind): Mark => ({ v: R, start: 0, size: 180 - b, label, kind });
        let prompt: string, x: number, solution: string[];
        if (variant === 0) {
          sc.marks.push(atQ(deg(a), "given"), topRight(deg(b), "given"), atP(v, "unknown"));
          x = c;
          prompt = `The two lines marked with arrows are parallel. P is on the top line; Q and R are on the bottom line. Angle PQR = ${deg(a)}, and PR makes an angle of ${deg(b)} with the top line, as shown. Find angle ${V}.`;
          solution = [
            `The angle between PQ and the top line (left of P) equals angle PQR = ${deg(a)} (alternate angles).`,
            `Angles on a straight line at P add up to 180°: ${V} = 180° − ${deg(a)} − ${deg(b)} = ${deg(c)}.`,
            `(Another way: angle PRQ = ${deg(b)} by alternate angles, then angles in triangle PQR add up to 180°.)`,
          ];
        } else if (variant === 1) {
          sc.marks.push(topLeft(deg(a), "given"), atP(deg(c), "given"), atR(v, "unknown"));
          x = b;
          prompt = `The two lines marked with arrows are parallel. P is on the top line; Q and R are on the bottom line. PQ makes an angle of ${deg(a)} with the top line, and angle QPR = ${deg(c)}, as shown. Find angle ${V}.`;
          solution = [
            `Angle PQR = ${deg(a)} (alternate angles with the ${deg(a)} angle at P).`,
            `Angles in triangle PQR add up to 180°: ${V} = 180° − ${deg(a)} − ${deg(c)} = ${deg(b)}.`,
          ];
          pushTrap(traps, x, 180 - c, `That's the two angles at P beside QPR added together. Use the triangle (or the straight line at P) more carefully.`);
        } else {
          const e = 180 - b;
          sc.marks.push(topLeft(deg(a), "given"), extR(deg(e), "given"), atP(v, "unknown"));
          x = c;
          prompt = `The two lines marked with arrows are parallel. P is on the top line; Q and R are on the bottom line, which is extended past R. PQ makes an angle of ${deg(a)} with the top line, and the angle outside the triangle at R is ${deg(e)}, as shown. Find angle ${V}.`;
          solution = [
            `Angle PRQ = 180° − ${deg(e)} = ${deg(b)} (angles on a straight line).`,
            `Angle PQR = ${deg(a)} (alternate angles).`,
            `Angles in triangle PQR add up to 180°: ${V} = 180° − ${deg(a)} − ${deg(b)} = ${deg(c)}.`,
          ];
          pushTrap(traps, x, b, "That's angle PRQ — you're one step away. Now use the angles in triangle PQR.");
        }
        return {
          prompt,
          answer: angleAns(x),
          solution,
          hint: "Use alternate angles to copy an angle across the parallel lines, then use a straight line or the triangle.",
          traps,
          diagram: render(sc, `Two parallel lines with triangle PQR between them; angle ${v} is marked`, 400, 260),
        };
      }

      // ----- one transversal -----
      const step = tier === 1 ? 5 : 1;
      let th = 60;
      for (let i = 0; i < 100; i++) {
        const t = rng.bool() ? pickStep(rng, tier === 1 ? 40 : 35, 80, step) : pickStep(rng, 100, tier === 1 ? 140 : 145, step);
        if (t !== 90) { th = t; break; }
      }
      let g: ARef = { cross: "T", pos: "UR" }, u: ARef = { cross: "B", pos: "UR" };
      for (let i = 0; i < 100; i++) {
        const gc: Cross = rng.bool() ? "T" : "B";
        const g2: ARef = { cross: gc, pos: rng.pick(POSS) };
        const u2: ARef = { cross: gc === "T" ? "B" : "T", pos: rng.pick(POSS) };
        const t = pairType(g2, u2);
        if (tier === 1 && !t) continue;
        if (tier >= 2 && t && rng.bool(0.6)) continue; // favour two-step chains
        g = g2; u = u2;
        break;
      }
      const gv = posSize(g.pos, th);
      const x = posSize(u.pos, th);
      const same = gv === x;
      const t = pairType(g, u);
      let solution: string[];
      if (t === "corr") solution = [`${V} and the ${deg(gv)} angle are corresponding angles (same position at each crossing).`, `Corresponding angles are equal, so ${V} = ${deg(x)}.`];
      else if (t === "alt") solution = [`${V} and the ${deg(gv)} angle are alternate angles (between the parallel lines, on opposite sides of the transversal).`, `Alternate angles are equal, so ${V} = ${deg(x)}.`];
      else if (t === "coint") solution = [`${V} and the ${deg(gv)} angle are co-interior angles (between the parallel lines, on the same side of the transversal).`, `Co-interior angles add up to 180°, so ${V} = 180° − ${deg(gv)} = ${deg(x)}.`];
      else {
        const opp = (g.pos === "UR" && u.pos === "LL") || (g.pos === "LL" && u.pos === "UR") || (g.pos === "UL" && u.pos === "LR") || (g.pos === "LR" && u.pos === "UL");
        solution = [
          `At ${V}'s crossing, the angle in the same position as the ${deg(gv)} angle is also ${deg(gv)} (corresponding angles are equal).`,
          opp
            ? `${V} is vertically opposite that angle, so ${V} = ${deg(x)} (vertically opposite angles are equal).`
            : `${V} and that angle lie on a straight line, so ${V} = 180° − ${deg(gv)} = ${deg(x)} (angles on a straight line).`,
        ];
      }
      pushTrap(traps, x, 180 - x, same ? `These two angles are equal — look again at how they are related.` : `These two angles are not equal: one is acute and one is obtuse, so they add up to 180°.`);
      const prompt = [
        `The two lines marked with arrows are parallel. One angle is ${deg(gv)}. Find the size of angle ${V}.`,
        `A straight line crosses two parallel lines, making an angle of ${deg(gv)} as shown. Work out ${V}.`,
        `In the diagram the arrows show parallel lines. Given the ${deg(gv)} angle, find ${V}.`,
      ][rng.int(0, 2)];
      return {
        prompt,
        answer: angleAns(x),
        solution,
        hint: t ? "Is it corresponding, alternate or co-interior with the angle you know?" : "Copy the known angle to the other crossing first (corresponding angles), then use a fact at that crossing.",
        traps,
        diagram: parallelSvg(th, [{ ref: g, label: deg(gv), kind: "given" }, { ref: u, label: v, kind: "unknown" }], `Two parallel lines crossed by a transversal, with an angle of ${deg(gv)} and angle ${v} marked`),
      };
    },
  },
  {
    id: `${TOPIC}.isosceles-triangle`,
    topicId: TOPIC,
    title: "Angles in isosceles triangles",
    level: 2,
    guideRef: "triangles",
    generate(rng, tier) {
      const kind = rng.pick(tier === 3 ? ["obtuse", "exterior", "apexToBase"] : ["apexToBase", "baseToApex"]);
      const [A, B, C] = rng.pick([["A", "B", "C"], ["P", "Q", "R"], ["X", "Y", "Z"], ["K", "L", "M"]]);
      const traps: Trap[] = [];
      const ticks = (pts: Pt[]) => [{ a: pts[2], b: pts[0], n: 1 }, { a: pts[2], b: pts[1], n: 1 }];

      if (kind === "obtuse") {
        const o = rng.int(95, 150);
        const b = (180 - o) / 2;
        return {
          prompt: `An isosceles triangle has one angle of ${deg(o)}. Find the sizes of the other two angles. Give both, separated by a comma.`,
          answer: { type: "list", values: [b, b], display: `${deg(b)}, ${deg(b)}` },
          solution: [
            `A triangle can't have two obtuse angles, so the ${deg(o)} angle must be the one between the equal sides.`,
            `The other two angles are the equal base angles. They share 180° − ${deg(o)} = ${deg(180 - o)}.`,
            `Each one is ${deg(180 - o)} ÷ 2 = ${deg(b)}.`,
          ],
          hint: "Could the obtuse angle be one of the two equal angles? What would happen if it were?",
          traps: [{ spec: { type: "list", values: [180 - o, 180 - o] }, feedback: `Those two plus ${deg(o)} make more than 180°. Share 180° − ${deg(o)} between the TWO equal angles.` }],
        };
      }
      if (kind === "exterior") {
        const e = rng.int(100, 155);
        const base = 180 - e, apex = 2 * e - 180;
        const pts = triPts(base, base, apex);
        const D: Pt = [1.55, 0];
        const sc = newScene();
        addPolygon(sc, pts, [B, C, A]);
        sc.names[1].dir = 262;
        sc.segs.push({ a: pts[1], b: D });
        sc.names.push({ p: D, text: "D", dir: 270 });
        sc.ticks.push(...ticks(pts));
        sc.marks.push({ v: pts[1], start: 0, size: e, label: deg(e), kind: "given" }, vertexMark(pts, 2, "x", "unknown"));
        pushTrap(traps, apex, base, `That's angle ${A}${C}${B}, inside the triangle at ${C}. Keep going to reach angle ${B}${A}${C}.`);
        return {
          prompt: `Triangle ${A}${B}${C} is isosceles with ${A}${B} = ${A}${C}. Side ${B}${C} is extended to D, and angle ${A}${C}D = ${deg(e)}. Find angle ${B}${A}${C}, marked {{x}}.`,
          answer: angleAns(apex),
          solution: [
            `Angles on a straight line: angle ${A}${C}${B} = 180° − ${deg(e)} = ${deg(base)}.`,
            `${A}${B} = ${A}${C}, so the base angles are equal: angle ${A}${B}${C} = ${deg(base)}.`,
            `Angles in a triangle: {{x}} = 180° − 2 × ${deg(base)} = ${deg(apex)}.`,
          ],
          hint: "Find the angle inside the triangle at the extended corner first.",
          traps,
          diagram: render(sc, `Isosceles triangle ${A}${B}${C} with ${B}${C} extended to D; the outside angle at ${C} is ${deg(e)} and angle x is at ${A}`),
        };
      }

      const step = tier === 1 ? 5 : 1;
      let apex = 40;
      for (let i = 0; i < 200; i++) {
        let a2: number;
        if (kind === "apexToBase") a2 = tier === 1 ? pickStep(rng, 20, 140, 10) : rng.int(20, 140);
        else a2 = 180 - 2 * pickStep(rng, 25, 80, step);
        if (a2 === 60 || a2 < 20 || (tier === 3 && a2 % 2 === 0)) continue;
        apex = a2;
        break;
      }
      const base = (180 - apex) / 2;
      const pts = triPts(base, base, apex);
      const sc = newScene();
      addPolygon(sc, pts, [B, C, A]);
      sc.ticks.push(...ticks(pts));
      if (kind === "apexToBase") {
        sc.marks.push(vertexMark(pts, 2, apex === 90 ? "" : deg(apex), "given", apex === 90), vertexMark(pts, 0, "x", "unknown"));
        pushTrap(traps, base, 180 - apex, "That's the total for BOTH base angles — halve it.");
        return {
          prompt: `Triangle ${A}${B}${C} is isosceles with ${A}${B} = ${A}${C}. Angle ${B}${A}${C} = ${deg(apex)}. Find angle ${A}${B}${C}, marked {{x}}.${Number.isInteger(base) ? "" : " Give your answer as a decimal."}`,
          answer: Number.isInteger(base) ? angleAns(base) : { type: "number", value: base, allowFraction: false, display: deg(base) },
          solution: [
            `${A}${B} = ${A}${C}, so the base angles at ${B} and ${C} are equal.`,
            `Together they make 180° − ${deg(apex)} = ${deg(180 - apex)}.`,
            `Angle ${A}${B}${C} = ${deg(180 - apex)} ÷ 2 = ${deg(base)}.`,
          ],
          hint: "Which two angles are equal? What do they add up to together?",
          traps,
          diagram: render(sc, `Isosceles triangle ${A}${B}${C} with ${A}${B} = ${A}${C}, angle ${deg(apex)} at ${A} and angle x at ${B}`),
        };
      }
      sc.marks.push(vertexMark(pts, 0, deg(base), "given"), vertexMark(pts, 2, "x", "unknown"));
      pushTrap(traps, apex, (180 - base) / 2, `You treated ${deg(base)} as the top angle. Because ${A}${B} = ${A}${C}, the angles at ${B} and ${C} are the equal ones.`);
      pushTrap(traps, apex, 180 - base, `There are TWO equal base angles of ${deg(base)}: subtract both from 180°.`);
      return {
        prompt: `Triangle ${A}${B}${C} is isosceles with ${A}${B} = ${A}${C}. Angle ${A}${B}${C} = ${deg(base)}. Find angle ${B}${A}${C}, marked {{x}}.`,
        answer: angleAns(apex),
        solution: [
          `${A}${B} = ${A}${C}, so angle ${A}${C}${B} = angle ${A}${B}${C} = ${deg(base)}.`,
          `Angles in a triangle add up to 180°: {{x}} = 180° − 2 × ${deg(base)} = ${deg(apex)}.`,
        ],
        hint: "The equal sides tell you which two angles are equal.",
        traps,
        diagram: render(sc, `Isosceles triangle ${A}${B}${C} with ${A}${B} = ${A}${C}, angle ${deg(base)} at ${B} and angle x at ${A}`),
      };
    },
  },
  {
    id: `${TOPIC}.exterior-angle-triangle`,
    topicId: TOPIC,
    title: "Use the exterior angle of a triangle",
    level: 2,
    guideRef: "triangles",
    generate(rng, tier) {
      const kind = rng.pick(tier === 3 ? ["iso", "ratio", "findInt"] : ["findExt", "findInt"]);
      const step = tier === 1 ? 5 : 1;
      const traps: Trap[] = [];
      // a = angle BAC (top), b = angle ABC (bottom left), C interior at bottom right.
      let a = 50, b = 60;
      let k = 2;
      for (let i = 0; i < 200; i++) {
        let a2: number, b2: number;
        if (kind === "iso") {
          b2 = rng.int(50, 150) / 2;
          a2 = b2;
          if (tier === 3 && Number.isInteger(b2) && rng.bool(0.5)) continue;
        } else if (kind === "ratio") {
          k = rng.pick([2, 3, 4]);
          b2 = rng.int(20, 40);
          a2 = k * b2;
        } else {
          a2 = pickStep(rng, 25, 105, step);
          b2 = pickStep(rng, 25, 105, step);
        }
        const c2 = 180 - a2 - b2;
        if (c2 < 25 || a2 > 115 || a2 === 90 || b2 === 90 || c2 === 90) continue;
        a = a2; b = b2;
        break;
      }
      const c = 180 - a - b, e = a + b;
      const pts = triPts(b, c, a);
      const D: Pt = [1.55, 0];
      const sc = newScene();
      addPolygon(sc, pts, ["B", "C", "A"]);
      sc.names[1].dir = 262; // keep "C" clear of the exterior angle
      sc.segs.push({ a: pts[1], b: D });
      sc.names.push({ p: D, text: "D", dir: 270 });
      const ext = (label: string, kind2: MarkKind): Mark => ({ v: pts[1], start: 0, size: e, label, kind: kind2 });
      const aria = "Triangle ABC with side BC extended to D";

      if (kind === "findExt") {
        sc.marks.push(vertexMark(pts, 2, deg(a), "given"), vertexMark(pts, 0, deg(b), "given"), ext("x", "unknown"));
        pushTrap(traps, e, c, "That's angle ACB, inside the triangle. The exterior angle ACD is next to it on the straight line.");
        return {
          prompt: rng.bool()
            ? `In triangle ABC, side BC is extended to D. Angle BAC = ${deg(a)} and angle ABC = ${deg(b)}. Find the exterior angle ACD, marked {{x}}.`
            : `The diagram shows triangle ABC with BC extended to D. Use the angles ${deg(a)} and ${deg(b)} to find angle {{x}}.`,
          answer: angleAns(e),
          solution: [
            "The exterior angle of a triangle equals the sum of the two interior opposite angles.",
            `{{x}} = ${deg(a)} + ${deg(b)} = ${deg(e)}.`,
            `Check: angle ACB = 180° − ${deg(a)} − ${deg(b)} = ${deg(c)}, and ${deg(c)} + ${deg(e)} = 180° on the straight line. ✓`,
          ],
          hint: "Which two angles of the triangle are NOT next to the exterior angle?",
          traps,
          diagram: render(sc, `${aria}; angles ${deg(a)} at A and ${deg(b)} at B; angle x outside at C`),
        };
      }
      if (kind === "findInt") {
        const giveA = rng.bool();
        const known = giveA ? a : b, ans = giveA ? b : a;
        sc.marks.push(ext(deg(e), "given"), vertexMark(pts, giveA ? 2 : 0, deg(known), "given"), vertexMark(pts, giveA ? 0 : 2, "x", "unknown"));
        pushTrap(traps, ans, c, "That's angle ACB, the interior angle at C. The angle you want is the other interior opposite angle.");
        const knownName = giveA ? "BAC" : "ABC", ansName = giveA ? "ABC" : "BAC";
        return {
          prompt: `In triangle ABC, side BC is extended to D. The exterior angle ACD = ${deg(e)} and angle ${knownName} = ${deg(known)}. Find angle ${ansName}, marked {{x}}.`,
          answer: angleAns(ans),
          solution: [
            "The exterior angle equals the sum of the two interior opposite angles.",
            `So ${deg(e)} = ${deg(known)} + {{x}}.`,
            `{{x}} = ${deg(e)} − ${deg(known)} = ${deg(ans)}.`,
          ],
          hint: "The exterior angle is the sum of which two angles?",
          traps,
          diagram: render(sc, `${aria}; the exterior angle at C is ${deg(e)}`),
        };
      }
      if (kind === "iso") {
        sc.ticks.push({ a: pts[1], b: pts[2], n: 1 }, { a: pts[1], b: pts[0], n: 1 });
        sc.marks.push(ext(deg(e), "given"), vertexMark(pts, 2, "x", "unknown"));
        pushTrap(traps, a, c, "That's angle ACB, the interior angle at C.");
        pushTrap(traps, a, e, "That's the whole exterior angle — it's shared equally between two angles.");
        return {
          prompt: `Triangle ABC has CA = CB. Side BC is extended to D, and the exterior angle ACD = ${deg(e)}. Find angle BAC, marked {{x}}.${Number.isInteger(a) ? "" : " Give your answer as a decimal."}`,
          answer: Number.isInteger(a) ? angleAns(a) : { type: "number", value: a, allowFraction: false, display: deg(a) },
          solution: [
            "CA = CB, so the angles opposite these sides are equal: angle BAC = angle ABC.",
            `The exterior angle equals the sum of the interior opposite angles: 2 × {{x}} = ${deg(e)}.`,
            `{{x}} = ${deg(e)} ÷ 2 = ${deg(a)}.`,
          ],
          hint: "Which two angles are equal, and what do they add up to?",
          traps,
          diagram: render(sc, `${aria}; CA = CB; the exterior angle at C is ${deg(e)} and angle x is at A`),
        };
      }
      // ratio
      sc.marks.push(ext(deg(e), "given"), vertexMark(pts, 2, "x", "unknown"));
      pushTrap(traps, a, b, `That's angle ABC. Angle BAC is ${k} times as big.`);
      return {
        prompt: `In triangle ABC, side BC is extended to D and the exterior angle ACD = ${deg(e)}. Angle BAC is ${k} times the size of angle ABC. Find angle BAC, marked {{x}}.`,
        answer: angleAns(a),
        solution: [
          `Exterior angle = sum of the interior opposite angles, so angle BAC + angle ABC = ${deg(e)}.`,
          `That's ${k} parts + 1 part = ${k + 1} parts, so one part = ${deg(e)} ÷ ${k + 1} = ${deg(b)} (angle ABC).`,
          `Angle BAC = ${k} × ${deg(b)} = ${deg(a)}.`,
        ],
        hint: "Call angle ABC one part. How many parts make the exterior angle?",
        traps,
        diagram: render(sc, `${aria}; the exterior angle at C is ${deg(e)} and angle x is at A`),
      };
    },
  },
  {
    id: `${TOPIC}.quadrilateral-angles`,
    topicId: TOPIC,
    title: "Find missing angles in quadrilaterals",
    level: 2,
    guideRef: "quadrilaterals",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? ["general", "para"] : tier === 2 ? ["general", "para", "kite", "trap", "isoTrap"] : ["rhombusDiag", "generalEq", "kite", "isoTrap"]);
      const step = tier === 1 ? 5 : 1;
      const traps: Trap[] = [];
      const NAMES = ["A", "B", "C", "D"];
      const sc = newScene();

      if (kind === "general" || kind === "generalEq") {
        let ang = [80, 100, 95, 85];
        let unk = [2];
        let pts: Pt[] = findPolygon(ang) as Pt[];
        for (let i = 0; i < 300; i++) {
          let a4: number[];
          let u2: number[];
          if (kind === "general") {
            const g = [pickStep(rng, 60, 150, step), pickStep(rng, 60, 150, step), pickStep(rng, 60, 150, step)];
            const x = 360 - g[0] - g[1] - g[2];
            if (x < 50 || x > 150 || x === 90) continue;
            const pos = rng.int(0, 3);
            a4 = [0, 1, 2, 3].map((k) => (k === pos ? x : g.shift() as number));
            u2 = [pos];
          } else {
            const p = rng.int(60, 150), q = rng.int(60, 150), r = 360 - p - q;
            if (r % 2 !== 0) continue;
            const x = r / 2;
            if (x < 50 || x > 150 || x === 90) continue;
            if (rng.bool()) { a4 = [p, x, q, x]; u2 = [1, 3]; } else { a4 = [p, q, x, x]; u2 = [2, 3]; }
          }
          const p4 = findPolygon(a4);
          if (!p4) continue;
          ang = a4; unk = u2; pts = p4;
          break;
        }
        const x = ang[unk[0]];
        const known = ang.filter((_, k) => !unk.includes(k));
        const S = known.reduce((p, q) => p + q, 0);
        addPolygon(sc, pts);
        ang.forEach((s, k) => sc.marks.push(vertexMark(pts, k, unk.includes(k) ? "x" : s === 90 ? "" : deg(s), unk.includes(k) ? "unknown" : "given", s === 90 && !unk.includes(k))));
        const listed = andList(ang.map((s, k) => (unk.includes(k) ? "{{x}}" : deg(s))));
        if (kind === "generalEq") {
          pushTrap(traps, x, 360 - S, "That's the total for BOTH angles marked x — share it between them.");
          return {
            prompt: `A quadrilateral has angles ${listed}. The two angles marked {{x}} are equal. Find {{x}}.`,
            answer: angleAns(x),
            solution: ["Angles in a quadrilateral add up to 360°.", `The two equal angles share 360° − ${known.map(deg).join(" − ")} = ${deg(360 - S)}.`, `{{x}} = ${deg(360 - S)} ÷ 2 = ${deg(x)}.`],
            hint: "What do the angles of a quadrilateral add up to? Then split what's left equally.",
            traps,
            diagram: render(sc, `Quadrilateral with angles ${listed.replace(/\{\{|\}\}/g, "")}`),
          };
        }
        pushTrap(traps, x, 180 - S, "A quadrilateral's angles add up to 360°, not 180°.");
        return {
          prompt: rng.bool() ? `The angles of a quadrilateral are ${listed}. Find {{x}}.` : `The diagram shows a quadrilateral with angles ${listed}. Work out the size of angle {{x}}.`,
          answer: angleAns(x),
          solution: [
            "A quadrilateral splits into two triangles, so its angles add up to 2 × 180° = 360°.",
            `The known angles add up to ${known.map(deg).join(" + ")} = ${deg(S)}.`,
            `{{x}} = 360° − ${deg(S)} = ${deg(x)}.`,
          ],
          hint: "What do the four angles of any quadrilateral add up to?",
          traps,
          diagram: render(sc, `Quadrilateral with angles ${listed.replace(/\{\{|\}\}/g, "")}`),
        };
      }

      if (kind === "para") {
        let a = 70;
        for (let i = 0; i < 100; i++) {
          const a2 = pickStep(rng, 40, 140, step);
          if (Math.abs(a2 - 90) >= 10) { a = a2; break; }
        }
        const ang = [a, 180 - a, a, 180 - a];
        const pts = polygonFromAngles(ang, [1.5, 1]) as Pt[];
        addPolygon(sc, pts, NAMES);
        sc.arrows.push(
          { p: [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2], dir: 0, n: 1 },
          { p: [(pts[3][0] + pts[2][0]) / 2, (pts[3][1] + pts[2][1]) / 2], dir: 0, n: 1 },
          { p: [(pts[0][0] + pts[3][0]) / 2, (pts[0][1] + pts[3][1]) / 2], dir: dirOf(pts[0], pts[3]), n: 2 },
          { p: [(pts[1][0] + pts[2][0]) / 2, (pts[1][1] + pts[2][1]) / 2], dir: dirOf(pts[1], pts[2]), n: 2 },
        );
        const ask = rng.pick([1, 2, 3]);
        const askName = ["DAB", "ABC", "BCD", "CDA"][ask];
        const x = ang[ask];
        sc.marks.push(vertexMark(pts, 0, deg(a), "given"), vertexMark(pts, ask, "x", "unknown"));
        let solution: string[];
        if (ask === 2) {
          solution = ["Opposite angles of a parallelogram are equal.", `Angle BCD = angle DAB = ${deg(a)}.`, `(Why: angle ABC = 180° − ${deg(a)} = ${deg(180 - a)} (co-interior, AD ∥ BC), and then angle BCD = 180° − ${deg(180 - a)} = ${deg(a)} (co-interior, AB ∥ DC).)`];
          pushTrap(traps, x, 180 - a, "Opposite angles of a parallelogram are equal. It's neighbouring angles that add up to 180°.");
        } else {
          solution = [
            `${ask === 1 ? "AD is parallel to BC" : "AB is parallel to DC"}, so angles DAB and ${askName} are co-interior angles.`,
            `Co-interior angles add up to 180°: {{x}} = 180° − ${deg(a)} = ${deg(x)}.`,
          ];
          pushTrap(traps, x, a, "Neighbouring angles of a parallelogram are not equal — they are co-interior, so they add up to 180°.");
        }
        return {
          prompt: `ABCD is a parallelogram. Angle DAB = ${deg(a)}. Find angle ${askName}, marked {{x}}.`,
          answer: angleAns(x),
          solution,
          hint: "Opposite angles of a parallelogram are equal; neighbouring angles are co-interior.",
          traps,
          diagram: render(sc, `Parallelogram ABCD with angle ${deg(a)} at A and angle x at ${NAMES[ask]}`),
        };
      }

      if (kind === "kite") {
        let A = 70, C = 110;
        for (let i = 0; i < 200; i++) {
          const a2 = rng.int(40, 140), c2 = rng.int(40, 140);
          const b2 = (360 - a2 - c2) / 2;
          if (!Number.isInteger(b2) || Math.abs(a2 - c2) < 20 || b2 < 50 || b2 > 140 || b2 === 90) continue;
          A = a2; C = c2;
          break;
        }
        const Bv = (360 - A - C) / 2;
        const raw = polygonFromAngles([A, Bv, C, Bv], [1, Math.sin((A / 2) * RAD) / Math.sin((C / 2) * RAD)]) as Pt[];
        const pts = rotatePts(raw, 90 - A / 2);
        addPolygon(sc, pts, NAMES);
        sc.ticks.push({ a: pts[0], b: pts[1], n: 1 }, { a: pts[0], b: pts[3], n: 1 }, { a: pts[1], b: pts[2], n: 2 }, { a: pts[3], b: pts[2], n: 2 });
        sc.marks.push(vertexMark(pts, 0, deg(A), "given"), vertexMark(pts, 2, deg(C), "given"), vertexMark(pts, 1, "x", "unknown"));
        pushTrap(traps, Bv, 360 - A - C, "That's the total for BOTH equal angles of the kite — halve it.");
        return {
          prompt: `ABCD is a kite with AB = AD and CB = CD. Angle DAB = ${deg(A)} and angle BCD = ${deg(C)}. Find angle ABC, marked {{x}}.`,
          answer: angleAns(Bv),
          solution: [
            "The kite is symmetrical about the diagonal AC, so angle ABC = angle ADC.",
            `Angles in a quadrilateral add up to 360°: the two equal angles share 360° − ${deg(A)} − ${deg(C)} = ${deg(360 - A - C)}.`,
            `{{x}} = ${deg(360 - A - C)} ÷ 2 = ${deg(Bv)}.`,
          ],
          hint: "Which two angles of a kite are equal? Use the line of symmetry.",
          traps,
          diagram: render(sc, `Kite ABCD with angle ${deg(A)} at A, ${deg(C)} at C and angle x at B`),
        };
      }

      if (kind === "trap" || kind === "isoTrap") {
        let a = 70, b = 60;
        let pts: Pt[] | null = null;
        for (let i = 0; i < 300; i++) {
          const a2 = pickStep(rng, 50, 130, step);
          const b2 = kind === "isoTrap" ? a2 : pickStep(rng, 50, 130, step);
          if (a2 === 90 || b2 === 90 || (kind === "trap" && Math.abs(a2 - b2) < 10)) continue;
          if (kind === "isoTrap" && a2 > 85) continue;
          const angs = [a2, b2, 180 - b2, 180 - a2];
          const p = kind === "isoTrap" ? polygonFromAngles(angs, [1.7, 0.75]) : findPolygon(angs);
          if (!p) continue;
          a = a2; b = b2; pts = p;
          break;
        }
        if (!pts) {
          // Safe fallback (not reached in practice): a known-good shape.
          a = 70; b = kind === "isoTrap" ? 70 : 60;
          pts = (kind === "isoTrap" ? polygonFromAngles([70, 70, 110, 110], [1.7, 0.75]) : findPolygon([70, 60, 120, 110])) as Pt[];
        }
        const ang = [a, b, 180 - b, 180 - a];
        addPolygon(sc, pts, NAMES);
        sc.arrows.push(
          { p: [(pts[0][0] + pts[1][0]) / 2, (pts[0][1] + pts[1][1]) / 2], dir: 0, n: 1 },
          { p: [(pts[3][0] + pts[2][0]) / 2, (pts[3][1] + pts[2][1]) / 2], dir: dirOf(pts[3], pts[2]), n: 1 },
        );
        if (kind === "isoTrap") {
          sc.ticks.push({ a: pts[0], b: pts[3], n: 1 }, { a: pts[1], b: pts[2], n: 1 });
          const ask = rng.pick([1, 2, 3]);
          const askName = ["DAB", "ABC", "BCD", "CDA"][ask];
          const x = ang[ask];
          sc.marks.push(vertexMark(pts, 0, deg(a), "given"), vertexMark(pts, ask, "x", "unknown"));
          const solution = ask === 1
            ? ["An isosceles trapezium is symmetrical, so the two angles at the ends of AB are equal.", `Angle ABC = angle DAB = ${deg(a)}.`]
            : ask === 3
              ? ["AB ∥ DC, so angles DAB and CDA are co-interior angles.", `Co-interior angles add up to 180°: {{x}} = 180° − ${deg(a)} = ${deg(x)}.`]
              : [`By symmetry, angle ABC = angle DAB = ${deg(a)}.`, "AB ∥ DC, so angles ABC and BCD are co-interior angles.", `{{x}} = 180° − ${deg(a)} = ${deg(x)}.`];
          pushTrap(traps, x, 180 - x, ask === 1 ? "The angles at the two ends of a parallel side are EQUAL in an isosceles trapezium (it's symmetrical)." : "Angles between the two parallel sides on the same slanted side are co-interior: they add up to 180°.");
          return {
            prompt: `ABCD is an isosceles trapezium with AB parallel to DC and AD = BC. Angle DAB = ${deg(a)}. Find angle ${askName}, marked {{x}}.`,
            answer: angleAns(x),
            solution,
            hint: "Use the symmetry for angles at the same end of a parallel side, and co-interior angles across the parallel sides.",
            traps,
            diagram: render(sc, `Isosceles trapezium ABCD with angle ${deg(a)} at A and angle x at ${NAMES[ask]}`),
          };
        }
        const askD = rng.bool();
        const x = askD ? 180 - a : 180 - b;
        const pair = askD ? ["DAB", "CDA", a] as const : ["ABC", "BCD", b] as const;
        sc.marks.push(vertexMark(pts, 0, deg(a), "given"), vertexMark(pts, 1, deg(b), "given"), vertexMark(pts, askD ? 3 : 2, "x", "unknown"));
        pushTrap(traps, x, pair[2], "These two angles are co-interior (between the parallel sides), so they add up to 180° — they aren't equal.");
        return {
          prompt: `ABCD is a trapezium with AB parallel to DC. Angle DAB = ${deg(a)} and angle ABC = ${deg(b)}. Find angle ${pair[1]}, marked {{x}}.`,
          answer: angleAns(x),
          solution: [`AB ∥ DC, so angles ${pair[0]} and ${pair[1]} are co-interior angles.`, `Co-interior angles add up to 180°: {{x}} = 180° − ${deg(pair[2])} = ${deg(x)}.`],
          hint: "Look for co-interior angles between the parallel sides.",
          traps,
          diagram: render(sc, `Trapezium ABCD with AB parallel to DC, angles ${deg(a)} at A and ${deg(b)} at B, and angle x at ${askD ? "D" : "C"}`),
        };
      }

      // rhombusDiag
      let b = 70;
      for (let i = 0; i < 100; i++) {
        const b2 = 2 * rng.int(20, 70);
        if (Math.abs(b2 - 90) >= 10) { b = b2; break; }
      }
      const x = (180 - b) / 2;
      const pts = polygonFromAngles([180 - b, b, 180 - b, b], [1, 1]) as Pt[];
      addPolygon(sc, pts, NAMES);
      sc.segs.push({ a: pts[0], b: pts[2], thin: true });
      sc.ticks.push({ a: pts[0], b: pts[1], n: 1 }, { a: pts[1], b: pts[2], n: 1 }, { a: pts[2], b: pts[3], n: 1 }, { a: pts[3], b: pts[0], n: 1 });
      sc.marks.push(vertexMark(pts, 1, deg(b), "given"), { v: pts[0], start: 0, size: dirOf(pts[0], pts[2]), label: "x", kind: "unknown" });
      pushTrap(traps, x, 180 - b, "That's the whole angle DAB. The diagonal AC cuts it exactly in half.");
      return {
        prompt: `ABCD is a rhombus and AC is a diagonal. Angle ABC = ${deg(b)}. Find angle BAC, marked {{x}}.`,
        answer: angleAns(x),
        solution: [
          "All four sides of a rhombus are equal, so BA = BC and triangle ABC is isosceles.",
          `Angles BAC and BCA are equal and share 180° − ${deg(b)} = ${deg(180 - b)}.`,
          `{{x}} = ${deg(180 - b)} ÷ 2 = ${deg(x)}.`,
        ],
        hint: "Look at triangle ABC. Which of its sides are equal?",
        traps,
        diagram: render(sc, `Rhombus ABCD with diagonal AC, angle ${deg(b)} at B and angle x between AB and AC`),
      };
    },
  },
  {
    id: `${TOPIC}.name-quadrilateral`,
    topicId: TOPIC,
    title: "Identify a quadrilateral from its properties",
    level: 2,
    guideRef: "quadrilaterals",
    generate(rng, tier) {
      const pool = CLUES.filter((c) => (tier === 1 ? !c.hard : tier === 3 ? c.hard : true));
      const clue = rng.pick(pool);
      const [who, pr] = rng.pick(PEOPLE);
      const prompt = [
        `I am a quadrilateral with ${clue.text}. What is my most specific name?`,
        `A quadrilateral has ${clue.text}. What type of quadrilateral must it be? Give the most specific name.`,
        `Which special quadrilateral has ${clue.text}? Give its most specific name.`,
        `${who} draws a quadrilateral with ${clue.text}. What is the most specific name for ${pr === "he" ? "his" : "her"} shape?`,
      ][rng.int(0, 3)];
      return {
        prompt,
        answer: { type: "text", accept: QUAD_ACCEPT[clue.shape], display: clue.shape },
        solution: [clue.why, `Most specific name: **${clue.shape}**.`],
        hint: "Start with the family the first clue allows, then use each other clue to rule shapes out.",
        traps: [{ spec: { type: "text", accept: QUAD_ACCEPT[clue.trap[0]] }, feedback: clue.trap[1] }],
      };
    },
  },
  {
    id: `${TOPIC}.polygon-angle-sum`,
    topicId: TOPIC,
    title: "Interior angle sum of a polygon",
    level: 2,
    guideRef: "polygon-angles",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? ["sum", "missing"] : tier === 2 ? ["sum", "missing", "missing"] : ["sides", "missingEq", "missing"]);
      const traps: Trap[] = [];

      if (kind === "sum") {
        const n = tier === 1 ? rng.int(5, 10) : rng.int(5, 20);
        const S = (n - 2) * 180;
        const name = POLY_NAMES[n] ? `${withArt(POLY_NAMES[n])} (${n} sides)` : `a polygon with ${n} sides`;
        pushTrap(traps, S, n * 180, `That's ${n} × 180°. From one corner you can only draw ${n - 2} triangles, so use (n − 2) × 180°.`);
        return {
          prompt: rng.bool() ? `Work out the sum of the interior angles of ${name}.` : `What do the interior angles of ${name} add up to?`,
          answer: { type: "number", value: S, display: `${big(S)}°` },
          solution: [
            `Diagonals from one corner split a polygon with ${n} sides into ${n} − 2 = ${n - 2} triangles.`,
            `Each triangle's angles add up to 180°, so the sum is ${n - 2} × 180° = ${big(S)}°.`,
          ],
          hint: "How many triangles can you split it into by drawing diagonals from one corner?",
          traps,
        };
      }
      if (kind === "sides") {
        const n = rng.int(5, 24);
        const S = (n - 2) * 180;
        pushTrap(traps, n, n - 2, "That's the number of triangles. The number of sides is 2 more.");
        return {
          prompt: `The interior angles of a polygon add up to ${big(S)}°. How many sides does the polygon have?`,
          answer: countAns(n),
          solution: [`(n − 2) × 180 = ${big(S)}.`, `n − 2 = ${big(S)} ÷ 180 = ${n - 2}.`, `n = ${n - 2} + 2 = ${n}.`],
          hint: "Use (n − 2) × 180° and work backwards.",
          traps,
        };
      }
      // missing angle(s) in an irregular convex polygon
      const n = kind === "missing" ? (tier === 1 ? 5 : tier === 2 ? rng.pick([5, 6]) : rng.pick([6, 7, 8])) : rng.pick([5, 6]);
      const S = (n - 2) * 180;
      const mean = S / n;
      const step = tier === 1 ? 5 : 1;
      let ang: number[] = Array.from({ length: n }, () => mean);
      let unk: number[] = [0];
      let pts: Pt[] | null = null;
      for (let i = 0; i < 400; i++) {
        const a2: number[] = [];
        let u2: number[];
        if (kind === "missing") {
          for (let k = 0; k < n - 1; k++) a2.push(pickStep(rng, Math.max(60, mean - 35), Math.min(165, mean + 30), step));
          const x = S - a2.reduce((p, q) => p + q, 0);
          if (x < Math.max(60, mean - 40) || x > Math.min(165, mean + 35) || x === 90) continue;
          const pos = rng.int(0, n - 1);
          a2.splice(pos, 0, x);
          u2 = [pos];
        } else {
          for (let k = 0; k < n - 2; k++) a2.push(rng.int(Math.max(60, Math.ceil(mean - 30)), Math.min(165, Math.floor(mean + 30))));
          const r = S - a2.reduce((p, q) => p + q, 0);
          if (r % 2 !== 0) continue;
          const x = r / 2;
          if (x < mean - 35 || x > Math.min(165, mean + 35) || x === 90) continue;
          const p1 = rng.int(0, n - 1);
          let p2 = rng.int(0, n - 2);
          if (p2 >= p1) p2++;
          const full: number[] = [];
          let j = 0;
          for (let k = 0; k < n; k++) full.push(k === p1 || k === p2 ? x : a2[j++]);
          a2.length = 0;
          a2.push(...full);
          u2 = [Math.min(p1, p2), Math.max(p1, p2)];
        }
        if (a2.some((t) => t === 180)) continue;
        const p = findPolygon(a2);
        if (!p) continue;
        ang = a2; unk = u2; pts = p;
        break;
      }
      if (!pts) {
        ang = n === 5 ? [100, 110, 120, 95, 115] : n === 6 ? [110, 130, 120, 115, 125, 120] : n === 7 ? [120, 130, 125, 135, 130, 120, 140] : [130, 140, 135, 135, 140, 130, 135, 135];
        unk = kind === "missing" ? [1] : [1, 4];
        if (kind === "missingEq") ang = n === 5 ? [100, 110, 120, 100, 110] : [110, 125, 120, 115, 125, 125];
        pts = findPolygon(ang) as Pt[];
      }
      const x = ang[unk[0]];
      const known = ang.filter((_, k) => !unk.includes(k));
      const K = known.reduce((p, q) => p + q, 0);
      const name = POLY_NAMES[n];
      const sc = newScene();
      addPolygon(sc, pts);
      ang.forEach((s, k) => sc.marks.push(vertexMark(pts as Pt[], k, unk.includes(k) ? "x" : deg(s), unk.includes(k) ? "unknown" : "given")));
      const listed = andList(ang.map((s, k) => (unk.includes(k) ? "{{x}}" : deg(s))));
      const diagram = render(sc, `${capFirst(withArt(name))} with angles ${listed.replace(/\{\{|\}\}/g, "")}`, 360, 260);
      const sumStep = `${capFirst(withArt(name))} has ${n} sides, so it splits into ${n - 2} triangles: angle sum = (${n} − 2) × 180° = ${big(S)}°.`;
      if (kind === "missingEq") {
        pushTrap(traps, x, S - K, "That's the total for BOTH angles marked x — share it between them.");
        return {
          prompt: `${capFirst(withArt(name))} has angles ${listed}. The two angles marked {{x}} are equal. Find {{x}}.`,
          answer: angleAns(x),
          solution: [sumStep, `The known angles add up to ${known.map(deg).join(" + ")} = ${deg(K)}.`, `The two equal angles share ${big(S)}° − ${deg(K)} = ${deg(S - K)}, so {{x}} = ${deg(S - K)} ÷ 2 = ${deg(x)}.`],
          hint: `First find the angle sum of ${withArt(name)}.`,
          traps,
          diagram,
        };
      }
      pushTrap(traps, x, n * 180 - K, `It looks like you used ${n} × 180°. The angle sum is (n − 2) × 180°.`);
      return {
        prompt: rng.bool() ? `${capFirst(withArt(name))} has interior angles of ${listed}. Find {{x}}.` : `The diagram shows ${withArt(name)} with angles ${listed}. Work out the size of angle {{x}}.`,
        answer: angleAns(x),
        solution: [sumStep, `The known angles add up to ${known.map(deg).join(" + ")} = ${deg(K)}.`, `{{x}} = ${big(S)}° − ${deg(K)} = ${deg(x)}.`],
        hint: `First find the angle sum of ${withArt(name)} using (n − 2) × 180°.`,
        traps,
        diagram,
      };
    },
  },

  // ======================= LEVEL 3 =======================
  {
    id: `${TOPIC}.regular-polygon-angles`,
    topicId: TOPIC,
    title: "Interior and exterior angles of regular polygons",
    level: 3,
    guideRef: "polygon-angles",
    generate(rng, tier) {
      const kind = rng.pick(tier === 1 ? ["ext", "int", "nFromExt"] : tier === 2 ? ["ext", "int", "nFromExt", "nFromInt"] : ["nFromInt", "ratio", "sumToEach", "nFromExt"]);
      const traps: Trap[] = [];
      const nSet = tier === 1 ? [4, 5, 6, 8, 9, 10, 12] : tier === 2 ? [5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36] : [8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72];
      const n = rng.pick(nSet);
      const e = 360 / n, ia = 180 - e;
      const [who, pr] = rng.pick(PEOPLE);

      if (kind === "ext") {
        pushTrap(traps, e, ia, "That's the interior angle. The exterior angle is 360° ÷ the number of sides.");
        pushTrap(traps, e, 180 / n, "The exterior angles add up to 360°, not 180°.");
        return {
          prompt: [
            `What is the size of each exterior angle of ${regName(n)}?`,
            `${capFirst(regName(n))} has equal exterior angles. Find the size of one of them.`,
            `${who} walks once round the edge of ${regName(n)}, turning the same amount at every corner. Through what angle does ${pr} turn at each corner?`,
          ][rng.int(0, 2)],
          answer: angleAns(e),
          solution: ["Walking all the way round any polygon you turn through 360°, so the exterior angles add up to 360°.", `The ${n} exterior angles are equal: each is 360° ÷ ${n} = ${deg(e)}.`],
          hint: "What do the exterior angles of any polygon add up to?",
          traps,
        };
      }
      if (kind === "int") {
        if (n !== 4) pushTrap(traps, ia, e, "That's the exterior angle. The interior angle is 180° minus it.");
        pushTrap(traps, ia, (n - 2) * 180, `That's the SUM of all ${n} interior angles. Divide by ${n} to get one.`);
        return {
          prompt: [
            `Find the size of each interior angle of ${regName(n)}.`,
            `What is the size of one interior angle of ${regName(n)}?`,
            `A floor tile is shaped like ${regName(n)}. What is the size of each angle inside the tile?`,
          ][rng.int(0, REG_NAMES[n] ? 2 : 1)],
          answer: angleAns(ia),
          solution: [`Each exterior angle = 360° ÷ ${n} = ${deg(e)}.`, `Interior and exterior angles lie on a straight line: interior = 180° − ${deg(e)} = ${deg(ia)}.`, `(Or: sum = (${n} − 2) × 180° = ${big((n - 2) * 180)}°, and ${big((n - 2) * 180)}° ÷ ${n} = ${deg(ia)}.)`],
          hint: "Find the exterior angle first — it's quicker.",
          traps,
        };
      }
      if (kind === "nFromExt") {
        pushIntTrap(traps, n, 180 / e, "The exterior angles add up to 360°, not 180°.");
        pushIntTrap(traps, n, 360 / ia, "Divide 360° by the EXTERIOR angle, not the interior angle.");
        return {
          prompt: `Each exterior angle of a regular polygon is ${deg(e)}. How many sides does the polygon have?`,
          answer: countAns(n),
          solution: ["The exterior angles of a polygon add up to 360°.", `Number of sides = 360° ÷ ${deg(e)} = ${n}.`],
          hint: "How many equal exterior angles fit into 360°?",
          traps,
        };
      }
      if (kind === "nFromInt") {
        pushTrap(traps, n, e, "That's the exterior angle. Now divide 360° by it to get the number of sides.");
        pushIntTrap(traps, n, 360 / ia, "Divide 360° by the EXTERIOR angle, not the interior angle.");
        return {
          prompt: `Each interior angle of a regular polygon is ${deg(ia)}. How many sides does it have?`,
          answer: countAns(n),
          solution: [`Exterior angle = 180° − ${deg(ia)} = ${deg(e)}.`, `Number of sides = 360° ÷ ${deg(e)} = ${n}.`],
          hint: "Turn the interior angle into an exterior angle first.",
          traps,
        };
      }
      if (kind === "ratio") {
        const k = rng.pick([2, 3, 4, 5, 8, 9, 11, 14, 17]);
        const e2 = 180 / (k + 1), n2 = 360 / e2;
        pushTrap(traps, n2, e2, "That's the exterior angle. Now divide 360° by it.");
        pushTrap(traps, n2, k * e2, "That's the interior angle. The number of sides is 360° ÷ the exterior angle.");
        return {
          prompt: `In a regular polygon, each interior angle is ${k} times the size of each exterior angle. How many sides does the polygon have?`,
          answer: countAns(n2),
          solution: [
            "At each corner, the interior and exterior angles lie on a straight line, so they add up to 180°.",
            `Call the exterior angle e: ${k}e + e = 180°, so ${k + 1}e = 180° and e = ${deg(e2)}.`,
            `Number of sides = 360° ÷ ${deg(e2)} = ${n2}.`,
          ],
          hint: "Interior + exterior = 180°. Call the exterior angle e.",
          traps,
        };
      }
      // sumToEach
      const m = rng.pick([5, 6, 8, 9, 10, 12, 15, 18, 20]);
      const S = (m - 2) * 180, each = S / m;
      pushTrap(traps, each, m, "That's the number of sides. Now share the total between them.");
      pushTrap(traps, each, 360 / m, "That's the exterior angle. The interior angle is 180° minus it.");
      return {
        prompt: `The interior angles of a regular polygon add up to ${big(S)}°. Find the size of each interior angle.`,
        answer: angleAns(each),
        solution: [`(n − 2) × 180 = ${big(S)}, so n − 2 = ${big(S)} ÷ 180 = ${m - 2} and the polygon has n = ${m} sides.`, `It's regular, so the angles are equal: each = ${big(S)}° ÷ ${m} = ${deg(each)}.`],
        hint: "First work out how many sides it has.",
        traps,
      };
    },
  },
  {
    id: `${TOPIC}.angle-algebra`,
    topicId: TOPIC,
    title: "Form and solve equations with angle facts",
    level: 3,
    guideRef: "angle-proofs",
    generate(rng, tier) {
      type Ctx = "line" | "point" | "vo" | "tri" | "ext" | "coint" | "alt" | "quad";
      const ctx: Ctx = rng.pick(tier === 1 ? (["line", "vo", "tri"] as Ctx[]) : (["line", "point", "vo", "tri", "ext", "coint", "alt", "quad"] as Ctx[]));
      const V = rng.pick(["x", "y"]);
      const maxCoef = tier === 1 ? 3 : 5;
      const traps: Trap[] = [];
      const ex = (a: number, b: number) => poly([[a, V], [b, ""]]);
      const show = (a: number, b: number) => (b === 0 ? `{{${ex(a, b)}}}°` : `({{${ex(a, b)}}})°`);
      const isEqual = ctx === "vo" || ctx === "alt";

      // Each angle is coef*x + const. For "ext" the last expression is the exterior angle.
      let x = 20;
      let co: number[] = [1, 2];
      let cs: number[] = [40, 80];
      for (let i = 0; i < 400; i++) {
        const x2 = rng.int(tier === 1 ? 6 : 5, tier === 1 ? 30 : 40);
        if (isEqual) {
          const a1 = rng.int(1, maxCoef + 1), a2 = rng.int(1, maxCoef + 1);
          const ang = rng.int(25, 155);
          if (a1 === a2 || ang === 90) continue;
          const b1 = ang - a1 * x2, b2 = ang - a2 * x2;
          if (Math.abs(b1) > 70 || Math.abs(b2) > 70 || (tier === 1 && (b1 < -20 || b2 < -20))) continue;
          x = x2; co = [a1, a2]; cs = [b1, b2];
          break;
        }
        if (ctx === "ext") {
          const a1 = rng.int(1, maxCoef), a2 = rng.int(1, maxCoef), a3 = rng.int(1, maxCoef + 2);
          if (a3 === a1 + a2) continue;
          const P = rng.int(25, 105), Q = rng.int(25, 105);
          if (P + Q > 155) continue;
          const b1 = P - a1 * x2, b2 = Q - a2 * x2, b3 = P + Q - a3 * x2;
          if ([b1, b2, b3].some((b) => Math.abs(b) > 70)) continue;
          x = x2; co = [a1, a2, a3]; cs = [b1, b2, b3];
          break;
        }
        const k = ctx === "line" ? (tier === 1 ? 2 : rng.int(2, 3)) : ctx === "point" ? rng.int(3, 4) : ctx === "tri" ? 3 : ctx === "coint" ? 2 : 4;
        const T = ctx === "point" || ctx === "quad" ? 360 : 180;
        const [lo, hi] = ctx === "point" ? [30, 200] : ctx === "quad" ? [50, 170] : ctx === "coint" ? [30, 150] : ctx === "tri" ? [20, 140] : [20, 160];
        const a: number[] = [], b: number[] = [];
        let sum = 0;
        let bad = false;
        for (let j = 0; j < k - 1; j++) {
          const aj = rng.int(1, maxCoef);
          const bj = tier === 1 ? rng.int(0, 50) : rng.int(-25, 70);
          const angle = aj * x2 + bj;
          if (angle < lo || angle > hi) { bad = true; break; }
          a.push(aj); b.push(bj); sum += angle;
        }
        if (bad) continue;
        const last = T - sum;
        const ak = rng.int(1, maxCoef);
        const bk = last - ak * x2;
        if (last < lo || last > hi || Math.abs(bk) > 70 || (tier === 1 && bk < 0)) continue;
        a.push(ak); b.push(bk);
        x = x2; co = a; cs = b;
        break;
      }
      const angles = co.map((a, j) => a * x + cs[j]);
      const exprs = co.map((a, j) => show(a, cs[j]));
      const ask3 = tier === 3;
      let ask: string;
      let answerVal: number;
      if (!ask3) {
        ask = rng.bool() ? `Find ${mv(V)}.` : `Form an equation and solve it to find ${mv(V)}.`;
        answerVal = x;
      } else if (isEqual) {
        ask = "Find the size of each of these angles.";
        answerVal = angles[0];
      } else if (ctx === "ext") {
        ask = "Find the size of the exterior angle ACD.";
        answerVal = angles[2];
      } else {
        ask = "Work out the size of the largest of these angles.";
        answerVal = Math.max(...angles);
      }
      const L = andList(exprs);
      const prompt = {
        line: `The angles ${L} lie on a straight line. ${ask}`,
        point: `The angles ${L} meet at a point. ${ask}`,
        vo: `Two straight lines cross. A pair of vertically opposite angles are ${exprs[0]} and ${exprs[1]}. ${ask}`,
        tri: `The angles of a triangle are ${L}. ${ask}`,
        ext: `In triangle ABC, side BC is extended to D. Angle BAC = ${exprs[0]}, angle ABC = ${exprs[1]} and the exterior angle ACD = ${exprs[2]}. ${ask}`,
        coint: `A straight line crosses two parallel lines, making a pair of co-interior angles of ${exprs[0]} and ${exprs[1]}. ${ask}`,
        alt: `A straight line crosses two parallel lines, making a pair of alternate angles of ${exprs[0]} and ${exprs[1]}. ${ask}`,
        quad: `The angles of a quadrilateral are ${L}. ${ask}`,
      }[ctx];
      const fact = {
        line: "Angles on a straight line add up to 180°.",
        point: "Angles at a point add up to 360°.",
        vo: "Vertically opposite angles are equal.",
        tri: "Angles in a triangle add up to 180°.",
        ext: "The exterior angle of a triangle equals the sum of the two interior opposite angles.",
        coint: "Co-interior angles add up to 180°.",
        alt: "Alternate angles are equal.",
        quad: "Angles in a quadrilateral add up to 360°.",
      }[ctx];
      const solution: string[] = [fact];
      // Reduce to (A)x = R with A > 0.
      let A: number, R: number;
      if (isEqual || ctx === "ext") {
        const [la, lb] = isEqual ? [co[0], cs[0]] : [co[2], cs[2]];
        const [ra, rb] = isEqual ? [co[1], cs[1]] : [co[0] + co[1], cs[0] + cs[1]];
        solution.push(`So {{${ex(la, lb)} = ${isEqual ? ex(ra, rb) : `${ex(co[0], cs[0])} + ${ex(co[1], cs[1])}`}}}.`);
        if (!isEqual) solution.push(`Collect like terms on the right: {{${ex(la, lb)} = ${ex(ra, rb)}}}.`);
        if (la > ra) { A = la - ra; R = rb - lb; } else { A = ra - la; R = lb - rb; }
        if (A !== 1) solution.push(`Get the ${V} terms on one side: {{${ex(A, 0)} = ${R}}}.`);
      } else {
        const T = ctx === "point" || ctx === "quad" ? 360 : 180;
        const SA = co.reduce((p, q) => p + q, 0), SB = cs.reduce((p, q) => p + q, 0);
        solution.push(`So {{${co.map((a, j) => (cs[j] === 0 ? ex(a, 0) : `(${ex(a, cs[j])})`)).join(" + ")} = ${T}}}.`);
        solution.push(`Collect like terms: {{${ex(SA, SB)} = ${T}}}${SB !== 0 ? `, so {{${ex(SA, 0)} = ${T - SB}}}` : ""}.`);
        A = SA; R = T - SB;
        // Trap: used the wrong total (180 ↔ 360).
        if (!ask3 && ctx !== "coint") {
          const wrongT = T === 180 ? 360 : 180;
          const xw = (wrongT - SB) / SA;
          if (Number.isInteger(xw)) pushTrap(traps, x, xw, T === 180 ? "These angles add up to 180°, not 360°." : "These angles add up to 360°, not 180°.");
        }
      }
      solution.push(A === 1 ? `Get the ${V} terms on one side: {{${V} = ${x}}}` : `Divide by ${A}: {{${V} = ${R} ÷ ${A} = ${x}}}`);
      if (ask3) {
        solution.push(`Substitute ${mv(`${V} = ${x}`)}: the angles are ${andList(angles.map(deg))}.`);
        solution.push(isEqual ? `Each angle is ${deg(answerVal)}.` : ctx === "ext" ? `Angle ACD = ${deg(answerVal)} (check: ${deg(angles[0])} + ${deg(angles[1])} = ${deg(angles[2])} ✓).` : `The largest angle is ${deg(answerVal)}.`);
        pushTrap(traps, answerVal, x, `That's the value of ${V}. Substitute it back in to find the angle.`);
      } else if (isEqual) {
        const xs = (180 - cs[0] - cs[1]) / (co[0] + co[1]);
        if (Number.isInteger(xs)) pushTrap(traps, x, xs, `${ctx === "vo" ? "Vertically opposite" : "Alternate"} angles are EQUAL — set the two expressions equal to each other instead of adding them to 180°.`);
      }
      return {
        prompt,
        answer: ask3 ? angleAns(answerVal) : countAns(x),
        solution,
        hint: ask3 ? "Write an equation using the angle fact, solve it, then substitute back." : "Which angle fact links these angles? Turn it into an equation.",
        traps,
      };
    },
  },
];
