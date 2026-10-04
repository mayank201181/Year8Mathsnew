"use client";
// Interactive explorables for the "transformations-pythagoras" topic.
//  1. Transformation lab — translate, reflect, rotate or enlarge triangle ABC
//     on a coordinate grid with construction lines, a coordinate table, the
//     coordinate rule and live properties (congruent / similar, same way round
//     or mirrored, invariant points). Mystery mode hides a transformation: the
//     learner must find it and set the controls to describe it fully.
//  2. Symmetry painter — shade squares (optionally with a symmetry pen) and
//     watch the pattern's lines of symmetry and order of rotational symmetry
//     being detected live, with targets such as "order 4 but no lines".
import { useId, useState, type ReactNode } from "react";
import { WidgetFrame, Segmented, Readout, makePlane, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                             */
/* ------------------------------------------------------------------------ */

type Pt = [number, number];

/** A number for display: real minus sign, up to 3 d.p., never "−0". */
function num(n: number): string {
  const r = Math.round(n * 1000) / 1000;
  if (r === 0) return "0";
  return r < 0 ? `−${Math.abs(r)}` : String(r);
}

const coord = (p: Pt) => `(${num(p[0])}, ${num(p[1])})`;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** − / value / + control with named, touch-sized buttons. */
function Step({
  name,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  name: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => ReactNode;
}) {
  const clamp = (v: number) => Math.min(max, Math.max(min, Math.round(v * 1000) / 1000));
  return (
    <div className="flex items-center justify-between gap-2 rounded-xl border border-line bg-surface px-3 py-1.5">
      <span className="text-sm font-semibold text-ink-2">{name}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="kbd h-10 min-w-10"
          onClick={() => onChange(clamp(value - step))}
          disabled={value <= min}
          aria-label={`${name}: decrease`}
        >
          −
        </button>
        <span className="min-w-[4.5ch] whitespace-nowrap text-center text-lg font-extrabold tabular-nums text-ink" aria-live="polite">
          {format ? format(value) : num(value)}
        </span>
        <button
          type="button"
          className="kbd h-10 min-w-10"
          onClick={() => onChange(clamp(value + step))}
          disabled={value >= max}
          aria-label={`${name}: increase`}
        >
          +
        </button>
      </div>
    </div>
  );
}

/** A column vector drawn with stacked numbers in tall brackets. */
function ColVec({ a, b }: { a: number; b: number }) {
  return (
    <span className="inline-flex items-center align-middle" role="img" aria-label={`column vector ${num(a)} over ${num(b)}`}>
      <span aria-hidden className="text-[1.9em] font-light leading-none">(</span>
      <span aria-hidden className="inline-flex flex-col items-center px-0.5 text-[0.85em] font-extrabold leading-tight tabular-nums">
        <span>{num(a)}</span>
        <span>{num(b)}</span>
      </span>
      <span aria-hidden className="text-[1.9em] font-light leading-none">)</span>
    </span>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Transformation lab                                                      */
/* ------------------------------------------------------------------------ */

type Kind = "translate" | "reflect" | "rotate" | "enlarge";
type Mirror = "x" | "y" | "yx" | "ynx";
type Turn = "acw" | "cw" | "half";
type Scale = "2" | "3" | "half";

interface Params {
  kind: Kind;
  tx: number;
  ty: number;
  mirror: Mirror;
  m: number;
  turn: Turn;
  rx: number;
  ry: number;
  scale: Scale;
  ex: number;
  ey: number;
}

/** The object: a scalene right-angled triangle, so every transformation of it is unique. */
const OBJ: Pt[] = [
  [1, 1],
  [4, 1],
  [1, 3],
];
const LETTERS = ["A", "B", "C"];
const OBJ_AREA = 3; // ½ × 3 × 2
const LIM = 8; // grid runs from −8 to 8

const START: Params = {
  kind: "translate",
  tx: 2,
  ty: -5,
  mirror: "x",
  m: 0,
  turn: "acw",
  rx: 0,
  ry: 0,
  scale: "2",
  ex: 2,
  ey: -1,
};

/** First mystery (fixed, so the page renders the same on server and client). */
const FIRST_MYSTERY: Params = { ...START, kind: "reflect", mirror: "x", m: -1 };

const kOf = (s: Scale) => (s === "half" ? 0.5 : Number(s));
const kText = (s: Scale) => (s === "half" ? "½" : s);

function mapPoint(p: Params, [x, y]: Pt): Pt {
  switch (p.kind) {
    case "translate":
      return [x + p.tx, y + p.ty];
    case "reflect":
      if (p.mirror === "x") return [2 * p.m - x, y];
      if (p.mirror === "y") return [x, 2 * p.m - y];
      if (p.mirror === "yx") return [y, x];
      return [-y, -x];
    case "rotate": {
      const dx = x - p.rx;
      const dy = y - p.ry;
      if (p.turn === "acw") return [p.rx - dy, p.ry + dx];
      if (p.turn === "cw") return [p.rx + dy, p.ry - dx];
      return [p.rx - dx, p.ry - dy];
    }
    case "enlarge": {
      const k = kOf(p.scale);
      return [p.ex + k * (x - p.ex), p.ey + k * (y - p.ey)];
    }
  }
}

const imageOf = (p: Params) => OBJ.map((q) => mapPoint(p, q));
const samePt = (a: Pt, b: Pt) => Math.abs(a[0] - b[0]) < 1e-9 && Math.abs(a[1] - b[1]) < 1e-9;
const sameShape = (a: Pt[], b: Pt[]) => a.every((q, i) => samePt(q, b[i]));
const inGrid = (q: Pt, lim = LIM) => Math.abs(q[0]) <= lim + 1e-9 && Math.abs(q[1]) <= lim + 1e-9;

/** Twice the signed area: > 0 when A → B → C runs anticlockwise. */
const orient = (t: Pt[]) => (t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[2][0] - t[0][0]) * (t[1][1] - t[0][1]);
const dist = (a: Pt, b: Pt) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function mirrorName(p: Params): string {
  if (p.mirror === "x") return `x = ${num(p.m)}${p.m === 0 ? " (the y-axis)" : ""}`;
  if (p.mirror === "y") return `y = ${num(p.m)}${p.m === 0 ? " (the x-axis)" : ""}`;
  return p.mirror === "yx" ? "y = x" : "y = −x";
}

function turnName(t: Turn): string {
  return t === "half" ? "180°" : `90° ${t === "cw" ? "clockwise" : "anticlockwise"}`;
}

/** Full description as plain text (for aria labels and reveals). */
function describeText(p: Params): string {
  switch (p.kind) {
    case "translate":
      return `Translation by the column vector (${num(p.tx)} over ${num(p.ty)})`;
    case "reflect":
      return `Reflection in the line ${mirrorName(p)}`;
    case "rotate":
      return `Rotation of ${turnName(p.turn)} about ${coord([p.rx, p.ry])}`;
    case "enlarge":
      return `Enlargement, scale factor ${kText(p.scale)}, centre ${coord([p.ex, p.ey])}`;
  }
}

/** Full description with a proper column vector. */
function Describe({ p }: { p: Params }) {
  if (p.kind === "translate") {
    return (
      <>
        Translation by the column vector <ColVec a={p.tx} b={p.ty} />
      </>
    );
  }
  return <>{describeText(p)}</>;
}

/** coef·v + c, written the way a person would, e.g. "x + 3", "4 − y", "2x − 1". */
function lin(coef: number, v: string, c: number): string {
  const term = coef === 1 ? v : coef === -1 ? `−${v}` : `${num(coef)}${v}`;
  if (Math.abs(c) < 1e-9) return term;
  if (coef === -1) return `${num(c)} − ${v}`;
  return c > 0 ? `${term} + ${num(c)}` : `${term} − ${num(-c)}`;
}

function ruleText(p: Params): string {
  let X = "x";
  let Y = "y";
  switch (p.kind) {
    case "translate":
      X = lin(1, "x", p.tx);
      Y = lin(1, "y", p.ty);
      break;
    case "reflect":
      if (p.mirror === "x") X = lin(-1, "x", 2 * p.m);
      else if (p.mirror === "y") Y = lin(-1, "y", 2 * p.m);
      else if (p.mirror === "yx") {
        X = "y";
        Y = "x";
      } else {
        X = "−y";
        Y = "−x";
      }
      break;
    case "rotate":
      if (p.turn === "acw") {
        X = lin(-1, "y", p.rx + p.ry);
        Y = lin(1, "x", p.ry - p.rx);
      } else if (p.turn === "cw") {
        X = lin(1, "y", p.rx - p.ry);
        Y = lin(-1, "x", p.rx + p.ry);
      } else {
        X = lin(-1, "x", 2 * p.rx);
        Y = lin(-1, "y", 2 * p.ry);
      }
      break;
    case "enlarge": {
      const k = kOf(p.scale);
      X = lin(k, "x", (1 - k) * p.ex);
      Y = lin(k, "y", (1 - k) * p.ey);
      break;
    }
  }
  return `(x, y) → (${X}, ${Y})`;
}

/** "2 right and 1 up" — an offset in words. */
function offsetWords(dx: number, dy: number): string {
  const parts: string[] = [];
  if (Math.abs(dx) > 1e-9) parts.push(`${num(Math.abs(dx))} ${dx > 0 ? "right" : "left"}`);
  if (Math.abs(dy) > 1e-9) parts.push(`${num(Math.abs(dy))} ${dy > 0 ? "up" : "down"}`);
  return parts.length ? parts.join(" and ") : "0";
}

/** "Track one point" explanation for vertex i. */
function trackText(p: Params, i: number): string {
  const P = OBJ[i];
  const Q = mapPoint(p, P);
  const L = LETTERS[i];
  const P2 = `${L}′${coord(Q)}`;
  switch (p.kind) {
    case "translate":
      if (p.tx === 0 && p.ty === 0) return `The zero vector moves nothing: ${L} stays at ${coord(P)}.`;
      return `Track ${L}: ${L}${coord(P)} moves ${offsetWords(p.tx, p.ty)}, so ${P2}.`;
    case "reflect": {
      if (p.mirror === "x" || p.mirror === "y") {
        const vert = p.mirror === "x";
        const d = vert ? P[0] - p.m : P[1] - p.m;
        if (Math.abs(d) < 1e-9) return `Track ${L}: it lies on the mirror line, so it does not move — ${L}′ = ${L}.`;
        const side = vert ? (d > 0 ? "right of" : "left of") : d > 0 ? "above" : "below";
        const other = vert ? (d > 0 ? "left of" : "right of") : d > 0 ? "below" : "above";
        return `Track ${L}: ${L}${coord(P)} is ${num(Math.abs(d))} ${side} the mirror ${mirrorName(p).split(" (")[0]}, so ${L}′ is ${num(Math.abs(d))} ${other} it: ${P2}.`;
      }
      const how = p.mirror === "yx" ? "swaps the coordinates" : "swaps the coordinates and changes both signs";
      const still = samePt(P, Q) ? ` ${L} is on the mirror line, so it does not move.` : "";
      return `Track ${L}: reflecting in ${mirrorName(p)} ${how}, so ${L}${coord(P)} → ${P2}.${still}`;
    }
    case "rotate": {
      const dx = P[0] - p.rx;
      const dy = P[1] - p.ry;
      if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return `Track ${L}: it is the centre of rotation, so it does not move.`;
      const n: Pt = p.turn === "acw" ? [-dy, dx] : p.turn === "cw" ? [dy, -dx] : [-dx, -dy];
      return `Track ${L}: from the centre ${coord([p.rx, p.ry])}, ${L} is ${offsetWords(dx, dy)}. Turn that ${turnName(p.turn)} and it becomes ${offsetWords(n[0], n[1])}, so ${P2}.`;
    }
    case "enlarge": {
      const dx = P[0] - p.ex;
      const dy = P[1] - p.ey;
      if (Math.abs(dx) < 1e-9 && Math.abs(dy) < 1e-9) return `Track ${L}: it is the centre of enlargement, so it does not move.`;
      const k = kOf(p.scale);
      return `Track ${L}: from the centre ${coord([p.ex, p.ey])}, ${L} is ${offsetWords(dx, dy)}. Multiply by ${kText(p.scale)}: ${offsetWords(k * dx, k * dy)}, so ${P2}.`;
    }
  }
}

function randomMystery(prev: Params, current: Params): Params {
  const ri = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
  const kinds: Kind[] = ["translate", "reflect", "rotate", "enlarge"];
  const avoid = [OBJ, imageOf(prev), imageOf(current)];
  for (let t = 0; t < 800; t++) {
    const kind = kinds[ri(0, 3)];
    if (kind === prev.kind && t < 400 && Math.random() < 0.7) continue; // prefer variety
    const h: Params = { ...START, kind };
    if (kind === "translate") {
      h.tx = ri(-7, 7);
      h.ty = ri(-7, 7);
    } else if (kind === "reflect") {
      h.mirror = (["x", "y", "yx", "ynx"] as Mirror[])[ri(0, 3)];
      h.m = ri(-8, 8) / 2;
    } else if (kind === "rotate") {
      h.turn = (["acw", "cw", "half"] as Turn[])[ri(0, 2)];
      h.rx = ri(-4, 4);
      h.ry = ri(-4, 4);
    } else {
      h.scale = (["2", "3", "half", "2"] as Scale[])[ri(0, 3)];
      h.ex = ri(-6, 6);
      h.ey = ri(-6, 6);
    }
    const img = imageOf(h);
    if (!img.every((q) => inGrid(q, 7))) continue;
    if (avoid.some((s) => sameShape(img, s))) continue;
    return h;
  }
  return { ...START, kind: "rotate", turn: "half", rx: 0, ry: 0 };
}

/**
 * Two vertices (indices) that are not collinear with the centre c, so the
 * construction lines through them pin the centre down to a single point.
 * (If c is a vertex, or lies on the line AB, the obvious pair A, B fails.)
 */
function pairAround(c: Pt): [number, number] {
  const pairs: [number, number][] = [
    [0, 1],
    [0, 2],
    [1, 2],
  ];
  const cross = ([i, j]: [number, number]) =>
    (OBJ[i][0] - c[0]) * (OBJ[j][1] - c[1]) - (OBJ[i][1] - c[1]) * (OBJ[j][0] - c[0]);
  return pairs.find((pr) => Math.abs(cross(pr)) > 1e-9) ?? [0, 1];
}

/** Hint ladder for a hidden transformation: classify it, then pin down the details. */
function mysteryHints(h: Params): string[] {
  const img = imageOf(h);
  const k = h.kind === "enlarge" ? kOf(h.scale) : 1;
  const sameWay = orient(img) > 0 === orient(OBJ) > 0;
  let first: string;
  if (k !== 1) first = `Compare sizes: AB = 3 but A′B′ = ${num(dist(img[0], img[1]))}. Only an enlargement changes the size.`;
  else if (!sameWay)
    first =
      "Same size — but read A → B → C round each triangle: one runs anticlockwise, the other clockwise. The target is a mirror image, so it is a reflection.";
  else if (h.kind === "translate")
    first = "Same size, same way round, and every side points in the same direction as before (AB and A′B′ both point right). Nothing has turned: it is a translation.";
  else first = "Same size and the same way round (not mirrored), but the sides point in new directions — the triangle has turned. It is a rotation.";

  let second: string;
  switch (h.kind) {
    case "translate":
      second = `Track one point: A${coord(OBJ[0])} → A′${coord(img[0])}. How far across? How far up (or down)?`;
      break;
    case "reflect": {
      const mids: Pt[] = [];
      OBJ.forEach((q, i) => {
        const md = mid(q, img[i]);
        if (!mids.some((x) => samePt(x, md))) mids.push(md);
      });
      second = `The mirror line is halfway between each point and its image: it passes through ${coord(mids[0])} and ${coord(mids[1])}. Which line goes through both?`;
      break;
    }
    case "rotate": {
      const ab: Pt = [img[1][0] - img[0][0], img[1][1] - img[0][1]];
      const dir = ab[0] > 0 ? "right" : ab[0] < 0 ? "left" : ab[1] > 0 ? "up" : "down";
      const [u, v] = pairAround([h.rx, h.ry]).map((i) => LETTERS[i]);
      second =
        h.turn === "half"
          ? `AB points right and A′B′ points ${dir}: a half-turn (180°). For a half-turn the centre is the midpoint of A and A′ — that is ${coord(mid(OBJ[0], img[0]))}.`
          : `AB points right and A′B′ points ${dir}, so it turned ${turnName(h.turn)}. The centre is the one point that is the same distance from ${u} as from ${u}′ and also the same distance from ${v} as from ${v}′. Try a centre, see where the image lands, and adjust.`;
      break;
    }
    case "enlarge": {
      const [u, v] = pairAround([h.ex, h.ey]).map((i) => LETTERS[i]);
      second = `A′B′ ÷ AB = ${num(3 * k)} ÷ 3 = ${kText(h.scale)}, the scale factor. For the centre, draw the straight line through ${u} and ${u}′ and the straight line through ${v} and ${v}′: they cross at the centre.`;
      break;
    }
  }
  return [first, second];
}

const KIND_OPTIONS: { value: Kind; label: string }[] = [
  { value: "translate", label: "Translate" },
  { value: "reflect", label: "Reflect" },
  { value: "rotate", label: "Rotate" },
  { value: "enlarge", label: "Enlarge" },
];

function Arrow({ from, to, className, width }: { from: { x: number; y: number }; to: { x: number; y: number }; className: string; width: number }) {
  const len = Math.hypot(to.x - from.x, to.y - from.y);
  if (len < 1) return null;
  const ux = (to.x - from.x) / len;
  const uy = (to.y - from.y) / len;
  const s = 7;
  const bx = to.x - ux * s;
  const by = to.y - uy * s;
  const head = `${r2(to.x)},${r2(to.y)} ${r2(bx - uy * s * 0.55)},${r2(by + ux * s * 0.55)} ${r2(bx + uy * s * 0.55)},${r2(by - ux * s * 0.55)}`;
  return (
    <g>
      <line x1={from.x} y1={from.y} x2={bx} y2={by} className={className} strokeWidth={width} />
      <polygon points={head} className={className.replace(/stroke-/g, "fill-")} />
    </g>
  );
}

function TransformationLab() {
  const [p, setP] = useState<Params>(START);
  const [track, setTrack] = useState(0);
  const [showCon, setShowCon] = useState(true);
  const [mode, setMode] = useState<"explore" | "mystery">("explore");
  const [hidden, setHidden] = useState<Params>(FIRST_MYSTERY);
  const [hintLevel, setHintLevel] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [solvedThis, setSolvedThis] = useState(false);
  const [solved, setSolved] = useState(0);
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");

  const img = imageOf(p);
  const target = imageOf(hidden);
  const mystery = mode === "mystery";
  const matched = mystery && sameShape(img, target);
  const inPlace = mystery ? img.filter((q, i) => samePt(q, target[i])).length : 0;

  const update = (patch: Partial<Params>) => {
    const next = { ...p, ...patch };
    setP(next);
    if (mystery && !revealed && !solvedThis && sameShape(imageOf(next), target)) {
      setSolvedThis(true);
      setSolved((s) => s + 1);
    }
  };

  const newMystery = () => {
    setHidden(randomMystery(hidden, p));
    setHintLevel(0);
    setRevealed(false);
    setSolvedThis(false);
    setMode("mystery");
  };

  const switchMode = (m: "explore" | "mystery") => {
    if (m === "mystery" && sameShape(img, target)) {
      newMystery();
      return;
    }
    setMode(m);
  };

  const reveal = () => {
    setP({ ...hidden });
    setRevealed(true);
  };

  // ---- properties ----
  const k = p.kind === "enlarge" ? kOf(p.scale) : 1;
  const sameWay = orient(img) > 0 === orient(OBJ) > 0;
  const offGrid = !img.every((q) => inGrid(q));
  const invariant = OBJ.map((q, i) => samePt(q, img[i]));
  const invList = LETTERS.filter((_, i) => invariant[i]);

  // ---- drawing ----
  const W = 360;
  const plane = makePlane({ width: W, height: W, xMin: -LIM, xMax: LIM, yMin: -LIM, yMax: LIM, pad: 20 });
  const { px, py } = plane;
  const P = (q: Pt) => ({ x: px(q[0]), y: py(q[1]) });
  const poly = (t: Pt[]) => t.map((q) => `${r2(px(q[0]))},${r2(py(q[1]))}`).join(" ");
  const ticks = Array.from({ length: 2 * LIM + 1 }, (_, i) => i - LIM);

  const labelPos = (t: Pt[], i: number) => {
    const g = P([(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3]);
    const v = P(t[i]);
    const dx = v.x - g.x;
    const dy = v.y - g.y;
    const len = Math.hypot(dx, dy) || 1;
    return { x: v.x + (dx / len) * 11, y: v.y + (dy / len) * 11 + 4 };
  };

  const centre: Pt | null = p.kind === "rotate" ? [p.rx, p.ry] : p.kind === "enlarge" ? [p.ex, p.ey] : null;

  let mirrorLine: { x1: number; y1: number; x2: number; y2: number; lx: number; ly: number } | null = null;
  if (p.kind === "reflect") {
    if (p.mirror === "x") mirrorLine = { x1: px(p.m), y1: py(LIM), x2: px(p.m), y2: py(-LIM), lx: px(p.m) + 4, ly: py(-LIM) - 6 };
    else if (p.mirror === "y") mirrorLine = { x1: px(-LIM), y1: py(p.m), x2: px(LIM), y2: py(p.m), lx: px(-LIM) + 4, ly: py(p.m) - 5 };
    else if (p.mirror === "yx") mirrorLine = { x1: px(-LIM), y1: py(-LIM), x2: px(LIM), y2: py(LIM), lx: px(5.8), ly: py(4.4) };
    else mirrorLine = { x1: px(-LIM), y1: py(LIM), x2: px(LIM), y2: py(-LIM), lx: px(5.6), ly: py(-4.6) };
  }

  const construction: ReactNode[] = [];
  if (showCon) {
    OBJ.forEach((q, i) => {
      const a = P(q);
      const b = P(img[i]);
      const bold = i === track;
      const cls = bold ? "stroke-info" : "stroke-ink-2";
      const w = bold ? 2 : 1.1;
      if (p.kind === "translate") {
        construction.push(<Arrow key={`tr${i}`} from={a} to={b} className={cls} width={w} />);
      } else if (p.kind === "reflect") {
        if (!samePt(q, img[i])) {
          construction.push(<line key={`rf${i}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} className={cls} strokeWidth={w} strokeDasharray="4 3" />);
          const md = P(mid(q, img[i]));
          construction.push(<circle key={`rm${i}`} cx={md.x} cy={md.y} r={bold ? 3.5 : 2.5} className="fill-info" />);
        }
      } else if (centre) {
        const c = P(centre);
        if (p.kind === "rotate") {
          construction.push(<line key={`ra${i}`} x1={c.x} y1={c.y} x2={a.x} y2={a.y} className={cls} strokeWidth={w} strokeDasharray="4 3" />);
          construction.push(<line key={`rb${i}`} x1={c.x} y1={c.y} x2={b.x} y2={b.y} className={cls} strokeWidth={w} strokeDasharray="4 3" />);
          if (bold) {
            const ra = Math.hypot(a.x - c.x, a.y - c.y);
            if (ra > 4) {
              const r = Math.min(22, ra * 0.55);
              const s = { x: c.x + ((a.x - c.x) / ra) * r, y: c.y + ((a.y - c.y) / ra) * r };
              const e = { x: c.x + ((b.x - c.x) / ra) * r, y: c.y + ((b.y - c.y) / ra) * r };
              // On screen (y down) sweep-flag 1 is clockwise.
              const sweep = p.turn === "cw" ? 1 : 0;
              construction.push(
                <path
                  key="arc"
                  d={`M ${r2(s.x)} ${r2(s.y)} A ${r2(r)} ${r2(r)} 0 0 ${sweep} ${r2(e.x)} ${r2(e.y)}`}
                  className="stroke-info"
                  strokeWidth={2}
                  fill="none"
                />,
              );
            }
          }
        } else {
          // Enlargement: ray from the centre through the object point to the farther of P, P′.
          const far = k >= 1 ? b : a;
          construction.push(<line key={`en${i}`} x1={c.x} y1={c.y} x2={far.x} y2={far.y} className={cls} strokeWidth={w} strokeDasharray="4 3" />);
        }
      }
    });
  }

  const ariaLabel =
    `Coordinate grid from −8 to 8. Object triangle ABC with A${coord(OBJ[0])}, B${coord(OBJ[1])}, C${coord(OBJ[2])}. ` +
    `${describeText(p)} gives image A′${coord(img[0])}, B′${coord(img[1])}, C′${coord(img[2])}.` +
    (mystery ? ` Target triangle: A′${coord(target[0])}, B′${coord(target[1])}, C′${coord(target[2])}.` : "");

  const hints = mysteryHints(hidden);

  // ---- caption ----
  const track1 = trackText(p, track);
  let explain: ReactNode;
  if (p.kind === "translate") {
    explain = (
      <>
        A translation slides every point the same distance in the same direction. The column vector <ColVec a={p.tx} b={p.ty} /> means{" "}
        {p.tx === 0 && p.ty === 0 ? "no movement at all" : offsetWords(p.tx, p.ty)}: top number across (+ is right), bottom number up (+ is up). The
        image is congruent and faces the same way — only its position changes.
      </>
    );
  } else if (p.kind === "reflect") {
    explain = (
      <>
        Each point and its image are the same distance from the mirror line, on opposite sides, and the line joining them crosses the mirror
        at 90°{showCon ? " (dashed; the dots are the midpoints, on the mirror)" : ""}. The image is congruent but <strong>reversed</strong>: A → B → C runs
        anticlockwise on the object and clockwise on the image. Points on the mirror line don’t move — they are invariant
        {invList.length ? ` (here: ${invList.join(" and ")})` : ""}.
      </>
    );
  } else if (p.kind === "rotate") {
    explain = (
      <>
        Every point turns through the same angle about the centre and stays the same distance from it. The image is congruent and the same way
        round — a rotation never makes a mirror image. Only the centre stays still
        {invList.length ? `, so ${invList[0]} (the centre) is the one invariant vertex` : ""}.
      </>
    );
  } else {
    explain = (
      <>
        Every distance from the centre is multiplied by the scale factor, so each image point lies on a ray from the centre through its object
        point. Lengths × {kText(p.scale)}, angles unchanged, area × {p.scale === "half" ? "¼" : num(k * k)} ({OBJ_AREA} → {num(OBJ_AREA * k * k)}{" "}
        squares): the image is <strong>similar</strong> but not congruent.
        {p.scale === "half"
          ? " A scale factor between 0 and 1 shrinks the shape towards the centre — it is still called an enlargement."
          : ""}
      </>
    );
  }

  const caption = mystery ? (
    <div className="space-y-2">
      <p>
        <strong>Detective routine.</strong> Different size → enlargement. Same size but a mirror image (letters run the other way round) →
        reflection. Same size and same way round: sides still point the same directions → translation; turned → rotation. Then pin down every
        detail: the vector, the mirror line, the centre + angle + direction, or the scale factor + centre.
      </p>
      <p>{track1}</p>
    </div>
  ) : (
    <div className="space-y-2">
      <p>{explain}</p>
      <p>{track1}</p>
      {offGrid ? <p className="font-semibold text-bad">Part of the image is off the grid — change the settings to bring it back.</p> : null}
    </div>
  );

  const tCls = matched ? "stroke-good fill-good" : "stroke-ink-2 fill-none";

  return (
    <WidgetFrame
      title="Transformation lab"
      tryThis={[
        "Reflect in {{y = x}}. What happens to the coordinates? Which vertex doesn’t move, and why?",
        "Rotate 90° clockwise about the origin. Predict where B(4, 1) lands before you look.",
        "Enlarge by scale factor 3. The area starts at 3 squares — predict the new area, then check.",
        "Switch to Mystery and fully describe three hidden transformations without pressing Reveal.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<"explore" | "mystery">
            label="Mode"
            value={mode}
            onChange={switchMode}
            options={[
              { value: "explore", label: "Explore" },
              { value: "mystery", label: "🕵️ Mystery" },
            ]}
          />
          {mystery ? (
            <span className="chip" aria-live="polite">
              Solved: {solved}
            </span>
          ) : null}
        </div>

        <svg viewBox={`0 0 ${W} ${W}`} className="h-auto w-full" role="img" aria-label={ariaLabel}>
          <defs>
            <clipPath id={`clip-${uid}`}>
              <rect x={px(-LIM)} y={py(LIM)} width={px(LIM) - px(-LIM)} height={py(-LIM) - py(LIM)} />
            </clipPath>
          </defs>
          {ticks.map((t) => (
            <g key={`g${t}`}>
              <line x1={px(t)} x2={px(t)} y1={py(-LIM)} y2={py(LIM)} className={t === 0 ? "stroke-ink-2" : "stroke-line"} strokeWidth={t === 0 ? 1.5 : 1} />
              <line y1={py(t)} y2={py(t)} x1={px(-LIM)} x2={px(LIM)} className={t === 0 ? "stroke-ink-2" : "stroke-line"} strokeWidth={t === 0 ? 1.5 : 1} />
            </g>
          ))}
          {ticks
            .filter((t) => t !== 0 && t % 2 === 0)
            .map((t) => (
              <g key={`l${t}`}>
                <text x={px(t)} y={py(0) + 12} fontSize={9} textAnchor="middle" className="fill-ink-2">
                  {num(t)}
                </text>
                <text x={px(0) - 4} y={py(t) + 3} fontSize={9} textAnchor="end" className="fill-ink-2">
                  {num(t)}
                </text>
              </g>
            ))}
          <text x={px(LIM) - 2} y={py(0) - 5} fontSize={11} fontStyle="italic" textAnchor="end" className="fill-ink-2">
            x
          </text>
          <text x={px(0) + 5} y={py(LIM) + 10} fontSize={11} fontStyle="italic" className="fill-ink-2">
            y
          </text>

          <g clipPath={`url(#clip-${uid})`}>
            {mirrorLine ? (
              <g>
                <line
                  x1={mirrorLine.x1}
                  y1={mirrorLine.y1}
                  x2={mirrorLine.x2}
                  y2={mirrorLine.y2}
                  className="stroke-info"
                  strokeWidth={2.5}
                  strokeDasharray="8 5"
                />
                <text x={mirrorLine.lx} y={mirrorLine.ly} fontSize={11} fontWeight={800} className="fill-info">
                  {mirrorName(p).split(" (")[0]}
                </text>
              </g>
            ) : null}
            {construction}

            {/* object */}
            <polygon points={poly(OBJ)} className="fill-brand stroke-brand" fillOpacity={0.2} strokeWidth={2} strokeLinejoin="round" />
            {/* target (mystery) */}
            {mystery ? (
              <polygon
                points={poly(target)}
                className={tCls}
                fillOpacity={matched ? 0.18 : undefined}
                strokeWidth={2.2}
                strokeDasharray={matched ? undefined : "6 4"}
                strokeLinejoin="round"
              />
            ) : null}
            {/* image */}
            <polygon points={poly(img)} className="fill-accent stroke-accent" fillOpacity={0.3} strokeWidth={2} strokeLinejoin="round" />

            {/* track-point dots on A, A′ (and the target's A′) */}
            <circle cx={px(OBJ[0][0])} cy={py(OBJ[0][1])} r={3.5} className="fill-brand" />
            <circle cx={px(img[0][0])} cy={py(img[0][1])} r={3.5} className="fill-accent" />
            {mystery ? <circle cx={px(target[0][0])} cy={py(target[0][1])} r={3} className={matched ? "fill-good" : "fill-ink-2"} /> : null}

            {centre ? (
              <g>
                <circle cx={px(centre[0])} cy={py(centre[1])} r={4.5} className="fill-info stroke-surface" strokeWidth={1.5} />
                <text x={px(centre[0]) + 6} y={py(centre[1]) + 14} fontSize={10} fontWeight={700} className="fill-info">
                  centre
                </text>
              </g>
            ) : null}

            {/* labels */}
            {OBJ.map((q, i) => {
              const l = labelPos(OBJ, i);
              const inv = invariant[i] && !mystery;
              return (
                <text key={`lo${i}`} x={l.x} y={l.y} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-brand">
                  {inv ? `${LETTERS[i]}=${LETTERS[i]}′` : LETTERS[i]}
                </text>
              );
            })}
            {mystery
              ? target.map((q, i) => {
                  const l = labelPos(target, i);
                  return (
                    <text key={`lt${i}`} x={l.x} y={l.y} fontSize={12} fontWeight={800} textAnchor="middle" className={matched ? "fill-good" : "fill-ink-2"}>
                      {LETTERS[i]}′
                    </text>
                  );
                })
              : img.map((q, i) => {
                  if (invariant[i]) return null;
                  const l = labelPos(img, i);
                  return (
                    <text key={`li${i}`} x={l.x} y={l.y} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-ink">
                      {LETTERS[i]}′
                    </text>
                  );
                })}
          </g>
        </svg>
        <p className="-mt-2 text-xs text-ink-2">
          Purple = object ABC · amber = your image{mystery ? " · dashed = the mystery target A′B′C′" : " A′B′C′"} · the dot marks A and its image.
        </p>

        {mystery ? (
          <div
            className={`rounded-xl border p-3 text-sm ${matched ? (revealed ? "border-line bg-surface-2" : "border-good bg-good-soft") : "border-line bg-surface"}`}
            aria-live="polite"
          >
            {matched && !revealed ? (
              <p className="font-semibold text-ink">
                ✅ Match! Fully described: <Describe p={p} />.
              </p>
            ) : revealed ? (
              <p className="text-ink">
                Answer: <strong><Describe p={hidden} /></strong>. Study how each vertex moved, then try a new one.
              </p>
            ) : (
              <p className="text-ink">
                Set the controls so your amber image lands exactly on the dashed target. Vertices in place: <strong>{inPlace} / 3</strong>.
              </p>
            )}
            {!matched && hintLevel > 0 ? (
              <ol className="mt-2 list-decimal space-y-1 pl-5 text-ink-2">
                {hints.slice(0, hintLevel).map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ol>
            ) : null}
            <div className="mt-3 flex flex-wrap gap-2">
              {!matched && hintLevel < hints.length ? (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setHintLevel((h) => h + 1)}>
                  💡 Hint {hintLevel + 1}
                </button>
              ) : null}
              {!matched ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={reveal}>
                  Reveal
                </button>
              ) : null}
              <button type="button" className="btn btn-primary btn-sm" onClick={newMystery}>
                New mystery
              </button>
            </div>
          </div>
        ) : null}

        <div className="space-y-3">
          <Segmented<Kind> label="Transformation" value={p.kind} onChange={(kind) => update({ kind })} options={KIND_OPTIONS} />

          {p.kind === "translate" ? (
            <div className="grid gap-2 sm:grid-cols-2">
              <Step name="Across (+ right)" value={p.tx} min={-LIM} max={LIM} onChange={(tx) => update({ tx })} />
              <Step name="Up (+ up)" value={p.ty} min={-LIM} max={LIM} onChange={(ty) => update({ ty })} />
            </div>
          ) : null}

          {p.kind === "reflect" ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink-2">Mirror line</span>
                <Segmented<Mirror>
                  label="Mirror line"
                  value={p.mirror}
                  onChange={(mirror) => update({ mirror })}
                  options={[
                    { value: "x", label: "x = a" },
                    { value: "y", label: "y = b" },
                    { value: "yx", label: "y = x" },
                    { value: "ynx", label: "y = −x" },
                  ]}
                />
              </div>
              {p.mirror === "x" || p.mirror === "y" ? (
                <Step
                  name="Mirror position"
                  value={p.m}
                  min={-6}
                  max={6}
                  step={0.5}
                  onChange={(m) => update({ m })}
                  format={(v) => `${p.mirror} = ${num(v)}`}
                />
              ) : null}
            </div>
          ) : null}

          {p.kind === "rotate" ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink-2">Turn</span>
                <Segmented<Turn>
                  label="Angle and direction"
                  value={p.turn}
                  onChange={(turn) => update({ turn })}
                  options={[
                    { value: "acw", label: "90° ↺" },
                    { value: "cw", label: "90° ↻" },
                    { value: "half", label: "180°" },
                  ]}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Step name="Centre x" value={p.rx} min={-6} max={6} onChange={(rx) => update({ rx })} />
                <Step name="Centre y" value={p.ry} min={-6} max={6} onChange={(ry) => update({ ry })} />
              </div>
              <p className="text-xs text-ink-2">↺ = anticlockwise · ↻ = clockwise</p>
            </div>
          ) : null}

          {p.kind === "enlarge" ? (
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-ink-2">Scale factor</span>
                <Segmented<Scale>
                  label="Scale factor"
                  value={p.scale}
                  onChange={(scale) => update({ scale })}
                  options={[
                    { value: "half", label: "½ (shrink)" },
                    { value: "2", label: "2" },
                    { value: "3", label: "3" },
                  ]}
                />
              </div>
              <div className="grid gap-2 sm:grid-cols-2">
                <Step name="Centre x" value={p.ex} min={-LIM} max={LIM} onChange={(ex) => update({ ex })} />
                <Step name="Centre y" value={p.ey} min={-LIM} max={LIM} onChange={(ey) => update({ ey })} />
              </div>
            </div>
          ) : null}

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ink-2">Track</span>
            <Segmented<string>
              label="Vertex to track"
              value={String(track)}
              onChange={(v) => setTrack(Number(v))}
              options={LETTERS.map((l, i) => ({ value: String(i), label: l }))}
            />
            <button type="button" className="btn btn-ghost btn-sm" aria-pressed={showCon} onClick={() => setShowCon((s) => !s)}>
              {showCon ? "Hide" : "Show"} construction lines
            </button>
          </div>
        </div>

        {!mystery ? (
          <>
            <div className="rounded-xl border border-line bg-surface p-3 text-sm">
              <p className="font-bold text-ink">
                <Describe p={p} />
              </p>
              <ul className="mt-2 grid gap-1 font-mono text-[0.85rem] tabular-nums text-ink sm:grid-cols-3">
                {OBJ.map((q, i) => (
                  <li key={LETTERS[i]} className={i === track ? "font-extrabold text-info" : ""}>
                    {LETTERS[i]}
                    {coord(q)} → {LETTERS[i]}′{coord(img[i])}
                    {invariant[i] ? " ★" : ""}
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-ink-2">
                Coordinate rule: <span className="font-mono font-bold text-ink">{ruleText(p)}</span>
                {invList.length ? " · ★ = invariant (doesn’t move)" : ""}
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              <Readout label="Lengths" value={p.kind === "enlarge" ? `× ${kText(p.scale)}` : "× 1"} tone="ink" />
              <Readout label="Area (squares)" value={`${OBJ_AREA} → ${num(OBJ_AREA * k * k)}`} tone="ink" />
              <Readout label="Way round" value={sameWay ? "same" : "reversed"} tone="ink" />
              <Readout label="Image is" value={k === 1 ? "congruent" : "similar"} tone="brand" />
            </div>
          </>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Symmetry painter                                                        */
/* ------------------------------------------------------------------------ */

const N = 7;
const MIDC = (N - 1) / 2;

type Pen = "free" | "mirror" | "two" | "half" | "quarter" | "kaleido";
type Line = "v" | "h" | "d1" | "d2";
type Map2 = (u: number, v: number) => [number, number];

// u = across (right +), v = down the screen (down +).
const ID: Map2 = (u, v) => [u, v];
const RV: Map2 = (u, v) => [-u, v]; // vertical mirror
const RH: Map2 = (u, v) => [u, -v]; // horizontal mirror
const RD1: Map2 = (u, v) => [v, u]; // diagonal ╲
const RD2: Map2 = (u, v) => [-v, -u]; // diagonal ╱
const R90: Map2 = (u, v) => [-v, u];
const R180: Map2 = (u, v) => [-u, -v];
const R270: Map2 = (u, v) => [v, -u];

const PEN_MAPS: Record<Pen, Map2[]> = {
  free: [ID],
  mirror: [ID, RV],
  two: [ID, RV, RH, R180],
  half: [ID, R180],
  quarter: [ID, R90, R180, R270],
  kaleido: [ID, RV, RH, RD1, RD2, R90, R180, R270],
};

const PEN_OPTIONS: { value: Pen; label: string }[] = [
  { value: "free", label: "Free" },
  { value: "mirror", label: "Mirror" },
  { value: "two", label: "2 mirrors" },
  { value: "half", label: "Half-turn" },
  { value: "quarter", label: "Quarter-turn" },
  { value: "kaleido", label: "Kaleidoscope" },
];

/** Cell indices that a tap on cell i paints, for the chosen pen (about the grid's centre). */
function orbit(i: number, pen: Pen): number[] {
  const u = (i % N) - MIDC;
  const v = Math.floor(i / N) - MIDC;
  const out: number[] = [];
  for (const f of PEN_MAPS[pen]) {
    const [u2, v2] = f(u, v);
    const j = (v2 + MIDC) * N + (u2 + MIDC);
    if (!out.includes(j)) out.push(j);
  }
  return out;
}

interface SymInfo {
  lines: Line[];
  order: number;
  /** Centre of the pattern in grid units (0..N), plus half-size of its bounding box. */
  X: number;
  Y: number;
  hw: number;
  hh: number;
}

/**
 * Symmetries of a set of grid squares. Any symmetry maps the bounding box to
 * itself, so it fixes the box's centre and its linear part is one of the 8
 * symmetries of a square — checking those 8 about the box centre is complete.
 */
function analyse(cells: boolean[]): SymInfo | null {
  const pts: Pt[] = [];
  cells.forEach((on, i) => {
    if (on) pts.push([i % N, Math.floor(i / N)]);
  });
  if (!pts.length) return null;
  const cs = pts.map((q) => q[0]);
  const rs = pts.map((q) => q[1]);
  const minC = Math.min(...cs);
  const maxC = Math.max(...cs);
  const minR = Math.min(...rs);
  const maxR = Math.max(...rs);
  const cc = (minC + maxC) / 2;
  const cr = (minR + maxR) / 2;
  const has = (c: number, r: number) => Number.isInteger(c) && Number.isInteger(r) && c >= 0 && c < N && r >= 0 && r < N && cells[r * N + c];
  const works = (f: Map2) =>
    pts.every(([c, r]) => {
      const [u2, v2] = f(c - cc, r - cr);
      return has(cc + u2, cr + v2);
    });
  const lines: Line[] = [];
  if (works(RV)) lines.push("v");
  if (works(RH)) lines.push("h");
  if (works(RD1)) lines.push("d1");
  if (works(RD2)) lines.push("d2");
  const order = 1 + [R90, R180, R270].filter(works).length;
  return { lines, order, X: cc + 0.5, Y: cr + 0.5, hw: (maxC - minC + 1) / 2, hh: (maxR - minR + 1) / 2 };
}

function fromList(list: Pt[]): boolean[] {
  const cells: boolean[] = Array.from({ length: N * N }, () => false);
  for (const [c, r] of list) cells[r * N + c] = true;
  return cells;
}

const PRESETS: { name: string; cells: Pt[] }[] = [
  {
    name: "Arrow",
    cells: [
      [3, 0],
      [2, 1],
      [3, 1],
      [4, 1],
      [1, 2],
      [3, 2],
      [5, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [3, 6],
    ],
  },
  {
    name: "H",
    cells: [
      [1, 1],
      [1, 2],
      [1, 3],
      [1, 4],
      [1, 5],
      [5, 1],
      [5, 2],
      [5, 3],
      [5, 4],
      [5, 5],
      [2, 3],
      [3, 3],
      [4, 3],
    ],
  },
  {
    name: "Z",
    cells: [
      [1, 1],
      [2, 1],
      [3, 1],
      [4, 1],
      [5, 1],
      [4, 2],
      [3, 3],
      [2, 4],
      [1, 5],
      [2, 5],
      [3, 5],
      [4, 5],
      [5, 5],
    ],
  },
  {
    name: "Star",
    cells: [
      [3, 1],
      [3, 2],
      [3, 3],
      [3, 4],
      [3, 5],
      [1, 3],
      [2, 3],
      [4, 3],
      [5, 3],
      [1, 1],
      [5, 1],
      [1, 5],
      [5, 5],
    ],
  },
];

const TARGETS: { id: string; label: string; test: (s: SymInfo) => boolean }[] = [
  { id: "one", label: "Exactly 1 line", test: (s) => s.lines.length === 1 },
  { id: "two", label: "Exactly 2 lines", test: (s) => s.lines.length === 2 },
  { id: "four", label: "4 lines", test: (s) => s.lines.length === 4 },
  { id: "o2", label: "Order 2, no lines", test: (s) => s.order === 2 && s.lines.length === 0 },
  { id: "o4", label: "Order 4, no lines", test: (s) => s.order === 4 && s.lines.length === 0 },
];

function linesText(lines: Line[]): string {
  const parts: string[] = [];
  if (lines.includes("v")) parts.push("vertical");
  if (lines.includes("h")) parts.push("horizontal");
  const d = lines.filter((l) => l === "d1" || l === "d2").length;
  if (d === 2) parts.push("both diagonals");
  else if (d === 1) parts.push("one diagonal");
  return parts.join(", ");
}

function SymmetryPainter() {
  const [cells, setCells] = useState<boolean[]>(() => fromList(PRESETS[0].cells));
  const [pen, setPen] = useState<Pen>("free");
  const [achieved, setAchieved] = useState<string[]>([]);

  const sym = analyse(cells);

  const tap = (i: number) => {
    const on = !cells[i];
    const next = cells.slice();
    for (const j of orbit(i, pen)) next[j] = on;
    setCells(next);
    const s = analyse(next);
    if (s) {
      const hit = TARGETS.filter((t) => t.test(s) && !achieved.includes(t.id)).map((t) => t.id);
      if (hit.length) setAchieved((a) => [...a, ...hit.filter((h) => !a.includes(h))]);
    }
  };

  const randomise = () => {
    const next: boolean[] = Array.from({ length: N * N }, () => false);
    const seeds = 3 + Math.floor(Math.random() * 4);
    for (let s = 0; s < seeds; s++) {
      const i = Math.floor(Math.random() * N * N);
      for (const j of orbit(i, pen)) next[j] = true;
    }
    setCells(next);
  };

  // ---- overlay drawing (grid units, 1 square = 1) ----
  const m = 0.45;
  const lineEls: ReactNode[] = [];
  if (sym) {
    const { X, Y, hw, hh } = sym;
    const s = Math.max(hw, hh) + m;
    for (const l of sym.lines) {
      const [x1, y1, x2, y2] =
        l === "v"
          ? [X, Y - hh - m, X, Y + hh + m]
          : l === "h"
            ? [X - hw - m, Y, X + hw + m, Y]
            : l === "d1"
              ? [X - s, Y - s, X + s, Y + s]
              : [X - s, Y + s, X + s, Y - s];
      lineEls.push(<line key={l} x1={x1} y1={y1} x2={x2} y2={y2} className="stroke-accent" strokeWidth={0.09} strokeDasharray="0.28 0.16" strokeLinecap="round" />);
    }
  }
  const guide: ReactNode[] = [];
  const G = N / 2;
  if (pen === "mirror" || pen === "two" || pen === "kaleido") guide.push(<line key="gv" x1={G} y1={0} x2={G} y2={N} />);
  if (pen === "two" || pen === "kaleido") guide.push(<line key="gh" x1={0} y1={G} x2={N} y2={G} />);
  if (pen === "kaleido") {
    guide.push(<line key="g1" x1={0} y1={0} x2={N} y2={N} />);
    guide.push(<line key="g2" x1={0} y1={N} x2={N} y2={0} />);
  }

  const nLines = sym ? sym.lines.length : 0;
  const order = sym ? sym.order : 1;
  const aria = sym
    ? `Pattern of ${cells.filter(Boolean).length} shaded squares on a 7 by 7 grid. ${nLines === 0 ? "No lines of symmetry" : `${nLines} line${nLines === 1 ? "" : "s"} of symmetry: ${linesText(sym.lines)}`}. Rotational symmetry of order ${order}.`
    : "Empty 7 by 7 grid.";

  let insight: string;
  if (!sym) insight = "Tap squares to shade them. Pick a pen to copy every tap automatically.";
  else if (nLines === 0 && order === 1) insight = "No symmetry at all — most random patterns look like this. It only fits onto itself after a full 360° turn, so its order is 1.";
  else if (nLines === 1)
    insight =
      "One line of symmetry and order 1 — like the letter A or a kite. It can never have order 2 as well: a mirror line plus a half-turn always creates a second mirror line at right angles to the first.";
  else if (nLines === 2)
    insight =
      "Two lines of symmetry on a square grid are always at right angles — and they force a half-turn symmetry: reflecting in one line and then the other is the same as a 180° rotation. That is why the order is 2.";
  else if (nLines === 4)
    insight =
      "Four lines of symmetry and order 4, like a square. Neighbouring mirror lines are 45° apart, and reflecting in one then the next is a 90° turn. Notice the jump from 2 lines straight to 4: on a square grid, a straight mirror and a diagonal mirror together always bring the other two with them — so exactly 3 lines is impossible.";
  else if (order === 2) insight = "Half-turn symmetry with no line of symmetry — like the letters S, N and Z. Rotational symmetry doesn’t need a mirror line.";
  else insight = "A pinwheel! It fits onto itself after every quarter-turn, but no fold works: rotational symmetry of order 4 with no lines of symmetry.";

  const caption = (
    <div className="space-y-2">
      <p>{insight}</p>
      {sym ? (
        <p className="text-ink-2">
          Symmetry is checked about the pattern’s own centre (the amber dot when it can turn), not the grid’s. A shape with rotational symmetry of
          order n fits onto itself n times in a full turn; the smallest turn that works is 360° ÷ n.
        </p>
      ) : null}
    </div>
  );

  return (
    <WidgetFrame
      title="Symmetry painter"
      tryThis={[
        "Use the Quarter-turn pen to make a pattern with rotational symmetry of order 4 but **no** lines of symmetry.",
        "Make a pattern with exactly 2 lines of symmetry. What is its order of rotational symmetry? Is it always the same?",
        "Load the Arrow and change as few squares as possible to give it rotational symmetry of order 2.",
        "Try to make a pattern with exactly 3 lines of symmetry. What goes wrong?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-ink-2">Pen</span>
          <Segmented<Pen> label="Symmetry pen" value={pen} onChange={setPen} options={PEN_OPTIONS} />
        </div>

        <div className="relative mx-auto w-full max-w-[20rem]">
          <div className="grid grid-cols-7">
            {cells.map((on, i) => (
              <button
                key={i}
                type="button"
                aria-pressed={on}
                aria-label={`Square in row ${Math.floor(i / N) + 1}, column ${(i % N) + 1}`}
                onClick={() => tap(i)}
                className={`aspect-square border border-line transition-colors ${on ? "bg-brand" : "bg-surface hover:bg-brand-soft"}`}
              />
            ))}
          </div>
          <svg viewBox={`0 0 ${N} ${N}`} className="pointer-events-none absolute inset-0 h-full w-full" role="img" aria-label={aria}>
            <g className="stroke-ink-2" strokeWidth={0.035} strokeDasharray="0.1 0.1" opacity={0.6}>
              {guide}
            </g>
            {(pen === "half" || pen === "quarter") && !sym ? <circle cx={G} cy={G} r={0.1} className="fill-ink-2" /> : null}
            {lineEls}
            {sym && sym.order > 1 ? <circle cx={sym.X} cy={sym.Y} r={0.16} className="fill-accent stroke-ink" strokeWidth={0.04} /> : null}
          </svg>
        </div>
        <p className="-mt-2 text-center text-xs text-ink-2">Amber dashes = lines of symmetry · amber dot = centre of rotation · thin dotted = where your pen copies</p>

        <div className="flex flex-wrap justify-center gap-2">
          {PRESETS.map((pr) => (
            <button key={pr.name} type="button" className="btn btn-secondary btn-sm" onClick={() => setCells(fromList(pr.cells))}>
              {pr.name}
            </button>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={randomise}>
            🎲 Random
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setCells(Array.from({ length: N * N }, () => false))}>
            Clear
          </button>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <Readout label="Lines" value={sym ? nLines : "–"} tone="brand" />
          <Readout label="Order" value={sym ? order : "–"} tone="brand" />
          <Readout label="Smallest turn" value={sym ? (order > 1 ? `${360 / order}°` : "360°") : "–"} tone="ink" />
        </div>
        {sym && nLines > 0 ? <p className="-mt-2 text-sm text-ink-2">Lines of symmetry: {linesText(sym.lines)}.</p> : null}

        <div>
          <p className="text-sm font-semibold text-ink-2">Targets — make each one by tapping squares:</p>
          <ul className="mt-2 flex flex-wrap gap-2" aria-live="polite">
            {TARGETS.map((t) => {
              const done = achieved.includes(t.id);
              const now = sym ? t.test(sym) : false;
              return (
                <li
                  key={t.id}
                  className={`rounded-full border px-3 py-1 text-sm font-bold ${done ? "border-good bg-good-soft text-good" : "border-line bg-surface-2 text-ink-2"} ${now ? "ring-2 ring-accent" : ""}`}
                >
                  {done ? "✓ " : ""}
                  {t.label}
                </li>
              );
            })}
          </ul>
          <p className="mt-1 text-xs text-ink-2">
            {achieved.length}/{TARGETS.length} made · an amber ring shows which target your current pattern fits.
          </p>
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "transformation-lab",
    title: "Transformation lab",
    blurb: "Translate, reflect, rotate or enlarge a triangle — then crack mystery transformations.",
    Component: TransformationLab,
  },
  {
    id: "symmetry-painter",
    title: "Symmetry painter",
    blurb: "Paint a pattern and watch its lines of symmetry and order of rotational symmetry appear.",
    Component: SymmetryPainter,
  },
];
