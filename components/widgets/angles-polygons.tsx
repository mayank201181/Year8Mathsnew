"use client";
// Interactive explorables for the "angles-polygons" topic.
//  1. Parallel lines explorer — a transversal crosses two lines. Tap angles to
//     name the pair (vertically opposite, straight line, corresponding,
//     alternate, co-interior, or a two-step chain), tilt one line off parallel
//     to watch the rules break, and a challenge mode (spot the pair / find the
//     angle with reasons).
//  2. Polygon angle lab — interior angle sum by triangles from one corner,
//     exterior angles that shrink into one full turn, symmetry of regular
//     polygons (lines + rotation) and which regular polygons tile.
import { useId, useState, type FormEvent, type ReactNode } from "react";
import { WidgetFrame, Slider, Stepper, Segmented, Readout, M, type WidgetDef } from "./kit";

/* ------------------------------------------------------------------------ */
/* Shared helpers                                                             */
/* ------------------------------------------------------------------------ */

interface Pt {
  x: number;
  y: number;
}

const rad = (d: number) => (d * Math.PI) / 180;
const norm360 = (d: number) => ((d % 360) + 360) % 360;
const r2 = (v: number) => Math.round(v * 100) / 100;

/** The point at distance r from p in "maths" direction deg (anticlockwise from east), in SVG coordinates. */
function polar(p: Pt, r: number, deg: number): Pt {
  return { x: p.x + r * Math.cos(rad(deg)), y: p.y - r * Math.sin(rad(deg)) };
}

/** SVG path of a filled sector at p, from direction `start` turning anticlockwise (on screen) through `span` degrees. */
function sector(p: Pt, r: number, start: number, span: number): string {
  const a = polar(p, r, start);
  const b = polar(p, r, start + span);
  const large = span > 180 ? 1 : 0;
  return `M ${r2(p.x)} ${r2(p.y)} L ${r2(a.x)} ${r2(a.y)} A ${r} ${r} 0 ${large} 0 ${r2(b.x)} ${r2(b.y)} Z`;
}

/** Direction (maths degrees, 0–360) of the journey from a to b, measured on screen. */
function dirDeg(a: Pt, b: Pt): number {
  return norm360((Math.atan2(-(b.y - a.y), b.x - a.x) * 180) / Math.PI);
}

const ptsAttr = (pts: Pt[]) => pts.map((p) => `${r2(p.x)},${r2(p.y)}`).join(" ");

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y) {
    const t = x % y;
    x = y;
    y = t;
  }
  return x || 1;
}

/** Round to dp places and drop trailing zeros. */
function fmt(v: number, dp = 1): string {
  let s = v.toFixed(dp);
  if (s.includes(".")) s = s.replace(/0+$/, "").replace(/\.$/, "");
  return s === "-0" ? "0" : s.replace("-", "−");
}

/** An exact angle num/den degrees: "72°", "22.5°" or a mixed number like 51 3/7° (plain text gives ≈51.4°). */
function degExact(num: number, den: number): { node: ReactNode; plain: string } {
  const g = gcd(num, den);
  const a = num / g;
  const b = den / g;
  if (b === 1) return { node: `${a}°`, plain: `${a}°` };
  const v = a / b;
  if (Math.abs(v * 100 - Math.round(v * 100)) < 1e-9) return { node: `${fmt(v, 2)}°`, plain: `${fmt(v, 2)}°` };
  return {
    node: (
      <>
        <M>{`${Math.floor(a / b)} ${a % b}/${b}`}</M>°
      </>
    ),
    plain: `≈${fmt(v, 1)}°`,
  };
}

/** Line through (x0, y0) with direction (dx, dy), clipped to a box. */
function clipLine(x0: number, y0: number, dx: number, dy: number, box: [number, number, number, number]) {
  const [xMin, xMax, yMin, yMax] = box;
  let t0 = -1e6;
  let t1 = 1e6;
  if (Math.abs(dx) > 1e-9) {
    const a = (xMin - x0) / dx;
    const b = (xMax - x0) / dx;
    t0 = Math.max(t0, Math.min(a, b));
    t1 = Math.min(t1, Math.max(a, b));
  }
  if (Math.abs(dy) > 1e-9) {
    const a = (yMin - y0) / dy;
    const b = (yMax - y0) / dy;
    t0 = Math.max(t0, Math.min(a, b));
    t1 = Math.min(t1, Math.max(a, b));
  }
  return { x1: r2(x0 + t0 * dx), y1: r2(y0 + t0 * dy), x2: r2(x0 + t1 * dx), y2: r2(y0 + t1 * dy) };
}

/** Text with a halo so it stays readable on top of lines. */
function Label({ p, children, size = 12, bold = false, className = "fill-ink" }: { p: Pt; children: ReactNode; size?: number; bold?: boolean; className?: string }) {
  return (
    <text
      x={r2(p.x)}
      y={r2(p.y)}
      fontSize={size}
      fontWeight={bold ? 800 : 600}
      textAnchor="middle"
      dominantBaseline="central"
      className={`${className} stroke-surface`}
      strokeWidth={3}
      paintOrder="stroke"
    >
      {children}
    </text>
  );
}

/* ------------------------------------------------------------------------ */
/* 1. Parallel lines explorer                                                 */
/* ------------------------------------------------------------------------ */

type Vert = "U" | "L";
type Side = "L" | "R";
interface Spot {
  letter: string;
  /** 0 = top crossing, 1 = bottom crossing. */
  at: 0 | 1;
  /** Above or below its line. */
  vert: Vert;
  /** Left or right of the transversal. */
  side: Side;
}

const SPOTS: Spot[] = [
  { letter: "a", at: 0, vert: "U", side: "L" },
  { letter: "b", at: 0, vert: "U", side: "R" },
  { letter: "c", at: 0, vert: "L", side: "L" },
  { letter: "d", at: 0, vert: "L", side: "R" },
  { letter: "e", at: 1, vert: "U", side: "L" },
  { letter: "f", at: 1, vert: "U", side: "R" },
  { letter: "g", at: 1, vert: "L", side: "L" },
  { letter: "h", at: 1, vert: "L", side: "R" },
];
const ALL = [0, 1, 2, 3, 4, 5, 6, 7];
const L = (i: number) => SPOTS[i].letter;

type Rel = "vertically opposite" | "on a straight line" | "corresponding" | "alternate" | "co-interior";
type SpotRel = Exclude<Rel, "on a straight line">;

const REASON: Record<Rel, string> = {
  "vertically opposite": "vertically opposite angles are equal",
  "on a straight line": "angles on a straight line add to 180°",
  corresponding: "corresponding angles are equal",
  alternate: "alternate angles are equal",
  "co-interior": "co-interior angles add to 180°",
};
const SHAPE: Record<Rel, string> = {
  "vertically opposite": "an X shape, directly across the same crossing",
  "on a straight line": "side by side, together making a straight line",
  corresponding: "an F shape, in the same position at the other crossing",
  alternate: "a Z shape, between the lines on opposite sides of the transversal",
  "co-interior": "a C (or U) shape, between the lines on the same side of the transversal",
};
const equalRel = (r: Rel) => r !== "on a straight line" && r !== "co-interior";
const needsParallel = (r: Rel) => r === "corresponding" || r === "alternate" || r === "co-interior";
const relPhrase = (r: Rel) => (r === "on a straight line" ? "angles on a straight line" : `${r} angles`);
const toWord = (r: SpotRel) => (r === "co-interior" ? "co-interior with" : `${r} to`);

/** The single angle fact linking two angles, if there is one. */
function relation(i: number, j: number): Rel | null {
  if (i === j) return null;
  const A = SPOTS[i];
  const B = SPOTS[j];
  if (A.at === B.at) return A.vert !== B.vert && A.side !== B.side ? "vertically opposite" : "on a straight line";
  const top = A.at === 0 ? A : B;
  const bot = A.at === 0 ? B : A;
  if (top.vert === bot.vert && top.side === bot.side) return "corresponding";
  if (top.vert === "L" && bot.vert === "U") return top.side === bot.side ? "co-interior" : "alternate";
  return null;
}

/** A middle angle k for a two-step chain i → k → j (prefers a first step at i's own crossing). */
function chainVia(i: number, j: number): number {
  let best = -1;
  for (const k of ALL) {
    if (k === i || k === j || !relation(i, k) || !relation(k, j)) continue;
    if (SPOTS[k].at === SPOTS[i].at) return k;
    if (best < 0) best = k;
  }
  return best;
}

/** Where angle i sits: start direction and size (degrees). Top line is horizontal; the bottom line is turned by `tilt`. */
function arcOf(i: number, theta: number, tilt: number): { start: number; span: number } {
  const s = SPOTS[i];
  const base = s.at === 0 ? 0 : tilt;
  if (s.vert === "U" && s.side === "R") return { start: base, span: theta - base };
  if (s.vert === "U") return { start: theta, span: 180 + base - theta };
  if (s.side === "L") return { start: 180 + base, span: theta - base };
  return { start: 180 + theta, span: 180 - theta + base };
}

type Challenge =
  | { kind: "spot"; rel: SpotRel; given: number; answer: number }
  | { kind: "find"; theta: number; given: number; target: number };

const FIRST_CHALLENGE: Challenge = { kind: "spot", rel: "alternate", given: 2, answer: 5 };
const rnd = (k: number) => Math.floor(Math.random() * k);

/** A fresh challenge (only ever called from event handlers). */
function makeChallenge(prev: Challenge): Challenge {
  for (let tries = 0; tries < 30; tries++) {
    if (Math.random() < 0.5) {
      const rels: SpotRel[] = ["corresponding", "alternate", "co-interior", "vertically opposite"];
      const rel = rels[rnd(rels.length)];
      const pool = rel === "alternate" || rel === "co-interior" ? [2, 3, 4, 5] : ALL;
      const given = pool[rnd(pool.length)];
      const answer = ALL.find((j) => relation(given, j) === rel) ?? 0;
      if (prev.kind === "spot" && prev.rel === rel && prev.given === given) continue;
      return { kind: "spot", rel, given, answer };
    }
    let theta = 40 + rnd(101);
    while (Math.abs(theta - 90) < 6) theta = 40 + rnd(101);
    const given = rnd(8);
    let target = rnd(7);
    if (target >= given) target++;
    return { kind: "find", theta, given, target };
  }
  return FIRST_CHALLENGE;
}

/** Reasons, in order, to get from the given angle to the target angle. */
function reasonSteps(given: number, target: number, theta: number): string[] {
  const val = (i: number) => arcOf(i, theta, 0).span;
  const step = (from: number, to: number) => {
    const r = relation(from, to) as Rel;
    return equalRel(r)
      ? `${L(to)} = ${L(from)} = ${val(to)}° (${REASON[r]})`
      : `${L(to)} = 180° − ${val(from)}° = ${val(to)}° (${REASON[r]})`;
  };
  if (relation(given, target)) return [step(given, target)];
  const k = chainVia(given, target);
  return [step(given, k), step(k, target)];
}

const BOX1: [number, number, number, number] = [8, 352, 8, 242];
const Y_TOP = 78;
const Y_BOT = 178;
const HALF = (Y_BOT - Y_TOP) / 2;

function ParallelLines() {
  const [theta, setTheta] = useState(62);
  const [tilt, setTilt] = useState(0);
  const [mode, setMode] = useState<"explore" | "challenge">("explore");
  const [sel, setSel] = useState<number[]>([]);
  const [showSizes, setShowSizes] = useState(true);
  const [ch, setCh] = useState<Challenge>(FIRST_CHALLENGE);
  const [solved, setSolved] = useState(false);
  const [feedback, setFeedback] = useState<{ good: boolean; text: ReactNode } | null>(null);
  const [wrong, setWrong] = useState<number | null>(null);
  const [guess, setGuess] = useState("");
  const [showWork, setShowWork] = useState(false);
  const [score, setScore] = useState({ right: 0, streak: 0, best: 0 });
  const inputId = useId();

  const inChallenge = mode === "challenge";
  const th = inChallenge && ch.kind === "find" ? ch.theta : theta;
  const tl = inChallenge ? 0 : tilt;
  const parallel = tl === 0;
  const arcs = ALL.map((i) => arcOf(i, th, tl));
  const size = (i: number) => arcs[i].span;

  // ---- geometry ----
  const cot = 1 / Math.tan(rad(th));
  const P: Pt = { x: 180 + HALF * cot, y: Y_TOP };
  const Q: Pt = { x: 180 - HALF * cot, y: Y_BOT };
  const top = clipLine(P.x, P.y, 1, 0, BOX1);
  const bot = clipLine(Q.x, Q.y, Math.cos(rad(tl)), -Math.sin(rad(tl)), BOX1);
  const tra = clipLine(Q.x, Q.y, Math.cos(rad(th)), -Math.sin(rad(th)), BOX1);
  const vertexOf = (i: number) => (SPOTS[i].at === 0 ? P : Q);
  const mid = (i: number) => arcs[i].start + arcs[i].span / 2;

  // ---- what is highlighted ----
  const solvedFind = inChallenge && ch.kind === "find" && solved;
  const fillOf = (i: number): { cls: string; op: number } => {
    if (!inChallenge) {
      if (sel[0] === i) return { cls: "fill-brand", op: 0.6 };
      if (sel[1] === i) return { cls: "fill-accent", op: 0.7 };
      if (sel.length === 1 && Math.abs(size(i) - size(sel[0])) < 1e-9) return { cls: "fill-brand", op: 0.22 };
      return { cls: "fill-surface-2", op: 0 };
    }
    if (ch.given === i) return { cls: "fill-accent", op: 0.7 };
    if (ch.kind === "spot" && solved && ch.answer === i) return { cls: "fill-good", op: 0.6 };
    if (ch.kind === "spot" && !solved && wrong === i) return { cls: "fill-bad", op: 0.45 };
    if (ch.kind === "find" && ch.target === i) return { cls: solved ? "fill-good" : "fill-brand", op: solved ? 0.6 : 0.35 };
    return { cls: "fill-surface-2", op: 0 };
  };
  const valueShown = (i: number): string | null => {
    if (!inChallenge) return showSizes ? `${size(i)}°` : null;
    if (ch.kind === "find") {
      if (i === ch.given) return `${size(i)}°`;
      if (i === ch.target) return solvedFind ? `${size(i)}°` : "?";
    }
    return null;
  };

  // ---- actions ----
  const tapExplore = (i: number) => {
    setSel((prev) => (prev.includes(i) ? prev.filter((k) => k !== i) : prev.length >= 2 ? [i] : [...prev, i]));
  };
  const nextChallenge = () => {
    // Randomness stays in the event handler (state updaters must be pure).
    setCh(makeChallenge(ch));
    setSolved(false);
    setFeedback(null);
    setWrong(null);
    setGuess("");
    setShowWork(false);
  };
  const award = (ok: boolean) =>
    setScore((s) => (ok ? { right: s.right + 1, streak: s.streak + 1, best: Math.max(s.best, s.streak + 1) } : { ...s, streak: 0 }));

  const tapChallenge = (i: number) => {
    if (ch.kind !== "spot" || solved) return;
    if (i === ch.given) {
      setFeedback({ good: false, text: <>That is {L(i)} itself. Tap the angle that is {toWord(ch.rel)} it.</> });
      return;
    }
    if (i === ch.answer) {
      setSolved(true);
      setWrong(null);
      award(true);
      setFeedback({
        good: true,
        text: (
          <>
            Yes! {L(ch.given)} and {L(i)} are {ch.rel} angles: {SHAPE[ch.rel]}. {needsParallel(ch.rel) ? "Because the lines are parallel, " : "So "}
            {equalRel(ch.rel) ? `${L(ch.given)} = ${L(i)}` : `${L(ch.given)} + ${L(i)} = 180°`}.
          </>
        ),
      });
      return;
    }
    const r = relation(ch.given, i);
    setWrong(i);
    award(false);
    setFeedback({
      good: false,
      text: (
        <>
          Not quite: {L(i)} and {L(ch.given)} {r ? <>are {relPhrase(r)}</> : <>aren&apos;t linked by a single rule</>}. Look for{" "}
          {SHAPE[ch.rel]}.
        </>
      ),
    });
  };
  const tap = (i: number) => (inChallenge ? tapChallenge(i) : tapExplore(i));

  const checkFind = (e: FormEvent) => {
    e.preventDefault();
    if (ch.kind !== "find" || solved) return;
    const raw = guess.replace(/°/g, "").replace("−", "-").trim();
    if (!raw) return;
    const v = Number(raw);
    const ans = size(ch.target);
    const g = size(ch.given);
    if (Number.isFinite(v) && Math.abs(v - ans) < 1e-9) {
      setSolved(true);
      award(true);
      setShowWork(true);
      setFeedback({ good: true, text: <>Correct: {L(ch.target)} = {ans}°. Check your reasons against the working below.</> });
      return;
    }
    award(false);
    setFeedback({
      good: false,
      text:
        Number.isFinite(v) && (Math.abs(v - g) < 1e-9 || Math.abs(v - (180 - g)) < 1e-9) ? (
          <>
            Right family, wrong one. Every angle here is either {g}° or {180 - g}°. Does {L(ch.target)} look the same as {L(ch.given)}, or
            is one acute and the other obtuse?
          </>
        ) : (
          <>
            Not {raw}°. Big clue: in this diagram every angle is either {g}° or 180° − {g}° = {180 - g}°. Which is {L(ch.target)}, and
            which fact proves it?
          </>
        ),
    });
  };

  const switchMode = (m: "explore" | "challenge") => {
    setMode(m);
    setFeedback(null);
    setWrong(null);
    setSolved(false);
    setGuess("");
    setShowWork(false);
  };

  // ---- relation panel (explore) ----
  let panel: ReactNode;
  if (!inChallenge) {
    if (sel.length === 0) {
      panel = <p>Tap an angle in the picture (or a button below) to see every angle equal to it. Then tap a second angle to name the pair.</p>;
    } else if (sel.length === 1) {
      const i = sel[0];
      const same = ALL.filter((k) => Math.abs(size(k) - size(i)) < 1e-9).map(L);
      panel = (
        <p>
          <strong className="text-ink">
            {L(i)} = {size(i)}°.
          </strong>{" "}
          Shaded: every angle equal to it ({same.join(", ")}).{" "}
          {same.length === 8
            ? "All eight are right angles."
            : parallel
              ? `The other ${8 - same.length} are 180° − ${size(i)}° = ${180 - size(i)}°.`
              : `At this crossing the others are 180° − ${size(i)}° = ${180 - size(i)}°, but the other crossing is no longer a copy, because the lines are not parallel.`}{" "}
          Now tap a second angle.
        </p>
      );
    } else {
      const [i, j] = sel;
      const r = relation(i, j);
      const vi = size(i);
      const vj = size(j);
      if (r) {
        panel = (
          <>
            <p>
              <strong className="text-ink">
                {L(i)} and {L(j)} are {relPhrase(r)}
              </strong>{" "}
              — {SHAPE[r]}.
            </p>
            {!needsParallel(r) || parallel ? (
              <p className="mt-1 font-bold text-good">
                {equalRel(r)
                  ? `${REASON[r][0].toUpperCase()}${REASON[r].slice(1)}: ${L(i)} = ${L(j)} = ${vi}°.`
                  : `${REASON[r][0].toUpperCase()}${REASON[r].slice(1)}: ${vi}° + ${vj}° = 180°.`}
              </p>
            ) : (
              <p className="mt-1">
                <span className="font-bold text-bad">But the lines are not parallel:</span> {L(i)} = {vi}° and {L(j)} = {vj}°, so they{" "}
                {equalRel(r) ? "are not equal" : `add to ${vi + vj}°, not 180°`}. This rule only works for parallel lines.
              </p>
            )}
          </>
        );
      } else {
        const k = chainVia(i, j);
        const r1 = relation(i, k) as Rel;
        const r2b = relation(k, j) as Rel;
        const eq = equalRel(r1) === equalRel(r2b);
        panel = (
          <>
            <p>
              <strong className="text-ink">
                No single fact links {L(i)} and {L(j)}
              </strong>{" "}
              — chain two facts through {L(k)}:
            </p>
            <ol className="mt-1 list-decimal space-y-0.5 pl-5">
              <li>
                {L(i)} and {L(k)}: {REASON[r1]}.
              </li>
              <li>
                {L(k)} and {L(j)}: {REASON[r2b]}.
              </li>
            </ol>
            {parallel ? (
              <p className="mt-1 font-bold text-good">
                So {eq ? `${L(i)} = ${L(j)} = ${vi}°` : `${L(i)} + ${L(j)} = ${vi}° + ${vj}° = 180°`}.
              </p>
            ) : (
              <p className="mt-1">
                <span className="font-bold text-bad">One step needs parallel lines</span>, so with this tilt the chain breaks: {L(i)} = {vi}°,{" "}
                {L(j)} = {vj}°.
              </p>
            )}
          </>
        );
      }
    }
  }

  // ---- challenge panel ----
  let chPanel: ReactNode = null;
  if (inChallenge) {
    const prompt =
      ch.kind === "spot" ? (
        <>
          Tap the angle that is <strong className="text-brand">{toWord(ch.rel)}</strong> {L(ch.given)}.
        </>
      ) : (
        <>
          {L(ch.given)} = {size(ch.given)}°. Find {L(ch.target)}, and decide which angle facts prove it.
        </>
      );
    chPanel = (
      <div className="space-y-3 rounded-xl border border-line p-3 text-sm text-ink-2">
        <p className="text-base font-bold text-ink">{prompt}</p>
        {ch.kind === "find" ? (
          <form onSubmit={checkFind} className="flex flex-wrap items-center gap-2">
            <label className="sr-only" htmlFor={inputId}>
              Size of angle {L(ch.target)} in degrees
            </label>
            <input
              id={inputId}
              className="input max-w-[9rem]"
              inputMode="numeric"
              autoComplete="off"
              placeholder={`${L(ch.target)} = ?°`}
              value={guess}
              onChange={(e) => setGuess(e.target.value)}
              disabled={solved}
            />
            <button type="submit" className="btn btn-primary" disabled={solved}>
              Check
            </button>
          </form>
        ) : null}
        {feedback ? (
          <p className={`rounded-lg p-2 ${feedback.good ? "bg-good-soft text-good" : "bg-bad-soft text-bad"} font-semibold`} role="status">
            {feedback.text}
          </p>
        ) : null}
        {ch.kind === "find" && showWork ? (
          <div className="rounded-lg bg-surface-2 p-2">
            <p className="font-bold text-ink">Working with reasons</p>
            <ol className="mt-1 list-decimal space-y-0.5 pl-5 tabular-nums">
              {reasonSteps(ch.given, ch.target, ch.theta).map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
          </div>
        ) : null}
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className={`btn ${solved ? "btn-primary" : "btn-secondary"} btn-sm`} onClick={nextChallenge}>
            {solved ? "Next question" : "New question"}
          </button>
          {ch.kind === "find" && !showWork ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShowWork(true)}>
              Show working
            </button>
          ) : null}
          <span className="ml-auto tabular-nums">
            Score {score.right} · streak {score.streak} · best {score.best}
          </span>
        </div>
      </div>
    );
  }

  // ---- live caption ----
  const small = Math.min(th, 180 - th);
  let caption: ReactNode;
  if (inChallenge) {
    caption = (
      <>
        Spot the shape: <strong>F</strong> for corresponding, <strong>Z</strong> for alternate, <strong>C</strong> for co-interior,{" "}
        <strong>X</strong> for vertically opposite. In “find the angle” questions, two parallel lines and a transversal only ever make two
        sizes, an acute one and its partner 180° minus it. Decide which one you need, then name the fact that proves it, one step at a time.
      </>
    );
  } else if (parallel) {
    caption =
      th === 90 ? (
        <>The transversal is perpendicular to both lines, so all eight angles are 90°. Move the transversal slider to make two sizes appear.</>
      ) : (
        <>
          The transversal meets both parallel lines at the same slant, so the bottom crossing is an exact copy of the top one. That is why
          eight angles come in only <strong>two sizes</strong>, {small}° and {180 - small}°, which add to 180° (angles on a straight line).
          Every pair is either equal or adds to 180°: corresponding, alternate and vertically opposite angles are equal; co-interior angles
          add to 180°.
        </>
      );
  } else {
    const side = tl > 0 ? "right" : "left";
    caption = (
      <>
        The lower line is turned {Math.abs(tl)}° away from parallel, so the bottom crossing is no longer a copy of the top one.
        Corresponding and alternate angles now differ by {Math.abs(tl)}°, and the co-interior pairs add to {180 - tl}° (d + f) and{" "}
        {180 + tl}° (c + e) instead of 180°. The two lines meet off to the <strong>{side}</strong>, the side where co-interior angles add to
        less than 180°, making a long thin triangle whose third angle is {Math.abs(tl)}°.
      </>
    );
  }

  const aria = `Two ${parallel ? "parallel lines" : `lines, ${Math.abs(tl)} degrees off parallel,`} crossed by a transversal at ${th} degrees. ${ALL.map(
    (i) => `${L(i)} ${size(i)} degrees`,
  ).join(", ")}.`;

  return (
    <WidgetFrame
      title="Parallel lines explorer"
      tryThis={[
        "Tap one angle. How many *different* sizes do the eight angles come in?",
        "Tap c and then f. What shape do they make, and what is the rule?",
        "Tilt the lower line until d + f = 170°. Which side do the two lines meet on?",
        "Switch to Challenge and get five right in a row.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<"explore" | "challenge">
          label="Mode"
          value={mode}
          onChange={switchMode}
          options={[
            { value: "explore", label: "Explore" },
            { value: "challenge", label: "Challenge" },
          ]}
        />

        <svg viewBox="0 0 360 250" className="h-auto w-full touch-manipulation select-none" role="img" aria-label={aria}>
          {/* angle sectors */}
          {ALL.map((i) => {
            const f = fillOf(i);
            return (
              <path
                key={`s${i}`}
                d={sector(vertexOf(i), 21, arcs[i].start, arcs[i].span)}
                className={`${f.cls} stroke-ink-2`}
                fillOpacity={f.op}
                strokeWidth={1}
              />
            );
          })}
          {/* the lines */}
          <line {...top} className="stroke-ink" strokeWidth={2.5} strokeLinecap="round" />
          <line {...bot} className="stroke-ink" strokeWidth={2.5} strokeLinecap="round" />
          <line {...tra} className="stroke-brand" strokeWidth={2.5} strokeLinecap="round" />
          {parallel ? (
            <g className="stroke-ink" strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d={`M 26 ${Y_TOP - 5} L 33 ${Y_TOP} L 26 ${Y_TOP + 5}`} />
              <path d={`M 26 ${Y_BOT - 5} L 33 ${Y_BOT} L 26 ${Y_BOT + 5}`} />
            </g>
          ) : null}
          <circle cx={r2(P.x)} cy={r2(P.y)} r={3} className="fill-ink" />
          <circle cx={r2(Q.x)} cy={r2(Q.y)} r={3} className="fill-ink" />
          {/* labels */}
          {ALL.map((i) => {
            const v = valueShown(i);
            return (
              <g key={`l${i}`}>
                <Label p={polar(vertexOf(i), 31, mid(i))} size={13} bold className={inChallenge && ch.given === i ? "fill-accent" : "fill-ink"}>
                  {L(i)}
                </Label>
                {v ? (
                  <Label p={polar(vertexOf(i), 48, mid(i))} size={11} className="fill-ink-2">
                    {v}
                  </Label>
                ) : null}
              </g>
            );
          })}
          {/* invisible, generous tap targets */}
          {ALL.map((i) => (
            <path
              key={`t${i}`}
              d={sector(vertexOf(i), 48, arcs[i].start, arcs[i].span)}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => tap(i)}
            />
          ))}
        </svg>

        <div className="grid grid-cols-4 gap-2" role="group" aria-label="Angles">
          {ALL.map((i) => {
            const pressed = inChallenge ? (ch.kind === "spot" && solved && ch.answer === i) || wrong === i : sel.includes(i);
            const v = valueShown(i);
            return (
              <button
                key={`b${i}`}
                type="button"
                onClick={() => tap(i)}
                aria-pressed={pressed}
                aria-label={`Angle ${L(i)}${v && v !== "?" ? `, ${v}` : ""} (${SPOTS[i].at === 0 ? "top" : "bottom"} crossing)`}
                className={`kbd h-10 min-w-10 gap-1 text-base ${pressed ? "ring-2 ring-brand" : ""}`}
              >
                <span className="font-extrabold">{L(i)}</span>
                {v ? <span className="text-xs font-semibold text-ink-2">{v}</span> : null}
              </button>
            );
          })}
        </div>

        {inChallenge ? (
          chPanel
        ) : (
          <>
            <div className="rounded-xl border border-line p-3 text-sm text-ink-2" aria-live="polite">
              {panel}
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <Slider label="Transversal angle" value={theta} min={35} max={145} onChange={setTheta} format={(v) => `${v}°`} />
              <Slider
                label="Tilt the lower line"
                value={tilt}
                min={-15}
                max={15}
                onChange={setTilt}
                format={(v) => (v === 0 ? "0° (parallel)" : `${v > 0 ? "+" : "−"}${Math.abs(v)}°`)}
              />
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className={`chip ${parallel ? "text-good" : "text-bad"}`}>{parallel ? "Lines parallel (arrows)" : "Lines NOT parallel"}</span>
              <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowSizes((s) => !s)} aria-pressed={showSizes}>
                {showSizes ? "Hide sizes" : "Show sizes"}
              </button>
              {!parallel ? (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setTilt(0)}>
                  Make parallel
                </button>
              ) : null}
              {sel.length ? (
                <button type="button" className="btn btn-ghost btn-sm" onClick={() => setSel([])}>
                  Clear
                </button>
              ) : null}
            </div>
          </>
        )}
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */
/* 2. Polygon angle lab                                                       */
/* ------------------------------------------------------------------------ */

type View = "interior" | "exterior" | "symmetry" | "tiling";
type ShapeKind = "regular" | "irregular";

const NAMES: Record<number, string> = {
  3: "triangle",
  4: "quadrilateral",
  5: "pentagon",
  6: "hexagon",
  7: "heptagon",
  8: "octagon",
  9: "nonagon",
  10: "decagon",
  11: "hendecagon",
  12: "dodecagon",
  15: "pentadecagon",
  20: "icosagon",
};
function polyName(n: number, regular: boolean): string {
  if (regular && n === 3) return "equilateral triangle";
  if (regular && n === 4) return "square";
  const base = NAMES[n] ?? `${n}-gon`;
  return regular ? `regular ${base}` : base;
}
function plural(n: number, regular: boolean): string {
  const s = polyName(n, regular);
  return s.endsWith("x") ? `${s}es` : `${s}s`;
}
/** "A" or "An" before a polygon name ("An equilateral triangle", "A regular 13-gon"; "n-gon" only ever follows "regular"). */
const An = (s: string) => (/^[aeiou]/i.test(s) ? `An ${s}` : `A ${s}`);

/** Deterministic pseudo-random numbers (so render never calls Math.random). */
function mulberry32(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const CX = 180;
const CY = 130;

/** Shift points so their bounding box is centred on (CX, CY). Returns the shift too. */
function centreBox(pts: Pt[]): { pts: Pt[]; dx: number; dy: number } {
  const xs = pts.map((p) => p.x);
  const ys = pts.map((p) => p.y);
  const dx = CX - (Math.min(...xs) + Math.max(...xs)) / 2;
  const dy = CY - (Math.min(...ys) + Math.max(...ys)) / 2;
  return { pts: pts.map((p) => ({ x: p.x + dx, y: p.y + dy })), dx, dy };
}

/** First-vertex direction so a regular n-gon sits on a flat bottom edge. */
const startAngle = (n: number) => -90 - 180 / n;
const REG_R = 96;

/** Regular n-gon, vertices anticlockwise on screen; also returns its centre and the vertex directions. */
function regularPolygon(n: number, rot = 0): { pts: Pt[]; centre: Pt } {
  const raw: Pt[] = [];
  for (let k = 0; k < n; k++) raw.push(polar({ x: 0, y: 0 }, REG_R, startAngle(n) + (360 * k) / n));
  const { dx, dy } = centreBox(raw);
  const centre = { x: dx, y: dy };
  const pts: Pt[] = [];
  for (let k = 0; k < n; k++) pts.push(polar(centre, REG_R, startAngle(n) + rot + (360 * k) / n));
  return { pts, centre };
}

/** A convex but irregular n-gon: vertices at uneven steps round an ellipse. */
function irregularPolygon(n: number, seed: number): { pts: Pt[]; centre: Pt } {
  const rand = mulberry32(seed * 7919 + n * 104729);
  const gaps: number[] = [];
  for (let k = 0; k < n; k++) gaps.push(1 + rand() * 1.4);
  const total = gaps.reduce((s, g) => s + g, 0);
  let t = rand() * 360;
  const raw: Pt[] = [];
  for (let k = 0; k < n; k++) {
    raw.push({ x: 125 * Math.cos(rad(t)), y: -92 * Math.sin(rad(t)) });
    t += (360 * gaps[k]) / total;
  }
  const { pts } = centreBox(raw);
  const centre = { x: pts.reduce((s, p) => s + p.x, 0) / n, y: pts.reduce((s, p) => s + p.y, 0) / n };
  return { pts, centre };
}

const TRI_FILLS = ["fill-brand-soft", "fill-accent-soft", "fill-good-soft", "fill-info-soft"];
const WEDGE_FILLS = ["fill-brand", "fill-accent", "fill-good", "fill-s-stats", "fill-info", "fill-s-ratio"];
const TILE_FILLS = ["fill-brand-soft", "fill-accent-soft", "fill-good-soft", "fill-info-soft", "fill-bad-soft", "fill-warn-soft"];

function PolygonLab() {
  const [n, setN] = useState(5);
  const [shape, setShape] = useState<ShapeKind>("regular");
  const [seed, setSeed] = useState(1);
  const [view, setView] = useState<View>("interior");
  const [sizePct, setSizePct] = useState(100);
  const [rot, setRot] = useState(0);
  const [showLines, setShowLines] = useState(true);

  const regularOnly = view === "symmetry" || view === "tiling";
  const kind: ShapeKind = regularOnly ? "regular" : shape;
  const regular = kind === "regular";
  const maxN = regular ? 20 : 10;
  const N = Math.min(n, maxN);
  const name = polyName(N, regular);

  const poly = regular ? regularPolygon(N) : irregularPolygon(N, seed);
  const pts = poly.pts;
  const dirs = pts.map((p, i) => dirDeg(p, pts[(i + 1) % N]));
  const ext = pts.map((_, i) => norm360(dirs[i] - dirs[(i - 1 + N) % N]));
  const intA = ext.map((e) => 180 - e);
  const measuredInt = intA.reduce((s, a) => s + a, 0);
  const measuredExt = ext.reduce((s, a) => s + a, 0);
  let minSide = Infinity;
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % N];
    minSide = Math.min(minSide, Math.hypot(q.x - p.x, q.y - p.y));
  });

  // exact values for a regular polygon
  const sum = (N - 2) * 180;
  const extEach = degExact(360, N);
  const intEach = degExact(180 * N - 360, N);

  const changeShape = (s: ShapeKind) => {
    setShape(s);
    if (s === "irregular") setN((v) => Math.min(v, 10));
  };

  let picture: ReactNode;
  let readouts: ReactNode;
  let caption: ReactNode;
  let aria: string;
  let controls: ReactNode = null;

  if (view === "interior") {
    const labelsShown = N <= 12;
    const labelsRounded = labelsShown && intA.some((a) => Math.abs(a - Math.round(a)) > 1e-6);
    const rA = Math.max(8, Math.min(18, minSide * 0.28));
    const rL = rA + 13;
    picture = (
      <>
        {pts.slice(1, N - 1).map((p, k) => (
          <polygon key={`tri${k}`} points={ptsAttr([pts[0], p, pts[k + 2]])} className={`${TRI_FILLS[k % TRI_FILLS.length]} stroke-none`} />
        ))}
        {pts.slice(2, N - 1).map((p, k) => (
          <line key={`dg${k}`} x1={r2(pts[0].x)} y1={r2(pts[0].y)} x2={r2(p.x)} y2={r2(p.y)} className="stroke-ink-2" strokeWidth={1.5} strokeDasharray="5 4" />
        ))}
        {pts.map((p, i) => (
          <path key={`ia${i}`} d={sector(p, rA, dirs[i], intA[i])} className="fill-brand" fillOpacity={0.35} />
        ))}
        <polygon points={ptsAttr(pts)} fill="none" className="stroke-ink" strokeWidth={2} strokeLinejoin="round" />
        <circle cx={r2(pts[0].x)} cy={r2(pts[0].y)} r={4.5} className="fill-brand" />
        {labelsShown
          ? pts.map((p, i) => (
              <Label key={`il${i}`} p={polar(p, rL, dirs[i] + intA[i] / 2)} size={N > 8 ? 9 : 11}>
                {`${Math.round(intA[i])}°`}
              </Label>
            ))
          : null}
      </>
    );
    readouts = (
      <>
        <Readout label="Triangles" value={`${N - 2}`} tone="ink" />
        <Readout label="Interior sum" value={`${sum}°`} />
        <Readout label={regular ? "Each interior angle" : "Measured total"} value={regular ? intEach.node : `${fmt(measuredInt, 1)}°`} tone="good" />
      </>
    );
    caption = (
      <>
        {N === 3 ? (
          <>
            A triangle is already one triangle, with no diagonals to draw, so its interior angles add to (3 − 2) × 180° ={" "}
            <strong>180°</strong>. Add a side and watch a new triangle appear.
          </>
        ) : (
          <>
            From one corner (the dot) you can draw a diagonal to every corner except itself and its two neighbours: {N - 3} diagonal
            {N - 3 === 1 ? "" : "s"}, cutting the {name} into <strong>{N - 2} triangles</strong>. The triangles&apos; angles exactly fill the{" "}
            {N} corners, so the interior angles add to ({N} − 2) × 180° = <strong>{sum}°</strong>.
          </>
        )}{" "}
        {regular ? (
          <>
            All {N} angles are equal, so each one is {sum}° ÷ {N} = <strong>{intEach.node}</strong>
            {intEach.plain.startsWith("≈") ? <> ({intEach.plain})</> : null}.
            {labelsRounded ? <> (The labels on the picture are rounded to the nearest degree.)</> : null}
          </>
        ) : (
          <>
            Press <em>New shape</em>: every angle changes, but the total stays {sum}° because there are still {N - 2} triangle
            {N - 2 === 1 ? "" : "s"}. (Labels are rounded to the nearest degree, so they may not add up exactly; the measured total is{" "}
            {fmt(measuredInt, 1)}°.)
          </>
        )}
      </>
    );
    aria = `${An(name)} split into ${N - 2} triangle${N - 2 === 1 ? "" : "s"} from one corner. Interior angles: ${intA.map((a) => `${Math.round(a)}`).join(", ")} degrees, adding to ${sum} degrees.`;
  } else if (view === "exterior") {
    const s = sizePct / 100;
    const G = poly.centre;
    const sp = pts.map((p) => ({ x: G.x + s * (p.x - G.x), y: G.y + s * (p.y - G.y) }));
    const rW = N > 12 ? 18 : 24;
    const showLab = N <= 10;
    picture = (
      <>
        {s > 0.02 ? <polygon points={ptsAttr(sp)} className="fill-surface-2 stroke-ink" strokeWidth={2} strokeLinejoin="round" /> : null}
        {s < 0.05 ? <circle cx={r2(G.x)} cy={r2(G.y)} r={rW + 3} fill="none" className="stroke-ink" strokeWidth={1.5} strokeDasharray="4 3" /> : null}
        {sp.map((p, i) => {
          const din = dirs[(i - 1 + N) % N];
          const e = polar(p, rW + 12, din);
          return (
            <g key={`ex${i}`}>
              <path d={sector(p, rW, din, ext[i])} className={`${WEDGE_FILLS[i % WEDGE_FILLS.length]} stroke-surface`} fillOpacity={0.8} strokeWidth={1} />
              {s > 0.02 ? <line x1={r2(p.x)} y1={r2(p.y)} x2={r2(e.x)} y2={r2(e.y)} className="stroke-ink-2" strokeWidth={1.5} strokeDasharray="4 3" /> : null}
            </g>
          );
        })}
        {s > 0.3
          ? sp.map((p, i) => {
              const q = sp[(i + 1) % N];
              const m = { x: (p.x + q.x) / 2, y: (p.y + q.y) / 2 };
              const tip = polar(m, 5, dirs[i]);
              const b1 = polar(m, 5, dirs[i] + 140);
              const b2 = polar(m, 5, dirs[i] - 140);
              return <path key={`ar${i}`} d={`M ${r2(tip.x)} ${r2(tip.y)} L ${r2(b1.x)} ${r2(b1.y)} L ${r2(b2.x)} ${r2(b2.y)} Z`} className="fill-ink" />;
            })
          : null}
        {showLab
          ? sp.map((p, i) =>
              ext[i] >= 14 ? (
                <Label key={`el${i}`} p={polar(p, rW + 11, dirs[(i - 1 + N) % N] + ext[i] / 2)} size={10}>
                  {`${Math.round(ext[i])}°`}
                </Label>
              ) : null,
            )
          : null}
      </>
    );
    readouts = (
      <>
        <Readout label={regular ? "Each exterior angle" : "Exterior angles"} value={regular ? extEach.node : "not equal"} tone="ink" />
        <Readout label="Sum of exterior angles" value={regular ? "360°" : `${fmt(measuredExt, 1)}°`} />
        <Readout label="Interior + exterior" value="180°" tone="good" />
      </>
    );
    caption = (
      <>
        Walk round the edge in the direction of the arrows. At each corner you turn through the <strong>exterior angle</strong>: the coloured
        wedge between the dashed extension of one side and the next side. After the last corner you face the way you started, so you have
        made exactly one full turn: the exterior angles of <em>any</em> polygon add to <strong>360°</strong>.{" "}
        {s < 0.05 ? (
          <>Shrunk to a point, the {N} wedges fit together around it with no gaps and no overlaps: a full circle, 360°.</>
        ) : (
          <>Slide the size down to 0% and watch the wedges join up into a full circle.</>
        )}{" "}
        {regular ? (
          <>
            Here each exterior angle is 360° ÷ {N} = {extEach.node}, so each interior angle is 180° − {extEach.node} = {intEach.node}.
          </>
        ) : (
          <>The exterior angles of an irregular polygon are not all equal, but they still total 360°.</>
        )}
      </>
    );
    aria = `${An(name)} at ${sizePct}% size with its ${N} exterior angles shaded: ${ext.map((a) => `${Math.round(a)}`).join(", ")} degrees, adding to 360 degrees.`;
    controls = <Slider label="Shape size" value={sizePct} min={0} max={100} onChange={setSizePct} format={(v) => `${v}%`} />;
  } else if (view === "symmetry") {
    const rp = regularPolygon(N, rot);
    const ghost = regularPolygon(N);
    const O = rp.centre;
    const step = 360 / N;
    const nearest = Math.round(rot / step);
    // The slider moves in whole degrees, so a "fit" is the one slider value closest to an exact
    // multiple of 360° ÷ N (e.g. 51° for 360° ÷ 7 = 51.43°, 23° for 22.5°).
    const fitAt = (j: number) => Math.round(j * step);
    const fits = fitAt(nearest) === rot;
    const pos = ((nearest % N) + N) % N;
    const axes: ReactNode[] = [];
    if (showLines) {
      for (let k = 0; k < N; k++) {
        const a = startAngle(N) + rot + (180 * k) / N;
        const p1 = polar(O, REG_R + 14, a);
        const p2 = polar(O, REG_R + 14, a + 180);
        axes.push(<line key={`ax${k}`} x1={r2(p1.x)} y1={r2(p1.y)} x2={r2(p2.x)} y2={r2(p2.y)} className="stroke-brand" strokeWidth={1.5} strokeDasharray="6 4" />);
      }
    }
    picture = (
      <>
        <polygon points={ptsAttr(ghost.pts)} fill="none" className="stroke-ink-2" strokeWidth={1.5} strokeDasharray="3 3" />
        <polygon points={ptsAttr(rp.pts)} className={`${fits ? "fill-good-soft" : "fill-brand-soft"} stroke-ink`} fillOpacity={0.85} strokeWidth={2} strokeLinejoin="round" />
        {axes}
        <circle cx={r2(ghost.pts[0].x)} cy={r2(ghost.pts[0].y)} r={6} fill="none" className="stroke-ink-2" strokeWidth={1.5} />
        <circle cx={r2(rp.pts[0].x)} cy={r2(rp.pts[0].y)} r={6} className="fill-accent stroke-ink" strokeWidth={1} />
        <circle cx={r2(O.x)} cy={r2(O.y)} r={3} className="fill-ink" />
      </>
    );
    const nextFit = () => {
      if (rot >= 360) {
        setRot(fitAt(1));
        return;
      }
      // the first fit strictly after the current turn (fitAt(N) = 360, so this always stops)
      let j = Math.max(0, Math.floor(rot / step));
      while (fitAt(j) <= rot) j++;
      setRot(Math.min(360, fitAt(j)));
    };
    controls = (
      <div className="space-y-3">
        <Slider label="Turn the shape" value={rot} min={0} max={360} onChange={setRot} format={(v) => `${v}°`} />
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={nextFit}>
            Jump to the next fit ↺
          </button>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShowLines((v) => !v)} aria-pressed={showLines}>
            {showLines ? "Hide lines of symmetry" : "Show lines of symmetry"}
          </button>
        </div>
      </div>
    );
    readouts = (
      <>
        <Readout label="Lines of symmetry" value={`${N}`} tone="ink" />
        <Readout label="Rotational order" value={`${N}`} tone="ink" />
        <Readout label="Smallest turn" value={extEach.node} />
      </>
    );
    caption = (
      <>
        {An(name)} has <strong>{N} sides, {N} lines of symmetry and rotational symmetry of order {N}</strong>.{" "}
        {N % 2 === 1
          ? `With an odd number of sides, every line of symmetry runs from a corner to the middle of the opposite side.`
          : `With an even number of sides, half the lines join opposite corners and half join the middles of opposite sides.`}{" "}
        The smallest turn that lands it on its own outline is 360° ÷ {N} = {extEach.node}, the same as its exterior angle.{" "}
        {fits ? (
          rot === 0 || rot === 360 ? (
            <>{rot === 0 ? "Turn the shape and watch the orange dot." : "A full turn: back to the start, which counts as position 1 of " + N + "."}</>
          ) : (
            <>
              <strong>It fits!</strong> After turning {rot}°
              {Math.abs(nearest * step - rot) > 1e-9 ? (
                <>
                  {" "}
                  (the exact turn is {nearest} × 360° ÷ {N} = {degExact(360 * nearest, N).node}; the slider rounds to whole degrees)
                </>
              ) : null}{" "}
              it matches its outline, but the orange dot shows it really has moved: position {pos + 1} of {N}.
            </>
          )
        ) : (
          <>Turned {rot}°, it doesn&apos;t match the dashed outline yet.</>
        )}
      </>
    );
    aria = `${An(name)} turned ${rot} degrees about its centre, ${fits ? "fitting" : "not fitting"} its dashed outline, with ${showLines ? `${N} lines of symmetry drawn` : "lines of symmetry hidden"}.`;
  } else {
    // tiling: copies of the regular polygon around one shared corner
    const I = 180 - 360 / N;
    const k = Math.floor(360 / I + 1e-9);
    const gapNum = 360 * N - k * (180 * N - 360);
    const tiles = gapNum === 0;
    const gap = degExact(gapNum, N);
    const overlap = degExact((k + 1) * (180 * N - 360) - 360 * N, N);
    const used = degExact(k * (180 * N - 360), N);
    const E = 360 / N;
    const side = 2 * 56 * Math.sin(rad(180 / N));
    const P: Pt = { x: CX, y: 152 };
    const gapDeg = 360 - k * I;
    const phi0 = 90 - k * I - gapDeg / 2;
    const copy = (j: number): Pt[] => {
      const out: Pt[] = [P];
      let cur = P;
      for (let m = 0; m < N - 1; m++) {
        cur = polar(cur, side, phi0 + j * I + m * E);
        out.push(cur);
      }
      return out;
    };
    picture = (
      <>
        {Array.from({ length: k }, (_, j) => (
          <polygon key={`cp${j}`} points={ptsAttr(copy(j))} className={`${TILE_FILLS[j % TILE_FILLS.length]} stroke-ink`} strokeWidth={1.75} strokeLinejoin="round" />
        ))}
        {!tiles ? (
          <>
            <polygon points={ptsAttr(copy(k))} fill="none" className="stroke-bad" strokeWidth={1.75} strokeDasharray="5 4" strokeLinejoin="round" />
            <path d={sector(P, 34, phi0 + k * I, gapDeg)} className="fill-bad stroke-bad" fillOpacity={0.35} strokeWidth={1.5} />
            <text x={10} y={16} fontSize={12} fontWeight={800} className="fill-bad">
              {`Gap at the corner: ${gap.plain.replace("≈", "≈ ")}`}
            </text>
            <text x={10} y={31} fontSize={10} className="fill-ink-2">
              Dashed: one more copy would overlap
            </text>
          </>
        ) : (
          <text x={10} y={16} fontSize={12} fontWeight={800} className="fill-good">
            No gap, no overlap: it tiles!
          </text>
        )}
        <circle cx={P.x} cy={P.y} r={3.5} className="fill-ink" />
      </>
    );
    readouts = (
      <>
        <Readout label="Interior angle" value={intEach.node} tone="ink" />
        <Readout label="Copies that fit" value={`${k}`} />
        <Readout label="Gap left" value={tiles ? "0° — tiles!" : gap.node} tone={tiles ? "good" : "bad"} />
      </>
    );
    caption = (
      <>
        {tiles ? (
          <>
            Each interior angle is {intEach.node} and {k} × {intEach.node} = 360°, so {k} {plural(N, true)} close up around the point with no
            gap: <strong>they tessellate</strong>.
          </>
        ) : (
          <>
            Each interior angle is {intEach.node}. {k} copies use {used.node}, leaving a gap of {gap.node}; one more would overlap by{" "}
            {overlap.node}. So {plural(N, true)} <strong>can&apos;t tile on their own</strong>.
          </>
        )}{" "}
        To tile, the interior angle must divide exactly into 360°. Interior angles of regular polygons are at least 60° and less than 180°, so
        the only candidates are 60°, 72°, 90° and 120° — and 72° is impossible, because its exterior angle would be 108°, which doesn&apos;t
        divide 360°. That leaves just three: triangles, squares and hexagons.
      </>
    );
    aria = `${k} ${plural(N, true)} meeting at one corner. ${tiles ? "They fit exactly around the point." : `They leave a gap of ${gap.plain.replace("≈", "about ").replace("°", " degrees")}.`}`;
  }

  return (
    <WidgetFrame
      title="Polygon angle lab"
      tryThis={[
        "Predict the interior angle sum of a 9-sided polygon, then set n = 9 to check.",
        "Each exterior angle of a regular polygon is 24°. How many sides does it have? Check in the Exterior view.",
        "Make an irregular shape and shrink it to 0% in the Exterior view. Why do the wedges still make a full circle?",
        "In the Tiling view, find every regular polygon that tiles on its own. Why are there no more?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<View>
          label="View"
          value={view}
          onChange={setView}
          options={[
            { value: "interior", label: "Interior" },
            { value: "exterior", label: "Exterior" },
            { value: "symmetry", label: "Symmetry" },
            { value: "tiling", label: "Tiling" },
          ]}
        />

        <svg viewBox={view === "tiling" ? "0 0 360 280" : "0 0 360 260"} className="h-auto w-full" role="img" aria-label={aria}>
          {picture}
        </svg>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Stepper label="Number of sides, n" value={N} min={3} max={maxN} onChange={setN} />
          {!regularOnly ? (
            <div className="flex flex-wrap items-center gap-2">
              <Segmented<ShapeKind>
                label="Shape"
                value={shape}
                onChange={changeShape}
                options={[
                  { value: "regular", label: "Regular" },
                  { value: "irregular", label: "Irregular" },
                ]}
              />
              {shape === "irregular" ? (
                <button type="button" className="btn btn-secondary btn-sm" onClick={() => setSeed((v) => v + 1)}>
                  New shape
                </button>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-ink-2">This view uses regular polygons: all sides and all angles equal.</p>
          )}
        </div>

        {controls}

        <div className="grid grid-cols-3 gap-2">{readouts}</div>
      </div>
    </WidgetFrame>
  );
}

/* ------------------------------------------------------------------------ */

export const widgets: WidgetDef[] = [
  {
    id: "parallel-lines-explorer",
    title: "Parallel lines explorer",
    blurb: "Tap angles to name the pair, tilt a line off parallel to watch the rules break, then test yourself.",
    Component: ParallelLines,
  },
  {
    id: "polygon-angle-lab",
    title: "Polygon angle lab",
    blurb: "Split polygons into triangles, shrink exterior angles into a full turn, spin for symmetry and test which shapes tile.",
    Component: PolygonLab,
  },
];
