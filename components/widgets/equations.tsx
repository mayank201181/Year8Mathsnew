"use client";
// Interactive explorables for the "equations" topic.
//  1. Balance puzzle — algebra tiles on a see-saw. Solve ax + b = cx + d by
//     doing the same move to both sides (the beam stays level), or switch to
//     "Check a value" to substitute trial values and watch the beam tip.
//  2. Inequality number line — build one- and two-sided intervals with open
//     and closed circles, see the integer solutions light up, and work through
//     target challenges (reading, solving and forming inequalities).
import { useState, type ReactNode } from "react";
import { WidgetFrame, Stepper, Slider, Segmented, Readout, M, type WidgetDef } from "./kit";
import { RichInline } from "../Rich";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                             */
/* ------------------------------------------------------------------------ */

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

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

/** A number for maths markup (ASCII minus, rendered as −), without float noise. */
const mn = (v: number) => String(+v.toFixed(6) || 0);
/** A number for plain text, with a real minus sign. */
const pn = (v: number) => mn(v).replace("-", "−");

/* ------------------------------------------------------------------------ */
/* 1. Balance puzzle                                                          */
/* ------------------------------------------------------------------------ */

/** One side of an equation: x·(coefficient) + constant. */
interface Side {
  x: number;
  n: number;
}

interface Frac {
  n: number;
  d: number;
}

/** The current equation. `frac` is set once the last move gives a fractional answer. */
interface BState {
  L: Side;
  R: Side;
  frac?: Frac & { xLeft: boolean };
}

interface Puzzle {
  name: string;
  L: Side;
  R: Side;
  /** How the equation is first written, if different from the tiles (e.g. with brackets). */
  shown?: string;
  /** What the tiles show for a `shown` equation (maths markup allowed). */
  shownNote?: string;
}

const PUZZLES: Puzzle[] = [
  { name: "One step", L: { x: 1, n: 9 }, R: { x: 0, n: 17 } },
  { name: "Two steps", L: { x: 3, n: 4 }, R: { x: 0, n: 25 } },
  { name: "Brackets", L: { x: 4, n: 12 }, R: { x: 0, n: 32 }, shown: "4(x + 3) = 32", shownNote: "the tiles show 4 groups of {{x + 3}}" },
  { name: "Unknowns on both sides", L: { x: 5, n: 2 }, R: { x: 2, n: 14 } },
  { name: "More x on the right", L: { x: 1, n: 14 }, R: { x: 3, n: 4 } },
  { name: "A negative number", L: { x: 4, n: -3 }, R: { x: 2, n: 9 } },
  { name: "A negative answer", L: { x: 4, n: 11 }, R: { x: 1, n: 2 } },
  { name: "A fraction answer", L: { x: 4, n: 1 }, R: { x: 2, n: 8 } },
];

/** Tile limits so everything fits on the pans. */
const MAX_X = 9;
const MAX_N = 40;

function sideMarkup(s: Side): string {
  const parts: string[] = [];
  if (s.x !== 0) parts.push(s.x === 1 ? "x" : s.x === -1 ? "-x" : `${s.x}x`);
  if (s.n !== 0) {
    if (parts.length) parts.push(s.n > 0 ? `+ ${s.n}` : `- ${-s.n}`);
    else parts.push(String(s.n));
  }
  return parts.length ? parts.join(" ") : "0";
}

const sidePlain = (s: Side) => sideMarkup(s).replace(/-/g, "−");

function fracMarkup(f: Frac): string {
  if (f.d === 1) return mn(f.n);
  return f.n < 0 ? `-${-f.n}/${f.d}` : `${f.n}/${f.d}`;
}

function eqMarkup(st: BState): string {
  if (st.frac) {
    const f = fracMarkup(st.frac);
    return st.frac.xLeft ? `x = ${f}` : `${f} = x`;
  }
  return `${sideMarkup(st.L)} = ${sideMarkup(st.R)}`;
}

/** The exact solution of the puzzle's equation (coefficients always differ). */
function solutionOf(p: Puzzle): Frac {
  let n = p.R.n - p.L.n;
  let d = p.L.x - p.R.x;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  const g = gcd(n, d);
  return { n: n / g, d: d / g };
}

/** The answer if the equation now reads x = number (or number = x). */
function solvedValue(st: BState): Frac | null {
  if (st.frac) return { n: st.frac.n, d: st.frac.d };
  const { L, R } = st;
  if (L.x === 1 && L.n === 0 && R.x === 0) return { n: R.n, d: 1 };
  if (R.x === 1 && R.n === 0 && L.x === 0) return { n: L.n, d: 1 };
  return null;
}

/** "3 × 4 + 5 = 17" in maths markup, for substituting x = t into a side. */
function substMarkup(s: Side, t: number): string {
  const tv = t < 0 ? `(${mn(t)})` : mn(t);
  const parts: string[] = [];
  if (s.x !== 0) parts.push(s.x === 1 ? tv : s.x === -1 ? `-${tv}` : `${s.x} * ${tv}`);
  if (s.n !== 0) parts.push(parts.length ? (s.n > 0 ? `+ ${s.n}` : `- ${-s.n}`) : String(s.n));
  return `${parts.join(" ") || "0"} = ${mn(s.x * t + s.n)}`;
}

type OpKind = "subN" | "addN" | "subX" | "addX" | "div";

function opLabel(op: OpKind, k: number): string {
  const kx = k === 1 ? "x" : `${k}x`;
  switch (op) {
    case "subN":
      return `−${k} from both sides`;
    case "addN":
      return `+${k} to both sides`;
    case "subX":
      return `−${kx} from both sides`;
    case "addX":
      return `+${kx} to both sides`;
    case "div":
      return `÷${k} both sides`;
  }
}

type OpResult = { ok: true; st: BState } | { ok: false; err: string };

function fits(st: BState): OpResult {
  const vals = [st.L, st.R];
  if (vals.some((s) => Math.abs(s.x) > MAX_X || Math.abs(s.n) > MAX_N)) {
    return { ok: false, err: "That would need more tiles than fit on a pan. Try a move that makes things simpler." };
  }
  return { ok: true, st };
}

function applyOp(st: BState, op: OpKind, k: number): OpResult {
  if (st.frac) return { ok: false, err: "Already solved. Press Undo, Start again or pick a new puzzle." };
  const { L, R } = st;
  switch (op) {
    case "subN":
      return fits({ L: { x: L.x, n: L.n - k }, R: { x: R.x, n: R.n - k } });
    case "addN":
      return fits({ L: { x: L.x, n: L.n + k }, R: { x: R.x, n: R.n + k } });
    case "subX":
      return fits({ L: { x: L.x - k, n: L.n }, R: { x: R.x - k, n: R.n } });
    case "addX":
      return fits({ L: { x: L.x + k, n: L.n }, R: { x: R.x + k, n: R.n } });
    case "div": {
      if (k < 2) return { ok: false, err: "Dividing by 1 changes nothing — set the amount to 2 or more." };
      if ([L.x, L.n, R.x, R.n].every((v) => v % k === 0)) {
        return { ok: true, st: { L: { x: L.x / k, n: L.n / k }, R: { x: R.x / k, n: R.n / k } } };
      }
      // Finishing move kx = m (or m = kx) with a fractional answer.
      if (L.x === k && L.n === 0 && R.x === 0) {
        const g = gcd(R.n, k);
        return { ok: true, st: { L, R, frac: { n: R.n / g, d: k / g, xLeft: true } } };
      }
      if (R.x === k && R.n === 0 && L.x === 0) {
        const g = gcd(L.n, k);
        return { ok: true, st: { L, R, frac: { n: L.n / g, d: k / g, xLeft: false } } };
      }
      const xAlone = (L.n === 0 && R.x === 0) || (R.n === 0 && L.x === 0);
      const coef = L.x !== 0 ? L.x : R.x;
      if (xAlone && coef < 0) {
        return { ok: false, err: `The x-tiles are negative. Add ${-coef === 1 ? "x" : `${-coef}x`} to both sides first, so x ends up positive.` };
      }
      if (xAlone) {
        return { ok: false, err: `There are ${coef} x-tiles. To leave exactly one x, divide both sides by ${coef}.` };
      }
      return {
        ok: false,
        err: `${k} doesn't go into every term of ${sidePlain(L)} = ${sidePlain(R)}, so the tiles can't be split into ${k} equal groups. Get the x-tiles on their own first, or divide by a number that goes into every term.`,
      };
    }
  }
}

/** A next-step nudge for the current equation (maths markup). */
function hintFor(st: BState): string {
  const { L, R } = st;
  const term = (c: number) => (c === 1 ? "x" : c === -1 ? "-x" : `${c}x`);
  if (L.x !== 0 && R.x !== 0) {
    const small = Math.min(L.x, R.x);
    return small > 0
      ? `x is on both sides. Take {{${term(small)}}} (the smaller x-term) away from both sides — then x is left only on the side that had more.`
      : `Clear the negative x-term: add {{${term(-small)}}} to both sides.`;
  }
  const xs = L.x !== 0 ? L : R;
  if (xs.x < 0) return `The x-term is negative. Add {{${term(-xs.x)}}} to both sides so the x-tiles end up positive on the other side.`;
  if (xs.n > 0) return `The x side also has ${xs.n} ones. Take ${xs.n} away from both sides to leave the x-tiles alone.`;
  if (xs.n < 0) return `Undo the −${-xs.n}: add ${-xs.n} to both sides (each +1 cancels a −1).`;
  return `{{${term(xs.x)}}} means ${xs.x} lots of x. Divide both sides by ${xs.x}.`;
}

/* ---------- see-saw drawing ---------- */

const PIVOT_X = 200;
const BEAM_Y = 200;
const XW = 26;
const XH = 30;
const XG = 4;
const PER_X = 5;
const UW = 12;
const UG = 2;
const PER_U = 10;

/** Tiles for one pan, stacked upwards from the beam: x-tiles first, ones above. */
function PanTiles({ side, cx, fracLabel }: { side: Side | null; cx: number; fracLabel?: string }) {
  const out: ReactNode[] = [];
  if (fracLabel) {
    out.push(
      <g key="frac">
        <rect x={cx - 34} y={BEAM_Y - 34} width={68} height={32} rx={6} className="fill-accent-soft stroke-accent" strokeWidth={2} />
        <text x={cx} y={BEAM_Y - 13} textAnchor="middle" fontSize={15} fontWeight={800} className="fill-ink">
          {fracLabel}
        </text>
      </g>,
    );
    return <g>{out}</g>;
  }
  if (!side) return null;
  const nx = Math.abs(side.x);
  const nu = Math.abs(side.n);
  const xRows = Math.ceil(nx / PER_X);
  for (let i = 0; i < nx; i++) {
    const row = Math.floor(i / PER_X);
    const col = i % PER_X;
    const inRow = Math.min(PER_X, nx - row * PER_X);
    const rowW = inRow * XW + (inRow - 1) * XG;
    const x0 = cx - rowW / 2 + col * (XW + XG);
    const y0 = BEAM_Y - (row + 1) * (XH + XG);
    const neg = side.x < 0;
    out.push(
      <g key={`x${i}`}>
        <rect x={x0} y={y0} width={XW} height={XH} rx={4} className={neg ? "fill-bad-soft stroke-bad" : "fill-brand-soft stroke-brand"} strokeWidth={2} />
        <text x={x0 + XW / 2} y={y0 + XH / 2 + 5} textAnchor="middle" fontSize={neg ? 12 : 14} fontWeight={800} fontStyle="italic" className={neg ? "fill-bad" : "fill-brand"}>
          {neg ? "−x" : "x"}
        </text>
      </g>,
    );
  }
  const top = BEAM_Y - xRows * (XH + XG) - (xRows ? 2 : 0);
  for (let i = 0; i < nu; i++) {
    const row = Math.floor(i / PER_U);
    const col = i % PER_U;
    const inRow = Math.min(PER_U, nu - row * PER_U);
    const rowW = inRow * UW + (inRow - 1) * UG;
    const x0 = cx - rowW / 2 + col * (UW + UG);
    const y0 = top - (row + 1) * (UW + UG);
    out.push(
      <rect key={`u${i}`} x={x0} y={y0} width={UW} height={UW} rx={2} className={side.n < 0 ? "fill-bad stroke-bad" : "fill-accent stroke-ink-2"} strokeWidth={0.75} />,
    );
  }
  return <g>{out}</g>;
}

function SeeSaw({ st, angle, label }: { st: BState; angle: number; label: string }) {
  const leftFrac = st.frac && !st.frac.xLeft ? fracMarkup(st.frac) : undefined;
  const rightFrac = st.frac && st.frac.xLeft ? fracMarkup(st.frac) : undefined;
  const leftSide = st.frac ? (st.frac.xLeft ? { x: 1, n: 0 } : null) : st.L;
  const rightSide = st.frac ? (st.frac.xLeft ? null : { x: 1, n: 0 }) : st.R;
  return (
    <svg viewBox="0 52 400 198" className="mx-auto h-auto w-full max-w-md" role="img" aria-label={label}>
      <g
        style={{
          transform: `rotate(${angle}deg)`,
          transformOrigin: `${PIVOT_X}px ${BEAM_Y + 3}px`,
          transformBox: "view-box",
          transition: "transform 0.45s ease",
        }}
      >
        <rect x={20} y={BEAM_Y} width={360} height={7} rx={3} className="fill-ink-2" />
        <PanTiles side={leftSide} cx={105} fracLabel={leftFrac?.replace("-", "−")} />
        <PanTiles side={rightSide} cx={295} fracLabel={rightFrac?.replace("-", "−")} />
      </g>
      <polygon points={`${PIVOT_X},${BEAM_Y + 7} ${PIVOT_X - 18},${BEAM_Y + 38} ${PIVOT_X + 18},${BEAM_Y + 38}`} className="fill-surface-2 stroke-ink-2" strokeWidth={2} />
      <rect x={PIVOT_X - 40} y={BEAM_Y + 38} width={80} height={5} rx={2} className="fill-ink-2" />
      <text x={105} y={BEAM_Y + 30} textAnchor="middle" fontSize={12} className="fill-ink-2">
        left side
      </text>
      <text x={295} y={BEAM_Y + 30} textAnchor="middle" fontSize={12} className="fill-ink-2">
        right side
      </text>
    </svg>
  );
}

function TileKey() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-ink-2">
      <span className="inline-flex items-center gap-1">
        <span className="inline-block h-4 w-3 rounded-sm border-2 border-brand bg-brand-soft" aria-hidden /> = x
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded-sm bg-accent" aria-hidden /> = 1
      </span>
      <span className="inline-flex items-center gap-1">
        <span className="inline-block h-3 w-3 rounded-sm bg-bad" aria-hidden /> red = negative (a +1 and a −1 cancel)
      </span>
    </div>
  );
}

function randInt(lo: number, hi: number): number {
  return lo + Math.floor(Math.random() * (hi - lo + 1));
}

/** Called from a click handler only (never during render). */
function randomPuzzle(): Puzzle {
  for (let tries = 0; tries < 500; tries++) {
    const sol = randInt(-5, 9);
    const a = randInt(1, 6);
    const c = randInt(0, 5);
    if (a === c) continue;
    const b = randInt(-6, 15);
    const d = (a - c) * sol + b;
    if (Math.abs(d) > 30) continue;
    if (c === 0 && b === 0 && a === 1) continue; // already solved
    if (sol === 0 && Math.random() < 0.7) continue; // keep x = 0 rare
    const big: Side = { x: a, n: b };
    const small: Side = { x: c, n: d };
    return Math.random() < 0.4
      ? { name: "Random puzzle", L: small, R: big }
      : { name: "Random puzzle", L: big, R: small };
  }
  return PUZZLES[3];
}

function BalancePuzzle() {
  const [pIndex, setPIndex] = useState(0);
  const [puzzle, setPuzzle] = useState<Puzzle>(PUZZLES[0]);
  const [hist, setHist] = useState<{ op: string; st: BState }[]>([]);
  const [k, setK] = useState(1);
  const [mode, setMode] = useState<"solve" | "check">("solve");
  const [t, setT] = useState(0);
  const [msg, setMsg] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);

  const start: BState = { L: puzzle.L, R: puzzle.R };
  const cur = hist.length ? hist[hist.length - 1].st : start;
  const sol = solutionOf(puzzle);
  const solVal = sol.n / sol.d;
  const done = solvedValue(cur);

  const load = (p: Puzzle, index: number) => {
    setPuzzle(p);
    setPIndex(index);
    setHist([]);
    setMsg(null);
    setShowHint(false);
    setT(0);
  };

  const act = (op: OpKind) => {
    const r = applyOp(cur, op, k);
    if (!r.ok) {
      setMsg(r.err);
      return;
    }
    setHist([...hist, { op: opLabel(op, k), st: r.st }]);
    setMsg(null);
    setShowHint(false);
  };

  // Check-a-value mode: substitute x = t into the ORIGINAL equation.
  const lv = puzzle.L.x * t + puzzle.L.n;
  const rv = puzzle.R.x * t + puzzle.R.n;
  const diff = lv - rv;
  const level = Math.abs(diff) < 1e-9;
  const angle = mode === "check" ? -clamp(diff * 1.5, -10, 10) : 0;
  const gapStep = puzzle.L.x - puzzle.R.x;

  const shownStart = puzzle.shown ?? eqMarkup(start);
  const svgLabel =
    mode === "solve"
      ? `Balance showing ${eqMarkup(cur).replace(/-/g, "−")}. The beam is level.`
      : `Balance for ${eqMarkup(start).replace(/-/g, "−")} with x = ${pn(t)}: left side ${pn(lv)}, right side ${pn(rv)}. ${
          level ? "The beam is level." : `The ${diff > 0 ? "left" : "right"} side is lower.`
        }`;

  const opButtons: { op: OpKind; text: string; aria: string }[] = [
    { op: "subN", text: `−${k}`, aria: `Subtract ${k} from both sides` },
    { op: "addN", text: `+${k}`, aria: `Add ${k} to both sides` },
    { op: "subX", text: `−${k === 1 ? "" : k}x`, aria: `Subtract ${k === 1 ? "" : k} x from both sides` },
    { op: "addX", text: `+${k === 1 ? "" : k}x`, aria: `Add ${k === 1 ? "" : k} x to both sides` },
    { op: "div", text: `÷${k}`, aria: `Divide both sides by ${k}` },
  ];

  let caption: ReactNode;
  if (mode === "check") {
    caption = (
      <>
        Substitute <M>{`x = ${mn(t)}`}</M> into <M>{shownStart}</M>: left <M>{substMarkup(puzzle.L, t)}</M>, right{" "}
        <M>{substMarkup(puzzle.R, t)}</M>.{" "}
        {level ? (
          <strong className="text-good">Level! x = {pn(t)} makes both sides equal, so it is the solution.</strong>
        ) : (
          <>
            Not level — the {diff > 0 ? "left" : "right"} side is bigger by {pn(Math.abs(diff))}. Each time x goes up by 1, the left side
            changes by {pn(puzzle.L.x)} and the right side by {pn(puzzle.R.x)}, so the gap changes by {pn(Math.abs(gapStep))}. Try a{" "}
            {t < solVal ? "bigger" : "smaller"} x.
          </>
        )}
      </>
    );
  } else if (done) {
    const v = done.n / done.d;
    caption = (
      <>
        <strong className="text-good">
          Solved: <M>{`x = ${fracMarkup(done)}`}</M>
        </strong>{" "}
        in {hist.length} {hist.length === 1 ? "move" : "moves"}. Check by substituting into the original equation: left{" "}
        <M>{substMarkup(puzzle.L, v)}</M>, right <M>{substMarkup(puzzle.R, v)}</M> ✓. Could you do it in fewer moves?
      </>
    );
  } else {
    caption = (
      <>
        {hist.length ? <>Last move: {hist[hist.length - 1].op}. </> : null}
        The beam stays level because every move is done to <strong>both</strong> sides, so the two sides stay equal. Aim for a single x-tile
        on one side and only ones on the other.
        {showHint ? (
          <span className="mt-2 block rounded-lg bg-brand-soft p-2">
            💡 <RichInline text={hintFor(cur)} />
          </span>
        ) : null}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Balance puzzle"
      tryThis={[
        "Puzzle 3 is {{4(x + 3) = 32}}. Solve it by dividing by 4 first, then again by taking 12 first. Which has friendlier numbers?",
        "Puzzle 5 is {{x + 14 = 3x + 4}}. Take x from both sides — why is that better than taking 3x?",
        "Before starting puzzle 7, predict: will x be positive or negative? How can you tell from the tiles?",
        "In *Check a value*, how much does the gap change each time x goes up by 1? Use it to jump straight to the answer.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Segmented
            label="Mode"
            value={mode}
            onChange={(v) => {
              setMode(v);
              setMsg(null);
            }}
            options={[
              { value: "solve", label: "Solve by balancing" },
              { value: "check", label: "Check a value" },
            ]}
          />
          <span className="chip">
            {puzzle.name === "Random puzzle" ? "Random puzzle" : `Puzzle ${pIndex + 1} of ${PUZZLES.length}: ${puzzle.name}`}
          </span>
        </div>

        <div className="text-center text-2xl font-extrabold text-ink" aria-live="polite">
          {mode === "solve" ? <M>{eqMarkup(cur)}</M> : <M>{shownStart}</M>}
          {puzzle.shown && (mode === "check" || hist.length === 0) ? (
            <div className="mt-1 text-sm font-semibold text-ink-2">
              Expanded, that is <M>{eqMarkup(start)}</M>
              {puzzle.shownNote ? (
                <>
                  {" "}
                  — <RichInline text={puzzle.shownNote} />
                </>
              ) : null}
              .
            </div>
          ) : null}
        </div>

        <SeeSaw st={mode === "solve" ? cur : start} angle={angle} label={svgLabel} />
        <TileKey />

        {mode === "solve" ? (
          <div className="space-y-3">
            <Stepper label="Amount for each move" value={k} min={1} max={20} onChange={setK} />
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-5">
              {opButtons.map((b) => (
                <button
                  key={b.op}
                  type="button"
                  className="btn btn-secondary tabular-nums"
                  onClick={() => act(b.op)}
                  disabled={!!cur.frac || (b.op === "div" && k < 2)}
                  aria-label={b.aria}
                >
                  {b.text}
                </button>
              ))}
            </div>
            <p className="text-xs text-ink-2">Each button does the move to both sides at once.</p>
            {msg ? <p className="rounded-lg bg-bad-soft p-2 text-sm text-bad">{msg}</p> : null}
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => setHist(hist.slice(0, -1))} disabled={!hist.length}>
                ↶ Undo
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setHist([]);
                  setMsg(null);
                  setShowHint(false);
                }}
                disabled={!hist.length}
              >
                Start again
              </button>
              <button type="button" className="btn btn-secondary" onClick={() => setShowHint(true)} disabled={!!done || showHint}>
                💡 Hint
              </button>
            </div>
            <ol className="space-y-1 rounded-xl border border-line p-3 text-sm">
              <li className="flex flex-wrap items-center gap-2">
                <span className="chip">start</span>
                <M>{eqMarkup(start)}</M>
              </li>
              {hist.map((h, i) => (
                <li key={i} className="flex flex-wrap items-center gap-2">
                  <span className="chip">{h.op}</span>
                  <M>{eqMarkup(h.st)}</M>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div className="space-y-3">
            <Slider label="Try x =" value={t} min={-10} max={10} step={0.5} onChange={setT} format={(v) => pn(v)} />
            <div className="grid grid-cols-2 gap-2">
              <Readout label="Left side" value={pn(lv)} tone={level ? "good" : "ink"} />
              <Readout label="Right side" value={pn(rv)} tone={level ? "good" : "ink"} />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              const i = (pIndex - 1 + PUZZLES.length) % PUZZLES.length;
              load(PUZZLES[i], i);
            }}
          >
            ← Previous
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              const i = (pIndex + 1) % PUZZLES.length;
              load(PUZZLES[i], i);
            }}
          >
            Next puzzle →
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => load(randomPuzzle(), pIndex)}>
            🎲 Random
          </button>
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Inequality number line                                                  */
/* ------------------------------------------------------------------------ */

type End = "none" | "open" | "closed";

interface Ineq {
  lo: End;
  a: number;
  hi: End;
  b: number;
}

const NMIN = -8;
const NMAX = 8;
const NL_Y = 40;
const nlx = (v: number) => 28 + (v - NMIN) * 24;

function satisfies(s: Ineq, v: number): boolean {
  const okLo = s.lo === "none" || (s.lo === "open" ? v > s.a : v >= s.a);
  const okHi = s.hi === "none" || (s.hi === "open" ? v < s.b : v <= s.b);
  return okLo && okHi;
}

/** No real number fits. */
function isEmpty(s: Ineq): boolean {
  if (s.lo === "none" || s.hi === "none") return false;
  if (s.a > s.b) return true;
  return s.a === s.b && !(s.lo === "closed" && s.hi === "closed");
}

function ineqMarkup(s: Ineq): string {
  const loOp = s.lo === "open" ? "<" : "<=";
  const hiOp = s.hi === "open" ? "<" : "<=";
  if (s.lo === "none" && s.hi === "none") return "x";
  if (s.hi === "none") return `x ${s.lo === "open" ? ">" : ">="} ${s.a}`;
  if (s.lo === "none") return `x ${hiOp} ${s.b}`;
  return `${s.a} ${loOp} x ${hiOp} ${s.b}`;
}

function ineqWords(s: Ineq): string {
  const lo = s.lo === "open" ? `greater than ${pn(s.a)}` : `greater than or equal to ${pn(s.a)}`;
  const hi = s.hi === "open" ? `less than ${pn(s.b)}` : `less than or equal to ${pn(s.b)}`;
  if (s.lo === "none" && s.hi === "none") return "x can be any number";
  if (s.hi === "none") return `x is ${lo}`;
  if (s.lo === "none") return `x is ${hi}`;
  return `x is ${lo} and ${hi}`;
}

type IntInfo = { kind: "all" } | { kind: "up"; from: number } | { kind: "down"; to: number } | { kind: "finite"; vals: number[] };

function intInfo(s: Ineq): IntInfo {
  const from = s.lo === "open" ? s.a + 1 : s.a;
  const to = s.hi === "open" ? s.b - 1 : s.b;
  if (s.lo === "none" && s.hi === "none") return { kind: "all" };
  if (s.hi === "none") return { kind: "up", from };
  if (s.lo === "none") return { kind: "down", to };
  const vals: number[] = [];
  for (let v = from; v <= to; v++) vals.push(v);
  return { kind: "finite", vals };
}

function intListText(info: IntInfo): string {
  switch (info.kind) {
    case "all":
      return "every integer";
    case "up":
      return `${pn(info.from)}, ${pn(info.from + 1)}, ${pn(info.from + 2)}, … (they go on for ever)`;
    case "down":
      return `…, ${pn(info.to - 2)}, ${pn(info.to - 1)}, ${pn(info.to)} (they go on for ever)`;
    case "finite":
      return info.vals.length ? info.vals.map(pn).join(", ") : "none";
  }
}

const sameInts = (s: Ineq, want: number[]) => {
  const info = intInfo(s);
  return info.kind === "finite" && info.vals.length === want.length && info.vals.every((v, i) => v === want[i]);
};
const exact = (s: Ineq, t: Ineq) =>
  s.lo === t.lo && s.hi === t.hi && (s.lo === "none" || s.a === t.a) && (s.hi === "none" || s.b === t.b);

interface Challenge {
  prompt: string;
  check: (s: Ineq) => boolean;
  answer: string;
}

const CHALLENGES: Challenge[] = [
  {
    prompt: "Show {{x >= -3}}.",
    check: (s) => exact(s, { lo: "closed", a: -3, hi: "none", b: 0 }),
    answer: "Closed circle at −3 (−3 is included) and an arrow to the right.",
  },
  {
    prompt: "Show {{-2 < x <= 4}}.",
    check: (s) => exact(s, { lo: "open", a: -2, hi: "closed", b: 4 }),
    answer: "Open circle at −2, closed circle at 4, shaded in between. The integers are −1, 0, 1, 2, 3, 4.",
  },
  {
    prompt: "Show the numbers that are **at most** 4.",
    check: (s) => exact(s, { lo: "none", a: 0, hi: "closed", b: 4 }),
    answer: "*At most 4* means 4 or less: {{x <= 4}}. Closed circle at 4, arrow to the left.",
  },
  {
    prompt: "Show exactly the integers −1, 0, 1 and 2, using one open circle and one closed circle.",
    check: (s) => s.lo !== "none" && s.hi !== "none" && s.lo !== s.hi && sameInts(s, [-1, 0, 1, 2]),
    answer: "Either {{-2 < x <= 2}} or {{-1 <= x < 3}}. Different inequalities, same integer solutions.",
  },
  {
    prompt: "Using two open circles, make an inequality with exactly 3 integer solutions, all of them negative.",
    check: (s) => {
      const info = intInfo(s);
      return s.lo === "open" && s.hi === "open" && info.kind === "finite" && info.vals.length === 3 && info.vals[2] < 0;
    },
    answer: "With two open circles the ends must be 4 apart, e.g. {{-4 < x < 0}} gives −3, −2, −1. {{-7 < x < -3}} works too.",
  },
  {
    prompt: "Solve {{2x + 1 > 7}}, then show the solution.",
    check: (s) => exact(s, { lo: "open", a: 3, hi: "none", b: 0 }),
    answer: "Subtract 1 from both sides: {{2x > 6}}. Divide by 2: {{x > 3}}. Open circle at 3, arrow right.",
  },
  {
    prompt: "Solve {{3x - 4 <= 11}}, then show the solution.",
    check: (s) => exact(s, { lo: "none", a: 0, hi: "closed", b: 5 }),
    answer: "Add 4 to both sides: {{3x <= 15}}. Divide by 3: {{x <= 5}}. Closed circle at 5, arrow left.",
  },
  {
    prompt: "Cinema tickets cost $4 each and Jun has $22. Show every possible number of tickets, x, he could buy (he might buy none).",
    check: (s) => sameInts(s, [0, 1, 2, 3, 4, 5]),
    answer: "{{4x <= 22}} gives {{x <= 5.5}}. Tickets come in whole numbers and can't be negative, so x = 0, 1, 2, 3, 4 or 5 — neatest as {{0 <= x <= 5}}.",
  },
  {
    prompt: "Stretch: solve {{5 - x > 2}}, then show the solution. Careful!",
    check: (s) => exact(s, { lo: "none", a: 0, hi: "open", b: 3 }),
    answer: "Add x to both sides: {{5 > 2 + x}}. Subtract 2: {{3 > x}}, which is {{x < 3}}. (Dividing {{-x > -3}} by −1 also works, but then the sign must flip.)",
  },
  {
    prompt: "Stretch: solve {{-2 <= 2x + 4 < 10}}, then show the solution.",
    check: (s) => exact(s, { lo: "closed", a: -3, hi: "open", b: 3 }),
    answer: "Subtract 4 from all three parts: {{-6 <= 2x < 6}}. Divide all three by 2: {{-3 <= x < 3}}.",
  },
];

function NumberLine({ s }: { s: Ineq }) {
  const empty = isEmpty(s);
  const point = s.lo === "closed" && s.hi === "closed" && s.a === s.b;
  const x1 = s.lo === "none" ? 10 : nlx(s.a);
  const x2 = s.hi === "none" ? 430 : nlx(s.b);
  const ticks: number[] = [];
  for (let v = NMIN; v <= NMAX; v++) ticks.push(v);
  const label = empty
    ? `Number line: no number satisfies ${ineqMarkup(s).replace(/-/g, "−")}.`
    : `Number line showing ${ineqWords(s)}.`;
  const circle = (v: number, kind: End, key: string) =>
    kind === "none" ? null : (
      <circle key={key} cx={nlx(v)} cy={NL_Y} r={7} className={kind === "closed" ? "fill-brand stroke-brand" : "fill-surface stroke-brand"} strokeWidth={3} />
    );
  return (
    <svg viewBox="0 0 440 76" className="h-auto w-full" role="img" aria-label={label}>
      <line x1={6} x2={434} y1={NL_Y} y2={NL_Y} className="stroke-ink-2" strokeWidth={1.5} />
      {ticks.map((v) => (
        <g key={v}>
          <line x1={nlx(v)} x2={nlx(v)} y1={NL_Y - 6} y2={NL_Y + 6} className="stroke-ink-2" strokeWidth={v === 0 ? 2 : 1} />
          <text
            x={nlx(v)}
            y={NL_Y + 24}
            textAnchor="middle"
            fontSize={12}
            fontWeight={satisfies(s, v) && !empty ? 800 : 400}
            className={satisfies(s, v) && !empty ? "fill-good" : "fill-ink-2"}
          >
            {pn(v)}
          </text>
        </g>
      ))}
      {!empty && !point ? (
        <g>
          <line x1={x1} x2={x2} y1={NL_Y} y2={NL_Y} className="stroke-brand" strokeWidth={6} />
          {s.lo === "none" ? <polygon points={`2,${NL_Y} 14,${NL_Y - 8} 14,${NL_Y + 8}`} className="fill-brand" /> : null}
          {s.hi === "none" ? <polygon points={`438,${NL_Y} 426,${NL_Y - 8} 426,${NL_Y + 8}`} className="fill-brand" /> : null}
        </g>
      ) : null}
      <g opacity={empty ? 0.45 : 1}>
        {circle(s.a, s.lo, "lo")}
        {point ? null : circle(s.b, s.hi, "hi")}
      </g>
    </svg>
  );
}

function EndControls({
  title,
  end,
  value,
  onEnd,
  onValue,
}: {
  title: string;
  end: End;
  value: number;
  onEnd: (e: End) => void;
  onValue: (v: number) => void;
}) {
  return (
    <div className="space-y-2 rounded-xl border border-line p-3">
      <div className="text-sm font-bold text-ink">{title}</div>
      <Segmented
        label={title}
        value={end}
        onChange={onEnd}
        options={[
          { value: "none", label: "no end" },
          { value: "open", label: "○ open" },
          { value: "closed", label: "● closed" },
        ]}
      />
      {end !== "none" ? <Stepper label="at" value={value} min={NMIN} max={NMAX} onChange={onValue} format={(v) => pn(v)} /> : null}
    </div>
  );
}

function InequalityLine() {
  const [s, setS] = useState<Ineq>({ lo: "open", a: -2, hi: "closed", b: 3 });
  const [ci, setCi] = useState(0);
  const [reveal, setReveal] = useState(false);

  const empty = isEmpty(s);
  const point = s.lo === "closed" && s.hi === "closed" && s.a === s.b;
  const info = intInfo(s);
  const ch = CHALLENGES[ci];
  const solvedCh = ch.check(s);
  const go = (d: number) => {
    setCi((ci + d + CHALLENGES.length) % CHALLENGES.length);
    setReveal(false);
  };

  const countText = empty
    ? "0"
    : info.kind === "finite"
      ? String(info.vals.length)
      : "infinitely many";

  let caption: ReactNode;
  if (s.lo === "none" && s.hi === "none") {
    caption = <>With no ends, x can be any number at all. Switch on a left end, a right end, or both.</>;
  } else if (empty) {
    caption = (
      <>
        <strong>No number fits.</strong> x would have to be {s.lo === "open" ? "bigger than" : "at least"} {pn(s.a)} and{" "}
        {s.hi === "open" ? "smaller than" : "at most"} {pn(s.b)} at the same time — impossible. The left end must be below the right end.
      </>
    );
  } else if (point) {
    caption = (
      <>
        Two closed circles on the same spot: <M>{ineqMarkup(s)}</M> means x is both ≥ {pn(s.a)} and ≤ {pn(s.b)}, so only{" "}
        <M>{`x = ${s.a}`}</M> fits.
      </>
    );
  } else {
    caption = (
      <>
        <M>{ineqMarkup(s)}</M> reads “{ineqWords(s)}”.{" "}
        {s.lo !== "none" ? (
          <>
            The {s.lo === "open" ? "open" : "closed"} circle at {pn(s.a)} means {pn(s.a)} {s.lo === "open" ? "is not" : "is"} included.{" "}
          </>
        ) : null}
        {s.hi !== "none" ? (
          <>
            The {s.hi === "open" ? "open" : "closed"} circle at {pn(s.b)} means {pn(s.b)} {s.hi === "open" ? "is not" : "is"} included.{" "}
          </>
        ) : null}
        {s.lo === "none" || s.hi === "none" ? <>The arrow shows the solutions carry on for ever. </> : null}
        Integer solutions (green): {intListText(info)}.{" "}
        {info.kind === "finite" && info.vals.length === 0 ? (
          <>
            No integers fit — but the region is not empty: <M>{`x = ${mn((s.a + s.b) / 2)}`}</M> works.
          </>
        ) : (
          <>Every number in the shaded part counts too, not just whole numbers.</>
        )}
      </>
    );
  }

  return (
    <WidgetFrame
      title="Inequality number line"
      tryThis={[
        "Find two different inequalities whose integer solutions are exactly 1, 2 and 3.",
        "Make an inequality that **no** number satisfies. Now one with exactly **one** solution.",
        "{{x > 2}} and {{x >= 3}} have the same integer solutions. Find a number that fits one but not the other.",
        "Can a two-sided inequality with integer ends have no integer solutions but still contain numbers? Find one.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <div className="text-center text-2xl font-extrabold text-ink" aria-live="polite">
          {s.lo === "none" && s.hi === "none" ? "any number" : <M>{ineqMarkup(s)}</M>}
        </div>
        <NumberLine s={s} />
        <div className="grid gap-3 sm:grid-cols-2">
          <EndControls title="Left end (smallest value)" end={s.lo} value={s.a} onEnd={(lo) => setS({ ...s, lo })} onValue={(a) => setS({ ...s, a })} />
          <EndControls title="Right end (largest value)" end={s.hi} value={s.b} onEnd={(hi) => setS({ ...s, hi })} onValue={(b) => setS({ ...s, b })} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Readout label="Integer solutions" value={countText} tone={empty ? "bad" : "good"} />
          <Readout
            label={info.kind === "down" ? "Largest integer" : "Smallest integer"}
            value={
              empty
                ? "—"
                : info.kind === "finite"
                  ? info.vals.length
                    ? pn(info.vals[0])
                    : "—"
                  : info.kind === "up"
                    ? pn(info.from)
                    : info.kind === "down"
                      ? pn(info.to)
                      : "none"
            }
            tone="ink"
          />
        </div>

        <div className={`rounded-xl border p-3 ${solvedCh ? "border-good bg-good-soft" : "border-line bg-surface-2"}`}>
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-bold uppercase tracking-wide text-ink-2">
              Challenge {ci + 1} of {CHALLENGES.length}
            </span>
            {solvedCh ? <span className="text-sm font-extrabold text-good">✓ That matches</span> : null}
          </div>
          <p className="mt-1 font-semibold text-ink">
            <RichInline text={ch.prompt} />
          </p>
          {solvedCh || reveal ? (
            <p className="mt-2 text-sm text-ink">
              <RichInline text={ch.answer} />
            </p>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => go(-1)}>
              ← Previous
            </button>
            {!solvedCh ? (
              <button type="button" className="btn btn-secondary" onClick={() => setReveal(!reveal)}>
                {reveal ? "Hide answer" : "Show answer"}
              </button>
            ) : null}
            <button type="button" className="btn btn-primary" onClick={() => go(1)}>
              Next challenge →
            </button>
          </div>
        </div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "balance-puzzle",
    title: "Balance puzzle",
    blurb: "Solve equations with tiles on a see-saw: do the same to both sides and it stays level — or test a value and watch it tip.",
    Component: BalancePuzzle,
  },
  {
    id: "inequality-number-line",
    title: "Inequality number line",
    blurb: "Build inequalities with open and closed circles, see which integers fit, then solve and show them.",
    Component: InequalityLine,
  },
];
