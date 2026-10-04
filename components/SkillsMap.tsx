"use client";
// Mastery map of every procedural skill, grouped by strand and topic, with a
// summary, filters and a one-tap "practise my weakest skills" session.
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Strand } from "@/lib/types";
import type { Drill } from "@/lib/drills/types";
import type { SkillState } from "@/lib/profileTypes";
import { ALL_DRILLS } from "@/lib/drills";
import { STRANDS, TOPIC_META, metaById, type TopicMeta } from "@/lib/topics/meta";
import { isRusty, LEVEL_NAMES, skillLevel, type MasteryLevel } from "@/lib/learning";
import { todayISO } from "@/lib/dates";
import { useStore } from "@/lib/store";
import { DrillRunner, LevelBadge, RecentDots } from "./DrillRunner";

type Filter = "all" | "work" | "rusty" | "mastered";

interface Row {
  drill: Drill;
  skill?: SkillState;
  level: MasteryLevel;
  rusty: boolean;
}

interface TopicGroup {
  meta: TopicMeta;
  rows: Row[];
}

const STRAND_DOT: Record<Strand, string> = {
  Number: "bg-s-number",
  "Ratio & Proportion": "bg-s-ratio",
  Algebra: "bg-s-algebra",
  "Geometry & Measure": "bg-s-geometry",
  "Statistics & Probability": "bg-s-stats",
};

const STRAND_BORDER: Record<Strand, string> = {
  Number: "border-l-s-number",
  "Ratio & Proportion": "border-l-s-ratio",
  Algebra: "border-l-s-algebra",
  "Geometry & Measure": "border-l-s-geometry",
  "Statistics & Probability": "border-l-s-stats",
};

/** Same palette as LevelBadge (soft chip) plus a solid colour for the stacked bar. */
const LEVEL_CHIP = ["bg-surface-2 text-ink-2", "bg-info-soft text-info", "bg-good-soft text-good", "bg-accent-soft text-warn"];
const LEVEL_BAR = ["bg-line", "bg-info", "bg-good", "bg-accent"];
const LEVEL_ICON = ["○", "◔", "◑", "★"];
const DRILL_STAGE: Record<1 | 2 | 3, string> = { 1: "Basics", 2: "Core", 3: "Multi-step" };

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "work", label: "Needs work" },
  { id: "rusty", label: "Rusty" },
  { id: "mastered", label: "Mastered" },
];

const EMPTY_FILTER: Record<Filter, string> = {
  all: "",
  work: "Nothing needs work right now. Skills you've started but haven't made secure yet will appear here.",
  rusty: "No rusty skills — everything you've secured is still fresh.",
  mastered: "No mastered skills yet. Get a skill to Secure, then get it right again in your Daily 5 on two days at least 3 days apart.",
};

const WEAKEST_COUNT = 5;

function matches(r: Row, f: Filter): boolean {
  if (f === "work") return r.level === 1 || r.rusty;
  if (f === "rusty") return r.rusty;
  if (f === "mastered") return r.level === 3;
  return true;
}

function strandId(strand: Strand): string {
  return `strand-${strand.toLowerCase().replace(/[^a-z]+/g, "-")}`;
}

function accuracy(s: SkillState | undefined): number {
  return s && s.a > 0 ? s.c / s.a : 0;
}

/**
 * Up to n drills to work on: practised-but-not-mastered (or rusty) skills,
 * lowest level first then lowest accuracy; topped up with new basics
 * (focus topics first, then course order), then anything else.
 */
function pickWeakest(rows: Row[], focus: string[], n: number): Drill[] {
  const order = new Map(TOPIC_META.map((t, i) => [t.id, i]));
  const topicRank = (id: string) => (focus.includes(id) ? -100 + focus.indexOf(id) : order.get(id) ?? 999);
  const practised = rows
    .filter((r) => r.skill && r.skill.a > 0 && (r.level < 3 || r.rusty))
    .sort((x, y) => x.level - y.level || accuracy(x.skill) - accuracy(y.skill) || (x.skill?.lastAt ?? 0) - (y.skill?.lastAt ?? 0));
  const fresh = rows
    .filter((r) => r.level === 0)
    .sort((x, y) => x.drill.level - y.drill.level || topicRank(x.drill.topicId) - topicRank(y.drill.topicId));
  const rest = rows.filter((r) => r.level === 3 && !r.rusty).sort((x, y) => accuracy(x.skill) - accuracy(y.skill));
  const out: Drill[] = [];
  for (const r of [...practised, ...fresh, ...rest]) {
    if (out.length >= n) break;
    if (!out.includes(r.drill)) out.push(r.drill);
  }
  return out;
}

function SummaryChip({ level, count }: { level: number; count: number }) {
  return (
    <span className={`chip border-0 ${LEVEL_CHIP[level]}`}>
      <span className={`h-2.5 w-2.5 rounded-sm ${LEVEL_BAR[level]}`} aria-hidden />
      <span aria-hidden>{LEVEL_ICON[level]}</span> {LEVEL_NAMES[level]} <strong className="tabular-nums text-ink">{count}</strong>
    </span>
  );
}

function SkillRow({ row }: { row: Row }) {
  const { drill, skill, level, rusty } = row;
  const tried = !!skill && skill.a > 0;
  const pct = tried ? Math.round((100 * skill.c) / skill.a) : 0;
  return (
    <li className="flex flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="min-w-0 flex-1">
        <div className="font-bold leading-snug">{drill.title}</div>
        <div className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm">
          <LevelBadge level={level} />
          {rusty ? <span className="chip border-0 bg-warn-soft text-warn">⟳ Rusty — due for review</span> : null}
          {tried ? (
            <>
              <RecentDots recent={skill.recent} />
              <span className="tabular-nums text-ink-2" title={`${skill.c} right out of ${skill.a} (${pct}%)`}>
                <span className="sr-only">Accuracy: </span>
                {skill.c}/{skill.a} right
              </span>
            </>
          ) : (
            <span className="text-ink-2">Not tried yet</span>
          )}
          <span className="text-xs text-ink-2">{DRILL_STAGE[drill.level]}</span>
        </div>
      </div>
      <Link
        href={`/drill/${encodeURIComponent(drill.id)}`}
        className={`btn shrink-0 self-start text-sm sm:self-auto ${rusty ? "btn-primary" : "btn-secondary"}`}
        aria-label={`${rusty ? "Review" : "Practise"} ${drill.title}`}
      >
        {rusty ? "Review" : "Practise"} <span aria-hidden>→</span>
      </Link>
    </li>
  );
}

function TopicCard({ group, ready }: { group: TopicGroup; ready: boolean }) {
  const { meta, rows } = group;
  const secure = rows.filter((r) => r.level >= 2).length;
  const mastered = rows.filter((r) => r.level === 3).length;
  return (
    <article className="card overflow-hidden" aria-labelledby={`skills-topic-${meta.id}`}>
      <header className={`flex items-center gap-3 border-b border-l-4 border-line px-4 py-3 ${STRAND_BORDER[meta.strand]}`}>
        <span className="text-2xl" aria-hidden>
          {meta.icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 id={`skills-topic-${meta.id}`} className="font-extrabold leading-tight">
            {ready ? (
              <Link href={`/topic/${meta.id}?tab=practise`} className="hover:text-brand hover:underline">
                {meta.title}
              </Link>
            ) : (
              meta.title
            )}
          </h3>
          <p className="text-xs text-ink-2">
            {secure} of {rows.length} secure{mastered ? ` · ${mastered} mastered` : ""}
          </p>
        </div>
        <div className="hidden h-2 w-20 overflow-hidden rounded-full bg-surface-2 sm:block" aria-hidden>
          <div className="h-full rounded-full bg-good" style={{ width: `${rows.length ? (100 * secure) / rows.length : 0}%` }} />
        </div>
      </header>
      <ul className="divide-y divide-line">
        {rows.map((r) => (
          <SkillRow key={r.drill.id} row={r} />
        ))}
      </ul>
    </article>
  );
}

interface Session {
  drills: Drill[];
  label: string;
}

/**
 * @param readyTopicIds topics that have a page (a finished guide); others are
 *   shown without a link. Omit to treat every topic as ready.
 */
export function SkillsMap({ readyTopicIds }: { readyTopicIds?: string[] }) {
  // focusTopics (top level) merges the parent's chosen focus with the learner's own.
  const { data, focusTopics } = useStore();
  const [filter, setFilter] = useState<Filter>("all");
  const [session, setSession] = useState<Session | null>(null);
  const ready = useMemo(() => (readyTopicIds ? new Set(readyTopicIds) : null), [readyTopicIds]);

  const rows = useMemo<Row[]>(() => {
    const today = todayISO();
    // Only drills whose topic is in the course outline (they could not be grouped otherwise).
    return ALL_DRILLS.filter((d) => metaById(d.topicId)).map((drill) => {
      const skill = data.skills[drill.id];
      return { drill, skill, level: skillLevel(skill), rusty: isRusty(skill, today) };
    });
  }, [data.skills]);

  const counts = useMemo(() => {
    const byLevel = [0, 0, 0, 0];
    let rusty = 0;
    for (const r of rows) {
      byLevel[r.level]++;
      if (r.rusty) rusty++;
    }
    return { byLevel, rusty, total: rows.length, practised: rows.length - byLevel[0] };
  }, [rows]);

  const filterCounts = useMemo(() => {
    const out: Record<Filter, number> = { all: 0, work: 0, rusty: 0, mastered: 0 };
    for (const r of rows) for (const f of FILTERS) if (matches(r, f.id)) out[f.id]++;
    return out;
  }, [rows]);

  const strands = useMemo(() => {
    const byTopic = new Map<string, Row[]>();
    for (const r of rows) {
      if (!matches(r, filter)) continue;
      const list = byTopic.get(r.drill.topicId) ?? [];
      list.push(r);
      byTopic.set(r.drill.topicId, list);
    }
    return STRANDS.map((strand) => ({
      strand,
      topics: TOPIC_META.filter((t) => t.strand === strand && byTopic.has(t.id)).map<TopicGroup>((meta) => ({
        meta,
        rows: [...(byTopic.get(meta.id) ?? [])].sort((a, b) => a.drill.level - b.drill.level),
      })),
    })).filter((s) => s.topics.length > 0);
  }, [rows, filter]);

  const weakestCount = Math.min(WEAKEST_COUNT, counts.total);
  const skillsWord = (n: number) => (n === 1 ? "skill" : "skills");

  function startWeakest() {
    const picked = pickWeakest(rows, focusTopics, WEAKEST_COUNT);
    if (!picked.length) return;
    const n = picked.length;
    const label = counts.practised === 0 ? `${n} ${skillsWord(n)} to start with` : n === 1 ? "Your weakest skill" : `Your ${n} weakest skills`;
    setSession({ drills: picked, label });
    window.scrollTo({ top: 0 });
  }

  function endSession() {
    setSession(null);
    window.scrollTo({ top: 0 });
  }

  if (session) {
    const { drills, label } = session;
    return (
      <div className="space-y-4">
        <button type="button" className="btn btn-ghost -ml-2 text-sm" onClick={endSession}>
          <span aria-hidden>←</span> Back to the skills map
        </button>
        <h1 className="sr-only">{label}</h1>
        <DrillRunner drills={drills} title={label} onExit={endSession} />
        <section className="card p-4" aria-labelledby="weakest-list">
          <h2 id="weakest-list" className="text-sm font-bold text-ink-2">
            In this session
          </h2>
          <ul className="mt-2 flex flex-wrap gap-2">
            {drills.map((d) => (
              <li key={d.id} className="chip">
                {d.title}
              </li>
            ))}
          </ul>
        </section>
      </div>
    );
  }

  const { byLevel, rusty, total } = counts;
  const secureOrBetter = byLevel[2] + byLevel[3];
  const barLabel = `${byLevel.map((n, i) => `${n} ${LEVEL_NAMES[i]}`).join(", ")}${rusty ? `; ${rusty} rusty` : ""}`;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">Skills map</h1>
        <p className="mt-1 text-ink-2">Every skill in the course and how secure it is. Practise a skill to move it from New all the way to Mastered.</p>
      </header>

      {total === 0 ? (
        <div className="card p-6 text-center">
          <div className="text-4xl" aria-hidden>
            🛠️
          </div>
          <h2 className="mt-2 text-lg font-extrabold">Skill drills are on their way</h2>
          <p className="mt-1 text-ink-2">There aren&apos;t any skill drills yet. In the meantime, the topics have lessons and practice papers to work through.</p>
          <Link href="/topics" className="btn btn-primary mt-4">
            Browse topics
          </Link>
        </div>
      ) : (
        <>
          <section className="card space-y-4 p-4 sm:p-5" aria-labelledby="skills-summary">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <h2 id="skills-summary" className="text-lg font-extrabold">
                <span className="text-3xl tabular-nums">{secureOrBetter}</span>
                <span className="text-ink-2"> of {total} skills secure or better</span>
              </h2>
            </div>
            <div className="flex h-3 w-full overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`Skills by level: ${barLabel}`}>
              {[3, 2, 1, 0].map((lvl) =>
                byLevel[lvl] ? <div key={lvl} className={`h-full ${LEVEL_BAR[lvl]}`} style={{ width: `${(100 * byLevel[lvl]) / total}%` }} /> : null,
              )}
            </div>
            <div className="flex flex-wrap gap-2">
              {[3, 2, 1, 0].map((lvl) => (
                <SummaryChip key={lvl} level={lvl} count={byLevel[lvl]} />
              ))}
              <span className={`chip border-0 ${rusty ? "bg-warn-soft text-warn" : "bg-surface-2 text-ink-2"}`} title="Secure skills that are due for review">
                <span aria-hidden>⟳</span> Rusty <strong className="tabular-nums text-ink">{rusty}</strong>
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn btn-primary" onClick={startWeakest}>
                <span aria-hidden>🎯</span> Practise my {weakestCount} weakest {skillsWord(weakestCount)}
              </button>
              <span className="text-sm text-ink-2">
                {counts.practised === 0
                  ? "Nothing practised yet, so this starts you on some basic skills."
                  : "Mixed, adaptive practice on the skills that need it most."}
              </span>
            </div>
            <details className="rounded-xl bg-surface-2 px-4 py-3 text-sm">
              <summary className="cursor-pointer font-bold">How levels work</summary>
              <ul className="mt-2 space-y-1.5 text-ink-2">
                <li>
                  <strong className="text-ink">○ New</strong> — not tried yet.
                </li>
                <li>
                  <strong className="text-ink">◔ Practising</strong> — you&apos;ve started; keep going.
                </li>
                <li>
                  <strong className="text-ink">◑ Secure</strong> — 8 of your last 10 right, including level 2 questions.
                </li>
                <li>
                  <strong className="text-ink">★ Mastered</strong> — secure, and right again in your Daily 5 on two days at least 3 days apart.
                </li>
                <li>
                  <strong className="text-ink">⟳ Rusty</strong> — a secure skill that&apos;s due for review. A few quick questions brings it back.
                </li>
              </ul>
            </details>
          </section>

          <div role="group" aria-label="Filter skills" className="flex flex-wrap gap-2">
            {FILTERS.map((f) => {
              const on = filter === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(f.id)}
                  className={`btn text-sm ${on ? "btn-primary" : "btn-secondary"}`}
                >
                  {f.label}
                  <span className={`rounded-full px-1.5 text-xs tabular-nums ${on ? "bg-brand-ink/15" : "bg-surface-2 text-ink-2"}`}>{filterCounts[f.id]}</span>
                </button>
              );
            })}
          </div>

          {strands.length === 0 ? (
            <p className="card p-5 text-center text-ink-2" role="status">
              {EMPTY_FILTER[filter]}
            </p>
          ) : (
            strands.map(({ strand, topics }) => (
              <section key={strand} className="space-y-3" aria-labelledby={strandId(strand)}>
                <h2 id={strandId(strand)} className="section-title flex items-center gap-2">
                  <span className={`h-3 w-3 rounded-full ${STRAND_DOT[strand]}`} aria-hidden />
                  {strand}
                </h2>
                {topics.map((g) => (
                  <TopicCard key={g.meta.id} group={g} ready={!ready || ready.has(g.meta.id)} />
                ))}
              </section>
            ))
          )}
        </>
      )}
    </div>
  );
}
