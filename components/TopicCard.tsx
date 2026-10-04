"use client";
// A topic at a glance: strand accent, icon, title, one-line hook, and the
// learner's mastery bar (same weighting everywhere via lib/mastery.ts).
// Also exports the strand colour map and a small accessible ProgressBar so
// the home and topics pages stay visually consistent.
import Link from "next/link";
import { useMemo, type ReactNode } from "react";
import type { TopicSummary } from "@/lib/server/content";
import { drillsForTopic } from "@/lib/drills";
import { topicMastery, type TopicMastery } from "@/lib/mastery";
import { useStore } from "@/lib/store";
import { RichInline } from "./Rich";

// ---------------------------------------------------------------------------
// Strand styling (full class names so Tailwind can see them)
// ---------------------------------------------------------------------------

export interface StrandStyle {
  /** URL-friendly key, e.g. for /topics?strand=algebra. */
  slug: string;
  /** Strand colour as text (use at ≥ 20 px bold, or on decorative glyphs). */
  text: string;
  /** Solid strand colour fill. */
  bg: string;
  /** Soft tint of the strand colour, for icon tiles. */
  soft: string;
  border: string;
}

export const STRAND_STYLES: Record<string, StrandStyle> = {
  Number: { slug: "number", text: "text-s-number", bg: "bg-s-number", soft: "bg-s-number/15", border: "border-s-number" },
  "Ratio & Proportion": { slug: "ratio", text: "text-s-ratio", bg: "bg-s-ratio", soft: "bg-s-ratio/15", border: "border-s-ratio" },
  Algebra: { slug: "algebra", text: "text-s-algebra", bg: "bg-s-algebra", soft: "bg-s-algebra/15", border: "border-s-algebra" },
  "Geometry & Measure": { slug: "geometry", text: "text-s-geometry", bg: "bg-s-geometry", soft: "bg-s-geometry/15", border: "border-s-geometry" },
  "Statistics & Probability": { slug: "stats", text: "text-s-stats", bg: "bg-s-stats", soft: "bg-s-stats/15", border: "border-s-stats" },
};

const FALLBACK_STYLE: StrandStyle = { slug: "other", text: "text-brand", bg: "bg-brand", soft: "bg-brand-soft", border: "border-brand" };

export function strandStyle(strand: string): StrandStyle {
  return STRAND_STYLES[strand] ?? FALLBACK_STYLE;
}

// ---------------------------------------------------------------------------
// Progress bar
// ---------------------------------------------------------------------------

export function ProgressBar({
  value,
  label,
  valueText,
  barClass = "bg-brand",
  className = "",
  size = "md",
  minVisible = 0,
}: {
  /** 0..1 */
  value: number;
  /** Accessible name, e.g. "Fractions mastery". */
  label: string;
  /** Accessible value, e.g. "8 of 15 minutes". Defaults to the percentage. */
  valueText?: string;
  barClass?: string;
  className?: string;
  size?: "sm" | "md";
  /** Minimum visible fill (0..1) so a started-but-tiny value still shows. */
  minVisible?: number;
}) {
  const clamped = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  const pct = Math.round(clamped * 100);
  const shown = clamped > 0 ? Math.max(clamped, minVisible) : 0;
  return (
    <div
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={pct}
      aria-valuetext={valueText ?? `${pct}%`}
      className={`overflow-hidden rounded-full bg-line/60 ${size === "sm" ? "h-1.5" : "h-2.5"} ${className}`}
    >
      <div className={`h-full rounded-full transition-[width] duration-500 ease-out motion-reduce:transition-none ${barClass}`} style={{ width: `${shown * 100}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Mastery helpers
// ---------------------------------------------------------------------------

/** "42% · 3/7 lessons · 2 skills secure" */
export function masteryLabel(m: TopicMastery): string {
  const parts = [`${m.pct}%`];
  if (m.sectionsTotal > 0) parts.push(`${m.sectionsRead}/${m.sectionsTotal} lessons`);
  if (m.skills.total > 0) {
    const secure = m.skills.secure + m.skills.mastered;
    parts.push(`${secure} skill${secure === 1 ? "" : "s"} secure`);
  }
  return parts.join(" · ");
}

/** Label for a topic not started yet: "Not started · 7 lessons · 5 skills". */
export function newTopicLabel(m: TopicMastery, sep = " · "): string {
  const parts = ["Not started"];
  if (m.sectionsTotal > 0) parts.push(`${m.sectionsTotal} lesson${m.sectionsTotal === 1 ? "" : "s"}`);
  if (m.skills.total > 0) parts.push(`${m.skills.total} skill${m.skills.total === 1 ? "" : "s"}`);
  return parts.join(sep);
}

/** Screen-reader wording of the same label: "42% mastered, 3 of 7 lessons, 2 skills secure". */
export function masterySpoken(m: TopicMastery): string {
  const parts = [`${m.pct}% mastered`];
  if (m.sectionsTotal > 0) parts.push(`${m.sectionsRead} of ${m.sectionsTotal} lessons`);
  if (m.skills.total > 0) {
    const secure = m.skills.secure + m.skills.mastered;
    parts.push(`${secure} skill${secure === 1 ? "" : "s"} secure`);
  }
  return parts.join(", ");
}

/** Mastery for one topic summary using the shared weighting. */
export function useTopicMastery(summary: TopicSummary): TopicMastery {
  const { data } = useStore();
  return useMemo(
    () =>
      topicMastery(
        summary,
        data,
        drillsForTopic(summary.id).map((d) => d.id),
      ),
    [summary, data],
  );
}

// ---------------------------------------------------------------------------
// The card
// ---------------------------------------------------------------------------

type HeadingTag = "h2" | "h3" | "h4";

export function TopicCard({
  summary,
  headingLevel = 3,
  showStrand = true,
  children,
}: {
  summary: TopicSummary;
  /** Heading level for the topic title (fits the page outline). Default 3. */
  headingLevel?: 2 | 3 | 4;
  /** Show the strand name above the title (hide it when already grouped by strand). */
  showStrand?: boolean;
  /** Extra content under the card (links inside stay clickable above the card link). */
  children?: ReactNode;
}) {
  const { focusTopics } = useStore();
  const m = useTopicMastery(summary);
  const style = strandStyle(summary.strand);
  const Heading = `h${headingLevel}` as HeadingTag;
  const focus = focusTopics.includes(summary.id);
  const cta = m.started ? "Continue" : "Start";
  const label = m.started ? masteryLabel(m) : newTopicLabel(m);
  const spoken = m.started ? masterySpoken(m) : newTopicLabel(m, ", ");

  if (!summary.ready) {
    return (
      <article className="card relative flex flex-col gap-3 overflow-hidden p-4 pl-5 opacity-70">
        <span aria-hidden className="absolute inset-y-0 left-0 w-1.5 bg-line" />
        <div className="flex items-start gap-3">
          <span aria-hidden className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-surface-2 text-2xl grayscale">
            {summary.icon}
          </span>
          <div className="min-w-0 flex-1">
            {showStrand ? <p className="text-xs font-bold text-ink-2">{summary.strand}</p> : null}
            <Heading className="font-extrabold leading-snug text-ink">{summary.title}</Heading>
          </div>
        </div>
        <p className="mt-auto">
          <span className="chip">🛠️ Coming soon</span>
        </p>
      </article>
    );
  }

  return (
    <article className="card group relative flex flex-col gap-3 overflow-hidden p-4 pl-5 transition duration-150 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 has-[.topic-link:focus-visible]:ring-2 has-[.topic-link:focus-visible]:ring-brand">
      <span aria-hidden className={`absolute inset-y-0 left-0 w-1.5 ${style.bg}`} />
      <div className="flex items-start gap-3">
        <span aria-hidden className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl ${style.soft}`}>
          {summary.icon}
        </span>
        <div className="min-w-0 flex-1">
          {showStrand ? (
            <p className="flex items-center gap-1.5 text-xs font-bold text-ink-2">
              <span aria-hidden className={`h-2 w-2 rounded-full ${style.bg}`} />
              {summary.strand}
            </p>
          ) : null}
          <Heading className="font-extrabold leading-snug text-ink">
            {/* The link's ::after covers the whole card, so the card is one big target; the ring shows on the card. */}
            <Link href={`/topic/${summary.id}`} className="topic-link outline-none after:absolute after:inset-0 after:z-0">
              {summary.title}
              <span className="sr-only">{` — ${cta}. ${spoken}${focus ? ". Focus topic" : ""}`}</span>
            </Link>
          </Heading>
        </div>
        {focus ? (
          <span className="chip shrink-0 border-0 bg-accent-soft text-warn" aria-hidden>
            📌 Focus
          </span>
        ) : null}
      </div>
      {summary.summary ? (
        <p className="line-clamp-2 text-sm text-ink-2">
          <RichInline text={summary.summary} />
        </p>
      ) : null}
      <div className="mt-auto pt-1" aria-hidden>
        <ProgressBar value={m.pct / 100} label={`${summary.title} mastery`} valueText={spoken} barClass={style.bg} minVisible={m.started ? 0.03 : 0} />
        <div className="mt-2 flex flex-wrap items-center justify-between gap-x-2 gap-y-1 text-xs">
          <span className="min-w-0 tabular-nums text-ink-2">{label}</span>
          <span className="shrink-0 font-bold text-brand group-hover:underline">{cta} →</span>
        </div>
      </div>
      {children ? <div className="relative z-10">{children}</div> : null}
    </article>
  );
}
