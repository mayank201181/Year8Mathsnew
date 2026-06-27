"use client";

import { useState } from "react";
import { INTERACTIVE_WIDGETS } from "./InteractiveWidgets";

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

function NumberLine() {
  const [a, setA] = useState(-3);
  const [b, setB] = useState(5);
  const toX = (n: number) => 20 + (n + 10) * 14;
  return (
    <div>
      <svg viewBox="0 0 300 90" role="img" aria-label="Number line showing a jump" className="w-full">
        <line x1="20" y1="55" x2="300" y2="55" stroke="#475569" strokeWidth="2" />
        {Array.from({ length: 21 }, (_, i) => i - 10).map((n) => (
          <g key={n}>
            <line x1={toX(n)} y1="50" x2={toX(n)} y2="60" stroke="#475569" />
            {n % 5 === 0 && (
              <text x={toX(n)} y="75" fontSize="9" fill="#94a3b8" textAnchor="middle">
                {n}
              </text>
            )}
          </g>
        ))}
        <circle cx={toX(a)} cy="55" r="5" fill="#818cf8" />
        <circle cx={toX(b)} cy="55" r="5" fill="#2dd4bf" />
        <path
          d={`M ${toX(a)} 40 Q ${(toX(a) + toX(b)) / 2} 15 ${toX(b)} 40`}
          fill="none"
          stroke="#f59e0b"
          strokeWidth="2"
        />
      </svg>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Slider label="Start" value={a} min={-10} max={10} onChange={setA} />
        <Slider label="End" value={b} min={-10} max={10} onChange={setB} />
      </div>
      <p className="text-sm text-slate-300 mt-2">
        Jump = {b} − ({a}) = <strong>{b - a}</strong>
      </p>
    </div>
  );
}

function FractionBar() {
  const [den, setDen] = useState(4);
  const [num, setNum] = useState(3);
  const n = Math.min(num, den);
  return (
    <div>
      <div className="flex w-full h-10 rounded-lg overflow-hidden border border-slate-600">
        {Array.from({ length: den }, (_, i) => (
          <div
            key={i}
            className={`flex-1 border-r border-slate-700 ${i < n ? "bg-indigo-400" : "bg-slate-800"}`}
          />
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3 mt-3">
        <Slider label="Parts shaded" value={num} min={0} max={den} onChange={setNum} />
        <Slider label="Total parts" value={den} min={1} max={12} onChange={setDen} />
      </div>
      <p className="text-sm text-slate-300 mt-2">
        {n}/{den} = <strong>{(n / den).toFixed(3)}</strong> = <strong>{Math.round((n / den) * 100)}%</strong>
      </p>
    </div>
  );
}

function FunctionGrapher() {
  const [m, setM] = useState(2);
  const [c, setC] = useState(1);
  const toX = (x: number) => 100 + x * 18;
  const toY = (y: number) => 100 - y * 18;
  const x1 = -5,
    x2 = 5;
  return (
    <div>
      <svg viewBox="0 0 200 200" role="img" aria-label="Graph of a straight line" className="w-full max-w-xs mx-auto">
        <line x1="0" y1="100" x2="200" y2="100" stroke="#334155" />
        <line x1="100" y1="0" x2="100" y2="200" stroke="#334155" />
        <line
          x1={toX(x1)}
          y1={toY(m * x1 + c)}
          x2={toX(x2)}
          y2={toY(m * x2 + c)}
          stroke="#2dd4bf"
          strokeWidth="2.5"
        />
        <circle cx={toX(0)} cy={toY(c)} r="3" fill="#f59e0b" />
      </svg>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Slider label="Gradient m" value={m} min={-5} max={5} onChange={setM} />
        <Slider label="Intercept c" value={c} min={-5} max={5} onChange={setC} />
      </div>
      <p className="text-sm text-slate-300 mt-2 text-center">
        y = <strong>{m}</strong>x {c >= 0 ? "+" : "−"} <strong>{Math.abs(c)}</strong>
      </p>
    </div>
  );
}

function ProbabilitySpinner() {
  const [reds, setReds] = useState(3);
  const total = 8;
  const [result, setResult] = useState<string | null>(null);
  const [spins, setSpins] = useState({ red: 0, total: 0 });

  function spin() {
    const r = Math.random() * total < reds;
    setResult(r ? "RED" : "BLUE");
    setSpins((s) => ({ red: s.red + (r ? 1 : 0), total: s.total + 1 }));
  }
  const sliceAngle = 360 / total;
  return (
    <div className="text-center">
      <svg viewBox="0 0 120 120" role="img" aria-label="Spinner" className="w-40 h-40 mx-auto">
        {Array.from({ length: total }, (_, i) => {
          const a0 = (i * sliceAngle - 90) * (Math.PI / 180);
          const a1 = ((i + 1) * sliceAngle - 90) * (Math.PI / 180);
          const x0 = 60 + 55 * Math.cos(a0);
          const y0 = 60 + 55 * Math.sin(a0);
          const x1 = 60 + 55 * Math.cos(a1);
          const y1 = 60 + 55 * Math.sin(a1);
          return (
            <path
              key={i}
              d={`M60 60 L ${x0} ${y0} A 55 55 0 0 1 ${x1} ${y1} Z`}
              fill={i < reds ? "#f87171" : "#60a5fa"}
              stroke="#0b1220"
            />
          );
        })}
      </svg>
      <Slider label="Red sections (of 8)" value={reds} min={0} max={8} onChange={setReds} />
      <button onClick={spin} className="mt-2 bg-indigo-500 hover:bg-indigo-400 rounded-lg px-4 py-1.5 text-sm font-semibold">
        Spin!
      </button>
      {result && (
        <p className="text-sm mt-2">
          Landed on <strong>{result}</strong>. P(red) = {reds}/8.{" "}
          {spins.total > 0 && (
            <>Experimental: {spins.red}/{spins.total} = {(spins.red / spins.total).toFixed(2)}</>
          )}
        </p>
      )}
    </div>
  );
}

function AreaVisualiser() {
  const [w, setW] = useState(6);
  const [h, setH] = useState(4);
  return (
    <div>
      <svg viewBox="0 0 220 160" role="img" aria-label="Rectangle area grid" className="w-full max-w-xs mx-auto">
        {Array.from({ length: h }, (_, r) =>
          Array.from({ length: w }, (_, c) => (
            <rect
              key={`${r}-${c}`}
              x={10 + c * 18}
              y={10 + r * 18}
              width="18"
              height="18"
              fill="#6366f1"
              fillOpacity="0.25"
              stroke="#818cf8"
            />
          ))
        )}
      </svg>
      <div className="grid grid-cols-2 gap-3 mt-2">
        <Slider label="Width" value={w} min={1} max={10} onChange={setW} />
        <Slider label="Height" value={h} min={1} max={7} onChange={setH} />
      </div>
      <p className="text-sm text-slate-300 mt-2">
        Area = {w} × {h} = <strong>{w * h}</strong> · Perimeter = 2({w} + {h}) = <strong>{2 * (w + h)}</strong>
      </p>
    </div>
  );
}

function AngleExplorer() {
  const [angle, setAngle] = useState(120);
  const rad = (angle * Math.PI) / 180;
  const x = 60 + 50 * Math.cos(-rad);
  const y = 70 + 50 * Math.sin(-rad);
  return (
    <div className="text-center">
      <svg viewBox="0 0 160 90" role="img" aria-label="Angle between two rays" className="w-full max-w-xs mx-auto">
        <line x1="60" y1="70" x2="120" y2="70" stroke="#94a3b8" strokeWidth="2" />
        <line x1="60" y1="70" x2={x} y2={y} stroke="#2dd4bf" strokeWidth="2" />
        <circle cx="60" cy="70" r="3" fill="#f59e0b" />
        <text x="80" y="60" fontSize="10" fill="#e2e8f0">
          {angle}°
        </text>
      </svg>
      <Slider label="Angle" value={angle} min={0} max={360} onChange={setAngle} />
      <p className="text-sm text-slate-300 mt-1">
        {angle < 90 ? "Acute" : angle === 90 ? "Right angle" : angle < 180 ? "Obtuse" : angle === 180 ? "Straight" : "Reflex"}
      </p>
    </div>
  );
}

// Full registry: the original explorables plus the topic-tailored widgets.
export const EXPLORABLES_ALL: Record<string, () => React.ReactNode> = {
  "number-line": NumberLine,
  "fraction-bar": FractionBar,
  "function-grapher": FunctionGrapher,
  "probability-spinner": ProbabilitySpinner,
  "area-visualiser": AreaVisualiser,
  "angle-explorer": AngleExplorer,
  ...INTERACTIVE_WIDGETS,
};

export function hasExplorable(widget?: string): boolean {
  return !!widget && widget in EXPLORABLES_ALL;
}

export default function Explorable({ widget }: { widget: string }) {
  const Comp = EXPLORABLES_ALL[widget];
  if (!Comp) return null;
  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-4">
      <p className="text-xs uppercase tracking-wide text-teal-300 font-semibold mb-2">
        🔬 Try it yourself
      </p>
      <Comp />
    </div>
  );
}
