import test from "node:test";
import assert from "node:assert/strict";
import { adaptTier, nextSrs, rankFor, skillLevel, starsFor, topicOfQid, updateSkill } from "../lib/learning.ts";
import { addDaysISO, dayDiff, todayISO } from "../lib/dates.ts";
import { emptyProgress, normalizeProgress } from "../lib/profileTypes.ts";

test("stars reward clean solves, not revealed solutions", () => {
  assert.equal(starsFor("core", { hints: 0, tries: 1, solutionShown: false }), 3);
  assert.equal(starsFor("core", { hints: 2, tries: 1, solutionShown: false }), 2);
  assert.equal(starsFor("challenge", { hints: 0, tries: 2, solutionShown: false }), 2);
  assert.equal(starsFor("warmup", { hints: 0, tries: 3, solutionShown: false }), 1);
  assert.equal(starsFor("challenge", { hints: 0, tries: 1, solutionShown: true }), 0);
});

test("SRS: miss schedules tomorrow, correct climbs the ladder, then graduates", () => {
  const today = todayISO();
  const miss = nextSrs(undefined, false)!;
  assert.equal(miss.due, addDaysISO(1));
  assert.equal(nextSrs(undefined, true), undefined);
  let cur = { due: today, reps: 0 };
  const seen: number[] = [];
  for (let i = 0; i < 6; i++) {
    const n = nextSrs(cur, true, cur.due);
    if (n === null) { seen.push(-1); break; }
    seen.push(dayDiff(today, n!.due));
    cur = { ...n!, due: n!.due };
  }
  assert.deepEqual(seen.slice(0, 4), [3, 7, 16, 35]);
  assert.equal(seen[4], -1);
  // Answering before it is due leaves the schedule alone.
  const future = { due: addDaysISO(5), reps: 1 };
  assert.deepEqual(nextSrs(future, true), future);
});

test("skill mastery levels", () => {
  let s = undefined;
  assert.equal(skillLevel(s), 0);
  for (let i = 0; i < 10; i++) s = updateSkill(s, { correct: true, tier: 2, mixed: false });
  assert.equal(skillLevel(s), 2, "secure after 10 right at tier 2");
  const t0 = todayISO();
  s = { ...s!, mixed: [addDaysISO(-4), t0] };
  assert.equal(skillLevel(s), 3, "mastered with mixed practice 4 days apart");
  let w = undefined;
  for (let i = 0; i < 10; i++) w = updateSkill(w, { correct: true, tier: 1, mixed: false });
  assert.equal(skillLevel(w), 1, "tier 1 only is not secure");
  w = updateSkill(w, { correct: false, tier: 1, mixed: false });
  assert.equal(w.due, addDaysISO(1));
  assert.equal(w.recent.length, 10);
});

test("adaptive tier", () => {
  assert.equal(adaptTier(1, [true, true, true]), 2);
  assert.equal(adaptTier(3, [true, true, true]), 3);
  assert.equal(adaptTier(2, [true, false, false]), 1);
  assert.equal(adaptTier(2, [true, false]), 2);
});

test("ranks", () => {
  assert.equal(rankFor(0).rank.name, "Explorer");
  assert.equal(rankFor(130).rank.name, "Problem Solver");
  assert.ok(rankFor(80).progress > 0 && rankFor(80).progress < 1);
  assert.equal(rankFor(99999).next, undefined);
});

test("topic of question id prefers the longest match", () => {
  const ids = ["fractions", "sequences-graphs", "statistics"];
  assert.equal(topicOfQid("fractions-p1-q03", ids), "fractions");
  assert.equal(topicOfQid("sequences-graphs-m2-q01", ids), "sequences-graphs");
  assert.equal(topicOfQid("exam-n1-q01", ids), undefined);
});

test("normalizeProgress repairs garbage and keeps valid data", () => {
  assert.deepEqual(Object.keys(normalizeProgress(null)), Object.keys(emptyProgress()));
  const d = normalizeProgress({ v: 2, stars: 12, srs: { a: { due: "2026-01-01", reps: 1 }, b: { due: "nope" } }, last: { href: "https://evil.com" }, goalMinutes: 999, skills: { "x.y": { a: 3, c: 2, recent: "10x1", tier: 9 } } });
  assert.equal(d.stars, 12);
  assert.deepEqual(Object.keys(d.srs), ["a"]);
  assert.equal(d.last, undefined);
  assert.equal(d.goalMinutes, 60);
  assert.equal(d.skills["x.y"].recent, "101");
  assert.equal(d.skills["x.y"].tier, 3);
  const proto = normalizeProgress(JSON.parse('{"v":2,"awarded":{"__proto__":true,"ok":true}}'));
  assert.deepEqual(Object.keys(proto.awarded), ["ok"]);
});

test("normalizeProgress migrates v1 Maths Lab documents", () => {
  const v1 = {
    stars: 37, awarded: ["q:fractions-mcq-q01", "guide:fractions"], attempts: { "fractions-mcq-q01": { attempts: 2, correct: 1 }, "equations-qa-q03": { attempts: 1, correct: 1 } },
    guidesRead: ["fractions", "guide:equations"], missed: ["fractions-mcq-q01"], challengeBest: { fractions: 80 },
    streak: 4, lastActiveDate: "2026-10-02", srs: [{ qid: "fractions-mcq-q01", step: 0, due: 1 }], goalMinutes: 20,
    analytics: { secondsOnTask: 600, sessions: 3, perDay: { "2026-10-02": 300 }, perTopic: {}, activity: [{ t: 5, kind: "guide", topicId: "fractions" }] },
    updatedAt: 1000,
  };
  const d = normalizeProgress(v1);
  assert.equal(d.v, 2);
  assert.equal(d.stars, 37);
  assert.deepEqual(d.streak, { count: 4, last: "2026-10-02", best: 4 });
  assert.ok(d.guidesRead.fractions && d.guidesRead.equations);
  assert.equal(d.goalMinutes, 20);
  assert.equal(d.analytics.totalTimeMs, 600000);
  assert.equal(d.analytics.days["2026-10-02"].timeMs, 300000);
  assert.equal(d.analytics.answered, 3);
  assert.equal(d.analytics.topics.fractions.answered, 2);
  assert.equal(d.analytics.topics.equations.correct, 1);
  assert.deepEqual(d.srs, {});
  assert.equal(d.analytics.log.length, 1);
});

import { optionOrder } from "../lib/optionOrder.ts";
test("option order is stable, a permutation, and sorts numeric options", () => {
  const a = optionOrder("fractions-m1-q01", ["{{13/20}}", "{{3/9}}", "{{3/20}}", "{{1/3}}"]);
  assert.deepEqual([...a].sort(), [0, 1, 2, 3]);
  assert.deepEqual(optionOrder("fractions-m1-q01", ["{{13/20}}", "{{3/9}}", "{{3/20}}", "{{1/3}}"]), a);
  assert.deepEqual(optionOrder("x", ["12", "−3", "7", "0.5"]), [1, 3, 2, 0]);
  const words = optionOrder("y", ["isosceles", "scalene", "equilateral", "right-angled"]);
  assert.deepEqual([...words].sort(), [0, 1, 2, 3]);
  // Over many ids the keyed answer (authored 0) lands in each slot roughly evenly.
  const counts = [0, 0, 0, 0];
  for (let i = 0; i < 4000; i++) counts[optionOrder(`q${i}`, ["apple", "pear", "plum", "fig"]).indexOf(0)]++;
  for (const c of counts) assert.ok(c > 850 && c < 1150, `uneven: ${counts}`);
});
