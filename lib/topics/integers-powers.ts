import type { Topic } from "../types";

export const integersPowers: Topic = {
  id: "integers-powers",
  title: "Integers, Powers & Roots",
  subject: "Maths",
  icon: "➖",
  strand: "Number",
  intro:
    "Negative numbers, the index laws, and square & cube roots — the toolkit for calculating quickly and spotting structure in numbers.",
  guide: [
    {
      heading: "Calculating with integers",
      discovery: {
        problem:
          "A diver is at −18 m. She descends another 7 m, then rises 12 m. Where is she now? And what single calculation captures the whole journey?",
        idea: "Moving up adds, moving down subtracts. The journey is −18 − 7 + 12 = −13 m. Signed numbers let one calculation track direction and size at once.",
      },
      body:
        "Integers are whole numbers, positive or negative, including zero.\n\nAdding a negative is the same as subtracting; subtracting a negative is the same as adding. So 5 + (−3) = 2 and 5 − (−3) = 8.\n\nWhen multiplying or dividing, **two like signs give a positive** and **two unlike signs give a negative**.",
      keyPoints: [
        "(+) × (+) = (+) and (−) × (−) = (+)",
        "(+) × (−) = (−) and (−) × (+) = (−)",
        "The same sign rules apply to division.",
      ],
      strategies: ["Use a number line", "Track direction with signs"],
      whyItWorks:
        "−1 × −1 = +1 because multiplying by −1 means 'reflect across zero'. Reflecting twice returns you to where you started, so two negatives make a positive.",
    },
    {
      heading: "Powers and the index laws",
      discovery: {
        problem:
          "2³ × 2⁴ means (2×2×2) × (2×2×2×2). Without a calculator, write the answer as a single power of 2. What did you do to the indices 3 and 4 — and will it always work?",
        idea: "You simply count how many 2's are multiplied: 3 + 4 = 7, so 2³ × 2⁴ = 2⁷. Multiplying powers of the same base adds the indices.",
      },
      body:
        "A power (index) tells you how many times to multiply a number by itself. In 2⁵ the **2** is the base and **5** is the index, and 2⁵ = 32.\n\nThe index laws let you simplify without expanding everything.",
      keyPoints: [
        "aᵐ × aⁿ = aᵐ⁺ⁿ (add the indices)",
        "aᵐ ÷ aⁿ = aᵐ⁻ⁿ (subtract the indices)",
        "(aᵐ)ⁿ = aᵐⁿ (multiply the indices)",
        "a⁰ = 1 for any non-zero a",
      ],
      strategies: ["Look for repeated structure", "Generalise from a small case"],
      whyItWorks:
        "aᵐ ÷ aⁿ = aᵐ⁻ⁿ because dividing cancels matching factors top and bottom. a⁰ = 1 follows: aⁿ ÷ aⁿ = aⁿ⁻ⁿ = a⁰, and anything divided by itself is 1.",
    },
    {
      heading: "Square and cube roots",
      body:
        "A square root reverses squaring: √49 = 7 because 7² = 49. A cube root reverses cubing: ∛27 = 3 because 3³ = 27.\n\nLearn the square numbers up to 15² = 225 and the cubes of 1–5 and 10 — you will recognise them everywhere.",
      keyPoints: [
        "Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100, 121, 144, 169, 196, 225",
        "Cube numbers: 1, 8, 27, 64, 125, 1000",
        "√(a²) = a for positive a",
      ],
      thinkDeeper:
        "Every square number has an odd number of factors. Can you see why? (Factors pair up, except the square root pairs with itself.)",
      strategies: ["Memorise key facts", "Look for invariants"],
    },
    {
      heading: "Order of operations (BIDMAS)",
      body:
        "Operations follow a fixed order: **B**rackets, **I**ndices, **D**ivision/**M**ultiplication (left to right), then **A**ddition/**S**ubtraction (left to right).\n\nDivision and multiplication share priority, as do addition and subtraction — work left to right within each pair.",
      keyPoints: ["Brackets → Indices → ÷ and × → + and −"],
      strategies: ["Work in stages", "Underline the next operation"],
    },
  ],
  learn: {
    cards: [
      { front: "(−) × (−) = ?", back: "Positive. Two like signs multiply to a positive." },
      { front: "aᵐ × aⁿ", back: "aᵐ⁺ⁿ — add the indices." },
      { front: "aᵐ ÷ aⁿ", back: "aᵐ⁻ⁿ — subtract the indices." },
      { front: "a⁰ (a ≠ 0)", back: "1 — any non-zero number to the power 0 is 1." },
      { front: "√144", back: "12, because 12² = 144." },
      { front: "BIDMAS order", back: "Brackets, Indices, Division/Multiplication, Addition/Subtraction." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "int-mcq-q01",
        question: "Work out −7 × −3.",
        options: ["−21", "21", "−10", "10"],
        answerIndex: 1,
        explanation: "Two negatives multiply to a positive: 7 × 3 = 21.",
        difficulty: "warmup",
        guideRef: "Calculating with integers",
        strategy: "Apply the sign rule",
      },
      {
        id: "int-mcq-q02",
        question: "Simplify 2⁵ × 2³.",
        options: ["2⁸", "2¹⁵", "4⁸", "2²"],
        answerIndex: 0,
        explanation: "Add the indices when multiplying powers of the same base: 5 + 3 = 8.",
        difficulty: "core",
        guideRef: "Powers and the index laws",
        hints: [
          "What does the law say about multiplying powers with the same base?",
          "Add the two indices.",
          "5 + 3 = 8, so the answer is 2⁸.",
        ],
        strategy: "Use the index laws",
      },
      {
        id: "int-mcq-q03",
        question: "Work out 5 + 2 × 3².",
        options: ["63", "23", "21", "19"],
        answerIndex: 1,
        explanation: "Indices first: 3² = 9. Then 2 × 9 = 18. Then 5 + 18 = 23.",
        difficulty: "core",
        guideRef: "Order of operations (BIDMAS)",
        hints: ["Which operation comes first in BIDMAS?", "Do the index, then the multiply, then the add."],
        strategy: "Work in stages",
      },
      {
        id: "int-mcq-q04",
        question: "What is the units digit of 7¹⁰⁰?",
        options: ["1", "3", "7", "9"],
        answerIndex: 0,
        explanation:
          "Units digits of 7ⁿ cycle 7, 9, 3, 1 with length 4. 100 ÷ 4 leaves remainder 0, landing on the last in the cycle: 1.",
        difficulty: "challenge",
        guideRef: "Powers and the index laws",
        hints: [
          "You cannot compute 7¹⁰⁰ — look for a pattern in the last digit.",
          "List the last digits of 7¹, 7², 7³, 7⁴ …",
          "They repeat 7, 9, 3, 1 every 4 powers. Use 100 ÷ 4.",
        ],
        strategy: "Find a repeating pattern (modular thinking)",
      },
    ],
    qa: [
      {
        id: "int-qa-q01",
        question: "Work out −20 ÷ 5 + (−3) × 2. Show your working.",
        modelAnswer: "−20 ÷ 5 = −4 and (−3) × 2 = −6, so −4 + (−6) = −10.",
        markScheme: ["−20 ÷ 5 = −4 [1]", "(−3) × 2 = −6 [1]", "−4 + (−6) = −10 [1]"],
        commonError: "Adding before doing the division and multiplication.",
        difficulty: "core",
        guideRef: "Order of operations (BIDMAS)",
        hints: ["Do ÷ and × before +.", "Keep the signs with their numbers."],
        strategy: "Work in stages",
      },
      {
        id: "int-qa-q02",
        question:
          "Simplify (3⁴ × 3²) ÷ 3³, leaving your answer as a single power of 3, then evaluate it.",
        modelAnswer: "3⁴ × 3² = 3⁶; 3⁶ ÷ 3³ = 3³ = 27.",
        markScheme: ["3⁴ × 3² = 3⁶ [1]", "3⁶ ÷ 3³ = 3³ [1]", "3³ = 27 [1]"],
        difficulty: "core",
        guideRef: "Powers and the index laws",
        hints: ["Combine the multiply first by adding indices.", "Then divide by subtracting indices."],
        strategy: "Use the index laws",
        solutions: [
          { label: "Index laws", steps: ["Add: 4 + 2 = 6 → 3⁶", "Subtract: 6 − 3 = 3 → 3³", "3³ = 27"] },
          {
            label: "Count the 3's",
            steps: ["Top has 4 + 2 = 6 threes; bottom has 3.", "Cancel 3 threes, leaving 3 threes.", "3 × 3 × 3 = 27"],
          },
        ],
      },
      {
        id: "int-qa-q03",
        question:
          "Challenge: Find the last digit of 3²⁰²⁵. Explain your reasoning fully.",
        modelAnswer:
          "Units digits of 3ⁿ cycle 3, 9, 7, 1 with length 4. 2025 ÷ 4 = 506 remainder 1, so we are at the 1st in the cycle: the last digit is 3.",
        markScheme: [
          "Identify the cycle 3, 9, 7, 1 (length 4) [1]",
          "2025 ÷ 4 = 506 remainder 1 [1]",
          "Remainder 1 → first term → last digit 3 [1]",
        ],
        difficulty: "challenge",
        guideRef: "Powers and the index laws",
        hints: [
          "Look at the last digit of small powers of 3.",
          "Find the length of the repeating cycle.",
          "Use the remainder of 2025 ÷ (cycle length).",
        ],
        strategy: "Modular thinking — use the remainder",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "int-mcq-paper-1",
        title: "Integers & Indices — MCQ Set A",
        questions: [
          {
            id: "int-mcq-b1-q01",
            question: "Work out −6 + (−9).",
            options: ["−15", "−3", "3", "15"],
            answerIndex: 0,
            explanation: "Adding a negative subtracts: −6 − 9 = −15.",
            difficulty: "warmup",
          },
          {
            id: "int-mcq-b1-q02",
            question: "Work out −48 ÷ −6.",
            options: ["8", "−8", "−42", "42"],
            answerIndex: 0,
            explanation: "Two like signs give a positive: 48 ÷ 6 = 8.",
            difficulty: "warmup",
          },
          {
            id: "int-mcq-b1-q03",
            question: "Simplify (5²)³.",
            options: ["5⁵", "5⁶", "5⁸", "25³"],
            answerIndex: 1,
            explanation: "Power of a power multiplies indices: 2 × 3 = 6.",
            difficulty: "core",
            hints: ["Use (aᵐ)ⁿ = aᵐⁿ."],
            strategy: "Use the index laws",
          },
          {
            id: "int-mcq-b1-q04",
            question: "Evaluate √169 − ∛125.",
            options: ["8", "10", "12", "18"],
            answerIndex: 0,
            explanation: "√169 = 13 and ∛125 = 5, so 13 − 5 = 8.",
            difficulty: "core",
          },
          {
            id: "int-mcq-b1-q05",
            question: "Work out 20 − 4 × (2 + 3).",
            options: ["0", "80", "10", "−20"],
            answerIndex: 0,
            explanation: "Brackets: 2 + 3 = 5; then 4 × 5 = 20; then 20 − 20 = 0.",
            difficulty: "core",
            strategy: "Work in stages",
          },
          {
            id: "int-mcq-b1-q06",
            question: "Which is largest: 2⁴, 4², or 3³?",
            options: ["2⁴", "4²", "3³", "They are all equal"],
            answerIndex: 2,
            explanation: "2⁴ = 16, 4² = 16, 3³ = 27. So 3³ is largest.",
            difficulty: "challenge",
            hints: ["Work each one out as an ordinary number first."],
            strategy: "Compare by evaluating",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "int-qa-paper-1",
        title: "Integers & Indices — Written Set A",
        questions: [
          {
            id: "int-qa-b1-q01",
            question: "The temperature is −4 °C at midnight and falls by 7 °C by 4 a.m. What is the new temperature?",
            modelAnswer: "−4 − 7 = −11 °C.",
            markScheme: ["−4 − 7 [1]", "= −11 °C [1]"],
            difficulty: "warmup",
          },
          {
            id: "int-qa-b1-q02",
            question: "Write 600 as a product of its prime factors using index notation.",
            modelAnswer: "600 = 2³ × 3 × 5².",
            markScheme: ["Correct factor tree or division ladder [1]", "600 = 2³ × 3 × 5² [2]"],
            difficulty: "core",
            strategy: "Systematic factorising",
          },
          {
            id: "int-qa-b1-q03",
            question:
              "Challenge: Explain why the product of any two consecutive integers is always even.",
            modelAnswer:
              "Of any two consecutive integers, one must be even. An even number times any integer is even, so the product is always even.",
            markScheme: [
              "States one of two consecutive integers is even [1]",
              "Even × integer = even [1]",
              "Concludes product is always even [1]",
            ],
            difficulty: "challenge",
            hints: ["Look at parity — odd/even.", "What is true of one of any two numbers in a row?"],
            strategy: "Reason about parity (invariants)",
          },
        ],
      },
    ],
  },
};
