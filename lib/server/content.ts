import "server-only";
import type { ExamPaper, IndexedQuestion, Question, Topic, TopicExtras } from "../types";
import { TOPIC_FILES } from "../generated/content";
import { TOPIC_META, type TopicMeta } from "../topics/meta";
import { EXAM_PAPERS } from "../exam";

// Assemble full topics from the per-topic files (server only — this is big).
function assemble(meta: TopicMeta): Topic | null {
  const f = TOPIC_FILES.find((x) => x.id === meta.id);
  if (!f?.guide) return null;
  return {
    ...f.guide,
    quiz: f.practice?.quiz ?? [],
    mcqPapers: f.mcqPapers,
    practicePapers: [...(f.practice?.papers ?? []), ...f.morePapers],
    challenge: f.practice?.challenge ?? [],
  };
}

export const TOPICS: Topic[] = TOPIC_META.map(assemble).filter((t): t is Topic => !!t);

export function getTopic(id: string): Topic | undefined {
  return TOPICS.find((t) => t.id === id);
}

export function getExtras(id: string): TopicExtras {
  return TOPIC_FILES.find((x) => x.id === id)?.extras ?? {};
}

export function getExamPapers(): ExamPaper[] {
  return EXAM_PAPERS;
}

export const QUESTION_INDEX: Map<string, IndexedQuestion> = (() => {
  const idx = new Map<string, IndexedQuestion>();
  const add = (q: Question, topicId: string, source: IndexedQuestion["source"], paperId?: string) => {
    if (!idx.has(q.id)) idx.set(q.id, { qid: q.id, topicId, source, paperId, question: q });
  };
  for (const t of TOPICS) {
    t.quiz.forEach((q) => add(q, t.id, "quiz"));
    t.mcqPapers.forEach((p) => p.questions.forEach((q) => add(q, t.id, "mcq", p.id)));
    t.practicePapers.forEach((p) => p.questions.forEach((q) => add(q, t.id, "practice", p.id)));
    t.challenge.forEach((q) => add(q, t.id, "challenge"));
  }
  for (const p of EXAM_PAPERS) p.questions.forEach((q) => add(q, q.topicId ?? "", "exam", p.id));
  return idx;
})();

/** Small, client-safe description of a topic for dashboards. */
export interface TopicSummary {
  id: string;
  title: string;
  strand: string;
  icon: string;
  summary: string;
  ready: boolean;
  sections: { id: string; heading: string; stretch: boolean }[];
  counts: { quiz: number; mcq: number; practice: number; challenge: number; questions: number };
  paperIds: string[];
  challengeIds: string[];
}

export function topicSummaries(): TopicSummary[] {
  return TOPIC_META.map((m) => {
    const t = getTopic(m.id);
    const mcq = t ? t.mcqPapers.reduce((a, p) => a + p.questions.length, 0) : 0;
    const practice = t ? t.practicePapers.reduce((a, p) => a + p.questions.length, 0) : 0;
    return {
      id: m.id,
      title: m.title,
      strand: m.strand,
      icon: m.icon,
      summary: t?.summary ?? "",
      ready: !!t,
      sections: m.sections.map((s) => ({ id: s.id, heading: s.heading, stretch: !!s.stretch })),
      counts: { quiz: t?.quiz.length ?? 0, mcq, practice, challenge: t?.challenge.length ?? 0, questions: (t?.quiz.length ?? 0) + mcq + practice + (t?.challenge.length ?? 0) },
      paperIds: t ? [...t.mcqPapers, ...t.practicePapers].map((p) => p.id) : [],
      challengeIds: t ? t.challenge.map((q) => q.id) : [],
    };
  });
}
