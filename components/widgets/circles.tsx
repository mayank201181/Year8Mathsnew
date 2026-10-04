"use client";
// Explorables for "Circles".
//  1. Roll the wheel — one full turn rolls a wheel forward exactly one
//     circumference: 3 diameters and a bit, so C = πd. Part turns roll out an
//     arc (θ/360 of C) and sweep a sector (semicircle, quarter circle …), and a
//     "wheel-maker" challenge works backwards from a distance to the radius.
//  2. Slice & rearrange — cut a circle into n equal sectors and lay them
//     top-to-tail: the shape closes in on a πr × r rectangle, so A = πr².
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { M, Readout, Segmented, Slider, WidgetFrame, type WidgetDef } from "./kit";

// ---------------------------------------------------------------------------
// Shared helpers
// ---------------------------------------------------------------------------

const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** p/q simplified, as maths markup: "3/4", "2", "0". */
function fracText(p: number, q: number): string {
  if (p === 0) return "0";
  const g = gcd(p, q);
  return q / g === 1 ? String(p / g) : `${p / g}/${q / g}`;
}

/** (p/q) × π simplified, as maths markup: "pi", "6 pi", "3/4 pi", "0". */
function piText(p: number, q: number): string {
  if (p === 0) return "0";
  const f = fracText(p, q);
  return f === "1" ? "pi" : `${f} pi`;
}

/** Rounded to 3 significant figures, keeping trailing zeros (22.0, 113, 0.785). */
function sf3(x: number): string {
  if (x === 0) return "0";
  if (Math.abs(x) >= 1000) return String(Math.round(x));
  return x.toPrecision(3);
}

/** SVG coordinate, 2 d.p. */
const f2 = (x: number) => x.toFixed(2);

function Label({
  x,
  y,
  children,
  anchor = "middle",
  size = 12,
  tone = "fill-ink",
}: {
  x: number;
  y: number;
  children: ReactNode;
  anchor?: "start" | "middle" | "end";
  size?: number;
  tone?: string;
}) {
  return (
    <text x={x} y={y} fontSize={size} fontWeight={700} textAnchor={anchor} className={`${tone} stroke-surface`} strokeWidth={3} paintOrder="stroke">
      {children}
    </text>
  );
}

/** A readout value with an optional smaller second line. */
function Two({ main, sub }: { main: ReactNode; sub?: ReactNode }) {
  return (
    <>
      <span className="block">{main}</span>
      {sub ? <span className="block text-sm font-bold text-ink-2">{sub}</span> : null}
    </>
  );
}

// ===========================================================================
// 1. Roll the wheel
// ===========================================================================

const W1 = 480;
const H1 = 244;
const GY = 182; // ground line (px)
const U1 = 11; // px per cm — fixed, so every wheel is drawn to the same scale
const X0 = 64; // where the red dot starts: 0 on the ruler
const RULER_MAX = 32; // cm
const DOT = "#e11d48"; // small accent: the marked point on the rim
const TARGET_RADII = [1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];

type RollMode = "explore" | "challenge";

function RollingWheel() {
  const [r, setR] = useState(3);
  const [theta, setTheta] = useState(0); // degrees turned, 0–360
  const [mode, setMode] = useState<RollMode>("explore");
  const [rods, setRods] = useState(false);
  const [targetR, setTargetR] = useState(3.5);
  const anim = useRef({ id: 0 });

  useEffect(() => {
    const a = anim.current;
    return () => cancelAnimationFrame(a.id);
  }, []);

  const stop = () => {
    cancelAnimationFrame(anim.current.id);
    anim.current.id = 0;
  };

  const roll = () => {
    stop();
    const from = theta >= 360 ? 0 : theta;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTheta(360);
      return;
    }
    const ms = ((360 - from) / 360) * 2400;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      setTheta(Math.round(from + (360 - from) * p));
      anim.current.id = p < 1 ? requestAnimationFrame(tick) : 0;
    };
    setTheta(from);
    anim.current.id = requestAnimationFrame(tick);
  };

  const reset = () => {
    stop();
    setTheta(0);
  };
  const changeR = (v: number) => {
    setR(v);
    if (mode === "challenge") reset();
  };
  const changeTheta = (v: number) => {
    stop();
    setTheta(v);
  };
  const changeMode = (m: RollMode) => {
    setMode(m);
    reset();
  };
  const newTarget = () => {
    reset();
    const options = TARGET_RADII.filter((t) => t !== targetR && t !== r);
    setTargetR(options[Math.floor(Math.random() * options.length)]);
  };

  // ---- geometry (cm for the maths, px for the drawing) ----
  const d = 2 * r; // r goes up in halves, so d is a whole number of cm
  const R = r * U1;
  const phi = (theta * Math.PI) / 180;
  const C = Math.PI * d;
  const arc = (theta / 360) * C;
  const full = theta >= 360;
  const cx = X0 + arc * U1;
  const cy = GY - R;
  const dotX = cx - R * Math.sin(phi);
  const dotY = cy + R * Math.cos(phi);
  const large = theta > 180 ? 1 : 0;
  // Sweep flag 0 = anticlockwise on screen: from the marked point back round to the contact point.
  const sectorPath = `M${f2(cx)},${f2(cy)} L${f2(dotX)},${f2(dotY)} A${f2(R)},${f2(R)} 0 ${large} 0 ${f2(cx)},${f2(GY)} Z`;
  const arcPath = `M${f2(dotX)},${f2(dotY)} A${f2(R)},${f2(R)} 0 ${large} 0 ${f2(cx)},${f2(GY)}`;

  // Path of the red dot so far (a cycloid).
  const steps = Math.max(2, Math.ceil(theta / 4));
  const trace: string[] = [];
  for (let i = 0; i <= steps; i++) {
    const t = (phi * i) / steps;
    trace.push(`${f2(X0 + R * t - R * Math.sin(t))},${f2(GY - R + R * Math.cos(t))}`);
  }

  // ---- exact and rounded values ----
  const arcExact = piText(theta * d, 360);
  const areaExact = piText(theta * d * d, 1440); // θ/360 × π r², with r² = d²/4
  const sectorArea = (theta / 360) * Math.PI * r * r;
  const turnFrac = fracText(theta, 360);

  // ---- challenge ----
  const T = 2 * Math.PI * targetR;
  const flagX = X0 + T * U1;
  const hit = r === targetR;
  const miss = C - T;

  const aria =
    `A wheel of diameter ${d} centimetres has turned ${theta} degrees and rolled ${sf3(arc)} centimetres along a ruler.` +
    (mode === "challenge" ? ` A flag stands ${sf3(T)} centimetres from the start.` : "") +
    (rods ? " Three diameter-length strips and a short extra piece are laid under the ruler, together as long as the circumference." : "");

  let special: ReactNode = null;
  if (theta === 180) {
    special = (
      <>
        The shaded slice is a <strong>semicircle</strong>. Its area is half the circle, <M>{`1/2 pi r^2 = ${areaExact}`}</M> ≈ {sf3(sectorArea)} cm², but its perimeter is the curved half <strong>plus the diameter</strong>: <M>{`${arcExact} + ${d}`}</M> ≈ {sf3(arc + d)} cm.
      </>
    );
  } else if (theta === 90 || theta === 270) {
    special = (
      <>
        The shaded slice is a <strong>{theta === 90 ? "quarter" : "three-quarter"} circle</strong>: its area is <M>{turnFrac}</M> of <M>{"pi r^2"}</M>, and its perimeter is the curved part <strong>plus two radii</strong>: <M>{`${arcExact} + ${d}`}</M> ≈ {sf3(arc + d)} cm.
      </>
    );
  } else if (theta > 0 && !full) {
    special = (
      <>
        The shaded slice is a <strong>sector</strong>, <M>{turnFrac}</M> of the circle, so its area is <M>{turnFrac}</M> of <M>{"pi r^2"}</M> and its perimeter is the arc plus two radii.
      </>
    );
  }

  let caption: ReactNode;
  if (theta === 0) {
    caption = (
      <>
        The red dot is touching the ground at 0. One full turn rolls the wheel forward until the dot touches down again. <strong>Predict first:</strong> will it land more or less than 3 diameters (3 × {d} = {3 * d} cm) away? Then press <strong>Roll one turn</strong>.
      </>
    );
  } else if (full) {
    caption = (
      <>
        One full turn rolled out exactly one circumference: <M>{`C = pi d = pi * ${d} = ${d} pi`}</M> ≈ {sf3(C)} cm. That is <strong>3 diameters and a bit</strong>
        {rods ? " (see the strips under the ruler)" : " (press “Lay diameters” to see them)"}, and rolled ÷ diameter = π ≈ 3.1416 for <em>every</em> wheel. A diameter is two radii, so this is also <M>{`C = 2 pi r = 2 pi * ${r}`}</M>.
      </>
    );
  } else {
    caption = (
      <>
        The wheel has turned {theta}°, which is <M>{turnFrac}</M> of a full turn, so it has rolled <M>{turnFrac}</M> of the circumference: <M>{`${turnFrac} * pi * ${d} = ${arcExact}`}</M> ≈ {sf3(arc)} cm. The orange arc on the wheel is exactly as long as the orange line on the ground. {special}
      </>
    );
  }

  let perimeterValue: ReactNode;
  if (theta === 0) perimeterValue = "—";
  else if (full) perimeterValue = <Two main={<><M>{`${d} pi`}</M> cm</>} sub={`≈ ${sf3(C)} cm · no straight edges`} />;
  else perimeterValue = <Two main={<><M>{`${arcExact} + ${d}`}</M></>} sub={`≈ ${sf3(arc + d)} cm`} />;

  const angleLabel = R >= 27 && theta >= 45 && !full;
  const half = phi / 2;

  return (
    <WidgetFrame
      title="Roll the wheel: where π comes from"
      tryThis={[
        "Before you roll, predict: does one full turn travel more or less than 3 diameters? Then lay the diameters along the ground to check.",
        "Double the radius from 2 cm to 4 cm. What happens to the distance rolled in one turn? Why?",
        "Turn the wheel 180°. The shaded slice is a semicircle. Why is its perimeter not just half the circumference?",
        "Wheel-maker: work out the radius that reaches the flag in exactly one turn *before* you roll.",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <Segmented<RollMode>
          label="Mode"
          value={mode}
          onChange={changeMode}
          options={[
            { value: "explore", label: "Explore" },
            { value: "challenge", label: "Wheel-maker challenge" },
          ]}
        />

        <svg viewBox={`0 0 ${W1} ${H1}`} className="h-auto w-full" role="img" aria-label={aria}>
          {/* ruler */}
          <line x1={6} x2={W1 - 6} y1={GY} y2={GY} className="stroke-ink-2" strokeWidth={2} />
          {Array.from({ length: RULER_MAX + 1 }, (_, i) => (
            <line key={`t${i}`} x1={X0 + i * U1} x2={X0 + i * U1} y1={GY} y2={GY + (i % 5 === 0 ? 9 : 4)} className="stroke-ink-2" strokeWidth={1} />
          ))}
          {Array.from({ length: 7 }, (_, j) => (
            <text key={`n${j}`} x={X0 + 5 * j * U1} y={GY + 21} fontSize={11} textAnchor="middle" className="fill-ink-2">
              {j === 6 ? "30 cm" : 5 * j}
            </text>
          ))}

          {/* diameters laid along the ground */}
          {rods ? (
            <g>
              {[0, 1, 2].map((j) => (
                <g key={`rod${j}`}>
                  <rect x={X0 + j * d * U1} y={GY + 28} width={d * U1} height={7} className={j % 2 ? "fill-brand-soft stroke-brand" : "fill-brand stroke-brand"} strokeWidth={1} />
                  <text x={X0 + (j + 0.5) * d * U1} y={GY + 47} fontSize={11} fontWeight={700} textAnchor="middle" className="fill-brand">
                    d
                  </text>
                </g>
              ))}
              <rect x={X0 + 3 * d * U1} y={GY + 28} width={(C - 3 * d) * U1} height={7} className="fill-accent stroke-accent" strokeWidth={1} />
              <text x={X0 + C * U1 + 4} y={GY + 35} fontSize={11} fontWeight={700} className="fill-accent">
                + 0.14d
              </text>
            </g>
          ) : null}

          {/* flag (challenge) — drawn behind the wheel */}
          {mode === "challenge" ? (
            <g>
              <line x1={flagX} x2={flagX} y1={GY} y2={30} className="stroke-ink" strokeWidth={1.5} />
              <polygon points={`${f2(flagX)},30 ${f2(flagX + 22)},37 ${f2(flagX)},44`} className="fill-good" />
              <Label x={flagX} y={22}>{`flag ≈ ${sf3(T)} cm`}</Label>
            </g>
          ) : null}

          {/* rolled-out arc on the ground */}
          {theta > 0 ? <line x1={X0} x2={cx} y1={GY} y2={GY} className="stroke-accent" strokeWidth={5} strokeLinecap="round" /> : null}
          {/* path of the red dot */}
          {theta > 0 ? <polyline points={trace.join(" ")} fill="none" stroke={DOT} strokeWidth={1.2} strokeDasharray="3 3" opacity={0.8} /> : null}

          {/* the wheel */}
          <circle cx={cx} cy={cy} r={R} className="fill-brand-soft stroke-ink" strokeWidth={2} />
          {full ? (
            <>
              <circle cx={cx} cy={cy} r={R} className="fill-accent" fillOpacity={0.3} />
              <circle cx={cx} cy={cy} r={R} fill="none" className="stroke-accent" strokeWidth={4} />
            </>
          ) : theta > 0 ? (
            <>
              <path d={sectorPath} className="fill-accent" fillOpacity={0.3} />
              <line x1={cx} y1={cy} x2={cx} y2={GY} className="stroke-ink" strokeWidth={1.2} strokeDasharray="4 3" />
              <path d={arcPath} fill="none" className="stroke-accent" strokeWidth={4} strokeLinecap="round" />
            </>
          ) : null}
          {/* a diameter through the marked point turns with the wheel */}
          <line x1={dotX} y1={dotY} x2={2 * cx - dotX} y2={2 * cy - dotY} className="stroke-brand" strokeWidth={1.5} />
          <circle cx={cx} cy={cy} r={2.5} className="fill-ink" />
          {angleLabel ? (
            <Label x={cx - 0.55 * R * Math.sin(half)} y={cy + 0.55 * R * Math.cos(half) + 4} size={11}>
              {`${theta}°`}
            </Label>
          ) : null}
          <circle cx={dotX} cy={dotY} r={5} fill={DOT} className="stroke-surface" strokeWidth={1.5} />
          <Label x={cx} y={cy - R - 8}>{`d = ${d} cm`}</Label>
        </svg>

        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-primary" onClick={roll}>
            {full ? "▶ Roll again" : theta > 0 ? "▶ Finish the turn" : "▶ Roll one turn"}
          </button>
          <button type="button" className="btn btn-secondary" onClick={reset} disabled={theta === 0}>
            ↩ Reset
          </button>
          <button type="button" className="btn btn-secondary" onClick={() => setRods((v) => !v)} aria-pressed={rods}>
            {rods ? "Hide diameters" : "Lay diameters"}
          </button>
          {mode === "challenge" ? (
            <button type="button" className="btn btn-secondary" onClick={newTarget}>
              🚩 New flag
            </button>
          ) : null}
        </div>

        {mode === "challenge" ? (
          <div
            role="status"
            aria-live="polite"
            className={`rounded-xl p-3 text-sm leading-relaxed text-ink ${full ? (hit ? "bg-good-soft" : "bg-bad-soft") : "bg-surface-2"}`}
          >
            {!full ? (
              <>
                The flag is ≈ {sf3(T)} cm from the start. Choose the radius so that <strong>one full turn</strong> puts the red dot exactly on the flag, then roll. (Changing the radius resets the wheel.)
              </>
            ) : hit ? (
              <>
                🎯 <strong>Bang on the flag!</strong> One turn rolls <M>{`2 pi r = 2 pi * ${r}`}</M> ≈ {sf3(C)} cm. Working backwards: <M>{`r = C/(2 pi) = ${sf3(T)}/(2 pi) ~= ${targetR}`}</M> cm. Press <strong>New flag</strong> for another.
              </>
            ) : (
              <>
                <strong>Missed:</strong> the dot landed at ≈ {sf3(C)} cm, {miss > 0 ? "past" : "short of"} the flag by ≈ {sf3(Math.abs(miss))} cm, so you need a {miss > 0 ? "smaller" : "bigger"} wheel. Work backwards: one turn is <M>{"2 pi r"}</M>, so <M>{"r = C/(2 pi)"}</M>.
              </>
            )}
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2">
          <Readout label="Distance rolled" value={theta === 0 ? "0 cm" : <Two main={<><M>{arcExact}</M> cm</>} sub={`≈ ${sf3(arc)} cm`} />} />
          <Readout label="Rolled ÷ diameter" value={(arc / d).toFixed(4)} tone={full ? "good" : "brand"} />
          <Readout label="Shaded area" value={theta === 0 ? "0 cm²" : <Two main={<><M>{areaExact}</M> cm²</>} sub={`≈ ${sf3(sectorArea)} cm²`} />} tone="ink" />
          <Readout label="Shaded perimeter" value={perimeterValue} tone="ink" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Slider label="Radius r" value={r} min={1} max={5} step={0.5} onChange={changeR} format={(v) => `${v} cm (d = ${2 * v} cm)`} />
          <Slider label="Turn" value={theta} min={0} max={360} step={15} onChange={changeTheta} format={(v) => `${v}°`} />
        </div>
      </div>
    </WidgetFrame>
  );
}

// ===========================================================================
// 2. Slice & rearrange
// ===========================================================================

const SLICES = [4, 6, 8, 12, 16, 24, 36, 48, 72];
const W2 = 480;
const H2 = 252;
const U2 = 15; // px per cm
const CX2 = 240;
const CY2 = 126;
const SLIDE_CLASS = "transition-transform duration-1000 ease-in-out motion-reduce:transition-none";
const FADE_CLASS = "transition-opacity duration-500 motion-reduce:transition-none";

interface Slice {
  key: string;
  top: boolean;
  /** CSS transforms: placed in the circle, and placed in the strip. */
  inCircle: string;
  inStrip: string;
  delay: number;
}

function SliceRearrange() {
  const [ni, setNi] = useState(2);
  const [r, setR] = useState(4);
  const [arranged, setArranged] = useState(false);

  const n = SLICES[ni];
  const R = r * U2;
  const alpha = Math.PI / n; // half the angle of one slice
  const s = R * Math.sin(alpha); // half the straight width of one slice
  const c = R * Math.cos(alpha); // height of a slice's corners above its tip
  const stripW = (n + 1) * s;
  const xStart = CX2 - stripW / 2;
  const yb = CY2 + c / 2; // tips of the point-up slices sit on this line

  // One slice, tip at (0, 0), pointing up; the crust is its arc.
  const body = `M0,0 L${f2(-s)},${f2(-c)} A${f2(R)},${f2(R)} 0 0 1 ${f2(s)},${f2(-c)} Z`;
  const crust = `M${f2(-s)},${f2(-c)} A${f2(R)},${f2(R)} 0 0 1 ${f2(s)},${f2(-c)}`;

  const slices: Slice[] = [];
  for (let i = 0; i < n; i++) {
    const beta = ((i + 0.5) * 360) / n; // direction of the slice's middle (maths angle)
    const rho = 90 - beta; // CSS rotation (clockwise) that turns "up" to that direction
    const top = i < n / 2;
    // Top-half slices point up in the strip (crust on top); bottom-half slices point down.
    const k = top ? n / 2 - 1 - i : i - n / 2; // left-to-right slot
    const tx = top ? xStart + s + 2 * k * s : xStart + 2 * s + 2 * k * s;
    const ty = top ? yb : yb - c;
    slices.push({
      key: `${n}-${r}-${i}`,
      top,
      inCircle: `translate(${CX2}px, ${CY2}px) rotate(${f2(rho)}deg)`,
      inStrip: `translate(${f2(tx)}px, ${f2(ty)}px) rotate(${top ? 0 : -180}deg)`,
      delay: Math.round((k * 300) / (n / 2)),
    });
  }

  const piR = Math.PI * r;
  const area = Math.PI * r * r;
  const widthCm = n * Math.sin(alpha) * r; // straight-across width of the strip
  const pct = ((n * Math.sin(alpha)) / Math.PI) * 100;
  const cornerH = r * Math.cos(alpha);
  const rectRight = CX2 + (Math.PI * R) / 2;
  const bracketX = Math.max(rectRight, CX2 + stripW / 2) + 8;
  const topY = yb - R; // highest point of the strip
  const bottomY = CY2 + R - c / 2; // lowest point of the strip

  const aria = arranged
    ? `${n} slices of a circle of radius ${r} centimetres, laid alternately point-up and point-down in a strip about ${sf3(piR)} centimetres long and ${r} centimetres tall, close to a rectangle.`
    : `A circle of radius ${r} centimetres cut into ${n} equal slices, the top half yellow and the bottom half blue.`;

  const caption = arranged ? (
    <>
      The yellow crust now runs along the top and the blue crust along the bottom, so each wavy long edge is <strong>half the circumference</strong>: <M>{"1/2 * 2 pi r = pi r"}</M> = <M>{`${r} pi`}</M> ≈ {sf3(piR)} cm. The sloping ends are radii, so the height is about <M>{"r"}</M> = {r} cm.{" "}
      {n <= 6 ? (
        <>With only {n} slices it is lumpy: the straight-across width is just {pct.toFixed(2)}% of πr.</>
      ) : n >= 36 ? (
        <>With {n} slices you can hardly tell it from a rectangle: the width is {pct.toFixed(2)}% of πr.</>
      ) : (
        <>The straight-across width is already {pct.toFixed(2)}% of πr.</>
      )}{" "}
      Moving pieces never changes the area, and with thinner and thinner slices the strip becomes the dashed rectangle. So <M>{`A = pi r * r = pi r^2 = pi * ${r}^2 = ${r * r} pi`}</M> ≈ {sf3(area)} cm².
    </>
  ) : (
    <>
      A circle of radius {r} cm cut into {n} equal slices (sectors), each with an angle of {360 / n}° at the centre. The crust, the circumference <M>{`2 pi r = ${2 * r} pi`}</M> ≈ {sf3(2 * piR)} cm, is shared equally: half on the yellow slices, half on the blue. <strong>Predict:</strong> if you lay the slices top-to-tail, alternately point-up and point-down, what shape do you get? Press <strong>Rearrange</strong>.
    </>
  );

  const fade = (on: boolean, delay = 0): CSSProperties => ({ opacity: on ? 1 : 0, transitionDelay: on ? `${delay}ms` : "0ms" });

  return (
    <WidgetFrame
      title="Slice & rearrange: the area of a circle"
      tryThis={[
        "Rearrange 4 slices. Is it a rectangle? Now try 48 slices.",
        "The top edge is all yellow crust. What fraction of the whole circumference is up there, so how long is it?",
        "Set r = 3 cm, then r = 6 cm. The rectangle gets twice as long *and* twice as tall. How many times bigger is the area?",
        "With r = 7 cm, estimate the area using π ≈ {{22/7}}. Does the readout agree to 3 s.f.?",
      ]}
      caption={caption}
    >
      <div className="space-y-4">
        <svg viewBox={`0 0 ${W2} ${H2}`} className="h-auto w-full" role="img" aria-label={aria}>
          {/* where the strip is heading: a πr × r rectangle */}
          <g className={FADE_CLASS} style={fade(arranged, 900)} aria-hidden>
            <rect x={CX2 - (Math.PI * R) / 2} y={CY2 - R / 2} width={Math.PI * R} height={R} fill="none" className="stroke-ink-2" strokeWidth={1.5} strokeDasharray="6 4" />
          </g>

          {slices.map((sl) => (
            <g
              key={sl.key}
              className={SLIDE_CLASS}
              style={{ transform: arranged ? sl.inStrip : sl.inCircle, transformOrigin: "0px 0px", transformBox: "view-box", transitionDelay: `${sl.delay}ms` }}
            >
              <path d={body} className={sl.top ? "fill-accent-soft stroke-ink" : "fill-brand-soft stroke-ink"} strokeWidth={n > 24 ? 0.6 : 1} strokeLinejoin="round" />
              <path d={crust} fill="none" className={sl.top ? "stroke-accent" : "stroke-brand"} strokeWidth={3} strokeLinecap="round" />
            </g>
          ))}

          {/* circle view: a radius */}
          <g className={FADE_CLASS} style={fade(!arranged, 600)} aria-hidden>
            <line x1={CX2} y1={CY2} x2={CX2 + R} y2={CY2} className="stroke-ink" strokeWidth={2} />
            <circle cx={CX2} cy={CY2} r={3} className="fill-ink" />
            <Label x={CX2 + R / 2} y={CY2 - 7}>{`r = ${r} cm`}</Label>
          </g>

          {/* strip view: labels */}
          <g className={FADE_CLASS} style={fade(arranged, 1100)} aria-hidden>
            <Label x={CX2} y={topY - 8} tone="fill-accent">{`top crust = πr ≈ ${sf3(piR)} cm`}</Label>
            <Label x={CX2} y={bottomY + 17} tone="fill-brand">{`bottom crust = πr ≈ ${sf3(piR)} cm`}</Label>
            <line x1={bracketX} x2={bracketX} y1={CY2 - R / 2} y2={CY2 + R / 2} className="stroke-ink" strokeWidth={1.5} />
            <line x1={bracketX - 4} x2={bracketX + 4} y1={CY2 - R / 2} y2={CY2 - R / 2} className="stroke-ink" strokeWidth={1.5} />
            <line x1={bracketX - 4} x2={bracketX + 4} y1={CY2 + R / 2} y2={CY2 + R / 2} className="stroke-ink" strokeWidth={1.5} />
            <Label x={bracketX + 6} y={CY2 + 4} anchor="start">{`≈ r`}</Label>
          </g>
        </svg>

        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className="btn btn-primary" onClick={() => setArranged((a) => !a)} aria-pressed={arranged}>
            {arranged ? "↩ Back to a circle" : "🔀 Rearrange the slices"}
          </button>
          <span className="text-sm text-ink-2">
            Each slice: <strong className="text-ink">{360 / n}°</strong> at the centre
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="col-span-2">
            <Readout label="Area of the slices (the same before and after)" value={<><M>{`${r * r} pi`}</M> ≈ {sf3(area)} cm²</>} />
          </div>
          <Readout label="Strip width" value={<Two main={`${widthCm.toFixed(2)} cm`} sub={`${pct.toFixed(2)}% of πr ≈ ${sf3(piR)}`} />} tone="ink" />
          <Readout label="Strip height" value={<Two main={`${cornerH.toFixed(2)} to ${r} cm`} sub={`heading for r = ${r} cm`} />} tone="ink" />
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <Slider label="Number of slices" value={ni} min={0} max={SLICES.length - 1} onChange={setNi} format={(v) => SLICES[v]} />
          <Slider label="Radius r" value={r} min={2} max={7} onChange={setR} format={(v) => `${v} cm`} />
        </div>
      </div>
    </WidgetFrame>
  );
}

export const widgets: WidgetDef[] = [
  {
    id: "rolling-wheel",
    title: "Roll the wheel",
    blurb: "Roll a wheel through one turn and count how many diameters fit along the ground.",
    Component: RollingWheel,
  },
  {
    id: "slice-and-rearrange",
    title: "Slice & rearrange",
    blurb: "Cut a circle into slices and rebuild it as a near-rectangle to see why A = πr².",
    Component: SliceRearrange,
  },
];
