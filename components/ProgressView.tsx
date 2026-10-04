"use client";
// The learner's own progress page: rank, headline numbers, the last fortnight,
// goals, focus topics, per-topic mastery, theme and (PIN-protected) reset.
import Link from "next/link";
import { useMemo, useState, type FormEvent, type ReactNode } from "react";
import type { TopicSummary } from "@/lib/server/content";
import { useStore } from "@/lib/store";
import { RANKS, rankFor, skillLevel } from "@/lib/learning";
import { topicMastery, type TopicMastery } from "@/lib/mastery";
import { ALL_DRILLS, drillsForTopic } from "@/lib/drills";
import { lastNDays, todayISO, weekStartISO } from "@/lib/dates";
import { activeDaysThisWeek } from "@/lib/profileTypes";
import { STRANDS } from "@/lib/topics/meta";
import { MiniBars, type MiniBar } from "./MiniBars";

const GOAL_OPTIONS = [10, 15, 20, 30, 45];
const WEEK_OPTIONS = [2, 3, 4, 5, 6, 7];
const MAX_FOCUS = 4;
const THEME_KEY = "y8m2:theme";
type Theme = "system" | "light" | "dark";

const STRAND_DOT: Record<string, string> = {
  Number: "bg-s-number",
  "Ratio & Proportion": "bg-s-ratio",
  Algebra: "bg-s-algebra",
  "Geometry & Measure": "bg-s-geometry",
  "Statistics & Probability": "bg-s-stats",
};

function fmtDuration(ms: number): string {
  const m = Math.round(ms / 60000);
  if (m < 60) return `${m} min`;
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? `${h} h ${r} min` : `${h} h`;
}

function pct(n: number, d: number): string {
  return d > 0 ? `${Math.round((100 * n) / d)}%` : "—";
}

function dateOf(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

function readTheme(): Theme {
  if (typeof window === "undefined") return "system";
  try {
    const t = window.localStorage.getItem(THEME_KEY);
    return t === "light" || t === "dark" ? t : "system";
  } catch {
    return "system";
  }
}

function applyTheme(t: Theme) {
  const root = document.documentElement;
  if (t === "system") delete root.dataset.theme;
  else root.dataset.theme = t;
  try {
    if (t === "system") window.localStorage.removeItem(THEME_KEY);
    else window.localStorage.setItem(THEME_KEY, t);
  } catch {
    /* storage blocked: the choice still applies until the page is reloaded */
  }
}

// ---------------------------------------------------------------------------

export function ProgressView({ summaries }: { summaries: TopicSummary[] }) {
  const { data, activeProfile, mode } = useStore();
  const a = data.analytics;
  const ready = useMemo(() => summaries.filter((s) => s.ready), [summaries]);

  const masteries = useMemo(() => {
    const out = new Map<string, TopicMastery>();
    for (const s of summaries) {
      if (!s.ready) continue;
      out.set(
        s.id,
        topicMastery(
          s,
          data,
          drillsForTopic(s.id).map((d) => d.id),
        ),
      );
    }
    return out;
  }, [summaries, data]);

  const skillCounts = useMemo(() => {
    let mastered = 0;
    let secure = 0;
    for (const d of ALL_DRILLS) {
      const l = skillLevel(data.skills[d.id]);
      if (l === 3) mastered++;
      else if (l === 2) secure++;
    }
    return { mastered, secure, total: ALL_DRILLS.length };
  }, [data.skills]);

  const challenge = useMemo(() => {
    let solved = 0;
    let total = 0;
    for (const s of summaries) {
      total += s.challengeIds.length;
      for (const id of s.challengeIds) if (data.solved[id]) solved++;
    }
    return { solved, total };
  }, [summaries, data.solved]);

  const lessons = useMemo(() => {
    let read = 0;
    let total = 0;
    for (const m of masteries.values()) {
      read += m.sectionsRead;
      total += m.sectionsTotal;
    }
    return { read, total };
  }, [masteries]);

  const fortnight = useMemo(() => {
    const days = lastNDays(14);
    const today = days[days.length - 1];
    const bars: MiniBar[] = days.map((iso) => {
      const s = a.days[iso];
      const dt = dateOf(iso);
      const answered = s?.answered ?? 0;
      return {
        label: dt.toLocaleDateString("en-GB", { weekday: "narrow" }),
        full: iso === today ? "Today" : dt.toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" }),
        value: Math.round((s?.timeMs ?? 0) / 60000),
        sub: `${answered} answered`,
      };
    });
    const minutes = bars.reduce((t, b) => t + b.value, 0);
    const activeDays = days.filter((d) => (a.days[d]?.answered ?? 0) > 0 || (a.days[d]?.timeMs ?? 0) >= 120000).length;
    return { bars, minutes, activeDays };
  }, [a.days]);

  const name = activeProfile && mode === "cloud" ? activeProfile.name : null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black sm:text-3xl">{name ? `${name}'s progress` : "Your progress"}</h1>
        <p className="mt-1 text-ink-2">Everything you&apos;ve done in the Maths Lab, in one place.</p>
      </header>

      <RankCard stars={data.stars} />

      <section aria-labelledby="glance-h">
        <h2 id="glance-h" className="section-title">
          At a glance
        </h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <Tile icon="⏱️" label="Time learning" value={fmtDuration(a.totalTimeMs)} sub={`${a.sessionCount} session${a.sessionCount === 1 ? "" : "s"}`} />
          <Tile icon="✏️" label="Questions answered" value={a.answered.toLocaleString("en-GB")} sub={`${a.correct.toLocaleString("en-GB")} correct`} />
          <Tile icon="🎯" label="Accuracy" value={pct(a.correct, a.answered)} sub={a.answered ? "of all answers" : "Answer a question to start"} />
          <Tile icon="⭐" label="Stars" value={data.stars.toLocaleString("en-GB")} sub={rankFor(data.stars).rank.name} />
          <Tile icon="🔥" label="Best streak" value={`${data.streak.best} day${data.streak.best === 1 ? "" : "s"}`} sub={data.streak.count > 0 ? `Current: ${data.streak.count}` : "Start one today"} />
          <Tile
            icon="🧠"
            label="Skills mastered"
            value={`${skillCounts.mastered}`}
            sub={skillCounts.total ? `${skillCounts.secure} secure · ${skillCounts.total} skills` : "Skill drills coming soon"}
            href="/skills"
          />
          <Tile icon="🧩" label="Challenge problems" value={`${challenge.solved}`} sub={challenge.total ? `solved of ${challenge.total}` : "solved"} />
          <Tile icon="📖" label="Lesson sections" value={`${lessons.read}`} sub={lessons.total ? `understood of ${lessons.total}` : "understood"} />
        </ul>
      </section>

      <section aria-labelledby="fortnight-h" className="card p-4 sm:p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
          <h2 id="fortnight-h" className="section-title">
            Last 14 days
          </h2>
          <p className="text-sm text-ink-2">
            {fortnight.minutes} min · active on {fortnight.activeDays} day{fortnight.activeDays === 1 ? "" : "s"}
          </p>
        </div>
        <p className="mt-0.5 text-xs text-ink-2">Minutes per day. Tap a bar to see the day.</p>
        <div className="mt-2">
          <MiniBars data={fortnight.bars} unit="min" valueLabel="Minutes" caption="Minutes learning per day, last 14 days" goal={data.goalMinutes} goalLabel="Goal" />
        </div>
      </section>

      <TopicList summaries={summaries} masteries={masteries} />

      <div className="grid gap-6 md:grid-cols-2">
        <Goals />
        <FocusPicker ready={ready} />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <section aria-labelledby="cert-h" className="card flex flex-col p-4 sm:p-5">
          <h2 id="cert-h" className="section-title">
            🎓 Year 8 certificate
          </h2>
          <p className="mt-1 flex-1 text-sm text-ink-2">
            A printable certificate showing your mastery of every Year 8 topic. Each topic also gets its own certificate once you reach 80% mastery.
          </p>
          <div className="mt-3">
            <Link href="/certificate/year8" className="btn btn-secondary">
              View certificate
            </Link>
          </div>
        </section>
        <ThemePicker />
      </div>

      <DangerZone />
    </div>
  );
}

// ---------------------------------------------------------------------------

function Tile({ icon, label, value, sub, href }: { icon: string; label: string; value: string; sub?: string; href?: string }) {
  const body = (
    <>
      <p className="flex items-center gap-1.5 text-xs font-bold text-ink-2">
        <span aria-hidden>{icon}</span>
        {label}
      </p>
      <p className="mt-1 text-2xl font-black leading-tight text-ink">{value}</p>
      {sub ? <p className="mt-0.5 text-xs text-ink-2">{sub}</p> : null}
    </>
  );
  return (
    <li className="min-w-0">
      {href ? (
        <Link href={href} className="card block h-full p-3 transition-colors hover:bg-surface-2 sm:p-4">
          {body}
        </Link>
      ) : (
        <div className="card h-full p-3 sm:p-4">{body}</div>
      )}
    </li>
  );
}

function Meter({ value, label, tone = "brand" }: { value: number; label: string; tone?: "brand" | "good" }) {
  const v = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-2" role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={v}>
      <div className={`h-full rounded-full ${tone === "good" ? "bg-good" : "bg-brand"}`} style={{ width: `${v}%` }} />
    </div>
  );
}

function RankCard({ stars }: { stars: number }) {
  const { rank, next, progress } = rankFor(stars);
  const currentIdx = RANKS.indexOf(rank);
  return (
    <section aria-labelledby="rank-h" className="card p-4 sm:p-5">
      <div className="flex items-center gap-4">
        <div className="grid h-16 w-16 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-brand-soft to-surface-2 text-4xl" aria-hidden>
          {rank.emoji}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-xs font-bold uppercase tracking-wide text-ink-2">Your rank</p>
          <h2 id="rank-h" className="text-2xl font-black leading-tight">
            {rank.name}
          </h2>
          <p className="text-sm text-ink-2">
            <span aria-hidden>⭐</span> {stars.toLocaleString("en-GB")} star{stars === 1 ? "" : "s"}
          </p>
        </div>
      </div>
      <div className="mt-4">
        {next ? (
          <>
            <Meter value={progress * 100} label={`Progress to ${next.name}`} />
            <p className="mt-1.5 text-sm text-ink-2">
              <span className="font-bold text-ink">{next.min - stars}</span> more star{next.min - stars === 1 ? "" : "s"} to{" "}
              <span aria-hidden>{next.emoji}</span> <span className="font-bold text-ink">{next.name}</span>
            </p>
          </>
        ) : (
          <p className="text-sm font-bold text-good">You&apos;ve reached the top rank. Legendary work.</p>
        )}
      </div>
      <details className="group mt-4">
        <summary className="cursor-pointer list-none text-sm font-bold text-brand [&::-webkit-details-marker]:hidden">
          <span className="group-open:hidden">Show all ranks</span>
          <span className="hidden group-open:inline">Hide ranks</span>
        </summary>
        <ol className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {RANKS.map((r, i) => {
            const reached = i <= currentIdx;
            const current = i === currentIdx;
            return (
              <li
                key={r.name}
                aria-current={current ? "step" : undefined}
                className={`flex items-center gap-2 rounded-xl border p-2 ${current ? "border-brand bg-brand-soft" : reached ? "border-line bg-surface" : "border-dashed border-line bg-surface-2 opacity-75"}`}
              >
                <span className={`text-2xl ${reached ? "" : "grayscale"}`} aria-hidden>
                  {r.emoji}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-sm font-extrabold">{r.name}</span>
                  <span className="block text-xs text-ink-2">
                    {r.min === 0 ? "Start" : `${r.min.toLocaleString("en-GB")} ⭐`}
                    {current ? " · you are here" : reached ? " · reached" : ""}
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
        <p className="mt-3 text-xs text-ink-2">
          Stars come from first-time correct answers (a bonus for no hints), skills reaching Secure or Mastered, and finishing the Daily 5.
        </p>
      </details>
    </section>
  );
}

function TopicList({ summaries, masteries }: { summaries: TopicSummary[]; masteries: Map<string, TopicMastery> }) {
  const { data } = useStore();
  const readyCount = masteries.size;
  const avg = readyCount ? Math.round([...masteries.values()].reduce((t, m) => t + m.pct, 0) / readyCount) : 0;
  const certs = [...masteries.values()].filter((m) => m.pct >= 80).length;
  const known = new Set<string>(STRANDS);
  const groups: { strand: string; topics: TopicSummary[] }[] = STRANDS.map((strand) => ({ strand, topics: summaries.filter((s) => s.strand === strand) })).filter(
    (g) => g.topics.length,
  );
  const other = summaries.filter((s) => !known.has(s.strand));
  if (other.length) groups.push({ strand: "Other", topics: other });

  return (
    <section aria-labelledby="topics-h" className="card p-4 sm:p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h2 id="topics-h" className="section-title">
          Topic mastery
        </h2>
        {readyCount ? (
          <p className="text-sm text-ink-2">
            Average {avg}% · {certs} certificate{certs === 1 ? "" : "s"} earned
          </p>
        ) : null}
      </div>
      <p className="mt-0.5 text-xs text-ink-2">Mastery combines lessons understood, skill levels, questions solved and challenge problems. 80% earns a certificate.</p>
      <div className="mt-3 space-y-5">
        {groups.map((g) => (
          <div key={g.strand}>
            <h3 className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wide text-ink-2">
              <span className={`h-2.5 w-2.5 rounded-full ${STRAND_DOT[g.strand] ?? "bg-ink-2"}`} aria-hidden />
              {g.strand}
            </h3>
            <ul className="mt-1 divide-y divide-line">
              {g.topics.map((s) => {
                const m = masteries.get(s.id);
                if (!s.ready || !m) {
                  return (
                    <li key={s.id} className="flex items-center gap-3 py-3 text-ink-2">
                      <span className="w-7 shrink-0 text-center text-xl opacity-60" aria-hidden>
                        {s.icon}
                      </span>
                      <span className="min-w-0 flex-1 truncate font-bold">{s.title}</span>
                      <span className="chip">Coming soon</span>
                    </li>
                  );
                }
                const time = data.analytics.topics[s.id]?.timeMs ?? 0;
                const done = m.pct >= 80;
                return (
                  <li key={s.id} className="flex items-start gap-3 py-3">
                    <span className="w-7 shrink-0 pt-0.5 text-center text-xl" aria-hidden>
                      {s.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                        <Link href={`/topic/${s.id}`} className="min-w-0 truncate font-bold hover:text-brand hover:underline">
                          {s.title}
                        </Link>
                        <span className={`shrink-0 text-sm font-black tabular-nums ${done ? "text-good" : "text-ink"}`}>{m.pct}%</span>
                      </div>
                      <div className="mt-1.5">
                        <Meter value={m.pct} label={`${s.title} mastery`} tone={done ? "good" : "brand"} />
                      </div>
                      <p className="mt-1.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-2">
                        <span>
                          Lessons {m.sectionsRead}/{m.sectionsTotal}
                        </span>
                        <span>Accuracy {m.accuracy === null ? "—" : `${Math.round(m.accuracy * 100)}%`}</span>
                        <span>{time > 0 ? fmtDuration(time) : "Not started"}</span>
                        {done ? (
                          <Link href={`/certificate/${s.id}`} className="font-bold text-brand hover:underline">
                            🎓 Certificate
                          </Link>
                        ) : null}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function Choice({ pressed, onClick, children, label }: { pressed: boolean; onClick: () => void; children: ReactNode; label?: string }) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={label}
      onClick={onClick}
      className={`min-h-10 min-w-11 rounded-xl border px-3 text-sm font-extrabold tabular-nums transition-colors ${pressed ? "border-brand bg-brand text-brand-ink" : "border-line bg-surface text-ink hover:bg-surface-2"}`}
    >
      {children}
    </button>
  );
}

function Goals() {
  const { data, activeProfile, setGoalMinutes, setWeeklyDays } = useStore();
  const today = data.analytics.days[todayISO()];
  const minsToday = Math.round((today?.timeMs ?? 0) / 60000);
  const activeDays = activeDaysThisWeek(data, weekStartISO());
  const suggested = activeProfile?.settings?.goalMinutes;
  const goalMet = minsToday >= data.goalMinutes;

  return (
    <section aria-labelledby="goals-h" className="card p-4 sm:p-5">
      <h2 id="goals-h" className="section-title">
        Goals
      </h2>

      <div className="mt-3" role="group" aria-labelledby="goal-min-h">
        <h3 id="goal-min-h" className="text-sm font-bold">
          Minutes a day
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {GOAL_OPTIONS.map((m) => (
            <Choice key={m} pressed={data.goalMinutes === m} onClick={() => setGoalMinutes(m)} label={`${m} minutes a day`}>
              {m}
            </Choice>
          ))}
        </div>
        <div className="mt-3">
          <Meter value={(100 * minsToday) / Math.max(1, data.goalMinutes)} label="Today's minutes towards your daily goal" tone={goalMet ? "good" : "brand"} />
          <p className="mt-1.5 text-sm text-ink-2" aria-live="polite">
            Today: <span className="font-bold text-ink">{minsToday}</span> of {data.goalMinutes} min{goalMet ? " — goal reached ✓" : ""}
          </p>
        </div>
        {suggested && suggested !== data.goalMinutes ? (
          <p className="mt-2 flex flex-wrap items-center gap-2 rounded-xl bg-info-soft px-3 py-2 text-sm">
            <span>
              A parent suggested <span className="font-bold">{suggested} minutes</span> a day.
            </span>
            <button type="button" className="btn btn-secondary btn-sm" onClick={() => setGoalMinutes(suggested)}>
              Use {suggested} min
            </button>
          </p>
        ) : null}
      </div>

      <div className="mt-5" role="group" aria-labelledby="goal-week-h">
        <h3 id="goal-week-h" className="text-sm font-bold">
          Days a week
        </h3>
        <div className="mt-2 flex flex-wrap gap-2">
          {WEEK_OPTIONS.map((n) => (
            <Choice key={n} pressed={data.weeklyDays === n} onClick={() => setWeeklyDays(n)} label={`${n} days a week`}>
              {n}
            </Choice>
          ))}
        </div>
        <p className="mt-2 text-sm text-ink-2" aria-live="polite">
          This week: <span className="font-bold text-ink">{activeDays}</span> of {data.weeklyDays} day{data.weeklyDays === 1 ? "" : "s"}
          {activeDays >= data.weeklyDays ? " — weekly goal met ✓" : ""}
        </p>
      </div>

      <p className="mt-4 rounded-xl bg-surface-2 px-3 py-2 text-xs leading-relaxed text-ink-2">
        <span className="font-bold text-ink">Why a weekly goal?</span> An endless streak breaks the moment life gets busy, and that can make you want to give up. A weekly target
        leaves room for rest days — and short, regular sessions with breaks in between are how memory actually sticks.
      </p>
    </section>
  );
}

function FocusPicker({ ready }: { ready: TopicSummary[] }) {
  const { data, activeProfile, mode, setFocusTopics } = useStore();
  const mine = data.focusTopics.filter((id) => ready.some((s) => s.id === id));
  const fromParent = (activeProfile?.settings?.focusTopics ?? []).filter((id) => ready.some((s) => s.id === id));
  const full = mine.length >= MAX_FOCUS;
  const titleOf = (id: string) => ready.find((s) => s.id === id)?.title ?? id;

  function toggle(id: string) {
    if (mine.includes(id)) setFocusTopics(mine.filter((x) => x !== id));
    else if (!full) setFocusTopics([...mine, id]);
  }

  return (
    <section aria-labelledby="focus-h" className="card p-4 sm:p-5">
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="focus-h" className="section-title">
          Focus topics
        </h2>
        <span className="text-sm tabular-nums text-ink-2" aria-live="polite">
          {mine.length}/{MAX_FOCUS} chosen
        </span>
      </div>
      <p className="mt-1 text-sm text-ink-2">
        Pick up to {MAX_FOCUS} topics you&apos;re doing at school right now. The Daily 5 and review will lean towards them.
      </p>
      {fromParent.length ? (
        <div className="mt-3 rounded-xl bg-info-soft px-3 py-2 text-sm">
          <p className="font-bold">Chosen by a parent</p>
          <ul className="mt-1 flex flex-wrap gap-1.5">
            {fromParent.map((id) => (
              <li key={id} className="chip">
                {titleOf(id)}
              </li>
            ))}
          </ul>
        </div>
      ) : null}
      {ready.length === 0 ? (
        <p className="mt-3 text-sm text-ink-2">Topics will appear here as soon as they&apos;re ready.</p>
      ) : (
        <ul className="mt-3 flex flex-wrap gap-2" aria-label="Topics">
          {ready.map((s) => {
            const on = mine.includes(s.id);
            return (
              <li key={s.id}>
                <button
                  type="button"
                  aria-pressed={on}
                  disabled={!on && full}
                  onClick={() => toggle(s.id)}
                  className={`flex min-h-10 items-center gap-1.5 rounded-full border px-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-45 ${on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink hover:bg-surface-2"}`}
                >
                  <span className={`h-2 w-2 shrink-0 rounded-full ${STRAND_DOT[s.strand] ?? "bg-ink-2"}`} aria-hidden />
                  {s.title}
                  {on ? <span aria-hidden>✓</span> : null}
                </button>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-ink-2">
        {mode === "cloud"
          ? "A parent can also set focus topics from the parent dashboard — the Daily 5 uses both."
          : "With a family account, a parent can also set focus topics from the parent dashboard."}
      </p>
    </section>
  );
}

function ThemePicker() {
  const [theme, setTheme] = useState<Theme>(readTheme);
  const options: { id: Theme; label: string; icon: string }[] = [
    { id: "system", label: "System", icon: "💻" },
    { id: "light", label: "Light", icon: "☀️" },
    { id: "dark", label: "Dark", icon: "🌙" },
  ];
  return (
    <section aria-labelledby="theme-h" className="card p-4 sm:p-5">
      <h2 id="theme-h" className="section-title">
        Appearance
      </h2>
      <p className="mt-1 text-sm text-ink-2">System follows your device&apos;s light or dark setting. Saved on this device.</p>
      <div className="mt-3 grid grid-cols-3 gap-2" role="radiogroup" aria-labelledby="theme-h">
        {options.map((o) => {
          const on = theme === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => {
                setTheme(o.id);
                applyTheme(o.id);
              }}
              className={`flex min-h-12 flex-col items-center justify-center gap-0.5 rounded-xl border px-2 py-2 text-sm font-bold transition-colors ${on ? "border-brand bg-brand-soft text-brand" : "border-line bg-surface text-ink hover:bg-surface-2"}`}
            >
              <span aria-hidden>{o.icon}</span>
              {o.label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

function DangerZone() {
  const { mode, activeProfile, resetAll } = useStore();
  const [pin, setPin] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const cloud = mode === "cloud";
  const who = cloud && activeProfile ? `${activeProfile.name}'s` : "all";

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setMsg(null);
    if (cloud) {
      setBusy(true);
      let error: string | null = null;
      try {
        const r = await fetch("/api/parent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ pin, action: "verify" }),
          cache: "no-store",
        });
        const j = (await r.json().catch(() => ({}))) as { error?: unknown };
        if (!r.ok) error = typeof j.error === "string" ? j.error : "That PIN couldn't be checked. Please try again.";
      } catch {
        error = "Couldn't reach the server. Check your internet connection and try again.";
      }
      setBusy(false);
      if (error) {
        setMsg({ ok: false, text: error });
        return;
      }
      setPin("");
    }
    const ok = window.confirm(
      `Reset ${who} progress? Stars, skills, lessons read, goals and history will all go back to zero. This can't be undone.`,
    );
    if (!ok) {
      setMsg({ ok: true, text: "Nothing was changed." });
      return;
    }
    resetAll();
    setMsg({ ok: true, text: "Progress reset. A fresh start!" });
  }

  return (
    <section aria-labelledby="danger-h" className="no-print">
      <details className="card group p-4 sm:p-5">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-3 [&::-webkit-details-marker]:hidden">
          <h2 id="danger-h" className="text-base font-extrabold text-ink-2">
            Reset progress
          </h2>
          <span className="text-sm text-ink-2 transition-transform group-open:rotate-180" aria-hidden>
            ▾
          </span>
        </summary>
        <form className="mt-3 space-y-3" onSubmit={onSubmit}>
          <p className="text-sm text-ink-2">
            This wipes {cloud ? `${activeProfile?.name ?? "this learner"}'s` : "the"} progress {cloud ? "on every device" : "saved on this device"} and starts again from zero.
            {cloud ? " A parent PIN is needed." : ""}
          </p>
          {cloud ? (
            <label className="block max-w-xs space-y-1">
              <span className="text-sm font-bold text-ink-2">Parent PIN</span>
              <input
                className="input tracking-[0.3em]"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                placeholder="••••"
              />
            </label>
          ) : null}
          <button type="submit" className="btn btn-secondary border-bad text-bad" disabled={busy || (cloud && pin.length < 4)}>
            {busy ? "Checking…" : "Reset progress…"}
          </button>
          <div aria-live="polite">
            {msg ? (
              <p className={`rounded-xl px-3 py-2 text-sm ${msg.ok ? "bg-surface-2" : "bg-bad-soft"}`} role={msg.ok ? "status" : "alert"}>
                {msg.text}
              </p>
            ) : null}
          </div>
        </form>
      </details>
    </section>
  );
}
