"use client";
// Plays one "Totally Raotional" sitcom episode and records it as watched (90% viewed)
// in the same localStorage object the Watch tab already uses (y8m2:watch-v1).
import { useRef, useSyncExternalStore } from "react";
import type { SitcomEpisode } from "@/lib/sitcom";

const KEY = "y8m2:watch-v1";
const EVENT = "y8m2-episode-watched";

interface WatchStore {
  completedMc?: Record<string, boolean>;
  completedSitcom?: Record<string, boolean>;
  completedEpisode?: Record<string, boolean>;
}

function readStore(): WatchStore {
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "{}") as WatchStore;
  } catch {
    return {};
  }
}

export function markEpisodeWatched(topicId: string): void {
  try {
    const s = readStore();
    if (s.completedEpisode?.[topicId]) return;
    s.completedEpisode = { ...(s.completedEpisode ?? {}), [topicId]: true };
    localStorage.setItem(KEY, JSON.stringify(s));
    window.dispatchEvent(new Event(EVENT));
  } catch {
    // Storage unavailable (private mode): watching still works, it just isn't remembered.
  }
}

function subscribe(onChange: () => void): () => void {
  window.addEventListener(EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function snapshot(): string {
  try {
    return localStorage.getItem(KEY) ?? "";
  } catch {
    return "";
  }
}

/** Topic ids whose episode has been watched. Re-renders when any player marks one. */
export function useWatchedEpisodes(): Record<string, boolean> {
  const raw = useSyncExternalStore(subscribe, snapshot, () => "");
  if (!raw) return {};
  try {
    return (JSON.parse(raw) as WatchStore).completedEpisode ?? {};
  } catch {
    return {};
  }
}

export function formatDuration(sec: number): string {
  return `${Math.floor(sec / 60)}:${String(sec % 60).padStart(2, "0")}`;
}

export function EpisodePlayer({
  episode,
  autoPlay = false,
  onEnded,
}: {
  episode: SitcomEpisode;
  autoPlay?: boolean;
  onEnded?: () => void;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  return (
    <video
      ref={ref}
      key={episode.src}
      src={episode.src}
      poster={episode.poster}
      controls
      playsInline
      preload="metadata"
      autoPlay={autoPlay}
      className="aspect-video w-full rounded-xl bg-black"
      onTimeUpdate={() => {
        const v = ref.current;
        if (v && v.duration && v.currentTime / v.duration > 0.9) markEpisodeWatched(episode.topicId);
      }}
      onEnded={() => {
        markEpisodeWatched(episode.topicId);
        onEnded?.();
      }}
    >
      Your browser can&apos;t play this video.
    </video>
  );
}
