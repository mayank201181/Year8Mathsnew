import type { TopicPractice } from "../../types.ts";

// ---------------------------------------------------------------------------
// Powers of 10 & Standard Form — practice: quick quiz, two practice papers and
// an AoPS / UKMT-style challenge set.
// ---------------------------------------------------------------------------

export const practice: TopicPractice = {
  // =========================================================================
  // QUIZ — quick check of the whole topic (4 mcq + 5 short + 1 written)
  // =========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "standard-form-quiz-q01",
      question: "Which of these always gives the same answer as **dividing by 0.1**?",
      options: ["Multiplying by 0.1", "Dividing by 10", "Multiplying by 10", "Dividing by 100"],
      answerIndex: 2,
      explanation:
        "0.1 is one tenth, and every 1 contains 10 tenths. So dividing by 0.1 asks *how many tenths fit in*, which is 10 times the number: 6 ÷ 0.1 = 60 = 6 × 10. 'Dividing by 10' is what **multiplying** by 0.1 does (6 × 0.1 = 0.6), so it goes the wrong way. 'Dividing by 100' matches multiplying by 0.01, not dividing by 0.1.",
      difficulty: "warmup",
      guideRef: "multiplying-dividing-by-powers-of-ten",
      hints: ["How many tenths fit into 1? So how many tenths fit into 6?"],
      strategy: "Rewrite the operation",
    },
    {
      kind: "short",
      id: "standard-form-quiz-q02",
      question: "Write {{10^(-3)}} as a decimal.",
      answer: { type: "number", value: 0.001, allowFraction: false },
      traps: [
        {
          spec: { type: "number", value: -1000 },
          feedback:
            "A negative power does not make a negative number. {{10^(-3)}} means 1 divided by {{10^3}} — small, but positive.",
        },
        {
          spec: { type: "number", value: 0.0001 },
          feedback: "One zero too many. {{10^(-3)}} is one thousandth, so the 1 sits in the **third** decimal place.",
        },
      ],
      solution: [
        "A negative power means divide: {{10^(-3) = 1/10^3 = 1/1000}}.",
        "One thousandth as a decimal is 0.001 — the 1 is in the third decimal place.",
      ],
      commonError: "Writing −1000. The minus sign in the power means 'divide by', not 'negative'.",
      difficulty: "warmup",
      guideRef: "powers-of-ten",
      hints: ["Continue the pattern: {{10^1}} = 10, {{10^0}} = 1, {{10^(-1)}} = 0.1, … Each step divides by 10."],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "standard-form-quiz-q03",
      question: "Write 6 400 000 in standard form.",
      answer: { type: "number", value: 6400000, standardForm: true, display: "{{6.4 * 10^6}}" },
      traps: [
        {
          spec: { type: "number", value: 640000, standardForm: true },
          feedback:
            "Convert back to check: {{6.4 * 10^5}} = 640 000, ten times too small. 6 400 000 has 7 digits, so 6 digits come after the 6.",
        },
      ],
      solution: [
        "A must be between 1 and 10: put the point just after the first digit, so A = 6.4.",
        "6 400 000 has 7 digits, so 6 digits come after the 6: n = 6.",
        "6 400 000 = {{6.4 * 10^6}}. Check: 6.4 × 1 000 000 = 6 400 000 ✓",
      ],
      commonError: "Counting only the zeros (there are 5) and writing {{6.4 * 10^5}}. The 4 has to move past the point too.",
      difficulty: "warmup",
      guideRef: "large-numbers",
      hints: [
        "Find A first by putting the decimal point just after the first digit.",
        "How many places must the point move from the end of 6 400 000 to sit just after the 6?",
      ],
      strategy: "Count the places",
    },
    {
      kind: "mcq",
      id: "standard-form-quiz-q04",
      question: "Which of these is 0.000 37 written in standard form?",
      options: ["{{3.7 * 10^(-4)}}", "{{3.7 * 10^(-3)}}", "{{37 * 10^(-5)}}", "{{3.7 * 10^4}}"],
      answerIndex: 0,
      explanation:
        "To get from 0.000 37 to 3.7 the point moves 4 places right, so the power is −4. {{3.7 * 10^(-3)}} = 0.0037 comes from counting only the three zeros after the point. {{37 * 10^(-5)}} has the right value, but 37 is not between 1 and 10, so it is not standard form. {{3.7 * 10^4}} = 37 000 is a large number — numbers below 1 need a negative power.",
      difficulty: "core",
      guideRef: "small-numbers",
      hints: [
        "Where must the decimal point go so that A is between 1 and 10?",
        "Count how many places the point moves to get from 0.000 37 to 3.7.",
        "Moving the point to the right to make A means the power is negative.",
      ],
      strategy: "Count the places",
    },
    {
      kind: "mcq",
      id: "standard-form-quiz-q05",
      question: "Which of these numbers is the largest?",
      options: ["{{9.9 * 10^5}}", "{{2 * 10^(-7)}}", "{{98 * 10^4}}", "{{1.1 * 10^6}}"],
      answerIndex: 3,
      explanation:
        "{{1.1 * 10^6}} = 1 100 000 is the only number over a million. {{9.9 * 10^5}} = 990 000 is tempting because 9.9 is the biggest A — but compare the powers first. {{98 * 10^4}} = 980 000 is not in standard form (98 is bigger than 10); rewritten it is {{9.8 * 10^5}}. {{2 * 10^(-7)}} is tiny: a negative power means it is less than 1.",
      difficulty: "core",
      guideRef: "comparing-standard-form",
      hints: [
        "Compare the powers first — but only once every number is properly in standard form.",
        "Rewrite {{98 * 10^4}} in standard form. Which power is now the highest?",
      ],
      strategy: "Compare powers first",
    },
    {
      kind: "short",
      id: "standard-form-quiz-q06",
      question: "A dust mite is about {{2.5 * 10^(-4)}} m long. Write this length as an ordinary number in metres.",
      answer: { type: "number", value: 0.00025, allowFraction: false, display: "0.000 25 m" },
      traps: [
        {
          spec: { type: "number", value: 0.0025 },
          feedback: "That is {{2.5 * 10^(-3)}}. Dividing by {{10^4}} moves the digits **4** places right, not 3.",
        },
        {
          spec: { type: "number", value: 0.000025 },
          feedback: "One place too far: that is {{2.5 * 10^(-5)}}. Move the digits of 2.5 exactly 4 places right.",
        },
      ],
      solution: [
        "{{10^(-4)}} means divide by {{10^4}} = 10 000.",
        "Move the digits of 2.5 four places right: 0.25, 0.025, 0.0025, 0.000 25.",
        "The dust mite is 0.000 25 m long — a quarter of a millimetre.",
      ],
      commonError: "Writing four zeros after the point. The 2 lands in the 4th decimal place, so only three zeros come after the point.",
      difficulty: "core",
      guideRef: "small-numbers",
      hints: [
        "Will the answer be bigger or smaller than 2.5?",
        "{{10^(-4)}} means ÷ 10 000. How many places do the digits move?",
        "Move the digits of 2.5 one place at a time, four times, to the right.",
      ],
      strategy: "Count the places",
    },
    {
      kind: "mcq",
      id: "standard-form-quiz-q07",
      question: "Hana's calculator shows the answer below. Which ordinary number is it?",
      diagram: `<svg viewBox="0 0 200 64" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A calculator screen showing 4.7E-06"><rect x="0" y="0" width="200" height="64" fill="#ffffff"/><rect x="6" y="6" width="188" height="52" rx="8" fill="#334155"/><rect x="16" y="14" width="168" height="36" rx="4" fill="#bbf7d0" stroke="#1f2937"/><text x="174" y="37" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="end">4.7E-06</text></svg>`,
      options: ["0.000 047", "0.000 004 7", "−4 700 000", "−1.3"],
      answerIndex: 1,
      explanation:
        "`E-06` means × {{10^(-6)}}, so the digits of 4.7 move 6 places right: 0.000 004 7 (the 4 is in the 6th decimal place). 0.000 047 only moves them 5 places. −4 700 000 treats the negative power as a negative number. −1.3 reads the E as 'take away': 4.7 − 6.",
      difficulty: "core",
      guideRef: "comparing-standard-form",
      hints: [
        "What does the `E` on a calculator stand for?",
        "`4.7E-06` means {{4.7 * 10^(-6)}}. Is that bigger or smaller than 1?",
        "Move the digits of 4.7 six places to the right.",
      ],
      strategy: "Read the display carefully",
    },
    {
      kind: "short",
      id: "standard-form-quiz-q08",
      question: "Write {{7.05 * 10^6}} as an ordinary number.",
      answer: { type: "number", value: 7050000, display: "7 050 000" },
      traps: [
        {
          spec: { type: "number", value: 705000000 },
          feedback:
            "You wrote 705 and then six zeros. The digits move 6 places left — and the 0 and 5 after the point use up two of those places, so only four zeros are added.",
        },
        {
          spec: { type: "number", value: 7500000 },
          feedback: "The 0 in 7.05 is a place holder and must stay: 7 050 000.",
        },
      ],
      solution: [
        "{{10^6}} = 1 000 000, so work out 7.05 × 1 000 000.",
        "Move the digits of 7.05 six places left: 70.5, 705, 7050, 70 500, 705 000, 7 050 000.",
        "{{7.05 * 10^6}} = 7 050 000.",
      ],
      commonError: "Writing the digits 705 followed by six zeros — that is {{7.05 * 10^8}}.",
      difficulty: "core",
      guideRef: "large-numbers",
      hints: [
        "Is the answer more or less than a million?",
        "{{10^6}} moves the digits 6 places left. Do it one place at a time.",
        "After one move you have 70.5, after two you have 705 … keep going.",
      ],
      strategy: "Count the places",
    },
    {
      kind: "written",
      id: "standard-form-quiz-q09",
      question:
        "Arjun says: '{{3 * 10^(-5)}} is bigger than {{3 * 10^(-4)}}, because 5 is bigger than 4.'\n\nIs Arjun right? Explain your answer.",
      marks: 3,
      modelAnswer:
        "Arjun is wrong: {{3 * 10^(-4)}} is the bigger number. The powers are −5 and −4, and −5 is *smaller* than −4 (it is further below zero on a number line). A more negative power means dividing by 10 more times, so the number is smaller. As ordinary numbers, {{3 * 10^(-5)}} = 0.000 03 and {{3 * 10^(-4)}} = 0.0003, so {{3 * 10^(-4)}} is 10 times bigger.",
      markScheme: [
        {
          point: "States Arjun is wrong: {{3 * 10^(-4)}} is bigger",
          keywords: ["wrong", "no", "incorrect", "not right", "10^-4 is bigger"],
        },
        {
          point: "Explains −5 is less than −4 (a more negative power means more divisions by 10, so a smaller number)",
          keywords: ["-5", "−5", "negative", "less than", "smaller", "divide"],
        },
        {
          point: "Supports with ordinary numbers 0.000 03 and 0.0003, or says it is 10 times bigger",
          keywords: ["0.00003", "0.000 03", "0.0003", "10 times", "ten times"],
        },
      ],
      commonError: "Treating −5 as bigger than −4 because 5 > 4.",
      difficulty: "core",
      guideRef: "comparing-standard-form",
      hints: [
        "Write both numbers as ordinary decimals.",
        "Which is bigger: −5 or −4? Picture a number line.",
        "{{10^(-5)}} means divide by 10 five times; {{10^(-4)}} means divide by 10 four times.",
      ],
      strategy: "Check by converting back",
    },
    {
      kind: "short",
      id: "standard-form-quiz-q10",
      question: "How many times bigger is {{6 * 10^5}} than {{2 * 10^(-3)}}? Give your answer in standard form.",
      answer: { type: "number", value: 300000000, standardForm: true, display: "{{3 * 10^8}}" },
      traps: [
        {
          spec: { type: "number", value: 300, standardForm: true },
          feedback: "You worked out 5 − 3. The second power is **−3**, so you subtract a negative: 5 − (−3) = 8.",
        },
      ],
      solution: [
        "'How many times bigger' means divide: {{(6 * 10^5) ÷ (2 * 10^(-3))}}.",
        "Divide the numbers: 6 ÷ 2 = 3.",
        "Subtract the powers: 5 − (−3) = 8.",
        "Answer: {{3 * 10^8}}. Check: 600 000 ÷ 0.002 = 300 000 000 ✓",
      ],
      commonError: "Subtracting the powers as 5 − 3 = 2 and losing the minus sign.",
      difficulty: "challenge",
      guideRef: "calculating-standard-form",
      hints: [
        "Which operation answers 'how many times bigger'?",
        "Divide the numbers and the powers of 10 separately.",
        "Careful: 5 − (−3) is not 2.",
      ],
      strategy: "Group the numbers and the powers",
    },
  ],

  // =========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each, easy → hard
  // =========================================================================
  papers: [
    {
      id: "standard-form-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "standard-form-p1-q01",
          question: "Work out 4.73 × 100.",
          answer: { type: "number", value: 473 },
          traps: [
            {
              spec: { type: "number", value: 4.73 },
              feedback: "Putting zeros on the end of a decimal (4.7300) doesn't change its value. × 100 moves every digit 2 places **left**.",
            },
            {
              spec: { type: "number", value: 47.3 },
              feedback: "That is × 10. × 100 moves the digits **two** places left.",
            },
          ],
          solution: ["× 100 moves every digit 2 places left.", "4.73 → 47.3 → 473."],
          commonError: "'Adding two zeros' to get 4.7300, which is still 4.73.",
          difficulty: "warmup",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: ["Will the answer be bigger or smaller than 4.73? Roughly how big?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "standard-form-p1-q02",
          question: "Work out 52 × 0.1.",
          answer: { type: "number", value: 5.2 },
          traps: [
            {
              spec: { type: "number", value: 520 },
              feedback: "× 0.1 takes one tenth of the number, so the answer must be smaller: × 0.1 is the same as ÷ 10.",
            },
            {
              spec: { type: "number", value: 0.52 },
              feedback: "That is ÷ 100. × 0.1 is the same as ÷ 10 — the digits move one place right.",
            },
          ],
          solution: ["0.1 = {{1/10}}, so × 0.1 means 'find one tenth of': the same as ÷ 10.", "52 ÷ 10 = 5.2."],
          difficulty: "warmup",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: ["0.1 is one tenth. What is one tenth of 52?"],
          strategy: "Rewrite the operation",
        },
        {
          kind: "short",
          id: "standard-form-p1-q03",
          question: "0.001 = {{10^n}}. What is the value of n?",
          answer: { type: "number", value: -3 },
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback: "0.001 is less than 1, so the power must be negative.",
            },
            {
              spec: { type: "number", value: -2 },
              feedback: "Count the decimal places: the 1 in 0.001 is in the **third** decimal place, so 0.001 is one thousandth.",
            },
          ],
          solution: [
            "0.001 = {{1/1000}}, and 1000 = {{10^3}}.",
            "Dividing by {{10^3}} is the same as multiplying by {{10^(-3)}}, so n = −3.",
          ],
          difficulty: "warmup",
          guideRef: "powers-of-ten",
          hints: ["Is 0.001 bigger or smaller than 1? What does that tell you about the sign of n?"],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "standard-form-p1-q04",
          question: "Write 83 000 in standard form.",
          answer: { type: "number", value: 83000, standardForm: true, display: "{{8.3 * 10^4}}" },
          traps: [
            {
              spec: { type: "number", value: 8300, standardForm: true },
              feedback: "Counting the zeros gives 3, but the 3 of 83 also has to move behind the point. 83 000 = 8.3 × 10 000.",
            },
          ],
          solution: [
            "A = 8.3 (point just after the first digit).",
            "83 000 has 5 digits, so 4 come after the 8: n = 4.",
            "83 000 = {{8.3 * 10^4}}. Check: 8.3 × 10 000 = 83 000 ✓",
          ],
          difficulty: "warmup",
          guideRef: "large-numbers",
          hints: ["Put the point just after the first digit to find A. How far did it move?"],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p1-q05",
          question: "Write 0.006 in standard form.",
          answer: { type: "number", value: 0.006, standardForm: true, display: "{{6 * 10^(-3)}}" },
          traps: [
            {
              spec: { type: "number", value: 0.06, standardForm: true },
              feedback: "You counted the two zeros after the point. The point has to move **3** places right to get from 0.006 to 6.",
            },
            {
              spec: { type: "number", value: 6000, standardForm: true },
              feedback: "0.006 is less than 1, so the power must be negative.",
            },
          ],
          solution: [
            "The first non-zero digit is 6, so A = 6.",
            "From 0.006 to 6 the point moves 3 places right, so n = −3.",
            "0.006 = {{6 * 10^(-3)}}. Check: 6 ÷ 1000 = 0.006 ✓",
          ],
          difficulty: "warmup",
          guideRef: "small-numbers",
          hints: ["Will the power be positive or negative? Then count how far the point moves to make A = 6."],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p1-q06",
          question: "Work out 0.38 ÷ 0.01.",
          answer: { type: "number", value: 38 },
          traps: [
            {
              spec: { type: "number", value: 0.0038 },
              feedback: "Dividing a positive number by 0.01 makes it **bigger**: it asks how many hundredths fit in. ÷ 0.01 = × 100.",
            },
            {
              spec: { type: "number", value: 3.8 },
              feedback: "Only one place. ÷ 0.01 is the same as × 100 — the digits move two places left.",
            },
          ],
          solution: [
            "0.01 is one hundredth, so 0.38 ÷ 0.01 asks how many hundredths fit into 0.38.",
            "Every 1 contains 100 hundredths, so ÷ 0.01 is the same as × 100.",
            "0.38 × 100 = 38. Check: 38 hundredths = 0.38 ✓",
          ],
          commonError: "Moving the digits right because 'dividing makes smaller'. Dividing by a number between 0 and 1 makes a positive number bigger.",
          difficulty: "core",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: [
            "How many hundredths are there in 0.38?",
            "Dividing by 0.01 is the same as multiplying by which number?",
          ],
          strategy: "Rewrite the operation",
        },
        {
          kind: "written",
          id: "standard-form-p1-q07",
          question:
            "Zara says: 'To multiply by 10 you just add a zero, so 2.5 × 10 = 2.50.'\n\n(a) Explain what is wrong with Zara's method and give the correct answer.\n(b) Explain why 2.5 ÷ 0.1 gives the same answer as 2.5 × 10.",
          marks: 3,
          modelAnswer:
            "(a) Adding a zero to the end of a decimal does not change its value: 2.50 is still 2.5. Multiplying by 10 makes every digit worth 10 times more, so every digit moves one place left: the 2 ones become 2 tens and the 5 tenths become 5 ones. So 2.5 × 10 = 25.\n\n(b) 0.1 is one tenth, so 2.5 ÷ 0.1 asks how many tenths fit into 2.5. Every 1 contains 10 tenths, so 2.5 contains 2.5 × 10 = 25 tenths. Dividing by 0.1 is the same as multiplying by 10, and both give 25.",
          markScheme: [
            {
              point: "Explains that 2.50 = 2.5 (a zero on the end of a decimal changes nothing)",
              keywords: ["same", "still 2.5", "does not change", "doesn't change", "no change", "equal"],
            },
            {
              point: "Correct answer 25, with the digits moving one place left",
              keywords: ["25", "one place", "left", "digits move", "place value"],
            },
            {
              point: "Explains ÷ 0.1 = × 10 because there are 10 tenths in every 1",
              keywords: ["10 tenths", "tenths", "how many", "× 10", "x 10", "times 10"],
            },
          ],
          commonError: "Just saying 'Zara is wrong' without showing what really happens to the digits.",
          difficulty: "core",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: [
            "Is 2.50 actually a different number from 2.5?",
            "When you multiply by 10, what happens to the value of each digit?",
            "For (b): how many tenths are there in 1? So how many in 2.5?",
          ],
          strategy: "Rewrite the operation",
        },
        {
          kind: "short",
          id: "standard-form-p1-q08",
          question: "Work out {{10^4 * 10^(-6)}}. Give your answer as a decimal.",
          answer: { type: "number", value: 0.01, allowFraction: false },
          traps: [
            {
              spec: { type: "number", value: 10000000000 },
              feedback: "Adding 4 and 6 ignores the minus sign. The indices are 4 and −6: 4 + (−6) = −2.",
            },
            {
              spec: { type: "number", value: -2 },
              feedback: "−2 is the index. The question wants the value of {{10^(-2)}} as a decimal.",
            },
          ],
          solution: [
            "Multiplying powers of 10: add the indices. 4 + (−6) = −2.",
            "{{10^(-2) = 1/100}} = 0.01.",
            "Check: 10 000 × 0.000 001 = 0.01 ✓",
          ],
          difficulty: "core",
          guideRef: "powers-of-ten",
          hints: [
            "When you multiply powers of 10, what do you do with the indices?",
            "Work out 4 + (−6).",
            "Write {{10^(-2)}} as a fraction, then as a decimal.",
          ],
          strategy: "Use the index laws",
        },
        {
          kind: "short",
          id: "standard-form-p1-q09",
          question: "Singapore's population in 2024 was about 6 040 000. Write this number in standard form.",
          answer: { type: "number", value: 6040000, standardForm: true, display: "{{6.04 * 10^6}}" },
          traps: [
            {
              spec: { type: "number", value: 6400000, standardForm: true },
              feedback: "The 0 between the 6 and the 4 is a place holder. Dropping it turns the number into 6 400 000.",
            },
            {
              spec: { type: "number", value: 604000, standardForm: true },
              feedback: "6 040 000 has 7 digits, so 6 digits come after the first one: the power is 6.",
            },
          ],
          solution: [
            "A = 6.04 — keep the zero between the 6 and the 4.",
            "6 040 000 has 7 digits, so n = 6.",
            "6 040 000 = {{6.04 * 10^6}}. Check: 6.04 × 1 000 000 = 6 040 000 ✓",
          ],
          commonError: "Writing A = 6.4 and losing the place-holder zero.",
          difficulty: "core",
          guideRef: "large-numbers",
          hints: [
            "Put the decimal point after the first digit. Which digits must A keep?",
            "How many digits come after the first digit?",
          ],
          strategy: "Check by converting back",
        },
        {
          kind: "short",
          id: "standard-form-p1-q10",
          question: "The number {{34 * 10^5}} is not in standard form. Write it correctly in standard form.",
          answer: { type: "number", value: 3400000, standardForm: true, display: "{{3.4 * 10^6}}" },
          traps: [
            {
              spec: { type: "number", value: 340000, standardForm: true },
              feedback: "34 = 3.4 × 10, so an extra 10 has to go into the power: the power goes **up** by 1.",
            },
            {
              spec: { type: "number", value: 34000, standardForm: true },
              feedback: "Making A smaller (34 → 3.4) must be balanced by making the power **bigger**, not smaller.",
            },
          ],
          solution: [
            "34 is not between 1 and 10. Write 34 = {{3.4 * 10^1}}.",
            "So {{34 * 10^5 = 3.4 * 10^1 * 10^5 = 3.4 * 10^6}}.",
            "Check: {{34 * 10^5}} = 3 400 000 = {{3.4 * 10^6}} ✓",
          ],
          commonError: "Dividing A by 10 without multiplying the power of 10 by 10 to balance it.",
          difficulty: "core",
          guideRef: "large-numbers",
          hints: [
            "Why is {{34 * 10^5}} not in standard form?",
            "Write 34 itself in standard form.",
            "Multiply the two powers of 10 by adding their indices.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "standard-form-p1-q11",
          question: "A human hair is about 0.08 mm wide. Write this width **in metres**, in standard form. (1 m = 1000 mm.)",
          answer: { type: "number", value: 0.00008, standardForm: true, display: "{{8 * 10^(-5)}} m" },
          traps: [
            {
              spec: { type: "number", value: 0.08, standardForm: true },
              feedback: "That is the width in **millimetres**. Divide by 1000 to change mm into m first.",
            },
            {
              spec: { type: "number", value: 0.0008, standardForm: true },
              feedback: "Check the conversion: 0.08 ÷ 1000 = 0.000 08, which has the 8 in the **fifth** decimal place.",
            },
          ],
          solution: [
            "Convert to metres: 0.08 mm ÷ 1000 = 0.000 08 m.",
            "A = 8. From 0.000 08 to 8 the point moves 5 places right, so n = −5.",
            "The hair is {{8 * 10^(-5)}} m wide.",
          ],
          solutions: [
            {
              label: "Stay in standard form (quicker)",
              steps: [
                "0.08 = {{8 * 10^(-2)}}, and ÷ 1000 is × {{10^(-3)}}.",
                "{{8 * 10^(-2) * 10^(-3) = 8 * 10^(-5)}}. No long string of zeros to count.",
              ],
            },
          ],
          commonError: "Forgetting to convert millimetres to metres.",
          difficulty: "core",
          guideRef: "small-numbers",
          hints: [
            "First change millimetres into metres. Multiply or divide — and by what?",
            "0.08 ÷ 1000: move the digits three places right.",
            "Now count how many places the point must move to make A = 8.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "standard-form-p1-q12",
          question: "Write {{9.02 * 10^(-4)}} as an ordinary number.",
          answer: { type: "number", value: 0.000902, allowFraction: false, display: "0.000 902" },
          traps: [
            {
              spec: { type: "number", value: 0.00092 },
              feedback: "The 0 between the 9 and the 2 is a place holder — keep it: 0.000 902.",
            },
            {
              spec: { type: "number", value: 0.0000902 },
              feedback: "That moves the digits 5 places. {{10^(-4)}} means ÷ 10 000 — exactly 4 places right.",
            },
          ],
          solution: [
            "{{10^(-4)}} means ÷ 10 000: move the digits 4 places right.",
            "9.02 → 0.902 → 0.0902 → 0.009 02 → 0.000 902.",
            "So {{9.02 * 10^(-4)}} = 0.000 902.",
          ],
          difficulty: "core",
          guideRef: "small-numbers",
          hints: [
            "Will the answer be bigger or smaller than 1?",
            "Move the digits of 9.02 four places to the right, one place at a time.",
            "The 9 should end up in the fourth decimal place.",
          ],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p1-q13",
          question:
            "Four tiny things are measured in metres:\n\n| Label | Size (m) |\n|---|---|\n| A | {{4.5 * 10^(-3)}} |\n| B | {{8 * 10^(-4)}} |\n| C | {{1.2 * 10^(-3)}} |\n| D | {{9.9 * 10^(-5)}} |\n\nWrite the letters in order of size, **smallest first** (type them like this: ABCD).",
          answer: { type: "text", accept: ["DBCA", "D,B,C,A", "D<B<C<A", "D B C A"], display: "D, B, C, A" },
          traps: [
            {
              spec: { type: "text", accept: ["CABD"] },
              feedback:
                "You sorted by the A parts (or treated −5 as the biggest power). Compare the powers first: −5 < −4 < −3, so D (power −5) is the smallest.",
            },
            {
              spec: { type: "text", accept: ["ACBD"] },
              feedback: "That is largest first — the question asks for smallest first.",
            },
          ],
          solution: [
            "Compare the powers first: −5 < −4 < −3.",
            "So D ({{10^(-5)}}) is smallest, then B ({{10^(-4)}}), then the two {{10^(-3)}} numbers.",
            "Same power: compare A. 1.2 < 4.5, so C comes before A.",
            "Order: D, B, C, A. Check: 0.000 099 < 0.0008 < 0.0012 < 0.0045 ✓",
          ],
          commonError: "Ordering by the A parts (1.2, 4.5, 8, 9.9) and ignoring the powers.",
          difficulty: "core",
          guideRef: "comparing-standard-form",
          hints: [
            "Which power of 10 is the smallest: {{10^(-3)}}, {{10^(-4)}} or {{10^(-5)}}?",
            "Group the numbers by power, then compare A only within a group.",
            "−5 is less than −3, so a power of −5 means a smaller number.",
          ],
          strategy: "Compare powers first",
        },
        {
          kind: "short",
          id: "standard-form-p1-q14",
          question:
            "Mei uses her calculator to work out {{2^40}}. The screen shows `1.099511628E12`. Write this number in standard form, correct to 2 significant figures.",
          answer: { type: "number", value: 1100000000000, standardForm: true, display: "{{1.1 * 10^12}}" },
          traps: [
            {
              spec: { type: "number", value: 1000000000000, standardForm: true },
              feedback: "Round, don't chop: 1.099… to 2 significant figures is 1.1, because the next digit (9) is 5 or more.",
            },
          ],
          solution: [
            "`E12` means × {{10^12}}, so the screen shows {{1.099511628 * 10^12}}.",
            "Round A to 2 significant figures: 1.0|99… — the next digit is 9, so round up to 1.1.",
            "Answer: {{1.1 * 10^12}}.",
          ],
          commonError: "Truncating to 1.0 instead of rounding up to 1.1.",
          difficulty: "core",
          guideRef: "comparing-standard-form",
          hints: [
            "What does `E12` stand for?",
            "Only A needs rounding — the power of 10 stays the same.",
            "Look at the third significant figure of 1.099… to decide whether to round up.",
          ],
          strategy: "Read the display carefully",
        },
        {
          kind: "written",
          id: "standard-form-p1-q15",
          question:
            "Without writing it out in full, how many digits does the whole number {{4.07 * 10^8}} have? Explain how you know.",
          marks: 3,
          modelAnswer:
            "It has 9 digits. {{10^8}} = 100 000 000 is 1 followed by 8 zeros, which is 9 digits. Because A = 4.07 is at least 1 and less than 10, the number is at least {{10^8}} and less than {{10^9}} = 1 000 000 000, the smallest 10-digit number. So it has exactly 9 digits: the 4 is in the hundred-millions column. (In full it is 407 000 000.)",
          markScheme: [
            { point: "Correct answer: 9 digits", keywords: ["9", "nine"] },
            {
              point: "{{10^8}} is 1 followed by 8 zeros (9 digits), or the first digit is in the hundred-millions column",
              keywords: ["8 zeros", "eight zeros", "100 000 000", "100000000", "hundred million"],
            },
            {
              point: "Uses 1 ≤ A < 10, so the number lies between {{10^8}} and {{10^9}}",
              keywords: ["between", "less than 10", "10^9", "1 000 000 000", "1000000000", "billion"],
            },
          ],
          commonError: "Answering 8, the number of zeros in {{10^8}} — the leading digit counts too.",
          difficulty: "core",
          guideRef: "large-numbers",
          hints: [
            "How many digits does {{10^8}} itself have?",
            "A is between 1 and 10. So between which two powers of 10 does the number lie?",
            "What is the smallest number with 10 digits?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "standard-form-p1-q16",
          question: "Work out {{(6 * 10^4) * (5 * 10^3)}}. Give your answer in standard form.",
          answer: { type: "number", value: 300000000, standardForm: true, display: "{{3 * 10^8}}" },
          traps: [
            {
              spec: { type: "number", value: 30000000, standardForm: true },
              feedback: "30 = 3 × 10, so the power goes **up** by one: {{30 * 10^7 = 3 * 10^8}}.",
            },
            {
              spec: { type: "number", value: 3000000000000, standardForm: true },
              feedback: "Don't multiply the indices. {{10^4 * 10^3}} is seven 10s multiplied together: add the indices.",
            },
          ],
          solution: [
            "Multiply the numbers: 6 × 5 = 30.",
            "Add the powers: {{10^4 * 10^3 = 10^7}}.",
            "That gives {{30 * 10^7}}, which is not in standard form.",
            "Re-normalise: 30 = {{3 * 10^1}}, so the answer is {{3 * 10^8}}. Check: 60 000 × 5000 = 300 000 000 ✓",
          ],
          commonError: "Stopping at {{30 * 10^7}} — the answer must have A between 1 and 10.",
          difficulty: "core",
          guideRef: "calculating-standard-form",
          hints: [
            "Multiplication can be done in any order — group the numbers and the powers.",
            "6 × 5 = ? and {{10^4 * 10^3}} = ?",
            "Is your A between 1 and 10? If not, re-normalise.",
          ],
          strategy: "Group the numbers and the powers",
        },
        {
          kind: "short",
          id: "standard-form-p1-q17",
          question: "A sheet of paper is {{8 * 10^(-5)}} m thick. How many sheets are in a stack 0.6 m tall?",
          answer: { type: "number", value: 7500, display: "7500 sheets" },
          traps: [
            {
              spec: { type: "number", value: 750 },
              feedback: "Check: 750 × 0.000 08 = 0.06 m, only 6 cm. You need 10 times as many sheets.",
            },
            {
              spec: { type: "number", value: 75000 },
              feedback: "Check: 75 000 × 0.000 08 = 6 m — far too tall.",
            },
          ],
          solution: [
            "Number of sheets = height ÷ thickness = 0.6 ÷ {{(8 * 10^(-5))}}.",
            "Write 0.6 = {{6 * 10^(-1)}}.",
            "Divide the numbers: 6 ÷ 8 = 0.75. Subtract the powers: −1 − (−5) = 4.",
            "{{0.75 * 10^4}} = 7500 sheets. Check: 7500 × 0.000 08 = 0.6 ✓",
          ],
          solutions: [
            {
              label: "Ordinary numbers",
              steps: [
                "{{8 * 10^(-5)}} m = 0.000 08 m.",
                "0.6 ÷ 0.000 08: multiply both numbers by 100 000 to make the divisor whole: 60 000 ÷ 8 = 7500.",
                "Both routes work; the standard-form route is quicker because there are no long strings of zeros to count.",
              ],
            },
          ],
          commonError: "Subtracting the powers as −1 − 5 instead of −1 − (−5).",
          difficulty: "challenge",
          guideRef: "calculating-standard-form",
          hints: [
            "Which operation tells you how many thicknesses fit into the height?",
            "Write 0.6 in standard form too, then divide the numbers and subtract the powers.",
            "6 ÷ 8 = 0.75, and −1 − (−5) = 4.",
          ],
          strategy: "Group the numbers and the powers",
        },
        {
          kind: "written",
          id: "standard-form-p1-q18",
          question:
            "Ethan writes:\n\n    {{4 * 10^3 + 5 * 10^2 = 9 * 10^5}}\n\nExplain what Ethan has done wrong, and find the correct answer in standard form.",
          marks: 3,
          modelAnswer:
            "Ethan has added the A parts (4 + 5 = 9) and added the powers (3 + 2 = 5). Adding the powers is the rule for **multiplying** powers of 10, not for adding numbers. And the A parts can only be added when the powers are the same: here the 4 means 4 thousands but the 5 means 5 hundreds. Converting: 4000 + 500 = 4500 = {{4.5 * 10^3}}. A quick check shows Ethan must be wrong: {{9 * 10^5}} = 900 000, far bigger than 4000 + 500.",
          markScheme: [
            {
              point: "Adding the powers is wrong — that rule is for multiplying",
              keywords: ["multiply", "multiplying", "add the powers", "indices", "powers"],
            },
            {
              point: "The A parts cannot be added because the powers are different (4 thousands, 5 hundreds)",
              keywords: ["different", "thousands", "hundreds", "not the same", "same power"],
            },
            { point: "Correct answer 4500 = {{4.5 * 10^3}}", keywords: ["4500", "4 500", "4.5"] },
          ],
          commonError: "Spotting only one of the two mistakes.",
          difficulty: "challenge",
          guideRef: "calculating-standard-form",
          hints: [
            "Write both numbers as ordinary numbers. Roughly what should the answer be?",
            "When is 'add the powers' the right rule?",
            "4000 + 500 = ? Then write it in standard form.",
          ],
          strategy: "Check by converting back",
        },
        {
          kind: "short",
          id: "standard-form-p1-q19",
          question:
            "Two calculator screens show `1E-02` and `9.9E-03`. Find the difference between the two numbers (larger minus smaller). Give your answer in standard form.",
          answer: { type: "number", value: 0.0001, standardForm: true, display: "{{1 * 10^(-4)}}" },
          traps: [
            {
              spec: { type: "number", value: 0.001, standardForm: true },
              feedback: "Line the decimals up: 0.0100 − 0.0099. The difference is in the **fourth** decimal place.",
            },
            {
              spec: { type: "number", value: 0.0089, standardForm: true },
              feedback: "You subtracted the A parts (9.9 − 1), but the powers are different (−2 and −3). Convert to decimals first.",
            },
          ],
          solution: [
            "`1E-02` = {{1 * 10^(-2)}} = 0.01 and `9.9E-03` = {{9.9 * 10^(-3)}} = 0.0099.",
            "{{10^(-2)}} is the bigger power, so `1E-02` is the larger number — even though 1 < 9.9.",
            "Difference: 0.0100 − 0.0099 = 0.0001.",
            "0.0001 = {{1 * 10^(-4)}}.",
          ],
          solutions: [
            {
              label: "Match the powers first (slicker)",
              steps: [
                "Write {{1 * 10^(-2)}} as {{10 * 10^(-3)}}.",
                "Now the powers match: (10 − 9.9) × {{10^(-3)}} = {{0.1 * 10^(-3)}}.",
                "Re-normalise: {{0.1 * 10^(-3) = 1 * 10^(-4)}}. No long decimals needed.",
              ],
            },
          ],
          commonError: "Thinking `9.9E-03` is larger because 9.9 > 1.",
          difficulty: "challenge",
          guideRef: "comparing-standard-form",
          hints: [
            "Which number is larger? Compare the powers first.",
            "Write both as ordinary decimals with the same number of decimal places.",
            "0.0100 − 0.0099 = ?",
          ],
          strategy: "Compare powers first",
        },
        {
          kind: "written",
          id: "standard-form-p1-q20",
          question:
            "Always, sometimes or never true?\n\n> A positive number written in standard form with a **negative** power is less than 1.\n\nExplain your answer.",
          marks: 3,
          modelAnswer:
            "Always true. In standard form A is less than 10, and a negative power is at most −1, so the number is at most A × {{10^(-1)}}, which is A ÷ 10. Since A < 10, A ÷ 10 < 1. Even an extreme case like {{9.99 * 10^(-1)}} = 0.999 is still less than 1 — and making the power more negative only makes the number smaller.",
          markScheme: [
            { point: "States always (true)", keywords: ["always"] },
            {
              point: "Uses A < 10 (the largest A is just under 10)",
              keywords: ["less than 10", "< 10", "9.99", "9.9", "biggest a", "largest a"],
            },
            {
              point: "A negative power divides by at least 10, so the number is below 10 ÷ 10 = 1 (e.g. {{9.99 * 10^(-1)}} = 0.999)",
              keywords: ["divide by 10", "÷ 10", "10^-1", "0.999", "at least 10", "less than 1"],
            },
          ],
          commonError: "Testing a number that is not in standard form, such as {{25 * 10^(-1)}} = 2.5, and answering 'sometimes'. A must be less than 10.",
          difficulty: "challenge",
          guideRef: "small-numbers",
          hints: [
            "Try some examples. Can you make one that is 1 or more?",
            "Consider extremes: what is the biggest possible A, and the biggest possible negative power?",
            "{{10^(-1)}} means ÷ 10. What is (just under 10) ÷ 10?",
          ],
          strategy: "Consider extremes",
        },
      ],
    },
    {
      id: "standard-form-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "standard-form-p2-q01",
          question: "Work out 260 ÷ 100.",
          answer: { type: "number", value: 2.6 },
          traps: [
            {
              spec: { type: "number", value: 26000 },
              feedback: "÷ 100 makes the number smaller: move the digits 2 places **right**.",
            },
            {
              spec: { type: "number", value: 26 },
              feedback: "That is ÷ 10. ÷ 100 moves the digits **two** places right.",
            },
          ],
          solution: ["÷ 100 moves every digit 2 places right.", "260 → 26 → 2.6."],
          difficulty: "warmup",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: ["Will the answer be bigger or smaller than 260? How many places do the digits move?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "standard-form-p2-q02",
          question: "Work out 8.4 × 0.01.",
          answer: { type: "number", value: 0.084 },
          traps: [
            {
              spec: { type: "number", value: 840 },
              feedback: "× 0.01 means one hundredth of the number, so the answer is smaller: × 0.01 = ÷ 100.",
            },
            {
              spec: { type: "number", value: 0.84 },
              feedback: "That is × 0.1 (÷ 10). × 0.01 is ÷ 100 — two places right.",
            },
          ],
          solution: ["0.01 = {{1/100}}, so × 0.01 is the same as ÷ 100.", "8.4 → 0.84 → 0.084."],
          difficulty: "warmup",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: ["0.01 is one hundredth. What is one hundredth of 8.4?"],
          strategy: "Rewrite the operation",
        },
        {
          kind: "short",
          id: "standard-form-p2-q03",
          question: "Write {{10^(-4)}} as a fraction.",
          answer: { type: "fraction", n: 1, d: 10000, display: "{{1/10000}}" },
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 1000 },
              feedback: "Count the tens: {{10^4}} = 10 × 10 × 10 × 10 = 10 000, so {{10^(-4) = 1/10000}}.",
            },
            {
              spec: { type: "number", value: -10000 },
              feedback: "A negative power means 'one divided by', not 'negative'. {{10^(-4)}} is a tiny positive number.",
            },
          ],
          solution: [
            "A negative power means one divided by the positive power: {{10^(-4) = 1/10^4}}.",
            "{{10^4}} = 10 000, so {{10^(-4) = 1/10000}}.",
          ],
          difficulty: "warmup",
          guideRef: "powers-of-ten",
          hints: ["What does the minus sign in the power tell you to do: make it negative, or divide?"],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "standard-form-p2-q04",
          question: "Write {{5.3 * 10^4}} as an ordinary number.",
          answer: { type: "number", value: 53000, display: "53 000" },
          traps: [
            {
              spec: { type: "number", value: 530000 },
              feedback: "You wrote 53 then four zeros. The 3 already uses up one of the four moves: 5.3 → 53 → 530 → 5300 → 53 000.",
            },
            {
              spec: { type: "number", value: 5300 },
              feedback: "{{10^4}} = 10 000, so the digits move **4** places left, not 3.",
            },
          ],
          solution: [
            "{{10^4}} = 10 000, so multiply 5.3 by 10 000.",
            "Move the digits 4 places left: 53, 530, 5300, 53 000.",
            "{{5.3 * 10^4}} = 53 000.",
          ],
          difficulty: "warmup",
          guideRef: "large-numbers",
          hints: ["How many places do the digits move? Move them one place at a time."],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p2-q05",
          question: "Write {{1.9 * 10^(-3)}} as an ordinary number.",
          answer: { type: "number", value: 0.0019, allowFraction: false, display: "0.0019" },
          traps: [
            {
              spec: { type: "number", value: 1900 },
              feedback: "A negative power means divide, so the number is less than 1.",
            },
            {
              spec: { type: "number", value: 0.00019 },
              feedback: "That moves the digits 4 places. {{10^(-3)}} means ÷ 1000 — 3 places right.",
            },
          ],
          solution: ["{{10^(-3)}} means ÷ 1000: move the digits 3 places right.", "1.9 → 0.19 → 0.019 → 0.0019."],
          difficulty: "warmup",
          guideRef: "small-numbers",
          hints: ["Will the answer be more or less than 1? How many places do the digits move?"],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p2-q06",
          question: "Arjun divides a number by 0.01 and gets 230. What number did he start with?",
          answer: { type: "number", value: 2.3 },
          traps: [
            {
              spec: { type: "number", value: 23000 },
              feedback: "You multiplied 230 by 100 — but dividing by 0.01 already multiplied Arjun's number by 100. Undo it: ÷ 100.",
            },
            {
              spec: { type: "number", value: 23 },
              feedback: "Check: 23 ÷ 0.01 = 2300, not 230. Undoing ÷ 0.01 means ÷ 100.",
            },
          ],
          solution: [
            "Dividing by 0.01 is the same as multiplying by 100.",
            "So (start) × 100 = 230.",
            "Work backwards: 230 ÷ 100 = 2.3.",
            "Check: 2.3 ÷ 0.01 = 230 ✓",
          ],
          commonError: "Repeating the operation instead of using the inverse.",
          difficulty: "core",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: [
            "What does dividing by 0.01 do to a number — bigger or smaller, and by how much?",
            "Write it as: (start) × 100 = 230.",
            "Use the inverse operation to undo × 100.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "standard-form-p2-q07",
          question: "Work out {{10^5 ÷ 10^8}}. Give your answer as a decimal.",
          answer: { type: "number", value: 0.001, allowFraction: false },
          traps: [
            {
              spec: { type: "number", value: 1000 },
              feedback: "Subtract the indices in order: 5 − 8 = −3, not 8 − 5. Dividing by the bigger number gives an answer less than 1.",
            },
            {
              spec: { type: "number", value: -3 },
              feedback: "−3 is the index. Now write {{10^(-3)}} as a decimal.",
            },
          ],
          solution: [
            "Dividing powers of 10: subtract the indices. 5 − 8 = −3.",
            "{{10^(-3) = 1/1000}} = 0.001.",
            "Check: 100 000 ÷ 100 000 000 = {{1/1000}} ✓",
          ],
          difficulty: "core",
          guideRef: "powers-of-ten",
          hints: [
            "Which is bigger, {{10^5}} or {{10^8}}? So is the answer bigger or smaller than 1?",
            "Dividing powers of the same base: subtract the indices.",
            "Turn {{10^(-3)}} into a decimal.",
          ],
          strategy: "Use the index laws",
        },
        {
          kind: "written",
          id: "standard-form-p2-q08",
          question:
            "Hana says: '{{10^0 = 0}}, because zero lots of 10 is nothing.'\n\nGive **two different** reasons why {{10^0}} is actually 1, and explain Hana's mistake.",
          marks: 3,
          modelAnswer:
            "**Pattern:** {{10^3}} = 1000, {{10^2}} = 100, {{10^1}} = 10. Each time the index drops by 1 you divide by 10, so {{10^0}} = 10 ÷ 10 = 1.\n\n**Index law:** {{10^3 ÷ 10^3}} = 1, because any number divided by itself is 1. But the index law says {{10^3 ÷ 10^3 = 10^(3-3) = 10^0}}. So {{10^0}} must be 1.\n\n**Hana's mistake:** {{10^0}} does not mean 10 × 0. The index counts how many 10s you multiply 1 by — and multiplying by no 10s leaves 1 unchanged.",
          markScheme: [
            {
              point: "Pattern argument: divide by 10 each step, so {{10^0}} = 10 ÷ 10 = 1",
              keywords: ["pattern", "divide by 10", "÷ 10", "10 ÷ 10", "1000, 100, 10"],
            },
            {
              point: "Index-law argument: {{10^3 ÷ 10^3 = 10^0}}, and a number divided by itself is 1",
              keywords: ["divided by itself", "subtract", "index law", "3 - 3", "3 − 3", "10^3 ÷ 10^3"],
            },
            {
              point: "Explains Hana's error: the index is not a multiplier ({{10^0}} is not 10 × 0)",
              keywords: ["not 10 × 0", "10 × 0", "10 x 0", "not times", "not multiply", "no 10s"],
            },
          ],
          commonError: "Giving the same argument twice in different words.",
          difficulty: "core",
          guideRef: "powers-of-ten",
          hints: [
            "Write out {{10^3}}, {{10^2}}, {{10^1}}. What happens each time the index goes down by 1?",
            "What is {{10^3 ÷ 10^3}}? Now work it out with the rule for dividing powers.",
            "Does {{10^2}} mean 10 × 2? So does {{10^0}} mean 10 × 0?",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "standard-form-p2-q09",
          question: "A 4K film download is about 25 000 000 000 bytes. Write this number in standard form.",
          answer: { type: "number", value: 25000000000, standardForm: true, display: "{{2.5 * 10^10}}" },
          traps: [
            {
              spec: { type: "number", value: 2500000000, standardForm: true },
              feedback: "You counted the 9 zeros, but the 5 also moves behind the point. 25 000 000 000 has 11 digits, so the power is 10.",
            },
            {
              spec: { type: "number", value: 250000000000, standardForm: true },
              feedback: "Convert back to check: {{2.5 * 10^11}} = 250 000 000 000 — ten times too big.",
            },
          ],
          solution: [
            "A = 2.5.",
            "25 000 000 000 has 11 digits, so 10 come after the first digit: n = 10.",
            "25 000 000 000 = {{2.5 * 10^10}}.",
          ],
          solutions: [
            {
              label: "Use a known power",
              steps: [
                "25 000 000 000 is 25 billion = 25 × {{10^9}}.",
                "Fix the 25: {{25 * 10^9 = 2.5 * 10^1 * 10^9 = 2.5 * 10^10}}. Quicker if you know a billion is {{10^9}}.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "large-numbers",
          hints: [
            "Write A by putting the point after the first digit.",
            "Count all the digits after the first digit — not just the zeros.",
            "Alternatively: 25 000 000 000 = 25 × {{10^9}}. Now fix the 25.",
          ],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p2-q10",
          question: "The number {{0.62 * 10^7}} is not in standard form. Write it correctly in standard form.",
          answer: { type: "number", value: 6200000, standardForm: true, display: "{{6.2 * 10^6}}" },
          traps: [
            {
              spec: { type: "number", value: 620000000, standardForm: true },
              feedback: "Making A bigger (0.62 → 6.2) must be balanced by making the power **smaller**: 7 − 1 = 6.",
            },
            {
              spec: { type: "number", value: 62000000, standardForm: true },
              feedback: "You fixed A but not the power. 0.62 = {{6.2 * 10^(-1)}}, so the power changes too.",
            },
          ],
          solution: [
            "0.62 is less than 1, so it is not a valid A.",
            "0.62 = {{6.2 * 10^(-1)}}.",
            "{{0.62 * 10^7 = 6.2 * 10^(-1) * 10^7 = 6.2 * 10^6}}.",
            "Check: 0.62 × 10 000 000 = 6 200 000 = {{6.2 * 10^6}} ✓",
          ],
          difficulty: "core",
          guideRef: "large-numbers",
          hints: [
            "Why isn't {{0.62 * 10^7}} in standard form?",
            "Write 0.62 itself in standard form.",
            "Add the indices −1 and 7.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "written",
          id: "standard-form-p2-q11",
          question:
            "Priya and Jun each try to write 0.000 45 in standard form.\n\n- Priya writes {{4.5 * 10^4}}.\n- Jun writes {{45 * 10^(-5)}}.\n\nExplain what each of them has done wrong, and give the correct answer.",
          marks: 3,
          modelAnswer:
            "Priya's power should be **negative**: 0.000 45 is less than 1, but {{4.5 * 10^4}} = 45 000 is a large number. Jun's number has the right value (45 ÷ 100 000 = 0.000 45), but it is not in standard form because 45 is not between 1 and 10. The correct answer is {{4.5 * 10^(-4)}}: the point moves 4 places right to get from 0.000 45 to 4.5.",
          markScheme: [
            {
              point: "Priya: the power must be negative because the number is less than 1 ({{4.5 * 10^4}} = 45 000)",
              keywords: ["negative", "less than 1", "45 000", "45000", "minus", "small"],
            },
            {
              point: "Jun: right value, but 45 is not between 1 and 10",
              keywords: ["between 1 and 10", "less than 10", "too big", "not in standard form", "not standard form"],
            },
            {
              point: "Correct answer {{4.5 * 10^(-4)}}",
              keywords: ["4.5 × 10^-4", "4.5 x 10^-4", "10^-4", "-4", "−4"],
            },
          ],
          commonError: "Saying Jun is 'wrong' without noticing his value is right — only the form is wrong.",
          difficulty: "core",
          guideRef: "small-numbers",
          hints: [
            "Convert each of their answers back to an ordinary number.",
            "Standard form has two rules — one about A and one about the power. Which rule does each person break?",
            "From 0.000 45 to 4.5, how many places does the point move?",
          ],
          strategy: "Check by converting back",
        },
        {
          kind: "short",
          id: "standard-form-p2-q12",
          question: "A grain of very fine sand is about 0.000 062 5 m across. Write this in standard form.",
          answer: { type: "number", value: 0.0000625, standardForm: true, display: "{{6.25 * 10^(-5)}} m" },
          traps: [
            {
              spec: { type: "number", value: 0.000625, standardForm: true },
              feedback: "You counted the 4 zeros after the point. The point has to move **5** places right to reach 6.25.",
            },
            {
              spec: { type: "number", value: 625000, standardForm: true },
              feedback: "The number is less than 1, so the power must be negative.",
            },
          ],
          solution: [
            "The first non-zero digit is 6, so A = 6.25.",
            "From 0.000 062 5 to 6.25 the point moves 5 places right, so n = −5.",
            "The grain is {{6.25 * 10^(-5)}} m across. Check: 6.25 ÷ 100 000 = 0.000 062 5 ✓",
          ],
          difficulty: "core",
          guideRef: "small-numbers",
          hints: [
            "Where must the point go to make A between 1 and 10?",
            "Count the places the point moves, one at a time.",
            "Quick check: count the zeros in front of the 6, *including* the one before the point.",
          ],
          strategy: "Count the places",
        },
        {
          kind: "short",
          id: "standard-form-p2-q13",
          question:
            "Four numbers are written below. Some of them are **not** in standard form.\n\n| Label | Number |\n|---|---|\n| A | {{3.1 * 10^6}} |\n| B | {{42 * 10^5}} |\n| C | {{0.39 * 10^7}} |\n| D | {{3.05 * 10^6}} |\n\nWrite the letters in order of size, **largest first** (type them like this: ABCD).",
          answer: { type: "text", accept: ["BCAD", "B,C,A,D", "B>C>A>D", "B C A D"], display: "B, C, A, D" },
          traps: [
            {
              spec: { type: "text", accept: ["CADB"] },
              feedback:
                "You compared the powers as they are written. B and C aren't in standard form — rewrite them first: B = {{4.2 * 10^6}} and C = {{3.9 * 10^6}}.",
            },
            {
              spec: { type: "text", accept: ["DACB"] },
              feedback: "That is smallest first — the question asks for largest first.",
            },
          ],
          solution: [
            "Put every number in standard form first: B = {{42 * 10^5}} = {{4.2 * 10^6}} and C = {{0.39 * 10^7}} = {{3.9 * 10^6}}.",
            "Now all four have power 6, so compare A: 4.2 > 3.9 > 3.1 > 3.05.",
            "Order: B, C, A, D. Check: 4 200 000 > 3 900 000 > 3 100 000 > 3 050 000 ✓",
          ],
          commonError: "Using 'bigger power wins' on numbers that are not in standard form.",
          difficulty: "core",
          guideRef: "comparing-standard-form",
          hints: [
            "Which of these are not in standard form? Why does that matter when comparing?",
            "Rewrite B and C so that A is between 1 and 10.",
            "Once all the powers match, compare the A parts. Is 3.05 bigger or smaller than 3.1?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "standard-form-p2-q14",
          question:
            "A calculator shows two measurements: `3.6E-04` and `7.2E-05`. How many times bigger is the first than the second?",
          answer: { type: "number", value: 5 },
          traps: [
            {
              spec: { type: "number", value: 0.5 },
              feedback: "3.6 ÷ 7.2 = 0.5, but the powers are different: {{10^(-4)}} is 10 times {{10^(-5)}}. So the answer is 0.5 × 10.",
            },
            {
              spec: { type: "number", value: 50 },
              feedback: "Subtract the powers: −4 − (−5) = 1, so multiply by {{10^1}}, not {{10^2}}.",
            },
          ],
          solution: [
            "`3.6E-04` = {{3.6 * 10^(-4)}} and `7.2E-05` = {{7.2 * 10^(-5)}}.",
            "'How many times bigger' means divide. Divide the numbers: 3.6 ÷ 7.2 = 0.5.",
            "Subtract the powers: −4 − (−5) = 1, giving 0.5 × {{10^1}} = 5.",
            "Check: 5 × 0.000 072 = 0.000 36 ✓",
          ],
          solutions: [
            {
              label: "Ordinary numbers",
              steps: [
                "0.000 36 ÷ 0.000 072: multiply both by 1 000 000 to get 360 ÷ 72 = 5.",
                "Fine here, but with bigger powers the standard-form route is much quicker.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "comparing-standard-form",
          hints: [
            "What does `E-04` mean?",
            "'How many times bigger' means divide the first by the second.",
            "Divide the A parts and subtract the powers: −4 − (−5) = ?",
          ],
          strategy: "Group the numbers and the powers",
        },
        {
          kind: "written",
          id: "standard-form-p2-q15",
          question:
            "Wei Ling says: '{{4.8 * 10^4}} is bigger than {{52 * 10^3}}, because its power is higher.'\n\nIs she right? Explain carefully.",
          marks: 3,
          modelAnswer:
            "No. {{52 * 10^3}} = 52 000 and {{4.8 * 10^4}} = 48 000, so {{52 * 10^3}} is bigger. The 'bigger power wins' rule only works when both numbers are properly in standard form, and {{52 * 10^3}} is not, because 52 is not between 1 and 10. Rewritten, it is {{5.2 * 10^4}}. Now the powers are equal, so compare A: 5.2 > 4.8.",
          markScheme: [
            {
              point: "States she is wrong: {{52 * 10^3}} is bigger",
              keywords: ["no", "wrong", "not right", "incorrect", "52 000 is bigger"],
            },
            {
              point: "Converts: 52 000 and 48 000, or rewrites {{52 * 10^3}} as {{5.2 * 10^4}}",
              keywords: ["52 000", "52000", "48 000", "48000", "5.2"],
            },
            {
              point: "Explains the power rule needs both numbers in standard form (52 is not between 1 and 10)",
              keywords: ["not in standard form", "between 1 and 10", "less than 10", "standard form"],
            },
          ],
          commonError: "Agreeing with Wei Ling without checking whether both numbers are in standard form.",
          difficulty: "core",
          guideRef: "comparing-standard-form",
          hints: [
            "Write both as ordinary numbers.",
            "Is {{52 * 10^3}} in standard form?",
            "When does 'compare the powers first' work?",
          ],
          strategy: "Check by converting back",
        },
        {
          kind: "short",
          id: "standard-form-p2-q16",
          question: "Work out {{(8 * 10^9) ÷ (2 * 10^3)}}. Give your answer in standard form.",
          answer: { type: "number", value: 4000000, standardForm: true, display: "{{4 * 10^6}}" },
          traps: [
            {
              spec: { type: "number", value: 4000, standardForm: true },
              feedback: "You divided the indices (9 ÷ 3). For dividing powers of 10, **subtract** the indices: 9 − 3 = 6.",
            },
            {
              spec: { type: "number", value: 4000000000000, standardForm: true },
              feedback: "Adding the indices is the rule for multiplying. For dividing, subtract: 9 − 3 = 6.",
            },
          ],
          solution: [
            "Divide the numbers: 8 ÷ 2 = 4.",
            "Subtract the powers: {{10^9 ÷ 10^3 = 10^6}}.",
            "Answer: {{4 * 10^6}} — already in standard form. Check: 8 000 000 000 ÷ 2000 = 4 000 000 ✓",
          ],
          difficulty: "core",
          guideRef: "calculating-standard-form",
          hints: [
            "Group the numbers and the powers of 10 separately.",
            "8 ÷ 2 = ? and {{10^9 ÷ 10^3}} = ?",
            "Dividing powers of 10: subtract the indices.",
          ],
          strategy: "Group the numbers and the powers",
        },
        {
          kind: "short",
          id: "standard-form-p2-q17",
          question:
            "A googol is {{10^100}}. How many digits does the number {{(4 * 10^100) * (2.5 * 10^3)}} have when it is written out in full?",
          answer: { type: "number", value: 105 },
          traps: [
            {
              spec: { type: "number", value: 104 },
              feedback: "Nearly! The product is {{10^104}}: a 1 followed by 104 zeros. Count the 1 as well.",
            },
            {
              spec: { type: "number", value: 103 },
              feedback: "4 × 2.5 = 10, so the product is {{10 * 10^103}} — and that is {{10^104}}, not {{10^103}}.",
            },
          ],
          solution: [
            "Multiply the numbers: 4 × 2.5 = 10.",
            "Add the powers: {{10^100 * 10^3 = 10^103}}.",
            "So the product is {{10 * 10^103 = 10^104}}.",
            "{{10^104}} is 1 followed by 104 zeros: that is 105 digits.",
          ],
          commonError: "Forgetting that 4 × 2.5 = 10 pushes the power up by one.",
          difficulty: "challenge",
          guideRef: "large-numbers",
          hints: [
            "Group the numbers and the powers.",
            "4 × 2.5 is a very friendly number. What does it do to the power?",
            "How many digits do {{10^1}}, {{10^2}} and {{10^3}} have? What about {{10^n}}?",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "written",
          id: "standard-form-p2-q18",
          question:
            "Always, sometimes or never true?\n\n> Multiplying a number by 0.1 makes it smaller.\n\nExplain your answer with examples.",
          marks: 3,
          modelAnswer:
            "Sometimes. For a positive number it is true: 50 × 0.1 = 5, which is smaller. For zero it is false: 0 × 0.1 = 0, which is the same. For a negative number it is false too: −50 × 0.1 = −5, and −5 is **bigger** than −50 (it is further right on the number line). Multiplying by 0.1 moves a number ten times closer to zero — that makes positive numbers smaller but negative numbers bigger.",
          markScheme: [
            { point: "States sometimes", keywords: ["sometimes"] },
            {
              point: "Positive example where it does get smaller (e.g. 50 × 0.1 = 5)",
              keywords: ["positive", "smaller", "50 × 0.1", "50 x 0.1"],
            },
            {
              point: "Counterexample with zero or a negative number, explaining why (e.g. −5 > −50)",
              keywords: ["negative", "-50", "−50", "-5", "−5", "zero", "bigger", "closer to zero"],
            },
          ],
          commonError: "Only testing positive numbers and answering 'always'.",
          difficulty: "challenge",
          guideRef: "multiplying-dividing-by-powers-of-ten",
          hints: [
            "Try a positive number, zero and a negative number.",
            "Work out −50 × 0.1. Is the answer bigger or smaller than −50?",
            "Think of × 0.1 as 'ten times closer to zero' on a number line.",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "standard-form-p2-q19",
          question:
            "Town A has a population of {{3.4 * 10^5}}. Town B has a population of {{7.8 * 10^4}}. What is their total population? Give your answer in standard form.",
          answer: { type: "number", value: 418000, standardForm: true, display: "{{4.18 * 10^5}}" },
          traps: [
            {
              spec: { type: "number", value: 1120000, standardForm: true },
              feedback: "You added the A parts (3.4 + 7.8 = 11.2) as if the powers matched. They don't: {{7.8 * 10^4}} is only 78 000.",
            },
            {
              spec: { type: "number", value: 112000, standardForm: true },
              feedback: "You added the A parts and kept the smaller power. The powers are different, so convert first: 340 000 + 78 000.",
            },
          ],
          solution: [
            "The powers are different, so you can't just add the A parts.",
            "Convert: {{3.4 * 10^5}} = 340 000 and {{7.8 * 10^4}} = 78 000.",
            "Add: 340 000 + 78 000 = 418 000.",
            "In standard form: 418 000 = {{4.18 * 10^5}}.",
          ],
          solutions: [
            {
              label: "Match the powers (slicker)",
              steps: [
                "Write {{7.8 * 10^4 = 0.78 * 10^5}}.",
                "Now the powers match, so add the A parts: 3.4 + 0.78 = 4.18.",
                "Total = {{4.18 * 10^5}} — no long numbers to write out.",
              ],
            },
          ],
          commonError: "Adding A parts when the powers are different.",
          difficulty: "challenge",
          guideRef: "calculating-standard-form",
          hints: [
            "Can you add the A parts when the powers are different?",
            "Write both as ordinary numbers — or rewrite one so the powers match.",
            "340 000 + 78 000 = ?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "standard-form-p2-q20",
          question: "Find the smallest whole number n for which {{3 * 10^n}} is bigger than {{40 * 8.5 * 10^5}}.",
          answer: { type: "number", value: 8 },
          traps: [
            {
              spec: { type: "number", value: 7 },
              feedback: "{{3 * 10^7}} = 30 000 000, but {{40 * 8.5 * 10^5}} = 34 000 000. Not quite big enough.",
            },
            {
              spec: { type: "number", value: 6 },
              feedback: "Work out 40 × 8.5 = 340 first — that changes the power of the right-hand side.",
            },
          ],
          solution: [
            "40 × 8.5 = 340, so the right-hand side is {{340 * 10^5 = 3.4 * 10^7}} = 34 000 000.",
            "Try n = 7: {{3 * 10^7}} = 30 000 000, which is less than 34 000 000. ✗",
            "Try n = 8: {{3 * 10^8}} = 300 000 000, which is bigger. ✓",
            "So the smallest n is 8.",
          ],
          commonError: "Choosing n = 7 because the powers match, without comparing the A parts (3 < 3.4).",
          difficulty: "challenge",
          guideRef: "comparing-standard-form",
          hints: [
            "First write {{40 * 8.5 * 10^5}} in standard form.",
            "Compare powers first; if the powers are equal, compare A.",
            "With the same power, is 3 bigger or smaller than 3.4?",
          ],
          strategy: "Consider extremes",
        },
      ],
    },
  ],

  // =========================================================================
  // CHALLENGE — AoPS / UKMT-Junior style (insight, not grind)
  // =========================================================================
  challenge: [
    {
      kind: "short",
      id: "standard-form-ch-q01",
      question:
        "Siti starts with a number. She multiplies it by 0.01, then divides by 0.1, then multiplies by 1000, then divides by 100, then multiplies by 0.1. Her final answer is 4.7.\n\nWhat number did she start with?",
      answer: { type: "number", value: 47 },
      traps: [
        {
          spec: { type: "number", value: 0.47 },
          feedback: "You applied the overall effect again instead of undoing it. The five steps together multiply by 0.1, so (start) × 0.1 = 4.7.",
        },
        {
          spec: { type: "number", value: 4.7 },
          feedback: "The steps don't cancel out completely. Add up the shifts: −2, +1, +3, −2, −1.",
        },
      ],
      solution: [
        "Write each step as 'multiply by a power of 10': × 0.01 = × {{10^(-2)}}; ÷ 0.1 = × {{10^1}}; × 1000 = × {{10^3}}; ÷ 100 = × {{10^(-2)}}; × 0.1 = × {{10^(-1)}}.",
        "Add the indices: −2 + 1 + 3 − 2 − 1 = −1. So the whole chain multiplies by {{10^(-1)}} = 0.1.",
        "(start) × 0.1 = 4.7, so the start = 4.7 ÷ 0.1 = 47.",
        "Check forwards: 47 → 0.47 → 4.7 → 4700 → 47 → 4.7 ✓",
      ],
      solutions: [
        {
          label: "Undo each step in reverse (slower)",
          steps: [
            "Work backwards from 4.7, doing the inverse of each step in reverse order.",
            "Undo × 0.1: 4.7 ÷ 0.1 = 47. Undo ÷ 100: 47 × 100 = 4700.",
            "Undo × 1000: 4700 ÷ 1000 = 4.7. Undo ÷ 0.1: 4.7 × 0.1 = 0.47.",
            "Undo × 0.01: 0.47 ÷ 0.01 = 47.",
            "Five separate calculations — the power-of-10 bookkeeping does it in one, which is why it is slicker.",
          ],
        },
      ],
      commonError: "Undoing a step with the same operation instead of its inverse.",
      difficulty: "challenge",
      guideRef: "multiplying-dividing-by-powers-of-ten",
      hints: [
        "Every step just slides the digits. Which way, and how far?",
        "Write each step as 'multiply by a power of 10' — for example, ÷ 0.1 is × {{10^1}}.",
        "Add the five indices to find the overall effect of the whole chain.",
        "If the chain multiplies by 0.1, what must you do to 4.7 to undo it?",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "standard-form-ch-q02",
      question: "How many digits does {{2^10 * 5^13}} have when it is written out in full?",
      answer: { type: "number", value: 13 },
      traps: [
        {
          spec: { type: "number", value: 23 },
          feedback: "You can't add indices when the bases are different (2 and 5). Pair each 2 with a 5 to make a 10.",
        },
        {
          spec: { type: "number", value: 12 },
          feedback: "The number is {{1.25 * 10^12}}. A whole number with power 12 has 12 + 1 = 13 digits.",
        },
      ],
      solution: [
        "Pair each 2 with a 5: {{2^10 * 5^10 = (2 * 5)^10 = 10^10}}.",
        "Three 5s are left over: {{2^10 * 5^13 = 10^10 * 5^3 = 125 * 10^10}}.",
        "So the number is 125 followed by 10 zeros, which is {{1.25 * 10^12}}.",
        "That is 3 + 10 = 13 digits.",
      ],
      solutions: [
        {
          label: "Brute force (much slower)",
          steps: [
            "{{2^10}} = 1024 and {{5^13}} = 1 220 703 125.",
            "1024 × 1 220 703 125 = 1 250 000 000 000, which has 13 digits.",
            "Correct, but pairing 2s with 5s avoids a horrible multiplication — far slicker.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "large-numbers",
      hints: [
        "What do you get when you multiply 2 by 5? Why might that help?",
        "How many (2 × 5) pairs can you make, and what is left over?",
        "{{2^10 * 5^13 = (2 * 5)^10 * 5^3}}. Now write it in standard form.",
        "A whole number {{A * 10^n}} in standard form has n + 1 digits.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "standard-form-ch-q03",
      question: "What is the sum of the digits of {{10^25 - 25}}?",
      answer: { type: "number", value: 219 },
      traps: [
        {
          spec: { type: "number", value: 225 },
          feedback: "Not every digit is a 9 — the number ends in 75. Try {{10^3 - 25}} to see the pattern.",
        },
        {
          spec: { type: "number", value: 228 },
          feedback: "Count the nines carefully: {{10^4 - 25}} = 9975 has only two nines. For {{10^25 - 25}} there are 23.",
        },
      ],
      solution: [
        "Try small cases: {{10^3 - 25}} = 975, {{10^4 - 25}} = 9975, {{10^5 - 25}} = 99 975.",
        "{{10^n - 25}} has n digits: it ends in 75, and the other n − 2 digits are all 9s.",
        "For n = 25: twenty-three 9s, then 7 and 5.",
        "Digit sum = 23 × 9 + 7 + 5 = 207 + 12 = 219.",
      ],
      solutions: [
        {
          label: "Start from all nines (slicker)",
          steps: [
            "{{10^25 - 25 = (10^25 - 1) - 24}}.",
            "{{10^25 - 1}} is twenty-five 9s, with digit sum 25 × 9 = 225.",
            "Subtracting 24 only changes the last two digits, 99 → 75, with no borrowing.",
            "The digit sum drops by (9 + 9) − (7 + 5) = 6, giving 225 − 6 = 219. No counting of nines needed.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "powers-of-ten",
      hints: [
        "{{10^25}} is far too big to write out. Try smaller powers first: {{10^3 - 25}}, {{10^4 - 25}}.",
        "How many digits does {{10^n - 25}} have, and what do they look like?",
        "The last two digits are always 7 and 5. How many 9s come before them?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "standard-form-ch-q04",
      question: "Without a calculator, write {{1/(5^8)}} exactly in standard form. (There is a neat trick.)",
      answer: { type: "number", value: 0.00000256, standardForm: true, display: "{{2.56 * 10^(-6)}}" },
      traps: [
        {
          spec: { type: "number", value: 0.0000000256, standardForm: true },
          feedback: "{{256 * 10^(-8)}} is right, but 256 isn't between 1 and 10. Moving the point two places left in A means the power goes **up** by 2.",
        },
        {
          spec: { type: "number", value: 390625, standardForm: true },
          feedback: "That is {{5^8}} itself. You need 1 divided by it.",
        },
      ],
      solution: [
        "Multiply top and bottom by {{2^8}}: {{1/(5^8) = (2^8)/(2^8 * 5^8) = (2^8)/(10^8)}}.",
        "{{2^8}} = 256, so {{1/(5^8) = 256/(10^8) = 256 * 10^(-8)}}.",
        "Re-normalise: 256 = {{2.56 * 10^2}}, so the answer is {{2.56 * 10^(-6)}}.",
        "As a decimal: 0.000 002 56.",
      ],
      solutions: [
        {
          label: "Long division (slower)",
          steps: [
            "{{5^8}} = 390 625.",
            "1 ÷ 390 625 by long division = 0.000 002 56 = {{2.56 * 10^(-6)}}.",
            "It works, but the division is long and error-prone. Making a power of 10 underneath is far slicker.",
          ],
        },
      ],
      commonError: "Stopping at {{256 * 10^(-8)}}, which is not in standard form.",
      difficulty: "challenge",
      guideRef: "small-numbers",
      hints: [
        "Fractions with a power of 10 underneath are easy to write as decimals. Can you make the denominator a power of 10?",
        "What could you multiply {{5^8}} by to get {{10^8}}?",
        "Multiply top and bottom by {{2^8}} = 256.",
        "Now write {{256/(10^8)}} in standard form.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "standard-form-ch-q05",
      question:
        "Wei Ling squares a positive number on her calculator. The screen shows `4.9E-07`. What number did she square? Give your answer in standard form.",
      answer: { type: "number", value: 0.0007, standardForm: true, display: "{{7 * 10^(-4)}}" },
      traps: [
        {
          spec: { type: "number", value: 0.00022, standardForm: true, tolerance: 0.000002 },
          feedback:
            "{{sqrt(4.9)}} is not a neat number, and half of −7 is not a whole number. Rewrite {{4.9 * 10^(-7)}} as {{49 * 10^(-8)}} first, so the power is even.",
        },
        {
          spec: { type: "number", value: 0.007, standardForm: true },
          feedback: "Square it to check: {{(7 * 10^(-3))^2 = 49 * 10^(-6) = 4.9 * 10^(-5)}}. Too big.",
        },
      ],
      solution: [
        "`4.9E-07` means {{4.9 * 10^(-7)}}.",
        "Squaring doubles the power of 10, so the power must be even before you can halve it. Rewrite: {{4.9 * 10^(-7) = 49 * 10^(-8)}}.",
        "Take square roots of each part: {{sqrt(49) = 7}} and {{sqrt(10^(-8)) = 10^(-4)}}.",
        "The number was {{7 * 10^(-4)}} = 0.0007. Check: 0.0007 × 0.0007 = 0.000 000 49 ✓",
      ],
      solutions: [
        {
          label: "Count decimal places",
          steps: [
            "{{4.9 * 10^(-7)}} = 0.000 000 49, which has 8 decimal places.",
            "Squaring a decimal doubles its number of decimal places, so the original number had 4.",
            "Its digits square to 49, so it is 0.0007 = {{7 * 10^(-4)}}.",
            "Both work; making the power even is slicker and works however big or small the number is.",
          ],
        },
      ],
      commonError: "Taking {{sqrt(4.9)}} and trying to halve −7.",
      difficulty: "challenge",
      guideRef: "comparing-standard-form",
      hints: [
        "What does `E-07` mean?",
        "If {{x = A * 10^n}}, what happens to the power of 10 when you square x?",
        "You can't halve −7 neatly. Can you rewrite {{4.9 * 10^(-7)}} with an even power?",
        "{{4.9 * 10^(-7) = 49 * 10^(-8)}}. Now square-root each part.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "standard-form-ch-q06",
      question:
        "How many whole numbers can be written in standard form as {{A * 10^3}}, where A has **at most two** decimal places?\n\n(For example, 4560 = {{4.56 * 10^3}} counts, but 4567 = {{4.567 * 10^3}} does not.)",
      answer: { type: "number", value: 900 },
      traps: [
        {
          spec: { type: "number", value: 9000 },
          feedback: "That counts every 4-digit number. 4567 = {{4.567 * 10^3}} needs three decimal places, so it doesn't count.",
        },
        {
          spec: { type: "number", value: 899 },
          feedback: "Off by one! From 100 to 999 there are 999 − 100 + 1 numbers, not 999 − 100.",
        },
      ],
      solution: [
        "Numbers {{A * 10^3}} with {{1 <= A < 10}} are exactly the whole numbers from 1000 to 9999.",
        "A = N ÷ 1000 has at most two decimal places exactly when N is a multiple of 10 (its last digit is 0).",
        "The multiples of 10 run from 1000 = 10 × 100 to 9990 = 10 × 999.",
        "That is 999 − 100 + 1 = 900 numbers.",
      ],
      solutions: [
        {
          label: "Count the values of A (slicker)",
          steps: [
            "A can be 1.00, 1.01, 1.02, …, 9.99 — every two-decimal-place number from 1 up to (not including) 10.",
            "Each one gives a different whole number 1000A, e.g. 1.23 → 1230.",
            "In hundredths, A runs from 100 to 999 hundredths: 900 values.",
            "No divisibility argument needed — that is why this count is slicker.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "large-numbers",
      hints: [
        "Which whole numbers have power 3 in standard form?",
        "Compare N = 4560 and N = 4567. What is different about their last digits?",
        "A has at most two decimal places exactly when N ends in 0. How many 4-digit numbers end in 0?",
        "Careful with the count: how many whole numbers are there from 100 to 999?",
      ],
      strategy: "Count systematically",
    },
    {
      kind: "short",
      id: "standard-form-ch-q07",
      question:
        "N is a positive number written in standard form as {{A * 10^4}}. When N is squared, the answer is written in standard form as {{B * 10^m}}.\n\nList **all** the possible values of m.",
      answer: { type: "list", values: [8, 9], display: "8, 9" },
      traps: [
        {
          spec: { type: "list", values: [8, 9, 10] },
          feedback: "m = 10 would need {{A^2 >= 100}}, which needs A ≥ 10 — impossible in standard form.",
        },
      ],
      solution: [
        "{{N^2 = A^2 * 10^8}}.",
        "Since {{1 <= A < 10}}, we have {{1 <= A^2 < 100}}.",
        "If {{A^2 < 10}} (e.g. A = 2 gives {{4 * 10^8}}), it is already in standard form: m = 8.",
        "If {{10 <= A^2 < 100}} (e.g. A = 5 gives {{25 * 10^8 = 2.5 * 10^9}}), re-normalise: m = 9.",
        "{{A^2}} can never reach 100, so m = 10 is impossible. The possible values are 8 and 9.",
      ],
      solutions: [
        {
          label: "Trap N between powers of 10 (slicker)",
          steps: [
            "Because {{1 <= A < 10}}, N is trapped: {{10^4 <= N < 10^5}}.",
            "Squaring positive numbers keeps the order: {{10^8 <= N^2 < 10^10}}.",
            "So {{N^2}} has power 8 or 9 in standard form — no cases needed.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "calculating-standard-form",
      hints: [
        "Try some examples: A = 1, A = 2, A = 5, A = 9.9.",
        "Write {{N^2}} as {{A^2 * 10^8}}. What range can {{A^2}} lie in?",
        "Consider extremes: what are the smallest and largest possible values of {{A^2}}?",
        "When does {{A^2 * 10^8}} need re-normalising, and by how much?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "standard-form-ch-q08",
      question: "Without a calculator, work out {{(0.04)^3 ÷ (0.008)^2}}.",
      answer: { type: "number", value: 1 },
      traps: [
        {
          spec: { type: "number", value: 100 },
          feedback: "Check your decimal places: {{0.04^3}} has 2 + 2 + 2 = 6 decimal places (0.000 064), not 4.",
        },
        {
          spec: { type: "number", value: 0.1 },
          feedback: "Check {{0.008^2}}: it has 3 + 3 = 6 decimal places (0.000 064).",
        },
      ],
      solution: [
        "Use standard form: 0.04 = {{4 * 10^(-2)}} and 0.008 = {{8 * 10^(-3)}}.",
        "Cube the first: {{(4 * 10^(-2))^3 = 64 * 10^(-6)}}.",
        "Square the second: {{(8 * 10^(-3))^2 = 64 * 10^(-6)}}.",
        "They are equal, so the answer is 1.",
      ],
      solutions: [
        {
          label: "Spot a common base (slickest)",
          steps: [
            "0.04 = {{0.2^2}} and 0.008 = {{0.2^3}}.",
            "So {{(0.04)^3 = 0.2^6}} and {{(0.008)^2 = 0.2^6}}.",
            "Same number on top and bottom, so the answer is 1 — no decimals to count at all.",
          ],
        },
        {
          label: "Count decimal places",
          steps: [
            "{{0.04^3}}: 4 × 4 × 4 = 64, with 2 + 2 + 2 = 6 decimal places → 0.000 064.",
            "{{0.008^2}}: 8 × 8 = 64, with 3 + 3 = 6 decimal places → 0.000 064.",
            "0.000 064 ÷ 0.000 064 = 1.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "small-numbers",
      hints: [
        "Write 0.04 and 0.008 in standard form.",
        "Cube the first and square the second — deal with the numbers and the powers separately.",
        "Compare your two results. What do you notice?",
        "Is there a single number that both 0.04 and 0.008 are powers of?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "written",
      id: "standard-form-ch-q09",
      question:
        "A calculator starts at 1. Each move, you either **multiply by 0.1** or **divide by 0.01**.\n\nProve that it is impossible to finish on 10 after exactly 10 moves.",
      marks: 3,
      modelAnswer:
        "Every number you can reach is a power of 10, so track the power. Multiplying by 0.1 lowers the power by 1, and dividing by 0.01 (the same as multiplying by 100) raises it by 2. Suppose d of the 10 moves are 'divide by 0.01'; then 10 − d moves are 'multiply by 0.1'. The final power is 2d − (10 − d) = 3d − 10. To finish on 10 = {{10^1}} we would need 3d − 10 = 1, so 3d = 11. But 11 is not a multiple of 3, so no whole number d works. Therefore it is impossible.",
      markScheme: [
        {
          point: "× 0.1 lowers the power of 10 by 1, and ÷ 0.01 (= × 100) raises it by 2",
          keywords: ["-1", "−1", "+2", "× 100", "x 100", "times 100", "down 1", "up 2", "power", "index"],
        },
        {
          point: "Final power after 10 moves is 3d − 10 (or: power + number of moves is always a multiple of 3)",
          keywords: ["3d", "2d", "10 - d", "10 − d", "multiple of 3"],
        },
        {
          point: "Needs 3d = 11 (11 is not a multiple of 3), so it is impossible",
          keywords: ["11", "not a multiple", "impossible", "can't", "cannot", "never"],
        },
      ],
      solutions: [
        {
          label: "Look for an invariant (slicker)",
          steps: [
            "Watch the quantity (power) + (number of moves made). At the start it is 0 + 0 = 0.",
            "A '× 0.1' move changes it by −1 + 1 = 0. A '÷ 0.01' move changes it by +2 + 1 = 3.",
            "So (power) + (moves) is always a multiple of 3.",
            "Finishing on {{10^1}} after 10 moves would give 1 + 10 = 11, not a multiple of 3. Impossible — and you never need to know how many of each move were used.",
          ],
        },
      ],
      commonError: "Trying a few sequences and saying 'I couldn't find one'. That is not a proof — you must show that no sequence can work.",
      difficulty: "challenge",
      guideRef: "powers-of-ten",
      hints: [
        "Every number you can reach is a power of 10. Keep track of the power instead of the number.",
        "What does each kind of move do to the power?",
        "Suppose d of the moves are 'divide by 0.01'. Write the final power in terms of d.",
        "Can 3d − 10 ever equal 1?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "written",
      id: "standard-form-ch-q10",
      question:
        "Ravi claims:\n\n> If {{x = A * 10^n}} and {{y = B * 10^n}} are both in standard form, then {{x + y = (A + B) * 10^n}}, so x + y in standard form **always** has power n.\n\n(a) Find the flaw in Ravi's reasoning and give a counterexample.\n(b) Prove that the power of x + y in standard form is always either n or n + 1.\n(c) Show with an example that for x − y the power can be much smaller than n.",
      marks: 4,
      modelAnswer:
        "(a) {{(A + B) * 10^n}} has the right value, but it is only in standard form if A + B is less than 10. For example, {{6 * 10^3 + 7 * 10^3 = 13 * 10^3 = 1.3 * 10^4}}, which has power 4, not 3.\n\n(b) Since 1 ≤ A < 10 and 1 ≤ B < 10, we get 2 ≤ A + B < 20. If A + B < 10, it is already a valid A, so the power is n. If 10 ≤ A + B < 20, divide it by 10 to get a number from 1 up to 2 and add 1 to the power: the power is n + 1. A + B never reaches 100 (it never even reaches 20), so the point never has to move two places: the power is never n + 2.\n\n(c) Subtracting close numbers can lose a lot: {{5.0001 * 10^6 - 5 * 10^6 = 0.0001 * 10^6}} = 100 = {{1 * 10^2}}. The power drops from 6 to 2.",
      markScheme: [
        {
          point: "Flaw: A + B may be 10 or more, so {{(A + B) * 10^n}} is not in standard form",
          keywords: ["10 or more", "more than 10", "bigger than 10", "over 10", "not in standard form", "a + b"],
        },
        {
          point: "A valid counterexample, e.g. {{6 * 10^3 + 7 * 10^3 = 1.3 * 10^4}}",
          keywords: ["13", "1.3", "counterexample", "for example"],
        },
        {
          point: "Proof: 2 ≤ A + B < 20, so the power is n or n + 1 (never n + 2)",
          keywords: ["20", "less than 20", "< 20", "n + 1", "n+1"],
        },
        {
          point: "Subtraction example where the power drops a lot, e.g. {{5.0001 * 10^6 - 5 * 10^6 = 1 * 10^2}}",
          keywords: ["subtract", "difference", "10^2", "drops", "close", "minus"],
        },
      ],
      solutions: [
        {
          label: "Bands argument for (b)",
          steps: [
            "x and y both lie in the band from {{10^n}} up to (but not including) {{10^(n+1)}}.",
            "Adding: {{2 * 10^n <= x + y < 2 * 10^(n+1)}}, which is less than {{10^(n+2)}}.",
            "So x + y is at least {{10^n}} and less than {{10^(n+2)}}: its power is n or n + 1. This avoids talking about A + B at all.",
          ],
        },
      ],
      commonError: "Proving only that the power *can* be n + 1, without showing it can never be n + 2.",
      difficulty: "challenge",
      guideRef: "calculating-standard-form",
      hints: [
        "Test Ravi's claim with A = 6 and B = 7.",
        "What are the smallest and largest possible values of A + B?",
        "If A + B is between 10 and 20, how do you re-normalise — and by how much does the power change?",
        "For subtraction, try two numbers that are very close together.",
      ],
      strategy: "Spot the flaw",
    },
  ],
};
