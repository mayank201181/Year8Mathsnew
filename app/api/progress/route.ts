import { NextResponse } from "next/server";
import { currentAccountId } from "@/lib/server/auth";
import { readJson, writeJson } from "@/lib/server/blob";
import type { ProgressDoc } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function key(accountId: string, profileId: string) {
  return `progress/${accountId}/${profileId}.json`;
}

export async function GET(req: Request) {
  const accountId = currentAccountId();
  if (!accountId) return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  const profileId = new URL(req.url).searchParams.get("profileId");
  if (!profileId) return NextResponse.json({ error: "profileId required." }, { status: 400 });

  const doc = await readJson<ProgressDoc>(key(accountId, profileId));
  if (!doc) return NextResponse.json({ error: "not found" }, { status: 404 });
  return NextResponse.json(doc);
}

export async function POST(req: Request) {
  const accountId = currentAccountId();
  if (!accountId) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { profileId, progress } = await req.json();
  if (!profileId || !progress) {
    return NextResponse.json({ error: "profileId and progress required." }, { status: 400 });
  }
  await writeJson(key(accountId, profileId), progress);
  return NextResponse.json({ ok: true });
}
