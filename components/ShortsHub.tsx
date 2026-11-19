"use client";
import { useCallback, useEffect, useMemo, useRef, useState, useSyncExternalStore, type TouchEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SHORTS, type ShortClip } from "@/lib/shorts";

const STORAGE_KEY = "y8shorts:watched:v1";
const SPEEDS = [1, 1.25, 1.5] as const;

function subscribeWatched(cb: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => cb();
  window.addEventListener("storage", handler);
  window.addEventListener("y8shorts-watched", handler);
  return () => {
    window.removeEventListener("storage", handler);
    window.removeEventListener("y8shorts-watched", handler);
  };
}

function getWatchedSnapshot(): string {
  if (typeof window === "undefined") return "{}";
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "{}";
  } catch {
    return "{}";
  }
}

function getServerWatchedSnapshot(): string {
  return "{}";
}

function markShortWatched(id: string) {
  if (typeof window === "undefined") return;
  try {
    const cur = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "{}") as Record<string, boolean>;
    if (!cur[id]) {
      cur[id] = true;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cur));
      window.dispatchEvent(new Event("y8shorts-watched"));
    }
  } catch {
    // ignore storage quota errors
  }
}

function fmtSec(sec: number): string {
  const s = Math.max(0, Math.floor(sec));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
}

export function ShortsHub({
  topicId,
  subjectLabel,
  onPractise,
}: {
  topicId?: string;
  subjectLabel?: string;
  onPractise?: () => void;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const rawWatched = useSyncExternalStore(subscribeWatched, getWatchedSnapshot, getServerWatchedSnapshot);
  const watched = useMemo(() => {
    try {
      return JSON.parse(rawWatched) as Record<string, boolean>;
    } catch {
      return {};
    }
  }, [rawWatched]);

  const basePool = useMemo(
    () => (topicId ? SHORTS.filter((s) => s.topicId === topicId) : SHORTS),
    [topicId]
  );

  const strands = useMemo(() => {
    const seen = new Set<string>();
    const list: string[] = ["All"];
    for (const s of basePool) {
      if (s.strand && !seen.has(s.strand)) {
        seen.add(s.strand);
        list.push(s.strand);
      }
    }
    return list;
  }, [basePool]);

  const [strandFilter, setStrandFilter] = useState<string>("All");
  const [selectedTopicFilter, setSelectedTopicFilter] = useState<string>("All");
  const [autoAdvance, setAutoAdvance] = useState<boolean>(true);
  const [selectedIdOverride, setSelectedIdOverride] = useState<string | null>(null);
  const [playing, setPlaying] = useState<boolean>(false);
  const [muted, setMuted] = useState<boolean>(false);
  const [speedIdx, setSpeedIdx] = useState<number>(0);
  const [relSec, setRelSec] = useState<number>(0);
  const [liveCaption, setLiveCaption] = useState<{ clipId: string; text: string } | null>(null);

  const speed = SPEEDS[speedIdx];

  const pool = useMemo(() => {
    return basePool.filter((s) => {
      if (!topicId && strandFilter !== "All" && s.strand !== strandFilter) return false;
      if (!topicId && selectedTopicFilter !== "All" && s.topicId !== selectedTopicFilter) return false;
      return true;
    });
  }, [basePool, topicId, strandFilter, selectedTopicFilter]);

  const topicsInStrand = useMemo(() => {
    const map = new Map<string, { id: string; title: string; icon: string }>();
    for (const s of basePool) {
      if (strandFilter !== "All" && s.strand !== strandFilter) continue;
      if (!map.has(s.topicId)) map.set(s.topicId, { id: s.topicId, title: s.topicShort, icon: s.topicIcon });
    }
    return Array.from(map.values());
  }, [basePool, strandFilter]);

  const urlShortId = params.get("s");
  const activeId = selectedIdOverride ?? urlShortId;
  const current: ShortClip | undefined = useMemo(() => {
    if (!pool.length) return basePool[0];
    return pool.find((s) => s.id === activeId) ?? pool.find((s) => !watched[s.id]) ?? pool[0];
  }, [pool, basePool, activeId, watched]);

  const curIdx = current ? pool.findIndex((s) => s.id === current.id) : -1;
  const prevClip = curIdx > 0 ? pool[curIdx - 1] : undefined;
  const nextClip = curIdx >= 0 && curIdx + 1 < pool.length ? pool[curIdx + 1] : undefined;

  const videoRef = useRef<HTMLVideoElement>(null);
  const autoPlayRef = useRef<boolean>(false);
  const seekingClipRef = useRef<string | null>(null);
  const touchStartY = useRef<number | null>(null);

  const selectClip = useCallback(
    (clip: ShortClip, shouldPlay: boolean) => {
      autoPlayRef.current = shouldPlay;
      seekingClipRef.current = clip.id;
      setSelectedIdOverride(clip.id);
      setRelSec(0);
      setLiveCaption({ clipId: clip.id, text: clip.captions[0]?.text ?? clip.summary });

      // If switching clips inside the SAME video file, seek & play synchronously inside the tap gesture (iPad Safari safe!)
      const v = videoRef.current;
      if (v && current && clip.src === current.src && v.readyState >= 1) {
        try {
          v.currentTime = clip.startSec;
        } catch {
          // ignore
        }
        if (shouldPlay) {
          void v.play().catch(() => {});
        }
      }

      if (!topicId) {
        router.replace(`/shorts?s=${clip.id}`, { scroll: false });
      }
    },
    [router, topicId, current]
  );

  // Sync mute & playback rate to video element
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = muted;
    v.playbackRate = speed;
  }, [muted, speed, current?.src]);

  // Seek video to current.startSec whenever current clip changes
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !current) return;
    seekingClipRef.current = current.id;
    const onLoaded = () => {
      v.muted = muted;
      v.playbackRate = speed;
      try {
        v.currentTime = current.startSec;
      } catch {
        // ignore pre-metadata seek errors
      }
      if (autoPlayRef.current) {
        void v.play().catch(() => {});
      }
    };
    if (v.readyState >= 1) {
      onLoaded();
    } else {
      v.addEventListener("loadedmetadata", onLoaded, { once: true });
      return () => v.removeEventListener("loadedmetadata", onLoaded);
    }
  }, [current, muted, speed]);

  // Keyboard Up/Down/Space navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowDown" && nextClip) {
        e.preventDefault();
        selectClip(nextClip, true);
      } else if (e.key === "ArrowUp" && prevClip) {
        e.preventDefault();
        selectClip(prevClip, true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [nextClip, prevClip, selectClip]);

  if (!current) {
    return <p className="card p-6 text-ink-2">Concept Shorts are loading…</p>;
  }

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      if (v.currentTime < current.startSec - 0.5 || v.currentTime >= current.endSec - 0.2) {
        seekingClipRef.current = current.id;
        v.currentTime = current.startSec;
      }
      autoPlayRef.current = true;
      void v.play().catch(() => {});
    } else {
      autoPlayRef.current = false;
      v.pause();
    }
  };

  const replayClip = () => {
    const v = videoRef.current;
    if (!v) return;
    seekingClipRef.current = current.id;
    autoPlayRef.current = true;
    setRelSec(0);
    try {
      v.currentTime = current.startSec;
    } catch {
      // ignore
    }
    void v.play().catch(() => {});
  };

  const handleSeeked = () => {
    const v = videoRef.current;
    if (!v) return;
    if (seekingClipRef.current === current.id) {
      // Only clear guard once video actually landed inside this clip's time range
      if (v.currentTime >= current.startSec - 1.5 && v.currentTime < current.endSec) {
        seekingClipRef.current = null;
      }
    }
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    const t = v.currentTime;

    // Prevent stale pre-seek timeupdate from falsely ending or skipping the newly selected clip
    if (v.seeking || seekingClipRef.current === current.id) {
      if (t >= current.startSec - 1.0 && t < current.endSec - 0.5) {
        seekingClipRef.current = null;
      } else {
        return;
      }
    }

    const elapsed = Math.max(0, t - current.startSec);
    setRelSec(Math.min(current.durationSec, elapsed));

    let cap = "";
    for (const c of current.captions) {
      if (t + 0.15 >= c.t) cap = c.who ? `${c.who}: ${c.text}` : c.text;
    }
    if (cap) setLiveCaption({ clipId: current.id, text: cap });

    if (elapsed >= Math.min(10, current.durationSec * 0.6)) {
      markShortWatched(current.id);
    }

    if (t >= current.endSec - 0.08) {
      markShortWatched(current.id);
      if (autoAdvance && nextClip) {
        selectClip(nextClip, true);
      } else {
        v.pause();
        seekingClipRef.current = current.id;
        v.currentTime = current.startSec;
        setRelSec(0);
      }
    }
  };

  const onTouchStart = (e: TouchEvent) => {
    touchStartY.current = e.touches[0]?.clientY ?? null;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (touchStartY.current === null) return;
    const dy = (e.changedTouches[0]?.clientY ?? touchStartY.current) - touchStartY.current;
    touchStartY.current = null;
    if (dy < -50 && nextClip) selectClip(nextClip, true);
    else if (dy > 50 && prevClip) selectClip(prevClip, true);
  };

  const watchedCount = basePool.filter((s) => watched[s.id]).length;
  const pct = current.durationSec > 0 ? Math.min(100, (relSec / current.durationSec) * 100) : 0;
  const shownCaption = liveCaption?.clipId === current.id ? liveCaption.text : current.summary;

  return (
    <div className="space-y-5 pb-6">
      {!topicId ? (
        <header className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="chip border-0 bg-brand-soft text-brand">
                📱 {basePool.length} Concept Shorts · Bite-Sized Vertical Revision
              </span>
              <span className="chip">✓ {watchedCount}/{basePool.length} watched</span>
            </div>
            <h1 className="mt-2 text-2xl font-black sm:text-3xl">
              {subjectLabel ?? "Year 8"} Concept Shorts
            </h1>
            <p className="text-sm text-ink-2">
              Every key concept broken into a quick 60–90s vertical Short. Swipe up/down or use ↑/↓ keys to binge!
            </p>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-sm font-bold">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="h-4 w-4"
            />
            Auto-next Short
          </label>
        </header>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-0 bg-brand-soft text-brand">
              📱 {basePool.length} Concept Shorts in this topic
            </span>
            <span className="chip">✓ {watchedCount}/{basePool.length} watched</span>
          </div>
          <label className="flex cursor-pointer items-center gap-2 text-xs font-bold">
            <input
              type="checkbox"
              checked={autoAdvance}
              onChange={(e) => setAutoAdvance(e.target.checked)}
              className="h-4 w-4"
            />
            Auto-next Short
          </label>
        </div>
      )}

      {!topicId && strands.length > 2 ? (
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1.5">
            {strands.map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  setStrandFilter(st);
                  setSelectedTopicFilter("All");
                }}
                className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  strandFilter === st ? "bg-brand text-white" : "bg-surface-2 text-ink-2 hover:text-ink"
                }`}
              >
                {st === "All" ? `All (${basePool.length})` : st}
              </button>
            ))}
          </div>
          <div className="flex gap-1.5 overflow-x-auto pb-1">
            <button
              type="button"
              onClick={() => setSelectedTopicFilter("All")}
              className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${
                selectedTopicFilter === "All" ? "bg-brand-soft text-brand" : "bg-surface text-ink-2 hover:bg-surface-2"
              }`}
            >
              All topics
            </button>
            {topicsInStrand.map((tp) => (
              <button
                key={tp.id}
                type="button"
                onClick={() => setSelectedTopicFilter(tp.id)}
                className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-bold ${
                  selectedTopicFilter === tp.id ? "bg-brand-soft text-brand" : "bg-surface text-ink-2 hover:bg-surface-2"
                }`}
              >
                {tp.icon} {tp.title}
              </button>
            ))}
          </div>
        </div>
      ) : null}

      <div className="grid items-start gap-5 lg:grid-cols-[400px_1fr]">
        {/* Vertical 9:16 Phone-Framed Shorts Player */}
        <div className="mx-auto w-full max-w-[390px]">
          <div
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="relative flex aspect-[9/16] w-full flex-col justify-between overflow-hidden rounded-3xl border-2 border-line bg-slate-950 text-white shadow-xl"
          >
            {/* Top 9:16 Concept Banner */}
            <div className="z-10 bg-gradient-to-b from-slate-900 via-slate-900/95 to-transparent px-4 pt-4 pb-3">
              <div className="flex items-center justify-between gap-2 text-[11px] font-extrabold uppercase tracking-wider text-sky-300">
                <span className="truncate">
                  {current.topicIcon} {current.strand} · {current.topicShort}
                </span>
                <div className="flex shrink-0 items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setSpeedIdx((i) => (i + 1) % SPEEDS.length)}
                    className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] font-extrabold text-white hover:bg-white/25"
                    title="Change playback speed"
                  >
                    {speed}×
                  </button>
                  <button
                    type="button"
                    onClick={() => setMuted((m) => !m)}
                    className="rounded-full bg-white/15 px-2 py-0.5 text-[10px] text-white hover:bg-white/25"
                    aria-label={muted ? "Unmute" : "Mute"}
                  >
                    {muted ? "🔇" : "🔊"}
                  </button>
                  <span className="rounded-full bg-white/15 px-2 py-0.5 text-white">
                    {current.index}/{current.totalInTopic}
                  </span>
                </div>
              </div>
              <h2 className="mt-1.5 line-clamp-2 text-lg font-black leading-snug text-white">
                {current.title}
              </h2>
            </div>

            {/* Center Crisp 16:9 Animated Scene & Diagram */}
            <div className="relative my-auto w-full bg-black">
              <video
                key={current.src}
                ref={videoRef}
                src={current.src}
                poster={current.poster}
                playsInline
                preload="metadata"
                onClick={togglePlay}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onSeeked={handleSeeked}
                onTimeUpdate={handleTimeUpdate}
                className="aspect-video w-full cursor-pointer object-contain"
              />
              {!playing ? (
                <button
                  type="button"
                  onClick={togglePlay}
                  aria-label="Play Short"
                  className="absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-2xl text-slate-950 shadow-lg transition hover:scale-105"
                >
                  ▶
                </button>
              ) : null}
            </div>

            {/* Bottom Live Caption, Takeaway & Controls */}
            <div className="z-10 space-y-2.5 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pt-2 pb-4">
              <div className="rounded-xl bg-white/10 px-3 py-2 text-xs leading-relaxed text-slate-100 backdrop-blur">
                <div className="mb-0.5 text-[10px] font-extrabold uppercase tracking-wider text-amber-300">
                  {liveCaption?.clipId === current.id ? "Live Caption" : "Key Takeaway"}
                </div>
                <p className="line-clamp-3 font-medium">{shownCaption}</p>
              </div>

              {/* Progress Scrubber */}
              <div>
                <div
                  className="h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/20"
                  onClick={(e) => {
                    const v = videoRef.current;
                    if (!v) return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const k = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
                    seekingClipRef.current = current.id;
                    v.currentTime = current.startSec + k * current.durationSec;
                  }}
                >
                  <div className="h-full rounded-full bg-sky-400 transition-all" style={{ width: `${pct}%` }} />
                </div>
                <div className="mt-1 flex justify-between text-[11px] font-bold tabular-nums text-slate-300">
                  <span>{fmtSec(relSec)}</span>
                  <span>{fmtSec(current.durationSec)}</span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="flex items-center justify-between gap-1.5">
                <button
                  type="button"
                  disabled={!prevClip}
                  onClick={() => prevClip && selectClip(prevClip, true)}
                  className="rounded-xl bg-white/15 px-2.5 py-2 text-xs font-extrabold text-white enabled:hover:bg-white/25 disabled:opacity-35"
                >
                  ↑ Prev
                </button>
                <button
                  type="button"
                  onClick={replayClip}
                  aria-label="Replay Short"
                  className="rounded-xl bg-white/15 px-2.5 py-2 text-xs font-extrabold text-white hover:bg-white/25"
                  title="Replay from start"
                >
                  ↺
                </button>
                <button
                  type="button"
                  onClick={togglePlay}
                  className="rounded-xl bg-sky-500 px-3.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-sky-400"
                >
                  {playing ? "⏸ Pause" : "▶ Play"}
                </button>
                <button
                  type="button"
                  disabled={!nextClip}
                  onClick={() => nextClip && selectClip(nextClip, true)}
                  className="rounded-xl bg-white/15 px-2.5 py-2 text-xs font-extrabold text-white enabled:hover:bg-white/25 disabled:opacity-35"
                >
                  ↓ Next
                </button>
                {onPractise ? (
                  <button
                    type="button"
                    onClick={onPractise}
                    className="rounded-xl bg-emerald-500 px-2.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-emerald-400"
                  >
                    ✏️ Practise
                  </button>
                ) : (
                  <Link
                    href={`/topic/${current.topicId}?tab=practise`}
                    className="rounded-xl bg-emerald-500 px-2.5 py-2 text-xs font-extrabold text-slate-950 hover:bg-emerald-400"
                  >
                    ✏️ Practise
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Playlist Grid of Concept Shorts */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold">
              {topicId ? "All Concept Shorts in This Topic" : `Shorts Reel (${pool.length})`}
            </h3>
            <span className="text-xs text-ink-2">Tap any concept to jump straight in</span>
          </div>
          <div className="grid max-h-[76vh] gap-2.5 overflow-y-auto pr-1 sm:grid-cols-2">
            {pool.map((sh) => {
              const isCur = sh.id === current.id;
              const isDone = !!watched[sh.id];
              return (
                <button
                  key={sh.id}
                  type="button"
                  onClick={() => selectClip(sh, true)}
                  className={`card flex flex-col justify-between p-3.5 text-left transition-all hover:border-brand ${
                    isCur ? "border-2 border-brand ring-2 ring-brand/20" : ""
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 text-xs font-bold text-brand">
                      <span className="truncate">
                        {sh.topicIcon} {sh.topicShort} · #{sh.index}/{sh.totalInTopic}
                      </span>
                      <span className="shrink-0 rounded bg-surface-2 px-1.5 py-0.5 tabular-nums text-ink-2">
                        {fmtSec(sh.durationSec)}
                      </span>
                    </div>
                    <div className="mt-1 font-extrabold leading-snug">{sh.title}</div>
                    <p className="mt-1 line-clamp-2 text-xs text-ink-2">{sh.summary}</p>
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px] font-bold">
                    <span className={isCur ? "text-brand" : "text-ink-2"}>
                      {isCur ? "▶ Playing now" : "Tap to watch"}
                    </span>
                    {isDone ? <span className="text-good">Watched ✓</span> : null}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
