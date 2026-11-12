import { Suspense } from "react";
import type { Metadata } from "next";
import { EpisodesHub } from "@/components/EpisodesHub";

export const metadata: Metadata = {
  title: "Sitcom Episodes — Totally Raotional",
  description: "Animated sitcom episodes for every Year 8 Maths topic, with pause challenges.",
};

export default function EpisodesPage() {
  return (
    <Suspense fallback={<p className="p-6 text-ink-2">Loading episodes…</p>}>
      <EpisodesHub />
    </Suspense>
  );
}
