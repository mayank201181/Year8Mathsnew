"use client";
// All topics: strand filter, search (titles, hooks and lesson headings) and a
// grid of topic cards with the learner's mastery, plus a legend for the bar.
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { TopicSummary } from "@/lib/server/content";
import { STRANDS } from "@/lib/topics/meta";
import { TopicCard, STRAND_STYLES, strandStyle } from "./TopicCard";

const ALL = "all";

function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[{}*`|_]/g, " ")
    .replace(/&/g, " and ")
    .replace(/\s+/g, " ");
}

interface Indexed {
  summary: TopicSummary;
  haystack: string;
  sections: { id: string; heading: string; stretch: boolean; key: string }[];
}

interface Result {
  summary: TopicSummary;
  /** Lesson sections whose heading matches every search word. */
  sections: { id: string; heading: string; stretch: boolean }[];
}

const LEGEND = [
  { label: "Lessons", weight: 15, bar: "bg-info", text: "Mark each lesson section as understood." },
  { label: "Skills", weight: 45, bar: "bg-brand", text: "Practise skill drills until they're Secure — then Mastered in mixed practice." },
  { label: "Questions", weight: 25, bar: "bg-good", text: "Solve quiz and practice-paper questions (full marks at 60)." },
  { label: "Challenge", weight: 15, bar: "bg-accent", text: "Crack challenge problems (full marks at 5)." },
] as const;

export function TopicsBrowser({ summaries }: { summaries: TopicSummary[] }) {
  const [strand, setStrand] = useState<string>(ALL);
  const [query, setQuery] = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  // Deep link: /topics?strand=algebra (read after mount; kept in sync below).
  useEffect(() => {
    try {
      const slug = new URLSearchParams(window.location.search).get("strand");
      const match = STRANDS.find((s) => STRAND_STYLES[s]?.slug === slug);
      if (match) setStrand(match);
    } catch {
      /* ignore malformed URLs */
    }
  }, []);

  function chooseStrand(next: string) {
    setStrand(next);
    try {
      const url = new URL(window.location.href);
      if (next === ALL) url.searchParams.delete("strand");
      else url.searchParams.set("strand", strandStyle(next).slug);
      window.history.replaceState(null, "", `${url.pathname}${url.search}${url.hash}`);
    } catch {
      /* history unavailable — the filter still works */
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
      const titleHit = terms.length > 0 && terms.every((t) => norm(it.summary.title).includes(t));
      const sections = terms.length && !titleHit ? it.sections.filter((x) => terms.every((t) => x.key.includes(t))).slice(0, 3) : [];
      out.push({ summary: it.summary, sections });
    }
    return out;
  }, [index, strand, terms]);

  const filtered = strand !== ALL || terms.length > 0;
  const readyCount = summaries.filter((s) => s.ready).length;

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
          {readyCount} topics across five strands. Each one has a lesson, practice questions, skill drills and challenge problems.
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
                <span className={`tabular-nums ${on ? "opacity-80" : "text-ink-2"}`}>{counts[s] ?? 0}</span>
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
                        <Link href={`/topic/${summary.id}?tab=learn#sec-${x.id}`} className="inline-flex min-h-8 items-center text-sm font-semibold text-brand hover:underline">
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
          Each topic&apos;s bar blends four things. The label underneath shows your overall score, lessons understood and skills that are Secure or better.
        </p>
        <div aria-hidden className="mt-3 flex h-2.5 gap-0.5 overflow-hidden rounded-full">
          {LEGEND.map((l) => (
            <span key={l.label} className={l.bar} style={{ width: `${l.weight}%` }} />
          ))}
        </div>
        <ul className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-2">
          {LEGEND.map((l) => (
            <li key={l.label} className="flex items-start gap-2">
              <span aria-hidden className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full ${l.bar}`} />
              <span>
                <strong className="font-extrabold">
                  {l.label} · {l.weight}%
                </strong>{" "}
                <span className="text-ink-2">— {l.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
