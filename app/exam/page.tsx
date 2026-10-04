import type { Metadata } from "next";
import { getExamPapers, topicSummaries } from "@/lib/server/content";
import { TOPIC_META } from "@/lib/topics/meta";
import { ExamView } from "@/components/ExamView";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "The Big Exam",
  description: "Full mixed papers covering every Year 8 maths topic, marked at the end like a real exam, with a topic-by-topic breakdown.",
};

export default function ExamPage() {
  const papers = getExamPapers();
  const topicTitles = Object.fromEntries(TOPIC_META.map((t) => [t.id, t.title]));
  // For the "papers are being written" state: topics that already have practice papers.
  const practiceTopics = topicSummaries()
    .filter((t) => t.ready && t.paperIds.length > 0)
    .map((t) => ({ id: t.id, title: t.title, icon: t.icon }));
  return <ExamView papers={papers} topicTitles={topicTitles} practiceTopics={practiceTopics} />;
}
