// Server-side safety: attempt counting and lockouts, client ids, daily allowances, and the
// read-modify-write helpers that must not lose concurrent updates (accounts, name claims).
// Runs lib/server against LOCAL_BLOB_DIR (and blob.ts against a stand-in for Vercel Blob); the
// loader below stubs Next-only modules and resolves the extensionless imports Next's bundler allows.
import test from "node:test";
import assert from "node:assert/strict";
import { register } from "node:module";
import { mkdtempSync } from "node:fs";
import os from "node:os";
import path from "node:path";

// A stand-in for @vercel/blob (used by blob.ts imported with "?vercel=…") that throws the
// library's own error classes, so the not-found / conflict handling is tested against them.
const realBlob = new URL("../node_modules/@vercel/blob/dist/index.js", import.meta.url).href;
const fakeBlob = `
import { BlobError, BlobNotFoundError, BlobPreconditionFailedError } from ${JSON.stringify(realBlob)};
export { BlobError, BlobNotFoundError, BlobPreconditionFailedError };
const store = (globalThis.__fakeBlob ??= new Map());
let n = 0;
const tick = () => new Promise((r) => setTimeout(r, Math.random() * 4));
export async function head(key) { await tick(); const b = store.get(key); if (!b) throw new BlobNotFoundError(); return { url: "https://fake.blob/" + key, etag: '"' + b.etag + '"' }; }
export async function put(key, body, o = {}) {
  await tick();
  const cur = store.get(key);
  if (o.ifMatch) { if (!cur || '"' + cur.etag + '"' !== o.ifMatch) throw new BlobPreconditionFailedError(); }
  else if (o.allowOverwrite !== true && cur) throw new BlobError("This blob already exists, use \`allowOverwrite: true\` if you want to overwrite it.");
  store.set(key, { body, etag: ++n });
  return { url: "https://fake.blob/" + key };
}
export async function del(url) { await tick(); store.delete(url.slice("https://fake.blob/".length)); }
`;
const hooks = `
import { existsSync } from "node:fs";
export async function resolve(spec, ctx, next) {
  if (spec === "server-only") return { url: "data:text/javascript,export{}", shortCircuit: true };
  if (spec === "next/headers") return { url: "data:text/javascript,export async function cookies(){return{get(){return undefined}}}", shortCircuit: true };
  if (spec === "@vercel/blob" && ctx.parentURL?.includes("?vercel=")) return { url: "data:text/javascript," + encodeURIComponent(${JSON.stringify(fakeBlob)}), shortCircuit: true };
  if (spec.startsWith(".") && ctx.parentURL?.startsWith("file:") && !/\\.[cm]?[jt]sx?(\\?.*)?$/.test(spec)) {
    const u = new URL(spec + ".ts", ctx.parentURL);
    if (existsSync(u)) return { url: u.href, shortCircuit: true };
  }
  return next(spec, ctx);
}`;
register("data:text/javascript," + encodeURIComponent(hooks));
process.env.LOCAL_BLOB_DIR = mkdtempSync(path.join(os.tmpdir(), "y8m-blob-test-"));

const { countAttempt, countDaily, clientId, takeAttempt, clearAttempts, takeDailyAllowance, PIN_RULE } = await import("../lib/server/ratelimit.ts");
const { checkPin, hashSecret, saveSecrets, saveAccount, getAccount, updateAccount, claimAccountName, lookupAccountIdByName } = await import("../lib/server/auth.ts");

const rule = { max: 5, windowMs: 60 * 60 * 1000, lockMs: 15 * 60 * 1000 };
const T = 1_000_000;

test("countAttempt allows max attempts, then locks without counting refused ones", () => {
  let c = null;
  for (let i = 1; i <= 5; i++) {
    c = countAttempt(c, rule, T + i);
    assert.ok(c, `attempt ${i} allowed`);
    assert.equal(c.fails, i);
  }
  assert.equal(c!.until, T + 5 + rule.lockMs, "the 5th attempt starts the lock");
  assert.equal(countAttempt(c, rule, T + 10), null, "locked");
  assert.equal(countAttempt(c, rule, T + 5 + rule.lockMs - 1), null, "still locked just before it ends");
  assert.deepEqual(countAttempt(c, rule, T + 5 + rule.lockMs + 1), { fails: 1, first: T + 5 + rule.lockMs + 1, until: 0 }, "a fresh count after the lock");
});

test("countAttempt starts a new window, and tolerates odd stored docs", () => {
  const old = { fails: 3, first: T, until: 0 };
  assert.deepEqual(countAttempt(old, rule, T + rule.windowMs + 1), { fails: 1, first: T + rule.windowMs + 1, until: 0 });
  assert.deepEqual(countAttempt(old, rule, T + 1), { fails: 4, first: T, until: 0 });
  assert.equal(countAttempt({ fails: 4, first: T } as never, rule, T + 1)?.fails, 5, "missing `until` (hand-edited / partial doc)");
  assert.equal(countAttempt({ nope: 1 } as never, rule, T)?.fails, 1);
});

test("countDaily counts per day and refuses at the limit", () => {
  assert.deepEqual(countDaily(null, "2026-10-04", 3), { day: "2026-10-04", count: 1 });
  assert.deepEqual(countDaily({ day: "2026-10-04", count: 2 }, "2026-10-04", 3), { day: "2026-10-04", count: 3 });
  assert.equal(countDaily({ day: "2026-10-04", count: 3 }, "2026-10-04", 3), null);
  assert.deepEqual(countDaily({ day: "2026-10-03", count: 99 }, "2026-10-04", 3), { day: "2026-10-04", count: 1 }, "a new day resets");
});

test("clientId counts an IPv6 client by its /64", () => {
  const id = (ip: string) => clientId(new Request("http://x/", { headers: { "x-forwarded-for": ip } }));
  assert.equal(id("2001:db8:0:1:aaaa::1"), id("2001:0db8:0000:0001:bbbb:cccc:dddd:eeee"));
  assert.equal(id("2001:db8:0:1::"), id("2001:DB8:0:1:ffff:ffff:ffff:ffff"));
  assert.notEqual(id("2001:db8:0:1::1"), id("2001:db8:0:2::1"));
  assert.notEqual(id("::ffff:1.2.3.4"), id("::ffff:1.2.3.5"), "IPv4-mapped addresses stay per address");
});

test("clientId uses the first forwarded hop, hashed", () => {
  const req = (h: Record<string, string>) => new Request("http://x/", { headers: h });
  const a = clientId(req({ "x-forwarded-for": "1.23.4.5, 10.0.0.1" }));
  assert.match(a, /^[0-9a-f]{16}$/);
  assert.equal(a, clientId(req({ "x-forwarded-for": "1.23.4.5" })));
  assert.notEqual(a, clientId(req({ "x-forwarded-for": "12.3.4.5" })), "not merged by stripping dots");
  assert.equal(clientId(req({ "x-real-ip": "1.23.4.5" })), a, "x-real-ip fallback");
  assert.notEqual(clientId(req({})), a);
});

test("a parallel burst gets exactly max attempts; clearing resets", async () => {
  const results = await Promise.all(Array.from({ length: 30 }, () => takeAttempt("test", "burst", rule)));
  assert.equal(results.filter((r) => r.wait === 0).length, 5);
  assert.deepEqual(results.filter((r) => r.wait === 0).map((r) => r.left).sort(), [0, 1, 2, 3, 4]);
  assert.ok(results.filter((r) => r.wait > 0).every((r) => r.wait > 0 && r.wait <= 15 * 60));
  await clearAttempts("test", "burst");
  assert.equal((await takeAttempt("test", "burst", rule)).wait, 0);
});

test("a count cleared on another instance doesn't leave this one locking people out", async () => {
  const spec = "../lib/server/ratelimit.ts?instance=";
  const other = (await import(spec + "2")) as typeof import("../lib/server/ratelimit.ts");
  for (let i = 0; i < 4; i++) await takeAttempt("stale", "x", rule);
  await other.clearAttempts("stale", "x"); // e.g. the right PIN, entered on another server instance
  assert.equal((await takeAttempt("stale", "x", rule)).left, 4);
  assert.equal((await takeAttempt("stale", "x", rule)).wait, 0, "not locked by this instance's old tally");
});

test("checkPin: parallel guesses can't get past the lockout", async () => {
  await saveSecrets("pinacct", { passwordHash: hashSecret("password1"), pinHash: hashSecret("0042") });
  const guesses = Array.from({ length: 50 }, (_, i) => String(i).padStart(4, "0"));
  const results = await Promise.all(guesses.map((g) => checkPin("pinacct", g)));
  const checked = results.filter((r) => r.ok || r.status === 403);
  assert.equal(checked.length, PIN_RULE.max, "only max guesses are checked");
  assert.equal(results[42].ok, false, "the right PIN, sent after the lock, is refused");
  assert.ok(results.filter((r) => !r.ok && r.status === 429).length >= 50 - PIN_RULE.max);
});

test("checkPin: right PIN clears earlier misses", async () => {
  await saveSecrets("pinacct2", { passwordHash: hashSecret("password1"), pinHash: hashSecret("123456") });
  const miss = await checkPin("pinacct2", "000000");
  assert.deepEqual(miss, { ok: false, status: 403, error: "That PIN isn't right (4 tries left)." });
  assert.deepEqual(await checkPin("pinacct2", "123456"), { ok: true });
  const again = await checkPin("pinacct2", "000000");
  assert.equal(!again.ok && again.error, "That PIN isn't right (4 tries left).");
});

test("updateAccount applies concurrent changes to the fresh copy", async () => {
  await saveAccount({ id: "fam1", name: "Fam", profiles: [], createdAt: 1 });
  const names = ["Mei", "Wei", "Kai", "Ben", "Ann"];
  const results = await Promise.all(
    names.map((n, i) => updateAccount("fam1", (acc) => ({ ...acc, profiles: [...acc.profiles, { id: `p${i}`, name: n, avatar: "🦊", createdAt: i }] }))),
  );
  assert.ok(results.every((r) => r.changed));
  assert.deepEqual((await getAccount("fam1"))!.profiles.map((p) => p.name).sort(), [...names].sort());

  const none = await updateAccount("fam1", () => null);
  assert.equal(none.changed, false);
  assert.equal(none.account!.profiles.length, 5, "unchanged account is still returned");
  const missing = await updateAccount("no-such-account", (acc) => acc);
  assert.deepEqual(missing, { account: null, changed: false });
});

test("claimAccountName: of two racing sign-ups exactly one gets the name", async () => {
  const [a, b] = await Promise.all([claimAccountName("Lim", "acc-a"), claimAccountName("lim", "acc-b")]);
  assert.equal(Number(a) + Number(b), 1);
  assert.equal(await lookupAccountIdByName("LIM"), a ? "acc-a" : "acc-b");
  assert.equal(await claimAccountName("Lim", "acc-c"), false, "taken names stay taken");
});

test("takeDailyAllowance hands out exactly the limit under a burst", async () => {
  const results = await Promise.all(Array.from({ length: 12 }, () => takeDailyAllowance("test-site", 7)));
  assert.equal(results.filter(Boolean).length, 7);
  assert.equal(await takeDailyAllowance("test-site", 7), false);
  assert.equal(await takeDailyAllowance("test-other", 7), true, "allowances are separate");
});

test("Vercel Blob mode: missing keys read as null and conditional writes don't lose updates", async () => {
  const realFetch = globalThis.fetch;
  const store = () => (globalThis as unknown as { __fakeBlob: Map<string, { body: string }> }).__fakeBlob;
  globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
    const u = String(url);
    if (!u.startsWith("https://fake.blob/")) return realFetch(url, init);
    const b = store()?.get(u.slice("https://fake.blob/".length).split("?")[0]);
    return b ? new Response(b.body) : new Response("", { status: 404 });
  }) as typeof fetch;
  const localDir = process.env.LOCAL_BLOB_DIR;
  delete process.env.LOCAL_BLOB_DIR;
  try {
    // Two copies of blob.ts = two server instances (separate in-process queues), one store.
    const spec = "../lib/server/blob.ts?vercel=";
    const a = (await import(spec + "a")) as typeof import("../lib/server/blob.ts");
    const b = (await import(spec + "b")) as typeof import("../lib/server/blob.ts");
    assert.equal(await a.readJson("names/nobody.json"), null, "BlobNotFoundError from head() means missing");
    assert.deepEqual(await a.updateJson<number>("counter.json", (c) => (c ?? 0) + 1), { value: 1, changed: true }, "creates a missing doc");
    assert.equal(await a.createJson("names/lim.json", { id: "a" }), true);
    assert.equal(await b.createJson("names/lim.json", { id: "b" }), false, "create-only write on an existing key");
    const results = await Promise.all(Array.from({ length: 12 }, (_, i) => (i % 2 ? a : b).updateJson<number>("counter.json", (c) => (c ?? 0) + 1)));
    assert.ok(results.every((r) => r.changed));
    assert.equal(await b.readJson("counter.json"), 13, "no update lost across instances");
    await a.deleteJson("counter.json");
    assert.equal(await b.readJson("counter.json"), null);
  } finally {
    globalThis.fetch = realFetch;
    process.env.LOCAL_BLOB_DIR = localDir;
  }
});
