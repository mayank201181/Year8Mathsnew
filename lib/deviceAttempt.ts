// Device-only runner state. This does not change the cloud ProgressDoc schema.
export interface AttemptQuestion {
  id: string;
  kind: "mcq" | "qa";
  optionCount?: number;
  answerIndex?: number;
  hintCount: number;
}
export interface QuestionAttempt {
  picked: number | null;
  answer: string;
  revealed: boolean;
  selfMark: boolean | null;
  scored: boolean;
  correct: boolean | null;
  hintsShown: number;
}
export interface DeviceAttempt {
  version: 1;
  signature: string;
  index: number;
  questions: Record<string, QuestionAttempt>;
}
export interface AttemptStorage {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}
export function attemptCacheKey(accountId: string | null, profileId: string, paperId: string): string {
  return `y8m_attempt_v1:${JSON.stringify([accountId === null ? "guest" : "account", accountId, profileId, paperId])}`;
}
export function emptyQuestionAttempt(): QuestionAttempt {
  return { picked: null, answer: "", revealed: false, selfMark: null, scored: false, correct: null, hintsShown: 0 };
}
export function emptyDeviceAttempt(signature: string): DeviceAttempt {
  return { version: 1, signature, index: 0, questions: {} };
}
function record(value: unknown): value is Record<string, unknown> {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
export function decodeDeviceAttempt(raw: string | null, signature: string, questions: readonly AttemptQuestion[]): DeviceAttempt {
  const fresh = emptyDeviceAttempt(signature);
  if (!raw) return fresh;
  try {
    const saved: unknown = JSON.parse(raw);
    if (!record(saved) || saved.version !== 1 || saved.signature !== signature || !record(saved.questions)) return fresh;
    const restored: Record<string, QuestionAttempt> = {};
    for (const q of questions) {
      if (!Object.prototype.hasOwnProperty.call(saved.questions, q.id)) continue;
      const s = saved.questions[q.id];
      if (!record(s) || typeof s.answer !== "string" || s.answer.length > 100000 || typeof s.revealed !== "boolean" || typeof s.scored !== "boolean") continue;
      if (s.selfMark !== null && typeof s.selfMark !== "boolean") continue;
      const hintsShown = typeof s.hintsShown === "number" && Number.isInteger(s.hintsShown)
        ? Math.max(0, Math.min(q.hintCount, s.hintsShown)) : 0;
      if (q.kind === "mcq") {
        const picked = s.picked;
        if (picked !== null && (typeof picked !== "number" || !Number.isInteger(picked) || picked < 0 || picked >= (q.optionCount ?? 0))) continue;
        if (s.scored !== (picked !== null)) continue;
        restored[q.id] = { ...emptyQuestionAttempt(), picked: picked as number | null, scored: s.scored,
          correct: picked === null ? null : picked === q.answerIndex, hintsShown };
      } else {
        if (s.scored !== (typeof s.selfMark === "boolean") || (s.scored && !s.revealed)) continue;
        restored[q.id] = { ...emptyQuestionAttempt(), answer: s.answer, revealed: s.revealed,
          selfMark: s.selfMark as boolean | null, scored: s.scored,
          correct: s.scored ? s.selfMark as boolean : null, hintsShown };
      }
    }
    const index = typeof saved.index === "number" && Number.isInteger(saved.index)
      ? Math.max(0, Math.min(Math.max(0, questions.length - 1), saved.index)) : 0;
    return { version: 1, signature, index, questions: restored };
  } catch {
    return fresh;
  }
}
export function loadDeviceAttempt(storage: AttemptStorage, key: string, signature: string, questions: readonly AttemptQuestion[]): DeviceAttempt {
  try { return decodeDeviceAttempt(storage.getItem(key), signature, questions); }
  catch { return emptyDeviceAttempt(signature); }
}
export function saveDeviceAttempt(storage: AttemptStorage, key: string, attempt: DeviceAttempt): boolean {
  try { storage.setItem(key, JSON.stringify(attempt)); return true; }
  catch { return false; }
}
/** The caller applies this synchronously to a ref before recording a cumulative result. */
export function scoreQuestionOnce(attempt: DeviceAttempt, questionId: string, state: QuestionAttempt, correct: boolean) {
  if (attempt.questions[questionId]?.scored) return { attempt, shouldRecord: false };
  const next: DeviceAttempt = { ...attempt, questions: { ...attempt.questions,
    [questionId]: { ...state, scored: true, correct } } };
  return { attempt: next, shouldRecord: true };
}
