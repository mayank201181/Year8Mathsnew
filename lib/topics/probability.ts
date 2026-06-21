import type { Topic } from "../types";

// STUB — replaced by rich authored content. Valid placeholder so the build stays green.
export const probability: Topic = {
  id: "probability",
  title: "Probability",
  subject: "Maths",
  icon: "🎲",
  strand: "Statistics & Probability",
  intro: "Probability — content coming soon.",
  guide: [
    {
      heading: "Overview",
      body: "Content for this topic is being prepared.",
      keyPoints: ["Key ideas will appear here."],
    },
  ],
  learn: { cards: [{ front: "Probability", back: "Coming soon." }] },
  quiz: {
    mcq: [
      {
        id: "prob-mcq-q01",
        question: "Placeholder question for Probability?",
        options: ["A", "B", "C", "D"],
        answerIndex: 0,
        explanation: "Placeholder.",
        difficulty: "warmup",
      },
    ],
    qa: [
      {
        id: "prob-qa-q01",
        question: "Placeholder written question for Probability.",
        modelAnswer: "Placeholder.",
        markScheme: ["Placeholder [1]"],
        difficulty: "warmup",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "prob-mcq-paper-1",
        title: "Probability — MCQ Set A",
        questions: [
          {
            id: "prob-mcq-b1-q01",
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
        id: "prob-qa-paper-1",
        title: "Probability — Written Set A",
        questions: [
          {
            id: "prob-qa-b1-q01",
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
