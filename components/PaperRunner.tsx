"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { MCQ, QA } from "@/lib/types";
import { useStore } from "@/lib/store";
import { gradeWritten, type GradeVerdict } from "@/lib/grade";

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

function HintLadder({ hints }: { hints?: string[] }) {
  const [shown, setShown] = useState(0);
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
          onClick={() => setShown((n) => n + 1)}
          className="text-sm text-amber-300 hover:underline"
        >
          💡 {shown === 0 ? "Stuck? Show a hint" : "Next hint"} ({shown}/{hints.length})
        </button>
      )}
    </div>
  );
}

function McqView({ q, topicId, onScored }: { q: MCQ; topicId: string; onScored: (c: boolean) => void }) {
  const [picked, setPicked] = useState<number | null>(null);
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
              onClick={() => {
                setPicked(i);
                onScored(i === q.answerIndex);
              }}
              className={`text-left border rounded-xl px-4 py-2.5 transition ${cls}`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {picked === null && <HintLadder hints={q.hints} />}
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

function QaView({ q, topicId, onScored }: { q: QA; topicId: string; onScored: (c: boolean) => void }) {
  const [answer, setAnswer] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [verdict, setVerdict] = useState<GradeVerdict | null>(null);
  const [selfMark, setSelfMark] = useState<boolean | null>(null);

  function reveal() {
    const v = gradeWritten(answer, q.markScheme);
    setVerdict(v);
    setRevealed(true);
  }

  return (
    <div>
      <Badge difficulty={q.difficulty} strategy={q.strategy} />
      <h3 className="text-lg font-semibold mt-3 mb-3">{q.question}</h3>
      <textarea
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        disabled={revealed}
        rows={3}
        placeholder="Work it out on paper, then jot your answer & method here…"
        className="w-full bg-slate-800 border border-slate-700 rounded-xl px-3 py-2 text-sm"
      />
      {!revealed && <HintLadder hints={q.hints} />}
      {!revealed ? (
        <button
          onClick={reveal}
          className="mt-3 bg-indigo-500 hover:bg-indigo-400 rounded-lg px-4 py-2 text-sm font-semibold"
        >
          I&apos;ve tried — show the model answer
        </button>
      ) : (
        <div className="mt-3 space-y-3">
          {verdict && (
            <p className="text-sm text-slate-300">
              Auto-check:{" "}
              <span
                className={
                  verdict === "correct"
                    ? "text-emerald-300"
                    : verdict === "partial"
                    ? "text-amber-300"
                    : "text-rose-300"
                }
              >
                {verdict === "correct" ? "looks right ✓" : verdict === "partial" ? "partly there" : "needs work"}
              </span>
            </p>
          )}
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
            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-400">Did you get it right?</span>
              <button
                onClick={() => {
                  setSelfMark(true);
                  onScored(true);
                }}
                className="px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-300"
              >
                ✓ Yes
              </button>
              <button
                onClick={() => {
                  setSelfMark(false);
                  onScored(false);
                }}
                className="px-3 py-1 rounded-lg bg-rose-500/20 text-rose-300"
              >
                ✗ Not yet
              </button>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              {selfMark ? "Great — star earned! ⭐" : "Added to your review queue 🔁"}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

export default function PaperRunner({
  items,
  topicId,
  title,
  review = false,
}: {
  items: RunnerItem[];
  topicId: string;
  title?: string;
  review?: boolean;
}) {
  const { recordResult, reviewResult } = useStore();
  const [index, setIndex] = useState(0);
  const [done, setDone] = useState<Record<number, boolean>>({});
  const total = items.length;
  const item = items[index];

  const score = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const answered = Object.keys(done).length;

  function handleScored(correct: boolean) {
    setDone((d) => ({ ...d, [index]: correct }));
    recordResult(item.q.id, correct, item.q.difficulty);
    if (review) reviewResult(item.q.id, correct);
  }

  if (total === 0) return <p className="text-slate-400">No questions here yet.</p>;

  return (
    <div className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-slate-400">
          {title ? `${title} · ` : ""}Question {index + 1} of {total}
        </div>
        <div className="text-sm">⭐ {score}/{answered || 0}</div>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-indigo-400 to-teal-400"
          style={{ width: `${((index + (done[index] !== undefined ? 1 : 0)) / total) * 100}%` }}
        />
      </div>

      <div key={index} className="animate-pop">
        {item.kind === "mcq" ? (
          <McqView q={item.q as MCQ} topicId={topicId} onScored={handleScored} />
        ) : (
          <QaView q={item.q as QA} topicId={topicId} onScored={handleScored} />
        )}
      </div>

      <div className="flex items-center justify-between mt-5">
        <button
          disabled={index === 0}
          onClick={() => setIndex((i) => Math.max(0, i - 1))}
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40 text-sm"
        >
          ← Prev
        </button>
        <div className="flex gap-1">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`w-2.5 h-2.5 rounded-full ${
                i === index
                  ? "bg-indigo-400"
                  : done[i] === true
                  ? "bg-emerald-500"
                  : done[i] === false
                  ? "bg-rose-500"
                  : "bg-slate-700"
              }`}
              aria-label={`Go to question ${i + 1}`}
            />
          ))}
        </div>
        <button
          disabled={index === total - 1}
          onClick={() => setIndex((i) => Math.min(total - 1, i + 1))}
          className="px-4 py-2 rounded-lg bg-slate-800 disabled:opacity-40 text-sm"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
