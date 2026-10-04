import type { Metadata } from "next";
import { SprintRunner } from "@/components/SprintRunner";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Fluency sprint",
  description: "Quick-fire mental maths — times tables, negative numbers, fractions, decimals and percentages, powers and roots — timed or untimed.",
};

export default function SprintPage() {
  return <SprintRunner />;
}
