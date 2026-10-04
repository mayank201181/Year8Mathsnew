import { NextResponse } from "next/server";
import { accountsEnabled, getAccount, getSecrets, lookupAccountIdByName, setSessionCookie, verifySecret } from "@/lib/server/auth";
import { clearFailures, lockedFor, recordFailure } from "@/lib/server/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const WRONG = "That family name and password don't match.";

export async function POST(req: Request) {
  if (!accountsEnabled()) return NextResponse.json({ error: "Family accounts aren't set up on this site yet." }, { status: 503 });
  const body = await req.json().catch(() => ({}));
  const name = typeof body.name === "string" ? body.name : "";
  const password = typeof body.password === "string" ? body.password : "";
  if (!name.trim() || !password) return NextResponse.json({ error: "Enter your family name and password." }, { status: 400 });
  try {
    const id = await lookupAccountIdByName(name);
    if (!id) return NextResponse.json({ error: WRONG }, { status: 401 });
    const wait = await lockedFor("login", id);
    if (wait > 0) return NextResponse.json({ error: `Too many tries. Please wait ${Math.ceil(wait / 60)} minutes.` }, { status: 429 });
    const secrets = await getSecrets(id);
    if (!secrets || !verifySecret(password, secrets.passwordHash)) {
      await recordFailure("login", id);
      return NextResponse.json({ error: WRONG }, { status: 401 });
    }
    await clearFailures("login", id);
    const account = await getAccount(id);
    if (!account) return NextResponse.json({ error: WRONG }, { status: 401 });
    const res = NextResponse.json({ account });
    setSessionCookie(res, id);
    return res;
  } catch {
    return NextResponse.json({ error: "Couldn't sign in right now. Please try again." }, { status: 503 });
  }
}
