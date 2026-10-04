"use client";
// Printable certificates: one per topic (≥ 80% topic mastery) and a Year 8
// certificate (≥ 12 topics at 60%+). Until a certificate is earned, the page
// shows exactly what is still needed, with links to the right lessons/skills.
// Also exports PrintButton + PrintStyles for other printable pages.
import Link from "next/link";
import { useId, useMemo, useState, type ReactNode } from "react";
import type { TopicSummary } from "@/lib/server/content";
import type { Drill } from "@/lib/drills/types";
import { useStore } from "@/lib/store";
import { topicMastery, type TopicMastery } from "@/lib/mastery";
import { drillsForTopic } from "@/lib/drills";
import { skillLevel } from "@/lib/learning";
import { STRANDS } from "@/lib/topics/meta";
import { LevelBadge } from "./DrillRunner";

/** Topic certificate threshold (topic mastery %). */
export const TOPIC_CERT_PCT = 80;
/** Year 8 certificate: this many topics at YEAR8_TOPIC_PCT or more. */
export const YEAR8_TOPICS_NEEDED = 12;
export const YEAR8_TOPIC_PCT = 60;

// ------------------------------------------------------------ print helpers

/**
 * Print setup for a page: paper size/orientation, light colours even when the
 * app is in dark mode, and no app padding around the printed content.
 */
export function PrintStyles({ orientation = "portrait", margin = "12mm" }: { orientation?: "portrait" | "landscape"; margin?: string }) {
  const css = `
@page { size: A4 ${orientation}; margin: ${margin}; }
@media print {
  :root:root:root {
    --bg: #ffffff; --surface: #ffffff; --surface-2: #f0f2f9; --ink: #171a2f; --ink-2: #555b78; --line: #e0e3ef;
    --brand: #4f46e5; --brand-2: #7c3aed; --brand-ink: #ffffff; --brand-soft: #eceafe;
    --accent: #f59e0b; --accent-soft: #fef3c7; --good: #15803d; --good-soft: #dcfce7;
    --bad: #c2410c; --bad-soft: #ffedd5; --warn: #a16207; --warn-soft: #fef9c3; --info: #0369a1; --info-soft: #e0f2fe;
    --s-number: #4f46e5; --s-ratio: #0d9488; --s-algebra: #7c3aed; --s-geometry: #ea580c; --s-stats: #db2777;
    --shadow: none;
    color-scheme: light;
  }
  html, body { background: #ffffff !important; }
  main { padding: 0 !important; max-width: none !important; }
  .cert-sheet {
    max-width: none !important; width: 100% !important; height: 180mm; padding: 0 !important; margin: 0 !important;
    box-shadow: none !important; border-radius: 0 !important;
    break-inside: avoid; page-break-inside: avoid;
  }
  .cert-frame { height: 100%; }
  .print-exact { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
}`;
  return <style dangerouslySetInnerHTML={{ __html: css }} />;
}

/** A Print button (hidden when printing). */
export function PrintButton({ label = "Print", className = "" }: { label?: string; className?: string }) {
  return (
    <button type="button" className={`btn btn-secondary no-print ${className}`} onClick={() => window.print()}>
      <span aria-hidden>🖨️</span> {label}
    </button>
  );
}

// ------------------------------------------------------------------ helpers

const STRAND_DOT: Record<string, string> = {
  Number: "bg-s-number",
  "Ratio & Proportion": "bg-s-ratio",
  Algebra: "bg-s-algebra",
  "Geometry & Measure": "bg-s-geometry",
  "Statistics & Probability": "bg-s-stats",
};
const STRAND_TEXT: Record<string, string> = {
  Number: "text-s-number",
  "Ratio & Proportion": "text-s-ratio",
  Algebra: "text-s-algebra",
  "Geometry & Measure": "text-s-geometry",
  "Statistics & Probability": "text-s-stats",
};

interface Row {
  s: TopicSummary;
  m: TopicMastery;
  drills: Drill[];
  /** Skill level (0..3) by drill id. */
  levels: Record<string, number>;
  /** Lesson sections marked as understood, by section id. */
  read: Record<string, boolean>;
}

/** The four parts of topic mastery, in points (they add up to the mastery %). */
function masteryParts(m: TopicMastery) {
  const sk = m.skills;
  return {
    lessons: m.sectionsTotal ? (15 * m.sectionsRead) / m.sectionsTotal : 0,
    skills: sk.total ? (45 * (sk.practising + 2 * sk.secure + 3 * sk.mastered)) / (3 * sk.total) : 0,
    questions: 25 * Math.min(1, m.solved / 60),
    challenge: 15 * Math.min(1, m.challengeSolved / 5),
  };
}

const pts = (n: number) => Math.round(n * 10) / 10;

function Bar({ value, label, target, className = "h-2.5", decorative = false }: { value: number; label: string; target?: number; className?: string; decorative?: boolean }) {
  const v = Math.max(0, Math.min(100, value));
  const a11y = decorative
    ? ({ "aria-hidden": true } as const)
    : ({ role: "progressbar", "aria-label": label, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": Math.round(v) } as const);
  return (
    <div className="relative">
      <div className={`w-full overflow-hidden rounded-full bg-surface-2 ${className}`} {...a11y}>
        <div className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2 transition-[width] duration-500" style={{ width: `${v}%` }} />
      </div>
      {target !== undefined ? <span aria-hidden className="absolute -bottom-1 -top-1 w-0.5 rounded bg-ink" style={{ left: `calc(${target}% - 1px)` }} /> : null}
    </div>
  );
}

function StrandChip({ strand }: { strand: string }) {
  return (
    <span className="chip">
      <span aria-hidden className={`h-2 w-2 rounded-full ${STRAND_DOT[strand] ?? "bg-brand"}`} />
      {strand}
    </span>
  );
}

const PI_PATHS = ["M17 37 C 20 28 26 25 34 25 L 84 25", "M41 27 C 41 50 38 65 29 77", "M65 27 L 65 64 C 65 74 70 77 79 73"];

/** Serrated rosette edge for the seal (deterministic). */
const SEAL_EDGE = (() => {
  const n = 36;
  const p: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 50.5 : 56;
    const a = (Math.PI * i) / n;
    p.push(`${(60 + r * Math.sin(a)).toFixed(2)},${(60 - r * Math.cos(a)).toFixed(2)}`);
  }
  return `M${p.join("L")}Z`;
})();

function Seal({ className }: { className?: string }) {
  const grad = `seal-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 120 120" className={className} role="img" aria-label="Year 8 Maths Lab seal">
      <defs>
        <linearGradient id={grad} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" style={{ stopColor: "var(--brand)" }} />
          <stop offset="100%" style={{ stopColor: "var(--brand-2)" }} />
        </linearGradient>
      </defs>
      <path d={SEAL_EDGE} fill={`url(#${grad})`} />
      <circle cx="60" cy="60" r="44" fill="none" stroke="#ffffff" strokeOpacity="0.8" strokeWidth="1.6" strokeDasharray="3 3.2" />
      <circle cx="60" cy="60" r="38.5" fill="none" stroke="#ffffff" strokeOpacity="0.35" strokeWidth="1" />
      <g transform="translate(32.2 32) scale(0.55)" fill="none" stroke="#ffffff" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round">
        {PI_PATHS.map((d) => (
          <path key={d} d={d} />
        ))}
      </g>
    </svg>
  );
}

// ------------------------------------------------------- the certificate

interface SheetProps {
  heading: string;
  name: string;
  verb: string;
  subject: string;
  icon?: string;
  strand?: string;
  stats: { value: string; label: string; sub?: string }[];
  date: string;
}

function CertificateSheet({ heading, name, verb, subject, icon, strand, stats, date }: SheetProps) {
  return (
    <article className="cert-sheet print-exact relative mx-auto w-full max-w-4xl rounded-2xl bg-surface p-2.5 shadow-card ring-1 ring-line sm:p-3.5" aria-label={`${heading}: ${name}, ${subject}`}>
      <div className="cert-frame relative flex flex-col items-center justify-center overflow-hidden rounded-xl border-[5px] border-double border-brand px-4 py-8 text-center sm:px-12 sm:py-10">
        <div aria-hidden className="pointer-events-none absolute inset-2 rounded-lg border border-accent" />
        {["left-3.5 top-3.5 border-l-2 border-t-2", "right-3.5 top-3.5 border-r-2 border-t-2", "bottom-3.5 left-3.5 border-b-2 border-l-2", "bottom-3.5 right-3.5 border-b-2 border-r-2"].map((c) => (
          <span key={c} aria-hidden className={`pointer-events-none absolute h-7 w-7 border-accent ${c}`} />
        ))}
        <svg aria-hidden viewBox="0 0 100 100" className="pointer-events-none absolute -bottom-12 -right-10 h-72 w-72 text-brand opacity-[0.06]">
          <g fill="none" stroke="currentColor" strokeWidth="11" strokeLinecap="round" strokeLinejoin="round">
            {PI_PATHS.map((d) => (
              <path key={d} d={d} />
            ))}
          </g>
        </svg>

        <div className="relative flex items-center gap-2 text-sm font-black tracking-tight text-ink-2">
          <span aria-hidden className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-brand to-brand-2 text-base text-brand-ink">
            π
          </span>
          Year 8 Maths Lab
        </div>
        <p className="relative mt-5 text-xs font-extrabold uppercase tracking-[0.32em] text-warn sm:text-sm">{heading}</p>
        <p className="relative mt-5 text-ink-2">This certifies that</p>
        <p className="relative mt-1.5 max-w-full break-words border-b-2 border-line px-4 pb-2 font-serif text-4xl font-bold italic leading-tight text-ink sm:px-10 sm:text-5xl">{name}</p>
        <p className="relative mt-4 text-ink-2">{verb}</p>
        <p className="relative mt-1 text-2xl font-black leading-tight text-brand sm:text-3xl">
          {icon ? <span aria-hidden>{icon} </span> : null}
          {subject}
        </p>
        {strand ? (
          <div className="relative mt-2">
            <StrandChip strand={strand} />
          </div>
        ) : null}

        <dl className={`relative mt-6 grid w-full max-w-2xl gap-2 ${stats.length >= 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-3"}`}>
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col-reverse rounded-xl border border-line bg-surface-2 px-2 py-2.5">
              <dt className="text-[0.68rem] font-bold uppercase leading-tight tracking-wide text-ink-2">
                {s.label}
                {s.sub ? <span className="block normal-case tracking-normal">{s.sub}</span> : null}
              </dt>
              <dd className="text-xl font-black tabular-nums text-ink sm:text-2xl">{s.value}</dd>
            </div>
          ))}
        </dl>

        <div className="relative mt-7 grid w-full max-w-2xl grid-cols-[1fr_auto_1fr] items-end gap-3 sm:gap-8">
          <div className="border-t-2 border-line pt-1.5 text-sm">
            <div className="font-bold text-ink">{date}</div>
            <div className="text-xs text-ink-2">Date awarded</div>
          </div>
          <Seal className="h-16 w-16 sm:h-24 sm:w-24" />
          <div className="border-t-2 border-line pt-1.5 text-sm">
            <div className="font-serif font-bold italic text-ink">Year 8 Maths Lab</div>
            <div className="text-xs text-ink-2">Awarded by</div>
          </div>
        </div>
      </div>
    </article>
  );
}

// ------------------------------------------------------- "still needed"

function PartCard({ title, got, of, detail, children }: { title: string; got: number; of: number; detail: string; children: ReactNode }) {
  const full = got >= of - 0.05;
  return (
    <section className="card flex flex-col p-4" aria-label={title}>
      <div className="flex items-baseline justify-between gap-2">
        <h2 className="font-extrabold">{title}</h2>
        <span className={`text-sm font-bold tabular-nums ${full ? "text-good" : "text-ink-2"}`}>
          {pts(got)} / {of} pts
        </span>
      </div>
      <div className="mt-2">
        <Bar value={of ? (100 * got) / of : 0} label={`${title}: ${pts(got)} of ${of} points`} className="h-2" />
      </div>
      <p className="mt-1.5 text-sm text-ink-2">{detail}</p>
      <div className="mt-3 flex-1 text-sm">{children}</div>
    </section>
  );
}

function TopicNeeds({ row }: { row: Row }) {
  const { s, m, drills } = row;
  const parts = masteryParts(m);
  const level = (d: Drill) => row.levels[d.id] ?? 0;
  const unread = s.sections.filter((x) => !x.stretch && !row.read[x.id]);
  const notYet = [...drills].sort((a, b) => level(a) - level(b)).filter((d) => level(d) < 3);
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <PartCard title="Lessons understood" got={parts.lessons} of={15} detail={`${m.sectionsRead} of ${m.sectionsTotal} lesson sections marked as understood.`}>
        {unread.length ? (
          <ul className="space-y-1">
            {unread.slice(0, 6).map((x) => (
              <li key={x.id}>
                <Link href={`/topic/${s.id}?tab=learn#sec-${x.id}`} className="flex min-h-10 items-center justify-between gap-2 rounded-lg px-2 hover:bg-surface-2">
                  <span>{x.heading}</span>
                  <span aria-hidden className="text-brand">
                    →
                  </span>
                </Link>
              </li>
            ))}
            {unread.length > 6 ? <li className="px-2 text-ink-2">…and {unread.length - 6} more in the Learn tab.</li> : null}
          </ul>
        ) : (
          <p className="font-bold text-good">✓ Every lesson section is marked as understood.</p>
        )}
      </PartCard>

      <PartCard
        title="Skills"
        got={parts.skills}
        of={45}
        detail={drills.length ? `${m.skills.mastered} mastered · ${m.skills.secure} secure · ${m.skills.practising} practising · ${m.skills.total - m.skills.mastered - m.skills.secure - m.skills.practising} new.` : "Skill drills for this topic are on their way."}
      >
        {!drills.length ? (
          <p className="text-ink-2">Skills are worth 45 points, so this certificate unlocks once the drills arrive. Everything you do now still counts.</p>
        ) : notYet.length ? (
          <>
            <ul className="space-y-1">
              {notYet.slice(0, 6).map((d) => (
                <li key={d.id}>
                  <Link href={`/drill/${d.id}`} className="flex min-h-10 items-center justify-between gap-2 rounded-lg px-2 hover:bg-surface-2">
                    <span className="min-w-0">{d.title}</span>
                    <LevelBadge level={level(d)} />
                  </Link>
                </li>
              ))}
              {notYet.length > 6 ? <li className="px-2 text-ink-2">…and {notYet.length - 6} more on the Skills page.</li> : null}
            </ul>
            <p className="mt-2 text-xs text-ink-2">Secure → Mastered: get the skill right in the Daily 5 or Review on two days at least 3 days apart.</p>
          </>
        ) : (
          <p className="font-bold text-good">✓ Every skill is mastered.</p>
        )}
      </PartCard>

      <PartCard title="Questions solved" got={parts.questions} of={25} detail={`${Math.min(m.solved, 60)} of 60 questions solved (quizzes, papers and challenges all count).`}>
        {m.solved >= 60 ? (
          <p className="font-bold text-good">✓ Full marks here.</p>
        ) : (
          <>
            <Link href={`/topic/${s.id}?tab=practise`} className="btn btn-secondary btn-sm min-h-10">
              Practise questions →
            </Link>
            {s.counts.questions < 60 ? <p className="mt-2 text-xs text-ink-2">There are {s.counts.questions} questions in this topic at the moment.</p> : null}
          </>
        )}
      </PartCard>

      <PartCard title="Challenge problems" got={parts.challenge} of={15} detail={`${Math.min(m.challengeSolved, 5)} of 5 challenge problems solved.`}>
        {m.challengeSolved >= 5 ? (
          <p className="font-bold text-good">✓ Full marks here.</p>
        ) : s.challengeIds.length ? (
          <>
            <Link href={`/topic/${s.id}?tab=challenge`} className="btn btn-secondary btn-sm min-h-10">
              Try a challenge →
            </Link>
            {s.challengeIds.length < 5 ? (
              <p className="mt-2 text-xs text-ink-2">
                There {s.challengeIds.length === 1 ? "is 1 challenge problem" : `are ${s.challengeIds.length} challenge problems`} in this topic at the moment.
              </p>
            ) : null}
          </>
        ) : (
          <p className="text-ink-2">Challenge problems for this topic are coming soon.</p>
        )}
      </PartCard>
    </div>
  );
}

// ------------------------------------------------------------------ main

export interface CertificateProps {
  kind: "topic" | "year8";
  topic?: TopicSummary;
  summaries: TopicSummary[];
}

export function Certificate({ kind, topic, summaries }: CertificateProps) {
  const { data, activeProfile, mode } = useStore();
  const nameId = useId();
  const [name, setName] = useState(() => (mode === "guest" ? "" : (activeProfile?.name ?? "")));
  const [date] = useState(() => new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" }));
  const printedName = name.trim() || (mode === "guest" ? "Guest" : activeProfile?.name || "Guest");

  const rows: Row[] = useMemo(
    () =>
      summaries.map((s) => {
        const drills = drillsForTopic(s.id);
        const m = topicMastery(s, data, drills.map((d) => d.id));
        const levels: Record<string, number> = {};
        for (const d of drills) levels[d.id] = skillLevel(data.skills[d.id]);
        const read: Record<string, boolean> = {};
        for (const sec of s.sections) read[sec.id] = !!data.guidesRead[`${s.id}#${sec.id}`];
        return { s, m, drills, levels, read };
      }),
    [summaries, data],
  );

  const controls = (
    <div className="no-print flex flex-wrap items-end gap-3">
      <div className="min-w-0 flex-1 basis-56">
        <label htmlFor={nameId} className="mb-1 block text-sm font-bold text-ink-2">
          Name on the certificate
        </label>
        <input id={nameId} className="input" value={name} maxLength={40} autoComplete="name" placeholder={mode === "guest" ? "Type your name" : (activeProfile?.name ?? "Your name")} onChange={(e) => setName(e.target.value)} />
      </div>
      <PrintButton label="Print certificate" className="btn-primary" />
    </div>
  );
  const printTip = <p className="no-print text-center text-xs text-ink-2">Prints on one A4 page in landscape. If the colours don&apos;t show, switch on “Background graphics” in the print options.</p>;

  // ---------------------------------------------------------------- topic
  if (kind === "topic") {
    const row = topic ? rows.find((r) => r.s.id === topic.id) : undefined;
    if (!topic || !row) {
      return (
        <div className="card mx-auto max-w-lg p-6 text-center">
          <h1 className="text-xl font-extrabold">Certificate not found</h1>
          <Link href="/topics" className="btn btn-primary mt-4">
            See all topics
          </Link>
        </div>
      );
    }
    const { m } = row;
    const earned = topic.ready && m.pct >= TOPIC_CERT_PCT;
    const back = (
      <Link href={`/topic/${topic.id}`} className="no-print inline-flex min-h-10 items-center text-sm font-bold text-ink-2 hover:text-ink">
        ← {topic.title}
      </Link>
    );

    if (earned) {
      return (
        <div className="space-y-4">
          <PrintStyles orientation="landscape" margin="10mm" />
          <div className="no-print space-y-3">
            {back}
            <div>
              <h1 className="text-2xl font-black tracking-tight">Certificate earned 🏅</h1>
              <p className="text-ink-2">
                {m.pct}% mastery of {topic.title}. Print it, frame it, or save it as a PDF.
              </p>
            </div>
            {controls}
          </div>
          <CertificateSheet
            heading="Certificate of Mastery"
            name={printedName}
            verb="has mastered"
            subject={topic.title}
            icon={topic.icon}
            strand={topic.strand}
            date={date}
            stats={[
              { value: `${m.pct}%`, label: "Topic mastery" },
              { value: `${m.skills.mastered}${m.skills.total ? `/${m.skills.total}` : ""}`, label: "Skills mastered", sub: m.skills.secure ? `+${m.skills.secure} secure` : undefined },
              { value: String(m.solved), label: "Questions solved" },
              { value: String(m.challengeSolved), label: "Challenge problems solved" },
            ]}
          />
          {printTip}
          <p className="no-print text-center text-sm">
            <Link href="/certificate/year8" className="font-bold text-brand hover:underline">
              The Year 8 certificate →
            </Link>
          </p>
        </div>
      );
    }

    const toGo = Math.max(0, TOPIC_CERT_PCT - m.pct);
    return (
      <div className="space-y-5">
        {back}
        <header>
          <span className="chip">🏅 Certificate of Mastery</span>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
            <span aria-hidden>{topic.icon} </span>
            {topic.title}
          </h1>
          <p className="mt-1 text-ink-2">Reach {TOPIC_CERT_PCT}% topic mastery to unlock a printable certificate with your name on it.</p>
        </header>

        {!topic.ready ? (
          <section className="card p-5 text-center">
            <div className="text-3xl" aria-hidden>
              ✍️
            </div>
            <h2 className="mt-1 font-extrabold">This topic is still being written</h2>
            <p className="mx-auto mt-1 max-w-md text-sm text-ink-2">Its lessons and questions are on the way — the certificate will be ready to earn as soon as they arrive.</p>
            <Link href="/topics" className="btn btn-secondary mt-4">
              Choose another topic
            </Link>
          </section>
        ) : (
          <>
            <section className="card p-5" aria-label="Progress towards the certificate">
              <div className="flex flex-wrap items-end justify-between gap-2">
                <div>
                  <div className="text-4xl font-black tabular-nums text-brand">{m.pct}%</div>
                  <div className="text-sm text-ink-2">topic mastery</div>
                </div>
                <div className="text-right text-sm">
                  <div className="font-extrabold">{toGo} more point{toGo === 1 ? "" : "s"} to go</div>
                  <div className="text-ink-2">Certificate at {TOPIC_CERT_PCT}%</div>
                </div>
              </div>
              <div className="mt-3">
                <Bar value={m.pct} target={TOPIC_CERT_PCT} label={`${topic.title} mastery`} className="h-3" />
              </div>
              <p className="mt-3 text-sm text-ink-2">Mastery is made of four parts. Here&apos;s where your next points can come from:</p>
            </section>
            <TopicNeeds row={row} />
          </>
        )}
        <p className="text-sm text-ink-2">
          Also working towards the{" "}
          <Link href="/certificate/year8" className="font-bold text-brand hover:underline">
            Year 8 Maths certificate
          </Link>
          .
        </p>
      </div>
    );
  }

  // ---------------------------------------------------------------- year 8
  const ready = rows.filter((r) => r.s.ready);
  const qualifying = rows.filter((r) => r.m.pct >= YEAR8_TOPIC_PCT);
  const earned = qualifying.length >= YEAR8_TOPICS_NEEDED;
  const totals = rows.reduce((a, r) => ({ skills: a.skills + r.m.skills.mastered, solved: a.solved + r.m.solved, challenge: a.challenge + r.m.challengeSolved }), { skills: 0, solved: 0, challenge: 0 });
  const topicCerts = rows.filter((r) => r.s.ready && r.m.pct >= TOPIC_CERT_PCT);

  const topicList = (
    <section className="space-y-4" aria-label="Topic mastery">
      {STRANDS.map((strand) => {
        const list = rows.filter((r) => r.s.strand === strand);
        if (!list.length) return null;
        return (
          <div key={strand} className="card p-4">
            <h3 className={`font-extrabold ${STRAND_TEXT[strand] ?? ""}`}>{strand}</h3>
            <ul className="mt-2 divide-y divide-line">
              {list.map((r) => {
                const ok = r.m.pct >= YEAR8_TOPIC_PCT;
                return (
                  <li key={r.s.id} className="flex items-center gap-3 py-2">
                    <span className="w-7 shrink-0 text-center text-xl" aria-hidden>
                      {r.s.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-2">
                        {r.s.ready ? (
                          <Link href={`/topic/${r.s.id}`} className="truncate font-bold hover:text-brand">
                            {r.s.title}
                          </Link>
                        ) : (
                          <span className="truncate font-bold text-ink-2">{r.s.title}</span>
                        )}
                        <span className={`shrink-0 text-sm font-bold tabular-nums ${ok ? "text-good" : "text-ink-2"}`}>
                          {r.s.ready ? `${r.m.pct}%` : "Coming soon"}
                          {ok ? " ✓" : ""}
                        </span>
                      </div>
                      {r.s.ready ? (
                        <div className="mt-1">
                          <Bar value={r.m.pct} target={YEAR8_TOPIC_PCT} label={`${r.s.title} mastery`} className="h-1.5" />
                        </div>
                      ) : null}
                    </div>
                    {r.s.ready && r.m.pct >= TOPIC_CERT_PCT ? (
                      <Link href={`/certificate/${r.s.id}`} className="btn btn-ghost btn-sm min-h-10 shrink-0" aria-label={`${r.s.title} certificate`}>
                        🏅
                      </Link>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </section>
  );

  if (earned) {
    return (
      <div className="space-y-4">
        <PrintStyles orientation="landscape" margin="10mm" />
        <div className="no-print space-y-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight">Year 8 certificate earned 🎓</h1>
            <p className="text-ink-2">
              {qualifying.length} topics at {YEAR8_TOPIC_PCT}%+ mastery — a whole year of maths. Print it, frame it, or save it as a PDF.
            </p>
          </div>
          {controls}
        </div>
        <CertificateSheet
          heading="Certificate of Achievement"
          name={printedName}
          verb="has successfully completed"
          subject="Year 8 Mathematics"
          date={date}
          stats={[
            { value: `${qualifying.length}/${rows.length}`, label: `Topics at ${YEAR8_TOPIC_PCT}%+` },
            { value: String(totals.skills), label: "Skills mastered" },
            { value: String(totals.solved), label: "Questions solved" },
            { value: String(totals.challenge), label: "Challenge problems solved" },
          ]}
        />
        {printTip}
        {topicCerts.length ? (
          <section className="no-print card p-4">
            <h2 className="section-title">Topic certificates</h2>
            <ul className="mt-2 flex flex-wrap gap-2">
              {topicCerts.map((r) => (
                <li key={r.s.id}>
                  <Link href={`/certificate/${r.s.id}`} className="btn btn-secondary btn-sm min-h-10">
                    <span aria-hidden>{r.s.icon}</span> {r.s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </div>
    );
  }

  const closest = ready
    .filter((r) => r.m.pct < YEAR8_TOPIC_PCT)
    .sort((a, b) => b.m.pct - a.m.pct)
    .slice(0, 3);
  const need = YEAR8_TOPICS_NEEDED - qualifying.length;
  return (
    <div className="space-y-5">
      <header>
        <span className="chip">🎓 Certificate of Achievement</span>
        <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">Year 8 Maths certificate</h1>
        <p className="mt-1 text-ink-2">
          Get any {YEAR8_TOPICS_NEEDED} of the {rows.length} topics to {YEAR8_TOPIC_PCT}% mastery or more to unlock a printable certificate for the whole year.
        </p>
      </header>

      <section className="card p-5" aria-label="Progress towards the Year 8 certificate">
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <div className="text-4xl font-black tabular-nums text-brand">
              {qualifying.length}
              <span className="text-xl text-ink-2"> / {YEAR8_TOPICS_NEEDED}</span>
            </div>
            <div className="text-sm text-ink-2">topics at {YEAR8_TOPIC_PCT}%+</div>
          </div>
          <div className="text-right text-sm font-extrabold">
            {need} more topic{need === 1 ? "" : "s"} to go
          </div>
        </div>
        <div className="mt-3">
          <Bar value={(100 * qualifying.length) / YEAR8_TOPICS_NEEDED} label="Topics at 60% or more" className="h-3" />
        </div>
        {ready.length < YEAR8_TOPICS_NEEDED ? (
          <p className="mt-3 text-sm text-ink-2">
            {ready.length} topic{ready.length === 1 ? " is" : "s are"} open so far — more are on the way.
          </p>
        ) : null}
      </section>

      {closest.length ? (
        <section aria-labelledby={`${nameId}-closest`}>
          <h2 id={`${nameId}-closest`} className="section-title">
            {closest.some((r) => r.m.started) ? `Closest to ${YEAR8_TOPIC_PCT}%` : "Good places to start"}
          </h2>
          <ul className="mt-2 grid gap-3 sm:grid-cols-3">
            {closest.map((r) => (
              <li key={r.s.id}>
                <Link href={`/topic/${r.s.id}`} className="card flex h-full flex-col p-4 hover:border-brand">
                  <div className="flex items-center gap-2 font-extrabold">
                    <span aria-hidden>{r.s.icon}</span>
                    {r.s.title}
                  </div>
                  <div className="mt-2 text-sm text-ink-2">
                    {r.m.pct}% · {YEAR8_TOPIC_PCT - r.m.pct} point{YEAR8_TOPIC_PCT - r.m.pct === 1 ? "" : "s"} to go
                  </div>
                  <div className="mt-2">
                    <Bar value={r.m.pct} target={YEAR8_TOPIC_PCT} label={`${r.s.title} mastery`} className="h-2" decorative />
                  </div>
                  <div className="mt-3 text-sm font-bold text-brand">{r.m.started ? "Keep going →" : "Start this topic →"}</div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <div>
        <h2 className="section-title">Every topic</h2>
        <p className="mt-1 text-sm text-ink-2">The line on each bar marks {YEAR8_TOPIC_PCT}%. Topics at {TOPIC_CERT_PCT}%+ also earn their own certificate (🏅).</p>
        <div className="mt-3">{topicList}</div>
      </div>
    </div>
  );
}
