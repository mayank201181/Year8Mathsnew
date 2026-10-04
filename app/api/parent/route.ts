import { NextResponse } from "next/server";
import { checkPin, currentAccount, updateAccount } from "@/lib/server/auth";
import { getProgress } from "@/lib/server/progress";
import { TOPIC_META } from "@/lib/topics/meta";
import type { Profile } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TOPIC_IDS = new Set(TOPIC_META.map((t) => t.id));

function newSettings(prof: Profile, body: { focusTopics?: unknown; goalMinutes?: unknown }): Profile["settings"] {
  const focus = Array.isArray(body.focusTopics) ? body.focusTopics.filter((t: unknown): t is string => typeof t === "string" && TOPIC_IDS.has(t)).slice(0, 6) : prof.settings?.focusTopics ?? [];
  const goal = typeof body.goalMinutes === "number" && Number.isFinite(body.goalMinutes) ? Math.max(5, Math.min(60, Math.round(body.goalMinutes))) : prof.settings?.goalMinutes;
  return { ...prof.settings, focusTopics: focus, ...(goal ? { goalMinutes: goal } : {}) };
}

/**
 * POST { pin, action?: "verify" | "load" | "settings", profileId?, focusTopics?, goalMinutes? }
 */
export async function POST(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "The parent dashboard needs a family account — please sign in." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const pin = await checkPin(account.id, body.pin);
  if (!pin.ok) return NextResponse.json({ error: pin.error }, { status: pin.status });
  const action = body.action ?? "load";
  if (action === "verify") return NextResponse.json({ ok: true });

  if (action === "settings") {
    let result;
    try {
      // Applied to a fresh copy of the account, not the one loaded before the PIN check, so a
      // learner added or renamed meanwhile on another device isn't reverted or dropped.
      result = await updateAccount(account.id, (acc) =>
        acc.profiles.some((p) => p.id === body.profileId)
          ? { ...acc, profiles: acc.profiles.map((p) => (p.id === body.profileId ? { ...p, settings: newSettings(p, body) } : p)) }
          : null,
      );
    } catch {
      return NextResponse.json({ error: "Couldn't save. Please try again." }, { status: 503 });
    }
    if (!result.changed) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
    return NextResponse.json({ ok: true, account: result.account });
  }

  try {
    const learners = await Promise.all(
      account.profiles.map(async (profile) => ({ profile, progress: await getProgress(account.id, profile.id) })),
    );
    return NextResponse.json({ account: { id: account.id, name: account.name }, learners }, { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Couldn't load progress right now." }, { status: 503 });
  }
}
