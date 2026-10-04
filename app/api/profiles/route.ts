import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { checkPin, currentAccount, currentAccountId, updateAccount } from "@/lib/server/auth";
import { deleteProgress } from "@/lib/server/progress";
import type { Profile } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Every change goes through updateAccount, which applies it to a fresh copy of the account
// just before writing, so learners added or edited at the same time on another device
// (or from the parent dashboard) aren't lost.

const cleanName = (v: unknown) => (typeof v === "string" ? v.replace(/\s+/g, " ").trim().slice(0, 24) : "");
const cleanAvatar = (v: unknown) => (typeof v === "string" && v.length > 0 && v.length <= 16 ? v : "🦊");

const SIGN_IN_AGAIN = () => NextResponse.json({ error: "Please sign in again." }, { status: 401 });
const NOT_FOUND = () => NextResponse.json({ error: "Learner not found." }, { status: 404 });
const SAVE_FAILED = () => NextResponse.json({ error: "Couldn't save. Please try again." }, { status: 503 });

export async function POST(req: Request) {
  const id = await currentAccountId().catch(() => null);
  if (!id) return SIGN_IN_AGAIN();
  const body = await req.json().catch(() => ({}));
  const name = cleanName(body.name);
  if (!name) return NextResponse.json({ error: "Enter the learner's name." }, { status: 400 });
  const profile: Profile = { id: randomBytes(6).toString("hex"), name, avatar: cleanAvatar(body.avatar), createdAt: Date.now() };
  let result;
  try {
    result = await updateAccount(id, (acc) => (acc.profiles.length >= 8 ? null : { ...acc, profiles: [...acc.profiles, profile] }));
  } catch {
    return SAVE_FAILED();
  }
  if (!result.account) return SIGN_IN_AGAIN();
  if (!result.changed) return NextResponse.json({ error: "That's the maximum number of learners." }, { status: 400 });
  return NextResponse.json({ account: result.account, profile });
}

export async function PATCH(req: Request) {
  const id = await currentAccountId().catch(() => null);
  if (!id) return SIGN_IN_AGAIN();
  const body = await req.json().catch(() => ({}));
  const name = cleanName(body.name);
  const avatar = typeof body.avatar === "string" ? cleanAvatar(body.avatar) : null;
  let result;
  try {
    result = await updateAccount(id, (acc) =>
      acc.profiles.some((p) => p.id === body.id)
        ? { ...acc, profiles: acc.profiles.map((p) => (p.id === body.id ? { ...p, ...(name ? { name } : {}), ...(avatar ? { avatar } : {}) } : p)) }
        : null,
    );
  } catch {
    return SAVE_FAILED();
  }
  if (!result.account) return SIGN_IN_AGAIN();
  if (!result.changed) return NOT_FOUND();
  return NextResponse.json({ account: result.account });
}

export async function DELETE(req: Request) {
  const account = await currentAccount().catch(() => null);
  if (!account) return SIGN_IN_AGAIN();
  const body = await req.json().catch(() => ({}));
  const pin = await checkPin(account.id, body.pin);
  if (!pin.ok) return NextResponse.json({ error: pin.error }, { status: pin.status });
  let result;
  try {
    // Not the copy loaded before the PIN check: that may be out of date by now.
    result = await updateAccount(account.id, (acc) => (acc.profiles.some((p) => p.id === body.id) ? { ...acc, profiles: acc.profiles.filter((p) => p.id !== body.id) } : null));
    if (!result.account) return SIGN_IN_AGAIN();
    if (!result.changed) return NOT_FOUND();
    // Only once the learner is really gone from the account.
    await deleteProgress(account.id, String(body.id));
  } catch {
    return SAVE_FAILED();
  }
  return NextResponse.json({ account: result.account });
}
