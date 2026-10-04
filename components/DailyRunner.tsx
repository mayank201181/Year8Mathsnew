"use client";
// Daily 5: five interleaved items from different topics, picked once per day
// from the learner's own data (lib/daily.ts). Mixing topics is harder than
// drilling one — which is exactly why it makes the learning stick.
import Link from "next/link";
import { useEffect, useEffectEvent, useMemo, useState } from "react";
import type { TopicSummary } from "@/lib/server/content";
import type { IndexedQuestion, QuestionSource } from "@/lib/types";
import type { Drill } from "@/lib/drills/types";
import { ALL_DRILLS, drillById, freshSeed } from "@/lib/drills";
import { DAILY_REASONS, generateDrillItem, isDailyDone, itemKey, pickDaily, swapForDrill, type DailyInput, type DailyItem } from "@/lib/daily";
import { lastNDays, localISO, todayISO } from "@/lib/dates";
import { isRusty, skillDue, skillLevel, topicOfQid } from "@/lib/learning";
import { useStore } from "@/lib/store";
import { DrillItemCard, type DrillOutcome } from "./DrillItemCard";
import { LevelBadge } from "./DrillRunner";
import { QuestionCard, guideHref, type QuestionOutcome } from "./QuestionCard";

// ---------------------------------------------------------------------------
// Shared helpers (also used by the Review page)
// ---------------------------------------------------------------------------

/** Max ids per /api/questions request. */
export const QUESTION_BATCH = 60;

function isIndexedQuestion(v: unknown): v is IndexedQuestion {
  if (!v || typeof v !== "object") return false;
  const o = v as Record<string, unknown>;
  const q = o.question as Record<string, unknown> | undefined;
  return (
    typeof o.qid === "string" &&
    typeof o.topicId === "string" &&
    !!q &&
    typeof q === "object" &&
    typeof q.question === "string" &&
    (q.kind === "mcq" || q.kind === "short" || q.kind === "written")
  );
}

/**
 * Load questions by id (batches of ≤60). Ids the server doesn't know are
 * simply absent from the result; network / server errors throw.
 */
export async function fetchQuestions(ids: readonly string[], signal?: AbortSignal): Promise<Record<string, IndexedQuestion>> {
  const out: Record<string, IndexedQuestion> = {};
  const unique = [...new Set(ids)].filter(Boolean);
  for (let i = 0; i < unique.length; i += QUESTION_BATCH) {
    const batch = unique.slice(i, i + QUESTION_BATCH);
    const res = await fetch(`/api/questions?ids=${batch.map(encodeURIComponent).join(",")}`, { signal });
    if (!res.ok) throw new Error(`Questions request failed (${res.status})`);
    const body: unknown = await res.json();
    const qs = body && typeof body === "object" ? (body as { questions?: unknown }).questions : undefined;
    if (!qs || typeof qs !== "object") continue;
    for (const id of batch) {
      const iq = (qs as Record<string, unknown>)[id];
      if (isIndexedQuestion(iq)) out[id] = iq;
    }
  }
  return out;
}

export const SOURCE_LABEL: Record<QuestionSource, string> = {
  quiz: "Quick-check question",
  mcq: "Multiple-choice question",
  practice: "Practice-paper question",
  challenge: "Challenge problem",
  exam: "Exam question",
};

const STRAND_DOT: Record<string, string> = {
  Number: "bg-s-number",
  "Ratio & Proportion": "bg-s-ratio",
  Algebra: "bg-s-algebra",
  "Geometry & Measure": "bg-s-geometry",
  "Statistics & Probability": "bg-s-stats",
};

export function TopicTag({ topic }: { topic?: { title: string; icon: string; strand: string } | null }) {
  if (!topic) return null;
  return (
    <span className="chip max-w-full">
      <span className={`h-2 w-2 shrink-0 rounded-full ${STRAND_DOT[topic.strand] ?? "bg-brand"}`} aria-hidden />
      <span aria-hidden>{topic.icon}</span>
      <span className="truncate">{topic.title}</span>
    </span>
  );
}

const REASON_STYLE: Record<string, { icon: string; cls: string }> = {
  [DAILY_REASONS.focus]: { icon: "🎯", cls: "bg-brand-soft text-brand" },
  [DAILY_REASONS.review]: { icon: "🔁", cls: "bg-info-soft text-info" },
  [DAILY_REASONS.fresh]: { icon: "🌱", cls: "bg-good-soft text-good" },
  [DAILY_REASONS.stretch]: { icon: "🚀", cls: "bg-accent-soft text-warn" },
  [DAILY_REASONS.start]: { icon: "👋", cls: "bg-surface-2 text-ink-2" },
  [DAILY_REASONS.newTopic]: { icon: "✨", cls: "bg-surface-2 text-ink-2" },
};

export function ReasonChip({ reason }: { reason: string }) {
  const s = REASON_STYLE[reason] ?? { icon: "•", cls: "bg-surface-2 text-ink-2" };
  return (
    <span className={`chip border-0 ${s.cls}`}>
      <span aria-hidden>{s.icon}</span>
      {reason}
    </span>
  );
}

/** ✓ / ✗ / – marker with screen-reader text. */
export function ResultMark({ correct }: { correct: boolean | null }) {
  const cls = correct === null ? "bg-surface-2 text-ink-2" : correct ? "bg-good-soft text-good" : "bg-bad-soft text-bad";
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-black ${cls}`}>
      <span aria-hidden>{correct === null ? "–" : correct ? "✓" : "✗"}</span>
      <span className="sr-only">{correct === null ? "Skipped" : correct ? "Correct" : "Not this time"}</span>
    </span>
  );
}

export function LoadingCard({ label = "Getting your question ready…" }: { label?: string }) {
  return (
    <div className="card flex items-center gap-3 p-5 text-ink-2" role="status">
      <span className="h-6 w-6 shrink-0 animate-spin rounded-full border-[3px] border-brand-soft border-t-brand" aria-hidden />
      {label}
    </div>
  );
}

function scrollToTop() {
  try {
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
  } catch {
    // no-op (old browsers / tests)
  }
}

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

/** Last 7 days of Daily 5 completions. */
export function WeekStrip({ daily, today }: { daily: Record<string, { correct: number; total: number; done: boolean }>; today: string }) {
  const days = lastNDays(7);
  const doneCount = days.filter((d) => daily[d]?.done).length;
  return (
    <div className="mt-5">
      <div className="text-xs font-bold uppercase tracking-wide text-ink-2">Last 7 days · {doneCount} done</div>
      <ol className="mt-2 grid grid-cols-7 gap-1.5">
        {days.map((d) => {
          const rec = daily[d];
          const dt = parseISO(d);
          const name = dt.toLocaleDateString("en-GB", { weekday: "short" });
          const long = dt.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
          const status = rec?.done ? `done, ${rec.correct} of ${rec.total}` : d === today ? "not done yet" : "not done";
          return (
            <li key={d} className="flex flex-col items-center gap-1">
              <span
                className={`flex h-9 w-full max-w-10 items-center justify-center rounded-lg text-sm font-extrabold ${
                  rec?.done ? "bg-good-soft text-good" : d === today ? "border-2 border-dashed border-line text-ink-2" : "bg-surface-2 text-ink-2"
                }`}
              >
                <span aria-hidden>{rec?.done ? "✓" : ""}</span>
                <span className="sr-only">{`${long}: ${status}`}</span>
              </span>
              <span className="text-[0.7rem] font-bold text-ink-2" aria-hidden>
                {d === today ? "Today" : name}
              </span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Session state
// ---------------------------------------------------------------------------

type TopicInfo = Pick<TopicSummary, "id" | "title" | "strand" | "icon" | "ready" | "challengeIds">;
type Phase = "intro" | "run" | "end" | "doneToday";

interface ItemResult {
  correct: boolean;
  stars: number;
}

interface RunSet {
  /** "daily" for the day's official set, the seed salt for "Practise more" sets. */
  id: string;
  kind: "daily" | "more";
  items: DailyItem[];
  index: number;
  results: (ItemResult | null)[];
  /** finishDaily has been called for this set. */
  finished: boolean;
  /** Stars returned by finishDaily. */
  bonus: number;
}

interface Session {
  phase: Phase;
  set: RunSet | null;
}

const SAVE_VERSION = 1;

function isDailyItem(x: unknown): x is DailyItem {
  if (!x || typeof x !== "object") return false;
  const o = x as Record<string, unknown>;
  if (typeof o.reason !== "string") return false;
  if (o.kind === "question") return typeof o.qid === "string" && o.qid.length > 0;
  return o.kind === "drill" && typeof o.skillId === "string" && (o.tier === 1 || o.tier === 2 || o.tier === 3) && typeof o.seed === "number";
}

function loadSession(key: string): Session | null {
  try {
    const raw = window.sessionStorage.getItem(key);
    if (!raw) return null;
    const v = JSON.parse(raw) as { v?: unknown; phase?: unknown; set?: Record<string, unknown> | null };
    if (!v || v.v !== SAVE_VERSION || !v.set || typeof v.set !== "object") return null;
    if (v.phase !== "intro" && v.phase !== "run" && v.phase !== "end") return null;
    const s = v.set;
    const items = Array.isArray(s.items) ? s.items.filter(isDailyItem) : [];
    if (!items.length || items.length !== (s.items as unknown[]).length) return null;
    const rawResults = Array.isArray(s.results) ? s.results : [];
    const results: (ItemResult | null)[] = items.map((_, i) => {
      const r = rawResults[i] as { correct?: unknown; stars?: unknown } | null | undefined;
      return r && typeof r.correct === "boolean" ? { correct: r.correct, stars: Math.max(0, Number(r.stars) || 0) } : null;
    });
    let index = Math.max(0, Math.min(items.length, Math.floor(Number(s.index) || 0)));
    // An answered item can't be shown again as answered: move past it.
    while (index < items.length && results[index]) index++;
    const set: RunSet = {
      id: typeof s.id === "string" ? s.id : "daily",
      kind: s.kind === "more" ? "more" : "daily",
      items,
      index,
      results,
      finished: s.finished === true,
      bonus: Math.max(0, Number(s.bonus) || 0),
    };
    const phase: Phase = v.phase === "end" ? (set.finished || set.kind === "more" ? "end" : "run") : v.phase;
    return { phase, set };
  } catch {
    return null;
  }
}

function newSet(id: string, kind: RunSet["kind"], items: DailyItem[]): RunSet {
  return { id, kind, items, index: 0, results: items.map(() => null), finished: false, bonus: 0 };
}

/** Replace unanswered item `index` with a drill (or drop it if none is available). */
function swapAt(set: RunSet, index: number, input: DailyInput): RunSet {
  if (index < 0 || index >= set.items.length || set.results[index]) return set;
  const items = swapForDrill(input, set.items, index);
  if (items.length === set.items.length) return { ...set, items };
  const results = set.results.filter((_, i) => i !== index);
  return { ...set, items, results, index: index < set.index ? set.index - 1 : Math.min(set.index, items.length) };
}

function scoreMessage(correct: number, total: number): string {
  if (!total) return "";
  if (correct === total) return "Every one right — across different topics, with no warning which was coming. That's real understanding.";
  const missed = total - correct;
  if (correct / total >= 0.6) return `Solid work. ${missed === 1 ? "One to look at again" : `${missed} to look at again`} below — mixed sets are meant to feel harder than practising one topic.`;
  return "Good effort. Mixed practice is meant to feel hard, and that struggle is what makes it stick. The ones you missed come back in Review, so they'll get easier.";
}

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function DailyRunner({ summaries }: { summaries: TopicInfo[] }) {
  const { activeProfile } = useStore();
  const [today] = useState(todayISO);
  const profileKey = activeProfile?.id ?? "guest";
  return <DailySession key={`${profileKey}:${today}`} summaries={summaries} profileKey={profileKey} today={today} />;
}

function DailySession({ summaries, profileKey, today }: { summaries: TopicInfo[]; profileKey: string; today: string }) {
  const store = useStore();
  const { data } = store;
  const storageKey = `y8m2:daily:${profileKey}:${today}`;

  const topicById = useMemo(() => new Map(summaries.map((s) => [s.id, s])), [summaries]);
  const topicIds = useMemo(() => summaries.map((s) => s.id), [summaries]);

  const makeInput = (extra?: Partial<DailyInput>): DailyInput => ({
    date: today,
    profileKey,
    data: store.data,
    focusTopics: store.focusTopics,
    drills: ALL_DRILLS,
    summaries,
    ...extra,
  });

  // Build the day's set ONCE (or pick up where this tab left off).
  const [session, setSession] = useState<Session>(() => {
    const restored = typeof window !== "undefined" ? loadSession(storageKey) : null;
    const doneToday = isDailyDone(store.data, today);
    if (restored?.set) {
      const untouchedDaily = restored.set.kind === "daily" && !restored.set.finished && restored.set.results.every((r) => !r);
      if (!(untouchedDaily && doneToday)) return restored;
    }
    if (doneToday) return { phase: "doneToday", set: null };
    return { phase: "intro", set: newSet("daily", "daily", pickDaily(makeInput())) };
  });
  const [questions, setQuestions] = useState<Record<string, IndexedQuestion>>({});
  /** Question ids the server doesn't have (never re-requested). */
  const [missingIds, setMissingIds] = useState<Record<string, true>>({});
  const [loadError, setLoadError] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const set = session.set;

  // Keep this tab's progress through a reload.
  useEffect(() => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify({ v: SAVE_VERSION, ...session }));
    } catch {
      // storage full / disabled: the set just won't survive a reload
    }
  }, [storageKey, session]);

  // Bring the new item into view on small screens.
  const position = `${session.phase}:${set?.id ?? ""}:${set?.index ?? 0}`;
  useEffect(() => {
    scrollToTop();
  }, [position]);

  // Load question items (prefetched while the intro screen is showing).
  const pendingKey = set
    ? [...new Set(set.items.flatMap((it) => (it.kind === "question" && !questions[it.qid] && !missingIds[it.qid] ? [it.qid] : [])))].join(",")
    : "";

  const onQuestionsLoaded = useEffectEvent((ids: string[], got: Record<string, IndexedQuestion>) => {
    setQuestions((prev) => ({ ...prev, ...got }));
    const missing = ids.filter((id) => !got[id]);
    if (!missing.length) return;
    setMissingIds((prev) => {
      const next = { ...prev };
      for (const id of missing) next[id] = true;
      return next;
    });
    // Questions that no longer exist are swapped for a skill drill.
    setSession((prev) => {
      if (!prev.set) return prev;
      const input = makeInput(prev.set.kind === "more" ? { salt: prev.set.id } : undefined);
      let next = prev.set;
      for (const qid of missing) {
        const idx = next.items.findIndex((it, i) => it.kind === "question" && it.qid === qid && !next.results[i]);
        if (idx >= 0) next = swapAt(next, idx, input);
      }
      return next === prev.set ? prev : { ...prev, set: next };
    });
  });

  useEffect(() => {
    if (!pendingKey || loadError) return;
    const ids = pendingKey.split(",");
    const ctrl = new AbortController();
    fetchQuestions(ids, ctrl.signal)
      .then((got) => onQuestionsLoaded(ids, got))
      .catch(() => {
        if (!ctrl.signal.aborted) setLoadError(true);
      });
    return () => ctrl.abort();
  }, [pendingKey, loadError]);

  const dueCount = useMemo(() => {
    let n = 0;
    for (const [qid, s] of Object.entries(data.srs)) if (s.due <= today && topicOfQid(qid, topicIds)) n++;
    for (const d of ALL_DRILLS) if (skillDue(data.skills[d.id], today) || isRusty(data.skills[d.id], today)) n++;
    return n;
  }, [data.srs, data.skills, today, topicIds]);

  function topicOfItem(it: DailyItem): TopicInfo | undefined {
    const id = it.kind === "drill" ? drillById(it.skillId)?.topicId : questions[it.qid]?.topicId ?? topicOfQid(it.qid, topicIds);
    return id ? topicById.get(id) : undefined;
  }

  // ------------------------------------------------------------- actions
  function record(index: number, r: ItemResult) {
    setSession((prev) => {
      if (!prev.set || prev.set.results[index]) return prev;
      return { ...prev, set: { ...prev.set, results: prev.set.results.map((x, i) => (i === index ? r : x)) } };
    });
  }

  function onDrillDone(index: number, drill: Drill, tier: 1 | 2 | 3, o: DrillOutcome) {
    if (!set || set.results[index]) return;
    const res = store.recordSkill({
      skillId: drill.id,
      topicId: drill.topicId,
      correct: o.correct,
      tier,
      hinted: o.hinted,
      solutionShown: o.solutionShown,
      mixed: true,
      slip: o.slip,
    });
    record(index, { correct: o.correct, stars: res.stars });
    if (res.levelUp === 3) setToast(`★ Mastered: ${drill.title} — right in mixed practice on separate days. That's the real test.`);
    else if (res.levelUp === 2) setToast(`◑ Secure: ${drill.title} — nice work.`);
  }

  function onQuestionDone(index: number, iq: IndexedQuestion, o: QuestionOutcome) {
    if (!set || set.results[index]) return;
    const stars = store.recordAnswer({
      qid: iq.qid,
      topicId: iq.topicId,
      difficulty: iq.question.difficulty,
      correct: o.correct,
      hints: o.hints,
      tries: o.tries,
      solutionShown: o.solutionShown,
      slip: o.slip,
      mixed: true,
    });
    record(index, { correct: o.correct, stars });
  }

  function finish() {
    if (!set) return;
    const correct = set.results.filter((r) => r?.correct).length;
    let { bonus, finished } = set;
    if (set.kind === "daily" && !finished) {
      finished = true;
      if (!isDailyDone(store.data, today)) bonus = store.finishDaily(correct, set.items.length);
    }
    setToast(null);
    setSession({ phase: "end", set: { ...set, index: set.items.length, finished, bonus } });
  }

  function next() {
    if (!set) return;
    setToast(null);
    if (set.index + 1 >= set.items.length) finish();
    else setSession({ ...session, set: { ...set, index: set.index + 1 } });
  }

  function swapCurrent() {
    if (!set) return;
    const input = makeInput(set.kind === "more" ? { salt: set.id } : undefined);
    setLoadError(false);
    setSession({ ...session, set: swapAt(set, set.index, input) });
  }

  function startMore() {
    const salt = `more-${freshSeed().toString(36)}`;
    // Steer away from what was just done (this set, plus skills already practised today).
    const avoid = new Set(set ? set.items.map(itemKey) : []);
    for (const [id, s] of Object.entries(store.data.skills)) if (s.lastAt > 0 && localISO(new Date(s.lastAt)) === today) avoid.add(id);
    const items = pickDaily(makeInput({ salt, avoid: [...avoid] }));
    setToast(null);
    setLoadError(false);
    setSession({ phase: "run", set: newSet(salt, "more", items) });
  }

  // -------------------------------------------------------------- render
  if (session.phase === "doneToday" || !set) {
    const rec = data.daily[today];
    return (
      <div className="mx-auto max-w-2xl">
        <section className="card p-5 text-center sm:p-8" aria-labelledby="daily-done-title">
          <div className="text-5xl" aria-hidden>
            ✅
          </div>
          <h1 id="daily-done-title" className="mt-2 text-2xl font-extrabold">
            Today&apos;s Daily 5 is done
          </h1>
          <p className="mt-2 text-ink-2">
            {rec ? (
              <>
                You scored <strong className="text-ink">{rec.correct}/{rec.total}</strong>.{" "}
              </>
            ) : null}
            A fresh mix will be ready tomorrow.
          </p>
          <WeekStrip daily={data.daily} today={today} />
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" className="btn btn-primary" onClick={startMore}>
              Practise more
            </button>
            {dueCount > 0 ? (
              <Link href="/review" className="btn btn-secondary">
                🔁 Review · {dueCount} due
              </Link>
            ) : null}
            <Link href="/" className="btn btn-ghost">
              Home
            </Link>
          </div>
          <p className="mt-4 text-xs text-ink-2">Practise more gives you another mixed set. It doesn&apos;t change today&apos;s score.</p>
        </section>
      </div>
    );
  }

  if (!set.items.length) {
    return (
      <div className="mx-auto max-w-2xl">
        <section className="card p-6 text-center sm:p-8">
          <div className="text-5xl" aria-hidden>
            🧰
          </div>
          <h1 className="mt-2 text-2xl font-extrabold">Nothing to mix yet</h1>
          <p className="mt-2 text-ink-2">The Daily 5 draws on topics and skills that are ready in the Lab. Have a look at the topics and start one — your first mix will follow.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/topics" className="btn btn-primary">
              Browse topics
            </Link>
            <Link href="/" className="btn btn-ghost">
              Home
            </Link>
          </div>
        </section>
      </div>
    );
  }

  const total = set.items.length;
  const title = set.kind === "daily" ? "Daily 5" : "Practise more";

  // ---------------------------------------------------------------- intro
  if (session.phase === "intro") {
    const dateLabel = parseISO(today).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
    return (
      <div className="mx-auto max-w-2xl">
        <section className="card overflow-hidden" aria-labelledby="daily-title">
          <div className="bg-gradient-to-br from-brand to-brand-2 p-5 text-brand-ink sm:p-7">
            <p className="text-xs font-bold uppercase tracking-wide opacity-90">{dateLabel}</p>
            <h1 id="daily-title" className="mt-1 text-2xl font-black sm:text-3xl">
              Your Daily 5
            </h1>
            <p className="mt-2 max-w-prose leading-relaxed">
              5 mixed questions from different topics. Mixing topics is harder than drilling one, which is exactly why it makes the learning stick.
            </p>
          </div>
          <div className="p-5 sm:p-7">
            <h2 className="section-title">Today&apos;s mix</h2>
            <ol className="mt-3 space-y-2">
              {set.items.map((it, i) => (
                <li key={`${itemKey(it)}:${i}`} className="flex flex-wrap items-center gap-2 rounded-xl border border-line bg-surface-2 px-3 py-2">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface text-sm font-extrabold text-ink-2" aria-hidden>
                    {i + 1}
                  </span>
                  <span className="sr-only">{`Item ${i + 1}:`}</span>
                  <ReasonChip reason={it.reason} />
                  <TopicTag topic={topicOfItem(it)} />
                </li>
              ))}
            </ol>
            <p className="mt-4 text-sm text-ink-2">About 10 minutes · +5 ⭐ when you finish · anything you miss comes back in Review.</p>
            <button
              type="button"
              className="btn btn-primary mt-5 w-full sm:w-auto sm:px-8"
              onClick={() => setSession({ ...session, phase: "run" })}
            >
              Start
            </button>
          </div>
        </section>
      </div>
    );
  }

  // ------------------------------------------------------------------ end
  if (session.phase === "end") {
    const correct = set.results.filter((r) => r?.correct).length;
    const answerStars = set.results.reduce((a, r) => a + (r?.stars ?? 0), 0);
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <section className="card p-5 text-center sm:p-8" aria-labelledby="daily-end-title">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-2">{set.kind === "daily" ? "Daily 5 complete" : "Practice set complete"}</p>
          <h1 id="daily-end-title" className="mt-1 text-5xl font-black tabular-nums">
            {correct}
            <span className="text-ink-2">/{total}</span>
            <span className="sr-only"> correct</span>
          </h1>
          <div className="mt-3 flex justify-center gap-1.5" aria-hidden>
            {set.results.map((r, i) => (
              <span key={i} className={`h-2.5 w-8 rounded-full ${r?.correct ? "bg-good" : r ? "bg-bad" : "bg-line"}`} />
            ))}
          </div>
          <p className="mx-auto mt-4 max-w-prose">{scoreMessage(correct, total)}</p>
          {set.bonus > 0 || answerStars > 0 ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {set.bonus > 0 ? <span className="chip border-0 bg-accent-soft text-warn">+{set.bonus} ⭐ for finishing today&apos;s Daily 5</span> : null}
              {answerStars > 0 ? <span className="chip">+{answerStars} ⭐ from your answers</span> : null}
            </div>
          ) : null}
          {set.kind === "daily" ? <WeekStrip daily={data.daily} today={today} /> : null}
        </section>

        <section className="card p-4 sm:p-6" aria-labelledby="daily-items-title">
          <h2 id="daily-items-title" className="section-title">
            How each one went
          </h2>
          <ul className="mt-2 divide-y divide-line">
            {set.items.map((it, i) => (
              <EndRow key={`${itemKey(it)}:${i}`} item={it} result={set.results[i]} topic={topicOfItem(it)} question={it.kind === "question" ? questions[it.qid] : undefined} />
            ))}
          </ul>
          {set.results.some((r) => r && !r.correct) ? (
            <p className="mt-3 text-sm text-ink-2">Anything you missed is booked into Review for tomorrow — that second go is where it sticks.</p>
          ) : null}
        </section>

        <div className="flex flex-wrap gap-2">
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
          <button type="button" className="btn btn-primary" onClick={startMore}>
            Practise more
          </button>
          {dueCount > 0 ? (
            <Link href="/review" className="btn btn-ghost">
              🔁 Review · {dueCount} due
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  // ------------------------------------------------------------------ run
  const cur = set.items[set.index];
  const answered = set.results.filter(Boolean).length;
  const isLast = set.index >= total - 1;
  const nextLabel = isLast ? "See my results →" : "Next question →";
  const cardKey = cur ? `${set.id}:${set.index}:${itemKey(cur)}` : "done";

  let body: React.ReactNode;
  if (!cur) {
    body = (
      <div className="card p-5 text-center sm:p-6">
        <p className="font-bold">That&apos;s all {total} answered.</p>
        <button type="button" className="btn btn-primary mt-4" onClick={finish} autoFocus>
          See my results →
        </button>
      </div>
    );
  } else if (cur.kind === "drill") {
    body = (
      <DrillSlot
        key={cardKey}
        item={cur}
        level={skillLevel(data.skills[cur.skillId])}
        onDone={(drill, o) => onDrillDone(set.index, drill, cur.tier, o)}
        onNext={next}
        nextLabel={nextLabel}
        onSwap={swapCurrent}
      />
    );
  } else {
    const iq = questions[cur.qid];
    if (iq) {
      body = (
        <QuestionCard key={cardKey} q={iq.question} topicId={iq.topicId} mode="review" onDone={(o) => onQuestionDone(set.index, iq, o)} onNext={next} nextLabel={nextLabel} />
      );
    } else if (loadError) {
      body = (
        <div className="card p-5 sm:p-6" role="alert">
          <p className="font-bold">We couldn&apos;t load this question.</p>
          <p className="mt-1 text-sm text-ink-2">Check the internet connection and try again — or swap it for a skill question and keep going.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setLoadError(false)}>
              Try again
            </button>
            <button type="button" className="btn btn-secondary" onClick={swapCurrent}>
              Swap for a skill question
            </button>
          </div>
        </div>
      );
    } else {
      body = <LoadingCard />;
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-3">
        <div className="flex items-center justify-between gap-2">
          <h1 className="text-lg font-extrabold">{title}</h1>
          <span className="text-sm font-bold text-ink-2" aria-live="polite">
            {cur ? `Question ${set.index + 1} of ${total}` : `${answered} of ${total} answered`}
          </span>
        </div>
        <ol className="mt-2 flex gap-1.5" aria-label={`Progress: ${answered} of ${total} answered`}>
          {set.results.map((r, i) => (
            <li
              key={i}
              className={`h-2 flex-1 rounded-full transition-colors ${r ? (r.correct ? "bg-good" : "bg-bad") : i === set.index ? "bg-brand" : "bg-line"}`}
            >
              <span className="sr-only">{`Question ${i + 1}: ${r ? (r.correct ? "correct" : "not this time") : i === set.index ? "current" : "to do"}`}</span>
            </li>
          ))}
        </ol>
      </header>
      {cur ? (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <ReasonChip reason={cur.reason} />
          <TopicTag topic={topicOfItem(cur)} />
        </div>
      ) : null}
      <div aria-live="polite">{toast ? <div className="animate-pop mb-3 rounded-xl bg-accent-soft px-4 py-2 font-bold">{toast}</div> : null}</div>
      {body}
    </div>
  );
}

// ---------------------------------------------------------------------------

function DrillSlot({
  item,
  level,
  onDone,
  onNext,
  nextLabel,
  onSwap,
}: {
  item: Extract<DailyItem, { kind: "drill" }>;
  level: number;
  onDone: (drill: Drill, o: DrillOutcome) => void;
  onNext: () => void;
  nextLabel: string;
  onSwap: () => void;
}) {
  const drill = drillById(item.skillId);
  const generated = useMemo(() => (drill ? generateDrillItem(drill, item.seed, item.tier) : null), [drill, item.seed, item.tier]);
  if (!drill || !generated) {
    return (
      <div className="card p-5 sm:p-6" role="alert">
        <p className="font-bold">This question couldn&apos;t be built.</p>
        <p className="mt-1 text-sm text-ink-2">No harm done — swap it for another skill question.</p>
        <button type="button" className="btn btn-primary mt-4" onClick={onSwap}>
          Give me a different one
        </button>
      </div>
    );
  }
  return (
    <DrillItemCard
      item={generated}
      onDone={(o) => onDone(drill, o)}
      onNext={onNext}
      nextLabel={nextLabel}
      header={
        <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="font-extrabold text-ink-2">Skill · {drill.title}</span>
          <LevelBadge level={level} />
        </div>
      }
    />
  );
}

function EndRow({ item, result, topic, question }: { item: DailyItem; result: ItemResult | null; topic?: TopicInfo; question?: IndexedQuestion }) {
  const drill = item.kind === "drill" ? drillById(item.skillId) : undefined;
  const label = drill ? drill.title : question ? SOURCE_LABEL[question.source] ?? "Question" : "Question";
  const lesson = drill
    ? topic?.ready
      ? guideHref(drill.topicId, drill.guideRef)
      : null
    : question
      ? guideHref(question.topicId, question.question.guideRef) ?? (topic?.ready ? `/topic/${question.topicId}?tab=learn` : null)
      : null;
  return (
    <li className="flex items-start gap-3 py-3">
      <ResultMark correct={result ? result.correct : null} />
      <div className="min-w-0 flex-1">
        <div className="font-bold">{label}</div>
        <div className="mt-1 flex flex-wrap gap-1.5">
          <ReasonChip reason={item.reason} />
          <TopicTag topic={topic} />
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {drill ? (
            <Link href={`/drill/${encodeURIComponent(drill.id)}`} className="btn btn-secondary btn-sm">
              Practise this skill
            </Link>
          ) : null}
          {question?.source === "challenge" && topic?.ready ? (
            <Link href={`/topic/${question.topicId}?tab=challenge`} className="btn btn-secondary btn-sm">
              More challenges
            </Link>
          ) : null}
          {lesson ? (
            <Link href={lesson} className="btn btn-ghost btn-sm">
              📖 Back to the lesson
            </Link>
          ) : null}
        </div>
      </div>
    </li>
  );
}
