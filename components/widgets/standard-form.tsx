"use client";
// Interactive explorables for the "standard-form" topic.
//  1. Place-value slider — pick the digits of A and the power n, and watch the
//     digits slide across power-of-10 columns while the decimal point stays
//     put. Buttons for × / ÷ 10, 100, 0.1, 0.01, plus a "write it in standard
//     form" challenge with real-world numbers.
//  2. Size ladder — two lengths in standard form on a powers-of-ten ladder with
//     real landmarks (atom → Neptune): which is bigger and why, how many times
//     bigger, the calculator display, and what goes wrong when A is not
//     between 1 and 10.
import { useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Shared helpers (all exact: digits are handled as strings, never floats)    */
/* ------------------------------------------------------------------------ */

/** Narrow no-break space, used to group digits in threes (384 000). */
const GAP = "\u202F";

const SUP: Record<string, string> = {
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
  "-": "⁻",
};

/** Unicode superscript for an integer: −4 → ⁻⁴. */
function sup(k: number): string {
  return String(k)
    .split("")
    .map((c) => SUP[c] ?? c)
    .join("");
}

/** Plain text 10ᵏ, e.g. 10⁻³. */
function pow10Text(k: number): string {
  return `10${sup(k)}`;
}

/** Maths markup for 10^k (negative powers bracketed). */
function pow10Markup(k: number): string {
  return k < 0 ? `10^(${k})` : `10^${k}`;
}

/** Plain integer with a real minus sign. */
function int(k: number): string {
  return String(k).replace("-", "−");
}

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Group an integer string in threes when it has 5 or more digits. */
function groupInt(s: string): string {
  if (s.length <= 4) return s;
  let out = "";
  for (let i = 0; i < s.length; i++) {
    if (i > 0 && (s.length - i) % 3 === 0) out += GAP;
    out += s[i];
  }
  return out;
}

/** Group decimal digits in threes from the point when there are 5 or more. */
function groupFrac(s: string): string {
  if (s.length <= 4) return s;
  const parts: string[] = [];
  for (let i = 0; i < s.length; i += 3) parts.push(s.slice(i, i + 3));
  return parts.join(GAP);
}

/**
 * The ordinary number whose significant digits are `sig` (no trailing zeros),
 * with the first digit in the 10^lead column. ordinary("52", −4) = "0.000 52".
 */
function ordinary(sig: string, lead: number): string {
  const last = lead - (sig.length - 1);
  const at = (c: number) => (c <= lead && c >= last ? sig[lead - c] : "0");
  let whole = "";
  for (let c = Math.max(lead, 0); c >= 0; c--) whole += at(c);
  let frac = "";
  for (let c = -1; c >= last; c--) frac += at(c);
  return groupInt(whole) + (frac ? `.${groupFrac(frac)}` : "");
}

/** A from its significant digits: "384" → "3.84", "7" → "7". */
function aFromSig(sig: string): string {
  return sig.length > 1 ? `${sig[0]}.${sig.slice(1)}` : sig;
}

/** 10^k as an ordinary number. */
function pow10Plain(k: number): string {
  return ordinary("1", k);
}

function places(k: number): string {
  return `${k} place${k === 1 ? "" : "s"}`;
}

/** A slider with −/+ buttons for exact control on touch screens. */
function NudgeSlider({
  name,
  label,
  value,
  min,
  max,
  onChange,
  format,
}: {
  name: string;
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
  format?: (v: number) => ReactNode;
}) {
  return (
    <div className="flex items-end gap-2">
      <div className="min-w-0 flex-1">
        <Slider label={label} value={value} min={min} max={max} onChange={onChange} format={format} />
      </div>
      <button
        type="button"
        className="kbd h-10 min-w-10"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${name}: decrease`}
      >
        −
      </button>
      <button
        type="button"
        className="kbd h-10 min-w-10"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${name}: increase`}
      >
        +
      </button>
    </div>
  );
}

/** A small arrow (line + head) for SVG diagrams. */
function Arrow({ x1, y1, x2, y2, className }: { x1: number; y1: number; x2: number; y2: number; className: string }) {
  const ang = Math.atan2(y2 - y1, x2 - x1);
  const h = 6;
  const p1 = `${x2 - h * Math.cos(ang - 0.45)},${y2 - h * Math.sin(ang - 0.45)}`;
  const p2 = `${x2 - h * Math.cos(ang + 0.45)},${y2 - h * Math.sin(ang + 0.45)}`;
  return (
    <g className={className}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} strokeWidth={1.4} />
      <polygon points={`${x2},${y2} ${p1} ${p2}`} strokeWidth={0} />
    </g>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Place-value slider                                                      */
/* ------------------------------------------------------------------------ */

const N1_MIN = -9;
const N1_MAX = 9;

type Digits = [number, number, number];

/** Significant digits of A = d1.d2d3 with trailing zeros dropped. */
function sigOf(d: Digits): string {
  return `${d[0]}${d[1]}${d[2]}`.replace(/0+$/, "");
}

interface OpDef {
  label: string;
  shift: number;
  note: ReactNode;
}

const OPS: OpDef[] = [
  { label: "× 10", shift: 1, note: <>Every digit is now worth 10 times as much, so each one moves 1 place left.</> },
  { label: "÷ 10", shift: -1, note: <>Every digit is now worth a tenth as much, so each one moves 1 place right.</> },
  { label: "× 100", shift: 2, note: <>× 100 is × 10 twice, so every digit moves 2 places left.</> },
  { label: "÷ 100", shift: -2, note: <>÷ 100 is ÷ 10 twice, so every digit moves 2 places right.</> },
  {
    label: "× 0.1",
    shift: -1,
    note: (
      <>
        0.1 = <M>1/10</M>, so × 0.1 takes a tenth of the number — exactly the same as ÷ 10. The digits move 1 place <strong>right</strong>.
      </>
    ),
  },
  {
    label: "÷ 0.1",
    shift: 1,
    note: <>÷ 0.1 asks “how many tenths fit in?” There are 10 tenths in every 1, so it is the same as × 10. The digits move 1 place <strong>left</strong>.</>,
  },
  {
    label: "× 0.01",
    shift: -2,
    note: (
      <>
        0.01 = <M>1/100</M>, so × 0.01 is the same as ÷ 100. The digits move 2 places <strong>right</strong>.
      </>
    ),
  },
  {
    label: "÷ 0.01",
    shift: 2,
    note: <>There are 100 hundredths in every 1, so ÷ 0.01 is the same as × 100. The digits move 2 places <strong>left</strong>.</>,
  },
];

interface Target {
  pre: string;
  post: string;
  sig: string;
  n: number;
}

// Real-world sizes are rounded, well-established values.
const TARGETS: Target[] = [
  { pre: "The Moon is about", post: "km from the Earth.", sig: "384", n: 5 },
  { pre: "Write", post: "in standard form.", sig: "52", n: -4 },
  { pre: "Mount Everest is about", post: "m tall.", sig: "885", n: 3 },
  { pre: "A human hair is about", post: "m wide.", sig: "7", n: -5 },
  { pre: "Write", post: "in standard form.", sig: "605", n: 4 },
  { pre: "Sunlight travels about", post: "km to reach the Earth.", sig: "15", n: 8 },
  { pre: "Write", post: "in standard form.", sig: "306", n: -2 },
  { pre: "A red blood cell is about", post: "m across.", sig: "75", n: -6 },
  { pre: "About", post: "people live on Earth (2025 estimate).", sig: "82", n: 9 },
  { pre: "Sound travels through air at about", post: "m/s.", sig: "343", n: 2 },
  { pre: "Green light has a wavelength of about", post: "m.", sig: "55", n: -7 },
  { pre: "Singapore’s land area is about", post: "m².", sig: "735", n: 8 },
  { pre: "A flu virus is about", post: "m across.", sig: "1", n: -7 },
  { pre: "A 4 GB download is", post: "bytes.", sig: "4", n: 9 },
];

/** Vertical digit picker (+ above, − below) so three fit side by side on a phone. */
function DigitPicker({ name, value, min, onChange }: { name: string; value: number; min: number; onChange: (v: number) => void }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <button type="button" className="kbd h-10 w-11" onClick={() => onChange(value + 1)} disabled={value >= 9} aria-label={`${name}: increase`}>
        +
      </button>
      <span className="w-11 rounded-lg border border-line bg-surface py-1 text-center text-2xl font-extrabold tabular-nums text-ink">
        <span className="sr-only">{name}: </span>
        {value}
      </span>
      <button type="button" className="kbd h-10 w-11" onClick={() => onChange(value - 1)} disabled={value <= min} aria-label={`${name}: decrease`}>
        −
      </button>
    </div>
  );
}

function PlaceValueSlider() {
  const [mode, setMode] = useState<"explore" | "challenge">("explore");
  const [digits, setDigits] = useState<Digits>([3, 8, 4]);
  const [n, setN] = useState(0);
  const [op, setOp] = useState<{ i: number; before: string; after: string } | null>(null);
  const [t, setT] = useState(0);
  const [hint, setHint] = useState(0);
  const [solved, setSolved] = useState<number[]>([]);

  const sig = sigOf(digits);
  const aStr = aFromSig(sig);
  const num = ordinary(sig, n);
  const target = TARGETS[t];
  const targetNum = ordinary(target.sig, target.n);
  const isMatch = mode === "challenge" && sig === target.sig && n === target.n;

  const update = (nd: Digits, nn: number) => {
    setDigits(nd);
    setN(nn);
    if (mode === "challenge" && sigOf(nd) === target.sig && nn === target.n && !solved.includes(t)) setSolved([...solved, t]);
  };
  const setDigit = (i: number, v: number) => {
    const nd: Digits = [digits[0], digits[1], digits[2]];
    nd[i] = v;
    setOp(null);
    update(nd, n);
  };
  const setPower = (v: number) => {
    setOp(null);
    update(digits, v);
  };
  const doOp = (i: number) => {
    const nn = n + OPS[i].shift;
    if (nn < N1_MIN || nn > N1_MAX) return;
    setOp({ i, before: num, after: ordinary(sig, nn) });
    update(digits, nn);
  };
  const changeMode = (m: "explore" | "challenge") => {
    if (m === mode) return;
    setMode(m);
    setOp(null);
    setHint(0);
    if (m === "challenge") {
      setDigits([1, 0, 0]);
      setN(0);
    }
  };
  const next = () => {
    setT((t + 1) % TARGETS.length);
    setHint(0);
    setDigits([1, 0, 0]);
    setN(0);
  };

  // ---- place-value grid geometry ----
  const len = sig.length;
  const lastA = -(len - 1); // column of A's last digit
  const lastN = n - (len - 1); // column of the number's last significant digit
  const hi = Math.max(n, 0) + 1;
  const lo = Math.min(-1, lastA, lastN) - 1;
  const cols = hi - lo + 1;
  const w = Math.min(34, 344 / cols);
  const x0 = (360 - w * cols) / 2;
  const xCol = (c: number) => x0 + (hi - c) * w; // left edge of column c
  const xMid = (c: number) => xCol(c) + w / 2;
  const xDot = xCol(0) + w; // boundary between the ones and tenths columns
  const colsList: number[] = [];
  for (let c = hi; c >= lo; c--) colsList.push(c);
  const rowA = 46;
  const rowN = 112;
  const rh = 30;
  const numberCols: number[] = [];
  for (let c = Math.max(n, 0); c >= Math.min(0, lastN); c--) numberCols.push(c);
  const PV_LABEL: Record<number, string> = { 3: "1000", 2: "100", 1: "10", 0: "1", [-1]: "0.1", [-2]: "0.01" };

  const moved = n === 0 ? "did not move" : `moved ${places(Math.abs(n))} ${n > 0 ? "left" : "right"}`;
  const aria = `Place-value grid with columns from ${pow10Text(hi)} to ${pow10Text(lo)}. Top row: A = ${aStr}. Bottom row: ${aStr} × ${pow10Text(n)} = ${num}. The digits ${moved}; the decimal point stayed where it was.`;

  // ---- live caption ----
  const k = Math.abs(n);
  let caption: ReactNode;
  if (n > 0) {
    caption = (
      <>
        <M>{`${pow10Markup(n)}`}</M> = {pow10Plain(n)}, so multiplying by it moves every digit <strong>{places(n)} left</strong>. The decimal point (dashed
        line) never moves — the digits do.{" "}
        {lastN > 0
          ? `The ${lastN} empty column${lastN === 1 ? "" : "s"} between the last digit and the point fill${lastN === 1 ? "s" : ""} with ${lastN === 1 ? "a place-holder zero" : "place-holder zeros"}.`
          : lastN === 0
            ? "The last digit lands in the ones column, so no place-holder zeros are needed."
            : "Some digits are still after the point, so no place-holder zeros are needed."}{" "}
        Because{" "}
        <M>{"1 <= A < 10"}</M>, the power is simply the column of the first digit: the {sig[0]} lands in the <M>{pow10Markup(n)}</M> column.
      </>
    );
  } else if (n < 0) {
    caption = (
      <>
        <M>{`${pow10Markup(n)} = 1/(10^${k})`}</M> = {pow10Plain(n)}, so multiplying by it moves every digit <strong>{places(k)} right</strong>.{" "}
        {k > 1 ? (
          <>
            Count the places moved, not the zeros: {num} has {k - 1} zero{k - 1 === 1 ? "" : "s"} after the point before the {sig[0]}, but the power is{" "}
            {int(n)} because the {sig[0]} sits in the <M>{pow10Markup(n)}</M> column.
          </>
        ) : (
          <>The {sig[0]} now sits in the tenths column, which is the <M>{"10^(-1)"}</M> column.</>
        )}{" "}
        A negative power means a small number, not a negative one.
      </>
    );
  } else {
    caption = (
      <>
        <M>{"10^0"}</M> = 1, so <M>{`${aStr} * 10^0`}</M> is just {aStr}. In standard form, A always has exactly one non-zero digit before the point (
        <M>{"1 <= A < 10"}</M>). Slide the power and watch where the first digit lands — that column <em>is</em> the power.
      </>
    );
  }

  // ---- challenge feedback ----
  let feedback: ReactNode = null;
  if (mode === "challenge") {
    if (isMatch) {
      feedback = (
        <p className="font-bold text-good">
          ✔ Exactly: {targetNum} = <M>{`${aFromSig(target.sig)} * ${pow10Markup(target.n)}`}</M>. The first digit is in the{" "}
          <M>{pow10Markup(target.n)}</M> column, so the power is {int(target.n)}.
        </p>
      );
    } else if (sig === target.sig) {
      const diff = n - target.n;
      const factor = Math.abs(diff) <= 6 ? groupInt(`1${"0".repeat(Math.abs(diff))}`) : pow10Text(Math.abs(diff));
      feedback = (
        <p className="text-ink">
          Right digits! But {num} is {factor} times too {diff > 0 ? "big" : "small"}. Move the digits {places(Math.abs(diff))}{" "}
          {diff > 0 ? "right" : "left"} — {diff > 0 ? "lower" : "raise"} the power.
        </p>
      );
    } else {
      feedback = (
        <p className="text-ink-2">
          Your number is {num}. Check the digits first: A is made from the target’s digits starting at the first non-zero one, with the point after that
          digit. Place-holder zeros at the start or end are not part of A.
        </p>
      );
    }
  }

  const hints: ReactNode[] = [
    <>
      Find the first non-zero digit of {targetNum}. Which column is it in? (Ones = <M>{"10^0"}</M>, tens = <M>{"10^1"}</M>, tenths ={" "}
      <M>{"10^(-1)"}</M> …)
    </>,
    <>
      A = {aFromSig(target.sig)}. Now count the places from the ones column to the {target.sig[0]}’s column — that count is the power, and it is negative
      if the {target.sig[0]} is to the right of the point.
    </>,
  ];

  return (
    <WidgetFrame
      title="Place-value slider"
      tryThis={[
        "Set A = 3.84. Predict the ordinary number for {{3.84 * 10^5}}, then slide the power to check.",
        "Press × 0.1, then press ÷ 10 from the same start. What do you notice? Which button undoes × 0.01?",
        "Make 0.000 52. Count its zeros, then count the places the 5 moved. Which count is the power?",
        "Switch to *Challenge* and write each real-world number in standard form.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<"explore" | "challenge">
          label="Mode"
          value={mode}
          onChange={changeMode}
          options={[
            { value: "explore", label: "Explore" },
            { value: "challenge", label: "Challenge" },
          ]}
        />

        {mode === "challenge" ? (
          <div className="rounded-xl border border-line bg-brand-soft p-3 text-sm text-ink">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold uppercase tracking-wide text-ink-2">
              <span>
                Number {t + 1} of {TARGETS.length}
              </span>
              <span>Solved: {solved.length}</span>
            </div>
            <p className="mt-1 text-base">
              {target.pre} <strong className="tabular-nums">{targetNum}</strong> {target.post}
            </p>
            <p className="mt-1 text-ink-2">Set the digits of A and the power n so that A × 10ⁿ makes this number.</p>
          </div>
        ) : null}

        <svg viewBox="0 0 360 152" className="h-auto w-full" role="img" aria-label={aria}>
          {/* the column of the first digit */}
          <rect x={xCol(n)} y={2} width={w} height={rowN + rh - 2} className="fill-brand" opacity={0.1} />
          {/* column headings */}
          {colsList.map((c) => (
            <g key={`h${c}`}>
              <text
                x={xMid(c)}
                y={14}
                fontSize={10}
                textAnchor="middle"
                fontWeight={c === n ? 800 : 400}
                className={c === n ? "fill-brand" : "fill-ink-2"}
              >
                {pow10Text(c)}
              </text>
              {PV_LABEL[c] !== undefined ? (
                <text x={xMid(c)} y={28} fontSize={8} textAnchor="middle" className="fill-ink-2">
                  {PV_LABEL[c]}
                </text>
              ) : null}
            </g>
          ))}
          {/* cells */}
          {colsList.map((c) => (
            <g key={`c${c}`}>
              <rect x={xCol(c)} y={rowA} width={w} height={rh} className="fill-surface stroke-line" strokeWidth={1} />
              <rect x={xCol(c)} y={rowN} width={w} height={rh} className="fill-surface stroke-line" strokeWidth={1} />
            </g>
          ))}
          {/* A: digits in their home columns */}
          {sig.split("").map((dg, i) => (
            <text key={`a${i}`} x={xMid(-i)} y={rowA + 21} fontSize={16} fontWeight={800} textAnchor="middle" className="fill-ink">
              {dg}
            </text>
          ))}
          {/* the number: significant digits and place-holder zeros */}
          {numberCols.map((c) => {
            const isSig = c <= n && c >= lastN;
            return (
              <text
                key={`n${c}`}
                x={xMid(c)}
                y={rowN + 21}
                fontSize={16}
                fontWeight={isSig ? 800 : 400}
                textAnchor="middle"
                className={isSig ? "fill-brand" : "fill-ink-2"}
              >
                {isSig ? sig[n - c] : "0"}
              </text>
            );
          })}
          {/* arrows: where each digit of A goes */}
          {sig.split("").map((_, i) => (
            <Arrow key={`ar${i}`} x1={xMid(-i)} y1={rowA + rh + 3} x2={xMid(n - i)} y2={rowN - 4} className="stroke-ink-2 fill-ink-2" />
          ))}
          {/* the decimal point: it never moves */}
          <line x1={xDot} x2={xDot} y1={rowA - 6} y2={rowN + rh + 6} className="stroke-bad" strokeWidth={2} strokeDasharray="5 4" />
          <circle cx={xDot} cy={rowA + rh - 6} r={2.8} className="fill-bad" />
          <circle cx={xDot} cy={rowN + rh - 6} r={2.8} className="fill-bad" />
        </svg>
        <p className="-mt-2 text-xs text-ink-2">
          Top row: A. Bottom row: A × 10ⁿ. The dashed line is the decimal point — it stays put while the digits move. Grey zeros are place holders.
        </p>

        <div className="flex flex-wrap items-end justify-center gap-4">
          <div className="flex items-center gap-1" role="group" aria-label="Digits of A">
            <DigitPicker name="First digit of A" value={digits[0]} min={1} onChange={(v) => setDigit(0, v)} />
            <span className="self-center text-3xl font-extrabold text-bad" aria-hidden>
              .
            </span>
            <DigitPicker name="Second digit of A" value={digits[1]} min={0} onChange={(v) => setDigit(1, v)} />
            <DigitPicker name="Third digit of A" value={digits[2]} min={0} onChange={(v) => setDigit(2, v)} />
          </div>
          <div className="min-w-[12rem] flex-1">
            <NudgeSlider
              name="Power of 10"
              label={
                <>
                  Power of 10 (<em>n</em>)
                </>
              }
              value={n}
              min={N1_MIN}
              max={N1_MAX}
              onChange={setPower}
              format={(v) => int(v)}
            />
          </div>
        </div>

        {mode === "explore" ? (
          <div className="space-y-2">
            <div className="grid grid-cols-4 gap-2" role="group" aria-label="Multiply or divide by a power of 10">
              {OPS.map((o, i) => (
                <button
                  key={o.label}
                  type="button"
                  className="btn btn-secondary px-1 text-sm tabular-nums"
                  onClick={() => doOp(i)}
                  disabled={n + o.shift < N1_MIN || n + o.shift > N1_MAX}
                >
                  {o.label}
                </button>
              ))}
            </div>
            {op ? (
              <div className="rounded-xl border border-line p-3 text-sm text-ink-2" aria-live="polite">
                <p className="font-bold text-ink tabular-nums">
                  {op.before} {OPS[op.i].label} = {op.after}
                </p>
                <p className="mt-1">{OPS[op.i].note}</p>
              </div>
            ) : null}
          </div>
        ) : (
          <div className="space-y-2 rounded-xl border border-line p-3 text-sm" aria-live="polite">
            {feedback}
            {!isMatch && hint > 0 ? (
              <ul className="space-y-1 text-ink-2">
                {hints.slice(0, hint).map((h, i) => (
                  <li key={`hint${i}`}>
                    <strong className="text-ink">Hint {i + 1}:</strong> {h}
                  </li>
                ))}
              </ul>
            ) : null}
            <div className="flex flex-wrap gap-2">
              {!isMatch ? (
                <button type="button" className="btn btn-secondary text-sm" onClick={() => setHint(hint + 1)} disabled={hint >= hints.length}>
                  {hint >= hints.length ? "No more hints" : "Hint"}
                </button>
              ) : null}
              <button type="button" className={`btn text-sm ${isMatch ? "btn-primary" : "btn-ghost"}`} onClick={next}>
                {isMatch ? "Next number →" : "Skip →"}
              </button>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Readout label="Standard form" value={<M>{`${aStr} * ${pow10Markup(n)}`}</M>} />
          <Readout label="Ordinary number" value={num} tone={isMatch ? "good" : "ink"} />
          <Readout label={`${pow10Text(n)} is`} value={pow10Plain(n)} tone="ink" />
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Size ladder: comparing and ordering                                     */
/* ------------------------------------------------------------------------ */

/** A number a/10 × 10^n, with a stored in tenths so it stays exact. */
interface SF {
  a: number;
  n: number;
}

const N2_MIN = -10;
const N2_MAX = 12;
// "Any A" allows 0.1 × 10⁻¹⁰ = 10⁻¹¹ up to 99.9 × 10¹² < 10¹⁴, so the ladder
// covers 10⁻¹¹ to 10¹⁴ and every value the sliders can make is on it.
const LAD_MIN = -11;
const LAD_MAX = 14;

type AMode = "std" | "any";

/** A as text: 38 → "3.8", 450 → "45", 5 → "0.5". */
function aText(a: number): string {
  const s = (a / 10).toFixed(1);
  return s.endsWith(".0") ? s.slice(0, -2) : s;
}

function isStd(p: SF): boolean {
  return p.a >= 10 && p.a <= 99;
}

/** Significant digits and the column of the first one (exact). */
function sigLead(p: SF): { sig: string; lead: number } {
  const s = String(p.a);
  return { sig: s.replace(/0+$/, ""), lead: p.n - 1 + s.length - 1 };
}

function logOf(p: SF): number {
  return p.n + Math.log10(p.a / 10);
}

/** Exact comparison: 1 if p > q, −1 if p < q, 0 if equal. */
function compare(p: SF, q: SF): number {
  const d = p.n - q.n;
  // a is between 1 and 999, so a gap of 3 or more in the powers always decides.
  if (d >= 3) return 1;
  if (d <= -3) return -1;
  const L = d >= 0 ? p.a * 10 ** d : p.a;
  const R = d >= 0 ? q.a : q.a * 10 ** -d;
  return L === R ? 0 : L > R ? 1 : -1;
}

interface Normalised {
  p: SF;
  /** A had to be rounded to 1 d.p. */
  rounded: boolean;
  /** The power fell outside the slider range, so the nearest value it can show was used. */
  capped: boolean;
}

/** Rewrite in standard form, rounding A to 1 d.p. (half up) — used when leaving "any A" mode. */
function normalise(p: SF): Normalised {
  let { a, n } = p;
  let rounded = false;
  while (a >= 100) {
    if (a % 10 !== 0) rounded = true;
    a = Math.round(a / 10);
    n += 1;
  }
  while (a < 10) {
    a *= 10;
    n -= 1;
  }
  if (n > N2_MAX) return { p: { a: 99, n: N2_MAX }, rounded, capped: true };
  if (n < N2_MIN) return { p: { a: 10, n: N2_MIN }, rounded, capped: true };
  return { p: { a, n }, rounded, capped: false };
}

/**
 * A ÷ B (positive whole numbers) to 2 significant figures, rounded half up, using
 * whole-number arithmetic only: A ÷ B ≈ (d/10) × 10^e with 10 ≤ d ≤ 99.
 */
function twoSF(A: number, B: number): { d: number; e: number; exact: boolean } {
  const atLeast = (k: number) => (k >= 0 ? A >= B * 10 ** k : A * 10 ** -k >= B); // A ÷ B ≥ 10^k
  let e = 0;
  while (atLeast(e + 1)) e++;
  while (!atLeast(e)) e--;
  const s = 1 - e;
  const num = s >= 0 ? A * 10 ** s : A;
  const den = s >= 0 ? B : B * 10 ** -s;
  const rem = num % den;
  let d = (num - rem) / den;
  if (2 * rem >= den) d += 1;
  if (d === 100) {
    d = 10;
    e += 1;
  }
  return { d, e, exact: rem === 0 };
}

/** Significant digits of a 2-digit d with trailing zeros dropped: 40 → "4". */
function dSig(d: number): string {
  return String(d).replace(/0+$/, "");
}

function sfOf(p: SF): string {
  return `${aText(p.a)} * ${pow10Markup(p.n)}`;
}

/** Calculator-style display, e.g. 1.5E11 or 7.5E-6 (a calculator always normalises A). */
function calc(p: SF): string {
  const { sig, lead } = sigLead(p);
  return `${aFromSig(sig)}E${lead}`;
}

/** Bracket a negative number for use after a minus sign. */
function br(k: number): string {
  return k < 0 ? `(${k})` : String(k);
}

interface Landmark {
  label: string;
  a: number;
  n: number;
}

// Rounded, well-established sizes in metres.
const LANDMARKS: Landmark[] = [
  { label: "hydrogen atom", a: 10, n: -10 },
  { label: "flu virus", a: 10, n: -7 },
  { label: "red blood cell", a: 75, n: -6 },
  { label: "width of a hair", a: 70, n: -5 },
  { label: "small ant", a: 30, n: -3 },
  { label: "you", a: 15, n: 0 },
  { label: "Singapore Flyer", a: 17, n: 2 },
  { label: "Mount Everest", a: 88, n: 3 },
  { label: "Singapore, east to west", a: 50, n: 4 },
  { label: "Earth’s diameter", a: 13, n: 7 },
  { label: "Earth to Moon", a: 38, n: 8 },
  { label: "Earth to Sun", a: 15, n: 11 },
  { label: "Sun to Neptune", a: 45, n: 12 },
];

interface Preset {
  label: string;
  p: SF;
  q: SF;
  mode: AMode;
}

const PRESETS: Preset[] = [
  { label: "9.9 × 10⁴ or 1.1 × 10⁵?", p: { a: 99, n: 4 }, q: { a: 11, n: 5 }, mode: "std" },
  { label: "2 × 10⁻³ or 9 × 10⁻⁵?", p: { a: 20, n: -3 }, q: { a: 90, n: -5 }, mode: "std" },
  { label: "Hair vs blood cell", p: { a: 70, n: -5 }, q: { a: 75, n: -6 }, mode: "std" },
  { label: "Sun vs Moon distance", p: { a: 15, n: 11 }, q: { a: 38, n: 8 }, mode: "std" },
  { label: "Trap: 45 × 10³", p: { a: 450, n: 3 }, q: { a: 30, n: 4 }, mode: "any" },
];

function NumberControls({
  name,
  tone,
  value,
  mode,
  onChange,
}: {
  name: "P" | "Q";
  tone: string;
  value: SF;
  mode: AMode;
  onChange: (v: SF) => void;
}) {
  const { sig, lead } = sigLead(value);
  const std = isStd(value);
  return (
    <div className="space-y-3 rounded-xl border border-line p-3">
      <div className="flex flex-wrap items-center gap-2">
        <span className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-extrabold text-surface ${tone}`} aria-hidden>
          {name}
        </span>
        <span className="text-lg font-extrabold text-ink">
          {name} = <M>{sfOf(value)}</M> m
        </span>
      </div>
      <NudgeSlider
        name={`${name}: A`}
        label="A"
        value={value.a}
        min={mode === "std" ? 10 : 1}
        max={mode === "std" ? 99 : 999}
        onChange={(a) => onChange({ ...value, a })}
        format={(a) => aText(a)}
      />
      <NudgeSlider
        name={`${name}: power`}
        label={
          <>
            Power (<em>n</em>)
          </>
        }
        value={value.n}
        min={N2_MIN}
        max={N2_MAX}
        onChange={(n) => onChange({ ...value, n })}
        format={(n) => int(n)}
      />
      <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
        <dt className="text-ink-2">Ordinary</dt>
        <dd className="break-all font-bold tabular-nums text-ink">{ordinary(sig, lead)} m</dd>
        <dt className="text-ink-2">Calculator</dt>
        <dd className="font-mono font-bold text-ink">{calc(value)}</dd>
        {!std ? (
          <>
            <dt className="text-bad">Not standard form</dt>
            <dd className="text-ink">
              = <M>{`${aFromSig(sig)} * ${pow10Markup(lead)}`}</M>
            </dd>
          </>
        ) : null}
      </dl>
    </div>
  );
}

function SizeLadder() {
  const [mode, setMode] = useState<AMode>("std");
  const [p, setP] = useState<SF>({ a: 99, n: 4 });
  const [q, setQ] = useState<SF>({ a: 11, n: 5 });
  // What happened to P and Q when they were rewritten in standard form.
  const [notes, setNotes] = useState<{ name: "P" | "Q"; before: SF; res: Normalised }[]>([]);

  const changeMode = (m: AMode) => {
    if (m === mode) return;
    setMode(m);
    setNotes([]);
    if (m === "std") {
      const np = normalise(p);
      const nq = normalise(q);
      setP(np.p);
      setQ(nq.p);
      const out: { name: "P" | "Q"; before: SF; res: Normalised }[] = [];
      if (!isStd(p)) out.push({ name: "P", before: p, res: np });
      if (!isStd(q)) out.push({ name: "Q", before: q, res: nq });
      setNotes(out);
    }
  };
  const applyPreset = (ps: Preset) => {
    setMode(ps.mode);
    setNotes([]);
    setP(ps.p);
    setQ(ps.q);
  };
  const changeP = (v: SF) => {
    setNotes([]);
    setP(v);
  };
  const changeQ = (v: SF) => {
    setNotes([]);
    setQ(v);
  };

  const c = compare(p, q);
  const pStd = isStd(p);
  const qStd = isStd(q);
  const both = pStd && qStd;
  const big = c >= 0 ? p : q;
  const small = c >= 0 ? q : p;
  const bigName = c >= 0 ? "P" : "Q";
  const smallName = c >= 0 ? "Q" : "P";
  const pSL = sigLead(p);
  const qSL = sigLead(q);

  // ---- how many times bigger (2 s.f., exact whole-number arithmetic) ----
  // (big.a/10) ÷ (small.a/10) = big.a ÷ small.a ≈ (d/10) × 10^qe
  const { d, e: qe, exact } = twoSF(big.a, small.a);
  const powDiff = big.n - small.n;
  const e = qe + powDiff; // the ratio is about (d/10) × 10^e, and e ≥ 0 because big > small
  const rText = aFromSig(dSig(d)); // d/10, e.g. 1.8 or 4
  const quotientText = ordinary(dSig(d), qe); // big.a ÷ small.a to 2 s.f., e.g. 0.18
  const ratioNode: ReactNode =
    e === 0 ? `${String(d)[0]}.${String(d)[1]}` : e <= 5 ? groupInt(`${d}${"0".repeat(e - 1)}`) : <M>{`${rText} * 10^${e}`}</M>;

  // ---- ladder geometry ----
  const PX = 16;
  const TOP = 12;
  const H = TOP * 2 + (LAD_MAX - LAD_MIN) * PX;
  const yOf = (L: number) => TOP + (LAD_MAX - clamp(L, LAD_MIN, LAD_MAX)) * PX;
  const rungs: number[] = [];
  for (let k = LAD_MIN; k <= LAD_MAX; k++) rungs.push(k);
  const RAIL1 = 52;
  const RAIL2 = 66;
  const mid = (RAIL1 + RAIL2) / 2;
  const logP = logOf(p);
  const logQ = logOf(q);
  const onLadder = (band: number) => band >= LAD_MIN && band < LAD_MAX;
  const off = (L: number) => (L > LAD_MAX ? " (off the top of the ladder)" : L < LAD_MIN ? " (off the bottom of the ladder)" : "");
  const aria = `Powers-of-ten ladder from ${pow10Text(LAD_MIN)} to ${pow10Text(LAD_MAX)} metres with landmarks from a hydrogen atom to the distance from the Sun to Neptune. P = ${aText(p.a)} × ${pow10Text(p.n)} m sits between ${pow10Text(pSL.lead)} and ${pow10Text(pSL.lead + 1)}${off(logP)}. Q = ${aText(q.a)} × ${pow10Text(q.n)} m sits between ${pow10Text(qSL.lead)} and ${pow10Text(qSL.lead + 1)}${off(logQ)}. ${c === 0 ? "P equals Q." : `${bigName} is bigger.`}`;

  // ---- the verdict and the reason ----
  const verdict = c === 0 ? "P = Q" : c > 0 ? "P > Q" : "P < Q";
  let reason: ReactNode;
  if (c === 0) {
    reason =
      p.a === q.a && p.n === q.n ? (
        <>P and Q are identical, so of course they are equal.</>
      ) : (
        <>They are equal — the same length written in two different ways. At most one of them can be in standard form, because standard form is unique.</>
      );
  } else if (both && p.n !== q.n) {
    const aSays = big.a < small.a;
    const negs = big.n < 0; // both powers negative
    reason = (
      <>
        {bigName} has the bigger power ({int(big.n)} &gt; {int(small.n)}), so {bigName} is bigger — whatever A is.
        {aSays ? (
          <>
            {" "}
            Its A ({aText(big.a)}) is <em>smaller</em> than {aText(small.a)}, but A only decides between numbers with the same power.
          </>
        ) : null}
        {negs ? (
          <>
            {" "}
            With negative powers, the one closer to zero is bigger: <M>{pow10Markup(big.n)}</M> = {pow10Plain(big.n)} but <M>{pow10Markup(small.n)}</M> ={" "}
            {pow10Plain(small.n)}.
          </>
        ) : null}
      </>
    );
  } else if (both) {
    reason = (
      <>
        Same power (<M>{pow10Markup(p.n)}</M>), so both live on the same band of the ladder. Now compare A: {aText(big.a)} &gt; {aText(small.a)}.
      </>
    );
  } else {
    const ruleFails = p.n !== q.n && (p.n > q.n ? c < 0 : c > 0);
    reason = (
      <>
        {!pStd ? (
          <>
            P is not in standard form (A must be at least 1 and less than 10): <M>{sfOf(p)}</M> ={" "}
            <M>{`${aFromSig(pSL.sig)} * ${pow10Markup(pSL.lead)}`}</M>.{" "}
          </>
        ) : null}
        {!qStd ? (
          <>
            Q is not in standard form: <M>{sfOf(q)}</M> = <M>{`${aFromSig(qSL.sig)} * ${pow10Markup(qSL.lead)}`}</M>.{" "}
          </>
        ) : null}
        {p.n === q.n ? (
          <>
            Both are written with the same power (<M>{pow10Markup(p.n)}</M>), so comparing A still works here: {aText(big.a)} &gt; {aText(small.a)}. But
            to use “bigger power wins”, rewrite both in standard form first.
          </>
        ) : ruleFails ? (
          <strong className="text-bad">
            The “bigger power wins” rule just failed! It only works when both numbers are in standard form — rewrite them first.
          </strong>
        ) : (
          <>The rule “bigger power wins” happens to work here, but it is not safe until both numbers are in standard form.</>
        )}
      </>
    );
  }

  // ---- live caption ----
  const caption: ReactNode = both ? (
    <>
      Each rung of the ladder is <strong>10 times</strong> the rung below. A number in standard form <M>{"A * 10^n"}</M> with{" "}
      <M>{"1 <= A < 10"}</M> always sits on the band from <M>{"10^n"}</M> up to (but not including) <M>{"10^(n+1)"}</M>. So the power tells you the band
      first, and A only says how far up the band you are. Many calculators show P as {calc(p)}: the E means “× 10 to the power”, so it is{" "}
      <M>{sfOf(p)}</M>, not <M>{`${aText(p.a)}^${br(p.n)}`}</M>.
    </>
  ) : (
    <>
      With A outside 1 to 10, the written power no longer tells you the band: the dashed outline shows the band the power <em>claims</em>, and the shaded
      band is where the number really is. That is why standard form insists on <M>{"1 <= A < 10"}</M> — it makes “compare the powers first” always work.
    </>
  );

  const pBandClaim = !pStd ? p.n : null;
  const qBandClaim = !qStd ? q.n : null;

  return (
    <WidgetFrame
      title="Size ladder: compare in standard form"
      tryThis={[
        "Tap *9.9 × 10⁴ or 1.1 × 10⁵?* and predict which is bigger before you look at the ladder.",
        "Make P bigger than Q even though P’s A is smaller. What must be true about the powers?",
        "Make P exactly 1000 times as long as Q. How do the two powers compare?",
        "Switch to *Any A* and make the “bigger power wins” rule fail. Then rewrite your P in standard form.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <Segmented<AMode>
            label="Which values of A are allowed?"
            value={mode}
            onChange={changeMode}
            options={[
              { value: "std", label: "Standard form (1 ≤ A < 10)" },
              { value: "any", label: "Any A" },
            ]}
          />
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Examples to try">
          {PRESETS.map((ps) => (
            <button key={ps.label} type="button" className="btn btn-secondary text-sm" onClick={() => applyPreset(ps)}>
              {ps.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <svg viewBox={`0 0 360 ${H}`} className="h-auto w-full" role="img" aria-label={aria}>
            {/* bands where P and Q really are */}
            {onLadder(pSL.lead) ? (
              <rect x={RAIL1} y={yOf(pSL.lead + 1)} width={356 - RAIL1} height={PX} className="fill-brand" opacity={0.14} />
            ) : null}
            {onLadder(qSL.lead) ? (
              <rect x={RAIL1} y={yOf(qSL.lead + 1)} width={356 - RAIL1} height={PX} className="fill-accent" opacity={0.2} />
            ) : null}
            {/* the band a non-standard power claims */}
            {pBandClaim !== null && pBandClaim !== pSL.lead ? (
              <rect x={RAIL1} y={yOf(pBandClaim + 1)} width={356 - RAIL1} height={PX} fill="none" className="stroke-brand" strokeWidth={1.5} strokeDasharray="4 3" />
            ) : null}
            {qBandClaim !== null && qBandClaim !== qSL.lead ? (
              <rect x={RAIL1} y={yOf(qBandClaim + 1)} width={356 - RAIL1} height={PX} fill="none" className="stroke-accent" strokeWidth={1.5} strokeDasharray="4 3" />
            ) : null}
            {/* rails and rungs */}
            <line x1={RAIL1} x2={RAIL1} y1={yOf(LAD_MAX)} y2={yOf(LAD_MIN)} className="stroke-ink-2" strokeWidth={2} />
            <line x1={RAIL2} x2={RAIL2} y1={yOf(LAD_MAX)} y2={yOf(LAD_MIN)} className="stroke-ink-2" strokeWidth={2} />
            {rungs.map((k) => (
              <g key={`r${k}`}>
                <line x1={RAIL1} x2={RAIL2} y1={yOf(k)} y2={yOf(k)} className="stroke-ink-2" strokeWidth={k === 0 ? 2.5 : 1.5} />
                <text x={30} y={yOf(k) + 3.5} fontSize={9.5} textAnchor="end" className={k === 0 ? "fill-ink" : "fill-ink-2"} fontWeight={k === 0 ? 800 : 400}>
                  {pow10Text(k)}
                </text>
              </g>
            ))}
            {/* landmarks */}
            {LANDMARKS.map((l) => {
              const y = yOf(logOf(l));
              return (
                <g key={l.label}>
                  <line x1={RAIL2} x2={RAIL2 + 5} y1={y} y2={y} className="stroke-ink" strokeWidth={1.5} />
                  <text x={92} y={y + 3.5} fontSize={10} className="fill-ink-2">
                    {l.label} ≈ {aText(l.a)} × {pow10Text(l.n)} m
                  </text>
                </g>
              );
            })}
            {/* P (left) and Q (right) markers */}
            <line x1={45} x2={mid} y1={yOf(logP)} y2={yOf(logP)} className="stroke-brand" strokeWidth={2.5} />
            <circle cx={38} cy={yOf(logP)} r={7} className="fill-brand" />
            <text x={38} y={yOf(logP) + 3.5} fontSize={9.5} fontWeight={800} textAnchor="middle" className="fill-surface">
              P
            </text>
            <line x1={mid} x2={73} y1={yOf(logQ)} y2={yOf(logQ)} className="stroke-accent" strokeWidth={2.5} />
            <circle cx={80} cy={yOf(logQ)} r={7} className="fill-accent" />
            <text x={80} y={yOf(logQ) + 3.5} fontSize={9.5} fontWeight={800} textAnchor="middle" className="fill-surface">
              Q
            </text>
          </svg>

          <div className="space-y-3">
            <NumberControls name="P" tone="bg-brand" value={p} mode={mode} onChange={changeP} />
            <NumberControls name="Q" tone="bg-accent" value={q} mode={mode} onChange={changeQ} />
          </div>
        </div>

        {notes.length ? (
          <div className="space-y-1 rounded-xl border border-line bg-surface-2 p-3 text-sm text-ink" aria-live="polite">
            {notes.map(({ name, before, res }) => {
              const sl = sigLead(before);
              const exactStd = `${aFromSig(sl.sig)} * ${pow10Markup(sl.lead)}`;
              return (
                <p key={name}>
                  <strong>{name}</strong> = <M>{sfOf(before)}</M>
                  {res.capped ? (
                    <>
                      {" "}
                      = <M>{exactStd}</M> is outside this widget’s range, so {name} was set to the nearest value it can show, <M>{sfOf(res.p)}</M>.
                    </>
                  ) : res.rounded ? (
                    <>
                      {" "}
                      = <M>{exactStd}</M>, which rounds to <M>{sfOf(res.p)}</M> (A to 1 decimal place).
                    </>
                  ) : (
                    <>
                      {" "}
                      is rewritten in standard form as <M>{sfOf(res.p)}</M>.
                    </>
                  )}
                </p>
              );
            })}
          </div>
        ) : null}

        <div className="rounded-xl border border-line p-3 text-sm text-ink-2" aria-live="polite">
          <p className="text-2xl font-extrabold text-ink">{verdict}</p>
          <p className="mt-1">{reason}</p>
          {c !== 0 ? (
            <>
              <p className="mt-2">
                <span className="font-bold text-ink">How many times bigger?</span> {bigName} is {exact ? "exactly" : "about"}{" "}
                <strong className="text-ink">{ratioNode}</strong> times as long as {smallName}.
              </p>
              <p className="mt-1 overflow-x-auto tabular-nums">
                <M>{`(${sfOf(big)}) ÷ (${sfOf(small)})`}</M> = <M>{`(${aText(big.a)} ÷ ${aText(small.a)}) * 10^(${big.n} - ${br(small.n)})`}</M>{" "}
                {exact ? "=" : "≈"} <M>{`${quotientText} * ${pow10Markup(powDiff)}`}</M>
                {qe === 0 ? null : (
                  <>
                    {" "}
                    = <M>{`${rText} * ${pow10Markup(e)}`}</M>
                  </>
                )}
                {exact ? null : <span className="text-ink-2"> (2 s.f.)</span>}
              </p>
            </>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "place-value-slider",
    title: "Place-value slider",
    blurb: "Pick the digits of A and the power of 10, and watch the digits slide past a decimal point that never moves.",
    Component: PlaceValueSlider,
  },
  {
    id: "size-ladder",
    title: "Size ladder",
    blurb: "Put two lengths on a powers-of-ten ladder from atoms to Neptune: which is bigger, why, and how many times?",
    Component: SizeLadder,
  },
];
