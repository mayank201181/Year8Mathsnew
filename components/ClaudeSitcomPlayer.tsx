"use client";
// The Claude Sitcom episode for one topic, embedded from public/lessons/sitcom-<id>.html?embed=1.
// The player (lessons/engine/engine.js) talks to this page with postMessage:
//   episode → app: hello {chapters}, height {value}, chapter-done {chapter}, complete, theater {on}
//   app → episode: watched {ids}  (ticks scenes this learner finished, on any device)
// Each finished scene earns one star, once (store key claude-sitcom:<topic>:<scene>), and that
// same key is how the player learns which scenes to tick.
import { useEffect, useRef, useState } from "react";
import { useStore } from "@/lib/store";
import { claudeSitcomHref, claudeSitcomSceneKey, type ClaudeSitcomMessage } from "@/lib/claudeSitcom";

const SCENE_STARS = 1;

/** Store flag (no stars) for playing the whole episode to the end. */
export const claudeSitcomDoneKey = (topicId: string) => `claude-sitcom:${topicId}`;

export function ClaudeSitcomPlayer({ topicId, title, theme }: { topicId: string; title: string; theme: "light" | "dark" }) {
  const { data, award } = useStore();
  const frame = useRef<HTMLIFrameElement>(null);
  const [height, setHeight] = useState(760);
  const [theater, setTheater] = useState(false);
  const [scenes, setScenes] = useState<string[]>([]);

  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.origin !== window.location.origin || !frame.current || e.source !== frame.current.contentWindow) return;
      const m = e.data as ClaudeSitcomMessage;
      if (!m || m.source !== "y8-lesson" || m.topic !== topicId) return;
      if (m.type === "hello") {
        setScenes(Array.isArray(m.chapters) ? m.chapters.filter((x): x is string => typeof x === "string") : []);
      } else if (m.type === "height") {
        if (typeof m.value === "number" && m.value > 200 && m.value < 20000) setHeight(Math.ceil(m.value));
      } else if (m.type === "chapter-done") {
        if (typeof m.chapter === "string" && m.chapter.length <= 80) award(claudeSitcomSceneKey(topicId, m.chapter), SCENE_STARS);
      } else if (m.type === "complete") {
        award(claudeSitcomDoneKey(topicId), 0);
      } else if (m.type === "theater") {
        setTheater(m.on === true);
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [topicId, award]);

  // Tell the player which scenes are already done (again whenever progress changes, e.g. a cloud load).
  const watched = scenes.filter((id) => data.awarded[claudeSitcomSceneKey(topicId, id)]);
  const watchedKey = watched.join("|");
  useEffect(() => {
    if (!scenes.length) return;
    const win = frame.current?.contentWindow;
    if (!win) return;
    win.postMessage({ source: "y8-app", type: "watched", ids: watchedKey ? watchedKey.split("|") : [] }, window.location.origin);
    // Forward-compatible: the current engine keeps its own (light) page theme when embedded.
    win.postMessage({ source: "y8-app", type: "theme", theme }, window.location.origin);
  }, [scenes.length, watchedKey, theme]);

  // While the episode fills the screen (phones without element full screen), stop the page behind it scrolling.
  useEffect(() => {
    if (!theater) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [theater]);

  const allDone = scenes.length > 0 && watched.length === scenes.length;

  return (
    <div className="space-y-3">
      {scenes.length > 0 ? (
        <div className="flex flex-wrap items-center justify-between gap-2 px-1">
          <p className="text-sm text-ink-2">Earn a ⭐ for every scene you watch to the end.</p>
          <span className="chip border-0 bg-good-soft text-good">
            {allDone ? "✓ All scenes watched" : `${watched.length} of ${scenes.length} scenes watched`}
          </span>
        </div>
      ) : null}
      <div className={theater ? "fixed inset-0 z-[100] bg-[#05101A]" : undefined}>
        <iframe
          ref={frame}
          src={`${claudeSitcomHref(topicId)}?embed=1`}
          title={`${title}: Claude Sitcom`}
          className="block w-full rounded-xl border-0"
          style={theater ? { height: "100%" } : { height }}
          allow="fullscreen; autoplay; screen-wake-lock"
          allowFullScreen
        />
      </div>
    </div>
  );
}
