"use client";
// A small, accessible daily bar chart (one series). Columns grow from a single
// baseline, the selected/latest day is emphasised, an optional goal line gives
// context, and a readout above the plot shows the hovered/tapped day. The same
// numbers always exist as a table: hidden for screen readers by default, and
// shown on screen with the "Table" toggle (keyboard friendly).
import { useId, useState } from "react";

export interface MiniBar {
  /** Short axis label, e.g. "M" or "28". */
  label: string;
  value: number;
  /** Secondary detail for the readout and table, e.g. "12 answered". */
  sub?: string;
  /** Full label for the readout and table, e.g. "Mon 28 Sep". Defaults to `label`. */
  full?: string;
}

interface Props {
  data: MiniBar[];
  /** Unit shown after values, e.g. "min". */
  unit: string;
  /** Plot height in px (default 120). */
  height?: number;
  /** Names the chart for assistive tech and the table caption. */
  caption?: string;
  /** Column header for the values in the table (default: the unit). */
  valueLabel?: string;
  /** Optional reference line, e.g. the daily goal. */
  goal?: number;
  goalLabel?: string;
}

const NICE = [1, 2, 3, 4, 5, 6, 8, 10, 12, 15, 20, 25, 30, 40, 45, 50, 60, 75, 90, 100, 120, 150, 180, 240, 300, 360, 480, 600];

function niceCeil(v: number): number {
  for (const n of NICE) if (n >= v) return n;
  return Math.ceil(v / 100) * 100;
}

function fmt(v: number): string {
  return Number.isInteger(v) ? v.toLocaleString("en-GB") : v.toLocaleString("en-GB", { maximumFractionDigits: 1 });
}

export function MiniBars({ data, unit, height = 120, caption = "Daily values", valueLabel, goal, goalLabel = "Goal" }: Props) {
  const [hover, setHover] = useState<number | null>(null);
  const [pinned, setPinned] = useState<number | null>(null);
  const [showTable, setShowTable] = useState(false);
  const tableId = useId();

  if (data.length === 0) return <p className="text-sm text-ink-2">No data yet.</p>;

  const peak = Math.max(0, ...data.map((d) => d.value));
  // Leave headroom above the goal line so its label never meets the top tick.
  const top = niceCeil(Math.max(1, peak, goal && goal > 0 ? goal * 1.15 : 0));
  const focus = hover ?? pinned ?? data.length - 1;
  const cur = data[Math.min(focus, data.length - 1)];
  const hasSub = data.some((d) => d.sub);
  const goalPct = goal && goal > 0 ? Math.min(100, (goal / top) * 100) : null;
  const total = data.reduce((a, d) => a + d.value, 0);

  return (
    <figure className="m-0">
      <div className="flex min-h-10 items-center justify-between gap-2">
        {showTable ? (
          <p className="text-sm text-ink-2">
            Total: <span className="font-bold text-ink">{fmt(total)} {unit}</span>
          </p>
        ) : (
          <p className="min-w-0 text-sm" aria-hidden>
            <span className="font-bold text-ink">{cur.full ?? cur.label}</span>
            <span className="text-ink-2"> · </span>
            <span className="font-bold text-ink">
              {fmt(cur.value)} {unit}
            </span>
            {cur.sub ? <span className="text-ink-2"> · {cur.sub}</span> : null}
          </p>
        )}
        <button
          type="button"
          className={`btn btn-ghost btn-sm min-h-10 shrink-0 ${showTable ? "bg-surface-2 text-ink" : ""}`}
          aria-controls={tableId}
          aria-pressed={showTable}
          onClick={() => setShowTable((s) => !s)}
        >
          Table view
        </button>
      </div>

      {showTable ? null : (
        <div aria-hidden className="mt-1 select-none" onPointerLeave={() => setHover(null)}>
          <div className="relative" style={{ height: height + 8 }}>
            {/* Top gridline, with its value in the right-hand gutter */}
            <div className="absolute left-0 right-11 top-2 border-t border-line" />
            <span className="absolute right-0 top-0 w-10 text-right text-[10px] leading-none tabular-nums text-ink-2">
              {fmt(top)}
              {unit.length <= 4 ? ` ${unit}` : ""}
            </span>
            {goalPct !== null ? (
              <>
                <div className="absolute left-0 right-11 border-t border-ink-2/60" style={{ bottom: (goalPct / 100) * height }} />
                <span
                  className="absolute right-0 w-10 translate-y-1/2 text-right text-[10px] font-bold leading-none text-ink-2"
                  style={{ bottom: (goalPct / 100) * height }}
                >
                  {goalLabel}
                </span>
              </>
            ) : null}
            <div className="absolute bottom-0 left-0 right-11 flex items-end gap-[2px] border-b border-line" style={{ height }}>
              {data.map((d, i) => {
                const pct = (Math.max(0, d.value) / top) * 100;
                const active = i === focus;
                return (
                  <div
                    key={i}
                    className="flex h-full min-w-0 flex-1 cursor-default items-end justify-center"
                    onPointerEnter={(e) => {
                      if (e.pointerType === "mouse") setHover(i);
                    }}
                    onClick={() => setPinned(i)}
                  >
                    {d.value > 0 ? (
                      <div
                        className={`w-full max-w-6 rounded-t-[4px] transition-colors ${active ? "bg-brand" : "bg-brand/45"}`}
                        style={{ height: `max(${pct}%, 3px)` }}
                      />
                    ) : (
                      <div className={`h-[2px] w-full max-w-6 ${active ? "bg-ink-2" : "bg-line"}`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          <div className="mt-1 flex gap-[2px] pr-11">
            {data.map((d, i) => (
              <span
                key={i}
                className={`min-w-0 flex-1 truncate text-center text-[10px] leading-tight ${i === focus ? "font-extrabold text-ink" : "text-ink-2"}`}
              >
                {d.label}
              </span>
            ))}
          </div>
        </div>
      )}

      <div id={tableId} className={showTable ? "mt-2 max-h-80 overflow-y-auto rounded-xl border border-line" : "sr-only"}>
        <table className="w-full text-left text-sm">
          <caption className="sr-only">{caption}</caption>
          <thead className="bg-surface-2 text-xs text-ink-2">
            <tr>
              <th scope="col" className="px-3 py-2 font-bold">
                Day
              </th>
              <th scope="col" className="px-3 py-2 text-right font-bold">
                {valueLabel ?? unit}
              </th>
              {hasSub ? (
                <th scope="col" className="px-3 py-2 text-right font-bold">
                  Detail
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody>
            {data.map((d, i) => (
              <tr key={i} className="border-t border-line">
                <th scope="row" className="px-3 py-1.5 font-semibold">
                  {d.full ?? d.label}
                </th>
                <td className="px-3 py-1.5 text-right tabular-nums">
                  {fmt(d.value)} {unit}
                </td>
                {hasSub ? <td className="px-3 py-1.5 text-right text-ink-2">{d.sub ?? ""}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {goal && goal > 0 ? (
        <figcaption className="sr-only">
          {goalLabel}: {fmt(goal)} {unit}
        </figcaption>
      ) : null}
    </figure>
  );
}
