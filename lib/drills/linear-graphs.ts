// Procedural skill drills for "linear-graphs" (Straight-Line & Real-Life Graphs).
// Every generator builds the answer first from integers, then writes the
// question around it, so the marked answer is exact.
import type { Drill } from "./types.ts";
import type { AnswerSpec, Trap } from "../types.ts";
import { frac, gcd, num, br, poly, clean, signed, money } from "./helpers.ts";

const TOPIC = "linear-graphs";

const NAMES = ["Aisha", "Wei Ling", "Arjun", "Priya", "Marcus", "Siti", "Ethan", "Mei", "Ravi", "Hana", "Jun", "Zara"];

// ---------------------------------------------------------------------------
// Small formatting helpers
// ---------------------------------------------------------------------------

/** Coordinates in plain text: (3, −2). */
function pt(x: number, y: number): string {
  return `(${num(x)}, ${num(y)})`;
}

/** Plain ASCII number for use inside {{ }} (the renderer turns - into −). */
function asc(n: number): string {
  return String(clean(n));
}

function sameList(a: number[], b: number[]): boolean {
  return a.length === b.length && a.every((v, i) => Math.abs(v - b[i]) < 1e-9);
}

function range(lo: number, hi: number): number[] {
  const out: number[] = [];
  for (let i = lo; i <= hi; i++) out.push(i);
  return out;
}

/** Simplified gradient n/d with d > 0. */
function grad(n: number, d: number): [number, number] {
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d) || 1;
  return [n / g, d / g];
}

/** A gradient value for text: 3, −2 or {{-3/2}}. */
function mText(n: number, d: number): string {
  return d === 1 ? num(n) : frac(n, d);
}

/** The x-term inside {{ }}: "3x", "-x", "1/2 x", "-3/2 x". Empty when n = 0. */
function xTerm(n: number, d: number, v = "x"): string {
  if (n === 0) return "";
  const s = n < 0 ? "-" : "";
  const a = Math.abs(n);
  if (d === 1) return s + (a === 1 ? v : `${a}${v}`);
  return `${s}${a}/${d} ${v}`;
}

/** Right-hand side of y = mx + c, for use inside {{ }}. */
function rhs(n: number, d: number, c: number, v = "x"): string {
  const t = xTerm(n, d, v);
  if (!t) return asc(c);
  if (c === 0) return t;
  return `${t} ${c < 0 ? "-" : "+"} ${asc(Math.abs(c))}`;
}

/** "{{y = 3x - 2}}" */
function lineMarkup(n: number, d: number, c: number): string {
  return `{{y = ${rhs(n, d, c)}}}`;
}

/** Plain ASCII answer expression: "3x-2", "-x+4", "1/2x+3", "-3/2x". */
function lineExpr(n: number, d: number, c: number): string {
  let t = "";
  if (n !== 0) {
    const s = n < 0 ? "-" : "";
    const a = Math.abs(n);
    t = d === 1 ? s + (a === 1 ? "x" : `${a}x`) : `${s}${a}/${d}x`;
  }
  if (!t) return asc(c);
  if (c === 0) return t;
  return `${t}${c < 0 ? "-" : "+"}${asc(Math.abs(c))}`;
}

/** Expression answer for the line y = (n/d)x + c. */
function lineSpec(n: number, d: number, c: number): AnswerSpec {
  return { type: "expression", expr: `y=${lineExpr(n, d, c)}`, display: lineMarkup(n, d, c) };
}

/** True when (n1/d1, c1) and (n2/d2, c2) are the same line. */
function sameLine(n1: number, d1: number, c1: number, n2: number, d2: number, c2: number): boolean {
  return n1 * d2 === n2 * d1 && c1 === c2;
}

/** A pipe table of x-values and y-values (null = "?"). */
function tableMd(xs: number[], ys: (number | null)[]): string {
  const head = `| x | ${xs.map(num).join(" | ")} |`;
  const sep = `|${"---|".repeat(xs.length + 1)}`;
  const row = `| y | ${ys.map((v) => (v === null ? "?" : num(v))).join(" | ")} |`;
  return [head, sep, row].join("\n");
}

/** "$40" for whole dollars, "$3.90" otherwise (input in cents). */
function dollars(cents: number): string {
  return cents % 100 === 0 ? `$${cents / 100}` : money(cents / 100);
}

function joinAnd(items: string[]): string {
  return items.length <= 1 ? items.join("") : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;
}

const HALO = `stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke"`;

/** Coordinate grid from −6 to 6 with the line y = (n/d)x + c and a marked point P. */
function lineGraphSvg(n: number, d: number, c: number, px: number, py: number, showIntercept: boolean): string {
  const R = 6, S = 20, O = 150;
  const X = (x: number) => +(O + S * x).toFixed(2);
  const Y = (y: number) => +(O - S * y).toFixed(2);
  const out: string[] = [`<rect x="0" y="0" width="300" height="300" fill="#ffffff"/>`];
  for (let i = -R; i <= R; i++) {
    out.push(`<line x1="${X(i)}" y1="${Y(-R)}" x2="${X(i)}" y2="${Y(R)}" stroke="#e5e7eb" stroke-width="1"/>`);
    out.push(`<line x1="${X(-R)}" y1="${Y(i)}" x2="${X(R)}" y2="${Y(i)}" stroke="#e5e7eb" stroke-width="1"/>`);
  }
  out.push(`<line x1="${X(-R)}" y1="${O}" x2="${X(R)}" y2="${O}" stroke="#334155" stroke-width="1.5"/>`);
  out.push(`<line x1="${O}" y1="${Y(-R)}" x2="${O}" y2="${Y(R)}" stroke="#334155" stroke-width="1.5"/>`);
  for (let i = -R; i <= R; i++) {
    if (i === 0) continue;
    out.push(`<text x="${X(i)}" y="${O + 14}" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" ${HALO}>${num(i)}</text>`);
    out.push(`<text x="${O - 5}" y="${Y(i) + 4}" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" ${HALO}>${num(i)}</text>`);
  }
  out.push(`<text x="${X(R) + 10}" y="${O + 4}" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">x</text>`);
  out.push(`<text x="${O}" y="${Y(R) - 8}" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle">y</text>`);
  // Clip y = mx + c to the square −6 ≤ x, y ≤ 6.
  const m = n / d;
  const xa = (-R - c) / m, xb = (R - c) / m;
  const lo = Math.max(-R, Math.min(xa, xb)), hi = Math.min(R, Math.max(xa, xb));
  out.push(`<line x1="${X(lo)}" y1="${Y(m * lo + c)}" x2="${X(hi)}" y2="${Y(m * hi + c)}" stroke="#2563eb" stroke-width="2.2"/>`);
  if (showIntercept) out.push(`<circle cx="${X(0)}" cy="${Y(c)}" r="4" fill="#dc2626"/>`);
  out.push(`<circle cx="${X(px)}" cy="${Y(py)}" r="4" fill="#1f2937"/>`);
  // Keep the "P" label clear of the tick numbers that run along both axes.
  const lx = px === -1 ? X(px) - 7 : X(px) + 7;
  const ly = py === -1 ? Y(py) + 17 : Y(py) - 7;
  out.push(`<text x="${lx}" y="${ly}" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="${px === -1 ? "end" : "start"}" ${HALO}>P</text>`);
  const label = `A straight line on a coordinate grid with x and y from −6 to 6. The line crosses the y-axis at ${pt(0, c)} and passes through the marked point P${pt(px, py)}.`;
  return `<svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${out.join("")}</svg>`;
}

/** Distance–time graph: time in minutes across, distance from home in km up. */
function distanceTimeSvg(points: [number, number][], T: number, D: number, dStep: number, label: string): string {
  const L = 52, Rt = 340, B = 206, Tp = 20;
  const W = Rt - L, H = B - Tp;
  const X = (t: number) => +(L + (W * t) / T).toFixed(2);
  const Y = (v: number) => +(B - (H * v) / D).toFixed(2);
  const out: string[] = [`<rect x="0" y="0" width="360" height="250" fill="#ffffff"/>`];
  for (let t = 0; t <= T; t += 10) out.push(`<line x1="${X(t)}" y1="${Y(0)}" x2="${X(t)}" y2="${Y(D)}" stroke="#e5e7eb" stroke-width="1"/>`);
  for (let v = 0; v <= D; v += dStep) out.push(`<line x1="${X(0)}" y1="${Y(v)}" x2="${X(T)}" y2="${Y(v)}" stroke="#e5e7eb" stroke-width="1"/>`);
  out.push(`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(T)}" y2="${Y(0)}" stroke="#334155" stroke-width="1.5"/>`);
  out.push(`<line x1="${X(0)}" y1="${Y(0)}" x2="${X(0)}" y2="${Y(D)}" stroke="#334155" stroke-width="1.5"/>`);
  const tLabel = T <= 100 ? 10 : 20;
  for (let t = 0; t <= T; t += tLabel) {
    out.push(`<text x="${X(t)}" y="${Y(0) + 15}" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle">${t}</text>`);
  }
  for (let v = 0; v <= D; v += dStep) {
    out.push(`<text x="${X(0) - 6}" y="${Y(v) + 4}" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end">${v}</text>`);
  }
  out.push(`<text x="${(L + Rt) / 2}" y="243" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Time (minutes)</text>`);
  out.push(`<text x="14" y="${(B + Tp) / 2}" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" transform="rotate(-90 14 ${(B + Tp) / 2})">Distance from home (km)</text>`);
  out.push(`<polyline points="${points.map(([t, v]) => `${X(t)},${Y(v)}`).join(" ")}" fill="none" stroke="#2563eb" stroke-width="2.4" stroke-linejoin="round"/>`);
  for (const [t, v] of points) out.push(`<circle cx="${X(t)}" cy="${Y(v)}" r="3.2" fill="#1f2937"/>`);
  return `<svg viewBox="0 0 360 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}">${out.join("")}</svg>`;
}

// ---------------------------------------------------------------------------
// Drills
// ---------------------------------------------------------------------------

export const drills: Drill[] = [
  // 1 ---------------------------------------------------------------- midpoint
  {
    id: "linear-graphs.midpoint",
    topicId: TOPIC,
    title: "Find the midpoint of a line segment",
    level: 1,
    guideRef: "coordinates-midpoints",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.6)) {
        // Work backwards: one endpoint and the midpoint are known.
        let x1 = -3, y1 = 2, mx = 1, my = 5;
        for (let i = 0; i < 100; i++) {
          x1 = rng.int(-9, 9);
          y1 = rng.int(-9, 9);
          mx = rng.int(-8, 8);
          my = rng.int(-8, 8);
          if (x1 !== mx && y1 !== my && (x1 < 0 || y1 < 0 || mx < 0 || my < 0)) break;
        }
        const dx = mx - x1, dy = my - y1;
        const bx = mx + dx, by = my + dy;
        const [P, Q, M] = rng.pick([["A", "B", "M"], ["P", "Q", "M"], ["C", "D", "N"]]);
        const prompt =
          rng.pick([
            `${M}${pt(mx, my)} is the midpoint of the line segment ${P}${Q}. ${P} is the point ${pt(x1, y1)}. Find the coordinates of ${Q}.`,
            `The midpoint of ${P}${Q} is ${pt(mx, my)}. ${P} is ${pt(x1, y1)}. What are the coordinates of ${Q}?`,
          ]) + " Give your answer as coordinates (x, y).";
        const traps: Trap[] = [];
        const half = [(x1 + mx) / 2, (y1 + my) / 2];
        if (!sameList(half, [bx, by])) {
          traps.push({ spec: { type: "list", values: half, ordered: true }, feedback: `That's the midpoint of ${P} and the midpoint. The midpoint is in the middle, so ${Q} is the same step beyond it as ${P} is before it.` });
        }
        if (!sameList([dx, dy], [bx, by])) {
          traps.push({ spec: { type: "list", values: [dx, dy], ordered: true }, feedback: `That's the step from ${P} to the midpoint. Now add that step on to the midpoint.` });
        }
        return {
          prompt,
          answer: { type: "list", values: [bx, by], ordered: true, display: pt(bx, by) },
          solution: [
            `Step from ${P} to the midpoint: x changes by ${num(mx)} − ${br(x1)} = ${num(dx)} and y changes by ${num(my)} − ${br(y1)} = ${num(dy)}.`,
            `${Q} is the same step on from the midpoint: x = ${num(mx)} + ${br(dx)} = ${num(bx)} and y = ${num(my)} + ${br(dy)} = ${num(by)}.`,
            `Check: ((${num(x1)} + ${br(bx)}) ÷ 2, (${num(y1)} + ${br(by)}) ÷ 2) = ${pt(mx, my)}. ✓`,
          ],
          hint: `The midpoint is halfway, so ${Q} is as far beyond the midpoint as ${P} is before it.`,
          traps,
        };
      }
      let x1 = 2, y1 = 3, x2 = 8, y2 = 7;
      for (let i = 0; i < 200; i++) {
        const lo = tier === 1 ? 0 : tier === 2 ? -10 : -15;
        const hi = tier === 1 ? 10 : tier === 2 ? 10 : 15;
        x1 = rng.int(lo, hi);
        y1 = rng.int(lo, hi);
        x2 = rng.int(lo, hi);
        y2 = rng.int(lo, hi);
        if (x1 === x2 || y1 === y2) continue;
        const evenX = (x1 + x2) % 2 === 0, evenY = (y1 + y2) % 2 === 0;
        if (tier === 1 && !(evenX && evenY)) continue;
        if (tier >= 2 && !(x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0)) continue;
        if (tier === 3 && evenX && evenY) continue;
        break;
      }
      const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
      const name = rng.pick(NAMES);
      const prompt =
        rng.pick([
          `Find the midpoint of the line segment joining A${pt(x1, y1)} and B${pt(x2, y2)}.`,
          `P is the point ${pt(x1, y1)} and Q is the point ${pt(x2, y2)}. Find the coordinates of the midpoint of PQ.`,
          `On a map grid, a hawker centre is at ${pt(x1, y1)} and an MRT station is at ${pt(x2, y2)}. A bench is placed exactly halfway between them. Find the coordinates of the bench.`,
          `${name} plots the points ${pt(x1, y1)} and ${pt(x2, y2)} and joins them with a straight line. Where is the midpoint of the line?`,
        ]) + " Give your answer as coordinates (x, y).";
      const traps: Trap[] = [];
      const noHalf = [x1 + x2, y1 + y2];
      if (!sameList(noHalf, [mx, my])) traps.push({ spec: { type: "list", values: noHalf, ordered: true }, feedback: "You added the coordinates — now halve them. The midpoint is the mean of the two coordinates." });
      const diff = [(x2 - x1) / 2, (y2 - y1) / 2];
      if (!sameList(diff, [mx, my]) && !sameList(diff, noHalf)) traps.push({ spec: { type: "list", values: diff, ordered: true }, feedback: "You subtracted the coordinates. For a midpoint, add them and halve (find the mean)." });
      return {
        prompt,
        answer: { type: "list", values: [mx, my], ordered: true, display: pt(mx, my) },
        solution: [
          `Add the x-coordinates and halve: (${num(x1)} + ${br(x2)}) ÷ 2 = ${num(x1 + x2)} ÷ 2 = ${num(mx)}.`,
          `Add the y-coordinates and halve: (${num(y1)} + ${br(y2)}) ÷ 2 = ${num(y1 + y2)} ÷ 2 = ${num(my)}.`,
          `Midpoint = ${pt(mx, my)}.`,
        ],
        hint: "The midpoint's x-coordinate is the mean of the two x-coordinates; the same goes for y.",
        traps,
      };
    },
  },

  // 2 ----------------------------------------------------------- special lines
  {
    id: "linear-graphs.special-lines",
    topicId: TOPIC,
    title: "Lines x = a, y = b, y = x and y = −x",
    level: 1,
    guideRef: "special-lines",
    generate(rng, tier) {
      const val = () => (tier === 1 ? rng.int(1, 9) : rng.nonZero(-9, 9));
      const eqText = (v: "x" | "y", a: number): AnswerSpec => ({ type: "text", accept: [`${v}=${asc(a)}`, `${asc(a)}=${v}`], display: `{{${v} = ${asc(a)}}}` });
      const diagSpec = (s: number): AnswerSpec =>
        s === 1
          ? { type: "text", accept: ["y=x", "x=y", "y=1x", "y-x=0", "x-y=0"], display: "{{y = x}}" }
          : { type: "text", accept: ["y=-x", "x=-y", "y=-1x", "x+y=0", "y+x=0"], display: "{{y = -x}}" };
      const kinds = tier === 1 ? ["vpts", "hpts", "vdesc", "hdesc"] : tier === 2 ? ["vpts", "hpts", "diag", "vdesc", "hdesc", "cross"] : ["diag", "axis", "cross", "crossdiag", "crossdiag", "vpts", "hpts"];
      const kind = rng.pick(kinds);
      const askEq = " Write down the equation of the line.";

      if (kind === "vpts" || kind === "hpts") {
        const a = val();
        const others = rng.shuffle(range(tier === 1 ? 0 : -8, tier === 1 ? 9 : 8)).slice(0, 3).sort((u, w) => u - w);
        const pts = others.map((o) => (kind === "vpts" ? pt(a, o) : pt(o, a)));
        const v = kind === "vpts" ? "x" : "y";
        const w = kind === "vpts" ? "y" : "x";
        return {
          prompt: `The points ${joinAnd(pts)} all lie on one straight line.${askEq}`,
          answer: eqText(v, a),
          solution: [
            `Every point has ${v}-coordinate ${num(a)}, while the ${w}-coordinate changes.`,
            `So the rule every point obeys is ${v} = ${num(a)}: a ${kind === "vpts" ? "vertical" : "horizontal"} line.`,
          ],
          hint: "Which coordinate stays the same in every point?",
          traps: [{ spec: eqText(w, a), feedback: `All the ${v}-coordinates are ${num(a)}, so the rule is about ${v}: ${v} = ${num(a)}.` }],
        };
      }
      if (kind === "diag") {
        const s = rng.pick([1, -1]);
        const ks = rng.shuffle([...range(-6, -1), ...range(1, 6)]).slice(0, 3).sort((u, w) => u - w);
        const pts = ks.map((k) => pt(k, s * k));
        return {
          prompt: `The points ${joinAnd(pts)} all lie on one straight line.${askEq}`,
          answer: diagSpec(s),
          solution: [
            s === 1 ? "In every point the y-coordinate equals the x-coordinate." : "In every point the y-coordinate is the negative of the x-coordinate.",
            s === 1 ? "So the line is {{y = x}}, the diagonal rising through the origin." : "So the line is {{y = -x}}, the diagonal falling through the origin.",
          ],
          hint: "Compare the x- and y-coordinates of each point. How is y linked to x?",
          traps: [
            {
              spec: diagSpec(-s),
              feedback: s === 1 ? "Look at the signs: y and x are equal (same sign), so y = x." : "Look at the signs: y is the negative of x, so y = −x.",
            },
          ],
        };
      }
      if (kind === "vdesc" || kind === "hdesc" || kind === "axis") {
        let p = val(), q = val();
        for (let i = 0; i < 50 && p === q; i++) q = val();
        if (p === q) q = p + 1;
        const vertical = kind === "vdesc" ? true : kind === "hdesc" ? false : rng.bool();
        const desc =
          kind === "axis"
            ? `the straight line through ${pt(p, q)} that is parallel to the ${vertical ? "y" : "x"}-axis`
            : `the ${vertical ? "vertical" : "horizontal"} line through ${pt(p, q)}`;
        const prompt = rng.pick([`Write down the equation of ${desc}.`, `What is the equation of ${desc}?`]);
        const answer = vertical ? eqText("x", p) : eqText("y", q);
        const traps: Trap[] = vertical
          ? [
              { spec: eqText("y", q), feedback: "A vertical line goes straight up and down, so its x-coordinate is fixed: x = …" },
              { spec: eqText("x", q), feedback: `Use the x-coordinate of the point, ${num(p)}.` },
            ]
          : [
              { spec: eqText("x", p), feedback: "A horizontal line goes straight across, so its y-coordinate is fixed: y = …" },
              { spec: eqText("y", p), feedback: `Use the y-coordinate of the point, ${num(q)}.` },
            ];
        return {
          prompt,
          answer,
          solution: [
            vertical
              ? `A line ${kind === "axis" ? "parallel to the y-axis" : "that is vertical"} goes straight up and down: every point on it has the same x-coordinate.`
              : `A line ${kind === "axis" ? "parallel to the x-axis" : "that is horizontal"} goes straight across: every point on it has the same y-coordinate.`,
            vertical ? `It passes through ${pt(p, q)}, so that x-coordinate is ${num(p)}: {{x = ${asc(p)}}}.` : `It passes through ${pt(p, q)}, so that y-coordinate is ${num(q)}: {{y = ${asc(q)}}}.`,
          ],
          hint: vertical ? "On a vertical line, which coordinate never changes?" : "On a horizontal line, which coordinate never changes?",
          traps,
        };
      }
      if (kind === "cross") {
        let a = val(), b = val();
        for (let i = 0; i < 50 && a === b; i++) b = val();
        if (a === b) b = a + 1;
        const lines = rng.bool() ? `{{x = ${asc(a)}}} and {{y = ${asc(b)}}}` : `{{y = ${asc(b)}}} and {{x = ${asc(a)}}}`;
        return {
          prompt: `The lines ${lines} cross at one point. Write down the coordinates of that point as (x, y).`,
          answer: { type: "list", values: [a, b], ordered: true, display: pt(a, b) },
          solution: [
            `Every point on {{x = ${asc(a)}}} has x-coordinate ${num(a)}.`,
            `Every point on {{y = ${asc(b)}}} has y-coordinate ${num(b)}.`,
            `The crossing point is on both lines, so it is ${pt(a, b)}.`,
          ],
          hint: "The crossing point lies on both lines, so it obeys both rules at once.",
          traps: [{ spec: { type: "list", values: [b, a], ordered: true }, feedback: `x = ${num(a)} fixes the x-coordinate, and x always comes first: (${num(a)}, …).` }],
        };
      }
      // crossdiag: a vertical/horizontal line meets y = x or y = −x.
      const a = rng.nonZero(-9, 9);
      const s = rng.pick([1, -1]);
      const vertical = rng.bool();
      const diag = s === 1 ? "{{y = x}}" : "{{y = -x}}";
      const ans: [number, number] = vertical ? [a, s * a] : [s * a, a];
      const wrong: [number, number] = vertical ? [a, -s * a] : [-s * a, a];
      const first = vertical ? `{{x = ${asc(a)}}}` : `{{y = ${asc(a)}}}`;
      return {
        prompt: `Where does the line ${first} cross the line ${diag}? Give the coordinates as (x, y).`,
        answer: { type: "list", values: ans, ordered: true, display: pt(ans[0], ans[1]) },
        solution: [
          vertical ? `On {{x = ${asc(a)}}}, the x-coordinate is ${num(a)}.` : `On {{y = ${asc(a)}}}, the y-coordinate is ${num(a)}.`,
          s === 1 ? "On {{y = x}}, the y-coordinate equals the x-coordinate." : "On {{y = -x}}, the y-coordinate is the negative of the x-coordinate.",
          `So the crossing point is ${pt(ans[0], ans[1])}.`,
        ],
        hint: "Use the first line to fix one coordinate, then use the diagonal's rule to find the other.",
        traps: [{ spec: { type: "list", values: wrong, ordered: true }, feedback: s === 1 ? "On y = x the two coordinates are equal — same sign." : "On y = −x the two coordinates have opposite signs." }],
      };
    },
  },

  // 3 -------------------------------------------------------- table of values
  {
    id: "linear-graphs.table-of-values",
    topicId: TOPIC,
    title: "Complete a table of values for a straight line",
    level: 1,
    guideRef: "plotting-lines",
    generate(rng, tier) {
      let n = 2, d = 1, c = 1;
      let rev = false;
      let xs = [0, 1, 2, 3];
      if (tier === 1) {
        n = rng.int(2, 5);
        c = rng.nonZero(-5, 9);
        xs = rng.pick([[0, 1, 2, 3], [1, 2, 3, 4], [0, 1, 2, 3, 4]]);
      } else if (tier === 2) {
        n = rng.pick([-4, -3, -2, 2, 3, 4, 5]);
        c = rng.nonZero(-8, 8);
        xs = rng.pick([[-2, -1, 0, 1, 2], [-3, -2, -1, 0, 1], [-1, 0, 1, 2, 3]]);
        rev = n < 0 && rng.bool();
      } else if (rng.bool()) {
        n = rng.pick([1, -1, 3, -3, 5]);
        d = 2;
        c = rng.nonZero(-6, 6);
        xs = rng.pick([[-4, -2, 0, 2, 4], [-2, 0, 2, 4, 6], [-6, -4, -2, 0, 2]]);
      } else {
        n = -rng.int(2, 6);
        rev = true;
        c = rng.nonZero(-5, 10);
        xs = rng.pick([[-3, -2, -1, 0, 1], [-2, -1, 0, 1, 2], [-1, 0, 1, 2, 3]]);
      }
      const k = -n; // used when rev (y = c − kx)
      const eq = rev ? `{{y = ${asc(c)} - ${k}x}}` : lineMarkup(n, d, c);
      const ys = xs.map((x) => (n * x) / d + c);
      const calc = (x: number, y: number) => (rev ? `${num(c)} − ${k} × ${br(x)} = ${num(y)}` : `${mText(n, d)} × ${br(x)} ${signed(c)} = ${num(y)}`);
      const step = xs[1] - xs[0];
      const traps: Trap[] = [];
      const noC = xs.map((x) => (n * x) / d);
      traps.push({ spec: { type: "list", values: noC, ordered: true }, feedback: `Don't forget the constant: after multiplying, ${c > 0 ? "add" : "subtract"} ${num(Math.abs(c))}.` });
      if (rev) {
        const wrongSign = xs.map((x) => c + k * x);
        if (!sameList(wrongSign, ys)) traps.push({ spec: { type: "list", values: wrongSign, ordered: true }, feedback: `The x-term is being subtracted: y = ${num(c)} − ${k} × x. For a negative x, subtracting a negative makes y bigger.` });
      } else if (xs.some((x) => x < 0)) {
        const slip = xs.map((x) => (n * Math.abs(x)) / d + c);
        if (!sameList(slip, ys)) traps.push({ spec: { type: "list", values: slip, ordered: true }, feedback: "Check the negative x-values: a negative times a negative is positive, and a positive times a negative is negative." });
      }
      return {
        prompt: `Complete the table of values for ${eq}.\n\n${tableMd(xs, xs.map(() => null))}\n\nType the y-values in order from left to right, separated by commas.`,
        answer: { type: "list", values: ys, ordered: true },
        solution: [
          `Substitute each x-value into ${eq}:`,
          xs.map((x, i) => `x = ${num(x)}: ${calc(x, ys[i])}`).join("; ") + ".",
          `Check the pattern: each step of ${step} in x changes y by ${num((n * step) / d)}.`,
          `y-values: ${ys.map(num).join(", ")}.`,
        ],
        hint: "Replace x by each number in turn. Put negative numbers in brackets.",
        traps,
      };
    },
  },

  // 4 ---------------------------------------- read m and c from an equation
  {
    id: "linear-graphs.read-gradient-intercept",
    topicId: TOPIC,
    title: "Read the gradient and y-intercept from an equation",
    level: 1,
    guideRef: "gradient-intercept",
    generate(rng, tier) {
      type Form = "std" | "rev" | "ky" | "ymx" | "axby";
      const form: Form = tier === 1 ? "std" : tier === 2 ? rng.pick<Form>(["std", "std", "rev", "rev"]) : rng.pick<Form>(["ky", "ymx", "axby", "axby"]);
      let n = 2, d = 1, c = 3;
      let eq = "";
      const steps: string[] = [];
      const extraTraps: { vals: number[]; feedback: string }[] = [];
      if (form === "std") {
        if (tier === 1) {
          n = rng.int(2, 9);
          c = rng.nonZero(-9, 9);
        } else {
          [n, d] = rng.pick<[number, number]>([[-5, 1], [-4, 1], [-3, 1], [-2, 1], [-1, 1], [1, 1], [3, 1], [6, 1], [1, 2], [-1, 2], [3, 2], [3, 4], [-1, 4]]);
          c = rng.int(-9, 9);
        }
        eq = lineMarkup(n, d, c);
      } else if (form === "rev") {
        n = rng.nonZero(-7, 7);
        c = rng.nonZero(-9, 9);
        eq = `{{y = ${asc(c)} ${n < 0 ? "-" : "+"} ${xTerm(Math.abs(n), 1)}}}`;
        steps.push(`Reorder: ${eq} is the same as ${lineMarkup(n, 1, c)}.`);
        if (n < 0) extraTraps.push({ vals: [-n, c], feedback: "The gradient includes the sign in front of the x-term. Here x is being subtracted, so the gradient is negative." });
      } else if (form === "ky") {
        const k = rng.pick([2, 3, 4, 5]);
        if (k % 2 === 0 && rng.bool(0.4)) {
          n = rng.pick([1, -1, 3, -3, 5]);
          d = 2;
        } else n = rng.nonZero(-6, 6);
        c = rng.nonZero(-6, 6);
        eq = `{{${k}y = ${rhs((k * n) / d, 1, k * c)}}}`;
        steps.push(`Divide every term by ${k} to get y on its own: ${lineMarkup(n, d, c)}.`);
        extraTraps.push({ vals: [(k * n) / d, k * c], feedback: `Divide every term by ${k} first, so that the equation starts "y = …".` });
      } else if (form === "ymx") {
        n = rng.pick([-6, -5, -4, -3, -2, 2, 3, 4, 5, 6]);
        c = rng.nonZero(-9, 9);
        eq = `{{y ${n < 0 ? "+" : "-"} ${xTerm(Math.abs(n), 1)} = ${asc(c)}}}`;
        steps.push(`${n < 0 ? "Subtract" : "Add"} ${Math.abs(n)}x ${n < 0 ? "from" : "to"} both sides: ${lineMarkup(n, 1, c)}.`);
        extraTraps.push({ vals: [-n, c], feedback: "When you move the x-term to the other side of the equals sign, its sign changes." });
      } else {
        const b = rng.pick([1, 2, 2, 4]);
        const a = rng.nonZero(-6, 6);
        c = rng.nonZero(-5, 5);
        const e = b * c;
        [n, d] = grad(-a, b);
        eq = `{{${poly([[a, "x"], [b, "y"]])} = ${asc(e)}}}`;
        steps.push(`${a > 0 ? "Subtract" : "Add"} ${xTerm(Math.abs(a), 1)} ${a > 0 ? "from" : "to"} both sides: {{${b === 1 ? "y" : `${b}y`} = ${rhs(-a, 1, e)}}}.`);
        if (b !== 1) {
          steps.push(`Divide every term by ${b}: ${lineMarkup(n, d, c)}.`);
          extraTraps.push({ vals: [-a, e], feedback: `Divide every term by ${b} so that the equation starts "y = …".` });
        }
        extraTraps.push({ vals: [a / b, c], feedback: "Rearrange carefully: moving the x-term to the other side changes its sign." });
      }
      const m = n / d;
      const ans = [m, c];
      const traps: Trap[] = [];
      const add = (vals: number[], feedback: string) => {
        if (!sameList(vals, ans) && !traps.some((t) => t.spec.type === "list" && sameList(t.spec.values, vals))) {
          traps.push({ spec: { type: "list", values: vals, ordered: true }, feedback });
        }
      };
      add([c, m], "You've swapped them. The gradient is the number multiplying x; the y-intercept is the number on its own.");
      for (const t of extraTraps) add(t.vals, t.feedback);
      const prompt =
        rng.pick([`Write down the gradient and the y-intercept of the line ${eq}.`, `For the straight line ${eq}, what are the gradient and the y-intercept?`]) +
        "\n\nType the gradient first, then the y-intercept (the y-value where the line crosses the y-axis), separated by a comma." +
        (tier === 1 ? "" : " A fraction like 3/4 is fine.");
      return {
        prompt,
        answer: { type: "list", values: ans, ordered: true, display: `${mText(n, d)}, ${num(c)}` },
        solution: [
          ...steps,
          `Compare with {{y = mx + c}}: the gradient m is the number multiplying x, sign included, so m = ${mText(n, d)}.`,
          `The y-intercept is c = ${num(c)}: the line crosses the y-axis at ${pt(0, c)}.`,
        ],
        hint: form === "std" || form === "rev" ? "Match it to y = mx + c. Which number multiplies x? Which is on its own?" : "First rearrange so the equation starts \"y = …\".",
        traps,
      };
    },
  },

  // 5 --------------------------------------------- spot the error in a table
  {
    id: "linear-graphs.table-error",
    topicId: TOPIC,
    title: "Spot the mistake in a table of values",
    level: 2,
    guideRef: "plotting-lines",
    generate(rng, tier) {
      let n = 2, d = 1, c = 1;
      let rev = false;
      let xs = [0, 1, 2, 3, 4];
      if (tier === 1) {
        n = rng.int(2, 5);
        c = rng.nonZero(-5, 9);
        xs = rng.pick([[0, 1, 2, 3, 4], [1, 2, 3, 4, 5]]);
      } else if (tier === 2) {
        n = rng.pick([-4, -3, -2, 2, 3, 4, 5]);
        c = rng.nonZero(-8, 8);
        xs = rng.pick([[-2, -1, 0, 1, 2], [-3, -2, -1, 0, 1], [-1, 0, 1, 2, 3]]);
      } else if (rng.bool()) {
        n = rng.pick([1, -1, 3, -3]);
        d = 2;
        c = rng.nonZero(-6, 6);
        xs = rng.pick([[-4, -2, 0, 2, 4], [-6, -4, -2, 0, 2]]);
      } else {
        n = -rng.int(2, 6);
        rev = true;
        c = rng.nonZero(-5, 10);
        xs = rng.pick([[-3, -2, -1, 0, 1], [-2, -1, 0, 1, 2]]);
      }
      const k = -n;
      const eq = rev ? `{{y = ${asc(c)} - ${k}x}}` : lineMarkup(n, d, c);
      const ys = xs.map((x) => (n * x) / d + c);
      const calc = (x: number, y: number) => (rev ? `${num(c)} − ${k} × ${br(x)} = ${num(y)}` : `${mText(n, d)} × ${br(x)} ${signed(c)} = ${num(y)}`);
      // Choose the wrong column (prefer x ≠ 0 at tiers 2–3) and a realistic slip.
      let idx = 0;
      for (let i = 0; i < 50; i++) {
        idx = rng.int(0, xs.length - 1);
        if (tier === 1 || xs[idx] !== 0) break;
      }
      const x = xs[idx], y = ys[idx];
      const cands: number[] = [];
      if (x !== 0) cands.push((-n * x) / d + c); // sign slip
      if (x !== 0) cands.push((n * x) / d); // forgot the constant
      cands.push(y + 1, y - 1, y + 2, y - 2);
      const pool = cands.filter((v) => !ys.includes(v));
      const extra = [y + 3, y - 3, y + 10, y - 10].filter((v) => !ys.includes(v));
      const wrong = rng.pick(pool.length ? pool : extra);
      const shown = ys.map((v, i) => (i === idx ? wrong : v));
      const name = rng.pick(NAMES);
      const traps: Trap[] = [{ spec: { type: "number", value: wrong }, feedback: `${num(wrong)} is the value already in the table — that's the wrong one. Substitute x = ${num(x)} again carefully.` }];
      if (x !== y && x !== wrong) traps.push({ spec: { type: "number", value: x }, feedback: "That's the x-value of the column with the mistake. Give the correct y-value." });
      const stepY = (n * (xs[1] - xs[0])) / d;
      return {
        prompt:
          rng.pick([
            `${name} made this table of values for ${eq}, but one of the y-values is wrong.`,
            `One y-value in this table for ${eq} has been worked out wrongly.`,
          ]) + `\n\n${tableMd(xs, shown)}\n\nWhat should the wrong y-value be?`,
        answer: { type: "number", value: y },
        solution: [
          `Substitute each x-value into ${eq} and compare with the table.`,
          `At x = ${num(x)}: ${calc(x, y)}, but the table shows ${num(wrong)}.`,
          `The other values all fit, and the y-values should change by ${num(stepY)} every step — ${num(wrong)} breaks that pattern.`,
          `So the y-value should be ${num(y)}.`,
        ],
        hint: "Check each column by substituting. A straight line's y-values also change by the same amount each step.",
        traps,
      };
    },
  },

  // 6 ------------------------------------------- gradient from two points
  {
    id: "linear-graphs.gradient-two-points",
    topicId: TOPIC,
    title: "Find the gradient from two points",
    level: 2,
    guideRef: "gradient-intercept",
    generate(rng, tier) {
      if (tier === 3 && rng.bool(0.4)) {
        // Work backwards from a known gradient to a missing coordinate.
        let m = 2, x1 = 1, x2 = 4, y2 = 9;
        for (let i = 0; i < 100; i++) {
          m = rng.pick([-4, -3, -2, 2, 3, 4, 5]);
          x1 = rng.int(-6, 6);
          x2 = rng.int(-6, 8);
          y2 = rng.int(-12, 15);
          if (x1 === x2) continue;
          const kk = y2 - m * (x2 - x1);
          if (Math.abs(kk) > 25 || kk === 0) continue;
          break;
        }
        if (x1 === x2) x2 = x1 + 1;
        const run = x2 - x1;
        const rise = m * run;
        const k = y2 - rise;
        const traps: Trap[] = [];
        if (y2 + rise !== k) traps.push({ spec: { type: "number", value: y2 + rise }, feedback: "From the first point to the second, y changes by gradient × run. So k is the second y-value minus that change." });
        return {
          prompt: `The straight line through (${num(x1)}, k) and ${pt(x2, y2)} has gradient ${num(m)}. Find the value of k.`,
          answer: { type: "number", value: k },
          solution: [
            `Run = ${num(x2)} − ${br(x1)} = ${num(run)}.`,
            `Rise = gradient × run = ${num(m)} × ${br(run)} = ${num(rise)}.`,
            `So ${num(y2)} − k = ${num(rise)}, which gives k = ${num(y2)} − ${br(rise)} = ${num(k)}.`,
            `Check: (${num(y2)} − ${br(k)}) ÷ ${br(run)} = ${num(m)}. ✓`,
          ],
          hint: "Gradient = rise ÷ run, so rise = gradient × run.",
          traps,
        };
      }
      let x1 = 0, y1 = 0, x2 = 1, y2 = 2;
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          const m = rng.int(1, 4);
          const run = rng.int(1, 5);
          x1 = rng.int(0, 6);
          y1 = rng.int(0, 6);
          x2 = x1 + run;
          y2 = y1 + m * run;
          if (m === 1 && rng.bool(0.7)) continue;
          break;
        }
        const R = tier === 2 ? 8 : 15;
        x1 = rng.int(-R, R);
        y1 = rng.int(-R, R);
        x2 = rng.int(-R, R);
        y2 = rng.int(-R, R);
        const rise0 = y2 - y1, run0 = x2 - x1;
        if (run0 === 0 || rise0 === 0) continue;
        const [gn0, gd0] = grad(rise0, run0);
        if (Math.abs(gn0) === gd0) continue;
        if (gd0 > (tier === 2 ? 5 : 8) || Math.abs(gn0) > 12) continue;
        if (!(x1 < 0 || y1 < 0 || x2 < 0 || y2 < 0)) continue;
        break;
      }
      if (x1 === x2 || y1 === y2) {
        x1 = -2; y1 = 3; x2 = 4; y2 = -1;
      }
      const rise = y2 - y1, run = x2 - x1;
      const [gn, gd] = grad(rise, run);
      const traps: Trap[] = [];
      if (Math.abs(gn) !== gd) traps.push({ spec: { type: "fraction", n: gn < 0 ? -gd : gd, d: Math.abs(gn) }, feedback: "That's run ÷ rise. Gradient = rise ÷ run: the change in y goes on top." });
      traps.push({ spec: { type: "fraction", n: -gn, d: gd }, feedback: "Check the sign. Subtract in the same order on the top and the bottom (second point minus first point)." });
      const prompt =
        rng.pick([
          `Find the gradient of the straight line through ${pt(x1, y1)} and ${pt(x2, y2)}.`,
          `A straight line passes through A${pt(x1, y1)} and B${pt(x2, y2)}. Work out its gradient.`,
          `What is the gradient of the line segment joining ${pt(x1, y1)} and ${pt(x2, y2)}?`,
        ]) + " Give your answer as a whole number or as a fraction in its simplest form.";
      return {
        prompt,
        answer: { type: "fraction", n: gn, d: gd, simplest: true, allowDecimal: true, display: mText(gn, gd) },
        solution: [
          `Rise (change in y) = ${num(y2)} − ${br(y1)} = ${num(rise)}.`,
          `Run (change in x) = ${num(x2)} − ${br(x1)} = ${num(run)}.`,
          `Gradient = rise ÷ run = ${num(rise)} ÷ ${br(run)} = ${mText(gn, gd)}.`,
          gn > 0 ? "It is positive, so the line goes uphill from left to right." : "It is negative, so the line goes downhill from left to right.",
        ],
        hint: "Gradient = change in y ÷ change in x. Subtract in the same order both times.",
        traps,
      };
    },
  },

  // 7 -------------------------------------------- equation from a graph
  {
    id: "linear-graphs.equation-from-graph",
    topicId: TOPIC,
    title: "Write the equation of a line from its graph",
    level: 2,
    guideRef: "equations-of-lines",
    generate(rng, tier) {
      let n = 2, d = 1, c = 1;
      if (tier === 1) {
        n = rng.pick([1, 2, 2, 3, 3]);
        c = rng.int(0, 4);
      } else if (tier === 2) {
        n = rng.pick([-3, -2, -1, 1, 2, 3]);
        c = rng.int(-4, 4);
      } else {
        [n, d] = rng.pick<[number, number]>([[1, 2], [-1, 2], [3, 2], [-3, 2], [1, 3], [-1, 3], [2, 3], [-2, 3]]);
        c = rng.int(-3, 3);
      }
      // A second lattice point P on the line, inside the grid and not on the y-axis.
      const cands: [number, number][] = [];
      for (const j of [-3, -2, -1, 1, 2, 3]) {
        const px = j * d, py = c + j * n;
        if (Math.abs(px) <= 5 && Math.abs(py) <= 5) cands.push([px, py]);
      }
      const [px, py] = rng.pick(cands.filter(([x]) => x > 0).length && rng.bool(0.7) ? cands.filter(([x]) => x > 0) : cands);
      const traps: Trap[] = [];
      const add = (n2: number, d2: number, c2: number, feedback: string) => {
        if (!sameLine(n, d, c, n2, d2, c2)) traps.push({ spec: lineSpec(n2, d2, c2), feedback });
      };
      if (c !== 0) add(n, d, -c, "Check c: is the crossing point on the y-axis above or below the origin?");
      add(-n, d, c, "Check the sign of the gradient: uphill from left to right is positive, downhill is negative.");
      if (Math.abs(n) !== d) add(n < 0 ? -d : d, Math.abs(n), c, "Gradient = rise ÷ run (up ÷ across), not across ÷ up.");
      const runP = px, riseP = py - c;
      return {
        prompt:
          rng.pick([
            `The graph shows a straight line. The marked point P${pt(px, py)} lies on the line.`,
            `Look at the straight line on the grid. It passes through the marked point P${pt(px, py)}.`,
          ]) + " Find the equation of the line in the form {{y = mx + c}}.",
        diagram: lineGraphSvg(n, d, c, px, py, tier === 1),
        answer: lineSpec(n, d, c),
        solution: [
          `The line crosses the y-axis at ${pt(0, c)}, so c = ${num(c)}.`,
          `From ${pt(0, c)} to P${pt(px, py)}: run = ${num(runP)}, rise = ${num(py)} − ${br(c)} = ${num(riseP)}.`,
          `Gradient m = rise ÷ run = ${num(riseP)} ÷ ${br(runP)} = ${mText(n, d)}.`,
          `So the equation is ${lineMarkup(n, d, c)}.`,
        ],
        hint: "Read c where the line crosses the y-axis. Then use a rise/run triangle up to P for m.",
        traps,
      };
    },
  },

  // 8 ------------------------------------ equation from words / parallel lines
  {
    id: "linear-graphs.equation-from-description",
    topicId: TOPIC,
    title: "Write an equation from a description (including parallel lines)",
    level: 2,
    guideRef: "equations-of-lines",
    generate(rng, tier) {
      type Kind = "mc" | "steps" | "rule" | "par0" | "parPt" | "parForm";
      const kind: Kind =
        tier === 1 ? rng.pick<Kind>(["mc", "steps", "rule"]) : tier === 2 ? rng.pick<Kind>(["mc", "steps", "rule", "par0", "par0"]) : rng.pick<Kind>(["parPt", "parPt", "parForm", "rule"]);
      let n = 2, d = 1, c = 3;
      let prompt = "";
      let hint = "";
      const solution: string[] = [];
      const wrongs: { n: number; d: number; c: number; feedback: string }[] = [];
      if (kind === "mc") {
        if (tier === 1) {
          n = rng.int(2, 7);
          c = rng.nonZero(-9, 9);
        } else {
          [n, d] = rng.pick<[number, number]>([[-4, 1], [-3, 1], [-2, 1], [2, 1], [5, 1], [-1, 1], [1, 2], [-1, 2], [3, 2]]);
          c = rng.nonZero(-9, 9);
        }
        prompt = rng.pick([
          `A straight line has gradient ${mText(n, d)} and crosses the y-axis at ${pt(0, c)}. Write down its equation.`,
          `Write down the equation of the straight line with gradient ${mText(n, d)} and y-intercept ${num(c)}.`,
        ]);
        solution.push(`The gradient is m = ${mText(n, d)}.`, `The y-intercept is c = ${num(c)}.`);
        if (d === 1) wrongs.push({ n: c, d: 1, c: n, feedback: "You've swapped them: the gradient multiplies x, and the y-intercept is the number on its own." });
        hint = "Put the gradient in place of m and the y-intercept in place of c in y = mx + c.";
      } else if (kind === "steps") {
        const k = rng.int(2, 5);
        const up = tier === 1 ? true : rng.bool();
        n = up ? k : -k;
        c = rng.nonZero(-8, 8);
        prompt = `A straight line crosses the y-axis at ${pt(0, c)}. For every 1 unit it moves to the right, it goes ${up ? "up" : "down"} ${k} units. Write down the equation of the line.`;
        solution.push(`Going ${up ? "up" : "down"} ${k} for every 1 across means the gradient is ${num(n)}.`, `It crosses the y-axis at ${pt(0, c)}, so c = ${num(c)}.`);
        if (!up) wrongs.push({ n: k, d: 1, c, feedback: "Going down as you move right means the gradient is negative." });
        wrongs.push({ n: c, d: 1, c: n, feedback: "You've swapped them: the gradient multiplies x, and the y-intercept is the number on its own." });
        hint = "How much does y change for each 1 step in x? That's m.";
      } else if (kind === "rule") {
        n = tier === 3 && rng.bool(0.4) ? -rng.int(2, 6) : rng.int(2, 9);
        c = tier === 1 ? rng.int(1, 9) * (rng.bool(0.7) ? 1 : -1) : rng.nonZero(-9, 9);
        const more = c > 0;
        const A = Math.abs(c);
        if (n < 0 || rng.bool(0.4)) {
          prompt = `To find y, multiply x by ${num(n)} and then ${more ? "add" : "subtract"} ${A}. Write this rule as the equation of a straight line.`;
          solution.push(`"Multiply x by ${num(n)}" gives ${xTerm(n, 1) === "" ? "0" : `{{${xTerm(n, 1)}}}`}.`, `Then ${more ? "add" : "subtract"} ${A}.`);
        } else {
          prompt = rng.pick([
            `The y-coordinate of every point on a line is ${A} ${more ? "more" : "less"} than ${n} times its x-coordinate. Write down the equation of the line.`,
            `y is ${A} ${more ? "more" : "less"} than ${n} times x. Write this as the equation of a straight line.`,
          ]);
          solution.push(`"${n} times x" is {{${n}x}}.`, `"${A} ${more ? "more" : "less"} than" that means ${more ? "add" : "subtract"} ${A}.`);
          if (!more) wrongs.push({ n: -n, d: 1, c: A, feedback: `"${A} less than ${n}x" means start with ${n}x and take ${A} away: ${n}x − ${A}.` });
        }
        if (more && A !== n) wrongs.push({ n: A, d: 1, c: n, feedback: `The number that multiplies x is ${num(n)}, so the x-term is ${num(n)}x. Then ${A} is added on.` });
        hint = "Start with the x-term, then add or subtract the constant.";
      } else if (kind === "par0") {
        n = rng.pick([-6, -5, -4, -3, -2, -1, 2, 3, 4, 5, 6]);
        const c0 = rng.int(-9, 9);
        c = rng.nonZero(-9, 9);
        for (let i = 0; i < 50 && c === c0; i++) c = rng.nonZero(-9, 9);
        if (c === c0) c = c0 + 1 === 0 ? c0 + 2 : c0 + 1;
        prompt = `Write down the equation of the straight line that is parallel to ${lineMarkup(n, 1, c0)} and crosses the y-axis at ${pt(0, c)}.`;
        solution.push(`Parallel lines have the same gradient, so m = ${num(n)}.`, `It crosses the y-axis at ${pt(0, c)}, so c = ${num(c)}.`);
        wrongs.push({ n, d: 1, c: c0, feedback: "That's the original line. A parallel line has the same gradient but crosses the y-axis somewhere else." });
        hint = "Parallel lines have the same gradient. Only c changes.";
      } else {
        // parPt / parForm: parallel through a point (p, q).
        let c0 = 0, p = 1, q = 1, k = 1;
        n = rng.pick([-5, -4, -3, -2, 2, 3, 4, 5]);
        for (let i = 0; i < 100; i++) {
          c0 = rng.int(-9, 9);
          p = rng.nonZero(-5, 5);
          q = rng.int(-12, 12);
          c = q - n * p;
          if (c !== c0 && Math.abs(c) <= 20) break;
        }
        if (c === c0) c0 = c + 1;
        let given = lineMarkup(n, 1, c0);
        if (kind === "parForm") {
          k = rng.pick([2, 3, 4]);
          given = `{{${k}y = ${rhs(k * n, 1, k * c0)}}}`;
          solution.push(`Divide the given equation by ${k}: ${lineMarkup(n, 1, c0)}. Its gradient is ${num(n)}, so line L is {{y = ${xTerm(n, 1)} + c}}.`);
          wrongs.push({ n: k * n, d: 1, c: q - k * n * p, feedback: `Divide the given equation by ${k} first: its gradient is ${num(n)}, not ${num(k * n)}.` });
        }
        prompt = rng.pick([
          `Line L is parallel to ${given} and passes through the point ${pt(p, q)}. Find the equation of line L.`,
          `Find the equation of the straight line that passes through ${pt(p, q)} and is parallel to ${given}.`,
        ]);
        if (kind === "parPt") solution.push(`Parallel lines share a gradient, so the line is {{y = ${xTerm(n, 1)} + c}}.`);
        solution.push(
          `Substitute ${pt(p, q)}: ${num(q)} = ${num(n)} × ${br(p)} + c = ${num(n * p)} + c.`,
        );
        solution[solution.length - 1] += ` So c = ${num(q)} − ${br(n * p)} = ${num(c)}.`;
        wrongs.push({ n, d: 1, c: c0, feedback: "That's the original line. Use the point to find the new value of c." });
        wrongs.push({ n, d: 1, c: q + n * p, feedback: `Check c: ${num(q)} = ${num(n * p)} + c, so subtract ${num(n * p)} from ${num(q)}.` });
        hint = "Same gradient as the given line. Then substitute the point to find c.";
      }
      solution.push(`So the equation is ${lineMarkup(n, d, c)}.`);
      const traps: Trap[] = [];
      for (const w of wrongs) {
        if (!sameLine(n, d, c, w.n, w.d, w.c) && !traps.some((t) => t.spec.type === "expression" && t.spec.expr === `y=${lineExpr(w.n, w.d, w.c)}`)) {
          traps.push({ spec: lineSpec(w.n, w.d, w.c), feedback: w.feedback });
        }
      }
      return { prompt, answer: lineSpec(n, d, c), solution, hint, traps };
    },
  },

  // 9 --------------------------------------------- direct proportion graphs
  {
    id: "linear-graphs.direct-proportion",
    topicId: TOPIC,
    title: "Use a direct proportion graph (y = kx)",
    level: 2,
    guideRef: "direct-proportion-graphs",
    generate(rng, tier) {
      const kind = tier === 3 ? rng.pick(["eq", "value", "reverse", "reverse"]) : rng.pick(["eq", "value", "value"]);
      if (kind === "eq") {
        let kn = 2, kd = 1, a = 2;
        if (tier === 1) {
          kn = rng.int(2, 9);
          a = rng.int(2, 6);
        } else {
          [kn, kd] = rng.pick<[number, number]>([[3, 2], [5, 2], [7, 2], [1, 2], [2, 3], [4, 3], [5, 3], [3, 4], [5, 4], [1, 3]]);
          a = kd * rng.int(1, tier === 2 ? 3 : 5);
          if (a === 1 || (kn * a) / kd === a) a = kd * 2;
        }
        const b = (kn * a) / kd;
        const traps: Trap[] = [];
        if (kn !== kd) traps.push({ spec: lineSpec(kd, kn, 0), feedback: "That's x ÷ y. The gradient k = y ÷ x." });
        if (b !== a) traps.push({ spec: lineSpec(1, 1, b - a), feedback: "Direct proportion means multiplying, not adding: the line must pass through the origin, so c = 0." });
        return {
          prompt: rng.pick([
            `A straight-line graph passes through the origin and the point ${pt(a, b)}. Write down its equation in the form {{y = kx}}.`,
            `y is directly proportional to x. The graph of y against x passes through ${pt(a, b)}. Find the equation of the graph.`,
          ]),
          answer: lineSpec(kn, kd, 0),
          solution: [
            "The graph passes through the origin, so it has the form {{y = kx}} (c = 0).",
            `k is the gradient: k = y ÷ x = ${num(b)} ÷ ${num(a)} = ${mText(kn, kd)}.`,
            `So ${lineMarkup(kn, kd, 0)}. Check: ${mText(kn, kd)} × ${num(a)} = ${num(b)}. ✓`,
          ],
          hint: "Through the origin means y = kx. Find k from the point: k = y ÷ x.",
          traps,
        };
      }
      // Context questions. Rates are stored ×100 (cents, hundredths) to keep arithmetic exact.
      type Ctx = { key: string; rates: number[]; money: boolean };
      const ctxs: Ctx[] = [
        { key: "rice", rates: tier === 1 ? [200, 300, 400, 500] : [180, 240, 250, 320, 350, 420, 450], money: true },
        { key: "pay", rates: tier === 1 ? [800, 1000, 1200, 1500] : [950, 1050, 1150, 1250, 1350], money: true },
        { key: "tap", rates: tier === 1 ? [200, 300, 400, 500, 600] : [250, 350, 450, 750, 1250], money: false },
        { key: "miles", rates: [160], money: false },
      ];
      const ctx = rng.pick(ctxs);
      const r = rng.pick(ctx.rates);
      let a = 2, b = 5;
      for (let i = 0; i < 100; i++) {
        if (ctx.key === "miles") {
          a = 5 * rng.int(1, 5);
          b = 5 * rng.int(2, 12);
        } else {
          a = rng.int(2, tier === 1 ? 5 : 6);
          b = rng.int(3, 12);
        }
        if (a !== b && b % a !== 0) break;
        if (a !== b && tier === 1) break;
      }
      if (a === b) b = a + (ctx.key === "miles" ? 5 : 1);
      const ya = clean((a * r) / 100), yb = clean((b * r) / 100);
      const kVal = clean(r / 100);
      const fmt = (v: number) => (ctx.money ? money(v) : num(v));
      const yUnit = ctx.key === "tap" ? " litres" : ctx.key === "miles" ? " km" : "";
      const name = rng.pick(NAMES);
      let setup = "", ask = "", unit = "", xWord = "", yWord = "", per = "";
      if (ctx.key === "rice") {
        setup = `At a supermarket, the graph of cost against mass for basmati rice is a straight line through the origin. ${a} kg costs ${money(ya)}.`;
        ask = kind === "value" ? `What do ${b} kg of rice cost? Give your answer in dollars.` : `How many kilograms of rice can you buy for ${money(yb)}?`;
        unit = "kg";
        xWord = "mass";
        yWord = "cost";
        per = `${money(kVal)} per kg`;
      } else if (ctx.key === "pay") {
        setup = `${name}'s pay is directly proportional to the number of hours worked, so the graph of pay against hours is a straight line through the origin. For ${a} hours, ${name} is paid ${money(ya)}.`;
        ask = kind === "value" ? `How much is ${name} paid for ${b} hours? Give your answer in dollars.` : `How many hours must ${name} work to earn ${money(yb)}?`;
        unit = "hours";
        xWord = "hours";
        yWord = "pay";
        per = `${money(kVal)} per hour`;
      } else if (ctx.key === "tap") {
        setup = `Water flows from a tap into an empty tank at a steady rate, so the graph of volume against time is a straight line through the origin. After ${a} minutes the tank holds ${num(ya)} litres.`;
        ask = kind === "value" ? `How many litres does the tank hold after ${b} minutes?` : `How many minutes does it take to collect ${num(yb)} litres?`;
        unit = "minutes";
        xWord = "time";
        yWord = "volume";
        per = `${num(kVal)} litres per minute`;
      } else {
        setup = `A conversion graph between miles and kilometres is a straight line through the origin. It shows that ${a} miles = ${num(ya)} km.`;
        ask = kind === "value" ? `Use the gradient to convert ${b} miles to kilometres.` : `Use the gradient to convert ${num(yb)} km to miles.`;
        unit = "miles";
        xWord = "miles";
        yWord = "kilometres";
        per = `${num(kVal)} km per mile`;
      }
      const traps: Trap[] = [];
      if (kind === "value") {
        const additive = clean(ya + (b - a));
        if (additive !== yb) traps.push({ spec: { type: "number", value: additive }, feedback: `You added ${b - a} on. In direct proportion you multiply: find the amount for 1 (the gradient), then multiply by ${b}.` });
        return {
          prompt: `${setup}\n\n${ask}`,
          answer: { type: "number", value: yb, display: ctx.money ? money(yb) : `${num(yb)}${yUnit}` },
          solution: [
            `A straight line through the origin means ${yWord} = k × ${xWord}, where k is the gradient.`,
            `k = ${fmt(ya)} ÷ ${a} = ${per}.`,
            `For ${b} ${unit}: ${fmt(kVal)} × ${b} = ${fmt(yb)}${yUnit}.`,
          ],
          hint: "Find the gradient first: how much for ONE unit? Then multiply.",
          traps,
        };
      }
      const times = clean(yb * kVal);
      if (times !== b) traps.push({ spec: { type: "number", value: times }, feedback: "To go from the up-axis value back to the across-axis value, divide by the gradient — don't multiply." });
      return {
        prompt: `${setup}\n\n${ask}`,
        answer: { type: "number", value: b, display: `${b} ${unit}` },
        solution: [
          `A straight line through the origin means ${yWord} = k × ${xWord}, where k is the gradient.`,
          `k = ${fmt(ya)} ÷ ${a} = ${per}.`,
          `So ${xWord} = ${fmt(yb)} ÷ ${fmt(kVal)} = ${b} ${unit}.`,
        ],
        hint: "Find the rate for one unit, then divide to work backwards.",
        traps,
      };
    },
  },

  // 10 ----------------------------------------------- distance–time graphs
  {
    id: "linear-graphs.distance-time",
    topicId: TOPIC,
    title: "Read a distance–time graph",
    level: 2,
    guideRef: "real-life-graphs",
    generate(rng, tier) {
      const name = rng.pick(NAMES);
      const modes = [
        { word: "walk", v: [3, 4, 5, 6] },
        { word: "jog", v: [6, 8, 9, 10] },
        { word: "cycle ride", v: [8, 9, 10, 12, 15, 18] },
      ];
      const mode = rng.pick(modes);
      const place = rng.pick(["the library", "the park", "a friend's house", "the hawker centre", "the beach", "the sports hall", "the MRT station"]);
      const tOpts = tier === 1 ? [30, 60] : [10, 20, 30, 40, 50, 60];
      const speedStep = (dist: number, t: number, v: number) =>
        t === 60
          ? `${dist} km in 60 minutes (1 hour) is ${v} km/h.`
          : `In ${t} minutes ${name} covers ${dist} km. In 60 minutes that would be ${dist} × 60 ÷ ${t} = ${v} km, so the speed is ${v} km/h.`;

      if (tier < 3) {
        // Consistent fallback (3 km at 6 km/h both ways); replaced only by a fully valid set.
        let tA = 30, tS = 10, tC = 30, d1 = 3, vA = 6, vC = 6;
        for (let i = 0; i < 300; i++) {
          const a = rng.pick(mode.v), ta = rng.pick(tOpts), ts = rng.pick([10, 20, 30]), c = rng.pick(mode.v);
          if ((a * ta) % 60 !== 0) continue;
          const dd = (a * ta) / 60;
          if (dd < 1 || dd > 18 || (dd > 9 && dd % 2 !== 0)) continue;
          if ((dd * 60) % c !== 0) continue;
          const tc = (dd * 60) / c;
          if (tc % 10 !== 0 || tc < 10 || tc > 90) continue;
          if (tier === 1 && tc !== 30 && tc !== 60) continue;
          [vA, tA, tS, vC, d1, tC] = [a, ta, ts, c, dd, tc];
          break;
        }
        const t1 = tA, t2 = tA + tS, t3 = tA + tS + tC;
        const dStep = d1 > 9 ? 2 : 1;
        const D = Math.ceil((d1 + 1) / dStep) * dStep;
        const T = t3 + 10;
        const pts: [number, number][] = [[0, 0], [t1, d1], [t2, d1], [t3, 0]];
        const label = `Distance–time graph. Time in minutes from 0 to ${T} across; distance from home in km from 0 to ${D} up. The line rises from (0, 0) to (${t1} minutes, ${d1} km), stays flat until ${t2} minutes, then falls back to 0 km at ${t3} minutes.`;
        const q = tier === 1 ? rng.pick(["stop", "far", "speedA", "speedC"]) : rng.pick(["speedA", "speedC", "speedC", "total", "stop"]);
        const intro = `The distance–time graph shows ${name}'s ${mode.word} from home to ${place} and back.`;
        const diagram = distanceTimeSvg(pts, T, D, dStep, label);
        const traps: Trap[] = [];
        if (q === "stop") {
          traps.push({ spec: { type: "number", value: t2 }, feedback: `${t2} minutes is when the stop ended. Subtract the time it started.` });
          if (t1 !== tS) traps.push({ spec: { type: "number", value: t1 }, feedback: `${t1} minutes is when the stop started. The stop lasts until the line starts to slope again.` });
          return {
            prompt: `${intro}\n\nFor how many minutes did ${name} stop at ${place}?`,
            diagram,
            answer: { type: "number", value: tS },
            solution: [
              `A flat section means the distance from home is not changing: ${name} is not moving.`,
              `The flat section runs from ${t1} minutes to ${t2} minutes.`,
              `${t2} − ${t1} = ${tS} minutes.`,
            ],
            hint: "Look for the horizontal part of the graph. When does it start and end?",
            traps,
          };
        }
        if (q === "far" || q === "total") {
          const ans = q === "far" ? d1 : 2 * d1;
          if (q === "total") traps.push({ spec: { type: "number", value: d1 }, feedback: `That's the distance to ${place}. ${name} also travelled back home.` });
          return {
            prompt: `${intro}\n\n${q === "far" ? `How far is ${place} from ${name}'s home? Give your answer in km.` : `How far did ${name} travel altogether? Give your answer in km.`}`,
            diagram,
            answer: { type: "number", value: ans },
            solution:
              q === "far"
                ? [`The highest part of the graph is the furthest point from home.`, `The flat section is at ${d1} km, so ${place} is ${d1} km from home.`]
                : [`The graph goes up to ${d1} km (going there) and back down to 0 km (coming home).`, `Total distance = ${d1} + ${d1} = ${2 * d1} km.`],
            hint: q === "far" ? "Read across from the highest part of the graph to the distance axis." : "Count the journey there AND the journey back.",
            traps,
          };
        }
        const there = q === "speedA";
        const dist = d1, t = there ? tA : tC, v = there ? vA : vC;
        const perMin = clean(dist / t);
        if ((dist * 100) % t === 0 && perMin !== v) traps.push({ spec: { type: "number", value: perMin }, feedback: "That's km per minute. Speed in km/h means how far in 60 minutes." });
        if (!there) {
          const clock = (dist * 60) / t3;
          if (Number.isInteger(clock) && clock !== v) traps.push({ spec: { type: "number", value: clock }, feedback: `Use the time taken for the journey home (${t3} − ${t2} = ${tC} minutes), not the time on the axis.` });
        }
        return {
          prompt: `${intro}\n\nWhat was ${name}'s speed on the way ${there ? `to ${place}` : "home"}? Give your answer in km/h.`,
          diagram,
          answer: { type: "number", value: v },
          solution: [
            there ? `On the way there the line rises from 0 km to ${dist} km between 0 and ${tA} minutes.` : `On the way home the line falls from ${dist} km to 0 km between ${t2} and ${t3} minutes: that's ${tC} minutes.`,
            speedStep(dist, t, v),
            "This is the gradient of that section (ignoring its sign for the way back): distance ÷ time.",
          ],
          hint: "Speed = distance ÷ time. Read both from the section of the graph, then convert to km per hour.",
          traps,
        };
      }
      // Tier 3: go, rest, carry on further, return home.
      // Consistent fallback (12 km/h on every moving section); replaced only by a fully valid set.
      let tA = 20, tS = 10, tB = 20, tC = 40, d1 = 4, d2 = 8, vB = 12, vC = 12;
      for (let i = 0; i < 400; i++) {
        const a = rng.pick(mode.v), b = rng.pick(mode.v), c = rng.pick(mode.v);
        const ta = rng.pick(tOpts), tb = rng.pick(tOpts), ts = rng.pick([10, 20, 30]);
        if ((a * ta) % 60 !== 0 || (b * tb) % 60 !== 0) continue;
        const p1 = (a * ta) / 60;
        const p2 = p1 + (b * tb) / 60;
        if (p1 < 1 || p2 > 20) continue;
        if ((p2 * 60) % c !== 0) continue;
        const tc = (p2 * 60) / c;
        if (tc % 10 !== 0 || tc > 90) continue;
        if (ta + ts + tb + tc > 150) continue;
        if (p2 > 9 && (p1 % 2 !== 0 || p2 % 2 !== 0)) continue;
        [tA, tS, tB, tC, d1, d2, vB, vC] = [ta, ts, tb, tc, p1, p2, b, c];
        break;
      }
      const t1 = tA, t2 = t1 + tS, t3 = t2 + tB, t4 = t3 + tC;
      const dStep = d2 > 9 ? 2 : 1;
      const D = Math.ceil((d2 + 1) / dStep) * dStep;
      const T = t4 + 10;
      const pts: [number, number][] = [[0, 0], [t1, d1], [t2, d1], [t3, d2], [t4, 0]];
      const label = `Distance–time graph. Time in minutes from 0 to ${T}; distance from home in km from 0 to ${D}. The line rises from (0, 0) to (${t1}, ${d1}), is flat until ${t2} minutes, rises to (${t3}, ${d2}), then falls to 0 km at ${t4} minutes.`;
      const diagram = distanceTimeSvg(pts, T, D, dStep, label);
      const intro = `The distance–time graph shows ${name}'s ${mode.word}. ${name} sets off from home, stops for a rest, carries on to ${place}, then comes straight back home.`;
      const avgOk = (120 * d2) % t4 === 0;
      const q = rng.pick(avgOk ? ["speedB", "speedC", "avg", "avg"] : ["speedB", "speedC"]);
      const traps: Trap[] = [];
      if (q === "avg") {
        const avg = (120 * d2) / t4;
        const moving = t4 - tS;
        if ((120 * d2) % moving === 0 && (120 * d2) / moving !== avg) traps.push({ spec: { type: "number", value: (120 * d2) / moving }, feedback: "Average speed for the whole journey uses the total time — including the rest." });
        if ((60 * d2) % t4 === 0 && (60 * d2) / t4 !== avg) traps.push({ spec: { type: "number", value: (60 * d2) / t4 }, feedback: `That only counts the distance one way. ${name} travelled ${d2} km there and ${d2} km back.` });
        return {
          prompt: `${intro}\n\nWhat was ${name}'s average speed for the whole journey, including the rest? Give your answer in km/h.`,
          diagram,
          answer: { type: "number", value: avg },
          solution: [
            `Total distance = ${d2} km there + ${d2} km back = ${2 * d2} km.`,
            `Total time = ${t4} minutes (from leaving home to getting back).`,
            `Average speed = ${2 * d2} × 60 ÷ ${t4} = ${avg} km/h.`,
          ],
          hint: "Average speed = total distance ÷ total time. Read the total time from the end of the graph.",
          traps,
        };
      }
      const isB = q === "speedB";
      const dist = isB ? d2 - d1 : d2, t = isB ? tB : tC, v = isB ? vB : vC;
      if (isB && (d2 * 60) % tB === 0 && (d2 * 60) / tB !== v) traps.push({ spec: { type: "number", value: (d2 * 60) / tB }, feedback: `Use the distance covered in that section: ${d2} − ${d1} = ${d2 - d1} km, not the distance from home.` });
      if ((dist * 100) % t === 0 && clean(dist / t) !== v) traps.push({ spec: { type: "number", value: clean(dist / t) }, feedback: "That's km per minute. Speed in km/h means how far in 60 minutes." });
      return {
        prompt: `${intro}\n\n${isB ? `What was ${name}'s speed between the rest and arriving at ${place}?` : `What was ${name}'s speed on the way home?`} Give your answer in km/h.`,
        diagram,
        answer: { type: "number", value: v },
        solution: [
          isB
            ? `After the rest the line rises from ${d1} km to ${d2} km between ${t2} and ${t3} minutes: ${dist} km in ${t} minutes.`
            : `On the way home the line falls from ${d2} km to 0 km between ${t3} and ${t4} minutes: ${dist} km in ${t} minutes.`,
          speedStep(dist, t, v),
          "Speed is the steepness (gradient) of that section of the graph.",
        ],
        hint: "Find how far and how long for that section only, then convert to km per hour.",
        traps,
      };
    },
  },

  // 11 ---------------------------------------- where two real-life lines cross
  {
    id: "linear-graphs.break-even",
    topicId: TOPIC,
    title: "Find where two cost graphs cross",
    level: 3,
    guideRef: "real-life-graphs",
    generate(rng, tier) {
      // Price ranges (in dollars) keep each context realistic: rate = the cheaper per-unit rate,
      // diff = how much more the other option charges per unit, fixed = the smaller fixed charge.
      const ctxs = [
        { intro: "Two gyms charge like this:", who: ["Gym A", "Gym B"], fixed: "joining fee", per: "a month", v: "n", unit: "months", q: "After how many months of membership do the two gyms cost the same in total?", axis: "months", rate: [40, 90], diff: [5, 20], fixedR: [10, 80], xMax: 12 },
        { intro: "Two mobile phone plans charge like this each month:", who: ["Plan A", "Plan B"], fixed: "a month", per: "per GB of data", v: "g", unit: "GB", q: "For how many GB of data do the two plans cost the same?", axis: "GB of data", rate: [1, 6], diff: [1, 4], fixedR: [5, 30], xMax: 10 },
        { intro: "Two bicycle hire shops at East Coast Park charge like this:", who: ["Shop A", "Shop B"], fixed: "booking fee", per: "per hour", v: "h", unit: "hours", q: "For how many hours of hire do the two shops cost the same?", axis: "hours", rate: [4, 12], diff: [1, 3], fixedR: [2, 10], xMax: 8 },
        { intro: "A school CCA is ordering printed T-shirts. Two printers charge like this:", who: ["Printer A", "Printer B"], fixed: "set-up fee", per: "per T-shirt", v: "n", unit: "T-shirts", q: "For how many T-shirts do the two printers cost the same?", axis: "T-shirts", rate: [8, 20], diff: [2, 8], fixedR: [20, 80], xMax: 20 },
        { intro: "Two swimming schools charge like this:", who: ["School A", "School B"], fixed: "registration fee", per: "per lesson", v: "n", unit: "lessons", q: "For how many lessons do the two schools cost the same in total?", axis: "lessons", rate: [15, 40], diff: [3, 10], fixedR: [10, 60], xMax: 12 },
      ];
      const ctx = rng.pick(ctxs);
      // Work in cents. Option P: fP + rP·x, option Q: fQ + rQ·x with rP > rQ and fQ > fP,
      // so the lines cross at x exactly (fQ − fP = (rP − rQ)·x).
      const inCents = (lo: number, hi: number, step: number) => step * rng.int(Math.ceil((lo * 100) / step), Math.floor((hi * 100) / step));
      const rateStep = tier === 3 ? 5 : 100, fixedStep = tier === 3 ? 10 : 100;
      const x = rng.int(tier === 1 ? 2 : 3, tier === 1 ? Math.min(8, ctx.xMax) : ctx.xMax);
      const rQ = inCents(ctx.rate[0], ctx.rate[1], rateStep);
      const diff = inCents(ctx.diff[0], ctx.diff[1], rateStep);
      const fP = tier === 1 && rng.bool(0.4) ? 0 : inCents(ctx.fixedR[0], ctx.fixedR[1], fixedStep);
      const rP = rQ + diff, fQ = fP + diff * x;
      const cost = fP + rP * x;
      const v = ctx.v;
      const fixedPhrase = (f: number) => (ctx.fixed === "a month" ? `${dollars(f)} a month` : `${dollars(f)} ${ctx.fixed}`);
      const describe = (f: number, r: number) => (f === 0 ? `no fixed charge, just ${dollars(r)} ${ctx.per}` : `${fixedPhrase(f)} plus ${dollars(r)} ${ctx.per}`);
      const pFirst = rng.bool();
      const [nameP, nameQ] = pFirst ? ctx.who : [ctx.who[1], ctx.who[0]];
      const lines = pFirst ? [`- ${nameP}: ${describe(fP, rP)}`, `- ${nameQ}: ${describe(fQ, rQ)}`] : [`- ${nameQ}: ${describe(fQ, rQ)}`, `- ${nameP}: ${describe(fP, rP)}`];
      const askCost = tier === 3 && rng.bool(0.5);
      const d = (c: number) => asc(c / 100);
      const exprP = fP === 0 ? `${d(rP)}${v}` : `${d(fP)} + ${d(rP)}${v}`;
      const exprQ = `${d(fQ)} + ${d(rQ)}${v}`;
      const question = askCost
        ? `The graphs of total cost against number of ${ctx.axis} are straight lines that cross. What is the total cost at the crossing point? Give your answer in dollars.`
        : `The graphs of total cost against number of ${ctx.axis} are straight lines. ${ctx.q} (This is where the two lines cross.)`;
      const traps: Trap[] = [];
      if (askCost) {
        if (x * 100 !== cost) traps.push({ spec: { type: "number", value: x }, feedback: `That's the number of ${ctx.unit} where the lines cross. Now work out the cost there.` });
      } else if (clean(cost / 100) !== x) {
        traps.push({ spec: { type: "number", value: clean(cost / 100) }, feedback: `That's the cost where they cross. The question asks for the number of ${ctx.unit}.` });
      }
      const solution = [
        `${nameP} costs {{${exprP}}} dollars and ${nameQ} costs {{${exprQ}}} dollars for ${v} ${ctx.unit}.`,
        `The lines cross where the costs are equal: {{${exprP} = ${exprQ}}}.`,
        `Subtract {{${d(rQ)}${v}}}${fP === 0 ? "" : ` and ${d(fP)}`} from both sides: {{${d(fQ - fP)} = ${d(diff)}${v}}}, so ${v} = ${d(fQ - fP)} ÷ ${d(diff)} = ${x}.`,
        `Check: when ${v} = ${x}, ${nameP} costs ${dollars(fP + rP * x)} and ${nameQ} costs ${dollars(fQ + rQ * x)}. ✓${askCost ? ` So the cost at the crossing point is ${dollars(cost)}.` : ""}`,
      ];
      return {
        prompt: `${ctx.intro}\n\n${lines.join("\n")}\n\n${question}`,
        answer: askCost ? { type: "number", value: clean(cost / 100), display: dollars(cost) } : { type: "number", value: x, display: `${x} ${ctx.unit}` },
        solution,
        hint: "Write a cost formula for each option, then set them equal to each other.",
        traps,
      };
    },
  },

  // 12 ------------------------------------- STRETCH: line through two points
  {
    id: "linear-graphs.line-through-two-points",
    topicId: TOPIC,
    title: "Find the equation of the line through two points",
    level: 3,
    guideRef: "line-through-two-points",
    generate(rng, tier) {
      let n = 2, d = 1, c = 1, x1 = 1, x2 = 3;
      for (let i = 0; i < 200; i++) {
        if (tier === 1) {
          n = rng.int(2, 5);
          c = rng.int(-5, 8);
          x1 = rng.int(1, 5);
          x2 = x1 + rng.int(1, 4);
        } else if (tier === 2) {
          n = rng.pick([-5, -4, -3, -2, -1, 2, 3, 4, 5]);
          c = rng.int(-9, 9);
          x1 = rng.nonZero(-6, 6);
          x2 = rng.nonZero(-6, 6);
        } else {
          [n, d] = rng.pick<[number, number]>([[1, 2], [-1, 2], [3, 2], [-3, 2], [1, 3], [-1, 3], [2, 3], [-2, 3], [3, 4], [-3, 4]]);
          c = rng.int(-6, 6);
          x1 = d * rng.nonZero(-3, 3);
          x2 = d * rng.nonZero(-3, 3);
        }
        if (x1 === x2) continue;
        break;
      }
      if (x1 === x2) x2 = x1 + d;
      const y1 = (n * x1) / d + c, y2 = (n * x2) / d + c;
      const rise = y2 - y1, run = x2 - x1;
      const mx1 = (n * x1) / d, mx2 = (n * x2) / d;
      const traps: Trap[] = [];
      const wrongC = y1 + mx1;
      if (wrongC !== c) traps.push({ spec: lineSpec(n, d, wrongC), feedback: `Check c. From ${num(y1)} = ${num(mx1)} + c, subtract: c = ${num(y1)} − ${br(mx1)}.` });
      traps.push({ spec: lineSpec(-n, d, y1 + mx1), feedback: "Check the sign of the gradient: subtract in the same order on the top and the bottom." });
      return {
        prompt: rng.pick([
          `Find the equation of the straight line that passes through ${pt(x1, y1)} and ${pt(x2, y2)}. Give it in the form {{y = mx + c}}.`,
          `A straight line goes through A${pt(x1, y1)} and B${pt(x2, y2)}. Find its equation in the form {{y = mx + c}}.`,
        ]),
        answer: lineSpec(n, d, c),
        solution: [
          `Gradient: rise = ${num(y2)} − ${br(y1)} = ${num(rise)}, run = ${num(x2)} − ${br(x1)} = ${num(run)}, so m = ${num(rise)} ÷ ${br(run)} = ${mText(n, d)}.`,
          `Substitute ${pt(x1, y1)} into y = mx + c: ${num(y1)} = ${mText(n, d)} × ${br(x1)} + c = ${num(mx1)} + c, so c = ${num(y1)} − ${br(mx1)} = ${num(c)}.`,
          `Check with ${pt(x2, y2)}: ${mText(n, d)} × ${br(x2)} ${signed(c)} = ${num(mx2)} ${signed(c)} = ${num(y2)}. ✓`,
          `So the equation is ${lineMarkup(n, d, c)}.`,
        ],
        hint: "First find the gradient (rise ÷ run). Then substitute one point into y = mx + c to find c.",
        traps,
      };
    },
  },
];
