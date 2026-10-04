import { HomeDashboard } from "@/components/HomeDashboard";
import { topicSummaries } from "@/lib/server/content";

// Content is static; everything learner-specific is rendered on the client from the store.
export const dynamic = "force-static";

export default function HomePage() {
  return <HomeDashboard summaries={topicSummaries()} />;
}
