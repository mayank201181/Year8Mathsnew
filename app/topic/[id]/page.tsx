"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { useMemo, useState } from "react";
import { getTopic } from "@/lib/topics";
import GuideView from "@/components/GuideView";
import PaperRunner, { type RunnerItem } from "@/components/PaperRunner";
import AskAI from "@/components/AskAI";
import Flashcards from "@/components/Flashcards";
import InteractiveTab from "@/components/InteractiveTab";

type Tab = "guide" | "interactive" | "learn" | "practice" | "challenge";

export default function TopicPage() {
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : params.id?.[0] ?? "";
  const topic = getTopic(id);
  const [tab, setTab] = useState<Tab>("guide");

  const practiceItems: RunnerItem[] = useMemo(() => {
    if (!topic) return [];
    return [
      ...topic.quiz.mcq.map((q) => ({ kind: "mcq" as const, q })),
      ...topic.quiz.qa.map((q) => ({ kind: "qa" as const, q })),
    ];
  }, [topic]);

  const challengeItems: RunnerItem[] = useMemo(() => {
    if (!topic) return [];
    const all: RunnerItem[] = [
      ...topic.quiz.mcq.map((q) => ({ kind: "mcq" as const, q })),
      ...topic.quiz.qa.map((q) => ({ kind: "qa" as const, q })),
      ...topic.questionBank.mcqPapers.flatMap((p) => p.questions.map((q) => ({ kind: "mcq" as const, q }))),
      ...topic.questionBank.qaPapers.flatMap((p) => p.questions.map((q) => ({ kind: "qa" as const, q }))),
    ];
    return all.filter((i) => i.q.difficulty === "challenge");
  }, [topic]);

  if (!topic) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-400">Topic not found.</p>
        <Link href="/" className="text-indigo-300 hover:underline">
          ← Back to topics
        </Link>
      </div>
    );
  }

  const TABS: { key: Tab; label: string; emoji: string }[] = [
    { key: "guide", label: "Guide", emoji: "📘" },
    { key: "interactive", label: "Interactive", emoji: "🔬" },
    { key: "learn", label: "Flashcards", emoji: "🃏" },
    { key: "practice", label: "Practice", emoji: "✅" },
    { key: "challenge", label: "Challenge", emoji: "🧠" },
  ];

  return (
    <div>
      <Link href="/" className="text-sm text-slate-400 hover:text-slate-200">
        ← All topics
      </Link>
      <div className="flex items-center gap-3 mt-2 mb-4">
        <span className="text-4xl">{topic.icon}</span>
        <div>
          <h1 className="text-2xl font-extrabold">{topic.title}</h1>
          <p className="text-sm text-slate-400">{topic.strand}</p>
        </div>
      </div>

      <div className="flex gap-1.5 flex-wrap mb-5 sticky top-16 z-20 bg-slate-950/60 backdrop-blur py-1 rounded-xl">
        {TABS.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`px-3.5 py-1.5 rounded-lg text-sm font-semibold ${
              tab === t.key ? "bg-indigo-500 text-white" : "bg-slate-800/70 text-slate-300 hover:bg-slate-700"
            }`}
          >
            {t.emoji} {t.label}
          </button>
        ))}
      </div>

      {tab === "guide" && <GuideView topic={topic} onOpenInteractive={() => setTab("interactive")} />}
      {tab === "interactive" && <InteractiveTab topic={topic} />}
      {tab === "learn" && <Flashcards cards={topic.learn.cards} />}
      {tab === "practice" && (
        <PaperRunner items={practiceItems} topicId={topic.id} title="Practice" />
      )}
      {tab === "challenge" && (
        <div>
          <p className="text-sm text-slate-400 mb-3">
            🧠 The toughest problems in this topic. Try each one properly before revealing hints — that
            struggle is where the learning happens.
          </p>
          {challengeItems.length > 0 ? (
            <PaperRunner items={challengeItems} topicId={topic.id} title="Challenge" />
          ) : (
            <p className="text-slate-400">Challenge problems are being prepared for this topic.</p>
          )}
        </div>
      )}

      <AskAI context={topic.title} />
    </div>
  );
}
