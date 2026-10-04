"use client";
// Interactive explorables for the "rates-units" topic.
//  1. Unit zoom — why 1 m² = 10 000 cm² (not 100) and 1 m³ = 1 000 000 cm³:
//     each "zoom" splits every edge into 10, so a length gains ×10, a square
//     ×100 and a cube ×1000. Converts an amount both ways, shows the classic
//     "× 100 only" slip and links cm³ to millilitres and litres.
//  2. Journey lab — a two-leg journey (with an optional rest stop) on a
//     distance–time graph. Gradient = speed; the dashed start-to-finish line
//     gives the average speed, which is NOT the mean of the two speeds unless
//     the legs take equal times. Also km/h → m/s and a 24-hour arrival time.
import { useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                             */
/* ------------------------------------------------------------------------ */

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

/** An exact, non-negative fraction n/d in lowest terms (d > 0). */
interface Q {
  n: number;
  d: number;
}

function frac(n: number, d: number): Q {
  const g = gcd(n, d);
  const s = d < 0 ? -1 : 1;
  return { n: (s * n) / g, d: (s * d) / g };
}

const addQ = (a: Q, b: Q): Q => frac(a.n * b.d + b.n * a.d, a.d * b.d);
const valQ = (q: Q) => q.n / q.d;

/** Number of decimal places needed if q terminates within maxDp places, else null. */
function terminatesIn(q: Q, maxDp: number): number | null {
  for (let dp = 0; dp <= maxDp; dp++) {
    if ((q.n * 10 ** dp) % q.d === 0) return dp;
  }
  return null;
}

/** Exact decimal when it terminates within maxDp places, otherwise "≈" + rounded. */
function decText(q: Q, maxDp = 2, approxDp = 2): string {
  const dp = terminatesIn(q, maxDp);
  if (dp !== null) return (q.n / q.d).toFixed(dp);
  return `≈ ${(q.n / q.d).toFixed(approxDp)}`;
}

/** "= 48" for an exact value, "≈ 13.33" for a rounded one. */
const eq = (s: string) => (s.startsWith("≈") ? s : `= ${s}`);

/** Maths markup for a fraction: whole number, proper fraction or mixed number. */
function fracMarkup({ n, d }: Q): string {
  if (d === 1) return String(n);
  if (n > d) return `${Math.floor(n / d)} ${n % d}/${d}`;
  return `${n}/${d}`;
}

/** Whole numbers with a (non-breaking) space every three digits from 10 000 up. */
function group(n: number): string {
  const s = String(n);
  if (s.length <= 4) return s;
  return s.replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/** A whole number N ≥ 1 in standard-form maths markup, e.g. "3.5 * 10^12". */
function standardForm(N: number): string {
  const s = String(N);
  const e = s.length - 1;
  const digits = s.replace(/0+$/, "");
  const m = digits.length > 1 ? `${digits[0]}.${digits.slice(1)}` : digits;
  return `${m} * 10^${e}`;
}

/** A slider with − / + buttons for exact control on touch screens. */
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
        onClick={() => onChange(Math.max(min, value - step))}
        disabled={value <= min}
        aria-label={`${name}: decrease`}
      >
        −
      </button>
      <button
        type="button"
        className="kbd h-10 min-w-10"
        onClick={() => onChange(Math.min(max, value + step))}
        disabled={value >= max}
        aria-label={`${name}: increase`}
      >
        +
      </button>
    </div>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Unit zoom: length, area and volume conversions                          */
/* ------------------------------------------------------------------------ */

type Dim = "1" | "2" | "3";
type Pair = "cm-mm" | "m-cm" | "km-m";
type Dir = "down" | "up";

/** p = how many "split every edge into 10" zooms take you from big to small. */
const PAIRS: Record<Pair, { big: string; small: string; p: number }> = {
  "cm-mm": { big: "cm", small: "mm", p: 1 },
  "m-cm": { big: "m", small: "cm", p: 2 },
  "km-m": { big: "km", small: "m", p: 3 },
};
const SUP = ["", "", "²", "³"];
const DIM_NAME = ["", "Length", "Area", "Volume"];

/** Tenths as a short decimal: 35 → "3.5", 20 → "2". */
const tenths = (t: number) => (t % 10 === 0 ? String(t / 10) : (t / 10).toFixed(1));

function ZoomPicture({ d, p, big, small }: { d: number; p: number; big: string; small: string }) {
  const edge = (i: number) => (i === 0 ? `1 ${big}` : `${10 ** (p - i)} ${small}`);
  const cell = (i: number) => `${10 ** (p - i - 1)} ${small}`;
  const panels = Array.from({ length: p }, (_, i) => i);
  const count = 10 ** d;
  const shape = d === 1 ? "length" : d === 2 ? "square" : "cube";
  const piece = d === 1 ? "pieces" : d === 2 ? "squares" : "cubes";
  const aria =
    `Zoom picture. ` +
    panels
      .map(
        (i) =>
          `${i === 0 ? "A" : "One of those, a"} ${edge(i)} ${shape} is split into ${count} ${piece}${d === 1 ? " of" : " with edge"} ${cell(i)}`,
      )
      .join(". ") +
    `. Altogether 1 ${big}${SUP[d]} = ${10 ** (p * d)} ${small}${SUP[d]}.`;

  // ---- Length: bars stacked vertically, each zooming into the next ----
  if (d === 1) {
    const BX = 30;
    const BW = 300;
    const BH = 18;
    const ROW = 58;
    const TOP = 24;
    const VH = TOP + (p - 1) * ROW + BH + 24;
    return (
      <svg viewBox={`0 0 360 ${VH}`} className="h-auto w-full" role="img" aria-label={aria}>
        {panels.map((i) => {
          const y = TOP + i * ROW;
          const zoomed = i < p - 1;
          return (
            <g key={`row${i}`}>
              <text x={BX + BW} y={y - 6} fontSize={11} fontWeight={800} textAnchor="end" className="fill-ink">
                {edge(i)}
              </text>
              {Array.from({ length: 10 }, (_, j) => (
                <rect
                  key={`s${i}-${j}`}
                  x={BX + (j * BW) / 10}
                  y={y}
                  width={BW / 10}
                  height={BH}
                  className={zoomed && j === 9 ? "fill-accent stroke-accent" : "fill-brand-soft stroke-brand"}
                  strokeWidth={1}
                />
              ))}
              <text x={BX} y={y + BH + 14} fontSize={11} className="fill-ink-2">
                10 pieces, each {cell(i)}
              </text>
              {zoomed ? (
                <g className="stroke-accent" strokeWidth={1.25} strokeDasharray="4 3">
                  <line x1={BX + 0.9 * BW} y1={y + BH} x2={BX} y2={y + ROW} />
                  <line x1={BX + BW} y1={y + BH} x2={BX + BW} y2={y + ROW} />
                </g>
              ) : null}
            </g>
          );
        })}
      </svg>
    );
  }

  // ---- Area / volume: panels side by side, each zooming into the next ----
  const G = 30;
  const P = Math.min(130, (344 - (p - 1) * G) / p);
  const totalW = p * P + (p - 1) * G;
  const x0 = (360 - totalW) / 2;
  const TOP = 22;
  const VH = TOP + P + 34;
  const xs = (i: number) => x0 + i * (P + G);
  const tenthsOf = Array.from({ length: 9 }, (_, j) => j + 1);
  const countLine = d === 2 ? "10 × 10 = 100" : "10×10×10 = 1000";

  return (
    <svg viewBox={`0 0 360 ${VH}`} className="h-auto w-full" role="img" aria-label={aria}>
      {panels.map((i) => {
        const x = xs(i);
        const zoomed = i < p - 1;
        const nx = xs(i + 1);
        let body: ReactNode;
        if (d === 2) {
          const c = P / 10;
          body = (
            <g>
              <rect x={x} y={TOP} width={P} height={P} className="fill-brand-soft stroke-brand" strokeWidth={1.5} />
              <g className="stroke-brand" strokeWidth={0.6} opacity={0.6}>
                {tenthsOf.map((j) => (
                  <line key={`v${j}`} x1={x + j * c} y1={TOP} x2={x + j * c} y2={TOP + P} />
                ))}
                {tenthsOf.map((j) => (
                  <line key={`h${j}`} x1={x} y1={TOP + j * c} x2={x + P} y2={TOP + j * c} />
                ))}
              </g>
              {zoomed ? (
                <>
                  <rect x={x + P - c} y={TOP} width={c} height={c} className="fill-accent stroke-accent" strokeWidth={1} />
                  <g className="stroke-accent" strokeWidth={1.25} strokeDasharray="4 3">
                    <line x1={x + P} y1={TOP} x2={nx} y2={TOP} />
                    <line x1={x + P} y1={TOP + c} x2={nx} y2={TOP + P} />
                  </g>
                </>
              ) : null}
            </g>
          );
        } else {
          const a = P / 1.35;
          const h = 0.35 * a;
          const fx = x;
          const fy = TOP + h;
          const c = a / 10;
          const e = h / 10;
          const pts = (arr: [number, number][]) => arr.map(([px, py]) => `${px.toFixed(2)},${py.toFixed(2)}`).join(" ");
          body = (
            <g>
              <polygon points={pts([[fx, fy], [fx + a, fy], [fx + a + h, fy - h], [fx + h, fy - h]])} className="fill-surface stroke-brand" strokeWidth={1.5} />
              <polygon
                points={pts([[fx + a, fy], [fx + a + h, fy - h], [fx + a + h, fy - h + a], [fx + a, fy + a]])}
                className="fill-surface-2 stroke-brand"
                strokeWidth={1.5}
              />
              <rect x={fx} y={fy} width={a} height={a} className="fill-brand-soft stroke-brand" strokeWidth={1.5} />
              <g className="stroke-brand" strokeWidth={0.5} opacity={0.6}>
                {tenthsOf.map((j) => (
                  <g key={`g${j}`}>
                    {/* front face */}
                    <line x1={fx + j * c} y1={fy} x2={fx + j * c} y2={fy + a} />
                    <line x1={fx} y1={fy + j * c} x2={fx + a} y2={fy + j * c} />
                    {/* top face */}
                    <line x1={fx + j * c} y1={fy} x2={fx + j * c + h} y2={fy - h} />
                    <line x1={fx + j * e} y1={fy - j * e} x2={fx + a + j * e} y2={fy - j * e} />
                    {/* right face */}
                    <line x1={fx + a} y1={fy + j * c} x2={fx + a + h} y2={fy - h + j * c} />
                    <line x1={fx + a + j * e} y1={fy - j * e} x2={fx + a + j * e} y2={fy + a - j * e} />
                  </g>
                ))}
              </g>
              {zoomed ? (
                <>
                  <g className="fill-accent stroke-accent" strokeWidth={0.8}>
                    <rect x={fx + a - c} y={fy} width={c} height={c} />
                    <polygon points={pts([[fx + a - c, fy], [fx + a, fy], [fx + a + e, fy - e], [fx + a - c + e, fy - e]])} />
                    <polygon points={pts([[fx + a, fy], [fx + a + e, fy - e], [fx + a + e, fy - e + c], [fx + a, fy + c]])} />
                  </g>
                  <g className="stroke-accent" strokeWidth={1.25} strokeDasharray="4 3">
                    <line x1={fx + a + e} y1={fy - e} x2={nx + h} y2={fy - h} />
                    <line x1={fx + a} y1={fy + c} x2={nx} y2={fy + a} />
                  </g>
                </>
              ) : null}
            </g>
          );
        }
        return (
          <g key={`panel${i}`}>
            <text x={x + P / 2} y={TOP - 7} fontSize={11} fontWeight={800} textAnchor="middle" className="fill-ink">
              {d === 2 ? `${edge(i)} × ${edge(i)}` : `edge ${edge(i)}`}
            </text>
            {body}
            <text x={x + P / 2} y={TOP + P + 14} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {countLine}
            </text>
            <text x={x + P / 2} y={TOP + P + 27} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {cell(i)} {piece}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

function UnitZoom() {
  const [dim, setDim] = useState<Dim>("2");
  const [pair, setPair] = useState<Pair>("m-cm");
  const [dir, setDir] = useState<Dir>("down");
  const [t, setT] = useState(35); // tenths of the big unit: 35 → 3.5

  const d = Number(dim);
  const { big, small, p } = PAIRS[pair];
  const sup = SUP[d];
  const B = `${big}${sup}`;
  const S = `${small}${sup}`;
  const k = 10 ** p; // length factor
  const perZoom = 10 ** d;
  const f = 10 ** (p * d); // full factor = k^d
  const bigText = tenths(t);
  const smallVal = t * 10 ** (p * d - 1); // exact whole number
  const tooFar = 10 ** (p * (d - 1)); // how far off the "length factor only" slip is

  const zoomChain = Array.from({ length: p }, () => group(perZoom)).join(" × ") + (p > 1 ? ` = ${group(f)}` : "");
  const lengthsTimes = Array.from({ length: d }, () => `${group(k)} ${small}`).join(" × ");
  const factorsTimes = Array.from({ length: d }, () => group(k)).join(" × ");

  const main =
    dir === "down" ? (
      <>
        {bigText} {B} × {group(f)} = <strong className="text-brand">{group(smallVal)} {S}</strong>
      </>
    ) : (
      <>
        {group(smallVal)} {S} ÷ {group(f)} = <strong className="text-brand">{bigText} {B}</strong>
      </>
    );

  const slip =
    d > 1 ? (
      dir === "down" ? (
        <>
          {bigText} {B} × {group(k)} = {group(t * 10 ** (p - 1))} {S} — that is {group(tooFar)} times too small.
        </>
      ) : (
        <>
          {group(smallVal)} {S} ÷ {group(k)} = {group(t * 10 ** (p * d - 1 - p))} {B} — that is {group(tooFar)} times too big.
        </>
      )
    ) : null;

  let capacity: ReactNode = null;
  if (d === 3) {
    if (pair === "cm-mm") {
      capacity = (
        <>
          1 cm³ holds exactly 1 ml, so {bigText} cm³ = <strong>{bigText} ml</strong>. (A cubic millimetre is a thousandth of a millilitre.)
        </>
      );
    } else if (pair === "m-cm") {
      capacity = (
        <>
          1 cm³ = 1 ml and 1000 cm³ = 1 litre, so {group(smallVal)} cm³ = <strong>{group(t * 100)} litres</strong>. That is why 1 m³ = 1000
          litres.
        </>
      );
    } else {
      capacity = (
        <>
          1 m³ = 1000 litres, so {bigText} km³ = {group(smallVal)} m³ = <strong>
            <M>{standardForm(t * 10 ** 11)}</M> litres
          </strong>
          . Lakes and reservoirs are measured in km³ for a reason.
        </>
      );
    }
  }

  const caption = (
    <div className="space-y-2">
      <p>
        Each zoom splits every edge into 10. A length becomes 10 pieces, a square becomes 10 × 10 = 100 squares and a cube becomes 10 × 10 × 10 =
        1000 cubes. Getting from {big} to {small} takes {p === 1 ? "1 zoom" : `${p} zooms`}, so the factor is {zoomChain}.
      </p>
      {d === 1 ? (
        <p>
          A length only goes one way: 1 {big} = {group(k)} {small}, so you multiply by {group(k)}.
        </p>
      ) : (
        <p>
          {d === 2 ? "Area has two directions" : "Volume has three directions"}: a 1 {big} {d === 2 ? "square" : "cube"} is {group(k)} {small} along
          every edge, so it holds {factorsTimes} = {group(f)} {S}. Multiplying by {group(k)} only converts{" "}
          {d === 2 ? "one side" : "one edge"} — the classic slip.
        </p>
      )}
      {dir === "up" ? <p>Going from small units to big units, divide by the same factor: there are far fewer big units.</p> : null}
    </div>
  );

  return (
    <WidgetFrame
      title="Unit zoom"
      tryThis={[
        "Predict how many cm² are in 1 m² before you choose Area. Were you right?",
        "Keep m and cm and switch between Length, Area and Volume. Why is the factor 100, then 10 000, then 1 000 000?",
        "How many litres of water fill a 2 m³ tank? Use Volume to check.",
        "Convert 25 000 cm² to m², then compare with what the classic slip gives.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<Dim>
            label="Measure"
            value={dim}
            onChange={setDim}
            options={[
              { value: "1", label: "Length" },
              { value: "2", label: "Area" },
              { value: "3", label: "Volume" },
            ]}
          />
          <Segmented<Pair>
            label="Units"
            value={pair}
            onChange={setPair}
            options={[
              { value: "cm-mm", label: "cm & mm" },
              { value: "m-cm", label: "m & cm" },
              { value: "km-m", label: "km & m" },
            ]}
          />
        </div>

        <ZoomPicture d={d} p={p} big={big} small={small} />
        <p className="-mt-2 text-xs text-ink-2">Amber = the piece that gets zoomed into next. Dashed lines show the zoom.</p>

        <div className="grid grid-cols-3 gap-2">
          <Readout label="Zooms" value={String(p)} tone="ink" />
          <Readout label="Each zoom" value={`× ${group(perZoom)}`} tone="ink" />
          <Readout label={`${DIM_NAME[d]} factor`} value={`× ${group(f)}`} tone="good" />
        </div>

        <p className="text-sm text-ink-2">
          1 {B} = {d === 1 ? "" : `${lengthsTimes} = `}
          <strong className="text-ink">
            {group(f)} {S}
          </strong>
        </p>

        <div className="space-y-3 rounded-xl border border-line p-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-ink-2">Convert</span>
            <Segmented<Dir>
              label="Direction of conversion"
              value={dir}
              onChange={setDir}
              options={[
                { value: "down", label: `${B} → ${S}` },
                { value: "up", label: `${S} → ${B}` },
              ]}
            />
          </div>
          <NudgeSlider
            name="Amount"
            label="Amount"
            value={t}
            min={1}
            max={100}
            onChange={setT}
            format={(v) => (dir === "down" ? `${tenths(v)} ${B}` : `${group(v * 10 ** (p * d - 1))} ${S}`)}
          />
          <p className="text-lg font-bold tabular-nums text-ink" aria-live="polite">
            {main}
          </p>
          {slip ? (
            <p className="rounded-lg bg-bad-soft p-2 text-sm text-ink">
              <span className="font-bold text-bad">
                ✗ Classic slip ({dir === "down" ? "×" : "÷"} {group(k)} only):
              </span>{" "}
              {slip}
            </p>
          ) : null}
          {capacity ? (
            <p className="rounded-lg bg-good-soft p-2 text-sm text-ink">
              <span className="font-bold text-good">Capacity link:</span> {capacity}
            </p>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Journey lab: distance–time graph and average speed                       */
/* ------------------------------------------------------------------------ */

interface Journey {
  d1: number; // km
  s1: number; // km/h
  rest: number; // minutes
  d2: number; // km
  s2: number; // km/h
}

const JOURNEYS: { label: string; j: Journey }[] = [
  { label: "There and back", j: { d1: 30, s1: 60, rest: 0, d2: 30, s2: 40 } },
  { label: "Equal times", j: { d1: 40, s1: 80, rest: 0, d2: 20, s2: 40 } },
  { label: "Bike ride with a hawker stop", j: { d1: 10, s1: 20, rest: 30, d2: 10, s2: 15 } },
];

/** A duration given in (exact) minutes: text like "1 h 15 min" (rounded to the nearest second) and whether it is exact. */
function duration(minutes: Q): { text: string; exact: boolean } {
  const secQ = frac(minutes.n * 60, minutes.d);
  const s = Math.round(valQ(secQ));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const sec = s % 60;
  const parts: string[] = [];
  if (h) parts.push(`${h} h`);
  if (m || (h && sec)) parts.push(`${m} min`);
  if (sec) parts.push(`${sec} s`);
  return { text: parts.join(" ") || "0 min", exact: secQ.d === 1 };
}

/** "1 h 15 min" or "≈ 17 min 9 s". */
function durationText(minutes: Q): string {
  const r = duration(minutes);
  return (r.exact ? "" : "≈ ") + r.text;
}

/** True when a time in minutes is a whole number of hours. */
const wholeHours = (minutes: Q) => minutes.d === 1 && minutes.n % 60 === 0;

/**
 * Hours as an exact decimal (≤ 3 d.p.), an exact fraction / mixed number when
 * the denominator is friendly, otherwise a decimal cut off at 4 d.p. with "…".
 */
function Hours({ q }: { q: Q }) {
  if (terminatesIn(q, 3) !== null) return <>{decText(q, 3)}</>;
  if (q.d <= 60) return <M>{fracMarkup(q)}</M>;
  return <>{(Math.floor(valQ(q) * 10000) / 10000).toFixed(4)}…</>;
}

/** 24-hour clock time from minutes after midnight on the start day. */
function clockText(totalMin: number): string {
  const day = Math.floor(totalMin / 1440);
  const m = ((totalMin % 1440) + 1440) % 1440;
  const hh = String(Math.floor(m / 60)).padStart(2, "0");
  const mm = String(m % 60).padStart(2, "0");
  return `${hh}:${mm}${day === 1 ? " (next day)" : day > 1 ? ` (+${day} days)` : ""}`;
}

function LegControls({
  n,
  tone,
  dist,
  speed,
  onDist,
  onSpeed,
}: {
  n: number;
  tone: "brand" | "accent";
  dist: number;
  speed: number;
  onDist: (v: number) => void;
  onSpeed: (v: number) => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-line p-3">
      <p className="flex items-center gap-2 text-sm font-extrabold text-ink">
        <span aria-hidden className={`inline-block h-3 w-3 rounded-full ${tone === "brand" ? "bg-brand" : "bg-accent"}`} />
        Leg {n}
      </p>
      <NudgeSlider name={`Leg ${n} distance`} label="Distance" value={dist} min={1} max={60} onChange={onDist} format={(v) => `${v} km`} />
      <NudgeSlider name={`Leg ${n} speed`} label="Speed" value={speed} min={5} max={120} step={5} onChange={onSpeed} format={(v) => `${v} km/h`} />
    </div>
  );
}

const X_STEPS = [5, 10, 15, 20, 30, 60, 90, 120, 180, 240, 360];
const Y_STEPS = [1, 2, 5, 10, 20, 25, 50];

function JourneyLab() {
  const [J, setJ] = useState<Journey>(JOURNEYS[0].j);
  const [start, setStart] = useState(8 * 60); // 08:00
  const set = (patch: Partial<Journey>) => setJ((old) => ({ ...old, ...patch }));
  const { d1, s1, rest, d2, s2 } = J;

  // ---- exact arithmetic (times in minutes, speeds in km/h) ----
  const t1 = frac(60 * d1, s1);
  const t2 = frac(60 * d2, s2);
  const T = addQ(addQ(t1, frac(rest, 1)), t2);
  const D = d1 + d2;
  const Th = frac(T.n, T.d * 60); // hours
  const avg = frac(60 * D * T.d, T.n); // km/h
  const avgMs = frac(avg.n * 5, avg.d * 18); // m/s (× 1000 ÷ 3600)
  const mean = frac(s1 + s2, 2);
  const avgIsMean = avg.n * mean.d === mean.n * avg.d;
  const avgText = decText(avg, 2, 2);
  const msText = decText(avgMs, 2, 2);
  const meanText = decText(mean, 1, 1);
  const cmpT = t1.n * t2.d - t2.n * t1.d; // > 0 → leg 1 takes longer
  const exactArrival = T.d === 1;
  const arrive = start + Math.round(valQ(T));

  // ---- graph geometry ----
  const GL = 46;
  const GR = 346;
  const GT = 14;
  const GB = 196;
  const Tm = valQ(T);
  const xStep = X_STEPS.find((s) => Math.ceil(Tm / s - 1e-9) <= 8) ?? 360;
  const xMax = xStep * Math.max(1, Math.ceil(Tm / xStep - 1e-9));
  const yStep = Y_STEPS.find((s) => Math.ceil(D / s - 1e-9) <= 6) ?? 50;
  const yMax = yStep * Math.max(1, Math.ceil(D / yStep - 1e-9));
  const gx = (min: number) => GL + (min / xMax) * (GR - GL);
  const gy = (km: number) => GB - (km / yMax) * (GB - GT);
  const inHours = xStep >= 60;
  const xTicks = Array.from({ length: Math.round(xMax / xStep) + 1 }, (_, i) => i * xStep);
  const yTicks = Array.from({ length: Math.round(yMax / yStep) + 1 }, (_, i) => i * yStep);
  const A = { x: gx(valQ(t1)), y: gy(d1) };
  const Bp = { x: gx(valQ(t1) + rest), y: gy(d1) };
  const C = { x: gx(Tm), y: gy(D) };
  const O = { x: gx(0), y: gy(0) };

  const aria =
    `Distance–time graph. Leg 1: ${d1} km at ${s1} km per hour, taking ${durationText(t1)}. ` +
    (rest ? `Then a flat section: a ${rest} minute rest. ` : "") +
    `Leg 2: ${d2} km at ${s2} km per hour, taking ${durationText(t2)}. ` +
    `A dashed line from the start to the finish has gradient equal to the average speed, ${avgText} km per hour.`;

  // ---- explanation of why the average is (or isn't) the mean ----
  let why: ReactNode;
  const longer = cmpT > 0 ? 1 : 2;
  const longS = cmpT > 0 ? s1 : s2;
  const shortS = cmpT > 0 ? s2 : s1;
  if (avgIsMean && s1 === s2 && rest === 0) {
    why = <>Both legs go at the same speed, so the average is {s1} km/h too.</>;
  } else if (avgIsMean && rest === 0) {
    why = (
      <>
        Here the average <strong>does</strong> equal the mean of the two speeds, {meanText} km/h, because both legs take the same time (
        {durationText(t1)} each). With no stop and two different speeds, equal times is the only way this happens.
      </>
    );
  } else if (avgIsMean) {
    why = (
      <>
        Here the average happens to equal the mean of the two speeds ({meanText} km/h): the rest stop pulls the average down, but you spend longer
        on the faster leg, which pulls it up by exactly the same amount.
      </>
    );
  } else if (rest > 0) {
    why = (
      <>
        It is <strong>not</strong> the mean of the two speeds ({meanText} km/h). The rest stop counts as {rest} minutes at 0 km/h, which drags the
        average down.
        {s1 !== s2 && cmpT !== 0 ? ` You also spend longer on leg ${longer}, so its speed of ${longS} km/h counts for more of the time.` : ""}
      </>
    );
  } else {
    why = (
      <>
        It is <strong>not</strong> the mean of the two speeds ({meanText} km/h). You spend longer on leg {longer} ({durationText(cmpT > 0 ? t1 : t2)}{" "}
        vs {durationText(cmpT > 0 ? t2 : t1)}), so its speed of {longS} km/h counts for more of the time and pulls the average{" "}
        {longS < shortS ? "down" : "up"}.
      </>
    );
  }

  const caption = (
    <div className="space-y-2">
      <p>
        Each leg is a straight line because the speed is constant. The <strong>steeper</strong> the line, the <strong>faster</strong>: the gradient
        of a distance–time graph is the speed.{rest ? " The flat part is the rest stop — time passes but the distance doesn’t change." : ""}
      </p>
      <p>
        The dashed line joins start to finish. Its gradient is the <strong>average speed</strong> = total distance ÷ total time = {D} km ÷{" "}
        <Hours q={Th} /> h {eq(avgText)} km/h. {why}
      </p>
    </div>
  );

  const legRows = (n: number, d: number, s: number, t: Q) => (
    <li>
      Leg {n}: time = distance ÷ speed = {d} ÷ {s} = <Hours q={frac(d, s)} /> h
      {wholeHours(t) ? "" : ` ${eq(durationText(t))}`}
    </li>
  );
  const parts = [duration(t1), ...(rest ? [duration(frac(rest, 1))] : []), duration(t2)];
  const sumApprox = parts.some((x) => !x.exact) || !duration(T).exact;
  const rel = sumApprox ? "≈" : "=";

  return (
    <WidgetFrame
      title="Journey lab"
      tryThis={[
        "Choose “There and back”: 30 km at 60 km/h, then 30 km at 40 km/h. Predict the average speed before you look. Is it 50 km/h?",
        "Find settings where the average speed *does* equal the mean of the two speeds. What do the two legs have in common?",
        "Add a 30-minute rest stop. Which part of the graph shows it, and what happens to the average speed?",
        "Set leg 1 to 30 km at 30 km/h and leg 2 to 30 km. Can any speed for leg 2 make the average 60 km/h? Explain why or why not.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Example journeys">
          {JOURNEYS.map((x) => (
            <button key={x.label} type="button" className="btn btn-secondary text-sm" onClick={() => setJ(x.j)}>
              {x.label}
            </button>
          ))}
        </div>

        <svg viewBox="0 0 360 236" className="h-auto w-full" role="img" aria-label={aria}>
          {xTicks.map((v) => (
            <line key={`gx${v}`} x1={gx(v)} x2={gx(v)} y1={GT} y2={GB} className="stroke-line" strokeWidth={1} />
          ))}
          {yTicks.map((v) => (
            <line key={`gy${v}`} x1={GL} x2={GR} y1={gy(v)} y2={gy(v)} className="stroke-line" strokeWidth={1} />
          ))}
          <line x1={GL} x2={GR} y1={GB} y2={GB} className="stroke-ink-2" strokeWidth={1.5} />
          <line x1={GL} x2={GL} y1={GT} y2={GB} className="stroke-ink-2" strokeWidth={1.5} />
          {xTicks.map((v) => (
            <text key={`lx${v}`} x={gx(v)} y={GB + 14} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {inHours ? String(v / 60) : String(v)}
            </text>
          ))}
          {yTicks.map((v) => (
            <text key={`ly${v}`} x={GL - 6} y={gy(v) + 3} fontSize={10} textAnchor="end" className="fill-ink-2">
              {v}
            </text>
          ))}
          <text x={(GL + GR) / 2} y={GB + 32} fontSize={11} textAnchor="middle" className="fill-ink-2">
            {inHours ? "time (hours)" : "time (minutes)"}
          </text>
          <text
            x={12}
            y={(GT + GB) / 2}
            fontSize={11}
            textAnchor="middle"
            transform={`rotate(-90 12 ${(GT + GB) / 2})`}
            className="fill-ink-2"
          >
            distance (km)
          </text>

          {/* average-speed line */}
          <line x1={O.x} y1={O.y} x2={C.x} y2={C.y} className="stroke-good" strokeWidth={2} strokeDasharray="6 4" />

          {/* the journey */}
          <line x1={O.x} y1={O.y} x2={A.x} y2={A.y} className="stroke-brand" strokeWidth={3} strokeLinecap="round" />
          {rest ? <line x1={A.x} y1={A.y} x2={Bp.x} y2={Bp.y} className="stroke-ink-2" strokeWidth={3} strokeLinecap="round" /> : null}
          <line x1={Bp.x} y1={Bp.y} x2={C.x} y2={C.y} className="stroke-accent" strokeWidth={3} strokeLinecap="round" />
          {rest && Bp.x - A.x > 26 ? (
            <text x={(A.x + Bp.x) / 2} y={A.y - 6} fontSize={10} textAnchor="middle" className="fill-ink-2">
              rest
            </text>
          ) : null}

          {/* leg markers */}
          {[
            { k: 1, x: (O.x + A.x) / 2, y: (O.y + A.y) / 2, cls: "stroke-brand" },
            { k: 2, x: (Bp.x + C.x) / 2, y: (Bp.y + C.y) / 2, cls: "stroke-accent" },
          ].map((m) => (
            <g key={`m${m.k}`}>
              <circle cx={m.x} cy={m.y} r={8} className={`fill-surface ${m.cls}`} strokeWidth={2} />
              <text x={m.x} y={m.y + 3.5} fontSize={10} fontWeight={800} textAnchor="middle" className="fill-ink">
                {m.k}
              </text>
            </g>
          ))}
          <circle cx={C.x} cy={C.y} r={4} className="fill-good" />
        </svg>
        <p className="-mt-2 text-xs text-ink-2">
          Solid = the journey (leg 1, {rest ? "rest, " : ""}leg 2). Green dashes = start to finish: its gradient is the average speed.
        </p>

        <div className="grid gap-3 sm:grid-cols-2">
          <LegControls n={1} tone="brand" dist={d1} speed={s1} onDist={(v) => set({ d1: v })} onSpeed={(v) => set({ s1: v })} />
          <LegControls n={2} tone="accent" dist={d2} speed={s2} onDist={(v) => set({ d2: v })} onSpeed={(v) => set({ s2: v })} />
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <NudgeSlider name="Rest stop" label="Rest stop between legs" value={rest} min={0} max={60} step={5} onChange={(v) => set({ rest: v })} format={(v) => `${v} min`} />
          <NudgeSlider name="Leave at" label="Leave at (24-hour clock)" value={start} min={0} max={1425} step={15} onChange={setStart} format={clockText} />
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          <Readout label="Total distance" value={`${D} km`} tone="ink" />
          <Readout label="Total time" value={durationText(T)} tone="ink" />
          <Readout label="Arrive at" value={`${exactArrival ? "" : "≈ "}${clockText(arrive)}`} tone="ink" />
          <Readout label="Average speed" value={`${avgText} km/h`} tone="good" />
          <Readout label="Average in m/s" value={`${msText} m/s`} tone="good" />
          <Readout label="Mean of speeds" value={`${meanText} km/h`} tone={avgIsMean ? "good" : "bad"} />
        </div>

        <div className="rounded-xl border border-line p-3 text-sm text-ink-2">
          <p className="font-bold text-ink">Method</p>
          <ol className="mt-1 list-decimal space-y-1 pl-5 tabular-nums">
            {legRows(1, d1, s1, t1)}
            {legRows(2, d2, s2, t2)}
            <li>
              Total time {rel} {parts.map((x) => x.text).join(" + ")} {rel} {duration(T).text}
              {wholeHours(T) ? (
                ""
              ) : (
                <>
                  {" "}= <Hours q={Th} /> h
                </>
              )}
            </li>
            <li>
              Total distance = {d1} + {d2} = {D} km
            </li>
            <li>
              Average speed = total distance ÷ total time = {D} ÷ <Hours q={Th} /> {eq(avgText)} km/h
            </li>
            <li>
              In m/s: {avgText.replace("≈ ", "")} ÷ 3.6 {eq(msText)} m/s (because 1 km/h = 1000 m ÷ 3600 s)
            </li>
          </ol>
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "unit-zoom",
    title: "Unit zoom",
    blurb: "Zoom into a metre, a square metre and a cubic metre to see why area and volume conversions use 100² and 100³.",
    Component: UnitZoom,
  },
  {
    id: "journey-lab",
    title: "Journey lab",
    blurb: "Build a two-leg journey on a distance–time graph and discover why average speed is not the mean of the speeds.",
    Component: JourneyLab,
  },
];
