"use client";
// One question of any kind (MCQ / short auto-marked / written self-marked),
// AoPS style: try first, laddered hints, worked solutions after an attempt.
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { MCQ, Question, ShortQ, WrittenQ } from "@/lib/types";
import { checkWithTraps, displayAnswer, type CheckStatus } from "@/lib/answerCheck";
import { optionOrder } from "@/lib/optionOrder";
import { Diagram, Rich, RichInline } from "./Rich";
import { AnswerInput } from "./AnswerInput";
import { AskAI } from "./AskAI";
import { useStore } from "@/lib/store";

function FlagButton({ qid }: { qid: string }) {
  const { data, flagQuestion } = useStore();
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  if (data.flags[qid]) return <span className="text-xs text-ink-2">🚩 Reported — thanks!</span>;
  if (!open)
    return (
      <button type="button" className="btn btn-ghost btn-sm text-xs" onClick={() => setOpen(true)}>
        🚩 Something wrong?
      </button>
    );
  return (
    <form
      className="flex w-full basis-full flex-wrap items-center gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        flagQuestion(qid, note.trim() || "(no note)");
        setOpen(false);
      }}
    >
      <input className="input max-w-sm flex-1 text-sm" value={note} onChange={(e) => setNote(e.target.value)} placeholder="What looks wrong? (optional)" maxLength={300} aria-label="What looks wrong?" autoFocus />
      <button type="submit" className="btn btn-secondary btn-sm">
        Report
      </button>
      <button type="button" className="btn btn-ghost btn-sm" onClick={() => setOpen(false)}>
        Cancel
      </button>
    </form>
  );
}

export interface QuestionOutcome {
  /** 0..1 */
  score: number;
  correct: boolean;
  hints: number;
  tries: number;
  solutionShown: boolean;
  answer: string | number;
  slip?: string;
}

export interface QuestionCardProps {
  q: Question;
  topicId?: string;
  /** practice: instant feedback · exam: collect answers only · review: like practice */
  mode?: "practice" | "exam" | "review";
  /** Restore a finished question (from an autosaved attempt). */
  restored?: { answer?: string | number; outcome?: QuestionOutcome };
  onDone?: (o: QuestionOutcome) => void;
  /** Exam mode: answer changed. */
  onAnswer?: (answer: string | number) => void;
  number?: number;
  total?: number;
  /** Show the "Next" call-to-action inside the feedback panel. */
  onNext?: () => void;
  nextLabel?: string;
}

const HINT_DELAY_MS = 12000;
const MAX_TRIES = 2;

const DIFF_STYLE: Record<string, string> = {
  warmup: "bg-good-soft text-good",
  core: "bg-info-soft text-info",
  challenge: "bg-accent-soft text-warn",
};
const DIFF_LABEL: Record<string, string> = { warmup: "Warm-up", core: "Core", challenge: "Challenge" };

export function guideHref(topicId: string | undefined, guideRef: string | undefined): string | null {
  if (!topicId || !guideRef) return null;
  return `/topic/${topicId}?tab=learn#sec-${guideRef}`;
}

export function QuestionCard(props: QuestionCardProps) {
  const { q, mode = "practice" } = props;
  return (
    <article className="card p-4 sm:p-6" aria-label={props.number ? `Question ${props.number}` : "Question"}>
      <header className="mb-3 flex flex-wrap items-center gap-2 text-xs">
        {props.number ? (
          <span className="font-extrabold text-ink-2">
            Question {props.number}
            {props.total ? ` of ${props.total}` : ""}
          </span>
        ) : null}
        <span className={`chip border-0 ${DIFF_STYLE[q.difficulty]}`}>{DIFF_LABEL[q.difficulty]}</span>
        {q.kind === "written" ? <span className="chip">{q.marks} mark{q.marks === 1 ? "" : "s"}</span> : null}
      </header>
      <Rich text={q.question} className="text-[1.05rem]" />
      {q.diagram ? <Diagram svg={q.diagram} /> : null}
      <div className="mt-4">
        {q.kind === "mcq" ? <McqBody {...props} q={q} mode={mode} /> : q.kind === "short" ? <ShortBody {...props} q={q} mode={mode} /> : <WrittenBody {...props} q={q} mode={mode} />}
      </div>
    </article>
  );
}

// ---------------------------------------------------------------- hints
/** Seconds until hints unlock, counted from when the question first appeared (0 after a wrong try). */
function useHintGate(wrongTries: number) {
  const [left, setLeft] = useState(Math.ceil(HINT_DELAY_MS / 1000));
  const started = useRef<number | null>(null);
  useEffect(() => {
    if (wrongTries > 0) return;
    started.current ??= Date.now();
    const t0 = started.current;
    const t = setInterval(() => {
      const l = Math.max(0, Math.ceil((t0 + HINT_DELAY_MS - Date.now()) / 1000));
      setLeft(l);
      if (l === 0) clearInterval(t);
    }, 1000);
    return () => clearInterval(t);
  }, [wrongTries]);
  return wrongTries > 0 ? 0 : left;
}

function HintLadder({ hints, shown, onReveal, waitSeconds, disabled }: { hints: string[]; shown: number; onReveal: () => void; waitSeconds: number; disabled?: boolean }) {
  if (!hints.length) return null;
  return (
    <div className="mt-4 space-y-2">
      {hints.slice(0, shown).map((h, i) => (
        <div key={i} className="animate-pop rounded-xl border border-line bg-warn-soft px-3 py-2 text-sm">
          <span className="font-extrabold">Hint {i + 1}: </span>
          <RichInline text={h} />
        </div>
      ))}
      {shown < hints.length && !disabled ? (
        <button type="button" className="btn btn-ghost btn-sm" onClick={onReveal} disabled={waitSeconds > 0}>
          💡 {shown === 0 ? "I'm stuck — give me a hint" : "Another hint"}
          {waitSeconds > 0 ? ` (have a go first · ${waitSeconds}s)` : ` (${shown + 1}/${hints.length})`}
        </button>
      ) : null}
    </div>
  );
}

function Verdict({ status, children }: { status: "correct" | "incorrect" | "partial" | "close"; children?: React.ReactNode }) {
  const style =
    status === "correct" ? "border-good bg-good-soft" : status === "partial" || status === "close" ? "border-warn bg-warn-soft" : "border-bad bg-bad-soft";
  const title = status === "correct" ? "✅ Correct" : status === "partial" ? "🟡 Partly there" : status === "close" ? "🟡 Almost" : "Not this time";
  return (
    <div className={`animate-pop mt-4 rounded-xl border-l-4 p-4 ${style}`} role="status" aria-live="polite">
      <div className="font-extrabold">{title}</div>
      {children ? <div className="mt-2 space-y-3 text-[0.98rem]">{children}</div> : null}
    </div>
  );
}

function AfterPanel({ q, topicId, onNext, nextLabel, answerText }: { q: Question; topicId?: string; onNext?: () => void; nextLabel?: string; answerText?: string }) {
  const href = guideHref(topicId ?? q.topicId, q.guideRef);
  const solutions = q.kind !== "mcq" ? q.solutions : undefined;
  return (
    <>
      {solutions?.length ? (
        <details className="rounded-xl border border-line bg-surface p-3">
          <summary className="cursor-pointer font-bold">🔀 Another way to see it</summary>
          <div className="mt-2 space-y-3">
            {solutions.map((m, i) => (
              <div key={i}>
                <div className="font-bold">{m.label}</div>
                <ol className="rich-ol mt-1">
                  {m.steps.map((s, j) => (
                    <li key={j}>
                      <RichInline text={s} />
                    </li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </details>
      ) : null}
      {q.kind !== "mcq" && q.commonError ? (
        <p className="text-sm">
          <span className="font-bold">⚠️ Common slip: </span>
          <RichInline text={q.commonError} />
        </p>
      ) : null}
      <div className="flex flex-wrap items-center gap-2">
        {q.strategy ? <span className="chip">🧠 Strategy: {q.strategy}</span> : null}
        {href ? (
          <Link href={href} className="btn btn-ghost btn-sm">
            📖 Back to the lesson
          </Link>
        ) : null}
        <AskAI
          compact
          context={`Question: ${q.question}\n${answerText ? `My answer: ${answerText}\n` : ""}${q.kind === "mcq" ? `Correct answer: ${q.options[q.answerIndex]}\nExplanation: ${q.explanation}` : q.kind === "short" ? `Correct answer: ${displayAnswer(q.answer)}\nSolution: ${q.solution.join(" ")}` : `Model answer: ${q.modelAnswer}`}`}
        />
        <FlagButton qid={q.id} />
        {onNext ? (
          <button type="button" className="btn btn-primary ml-auto" onClick={onNext} autoFocus>
            {nextLabel ?? "Next →"}
          </button>
        ) : null}
      </div>
    </>
  );
}

// ------------------------------------------------------------------ MCQ
function McqBody({ q, mode, restored, onDone, onAnswer, topicId, onNext, nextLabel }: QuestionCardProps & { q: MCQ }) {
  const order = useMemo(() => optionOrder(q.id, q.options), [q.id, q.options]);
  const [picked, setPicked] = useState<number | null>(typeof restored?.answer === "number" ? restored.answer : null);
  const [done, setDone] = useState<QuestionOutcome | null>(restored?.outcome ?? null);
  const [hints, setHints] = useState(restored?.outcome?.hints ?? 0);
  const wait = useHintGate(0);
  const exam = mode === "exam";
  const groupRef = useRef<HTMLDivElement>(null);

  function check() {
    if (picked === null || done) return;
    const correct = picked === q.answerIndex;
    const o: QuestionOutcome = { score: correct ? 1 : 0, correct, hints, tries: 1, solutionShown: false, answer: picked };
    setDone(o);
    onDone?.(o);
  }

  // Keys 1–4 pick an option (and focus it); Enter checks the pick.
  useEffect(() => {
    if (done || exam) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.defaultPrevented || e.altKey || e.ctrlKey || e.metaKey) return;
      const el = e.target instanceof Element ? e.target : null;
      if (el && (el.closest("input, textarea, select") || (el as HTMLElement).isContentEditable)) return;
      const n = Number(e.key);
      if (Number.isInteger(n) && n >= 1 && n <= order.length) {
        setPicked(order[n - 1]);
        groupRef.current?.querySelectorAll<HTMLElement>('[role="radio"]')[n - 1]?.focus();
        return;
      }
      if (e.key !== "Enter" || picked === null) return;
      // A focused button or link (Check, a hint, another option, page navigation) handles its own Enter;
      // only the picked option itself, or no control at all, means "check my pick".
      const control = el?.closest("button, a, summary");
      if (control && !(groupRef.current?.contains(control) && control.getAttribute("aria-checked") === "true")) return;
      // Cancel the key: otherwise its keypress clicks the Next button that check() reveals and focuses.
      e.preventDefault();
      check();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <div>
      <div ref={groupRef} className="grid gap-2" role="radiogroup" aria-label="Options">
        {order.map((oi, pos) => {
          const isPicked = picked === oi;
          const isAnswer = oi === q.answerIndex;
          let style = "border-line bg-surface hover:border-brand";
          if (done && !exam) {
            if (isAnswer) style = "border-good bg-good-soft";
            else if (isPicked) style = "border-bad bg-bad-soft";
            else style = "border-line bg-surface opacity-70";
          } else if (isPicked) style = "border-brand bg-brand-soft";
          return (
            <button
              key={oi}
              type="button"
              role="radio"
              aria-checked={isPicked}
              disabled={!!done && !exam}
              onClick={() => {
                setPicked(oi);
                if (exam) onAnswer?.(oi);
              }}
              className={`flex min-h-12 items-center gap-3 rounded-xl border-2 px-3 py-2 text-left transition ${style}`}
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-2 text-sm font-extrabold text-ink-2">{pos + 1}</span>
              <RichInline text={q.options[oi]} />
              {done && !exam && isAnswer ? <span className="ml-auto" aria-label="correct answer">✓</span> : null}
            </button>
          );
        })}
      </div>
      {!exam && !done ? (
        <>
          <HintLadder hints={q.hints} shown={hints} onReveal={() => setHints((h) => h + 1)} waitSeconds={wait} />
          <div className="mt-4 flex gap-2">
            <button type="button" className="btn btn-primary" onClick={check} disabled={picked === null}>
              Check answer
            </button>
          </div>
        </>
      ) : null}
      {!exam && done ? (
        <Verdict status={done.correct ? "correct" : "incorrect"}>
          <Rich text={q.explanation} />
          <AfterPanel q={q} topicId={topicId} onNext={onNext} nextLabel={nextLabel} answerText={picked !== null ? q.options[picked] : undefined} />
        </Verdict>
      ) : null}
    </div>
  );
}

// ---------------------------------------------------------------- Short
function ShortBody({ q, mode, restored, onDone, onAnswer, topicId, onNext, nextLabel }: QuestionCardProps & { q: ShortQ }) {
  const [value, setValue] = useState(typeof restored?.answer === "string" ? restored.answer : "");
  const [done, setDone] = useState<QuestionOutcome | null>(restored?.outcome ?? null);
  const [hints, setHints] = useState(restored?.outcome?.hints ?? 0);
  const [tries, setTries] = useState(restored?.outcome?.tries ?? 0);
  const [msg, setMsg] = useState<{ status: CheckStatus; text?: string } | null>(null);
  const [slip, setSlip] = useState<string | undefined>(undefined);
  const wait = useHintGate(tries);
  const exam = mode === "exam";

  function finish(o: QuestionOutcome) {
    setDone(o);
    onDone?.(o);
  }

  function check() {
    if (done || !value.trim()) return;
    const r = checkWithTraps(q.answer, value, q.traps);
    if (r.status === "invalid" || r.status === "close") {
      setMsg({ status: r.status, text: r.feedback });
      return;
    }
    const nTries = tries + 1;
    setTries(nTries);
    if (r.status === "correct") {
      finish({ score: 1, correct: true, hints, tries: nTries, solutionShown: false, answer: value, slip });
      setMsg(null);
      return;
    }
    const thisSlip = r.feedback && q.traps?.some((t) => t.feedback === r.feedback) ? r.feedback : slip;
    setSlip(thisSlip);
    if (nTries >= MAX_TRIES) {
      finish({ score: 0, correct: false, hints, tries: nTries, solutionShown: true, answer: value, slip: thisSlip });
      setMsg({ status: "incorrect", text: r.feedback });
    } else {
      setMsg({ status: "incorrect", text: r.feedback });
    }
  }

  function giveUp() {
    finish({ score: 0, correct: false, hints, tries: Math.max(tries, 1), solutionShown: true, answer: value, slip });
  }

  return (
    <div>
      <AnswerInput
        value={value}
        onChange={(v) => {
          setValue(v);
          setMsg(null);
          if (exam) onAnswer?.(v);
        }}
        onSubmit={exam ? undefined : check}
        type={q.answer.type}
        disabled={!!done && !exam}
      />
      {!exam && !done ? (
        <>
          {msg ? (
            <div
              className={`animate-pop mt-3 rounded-xl px-3 py-2 text-sm ${msg.status === "incorrect" ? "animate-shake bg-bad-soft" : msg.status === "close" ? "bg-warn-soft" : "bg-info-soft"}`}
              role="status"
              aria-live="polite"
            >
              {msg.status === "incorrect" ? <strong>Not quite. </strong> : msg.status === "close" ? <strong>Almost! </strong> : null}
              {msg.text ?? (msg.status === "incorrect" ? "Check your working and have another go — or take a hint." : null)}
              {msg.status === "incorrect" && tries < MAX_TRIES ? <span className="block text-ink-2">You have one more try.</span> : null}
            </div>
          ) : null}
          <HintLadder hints={q.hints} shown={hints} onReveal={() => setHints((h) => h + 1)} waitSeconds={wait} />
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={check} disabled={!value.trim()}>
              Check answer
            </button>
            {tries > 0 || hints >= q.hints.length ? (
              <button type="button" className="btn btn-ghost" onClick={giveUp}>
                Show me the solution
              </button>
            ) : null}
          </div>
        </>
      ) : null}
      {!exam && done ? (
        <Verdict status={done.correct ? "correct" : "incorrect"}>
          {/* Only specific feedback on the last wrong answer (a trap or checker hint) — never a "try again" prompt. */}
          {!done.correct && msg?.status === "incorrect" && msg.text ? <p className="font-semibold">{msg.text}</p> : null}
          <p>
            <span className="font-bold">Answer: </span>
            <RichInline text={displayAnswer(q.answer)} />
          </p>
          <div>
            <div className="font-bold">Worked solution</div>
            <ol className="rich-ol mt-1">
              {q.solution.map((s, i) => (
                <li key={i}>
                  <RichInline text={s} />
                </li>
              ))}
            </ol>
          </div>
          <AfterPanel q={q} topicId={topicId} onNext={onNext} nextLabel={nextLabel} answerText={value} />
        </Verdict>
      ) : null}
    </div>
  );
}

// -------------------------------------------------------------- Written
export function suggestMarks(q: WrittenQ, text: string): boolean[] {
  const t = ` ${text.toLowerCase().replace(/\s+/g, " ")} `;
  return q.markScheme.map((p) => p.keywords.some((k) => k && t.includes(k.toLowerCase())));
}

function WrittenBody({ q, mode, restored, onDone, onAnswer, topicId, onNext, nextLabel }: QuestionCardProps & { q: WrittenQ }) {
  const [value, setValue] = useState(typeof restored?.answer === "string" ? restored.answer : "");
  const [phase, setPhase] = useState<"answer" | "mark" | "done">(restored?.outcome ? "done" : "answer");
  // A saved score doesn't record which points were ticked, so a restored answer has no ticks (null).
  const [marks, setMarks] = useState<boolean[] | null>(() => (restored?.outcome ? null : q.markScheme.map(() => false)));
  const [hints, setHints] = useState(restored?.outcome?.hints ?? 0);
  const [result, setResult] = useState<QuestionOutcome | null>(restored?.outcome ?? null);
  const wait = useHintGate(0);
  const exam = mode === "exam";
  const enough = value.trim().length >= 3;
  const ticked = marks ? marks.filter(Boolean).length : 0;

  if (exam) {
    return (
      <textarea
        className="input min-h-32"
        value={value}
        placeholder="Write your answer and working here…"
        onChange={(e) => {
          setValue(e.target.value);
          onAnswer?.(e.target.value);
        }}
      />
    );
  }

  return (
    <div>
      <textarea
        className="input min-h-32"
        value={value}
        disabled={phase !== "answer"}
        placeholder="Write your answer and reasoning here…"
        onChange={(e) => setValue(e.target.value)}
        aria-label="Your written answer"
      />
      {phase === "answer" ? (
        <>
          <HintLadder hints={q.hints} shown={hints} onReveal={() => setHints((h) => h + 1)} waitSeconds={wait} />
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="btn btn-primary"
              disabled={!enough}
              onClick={() => {
                setMarks(suggestMarks(q, value));
                setPhase("mark");
              }}
            >
              Compare with the model answer
            </button>
            {!enough ? <span className="text-sm text-ink-2">Write your answer first.</span> : null}
          </div>
        </>
      ) : null}
      {phase !== "answer" ? (
        <div className="mt-4 space-y-3 rounded-xl border border-line bg-surface-2 p-4">
          <div>
            <div className="font-bold">Model answer</div>
            <Rich text={q.modelAnswer} />
          </div>
          {marks ? (
            <fieldset>
              <legend className="font-bold">Mark it honestly — tick each point your answer made</legend>
              <ul className="mt-2 space-y-2">
                {q.markScheme.map((p, i) => (
                  <li key={i}>
                    <label className="flex cursor-pointer items-start gap-2">
                      <input
                        type="checkbox"
                        className="mt-1 h-5 w-5 accent-[var(--brand)]"
                        checked={marks[i]}
                        disabled={phase === "done"}
                        onChange={(e) => setMarks((m) => (m ? m.map((x, j) => (j === i ? e.target.checked : x)) : m))}
                      />
                      <span>
                        <RichInline text={p.point} />
                      </span>
                    </label>
                  </li>
                ))}
              </ul>
              {phase === "mark" ? <p className="mt-2 text-xs text-ink-2">Ticks are suggested from words in your answer — change them if they&apos;re not fair.</p> : null}
            </fieldset>
          ) : (
            <div>
              <div className="font-bold">Mark scheme</div>
              <ul className="rich-ul mt-1">
                {q.markScheme.map((p, i) => (
                  <li key={i}>
                    <RichInline text={p.point} />
                  </li>
                ))}
              </ul>
            </div>
          )}
          {phase === "mark" ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                const score = q.marks ? ticked / q.marks : 0;
                const o: QuestionOutcome = { score, correct: score >= 1, hints, tries: 1, solutionShown: false, answer: value };
                setResult(o);
                setPhase("done");
                onDone?.(o);
              }}
            >
              Save my marks ({ticked}/{q.marks})
            </button>
          ) : null}
        </div>
      ) : null}
      {phase === "done" && result ? (
        <Verdict status={result.correct ? "correct" : result.score > 0 ? "partial" : "incorrect"}>
          <p>
            You gave yourself <strong>{Math.round(result.score * q.marks)}</strong> out of {q.marks}.
          </p>
          <AfterPanel q={q} topicId={topicId} onNext={onNext} nextLabel={nextLabel} answerText={value} />
        </Verdict>
      ) : null}
    </div>
  );
}
