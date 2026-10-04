// /topic/[id] — one topic: Learn · Practise · Challenge · Explore · Revise.
// Server component: reads the (large) content registry and hands the topic to
// the client view as props.
import { Suspense } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TOPICS, getExtras, getTopic } from "@/lib/server/content";
import { TopicView, type TopicLink } from "@/components/TopicView";

export function generateStaticParams(): { id: string }[] {
  return TOPICS.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const topic = getTopic(id);
  if (!topic) return { title: "Topic not found" };
  // Summaries may contain content markup ({{maths}}, **bold**) — keep the meta description plain.
  const description = topic.summary.replace(/\{\{|\}\}|\*\*|`/g, "").trim();
  return { title: topic.title, description: description || undefined };
}

function TopicFallback() {
  return (
    <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 text-ink-2" role="status">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-brand-soft border-t-brand" aria-hidden />
      <span>Opening the topic…</span>
    </div>
  );
}

export default async function TopicPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const topic = getTopic(id);
  if (!topic) notFound();

  // TOPICS keeps TOPIC_META order and contains only ready topics.
  const i = TOPICS.findIndex((t) => t.id === id);
  const link = (n: number): TopicLink | null => {
    const t = TOPICS[n];
    return t ? { id: t.id, title: t.title, icon: t.icon } : null;
  };

  return (
    // The view reads ?tab= with useSearchParams, so it renders below a Suspense boundary.
    <Suspense fallback={<TopicFallback />}>
      <TopicView topic={topic} extras={getExtras(id)} neighbours={{ prev: link(i - 1), next: link(i + 1) }} />
    </Suspense>
  );
}
