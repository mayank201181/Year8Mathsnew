"use client";

// ---------------------------------------------------------------------------
// Global learner store.
//
// - Cloud mode: a family account with learner profiles; progress syncs to the
//   server (Vercel Blob) and is cached in localStorage for offline use.
// - Guest mode: no account; progress lives on this device only.
//
// Sync safety: every save is an immutable snapshot bound to one account+learner,
// and the server MERGES it into the stored copy (mergeProgress in profileTypes),
// so a stale tab or device can never erase newer work; only a PIN-checked reset
// overwrites. Unsynced local work ("dirty") is merged with the cloud copy on
// load. If the cloud copy can't be read and nothing here is unsynced, the
// learner isn't opened (Retry screen), so an old copy is never pushed.
// ---------------------------------------------------------------------------

import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from "react";
import type { Difficulty } from "./types";
import type { Account, AttemptState, DayStat, Profile, ProgressDoc, Slip } from "./profileTypes";
import { emptyProgress, mergeProgress, normalizeProgress, progressDelta, sameProgress, withRemoved } from "./profileTypes";
import { createProgressSaveQueue, withProgressTimeout, type ProgressSaveSnapshot } from "./progressSaveQueue";
import { DRILL_STAR_CAP, nextSrs, skillLevel, slipKey, starsFor, updateSkill } from "./learning";
import { todayISO } from "./dates";

export type Status = "loading" | "anon" | "no-profile" | "ready" | "load-error";
export type Mode = "cloud" | "guest";

const HEARTBEAT_MS = 20000;
/** Time on task only counts while the learner did something this recently. */
const IDLE_MS = 120000;
const INPUT_EVENTS = ["pointerdown", "keydown", "touchstart", "wheel", "scroll"] as const;
/** Browsers cap request bodies that may outlive the page (keepalive) at 64 KiB. */
const KEEPALIVE_MAX = 60000;
const GUEST_PROFILE: Profile = { id: "guest", name: "Guest", avatar: "🦊", createdAt: 0 };

const k = {
  cache: (acc: string, pid: string) => `y8m2:cache:${acc}:${pid}`,
  guest: "y8m2:guest",
  last: (acc: string) => `y8m2:last:${acc}`,
  mode: "y8m2:mode",
  // v1 keys (read once for migration)
  legacyProgress: (pid: string) => `y8m_progress_${pid}`,
  legacyActive: "y8m_active_profile",
};

function lsGet(key: string): string | null {
  try {
    return localStorage.getItem(key);
  } catch {
    return null;
  }
}
function lsSet(key: string, value: string) {
  try {
    localStorage.setItem(key, value);
  } catch {
    /* storage blocked or full */
  }
}
function lsDel(key: string) {
  try {
    localStorage.removeItem(key);
  } catch {
    /* ignore */
  }
}

const OFFLINE = "Couldn't reach the server. Check your internet connection and try again.";
async function callJson(url: string, method: string, body?: unknown): Promise<{ ok: boolean; status: number; data: Record<string, unknown> }> {
  try {
    const r = await fetch(url, {
      method,
      headers: body ? { "Content-Type": "application/json" } : undefined,
      body: body ? JSON.stringify(body) : undefined,
      cache: "no-store",
    });
    const data = await r.json().catch(() => ({}));
    return { ok: r.ok, status: r.status, data: (data && typeof data === "object" ? data : {}) as Record<string, unknown> };
  } catch {
    return { ok: false, status: 0, data: { error: OFFLINE } };
  }
}
const errorOf = (d: Record<string, unknown>) => (typeof d.error === "string" ? d.error : "Something went wrong. Please try again.");

function currentTopicId(): string | undefined {
  if (typeof window === "undefined") return undefined;
  const m = window.location.pathname.match(/\/(?:topic|certificate)\/([a-z0-9-]{2,60})(?:[/?#]|$)/);
  return m ? m[1] : undefined;
}

const byteLength = (s: string) => new TextEncoder().encode(s).length;

/** The snapshot as a delta against the last copy the server confirmed (null if there isn't one). */
function deltaBody(snapshot: ProgressSaveSnapshot, synced: { cacheKey: string; body: string } | null): string | null {
  if (!synced || synced.cacheKey !== snapshot.cacheKey) return null;
  try {
    const cur = JSON.parse(snapshot.body) as { profileId: string; progress: unknown };
    const base = JSON.parse(synced.body) as { progress: unknown };
    return JSON.stringify({ profileId: cur.profileId, progress: progressDelta(normalizeProgress(cur.progress), normalizeProgress(base.progress)) });
  } catch {
    return null;
  }
}

function bumpStreak(s: ProgressDoc["streak"]): ProgressDoc["streak"] {
  const today = todayISO();
  if (s.last === today) return s;
  const y = new Date();
  y.setDate(y.getDate() - 1);
  const yesterday = `${y.getFullYear()}-${String(y.getMonth() + 1).padStart(2, "0")}-${String(y.getDate()).padStart(2, "0")}`;
  const count = s.last === yesterday ? s.count + 1 : 1;
  return { count, last: today, best: Math.max(s.best, count) };
}

function pushLog(doc: ProgressDoc, type: string, topicId?: string, detail?: string): ProgressDoc["analytics"] {
  return { ...doc.analytics, log: [...doc.analytics.log, { at: Date.now(), type, topicId, detail }].slice(-150), lastActiveAt: Date.now() };
}

function bumpDay(doc: ProgressDoc, f: (d: DayStat) => DayStat): Record<string, DayStat> {
  const today = todayISO();
  const days = { ...doc.analytics.days };
  days[today] = f({ ...(days[today] ?? { timeMs: 0, answered: 0, correct: 0, hinted: 0 }) });
  return days;
}

function withSlip(slips: Record<string, Slip>, topicId: string, label: string): Record<string, Slip> {
  const key = slipKey(topicId, label);
  const next = { ...slips };
  const cur = next[key];
  next[key] = { label: label.slice(0, 200), topicId, count: (cur?.count ?? 0) + 1, last: Date.now() };
  const keys = Object.keys(next);
  if (keys.length > 60) {
    keys.sort((a, b) => next[a].last - next[b].last);
    for (const old of keys.slice(0, keys.length - 60)) delete next[old];
  }
  return next;
}

export interface AnswerRecord {
  qid: string;
  topicId?: string;
  difficulty: Difficulty;
  /** Fully correct (score 1). */
  correct: boolean;
  hints: number;
  tries: number;
  solutionShown: boolean;
  /** Feedback text of a matched trap (a predictable slip). */
  slip?: string;
  /** Answered in mixed practice (Daily 5 / review). */
  mixed?: boolean;
}

export interface SkillRecord {
  skillId: string;
  topicId: string;
  correct: boolean;
  tier: 1 | 2 | 3;
  hinted: boolean;
  solutionShown: boolean;
  mixed: boolean;
  slip?: string;
}

interface StoreValue {
  status: Status;
  mode: Mode;
  /** Accounts/cloud sync available on this deployment. */
  cloudAvailable: boolean;
  account: Account | null;
  activeProfile: Profile | null;
  data: ProgressDoc;
  /** Parent focus topics merged with the learner's own. */
  focusTopics: string[];
  // auth / profiles
  signup: (name: string, password: string, pin: string) => Promise<{ ok: boolean; error?: string }>;
  login: (name: string, password: string) => Promise<{ ok: boolean; error?: string }>;
  logout: () => Promise<void>;
  startGuest: () => void;
  leaveGuest: () => void;
  /** `importError`: the learner was added but the guest progress couldn't be copied (retry with importGuest). */
  createProfile: (name: string, avatar: string, importGuest?: boolean) => Promise<{ ok: boolean; error?: string; importError?: string }>;
  /** Merge this device's guest progress into a learner, then open them. */
  importGuest: (profileId: string) => Promise<{ ok: boolean; error?: string }>;
  updateProfile: (id: string, name: string, avatar: string) => Promise<{ ok: boolean; error?: string }>;
  deleteProfile: (id: string, pin: string) => Promise<{ ok: boolean; error?: string }>;
  selectProfile: (id: string) => Promise<void>;
  switchProfile: () => void;
  retryLoad: () => Promise<void>;
  refreshAccount: () => Promise<void>;
  guestHasProgress: () => boolean;
  // progress
  recordAnswer: (r: AnswerRecord) => number;
  recordSkill: (r: SkillRecord) => { stars: number; levelUp: number | null };
  award: (key: string, amount: number) => number;
  saveAttempt: (key: string, state: AttemptState) => void;
  clearAttempt: (key: string) => void;
  markSectionRead: (topicId: string, sectionId: string) => void;
  finishDaily: (correct: number, total: number) => number;
  setBest: (key: string, value: number) => boolean;
  setGoalMinutes: (m: number) => void;
  setWeeklyDays: (n: number) => void;
  setFocusTopics: (ids: string[]) => void;
  setLast: (href: string, label: string, topicId?: string) => void;
  flagQuestion: (qid: string, note: string) => void;
  /** Start again from zero. In cloud mode the parent PIN is checked by the server. */
  resetAll: (pin?: string) => Promise<{ ok: boolean; error?: string }>;
}

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [mode, setMode] = useState<Mode>("cloud");
  const [cloudAvailable, setCloudAvailable] = useState(false);
  const [account, setAccount] = useState<Account | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [data, setData] = useState<ProgressDoc>(() => emptyProgress(0));

  // Handlers read the latest committed values through these refs.
  const dataRef = useRef(data);
  const accountRef = useRef(account);
  const activeRef = useRef(activeProfile);
  const modeRef = useRef(mode);
  useLayoutEffect(() => {
    dataRef.current = data;
    accountRef.current = account;
    activeRef.current = activeProfile;
    modeRef.current = mode;
  });
  const canSaveRef = useRef(false);
  const loadVersion = useRef(0);
  const saveRevision = useRef(0);
  /** Last save body the server confirmed for the open learner (base for page-close deltas). */
  const syncedRef = useRef<{ cacheKey: string; body: string } | null>(null);
  const saver = useRef<ReturnType<typeof createProgressSaveQueue> | null>(null);

  // Merge another copy of the open learner's progress (a server reply, another tab) into
  // ours. Merging never drops local work; an unchanged result keeps the same object, so it
  // doesn't trigger another save.
  const mergeIn = useCallback((other: ProgressDoc) => {
    setData((cur) => {
      if (!canSaveRef.current) return cur;
      const next = mergeProgress(cur, other);
      return sameProgress(next, cur) ? cur : next;
    });
  }, []);

  // Created on first use (never during render).
  const getSaver = useCallback(() => {
    saver.current ??= createProgressSaveQueue(async (snapshot, urgent) => {
      if (accountRef.current?.id !== snapshot.accountId) throw new Error("Account changed before save");
      let body = snapshot.body;
      let whole = true;
      if (urgent && byteLength(body) > KEEPALIVE_MAX) {
        // Too big to outlive the page: send only what the server doesn't have yet.
        const delta = deltaBody(snapshot, syncedRef.current);
        if (delta && byteLength(delta) <= KEEPALIVE_MAX) {
          body = delta;
          whole = false;
        }
      }
      // Only page-hide saves use keepalive, so they get the browser's whole keepalive quota.
      const keepalive = urgent && byteLength(body) <= KEEPALIVE_MAX;
      const post = (keep: boolean) =>
        withProgressTimeout((signal) => fetch("/api/progress", { method: "POST", headers: { "Content-Type": "application/json" }, body, signal, keepalive: keep }));
      let response: Response;
      try {
        response = await post(keepalive);
      } catch (e) {
        // A keepalive request over the browser's quota is refused (TypeError): send it normally.
        if (!keepalive || !(e instanceof TypeError)) throw e;
        response = await post(false);
      }
      if (!response.ok) throw new Error("Progress could not be saved");
      if (whole) {
        if (lsGet(`${snapshot.cacheKey}:dirty`) === snapshot.revision) lsDel(`${snapshot.cacheKey}:dirty`);
        syncedRef.current = { cacheKey: snapshot.cacheKey, body: snapshot.body };
      }
      // The server's copy had work ours lacks (another tab or device): take it in.
      const reply = (await response.json().catch(() => null)) as { progress?: unknown } | null;
      if (reply?.progress && modeRef.current === "cloud" && accountRef.current?.id === snapshot.accountId && activeRef.current?.id === snapshot.profileId) {
        mergeIn(normalizeProgress(reply.progress));
      }
    }, 1500);
    return saver.current;
  }, [mergeIn]);

  // Send at once on hide/close (not behind a save in flight); cancel on unmount (dirty cache keeps unsent work).
  useEffect(() => {
    const onHide = (e: Event) => {
      if (e.type === "pagehide" || document.visibilityState === "hidden") void saver.current?.flushNow().catch(() => {});
    };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", onHide);
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      window.removeEventListener("pagehide", onHide);
      canSaveRef.current = false;
      // A counter, not a DOM ref: bumping the live value is the point (late loads become stale).
      // eslint-disable-next-line react-hooks/exhaustive-deps
      ++loadVersion.current;
      saver.current?.cancel();
    };
  }, []);

  // ---------------------------------------------------------------- loading
  const loadGuest = useCallback(() => {
    ++loadVersion.current;
    let doc: ProgressDoc | null = null;
    const raw = lsGet(k.guest) ?? lsGet(k.legacyProgress("guest"));
    if (raw) {
      try {
        doc = normalizeProgress(JSON.parse(raw));
      } catch {
        doc = null;
      }
    }
    doc = doc ?? emptyProgress();
    doc = { ...doc, analytics: pushLog({ ...doc, analytics: { ...doc.analytics, sessionCount: doc.analytics.sessionCount + 1 } }, "start") };
    setMode("guest");
    setAccount(null);
    setActiveProfile(GUEST_PROFILE);
    setData(doc);
    lsSet(k.mode, "guest");
    canSaveRef.current = true;
    setStatus("ready");
  }, []);

  const loadProfile = useCallback(async (acc: Account, prof: Profile) => {
    const version = ++loadVersion.current;
    canSaveRef.current = false;
    setStatus("loading");
    await getSaver().flush().catch(() => {});
    if (version !== loadVersion.current) return;
    setMode("cloud");
    setActiveProfile(prof);
    const key = k.cache(acc.id, prof.id);
    let cached: ProgressDoc | null = null;
    let dirty = false;
    try {
      const raw = lsGet(key);
      if (raw) {
        cached = normalizeProgress(JSON.parse(raw));
        dirty = !!lsGet(`${key}:dirty`);
      } else {
        // v1 cache: only worth keeping if it holds unsynced work.
        const legacy = lsGet(k.legacyProgress(prof.id));
        if (legacy && lsGet(`${k.legacyProgress(prof.id)}:dirty`)) {
          cached = normalizeProgress(JSON.parse(legacy));
          dirty = true;
        }
      }
    } catch {
      cached = null;
    }
    let doc = cached ?? emptyProgress();
    setData(doc); // never inherit the previous learner's state
    let cloudRead = false;
    let cloud: ProgressDoc | null = null;
    try {
      const j = await withProgressTimeout(async (signal) => {
        const r = await fetch(`/api/progress?profileId=${encodeURIComponent(prof.id)}`, { cache: "no-store", signal });
        if (!r.ok) throw new Error("Progress unavailable");
        return (await r.json()) as { progress: unknown };
      });
      if (version !== loadVersion.current) return;
      cloudRead = true;
      cloud = j.progress ? normalizeProgress(j.progress) : null;
    } catch {
      if (version !== loadVersion.current) return;
    }
    if (version !== loadVersion.current) return;
    if (!cloudRead && !(cached && dirty)) {
      // The cloud copy couldn't be checked and nothing here is unsynced: don't open (and
      // later save) a copy that may be out of date. Unsynced work is fine — the server merges it.
      setStatus("load-error");
      return;
    }
    // Unsynced work from this device is merged with the cloud copy, never chosen over it.
    if (cloud) doc = cached && dirty ? mergeProgress(cached, cloud) : cloud;
    syncedRef.current = cloud ? { cacheKey: key, body: JSON.stringify({ profileId: prof.id, progress: cloud }) } : null;
    doc = { ...doc, analytics: pushLog({ ...doc, analytics: { ...doc.analytics, sessionCount: doc.analytics.sessionCount + 1 } }, "start") };
    setData(doc);
    lsSet(k.last(acc.id), prof.id);
    canSaveRef.current = true;
    setStatus("ready");
  }, [getSaver]);

  const safeLoadProfile = useCallback(
    async (acc: Account, prof: Profile) => {
      try {
        await loadProfile(acc, prof);
      } catch (e) {
        console.error("Could not load learner progress", e);
        canSaveRef.current = false;
        setStatus("load-error");
      }
    },
    [loadProfile],
  );

  // Starts in "loading" (initial state, or set by the caller) so the mount effect never sets state synchronously.
  const bootstrap = useCallback(async () => {
    const r = await callJson("/api/auth/me", "GET");
    // Only a definite answer may lead to guest mode or sign-in: a failed check (offline,
    // server error) shows the Retry screen instead of quietly dropping a family into guest mode.
    if (!r.ok || typeof r.data.accounts !== "boolean") {
      setStatus("load-error");
      return;
    }
    const cloud = r.data.accounts;
    setCloudAvailable(cloud);
    const acc = r.data.account && typeof r.data.account === "object" ? (r.data.account as Account) : null;
    if (acc) {
      acc.profiles = Array.isArray(acc.profiles) ? acc.profiles : [];
      setAccount(acc);
      setMode("cloud");
      lsDel(k.mode); // signed in: an old "guest" choice must not come back later
      const lastId = lsGet(k.last(acc.id)) ?? lsGet(k.legacyActive);
      const prof = acc.profiles.find((p) => p.id === lastId) ?? (acc.profiles.length === 1 ? acc.profiles[0] : undefined);
      if (prof) await safeLoadProfile(acc, prof);
      else setStatus("no-profile");
      return;
    }
    // No account: resume guest mode if chosen before (or if v1 guest data exists), else ask.
    const hadGuest = lsGet(k.mode) === "guest" || !!lsGet(k.legacyProgress("guest"));
    if (hadGuest || !cloud) loadGuest();
    else setStatus("anon");
  }, [loadGuest, safeLoadProfile]);

  useEffect(() => {
    // bootstrap awaits /api/auth/me before it sets any state.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void bootstrap();
  }, [bootstrap]);

  // ------------------------------------------------------------- persisting
  useEffect(() => {
    if (status !== "ready" || !canSaveRef.current || !activeRef.current) return;
    if (modeRef.current === "guest") {
      lsSet(k.guest, JSON.stringify(data));
      return;
    }
    const acc = accountRef.current;
    if (!acc) return;
    const pid = activeRef.current.id;
    const key = k.cache(acc.id, pid);
    const revision = `${Date.now()}:${++saveRevision.current}`;
    lsSet(key, JSON.stringify(data));
    lsSet(`${key}:dirty`, revision);
    getSaver().schedule({ accountId: acc.id, profileId: pid, cacheKey: key, revision, body: JSON.stringify({ profileId: pid, progress: data }) });
  }, [data, status, getSaver]);

  // Another tab saved the same learner: merge its copy in, so this tab's next save carries
  // that work too (in guest mode there is no server to merge for us).
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (!e.newValue || !canSaveRef.current) return;
      const acc = accountRef.current;
      const prof = activeRef.current;
      const key = modeRef.current === "guest" ? k.guest : acc && prof ? k.cache(acc.id, prof.id) : null;
      if (!key || e.key !== key) return;
      try {
        mergeIn(normalizeProgress(JSON.parse(e.newValue)));
      } catch {
        /* unreadable: ignore */
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [mergeIn]);

  // ----------------------------------------------------- time-on-task beat
  // Last learner input: an open but untouched page isn't study time.
  const lastInputRef = useRef(0);
  useEffect(() => {
    const mark = () => {
      lastInputRef.current = Date.now();
    };
    const opts = { capture: true, passive: true };
    for (const type of INPUT_EVENTS) window.addEventListener(type, mark, opts);
    return () => {
      for (const type of INPUT_EVENTS) window.removeEventListener(type, mark, opts);
    };
  }, []);

  useEffect(() => {
    if (status !== "ready") return;
    lastInputRef.current = Date.now(); // opening a learner counts as activity
    const id = setInterval(() => {
      // Idle (or hidden): change nothing, so nothing is saved either.
      if (!canSaveRef.current || document.visibilityState !== "visible" || Date.now() - lastInputRef.current > IDLE_MS) return;
      const tid = currentTopicId();
      setData((d) => {
        if (!canSaveRef.current) return d;
        const topics = { ...d.analytics.topics };
        if (tid) {
          const t = topics[tid] ?? { timeMs: 0, answered: 0, correct: 0 };
          topics[tid] = { ...t, timeMs: t.timeMs + HEARTBEAT_MS };
        }
        return {
          ...d,
          updatedAt: Date.now(),
          analytics: {
            ...d.analytics,
            totalTimeMs: d.analytics.totalTimeMs + HEARTBEAT_MS,
            lastActiveAt: Date.now(),
            days: bumpDay(d, (x) => ({ ...x, timeMs: x.timeMs + HEARTBEAT_MS })),
            topics,
          },
        };
      });
    }, HEARTBEAT_MS);
    return () => clearInterval(id);
  }, [status]);

  // -------------------------------------------------------- auth/profiles
  const signup = useCallback(async (name: string, password: string, pin: string) => {
    const { ok, data: d } = await callJson("/api/auth/signup", "POST", { name, password, pin });
    if (!ok) return { ok: false, error: errorOf(d) };
    const acc = d.account as Account;
    setAccount({ ...acc, profiles: acc.profiles ?? [] });
    setMode("cloud");
    lsDel(k.mode);
    canSaveRef.current = false;
    setStatus("no-profile");
    return { ok: true };
  }, []);

  const login = useCallback(
    async (name: string, password: string) => {
      const { ok, data: d } = await callJson("/api/auth/login", "POST", { name, password });
      if (!ok) return { ok: false, error: errorOf(d) };
      const acc = d.account as Account;
      acc.profiles = Array.isArray(acc.profiles) ? acc.profiles : [];
      setAccount(acc);
      setMode("cloud");
      lsDel(k.mode);
      canSaveRef.current = false;
      const lastId = lsGet(k.last(acc.id));
      const prof = acc.profiles.find((p) => p.id === lastId) ?? (acc.profiles.length === 1 ? acc.profiles[0] : undefined);
      if (prof) await safeLoadProfile(acc, prof);
      else setStatus("no-profile");
      return { ok: true };
    },
    [safeLoadProfile],
  );

  const logout = useCallback(async () => {
    ++loadVersion.current;
    canSaveRef.current = false;
    setStatus("loading");
    await getSaver().flush().catch(() => {});
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setAccount(null);
    setActiveProfile(null);
    setData(emptyProgress());
    lsDel(k.mode);
    setStatus("anon");
  }, [getSaver]);

  const startGuest = useCallback(() => loadGuest(), [loadGuest]);

  const leaveGuest = useCallback(() => {
    ++loadVersion.current;
    canSaveRef.current = false;
    lsDel(k.mode);
    setActiveProfile(null);
    setStatus("anon");
  }, []);

  const guestHasProgress = useCallback(() => {
    const raw = lsGet(k.guest) ?? lsGet(k.legacyProgress("guest"));
    if (!raw) return false;
    try {
      const d = normalizeProgress(JSON.parse(raw));
      return d.stars > 0 || d.analytics.answered > 0;
    } catch {
      return false;
    }
  }, []);

  /** Merge this device's guest progress into a learner's cloud copy. Returns an error message, or null when done (or nothing to bring). */
  const sendGuestProgress = useCallback(async (profileId: string): Promise<string | null> => {
    const raw = lsGet(k.guest) ?? lsGet(k.legacyProgress("guest"));
    if (!raw) return null;
    let guestDoc: ProgressDoc;
    try {
      guestDoc = normalizeProgress(JSON.parse(raw));
    } catch {
      return null;
    }
    const res = await callJson("/api/progress", "POST", { profileId, progress: guestDoc, import: true });
    if (!res.ok) return errorOf(res.data); // the guest data stays on the device
    lsDel(k.guest);
    lsDel(k.legacyProgress("guest"));
    return null;
  }, []);

  const createProfile = useCallback(
    async (name: string, avatar: string, importGuest = false) => {
      const { ok, data: d } = await callJson("/api/profiles", "POST", { name, avatar });
      if (!ok || !d.account) return { ok: false, error: errorOf(d) };
      const acc = d.account as Account;
      const prof = (d.profile as Profile) ?? acc.profiles[acc.profiles.length - 1];
      setAccount(acc);
      if (importGuest) {
        const error = await sendGuestProgress(prof.id);
        // The learner exists either way; stay on "Who's studying?" so the import can be retried.
        if (error) return { ok: true, importError: `${prof.name} has been added, but the progress from guest mode couldn't be copied across. ${error}` };
      }
      await safeLoadProfile(acc, prof);
      return { ok: true };
    },
    [safeLoadProfile, sendGuestProgress],
  );

  const importGuest = useCallback(
    async (profileId: string) => {
      const acc = accountRef.current;
      const prof = acc?.profiles.find((p) => p.id === profileId);
      if (!acc || !prof) return { ok: false, error: "Learner not found." };
      const error = await sendGuestProgress(prof.id);
      if (error) return { ok: false, error };
      await safeLoadProfile(acc, prof);
      return { ok: true };
    },
    [safeLoadProfile, sendGuestProgress],
  );

  const updateProfile = useCallback(async (id: string, name: string, avatar: string) => {
    const { ok, data: d } = await callJson("/api/profiles", "PATCH", { id, name, avatar });
    if (!ok || !d.account) return { ok: false, error: errorOf(d) };
    const acc = d.account as Account;
    setAccount(acc);
    setActiveProfile((p) => (p && p.id === id ? acc.profiles.find((x) => x.id === id) ?? p : p));
    return { ok: true };
  }, []);

  const deleteProfile = useCallback(async (id: string, pin: string) => {
    const { ok, data: d } = await callJson("/api/profiles", "DELETE", { id, pin });
    if (!ok || !d.account) return { ok: false, error: errorOf(d) };
    const acc = d.account as Account;
    setAccount(acc);
    if (activeRef.current?.id === id) {
      ++loadVersion.current;
      canSaveRef.current = false;
      setActiveProfile(null);
      setData(emptyProgress());
      setStatus("no-profile");
    }
    return { ok: true };
  }, []);

  const selectProfile = useCallback(
    async (id: string) => {
      const acc = accountRef.current;
      const prof = acc?.profiles.find((p) => p.id === id);
      if (acc && prof) await safeLoadProfile(acc, prof);
    },
    [safeLoadProfile],
  );

  const switchProfile = useCallback(() => {
    ++loadVersion.current;
    canSaveRef.current = false;
    void getSaver().flush().catch(() => {});
    setActiveProfile(null);
    setData(emptyProgress());
    setStatus("no-profile");
  }, [getSaver]);

  const retryLoad = useCallback(async () => {
    const acc = accountRef.current;
    const prof = activeRef.current;
    if (acc && prof) await safeLoadProfile(acc, prof);
    else {
      setStatus("loading");
      await bootstrap();
    }
  }, [bootstrap, safeLoadProfile]);

  const refreshAccount = useCallback(async () => {
    const r = await callJson("/api/auth/me", "GET");
    if (r.ok && r.data.account) {
      const acc = r.data.account as Account;
      setAccount(acc);
      setActiveProfile((p) => (p ? acc.profiles.find((x) => x.id === p.id) ?? p : p));
    }
  }, []);

  // ---------------------------------------------------------- mutations
  const update = useCallback((f: (d: ProgressDoc) => ProgressDoc) => {
    if (!canSaveRef.current) return;
    setData((cur) => {
      if (!canSaveRef.current) return cur;
      const next = f(cur);
      return next === cur ? cur : { ...next, updatedAt: Date.now() };
    });
  }, []);

  const recordAnswer = useCallback(
    (r: AnswerRecord) => {
      const before = dataRef.current;
      const firstSolve = r.correct && !r.solutionShown && !before.solved[r.qid];
      const stars = firstSolve ? starsFor(r.difficulty, { hints: r.hints, tries: r.tries, solutionShown: r.solutionShown }) : 0;
      update((d) => {
        const now = Date.now();
        const srs = { ...d.srs };
        let removed = d.removed;
        const cur = srs[r.qid];
        const n = nextSrs(cur, r.correct && !r.solutionShown);
        if (n === null) {
          delete srs[r.qid];
          // Graduated: remember it, or an older copy (another device) would put it back.
          removed = withRemoved(d.removed, `srs:${r.qid}`, Math.max(now, (cur?.at ?? 0) + 1));
        } else if (n && n !== cur) srs[r.qid] = { ...n, at: Math.max(now, d.removed[`srs:${r.qid}`] ?? 0) };
        const solved = r.correct && !r.solutionShown && !d.solved[r.qid] ? { ...d.solved, [r.qid]: true as const } : d.solved;
        const gain = d.solved[r.qid] ? 0 : stars;
        const topics = { ...d.analytics.topics };
        if (r.topicId) {
          const t = topics[r.topicId] ?? { timeMs: 0, answered: 0, correct: 0 };
          topics[r.topicId] = { ...t, answered: t.answered + 1, correct: t.correct + (r.correct ? 1 : 0) };
        }
        return {
          ...d,
          stars: d.stars + gain,
          solved,
          srs,
          removed,
          slips: r.slip && r.topicId ? withSlip(d.slips, r.topicId, r.slip) : d.slips,
          streak: bumpStreak(d.streak),
          analytics: {
            ...d.analytics,
            answered: d.analytics.answered + 1,
            correct: d.analytics.correct + (r.correct ? 1 : 0),
            hinted: d.analytics.hinted + (r.hints > 0 ? 1 : 0),
            lastActiveAt: Date.now(),
            days: bumpDay(d, (x) => ({ ...x, answered: x.answered + 1, correct: x.correct + (r.correct ? 1 : 0), hinted: x.hinted + (r.hints > 0 ? 1 : 0) })),
            topics,
          },
        };
      });
      return stars;
    },
    [update],
  );

  const recordSkill = useCallback(
    (r: SkillRecord) => {
      const before = dataRef.current;
      const prevLevel = skillLevel(before.skills[r.skillId]);
      const credited = r.correct && !r.solutionShown;
      const nextSkill = updateSkill(before.skills[r.skillId], { correct: credited, tier: r.tier, mixed: r.mixed });
      const newLevel = skillLevel(nextSkill);
      const today = todayISO();
      const todayStars = before.analytics.days[today]?.drillStars ?? 0;
      let stars = credited && todayStars < DRILL_STAR_CAP ? 1 : 0;
      let levelUp: number | null = null;
      const bonusKeys: string[] = [];
      if (newLevel > prevLevel && newLevel >= 2) {
        const key = `sk${newLevel}:${r.skillId}`;
        if (!before.awarded[key]) {
          levelUp = newLevel;
          stars += newLevel === 3 ? 10 : 5;
          bonusKeys.push(key);
        }
      }
      update((d) => {
        const awarded = { ...d.awarded };
        for (const bk of bonusKeys) awarded[bk] = true;
        const topics = { ...d.analytics.topics };
        const t = topics[r.topicId] ?? { timeMs: 0, answered: 0, correct: 0 };
        topics[r.topicId] = { ...t, answered: t.answered + 1, correct: t.correct + (r.correct ? 1 : 0) };
        return {
          ...d,
          stars: d.stars + stars,
          awarded,
          skills: { ...d.skills, [r.skillId]: updateSkill(d.skills[r.skillId], { correct: credited, tier: r.tier, mixed: r.mixed }) },
          slips: r.slip ? withSlip(d.slips, r.topicId, r.slip) : d.slips,
          streak: bumpStreak(d.streak),
          analytics: {
            ...d.analytics,
            answered: d.analytics.answered + 1,
            correct: d.analytics.correct + (r.correct ? 1 : 0),
            hinted: d.analytics.hinted + (r.hinted ? 1 : 0),
            lastActiveAt: Date.now(),
            days: bumpDay(d, (x) => ({
              ...x,
              answered: x.answered + 1,
              correct: x.correct + (r.correct ? 1 : 0),
              hinted: x.hinted + (r.hinted ? 1 : 0),
              drillStars: (x.drillStars ?? 0) + (credited && (x.drillStars ?? 0) < DRILL_STAR_CAP ? 1 : 0),
            })),
            topics,
          },
        };
      });
      return { stars, levelUp };
    },
    [update],
  );

  const award = useCallback(
    (key: string, amount: number) => {
      if (dataRef.current.awarded[key]) return 0;
      update((d) => (d.awarded[key] ? d : { ...d, stars: d.stars + amount, awarded: { ...d.awarded, [key]: true } }));
      return amount;
    },
    [update],
  );

  const saveAttempt = useCallback(
    (key: string, state: AttemptState) => {
      // Never older than a restart of the same paper (see clearAttempt).
      update((d) => ({ ...d, attempts: { ...d.attempts, [key]: { ...state, updatedAt: Math.max(Date.now(), d.removed[`attempt:${key}`] ?? 0) } } }));
    },
    [update],
  );

  const clearAttempt = useCallback(
    (key: string) => {
      update((d) => {
        const cur = d.attempts[key];
        if (!cur) return d;
        const attempts = { ...d.attempts };
        delete attempts[key];
        // Remember the restart, or an older copy (another device) would bring the old attempt back.
        return { ...d, attempts, removed: withRemoved(d.removed, `attempt:${key}`, Math.max(Date.now(), cur.updatedAt + 1)) };
      });
    },
    [update],
  );

  const markSectionRead = useCallback(
    (topicId: string, sectionId: string) => {
      const key = `${topicId}#${sectionId}`;
      if (dataRef.current.guidesRead[key]) return;
      update((d) =>
        d.guidesRead[key]
          ? d
          : { ...d, guidesRead: { ...d.guidesRead, [key]: true }, streak: bumpStreak(d.streak), analytics: pushLog(d, "guide", topicId, sectionId) },
      );
    },
    [update],
  );

  const finishDaily = useCallback(
    (correct: number, total: number) => {
      const today = todayISO();
      const already = dataRef.current.daily[today]?.done;
      const stars = already ? 0 : 5;
      update((d) => ({
        ...d,
        stars: d.stars + (d.daily[today]?.done ? 0 : 5),
        daily: { ...d.daily, [today]: { correct, total, done: true } },
        streak: bumpStreak(d.streak),
        analytics: pushLog(d, "daily", undefined, `${correct}/${total}`),
      }));
      return stars;
    },
    [update],
  );

  const setBest = useCallback(
    (key: string, value: number) => {
      const isBest = value > (dataRef.current.bests[key] ?? -Infinity);
      if (isBest) update((d) => ({ ...d, bests: { ...d.bests, [key]: Math.max(d.bests[key] ?? -Infinity, value) }, analytics: pushLog(d, "best", undefined, `${key}=${value}`) }));
      return isBest;
    },
    [update],
  );

  // settingsAt: a merge keeps the settings changed last, whichever copy was saved last.
  const setGoalMinutes = useCallback((m: number) => update((d) => ({ ...d, goalMinutes: Math.max(5, Math.min(60, Math.round(m))), settingsAt: Date.now() })), [update]);
  const setWeeklyDays = useCallback((n: number) => update((d) => ({ ...d, weeklyDays: Math.max(1, Math.min(7, Math.round(n))), settingsAt: Date.now() })), [update]);
  const setFocusTopics = useCallback((ids: string[]) => update((d) => ({ ...d, focusTopics: ids.slice(0, 6), settingsAt: Date.now() })), [update]);
  const setLast = useCallback(
    (href: string, label: string, topicId?: string) => {
      const cur = dataRef.current.last;
      if (cur && cur.href === href && Date.now() - cur.at < 60000) return;
      update((d) => ({ ...d, last: { href, label, topicId, at: Date.now() } }));
    },
    [update],
  );

  const flagQuestion = useCallback(
    (qid: string, note: string) => {
      update((d) => {
        const flags = { ...d.flags, [qid]: { at: Date.now(), note: note.slice(0, 300) } };
        const keys = Object.keys(flags);
        if (keys.length > 100) {
          keys.sort((a, b) => flags[a].at - flags[b].at);
          for (const k of keys.slice(0, keys.length - 100)) delete flags[k];
        }
        return { ...d, flags, analytics: pushLog(d, "flag", undefined, qid) };
      });
    },
    [update],
  );

  const resetAll = useCallback(
    async (pin?: string) => {
      if (!canSaveRef.current) return { ok: false, error: "Progress isn't open yet. Please try again." };
      const fresh = emptyProgress();
      fresh.analytics.sessionCount = dataRef.current.analytics.sessionCount;
      if (modeRef.current === "guest") {
        fresh.resetAt = Date.now(); // other open tabs take the reset instead of merging old work back
        update(() => fresh);
        return { ok: true };
      }
      const acc = accountRef.current;
      const prof = activeRef.current;
      if (!acc || !prof) return { ok: false, error: errorOf({}) };
      // Saves are merged, so a reset must replace the cloud copy: the server allows that only with the parent PIN.
      const r = await callJson("/api/progress", "POST", { profileId: prof.id, progress: fresh, replace: true, pin });
      if (!r.ok) return { ok: false, error: errorOf(r.data) };
      if (!canSaveRef.current || accountRef.current?.id !== acc.id || activeRef.current?.id !== prof.id) return { ok: true };
      const doc = normalizeProgress(r.data.progress ?? fresh);
      syncedRef.current = { cacheKey: k.cache(acc.id, prof.id), body: JSON.stringify({ profileId: prof.id, progress: doc }) };
      setData(doc);
      return { ok: true };
    },
    [update],
  );

  const focusTopics = useMemo(() => {
    const parent = activeProfile?.settings?.focusTopics ?? [];
    return Array.from(new Set([...parent, ...data.focusTopics])).slice(0, 6);
  }, [activeProfile, data.focusTopics]);

  const value = useMemo<StoreValue>(
    () => ({
      status,
      mode,
      cloudAvailable,
      account,
      activeProfile,
      data,
      focusTopics,
      signup,
      login,
      logout,
      startGuest,
      leaveGuest,
      createProfile,
      importGuest,
      updateProfile,
      deleteProfile,
      selectProfile,
      switchProfile,
      retryLoad,
      refreshAccount,
      guestHasProgress,
      recordAnswer,
      recordSkill,
      award,
      saveAttempt,
      clearAttempt,
      markSectionRead,
      finishDaily,
      setBest,
      setGoalMinutes,
      setWeeklyDays,
      setFocusTopics,
      setLast,
      flagQuestion,
      resetAll,
    }),
    [status, mode, cloudAvailable, account, activeProfile, data, focusTopics, signup, login, logout, startGuest, leaveGuest, createProfile, importGuest, updateProfile, deleteProfile, selectProfile, switchProfile, retryLoad, refreshAccount, guestHasProgress, recordAnswer, recordSkill, award, saveAttempt, clearAttempt, markSectionRead, finishDaily, setBest, setGoalMinutes, setWeeklyDays, setFocusTopics, setLast, flagQuestion, resetAll],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
