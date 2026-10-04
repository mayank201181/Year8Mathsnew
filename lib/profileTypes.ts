// ---------------------------------------------------------------------------
// Account / learner / progress shapes shared by the client store and the API,
// plus normalisation (and migration from the v1 Maths Lab format).
// Imports only relative .ts files so Node tests can load it directly.
// ---------------------------------------------------------------------------
import { todayISO } from "./dates.ts";

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
  return { due: v.due, reps: clamp(Math.floor(num(v.reps)), 0, 10) };
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
  doc.stars = Math.max(0, num(raw.stars));
  for (const k of Array.isArray(raw.awarded) ? raw.awarded : []) if (typeof k === "string" && KEY_OK(k)) doc.awarded[`v1:${k}`] = true;
  for (const k of Array.isArray(raw.guidesRead) ? raw.guidesRead : []) {
    if (typeof k !== "string") continue;
    const topic = k.replace(/^guide:/, "").split(/[#:]/)[0];
    if (topic) doc.guidesRead[topic] = true;
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
      if (topic && topic !== qid) {
        const t = a.topics[topic] ?? { timeMs: 0, answered: 0, correct: 0 };
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
  a.firstActiveAt = a.log[0]?.at || doc.updatedAt;
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
  const doc: ProgressDoc = {
    v: 2,
    stars: Math.max(0, Math.floor(num(raw.stars))),
    awarded: mapOf(raw.awarded, flag, 20000),
    attempts: mapOf(raw.attempts, attemptOf, 400),
    guidesRead: mapOf(raw.guidesRead, flag),
    solved: mapOf(raw.solved, flag, 10000),
    srs: mapOf(raw.srs, srsOf, 2000),
    skills: mapOf(raw.skills, skillOf, 1000),
    bests: mapOf(raw.bests, (v) => (typeof v === "number" && Number.isFinite(v) ? v : undefined), 500),
    streak: { count: Math.max(0, num(streak.count)), last: isDate(streak.last) ? streak.last : "", best: Math.max(0, num(streak.best)) },
    goalMinutes: clamp(num(raw.goalMinutes, base.goalMinutes), 5, 60),
    weeklyDays: clamp(Math.round(num(raw.weeklyDays, base.weeklyDays)), 1, 7),
    focusTopics: (Array.isArray(raw.focusTopics) ? raw.focusTopics : []).filter((t): t is string => typeof t === "string" && /^[a-z0-9-]{2,40}$/.test(t)).slice(0, 6),
    daily: newestDates(mapOf(raw.daily, dailyOf), 120),
    slips: mapOf(raw.slips, slipOf, 60),
    flags: mapOf(raw.flags, (v) => (isObj(v) ? { at: num(v.at), note: str(v.note).slice(0, 300) } : undefined), 100),
    analytics: {
      firstActiveAt: num(a.firstActiveAt, base.analytics.firstActiveAt),
      lastActiveAt: num(a.lastActiveAt, base.analytics.lastActiveAt),
      totalTimeMs: Math.max(0, num(a.totalTimeMs)),
      sessionCount: Math.max(0, num(a.sessionCount)),
      answered: Math.max(0, num(a.answered)),
      correct: Math.max(0, num(a.correct)),
      hinted: Math.max(0, num(a.hinted)),
      days: newestDates(mapOf(a.days, dayOf), 400),
      topics: mapOf(a.topics, topicStatOf, 100),
      log: (Array.isArray(a.log) ? a.log : [])
        .filter(isObj)
        .map((e) => ({ at: num(e.at), type: str(e.type, "start").slice(0, 40), topicId: typeof e.topicId === "string" ? e.topicId.slice(0, 60) : undefined, detail: typeof e.detail === "string" ? e.detail.slice(0, 160) : undefined }))
        .slice(-150),
    },
    updatedAt: num(raw.updatedAt, Date.now()),
  };
  const last = raw.last;
  if (isObj(last) && typeof last.href === "string" && last.href.startsWith("/") && !last.href.startsWith("//") && !last.href.includes("\\")) {
    doc.last = { href: last.href.slice(0, 300), label: str(last.label, "Continue").slice(0, 120), topicId: typeof last.topicId === "string" ? last.topicId : undefined, at: num(last.at) };
  }
  return doc;
}

/** Days the learner has been active this week (for the weekly goal). */
export function activeDaysThisWeek(doc: ProgressDoc, weekStart: string): number {
  let n = 0;
  for (const [d, s] of Object.entries(doc.analytics.days)) if (d >= weekStart && d <= todayISO() && (s.answered > 0 || s.timeMs >= 120000)) n++;
  return n;
}
