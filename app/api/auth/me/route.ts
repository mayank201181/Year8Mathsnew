import { NextResponse } from "next/server";
import { currentAccount } from "@/lib/server/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const account = await currentAccount();
    return NextResponse.json({ account });
  } catch {
    return NextResponse.json({ account: null });
  }
}
