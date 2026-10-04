// Procedural skill drills for "Area, Surface Area & Volume" (perimeter-area-volume).
// Every answer is computed from integers / halves and cleaned, so there is no float noise.
import type { Drill, DrillItem, Rng } from "./types.ts";
import type { Trap } from "../types.ts";
import { big, clean, num, roundTo } from "./helpers.ts";

const T = "perimeter-area-volume";

// ---------------------------------------------------------------------------
// Small utilities
// ---------------------------------------------------------------------------

/** Numeric traps, skipping any that equal the answer (or each other) or are not positive. */
function numTraps(answer: number, list: Array<[number, string]>): Trap[] {
  const out: Trap[] = [];
  const seen: number[] = [answer];
  for (const [raw, feedback] of list) {
    const v = clean(raw);
    if (!Number.isFinite(v) || v <= 0) continue;
    if (seen.some((s) => Math.abs(s - v) <= 1e-9 * Math.max(1, Math.abs(v)))) continue;
    seen.push(v);
    out.push({ spec: { type: "number", value: v }, feedback });
  }
  return out;
}

/** n plus an optional half: halfOr(rng, 3, 9, 0.4) → 3 … 9 or 3.5 … 9.5. */
function halfOr(rng: Rng, lo: number, hi: number, pHalf: number): number {
  return rng.int(lo, hi) + (rng.bool(pHalf) ? 0.5 : 0);
}

const sq = (u: string) => `${u}²`;
/** Always show exactly one decimal place (88 → "88.0") for "to 1 d.p." answers. */
const dp1 = (x: number) => big(roundTo(x, 1)).replace(/^([^.]*)$/, "$1.0");

/** Pythagorean triples [leg1, leg2, hypotenuse], used so sloping sides are honest whole numbers. */
const TRIPLES_SMALL: Array<[number, number, number]> = [
  [3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10],
];
const TRIPLES_ALL: Array<[number, number, number]> = [
  ...TRIPLES_SMALL,
  [5, 12, 13], [12, 5, 13], [9, 12, 15], [12, 9, 15], [8, 15, 17], [15, 8, 17], [12, 16, 20], [16, 12, 20],
];

// ---------------------------------------------------------------------------
// SVG helpers (drawn to scale, white background, dark strokes, soft fills)
// ---------------------------------------------------------------------------

type Pt = [number, number];
const INK = "#1f2937";

function r1(x: number): string {
  return String(Math.round(x * 10) / 10);
}

function svgOpen(w: number, h: number, aria: string): string {
  return `<svg viewBox="0 0 ${r1(w)} ${r1(h)}" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${aria}"><rect x="0" y="0" width="${r1(w)}" height="${r1(h)}" fill="#ffffff"/>`;
}

function svgText(x: number, y: number, s: string, anchor: "start" | "middle" | "end" = "middle"): string {
  return `<text x="${r1(x)}" y="${r1(y)}" font-size="13" font-family="sans-serif" fill="${INK}" text-anchor="${anchor}">${s}</text>`;
}

function insidePoly(px: number, py: number, poly: Pt[]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > py !== yj > py && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

interface ShapeSpec {
  /** Vertices in maths units (y up). */
  pts: Pt[];
  /** labels[i] sits outside edge pts[i] → pts[i+1]. */
  labels: Array<string | null>;
  aria: string;
  fill?: string;
  /** Dashed perpendicular height; the right-angle mark sits at `foot`. */
  height?: { from: Pt; foot: Pt; text: string; side: "left" | "right" };
}

function drawShape(sh: ShapeSpec, maxW = 300, maxH = 180): string {
  const xs = sh.pts.map((p) => p[0]);
  const ys = sh.pts.map((p) => p[1]);
  const x0 = Math.min(...xs), x1 = Math.max(...xs), y0 = Math.min(...ys), y1 = Math.max(...ys);
  const s = Math.min(maxW / (x1 - x0), maxH / (y1 - y0));
  const mx = 66, my = 28;
  const X = (x: number) => mx + (x - x0) * s;
  const Y = (y: number) => my + (y1 - y) * s;
  const scr: Pt[] = sh.pts.map(([x, y]) => [X(x), Y(y)]);
  let out = svgOpen((x1 - x0) * s + 2 * mx, (y1 - y0) * s + 2 * my, sh.aria);
  out += `<polygon points="${scr.map(([x, y]) => `${r1(x)},${r1(y)}`).join(" ")}" fill="${sh.fill ?? "#c7d2fe"}" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/>`;
  if (sh.height) {
    const fx = X(sh.height.foot[0]), fy = Y(sh.height.foot[1]);
    const tx = X(sh.height.from[0]), ty = Y(sh.height.from[1]);
    out += `<line x1="${r1(tx)}" y1="${r1(ty)}" x2="${r1(fx)}" y2="${r1(fy)}" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/>`;
    const uy = ty > fy ? 1 : -1; // from the foot towards the other end (screen y)
    const vx = sh.height.side === "right" ? 1 : -1;
    out += `<polyline points="${r1(fx + vx * 9)},${r1(fy)} ${r1(fx + vx * 9)},${r1(fy + uy * 9)} ${r1(fx)},${r1(fy + uy * 9)}" fill="none" stroke="#334155" stroke-width="1.5"/>`;
    const midY = (fy + ty) / 2 + 4.5;
    out += svgText(fx + vx * 7, midY, sh.height.text, sh.height.side === "right" ? "start" : "end");
  }
  scr.forEach((p, i) => {
    const lab = sh.labels[i];
    if (!lab) return;
    const q = scr[(i + 1) % scr.length];
    const mxp = (p[0] + q[0]) / 2, myp = (p[1] + q[1]) / 2;
    const len = Math.hypot(q[0] - p[0], q[1] - p[1]) || 1;
    let nx = (q[1] - p[1]) / len, ny = -(q[0] - p[0]) / len;
    if (insidePoly(mxp + nx * 3, myp + ny * 3, scr)) {
      nx = -nx;
      ny = -ny;
    }
    if (Math.abs(nx) < 0.3) out += svgText(mxp, ny > 0 ? myp + 18 : myp - 7, lab);
    else if (Math.abs(ny) < 0.3) out += svgText(nx > 0 ? mxp + 7 : mxp - 7, myp + 4.5, lab, nx > 0 ? "start" : "end");
    else out += svgText(mxp + nx * 9, myp + ny * 9 + 4.5, lab, nx > 0 ? "start" : "end");
  });
  return out + "</svg>";
}

/** Plan view of stacked cubes: g[row][col], row 0 = back, last row = front. */
function drawPlan(g: number[][], showSide: boolean): string {
  const R = g.length, C = g[0].length, cell = 46, ox = 30, oy = 16;
  const gw = C * cell, gh = R * cell;
  const W = ox + gw + (showSide ? 90 : 40), H = oy + gh + 62;
  let out = svgOpen(W, H, `Plan view of a solid made of cubes, ${R} rows by ${C} columns, with the number of cubes stacked in each square`);
  for (let r = 0; r < R; r++) {
    for (let c = 0; c < C; c++) {
      const x = ox + c * cell, y = oy + r * cell;
      if (g[r][c] > 0) {
        out += `<rect x="${x}" y="${y}" width="${cell}" height="${cell}" fill="#c7d2fe" stroke="${INK}" stroke-width="2"/>`;
        out += `<text x="${x + cell / 2}" y="${y + cell / 2 + 6}" font-size="14" font-family="sans-serif" fill="${INK}" text-anchor="middle">${g[r][c]}</text>`;
      }
    }
  }
  const cx = ox + gw / 2, by = oy + gh;
  out += `<line x1="${cx}" y1="${by + 46}" x2="${cx}" y2="${by + 18}" stroke="#334155" stroke-width="2"/>`;
  out += `<polygon points="${cx},${by + 8} ${cx - 6},${by + 19} ${cx + 6},${by + 19}" fill="#334155"/>`;
  out += svgText(cx + 10, by + 44, "Front", "start");
  if (showSide) {
    const rx = ox + gw, cy = oy + gh / 2;
    out += `<line x1="${rx + 46}" y1="${cy}" x2="${rx + 18}" y2="${cy}" stroke="#334155" stroke-width="2"/>`;
    out += `<polygon points="${rx + 8},${cy} ${rx + 19},${cy - 6} ${rx + 19},${cy + 6}" fill="#334155"/>`;
    out += svgText(rx + 34, cy - 10, "Side");
  }
  return out + "</svg>";
}

/** L-shape (W × H with a w × h corner notch) is big enough on screen for every label to sit clear. */
function lShapeFits(W: number, H: number, w: number, h: number): boolean {
  const s = Math.min(300 / W, 180 / H);
  return w * s >= 80 && h * s >= 60 && (W - w) * s >= 50 && (H - h) * s >= 40;
}

/** Trapezium (bottom b, top a from x1, height h): room either side of the dashed height at mid-height. */
function trapRoomy(a: number, b: number, h: number, x1: number): boolean {
  return (Math.max(x1, a + b - x1) / 2) * Math.min(300 / b, 180 / h) >= 50;
}

/** "18 m, 3 m, 8 m and 10 m" from a list of edge labels. */
function listLabels(labels: Array<string | null>): string {
  const xs = labels.filter((x): x is string => !!x);
  return xs.length > 1 ? `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}` : xs.join("");
}

/** Reflect a list of points so the "notch" can sit in any corner. */
function flipPts(pts: Pt[], W: number, H: number, fx: boolean, fy: boolean): Pt[] {
  return pts.map(([x, y]) => [fx ? W - x : x, fy ? H - y : y]);
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ── rectangles & triangles: area / perimeter ─────────────────────────────
  {
    id: `${T}.rectangle-triangle-area`,
    topicId: T,
    title: "Area and perimeter of rectangles and triangles",
    level: 1,
    guideRef: "rectangles-triangles",
    generate(rng, tier): DrillItem {
      const kinds = tier === 3 ? ["rect-mixed", "tri-mixed", "tri", "fence"] : ["rect", "tri", "tri", "perimeter"];
      const kind = rng.pick(kinds);

      if (kind === "rect") {
        let L = 8, W = 5;
        const useM = tier === 2 && rng.bool(0.4);
        for (let i = 0; i < 100; i++) {
          if (tier === 1) { L = rng.int(4, 15); W = rng.int(3, 12); }
          else if (useM) { L = halfOr(rng, 4, 12, 0.5); W = halfOr(rng, 2, 9, 0.3); }
          else { L = rng.int(8, 30); W = halfOr(rng, 4, 20, 0.4); }
          if (L > W && clean(L * W) !== clean(2 * (L + W))) break;
        }
        const u = useM ? "m" : "cm";
        const thing = useM
          ? rng.pick(["classroom floor", "garden plot", "patio"])
          : L < 15
            ? rng.pick(["photo", "greetings card", "sticky label", "notebook cover"])
            : rng.pick(["poster", "floor tile", "placemat", "chopping board"]);
        const A = clean(L * W);
        return {
          prompt: `A rectangular ${thing} is ${num(L)} ${u} long and ${num(W)} ${u} wide. Find its area in ${sq(u)}.`,
          answer: { type: "number", value: A, display: `${num(A)} ${sq(u)}` },
          solution: [`Area of a rectangle = length × width.`, `${num(L)} × ${num(W)} = ${num(A)}`, `Area = ${num(A)} ${sq(u)}`],
          hint: "How many unit squares fit along the length, and how many rows of them are there?",
          traps: numTraps(A, [
            [2 * (L + W), "That's the perimeter (the distance round the edge). Area counts the squares inside: length × width."],
            [L + W, "You added the sides. For area, multiply length by width."],
          ]),
        };
      }

      if (kind === "rect-mixed") {
        let Lc = 120, Wc = 45;
        for (let i = 0; i < 100; i++) {
          Lc = rng.int(6, 25) * 10;
          Wc = rng.int(5, 18) * 5;
          if (Lc % 100 !== 0 && Lc > Wc) break;
        }
        const thing = rng.pick(["poster", "banner", "table runner", "window blind"]);
        const A = Lc * Wc;
        return {
          prompt: `A rectangular ${thing} is ${num(Lc / 100)} m long and ${Wc} cm wide. Find its area in cm².`,
          answer: { type: "number", value: A, display: `${big(A)} cm²` },
          solution: [
            `Use the same units first: ${num(Lc / 100)} m = ${Lc} cm.`,
            `Area = ${Lc} × ${Wc} = ${big(A)}`,
            `Area = ${big(A)} cm²`,
          ],
          hint: "The lengths are in different units. Change the metres into centimetres before multiplying.",
          traps: numTraps(A, [
            [clean((Lc / 100) * Wc), "You multiplied metres by centimetres. Convert the length to centimetres (× 100) first."],
            [2 * (Lc + Wc), "That's the perimeter. Area = length × width."],
          ]),
        };
      }

      if (kind === "perimeter" || kind === "fence") {
        let L = 9, W = 4;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) { L = rng.int(3, 15); W = rng.int(2, 12); }
          else { L = halfOr(rng, 6, 25, 0.4); W = halfOr(rng, 3, 15, 0.4); }
          if (L > W && clean(L * W) !== clean(2 * (L + W)) && clean(L * W) !== clean(L + 2 * W)) break;
        }
        if (kind === "fence") {
          const P = clean(L + 2 * W);
          const who = rng.pick(["Arjun", "Mei", "Ravi", "Zara", "Hana"]);
          return {
            prompt: `${who}'s rectangular vegetable garden is ${num(L)} m long and ${num(W)} m wide. One long side is against a wall, so fencing is needed on the other three sides only. How many metres of fencing are needed?`,
            answer: { type: "number", value: P, display: `${num(P)} m` },
            solution: [
              `The three sides are one long side and two short sides.`,
              `${num(L)} + ${num(W)} + ${num(W)} = ${num(P)}`,
              `Fencing needed = ${num(P)} m`,
            ],
            hint: "Draw the rectangle and mark which side is against the wall. Which sides are left?",
            traps: numTraps(P, [
              [2 * (L + W), "That fences all four sides — but one long side is the wall."],
              [2 * L + W, "Check which side is against the wall: it is a LONG side, so you need one long side and two short sides."],
              [L * W, "That's the area. Fencing goes round the edge, so add lengths."],
            ]),
          };
        }
        const P = clean(2 * (L + W));
        const tpl = rng.int(0, 2);
        const prompt =
          tpl === 0
            ? `Find the perimeter of a rectangle ${num(L)} cm long and ${num(W)} cm wide. Give your answer in cm.`
            : tpl === 1
              ? `Siti glues ribbon all the way round the edge of a rectangular card ${num(L)} cm by ${num(W)} cm. How many centimetres of ribbon does she need?`
              : `Marcus walks once round the edge of a rectangular lawn ${num(L)} m long and ${num(W)} m wide. How far does he walk, in metres?`;
        return {
          prompt,
          answer: { type: "number", value: P },
          solution: [
            `Perimeter = length + width + length + width = 2 × (length + width).`,
            `2 × (${num(L)} + ${num(W)}) = 2 × ${num(clean(L + W))} = ${num(P)}`,
          ],
          hint: "Perimeter is the total distance round the outside. How many sides does a rectangle have?",
          traps: numTraps(P, [
            [L + W, "That's only two of the four sides. A rectangle has two lengths and two widths."],
            [L * W, "That's the area. Perimeter adds up the lengths of all four sides."],
          ]),
        };
      }

      if (kind === "tri-mixed") {
        let bc = 120, hc = 50;
        for (let i = 0; i < 100; i++) {
          bc = rng.int(6, 24) * 10;
          hc = rng.int(6, 18) * 5;
          if (bc % 100 !== 0) break;
        }
        const thing = rng.pick(["triangular banner", "triangular sail on a model boat", "triangular sign", "triangular garden bed"]);
        const A = (bc * hc) / 2;
        return {
          prompt: `A ${thing} has a base of ${num(bc / 100)} m and a perpendicular height of ${hc} cm. Find its area in cm².`,
          answer: { type: "number", value: A, display: `${big(A)} cm²` },
          solution: [
            `Same units first: ${num(bc / 100)} m = ${bc} cm.`,
            `Area of a triangle = {{1/2}} × base × height = {{1/2}} × ${bc} × ${hc}`,
            `= ${big(A)} cm²`,
          ],
          hint: "Convert the base into centimetres, then use half of base × height.",
          traps: numTraps(A, [
            [clean(((bc / 100) * hc) / 2), "You mixed metres and centimetres. Change the base to centimetres first."],
            [bc * hc, "A triangle is half of a rectangle — remember the {{1/2}}."],
          ]),
        };
      }

      // triangle with a sloping side as a distractor
      const pool = tier === 1 ? TRIPLES_SMALL : TRIPLES_ALL;
      let p = 3, h = 4, s = 5, b = 8;
      for (let i = 0; i < 100; i++) {
        [p, h, s] = rng.pick(pool);
        b = p + rng.int(2, tier === 1 ? 7 : 11);
        // the height label needs room inside the triangle at mid-height
        const roomy = (Math.max(p, b - p) / 2) * Math.min(300 / b, 180 / h) >= 50;
        if (roomy && (tier !== 1 || (b * h) % 2 === 0)) break;
      }
      const A = clean((b * h) / 2);
      const mirror = rng.bool();
      const pts: Pt[] = mirror ? [[0, 0], [b, 0], [b - p, h]] : [[0, 0], [b, 0], [p, h]];
      const labels = mirror ? [`${b} cm`, `${s} cm`, null] : [`${b} cm`, null, `${s} cm`];
      const apex = pts[2];
      const diagram = drawShape({
        pts,
        labels,
        aria: `Triangle with base ${b} cm, perpendicular height ${h} cm shown dashed, and a sloping side of ${s} cm`,
        fill: "#fde68a",
        height: { from: apex, foot: [apex[0], 0], text: `${h} cm`, side: apex[0] >= b - apex[0] ? "left" : "right" },
      });
      return {
        prompt: `The triangle has base ${b} cm, perpendicular height ${h} cm and a sloping side of ${s} cm. Find its area in cm².`,
        diagram,
        answer: { type: "number", value: A, display: `${num(A)} cm²` },
        solution: [
          `Use the base and the perpendicular height (the dashed line at right angles to the base). The sloping side is not needed.`,
          `Area = {{1/2}} × ${b} × ${h} = {{1/2}} × ${b * h}`,
          `= ${num(A)} cm²`,
        ],
        hint: "Which length meets the base at a right angle? That is the height to use.",
        traps: numTraps(A, [
          [b * h, "That's the area of the whole rectangle around the triangle. The triangle is half of it."],
          [(b * s) / 2, "The sloping side is not the height. Use the perpendicular height — the dashed line at right angles to the base."],
        ]),
      };
    },
  },

  // 2 ── missing lengths from area / perimeter ─────────────────────────────────
  {
    id: `${T}.missing-length`,
    topicId: T,
    title: "Find a missing length from the area or perimeter",
    level: 2,
    guideRef: "rectangles-triangles",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["rect-area", "tri-height", "rect-perim"] : tier === 2 ? ["rect-area", "tri-height", "tri-base", "rect-perim", "square"] : ["tri-height", "square", "same-area", "rect-perim"];
      const kind = rng.pick(kinds);

      if (kind === "rect-area") {
        let L = 8, W = 5;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) { L = rng.int(3, 12); W = rng.int(2, 12); }
          else { L = rng.int(2, 10) * 2; W = halfOr(rng, 3, 15, 0.5); }
          if (L !== W) break;
        }
        const A = clean(L * W);
        const ctx = rng.pick([
          { thing: "community garden", u: "m" },
          { thing: "school garden plot", u: "m" },
          { thing: "tray", u: "cm" },
          { thing: "poster", u: "cm" },
          { thing: "tablet screen", u: "cm" },
        ]);
        return {
          prompt: `A rectangular ${ctx.thing} has an area of ${num(A)} ${sq(ctx.u)}. It is ${num(L)} ${ctx.u} long. How wide is it? Give your answer in ${ctx.u}.`,
          answer: { type: "number", value: W, display: `${num(W)} ${ctx.u}` },
          solution: [`Area = length × width, so width = area ÷ length.`, `${num(A)} ÷ ${num(L)} = ${num(W)}`, `Width = ${num(W)} ${ctx.u}`],
          hint: "Write the formula with a box for the missing length: ? × length = area. How do you undo ×?",
          traps: numTraps(W, [
            [A - L, "You subtracted. Area is length × width, so undo the × by dividing."],
            [A / 2 - L, "That treats the area as if it were the perimeter. Area = length × width, so divide."],
          ]),
        };
      }

      if (kind === "tri-height" || kind === "tri-base") {
        let b = 8, h = 5;
        for (let i = 0; i < 100; i++) {
          b = rng.int(3, tier === 1 ? 12 : 20);
          h = rng.int(3, tier === 1 ? 12 : 20);
          if (b !== h && (tier !== 1 || (b * h) % 2 === 0)) break;
        }
        const A = clean((b * h) / 2);
        const findH = kind === "tri-height";
        const known = findH ? b : h;
        const ans = findH ? h : b;
        const prompt = findH
          ? `A triangle has an area of ${num(A)} cm² and a base of ${b} cm. Find its perpendicular height in cm.`
          : `A triangle has an area of ${num(A)} cm² and a perpendicular height of ${h} cm. Find the length of its base in cm.`;
        return {
          prompt,
          answer: { type: "number", value: ans, display: `${ans} cm` },
          solution: [
            `Area = {{1/2}} × base × height, so base × height = 2 × area = 2 × ${num(A)} = ${b * h}.`,
            `${findH ? "Height" : "Base"} = ${b * h} ÷ ${known} = ${ans}`,
            `${findH ? "Height" : "Base"} = ${ans} cm`,
          ],
          hint: "Undo the half first: what is base × height for this triangle?",
          traps: numTraps(ans, [
            [A / known, "You forgot the half. Area = {{1/2}} × b × h, so double the area before dividing."],
            [A / known / 2, "Double the area (don't halve it again): b × h = 2 × area."],
          ]),
        };
      }

      if (kind === "rect-perim") {
        let L = 9, W = 4;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) { L = rng.int(3, 15); W = rng.int(2, 12); }
          else { L = halfOr(rng, 5, 25, 0.4); W = halfOr(rng, 2, 18, 0.4); }
          if (L !== W) break;
        }
        const P = clean(2 * (L + W));
        const thing = rng.pick(["photo frame", "flower bed", "greetings card", "notebook cover", "vegetable patch"]);
        const unit = thing === "flower bed" || thing === "vegetable patch" ? "m" : "cm";
        return {
          prompt: `A rectangular ${thing} has a perimeter of ${num(P)} ${unit}. One side is ${num(L)} ${unit}. How long is the other side, in ${unit}?`,
          answer: { type: "number", value: W, display: `${num(W)} ${unit}` },
          solution: [
            `Half the perimeter is one length + one width: ${num(P)} ÷ 2 = ${num(clean(L + W))}.`,
            `Other side = ${num(clean(L + W))} − ${num(L)} = ${num(W)}`,
            `The other side is ${num(W)} ${unit}.`,
          ],
          hint: "Going halfway round a rectangle covers one length and one width.",
          traps: numTraps(W, [
            [P - L, "You only took away one side. The perimeter includes the known side twice."],
            [P - 2 * L, "That's both of the other sides together. Halve it to get one side."],
          ]),
        };
      }

      if (kind === "square") {
        const askP = rng.bool();
        let a = 6;
        for (let i = 0; i < 100; i++) {
          a = rng.int(tier === 2 ? 4 : 6, tier === 2 ? 12 : 20);
          if (!(askP && a === 4)) break; // side 4: area 16 = perimeter 16, so the area could just be copied
        }
        const A = a * a;
        const ans = askP ? 4 * a : a;
        const useM = rng.bool();
        const u = useM ? "m" : "cm";
        const thing = useM ? rng.pick(["garden", "courtyard", "playground"]) : rng.pick(["tile", "piece of origami paper", "cushion cover"]);
        const prompt = askP
          ? `A square ${thing} has an area of ${A} ${sq(u)}. Find its perimeter in ${u}.`
          : `A square ${thing} has an area of ${A} ${sq(u)}. How long is each side, in ${u}?`;
        return {
          prompt,
          answer: { type: "number", value: ans, display: `${ans} ${u}` },
          solution: askP
            ? [`Side × side = ${A}, so the side is {{sqrt(${A})}} = ${a} ${u}.`, `Perimeter = 4 × ${a} = ${4 * a} ${u}`]
            : [`Side × side = ${A}.`, `Side = {{sqrt(${A})}} = ${a} ${u}`],
          hint: "Which number multiplied by itself gives the area?",
          traps: numTraps(ans, [
            [A / 4, "Dividing the area by 4 doesn't give a side. The side is the square root of the area."],
            ...(askP ? ([[a, "That's one side. The perimeter goes all the way round: 4 sides."]] as Array<[number, string]>) : []),
            [A / 2, "Halving doesn't undo squaring. Find the number that multiplies by itself to make the area."],
          ]),
        };
      }

      // same-area (tier 3): triangle area = rectangle area, find the rectangle's width
      let b = 10, h = 6, L = 5, W = 6;
      for (let i = 0; i < 200; i++) {
        b = rng.int(6, 24);
        h = rng.int(4, 20);
        L = rng.int(3, 15);
        const A2 = b * h; // twice the area
        W = clean(A2 / 2 / L);
        if (b !== h && L !== W && (A2 * 5) % L === 0 && W > 1 && L !== b && L !== h) break;
      }
      const A = clean((b * h) / 2);
      return {
        prompt: `A triangle with base ${b} cm and perpendicular height ${h} cm has the same area as a rectangle that is ${L} cm long. How wide is the rectangle? Give your answer in cm.`,
        answer: { type: "number", value: W, display: `${num(W)} cm` },
        solution: [
          `Triangle area = {{1/2}} × ${b} × ${h} = ${num(A)} cm².`,
          `Rectangle: ${L} × width = ${num(A)}, so width = ${num(A)} ÷ ${L} = ${num(W)}.`,
          `The rectangle is ${num(W)} cm wide.`,
        ],
        hint: "Work out the triangle's area first — that is also the rectangle's area.",
        traps: numTraps(W, [
          [(b * h) / L, "You forgot to halve for the triangle's area."],
          [A - L, "Area = length × width, so divide the area by the length."],
        ]),
      };
    },
  },

  // 3 ── parallelograms ────────────────────────────────────────────────────────
  {
    id: `${T}.parallelogram-area`,
    topicId: T,
    title: "Area of a parallelogram (base × perpendicular height)",
    level: 1,
    guideRef: "parallelograms-trapezia",
    generate(rng, tier): DrillItem {
      const kind = tier === 3 ? rng.pick(["two-heights", "two-heights", "missing", "area"]) : tier === 2 ? rng.pick(["area", "area", "missing"]) : "area";

      if (kind === "two-heights") {
        let b1 = 10, b2 = 8, h1 = 6, h2 = 7.5;
        for (let i = 0; i < 300; i++) {
          b1 = rng.int(5, 16);
          b2 = rng.int(4, 15);
          h1 = rng.int(2, b2 - 1);
          if (b1 === b2 || h1 >= b2) continue;
          if ((b1 * h1 * 10) % b2 !== 0) continue;
          h2 = clean((b1 * h1) / b2);
          if (h2 !== h1) break;
        }
        const A = b1 * h1;
        return {
          prompt: `A parallelogram has sides of ${b1} cm and ${b2} cm. The perpendicular distance between the two ${b1} cm sides is ${h1} cm. Find the perpendicular distance between the two ${b2} cm sides, in cm.`,
          answer: { type: "number", value: h2, display: `${num(h2)} cm` },
          solution: [
            `Use a ${b1} cm side as the base: area = ${b1} × ${h1} = ${A} cm².`,
            `The area is the same whichever side you call the base, so ${b2} × height = ${A}.`,
            `Height = ${A} ÷ ${b2} = ${num(h2)} cm`,
          ],
          hint: "Find the area one way. Then use the same area with the other side as the base.",
          traps: numTraps(h2, [
            [h1, "The two heights are only equal for a rhombus. Use the area: it is the same whichever base you choose."],
            [(b2 * h1) / b1, "Check which height goes with which base: base × its own height = area."],
          ]),
        };
      }

      if (kind === "missing") {
        let b = 9, h = 6;
        for (let i = 0; i < 100; i++) {
          b = rng.int(4, 18);
          h = tier === 3 ? halfOr(rng, 3, 14, 0.5) : rng.int(3, 14);
          if (b !== h) break;
        }
        const A = clean(b * h);
        const thing = rng.pick(["parallelogram", "parallelogram-shaped paving slab", "parallelogram-shaped flower bed"]);
        const unit = thing === "parallelogram-shaped flower bed" ? "m" : "cm";
        return {
          prompt: `A ${thing} has an area of ${num(A)} ${sq(unit)} and a base of ${b} ${unit}. Find its perpendicular height in ${unit}.`,
          answer: { type: "number", value: h, display: `${num(h)} ${unit}` },
          solution: [`Area of a parallelogram = base × perpendicular height.`, `Height = ${num(A)} ÷ ${b} = ${num(h)}`, `Height = ${num(h)} ${unit}`],
          hint: "Base × height = area. What do you divide by to find the height?",
          traps: numTraps(h, [
            [(2 * A) / b, "That's the triangle rule. A parallelogram rearranges into a whole rectangle, so area = base × height with no half."],
            [A - b, "Area is base × height, so divide (don't subtract)."],
          ]),
        };
      }

      // area with a sloping-side distractor and a diagram
      const pool = tier === 1 ? TRIPLES_SMALL : TRIPLES_ALL;
      let p = 3, h = 4, s = 5, b = 8;
      for (let i = 0; i < 100; i++) {
        [p, h, s] = rng.pick(pool);
        b = p + rng.int(2, tier === 1 ? 8 : 12) + (tier === 2 && rng.bool(0.3) ? 0.5 : 0);
        if (b !== s && b !== h) break;
      }
      const A = clean(b * h);
      const leanLeft = rng.bool();
      const pts: Pt[] = leanLeft ? [[p, 0], [b + p, 0], [b, h], [0, h]] : [[0, 0], [b, 0], [b + p, h], [p, h]];
      const labels = leanLeft ? [`${num(b)} cm`, `${s} cm`, null, null] : [`${num(b)} cm`, null, null, `${s} cm`];
      const diagram = drawShape({
        pts,
        labels,
        aria: `Parallelogram with base ${num(b)} cm, sloping side ${s} cm and perpendicular height ${h} cm shown dashed`,
        fill: "#bbf7d0",
        height: leanLeft ? { from: [b, h], foot: [b, 0], text: `${h} cm`, side: "left" } : { from: [p, h], foot: [p, 0], text: `${h} cm`, side: "right" },
      });
      return {
        prompt: rng.pick([
          `Find the area of the parallelogram. Its base is ${num(b)} cm, its sloping side is ${s} cm and its perpendicular height is ${h} cm. Give your answer in cm².`,
          `A parallelogram-shaped tile has a base of ${num(b)} cm, sloping sides of ${s} cm and a perpendicular height of ${h} cm. What is its area in cm²?`,
          `Wei Ling cuts a parallelogram from card. The base is ${num(b)} cm, the sloping side is ${s} cm and the perpendicular height is ${h} cm. Find the area of the card in cm².`,
        ]),
        diagram,
        answer: { type: "number", value: A, display: `${num(A)} cm²` },
        solution: [
          `Cut the triangle off one end and slide it to the other: the parallelogram becomes a rectangle ${num(b)} cm by ${h} cm.`,
          `Area = base × perpendicular height = ${num(b)} × ${h} = ${num(A)}`,
          `Area = ${num(A)} cm² (the ${s} cm sloping side is not needed).`,
        ],
        hint: "Imagine cutting off the sloping end and moving it across. What rectangle do you get?",
        traps: numTraps(A, [
          [b * s, "The sloping side is not the height. Use the perpendicular height, at right angles to the base."],
          [(b * h) / 2, "No half here — that's for triangles. A parallelogram rearranges into a whole rectangle."],
        ]),
      };
    },
  },

  // 4 ── trapezia ──────────────────────────────────────────────────────────────
  {
    id: `${T}.trapezium-area`,
    topicId: T,
    title: "Area of a trapezium",
    level: 2,
    guideRef: "parallelograms-trapezia",
    generate(rng, tier): DrillItem {
      const kind = tier === 3 ? rng.pick(["area", "find-h", "find-side"]) : "area";

      if (kind === "find-h" || kind === "find-side") {
        let a = 5, b = 9, h = 6;
        for (let i = 0; i < 100; i++) {
          a = rng.int(3, 14);
          b = a + rng.int(2, 12);
          h = rng.int(3, 15);
          if (((a + b) * h) % 2 === 0 && h !== a && h !== b) break;
        }
        const A = ((a + b) * h) / 2;
        const ctx = rng.pick(["trapezium", "trapezium-shaped garden bed", "trapezium-shaped window"]);
        if (kind === "find-h") {
          return {
            prompt: `A ${ctx} has parallel sides of ${a} m and ${b} m and an area of ${A} m². Find the perpendicular distance between the parallel sides, in m.`,
            answer: { type: "number", value: h, display: `${h} m` },
            solution: [
              `Area = {{1/2}}(a + b)h, so ${A} = {{1/2}} × ${a + b} × h.`,
              `Double the area: ${a + b} × h = ${2 * A}.`,
              `h = ${2 * A} ÷ ${a + b} = ${h} m`,
            ],
            hint: "Put the numbers into A = ½(a + b)h. What is (a + b) × h?",
            traps: numTraps(h, [
              [A / (a + b), "You forgot the half: (a + b) × h = 2 × area."],
              [(2 * A) / b, "Both parallel sides belong in the formula: use (a + b)."],
            ]),
          };
        }
        return {
          prompt: `A ${ctx} has an area of ${A} m². Its perpendicular height is ${h} m and one of its parallel sides is ${a} m. How long is the other parallel side, in m?`,
          answer: { type: "number", value: b, display: `${b} m` },
          solution: [
            `Area = {{1/2}}(a + b)h, so (a + b) × ${h} = 2 × ${A} = ${2 * A}.`,
            `a + b = ${2 * A} ÷ ${h} = ${a + b}.`,
            `Other side = ${a + b} − ${a} = ${b} m`,
          ],
          hint: "Work backwards: double the area, divide by the height — that gives the two parallel sides added together.",
          traps: numTraps(b, [
            [(2 * A) / h, "That's both parallel sides added together. Take away the side you know."],
            [A / h - a, "Double the area first: (a + b) × h = 2 × area."],
          ]),
        };
      }

      // area, with a diagram
      let a = 4, b = 10, h = 5, x1 = 2, slant: number | null = null;
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          a = rng.int(2, 10);
          b = a + rng.int(2, 9);
          h = rng.int(2, 10);
          x1 = rng.int(1, b - a);
          slant = null;
          if (((a + b) * h) % 2 === 0 && h !== a && h !== b && trapRoomy(a, b, h, x1)) break;
        } else {
          const [p, hh, s] = rng.pick(TRIPLES_ALL);
          a = rng.int(3, 14) + (tier === 3 && rng.bool(0.4) ? 0.5 : 0);
          b = clean(a + p + rng.int(0, 8));
          h = hh;
          x1 = p;
          slant = s;
          if (h !== a && h !== b && s !== a && s !== b && b <= 3 * h + 20 && trapRoomy(a, b, h, x1)) break;
        }
      }
      const A = clean(((a + b) * h) / 2);
      const flip = rng.bool(0.35);
      const base: Pt[] = [[0, 0], [b, 0], [x1 + a, h], [x1, h]];
      const pts = flip ? flipPts(base, b, h, false, true) : base;
      const labels: Array<string | null> = [`${num(b)} cm`, null, `${num(a)} cm`, slant !== null ? `${slant} cm` : null];
      const diagram = drawShape({
        pts,
        labels,
        aria: `Trapezium with parallel sides ${num(a)} cm and ${num(b)} cm and perpendicular height ${h} cm shown dashed${slant !== null ? `, and a sloping side of ${slant} cm` : ""}`,
        fill: "#bae6fd",
        height: { from: flip ? [x1, 0] : [x1, h], foot: flip ? [x1, h] : [x1, 0], text: `${h} cm`, side: x1 > a + b - x1 ? "left" : "right" },
      });
      const thing = rng.pick(["trapezium", "trapezium-shaped tile", "trapezium-shaped table top", "trapezium-shaped face of a ramp"]);
      return {
        prompt: `Find the area of the ${thing}. The parallel sides are ${num(a)} cm and ${num(b)} cm and the perpendicular height is ${h} cm${slant !== null ? `; one sloping side is ${slant} cm` : ""}. Give your answer in cm².`,
        diagram,
        answer: { type: "number", value: A, display: `${num(A)} cm²` },
        solution: [
          `Area of a trapezium = {{1/2}}(a + b)h: two copies fit together into a parallelogram of base (a + b).`,
          `= {{1/2}} × (${num(a)} + ${num(b)}) × ${h} = {{1/2}} × ${num(clean(a + b))} × ${h}`,
          `= ${num(A)} cm²`,
        ],
        hint: "Add the two parallel sides first. Then multiply by the height and halve.",
        traps: numTraps(A, [
          [(a + b) * h, "You forgot to halve. Two trapezia make a parallelogram, so one is half of (a + b) × h."],
          ...(slant !== null ? ([[((a + b) * slant) / 2, "Use the perpendicular height, not the sloping side."]] as Array<[number, string]>) : []),
          [b * h, "Both parallel sides matter: use the average of a and b, times h."],
        ]),
      };
    },
  },

  // 5 ── compound shapes: area ─────────────────────────────────────────────────
  {
    id: `${T}.compound-area`,
    topicId: T,
    title: "Area of compound (L-shaped) shapes",
    level: 2,
    guideRef: "compound-shapes",
    generate(rng, tier): DrillItem {
      const kind = tier === 3 ? rng.pick(["L", "U", "border"]) : "L";
      const u = rng.pick(["cm", "m"]);

      if (kind === "border") {
        let w = 15, h = 10, x = 2;
        for (let i = 0; i < 100; i++) {
          w = rng.int(8, 30);
          h = rng.int(6, 24);
          x = rng.int(2, 6);
          if (w !== h && 2 * x <= Math.min(w, h) && w + h !== 3 * x) break;
        }
        const W = w + 2 * x, H = h + 2 * x;
        const ans = W * H - w * h;
        const ctx = rng.pick([
          `A photo ${w} cm by ${h} cm is mounted on a rectangular card so that there is a border ${x} cm wide all the way round the photo. Find the area of the border in cm².`,
          `A rectangular pond ${w} m by ${h} m has a paved path ${x} m wide all the way round its outside edge. Find the area of the path in m².`,
        ]);
        return {
          prompt: ctx,
          answer: { type: "number", value: ans },
          solution: [
            `The outer rectangle is ${w} + 2 × ${x} = ${W} by ${h} + 2 × ${x} = ${H}.`,
            `Outer area − inner area = ${W} × ${H} − ${w} × ${h} = ${W * H} − ${w * h}`,
            `= ${ans}`,
          ],
          hint: "The border adds its width on BOTH sides. Find the big rectangle, then subtract the inside one.",
          traps: numTraps(ans, [
            [(w + x) * (h + x) - w * h, "The border is on both sides, so the outer rectangle is 2 × the width bigger in each direction."],
            [2 * (w + h) * x, "Strips along each side miss the four corner squares. Use outer area − inner area."],
          ]),
        };
      }

      if (kind === "U") {
        let W = 16, H = 10, d = 5, e = 4, h = 6;
        for (let i = 0; i < 100; i++) {
          W = rng.int(10, 24);
          H = rng.int(6, 16);
          d = rng.int(2, 7);
          e = rng.int(2, 7);
          h = rng.int(2, H - 2);
          const sc = Math.min(300 / W, 180 / H);
          if (W - d - e >= 2 && W !== H && (W - d - e) * sc >= 55 && Math.min(d, e) * sc >= 30 && h * sc >= 30 && (H - h) * sc >= 25) break;
        }
        const w = W - d - e;
        const ans = W * H - w * h;
        const pts: Pt[] = [[0, 0], [W, 0], [W, H], [d + w, H], [d + w, H - h], [d, H - h], [d, H], [0, H]];
        const labels: Array<string | null> = [`${W} ${u}`, `${H} ${u}`, `${e} ${u}`, `${h} ${u}`, null, null, `${d} ${u}`, null];
        const diagram = drawShape({ pts, labels, aria: `U-shaped compound shape: a ${W} by ${H} rectangle with a rectangular gap ${h} deep cut from the top`, fill: "#bbf7d0" });
        return {
          prompt: `The diagram shows a U-shape. All the corners are right angles. The labelled lengths are ${listLabels(labels)}. Find its area in ${sq(u)}.`,
          diagram,
          answer: { type: "number", value: ans, display: `${ans} ${sq(u)}` },
          solution: [
            `Width of the gap = ${W} − ${d} − ${e} = ${w} ${u}.`,
            `Area = big rectangle − gap = ${W} × ${H} − ${w} × ${h} = ${W * H} − ${w * h}`,
            `= ${ans} ${sq(u)}`,
          ],
          hint: "Think of a full rectangle with a rectangular bite taken out. How wide is the bite?",
          traps: numTraps(ans, [
            [W * H, "That's the whole rectangle — take away the gap at the top."],
            [W * H - (d + e) * h, "The gap's width is the total width minus the two arms."],
          ]),
        };
      }

      // L-shape
      let W = 10, H = 8, w = 4, h = 3;
      for (let i = 0; i < 100; i++) {
        if (tier === 1) { W = rng.int(6, 14); H = rng.int(5, 12); }
        else { W = rng.int(9, 26); H = rng.int(7, 20); }
        w = rng.int(2, W - 3);
        h = rng.int(2, H - 3);
        if (W !== H && w !== h && W - w !== H - h && lShapeFits(W, H, w, h)) break;
      }
      const t = W - w, r = H - h;
      const ans = W * H - w * h;
      const giveOuter = rng.bool();
      // vertices: notch at top-right before flipping
      const base: Pt[] = [[0, 0], [W, 0], [W, r], [t, r], [t, H], [0, H]];
      const labels: Array<string | null> = giveOuter
        ? [`${W} ${u}`, `${r} ${u}`, null, null, `${t} ${u}`, `${H} ${u}`]
        : [`${W} ${u}`, null, `${w} ${u}`, `${h} ${u}`, null, `${H} ${u}`];
      const pts = flipPts(base, W, H, rng.bool(), rng.bool());
      const diagram = drawShape({ pts, labels, aria: `L-shaped compound shape made of two rectangles, overall ${W} by ${H}`, fill: "#bbf7d0" });
      const thing = u === "m" ? rng.pick(["L-shaped lawn", "L-shaped garden", "L-shaped playground"]) : rng.pick(["L-shaped tile", "L-shaped piece of card", "L-shaped shape"]);
      return {
        prompt: `The diagram shows an ${thing.replace("L-shaped shape", "L-shape")}. All the corners are right angles. The labelled lengths are ${listLabels(labels)}. Find its area in ${sq(u)}.`,
        diagram,
        answer: { type: "number", value: ans, display: `${ans} ${sq(u)}` },
        solution: giveOuter
          ? [
              `Split it into two rectangles: ${W} × ${r} = ${W * r} and ${t} × (${H} − ${r}) = ${t} × ${h} = ${t * h}.`,
              `Area = ${W * r} + ${t * h} = ${ans} ${sq(u)}`,
              `Check by subtracting: ${W} × ${H} − (${W} − ${t}) × (${H} − ${r}) = ${W * H} − ${w * h} = ${ans}.`,
            ]
          : [
              `Treat it as a ${W} × ${H} rectangle with a ${w} × ${h} corner missing.`,
              `Area = ${W * H} − ${w * h} = ${ans} ${sq(u)}`,
              `Check by splitting: ${W} × ${r} + ${t} × ${h} = ${W * r} + ${t * h} = ${ans}.`,
            ],
        hint: "Either split it into two rectangles, or start with the big rectangle and subtract the missing corner.",
        traps: numTraps(ans, [
          [W * H, "That's the whole surrounding rectangle — the missing corner must be taken away."],
          [W * r + t * H, "Your two rectangles overlap, so part of the shape was counted twice. Make sure the pieces don't share any area."],
          [2 * (W + H), "That's the perimeter. Area counts the squares inside."],
        ]),
      };
    },
  },

  // 6 ── compound shapes: perimeter ────────────────────────────────────────────
  {
    id: `${T}.compound-perimeter`,
    topicId: T,
    title: "Perimeter of compound shapes (find the missing sides)",
    level: 2,
    guideRef: "compound-shapes",
    generate(rng, tier): DrillItem {
      const u = rng.pick(["cm", "m"]);

      if (tier === 3 && rng.bool(0.5)) {
        // staircase: perimeter = 2(W + H) even though most sides are unlabelled
        const k = rng.pick([3, 4]);
        let W = 12, H = 9;
        const treads: number[] = [], risers: number[] = [];
        for (let i = 0; i < 100; i++) {
          treads.length = 0;
          risers.length = 0;
          for (let j = 0; j < k; j++) {
            treads.push(rng.int(2, 5));
            risers.push(rng.int(2, 5));
          }
          W = treads.reduce((s, x) => s + x, 0);
          H = risers.reduce((s, x) => s + x, 0);
          if (W !== H) break;
        }
        // (0,0) → (W,0) → up and left in steps → (0,H) → back down.
        const pts: Pt[] = [[0, 0], [W, 0]];
        let x = W, y = 0;
        for (let j = 0; j < k; j++) {
          y += risers[j];
          pts.push([x, y]);
          if (j < k - 1) {
            x -= treads[j];
            pts.push([x, y]);
          }
        }
        pts.push([0, H]);
        const labels: Array<string | null> = pts.map(() => null);
        labels[0] = `${W} ${u}`;
        labels[pts.length - 1] = `${H} ${u}`;
        const diagram = drawShape({ pts, labels, aria: `Staircase shape ${W} wide and ${H} tall with ${k} steps`, fill: "#fde68a" });
        const P = 2 * (W + H);
        return {
          prompt: `The diagram shows a staircase shape with ${k} steps. All the corners are right angles. Only two sides are labelled: the bottom is ${W} ${u} and the left side is ${H} ${u}. Find the perimeter in ${u}.`,
          diagram,
          answer: { type: "number", value: P, display: `${P} ${u}` },
          solution: [
            `All the horizontal step edges together stretch across the whole shape, so they add up to ${W} ${u}.`,
            `All the vertical step edges together climb the whole height, so they add up to ${H} ${u}.`,
            `Perimeter = ${W} + ${H} + ${W} + ${H} = ${P} ${u} — the same as a ${W} × ${H} rectangle.`,
          ],
          hint: "Imagine pushing the step edges outwards until they make a rectangle. Does the total length change?",
          traps: numTraps(P, [
            [W + H, "You've only counted the two labelled sides. The steps add another " + `${W} across and ${H} up.`],
            [W * H, "That's the area of the surrounding rectangle, not a perimeter."],
          ]),
        };
      }

      let W = 10, H = 8, w = 4, h = 3;
      for (let i = 0; i < 100; i++) {
        if (tier === 1) { W = rng.int(6, 15); H = rng.int(5, 12); }
        else { W = rng.int(9, 30); H = rng.int(7, 24); }
        w = rng.int(2, W - 3);
        h = rng.int(2, H - 3);
        if (W !== H && w !== h && W - w !== H - h && lShapeFits(W, H, w, h)) break;
      }
      const t = W - w, r = H - h;
      // edges: 0 bottom W, 1 right r, 2 notch w, 3 notch h, 4 top t, 5 left H
      const lens = [W, r, w, h, t, H];
      const missH = rng.pick([0, 2, 4]);
      const missV = rng.pick([1, 3, 5]);
      const labels: Array<string | null> = lens.map((L, i) => (i === missH || i === missV ? null : `${L} ${u}`));
      const base: Pt[] = [[0, 0], [W, 0], [W, r], [t, r], [t, H], [0, H]];
      const pts = flipPts(base, W, H, rng.bool(), rng.bool());
      const diagram = drawShape({ pts, labels, aria: `L-shaped compound shape with four of its six sides labelled`, fill: "#fde68a" });
      const P = 2 * (W + H);
      const labelledSum = lens.reduce((s, L, i) => (i === missH || i === missV ? s : s + L), 0);
      const hName = missH === 0 ? "longest horizontal side" : "missing horizontal side";
      const vName = missV === 5 ? "longest vertical side" : "missing vertical side";
      const hCalc = missH === 0 ? `${t} + ${w} = ${W}` : missH === 2 ? `${W} − ${t} = ${w}` : `${W} − ${w} = ${t}`;
      const vCalc = missV === 5 ? `${r} + ${h} = ${H}` : missV === 3 ? `${H} − ${r} = ${h}` : `${H} − ${h} = ${r}`;
      return {
        prompt: `The diagram shows an L-shape. All the corners are right angles. The labelled lengths are ${listLabels(labels)}; two sides are not labelled. Find the perimeter in ${u}.`,
        diagram,
        answer: { type: "number", value: P, display: `${P} ${u}` },
        solution: [
          `${hName[0].toUpperCase() + hName.slice(1)}: ${hCalc} ${u}.`,
          `${vName[0].toUpperCase() + vName.slice(1)}: ${vCalc} ${u}.`,
          `Perimeter = ${W} + ${r} + ${w} + ${h} + ${t} + ${H} = ${P} ${u}`,
        ],
        hint: "The short horizontal sides add up to the long horizontal side. The same is true for the vertical sides.",
        traps: numTraps(P, [
          [labelledSum, "You've left out the two unlabelled sides. Work them out first, then add all six sides."],
          [W * H - w * h, "That's the area. Perimeter is the distance all the way round."],
        ]),
      };
    },
  },

  // 7 ── faces, edges, vertices and Euler ──────────────────────────────────────
  {
    id: `${T}.euler-faces-edges-vertices`,
    topicId: T,
    title: "Faces, edges and vertices (Euler's formula)",
    level: 1,
    guideRef: "nets-and-euler",
    generate(rng, tier): DrillItem {
      const NAMES: Record<number, string> = { 3: "triangular", 4: "square", 5: "pentagonal", 6: "hexagonal", 7: "heptagonal", 8: "octagonal", 9: "nonagonal", 10: "decagonal", 12: "dodecagonal" };
      const ns = tier === 1 ? [3, 4, 5, 6] : [3, 4, 5, 6, 7, 8, 9, 10, 12];
      const kind = tier === 3 ? rng.pick(["reverse", "reverse", "euler"]) : rng.pick(["named", "named", "euler"]);
      const n = rng.pick(ns);
      const fam = rng.pick(tier === 1 ? ["prism", "pyramid"] : ["prism", "pyramid", "bipyramid"]);
      const V = fam === "prism" ? 2 * n : fam === "pyramid" ? n + 1 : n + 2;
      const F = fam === "prism" ? n + 2 : fam === "pyramid" ? n + 1 : 2 * n;
      const E = fam === "prism" ? 3 * n : fam === "pyramid" ? 2 * n : 3 * n;

      if (kind === "euler") {
        const find = rng.pick(["E", "F", "V"]);
        const intro = tier === 1 ? "Use Euler's formula V + F − E = 2." : "Use Euler's formula.";
        if (find === "E") {
          return {
            prompt: `A polyhedron has ${V} vertices and ${F} faces. How many edges does it have? ${intro}`,
            answer: { type: "number", value: E },
            solution: [`V + F − E = 2, so ${V} + ${F} − E = 2.`, `${V + F} − E = 2, so E = ${V + F} − 2 = ${E}.`],
            hint: "Put the numbers you know into V + F − E = 2. What must E be?",
            traps: numTraps(E, [[V + F + 2, "Check the rearranging: V + F − E = 2 means E = V + F − 2."]]),
          };
        }
        if (find === "F") {
          return {
            prompt: `A polyhedron has ${V} vertices and ${E} edges. How many faces does it have? ${intro}`,
            answer: { type: "number", value: F },
            solution: [`V + F − E = 2, so ${V} + F − ${E} = 2.`, `F = 2 + ${E} − ${V} = ${F}.`],
            hint: "Put V and E into V + F − E = 2 and solve for F.",
            traps: numTraps(F, [[E - V - 2, "Check the rearranging: F = 2 + E − V."], [V + E - 2, "Edges are subtracted in Euler's formula: F = 2 + E − V."]]),
          };
        }
        return {
          prompt: `A polyhedron has ${F} faces and ${E} edges. How many vertices does it have? ${intro}`,
          answer: { type: "number", value: V },
          solution: [`V + F − E = 2, so V + ${F} − ${E} = 2.`, `V = 2 + ${E} − ${F} = ${V}.`],
          hint: "Put F and E into V + F − E = 2 and solve for V.",
          traps: numTraps(V, [[E - F - 2, "Check the rearranging: V = 2 + E − F."], [F + E - 2, "Edges are subtracted in Euler's formula: V = 2 + E − F."]]),
        };
      }

      if (kind === "reverse") {
        const solid = rng.pick(["prism", "pyramid"]);
        const n2 = rng.pick([5, 6, 7, 8, 9, 10, 12, 15, 20]);
        if (solid === "prism") {
          const given = rng.pick(["E", "V"]);
          const ask = rng.pick(["F", given === "E" ? "V" : "E"]);
          const gv = given === "E" ? 3 * n2 : 2 * n2;
          const ans = ask === "F" ? n2 + 2 : ask === "V" ? 2 * n2 : 3 * n2;
          const word = (c: string) => (c === "E" ? "edges" : c === "V" ? "vertices" : "faces");
          return {
            prompt: `A prism has ${gv} ${word(given)}. How many ${word(ask)} does it have?`,
            answer: { type: "number", value: ans },
            solution: [
              `A prism whose end is an n-sided polygon has 2n vertices, 3n edges and n + 2 faces.`,
              `${gv} ${word(given)} = ${given === "E" ? "3n" : "2n"}, so n = ${n2}: each end has ${n2} sides.`,
              `${word(ask)[0].toUpperCase() + word(ask).slice(1)} = ${ask === "F" ? `${n2} + 2` : ask === "V" ? `2 × ${n2}` : `3 × ${n2}`} = ${ans}`,
            ],
            hint: "First work out how many sides the end polygon has.",
            traps: numTraps(ans, [
              [n2, "That's the number of sides on each end. Now use it to count what was asked."],
              ask === "E"
                ? [2 * n2, "Remember the edges joining the two ends as well as the edges round each end."]
                : ask === "F"
                  ? [n2 + 1, "Remember the prism has two ends."]
                  : [n2 + 2, "Vertices are the corners: each of the two ends has " + `${n2} of them.`],
            ]),
          };
        }
        const given = rng.pick(["E", "V"]);
        const gv = given === "E" ? 2 * n2 : n2 + 1;
        const ask = given === "E" ? rng.pick(["V", "F"]) : "E";
        const ans = ask === "E" ? 2 * n2 : n2 + 1;
        const word = (c: string) => (c === "E" ? "edges" : c === "V" ? "vertices" : "faces");
        return {
          prompt: `A pyramid has ${gv} ${word(given)}. How many ${word(ask)} does it have?`,
          answer: { type: "number", value: ans },
          solution: [
            `A pyramid on an n-sided base has n + 1 vertices, 2n edges and n + 1 faces.`,
            `${gv} ${word(given)} = ${given === "E" ? "2n" : "n + 1"}, so the base has n = ${n2} sides.`,
            `${word(ask)[0].toUpperCase() + word(ask).slice(1)} = ${ask === "E" ? `2 × ${n2}` : `${n2} + 1`} = ${ans}`,
          ],
          hint: "How many sides must the base have? Then count apex, base corners, and edges.",
          traps: numTraps(ans, [[n2, "That's the number of sides of the base. Don't forget the apex and the sloping edges."]]),
        };
      }

      // named solid
      const askWhat = rng.pick(["F", "E", "V"]);
      const word = askWhat === "E" ? "edges" : askWhat === "V" ? "vertices" : "faces";
      const solid = fam === "bipyramid" ? (rng.bool() ? "prism" : "pyramid") : fam;
      const vv = solid === "prism" ? 2 * n : n + 1;
      const ff = solid === "prism" ? n + 2 : n + 1;
      const ee = solid === "prism" ? 3 * n : 2 * n;
      const name = solid === "prism" ? (n === 4 ? "cuboid" : `${NAMES[n]} prism`) : n === 3 ? "triangular-based pyramid (tetrahedron)" : `${NAMES[n]}-based pyramid`;
      const ans = askWhat === "E" ? ee : askWhat === "V" ? vv : ff;
      const why =
        solid === "prism"
          ? askWhat === "F"
            ? n === 4
              ? `Top and bottom + 4 faces round the sides = ${ff} faces (3 pairs of opposite rectangles).`
              : `Two ${NAMES[n]} ends + ${n} rectangular sides = ${ff} faces.`
            : askWhat === "E"
              ? `${n} edges round each end (× 2 = ${2 * n}) + ${n} edges joining the ends = ${ee} edges.`
              : `${n} corners on each of the two ends = ${vv} vertices.`
          : askWhat === "F"
            ? `1 base + ${n} triangular faces = ${ff} faces.`
            : askWhat === "E"
              ? `${n} edges round the base + ${n} edges up to the apex = ${ee} edges.`
              : `${n} corners on the base + 1 apex = ${vv} vertices.`;
      const trapList: Array<[number, string]> =
        solid === "prism"
          ? [
              [n, askWhat === "F" ? (n === 4 ? "Don't forget the top and bottom faces." : "Don't forget the two end faces.") :askWhat === "V" ? "Each end has corners — and there are two ends." : "Count the edges round both ends AND the ones joining them."],
              ...(askWhat === "E" ? ([[2 * n, "You've counted the edges round both ends — now add the edges joining them."]] as Array<[number, string]>) : []),
            ]
          : [[n, askWhat === "F" ? "Don't forget the base." : askWhat === "V" ? "Don't forget the apex at the top." : "Count the base edges AND the sloping edges up to the apex."]];
      return {
        prompt: `How many ${word} does a ${name} have?`,
        answer: { type: "number", value: ans },
        solution: [why, `Check with Euler: V + F − E = ${vv} + ${ff} − ${ee} = 2 ✓`],
        hint: solid === "prism" ? "Picture the two identical ends and the rectangles joining them." : "Picture the base and the triangles meeting at the apex.",
        traps: numTraps(ans, trapList),
      };
    },
  },

  // 8 ── plans and elevations ──────────────────────────────────────────────────
  {
    id: `${T}.plans-elevations`,
    topicId: T,
    title: "Read a plan view: cubes and elevations",
    level: 2,
    guideRef: "plans-elevations",
    generate(rng, tier): DrillItem {
      const R = tier === 1 ? 2 : rng.pick([2, 3]);
      const C = tier === 1 ? rng.pick([2, 3]) : tier === 2 ? 3 : rng.pick([3, 4]);
      const maxH = tier === 1 ? 3 : tier === 2 ? 3 : 4;
      const kind = rng.pick(tier === 1 ? ["total", "front", "front"] : ["total", "front", "side", "side"]);
      let g: number[][] = [];
      let total = 0, front = 0, side = 0, frontRow = 0, plan = 0;
      const ok = () => {
        // every row and column used, connected, and the asked view is not trivially the front row
        for (let r = 0; r < R; r++) if (!g[r].some((v) => v > 0)) return false;
        for (let c = 0; c < C; c++) if (!g.some((row) => row[c] > 0)) return false;
        const seen = new Set<string>();
        const cells: Array<[number, number]> = [];
        for (let r = 0; r < R; r++) for (let c = 0; c < C; c++) if (g[r][c] > 0) cells.push([r, c]);
        const stack = [cells[0]];
        seen.add(`${cells[0][0]},${cells[0][1]}`);
        while (stack.length) {
          const [r, c] = stack.pop()!;
          for (const [dr, dc] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
            const rr = r + dr, cc = c + dc;
            if (rr >= 0 && rr < R && cc >= 0 && cc < C && g[rr][cc] > 0 && !seen.has(`${rr},${cc}`)) {
              seen.add(`${rr},${cc}`);
              stack.push([rr, cc]);
            }
          }
        }
        if (seen.size !== cells.length) return false;
        if (kind === "front" && frontRow === front) return false;
        if (kind === "side" && side === front) return false;
        return total !== front && total !== side;
      };
      for (let i = 0; i < 300; i++) {
        g = Array.from({ length: R }, () => Array.from({ length: C }, () => (tier === 1 ? rng.int(1, maxH) : rng.bool(0.2) ? 0 : rng.int(1, maxH))));
        total = g.flat().reduce((s, v) => s + v, 0);
        plan = g.flat().filter((v) => v > 0).length;
        const colMax = Array.from({ length: C }, (_, c) => Math.max(...g.map((row) => row[c])));
        const rowMax = g.map((row) => Math.max(...row));
        front = colMax.reduce((s, v) => s + v, 0);
        side = rowMax.reduce((s, v) => s + v, 0);
        frontRow = g[R - 1].reduce((s, v) => s + v, 0);
        if (ok()) break;
      }
      const colMax = Array.from({ length: C }, (_, c) => Math.max(...g.map((row) => row[c])));
      const rowMax = g.map((row) => Math.max(...row));
      const big2 = tier === 3; // 2 cm cubes → areas ×4, volumes ×8
      const cubeWord = big2 ? "2 cm cubes" : "1 cm cubes";
      const rowNames = R === 2 ? ["Back row", "Front row"] : ["Back row", "Middle row", "Front row"];
      const rowsText = g.map((row, i) => `${rowNames[i]}: ${row.map((v) => (v > 0 ? String(v) : "empty")).join(", ")}`).join(". ");
      const intro = `The diagram is the plan view (looking down from above) of a solid made from ${cubeWord}. The number in each square tells you how many cubes are stacked there (left to right — ${rowsText}).`;
      const diagram = drawPlan(g, kind === "side");

      if (kind === "total") {
        const ans = big2 ? total * 8 : total;
        return {
          prompt: big2 ? `${intro} What is the volume of the solid, in cm³?` : `${intro} How many cubes are in the solid?`,
          diagram,
          answer: { type: "number", value: ans, display: big2 ? `${ans} cm³` : String(ans) },
          solution: [
            `Add the stacks: ${g.flat().filter((v) => v > 0).join(" + ")} = ${total} cubes.`,
            ...(big2 ? [`Each 2 cm cube has volume 2 × 2 × 2 = 8 cm³, so the volume is ${total} × 8 = ${ans} cm³.`] : []),
          ],
          hint: "Each number is a stack. Add up all the stacks.",
          traps: numTraps(ans, [
            [big2 ? plan * 8 : plan, "That counts the squares in the plan, but some squares have more than one cube stacked on them."],
            ...(big2 ? ([[total * 2, "A 2 cm cube has volume 2 × 2 × 2 = 8 cm³, not 2 cm³."], [total, "That's the number of cubes. Each one has volume 8 cm³."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      const isFront = kind === "front";
      const count = isFront ? front : side;
      const heights = isFront ? colMax : rowMax;
      const ans = big2 ? count * 4 : count;
      const view = isFront ? "front elevation (the view from the front)" : "side elevation (the view from the side marked by the arrow)";
      return {
        prompt: big2 ? `${intro} What is the area of the ${view}, in cm²?` : `${intro} How many squares can be seen in the ${view}?`,
        diagram,
        answer: { type: "number", value: ans, display: big2 ? `${ans} cm²` : String(ans) },
        solution: [
          isFront
            ? `From the front, each column of the plan shows only its tallest stack. Column heights, left to right: ${heights.join(", ")}.`
            : `From the side, each row of the plan shows only its tallest stack. Row heights, back to front: ${heights.join(", ")}.`,
          `Squares seen = ${heights.join(" + ")} = ${count}.`,
          ...(big2 ? [`Each square is 2 cm × 2 cm = 4 cm², so the area is ${count} × 4 = ${ans} cm².`] : []),
        ],
        hint: isFront ? "Looking from the front, a short stack behind a tall one is hidden. What is the tallest stack in each column?" : "Looking from the side, you see one stack per row — the tallest one. What is it for each row?",
        traps: numTraps(ans, [
          [big2 ? total * 4 : total, "That's every cube. In an elevation you only see the tallest stack in each line — the ones behind are hidden."],
          ...(isFront ? ([[big2 ? frontRow * 4 : frontRow, "That's only the front row. A taller stack further back still shows above it."]] as Array<[number, string]>) : ([[big2 ? front * 4 : front, "That's the view from the front. From the side you look along the rows instead."]] as Array<[number, string]>)),
          ...(big2 ? ([[count * 2, "Each square in the elevation is 2 cm × 2 cm = 4 cm²."]] as Array<[number, string]>) : []),
        ]),
      };
    },
  },

  // 9 ── surface area of cubes and cuboids ─────────────────────────────────────
  {
    id: `${T}.surface-area-cuboid`,
    topicId: T,
    title: "Surface area of cubes and cuboids",
    level: 2,
    guideRef: "surface-area",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["cube", "cuboid", "cuboid"] : tier === 2 ? ["cube", "cuboid", "cuboid", "open"] : ["open", "cube-back", "enlarge", "cuboid"];
      const kind = rng.pick(kinds);

      if (kind === "cube") {
        let a = 4;
        for (let i = 0; i < 100; i++) {
          a = tier === 1 ? rng.int(2, 10) : halfOr(rng, 3, 15, 0.3);
          if (a !== 6) break; // 6 × 6² = 6³ would make the volume trap equal the answer
        }
        const S = clean(6 * a * a);
        const thing = rng.pick(a <= 3 ? ["cube", "wooden cube", "dice"] : ["cube", "wooden cube", "cube-shaped gift box"]);
        return {
          prompt: `A ${thing} has edges of ${num(a)} cm. Find its total surface area in cm².`,
          answer: { type: "number", value: S, display: `${num(S)} cm²` },
          solution: [`A cube has 6 identical square faces.`, `One face = ${num(a)} × ${num(a)} = ${num(clean(a * a))} cm².`, `Surface area = 6 × ${num(clean(a * a))} = ${num(S)} cm²`],
          hint: "How many faces does a cube have, and what shape is each one?",
          traps: numTraps(S, [
            [a * a * a, "That's the volume. Surface area adds up the areas of the 6 faces."],
            [6 * a, "Each face is a square of area edge × edge, not just the edge."],
            [4 * a * a, "A cube has 6 faces, not 4 — include the top and bottom."],
          ]),
        };
      }

      if (kind === "cube-back") {
        const a = rng.int(2, 12);
        const S = 6 * a * a;
        return {
          prompt: `A cube has a total surface area of ${S} cm². Find its volume in cm³.`,
          answer: { type: "number", value: a * a * a, display: `${a * a * a} cm³` },
          solution: [`One face = ${S} ÷ 6 = ${a * a} cm².`, `Edge = {{sqrt(${a * a})}} = ${a} cm.`, `Volume = ${a} × ${a} × ${a} = ${a * a * a} cm³`],
          hint: "Work backwards: area of one face, then the edge length, then the volume.",
          traps: numTraps(a * a * a, [
            [a * a, "That's the area of one face. Find the edge, then cube it."],
            [a, "That's the edge length. The volume is edge × edge × edge."],
          ]),
        };
      }

      let l = 8, w = 5, h = 3;
      for (let i = 0; i < 100; i++) {
        if (tier === 1) { l = rng.int(2, 10); w = rng.int(2, 10); h = rng.int(2, 10); }
        else { l = rng.int(4, 20); w = rng.int(3, 15); h = halfOr(rng, 2, 12, 0.35); }
        if (l !== w && w !== h && l !== h) break;
      }
      if (kind === "open" && w > l) [l, w] = [w, l]; // "long" should be the longer side
      const lw = clean(l * w), lh = clean(l * h), wh = clean(w * h);
      const S = clean(2 * (lw + lh + wh));
      const V = clean(l * w * h);

      if (kind === "open") {
        const So = clean(lw + 2 * lh + 2 * wh);
        const thing = rng.pick(["open box (it has no lid)", "storage box with no lid", "planter box with an open top"]);
        return {
          prompt: `A cuboid-shaped ${thing} is ${num(l)} cm long, ${num(w)} cm wide and ${num(h)} cm high. Find the area of its outside surface in cm². (There is no top face.)`,
          answer: { type: "number", value: So, display: `${num(So)} cm²` },
          solution: [
            `Base: ${num(l)} × ${num(w)} = ${num(lw)} (only one — there is no lid).`,
            `Front and back: 2 × ${num(l)} × ${num(h)} = ${num(clean(2 * lh))}. Two ends: 2 × ${num(w)} × ${num(h)} = ${num(clean(2 * wh))}.`,
            `Total = ${num(lw)} + ${num(clean(2 * lh))} + ${num(clean(2 * wh))} = ${num(So)} cm²`,
          ],
          hint: "Sketch the net. How many faces are there without the lid?",
          traps: numTraps(So, [
            [S, "That includes a lid. This box has no top, so leave out one of the l × w faces."],
            [V, "That's the volume. Surface area adds the areas of the faces."],
          ]),
        };
      }

      if (kind === "enlarge") {
        const k = rng.pick([2, 3]);
        const S2 = clean(S * k * k);
        return {
          prompt: `A cuboid is ${num(l)} cm by ${num(w)} cm by ${num(h)} cm. It is enlarged by scale factor ${k}. Find the surface area of the enlarged cuboid in cm².`,
          answer: { type: "number", value: S2, display: `${num(S2)} cm²` },
          solution: [
            `Original surface area = 2 × (${num(lw)} + ${num(lh)} + ${num(wh)}) = ${num(S)} cm².`,
            `Every length is × ${k}, so every face area is × ${k} × ${k} = × ${k * k}.`,
            `New surface area = ${num(S)} × ${k * k} = ${num(S2)} cm²`,
          ],
          hint: "If every length is multiplied by the scale factor, what happens to the area of each face?",
          traps: numTraps(S2, [
            [S * k, "Lengths are × " + `${k}, but areas use two lengths multiplied together, so they are × ${k * k}.`],
            [S * k * k * k, "Volume scales by the cube of the scale factor; area scales by the square."],
            [S, "That's the surface area before the enlargement."],
          ]),
        };
      }

      const thing = rng.pick(Math.max(l, w, h) >= 15 ? ["closed cuboid box", "cereal box", "shoebox", "block of wood"] : ["closed cuboid box", "gift box", "block of wood"]);
      return {
        prompt: `A ${thing} measures ${num(l)} cm by ${num(w)} cm by ${num(h)} cm. Find its total surface area in cm².`,
        answer: { type: "number", value: S, display: `${num(S)} cm²` },
        solution: [
          `There are three pairs of matching faces: ${num(l)} × ${num(w)} = ${num(lw)}, ${num(l)} × ${num(h)} = ${num(lh)}, ${num(w)} × ${num(h)} = ${num(wh)}.`,
          `One of each = ${num(lw)} + ${num(lh)} + ${num(wh)} = ${num(clean(lw + lh + wh))}.`,
          `Surface area = 2 × ${num(clean(lw + lh + wh))} = ${num(S)} cm²`,
        ],
        hint: "A cuboid has 6 faces in 3 matching pairs. Find the area of one of each pair.",
        traps: numTraps(S, [
          [lw + lh + wh, "That's only three faces. Each face has a matching one opposite it, so double it."],
          [V, "That's the volume. Surface area adds up the areas of the 6 faces."],
        ]),
      };
    },
  },

  // 10 ── surface area of triangular prisms & square-based pyramids ─────────────
  {
    id: `${T}.surface-area-prism-pyramid`,
    topicId: T,
    title: "Surface area of triangular prisms and pyramids",
    level: 3,
    guideRef: "surface-area",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["right-prism", "pyramid"] : tier === 2 ? ["right-prism", "iso-prism", "pyramid"] : ["iso-prism", "pyramid", "tent", "right-prism"];
      const kind = rng.pick(kinds);

      if (kind === "right-prism") {
        const pool: Array<[number, number, number]> = tier === 1 ? [[3, 4, 5], [6, 8, 10]] : [[3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15], [8, 15, 17], [12, 16, 20]];
        const tri = rng.pick(pool);
        const swap = rng.bool();
        const a = swap ? tri[1] : tri[0], b = swap ? tri[0] : tri[1], c = tri[2];
        let L = 10;
        for (let i = 0; i < 100; i++) {
          L = rng.int(tier === 1 ? 4 : 5, tier === 1 ? 12 : 25);
          if (L !== a && L !== b && L !== c) break;
        }
        const ends = a * b; // 2 × ½ab
        const rects = (a + b + c) * L;
        const S = ends + rects;
        const thing = rng.pick(["triangular prism", "wooden doorstop shaped like a triangular prism", "cheese-wedge box shaped like a triangular prism"]);
        return {
          prompt: `A ${thing} is ${L} cm long. Its cross-section is a right-angled triangle with sides ${a} cm, ${b} cm and ${c} cm. Find its total surface area in cm².`,
          answer: { type: "number", value: S, display: `${S} cm²` },
          solution: [
            `Two triangular ends: the right angle is between the ${a} cm and ${b} cm sides, so each end is {{1/2}} × ${a} × ${b} = ${ends / 2} cm². Two ends = ${ends} cm².`,
            `Three rectangles, each ${L} cm long: (${a} + ${b} + ${c}) × ${L} = ${a + b + c} × ${L} = ${rects} cm².`,
            `Total = ${ends} + ${rects} = ${S} cm²`,
          ],
          hint: "Sketch the net: two triangles and three rectangles. The longest side of a right-angled triangle is opposite the right angle.",
          traps: numTraps(S, [
            [ends / 2 + rects, "There are TWO triangular ends."],
            [2 * ends + rects, "Each triangle is half of a × b — remember the {{1/2}}."],
            [(ends / 2) * L, "That's the volume (cross-section × length), not the surface area."],
          ]),
        };
      }

      const pool: Array<[number, number, number]> = tier === 1 ? [[3, 4, 5], [6, 8, 10], [4, 3, 5]] : [[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10], [5, 12, 13], [12, 5, 13], [8, 15, 17], [15, 8, 17], [12, 16, 20], [16, 12, 20]];
      const [p, hh, s] = rng.pick(pool); // half-base, vertical height, slant
      const base = 2 * p;

      if (kind === "pyramid") {
        const S = base * base + 2 * base * s;
        const giveVertical = tier !== 1;
        const thing = rng.pick(["square-based pyramid", "square-based pyramid paperweight", "square-based pyramid gift box"]);
        return {
          prompt: `A ${thing} has a base of side ${base} cm. Each triangular face has a slant height (height of the triangle) of ${s} cm${giveVertical ? `, and the pyramid's vertical height is ${hh} cm` : ""}. Find its total surface area in cm².`,
          answer: { type: "number", value: S, display: `${S} cm²` },
          solution: [
            `Square base: ${base} × ${base} = ${base * base} cm².`,
            `Four triangles: 4 × {{1/2}} × ${base} × ${s} = ${2 * base * s} cm²${giveVertical ? ` (use the slant height — the vertical height is not a height of any face)` : ""}.`,
            `Total = ${base * base} + ${2 * base * s} = ${S} cm²`,
          ],
          hint: "The net is one square and four identical triangles. Which height belongs to a triangular face?",
          traps: numTraps(S, [
            [2 * base * s, "Don't forget the square base."],
            [base * base + 4 * base * s, "Each triangle is {{1/2}} × base × slant height."],
            ...(giveVertical ? ([[base * base + 2 * base * hh, "The vertical height goes through the inside of the pyramid. Each triangular face uses the slant height."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      let L = 10;
      for (let i = 0; i < 100; i++) {
        L = rng.int(5, 25);
        if (L !== base && L !== s && L !== hh) break;
      }
      const tri = p * hh; // ½ × 2p × hh
      if (kind === "tent") {
        // tent-sized triples in metres: [half-base, height, sloping side]
        const [tp, th, ts] = rng.pick([[1.5, 2, 2.5], [2, 1.5, 2.5], [1.2, 1.6, 2], [1.6, 1.2, 2], [1, 2.4, 2.6], [2.4, 1, 2.6], [0.9, 1.2, 1.5], [1.2, 0.9, 1.5]] as Array<[number, number, number]>);
        const tb = clean(2 * tp);
        const TL = halfOr(rng, 2, 5, 0.5);
        const ends = clean(tb * th); // 2 × ½ × base × height
        const sides = clean(2 * ts * TL);
        const S = clean(ends + sides);
        return {
          prompt: `A tent is a triangular prism ${num(TL)} m long with no groundsheet (no floor). Its cross-section is an isosceles triangle with base ${num(tb)} m, perpendicular height ${num(th)} m and two sloping sides of ${num(ts)} m. How much fabric is needed to make it, in m²?`,
          answer: { type: "number", value: S, display: `${num(S)} m²` },
          solution: [
            `Two triangular ends: 2 × {{1/2}} × ${num(tb)} × ${num(th)} = ${num(ends)} m².`,
            `Two sloping rectangles: 2 × ${num(ts)} × ${num(TL)} = ${num(sides)} m². (No floor rectangle.)`,
            `Fabric = ${num(ends)} + ${num(sides)} = ${num(S)} m²`,
          ],
          hint: "List the faces of the prism, then cross out the floor.",
          traps: numTraps(S, [
            [S + tb * TL, "That includes the floor — but the tent has no groundsheet."],
            [ends + 2 * th * TL, `The sloping rectangles are ${num(ts)} m wide (the sloping side), not the height.`],
            [ends / 2 + sides, "There are TWO triangular ends."],
          ]),
        };
      }

      const S = 2 * tri + (base + 2 * s) * L;
      return {
        prompt: `A triangular prism is ${L} cm long. Its cross-section is an isosceles triangle with base ${base} cm, perpendicular height ${hh} cm and two equal sides of ${s} cm. Find its total surface area in cm².`,
        answer: { type: "number", value: S, display: `${S} cm²` },
        solution: [
          `Two triangular ends: 2 × {{1/2}} × ${base} × ${hh} = ${2 * tri} cm².`,
          `Three rectangles: (${base} + ${s} + ${s}) × ${L} = ${base + 2 * s} × ${L} = ${(base + 2 * s) * L} cm².`,
          `Total = ${2 * tri} + ${(base + 2 * s) * L} = ${S} cm²`,
        ],
        hint: "Sketch the net: two triangles and three rectangles. The rectangles' widths are the three sides of the triangle.",
        traps: numTraps(S, [
          [tri + (base + 2 * s) * L, "There are TWO triangular ends."],
          [2 * tri + (base + 2 * hh) * L, "The rectangles are as wide as the triangle's sides — use the sloping sides, not the height."],
          [tri * L, "That's the volume, not the surface area."],
        ]),
      };
    },
  },

  // 11 ── volume of cuboids and prisms ─────────────────────────────────────────
  {
    id: `${T}.volume-prism`,
    topicId: T,
    title: "Volume of cuboids and prisms",
    level: 2,
    guideRef: "volume",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["cuboid", "cross-section", "tri-prism"] : tier === 2 ? ["cuboid", "tri-prism", "tri-prism", "trap-prism"] : ["tri-prism", "trap-prism", "find-length", "find-length"];
      const kind = rng.pick(kinds);

      if (kind === "cuboid") {
        let l = 6, w = 4, h = 3;
        for (let i = 0; i < 100; i++) {
          if (tier === 1) { l = rng.int(2, 12); w = rng.int(2, 10); h = rng.int(2, 10); }
          else { l = rng.int(5, 25); w = rng.int(3, 15); h = halfOr(rng, 2, 12, 0.4); }
          if (l !== w && w !== h && l !== h) break;
        }
        const V = clean(l * w * h);
        const thing = rng.pick(Math.max(l, w, h) >= 15 ? ["cuboid", "box of tissues", "storage box", "cardboard box"] : ["cuboid", "wooden block", "block of tofu"]);
        return {
          prompt: `A ${thing} measures ${num(l)} cm by ${num(w)} cm by ${num(h)} cm. Find its volume in cm³.`,
          answer: { type: "number", value: V, display: `${num(V)} cm³` },
          solution: [`Volume of a cuboid = length × width × height.`, `${num(l)} × ${num(w)} × ${num(h)} = ${num(clean(l * w))} × ${num(h)} = ${num(V)} cm³`],
          hint: "How many centimetre cubes fit on the bottom layer, and how many layers are there?",
          traps: numTraps(V, [
            [2 * (l * w + l * h + w * h), "That's the surface area. Volume = length × width × height."],
            [l + w + h, "Multiply the three lengths, don't add them."],
          ]),
        };
      }

      if (kind === "cross-section") {
        let A = 24, L = 10;
        for (let i = 0; i < 100; i++) {
          A = rng.int(6, 40);
          L = rng.int(3, 20);
          if (A !== L) break;
        }
        const V = A * L;
        const shape = rng.pick(["L-shaped", "hexagonal", "trapezium-shaped", "triangular", "pentagonal"]);
        return {
          prompt: `A prism has ${shape === "L-shaped" ? "an" : "a"} ${shape} cross-section with area ${A} cm². The prism is ${L} cm long. Find its volume in cm³.`,
          answer: { type: "number", value: V, display: `${V} cm³` },
          solution: [`Volume of any prism = area of cross-section × length.`, `${A} × ${L} = ${V} cm³`],
          hint: "Think of the prism as a stack of identical slices, each with the cross-section's area.",
          traps: numTraps(V, [[A + L, "Multiply the cross-section area by the length."]]),
        };
      }

      if (kind === "tri-prism" || (kind === "find-length" && rng.bool())) {
        let b = 6, h = 4, L = 10;
        for (let i = 0; i < 100; i++) {
          b = rng.int(3, tier === 1 ? 10 : 16);
          h = rng.int(3, tier === 1 ? 10 : 16);
          L = tier === 2 ? halfOr(rng, 4, 20, 0.3) : rng.int(4, 25);
          if (b !== h && L !== b && L !== h && ((b * h) % 2 === 0 || tier !== 1)) break;
        }
        const A = clean((b * h) / 2);
        const V = clean(A * L);
        const thing = rng.pick(["triangular prism", "wedge-shaped doorstop (a triangular prism)", "ramp shaped like a triangular prism", "chocolate box shaped like a triangular prism"]);
        if (kind === "find-length") {
          return {
            prompt: `A ${thing} has a volume of ${num(V)} cm³. Its triangular cross-section has base ${b} cm and perpendicular height ${h} cm. How long is the prism, in cm?`,
            answer: { type: "number", value: L, display: `${num(L)} cm` },
            solution: [`Cross-section area = {{1/2}} × ${b} × ${h} = ${num(A)} cm².`, `Volume = area × length, so length = ${num(V)} ÷ ${num(A)} = ${num(L)} cm.`],
            hint: "Find the area of the triangle first, then undo the × length.",
            traps: numTraps(L, [[V / (b * h), "The triangle's area is {{1/2}} × base × height — you forgot the half."]]),
          };
        }
        return {
          prompt: `A ${thing} is ${num(L)} cm long. Its cross-section is a triangle with base ${b} cm and perpendicular height ${h} cm. Find its volume in cm³.`,
          answer: { type: "number", value: V, display: `${num(V)} cm³` },
          solution: [`Cross-section area = {{1/2}} × ${b} × ${h} = ${num(A)} cm².`, `Volume = cross-section area × length = ${num(A)} × ${num(L)} = ${num(V)} cm³`],
          hint: "Start with the area of the triangular end. Then multiply by the length.",
          traps: numTraps(V, [[b * h * L, "The cross-section is a triangle: its area is {{1/2}} × base × height. A triangular prism is half a cuboid."]]),
        };
      }

      // trapezium prism (or find-length on a cuboid/trapezium)
      let a = 1, b = 3, d = 20, w = 8;
      for (let i = 0; i < 100; i++) {
        a = rng.int(1, 2);
        b = a + rng.int(1, 3);
        d = rng.int(4, 10) * 5;
        w = rng.int(3, 12);
        if (d !== w) break;
      }
      const A = clean(((a + b) * d) / 2);
      const V = clean(A * w);
      if (kind === "find-length") {
        return {
          prompt: `A swimming pool holds ${num(V)} m³ of water when full. Its side view is a trapezium: the water is ${a} m deep at the shallow end and ${b} m deep at the deep end, and the ends are ${d} m apart. How wide is the pool, in m?`,
          answer: { type: "number", value: w, display: `${w} m` },
          solution: [`Side-view area = {{1/2}} × (${a} + ${b}) × ${d} = ${num(A)} m².`, `Width = volume ÷ cross-section = ${num(V)} ÷ ${num(A)} = ${w} m.`],
          hint: "The trapezium is the cross-section. Find its area, then divide the volume by it.",
          traps: numTraps(w, [[V / ((a + b) * d), "The trapezium's area is {{1/2}}(a + b) × distance — remember the half."]]),
        };
      }
      return {
        prompt: `A swimming pool is ${w} m wide. Its side view is a trapezium: the water is ${a} m deep at the shallow end and ${b} m deep at the deep end, and the ends are ${d} m apart. Find the volume of water in the full pool, in m³.`,
        answer: { type: "number", value: V, display: `${num(V)} m³` },
        solution: [
          `The cross-section (side view) is a trapezium: {{1/2}} × (${a} + ${b}) × ${d} = ${num(A)} m².`,
          `Volume = cross-section area × width = ${num(A)} × ${w} = ${num(V)} m³`,
        ],
        hint: "Which face is the same all the way through the pool? Find its area first.",
        traps: numTraps(V, [
          [(a + b) * d * w, "The trapezium's area is {{1/2}}(a + b) × distance — remember the half."],
          [b * d * w, "The pool isn't the deep-end depth all the way along. Use the trapezium's area."],
        ]),
      };
    },
  },

  // 12 ── volume and capacity ──────────────────────────────────────────────────
  {
    id: `${T}.volume-capacity`,
    topicId: T,
    title: "Volume and capacity: cm³, ml and litres",
    level: 2,
    guideRef: "volume",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["ml", "litres"] : tier === 2 ? ["litres", "litres", "fill-time", "cups"] : ["depth", "m3", "fill-time", "cups"];
      const kind = rng.pick(kinds);

      if (kind === "ml") {
        let l = 6, w = 6, h = 10;
        for (let i = 0; i < 100; i++) {
          l = rng.int(4, 12);
          w = rng.int(3, 10);
          h = rng.int(5, 20);
          if (l * w * h >= 100 && l !== w) break;
        }
        const V = l * w * h;
        const thing = rng.pick(["juice carton", "soy milk carton", "lunch box", "food container"]);
        return {
          prompt: `A cuboid ${thing} measures ${l} cm by ${w} cm by ${h} cm on the inside. How many millilitres (ml) does it hold when full?`,
          answer: { type: "number", value: V, display: `${V} ml` },
          solution: [`Volume = ${l} × ${w} × ${h} = ${V} cm³.`, `1 cm³ holds 1 ml, so it holds ${V} ml.`],
          hint: "Find the volume in cm³ first. How many ml fit in 1 cm³?",
          traps: numTraps(V, [[V / 1000, "That's the answer in litres. The question asks for millilitres: 1 cm³ = 1 ml."]]),
        };
      }

      if (kind === "litres") {
        let l = 50, w = 30, h = 40;
        for (let i = 0; i < 200; i++) {
          l = rng.int(4, 12) * 5;
          w = rng.int(4, 10) * 5;
          h = rng.int(3, 10) * 5;
          const V = l * w * h;
          if (l !== w && w !== h && (tier === 1 ? V % 1000 === 0 : V % 100 === 0)) break;
        }
        if (w > l) [l, w] = [w, l];
        const V = l * w * h;
        const Lt = clean(V / 1000);
        const thing = rng.pick(["fish tank", "water tank", "cool box", "rice storage bin"]);
        return {
          prompt: `A cuboid ${thing} is ${l} cm long, ${w} cm wide and ${h} cm deep on the inside. How many litres does it hold when full?`,
          answer: { type: "number", value: Lt, display: `${num(Lt)} litres` },
          solution: [`Volume = ${l} × ${w} × ${h} = ${big(V)} cm³.`, `1 litre = 1000 cm³, so ${big(V)} ÷ 1000 = ${num(Lt)} litres.`],
          hint: "Find the volume in cm³. How many cm³ make one litre?",
          traps: numTraps(Lt, [
            [V / 100, "1 litre is 1000 cm³, not 100 cm³."],
            [V, "That's in cm³ (or ml). Divide by 1000 to get litres."],
          ]),
        };
      }

      if (kind === "fill-time") {
        let l = 60, w = 40, h = 50, rate = 4;
        for (let i = 0; i < 300; i++) {
          l = rng.int(4, 16) * 10;
          w = rng.int(3, 10) * 10;
          h = rng.int(3, 10) * 10;
          rate = rng.pick([2, 3, 4, 5, 6, 8, 10, 12]);
          const Lt = (l * w * h) / 1000;
          if (Number.isInteger(Lt) && Lt % rate === 0 && Lt / rate >= 3 && l !== w) break;
        }
        const Lt = (l * w * h) / 1000;
        const mins = Lt / rate;
        const who = rng.pick(["Priya", "Jun", "Aisha", "Ethan", "Wei Ling"]);
        return {
          prompt: `${who} fills an empty cuboid tank ${l} cm by ${w} cm by ${h} cm with a hose that delivers ${rate} litres of water per minute. How many minutes does it take to fill the tank?`,
          answer: { type: "number", value: mins, display: `${num(mins)} minutes` },
          solution: [`Volume = ${l} × ${w} × ${h} = ${big(l * w * h)} cm³ = ${num(Lt)} litres.`, `Time = ${num(Lt)} ÷ ${rate} = ${num(mins)} minutes.`],
          hint: "Change the volume into litres first, so it matches the hose's rate.",
          traps: numTraps(mins, [
            [(l * w * h) / rate, "Convert cm³ to litres (÷ 1000) before dividing by the rate."],
            [Lt * rate, "Divide the volume by the rate — a faster hose should take less time."],
          ]),
        };
      }

      if (kind === "cups") {
        let jugMl = 1500, cup = 200;
        for (let i = 0; i < 100; i++) {
          jugMl = rng.int(5, 30) * 100 + (rng.bool(0.3) ? 50 : 0);
          cup = rng.pick([150, 175, 200, 250, 300, 330]);
          if (jugMl % cup !== 0 && jugMl / cup >= 3) break;
        }
        const full = Math.floor(jugMl / cup);
        const drink = rng.pick(["lime juice", "soy milk", "barley water", "sugarcane juice"]);
        return {
          prompt: `A jug holds ${num(jugMl / 1000)} litres of ${drink}. How many ${cup} ml cups can be filled completely from the jug?`,
          answer: { type: "number", value: full },
          solution: [
            `${num(jugMl / 1000)} litres = ${big(jugMl)} ml.`,
            `${big(jugMl)} ÷ ${cup} = ${full} remainder ${jugMl - full * cup}.`,
            `So ${full} cups can be filled completely (the last ${jugMl - full * cup} ml is not enough for another cup).`,
          ],
          hint: "Change litres to ml first (× 1000). Then think: how many whole cups?",
          traps: numTraps(full, [
            [full + 1, "The last cup would not be full — round DOWN when you need complete cups."],
            [(jugMl * 100) % cup === 0 ? jugMl / cup : 0, "Only completely full cups count, so the answer must be a whole number — round down."],
          ]),
        };
      }

      if (kind === "depth") {
        let l = 40, w = 25, Lt = 6, d = 6;
        for (let i = 0; i < 200; i++) {
          l = rng.int(4, 12) * 5;
          w = rng.int(4, 10) * 5;
          Lt = rng.int(3, 40);
          d = clean((Lt * 1000) / (l * w));
          if (l !== w && (Lt * 10000) % (l * w) === 0 && d >= 2 && d <= 40) break;
        }
        return {
          prompt: `${Lt} litres of water are poured into an empty cuboid tank whose base is ${l} cm by ${w} cm. How deep is the water, in cm?`,
          answer: { type: "number", value: d, display: `${num(d)} cm` },
          solution: [
            `${Lt} litres = ${big(Lt * 1000)} cm³.`,
            `Base area = ${l} × ${w} = ${l * w} cm².`,
            `Depth = volume ÷ base area = ${big(Lt * 1000)} ÷ ${l * w} = ${num(d)} cm`,
          ],
          hint: "Volume = base area × depth. Change the litres into cm³ first.",
          traps: numTraps(d, [
            [Lt / (l * w), "Change litres to cm³ (× 1000) before dividing."],
            [(Lt * 100) / (l * w), "1 litre = 1000 cm³, not 100 cm³."],
          ]),
        };
      }

      // m3: pond in metres → litres
      let lc = 200, wc = 150, dc = 40;
      for (let i = 0; i < 100; i++) {
        lc = rng.int(10, 40) * 10;
        wc = rng.int(5, 25) * 10;
        dc = rng.int(2, 9) * 10;
        if (lc !== wc && (lc % 100 !== 0 || wc % 100 !== 0)) break;
      }
      const litres = (lc * wc * dc) / 1000;
      const m3 = clean(litres / 1000);
      return {
        prompt: `A cuboid ${rng.pick(["garden pond", "rainwater tank", "fish pond", "paddling pool"])} is ${num(lc / 100)} m long, ${num(wc / 100)} m wide and ${num(dc / 100)} m deep. How many litres of water does it hold when full?`,
        answer: { type: "number", value: litres, display: `${big(litres)} litres` },
        solution: [
          `Volume = ${num(lc / 100)} × ${num(wc / 100)} × ${num(dc / 100)} = ${num(m3)} m³.`,
          `1 m³ = 100 cm × 100 cm × 100 cm = 1,000,000 cm³ = 1000 litres.`,
          `${num(m3)} × 1000 = ${big(litres)} litres`,
        ],
        hint: "Find the volume in m³. How many litres fill a 1 m cube?",
        traps: numTraps(litres, [
          [m3, "That's the volume in m³. Each m³ holds 1000 litres."],
          [m3 * 100, "1 m³ holds 1000 litres (a cube 100 cm on each side)."],
        ]),
      };
    },
  },

  // 13 ── cylinders (stretch) ──────────────────────────────────────────────────
  {
    id: `${T}.cylinders`,
    topicId: T,
    title: "Volume and surface area of a cylinder",
    level: 3,
    guideRef: "cylinders",
    generate(rng, tier): DrillItem {
      const kinds = tier === 1 ? ["volume", "volume", "height-pi"] : tier === 2 ? ["volume", "surface", "height-pi"] : ["surface", "height-pi", "litres", "volume"];
      const kind = rng.pick(kinds);
      let r = 4, h = 10;
      for (let i = 0; i < 100; i++) {
        r = rng.int(2, tier === 1 ? 8 : 15);
        h = rng.int(3, tier === 1 ? 15 : 30);
        if (r !== h && 2 * r !== h) break;
      }
      const giveD = tier >= 2 && rng.bool(0.5);
      const dimText = giveD ? `diameter ${2 * r} cm` : `radius ${r} cm`;
      const thing = rng.pick(["cylinder", "cylindrical tin", "cylindrical candle", "cylindrical vase", "cylindrical cake tin"]);

      if (kind === "height-pi") {
        const k = r * r * h;
        return {
          prompt: `A ${thing} has ${dimText} and volume ${k}π cm³. Find its height in cm.`,
          answer: { type: "number", value: h, display: `${h} cm` },
          solution: [
            ...(giveD ? [`Radius = ${2 * r} ÷ 2 = ${r} cm.`] : []),
            `Volume = π r² h, so ${k}π = π × ${r}² × h = ${r * r}π × h.`,
            `h = ${k} ÷ ${r * r} = ${h} cm`,
          ],
          hint: "Write V = π r² h with the numbers in. The π on both sides cancels.",
          traps: numTraps(h, [
            [k / r, "Square the radius: r² = " + `${r} × ${r} = ${r * r}.`],
            ...(giveD ? ([[k / (4 * r * r), "Use the radius (half the diameter), not the diameter."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      if (kind === "surface") {
        const S = roundTo(2 * Math.PI * r * r + 2 * Math.PI * r * h, 1);
        return {
          prompt: `A closed ${thing === "cylindrical vase" ? "cylindrical tin" : thing} has ${dimText} and height ${h} cm. Find its total surface area in cm², to 1 decimal place. (Use the π key on your calculator.)`,
          answer: { type: "number", value: S, display: `${dp1(S)} cm²` },
          solution: [
            ...(giveD ? [`Radius = ${2 * r} ÷ 2 = ${r} cm.`] : []),
            `Two circles: 2 × π × ${r}² = ${2 * r * r}π. Curved surface (unrolls to a rectangle 2πr by h): 2 × π × ${r} × ${h} = ${2 * r * h}π.`,
            `Total = ${2 * r * r + 2 * r * h}π = ${dp1(S)} cm² (1 d.p.)`,
          ],
          hint: "The net is two circles and a rectangle. How long is the rectangle? (It wraps round the circle.)",
          traps: numTraps(S, [
            [roundTo(Math.PI * r * r + 2 * Math.PI * r * h, 1), "A closed cylinder has TWO circular ends."],
            [roundTo(2 * Math.PI * r * h, 1), "That's just the curved surface. Add the two circular ends."],
            ...(giveD ? ([[roundTo(2 * Math.PI * 4 * r * r + 2 * Math.PI * 2 * r * h, 1), "Use the radius (half the diameter), not the diameter."]] as Array<[number, string]>) : []),
          ]),
        };
      }

      if (kind === "litres") {
        let R = 20, H = 50;
        for (let i = 0; i < 100; i++) {
          R = rng.int(2, 6) * 5;
          H = rng.int(4, 12) * 10;
          if (R !== H) break;
        }
        const Lt = roundTo((Math.PI * R * R * H) / 1000, 1);
        return {
          prompt: `A cylindrical water tank has radius ${R} cm and height ${H} cm. How many litres does it hold when full? Give your answer to 1 decimal place.`,
          answer: { type: "number", value: Lt, display: `${dp1(Lt)} litres` },
          solution: [`Volume = π × ${R}² × ${H} = ${R * R * H}π cm³.`, `1 litre = 1000 cm³, so capacity = ${R * R * H}π ÷ 1000 = ${dp1(Lt)} litres (1 d.p.)`],
          hint: "Find the volume in cm³ with π r² h, then change cm³ to litres.",
          traps: numTraps(Lt, [
            [roundTo((Math.PI * R * R * H) / 100, 1), "1 litre is 1000 cm³, not 100."],
            [roundTo((Math.PI * 2 * R * H) / 1000, 1), "Square the radius: r² means r × r, not 2 × r."],
          ]),
        };
      }

      const V = roundTo(Math.PI * r * r * h, 1);
      return {
        prompt: `A ${thing} has ${dimText} and height ${h} cm. Find its volume in cm³, to 1 decimal place. (Use the π key on your calculator.)`,
        answer: { type: "number", value: V, display: `${dp1(V)} cm³` },
        solution: [
          ...(giveD ? [`Radius = ${2 * r} ÷ 2 = ${r} cm.`] : []),
          `A cylinder is a prism with a circular cross-section: area = π × ${r}² = ${r * r}π cm².`,
          `Volume = ${r * r}π × ${h} = ${r * r * h}π = ${dp1(V)} cm³ (1 d.p.)`,
        ],
        hint: "Area of the circular end × height. Use the radius, not the diameter.",
        traps: numTraps(V, [
          [roundTo(2 * Math.PI * r * h, 1), "That's the curved surface area. Volume = area of the circle × height."],
          [roundTo(Math.PI * r * h, 1), "Square the radius: r² = r × r."],
          ...(giveD ? ([[roundTo(Math.PI * 4 * r * r * h, 1), "Use the radius (half the diameter), not the diameter."]] as Array<[number, string]>) : []),
        ]),
      };
    },
  },
];
