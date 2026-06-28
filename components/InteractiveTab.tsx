"use client";

import type { Topic } from "@/lib/types";
import { getExtras } from "@/lib/extras";
import Explorable, { hasExplorable } from "./Explorables";

/** Resolve the list of widget keys for a topic (supports single or array). */
export function topicWidgets(topicId: string): string[] {
  const extras = getExtras(topicId);
  if (!extras) return [];
  const keys = extras.interactives ?? (extras.interactive ? [extras.interactive] : []);
  return keys.filter(hasExplorable);
}

export default function InteractiveTab({ topic }: { topic: Topic }) {
  const widgets = topicWidgets(topic.id);

  if (widgets.length === 0) {
    return <p className="text-slate-400">An interactive widget is being prepared for this topic.</p>;
  }

  return (
    <div className="space-y-4">
      <div className="bg-gradient-to-r from-teal-500/15 to-indigo-500/15 border border-teal-500/30 rounded-2xl p-4">
        <p className="text-sm">
          🔬 <strong>Play and discover.</strong> Change the inputs below and watch the maths respond live — the
          best way to build a feel for how {topic.title.toLowerCase()} really works.
        </p>
      </div>
      {widgets.map((w) => (
        <Explorable key={w} widget={w} />
      ))}
    </div>
  );
}
