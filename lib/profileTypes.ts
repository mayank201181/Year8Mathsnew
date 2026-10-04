// ---------------------------------------------------------------------------
// Account / learner / progress shapes shared by the client store and the API,
// plus normalisation (and migration from the v1 Maths Lab format).
// Imports only relative .ts files so Node tests can load it directly.
// ---------------------------------------------------------------------------
import { dayDiff, todayISO } from "./dates.ts";

/** Learner profile (stored inside the account document). */
export interface Profile {
  id: string;
  name: string;
  /** Emoji avatar. */
  avatar: string;
  createdAt: number;
  /** Set by a parent (PIN-protected) from the parent dashboard. */
  settings?: ParentSettings;
}

export interface ParentSettings {
  /** Topics to prioritise in the Daily 5 (e.g. what school is covering now). */
  focusTopics?: string[];
  /** Daily minutes goal suggested by the parent. */
  goalMinutes?: number;
}

/** Public account document (accounts/<id>.json) — never contains secrets. */
export interface Account {
  id: string;
  /** Family / account name used to sign in. */
  name: string;
  profiles: Profile[];
  createdAt: number;
}

/** Result of one question inside a paper attempt. */
export interface QResult {
  /** Score 0..1 (written answers can be partial). */
  r: number;
  /** Hints revealed before answering. */
  h: number;
  /** Number of checked tries. */
  t: number;
  /** 1 if the worked solution was revealed before a correct answer. */
  s?: 1;
}

/** Autosaved state of a paper / quiz / exam attempt. */
export interface AttemptState {
  index: number;
  /** MCQ: chosen option index (authored order). Short/written: the typed text. */
  answers: Record<string, number | string>;
  results: Record<string, QResult>;
  completed: boolean;
  updatedAt: number;
  /** Exams: when the clock started (ms). */
  startedAt?: number;
}

/** Spaced-repetition entry for a missed question. */
export interface SrsItem {
  /** Local date (YYYY-MM-DD) next due. */
  due: string;
  /** Successful reviews in a row (index into the ladder). */
  reps: number;
  /** When this entry last changed (ms): the newer copy wins when two devices' copies merge. Absent on old data. */
  at?: number;
}

/** Mastery state for one procedural skill (drill). */
export interface SkillState {
  /** Attempts / correct overall. */
  a: number;
  c: number;
  /** Last ≤10 results, oldest first: "1" correct, "0" wrong. */
  recent: string;
  /** Current adaptive tier 1..3. */
  tier: 1 | 2 | 3;
  /** Highest tier answered correctly. */
  best: 0 | 1 | 2 | 3;
  /** Dates (YYYY-MM-DD) of correct answers in MIXED practice (Daily 5 / review), newest last, ≤4. */
  mixed: string[];
  /** Next spaced review date for this skill. */
  due: string;
  /** Current review interval in days. */
  interval: number;
  lastAt: number;
}

export interface DayStat {
  timeMs: number;
  answered: number;
  correct: number;
  /** Answers that used at least one hint. */
  hinted: number;
  /** Stars earned from drills today (capped). */
  drillStars?: number;
}

export interface TopicStat {
  timeMs: number;
  answered: number;
  correct: number;
}

export interface ActivityEntry {
  at: number;
  type: string;
  topicId?: string;
  detail?: string;
}

export interface Analytics {
  firstActiveAt: number;
  lastActiveAt: number;
  totalTimeMs: number;
  sessionCount: number;
  answered: number;
  correct: number;
  hinted: number;
  days: Record<string, DayStat>;
  topics: Record<string, TopicStat>;
  log: ActivityEntry[];
}

/** A predictable mistake the learner made (trap feedback), for the parent view. */
export interface Slip {
  label: string;
  topicId: string;
  count: number;
  last: number;
}

export interface DailyRecord {
  correct: number;
  total: number;
  done: boolean;
}

/** The full per-learner document stored in the cloud (progress/<acc>/<profile>.json). */
export interface ProgressDoc {
  v: 2;
  /** Stars (XP) — earned for correct answers and milestones only. */
  stars: number;
  /** Idempotency keys for awards. */
  awarded: Record<string, true>;
  attempts: Record<string, AttemptState>;
  /** Guide sections read: "<topicId>#<sectionId>" and whole topics "<topicId>". */
  guidesRead: Record<string, true>;
  /** Questions answered correctly at least once (for "solved" counts). */
  solved: Record<string, true>;
  srs: Record<string, SrsItem>;
  skills: Record<string, SkillState>;
  /** Personal bests: "sprint:<mode>" → score, "challenge:<topicId>" → solved count … */
  bests: Record<string, number>;
  streak: { count: number; last: string; best: number };
  goalMinutes: number;
  /** Days per week target (weekly goal replaces endless streak pressure). */
  weeklyDays: number;
  /** Topic ids the parent/learner wants to focus on (Daily 5 uses these). */
  focusTopics: string[];
  daily: Record<string, DailyRecord>;
  slips: Record<string, Slip>;
  /** Questions the learner reported as possibly wrong/confusing (for the parent to check). */
  flags: Record<string, { at: number; note: string }>;
  last?: { href: string; label: string; topicId?: string; at: number };
  /**
   * Deletions that must survive a merge with an older copy (which still has the entry):
   * "attempt:<key>" (paper restarted) and "srs:<qid>" (graduated) → when it was removed (ms).
   */
  removed: Record<string, number>;
  /** When a parent last reset this learner (ms, set by the server). Copies from before it never merge back in. */
  resetAt: number;
  /** When the learner last changed goalMinutes / weeklyDays / focusTopics (ms; 0 = never on this app version). */
  settingsAt: number;
  analytics: Analytics;
  updatedAt: number;
}

export function emptyAnalytics(now = Date.now()): Analytics {
  return {
    firstActiveAt: now,
    lastActiveAt: now,
    totalTimeMs: 0,
    sessionCount: 0,
    answered: 0,
    correct: 0,
    hinted: 0,
    days: {},
    topics: {},
    log: [],
  };
}

export function emptyProgress(now = Date.now()): ProgressDoc {
  return {
    v: 2,
    stars: 0,
    awarded: {},
    attempts: {},
    guidesRead: {},
    solved: {},
    srs: {},
    skills: {},
    bests: {},
    streak: { count: 0, last: "", best: 0 },
    goalMinutes: 15,
    weeklyDays: 4,
    focusTopics: [],
    daily: {},
    slips: {},
    flags: {},
    removed: {},
    resetAt: 0,
    settingsAt: 0,
    analytics: emptyAnalytics(now),
    updatedAt: now,
  };
}

export function emptySkill(): SkillState {
  return { a: 0, c: 0, recent: "", tier: 1, best: 0, mixed: [], due: "", interval: 0, lastAt: 0 };
}

// ---------------------------------------------------------------------------
// Normalisation
// ---------------------------------------------------------------------------

type Obj = Record<string, unknown>;
const isObj = (v: unknown): v is Obj => typeof v === "object" && v !== null && !Array.isArray(v);

// Size caps, shared by normalisation and merging (`days`: the app shows at most a few weeks).
// A busy learner's doc can still outgrow the ~64 KB a page-close (keepalive) request may
// carry; that save then sends only what changed (progressDelta).
const CAP = {
  awarded: 20000,
  attempts: 400,
  guidesRead: 5000,
  solved: 10000,
  srs: 2000,
  skills: 1000,
  bests: 500,
  daily: 120,
  slips: 60,
  flags: 100,
  removed: 200,
  days: 120,
  topics: 100,
  log: 150,
} as const;
const num = (v: unknown, fallback = 0): number => (typeof v === "number" && Number.isFinite(v) ? v : fallback);
const str = (v: unknown, fallback = ""): string => (typeof v === "string" ? v : fallback);
const isDate = (v: unknown): v is string => typeof v === "string" && /^\d{4}-\d{2}-\d{2}$/.test(v);
const KEY_OK = (k: string) => k.length > 0 && k.length <= 160 && k !== "__proto__" && k !== "constructor" && k !== "prototype";

function mapOf<T>(v: unknown, item: (value: unknown, key: string) => T | undefined, max = 5000): Record<string, T> {
  const out: Record<string, T> = {};
  if (!isObj(v)) return out;
  let n = 0;
  for (const [key, value] of Object.entries(v)) {
    if (!KEY_OK(key)) continue;
    const parsed = item(value, key);
    if (parsed !== undefined) {
      out[key] = parsed;
      if (++n >= max) break;
    }
  }
  return out;
}
const flag = (v: unknown): true | undefined => (v ? true : undefined);
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));

function qresultOf(v: unknown): QResult | undefined {
  if (!isObj(v)) return undefined;
  const r: QResult = { r: clamp(num(v.r), 0, 1), h: clamp(Math.floor(num(v.h)), 0, 10), t: clamp(Math.floor(num(v.t)), 0, 99) };
  if (v.s === 1) r.s = 1;
  return r;
}

function attemptOf(v: unknown): AttemptState | undefined {
  if (!isObj(v)) return undefined;
  return {
    index: clamp(Math.floor(num(v.index)), 0, 999),
    answers: mapOf(v.answers, (a) => (typeof a === "number" && Number.isFinite(a) ? a : typeof a === "string" ? a.slice(0, 2000) : undefined), 400),
    results: mapOf(v.results, qresultOf, 400),
    completed: v.completed === true,
    updatedAt: num(v.updatedAt),
    ...(num(v.startedAt) > 0 ? { startedAt: num(v.startedAt) } : {}),
  };
}

function srsOf(v: unknown): SrsItem | undefined {
  if (!isObj(v) || !isDate(v.due)) return undefined;
  const item: SrsItem = { due: v.due, reps: clamp(Math.floor(num(v.reps)), 0, 10) };
  if (num(v.at) > 0) item.at = num(v.at);
  return item;
}

function skillOf(v: unknown): SkillState | undefined {
  if (!isObj(v)) return undefined;
  const tier = clamp(Math.round(num(v.tier, 1)), 1, 3) as 1 | 2 | 3;
  const best = clamp(Math.round(num(v.best)), 0, 3) as 0 | 1 | 2 | 3;
  return {
    a: Math.max(0, Math.floor(num(v.a))),
    c: Math.max(0, Math.floor(num(v.c))),
    recent: str(v.recent).replace(/[^01]/g, "").slice(-10),
    tier,
    best,
    mixed: (Array.isArray(v.mixed) ? v.mixed : []).filter(isDate).slice(-4),
    due: isDate(v.due) ? v.due : "",
    interval: clamp(num(v.interval), 0, 120),
    lastAt: num(v.lastAt),
  };
}

function dayOf(v: unknown): DayStat | undefined {
  if (!isObj(v)) return undefined;
  const d: DayStat = { timeMs: Math.max(0, num(v.timeMs)), answered: Math.max(0, num(v.answered)), correct: Math.max(0, num(v.correct)), hinted: Math.max(0, num(v.hinted)) };
  if (num(v.drillStars) > 0) d.drillStars = Math.floor(num(v.drillStars));
  return d;
}

function topicStatOf(v: unknown): TopicStat | undefined {
  if (!isObj(v)) return undefined;
  return { timeMs: Math.max(0, num(v.timeMs)), answered: Math.max(0, num(v.answered)), correct: Math.max(0, num(v.correct)) };
}

function slipOf(v: unknown): Slip | undefined {
  if (!isObj(v) || typeof v.label !== "string") return undefined;
  return { label: v.label.slice(0, 200), topicId: str(v.topicId), count: Math.max(1, Math.floor(num(v.count, 1))), last: num(v.last) };
}

function dailyOf(v: unknown): DailyRecord | undefined {
  if (!isObj(v)) return undefined;
  return { correct: Math.max(0, Math.floor(num(v.correct))), total: Math.max(0, Math.floor(num(v.total))), done: v.done === true };
}

/** Keep only the newest n entries of a date-keyed map. */
function newestDates<T>(m: Record<string, T>, n: number): Record<string, T> {
  const keys = Object.keys(m).filter(isDate).sort().slice(-n);
  const out: Record<string, T> = {};
  for (const k of keys) out[k] = m[k];
  return out;
}

/** v1 (original Maths Lab) documents used arrays and different analytics. */
function isLegacy(raw: Obj): boolean {
  return raw.v !== 2 && (Array.isArray(raw.awarded) || typeof raw.streak === "number" || Array.isArray(raw.srs) || Array.isArray(raw.guidesRead));
}

function migrateLegacy(raw: Obj): ProgressDoc {
  const doc = emptyProgress(num(raw.updatedAt, Date.now()));
  // An undated v1 copy must not look newer than real v2 data when the two are merged.
  doc.updatedAt = num(raw.updatedAt, 0);
  doc.stars = Math.max(0, num(raw.stars));
  for (const k of Array.isArray(raw.awarded) ? raw.awarded : []) if (typeof k === "string" && KEY_OK(k)) doc.awarded[`v1:${k}`] = true;
  for (const k of Array.isArray(raw.guidesRead) ? raw.guidesRead : []) {
    if (typeof k !== "string") continue;
    const topic = k.replace(/^guide:/, "").split(/[#:]/)[0];
    if (topic && KEY_OK(topic)) doc.guidesRead[topic] = true;
  }
  const streak = num(raw.streak);
  doc.streak = { count: streak, last: isDate(raw.lastActiveDate) ? raw.lastActiveDate : "", best: streak };
  doc.goalMinutes = clamp(num(raw.goalMinutes, 15), 5, 60);
  // Per-question tallies from v1 are folded into per-topic analytics (old ids no longer exist).
  const a = doc.analytics;
  if (isObj(raw.attempts)) {
    for (const [qid, v] of Object.entries(raw.attempts)) {
      if (!isObj(v)) continue;
      const tries = Math.max(0, Math.floor(num(v.attempts)));
      const ok = clamp(Math.floor(num(v.correct)), 0, tries);
      const topic = qid.replace(/-(?:mcq|qa|bank|quiz|ch)[-\w]*$/, "");
      a.answered += tries;
      a.correct += ok;
      // The topic comes from untrusted JSON: never index a plain object with "__proto__" & co.
      if (topic && topic !== qid && KEY_OK(topic)) {
        const t = Object.hasOwn(a.topics, topic) ? a.topics[topic] : { timeMs: 0, answered: 0, correct: 0 };
        t.answered += tries;
        t.correct += ok;
        a.topics[topic] = t;
      }
    }
  }
  const old = isObj(raw.analytics) ? raw.analytics : {};
  a.totalTimeMs = Math.max(0, num(old.secondsOnTask)) * 1000;
  a.sessionCount = Math.max(0, num(old.sessions));
  if (isObj(old.perDay)) {
    for (const [d, s] of Object.entries(old.perDay)) {
      if (isDate(d)) a.days[d] = { timeMs: Math.max(0, num(s)) * 1000, answered: 0, correct: 0, hinted: 0 };
    }
  }
  if (Array.isArray(old.activity)) {
    a.log = old.activity
      .filter(isObj)
      .map((e) => ({ at: num(e.t), type: str(e.kind, "start"), topicId: typeof e.topicId === "string" ? e.topicId : undefined, detail: typeof e.detail === "string" ? e.detail : undefined }))
      .slice(-120);
  }
  if (isObj(raw.challengeBest)) {
    for (const [t, v] of Object.entries(raw.challengeBest)) if (typeof v === "number" && KEY_OK(t)) doc.bests[`v1challenge:${t}`] = v;
  }
  a.firstActiveAt = a.log[0]?.at || num(raw.updatedAt, Date.now());
  a.lastActiveAt = num(raw.updatedAt, Date.now());
  return doc;
}

/** Coerce any stored value (v2, v1 or garbage) into a well-formed ProgressDoc. */
export function normalizeProgress(raw: unknown): ProgressDoc {
  if (!isObj(raw)) return emptyProgress();
  if (isLegacy(raw)) return migrateLegacy(raw);
  const base = emptyProgress();
  const streak = isObj(raw.streak) ? raw.streak : {};
  const a = isObj(raw.analytics) ? raw.analytics : {};
  const removed = keepNewest(mapOf(raw.removed, (v) => (num(v) > 0 ? num(v) : undefined)), CAP.removed, (t) => t);
  const doc: ProgressDoc = {
    v: 2,
    stars: Math.max(0, Math.floor(num(raw.stars))),
    awarded: mapOf(raw.awarded, flag, CAP.awarded),
    attempts: surviving(mapOf(raw.attempts, attemptOf, CAP.attempts), removed, "attempt", (v) => v.updatedAt),
    guidesRead: mapOf(raw.guidesRead, flag, CAP.guidesRead),
    solved: mapOf(raw.solved, flag, CAP.solved),
    srs: surviving(mapOf(raw.srs, srsOf, CAP.srs), removed, "srs", (v) => v.at ?? 0),
    skills: mapOf(raw.skills, skillOf, CAP.skills),
    bests: mapOf(raw.bests, (v) => (typeof v === "number" && Number.isFinite(v) ? v : undefined), CAP.bests),
    streak: { count: Math.max(0, num(streak.count)), last: isDate(streak.last) ? streak.last : "", best: Math.max(0, num(streak.best)) },
    goalMinutes: clamp(num(raw.goalMinutes, base.goalMinutes), 5, 60),
    weeklyDays: clamp(Math.round(num(raw.weeklyDays, base.weeklyDays)), 1, 7),
    focusTopics: (Array.isArray(raw.focusTopics) ? raw.focusTopics : []).filter((t): t is string => typeof t === "string" && /^[a-z0-9-]{2,40}$/.test(t)).slice(0, 6),
    daily: newestDates(mapOf(raw.daily, dailyOf), CAP.daily),
    slips: mapOf(raw.slips, slipOf, CAP.slips),
    flags: mapOf(raw.flags, (v) => (isObj(v) ? { at: num(v.at), note: str(v.note).slice(0, 300) } : undefined), CAP.flags),
    removed,
    resetAt: Math.max(0, num(raw.resetAt)),
    settingsAt: Math.max(0, num(raw.settingsAt)),
    analytics: {
      firstActiveAt: num(a.firstActiveAt, base.analytics.firstActiveAt),
      lastActiveAt: num(a.lastActiveAt, base.analytics.lastActiveAt),
      totalTimeMs: Math.max(0, num(a.totalTimeMs)),
      sessionCount: Math.max(0, num(a.sessionCount)),
      answered: Math.max(0, num(a.answered)),
      correct: Math.max(0, num(a.correct)),
      hinted: Math.max(0, num(a.hinted)),
      days: newestDates(mapOf(a.days, dayOf), CAP.days),
      topics: mapOf(a.topics, topicStatOf, CAP.topics),
      log: tidyLog(
        (Array.isArray(a.log) ? a.log : [])
          .filter(isObj)
          .map((e) => ({ at: num(e.at), type: str(e.type, "start").slice(0, 40), topicId: typeof e.topicId === "string" ? e.topicId.slice(0, 60) : undefined, detail: typeof e.detail === "string" ? e.detail.slice(0, 160) : undefined })),
      ),
    },
    updatedAt: num(raw.updatedAt, Date.now()),
  };
  const last = raw.last;
  if (isObj(last) && typeof last.href === "string" && last.href.startsWith("/") && !last.href.startsWith("//") && !last.href.includes("\\")) {
    doc.last = { href: last.href.slice(0, 300), label: str(last.label, "Continue").slice(0, 120), topicId: typeof last.topicId === "string" ? last.topicId : undefined, at: num(last.at) };
  }
  return doc;
}

// ---------------------------------------------------------------------------
// Merging two copies of one learner's progress (two devices, two tabs, a stale
// cache and the cloud). Pure, commutative and idempotent, and it never loses
// work from either side: sets are unioned, counters take the larger value
// (never summed, so nothing is double-counted), and per-entry conflicts go to
// the newer entry. A missing entry never means "deleted" — deletions are
// recorded in `removed` — so a partial doc (progressDelta) merges safely too.
// ---------------------------------------------------------------------------

/** JSON with sorted keys (undefined properties skipped): equality checks and deterministic tie-breaks. */
function canon(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map((x) => (x === undefined ? "null" : canon(x))).join(",")}]`;
  if (isObj(v)) {
    const keys = Object.keys(v).filter((key) => v[key] !== undefined).sort();
    return `{${keys.map((key) => `${JSON.stringify(key)}:${canon(v[key])}`).join(",")}}`;
  }
  return JSON.stringify(v) ?? "null";
}

const cmp = (x: number | string, y: number | string) => (x > y ? 1 : x < y ? -1 : 0);

/** The greater of two entries by `order`; exact ties fall back to the canonical form so the choice never depends on argument order. */
function pick<T>(x: T, y: T, order: (p: T, q: T) => number): T {
  return (order(x, y) || cmp(canon(x), canon(y))) >= 0 ? x : y;
}

/** Union of two maps; `both` resolves keys present in each. Unsafe keys are dropped. */
function unionWith<T>(x: Record<string, T>, y: Record<string, T>, both: (p: T, q: T) => T): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [key, v] of Object.entries(x)) if (KEY_OK(key)) out[key] = Object.hasOwn(y, key) ? both(v, y[key]) : v;
  for (const [key, v] of Object.entries(y)) if (KEY_OK(key) && !Object.hasOwn(x, key)) out[key] = v;
  return out;
}

/** At most `max` entries, newest first by `time` (ties by key). Returns the same map when under the cap. */
function keepNewest<T>(m: Record<string, T>, max: number, time: (v: T) => number): Record<string, T> {
  const keys = Object.keys(m);
  if (keys.length <= max) return m;
  keys.sort((p, q) => time(m[q]) - time(m[p]) || cmp(p, q));
  const out: Record<string, T> = {};
  for (const key of keys.slice(0, max)) out[key] = m[key];
  return out;
}

/** Activity log in time order, exact duplicates removed, newest CAP.log kept. */
function tidyLog(entries: ActivityEntry[]): ActivityEntry[] {
  const seen = new Set<string>();
  const out: { e: ActivityEntry; c: string }[] = [];
  for (const e of entries) {
    const c = canon(e);
    if (!seen.has(c)) {
      seen.add(c);
      out.push({ e, c });
    }
  }
  out.sort((p, q) => p.e.at - q.e.at || cmp(p.c, q.c));
  return out.slice(-CAP.log).map((x) => x.e);
}

const trueFlag = (): true => true;
const minKnown = (x: number, y: number) => (x > 0 && y > 0 ? Math.min(x, y) : Math.max(x, y));

function maxDay(x: DayStat, y: DayStat): DayStat {
  const d: DayStat = { timeMs: Math.max(x.timeMs, y.timeMs), answered: Math.max(x.answered, y.answered), correct: Math.max(x.correct, y.correct), hinted: Math.max(x.hinted, y.hinted) };
  const drillStars = Math.max(x.drillStars ?? 0, y.drillStars ?? 0);
  if (drillStars > 0) d.drillStars = drillStars;
  return d;
}

const maxTopic = (x: TopicStat, y: TopicStat): TopicStat => ({ timeMs: Math.max(x.timeMs, y.timeMs), answered: Math.max(x.answered, y.answered), correct: Math.max(x.correct, y.correct) });

const settingsKey = (d: ProgressDoc) => canon([d.goalMinutes, d.weeklyDays, d.focusTopics]);

/** Keep only entries that were not deleted after they last changed. */
function surviving<T>(m: Record<string, T>, removed: Record<string, number>, prefix: string, time: (v: T) => number): Record<string, T> {
  const out: Record<string, T> = {};
  for (const [key, v] of Object.entries(m)) if ((removed[`${prefix}:${key}`] ?? 0) <= time(v)) out[key] = v;
  return out;
}

/**
 * A streak is the run of days `count` long ending on `last`. The later run wins, but when the
 * other copy's run reaches the day before it started, the two are one run: a device that was
 * behind (stale tab, offline cache, guest mode) restarting at 1 today mustn't end a live streak.
 */
function mergeStreak(x: ProgressDoc["streak"], y: ProgressDoc["streak"]): ProgressDoc["streak"] {
  const has = (s: ProgressDoc["streak"]) => s.count > 0 && s.last !== "";
  const order = (p: ProgressDoc["streak"], q: ProgressDoc["streak"]) => cmp(p.last, q.last) || cmp(p.count, q.count);
  const best = Math.max(x.best, y.best);
  if (!has(x) || !has(y)) {
    const s = has(x) !== has(y) ? (has(x) ? x : y) : order(x, y) >= 0 ? x : y;
    return { count: s.count, last: s.last, best };
  }
  const [late, early] = order(x, y) >= 0 ? [x, y] : [y, x];
  const gap = dayDiff(early.last, late.last);
  const count = gap <= late.count ? Math.max(late.count, gap + early.count) : late.count;
  return { count, last: late.last, best: count > late.count ? Math.max(best, count) : best };
}

/** Combine two copies of the same learner's progress without losing work from either. */
export function mergeProgress(a: ProgressDoc, b: ProgressDoc): ProgressDoc {
  // A parent reset starts a new epoch: a copy from before it never merges back in.
  if (a.resetAt !== b.resetAt) return a.resetAt > b.resetAt ? a : b;
  // Settings (goal, weekly days, focus topics) come from the copy where they were changed last
  // (not the copy saved last: a stale tab's heartbeat would otherwise put its old goal back).
  // Copies that never stamped a change (older app) fall back to the copy saved last.
  const settingsOrder = (d: ProgressDoc) => (d.settingsAt > 0 ? 0 : d.updatedAt);
  const newer = (cmp(a.settingsAt, b.settingsAt) || cmp(settingsOrder(a), settingsOrder(b)) || cmp(settingsKey(a), settingsKey(b))) >= 0 ? a : b;
  const removed = keepNewest(unionWith(a.removed, b.removed, Math.max), CAP.removed, (t) => t);
  const attempts = surviving(
    unionWith(a.attempts, b.attempts, (x, y) => pick(x, y, (p, q) => cmp(p.updatedAt, q.updatedAt))),
    removed,
    "attempt",
    (v) => v.updatedAt,
  );
  // Newer entry first; with no timestamps, the sooner review (earlier due, fewer reps) is the safe choice.
  const srs = surviving(
    unionWith(a.srs, b.srs, (x, y) => pick(x, y, (p, q) => cmp(p.at ?? 0, q.at ?? 0) || cmp(q.due, p.due) || cmp(q.reps, p.reps))),
    removed,
    "srs",
    (v) => v.at ?? 0,
  );
  const sa = a.streak;
  const sb = b.streak;
  const slipOfBoth = (x: Slip, y: Slip): Slip => {
    const w = pick(x, y, (p, q) => cmp(p.last, q.last));
    return { label: w.label, topicId: w.topicId, count: Math.max(x.count, y.count), last: w.last };
  };
  const last = a.last && b.last ? pick(a.last, b.last, (p, q) => cmp(p.at, q.at)) : a.last ?? b.last;
  const A = a.analytics;
  const B = b.analytics;
  return {
    v: 2,
    // Stars are never summed: the larger total can't double-count an award both copies hold.
    stars: Math.max(a.stars, b.stars),
    awarded: keepNewest(unionWith(a.awarded, b.awarded, trueFlag), CAP.awarded, () => 0),
    attempts: keepNewest(attempts, CAP.attempts, (v) => v.updatedAt),
    guidesRead: keepNewest(unionWith(a.guidesRead, b.guidesRead, trueFlag), CAP.guidesRead, () => 0),
    solved: keepNewest(unionWith(a.solved, b.solved, trueFlag), CAP.solved, () => 0),
    srs: keepNewest(srs, CAP.srs, (v) => v.at ?? 0),
    skills: keepNewest(
      unionWith(a.skills, b.skills, (x, y) => pick(x, y, (p, q) => cmp(p.a, q.a) || cmp(p.lastAt, q.lastAt))),
      CAP.skills,
      (v) => v.lastAt,
    ),
    bests: keepNewest(unionWith(a.bests, b.bests, Math.max), CAP.bests, () => 0),
    streak: mergeStreak(sa, sb),
    goalMinutes: newer.goalMinutes,
    weeklyDays: newer.weeklyDays,
    focusTopics: newer.focusTopics,
    daily: newestDates(
      unionWith(a.daily, b.daily, (x, y) => pick(x, y, (p, q) => cmp(p.done ? 1 : 0, q.done ? 1 : 0) || cmp(p.correct, q.correct) || cmp(p.total, q.total))),
      CAP.daily,
    ),
    slips: keepNewest(unionWith(a.slips, b.slips, slipOfBoth), CAP.slips, (v) => v.last),
    flags: keepNewest(unionWith(a.flags, b.flags, (x, y) => pick(x, y, (p, q) => cmp(p.at, q.at))), CAP.flags, (v) => v.at),
    ...(last ? { last } : {}),
    removed,
    resetAt: a.resetAt,
    settingsAt: Math.max(a.settingsAt, b.settingsAt),
    analytics: {
      firstActiveAt: minKnown(A.firstActiveAt, B.firstActiveAt),
      lastActiveAt: Math.max(A.lastActiveAt, B.lastActiveAt),
      totalTimeMs: Math.max(A.totalTimeMs, B.totalTimeMs),
      sessionCount: Math.max(A.sessionCount, B.sessionCount),
      answered: Math.max(A.answered, B.answered),
      correct: Math.max(A.correct, B.correct),
      hinted: Math.max(A.hinted, B.hinted),
      days: newestDates(unionWith(A.days, B.days, maxDay), CAP.days),
      topics: keepNewest(unionWith(A.topics, B.topics, maxTopic), CAP.topics, (t) => t.answered),
      log: tidyLog([...A.log, ...B.log]),
    },
    updatedAt: Math.max(a.updatedAt, b.updatedAt),
  };
}

/** Same content (key order ignored). */
export function sameProgress(a: ProgressDoc, b: ProgressDoc): boolean {
  return canon(a) === canon(b);
}

/**
 * Idempotency key for bringing one guest copy into a learner (the same copy → the same key).
 * Leaves out the timestamps normalisation may fill in with "now" (an undated v1 copy).
 */
export function importKey(guest: ProgressDoc): string {
  const s = canon({ ...guest, resetAt: 0, updatedAt: 0, analytics: { ...guest.analytics, firstActiveAt: 0, lastActiveAt: 0 } });
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < s.length; i++) {
    const c = s.charCodeAt(i);
    h1 = Math.imul(h1 ^ c, 2654435761);
    h2 = Math.imul(h2 ^ c, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `import:${(h2 >>> 0).toString(36)}-${(h1 >>> 0).toString(36)}`;
}

/**
 * Guest progress from this device brought into a learner (`doc`, null if they have nothing
 * saved yet). It is separate work, so unlike a merge (which keeps the larger of two copies of
 * the same history) stars and answer/time counts add up; everything else merges as usual and
 * the result joins the learner's reset epoch. A copy already brought across (a retry after a
 * lost reply) is only merged, never added twice.
 */
export function importProgress(doc: ProgressDoc | null, guest: ProgressDoc): ProgressDoc {
  const key = importKey(guest);
  if (!doc) return { ...guest, resetAt: 0, awarded: { ...guest.awarded, [key]: true } };
  const g: ProgressDoc = { ...guest, resetAt: doc.resetAt };
  const m = mergeProgress(doc, g);
  if (doc.awarded[key]) return m;
  const A = doc.analytics;
  const B = g.analytics;
  const addDay = (x: DayStat, y: DayStat): DayStat => {
    const d: DayStat = { timeMs: x.timeMs + y.timeMs, answered: x.answered + y.answered, correct: x.correct + y.correct, hinted: x.hinted + y.hinted };
    const drillStars = (x.drillStars ?? 0) + (y.drillStars ?? 0);
    if (drillStars > 0) d.drillStars = drillStars;
    return d;
  };
  const addTopic = (x: TopicStat, y: TopicStat): TopicStat => ({ timeMs: x.timeMs + y.timeMs, answered: x.answered + y.answered, correct: x.correct + y.correct });
  return {
    ...m,
    stars: doc.stars + g.stars,
    awarded: { ...m.awarded, [key]: true },
    analytics: {
      ...m.analytics,
      totalTimeMs: A.totalTimeMs + B.totalTimeMs,
      sessionCount: A.sessionCount + B.sessionCount,
      answered: A.answered + B.answered,
      correct: A.correct + B.correct,
      hinted: A.hinted + B.hinted,
      days: newestDates(unionWith(A.days, B.days, addDay), CAP.days),
      topics: keepNewest(unionWith(A.topics, B.topics, addTopic), CAP.topics, (t) => t.answered),
    },
  };
}

/**
 * Only what changed in `doc` since `base` (a copy the server already holds), as a
 * ProgressDoc. Since merging treats a missing entry as "no news", merging this delta
 * into the server's copy gives the same result as merging the whole doc — so it can
 * stand in for a doc too big for a page-close (keepalive) request.
 */
export function progressDelta(doc: ProgressDoc, base: ProgressDoc): ProgressDoc {
  if (doc.resetAt !== base.resetAt) return doc;
  const changed = <T>(m: Record<string, T>, old: Record<string, T>): Record<string, T> => {
    const out: Record<string, T> = {};
    for (const [key, v] of Object.entries(m)) if (!Object.hasOwn(old, key) || canon(old[key]) !== canon(v)) out[key] = v;
    return out;
  };
  const seen = new Set(base.analytics.log.map(canon));
  return {
    ...doc,
    awarded: changed(doc.awarded, base.awarded),
    attempts: changed(doc.attempts, base.attempts),
    guidesRead: changed(doc.guidesRead, base.guidesRead),
    solved: changed(doc.solved, base.solved),
    srs: changed(doc.srs, base.srs),
    skills: changed(doc.skills, base.skills),
    bests: changed(doc.bests, base.bests),
    daily: changed(doc.daily, base.daily),
    slips: changed(doc.slips, base.slips),
    flags: changed(doc.flags, base.flags),
    removed: changed(doc.removed, base.removed),
    analytics: {
      ...doc.analytics,
      days: changed(doc.analytics.days, base.analytics.days),
      topics: changed(doc.analytics.topics, base.analytics.topics),
      log: doc.analytics.log.filter((e) => !seen.has(canon(e))),
    },
  };
}

/** Record that an entry ("attempt:<key>" / "srs:<qid>") was deleted at `at`, so an older copy can't bring it back. */
export function withRemoved(removed: Record<string, number>, key: string, at: number): Record<string, number> {
  return keepNewest({ ...removed, [key]: Math.max(at, removed[key] ?? 0) }, CAP.removed, (t) => t);
}

/** Days the learner has been active this week (for the weekly goal). */
export function activeDaysThisWeek(doc: ProgressDoc, weekStart: string): number {
  let n = 0;
  for (const [d, s] of Object.entries(doc.analytics.days)) if (d >= weekStart && d <= todayISO() && (s.answered > 0 || s.timeMs >= 120000)) n++;
  return n;
}
