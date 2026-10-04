"use client";
// Fluency sprint: quick-fire mental-maths facts, timed (60 s) or untimed.
// Wrong answers never stop the flow — they come back a few questions later
// and are listed at the end. Scores are only ever compared with your own best.
import { useEffect, useEffectEvent, useRef, useState, type FormEvent } from "react";
import { flushSync } from "react-dom";
import type { Rng } from "@/lib/drills/types";
import { makeRng } from "@/lib/drills/rng";
import { freshSeed } from "@/lib/drills";
import { checkAnswer } from "@/lib/answerCheck";
import { parseNumberAnswer } from "@/lib/mathParse";
import { todayISO } from "@/lib/dates";
import { useStore } from "@/lib/store";
import {
  SPRINT_MODES,
  SPRINT_MODE_INFO,
  SPRINT_SECONDS,
  sprintAwardKey,
  sprintBestKey,
  sprintItem,
  sprintStars,
  type SprintItem,
  type SprintMode,
} from "@/lib/sprint";
import { RichInline } from "./Rich";

type Phase = "pick" | "run" | "done";

interface Current {
  item: SprintItem;
  /** A fact missed earlier, coming back for a second go. */
  retry: boolean;
}

interface Miss {
  key: string;
  fact: string;
  /** What the learner typed ("" = passed). */
  given: string;
  /** Answered correctly when it came back. */
  fixed: boolean;
}

interface Run {
  mode: SprintMode;
  timed: boolean;
  score: number;
  answered: number;
  misses: Miss[];
  /** Missed facts waiting to come back, due after `due` answers. */
  queue: { item: SprintItem; due: number }[];
  /** Recent prompts (avoid immediate repeats). */
  recent: string[];
  current: Current | null;
  startedAt: number;
  endAt: number;
  finished: boolean;
}

interface Flash {
  n: number;
  ok: boolean;
  fact: string;
  hint?: string;
}

interface Summary {
  mode: SprintMode;
  timed: boolean;
  score: number;
  answered: number;
  seconds: number;
  stoppedEarly: boolean;
  misses: Miss[];
  prevBest?: number;
  newBest: boolean;
  starsWanted: number;
  starsEarned: number;
}

const DURATION_MS = SPRINT_SECONDS * 1000;

/** Wall-clock time (only ever read in handlers and timers). */
function clock(): number {
  return Date.now();
}
const RETRY_GAP = [3, 5] as const;

function idleRun(): Run {
  return { mode: "tables", timed: true, score: 0, answered: 0, misses: [], queue: [], recent: [], current: null, startedAt: 0, endAt: 0, finished: true };
}

/** Next fact: a due retry first, otherwise a fresh one that isn't a recent repeat. */
function draw(run: Run, rng: Rng): Current {
  const dueIdx = run.queue.findIndex((p) => p.due <= run.answered);
  let next: Current;
  if (dueIdx >= 0) {
    const [p] = run.queue.splice(dueIdx, 1);
    next = { item: p.item, retry: true };
  } else {
    let item = sprintItem(run.mode, rng);
    for (let i = 0; i < 30 && (run.recent.includes(item.prompt) || run.queue.some((p) => p.item.prompt === item.prompt)); i++) {
      item = sprintItem(run.mode, rng);
    }
    next = { item, retry: false };
  }
  run.recent = [...run.recent, next.item.prompt].slice(-12);
  return next;
}

/** Plain-text length of a prompt outside the maths spans (to size it). */
function wordy(prompt: string): boolean {
  return prompt.replace(/\{\{[\s\S]*?\}\}/g, "").trim().length > 6;
}

export function SprintRunner() {
  const store = useStore();
  const [phase, setPhase] = useState<Phase>("pick");
  const [timed, setTimed] = useState(true);
  const [mode, setMode] = useState<SprintMode>("tables");
  const [cur, setCur] = useState<Current | null>(null);
  const [value, setValue] = useState("");
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(0);
  const [flash, setFlash] = useState<Flash | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [remaining, setRemaining] = useState(DURATION_MS);
  const [summary, setSummary] = useState<Summary | null>(null);

  const runRef = useRef<Run>(idleRun());
  const rngRef = useRef<Rng | null>(null);
  const flashSeq = useRef(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const doneHeadingRef = useRef<HTMLHeadingElement>(null);
  const pickHeadingRef = useRef<HTMLHeadingElement>(null);
  const prevPhase = useRef<Phase>("pick");

  const today = todayISO();

  // ---------------------------------------------------------------- actions

  function start(m: SprintMode, t: boolean) {
    const rng = makeRng(freshSeed());
    rngRef.current = rng;
    const now = clock();
    const run: Run = { mode: m, timed: t, score: 0, answered: 0, misses: [], queue: [], recent: [], current: null, startedAt: now, endAt: now + DURATION_MS, finished: false };
    run.current = draw(run, rng);
    runRef.current = run;
    // Render the run screen synchronously so the answer box can take focus
    // inside this tap (which is what opens the keyboard on phones).
    flushSync(() => {
      setMode(m);
      setTimed(t);
      setCur(run.current);
      setValue("");
      setScore(0);
      setAnswered(0);
      setFlash(null);
      setNote(null);
      setRemaining(DURATION_MS);
      setSummary(null);
      setPhase("run");
    });
    inputRef.current?.focus();
    window.scrollTo({ top: 0 });
  }

  function finish(stoppedEarly: boolean) {
    const run = runRef.current;
    if (run.finished) return;
    run.finished = true;
    if (run.answered === 0 && (stoppedEarly || !run.timed)) {
      // Nothing answered: just go back to the mode picker.
      setPhase("pick");
      return;
    }
    const bestKey = sprintBestKey(run.mode);
    const prevBest = store.data.bests[bestKey];
    const newBest = run.timed && run.score > 0 ? store.setBest(bestKey, run.score) : false;
    const starsWanted = sprintStars(run.score);
    const starsEarned = starsWanted > 0 ? store.award(sprintAwardKey(run.mode, todayISO()), starsWanted) : 0;
    const seconds = Math.min(SPRINT_SECONDS, Math.max(1, Math.round((clock() - run.startedAt) / 1000)));
    setSummary({
      mode: run.mode,
      timed: run.timed,
      score: run.score,
      answered: run.answered,
      seconds,
      stoppedEarly,
      misses: run.misses.map((m) => ({ ...m })),
      prevBest,
      newBest,
      starsWanted,
      starsEarned,
    });
    setPhase("done");
  }

  /** Mark the current fact. `raw === null` means the learner passed. */
  function answer(raw: string | null) {
    const run = runRef.current;
    const rng = rngRef.current;
    if (run.finished || !run.current || !rng) return;
    if (run.timed && clock() >= run.endAt) {
      finish(false);
      return;
    }
    const { item, retry } = run.current;
    let ok = false;
    let hint: string | undefined;
    if (raw !== null) {
      // Every sprint answer is a whole number or a decimal. A fraction typed back
      // ("63/9", or "3/4" for "write 3/4 as a decimal") isn't an answer yet:
      // nudge, don't mark.
      if (parseNumberAnswer(raw)?.frac) {
        setNote(Number.isInteger(item.answer) ? "Work it out and type the answer as a whole number." : "Type it as a decimal, like 0.75.");
        inputRef.current?.focus();
        return;
      }
      const res = checkAnswer({ type: "number", value: item.answer, allowFraction: false }, raw);
      if (res.status === "invalid") {
        setNote("Type a single number, like 12 or −3.5.");
        inputRef.current?.focus();
        return;
      }
      ok = res.status === "correct";
      // Only the sign hint helps here ("close" rounding advice doesn't apply to exact facts).
      hint = res.status === "incorrect" ? res.feedback : undefined;
    }
    run.answered += 1;
    const miss = run.misses.find((m) => m.key === item.prompt);
    if (ok) {
      run.score += 1;
      if (miss) miss.fixed = true;
    } else {
      if (miss) {
        miss.given = raw ?? "";
        miss.fixed = false;
      } else run.misses.push({ key: item.prompt, fact: item.fact, given: raw ?? "", fixed: false });
      // Not straight away — a few questions later, once.
      if (!retry) run.queue.push({ item, due: run.answered + rng.int(RETRY_GAP[0], RETRY_GAP[1]) });
    }
    run.current = draw(run, rng);
    flashSeq.current += 1;
    setFlash({ n: flashSeq.current, ok, fact: item.fact, hint });
    setCur(run.current);
    setScore(run.score);
    setAnswered(run.answered);
    setValue("");
    setNote(null);
    inputRef.current?.focus();
  }

  function submit(e: FormEvent) {
    e.preventDefault();
    const raw = value.trim();
    if (!raw) {
      inputRef.current?.focus();
      return;
    }
    answer(raw);
  }

  function toggleMinus() {
    setValue((v) => (v.startsWith("-") || v.startsWith("−") ? v.slice(1) : `-${v}`));
    setNote(null);
    const el = inputRef.current;
    el?.focus();
    requestAnimationFrame(() => {
      if (el) el.setSelectionRange(el.value.length, el.value.length);
    });
  }

  function backToPick() {
    setPhase("pick");
  }

  // ---------------------------------------------------------------- effects

  const onTick = useEffectEvent(() => {
    const left = runRef.current.endAt - clock();
    setRemaining(Math.max(0, left));
    if (left <= 0) finish(false);
  });

  useEffect(() => {
    if (phase !== "run" || !timed) return;
    const id = window.setInterval(() => onTick(), 250);
    return () => window.clearInterval(id);
  }, [phase, timed]);

  // In a timed run the ✓/✗ flash fades quickly; untimed keeps the last one visible.
  useEffect(() => {
    if (!flash || !timed || phase !== "run") return;
    const n = flash.n;
    const t = window.setTimeout(() => setFlash((f) => (f && f.n === n ? null : f)), flash.ok ? 700 : 1800);
    return () => window.clearTimeout(t);
  }, [flash, timed, phase]);

  // Move focus to the new screen's heading for keyboard / screen-reader users
  // (the run screen focuses the answer box itself, inside the tap).
  useEffect(() => {
    if (prevPhase.current === phase) return;
    prevPhase.current = phase;
    if (phase === "done") {
      doneHeadingRef.current?.focus();
      window.scrollTo({ top: 0 });
    } else if (phase === "pick") {
      pickHeadingRef.current?.focus();
    }
  }, [phase]);

  // ---------------------------------------------------------------- views

  if (phase === "run" && cur) {
    const info = SPRINT_MODE_INFO[mode];
    const secsLeft = Math.ceil(remaining / 1000);
    const pctLeft = Math.max(0, Math.min(100, (100 * remaining) / DURATION_MS));
    const milestone = !timed ? "" : secsLeft <= 10 ? "10 seconds left" : secsLeft <= 30 ? "30 seconds left" : "";
    const suffix = cur.item.suffix;
    return (
      <div className="mx-auto max-w-xl space-y-4">
        <div className="flex items-center gap-3">
          <h1 className="min-w-0 flex-1 truncate text-lg font-extrabold">
            <span aria-hidden>{info.icon}</span> {info.label}
            <span className="sr-only"> — {timed ? "timed sprint" : "untimed practice"}</span>
          </h1>
          <span className="chip border-0 bg-good-soft text-good tabular-nums" aria-label={`${score} correct`}>
            ✓ {score}
          </span>
          <button type="button" className="btn btn-ghost text-sm" onClick={() => finish(true)}>
            {timed ? "Stop" : "Finish"}
          </button>
        </div>

        {timed ? (
          <div className="flex items-center gap-3">
            <div
              className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2"
              role="progressbar"
              aria-label="Time left"
              aria-valuemin={0}
              aria-valuemax={SPRINT_SECONDS}
              aria-valuenow={secsLeft}
              aria-valuetext={`${secsLeft} seconds left`}
            >
              <div className={`h-full rounded-full transition-[width] duration-300 ease-linear ${secsLeft <= 10 ? "bg-warn" : "bg-brand"}`} style={{ width: `${pctLeft}%` }} />
            </div>
            <span className={`w-12 text-right text-sm font-extrabold tabular-nums ${secsLeft <= 10 ? "text-warn" : "text-ink-2"}`} aria-hidden>
              {secsLeft}s
            </span>
            <span className="sr-only" aria-live="polite">
              {milestone}
            </span>
          </div>
        ) : (
          <p className="text-sm text-ink-2">
            Untimed practice · {answered} answered · take your time.
          </p>
        )}

        <section className="card p-5 text-center sm:p-8" aria-label="Current question">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-2">
            Question {answered + 1}
            {cur.retry ? <span className="ml-2 rounded-full bg-info-soft px-2 py-0.5 normal-case tracking-normal text-info">Second go</span> : null}
          </p>
          <p
            className={`mt-3 flex min-h-[4.5rem] items-center justify-center font-extrabold leading-tight ${wordy(cur.item.prompt) ? "text-2xl sm:text-3xl" : "text-4xl sm:text-5xl"}`}
            aria-live="polite"
            aria-atomic="true"
          >
            <RichInline text={cur.item.prompt} />
          </p>

          <form onSubmit={submit} className="mt-5" noValidate>
            <label htmlFor="sprint-answer" className="sr-only">
              Your answer{suffix === "%" ? " as a percentage" : ""}
            </label>
            <div className="relative mx-auto max-w-xs">
              <input
                id="sprint-answer"
                ref={inputRef}
                value={value}
                onChange={(e) => {
                  setValue(e.target.value);
                  setNote(null);
                }}
                inputMode="text"
                enterKeyHint="go"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck={false}
                placeholder="?"
                aria-describedby="sprint-feedback"
                className={`input h-16 text-center text-3xl font-extrabold tabular-nums ${suffix ? "pr-12 pl-12" : ""}`}
              />
              {suffix ? (
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-2xl font-extrabold text-ink-2" aria-hidden>
                  {suffix}
                </span>
              ) : null}
            </div>
            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                className="kbd h-12 min-w-12 text-xl"
                onMouseDown={(e) => e.preventDefault()}
                onClick={toggleMinus}
                aria-label="Minus sign"
                title="Type a minus sign"
              >
                −
              </button>
              <button type="submit" className="btn btn-primary h-12 px-6" onMouseDown={(e) => e.preventDefault()}>
                Enter <span aria-hidden>↵</span>
              </button>
              <button type="button" className="btn btn-ghost h-12" onMouseDown={(e) => e.preventDefault()} onClick={() => answer(null)}>
                Pass
              </button>
            </div>
          </form>

          <div id="sprint-feedback" className="mt-4 flex min-h-[2.75rem] items-center justify-center" aria-live="polite">
            {note ? (
              <span className="rounded-xl bg-info-soft px-3 py-1.5 text-sm font-semibold text-info">{note}</span>
            ) : flash ? (
              flash.ok ? (
                <span key={flash.n} className="animate-pop rounded-xl bg-good-soft px-3 py-1.5 font-extrabold text-good">
                  ✓ Correct
                </span>
              ) : (
                <span key={flash.n} className="animate-pop rounded-xl bg-bad-soft px-3 py-1.5 text-left">
                  <span className="font-extrabold text-bad">✗ </span>
                  <span className="font-bold text-ink">
                    <RichInline text={flash.fact} />
                  </span>
                  {flash.hint ? <span className="block text-xs text-ink-2">{flash.hint}</span> : null}
                </span>
              )
            ) : null}
          </div>
        </section>

        <p className="text-center text-xs text-ink-2">
          Press <kbd className="rounded border border-line bg-surface-2 px-1">Enter</kbd> to answer. Missed one? Keep going — it&apos;ll come back in a few questions.
        </p>
      </div>
    );
  }

  if (phase === "done" && summary) {
    const info = SPRINT_MODE_INFO[summary.mode];
    const accuracy = summary.answered ? Math.round((100 * summary.score) / summary.answered) : 0;
    const still = summary.misses.filter((m) => !m.fixed).length;
    let bestLine: string | null = null;
    if (summary.timed) {
      if (summary.newBest && summary.prevBest !== undefined) bestLine = `🏅 New personal best! Up from ${summary.prevBest}.`;
      else if (summary.newBest) bestLine = "🏁 Your first timed score — now you have a best to beat.";
      else if (summary.prevBest !== undefined && summary.score === summary.prevBest) bestLine = `You matched your best of ${summary.prevBest}. That's real consistency.`;
      else if (summary.prevBest !== undefined) bestLine = `Your best is ${summary.prevBest}. Some days are quicker than others — every run still builds fluency.`;
      else bestLine = "Every run counts. Untimed practice is a great way to build up speed calmly.";
    }
    let starLine: string;
    if (summary.starsEarned > 0) starLine = `+${summary.starsEarned} ⭐ for today's ${info.label.toLowerCase()} ${summary.timed ? "sprint" : "practice"}.`;
    else if (summary.starsWanted > 0) starLine = `You've already collected today's stars for ${info.label.toLowerCase()} — the practice still counts.`;
    else starLine = "Get 5 right in one go to earn a star (up to 5 ⭐ per sprint type each day).";

    return (
      <div className="mx-auto max-w-xl space-y-4">
        <section className="card p-6 text-center sm:p-8" aria-labelledby="sprint-done">
          <p className="text-sm font-bold text-ink-2">
            <span aria-hidden>{info.icon}</span> {info.label} · {summary.timed ? "timed" : "untimed"}
          </p>
          <h1 id="sprint-done" ref={doneHeadingRef} tabIndex={-1} className="mt-1 text-2xl font-extrabold outline-none">
            {summary.timed ? (summary.stoppedEarly ? "Sprint stopped" : "Time’s up!") : "Practice complete"}
          </h1>
          <p className="mt-4 text-6xl font-black tabular-nums text-brand">{summary.score}</p>
          <p className="mt-1 font-bold">
            {summary.timed ? `correct in ${summary.seconds} ${summary.seconds === 1 ? "second" : "seconds"}` : `correct out of ${summary.answered}`}
          </p>
          <p className="mt-1 text-sm text-ink-2">
            {summary.answered ? `${summary.answered} answered · ${accuracy}% accurate` : "No answers this time — have another go when you're ready."}
          </p>
          {bestLine ? (
            <p className={`mt-4 rounded-xl px-4 py-2 font-bold ${summary.newBest ? "animate-pop bg-accent-soft" : "bg-surface-2"}`} role="status">
              {bestLine}
            </p>
          ) : null}
          <p className="mt-3 text-sm text-ink-2">{starLine}</p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <button type="button" className="btn btn-primary" onClick={() => start(summary.mode, summary.timed)}>
              Again
            </button>
            <button type="button" className="btn btn-secondary" onClick={backToPick}>
              Change mode
            </button>
            <button type="button" className="btn btn-ghost" onClick={() => start(summary.mode, !summary.timed)}>
              {summary.timed ? "Try it untimed" : "Try a timed sprint"}
            </button>
          </div>
        </section>

        <section className="card p-4 sm:p-5" aria-labelledby="sprint-missed">
          <h2 id="sprint-missed" className="section-title">
            {summary.misses.length ? "Facts to look at again" : "No slips"}
          </h2>
          {summary.misses.length ? (
            <>
              <ul className="mt-3 divide-y divide-line">
                {summary.misses.map((m) => (
                  <li key={m.key} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 py-2.5">
                    <span className="text-lg font-bold">
                      <RichInline text={m.fact} />
                    </span>
                    <span className="flex flex-wrap items-center gap-2 text-sm text-ink-2">
                      {m.given ? (
                        <span>
                          You wrote <span className="font-bold text-ink tabular-nums">{m.given}</span>
                        </span>
                      ) : (
                        <span>Passed</span>
                      )}
                      {m.fixed ? <span className="chip border-0 bg-good-soft text-good">✓ Right when it came back</span> : null}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-sm text-ink-2">
                {still
                  ? "Say each fact out loud a couple of times, cover it, and say it again. Then try another sprint tomorrow — that's how facts stick."
                  : "You fixed every one when it came back — that's exactly how facts stick."}
              </p>
            </>
          ) : (
            <p className="mt-2 text-ink-2">Every answer was right. Lovely, accurate work.</p>
          )}
        </section>

        <p className="text-center text-sm text-ink-2">
          Only compare with your own best. Untimed practice is just as good for learning — accuracy first, and speed follows.
        </p>
      </div>
    );
  }

  // ------------------------------------------------------------ mode picker
  return (
    <div className="space-y-6">
      <header>
        <h1 ref={pickHeadingRef} tabIndex={-1} className="text-2xl font-extrabold tracking-tight outline-none sm:text-3xl">
          <span aria-hidden>⚡</span> Fluency sprint
        </h1>
        <p className="mt-1 max-w-2xl text-ink-2">
          Quick-fire facts. When the basics are instant, your brain has more room for the interesting problems. Your only competition is your own best.
        </p>
      </header>

      <fieldset className="card p-4 sm:p-5">
        <legend className="sr-only">Timing</legend>
        <div className="grid grid-cols-2 gap-2">
          {[
            { t: true, title: "⏱ Timed · 60 s", sub: "How many in a minute?" },
            { t: false, title: "🧘 Untimed practice", sub: "No clock — stop whenever." },
          ].map((o) => {
            const on = timed === o.t;
            return (
              <label
                key={String(o.t)}
                className={`flex cursor-pointer flex-col rounded-xl border-2 px-3 py-2.5 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand ${on ? "border-brand bg-brand-soft" : "border-line hover:bg-surface-2"}`}
              >
                <input type="radio" name="sprint-timing" className="sr-only" checked={on} onChange={() => setTimed(o.t)} />
                <span className="font-extrabold">{o.title}</span>
                <span className="text-xs text-ink-2">{o.sub}</span>
              </label>
            );
          })}
        </div>
        <p className="mt-3 text-sm text-ink-2">
          {timed
            ? "Answer as many as you can in 60 seconds. Wrong answers don't stop you — they come back a little later."
            : "Untimed practice is just as good for learning: get them right first, and speed follows on its own."}
        </p>
      </fieldset>

      <section aria-labelledby="sprint-modes" className="space-y-3">
        <h2 id="sprint-modes" className="section-title">
          Choose your facts
        </h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {SPRINT_MODES.map((m) => {
            const info = SPRINT_MODE_INFO[m];
            const best = store.data.bests[sprintBestKey(m)];
            const starredToday = !!store.data.awarded[sprintAwardKey(m, today)];
            return (
              <button
                key={m}
                type="button"
                onClick={() => start(m, timed)}
                className={`card flex h-full flex-col items-start gap-2 p-4 text-left transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${m === "mixed" ? "sm:col-span-2" : ""}`}
              >
                <span className="flex w-full items-center gap-3">
                  <span className="text-3xl" aria-hidden>
                    {info.icon}
                  </span>
                  <span className="min-w-0 flex-1 text-lg font-extrabold leading-tight">{info.label}</span>
                  <span className="chip shrink-0 tabular-nums">{best !== undefined ? `🏅 Best ${best}` : "No best yet"}</span>
                </span>
                <span className="text-sm text-ink-2">{info.description}</span>
                <span className="text-sm">
                  <span className="sr-only">For example: </span>
                  <RichInline text={info.example} />
                </span>
                <span className="mt-auto flex w-full items-center justify-between gap-2 pt-1 text-sm font-bold">
                  <span className="text-brand">{timed ? "Start 60-second sprint" : "Start practice"} <span aria-hidden>→</span></span>
                  {starredToday ? <span className="text-xs font-semibold text-ink-2">⭐ today&apos;s stars collected</span> : null}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <section className="card p-4 text-sm sm:p-5" aria-labelledby="sprint-how">
        <h2 id="sprint-how" className="font-extrabold">
          How it works
        </h2>
        <ul className="rich-ul mt-2 space-y-1 text-ink-2">
          <li>Type your answer and press Enter — the next one appears straight away. Use the − button for negatives.</li>
          <li>Missed one? Keep going. It comes back a few questions later, and you&apos;ll see every fact to revisit at the end.</li>
          <li>Earn 1 ⭐ for every 5 correct, up to 5 ⭐ for each type of sprint per day.</li>
          <li>Personal bests are for timed sprints. Untimed practice is just as valuable — calm, accurate recall is what makes you fast.</li>
        </ul>
      </section>
    </div>
  );
}
