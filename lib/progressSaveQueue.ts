/** Each save binds its immutable payload to the account and learner that produced it. */
export interface ProgressSaveSnapshot {
  accountId: string;
  profileId: string;
  body: string;
  cacheKey: string;
  revision: string;
}
interface TimerApi {
  set: (callback: () => void, delay: number) => ReturnType<typeof setTimeout>;
  clear: (timer: ReturnType<typeof setTimeout>) => void;
}
/** Wrapped, not `{ set: setTimeout }`: browsers throw "Illegal invocation" when
 * window timers are called as methods of another object. */
const browserTimers: TimerApi = {
  set: (callback, delay) => setTimeout(callback, delay),
  clear: (timer) => clearTimeout(timer),
};
export function createProgressSaveQueue(
  /** `urgent`: the page is being hidden or closed — send it in a way that outlives the page. */
  send: (snapshot: ProgressSaveSnapshot, urgent: boolean) => Promise<void>,
  delay: number,
  timers: TimerApi = browserTimers,
) {
  let pending: ProgressSaveSnapshot | null = null;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let tail: Promise<void> = Promise.resolve();
  let generation = 0;
  // The newest snapshot handed over for sending whose request hasn't settled yet.
  let outstanding: { snapshot: ProgressSaveSnapshot; urgent: boolean } | null = null;
  function track(snapshot: ProgressSaveSnapshot, urgent: boolean, request: Promise<void>) {
    const entry = { snapshot, urgent };
    outstanding = entry;
    const settle = () => {
      if (outstanding === entry) outstanding = null;
    };
    request.then(settle, settle);
  }
  function takePending(): ProgressSaveSnapshot | null {
    if (timer !== null) timers.clear(timer);
    timer = null;
    const snapshot = pending;
    pending = null;
    return snapshot;
  }
  function flush(): Promise<void> {
    const snapshot = takePending();
    if (!snapshot) return tail;
    const currentGeneration = generation;
    const request = tail.then(() => {
      if (currentGeneration === generation) return send(snapshot, false);
    });
    track(snapshot, false, request);
    tail = request.catch(() => {}); // Keep the queue usable after a failed save.
    return request;
  }
  /**
   * Page hide/close: send the latest snapshot now instead of queueing it behind a save
   * still in flight (whose response may never arrive). With nothing pending, a normal
   * save still in flight is re-sent urgently. Overlapping saves are safe: the server merges.
   */
  function flushNow(): Promise<void> {
    const inFlight = outstanding && !outstanding.urgent ? outstanding.snapshot : null;
    const snapshot = takePending() ?? inFlight;
    if (!snapshot) return Promise.resolve();
    const request = send(snapshot, true);
    track(snapshot, true, request);
    const currentGeneration = generation;
    tail = Promise.all([tail, request.catch(() => {})])
      .then(() => {
        // The older save may have been stored after this one. If the page is still alive,
        // send the newest snapshot once more so the server's copy ends up complete.
        if (inFlight && inFlight !== snapshot && currentGeneration === generation) return send(snapshot, false);
      })
      .catch(() => {});
    return request;
  }
  function schedule(snapshot: ProgressSaveSnapshot) {
    // A different learner must not replace another learner's queued save.
    if (pending && (pending.accountId !== snapshot.accountId || pending.profileId !== snapshot.profileId)) {
      void flush().catch(() => {});
    }
    pending = { ...snapshot };
    if (timer !== null) timers.clear(timer);
    timer = timers.set(() => { void flush().catch(() => {}); }, delay);
  }
  function cancel() {
    generation++;
    if (timer !== null) timers.clear(timer);
    timer = null;
    pending = null;
    outstanding = null;
  }
  return { schedule, flush, flushNow, cancel };
}

/** Keep a stalled request from blocking profile switching or sign-out indefinitely. */
export async function withProgressTimeout<T>(request: (signal: AbortSignal) => Promise<T>, timeoutMs = 10000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await request(controller.signal);
  } finally {
    clearTimeout(timeout);
  }
}
