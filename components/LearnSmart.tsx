"use client";
// The Revise tab: flashcards, a "Can you…?" checklist, formulas, myth vs fact,
// exam mistakes, memory tricks, real-world links and videos.
import { useCallback, useId, useMemo, useState, useSyncExternalStore, type KeyboardEvent, type ReactNode } from "react";
import type { Flashcard, LearnSmart as LearnSmartData, Topic } from "@/lib/types";
import { Rich, RichInline } from "./Rich";

// ---------------------------------------------------------------------------
// Flashcards
// ---------------------------------------------------------------------------

type Mark = "got" | "not";

function shuffled(ids: number[]): number[] {
  const a = [...ids];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const FACE_STYLE = { backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" } as const;

function Flashcards({ cards }: { cards: Flashcard[] }) {
  const all = useMemo(() => cards.map((_, i) => i), [cards]);
  const [order, setOrder] = useState<number[]>(all);
  const [pos, setPos] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [marks, setMarks] = useState<Record<number, Mark>>({});
  const hintId = useId();

  const total = order.length;
  const finished = pos >= total;
  const idx = order[Math.min(pos, total - 1)];
  const card = cards[idx];
  const got = order.filter((i) => marks[i] === "got").length;
  const notYet = order.filter((i) => marks[i] === "not");

  const go = useCallback(
    (n: number) => {
      setPos(Math.max(0, Math.min(total - 1, n)));
      setFlipped(false);
    },
    [total],
  );

  function mark(m: Mark) {
    setMarks((cur) => ({ ...cur, [idx]: m }));
    setFlipped(false);
    setPos((p) => p + 1);
  }

  function restart(next: number[]) {
    setOrder(next);
    setPos(0);
    setMarks({});
    setFlipped(false);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === " " || e.key === "Enter") {
      e.preventDefault();
      setFlipped((f) => !f);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(pos + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(pos - 1);
    }
  }

  if (!total || !card) return null;

  if (finished) {
    return (
      <div className="card p-5 text-center" role="status" aria-live="polite">
        <div className="text-sm font-bold text-ink-2">Round complete</div>
        <div className="mt-1 text-4xl font-black text-brand">
          {got}/{total}
        </div>
        <p className="mt-1 text-ink-2">
          {notYet.length === 0
            ? "You knew every card. Lovely work — try the quick check next."
            : `${notYet.length} card${notYet.length === 1 ? "" : "s"} to come back to. A second look now makes them stick.`}
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {notYet.length ? (
            <button type="button" className="btn btn-primary" onClick={() => restart(notYet)}>
              Practise the {notYet.length} “not yet” card{notYet.length === 1 ? "" : "s"}
            </button>
          ) : null}
          <button type="button" className="btn btn-secondary" onClick={() => restart(all)}>
            Start again
          </button>
          <button type="button" className="btn btn-ghost" onClick={() => restart(shuffled(all))}>
            🔀 Shuffle all
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
        <span className="font-bold text-ink-2">
          Card {pos + 1} of {total}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="chip border-0 bg-good-soft text-good" title="Got it this round">
            ✓ {got}
          </span>
          <span className="chip border-0 bg-bad-soft text-bad" title="Not yet this round">
            ✗ {notYet.length}
          </span>
        </span>
      </div>

      <div style={{ perspective: "1200px" }}>
        <div
          role="button"
          tabIndex={0}
          aria-describedby={hintId}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={onKey}
          className="grid cursor-pointer select-none rounded-2xl transition-transform duration-500 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand motion-reduce:transition-none"
          style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "none" }}
        >
          <div
            className="card flex min-h-52 flex-col items-center justify-center p-6 text-center [grid-area:1/1]"
            style={FACE_STYLE}
            aria-hidden={flipped}
          >
            <div className="text-xs font-black uppercase tracking-wider text-ink-2">Question</div>
            <Rich text={card.front} className="mt-2 text-lg font-bold sm:text-xl" />
            <div className="mt-3 text-xs text-ink-2" aria-hidden>
              Tap to flip
            </div>
          </div>
          <div
            className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-brand/30 bg-brand-soft p-6 text-center [grid-area:1/1]"
            style={{ ...FACE_STYLE, transform: "rotateY(180deg)" }}
            aria-hidden={!flipped}
          >
            <div className="text-xs font-black uppercase tracking-wider text-brand">Answer</div>
            <Rich text={card.back} className="mt-2 text-lg font-semibold sm:text-xl" />
          </div>
        </div>
      </div>
      <p id={hintId} className="sr-only">
        Press Space or Enter to flip the card. Use the left and right arrow keys to move between cards.
      </p>
      <p className="sr-only" aria-live="polite">
        {flipped ? "Showing the answer." : `Card ${pos + 1} of ${total}, showing the question.`}
      </p>

      {flipped ? (
        <div className="grid grid-cols-2 gap-2">
          <button type="button" className="btn border-bad/30 bg-bad-soft text-bad" onClick={() => mark("not")}>
            ✗ Not yet
          </button>
          <button type="button" className="btn border-good/30 bg-good-soft text-good" onClick={() => mark("got")}>
            ✓ Got it
          </button>
        </div>
      ) : (
        <button type="button" className="btn btn-primary w-full" onClick={() => setFlipped(true)}>
          Answer it in your head, then flip
        </button>
      )}

      <div className="flex items-center justify-between gap-2">
        <button type="button" className="btn btn-ghost btn-sm min-h-10" onClick={() => go(pos - 1)} disabled={pos === 0}>
          ← Prev
        </button>
        <button type="button" className="btn btn-ghost btn-sm min-h-10" onClick={() => restart(shuffled(order))} disabled={total < 2}>
          🔀 Shuffle
        </button>
        <button type="button" className="btn btn-ghost btn-sm min-h-10" onClick={() => go(pos + 1)} disabled={pos >= total - 1}>
          Next →
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// "Can you…?" checklist — saved per device in localStorage.
// ---------------------------------------------------------------------------

const MUSTKNOW_EVENT = "y8m2:mustknow-change";
/** Fallback when storage is blocked (private mode etc.), so ticks still work this session. */
const memoryStore = new Map<string, string>();

function subscribeMustKnow(cb: () => void) {
  window.addEventListener("storage", cb);
  window.addEventListener(MUSTKNOW_EVENT, cb);
  return () => {
    window.removeEventListener("storage", cb);
    window.removeEventListener(MUSTKNOW_EVENT, cb);
  };
}

function readStored(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? memoryStore.get(key) ?? "";
  } catch {
    return memoryStore.get(key) ?? "";
  }
}

function writeStored(key: string, value: string) {
  memoryStore.set(key, value);
  try {
    window.localStorage.setItem(key, value);
  } catch {
    /* storage unavailable — the in-memory copy keeps this session working */
  }
  window.dispatchEvent(new Event(MUSTKNOW_EVENT));
}

function MustKnow({ topicId, items }: { topicId: string; items: string[] }) {
  const key = `y8m2:mustknow:${topicId}`;
  const raw = useSyncExternalStore(
    subscribeMustKnow,
    () => readStored(key),
    () => "",
  );
  const checked = useMemo(() => {
    try {
      const v: unknown = JSON.parse(raw || "[]");
      return new Set(Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : []);
    } catch {
      return new Set<string>();
    }
  }, [raw]);
  const done = items.filter((it) => checked.has(it)).length;

  function toggle(item: string) {
    const next = new Set(checked);
    if (next.has(item)) next.delete(item);
    else next.add(item);
    writeStored(key, JSON.stringify(items.filter((it) => next.has(it))));
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-2" aria-hidden>
          <div className="h-full rounded-full bg-good transition-[width] duration-300" style={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }} />
        </div>
        <span className="text-sm font-bold text-ink-2" aria-live="polite">
          {done} of {items.length}
        </span>
      </div>
      <ul className="mt-3 space-y-1">
        {items.map((it, i) => (
          <li key={i}>
            <label className="flex min-h-11 cursor-pointer items-start gap-3 rounded-xl px-3 py-2.5 hover:bg-surface-2 has-checked:bg-good-soft">
              <input type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-good" checked={checked.has(it)} onChange={() => toggle(it)} />
              <span className="min-w-0 flex-1">
                <RichInline text={it} />
              </span>
            </label>
          </li>
        ))}
      </ul>
      <p className="mt-2 text-xs text-ink-2">Ticks are saved on this device. Be honest — an unticked line tells you exactly what to revise.</p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Layout helpers
// ---------------------------------------------------------------------------

function Block({ id, icon, title, intro, children }: { id: string; icon: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-32">
      <h2 id={`${id}-h`} className="section-title">
        <span aria-hidden>{icon}</span> {title}
      </h2>
      {intro ? <p className="mt-0.5 text-sm text-ink-2">{intro}</p> : null}
      <div className="mt-3">{children}</div>
    </section>
  );
}

const isWebUrl = (u: string) => /^https?:\/\//i.test(u);

const EMPTY: LearnSmartData = { flashcards: [], mustKnow: [], misconceptions: [], examMistakes: [], mnemonics: [], realWorld: [], videos: [], formulas: [] };

// ---------------------------------------------------------------------------
// The Revise tab
// ---------------------------------------------------------------------------

export function LearnSmart({ topic }: { topic: Topic }) {
  const L = { ...EMPTY, ...(topic.learn ?? {}) };
  const flashcards = L.flashcards ?? [];
  const mustKnow = L.mustKnow ?? [];
  const formulas = L.formulas ?? [];
  const myths = L.misconceptions ?? [];
  const mistakes = L.examMistakes ?? [];
  const mnemonics = L.mnemonics ?? [];
  const realWorld = L.realWorld ?? [];
  const videos = (L.videos ?? []).filter((v) => isWebUrl(v.url));

  const nav = [
    { id: "rv-cards", label: "Flashcards", show: flashcards.length > 0 },
    { id: "rv-canyou", label: "Can you…?", show: mustKnow.length > 0 },
    { id: "rv-formulas", label: "Formulas", show: formulas.length > 0 },
    { id: "rv-myths", label: "Myth vs fact", show: myths.length > 0 },
    { id: "rv-mistakes", label: "Exam mistakes", show: mistakes.length > 0 },
    { id: "rv-tricks", label: "Memory tricks", show: mnemonics.length > 0 },
    { id: "rv-real", label: "Real world", show: realWorld.length > 0 },
    { id: "rv-videos", label: "Videos", show: videos.length > 0 },
  ].filter((n) => n.show);

  if (!nav.length) {
    return (
      <div className="card p-6 text-center text-ink-2">
        <div className="text-4xl" aria-hidden>
          🧠
        </div>
        <p className="mt-2">Revision cards for this topic are on their way. Use the Learn and Practise tabs for now.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <nav aria-label="Revision sections" className="nav-scroll -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
        {nav.map((n) => (
          <a key={n.id} href={`#${n.id}`} className="chip shrink-0 whitespace-nowrap px-3 py-1.5 text-sm hover:bg-brand-soft hover:text-brand">
            {n.label}
          </a>
        ))}
      </nav>

      {flashcards.length ? (
        <Block id="rv-cards" icon="🃏" title="Flashcards" intro="Say the answer before you flip. Mark each card honestly — the “not yet” pile is your revision list.">
          <div className="mx-auto max-w-xl">
            <Flashcards key={topic.id} cards={flashcards} />
          </div>
        </Block>
      ) : null}

      {mustKnow.length ? (
        <Block id="rv-canyou" icon="✅" title="Can you…?" intro="Tick each one you could do in a test without looking anything up.">
          <div className="card p-3 sm:p-4">
            <MustKnow topicId={topic.id} items={mustKnow} />
          </div>
        </Block>
      ) : null}

      {formulas.length ? (
        <Block id="rv-formulas" icon="📐" title="Formulas & key facts">
          <ul className="grid gap-3 sm:grid-cols-2">
            {formulas.map((f, i) => (
              <li key={i} className="card p-4">
                <div className="text-sm font-bold text-ink-2">
                  <RichInline text={f.name} />
                </div>
                <Rich text={f.formula} className="mt-1 text-lg font-semibold" />
                {f.note ? (
                  <p className="mt-1 text-sm text-ink-2">
                    <RichInline text={f.note} />
                  </p>
                ) : null}
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {myths.length ? (
        <Block id="rv-myths" icon="🕵️" title="Myth vs fact" intro="Common wrong ideas — and what's actually true.">
          <ul className="space-y-3">
            {myths.map((m, i) => (
              <li key={i} className="card grid overflow-hidden sm:grid-cols-2">
                <div className="bg-bad-soft p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-bad">✗ Myth</div>
                  <p className="mt-1 line-through decoration-bad/60">
                    <RichInline text={m.wrong} />
                  </p>
                </div>
                <div className="bg-good-soft p-4">
                  <div className="text-xs font-black uppercase tracking-wider text-good">✓ Fact</div>
                  <p className="mt-1">
                    <RichInline text={m.right} />
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {mistakes.length ? (
        <Block id="rv-mistakes" icon="⚠️" title="Exam mistakes to avoid">
          <ul className="space-y-2">
            {mistakes.map((x, i) => (
              <li key={i} className="flex gap-3 rounded-xl border border-line bg-surface p-3">
                <span aria-hidden className="font-black text-warn">
                  !
                </span>
                <span className="min-w-0 flex-1">
                  <RichInline text={x} />
                </span>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {mnemonics.length ? (
        <Block id="rv-tricks" icon="🧩" title="Memory tricks">
          <ul className="grid gap-3 sm:grid-cols-2">
            {mnemonics.map((m, i) => (
              <li key={i} className="card p-4">
                <div className="text-xs font-black uppercase tracking-wider text-brand">
                  <RichInline text={m.topic} />
                </div>
                <p className="mt-1 text-lg font-extrabold">
                  <RichInline text={m.device} />
                </p>
                <p className="mt-1 text-sm text-ink-2">
                  <RichInline text={m.explanation} />
                </p>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {realWorld.length ? (
        <Block id="rv-real" icon="🌍" title="Maths in the real world">
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {realWorld.map((r, i) => (
              <li key={i} className="card p-4">
                <div className="text-3xl" aria-hidden>
                  {r.emoji ?? "🌍"}
                </div>
                <h3 className="mt-2 font-extrabold">
                  <RichInline text={r.title} />
                </h3>
                <p className="mt-1 text-sm text-ink-2">
                  <RichInline text={r.detail} />
                </p>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}

      {videos.length ? (
        <Block id="rv-videos" icon="🎬" title="Videos" intro="Hand-picked explainers. They open on YouTube in a new tab.">
          <ul className="grid gap-3 sm:grid-cols-2">
            {videos.map((v, i) => (
              <li key={i}>
                <a href={v.url} target="_blank" rel="noopener noreferrer" className="card flex min-h-16 items-center gap-3 p-4 hover:bg-surface-2">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-bad-soft text-bad" aria-hidden>
                    ▶
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-bold leading-snug">{v.title}</span>
                    <span className="block text-sm text-ink-2">{v.channel}</span>
                  </span>
                  <span aria-hidden className="text-ink-2">
                    ↗
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                </a>
              </li>
            ))}
          </ul>
        </Block>
      ) : null}
    </div>
  );
}
