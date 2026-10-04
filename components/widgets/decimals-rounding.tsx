"use client";
// Explorables for "Decimals, Rounding & Estimation".
//  1. Rounding microscope — zoom in between the two possible rounded answers
//     (decimal places or significant figures), with exact BigInt arithmetic.
//  2. Fraction → decimal machine — step through long division, watch the
//     remainders, and see why a decimal stops or repeats for ever.
import { Fragment, useId, useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Stepper, Segmented, Readout, M, type WidgetDef } from "./kit";

// ===========================================================================
// Exact decimal helpers (value = m × 10^s, m ≥ 0) — no floating-point slips.
// ===========================================================================

interface Dec {
  m: bigint;
  s: number;
}

const NNBSP = String.fromCharCode(0x202f); // narrow no-break space for 45 678

function pow10(k: number): bigint {
  return 10n ** BigInt(Math.max(0, k));
}

/** Group a string of integer digits in threes (only for 5+ digits, SI style). */
function group(intStr: string): string {
  if (intStr.length < 5) return intStr;
  let out = "";
  for (let i = 0; i < intStr.length; i++) {
    const fromEnd = intStr.length - i;
    out += intStr[i];
    if (fromEnd > 1 && (fromEnd - 1) % 3 === 0) out += NNBSP;
  }
  return out;
}

/** Show v × 10^scale with exactly `places` decimal places. */
function fmt(v: bigint, scale: number, places: number): string {
  const neg = v < 0n;
  let a = neg ? -v : v;
  const shift = scale + places;
  a = shift >= 0 ? a * pow10(shift) : a / pow10(-shift);
  let str = a.toString();
  if (places > 0) {
    str = str.padStart(places + 1, "0");
    str = `${group(str.slice(0, -places))}.${str.slice(-places)}`;
  } else {
    str = group(str);
  }
  return `${neg && a !== 0n ? "−" : ""}${str}`;
}

function parseDec(raw: string): Dec | null {
  const t = raw.split(" ").join("").split(",").join("").split(NNBSP).join("");
  if (!/^(\d+\.?\d*|\.\d+)$/.test(t)) return null;
  const [ip, fp = ""] = t.split(".");
  const digits = `${ip}${fp}`;
  if (!digits) return null;
  return { m: BigInt(digits), s: -fp.length };
}

function leadPos(d: Dec): number | null {
  return d.m === 0n ? null : d.s + d.m.toString().length - 1;
}

function digitAt(d: Dec, pos: number): number {
  const str = d.m.toString();
  const idx = str.length - 1 - (pos - d.s);
  return idx >= 0 && idx < str.length && d.m !== 0n ? Number(str[idx]) : 0;
}

const PLACE_NAMES: Record<number, string> = {
  6: "millions",
  5: "hundred thousands",
  4: "ten thousands",
  3: "thousands",
  2: "hundreds",
  1: "tens",
  0: "ones",
  [-1]: "tenths",
  [-2]: "hundredths",
  [-3]: "thousandths",
  [-4]: "ten-thousandths",
  [-5]: "hundred-thousandths",
  [-6]: "millionths",
};
const placeName = (pos: number) => PLACE_NAMES[pos] ?? `10^${pos}`;
const ordinal = (k: number) => `${k}${k === 1 ? "st" : k === 2 ? "nd" : k === 3 ? "rd" : "th"}`;

type Mode = "dp" | "sf";

interface Rounded {
  /** Rounding to a multiple of 10^p. */
  p: number;
  /** Lower candidate = lowQ × 10^p; upper candidate = (lowQ + 1) × 10^p. */
  lowQ: bigint;
  roundedQ: bigint;
  /** Where x sits between the candidates (0 = lower, 1 = upper). */
  t: number;
  up: boolean;
  exact: boolean;
  halfway: boolean;
  /** The digit just after the last kept digit. */
  decider: number;
  /** Rounding up a 9 carried into the next column. */
  carry: boolean;
  /** Significant-figure rounding that gained a digit (9.97 → 10). */
  overflow: boolean;
  /** Decimal places to show in the answer. */
  places: number;
  answer: string;
  lower: string;
  upper: string;
  mid: string;
  intervalLo: string;
  intervalHi: string;
}

function roundDec(d: Dec, mode: Mode, n: number): Rounded | null {
  const lead = leadPos(d);
  if (mode === "sf" && lead === null) return null;
  const p = mode === "dp" ? -n : (lead as number) - n + 1;
  let lowQ: bigint;
  let r = 0n;
  let D = 1n;
  if (p <= d.s) {
    lowQ = d.m * pow10(d.s - p);
  } else {
    D = pow10(p - d.s);
    lowQ = d.m / D;
    r = d.m % D;
  }
  const up = 2n * r >= D && r > 0n;
  const roundedQ = up ? lowQ + 1n : lowQ;
  const overflow = mode === "sf" && roundedQ === pow10(n);
  const places = mode === "dp" ? n : overflow ? Math.max(0, -p - 1) : Math.max(0, -p);
  const axisPlaces = Math.max(0, -p);
  const t = r === 0n ? 0 : Number((r * 10000n) / D) / 10000;
  const intervalHi = overflow ? fmt(roundedQ + 5n, p, Math.max(0, -p)) : fmt(roundedQ * 10n + 5n, p - 1, Math.max(0, 1 - p));
  return {
    p,
    lowQ,
    roundedQ,
    t,
    up,
    exact: r === 0n,
    halfway: r > 0n && 2n * r === D,
    decider: digitAt(d, p - 1),
    carry: up && lowQ % 10n === 9n,
    overflow,
    places,
    answer: fmt(roundedQ, p, places),
    lower: fmt(lowQ, p, axisPlaces),
    upper: fmt(lowQ + 1n, p, axisPlaces),
    mid: fmt(lowQ * 10n + 5n, p - 1, Math.max(0, 1 - p)),
    intervalLo: fmt(roundedQ * 10n - 5n, p - 1, Math.max(0, 1 - p)),
    intervalHi,
  };
}

function trimZeros(s: string): string {
  if (!s.includes(".")) return s;
  return s.replace(/0+$/, "").replace(/\.$/, "");
}

const PRESETS: { label: string; value: string }[] = [
  { label: "4.736", value: "4.736" },
  { label: "2.996", value: "2.996" },
  { label: "0.004 56", value: "0.00456" },
  { label: "45 678", value: "45678" },
  { label: "3.14159", value: "3.14159" },
  { label: "9.97", value: "9.97" },
  { label: "0.0705", value: "0.0705" },
];

function randomNumberString(): string {
  const r = (a: number, b: number) => a + Math.floor(Math.random() * (b - a + 1));
  const kind = r(0, 4);
  if (kind === 0) return `${r(1, 99)}.${r(101, 999)}`;
  if (kind === 1) return `0.00${r(101, 999)}`;
  if (kind === 2) return String(r(10001, 99999));
  if (kind === 3) return `${r(1, 9)}.${r(0, 1) ? "99" : `${r(1, 8)}9`}${r(5, 9)}`;
  return `0.${r(1, 9)}${r(0, 9)}${r(0, 9)}${r(1, 9)}`;
}

type DigitRole = "kept" | "decider" | "dropped" | "placeholder";

function RoundingMicroscope() {
  const inputId = useId();
  const [raw, setRaw] = useState("4.736");
  const [mode, setMode] = useState<Mode>("dp");
  const [n, setN] = useState(1);

  const dec = useMemo(() => parseDec(raw), [raw]);
  const res = useMemo(() => (dec ? roundDec(dec, mode, n) : null), [dec, mode, n]);
  const lead = dec ? leadPos(dec) : null;

  const acc = mode === "dp" ? `${n} d.p.` : `${n} s.f.`;
  const xStr = dec ? fmt(dec.m, dec.s, -dec.s) : "";

  // ----- digit row -----
  let digitRow: ReactNode = null;
  if (dec && res) {
    const hi = Math.max(lead ?? 0, 0);
    const lo = Math.min(dec.s, res.p - 1);
    const cells: ReactNode[] = [];
    for (let pos = hi; pos >= lo; pos--) {
      const padded = pos < dec.s;
      const isPlaceholder = mode === "sf" && (lead === null || pos > lead);
      const role: DigitRole = isPlaceholder ? "placeholder" : pos >= res.p ? "kept" : pos === res.p - 1 ? "decider" : "dropped";
      const label =
        mode === "dp" ? (pos < 0 ? String(-pos) : "") : !isPlaceholder && lead !== null && pos >= res.p - 1 ? ordinal(lead - pos + 1) : "";
      const cls =
        role === "kept"
          ? "border-brand bg-brand-soft text-brand"
          : role === "decider"
            ? "border-warn bg-warn-soft text-warn"
            : role === "placeholder"
              ? "border-line bg-surface-2 text-ink-2"
              : "border-line bg-surface text-ink-2 opacity-50";
      if (pos === -1) {
        cells.push(
          <span key="pt" className="self-end pb-1 text-2xl font-extrabold text-ink">
            .
          </span>,
        );
      }
      cells.push(
        <div key={pos} className="flex flex-col items-center">
          <span className="h-4 text-[10px] font-bold leading-4 text-ink-2">{label}</span>
          <span
            className={`flex h-10 w-6 items-center justify-center rounded-md border-2 text-lg sm:w-7 sm:text-xl font-extrabold tabular-nums ${cls} ${padded ? "border-dashed" : ""}`}
          >
            {digitAt(dec, pos)}
          </span>
        </div>,
      );
    }
    digitRow = (
      <div>
        <div className="flex flex-wrap items-end justify-center gap-0.5 font-mono" aria-hidden>
          {cells}
        </div>
        <p className="mt-1 text-center text-[11px] font-semibold text-ink-2">
          Top labels: {mode === "dp" ? "decimal place number" : "significant figure number"}
        </p>
        <div className="mt-2 flex flex-wrap justify-center gap-1.5 text-xs">
          <span className="chip border-brand text-brand">kept</span>
          <span className="chip border-warn text-warn">next digit decides</span>
          <span className="chip opacity-60">dropped</span>
          {mode === "sf" && (lead ?? 0) < 0 ? <span className="chip">placeholder zero</span> : null}
          {dec.s > Math.min(dec.s, res.p - 1) ? <span className="chip border-dashed">zero added</span> : null}
        </div>
      </div>
    );
  }

  // ----- number line -----
  let numberLine: ReactNode = null;
  if (dec && res) {
    const X0 = 46;
    const X1 = 294;
    const Y = 62;
    const xAt = (t: number) => X0 + (X1 - X0) * t;
    const xp = xAt(res.t);
    const chosenX = res.up ? X1 : X0;
    const labelX = Math.min(300, Math.max(40, xp));
    const nearer = res.exact ? "exactly on" : res.halfway ? "exactly halfway, and by convention goes up to" : "nearer to";
    numberLine = (
      <svg
        viewBox="0 0 340 112"
        className="h-auto w-full"
        role="img"
        aria-label={`Number line from ${res.lower} to ${res.upper} with halfway mark ${res.mid}. ${xStr} is ${nearer} ${res.up ? res.upper : res.lower}, so it rounds to ${res.answer}.`}
      >
        {!res.exact ? (
          <line x1={xp} y1={Y} x2={chosenX} y2={Y} className="stroke-good" strokeWidth={8} strokeLinecap="round" opacity={0.45} />
        ) : null}
        <line x1={X0} y1={Y} x2={X1} y2={Y} className="stroke-ink-2" strokeWidth={2} />
        {Array.from({ length: 11 }, (_, k) => {
          const x = xAt(k / 10);
          const big = k === 0 || k === 10;
          const half = k === 5;
          const h = big ? 12 : half ? 10 : 5;
          return (
            <line
              key={k}
              x1={x}
              x2={x}
              y1={Y - h}
              y2={Y + h}
              className={half ? "stroke-warn" : "stroke-ink-2"}
              strokeWidth={big ? 2 : half ? 2 : 1}
              strokeDasharray={half ? "3 2" : undefined}
            />
          );
        })}
        <text x={X0} y={Y + 30} fontSize={13} textAnchor="middle" className={!res.up ? "fill-good" : "fill-ink-2"} fontWeight={!res.up ? 800 : 600}>
          {res.lower}
        </text>
        <text x={X1} y={Y + 30} fontSize={13} textAnchor="middle" className={res.up ? "fill-good" : "fill-ink-2"} fontWeight={res.up ? 800 : 600}>
          {res.upper}
        </text>
        <text x={xAt(0.5)} y={Y + 30} fontSize={11} textAnchor="middle" className="fill-warn" fontWeight={700}>
          {res.mid}
        </text>
        <text x={xAt(0.5)} y={Y + 44} fontSize={10} textAnchor="middle" className="fill-ink-2">
          halfway
        </text>
        <line x1={xp} y1={Y - 14} x2={xp} y2={Y - 7} className="stroke-brand" strokeWidth={1.5} />
        <circle cx={xp} cy={Y} r={6} className="fill-brand stroke-surface" strokeWidth={2} />
        <text x={labelX} y={Y - 20} fontSize={13} textAnchor="middle" className="fill-brand" fontWeight={800}>
          {xStr}
        </text>
      </svg>
    );
  }

  // ----- caption -----
  let caption: ReactNode;
  const trimmedRaw = raw.trim();
  if (!dec) {
    caption =
      trimmedRaw.startsWith("-") || trimmedRaw.startsWith("−") ? (
        <span>
          This microscope works with positive numbers. For a negative number, round its <strong>size</strong> and put the − sign back:
          −3.46 ≈ −3.5 (1 d.p.).
        </span>
      ) : (
        <span>Type a positive number using digits and at most one decimal point, such as 3.14159 or 0.004 56.</span>
      );
  } else if (!res) {
    caption = <span>0 has no significant figures — there is no first non-zero digit to start counting from.</span>;
  } else {
    const step = fmt(1n, res.p, Math.max(0, -res.p));
    const what =
      mode === "dp" ? (
        n === 0 ? (
          <>Rounding to 0 d.p. means rounding to the nearest whole number. </>
        ) : (
          <>
            Rounding to {n} d.p. keeps {n} digit{n > 1 ? "s" : ""} after the decimal point, so you round to the nearest {step}.{" "}
          </>
        )
      ) : (
        <>
          The 1st significant figure is the first non-zero digit: the {digitAt(dec, lead as number)} in the {placeName(lead as number)}{" "}
          place.{" "}
          {(lead as number) < 0 ? <>The zeros in front of it are only placeholders, so they don&apos;t count. </> : null}
          So {n} s.f. means rounding to the nearest {step}.{" "}
        </>
      );
    let decide: ReactNode;
    if (res.exact) {
      decide = (
        <>
          {xStr} has nothing after the {placeName(res.p)} place (any further digits are 0), so nothing changes — it is already exact
          to {acc}.{" "}
        </>
      );
    } else if (res.halfway) {
      decide = (
        <>
          {xStr} lies between {res.lower} and {res.upper}, and it is <strong>exactly halfway</strong> ({res.mid}). The next digit is 5,
          and the convention is to round <strong>up</strong> to {res.upper}.{" "}
        </>
      );
    } else if (res.up) {
      decide = (
        <>
          {xStr} lies between {res.lower} and {res.upper}. The next digit is {res.decider}, which is 5 or more, so it is past halfway (
          {res.mid}) and nearer {res.upper}: round <strong>up</strong>.{" "}
        </>
      );
    } else {
      decide = (
        <>
          {xStr} lies between {res.lower} and {res.upper}. The next digit is {res.decider}, which is less than 5, so it is before halfway
          ({res.mid}) and nearer {res.lower}: round <strong>down</strong> (the kept digits stay the same).{" "}
        </>
      );
    }
    const notes: ReactNode[] = [];
    if (res.carry) {
      notes.push(
        <Fragment key="carry">
          Rounding up a 9 makes it 10, so 1 carries into the next column: {res.lower} + {step} = {res.upper}.{" "}
        </Fragment>,
      );
    }
    if (res.overflow && res.upper !== res.answer) {
      notes.push(
        <Fragment key="over">
          The carry creates a new leading digit, so {res.upper} is written {res.answer} to keep exactly {n} s.f.{" "}
        </Fragment>,
      );
    }
    if (res.overflow) {
      notes.push(
        <Fragment key="lopsided">
          (Stretch: the error interval is lopsided here — just below {res.answer} you round to the nearest {step}, but just above it the
          step is ten times bigger.){" "}
        </Fragment>,
      );
    }
    if (mode === "sf" && res.p > 0 && !res.overflow) {
      notes.push(
        <Fragment key="size">
          Fill the dropped places with zeros so the number keeps its size: {res.answer}, not {res.roundedQ.toString()}.{" "}
        </Fragment>,
      );
    }
    if (res.places > 0 && res.answer.endsWith("0")) {
      const many = /00$/.test(res.answer);
      const why =
        mode === "dp"
          ? `${many ? "they show" : "it shows"} the answer is accurate to ${n} d.p.`
          : `${many ? "they are significant figures" : "it is a significant figure"} here`;
      notes.push(
        <Fragment key="zeros">
          Keep the final zero{many ? "s" : ""} in {res.answer}: {why}
          {trimZeros(res.answer) !== res.answer ? ` (writing ${trimZeros(res.answer)} would claim less accuracy).` : "."}{" "}
        </Fragment>,
      );
    }
    caption = (
      <span>
        {what}
        {decide}
        {notes}
        <strong>
          {xStr} ≈ {res.answer} ({acc})
        </strong>
      </span>
    );
  }

  const setPrecisionMode = (m: Mode) => {
    setMode(m);
    if (m === "sf" && n < 1) setN(1);
    if (m === "dp" && n > 4) setN(4);
  };

  return (
    <WidgetFrame
      title="Rounding microscope"
      tryThis={[
        "Round 2.996 to 2 d.p. Predict first: why does the answer need two zeros?",
        "Round 0.004 56 to 2 s.f. Which zeros count as significant figures?",
        "Round 45 678 to 2 s.f. Why is the answer not 46?",
        "Find a number that rounds to 3.5 (1 d.p.) but to 4 to the nearest whole number.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="space-y-2">
          <label htmlFor={inputId} className="block text-sm font-semibold text-ink-2">
            Your number
          </label>
          <div className="flex gap-2">
            <input
              id={inputId}
              className="input font-mono"
              inputMode="decimal"
              autoComplete="off"
              spellCheck={false}
              maxLength={14}
              value={raw}
              onChange={(e) => setRaw(e.target.value)}
            />
            <button type="button" className="btn btn-secondary shrink-0" onClick={() => setRaw(randomNumberString())} aria-label="Random number">
              🎲
            </button>
          </div>
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Example numbers">
            {PRESETS.map((pr) => (
              <button
                key={pr.value}
                type="button"
                onClick={() => setRaw(pr.value)}
                className={`min-h-10 rounded-lg border px-2.5 text-sm font-bold tabular-nums ${raw === pr.value ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink-2"}`}
              >
                {pr.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented<Mode>
            label="Round to"
            value={mode}
            onChange={setPrecisionMode}
            options={[
              { value: "dp", label: "Decimal places" },
              { value: "sf", label: "Significant figures" },
            ]}
          />
          <div className="min-w-[200px] flex-1">
            <Stepper
              label={mode === "dp" ? "Decimal places" : "Significant figures"}
              value={n}
              min={mode === "dp" ? 0 : 1}
              max={mode === "dp" ? 4 : 5}
              onChange={setN}
            />
          </div>
        </div>

        {digitRow}
        {numberLine}

        {res ? (
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            <Readout label={`Answer (${acc})`} value={res.answer} tone="good" />
            <Readout label="Next digit" value={res.exact ? "0 (nothing left)" : String(res.decider)} tone="ink" />
            <Readout label="Error interval (stretch)" value={`${res.intervalLo} ≤ x < ${res.intervalHi}`} tone="brand" />
          </div>
        ) : null}
      </div>
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. Fraction → decimal machine (long division with remainders)
// ===========================================================================

interface LongDivision {
  n: number;
  d: number;
  whole: number;
  digits: number[];
  /** rems[0] = n mod d; rems[i] = remainder after the i-th decimal digit. */
  rems: number[];
  terminates: boolean;
  /** Index in `digits` where the repeating block starts (−1 if it terminates). */
  cycleStart: number;
  cycleLen: number;
}

function longDivide(n: number, d: number): LongDivision {
  const whole = Math.floor(n / d);
  let r = n % d;
  const rems = [r];
  const digits: number[] = [];
  const base = { n, d, whole, digits, rems };
  if (r === 0) return { ...base, terminates: true, cycleStart: -1, cycleLen: 0 };
  const seen = new Map<number, number>([[r, 0]]);
  // At most d − 1 non-zero remainders exist, so this loop ends within d steps.
  for (let guard = 0; guard <= d + 1; guard++) {
    const q = Math.floor((r * 10) / d);
    r = (r * 10) % d;
    digits.push(q);
    rems.push(r);
    if (r === 0) return { ...base, terminates: true, cycleStart: -1, cycleLen: 0 };
    const j = seen.get(r);
    if (j !== undefined) return { ...base, terminates: false, cycleStart: j, cycleLen: digits.length - j };
    seen.set(r, digits.length);
  }
  return { ...base, terminates: false, cycleStart: 0, cycleLen: digits.length };
}

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) [x, y] = [y, x % y];
  return x || 1;
}

function primeFactors(k: number): [number, number][] {
  const out: [number, number][] = [];
  let x = k;
  for (let p = 2; p * p <= x; p++) {
    let e = 0;
    while (x % p === 0) {
      x /= p;
      e++;
    }
    if (e) out.push([p, e]);
  }
  if (x > 1) out.push([x, 1]);
  return out;
}

/** Maths-markup string for a factorisation, e.g. "2^3 * 5". */
function factorMarkup(f: [number, number][]): string {
  return f.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" * ");
}

/** "12 = 2² × 3", or just "7 (prime)" when there is nothing to factorise. */
function FactorEq({ k, f }: { k: number; f: [number, number][] }) {
  if (f.length === 1 && f[0][1] === 1) return <>{k} (prime)</>;
  return (
    <>
      {k} = <M>{factorMarkup(f)}</M>
    </>
  );
}

function DotDecimal({ ld }: { ld: LongDivision }) {
  const { whole, digits, cycleStart, cycleLen, terminates } = ld;
  const spoken = terminates
    ? `${whole}${digits.length ? `.${digits.join("")}` : ""}`
    : `${whole}.${digits.slice(0, cycleStart).join("")} with ${digits.slice(cycleStart).join("")} recurring`;
  return (
    <span className="whitespace-nowrap font-mono">
      <span className="sr-only">{spoken}</span>
      <span aria-hidden>
        {whole}
        {digits.length ? "." : ""}
        {digits.map((dg, i) => {
          const dot = !terminates && (i === cycleStart || i === cycleStart + cycleLen - 1);
          return (
            <span key={i} className="relative inline-block">
              {dg}
              {dot ? <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 text-[0.7em] leading-none">●</span> : null}
            </span>
          );
        })}
      </span>
    </span>
  );
}

function RemainderClock({ ld, shown }: { ld: LongDivision; shown: number }) {
  const { d, rems } = ld;
  const C = 130;
  const R = 102;
  const spacing = (2 * Math.PI * R) / d;
  const nodeR = Math.max(6, Math.min(13, spacing * 0.42));
  const font = Math.max(7, Math.min(12, nodeR * 0.95));
  const pos = (k: number) => {
    const a = -Math.PI / 2 + (2 * Math.PI * k) / d;
    return { x: C + R * Math.cos(a), y: C + R * Math.sin(a) };
  };
  const visited = rems.slice(0, shown + 1);
  const current = visited[visited.length - 1];
  const done = shown === ld.digits.length;
  const repeated = done && !ld.terminates ? current : null;
  const path = visited.map((r) => pos(r));
  return (
    <svg
      viewBox="0 0 260 260"
      className="mx-auto h-auto w-full max-w-[300px]"
      role="img"
      aria-label={`Remainder clock for dividing by ${d}: remainders 0 to ${d - 1} round a circle. Remainders so far: ${visited.join(", ")}.${repeated !== null ? ` Remainder ${repeated} has repeated, so the digits cycle.` : ""}${done && ld.terminates ? " Remainder 0 reached, so the decimal stops." : ""}`}
    >
      <circle cx={C} cy={C} r={R} className="fill-none stroke-line" strokeWidth={1} />
      {path.slice(1).map((pt, i) => {
        const prev = path[i];
        const last = i === path.length - 2;
        return (
          <line
            key={i}
            x1={prev.x}
            y1={prev.y}
            x2={pt.x}
            y2={pt.y}
            className="stroke-brand"
            strokeWidth={last ? 3 : 1.5}
            opacity={last ? 0.95 : 0.4}
          />
        );
      })}
      {Array.from({ length: d }, (_, k) => {
        const { x, y } = pos(k);
        const isVisited = visited.includes(k);
        const isCurrent = k === current;
        const cls =
          k === 0
            ? done && ld.terminates
              ? "fill-good stroke-good"
              : "fill-good-soft stroke-good"
            : isCurrent
              ? "fill-brand stroke-brand"
              : isVisited
                ? "fill-brand-soft stroke-brand"
                : "fill-surface stroke-line";
        const textCls = (k === 0 && done && ld.terminates) || (isCurrent && k !== 0) ? "fill-brand-ink" : k === 0 ? "fill-good" : isVisited ? "fill-brand" : "fill-ink-2";
        return (
          <g key={k}>
            {repeated === k ? <circle cx={x} cy={y} r={nodeR + 4} className="fill-none stroke-warn" strokeWidth={2.5} /> : null}
            <circle cx={x} cy={y} r={nodeR} className={cls} strokeWidth={1.5} />
            <text x={x} y={y + font * 0.36} fontSize={font} textAnchor="middle" className={textCls} fontWeight={700}>
              {k}
            </text>
          </g>
        );
      })}
      <text x={C} y={C - 4} fontSize={13} textAnchor="middle" className="fill-ink" fontWeight={800}>
        remainders
      </text>
      <text x={C} y={C + 13} fontSize={12} textAnchor="middle" className="fill-ink-2">
        when dividing by {d}
      </text>
    </svg>
  );
}

const FRACTION_PRESETS: [number, number][] = [
  [1, 3],
  [1, 7],
  [3, 8],
  [1, 6],
  [5, 12],
  [2, 11],
  [1, 17],
  [9, 40],
];

function FractionDecimalMachine() {
  const [num, setNum] = useState(1);
  const [den, setDen] = useState(7);
  const [steps, setSteps] = useState(() => longDivide(1, 7).digits.length);

  const ld = useMemo(() => longDivide(num, den), [num, den]);
  const total = ld.digits.length;
  const k = Math.min(steps, total);
  const done = k === total;

  const setFraction = (a: number, b: number) => {
    setNum(a);
    setDen(b);
    setSteps(longDivide(a, b).digits.length);
  };

  const g = gcd(num, den);
  const sn = num / g;
  const sd = den / g;
  const factors = primeFactors(sd);
  const others = factors.filter(([p]) => p !== 2 && p !== 5).map(([p]) => p);
  const twos = factors.find(([p]) => p === 2)?.[1] ?? 0;
  const fives = factors.find(([p]) => p === 5)?.[1] ?? 0;
  const tdp = Math.max(twos, fives);

  const soFar = `${ld.whole}${k > 0 ? `.${ld.digits.slice(0, k).join("")}` : ""}`;
  const frac = `${num}/${den}`;

  // ----- caption -----
  let caption: ReactNode;
  if (ld.rems[0] === 0) {
    caption = (
      <span>
        {num} ÷ {den} = {ld.whole} exactly: {den} goes into {num} with no remainder, so there is no decimal part at all. Try a numerator
        that isn&apos;t a multiple of {den}.
      </span>
    );
  } else if (k === 0) {
    caption = (
      <span>
        <M>{frac}</M> means {num} ÷ {den}. {den} goes into {num} {ld.whole} time{ld.whole === 1 ? "" : "s"}, remainder {ld.rems[0]}. Each
        step: put a 0 after the remainder (×10), divide by {den}, write the result as the next digit and carry the new remainder. Use{" "}
        <strong>Next step</strong> — and predict each digit first.
      </span>
    );
  } else if (!done) {
    const rPrev = ld.rems[k - 1];
    caption = (
      <span>
        Step {k}: remainder {rPrev} → {rPrev * 10} ÷ {den} = {ld.digits[k - 1]} remainder {ld.rems[k]}, so digit {k} is{" "}
        <strong>{ld.digits[k - 1]}</strong>. Every remainder is a whole number from 0 to {den - 1} — watch the clock. What will the next
        digit be?
      </span>
    );
  } else if (ld.terminates) {
    const pow = 10 ** tdp;
    const mult = sd > 1 ? pow / sd : 1;
    caption = (
      <span>
        Remainder <strong>0</strong> — the division stops, so <M>{frac}</M> = {soFar} is a <strong>terminating</strong> decimal.{" "}
        {g > 1 ? (
          <>
            In simplest form it is <M>{`${sn}/${sd}`}</M>.{" "}
          </>
        ) : null}
        {sd > 1 ? (
          <>
            The denominator <FactorEq k={sd} f={factors} /> has only 2s and 5s as prime factors, so it divides a power of 10:{" "}
            <M>{`${sn}/${sd} = (${sn} * ${mult})/(${sd} * ${mult}) = ${sn * mult}/${pow}`}</M> = {soFar}. The denominator becomes{" "}
            {pow} (a 1 followed by {tdp} zero{tdp === 1 ? "" : "s"}), so there {tdp === 1 ? "is 1 decimal place" : `are ${tdp} decimal places`}.
          </>
        ) : null}
      </span>
    );
  } else {
    const rep = ld.rems[total];
    const firstAt = ld.cycleStart;
    caption = (
      <span>
        Remainder <strong>{rep}</strong> has turned up before ({firstAt === 0 ? "it was the very first remainder" : `after step ${firstAt}`}
        ). Same remainder → same next step, so the digits <strong>{ld.digits.slice(ld.cycleStart).join("")}</strong> repeat for ever:{" "}
        <M>{frac}</M> = <DotDecimal ld={ld} /> = {soFar}
        {ld.digits.slice(ld.cycleStart).join("")}… With only {den - 1} possible non-zero remainders, a repeat <em>must</em> come within{" "}
        {den - 1} steps.{" "}
        {g > 1 ? (
          <>
            In simplest form it is <M>{`${sn}/${sd}`}</M>.{" "}
          </>
        ) : null}
        The denominator <FactorEq k={sd} f={factors} /> has the prime factor{others.length > 1 ? "s" : ""} {others.join(" and ")},
        which no power of 10 contains — so it can never divide exactly into 10, 100, 1000, …
      </span>
    );
  }

  // ----- digit row -----
  const showCycle = done && !ld.terminates;
  const repIdx = showCycle ? new Set([ld.cycleStart, total]) : new Set<number>();
  const wholeStr = String(ld.whole);

  return (
    <WidgetFrame
      title="Fraction → decimal machine"
      tryThis={[
        "Which denominators from 2 to 20 give terminating decimals? Look at their prime factors.",
        "{{1/6}} recurs but {{3/6}} stops. Why?",
        "Step through {{1/7}}, {{2/7}}, {{3/7}} … What do you notice about the six digits?",
        "Find a fraction whose repeating block is 16 digits long.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Slider label="Numerator" value={num} min={1} max={40} onChange={(v) => setFraction(v, den)} />
          <Slider label="Denominator" value={den} min={2} max={40} onChange={(v) => setFraction(num, v)} />
        </div>
        <div className="flex flex-wrap gap-1.5" role="group" aria-label="Example fractions">
          {FRACTION_PRESETS.map(([a, b]) => (
            <button
              key={`${a}/${b}`}
              type="button"
              onClick={() => setFraction(a, b)}
              aria-label={`${a} over ${b}`}
              className={`min-h-10 min-w-10 rounded-lg border px-2 text-sm font-bold ${a === num && b === den ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink"}`}
            >
              <M>{`${a}/${b}`}</M>
            </button>
          ))}
        </div>

        <div className="rounded-xl border border-line bg-surface-2 p-3">
          <div className="flex flex-wrap items-center justify-center gap-2 text-2xl font-extrabold text-ink">
            <M>{frac}</M>
            <span>=</span>
            {done ? (
              <span className="pt-2 text-brand">
                <DotDecimal ld={ld} />
              </span>
            ) : (
              <span className="font-mono text-ink">{soFar}…</span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-start justify-center gap-y-2 font-mono" role="group" aria-label="Long division digits with the remainder after each step">
            <div className="flex flex-col items-center">
              <span className="flex h-10 min-w-7 items-center justify-center rounded-md border-2 border-line bg-surface px-1 text-xl font-extrabold">
                {wholeStr}
              </span>
              <span className={`mt-0.5 text-[10px] font-bold ${repIdx.has(0) ? "text-warn" : "text-ink-2"}`}>r{ld.rems[0]}</span>
            </div>
            {total > 0 ? <span className="self-start px-0.5 pt-3 text-2xl font-extrabold leading-none">.</span> : null}
            {ld.digits.slice(0, Math.min(total, k + 1)).map((dg, i) => {
              const shown = i < k;
              const inCycle = showCycle && i >= ld.cycleStart;
              const next = i === k;
              const r = ld.rems[i + 1];
              const rCls = !shown ? "text-transparent" : repIdx.has(i + 1) ? "text-warn" : done && ld.terminates && r === 0 ? "text-good" : "text-ink-2";
              return (
                <div key={i} className="ml-0.5 flex flex-col items-center">
                  <span
                    className={`flex h-10 w-6 items-center justify-center rounded-md border-2 text-lg sm:w-7 sm:text-xl font-extrabold ${
                      !shown ? (next ? "border-dashed border-brand text-brand" : "border-dashed border-line text-transparent") : inCycle ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink"
                    }`}
                  >
                    {shown ? dg : next ? "?" : "·"}
                  </span>
                  <span className={`mt-0.5 h-4 text-[10px] font-bold ${rCls}`}>{shown ? `r${r}` : ""}</span>
                </div>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[11px] font-semibold text-ink-2">
            Under each digit: the remainder (r) carried to the next step.{showCycle ? " The highlighted remainders match — that is where the cycle starts again." : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-secondary" onClick={() => setSteps(0)} disabled={k === 0}>
            ⏮ Start
          </button>
          <button type="button" className="btn btn-primary" onClick={() => setSteps(Math.min(total, k + 1))} disabled={done}>
            Next step ▶
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setSteps(total)} disabled={done}>
            Show all ⏭
          </button>
          <span className="text-sm font-semibold text-ink-2">
            Step {k} of {total}
          </span>
        </div>

        <div className="grid items-center gap-3 sm:grid-cols-2">
          <RemainderClock ld={ld} shown={k} />
          <div className="grid gap-2">
            <Readout
              label="Type"
              value={ld.rems[0] === 0 ? "Whole number" : ld.terminates ? `Terminating (${total} d.p.)` : `Recurring (block of ${ld.cycleLen})`}
              tone={ld.terminates ? "good" : "brand"}
            />
            <Readout
              label="Denominator in simplest form"
              value={
                sd === 1 ? (
                  "1"
                ) : (
                  <span>
                    <FactorEq k={sd} f={factors} />
                  </span>
                )
              }
              tone="ink"
            />
            <Readout
              label="Only 2s and 5s?"
              value={sd === 1 || others.length === 0 ? "Yes → it stops" : `No (${others.join(", ")}) → it recurs`}
              tone={sd === 1 || others.length === 0 ? "good" : "bad"}
            />
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "rounding-microscope",
    title: "Rounding microscope",
    blurb: "Zoom in between the two possible rounded answers and see which one your number is nearer — in decimal places or significant figures.",
    Component: RoundingMicroscope,
  },
  {
    id: "fraction-decimal-machine",
    title: "Fraction → decimal machine",
    blurb: "Step through long division, watch the remainders go round, and discover why some decimals stop and others repeat for ever.",
    Component: FractionDecimalMachine,
  },
];
