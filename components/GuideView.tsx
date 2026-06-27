"use client";

import { useState } from "react";
import type { Topic } from "@/lib/types";
import { getExtras } from "@/lib/extras";
import { useStore } from "@/lib/store";
import { MarkdownLite } from "@/lib/md";
import { topicWidgets } from "./InteractiveTab";

function Diagram({ svg }: { svg: string }) {
  return <div className="diagram my-3" dangerouslySetInnerHTML={{ __html: svg }} />;
}

function DiscoveryBox({ problem, idea }: { problem: string; idea: string }) {
  const [show, setShow] = useState(false);
  return (
    <div className="bg-teal-500/10 border border-teal-500/30 rounded-xl p-4 mb-3">
      <p className="text-xs uppercase tracking-wide text-teal-300 font-bold mb-1">
        🔎 Try this first
      </p>
      <p className="text-sm">{problem}</p>
      {show ? (
        <p className="text-sm mt-2 text-teal-100">
          <strong>The idea: </strong>
          {idea}
        </p>
      ) : (
        <button onClick={() => setShow(true)} className="mt-2 text-sm text-teal-300 hover:underline">
          Reveal the idea →
        </button>
      )}
    </div>
  );
}

function readAloud(text: string) {
  if (typeof window === "undefined" || !window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.rate = 0.95;
  window.speechSynthesis.speak(u);
}

export default function GuideView({
  topic,
  onOpenInteractive,
}: {
  topic: Topic;
  onOpenInteractive?: () => void;
}) {
  const { progress, markGuideRead } = useStore();
  const extras = getExtras(topic.id);
  const read = progress.guidesRead.includes(topic.id);
  const hasInteractive = topicWidgets(topic.id).length > 0;

  return (
    <div className="space-y-5">
      {extras?.hook && (
        <div className="bg-gradient-to-r from-indigo-600/25 to-teal-500/20 border border-indigo-500/30 rounded-2xl p-4">
          <p className="text-indigo-100">✨ {extras.hook}</p>
        </div>
      )}

      <p className="text-slate-300">{topic.intro}</p>

      {hasInteractive && (
        <button
          onClick={onOpenInteractive}
          className="w-full text-left bg-gradient-to-r from-teal-500/15 to-indigo-500/15 border border-teal-500/30 rounded-2xl p-4 hover:border-teal-400 transition"
        >
          <p className="text-sm">
            🔬 <strong>Interactive tab:</strong> play with a live {topic.title.toLowerCase()} widget —
            change the inputs and watch the maths respond. <span className="text-teal-300">Open it →</span>
          </p>
        </button>
      )}

      {topic.guide.map((section, i) => (
        <section key={i} className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-lg font-bold text-indigo-300">{section.heading}</h2>
            <button
              onClick={() =>
                readAloud(`${section.heading}. ${section.body.replace(/[*`]/g, "")}`)
              }
              className="text-slate-500 hover:text-slate-200 text-sm shrink-0"
              title="Read aloud"
            >
              🔊
            </button>
          </div>

          <div className="mt-3">
            {section.discovery && (
              <DiscoveryBox problem={section.discovery.problem} idea={section.discovery.idea} />
            )}
            <MarkdownLite text={section.body} />

            {section.diagrams?.map((svg, j) => <Diagram key={j} svg={svg} />)}

            {section.keyPoints && section.keyPoints.length > 0 && (
              <ul className="mt-2 space-y-1">
                {section.keyPoints.map((kp, j) => (
                  <li key={j} className="flex gap-2 text-sm">
                    <span className="text-teal-400">▸</span>
                    <span>{kp}</span>
                  </li>
                ))}
              </ul>
            )}

            {section.whyItWorks && (
              <div className="mt-3 bg-slate-800/60 border-l-4 border-amber-400 rounded px-3 py-2 text-sm">
                <strong className="text-amber-300">Why does this work? </strong>
                {section.whyItWorks}
              </div>
            )}

            {section.strategies && section.strategies.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {section.strategies.map((s, j) => (
                  <span key={j} className="text-xs bg-slate-800 text-slate-300 rounded-full px-2.5 py-0.5">
                    🧠 {s}
                  </span>
                ))}
              </div>
            )}

            {section.thinkDeeper && (
              <p className="mt-3 text-sm text-slate-400 italic">🤔 {section.thinkDeeper}</p>
            )}
          </div>
        </section>
      ))}

      {/* Engagement extras */}
      {extras?.didYouKnow && extras.didYouKnow.length > 0 && (
        <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-bold mb-2">💡 Did you know?</h3>
          <ul className="space-y-1.5 text-sm text-slate-300">
            {extras.didYouKnow.map((f, i) => (
              <li key={i}>• {f}</li>
            ))}
          </ul>
        </section>
      )}

      {extras?.experiments && extras.experiments.length > 0 && (
        <section className="bg-slate-900/60 border border-slate-700 rounded-2xl p-5">
          <h3 className="font-bold mb-2">🧪 Try this at home</h3>
          {extras.experiments.map((ex, i) => (
            <div key={i} className="mb-3">
              <p className="font-semibold text-slate-200">{ex.title}</p>
              {ex.materials && (
                <p className="text-xs text-slate-400 mt-0.5">You need: {ex.materials.join(", ")}</p>
              )}
              <ol className="list-decimal list-inside text-sm text-slate-300 mt-1">
                {ex.steps.map((s, j) => (
                  <li key={j}>{s}</li>
                ))}
              </ol>
              {ex.whatToNotice && (
                <p className="text-xs text-teal-300 mt-1">Notice: {ex.whatToNotice}</p>
              )}
            </div>
          ))}
        </section>
      )}

      <div className="flex items-center gap-3">
        <button
          onClick={() => markGuideRead(topic.id, topic.id)}
          disabled={read}
          className={`rounded-lg px-4 py-2 text-sm font-semibold ${
            read ? "bg-emerald-500/20 text-emerald-300" : "bg-indigo-500 hover:bg-indigo-400"
          }`}
        >
          {read ? "✓ Marked as read" : "Mark guide as read (+1 ⭐)"}
        </button>
      </div>
    </div>
  );
}
