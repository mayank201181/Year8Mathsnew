"use client";
// Interactive explorables for "Averages, Range & Comparing Data".
//  1. Averages balance — a dot plot you edit. The mean is drawn as the pivot
//     the number line balances on, the median as the middle of the sorted
//     values, with the mode, range and possible outliers marked live. The
//     working switches between a sorted list and a frequency table (f × x
//     column), and a "work backwards" panel finds the value that gives a
//     target mean.
//  2. Compare two groups — two data sets in context, drawn as dot plots or a
//     back-to-back stem-and-leaf diagram. Shift or stretch one group and
//     watch its averages and range respond; predict first, then read a model
//     comparison (one average + the range, in context, with caveats about
//     outliers and sample size).
import { useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Stepper, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Helpers (exact where it matters)                                           */
/* ------------------------------------------------------------------------ */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to `dp` places, drop trailing zeros, use a real minus sign. */
function fmt(v: number, dp = 2): string {
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

/** "6" for an exact value, "≈7.86" for a rounded one. */
function approx(v: number, dp = 2): string {
  return (exactTo(v, dp) ? "" : "≈") + fmt(v, dp);
}

/** "= 6" for an exact value, "≈ 7.86" for a rounded one. */
function eqText(v: number, dp = 2): string {
  return exactTo(v, dp) ? `= ${fmt(v, dp)}` : `≈ ${fmt(v, dp)}`;
}

function ordinal(n: number): string {
  const t = n % 100;
  if (t >= 11 && t <= 13) return `${n}th`;
  if (n % 10 === 1) return `${n}st`;
  if (n % 10 === 2) return `${n}nd`;
  if (n % 10 === 3) return `${n}rd`;
  return `${n}th`;
}

/** "2", "2 and 9", "2, 5 and 9". */
function listAnd(xs: string[]): string {
  if (xs.length <= 1) return xs[0] ?? "";
  return `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

function signed(v: number): string {
  return v > 0 ? `+${v}` : v < 0 ? `−${-v}` : "0";
}

function medianOf(sorted: number[]): number {
  const n = sorted.length;
  if (!n) return 0;
  const h = Math.floor(n / 2);
  return n % 2 ? sorted[h] : (sorted[h - 1] + sorted[h]) / 2;
}

/**
 * Values far from the rest: beyond 1.5 × IQR from the quartiles (quartiles =
 * medians of the lower and upper halves) AND at least 3 units beyond them, so
 * tightly bunched data doesn't flag ordinary neighbours.
 */
function outliersOf(sorted: number[]): number[] {
  const n = sorted.length;
  if (n < 5) return [];
  const h = Math.floor(n / 2);
  const q1 = medianOf(sorted.slice(0, h));
  const q3 = medianOf(sorted.slice(n % 2 ? h + 1 : h));
  const reach = Math.max(1.5 * (q3 - q1), 3);
  return [...new Set(sorted.filter((v) => v < q1 - reach || v > q3 + reach))];
}

interface Stats {
  n: number;
  total: number;
  mean: number;
  sorted: number[];
  median: number;
  /** Empty when there is no mode (every value equally common). */
  modes: number[];
  freq: Map<number, number>;
  min: number;
  max: number;
  range: number;
  outliers: number[];
}

function stats(values: number[]): Stats {
  const sorted = [...values].sort((a, b) => a - b);
  const n = sorted.length;
  const total = sorted.reduce((s, v) => s + v, 0);
  const freq = new Map<number, number>();
  for (const v of sorted) freq.set(v, (freq.get(v) ?? 0) + 1);
  const top = n ? Math.max(...freq.values()) : 0;
  let modes = [...freq.entries()].filter(([, f]) => f === top).map(([v]) => v);
  if (freq.size > 1 && modes.length === freq.size) modes = [];
  const min = sorted[0] ?? 0;
  const max = sorted[n - 1] ?? 0;
  return {
    n,
    total,
    mean: n ? total / n : 0,
    sorted,
    median: medianOf(sorted),
    modes,
    freq,
    min,
    max,
    range: max - min,
    outliers: outliersOf(sorted),
  };
}

function modeText(st: Stats): string {
  if (!st.modes.length) return "none";
  return listAnd(st.modes.map((v) => fmt(v)));
}

/** 0-based positions of the middle value(s) in a sorted list of n values. */
function middleIndexes(n: number): number[] {
  if (!n) return [];
  return n % 2 ? [(n - 1) / 2] : [n / 2 - 1, n / 2];
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
/* 1. Averages balance                                                        */
/* ------------------------------------------------------------------------ */

interface Dot {
  id: number;
  v: number;
}

const LO = 0;
const HI = 20;
const MIN_N = 2;
const MAX_N = 15;

const LAB_PRESETS: { key: string; label: string; values: number[] }[] = [
  { key: "start", label: "Start again", values: [2, 4, 5, 5, 7, 9, 10] },
  { key: "outlier", label: "With an outlier", values: [3, 4, 5, 5, 6, 7, 19] },
  { key: "even", label: "Even count", values: [2, 3, 6, 8, 8, 9] },
  { key: "bimodal", label: "Two modes", values: [2, 2, 2, 5, 9, 9, 9, 10] },
];

const toDots = (values: number[]): Dot[] => values.map((v, i) => ({ id: i + 1, v }));

function AveragesBalance() {
  const [dots, setDots] = useState<Dot[]>(() => toDots(LAB_PRESETS[0].values));
  const [sel, setSel] = useState<number>(LAB_PRESETS[0].values.length);
  const [view, setView] = useState<"list" | "table">("list");
  const [target, setTarget] = useState(7);

  const st = stats(dots.map((d) => d.v));
  const { n, total, mean, median, sorted } = st;
  const selDot = dots.find((d) => d.id === sel) ?? null;
  const nextId = dots.reduce((m, d) => Math.max(m, d.id), 0) + 1;

  const loadPreset = (values: number[]) => {
    setDots(toDots(values));
    setSel(values.length); // presets are sorted, so this is the largest value
  };
  const setValue = (v: number) => setDots((ds) => ds.map((d) => (d.id === sel ? { ...d, v } : d)));
  const addValue = (v: number) => {
    if (dots.length >= MAX_N) return;
    setDots((ds) => [...ds, { id: nextId, v }]);
    setSel(nextId);
  };
  const removeSel = () => {
    if (dots.length <= MIN_N || !selDot) return;
    const rest = dots.filter((d) => d.id !== selDot.id);
    const near = rest.reduce((best, d) => (Math.abs(d.v - selDot.v) < Math.abs(best.v - selDot.v) ? d : best), rest[0]);
    setDots(rest);
    setSel(near.id);
  };

  // ---- stacking for the dot plot ----
  const ordered = [...dots].sort((a, b) => a.v - b.v || a.id - b.id);
  const level = new Map<number, number>();
  const seen = new Map<number, number>();
  for (const d of ordered) {
    const k = seen.get(d.v) ?? 0;
    level.set(d.id, k);
    seen.set(d.v, k + 1);
  }
  const maxF = Math.max(1, ...seen.values());

  // ---- the balance: shortfall below the mean = overshoot above it ----
  // mean − v = (total − n·v) / n, so the numerators are whole numbers: exact.
  let belowNum = 0;
  let aboveNum = 0;
  for (const v of sorted) {
    if (n * v < total) belowNum += total - n * v;
    else aboveNum += n * v - total;
  }
  const shortBy = belowNum / n;
  const overBy = aboveNum / n; // always equal to shortBy
  const countBelow = sorted.filter((v) => n * v < total).length;
  const countAbove = sorted.filter((v) => n * v > total).length;

  // ---- geometry ----
  const W = 360;
  const X0 = 20;
  const X1 = 340;
  const U = (X1 - X0) / (HI - LO);
  const px = (v: number) => X0 + (v - LO) * U;
  const R = 6.5;
  const DY = 14;
  const plotTop = 46;
  const yAxis = plotTop + Math.max(4, maxF) * DY + 4;
  const H = yAxis + 44;
  const cy = (k: number) => yAxis - 4 - R - k * DY;
  const mx = px(mean);
  const medX = px(median);
  const ticks: number[] = [];
  for (let t = LO; t <= HI; t++) ticks.push(t);
  const rangeMid = clamp((px(st.min) + px(st.max)) / 2, 80, W - 80);

  const aria =
    `Dot plot of ${n} values from ${LO} to ${HI}: ${sorted.join(", ")}. ` +
    `Mean ${eqText(mean)}, shown as the balance point under the number line. Median ${fmt(median)}. ` +
    `Mode ${modeText(st)}. Range ${st.range}.` +
    (st.outliers.length ? ` Possible outlier${st.outliers.length > 1 ? "s" : ""}: ${st.outliers.join(", ")}.` : "");

  // ---- working backwards ----
  const needTotal = target * (n + 1);
  const needed = needTotal - total;
  const canAdd = n < MAX_N && needed >= LO && needed <= HI;

  // ---- median description ----
  const mids = middleIndexes(n);
  const medianWorking =
    n % 2 ? (
      <>
        {n} values, so the median is the <M>{`(${n}+1)/2`}</M> = {ordinal((n + 1) / 2)} value: <strong>{fmt(median)}</strong>
      </>
    ) : (
      <>
        {n} values, so the median is the <M>{`(${n}+1)/2`}</M> = {fmt((n + 1) / 2)}th value — halfway between the {ordinal(n / 2)} and{" "}
        {ordinal(n / 2 + 1)}: ({sorted[mids[0]]} + {sorted[mids[1]]}) ÷ 2 = <strong>{fmt(median)}</strong>
      </>
    );
  const topF = st.modes.length ? (st.freq.get(st.modes[0]) ?? 0) : 0;
  const modeWorking = !st.modes.length ? (
    <>
      none — {st.freq.size === n ? "every value appears once" : "every value appears equally often"}
    </>
  ) : st.modes.length === 1 ? (
    <>
      <strong>{fmt(st.modes[0])}</strong> (it appears {topF} time{topF > 1 ? "s" : ""})
    </>
  ) : (
    <>
      <strong>{modeText(st)}</strong> (each appears {topF} times) — {st.modes.length === 2 ? "two modes" : `${st.modes.length} modes`}
    </>
  );

  // ---- frequency table rows ----
  const rows: { x: number; f: number; from: number; to: number }[] = [];
  {
    let pos = 1;
    for (const [x, f] of [...st.freq.entries()].sort((a, b) => a[0] - b[0])) {
      rows.push({ x, f, from: pos, to: pos + f - 1 });
      pos += f;
    }
  }
  const midPositions = mids.map((i) => i + 1);
  const isMedianRow = (r: { from: number; to: number }) => midPositions.some((p) => p >= r.from && p <= r.to);

  // ---- live caption ----
  const hiOut = st.outliers.filter((v) => v > median);
  const loOut = st.outliers.filter((v) => v < median);
  let shape: ReactNode;
  if (hiOut.length && loOut.length) {
    shape = (
      <>
        There are values far from the rest at <em>both</em> ends ({listAnd(st.outliers.map(String))}). Their pulls on the mean partly cancel, but
        they stretch the range to {st.range}, which makes the range a poor guide to how spread out most of the data is.
      </>
    );
  } else if (hiOut.length || loOut.length) {
    const out = hiOut.length ? hiOut : loOut;
    const up = hiOut.length > 0;
    const plural = out.length > 1;
    shape = (
      <>
        {listAnd(out.map(String))} {plural ? "are" : "is"} far {up ? "above" : "below"} the rest — {plural ? "possible outliers" : "a possible outlier"}.{" "}
        {plural ? "They drag" : "It drags"} the mean {up ? "up" : "down"} to {approx(mean)}, {up ? "above" : "below"}{" "}
        {up ? countBelow : countAbove} of the {n} values, and stretch{plural ? "" : "es"} the range to {st.range} — yet the median stays at{" "}
        {fmt(median)}. Here the <strong>median</strong> is the fairer “typical” value.
      </>
    );
  } else if (Math.abs(mean - median) < 0.5) {
    shape = <>The mean and median are close, so the data are fairly balanced about the middle — either is a fair average here.</>;
  } else if (mean > median) {
    shape = (
      <>
        The mean is above the median: altogether, the values above the middle lie further from it than the values below do. The mean feels those
        distances; the median only cares about order.
      </>
    );
  } else {
    shape = (
      <>
        The mean is below the median: altogether, the values below the middle lie further from it than the values above do. The mean feels those
        distances; the median only cares about order.
      </>
    );
  }
  const modeNote =
    st.modes.length >= 2 ? (
      <> There are {st.modes.length} modes, so the mode alone is a poor summary of these data.</>
    ) : !st.modes.length ? (
      <> There is no mode: no value appears more often than the others.</>
    ) : null;

  const caption = (
    <>
      <p>
        <strong>Mean {eqText(mean)}</strong> is the balance point.{" "}
        {belowNum === 0 ? (
          <>Every value equals the mean, so there is nothing to balance.</>
        ) : (
          <>
            The values below it fall short by {approx(shortBy)} altogether and the values above it overshoot by {approx(overBy)}, so the line balances on
            the ▲.
          </>
        )}{" "}
        <strong>Median = {fmt(median)}</strong> is the middle of the {n} sorted values: it depends only on order, not on how extreme the end values
        are.
      </p>
      <p className="mt-2">
        {shape}
        {modeNote}
      </p>
    </>
  );

  return (
    <WidgetFrame
      title="Averages balance"
      tryThis={[
        "Move the largest value up to 20. Which average moves the most — and which hardly moves at all?",
        "Make the mean exactly 8 without changing the median.",
        "Predict the value you must add to make the mean 7. Then use *Work backwards* to check.",
        "Can you make the mean, median and mode all equal, with a range of at least 10?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {LAB_PRESETS.map((p) => (
            <button key={p.key} type="button" className="btn btn-secondary btn-sm" onClick={() => loadPreset(p.values)}>
              {p.label}
            </button>
          ))}
        </div>

        <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={aria}>
          {/* range bracket */}
          <path d={`M${px(st.min)} 27 V22 H${px(st.max)} V27`} fill="none" className="stroke-ink-2" strokeWidth={1.5} />
          <text x={rangeMid} y={14} fontSize={11} textAnchor="middle" className="fill-ink-2">
            range = {st.max} − {st.min} = {st.range}
          </text>
          {/* median */}
          <line x1={medX} x2={medX} y1={plotTop - 4} y2={yAxis} className="stroke-good" strokeWidth={2} strokeDasharray="4 3" />
          <text x={clamp(medX, 48, W - 48)} y={plotTop - 8} fontSize={11} fontWeight={800} textAnchor="middle" className="fill-good">
            median = {fmt(median)}
          </text>
          {/* the beam (number line) */}
          <line x1={X0 - 8} x2={X1 + 8} y1={yAxis} y2={yAxis} className="stroke-ink" strokeWidth={2.5} strokeLinecap="round" />
          {ticks.map((t) => (
            <g key={`t${t}`}>
              <line x1={px(t)} x2={px(t)} y1={yAxis} y2={yAxis + 4} className="stroke-ink-2" strokeWidth={1} />
              {Math.abs(px(t) - mx) >= (t >= 10 ? 14 : 11) ? (
                <text x={px(t)} y={yAxis + 15} fontSize={10} textAnchor="middle" className="fill-ink-2">
                  {t}
                </text>
              ) : null}
            </g>
          ))}
          {/* dots */}
          {ordered.map((d) => {
            const isOut = st.outliers.includes(d.v);
            const isMode = st.modes.includes(d.v);
            const cls = isOut ? "fill-bad" : isMode ? "fill-accent" : "fill-brand";
            return (
              <circle
                key={d.id}
                cx={px(d.v)}
                cy={cy(level.get(d.id) ?? 0)}
                r={R}
                className={`${cls} stroke-surface cursor-pointer`}
                strokeWidth={1.5}
                onClick={() => setSel(d.id)}
              />
            );
          })}
          {selDot ? (
            <circle cx={px(selDot.v)} cy={cy(level.get(selDot.id) ?? 0)} r={R + 3} fill="none" className="stroke-ink" strokeWidth={2} />
          ) : null}
          {/* the mean: a pivot under the beam */}
          <polygon points={`${mx},${yAxis + 1.5} ${mx - 8},${yAxis + 16} ${mx + 8},${yAxis + 16}`} className="fill-brand" />
          <text x={clamp(mx, 95, W - 95)} y={yAxis + 32} fontSize={11} fontWeight={800} textAnchor="middle" className="fill-brand">
            mean {eqText(mean)} (balance point)
          </text>
        </svg>

        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-ink-2" aria-hidden>
          <span>
            <span className="text-brand">●</span> value
          </span>
          <span>
            <span className="text-accent">●</span> mode
          </span>
          <span>
            <span className="text-bad">●</span> possible outlier
          </span>
          <span>
            <span className="text-good">┆</span> median
          </span>
          <span>
            <span className="text-brand">▲</span> mean
          </span>
        </div>

        <div className="space-y-2">
          <p className="text-sm font-semibold text-ink-2">Values in order — tap one to select it:</p>
          <div className="flex flex-wrap gap-1.5">
            {ordered.map((d) => {
              const on = d.id === sel;
              return (
                <button
                  key={d.id}
                  type="button"
                  className={`kbd h-10 min-w-10 tabular-nums ${on ? "bg-brand text-brand-ink" : ""}`}
                  aria-pressed={on}
                  aria-label={`Value ${d.v}${on ? ", selected" : ""}`}
                  onClick={() => setSel(d.id)}
                >
                  {d.v}
                </button>
              );
            })}
          </div>
          {selDot ? (
            <NudgeSlider name="Selected value" label="Selected value" value={selDot.v} min={LO} max={HI} onChange={setValue} />
          ) : null}
          <div className="flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => addValue(selDot ? selDot.v : 10)} disabled={n >= MAX_N}>
              + Add a value
            </button>
            <button type="button" className="btn btn-secondary btn-sm" onClick={removeSel} disabled={n <= MIN_N || !selDot}>
              − Remove selected
            </button>
            <span className="self-center text-xs text-ink-2">
              {n} values ({MIN_N}–{MAX_N} allowed)
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="Mean" value={approx(mean)} />
          <Readout label="Median" value={fmt(median)} tone="good" />
          <Readout label="Mode" value={modeText(st)} tone="ink" />
          <Readout label="Range" value={st.range} tone="ink" />
        </div>

        <div className="space-y-3 rounded-xl border border-line p-3 text-sm text-ink-2">
          <Segmented<"list" | "table">
            label="Show the working as"
            value={view}
            onChange={setView}
            options={[
              { value: "list", label: "Sorted list" },
              { value: "table", label: "Frequency table" },
            ]}
          />
          {view === "list" ? (
            <>
              <div className="flex flex-wrap gap-1" role="group" aria-label="Values in order, middle highlighted">
                {sorted.map((v, i) => (
                  <span
                    key={i}
                    className={`min-w-8 rounded-md px-1.5 py-0.5 text-center tabular-nums ${mids.includes(i) ? "bg-good-soft font-extrabold text-good" : "bg-surface-2 text-ink"}`}
                  >
                    {v}
                  </span>
                ))}
              </div>
              <ul className="space-y-1">
                <li>
                  <span className="font-bold text-ink">Mean</span> = ({sorted.join(" + ")}) ÷ {n} = {total} ÷ {n} <strong>{eqText(mean)}</strong>
                  {exactTo(mean, 2) ? null : " (2 d.p.)"}
                </li>
                <li>
                  <span className="font-bold text-ink">Median:</span> {medianWorking}
                </li>
                <li>
                  <span className="font-bold text-ink">Mode:</span> {modeWorking}
                </li>
                <li>
                  <span className="font-bold text-ink">Range</span> = largest − smallest = {st.max} − {st.min} = <strong>{st.range}</strong>
                </li>
              </ul>
            </>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-center tabular-nums">
                  <thead>
                    <tr className="bg-surface-2 text-ink">
                      <th className="border border-line px-2 py-1">Value <M>{"x"}</M></th>
                      <th className="border border-line px-2 py-1">Frequency <M>{"f"}</M></th>
                      <th className="border border-line px-2 py-1">
                        <M>{"f * x"}</M>
                      </th>
                      <th className="border border-line px-2 py-1">Positions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => (
                      <tr key={r.x} className={isMedianRow(r) ? "bg-good-soft font-bold text-good" : "text-ink"}>
                        <td className="border border-line px-2 py-1">{r.x}</td>
                        <td className="border border-line px-2 py-1">{r.f}</td>
                        <td className="border border-line px-2 py-1">{r.f * r.x}</td>
                        <td className="border border-line px-2 py-1">{r.from === r.to ? ordinal(r.from) : `${ordinal(r.from)}–${ordinal(r.to)}`}</td>
                      </tr>
                    ))}
                    <tr className="font-extrabold text-ink">
                      <td className="border border-line px-2 py-1">Total</td>
                      <td className="border border-line px-2 py-1">{n}</td>
                      <td className="border border-line px-2 py-1">{total}</td>
                      <td className="border border-line px-2 py-1" />
                    </tr>
                  </tbody>
                </table>
              </div>
              <ul className="space-y-1">
                <li>
                  <span className="font-bold text-ink">Mean</span> = total of <M>{"f * x"}</M> ÷ total frequency = {total} ÷ {n} <strong>{eqText(mean)}</strong>
                  {rows.length !== n ? (
                    <span className="text-bad">
                      {" "}
                      — divide by {n} (the total frequency), not by {rows.length} (the number of rows).
                    </span>
                  ) : null}
                </li>
                <li>
                  <span className="font-bold text-ink">Median:</span>{" "}
                  {n % 2 ? (
                    <>
                      the {ordinal((n + 1) / 2)} value, which is in the row for <strong>{fmt(median)}</strong>
                    </>
                  ) : (
                    <>
                      halfway between the {ordinal(n / 2)} and {ordinal(n / 2 + 1)} values: ({sorted[mids[0]]} + {sorted[mids[1]]}) ÷ 2 ={" "}
                      <strong>{fmt(median)}</strong>
                    </>
                  )}
                </li>
                <li>
                  <span className="font-bold text-ink">Mode:</span> the value with the highest frequency — {modeWorking}. The mode is the{" "}
                  <em>value</em>, not its frequency.
                </li>
              </ul>
            </>
          )}
        </div>

        <div className="space-y-2 rounded-xl border border-line p-3 text-sm text-ink-2">
          <p className="font-bold text-ink">Work backwards: add one value to hit a target mean</p>
          <Stepper label="Target mean" value={target} min={LO} max={HI} onChange={setTarget} />
          <p>
            With {n + 1} values and a mean of {target}, the total must be {target} × {n + 1} = <strong>{needTotal}</strong>. The total now is {total}, so
            the new value must be {needTotal} − {total} = <strong className={canAdd ? "text-good" : "text-bad"}>{fmt(needed)}</strong>.
          </p>
          {canAdd ? (
            <button type="button" className="btn btn-primary btn-sm" onClick={() => addValue(needed)}>
              Add {needed} and check
            </button>
          ) : n >= MAX_N ? (
            <p className="text-bad">This lab holds at most {MAX_N} values — remove one first.</p>
          ) : (
            <p className="text-bad">
              {fmt(needed)} is off this {LO}–{HI} scale, so you can’t reach a mean of {target} by adding just one value here.
            </p>
          )}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Compare two groups                                                      */
/* ------------------------------------------------------------------------ */

type PresetKey = "quiz" | "bus" | "fitness";
type AvgKind = "mean" | "median";

interface ComparePreset {
  key: PresetKey;
  label: string;
  title: string;
  setting: string;
  unit: string;
  lo: number;
  hi: number;
  a: { name: string; values: number[] };
  b: { name: string; values: number[] };
  higherIsBetter: boolean;
  /** "On average, X ___" */
  winVerb: string;
  /** "X's ___ were more consistent" */
  what: string;
}

// Axis limits are chosen so that group B still fits after the widest stretch (× 1.5).
const COMPARE_PRESETS: ComparePreset[] = [
  {
    key: "quiz",
    label: "Quiz scores",
    title: "Maths quiz scores (out of 50)",
    setting: "Two Year 8 classes sat the same quiz.",
    unit: "marks",
    lo: 10,
    hi: 50,
    a: { name: "8A", values: [22, 24, 25, 26, 26, 27, 28, 29, 29, 30, 31, 33] },
    b: { name: "8B", values: [17, 20, 23, 27, 29, 30, 31, 32, 34, 35, 38, 41] },
    higherIsBetter: true,
    winVerb: "scored higher",
    what: "scores",
  },
  {
    key: "bus",
    label: "Bus waits",
    title: "Waiting time at a bus stop (minutes)",
    setting: "Jun timed his wait for two bus services on different school mornings.",
    unit: "min",
    lo: 0,
    hi: 30,
    a: { name: "Bus 14", values: [2, 3, 5, 6, 7, 8, 8, 9, 11, 26] },
    b: { name: "Bus 36", values: [6, 7, 8, 9, 9, 10, 10, 11, 12, 12, 13, 15] },
    higherIsBetter: false,
    winVerb: "had shorter waits",
    what: "waiting times",
  },
  {
    key: "fitness",
    label: "Sit-ups",
    title: "Sit-ups in one minute (CCA fitness test)",
    setting: "Two CCA teams of different sizes did the same one-minute test.",
    unit: "sit-ups",
    lo: 10,
    hi: 60,
    a: { name: "Team Hana", values: [31, 34, 38, 40, 47] },
    b: { name: "Team Ravi", values: [22, 25, 27, 29, 30, 32, 33, 35, 36, 36, 38, 40, 41, 44, 50] },
    higherIsBetter: true,
    winVerb: "did more sit-ups",
    what: "results",
  },
];

function CompareGroups() {
  const [key, setKey] = useState<PresetKey>("quiz");
  const [shift, setShift] = useState(0);
  const [spreadPct, setSpreadPct] = useState(100);
  const [avg, setAvg] = useState<AvgKind>("median");
  const [view, setView] = useState<"dots" | "stem">("dots");
  const [hidden, setHidden] = useState(true);

  const p = COMPARE_PRESETS.find((x) => x.key === key) ?? COMPARE_PRESETS[0];
  const changePreset = (k: PresetKey) => {
    if (k === key) return;
    setKey(k);
    setShift(0);
    setSpreadPct(100);
    setHidden(true);
  };

  // ---- group B after the stretch (about its median) and the shift ----
  const b0 = p.b.values;
  const medB0 = medianOf([...b0].sort((x, y) => x - y));
  const s = spreadPct / 100;
  const scaled = b0.map((v) => Math.round(medB0 + s * (v - medB0)));
  const kMin = Math.max(-10, p.lo - Math.min(...scaled));
  const kMax = Math.min(10, p.hi - Math.max(...scaled));
  const k = clamp(shift, kMin, kMax);
  const bVals = scaled.map((v) => v + k);
  const range0 = Math.max(...b0) - Math.min(...b0);
  const medScaled = medianOf([...scaled].sort((x, y) => x - y));

  const A = stats(p.a.values);
  const B = stats(bVals);
  const groups = [
    { name: p.a.name, st: A, tone: "brand" as const },
    { name: p.b.name, st: B, tone: "accent" as const },
  ];
  const valueOf = (st: Stats, kind: AvgKind) => (kind === "mean" ? st.mean : st.median);

  // ---- comparison sentences ----
  const winner = (kind: AvgKind): 0 | 1 | -1 => {
    const x = valueOf(A, kind);
    const y = valueOf(B, kind);
    if (Math.abs(x - y) < 1e-9) return -1;
    return (p.higherIsBetter ? x > y : x < y) ? 0 : 1;
  };
  const w = winner(avg);
  const other: AvgKind = avg === "mean" ? "median" : "mean";
  const avgSentence =
    w === -1 ? (
      <>
        On average the groups did equally well: both {avg}s were {approx(valueOf(A, avg))} {p.unit}.
      </>
    ) : (
      <>
        On average, <strong>{groups[w].name}</strong> {p.winVerb}: its {avg} was {approx(valueOf(groups[w].st, avg))} {p.unit}, compared with{" "}
        {approx(valueOf(groups[1 - w].st, avg))} {p.unit} for {groups[1 - w].name}.
      </>
    );
  const cons: 0 | 1 | -1 = A.range === B.range ? -1 : A.range < B.range ? 0 : 1;
  const spreadSentence =
    cons === -1 ? (
      <>
        Both groups had the same range ({A.range} {p.unit}), so by this measure their {p.what} were equally spread out.
      </>
    ) : (
      <>
        <strong>{groups[cons].name}</strong>’s {p.what} were more consistent: its range was {groups[cons].st.range} {p.unit}, compared with{" "}
        {groups[1 - cons].st.range} {p.unit} for {groups[1 - cons].name}.
      </>
    );
  const caveats: ReactNode[] = [];
  if (winner(other) !== w) {
    caveats.push(
      <>
        Careful: the {other} tells a different story ({p.a.name} {approx(valueOf(A, other))}, {p.b.name} {approx(valueOf(B, other))}). Always say which
        average you used.
      </>,
    );
  }
  groups.forEach((g, i) => {
    if (!g.st.outliers.length) return;
    const rest = g.st.sorted.filter((v) => !g.st.outliers.includes(v));
    const r = rest.length ? Math.max(...rest) - Math.min(...rest) : 0;
    const rOther = groups[1 - i].st.range;
    const one = g.st.outliers.length === 1;
    caveats.push(
      <>
        {g.name}’s range is stretched by {one ? "one extreme value" : "extreme values"} ({listAnd(g.st.outliers.map(String))} {p.unit}). Without{" "}
        {one ? "it" : "them"}, its range would be {r} {p.unit} — {r < rOther ? "smaller than" : r > rOther ? "bigger than" : "the same as"}{" "}
        {groups[1 - i].name}’s {rOther}.
      </>,
    );
  });
  const small = groups.filter((g) => g.st.n < 8);
  if (small.length) {
    small.forEach((g) =>
      caveats.push(
        <>
          {g.name} has only {g.st.n} values, so a few more results could easily change its averages — a bigger sample would make the conclusion more
          reliable.
        </>,
      ),
    );
  } else if (A.n !== B.n) {
    caveats.push(
      <>
        The groups are different sizes ({A.n} and {B.n}). Averages and ranges can still be compared fairly — but comparing <em>totals</em> would not be
        fair.
      </>,
    );
  }

  // ---- dot plot geometry ----
  const W = 360;
  const X0 = 16;
  const X1 = 344;
  const U = (X1 - X0) / (p.hi - p.lo);
  const px = (v: number) => X0 + (v - p.lo) * U;
  const R = Math.min(4.5, U * 0.45);
  const DY = 2 * R + 1;
  const panels = groups.map((g) => {
    const maxF = Math.max(1, ...g.st.freq.values());
    const stackH = Math.max(3, maxF) * DY + 2;
    return { ...g, stackH, h: 18 + stackH + 24 };
  });
  const tops = [0, panels[0].h];
  const axisY = panels[0].h + panels[1].h + 2;
  const H = axisY + 22;
  const major = p.hi - p.lo <= 30 ? 5 : 10;
  const minor = major === 10 ? 5 : 1;
  const tickVals: number[] = [];
  for (let t = Math.ceil(p.lo / minor) * minor; t <= p.hi; t += minor) tickVals.push(t);

  const svgAria =
    `Two dot plots on one scale from ${p.lo} to ${p.hi} ${p.unit}. ` +
    groups
      .map(
        (g) =>
          `${g.name}: ${g.st.n} values from ${g.st.min} to ${g.st.max}` +
          (hidden ? "." : `, ${avg} ${approx(valueOf(g.st, avg))}, range ${g.st.range}.`),
      )
      .join(" ");

  // ---- stem-and-leaf ----
  const all = [...A.sorted, ...B.sorted];
  const sMin = Math.floor(Math.min(...all) / 10);
  const sMax = Math.floor(Math.max(...all) / 10);
  const leavesOf = (st: Stats, stem: number) =>
    st.sorted.map((v, idx) => ({ v, idx })).filter((o) => Math.floor(o.v / 10) === stem).map((o) => ({ leaf: o.v % 10, idx: o.idx }));
  const stemRows: { stem: number; a: { leaf: number; idx: number }[]; b: { leaf: number; idx: number }[] }[] = [];
  for (let st = sMin; st <= sMax; st++) stemRows.push({ stem: st, a: leavesOf(A, st).reverse(), b: leavesOf(B, st) });
  const midA = middleIndexes(A.n);
  const midB = middleIndexes(B.n);
  const keyStem = Math.max(1, sMax);
  const medianPosText = (n: number) =>
    n % 2 ? `the ${ordinal((n + 1) / 2)} value` : `halfway between the ${ordinal(n / 2)} and ${ordinal(n / 2 + 1)} values`;

  // ---- live caption ----
  let caption: ReactNode;
  if (hidden) {
    caption = (
      <>
        <strong>Predict first.</strong> Look at where most of each group’s values sit (the typical value) and how far they stretch (the spread). Which
        group {p.winVerb} on average? Which is more consistent? Decide, then press <em>Reveal</em> and check.
      </>
    );
  } else {
    caption = (
      <>
        <p>
          A strong comparison gives <strong>one average</strong> (which group is typically higher or lower) <em>and</em> the{" "}
          <strong>range</strong> (which group is more consistent), says what each means <strong>in context</strong>, and mentions anything that makes
          the conclusion less reliable.
        </p>
        {k !== 0 ? (
          <p className="mt-2">
            You {k > 0 ? "added" : "took"} {Math.abs(k)} {k > 0 ? "to" : "off"} every {p.b.name} value: its mean and median both moved by exactly{" "}
            {Math.abs(k)}, but its range stayed {B.range}. Shifting moves data without spreading it out.
          </p>
        ) : null}
        {spreadPct !== 100 ? (
          <p className="mt-2">
            Stretching {p.b.name} ×{fmt(s)} about its median (then rounding to whole numbers) changed its range from {range0} to {B.range} {p.unit},
            but {medScaled === medB0 ? `kept its median at ${fmt(medB0)}` : `only moved its median from ${fmt(medB0)} to ${fmt(medScaled)}`}
            {k !== 0 ? " (before the shift)" : ""}. Average and spread are two separate features of data — that’s why you need both.
          </p>
        ) : null}
      </>
    );
  }

  const cell = (v: ReactNode) => (hidden ? <span className="text-ink-2">?</span> : v);

  return (
    <WidgetFrame
      title="Compare two groups"
      tryThis={[
        "Predict before you reveal: which group is better on average, and which is more consistent?",
        "Quiz scores: shift 8B until the two medians are equal. What happened to its range?",
        "Bus waits: find the extreme value. Does it change the median comparison, the range comparison, or both?",
        "Sit-ups: Team Hana looks better. Why should you be careful about saying so?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<PresetKey>
          label="Data set"
          value={key}
          onChange={changePreset}
          options={COMPARE_PRESETS.map((x) => ({ value: x.key, label: x.label }))}
        />
        <p className="text-sm text-ink-2">
          <span className="font-bold text-ink">{p.title}.</span> {p.setting}
        </p>

        <Segmented<"dots" | "stem">
          label="Diagram"
          value={view}
          onChange={setView}
          options={[
            { value: "dots", label: "Dot plots" },
            { value: "stem", label: "Stem-and-leaf" },
          ]}
        />

        {view === "dots" ? (
          <svg viewBox={`0 0 ${W} ${H}`} className="h-auto w-full" role="img" aria-label={svgAria}>
            {panels.map((g, gi) => {
              const y = tops[gi];
              const yb = y + 18 + g.stackH;
              const fill = g.tone === "brand" ? "fill-brand" : "fill-accent";
              const stroke = g.tone === "brand" ? "stroke-brand" : "stroke-accent";
              const seen = new Map<number, number>();
              const a = valueOf(g.st, avg);
              return (
                <g key={g.name}>
                  <circle cx={X0 + 4} cy={y + 8} r={4} className={fill} />
                  <text x={X0 + 12} y={y + 12} fontSize={12} fontWeight={800} className="fill-ink">
                    {g.name} ({g.st.n} values)
                  </text>
                  {!hidden ? (
                    <text x={X1} y={y + 12} fontSize={11} textAnchor="end" className="fill-ink-2">
                      {avg} {approx(a)} · range {g.st.range}
                    </text>
                  ) : null}
                  <line x1={X0} x2={X1} y1={yb} y2={yb} className="stroke-line" strokeWidth={1.5} />
                  {!hidden ? (
                    <line x1={px(a)} x2={px(a)} y1={y + 18} y2={yb} className={stroke} strokeWidth={1.5} strokeDasharray="3 3" />
                  ) : null}
                  {g.st.sorted.map((v, i) => {
                    const lv = seen.get(v) ?? 0;
                    seen.set(v, lv + 1);
                    return <circle key={i} cx={px(v)} cy={yb - 1 - R - lv * DY} r={R} className={`${fill} stroke-surface`} strokeWidth={1} />;
                  })}
                  {!hidden ? (
                    <>
                      <polygon points={`${px(a)},${yb + 1} ${px(a) - 5},${yb + 9} ${px(a) + 5},${yb + 9}`} className={fill} />
                      <path
                        d={`M${px(g.st.min)} ${yb + 12} V${yb + 17} H${px(g.st.max)} V${yb + 12}`}
                        fill="none"
                        className="stroke-ink-2"
                        strokeWidth={1.25}
                      />
                    </>
                  ) : null}
                </g>
              );
            })}
            <line x1={X0} x2={X1} y1={axisY} y2={axisY} className="stroke-ink-2" strokeWidth={1.5} />
            {tickVals.map((t) => {
              const big = t % major === 0;
              return (
                <g key={`t${t}`}>
                  <line x1={px(t)} x2={px(t)} y1={axisY} y2={axisY + (big ? 5 : 3)} className="stroke-ink-2" strokeWidth={1} />
                  {big ? (
                    <text x={px(t)} y={axisY + 16} fontSize={10} textAnchor="middle" className="fill-ink-2">
                      {t}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        ) : (
          <div className="space-y-2">
            <div className="overflow-x-auto">
              <table
                className="mx-auto font-mono text-sm tabular-nums"
                aria-label={`Back-to-back stem-and-leaf diagram. ${p.a.name} leaves on the left, ${p.b.name} leaves on the right.`}
              >
                <thead>
                  <tr className="text-xs text-ink-2">
                    <th className="pb-1 pr-2 text-right font-sans font-bold">{p.a.name}</th>
                    <th className="px-2 pb-1 text-center font-sans font-bold">Stem</th>
                    <th className="pb-1 pl-2 text-left font-sans font-bold">{p.b.name}</th>
                  </tr>
                </thead>
                <tbody>
                  {stemRows.map((r) => (
                    <tr key={r.stem}>
                      <td className="py-0.5 pr-2 text-right">
                        {r.a.map((l) => (
                          <span
                            key={l.idx}
                            className={`inline-block w-[1em] text-center ${!hidden && midA.includes(l.idx) ? "rounded bg-brand-soft font-extrabold text-brand" : "text-ink"}`}
                          >
                            {l.leaf}
                          </span>
                        ))}
                      </td>
                      <td className="border-x-2 border-ink-2 px-3 py-0.5 text-center font-extrabold text-ink">{r.stem}</td>
                      <td className="py-0.5 pl-2 text-left">
                        {r.b.map((l) => (
                          <span
                            key={l.idx}
                            className={`inline-block w-[1em] text-center ${!hidden && midB.includes(l.idx) ? "rounded bg-accent-soft font-extrabold text-ink" : "text-ink"}`}
                          >
                            {l.leaf}
                          </span>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-center text-xs text-ink-2">
              Key: 4 | {keyStem} | 6 means {keyStem * 10 + 4} {p.unit} for {p.a.name} and {keyStem * 10 + 6} {p.unit} for {p.b.name}. {p.a.name}’s leaves
              read from the stem outwards (right to left).
            </p>
            {!hidden ? (
              <p className="text-xs text-ink-2">
                Highlighted leaves are the middle values. {p.a.name}: {A.n} values, so the median is {medianPosText(A.n)} = {fmt(A.median)}.{" "}
                {p.b.name}: {B.n} values, so the median is {medianPosText(B.n)} = {fmt(B.median)}. Range = last leaf − first leaf.
              </p>
            ) : null}
          </div>
        )}

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <NudgeSlider
            name={`Shift ${p.b.name}`}
            label={`Shift ${p.b.name} (add to every value)`}
            value={k}
            min={kMin}
            max={kMax}
            onChange={setShift}
            format={signed}
          />
          <NudgeSlider
            name={`Stretch ${p.b.name}`}
            label={`Stretch ${p.b.name} about its median`}
            value={spreadPct}
            min={50}
            max={150}
            step={25}
            onChange={setSpreadPct}
            format={(v) => `×${fmt(v / 100)}`}
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Segmented<AvgKind>
            label="Compare using"
            value={avg}
            onChange={setAvg}
            options={[
              { value: "median", label: "Median" },
              { value: "mean", label: "Mean" },
            ]}
          />
          <button type="button" className={`btn btn-sm ${hidden ? "btn-primary" : "btn-secondary"}`} aria-pressed={!hidden} onClick={() => setHidden((h) => !h)}>
            {hidden ? "Reveal the numbers" : "Hide them (predict first)"}
          </button>
          {k !== 0 || spreadPct !== 100 ? (
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              onClick={() => {
                setShift(0);
                setSpreadPct(100);
              }}
            >
              Reset {p.b.name}
            </button>
          ) : null}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-center text-sm tabular-nums">
            <thead>
              <tr className="bg-surface-2 text-ink">
                <th className="border border-line px-2 py-1 text-left" />
                <th className="border border-line px-2 py-1">
                  <span className="text-brand">●</span> {p.a.name}
                </th>
                <th className="border border-line px-2 py-1">
                  <span className="text-accent">●</span> {p.b.name}
                </th>
              </tr>
            </thead>
            <tbody className="text-ink">
              <tr>
                <td className="border border-line px-2 py-1 text-left font-bold text-ink-2">Number of values</td>
                <td className="border border-line px-2 py-1">{A.n}</td>
                <td className="border border-line px-2 py-1">{B.n}</td>
              </tr>
              {(
                [
                  ["Mean", (st: Stats) => approx(st.mean)],
                  ["Median", (st: Stats) => fmt(st.median)],
                  ["Mode", (st: Stats) => modeText(st)],
                  ["Range", (st: Stats) => `${st.max} − ${st.min} = ${st.range}`],
                ] as [string, (st: Stats) => string][]
              ).map(([label, f]) => (
                <tr key={label} className={label.toLowerCase() === avg || label === "Range" ? "font-bold" : ""}>
                  <td className="border border-line px-2 py-1 text-left font-bold text-ink-2">{label}</td>
                  <td className="border border-line px-2 py-1">{cell(f(A))}</td>
                  <td className="border border-line px-2 py-1">{cell(f(B))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={`rounded-xl border p-3 text-sm ${hidden ? "border-line text-ink-2" : "border-good bg-good-soft text-ink"}`}>
          {hidden ? (
            <p>
              <strong className="text-ink">Your turn:</strong> write two sentences — one comparing an average, one comparing the range — in context. Then
              reveal the model comparison.
            </p>
          ) : (
            <>
              <p className="font-bold text-good">Model comparison (using the {avg})</p>
              <ol className="mt-1 list-decimal space-y-1 pl-5">
                <li>{avgSentence}</li>
                <li>{spreadSentence}</li>
              </ol>
              {caveats.length ? (
                <ul className="mt-2 space-y-1 text-ink-2">
                  {caveats.map((c, i) => (
                    <li key={i} className="flex gap-2">
                      <span aria-hidden>⚠️</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </>
          )}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "averages-balance",
    title: "Averages balance",
    blurb: "Edit a dot plot and watch the mean balance, the median slide and an outlier pull — then work backwards to a target mean.",
    Component: AveragesBalance,
  },
  {
    id: "compare-groups",
    title: "Compare two groups",
    blurb: "Predict, then compare two data sets with an average and the range — as dot plots or a back-to-back stem-and-leaf.",
    Component: CompareGroups,
  },
];
