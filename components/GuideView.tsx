"use client";
// The Learn tab: an AoPS-style lesson. Each section opens with a problem to try
// BEFORE the idea is explained; the rest of the lesson appears once the learner
// has had a go (or chooses to skip). Worked examples reveal one step at a time
// and finish with a "your turn" question that is auto-marked.
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore } from "react";
import type { GuideSection, Topic, TopicExtras, WorkedExample } from "@/lib/types";
import { useStore } from "@/lib/store";
import { metaById } from "@/lib/topics/meta";
import { checkAnswer, displayAnswer, type CheckStatus } from "@/lib/answerCheck";
import { Diagram, Rich, RichInline } from "./Rich";
import { AnswerInput } from "./AnswerInput";
import { AskAI } from "./AskAI";

// ---------------------------------------------------------------------------
// Read-aloud: content markup → words a speech engine can say.
// ---------------------------------------------------------------------------

/** Maths markup inside {{ }} → spoken words. */
function mathToWords(m: string): string {
  let s = m;
  s = s.replace(/\bsqrt\s*\(([^()]*)\)/g, " the square root of $1 ");
  s = s.replace(/\bcbrt\s*\(([^()]*)\)/g, " the cube root of $1 ");
  s = s.replace(/\^\(\s*([^()]*)\)/g, " to the power $1 ");
  s = s.replace(/\^\s*2(?![\d.])/g, " squared ");
  s = s.replace(/\^\s*3(?![\d.])/g, " cubed ");
  s = s.replace(/\^\s*(-?[\w.]+)/g, " to the power $1 ");
  s = s.replace(/(\d+)\s+(\d+)\s*\/\s*(\d+)/g, " $1 and $2 over $3 ");
  s = s.replace(/\//g, " over ");
  s = s.replace(/<=|≤/g, " is less than or equal to ");
  s = s.replace(/>=|≥/g, " is greater than or equal to ");
  s = s.replace(/!=|≠/g, " is not equal to ");
  s = s.replace(/</g, " is less than ");
  s = s.replace(/>/g, " is greater than ");
  s = s.replace(/≈/g, " is approximately ");
  s = s.replace(/=/g, " equals ");
  s = s.replace(/[*×]/g, " times ");
  s = s.replace(/÷/g, " divided by ");
  s = s.replace(/±/g, " plus or minus ");
  s = s.replace(/[-−]/g, " minus ");
  s = s.replace(/\+/g, " plus ");
  s = s.replace(/\bpi\b|π/g, " pi ");
  s = s.replace(/%/g, " percent ");
  s = s.replace(/°/g, " degrees ");
  s = s.replace(/:/g, " to ");
  s = s.replace(/[(){}[\]]/g, " ");
  return s.replace(/\s+/g, " ").trim();
}

/** Content text (markdown-lite + {{maths}}) → plain speakable text. */
export function toSpeech(text: string): string {
  let s = String(text ?? "").replace(/\r\n/g, "\n");
  s = s.replace(/\{\{([\s\S]+?)\}\}/g, (_, m: string) => ` ${mathToWords(m)} `);
  s = s
    .replace(/^\s*\|?\s*:?-{2,}[-|:\s]*$/gm, "") // table separator rows
    .replace(/^\s*\|/gm, "")
    .replace(/\|\s*$/gm, ".")
    .replace(/\|/g, ", ")
    .replace(/\*\*|__|`/g, "")
    .replace(/(^|[\s(])\*(\S[^*\n]*?)\*/g, "$1$2")
    .replace(/^\s*[-•]\s+/gm, "")
    .replace(/^>\s?/gm, "")
    .replace(/(^|[\s(])[-−](?=\d)/g, "$1minus ")
    .replace(/−/g, " minus ")
    .replace(/×/g, " times ")
    .replace(/÷/g, " divided by ")
    .replace(/²/g, " squared")
    .replace(/³/g, " cubed")
    .replace(/√/g, " the square root of ")
    .replace(/∛/g, " the cube root of ")
    .replace(/π/g, " pi ")
    .replace(/≤/g, " is less than or equal to ")
    .replace(/≥/g, " is greater than or equal to ")
    .replace(/≠/g, " is not equal to ")
    .replace(/≈/g, " is approximately ")
    .replace(/±/g, " plus or minus ")
    .replace(/°/g, " degrees")
    .replace(/→/g, ", gives ")
    .replace(/\s\+\s/g, " plus ")
    .replace(/\s=\s/g, " equals ")
    .replace(/[ \t]+/g, " ")
    .replace(/ +([,.;:!?])/g, "$1")
    .replace(/\n{2,}/g, "\n");
  return s.trim();
}

/** Break an over-long sentence at a comma or space. */
function splitLong(sentence: string, max: number): string[] {
  const out: string[] = [];
  let rest = sentence;
  while (rest.length > max) {
    let cut = rest.lastIndexOf(", ", max);
    if (cut < max / 2) cut = rest.lastIndexOf(" ", max);
    if (cut <= 0) cut = max;
    out.push(rest.slice(0, cut + 1).trim());
    rest = rest.slice(cut + 1).trim();
  }
  if (rest) out.push(rest);
  return out;
}

/** Split long text into sentence-sized chunks (long utterances stall in some browsers). */
function speechChunks(text: string, max = 220): string[] {
  const sentences = text
    .split(/(?<=[.!?])\s+|\n+/)
    .map((x) => x.trim())
    .filter(Boolean)
    .flatMap((x) => splitLong(x, max));
  const out: string[] = [];
  let cur = "";
  for (const sentence of sentences) {
    if (cur && (cur + " " + sentence).length > max) {
      out.push(cur);
      cur = sentence;
    } else cur = cur ? `${cur} ${sentence}` : sentence;
  }
  if (cur) out.push(cur);
  return out;
}

const noopSubscribe = () => () => {};

/** One read-aloud voice for the whole lesson: starting a section stops the previous one. */
function useSpeech() {
  const supported = useSyncExternalStore(
    noopSubscribe,
    () => "speechSynthesis" in window && typeof window.SpeechSynthesisUtterance === "function",
    () => false,
  );
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const run = useRef(0);

  // Stop talking when the lesson closes (and invalidate any pending start).
  useEffect(() => {
    if (!supported) return;
    const runRef = run;
    return () => {
      runRef.current++;
      window.speechSynthesis.cancel();
    };
  }, [supported]);

  const toggle = useCallback(
    (id: string, text: string) => {
      if (!supported) return;
      const synth = window.speechSynthesis;
      const token = ++run.current;
      const busy = synth.speaking || synth.pending;
      synth.cancel();
      if (speakingId === id) {
        setSpeakingId(null);
        return;
      }
      const chunks = speechChunks(text);
      if (!chunks.length) {
        setSpeakingId(null);
        return;
      }
      const voices = synth.getVoices();
      const voice = voices.find((v) => v.lang === "en-GB") ?? voices.find((v) => v.lang?.toLowerCase().startsWith("en"));
      const stop = () => {
        if (run.current === token) setSpeakingId(null);
      };
      const start = () => {
        if (run.current !== token) return;
        chunks.forEach((chunk, i) => {
          const u = new SpeechSynthesisUtterance(chunk);
          u.lang = voice?.lang ?? "en-GB";
          if (voice) u.voice = voice;
          u.rate = 0.95;
          if (i === chunks.length - 1) u.onend = stop;
          u.onerror = stop;
          synth.speak(u);
        });
      };
      // Some browsers drop a speak() issued in the same tick as cancel(); give it a moment.
      if (busy) window.setTimeout(start, 80);
      else start();
      setSpeakingId(id);
    },
    [supported, speakingId],
  );

  return { supported, speakingId, toggle };
}

function sectionSpeech(s: GuideSection, open: boolean, ideaShown: boolean): string {
  const parts = [`${s.heading}.`];
  if (s.discovery) {
    parts.push(`Try this first. ${s.discovery.problem}`);
    if (ideaShown) parts.push(`The idea. ${s.discovery.idea}`);
  }
  if (open) {
    parts.push(s.body);
    if (s.keyPoints?.length) parts.push(`Key points. ${s.keyPoints.join(". ")}`);
  }
  return toSpeech(parts.join("\n\n"));
}

// ---------------------------------------------------------------------------
// Worked examples
// ---------------------------------------------------------------------------

const MAX_TRIES = 2;

function YourTurn({ yt, awardKey }: { yt: NonNullable<WorkedExample["yourTurn"]>; awardKey: string }) {
  const { award, data } = useStore();
  const [value, setValue] = useState("");
  const [tries, setTries] = useState(0);
  const [msg, setMsg] = useState<{ status: CheckStatus; text?: string } | null>(null);
  const [result, setResult] = useState<{ correct: boolean; stars: number } | null>(null);
  const solvedBefore = !!data.awarded[awardKey];

  function finish(correct: boolean) {
    const stars = correct ? award(awardKey, 1) : 0;
    setResult({ correct, stars });
  }

  function check() {
    if (result || !value.trim()) return;
    const r = checkAnswer(yt.answer, value);
    if (r.status === "invalid" || r.status === "close") {
      setMsg({ status: r.status, text: r.feedback });
      return;
    }
    const n = tries + 1;
    setTries(n);
    if (r.status === "correct") {
      setMsg(null);
      finish(true);
    } else if (n >= MAX_TRIES) {
      setMsg({ status: "incorrect", text: r.feedback });
      finish(false);
    } else {
      setMsg({ status: "incorrect", text: r.feedback ?? "Not quite — compare with the worked example and try once more." });
    }
  }

  return (
    <div className="mt-4 rounded-2xl border-2 border-brand/30 bg-surface p-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="text-xs font-black uppercase tracking-wider text-brand">✍️ Your turn</div>
        {solvedBefore && !result ? <span className="chip border-0 bg-good-soft text-good">✓ Solved before</span> : null}
      </div>
      <Rich text={yt.question} className="mt-2" />
      <div className="mt-3">
        <AnswerInput
          value={value}
          onChange={(v) => {
            setValue(v);
            if (msg?.status !== "incorrect") setMsg(null);
          }}
          onSubmit={check}
          type={yt.answer.type}
          disabled={!!result}
        />
      </div>
      {!result ? (
        <>
          {msg ? (
            <div
              className={`mt-3 rounded-xl px-3 py-2 text-sm ${msg.status === "incorrect" ? "animate-shake bg-bad-soft" : msg.status === "close" ? "bg-warn-soft" : "bg-info-soft"}`}
              role="status"
              aria-live="polite"
            >
              {msg.status === "incorrect" ? <strong>Not quite. </strong> : msg.status === "close" ? <strong>Almost! </strong> : null}
              {msg.text ? <RichInline text={msg.text} /> : null}
            </div>
          ) : null}
          <div className="mt-3 flex flex-wrap gap-2">
            <button type="button" className="btn btn-primary btn-sm" onClick={check} disabled={!value.trim()}>
              Check
            </button>
            {tries > 0 ? (
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => finish(false)}>
                Show solution
              </button>
            ) : null}
          </div>
        </>
      ) : (
        <div
          className={`animate-pop mt-3 rounded-xl border-l-4 p-3 ${result.correct ? "border-good bg-good-soft" : "border-bad bg-bad-soft"}`}
          role="status"
          aria-live="polite"
        >
          <div className="font-extrabold">
            {result.correct ? (tries === 1 ? "✅ Correct — first time!" : "✅ Correct") : "Here's how it goes"}
            {result.stars ? <span className="ml-2 text-sm font-bold">+{result.stars} ⭐</span> : null}
          </div>
          {!result.correct && msg?.text ? (
            <p className="mt-1 text-sm">
              <RichInline text={msg.text} />
            </p>
          ) : null}
          <p className="mt-2">
            <strong>Answer: </strong>
            <RichInline text={displayAnswer(yt.answer)} />
          </p>
          <Rich text={yt.solution} className="mt-2 text-sm" />
        </div>
      )}
    </div>
  );
}

function WorkedExampleView({ ex, index, topicId, sectionId }: { ex: WorkedExample; index: number; topicId: string; sectionId: string }) {
  const steps = ex.steps ?? [];
  const total = steps.length;
  const [shown, setShown] = useState(0);
  const complete = shown >= total;

  return (
    <div className="rounded-2xl border border-line bg-surface-2 p-4 sm:p-5">
      <div className="text-xs font-black uppercase tracking-wider text-brand">
        Worked example {index + 1}
        {ex.title ? (
          <>
            {" · "}
            <RichInline text={ex.title} />
          </>
        ) : null}
      </div>
      <Rich text={ex.problem} className="mt-2 font-semibold" />
      <div aria-live="polite">
        {shown > 0 ? (
          <ol className="mt-3 space-y-2.5">
            {steps.slice(0, shown).map((st, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-xs font-black text-brand" aria-hidden>
                  {i + 1}
                </span>
                <span className="sr-only">Step {i + 1}: </span>
                <div className="min-w-0 flex-1">
                  <Rich text={st} />
                </div>
              </li>
            ))}
          </ol>
        ) : null}
        {complete ? (
          <div className="mt-3 rounded-xl bg-good-soft px-3 py-2">
            <strong className="text-good">Answer: </strong>
            <RichInline text={ex.answer} />
          </div>
        ) : null}
      </div>
      {!complete ? (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={() => setShown((n) => Math.min(total, n + 1))}>
            {shown === 0 ? "Show the first step" : "Next step"}
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setShown(total)}>
            Show all steps
          </button>
          <span className="text-xs text-ink-2">
            {shown === 0 ? "Try it yourself first, then check each step." : `Step ${shown} of ${total} — can you predict the next one?`}
          </span>
        </div>
      ) : null}
      {complete && ex.yourTurn ? <YourTurn yt={ex.yourTurn} awardKey={`yt:${topicId}:${sectionId}:${index}`} /> : null}
    </div>
  );
}

// ---------------------------------------------------------------------------
// One lesson section
// ---------------------------------------------------------------------------

function Collapsible({ icon, title, text }: { icon: string; title: string; text: string }) {
  return (
    <details className="group rounded-2xl border border-line bg-surface-2 [&>summary::-webkit-details-marker]:hidden">
      <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-3 rounded-2xl px-4 py-3 font-extrabold hover:bg-brand-soft/50">
        <span>
          <span aria-hidden>{icon}</span> {title}
        </span>
        <span aria-hidden className="text-xl leading-none text-ink-2 transition-transform group-open:rotate-90">
          ›
        </span>
      </summary>
      <div className="px-4 pb-4">
        <Rich text={text} />
      </div>
    </details>
  );
}

interface SectionProps {
  topicId: string;
  section: GuideSection;
  index: number;
  stretch: boolean;
  read: boolean;
  open: boolean;
  next?: GuideSection;
  onReveal: () => void;
  onMarkRead: () => void;
  onPractise?: () => void;
  speech: { supported: boolean; speaking: boolean; toggle: (text: string) => void };
}

function SectionView({ topicId, section: s, index, stretch, read, open, next, onReveal, onMarkRead, onPractise, speech }: SectionProps) {
  const [ideaShown, setIdeaShown] = useState(false);
  const [scratch, setScratch] = useState("");
  const ideaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  /** The button the learner pressed disappears, so move focus to what it revealed. */
  const focusSoon = (el: { current: HTMLElement | null }) => window.requestAnimationFrame(() => el.current?.focus({ preventScroll: true }));
  const examples = s.workedExamples ?? [];

  return (
    <section id={`sec-${s.id}`} aria-labelledby={`h-${s.id}`} className="card scroll-mt-32 p-4 sm:p-6">
      <header className="flex items-start gap-3">
        <span
          className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-black ${read ? "bg-good-soft text-good" : "bg-brand-soft text-brand"}`}
          aria-hidden
        >
          {read ? "✓" : index + 1}
        </span>
        <div className="min-w-0 flex-1">
          <h2 id={`h-${s.id}`} className="text-xl font-extrabold leading-snug sm:text-2xl">
            {s.heading}
          </h2>
          {stretch || read ? (
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {stretch ? <span className="chip border-0 bg-accent-soft text-warn">Stretch · Year 9 look-ahead</span> : null}
              {read ? <span className="chip border-0 bg-good-soft text-good">Understood</span> : null}
            </div>
          ) : null}
        </div>
        {speech.supported ? (
          <button
            type="button"
            className={`btn btn-sm shrink-0 ${speech.speaking ? "btn-secondary text-bad" : "btn-ghost"}`}
            aria-pressed={speech.speaking}
            aria-label={speech.speaking ? `Stop reading “${s.heading}”` : `Read “${s.heading}” aloud`}
            onClick={() => speech.toggle(sectionSpeech(s, open, ideaShown))}
          >
            {speech.speaking ? "⏹ Stop" : "🔊"}
            <span className="hidden sm:inline">{speech.speaking ? "" : "Read aloud"}</span>
          </button>
        ) : null}
      </header>

      {s.discovery ? (
        <div className="mt-4 rounded-2xl border-2 border-accent/50 bg-accent-soft p-4 sm:p-5">
          <div className="text-xs font-black uppercase tracking-wider text-warn">
            <span aria-hidden>🧩</span> Try this first
          </div>
          <Rich text={s.discovery.problem} className="mt-2" />
          {!open || scratch ? (
            <div className="mt-3">
              <label htmlFor={`scratch-${s.id}`} className="text-xs font-bold text-ink-2">
                Scratch space (not saved)
              </label>
              <textarea
                id={`scratch-${s.id}`}
                className="input mt-1 min-h-20 text-base"
                rows={3}
                value={scratch}
                onChange={(e) => setScratch(e.target.value)}
                placeholder="Jot down your thinking…"
                spellCheck={false}
              />
            </div>
          ) : null}
          <div aria-live="polite">
            {ideaShown ? (
              <div ref={ideaRef} tabIndex={-1} className="mt-3 rounded-xl border border-line bg-surface p-3 outline-none sm:p-4">
                <div className="text-xs font-black uppercase tracking-wider text-brand">
                  <span aria-hidden>💡</span> The idea
                </div>
                <Rich text={s.discovery.idea} className="mt-1" />
              </div>
            ) : null}
          </div>
          {!ideaShown || !open ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {!ideaShown ? (
                <button
                  type="button"
                  className={`btn btn-sm ${open ? "btn-secondary" : "btn-primary"}`}
                  onClick={() => {
                    setIdeaShown(true);
                    onReveal();
                    focusSoon(ideaRef);
                  }}
                >
                  💡 Reveal the idea
                </button>
              ) : null}
              {!open ? (
                <button
                  type="button"
                  className="btn btn-ghost btn-sm"
                  onClick={() => {
                    onReveal();
                    focusSoon(bodyRef);
                  }}
                >
                  Skip to the lesson ↓
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ) : null}

      {open ? (
        <div ref={bodyRef} tabIndex={-1} className="mt-5 space-y-5 outline-none">
          <Rich text={s.body} />
          {s.diagram ? <Diagram svg={s.diagram} caption={s.diagramCaption} /> : null}
          {examples.map((ex, i) => (
            <WorkedExampleView key={i} ex={ex} index={i} topicId={topicId} sectionId={s.id} />
          ))}
          {s.keyPoints?.length ? (
            <div className="rounded-2xl border border-good/30 bg-good-soft p-4 sm:p-5">
              <h3 className="font-extrabold text-good">✓ Key points</h3>
              <ul className="mt-2 space-y-1.5">
                {s.keyPoints.map((k, i) => (
                  <li key={i} className="flex gap-2">
                    <span aria-hidden className="font-black text-good">
                      •
                    </span>
                    <span className="min-w-0 flex-1">
                      <RichInline text={k} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {s.whyItWorks ? <Collapsible icon="🔍" title="Why does this work?" text={s.whyItWorks} /> : null}
          {s.strategies?.length ? (
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="mr-1 text-sm font-bold text-ink-2">Strategies:</span>
              {s.strategies.map((x) => (
                <span key={x} className="chip border-0 bg-info-soft text-info">
                  🧠 <RichInline text={x} />
                </span>
              ))}
            </div>
          ) : null}
          {s.thinkDeeper ? <Collapsible icon="🤔" title="Think deeper" text={s.thinkDeeper} /> : null}
          <div className="flex flex-wrap items-center gap-2 border-t border-line pt-4">
            <button
              type="button"
              className={read ? "btn border-good/40 bg-good-soft text-good disabled:cursor-default disabled:opacity-100" : "btn btn-primary"}
              disabled={read}
              aria-pressed={read}
              onClick={onMarkRead}
            >
              {read ? "✓ Understood" : "I understand this section ✓"}
            </button>
            {next ? (
              <a href={`#sec-${next.id}`} className="btn btn-ghost">
                Next: {next.heading} ↓
              </a>
            ) : onPractise ? (
              <button type="button" className="btn btn-ghost" onClick={onPractise}>
                Practise this topic →
              </button>
            ) : null}
          </div>
        </div>
      ) : (
        <p className="mt-4 text-sm text-ink-2">The lesson for this section appears once you&apos;ve had a go — or choose “Skip to the lesson”.</p>
      )}
    </section>
  );
}

// ---------------------------------------------------------------------------
// The whole guide
// ---------------------------------------------------------------------------

export function GuideView({ topic, extras, onPractise }: { topic: Topic; extras: TopicExtras; onPractise?: () => void }) {
  const { data, markSectionRead } = useStore();
  const sections = useMemo(() => topic.guide ?? [], [topic.guide]);
  const stretchIds = useMemo(() => new Set((metaById(topic.id)?.sections ?? []).filter((s) => s.stretch).map((s) => s.id)), [topic.id]);
  // Sections opened this session survive a tab switch (sessionStorage; not progress data).
  const revealKey = `y8m2:revealed:${topic.id}`;
  const [revealed, setRevealed] = useState<Record<string, true>>(() => {
    if (typeof window === "undefined") return {};
    try {
      const v: unknown = JSON.parse(window.sessionStorage.getItem(revealKey) ?? "{}");
      return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, true>) : {};
    } catch {
      return {};
    }
  });
  useEffect(() => {
    try {
      window.sessionStorage.setItem(revealKey, JSON.stringify(revealed));
    } catch {
      /* storage unavailable — reveals just won't persist */
    }
  }, [revealKey, revealed]);
  const speech = useSpeech();

  const reveal = useCallback((id: string) => setRevealed((r) => (r[id] ? r : { ...r, [id]: true })), []);
  const isRead = (id: string) => !!data.guidesRead[`${topic.id}#${id}`];

  // Deep link (#sec-<id>): open that section and bring it into view.
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash.startsWith("#sec-")) return;
    let id = hash.slice(5);
    try {
      id = decodeURIComponent(id);
    } catch {
      /* keep the raw id */
    }
    if (!sections.some((s) => s.id === id)) return;
    const raf = window.requestAnimationFrame(() => reveal(id));
    const t = window.setTimeout(() => {
      document.getElementById(`sec-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(t);
    };
  }, [sections, reveal]);

  const core = sections.filter((s) => !stretchIds.has(s.id));
  const coreRead = core.filter((s) => isRead(s.id)).length;
  const allCoreRead = core.length > 0 && coreRead === core.length;
  const askContext = `Year 8 maths topic: ${topic.title}. Lesson sections: ${sections.map((s) => s.heading).join("; ")}.`;
  const didYouKnow = extras.didYouKnow ?? [];
  const activities = extras.activities ?? [];
  const bonus = extras.bonusDiagrams ?? [];

  return (
    <div className="space-y-6">
      {extras.hook ? (
        <div className="flex gap-3 rounded-2xl bg-gradient-to-br from-brand to-brand-2 p-4 text-brand-ink sm:p-5">
          <span className="text-2xl" aria-hidden>
            ✨
          </span>
          <Rich text={extras.hook} className="min-w-0 flex-1 font-semibold" />
        </div>
      ) : null}

      <div className="card p-4 sm:p-6">
        <Rich text={topic.intro} className="text-[1.05rem]" />
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <AskAI context={askContext} />
        </div>
      </div>

      <div className="lg:grid lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start lg:gap-6">
        <nav aria-labelledby="gv-toc" className="card mb-6 p-4 lg:sticky lg:top-32 lg:mb-0 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto">
          <div className="flex items-baseline justify-between gap-2">
            <h2 id="gv-toc" className="section-title">
              In this topic
            </h2>
            {core.length ? (
              <span className="text-xs font-bold text-ink-2">
                {coreRead}/{core.length} understood
              </span>
            ) : null}
          </div>
          <ol className="mt-2 space-y-0.5">
            {sections.map((s, i) => {
              const read = isRead(s.id);
              const stretch = stretchIds.has(s.id);
              return (
                <li key={s.id}>
                  <a href={`#sec-${s.id}`} className="flex min-h-10 items-center gap-2.5 rounded-xl px-2 py-1.5 text-sm hover:bg-surface-2">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-black ${read ? "bg-good-soft text-good" : "bg-surface-2 text-ink-2"}`}
                      aria-hidden
                    >
                      {read ? "✓" : i + 1}
                    </span>
                    <span className="min-w-0 flex-1 font-semibold leading-snug">{s.heading}</span>
                    {stretch ? <span className="chip shrink-0 border-0 bg-accent-soft px-2 text-[0.7rem] text-warn">Stretch</span> : null}
                    {read ? <span className="sr-only">(understood)</span> : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0 space-y-6">
          {sections.map((s, i) => {
            const read = isRead(s.id);
            return (
              <SectionView
                key={s.id}
                topicId={topic.id}
                section={s}
                index={i}
                stretch={stretchIds.has(s.id)}
                read={read}
                open={read || !s.discovery || !!revealed[s.id]}
                next={sections[i + 1]}
                onReveal={() => reveal(s.id)}
                onMarkRead={() => markSectionRead(topic.id, s.id)}
                onPractise={onPractise}
                speech={{ supported: speech.supported, speaking: speech.speakingId === s.id, toggle: (text) => speech.toggle(s.id, text) }}
              />
            );
          })}

          <div className="card flex flex-col items-start gap-3 bg-brand-soft p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="font-extrabold">
                {allCoreRead ? "Every lesson understood — brilliant." : core.length ? `You've understood ${coreRead} of ${core.length} lessons.` : "Ready to practise?"}
              </div>
              <p className="text-sm text-ink-2">Lock it in with the quick check and the skill drills.</p>
            </div>
            {onPractise ? (
              <button type="button" className="btn btn-primary" onClick={onPractise}>
                Practise this topic →
              </button>
            ) : null}
          </div>

          {didYouKnow.length ? (
            <section aria-labelledby="gv-dyk">
              <h2 id="gv-dyk" className="section-title">
                💡 Did you know?
              </h2>
              <ul className="mt-3 grid gap-3 sm:grid-cols-2">
                {didYouKnow.map((f, i) => (
                  <li key={i} className="card p-4 text-[0.95rem]">
                    <Rich text={f} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {activities.length ? (
            <section aria-labelledby="gv-home">
              <h2 id="gv-home" className="section-title">
                🏠 Try this at home
              </h2>
              <div className="mt-3 grid gap-4 xl:grid-cols-2">
                {activities.map((a, i) => (
                  <article key={i} className="card p-4 sm:p-5">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl" aria-hidden>
                        {a.emoji}
                      </span>
                      <h3 className="text-lg font-extrabold leading-snug">
                        <RichInline text={a.title} />
                      </h3>
                    </div>
                    {a.materials?.length ? (
                      <div className="mt-3">
                        <div className="text-xs font-black uppercase tracking-wider text-ink-2">You&apos;ll need</div>
                        <ul className="mt-1.5 flex flex-wrap gap-1.5">
                          {a.materials.map((m, j) => (
                            <li key={j} className="chip">
                              <RichInline text={m} />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {a.steps?.length ? (
                      <ol className="rich-ol mt-3 space-y-1.5">
                        {a.steps.map((st, j) => (
                          <li key={j}>
                            <RichInline text={st} />
                          </li>
                        ))}
                      </ol>
                    ) : null}
                    {a.maths ? (
                      <div className="mt-4 rounded-xl bg-brand-soft p-3 text-sm">
                        <div className="font-extrabold text-brand">The maths</div>
                        <Rich text={a.maths} className="mt-1" />
                      </div>
                    ) : null}
                  </article>
                ))}
              </div>
            </section>
          ) : null}

          {bonus.length ? (
            <section aria-labelledby="gv-pics">
              <h2 id="gv-pics" className="section-title">
                📐 Picture this
              </h2>
              <div className="mt-3 grid gap-4 xl:grid-cols-2">
                {bonus.map((d, i) => (
                  <div key={i} className="card p-4">
                    <h3 className="font-extrabold">
                      <RichInline text={d.title} />
                    </h3>
                    <Diagram svg={d.svg} caption={d.caption} />
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {extras.history ? (
            <section aria-labelledby="gv-history" className="card p-4 sm:p-6">
              <div className="text-xs font-black uppercase tracking-wider text-ink-2">📜 From the history of maths</div>
              <h2 id="gv-history" className="mt-1 text-lg font-extrabold">
                <RichInline text={extras.history.title} />
              </h2>
              <Rich text={extras.history.story} className="mt-2" />
            </section>
          ) : null}
        </div>
      </div>
    </div>
  );
}
