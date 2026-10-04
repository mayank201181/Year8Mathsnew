import type { Metadata } from "next";
import { SkillsMap } from "@/components/SkillsMap";
import { TOPICS } from "@/lib/server/content";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Skills map",
  description: "Every Year 8 maths skill and how secure it is — from New to Mastered — with one-tap practice on your weakest skills.",
};

export default function SkillsPage() {
  // Only topics with a finished guide have a page to link to.
  return <SkillsMap readyTopicIds={TOPICS.map((t) => t.id)} />;
}
