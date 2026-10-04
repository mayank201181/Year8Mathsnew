"use client";
// Home: a calm "what next?" dashboard — greeting, today's plan (Daily 5,
// minutes, weekly goal), continue, review, one suggestion from Professor Pi,
// rank, focus topics, quick links and every topic grouped by strand.
import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import type { TopicSummary } from "@/lib/server/content";
import type { ProgressDoc } from "@/lib/profileTypes";
import { useStore } from "@/lib/store";
import { STRANDS, TOPIC_META } from "@/lib/topics/meta";
import { drillById } from "@/lib/drills";
import { isRusty, rankFor, skillDue, skillLevel, topicOfQid } from "@/lib/learning";
import { addDaysISO, dayDiff, localISO, todayISO, weekStartISO } from "@/lib/dates";
import { ProgressBar, TopicCard, strandStyle } from "./TopicCard";

const TOPIC_IDS = TOPIC_META.map((t) => t.id);
const DAY_SHORT = ["M", "T", "W", "T", "F", "S", "S"];
const DAY_LONG = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
/** A day counts towards the weekly goal after an answer or two minutes on task. */
const ACTIVE_MS = 2 * 60 * 1000;
const GUEST_NOTE_KEY = "y8m2:guestNote:dismissed";
const TIP_PREFIX = "y8m2:tip:";

const QUICK_LINKS = [
  { href: "/sprint", icon: "⚡", label: "Fluency sprint", blurb: "Quick-fire questions — beat your best" },
  { href: "/skills", icon: "🧩", label: "Skills", blurb: "Your mastery map, skill by skill" },
  { href: "/exam", icon: "📝", label: "Big Exam", blurb: "Mixed papers across every topic" },
  { href: "/formulas", icon: "📋", label: "Formula sheet", blurb: "Every key fact on one page" },
] as const;

// ---------------------------------------------------------------------------
// Clock — local time, read through useSyncExternalStore so a server render
// (snapshot -1) never disagrees with the browser, and it ticks each minute.
// ---------------------------------------------------------------------------

interface Clock {
  today: string;
  greeting: string;
  dateLabel: string;
  now: number;
}

function subscribeMinute(onChange: () => void): () => void {
  let timer = 0;
  const schedule = () => {
    timer = window.setTimeout(() => {
      onChange();
      schedule();
    }, 60_000 - (Date.now() % 60_000) + 50);
  };
  schedule();
  const onVisible = () => {
    if (document.visibilityState === "visible") onChange();
  };
  document.addEventListener("visibilitychange", onVisible);
  return () => {
    window.clearTimeout(timer);
    document.removeEventListener("visibilitychange", onVisible);
  };
}
const currentMinute = () => Math.floor(Date.now() / 60_000);
const serverMinute = () => -1;

function clockAt(ms: number): Clock {
  const d = new Date(ms);
  const h = d.getHours();
  const greeting = h < 5 ? "Hello" : h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
  return {
    today: localISO(d),
    greeting,
    dateLabel: d.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" }),
    now: ms,
  };
}

function useClock(): Clock | null {
  const minute = useSyncExternalStore(subscribeMinute, currentMinute, serverMinute);
  return useMemo(() => (minute < 0 ? null : clockAt(minute * 60_000)), [minute]);
}

// ---------------------------------------------------------------------------
// Dismissals (tip: per day in localStorage; guest note: per session)
// ---------------------------------------------------------------------------

type StoreKind = "local" | "session";
/** In-memory fallback so dismissing still works when storage is blocked. */
const dismissedInMemory = new Set<string>();
const dismissalListeners = new Set<() => void>();

function storageGet(kind: StoreKind, key: string): string | null {
  try {
    return (kind === "local" ? window.localStorage : window.sessionStorage).getItem(key);
  } catch {
    return null;
  }
}

function subscribeDismissals(onChange: () => void): () => void {
  dismissalListeners.add(onChange);
  const onStorage = (e: StorageEvent) => {
    if (!e.key || e.key.startsWith("y8m2:")) onChange();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    dismissalListeners.delete(onChange);
    window.removeEventListener("storage", onStorage);
  };
}

function isDismissed(kind: StoreKind, key: string): boolean {
  return dismissedInMemory.has(`${kind}:${key}`) || storageGet(kind, key) === "1";
}

function dismiss(kind: StoreKind, key: string): void {
  dismissedInMemory.add(`${kind}:${key}`);
  try {
    const store = kind === "local" ? window.localStorage : window.sessionStorage;
    if (kind === "local" && key.startsWith(TIP_PREFIX)) {
      // Drop dismissals from earlier days so keys don't pile up.
      const stale: string[] = [];
      for (let i = 0; i < store.length; i++) {
        const k = store.key(i);
        if (k && k.startsWith(TIP_PREFIX) && k !== key) stale.push(k);
      }
      for (const k of stale) store.removeItem(k);
    }
    store.setItem(key, "1");
  } catch {
    /* storage unavailable (private mode / blocked) — the in-memory flag covers this visit */
  }
  for (const l of dismissalListeners) l();
}

function useDismissed(kind: StoreKind, key: string): boolean {
  // Server snapshot: hidden, so nothing dismissible flashes before we can check.
  return useSyncExternalStore(
    subscribeDismissals,
    () => isDismissed(kind, key),
    () => true,
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function plural(n: number, one: string, many = `${one}s`): string {
  return `${n} ${n === 1 ? one : many}`;
}

function ones(s: string): number {
  let n = 0;
  for (const c of s) if (c === "1") n++;
  return n;
}

function isInternalHref(href: string): boolean {
  return href.startsWith("/") && !href.startsWith("//") && !href.includes("\\") && href !== "/";
}

/** "just now", "25 min ago", "2 hours ago", "earlier today", "yesterday", "3 days ago". */
function timeAgo(at: number, now: number, today: string): string {
  if (!at || at > now + 60_000) return "";
  const mins = Math.floor((now - at) / 60_000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} min ago`;
  const hours = Math.floor(mins / 60);
  const days = dayDiff(localISO(new Date(at)), today);
  if (days <= 0) return hours < 6 ? `${plural(hours, "hour")} ago` : "earlier today";
  if (days === 1) return "yesterday";
  return `${days} days ago`;
}

// ---------------------------------------------------------------------------
// Professor Pi: one suggestion, chosen by priority
// ---------------------------------------------------------------------------

interface Tip {
  id: string;
  title: string;
  body: string;
  href: string;
  cta: string;
}

function chooseTip(data: ProgressDoc, summaries: TopicSummary[], focusIds: string[], reviewTotal: number, dailyDone: boolean): Tip {
  const byId = new Map(summaries.map((s) => [s.id, s]));
  const ready = summaries.filter((s) => s.ready);

  // 1. Brand-new learner → the first lesson (a focus topic if one is set).
  const isNew =
    data.analytics.answered === 0 &&
    Object.keys(data.guidesRead).length === 0 &&
    Object.keys(data.skills).length === 0 &&
    Object.keys(data.solved).length === 0;
  if (isNew) {
    const first = focusIds.map((id) => byId.get(id)).find((s): s is TopicSummary => !!s?.ready) ?? ready[0];
    if (first) {
      return {
        id: "start",
        title: `Start with ${first.title}`,
        body: "Lessons start with a puzzle to try before anything is explained. Have a go first — even a wrong guess helps the idea stick when it arrives.",
        href: `/topic/${first.id}?tab=learn`,
        cta: "Open the first lesson",
      };
    }
  }

  // 2. Spaced review due.
  if (reviewTotal > 0) {
    return {
      id: "review",
      title: `${plural(reviewTotal, "thing")} to review today`,
      body: "Coming back to an idea just as you're about to forget it is the quickest way to make it permanent. It only takes a few minutes.",
      href: "/review",
      cta: "Start review",
    };
  }

  // 3. Daily 5 not done.
  if (!dailyDone) {
    return {
      id: "daily",
      title: "Warm up with your Daily 5",
      body: "Five questions from different topics. Mixing topics feels harder than doing one at a time — that's exactly why it works.",
      href: "/daily",
      cta: "Start Daily 5",
    };
  }

  // 4. A topic where accuracy is low.
  let weak: { s: TopicSummary; acc: number } | null = null;
  for (const [id, st] of Object.entries(data.analytics.topics)) {
    const s = byId.get(id);
    if (!s?.ready || st.answered < 8) continue;
    const acc = st.correct / st.answered;
    if (acc < 0.6 && (!weak || acc < weak.acc)) weak = { s, acc };
  }
  if (weak) {
    return {
      id: `weak:${weak.s.id}`,
      title: `Strengthen ${weak.s.title}`,
      body: `You're getting about ${Math.round(weak.acc * 100)}% right here. Re-read the key points and worked examples, then try again using the hints one at a time — thinking it through beats guessing.`,
      href: `/topic/${weak.s.id}?tab=learn`,
      cta: "Back to the lesson",
    };
  }

  // 5. A skill that's close to Secure.
  let near: { id: string; title: string; right: number; of: number; needsHarder: boolean; lastAt: number } | null = null;
  for (const [id, sk] of Object.entries(data.skills)) {
    const drill = drillById(id);
    if (!drill || skillLevel(sk) !== 1) continue;
    const recent = sk.recent.slice(-10);
    const right = ones(recent);
    if (recent.length < 6 || right < 6) continue;
    if (!near || right > near.right || (right === near.right && sk.lastAt > near.lastAt)) {
      near = { id, title: drill.title, right, of: recent.length, needsHarder: sk.best < 2, lastAt: sk.lastAt };
    }
  }
  if (near) {
    return {
      id: `near:${near.id}`,
      title: `Nearly Secure: ${near.title}`,
      body: `You got ${near.right} of your last ${near.of} right. ${near.needsHarder ? "Get a few right at the harder level" : "A few more correct answers"} and this skill will be Secure.`,
      href: `/drill/${encodeURIComponent(near.id)}`,
      cta: "Practise this skill",
    };
  }

  // 6. Otherwise: a challenge problem (in a topic they've been working on, if possible).
  const withChallenge = ready
    .filter((s) => s.challengeIds.some((q) => !data.solved[q]))
    .sort((a, b) => (data.analytics.topics[b.id]?.answered ?? 0) - (data.analytics.topics[a.id]?.answered ?? 0));
  const pick = withChallenge[0];
  if (pick) {
    return {
      id: `challenge:${pick.id}`,
      title: `Take on a ${pick.title} challenge`,
      body: "Challenge problems are meant to make you think. Try a few approaches before reaching for a hint — being stuck for a while is where the real learning happens.",
      href: `/topic/${pick.id}?tab=challenge`,
      cta: "See challenge problems",
    };
  }

  return {
    id: "sprint",
    title: "Try a fluency sprint",
    body: "Quick, accurate number skills free up your brain for the interesting part of every problem.",
    href: "/sprint",
    cta: "Start a sprint",
  };
}

// ---------------------------------------------------------------------------
// The dashboard
// ---------------------------------------------------------------------------

export function HomeDashboard({ summaries }: { summaries: TopicSummary[] }) {
  const { data, activeProfile, mode, cloudAvailable, focusTopics, leaveGuest } = useStore();
  const clock = useClock();
  const today = clock?.today ?? todayISO();

  const byId = useMemo(() => new Map(summaries.map((s) => [s.id, s])), [summaries]);

  // ---- dismissible bits ----
  const tipKey = `${TIP_PREFIX}${today}`;
  const tipHidden = useDismissed("local", tipKey);
  const guestNoteHidden = useDismissed("session", GUEST_NOTE_KEY);

  // ---- today ----
  const daily = data.daily[today];
  const dailyDone = !!daily?.done;
  const goal = Math.max(1, data.goalMinutes);
  const minutes = Math.floor((data.analytics.days[today]?.timeMs ?? 0) / 60_000);
  const goalReached = minutes >= goal;

  const week = useMemo(() => {
    const [y, m, d] = weekStartISO(today).split("-").map(Number);
    const monday = new Date(y, m - 1, d);
    return DAY_LONG.map((name, i) => {
      const iso = addDaysISO(i, monday);
      const s = data.analytics.days[iso];
      return {
        iso,
        short: DAY_SHORT[i],
        name,
        active: !!s && (s.answered > 0 || s.timeMs >= ACTIVE_MS),
        isToday: iso === today,
        future: iso > today,
      };
    });
  }, [today, data.analytics.days]);
  const activeDays = week.filter((d) => d.active).length;
  const weeklyTarget = Math.max(1, Math.min(7, data.weeklyDays || 1));
  const todayActive = week.some((d) => d.isToday && d.active);
  // Days still available this week (today counts if it isn't already active).
  const daysLeft = week.filter((d) => d.future || (d.isToday && !d.active)).length;
  const daysNeeded = weeklyTarget - activeDays;

  let weekNote: string;
  if (daysNeeded <= 0) weekNote = "Weekly goal reached — brilliant consistency.";
  else if (daysNeeded > daysLeft)
    weekNote = todayActive
      ? "Today counts — every day of practice adds up. A fresh week starts on Monday."
      : "A day counts once you answer a question or practise for 2 minutes. A fresh week starts on Monday.";
  else if (todayActive) weekNote = `Today counts. ${plural(daysNeeded, "more day")} to reach your goal.`;
  else weekNote = "A day counts once you answer a question or practise for 2 minutes.";

  const streak = data.streak;
  const streakLive = streak.count >= 2 && (streak.last === today || dayDiff(streak.last || today, today) === 1);

  // ---- continue ----
  const last = data.last && isInternalHref(data.last.href) ? data.last : null;
  const lastTopic = last?.topicId ? byId.get(last.topicId) : undefined;
  const lastWhen = last && clock ? timeAgo(last.at, clock.now, today) : "";

  // ---- review ----
  const review = useMemo(() => {
    let questions = 0;
    for (const [id, s] of Object.entries(data.srs)) if (s.due <= today && topicOfQid(id, TOPIC_IDS)) questions++;
    let skills = 0;
    let rusty = 0;
    for (const [id, s] of Object.entries(data.skills)) {
      if (!drillById(id)) continue;
      const r = isRusty(s, today);
      if (r) rusty++;
      if (r || skillDue(s, today)) skills++;
    }
    return { questions, skills, rusty, total: questions + skills };
  }, [data.srs, data.skills, today]);

  // ---- Professor Pi ----
  const tip = useMemo(() => chooseTip(data, summaries, focusTopics, review.total, dailyDone), [data, summaries, focusTopics, review.total, dailyDone]);

  // ---- rank ----
  const { rank, next, progress } = rankFor(data.stars);

  // ---- focus topics ----
  const focusList = focusTopics.map((id) => byId.get(id)).filter((s): s is TopicSummary => !!s?.ready);

  const name = activeProfile?.name ?? "there";
  const avatar = activeProfile?.avatar ?? "🙂";
  const showGuestNote = mode === "guest" && cloudAvailable && !guestNoteHidden;

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ------------------------------------------------ greeting */}
      <header className="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span aria-hidden className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-line bg-surface text-3xl shadow-sm">
          {avatar}
        </span>
        <h1 className="min-w-[9rem] flex-1">
          <span className="block min-h-5 text-sm font-semibold text-ink-2">{clock ? `${clock.greeting},` : " "}</span>
          <span className="block truncate text-2xl font-black tracking-tight sm:text-3xl">{name}</span>
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Link href="/progress" className="chip min-h-10 px-3 text-sm hover:bg-brand-soft hover:text-brand">
            <span aria-hidden>{rank.emoji}</span>
            <span>
              <span className="sr-only">Rank: </span>
              {rank.name}
            </span>
          </Link>
          {streakLive ? (
            <span className="chip min-h-10 border-0 bg-accent-soft px-3 text-sm text-warn">
              <span aria-hidden>🔥</span> {streak.count}-day streak
            </span>
          ) : null}
        </div>
      </header>

      {/* ------------------------------------------------ guest note */}
      {showGuestNote ? (
        <div role="note" className="flex flex-wrap items-center gap-x-3 gap-y-2 rounded-xl border border-line bg-info-soft px-4 py-2.5 text-sm text-ink">
          <span aria-hidden className="text-lg">
            ☁️
          </span>
          <p className="min-w-0 flex-1 basis-56">You&apos;re practising as a guest — progress stays on this device. Create a family account to sync and unlock the parent dashboard.</p>
          <div className="flex items-center gap-1">
            <button type="button" className="btn btn-primary text-sm" onClick={leaveGuest}>
              Create account
            </button>
            <button type="button" className="btn btn-ghost h-10 w-10 p-0" onClick={() => dismiss("session", GUEST_NOTE_KEY)} aria-label="Dismiss guest note">
              <span aria-hidden>✕</span>
            </button>
          </div>
        </div>
      ) : null}

      {/* ------------------------------------------------ today */}
      <section aria-labelledby="today-h" className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <h2 id="today-h" className="section-title">
            Today
          </h2>
          {clock ? <p className="text-sm text-ink-2">{clock.dateLabel}</p> : null}
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {/* Daily 5 */}
          <div className={`flex flex-col rounded-xl p-4 sm:col-span-2 lg:col-span-1 ${dailyDone ? "bg-good-soft" : "bg-brand-soft"}`}>
            <h3 className="flex items-center gap-2 font-extrabold">
              <span aria-hidden>🎯</span> Daily 5
            </h3>
            {dailyDone ? (
              <>
                <p className="mt-2 text-2xl font-black text-good">
                  ✓ Done — {daily?.correct ?? 0}/{daily?.total || 5}
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  {daily && daily.total > 0 && daily.correct === daily.total ? "A perfect set. " : "Nice work. "}A fresh set is ready tomorrow.
                </p>
              </>
            ) : (
              <>
                <p className="mt-1 text-sm text-ink-2">5 mixed questions from across your topics — about 10 minutes.</p>
                <div className="mt-auto pt-3">
                  <Link href="/daily" className="btn btn-primary w-full py-3 text-base">
                    Start your Daily 5
                  </Link>
                </div>
              </>
            )}
          </div>

          {/* Minutes today */}
          <div className="flex flex-col rounded-xl border border-line p-4">
            <h3 className="flex items-center gap-2 font-extrabold">
              <span aria-hidden>⏱️</span> Minutes today
            </h3>
            <p className="mt-2">
              <span className="text-2xl font-black tabular-nums">{minutes}</span>
              <span className="text-ink-2"> / {goal} min</span>
            </p>
            <ProgressBar
              className="mt-2"
              value={minutes / goal}
              label="Minutes practised today"
              valueText={`${minutes} of ${goal} minutes`}
              barClass={goalReached ? "bg-good" : "bg-brand"}
            />
            <p className="mt-2 text-xs text-ink-2">
              {goalReached
                ? "Daily goal reached — great focus."
                : minutes === 0
                  ? `Your goal is ${goal} minutes of focused practice.`
                  : `${plural(goal - minutes, "more minute")} to reach today's goal.`}
            </p>
          </div>

          {/* Weekly goal */}
          <div className="flex flex-col rounded-xl border border-line p-4">
            <h3 className="flex items-center gap-2 font-extrabold">
              <span aria-hidden>📅</span> This week
            </h3>
            <p className="mt-2">
              <span className="text-2xl font-black tabular-nums">{activeDays}</span>
              <span className="text-ink-2"> of {plural(weeklyTarget, "day")} this week</span>
            </p>
            <ol className="mt-2 flex justify-between gap-0.5" aria-label="Days practised this week">
              {week.map((d) => (
                <li key={d.iso} className="flex flex-col items-center gap-1">
                  <span
                    aria-hidden
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-black ${
                      d.active ? "bg-good text-surface" : d.future ? "border border-dashed border-line" : "bg-surface-2"
                    } ${d.isToday ? "ring-2 ring-brand ring-offset-2 ring-offset-surface" : ""}`}
                  >
                    {d.active ? "✓" : ""}
                  </span>
                  <span aria-hidden className={`text-[0.7rem] font-bold ${d.isToday ? "text-brand" : "text-ink-2"}`}>
                    {d.short}
                  </span>
                  <span className="sr-only">
                    {d.name}
                    {d.isToday ? " (today)" : ""}: {d.active ? "practised" : d.future ? "still to come" : "not practised"}
                  </span>
                </li>
              ))}
            </ol>
            <p className="mt-2 text-xs text-ink-2">{weekNote}</p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------ next steps */}
      <div className="grid gap-4 md:grid-cols-2">
        {last ? (
          <section aria-labelledby="continue-h" className="card flex flex-col p-4 sm:p-5">
            <h2 id="continue-h" className="text-xs font-bold uppercase tracking-wide text-ink-2">
              Continue where you left off
            </h2>
            <div className="mt-3 flex items-center gap-3">
              <span aria-hidden className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl ${lastTopic ? strandStyle(lastTopic.strand).soft : "bg-surface-2"}`}>
                {lastTopic?.icon ?? "📖"}
              </span>
              <div className="min-w-0">
                <p className="truncate font-extrabold">{last.label}</p>
                {lastTopic || lastWhen ? (
                  <p className="truncate text-xs text-ink-2">{[lastTopic && lastTopic.title !== last.label ? lastTopic.title : "", lastWhen].filter(Boolean).join(" · ")}</p>
                ) : null}
              </div>
            </div>
            <div className="mt-auto pt-4">
              <Link href={last.href} className="btn btn-secondary w-full sm:w-auto">
                Continue <span aria-hidden>→</span>
              </Link>
            </div>
          </section>
        ) : null}

        {review.total > 0 ? (
          <section aria-labelledby="review-h" className="card flex flex-col p-4 sm:p-5">
            <h2 id="review-h" className="text-xs font-bold uppercase tracking-wide text-ink-2">
              Review due
            </h2>
            <p className="mt-2 flex items-baseline gap-2">
              <span className="text-3xl font-black tabular-nums">{review.total}</span>
              <span className="text-sm text-ink-2">{review.total === 1 ? "item" : "items"} ready</span>
            </p>
            <ul className="mt-1 space-y-0.5 text-sm text-ink-2">
              {review.questions > 0 ? (
                <li>
                  <span aria-hidden>🔁 </span>
                  {plural(review.questions, "question")} to try again
                </li>
              ) : null}
              {review.skills > 0 ? (
                <li>
                  <span aria-hidden>🧩 </span>
                  {plural(review.skills, "skill")} to refresh{review.rusty > 0 ? ` (${review.rusty} getting rusty)` : ""}
                </li>
              ) : null}
            </ul>
            <div className="mt-auto pt-4">
              <Link href="/review" className="btn btn-primary w-full sm:w-auto">
                Start review
              </Link>
            </div>
          </section>
        ) : null}

        {!tipHidden ? (
          <section aria-labelledby="tip-h" className="card flex flex-col border-brand/30 p-4 sm:p-5">
            <div className="flex items-start gap-3">
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-brand to-brand-2 text-xl font-black text-brand-ink">
                π
              </span>
              <div className="min-w-0 flex-1">
                <h2 id="tip-h" className="text-xs font-bold uppercase tracking-wide text-brand">
                  Professor Pi suggests
                </h2>
                <p className="mt-1 font-extrabold">{tip.title}</p>
                <p className="mt-1 text-sm text-ink-2">{tip.body}</p>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-2 pt-4">
              <Link href={tip.href} className="btn btn-primary">
                {tip.cta}
              </Link>
              <button type="button" className="btn btn-ghost" onClick={() => dismiss("local", tipKey)}>
                Not today<span className="sr-only"> — hide this suggestion until tomorrow</span>
              </button>
            </div>
          </section>
        ) : null}

        <section aria-labelledby="rank-h" className="card flex flex-col p-4 sm:p-5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="text-4xl">
              {rank.emoji}
            </span>
            <div className="min-w-0 flex-1">
              <h2 id="rank-h" className="text-xs font-bold uppercase tracking-wide text-ink-2">
                Your rank
              </h2>
              <p className="truncate text-xl font-black">{rank.name}</p>
            </div>
            <p className="shrink-0 text-right">
              <span className="block text-2xl font-black tabular-nums">
                <span aria-hidden>⭐ </span>
                {data.stars}
              </span>
              <span className="text-xs text-ink-2">stars</span>
            </p>
          </div>
          {next ? (
            <>
              <ProgressBar className="mt-4" value={progress} label={`Progress to ${next.name}`} valueText={`${data.stars} of ${next.min} stars`} barClass="bg-accent" />
              <p className="mt-2 text-sm text-ink-2">
                {next.min - data.stars} more <span aria-hidden>⭐</span>
                <span className="sr-only">stars</span> to <span aria-hidden>{next.emoji} </span>
                <strong className="text-ink">{next.name}</strong>
              </p>
            </>
          ) : (
            <p className="mt-3 text-sm text-ink-2">You&apos;ve reached the top rank. Legendary.</p>
          )}
          <p className="mt-1 text-xs text-ink-2">Stars come from correct answers — first-try solves without hints earn a bonus.</p>
          <Link href="/progress" className="mt-auto inline-flex min-h-10 items-center self-start pt-2 text-sm font-bold text-brand hover:underline">
            See your progress <span aria-hidden>&nbsp;→</span>
          </Link>
        </section>
      </div>

      {/* ------------------------------------------------ focus topics */}
      {focusList.length > 0 ? (
        <section aria-labelledby="focus-h">
          <h2 id="focus-h" className="section-title">
            <span aria-hidden>📌 </span>Focus topics
          </h2>
          <p className="mt-0.5 text-sm text-ink-2">What you&apos;re working on right now — your Daily 5 leans towards these.</p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {focusList.map((s) => (
              <li key={s.id}>
                <Link href={`/topic/${s.id}`} className="inline-flex min-h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm font-bold shadow-sm hover:bg-surface-2">
                  <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${strandStyle(s.strand).bg}`} />
                  <span aria-hidden>{s.icon}</span>
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* ------------------------------------------------ quick links */}
      <section aria-labelledby="more-h">
        <h2 id="more-h" className="section-title">
          More ways to practise
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {QUICK_LINKS.map((q) => (
            <li key={q.href}>
              <Link
                href={q.href}
                className="card flex h-full flex-col gap-1 p-3 transition duration-150 hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0 sm:p-4"
              >
                <span aria-hidden className="text-2xl">
                  {q.icon}
                </span>
                <span className="font-extrabold leading-snug">{q.label}</span>
                <span className="text-xs text-ink-2">{q.blurb}</span>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------ topics by strand */}
      <section aria-labelledby="topics-h" className="space-y-6">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h2 id="topics-h" className="text-xl font-black tracking-tight">
            Your topics
          </h2>
          <Link href="/topics" className="inline-flex min-h-10 items-center text-sm font-bold text-brand hover:underline">
            Search all topics <span aria-hidden>&nbsp;→</span>
          </Link>
        </div>
        {STRANDS.map((strand) => {
          const list = summaries.filter((s) => s.strand === strand);
          if (!list.length) return null;
          const st = strandStyle(strand);
          const hid = `strand-${st.slug}`;
          return (
            <section key={strand} aria-labelledby={hid}>
              <h3 id={hid} className="flex items-center gap-2 text-xl font-extrabold">
                <span aria-hidden className={`h-6 w-1.5 rounded-full ${st.bg}`} />
                <span className={st.text}>{strand}</span>
                <span className="text-sm font-semibold text-ink-2">· {plural(list.length, "topic")}</span>
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((s) => (
                  <TopicCard key={s.id} summary={s} headingLevel={4} showStrand={false} />
                ))}
              </div>
            </section>
          );
        })}
      </section>
    </div>
  );
}
