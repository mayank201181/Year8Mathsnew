"use client";
// The Explore tab: interactive explorables for the topic, loaded lazily so the
// widget code only downloads when the tab is opened.
import { useEffect, useState, type MouseEvent } from "react";
import { WIDGET_LOADERS } from "./widgets/registry";
import type { WidgetDef } from "./widgets/kit";
import { ErrorBoundary } from "./ErrorBoundary";
import { RichInline } from "./Rich";

type Loader = () => Promise<WidgetDef[]>;

/**
 * In-page jump that doesn't add a history entry. A plain #hash link creates an entry the
 * Next.js router can't restore, so a later Back press would reload the whole app.
 */
function jumpTo(e: MouseEvent<HTMLAnchorElement>, id: string) {
  if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const el = document.getElementById(id);
  if (!el) return;
  e.preventDefault();
  const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  // Move keyboard focus too, as a real anchor would.
  if (!el.hasAttribute("tabindex")) el.setAttribute("tabindex", "-1");
  el.focus({ preventScroll: true });
}

interface LoadResult {
  /** Which request this result answers (topic + retry count). */
  key: string;
  widgets: WidgetDef[];
  error: boolean;
}

function loaderFor(topicId: string): Loader | undefined {
  return Object.prototype.hasOwnProperty.call(WIDGET_LOADERS, topicId) ? WIDGET_LOADERS[topicId] : undefined;
}

function Skeleton() {
  return (
    <div className="space-y-4" role="status" aria-live="polite">
      <span className="sr-only">Loading the explorables…</span>
      {[0, 1].map((i) => (
        <div key={i} className="card animate-pulse p-5" aria-hidden>
          <div className="h-5 w-1/2 rounded-lg bg-surface-2" />
          <div className="mt-3 h-3 w-3/4 rounded bg-surface-2" />
          <div className="mt-5 h-48 rounded-xl bg-surface-2" />
        </div>
      ))}
    </div>
  );
}

export function InteractiveTab({ topicId, onGoTab }: { topicId: string; onGoTab?: (tab: "learn" | "practise") => void }) {
  const loader = loaderFor(topicId);
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<LoadResult | null>(null);
  const reqKey = `${topicId}:${attempt}`;

  useEffect(() => {
    if (!loader) return;
    let alive = true;
    let pending: Promise<WidgetDef[]>;
    try {
      pending = loader();
    } catch {
      pending = Promise.reject(new Error("widget loader failed"));
    }
    pending.then(
      (widgets) => {
        if (alive) setResult({ key: reqKey, widgets: Array.isArray(widgets) ? widgets.filter((w) => w && typeof w.Component === "function") : [], error: false });
      },
      (err: unknown) => {
        console.error("Could not load widgets", err);
        if (alive) setResult({ key: reqKey, widgets: [], error: true });
      },
    );
    return () => {
      alive = false;
    };
  }, [loader, reqKey]);

  const status: "none" | "loading" | "error" | "ready" = !loader
    ? "none"
    : !result || result.key !== reqKey
      ? "loading"
      : result.error
        ? "error"
        : result.widgets.length
          ? "ready"
          : "none";
  const widgets = status === "ready" && result ? result.widgets : [];

  return (
    <div className="space-y-5">
      <div className="card flex items-start gap-3 p-4 sm:p-5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-brand-soft text-xl" aria-hidden>
          🎛️
        </span>
        <div className="min-w-0 flex-1">
          <h2 className="section-title">Explore</h2>
          <p className="text-ink-2">Change the inputs and watch what happens — then try the challenges.</p>
        </div>
      </div>

      {status === "loading" ? <Skeleton /> : null}

      {status === "error" ? (
        <div className="card p-6 text-center" role="alert">
          <div className="text-4xl" aria-hidden>
            📡
          </div>
          <p className="mt-2 font-bold">The explorables didn&apos;t load.</p>
          <p className="mt-1 text-sm text-ink-2">This is usually a connection blip. Your progress is safe.</p>
          <button type="button" className="btn btn-primary mt-4" onClick={() => setAttempt((a) => a + 1)}>
            Try again
          </button>
        </div>
      ) : null}

      {status === "none" ? (
        <div className="card p-6 text-center">
          <div className="text-4xl" aria-hidden>
            🛠️
          </div>
          <p className="mt-2 font-bold">No explorables for this topic yet.</p>
          <p className="mt-1 text-sm text-ink-2">The “Try this first” problems in each lesson and the skill drills are the best hands-on practice for now.</p>
          {onGoTab ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => onGoTab("learn")}>
                📖 Go to the lesson
              </button>
              <button type="button" className="btn btn-primary" onClick={() => onGoTab("practise")}>
                ✏️ Practise
              </button>
            </div>
          ) : null}
        </div>
      ) : null}

      {widgets.length > 1 ? (
        <nav aria-label="Explorables in this topic" className="nav-scroll -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-1">
          {widgets.map((w) => (
            <a key={w.id} href={`#w-${w.id}`} onClick={(e) => jumpTo(e, `w-${w.id}`)} className="chip shrink-0 whitespace-nowrap px-3 py-1.5 text-sm hover:bg-brand-soft hover:text-brand">
              {w.title}
            </a>
          ))}
        </nav>
      ) : null}

      {widgets.map((w, i) => {
        const Widget = w.Component;
        return (
          <ErrorBoundary key={w.id} silent>
            <section id={`w-${w.id}`} aria-label={w.title} className="scroll-mt-32 space-y-2">
              {w.blurb ? (
                <p className="flex items-start gap-2 text-sm text-ink-2">
                  {widgets.length > 1 ? (
                    <span className="chip shrink-0 tabular-nums">
                      {i + 1}/{widgets.length}
                    </span>
                  ) : null}
                  <span className="min-w-0 flex-1 pt-0.5">
                    <RichInline text={w.blurb} />
                  </span>
                </p>
              ) : null}
              <Widget />
            </section>
          </ErrorBoundary>
        );
      })}
    </div>
  );
}
