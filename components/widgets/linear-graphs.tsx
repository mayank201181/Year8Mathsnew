"use client";
// Interactive explorables for the "linear-graphs" topic.
//  1. Line lab — build y = mx + c from a rise, a run and c. Live gradient
//     triangle, table of values, a parallel "c = 0" ghost line, and a
//     "hit the targets" game (find the line through two points).
//  2. Journey graph — a three-leg distance–time graph where gradient = speed,
//     plus a second traveller: where the lines cross, they meet.
import { useState, type ReactNode } from "react";
import { WidgetFrame, Slider, Segmented, Readout, M, makePlane, PlaneGrid, type WidgetDef } from "./kit";
import { renderInline } from "../Rich";

/* ------------------------------------------------------------------------ */
/* Number helpers (exact fractions where it matters)                          */
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

/** A fraction in lowest terms with d > 0. */
interface Q {
  n: number;
  d: number;
}

function q(n: number, d = 1): Q {
  let nn = n;
  let dd = d;
  if (dd < 0) {
    nn = -nn;
    dd = -dd;
  }
  const g = gcd(nn, dd);
  return { n: nn / g + 0, d: dd / g };
}

const qAdd = (a: Q, b: Q): Q => q(a.n * b.d + b.n * a.d, a.d * b.d);
const qMul = (a: Q, b: Q): Q => q(a.n * b.n, a.d * b.d);

/** Maths markup for a fraction: "3", "-3", "1/2", "-1/2". */
function qMark(a: Q): string {
  if (a.n === 0) return "0";
  if (a.d === 1) return String(a.n);
  return `${a.n < 0 ? "-" : ""}${Math.abs(a.n)}/${a.d}`;
}

/** Plain text with a real minus sign (for aria labels and readouts). */
function qText(a: Q): string {
  return qMark(a).replace("-", "−");
}

/** For rich-text strings: whole numbers as plain text, fractions as {{maths}}. */
function qRich(a: Q): string {
  return a.d === 1 ? qText(a) : `{{${qMark(a)}}}`;
}

/** Integer with a real minus sign. */
function intText(v: number): string {
  return v < 0 ? `−${Math.abs(v)}` : String(v);
}

/** Integer in maths markup, bracketed if negative: (-3). */
function paren(v: number): string {
  return v < 0 ? `(${v})` : String(v);
}

/** Round to dp places, drop trailing zeros, real minus sign. */
function fmt(v: number, dp = 2): string {
  let s = v.toFixed(dp);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  if (s === "-0") s = "0";
  return s.replace("-", "−");
}

/** Exact value if it terminates within dp places, otherwise "≈" + rounded. */
function approx(v: number, dp = 2): string {
  const s = v * 10 ** dp;
  return (Math.abs(s - Math.round(s)) < 1e-6 ? "" : "≈") + fmt(v, dp);
}

/** The equation y = mx + c as maths markup, e.g. "y = -1/2 x + 3". */
function lineMark(m: Q, c: number): string {
  let mx = "";
  if (m.n !== 0) {
    const sign = m.n < 0 ? "-" : "";
    const a = Math.abs(m.n);
    mx = m.d === 1 ? `${sign}${a === 1 ? "" : a}x` : `${sign}${a}/${m.d} x`;
  }
  if (!mx) return `y = ${c}`;
  if (c === 0) return `y = ${mx}`;
  return `y = ${mx} ${c > 0 ? "+" : "-"} ${Math.abs(c)}`;
}

/** Same equation as plain text for screen readers. */
function lineText(m: Q, c: number): string {
  return lineMark(m, c).replace(/-/g, "−");
}

/** Renders a markup string ({{maths}}, **bold**) inline. */
function Rich({ text }: { text: string }) {
  return <>{renderInline(text)}</>;
}

/** A labelled −/+ control with big, clearly named buttons. */
function Step({
  name,
  label,
  value,
  min,
  max,
  onChange,
}: {
  name: string;
  label: ReactNode;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-xl border border-line bg-surface px-3 py-2">
      <span className="text-sm font-semibold text-ink-2">{label}</span>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="kbd h-10 min-w-10"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`${name}: decrease by 1`}
        >
          −
        </button>
        <span className="min-w-[3ch] text-center text-lg font-extrabold tabular-nums text-ink" aria-live="polite">
          {intText(value)}
        </span>
        <button
          type="button"
          className="kbd h-10 min-w-10"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`${name}: increase by 1`}
        >
          +
        </button>
      </div>
    </div>
  );
}

/** Text with a halo so it stays readable over grid lines (both themes). */
const HALO = { paintOrder: "stroke" as const };

/* ------------------------------------------------------------------------ */
/* 1. Line lab: y = mx + c                                                    */
/* ------------------------------------------------------------------------ */

type LabMode = "explore" | "targets";
type Pt = [number, number];
interface Puzzle {
  a: Pt;
  b: Pt;
}

const LO = -6;
const HI = 6;
const PLANE = makePlane({ width: 320, height: 320, xMin: LO, xMax: HI, yMin: LO, yMax: HI, pad: 22 });
const FIRST_PUZZLE: Puzzle = { a: [0, -2], b: [3, 4] };
const TABLE_XS = [-2, -1, 0, 1, 2];

/** The x-interval where y = mx + c lies inside the square [lo, hi]². */
function clipLine(m: number, c: number, lo: number, hi: number): [number, number] | null {
  if (m === 0) return c >= lo && c <= hi ? [lo, hi] : null;
  const xa = (lo - c) / m;
  const xb = (hi - c) / m;
  const a = Math.max(lo, Math.min(xa, xb));
  const b = Math.min(hi, Math.max(xa, xb));
  return a < b ? [a, b] : null;
}

function randInt(lo: number, hi: number): number {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

/**
 * A new pair of lattice points on a line the learner can build.
 * level 1: one point is the y-intercept, whole-number gradient.
 * level 2: one point is the y-intercept, gradient may be a fraction.
 * level 3+: neither point is on the y-axis; any gradient (even 0).
 * Only ever called from an event handler (uses Math.random).
 */
function makePuzzle(level: number, current: { m: Q; c: number }): Puzzle {
  for (let tries = 0; tries < 500; tries++) {
    const run = level <= 1 ? 1 : randInt(1, 3);
    const rise = randInt(-4, 4);
    if (rise === 0 && (level < 3 || run !== 1)) continue;
    if (gcd(rise, run) !== 1) continue;
    const c = randInt(-5, 5);
    if (rise === current.m.n && run === current.m.d && c === current.c) continue;
    const pts: Pt[] = [];
    for (let k = -12; k <= 12; k++) {
      const x = k * run;
      const y = c + k * rise;
      if (x >= LO && x <= HI && y >= LO && y <= HI) pts.push([x, y]);
    }
    let a: Pt;
    let b: Pt;
    if (level < 3) {
      const others = pts.filter((p) => Math.abs(p[0]) >= 2);
      if (!others.length) continue;
      a = [0, c];
      b = others[randInt(0, others.length - 1)];
    } else {
      const off = pts.filter((p) => p[0] !== 0);
      if (off.length < 2) continue;
      const i = randInt(0, off.length - 1);
      let j = randInt(0, off.length - 2);
      if (j >= i) j++;
      a = off[i];
      b = off[j];
      if (Math.abs(a[0] - b[0]) < 2) continue;
    }
    return a[0] < b[0] ? { a, b } : { a: b, b: a };
  }
  return FIRST_PUZZLE;
}

function ptText(p: Pt): string {
  return `(${intText(p[0])}, ${intText(p[1])})`;
}

function LineLab() {
  const [mode, setMode] = useState<LabMode>("explore");
  const [rise, setRise] = useState(2);
  const [run, setRun] = useState(1);
  const [c, setC] = useState(1);
  const [ghost, setGhost] = useState(false);
  const [puzzle, setPuzzle] = useState<Puzzle>(FIRST_PUZZLE);
  const [level, setLevel] = useState(0);
  const [solvedCount, setSolvedCount] = useState(0);
  const [hintsShown, setHintsShown] = useState(0);

  const m = q(rise, run);
  const mv = rise / run;
  const eqMark = lineMark(m, c);
  const eqText = lineText(m, c);
  const yAt = (x: number): Q => qAdd(qMul(m, q(x)), q(c));
  // Exact test: (x, y) is on y = (rise/run)x + c  ⇔  rise·x + c·run = y·run.
  const onLine = (p: Pt) => rise * p[0] + c * run === p[1] * run;
  const hitA = onLine(puzzle.a);
  const hitB = onLine(puzzle.b);
  const solved = hitA && hitB;
  const simplified = gcd(rise, run) > 1;

  // ---- gradient triangle: the learner's own rise and run, placed on the line ----
  let tri: { x0: number; y0: number } | null = null;
  if (rise !== 0) {
    for (const k of [0, -1, 1, -2, 2, -3, 3, -4, 4, -5, 5, -6, 6]) {
      const x0 = k * run;
      const y0 = c + k * rise;
      if (x0 >= LO && x0 + run <= HI && Math.min(y0, y0 + rise) >= LO && Math.max(y0, y0 + rise) <= HI) {
        tri = { x0, y0 };
        break;
      }
    }
  }

  const { px, py } = PLANE;
  const seg = clipLine(mv, c, LO, HI);
  const ghostSeg = clipLine(mv, 0, LO, HI);
  const showGhost = mode === "explore" && ghost && c !== 0;
  const clampY = (v: number) => Math.min(312, Math.max(12, v));

  // ---- x-intercept ----
  let xInt: ReactNode;
  if (m.n === 0) xInt = c === 0 ? "every point" : "never";
  else xInt = <M>{`(${qMark(q(-c * run, rise))}, 0)`}</M>;

  // ---- puzzle maths (for hints and live feedback) ----
  const [ax, ay] = puzzle.a;
  const [bx, by] = puzzle.b;
  const pdx = bx - ax;
  const pdy = by - ay;
  const pm = q(pdy, pdx);
  const shift = qMul(pm, q(-ax));
  const pc = qAdd(q(ay), shift);
  const pmSimplified = gcd(pdy, pdx) > 1 || pdx === 1;
  const hintList: string[] = [
    "Start at A and travel to B. How many squares **across** is that (the run)? How many squares **up or down** (the rise)?",
    `From A to B the run is ${pdx} and the rise is ${intText(pdy)}${pdy < 0 ? " (down)" : ""}, so the gradient is rise ÷ run = {{${pdy}/${pdx}}}${
      pmSimplified ? ` = {{${qMark(pm)}}}` : ""
    }.`,
    ax === 0
      ? `A is on the y-axis, so the line crosses the y-axis at A: c = ${intText(ay)}.`
      : `To find c, slide along the line from A to the y-axis. x changes by ${intText(-ax)}, so y changes by {{${qMark(pm)} * ${paren(-ax)}}} = ${qRich(
          shift,
        )}. That makes c = ${intText(ay)} ${shift.n < 0 ? "−" : "+"} ${qRich(q(Math.abs(shift.n), shift.d))} = ${qRich(pc)}.`,
    `Set rise ${intText(pm.n)}, run ${pm.d} and c = ${qRich(pc)} to get {{${lineMark(pm, pc.n / pc.d)}}}.${
      pm.n !== 0 && Math.abs(2 * pm.n) <= 6 ? ` Any equal fraction works too, e.g. rise ${intText(2 * pm.n)}, run ${2 * pm.d}.` : ""
    }`,
  ];

  const newPuzzle = () => {
    if (solved) setSolvedCount((s) => s + 1);
    const next = level + 1;
    setLevel(next);
    setPuzzle(makePuzzle(next, { m, c }));
    setHintsShown(0);
  };

  // ---- live captions ----
  let caption: string;
  if (mode === "explore") {
    const parts: string[] = [];
    const across = `${run} across`;
    if (rise === 0) {
      parts.push(
        `**Gradient 0**: the rise is 0, so the line is flat. It is the horizontal line {{y = ${c}}} — every point on it has y-coordinate ${intText(c)}.`,
      );
    } else {
      parts.push(
        `**Gradient** = rise ÷ run = {{${rise}/${run}}}${simplified || run === 1 ? ` = {{${qMark(m)}}}` : ""}: for every ${across}, the line goes ${
          rise > 0 ? "up" : "down"
        } ${Math.abs(rise)}. ${rise > 0 ? "Positive gradient — uphill from left to right." : "Negative gradient — downhill from left to right."}`,
      );
      const steep = Math.abs(mv) > 1 ? "steeper than" : Math.abs(mv) < 1 ? "less steep than" : "exactly as steep as";
      parts.push(`It is ${steep} {{y = ${rise > 0 ? "x" : "-x"}}}.`);
      if (simplified)
        parts.push(`{{${rise}/${run}}} simplifies to {{${qMark(m)}}}, so rise ${intText(m.n)}, run ${m.d} draws exactly the same line — just a smaller triangle.`);
    }
    if (c === 0) {
      parts.push(
        rise === 0
          ? "With c = 0 this is the x-axis itself."
          : `**c = 0**, so the line goes through the origin: y is directly proportional to x ({{y = kx}} with k = {{${qMark(m)}}}).`,
      );
    } else {
      parts.push(`**c = ${intText(c)}**: the line crosses the y-axis at (0, ${intText(c)}) — look at the x = 0 column of the table.`);
    }
    if (showGhost) parts.push("The dashed line is {{y = mx}}: same gradient, so it is **parallel** — changing c just slides the line up or down.");
    caption = parts.join(" ");
  } else {
    const parts: string[] = [];
    if (solved) {
      parts.push(`Both targets are on {{${eqMark}}}. Two points fix exactly one straight line — and you found it.`);
    } else {
      for (const [name, p] of [
        ["A", puzzle.a],
        ["B", puzzle.b],
      ] as const) {
        if (onLine(p)) parts.push(`${name} is on your line.`);
        else {
          const yl = yAt(p[0]);
          const gap = qAdd(q(p[1]), q(-yl.n, yl.d));
          parts.push(
            `At x = ${intText(p[0])} your line is at y = ${qRich(yl)}, so ${name}${ptText(p)} is ${qRich(q(Math.abs(gap.n), gap.d))} ${
              gap.n > 0 ? "above" : "below"
            } it.`,
          );
        }
      }
      parts.push("Change c to slide the line up or down; change the rise and run to tilt it.");
    }
    caption = parts.join(" ");
  }

  // ---- aria ----
  const aria =
    `Graph of ${eqText}. Gradient ${qText(m)}; crosses the y-axis at (0, ${intText(c)}).` +
    (mode === "targets"
      ? ` Target A ${ptText(puzzle.a)} is ${hitA ? "on" : "not on"} the line; target B ${ptText(puzzle.b)} is ${hitB ? "on" : "not on"} the line.`
      : "");

  const targetDot = (name: string, p: Pt, hit: boolean) => {
    const x = px(p[0]);
    const y = py(p[1]);
    const right = p[0] <= 3;
    const yl = mv * p[0] + c;
    return (
      <g key={name}>
        {!hit && yl >= LO - 1 && yl <= HI + 1 ? (
          <line x1={x} x2={x} y1={y} y2={clampY(py(yl))} className="stroke-bad" strokeWidth={2} strokeDasharray="3 3" />
        ) : null}
        <circle cx={x} cy={y} r={8} className={hit ? "fill-good stroke-surface" : "fill-surface stroke-bad"} strokeWidth={hit ? 2 : 3} />
        <text
          x={right ? x + 11 : x - 11}
          y={clampY(y - 9)}
          fontSize={12}
          fontWeight={800}
          textAnchor={right ? "start" : "end"}
          className={`${hit ? "fill-good" : "fill-bad"} stroke-surface`}
          strokeWidth={3}
          style={HALO}
        >
          {name}
          {ptText(p)}
        </text>
      </g>
    );
  };

  return (
    <WidgetFrame
      title="Line lab: y = mx + c"
      tryThis={[
        "Keep c fixed and change the rise. Which point on the line never moves?",
        "Set rise 4, run 2 — then rise 2, run 1. Why do you get exactly the same line?",
        "Make the gradient negative. Then make it 0: what kind of line is {{y = c}}?",
        "Switch to *Hit the targets* and make your line pass through both points.",
      ]}
      caption={<Rich text={caption} />}
    >
      <div className="space-y-4">
        <Segmented<LabMode>
          label="Mode"
          value={mode}
          onChange={setMode}
          options={[
            { value: "explore", label: "Explore" },
            { value: "targets", label: "Hit the targets" },
          ]}
        />

        <p className="text-center text-2xl font-extrabold text-brand" aria-live="polite">
          <M>{eqMark}</M>
        </p>

        <svg viewBox="0 0 320 320" className="mx-auto h-auto w-full max-w-md" role="img" aria-label={aria}>
          <PlaneGrid plane={PLANE} />
          <text x={308} y={py(0) - 6} fontSize={12} fontWeight={700} textAnchor="end" className="fill-ink-2">
            x
          </text>
          <text x={px(0) + 6} y={16} fontSize={12} fontWeight={700} className="fill-ink-2">
            y
          </text>

          {showGhost && ghostSeg ? (
            <line
              x1={px(ghostSeg[0])}
              y1={py(mv * ghostSeg[0])}
              x2={px(ghostSeg[1])}
              y2={py(mv * ghostSeg[1])}
              className="stroke-ink-2"
              strokeWidth={2}
              strokeDasharray="6 5"
            />
          ) : null}

          {tri ? (
            <g>
              <polygon
                points={`${px(tri.x0)},${py(tri.y0)} ${px(tri.x0 + run)},${py(tri.y0)} ${px(tri.x0 + run)},${py(tri.y0 + rise)}`}
                className="fill-accent"
                opacity={0.18}
              />
              <line x1={px(tri.x0)} x2={px(tri.x0 + run)} y1={py(tri.y0)} y2={py(tri.y0)} className="stroke-good" strokeWidth={3} />
              <line
                x1={px(tri.x0 + run)}
                x2={px(tri.x0 + run)}
                y1={py(tri.y0)}
                y2={py(tri.y0 + rise)}
                className="stroke-accent"
                strokeWidth={3}
              />
              <text
                x={Math.min(296, Math.max(24, px(tri.x0 + run / 2)))}
                y={clampY(rise > 0 ? py(tri.y0) + 15 : py(tri.y0) - 7)}
                fontSize={11}
                fontWeight={800}
                textAnchor="middle"
                className="fill-good stroke-surface"
                strokeWidth={3}
                style={HALO}
              >
                run {run}
              </text>
              <text
                x={px(tri.x0 + run) > 262 ? px(tri.x0 + run) - 6 : px(tri.x0 + run) + 6}
                y={Math.abs(tri.y0 + rise / 2) < 0.5 ? py(0) - 6 : py(tri.y0 + rise / 2) + 4}
                fontSize={11}
                fontWeight={800}
                textAnchor={px(tri.x0 + run) > 262 ? "end" : "start"}
                className="fill-ink stroke-surface"
                strokeWidth={3}
                style={HALO}
              >
                rise {intText(rise)}
              </text>
            </g>
          ) : null}

          {seg ? (
            <line
              x1={px(seg[0])}
              y1={py(mv * seg[0] + c)}
              x2={px(seg[1])}
              y2={py(mv * seg[1] + c)}
              className="stroke-brand"
              strokeWidth={3.5}
              strokeLinecap="round"
            />
          ) : null}

          <circle cx={px(0)} cy={py(c)} r={5.5} className="fill-accent stroke-surface" strokeWidth={2} />
          {mode === "explore" ? (
            <text
              x={px(0) - 8}
              y={clampY(py(c) - 8)}
              fontSize={11}
              fontWeight={800}
              textAnchor="end"
              className="fill-ink stroke-surface"
              strokeWidth={3}
              style={HALO}
            >
              (0, {intText(c)})
            </text>
          ) : null}

          {mode === "targets" ? (
            <>
              {targetDot("A", puzzle.a, hitA)}
              {targetDot("B", puzzle.b, hitB)}
            </>
          ) : null}
        </svg>

        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <Step name="Rise" label="Rise (up ↑ or down ↓)" value={rise} min={-6} max={6} onChange={setRise} />
          <Step name="Run" label="Run (across →)" value={run} min={1} max={6} onChange={setRun} />
        </div>
        <Slider
          label={
            <>
              y-intercept <M>c</M> (slides the line up and down)
            </>
          }
          value={c}
          min={-6}
          max={6}
          onChange={setC}
          format={intText}
        />

        <div className="grid grid-cols-3 gap-2">
          <Readout label="Gradient m" value={<M>{simplified ? `${rise}/${run} = ${qMark(m)}` : qMark(m)}</M>} />
          <Readout label="Crosses y-axis" value={<M>{`(0, ${c})`}</M>} tone="ink" />
          <Readout label="Crosses x-axis" value={xInt} tone="ink" />
        </div>

        {mode === "explore" ? (
          <div className="space-y-3">
            <div className="overflow-x-auto rounded-xl border border-line">
              <table className="w-full text-center text-sm tabular-nums">
                <caption className="sr-only">Table of values for {eqText}</caption>
                <tbody>
                  <tr className="border-b border-line">
                    <th scope="row" className="bg-surface-2 px-2 py-1.5 font-extrabold text-ink-2">
                      x
                    </th>
                    {TABLE_XS.map((x) => (
                      <td key={`x${x}`} className={`px-2 py-1.5 font-bold ${x === 0 ? "bg-brand-soft" : ""}`}>
                        {intText(x)}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th scope="row" className="bg-surface-2 px-2 py-1.5 font-extrabold text-ink-2">
                      y
                    </th>
                    {TABLE_XS.map((x) => (
                      <td key={`y${x}`} className={`px-2 py-1.5 font-bold text-brand ${x === 0 ? "bg-brand-soft" : ""}`}>
                        <M>{qMark(yAt(x))}</M>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-ink-2">
              Each time x goes up by 1, y changes by the gradient <M>{qMark(m)}</M> — the same jump every time, which is exactly why the points
              lie on a straight line.
            </p>
            <button type="button" className="btn btn-secondary btn-sm" aria-pressed={ghost} onClick={() => setGhost((g) => !g)}>
              {ghost ? "Hide" : "Show"} the parallel line <M>y = mx</M>
            </button>
          </div>
        ) : (
          <div className="space-y-3">
            <div
              className={`rounded-xl p-3 text-sm font-bold ${solved ? "bg-good-soft text-good" : "bg-surface-2 text-ink"}`}
              aria-live="polite"
            >
              {solved ? (
                <>🎯 Both targets hit!</>
              ) : (
                <>
                  Make one line pass through A{ptText(puzzle.a)} and B{ptText(puzzle.b)}. A {hitA ? "✓" : "✗"} · B {hitB ? "✓" : "✗"}
                </>
              )}
              <span className="float-right font-extrabold text-ink-2">Solved: {solvedCount + (solved ? 1 : 0)}</span>
            </div>
            {hintsShown > 0 ? (
              <ol className="list-decimal space-y-1 pl-5 text-sm text-ink-2">
                {hintList.slice(0, hintsShown).map((h, i) => (
                  <li key={i}>
                    <Rich text={h} />
                  </li>
                ))}
              </ol>
            ) : null}
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={() => setHintsShown((h) => Math.min(hintList.length, h + 1))}
                disabled={solved || hintsShown >= hintList.length}
              >
                {hintsShown === 0 ? "Give me a hint" : hintsShown < hintList.length - 1 ? "Next hint" : hintsShown < hintList.length ? "Show me" : "No more hints"}
              </button>
              <button type="button" className={`btn btn-sm ${solved ? "btn-primary" : "btn-ghost"}`} onClick={newPuzzle}>
                {solved ? "Next target →" : "Skip — new target"}
              </button>
            </div>
          </div>
        )}
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Journey graph: distance–time, gradient = speed                          */
/* ------------------------------------------------------------------------ */

interface Leg {
  /** minutes */
  dur: number;
  /** distance from home at the end of the leg, km */
  end: number;
}

const START_LEGS: Leg[] = [
  { dur: 30, end: 6 },
  { dur: 30, end: 6 },
  { dur: 20, end: 0 },
];
const T_MAX = 180; // minutes after 9:00
const D_MAX = 12; // km
const JW = 360;
const JH = 250;
const JL = 40;
const JR = 16;
const JT = 14;
const JB = 42;
const tx = (t: number) => JL + (t / T_MAX) * (JW - JL - JR);
const dy = (d: number) => JH - JB - (d / D_MAX) * (JH - JT - JB);

/** Clock time for t minutes after 9:00, e.g. "9:40" or "≈10:07". */
function clock(t: number): string {
  const r = Math.round(t);
  const h = 9 + Math.floor(r / 60);
  const mm = r % 60;
  return `${Math.abs(t - r) > 1e-9 ? "≈" : ""}${h}:${String(mm).padStart(2, "0")}`;
}

interface Meet {
  t: number;
  d: number;
  text: string;
}

function JourneyGraph() {
  const [legs, setLegs] = useState<Leg[]>(START_LEGS);
  const [sel, setSel] = useState<"0" | "1" | "2">("0");
  const [friend, setFriend] = useState(false);
  const [js, setJs] = useState(20);
  const [jv, setJv] = useState(18);

  const si = Number(sel);
  const setLeg = (patch: Partial<Leg>) => setLegs((prev) => prev.map((l, i) => (i === si ? { ...l, ...patch } : l)));

  // Corner points of Siti's graph.
  const pts: { t: number; d: number }[] = [{ t: 0, d: 0 }];
  for (const l of legs) pts.push({ t: pts[pts.length - 1].t + l.dur, d: l.end });

  const info = legs.map((l, i) => {
    const t0 = pts[i].t;
    const d0 = pts[i].d;
    const change = l.end - d0;
    const speed = (60 * Math.abs(change)) / l.dur; // always terminates: 60/dur ∈ {6, 3, 2, 1.5, 1.2, 1}
    return { t0, t1: t0 + l.dur, d0, d1: l.end, change, speed, dur: l.dur };
  });

  const totalT = pts[pts.length - 1].t;
  const totalD = info.reduce((s, L) => s + Math.abs(L.change), 0);
  const avg = (60 * totalD) / totalT;
  const hasStop = info.some((L) => L.change === 0);
  const maxSpeed = Math.max(...info.map((L) => L.speed));
  const fastest = info.map((L, i) => (L.speed === maxSpeed ? i + 1 : 0)).filter((i) => i > 0);

  // ---- Jun: leaves home at js minutes, steady jv km/h, until 12 km or the edge ----
  const jEndT = Math.min(T_MAX, js + (60 * D_MAX) / jv);
  const jEndD = (jv * (jEndT - js)) / 60;

  const meets: Meet[] = [];
  let together: { from: number; to: number } | null = null;
  if (friend) {
    for (const L of info) {
      // Siti: d = d0 + change·(t − t0)/dur.  Jun: d = jv·(t − js)/60.
      // Equal ⇔ t·(jv·dur − 60·change) = 60·dur·d0 − 60·change·t0 + jv·dur·js (all integers).
      const N = 60 * L.dur * L.d0 - 60 * L.change * L.t0 + jv * L.dur * js;
      const Dn = jv * L.dur - 60 * L.change;
      const lo = Math.max(L.t0, js);
      const hi = Math.min(L.t1, jEndT);
      if (lo > hi + 1e-9) continue;
      if (Dn === 0) {
        if (N === 0 && hi > lo) together = { from: lo, to: hi };
        continue;
      }
      const t = N / Dn;
      if (t < lo - 1e-9 || t > hi + 1e-9) continue;
      if (meets.some((mt) => Math.abs(mt.t - t) < 1e-6)) continue;
      const d = (jv * (t - js)) / 60;
      const inside = t > L.t0 + 1e-9 && t < L.t1 - 1e-9 && t > js + 1e-9;
      let kind = "they are in the same place at the same time";
      if (d < 1e-9) kind = "they are both at home";
      else if (inside && L.change === 0) kind = "Jun rides past Siti while she is stopped";
      else if (inside && L.change < 0) kind = "they pass each other going opposite ways";
      else if (inside && jv > L.speed) kind = "Jun overtakes Siti";
      else if (inside && jv < L.speed) kind = "Siti overtakes Jun";
      meets.push({ t, d, text: `At ${clock(t)} both are ${approx(d, 2)} km from home: ${kind}.` });
    }
    meets.sort((a, b) => a.t - b.t);
  }

  // ---- caption ----
  const S = info[si];
  const parts: string[] = [];
  const legName = `**Leg ${si + 1}** (${clock(S.t0)} to ${clock(S.t1)})`;
  if (S.change > 0)
    parts.push(
      `${legName}: the line goes **up** — Siti rides ${S.change} km further from home in ${S.dur} min. Gradient = speed = ${S.change} km ÷ {{${qMark(
        q(S.dur, 60),
      )}}} h = ${fmt(S.speed)} km/h.`,
    );
  else if (S.change < 0)
    parts.push(
      `${legName}: the line goes **down** — she rides ${Math.abs(S.change)} km back towards home in ${S.dur} min, at ${fmt(
        S.speed,
      )} km/h. Distance from home is falling, but her speed is still positive.`,
    );
  else
    parts.push(
      `${legName}: the line is **flat** — her distance from home stays at ${S.d0} km for ${S.dur} min, so she is ${
        S.d0 === 0 ? "at home" : "stopped"
      } (speed 0).`,
    );
  if (maxSpeed === 0) parts.push("Every leg is flat, so Siti never moves.");
  else if (fastest.length === 1) parts.push(`Leg ${fastest[0]} has the steepest line, so it is the fastest (${fmt(maxSpeed)} km/h).`);
  else parts.push(`Legs ${fastest.join(" and ")} are equally steep, so they have the same speed (${fmt(maxSpeed)} km/h) — even if one goes up and one comes down.`);
  parts.push(
    `Average speed for the whole trip = total distance ÷ total time = ${totalD} km ÷ {{${qMark(q(totalT, 60))}}} h = ${approx(avg, 2)} km/h${
      hasStop ? " — the stop drags it down" : ""
    }.`,
  );
  if (pts[pts.length - 1].d === 0 && totalD > 0) parts.push(`She ends back home (0 km from home), but she has still travelled ${totalD} km.`);
  if (friend) {
    if (together) parts.push(`Their lines overlap from ${clock(together.from)} to ${clock(together.to)}: they ride side by side.`);
    if (meets.length) parts.push(`Where the lines cross, they meet. ${meets.map((mt) => mt.text).join(" ")}`);
    else if (!together) parts.push("Jun's line never crosses Siti's, so they never meet.");
  }
  const caption = parts.join(" ");

  const aria =
    `Distance–time graph. Siti: ${info
      .map((L, i) => `leg ${i + 1}, ${clock(L.t0)} to ${clock(L.t1)}, from ${L.d0} km to ${L.d1} km, ${fmt(L.speed)} km/h`)
      .join("; ")}.` +
    (friend ? ` Jun leaves home at ${clock(js)} at ${jv} km/h. ${meets.length ? meets.map((mt) => mt.text).join(" ") : "They never meet."}` : "");

  const timeTicks = [0, 30, 60, 90, 120, 150, 180];
  const distTicks = [0, 2, 4, 6, 8, 10, 12];
  const last = pts[pts.length - 1];

  return (
    <WidgetFrame
      title="Journey graph: gradient = speed"
      tryThis={[
        "Make leg 2 a rest stop at the hawker centre. What does stopping look like on the graph?",
        "Predict which leg is fastest just from the steepness — then check the speeds.",
        "Make one leg 6 km in 20 min and another 6 km in 40 min. Which line is steeper, and why?",
        "Add Jun. Can you make him catch Siti exactly as she reaches her furthest point?",
      ]}
      caption={<Rich text={caption} />}
    >
      <div className="space-y-4">
        <p className="text-sm text-ink-2">
          Siti cycles from home along a park connector. Shape her trip one leg at a time — the graph shows her{" "}
          <strong className="text-ink">distance from home</strong> against the time.
        </p>

        <svg viewBox={`0 0 ${JW} ${JH}`} className="h-auto w-full" role="img" aria-label={aria}>
          {/* grid */}
          {timeTicks.map((t) => (
            <line key={`gt${t}`} x1={tx(t)} x2={tx(t)} y1={dy(0)} y2={dy(D_MAX)} className="stroke-line" strokeWidth={1} />
          ))}
          {distTicks.map((d) => (
            <line key={`gd${d}`} x1={tx(0)} x2={tx(T_MAX)} y1={dy(d)} y2={dy(d)} className="stroke-line" strokeWidth={1} />
          ))}
          <line x1={tx(0)} x2={tx(T_MAX)} y1={dy(0)} y2={dy(0)} className="stroke-ink-2" strokeWidth={1.5} />
          <line x1={tx(0)} x2={tx(0)} y1={dy(0)} y2={dy(D_MAX)} className="stroke-ink-2" strokeWidth={1.5} />
          {timeTicks.map((t) => (
            <text key={`lt${t}`} x={tx(t)} y={dy(0) + 14} fontSize={10} textAnchor="middle" className="fill-ink-2">
              {clock(t)}
            </text>
          ))}
          {distTicks.map((d) => (
            <text key={`ld${d}`} x={tx(0) - 5} y={dy(d) + 3} fontSize={10} textAnchor="end" className="fill-ink-2">
              {d}
            </text>
          ))}
          <text x={(tx(0) + tx(T_MAX)) / 2} y={JH - 6} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-ink-2">
            Time of day
          </text>
          <text
            x={11}
            y={(dy(0) + dy(D_MAX)) / 2}
            fontSize={11}
            fontWeight={700}
            textAnchor="middle"
            className="fill-ink-2"
            transform={`rotate(-90 11 ${(dy(0) + dy(D_MAX)) / 2})`}
          >
            Distance from home (km)
          </text>

          {/* selected leg highlight */}
          <line
            x1={tx(S.t0)}
            y1={dy(S.d0)}
            x2={tx(S.t1)}
            y2={dy(S.d1)}
            className="stroke-brand-soft"
            strokeWidth={12}
            strokeLinecap="round"
          />

          {/* Jun */}
          {friend ? (
            <g>
              <line x1={tx(js)} y1={dy(0)} x2={tx(jEndT)} y2={dy(jEndD)} className="stroke-accent" strokeWidth={3} strokeDasharray="7 4" />
              <text
                x={Math.min(tx(jEndT), JW - JR) - 2}
                y={Math.max(JT + 10, dy(jEndD) - 6)}
                fontSize={11}
                fontWeight={800}
                textAnchor="end"
                className="fill-ink stroke-surface"
                strokeWidth={3}
                style={HALO}
              >
                Jun
              </text>
            </g>
          ) : null}

          {/* Siti */}
          <polyline
            points={pts.map((p) => `${tx(p.t)},${dy(p.d)}`).join(" ")}
            fill="none"
            className="stroke-brand"
            strokeWidth={3.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
          {pts.map((p, i) => (
            <circle key={`p${i}`} cx={tx(p.t)} cy={dy(p.d)} r={3.5} className="fill-brand" />
          ))}
          {info.map((L, i) => {
            const mx = (tx(L.t0) + tx(L.t1)) / 2;
            const my = (dy(L.d0) + dy(L.d1)) / 2;
            return (
              <g key={`b${i}`}>
                <circle cx={mx} cy={my} r={9} className={i === si ? "fill-brand stroke-surface" : "fill-surface stroke-brand"} strokeWidth={2} />
                <text x={mx} y={my + 4} fontSize={11} fontWeight={800} textAnchor="middle" className={i === si ? "fill-surface" : "fill-brand"}>
                  {i + 1}
                </text>
              </g>
            );
          })}
          <text
            x={Math.min(tx(last.t) + 6, JW - JR - 26)}
            y={Math.max(JT + 10, dy(last.d) - 8)}
            fontSize={11}
            fontWeight={800}
            className="fill-brand stroke-surface"
            strokeWidth={3}
            style={HALO}
          >
            Siti
          </text>

          {/* meetings */}
          {meets.map((mt) => (
            <circle key={`m${mt.t}`} cx={tx(mt.t)} cy={dy(mt.d)} r={6} className="fill-good stroke-surface" strokeWidth={2} />
          ))}
        </svg>

        <div className="space-y-3 rounded-xl border border-line p-3">
          <Segmented<"0" | "1" | "2">
            label="Which leg to change"
            value={sel}
            onChange={setSel}
            options={[
              { value: "0", label: "Leg 1" },
              { value: "1", label: "Leg 2" },
              { value: "2", label: "Leg 3" },
            ]}
          />
          <Slider
            label={`Leg ${si + 1}: how long it takes`}
            value={legs[si].dur}
            min={10}
            max={60}
            step={10}
            onChange={(v) => setLeg({ dur: v })}
            format={(v) => `${v} min`}
          />
          <Slider
            label={`Leg ${si + 1}: distance from home at the end`}
            value={legs[si].end}
            min={0}
            max={12}
            onChange={(v) => setLeg({ end: v })}
            format={(v) => `${v} km`}
          />
        </div>

        <ul className="space-y-2 text-sm">
          {info.map((L, i) => (
            <li key={`leg${i}`} className={`rounded-xl border p-2.5 ${i === si ? "border-brand bg-brand-soft" : "border-line bg-surface"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                <span className="font-extrabold text-ink">
                  Leg {i + 1} · {clock(L.t0)}–{clock(L.t1)}
                </span>
                <span className="font-extrabold tabular-nums text-brand">{fmt(L.speed)} km/h</span>
              </div>
              <div className="mt-0.5 text-ink-2">
                {L.change > 0
                  ? `${L.change} km further from home in ${L.dur} min — going away`
                  : L.change < 0
                    ? `${Math.abs(L.change)} km back towards home in ${L.dur} min — coming back`
                    : `stays ${L.d0} km from home for ${L.dur} min — stopped`}
              </div>
              <div className="mt-0.5 tabular-nums text-ink-2">
                speed = {Math.abs(L.change)} km ÷ <M>{qMark(q(L.dur, 60))}</M> h = {fmt(L.speed)} km/h
              </div>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-3 gap-2">
          <Readout label="Total time" value={`${totalT} min`} tone="ink" />
          <Readout label="Distance travelled" value={`${totalD} km`} tone="ink" />
          <Readout label="Average speed" value={`${approx(avg, 2)} km/h`} />
        </div>

        <div className="space-y-3">
          <button type="button" className="btn btn-secondary btn-sm" aria-pressed={friend} onClick={() => setFriend((f) => !f)}>
            {friend ? "Remove Jun" : "Add Jun, a second cyclist"}
          </button>
          {friend ? (
            <div className="grid grid-cols-1 gap-3 rounded-xl border border-line p-3 sm:grid-cols-2">
              <Slider label="Jun leaves home at" value={js} min={0} max={120} step={5} onChange={setJs} format={clock} />
              <Slider label="Jun's steady speed" value={jv} min={6} max={30} onChange={setJv} format={(v) => `${v} km/h`} />
            </div>
          ) : null}
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "line-lab",
    title: "Line lab: y = mx + c",
    blurb: "Build a line from its rise, run and y-intercept — then find the line that hits two target points.",
    Component: LineLab,
  },
  {
    id: "journey-graph",
    title: "Journey graph: gradient = speed",
    blurb: "Shape a cycle ride on a distance–time graph, read speeds from gradients, and see what it means when two lines cross.",
    Component: JourneyGraph,
  },
];
