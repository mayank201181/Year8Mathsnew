import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { currentAccount, saveAccount } from "@/lib/server/auth";
import type { Profile } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const account = await currentAccount();
  if (!account) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { name, avatar } = await req.json();
  if (!name) return NextResponse.json({ error: "Name required." }, { status: 400 });

  const profile: Profile = {
    id: randomBytes(6).toString("hex"),
    name,
    avatar: avatar ?? "🦊",
    createdAt: Date.now(),
  };
  account.profiles.push(profile);
  await saveAccount(account);
  return NextResponse.json({ account });
}

export async function PATCH(req: Request) {
  const account = await currentAccount();
  if (!account) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { id, name, avatar } = await req.json();
  const prof = account.profiles.find((p) => p.id === id);
  if (!prof) return NextResponse.json({ error: "Profile not found." }, { status: 404 });
  if (name) prof.name = name;
  if (avatar) prof.avatar = avatar;
  await saveAccount(account);
  return NextResponse.json({ account });
}

export async function DELETE(req: Request) {
  const account = await currentAccount();
  if (!account) return NextResponse.json({ error: "Not signed in." }, { status: 401 });

  const { id } = await req.json();
  account.profiles = account.profiles.filter((p) => p.id !== id);
  await saveAccount(account);
  return NextResponse.json({ account });
}
