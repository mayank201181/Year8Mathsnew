// ---------------------------------------------------------------------------
// Account, profile and progress types (used when cloud sync is enabled).
// ---------------------------------------------------------------------------

export interface Profile {
  id: string;
  name: string;
  /** Emoji avatar. */
  avatar: string;
  createdAt: number;
}

export interface Account {
  id: string;
  /** Family / account display name. */
  name: string;
  profiles: Profile[];
  createdAt: number;
}

/** Spaced-repetition ladder item. */
export interface SrsItem {
  qid: string;
  /** Index into the SRS interval ladder. */
  step: number;
  /** Epoch ms when this item is next due. */
  due: number;
}

export interface ActivityEntry {
  t: number;
  kind: "guide" | "quiz" | "challenge" | "exam" | "review";
  topicId?: string;
  detail?: string;
}

export interface Analytics {
  /** Total seconds on task. */
  secondsOnTask: number;
  sessions: number;
  /** Per ISO-date (YYYY-MM-DD) seconds. */
  perDay: Record<string, number>;
  /** Per topic id: { attempts, correct }. */
  perTopic: Record<string, { attempts: number; correct: number }>;
  activity: ActivityEntry[];
}

export interface ProgressDoc {
  /** Total stars earned. */
  stars: number;
  /** Question ids that have already awarded stars (no double-counting). */
  awarded: string[];
  /** Per-question attempt outcomes: qid -> { attempts, correct }. */
  attempts: Record<string, { attempts: number; correct: number }>;
  /** Guide section keys marked as read (topicId or topicId#section). */
  guidesRead: string[];
  /** Currently-missed question ids (in the review queue). */
  missed: string[];
  /** Best timed-challenge score per topic. */
  challengeBest: Record<string, number>;
  /** Daily streak count. */
  streak: number;
  /** ISO date of last active day. */
  lastActiveDate: string;
  /** Spaced-repetition schedule. */
  srs: SrsItem[];
  /** Daily goal in minutes. */
  goalMinutes: number;
  analytics: Analytics;
  updatedAt: number;
}

export function emptyProgress(): ProgressDoc {
  return {
    stars: 0,
    awarded: [],
    attempts: {},
    guidesRead: [],
    missed: [],
    challengeBest: {},
    streak: 0,
    lastActiveDate: "",
    srs: [],
    goalMinutes: 15,
    analytics: {
      secondsOnTask: 0,
      sessions: 0,
      perDay: {},
      perTopic: {},
      activity: [],
    },
    updatedAt: Date.now(),
  };
}
