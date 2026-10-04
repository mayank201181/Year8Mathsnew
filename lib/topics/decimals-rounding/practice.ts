import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ======================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ======================================================================
  quiz: [
    {
      kind: "mcq",
      id: "decimals-rounding-quiz-q01",
      question: "Work out 0.6 × 0.04.",
      options: ["0.024", "0.24", "2.4", "0.0024"],
      answerIndex: 0,
      explanation:
        "Multiply the whole numbers: 6 × 4 = 24. The question has 1 + 2 = 3 decimal places, so the answer has 3: 0.024. 0.24 has only 2 decimal places — it comes from forgetting that 0.04 has two. Quick check: 0.6 is less than 1, so the answer must be less than 0.04, and 0.024 is.",
      difficulty: "warmup",
      guideRef: "multiplying-decimals",
      hints: ["Ignore the points: what is 6 × 4? Then count the decimal places in 0.6 and 0.04 altogether."],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "decimals-rounding-quiz-q02",
      question: "Round 12.6853 to 2 decimal places.",
      answer: { type: "number", value: 12.69 },
      solution: [
        "Cut after the 2nd decimal place: 12.68 | 53.",
        "The decider (the next digit) is 5, so round up.",
        "12.68 becomes 12.69.",
      ],
      commonError: "Chopping to 12.68. A decider of 5 or more always rounds up.",
      difficulty: "warmup",
      guideRef: "decimal-places",
      hints: ["Which digit is in the 2nd decimal place? Look at the digit just after it."],
      strategy: "Look at the decider digit",
    },
    {
      kind: "short",
      id: "decimals-rounding-quiz-q03",
      question: "Write 0.84 as a fraction in its simplest form.",
      answer: { type: "fraction", n: 21, d: 25, simplest: true },
      solution: [
        "The last digit, 4, is in the hundredths column, so 0.84 = {{84/100}}.",
        "The HCF of 84 and 100 is 4.",
        "{{84/100 = 21/25}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 84, d: 10 },
          feedback: "0.84 is 84 *hundredths*, not tenths: {{84/10}} would be 8.4. Write it over 100, then simplify.",
        },
      ],
      difficulty: "warmup",
      guideRef: "recurring-decimals",
      hints: ["What place value does the last digit have? Write 0.84 over that power of 10, then simplify."],
      strategy: "Use place value",
    },
    {
      kind: "mcq",
      id: "decimals-rounding-quiz-q04",
      question: "Work out 3.24 ÷ 0.06.",
      options: ["5.4", "54", "540", "0.54"],
      answerIndex: 1,
      explanation:
        "Multiply both numbers by 100 so the divisor is whole: 3.24 ÷ 0.06 = 324 ÷ 6 = 54. Check: 0.06 × 54 = 3.24. 0.54 is 3.24 ÷ 6 — the point in 0.06 was ignored, and dividing by a number less than 1 should give an answer *bigger* than 3.24. 5.4 comes from multiplying 3.24 by only 10 but 0.06 by 100.",
      difficulty: "core",
      guideRef: "dividing-decimals",
      hints: [
        "Make the divisor a whole number. What must you multiply 0.06 by?",
        "Multiply 3.24 by the same amount — the answer doesn't change.",
        "Now work out 324 ÷ 6.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "decimals-rounding-quiz-q05",
      question: "Round 0.0060472 to 3 significant figures.",
      answer: { type: "number", value: 0.00605 },
      solution: [
        "The first significant figure is the 6 (in the thousandths column). The zeros before it only show the size.",
        "The 2nd and 3rd significant figures are 0 and 4 — a zero between non-zero digits counts.",
        "Cut after 3 s.f.: 0.00604 | 72. The decider 7 rounds the 4 up.",
        "Answer: 0.00605. The leading zeros stay, to keep the size.",
      ],
      commonError: "Writing 0.006, which is rounded to 3 *decimal places*, not 3 significant figures.",
      traps: [
        {
          spec: { type: "number", value: 605 },
          feedback: "The leading zeros aren't significant, but they must stay — they show the size. 605 is about 100,000 times too big.",
        },
      ],
      difficulty: "core",
      guideRef: "significant-figures",
      hints: [
        "Where is the first non-zero digit? That's the 1st significant figure.",
        "Does the zero after the 6 count? It sits between two non-zero digits.",
        "Count 6, 0, 4 — then look at the next digit.",
      ],
      strategy: "Look at the decider digit",
    },
    {
      kind: "short",
      id: "decimals-rounding-quiz-q06",
      question: "Estimate the value of {{(39.6 * 5.18)/0.198}} by rounding each number to 1 significant figure.",
      answer: { type: "number", value: 1000 },
      solution: [
        "Round each number to 1 s.f.: 39.6 → 40, 5.18 → 5, 0.198 → 0.2.",
        "Top: 40 × 5 = 200.",
        "Divide: 200 ÷ 0.2 = 2000 ÷ 2 = 1000 (multiply both by 10).",
        "So the value ≈ 1000. (The exact value is 1036, so the estimate is good.)",
      ],
      commonError: "Treating ÷ 0.2 like ÷ 2 and getting 100.",
      traps: [
        {
          spec: { type: "number", value: 100 },
          feedback: "Check 200 ÷ 0.2. There are five 0.2s in every 1, so 200 ÷ 0.2 = 200 × 5 = 1000.",
        },
        {
          spec: { type: "number", value: 40 },
          feedback: "You multiplied by 0.2 instead of dividing. Dividing by a number less than 1 makes the answer bigger.",
        },
      ],
      difficulty: "core",
      guideRef: "estimation",
      hints: [
        "Round 39.6, 5.18 and 0.198 to 1 significant figure each.",
        "Work out the top first.",
        "Dividing by 0.2 is the same as multiplying by 5.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "mcq",
      id: "decimals-rounding-quiz-q07",
      question: "Which list is in order from smallest to largest?",
      options: [
        "0.06, −0.607, −0.65, −0.7",
        "−0.607, −0.65, −0.7, 0.06",
        "−0.7, −0.65, −0.607, 0.06",
        "−0.7, −0.607, −0.65, 0.06",
      ],
      answerIndex: 2,
      explanation:
        "On a number line, further left is smaller. Pad the sizes of the negatives: 0.700 > 0.650 > 0.607, and the negative with the biggest size is furthest left, so −0.7 < −0.65 < −0.607. The only positive number, 0.06, is largest. The list starting −0.607 sorts the negatives as if they were positive. The list with −0.607 before −0.65 treats 0.607 as bigger than 0.65 because it has more digits, but 0.607 < 0.650. The list starting 0.06 ignores the signs altogether.",
      difficulty: "core",
      guideRef: "ordering-and-shortcuts",
      hints: [
        "Pad the sizes to 3 decimal places: 0.700, 0.650, 0.607.",
        "For negative numbers, the bigger the size, the smaller the number.",
      ],
      strategy: "Draw a number line",
    },
    {
      kind: "short",
      id: "decimals-rounding-quiz-q08",
      question: "Work out 0.25 × 7.3 × 40 without a calculator.",
      answer: { type: "number", value: 73 },
      solution: [
        "You can multiply in any order (the commutative and associative laws).",
        "Pair the friendly numbers first: 0.25 × 40 = 10 (a quarter of 40).",
        "Then 10 × 7.3 = 73.",
      ],
      traps: [
        { spec: { type: "number", value: 7.3 }, feedback: "0.25 × 4 = 1, but here it's 0.25 × 40, which is 10." },
        { spec: { type: "number", value: 730 }, feedback: "A quarter of 40 is 10, not 100. So the answer is 10 × 7.3 = 73." },
      ],
      difficulty: "core",
      guideRef: "ordering-and-shortcuts",
      hints: [
        "Do you have to multiply from left to right?",
        "Which two of the numbers make a nice whole number together?",
        "0.25 is a quarter. What is a quarter of 40?",
      ],
      strategy: "Use the laws of arithmetic",
    },
    {
      kind: "written",
      id: "decimals-rounding-quiz-q09",
      question:
        "Without doing any division, explain which of {{11/40}} and {{11/60}} is equal to a terminating decimal and which is equal to a recurring decimal.",
      marks: 3,
      modelAnswer:
        "Both fractions are already in their simplest form, because 11 is prime and doesn't divide 40 or 60. 40 = 2 × 2 × 2 × 5 has only 2s and 5s as prime factors, so {{11/40}} terminates (it equals {{275/1000}} = 0.275). 60 = 2 × 2 × 3 × 5 has a prime factor 3, which can never be part of a power of 10, so {{11/60}} recurs (it is 0.18333… = 0.183̇).",
      markScheme: [
        {
          point: "Checks both fractions are in their simplest form (11 shares no factor with 40 or 60)",
          keywords: ["simplest", "simplified", "prime", "no common factor", "can't simplify", "cannot be simplified"],
        },
        {
          point: "40 = 2 × 2 × 2 × 5 has only prime factors 2 and 5, so {{11/40}} terminates",
          keywords: ["2 and 5", "2s and 5s", "2 x 2 x 2 x 5", "2 × 2 × 2 × 5", "terminates", "terminating", "0.275"],
        },
        {
          point: "60 = 2 × 2 × 3 × 5 contains the prime factor 3, so {{11/60}} recurs",
          keywords: ["factor of 3", "3", "recurs", "recurring", "0.183"],
        },
      ],
      commonError: "Saying both recur because neither denominator is 10, 100 or 1000.",
      difficulty: "core",
      guideRef: "recurring-decimals",
      hints: [
        "What decides whether a fraction terminates? Look at the denominator.",
        "Find the prime factors of 40 and of 60.",
        "A terminating decimal is a fraction over 10, 100, 1000 …, and 10 = 2 × 5.",
      ],
      strategy: "Use prime factors",
    },
    {
      kind: "mcq",
      id: "decimals-rounding-quiz-q10",
      question:
        "Jun's mass is 52 kg and Wei Ling's mass is 47 kg, both correct to the nearest kilogram. The difference between their masses (Jun's minus Wei Ling's) is d kg. Which inequality describes exactly the possible values of d?",
      options: ["{{4 <= d < 6}}", "{{4.5 <= d < 5.5}}", "{{d = 5}} exactly", "{{4 < d < 6}}"],
      answerIndex: 3,
      explanation:
        "Jun: {{51.5 <= J < 52.5}}. Wei Ling: {{46.5 <= W < 47.5}}. The biggest difference uses Jun's biggest and Wei Ling's smallest mass: d gets as close as you like to 52.5 − 46.5 = 6 but never reaches it. The smallest uses Jun's smallest and Wei Ling's biggest: 51.5 − 47.5 = 4, but W can never equal 47.5, so d can never equal 4 either. Hence {{4 < d < 6}}. {{4 <= d < 6}} copies the usual ≤ … < pattern without checking whether 4 can be reached. {{4.5 <= d < 5.5}} treats the difference 5 as if it had been rounded itself, and '{{d = 5}} exactly' comes from subtracting upper bound from upper bound.",
      difficulty: "challenge",
      guideRef: "error-intervals",
      hints: [
        "Write the error interval for each mass first.",
        "To make the difference as big as possible, which mass should be large and which small?",
        "Check the ends: can each mass actually reach its upper bound?",
      ],
      strategy: "Consider extremes",
    },
  ],

  // ======================================================================
  // PRACTICE PAPERS — 16 short + 4 written each; easy → hard
  // ======================================================================
  papers: [
    {
      id: "decimals-rounding-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "decimals-rounding-p1-q01",
          question: "Work out 4.3 × 0.02. Give your answer as a decimal.",
          answer: { type: "number", value: 0.086, allowFraction: false },
          solution: [
            "Ignore the points: 43 × 2 = 86.",
            "Decimal places: 4.3 has 1 and 0.02 has 2, so 3 in total.",
            "86 with 3 decimal places is 0.086.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.86 },
              feedback: "Count the decimal places again: 1 in 4.3 plus 2 in 0.02 makes 3, so the answer is 0.086.",
            },
            {
              spec: { type: "number", value: 8.6 },
              feedback: "Multiplying by 0.02, a small number, makes 4.3 much *smaller*. Count decimal places: 1 + 2 = 3.",
            },
          ],
          difficulty: "warmup",
          guideRef: "multiplying-decimals",
          hints: ["Work out 43 × 2 first, then count the decimal places in the question."],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q02",
          question: "Round 23.0748 to 2 decimal places.",
          answer: { type: "number", value: 23.07 },
          solution: [
            "Cut after the 2nd decimal place: 23.07 | 48.",
            "The decider is 4, so round down: the 7 stays.",
            "Answer: 23.07.",
          ],
          commonError:
            "Rounding in stages: 23.0748 → 23.075 → 23.08. Always round the original number in one step, looking only at the decider.",
          difficulty: "warmup",
          guideRef: "decimal-places",
          hints: ["Which digit comes straight after the 2nd decimal place? That digit alone decides."],
          strategy: "Look at the decider digit",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q03",
          question: "Round 68,427 to 2 significant figures.",
          answer: { type: "number", value: 68000, display: "68,000" },
          solution: [
            "The 1st significant figure is 6 (ten-thousands) and the 2nd is 8 (thousands): 68 | 427.",
            "The decider is 4, so round down.",
            "Fill the hundreds, tens and units with zeros so the number keeps its size: 68,000.",
          ],
          traps: [
            {
              spec: { type: "number", value: 68 },
              feedback: "68 is far too small — the number is about sixty-eight *thousand*. Keep the size with placeholder zeros: 68,000.",
            },
          ],
          difficulty: "warmup",
          guideRef: "significant-figures",
          hints: ["Find the first two significant figures, then look at the next digit. Keep the number the same size."],
          strategy: "Look at the decider digit",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q04",
          question: "Write {{9/20}} as a decimal.",
          answer: { type: "number", value: 0.45, allowFraction: false },
          solution: ["Scale to a denominator of 100: {{9/20 = (9 * 5)/(20 * 5) = 45/100}}.", "{{45/100}} = 0.45."],
          traps: [
            {
              spec: { type: "number", value: 0.92 },
              feedback: "A fraction isn't 'top, point, bottom'. Scale to hundredths: {{9/20 = 45/100}} = 0.45.",
            },
          ],
          difficulty: "warmup",
          guideRef: "recurring-decimals",
          hints: ["What do you multiply 20 by to get 100? Do the same to the 9."],
          strategy: "Scale to a power of 10",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q05",
          question: "Write these numbers in order, smallest first:\n\n0.6, 0.06, 0.606, 0.66, 0.066",
          answer: {
            type: "list",
            values: [0.06, 0.066, 0.6, 0.606, 0.66],
            ordered: true,
            display: "0.06, 0.066, 0.6, 0.606, 0.66",
          },
          solution: [
            "Pad with zeros to 3 decimal places: 0.600, 0.060, 0.606, 0.660, 0.066.",
            "Compare them as thousandths: 600, 60, 606, 660, 66.",
            "Smallest first: 60, 66, 600, 606, 660.",
            "So the order is 0.06, 0.066, 0.6, 0.606, 0.66.",
          ],
          commonError: "Thinking 0.606 is bigger than 0.66 because it has more digits.",
          traps: [
            {
              spec: { type: "list", values: [0.66, 0.606, 0.6, 0.066, 0.06], ordered: true },
              feedback: "Right order, wrong direction — the question asks for the smallest first.",
            },
          ],
          difficulty: "warmup",
          guideRef: "ordering-and-shortcuts",
          hints: ["Give every number the same number of decimal places by adding zeros, then compare."],
          strategy: "Pad with zeros",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q06",
          question:
            "Fabric for a CCA drama costume costs $7.45 per metre. Aisha buys 2.6 m of it. How much does she pay? Give your answer in dollars.",
          answer: { type: "number", value: 19.37, display: "$19.37" },
          solution: [
            "Estimate: 2.6 ≈ 3 and 7.45 ≈ 7, so about 3 × 7 = $21.",
            "Ignore the points: 26 × 745 = 14,900 + 4,470 = 19,370.",
            "Decimal places: 1 + 2 = 3, so 19.370.",
            "She pays $19.37, which is close to the estimate.",
          ],
          traps: [
            {
              spec: { type: "number", value: 193.7 },
              feedback: "Check with an estimate: about 3 m at about $7 is about $21, so $193.70 is ten times too big. Count the decimal places: 1 + 2 = 3.",
            },
            {
              spec: { type: "number", value: 1.937 },
              feedback: "That's ten times too small. An estimate of 3 × $7 ≈ $21 shows where the point goes.",
            },
          ],
          difficulty: "core",
          guideRef: "multiplying-decimals",
          hints: [
            "Estimate first: round 2.6 and 7.45 to 1 significant figure.",
            "Multiply 26 × 745 as whole numbers.",
            "How many decimal places are there in the question altogether?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q07",
          question: "Work out 0.918 ÷ 0.06.",
          answer: { type: "number", value: 15.3 },
          solution: [
            "The divisor 0.06 has 2 decimal places, so multiply both numbers by 100: 0.918 ÷ 0.06 = 91.8 ÷ 6.",
            "Short division: 9 ÷ 6 = 1 remainder 3; 31 ÷ 6 = 5 remainder 1; 18 tenths ÷ 6 = 3 tenths.",
            "So 91.8 ÷ 6 = 15.3.",
            "Check: 0.06 × 15.3 = 0.918.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1.53 },
              feedback: "Multiply *both* numbers by 100, not one by 100 and the other by 10: 0.918 ÷ 0.06 = 91.8 ÷ 6.",
            },
            {
              spec: { type: "number", value: 153 },
              feedback: "Ten times too big. Multiplying both numbers by 100 gives 91.8 ÷ 6, not 918 ÷ 6.",
            },
          ],
          difficulty: "core",
          guideRef: "dividing-decimals",
          hints: [
            "Make the divisor a whole number: what must you multiply 0.06 by?",
            "Do exactly the same to 0.918.",
            "Now use short division on 91.8 ÷ 6.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "written",
          id: "decimals-rounding-p1-q08",
          question:
            "Siti writes: *7.2 ÷ 0.4 = 1.8, because 72 ÷ 4 = 18.*\n\nExplain what is wrong with her working, and give the correct answer.",
          marks: 3,
          modelAnswer:
            "To make the divisor whole, Siti multiplied *both* numbers by 10, and that doesn't change the answer: 7.2 ÷ 0.4 = 72 ÷ 4 = 18 exactly. She shouldn't move the point back afterwards — that only happens in multiplication. Her answer can't be right anyway: dividing by 0.4, a number less than 1, must give an answer bigger than 7.2, and checking by multiplying back gives 0.4 × 1.8 = 0.72, not 7.2. The correct answer is 18.",
          markScheme: [
            { point: "Correct answer 18", keywords: ["18"] },
            {
              point: "Explains that multiplying both numbers by 10 doesn't change the answer, so 7.2 ÷ 0.4 = 72 ÷ 4 exactly (no moving the point back)",
              keywords: ["both", "multiply by 10", "same answer", "equivalent", "72 ÷ 4", "72 / 4", "doesn't change", "does not change"],
            },
            {
              point: "Gives a check showing 1.8 is wrong, e.g. dividing by a number less than 1 gives a bigger answer, or 0.4 × 1.8 = 0.72",
              keywords: ["bigger", "larger", "less than 1", "0.72", "check", "multiply back"],
            },
          ],
          commonError: "Treating division like multiplication and 'putting the decimal place back' at the end.",
          difficulty: "core",
          guideRef: "dividing-decimals",
          hints: [
            "What does Siti actually do to 7.2 and to 0.4 to get 72 ÷ 4?",
            "Does multiplying both numbers in a division by 10 change the answer?",
            "Check her answer by multiplying back: is 0.4 × 1.8 equal to 7.2?",
          ],
          strategy: "Check by multiplying back",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q09",
          question: "Round 4.6972 to 2 decimal places. Write the answer exactly as it should appear when given to 2 decimal places.",
          answer: { type: "text", accept: ["4.70"], display: "4.70" },
          solution: [
            "Cut after the 2nd decimal place: 4.69 | 72.",
            "The decider is 7, so round up: 4.69 + 0.01 = 4.70.",
            "Keep the final zero. 4.70 shows the answer is accurate to 2 decimal places; 4.7 only shows 1.",
          ],
          commonError: "Writing 4.7 — the value is right, but it no longer shows 2 decimal places.",
          traps: [
            {
              spec: { type: "number", value: 4.7 },
              feedback: "Right value — but 2 decimal places means two digits after the point. Write 4.70: the zero shows the accuracy.",
            },
            {
              spec: { type: "number", value: 4.69 },
              feedback: "That's chopping (truncating), not rounding. The decider 7 rounds the 9 up, which carries: 4.70.",
            },
          ],
          difficulty: "core",
          guideRef: "decimal-places",
          hints: [
            "Which digit is in the 2nd decimal place, and what is the decider?",
            "Rounding the 9 up makes 10 hundredths. What happens to the digit in front of it?",
            "How many digits must come after the point for an answer to 2 d.p.?",
          ],
          strategy: "Look at the decider digit",
        },
        {
          kind: "written",
          id: "decimals-rounding-p1-q10",
          question:
            "Round 0.0652 to **(a)** 2 decimal places and **(b)** 2 significant figures.\n\nExplain why the two answers are different, and say which one keeps more information about the number.",
          marks: 3,
          modelAnswer:
            "(a) 0.06 | 52: the decider is 5, so round up to 0.07.\n\n(b) The first significant figure is the 6, so 2 s.f. keeps the 6 and the 5: 0.065 | 2. The decider is 2, so the answer is 0.065.\n\nDecimal places are counted from the decimal point, but significant figures are counted from the first non-zero digit. For a small number like this, the leading zero uses up one of the two decimal places, so 2 d.p. keeps only one useful digit. The 2 s.f. answer, 0.065, keeps two useful digits, so it tells you more about the number.",
          markScheme: [
            { point: "(a) 0.07", keywords: ["0.07"] },
            { point: "(b) 0.065", keywords: ["0.065"] },
            {
              point: "Explains that d.p. are counted from the decimal point but s.f. from the first non-zero digit, so 2 s.f. keeps more information",
              keywords: ["decimal point", "first non-zero", "first significant", "leading zero", "more accurate", "more information", "useful digits"],
            },
          ],
          difficulty: "core",
          guideRef: "significant-figures",
          hints: [
            "For 2 d.p., which digit is the decider? For 2 s.f., where do you start counting?",
            "The first significant figure of 0.0652 is the 6.",
            "Compare how many non-zero digits each answer keeps.",
          ],
          strategy: "Compare two methods",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q11",
          question: "Estimate 812 × 0.0489 by rounding each number to 1 significant figure.",
          answer: { type: "number", value: 40 },
          solution: [
            "Round to 1 s.f.: 812 → 800 and 0.0489 → 0.05.",
            "800 × 0.05 = 800 × 5 ÷ 100 = 4000 ÷ 100 = 40.",
            "So 812 × 0.0489 ≈ 40. (Exact: 39.7068.)",
          ],
          traps: [
            {
              spec: { type: "number", value: 4 },
              feedback: "Check 800 × 0.05. 0.05 is 5 hundredths, so 800 × 0.05 = 4000 ÷ 100 = 40.",
            },
            {
              spec: { type: "number", value: 400 },
              feedback: "800 × 0.05 is 40, not 400. Multiplying by 0.05 is the same as finding 5% of 800.",
            },
          ],
          difficulty: "core",
          guideRef: "estimation",
          hints: [
            "Round 812 and 0.0489 to 1 significant figure.",
            "0.0489 rounds to 0.05 — its first significant figure is in the hundredths column.",
            "For 800 × 0.05, work out 800 × 5, then divide by 100.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "written",
          id: "decimals-rounding-p1-q12",
          question:
            "Marcus uses his calculator to work out {{(19.6 * 0.52)/4.1}} and writes down 24.9.\n\nUse an estimate to show that Marcus must be wrong, and suggest what mistake he might have made.",
          marks: 3,
          modelAnswer:
            "Round each number to 1 s.f.: 19.6 ≈ 20, 0.52 ≈ 0.5 and 4.1 ≈ 4. Then {{(20 * 0.5)/4 = 10/4 = 2.5}}. The answer should be about 2.5, but Marcus's 24.9 is about 10 times too big, so a decimal point has slipped. He probably typed 5.2 instead of 0.52, since 19.6 × 5.2 ÷ 4.1 ≈ 24.9. The correct answer is about 2.49.",
          markScheme: [
            { point: "Rounds to 20, 0.5 and 4 (or similar sensible values)", keywords: ["20", "0.5", "4"] },
            { point: "Estimate of about 2.5", keywords: ["2.5", "10 ÷ 4", "10/4"] },
            {
              point: "Concludes 24.9 is about 10 times too big, e.g. a decimal point slip such as typing 5.2 for 0.52",
              keywords: ["10 times", "ten times", "too big", "decimal point", "5.2"],
            },
          ],
          difficulty: "core",
          guideRef: "estimation",
          hints: [
            "Round 19.6, 0.52 and 4.1 to 1 significant figure.",
            "Work out your estimate: the top first, then divide.",
            "Compare 24.9 with your estimate. By roughly what factor is it out?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q13",
          question: "Write 2.35 as a mixed number in its simplest form.",
          answer: { type: "fraction", n: 47, d: 20, simplest: true, form: "mixed", display: "{{2 7/20}}" },
          solution: [
            "The whole-number part is 2.",
            "0.35 = {{35/100}}, and the HCF of 35 and 100 is 5, so {{35/100 = 7/20}}.",
            "2.35 = {{2 7/20}}.",
          ],
          traps: [
            { spec: { type: "fraction", n: 7, d: 20 }, feedback: "That's just the 0.35 part — don't forget the whole number 2." },
          ],
          difficulty: "core",
          guideRef: "recurring-decimals",
          hints: [
            "Split 2.35 into 2 and 0.35.",
            "Write 0.35 as a number of hundredths.",
            "Simplify by dividing the top and bottom by 5.",
          ],
          strategy: "Use place value",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q14",
          question: "Work out 1.25 × 3.5 × 0.8 without a calculator.",
          answer: { type: "number", value: 3.5 },
          solution: [
            "You can multiply in any order (the commutative and associative laws), so pair the friendly numbers first: 1.25 × 0.8.",
            "125 × 8 = 1000, and there are 2 + 1 = 3 decimal places, so 1.25 × 0.8 = 1.000 = 1.",
            "So 1.25 × 3.5 × 0.8 = 1 × 3.5 = 3.5.",
          ],
          commonError:
            "Grinding from left to right (1.25 × 3.5 = 4.375, then 4.375 × 0.8) and slipping on the decimal places. Look for a friendly pair first.",
          traps: [
            {
              spec: { type: "number", value: 35 },
              feedback: "1.25 × 0.8 is 1, not 10: 125 × 8 = 1000 and there are 3 decimal places, so it is 1.000.",
            },
            { spec: { type: "number", value: 0.35 }, feedback: "1.25 × 0.8 = 1, so the answer is simply 1 × 3.5 = 3.5." },
          ],
          difficulty: "core",
          guideRef: "ordering-and-shortcuts",
          hints: [
            "Do you have to multiply from left to right?",
            "Which two of the numbers multiply to make something very simple?",
            "Work out 125 × 8. What does that tell you about 1.25 × 0.8?",
          ],
          strategy: "Use the laws of arithmetic",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q15",
          question:
            "Ravi's water bottle holds 0.75 litres. How many times can he fill it completely from a 13.5 litre water dispenser?",
          answer: { type: "number", value: 18 },
          solution: [
            "Number of fills = 13.5 ÷ 0.75.",
            "Multiply both by 100 to make the divisor whole: 1350 ÷ 75.",
            "75 × 18 = 1350, so the answer is 18.",
            "Check: 0.75 × 18 = 13.5.",
          ],
          solutions: [
            {
              label: "Count in quarter-litres (quicker in your head)",
              steps: [
                "13.5 litres = 13.5 × 4 = 54 quarter-litres.",
                "The bottle holds 0.75 litres = 3 quarter-litres.",
                "54 ÷ 3 = 18 fills.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 1.8 },
              feedback: "Too small: lots of small bottles fit into 13.5 litres. Multiply both numbers by 100: 1350 ÷ 75 = 18.",
            },
            { spec: { type: "number", value: 180 }, feedback: "Multiply *both* numbers by 100: 1350 ÷ 75, not 13,500 ÷ 75." },
          ],
          difficulty: "core",
          guideRef: "dividing-decimals",
          hints: [
            "Which division do you need?",
            "Make the divisor whole by multiplying both numbers by 100.",
            "How many 75s make 1350?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q16",
          question:
            "A plank is 2.4 m long, correct to 1 decimal place. Give the lower bound and then the upper bound of its length, in metres.",
          answer: { type: "list", values: [2.35, 2.45], ordered: true, display: "2.35 m and 2.45 m" },
          solution: [
            "Correct to 1 d.p. means to the nearest 0.1 m. Half of 0.1 is 0.05.",
            "Lower bound: 2.4 − 0.05 = 2.35.",
            "Upper bound: 2.4 + 0.05 = 2.45.",
            "Error interval: {{2.35 <= l < 2.45}}.",
          ],
          traps: [
            {
              spec: { type: "list", values: [2.3, 2.5], ordered: true },
              feedback: "Go half a unit either side, not a whole unit. The unit is 0.1, so use 0.05 either side.",
            },
            {
              spec: { type: "list", values: [2.4, 2.5], ordered: true },
              feedback: "That's the interval for *truncating*. For rounding, the bounds sit 0.05 either side of 2.4.",
            },
          ],
          difficulty: "core",
          guideRef: "error-intervals",
          hints: ["'Correct to 1 d.p.' means to the nearest what?", "The bounds are half of that unit either side of 2.4."],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q17",
          question: "Given that 7.2 × 0.35 = 2.52, work out 25.2 ÷ 0.035 without a calculator.",
          answer: { type: "number", value: 720 },
          solution: [
            "Turn the fact round: 7.2 × 0.35 = 2.52 means 2.52 ÷ 0.35 = 7.2.",
            "25.2 is 10 times 2.52, so the answer is 10 times bigger: 25.2 ÷ 0.35 = 72.",
            "0.035 is 10 times smaller than 0.35. Dividing by a smaller number makes the answer another 10 times bigger: 25.2 ÷ 0.035 = 720.",
            "Check: 0.035 × 720 = 25.2.",
          ],
          solutions: [
            {
              label: "Scale to whole numbers",
              steps: [
                "Multiply both numbers by 1000: 25.2 ÷ 0.035 = 25,200 ÷ 35.",
                "From the fact, 72 × 35 = 2520, so 720 × 35 = 25,200.",
                "So 25,200 ÷ 35 = 720. Both methods are quick; the first shows how each change to the numbers moves the answer.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 72 },
              feedback: "You've allowed for 25.2 being 10 times 2.52, but 0.035 is also 10 times *smaller* than 0.35 — and dividing by a smaller number makes the answer bigger again.",
            },
            {
              spec: { type: "number", value: 7.2 },
              feedback: "Both changes matter: the number being divided is 10 times bigger, and the divisor is 10 times smaller. Each one makes the answer 10 times bigger.",
            },
          ],
          difficulty: "challenge",
          guideRef: "dividing-decimals",
          hints: [
            "Use the inverse: if 7.2 × 0.35 = 2.52, what is 2.52 ÷ 0.35?",
            "How does making the first number 10 times bigger change the answer?",
            "How does making the divisor 10 times smaller change the answer?",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q18",
          question: "x = 3.6 and y = 1.2, both correct to 1 decimal place. Find the upper bound of x − y.",
          answer: { type: "number", value: 2.5 },
          solution: [
            "Error intervals: {{3.55 <= x < 3.65}} and {{1.15 <= y < 1.25}}.",
            "To make a difference as big as possible, make x as big as possible and y as *small* as possible.",
            "Upper bound of x − y = 3.65 − 1.15 = 2.5.",
          ],
          commonError: "Subtracting upper bound from upper bound (3.65 − 1.25 = 2.4).",
          traps: [
            {
              spec: { type: "number", value: 2.4 },
              feedback: "3.65 − 1.25 uses the *largest* y — but taking away more makes the difference smaller. Use the smallest y: 3.65 − 1.15 = 2.5.",
            },
          ],
          difficulty: "challenge",
          guideRef: "error-intervals",
          hints: [
            "Write the error interval for x and for y.",
            "Do you want y to be large or small to make x − y as big as possible?",
            "Use the upper bound of x and the lower bound of y.",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "decimals-rounding-p1-q19",
          question: "{{5/13}} = 0.384615384615… What is the 100th digit after the decimal point?",
          answer: { type: "number", value: 6 },
          solution: [
            "The block 384615 repeats, so the digits come in cycles of 6.",
            "100 ÷ 6 = 16 remainder 4, so 16 complete blocks use up the first 96 digits.",
            "The 100th digit is the 4th digit of the next block: 3, 8, 4, **6**.",
            "Answer: 6.",
          ],
          traps: [
            {
              spec: { type: "number", value: 5 },
              feedback: "5 is the last digit of a block, which would need 100 to be a multiple of 6. It isn't: 100 = 6 × 16 + 4.",
            },
            {
              spec: { type: "number", value: 4 },
              feedback: "Count carefully: 96 digits complete 16 blocks, so the 97th digit is 3, the 98th is 8, the 99th is 4 and the 100th is 6.",
            },
          ],
          difficulty: "challenge",
          guideRef: "recurring-decimals",
          hints: [
            "How long is the repeating block?",
            "How many complete blocks fit into the first 100 digits?",
            "100 = 6 × 16 + 4. Which digit of the block is the 100th?",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "written",
          id: "decimals-rounding-p1-q20",
          question:
            "Ethan rounds numbers in two stages: first to 2 decimal places, then that answer to 1 decimal place. He claims this always gives the same answer as rounding straight to 1 decimal place.\n\n**(a)** Give a counterexample.\n\n**(b)** Which numbers between 3.1 and 3.2 give the wrong answer with Ethan's method? Explain why.",
          marks: 3,
          modelAnswer:
            "(a) Take 3.146. Straight to 1 d.p.: 3.1 | 46, the decider is 4, so 3.1. Ethan's way: 3.146 → 3.15 (2 d.p.) → 3.2 (1 d.p.). The answers are different, so his claim is false.\n\n(b) The trouble happens when the first rounding pushes a number that is *below* halfway (3.15) up to exactly halfway, and the second rounding then rounds that up. Numbers from 3.145 up to, but not including, 3.15 become 3.15 at 2 d.p. and then 3.2, although they are nearer to 3.1. So the numbers that go wrong are {{3.145 <= x < 3.15}}; every other number between 3.1 and 3.2 gives the same answer both ways. The fix is to always round the original number, using only the digit after the place you are rounding to.",
          markScheme: [
            {
              point: "A correct counterexample with both roundings shown (e.g. 3.146 → 3.1 directly, but 3.15 → 3.2 in two stages)",
              keywords: ["3.146", "3.147", "3.148", "3.149", "3.145", "counterexample", "3.15"],
            },
            {
              point: "Explains that the first rounding pushes a number below halfway up to exactly halfway, which then rounds up again",
              keywords: ["halfway", "half way", "pushes", "rounds up again", "rounds up twice", "below"],
            },
            { point: "Identifies the range {{3.145 <= x < 3.15}}", keywords: ["3.145", "3.149", "3.15"] },
          ],
          commonError: "Testing only one or two numbers that happen to work and concluding Ethan is right.",
          difficulty: "challenge",
          guideRef: "decimal-places",
          hints: [
            "Try 3.146 both ways.",
            "What is special about 3.15 when you round to 1 decimal place?",
            "Which numbers become exactly 3.15 when rounded to 2 d.p., even though they are less than 3.15?",
          ],
          strategy: "Spot the error",
        },
      ],
    },
    {
      id: "decimals-rounding-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "decimals-rounding-p2-q01",
          question: "Work out 0.05 × 0.8. Give your answer as a decimal.",
          answer: { type: "number", value: 0.04, allowFraction: false },
          solution: [
            "Ignore the points: 5 × 8 = 40.",
            "Decimal places: 2 + 1 = 3, so the answer is 0.040.",
            "Place the point first, then drop the end zero: 0.04.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.4 },
              feedback: "Place the point before dropping zeros: 40 with 3 decimal places is 0.040 = 0.04. Dropping the 0 of 40 first gives 0.4, which is wrong.",
            },
            {
              spec: { type: "number", value: 0.004 },
              feedback: "40 with 3 decimal places is 0.040, which is 0.04. You've moved the point one place too far.",
            },
          ],
          difficulty: "warmup",
          guideRef: "multiplying-decimals",
          hints: ["Work out 5 × 8, then count the decimal places in the question. Place the point before tidying zeros."],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q02",
          question: "Work out 8.4 ÷ 0.7.",
          answer: { type: "number", value: 12 },
          solution: ["Multiply both numbers by 10: 8.4 ÷ 0.7 = 84 ÷ 7.", "84 ÷ 7 = 12.", "Check: 0.7 × 12 = 8.4."],
          traps: [
            {
              spec: { type: "number", value: 1.2 },
              feedback: "Dividing by 0.7 (less than 1) must give an answer bigger than 8.4. Multiply both numbers by 10: 84 ÷ 7 = 12.",
            },
          ],
          difficulty: "warmup",
          guideRef: "dividing-decimals",
          hints: ["Multiply both numbers by 10 so that you divide by a whole number."],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q03",
          question: "Round 0.3086 to 2 decimal places.",
          answer: { type: "number", value: 0.31 },
          solution: [
            "Cut after the 2nd decimal place: 0.30 | 86.",
            "The decider is 8, so round up: the 0 becomes 1.",
            "Answer: 0.31.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.3 },
              feedback: "That's 1 decimal place. For 2 d.p. keep two digits after the point: 0.30 | 86 rounds up to 0.31.",
            },
          ],
          difficulty: "warmup",
          guideRef: "decimal-places",
          hints: ["The 2nd decimal place holds a 0. Look at the digit straight after it."],
          strategy: "Look at the decider digit",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q04",
          question: "Round 0.0029481 to 2 significant figures.",
          answer: { type: "number", value: 0.0029 },
          solution: [
            "The first non-zero digit is the 2 (thousandths): that's the 1st significant figure.",
            "The 2nd significant figure is 9. Cut: 0.0029 | 481.",
            "The decider is 4, so round down: 0.0029.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.003 },
              feedback: "That's only 1 significant figure. Keep two — the 2 and the 9 — then look at the decider, 4.",
            },
            {
              spec: { type: "number", value: 29 },
              feedback: "The leading zeros must stay, because they show the size. 0.0029481 to 2 s.f. is 0.0029.",
            },
          ],
          difficulty: "warmup",
          guideRef: "significant-figures",
          hints: ["Leading zeros don't count. Which digit is the 1st significant figure?"],
          strategy: "Look at the decider digit",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q05",
          question: "Write 0.125 as a fraction in its simplest form.",
          answer: { type: "fraction", n: 1, d: 8, simplest: true },
          solution: [
            "The last digit is in the thousandths column: 0.125 = {{125/1000}}.",
            "The HCF of 125 and 1000 is 125.",
            "{{125/1000 = 1/8}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 125, d: 100 },
              feedback: "0.125 has three decimal places, so it is a number of *thousandths*: {{125/1000}}. Then simplify.",
            },
          ],
          difficulty: "warmup",
          guideRef: "recurring-decimals",
          hints: ["What place value does the last digit have? Write over 1000, then simplify."],
          strategy: "Use place value",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q06",
          question:
            "A rectangular vegetable bed in a community garden is 3.25 m long and 1.6 m wide. Work out its area in m².",
          answer: { type: "number", value: 5.2 },
          solution: [
            "Area = length × width = 3.25 × 1.6.",
            "Estimate: 3 × 2 = 6.",
            "Ignore the points: 325 × 16 = 3250 + 1950 = 5200.",
            "Decimal places: 2 + 1 = 3, so 5.200 = 5.2 m², close to the estimate.",
          ],
          commonError: "Dropping the zeros of 5200 before placing the point, giving 0.052 or 0.52.",
          traps: [
            {
              spec: { type: "number", value: 0.52 },
              feedback: "Place the point before dropping zeros: 5200 with 3 decimal places is 5.200 = 5.2. The estimate 3 × 2 = 6 shows 0.52 is far too small.",
            },
            { spec: { type: "number", value: 52 }, feedback: "Ten times too big. 5200 with 3 decimal places is 5.200 = 5.2." },
          ],
          difficulty: "core",
          guideRef: "multiplying-decimals",
          hints: [
            "Estimate first so you know roughly where the point goes.",
            "Work out 325 × 16.",
            "How many decimal places are there in 3.25 and 1.6 altogether? Place the point before tidying zeros.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q07",
          question:
            "Petrol costs $2.85 per litre. Arjun's mum pays $54.15 to fill up the car. How many litres of petrol does she buy?",
          answer: { type: "number", value: 19 },
          solution: [
            "Litres = 54.15 ÷ 2.85.",
            "Estimate: 54 ÷ 3 = 18, so expect roughly 18 litres.",
            "Multiply both by 100: 5415 ÷ 285.",
            "285 × 20 = 5700, which is 285 too many, so 285 × 19 = 5415.",
            "She buys 19 litres.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1.9 },
              feedback: "Estimate: about $54 at about $3 a litre is about 18 litres, so 1.9 is ten times too small.",
            },
            { spec: { type: "number", value: 190 }, feedback: "Multiply *both* numbers by 100: 5415 ÷ 285 = 19." },
          ],
          difficulty: "core",
          guideRef: "dividing-decimals",
          hints: [
            "Which division gives the number of litres?",
            "Multiply both numbers by 100 to make the divisor whole.",
            "Try 285 × 20, then adjust.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "written",
          id: "decimals-rounding-p2-q08",
          question:
            "Ravi says: *0.0500 has 1 significant figure, because zeros don't count.*\n\nExplain whether Ravi is right.",
          marks: 3,
          modelAnswer:
            "Ravi is wrong: 0.0500 has 3 significant figures. The two zeros in front of the 5 are not significant — they only show the size of the number (that the 5 is in the hundredths column). The two zeros after the 5 *are* significant. They aren't needed to show the size, so the only reason to write them is to show accuracy: 0.0500 means the value is correct to 4 decimal places (to the nearest 0.0001), whereas 0.05 would only be correct to the nearest 0.01.",
          markScheme: [
            { point: "States that 0.0500 has 3 significant figures", keywords: ["3", "three"] },
            {
              point: "Leading zeros are not significant — they only show the size or place value",
              keywords: ["leading", "before the 5", "in front", "size", "place value", "not significant"],
            },
            {
              point: "The zeros after the 5 are significant because they show accuracy (e.g. correct to 4 d.p.)",
              keywords: ["after the 5", "end zeros", "trailing", "accuracy", "accurate", "4 d.p.", "4 decimal places"],
            },
          ],
          commonError: "Thinking that every zero is just a placeholder.",
          difficulty: "core",
          guideRef: "significant-figures",
          hints: [
            "Which zeros are needed just to show how big the number is?",
            "Would the value change if you deleted the last two zeros? So why write them?",
            "Count from the first non-zero digit.",
          ],
          strategy: "Spot the error",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q09",
          question:
            "Round 3.0049 to 3 significant figures. Write the answer exactly as it should appear when given to 3 significant figures.",
          answer: { type: "text", accept: ["3.00"], display: "3.00" },
          solution: [
            "The significant figures are 3, 0, 0, 4, 9 — the zeros between the 3 and the 4 count.",
            "Cut after 3 s.f.: 3.00 | 49.",
            "The decider is 4, so round down: 3.00.",
            "Keep both zeros: they show the answer is accurate to 3 significant figures.",
          ],
          commonError: "Writing 3 (losing the accuracy), or rounding in stages to get 3.01.",
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback: "Right value — but 3 has only 1 significant figure. To show 3 s.f., write 3.00.",
            },
            {
              spec: { type: "number", value: 3.01 },
              feedback: "Don't round in stages (3.0049 → 3.005 → 3.01). Round the original number once: the decider after 3.00 is 4, so it rounds down to 3.00.",
            },
          ],
          difficulty: "core",
          guideRef: "significant-figures",
          hints: [
            "Do the zeros between the 3 and the 4 count as significant figures?",
            "Cut after the 3rd significant figure and look at the decider.",
            "How should you write the answer so that it clearly has 3 s.f.?",
          ],
          strategy: "Look at the decider digit",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q10",
          question: "Write these numbers in order, smallest first:\n\n−2.3, −2.03, −2.33, −2.303, −2.033",
          answer: {
            type: "list",
            values: [-2.33, -2.303, -2.3, -2.033, -2.03],
            ordered: true,
            display: "−2.33, −2.303, −2.3, −2.033, −2.03",
          },
          solution: [
            "Pad the sizes to 3 decimal places: 2.300, 2.030, 2.330, 2.303, 2.033.",
            "Sizes from biggest to smallest: 2.330, 2.303, 2.300, 2.033, 2.030.",
            "For negative numbers, the biggest size is the smallest number.",
            "Smallest first: −2.33, −2.303, −2.3, −2.033, −2.03.",
          ],
          traps: [
            {
              spec: { type: "list", values: [-2.03, -2.033, -2.3, -2.303, -2.33], ordered: true },
              feedback: "You've ordered them as if they were positive. On a number line −2.33 is further left than −2.03, so it is smaller.",
            },
          ],
          difficulty: "core",
          guideRef: "ordering-and-shortcuts",
          hints: [
            "Pad the sizes with zeros so they all have 3 decimal places.",
            "Which number has the biggest size? Where is it on a number line?",
            "For negatives, reverse the order of the sizes.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "written",
          id: "decimals-rounding-p2-q11",
          question:
            "Mei works out 5.7 × 9.9 in her head like this:\n\n*5.7 × 10 = 57, then 57 − 0.1 = 56.9*\n\nExplain her mistake and find the correct answer.",
          marks: 3,
          modelAnswer:
            "9.9 = 10 − 0.1, so by the distributive law 5.7 × 9.9 = 5.7 × (10 − 0.1) = 5.7 × 10 − 5.7 × 0.1. Mei took away just 0.1, but she should take away 5.7 lots of 0.1, which is 0.57. So 5.7 × 9.9 = 57 − 0.57 = 56.43.",
          markScheme: [
            {
              point: "Identifies that she subtracted 0.1 instead of 5.7 × 0.1",
              keywords: ["5.7 × 0.1", "5.7 x 0.1", "0.57", "only 0.1", "lots of 0.1", "should subtract"],
            },
            {
              point: "Uses the distributive law: 5.7 × (10 − 0.1) = 5.7 × 10 − 5.7 × 0.1",
              keywords: ["distributive", "10 − 0.1", "10 - 0.1", "each part", "both parts", "multiply both"],
            },
            { point: "Correct answer 56.43", keywords: ["56.43"] },
          ],
          difficulty: "core",
          guideRef: "ordering-and-shortcuts",
          hints: [
            "Write 9.9 as 10 − something.",
            "When you multiply 5.7 by (10 − 0.1), what must the 0.1 be multiplied by?",
            "5.7 × 9.9 is 5.7 lots of 0.1 less than 5.7 × 10. How much is 5.7 lots of 0.1?",
          ],
          strategy: "Use the laws of arithmetic",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q12",
          question: "Estimate the value of {{(197 * 0.62)/0.0485}} by rounding each number to 1 significant figure.",
          answer: { type: "number", value: 2400 },
          solution: [
            "Round to 1 s.f.: 197 → 200, 0.62 → 0.6, 0.0485 → 0.05.",
            "Top: 200 × 0.6 = 120.",
            "Divide: 120 ÷ 0.05 = 12,000 ÷ 5 = 2400 (multiply both by 100).",
            "So the value ≈ 2400. (The exact value is about 2518.)",
          ],
          traps: [
            {
              spec: { type: "number", value: 6 },
              feedback: "You multiplied by 0.05 instead of dividing. Dividing by a small number gives a *big* answer: 120 ÷ 0.05 = 2400.",
            },
            {
              spec: { type: "number", value: 240 },
              feedback: "Check 120 ÷ 0.05: multiply both by 100 to get 12,000 ÷ 5 = 2400.",
            },
          ],
          difficulty: "core",
          guideRef: "estimation",
          hints: [
            "Round each of the three numbers to 1 significant figure.",
            "0.0485 rounds to 0.05. What is 200 × 0.6?",
            "There are 20 lots of 0.05 in every 1. Use that to divide.",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "written",
          id: "decimals-rounding-p2-q13",
          question:
            "Zara estimates 47.6 ÷ 0.82 by working out 50 ÷ 0.8 = 62.5.\n\nWithout working out the exact answer, explain whether her estimate is bigger or smaller than the exact answer.",
          marks: 3,
          modelAnswer:
            "Her estimate is too big — it is an overestimate. She rounded 47.6 *up* to 50, and dividing a bigger number gives a bigger answer. She rounded 0.82 *down* to 0.8, and dividing by a smaller number also gives a bigger answer (more 0.8s fit in than 0.82s). Both changes push the answer up, so 62.5 is bigger than the exact answer. (In fact 47.6 ÷ 0.82 ≈ 58.0.)",
          markScheme: [
            { point: "Rounding 47.6 up to 50 makes the answer bigger", keywords: ["up", "50", "bigger number", "larger number"] },
            {
              point: "Rounding the divisor 0.82 down to 0.8 also makes the answer bigger",
              keywords: ["down", "0.8", "smaller divisor", "dividing by a smaller", "more fit"],
            },
            { point: "Concludes it is an overestimate (bigger than the exact answer)", keywords: ["overestimate", "over", "too big", "bigger"] },
          ],
          commonError: "Thinking that rounding one number up and one down must cancel out. In a division they can both push the same way.",
          difficulty: "core",
          guideRef: "estimation",
          hints: [
            "Was 47.6 rounded up or down? What does that do to the answer?",
            "Was 0.82 rounded up or down? Dividing by a smaller number gives… ?",
            "Do the two effects work together or against each other?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q14",
          question:
            "How many of these fractions are equal to terminating decimals?\n\n{{3/40}}, {{4/15}}, {{9/75}}, {{21/56}}, {{5/36}}",
          answer: { type: "number", value: 3 },
          solution: [
            "Simplify each fraction first, then look at the prime factors of the denominator.",
            "{{3/40}}: 40 = 2 × 2 × 2 × 5. Only 2s and 5s, so it terminates (0.075).",
            "{{4/15}}: 15 = 3 × 5 has a 3, so it recurs.",
            "{{9/75 = 3/25}}: 25 = 5 × 5, so it terminates (0.12).",
            "{{21/56 = 3/8}}: 8 = 2 × 2 × 2, so it terminates (0.375).",
            "{{5/36}}: 36 = 2 × 2 × 3 × 3 has a 3, so it recurs.",
            "So 3 of them terminate.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1 },
              feedback: "Simplify first! {{9/75 = 3/25}} and {{21/56 = 3/8}} — the 3 and the 7 cancel, and both then terminate.",
            },
            {
              spec: { type: "number", value: 2 },
              feedback: "Check every fraction in its simplest form: {{9/75}} and {{21/56}} both simplify to fractions that terminate.",
            },
          ],
          difficulty: "core",
          guideRef: "recurring-decimals",
          hints: [
            "What test tells you whether a fraction terminates?",
            "Simplify every fraction before you look at its denominator.",
            "What common factor do 21 and 56 share? And 9 and 75?",
          ],
          strategy: "Use prime factors",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q15",
          question:
            "Ethan's calculator truncates answers — it chops off every digit after the 2nd decimal place. It shows 4.38. Give the lower bound and then the upper bound for the full answer x, so that lower bound ≤ x < upper bound.",
          answer: { type: "list", values: [4.38, 4.39], ordered: true, display: "4.38 and 4.39, so {{4.38 <= x < 4.39}}" },
          solution: [
            "Truncating chops digits off without rounding, so the full answer starts 4.38…",
            "The smallest it can be is 4.38 itself.",
            "Anything up to 4.3899… also shows as 4.38, but 4.39 would show as 4.39.",
            "So {{4.38 <= x < 4.39}}.",
          ],
          traps: [
            {
              spec: { type: "list", values: [4.375, 4.385], ordered: true },
              feedback: "That would be the interval for *rounding* to 2 d.p. Truncating never rounds up, so the interval starts at 4.38 and is one whole unit (0.01) wide.",
            },
          ],
          difficulty: "core",
          guideRef: "error-intervals",
          hints: [
            "Which numbers would the calculator chop down to 4.38?",
            "Is 4.385 shown as 4.38 when truncating? What about 4.3899?",
            "The interval starts at the value shown and is 0.01 wide.",
          ],
          strategy: "Draw a number line",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q16",
          question:
            "Each step on a staircase rises 0.175 m. How much higher are you after climbing 24 steps? Give your answer in metres.",
          answer: { type: "number", value: 4.2 },
          solution: [
            "Height = 24 × 0.175.",
            "Ignore the point: 24 × 175 = 4200 (175 × 4 = 700, and 700 × 6 = 4200).",
            "0.175 has 3 decimal places, so the answer is 4.200 = 4.2 m.",
            "Sense check: each step is just under 0.2 m, and 24 × 0.2 = 4.8, so a bit under 4.8 m is right.",
          ],
          traps: [
            { spec: { type: "number", value: 42 }, feedback: "Ten times too big: 4200 with 3 decimal places is 4.200 = 4.2." },
            {
              spec: { type: "number", value: 0.42 },
              feedback: "Ten times too small. Place the point in 4200 first (4.200), then drop the end zeros.",
            },
          ],
          difficulty: "core",
          guideRef: "multiplying-decimals",
          hints: [
            "Which calculation gives the total height?",
            "Work out 24 × 175, then place the point.",
            "Check: each step is a bit under 0.2 m. How high would 24 steps of 0.2 m take you?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q17",
          question:
            "The number of runners in a Sentosa charity fun run is 300 when rounded to 1 significant figure, and 250 when rounded to 2 significant figures. What are the smallest and largest possible numbers of runners? Give the smallest first.",
          answer: { type: "list", values: [250, 254], ordered: true, display: "250 and 254" },
          solution: [
            "300 to 1 s.f.: the number is from 250 up to 349. (250 rounds up to 300; 350 would round to 400.)",
            "250 to 2 s.f.: the number is from 245 up to 254. (255 would round to 260.)",
            "It must satisfy both conditions, so it is from 250 up to 254.",
            "Runners are whole numbers: the smallest is 250 and the largest is 254.",
          ],
          traps: [
            {
              spec: { type: "list", values: [245, 254], ordered: true },
              feedback: "245 rounds to 200 to 1 significant figure (the decider is 4), so it fails the first condition.",
            },
            {
              spec: { type: "list", values: [250, 255], ordered: true },
              feedback: "255 rounds to 260 to 2 s.f. — and runners come in whole numbers, so the largest is 254.",
            },
          ],
          difficulty: "challenge",
          guideRef: "error-intervals",
          hints: [
            "Which whole numbers round to 300 to 1 s.f.?",
            "Which whole numbers round to 250 to 2 s.f.?",
            "Which numbers are on both lists?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q18",
          question: "Write the recurring decimal 0.13̇ (that is, 0.1333…) as a fraction in its simplest form.",
          answer: { type: "fraction", n: 2, d: 15, simplest: true },
          solution: [
            "Let x = 0.1333…",
            "Only the 3 repeats, so multiply by 10: 10x = 1.333…",
            "Subtract: 10x − x = 1.333… − 0.1333… = 1.2, so 9x = 1.2.",
            "x = {{1.2/9 = 12/90 = 2/15}}.",
          ],
          solutions: [
            {
              label: "Split it up (slicker if you know your thirds)",
              steps: [
                "0.1333… = 0.1 + 0.0333…",
                "0.0333… is a tenth of 0.333… = {{1/3}}, so it equals {{1/30}}.",
                "{{1/10 + 1/30 = 3/30 + 1/30 = 4/30 = 2/15}}.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 13, d: 99 },
              feedback: "{{13/99}} = 0.131313… — that's 0.1̇3̇, where both digits repeat. Here only the 3 repeats.",
            },
            {
              spec: { type: "fraction", n: 13, d: 90 },
              feedback: "Check it: {{13/90}} = 0.1444… Subtracting x from 10x gives 9x = 1.2, so x = {{12/90}}.",
            },
          ],
          difficulty: "challenge",
          guideRef: "recurring-decimals",
          hints: [
            "Call the number x. Which power of 10 lines up the repeating part?",
            "Work out 10x − x. What happens to the endless tail of 3s?",
            "Solve 9x = 1.2, then write x as a fraction and simplify.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "decimals-rounding-p2-q19",
          question: "Work out 3.7 × 4.3 without a calculator, using a shortcut.",
          answer: { type: "number", value: 15.91 },
          solution: [
            "3.7 = 4 − 0.3 and 4.3 = 4 + 0.3.",
            "(4 − 0.3)(4 + 0.3) = 4 × 4 + 4 × 0.3 − 0.3 × 4 − 0.3 × 0.3.",
            "The two middle terms cancel, leaving 16 − 0.09 = 15.91.",
          ],
          solutions: [
            {
              label: "Standard multiplication",
              steps: [
                "37 × 43 = 37 × 40 + 37 × 3 = 1480 + 111 = 1591.",
                "There are 2 decimal places in the question, so 15.91.",
                "It works, but the shortcut is slicker: one easy square minus one tiny square.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 16.09 },
              feedback: "The small square is *subtracted*: (4 − 0.3)(4 + 0.3) = 16 − 0.09, not 16 + 0.09.",
            },
          ],
          difficulty: "challenge",
          guideRef: "ordering-and-shortcuts",
          hints: [
            "Which number is exactly halfway between 3.7 and 4.3?",
            "Write 3.7 = 4 − 0.3 and 4.3 = 4 + 0.3, then multiply out.",
            "What happens to the two middle terms?",
          ],
          strategy: "Use the laws of arithmetic",
        },
        {
          kind: "written",
          id: "decimals-rounding-p2-q20",
          question:
            "Always, sometimes or never true?\n\n*When you multiply two numbers that are both between 0 and 1, the answer is smaller than both of them.*\n\nExplain your answer.",
          marks: 3,
          modelAnswer:
            "Always true. Call the numbers a and b, both between 0 and 1. a × b means 'b lots of a'; since b is less than 1, that is only part of a, so a × b < a. In the same way a × b is 'a lots of b', which is only part of b because a < 1, so a × b < b. For example, 0.6 × 0.5 = 0.3, which is smaller than both 0.6 and 0.5. An area model shows it too: a 0.6 by 0.5 rectangle fits inside both a 0.6 by 1 strip and a 1 by 0.5 strip, so its area is less than 0.6 and less than 0.5.",
          markScheme: [
            { point: "States always true", keywords: ["always"] },
            {
              point: "Explains that a × b is only part of a (b lots of a, with b < 1), so it is smaller than a",
              keywords: ["part of", "fraction of", "less than 1", "less than one", "smaller than a", "lots of"],
            },
            {
              point: "Applies the same reasoning to b, or supports it with an area model or a correct example (e.g. 0.6 × 0.5 = 0.3)",
              keywords: ["both", "smaller than b", "area", "0.3", "example"],
            },
          ],
          commonError: "Testing one example and calling it 'always'. An example supports a claim; a reason proves it.",
          difficulty: "challenge",
          guideRef: "multiplying-decimals",
          hints: [
            "Try a few: 0.5 × 0.4, 0.9 × 0.9, 0.1 × 0.8.",
            "What does multiplying by a number less than 1 do to a positive number?",
            "Think of a × b as 'b lots of a'. If b < 1, is that more or less than a?",
          ],
          strategy: "Try small cases",
        },
      ],
    },
  ],

  // ======================================================================
  // CHALLENGE SET — AoPS / UKMT Junior style, all "challenge"
  // ======================================================================
  challenge: [
    {
      kind: "short",
      id: "decimals-rounding-ch-q01",
      question: "{{1/7}} = 0.142857142857… What is the sum of the first 100 digits after the decimal point?",
      answer: { type: "number", value: 447 },
      solution: [
        "The block 142857 repeats every 6 digits. Its digit sum is 1 + 4 + 2 + 8 + 5 + 7 = 27.",
        "100 = 6 × 16 + 4, so the first 100 digits are 16 complete blocks followed by 4 more digits.",
        "16 blocks: 16 × 27 = 432.",
        "The next 4 digits are 1, 4, 2, 8, which add to 15.",
        "Total: 432 + 15 = 447.",
      ],
      solutions: [
        {
          label: "Overshoot and trim (just as quick)",
          steps: [
            "17 blocks = 102 digits, with digit sum 17 × 27 = 459.",
            "That's 2 digits too many: the 101st and 102nd digits are the 5th and 6th of a block, 5 and 7.",
            "459 − 5 − 7 = 447. This is handy when the leftover is nearly a whole block.",
            "Bonus: 142 + 857 = 999, so the digits pair up as 1 + 8, 4 + 5, 2 + 7 = 9 each. That's why every block sums to 27.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 432 }, feedback: "That's only 96 digits (16 blocks). Add the 4 digits that start the 17th block." },
        { spec: { type: "number", value: 459 }, feedback: "17 blocks is 102 digits — 2 too many. Take off the 101st and 102nd digits." },
      ],
      difficulty: "challenge",
      guideRef: "recurring-decimals",
      hints: [
        "How long is the repeating block, and what is its digit sum?",
        "How many complete blocks fit into 100 digits, and how many digits are left over?",
        "100 = 6 × 16 + 4. Add 16 block sums and the first 4 digits of the block.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q02",
      question:
        "Priya should have divided a number by 0.6. By mistake she multiplied it by 0.6 instead, and her answer was 6.4 less than the correct answer. What number did she start with?",
      answer: { type: "number", value: 6 },
      solution: [
        "Let the starting number be n. Since 0.6 = {{3/5}}, dividing by 0.6 is multiplying by {{5/3}}: the correct answer is {{5/3 n}}.",
        "Priya's answer is 0.6n = {{3/5 n}}.",
        "The difference is {{5/3 n - 3/5 n = 25/15 n - 9/15 n = 16/15 n}}.",
        "So {{16/15 n = 6.4}}, which gives n = 6.4 × {{15/16}} = 0.4 × 15 = 6.",
        "Check: 6 ÷ 0.6 = 10 and 6 × 0.6 = 3.6, and 10 − 3.6 = 6.4. ✓",
      ],
      solutions: [
        {
          label: "Ratio and a bar model (slicker)",
          steps: [
            "Multiplying by 0.6 instead of dividing by 0.6 is out by a factor of 0.6 × 0.6 = 0.36: wrong answer = 0.36 × correct answer.",
            "So correct : wrong = 100 : 36 = 25 : 9.",
            "The gap is 25 − 9 = 16 parts, and that is 6.4, so 1 part = 0.4.",
            "Correct answer = 25 × 0.4 = 10, so the starting number is 10 × 0.6 = 6.",
            "No fractions of fractions — just parts of a bar.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 10 }, feedback: "10 is the answer Priya *should* have got. The question asks for the number she started with." },
        { spec: { type: "number", value: 3.6 }, feedback: "3.6 is Priya's wrong answer. Work back to the number she started with." },
      ],
      difficulty: "challenge",
      guideRef: "dividing-decimals",
      hints: [
        "Call the starting number n. Write the correct answer and Priya's answer in terms of n.",
        "Dividing by 0.6 is the same as multiplying by which fraction?",
        "Compare the two answers: the wrong one is 0.6 × 0.6 = 0.36 times the right one.",
        "Set up 'correct − wrong = 6.4' and solve.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q03",
      question: "How many whole numbers round to 100 when they are rounded to 1 significant figure?",
      answer: { type: "number", value: 55 },
      solution: [
        "Above 100: the next 1 s.f. number up is 200, so the cut-off is halfway, at 150. The whole numbers 100 to 149 round to 100 — that's 50 numbers.",
        "Below 100: 1 s.f. numbers below 100 go up in tens, so the next one down is 90 and the cut-off is 95. The whole numbers 95 to 99 round to 100 — that's 5 more.",
        "Total: 50 + 5 = 55.",
      ],
      solutions: [
        {
          label: "Halfway points on a number line (slicker)",
          steps: [
            "Mark the 1 s.f. neighbours of 100: 90 below and 200 above.",
            "The rounding cut-offs are the halfway points, 95 and 150.",
            "So the whole numbers from 95 up to 149 round to 100: 149 − 95 + 1 = 55.",
            "The interval is lopsided because 100 is exactly where the gap between 1 s.f. numbers jumps from 10 to 100.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 100 },
          feedback: "That assumes 50 to 149 all round to 100. But below 100, 1 s.f. means the nearest 10: 60 stays as 60, and 87 rounds to 90.",
        },
        { spec: { type: "number", value: 50 }, feedback: "You've counted 100 to 149. What about numbers just below 100, like 97?" },
      ],
      difficulty: "challenge",
      guideRef: "significant-figures",
      hints: [
        "Does 97 round to 100 when rounded to 1 s.f.? Does 60?",
        "What are the nearest 1 s.f. numbers either side of 100?",
        "Find the halfway points between 100 and each neighbour, then count.",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q04",
      question:
        "A rectangle measures 6 cm by 4 cm, each measured to the nearest centimetre. Find the difference between the upper bound and the lower bound of its area, in cm².",
      diagram: `<svg viewBox="0 0 320 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 6.5 cm by 4.5 cm rectangle with a 5.5 cm by 3.5 cm rectangle centred inside it, leaving a shaded frame 0.5 cm wide; a dashed 6 cm by 4 cm rectangle runs along the middle of the frame"><rect x="0" y="0" width="320" height="215" fill="#ffffff"/><rect x="60" y="40" width="195" height="135" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><rect x="75" y="55" width="165" height="105" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="67.5" y="47.5" width="180" height="120" fill="none" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/><text x="157.5" y="30" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">6.5 cm</text><text x="52" y="112" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">4.5 cm</text><text x="157.5" y="112" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">5.5 cm by 3.5 cm</text><text x="160" y="200" font-family="sans-serif" font-size="11" text-anchor="middle" fill="#1f2937">Dashed: 6 cm by 4 cm. Shaded frame: 0.5 cm wide.</text></svg>`,
      answer: { type: "number", value: 10 },
      solution: [
        "Bounds of the sides: {{5.5 <= l < 6.5}} and {{3.5 <= w < 4.5}}.",
        "Upper bound of the area: 6.5 × 4.5 = 29.25.",
        "Lower bound of the area: 5.5 × 3.5 = 19.25.",
        "Difference: 29.25 − 19.25 = 10 cm².",
      ],
      solutions: [
        {
          label: "Algebra (slickest — and it explains the neat answer)",
          steps: [
            "For sides a and b measured to the nearest unit, the difference is {{(a + 0.5)(b + 0.5) - (a - 0.5)(b - 0.5)}}.",
            "Expand: {{ab + 0.5a + 0.5b + 0.25 - (ab - 0.5a - 0.5b + 0.25)}}.",
            "Everything cancels except a + b.",
            "So the difference is 6 + 4 = 10. For *any* rectangle measured to the nearest unit, it equals the sum of the two sides.",
          ],
        },
        {
          label: "Picture it",
          steps: [
            "Centre the smallest possible rectangle (5.5 by 3.5) inside the largest (6.5 by 4.5), as in the diagram.",
            "The difference in area is the shaded frame, 0.5 cm wide.",
            "The dashed 6 cm by 4 cm rectangle runs along the middle of the frame. A frame's area is the length of its middle line × its width: 20 × 0.5 = 10 cm².",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 5.25 },
          feedback: "6.5 × 4.5 − 6 × 4 compares the upper bound with the measured area. The question wants upper bound minus *lower* bound (5.5 × 3.5).",
        },
      ],
      difficulty: "challenge",
      guideRef: "error-intervals",
      hints: [
        "What are the smallest and largest possible values of each side?",
        "Which side lengths give the largest area? Which give the smallest?",
        "Work out both areas and subtract. Then ask yourself: is the neat answer a coincidence?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q05",
      question:
        "Work out the sum of all the numbers from 0.1 to 9.9 that go up in steps of 0.1:\n\n    0.1 + 0.2 + 0.3 + … + 9.8 + 9.9",
      answer: { type: "number", value: 495 },
      solution: [
        "Every term is a whole number of tenths, so take 0.1 out as a common factor (the distributive law): the sum is 0.1 × (1 + 2 + 3 + … + 99).",
        "Pair the whole numbers from the outside in: 1 + 99 = 100, 2 + 98 = 100, …, 49 + 51 = 100. That's 49 pairs, with 50 left over in the middle.",
        "So 1 + 2 + … + 99 = 49 × 100 + 50 = 4950.",
        "The sum is 0.1 × 4950 = 495.",
      ],
      solutions: [
        {
          label: "Average × count (slickest)",
          steps: [
            "0.1 to 9.9 in steps of 0.1 is 1 tenth up to 99 tenths, so there are 99 numbers.",
            "They are evenly spaced, so their average is halfway between the first and the last: (0.1 + 9.9) ÷ 2 = 5.",
            "Sum = 99 × 5 = 495.",
            "Slickest of all: no pairing to keep track of, and no factor to take out.",
          ],
        },
        {
          label: "Pair the decimals directly",
          steps: [
            "0.1 + 9.9 = 10, 0.2 + 9.8 = 10, …, 4.9 + 5.1 = 10: that's 49 pairs.",
            "5.0 is left in the middle with no partner.",
            "Sum = 49 × 10 + 5 = 495.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 4950 },
          feedback: "That's 1 + 2 + … + 99. Every term here is a tenth of those whole numbers, so the sum is 0.1 × 4950.",
        },
        {
          spec: { type: "number", value: 490 },
          feedback: "Count the pairs again: 0.1 + 9.9 up to 4.9 + 5.1 is 49 pairs, and 5.0 is left in the middle with no partner. Add it on.",
        },
      ],
      commonError: "Miscounting the terms: there are 99 of them, not 100, so one number sits in the middle unpaired.",
      difficulty: "challenge",
      guideRef: "ordering-and-shortcuts",
      hints: [
        "How many numbers are being added? Count in tenths.",
        "Pair the first number with the last, the second with the second-last, and so on. What does each pair add to?",
        "Is a number left over in the middle? Or use the average: what is the mean of evenly spaced numbers?",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q06",
      question:
        "Some numbers give a *different* answer when they are rounded in two stages (first to 2 decimal places, then that answer to 1 decimal place) than when they are rounded straight to 1 decimal place.\n\nHow many numbers between 0 and 1 with exactly three decimal places (like 0.207 or 0.915) behave like this?",
      answer: { type: "number", value: 50 },
      solution: [
        "Two-stage rounding can only go wrong by rounding *up* when it shouldn't: the first stage nudges the number up to exactly halfway, and the second stage then rounds that up.",
        "Write the number as 0.abc, where a, b and c are its digits. Rounding straight to 1 d.p. looks only at b, and rounds down when b is 4 or less.",
        "The two-stage method rounds up only if the first stage turns the 2nd digit into 5 or more. Starting from b ≤ 4, that happens only when b = 4 and c is 5 or more: 0.a4c → 0.a5 → rounds up.",
        "So the numbers that go wrong are 0.a45, 0.a46, 0.a47, 0.a48 and 0.a49: 5 numbers for each tenths digit a.",
        "a can be any of 0, 1, …, 9, so there are 5 × 10 = 50 such numbers. (For example 0.045 → 0.05 → 0.1, but straight to 1 d.p. it is 0.0.)",
      ],
      traps: [
        {
          spec: { type: "number", value: 5 },
          feedback: "5 is right for one tenths band (such as 0.345 to 0.349). How many tenths bands are there between 0 and 1?",
        },
        {
          spec: { type: "number", value: 10 },
          feedback: "There are 10 tenths bands, but more than one bad number in each: 0.345, 0.346, 0.347, 0.348 and 0.349 all go wrong.",
        },
      ],
      difficulty: "challenge",
      guideRef: "decimal-places",
      hints: [
        "Try 0.346 both ways. Then try 0.356 and 0.344.",
        "Rounding straight to 1 d.p. looks only at the 2nd decimal digit. When does the first stage of the two-stage method change that digit from 4 to 5?",
        "The bad numbers look like 0.?4? with a last digit of 5 or more. Count them.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "written",
      id: "decimals-rounding-ch-q07",
      question:
        "Always, sometimes or never true?\n\n*If you multiply a number with exactly 2 decimal places by a number with exactly 3 decimal places, the answer has exactly 5 decimal places.*\n\n(Exactly 2 decimal places means the 2nd decimal digit is not 0, like 0.47 or 3.25.) Prove your answer, and describe exactly when the statement is true.",
      marks: 4,
      modelAnswer:
        "Sometimes true.\n\nIt works for 0.13 × 0.007 = 0.00091 (13 × 7 = 91, and 2 + 3 = 5 decimal places). It fails for 0.25 × 0.004: 25 × 4 = 100, so the product is 0.00100 = 0.001, which has only 3 decimal places.\n\nWhy: write the numbers as {{P/100}} and {{Q/1000}}, where P and Q are whole numbers that don't end in 0. The product is {{(P * Q)/100000}}, which has exactly 5 decimal places unless P × Q ends in 0. A whole number ends in 0 when it has both 2 and 5 as factors. Neither P nor Q ends in 0, so neither can have both factors on its own. So P × Q ends in 0 exactly when one of them ends in 5 and the other ends in an even digit (2, 4, 6 or 8).\n\nConclusion: the answer has exactly 5 decimal places unless one number ends in 5 and the other ends in an even digit; then it has fewer. It can never have more than 5.",
      markScheme: [
        { point: "States 'sometimes true'", keywords: ["sometimes"] },
        {
          point: "A correct example with exactly 5 decimal places (e.g. 0.13 × 0.007 = 0.00091)",
          keywords: ["0.00091", "5 decimal places", "five decimal places", "example"],
        },
        {
          point: "A correct counterexample with fewer decimal places (e.g. 0.25 × 0.004 = 0.001)",
          keywords: ["0.001", "0.25", "counterexample", "fewer", "end zero", "trailing zero"],
        },
        {
          point: "Explains it fails exactly when the whole-number product ends in 0, i.e. one number ends in 5 and the other in an even digit",
          keywords: ["ends in 0", "ends in 5", "even", "2 and 5", "factor of 10", "multiple of 10"],
        },
      ],
      solutions: [
        {
          label: "Last-digit check (slicker)",
          steps: [
            "Ignore the points: the last digit of P × Q is the last digit of (last digit of P) × (last digit of Q).",
            "Run through the times tables for the digits 1 to 9: the only products that end in 0 are 5 × 2, 5 × 4, 5 × 6 and 5 × 8.",
            "So you lose a decimal place exactly when one number ends in 5 and the other ends in 2, 4, 6 or 8. Quicker than the prime-factor argument, and just as convincing.",
          ],
        },
      ],
      commonError: "Testing two or three examples that work and calling it 'always'.",
      difficulty: "challenge",
      guideRef: "multiplying-decimals",
      hints: [
        "Try some examples: 0.12 × 0.003, 0.25 × 0.004, 0.15 × 0.002.",
        "Ignore the points: when does the whole-number product end in 0?",
        "A whole number ends in 0 when it has factors 2 and 5. Where can those factors come from, if neither number ends in 0?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q08",
      question: "For how many whole numbers n from 1 to 100 is {{n/350}} equal to a terminating decimal?",
      answer: { type: "number", value: 14 },
      solution: [
        "350 = 2 × 5 × 5 × 7.",
        "A fraction in its simplest form terminates exactly when its denominator has no prime factors other than 2 and 5.",
        "So the 7 must cancel, which happens exactly when n is a multiple of 7. For example {{7/350 = 1/50}} = 0.02 and {{98/350 = 7/25}} = 0.28.",
        "If n is not a multiple of 7, the 7 stays in the denominator after simplifying, so the decimal recurs.",
        "Multiples of 7 from 1 to 100: 7, 14, …, 98. That's 14 of them.",
      ],
      traps: [
        { spec: { type: "number", value: 0 }, feedback: "350 has a factor of 7, but the 7 can cancel. Try {{7/350}}." },
        { spec: { type: "number", value: 86 }, feedback: "That's how many give *recurring* decimals. The question asks about the terminating ones." },
      ],
      difficulty: "challenge",
      guideRef: "recurring-decimals",
      hints: [
        "Write 350 as a product of prime factors.",
        "Which prime factor would make the decimal recur? How could it disappear?",
        "The 7 cancels only if n is a multiple of 7. How many multiples of 7 are there up to 100?",
      ],
      strategy: "Use prime factors",
    },
    {
      kind: "short",
      id: "decimals-rounding-ch-q09",
      question:
        "When {{0.5^20}} is written as an ordinary decimal, how many zeros are there between the decimal point and the first non-zero digit?",
      answer: { type: "number", value: 6 },
      solution: [
        "{{0.5^20 = 1/(2^20)}}, because 0.5 is a half.",
        "{{2^10}} = 1024, which is just over 1000. So {{2^20 = 1024 * 1024}} is just over 1,000,000. (It is 1,048,576.)",
        "So {{0.5^20}} is just *under* {{1/1000000}} = 0.000001.",
        "A number a little less than 0.000001 looks like 0.00000095…: its first non-zero digit is in the 7th decimal place.",
        "So there are 6 zeros between the point and the first non-zero digit.",
      ],
      solutions: [
        {
          label: "Powers of 5",
          steps: [
            "{{0.5 = 5/10}}, so {{0.5^20 = 5^20/10^20}}.",
            "{{5^20}} = 95,367,431,640,625, which has 14 digits.",
            "Dividing by {{10^20}} moves the point 20 places left, so the 14 digits fill the last 14 of the 20 decimal places, leaving 20 − 14 = 6 zeros in front.",
            "Correct, but the estimate {{2^10}} ≈ 1000 is slicker: no huge numbers needed.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 5 },
          feedback: "0.000001 has 5 zeros — but {{0.5^20}} is a little *smaller* than 0.000001, so its first non-zero digit is one place further right.",
        },
        { spec: { type: "number", value: 20 }, feedback: "20 is the power, not the number of zeros. Estimate the size of {{2^20}} first." },
      ],
      difficulty: "challenge",
      guideRef: "estimation",
      hints: [
        "Write {{0.5^20}} as 1 divided by a power of 2.",
        "{{2^10}} = 1024. Roughly how big is {{2^20}}?",
        "If {{2^20}} is a bit more than a million, then {{0.5^20}} is a bit less than what? Write that as a decimal.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "written",
      id: "decimals-rounding-ch-q10",
      question:
        "x = 8 and y = 2, both correct to the nearest whole number. Mei says:\n\n*The upper bound of x ÷ y is 8.5 ÷ 2.5 = 3.4.*\n\nExplain the flaw in Mei's reasoning, and find the correct upper bound of x ÷ y, as a fraction or correct to 2 decimal places.",
      marks: 3,
      modelAnswer:
        "The bounds are {{7.5 <= x < 8.5}} and {{1.5 <= y < 2.5}}. To make a division as big as possible, you want the biggest number on top but the *smallest* number underneath, because dividing by a smaller number gives a bigger answer. Mei used the upper bound of y, which makes the answer smaller, not bigger. Her answer can't be an upper bound anyway: 8 ÷ 2 = 4 is already bigger than 3.4. The correct upper bound is 8.5 ÷ 1.5 = {{17/3}} = 5.6̇, which is 5.67 to 2 decimal places.",
      markScheme: [
        {
          point: "Explains that dividing by a smaller number gives a bigger answer, so the upper bound uses the lower bound of y",
          keywords: ["smaller", "smallest", "lower bound of y", "1.5", "divide by a smaller", "least"],
        },
        {
          point: "Shows Mei's 3.4 cannot be an upper bound (e.g. 8 ÷ 2 = 4 is already bigger) or that her choice makes the answer smaller",
          keywords: ["4", "8 ÷ 2", "8/2", "too small", "smaller answer"],
        },
        { point: "Correct upper bound 8.5 ÷ 1.5 = {{17/3}} ≈ 5.67", keywords: ["5.67", "17/3", "5.6", "5.666"] },
      ],
      solutions: [
        {
          label: "Find the whole range",
          steps: [
            "Largest x ÷ y: largest top, smallest bottom: 8.5 ÷ 1.5 = {{17/3}}.",
            "Smallest x ÷ y: smallest top, largest bottom: 7.5 ÷ 2.5 = 3.",
            "x can equal 7.5 but y can never reach 2.5, and x never reaches 8.5, so {{3 < x/y < 17/3}}. Mei's 3.4 sits near the *bottom* of this range.",
          ],
        },
      ],
      commonError: "Pairing upper bound with upper bound for every calculation. For subtraction and division, the second number needs its lower bound.",
      difficulty: "challenge",
      guideRef: "error-intervals",
      hints: [
        "Write the error intervals for x and y.",
        "Does dividing by a bigger number give a bigger or a smaller answer?",
        "Compare Mei's claim with 8 ÷ 2. Is her 'upper bound' even bigger than that?",
      ],
      strategy: "Spot the error",
    },
  ],
};
