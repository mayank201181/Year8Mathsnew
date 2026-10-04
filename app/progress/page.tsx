import type { Metadata } from "next";
import { ProgressView } from "@/components/ProgressView";
import { topicSummaries } from "@/lib/server/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Your progress",
  description: "Your rank, stars, time, accuracy, topic mastery and goals.",
};

export default function ProgressPage() {
  return <ProgressView summaries={topicSummaries()} />;
}
