import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { blobConfigured } from "@/lib/server/blob";
import {
  hashSecret,
  saveAccount,
  saveSecrets,
  setSessionCookie,
  lookupAccountIdByName,
  indexAccountName,
} from "@/lib/server/auth";
import type { Account } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!blobConfigured()) {
    return NextResponse.json(
      { error: "Accounts aren't set up on this deployment yet." },
      { status: 503 }
    );
  }
  const { name, password, pin } = await req.json();
  if (!name || !password || !/^\d{4}$/.test(pin ?? "")) {
    return NextResponse.json({ error: "Name, password and a 4-digit PIN are required." }, { status: 400 });
  }
  if ((password as string).length < 4) {
    return NextResponse.json({ error: "Password must be at least 4 characters." }, { status: 400 });
  }
  if (await lookupAccountIdByName(name)) {
    return NextResponse.json({ error: "That family name is taken — try signing in." }, { status: 409 });
  }

  const id = randomBytes(9).toString("hex");
  const account: Account = { id, name, profiles: [], createdAt: Date.now() };
  await saveAccount(account);
  await saveSecrets(id, { passwordHash: hashSecret(password), pinHash: hashSecret(pin) });
  await indexAccountName(name, id);
  setSessionCookie(id);
  return NextResponse.json({ account });
}
