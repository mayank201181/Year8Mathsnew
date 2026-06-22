import { NextResponse } from "next/server";
import { blobConfigured } from "@/lib/server/blob";
import {
  getAccount,
  getSecrets,
  verifySecret,
  setSessionCookie,
  lookupAccountIdByName,
} from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!blobConfigured()) {
    return NextResponse.json({ error: "Accounts aren't set up on this deployment yet." }, { status: 503 });
  }
  const { name, password } = await req.json();
  if (!name || !password) {
    return NextResponse.json({ error: "Name and password are required." }, { status: 400 });
  }
  const id = await lookupAccountIdByName(name);
  if (!id) return NextResponse.json({ error: "No account with that name." }, { status: 401 });

  const secrets = await getSecrets(id);
  if (!secrets || !verifySecret(password, secrets.passwordHash)) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  const account = await getAccount(id);
  if (!account) return NextResponse.json({ error: "Account not found." }, { status: 404 });

  setSessionCookie(id);
  return NextResponse.json({ account });
}
