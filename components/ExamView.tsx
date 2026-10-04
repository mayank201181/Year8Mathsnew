"use client";
// The Big Exam: choose a cross-topic paper, decide whether to use the clock,
// then sit it in PaperRunner (answers collected, marked at the end).
import Link from "next/link";
import { useId, useState } from "react";
import type { ExamPaper } from "@/lib/types";
import type { AttemptState } from "@/lib/profileTypes";
import { useStore } from "@/lib/store";
import { PaperRunner } from "./PaperRunner";

export interface ExamViewProps {
  papers: ExamPaper[];
  topicTitles: Record<string, string>;
  /** Ready topics with practice papers (shown while the exam papers are being written). */
  practiceTopics?: { id: string; title: string; icon: string }[];
}

type PaperStatus =
  | { kind: "new" }
  | { kind: "progress"; answered: number }
  | { kind: "done"; pct: number; toMark: number };

interface Setup {
  paperId: string;
  /** Clear the previous attempt before starting. */
  restart: boolean;
  /** Resuming a timed attempt: whole minutes left on its clock (null = a fresh clock). */
  minutesLeft: number | null;
}

const attemptKey = (p: ExamPaper) => `exam:${p.id}`;

function paperStatus(paper: ExamPaper, a: AttemptState | undefined): PaperStatus {
  if (!a) return { kind: "new" };
  const total = paper.questions.length;
  if (a.completed) {
    let score = 0;
    let toMark = 0;
    for (const q of paper.questions) {
      const r = a.results[q.id];
      if (r) score += r.r;
      else if (q.kind === "written") toMark++;
    }
    return { kind: "done", pct: total ? Math.round((100 * score) / total) : 0, toMark };
  }
  const answered = paper.questions.filter((q) => a.answers[q.id] !== undefined && a.answers[q.id] !== "").length;
  return { kind: "progress", answered };
}

/** Whole minutes left on a resumed attempt's clock (PaperRunner counts from startedAt). Event handlers only. */
function clockMinutesLeft(a: AttemptState | undefined, minutes: number): number {
  if (!a?.startedAt) return 0;
  return Math.floor((a.startedAt + minutes * 60000 - Date.now()) / 60000);
}

/** Move focus once React has committed the next screen (event handlers only). */
function focusSoon(id: string) {
  if (typeof window === "undefined") return;
  window.requestAnimationFrame(() => document.getElementById(id)?.focus({ preventScroll: true }));
}

function topicCount(paper: ExamPaper): number {
  return new Set(paper.questions.map((q) => q.topicId).filter(Boolean)).size;
}

const TIPS = [
  {
    icon: "✏️",
    title: "Show your working on paper",
    text: "Keep scrap paper and a pencil beside you. Writing each step makes slips easy to spot — and in a real exam, method earns marks even when the final answer is wrong.",
  },
  {
    icon: "📏",
    title: "Check units and rounding",
    text: "Before you type, re-read the question: cm or cm²? To 1 decimal place or 3 significant figures? A fraction or a decimal?",
  },
  {
    icon: "⏭️",
    title: "Skip and come back",
    text: "Stuck for more than a couple of minutes? Jump ahead with the numbered buttons and return later with fresh eyes. Easy marks first.",
  },
  {
    icon: "🔍",
    title: "Estimate, then check",
    text: "A quick estimate tells you whether an answer is sensible. Leave five minutes at the end to look back over everything.",
  },
];

// ---------------------------------------------------------------- pieces

function CalcBadge({ calculator }: { calculator: boolean }) {
  return calculator ? (
    <span className="chip border-0 bg-info-soft text-info">
      <span aria-hidden>🧮</span> Calculator
    </span>
  ) : (
    <span className="chip border-0 bg-bad-soft text-bad">
      <span aria-hidden>🚫🧮</span> Non-calculator
    </span>
  );
}

function StatusChip({ status }: { status: PaperStatus }) {
  if (status.kind === "new") return <span className="chip">Not started</span>;
  if (status.kind === "progress") return <span className="chip border-0 bg-warn-soft text-warn">In progress</span>;
  return <span className="chip border-0 bg-good-soft text-good">Completed · {status.pct}%</span>;
}

function Bar({ value, tone, label }: { value: number; tone: "brand" | "good" | "warn" | "bad"; label: string }) {
  const fill = { brand: "bg-brand", good: "bg-good", warn: "bg-warn", bad: "bg-bad" }[tone];
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)}>
      <div className={`h-full rounded-full ${fill} transition-[width] duration-500`} style={{ width: `${pct}%` }} />
    </div>
  );
}

function Switch({ checked, onChange, disabled, labelledBy, describedBy }: { checked: boolean; onChange: (v: boolean) => void; disabled?: boolean; labelledBy: string; describedBy: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className="group inline-flex h-10 w-16 shrink-0 items-center justify-center rounded-full disabled:cursor-not-allowed disabled:opacity-50"
    >
      <span className={`relative inline-flex h-7 w-12 items-center rounded-full border transition-colors group-focus-visible:ring-2 group-focus-visible:ring-brand group-focus-visible:ring-offset-2 group-focus-visible:ring-offset-surface-2 ${checked ? "border-brand bg-brand" : "border-line bg-surface"}`}>
        <span aria-hidden className={`inline-block h-5 w-5 rounded-full shadow-sm transition-transform ${checked ? "translate-x-6 bg-brand-ink" : "translate-x-1 bg-ink-2"}`} />
      </span>
    </button>
  );
}

// ------------------------------------------------------------------ view

export function ExamView({ papers, topicTitles, practiceTopics = [] }: ExamViewProps) {
  const store = useStore();
  const { data } = store;
  const [setup, setSetup] = useState<Setup | null>(null);
  const [useTimer, setUseTimer] = useState(false);
  const [running, setRunning] = useState<{ paperId: string; timed: boolean } | null>(null);
  const uid = useId();

  function scrollTop() {
    if (typeof window !== "undefined") window.scrollTo({ top: 0 });
  }

  function openSetup(paper: ExamPaper, restart: boolean) {
    const a = data.attempts[attemptKey(paper)];
    const resuming = !restart && !!a && !a.completed;
    const minutesLeft = resuming ? clockMinutesLeft(a, paper.minutes) : null;
    setUseTimer(false);
    setSetup({ paperId: paper.id, restart, minutesLeft });
  }

  function launch(paper: ExamPaper, timed: boolean, restart = false) {
    const a = data.attempts[attemptKey(paper)];
    // A resumed clock may have run out while the start panel was open: carry on
    // untimed rather than opening a paper that is marked the moment it loads.
    const clockOk = !timed || restart || !a || a.completed || clockMinutesLeft(a, paper.minutes) >= 1;
    if (restart) store.clearAttempt(attemptKey(paper));
    setRunning({ paperId: paper.id, timed: timed && clockOk });
    setSetup(null);
    store.setLast("/exam", `The Big Exam · ${paper.title}`);
    scrollTop();
    focusSoon(`${uid}-run`);
  }

  function exit() {
    const id = running?.paperId;
    setRunning(null);
    scrollTop();
    if (id) focusSoon(`${uid}-act-${id}`);
  }

  function cancelSetup(paper: ExamPaper) {
    setSetup(null);
    focusSoon(`${uid}-act-${paper.id}`);
  }

  // ------------------------------------------------------------ sitting a paper
  const active = running ? papers.find((p) => p.id === running.paperId) : undefined;
  if (running && active) {
    return (
      <div id={`${uid}-run`} tabIndex={-1} role="region" className="space-y-4 outline-none" aria-label={`The Big Exam: ${active.title}`}>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-ghost btn-sm min-h-10" onClick={exit}>
            ← All papers
          </button>
          <CalcBadge calculator={active.calculator} />
          <span className="chip">{running.timed ? `⏱ Timed · ${active.minutes} min` : "Untimed"}</span>
        </div>
        {!active.calculator ? (
          <p className="rounded-xl bg-surface-2 px-4 py-2.5 text-sm text-ink-2">
            <strong className="text-ink">Non-calculator paper:</strong> put the calculator away — every question can be done with mental or written methods.
          </p>
        ) : null}
        <PaperRunner
          key={`${active.id}:${running.timed ? "timed" : "untimed"}`}
          attemptKey={attemptKey(active)}
          title={active.title}
          questions={active.questions}
          mode="exam"
          minutes={running.timed ? active.minutes : undefined}
          topicTitles={topicTitles}
          onExit={exit}
        />
      </div>
    );
  }

  // ---------------------------------------------------------------- overview
  const statuses = papers.map((p) => paperStatus(p, data.attempts[attemptKey(p)]));
  const done = statuses.filter((s): s is Extract<PaperStatus, { kind: "done" }> => s.kind === "done");
  const best = done.length ? Math.max(...done.map((s) => s.pct)) : null;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">The Big Exam</h1>
        <p className="max-w-2xl text-ink-2">Mixed questions from every topic, marked at the end like a real paper.</p>
        {papers.length && done.length ? (
          <p className="text-sm font-bold text-ink-2">
            {done.length} of {papers.length} paper{papers.length === 1 ? "" : "s"} completed
            {best !== null ? ` · best score ${best}%` : ""}
          </p>
        ) : null}
      </header>

      {!papers.length ? (
        <section className="card p-6 text-center sm:p-8" aria-labelledby={`${uid}-empty`}>
          <div className="text-4xl" aria-hidden>
            ✍️
          </div>
          <h2 id={`${uid}-empty`} className="mt-2 text-xl font-extrabold">
            The Big Exam papers are being written — check back soon
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-ink-2">
            In the meantime, every topic has its own practice papers. They&apos;re marked as you go, so they make a perfect warm-up for the real thing.
          </p>
          {practiceTopics.length ? (
            <ul className="mt-5 flex flex-wrap justify-center gap-2">
              {practiceTopics.slice(0, 12).map((t) => (
                <li key={t.id}>
                  <Link href={`/topic/${t.id}?tab=practise`} className="btn btn-secondary text-sm">
                    <span aria-hidden>{t.icon}</span> {t.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
          <div className="mt-5">
            <Link href="/topics" className="btn btn-primary">
              Browse all topics
            </Link>
          </div>
        </section>
      ) : (
        <>
          <ol className="grid gap-3 sm:grid-cols-3" aria-label="How it works">
            {[
              { n: 1, title: "Choose a paper", text: "Calculator or non-calculator, timed or not." },
              { n: 2, title: "Answer everything", text: "Nothing is marked as you go — jump between questions freely." },
              { n: 3, title: "Mark & review", text: "Get your score, mark written answers, and see which topics to revise." },
            ].map((s) => (
              <li key={s.n} className="flex gap-3 rounded-xl border border-line bg-surface-2 p-3">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand text-sm font-black text-brand-ink" aria-hidden>
                  {s.n}
                </span>
                <span className="text-sm">
                  <span className="block font-extrabold">{s.title}</span>
                  <span className="text-ink-2">{s.text}</span>
                </span>
              </li>
            ))}
          </ol>

          <ul className="space-y-3" aria-label="Exam papers">
            {papers.map((paper, i) => {
              const st = statuses[i];
              const total = paper.questions.length;
              const topics = topicCount(paper);
              const open = setup?.paperId === paper.id ? setup : null;
              const timerAvailable = open ? open.minutesLeft === null || open.minutesLeft >= 1 : false;
              const headingId = `${uid}-paper-${i}`;
              return (
                <li key={paper.id} className="card p-4 sm:p-5">
                  <div className="flex items-start gap-3">
                    <div className="hidden h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-lg font-black text-brand sm:flex" aria-hidden>
                      {i + 1}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <h2 id={headingId} className="text-lg font-extrabold leading-snug">
                          {paper.title}
                        </h2>
                        <StatusChip status={st} />
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        <CalcBadge calculator={paper.calculator} />
                        <span className="chip">⏱ {paper.minutes} min</span>
                        <span className="chip">
                          {total} question{total === 1 ? "" : "s"}
                        </span>
                        {topics > 1 ? <span className="chip">{topics} topics</span> : null}
                      </div>

                      {st.kind === "progress" ? (
                        <div className="mt-3 space-y-1">
                          <Bar value={total ? (100 * st.answered) / total : 0} tone="brand" label={`${paper.title}: answered`} />
                          <p className="text-xs text-ink-2">
                            {st.answered} of {total} answered — your answers are saved.
                          </p>
                        </div>
                      ) : st.kind === "done" ? (
                        <div className="mt-3 space-y-1">
                          <Bar value={st.pct} tone={st.pct >= 70 ? "good" : st.pct >= 40 ? "warn" : "bad"} label={`${paper.title}: score`} />
                          <p className="text-xs text-ink-2">
                            Scored {st.pct}%
                            {st.toMark ? ` · ${st.toMark} written answer${st.toMark === 1 ? "" : "s"} still to self-mark` : ""}
                          </p>
                        </div>
                      ) : null}

                      {open ? (
                        <div className="mt-4 rounded-xl border border-line bg-surface-2 p-4" role="group" aria-label={`Start ${paper.title}`}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <div id={`${headingId}-timer`} className="font-bold">
                                Use the timer
                              </div>
                              <p id={`${headingId}-timer-desc`} className="mt-0.5 text-sm text-ink-2">
                                {open.minutesLeft === null
                                  ? `${paper.minutes} minutes on the clock, like the real thing. The clock keeps running if you leave, and the paper is marked automatically when time is up.`
                                  : open.minutesLeft >= 1
                                    ? `About ${open.minutesLeft} minute${open.minutesLeft === 1 ? "" : "s"} left on this attempt's clock. The paper is marked automatically when time is up.`
                                    : "This attempt’s clock has already run out, so carry on without it — or choose Start over for a fresh timed sitting."}
                              </p>
                            </div>
                            <Switch checked={useTimer && timerAvailable} onChange={setUseTimer} disabled={!timerAvailable} labelledBy={`${headingId}-timer`} describedBy={`${headingId}-timer-desc`} />
                          </div>
                          <ul className="mt-3 list-disc space-y-0.5 pl-5 text-sm text-ink-2">
                            <li>{paper.calculator ? "You may use a calculator." : "No calculator — have scrap paper and a pencil ready."}</li>
                            <li>Answers are marked when you press “Finish & mark”. Written answers are marked by you against the mark scheme.</li>
                          </ul>
                          <div className="mt-4 flex flex-wrap gap-2">
                            <button type="button" className="btn btn-primary" autoFocus onClick={() => launch(paper, useTimer && timerAvailable, open.restart)}>
                              {st.kind === "progress" && !open.restart ? "Carry on" : "Start the paper"}
                            </button>
                            <button type="button" className="btn btn-ghost" onClick={() => cancelSetup(paper)}>
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex flex-wrap gap-2">
                          {st.kind === "new" ? (
                            <button id={`${uid}-act-${paper.id}`} type="button" className="btn btn-primary" onClick={() => openSetup(paper, false)}>
                              Start
                            </button>
                          ) : st.kind === "progress" ? (
                            <>
                              <button id={`${uid}-act-${paper.id}`} type="button" className="btn btn-primary" onClick={() => openSetup(paper, false)}>
                                Resume
                              </button>
                              <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => {
                                  if (window.confirm(`Start ${paper.title} from scratch? Your saved answers will be cleared.`)) openSetup(paper, true);
                                }}
                              >
                                Start over
                              </button>
                            </>
                          ) : (
                            <>
                              <button id={`${uid}-act-${paper.id}`} type="button" className="btn btn-primary" onClick={() => launch(paper, false)}>
                                {st.toMark ? "Review & mark" : "See results"}
                              </button>
                              <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => {
                                  if (window.confirm(`Sit ${paper.title} again? Your previous result for this paper will be replaced.`)) openSetup(paper, true);
                                }}
                              >
                                Sit it again
                              </button>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>

          <section className="card p-5" aria-labelledby={`${uid}-tips`}>
            <h2 id={`${uid}-tips`} className="section-title">
              Exam tips
            </h2>
            <ul className="mt-3 grid gap-3 sm:grid-cols-2">
              {TIPS.map((t) => (
                <li key={t.title} className="flex gap-3">
                  <span className="text-2xl leading-none" aria-hidden>
                    {t.icon}
                  </span>
                  <span className="text-sm">
                    <span className="block font-extrabold text-ink">{t.title}</span>
                    <span className="text-ink-2">{t.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}
