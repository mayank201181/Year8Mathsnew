"use client";
// Explorables for "Factors, Multiples & Primes":
//   1. Factor tree builder — split any number your own way; the primes always match
//      (uniqueness), then read squares, cubes, roots and factor counts off the index form.
//   2. HCF & LCM lab — one pair of numbers, three pictures: a prime-factor Venn diagram,
//      two bus timetables (LCM) and square tiles on a floor (HCF).
import { useMemo, useState } from "react";
import { WidgetFrame, Slider, Segmented, Readout, M, type WidgetDef } from "./kit";

// ---------------------------------------------------------------------------
// Number helpers (exact integer arithmetic only)
// ---------------------------------------------------------------------------

/** Prime factorisation as [prime, power] pairs, primes in increasing order. */
type PF = [number, number][];

function factorise(n: number): PF {
  const out: PF = [];
  let x = n;
  for (let p = 2; p * p <= x; p++) {
    if (x % p === 0) {
      let e = 0;
      while (x % p === 0) {
        x /= p;
        e++;
      }
      out.push([p, e]);
    }
  }
  if (x > 1) out.push([x, 1]);
  return out;
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

function smallestPrimeFactor(n: number): number {
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return d;
  return n;
}

function gcd(a: number, b: number): number {
  let x = a;
  let y = b;
  while (y) [x, y] = [y, x % y];
  return x;
}

/** Number of prime factors counted with repeats (so 12 = 2 × 2 × 3 gives 3). */
function bigOmega(n: number): number {
  return factorise(n).reduce((s, [, e]) => s + e, 0);
}

/** Maths markup for index form, e.g. "2^3 * 3^2 * 5" (rendered with <M>). */
function indexMath(pf: PF): string {
  return pf.map(([p, e]) => (e > 1 ? `${p}^${e}` : `${p}`)).join(" * ");
}

const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function sup(e: number): string {
  return String(e)
    .split("")
    .map((d) => SUP[Number(d)])
    .join("");
}

/** Plain-text index form for SVG labels and aria-labels, e.g. "2³ × 3² × 5". */
function indexPlain(pf: PF): string {
  return pf.map(([p, e]) => (e > 1 ? `${p}${sup(e)}` : `${p}`)).join(" × ");
}

const product = (xs: number[]) => xs.reduce((s, x) => s * x, 1);

/** "2", "2 and 3", "2, 3 and 5". */
function listAnd(xs: (number | string)[]): string {
  return xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`;
}

// ===========================================================================
// 1. Factor tree builder
// ===========================================================================

interface TNode {
  v: number;
  kids?: [TNode, TNode];
}

interface Leaf {
  v: number;
  path: string;
}

function leavesOf(node: TNode, path = "", out: Leaf[] = []): Leaf[] {
  if (!node.kids) out.push({ v: node.v, path });
  else {
    leavesOf(node.kids[0], path + "0", out);
    leavesOf(node.kids[1], path + "1", out);
  }
  return out;
}

function splitAt(node: TNode, path: string, a: number, b: number): TNode {
  if (path === "") return node.kids ? node : { v: node.v, kids: [{ v: a }, { v: b }] };
  if (!node.kids) return node;
  const i = path[0] === "0" ? 0 : 1;
  const kids: [TNode, TNode] = [node.kids[0], node.kids[1]];
  kids[i] = splitAt(kids[i], path.slice(1), a, b);
  return { v: node.v, kids };
}

/** Complete the tree the "ladder" way: always split off the smallest prime. */
function ladderFinish(node: TNode): TNode {
  if (node.kids) return { v: node.v, kids: [ladderFinish(node.kids[0]), ladderFinish(node.kids[1])] };
  if (node.v < 2 || isPrime(node.v)) return node;
  const p = smallestPrimeFactor(node.v);
  return { v: node.v, kids: [{ v: p }, ladderFinish({ v: node.v / p })] };
}

/** A string that identifies the exact shape of a tree (to count different trees). */
function signature(node: TNode): string {
  return node.kids ? `${node.v}(${signature(node.kids[0])},${signature(node.kids[1])})` : String(node.v);
}

function factorPairs(v: number): [number, number][] {
  const out: [number, number][] = [];
  for (let d = 2; d * d <= v; d++) if (v % d === 0) out.push([d, v / d]);
  return out;
}

interface Placed {
  v: number;
  path: string;
  x: number;
  y: number;
  leaf: boolean;
  parent?: { x: number; y: number };
}

const TREE_W = 360;
const TREE_TOP = 30;
const TREE_ROW = 58;
const NODE_R = 19;

function layoutTree(root: TNode): { nodes: Placed[]; height: number } {
  const nLeaves = leavesOf(root).length;
  const slot = TREE_W / nLeaves;
  const nodes: Placed[] = [];
  let leafIdx = 0;
  let maxDepth = 0;
  const walk = (n: TNode, path: string, depth: number): Placed => {
    const y = TREE_TOP + depth * TREE_ROW;
    maxDepth = Math.max(maxDepth, depth);
    if (!n.kids) {
      const me: Placed = { v: n.v, path, x: slot * (leafIdx + 0.5), y, leaf: true };
      leafIdx++;
      nodes.push(me);
      return me;
    }
    const a = walk(n.kids[0], path + "0", depth + 1);
    const b = walk(n.kids[1], path + "1", depth + 1);
    const me: Placed = { v: n.v, path, x: (a.x + b.x) / 2, y, leaf: false };
    a.parent = { x: me.x, y: me.y };
    b.parent = { x: me.x, y: me.y };
    nodes.push(me);
    return me;
  };
  walk(root, "", 0);
  return { nodes, height: TREE_TOP + maxDepth * TREE_ROW + NODE_R + 14 };
}

interface TreeState {
  n: number;
  root: TNode;
  history: TNode[];
  sel: string | null;
  /** Signatures of the different finished trees built for this n. */
  built: string[];
}

function freshTree(n: number): TreeState {
  const root: TNode = { v: n };
  return { n, root, history: [], sel: null, built: isPrime(n) ? [signature(root)] : [] };
}

/** Move to a new tree, recording it if it is finished. */
function withRoot(s: TreeState, root: TNode, sel: string | null): TreeState {
  const done = leavesOf(root).every((l) => isPrime(l.v));
  const sig = signature(root);
  const built = done && !s.built.includes(sig) ? [...s.built, sig] : s.built;
  return { ...s, root, history: [...s.history, s.root], sel, built };
}

const TREE_PRESETS = [72, 100, 180, 216, 360, 97];

function FactorTreeBuilder() {
  const [st, setSt] = useState<TreeState>(() => freshTree(360));
  const { n, root } = st;

  const leaves = useMemo(() => leavesOf(root), [root]);
  const pending = leaves.filter((l) => !isPrime(l.v));
  const complete = pending.length === 0;
  const active = pending.find((l) => l.path === st.sel) ?? pending[0];
  const { nodes, height } = useMemo(() => layoutTree(root), [root]);

  // Read the factorisation from the learner's own leaves.
  const pf: PF = useMemo(() => {
    const counts = new Map<number, number>();
    for (const l of leaves) counts.set(l.v, (counts.get(l.v) ?? 0) + 1);
    return [...counts.entries()].sort((a, b) => a[0] - b[0]);
  }, [leaves]);

  const odd = pf.filter(([, e]) => e % 2 === 1).map(([p]) => p);
  const isSquare = odd.length === 0;
  const sqMult = product(odd);
  const sqRoot = product(pf.map(([p, e]) => p ** ((e + (e % 2)) / 2)));
  const isCube = pf.every(([, e]) => e % 3 === 0);
  const cbRoot = product(pf.map(([p, e]) => p ** Math.floor(e / 3)));
  const nFactors = product(pf.map(([, e]) => e + 1));

  const choose = (v: number) => setSt(freshTree(Math.max(2, Math.min(500, Math.round(v)))));

  const surprise = () => {
    let r = n;
    for (let tries = 0; tries < 200 && (r === n || bigOmega(r) < 3); tries++) r = 12 + Math.floor(Math.random() * 389);
    setSt(freshTree(r));
  };

  const split = (path: string, a: number, b: number) =>
    setSt((s) => {
      const next = splitAt(s.root, path, a, b);
      const sel = !isPrime(a) ? path + "0" : !isPrime(b) ? path + "1" : null;
      return withRoot(s, next, sel);
    });

  const finish = () => setSt((s) => withRoot(s, ladderFinish(s.root), null));
  const undo = () =>
    setSt((s) => (s.history.length ? { ...s, root: s.history[s.history.length - 1], history: s.history.slice(0, -1), sel: null } : s));
  const restart = () => setSt((s) => ({ ...freshTree(s.n), built: s.built }));

  const plain = indexPlain(pf);
  const aria = complete
    ? `Factor tree for ${n}, finished. Every branch ends in a prime: ${n} = ${plain}.`
    : `Factor tree for ${n}. Numbers still to split: ${pending.map((l) => l.v).join(", ")}. Primes found so far: ${leaves
        .filter((l) => isPrime(l.v))
        .map((l) => l.v)
        .join(", ") || "none"}.`;

  const nBuilt = st.built.length;
  const rootIsPrime = isPrime(n);
  // Exactly one tree exists when n has a single factor pair besides 1 × n (n = pq, p² or p³).
  const firstSplits = factorPairs(n);

  let caption;
  if (rootIsPrime) {
    caption = (
      <>
        <strong>{n} is prime.</strong> Its only factors are 1 and {n}, and splitting it as 1 × {n} gets you nowhere, so the tree
        can&apos;t grow at all. A prime is its own prime factorisation.
      </>
    );
  } else if (!complete && active) {
    caption = (
      <>
        Split <strong>{active.v}</strong> using any factor pair you like (1 × {active.v} doesn&apos;t count: it never gets
        smaller). Primes are circled in green because they can&apos;t be split.{" "}
        {pending.length > 1 ? (
          <>
            Still to split: <strong>{pending.map((l) => l.v).join(", ")}</strong>.
          </>
        ) : (
          <>That&apos;s the last composite number.</>
        )}
      </>
    );
  } else {
    caption = (
      <>
        Every branch ends in a prime, so <strong>{n}</strong> = <M>{indexMath(pf)}</M>.{" "}
        {nBuilt > 1 ? (
          <>
            You&apos;ve built <strong>{nBuilt} different trees</strong> for {n}, and every one ended with exactly the same primes.
          </>
        ) : firstSplits.length === 1 ? (
          <>
            This is the only tree {n} can have: apart from 1 × {n}, its only factor pair is {firstSplits[0][0]} × {firstSplits[0][1]}.
            Pick 360 to compare lots of different trees.
          </>
        ) : (
          <>Press “Start again” and make a different first split. Will the primes change?</>
        )}{" "}
        That&apos;s the <strong>uniqueness of prime factorisation</strong>: every whole number above 1 has one, and only one, set
        of prime factors.
      </>
    );
  }

  return (
    <WidgetFrame
      title="Factor tree builder"
      tryThis={[
        "Build two different trees for 360 by starting with a different split. Do the circled primes change?",
        "Find a number between 90 and 100 whose tree can't grow at all. What kind of number is it?",
        "What is the smallest whole number you can multiply 72 by to get a square number? Predict, then check the readout.",
        "Which numbers have an **odd** number of factors? Test a few. What do they have in common?",
      ]}
      caption={caption}
    >
      <div className="space-y-3">
        <Slider label="Number to split" value={n} min={2} max={500} onChange={choose} />
        <div className="flex flex-wrap gap-2" role="group" aria-label="Quick picks">
          {TREE_PRESETS.map((p) => (
            <button
              key={p}
              type="button"
              className={`btn text-sm ${p === n ? "btn-primary" : "btn-secondary"}`}
              onClick={() => choose(p)}
              aria-pressed={p === n}
            >
              {p}
            </button>
          ))}
          <button type="button" className="btn btn-ghost text-sm" onClick={surprise}>
            🎲 Surprise me
          </button>
        </div>
      </div>

      <svg viewBox={`0 0 ${TREE_W} ${height}`} className="mx-auto mt-4 h-auto w-full max-w-xl" role="img" aria-label={aria}>
        {nodes.map((p) =>
          p.parent ? (
            <line key={`e${p.path}`} x1={p.parent.x} y1={p.parent.y} x2={p.x} y2={p.y} className="stroke-ink-2" strokeWidth={1.5} />
          ) : null,
        )}
        {nodes.map((p) => {
          const prime = p.leaf && isPrime(p.v);
          const waiting = p.leaf && !prime;
          const selected = waiting && active?.path === p.path;
          const cls = prime
            ? "fill-good-soft stroke-good"
            : selected
              ? "fill-brand-soft stroke-brand"
              : waiting
                ? "fill-surface stroke-brand"
                : "fill-surface-2 stroke-line";
          return (
            <g
              key={`n${p.path}`}
              onClick={waiting ? () => setSt((s) => ({ ...s, sel: p.path })) : undefined}
              className={waiting ? "cursor-pointer" : undefined}
            >
              <circle
                cx={p.x}
                cy={p.y}
                r={NODE_R}
                className={cls}
                strokeWidth={prime ? 2.5 : selected ? 3 : waiting ? 2 : 1.5}
                strokeDasharray={waiting && !selected ? "4 3" : undefined}
              />
              <text
                x={p.x}
                y={p.y + (p.v >= 100 ? 4 : 5)}
                textAnchor="middle"
                fontSize={p.v >= 100 ? 12 : 14}
                fontWeight={800}
                className={prime ? "fill-good" : "fill-ink"}
              >
                {p.v}
              </text>
            </g>
          );
        })}
      </svg>

      {!complete && active ? (
        <div className="mt-3 space-y-3">
          {pending.length > 1 ? (
            <div>
              <div className="text-sm font-semibold text-ink-2">Choose a number to split</div>
              <div className="mt-1 flex flex-wrap gap-2" role="group" aria-label="Numbers still to split">
                {pending.map((l) => (
                  <button
                    key={l.path}
                    type="button"
                    className={`btn text-sm ${l.path === active.path ? "btn-primary" : "btn-secondary"}`}
                    aria-pressed={l.path === active.path}
                    onClick={() => setSt((s) => ({ ...s, sel: l.path }))}
                  >
                    {l.v}
                  </button>
                ))}
              </div>
            </div>
          ) : null}
          <div>
            <div className="text-sm font-semibold text-ink-2">
              Split <span className="text-brand">{active.v}</span> into
            </div>
            <div className="mt-1 flex flex-wrap gap-2" role="group" aria-label={`Factor pairs of ${active.v}`}>
              {factorPairs(active.v).map(([a, b]) => (
                <button
                  key={a}
                  type="button"
                  className="btn btn-secondary text-sm tabular-nums"
                  onClick={() => split(active.path, a, b)}
                  aria-label={`Split ${active.v} into ${a} and ${b}`}
                >
                  {a} × {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap gap-2">
        <button type="button" className="btn btn-ghost text-sm" onClick={undo} disabled={!st.history.length}>
          ↩ Undo
        </button>
        <button type="button" className="btn btn-ghost text-sm" onClick={restart} disabled={!root.kids}>
          ⟲ Start again
        </button>
        <button type="button" className="btn btn-ghost text-sm" onClick={finish} disabled={complete}>
          🪜 Finish it for me (ladder)
        </button>
      </div>

      {complete ? (
        <div className="mt-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
            <Readout label="Index form" value={<M>{indexMath(pf)}</M>} tone="ink" />
            <Readout
              label="Square?"
              tone={isSquare ? "good" : "bad"}
              value={isSquare ? <M>{`sqrt(${n}) = ${sqRoot}`}</M> : <>No</>}
            />
            <Readout label="Cube?" tone={isCube ? "good" : "bad"} value={isCube ? <M>{`cbrt(${n}) = ${cbRoot}`}</M> : <>No</>} />
            <Readout label="Factors (stretch)" value={nFactors} />
          </div>
          <ul className="space-y-1.5 text-sm text-ink-2">
            <li>
              <strong className="text-ink">Square test:</strong>{" "}
              {isSquare ? (
                <>
                  every power is even, so the primes split into two identical halves. Each half is {sqRoot}, so{" "}
                  <M>{`${n} = ${sqRoot}^2`}</M>.
                </>
              ) : (
                <>
                  the odd power{odd.length > 1 ? "s" : ""} of {listAnd(odd)} {odd.length > 1 ? "stop" : "stops"} {n} being a square. Multiply by{" "}
                  <strong className="text-ink">{sqMult}</strong> to make every power even: {n} × {sqMult} = {n * sqMult} ={" "}
                  <M>{`${sqRoot}^2`}</M>.
                </>
              )}
            </li>
            <li>
              <strong className="text-ink">Cube test:</strong>{" "}
              {isCube ? (
                <>
                  every power is a multiple of 3, so the primes split into three identical groups: <M>{`${n} = ${cbRoot}^3`}</M>.
                </>
              ) : (
                <>not every power is a multiple of 3, so {n} is not a cube number.</>
              )}
            </li>
            <li>
              <strong className="text-ink">Counting factors:</strong> each factor chooses a power of every prime, from 0 up to the
              power in {n}. That gives {pf.map(([, e]) => `(${e} + 1)`).join(" × ")} = <strong className="text-ink">{nFactors}</strong>{" "}
              factors{nFactors % 2 === 1 ? ", an odd number, because a square has a factor that pairs with itself" : ""}.
            </li>
          </ul>
        </div>
      ) : null}
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. HCF & LCM lab
// ===========================================================================

type View = "venn" | "buses" | "tiles";

const PAIR_PRESETS: [number, number][] = [
  [12, 18],
  [24, 36],
  [60, 72],
  [8, 15],
  [6, 24],
  [12, 20],
];

/** Chip centres in a little grid (max 2 columns) centred on (cx, cy). */
function chipGrid(count: number, cx: number, cy: number): { x: number; y: number }[] {
  const cols = count > 3 ? 2 : 1;
  const rows = Math.ceil(count / cols);
  const gap = 28;
  const out: { x: number; y: number }[] = [];
  for (let i = 0; i < count; i++) {
    const r = Math.floor(i / cols);
    const c = i % cols;
    const inRow = Math.min(cols, count - r * cols);
    out.push({ x: cx + (c - (inRow - 1) / 2) * gap, y: cy + (r - (rows - 1) / 2) * gap });
  }
  return out;
}

function Chip({ x, y, p, shared }: { x: number; y: number; p: number; shared: boolean }) {
  return (
    <g>
      <circle cx={x} cy={y} r={12.5} className={shared ? "fill-good-soft stroke-good" : "fill-surface stroke-ink-2"} strokeWidth={1.5} />
      <text x={x} y={y + 4.5} textAnchor="middle" fontSize={p >= 100 ? 9.5 : p >= 10 ? 11.5 : 13} fontWeight={800} className="fill-ink">
        {p}
      </text>
    </g>
  );
}

function HcfLcmLab() {
  const [a, setA] = useState(24);
  const [b, setB] = useState(36);
  const [view, setView] = useState<View>("venn");
  const [tile, setTile] = useState(5);

  const data = useMemo(() => {
    const fa = new Map(factorise(a));
    const fb = new Map(factorise(b));
    const primes = [...new Set([...fa.keys(), ...fb.keys()])].sort((x, y) => x - y);
    const shared: number[] = [];
    const onlyA: number[] = [];
    const onlyB: number[] = [];
    for (const p of primes) {
      const ea = fa.get(p) ?? 0;
      const eb = fb.get(p) ?? 0;
      const m = Math.min(ea, eb);
      for (let i = 0; i < m; i++) shared.push(p);
      for (let i = 0; i < ea - m; i++) onlyA.push(p);
      for (let i = 0; i < eb - m; i++) onlyB.push(p);
    }
    const hcf = product(shared);
    const lcm = product(onlyA) * hcf * product(onlyB);
    return { pfA: factorise(a), pfB: factorise(b), shared, onlyA, onlyB, hcf, lcm };
  }, [a, b]);
  const { pfA, pfB, shared, onlyA, onlyB, hcf, lcm } = data;
  // Sanity: the Venn HCF is exactly Euclid's gcd.
  const hcfOk = hcf === gcd(a, b);

  const pick = ([x, y]: [number, number]) => {
    setA(x);
    setB(y);
  };

  // ---------- Venn picture ----------
  const venn = (
    <svg
      viewBox="0 0 400 240"
      className="h-auto w-full"
      role="img"
      aria-label={`Venn diagram of prime factors. ${a} = ${indexPlain(pfA)}; ${b} = ${indexPlain(pfB)}. Only in ${a}: ${
        onlyA.join(", ") || "nothing"
      }. Shared: ${shared.join(", ") || "nothing"}. Only in ${b}: ${onlyB.join(", ") || "nothing"}. HCF ${hcf}, LCM ${lcm}.`}
    >
      <circle cx={150} cy={130} r={88} className="fill-brand-soft stroke-brand" fillOpacity={0.75} strokeWidth={2} />
      <circle cx={250} cy={130} r={88} className="fill-accent-soft stroke-accent" fillOpacity={0.6} strokeWidth={2} />
      <text x={8} y={18} fontSize={13} fontWeight={700} className="fill-ink">
        {a} = {indexPlain(pfA)}
      </text>
      <text x={392} y={18} fontSize={13} fontWeight={700} textAnchor="end" className="fill-ink">
        {b} = {indexPlain(pfB)}
      </text>
      <text x={100} y={80} fontSize={15} fontWeight={800} textAnchor="middle" className="fill-brand">
        {a}
      </text>
      <text x={300} y={80} fontSize={15} fontWeight={800} textAnchor="middle" className="fill-accent">
        {b}
      </text>
      {chipGrid(onlyA.length, 108, 140).map((c, i) => (
        <Chip key={`a${i}`} x={c.x} y={c.y} p={onlyA[i]} shared={false} />
      ))}
      {chipGrid(shared.length, 200, 130).map((c, i) => (
        <Chip key={`s${i}`} x={c.x} y={c.y} p={shared[i]} shared />
      ))}
      {chipGrid(onlyB.length, 292, 140).map((c, i) => (
        <Chip key={`b${i}`} x={c.x} y={c.y} p={onlyB[i]} shared={false} />
      ))}
      <text x={200} y={234} fontSize={12} textAnchor="middle" className="fill-ink-2">
        overlap → HCF · every prime once → LCM
      </text>
    </svg>
  );

  // ---------- Bus timetable picture ----------
  const x0 = 40;
  const span = 340;
  const horizon = (2 * lcm) / Math.min(a, b) <= 60 ? 2 * lcm : lcm;
  const sx = span / horizon;
  const busA = Array.from({ length: Math.floor(horizon / a) + 1 }, (_, k) => k * a);
  const busB = Array.from({ length: Math.floor(horizon / b) + 1 }, (_, k) => k * b);
  const together = Array.from({ length: Math.floor(horizon / lcm) + 1 }, (_, k) => k * lcm);
  const dots = Math.max(busA.length, busB.length) <= 40;
  const buses = (
    <svg
      viewBox="0 0 400 180"
      className="h-auto w-full"
      role="img"
      aria-label={`Timeline from 0 to ${horizon} minutes. Bus A leaves every ${a} minutes, bus B every ${b} minutes. They leave together at ${together.join(", ")} minutes.`}
    >
      {together.map((t) => (
        <g key={`t${t}`}>
          <line x1={x0 + t * sx} x2={x0 + t * sx} y1={40} y2={140} className="stroke-good" strokeWidth={2} strokeDasharray="5 4" />
          <text x={x0 + t * sx} y={158} fontSize={12} fontWeight={800} textAnchor="middle" className="fill-good">
            {t}
          </text>
        </g>
      ))}
      <text x={x0 + 8} y={34} fontSize={12} fontWeight={700} className="fill-ink">
        Bus A: every {a} min
      </text>
      <text x={x0 + 8} y={84} fontSize={12} fontWeight={700} className="fill-ink">
        Bus B: every {b} min
      </text>
      <line x1={x0} x2={x0 + span} y1={55} y2={55} className="stroke-line" strokeWidth={1.5} />
      <line x1={x0} x2={x0 + span} y1={105} y2={105} className="stroke-line" strokeWidth={1.5} />
      {busA.map((t) =>
        dots ? (
          <circle key={`a${t}`} cx={x0 + t * sx} cy={55} r={5} className="fill-brand" />
        ) : (
          <line key={`a${t}`} x1={x0 + t * sx} x2={x0 + t * sx} y1={47} y2={63} className="stroke-brand" strokeWidth={1.5} />
        ),
      )}
      {busB.map((t) =>
        dots ? (
          <circle key={`b${t}`} cx={x0 + t * sx} cy={105} r={5} className="fill-accent" />
        ) : (
          <line key={`b${t}`} x1={x0 + t * sx} x2={x0 + t * sx} y1={97} y2={113} className="stroke-accent" strokeWidth={1.5} />
        ),
      )}
      <line x1={x0} x2={x0 + span} y1={140} y2={140} className="stroke-ink-2" strokeWidth={1.5} />
      <text x={x0 + span} y={174} fontSize={11} textAnchor="end" className="fill-ink-2">
        time (minutes)
      </text>
    </svg>
  );

  // ---------- Floor tiles picture ----------
  const t = Math.max(1, Math.min(tile, a, b));
  const fx = Math.floor(a / t);
  const fy = Math.floor(b / t);
  const fits = a % t === 0 && b % t === 0;
  const s = Math.min(330 / a, 180 / b);
  const w = a * s;
  const h = b * s;
  const ox = 50 + (330 - w) / 2;
  const oy = 12 + (180 - h) / 2;
  const tiles = (
    <svg
      viewBox="0 0 400 230"
      className="h-auto w-full"
      role="img"
      aria-label={`A floor ${a} cm by ${b} cm covered with ${t} cm square tiles: ${fx} across and ${fy} down${
        fits
          ? ", fitting exactly"
          : `, leaving ${[a % t ? `${a % t} cm uncovered across the width` : "", b % t ? `${b % t} cm uncovered down the height` : ""]
              .filter(Boolean)
              .join(" and ")}`
      }.`}
    >
      <rect x={ox} y={oy} width={w} height={h} className="fill-bad-soft" />
      <rect x={ox} y={oy} width={fx * t * s} height={fy * t * s} className={fits ? "fill-good-soft" : "fill-brand-soft"} />
      {Array.from({ length: Math.max(0, fx - 1) }, (_, i) => (
        <line
          key={`v${i}`}
          x1={ox + (i + 1) * t * s}
          x2={ox + (i + 1) * t * s}
          y1={oy}
          y2={oy + fy * t * s}
          className={fits ? "stroke-good" : "stroke-brand"}
          strokeWidth={1}
        />
      ))}
      {Array.from({ length: Math.max(0, fy - 1) }, (_, j) => (
        <line
          key={`h${j}`}
          x1={ox}
          x2={ox + fx * t * s}
          y1={oy + (j + 1) * t * s}
          y2={oy + (j + 1) * t * s}
          className={fits ? "stroke-good" : "stroke-brand"}
          strokeWidth={1}
        />
      ))}
      <rect x={ox} y={oy} width={fx * t * s} height={fy * t * s} fill="none" className={fits ? "stroke-good" : "stroke-brand"} strokeWidth={1.5} />
      <rect x={ox} y={oy} width={w} height={h} fill="none" className="stroke-ink" strokeWidth={2} />
      <text x={ox + w / 2} y={oy + h + 18} fontSize={12} fontWeight={700} textAnchor="middle" className="fill-ink">
        {a} cm
      </text>
      <text
        x={ox - 10}
        y={oy + h / 2}
        fontSize={12}
        fontWeight={700}
        textAnchor="middle"
        transform={`rotate(-90 ${ox - 10} ${oy + h / 2})`}
        className="fill-ink"
      >
        {b} cm
      </text>
    </svg>
  );

  // ---------- Captions ----------
  let special = null;
  if (a === b) special = <>Same number twice: every prime is shared, so HCF = LCM = {a}.</>;
  else if (!shared.length)
    special = (
      <>
        No shared primes, so the HCF is 1: {a} and {b} are <strong>co-prime</strong>, and the LCM is simply {a} × {b} = {a * b}.
      </>
    );
  else if (!onlyA.length)
    special = (
      <>
        {a} is a factor of {b}: all of {a}&apos;s primes sit in the overlap, so HCF = {a} and LCM = {b}.
      </>
    );
  else if (!onlyB.length)
    special = (
      <>
        {b} is a factor of {a}: all of {b}&apos;s primes sit in the overlap, so HCF = {b} and LCM = {a}.
      </>
    );

  const caption =
    view === "venn" ? (
      <>
        Shared primes go in the overlap{shared.length ? <>: {shared.join(", ")}</> : <> (there are none)</>}.{" "}
        <strong>HCF</strong> = product of the overlap = <strong>{hcf}</strong>. <strong>LCM</strong> = product of every prime in the
        picture, each used once = <strong>{lcm}</strong>. {special}{" "}
        {shared.length ? (
          <>
            The overlap is used twice in {a} × {b} and twice in HCF × LCM, so both equal {a * b}.
          </>
        ) : (
          <>
            Check: HCF × LCM = 1 × {lcm} = {a} × {b}.
          </>
        )}
      </>
    ) : view === "buses" ? (
      <>
        Bus A leaves at the multiples of {a}; bus B at the multiples of {b}. Both leave at 0, then next leave together after{" "}
        <strong>{lcm} minutes</strong>: the smallest number after 0 in both lists of multiples, the <strong>LCM</strong>. That&apos;s {lcm / a} trip
        {lcm / a === 1 ? "" : "s"} of A and {lcm / b} trip{lcm / b === 1 ? "" : "s"} of B, and it repeats every {lcm} minutes.{" "}
        {a === b ? (
          <>Same timetable, so they always leave together.</>
        ) : lcm < a * b ? (
          <>
            {a} × {b} = {a * b} is <em>a</em> common multiple, but not the lowest, because {a} and {b} share the factor {hcf}.
          </>
        ) : (
          <>
            {a} and {b} share no prime factor, so here the LCM is {a} × {b}.
          </>
        )}
      </>
    ) : fits ? (
      <>
        {t} cm tiles fit exactly: {fx} × {fy} = <strong>{fx * fy} tiles</strong>, because {t} is a common factor of {a} and {b}.{" "}
        {t === hcf ? (
          <>
            This is the <strong>biggest</strong> square tile that fits: the <strong>HCF</strong>, {hcf} cm.
          </>
        ) : (
          <>Can you find a bigger tile that still fits both sides?</>
        )}
      </>
    ) : (
      <>
        {t} cm tiles don&apos;t fit:{" "}
        {a % t !== 0 ? (
          <>
            {t} doesn&apos;t divide {a} (a {a % t} cm gap){b % t !== 0 ? " and " : ""}
          </>
        ) : null}
        {b % t !== 0 ? (
          <>
            {t} doesn&apos;t divide {b} (a {b % t} cm gap)
          </>
        ) : null}
        . A square tile fits only when its side is a <strong>common factor</strong> of both lengths.
      </>
    );

  return (
    <WidgetFrame
      title="HCF & LCM lab"
      tryThis={[
        "Find two numbers whose overlap is empty. What is their HCF, and how does the LCM compare with the two numbers multiplied?",
        "Make the LCM equal to one of your two numbers. What must be true about the numbers?",
        "Find two numbers with HCF 6 and LCM 72. Is there more than one pair?",
        "Buses every 12 and every 20 minutes both leave at 8:00 am. Predict when they next leave together, then check in the Buses view.",
      ]}
      caption={caption}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <Slider label="First number a" value={a} min={2} max={120} onChange={setA} />
        <Slider label="Second number b" value={b} min={2} max={120} onChange={setB} />
      </div>
      <div className="mt-3 flex flex-wrap gap-2" role="group" aria-label="Quick picks">
        {PAIR_PRESETS.map(([x, y]) => (
          <button
            key={`${x}-${y}`}
            type="button"
            className={`btn text-sm tabular-nums ${x === a && y === b ? "btn-primary" : "btn-secondary"}`}
            aria-pressed={x === a && y === b}
            onClick={() => pick([x, y])}
          >
            {x} & {y}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <Segmented<View>
          label="Picture"
          value={view}
          onChange={setView}
          options={[
            { value: "venn", label: "Venn" },
            { value: "buses", label: "Buses (LCM)" },
            { value: "tiles", label: "Tiles (HCF)" },
          ]}
        />
      </div>

      <div className="mt-3">
        {view === "venn" ? venn : view === "buses" ? buses : (
          <div className="space-y-3">
            <Slider label="Square tile side (cm)" value={t} min={1} max={Math.min(a, b)} onChange={setTile} />
            {tiles}
          </div>
        )}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        <Readout label={<>HCF({a}, {b})</>} value={hcfOk ? hcf : "?"} tone="good" />
        <Readout label={<>LCM({a}, {b})</>} value={lcm} />
        <Readout label="HCF × LCM" value={(hcf * lcm).toLocaleString("en-GB")} tone="ink" />
        <Readout label="a × b" value={(a * b).toLocaleString("en-GB")} tone="ink" />
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "factor-tree-builder",
    title: "Factor tree builder",
    blurb: "Split a number your own way, then read squares, roots and factor counts from its primes.",
    Component: FactorTreeBuilder,
  },
  {
    id: "hcf-lcm-lab",
    title: "HCF & LCM lab",
    blurb: "One pair of numbers, three pictures: a prime-factor Venn diagram, bus timetables and floor tiles.",
    Component: HcfLcmLab,
  },
];
