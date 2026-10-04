"use client";
// One topic: header with mastery, then five tabs —
// Learn (lesson) · Practise (quick check, skill drills, papers) · Challenge ·
// Explore (interactive widgets) · Revise (flashcards & revision lists).
// The tab (and an open practice runner) live in the URL: ?tab=…&open=…
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, type KeyboardEvent, type MouseEvent } from "react";
import type { Paper, Question, Topic, TopicExtras } from "@/lib/types";
import type { AttemptState } from "@/lib/profileTypes";
import type { Drill } from "@/lib/drills/types";
import { useStore } from "@/lib/store";
import { metaById } from "@/lib/topics/meta";
import { drillsForTopic } from "@/lib/drills";
import { isRusty, skillLevel } from "@/lib/learning";
import { topicMastery, type TopicMastery, type TopicShape } from "@/lib/mastery";
import { PaperRunner } from "./PaperRunner";
import { DrillRunner, LevelBadge, RecentDots } from "./DrillRunner";
import { GuideView } from "./GuideView";
import { InteractiveTab } from "./InteractiveTab";
import { LearnSmart } from "./LearnSmart";
import { RichInline } from "./Rich";

export interface TopicLink {
  id: string;
  title: string;
  icon?: string;
}

export type TopicTab = "learn" | "practise" | "challenge" | "explore" | "revise";

const TABS: { id: TopicTab; label: string; icon: string }[] = [
  { id: "learn", label: "Learn", icon: "📖" },
  { id: "practise", label: "Practise", icon: "✏️" },
  { id: "challenge", label: "Challenge", icon: "🧗" },
  { id: "explore", label: "Explore", icon: "🎛️" },
  { id: "revise", label: "Revise", icon: "🧠" },
];

const parseTab = (v: string | null): TopicTab => (TABS.some((t) => t.id === v) ? (v as TopicTab) : "learn");

/** Sticky site header height (h-14 + 1px border). */
const HEADER_OFFSET = 57;

const STRAND_STYLE: Record<string, { text: string; soft: string; border: string; bar: string }> = {
  Number: { text: "text-s-number", soft: "bg-s-number/10", border: "border-s-number/30", bar: "bg-s-number" },
  "Ratio & Proportion": { text: "text-s-ratio", soft: "bg-s-ratio/10", border: "border-s-ratio/30", bar: "bg-s-ratio" },
  Algebra: { text: "text-s-algebra", soft: "bg-s-algebra/10", border: "border-s-algebra/30", bar: "bg-s-algebra" },
  "Geometry & Measure": { text: "text-s-geometry", soft: "bg-s-geometry/10", border: "border-s-geometry/30", bar: "bg-s-geometry" },
  "Statistics & Probability": { text: "text-s-stats", soft: "bg-s-stats/10", border: "border-s-stats/30", bar: "bg-s-stats" },
};

/** In-app URL for a topic tab (optionally with an open practice runner or a hash). */
function topicHref(id: string, tab: TopicTab, open?: string | null, hash?: string): string {
  const sp = new URLSearchParams({ tab });
  if (open) sp.set("open", open);
  return `/topic/${id}?${sp.toString()}${hash ? `#${hash}` : ""}`;
}

const isPlainClick = (e: MouseEvent) => e.button === 0 && !e.metaKey && !e.ctrlKey && !e.shiftKey && !e.altKey;

// ---------------------------------------------------------------------------
// Practice runners (quick check / one paper / drills) opened inside the tab
// ---------------------------------------------------------------------------

type Runner =
  | { kind: "quiz"; label: string }
  | { kind: "paper"; label: string; paper: Paper }
  | { kind: "drills"; label: string; drills: Drill[] };

function resolveRunner(topic: Topic, drills: Drill[], open: string | null): Runner | null {
  if (!open) return null;
  if (open === "quiz") return topic.quiz.length ? { kind: "quiz", label: "Quick check" } : null;
  if (open === "mix") return drills.length ? { kind: "drills", label: "Mixed skills", drills } : null;
  if (open.startsWith("drill:")) {
    const d = drills.find((x) => x.id === open.slice(6));
    return d ? { kind: "drills", label: d.title, drills: [d] } : null;
  }
  if (open.startsWith("paper:")) {
    const id = open.slice(6);
    const p = [...topic.mcqPapers, ...topic.practicePapers].find((x) => x.id === id);
    return p ? { kind: "paper", label: p.title, paper: p } : null;
  }
  return null;
}

interface AttemptInfo {
  state: "new" | "progress" | "done";
  text: string;
  /** Questions answered. */
  done: number;
  /** Score so far, 0..100. */
  pct: number;
}

function attemptInfo(a: AttemptState | undefined, qs: Question[]): AttemptInfo {
  const total = qs.length;
  if (!a) return { state: "new", text: "Not started", done: 0, pct: 0 };
  const done = qs.filter((q) => a.results[q.id]).length;
  const score = qs.reduce((s, q) => s + (a.results[q.id]?.r ?? 0), 0);
  const pct = total ? Math.round((score / total) * 100) : 0;
  if (a.completed) return { state: "done", text: `Completed — ${pct}%`, done, pct };
  return { state: "progress", text: `In progress — question ${Math.min(a.index + 1, Math.max(1, total))} of ${total}`, done, pct };
}

const ACTION_LABEL: Record<AttemptInfo["state"], string> = { new: "Start", progress: "Continue", done: "See results" };

function statusClass(info: AttemptInfo): string {
  if (info.state === "new") return "text-ink-2";
  if (info.state === "progress") return "text-info";
  return info.pct >= 70 ? "text-good" : info.pct >= 40 ? "text-warn" : "text-bad";
}

function ProgressLine({ info, total }: { info: AttemptInfo; total: number }) {
  if (info.state !== "progress" || !total) return null;
  return (
    <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-surface-2" aria-hidden>
      <div className="h-full rounded-full bg-info" style={{ width: `${(info.done / total) * 100}%` }} />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Practise tab
// ---------------------------------------------------------------------------

function PractiseTab({
  topic,
  drills,
  runner,
  onOpen,
  onLesson,
}: {
  topic: Topic;
  drills: Drill[];
  runner: Runner | null;
  onOpen: (open: string | null) => void;
  onLesson: (sectionId: string) => void;
}) {
  const { data } = useStore();
  const close = () => onOpen(null);

  if (runner) {
    return (
      <div className="space-y-3">
        <button type="button" className="btn btn-ghost btn-sm -ml-2" onClick={close}>
          ← Back to practice
        </button>
        {runner.kind === "quiz" ? (
          <PaperRunner key="quiz" attemptKey={`quiz:${topic.id}`} title="Quick check" questions={topic.quiz} topicId={topic.id} onExit={close} />
        ) : runner.kind === "paper" ? (
          <PaperRunner
            key={runner.paper.id}
            attemptKey={`paper:${runner.paper.id}`}
            title={runner.paper.title}
            questions={runner.paper.questions}
            topicId={topic.id}
            onExit={close}
          />
        ) : (
          <DrillRunner
            key={runner.drills.map((d) => d.id).join(",")}
            drills={runner.drills}
            title={runner.drills.length > 1 ? `Mixed skills · ${topic.title}` : `Skill drill · ${topic.title}`}
            onExit={close}
          />
        )}
      </div>
    );
  }

  const quiz = attemptInfo(data.attempts[`quiz:${topic.id}`], topic.quiz);
  const papers: { paper: Paper; mcq: boolean }[] = [
    ...topic.mcqPapers.map((paper) => ({ paper, mcq: true })),
    ...topic.practicePapers.map((paper) => ({ paper, mcq: false })),
  ];

  return (
    <div className="space-y-6">
      {topic.quiz.length ? (
        <section aria-labelledby="pr-quick" className="card p-4 sm:p-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <h2 id="pr-quick" className="section-title">
                ⚡ Quick check
              </h2>
              <p className="text-sm text-ink-2">{topic.quiz.length} mixed question{topic.quiz.length === 1 ? "" : "s"} to see where you are — instant feedback, with hints if you get stuck.</p>
              <p className={`mt-1 text-sm font-bold ${statusClass(quiz)}`}>{quiz.text}</p>
              <ProgressLine info={quiz} total={topic.quiz.length} />
            </div>
            <button type="button" className="btn btn-primary shrink-0" onClick={() => onOpen("quiz")}>
              {ACTION_LABEL[quiz.state]}
            </button>
          </div>
        </section>
      ) : null}

      <section aria-labelledby="pr-drills" className="card p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <h2 id="pr-drills" className="section-title">
              🎯 Skill drills
            </h2>
            <p className="text-sm text-ink-2">Endless fresh questions that adapt as you go. Get each skill to Secure, then Mastered.</p>
          </div>
          {drills.length > 1 ? (
            <button type="button" className="btn btn-secondary shrink-0" onClick={() => onOpen("mix")}>
              🔀 Mix all skills
            </button>
          ) : null}
        </div>
        {drills.length ? (
          <ul className="mt-3 divide-y divide-line">
            {drills.map((d) => {
              const s = data.skills[d.id];
              return (
                <li key={d.id} className="flex flex-wrap items-center gap-x-3 gap-y-2 py-3">
                  <div className="min-w-0 flex-1 basis-56">
                    <div className="font-bold leading-snug">{d.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                      <LevelBadge level={skillLevel(s)} />
                      {s ? <RecentDots recent={s.recent} /> : null}
                      {isRusty(s) ? <span className="chip border-0 bg-warn-soft text-warn">Due a refresh</span> : null}
                    </div>
                  </div>
                  <div className="ml-auto flex shrink-0 items-center gap-1.5">
                    {d.guideRef ? (
                      <a
                        href={topicHref(topic.id, "learn", null, `sec-${d.guideRef}`)}
                        className="btn btn-ghost btn-sm"
                        aria-label={`Lesson for ${d.title}`}
                        onClick={(e) => {
                          if (!isPlainClick(e)) return;
                          e.preventDefault();
                          onLesson(d.guideRef as string);
                        }}
                      >
                        📖 <span className="hidden sm:inline">Lesson</span>
                      </a>
                    ) : null}
                    <button type="button" className="btn btn-primary btn-sm" onClick={() => onOpen(`drill:${d.id}`)} aria-label={`Practise ${d.title}`}>
                      Practise
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-2">Skill drills for this topic are coming soon — the quick check and papers are ready now.</p>
        )}
      </section>

      <section aria-labelledby="pr-papers">
        <h2 id="pr-papers" className="section-title">
          📝 Practice papers
        </h2>
        <p className="text-sm text-ink-2">Multiple-choice papers first, then papers with short and written answers. Your place is saved as you go.</p>
        {papers.length ? (
          <ul className="mt-3 grid gap-3 sm:grid-cols-2">
            {papers.map(({ paper, mcq }) => {
              const info = attemptInfo(data.attempts[`paper:${paper.id}`], paper.questions);
              return (
                <li key={paper.id} className="card flex flex-col p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-extrabold leading-snug">{paper.title}</h3>
                    <span className={`chip shrink-0 border-0 ${mcq ? "bg-info-soft text-info" : "bg-brand-soft text-brand"}`}>{mcq ? "Multiple choice" : "Short & written"}</span>
                  </div>
                  <div className="mt-1 text-sm text-ink-2">
                    {paper.questions.length} question{paper.questions.length === 1 ? "" : "s"}
                  </div>
                  <div className={`mt-2 text-sm font-bold ${statusClass(info)}`}>{info.text}</div>
                  <ProgressLine info={info} total={paper.questions.length} />
                  <div className="mt-auto pt-3">
                    <button
                      type="button"
                      className={`btn btn-sm ${info.state === "progress" ? "btn-primary" : "btn-secondary"}`}
                      onClick={() => onOpen(`paper:${paper.id}`)}
                      aria-label={`${ACTION_LABEL[info.state]}: ${paper.title}`}
                    >
                      {ACTION_LABEL[info.state]}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="mt-3 text-sm text-ink-2">Practice papers for this topic are on their way.</p>
        )}
      </section>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Challenge tab
// ---------------------------------------------------------------------------

function ChallengeTab({ topic }: { topic: Topic }) {
  const { data, setBest } = useStore();
  const total = topic.challenge.length;
  const solved = topic.challenge.filter((q) => data.solved[q.id]).length;

  useEffect(() => {
    if (solved > 0) setBest(`challenge:${topic.id}`, solved);
  }, [solved, topic.id, setBest]);

  return (
    <div className="space-y-5">
      <section aria-labelledby="ch-intro" className="card p-4 sm:p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-xl" aria-hidden>
            🧗
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="ch-intro" className="section-title">
              Challenge problems
            </h2>
            <p className="text-ink-2">AoPS-style problems that need an idea, not just a method — use the hints, they&apos;re part of the training.</p>
          </div>
        </div>
        {total ? (
          <div className="mt-4">
            <div className="flex items-baseline justify-between text-sm">
              <span className="font-bold text-ink-2" id="ch-solved">
                Solved
              </span>
              <span className="font-extrabold tabular-nums">
                {solved} of {total}
              </span>
            </div>
            <div
              className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-labelledby="ch-solved"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={solved}
            >
              <div className="h-full rounded-full bg-accent transition-[width] duration-500" style={{ width: `${(solved / total) * 100}%` }} />
            </div>
          </div>
        ) : null}
      </section>
      {total ? (
        <PaperRunner key={`challenge:${topic.id}`} attemptKey={`challenge:${topic.id}`} title="Challenge problems" questions={topic.challenge} topicId={topic.id} />
      ) : (
        <div className="card p-6 text-center text-ink-2">Challenge problems for this topic are on their way.</div>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Header pieces
// ---------------------------------------------------------------------------

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs font-bold text-ink-2">{label}</dt>
      <dd className="font-extrabold tabular-nums">
        {value}
        {sub ? <span className="ml-1 text-xs font-semibold text-ink-2">· {sub}</span> : null}
      </dd>
    </div>
  );
}

function MasteryCard({ m, challengeTotal, barClass }: { m: TopicMastery; challengeTotal: number; barClass: string }) {
  return (
    <div className="card mt-4 p-4">
      <div className="flex items-center justify-between gap-3">
        <span id="tv-mastery" className="text-sm font-bold text-ink-2">
          Topic mastery
        </span>
        <span className="text-xl font-black tabular-nums">{m.pct}%</span>
      </div>
      <div
        className="mt-2 h-2.5 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-labelledby="tv-mastery"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={m.pct}
      >
        <div className={`h-full rounded-full ${barClass} transition-[width] duration-700`} style={{ width: `${m.pct}%` }} />
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm sm:grid-cols-4">
        <Stat label="Lessons understood" value={`${m.sectionsRead}/${m.sectionsTotal}`} />
        <Stat label="Skills secure" value={m.skills.total ? `${m.skills.secure + m.skills.mastered}/${m.skills.total}` : "—"} />
        <Stat label="Questions solved" value={String(m.solved)} sub={m.accuracy !== null ? `${Math.round(m.accuracy * 100)}% right` : undefined} />
        <Stat label="Challenges solved" value={`${m.challengeSolved}/${challengeTotal}`} />
      </dl>
    </div>
  );
}

// ---------------------------------------------------------------------------
// The view
// ---------------------------------------------------------------------------

export function TopicView({
  topic,
  extras,
  neighbours,
}: {
  topic: Topic;
  extras: TopicExtras;
  neighbours: { prev: TopicLink | null; next: TopicLink | null };
}) {
  const searchParams = useSearchParams();
  const tab = parseTab(searchParams.get("tab"));
  const openParam = tab === "practise" ? searchParams.get("open") : null;
  const { data, setLast } = useStore();
  const anchorRef = useRef<HTMLDivElement>(null);
  const tabListRef = useRef<HTMLDivElement>(null);

  const drills = useMemo(() => drillsForTopic(topic.id), [topic.id]);
  const runner = useMemo(() => resolveRunner(topic, drills, openParam), [topic, drills, openParam]);
  const strand = STRAND_STYLE[topic.strand] ?? STRAND_STYLE.Number;

  const shape = useMemo<TopicShape>(() => {
    const meta = metaById(topic.id);
    const count = (papers: Paper[]) => papers.reduce((a, p) => a + p.questions.length, 0);
    return {
      id: topic.id,
      sections: meta ? meta.sections.map((s) => ({ id: s.id, stretch: !!s.stretch })) : topic.guide.map((s) => ({ id: s.id, stretch: false })),
      challengeIds: topic.challenge.map((q) => q.id),
      counts: { questions: topic.quiz.length + count(topic.mcqPapers) + count(topic.practicePapers) + topic.challenge.length },
    };
  }, [topic]);
  const drillIds = useMemo(() => drills.map((d) => d.id), [drills]);
  const mastery = useMemo(() => topicMastery(shape, data, drillIds), [shape, data, drillIds]);

  /** Keep the tab bar in view after switching (don't leave the reader mid-page). */
  const scrollToTabs = useCallback(() => {
    const el = anchorRef.current;
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    if (window.scrollY > y) window.scrollTo({ top: Math.max(0, y) });
  }, []);

  // The URL is the source of truth for the tab. history.replaceState is integrated with
  // the Next.js router (useSearchParams updates) and switches tabs without a server round trip.
  const selectTab = useCallback(
    (next: TopicTab) => {
      if (next !== tab || openParam) window.history.replaceState(null, "", topicHref(topic.id, next));
      scrollToTabs();
    },
    [tab, openParam, topic.id, scrollToTabs],
  );

  const openRunner = useCallback(
    (open: string | null) => {
      window.history.replaceState(null, "", topicHref(topic.id, "practise", open));
      window.scrollTo({ top: 0 });
    },
    [topic.id],
  );

  // Jump from a drill to its lesson section; pushState so Back returns to the drills.
  const goLesson = useCallback(
    (sectionId: string) => {
      window.history.pushState(null, "", topicHref(topic.id, "learn", null, `sec-${sectionId}`));
      scrollToTabs();
    },
    [topic.id, scrollToTabs],
  );

  // "Continue where you left off" for Home.
  const runnerLabel = runner?.label;
  useEffect(() => {
    if (runnerLabel && openParam) {
      setLast(topicHref(topic.id, "practise", openParam), `${topic.title} · ${runnerLabel}`, topic.id);
    } else {
      const label = TABS.find((t) => t.id === tab)?.label ?? "Learn";
      setLast(topicHref(topic.id, tab), `${topic.title} · ${label}`, topic.id);
    }
  }, [tab, openParam, runnerLabel, topic.id, topic.title, setLast]);

  // Keep the active tab visible in the scrollable tab bar.
  useEffect(() => {
    const list = tabListRef.current;
    const btn = list?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!list || !btn) return;
    const left = btn.offsetLeft;
    const right = left + btn.offsetWidth;
    if (left < list.scrollLeft || right > list.scrollLeft + list.clientWidth) list.scrollTo({ left: Math.max(0, left - 16), behavior: "smooth" });
  }, [tab]);

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    let n = -1;
    if (e.key === "ArrowRight") n = (i + 1) % TABS.length;
    else if (e.key === "ArrowLeft") n = (i - 1 + TABS.length) % TABS.length;
    else if (e.key === "Home") n = 0;
    else if (e.key === "End") n = TABS.length - 1;
    if (n < 0) return;
    e.preventDefault();
    selectTab(TABS[n].id);
    document.getElementById(`tab-${TABS[n].id}`)?.focus();
  }

  const focusMode = !!runner;
  const challengeSolved = mastery.challengeSolved;

  return (
    <div className="pb-4">
      <header>
        <Link href="/topics" className="inline-flex min-h-10 items-center text-sm font-bold text-ink-2 hover:text-ink">
          ← All topics
        </Link>
        <div className={`flex items-start gap-3 sm:gap-4 ${focusMode ? "mt-1" : "mt-2"}`}>
          <div
            className={`flex shrink-0 items-center justify-center rounded-2xl border ${strand.soft} ${strand.border} ${focusMode ? "h-11 w-11 text-2xl" : "h-14 w-14 text-3xl sm:h-16 sm:w-16 sm:text-4xl"}`}
            aria-hidden
          >
            {topic.icon}
          </div>
          <div className="min-w-0 flex-1">
            {!focusMode ? (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className={`chip ${strand.soft} ${strand.text} ${strand.border}`}>{topic.strand}</span>
                {topic.stretch ? <span className="chip border-0 bg-accent-soft text-warn">Stretch topic</span> : null}
              </div>
            ) : null}
            <h1 className={`font-black leading-tight ${focusMode ? "mt-1.5 text-xl" : "mt-1 text-2xl sm:text-3xl"}`}>{topic.title}</h1>
            {!focusMode && topic.summary ? (
              <p className="mt-1 text-ink-2">
                <RichInline text={topic.summary} />
              </p>
            ) : null}
          </div>
        </div>
        {!focusMode ? <MasteryCard m={mastery} challengeTotal={topic.challenge.length} barClass={strand.bar} /> : null}
      </header>

      <div ref={anchorRef} aria-hidden />
      <div className="no-print sticky top-[57px] z-20 -mx-4 mt-4 border-b border-line bg-bg/95 px-4 backdrop-blur">
        <div ref={tabListRef} role="tablist" aria-label="Topic sections" className="nav-scroll relative -mb-px flex gap-1 overflow-x-auto">
          {TABS.map((t, i) => {
            const active = t.id === tab;
            return (
              <button
                key={t.id}
                id={`tab-${t.id}`}
                type="button"
                role="tab"
                aria-selected={active}
                aria-controls="topic-panel"
                tabIndex={active ? 0 : -1}
                onClick={() => selectTab(t.id)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={`flex min-h-11 shrink-0 items-center gap-1.5 whitespace-nowrap border-b-2 px-3 text-sm font-bold transition-colors sm:px-4 ${
                  active ? "border-brand text-brand" : "border-transparent text-ink-2 hover:text-ink"
                }`}
              >
                <span aria-hidden>{t.icon}</span>
                {t.label}
                {t.id === "challenge" && topic.challenge.length ? (
                  <span className={`rounded-full px-1.5 text-xs tabular-nums ${active ? "bg-brand-soft" : "bg-surface-2"}`}>
                    {challengeSolved}/{topic.challenge.length}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      <div id="topic-panel" role="tabpanel" aria-labelledby={`tab-${tab}`} className="mt-5">
        {tab === "learn" ? <GuideView topic={topic} extras={extras} onPractise={() => selectTab("practise")} /> : null}
        {tab === "practise" ? <PractiseTab topic={topic} drills={drills} runner={runner} onOpen={openRunner} onLesson={goLesson} /> : null}
        {tab === "challenge" ? <ChallengeTab topic={topic} /> : null}
        {tab === "explore" ? <InteractiveTab topicId={topic.id} onGoTab={selectTab} /> : null}
        {tab === "revise" ? <LearnSmart topic={topic} /> : null}
      </div>

      {!focusMode && (neighbours.prev || neighbours.next) ? (
        <nav aria-label="Other topics" className="no-print mt-10 grid gap-3 sm:grid-cols-2">
          {neighbours.prev ? (
            <Link href={`/topic/${neighbours.prev.id}`} className="card flex min-h-16 flex-col justify-center p-4 hover:bg-surface-2">
              <span className="text-xs font-bold text-ink-2">← Previous topic</span>
              <span className="font-extrabold leading-snug">
                {neighbours.prev.icon ? <span aria-hidden>{neighbours.prev.icon} </span> : null}
                {neighbours.prev.title}
              </span>
            </Link>
          ) : (
            <span className="hidden sm:block" aria-hidden />
          )}
          {neighbours.next ? (
            <Link href={`/topic/${neighbours.next.id}`} className="card flex min-h-16 flex-col justify-center p-4 text-right hover:bg-surface-2">
              <span className="text-xs font-bold text-ink-2">Next topic →</span>
              <span className="font-extrabold leading-snug">
                {neighbours.next.icon ? <span aria-hidden>{neighbours.next.icon} </span> : null}
                {neighbours.next.title}
              </span>
            </Link>
          ) : null}
        </nav>
      ) : null}
    </div>
  );
}
