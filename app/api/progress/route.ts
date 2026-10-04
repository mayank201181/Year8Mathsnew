import { NextResponse } from "next/server";
import { checkPin, currentAccount } from "@/lib/server/auth";
import { getRawProgress, updateProgress } from "@/lib/server/progress";
import { importProgress, mergeProgress, normalizeProgress, sameProgress } from "@/lib/profileTypes";

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

/**
 * POST { profileId, progress, replace?, pin?, import? }
 * Saves are merged into the stored copy (lib/profileTypes mergeProgress), so a stale tab or
 * device can't erase newer work. Only `replace: true` with the parent PIN overwrites (a reset).
 * Replies { ok, updatedAt, progress? } — `progress` is the stored result when the client's copy
 * was missing something, so the client can merge it in.
 */
export async function POST(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const text = await req.text();
  if (text.length > MAX_BYTES) return NextResponse.json({ error: "Progress too large." }, { status: 413 });
  let body: { profileId?: unknown; progress?: unknown; replace?: unknown; pin?: unknown; import?: unknown };
  try {
    body = JSON.parse(text);
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
  const profileId = typeof body.profileId === "string" ? body.profileId : "";
  if (!account.profiles.some((p) => p.id === profileId)) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  const incoming = body.progress;
  if (!incoming || typeof incoming !== "object") return NextResponse.json({ error: "Bad request." }, { status: 400 });
  const replace = body.replace === true;
  if (replace) {
    // A deliberate reset: the parent PIN is required (checkPin rate-limits wrong guesses).
    const pin = await checkPin(account.id, body.pin);
    if (!pin.ok) return NextResponse.json({ error: pin.error }, { status: pin.status });
  }
  const isV2 = (v: unknown) => !!v && typeof v === "object" && (v as { v?: unknown }).v === 2;
  const doc = normalizeProgress(incoming);
  try {
    let refused = false;
    let result = doc;
    // Read-merge-write as one conditional update, so two devices saving at once both count.
    await updateProgress(account.id, profileId, (raw) => {
      // An old (v1) app tab must not write over progress already upgraded to v2.
      refused = !isV2(incoming) && isV2(raw);
      if (refused) return null;
      const stored = raw ? normalizeProgress(raw) : null;
      if (replace) result = { ...doc, resetAt: Math.max(Date.now(), (stored?.resetAt ?? 0) + 1) };
      // Guest progress is separate work: its counts are added (once), and it joins the current epoch.
      else if (body.import === true) result = importProgress(stored, doc);
      else {
        // Only a PIN-checked reset starts a new epoch.
        const own = stored && doc.resetAt > stored.resetAt ? { ...doc, resetAt: stored.resetAt } : doc;
        result = stored ? mergeProgress(stored, own) : own;
      }
      // Skip the Blob write when nothing changed (a stored v1 doc is always rewritten as v2).
      return stored && isV2(raw) && sameProgress(result, stored) ? null : result;
    });
    if (refused) return NextResponse.json({ error: "Please refresh the page — the app has been updated." }, { status: 409 });
    return NextResponse.json({ ok: true, updatedAt: result.updatedAt, ...(!replace && sameProgress(result, doc) ? {} : { progress: result }) });
  } catch {
    return NextResponse.json({ error: "Couldn't save progress." }, { status: 503 });
  }
}
