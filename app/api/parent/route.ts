import { NextResponse } from "next/server";
import { currentAccount, currentAccountId, getSecrets, verifySecret } from "@/lib/server/auth";
import { readJson } from "@/lib/server/blob";
import type { ProgressDoc } from "@/lib/profileTypes";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const accountId = currentAccountId();
  const account = await currentAccount();
  if (!accountId || !account) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }
  const { pin } = await req.json();
  const secrets = await getSecrets(accountId);
  if (!secrets || !verifySecret(pin ?? "", secrets.pinHash)) {
    return NextResponse.json({ error: "Incorrect PIN." }, { status: 403 });
  }

  const learners = await Promise.all(
    account.profiles.map(async (p) => {
      const doc = await readJson<ProgressDoc>(`progress/${accountId}/${p.id}.json`);
      return { profile: p, progress: doc };
    })
  );
  return NextResponse.json({ learners });
}
