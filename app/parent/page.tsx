import type { Metadata } from "next";
import { ParentView } from "@/components/ParentView";
import { topicSummaries } from "@/lib/server/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Parent dashboard",
  description: "A PIN-protected view of each learner's practice, accuracy, skills and where to help.",
  robots: { index: false, follow: false },
};

export default function ParentPage() {
  return <ParentView summaries={topicSummaries()} />;
}
