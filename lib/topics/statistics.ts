import type { Topic } from "../types";

// STUB — replaced by rich authored content. Valid placeholder so the build stays green.
export const statistics: Topic = {
  id: "statistics",
  title: "Statistics",
  subject: "Maths",
  icon: "📊",
  strand: "Statistics & Probability",
  intro: "Statistics — content coming soon.",
  guide: [
    {
      heading: "Overview",
      body: "Content for this topic is being prepared.",
      keyPoints: ["Key ideas will appear here."],
    },
  ],
  learn: { cards: [{ front: "Statistics", back: "Coming soon." }] },
  quiz: {
    mcq: [
      {
        id: "stat-mcq-q01",
        question: "Placeholder question for Statistics?",
        options: ["A", "B", "C", "D"],
        answerIndex: 0,
        explanation: "Placeholder.",
        difficulty: "warmup",
      },
    ],
    qa: [
      {
        id: "stat-qa-q01",
        question: "Placeholder written question for Statistics.",
        modelAnswer: "Placeholder.",
        markScheme: ["Placeholder [1]"],
        difficulty: "warmup",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "stat-mcq-paper-1",
        title: "Statistics — MCQ Set A",
        questions: [
          {
            id: "stat-mcq-b1-q01",
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
        id: "stat-qa-paper-1",
        title: "Statistics — Written Set A",
        questions: [
          {
            id: "stat-qa-b1-q01",
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
