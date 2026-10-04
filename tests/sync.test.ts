// Cross-device / cross-tab sync: mergeProgress, progressDelta, tombstones, reset epochs,
// prototype-safe normalisation and the save queue's page-close flush.
import test from "node:test";
import assert from "node:assert/strict";
import { emptyProgress, importProgress, mergeProgress, normalizeProgress, progressDelta, sameProgress, withRemoved, type ProgressDoc } from "../lib/profileTypes.ts";
import { createProgressSaveQueue, type ProgressSaveSnapshot } from "../lib/progressSaveQueue.ts";

/** A normalised doc built from a partial raw object (what the server and the store hold). */
function doc(raw: Record<string, unknown>): ProgressDoc {
  return normalizeProgress({ v: 2, updatedAt: 1000, analytics: { firstActiveAt: 1, lastActiveAt: 1000 }, ...raw });
}

const base = doc({
  stars: 40,
  solved: { "fractions-mcq-q01": true },
  awarded: { "sk2:frac-add": true },
  guidesRead: { "fractions#intro": true },
  srs: { "fractions-mcq-q02": { due: "2026-10-01", reps: 1, at: 900 } },
  skills: { "frac-add": { a: 10, c: 8, recent: "1111111101", tier: 2, best: 2, mixed: [], due: "2026-10-05", interval: 3, lastAt: 900 } },
  bests: { "sprint:mixed": 12 },
  streak: { count: 3, last: "2026-10-01", best: 5 },
  daily: { "2026-10-01": { correct: 4, total: 5, done: true } },
  slips: { "fractions:adds-denominators": { label: "Added the denominators", topicId: "fractions", count: 2, last: 800 } },
  analytics: {
    firstActiveAt: 100,
    lastActiveAt: 1000,
    totalTimeMs: 600000,
    sessionCount: 4,
    answered: 30,
    correct: 24,
    hinted: 3,
    days: { "2026-10-01": { timeMs: 600000, answered: 30, correct: 24, hinted: 3 } },
    topics: { fractions: { timeMs: 600000, answered: 30, correct: 24 } },
    log: [
      { at: 500, type: "start" },
      { at: 700, type: "daily", detail: "4/5" },
    ],
  },
});

/** Two devices that both moved on from `base` in different ways. */
const laptop = doc({
  ...JSON.parse(JSON.stringify(base)),
  stars: 52,
  solved: { ...base.solved, "fractions-mcq-q03": true },
  awarded: { ...base.awarded, "sk3:frac-add": true },
  attempts: { "paper:fractions:p1": { index: 3, answers: { q1: 1 }, results: { q1: { r: 1, h: 0, t: 1 } }, completed: false, updatedAt: 1500 } },
  goalMinutes: 25,
  streak: { count: 4, last: "2026-10-02", best: 5 },
  daily: { ...base.daily, "2026-10-02": { correct: 5, total: 5, done: true } },
  analytics: { ...base.analytics, answered: 40, days: { ...base.analytics.days, "2026-10-02": { timeMs: 300000, answered: 10, correct: 9, hinted: 0 } }, log: [...base.analytics.log, { at: 1400, type: "daily", detail: "5/5" }] },
  updatedAt: 1600,
});
const ipad = doc({
  ...JSON.parse(JSON.stringify(base)),
  stars: 47,
  solved: { ...base.solved, "algebra-mcq-q07": true },
  guidesRead: { ...base.guidesRead, "algebra#terms": true },
  srs: { ...base.srs, "algebra-mcq-q09": { due: "2026-10-03", reps: 0, at: 1200 } },
  skills: { ...base.skills, "collect-terms": { a: 4, c: 3, recent: "1101", tier: 1, best: 1, mixed: [], due: "2026-10-03", interval: 1, lastAt: 1250 } },
  bests: { "sprint:mixed": 15 },
  goalMinutes: 20,
  analytics: { ...base.analytics, answered: 36, totalTimeMs: 900000, log: [...base.analytics.log, { at: 1300, type: "guide", topicId: "algebra", detail: "terms" }] },
  updatedAt: 1300,
});

test("mergeProgress is commutative and idempotent", () => {
  const pairs: [ProgressDoc, ProgressDoc][] = [
    [laptop, ipad],
    [base, laptop],
    [base, ipad],
    [emptyProgress(5), laptop],
  ];
  for (const [a, b] of pairs) {
    assert.deepEqual(mergeProgress(a, b), mergeProgress(b, a));
    assert.ok(sameProgress(mergeProgress(a, b), mergeProgress(b, a)));
  }
  for (const d of [base, laptop, ipad]) assert.deepEqual(mergeProgress(d, d), d);
  // Associative too, so tabs and devices converge whatever order the copies meet in.
  assert.deepEqual(mergeProgress(mergeProgress(base, laptop), ipad), mergeProgress(base, mergeProgress(laptop, ipad)));
});

test("mergeProgress keeps the work from both copies", () => {
  const m = mergeProgress(laptop, ipad);
  assert.deepEqual(Object.keys(m.solved).sort(), ["algebra-mcq-q07", "fractions-mcq-q01", "fractions-mcq-q03"]);
  assert.ok(m.awarded["sk2:frac-add"] && m.awarded["sk3:frac-add"]);
  assert.ok(m.guidesRead["fractions#intro"] && m.guidesRead["algebra#terms"]);
  assert.ok(m.srs["algebra-mcq-q09"] && m.srs["fractions-mcq-q02"]);
  assert.ok(m.skills["collect-terms"] && m.skills["frac-add"]);
  assert.ok(m.attempts["paper:fractions:p1"]);
  assert.equal(m.stars, 52, "stars: the larger total, never a sum");
  assert.equal(m.bests["sprint:mixed"], 15);
  assert.equal(m.daily["2026-10-02"].done, true);
  assert.deepEqual(m.streak, { count: 4, last: "2026-10-02", best: 5 });
  assert.equal(m.goalMinutes, 25, "settings come from the copy saved last");
  assert.equal(m.analytics.answered, 40);
  assert.equal(m.analytics.totalTimeMs, 900000);
  assert.equal(m.analytics.firstActiveAt, 100);
  assert.deepEqual(m.analytics.log.map((e) => e.at), [500, 700, 1300, 1400], "log merged in time order without duplicates");
  assert.equal(m.updatedAt, 1600);
});

test("a stale dirty cache no longer wipes newer cloud progress (load merges, the server merges)", () => {
  // Monday: the laptop closed with an unsynced (dirty) change. Tue–Fri the iPad earned much more.
  const monday = doc({ stars: 30, solved: { "fractions-mcq-q01": true }, updatedAt: 1000 });
  const friday = doc({ stars: 180, solved: { "fractions-mcq-q01": true, "algebra-mcq-q01": true }, skills: { "collect-terms": { a: 40, c: 35, recent: "1111111111", tier: 3, best: 3, mixed: [], due: "", interval: 7, lastAt: 5000 } }, updatedAt: 5000 });
  const loaded = mergeProgress(monday, friday);
  assert.equal(loaded.stars, 180);
  assert.ok(loaded.solved["algebra-mcq-q01"] && loaded.skills["collect-terms"]);
  // The stale tab's heartbeat makes its copy look newest; content still survives.
  const staleBeat = { ...monday, updatedAt: 9000, analytics: { ...monday.analytics, totalTimeMs: 20000 } };
  const saved = mergeProgress(friday, staleBeat);
  assert.equal(saved.stars, 180);
  assert.ok(saved.solved["algebra-mcq-q01"]);
  assert.ok(saved.skills["collect-terms"]);
});

test("an undated v1 dirty cache merges into v2 cloud progress without losing it", () => {
  const v1 = normalizeProgress({ stars: 37, awarded: ["q:fractions-mcq-q01"], streak: 2, lastActiveDate: "2026-09-01", goalMinutes: 45, guidesRead: ["fractions"] });
  assert.equal(v1.updatedAt, 0, "an undated v1 copy must not look newer than real data");
  const cloud = doc({ stars: 120, solved: { "fractions-mcq-q02": true }, srs: { "fractions-mcq-q04": { due: "2026-10-09", reps: 2 } }, goalMinutes: 15, updatedAt: 4000 });
  const m = mergeProgress(v1, cloud);
  assert.equal(m.stars, 120);
  assert.ok(m.solved["fractions-mcq-q02"] && m.srs["fractions-mcq-q04"]);
  assert.ok(m.awarded["v1:q:fractions-mcq-q01"] && m.guidesRead.fractions);
  assert.equal(m.goalMinutes, 15);
});

test("two tabs: the Daily 5 finished in one tab survives the other tab's later save", () => {
  const tabA = doc({ stars: 10, updatedAt: 2000 });
  const tabB = doc({ stars: 22, solved: { "q-1": true }, daily: { "2026-10-04": { correct: 5, total: 5, done: true } }, updatedAt: 1500 });
  const afterBeat = mergeProgress(tabB, { ...tabA, updatedAt: 3000 });
  assert.equal(afterBeat.stars, 22);
  assert.ok(afterBeat.solved["q-1"]);
  assert.equal(afterBeat.daily["2026-10-04"].done, true);
  // done beats not-done, then the better score
  const notDone = doc({ daily: { "2026-10-04": { correct: 5, total: 5, done: false } } });
  assert.equal(mergeProgress(notDone, tabB).daily["2026-10-04"].done, true);
});

test("per-entry conflicts go to the newer entry", () => {
  const old = doc({
    attempts: { p: { index: 1, answers: {}, results: {}, completed: false, updatedAt: 100 } },
    srs: { q: { due: "2026-10-20", reps: 3, at: 100 } },
    skills: { s: { a: 5, c: 5, recent: "11111", tier: 2, best: 2, mixed: [], due: "2026-10-10", interval: 7, lastAt: 100 } },
    flags: { q: { at: 100, note: "old" } },
    last: { href: "/topics", label: "Topics", at: 100 },
    updatedAt: 5000,
  });
  const fresh = doc({
    attempts: { p: { index: 4, answers: {}, results: {}, completed: true, updatedAt: 200 } },
    srs: { q: { due: "2026-10-05", reps: 0, at: 200 } },
    skills: { s: { a: 6, c: 5, recent: "111110", tier: 2, best: 2, mixed: [], due: "2026-10-05", interval: 1, lastAt: 200 } },
    flags: { q: { at: 200, note: "new" } },
    last: { href: "/daily", label: "Daily 5", at: 200 },
    updatedAt: 1000,
  });
  const m = mergeProgress(old, fresh);
  assert.equal(m.attempts.p.index, 4);
  assert.deepEqual(m.srs.q, { due: "2026-10-05", reps: 0, at: 200 });
  assert.equal(m.skills.s.a, 6);
  assert.equal(m.flags.q.note, "new");
  assert.equal(m.last?.href, "/daily", "continue link follows its own timestamp");
  // Old srs entries carry no time: the sooner review wins.
  const undated = mergeProgress(doc({ srs: { q: { due: "2026-10-20", reps: 3 } } }), doc({ srs: { q: { due: "2026-10-02", reps: 0 } } }));
  assert.deepEqual(undated.srs.q, { due: "2026-10-02", reps: 0 });
});

test("deletions survive merging with an older copy, and later re-adds survive the deletion", () => {
  const older = doc({
    attempts: { "paper:x": { index: 9, answers: {}, results: {}, completed: true, updatedAt: 100 } },
    srs: { "x-mcq-q1": { due: "2026-10-01", reps: 4, at: 100 } },
  });
  // Restarted the paper and graduated the question on this device.
  const now = doc({ removed: withRemoved(withRemoved({}, "attempt:paper:x", 101), "srs:x-mcq-q1", 150) });
  const m = mergeProgress(older, now);
  assert.equal(m.attempts["paper:x"], undefined);
  assert.equal(m.srs["x-mcq-q1"], undefined);
  assert.equal(m.removed["attempt:paper:x"], 101);
  // A new attempt / a new miss after the deletion is kept.
  const later = doc({
    ...JSON.parse(JSON.stringify(now)),
    attempts: { "paper:x": { index: 0, answers: {}, results: {}, completed: false, updatedAt: 300 } },
    srs: { "x-mcq-q1": { due: "2026-10-06", reps: 0, at: 300 } },
  });
  const m2 = mergeProgress(older, later);
  assert.equal(m2.attempts["paper:x"].index, 0);
  assert.equal(m2.srs["x-mcq-q1"].reps, 0);
});

test("a PIN-checked reset (new epoch) replaces older copies instead of merging with them", () => {
  const reset = { ...emptyProgress(7000), resetAt: 7000 };
  assert.deepEqual(mergeProgress(laptop, reset), reset);
  assert.deepEqual(mergeProgress(reset, laptop), reset);
  const afterReset = { ...reset, stars: 3, solved: { "q-new": true as const }, updatedAt: 7100 };
  assert.equal(mergeProgress(afterReset, ipad).stars, 3);
});

test("progressDelta stands in for the whole doc when merged into a copy that has the base", () => {
  const big = doc({
    ...JSON.parse(JSON.stringify(laptop)),
    solved: Object.fromEntries(Array.from({ length: 1500 }, (_, i) => [`topic-${i % 20}-mcq-q${i}`, true])),
  });
  const now = doc({
    ...JSON.parse(JSON.stringify(big)),
    stars: big.stars + 3,
    solved: { ...big.solved, "fractions-mcq-q99": true },
    analytics: { ...big.analytics, answered: big.analytics.answered + 1, log: [...big.analytics.log, { at: 1700, type: "best", detail: "x=1" }] },
    removed: { "attempt:paper:fractions:p1": 1700 },
    attempts: {},
    updatedAt: 1700,
  });
  const delta = progressDelta(now, big);
  assert.ok(JSON.stringify(delta).length < JSON.stringify(now).length / 5);
  assert.deepEqual(Object.keys(delta.solved), ["fractions-mcq-q99"]);
  for (const server of [big, mergeProgress(big, ipad)]) {
    assert.deepEqual(mergeProgress(server, normalizeProgress(JSON.parse(JSON.stringify(delta)))), mergeProgress(server, now));
  }
});

test("normalisation caps keep a busy year's doc small and never touch Object.prototype", () => {
  const days: Record<string, unknown> = {};
  for (let i = 0; i < 400; i++) days[`2025-${String(1 + Math.floor(i / 28) % 12).padStart(2, "0")}-${String(1 + (i % 28)).padStart(2, "0")}`] = { timeMs: 60000, answered: 5, correct: 4, hinted: 1 };
  const d = normalizeProgress({ v: 2, analytics: { days, log: Array.from({ length: 400 }, (_, i) => ({ at: i, type: "start" })) }, slips: Object.fromEntries(Array.from({ length: 90 }, (_, i) => [`s${i}`, { label: "x", topicId: "t", count: 1, last: i }])) });
  assert.ok(Object.keys(d.analytics.days).length <= 120);
  assert.equal(d.analytics.log.length, 150);
  assert.equal(Object.keys(d.slips).length, 60);

  // A crafted v1 body used a "__proto__" topic to pollute Object.prototype on the server.
  const crafted = '{"streak":1,"attempts":{"__proto__-mcq-1":{"attempts":2,"correct":1},"constructor-mcq-1":{"attempts":1,"correct":1}},"guidesRead":["constructor","__proto__"]}';
  const v1 = normalizeProgress(JSON.parse(crafted));
  assert.equal(({} as Record<string, unknown>).answered, undefined);
  assert.deepEqual(Object.keys(v1.analytics.topics), []);
  assert.deepEqual(Object.keys(v1.guidesRead), []);
  const v2 = normalizeProgress(JSON.parse('{"v":2,"solved":{"__proto__":true,"ok":true},"removed":{"__proto__":5},"analytics":{"topics":{"__proto__":{"answered":1}}}}'));
  const merged = mergeProgress(v2, v2);
  assert.deepEqual(Object.keys(merged.solved), ["ok"]);
  assert.deepEqual(Object.keys(merged.removed), []);
  assert.equal(({} as Record<string, unknown>).answered, undefined);
});

test("a device that was behind restarting its streak today doesn't end the live streak", () => {
  const cloud = doc({ streak: { count: 7, last: "2026-10-03", best: 7 } });
  // Stale tab / offline dirty cache / guest mode: bumpStreak saw an old `last`, so it restarted at 1.
  const stale = doc({ streak: { count: 1, last: "2026-10-04", best: 3 } });
  assert.deepEqual(mergeProgress(cloud, stale).streak, { count: 8, last: "2026-10-04", best: 8 });
  assert.deepEqual(mergeProgress(stale, cloud).streak, { count: 8, last: "2026-10-04", best: 8 });
  // A real gap still ends it; overlapping runs don't add up twice.
  assert.equal(mergeProgress(cloud, doc({ streak: { count: 1, last: "2026-10-05", best: 1 } })).streak.count, 1);
  assert.equal(mergeProgress(cloud, doc({ streak: { count: 3, last: "2026-10-04", best: 3 } })).streak.count, 8);
  assert.equal(mergeProgress(cloud, doc({ streak: { count: 2, last: "2026-10-02", best: 2 } })).streak.count, 7);
});

test("settings come from the copy where they were changed last, not the copy saved last", () => {
  const laptop = doc({ goalMinutes: 25, settingsAt: 2000, updatedAt: 2000 });
  // A stale tablet tab's heartbeat makes its copy the newest one saved, with the old goal.
  const tablet = doc({ goalMinutes: 15, updatedAt: 9000 });
  assert.equal(mergeProgress(laptop, tablet).goalMinutes, 25);
  assert.equal(mergeProgress(tablet, laptop).goalMinutes, 25);
  assert.equal(mergeProgress(laptop, doc({ goalMinutes: 30, settingsAt: 3000, updatedAt: 3000 })).goalMinutes, 30);
});

test("guest progress brought into a learner adds up (once) instead of keeping the larger copy", () => {
  const learner = doc({ stars: 200, solved: { a: true }, streak: { count: 10, last: "2026-10-03", best: 10 }, analytics: { firstActiveAt: 1, lastActiveAt: 1000, answered: 300, correct: 250, totalTimeMs: 9e6, days: { "2026-10-03": { timeMs: 6e5, answered: 20, correct: 18, hinted: 1 } } }, resetAt: 50 });
  const guest = doc({ stars: 30, solved: { g: true }, streak: { count: 1, last: "2026-10-04", best: 1 }, analytics: { firstActiveAt: 1, lastActiveAt: 1100, answered: 12, correct: 9, totalTimeMs: 6e5, days: { "2026-10-03": { timeMs: 1e5, answered: 4, correct: 3, hinted: 0 } } }, updatedAt: 1100 });
  const m = importProgress(learner, guest);
  assert.equal(m.stars, 230);
  assert.ok(m.solved.a && m.solved.g);
  assert.deepEqual(m.streak, { count: 11, last: "2026-10-04", best: 11 });
  assert.equal(m.analytics.answered, 312);
  assert.equal(m.analytics.days["2026-10-03"].answered, 24);
  assert.equal(m.resetAt, 50, "joins the learner's reset epoch");
  // A retry with the same guest copy (the first reply was lost) adds nothing twice.
  assert.deepEqual(importProgress(m, normalizeProgress(JSON.parse(JSON.stringify(guest)))), m);
  // A learner with nothing saved yet just gets the guest copy.
  const first = importProgress(null, { ...guest, resetAt: 99 });
  assert.equal(first.stars, 30);
  assert.equal(first.resetAt, 0);
});

// ------------------------------------------------------------------- queue
function fakeTimers() {
  let fn: (() => void) | null = null;
  return {
    timers: { set: (cb: () => void) => ((fn = cb), 1 as unknown as ReturnType<typeof setTimeout>), clear: () => void (fn = null) },
    fire: () => fn?.(),
  };
}
const snap = (n: number): ProgressSaveSnapshot => ({ accountId: "a", profileId: "p", body: `r${n}`, cacheKey: "k", revision: String(n) });

test("flushNow sends the latest snapshot at once instead of waiting behind a save in flight", async () => {
  const sent: string[] = [];
  let release: () => void = () => {};
  const t = fakeTimers();
  const q = createProgressSaveQueue(
    (s, urgent) => {
      sent.push(`${s.body}${urgent ? "!" : ""}`);
      return s.body === "r1" ? new Promise<void>((res) => (release = res)) : Promise.resolve();
    },
    1500,
    t.timers,
  );
  q.schedule(snap(1));
  t.fire(); // r1 goes out and hangs
  await Promise.resolve();
  q.schedule(snap(2));
  void q.flushNow(); // page hidden
  assert.deepEqual(sent, ["r1", "r2!"], "r2 did not wait for r1's response");
  release();
  await q.flush();
  // r1 may have been stored after r2: while the page lives, r2 goes once more, last.
  assert.deepEqual(sent, ["r1", "r2!", "r2"]);
});

test("flushNow re-sends a normal save still in flight (once), so it outlives the page", async () => {
  const sent: string[] = [];
  const t = fakeTimers();
  const q = createProgressSaveQueue(
    (s, urgent) => {
      sent.push(`${s.body}${urgent ? "!" : ""}`);
      return new Promise<void>(() => {}); // never settles: the page is going away
    },
    1500,
    t.timers,
  );
  q.schedule(snap(1));
  t.fire();
  await Promise.resolve();
  void q.flushNow(); // visibilitychange → hidden
  void q.flushNow(); // pagehide
  assert.deepEqual(sent, ["r1", "r1!"]);
  q.cancel();
  void q.flushNow();
  assert.deepEqual(sent, ["r1", "r1!"], "nothing re-sent after cancel");
});
