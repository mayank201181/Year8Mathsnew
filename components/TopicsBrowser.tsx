"use client";
// All topics: strand filter, search (titles, hooks and lesson headings) and a
// grid of topic cards with the learner's mastery, plus a legend for the bar.
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import type { TopicSummary } from "@/lib/server/content";
import { STRANDS } from "@/lib/topics/meta";
import { TopicCard, STRAND_STYLES, strandStyle } from "./TopicCard";

const ALL = "all";

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[{}*`|_]/g, " ")
    .replace(/&/g, " and ")
    .replace(/\s+/g, " ");
}

interface Indexed {
  summary: TopicSummary;
  haystack: string;
  titleKey: string;
  sections: { id: string; heading: string; stretch: boolean; key: string }[];
}

interface Result {
  summary: TopicSummary;
  /** Lesson sections whose heading matches every search word. */
  sections: { id: string; heading: string; stretch: boolean }[];
}

// Mirrors the weighting in lib/mastery.ts (topicMastery).
const LEGEND = [
  { label: "Skills", weight: 45, text: "Practise the skill drills until they're Secure, then get them right in mixed practice to reach Mastered." },
  { label: "Questions", weight: 25, text: "Solve quiz and practice-paper questions — this part is full at 60 solved." },
  { label: "Lessons", weight: 15, text: "Mark each lesson section as understood." },
  { label: "Challenge", weight: 15, text: "Crack challenge problems — this part is full at 5 solved." },
] as const;

export function TopicsBrowser({ summaries }: { summaries: TopicSummary[] }) {
  // The strand filter lives in the URL (/topics?strand=algebra) so it can be linked and survives reloads.
  const params = useSearchParams();
  const urlSlug = params?.get("strand") ?? "";
  const urlStrand = STRANDS.find((s) => STRAND_STYLES[s]?.slug === urlSlug) ?? ALL;
  /** Only used if the History API is unavailable. */
  const [localStrand, setLocalStrand] = useState<string | null>(null);
  const strand = localStrand ?? urlStrand;
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  function chooseStrand(next: string) {
    try {
      const url = new URL(window.location.href);
      if (next === ALL) url.searchParams.delete("strand");
      else url.searchParams.set("strand", strandStyle(next).slug);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
      setLocalStrand(null);
    } catch {
      setLocalStrand(next);
    }
  }

  // "/" focuses the search box (unless already typing somewhere).
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      searchRef.current?.focus();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const index = useMemo<Indexed[]>(
    () =>
      summaries.map((s) => ({
        summary: s,
        haystack: norm([s.title, s.summary, s.strand, ...s.sections.map((x) => x.heading)].join(" | ")),
        titleKey: norm(s.title),
        sections: s.sections.map((x) => ({ ...x, key: norm(x.heading) })),
      })),
    [summaries],
  );

  const counts = useMemo(() => {
    const c: Record<string, number> = { [ALL]: summaries.length };
    for (const s of summaries) c[s.strand] = (c[s.strand] ?? 0) + 1;
    return c;
  }, [summaries]);

  const terms = useMemo(() => norm(query).trim().split(" ").filter(Boolean), [query]);

  const results = useMemo<Result[]>(() => {
    const out: Result[] = [];
    for (const it of index) {
      if (strand !== ALL && it.summary.strand !== strand) continue;
      if (terms.length && !terms.every((t) => it.haystack.includes(t))) continue;
      const titleHit = terms.length > 0 && terms.every((t) => it.titleKey.includes(t));
      const sections = terms.length && !titleHit ? it.sections.filter((x) => terms.every((t) => x.key.includes(t))).slice(0, 3) : [];
      out.push({ summary: it.summary, sections });
    }
    return out;
  }, [index, strand, terms]);

  const filtered = strand !== ALL || terms.length > 0;
  const strandCount = STRANDS.filter((s) => counts[s]).length;
  const comingSoon = summaries.filter((s) => !s.ready).length;

  function reset() {
    setQuery("");
    chooseStrand(ALL);
    searchRef.current?.focus();
  }

  const chips = [ALL, ...STRANDS.filter((s) => counts[s])];

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-black tracking-tight sm:text-3xl">All topics</h1>
        <p className="mt-1 text-ink-2">
          {summaries.length} topics across {strandCount} strands{comingSoon > 0 ? ` (${comingSoon} coming soon)` : ""}. Open one for its lessons, practice questions, skill drills and challenge problems.
        </p>
      </header>

      {/* ------------------------------------------------ search + filters */}
      <div className="space-y-3">
        <div className="relative">
          <label htmlFor="topic-search" className="sr-only">
            Search topics and lessons
          </label>
          <span aria-hidden className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-2">
            🔍
          </span>
          <input
            ref={searchRef}
            id="topic-search"
            type="search"
            inputMode="search"
            autoComplete="off"
            spellCheck={false}
            className="input pl-10 pr-12"
            placeholder="Search, e.g. “percentages” or “bearings”"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape" && query) {
                e.preventDefault();
                setQuery("");
              }
            }}
            aria-describedby="topic-results"
          />
          <span aria-hidden className="kbd pointer-events-none absolute right-2 top-1/2 hidden h-7 min-w-7 -translate-y-1/2 text-xs text-ink-2 md:inline-flex">
            /
          </span>
        </div>

        <div role="group" aria-label="Filter by strand" className="nav-scroll -mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {chips.map((s) => {
            const on = strand === s;
            const st = s === ALL ? null : strandStyle(s);
            return (
              <button
                key={s}
                type="button"
                aria-pressed={on}
                onClick={() => chooseStrand(s)}
                className={`inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full border px-3.5 text-sm font-bold transition-colors ${
                  on ? "border-transparent bg-brand text-brand-ink" : "border-line bg-surface text-ink hover:bg-surface-2"
                }`}
              >
                {st ? <span aria-hidden className={`h-2.5 w-2.5 rounded-full ${st.bg} ${on ? "ring-2 ring-brand-ink/70" : ""}`} /> : null}
                {s === ALL ? "All" : s}
                <span className={`tabular-nums ${on ? "opacity-80" : "text-ink-2"}`}>
                  <span className="sr-only">, </span>
                  {counts[s] ?? 0}
                  <span className="sr-only"> topics</span>
                </span>
              </button>
            );
          })}
        </div>

        <p id="topic-results" className="text-sm text-ink-2" aria-live="polite" aria-atomic="true">
          {filtered ? `Showing ${results.length} of ${summaries.length} topics` : `${summaries.length} topics`}
          {terms.length ? ` matching “${query.trim()}”` : ""}
          {strand !== ALL ? ` in ${strand}` : ""}
        </p>
      </div>

      {/* ------------------------------------------------ grid */}
      {results.length > 0 ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {results.map(({ summary, sections }) => (
            <TopicCard key={summary.id} summary={summary} headingLevel={2}>
              {summary.ready && sections.length > 0 ? (
                <div className="border-t border-line pt-2">
                  <p className="text-xs font-bold text-ink-2">Matching lessons</p>
                  <ul className="mt-1 space-y-0.5">
                    {sections.map((x) => (
                      <li key={x.id}>
                        <Link href={`/topic/${summary.id}?tab=learn#sec-${x.id}`} className="inline-flex min-h-10 items-center text-sm font-semibold text-brand hover:underline">
                          {x.heading}
                          {x.stretch ? <span className="ml-1.5 text-xs font-bold text-ink-2">(stretch)</span> : null}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </TopicCard>
          ))}
        </div>
      ) : (
        <div className="card flex flex-col items-center gap-2 p-8 text-center">
          <span aria-hidden className="text-4xl">
            🔍
          </span>
          <p className="font-extrabold">No topics match{terms.length ? ` “${query.trim()}”` : ""}</p>
          <p className="text-sm text-ink-2">Try a shorter word, a different spelling, or another strand.</p>
          <button type="button" className="btn btn-secondary mt-2" onClick={reset}>
            Clear search and filters
          </button>
        </div>
      )}

      {/* ------------------------------------------------ legend */}
      <section aria-labelledby="legend-h" className="card p-4 sm:p-5">
        <h2 id="legend-h" className="font-extrabold">
          How the mastery bar fills
        </h2>
        <p className="mt-1 text-sm text-ink-2">
          The label under each bar reads like <span className="whitespace-nowrap font-semibold text-ink">42% · 3/7 lessons · 2 skills secure</span>: your overall score, the lesson
          sections you&apos;ve marked as understood, and the skills that are Secure or Mastered. The 100% is made up of:
        </p>
        <ul className="mt-3 grid gap-x-6 gap-y-3 text-sm sm:grid-cols-2">
          {LEGEND.map((l) => (
            <li key={l.label}>
              <div className="flex items-center gap-2">
                <strong className="w-24 shrink-0 font-extrabold">{l.label}</strong>
                <span aria-hidden className="h-2 flex-1 overflow-hidden rounded-full bg-line/60">
                  <span className="block h-full rounded-full bg-brand" style={{ width: `${(100 * l.weight) / 45}%` }} />
                </span>
                <span className="w-10 shrink-0 text-right font-bold tabular-nums">{l.weight}%</span>
              </div>
              <p className="mt-0.5 text-ink-2">{l.text}</p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
