"use client";
// PIN-protected parent dashboard: per-learner habits, accuracy (practice vs the
// mixed Daily 5), skills, topics, where to help, recent activity and settings.
// The PIN lives only in this component's state and is forgotten on Lock or when
// the page is left.
import Link from "next/link";
import { useEffect, useId, useMemo, useState, type FormEvent, type KeyboardEvent, type ReactNode } from "react";
import type { TopicSummary } from "@/lib/server/content";
import type { Account, ActivityEntry, Profile, ProgressDoc } from "@/lib/profileTypes";
import { activeDaysThisWeek, normalizeProgress } from "@/lib/profileTypes";
import { useStore } from "@/lib/store";
import { isRusty, rankFor, skillLevel } from "@/lib/learning";
import { topicMastery } from "@/lib/mastery";
import { ALL_DRILLS, drillsForTopic } from "@/lib/drills";
import { lastNDays, todayISO, weekStartISO } from "@/lib/dates";
import { SPRINT_MODE_INFO, isSprintMode } from "@/lib/sprint";
import { RichInline } from "./Rich";
import { MiniBars, type MiniBar } from "./MiniBars";

const GOAL_OPTIONS = [10, 15, 20, 30, 45];
const MAX_FOCUS = 4;
const OFFLINE = "Couldn't reach the server. Check your internet connection and try again.";

interface Learner {
  profile: Profile;
  progress: ProgressDoc;
  /** False when the learner has never synced any progress. */
  hasProgress: boolean;
}

interface Loaded {
  accountName: string;
  learners: Learner[];
  /** When the data was fetched (ms) — the reference point for relative times. */
  at: number;
}

// ------------------------------------------------------------------ helpers

async function postParent(body: Record<string, unknown>): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  try {
    const r = await fetch("/api/parent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      cache: "no-store",
    });
    const data = (await r.json().catch(() => ({}))) as unknown;
    return { ok: r.ok, status: r.status, data: data && typeof data === "object" ? (data as Record<string, unknown>) : {} };
  } catch {
    return { ok: false, status: 0, data: { error: OFFLINE } };
  }
}

const errorOf = (d: Record<string, unknown>) => (typeof d.error === "string" && d.error ? d.error : "Something went wrong. Please try again.");

function isProfile(v: unknown): v is Profile {
  if (!v || typeof v !== "object") return false;
  const p = v as Record<string, unknown>;
  return typeof p.id === "string" && typeof p.name === "string";
}

function parseLearners(raw: unknown): Learner[] {
  if (!Array.isArray(raw)) return [];
  const out: Learner[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const { profile, progress } = item as { profile?: unknown; progress?: unknown };
    if (!isProfile(profile)) continue;
    const hasProgress = progress !== null && progress !== undefined;
    out.push({ profile: { ...profile, avatar: typeof profile.avatar === "string" ? profile.avatar : "🙂" }, progress: normalizeProgress(hasProgress ? progress : null), hasProgress });
  }
  return out;
}

function fmtDuration(ms: number): string {
  const m = Math.round(ms / 60000);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

function pctText(n: number, d: number): string {
  return d > 0 ? `${Math.round((100 * n) / d)}%` : "—";
}

function relTime(ts: number, now: number): string {
  if (!ts) return "never";
  const s = Math.max(0, Math.round((now - ts) / 1000));
  if (s < 60) return "just now";
  const m = Math.round(s / 60);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h === 1 ? "" : "s"} ago`;
  const then = new Date(ts);
  const nowD = new Date(now);
  const days = Math.round(
    (Date.UTC(nowD.getFullYear(), nowD.getMonth(), nowD.getDate()) - Date.UTC(then.getFullYear(), then.getMonth(), then.getDate())) / 86400000,
  );
  if (days <= 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  return then.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: then.getFullYear() === nowD.getFullYear() ? undefined : "numeric" });
}

function isoOf(ts: number): string | undefined {
  const d = new Date(ts);
  return ts > 0 && Number.isFinite(d.getTime()) ? d.toISOString() : undefined;
}

function dateOf(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

const BEST_NAMES: Record<string, string> = {
  sprint: "Fluency sprint",
  challenge: "Challenge problems",
  exam: "Big Exam",
  daily: "Daily 5",
  review: "Review",
  drill: "Skill drill",
};

function describeEntry(e: ActivityEntry, titleOf: (id: string) => string | undefined, headingOf: (topicId: string, sectionId: string) => string | undefined): { icon: string; text: string } {
  const topic = e.topicId ? titleOf(e.topicId) : undefined;
  const inTopic = topic ? ` · ${topic}` : "";
  switch (e.type) {
    case "start":
      return { icon: "👋", text: "Opened the app" };
    case "guide": {
      const heading = e.topicId && e.detail ? headingOf(e.topicId, e.detail) : undefined;
      return { icon: "📖", text: `Read a lesson section${heading ? ` — ${heading}` : ""}${inTopic}` };
    }
    case "daily":
      return { icon: "🎯", text: `Did the Daily 5${e.detail ? ` (${e.detail})` : ""}` };
    case "best": {
      const [key = "", value = ""] = (e.detail ?? "").split("=");
      const [kind = "", rest = ""] = key.split(":");
      if (kind === "sprint" && isSprintMode(rest)) {
        return { icon: "🏅", text: `New personal best in the ${SPRINT_MODE_INFO[rest].label} sprint${value ? `: ${value} correct` : ""}` };
      }
      if (kind === "challenge" && rest) {
        return { icon: "🏅", text: `New best for challenge problems in ${titleOf(rest) ?? rest.replace(/-/g, " ")}${value ? `: ${value} solved` : ""}` };
      }
      const what = BEST_NAMES[kind] ?? (kind ? kind.charAt(0).toUpperCase() + kind.slice(1) : "");
      const sub = rest ? titleOf(rest) ?? rest.replace(/-/g, " ") : "";
      const label = [what, sub].filter(Boolean).join(" — ");
      return { icon: "🏅", text: `New personal best${label ? `: ${label}` : ""}${value ? ` (${value})` : ""}` };
    }
    case "flag":
      return { icon: "🚩", text: "Reported a question to be checked" };
    case "challenge":
      return { icon: "🧩", text: `Solved a challenge problem${inTopic}` };
    case "exam":
      return { icon: "📝", text: `Sat the Big Exam${e.detail ? ` (${e.detail})` : ""}` };
    case "paper":
      return { icon: "📄", text: `Finished a practice paper${e.detail ? ` (${e.detail})` : ""}${inTopic}` };
    case "level":
      return { icon: "🧠", text: `A skill levelled up${inTopic}` };
    default: {
      const t = e.type.replace(/[-_]/g, " ");
      return { icon: "•", text: `${t.charAt(0).toUpperCase()}${t.slice(1)}${e.detail ? ` (${e.detail})` : ""}${inTopic}` };
    }
  }
}

const SLIP_STARTERS = [
  "Ask them to explain why this one catches people out — teaching it back is powerful.",
  "Ask them to invent a question where someone would make this slip, then mark it like a teacher.",
  "Ask how they would check an answer to catch this next time — a quick check habit beats being careful.",
];

// ------------------------------------------------------------------ view

export function ParentView({ summaries }: { summaries: TopicSummary[] }) {
  const { mode, account, cloudAvailable, leaveGuest, refreshAccount } = useStore();
  const [pin, setPin] = useState("");
  const [unlockedPin, setUnlockedPin] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<Loaded | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState(0);
  const baseId = useId();

  if (mode === "guest" || !account) {
    return (
      <div className="mx-auto max-w-lg py-10 text-center">
        <div className="text-5xl" aria-hidden>
          👪
        </div>
        <h1 className="mt-2 text-2xl font-black">Parent dashboard</h1>
        {cloudAvailable ? (
          <>
            <p className="mt-3 text-ink-2">
              The parent dashboard needs a free family account. It keeps each learner&apos;s progress safe across devices and lets you see how they&apos;re getting on —
              protected by your own PIN.
            </p>
            <p className="mt-2 text-sm text-ink-2">Progress made as a guest on this device can be brought across when you add a learner.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-2">
              <button type="button" className="btn btn-primary" onClick={leaveGuest}>
                Create a family account
              </button>
              <Link href="/progress" className="btn btn-ghost">
                See progress on this device
              </Link>
            </div>
          </>
        ) : (
          <>
            <p className="mt-3 text-ink-2">
              Family accounts aren&apos;t switched on for this copy of the Maths Lab, so progress is saved on this device only. You can still see it all on the Progress page.
            </p>
            <div className="mt-6">
              <Link href="/progress" className="btn btn-primary">
                Open the Progress page
              </Link>
            </div>
          </>
        )}
      </div>
    );
  }

  /** Fetch every learner's data. Returns the HTTP status (0 = offline, 200 = ok). */
  async function load(withPin: string): Promise<number> {
    setBusy(true);
    setError(null);
    const r = await postParent({ pin: withPin });
    setBusy(false);
    if (!r.ok) {
      setError(errorOf(r.data));
      return r.status;
    }
    const acc = r.data.account as { name?: unknown } | undefined;
    const learners = parseLearners(r.data.learners);
    setLoaded({ accountName: typeof acc?.name === "string" ? acc.name : account?.name ?? "", learners, at: Date.now() });
    setSelected((s) => Math.min(s, Math.max(0, learners.length - 1)));
    return 200;
  }

  async function unlock(e: FormEvent) {
    e.preventDefault();
    if (pin.length < 4 || busy) return;
    const attempt = pin;
    if ((await load(attempt)) === 200) {
      setUnlockedPin(attempt);
      setPin("");
    }
  }

  function lock() {
    setLoaded(null);
    setUnlockedPin(null);
    setPin("");
    setSelected(0);
    setError(null);
  }

  async function refresh() {
    if (!unlockedPin) return;
    const status = await load(unlockedPin);
    // Offline or a server hiccup: keep what's on screen (the error explains). PIN or sign-in problems: lock.
    if (status === 401 || status === 403 || status === 429) {
      setLoaded(null);
      setUnlockedPin(null);
      setSelected(0);
    }
  }

  function onSaved(acc: Account) {
    setLoaded((cur) =>
      cur
        ? {
            ...cur,
            learners: cur.learners.map((l) => ({ ...l, profile: acc.profiles.find((p) => p.id === l.profile.id) ?? l.profile })),
          }
        : cur,
    );
    void refreshAccount();
  }

  if (!loaded || !unlockedPin) {
    return (
      <div className="mx-auto max-w-sm py-8">
        <form onSubmit={unlock} className="card space-y-4 p-6 text-center">
          <div className="text-4xl" aria-hidden>
            🔒
          </div>
          <h1 className="text-2xl font-black">Parent dashboard</h1>
          <p className="text-sm text-ink-2">
            Enter the parent PIN for the <span className="font-bold text-ink">{account.name}</span> family to see how each learner is getting on.
          </p>
          <div className="text-left">
            <label htmlFor={`${baseId}-pin`} className="text-sm font-bold text-ink-2">
              Parent PIN
            </label>
            <input
              id={`${baseId}-pin`}
              className="input mt-1 text-center text-2xl tracking-[0.4em]"
              type="password"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete="off"
              maxLength={8}
              autoFocus
              value={pin}
              placeholder="••••"
              onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
              aria-invalid={error ? true : undefined}
              aria-describedby={`${baseId}-pin-help${error ? ` ${baseId}-pin-err` : ""}`}
            />
            <p id={`${baseId}-pin-help`} className="mt-1 text-xs text-ink-2">
              4–8 digits, chosen when the family account was created.
            </p>
          </div>
          {error ? (
            <p id={`${baseId}-pin-err`} role="alert" className="rounded-xl bg-bad-soft px-3 py-2 text-sm text-ink">
              {error}
            </p>
          ) : null}
          <button type="submit" className="btn btn-primary w-full" disabled={busy || pin.length < 4}>
            {busy ? "Checking…" : "Unlock"}
          </button>
        </form>
        <p className="mt-4 text-center text-xs text-ink-2">The dashboard locks again when you leave this page. The PIN is never saved on this device.</p>
      </div>
    );
  }

  const learners = loaded.learners;
  const idx = Math.min(selected, Math.max(0, learners.length - 1));
  const current = learners[idx];

  function onTabKey(e: KeyboardEvent<HTMLButtonElement>, i: number) {
    const n = learners.length;
    let next = -1;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % n;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + n) % n;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = n - 1;
    if (next < 0) return;
    e.preventDefault();
    setSelected(next);
    document.getElementById(`${baseId}-tab-${next}`)?.focus();
  }

  return (
    <div className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h1 className="text-2xl font-black sm:text-3xl">Parent dashboard</h1>
          <p className="mt-0.5 text-sm text-ink-2">
            {loaded.accountName ? `${loaded.accountName} family · ` : ""}
            updated {new Date(loaded.at).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
          </p>
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-secondary btn-sm min-h-10" onClick={() => void refresh()} disabled={busy}>
            {busy ? "Refreshing…" : "↻ Refresh"}
          </button>
          <button type="button" className="btn btn-secondary btn-sm min-h-10" onClick={lock}>
            🔒 Lock
          </button>
        </div>
      </header>
      {error ? (
        <p role="alert" className="rounded-xl bg-bad-soft px-3 py-2 text-sm">
          {error}
        </p>
      ) : null}

      {learners.length === 0 ? (
        <div className="card p-6 text-center">
          <p className="font-bold">No learners yet</p>
          <p className="mt-1 text-sm text-ink-2">Add a learner from the &ldquo;Who&apos;s studying?&rdquo; screen, then come back here.</p>
        </div>
      ) : (
        <>
          {learners.length > 1 ? (
            <div role="tablist" aria-label="Learners" className="nav-scroll -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {learners.map((l, i) => {
                const on = i === idx;
                return (
                  <button
                    key={l.profile.id}
                    id={`${baseId}-tab-${i}`}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls={`${baseId}-panel`}
                    tabIndex={on ? 0 : -1}
                    onClick={() => setSelected(i)}
                    onKeyDown={(e) => onTabKey(e, i)}
                    className={`flex min-h-11 shrink-0 items-center gap-2 rounded-xl border px-3 font-extrabold transition-colors ${on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink hover:bg-surface-2"}`}
                  >
                    <span className="text-xl" aria-hidden>
                      {l.profile.avatar}
                    </span>
                    {l.profile.name}
                  </button>
                );
              })}
            </div>
          ) : null}
          <div
            id={`${baseId}-panel`}
            role={learners.length > 1 ? "tabpanel" : undefined}
            aria-labelledby={learners.length > 1 ? `${baseId}-tab-${idx}` : undefined}
          >
            {current ? <LearnerPanel key={current.profile.id} learner={current} summaries={summaries} now={loaded.at} pin={unlockedPin} onSaved={onSaved} /> : null}
          </div>
        </>
      )}
    </div>
  );
}

// ------------------------------------------------------------------ learner

function LearnerPanel({ learner, summaries, now, pin, onSaved }: { learner: Learner; summaries: TopicSummary[]; now: number; pin: string; onSaved: (acc: Account) => void }) {
  const { profile, progress: p, hasProgress } = learner;
  const a = p.analytics;
  const ready = useMemo(() => summaries.filter((s) => s.ready), [summaries]);
  const titles = useMemo(() => new Map(summaries.map((s) => [s.id, s.title])), [summaries]);
  const titleOf = (id: string) => titles.get(id);

  const stats = useMemo(() => {
    const today = todayISO();
    const week = weekStartISO();
    let weekMs = 0;
    for (const [d, s] of Object.entries(a.days)) if (d >= week && d <= today) weekMs += s.timeMs;
    let answered7 = 0;
    let correct7 = 0;
    for (const d of lastNDays(7)) {
      answered7 += a.days[d]?.answered ?? 0;
      correct7 += a.days[d]?.correct ?? 0;
    }
    const days14 = lastNDays(14);
    let dailyCorrect = 0;
    let dailyTotal = 0;
    let dailySets = 0;
    let practiceAnswered = 0;
    let practiceCorrect = 0;
    const bars: MiniBar[] = [];
    for (const d of days14) {
      const rec = p.daily[d];
      if (rec?.done && rec.total > 0) {
        dailyCorrect += rec.correct;
        dailyTotal += rec.total;
        dailySets++;
      }
      const s = a.days[d];
      practiceAnswered += s?.answered ?? 0;
      practiceCorrect += s?.correct ?? 0;
      const dt = dateOf(d);
      bars.push({
        label: dt.toLocaleDateString("en-GB", { weekday: "narrow" }),
        full: d === today ? "Today" : dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        value: Math.round((s?.timeMs ?? 0) / 60000),
        sub: `${s?.answered ?? 0} answered${rec?.done ? ` · Daily 5 ${rec.correct}/${rec.total}` : ""}`,
      });
    }
    return {
      weekMin: Math.round(weekMs / 60000),
      activeDays: activeDaysThisWeek(p, week),
      answered7,
      correct7,
      dailyCorrect,
      dailyTotal,
      dailySets,
      practiceAnswered,
      practiceCorrect,
      bars,
      fortnightMin: bars.reduce((t, b) => t + b.value, 0),
    };
  }, [a.days, p]);

  const skills = useMemo(() => {
    let mastered = 0;
    let secure = 0;
    let practising = 0;
    const rusty: { id: string; title: string; topic?: string; due: string }[] = [];
    for (const d of ALL_DRILLS) {
      const s = p.skills[d.id];
      const lvl = skillLevel(s);
      if (lvl === 3) mastered++;
      else if (lvl === 2) secure++;
      else if (lvl === 1) practising++;
      if (s && isRusty(s)) rusty.push({ id: d.id, title: d.title, topic: titles.get(d.topicId), due: s.due });
    }
    rusty.sort((x, y) => (x.due < y.due ? -1 : x.due > y.due ? 1 : 0));
    return { mastered, secure, practising, rustyCount: rusty.length, rusty: rusty.slice(0, 5), total: ALL_DRILLS.length };
  }, [p.skills, titles]);

  const topicRows = useMemo(() => {
    const lastAt = new Map<string, number>();
    const bump = (id: string | undefined, t: number) => {
      if (id && t > (lastAt.get(id) ?? 0)) lastAt.set(id, t);
    };
    for (const e of a.log) bump(e.topicId, e.at);
    for (const d of ALL_DRILLS) bump(d.topicId, p.skills[d.id]?.lastAt ?? 0);
    for (const s of Object.values(p.slips)) bump(s.topicId, s.last);
    if (p.last?.topicId) bump(p.last.topicId, p.last.at);
    const rows = ready
      .map((s) => {
        const m = topicMastery(
          s,
          p,
          drillsForTopic(s.id).map((d) => d.id),
        );
        const stat = a.topics[s.id];
        return { s, m, timeMs: stat?.timeMs ?? 0, answered: stat?.answered ?? 0, lastAt: lastAt.get(s.id) ?? 0 };
      })
      .filter((r) => r.m.started || r.timeMs > 0);
    rows.sort((x, y) => y.lastAt - x.lastAt || y.timeMs - x.timeMs);
    return rows;
  }, [ready, p, a.log, a.topics]);

  const help = useMemo(() => {
    const weak = Object.entries(a.topics)
      .filter(([, t]) => t.answered >= 5 && t.correct / t.answered < 0.7)
      .map(([id, t]) => ({ id, title: titles.get(id) ?? id.replace(/-/g, " "), answered: t.answered, acc: Math.round((100 * t.correct) / t.answered) }))
      .sort((x, y) => x.acc - y.acc)
      .slice(0, 3);
    const slips = Object.values(p.slips)
      .sort((x, y) => y.count - x.count || y.last - x.last)
      .slice(0, 4);
    return { weak, slips };
  }, [a.topics, p.slips, titles]);

  const activity = useMemo(() => {
    const headingOf = (topicId: string, sectionId: string) => summaries.find((s) => s.id === topicId)?.sections.find((x) => x.id === sectionId)?.heading;
    const items: { key: string; at: number; icon: string; text: string; times: number }[] = [];
    const recent = a.log.slice(-20).reverse();
    for (const e of recent) {
      const d = describeEntry(e, (id) => titles.get(id), headingOf);
      const prev = items[items.length - 1];
      if (prev && prev.text === d.text && e.type === "start") {
        prev.times++;
        continue;
      }
      items.push({ key: `${e.at}-${items.length}`, at: e.at, icon: d.icon, text: d.text, times: 1 });
    }
    return items;
  }, [a.log, summaries, titles]);

  const goal = p.goalMinutes;
  const { rank } = rankFor(p.stars);
  const dailyAcc = stats.dailyTotal ? Math.round((100 * stats.dailyCorrect) / stats.dailyTotal) : null;
  const practiceAcc = stats.practiceAnswered ? Math.round((100 * stats.practiceCorrect) / stats.practiceAnswered) : null;
  let insight = "";
  if (stats.dailySets === 0) insight = "No Daily 5 in the last two weeks — five mixed questions a day is one of the best habits for making learning stick.";
  else if (dailyAcc !== null && practiceAcc !== null) {
    if (stats.dailyTotal < 10 || stats.practiceAnswered < 10) insight = "Early days — after a few more Daily 5s and practice sessions this will show whether learning is sticking.";
    else if (practiceAcc - dailyAcc >= 15) insight = "Scores are higher straight after practice than in mixed sets. That's normal — things feel easier just after a lesson — and regular Daily 5s close the gap.";
    else if (dailyAcc < 50 && practiceAcc < 50) insight = "Both scores are low at the moment. Working through the lessons (each starts with a puzzle and worked examples) before practising will help.";
    else if (dailyAcc >= practiceAcc - 5) insight = "Mixed-topic scores are holding up well, so what's being learnt is sticking.";
  }

  return (
    <div className="space-y-5">
      <section className="card flex items-center gap-4 p-4 sm:p-5" aria-labelledby={`lp-${profile.id}`}>
        <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-brand-soft text-4xl" aria-hidden>
          {profile.avatar}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`lp-${profile.id}`} className="truncate text-xl font-black">
            {profile.name}
          </h2>
          <p className="text-sm text-ink-2">
            {hasProgress ? (
              <>
                Last active {relTime(a.lastActiveAt, now)} · {a.sessionCount} session{a.sessionCount === 1 ? "" : "s"} · {fmtDuration(a.totalTimeMs)} in total
              </>
            ) : (
              "Not started yet"
            )}
          </p>
        </div>
      </section>

      {!hasProgress ? (
        <p className="card p-4 text-sm text-ink-2">
          {profile.name} hasn&apos;t used the Maths Lab yet. Once they do, their practice, skills and topics will show up here. You can already set focus topics and a daily goal
          below.
        </p>
      ) : (
        <>
          <section aria-labelledby={`wk-${profile.id}`}>
            <h3 id={`wk-${profile.id}`} className="section-title">
              This week
            </h3>
            <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
              <Tile label="Minutes this week" value={`${stats.weekMin}`} sub={`since Monday · their goal is ${goal} min a day`} />
              <Tile
                label="Days active"
                value={`${stats.activeDays} day${stats.activeDays === 1 ? "" : "s"}`}
                sub={`aiming for ${p.weeklyDays} a week${stats.activeDays >= p.weeklyDays ? " · goal met ✓" : ""}`}
              />
              <Tile label="Questions answered" value={`${stats.answered7}`} sub={`last 7 days · ${a.answered.toLocaleString("en-GB")} in total`} />
              <Tile label="Accuracy" value={pctText(stats.correct7, stats.answered7)} sub={stats.answered7 ? "last 7 days" : "nothing answered in the last 7 days"} />
              <Tile label="Hint use" value={pctText(a.hinted, a.answered)} sub="of answers used a hint — hints are part of learning" />
              <Tile label="Stars" value={`⭐ ${p.stars.toLocaleString("en-GB")}`} sub={`${rank.emoji} ${rank.name}`} />
            </ul>
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby={`cmp-${profile.id}`}>
            <h3 id={`cmp-${profile.id}`} className="section-title">
              Daily 5 vs practice
            </h3>
            <p className="mt-0.5 text-xs text-ink-2">Accuracy over the last 14 days</p>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <CompareRow label="Daily 5 (mixed topics)" value={dailyAcc} detail={`${stats.dailySets} set${stats.dailySets === 1 ? "" : "s"} done`} />
              <CompareRow label="All practice" value={practiceAcc} detail={`${stats.practiceAnswered.toLocaleString("en-GB")} answered`} />
            </div>
            <p className="mt-3 text-sm text-ink-2">
              <span className="font-bold text-ink">Daily 5 mixes topics, so it&apos;s the honest measure of what has stuck.</span> {insight}
            </p>
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby={`chart-${profile.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 id={`chart-${profile.id}`} className="section-title">
                Last 14 days
              </h3>
              <p className="text-sm text-ink-2">{stats.fortnightMin} min in total</p>
            </div>
            <p className="mt-0.5 text-xs text-ink-2">Minutes per day, with {profile.name}&apos;s daily goal. Tap a bar for the day&apos;s detail.</p>
            <div className="mt-2">
              <MiniBars data={stats.bars} unit="min" valueLabel="Minutes" caption={`${profile.name}: minutes per day, last 14 days`} goal={goal} goalLabel="Goal" />
            </div>
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby={`sk-${profile.id}`}>
            <h3 id={`sk-${profile.id}`} className="section-title">
              Skills
            </h3>
            {skills.total === 0 ? (
              <p className="mt-1 text-sm text-ink-2">Skill drills will appear here as soon as they&apos;re available.</p>
            ) : (
              <>
                <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  <SkillCount label="Mastered" n={skills.mastered} total={skills.total} />
                  <SkillCount label="Secure" n={skills.secure} total={skills.total} />
                  <SkillCount label="Practising" n={skills.practising} total={skills.total} />
                  <SkillCount label="Due a refresh" n={skills.rustyCount} total={skills.total} />
                </ul>
                <p className="mt-3 text-xs leading-relaxed text-ink-2">
                  <span className="font-bold text-ink">Practising</span> → <span className="font-bold text-ink">Secure</span> (8 of the last 10 right, including harder
                  questions) → <span className="font-bold text-ink">Mastered</span> (also right in mixed practice on two days at least three days apart). A skill is due a
                  refresh when its spaced review date has passed — a little forgetting is normal and reviewing then makes it stronger.
                </p>
              </>
            )}
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby={`help-${profile.id}`}>
            <h3 id={`help-${profile.id}`} className="section-title">
              Where to help
            </h3>
            {help.weak.length === 0 && skills.rusty.length === 0 && help.slips.length === 0 ? (
              <p className="mt-1 text-sm text-ink-2">
                Nothing stands out right now. A topic appears here if accuracy drops below 70% (after at least 5 answers), along with skills due a refresh and slips
                that keep coming up.
              </p>
            ) : (
              <div className="mt-3 space-y-5">
                {help.weak.length ? (
                  <HelpGroup title="Topics that need more practice">
                    {help.weak.map((t) => (
                      <li key={t.id} className="rounded-xl bg-surface-2 p-3">
                        <p className="flex flex-wrap items-baseline justify-between gap-x-3">
                          <span className="font-bold">{t.title}</span>
                          <span className="text-sm text-ink-2">
                            {t.acc}% of {t.answered} answered
                          </span>
                        </p>
                        <Starter>Ask them to teach you the main idea of {t.title} with one example — teaching it back is powerful.</Starter>
                      </li>
                    ))}
                  </HelpGroup>
                ) : null}
                {skills.rusty.length ? (
                  <HelpGroup title="Skills due a refresh">
                    <li className="rounded-xl bg-surface-2 p-3">
                      <ul className="space-y-1 text-sm">
                        {skills.rusty.map((s) => (
                          <li key={s.id}>
                            <span className="font-bold">{s.title}</span>
                            {s.topic ? <span className="text-ink-2"> · {s.topic}</span> : null}
                          </li>
                        ))}
                      </ul>
                      {skills.rustyCount > skills.rusty.length ? <p className="mt-1 text-xs text-ink-2">and {skills.rustyCount - skills.rusty.length} more</p> : null}
                      <Starter>These were secure a while ago. A five-minute drill on the Skills page brings them straight back.</Starter>
                    </li>
                  </HelpGroup>
                ) : null}
                {help.slips.length ? (
                  <HelpGroup title="Slips that keep coming up">
                    {help.slips.map((s, i) => (
                      <li key={`${s.topicId}-${i}`} className="rounded-xl bg-surface-2 p-3">
                        <p className="text-sm">
                          <RichInline text={s.label} />
                        </p>
                        <p className="mt-1 text-xs text-ink-2">
                          {titleOf(s.topicId) ?? "Mixed practice"} · {s.count} time{s.count === 1 ? "" : "s"}
                        </p>
                        <Starter>{SLIP_STARTERS[i % SLIP_STARTERS.length]}</Starter>
                      </li>
                    ))}
                  </HelpGroup>
                ) : null}
              </div>
            )}
          </section>

          <ReportedQuestions flags={p.flags} titleOf={titleOf} />

          <section className="card p-4 sm:p-5" aria-labelledby={`tp-${profile.id}`}>
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 id={`tp-${profile.id}`} className="section-title">
                Topics
              </h3>
              <p className="text-sm text-ink-2">
                {topicRows.length} of {ready.length} started
              </p>
            </div>
            {topicRows.length === 0 ? (
              <p className="mt-1 text-sm text-ink-2">No topics started yet.</p>
            ) : (
              <div className="-mx-1 mt-2 overflow-x-auto px-1">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Topics {profile.name} has started, most recent first</caption>
                  <thead className="text-xs text-ink-2">
                    <tr>
                      <th scope="col" className="py-2 pr-3 font-bold">
                        Topic
                      </th>
                      <th scope="col" className="py-2 pr-3 font-bold">
                        Mastery
                      </th>
                      <th scope="col" className="py-2 pr-3 text-right font-bold">
                        Accuracy
                      </th>
                      <th scope="col" className="py-2 text-right font-bold">
                        Time
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topicRows.map(({ s, m, timeMs, lastAt }) => (
                      <tr key={s.id} className="border-t border-line align-top">
                        <th scope="row" className="py-2 pr-3 font-normal">
                          <span className="flex items-start gap-2">
                            <span aria-hidden>{s.icon}</span>
                            <span className="min-w-0">
                              <span className="block font-bold">{s.title}</span>
                              <span className="block text-xs text-ink-2">{lastAt ? relTime(lastAt, now) : "—"}</span>
                            </span>
                          </span>
                        </th>
                        <td className="py-2 pr-3">
                          <span className="block font-bold tabular-nums">{m.pct}%</span>
                          <span
                            className="mt-1 block h-1.5 w-12 overflow-hidden rounded-full bg-surface-2 sm:w-16"
                            role="progressbar"
                            aria-label={`${s.title} mastery`}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            aria-valuenow={m.pct}
                          >
                            <span className={`block h-full rounded-full ${m.pct >= 80 ? "bg-good" : "bg-brand"}`} style={{ width: `${m.pct}%` }} />
                          </span>
                        </td>
                        <td className="whitespace-nowrap py-2 pr-3 text-right tabular-nums">{m.accuracy === null ? "—" : `${Math.round(m.accuracy * 100)}%`}</td>
                        <td className="py-2 text-right tabular-nums">{timeMs > 0 ? fmtDuration(timeMs) : "—"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>

          <section className="card p-4 sm:p-5" aria-labelledby={`act-${profile.id}`}>
            <h3 id={`act-${profile.id}`} className="section-title">
              Recent activity
            </h3>
            {activity.length === 0 ? (
              <p className="mt-1 text-sm text-ink-2">Nothing yet.</p>
            ) : (
              <ol className="mt-2 divide-y divide-line">
                {activity.map((e) => (
                  <li key={e.key} className="flex items-start gap-3 py-2 text-sm">
                    <span className="w-5 shrink-0 text-center" aria-hidden>
                      {e.icon}
                    </span>
                    <span className="min-w-0 flex-1">
                      {e.text}
                      {e.times > 1 ? <span className="text-ink-2"> ×{e.times}</span> : null}
                    </span>
                    <time className="shrink-0 text-xs text-ink-2" dateTime={isoOf(e.at)}>
                      {relTime(e.at, now)}
                    </time>
                  </li>
                ))}
              </ol>
            )}
          </section>
        </>
      )}

      <LearnerSettings key={`${profile.id}:${now}`} learner={learner} ready={ready} pin={pin} onSaved={onSaved} />
    </div>
  );
}

// ------------------------------------------------------------------ pieces

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <li className="card min-w-0 p-3 sm:p-4">
      <p className="text-xs font-bold text-ink-2">{label}</p>
      <p className="mt-1 text-2xl font-black leading-tight">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-ink-2">{sub}</p> : null}
    </li>
  );
}

function SkillCount({ label, n, total }: { label: string; n: number; total: number }) {
  return (
    <li className="rounded-xl bg-surface-2 p-3">
      <p className="text-xs font-bold text-ink-2">{label}</p>
      <p className="mt-0.5 text-2xl font-black leading-tight">{n}</p>
      <p className="text-xs text-ink-2">of {total} skills</p>
    </li>
  );
}

function CompareRow({ label, value, detail }: { label: string; value: number | null; detail: string }) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-bold">{label}</span>
        <span className="text-xl font-black tabular-nums">{value === null ? "—" : `${value}%`}</span>
      </div>
      <div
        className="mt-1.5 h-2 overflow-hidden rounded-full bg-surface-2"
        role="progressbar"
        aria-label={`${label} accuracy`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={value ?? 0}
        aria-valuetext={value === null ? "No data yet" : `${value}%`}
      >
        <div className="h-full rounded-full bg-brand" style={{ width: `${value ?? 0}%` }} />
      </div>
      <p className="mt-1 text-xs text-ink-2">{value === null ? "No data yet" : detail}</p>
    </div>
  );
}

function HelpGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="text-xs font-extrabold uppercase tracking-wide text-ink-2">{title}</h4>
      <ul className="mt-2 space-y-2">{children}</ul>
    </div>
  );
}

function Starter({ children }: { children: ReactNode }) {
  return (
    <p className="mt-2 flex gap-2 text-sm text-ink-2">
      <span aria-hidden>💬</span>
      <span>{children}</span>
    </p>
  );
}

function LearnerSettings({ learner, ready, pin, onSaved }: { learner: Learner; ready: TopicSummary[]; pin: string; onSaved: (acc: Account) => void }) {
  const { profile, progress, hasProgress } = learner;
  const savedGoal = profile.settings?.goalMinutes;
  const [focus, setFocus] = useState<string[]>(() => (profile.settings?.focusTopics ?? []).filter((id) => ready.some((s) => s.id === id)).slice(0, MAX_FOCUS));
  const [goal, setGoal] = useState<number | null>(savedGoal ?? null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const baseId = useId();
  const full = focus.length >= MAX_FOCUS;
  const goalOptions = savedGoal && !GOAL_OPTIONS.includes(savedGoal) ? [...GOAL_OPTIONS, savedGoal].sort((x, y) => x - y) : GOAL_OPTIONS;

  function toggle(id: string) {
    setMsg(null);
    setFocus((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : cur.length >= MAX_FOCUS ? cur : [...cur, id]));
  }

  async function save(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const r = await postParent({ pin, action: "settings", profileId: profile.id, focusTopics: focus, ...(goal ? { goalMinutes: goal } : {}) });
    setBusy(false);
    if (!r.ok) {
      setMsg({ ok: false, text: errorOf(r.data) });
      return;
    }
    const acc = r.data.account as Account | undefined;
    if (acc && Array.isArray(acc.profiles)) onSaved(acc);
    setMsg({
      ok: true,
      text: focus.length
        ? `Saved. ${profile.name}'s Daily 5 will now lean towards ${focus.length === 1 ? "this topic" : "these topics"}.`
        : `Saved. ${profile.name}'s Daily 5 will mix all topics.`,
    });
  }

  return (
    <section className="card p-4 sm:p-5" aria-labelledby={`${baseId}-h`}>
      <h3 id={`${baseId}-h`} className="section-title">
        Settings for {profile.name}
      </h3>
      <form className="mt-3 space-y-5" onSubmit={save}>
        <fieldset>
          <legend className="text-sm font-bold">
            Focus topics <span className="font-normal text-ink-2">· up to {MAX_FOCUS}</span>
          </legend>
          <p className="mt-0.5 text-sm text-ink-2">Choose what school is covering now. {profile.name} can add their own on the Progress page; the Daily 5 uses both.</p>
          {ready.length === 0 ? (
            <p className="mt-2 text-sm text-ink-2">Topics will appear here as soon as they&apos;re ready.</p>
          ) : (
            <ul className="mt-2 flex flex-wrap gap-2">
              {ready.map((s) => {
                const on = focus.includes(s.id);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      aria-pressed={on}
                      disabled={!on && full}
                      onClick={() => toggle(s.id)}
                      className={`flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink hover:bg-surface-2"}`}
                    >
                      <span aria-hidden>{s.icon}</span>
                      {s.title}
                      {on ? <span aria-hidden>✓</span> : null}
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          <p className="mt-2 text-xs text-ink-2" aria-live="polite">
            {focus.length}/{MAX_FOCUS} chosen
          </p>
        </fieldset>

        <div>
          <label htmlFor={`${baseId}-goal`} className="text-sm font-bold">
            Suggested daily minutes
          </label>
          <select
            id={`${baseId}-goal`}
            className="input mt-1 max-w-xs"
            value={goal ?? ""}
            onChange={(e) => {
              setMsg(null);
              setGoal(e.target.value ? Number(e.target.value) : null);
            }}
          >
            {savedGoal ? null : <option value="">No suggestion — let {profile.name} choose</option>}
            {goalOptions.map((m) => (
              <option key={m} value={m}>
                {m} minutes a day
              </option>
            ))}
          </select>
          {hasProgress ? (
            <p className="mt-1 text-xs text-ink-2">
              {profile.name}&apos;s own goal: {progress.goalMinutes} min a day, {progress.weeklyDays} day{progress.weeklyDays === 1 ? "" : "s"} a week. They&apos;ll see your
              suggestion on their Progress page.
            </p>
          ) : null}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button type="submit" className="btn btn-primary" disabled={busy}>
            {busy ? "Saving…" : "Save settings"}
          </button>
        </div>
        <div aria-live="polite">
          {msg ? (
            <p className={`rounded-xl px-3 py-2 text-sm ${msg.ok ? "bg-good-soft" : "bg-bad-soft"}`}>
              {msg.text}
            </p>
          ) : null}
        </div>
      </form>
    </section>
  );
}


/** Questions the learner flagged with "Something wrong?" — so a parent can check them. */
function ReportedQuestions({ flags, titleOf }: { flags: Record<string, { at: number; note: string }>; titleOf: (id: string) => string | undefined }) {
  const ids = Object.keys(flags).sort((a, b) => flags[b].at - flags[a].at).slice(0, 20);
  const [texts, setTexts] = useState<Record<string, { topicId: string; question: string }>>({});
  const key = ids.join(",");
  useEffect(() => {
    if (!key) return;
    let live = true;
    fetch(`/api/questions?ids=${encodeURIComponent(key)}`)
      .then((r) => (r.ok ? r.json() : { questions: {} }))
      .then((j: { questions?: Record<string, { topicId: string; question: { question: string } }> }) => {
        if (!live) return;
        const out: Record<string, { topicId: string; question: string }> = {};
        for (const [id, q] of Object.entries(j.questions ?? {})) out[id] = { topicId: q.topicId, question: q.question.question };
        setTexts(out);
      })
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [key]);
  if (!ids.length) return null;
  return (
    <section className="card p-4 sm:p-5" aria-label="Reported questions">
      <h3 className="section-title">Questions they reported</h3>
      <p className="mt-1 text-sm text-ink-2">
        Your child tapped &ldquo;Something wrong?&rdquo; on these. Worth a look together — spotting a flaw is good maths too.
      </p>
      <ul className="mt-3 space-y-2">
        {ids.map((id) => (
          <li key={id} className="rounded-xl bg-surface-2 p-3 text-sm">
            {texts[id] ? <RichInline text={texts[id].question.length > 280 ? `${texts[id].question.slice(0, 280)}…` : texts[id].question} /> : <span className="text-ink-2">{id}</span>}
            <p className="mt-1 text-xs text-ink-2">
              {texts[id] ? `${titleOf(texts[id].topicId) ?? "Big Exam"} · ` : ""}
              {flags[id].note && flags[id].note !== "(no note)" ? `“${flags[id].note}”` : "No note"}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
