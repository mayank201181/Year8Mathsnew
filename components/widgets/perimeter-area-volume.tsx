"use client";
// Explorables for "Area, Surface Area & Volume".
//  1. Cut & rearrange — where the parallelogram, triangle and trapezium area
//     formulas come from (cut-and-slide, or a copy rotated 180°).
//  2. Box builder — volume as cross-section × length (slice by slice),
//     surface area from the net, and a "least cardboard" challenge.
import { useMemo, useState, type CSSProperties, type ReactNode } from "react";
import { M, Readout, Segmented, Slider, Stepper, WidgetFrame, type WidgetDef } from "./kit";

type Pt = [number, number];
type P3 = [number, number, number];

const isWhole = (x: number) => Math.abs(x - Math.round(x)) < 1e-9;
/** Whole numbers exactly, otherwise 1 d.p. (used for exact halves, or values marked ≈). */
const num = (x: number) => (isWhole(x) ? String(Math.round(x)) : x.toFixed(1));
/** "= 5" when exact, "≈ 4.5" when rounded to 1 d.p. */
const eqApprox = (x: number) => (isWhole(x) ? `= ${num(x)}` : `≈ ${x.toFixed(1)}`);
const ptsAttr = (ps: Pt[]) => ps.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" ");
const centre = (ps: Pt[]): Pt => [ps.reduce((s, p) => s + p[0], 0) / ps.length, ps.reduce((s, p) => s + p[1], 0) / ps.length];

const MOVE_CLASS = "transition-[transform,opacity] duration-700 ease-in-out motion-reduce:transition-none";
const LABEL_CLASS = "fill-ink stroke-surface";

function Label({ x, y, children, anchor = "middle" }: { x: number; y: number; children: string; anchor?: "start" | "middle" | "end" }) {
  return (
    <text x={x} y={y} fontSize={14} fontWeight={700} textAnchor={anchor} className={LABEL_CLASS} strokeWidth={3} paintOrder="stroke">
      {children}
    </text>
  );
}

// ===========================================================================
// 1. Cut & rearrange
// ===========================================================================

type ShapeKind = "parallelogram" | "triangle" | "trapezium";

interface Piece {
  key: string;
  /** Vertices in cm (maths coordinates, y up). */
  pts: Pt[];
  role: "main" | "move" | "copy";
  c: Pt;
  /** Translation (cm) applied when rearranged… */
  shift: Pt;
  /** …after a 180° turn about the piece's centre c. */
  turn: boolean;
}

const U1 = 20; // px per cm — fixed, so every shape is drawn to the same scale
const W1 = 480;
const H1 = 214;
const BASE1 = 180; // px y of the base line
const HMAX = 7;

function pieceFinal(p: Piece): Pt[] {
  return p.pts.map(([x, y]) => (p.turn ? [2 * p.c[0] - x + p.shift[0], 2 * p.c[1] - y + p.shift[1]] : [x + p.shift[0], y + p.shift[1]]));
}

/** A copy of `pts`, rotated 180° about the point m (as a turn about its centre + a slide). */
function rotatedCopy(pts: Pt[], m: Pt): Piece {
  const c = centre(pts);
  return { key: "copy", pts, role: "copy", c, shift: [2 * (m[0] - c[0]), 2 * (m[1] - c[1])], turn: true };
}

function buildShape(shape: ShapeKind, b: number, h: number, slant: number, apex: number, a: number, shift: number) {
  const pieces: Piece[] = [];
  let area: number;
  let perimeter: number;
  let footX: number;
  let rotateRight = true;
  if (shape === "parallelogram") {
    const body: Pt[] = [[slant, 0], [b, 0], [b + slant, h], [slant, h]];
    pieces.push({ key: "body", pts: body, role: "main", c: centre(body), shift: [0, 0], turn: false });
    if (slant > 0) {
      const wedge: Pt[] = [[0, 0], [slant, 0], [slant, h]];
      pieces.push({ key: "wedge", pts: wedge, role: "move", c: centre(wedge), shift: [b, 0], turn: false });
    }
    area = b * h;
    perimeter = 2 * b + 2 * Math.hypot(slant, h);
    footX = slant;
  } else if (shape === "triangle") {
    const tri: Pt[] = [[0, 0], [b, 0], [apex, h]];
    pieces.push({ key: "tri", pts: tri, role: "main", c: centre(tri), shift: [0, 0], turn: false });
    // Spin the copy about the midpoint of whichever slanted side keeps the picture compact.
    rotateRight = apex <= b / 2;
    pieces.push(rotatedCopy(tri, rotateRight ? [(b + apex) / 2, h / 2] : [apex / 2, h / 2]));
    area = (b * h) / 2;
    perimeter = b + Math.hypot(apex, h) + Math.hypot(b - apex, h);
    footX = apex;
  } else {
    const trap: Pt[] = [[0, 0], [b, 0], [shift + a, h], [shift, h]];
    pieces.push({ key: "trap", pts: trap, role: "main", c: centre(trap), shift: [0, 0], turn: false });
    pieces.push(rotatedCopy(trap, [(b + shift + a) / 2, h / 2]));
    area = ((a + b) * h) / 2;
    perimeter = a + b + Math.hypot(shift, h) + Math.hypot(b - shift - a, h);
    footX = shift;
  }
  const xs = [0, footX];
  for (const p of pieces) for (const q of [...p.pts, ...pieceFinal(p)]) xs.push(q[0]);
  return { pieces, area, perimeter, footX, rotateRight, xMin: Math.min(...xs), xMax: Math.max(...xs) };
}

function AreaRearrange() {
  const [shape, setShape] = useState<ShapeKind>("parallelogram");
  const [b, setB] = useState(6);
  const [h, setH] = useState(4);
  const [slant, setSlant] = useState(2); // parallelogram: how far the top edge is pushed right
  const [apex, setApex] = useState(2); // triangle: apex position, cm from the left end of the base
  const [a, setA] = useState(3); // trapezium: top parallel side
  const [shift, setShift] = useState(1); // trapezium: where the top side starts
  const [done, setDone] = useState(false);

  const changeShape = (s: ShapeKind) => {
    setShape(s);
    setDone(false);
  };
  const changeB = (v: number) => {
    setB(v);
    setSlant((s) => Math.min(s, Math.min(5, v)));
    setApex((p) => Math.max(-2, Math.min(v + 2, p)));
  };

  const g = useMemo(() => buildShape(shape, b, h, slant, apex, a, shift), [shape, b, h, slant, apex, a, shift]);
  const ox = (W1 - (g.xMax - g.xMin) * U1) / 2 - g.xMin * U1;
  const px = (x: number) => ox + x * U1;
  const py = (y: number) => BASE1 - y * U1;
  const toPx = (ps: Pt[]): Pt[] => ps.map(([x, y]) => [px(x), py(y)]);

  const gridXs: number[] = [];
  for (let i = Math.ceil(-ox / U1); px(i) <= W1; i++) gridXs.push(i);
  const gridYs = Array.from({ length: HMAX + 1 }, (_, j) => j);

  const pieceStyle = (p: Piece): CSSProperties => {
    const tx = done ? p.shift[0] * U1 : 0;
    const ty = done ? -p.shift[1] * U1 : 0;
    const rot = done && p.turn ? 180 : 0;
    return {
      transform: `translate(${tx.toFixed(2)}px, ${ty.toFixed(2)}px) rotate(${rot}deg)`,
      transformOrigin: `${px(p.c[0]).toFixed(2)}px ${py(p.c[1]).toFixed(2)}px`,
      transformBox: "view-box",
      opacity: p.role === "copy" && !done ? 0 : 1,
    };
  };

  // Perpendicular height: dashed line from the top down to the base line (extended if needed).
  const foot = g.footX;
  const dir = foot < b ? 1 : -1; // which side the right-angle mark sits on
  const ext: [number, number] | null = foot < 0 ? [foot, 0] : foot > b ? [b, foot] : null;
  const mk = 0.35;
  const short = (len: number, name: string, value: number) => (len >= 2.5 ? `${name} = ${num(value)}` : num(value));
  const slantLen = Math.hypot(slant, h);

  const labels: { x: number; y: number; t: string; anchor?: "start" | "middle" | "end" }[] = [];
  if (shape === "parallelogram") {
    const baseMid = done && slant > 0 ? slant + b / 2 : b / 2;
    labels.push({ x: px(baseMid), y: py(0) + 17, t: short(b, "b", b) });
    if (!done && slant > 0) labels.push({ x: px(b + slant / 2) + 8, y: py(h / 2) + 4, t: `${isWhole(slantLen) ? "" : "≈ "}${num(slantLen)}`, anchor: "start" });
  } else if (shape === "triangle") {
    labels.push({ x: px(b / 2), y: py(0) + 17, t: short(b, "b", b) });
    if (done) labels.push({ x: px(g.rotateRight ? apex + b / 2 : apex - b / 2), y: py(h) - 7, t: short(b, "b", b) });
  } else {
    if (a > 0) labels.push({ x: px(shift + a / 2), y: py(h) - 7, t: short(a, "a", a) });
    labels.push({ x: px(b / 2), y: py(0) + 17, t: short(b, "b", b) });
    if (done) {
      labels.push({ x: px(shift + a + b / 2), y: py(h) - 7, t: short(b, "b", b) });
      if (a > 0) labels.push({ x: px(b + a / 2), y: py(0) + 17, t: short(a, "a", a) });
    }
  }
  // Height label: on the outside when the foot is beyond the base, otherwise just right of the line.
  const hLabelLeft = foot < 0;
  const hLabelX = px(foot) + (hLabelLeft ? -6 : 6);

  const formula =
    shape === "parallelogram"
      ? `A = b * h = ${b} * ${h} = ${num(g.area)}`
      : shape === "triangle"
        ? `A = 1/2 * b * h = 1/2 * ${b} * ${h} = ${num(g.area)}`
        : `A = 1/2 (a + b) h = 1/2 * (${a} + ${b}) * ${h} = ${num(g.area)}`;

  const buttonText = done ? "↩ Put it back" : shape === "parallelogram" ? "✂️ Cut & slide" : "🔄 Add a rotated copy";
  const outside = shape === "triangle" && (apex < 0 || apex > b);
  const aria =
    `${shape === "parallelogram" ? "Parallelogram" : shape === "triangle" ? "Triangle" : "Trapezium"} with base ${b} cm` +
    (shape === "trapezium" ? `, top ${a} cm` : "") +
    ` and perpendicular height ${h} cm, area ${num(g.area)} square centimetres` +
    (done ? (shape === "parallelogram" ? ", rearranged into a rectangle" : ", with a rotated copy making a parallelogram") : "");

  let caption: ReactNode;
  if (shape === "parallelogram") {
    caption =
      slant === 0 ? (
        <>With no slant this is just a {b} × {h} rectangle. Push the top sideways with the <strong>slant</strong> slider and watch which numbers change — and which don&apos;t.</>
      ) : done ? (
        <>
          The triangle cut off the left fits exactly into the gap on the right, so nothing is lost or gained: the parallelogram has become a {b} × {h} rectangle. Area = base × perpendicular height: <M>{formula}</M> cm². The slanted side ({isWhole(slantLen) ? "" : "≈ "}{num(slantLen)} cm) only changes the perimeter.
        </>
      ) : (
        <>
          The dashed line is the <strong>perpendicular height</strong> — it meets the base at 90°. The slanted side is {isWhole(slantLen) ? "" : "about "}{num(slantLen)} cm, but that is <em>not</em> the height. Press <strong>Cut &amp; slide</strong>: the orange triangle moves {b} cm to the right. What shape appears?
        </>
      );
  } else if (shape === "triangle") {
    caption = (
      <>
        {done ? (
          <>
            Two identical triangles make a parallelogram with base {b} cm and height {h} cm, so together they cover {b} × {h} = {b * h} cm². One triangle is exactly half: <M>{formula}</M> cm².
          </>
        ) : (
          <>Every triangle is exactly half of a parallelogram. Press <strong>Add a rotated copy</strong> to spin an identical triangle 180° about the midpoint of one side.</>
        )}{" "}
        {outside ? (
          <>Here the apex is beyond the end of the base, so the perpendicular height lands <strong>outside</strong> the triangle, on the dashed extension of the base. It is still {h} cm, and the formula still works.</>
        ) : null}
      </>
    );
  } else {
    const special =
      a === b ? (
        <> Here <M>{"a = b"}</M>, so both pairs of sides are parallel — it&apos;s a parallelogram, and <M>{"1/2 (b + b) h = bh"}</M> agrees.</>
      ) : a === 0 ? (
        <> With <M>{"a = 0"}</M> the top has shrunk to a point — it&apos;s a triangle, and <M>{"1/2 (0 + b) h = 1/2 bh"}</M>.</>
      ) : null;
    caption = done ? (
      <>
        Turned upside down, the copy puts its long side next to the short side. Together they make a parallelogram with base <M>{"a + b"}</M> = {a + b} cm and height {h} cm: {a + b} × {h} = {(a + b) * h} cm². One trapezium is half of that: <M>{formula}</M> cm².{special}
      </>
    ) : (
      <>
        The parallel sides are <M>{"a"}</M> = {a} cm (top) and <M>{"b"}</M> = {b} cm (bottom); the dashed line is the perpendicular height. Press <strong>Add a rotated copy</strong> to fit an upside-down copy alongside.{special}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Cut & rearrange: where the area formulas come from"
      tryThis={[
        "Parallelogram: drag the slant. Does the area change? Does the perimeter? Why?",
        "Triangle: move the apex past the end of the base. Where is the perpendicular height now — and does {{1/2 bh}} still work?",
        "Trapezium: make {{a = b}}, then {{a = 0}}. What shapes do you get, and does {{1/2 (a + b) h}} still give the right area?",
        "Make all three shapes with an area of exactly 12 cm².",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<ShapeKind>
          label="Shape"
          value={shape}
          onChange={changeShape}
          options={[
            { value: "parallelogram", label: "Parallelogram" },
            { value: "triangle", label: "Triangle" },
            { value: "trapezium", label: "Trapezium" },
          ]}
        />

        <svg viewBox={`0 0 ${W1} ${H1}`} className="h-auto w-full" role="img" aria-label={aria}>
          <g aria-hidden>
            {gridXs.map((i) => (
              <line key={`gx${i}`} x1={px(i)} x2={px(i)} y1={py(HMAX)} y2={py(0)} className="stroke-line" strokeWidth={1} />
            ))}
            {gridYs.map((j) => (
              <line key={`gy${j}`} x1={0} x2={W1} y1={py(j)} y2={py(j)} className="stroke-line" strokeWidth={1} />
            ))}
          </g>
          {ext ? <line x1={px(ext[0])} x2={px(ext[1])} y1={py(0)} y2={py(0)} className="stroke-ink-2" strokeWidth={1.5} strokeDasharray="5 4" /> : null}
          {g.pieces.map((p) => (
            <polygon
              key={`${shape}-${p.key}`}
              points={ptsAttr(toPx(p.pts))}
              className={`${MOVE_CLASS} ${p.role === "main" ? "fill-brand-soft stroke-brand" : "fill-accent-soft stroke-accent"}`}
              strokeWidth={2}
              strokeLinejoin="round"
              strokeDasharray={p.role === "copy" ? "6 4" : undefined}
              style={pieceStyle(p)}
            />
          ))}
          <line x1={px(foot)} x2={px(foot)} y1={py(h)} y2={py(0)} className="stroke-ink" strokeWidth={1.5} strokeDasharray="5 4" />
          <polyline
            points={ptsAttr(toPx([[foot + dir * mk, 0], [foot + dir * mk, mk], [foot, mk]]))}
            fill="none"
            className="stroke-ink"
            strokeWidth={1.2}
          />
          <Label x={hLabelX} y={py(h / 2) + 4} anchor={hLabelLeft ? "end" : "start"}>{`h = ${h}`}</Label>
          {labels.map((l, i) => (
            <Label key={i} x={l.x} y={l.y} anchor={l.anchor}>
              {l.t}
            </Label>
          ))}
        </svg>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={() => setDone((d) => !d)} aria-pressed={done}>
            {buttonText}
          </button>
          <div className="grid flex-1 grid-cols-2 gap-2">
            <Readout label="Area" value={`${num(g.area)} cm²`} />
            <Readout label="Perimeter" value={`${isWhole(g.perimeter) ? "" : "≈ "}${num(g.perimeter)} cm`} tone="ink" />
          </div>
        </div>
        <p className="text-center text-lg">
          <M>{formula}</M> cm²
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {shape === "trapezium" ? <Slider label="Top side a (cm)" value={a} min={0} max={9} onChange={setA} /> : null}
          <Slider label="Base b (cm)" value={b} min={1} max={10} onChange={changeB} />
          <Slider label="Perpendicular height h (cm)" value={h} min={1} max={HMAX} onChange={setH} />
          {shape === "parallelogram" ? <Slider label="Slant (cm the top is pushed right)" value={slant} min={0} max={Math.min(5, b)} onChange={setSlant} /> : null}
          {shape === "triangle" ? <Slider label="Apex position (cm from left end of base)" value={apex} min={-2} max={b + 2} onChange={setApex} format={(v) => (v < 0 ? `−${-v}` : String(v))} /> : null}
          {shape === "trapezium" ? <Slider label="Top side starts (cm from the left)" value={shift} min={0} max={3} onChange={setShift} /> : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. Box builder
// ===========================================================================

type Solid = "cuboid" | "prism";
type BoxView = "solid" | "net";

const TARGETS = [24, 36, 48, 60, 72];
const C30 = Math.cos(Math.PI / 6);
const UI = 18; // px per cm in the 3D drawing
const WI = 480;
const HI = 280;
const WN = 480;
const HN = 320;

const boxKey = (l: number, w: number, h: number) => [l, w, h].sort((x, y) => x - y).join(" × ");
const boxSA = (l: number, w: number, h: number) => 2 * (l * w + l * h + w * h);

/** Every cuboid with whole-number edges and volume v (edges sorted small → large). */
function boxesWithVolume(v: number) {
  const out: { dims: P3; sa: number }[] = [];
  for (let p = 1; p * p * p <= v; p++) {
    if (v % p) continue;
    for (let q = p; p * q * q <= v; q++) {
      if ((v / p) % q) continue;
      const r = v / p / q;
      out.push({ dims: [p, q, r], sa: boxSA(p, q, r) });
    }
  }
  return out;
}

interface NetFace {
  key: string;
  pts: Pt[];
  cls: string;
  text: string[];
  /** Where to put the text (cm, net coordinates). */
  at: Pt;
}

/** A rectangular face of a net (cm, net coordinates) labelled with its size and area when it fits at `un` px per cm. */
function rectFace(key: string, x: number, y: number, fw: number, fh: number, cls: string, un: number, approxArea = false): NetFace {
  const areaText = `${approxArea && !isWhole(fw * fh) ? "≈ " : "= "}${num(fw * fh)}`;
  const pw = fw * un;
  const ph = fh * un;
  const text = pw >= 60 && ph >= 34 ? [`${num(fw)} × ${num(fh)}`, areaText] : pw >= 28 && ph >= 16 ? [`${approxArea && !isWhole(fw * fh) ? "≈" : ""}${num(fw * fh)}`] : [];
  return { key, pts: [[x, y], [x + fw, y], [x + fw, y + fh], [x, y + fh]], cls, text, at: [x + fw / 2, y + fh / 2] };
}

function BoxBuilder() {
  const [solid, setSolid] = useState<Solid>("cuboid");
  const [view, setView] = useState<BoxView>("solid");
  const [dims, setDims] = useState({ l: 5, w: 3, h: 2 });
  const [k, setK] = useState(5);
  const [tIdx, setTIdx] = useState(0);
  const [found, setFound] = useState<string[]>([]);
  const { l, w, h } = dims;
  const target = TARGETS[tIdx];

  const update = (next: { l: number; w: number; h: number }) => {
    setK((old) => (old >= l ? next.l : Math.min(old, next.l)));
    setDims(next);
    if (next.l * next.w * next.h === target) {
      const key = boxKey(next.l, next.w, next.h);
      setFound((f) => (f.includes(key) ? f : [...f, key]));
    }
  };
  const nextTarget = () => {
    const ni = (tIdx + 1) % TARGETS.length;
    setTIdx(ni);
    setFound(l * w * h === TARGETS[ni] ? [boxKey(l, w, h)] : []);
  };

  const kk = Math.min(k, l);
  const s = Math.hypot(w, h);
  const A = solid === "cuboid" ? w * h : (w * h) / 2;
  const V = A * l;
  const SA = solid === "cuboid" ? boxSA(l, w, h) : w * h + l * (w + h + s);
  const saText = `${isWhole(SA) ? "" : "≈ "}${num(SA)} cm²`;

  // ---- challenge bookkeeping ----
  const options = useMemo(() => boxesWithVolume(target), [target]);
  const best = Math.min(...options.map((o) => o.sa));
  const reachable = options.filter((o) => o.dims[1] <= 6 && o.dims[2] <= 8).length;
  const foundList = found
    .map((key) => {
      const d = key.split(" × ").map(Number);
      return { key, sa: boxSA(d[0], d[1], d[2]) };
    })
    .sort((p, q) => p.sa - q.sa);
  const gotBest = foundList.length > 0 && foundList[0].sa === best;

  // ---- isometric projection (x = length, y = width/depth, z = height) ----
  const ox = WI / 2 - ((l - w) * C30 * UI) / 2;
  const oy = HI / 2 - (((l + w) / 2 - h) * UI) / 2;
  const P = ([x, y, z]: P3): Pt => [ox + (x - y) * C30 * UI, oy + ((x + y) / 2 - z) * UI];
  const poly = (ps: P3[]) => ptsAttr(ps.map(P));
  const seg = (p: P3, q: P3, key: string, cls: string, dash?: string, width = 1) => {
    const [x1, y1] = P(p);
    const [x2, y2] = P(q);
    return <line key={key} x1={x1} y1={y1} x2={x2} y2={y2} className={cls} strokeWidth={width} strokeDasharray={dash} />;
  };
  const range = (n: number) => Array.from({ length: Math.max(0, n - 1) }, (_, i) => i + 1);
  const GRID = "stroke-ink opacity-30";

  const slab =
    kk === 0 ? null : solid === "cuboid" ? (
      <g>
        <polygon points={poly([[0, 0, h], [kk, 0, h], [kk, w, h], [0, w, h]])} className="fill-brand-soft stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
        <polygon points={poly([[0, w, 0], [kk, w, 0], [kk, w, h], [0, w, h]])} className="fill-accent-soft stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
        <polygon points={poly([[kk, 0, 0], [kk, w, 0], [kk, w, h], [kk, 0, h]])} className="fill-good-soft stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
        {range(kk).map((i) => seg([i, 0, h], [i, w, h], `tx${i}`, GRID))}
        {range(w).map((j) => seg([0, j, h], [kk, j, h], `ty${j}`, GRID))}
        {range(kk).map((i) => seg([i, w, 0], [i, w, h], `fx${i}`, GRID))}
        {range(h).map((m) => seg([0, w, m], [kk, w, m], `fz${m}`, GRID))}
        {range(w).map((j) => seg([kk, j, 0], [kk, j, h], `ey${j}`, GRID))}
        {range(h).map((m) => seg([kk, 0, m], [kk, w, m], `ez${m}`, GRID))}
      </g>
    ) : (
      <g>
        <polygon points={poly([[0, w, 0], [kk, w, 0], [kk, 0, h], [0, 0, h]])} className="fill-info-soft stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
        <polygon points={poly([[kk, 0, 0], [kk, w, 0], [kk, 0, h]])} className="fill-good-soft stroke-ink" strokeWidth={1.5} strokeLinejoin="round" />
        {range(kk).map((i) => seg([i, w, 0], [i, 0, h], `sx${i}`, GRID))}
        {range(w).map((j) => seg([kk, j, 0], [kk, j, h * (1 - j / w)], `ey${j}`, GRID))}
        {range(h).map((m) => seg([kk, 0, m], [kk, w * (1 - m / h), m], `ez${m}`, GRID))}
      </g>
    );

  // Edges of the whole (glass) solid. Hidden edges are drawn before the filled slab so the slab
  // covers them; visible edges (and the dotted half-cuboid, which is in front) go on top.
  const EDGE = "stroke-ink-2";
  const ghostHidden =
    solid === "cuboid" ? (
      <g>
        {seg([0, 0, 0], [l, 0, 0], "h1", EDGE, "4 4")}
        {seg([0, 0, 0], [0, w, 0], "h2", EDGE, "4 4")}
        {seg([0, 0, 0], [0, 0, h], "h3", EDGE, "4 4")}
      </g>
    ) : (
      <g>
        {seg([0, 0, 0], [0, w, 0], "h1", EDGE, "4 4")}
        {seg([0, 0, 0], [0, 0, h], "h2", EDGE, "4 4")}
        {seg([0, 0, 0], [l, 0, 0], "h3", EDGE, "4 4")}
      </g>
    );
  const ghostVisible =
    solid === "cuboid" ? (
      <g>
        {seg([l, 0, 0], [l, w, 0], "v1", EDGE, undefined, 1.5)}
        {seg([0, w, 0], [l, w, 0], "v2", EDGE, undefined, 1.5)}
        {seg([l, 0, 0], [l, 0, h], "v3", EDGE, undefined, 1.5)}
        {seg([l, w, 0], [l, w, h], "v4", EDGE, undefined, 1.5)}
        {seg([0, w, 0], [0, w, h], "v5", EDGE, undefined, 1.5)}
        {seg([0, 0, h], [l, 0, h], "v6", EDGE, undefined, 1.5)}
        {seg([l, 0, h], [l, w, h], "v7", EDGE, undefined, 1.5)}
        {seg([l, w, h], [0, w, h], "v8", EDGE, undefined, 1.5)}
        {seg([0, w, h], [0, 0, h], "v9", EDGE, undefined, 1.5)}
      </g>
    ) : (
      <g>
        {/* the cuboid the prism was cut from (dotted; the missing half is in front of the slope) */}
        {seg([0, w, 0], [0, w, h], "c1", EDGE, "2 4")}
        {seg([l, w, 0], [l, w, h], "c2", EDGE, "2 4")}
        {seg([0, 0, h], [0, w, h], "c3", EDGE, "2 4")}
        {seg([l, 0, h], [l, w, h], "c4", EDGE, "2 4")}
        {seg([0, w, h], [l, w, h], "c5", EDGE, "2 4")}
        {seg([0, w, 0], [0, 0, h], "v1", EDGE, undefined, 1.5)}
        {seg([l, 0, 0], [l, w, 0], "v2", EDGE, undefined, 1.5)}
        {seg([l, 0, 0], [l, 0, h], "v3", EDGE, undefined, 1.5)}
        {seg([l, w, 0], [l, 0, h], "v4", EDGE, undefined, 1.5)}
        {seg([0, w, 0], [l, w, 0], "v5", EDGE, undefined, 1.5)}
        {seg([0, 0, h], [l, 0, h], "v6", EDGE, undefined, 1.5)}
      </g>
    );

  const mid = (p: P3, q: P3): Pt => {
    const [x1, y1] = P(p);
    const [x2, y2] = P(q);
    return [(x1 + x2) / 2, (y1 + y2) / 2];
  };
  const lMid = mid([0, w, 0], [l, w, 0]);
  const wMid = mid([l, 0, 0], [l, w, 0]);
  const hMid = mid([l, 0, 0], [l, 0, h]);

  // ---- nets (scaled to fit; every face uses the same scale, so the net stays in proportion) ----
  const [bx0, by0, bw, bh] = solid === "cuboid" ? [0, 0, 2 * (l + w), 2 * w + h] : [-h, -h, l + 2 * h, h + w + s];
  const un = Math.min(34, (WN - 40) / bw, (HN - 40) / bh);
  const nx = (WN - bw * un) / 2 - bx0 * un;
  const ny = (HN - bh * un) / 2 - by0 * un;
  const faces: NetFace[] = [];
  if (solid === "cuboid") {
    faces.push(rectFace("endL", 0, w, w, h, "fill-good-soft", un));
    faces.push(rectFace("front", w, w, l, h, "fill-accent-soft", un));
    faces.push(rectFace("endR", w + l, w, w, h, "fill-good-soft", un));
    faces.push(rectFace("back", 2 * w + l, w, l, h, "fill-accent-soft", un));
    faces.push(rectFace("top", w, 0, l, w, "fill-brand-soft", un));
    faces.push(rectFace("bottom", w, w + h, l, w, "fill-brand-soft", un));
  } else {
    faces.push(rectFace("back", 0, -h, l, h, "fill-accent-soft", un));
    faces.push(rectFace("bottom", 0, 0, l, w, "fill-brand-soft", un));
    // the sloping face is l by s (s is usually not a whole number, so its label is rounded)
    const slope = rectFace("slope", 0, w, l, s, "fill-info-soft", un, true);
    if (slope.text.length === 2) slope.text = [`${l} × ${isWhole(s) ? num(s) : `${s.toFixed(1)}…`}`, slope.text[1]];
    faces.push(slope);
    const triText = w * un >= 28 && h * un >= 28 ? [num((w * h) / 2)] : [];
    faces.push({ key: "triL", pts: [[0, 0], [0, w], [-h, 0]], cls: "fill-good-soft", text: triText, at: [-h / 3, w / 3] });
    faces.push({ key: "triR", pts: [[l, 0], [l, w], [l + h, 0]], cls: "fill-good-soft", text: triText, at: [l + h / 3, w / 3] });
  }
  const NX = (x: number) => nx + x * un;
  const NY = (y: number) => ny + y * un;

  const ariaSolid =
    solid === "cuboid"
      ? `Isometric drawing of a cuboid ${l} cm long, ${w} cm wide and ${h} cm high, with ${kk} of its ${l} one-centimetre slices filled`
      : `Isometric drawing of a triangular prism ${l} cm long whose cross-section is a right-angled triangle with legs ${w} cm and ${h} cm, half of a dotted cuboid, with ${kk} of ${l} slices filled`;
  const ariaNet =
    solid === "cuboid"
      ? `Net of the ${l} by ${w} by ${h} cuboid: six rectangles in three matching pairs, total area ${num(SA)} square centimetres`
      : `Net of the triangular prism: two right-angled triangles and three rectangles, total area about ${num(SA)} square centimetres`;

  let caption: ReactNode;
  if (view === "solid") {
    caption =
      solid === "cuboid" ? (
        <>
          Each 1 cm slice is a {w} × {h} layer of {w * h} cubes — the <strong>cross-section</strong>. {kk} of {l} slices = {num(kk * A)} cm³. The whole box: volume = cross-section × length = {num(A)} × {l} = <strong>{num(V)} cm³</strong>, so it holds {num(V)} ml of water (<M>{"1 cm^3 = 1 ml"}</M>).
        </>
      ) : (
        <>
          Slice this prism anywhere along its length and you get the same right-angled triangle: half of a {w} × {h} rectangle, so its area is <M>{`1/2 * ${w} * ${h} = ${num(A)}`}</M> cm². Volume = cross-section × length = {num(A)} × {l} = <strong>{num(V)} cm³</strong> — exactly half of the dotted {l} × {w} × {h} cuboid ({l * w * h} cm³).
        </>
      );
  } else {
    caption =
      solid === "cuboid" ? (
        <>
          Unfolded, a cuboid is 6 rectangles in 3 matching pairs (same colour, same size): surface area = 2 × {l * w} + 2 × {l * h} + 2 × {w * h} = <strong>{num(SA)} cm²</strong>. Surface area counts flat squares of cardboard (cm²); volume counts cubes of space (cm³).
        </>
      ) : (
        <>
          2 triangles + 3 rectangles. The sloping rectangle is {l} cm by <M>{"s"}</M> cm, where <M>{"s"}</M> {eqApprox(s)} cm (measure it — or use Pythagoras in Year 9), so its area is {l} × <M>{"s"}</M> {eqApprox(l * s)} cm². Surface area = 2 × {num(A)} + {l * w} + {l * h} + {num(l * s)} {eqApprox(SA)} cm².
        </>
      );
  }

  return (
    <WidgetFrame
      title="Box builder: volume vs surface area"
      tryThis={[
        "Box challenge: build every cuboid with the target volume. Which one needs the least cardboard — and what do the best boxes look like?",
        "Set 4 × 3 × 2, then double every length. The volume is multiplied by…? The surface area by…?",
        "Find a cuboid whose volume and surface area are the same number.",
        "Switch to the triangular prism. Why is its volume exactly half the cuboid's, but its surface area more than half?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <Segmented<Solid>
            label="Solid"
            value={solid}
            onChange={setSolid}
            options={[
              { value: "cuboid", label: "Cuboid" },
              { value: "prism", label: "Triangular prism" },
            ]}
          />
          <Segmented<BoxView>
            label="View"
            value={view}
            onChange={setView}
            options={[
              { value: "solid", label: "🧊 Fill it (volume)" },
              { value: "net", label: "📐 Unfold it (net)" },
            ]}
          />
        </div>

        {view === "solid" ? (
          <svg viewBox={`0 0 ${WI} ${HI}`} className="h-auto w-full" role="img" aria-label={ariaSolid}>
            {ghostHidden}
            {slab}
            {ghostVisible}
            <Label x={lMid[0] - 6} y={lMid[1] + 18} anchor="end">{`l = ${l} cm`}</Label>
            <Label x={wMid[0] + 8} y={wMid[1] + 18} anchor="start">{`w = ${w} cm`}</Label>
            <Label x={hMid[0] + 8} y={hMid[1] + 4} anchor="start">{`h = ${h} cm`}</Label>
          </svg>
        ) : (
          <svg viewBox={`0 0 ${WN} ${HN}`} className="h-auto w-full" role="img" aria-label={ariaNet}>
            {faces.map((f) => (
              <polygon key={f.key} points={ptsAttr(f.pts.map(([x, y]) => [NX(x), NY(y)]))} className={`${f.cls} stroke-ink`} strokeWidth={1.5} strokeLinejoin="round" />
            ))}
            {faces.map((f) =>
              f.text.map((t, i) => (
                <text
                  key={`${f.key}-t${i}`}
                  x={NX(f.at[0])}
                  y={NY(f.at[1]) + (f.text.length === 2 ? (i === 0 ? -4 : 12) : 4)}
                  fontSize={12}
                  fontWeight={700}
                  textAnchor="middle"
                  className="fill-ink"
                >
                  {t}
                </text>
              )),
            )}
          </svg>
        )}

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="Cross-section" value={`${num(A)} cm²`} tone="ink" />
          <Readout label="Volume" value={`${num(V)} cm³`} />
          <Readout label="Capacity" value={`${num(V)} ml`} tone="ink" />
          <Readout label="Surface area" value={saText} tone="good" />
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stepper label="Length l (cm)" value={l} min={1} max={8} onChange={(v) => update({ l: v, w, h })} />
          <Stepper label="Width w (cm)" value={w} min={1} max={6} onChange={(v) => update({ l, w: v, h })} />
          <Stepper label="Height h (cm)" value={h} min={1} max={6} onChange={(v) => update({ l, w, h: v })} />
        </div>
        {view === "solid" ? <Slider label="Fill it slice by slice" value={kk} min={0} max={l} onChange={setK} format={(v) => `${v} of ${l}`} /> : null}

        {solid === "cuboid" && V === SA ? (
          <p className="rounded-xl bg-good-soft p-3 text-sm font-semibold text-good">
            Volume {num(V)}, surface area {num(SA)}: the same number! But they measure different things (cm³ and cm²) — measure in mm instead and they are no longer equal.
          </p>
        ) : null}

        {solid === "cuboid" ? (
          <div className="rounded-xl border border-line p-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-sm">
                <strong>Box challenge:</strong> make a cuboid with volume <strong>{target} cm³</strong> using the least cardboard.
              </p>
              <button type="button" className="btn btn-secondary" onClick={nextTarget}>
                New target
              </button>
            </div>
            <p className={`mt-2 text-sm font-semibold ${V === target ? "text-good" : "text-ink-2"}`}>
              {V === target ? `✓ Your ${l} × ${w} × ${h} box has volume ${target} cm³.` : `Your box: ${num(V)} cm³ (target ${target} cm³).`} Boxes found: {foundList.length} of {reachable} possible with these sliders.
            </p>
            {foundList.length ? (
              <ul className="mt-2 flex flex-wrap gap-1.5" aria-label="Boxes found so far">
                {foundList.map((f) => (
                  <li key={f.key} className={`chip ${f.sa === best && gotBest ? "bg-good-soft text-good" : ""}`}>
                    {f.key} → {f.sa} cm²
                  </li>
                ))}
              </ul>
            ) : null}
            {gotBest ? (
              <p className="mt-2 text-sm text-good">
                🏆 {foundList[0].key} needs only {best} cm² — the least possible for {target} cm³ with whole-centimetre edges. The best box is the most cube-like one.
              </p>
            ) : foundList.length ? (
              <p className="mt-2 text-sm text-ink-2">Least cardboard so far: {foundList[0].sa} cm². Can you beat it?</p>
            ) : null}
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "area-cut-and-rearrange",
    title: "Cut & rearrange",
    blurb: "Cut, slide and spin shapes to see why the parallelogram, triangle and trapezium formulas work.",
    Component: AreaRearrange,
  },
  {
    id: "box-builder",
    title: "Box builder",
    blurb: "Fill a box slice by slice, unfold it into a net, and hunt for the box that uses the least cardboard.",
    Component: BoxBuilder,
  },
];
