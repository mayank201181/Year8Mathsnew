import type { Metadata } from "next";
import { Suspense } from "react";
import { TopicsBrowser } from "@/components/TopicsBrowser";
import { topicSummaries } from "@/lib/server/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All topics",
  description: "Every Year 8 maths topic across Number, Ratio & Proportion, Algebra, Geometry & Measure, and Statistics & Probability — with your mastery for each.",
};

function TopicsFallback() {
  return (
    <div className="space-y-2" role="status">
      <h1 className="text-2xl font-black tracking-tight sm:text-3xl">All topics</h1>
      <p className="text-ink-2">Loading topics…</p>
    </div>
  );
}

export default function TopicsPage() {
  // TopicsBrowser reads ?strand= with useSearchParams, so it sits in its own Suspense boundary.
  return (
    <Suspense fallback={<TopicsFallback />}>
      <TopicsBrowser summaries={topicSummaries()} />
    </Suspense>
  );
}
