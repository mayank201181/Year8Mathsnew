import type { Topic } from "../types";

export const decimalsRounding: Topic = {
  id: "decimals-rounding",
  title: "Decimals & Rounding",
  subject: "Maths",
  icon: "•",
  strand: "Number",
  intro:
    "Calculate confidently with decimals, scale by powers of ten, round to decimal places and significant figures, and estimate to check your answers are sensible.",
  guide: [
    {
      heading: "Four operations with decimals",
      discovery: {
        problem:
          "Work out 0.6 × 0.4 in your head. Many people guess 2.4 or 0.24 — which is right, and how could you be sure without a calculator?",
        idea:
          "Multiply the digits ignoring the points: 6 × 4 = 24. Each factor has 1 decimal place, so the answer has 1 + 1 = 2 decimal places: 0.24. Counting decimal places keeps the size right.",
      },
      body:
        "To **add or subtract** decimals, line up the decimal points (fill gaps with zeros) so units sit under units and tenths under tenths.\n\nTo **multiply**, ignore the points, multiply as whole numbers, then put back as many decimal places as the two numbers had altogether. So 0.6 × 0.4 → 6 × 4 = 24, and 1 + 1 = 2 places gives 0.24.\n\nTo **divide**, it is easiest to make the divisor a whole number first by scaling both numbers by the same power of 10. For 4.8 ÷ 0.6, multiply both by 10: 48 ÷ 6 = 8.",
      keyPoints: [
        "Adding/subtracting: line up the decimal points before you start.",
        "Multiplying: total decimal places in = decimal places in the answer.",
        "Dividing: scale both numbers so the divisor is a whole number.",
        "A rough estimate first tells you where the point should land.",
      ],
      strategies: ["Estimate first", "Count decimal places", "Make the divisor whole"],
      whyItWorks:
        "0.6 × 0.4 = (6 ÷ 10) × (4 ÷ 10) = 24 ÷ 100 = 0.24. Dividing by 10 twice is dividing by 100, which is why the two decimal places add together.",
    },
    {
      heading: "Multiplying and dividing by powers of 10 (and by decimals)",
      discovery: {
        problem:
          "Without a calculator: 3.7 × 100, then 3.7 ÷ 100, then 3.7 ÷ 0.01. Two of these give the same answer — which two, and why?",
        idea:
          "× 100 gives 370 and ÷ 0.01 also gives 370, because dividing by 0.01 (a hundredth) is the same as multiplying by 100. ÷ 100 gives 0.037. Dividing by a small decimal makes numbers bigger.",
      },
      body:
        "Multiplying by 10, 100, 1000 moves every digit **left** (the number gets bigger); dividing moves every digit **right** (smaller). Think of the digits sliding past a fixed decimal point — never 'add a zero', which fails for decimals.\n\nMultiplying or dividing by a *decimal* can be turned into a power-of-10 step. Dividing by 0.1 is multiplying by 10; dividing by 0.01 is multiplying by 100. That is why dividing by a number less than 1 makes the result **larger**.",
      keyPoints: [
        "× 10/100/1000: digits move left; ÷ 10/100/1000: digits move right.",
        "÷ 0.1 = × 10, and ÷ 0.01 = × 100.",
        "× by a number < 1 makes it smaller; ÷ by a number < 1 makes it bigger.",
        "Never just 'add a zero' — track the place value.",
      ],
      strategies: ["Slide the digits, fix the point", "Rewrite ÷decimal as ×power of 10"],
      whyItWorks:
        "0.01 = 1/100, so dividing by 0.01 means dividing by 1/100, and dividing by a fraction multiplies by its reciprocal: × 100. That is the same move as 3.7 ÷ (1/100) = 3.7 × 100.",
    },
    {
      heading: "Rounding: decimal places and significant figures",
      discovery: {
        problem:
          "Round 0.04981 to 2 significant figures. Is the answer 0.05, 0.050, or 0.04? Where do the 'significant' figures even start?",
        idea:
          "Significant figures start at the first non-zero digit. Here they are 4 and 9; the next digit is 8, so round up: 0.050. The leading zeros only place the value, they are not significant.",
      },
      body:
        "To round, look at the **next** digit after your cut-off. If it is 5 or more, round up; if it is 4 or less, round down (keep as is).\n\n**Decimal places (d.p.)** count digits after the point: 3.14159 to 2 d.p. is 3.14.\n\n**Significant figures (s.f.)** count from the first non-zero digit, left to right: 0.04981 to 2 s.f. is 0.050, and 30714 to 2 s.f. is 31000. Keep trailing zeros that hold place value.",
      keyPoints: [
        "Next digit 5 or more → round up; 4 or less → stay.",
        "d.p. counts from just after the decimal point.",
        "s.f. counts from the first non-zero digit.",
        "Leading zeros are never significant; placeholder zeros must be kept.",
      ],
      strategies: ["Underline the rounding digit", "Check the very next digit only"],
      whyItWorks:
        "Rounding 0.04981 to 2 s.f. means choosing the nearest number with two significant digits. 0.04981 is between 0.049 and 0.050; since the third significant digit (8) is ≥ 5, 0.050 is nearer.",
    },
    {
      heading: "Estimation, bounds and fraction↔decimal",
      discovery: {
        problem:
          "Estimate (39.6 × 0.51) ÷ 0.198 by rounding each number to 1 significant figure. Is your estimate close to the true value of about 102?",
        idea:
          "Round to 1 s.f.: (40 × 0.5) ÷ 0.2 = 20 ÷ 0.2 = 100. A quick estimate of 100 confirms an answer near 102 is sensible — and catches silly slips by a factor of 10.",
      },
      body:
        "To **estimate**, round each number to 1 significant figure, then compute. This is fast and catches large errors.\n\nRounding creates **bounds**: a length given as 6.4 cm (to 1 d.p.) really lies between 6.35 cm and 6.45 cm — the lower and upper bounds. The true value could be anywhere in that interval.\n\nTo **convert a fraction to a decimal**, divide top by bottom: 3/8 = 3 ÷ 8 = 0.375. To go back, write the decimal over its place value and simplify: 0.375 = 375/1000 = 3/8.",
      keyPoints: [
        "Estimate by rounding each number to 1 s.f. first.",
        "≈ means 'approximately equal to'.",
        "A value rounded to the nearest unit lies within ± half a unit (its bounds).",
        "Fraction → decimal: divide numerator by denominator.",
      ],
      strategies: ["Round to 1 s.f. to estimate", "Divide top by bottom to decimalise"],
      whyItWorks:
        "6.4 to 1 d.p. came from any value that rounds to 6.4 — i.e. from 6.35 up to (but not including) 6.45. The halfway points to the neighbours 6.3 and 6.5 are exactly the bounds.",
    },
  ],
  learn: {
    cards: [
      { front: "0.6 × 0.4 = ?", back: "0.24. 6 × 4 = 24, then 2 decimal places (1 + 1)." },
      { front: "4.8 ÷ 0.6 = ?", back: "8. Scale both ×10: 48 ÷ 6 = 8." },
      { front: "3.7 ÷ 0.01 = ?", back: "370. Dividing by 0.01 is the same as × 100." },
      { front: "Round 0.04981 to 2 s.f.", back: "0.050. Significant figures start at the first non-zero digit (4)." },
      { front: "Round 30714 to 2 s.f.", back: "31000. Keep placeholder zeros to hold place value." },
      { front: "Estimate by rounding to…", back: "1 significant figure, then compute." },
      { front: "3/8 as a decimal", back: "0.375 — divide 3 ÷ 8." },
      { front: "Bounds of 6.4 cm (1 d.p.)", back: "6.35 cm ≤ length < 6.45 cm." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "decimals-mcq-q01",
        question: "Work out 0.3 × 0.2.",
        options: ["0.6", "0.06", "0.006", "6"],
        answerIndex: 1,
        explanation: "3 × 2 = 6, and 1 + 1 = 2 decimal places, so 0.06.",
        difficulty: "warmup",
        guideRef: "Four operations with decimals",
        strategy: "Count decimal places",
      },
      {
        id: "decimals-mcq-q02",
        question: "What is 5.2 × 1000?",
        options: ["52", "520", "5200", "52000"],
        answerIndex: 2,
        explanation: "Multiplying by 1000 moves every digit 3 places left: 5.2 → 5200.",
        difficulty: "warmup",
        guideRef: "Multiplying and dividing by powers of 10 (and by decimals)",
        strategy: "Slide the digits, fix the point",
      },
      {
        id: "decimals-mcq-q03",
        question: "Work out 7.2 ÷ 0.9.",
        options: ["0.8", "8", "80", "6.3"],
        answerIndex: 1,
        explanation: "Scale both by 10: 72 ÷ 9 = 8.",
        difficulty: "core",
        guideRef: "Four operations with decimals",
        hints: [
          "Make the divisor a whole number first.",
          "Multiply both 7.2 and 0.9 by 10.",
          "72 ÷ 9 = 8.",
        ],
        strategy: "Make the divisor whole",
      },
      {
        id: "decimals-mcq-q04",
        question: "Round 0.06729 to 2 significant figures.",
        options: ["0.06", "0.067", "0.07", "0.068"],
        answerIndex: 1,
        explanation:
          "Significant figures start at 6 (first non-zero). The two s.f. are 6 and 7; the next digit 2 is below 5, so round down: 0.067.",
        difficulty: "core",
        guideRef: "Rounding: decimal places and significant figures",
        hints: [
          "Where does the first significant figure start?",
          "It starts at the first non-zero digit, here 6.",
          "Keep 6 and 7; look at the next digit (2) to decide.",
        ],
        strategy: "Underline the rounding digit",
      },
      {
        id: "decimals-mcq-q05",
        question:
          "Estimate 612 ÷ 0.48 by rounding each number to 1 significant figure.",
        options: ["About 30", "About 120", "About 1200", "About 300"],
        answerIndex: 2,
        explanation:
          "To 1 s.f.: 600 ÷ 0.5 = 1200. (Dividing by 0.5 is the same as × 2.)",
        difficulty: "challenge",
        guideRef: "Estimation, bounds and fraction↔decimal",
        hints: [
          "Round 612 and 0.48 to one significant figure each.",
          "600 ÷ 0.5 — what is dividing by 0.5 equivalent to?",
          "Dividing by 0.5 means × 2, so 600 × 2 = 1200.",
        ],
        strategy: "Round to 1 s.f. to estimate",
      },
      {
        id: "decimals-mcq-q06",
        question:
          "A plank is 2.5 m long, measured to the nearest 0.1 m. What is the smallest its true length could be?",
        options: ["2.4 m", "2.45 m", "2.49 m", "2.55 m"],
        answerIndex: 1,
        explanation:
          "To the nearest 0.1 m, the value lies in 2.45 m ≤ length < 2.55 m. The lower bound is 2.45 m.",
        difficulty: "challenge",
        guideRef: "Estimation, bounds and fraction↔decimal",
        hints: [
          "What range of values would round to 2.5 to 1 d.p.?",
          "Go halfway to the neighbours 2.4 and 2.6.",
          "Halfway down to 2.4 is 2.45 — the lower bound.",
        ],
        strategy: "Find the halfway points to the neighbours",
      },
    ],
    qa: [
      {
        id: "decimals-qa-q01",
        question: "Work out 12.4 + 9.85 − 6.7. Show your working.",
        modelAnswer:
          "12.4 + 9.85 = 22.25, then 22.25 − 6.7 = 15.55.",
        markScheme: [
          "Line up decimal points; 12.4 + 9.85 = 22.25 [1]",
          "22.25 − 6.7 = 15.55 [1]",
        ],
        commonError:
          "Mis-aligning the points (e.g. treating 9.85 as 9.085) so tenths and hundredths get added wrongly.",
        difficulty: "warmup",
        guideRef: "Four operations with decimals",
        hints: ["Write the numbers with points aligned, filling gaps with zeros."],
        strategy: "Line up the decimal points",
      },
      {
        id: "decimals-qa-q02",
        question:
          "Convert 7/8 to a decimal, and convert 0.45 to a fraction in its simplest form.",
        modelAnswer:
          "7/8 = 7 ÷ 8 = 0.875. And 0.45 = 45/100 = 9/20 (dividing top and bottom by 5).",
        markScheme: [
          "7 ÷ 8 = 0.875 [1]",
          "0.45 = 45/100 [1]",
          "Simplify to 9/20 [1]",
        ],
        commonError: "Leaving 45/100 unsimplified, or writing 0.45 as 45/10.",
        difficulty: "core",
        guideRef: "Estimation, bounds and fraction↔decimal",
        hints: [
          "Fraction → decimal: divide top by bottom.",
          "Decimal → fraction: write over the right power of 10, then simplify.",
        ],
        strategy: "Divide top by bottom; then simplify",
      },
      {
        id: "decimals-qa-q03",
        question:
          "Use estimation (round each number to 1 significant figure) to check whether 31.2 × 4.85 = 151.32 is sensible. Then confirm whether the exact answer is correct.",
        modelAnswer:
          "Estimate: 30 × 5 = 150, so an answer near 150 is sensible. Exact: 31.2 × 4.85 = 151.32, which matches the estimate, so it is reasonable and indeed correct.",
        markScheme: [
          "Round to 1 s.f.: 30 and 5 [1]",
          "30 × 5 = 150 (estimate) [1]",
          "Compare: 151.32 ≈ 150, so sensible / correct [1]",
        ],
        commonError:
          "Rounding 4.85 to 4 instead of 5 (4.85 to 1 s.f. is 5).",
        difficulty: "core",
        guideRef: "Estimation, bounds and fraction↔decimal",
        hints: [
          "Round 31.2 and 4.85 to one significant figure.",
          "Multiply the rounded values, then compare with 151.32.",
        ],
        strategy: "Round to 1 s.f. to estimate",
        solutions: [
          {
            label: "Estimation check",
            steps: [
              "31.2 → 30, 4.85 → 5 (to 1 s.f.)",
              "30 × 5 = 150",
              "151.32 is very close to 150, so it is sensible.",
            ],
          },
          {
            label: "Exact multiplication",
            steps: [
              "312 × 485 = 151320",
              "Total decimal places: 1 + 2 = 3, so 151.320 = 151.32",
              "Matches the given answer, confirming it is correct.",
            ],
          },
        ],
      },
      {
        id: "decimals-qa-q04",
        question:
          "Challenge: A rectangle measures 8.4 cm by 5.6 cm, each to the nearest 0.1 cm. Find the upper bound of its area.",
        modelAnswer:
          "Upper bounds of the sides: 8.45 cm and 5.65 cm. Upper bound of area = 8.45 × 5.65 = 47.7425 cm².",
        markScheme: [
          "Upper bound of 8.4 is 8.45; of 5.6 is 5.65 [1]",
          "Multiply the two upper bounds [1]",
          "8.45 × 5.65 = 47.7425 cm² [1]",
        ],
        commonError:
          "Using 8.4 × 5.6 = 47.04, or using lower bounds; the largest area needs both upper bounds.",
        difficulty: "challenge",
        guideRef: "Estimation, bounds and fraction↔decimal",
        hints: [
          "The largest area comes from the largest possible sides.",
          "Find the upper bound of each side (add half of 0.1).",
          "Multiply 8.45 by 5.65.",
        ],
        strategy: "Use the upper bound of each measurement",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "decimals-mcq-paper-1",
        title: "Decimals & Rounding — MCQ Set A",
        questions: [
          {
            id: "decimals-mcq-b1-q01",
            question: "Work out 0.7 + 0.45.",
            options: ["0.52", "1.15", "1.05", "0.115"],
            answerIndex: 1,
            explanation: "0.70 + 0.45 = 1.15 (line up the points).",
            difficulty: "warmup",
          },
          {
            id: "decimals-mcq-b1-q02",
            question: "What is 4.6 ÷ 100?",
            options: ["0.46", "0.046", "460", "0.0046"],
            answerIndex: 1,
            explanation: "Dividing by 100 moves digits 2 places right: 4.6 → 0.046.",
            difficulty: "warmup",
          },
          {
            id: "decimals-mcq-b1-q03",
            question: "Round 3.14159 to 3 decimal places.",
            options: ["3.141", "3.142", "3.14", "3.1416"],
            answerIndex: 1,
            explanation: "The 4th decimal digit is 5, so round the 3rd up: 3.141 → 3.142.",
            difficulty: "core",
            hints: ["Look at the 4th decimal digit to decide."],
            strategy: "Check the very next digit only",
          },
          {
            id: "decimals-mcq-b1-q04",
            question: "Work out 0.05 × 0.04.",
            options: ["0.0020", "0.002", "0.02", "0.2"],
            answerIndex: 1,
            explanation: "5 × 4 = 20; total 4 decimal places gives 0.0020 = 0.002.",
            difficulty: "core",
            strategy: "Count decimal places",
          },
          {
            id: "decimals-mcq-b1-q05",
            question: "Which calculation gives the same answer as 56 ÷ 0.1?",
            options: ["56 ÷ 10", "56 × 10", "56 × 0.1", "56 + 10"],
            answerIndex: 1,
            explanation: "Dividing by 0.1 (a tenth) is the same as multiplying by 10: both give 560.",
            difficulty: "core",
            hints: ["0.1 is one tenth; how many tenths are in 56?"],
            strategy: "Rewrite ÷decimal as ×power of 10",
          },
          {
            id: "decimals-mcq-b1-q06",
            question: "Round 0.0298 to 1 significant figure.",
            options: ["0.02", "0.03", "0.029", "0.3"],
            answerIndex: 1,
            explanation:
              "First significant figure is 2; the next digit 9 is ≥ 5, so round up to 0.03.",
            difficulty: "challenge",
            hints: [
              "The first significant figure is the first non-zero digit.",
              "That is 2; the next digit is 9.",
            ],
            strategy: "Underline the rounding digit",
          },
        ],
      },
      {
        id: "decimals-mcq-paper-2",
        title: "Decimals & Rounding — MCQ Set B",
        questions: [
          {
            id: "decimals-mcq-b2-q01",
            question: "Work out 9.3 − 4.85.",
            options: ["4.45", "5.45", "4.55", "5.55"],
            answerIndex: 0,
            explanation: "9.30 − 4.85 = 4.45.",
            difficulty: "warmup",
          },
          {
            id: "decimals-mcq-b2-q02",
            question: "What is 0.08 × 100?",
            options: ["0.8", "8", "80", "800"],
            answerIndex: 1,
            explanation: "× 100 moves digits 2 places left: 0.08 → 8.",
            difficulty: "warmup",
          },
          {
            id: "decimals-mcq-b2-q03",
            question: "Convert 3/8 to a decimal.",
            options: ["0.38", "0.375", "0.385", "0.83"],
            answerIndex: 1,
            explanation: "3 ÷ 8 = 0.375.",
            difficulty: "core",
            hints: ["Divide the numerator by the denominator."],
            strategy: "Divide top by bottom",
          },
          {
            id: "decimals-mcq-b2-q04",
            question: "Estimate 18.7 × 5.2 by rounding each number to 1 significant figure.",
            options: ["About 60", "About 100", "About 120", "About 1000"],
            answerIndex: 1,
            explanation: "20 × 5 = 100. (True value is 97.24.)",
            difficulty: "core",
            strategy: "Round to 1 s.f. to estimate",
          },
          {
            id: "decimals-mcq-b2-q05",
            question:
              "A mass is 4 kg to the nearest kilogram. Which statement gives its bounds?",
            options: [
              "3 kg ≤ m < 5 kg",
              "3.5 kg ≤ m < 4.5 kg",
              "3.9 kg ≤ m < 4.1 kg",
              "4 kg ≤ m < 4.5 kg",
            ],
            answerIndex: 1,
            explanation:
              "To the nearest 1 kg, the value lies within ± 0.5 kg: 3.5 kg ≤ m < 4.5 kg.",
            difficulty: "challenge",
            hints: [
              "How far can the true value stray and still round to 4?",
              "Half of 1 kg in each direction.",
            ],
            strategy: "Find the halfway points to the neighbours",
          },
          {
            id: "decimals-mcq-b2-q06",
            question: "Work out (0.6)² ÷ 0.12.",
            options: ["0.3", "3", "0.03", "30"],
            answerIndex: 1,
            explanation:
              "(0.6)² = 0.36, then 0.36 ÷ 0.12 = 3 (scale both ×100: 36 ÷ 12 = 3).",
            difficulty: "challenge",
            hints: [
              "Square 0.6 first.",
              "Then make the divisor a whole number by scaling both numbers.",
            ],
            strategy: "Work in stages, make the divisor whole",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "decimals-qa-paper-1",
        title: "Decimals & Rounding — Written Set A",
        questions: [
          {
            id: "decimals-qa-b1-q01",
            question: "Work out 6.4 + 0.86 + 12.3.",
            modelAnswer: "6.40 + 0.86 + 12.30 = 19.56.",
            markScheme: ["Line up points [1]", "= 19.56 [1]"],
            difficulty: "warmup",
          },
          {
            id: "decimals-qa-b1-q02",
            question:
              "A 1.5 litre bottle is shared equally into 0.25 litre cups. How many cups are filled? Show your method.",
            modelAnswer:
              "1.5 ÷ 0.25. Scale both by 100: 150 ÷ 25 = 6. So 6 cups.",
            markScheme: [
              "Set up 1.5 ÷ 0.25 [1]",
              "Scale to 150 ÷ 25 [1]",
              "= 6 cups [1]",
            ],
            commonError: "Treating 0.25 like a whole number and guessing 'a bit more than 1'.",
            difficulty: "core",
            hints: [
              "Dividing by 0.25 is sharing into quarter-litre cups.",
              "Make the divisor whole: ×100 on both numbers.",
            ],
            strategy: "Make the divisor whole",
          },
          {
            id: "decimals-qa-b1-q03",
            question:
              "Challenge: Estimate the cost of 19 books at £4.95 each by rounding to 1 significant figure, then explain whether your estimate is above or below the true cost.",
            modelAnswer:
              "Estimate: 20 × £5 = £100. Both numbers were rounded up (19 → 20 and 4.95 → 5), so the estimate is above the true cost of 19 × £4.95 = £94.05.",
            markScheme: [
              "Round to 1 s.f.: 20 and £5 [1]",
              "Estimate 20 × 5 = £100 [1]",
              "Explain both rounded up → estimate is an overestimate [1]",
            ],
            commonError: "Saying the estimate is below the true value despite both numbers being rounded up.",
            difficulty: "challenge",
            hints: [
              "Round 19 and 4.95 to one significant figure.",
              "Did each value round up or down?",
              "Two round-ups make the estimate larger than the truth.",
            ],
            strategy: "Track the direction of each rounding",
          },
          {
            id: "decimals-qa-b1-q04",
            question:
              "Challenge: Round 0.0985 to 2 significant figures, then to 1 significant figure. Explain why the two answers have a different number of decimal places.",
            modelAnswer:
              "To 2 s.f.: the significant digits are 9 and 8; the next digit 5 rounds 98 up to 99, giving 0.099. To 1 s.f.: keep only the 9; the next digit 8 rounds it up, and 0.09 carries to 0.1. So 2 s.f. gives 0.099 and 1 s.f. gives 0.1 — fewer significant digits kept means fewer decimals.",
            markScheme: [
              "2 s.f.: 0.099 (98 → 99 because next digit 5) [1]",
              "1 s.f.: 0.1 (9 rounds up, carrying over) [1]",
              "Explain difference is number of significant digits kept [1]",
            ],
            commonError: "Writing 1 s.f. as 0.10 (that is two significant figures).",
            difficulty: "challenge",
            hints: [
              "Significant figures begin at 9.",
              "For 2 s.f. keep 9 and 8 then round; for 1 s.f. keep only the 9.",
              "Rounding 9 up carries to the next place.",
            ],
            strategy: "Count significant digits carefully",
          },
        ],
      },
    ],
  },
};
