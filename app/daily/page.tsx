import type { Metadata } from "next";
import { DailyRunner } from "@/components/DailyRunner";
import { topicSummaries } from "@/lib/server/content";

// Content is static; the day's set is picked on the client from the learner's own progress.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Daily 5",
  description: "Five mixed questions from different topics, picked for you every day: this week's focus, spaced review, something to keep fresh and a stretch.",
};

export default function DailyPage() {
  return <DailyRunner summaries={topicSummaries()} />;
}
