import type { Metadata } from "next";
import { TopicsBrowser } from "@/components/TopicsBrowser";
import { topicSummaries } from "@/lib/server/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "All topics",
  description: "Every Year 8 maths topic across Number, Ratio & Proportion, Algebra, Geometry & Measure, and Statistics & Probability — with your mastery for each.",
};

export default function TopicsPage() {
  return <TopicsBrowser summaries={topicSummaries()} />;
}
