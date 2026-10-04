"use client";
// Runs a set of questions: practice (instant feedback, autosave, resume) or
// exam (answers collected, marked at the end, optional timer).
import { useEffect, useMemo, useRef, useState } from "react";
import type { Question } from "@/lib/types";
import type { AttemptState, QResult } from "@/lib/profileTypes";
import { checkAnswer } from "@/lib/answerCheck";
import { useStore } from "@/lib/store";
import { QuestionCard, type QuestionOutcome } from "./QuestionCard";

export interface PaperRunnerProps {
  /** Autosave key, e.g. "paper:fractions-p1". */
  attemptKey: string;
  title: string;
  questions: Question[];
  topicId?: string;
  mode?: "practice" | "exam";
  /** Exam: suggested minutes (shows a countdown; time-up finishes the paper). */
  minutes?: number;
  onExit?: () => void;
  /** Label for the in-paper exit button (default "Save & exit"). */
  exitLabel?: string;
  /** Topic titles for the exam breakdown. */
  topicTitles?: Record<string, string>;
}

function statusOf(r: QResult | undefined): "none" | "right" | "part" | "wrong" {
  if (!r) return "none";
  if (r.r >= 1) return "right";
  if (r.r > 0) return "part";
  return "wrong";
}

const CHIP: Record<string, string> = {
  none: "bg-surface-2 text-ink-2 border-line",
  right: "bg-good-soft text-good border-good",
  part: "bg-warn-soft text-warn border-warn",
  wrong: "bg-bad-soft text-bad border-bad",
  answered: "bg-brand-soft text-brand border-brand",
};

export function PaperRunner(props: PaperRunnerProps) {
  const { attemptKey, title, questions, topicId, mode = "practice", onExit } = props;
  const store = useStore();
  const saved = store.data.attempts[attemptKey];
  const [state, setState] = useState<AttemptState>(() =>
    saved && saved.answers ? saved : { index: 0, answers: {}, results: {}, completed: false, updatedAt: Date.now(), ...(mode === "exam" ? { startedAt: Date.now() } : {}) },
  );
  const [retry, setRetry] = useState<Question[] | null>(null);
  const [review, setReview] = useState(false);
  // Results show only when the learner asks (so the last question's feedback stays visible).
  const [viewResults, setViewResults] = useState(() => !!saved?.completed);
  // Mirrors `state` for handlers; every write goes through persist/restart so it never lags.
  const stateRef = useRef(state);
  // Exams: save the start time as soon as the paper opens so the clock survives leaving early.
  useEffect(() => {
    if (mode === "exam" && !saved) store.saveAttempt(attemptKey, stateRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const exam = mode === "exam";
  const retryKey = `${attemptKey}:retry`;
  const total = questions.length;
  const q = questions[Math.min(state.index, total - 1)];
  const answeredCount = exam ? questions.filter((x) => state.answers[x.id] !== undefined && state.answers[x.id] !== "").length : questions.filter((x) => state.results[x.id]).length;
  const showSummary = state.completed && viewResults && !review;

  function persist(next: AttemptState) {
    stateRef.current = next;
    setState(next);
    store.saveAttempt(attemptKey, next);
  }

  function go(i: number) {
    persist({ ...stateRef.current, index: Math.max(0, Math.min(total - 1, i)) });
    if (typeof window !== "undefined") window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function onDone(question: Question, o: QuestionOutcome) {
    const cur = stateRef.current;
    // One mark and one record per question per attempt.
    if (cur.results[question.id]) return;
    const results = { ...cur.results, [question.id]: { r: o.score, h: o.hints, t: o.tries, ...(o.solutionShown ? { s: 1 as const } : {}) } };
    const answers = { ...cur.answers, [question.id]: o.answer };
    // An exam only finishes through finishExam; self-marking a written answer afterwards must not reopen it.
    const completed = exam ? cur.completed : questions.every((x) => results[x.id]);
    persist({ ...cur, results, answers, completed });
    store.recordAnswer({
      qid: question.id,
      topicId: question.topicId ?? topicId,
      difficulty: question.difficulty,
      correct: o.correct,
      hints: o.hints,
      tries: o.tries,
      solutionShown: o.solutionShown,
      slip: o.slip,
    });
  }

  // ------------------------------------------------------------ exam timer
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    if (!exam || !props.minutes || state.completed) return;
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, [exam, props.minutes, state.completed]);
  const remaining = exam && props.minutes && state.startedAt ? Math.max(0, state.startedAt + props.minutes * 60000 - now) : null;

  function finishExam() {
    const cur = stateRef.current;
    if (cur.completed) return; // a stray timer tick or double click must not mark (and record) it twice
    const results: Record<string, QResult> = { ...cur.results };
    for (const x of questions) {
      const a = cur.answers[x.id];
      if (x.kind === "mcq") {
        const correct = a === x.answerIndex;
        results[x.id] = { r: correct ? 1 : 0, h: 0, t: 1 };
        store.recordAnswer({ qid: x.id, topicId: x.topicId ?? topicId, difficulty: x.difficulty, correct, hints: 0, tries: 1, solutionShown: false });
      } else if (x.kind === "short") {
        const correct = typeof a === "string" && a.trim() !== "" && checkAnswer(x.answer, a).status === "correct";
        results[x.id] = { r: correct ? 1 : 0, h: 0, t: 1 };
        store.recordAnswer({ qid: x.id, topicId: x.topicId ?? topicId, difficulty: x.difficulty, correct, hints: 0, tries: 1, solutionShown: false });
      }
      // Written answers are self-marked on the results page.
    }
    persist({ ...cur, results, completed: true });
    setViewResults(true);
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  useEffect(() => {
    if (remaining === 0 && !state.completed) finishExam();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [remaining]);

  const summary = useMemo(() => {
    let score = 0;
    let marked = 0;
    const byTopic: Record<string, { got: number; of: number }> = {};
    for (const x of questions) {
      const r = state.results[x.id];
      if (!r) continue;
      marked++;
      score += r.r;
      const t = x.topicId ?? topicId ?? "";
      byTopic[t] = byTopic[t] ?? { got: 0, of: 0 };
      byTopic[t].got += r.r;
      byTopic[t].of += 1;
    }
    return { score, marked, pct: marked ? Math.round((score / total) * 100) : 0, byTopic };
  }, [questions, state.results, total, topicId]);

  if (retry) {
    return (
      <PaperRunner
        attemptKey={retryKey}
        title={`${title} — retry`}
        questions={retry}
        topicId={topicId}
        exitLabel="Back to results"
        onExit={() => {
          store.clearAttempt(retryKey);
          setRetry(null);
        }}
      />
    );
  }

  if (!total) return <p className="text-ink-2">No questions here yet.</p>;

  // ---------------------------------------------------------------- summary
  if (showSummary) {
    const missed = questions.filter((x) => (state.results[x.id]?.r ?? 0) < 1);
    const pendingWritten = exam ? questions.filter((x) => x.kind === "written" && !state.results[x.id]) : [];
    return (
      <div className="space-y-4">
        <div className="card p-5 text-center">
          <div className="text-sm font-bold text-ink-2">{title}</div>
          <div className="mt-1 text-5xl font-black text-brand">{summary.pct}%</div>
          <div className="mt-1 text-ink-2">
            {Math.round(summary.score * 10) / 10} out of {total}
            {pendingWritten.length ? ` · ${pendingWritten.length} written answer${pendingWritten.length === 1 ? "" : "s"} still to self-mark` : ""}
          </div>
          <p className="mx-auto mt-3 max-w-md text-sm">
            {summary.pct >= 90 ? "Superb — you really know this." : summary.pct >= 70 ? "Strong work. Fix the few you missed and you've got it." : summary.pct >= 40 ? "Good effort — the mistakes show exactly what to practise next." : "This one was tough. Re-read the lesson sections linked from the questions, then try again."}
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            <button type="button" className="btn btn-secondary" onClick={() => setReview(true)}>
              {exam ? "Review & mark answers" : "Review my answers"}
            </button>
            {missed.length && !exam ? (
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  // Each retry is a fresh run: never resume (or show the summary of) an old one.
                  store.clearAttempt(retryKey);
                  setRetry(missed);
                }}
              >
                Retry the {missed.length} I missed
              </button>
            ) : null}
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => {
                store.clearAttempt(attemptKey);
                store.clearAttempt(retryKey);
                setViewResults(false);
                const fresh: AttemptState = { index: 0, answers: {}, results: {}, completed: false, updatedAt: Date.now(), ...(exam ? { startedAt: Date.now() } : {}) };
                stateRef.current = fresh;
                setState(fresh);
              }}
            >
              Start again
            </button>
            {onExit ? (
              <button type="button" className="btn btn-ghost" onClick={onExit}>
                Done
              </button>
            ) : null}
          </div>
        </div>
        {exam && props.topicTitles ? (
          <div className="card p-4">
            <h3 className="section-title">By topic</h3>
            <ul className="mt-2 grid gap-1 sm:grid-cols-2">
              {Object.entries(summary.byTopic)
                .sort((a, b) => a[1].got / a[1].of - b[1].got / b[1].of)
                .map(([t, v]) => (
                  <li key={t} className="flex items-center justify-between rounded-lg bg-surface-2 px-3 py-1.5 text-sm">
                    <span>{props.topicTitles?.[t] ?? t}</span>
                    <span className={`font-bold ${v.got / v.of >= 0.7 ? "text-good" : v.got / v.of >= 0.4 ? "text-warn" : "text-bad"}`}>
                      {Math.round(v.got * 10) / 10}/{v.of}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        ) : null}
      </div>
    );
  }

  // ----------------------------------------------------------- review mode
  if (review) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="section-title">{title} — review</h2>
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setReview(false)}>
            Back to results
          </button>
        </div>
        {questions.map((x, i) => (
          <QuestionCard
            key={x.id}
            q={x}
            topicId={x.topicId ?? topicId}
            number={i + 1}
            total={total}
            restored={{
              answer: state.answers[x.id],
              outcome: state.results[x.id]
                ? { score: state.results[x.id].r, correct: state.results[x.id].r >= 1, hints: state.results[x.id].h, tries: state.results[x.id].t, solutionShown: !!state.results[x.id].s, answer: state.answers[x.id] ?? "" }
                : undefined,
            }}
            onDone={(o) => onDone(x, o)}
          />
        ))}
      </div>
    );
  }

  // -------------------------------------------------------------- runner
  const r = state.results[q.id];
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div>
          <h2 className="text-lg font-extrabold">{title}</h2>
          <div className="text-sm text-ink-2">
            {answeredCount} of {total} {exam ? "answered" : "done"}
            {remaining !== null ? (
              <span className={`ml-2 font-bold tabular-nums ${remaining < 300000 ? "text-bad" : ""}`}>
                ⏱ {Math.floor(remaining / 60000)}:{String(Math.floor((remaining % 60000) / 1000)).padStart(2, "0")}
              </span>
            ) : null}
          </div>
        </div>
        <div className="flex gap-2">
          {exam ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                if (answeredCount < total && !window.confirm(`You've answered ${answeredCount} of ${total}. Finish and mark now?`)) return;
                finishExam();
              }}
            >
              Finish & mark
            </button>
          ) : null}
          {onExit ? (
            <button type="button" className="btn btn-ghost btn-sm" onClick={onExit}>
              {props.exitLabel ?? "Save & exit"}
            </button>
          ) : null}
        </div>
      </div>
      <nav className="nav-scroll -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1" aria-label="Questions">
        {questions.map((x, i) => {
          const st = exam ? (state.answers[x.id] !== undefined && state.answers[x.id] !== "" ? "answered" : "none") : statusOf(state.results[x.id]);
          return (
            <button
              key={x.id}
              type="button"
              onClick={() => go(i)}
              aria-current={i === state.index ? "step" : undefined}
              aria-label={`Question ${i + 1}`}
              className={`h-9 min-w-9 shrink-0 rounded-lg border text-sm font-bold ${CHIP[st]} ${i === state.index ? "ring-2 ring-brand ring-offset-1 ring-offset-bg" : ""}`}
            >
              {i + 1}
            </button>
          );
        })}
      </nav>
      <QuestionCard
        key={q.id}
        q={q}
        topicId={q.topicId ?? topicId}
        mode={exam ? "exam" : "practice"}
        number={state.index + 1}
        total={total}
        restored={{
          answer: state.answers[q.id],
          outcome: !exam && r ? { score: r.r, correct: r.r >= 1, hints: r.h, tries: r.t, solutionShown: !!r.s, answer: state.answers[q.id] ?? "" } : undefined,
        }}
        onDone={(o) => onDone(q, o)}
        onAnswer={(a) => persist({ ...stateRef.current, answers: { ...stateRef.current.answers, [q.id]: a } })}
        onNext={state.index < total - 1 ? () => go(state.index + 1) : state.completed ? () => setViewResults(true) : undefined}
        nextLabel={state.index < total - 1 ? "Next question →" : "See my results →"}
      />
      <div className="flex justify-between">
        <button type="button" className="btn btn-ghost" onClick={() => go(state.index - 1)} disabled={state.index === 0}>
          ← Previous
        </button>
        {state.index < total - 1 ? (
          <button type="button" className="btn btn-secondary" onClick={() => go(state.index + 1)}>
            {exam || r ? "Next →" : "Skip →"}
          </button>
        ) : exam ? (
          <button type="button" className="btn btn-primary" onClick={finishExam}>
            Finish & mark
          </button>
        ) : state.completed ? (
          <button type="button" className="btn btn-primary" onClick={() => setViewResults(true)}>
            See my results →
          </button>
        ) : (
          <button type="button" className="btn btn-secondary" onClick={() => go(questions.findIndex((x) => !state.results[x.id]))}>
            Go to unanswered
          </button>
        )}
      </div>
    </div>
  );
}
