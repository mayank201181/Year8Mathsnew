"use client";

import { useState } from "react";

// Shared small slider control (kept local so this file is self-contained).
function Slider({
  label,
  value,
  min,
  max,
  step = 1,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block text-sm">
      <span className="text-slate-300">
        {label}: <strong>{value}</strong>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full mt-1 accent-indigo-400"
      />
    </label>
  );
}

function Caption({ children }: { children: React.ReactNode }) {
  return <p className="text-sm text-slate-300 mt-3">{children}</p>;
}

// ---------------------------------------------------------------------------
// Equation balance scale — solve ax + b = c by keeping the scale level.
// ---------------------------------------------------------------------------
export function EquationBalance() {
  const [a, setA] = useState(2);
  const [b, setB] = useState(3);
  const [c, setC] = useState(11);
  const x = (c - b) / a;
  const nice = Number.isInteger(x);
  return (
    <div>
      <svg viewBox="0 0 240 120" role="img" aria-label="Balance scale for an equation" className="w-full max-w-sm mx-auto">
        <line x1="120" y1="20" x2="120" y2="70" stroke="#94a3b8" strokeWidth="3" />
        <line x1="40" y1="40" x2="200" y2="40" stroke="#94a3b8" strokeWidth="3" />
        <circle cx="120" cy="20" r="4" fill="#f59e0b" />
        <rect x="20" y="40" width="60" height="34" rx="6" fill="#6366f1" fillOpacity="0.3" stroke="#818cf8" />
        <rect x="160" y="40" width="60" height="34" rx="6" fill="#0d9488" fillOpacity="0.3" stroke="#2dd4bf" />
        <text x="50" y="61" fontSize="12" fill="#e2e8f0" textAnchor="middle">{a}x + {b}</text>
        <text x="190" y="61" fontSize="12" fill="#e2e8f0" textAnchor="middle">{c}</text>
      </svg>
      <div className="grid grid-cols-3 gap-3 mt-2">
        <Slider label="a" value={a} min={1} max={10} onChange={setA} />
        <Slider label="b" value={b} min={0} max={20} onChange={setB} />
        <Slider label="c" value={c} min={0} max={40} onChange={setC} />
      </div>
      <Caption>
        Solve {a}x + {b} = {c}: subtract {b} → {a}x = {c - b}; divide by {a} →{" "}
        <strong>x = {nice ? x : x.toFixed(2)}</strong>. Keep the scale level by doing the same to both sides.
      </Caption>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Pythagoras explorer — change the two legs, watch the hypotenuse.
// ---------------------------------------------------------------------------
export function PythagorasTriangle() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(4);
  const c = Math.sqrt(a * a + b * b);
  const scale = 90 / Math.max(a, b, 1);
  const ox = 30,
    oy = 110;
  const px = ox + b * scale;
  const py = oy - a * scale;
  return (
    <div>
      <svg viewBox="0 0 200 130" role="img" aria-label="Right-angled triangle" className="w-full max-w-xs mx-auto">
        <polygon
          points={`${ox},${oy} ${ox + b * scale},${oy} ${ox},${oy - a * scale}`}
          fill="#6366f1"
          fillOpacity="0.2"
          stroke="#818cf8"
          strokeWidth="2"
        />
        <rect x={ox} y={oy - 10} width="10" height="10" fill="none" stroke="#64748b" />
        <line x1={ox + b * scale} y1={oy} x2={ox} y2={oy - a * scale} stroke="#f59e0b" strokeWidth="2.5" />
        <text x={ox + (b * scale) / 2} y={oy + 14} fontSize="10" fill="#94a3b8" textAnchor="middle">{b}</text>
        <text x={ox - 8} y={oy - (a * scale) / 2} fontSize="10" fill="#94a3b8" textAnchor="end">{a}</text>
        <text x={(px + ox + b * scale) / 2 + 4} y={(py + oy) / 2} fontSize="10" fill="#fbbf24">{c.toFixed(1)}</text>
      </svg>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Slider label="Leg a" value={a} min={1} max={12} onChange={setA} />
        <Slider label="Leg b" value={b} min={1} max={12} onChange={setB} />
      </div>
      <Caption>
        a² + b² = {a * a} + {b * b} = {a * a + b * b}, so the hypotenuse c = √{a * a + b * b} ={" "}
        <strong>{c.toFixed(2)}</strong>
        {Number.isInteger(c) ? " — a Pythagorean triple! ✨" : "."}
      </Caption>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Prime factor tree — split a number into its prime factors.
// ---------------------------------------------------------------------------
function primeFactors(n: number): number[] {
  const f: number[] = [];
  let d = 2;
  let x = n;
  while (x > 1) {
    while (x % d === 0) {
      f.push(d);
      x /= d;
    }
    d++;
    if (d * d > x && x > 1) {
      f.push(x);
      break;
    }
  }
  return f;
}

function indexForm(factors: number[]): string {
  const counts: Record<number, number> = {};
  for (const p of factors) counts[p] = (counts[p] ?? 0) + 1;
  return Object.entries(counts)
    .map(([p, c]) => (c > 1 ? `${p}^${c}` : `${p}`))
    .join(" × ");
}

export function FactorTree() {
  const [n, setN] = useState(36);
  const factors = n > 1 ? primeFactors(n) : [];
  const isPrime = factors.length === 1;
  return (
    <div>
      <div className="text-center text-3xl font-bold text-indigo-300">{n}</div>
      <div className="flex flex-wrap justify-center gap-2 mt-3">
        {factors.map((p, i) => (
          <span key={i} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-1.5 font-mono">
            {p}
          </span>
        ))}
      </div>
      <div className="mt-3">
        <Slider label="Number" value={n} min={2} max={120} onChange={setN} />
      </div>
      <Caption>
        {n} = {factors.join(" × ")}
        {factors.length > 1 ? <> = <strong>{indexForm(factors)}</strong> in index form.</> : null}
        {isPrime ? <> — {n} is <strong>prime</strong>! 🌟</> : null}
      </Caption>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Ratio mixer — share an amount in the ratio a : b.
// ---------------------------------------------------------------------------
export function RatioMixer() {
  const [a, setA] = useState(3);
  const [b, setB] = useState(5);
  const [total, setTotal] = useState(80);
  const parts = a + b;
  const one = total / parts;
  const shareA = a * one;
  const shareB = b * one;
  const pctA = (a / parts) * 100;
  return (
    <div>
      <div className="flex w-full h-10 rounded-lg overflow-hidden border border-slate-600">
        <div className="bg-indigo-400 grid place-items-center text-xs font-semibold text-slate-900" style={{ width: `${pctA}%` }}>
          {shareA % 1 === 0 ? shareA : shareA.toFixed(1)}
        </div>
        <div className="bg-teal-400 grid place-items-center text-xs font-semibold text-slate-900" style={{ width: `${100 - pctA}%` }}>
          {shareB % 1 === 0 ? shareB : shareB.toFixed(1)}
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mt-3">
        <Slider label="Part A" value={a} min={1} max={9} onChange={setA} />
        <Slider label="Part B" value={b} min={1} max={9} onChange={setB} />
        <Slider label="Total" value={total} min={parts} max={200} onChange={setTotal} />
      </div>
      <Caption>
        Ratio {a} : {b} → {parts} shares. One share = {total} ÷ {parts} ={" "}
        {one % 1 === 0 ? one : one.toFixed(2)}. So the parts are{" "}
        <strong>{shareA % 1 === 0 ? shareA : shareA.toFixed(1)}</strong> and{" "}
        <strong>{shareB % 1 === 0 ? shareB : shareB.toFixed(1)}</strong>.
      </Caption>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Averages lab — adjust five values, watch mean / median / mode / range.
// ---------------------------------------------------------------------------
export function StatsAverages() {
  const [vals, setVals] = useState([4, 7, 7, 9, 13]);
  const set = (i: number, v: number) => setVals((a) => a.map((x, j) => (j === i ? v : x)));

  const sorted = [...vals].sort((a, b) => a - b);
  const sum = vals.reduce((s, v) => s + v, 0);
  const mean = sum / vals.length;
  const median = sorted[(sorted.length - 1) / 2];
  const counts: Record<number, number> = {};
  for (const v of vals) counts[v] = (counts[v] ?? 0) + 1;
  const maxCount = Math.max(...Object.values(counts));
  const modes = Object.entries(counts).filter(([, c]) => c === maxCount).map(([v]) => v);
  const mode = maxCount > 1 ? modes.join(", ") : "no mode";
  const range = sorted[sorted.length - 1] - sorted[0];
  const maxV = Math.max(...vals, 1);

  return (
    <div>
      <div className="flex items-end justify-center gap-2 h-24">
        {vals.map((v, i) => (
          <div key={i} className="flex flex-col items-center gap-1">
            <div className="w-7 bg-gradient-to-t from-indigo-500 to-teal-400 rounded-t" style={{ height: `${(v / maxV) * 80}px` }} />
            <span className="text-[10px] text-slate-400">{v}</span>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-5 gap-2 mt-3">
        {vals.map((v, i) => (
          <Slider key={i} label={`#${i + 1}`} value={v} min={1} max={20} onChange={(n) => set(i, n)} />
        ))}
      </div>
      <Caption>
        Mean = {sum} ÷ {vals.length} = <strong>{mean % 1 === 0 ? mean : mean.toFixed(1)}</strong> · Median ={" "}
        <strong>{median}</strong> · Mode = <strong>{mode}</strong> · Range = {sorted[sorted.length - 1]} − {sorted[0]} ={" "}
        <strong>{range}</strong>.
      </Caption>
    </div>
  );
}

export const INTERACTIVE_WIDGETS: Record<string, () => React.ReactNode> = {
  "equation-balance": EquationBalance,
  "pythagoras-triangle": PythagorasTriangle,
  "factor-tree": FactorTree,
  "ratio-mixer": RatioMixer,
  "stats-averages": StatsAverages,
};
