// ---------------------------------------------------------------------------
// REFERENCE EXAMPLE for content authors — shows the exact shape of the three
// per-topic files. NOT imported by the app.
//
//   lib/topics/<id>/guide.ts     → export const guide: TopicGuide
//   lib/topics/<id>/mcq.ts       → export const mcqPapers: Paper[]
//   lib/topics/<id>/practice.ts  → export const practice: TopicPractice
//
// Import types with a .ts extension and `import type` (files are also loaded
// directly by Node for validation):  import type { … } from "../../types.ts";
// ---------------------------------------------------------------------------
import type { Paper, TopicGuide, TopicPractice } from "./../types.ts";

// ============================== guide.ts ===================================
export const guide: TopicGuide = {
  id: "example",
  title: "Example Topic",
  strand: "Number",
  icon: "½",
  summary: "Equal parts, one connected toolkit.",
  intro:
    "Fractions are numbers that measure parts of a whole. Once you can make the pieces the same size, adding, comparing and dividing all become the same idea.",
  guide: [
    {
      id: "adding-fractions",
      heading: "Adding fractions",
      discovery: {
        problem:
          "Try {{1/3 + 1/4}} by adding tops and bottoms to get {{2/7}}. Now shade {{1/3}} and {{1/4}} of the same bar. Is the total really {{2/7}} — which is *less* than {{1/3}}?",
        idea:
          "You can only add pieces of the **same size**. Cut both into twelfths: {{1/3 + 1/4 = 4/12 + 3/12 = 7/12}}.",
      },
      body:
        "To add or subtract fractions, rewrite them over a **common denominator**, then add the numerators.\n\n    {{5/6 - 1/4 = 10/12 - 3/12 = 7/12}}\n\n- Use the LCM of the denominators for the neatest common denominator.\n- Never add the denominators.\n\n| Fraction | Twelfths |\n|---|---|\n| {{1/3}} | {{4/12}} |\n| {{1/4}} | {{3/12}} |",
      diagram: `<svg viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar split into twelfths with 4 twelfths and 3 twelfths shaded"><rect x="10" y="15" width="220" height="30" fill="none" stroke="#334155"/><rect x="10" y="15" width="73.3" height="30" fill="#93c5fd"/><rect x="83.3" y="15" width="55" height="30" fill="#fcd34d"/><text x="46" y="35" font-size="11" text-anchor="middle">4/12</text><text x="110" y="35" font-size="11" text-anchor="middle">3/12</text></svg>`,
      diagramCaption: "One third and one quarter, both cut into twelfths.",
      workedExamples: [
        {
          title: "Unlike denominators",
          problem: "Work out {{2/5 + 1/4}}.",
          steps: ["LCM of 5 and 4 is 20.", "{{2/5 = 8/20}} and {{1/4 = 5/20}}.", "{{8/20 + 5/20 = 13/20}}."],
          answer: "{{13/20}}",
          yourTurn: {
            question: "Your turn: work out {{1/6 + 3/4}}.",
            answer: { type: "fraction", n: 11, d: 12, simplest: true },
            solution: "LCM 12: {{2/12 + 9/12 = 11/12}}.",
          },
        },
      ],
      keyPoints: ["Common denominator first.", "Add numerators only.", "Simplify at the end."],
      whyItWorks:
        "With a shared denominator every piece is the same size, so the number of pieces simply adds — like adding apples to apples.",
      strategies: ["Find a common denominator", "Draw a diagram"],
      thinkDeeper: "Can two fractions with different denominators ever add to a whole number? Find an example — what must be true?",
    },
  ],
  learn: {
    flashcards: [{ front: "How do you add fractions?", back: "Common denominator, add numerators, simplify." }],
    mustKnow: ["Add and subtract fractions with different denominators."],
    misconceptions: [{ wrong: "{{1/3 + 1/4 = 2/7}}", right: "Make the denominators equal first: {{7/12}}." }],
    examMistakes: ["Adding the denominators."],
    mnemonics: [{ topic: "Dividing fractions", device: "Keep, Change, Flip", explanation: "Keep the first, change ÷ to ×, flip the second." }],
    realWorld: [{ title: "Recipes", detail: "Scaling a recipe means multiplying fractions.", emoji: "🍳" }],
    videos: [{ title: "Adding fractions", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+adding+fractions" }],
    formulas: [{ name: "Adding fractions", formula: "{{a/b + c/d = (ad + bc)/(bd)}}" }],
  },
};

// =============================== mcq.ts ====================================
export const mcqPapers: Paper[] = [
  {
    id: "example-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "example-m1-q01",
        question: "Work out {{2/5 + 1/4}}.",
        options: ["{{13/20}}", "{{3/9}}", "{{3/20}}", "{{1/3}}"],
        answerIndex: 0,
        explanation:
          "Over 20: {{8/20 + 5/20 = 13/20}}. {{3/9}} comes from adding tops and bottoms, which treats different-sized pieces as equal.",
        difficulty: "core",
        guideRef: "adding-fractions",
        hints: ["The pieces need to be the same size.", "Find the LCM of 5 and 4.", "Rewrite both fractions in twentieths."],
        strategy: "Find a common denominator",
      },
    ],
  },
];

// ============================= practice.ts =================================
export const practice: TopicPractice = {
  quiz: [
    {
      kind: "short",
      id: "example-quiz-q01",
      question: "Work out {{5/6 - 1/4}}. Give your answer in its simplest form.",
      answer: { type: "fraction", n: 7, d: 12, simplest: true },
      solution: ["LCM of 6 and 4 is 12.", "{{10/12 - 3/12 = 7/12}}."],
      difficulty: "warmup",
      guideRef: "adding-fractions",
      hints: ["Find a common denominator.", "Twelfths work for both."],
    },
  ],
  papers: [
    {
      id: "example-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "example-p1-q01",
          question: "Share $63 between Aisha and Ben in the ratio 4 : 5. How much does each get? (Aisha's share first.)",
          answer: { type: "list", values: [28, 35], ordered: true, display: "$28, $35" },
          solution: ["4 + 5 = 9 parts.", "One part = 63 ÷ 9 = $7.", "Aisha: 4 × 7 = $28; Ben: 5 × 7 = $35."],
          solutions: [
            { label: "Fractions of the total", steps: ["Aisha gets {{4/9}} of 63 = 28.", "Ben gets {{5/9}} of 63 = 35."] },
          ],
          commonError: "Dividing 63 by 4 and by 5 instead of by the total number of parts.",
          difficulty: "core",
          hints: ["How many parts are there altogether?", "Find the value of one part.", "One part is 63 ÷ 9."],
          strategy: "Find one part first",
        },
        {
          kind: "written",
          id: "example-p1-q02",
          question: "Explain why {{1/3 + 1/4}} is not equal to {{2/7}}.",
          marks: 2,
          modelAnswer:
            "{{2/7}} is less than {{1/3}}, but adding a positive amount must make the answer bigger. Over a common denominator, {{1/3 + 1/4 = 4/12 + 3/12 = 7/12}}.",
          markScheme: [
            { point: "Shows 2/7 is smaller than 1/3 (so cannot be right) or explains pieces are different sizes", keywords: ["smaller", "less", "bigger", "different sizes", "same size"] },
            { point: "Correct answer 7/12 via a common denominator", keywords: ["7/12", "twelfths", "common denominator", "12"] },
          ],
          commonError: "Saying 'you can't add fractions' without showing the correct method.",
          difficulty: "core",
          hints: ["Compare {{2/7}} with {{1/3}}.", "What happens to {{1/3}} when you add something positive?"],
        },
      ],
    },
  ],
  challenge: [
    {
      kind: "short",
      id: "example-ch-q01",
      question:
        "Find the value of {{1/(1*2) + 1/(2*3) + 1/(3*4) + ... + 1/(9*10)}}. Give your answer as a fraction.",
      answer: { type: "fraction", n: 9, d: 10, simplest: true },
      solution: [
        "Notice {{1/(n(n+1)) = 1/n - 1/(n+1)}}.",
        "The sum telescopes: {{(1 - 1/2) + (1/2 - 1/3) + ... + (1/9 - 1/10)}}.",
        "Everything cancels except {{1 - 1/10 = 9/10}}.",
      ],
      difficulty: "challenge",
      hints: [
        "Work out the first one, two and three terms' totals. See a pattern?",
        "{{1/2}}, {{2/3}}, {{3/4}} … guess the next.",
        "Can you write {{1/(2*3)}} as a difference of two unit fractions?",
      ],
      strategy: "Try small cases, then find a pattern",
    },
  ],
};
