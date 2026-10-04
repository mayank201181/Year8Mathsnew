"use client";
// One generated drill question: type → check (2 tries) → worked solution.
import { useEffect, useRef, useState } from "react";
import type { DrillItem } from "@/lib/drills/types";
import { checkWithTraps, displayAnswer, type CheckStatus } from "@/lib/answerCheck";
import { Diagram, Rich, RichInline } from "./Rich";
import { AnswerInput } from "./AnswerInput";

export interface DrillOutcome {
  correct: boolean;
  tries: number;
  hinted: boolean;
  solutionShown: boolean;
  slip?: string;
}

const MAX_TRIES = 2;

export function DrillItemCard({
  item,
  onDone,
  onNext,
  nextLabel = "Next question →",
  header,
}: {
  item: DrillItem;
  onDone: (o: DrillOutcome) => void;
  onNext?: () => void;
  nextLabel?: string;
  header?: React.ReactNode;
}) {
  const [value, setValue] = useState("");
  const [tries, setTries] = useState(0);
  const [hinted, setHinted] = useState(false);
  const [msg, setMsg] = useState<{ status: CheckStatus; text?: string } | null>(null);
  const [done, setDone] = useState<DrillOutcome | null>(null);
  const [slip, setSlip] = useState<string | undefined>();
  const [canHint, setCanHint] = useState(false);
  const nextRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setCanHint(true), 8000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (done) nextRef.current?.focus();
  }, [done]);

  function finish(o: DrillOutcome) {
    setDone(o);
    onDone(o);
  }

  function check() {
    if (done || !value.trim()) return;
    const r = checkWithTraps(item.answer, value, item.traps);
    if (r.status === "invalid" || r.status === "close") {
      setMsg({ status: r.status, text: r.feedback });
      return;
    }
    const n = tries + 1;
    setTries(n);
    if (r.status === "correct") {
      setMsg(null);
      finish({ correct: true, tries: n, hinted, solutionShown: false, slip });
      return;
    }
    const s = r.feedback && item.traps?.some((t) => t.feedback === r.feedback) ? r.feedback : slip;
    setSlip(s);
    setCanHint(true);
    if (n >= MAX_TRIES) {
      setMsg({ status: "incorrect", text: r.feedback });
      finish({ correct: false, tries: n, hinted, solutionShown: true, slip: s });
    } else {
      setMsg({ status: "incorrect", text: r.feedback });
    }
  }

  return (
    <article className="card p-4 sm:p-6">
      {header}
      <Rich text={item.prompt} className="text-[1.08rem]" />
      {item.diagram ? <Diagram svg={item.diagram} /> : null}
      <div className="mt-4">
        <AnswerInput value={value} onChange={(v) => { setValue(v); setMsg(null); }} onSubmit={check} type={item.answer.type} disabled={!!done} autoFocus />
      </div>
      {!done ? (
        <>
          {msg ? (
            <div className={`animate-pop mt-3 rounded-xl px-3 py-2 text-sm ${msg.status === "incorrect" ? "animate-shake bg-bad-soft" : msg.status === "close" ? "bg-warn-soft" : "bg-info-soft"}`} role="status" aria-live="polite">
              {msg.status === "incorrect" ? <strong>Not quite. </strong> : msg.status === "close" ? <strong>Almost! </strong> : null}
              {msg.text ?? (msg.status === "incorrect" ? "Check your working and try once more." : null)}
            </div>
          ) : null}
          {hinted && item.hint ? (
            <div className="mt-3 rounded-xl bg-warn-soft px-3 py-2 text-sm">
              <strong>Hint: </strong>
              <RichInline text={item.hint} />
            </div>
          ) : null}
          <div className="mt-4 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary" onClick={check} disabled={!value.trim()}>
              Check
            </button>
            {item.hint && !hinted ? (
              <button type="button" className="btn btn-ghost" onClick={() => setHinted(true)} disabled={!canHint}>
                💡 Hint{!canHint ? " (have a go first)" : ""}
              </button>
            ) : null}
            {tries > 0 ? (
              <button type="button" className="btn btn-ghost" onClick={() => finish({ correct: false, tries, hinted, solutionShown: true, slip })}>
                Show solution
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <div className={`animate-pop mt-4 rounded-xl border-l-4 p-4 ${done.correct ? "border-good bg-good-soft" : "border-bad bg-bad-soft"}`} role="status" aria-live="polite">
          <div className="font-extrabold">{done.correct ? (done.tries === 1 && !done.hinted ? "✅ Correct — clean solve!" : "✅ Correct") : "Not this time"}</div>
          {/* Only specific feedback on the last wrong answer (a trap or checker hint) — never a "try again" prompt. */}
          {!done.correct && msg?.status === "incorrect" && msg.text ? <p className="mt-1 font-semibold">{msg.text}</p> : null}
          <p className="mt-2">
            <strong>Answer: </strong>
            <RichInline text={displayAnswer(item.answer)} />
          </p>
          <ol className="rich-ol mt-2">
            {item.solution.map((s, i) => (
              <li key={i}>
                <RichInline text={s} />
              </li>
            ))}
          </ol>
          {onNext ? (
            <div className="mt-3 flex justify-end">
              <button ref={nextRef} type="button" className="btn btn-primary" onClick={onNext}>
                {nextLabel}
              </button>
            </div>
          ) : null}
        </div>
      )}
    </article>
  );
}
