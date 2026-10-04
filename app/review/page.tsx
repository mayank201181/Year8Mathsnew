import type { Metadata } from "next";
import { ReviewView } from "@/components/ReviewView";

// The due list comes from the learner's progress on the client.
export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Review",
  description: "Spaced review: questions you missed and skills due a check come back at just the right moment — 1, 3, 7, 16 and 35 days apart.",
};

export default function ReviewPage() {
  return <ReviewView />;
}
