"use client";
// Interactive explorables for the "probability" topic.
//  1. Sample-space grid — two dice (or spinners numbered 1 to n), combined by
//     total / difference / product / larger number. Pick an event and watch the
//     favourable cells light up, with P(event), P(not event), the product rule
//     and the probability scale, plus a bar chart of how often each value occurs.
//  2. Experiment lab — spin a spinner you design (or roll a mystery die) 1, 10,
//     100 or 1000 times. The relative frequency settles towards the probability,
//     observed counts are compared with expected ones, and a "fair or loaded?"
//     detective game shows why more trials give better evidence.
import { useMemo, useState, type ReactNode } from "react";
import { WidgetFrame, Stepper, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Number helpers                                                             */
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

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Round to `dp` places and drop trailing zeros. */
function fmt(v: number, dp = 3): string {
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

/** "0.25" for an exact value, "≈0.167" for a rounded one. */
function approx(v: number, dp = 3): string {
  return (exactTo(v, dp) ? "" : "≈") + fmt(v, dp);
}

/** "= 0.25" or "≈ 0.167". */
function eqApprox(v: number, dp = 3): string {
  const s = approx(v, dp);
  return s.startsWith("≈") ? `≈ ${s.slice(1)}` : `= ${s}`;
}

/** A probability c/n: 0, 1, or the fraction (and its simplest form if different). */
function ProbFrac({ c, n }: { c: number; n: number }) {
  if (c === 0) return <>0</>;
  if (c === n) return <>1</>;
  const g = gcd(c, n);
  return (
    <>
      <M>{`${c}/${n}`}</M>
      {g > 1 ? (
        <>
          {" "}= <M>{`${c / g}/${n / g}`}</M>
        </>
      ) : null}
    </>
  );
}

/** Just the fraction c/n as written (0 and 1 shown as whole numbers). */
function FracText({ n, d }: { n: number; d: number }) {
  if (n === 0) return <>0</>;
  if (n === d) return <>1</>;
  return <M>{`${n}/${d}`}</M>;
}

function chanceWord(c: number, n: number): string {
  if (c === 0) return "impossible";
  if (c === n) return "certain";
  if (2 * c === n) return "an even chance";
  return 2 * c < n ? "unlikely" : "likely";
}

/** The 0-to-1 probability scale with a marker at p. */
function ProbScale({ p }: { p: number }) {
  const X0 = 20;
  const X1 = 320;
  const x = X0 + p * (X1 - X0);
  const label = `P ${eqApprox(p)}`;
  const lx = clamp(x, 46, 294);
  return (
    <svg viewBox="0 0 340 70" className="h-auto w-full" role="img" aria-label={`Probability scale from 0 (impossible) to 1 (certain). The marker is at ${label}.`}>
      <rect x={X0} y={26} width={X1 - X0} height={8} rx={4} className="fill-surface-2 stroke-line" strokeWidth={1} />
      {p > 0 ? <rect x={X0} y={26} width={x - X0} height={8} rx={4} className="fill-brand" opacity={0.45} /> : null}
      {[0, 0.25, 0.5, 0.75, 1].map((t) => (
        <line key={t} x1={X0 + t * (X1 - X0)} x2={X0 + t * (X1 - X0)} y1={21} y2={39} className="stroke-ink-2" strokeWidth={1} />
      ))}
      <text x={X0} y={51} fontSize={10} textAnchor="middle" className="fill-ink-2">0</text>
      <text x={(X0 + X1) / 2} y={51} fontSize={10} textAnchor="middle" className="fill-ink-2">0.5</text>
      <text x={X1} y={51} fontSize={10} textAnchor="middle" className="fill-ink-2">1</text>
      <text x={X0 - 6} y={65} fontSize={10} textAnchor="start" className="fill-ink-2">impossible</text>
      <text x={X0 + 0.25 * (X1 - X0)} y={65} fontSize={10} textAnchor="middle" className="fill-ink-2">unlikely</text>
      <text x={(X0 + X1) / 2} y={65} fontSize={10} textAnchor="middle" className="fill-ink-2">even chance</text>
      <text x={X0 + 0.75 * (X1 - X0)} y={65} fontSize={10} textAnchor="middle" className="fill-ink-2">likely</text>
      <text x={X1 + 6} y={65} fontSize={10} textAnchor="end" className="fill-ink-2">certain</text>
      <circle cx={x} cy={30} r={6} className="fill-brand stroke-surface" strokeWidth={2} />
      <text x={lx} y={14} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-brand">
        {label}
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Sample-space grid                                                       */
/* ------------------------------------------------------------------------ */

type Rule = "sum" | "diff" | "product" | "max";
type Cond = "eq" | "ge" | "le" | "even";

const RULES: Record<Rule, { label: string; noun: string; sym: string; f: (a: number, b: number) => number }> = {
  sum: { label: "Total", noun: "total", sym: "+", f: (a, b) => a + b },
  diff: { label: "Difference", noun: "difference", sym: "−", f: (a, b) => Math.abs(a - b) },
  product: { label: "Product", noun: "product", sym: "×", f: (a, b) => a * b },
  max: { label: "Larger", noun: "larger number", sym: "max", f: (a, b) => Math.max(a, b) },
};

function ruleRange(rule: Rule, nA: number, nB: number): [number, number] {
  if (rule === "sum") return [2, nA + nB];
  if (rule === "diff") return [0, Math.max(nA, nB) - 1];
  if (rule === "product") return [1, nA * nB];
  return [1, Math.max(nA, nB)];
}

function holds(v: number, cond: Cond, k: number): boolean {
  if (cond === "eq") return v === k;
  if (cond === "ge") return v >= k;
  if (cond === "le") return v <= k;
  return v % 2 === 0;
}

function eventName(rule: Rule, cond: Cond, k: number): string {
  const noun = RULES[rule].noun;
  if (cond === "even") return `${noun} is even`;
  const sym = cond === "eq" ? "=" : cond === "ge" ? "≥" : "≤";
  return `${noun} ${sym} ${k}`;
}

function SampleSpace() {
  const [nA, setNA] = useState(6);
  const [nB, setNB] = useState(6);
  const [rule, setRule] = useState<Rule>("sum");
  const [cond, setCond] = useState<Cond>("eq");
  const [kRaw, setK] = useState(7);

  const [lo, hi] = ruleRange(rule, nA, nB);
  const k = clamp(kRaw, lo, hi);
  const R = RULES[rule];
  const N = nA * nB;

  const cells = useMemo(() => {
    const out: { a: number; b: number; v: number }[] = [];
    for (let a = 1; a <= nA; a++) for (let b = 1; b <= nB; b++) out.push({ a, b, v: RULES[rule].f(a, b) });
    return out;
  }, [nA, nB, rule]);

  const dist = useMemo(() => {
    const m = new Map<number, number>();
    for (const c of cells) m.set(c.v, (m.get(c.v) ?? 0) + 1);
    return Array.from(m.entries())
      .sort((x, y) => x[0] - y[0])
      .map(([v, count]) => ({ v, count }));
  }, [cells]);

  const favCells = cells.filter((c) => holds(c.v, cond, k));
  const fav = favCells.length;
  const p = fav / N;
  const name = eventName(rule, cond, k);
  const maxCount = Math.max(...dist.map((d) => d.count));
  const modes = dist.filter((d) => d.count === maxCount).map((d) => d.v);

  // ---- extra insights, most important first ----
  const insights: ReactNode[] = [];
  if (fav === 0) insights.push(<>No cell works, so this event is <strong>impossible</strong>: its probability is 0.</>);
  if (fav === N) insights.push(<>Every cell works, so this event is <strong>certain</strong>: its probability is 1.</>);
  const oA = Math.ceil(nA / 2);
  const oB = Math.ceil(nB / 2);
  const eA = nA - oA;
  const eB = nB - oB;
  if (rule === "product" && cond === "even" && fav < N) {
    insights.push(
      <>
        Quicker by the complement: a product is odd only when <em>both</em> numbers are odd. That is {oA} × {oB} = {oA * oB} cells, so P(even
        product) = 1 − <FracText n={oA * oB} d={N} />.
      </>,
    );
  }
  if (rule === "sum" && cond === "even") {
    insights.push(
      <>
        A total is even when both numbers are odd or both are even: {oA} × {oB} + {eA} × {eB} = {fav} cells.
      </>,
    );
  }
  if (rule === "max" && cond === "eq" && nA === nB && k === nA && nA > 1) {
    const none = (nA - 1) * (nA - 1);
    insights.push(
      <>
        “Larger number = {k}” means <strong>at least one {k}</strong>. Count the complement instead: neither die shows {k} in {nA - 1} × {nA - 1} ={" "}
        {none} cells, so P = 1 − <FracText n={none} d={N} />. Adding {nA} + {nA} would count ({k}, {k}) twice.
      </>,
    );
  }
  if (rule === "max" && cond === "le" && fav > 0 && fav < N) {
    insights.push(
      <>
        “Larger number ≤ {k}” means <em>both</em> dice show {k} or less: {Math.min(k, nA)} × {Math.min(k, nB)} = {fav} cells — the product rule
        again.
      </>,
    );
  }
  if (rule === "diff" && cond === "eq" && k === 0) {
    insights.push(<>A difference of 0 means a <strong>double</strong> — the cells on the diagonal, one for each number both dice share.</>);
  }
  if (cond === "eq" && fav > 0 && fav < N && fav === maxCount) {
    insights.push(
      <>
        No other {R.noun} has more cells, so {k} is {modes.length > 1 ? "a joint" : "the"} <strong>most likely</strong> {R.noun} — look at the
        tallest bar.
      </>,
    );
  }
  if (cond === "eq" && fav > 0 && fav < N) {
    const pair = favCells.find((c) => c.a !== c.b && c.a <= nB && c.b <= nA);
    if (pair) {
      insights.push(
        <>
          Order matters: ({pair.a}, {pair.b}) and ({pair.b}, {pair.a}) are <em>different</em> cells, because die A and die B are different
          dice.
        </>,
      );
    }
  }

  // ---- grid geometry ----
  const CS = 34;
  const LAB = 18;
  const gx = LAB + CS;
  const gy = LAB + CS;
  const W = gx + nB * CS + 2;
  const H = gy + nA * CS + 2;
  const gridAria = `Sample space grid: die A from 1 to ${nA} down the side, die B from 1 to ${nB} across the top, each cell showing the ${R.noun}. ${fav} of the ${N} cells are highlighted because their ${name}.`;

  // ---- bar chart geometry ----
  const m = dist.length;
  const BX0 = 10;
  const BX1 = 330;
  const BASE = 112;
  const TOP = 20;
  const slot = (BX1 - BX0) / m;
  const bw = Math.max(2, slot * 0.72);
  const labelEvery = Math.ceil(m / 14);
  const showCounts = m <= 16;
  const barAria = `Bar chart of how many cells give each ${R.noun}. The most common ${R.noun}${modes.length > 1 ? "s are" : " is"} ${modes.join(" and ")}, with ${maxCount} cell${maxCount === 1 ? "" : "s"}${modes.length > 1 ? " each" : ""}.`;

  const condOptions: { value: Cond; label: ReactNode }[] = [
    { value: "eq", label: "= k" },
    { value: "ge", label: "≥ k" },
    { value: "le", label: "≤ k" },
    { value: "even", label: "even" },
  ];

  const caption = (
    <>
      <p>
        Each cell is one equally likely outcome (die A, die B), and there are {nA} × {nB} = {N} of them — the <strong>product rule</strong>.{" "}
        {fav === 1 ? "1 cell fits" : `${fav} cells fit`} the event <strong>{name}</strong>, so P({name}) = <ProbFrac c={fav} n={N} />
        {fav > 0 && fav < N ? ` ${eqApprox(p)}` : ""}: {chanceWord(fav, N)}.{" "}
        {fav === N ? (
          <>No cells are left over for the complement, so P(not) = 0.</>
        ) : (
          <>
            The other {N - fav} cell{N - fav === 1 ? "" : "s"} make{N - fav === 1 ? "s" : ""} the <strong>complement</strong>, so P(not) ={" "}
            <ProbFrac c={N - fav} n={N} />.
          </>
        )}{" "}
        Every cell is either lit or unlit, so the two probabilities always add up to 1.
      </p>
      {insights.slice(0, 2).map((x, i) => (
        <p key={i} className="mt-2">
          {x}
        </p>
      ))}
    </>
  );

  return (
    <WidgetFrame
      title="Two-dice sample space"
      tryThis={[
        "With two ordinary dice, which total is most likely? Predict, then check with the bars.",
        "Which is more likely: an even **total** or an even **product**? Decide before you look.",
        "Use **larger number = 6** to find P(at least one 6). Why is 1 − {{25/36}} a quicker route?",
        "Change die A to 1–4. Predict the number of outcomes, then find an event with probability {{1/2}}.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <Stepper label="Die A: 1 to" value={nA} min={2} max={8} onChange={setNA} />
          <Stepper label="Die B: 1 to" value={nB} min={2} max={8} onChange={setNB} />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-ink-2">Combine the two numbers</div>
          <Segmented<Rule>
            label="Combine the two numbers"
            value={rule}
            onChange={setRule}
            options={(Object.keys(RULES) as Rule[]).map((r) => ({ value: r, label: RULES[r].label }))}
          />
        </div>
        <div className="space-y-2">
          <div className="text-sm font-semibold text-ink-2">Event: the {R.noun} is…</div>
          <div className="flex flex-wrap items-center gap-3">
            <Segmented<Cond> label="Event condition" value={cond} onChange={setCond} options={condOptions} />
            {cond !== "even" ? (
              <div className="min-w-[9rem]">
                <Stepper label="k" value={k} min={lo} max={hi} onChange={setK} />
              </div>
            ) : null}
          </div>
        </div>

        <p className="text-center text-sm font-bold text-ink">
          Event: <span className="text-brand">{name}</span> · {fav} of {N} cells
        </p>

        <svg viewBox={`0 0 ${W} ${H}`} className="mx-auto h-auto w-full" style={{ maxWidth: Math.round(W * 1.35) }} role="img" aria-label={gridAria}>
          <text x={gx + (nB * CS) / 2} y={12} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink-2">
            Die B
          </text>
          <text x={0} y={0} transform={`translate(12 ${gy + (nA * CS) / 2}) rotate(-90)`} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink-2">
            Die A
          </text>
          <rect x={LAB} y={LAB} width={CS} height={CS} rx={4} className="fill-surface-2 stroke-surface" strokeWidth={2} />
          <text x={LAB + CS / 2} y={LAB + CS / 2 + 4} fontSize={rule === "max" ? 10 : 14} fontWeight={800} textAnchor="middle" className="fill-ink-2">
            {R.sym}
          </text>
          {Array.from({ length: nB }, (_, i) => (
            <g key={`hb${i}`}>
              <rect x={gx + i * CS} y={LAB} width={CS} height={CS} rx={4} className="fill-brand-soft stroke-surface" strokeWidth={2} />
              <text x={gx + i * CS + CS / 2} y={LAB + CS / 2 + 5} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-brand">
                {i + 1}
              </text>
            </g>
          ))}
          {Array.from({ length: nA }, (_, i) => (
            <g key={`ha${i}`}>
              <rect x={LAB} y={gy + i * CS} width={CS} height={CS} rx={4} className="fill-brand-soft stroke-surface" strokeWidth={2} />
              <text x={LAB + CS / 2} y={gy + i * CS + CS / 2 + 5} fontSize={13} fontWeight={800} textAnchor="middle" className="fill-brand">
                {i + 1}
              </text>
            </g>
          ))}
          {cells.map((c) => {
            const on = holds(c.v, cond, k);
            const x = gx + (c.b - 1) * CS;
            const y = gy + (c.a - 1) * CS;
            return (
              <g key={`${c.a}-${c.b}`}>
                <rect x={x} y={y} width={CS} height={CS} rx={4} className={`${on ? "fill-brand" : "fill-surface-2"} stroke-surface`} strokeWidth={2} />
                <text
                  x={x + CS / 2}
                  y={y + CS / 2 + 4.5}
                  fontSize={13}
                  fontWeight={on ? 800 : 500}
                  textAnchor="middle"
                  className={on ? "fill-brand-ink" : "fill-ink-2"}
                >
                  {c.v}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          <Readout label="Outcomes" value={`${nA} × ${nB} = ${N}`} tone="ink" />
          <Readout label="Favourable" value={fav} />
          <Readout label="P(event)" value={<ProbFrac c={fav} n={N} />} tone="good" />
          <Readout label="P(not event)" value={<ProbFrac c={N - fav} n={N} />} tone="bad" />
        </div>

        <ProbScale p={p} />

        <div>
          <div className="text-sm font-semibold text-ink-2">How many cells give each {R.noun}? (Lit bars are in your event.)</div>
          <svg viewBox="0 0 340 130" className="mt-1 h-auto w-full" role="img" aria-label={barAria}>
            <line x1={BX0} x2={BX1} y1={BASE} y2={BASE} className="stroke-ink-2" strokeWidth={1} />
            {dist.map((d, i) => {
              const on = holds(d.v, cond, k);
              const h = (d.count / maxCount) * (BASE - TOP);
              const x = BX0 + i * slot + (slot - bw) / 2;
              return (
                <g key={d.v}>
                  <rect x={x} y={BASE - h} width={bw} height={h} rx={Math.min(3, bw / 3)} className={on ? "fill-brand" : "fill-ink-2"} opacity={on ? 0.9 : 0.25} />
                  {showCounts ? (
                    <text x={x + bw / 2} y={BASE - h - 4} fontSize={10} textAnchor="middle" className={on ? "fill-brand" : "fill-ink-2"} fontWeight={on ? 800 : 400}>
                      {d.count}
                    </text>
                  ) : null}
                  {i % labelEvery === 0 ? (
                    <text x={x + bw / 2} y={BASE + 13} fontSize={10} textAnchor="middle" className={on ? "fill-brand" : "fill-ink-2"} fontWeight={on ? 800 : 400}>
                      {d.v}
                    </text>
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Experiment lab: relative frequency, expected outcomes, fair or loaded  */
/* ------------------------------------------------------------------------ */

type Exp = "spinner" | "die";

interface Mystery {
  loaded: boolean;
  /** Index 0–5 of the face that is favoured when loaded. */
  face: number;
}

const CAP = 10000;
/** Graph x-axis maxima (each splits into whole-number halves). */
const NICE = [10, 20, 30, 50, 100, 200, 300, 500, 1000, 2000, 3000, 5000, 10000];

const COLOURS = [
  { name: "green", Name: "Green", fill: "fill-good", dot: "bg-good" },
  { name: "blue", Name: "Blue", fill: "fill-info", dot: "bg-info" },
  { name: "yellow", Name: "Yellow", fill: "fill-accent", dot: "bg-accent" },
];

/** Exact face probabilities [numerator, denominator]: fair = 1/6 each; loaded = 1/4 on one face, 3/20 on the others. */
function dieProbs(m: Mystery): [number, number][] {
  return Array.from({ length: 6 }, (_, f): [number, number] => (!m.loaded ? [1, 6] : f === m.face ? [1, 4] : [3, 20]));
}

/** A count-sized value: exact when it terminates within 2 dp, otherwise ≈ to 1 dp. */
function countText(v: number): string {
  return exactTo(v, 2) ? fmt(v, 2) : approx(v, 1);
}

/** Expected number n × (p/q). */
function expectedText(n: number, p: number, q: number): string {
  return countText((n * p) / q);
}

/** "= 7", "≈ 879.4" */
function eqCount(v: number): string {
  const s = countText(v);
  return s.startsWith("≈") ? `≈ ${s.slice(1)}` : `= ${s}`;
}

/** A small gap between a relative frequency and a probability. */
function gapText(v: number): string {
  if (v > 1e-9 && v < 0.0005) return "less than 0.001";
  return approx(v, 3).replace("≈", "about ");
}

const PIPS: Record<number, [number, number][]> = {
  1: [[50, 50]],
  2: [[28, 28], [72, 72]],
  3: [[28, 28], [50, 50], [72, 72]],
  4: [[28, 28], [72, 28], [28, 72], [72, 72]],
  5: [[28, 28], [72, 28], [50, 50], [28, 72], [72, 72]],
  6: [[28, 28], [72, 28], [28, 50], [72, 50], [28, 72], [72, 72]],
};

function Dot({ cls }: { cls: string }) {
  return <span aria-hidden className={`inline-block h-3 w-3 shrink-0 rounded-full ${cls}`} />;
}

function SpinnerSvg({ sec, angle, last }: { sec: number[]; angle: number | null; last: number | null }) {
  const N = sec[0] + sec[1] + sec[2];
  const cx = 80;
  const cy = 80;
  const r = 70;
  const pt = (deg: number, rr: number): [number, number] => [cx + rr * Math.sin((deg * Math.PI) / 180), cy - rr * Math.cos((deg * Math.PI) / 180)];
  const colourAt = (s: number) => (s < sec[0] ? 0 : s < sec[0] + sec[1] ? 1 : 2);
  const a = angle ?? 0;
  const tip = pt(a, 58);
  const left = pt(a - 90, 5);
  const right = pt(a + 90, 5);
  const tail = pt(a + 180, 14);
  const aria = `Spinner with ${N} equal sections: ${sec[0]} green, ${sec[1]} blue and ${sec[2]} yellow.${last !== null ? ` Last spin: ${COLOURS[last].name}.` : ""}`;
  return (
    <svg viewBox="0 0 160 160" className="mx-auto h-auto w-full max-w-[180px]" role="img" aria-label={aria}>
      {N === 1 ? (
        <circle cx={cx} cy={cy} r={r} className={COLOURS[colourAt(0)].fill} />
      ) : (
        Array.from({ length: N }, (_, s) => {
          const [x0, y0] = pt((s * 360) / N, r);
          const [x1, y1] = pt(((s + 1) * 360) / N, r);
          const large = 360 / N > 180 ? 1 : 0;
          return (
            <path
              key={s}
              d={`M${cx} ${cy} L${x0.toFixed(2)} ${y0.toFixed(2)} A${r} ${r} 0 ${large} 1 ${x1.toFixed(2)} ${y1.toFixed(2)} Z`}
              className={`${COLOURS[colourAt(s)].fill} stroke-surface`}
              strokeWidth={1.5}
            />
          );
        })
      )}
      <circle cx={cx} cy={cy} r={r} fill="none" className="stroke-ink" strokeWidth={2} />
      <polygon
        points={[tip, left, tail, right].map(([x, y]) => `${x.toFixed(2)},${y.toFixed(2)}`).join(" ")}
        className="fill-ink"
        opacity={angle === null ? 0.35 : 1}
      />
      <circle cx={cx} cy={cy} r={5} className="fill-surface stroke-ink" strokeWidth={2} />
    </svg>
  );
}

function DieSvg({ face }: { face: number | null }) {
  return (
    <svg
      viewBox="0 0 160 160"
      className="mx-auto h-auto w-full max-w-[180px]"
      role="img"
      aria-label={face === null ? "The mystery die, not rolled yet." : `The mystery die. Last roll: ${face}.`}
    >
      <rect x={30} y={30} width={100} height={100} rx={16} className="fill-surface stroke-ink" strokeWidth={3} />
      {face === null ? (
        <text x={80} y={96} fontSize={44} fontWeight={800} textAnchor="middle" className="fill-ink-2">
          ?
        </text>
      ) : (
        PIPS[face].map(([x, y]) => <circle key={`${x}-${y}`} cx={30 + x} cy={30 + y} r={8} className="fill-ink" />)
      )}
    </svg>
  );
}

function ExperimentLab() {
  const [exp, setExp] = useState<Exp>("spinner");
  const [sec, setSec] = useState<number[]>([3, 4, 1]);
  const [outcomes, setOutcomes] = useState<number[]>([]);
  const [trackC, setTrackC] = useState(0);
  const [trackF, setTrackF] = useState(5);
  const [angle, setAngle] = useState<number | null>(null);
  const [mystery, setMystery] = useState<Mystery | null>(null);
  // The verdict remembers how many rolls it was based on, so the feedback stays
  // true even if the learner keeps rolling (or resets) after the reveal.
  const [verdict, setVerdict] = useState<{ call: "fair" | "loaded"; n: number; lfRf: string } | null>(null);

  const isDie = exp === "die";
  const N = sec[0] + sec[1] + sec[2];
  const n = outcomes.length;
  const K = isDie ? 6 : 3;
  const track = isDie ? trackF : trackC;
  const revealed = isDie && verdict !== null && mystery !== null;
  const verb = isDie ? "roll" : "spin";

  // Exact reference probabilities [num, den] for each outcome. For a die that has
  // not been revealed yet, use the "if it were fair" value 1/6.
  const refP: [number, number][] = isDie
    ? revealed && mystery
      ? dieProbs(mystery)
      : Array.from({ length: 6 }, (): [number, number] => [1, 6])
    : sec.map((c): [number, number] => [c, N]);

  const resetData = () => {
    setOutcomes([]);
    setAngle(null);
  };

  const newDie = () => {
    setMystery({ loaded: Math.random() < 0.5, face: Math.floor(Math.random() * 6) });
    setVerdict(null);
    resetData();
  };

  const switchExp = (e: Exp) => {
    if (e === exp) return;
    setExp(e);
    resetData();
    setVerdict(null);
    if (e === "die") setMystery({ loaded: Math.random() < 0.5, face: Math.floor(Math.random() * 6) });
  };

  const setSection = (i: number, v: number) => {
    const next = sec.slice();
    next[i] = v;
    if (next[0] + next[1] + next[2] < 1) return;
    setSec(next);
    resetData();
  };

  const run = (howMany: number) => {
    const m = Math.min(howMany, CAP - n);
    if (m <= 0) return;
    const arr: number[] = [];
    let a = angle;
    if (!isDie) {
      for (let i = 0; i < m; i++) {
        const s = Math.floor(Math.random() * N);
        arr.push(s < sec[0] ? 0 : s < sec[0] + sec[1] ? 1 : 2);
        if (i === m - 1) a = ((s + 0.15 + 0.7 * Math.random()) * 360) / N;
      }
    } else if (mystery) {
      const cum: number[] = [];
      let t = 0;
      for (const [p, q] of dieProbs(mystery)) {
        t += p / q;
        cum.push(t);
      }
      for (let i = 0; i < m; i++) {
        const r = Math.random();
        const f = cum.findIndex((c) => r < c);
        arr.push(f < 0 ? 5 : f);
      }
    }
    setOutcomes((o) => o.concat(arr).slice(0, CAP));
    setAngle(a);
  };

  const { counts, pts, streak } = useMemo(() => {
    const counts = Array.from({ length: K }, () => 0);
    const pts: [number, number][] = [];
    const total = outcomes.length;
    const step = Math.max(1, Math.ceil(total / 300));
    let cum = 0;
    outcomes.forEach((o, i) => {
      if (o < K) counts[o] += 1;
      if (o === track) cum += 1;
      const t = i + 1;
      if (t <= 20 || t % step === 0 || t === total) pts.push([t, cum / t]);
    });
    let streak = 0;
    const lastO = outcomes[total - 1];
    for (let i = total - 1; i >= 0 && outcomes[i] === lastO; i--) streak++;
    return { counts, pts, streak };
  }, [outcomes, track, K]);

  const last = n ? outcomes[n - 1] : null;

  const giveVerdict = (call: "fair" | "loaded") => {
    if (!mystery || n === 0) return;
    setVerdict({ call, n, lfRf: approx(counts[mystery.face] / n, 3) });
  };
  const [rn, rd] = refP[track];
  const ref = rn / rd;
  const kTrack = counts[track] ?? 0;
  const rf = n ? kTrack / n : 0;
  const trackName = isDie ? `face ${track + 1}` : COLOURS[track].name;

  // ---- convergence graph ----
  const xMax = NICE.find((v) => v >= Math.max(n, 10)) ?? CAP;
  const GL = 42;
  const GR = 328;
  const GT = 12;
  const GB = 150;
  const X = (t: number) => GL + (t / xMax) * (GR - GL);
  const Y = (v: number) => GB - v * (GB - GT);
  const path = pts.map(([t, v], i) => `${i ? "L" : "M"}${X(t).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const refLabel = isDie ? (revealed ? `true P ${eqApprox(ref)}` : `if fair, P ${eqApprox(ref)}`) : `P ${eqApprox(ref)}`;
  const refLabelY = Y(ref) < GT + 14 ? Y(ref) + 13 : Y(ref) - 5;
  const graphAria =
    n === 0
      ? `Empty graph of the relative frequency of ${trackName} against the number of ${verb}s. Dashed line at ${refLabel}.`
      : `Graph of the relative frequency of ${trackName} after each ${verb}. After ${n} ${verb}s it is ${approx(rf, 3)}. Dashed line at ${refLabel}.`;

  // ---- captions ----
  let caption: ReactNode;
  if (!isDie) {
    const c = sec[track];
    const p = c / N;
    if (n === 0) {
      caption = (
        <p>
          {N === 1 ? "This spinner has only 1 section, so it always lands on it." : `This spinner has ${N} equal sections, so each section is equally likely.`}{" "}
          {N === 1 ? `That section is ${c === 1 ? "" : "not "}${trackName}` : `${c} of them ${c === 1 ? "is" : "are"} ${trackName}`}, so P({trackName}) ={" "}
          <FracText n={c} d={N} />
          {c > 0 && c < N ? ` ${eqApprox(p)}` : ""}. In 100 spins you would <strong>expect</strong> P × 100 {eqCount((100 * c) / N)}{" "}
          {trackName}s. Spin and compare: <strong>relative frequency</strong> = number of times it happened ÷ number of spins.
        </p>
      );
    } else {
      const E = n * p;
      let trend: ReactNode;
      if (c === 0) trend = <>There are no {trackName} sections, so {trackName} is <strong>impossible</strong>: its line stays flat at 0.</>;
      else if (c === N) trend = <>Every section is {trackName}, so it is <strong>certain</strong>: its line sits at 1.</>;
      else if (n < 50)
        trend = <>With only {n} spins, chance wobbles are big, so the line can sit far from the dashed theory line. Keep spinning.</>;
      else if (n < 1000) trend = <>As the spins pile up, the line wobbles less and settles towards the dashed line.</>;
      else
        trend = (
          <>
            With this many spins the relative frequency is a reliable estimate — the line has settled near the dashed line. Yet the count can
            still be several away from the expected number: it is the <em>proportion</em> that settles, not the count.
          </>
        );
      caption = (
        <>
          <p>
            After {n} spin{n === 1 ? "" : "s"}, {trackName} came up {kTrack} time{kTrack === 1 ? "" : "s"}, so its relative frequency is{" "}
            <M>{`${kTrack}/${n}`}</M> {eqApprox(rf)}. Theory says P({trackName}) = <FracText n={c} d={N} />
            {c > 0 && c < N ? ` ${eqApprox(p)}` : ""}, so you would expect P × {n} {eqCount(E)}.
            {c > 0 && c < N ? (
              <>
                {" "}
                The count is {countText(Math.abs(kTrack - E)).replace("≈", "about ")} away from the expected number; the relative frequency is{" "}
                {gapText(Math.abs(rf - p))} away from the probability.
              </>
            ) : null}
          </p>
          <p className="mt-2">{trend}</p>
          {streak >= 4 && last !== null && sec[last] < N ? (
            <p className="mt-2">
              The last {streak} spins were all {COLOURS[last].name}. Spins are <strong>independent</strong> — the spinner has no memory — so
              the next spin is still {COLOURS[last].name} with probability <FracText n={sec[last]} d={N} />. Nothing is ever “due”.
            </p>
          ) : null}
        </>
      );
    }
  } else if (!revealed) {
    let worst = 0;
    let worstGap = -1;
    counts.forEach((c, f) => {
      const g = Math.abs(c / Math.max(n, 1) - 1 / 6);
      if (g > worstGap) {
        worstGap = g;
        worst = f;
      }
    });
    caption = (
      <>
        <p>
          If a die might be loaded, you can’t find its probabilities by counting — you have to <strong>experiment</strong>. A fair die gives each
          face about <M>{"1/6"}</M> ≈ 0.167 of the rolls
          {n > 0 ? (
            <>
              , so in {n} rolls expect {n} ÷ 6 {eqCount(n / 6)} of each face. Furthest from that so far: face {worst + 1}, with
              relative frequency {approx(counts[worst] / n, 3)}
            </>
          ) : null}
          .
        </p>
        {n > 0 ? (
          <p className="mt-2">
            {n < 100
              ? "With fewer than 100 rolls, gaps like this happen with fair dice all the time — the evidence is weak."
              : n < 1000
                ? "More rolls shrink the gaps a fair die would show, so a gap that stays large is starting to mean something."
                : "With 1000 or more rolls, a fair die's relative frequencies almost always stay within about 0.04 of 0.167 — a bigger gap is strong evidence of a loaded die."}
          </p>
        ) : null}
      </>
    );
  } else if (mystery) {
    const lf = mystery.face;
    caption = (
      <>
        <p>
          {mystery.loaded ? (
            <>
              This die was <strong>loaded</strong>: face {lf + 1} has probability <M>{"1/4"}</M> = 0.25 and each other face <M>{"3/20"}</M> = 0.15.
              {n > 0 ? (
                <>
                  {" "}
                  After {n} roll{n === 1 ? "" : "s"}, your relative frequency for face {lf + 1} is {approx(counts[lf] / n, 3)}.
                </>
              ) : null}
            </>
          ) : (
            <>
              This die was <strong>fair</strong>: every face has probability <M>{"1/6"}</M> ≈ 0.167, and any gaps in your results were just
              random variation.
            </>
          )}
        </p>
        <p className="mt-2">
          Relative frequencies are <em>estimates</em>. The more trials, the closer they tend to get to the true probabilities — which is why
          scientists repeat experiments many times.
        </p>
      </>
    );
  }

  // ---- verdict feedback ----
  let feedback: ReactNode = null;
  if (revealed && mystery) {
    const correct = (verdict?.call === "loaded") === mystery.loaded;
    const vn = verdict?.n ?? 0;
    const lfRf = verdict?.lfRf ?? "0";
    feedback = correct ? (
      <p className="font-bold text-good">
        {vn < 100
          ? `Correct — though with only ${vn} roll${vn === 1 ? "" : "s"}, that was partly luck.`
          : vn < 1000
            ? `Correct, and ${vn} rolls gave you decent evidence.`
            : `Correct, and ${vn} rolls gave you strong evidence.`}
      </p>
    ) : (
      <p className="font-bold text-bad">
        {vn < 100
          ? `Not this time — but with only ${vn} roll${vn === 1 ? "" : "s"}, random wobble can easily hide a bias or fake one. More rolls, better verdicts.`
          : mystery.loaded
            ? `Not this time. Face ${mystery.face + 1} really has probability 0.25, but in your ${vn} rolls its relative frequency was ${lfRf} (a fair die gives about 0.167). With more rolls the gap becomes hard to miss.`
            : `Not this time. Every face was equally likely; gaps of a few hundredths are normal random variation with ${vn} rolls.`}
      </p>
    );
  }

  const trackOptions = isDie
    ? Array.from({ length: 6 }, (_, f) => ({ value: String(f), label: String(f + 1) }))
    : COLOURS.map((c, i) => ({
        value: String(i),
        label: (
          <span className="inline-flex items-center gap-1.5">
            <Dot cls={c.dot} />
            {c.Name}
          </span>
        ),
      }));

  return (
    <WidgetFrame
      title="Experiment lab: spin it a thousand times"
      tryThis={[
        "Design a spinner with P(green) = {{1/4}}. After 10 spins, is the relative frequency 0.25? What about after 1000?",
        "After 1000 spins, which is closer to theory: the green **count** or the green **relative frequency**?",
        "Mystery die: roll just 20 times and give a verdict. Then try a new die with 1000 rolls. Which verdict do you trust more?",
        "Give one colour 0 sections and track it. What does its line do, and why?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<Exp>
          label="Choose the experiment"
          value={exp}
          onChange={switchExp}
          options={[
            { value: "spinner", label: "Your spinner" },
            { value: "die", label: "Mystery die" },
          ]}
        />

        {!isDie ? (
          <div className="grid gap-2 sm:grid-cols-3">
            {COLOURS.map((c, i) => {
              const others = N - sec[i];
              return (
                <Stepper
                  key={c.name}
                  label={
                    <span className="inline-flex items-center gap-1.5">
                      <Dot cls={c.dot} />
                      {c.Name}
                    </span>
                  }
                  value={sec[i]}
                  min={others === 0 ? 1 : 0}
                  max={6}
                  onChange={(v) => setSection(i, v)}
                />
              );
            })}
          </div>
        ) : null}

        <div className="grid items-center gap-4 sm:grid-cols-[180px_1fr]">
          {isDie ? <DieSvg face={last === null ? null : last + 1} /> : <SpinnerSvg sec={sec} angle={angle} last={last} />}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {[1, 10, 100, 1000].map((h) => (
                <button
                  key={h}
                  type="button"
                  className={`btn btn-sm ${h === 1 ? "btn-primary" : "btn-secondary"}`}
                  onClick={() => run(h)}
                  disabled={n >= CAP}
                >
                  {isDie ? "Roll" : "Spin"} {h === 1 ? "once" : `× ${h}`}
                </button>
              ))}
              <button type="button" className="btn btn-ghost btn-sm" onClick={resetData} disabled={n === 0}>
                Reset
              </button>
            </div>
            <p className="text-sm text-ink-2">
              <strong className="text-ink tabular-nums">{n}</strong> {verb}s so far
              {last !== null ? (
                <>
                  {" "}
                  · last: <strong className="text-ink">{isDie ? last + 1 : COLOURS[last].name}</strong>
                </>
              ) : null}
              {n >= CAP ? " · that's the maximum, so reset to start again" : ""}
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-sm font-semibold text-ink-2">Track on the graph</div>
          <Segmented<string>
            label="Outcome to track on the graph"
            value={String(track)}
            onChange={(v) => (isDie ? setTrackF(Number(v)) : setTrackC(Number(v)))}
            options={trackOptions}
          />
          <p className="text-sm text-ink">
            Relative frequency of <strong>{trackName}</strong>:{" "}
            {n ? (
              <>
                <M>{`${kTrack}/${n}`}</M> {eqApprox(rf)}
              </>
            ) : (
              "—"
            )}
          </p>
        </div>

        <svg viewBox="0 0 340 190" className="h-auto w-full" role="img" aria-label={graphAria}>
          {[0, 0.25, 0.5, 0.75, 1].map((v) => (
            <g key={v}>
              <line x1={GL} x2={GR} y1={Y(v)} y2={Y(v)} className="stroke-line" strokeWidth={1} />
              <text x={GL - 5} y={Y(v) + 3.5} fontSize={10} textAnchor="end" className="fill-ink-2">
                {v}
              </text>
            </g>
          ))}
          {[0, 0.25, 0.5, 0.75, 1].map((f) => (
            <line key={`xt${f}`} x1={X(f * xMax)} x2={X(f * xMax)} y1={GB} y2={(f * 2) % 1 === 0 ? GB + 5 : GB + 3} className="stroke-ink-2" strokeWidth={1} />
          ))}
          {[0, 0.5, 1].map((f) => (
            <text key={`xl${f}`} x={X(f * xMax)} y={GB + 16} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {f * xMax}
            </text>
          ))}
          <line x1={GL} x2={GR} y1={GB} y2={GB} className="stroke-ink-2" strokeWidth={1.5} />
          <line x1={GL} x2={GL} y1={GT} y2={GB} className="stroke-ink-2" strokeWidth={1.5} />
          <text x={0} y={0} transform={`translate(11 ${(GT + GB) / 2}) rotate(-90)`} fontSize={10} textAnchor="middle" className="fill-ink-2">
            relative frequency
          </text>
          <text x={(GL + GR) / 2} y={184} fontSize={10} textAnchor="middle" className="fill-ink-2">
            number of {verb}s
          </text>
          <line x1={GL} x2={GR} y1={Y(ref)} y2={Y(ref)} className="stroke-accent" strokeWidth={2} strokeDasharray="6 4" />
          <text x={GR} y={refLabelY} fontSize={11} fontWeight={700} textAnchor="end" className="fill-ink">
            {refLabel}
          </text>
          {pts.length > 1 ? <path d={path} fill="none" className="stroke-brand" strokeWidth={2} strokeLinejoin="round" /> : null}
          {n > 0 ? <circle cx={X(n)} cy={Y(rf)} r={4} className="fill-brand stroke-surface" strokeWidth={1.5} /> : null}
          {n === 0 ? (
            <text x={(GL + GR) / 2} y={(GT + GB) / 2 - 10} fontSize={12} textAnchor="middle" className="fill-ink-2">
              {isDie ? "Roll" : "Spin"} to start the experiment
            </text>
          ) : null}
        </svg>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[300px] text-left text-xs tabular-nums sm:text-sm">
            <thead className="text-ink-2">
              <tr className="border-b border-line">
                <th className="py-1.5 pr-2 font-bold">{isDie ? "Face" : "Colour"}</th>
                <th className="py-1.5 pr-2 font-bold">{isDie ? (revealed ? "True P" : "P if fair") : "P"}</th>
                <th className="py-1.5 pr-2 font-bold">{isDie && !revealed ? "Expected if fair" : "Expected"} (P × {n})</th>
                <th className="py-1.5 pr-2 font-bold">Observed</th>
                <th className="py-1.5 font-bold">Rel. freq.</th>
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: K }, (_, i) => (
                <tr key={i} className={`border-b border-line ${i === track ? "bg-brand-soft" : ""}`}>
                  <td className="py-1.5 pr-2 font-semibold text-ink">
                    {isDie ? (
                      i + 1
                    ) : (
                      <span className="inline-flex items-center gap-1.5">
                        <Dot cls={COLOURS[i].dot} />
                        {COLOURS[i].Name}
                      </span>
                    )}
                  </td>
                  <td className="py-1.5 pr-2">
                    <FracText n={refP[i][0]} d={refP[i][1]} />
                  </td>
                  <td className="py-1.5 pr-2">{expectedText(n, refP[i][0], refP[i][1])}</td>
                  <td className="py-1.5 pr-2 font-bold text-ink">{counts[i] ?? 0}</td>
                  <td className="py-1.5">{n ? approx((counts[i] ?? 0) / n, 3) : "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {isDie && mystery ? (
          <div className="space-y-2 rounded-xl border border-line p-3">
            {!revealed ? (
              <>
                <p className="text-sm font-bold text-ink">Fair or loaded? Roll as many times as you like, then give your verdict.</p>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn btn-secondary btn-sm" disabled={n === 0} onClick={() => giveVerdict("fair")}>
                    It’s fair
                  </button>
                  <button type="button" className="btn btn-secondary btn-sm" disabled={n === 0} onClick={() => giveVerdict("loaded")}>
                    It’s loaded
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="text-sm">{feedback}</div>
                <button type="button" className="btn btn-primary btn-sm" onClick={newDie}>
                  New mystery die
                </button>
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
    id: "two-dice-sample-space",
    title: "Two-dice sample space",
    blurb: "Light up the outcomes in an event and see its probability, its complement and the most likely totals.",
    Component: SampleSpace,
  },
  {
    id: "experiment-lab",
    title: "Experiment lab",
    blurb: "Spin or roll hundreds of times: watch relative frequency settle, compare with expected counts, and unmask a loaded die.",
    Component: ExperimentLab,
  },
];
