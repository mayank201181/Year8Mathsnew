"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { Topic } from "@/lib/types";
import { useStore } from "@/lib/store";

export type WatchMode = "masterclass" | "sitcom";

function subscribeTheme(onChange: () => void): () => void {
  if (typeof document === "undefined") return () => {};
  const obs = new MutationObserver(onChange);
  obs.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  const mq = window.matchMedia("(prefers-color-scheme: dark)");
  mq.addEventListener("change", onChange);
  return () => {
    obs.disconnect();
    mq.removeEventListener("change", onChange);
  };
}

function getThemeSnapshot(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  const attr = document.documentElement.getAttribute("data-theme");
  if (attr === "dark" || attr === "light") return attr;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getServerThemeSnapshot(): "light" | "dark" {
  return "light";
}

function subscribeWatchProgress(onChange: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const onMsg = (ev: MessageEvent) => {
    const d = ev.data as { type?: string } | null;
    if (d && d.type === "y8m2-watch-progress") onChange();
  };
  window.addEventListener("message", onMsg);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener("message", onMsg);
    window.removeEventListener("storage", onChange);
  };
}

function getWatchProgressSnapshot(): string {
  if (typeof window === "undefined") return "";
  try {
    return localStorage.getItem("y8m2:watch-v1") ?? "";
  } catch {
    return "";
  }
}

function getServerWatchProgressSnapshot(): string {
  return "";
}

export function WatchTab({
  topic,
  onPractise,
  onChallenge,
}: {
  topic: Topic;
  onPractise: () => void;
  onChallenge: () => void;
}) {
  const searchParams = useSearchParams();
  const urlMode: WatchMode = searchParams.get("mode") === "sitcom" ? "sitcom" : "masterclass";
  const [override, setOverride] = useState<{ forUrl: WatchMode; picked: WatchMode } | null>(null);
  const mode: WatchMode = override && override.forUrl === urlMode ? override.picked : urlMode;

  const theme = useSyncExternalStore(subscribeTheme, getThemeSnapshot, getServerThemeSnapshot);
  const rawProgress = useSyncExternalStore(subscribeWatchProgress, getWatchProgressSnapshot, getServerWatchProgressSnapshot);

  const frameRef = useRef<HTMLIFrameElement>(null);
  const { setBest } = useStore();

  let mcDone = false;
  let sitcomDone = false;
  if (rawProgress) {
    try {
      const parsed = JSON.parse(rawProgress) as {
        completedMc?: Record<string, boolean>;
        completedSitcom?: Record<string, boolean>;
      };
      mcDone = !!parsed.completedMc?.[topic.id];
      sitcomDone = !!parsed.completedSitcom?.[topic.id];
    } catch {
      // Ignore malformed storage JSON
    }
  }

  useEffect(() => {
    frameRef.current?.contentWindow?.postMessage({ type: "y8m2-theme", theme }, "*");
  }, [theme]);

  useEffect(() => {
    const count = (mcDone ? 1 : 0) + (sitcomDone ? 1 : 0);
    if (count > 0) setBest(`watch:${topic.id}`, count);
  }, [mcDone, sitcomDone, topic.id, setBest]);

  const src = `/coaching/index.html?topic=${encodeURIComponent(topic.id)}&mode=${mode}&embed=1&theme=${theme}`;
  const fullUrl = `/coaching/index.html?topic=${encodeURIComponent(topic.id)}&mode=${mode}`;

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setOverride({ forUrl: urlMode, picked: "masterclass" })}
          className={`card flex items-start gap-3 p-4 text-left transition-colors ${
            mode === "masterclass" ? "border-2 border-brand bg-brand-soft/40" : "hover:bg-surface-2"
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand text-xl text-white" aria-hidden>
            🎓
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold">Studio Masterclass Whiteboard</span>
              {mcDone ? <span className="chip border-0 bg-good-soft text-good">Done ✓</span> : null}
            </div>
            <p className="mt-0.5 text-xs text-ink-2">
              Professor Pi&apos;s interactive visual proof, live parameter slider &amp; checkpoint quiz.
            </p>
          </div>
        </button>

        <button
          type="button"
          onClick={() => setOverride({ forUrl: urlMode, picked: "sitcom" })}
          className={`card flex items-start gap-3 p-4 text-left transition-colors ${
            mode === "sitcom" ? "border-2 border-brand bg-brand-soft/40" : "hover:bg-surface-2"
          }`}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-xl text-[#171a2f]" aria-hidden>
            👾
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="font-extrabold">Beast-Mode Cartoon Sitcom</span>
              {sitcomDone ? <span className="chip border-0 bg-good-soft text-good">Done ✓</span> : null}
            </div>
            <p className="mt-0.5 text-xs text-ink-2">
              Zara, Groggle &amp; Pippa comic episode with Confessional Cam &amp; Trap-or-Truth roast game!
            </p>
          </div>
        </button>
      </div>

      <div className="card overflow-hidden p-1 sm:p-2">
        <iframe
          ref={frameRef}
          key={`${topic.id}-${mode}`}
          src={src}
          title={`${topic.title} — ${mode === "sitcom" ? "Beast-Mode Cartoon Sitcom" : "Studio Masterclass Whiteboard"}`}
          className="w-full rounded-xl border-0 bg-bg"
          style={{ height: mode === "sitcom" ? "880px" : "820px" }}
          allow="autoplay"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <a href={fullUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary btn-sm">
            ⛶ Full screen player
          </a>
          <Link href="/watch" className="btn btn-ghost btn-sm">
            🍿 All 20 episodes hub
          </Link>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onPractise}>
            ✏️ Practise skills
          </button>
          <button type="button" className="btn btn-primary btn-sm" onClick={onChallenge}>
            🧗 AoPS Challenge →
          </button>
        </div>
      </div>
    </div>
  );
}
