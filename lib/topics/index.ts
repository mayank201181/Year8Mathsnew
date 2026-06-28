import type { IndexedQuestion, Topic } from "../types";
import { integersPowers } from "./integers-powers";
import { factorsMultiples } from "./factors-multiples";
import { fractions } from "./fractions";
import { decimalsRounding } from "./decimals-rounding";
import { percentages } from "./percentages";
import { ratioProportion } from "./ratio-proportion";
import { expressions } from "./expressions";
import { equations } from "./equations";
import { sequencesGraphs } from "./sequences-graphs";
import { anglesPolygons } from "./angles-polygons";
import { perimeterAreaVolume } from "./perimeter-area-volume";
import { transformationsPythagoras } from "./transformations-pythagoras";
import { statistics } from "./statistics";
import { probability } from "./probability";

export const topics: Topic[] = [
  integersPowers,
  factorsMultiples,
  fractions,
  decimalsRounding,
  percentages,
  ratioProportion,
  expressions,
  equations,
  sequencesGraphs,
  anglesPolygons,
  perimeterAreaVolume,
  transformationsPythagoras,
  statistics,
  probability,
];

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

export const STRANDS = [
  "Number",
  "Algebra",
  "Ratio & Proportion",
  "Geometry & Measure",
  "Statistics & Probability",
] as const;

/**
 * Global question index — every MCQ and QA across all topics keyed by its
 * globally-unique id. Powers review and challenge-by-id.
 */
export const QUESTION_INDEX: Record<string, IndexedQuestion> = (() => {
  const idx: Record<string, IndexedQuestion> = {};
  for (const topic of topics) {
    const allMcq = [
      ...topic.quiz.mcq,
      ...topic.questionBank.mcqPapers.flatMap((p) => p.questions),
    ];
    const allQa = [
      ...topic.quiz.qa,
      ...topic.questionBank.qaPapers.flatMap((p) => p.questions),
    ];
    for (const q of allMcq) {
      idx[q.id] = { qid: q.id, topicId: topic.id, kind: "mcq", difficulty: q.difficulty, question: q };
    }
    for (const q of allQa) {
      idx[q.id] = { qid: q.id, topicId: topic.id, kind: "qa", difficulty: q.difficulty, question: q };
    }
  }
  return idx;
})();

export function indexedQuestions(): IndexedQuestion[] {
  return Object.values(QUESTION_INDEX);
}
