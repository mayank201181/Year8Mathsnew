import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ALL_DRILLS, drillById } from "@/lib/drills";
import { metaById } from "@/lib/topics/meta";
import { getTopic } from "@/lib/server/content";
import { DrillPage } from "@/components/DrillPage";

interface Params {
  skillId: string;
}

function decode(segment: string): string {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
}

export function generateStaticParams(): Params[] {
  return ALL_DRILLS.map((d) => ({ skillId: d.id }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { skillId } = await params;
  const drill = drillById(decode(skillId));
  if (!drill) return { title: "Skill not found" };
  const topic = metaById(drill.topicId);
  return {
    title: drill.title,
    description: `Unlimited practice on “${drill.title}”${topic ? ` (${topic.title})` : ""}, with fresh questions that adapt as you improve.`,
  };
}

export default async function DrillRoute({ params }: { params: Promise<Params> }) {
  const { skillId } = await params;
  const id = decode(skillId);
  const drill = drillById(id);
  if (!drill) notFound();
  // A topic without a finished guide has no page yet, so don't link to it.
  return <DrillPage skillId={id} topicReady={!!getTopic(drill.topicId)} />;
}
