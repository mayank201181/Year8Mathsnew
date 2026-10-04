import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { accountsEnabled, hashSecret, indexAccountName, lookupAccountIdByName, nameSlug, saveAccount, saveSecrets, setSessionCookie } from "@/lib/server/auth";
import type { Account } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!accountsEnabled()) return NextResponse.json({ error: "Family accounts aren't set up on this site yet — you can still practise as a guest." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name.trim().slice(0, 40) : "";
  const password = typeof body.password === "string" ? body.password : "";
  const pin = typeof body.pin === "string" ? body.pin.trim() : "";
  if (nameSlug(name).length < 2) return NextResponse.json({ error: "Choose a family name with at least 2 letters or numbers." }, { status: 400 });
  if (password.length < 6) return NextResponse.json({ error: "Use a password of at least 6 characters." }, { status: 400 });
  if (password.length > 200) return NextResponse.json({ error: "That password is too long." }, { status: 400 });
  if (!/^\d{4,8}$/.test(pin)) return NextResponse.json({ error: "The parent PIN must be 4–8 digits." }, { status: 400 });
  try {
    if (await lookupAccountIdByName(name)) return NextResponse.json({ error: "That family name is already taken — try signing in instead." }, { status: 409 });
    const id = randomBytes(9).toString("hex");
    const account: Account = { id, name, profiles: [], createdAt: Date.now() };
    await saveSecrets(id, { passwordHash: hashSecret(password), pinHash: hashSecret(pin) });
    await saveAccount(account);
    await indexAccountName(name, id);
    const res = NextResponse.json({ account });
    setSessionCookie(res, id);
    return res;
  } catch {
    return NextResponse.json({ error: "Couldn't create the account right now. Please try again." }, { status: 503 });
  }
}
