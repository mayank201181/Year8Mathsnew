"use client";
// Interactive explorables for the "constructions-bearings" topic.
//  1. Compass constructions — SSS triangles (and when they are impossible), the
//     perpendicular bisector, the angle bisector and the perpendicular from a
//     point, built step by step. Tap the drawing to drop a test point X and see
//     the "equidistant" idea that makes each construction work.
//  2. Bearings navigator — a bearing and its back bearing (parallel North
//     lines, alternate angles), a two-leg journey on a scale map, and a
//     "find the island" challenge using a protractor ring and the map scale.
import { useState, type ReactNode, type MouseEvent } from "react";
import { WidgetFrame, Slider, Stepper, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                             */
/* ------------------------------------------------------------------------ */

interface Pt {
  x: number;
  y: number;
}

const DEG = Math.PI / 180;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const n2 = (v: number) => +v.toFixed(2);

/** Round to `dp` places, drop trailing zeros, use a real minus sign. */
function fmt(v: number, dp = 1): string {
  let s = v.toFixed(dp);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  if (s === "-0") s = "0";
  return s.replace("-", "−");
}

/** True when v terminates within `dp` decimal places. */
function exactTo(v: number, dp: number): boolean {
  const s = v * 10 ** dp;
  return Math.abs(s - Math.round(s)) < 1e-6;
}

/** "3.5" when exact to dp places, otherwise "≈ 3.6". */
function approx(v: number, dp = 1): string {
  return (exactTo(v, dp) ? "" : "≈ ") + fmt(v, dp);
}

const norm360 = (b: number) => ((b % 360) + 360) % 360;

/** A three-figure bearing, e.g. 7 → "007°", 359.6 → "000°". */
function three(b: number): string {
  const n = norm360(Math.round(b)) % 360;
  return `${String(n).padStart(3, "0")}°`;
}

/** The two crossing points of two circles (first one is "above" the line c1→c2), or null. */
function circleX(c1: Pt, r1: number, c2: Pt, r2: number): [Pt, Pt] | null {
  const dx = c2.x - c1.x;
  const dy = c2.y - c1.y;
  const d = Math.hypot(dx, dy);
  if (d < 1e-9) return null;
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h2 = r1 * r1 - a * a;
  if (h2 < -1e-9) return null;
  const h = Math.sqrt(Math.max(0, h2));
  const mx = c1.x + (a * dx) / d;
  const my = c1.y + (a * dy) / d;
  return [
    { x: mx - (h * dy) / d, y: my + (h * dx) / d },
    { x: mx + (h * dy) / d, y: my - (h * dx) / d },
  ];
}

const unit = (v: Pt): Pt => {
  const l = Math.hypot(v.x, v.y) || 1;
  return { x: v.x / l, y: v.y / l };
};

/** A slider with − / + buttons (big enough for fingers). `wrap` makes 359 + 1 → 0. */
function NudgeSlider({
  name,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
  wrap = false,
}: {
  name: string;
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => ReactNode;
  wrap?: boolean;
}) {
  const dec = () => onChange(wrap && value - step < min ? max : Math.max(min, +(value - step).toFixed(4)));
  const inc = () => onChange(wrap && value + step > max ? min : Math.min(max, +(value + step).toFixed(4)));
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <Slider label={label} value={value} min={min} max={max} step={step} onChange={onChange} format={format} />
      </div>
      <button type="button" className="kbd h-10 min-w-10" onClick={dec} disabled={!wrap && value <= min} aria-label={`${name}: decrease by ${step}`}>
        −
      </button>
      <button type="button" className="kbd h-10 min-w-10" onClick={inc} disabled={!wrap && value >= max} aria-label={`${name}: increase by ${step}`}>
        +
      </button>
    </div>
  );
}

/** Text with a halo so it stays readable on top of lines. */
function Tag({
  x,
  y,
  children,
  cls = "fill-ink",
  size = 13,
  bold = true,
  anchor = "middle",
}: {
  x: number;
  y: number;
  children: ReactNode;
  cls?: string;
  size?: number;
  bold?: boolean;
  anchor?: "start" | "middle" | "end";
}) {
  return (
    <text
      x={n2(x)}
      y={n2(y)}
      fontSize={size}
      fontWeight={bold ? 800 : 500}
      textAnchor={anchor}
      dominantBaseline="middle"
      className={`${cls} stroke-surface`}
      strokeWidth={3}
      style={{ paintOrder: "stroke" }}
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Compass constructions                                                   */
/* ------------------------------------------------------------------------ */

const CW = 360;
const CH = 280;
const K = 20; // px per cm on the construction paper

type Mapper = (p: Pt) => Pt;

/** Squared "paper" (1 cm grid) in cm coordinates, y upwards. Optional tap-to-place. */
function Paper({ ox, oy, label, onTap, children }: { ox: number; oy: number; label: string; onTap?: (p: Pt) => void; children: ReactNode }) {
  const xs: number[] = [];
  for (let x = ox % K; x <= CW; x += K) xs.push(x);
  const ys: number[] = [];
  for (let y = oy % K; y <= CH; y += K) ys.push(y);
  const handle = onTap
    ? (e: MouseEvent<SVGSVGElement>) => {
        const ctm = e.currentTarget.getScreenCTM();
        if (!ctm) return;
        const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(ctm.inverse());
        onTap({ x: +((p.x - ox) / K).toFixed(2), y: +((oy - p.y) / K).toFixed(2) });
      }
    : undefined;
  return (
    <svg
      viewBox={`0 0 ${CW} ${CH}`}
      className={`h-auto w-full rounded-xl border border-line bg-surface${onTap ? " cursor-crosshair" : ""}`}
      role="img"
      aria-label={label}
      onClick={handle}
    >
      {xs.map((x) => (
        <line key={`gx${x}`} x1={x} x2={x} y1={0} y2={CH} className="stroke-line" strokeWidth={0.75} />
      ))}
      {ys.map((y) => (
        <line key={`gy${y}`} x1={0} x2={CW} y1={y} y2={y} className="stroke-line" strokeWidth={0.75} />
      ))}
      {children}
    </svg>
  );
}

function Seg({ S, a, b, cls = "stroke-ink", w = 2.5, dash }: { S: Mapper; a: Pt; b: Pt; cls?: string; w?: number; dash?: string }) {
  const p = S(a);
  const q = S(b);
  return <line x1={n2(p.x)} y1={n2(p.y)} x2={n2(q.x)} y2={n2(q.y)} className={cls} strokeWidth={w} strokeDasharray={dash} strokeLinecap="round" />;
}

/** A whole straight line through p in direction d (runs off the paper both ways). */
function FullLine({ S, p, d, cls = "stroke-good", w = 2.5, dash }: { S: Mapper; p: Pt; d: Pt; cls?: string; w?: number; dash?: string }) {
  const u = unit(d);
  return <Seg S={S} a={{ x: p.x - 40 * u.x, y: p.y - 40 * u.y }} b={{ x: p.x + 40 * u.x, y: p.y + 40 * u.y }} cls={cls} w={w} dash={dash} />;
}

function Dot({ S, p, cls = "fill-ink", r = 3.5, hollow = false }: { S: Mapper; p: Pt; cls?: string; r?: number; hollow?: boolean }) {
  const q = S(p);
  return hollow ? (
    <circle cx={n2(q.x)} cy={n2(q.y)} r={r} className="fill-surface stroke-ink-2" strokeWidth={1.5} />
  ) : (
    <circle cx={n2(q.x)} cy={n2(q.y)} r={r} className={cls} />
  );
}

/** Label at a point plus an offset given in cm. */
function PLabel({ S, p, off, children, cls, size }: { S: Mapper; p: Pt; off: Pt; children: ReactNode; cls?: string; size?: number }) {
  const q = S({ x: p.x + off.x, y: p.y + off.y });
  return (
    <Tag x={q.x} y={q.y} cls={cls} size={size}>
      {children}
    </Tag>
  );
}

/** Faint full circle: every point at this distance from the centre. */
function Locus({ S, c, r, cls }: { S: Mapper; c: Pt; r: number; cls: string }) {
  const q = S(c);
  return <circle cx={n2(q.x)} cy={n2(q.y)} r={n2(r * K)} fill="none" className={cls} strokeWidth={1} strokeDasharray="3 4" opacity={0.55} />;
}

/** Arc of a circle centre c, radius r, from maths angle a0 to a1 (degrees, anticlockwise). */
function arcD(S: Mapper, c: Pt, r: number, a0: number, a1: number): string {
  const s = S({ x: c.x + r * Math.cos(a0 * DEG), y: c.y + r * Math.sin(a0 * DEG) });
  const e = S({ x: c.x + r * Math.cos(a1 * DEG), y: c.y + r * Math.sin(a1 * DEG) });
  return `M ${n2(s.x)} ${n2(s.y)} A ${n2(r * K)} ${n2(r * K)} 0 ${a1 - a0 > 180 ? 1 : 0} 0 ${n2(e.x)} ${n2(e.y)}`;
}

/** The short bold compass arc you would actually draw, centred on the point it passes through. */
function CompassArc({ S, c, r, through, cls }: { S: Mapper; c: Pt; r: number; through: Pt; cls: string }) {
  const phi = Math.atan2(through.y - c.y, through.x - c.x) / DEG;
  const half = clamp(0.9 / r / DEG, 10, 35);
  return <path d={arcD(S, c, r, phi - half, phi + half)} fill="none" className={cls} strokeWidth={2.25} strokeLinecap="round" />;
}

function RightMark({ S, at, u, v }: { S: Mapper; at: Pt; u: Pt; v: Pt }) {
  const s = 0.4;
  const a = S({ x: at.x + s * u.x, y: at.y + s * u.y });
  const b = S({ x: at.x + s * (u.x + v.x), y: at.y + s * (u.y + v.y) });
  const c = S({ x: at.x + s * v.x, y: at.y + s * v.y });
  return <path d={`M ${n2(a.x)} ${n2(a.y)} L ${n2(b.x)} ${n2(b.y)} L ${n2(c.x)} ${n2(c.y)}`} fill="none" className="stroke-ink" strokeWidth={1.5} />;
}

/** n small equal-length marks across the middle of segment ab. */
function Ticks({ S, a, b, n = 1 }: { S: Mapper; a: Pt; b: Pt; n?: number }) {
  const d = unit({ x: b.x - a.x, y: b.y - a.y });
  const nrm = { x: -d.y, y: d.x };
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const marks: ReactNode[] = [];
  for (let i = 0; i < n; i++) {
    const o = (i - (n - 1) / 2) * 0.18;
    const c = { x: m.x + o * d.x, y: m.y + o * d.y };
    marks.push(
      <Seg key={i} S={S} a={{ x: c.x - 0.22 * nrm.x, y: c.y - 0.22 * nrm.y }} b={{ x: c.x + 0.22 * nrm.x, y: c.y + 0.22 * nrm.y }} cls="stroke-ink" w={1.5} />,
    );
  }
  return <g>{marks}</g>;
}

/** Step-by-step list with a stepper. */
function StepPanel({ step, setStep, steps }: { step: number; setStep: (n: number) => void; steps: ReactNode[] }) {
  return (
    <div className="rounded-xl border border-line p-3">
      <Stepper label="Construction step" value={step} min={1} max={steps.length} onChange={setStep} format={(v) => `${v} / ${steps.length}`} />
      <ol className="mt-2 space-y-1 text-sm">
        {steps.map((s, i) => (
          <li
            key={i}
            className={`flex gap-2 ${i + 1 === step ? "font-semibold text-ink" : i + 1 < step ? "text-ink-2" : "text-ink-2 opacity-50"}`}
          >
            <span className="tabular-nums">{i + 1}.</span>
            <span>{s}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function TapTools({ hasX, onSnap, onClear, what }: { hasX: boolean; onSnap: () => void; onClear: () => void; what: string }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm text-ink-2">Tap the drawing to drop a test point X.</span>
      <button type="button" className="btn btn-secondary text-sm" onClick={onSnap}>
        Put X on the {what}
      </button>
      {hasX ? (
        <button type="button" className="btn btn-ghost text-sm" onClick={onClear}>
          Remove X
        </button>
      ) : null}
    </div>
  );
}

/* ---- 1a. Triangle from three sides (SSS) ---- */

function SSSMode({ picker }: { picker: ReactNode }) {
  const [c, setC] = useState(7); // AB, the base
  const [b, setB] = useState(5); // AC, compass radius from A
  const [a, setA] = useState(6); // BC, compass radius from B
  const [step, setStep] = useState(4);
  const ox = 180;
  const oy = 220;
  const S: Mapper = (p) => ({ x: ox + p.x * K, y: oy - p.y * K });

  const A = { x: -c / 2, y: 0 };
  const B = { x: c / 2, y: 0 };
  const sides = [
    { n: "AB", v: c },
    { n: "AC", v: b },
    { n: "BC", v: a },
  ].sort((p, q) => p.v - q.v);
  const [s1, s2, s3] = sides;
  // Lengths are multiples of 0.5 cm, so compare exactly in half-centimetres.
  const h1 = Math.round(2 * s1.v);
  const h2 = Math.round(2 * s2.v);
  const h3 = Math.round(2 * s3.v);
  const kind: "ok" | "flat" | "none" = h1 + h2 > h3 ? "ok" : h1 + h2 === h3 ? "flat" : "none";
  const xs = kind === "none" ? null : circleX(A, b, B, a);
  const C = xs ? (kind === "flat" ? { x: xs[0].x, y: 0 } : xs[0]) : null;
  const C2 = kind === "ok" && xs ? xs[1] : null;

  const angA = Math.acos(clamp((b * b + c * c - a * a) / (2 * b * c), -1, 1)) / DEG;
  const angB = Math.acos(clamp((a * a + c * c - b * b) / (2 * a * c), -1, 1)) / DEG;
  const angC = 180 - angA - angB;
  const sq = (v: number) => v * v;
  const right = kind === "ok" && sq(h1) + sq(h2) === sq(h3);
  const obtuse = kind === "ok" && sq(h1) + sq(h2) < sq(h3);
  const sideType = h1 === h3 ? "equilateral" : h1 === h2 || h2 === h3 ? "isosceles" : "scalene";
  const angleType = right ? "right-angled" : obtuse ? "obtuse-angled" : "acute-angled";

  const built = step >= 4 && kind === "ok" && C;
  // Keep the base length label clear of a C that has landed on the base.
  const baseLabelX = kind === "flat" && C && Math.abs(C.x) < 1.2 ? (C.x > 0 ? -1.6 : 1.6) : 0;
  const G = C ? { x: (A.x + B.x + C.x) / 3, y: (A.y + B.y + C.y) / 3 } : { x: 0, y: 1 };
  const sideLabel = (p: Pt, q: Pt, text: string) => {
    const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
    const d = unit({ x: m.x - G.x, y: m.y - G.y });
    return (
      <PLabel S={S} p={m} off={{ x: 0.6 * d.x, y: 0.6 * d.y }} cls="fill-ink-2" size={12}>
        {text}
      </PLabel>
    );
  };
  const angleLabel = (v: Pt, ang: number) => {
    const d = unit({ x: G.x - v.x, y: G.y - v.y });
    return (
      <PLabel S={S} p={v} off={{ x: 1.0 * d.x, y: 1.0 * d.y }} cls="fill-brand" size={11}>
        {`${Math.round(ang)}°`}
      </PLabel>
    );
  };

  const steps = [
    <>Rule the base AB = {fmt(c)} cm.</>,
    <>Open the compasses to AC = {fmt(b)} cm. Point on A, draw an arc.</>,
    <>Reset the compasses to BC = {fmt(a)} cm. Point on B, draw an arc to cross the first one.</>,
    <>Join A and B to the crossing point C. Leave your arcs showing — they are your working.</>,
  ];

  const aria = `Constructing a triangle: AB is ${fmt(c)} cm. An arc of radius ${fmt(b)} cm from A and an arc of radius ${fmt(a)} cm from B ${
    kind === "ok" ? "cross at C" : kind === "flat" ? "only touch, on the line AB" : "do not meet"
  }.`;

  let caption: ReactNode;
  if (kind === "ok") {
    caption = (
      <>
        The arc from A is every point {fmt(b)} cm from A; the arc from B is every point {fmt(a)} cm from B. C has to be on <em>both</em>, so it
        goes where they cross. They also cross below AB, but that triangle is just a mirror image (congruent), so three sides fix the triangle
        completely. The two shorter sides add to {fmt(s1.v + s2.v)} cm, more than the longest ({fmt(s3.v)} cm), so the arcs can reach each other.
        This one is {sideType === "scalene" ? "a" : "an"} <strong>{sideType}</strong>, <strong>{angleType}</strong> triangle.
        {right ? <> The right angle is opposite the longest side, {s3.n}.</> : null}
      </>
    );
  } else if (kind === "flat") {
    caption = (
      <>
        {s1.n} + {s2.n} = {fmt(s1.v)} + {fmt(s2.v)} = {fmt(s3.v)} cm, exactly the longest side {s3.n}. The arcs only <strong>touch</strong>, on the
        line itself, so C lands on the straight line and the &ldquo;triangle&rdquo; is flat. The two shorter sides must add to{" "}
        <strong>more than</strong> the longest — that&rsquo;s the <strong>triangle inequality</strong>.
      </>
    );
  } else {
    caption = (
      <>
        {s1.n} + {s2.n} = {fmt(s1.v)} + {fmt(s2.v)} = {fmt(s1.v + s2.v)} cm, which is <strong>less than</strong> {s3.n} = {fmt(s3.v)} cm. The two
        shorter sides can&rsquo;t reach each other, so the arcs never meet and no triangle exists. This is the <strong>triangle inequality</strong>:
        the two shorter sides must add to more than the longest.
      </>
    );
  }

  return (
    <WidgetFrame
      title="Compass constructions"
      tryThis={[
        "Set AC = 9 cm and BC = 3 cm. Predict which base lengths AB give a triangle, then test.",
        "Set AB = 8 cm and make AC = BC. What is the shortest length that works? What happens at exactly 4 cm?",
        "Build a 3-4-5 triangle (any side can be the base). Which angle is 90°?",
        "Make all three sides equal. What are the angles — and why must they be?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        {picker}
        <Paper ox={ox} oy={oy} label={aria}>
          {step >= 2 ? <Locus S={S} c={A} r={b} cls="stroke-brand" /> : null}
          {step >= 3 ? <Locus S={S} c={B} r={a} cls="stroke-accent" /> : null}
          {built && C ? (
            <polygon
              points={[A, B, C].map((p) => `${n2(S(p).x)},${n2(S(p).y)}`).join(" ")}
              className="fill-brand-soft"
              opacity={0.8}
            />
          ) : null}
          {step >= 2 && C ? <CompassArc S={S} c={A} r={b} through={C} cls="stroke-brand" /> : null}
          {step >= 3 && C ? <CompassArc S={S} c={B} r={a} through={C} cls="stroke-accent" /> : null}
          <Seg S={S} a={A} b={B} />
          {built && C ? (
            <>
              <Seg S={S} a={A} b={C} />
              <Seg S={S} a={B} b={C} />
              {sideLabel(A, C, `${fmt(b)} cm`)}
              {sideLabel(B, C, `${fmt(a)} cm`)}
              {angleLabel(A, angA)}
              {angleLabel(B, angB)}
              {angleLabel(C, angC)}
            </>
          ) : null}
          {step >= 4 && C2 ? (
            <>
              <Dot S={S} p={C2} hollow />
              <PLabel S={S} p={C2} off={{ x: 0.5, y: -0.4 }} cls="fill-ink-2" size={12}>
                C′
              </PLabel>
            </>
          ) : null}
          <Dot S={S} p={A} />
          <Dot S={S} p={B} />
          <PLabel S={S} p={A} off={{ x: -0.45, y: -0.6 }}>
            A
          </PLabel>
          <PLabel S={S} p={B} off={{ x: 0.45, y: -0.6 }}>
            B
          </PLabel>
          <PLabel S={S} p={{ x: baseLabelX, y: 0 }} off={{ x: 0, y: -0.75 }} cls="fill-ink-2" size={12}>
            {`${fmt(c)} cm`}
          </PLabel>
          {step >= 3 && C ? (
            <>
              <Dot S={S} p={C} cls={kind === "ok" ? "fill-ink" : "fill-bad"} />
              <PLabel S={S} p={C} off={{ x: 0, y: kind === "ok" ? 0.6 : 0.65 }} cls={kind === "ok" ? "fill-ink" : "fill-bad"}>
                {kind === "ok" ? "C" : "C?"}
              </PLabel>
            </>
          ) : null}
        </Paper>

        <StepPanel step={step} setStep={setStep} steps={steps} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Slider label="AB (base)" value={c} min={3} max={9} step={0.5} onChange={setC} format={(v) => `${fmt(v)} cm`} />
          <Slider label="AC (arc from A)" value={b} min={1} max={9} step={0.5} onChange={setB} format={(v) => `${fmt(v)} cm`} />
          <Slider label="BC (arc from B)" value={a} min={1} max={9} step={0.5} onChange={setA} format={(v) => `${fmt(v)} cm`} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="Two shorter" value={`${fmt(s1.v + s2.v)} cm`} tone="ink" />
          <Readout label={`Longest (${s3.n})`} value={`${fmt(s3.v)} cm`} tone="ink" />
          <Readout label="Triangle?" value={kind === "ok" ? "Yes" : kind === "flat" ? "Flat" : "No"} tone={kind === "ok" ? "good" : "bad"} />
        </div>
        {kind === "ok" ? (
          <p className="text-sm text-ink-2">
            Angles you would measure with a protractor (nearest degree): A ≈ {Math.round(angA)}°, B ≈ {Math.round(angB)}°, C ≈ {Math.round(angC)}°.
            Before rounding they add to exactly 180°.
          </p>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

/* ---- 1b. Perpendicular bisector ---- */

function PerpBisectorMode({ picker }: { picker: ReactNode }) {
  const [c, setC] = useState(6); // AB
  const [r, setR] = useState(5); // compass radius
  const [step, setStep] = useState(3);
  const [X, setX] = useState<Pt | null>(null);
  const ox = 180;
  const oy = 140;
  const S: Mapper = (p) => ({ x: ox + p.x * K, y: oy - p.y * K });

  const half = c / 2;
  const A = { x: -half, y: 0 };
  const B = { x: half, y: 0 };
  const Mid = { x: 0, y: 0 };
  // Compare 2r with AB exactly (both are multiples of 0.5).
  const cmp = Math.sign(Math.round(4 * r) - Math.round(2 * c));
  const hh = cmp > 0 ? Math.sqrt(r * r - half * half) : 0;
  const P = cmp > 0 ? { x: 0, y: hh } : null;
  const Q = cmp > 0 ? { x: 0, y: -hh } : null;
  const built = step >= 3 && P !== null && Q !== null;

  const xa = X ? Math.hypot(X.x - A.x, X.y - A.y) : 0;
  const xb = X ? Math.hypot(X.x - B.x, X.y - B.y) : 0;
  const exact = X ? Math.abs(X.x) < 1e-9 : false;
  const sameTo1dp = X ? fmt(xa) === fmt(xb) : false;
  const xTone = !X ? "fill-ink" : sameTo1dp ? "fill-good" : xa < xb ? "fill-brand" : "fill-accent";

  const steps = [
    <>
      Open the compasses to <strong>more than half of AB</strong> (here {fmt(r)} cm{cmp > 0 ? "" : ", which is not more than half, so too small"}). Point
      on A, draw arcs above and below the line.
    </>,
    <>Keep the same radius. Point on B, draw arcs that cross the first two at P and Q.</>,
    <>Rule the straight line through P and Q. It cuts AB at its midpoint M, at right angles.</>,
  ];

  const aria = `Perpendicular bisector of AB, which is ${fmt(c)} cm. Arcs of radius ${fmt(r)} cm from A and from B ${
    cmp > 0 ? "cross at P and Q; the line PQ meets AB at its midpoint M at 90 degrees" : cmp === 0 ? "only touch at the midpoint" : "do not meet"
  }.${X ? ` Test point X is ${fmt(xa)} cm from A and ${fmt(xb)} cm from B.` : ""}`;

  let xLine: ReactNode = null;
  if (X) {
    xLine = exact ? (
      <> X is on the bisector, so XA = XB exactly ({fmt(xa)} cm): every point on this line is equidistant from A and B.</>
    ) : sameTo1dp ? (
      <> XA and XB are equal to 1 d.p., so X is almost exactly on the bisector.</>
    ) : (
      <>
        {" "}
        X is closer to {xa < xb ? "A" : "B"} ({fmt(Math.min(xa, xb))} cm against {fmt(Math.max(xa, xb))} cm) — it is on {xa < xb ? "A" : "B"}
        &rsquo;s side of the line. The bisector is the border between &ldquo;closer to A&rdquo; and &ldquo;closer to B&rdquo;.
      </>
    );
  }

  let caption: ReactNode;
  if (cmp < 0) {
    caption = (
      <>
        The arcs don&rsquo;t cross. Each reaches only {fmt(r)} cm, but they need to meet beyond the middle of AB, which is {fmt(half, 2)} cm from
        each end. Open the compasses to more than <M>{"1/2"}</M> of AB.{xLine}
      </>
    );
  } else if (cmp === 0) {
    caption = (
      <>
        A radius of exactly half of AB ({fmt(half, 2)} cm): the arcs just touch, at the midpoint. One point is not enough to rule a line — open the
        compasses a little wider.{xLine}
      </>
    );
  } else {
    caption = (
      <>
        P is {fmt(r)} cm from A <em>and</em> {fmt(r)} cm from B, and so is Q. All the points that are the same distance from A and B lie on one
        straight line, so ruling through P and Q finds it. Why is it at 90° through the middle? APBQ has four sides of {fmt(r)} cm — a{" "}
        <strong>rhombus</strong> — and the diagonals of a rhombus cut each other in half at right angles. Change r: P and Q slide, but the line
        stays put.{xLine}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Compass constructions"
      tryThis={[
        "Shrink the compass radius. What is the smallest radius whose arcs still cross — and why that number?",
        "Change r but not AB. P and Q move, but does the bisector?",
        "Press “Put X on the bisector”, then compare XA and XB. Now tap somewhere else.",
        "Where would you build a bus stop that is the same distance from two HDB blocks at A and B?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        {picker}
        <Paper ox={ox} oy={oy} label={aria} onTap={setX}>
          {X ? (
            <>
              <rect x={0} y={0} width={ox} height={CH} className="fill-brand-soft" opacity={0.55} />
              <rect x={ox} y={0} width={CW - ox} height={CH} className="fill-accent-soft" opacity={0.55} />
              <Tag x={8} y={14} anchor="start" size={11} cls="fill-brand">
                closer to A
              </Tag>
              <Tag x={CW - 8} y={14} anchor="end" size={11} cls="fill-accent">
                closer to B
              </Tag>
            </>
          ) : null}
          {step >= 1 ? <Locus S={S} c={A} r={r} cls="stroke-brand" /> : null}
          {step >= 2 ? <Locus S={S} c={B} r={r} cls="stroke-accent" /> : null}
          {step >= 1 && P && Q ? (
            <>
              <CompassArc S={S} c={A} r={r} through={P} cls="stroke-brand" />
              <CompassArc S={S} c={A} r={r} through={Q} cls="stroke-brand" />
            </>
          ) : null}
          {step >= 2 && P && Q ? (
            <>
              <CompassArc S={S} c={B} r={r} through={P} cls="stroke-accent" />
              <CompassArc S={S} c={B} r={r} through={Q} cls="stroke-accent" />
            </>
          ) : null}
          {built && P && Q ? (
            <>
              <path
                d={[A, P, B, Q].map((p, i) => `${i ? "L" : "M"} ${n2(S(p).x)} ${n2(S(p).y)}`).join(" ") + " Z"}
                fill="none"
                className="stroke-ink-2"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <FullLine S={S} p={Mid} d={{ x: 0, y: 1 }} />
            </>
          ) : null}
          <Seg S={S} a={A} b={B} />
          {built ? (
            <>
              <Ticks S={S} a={A} b={Mid} n={1} />
              <Ticks S={S} a={Mid} b={B} n={1} />
              <RightMark S={S} at={Mid} u={{ x: 1, y: 0 }} v={{ x: 0, y: 1 }} />
              <Dot S={S} p={Mid} r={3} />
              <PLabel S={S} p={Mid} off={{ x: -0.45, y: -0.5 }}>
                M
              </PLabel>
            </>
          ) : null}
          {step >= 2 && cmp === 0 ? <Dot S={S} p={Mid} cls="fill-bad" /> : null}
          {step >= 2 && P && Q ? (
            <>
              <Dot S={S} p={P} />
              <Dot S={S} p={Q} />
              <PLabel S={S} p={P} off={{ x: 0.5, y: hh > 6.2 ? -0.4 : 0.45 }}>
                P
              </PLabel>
              <PLabel S={S} p={Q} off={{ x: 0.5, y: hh > 6.2 ? 0.4 : -0.45 }}>
                Q
              </PLabel>
            </>
          ) : null}
          <Dot S={S} p={A} />
          <Dot S={S} p={B} />
          <PLabel S={S} p={A} off={{ x: -0.5, y: -0.5 }}>
            A
          </PLabel>
          <PLabel S={S} p={B} off={{ x: 0.5, y: -0.5 }}>
            B
          </PLabel>
          {X ? (
            <>
              <Seg S={S} a={X} b={A} cls="stroke-brand" w={1.5} dash="5 4" />
              <Seg S={S} a={X} b={B} cls="stroke-accent" w={1.5} dash="5 4" />
              <PLabel S={S} p={{ x: (X.x + A.x) / 2, y: (X.y + A.y) / 2 }} off={{ x: 0, y: 0.35 }} cls="fill-brand" size={11}>
                {`${fmt(xa)} cm`}
              </PLabel>
              <PLabel S={S} p={{ x: (X.x + B.x) / 2, y: (X.y + B.y) / 2 }} off={{ x: 0, y: 0.35 }} cls="fill-accent" size={11}>
                {`${fmt(xb)} cm`}
              </PLabel>
              <Dot S={S} p={X} cls={xTone} r={4.5} />
              <PLabel S={S} p={X} off={{ x: 0, y: 0.55 }} cls={xTone}>
                X
              </PLabel>
            </>
          ) : null}
        </Paper>

        <TapTools hasX={!!X} what="bisector" onSnap={() => setX({ x: 0, y: X ? X.y : 3 })} onClear={() => setX(null)} />

        <StepPanel step={step} setStep={setStep} steps={steps} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Slider label="AB" value={c} min={4} max={9} step={0.5} onChange={setC} format={(v) => `${fmt(v)} cm`} />
          <Slider label="Compass radius r" value={r} min={1} max={7} step={0.5} onChange={setR} format={(v) => `${fmt(v)} cm`} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="AM" value={built ? `${fmt(half, 2)} cm` : "—"} tone="ink" />
          <Readout label="MB" value={built ? `${fmt(half, 2)} cm` : "—"} tone="ink" />
          <Readout label="Angle at M" value={built ? "90°" : "—"} tone={built ? "good" : "ink"} />
          <Readout label="Arcs cross?" value={cmp > 0 ? "Yes" : cmp === 0 ? "Touch" : "No"} tone={cmp > 0 ? "good" : "bad"} />
          {X ? (
            <>
              <Readout label="XA" value={`${fmt(xa)} cm`} tone="brand" />
              <Readout label="XB" value={`${fmt(xb)} cm`} tone="ink" />
            </>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ---- 1c. Angle bisector ---- */

function AngleBisectorMode({ picker }: { picker: ReactNode }) {
  const [th, setTh] = useState(70);
  const [r1, setR1] = useState(4);
  const [r2, setR2] = useState(3.5);
  const [step, setStep] = useState(3);
  const [X, setX] = useState<Pt | null>(null);
  // Slide O left for acute angles (R can be up to ~14 cm out along the bisector) and
  // right for obtuse ones (arm OB points left), so the whole construction stays on the paper.
  const ox = Math.round(clamp(20 - 9 * K * Math.cos(th * DEG), 50, 165));
  const oy = 245;
  const S: Mapper = (p) => ({ x: ox + p.x * K, y: oy - p.y * K });

  const O = { x: 0, y: 0 };
  const u = { x: Math.cos(th * DEG), y: Math.sin(th * DEG) }; // direction of arm OB
  const w = { x: Math.cos((th / 2) * DEG), y: Math.sin((th / 2) * DEG) }; // bisector direction
  const armA = { x: 9, y: 0 };
  const armB = { x: 9 * u.x, y: 9 * u.y };
  const P = { x: r1, y: 0 };
  const Q = { x: r1 * u.x, y: r1 * u.y };
  const halfPQ = r1 * Math.sin((th / 2) * DEG);
  const gap = r2 - halfPQ;
  const rk: "ok" | "touch" | "none" = gap > 1e-9 ? "ok" : gap > -1e-9 ? "touch" : "none";
  const dR = rk === "none" ? 0 : r1 * Math.cos((th / 2) * DEG) + Math.sqrt(Math.max(0, r2 * r2 - halfPQ * halfPQ));
  const R = { x: dR * w.x, y: dR * w.y };
  const built = step >= 3 && rk === "ok";
  const halfText = `${fmt(th / 2)}°`;

  // Test point: perpendicular distances to the two arm lines.
  const d1 = X ? Math.abs(X.y) : 0;
  const d2 = X ? Math.abs(X.x * u.y - X.y * u.x) : 0;
  const F1 = X ? { x: X.x, y: 0 } : O;
  const t2 = X ? X.x * u.x + X.y * u.y : 0;
  const F2 = { x: t2 * u.x, y: t2 * u.y };
  const phi = X ? norm360(Math.atan2(X.y, X.x) / DEG) : 0;
  const inside = X ? Math.hypot(X.x, X.y) > 1e-9 && phi <= th + 1e-9 : false;
  const sameTo1dp = X ? fmt(d1) === fmt(d2) : false;
  const onBisector = inside && Math.abs(phi - th / 2) < 1e-6;
  const xTone = !X ? "fill-ink" : sameTo1dp ? "fill-good" : d1 < d2 ? "fill-brand" : "fill-accent";

  const steps = [
    <>Point on O, any radius (here {fmt(r1)} cm): draw an arc crossing both arms, at P and Q.</>,
    <>
      Point on P, then on Q, with the <strong>same</strong> radius (here {fmt(r2)} cm): draw two arcs that cross at R.
    </>,
    <>Rule the line from O through R. It splits the angle into two equal halves.</>,
  ];

  const aria = `Angle bisector of angle AOB, which is ${th} degrees. Arc from O of radius ${fmt(r1)} cm cuts the arms at P and Q. Arcs of radius ${fmt(
    r2,
  )} cm from P and Q ${rk === "ok" ? `cross at R; OR splits the angle into two angles of ${fmt(th / 2)} degrees` : rk === "touch" ? "just touch" : "do not meet"}.${
    X ? ` Test point X is ${fmt(d1)} cm from line OA and ${fmt(d2)} cm from line OB.` : ""
  }`;

  let xLine: ReactNode = null;
  if (X) {
    xLine =
      sameTo1dp && inside ? (
        <>
          {" "}
          {onBisector ? (
            <>
              X is {fmt(d1)} cm from <em>both</em> arms (measured along the perpendiculars, the shortest routes to each line), so it sits on the
              bisector. Every point on the bisector is equidistant from the two arms.
            </>
          ) : (
            <>
              X&rsquo;s distances to the two arms are equal to 1 d.p. ({fmt(d1)} cm), so X is almost exactly on the bisector. Every point on the
              bisector is equidistant from the two arms.
            </>
          )}
        </>
      ) : sameTo1dp ? (
        <> X is the same distance (to 1 d.p.) from both arm lines, but it is outside angle AOB — it is on the bisector of one of the other angles the two lines make.</>
      ) : (
        <>
          {" "}
          X is closer to line {d1 < d2 ? "OA" : "OB"} ({fmt(Math.min(d1, d2))} cm against {fmt(Math.max(d1, d2))} cm). Distances to a line are
          measured along the perpendicular, the shortest route.
        </>
      );
  }

  let caption: ReactNode;
  if (rk === "none") {
    caption = (
      <>
        The arcs from P and Q don&rsquo;t meet: P and Q are {approx(2 * halfPQ, 2)} cm apart, so each arc must reach more than half of that (
        {approx(halfPQ, 2)} cm). Make the second radius bigger.{xLine}
      </>
    );
  } else if (rk === "touch") {
    caption = (
      <>
        The arcs from P and Q only just touch, halfway between P and Q. In theory that point is on the bisector, but a touching point is too hard to
        see accurately — open the compasses wider.{xLine}
      </>
    );
  } else {
    caption = (
      <>
        Why does it work? OP = OQ (same first arc), PR = QR (same second radius) and OR is shared, so triangles OPR and OQR are{" "}
        <strong>congruent</strong> (SSS). Matching angles are equal, so OR splits the {th}° angle into {halfText} + {halfText}. The radii don&rsquo;t
        matter — try changing them: R moves along the same line.{xLine}
      </>
    );
  }

  const snap = () => {
    const t = X ? Math.max(1.5, X.x * w.x + X.y * w.y) : 5;
    setX({ x: t * w.x, y: t * w.y });
  };

  return (
    <WidgetFrame
      title="Compass constructions"
      tryThis={[
        "Change the first radius. Does the bisector move?",
        "Make the second radius too small. What goes wrong — and what is the smallest radius that works?",
        "Press “Put X on the bisector” and compare its distances to the two arms. Then tap a point near one arm.",
        "Bisect a 90° angle. Which special angle have you constructed?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        {picker}
        <Paper ox={ox} oy={oy} label={aria} onTap={setX}>
          {X ? (
            <>
              <FullLine S={S} p={O} d={{ x: 1, y: 0 }} cls="stroke-ink-2" w={1} dash="2 4" />
              <FullLine S={S} p={O} d={u} cls="stroke-ink-2" w={1} dash="2 4" />
            </>
          ) : null}
          {step >= 1 ? <Locus S={S} c={O} r={r1} cls="stroke-brand" /> : null}
          {step >= 2 ? (
            <>
              <Locus S={S} c={P} r={r2} cls="stroke-accent" />
              <Locus S={S} c={Q} r={r2} cls="stroke-accent" />
            </>
          ) : null}
          {step >= 1 ? <path d={arcD(S, O, r1, -10, th + 10)} fill="none" className="stroke-brand" strokeWidth={2.25} strokeLinecap="round" /> : null}
          {step >= 2 && rk !== "none" ? (
            <>
              <CompassArc S={S} c={P} r={r2} through={R} cls="stroke-accent" />
              <CompassArc S={S} c={Q} r={r2} through={R} cls="stroke-accent" />
            </>
          ) : null}
          {built ? (
            <>
              <path
                d={[O, P, R, Q].map((p, i) => `${i ? "L" : "M"} ${n2(S(p).x)} ${n2(S(p).y)}`).join(" ") + " Z"}
                fill="none"
                className="stroke-ink-2"
                strokeWidth={1}
                strokeDasharray="4 3"
              />
              <Seg S={S} a={O} b={{ x: 20 * w.x, y: 20 * w.y }} cls="stroke-good" />
              <Ticks S={S} a={P} b={R} n={2} />
              <Ticks S={S} a={Q} b={R} n={2} />
              <path d={arcD(S, O, 1.6, 0, th / 2)} fill="none" className="stroke-good" strokeWidth={1.75} />
              <path d={arcD(S, O, 1.8, th / 2, th)} fill="none" className="stroke-good" strokeWidth={1.75} />
              <PLabel S={S} p={O} off={{ x: 2.5 * Math.cos((th / 4) * DEG), y: 2.5 * Math.sin((th / 4) * DEG) }} cls="fill-good" size={11}>
                {halfText}
              </PLabel>
              <PLabel S={S} p={O} off={{ x: 2.7 * Math.cos(((3 * th) / 4) * DEG), y: 2.7 * Math.sin(((3 * th) / 4) * DEG) }} cls="fill-good" size={11}>
                {halfText}
              </PLabel>
            </>
          ) : (
            <>
              <path d={arcD(S, O, 1.1, 0, th)} fill="none" className="stroke-ink-2" strokeWidth={1.5} />
              <PLabel S={S} p={O} off={{ x: 1.75 * w.x, y: 1.75 * w.y }} cls="fill-ink-2" size={11}>
                {`${th}°`}
              </PLabel>
            </>
          )}
          <Seg S={S} a={O} b={armA} />
          <Seg S={S} a={O} b={armB} />
          {step >= 1 ? (
            <>
              <Ticks S={S} a={O} b={P} n={1} />
              <Ticks S={S} a={O} b={Q} n={1} />
              <Dot S={S} p={P} />
              <Dot S={S} p={Q} />
              <PLabel S={S} p={P} off={{ x: 0, y: -0.6 }}>
                P
              </PLabel>
              <PLabel S={S} p={Q} off={{ x: -0.55 * u.y, y: 0.55 * u.x }}>
                Q
              </PLabel>
            </>
          ) : null}
          {step >= 2 && rk !== "none" ? (
            <>
              <Dot S={S} p={R} cls={rk === "ok" ? "fill-ink" : "fill-bad"} />
              <PLabel S={S} p={R} off={{ x: 0.5 * w.y, y: -0.5 * w.x }}>
                R
              </PLabel>
            </>
          ) : null}
          <Dot S={S} p={O} />
          <PLabel S={S} p={O} off={{ x: -0.1, y: -0.6 }}>
            O
          </PLabel>
          <PLabel S={S} p={armA} off={{ x: -0.2, y: -0.6 }}>
            A
          </PLabel>
          <PLabel S={S} p={{ x: 8.3 * u.x, y: 8.3 * u.y }} off={{ x: -0.6 * u.y, y: 0.6 * u.x }}>
            B
          </PLabel>
          {X ? (
            <>
              <Seg S={S} a={X} b={F1} cls="stroke-brand" w={1.75} dash="5 4" />
              <Seg S={S} a={X} b={F2} cls="stroke-accent" w={1.75} dash="5 4" />
              {d1 > 0.45 ? <RightMark S={S} at={F1} u={{ x: 1, y: 0 }} v={{ x: 0, y: X.y > 0 ? 1 : -1 }} /> : null}
              {d2 > 0.45 ? <RightMark S={S} at={F2} u={u} v={unit({ x: X.x - F2.x, y: X.y - F2.y })} /> : null}
              <Dot S={S} p={X} cls={xTone} r={4.5} />
              <PLabel S={S} p={X} off={{ x: 0.45, y: 0.45 }} cls={xTone}>
                X
              </PLabel>
            </>
          ) : null}
        </Paper>

        <TapTools hasX={!!X} what="bisector" onSnap={snap} onClear={() => setX(null)} />

        <StepPanel step={step} setStep={setStep} steps={steps} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <NudgeSlider name="Angle AOB" label="Angle AOB" value={th} min={20} max={150} onChange={setTh} format={(v) => `${v}°`} />
          <Slider label="First radius (O to P, Q)" value={r1} min={2} max={6} step={0.5} onChange={setR1} format={(v) => `${fmt(v)} cm`} />
          <Slider label="Second radius (P, Q to R)" value={r2} min={1} max={8} step={0.5} onChange={setR2} format={(v) => `${fmt(v)} cm`} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="∠AOB" value={`${th}°`} tone="ink" />
          <Readout label="∠AOR" value={built ? halfText : "—"} tone={built ? "good" : "ink"} />
          <Readout label="∠ROB" value={built ? halfText : "—"} tone={built ? "good" : "ink"} />
          <Readout label="Arcs meet?" value={rk === "ok" ? "Yes" : rk === "touch" ? "Touch" : "No"} tone={rk === "ok" ? "good" : "bad"} />
          {X ? (
            <>
              <Readout label="X to line OA" value={`${fmt(d1)} cm`} tone="brand" />
              <Readout label="X to line OB" value={`${fmt(d2)} cm`} tone="ink" />
            </>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ---- 1d. Perpendicular from a point to a line ---- */

function DropPerpMode({ picker }: { picker: ReactNode }) {
  const [h, setH] = useState(3); // distance of P from the line
  const [r, setR] = useState(5); // compass radius (kept the same throughout)
  const [t, setT] = useState(2.5); // position of T along the line
  const [step, setStep] = useState(3);
  const ox = 180;
  const oy = 150;
  const S: Mapper = (p) => ({ x: ox + p.x * K, y: oy - p.y * K });

  const P = { x: 0, y: h };
  const F = { x: 0, y: 0 };
  const P2 = { x: 0, y: -h };
  const cmp = Math.sign(Math.round(2 * r) - Math.round(2 * h));
  const wv = cmp > 0 ? Math.sqrt(r * r - h * h) : 0;
  const A = { x: -wv, y: 0 };
  const B = { x: wv, y: 0 };
  const T = { x: t, y: 0 };
  const PT = Math.hypot(t, h);
  const built = step >= 3 && cmp > 0;

  const steps = [
    <>
      Point on P: draw an arc (here radius {fmt(r)} cm{cmp > 0 ? "" : ", which is too small"}) that crosses the line twice, at A and B.
    </>,
    <>Keep the same radius. Point on A, then on B: draw arcs on the other side of the line. They cross at P′.</>,
    <>Rule the line from P to P′. It meets the line at F, at 90°. PF is the shortest distance from P to the line.</>,
  ];

  const aria = `Perpendicular from point P to a line. P is ${fmt(h)} cm from the line. ${
    cmp > 0 ? `An arc of radius ${fmt(r)} cm from P cuts the line at A and B; arcs from A and B meet at P prime, and PP prime meets the line at F at 90 degrees.` : "The arc from P does not cross the line twice."
  } Point T on the line is ${fmt(PT)} cm from P.`;

  let caption: ReactNode;
  if (cmp < 0) {
    caption = (
      <>
        An arc of radius {fmt(r)} cm from P can&rsquo;t reach the line, which is {fmt(h)} cm away. Open the compasses wider than the distance from P to
        the line.
      </>
    );
  } else if (cmp === 0) {
    caption = (
      <>
        A radius of exactly {fmt(h)} cm only <strong>touches</strong> the line, at one point (which is F!). You need two crossing points, A and B, so
        open the compasses a little wider.
      </>
    );
  } else {
    caption = (
      <>
        A and B are both {fmt(r)} cm from P. With the compasses unchanged, the arcs from A and B meet at P again and at P′, the{" "}
        <strong>mirror image</strong> of P in the line — so PP′ crosses the line at right angles. PF = {fmt(h)} cm is the{" "}
        <strong>shortest distance</strong> from P to the line:{" "}
        {Math.abs(t) < 1e-9 ? (
          <>T is at F right now, so PT = PF.</>
        ) : (
          <>
            any other route, like PT ({approx(PT)} cm), is the hypotenuse of right-angled triangle PFT, so it is longer.
          </>
        )}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Compass constructions"
      tryThis={[
        "Slide T along the line. Where is PT shortest? Predict before you look.",
        "Make the first arc too small to reach the line. What happens at exactly the distance PF?",
        "Why does P′ always end up exactly as far below the line as P is above it?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        {picker}
        <Paper ox={ox} oy={oy} label={aria}>
          {step >= 1 ? <Locus S={S} c={P} r={r} cls="stroke-brand" /> : null}
          {step >= 2 && cmp > 0 ? (
            <>
              <Locus S={S} c={A} r={r} cls="stroke-accent" />
              <Locus S={S} c={B} r={r} cls="stroke-accent" />
            </>
          ) : null}
          {Math.abs(t) > 1e-9 ? (
            <polygon points={[P, F, T].map((p) => `${n2(S(p).x)},${n2(S(p).y)}`).join(" ")} className="fill-warn-soft" opacity={0.9} />
          ) : null}
          <FullLine S={S} p={F} d={{ x: 1, y: 0 }} cls="stroke-ink" w={2.5} />
          <PLabel S={S} p={{ x: t >= 0 ? -8.2 : 8.2, y: 0 }} off={{ x: 0, y: -0.5 }} cls="fill-ink-2" size={13}>
            line
          </PLabel>
          {step >= 1 && cmp > 0 ? (
            <>
              <CompassArc S={S} c={P} r={r} through={A} cls="stroke-brand" />
              <CompassArc S={S} c={P} r={r} through={B} cls="stroke-brand" />
            </>
          ) : null}
          {step >= 2 && cmp > 0 ? (
            <>
              <CompassArc S={S} c={A} r={r} through={P2} cls="stroke-accent" />
              <CompassArc S={S} c={B} r={r} through={P2} cls="stroke-accent" />
            </>
          ) : null}
          {built ? (
            <>
              <Seg S={S} a={{ x: 0, y: h + 1.2 }} b={{ x: 0, y: -h - 1.2 }} cls="stroke-good" />
              <RightMark S={S} at={F} u={{ x: 1, y: 0 }} v={{ x: 0, y: 1 }} />
              <PLabel S={S} p={{ x: 0, y: h / 2 }} off={{ x: -0.85, y: 0 }} cls="fill-good" size={12}>
                {`${fmt(h)} cm`}
              </PLabel>
            </>
          ) : null}
          <Seg S={S} a={P} b={T} cls="stroke-bad" w={1.75} dash="5 4" />
          {step >= 1 && cmp > 0 ? (
            <>
              <Dot S={S} p={A} />
              <Dot S={S} p={B} />
              <PLabel S={S} p={A} off={{ x: -0.35, y: 0.5 }}>
                A
              </PLabel>
              <PLabel S={S} p={B} off={{ x: 0.35, y: 0.5 }}>
                B
              </PLabel>
            </>
          ) : null}
          {step >= 2 && cmp > 0 ? (
            <>
              <Dot S={S} p={P2} />
              <PLabel S={S} p={P2} off={{ x: 0.5, y: -0.3 }}>
                P′
              </PLabel>
            </>
          ) : null}
          {built ? (
            <PLabel S={S} p={F} off={{ x: -0.4, y: -0.5 }}>
              F
            </PLabel>
          ) : null}
          <Dot S={S} p={T} cls="fill-bad" r={4} />
          <PLabel S={S} p={T} off={{ x: t >= 0 ? 0.4 : -0.4, y: -0.55 }} cls="fill-bad">
            T
          </PLabel>
          <Dot S={S} p={P} />
          <PLabel S={S} p={P} off={{ x: 0.45, y: 0.4 }}>
            P
          </PLabel>
        </Paper>

        <StepPanel step={step} setStep={setStep} steps={steps} />

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Slider label="Distance of P from the line" value={h} min={1} max={5} step={0.5} onChange={setH} format={(v) => `${fmt(v)} cm`} />
          <Slider label="Compass radius" value={r} min={1} max={8} step={0.5} onChange={setR} format={(v) => `${fmt(v)} cm`} />
          <NudgeSlider name="Point T" label="Slide T along the line" value={t} min={-8} max={8} step={0.5} onChange={setT} format={(v) => `${fmt(v)} cm`} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="PF (perpendicular)" value={`${fmt(h)} cm`} tone="good" />
          <Readout label="PT" value={`${approx(PT)} cm`} tone={Math.abs(t) < 1e-9 ? "good" : "bad"} />
          <Readout label="Arc crosses line?" value={cmp > 0 ? "Twice" : cmp === 0 ? "Touches" : "No"} tone={cmp > 0 ? "good" : "bad"} />
        </div>
      </div>
    </WidgetFrame>
  );
}

type CMode = "sss" | "perp" | "angle" | "drop";

function Constructions() {
  const [mode, setMode] = useState<CMode>("sss");
  const picker = (
    <Segmented<CMode>
      label="Choose a construction"
      value={mode}
      onChange={setMode}
      options={[
        { value: "sss", label: "Triangle (SSS)" },
        { value: "perp", label: "Perpendicular bisector" },
        { value: "angle", label: "Angle bisector" },
        { value: "drop", label: "Perpendicular from a point" },
      ]}
    />
  );
  if (mode === "perp") return <PerpBisectorMode picker={picker} />;
  if (mode === "angle") return <AngleBisectorMode picker={picker} />;
  if (mode === "drop") return <DropPerpMode picker={picker} />;
  return <SSSMode picker={picker} />;
}

/* ------------------------------------------------------------------------ */
/* 2. Bearings navigator                                                      */
/* ------------------------------------------------------------------------ */

const MW = 360;
const MH = 300;
const KP = 24; // px per cm on the map

type ScaleKey = "1" | "2" | "5";
const SCALES: Record<ScaleKey, { s: number; label: string; ratio: string }> = {
  "1": { s: 1, label: "1 cm : 1 km", ratio: "1 : 100 000" },
  "2": { s: 2, label: "1 cm : 2 km", ratio: "1 : 200 000" },
  "5": { s: 5, label: "1 cm : 5 km", ratio: "1 : 500 000" },
};

/** Move d km from p on bearing b. x = East, y = North (km). */
const go = (p: Pt, b: number, d: number): Pt => ({ x: p.x + d * Math.sin(b * DEG), y: p.y + d * Math.cos(b * DEG) });
const bearingOf = (p: Pt, q: Pt) => norm360(Math.atan2(q.x - p.x, q.y - p.y) / DEG);

/** A point at bearing b, r px from c (screen coordinates). */
const bPt = (c: Pt, r: number, b: number): Pt => ({ x: c.x + r * Math.sin(b * DEG), y: c.y - r * Math.cos(b * DEG) });

/** Clockwise arc from bearing b0 to b1 (b1 ≥ b0), radius r px. */
function bArc(c: Pt, r: number, b0: number, b1: number): string {
  const span = b1 - b0;
  if (span < 0.5) return "";
  const s = bPt(c, r, b0);
  if (span >= 359.5) {
    const m = bPt(c, r, b0 + 180);
    return `M ${n2(s.x)} ${n2(s.y)} A ${r} ${r} 0 0 1 ${n2(m.x)} ${n2(m.y)} A ${r} ${r} 0 0 1 ${n2(s.x)} ${n2(s.y)}`;
  }
  const e = bPt(c, r, b1);
  return `M ${n2(s.x)} ${n2(s.y)} A ${r} ${r} 0 ${span > 180 ? 1 : 0} 1 ${n2(e.x)} ${n2(e.y)}`;
}

function bWedge(c: Pt, r: number, b0: number, b1: number): string {
  if (b1 - b0 < 0.5) return "";
  const s = bPt(c, r, b0);
  const e = bPt(c, r, b1);
  return `M ${n2(c.x)} ${n2(c.y)} L ${n2(s.x)} ${n2(s.y)} A ${r} ${r} 0 ${b1 - b0 > 180 ? 1 : 0} 1 ${n2(e.x)} ${n2(e.y)} Z`;
}

/** Bearing at which to label a clockwise arc of this span (kept clear of the North line). */
const arcMid = (span: number) => Math.max(span / 2, 16);

/** Where to put a point's label: away from the lines leaving it (given as bearings). */
function labelSpot(p: Pt, bearings: number[], dist = 15): Pt {
  let sx = 0;
  let sy = 0;
  for (const b of bearings) {
    sx += Math.sin(b * DEG);
    sy -= Math.cos(b * DEG);
  }
  const l = Math.hypot(sx, sy);
  if (l < 0.3) return { x: p.x - dist * 0.75, y: p.y + dist * 0.75 };
  return { x: p.x - (dist * sx) / l, y: p.y - (dist * sy) / l };
}

/**
 * Fit the drawing on the page (whole-cm shift, so the start stays on a grid corner).
 * `headroom` (px) leaves space above every point for its North arrow.
 */
function fitLayout(ptsKm: Pt[], s: number, headroom = 0) {
  const cm = ptsKm.map((p) => ({ x: p.x / s, y: p.y / s }));
  const minX = Math.min(...cm.map((p) => p.x));
  const maxX = Math.max(...cm.map((p) => p.x));
  const minY = Math.min(...cm.map((p) => p.y));
  const maxY = Math.max(...cm.map((p) => p.y));
  const ox = Math.round((MW / 2 - ((minX + maxX) / 2) * KP) / KP) * KP;
  const oy = Math.round((MH / 2 + ((minY + maxY + headroom / KP) / 2) * KP) / KP) * KP;
  const toPx = (p: Pt): Pt => ({ x: ox + (p.x / s) * KP, y: oy - (p.y / s) * KP });
  const fits = ptsKm.every((p) => {
    const q = toPx(p);
    return q.x >= 14 && q.x <= MW - 14 && q.y >= Math.max(24, headroom + 4) && q.y <= MH - 14;
  });
  const extent = Math.max(maxX - minX, maxY - minY);
  return { toPx, fits, extent };
}

function NorthArrow({ p, len = 36, south = false, parallel = false }: { p: Pt; len?: number; south?: boolean; parallel?: boolean }) {
  const top = p.y - len;
  const cy = p.y - len * 0.55;
  return (
    <g>
      <line x1={n2(p.x)} y1={n2(p.y)} x2={n2(p.x)} y2={n2(top + 6)} className="stroke-ink" strokeWidth={1.5} />
      <path d={`M ${n2(p.x)} ${n2(top)} L ${n2(p.x - 4.5)} ${n2(top + 9)} L ${n2(p.x + 4.5)} ${n2(top + 9)} Z`} className="fill-ink" />
      <Tag x={p.x - 7} y={top + 4} anchor="end" size={11}>
        N
      </Tag>
      {south ? <line x1={n2(p.x)} y1={n2(p.y)} x2={n2(p.x)} y2={n2(p.y + len * 0.9)} className="stroke-ink-2" strokeWidth={1.25} strokeDasharray="4 3" /> : null}
      {parallel ? (
        <path d={`M ${n2(p.x - 4)} ${n2(cy + 4)} L ${n2(p.x)} ${n2(cy)} L ${n2(p.x + 4)} ${n2(cy + 4)}`} fill="none" className="stroke-ink" strokeWidth={1.5} />
      ) : null}
    </g>
  );
}

function Leg({ a, b, bearing, cls, arrowCls, label }: { a: Pt; b: Pt; bearing: number; cls: string; arrowCls: string; label?: string }) {
  const m = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
  const len = Math.hypot(b.x - a.x, b.y - a.y);
  const tip = bPt(m, 6, bearing);
  const l1 = bPt(m, 6, bearing + 145);
  const l2 = bPt(m, 6, bearing - 145);
  const lab = bPt(m, 14, bearing + 90);
  return (
    <g>
      <line x1={n2(a.x)} y1={n2(a.y)} x2={n2(b.x)} y2={n2(b.y)} className={cls} strokeWidth={3} strokeLinecap="round" />
      {len > 20 ? <path d={`M ${n2(tip.x)} ${n2(tip.y)} L ${n2(l1.x)} ${n2(l1.y)} L ${n2(l2.x)} ${n2(l2.y)} Z`} className={arrowCls} /> : null}
      {label && len > 30 ? (
        <Tag x={lab.x} y={lab.y} size={11} cls="fill-ink-2">
          {label}
        </Tag>
      ) : null}
    </g>
  );
}

function MapPaper({ label, s, children }: { label: string; s: number; children: ReactNode }) {
  const xs: number[] = [];
  for (let x = 0; x <= MW; x += KP) xs.push(x);
  const ys: number[] = [];
  for (let y = 0; y <= MH; y += KP) ys.push(y);
  return (
    <svg viewBox={`0 0 ${MW} ${MH}`} className="h-auto w-full rounded-xl border border-line bg-surface" role="img" aria-label={label}>
      <rect x={0} y={0} width={MW} height={MH} className="fill-info-soft" opacity={0.45} />
      {xs.map((x) => (
        <line key={`gx${x}`} x1={x} x2={x} y1={0} y2={MH} className="stroke-line" strokeWidth={0.75} />
      ))}
      {ys.map((y) => (
        <line key={`gy${y}`} x1={0} x2={MW} y1={y} y2={y} className="stroke-line" strokeWidth={0.75} />
      ))}
      {children}
      {/* scale bar: 2 cm */}
      <rect x={6} y={MH - 34} width={84} height={28} rx={6} className="fill-surface" opacity={0.92} />
      <rect x={18} y={MH - 16} width={KP} height={5} className="fill-ink" />
      <rect x={18 + KP} y={MH - 16} width={KP} height={5} className="fill-surface stroke-ink" strokeWidth={1} />
      <text x={18} y={MH - 21} fontSize={9} textAnchor="middle" className="fill-ink-2">
        0
      </text>
      <text x={18 + KP} y={MH - 21} fontSize={9} textAnchor="middle" className="fill-ink-2">
        {s}
      </text>
      <text x={18 + 2 * KP} y={MH - 21} fontSize={9} textAnchor="middle" className="fill-ink-2">
        {`${2 * s} km`}
      </text>
    </svg>
  );
}

type BMode = "back" | "journey" | "island";

function BearingsNavigator() {
  const [mode, setMode] = useState<BMode>("back");
  const [scaleKey, setScaleKey] = useState<ScaleKey>("1");
  const [b1, setB1] = useState(60);
  const [d1, setD1] = useState(8);
  const [b2, setB2] = useState(150);
  const [d2, setD2] = useState(6);
  // island challenge
  const [target, setTarget] = useState({ b: 128, d: 7 });
  const [ib, setIb] = useState(90);
  const [idist, setIdist] = useState(4);
  const [sailed, setSailed] = useState(false);
  const [tries, setTries] = useState(0);
  const [reveal, setReveal] = useState(false);

  const { s, label: scaleLabel, ratio } = SCALES[scaleKey];
  const A: Pt = { x: 0, y: 0 };
  const B = go(A, b1, d1);
  const C = go(B, b2, d2);
  const T = go(A, target.b, target.d);
  const Bi = go(A, ib, idist);

  // In the island challenge, keep the protractor ring (radius 3.5 cm, labels to ~4.1 cm) on the page too.
  const ring = 4.1 * SCALES[scaleKey].s;
  const pts =
    mode === "back"
      ? [A, B]
      : mode === "journey"
        ? [A, B, C]
        : [A, T, { x: ring, y: 0 }, { x: -ring, y: 0 }, { x: 0, y: ring }, { x: 0, y: -ring }];
  const { toPx, fits, extent } = fitLayout(pts, s, mode === "back" ? 48 : mode === "journey" ? 38 : 0);
  const pA = toPx(A);
  const pB = toPx(B);
  const pC = toPx(C);
  const pT = toPx(T);
  const pBi = toPx(Bi);

  const mapLen = (km: number) => `${approx(km / s, 2)} cm`;

  // ---- bearing & back bearing ----
  const back = norm360(b1 + 180);
  const phi = b1 % 180;

  // ---- journey ----
  const AC = Math.hypot(C.x, C.y);
  const atStart = AC < 1e-6;
  const bAC = atStart ? 0 : bearingOf(A, C);
  // Work with the bearing as you would read it off a protractor (nearest degree), so
  // "bearing ± 180° = home" always adds up (359.6° reads as 000°, home as 180°).
  const bACr = norm360(Math.round(bAC));
  const home = norm360(bACr + 180);
  const turn = norm360(b2 - b1);
  const rightTurn = turn === 90 || turn === 270;

  // ---- island ----
  const miss = Math.hypot(Bi.x - T.x, Bi.y - T.y);
  const tol = 0.2 * s; // 2 mm on the map
  const landed = sailed && miss <= tol + 1e-9;
  const bErr = ((ib - target.b + 540) % 360) - 180; // + means too far clockwise
  const dErr = idist - target.d;

  const newIsland = () => {
    const nb = Math.floor(Math.random() * 360);
    const mapCm = 2.5 + Math.random() * 3;
    const nd = Math.max(1, Math.round(mapCm * s * 2) / 2);
    setTarget({ b: nb, d: nd });
    setSailed(false);
    setTries(0);
    setReveal(false);
  };
  const changePlan = (fn: () => void) => {
    fn();
    setSailed(false);
  };

  const scalePicker = (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-sm font-semibold text-ink-2">Map scale</span>
      <Segmented<ScaleKey>
        label="Map scale"
        value={scaleKey}
        onChange={setScaleKey}
        options={[
          { value: "1", label: "1 cm : 1 km" },
          { value: "2", label: "1 cm : 2 km" },
          { value: "5", label: "1 cm : 5 km" },
        ]}
      />
      <span className="text-xs text-ink-2">(ratio {ratio})</span>
    </div>
  );

  const fitNote =
    mode === "island" && !fits ? (
      <p className="rounded-lg bg-bad-soft px-3 py-2 text-sm font-semibold text-bad">
        At {scaleLabel} this island is off the edge of the page. Choose a scale with more km per cm, or press New island.
      </p>
    ) : mode !== "island" && !fits ? (
      <p className="rounded-lg bg-bad-soft px-3 py-2 text-sm font-semibold text-bad">
        At {scaleLabel} this drawing is too big for the page. Choose a scale with more km per cm.
      </p>
    ) : mode !== "island" && extent < 2.5 ? (
      <p className="rounded-lg bg-warn-soft px-3 py-2 text-sm text-ink">
        This drawing is tiny at {scaleLabel}. A scale with fewer km per cm would make it bigger and easier to measure accurately.
      </p>
    ) : null;

  let svg: ReactNode;
  let caption: ReactNode;
  let controls: ReactNode;
  let readouts: ReactNode;
  let tryThis: string[];

  if (mode === "back") {
    const zA: [number, number] = b1 < 180 ? [0, b1] : [180, b1];
    const zB: [number, number] = b1 < 180 ? [180, 180 + b1] : [0, b1 - 180];
    const aLab = bPt(pA, 50, arcMid(b1));
    const bLab = bPt(pB, 50, arcMid(back));
    const zALab = bPt(pA, 29, (zA[0] + zA[1]) / 2);
    const zBLab = bPt(pB, 29, (zB[0] + zB[1]) / 2);
    const la = labelSpot(pA, [b1]);
    const lb = labelSpot(pB, [back]);
    svg = (
      <MapPaper
        s={s}
        label={`Map at ${scaleLabel}. B is ${fmt(d1)} km from A on a bearing of ${three(b1)}. The bearing of A from B is ${three(back)}. The North lines at A and B are parallel.`}
      >
        <NorthArrow p={pA} len={46} south parallel />
        <NorthArrow p={pB} len={46} south parallel />
        {phi > 0 ? (
          <>
            <path d={bWedge(pA, 20, zA[0], zA[1])} className="fill-good-soft stroke-good" strokeWidth={1.25} />
            <path d={bWedge(pB, 20, zB[0], zB[1])} className="fill-good-soft stroke-good" strokeWidth={1.25} />
          </>
        ) : null}
        <path d={bArc(pA, 38, 0, b1)} fill="none" className="stroke-brand" strokeWidth={2} />
        <path d={bArc(pB, 38, 0, back)} fill="none" className="stroke-accent" strokeWidth={2} />
        <Leg a={pA} b={pB} bearing={b1} cls="stroke-brand" arrowCls="fill-brand" label={`${fmt(d1)} km`} />
        {phi > 0 ? (
          <>
            <Tag x={zALab.x} y={zALab.y} size={10} cls="fill-good">{`${phi}°`}</Tag>
            <Tag x={zBLab.x} y={zBLab.y} size={10} cls="fill-good">{`${phi}°`}</Tag>
          </>
        ) : null}
        <Tag x={aLab.x} y={aLab.y} size={12} cls="fill-brand">
          {three(b1)}
        </Tag>
        <Tag x={bLab.x} y={bLab.y} size={12} cls="fill-accent">
          {three(back)}
        </Tag>
        <circle cx={n2(pA.x)} cy={n2(pA.y)} r={4} className="fill-ink" />
        <circle cx={n2(pB.x)} cy={n2(pB.y)} r={4} className="fill-ink" />
        <Tag x={la.x} y={la.y}>
          A
        </Tag>
        <Tag x={lb.x} y={lb.y}>
          B
        </Tag>
      </MapPaper>
    );
    caption = (
      <>
        B is on a bearing of <strong>{three(b1)}</strong> from A: stand at A, face North, turn {b1}° clockwise. Coming back you face the opposite way,
        a half-turn, so the back bearing is {three(b1)} {b1 < 180 ? "+" : "−"} 180° = <strong>{three(back)}</strong>.{" "}
        {phi > 0 ? (
          <>
            Why exactly 180°? The North lines at A and B are <strong>parallel</strong>, so the two green angles are{" "}
            <strong>alternate angles</strong> and equal ({phi}°).{" "}
            {b1 < 180 ? (
              <>At B you turn 180° to face South, then the same {phi}° more.</>
            ) : (
              <>At A the route is {phi}° past South, so at B the way back is {phi}° past North.</>
            )}{" "}
          </>
        ) : (
          <>The route runs straight along the North–South line, so the way back is simply the opposite direction. </>
        )}
        On the map AB is {mapLen(d1)}; at {scaleLabel} that is {fmt(d1 / s, 2)} × {s} = {fmt(d1)} km. Changing the scale changes the size of the drawing,
        never the bearings.
      </>
    );
    controls = (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NudgeSlider name="Bearing of B from A" label="Bearing of B from A" value={b1} min={0} max={359} onChange={setB1} format={three} wrap />
        <NudgeSlider name="Distance AB" label="Distance AB" value={d1} min={0.5} max={30} step={0.5} onChange={setD1} format={(v) => `${fmt(v)} km`} />
      </div>
    );
    readouts = (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="B from A" value={three(b1)} />
        <Readout label="A from B" value={three(back)} tone="good" />
        <Readout label="Real distance" value={`${fmt(d1)} km`} tone="ink" />
        <Readout label="On the map" value={mapLen(d1)} tone="ink" />
      </div>
    );
    tryThis = [
      "Set a bearing of 070°. Predict the bearing back to A before you look.",
      "Which bearing from A gives a back bearing of 045°?",
      "Turn the bearing past 180°. Why does the rule switch from + 180° to − 180°?",
      "Change only the scale. Which numbers change, and which stay the same?",
    ];
  } else if (mode === "journey") {
    const la = labelSpot(pA, [b1, bAC]);
    const lb = labelSpot(pB, [norm360(b1 + 180), b2]);
    const lc = labelSpot(pC, [norm360(b2 + 180), home]);
    const aLab = bPt(pA, 44, arcMid(b1));
    const bLab = bPt(pB, 44, arcMid(b2));
    const cLab = bPt(pC, 40, arcMid(home));
    const mAC = { x: (pA.x + pC.x) / 2, y: (pA.y + pC.y) / 2 };
    const acLab = bPt(mAC, 14, bAC + 90);
    svg = (
      <MapPaper
        s={s}
        label={`Map at ${scaleLabel}. Leg 1: ${fmt(d1)} km on ${three(b1)} from A to B. Leg 2: ${fmt(d2)} km on ${three(b2)} from B to C. ${
          atStart ? "C is back at A." : `C is about ${fmt(AC)} km from A on a bearing of ${three(bAC)}; the bearing home is ${three(home)}.`
        }`}
      >
        <NorthArrow p={pA} />
        <NorthArrow p={pB} />
        {!atStart ? <NorthArrow p={pC} /> : null}
        <path d={bArc(pA, 30, 0, b1)} fill="none" className="stroke-brand" strokeWidth={2} />
        <path d={bArc(pB, 30, 0, b2)} fill="none" className="stroke-accent" strokeWidth={2} />
        {!atStart ? <path d={bArc(pC, 26, 0, home)} fill="none" className="stroke-good" strokeWidth={2} /> : null}
        {!atStart ? (
          <line x1={n2(pA.x)} y1={n2(pA.y)} x2={n2(pC.x)} y2={n2(pC.y)} className="stroke-good" strokeWidth={2} strokeDasharray="6 4" />
        ) : null}
        <Leg a={pA} b={pB} bearing={b1} cls="stroke-brand" arrowCls="fill-brand" label={`${fmt(d1)} km`} />
        <Leg a={pB} b={pC} bearing={b2} cls="stroke-accent" arrowCls="fill-accent" label={`${fmt(d2)} km`} />
        {!atStart && Math.hypot(pC.x - pA.x, pC.y - pA.y) > 40 ? (
          <Tag x={acLab.x} y={acLab.y} size={11} cls="fill-good">{`${approx(AC)} km`}</Tag>
        ) : null}
        <Tag x={aLab.x} y={aLab.y} size={11} cls="fill-brand">
          {three(b1)}
        </Tag>
        <Tag x={bLab.x} y={bLab.y} size={11} cls="fill-accent">
          {three(b2)}
        </Tag>
        {!atStart ? (
          <Tag x={cLab.x} y={cLab.y} size={11} cls="fill-good">
            {three(home)}
          </Tag>
        ) : null}
        <circle cx={n2(pA.x)} cy={n2(pA.y)} r={4} className="fill-ink" />
        <circle cx={n2(pB.x)} cy={n2(pB.y)} r={4} className="fill-ink" />
        <circle cx={n2(pC.x)} cy={n2(pC.y)} r={4} className="fill-ink" />
        <Tag x={la.x} y={la.y}>
          A
        </Tag>
        <Tag x={lb.x} y={lb.y}>
          B
        </Tag>
        {!atStart ? (
          <Tag x={lc.x} y={lc.y}>
            C
          </Tag>
        ) : null}
      </MapPaper>
    );
    caption = atStart ? (
      <>Leg 2 has brought you exactly back to A — it is leg 1 in reverse: the back bearing ({three(norm360(b1 + 180))}) and the same distance.</>
    ) : (
      <>
        Leg 1 takes you {fmt(d1)} km on {three(b1)} to B, then leg 2 goes {fmt(d2)} km on {three(b2)} to C. Every point gets its own North line,
        because a bearing is always measured from where you are <em>now</em>. On an accurate scale drawing you would measure AC with a ruler (
        {approx(AC / s)} cm), multiply by {s} for the real distance ({approx(AC)} km), and measure its bearing with a protractor: about{" "}
        <strong>{three(bACr)}</strong>. The way home is the back bearing: {three(bACr)} {bACr < 180 ? "+" : "−"} 180° ={" "}
        <strong>{three(home)}</strong>.
        {rightTurn ? (
          <>
            {" "}
            Here the legs meet at a right angle ({three(b1)} and {three(b2)} differ by 90°), so you can also find AC with Pythagoras:{" "}
            <M>{`sqrt(${fmt(d1)}^2 + ${fmt(d2)}^2)`}</M> {exactTo(AC, 2) ? "=" : "≈"} {fmt(AC, 2)} km.
          </>
        ) : null}
      </>
    );
    controls = (
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <NudgeSlider name="Leg 1 bearing" label="Leg 1 bearing (A to B)" value={b1} min={0} max={359} onChange={setB1} format={three} wrap />
        <NudgeSlider name="Leg 1 distance" label="Leg 1 distance" value={d1} min={0.5} max={30} step={0.5} onChange={setD1} format={(v) => `${fmt(v)} km`} />
        <NudgeSlider name="Leg 2 bearing" label="Leg 2 bearing (B to C)" value={b2} min={0} max={359} onChange={setB2} format={three} wrap />
        <NudgeSlider name="Leg 2 distance" label="Leg 2 distance" value={d2} min={0.5} max={30} step={0.5} onChange={setD2} format={(v) => `${fmt(v)} km`} />
      </div>
    );
    readouts = (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="C from A" value={atStart ? "—" : three(bAC)} />
        <Readout label="Distance AC" value={atStart ? "0 km" : `${approx(AC)} km`} tone="ink" />
        <Readout label="AC on the map" value={atStart ? "0 cm" : `${approx(AC / s)} cm`} tone="ink" />
        <Readout label="Home (C to A)" value={atStart ? "—" : three(home)} tone="good" />
      </div>
    );
    tryThis = [
      "Start with 8 km on 060°, then 6 km on 150°. Why is the trip home exactly 10 km?",
      "Plan a two-leg trip that ends due East of A, so C is on a bearing of 090°.",
      "Make leg 2 bring you exactly back to A. What must its bearing and distance be?",
      "Try 1 cm : 1 km with two long legs. Does your drawing still fit on the page?",
    ];
  } else {
    // island challenge
    const ringR = 84; // 3.5 cm
    const ticks: ReactNode[] = [];
    for (let b = 0; b < 360; b += 5) {
      const len = b % 30 === 0 ? 10 : b % 10 === 0 ? 6.5 : 3.5;
      const p1 = bPt(pA, ringR, b);
      const p2 = bPt(pA, ringR - len, b);
      ticks.push(<line key={`t${b}`} x1={n2(p1.x)} y1={n2(p1.y)} x2={n2(p2.x)} y2={n2(p2.y)} className="stroke-ink-2" strokeWidth={b % 30 === 0 ? 1.4 : 1} />);
      if (b % 30 === 0) {
        const lp = bPt(pA, ringR + 10, b);
        ticks.push(
          <text key={`l${b}`} x={n2(lp.x)} y={n2(lp.y)} fontSize={9} textAnchor="middle" dominantBaseline="middle" className="fill-ink-2">
            {String(b).padStart(3, "0")}
          </text>,
        );
      }
    }
    const tLab = { x: pT.x, y: pT.y + 17 };
    const revealLab = bPt(pA, 44, arcMid(target.b));
    svg = (
      <MapPaper
        s={s}
        label={`Map at ${scaleLabel} with a bearing ring of radius 3.5 cm around the harbour A, and an island to find.${
          sailed ? ` You sailed ${fmt(idist)} km on ${three(ib)} and ${landed ? "landed on the island" : `missed by about ${fmt(miss)} km`}.` : ""
        }${reveal ? ` The island is ${fmt(target.d)} km away on a bearing of ${three(target.b)}.` : ""}`}
      >
        <circle cx={n2(pA.x)} cy={n2(pA.y)} r={ringR} fill="none" className="stroke-ink-2" strokeWidth={1} />
        {ticks}
        <ellipse cx={n2(pT.x)} cy={n2(pT.y)} rx={11} ry={7.5} className="fill-good-soft stroke-good" strokeWidth={1.5} />
        <circle cx={n2(pT.x)} cy={n2(pT.y)} r={2} className="fill-good" />
        <Tag x={tLab.x} y={tLab.y} size={11} cls="fill-good">
          Island
        </Tag>
        <NorthArrow p={pA} len={30} />
        {reveal ? (
          <>
            <line x1={n2(pA.x)} y1={n2(pA.y)} x2={n2(pT.x)} y2={n2(pT.y)} className="stroke-good" strokeWidth={2} strokeDasharray="6 4" />
            <path d={bArc(pA, 32, 0, target.b)} fill="none" className="stroke-good" strokeWidth={2} />
            <Tag x={revealLab.x} y={revealLab.y} size={11} cls="fill-good">
              {three(target.b)}
            </Tag>
          </>
        ) : null}
        {sailed ? (
          <>
            {!landed ? (
              <line x1={n2(pBi.x)} y1={n2(pBi.y)} x2={n2(pT.x)} y2={n2(pT.y)} className="stroke-bad" strokeWidth={1.25} strokeDasharray="3 3" />
            ) : null}
            <Leg a={pA} b={pBi} bearing={ib} cls="stroke-brand" arrowCls="fill-brand" />
            <circle cx={n2(pBi.x)} cy={n2(pBi.y)} r={4.5} className={landed ? "fill-good" : "fill-brand"} />
          </>
        ) : null}
        <circle cx={n2(pA.x)} cy={n2(pA.y)} r={4} className="fill-ink" />
        <Tag x={pA.x - 10} y={pA.y + 14} anchor="end" size={12}>
          A
        </Tag>
      </MapPaper>
    );
    // Bearings are whole degrees and distances are multiples of 0.5 km, so these comparisons are exact.
    // A miss always has a non-zero error in at least one of them, so the advice is always something to act on.
    const bAdvice =
      bErr === 0
        ? "your bearing is spot on"
        : `turn ${bErr > 0 ? "anticlockwise" : "clockwise"} ${Math.abs(bErr) > 10 ? "a lot" : "a little"}`;
    const dAdvice = dErr === 0 ? "your distance is exactly right" : `go ${dErr > 0 ? "less far" : "further"}`;
    caption = landed ? (
      <>
        <strong>Landed{tries === 1 ? " first time" : ` in ${tries} tries`}!</strong> The island is on a bearing of {three(target.b)} and {fmt(target.d)}{" "}
        km away — {mapLen(target.d)} on a {scaleLabel} map. Press <strong>New island</strong> for another.
      </>
    ) : reveal ? (
      <>
        The island is on a bearing of <strong>{three(target.b)}</strong> (clockwise from North) and <strong>{fmt(target.d)} km</strong> away: on the
        map it is {mapLen(target.d)} from A, and {mapLen(target.d).replace(" cm", "")} × {s} = {fmt(target.d)} km. Set those values and sail to check.
      </>
    ) : sailed ? (
      <>
        Missed by {approx(miss)} km: {bAdvice}, and {dAdvice}. Re-measure from the map and try again.
      </>
    ) : (
      <>
        Nobody tells you where the island is — measure it. Read its bearing on the ring around A (clockwise from North; small ticks every 5°). For the
        distance, compare with the ring, whose radius is 3.5 cm, or count 1 cm grid squares, then use the scale: map cm × {s} = km. Set your course
        and press <strong>Sail</strong>. You land if you finish within 2 mm (on the map) of the island.
      </>
    );
    controls = (
      <div className="space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NudgeSlider name="Your bearing" label="Your bearing" value={ib} min={0} max={359} onChange={(v) => changePlan(() => setIb(v))} format={three} wrap />
          <NudgeSlider
            name="Your distance"
            label="Your distance"
            value={idist}
            min={0.5}
            max={30}
            step={0.5}
            onChange={(v) => changePlan(() => setIdist(v))}
            format={(v) => `${fmt(v)} km`}
          />
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              setSailed(true);
              setTries((n) => n + 1);
            }}
            disabled={sailed}
          >
            ⛵ Sail
          </button>
          <button type="button" className="btn btn-secondary" onClick={newIsland}>
            New island
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => setReveal(true)} disabled={reveal}>
            Show answer
          </button>
        </div>
      </div>
    );
    readouts = (
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label="Your bearing" value={three(ib)} />
        <Readout label="Your distance" value={`${fmt(idist)} km`} tone="ink" />
        <Readout label="On the map" value={mapLen(idist)} tone="ink" />
        <Readout label="Tries" value={tries} tone={landed ? "good" : "ink"} />
      </div>
    );
    tryThis = [
      "Estimate the island's bearing from the ring before you touch a slider.",
      "Use the scale: how many km is 1 cm on this map? How many is the ring's 3.5 cm radius?",
      "Land within 2 mm in as few tries as you can, then press New island.",
    ];
  }

  return (
    <WidgetFrame title="Bearings navigator" tryThis={tryThis} caption={caption}>
      <div className="space-y-4">
        <Segmented<BMode>
          label="Choose an activity"
          value={mode}
          onChange={setMode}
          options={[
            { value: "back", label: "There and back" },
            { value: "journey", label: "Two-leg journey" },
            { value: "island", label: "Find the island" },
          ]}
        />
        {scalePicker}
        {fitNote}
        {svg}
        {mode === "back" ? (
          <p className="-mt-2 text-xs text-ink-2">
            The arrow marks (^) show the two North lines are parallel. Dashed lines continue them to the South. Grid squares are 1 cm.
          </p>
        ) : (
          <p className="-mt-2 text-xs text-ink-2">Grid squares are 1 cm on the map ({scaleLabel}).</p>
        )}
        {controls}
        {readouts}
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "compass-constructions",
    title: "Compass constructions",
    blurb: "Build triangles, bisectors and perpendiculars step by step — and see why every arc lands where it does.",
    Component: Constructions,
  },
  {
    id: "bearings-navigator",
    title: "Bearings navigator",
    blurb: "Steer by three-figure bearings on a scale map: back bearings, two-leg journeys and a find-the-island challenge.",
    Component: BearingsNavigator,
  },
];
