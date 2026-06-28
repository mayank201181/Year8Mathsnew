"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { comprehensiveExam } from "@/lib/exam";
import PaperRunner, { type RunnerItem } from "@/components/PaperRunner";

export default function ExamPage() {
  const [started, setStarted] = useState(false);

  const items: RunnerItem[] = useMemo(() => {
    const mcq = comprehensiveExam.mcqPapers.flatMap((p) =>
      p.questions.map((q) => ({ kind: "mcq" as const, q }))
    );
    const qa = comprehensiveExam.qaPapers.flatMap((p) =>
      p.questions.map((q) => ({ kind: "qa" as const, q }))
    );
    return [...mcq, ...qa];
  }, []);

  if (!started) {
    return (
      <div className="max-w-xl mx-auto text-center py-10">
        <div className="text-5xl mb-3">📝</div>
        <h1 className="text-2xl font-extrabold">The Big Exam</h1>
        <p className="text-slate-400 mt-2">
          A cross-topic paper mixing every strand — Number, Algebra, Ratio, Geometry and Statistics.
          Work each question on paper, then check yourself. {items.length} questions.
        </p>
        <button
          onClick={() => setStarted(true)}
          className="mt-5 bg-indigo-500 hover:bg-indigo-400 rounded-xl px-6 py-3 font-semibold"
        >
          Start the exam →
        </button>
        <div className="mt-4">
          <Link href="/" className="text-sm text-slate-500 hover:text-slate-300">
            ← Back home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-4">📝 The Big Exam</h1>
      <PaperRunner items={items} topicId="" title="Big Exam" />
    </div>
  );
}
