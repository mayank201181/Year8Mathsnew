import { NextResponse } from "next/server";
import { accountsEnabled, currentAccount } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const accounts = accountsEnabled();
  if (!accounts) return NextResponse.json({ account: null, accounts });
  try {
    return NextResponse.json({ account: await currentAccount(), accounts });
  } catch {
    return NextResponse.json({ error: "Couldn't reach the account service." }, { status: 503 });
  }
}
