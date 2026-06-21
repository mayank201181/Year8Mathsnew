"use client";

import { useMemo, useState } from "react";
import { useStore } from "@/lib/store";
import { nextRank } from "@/lib/ranks";

export default function Mascot() {
  const { progress } = useStore();
  const [dismissed, setDismissed] = useState(false);

  const dueCount = useMemo(
    () => progress.srs.filter((s) => s.due <= Date.now()).length,
    [progress.srs]
  );

  const message = useMemo(() => {
    if (dueCount > 0)
      return `You have ${dueCount} review question${dueCount > 1 ? "s" : ""} ready. A quick review locks learning in!`;
    if (progress.streak >= 2) return `🔥 ${progress.streak}-day streak — keep it alive today!`;
    const nr = nextRank(progress.stars);
    if (nr) return `${nr.minStars - progress.stars} more star${nr.minStars - progress.stars > 1 ? "s" : ""} to reach ${nr.name}!`;
    return "Pick a topic and try the discovery puzzle before reading the notes.";
  }, [dueCount, progress.streak, progress.stars]);

  if (dismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 z-30 max-w-[260px]">
      <div className="bg-slate-900 border border-slate-700 rounded-2xl shadow-xl p-3 flex gap-2">
        <div className="text-2xl animate-floaty">🦉</div>
        <div className="text-xs leading-snug">
          <div className="font-bold text-slate-200">Professor Pi</div>
          <p className="text-slate-400 mt-0.5">{message}</p>
        </div>
        <button
          onClick={() => setDismissed(true)}
          className="self-start text-slate-500 hover:text-slate-300"
          aria-label="Dismiss"
        >
          ✕
        </button>
      </div>
    </div>
  );
}
