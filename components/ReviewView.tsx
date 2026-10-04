"use client";
// Spaced review, answer-first. Missed questions come back 1, 3, 7, 16 and 35
// days apart (then graduate); practised skills come back on their own ladder.
// The due list is snapshotted on mount so items don't vanish mid-session.
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { IndexedQuestion } from "@/lib/types";
import type { ProgressDoc } from "@/lib/profileTypes";
import type { Drill } from "@/lib/drills/types";
import { ALL_DRILLS, drillById } from "@/lib/drills";
import { seedFrom } from "@/lib/drills/rng";
import { generateDrillItem, inDays, isDailyDone } from "@/lib/daily";
import { dayDiff, todayISO } from "@/lib/dates";
import { isRusty, skillDue, skillLevel, SKILL_STEPS, SRS_STEPS, topicOfQid } from "@/lib/learning";
import { TOPIC_META, metaById } from "@/lib/topics/meta";
import { useStore } from "@/lib/store";
import { DrillItemCard, type DrillOutcome } from "./DrillItemCard";
import { LevelBadge } from "./DrillRunner";
import { QuestionCard, guideHref, type QuestionOutcome } from "./QuestionCard";
import { fetchQuestions, LoadingCard, QUESTION_BATCH, ResultMark, SOURCE_LABEL, TopicTag } from "./DailyRunner";

const TOPIC_IDS = TOPIC_META.map((t) => t.id);
/** Keep at least this many loaded questions ahead of the learner. */
const LOOKAHEAD = 10;

type ReviewItem =
  | { kind: "question"; qid: string; topicId: string; due: string; reps: number }
  | { kind: "skill"; skillId: string; topicId: string; due: string; tier: 1 | 2 | 3; seed: number; rusty: boolean };

interface ItemResult {
  correct: boolean;
  stars: number;
}

const keyOf = (it: ReviewItem) => (it.kind === "question" ? it.qid : it.skillId);

function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1);
}

function longDate(iso: string): string {
  return parseISO(iso).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
}

function plural(n: number, word: string): string {
  return `${n} ${word}${n === 1 ? "" : "s"}`;
}

/** Oldest first, nudged so the same topic rarely comes twice in a row. */
function interleave(items: ReviewItem[]): ReviewItem[] {
  const rest = items.slice();
  const out: ReviewItem[] = [];
  while (rest.length) {
    const last = out[out.length - 1]?.topicId;
    let k = rest.findIndex((x, i) => i < 4 && x.topicId !== last);
    if (k < 0) k = 0;
    out.push(rest.splice(k, 1)[0]);
  }
  return out;
}

function buildPlan(data: ProgressDoc, today: string, profileKey: string): ReviewItem[] {
  const questions: ReviewItem[] = [];
  for (const [qid, s] of Object.entries(data.srs)) {
    if (!s || s.due > today) continue;
    const topicId = topicOfQid(qid, TOPIC_IDS);
    if (topicId) questions.push({ kind: "question", qid, topicId, due: s.due, reps: s.reps });
  }
  const skills: ReviewItem[] = [];
  for (const d of ALL_DRILLS) {
    const s = data.skills[d.id];
    if (!s || !(skillDue(s, today) || isRusty(s, today))) continue;
    const tier = Math.min(3, Math.max(2, s.tier)) as 2 | 3;
    skills.push({ kind: "skill", skillId: d.id, topicId: d.topicId, due: s.due, tier, seed: seedFrom(`${today}:${profileKey}:review:${d.id}`), rusty: isRusty(s, today) });
  }
  const all = [...questions, ...skills].sort((a, b) => a.due.localeCompare(b.due) || (a.kind === b.kind ? 0 : a.kind === "question" ? -1 : 1) || keyOf(a).localeCompare(keyOf(b)));
  return interleave(all);
}

/** Earliest scheduled review after today (questions and skills), or null. */
function nextDue(data: ProgressDoc, today: string): string | null {
  let best: string | null = null;
  for (const [qid, s] of Object.entries(data.srs)) if (s && s.due > today && topicOfQid(qid, TOPIC_IDS) && (!best || s.due < best)) best = s.due;
  for (const d of ALL_DRILLS) {
    const s = data.skills[d.id];
    if (s && s.a > 0 && s.due && s.due > today && (!best || s.due < best)) best = s.due;
  }
  return best;
}

/** `readyTopicIds`: topics whose lessons exist (lesson links are only offered for these). */
export function ReviewView({ readyTopicIds }: { readyTopicIds?: string[] }) {
  const { activeProfile } = useStore();
  const [today] = useState(todayISO);
  const profileKey = activeProfile?.id ?? "guest";
  return <ReviewSession key={`${profileKey}:${today}`} profileKey={profileKey} today={today} readyTopicIds={readyTopicIds} />;
}

function ReviewSession({ profileKey, today, readyTopicIds }: { profileKey: string; today: string; readyTopicIds?: string[] }) {
  const store = useStore();
  const { data } = store;

  // Snapshot once: answering an item reschedules it, but it stays in this session.
  const [items] = useState(() => buildPlan(store.data, today, profileKey));
  /** qid → question, or null when the server doesn't have it (skipped, not counted). */
  const [qmap, setQmap] = useState<Record<string, IndexedQuestion | null>>({});
  const [loadError, setLoadError] = useState(false);
  const [index, setIndex] = useState(0);
  const [results, setResults] = useState<Record<number, ItemResult>>({});
  const [skipped, setSkipped] = useState<Record<number, true>>({});
  const [stopped, setStopped] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  /** A question the server doesn't have: dropped from the session and not counted. */
  const gone = (it: ReviewItem) => it.kind === "question" && qmap[it.qid] === null;
  /** Skipped items (couldn't load / build) are passed over but still count as due. */
  const passOver = (it: ReviewItem, i: number) => gone(it) || !!skipped[i];

  let cur = index;
  while (cur < items.length && passOver(items[cur], cur)) cur++;

  const live = items.map((it) => !gone(it));
  const validCount = live.filter(Boolean).length;
  const qCount = items.filter((it, i) => live[i] && it.kind === "question").length;
  const sCount = validCount - qCount;
  const answeredIdx = Object.keys(results).map(Number);
  const answered = answeredIdx.length;
  const correctCount = answeredIdx.filter((i) => results[i].correct).length;
  const position = live.slice(0, cur).filter(Boolean).length + 1;
  /** Still to come in this session (what "Keep going" would show). */
  const remaining = items.filter((it, i) => i >= cur && !passOver(it, i) && !results[i]).length;
  /** Still due after this session (includes skipped items). */
  const stillDue = items.filter((_, i) => live[i] && !results[i]).length;
  const firstIndex = items.findIndex((it, i) => !passOver(it, i));

  // Fetch questions in batches, staying a little ahead of the learner.
  const upcoming = items.slice(cur).flatMap((it) => (it.kind === "question" ? [it.qid] : []));
  const unfetched = upcoming.filter((id) => !(id in qmap));
  const loadedAhead = upcoming.filter((id) => !!qmap[id]).length;
  const curItem = items[cur];
  const currentUnfetched = curItem?.kind === "question" && !(curItem.qid in qmap);
  const batchKey = unfetched.length && (currentUnfetched || loadedAhead < LOOKAHEAD) ? unfetched.slice(0, QUESTION_BATCH).join(",") : "";

  useEffect(() => {
    if (!batchKey || loadError) return;
    const ids = batchKey.split(",");
    const ctrl = new AbortController();
    fetchQuestions(ids, ctrl.signal)
      .then((got) => {
        setQmap((prev) => {
          const next = { ...prev };
          for (const id of ids) next[id] = got[id] ?? null;
          return next;
        });
      })
      .catch(() => {
        if (!ctrl.signal.aborted) setLoadError(true);
      });
    return () => ctrl.abort();
  }, [batchKey, loadError]);

  // Bring each new item into view on small screens.
  const viewKey = `${cur}:${stopped}`;
  useEffect(() => {
    try {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    } catch {
      // ignore
    }
  }, [viewKey]);

  const next = useMemo(() => nextDue(data, today), [data, today]);
  const dailyDone = isDailyDone(data, today);

  // ------------------------------------------------------------- actions
  function onQuestionDone(i: number, iq: IndexedQuestion, o: QuestionOutcome) {
    if (results[i]) return;
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
    setResults((r) => (r[i] ? r : { ...r, [i]: { correct: o.correct, stars } }));
  }

  function onSkillDone(i: number, it: Extract<ReviewItem, { kind: "skill" }>, drill: Drill, o: DrillOutcome) {
    if (results[i]) return;
    const res = store.recordSkill({
      skillId: drill.id,
      topicId: drill.topicId,
      correct: o.correct,
      tier: it.tier,
      hinted: o.hinted,
      solutionShown: o.solutionShown,
      mixed: true,
      slip: o.slip,
    });
    setResults((r) => (r[i] ? r : { ...r, [i]: { correct: o.correct, stars: res.stars } }));
    if (res.levelUp === 3) setToast(`★ Mastered: ${drill.title} — it stuck, even mixed in with everything else.`);
    else if (res.levelUp === 2) setToast(`◑ Secure: ${drill.title} — nice work.`);
  }

  function goNext() {
    setToast(null);
    setIndex(cur + 1);
  }

  function skip(i: number) {
    setToast(null);
    setSkipped((s) => ({ ...s, [i]: true }));
  }

  // -------------------------------------------------------------- render
  const stillLoading = unfetched.length > 0 && !loadError;
  if (validCount === 0 && !stillLoading) {
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <section className="card p-6 text-center sm:p-8" aria-labelledby="review-empty-title">
          <div className="text-5xl" aria-hidden>
            ✅
          </div>
          <h1 id="review-empty-title" className="mt-2 text-2xl font-extrabold">
            Nothing due right now
          </h1>
          <p className="mx-auto mt-2 max-w-prose text-ink-2">
            {next ? (
              <>
                Your next review is due <strong className="text-ink">{inDays(today, next)}</strong>
                {dayDiff(today, next) <= 13 ? ` (${longDate(next)})` : ""}.
              </>
            ) : (
              "Nothing is scheduled yet. Questions you miss — and skills you practise — will turn up here at just the right moment."
            )}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link href="/daily" className="btn btn-primary">
              {dailyDone ? "Practise more in the Daily 5" : "Do today's Daily 5"}
            </Link>
            <Link href="/" className="btn btn-ghost">
              Home
            </Link>
          </div>
        </section>
        <HowReviewWorks defaultOpen />
      </div>
    );
  }

  // ---------------------------------------------------------------- end
  if (stopped || cur >= items.length) {
    const reviewed = items.map((it, i) => ({ it, i })).filter(({ i }) => !!results[i]);
    const stars = reviewed.reduce((a, { i }) => a + results[i].stars, 0);
    const allDone = stillDue === 0;
    return (
      <div className="mx-auto max-w-2xl space-y-4">
        <section className="card p-5 text-center sm:p-8" aria-labelledby="review-end-title">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-2">{allDone ? "Review complete" : "Good place to stop"}</p>
          <h1 id="review-end-title" className="mt-1 text-5xl font-black tabular-nums">
            {correctCount}
            <span className="text-ink-2">/{answered}</span>
            <span className="sr-only"> right</span>
          </h1>
          <p className="mx-auto mt-3 max-w-prose">
            {answered === 0
              ? "Nothing answered this time — your review list will be here whenever you're ready."
              : correctCount === answered
                ? "Every one remembered. Each of those now waits longer before it comes back."
                : "The ones that slipped come back tomorrow — getting them right next time is exactly how they stick."}
          </p>
          {!allDone ? <p className="mt-2 text-sm text-ink-2">{plural(stillDue, "item")} still due — they&apos;ll wait for you.</p> : null}
          {stars > 0 ? <p className="mt-3 inline-flex chip border-0 bg-accent-soft text-warn">+{stars} ⭐</p> : null}
        </section>

        {reviewed.length ? (
          <section className="card p-4 sm:p-6" aria-labelledby="review-results-title">
            <h2 id="review-results-title" className="section-title">
              What happens next
            </h2>
            <ul className="mt-2 divide-y divide-line">
              {reviewed.map(({ it, i }) => (
                <ResultRow
                  key={`${keyOf(it)}:${i}`}
                  item={it}
                  result={results[i]}
                  question={it.kind === "question" ? qmap[it.qid] ?? undefined : undefined}
                  lessonReady={!readyTopicIds || readyTopicIds.includes(it.topicId)}
                  data={data}
                  today={today}
                />
              ))}
            </ul>
          </section>
        ) : null}

        <div className="flex flex-wrap gap-2">
          {remaining > 0 ? (
            <button type="button" className="btn btn-primary" onClick={() => setStopped(false)}>
              Keep going
            </button>
          ) : null}
          {!dailyDone ? (
            <Link href="/daily" className={`btn ${remaining > 0 ? "btn-secondary" : "btn-primary"}`}>
              Do today&apos;s Daily 5
            </Link>
          ) : null}
          <Link href="/" className="btn btn-secondary">
            Home
          </Link>
          <Link href="/skills" className="btn btn-ghost">
            Skills map
          </Link>
        </div>
        <HowReviewWorks />
      </div>
    );
  }

  // ---------------------------------------------------------------- run
  const it = items[cur];
  const done = !!results[cur];
  const nextLabel = remaining - (done ? 0 : 1) <= 0 ? "Finish review →" : "Next →";
  const pct = validCount ? Math.round((100 * answered) / validCount) : 0;

  let body: React.ReactNode;
  let meta: React.ReactNode = null;
  if (it.kind === "question") {
    const iq = qmap[it.qid];
    meta = (
      <>
        <span className="chip border-0 bg-info-soft text-info">
          <span aria-hidden>🔁</span> Review {Math.min(it.reps + 1, SRS_STEPS.length)} of {SRS_STEPS.length}
        </span>
        {iq ? <span className="chip">{SOURCE_LABEL[iq.source] ?? "Question"}</span> : null}
      </>
    );
    if (iq) {
      body = <QuestionCard key={`q:${cur}:${it.qid}`} q={iq.question} topicId={iq.topicId} mode="review" onDone={(o) => onQuestionDone(cur, iq, o)} onNext={goNext} nextLabel={nextLabel} />;
    } else if (loadError) {
      body = (
        <div className="card p-5 sm:p-6" role="alert">
          <p className="font-bold">We couldn&apos;t load this question.</p>
          <p className="mt-1 text-sm text-ink-2">Check the internet connection and try again, or skip it for now — it&apos;ll still be due next time.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={() => setLoadError(false)}>
              Try again
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => skip(cur)}>
              Skip for now
            </button>
          </div>
        </div>
      );
    } else {
      body = <LoadingCard label="Loading your review…" />;
    }
  } else {
    meta = (
      <span className={`chip border-0 ${it.rusty ? "bg-warn-soft text-warn" : "bg-info-soft text-info"}`}>
        <span aria-hidden>{it.rusty ? "🧽" : "🧩"}</span> {it.rusty ? "Getting rusty" : "Skill check"}
      </span>
    );
    body = (
      <SkillSlot
        key={`s:${cur}:${it.skillId}`}
        item={it}
        revealed={done}
        level={skillLevel(data.skills[it.skillId])}
        onDone={(drill, o) => onSkillDone(cur, it, drill, o)}
        onNext={goNext}
        nextLabel={nextLabel}
        onSkip={() => skip(cur)}
      />
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <header className="mb-4">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h1 className="text-2xl font-extrabold">Review</h1>
            <p className="text-sm text-ink-2">
              {[qCount ? plural(qCount, "question") : "", sCount ? plural(sCount, "skill") : ""].filter(Boolean).join(" · ")} due
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-ink-2" aria-live="polite">
              {position} of {validCount}
            </span>
            {answered > 0 && remaining > 0 ? (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStopped(true)}>
                Finish for now
              </button>
            ) : null}
          </div>
        </div>
        <div
          className="mt-2 h-2 overflow-hidden rounded-full bg-line"
          role="progressbar"
          aria-label="Review progress"
          aria-valuemin={0}
          aria-valuemax={validCount}
          aria-valuenow={answered}
          aria-valuetext={`${answered} of ${validCount} reviewed`}
        >
          <div className="h-full rounded-full bg-brand transition-[width] duration-300" style={{ width: `${pct}%` }} />
        </div>
      </header>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        {meta}
        {/* Revealed after answering: the topic is a clue, and review is about recalling without one. */}
        {done ? <TopicTag topic={metaById(it.topicId)} /> : null}
      </div>
      <div aria-live="polite">{toast ? <div className="animate-pop mb-3 rounded-xl bg-accent-soft px-4 py-2 font-bold">{toast}</div> : null}</div>
      {body}
      {cur === firstIndex && !done ? (
        <p className="mt-3 text-xs text-ink-2">Answer first, then check — pulling it out of memory is what makes it stick.</p>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------------------

function SkillSlot({
  item,
  revealed,
  level,
  onDone,
  onNext,
  nextLabel,
  onSkip,
}: {
  item: Extract<ReviewItem, { kind: "skill" }>;
  /** Answered: show which skill it was. */
  revealed: boolean;
  level: number;
  onDone: (drill: Drill, o: DrillOutcome) => void;
  onNext: () => void;
  nextLabel: string;
  onSkip: () => void;
}) {
  const drill = drillById(item.skillId);
  const generated = useMemo(() => (drill ? generateDrillItem(drill, item.seed, item.tier) : null), [drill, item.seed, item.tier]);
  if (!drill || !generated) {
    return (
      <div className="card p-5 sm:p-6" role="alert">
        <p className="font-bold">This question couldn&apos;t be built.</p>
        <p className="mt-1 text-sm text-ink-2">Skip it for now — the skill stays on your list.</p>
        <button type="button" className="btn btn-primary mt-4" onClick={onSkip}>
          Skip
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
        revealed ? (
          <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
            <span className="font-extrabold text-ink-2">Skill · {drill.title}</span>
            <LevelBadge level={level} />
          </div>
        ) : null
      }
    />
  );
}

function ResultRow({
  item,
  result,
  question,
  lessonReady,
  data,
  today,
}: {
  item: ReviewItem;
  result: ItemResult;
  question?: IndexedQuestion;
  lessonReady: boolean;
  data: ProgressDoc;
  today: string;
}) {
  const drill = item.kind === "skill" ? drillById(item.skillId) : undefined;
  const label = drill ? drill.title : question ? SOURCE_LABEL[question.source] ?? "Question" : "Question";
  const lesson = !lessonReady
    ? null
    : drill
      ? guideHref(drill.topicId, drill.guideRef) ?? `/topic/${drill.topicId}?tab=learn`
      : question
        ? guideHref(question.topicId, question.question.guideRef) ?? `/topic/${question.topicId}?tab=learn`
        : null;
  let when: string;
  if (item.kind === "question") {
    const s = data.srs[item.qid];
    when = s ? `Back ${inDays(today, s.due)}` : result.correct ? "🎓 Graduated — off your review list" : "Back soon";
  } else {
    const s = data.skills[item.skillId];
    when = s?.due ? `Next check ${inDays(today, s.due)}` : "Back soon";
  }
  return (
    <li className="flex items-start gap-3 py-3">
      <ResultMark correct={result.correct} />
      <div className="min-w-0 flex-1">
        <div className="font-bold">{label}</div>
        <div className="mt-1 flex flex-wrap items-center gap-1.5">
          <TopicTag topic={metaById(item.topicId)} />
          <span className="text-sm text-ink-2">{when}</span>
        </div>
        {!result.correct && (drill || lesson) ? (
          <div className="mt-2 flex flex-wrap gap-2">
            {drill ? (
              <Link href={`/drill/${encodeURIComponent(drill.id)}`} className="btn btn-secondary btn-sm">
                Practise this skill
              </Link>
            ) : null}
            {lesson ? (
              <Link href={lesson} className="btn btn-ghost btn-sm">
                📖 Back to the lesson
              </Link>
            ) : null}
          </div>
        ) : null}
      </div>
    </li>
  );
}

function HowReviewWorks({ defaultOpen = false }: { defaultOpen?: boolean }) {
  const lastSkillGap = SKILL_STEPS[SKILL_STEPS.length - 1];
  return (
    <details className="card p-4 sm:p-5" open={defaultOpen}>
      <summary className="cursor-pointer font-bold">How review works</summary>
      <div className="mt-3 space-y-3 text-sm leading-relaxed">
        <p>Miss a question anywhere in the Lab and it&apos;s booked in here for tomorrow. Each time you get it right, the gap before it comes back grows:</p>
        <ol className="flex flex-wrap items-center gap-1.5" aria-label="Gaps between reviews">
          {SRS_STEPS.map((d, i) => (
            <li key={d} className="flex items-center gap-1.5">
              {i > 0 ? (
                <span className="text-ink-2" aria-hidden>
                  →
                </span>
              ) : null}
              <span className="chip border-0 bg-info-soft text-info">{plural(d, "day")}</span>
            </li>
          ))}
          <li className="flex items-center gap-1.5">
            <span className="text-ink-2" aria-hidden>
              →
            </span>
            <span className="chip border-0 bg-good-soft text-good">🎓 graduated</span>
          </li>
        </ol>
        <p>Miss it again and it simply starts over from tomorrow — that&apos;s the system working, not a failure.</p>
        <p>
          Skills you&apos;ve practised get checked the same way (with gaps up to {lastSkillGap} days), so nothing quietly fades. You always answer before you see the solution: pulling an answer out of memory is what makes it stick.
        </p>
      </div>
    </details>
  );
}
