import { NextResponse } from "next/server";
import { accountsEnabled, getAccount, getSecrets, lookupAccountIdByName, setSessionCookie, verifySecret } from "@/lib/server/auth";
import { LOGIN_ACCOUNT_RULE, LOGIN_CLIENT_RULE, clearAttempts, clientId, takeAttempt } from "@/lib/server/ratelimit";

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
    // Count this try before checking the password, so parallel guesses can't all slip
    // through: first for this client (a stranger can only lock themselves out), then for the
    // account as a whole (a looser cap on guessing spread over many addresses).
    const client = `${id}-${clientId(req)}`;
    for (const [scope, who, rule] of [["login-client", client, LOGIN_CLIENT_RULE], ["login", id, LOGIN_ACCOUNT_RULE]] as const) {
      const { wait } = await takeAttempt(scope, who, rule);
      const mins = Math.ceil(wait / 60);
      if (wait > 0) return NextResponse.json({ error: `Too many tries. Please wait ${mins} minute${mins === 1 ? "" : "s"}.` }, { status: 429 });
    }
    const secrets = await getSecrets(id);
    if (!secrets || !verifySecret(password, secrets.passwordHash)) return NextResponse.json({ error: WRONG }, { status: 401 });
    await clearAttempts("login-client", client);
    const account = await getAccount(id);
    if (!account) return NextResponse.json({ error: WRONG }, { status: 401 });
    const res = NextResponse.json({ account });
    setSessionCookie(res, id);
    return res;
  } catch {
    return NextResponse.json({ error: "Couldn't sign in right now. Please try again." }, { status: 503 });
  }
}
