import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { topicSummaries } from "@/lib/server/content";
import { TOPIC_META, metaById } from "@/lib/topics/meta";
import { Certificate } from "@/components/Certificate";

// One page per topic plus the whole-year certificate; anything else is a 404.
export const dynamicParams = false;

export function generateStaticParams(): { id: string }[] {
  return [...TOPIC_META.map((t) => ({ id: t.id })), { id: "year8" }];
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  if (id === "year8") return { title: "Year 8 Maths certificate" };
  const meta = metaById(id);
  return { title: meta ? `${meta.title} certificate` : "Certificate" };
}

export default async function CertificatePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const summaries = topicSummaries();
  if (id === "year8") return <Certificate kind="year8" summaries={summaries} />;
  const topic = summaries.find((s) => s.id === id);
  if (!topic) notFound();
  return <Certificate kind="topic" topic={topic} summaries={summaries} />;
}
