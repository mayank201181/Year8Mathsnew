"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MCQ, QA } from "@/lib/types";
import { useStore } from "@/lib/store";
import { attemptCacheKey, emptyDeviceAttempt, emptyQuestionAttempt, decodeDeviceAttempt, saveDeviceAttempt, scoreQuestionOnce,
  type DeviceAttempt, type QuestionAttempt } from "@/lib/deviceAttempt";

export interface RunnerItem {
  kind: "mcq" | "qa";
  q: MCQ | QA;
}

const DIFF_STYLE: Record<string, string> = {
  warmup: "bg-emerald-500/20 text-emerald-300",
  core: "bg-indigo-500/20 text-indigo-300",
  challenge: "bg-amber-500/20 text-amber-300",
};

function Badge({ difficulty, strategy }: { difficulty: string; strategy?: string }) {
  return (
    <div className="flex flex-wrap gap-2 items-center text-xs">
      <span className={`px-2 py-0.5 rounded-full font-semibold capitalize ${DIFF_STYLE[difficulty]}`}>
        {difficulty}
      </span>
      {strategy && (
        <span className="px-2 py-0.5 rounded-full bg-slate-700/70 text-slate-300">
          🧠 {strategy}
        </span>
      )}
    </div>
  );
}

function HintLadder({ hints, shown, onNext }: { hints?: string[]; shown: number; onNext: () => void }) {
  if (!hints || hints.length === 0) return null;
  return (
    <div className="mt-3">
      {shown > 0 && (
        <ol className="space-y-1.5 mb-2">
          {hints.slice(0, shown).map((h, i) => (
            <li key={i} className="text-sm bg-amber-500/10 border-l-2 border-amber-400 rounded px-3 py-1.5">
              <span className="font-semibold text-amber-300">Hint {i + 1}: </span>
              {h}
            </li>
          ))}
        </ol>
      )}
      {shown < hints.length && (
        <button
          onClick={onNext}
          className="text-sm text-amber-300 hover:underline"
        >
          💡 {shown === 0 ? "Stuck? Show a hint" : "Next hint"} ({shown}/{hints.length})
        </button>
      )}
    </div>
  );
}

function McqView({ q, topicId, state, onPick, onHint }: {
  q: MCQ; topicId: string; state: QuestionAttempt; onPick: (choice: number) => void; onHint: () => void;
}) {
  const picked = state.picked;
  return (
    <div>
      <Badge difficulty={q.difficulty} strategy={q.strategy} />
      <h3 className="text-lg font-semibold mt-3 mb-3">{q.question}</h3>
      <div className="grid gap-2">
        {q.options.map((opt, i) => {
          let cls = "border-slate-700 bg-slate-800/50 hover:border-indigo-500";
          if (picked !== null) {
            if (i === q.answerIndex) cls = "border-emerald-500 bg-emerald-500/15";
            else if (i === picked) cls = "border-rose-500 bg-rose-500/15";
            else cls = "border-slate-800 bg-slate-800/30 opacity-70";
          }
          return (
            <button
              key={i}
              disabled={picked !== null}
              onClick={() => onPick(i)}
              className={`text-left border rounded-xl px-4 py-2.5 transition ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked === null && <HintLadder hints={q.hints} shown={state.hintsShown} onNext={onHint} />}
      {picked !== null && (
        <div
          className={`mt-3 rounded-xl px-4 py-3 text-sm ${
            picked === q.answerIndex ? "bg-emerald-500/15" : "bg-rose-500/15"
          }`}
        >
          <strong>{picked === q.answerIndex ? "Correct! " : "Not quite. "}</strong>
          {q.explanation}
          {q.guideRef && (
            <Link href={`/topic/${topicId}`} className="block mt-1 text-indigo-300 hover:underline">
              ↩ Back to the guide: {q.guideRef}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}

function QaView({ q, topicId, state, onChange, onScored, onHint }: {
  q: QA; topicId: string; state: QuestionAttempt; onChange: (patch: Partial<QuestionAttempt>) => void;
  onScored: (correct: boolean) => void; onHint: () => void;
}) {
  const { answer, revealed, selfMark } = state;

  return (
    <div>
      <Badge difficulty={q.difficulty} strategy={q.strategy} />
      <h3 className="text-lg font-semibold mt-3 mb-3">{q.question}</h3>
      <textarea
        value={answer}
        onChange={(e) => onChange({ answer: e.target.value })}
        disabled={revealed}
        rows={3}
        placeholder="Work it out on paper, then jot your answer & method here…"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm"
      />
      {!revealed && <HintLadder hints={q.hints} shown={state.hintsShown} onNext={onHint} />}
      {!revealed ? (
        <button
          onClick={() => onChange({ revealed: true })}
          className="mt-3 bg-indigo-500 hover:bg-indigo-400 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          I&apos;ve tried — show the model answer
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          <p className="text-sm text-slate-300">
            Compare your original answer and working with the model and mark scheme.
            This is self-assessment: an automatic keyword check cannot reliably judge
            signs, fractions, inequalities, or a different valid method.
          </p>
          <div className="bg-slate-800/60 border border-slate-700 rounded-xl px-4 py-3 text-sm">
            <p className="font-semibold text-slate-200">Model answer</p>
            <p className="mt-1">{q.modelAnswer}</p>
            <p className="font-semibold text-slate-200 mt-3">Mark scheme</p>
            <ul className="mt-1 list-disc list-inside space-y-0.5">
              {q.markScheme.map((m, i) => (
                <li key={i}>{m}</li>
              ))}
            </ul>
            {q.solutions && q.solutions.length > 0 && (
              <div className="mt-3">
                <p className="font-semibold text-slate-200">Other ways to see it</p>
                {q.solutions.map((s, i) => (
                  <div key={i} className="mt-1.5">
                    <p className="text-indigo-300 font-medium">{s.label}</p>
                    <ol className="list-decimal list-inside text-slate-300">
                      {s.steps.map((st, j) => (
                        <li key={j}>{st}</li>
                      ))}
                    </ol>
                  </div>
                ))}
              </div>
            )}
            {q.commonError && (
              <p className="mt-3 text-amber-300 text-xs">⚠ Common slip: {q.commonError}</p>
            )}
            {q.guideRef && (
              <Link href={`/topic/${topicId}`} className="block mt-2 text-indigo-300 hover:underline">
                ↩ Back to the guide: {q.guideRef}
              </Link>
            )}
          </div>

          {selfMark === null ? (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-slate-400">Does your original working meet the mark scheme?</span>
              <button
                onClick={() => {
                  onScored(true);
                }}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => {
                  onScored(false);
                }}
                className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300"
              >
                ✗ Not yet
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {selfMark ? "Saved as self-assessed correct ⭐" : "Added to your review queue 🔁"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

type RunnerProps = { items: RunnerItem[]; topicId: string; title?: string; review?: boolean };

export default function PaperRunner({ items, topicId, title, review = false }: RunnerProps) {
  const { account, activeProfile } = useStore();
  const paperId = JSON.stringify([topicId, title ?? "Practice"]);
  const scopeKey = attemptCacheKey(account?.id ?? null, activeProfile?.id ?? "guest", paperId);
  // Changing content invalidates a stale cached verdict even when question IDs are preserved.
  const signature = JSON.stringify(items.map(({ kind, q }) => [kind, q.id, q.question,
    kind === "mcq" ? [(q as MCQ).options, (q as MCQ).answerIndex] : [(q as QA).modelAnswer, (q as QA).markScheme]]));
  return <AttemptRunner key={review ? `${scopeKey}:review` : `${scopeKey}:${signature}`}
    items={items} topicId={topicId} title={title} review={review}
    cacheKey={review ? null : scopeKey} signature={signature} />;
}

function AttemptRunner({ items: initialItems, topicId, title, review = false, cacheKey, signature }: RunnerProps & {
  cacheKey: string | null; signature: string;
}) {
  const { recordResult, reviewResult } = useStore();
  // Review gets a fresh in-memory queue each visit, independent of practice caches.
  const [items] = useState(initialItems);
  const descriptors = useMemo(() => items.map(({ kind, q }) => ({ id: q.id, kind,
    optionCount: kind === "mcq" ? (q as MCQ).options.length : undefined,
    answerIndex: kind === "mcq" ? (q as MCQ).answerIndex : undefined,
    hintCount: q.hints?.length ?? 0 })), [items]);
  const [attempt, setAttempt] = useState<DeviceAttempt>(() => emptyDeviceAttempt(signature));
  const attemptRef = useRef(attempt);
  const [ready, setReady] = useState(cacheKey === null);
  const [cacheFailed, setCacheFailed] = useState(false);
  const [confirmRestart, setConfirmRestart] = useState(false);

  useEffect(() => {
    if (cacheKey === null) return;
    let restored = emptyDeviceAttempt(signature);
    try { restored = decodeDeviceAttempt(window.localStorage.getItem(cacheKey), signature, descriptors); }
    catch { setCacheFailed(true); }
    attemptRef.current = restored;
    setAttempt(restored);
    setReady(true);
  }, [cacheKey, signature, descriptors]);

  function commit(next: DeviceAttempt) {
    // Synchronous ref + write prevents duplicate clicks or reload from replaying a score.
    attemptRef.current = next;
    setAttempt(next);
    if (cacheKey !== null) {
      try { setCacheFailed(!saveDeviceAttempt(window.localStorage, cacheKey, next)); }
      catch { setCacheFailed(true); }
    }
  }
  const total = items.length;
  const index = Math.min(attempt.index, Math.max(0, total - 1));
  const item = items[index];
  const state = item ? attempt.questions[item.q.id] ?? emptyQuestionAttempt() : emptyQuestionAttempt();
  const answered = items.filter(({ q }) => attempt.questions[q.id]?.scored).length;
  const score = items.filter(({ q }) => attempt.questions[q.id]?.correct === true).length;

  function updateQuestion(patch: Partial<QuestionAttempt>) {
    const current = attemptRef.current;
    const previous = current.questions[item.q.id] ?? emptyQuestionAttempt();
    if (previous.scored) return;
    commit({ ...current, questions: { ...current.questions, [item.q.id]: { ...previous, ...patch } } });
  }
  function handleScored(correct: boolean, patch: Partial<QuestionAttempt>) {
    const current = attemptRef.current;
    const previous = current.questions[item.q.id] ?? emptyQuestionAttempt();
    const result = scoreQuestionOnce(current, item.q.id, { ...previous, ...patch }, correct);
    if (!result.shouldRecord) return;
    commit(result.attempt);
    recordResult(item.q.id, correct, item.q.difficulty);
    if (review) reviewResult(item.q.id, correct);
  }
  function go(next: number) {
    if (next < 0 || next >= total) return;
    commit({ ...attemptRef.current, index: next });
  }
  function startNewAttempt() {
    commit(emptyDeviceAttempt(signature));
    setConfirmRestart(false);
  }

  if (total === 0) return <p className="text-slate-400">No questions here yet.</p>;
  if (!ready) return <p className="text-slate-400">Loading your saved attempt…</p>;

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
        <div className="text-sm text-slate-400">
          {title ? `${title} · ` : ""}Question {index + 1} of {total}
        </div>
        <div className="text-sm">⭐ {score}/{answered}</div>
      </div>
      {!review && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 text-xs text-slate-400">
          <p>{cacheFailed ? "This device cannot save the attempt. Keep this page open to avoid losing it." : "Your attempt resumes on this device for this profile."}</p>
          <button onClick={() => setConfirmRestart(true)} className="text-indigo-300 underline">New attempt</button>
        </div>
      )}
      {confirmRestart && !review && (
        <div className="rounded-xl border border-slate-600 p-3 mb-4 text-sm">
          <p>Start this paper again? Your total stars and learning history will stay.</p>
          <div className="flex gap-3 mt-2">
            <button onClick={startNewAttempt} className="rounded-lg bg-indigo-500 px-3 py-2">Start fresh</button>
            <button onClick={() => setConfirmRestart(false)} className="rounded-lg bg-slate-800 px-3 py-2">Keep current attempt</button>
          </div>
        </div>
      )}
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div className="h-full bg-gradient-to-r from-indigo-400 to-teal-400" style={{ width: `${(answered / total) * 100}%` }} />
      </div>
      <div key={item.q.id} className="animate-pop">
        {item.kind === "mcq" ? (
          <McqView q={item.q as MCQ} topicId={topicId} state={state}
            onPick={(choice) => handleScored(choice === (item.q as MCQ).answerIndex, { picked: choice })}
            onHint={() => updateQuestion({ hintsShown: Math.min((item.q.hints?.length ?? 0), state.hintsShown + 1) })} />
        ) : (
          <QaView q={item.q as QA} topicId={topicId} state={state} onChange={updateQuestion}
            onScored={(correct) => handleScored(correct, { selfMark: correct, revealed: true })}
            onHint={() => updateQuestion({ hintsShown: Math.min((item.q.hints?.length ?? 0), state.hintsShown + 1) })} />
        )}
      </div>
      <div className="flex items-center justify-between gap-3 mt-5">
        <button disabled={index === 0} onClick={() => go(index - 1)}
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40 text-sm">← Prev</button>
        <div className="flex flex-wrap justify-center gap-1">
          {items.map(({ q }, i) => (
            <button key={q.id} onClick={() => go(i)}
              className={`w-2.5 h-2.5 rounded-full ${i === index ? "bg-indigo-400" : attempt.questions[q.id]?.correct === true ? "bg-emerald-500" : attempt.questions[q.id]?.scored ? "bg-rose-500" : "bg-slate-700"}`}
              aria-label={`Go to question ${i + 1}`} />
          ))}
        </div>
        <button disabled={index === total - 1} onClick={() => go(index + 1)}
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40 text-sm">Next →</button>
      </div>
    </div>
  );
}
