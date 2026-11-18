import type { Question, Topic } from "@/lib/types";

export interface QuestionTrapItem {
  question: string;
  commonError: string;
}

export interface TopicCramPack {
  id: string;
  title: string;
  strand: string;
  icon: string;
  summary: string;
  mustKnow: string[];
  examMistakes: string[];
  misconceptions: { wrong: string; right: string }[];
  mnemonics: { topic: string; device: string; explanation: string }[];
  keyFacts: { name: string; value: string; note?: string }[];
  questionTraps: QuestionTrapItem[];
}

export function buildTopicCramPack(topic: Topic): TopicCramPack {
  const L = topic.learn ?? {
    flashcards: [],
    mustKnow: [],
    misconceptions: [],
    examMistakes: [],
    mnemonics: [],
    realWorld: [],
    videos: [],
    formulas: [],
  };

  const allQs: Question[] = [
    ...(topic.quiz ?? []),
    ...(topic.mcqPapers ?? []).flatMap((p) => p.questions),
    ...(topic.practicePapers ?? []).flatMap((p) => p.questions),
    ...(topic.challenge ?? []),
  ];

  const seenErrors = new Set<string>();
  const questionTraps: QuestionTrapItem[] = [];
  for (const q of allQs) {
    if ((q.kind === "written" || q.kind === "short") && q.commonError) {
      const norm = q.commonError.trim().toLowerCase();
      if (!seenErrors.has(norm)) {
        seenErrors.add(norm);
        const firstLine = q.question.split("\n").find((ln) => ln.trim() && !ln.trim().startsWith("|")) ?? q.question;
        questionTraps.push({
          question: firstLine.length > 140 ? `${firstLine.slice(0, 137)}…` : firstLine,
          commonError: q.commonError.trim(),
        });
      }
      if (questionTraps.length >= 6) break;
    }
  }

  const keyFacts: { name: string; value: string; note?: string }[] = (L.formulas ?? []).map((f) => ({
    name: f.name,
    value: f.formula,
    note: f.note,
  }));

  if (!keyFacts.length) {
    for (const sec of topic.guide ?? []) {
      for (const kp of (sec.keyPoints ?? []).slice(0, 2)) {
        keyFacts.push({ name: sec.heading, value: kp });
      }
    }
  }

  return {
    id: topic.id,
    title: topic.title,
    strand: topic.strand,
    icon: topic.icon,
    summary: topic.summary,
    mustKnow: L.mustKnow ?? [],
    examMistakes: L.examMistakes ?? [],
    misconceptions: L.misconceptions ?? [],
    mnemonics: L.mnemonics ?? [],
    keyFacts: keyFacts.slice(0, 12),
    questionTraps,
  };
}
