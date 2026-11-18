"use client";
import { useMemo, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { TopicCramPack } from "@/lib/cram";
import { Rich, RichInline } from "./Rich";

type SectionFilter = "all" | "mistakes" | "mustknow" | "myths" | "tricks" | "facts";

const SEL_EVENT = "y8cram-sel-change";
const CHECK_EVENT = "y8cram-check-change";

function subscribeEvent(evName: string, cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", cb);
  window.addEventListener(evName, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(evName, cb);
  };
}

function readLocal(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeLocal(key: string, val: string, evName: string) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, val);
    window.dispatchEvent(new Event(evName));
  } catch {
    // ignore quota errors
  }
}

export function CramSheet({
  packs,
  singleTopicMode = false,
  subjectLabel = "Year 8",
  onPractise,
}: {
  packs: TopicCramPack[];
  singleTopicMode?: boolean;
  subjectLabel?: string;
  onPractise?: () => void;
}) {
  const params = useSearchParams();
  const urlTopicsParam = params.get("topics");

  const storageKey = `y8cram:selected:${subjectLabel.toLowerCase().replace(/\s+/g, "-")}`;
  const rawSaved = useSyncExternalStore(
    (cb) => subscribeEvent(SEL_EVENT, cb),
    () => readLocal(storageKey, ""),
    () => ""
  );

  const rawChecks = useSyncExternalStore(
    (cb) => subscribeEvent(CHECK_EVENT, cb),
    () => readLocal("y8cram:mustknow:v1", "{}"),
    () => "{}"
  );

  const checkedMap = useMemo(() => {
    try {
      return JSON.parse(rawChecks) as Record<string, boolean>;
    } catch {
      return {};
    }
  }, [rawChecks]);

  const [urlOverrideUsed, setUrlOverrideUsed] = useState(false);
  const [sectionFilter, setSectionFilter] = useState<SectionFilter>("all");
  const [query, setQuery] = useState("");

  const allIds = useMemo(() => packs.map((p) => p.id), [packs]);

  const selectedIds: Set<string> = useMemo(() => {
    if (singleTopicMode) return new Set(allIds);
    if (urlTopicsParam && !urlOverrideUsed) {
      const fromUrl = urlTopicsParam
        .split(",")
        .map((s) => s.trim())
        .filter((id) => allIds.includes(id));
      if (fromUrl.length) return new Set(fromUrl);
    }
    if (rawSaved) {
      try {
        const parsed = JSON.parse(rawSaved) as string[];
        const valid = parsed.filter((id) => allIds.includes(id));
        if (valid.length) return new Set(valid);
      } catch {
        // ignore
      }
    }
    return new Set(allIds);
  }, [singleTopicMode, allIds, urlTopicsParam, urlOverrideUsed, rawSaved]);

  const updateSelection = (next: Set<string>) => {
    setUrlOverrideUsed(true);
    writeLocal(storageKey, JSON.stringify(Array.from(next)), SEL_EVENT);
  };

  const toggleTopic = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      if (next.size > 1) next.delete(id);
    } else {
      next.add(id);
    }
    updateSelection(next);
  };

  const selectStrand = (strand: string) => {
    const strandIds = packs.filter((p) => p.strand === strand).map((p) => p.id);
    const allIn = strandIds.every((id) => selectedIds.has(id));
    if (allIn && selectedIds.size > strandIds.length) {
      const next = new Set(selectedIds);
      strandIds.forEach((id) => next.delete(id));
      updateSelection(next);
    } else {
      updateSelection(new Set(strandIds));
    }
  };

  const toggleMustKnow = (key: string) => {
    const next = { ...checkedMap, [key]: !checkedMap[key] };
    writeLocal("y8cram:mustknow:v1", JSON.stringify(next), CHECK_EVENT);
  };

  const strands = useMemo(() => Array.from(new Set(packs.map((p) => p.strand).filter(Boolean))), [packs]);

  const qNorm = query.trim().toLowerCase();
  const visiblePacks = useMemo(() => {
    return packs.filter((p) => {
      if (!selectedIds.has(p.id)) return false;
      if (!qNorm) return true;
      const hay = [
        p.title,
        p.strand,
        ...p.examMistakes,
        ...p.mustKnow,
        ...p.misconceptions.flatMap((m) => [m.wrong, m.right]),
        ...p.mnemonics.flatMap((m) => [m.topic, m.device, m.explanation]),
        ...p.keyFacts.flatMap((f) => [f.name, f.value]),
        ...p.questionTraps.flatMap((t) => [t.question, t.commonError]),
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(qNorm);
    });
  }, [packs, selectedIds, qNorm]);

  const totalMistakes = visiblePacks.reduce((s, p) => s + p.examMistakes.length + p.questionTraps.length, 0);
  const totalMustKnow = visiblePacks.reduce((s, p) => s + p.mustKnow.length, 0);

  return (
    <div className="space-y-6 pb-8">
      {!singleTopicMode ? (
        <header className="card space-y-4 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <div className="flex flex-wrap gap-2">
                <span className="chip border-0 bg-bad-soft text-bad">
                  🚨 {totalMistakes} Exam Traps &amp; Mark-Losers
                </span>
                <span className="chip border-0 bg-good-soft text-good">
                  ✅ {totalMustKnow} Exam Must-Knows
                </span>
              </div>
              <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                {subjectLabel} — Custom Exam Cram Sheet
              </h1>
              <p className="mt-1 text-sm text-ink-2">
                Have a school test on just 3 or 4 topics? Tick <strong>only the topics in your test</strong> below — your custom cram sheet updates instantly and saves on this iPad!
              </p>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              className="no-print btn btn-secondary btn-sm shrink-0"
            >
              🖨️ Print / Save PDF
            </button>
          </div>

          {/* Topic Selector for 3-4 Topic Tests */}
          <div className="no-print space-y-3 rounded-2xl border border-line bg-surface-2/60 p-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-extrabold uppercase tracking-wider text-ink-2">
                1. Pick Topics in Your Upcoming Test ({selectedIds.size} of {packs.length} selected)
              </span>
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => updateSelection(new Set(allIds))}
                  className="rounded-lg bg-surface px-2.5 py-1 text-xs font-bold hover:bg-brand-soft hover:text-brand"
                >
                  Select all ({packs.length})
                </button>
                <button
                  type="button"
                  onClick={() => updateSelection(new Set([allIds[0]]))}
                  className="rounded-lg bg-surface px-2.5 py-1 text-xs font-bold hover:bg-brand-soft hover:text-brand"
                >
                  Clear to 1st
                </button>
                {strands.map((st) => (
                  <button
                    key={st}
                    type="button"
                    onClick={() => selectStrand(st)}
                    className="rounded-lg bg-surface px-2.5 py-1 text-xs font-bold text-brand hover:bg-brand-soft"
                  >
                    Only {st}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {packs.map((p) => {
                const active = selectedIds.has(p.id);
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => toggleTopic(p.id)}
                    className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-bold transition-all ${
                      active
                        ? "border-brand bg-brand text-white shadow-sm"
                        : "border-line bg-surface text-ink-2 hover:border-brand/50 hover:text-ink"
                    }`}
                  >
                    <span aria-hidden>{p.icon}</span>
                    <span>{p.title}</span>
                    {active ? <span aria-hidden>✓</span> : null}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section Filter + Search */}
          <div className="no-print flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-1.5">
              {(
                [
                  ["all", "All Exam Notes"],
                  ["mistakes", "⚠️ What Loses Marks"],
                  ["mustknow", "✅ What Earns Marks"],
                  ["myths", "🕵️ Myth vs Fact"],
                  ["tricks", "🧩 Memory Tricks"],
                  ["facts", "📖 Key Terms & Facts"],
                ] as [SectionFilter, string][]
              ).map(([id, label]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setSectionFilter(id)}
                  className={`rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                    sectionFilter === id ? "bg-brand text-white" : "bg-surface-2 text-ink-2 hover:text-ink"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Filter keywords across selected topics…"
              className="w-full rounded-xl border border-line bg-surface px-3 py-1.5 text-sm sm:w-64"
            />
          </div>
        </header>
      ) : (
        <div className="card flex flex-wrap items-center justify-between gap-3 p-4">
          <div>
            <div className="text-xs font-extrabold uppercase tracking-wider text-bad">
              🚨 Rapid Pre-Test Cram &amp; Mark-Saver Sheet
            </div>
            <p className="text-sm text-ink-2">
              Everything examiners reward — and every trap that loses easy marks in <strong>{packs[0]?.title}</strong>.
            </p>
          </div>
          <div className="no-print flex flex-wrap gap-2">
            <Link href={`/cram?topics=${packs[0]?.id ?? ""}`} className="btn btn-secondary btn-sm">
              ➕ Combine 3–4 Topics for a Test
            </Link>
            <button type="button" onClick={() => window.print()} className="btn btn-ghost btn-sm">
              🖨️ Print
            </button>
          </div>
        </div>
      )}

      {/* Per-Topic Cram Cards */}
      <div className="space-y-8">
        {visiblePacks.map((pack) => (
          <article key={pack.id} className="card space-y-6 overflow-hidden p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4">
              <div className="flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-soft text-2xl" aria-hidden>
                  {pack.icon}
                </span>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-brand">{pack.strand}</span>
                  <h2 className="text-xl font-black sm:text-2xl">{pack.title}</h2>
                </div>
              </div>
              <div className="no-print flex flex-wrap gap-2">
                {!singleTopicMode ? (
                  <Link href={`/topic/${pack.id}?tab=learn`} className="btn btn-ghost btn-sm">
                    📖 Full Guide
                  </Link>
                ) : null}
                {onPractise ? (
                  <button type="button" onClick={onPractise} className="btn btn-primary btn-sm">
                    ✏️ Practise Questions
                  </button>
                ) : (
                  <Link href={`/topic/${pack.id}?tab=practise`} className="btn btn-primary btn-sm">
                    ✏️ Practise Questions
                  </Link>
                )}
              </div>
            </div>

            {/* 1. WHAT LOSES MARKS IN EXAMS */}
            {(sectionFilter === "all" || sectionFilter === "mistakes") &&
            (pack.examMistakes.length > 0 || pack.questionTraps.length > 0) ? (
              <section className="space-y-3">
                <h3 className="flex items-center gap-2 text-base font-black text-bad">
                  <span aria-hidden>⚠️</span> What Loses Marks in Exams (Avoid These Traps!)
                </h3>
                {pack.examMistakes.length > 0 ? (
                  <ul className="grid gap-2.5 sm:grid-cols-2">
                    {pack.examMistakes.map((m, i) => (
                      <li key={i} className="flex items-start gap-2.5 rounded-xl border border-bad/25 bg-bad-soft p-3 text-sm">
                        <span className="mt-0.5 shrink-0 font-black text-bad" aria-hidden>✗</span>
                        <span className="min-w-0 flex-1">
                          <RichInline text={m} />
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {pack.questionTraps.length > 0 ? (
                  <div className="space-y-2 pt-1">
                    <div className="text-xs font-extrabold uppercase tracking-wider text-warn">
                      🪤 Real Exam-Question Mark Losers from Practice Papers
                    </div>
                    <div className="grid gap-2.5 sm:grid-cols-2">
                      {pack.questionTraps.map((qt, i) => (
                        <div key={i} className="rounded-xl border border-line bg-surface-2/70 p-3 text-xs">
                          <div className="font-bold text-ink-2">
                            When asked: <RichInline text={qt.question} />
                          </div>
                          <div className="mt-1 font-semibold text-bad">
                            ⚠️ Marks lost if: <RichInline text={qt.commonError} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : null}
              </section>
            ) : null}

            {/* 2. WHAT EARNS MARKS IN EXAMS (MUST-KNOW CHECKLIST) */}
            {(sectionFilter === "all" || sectionFilter === "mustknow") && pack.mustKnow.length > 0 ? (
              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-base font-black text-good">
                  <span aria-hidden>✅</span> What Examiners Award Marks For (&ldquo;Can You…?&rdquo;)
                </h3>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {pack.mustKnow.map((mk, i) => {
                    const ck = `${pack.id}:${i}`;
                    const isDone = !!checkedMap[ck];
                    return (
                      <li key={i}>
                        <label className="flex cursor-pointer items-start gap-2.5 rounded-xl border border-line bg-surface p-3 text-sm hover:bg-surface-2 has-checked:border-good/40 has-checked:bg-good-soft">
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => toggleMustKnow(ck)}
                            className="mt-0.5 h-4 w-4 shrink-0 accent-good"
                          />
                          <span className="min-w-0 flex-1">
                            <RichInline text={mk} />
                          </span>
                        </label>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ) : null}

            {/* 3. MYTH VS REALITY */}
            {(sectionFilter === "all" || sectionFilter === "myths") && pack.misconceptions.length > 0 ? (
              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-base font-black">
                  <span aria-hidden>🕵️</span> Don&apos;t Write This → Write This Instead
                </h3>
                <div className="space-y-2.5">
                  {pack.misconceptions.map((m, i) => (
                    <div key={i} className="grid overflow-hidden rounded-xl border border-line sm:grid-cols-2">
                      <div className="bg-bad-soft p-3 text-sm">
                        <div className="text-[11px] font-black uppercase tracking-wider text-bad">✗ Loses the mark</div>
                        <p className="mt-0.5">
                          <RichInline text={m.wrong} />
                        </p>
                      </div>
                      <div className="bg-good-soft p-3 text-sm">
                        <div className="text-[11px] font-black uppercase tracking-wider text-good">✓ Earns the mark</div>
                        <p className="mt-0.5 font-semibold">
                          <RichInline text={m.right} />
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* 4. MEMORY TRICKS */}
            {(sectionFilter === "all" || sectionFilter === "tricks") && pack.mnemonics.length > 0 ? (
              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-base font-black">
                  <span aria-hidden>🧩</span> Exam Memory Tricks &amp; Mnemonics
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {pack.mnemonics.map((m, i) => (
                    <div key={i} className="rounded-xl border border-line bg-accent-soft/40 p-3.5 text-sm">
                      <div className="text-xs font-bold text-ink-2">
                        <RichInline text={m.topic} />
                      </div>
                      <div className="my-1 text-base font-black text-brand">
                        &ldquo;<RichInline text={m.device} />&rdquo;
                      </div>
                      <div className="text-xs text-ink-2">
                        <RichInline text={m.explanation} />
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {/* 5. KEY TERMS / FORMULAS */}
            {(sectionFilter === "all" || sectionFilter === "facts") && pack.keyFacts.length > 0 ? (
              <section className="space-y-2.5">
                <h3 className="flex items-center gap-2 text-base font-black">
                  <span aria-hidden>📖</span> Must-Memorise Definitions &amp; Formulas
                </h3>
                <div className="grid gap-2.5 sm:grid-cols-2">
                  {pack.keyFacts.map((f, i) => (
                    <div key={i} className="rounded-xl border border-line bg-surface p-3 text-sm">
                      <div className="text-xs font-extrabold text-brand">
                        <RichInline text={f.name} />
                      </div>
                      <Rich text={f.value} className="mt-0.5 text-sm font-semibold" />
                      {f.note ? (
                        <p className="mt-0.5 text-xs text-ink-2">
                          <RichInline text={f.note} />
                        </p>
                      ) : null}
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
