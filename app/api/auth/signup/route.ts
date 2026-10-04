import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { accountsEnabled, claimAccountName, discardAccount, hashSecret, lookupAccountIdByName, nameSlug, saveAccount, saveSecrets, setSessionCookie } from "@/lib/server/auth";
import { SIGNUP_RULE, clientId, takeAttempt } from "@/lib/server/ratelimit";
import type { Account } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const TAKEN = "That family name is already taken — try signing in instead.";

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
    if (await lookupAccountIdByName(name)) return NextResponse.json({ error: TAKEN }, { status: 409 });
    // Limit new accounts per client before the expensive part (two scrypt hashes, three writes):
    // each account also gets its own AI tutor allowance. Counted after the name check, so a
    // family trying names that turn out to be taken isn't locked out for an hour.
    const { wait } = await takeAttempt("signup", clientId(req), SIGNUP_RULE);
    if (wait > 0) return NextResponse.json({ error: "Too many new accounts from here. Please try again later." }, { status: 429 });
    const id = randomBytes(9).toString("hex");
    const account: Account = { id, name, profiles: [], createdAt: Date.now() };
    await saveSecrets(id, { passwordHash: hashSecret(password), pinHash: hashSecret(pin) });
    await saveAccount(account);
    // The name is claimed last and only if still free, so the index never points at an
    // account without secrets. Losing a race to another sign-up leaves nothing behind.
    if (!(await claimAccountName(name, id))) {
      await discardAccount(id).catch(() => {});
      return NextResponse.json({ error: TAKEN }, { status: 409 });
    }
    const res = NextResponse.json({ account });
    setSessionCookie(res, id);
    return res;
  } catch {
    return NextResponse.json({ error: "Couldn't create the account right now. Please try again." }, { status: 503 });
  }
}
