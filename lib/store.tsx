"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import type { Account, Profile, ProgressDoc } from "./profileTypes";
import { emptyProgress } from "./profileTypes";
import type { Difficulty } from "./types";
import { nextDue, starsFor } from "./ranks";

type Status = "loading" | "anon" | "no-profile" | "ready";

interface StoreValue {
  status: Status;
  account: Account | null;
  activeProfile: Profile | null;
  progress: ProgressDoc;
  // auth / profile
  refresh: () => Promise<void>;
  selectProfile: (id: string) => void;
  logout: () => Promise<void>;
  // progress mutations
  recordResult: (qid: string, correct: boolean, difficulty: Difficulty) => void;
  markGuideRead: (key: string, topicId?: string) => void;
  recordChallenge: (topicId: string, score: number) => void;
  setGoalMinutes: (m: number) => void;
  heartbeat: (seconds: number, topicId?: string) => void;
  reviewResult: (qid: string, correct: boolean) => void;
}

const StoreContext = createContext<StoreValue | null>(null);

const LS_PROFILE = "y8m_active_profile";
function lsProgressKey(profileId: string) {
  return `y8m_progress_${profileId}`;
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [account, setAccount] = useState<Account | null>(null);
  const [activeProfile, setActiveProfile] = useState<Profile | null>(null);
  const [progress, setProgress] = useState<ProgressDoc>(emptyProgress());
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const loadProgress = useCallback(async (profile: Profile, hasAccount: boolean) => {
    // localStorage cache first (instant), then server.
    let local: ProgressDoc | null = null;
    try {
      const raw = localStorage.getItem(lsProgressKey(profile.id));
      if (raw) local = JSON.parse(raw);
    } catch {
      /* ignore */
    }
    if (local) setProgress(local);

    if (hasAccount) {
      try {
        const res = await fetch(`/api/progress?profileId=${profile.id}`, {
          cache: "no-store",
        });
        if (res.ok) {
          const remote = (await res.json()) as ProgressDoc;
          if (!local || remote.updatedAt >= local.updatedAt) setProgress(remote);
        }
      } catch {
        /* offline: keep local */
      }
    }
  }, []);

  const refresh = useCallback(async () => {
    setStatus("loading");
    let acct: Account | null = null;
    try {
      const res = await fetch("/api/auth/me", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        acct = data.account ?? null;
      }
    } catch {
      /* treat as anon */
    }
    setAccount(acct);

    if (!acct) {
      // Device-only (no account): use a local guest profile.
      const guest: Profile = {
        id: "guest",
        name: "Guest",
        avatar: "🦊",
        createdAt: Date.now(),
      };
      setActiveProfile(guest);
      await loadProgress(guest, false);
      setStatus("anon");
      return;
    }

    if (acct.profiles.length === 0) {
      setActiveProfile(null);
      setStatus("no-profile");
      return;
    }

    const savedId = localStorage.getItem(LS_PROFILE);
    const chosen =
      acct.profiles.find((p) => p.id === savedId) ?? acct.profiles[0];
    setActiveProfile(chosen);
    localStorage.setItem(LS_PROFILE, chosen.id);
    await loadProgress(chosen, true);
    setStatus("ready");
  }, [loadProgress]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  // Debounced persist (local always; server when account present).
  const persist = useCallback(
    (next: ProgressDoc) => {
      if (!activeProfile) return;
      try {
        localStorage.setItem(lsProgressKey(activeProfile.id), JSON.stringify(next));
      } catch {
        /* ignore quota */
      }
      if (saveTimer.current) clearTimeout(saveTimer.current);
      if (account) {
        saveTimer.current = setTimeout(() => {
          fetch("/api/progress", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ profileId: activeProfile.id, progress: next }),
          }).catch(() => {});
        }, 1200);
      }
    },
    [account, activeProfile]
  );

  const update = useCallback(
    (fn: (p: ProgressDoc) => ProgressDoc) => {
      setProgress((prev) => {
        const next = fn({ ...prev });
        next.updatedAt = Date.now();
        persist(next);
        return next;
      });
    },
    [persist]
  );

  const bumpStreak = (p: ProgressDoc) => {
    const today = todayIso();
    if (p.lastActiveDate === today) return;
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    p.streak = p.lastActiveDate === yesterday ? p.streak + 1 : 1;
    p.lastActiveDate = today;
    p.analytics.sessions += 1;
  };

  const recordResult = useCallback(
    (qid: string, correct: boolean, difficulty: Difficulty) => {
      update((p) => {
        bumpStreak(p);
        const a = p.attempts[qid] ?? { attempts: 0, correct: 0 };
        a.attempts += 1;
        if (correct) a.correct += 1;
        p.attempts[qid] = a;

        if (correct && !p.awarded.includes(qid)) {
          p.stars += starsFor(difficulty);
          p.awarded.push(qid);
        }
        if (correct) {
          p.missed = p.missed.filter((m) => m !== qid);
        } else if (!p.missed.includes(qid)) {
          p.missed.push(qid);
          if (!p.srs.find((s) => s.qid === qid)) {
            p.srs.push({ qid, step: 0, due: Date.now() });
          }
        }
        return p;
      });
    },
    [update]
  );

  const reviewResult = useCallback(
    (qid: string, correct: boolean) => {
      update((p) => {
        const item = p.srs.find((s) => s.qid === qid);
        if (item) {
          if (correct) {
            item.step += 1;
            if (item.step >= 5) {
              p.srs = p.srs.filter((s) => s.qid !== qid);
              p.missed = p.missed.filter((m) => m !== qid);
            } else {
              item.due = nextDue(item.step);
            }
          } else {
            item.step = 0;
            item.due = Date.now();
          }
        }
        return p;
      });
    },
    [update]
  );

  const markGuideRead = useCallback(
    (key: string, topicId?: string) => {
      update((p) => {
        if (!p.guidesRead.includes(key)) {
          p.guidesRead.push(key);
          p.stars += 1;
          p.analytics.activity.unshift({ t: Date.now(), kind: "guide", topicId, detail: key });
          p.analytics.activity = p.analytics.activity.slice(0, 100);
        }
        return p;
      });
    },
    [update]
  );

  const recordChallenge = useCallback(
    (topicId: string, score: number) => {
      update((p) => {
        bumpStreak(p);
        if (score > (p.challengeBest[topicId] ?? 0)) p.challengeBest[topicId] = score;
        p.analytics.activity.unshift({ t: Date.now(), kind: "challenge", topicId, detail: `${score}` });
        p.analytics.activity = p.analytics.activity.slice(0, 100);
        return p;
      });
    },
    [update]
  );

  const setGoalMinutes = useCallback(
    (m: number) => update((p) => ((p.goalMinutes = m), p)),
    [update]
  );

  const heartbeat = useCallback(
    (seconds: number, topicId?: string) => {
      update((p) => {
        p.analytics.secondsOnTask += seconds;
        const d = todayIso();
        p.analytics.perDay[d] = (p.analytics.perDay[d] ?? 0) + seconds;
        if (topicId) {
          const t = p.analytics.perTopic[topicId] ?? { attempts: 0, correct: 0 };
          p.analytics.perTopic[topicId] = t;
        }
        return p;
      });
    },
    [update]
  );

  const selectProfile = useCallback(
    (id: string) => {
      if (!account) return;
      const prof = account.profiles.find((p) => p.id === id);
      if (!prof) return;
      localStorage.setItem(LS_PROFILE, id);
      setActiveProfile(prof);
      loadProgress(prof, true).then(() => setStatus("ready"));
    },
    [account, loadProgress]
  );

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    localStorage.removeItem(LS_PROFILE);
    await refresh();
  }, [refresh]);

  const value: StoreValue = {
    status,
    account,
    activeProfile,
    progress,
    refresh,
    selectProfile,
    logout,
    recordResult,
    markGuideRead,
    recordChallenge,
    setGoalMinutes,
    heartbeat,
    reviewResult,
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
