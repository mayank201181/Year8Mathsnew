import { NextResponse } from "next/server";
import { QUESTION_INDEX } from "@/lib/server/content";
import type { IndexedQuestion } from "@/lib/types";

export const runtime = "nodejs";

// GET /api/questions?ids=a,b,c → { questions: { [qid]: IndexedQuestion } }
export async function GET(req: Request) {
  const ids = (new URL(req.url).searchParams.get("ids") ?? "").split(",").map((s) => s.trim()).filter(Boolean).slice(0, 60);
  const questions: Record<string, IndexedQuestion> = {};
  for (const id of ids) {
    const q = QUESTION_INDEX.get(id);
    if (q) questions[id] = q;
  }
  return NextResponse.json({ questions }, { headers: { "Cache-Control": "public, max-age=300" } });
}
