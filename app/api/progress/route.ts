import { NextResponse } from "next/server";
import { currentAccount } from "@/lib/server/auth";
import { getRawProgress, saveProgress } from "@/lib/server/progress";
import { normalizeProgress } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 900_000;

export async function GET(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const profileId = new URL(req.url).searchParams.get("profileId") ?? "";
  if (!account.profiles.some((p) => p.id === profileId)) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  try {
    const raw = await getRawProgress(account.id, profileId);
    return NextResponse.json({ progress: raw ? normalizeProgress(raw) : null }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Couldn't load progress." }, { status: 503 });
  }
}

export async function POST(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "Progress too large." }, { status: 413 });
  let body: { profileId?: unknown; progress?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const profileId = typeof body.profileId === "string" ? body.profileId : "";
  if (!account.profiles.some((p) => p.id === profileId)) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  const incoming = body.progress;
  if (!incoming || typeof incoming !== "object") return NextResponse.json({ error: "Bad request." }, { status: 400 });
  try {
    // An old (v1) app tab must not overwrite progress already upgraded to v2.
    if ((incoming as { v?: unknown }).v !== 2) {
      const existing = await getRawProgress(account.id, profileId);
      if (existing && (existing as { v?: unknown }).v === 2) {
        return NextResponse.json({ error: "Please refresh the page — the app has been updated." }, { status: 409 });
      }
    }
    await saveProgress(account.id, profileId, normalizeProgress(incoming));
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "Couldn't save progress." }, { status: 503 });
  }
}
