import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { checkPin, currentAccount, saveAccount } from "@/lib/server/auth";
import { deleteProgress } from "@/lib/server/progress";
import type { Profile } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const cleanName = (v: unknown) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, 24) : "");
const cleanAvatar = (v: unknown) => (typeof v === "string" && v.length > 0 && v.length <= 16 ? v : "🦊");

export async function POST(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!name) return NextResponse.json({ error: "Enter the learner's name." }, { status: 400 });
  if (account.profiles.length >= 8) return NextResponse.json({ error: "That's the maximum number of learners." }, { status: 400 });
  const profile: Profile = { id: randomBytes(6).toString("hex"), name, avatar: cleanAvatar(body.avatar), createdAt: Date.now() };
  account.profiles.push(profile);
  try {
    await saveAccount(account);
  } catch {
    return NextResponse.json({ error: "Couldn't save. Please try again." }, { status: 503 });
  }
  return NextResponse.json({ account, profile });
}

export async function PATCH(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const prof = account.profiles.find((p) => p.id === body.id);
  if (!prof) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  const name = cleanName(body.name);
  if (name) prof.name = name;
  if (typeof body.avatar === "string") prof.avatar = cleanAvatar(body.avatar);
  try {
    await saveAccount(account);
  } catch {
    return NextResponse.json({ error: "Couldn't save. Please try again." }, { status: 503 });
  }
  return NextResponse.json({ account });
}

export async function DELETE(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return NextResponse.json({ error: "Please sign in again." }, { status: 401 });
  const body = await req.json().catch(() => ({}));
  const pin = await checkPin(account.id, body.pin);
  if (!pin.ok) return NextResponse.json({ error: pin.error }, { status: pin.status });
  const before = account.profiles.length;
  account.profiles = account.profiles.filter((p) => p.id !== body.id);
  if (account.profiles.length === before) return NextResponse.json({ error: "Learner not found." }, { status: 404 });
  try {
    await saveAccount(account);
    await deleteProgress(account.id, String(body.id));
  } catch {
    return NextResponse.json({ error: "Couldn't save. Please try again." }, { status: 503 });
  }
  return NextResponse.json({ account });
}
