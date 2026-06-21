import type { Topic } from "../types";

// STUB — replaced by rich authored content. Valid placeholder so the build stays green.
export const fractions: Topic = {
  id: "fractions",
  title: "Fractions",
  subject: "Maths",
  icon: "½",
  strand: "Number",
  intro: "Fractions — content coming soon.",
  guide: [
    {
      heading: "Overview",
      body: "Content for this topic is being prepared.",
      keyPoints: ["Key ideas will appear here."],
    },
  ],
  learn: { cards: [{ front: "Fractions", back: "Coming soon." }] },
  quiz: {
    mcq: [
      {
        id: "frac-mcq-q01",
        question: "Placeholder question for Fractions?",
        options: ["A", "B", "C", "D"],
        answerIndex: 0,
        explanation: "Placeholder.",
        difficulty: "warmup",
      },
    ],
    qa: [
      {
        id: "frac-qa-q01",
        question: "Placeholder written question for Fractions.",
        modelAnswer: "Placeholder.",
        markScheme: ["Placeholder [1]"],
        difficulty: "warmup",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "frac-mcq-paper-1",
        title: "Fractions — MCQ Set A",
        questions: [
          {
            id: "frac-mcq-b1-q01",
            question: "Placeholder bank question?",
            options: ["A", "B", "C", "D"],
            answerIndex: 0,
            explanation: "Placeholder.",
            difficulty: "warmup",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "frac-qa-paper-1",
        title: "Fractions — Written Set A",
        questions: [
          {
            id: "frac-qa-b1-q01",
            question: "Placeholder bank written question.",
            modelAnswer: "Placeholder.",
            markScheme: ["Placeholder [1]"],
            difficulty: "warmup",
          },
        ],
      },
    ],
  },
};
