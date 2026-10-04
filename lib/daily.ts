// ---------------------------------------------------------------------------
// Daily 5 picker: five interleaved items from different topics, chosen from
// the learner's own data. Pure, deterministic and client-safe (no React, no
// server content) so it can be unit-tested directly by Node.
//
//   1 · This week's focus — a drill from a focus topic (or the topic worked on
//       most recently, or the first ready topic): its lowest-level skill that
//       isn't mastered yet.
//   2 · Review            — due spaced-review questions, then due / rusty
//   3 · Review              skills, then the practised skills with the lowest
//                           accuracy.
//   4 · Keep it fresh     — a practised skill from another topic that hasn't
//                           been seen for 10+ days (retrieval before it fades).
//   5 · Stretch           — an unsolved challenge problem from a practised or
//                           focus topic, else a skill at the hardest tier.
//
// The set stays mixed: no skill twice, and (due reviews aside) no more than two
// items from one topic while other topics have skills to offer.
// Same (date, profileKey, data snapshot) → same five items. A brand-new
// learner gets five level-1 drills across the first ready topics (no challenge
// problem on day one). Never throws.
// ---------------------------------------------------------------------------
import type { ProgressDoc, SkillState } from "./profileTypes.ts";
import type { DrillItem, Rng } from "./drills/types.ts";
import { isRusty, skillDue, skillLevel, topicOfQid } from "./learning.ts";
import { dayDiff, localISO, todayISO } from "./dates.ts";
import { makeRng, seedFrom } from "./drills/rng.ts";

export type DailyItem =
  | { kind: "drill"; skillId: string; tier: 1 | 2 | 3; seed: number; reason: string }
  | { kind: "question"; qid: string; reason: string };

/** The parts of a Drill the picker needs (a full Drill fits). */
export interface DailyDrillRef {
  id: string;
  topicId: string;
  level: number;
}

/** The parts of a TopicSummary the picker needs (a full TopicSummary fits). */
export interface DailyTopicRef {
  id: string;
  ready: boolean;
  challengeIds: readonly string[];
}

export interface DailyInput {
  /** Local date YYYY-MM-DD. */
  date: string;
  /** Learner id (keeps siblings' sets different on the same day). */
  profileKey: string;
  data: ProgressDoc;
  focusTopics: readonly string[];
  drills: readonly DailyDrillRef[];
  summaries: readonly DailyTopicRef[];
  /** Extra seed salt for "Practise more" sets. Omit for the day's official set. */
  salt?: string;
  /** Skill ids / question ids to steer away from (e.g. the set just finished). */
  avoid?: readonly string[];
}

export const DAILY_SIZE = 5;

/** Slot reasons shown on each item's chip. */
export const DAILY_REASONS = {
  focus: "This week's focus",
  review: "Review",
  fresh: "Keep it fresh",
  stretch: "Stretch",
  start: "Getting started",
  newTopic: "New topic",
} as const;

/** Days without practice before a skill counts as "fading" for Keep it fresh. */
const FRESH_GAP_DAYS = 10;

/** Key of a day's record in `ProgressDoc.daily` (the local date). */
export function dailyKey(date: string = todayISO()): string {
  return date.slice(0, 10);
}

/** Today's Daily 5 has been finished. */
export function isDailyDone(data: ProgressDoc, date: string = todayISO()): boolean {
  return !!data.daily?.[dailyKey(date)]?.done;
}

/** Stable identity of an item inside a set (skill id or question id). */
export function itemKey(item: DailyItem): string {
  return item.kind === "drill" ? item.skillId : item.qid;
}

/**
 * Generate a drill question safely: retries a couple of nearby seeds if a
 * generator throws, and returns null if it still can't produce an item.
 */
export function generateDrillItem(drill: { generate(rng: Rng, tier: 1 | 2 | 3): DrillItem }, seed: number, tier: 1 | 2 | 3): DrillItem | null {
  for (let k = 0; k < 3; k++) {
    try {
      const item = drill.generate(makeRng((seed + k * 7919) >>> 0), tier);
      if (item && typeof item.prompt === "string" && item.answer && Array.isArray(item.solution)) return item;
    } catch {
      // try the next seed
    }
  }
  return null;
}

/** Friendly relative day: "today", "tomorrow", "in 3 days", "in about 2 weeks". */
export function inDays(from: string, to: string): string {
  const n = dayDiff(from, to);
  if (!Number.isFinite(n) || n <= 0) return "today";
  if (n === 1) return "tomorrow";
  if (n < 14) return `in ${n} days`;
  if (n < 60) return `in about ${Math.round(n / 7)} weeks`;
  return `in about ${Math.round(n / 30)} months`;
}

// ---------------------------------------------------------------------------

const clampTier = (t: number): 1 | 2 | 3 => (t >= 3 ? 3 : t <= 1 ? 1 : 2);

function uniq<T>(xs: readonly T[]): T[] {
  return xs.filter((x, i) => xs.indexOf(x) === i);
}

/** Pick the day's five items. */
export function pickDaily(input: DailyInput): DailyItem[] {
  try {
    return build(input);
  } catch {
    try {
      return emergency(input);
    } catch {
      return [];
    }
  }
}

/** Last-resort set (only used if the main picker hits malformed data): level-1 drills. */
function emergency(input: DailyInput): DailyItem[] {
  const rng = makeRng(seedFrom(`${input.date}:${input.profileKey}:${input.salt ?? ""}:fallback`));
  const ready = new Set(input.summaries.filter((s) => s.ready).map((s) => s.id));
  const pool = input.drills.filter((d) => ready.has(d.topicId));
  const list = (pool.length ? pool : [...input.drills]).slice().sort((a, b) => a.level - b.level || a.id.localeCompare(b.id));
  const out: DailyItem[] = [];
  const seenTopics = new Set<string>();
  for (const d of list) {
    if (out.length >= DAILY_SIZE) break;
    if (seenTopics.has(d.topicId)) continue;
    seenTopics.add(d.topicId);
    out.push({ kind: "drill", skillId: d.id, tier: 1, seed: (rng.next() * 4294967296) >>> 0, reason: out.length ? DAILY_REASONS.newTopic : DAILY_REASONS.start });
  }
  return out;
}

function build(input: DailyInput): DailyItem[] {
  const { date, data } = input;
  const rng = makeRng(seedFrom(`${date}:${input.profileKey}${input.salt ? `:${input.salt}` : ""}`));
  const nextSeed = () => (rng.next() * 4294967296) >>> 0;

  const skills: Record<string, SkillState> = data.skills ?? {};
  const srs = data.srs ?? {};
  const solved = data.solved ?? {};
  const avoid = new Set(input.avoid ?? []);

  // Topics, in curriculum order.
  const summaries = input.summaries ?? [];
  const order = new Map<string, number>(summaries.map((s, i) => [s.id, i]));
  const ordOf = (t: string) => order.get(t) ?? 9999;
  const readyIds = summaries.filter((s) => s.ready).map((s) => s.id);
  const ready = new Set(readyIds);
  const summaryOf = new Map(summaries.map((s) => [s.id, s]));

  // Drill pool: drills of ready topics (or every drill if no ready topic has any yet).
  let pool = (input.drills ?? []).filter((d) => ready.has(d.topicId));
  if (!pool.length) pool = [...(input.drills ?? [])];
  pool = pool.slice().sort((a, b) => ordOf(a.topicId) - ordOf(b.topicId) || a.level - b.level || a.id.localeCompare(b.id));
  const byTopic = new Map<string, DailyDrillRef[]>();
  for (const d of pool) {
    const list = byTopic.get(d.topicId);
    if (list) list.push(d);
    else byTopic.set(d.topicId, [d]);
  }
  const drillTopics = [...byTopic.keys()];

  // Skill facts.
  const st = (id: string): SkillState | undefined => skills[id];
  const practised = (d: DailyDrillRef) => (st(d.id)?.a ?? 0) > 0;
  const accuracy = (d: DailyDrillRef) => {
    const s = st(d.id);
    return s && s.a > 0 ? s.c / s.a : 1;
  };
  const lastAt = (d: DailyDrillRef) => st(d.id)?.lastAt ?? 0;
  const tierOf = (d: DailyDrillRef) => clampTier(st(d.id)?.tier ?? 1);
  const daysSince = (d: DailyDrillRef) => {
    const t = lastAt(d);
    return t > 0 ? dayDiff(localISO(new Date(t)), date) : Infinity;
  };

  // How recently each topic was worked on (activity log + skill practice).
  const recency = new Map<string, number>();
  const bump = (t: string | undefined, at: number) => {
    if (!t || !Number.isFinite(at)) return;
    if (at > (recency.get(t) ?? -Infinity)) recency.set(t, at);
  };
  for (const e of data.analytics?.log ?? []) bump(e.topicId, e.at);
  for (const d of pool) if (lastAt(d) > 0) bump(d.topicId, lastAt(d));
  const byRecency = (a: string, b: string) => (recency.get(b) ?? 0) - (recency.get(a) ?? 0) || ordOf(a) - ordOf(b);

  const practisedTopics = new Set<string>();
  for (const d of pool) if (practised(d)) practisedTopics.add(d.topicId);
  for (const [t, s] of Object.entries(data.analytics?.topics ?? {})) if (s && s.answered > 0) practisedTopics.add(t);
  const focus = uniq((input.focusTopics ?? []).filter((t) => typeof t === "string"));

  // Bookkeeping so a set never repeats a skill and avoids repeating a topic.
  const items: DailyItem[] = [];
  const usedKeys = new Set<string>();
  const usedTopics = new Set<string>();
  const topicCount = new Map<string, number>();
  const countTopic = (t: string) => {
    usedTopics.add(t);
    topicCount.set(t, (topicCount.get(t) ?? 0) + 1);
  };

  const addDrill = (d: DailyDrillRef, tier: 1 | 2 | 3, reason: string, allowRepeat = false) => {
    if (!allowRepeat && usedKeys.has(d.id)) return false;
    usedKeys.add(d.id);
    countTopic(d.topicId);
    items.push({ kind: "drill", skillId: d.id, tier, seed: nextSeed(), reason });
    return true;
  };
  const addQuestion = (qid: string, topicId: string, reason: string) => {
    if (usedKeys.has(qid)) return false;
    usedKeys.add(qid);
    countTopic(topicId);
    items.push({ kind: "question", qid, reason });
    return true;
  };

  /** First candidate (in priority order) that is unused, preferring a new topic and not in `avoid`. */
  function prefer<T>(cands: readonly T[], keyOf: (c: T) => string, topicOf: (c: T) => string, freshTopicOnly = false): T | undefined {
    const open = cands.filter((c) => !usedKeys.has(keyOf(c)));
    const freshTopic = open.filter((c) => !usedTopics.has(topicOf(c)));
    const hit = freshTopic.find((c) => !avoid.has(keyOf(c))) ?? freshTopic[0];
    if (hit || freshTopicOnly) return hit;
    return open.find((c) => !avoid.has(keyOf(c))) ?? open[0];
  }

  /** Random pick among the first `n` candidates (variety without losing priority). */
  function pickTop<T>(cands: readonly T[], n: number): T | undefined {
    if (!cands.length) return undefined;
    return rng.pick(cands.slice(0, Math.max(1, n)));
  }

  /** Level-1 drill from the next ready topic not in the set yet (unstarted topics first). */
  function newTopicDrill(): DailyDrillRef | undefined {
    const topics = drillTopics.filter((t) => !usedTopics.has(t));
    const unstarted = topics.filter((t) => !practisedTopics.has(t));
    for (const t of [...unstarted, ...topics]) {
      const list = (byTopic.get(t) ?? []).filter((d) => !usedKeys.has(d.id));
      if (!list.length) continue;
      const minLevel = Math.min(...list.map((d) => d.level));
      const basics = list.filter((d) => d.level === minLevel);
      const fresh = basics.filter((d) => !avoid.has(d.id));
      return pickTop(fresh.length ? fresh : basics, basics.length);
    }
    return undefined;
  }

  const isBrandNew = !pool.some(practised) && practisedTopics.size === 0;

  // ---------------------------------------------------------- slot 1: focus
  {
    const focusWithDrills = focus.filter((t) => byTopic.has(t));
    let topic: string | undefined;
    let reason: string = DAILY_REASONS.focus;
    if (focusWithDrills.length) {
      const notAvoided = focusWithDrills.filter((t) => !(byTopic.get(t) ?? []).every((d) => avoid.has(d.id)));
      topic = rng.pick(notAvoided.length ? notAvoided : focusWithDrills);
    } else {
      const recent = drillTopics.filter((t) => recency.has(t)).sort(byRecency);
      topic = recent[0];
      if (!topic) {
        topic = drillTopics[0];
        reason = DAILY_REASONS.start;
      }
    }
    const list = topic ? byTopic.get(topic) ?? [] : [];
    const open = list.filter((d) => !usedKeys.has(d.id));
    const notMastered = open.filter((d) => skillLevel(st(d.id)) < 3);
    let chosen: DailyDrillRef | undefined;
    if (notMastered.length) {
      const minLevel = Math.min(...notMastered.map((d) => d.level));
      let group = notMastered.filter((d) => d.level === minLevel);
      const notAvoided = group.filter((d) => !avoid.has(d.id));
      if (notAvoided.length) group = notAvoided;
      // Within the lowest level, learn what isn't secure yet before polishing what is.
      const learning = group.filter((d) => skillLevel(st(d.id)) < 2);
      chosen = rng.pick(learning.length ? learning : group);
    } else if (open.length) {
      // Every skill here is mastered: revisit the one seen longest ago.
      chosen = open.slice().sort((a, b) => lastAt(a) - lastAt(b) || a.id.localeCompare(b.id))[0];
    }
    if (chosen) addDrill(chosen, tierOf(chosen), reason);
  }

  // ------------------------------------------------------- slots 2–3: review
  // Map against EVERY topic id (so a question from an unready topic can't be
  // mistaken for a ready topic whose id is a prefix of it), then keep ready ones.
  const allTopicIds = summaries.map((s) => s.id);
  const dueQuestions = Object.entries(srs)
    .filter(([, s]) => !!s && typeof s.due === "string" && s.due <= date)
    .map(([qid, s]) => ({ qid, due: s.due, topic: topicOfQid(qid, allTopicIds) }))
    .filter((x): x is { qid: string; due: string; topic: string } => !!x.topic && ready.has(x.topic))
    .sort((a, b) => a.due.localeCompare(b.due) || a.qid.localeCompare(b.qid));

  const dueSkills = pool
    .filter((d) => skillDue(st(d.id), date) || isRusty(st(d.id), date))
    .sort((a, b) => (st(a.id)?.due ?? "").localeCompare(st(b.id)?.due ?? "") || accuracy(a) - accuracy(b) || a.id.localeCompare(b.id));

  const weakSkills = pool.filter(practised).sort((a, b) => accuracy(a) - accuracy(b) || lastAt(a) - lastAt(b) || a.id.localeCompare(b.id));

  const reviewTier = (d: DailyDrillRef) => clampTier(Math.max(2, tierOf(d)));
  for (let k = 0; k < 2; k++) {
    const q1 = prefer(dueQuestions, (x) => x.qid, (x) => x.topic, true);
    if (q1 && addQuestion(q1.qid, q1.topic, DAILY_REASONS.review)) continue;
    const s1 = prefer(dueSkills, (d) => d.id, (d) => d.topicId, true);
    if (s1 && addDrill(s1, reviewTier(s1), DAILY_REASONS.review)) continue;
    const q2 = prefer(dueQuestions, (x) => x.qid, (x) => x.topic);
    if (q2 && addQuestion(q2.qid, q2.topic, DAILY_REASONS.review)) continue;
    const s2 = prefer(dueSkills, (d) => d.id, (d) => d.topicId);
    if (s2 && addDrill(s2, reviewTier(s2), DAILY_REASONS.review)) continue;
    // Nothing due: the weakest practised skills — but keep the set mixed (at most
    // two items from one topic) before falling back to a brand-new topic.
    const w1 = prefer(
      weakSkills.filter((d) => (topicCount.get(d.topicId) ?? 0) < 2),
      (d) => d.id,
      (d) => d.topicId,
    );
    if (w1 && addDrill(w1, reviewTier(w1), DAILY_REASONS.review)) continue;
    const fresh = newTopicDrill();
    if (fresh && addDrill(fresh, 1, DAILY_REASONS.newTopic)) continue;
    const w2 = prefer(weakSkills, (d) => d.id, (d) => d.topicId);
    if (w2) addDrill(w2, reviewTier(w2), DAILY_REASONS.review);
  }

  // --------------------------------------------------- slot 4: keep it fresh
  {
    const otherPractised = pool
      .filter((d) => practised(d) && !usedKeys.has(d.id) && !usedTopics.has(d.topicId))
      .sort((a, b) => lastAt(a) - lastAt(b) || a.id.localeCompare(b.id));
    const fading = otherPractised.filter((d) => daysSince(d) >= FRESH_GAP_DAYS);
    const prefNotAvoided = (xs: DailyDrillRef[]) => {
      const ok = xs.filter((d) => !avoid.has(d.id));
      return ok.length ? ok : xs;
    };
    const chosen = pickTop(prefNotAvoided(fading), 3) ?? pickTop(prefNotAvoided(otherPractised), 3);
    if (chosen) addDrill(chosen, tierOf(chosen), DAILY_REASONS.fresh);
    else {
      const fresh = newTopicDrill();
      if (fresh) addDrill(fresh, 1, isBrandNew ? DAILY_REASONS.newTopic : DAILY_REASONS.fresh);
    }
  }

  // --------------------------------------------------------- slot 5: stretch
  if (isBrandNew) {
    // First ever set: basics only — a challenge problem on day one is a poor welcome.
    const fresh = newTopicDrill();
    if (fresh) addDrill(fresh, 1, DAILY_REASONS.newTopic);
  } else {
    let done = false;
    const stretchTopics = uniq([...focus, ...[...practisedTopics].sort(byRecency)]).filter((t) => ready.has(t));
    const challengeFor = (t: string) =>
      (summaryOf.get(t)?.challengeIds ?? []).filter((id) => !solved[id] && !srs[id] && !usedKeys.has(id) && !avoid.has(id));
    const withChallenges = stretchTopics.filter((t) => challengeFor(t).length > 0);
    if (withChallenges.length) {
      const freshTopics = withChallenges.filter((t) => !usedTopics.has(t));
      const topic = rng.pick(freshTopics.length ? freshTopics : withChallenges);
      const qid = challengeFor(topic)[0];
      done = addQuestion(qid, topic, DAILY_REASONS.stretch);
    }
    if (!done) {
      // A practised skill at the hardest tier — strongest skills first, new topic preferred.
      const strong = pool
        .filter((d) => practised(d))
        .sort((a, b) => skillLevel(st(b.id)) - skillLevel(st(a.id)) || accuracy(b) - accuracy(a) || a.id.localeCompare(b.id));
      const chosen = prefer(strong, (d) => d.id, (d) => d.topicId);
      if (chosen) done = addDrill(chosen, 3, DAILY_REASONS.stretch);
    }
    if (!done) {
      // No practised skill to stretch: a skill from a topic they've worked on (or a focus topic).
      const inStretchTopics = pool.filter((d) => stretchTopics.includes(d.topicId));
      const chosen = prefer(inStretchTopics, (d) => d.id, (d) => d.topicId);
      if (chosen) done = addDrill(chosen, 3, DAILY_REASONS.stretch);
    }
    if (!done) {
      const fresh = newTopicDrill();
      if (fresh) addDrill(fresh, 3, DAILY_REASONS.stretch);
    }
  }

  // ------------------------------------------- top up (tiny content / data)
  if (items.length < DAILY_SIZE) {
    for (const q of dueQuestions) {
      if (items.length >= DAILY_SIZE) break;
      addQuestion(q.qid, q.topic, DAILY_REASONS.review);
    }
    while (items.length < DAILY_SIZE) {
      const d = newTopicDrill() ?? prefer(pool, (x) => x.id, (x) => x.topicId);
      if (!d) break;
      addDrill(d, practised(d) ? tierOf(d) : 1, practised(d) ? DAILY_REASONS.review : DAILY_REASONS.newTopic);
    }
    for (const t of readyIds) {
      if (items.length >= DAILY_SIZE) break;
      for (const id of summaryOf.get(t)?.challengeIds ?? []) {
        if (items.length >= DAILY_SIZE) break;
        if (!solved[id] && !srs[id] && !avoid.has(id)) addQuestion(id, t, DAILY_REASONS.stretch);
      }
    }
    // Very few skills exist: repeat one with a fresh seed rather than serve a short set.
    for (let i = 0; items.length < DAILY_SIZE && pool.length > 0 && i < DAILY_SIZE; i++) {
      const d = pool[i % pool.length];
      addDrill(d, clampTier(tierOf(d) + 1), DAILY_REASONS.stretch, true);
    }
  }

  return items.slice(0, DAILY_SIZE);
}

/**
 * Replace items[index] (a question that couldn't be loaded, or a drill that
 * couldn't be generated) with a drill not already in the set — same topic if
 * possible. Returns a new array; the item is dropped if no drill is available.
 */
export function swapForDrill(input: DailyInput, items: readonly DailyItem[], index: number): DailyItem[] {
  const out = items.slice();
  const old = out[index];
  if (!old) return out;
  try {
    const rng = makeRng(seedFrom(`${input.date}:${input.profileKey}:${input.salt ?? ""}:swap:${index}:${itemKey(old)}`));
    const ready = new Set(input.summaries.filter((s) => s.ready).map((s) => s.id));
    const allIds = input.summaries.map((s) => s.id);
    const topicOfItem = (it: DailyItem) => (it.kind === "drill" ? input.drills.find((d) => d.id === it.skillId)?.topicId : topicOfQid(it.qid, allIds));
    const inSet = new Set(out.map(itemKey));
    const setTopics = new Set<string>();
    for (const it of out) {
      if (it === old) continue;
      const t = topicOfItem(it);
      if (t) setTopics.add(t);
    }
    const oldTopic = topicOfItem(old);
    const candidates = input.drills.filter((d) => !inSet.has(d.id) && (ready.has(d.topicId) || !ready.size));
    const sameTopic = candidates.filter((d) => d.topicId === oldTopic);
    const newTopic = candidates.filter((d) => !setTopics.has(d.topicId));
    const group = sameTopic.length ? sameTopic : newTopic.length ? newTopic : candidates;
    if (!group.length) {
      out.splice(index, 1);
      return out;
    }
    const practisedFirst = group.filter((d) => (input.data.skills?.[d.id]?.a ?? 0) > 0);
    const d = rng.pick(practisedFirst.length ? practisedFirst : group.filter((x) => x.level === Math.min(...group.map((g) => g.level))));
    const s = input.data.skills?.[d.id];
    const base = clampTier(s?.tier ?? 1);
    const tier = old.reason === DAILY_REASONS.stretch ? 3 : old.reason === DAILY_REASONS.review && s ? clampTier(Math.max(2, base)) : base;
    out[index] = { kind: "drill", skillId: d.id, tier, seed: (rng.next() * 4294967296) >>> 0, reason: old.reason };
    return out;
  } catch {
    out.splice(index, 1);
    return out;
  }
}
