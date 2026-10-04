"use client";
// Interactive explorables for "Collecting & Representing Data".
//  1. Scatter graph lab — four real-feeling data sets (positive, negative, no
//     correlation, and a "correlation is not causation" trap). Drag your own
//     line of best fit, compare it with the least-squares line, see the mean
//     point, an outlier's pull, and make predictions (interpolation vs
//     extrapolation, including impossible ones).
//  2. Chart studio — one frequency table drawn as a bar chart or a pie chart.
//     Truncate the bar chart's axis to watch it mislead; read pie chart angles
//     both ways, with a "mystery pie" to work backwards from.
import { useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Helpers                                                                    */
/* ------------------------------------------------------------------------ */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to `dp` places, drop trailing zeros, use a real minus sign. */
function fmt(v: number, dp = 2): string {
  let s = v.toFixed(dp);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  if (s === "-0") s = "0";
  return s.replace("-", "−");
}

/** Snap to the nearest multiple of `step` (and kill floating-point fuzz). */
function snapTo(v: number, step: number): number {
  return +(Math.round(v / step) * step).toFixed(6);
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const r = x % y;
    x = y;
    y = r;
  }
  return x || 1;
}

/** A slider with − / + buttons for fine control on touch screens. */
function NudgeSlider({
  name,
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
  format,
}: {
  name: string;
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (v: number) => void;
  format?: (v: number) => ReactNode;
}) {
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <Slider label={label} value={value} min={min} max={max} step={step} onChange={onChange} format={format} />
      </div>
      <button
        type="button"
        className="kbd h-10 min-w-10"
        onClick={() => onChange(Math.max(min, snapTo(value - step, step)))}
        disabled={value <= min}
        aria-label={`${name}: decrease`}
      >
        −
      </button>
      <button
        type="button"
        className="kbd h-10 min-w-10"
        onClick={() => onChange(Math.min(max, snapTo(value + step, step)))}
        disabled={value >= max}
        aria-label={`${name}: increase`}
      >
        +
      </button>
    </div>
  );
}

/** An on/off button (aria-pressed). */
function Toggle({ pressed, onClick, children }: { pressed: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={`btn btn-sm ${pressed ? "btn-primary" : "btn-secondary"}`}>
      {pressed ? "✓ " : ""}
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Scatter graph lab                                                       */
/* ------------------------------------------------------------------------ */

type Pt = [number, number];
type DsId = "revision" | "drinks" | "shoes" | "icecream";

interface Dataset {
  label: string;
  intro: string;
  xName: string;
  yName: string;
  /** Format an x or y value for sentences (with units). */
  fx: (v: number) => string;
  fy: (v: number) => string;
  xMin: number;
  xMax: number;
  xTick: number;
  yMin: number;
  yMax: number;
  yTick: number;
  /** Step for the line-end sliders / dragging. */
  ySnap: number;
  /** Step for the prediction slider. */
  xSnap: number;
  pts: Pt[];
  outlier?: { pt: Pt; why: string };
  /** Values outside these limits are impossible in context. */
  limits: { min?: number; max?: number; why: string };
  /** "pupils who revised for longer tended to score higher" */
  trend: string;
  cause?: ReactNode;
  predDefault: number;
}

const DATASETS: Record<DsId, Dataset> = {
  revision: {
    label: "Revision",
    intro: "13 pupils: hours spent revising for a maths test, and their test score.",
    xName: "Revision time (hours)",
    yName: "Test score (%)",
    fx: (v) => `${fmt(v, 1)} h`,
    fy: (v) => `${fmt(v, 0)}%`,
    xMin: 0,
    xMax: 14,
    xTick: 2,
    yMin: 0,
    yMax: 100,
    yTick: 20,
    ySnap: 1,
    xSnap: 0.5,
    pts: [
      [1, 32], [2, 41], [2, 35], [3, 48], [4, 46], [5, 55],
      [5, 61], [6, 58], [7, 70], [8, 68], [9, 79], [10, 84],
    ],
    outlier: { pt: [9, 30], why: "that pupil was ill on the day of the test" },
    limits: { min: 0, max: 100, why: "a test score can't be below 0% or above 100%" },
    trend: "pupils who revised for longer tended to score higher",
    predDefault: 12,
  },
  drinks: {
    label: "Hot drinks",
    intro: "14 days at a hawker stall: the day's maximum temperature, and how many hot drinks were sold.",
    xName: "Maximum temperature (°C)",
    yName: "Hot drinks sold",
    fx: (v) => `${fmt(v, 1)} °C`,
    fy: (v) => `${fmt(v, 0)} drinks`,
    xMin: 24,
    xMax: 40,
    xTick: 2,
    yMin: 0,
    yMax: 160,
    yTick: 40,
    ySnap: 1,
    xSnap: 0.5,
    pts: [
      [26, 140], [26, 124], [27, 146], [28, 108], [28, 130], [29, 96], [29, 120],
      [30, 110], [31, 78], [31, 100], [32, 86], [33, 58], [33, 80], [34, 64],
    ],
    limits: { min: 0, why: "a stall can't sell fewer than 0 drinks" },
    trend: "hotter days tended to have fewer hot drinks sold",
    predDefault: 38,
  },
  shoes: {
    label: "Shoe size",
    intro: "12 pupils: shoe size, and score in the same maths test.",
    xName: "Shoe size (UK)",
    yName: "Test score (%)",
    fx: (v) => `size ${fmt(v, 1)}`,
    fy: (v) => `${fmt(v, 0)}%`,
    xMin: 2,
    xMax: 10,
    xTick: 1,
    yMin: 0,
    yMax: 100,
    yTick: 20,
    ySnap: 1,
    xSnap: 0.5,
    pts: [
      [3, 72], [4, 45], [4, 88], [5, 60], [5, 34], [6, 79],
      [6, 52], [7, 66], [7, 41], [8, 85], [8, 57], [9, 48],
    ],
    limits: { min: 0, max: 100, why: "a test score can't be below 0% or above 100%" },
    trend: "knowing someone's shoe size tells you nothing about their maths score",
    predDefault: 6.5,
  },
  icecream: {
    label: "Ice cream",
    intro: "12 days at a beach kiosk on Sentosa: ice creams sold, and sunburn cases at the first-aid post.",
    xName: "Ice creams sold",
    yName: "Sunburn cases",
    fx: (v) => `${fmt(v, 0)} ice creams`,
    fy: (v) => `${fmt(v, 0)} cases`,
    xMin: 0,
    xMax: 200,
    xTick: 40,
    yMin: 0,
    yMax: 20,
    yTick: 5,
    ySnap: 0.5,
    xSnap: 5,
    pts: [
      [40, 2], [55, 4], [70, 3], [85, 6], [95, 7], [110, 8],
      [120, 7], [135, 11], [150, 12], [160, 11], [175, 15], [185, 14],
    ],
    limits: { min: 0, why: "there can't be fewer than 0 sunburn cases" },
    trend: "days with more ice creams sold tended to have more sunburn cases",
    cause: (
      <>
        But ice cream doesn&rsquo;t cause sunburn! Hot, sunny days make people buy ice cream <em>and</em> get sunburnt. That hidden{" "}
        <strong>third variable</strong> explains the link: <strong>correlation is not causation</strong>.
      </>
    ),
    predDefault: 20,
  },
};

interface Fit {
  n: number;
  mx: number;
  my: number;
  /** Least-squares line y = a + b x. */
  a: number;
  b: number;
  r: number;
}

function fitLine(pts: Pt[]): Fit {
  const n = pts.length;
  const mx = pts.reduce((s, p) => s + p[0], 0) / n;
  const my = pts.reduce((s, p) => s + p[1], 0) / n;
  let sxx = 0;
  let sxy = 0;
  let syy = 0;
  for (const [x, y] of pts) {
    sxx += (x - mx) ** 2;
    sxy += (x - mx) * (y - my);
    syy += (y - my) ** 2;
  }
  const b = sxx ? sxy / sxx : 0;
  return { n, mx, my, a: my - b * mx, b, r: sxx && syy ? sxy / Math.sqrt(sxx * syy) : 0 };
}

type Strength = "strong" | "moderate" | "weak" | "none";

function describe(r: number): { strength: Strength; label: string; short: string } {
  const a = Math.abs(r);
  const dir = r > 0 ? "positive" : "negative";
  if (a >= 0.8) return { strength: "strong", label: `strong ${dir} correlation`, short: `Strong ${dir}` };
  if (a >= 0.5) return { strength: "moderate", label: `moderate ${dir} correlation`, short: `Moderate ${dir}` };
  if (a >= 0.25) return { strength: "weak", label: `weak ${dir} correlation`, short: `Weak ${dir}` };
  return { strength: "none", label: "no correlation", short: "None" };
}

const flatStart = (d: Dataset) => snapTo((d.yMin + d.yMax) / 2, d.ySnap);

// SVG geometry
const SW = 360;
const SH = 262;
const SL = 50;
const SR = 346;
const ST = 12;
const SB = 218;

function ScatterLab() {
  const [dsId, setDsId] = useState<DsId>("revision");
  const ds = DATASETS[dsId];
  const [yL, setYL] = useState(() => flatStart(DATASETS.revision));
  const [yR, setYR] = useState(() => flatStart(DATASETS.revision));
  const [showMean, setShowMean] = useState(false);
  const [showResid, setShowResid] = useState(false);
  const [showBest, setShowBest] = useState(false);
  const [useOutlier, setUseOutlier] = useState(true);
  const [predX, setPredX] = useState(DATASETS.revision.predDefault);
  const [drag, setDrag] = useState<"L" | "R" | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const clipId = `scatter-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;

  const changeDs = (id: DsId) => {
    if (id === dsId) return;
    const d = DATASETS[id];
    const m = flatStart(d);
    setDsId(id);
    setYL(m);
    setYR(m);
    setPredX(d.predDefault);
    setShowBest(false);
  };

  // ---- the data and the statistics ----
  const all: Pt[] = ds.outlier ? [...ds.pts, ds.outlier.pt] : ds.pts;
  const used: Pt[] = ds.outlier && useOutlier ? all : ds.pts;
  const fit = fitLine(used);
  const corr = describe(fit.r);
  const xs = used.map((p) => p[0]);
  const x1 = Math.min(...xs);
  const x2 = Math.max(...xs);
  const yAt = (x: number) => yL + ((yR - yL) * (x - x1)) / (x2 - x1);
  const bestAt = (x: number) => fit.a + fit.b * x;

  let above = 0;
  let below = 0;
  let sseYours = 0;
  let sseBest = 0;
  for (const [x, y] of used) {
    const d = y - yAt(x);
    if (d > 1e-9) above++;
    else if (d < -1e-9) below++;
    sseYours += d * d;
    sseBest += (y - bestAt(x)) ** 2;
  }
  const on = used.length - above - below;
  const score = sseYours < 1e-9 ? 100 : Math.min(100, (100 * sseBest) / sseYours);
  const scoreText = `${score >= 99.5 ? 100 : Math.min(99, Math.round(score))}%`;
  const yRange = ds.yMax - ds.yMin;
  const offset = yAt(fit.mx) - fit.my;
  const throughMean = Math.abs(offset) <= 0.03 * yRange;
  const yourRise = yR - yL;
  const bestRise = fit.b * (x2 - x1);

  // ---- mapping maths → SVG ----
  const px = (x: number) => SL + ((x - ds.xMin) / (ds.xMax - ds.xMin)) * (SR - SL);
  const py = (y: number) => SB - ((y - ds.yMin) / (ds.yMax - ds.yMin)) * (SB - ST);
  const xTicks: number[] = [];
  for (let t = ds.xMin; t <= ds.xMax + 1e-9; t += ds.xTick) xTicks.push(+t.toFixed(6));
  const yTicks: number[] = [];
  for (let t = ds.yMin; t <= ds.yMax + 1e-9; t += ds.yTick) yTicks.push(+t.toFixed(6));

  // ---- dragging the ends of the line ----
  const valueFromPointer = (clientY: number): number | null => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    if (rect.height <= 0) return null;
    const vy = ((clientY - rect.top) / rect.height) * SH;
    const v = ds.yMin + ((SB - vy) / (SB - ST)) * yRange;
    return clamp(snapTo(v, ds.ySnap), ds.yMin, ds.yMax);
  };
  const handlers = (end: "L" | "R") => ({
    onPointerDown: (e: ReactPointerEvent<SVGGElement>) => {
      e.preventDefault();
      e.currentTarget.setPointerCapture(e.pointerId);
      setDrag(end);
    },
    onPointerMove: (e: ReactPointerEvent<SVGGElement>) => {
      if (drag !== end) return;
      const v = valueFromPointer(e.clientY);
      if (v === null) return;
      if (end === "L") setYL(v);
      else setYR(v);
    },
    onPointerUp: (e: ReactPointerEvent<SVGGElement>) => {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) e.currentTarget.releasePointerCapture(e.pointerId);
      setDrag(null);
    },
    onPointerCancel: () => setDrag(null),
  });

  // ---- prediction ----
  const yp = yAt(predX);
  const ypBest = bestAt(predX);
  const inside = predX >= x1 - 1e-9 && predX <= x2 + 1e-9;
  const impossible =
    (ds.limits.min !== undefined && yp < ds.limits.min - 0.5) || (ds.limits.max !== undefined && yp > ds.limits.max + 0.5);

  // ---- feedback on the learner's line ----
  let lineMsg: ReactNode;
  if (score >= 90) {
    lineMsg = (
      <>
        Your line is a good line of best fit: {above} {above === 1 ? "point" : "points"} above it and {below} below
        {on ? <>, with {on} exactly on it</> : null}
        {throughMean ? ", and it passes through the mean point" : ""}.
      </>
    );
  } else if (Math.abs(offset) > 0.06 * yRange) {
    lineMsg = (
      <>
        Your line is too {offset > 0 ? "high" : "low"}: {offset > 0 ? below : above} of the {used.length} points are{" "}
        {offset > 0 ? "below" : "above"} it. Aim for about as many points on each side.
      </>
    );
  } else if (Math.abs(yourRise - bestRise) > 0.08 * yRange) {
    lineMsg =
      Math.abs(bestRise) > 0.08 * yRange && yourRise * bestRise < 0 ? (
        <>Your line tilts the wrong way. Follow the direction the points drift in.</>
      ) : Math.abs(yourRise) > Math.abs(bestRise) ? (
        <>The height is about right, but your line is too steep. Tilt it to follow the drift of the points.</>
      ) : (
        <>The height is about right, but your line isn&rsquo;t steep enough. Tilt it to follow the drift of the points.</>
      );
  } else {
    lineMsg = <>Nearly there. Fine-tune the two ends of your line.</>;
  }

  const aria = `Scatter graph of ${ds.yName} against ${ds.xName}: ${used.length} points showing ${corr.label}. Your line goes from ${ds.fy(yL)} at ${ds.fx(x1)} to ${ds.fy(yR)} at ${ds.fx(x2)}, with ${above} points above and ${below} below.${showBest ? ` The best-fit line is also shown.` : ""}`;

  const caption = (
    <>
      These points show <strong>{corr.label}</strong>
      {corr.strength === "none" ? (
        <>: {ds.trend}. With no correlation, even the best line is almost flat, so it can&rsquo;t predict anything useful. </>
      ) : (
        <>: {ds.trend}. </>
      )}
      {lineMsg}{" "}
      {ds.outlier ? (
        useOutlier ? (
          <>
            The orange point ({ds.fx(ds.outlier.pt[0])}, {ds.fy(ds.outlier.pt[1])}) is an <strong>outlier</strong>: {ds.outlier.why}. It pulls the
            best-fit line towards itself, making it flatter, and weakens the correlation. Tap <em>Ignore outlier</em> to leave it out.
          </>
        ) : (
          <>The outlier is now ignored, so it no longer pulls the best line or the mean point.</>
        )
      ) : null}
      {ds.cause ? <> {ds.cause}</> : null}
    </>
  );

  const hx1 = px(x1);
  const hx2 = px(x2);
  const lineClass = "stroke-brand";

  return (
    <WidgetFrame
      title="Scatter graph lab"
      tryThis={[
        "Drag the two purple ends until your fit score is over 90%. How many points are above your line, and how many below?",
        "Turn on *Mean point*. Does a really good line pass through it? Try it on every data set.",
        "On *Revision*, tap *Ignore outlier* on and off. Which way does the best line move, and why?",
        "Extrapolate: on *Ice cream*, predict the sunburn cases on a day when 0 ice creams are sold. Why can't that be right?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<DsId>
          label="Data set"
          value={dsId}
          onChange={changeDs}
          options={(Object.keys(DATASETS) as DsId[]).map((id) => ({ value: id, label: DATASETS[id].label }))}
        />
        <p className="text-sm text-ink-2">{ds.intro}</p>

        <svg ref={svgRef} viewBox={`0 0 ${SW} ${SH}`} className="h-auto w-full select-none" role="img" aria-label={aria}>
          <defs>
            <clipPath id={clipId}>
              <rect x={SL} y={ST} width={SR - SL} height={SB - ST} />
            </clipPath>
          </defs>
          {/* grid */}
          {xTicks.map((t) => (
            <line key={`gx${t}`} x1={px(t)} x2={px(t)} y1={ST} y2={SB} className="stroke-line" strokeWidth={1} />
          ))}
          {yTicks.map((t) => (
            <line key={`gy${t}`} x1={SL} x2={SR} y1={py(t)} y2={py(t)} className="stroke-line" strokeWidth={1} />
          ))}
          {/* axes */}
          <line x1={SL} x2={SR} y1={SB} y2={SB} className="stroke-ink-2" strokeWidth={1.5} />
          <line x1={SL} x2={SL} y1={ST} y2={SB} className="stroke-ink-2" strokeWidth={1.5} />
          {xTicks.map((t) => (
            <text key={`lx${t}`} x={px(t)} y={SB + 14} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {t}
            </text>
          ))}
          {yTicks.map((t) => (
            <text key={`ly${t}`} x={SL - 6} y={py(t) + 3.5} fontSize={10} textAnchor="end" className="fill-ink-2">
              {t}
            </text>
          ))}
          <text x={(SL + SR) / 2} y={SH - 8} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink">
            {ds.xName}
          </text>
          <text
            x={13}
            y={(ST + SB) / 2}
            fontSize={11}
            fontWeight={700}
            textAnchor="middle"
            transform={`rotate(-90 13 ${(ST + SB) / 2})`}
            className="fill-ink"
          >
            {ds.yName}
          </text>

          <g clipPath={`url(#${clipId})`}>
            {/* distances from the points to your line */}
            {showResid
              ? used.map(([x, y], i) => (
                  <line key={`r${i}`} x1={px(x)} x2={px(x)} y1={py(y)} y2={py(yAt(x))} className="stroke-bad" strokeWidth={1.5} opacity={0.75} />
                ))
              : null}
            {/* the best-fit (least squares) line */}
            {showBest ? (
              <line
                x1={px(ds.xMin)}
                x2={px(ds.xMax)}
                y1={py(bestAt(ds.xMin))}
                y2={py(bestAt(ds.xMax))}
                className="stroke-good"
                strokeWidth={2}
                strokeDasharray="7 5"
              />
            ) : null}
            {/* prediction guide */}
            <line x1={px(predX)} x2={px(predX)} y1={SB} y2={py(yp)} className="stroke-accent" strokeWidth={1.5} strokeDasharray="4 3" />
            <line x1={SL} x2={px(predX)} y1={py(yp)} y2={py(yp)} className="stroke-accent" strokeWidth={1.5} strokeDasharray="4 3" />
            {/* your line: solid over the data, dashed where it extrapolates */}
            <line x1={px(ds.xMin)} x2={hx1} y1={py(yAt(ds.xMin))} y2={py(yL)} className={lineClass} strokeWidth={2} strokeDasharray="5 5" opacity={0.7} />
            <line x1={hx2} x2={px(ds.xMax)} y1={py(yR)} y2={py(yAt(ds.xMax))} className={lineClass} strokeWidth={2} strokeDasharray="5 5" opacity={0.7} />
            <line x1={hx1} x2={hx2} y1={py(yL)} y2={py(yR)} className={lineClass} strokeWidth={3} />
            <circle cx={px(predX)} cy={py(yp)} r={4} className="fill-accent" />
          </g>

          {/* the data */}
          {ds.pts.map(([x, y], i) => (
            <circle key={`p${i}`} cx={px(x)} cy={py(y)} r={4.5} className="fill-ink" opacity={0.85} />
          ))}
          {ds.outlier ? (
            <g>
              <circle
                cx={px(ds.outlier.pt[0])}
                cy={py(ds.outlier.pt[1])}
                r={5}
                className={useOutlier ? "fill-bad" : "fill-none stroke-bad"}
                strokeWidth={useOutlier ? 0 : 1.5}
                strokeDasharray={useOutlier ? undefined : "2 2"}
              />
              <text x={px(ds.outlier.pt[0]) + 8} y={py(ds.outlier.pt[1]) + 4} fontSize={10} fontWeight={700} className="fill-bad">
                outlier{useOutlier ? "" : " (ignored)"}
              </text>
            </g>
          ) : null}

          {/* the mean point */}
          {showMean ? (
            <g>
              <line x1={px(fit.mx) - 8} x2={px(fit.mx) + 8} y1={py(fit.my)} y2={py(fit.my)} className="stroke-accent" strokeWidth={3} />
              <line x1={px(fit.mx)} x2={px(fit.mx)} y1={py(fit.my) - 8} y2={py(fit.my) + 8} className="stroke-accent" strokeWidth={3} />
              <text x={px(fit.mx) + 10} y={py(fit.my) - 8} fontSize={10} fontWeight={700} className="fill-ink">
                mean point
              </text>
            </g>
          ) : null}

          {/* draggable ends of your line */}
          {(["L", "R"] as const).map((end) => {
            const cx = end === "L" ? hx1 : hx2;
            const cy = py(end === "L" ? yL : yR);
            return (
              <g key={end} {...handlers(end)} style={{ touchAction: "none", cursor: "ns-resize" }} aria-hidden="true">
                <circle cx={cx} cy={cy} r={18} fill="transparent" />
                <circle cx={cx} cy={cy} r={drag === end ? 9 : 7} className="fill-brand stroke-surface" strokeWidth={2} />
              </g>
            );
          })}
        </svg>
        <p className="-mt-2 text-xs text-ink-2">
          Purple = your line (drag its ends, or use the sliders). Dashed purple = beyond the data.{showBest ? " Green dashed = the best-fit line." : ""}
        </p>

        <div className="flex flex-wrap gap-2">
          <Toggle pressed={showMean} onClick={() => setShowMean((v) => !v)}>
            Mean point
          </Toggle>
          <Toggle pressed={showResid} onClick={() => setShowResid((v) => !v)}>
            Distances
          </Toggle>
          <Toggle pressed={showBest} onClick={() => setShowBest((v) => !v)}>
            Best-fit line
          </Toggle>
          {ds.outlier ? (
            <Toggle pressed={!useOutlier} onClick={() => setUseOutlier((v) => !v)}>
              Ignore outlier
            </Toggle>
          ) : null}
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NudgeSlider
            name="Left end of your line"
            label={`Left end (at ${ds.fx(x1)})`}
            value={yL}
            min={ds.yMin}
            max={ds.yMax}
            step={ds.ySnap}
            onChange={setYL}
            format={(v) => fmt(v, 1)}
          />
          <NudgeSlider
            name="Right end of your line"
            label={`Right end (at ${ds.fx(x2)})`}
            value={yR}
            min={ds.yMin}
            max={ds.yMax}
            step={ds.ySnap}
            onChange={setYR}
            format={(v) => fmt(v, 1)}
          />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <div className="col-span-2 sm:col-span-1">
            <Readout label="Correlation" value={corr.short} tone="ink" />
          </div>
          <Readout label="Above / below" value={`${above} / ${below}`} tone={Math.abs(above - below) <= 2 ? "good" : "ink"} />
          <Readout label="Fit score" value={scoreText} tone={score >= 90 ? "good" : "ink"} />
        </div>
        <p className="-mt-1 text-xs text-ink-2">
          Fit score compares your line with the best possible straight line (100%). It adds up the squared vertical distances from the points to
          each line, so a big miss counts extra.
        </p>

        <div className="space-y-2 rounded-xl border border-line p-3 text-sm text-ink-2">
          <NudgeSlider
            name="Prediction"
            label={<>Make a prediction at</>}
            value={predX}
            min={ds.xMin}
            max={ds.xMax}
            step={ds.xSnap}
            onChange={setPredX}
            format={(v) => ds.fx(v)}
          />
          <p>
            Go up from {ds.fx(predX)} to your line, then across: your line predicts about{" "}
            <strong className="text-ink">{ds.fy(yp)}</strong>
            {showBest ? <> (the best-fit line says about {ds.fy(ypBest)})</> : null}.
          </p>
          <p>
            {inside ? (
              <>
                This is <strong className="text-ink">interpolation</strong>: inside the data, which runs from {ds.fx(x1)} to {ds.fx(x2)}.{" "}
                {corr.strength === "strong"
                  ? "With strong correlation, it should be fairly reliable."
                  : corr.strength === "none"
                    ? "But with no correlation, it's really just a guess."
                    : `But the correlation is only ${corr.strength}, so don't trust it too much.`}
              </>
            ) : (
              <>
                This is <strong className="text-bad">extrapolation</strong>: outside the data, which runs from {ds.fx(x1)} to {ds.fx(x2)}. Nobody
                knows if the pattern carries on out here, so it&rsquo;s risky.
              </>
            )}
            {dsId === "drinks" && predX > 37 ? (
              <> Singapore&rsquo;s hottest day on record reached 37 °C, so there is no real data anywhere near this temperature.</>
            ) : null}
          </p>
          {impossible ? (
            <p className="font-bold text-bad">
              Impossible! {ds.limits.why[0].toUpperCase() + ds.limits.why.slice(1)}, so the straight-line pattern must break down out here.
            </p>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Chart studio: bar or pie, honest or misleading                          */
/* ------------------------------------------------------------------------ */

const CATS = [
  { name: "MRT", fill: "fill-brand", bg: "bg-brand" },
  { name: "Bus", fill: "fill-accent", bg: "bg-accent" },
  { name: "Walk", fill: "fill-good", bg: "bg-good" },
  { name: "Car", fill: "fill-info", bg: "bg-info" },
  { name: "Cycle", fill: "fill-s-stats", bg: "bg-s-stats" },
] as const;

const CHART_PRESETS: { label: string; f: number[] }[] = [
  { label: "Class 8C", f: [12, 9, 6, 5, 4] },
  { label: "Close race", f: [9, 8, 8, 7, 8] },
];

/** Totals that divide 360 exactly, so every pupil is a whole number of degrees. */
const NICE_TOTALS = [18, 20, 24, 30, 36, 40, 45, 60];
const FMAX = 30;

type View = "bar" | "pie";

/** An angle in degrees: exact if it is, otherwise ≈ to 1 d.p. */
function angleText(f: number, total: number): string {
  const exact = (360 * f) % total === 0;
  return `${exact ? "" : "≈"}${fmt((360 * f) / total, 1)}°`;
}

/** Point on a circle, angle measured clockwise from 12 o'clock. */
function polar(cx: number, cy: number, r: number, deg: number): [number, number] {
  const t = (deg * Math.PI) / 180;
  return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
}

function ChartStudio() {
  const [freqs, setFreqs] = useState<number[]>([12, 9, 6, 5, 4]);
  const [view, setView] = useState<View>("bar");
  const [start, setStart] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [reverse, setReverse] = useState(false);

  const N = freqs.reduce((a, b) => a + b, 0);
  const maxF = Math.max(...freqs);
  const startMax = Math.max(0, maxF - 1);
  const s = Math.min(start, startMax);
  const big = freqs.indexOf(maxF);
  const positives = freqs.filter((f) => f > 0);
  const minPos = positives.length ? Math.min(...positives) : 0;
  const small = freqs.indexOf(minPos);

  const setF = (i: number, v: number) => {
    setFreqs((prev) => prev.map((f, j) => (j === i ? clamp(v, 0, FMAX) : f)));
    setReverse(false);
  };
  const applyPreset = (f: number[]) => {
    setFreqs([...f]);
    setHidden(false);
    setReverse(false);
  };
  const newMystery = () => {
    const total = NICE_TOTALS[Math.floor(Math.random() * NICE_TOTALS.length)];
    const w = CATS.map(() => 0.25 + Math.random());
    const f = CATS.map(() => 1);
    for (let k = CATS.length; k < total; k++) {
      let i = 0;
      do {
        const tw = w.reduce((a, b) => a + b, 0);
        let r = Math.random() * tw;
        i = 0;
        while (i < w.length - 1 && r >= w[i]) {
          r -= w[i];
          i++;
        }
      } while (f[i] >= FMAX);
      f[i]++;
    }
    setFreqs(f);
    setView("pie");
    setHidden(true);
    setReverse(true);
  };
  const changeView = (v: View) => {
    setView(v);
    if (v === "bar") setHidden(false);
  };

  // ---- bar chart geometry ----
  const W = 360;
  const H = 236;
  const L = 42;
  const R = 350;
  const T = 16;
  const B = 196;
  const range = Math.max(1, maxF - s);
  const step = [1, 2, 5, 10].find((k) => Math.ceil(range / k) <= 6) ?? 10;
  const top = s + Math.max(1, Math.ceil(range / step)) * step;
  const yb = (v: number) => B - ((v - s) / (top - s)) * (B - T);
  const slot = (R - L) / CATS.length;
  const bw = 38;
  const ticks: number[] = [];
  for (let t = s; t <= top; t += step) ticks.push(t);
  const vanished = freqs.filter((f) => f > 0 && f <= s).length;
  const realRatio = minPos ? maxF / minPos : 1;
  const drawnSmall = minPos - s;
  const looksRatio = drawnSmall > 0 ? (maxF - s) / drawnSmall : Infinity;
  const ratioText = (v: number) => (Number.isFinite(v) ? `${fmt(v, 2)}×` : "∞");

  // ---- pie chart geometry ----
  const cx = 180;
  const cy = 118;
  const rad = 82;
  const sectors: { i: number; a0: number; a1: number }[] = [];
  {
    let acc = 0;
    freqs.forEach((f, i) => {
      if (f <= 0 || N <= 0) return;
      const a = (360 * f) / N;
      sectors.push({ i, a0: acc, a1: acc + a });
      acc += a;
    });
  }
  const perPupilExact = 360 % (N || 1) === 0;
  const g = gcd(360, N || 1);
  const perPupilFrac = `${360 / g}/${(N || 1) / g}`;
  const perPupilText = N ? `${perPupilExact ? "" : "≈"}${fmt(360 / N, 1)}°` : "—";

  const sameBar = big === small || realRatio === 1;

  // ---- aria ----
  const listText = CATS.map((c, i) => `${c.name} ${freqs[i]}`).join(", ");
  const ariaBar = `Bar chart of how ${N} pupils travel to school: ${listText}. The vertical axis starts at ${s}${s > 0 ? ", not 0, which makes the differences look bigger" : ""}.`;
  const ariaPie = hidden
    ? `Pie chart of ${N} pupils with angles ${CATS.map((c, i) => `${c.name} ${angleText(freqs[i], N || 1)}`).join(", ")}. The frequencies are hidden.`
    : `Pie chart of ${N} pupils: ${CATS.map((c, i) => `${c.name} ${freqs[i]} pupils, ${angleText(freqs[i], N || 1)}`).join("; ")}.`;

  // ---- caption ----
  let caption: ReactNode;
  if (N === 0) {
    caption = <>There is no data yet. Add some pupils with the + buttons.</>;
  } else if (view === "bar") {
    if (s === 0) {
      caption = sameBar ? (
        <>
          Every bar starts at 0, so each bar&rsquo;s height is in proportion to its frequency. Right now the bars you can compare are equal, so they
          are drawn equally tall. Change a frequency and watch the heights stay honest.
        </>
      ) : (
        <>
          Every bar starts at 0, so each bar&rsquo;s height is in proportion to its frequency. {CATS[big].name} ({maxF}) is{" "}
          {ratioText(realRatio)} {CATS[small].name} ({minPos}), and its bar is exactly {ratioText(realRatio)} as tall. That&rsquo;s what makes a
          bar chart honest.
        </>
      );
    } else {
      caption = (
        <>
          The axis now starts at <strong>{s}</strong>, so each bar only shows the part above {s}.{" "}
          {sameBar ? null : (
            <>
              {CATS[big].name}&rsquo;s bar is drawn {maxF - s} units tall and {CATS[small].name}&rsquo;s {Math.max(0, drawnSmall)}, so{" "}
              {CATS[big].name} <em>looks</em> {Number.isFinite(looksRatio) ? `${fmt(looksRatio, 2)} times` : "infinitely many times"} as big, when{" "}
              {maxF} is really only {fmt(realRatio, 2)} times {minPos}.{" "}
            </>
          )}
          {vanished ? (
            <>
              {vanished === 1 ? "One bar has" : `${vanished} bars have`} vanished completely, even though those pupils exist.{" "}
            </>
          ) : null}
          Every number on the chart is still true; it&rsquo;s the <strong>picture</strong> that lies. Your eye compares bar lengths, so a bar
          chart&rsquo;s frequency axis must start at 0.
        </>
      );
    }
  } else if (hidden) {
    caption = (
      <>
        Work backwards. The whole circle, 360°, is all {N} pupils, so a slice is the same fraction of {N} as its angle is of 360°:{" "}
        frequency = <M>{"\"angle\"/360"}</M> × {N}. For example, a 90° slice would be <M>{"90/360"}</M> = <M>{"1/4"}</M> of the class.
        {perPupilExact ? (
          <>
            {" "}Or use the shortcut: each pupil is 360° ÷ {N} = {360 / N}°, so divide each angle by {360 / N}.
          </>
        ) : null}
      </>
    );
  } else {
    caption = (
      <>
        A pie chart shows <strong>shares of the whole</strong>. The full circle, 360°, stands for all {N} pupils, so each pupil gets 360° ÷ {N}{" "}
        {perPupilExact ? (
          <>= {360 / N}°.</>
        ) : (
          <>
            = <M>{perPupilFrac}</M>° ≈ {fmt(360 / N, 1)}°, an awkward number. That&rsquo;s why textbook pie charts use totals like 18, 24, 36 or 40,
            which divide 360 exactly.
          </>
        )}{" "}
        {CATS[big].name} is <M>{`${maxF}/${N}`}</M> of the class, so its slice is <M>{`${maxF}/${N}`}</M> × 360° = {angleText(maxF, N)}. Change any
        one frequency and the total changes, so <em>every</em> slice gets resized.
      </>
    );
  }

  return (
    <WidgetFrame
      title="Chart studio: bar or pie, honest or misleading?"
      tryThis={[
        "Pie chart: add one pupil to Cycle. Why does *every other* slice shrink?",
        "Make the MRT slice exactly 90°. Can you find two different class sizes that do it?",
        "Bar chart, *Close race*: raise the axis start to 6. How many times bigger does MRT look than Car, and how many times bigger is it really?",
        "Press *Mystery pie* and work out every frequency from the angles before you reveal them.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<View>
            label="Chart type"
            value={view}
            onChange={changeView}
            options={[
              { value: "bar", label: "Bar chart" },
              { value: "pie", label: "Pie chart" },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Data sets">
          {CHART_PRESETS.map((p) => (
            <button key={p.label} type="button" className="btn btn-secondary btn-sm" onClick={() => applyPreset(p.f)}>
              {p.label}
            </button>
          ))}
          <button type="button" className="btn btn-secondary btn-sm" onClick={newMystery}>
            🔍 Mystery pie
          </button>
        </div>

        <p className="text-sm font-bold text-ink">How {N} pupils travel to school</p>

        {view === "bar" ? (
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaBar}>
            {ticks.map((t) => (
              <g key={`t${t}`}>
                <line x1={L} x2={R} y1={yb(t)} y2={yb(t)} className="stroke-line" strokeWidth={1} />
                <text x={L - 6} y={yb(t) + 3.5} fontSize={10} textAnchor="end" className={t === s && s > 0 ? "fill-bad" : "fill-ink-2"} fontWeight={t === s && s > 0 ? 800 : 400}>
                  {t}
                </text>
              </g>
            ))}
            {freqs.map((f, i) => {
              const h = Math.max(0, yb(s) - yb(Math.max(s, f)));
              const x = L + slot * i + (slot - bw) / 2;
              return (
                <g key={`b${i}`}>
                  {h > 0 ? <rect x={x} y={B - h} width={bw} height={h} rx={2} className={CATS[i].fill} /> : null}
                  <text x={x + bw / 2} y={B - h - 5} fontSize={11} fontWeight={800} textAnchor="middle" className={h > 0 || f === 0 ? "fill-ink" : "fill-bad"}>
                    {f}
                  </text>
                  <text x={x + bw / 2} y={B + 15} fontSize={11} textAnchor="middle" className="fill-ink-2">
                    {CATS[i].name}
                  </text>
                </g>
              );
            })}
            <line x1={L} x2={R} y1={B} y2={B} className="stroke-ink-2" strokeWidth={1.5} />
            <line x1={L} x2={L} y1={T - 4} y2={B} className="stroke-ink-2" strokeWidth={1.5} />
            <text x={12} y={(T + B) / 2} fontSize={11} fontWeight={700} textAnchor="middle" transform={`rotate(-90 12 ${(T + B) / 2})`} className="fill-ink">
              Number of pupils
            </text>
            <text x={(L + R) / 2} y={H - 6} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink">
              Way of travelling
            </text>
          </svg>
        ) : (
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={ariaPie}>
            {N === 0 ? (
              <circle cx={cx} cy={cy} r={rad} className="fill-surface-2 stroke-line" strokeWidth={1.5} />
            ) : sectors.length === 1 ? (
              <circle cx={cx} cy={cy} r={rad} className={`${CATS[sectors[0].i].fill} stroke-surface`} strokeWidth={2} />
            ) : (
              sectors.map(({ i, a0, a1 }) => {
                const [xa, ya] = polar(cx, cy, rad, a0);
                const [xb, yb2] = polar(cx, cy, rad, a1);
                const large = a1 - a0 > 180 ? 1 : 0;
                return (
                  <path
                    key={`s${i}`}
                    d={`M ${cx} ${cy} L ${xa.toFixed(2)} ${ya.toFixed(2)} A ${rad} ${rad} 0 ${large} 1 ${xb.toFixed(2)} ${yb2.toFixed(2)} Z`}
                    className={`${CATS[i].fill} stroke-surface`}
                    strokeWidth={2}
                  />
                );
              })
            )}
            {N > 0
              ? sectors
                  .filter(({ a0, a1 }) => a1 - a0 >= 12)
                  .map(({ i, a0, a1 }) => {
                    const mid = (a0 + a1) / 2;
                    const [lx, ly] = polar(cx, cy, rad + 12, mid);
                    const sn = Math.sin((mid * Math.PI) / 180);
                    const cs = Math.cos((mid * Math.PI) / 180);
                    const anchor = sn > 0.25 ? "start" : sn < -0.25 ? "end" : "middle";
                    return (
                      <text key={`l${i}`} x={lx} y={ly + (cs > 0.5 ? -2 : cs < -0.5 ? 10 : 4)} fontSize={11} fontWeight={700} textAnchor={anchor} className="fill-ink">
                        {CATS[i].name} {angleText(freqs[i], N)}
                      </text>
                    );
                  })
              : null}
          </svg>
        )}

        {view === "bar" ? (
          <div className="space-y-2">
            <NudgeSlider
              name="Vertical axis start"
              label="Vertical axis starts at"
              value={s}
              min={0}
              max={startMax}
              onChange={setStart}
            />
            {s > 0 ? <p className="text-sm font-bold text-bad">⚠ The frequency axis starts at {s}, not 0.</p> : null}
            {N > 0 && !sameBar ? (
              <div className="grid grid-cols-2 gap-2">
                <Readout label={`${CATS[big].name} ÷ ${CATS[small].name} really`} value={ratioText(realRatio)} tone="good" />
                <Readout label="…looks like" value={ratioText(looksRatio)} tone={s > 0 ? "bad" : "good"} />
              </div>
            ) : null}
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            <Readout label="Total" value={N} tone="ink" />
            <Readout label="Per pupil" value={perPupilText} tone="ink" />
            <Readout label="Angles add to" value={N ? "360°" : "—"} tone="ink" />
          </div>
        )}

        {/* the frequency table */}
        <div className="rounded-xl border border-line">
          <div className="grid grid-cols-[1fr_auto_4.5rem] items-center gap-x-2 border-b border-line px-3 py-2 text-xs font-bold uppercase tracking-wide text-ink-2">
            <span>Travel</span>
            <span className="text-center">Frequency</span>
            <span className="text-right">{view === "pie" ? "Angle" : ""}</span>
          </div>
          {CATS.map((c, i) => (
            <div key={c.name} className="grid grid-cols-[1fr_auto_4.5rem] items-center gap-x-2 px-3 py-1.5">
              <span className="flex items-center gap-2 text-sm font-semibold text-ink">
                <span className={`inline-block h-3 w-3 shrink-0 rounded-sm ${c.bg}`} aria-hidden="true" />
                {c.name}
              </span>
              {hidden ? (
                <span className="min-w-[8.5rem] text-center text-lg font-extrabold text-ink-2">?</span>
              ) : (
                <span className="flex items-center gap-2">
                  <button
                    type="button"
                    className="kbd h-10 min-w-10"
                    onClick={() => setF(i, freqs[i] - 1)}
                    disabled={freqs[i] <= 0}
                    aria-label={`${c.name}: one fewer pupil`}
                  >
                    −
                  </button>
                  <span className="min-w-[2.5ch] text-center text-lg font-extrabold tabular-nums text-ink">{freqs[i]}</span>
                  <button
                    type="button"
                    className="kbd h-10 min-w-10"
                    onClick={() => setF(i, freqs[i] + 1)}
                    disabled={freqs[i] >= FMAX}
                    aria-label={`${c.name}: one more pupil`}
                  >
                    +
                  </button>
                </span>
              )}
              <span className="text-right text-sm font-bold tabular-nums text-ink">{view === "pie" && N ? angleText(freqs[i], N) : ""}</span>
            </div>
          ))}
          <div className="grid grid-cols-[1fr_auto_4.5rem] items-center gap-x-2 border-t border-line px-3 py-2 text-sm font-extrabold text-ink">
            <span>Total</span>
            <span className="min-w-[8.5rem] text-center tabular-nums">{N}</span>
            <span className="text-right tabular-nums">{view === "pie" && N ? "360°" : ""}</span>
          </div>
        </div>

        {view === "pie" && N > 0 ? (
          <div className="rounded-xl border border-line p-3 text-sm text-ink-2">
            {hidden ? (
              <>
                <p className="font-bold text-ink">Mystery pie: {N} pupils in total. Find each frequency from its angle.</p>
                <button type="button" className="btn btn-primary btn-sm mt-2" onClick={() => setHidden(false)}>
                  Reveal the frequencies
                </button>
              </>
            ) : reverse ? (
              <>
                <p className="font-bold text-ink">Angle → frequency: frequency = (angle ÷ 360°) × {N}</p>
                <ul className="mt-1 space-y-1 tabular-nums">
                  {CATS.map((c, i) => (
                    <li key={c.name}>
                      {c.name}: <M>{`${fmt((360 * freqs[i]) / N, 1)}/360`}</M> × {N} = <strong className="text-ink">{freqs[i]}</strong>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <p className="font-bold text-ink">Frequency → angle: angle = (frequency ÷ {N}) × 360°</p>
                <ul className="mt-1 space-y-1 tabular-nums">
                  {CATS.map((c, i) => (
                    <li key={c.name}>
                      {c.name}: <M>{`${freqs[i]}/${N}`}</M> × 360° = <strong className="text-ink">{angleText(freqs[i], N)}</strong>
                    </li>
                  ))}
                </ul>
                {perPupilExact && maxF > 0 ? (
                  <p className="mt-2">
                    <span className="font-bold text-ink">Quicker way:</span> 360° ÷ {N} = {360 / N}° per pupil, so {CATS[big].name} = {maxF} ×{" "}
                    {360 / N}° = {(maxF * 360) / N}°.
                  </p>
                ) : null}
              </>
            )}
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "scatter-lab",
    title: "Scatter graph lab",
    blurb: "Drag your own line of best fit, spot correlation, ignore an outlier, and find out when a prediction can be trusted.",
    Component: ScatterLab,
  },
  {
    id: "chart-studio",
    title: "Chart studio",
    blurb: "One frequency table, two charts: work out pie chart angles both ways, and watch a cut-off axis make a bar chart lie.",
    Component: ChartStudio,
  },
];
