"use client";

import { useMemo } from "react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { QUESTION_INDEX } from "@/lib/topics";
import PaperRunner, { type RunnerItem } from "@/components/PaperRunner";

export default function ReviewPage() {
  const { progress } = useStore();

  const dueItems: RunnerItem[] = useMemo(() => {
    const now = Date.now();
    return progress.srs
      .filter((s) => s.due <= now)
      .map((s) => QUESTION_INDEX[s.qid])
      .filter(Boolean)
      .map((iq) => ({ kind: iq.kind, q: iq.question }));
  }, [progress.srs]);

  const upcoming = progress.srs.filter((s) => s.due > Date.now()).length;

  return (
    <div>
      <h1 className="text-2xl font-extrabold mb-1">🔁 Review</h1>
      <p className="text-slate-400 mb-5 text-sm">
        Spaced repetition resurfaces questions you missed, at growing intervals (1, 3, 7, 16, 35
        days). Getting one right moves it further away; missing it brings it back.
      </p>

      {dueItems.length > 0 ? (
        <PaperRunner items={dueItems} topicId="" title="Review" review />
      ) : (
        <div className="text-center py-12 bg-slate-900/60 border border-slate-700 rounded-2xl">
          <div className="text-4xl">✅</div>
          <p className="mt-2 font-semibold">Nothing due right now!</p>
          <p className="text-sm text-slate-400 mt-1">
            {upcoming > 0
              ? `${upcoming} question${upcoming > 1 ? "s" : ""} scheduled for later.`
              : "Miss a question in a quiz and it will appear here to revisit."}
          </p>
          <Link href="/" className="inline-block mt-4 text-indigo-300 hover:underline">
            ← Back to topics
          </Link>
        </div>
      )}
    </div>
  );
}
