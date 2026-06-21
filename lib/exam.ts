import type { ComprehensiveExam } from "./types";

// Cross-topic comprehensive exam. Authored/expanded by the content pass;
// this seed keeps the build green and the Exam page functional.
export const comprehensiveExam: ComprehensiveExam = {
  mcqPapers: [
    {
      id: "exam-mcq-1",
      title: "Comprehensive Exam — Multiple Choice",
      questions: [
        {
          id: "exam-mcq-q01",
          question: "Work out −5 + 3 × (−2).",
          options: ["−16", "−11", "−4", "4"],
          answerIndex: 1,
          explanation: "3 × (−2) = −6 first, then −5 + (−6) = −11.",
          difficulty: "core",
        },
        {
          id: "exam-mcq-q02",
          question: "Increase £40 by 15%.",
          options: ["£46", "£55", "£6", "£34"],
          answerIndex: 0,
          explanation: "40 × 1.15 = £46.",
          difficulty: "core",
        },
        {
          id: "exam-mcq-q03",
          question: "Solve 3x − 4 = 11.",
          options: ["x = 5", "x = 3", "x = 7", "x = 2.3"],
          answerIndex: 0,
          explanation: "3x = 15, so x = 5.",
          difficulty: "core",
        },
        {
          id: "exam-mcq-q04",
          question: "Each interior angle of a regular hexagon is:",
          options: ["108°", "120°", "135°", "60°"],
          answerIndex: 1,
          explanation: "Exterior 360 ÷ 6 = 60°, so interior = 120°.",
          difficulty: "core",
        },
      ],
    },
  ],
  qaPapers: [
    {
      id: "exam-qa-1",
      title: "Comprehensive Exam — Written",
      questions: [
        {
          id: "exam-qa-q01",
          question: "Share £63 in the ratio 4 : 5. Show your working.",
          modelAnswer: "9 shares; one share = £7; parts £28 and £35.",
          markScheme: ["4 + 5 = 9 shares [1]", "63 ÷ 9 = £7 [1]", "£28 and £35 [1]"],
          difficulty: "core",
        },
        {
          id: "exam-qa-q02",
          question:
            "A right-angled triangle has legs 5 cm and 12 cm. Find the hypotenuse.",
          modelAnswer: "c² = 25 + 144 = 169, c = 13 cm.",
          markScheme: ["5² + 12² = 169 [1]", "√169 = 13 cm [1]"],
          difficulty: "core",
        },
      ],
    },
  ],
};
