import type { TopicPractice } from "../../types.ts";

// Integers, Powers & Roots — quick-check quiz, two practice papers and the challenge set.
// Section ids: adding-subtracting-negatives · multiplying-dividing-negatives · order-of-operations ·
// squares-cubes-roots · index-laws · types-of-number · negative-indices (stretch)

export const practice: TopicPractice = {
  // ===========================================================================
  // QUIZ — 10 questions: 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "short",
      id: "integers-powers-quiz-q01",
      question:
        "At 6 a.m. the temperature in Harbin, China, is −15 °C. By 2 p.m. it has risen by 9 °C. What is the temperature at 2 p.m.? Give your answer in °C.",
      answer: { type: "number", value: -6, display: "−6 °C" },
      traps: [
        { spec: { type: "number", value: -24 }, feedback: "That would be a *fall* of 9 °C. The temperature rose, so add 9: −15 + 9." },
        { spec: { type: "number", value: 6 }, feedback: "Check the sign. Going up 9 from −15 doesn't get you back to 0 (that needs 15), so you are still below zero." },
      ],
      solution: [
        "Rising means adding: −15 + 9.",
        "Start at −15 on a number line and move 9 to the right: you land on −6.",
        "The temperature at 2 p.m. is −6 °C.",
      ],
      commonError: "Answering 6 °C. Rising 9 degrees from −15 °C only gets you to −6 °C, because you need 15 degrees just to reach zero.",
      difficulty: "warmup",
      guideRef: "adding-subtracting-negatives",
      hints: ["Does 'rising' mean adding or subtracting?", "Picture a thermometer: start at −15 and go up 9 degrees."],
      strategy: "Draw a diagram",
    },
    {
      kind: "mcq",
      id: "integers-powers-quiz-q02",
      question: "What is the value of {{3^4}}?",
      options: ["12", "64", "81", "7"],
      answerIndex: 2,
      explanation:
        "{{3^4 = 3 * 3 * 3 * 3 = 81}}. The answer 12 comes from 3 × 4, which multiplies the base by the index instead of using the index to count how many 3s to multiply. 64 is {{4^3}} (base and index swapped), and 7 is 3 + 4.",
      difficulty: "warmup",
      guideRef: "index-laws",
      hints: ["The index tells you how many 3s to multiply together.", "{{3 * 3 = 9}}, then 9 × 3, then one more × 3."],
      strategy: "Write it out in full",
    },
    {
      kind: "short",
      id: "integers-powers-quiz-q03",
      question: "Write down **both** square roots of 144. Separate them with a comma.",
      answer: { type: "list", values: [12, -12], display: "12 and −12 (written ±12)" },
      traps: [
        { spec: { type: "list", values: [72, -72] }, feedback: "Finding a square root is not halving: 72 × 72 = 5184. Which number multiplied by *itself* gives 144?" },
      ],
      solution: [
        "12 × 12 = 144, so 12 is a square root of 144.",
        "(−12) × (−12) = 144 as well, because negative × negative = positive.",
        "So the square roots of 144 are 12 and −12, often written ±12.",
      ],
      commonError: "Giving only 12. The symbol {{sqrt(144)}} means the positive root, but 144 has two square roots: 12 and −12.",
      difficulty: "warmup",
      guideRef: "squares-cubes-roots",
      hints: ["Which whole number multiplied by itself gives 144?", "Could a negative number squared also give 144?"],
    },
    {
      kind: "mcq",
      id: "integers-powers-quiz-q04",
      question: "Work out (−48) ÷ 6 × (−2).",
      options: ["16", "4", "−16", "−4"],
      answerIndex: 0,
      explanation:
        "× and ÷ have equal priority, so work from left to right: −48 ÷ 6 = −8, then −8 × (−2) = 16 (negative × negative = positive). The answer 4 comes from doing 6 × (−2) = −12 first and then −48 ÷ (−12), which is like adding brackets that aren't there. −16 has the right size but the wrong sign.",
      difficulty: "core",
      guideRef: "multiplying-dividing-negatives",
      hints: [
        "Multiplication and division have the same priority. Which direction do you work in?",
        "Left to right: start with −48 ÷ 6.",
        "Then multiply your answer by −2. What do two negatives give?",
      ],
      strategy: "Work in stages",
    },
    {
      kind: "short",
      id: "integers-powers-quiz-q05",
      question: "Work out {{7 + 3 * (8 - 5)^2}}.",
      answer: { type: "number", value: 34 },
      traps: [
        { spec: { type: "number", value: 88 }, feedback: "You multiplied 3 × 3 before squaring. Indices come before multiplication: square the bracket first, {{3^2 = 9}}, then work out 3 × 9." },
        { spec: { type: "number", value: 90 }, feedback: "You added 7 + 3 first. Addition comes last: 3 × 9 = 27, then 7 + 27." },
      ],
      solution: ["Brackets: 8 − 5 = 3.", "Indices: {{3^2 = 9}}.", "Multiply: 3 × 9 = 27.", "Add: 7 + 27 = 34."],
      commonError: "Working left to right and doing 7 + 3 = 10 first.",
      difficulty: "core",
      guideRef: "order-of-operations",
      hints: ["Which part of the calculation must be done first?", "Work out the bracket, then square it.", "Multiply before you add."],
      strategy: "Work in stages",
    },
    {
      kind: "short",
      id: "integers-powers-quiz-q06",
      question: "Simplify {{(2a^3 * 5a^4)/a^2}}.",
      answer: { type: "expression", expr: "10a^5", form: "simplified", display: "{{10a^5}}" },
      traps: [
        { spec: { type: "expression", expr: "7a^5" }, feedback: "Multiply the numbers: 2 × 5 = 10. Only the *indices* get added." },
        { spec: { type: "expression", expr: "10a^10" }, feedback: "You multiplied the indices 3 × 4. When you multiply powers of the same letter, *add* the indices: 3 + 4 = 7. Then divide: 7 − 2 = 5." },
      ],
      solution: [
        "Multiply the numbers: 2 × 5 = 10.",
        "Multiply the powers of a by adding the indices: {{a^3 * a^4 = a^7}}.",
        "Divide by subtracting the indices: {{a^7 ÷ a^2 = a^5}}.",
        "Answer: {{10a^5}}.",
      ],
      commonError: "Multiplying the indices ({{a^12}}) or adding the numbers (2 + 5).",
      difficulty: "core",
      guideRef: "index-laws",
      hints: [
        "Deal with the numbers and the letters separately.",
        "Multiplying powers of a: what happens to the indices?",
        "Dividing by {{a^2}}: subtract 2 from the index.",
      ],
      strategy: "Use the index laws",
    },
    {
      kind: "short",
      id: "integers-powers-quiz-q07",
      question: "Work out {{cbrt(-1000) + sqrt(10^2 - 6^2)}}.",
      answer: { type: "number", value: -2 },
      traps: [
        { spec: { type: "number", value: -6 }, feedback: "Work out everything under the square root first: {{10^2 - 6^2 = 100 - 36 = 64}}. {{sqrt(100 - 36)}} is not the same as {{sqrt(100) - sqrt(36)}}." },
        { spec: { type: "number", value: 18 }, feedback: "{{cbrt(-1000) = -10}}, not 10, because (−10) × (−10) × (−10) = −1000." },
      ],
      solution: [
        "{{cbrt(-1000) = -10}}, because (−10) × (−10) × (−10) = −1000.",
        "Under the square root: {{10^2 - 6^2 = 100 - 36 = 64}}, and {{sqrt(64) = 8}}.",
        "−10 + 8 = −2.",
      ],
      commonError: "Splitting the root: {{sqrt(100 - 36)}} is {{sqrt(64) = 8}}, not 10 − 6 = 4.",
      difficulty: "core",
      guideRef: "squares-cubes-roots",
      hints: [
        "Can a cube root be negative? Which number cubed gives −1000?",
        "A root sign acts like a bracket: work out everything underneath it first.",
        "{{sqrt(64) = 8}}. Now add the two parts.",
      ],
      strategy: "Work in stages",
    },
    {
      kind: "mcq",
      id: "integers-powers-quiz-q08",
      question: "Which of these statements is **false**?",
      options: [
        "Every natural number is an integer.",
        "Every integer is a rational number.",
        "−7 is an integer but not a natural number.",
        "Every rational number is an integer.",
      ],
      answerIndex: 3,
      explanation:
        "{{2/3}} is rational but it is not an integer, so 'every rational number is an integer' is false. The families nest the other way round: natural numbers ⊂ integers ⊂ rational numbers. 'Every integer is a rational number' may look surprising, but it is true: any integer n can be written as {{n/1}}, for example {{-7 = (-7)/1}}.",
      difficulty: "core",
      guideRef: "types-of-number",
      hints: [
        "Think of the families as boxes inside boxes: natural inside integers inside rational.",
        "For each statement, try to find a counterexample.",
        "Is {{1/2}} rational? Is it an integer?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "mcq",
      id: "integers-powers-quiz-q09",
      question: "What is {{10^(-3)}} written as a decimal?",
      options: ["−1000", "0.001", "0.0001", "−30"],
      answerIndex: 1,
      explanation:
        "Each step down the powers of 10 divides by 10: {{10^0 = 1}}, {{10^(-1) = 0.1}}, {{10^(-2) = 0.01}}, {{10^(-3) = 0.001}}. So {{10^(-3) = 1/10^3 = 1/1000 = 0.001}}. The answer −1000 comes from thinking a negative index makes the number negative; it actually means 'one over'. 0.0001 has one zero too many — that is {{10^(-4)}}. −30 is 10 × (−3).",
      difficulty: "core",
      guideRef: "negative-indices",
      hints: ["Continue the pattern 1000, 100, 10, 1, … dividing by 10 each time.", "{{10^(-3)}} means {{1/10^3}}."],
      strategy: "Find a pattern",
    },
    {
      kind: "written",
      id: "integers-powers-quiz-q10",
      question:
        "Without using a calculator:\n\n(a) Explain why {{sqrt(30) + sqrt(70)}} lies between 13 and 15.\n\n(b) Decide whether {{sqrt(30) + sqrt(70)}} is more or less than 14. Explain your reasoning.",
      marks: 4,
      modelAnswer:
        "(a) 25 < 30 < 36, so {{5 < sqrt(30) < 6}}. And 64 < 70 < 81, so {{8 < sqrt(70) < 9}}. Adding, the total lies between 5 + 8 = 13 and 6 + 9 = 15.\n\n(b) It is **less** than 14. Test the halfway points. {{5.5^2 = 30.25}}, which is more than 30, so {{sqrt(30) < 5.5}}. {{8.5^2 = 72.25}}, which is more than 70, so {{sqrt(70) < 8.5}}. Therefore {{sqrt(30) + sqrt(70) < 5.5 + 8.5 = 14}}.",
      markScheme: [
        { point: "Traps {{sqrt(30)}} between 5 and 6 using 25 and 36", keywords: ["25", "36", "5 and 6", "between 5"] },
        { point: "Traps {{sqrt(70)}} between 8 and 9 using 64 and 81, and adds the bounds to get 13 and 15", keywords: ["64", "81", "8 and 9", "13", "15"] },
        { point: "Shows {{sqrt(30) < 5.5}} because {{5.5^2 = 30.25}}", keywords: ["5.5", "30.25"] },
        { point: "Shows {{sqrt(70) < 8.5}} because {{8.5^2 = 72.25}}, so the sum is less than 14", keywords: ["8.5", "72.25", "less than 14", "< 14", "less"] },
      ],
      commonError: "Rounding each root to a whole number (5 + 8 = 13). Rounding throws away exactly the information you need for part (b).",
      difficulty: "challenge",
      guideRef: "squares-cubes-roots",
      hints: [
        "Find the square numbers either side of 30, and either side of 70.",
        "Add the two lower bounds, then add the two upper bounds.",
        "For (b): is {{sqrt(30)}} more or less than 5.5? Square 5.5 to find out.",
        "Do the same with 8.5 for {{sqrt(70)}}, then add.",
      ],
      strategy: "Estimate first",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 2 × 20: 16 short + 4 written; 5 warmup, 11 core, 4 challenge
  // ===========================================================================
  papers: [
    {
      id: "integers-powers-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "integers-powers-p1-q01",
          question: "Work out −7 − (−12).",
          answer: { type: "number", value: 5 },
          traps: [{ spec: { type: "number", value: -19 }, feedback: "You subtracted 12. Subtracting a *negative* number is the same as adding: −7 + 12." }],
          solution: ["Subtracting a negative is the same as adding: −7 − (−12) = −7 + 12.", "Start at −7 and move 12 to the right: 5."],
          difficulty: "warmup",
          guideRef: "adding-subtracting-negatives",
          hints: ["What is subtracting a negative the same as?"],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q02",
          question: "Work out 4 × (−6) ÷ (−8).",
          answer: { type: "number", value: 3 },
          traps: [{ spec: { type: "number", value: -3 }, feedback: "Count the negative signs: there are two, so the answer is positive." }],
          solution: ["4 × (−6) = −24 (different signs give a negative).", "−24 ÷ (−8) = 3 (same signs give a positive)."],
          difficulty: "warmup",
          guideRef: "multiplying-dividing-negatives",
          hints: ["Work from left to right.", "Count the negative signs: an even number of them gives a positive answer."],
        },
        {
          kind: "short",
          id: "integers-powers-p1-q03",
          question: "Work out {{13^2 - 12^2}}.",
          answer: { type: "number", value: 25 },
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "{{13^2 - 12^2}} is not the same as {{(13 - 12)^2}}. Square each number first: 169 − 144." },
            { spec: { type: "number", value: 2 }, feedback: "Squaring is not doubling: {{13^2 = 13 * 13 = 169}}." },
          ],
          solution: ["{{13^2 = 169}} and {{12^2 = 144}}.", "169 − 144 = 25."],
          solutions: [
            {
              label: "Spot a pattern",
              steps: [
                "{{13^2 - 12^2 = (13 - 12) * (13 + 12)}}.",
                "= 1 × 25 = 25. The difference between two consecutive square numbers is the sum of the two numbers — try it with {{5^2 - 4^2}}.",
              ],
            },
          ],
          difficulty: "warmup",
          guideRef: "squares-cubes-roots",
          hints: ["Square each number first, then subtract."],
        },
        {
          kind: "short",
          id: "integers-powers-p1-q04",
          question: "Work out {{2^3 * 5^2}}.",
          answer: { type: "number", value: 200 },
          traps: [
            { spec: { type: "number", value: 60 }, feedback: "{{2^3}} is not 2 × 3. It means 2 × 2 × 2 = 8. Likewise {{5^2 = 5 * 5 = 25}}." },
            { spec: { type: "number", value: 100000 }, feedback: "You can only add indices when the **bases are the same**. Here the bases are 2 and 5, so work out each power: 8 × 25." },
          ],
          solution: ["{{2^3 = 2 * 2 * 2 = 8}}.", "{{5^2 = 5 * 5 = 25}}.", "8 × 25 = 200."],
          difficulty: "warmup",
          guideRef: "index-laws",
          hints: ["Work out each power on its own first."],
        },
        {
          kind: "short",
          id: "integers-powers-p1-q05",
          question:
            "0.35 is a rational number. Show this by writing 0.35 as a fraction in its simplest form.",
          answer: { type: "fraction", n: 7, d: 20, simplest: true },
          traps: [
            { spec: { type: "fraction", n: 7, d: 2 }, feedback: "0.35 is 35 *hundredths*, not 35 tenths: start from {{35/100}}." },
          ],
          solution: [
            "0.35 is 35 hundredths: {{0.35 = 35/100}}.",
            "Divide the top and bottom by their HCF, 5: {{35/100 = 7/20}}.",
            "So 0.35 = {{7/20}}, a fraction of two integers — it is rational.",
          ],
          difficulty: "warmup",
          guideRef: "types-of-number",
          hints: ["How many hundredths is 0.35?", "Simplify {{35/100}} by dividing the top and bottom by the same number."],
        },
        {
          kind: "short",
          id: "integers-powers-p1-q06",
          question:
            "In golf, each round's score is given relative to 'par': −2 means 2 shots *under* par and +3 means 3 shots *over* par.\n\nWei Ling's scores for the first four rounds of a tournament are −3, +2, −4 and +1. What must she score in the fifth round to finish with a total of −7?",
          answer: { type: "number", value: -3 },
          traps: [
            { spec: { type: "number", value: 3 }, feedback: "Check the sign. She is on −4 and needs to get *down* to −7, so she must go 3 further below par." },
            { spec: { type: "number", value: -11 }, feedback: "−11 is −4 + (−7). You need the score that takes her *from* −4 *to* −7: −7 − (−4)." },
          ],
          solution: [
            "Total so far: −3 + 2 − 4 + 1 = −4.",
            "She needs to get from −4 to −7.",
            "−7 − (−4) = −7 + 4 = −3, so she needs a score of −3.",
            "Check: −4 + (−3) = −7 ✓",
          ],
          commonError: "Adding −7 to her total instead of finding the change from her total to −7.",
          difficulty: "core",
          guideRef: "adding-subtracting-negatives",
          hints: [
            "Find her total after four rounds first.",
            "On a number line, how do you get from her total to −7? Which direction, and how far?",
            "The score needed is −7 − (her total so far).",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "integers-powers-p1-q07",
          question:
            "Jun writes: *'Two negatives make a positive, so −5 + (−3) = 8.'*\n\nExplain what Jun has done wrong and give the correct answer.",
          marks: 3,
          modelAnswer:
            "Jun has used a rule for **multiplying** in an **addition**. 'Two negatives make a positive' is about multiplying or dividing, e.g. (−5) × (−3) = 15. Adding a negative number moves you *left* on the number line, so −5 + (−3) = −5 − 3 = −8. Think of money: if you owe $5 and then borrow $3 more, you owe $8.",
          markScheme: [
            { point: "Says the 'two negatives' rule is for multiplying or dividing, not adding", keywords: ["multiply", "multiplying", "times", "divide", "not adding", "addition"] },
            {
              point: "Explains that adding a negative is like subtracting / moves left on the number line (or uses a debt or temperature context)",
              keywords: ["subtract", "left", "down", "owe", "debt", "colder", "number line"],
            },
            { point: "Gives the correct answer −8", keywords: ["-8", "−8", "minus 8", "negative 8"] },
          ],
          commonError: "Just writing 'the answer is −8' without saying which rule Jun misused.",
          difficulty: "core",
          guideRef: "adding-subtracting-negatives",
          hints: [
            "When does 'two negatives make a positive' actually apply?",
            "Show −5 + (−3) on a number line. Start at −5: which way does adding a negative move you?",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q08",
          question: "By rounding each number to 1 significant figure, estimate the value of {{(-298 * 19)/(-61)}}.",
          answer: { type: "number", value: 100 },
          traps: [
            { spec: { type: "number", value: -100 }, feedback: "Count the negatives: one on the top and one on the bottom. Negative ÷ negative is positive." },
            { spec: { type: "number", value: 1000 }, feedback: "Check the division: 6000 ÷ 60 = 100." },
          ],
          solution: [
            "Round: −298 ≈ −300, 19 ≈ 20 and −61 ≈ −60.",
            "Top: −300 × 20 = −6000.",
            "Divide: −6000 ÷ (−60) = 100 (negative ÷ negative = positive).",
            "The exact value is about 92.8, so 100 is a sensible estimate.",
          ],
          commonError: "Losing track of the sign. Decide the sign separately at the end, then deal with the sizes.",
          difficulty: "core",
          guideRef: "multiplying-dividing-negatives",
          hints: [
            "Round each number to 1 significant figure first.",
            "Work out the top, then divide by the bottom.",
            "Decide the sign: how many negative numbers are there?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q09",
          question: "Work out {{(3 - 7)^2 - 2 * (-5)}}.",
          answer: { type: "number", value: 26 },
          traps: [
            { spec: { type: "number", value: 6 }, feedback: "2 × (−5) = −10, and subtracting −10 means *adding* 10: 16 + 10." },
            { spec: { type: "number", value: -6 }, feedback: "{{(3 - 7)^2 = (-4)^2 = 16}}, not −16. A negative number squared is positive." },
          ],
          solution: [
            "Brackets: 3 − 7 = −4.",
            "Indices: {{(-4)^2 = 16}}.",
            "Multiply: 2 × (−5) = −10.",
            "Subtract: 16 − (−10) = 16 + 10 = 26.",
          ],
          commonError: "Writing {{(-4)^2 = -16}}.",
          difficulty: "core",
          guideRef: "order-of-operations",
          hints: [
            "Follow BIDMAS. What comes first?",
            "Square the bracket — be careful with the sign.",
            "Subtracting −10 is the same as…?",
          ],
          strategy: "Work in stages",
        },
        {
          kind: "written",
          id: "integers-powers-p1-q10",
          question:
            "Ethan works out {{2 + 3^2 * 4 - 1}} and gets 99.\n\n(a) Explain the mistake Ethan made.\n\n(b) Work out the correct answer.",
          marks: 3,
          modelAnswer:
            "(a) Ethan added first: 2 + 3 = 5, then squared to get 25, then 25 × 4 = 100 and 100 − 1 = 99. But indices come before addition, and the square applies only to the 3, not to 2 + 3.\n\n(b) {{3^2 = 9}}, then 9 × 4 = 36, then 2 + 36 − 1 = 37.",
          markScheme: [
            {
              point: "Identifies that he added 2 + 3 before squaring (worked left to right, as if it were {{(2 + 3)^2}})",
              keywords: ["2 + 3", "added first", "left to right", "(2+3)", "5", "25"],
            },
            { point: "States that the index must be done first and applies only to the 3", keywords: ["indices first", "index", "square first", "only the 3", "bidmas", "3^2", "9"] },
            { point: "Correct answer 37 with working (9 × 4 = 36)", keywords: ["37", "36"] },
          ],
          commonError: "Saying 'he did it in the wrong order' without explaining which step should have come first.",
          difficulty: "core",
          guideRef: "order-of-operations",
          hints: ["Try to reproduce 99. In what order must Ethan have done the steps?", "In BIDMAS, which comes first: the index or the addition?"],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q11",
          question: "Work out {{sqrt(0.09) + cbrt(-0.125)}}. Give your answer as a decimal.",
          answer: { type: "number", value: -0.2, allowFraction: false },
          traps: [
            { spec: { type: "number", value: -0.47 }, feedback: "{{sqrt(0.09)}} is not 0.03: check by squaring, {{0.03^2 = 0.0009}}. Since {{0.3^2 = 0.09}}, {{sqrt(0.09) = 0.3}}." },
            { spec: { type: "number", value: 0.8 }, feedback: "{{cbrt(-0.125)}} is negative: (−0.5) × (−0.5) × (−0.5) = −0.125." },
          ],
          solution: [
            "{{0.3^2 = 0.3 * 0.3 = 0.09}}, so {{sqrt(0.09) = 0.3}}.",
            "{{(-0.5)^3 = (-0.5) * (-0.5) * (-0.5) = -0.125}}, so {{cbrt(-0.125) = -0.5}}.",
            "0.3 + (−0.5) = −0.2.",
          ],
          commonError: "Thinking {{sqrt(0.09) = 0.03}}. Always check a root by squaring (or cubing) it back.",
          difficulty: "core",
          guideRef: "squares-cubes-roots",
          hints: [
            "Think of 0.09 as 9 hundredths. Which decimal times itself gives 0.09?",
            "Which decimal cubed gives 0.125? Think of {{5^3 = 125}}. Then remember the minus sign.",
            "Add: 0.3 + (−0.5).",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q12",
          question: "Work out {{-4^2 + (-4)^2 - (-4)^3}}.",
          answer: { type: "number", value: 64 },
          traps: [
            { spec: { type: "number", value: 96 }, feedback: "{{-4^2}} means −(4 × 4) = −16: only the 4 is squared, not the minus sign." },
            { spec: { type: "number", value: -64 }, feedback: "{{(-4)^3 = -64}}, and subtracting −64 means *adding* 64." },
          ],
          solution: [
            "{{-4^2 = -(4^2) = -16}} (only the 4 is squared).",
            "{{(-4)^2 = (-4) * (-4) = 16}}.",
            "{{(-4)^3 = (-4) * (-4) * (-4) = -64}} (three negatives give a negative).",
            "−16 + 16 − (−64) = 0 + 64 = 64.",
          ],
          commonError: "Treating {{-4^2}} as if it were {{(-4)^2}}.",
          difficulty: "core",
          guideRef: "squares-cubes-roots",
          hints: [
            "Work out each of the three powers separately. Look carefully at where the brackets are.",
            "In {{-4^2}}, is the minus sign squared too?",
            "An odd power of a negative number is negative. Then: subtracting a negative is the same as…?",
          ],
          strategy: "Work in stages",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q13",
          question: "Simplify {{(3m^4)^2}}.",
          answer: { type: "expression", expr: "9m^8", form: "simplified", display: "{{9m^8}}" },
          traps: [
            { spec: { type: "expression", expr: "3m^8" }, feedback: "The 3 is inside the bracket too, so it gets squared as well: {{3^2 = 9}}." },
            { spec: { type: "expression", expr: "9m^6" }, feedback: "A power of a power **multiplies** the indices: {{(m^4)^2 = m^4 * m^4 = m^8}}." },
          ],
          solution: [
            "{{(3m^4)^2 = 3m^4 * 3m^4}}.",
            "Numbers: 3 × 3 = 9.",
            "Letters: {{m^4 * m^4 = m^8}} (add the indices, which is the same as 4 × 2).",
            "Answer: {{9m^8}}.",
          ],
          commonError: "Forgetting to square the 3 and writing {{3m^8}}.",
          difficulty: "core",
          guideRef: "index-laws",
          hints: [
            "Write the bracket out twice: {{3m^4 * 3m^4}}.",
            "Multiply the numbers, then the powers of m.",
            "Everything inside the bracket gets squared — including the 3.",
          ],
          strategy: "Write it out in full",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q14",
          question: "Without a calculator, work out the value of {{(7^5 * 7^3)/7^6}}.",
          answer: { type: "number", value: 49 },
          traps: [
            { spec: { type: "number", value: 2 }, feedback: "You found the index: the answer is {{7^2}}. Now work out its value." },
            { spec: { type: "number", value: 14 }, feedback: "{{7^2}} means 7 × 7, not 7 × 2." },
          ],
          solution: [
            "Top: {{7^5 * 7^3 = 7^(5+3) = 7^8}}.",
            "Divide: {{7^8 ÷ 7^6 = 7^(8-6) = 7^2}}.",
            "{{7^2 = 49}}.",
          ],
          solutions: [
            {
              label: "Cancel the sevens",
              steps: [
                "The top is 5 + 3 = 8 sevens multiplied together; the bottom is 6 sevens.",
                "Six sevens cancel, leaving 7 × 7 = 49.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "index-laws",
          hints: [
            "Don't work out {{7^5}}! Use the index laws.",
            "Multiplying powers of 7: add the indices. Dividing: subtract them.",
            "You should get {{7^2}}. What is that as a number?",
          ],
          strategy: "Use the index laws",
        },
        {
          kind: "written",
          id: "integers-powers-p1-q15",
          question: "Hana says: *'0.75 and −6 are not rational numbers, because they are not fractions.'*\n\nExplain why Hana is wrong.",
          marks: 3,
          modelAnswer:
            "A rational number is any number that **can be written** as a fraction {{a/b}}, where a and b are integers and b ≠ 0. It doesn't have to be written that way already. {{0.75 = 75/100 = 3/4}}, so 0.75 is rational. {{-6 = (-6)/1}} (or {{-12/2}}), so −6 is rational too. In fact every integer and every terminating decimal is rational.",
          markScheme: [
            { point: "States the definition: a rational number can be written as a fraction of two integers", keywords: ["can be written", "fraction", "a/b", "integers", "ratio"] },
            { point: "Writes 0.75 as {{3/4}} (or {{75/100}})", keywords: ["3/4", "75/100", "three quarters"] },
            { point: "Writes −6 as a fraction, e.g. {{(-6)/1}}", keywords: ["-6/1", "−6/1", "6/1", "-12/2", "over 1"] },
          ],
          commonError: "Thinking a number is only rational if it is *written* as a fraction.",
          difficulty: "core",
          guideRef: "types-of-number",
          hints: [
            "What does 'rational' actually mean? Does the number have to *look* like a fraction?",
            "Can you write 0.75 as a fraction? What about −6?",
          ],
        },
        {
          kind: "short",
          id: "integers-powers-p1-q16",
          question: "Write {{2^(-4)}} as a fraction.",
          answer: { type: "fraction", n: 1, d: 16 },
          traps: [
            { spec: { type: "number", value: -16 }, feedback: "A negative index does not make the number negative. {{2^(-4)}} means {{1/2^4}}." },
            { spec: { type: "number", value: -8 }, feedback: "{{2^(-4)}} is not 2 × (−4). A negative index means 'one over': {{1/2^4}}." },
          ],
          solution: ["A negative index means 'one over the positive power': {{2^(-4) = 1/2^4}}.", "{{2^4 = 16}}, so {{2^(-4) = 1/16}}."],
          solutions: [
            {
              label: "Continue the pattern",
              steps: [
                "{{2^2 = 4}}, {{2^1 = 2}}, {{2^0 = 1}}: each time the index drops by 1, the value halves.",
                "Keep halving: {{2^(-1) = 1/2}}, {{2^(-2) = 1/4}}, {{2^(-3) = 1/8}}, {{2^(-4) = 1/16}}.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "negative-indices",
          hints: [
            "Write out {{2^2}}, {{2^1}}, {{2^0}}. What happens each time the index drops by 1?",
            "Keep going below zero, halving each time.",
            "{{2^(-4) = 1/2^4}}.",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q17",
          question: "Find n if {{8^3 * 4^2 = 2^n}}.",
          answer: { type: "number", value: 13 },
          traps: [
            { spec: { type: "number", value: 5 }, feedback: "You can only add indices when the bases are the same. Write 8 and 4 as powers of 2 first." },
            { spec: { type: "number", value: 10 }, feedback: "{{8 = 2^3}}, so {{8^3 = (2^3)^3 = 2^9}}: three lots of {{2^3}} is nine 2s. Multiply the indices here — don't add them." },
          ],
          solution: [
            "Write each base as a power of 2: {{8 = 2^3}} and {{4 = 2^2}}.",
            "{{8^3 = (2^3)^3 = 2^9}} and {{4^2 = (2^2)^2 = 2^4}}.",
            "{{2^9 * 2^4 = 2^13}}, so n = 13.",
          ],
          solutions: [
            {
              label: "Work out the values",
              steps: [
                "{{8^3 = 512}} and {{4^2 = 16}}, and 512 × 16 = 8192.",
                "Count powers of 2: 2, 4, 8, …, 4096, 8192, so {{8192 = 2^13}} and n = 13.",
                "Rewriting the bases is quicker — and it still works when the numbers are far too big to multiply out.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "index-laws",
          hints: [
            "The index laws only work when the bases match. Can you make every base a 2?",
            "8 and 4 are both powers of 2.",
            "{{(2^3)^3}} is three lots of {{2^3}} multiplied together. How many 2s is that?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q18",
          question:
            "In this product pyramid, each brick is the **product** of the two bricks directly below it. Find **both** possible values of x.",
          diagram: `<svg viewBox="0 0 300 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A product pyramid. Bottom row: −2, x, 3. Middle row: two empty bricks. Top brick: −54."><rect x="0" y="0" width="300" height="175" fill="#ffffff"/><text x="150" y="24" font-family="sans-serif" font-size="12" fill="#334155" text-anchor="middle">Each brick = product of the two bricks below it</text><rect x="110" y="40" width="80" height="40" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="150" y="65" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle">−54</text><rect x="70" y="80" width="80" height="40" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/><rect x="150" y="80" width="80" height="40" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/><rect x="30" y="120" width="80" height="40" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><text x="70" y="145" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle">−2</text><rect x="110" y="120" width="80" height="40" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><text x="150" y="145" font-family="sans-serif" font-size="14" font-style="italic" fill="#1f2937" text-anchor="middle">x</text><rect x="190" y="120" width="80" height="40" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><text x="230" y="145" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle">3</text></svg>`,
          answer: { type: "list", values: [3, -3], display: "x = 3 or x = −3" },
          traps: [
            { spec: { type: "list", values: [9, -9] }, feedback: "You reached {{x^2 = 9}} — now take the square root. Which numbers square to 9?" },
          ],
          solution: [
            "The middle bricks are −2 × x = −2x and x × 3 = 3x.",
            "The top brick is {{-2x * 3x = -6x^2}}.",
            "So {{-6x^2 = -54}}, which gives {{x^2 = 9}}.",
            "x = 3 or x = −3. Check x = −3: the middle bricks are 6 and −9, and 6 × (−9) = −54 ✓",
          ],
          solutions: [
            {
              label: "Trial, then ask 'what if it's negative?'",
              steps: [
                "Try x = 3: the middle bricks are −6 and 9, and −6 × 9 = −54 ✓",
                "Now try the negative: x = −3 gives middle bricks 6 and −9, and 6 × (−9) = −54 ✓",
                "The algebra method is better because it *proves* there are no other answers: {{x^2 = 9}} has exactly two solutions.",
              ],
            },
          ],
          commonError: "Finding x = 3 and stopping. Squaring hides the sign, so the negative works too.",
          difficulty: "challenge",
          guideRef: "multiplying-dividing-negatives",
          hints: [
            "Write the two middle bricks in terms of x.",
            "Multiply the two middle bricks to get the top brick, and set it equal to −54.",
            "You should reach {{x^2 = 9}}. How many numbers square to 9?",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "integers-powers-p1-q19",
          question:
            "Is this statement always, sometimes or never true? Explain your answer using examples.\n\n*The cube root of a number is smaller than the number.*",
          marks: 4,
          modelAnswer:
            "**Sometimes** true. It is true for numbers greater than 1: {{cbrt(8) = 2}}, and 2 < 8. It is false for numbers less than −1: {{cbrt(-8) = -2}}, and −2 is *bigger* than −8. It is also false for numbers between 0 and 1: {{cbrt(0.001) = 0.1}}, and 0.1 is bigger than 0.001. For 0, 1 and −1 the cube root equals the number. (It is true again for numbers between −1 and 0: {{cbrt(-0.001) = -0.1}}, which is less than −0.001.)",
          markScheme: [
            { point: "States sometimes true", keywords: ["sometimes"] },
            { point: "An example where it is true, e.g. {{cbrt(8) = 2}} and 2 < 8", keywords: ["8", "2", "27", "3", "64", "4", "true"] },
            { point: "A counterexample with a negative number, e.g. {{cbrt(-8) = -2}}, which is bigger than −8", keywords: ["-8", "−8", "-2", "−2", "negative", "-27", "−27"] },
            {
              point: "A counterexample between 0 and 1 (e.g. 0.001 → 0.1, or {{1/8}} → {{1/2}}), or notes that 0, 1 and −1 stay the same",
              keywords: ["0.001", "0.1", "1/8", "1/2", "0.125", "0.5", "between 0 and 1", "equal", "same", "1", "0"],
            },
          ],
          commonError: "Testing only positive whole numbers and concluding 'always'.",
          difficulty: "challenge",
          guideRef: "squares-cubes-roots",
          hints: [
            "Test a whole number such as 8 or 27 first.",
            "Now test a negative number such as −8. Which is bigger: −2 or −8?",
            "Then test a number between 0 and 1, such as 0.001 or {{1/8}}.",
            "Can you describe exactly which numbers make the statement true?",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "integers-powers-p1-q20",
          question: "How many digits does the number {{2^10 * 5^13}} have when it is written out in full?",
          answer: { type: "number", value: 13 },
          traps: [
            { spec: { type: "number", value: 23 }, feedback: "Don't add the indices — 2 and 5 are different bases. Instead, pair each 2 with a 5 to make a 10." },
            { spec: { type: "number", value: 10 }, feedback: "Ten (2 × 5) pairs make {{10^10}} — but there are three 5s left over, and {{5^3 = 125}} has 3 digits of its own." },
          ],
          solution: [
            "Split the 5s: {{2^10 * 5^13 = 2^10 * 5^10 * 5^3}}.",
            "Pair each 2 with a 5: ten pairs of (2 × 5) = {{10^10}}.",
            "So the number is {{5^3 * 10^10 = 125 * 10^10}}: the digits 125 followed by ten zeros.",
            "That is 3 + 10 = 13 digits.",
          ],
          solutions: [
            {
              label: "Try small cases first",
              steps: [
                "{{2^1 * 5^4 = 2 * 625 = 1250}} — that's 125 followed by one zero.",
                "{{2^2 * 5^5 = 4 * 3125 = 12500}} — 125 followed by two zeros.",
                "Each extra (2 × 5) pair adds one more zero, so {{2^10 * 5^13}} is 125 followed by ten zeros: 13 digits. Pairing is quicker; small cases are a great way to *check* it.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "index-laws",
          hints: [
            "What do you get when you multiply 2 by 5?",
            "Make as many (2 × 5) pairs as you can. How many 5s are left over?",
            "{{10^10}} is 1 followed by ten zeros. What happens when you multiply it by {{5^3}}?",
          ],
          strategy: "Make it simpler",
        },
      ],
    },
    {
      id: "integers-powers-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "integers-powers-p2-q01",
          question: "Work out 3 − 11 − (−5).",
          answer: { type: "number", value: -3 },
          traps: [
            { spec: { type: "number", value: -13 }, feedback: "Subtracting −5 means *adding* 5: −8 + 5." },
            { spec: { type: "number", value: 13 }, feedback: "3 − 11 is −8, not 8: you go 8 below zero." },
          ],
          solution: ["3 − 11 = −8.", "−8 − (−5) = −8 + 5 = −3."],
          difficulty: "warmup",
          guideRef: "adding-subtracting-negatives",
          hints: ["Do it in two steps, left to right.", "Subtracting a negative is the same as adding."],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q02",
          question: "Work out (−12) × (−5).",
          answer: { type: "number", value: 60 },
          traps: [
            { spec: { type: "number", value: -60 }, feedback: "The signs are the same, so the product is positive." },
            { spec: { type: "number", value: -17 }, feedback: "That's −12 + (−5). The question asks you to multiply." },
          ],
          solution: ["12 × 5 = 60.", "Negative × negative = positive, so (−12) × (−5) = 60."],
          difficulty: "warmup",
          guideRef: "multiplying-dividing-negatives",
          hints: ["Multiply the sizes first, then decide the sign."],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q03",
          question: "Work out {{sqrt(121) - cbrt(-8)}}.",
          answer: { type: "number", value: 13 },
          traps: [
            { spec: { type: "number", value: 9 }, feedback: "{{cbrt(-8) = -2}}, and subtracting −2 means adding 2: 11 + 2." },
          ],
          solution: [
            "{{sqrt(121) = 11}} because {{11^2 = 121}}.",
            "{{cbrt(-8) = -2}} because (−2) × (−2) × (−2) = −8.",
            "11 − (−2) = 11 + 2 = 13.",
          ],
          difficulty: "warmup",
          guideRef: "squares-cubes-roots",
          hints: ["Which number cubed gives −8? Can a cube root be negative?", "Then subtract — watch out for the double negative."],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q04",
          question: "Work out {{4^0 + 4^1 + 4^2}}.",
          answer: { type: "number", value: 21 },
          traps: [
            { spec: { type: "number", value: 20 }, feedback: "{{4^0 = 1}}, not 0: any non-zero number to the power 0 is 1." },
            { spec: { type: "number", value: 12 }, feedback: "The index is not a multiplier: {{4^2 = 4 * 4 = 16}}, not 4 × 2." },
          ],
          solution: ["{{4^0 = 1}} (any non-zero number to the power 0 is 1).", "{{4^1 = 4}} and {{4^2 = 16}}.", "1 + 4 + 16 = 21."],
          difficulty: "warmup",
          guideRef: "index-laws",
          hints: ["What is any non-zero number to the power 0?"],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q05",
          question: "Work out 30 − 12 ÷ 4 × 2.",
          answer: { type: "number", value: 24 },
          traps: [
            { spec: { type: "number", value: 9 }, feedback: "Subtraction comes after ÷ and ×. Work out 12 ÷ 4 × 2 = 6 first, then 30 − 6." },
            { spec: { type: "number", value: 28.5 }, feedback: "÷ and × have equal priority, so work left to right: 12 ÷ 4 = 3, then 3 × 2 = 6." },
          ],
          solution: ["÷ and × come before −, and are worked left to right.", "12 ÷ 4 = 3, then 3 × 2 = 6.", "30 − 6 = 24."],
          difficulty: "warmup",
          guideRef: "order-of-operations",
          hints: ["Which operations come before subtraction?", "With ÷ and × side by side, work left to right."],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q06",
          question: "Find the value of {{a - b - c}} when a = −4, b = −9 and c = 6.",
          answer: { type: "number", value: -1 },
          traps: [
            { spec: { type: "number", value: -19 }, feedback: "b is −9, so a − b = −4 − (−9) = −4 + 9. Put brackets round negative numbers when you substitute." },
            { spec: { type: "number", value: 11 }, feedback: "You need to subtract c, and c = 6: so 5 − 6." },
          ],
          solution: ["Substitute, using brackets: (−4) − (−9) − 6.", "−4 − (−9) = −4 + 9 = 5.", "5 − 6 = −1."],
          commonError: "Writing −4 − −9 as −13 by ignoring the second negative sign.",
          difficulty: "core",
          guideRef: "adding-subtracting-negatives",
          hints: [
            "Substitute each letter, putting negative numbers in brackets.",
            "What is −4 − (−9)?",
            "Then subtract 6.",
          ],
          strategy: "Work in stages",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q07",
          question: "The mean of five integers is −3. Four of the integers are 4, −7, −2 and −9. What is the fifth integer?",
          answer: { type: "number", value: -1 },
          traps: [
            { spec: { type: "number", value: -29 }, feedback: "The four integers add up to −14, so the fifth is −15 − (−14) = −15 + 14." },
            { spec: { type: "number", value: 1 }, feedback: "Check the sign: all five must total −15, and the four you know total −14, so the fifth takes the total down by 1 more." },
          ],
          solution: [
            "Total = mean × number of values: 5 × (−3) = −15.",
            "The four known integers add to 4 + (−7) + (−2) + (−9) = −14.",
            "Fifth integer: −15 − (−14) = −15 + 14 = −1.",
            "Check: (4 − 7 − 2 − 9 − 1) ÷ 5 = −15 ÷ 5 = −3 ✓",
          ],
          difficulty: "core",
          guideRef: "multiplying-dividing-negatives",
          hints: [
            "If you know the mean of five numbers, how can you find their total?",
            "5 × (−3) = −15. What do the four known integers add up to?",
            "The fifth integer is the total minus the sum of the other four.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "integers-powers-p2-q08",
          question:
            "Wei Ling multiplies together all the integers from −10 to −1:\n\n    (−10) × (−9) × (−8) × … × (−2) × (−1)\n\n(a) Without working out the product, explain whether her answer is positive or negative.\n\n(b) Jun multiplies together all the integers from −10 to 10. What is his answer? Explain.",
          marks: 3,
          modelAnswer:
            "(a) There are 10 negative numbers. Group them in pairs: each pair of negatives multiplies to a positive, and 10 negatives make 5 pairs, so the product is **positive**. (An even number of negative factors always gives a positive product.)\n\n(b) Jun's list includes 0, and anything multiplied by 0 is 0, so his answer is **0**.",
          markScheme: [
            { point: "Counts 10 negative factors (an even number)", keywords: ["10", "ten", "even"] },
            { point: "Explains that the negatives pair up to give positives, so the product is positive", keywords: ["pair", "pairs", "positive", "even number"] },
            { point: "Jun's answer is 0, because 0 is one of the numbers he multiplies", keywords: ["0", "zero"] },
          ],
          commonError: "Saying 'negative, because all the numbers are negative'. It is *how many* negatives there are that decides the sign.",
          difficulty: "core",
          guideRef: "multiplying-dividing-negatives",
          hints: [
            "How many negative numbers is Wei Ling multiplying?",
            "What is the sign of two negatives multiplied? Of four? Of six?",
            "For Jun: look carefully at which integers lie between −10 and 10.",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q09",
          question: "Work out {{(6 + sqrt(36))/(cbrt(-8) * 3)}}.",
          answer: { type: "number", value: -2 },
          traps: [
            { spec: { type: "number", value: 2 }, feedback: "{{cbrt(-8) = -2}}, so the bottom is −6 and the answer is negative." },
            { spec: { type: "number", value: 5 }, feedback: "The fraction bar works like brackets: work out the *whole* top (12) and the *whole* bottom (−6) before dividing." },
          ],
          solution: [
            "Top: {{6 + sqrt(36) = 6 + 6 = 12}}.",
            "Bottom: {{cbrt(-8) * 3 = -2 * 3 = -6}}.",
            "12 ÷ (−6) = −2.",
          ],
          difficulty: "core",
          guideRef: "order-of-operations",
          hints: [
            "A fraction bar acts like brackets around the top and around the bottom.",
            "Work out the top and the bottom separately.",
            "What is the cube root of −8?",
          ],
          strategy: "Work in stages",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q10",
          question: "What number goes in the box?\n\n    4 + 2 × ▢ = −10",
          answer: { type: "number", value: -7 },
          traps: [
            { spec: { type: "number", value: -3 }, feedback: "To undo '+ 4' you subtract 4: −10 − 4 = −14, not −6." },
            { spec: { type: "fraction", n: -5, d: 3 }, feedback: "Multiplication happens before addition, so the 2 multiplies the box on its own — it isn't (4 + 2) × ▢." },
          ],
          solution: [
            "The multiplication happens first, so read it as 4 + (2 × ▢) = −10.",
            "Undo + 4: 2 × ▢ = −10 − 4 = −14.",
            "Undo × 2: ▢ = −14 ÷ 2 = −7.",
            "Check: 4 + 2 × (−7) = 4 − 14 = −10 ✓",
          ],
          difficulty: "core",
          guideRef: "order-of-operations",
          hints: ["Which happens first: the + or the ×?", "Work backwards: what must 2 × ▢ be?", "−10 − 4 = −14."],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "integers-powers-p2-q11",
          question:
            "Mei says: *'{{sqrt(16)}} and {{sqrt(17)}} are both irrational, because they are square roots.'*\n\nIs Mei right about each number? Explain.",
          marks: 3,
          modelAnswer:
            "Mei is wrong about {{sqrt(16)}}: {{sqrt(16) = 4}}, which is a natural number, so it is rational ({{4 = 4/1}}). Having a √ sign does not make a number irrational — simplify first.\n\nShe is right about {{sqrt(17)}}: 17 is not a square number (16 < 17 < 25, so {{sqrt(17)}} lies between 4 and 5 and is not a whole number). The square root of a whole number that is not a square number is irrational: its decimal never ends and never repeats.",
          markScheme: [
            { point: "States that {{sqrt(16) = 4}}", keywords: ["4", "√16 = 4", "sqrt(16) = 4"] },
            { point: "So {{sqrt(16)}} is rational (natural number / integer / {{4/1}}): Mei is wrong about it", keywords: ["rational", "natural", "integer", "4/1", "wrong"] },
            {
              point: "{{sqrt(17)}} is irrational because 17 is not a square number",
              keywords: ["not a square", "17 is not", "irrational", "between 4 and 5", "never ends", "never repeats"],
            },
          ],
          commonError: "Thinking every number written with a √ sign is irrational.",
          difficulty: "core",
          guideRef: "types-of-number",
          hints: [
            "Work out {{sqrt(16)}}. What kind of number is it?",
            "Is 17 a square number?",
            "Which square roots of whole numbers are irrational?",
          ],
        },
        {
          kind: "short",
          id: "integers-powers-p2-q12",
          question: "The integer n satisfies {{n^2 = 196}} and {{n^3 < 0}}. Find n.",
          answer: { type: "number", value: -14 },
          traps: [
            { spec: { type: "number", value: 14 }, feedback: "{{14^3}} is positive. Both 14 and −14 square to 196 — which one has a negative cube?" },
            { spec: { type: "number", value: 98 }, feedback: "Square rooting is not halving. Which number multiplied by itself gives 196?" },
          ],
          solution: [
            "{{n^2 = 196}} means n = 14 or n = −14, because {{14^2 = 196}} and {{(-14)^2 = 196}}.",
            "{{14^3}} is positive, but {{(-14)^3}} is negative (three negative factors).",
            "So n = −14.",
          ],
          difficulty: "core",
          guideRef: "squares-cubes-roots",
          hints: ["Which two integers square to 196?", "Which of those two has a negative cube? Think about three negatives multiplied together."],
          strategy: "Eliminate options",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q13",
          question: "Without a calculator, find the whole number that is closest to {{sqrt(110)}}.",
          answer: { type: "number", value: 10 },
          traps: [
            {
              spec: { type: "number", value: 11 },
              feedback: "110 lies between {{10^2 = 100}} and {{11^2 = 121}}. Test the halfway point: {{10.5^2 = 110.25}}, which is more than 110, so {{sqrt(110)}} is below 10.5.",
            },
            { spec: { type: "number", value: 55 }, feedback: "Square rooting is not halving. Which number squared is close to 110?" },
          ],
          solution: [
            "{{10^2 = 100}} and {{11^2 = 121}}, so {{sqrt(110)}} is between 10 and 11.",
            "To decide which is closer, test the halfway point: {{10.5^2 = 110.25}}.",
            "110 < 110.25, so {{sqrt(110) < 10.5}}.",
            "The closest whole number is 10. (In fact {{sqrt(110) ~= 10.49}}.)",
          ],
          commonError: "Assuming that 'between 10 and 11' means the answer is 11.",
          difficulty: "core",
          guideRef: "squares-cubes-roots",
          hints: [
            "Which square numbers lie either side of 110?",
            "It's between 10 and 11 — but which is closer? Try squaring 10.5.",
            "{{10.5^2 = 110.25}}. Is {{sqrt(110)}} above or below 10.5?",
          ],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q14",
          question: "Simplify {{(p^3)^4 ÷ p^5}}.",
          answer: { type: "expression", expr: "p^7", form: "simplified", display: "{{p^7}}" },
          traps: [
            { spec: { type: "expression", expr: "p^2" }, feedback: "{{(p^3)^4}} is four lots of {{p^3}} multiplied together, which is {{p^12}}. For a power of a power, multiply the indices." },
          ],
          solution: ["Power of a power: {{(p^3)^4 = p^(3 * 4) = p^12}}.", "Divide: {{p^12 ÷ p^5 = p^(12-5) = p^7}}."],
          difficulty: "core",
          guideRef: "index-laws",
          hints: [
            "Write {{(p^3)^4}} as {{p^3 * p^3 * p^3 * p^3}}.",
            "How many p's is that altogether?",
            "Now divide by {{p^5}}: subtract the indices.",
          ],
          strategy: "Use the index laws",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q15",
          question: "Simplify fully {{(a^4 b^2 * a b^3)/(a^5 b^5)}}. Your answer should be a single number.",
          answer: { type: "number", value: 1 },
          traps: [
            { spec: { type: "number", value: 0 }, feedback: "{{a^0}} is 1, not 0: anything (except 0) divided by itself is 1." },
          ],
          solution: [
            "Top: {{a^4 * a = a^5}} (a on its own means {{a^1}}) and {{b^2 * b^3 = b^5}}, so the top is {{a^5 b^5}}.",
            "Divide: {{a^5 ÷ a^5 = a^0 = 1}} and {{b^5 ÷ b^5 = b^0 = 1}}.",
            "So the whole expression simplifies to 1 × 1 = 1.",
          ],
          solutions: [
            {
              label: "Spot it straight away",
              steps: [
                "Once the top simplifies to {{a^5 b^5}}, the top and the bottom are identical.",
                "Anything (non-zero) divided by itself is 1 — which is exactly why {{a^0 = 1}}.",
              ],
            },
          ],
          commonError: "Writing {{a^0 = 0}}, or forgetting that a on its own means {{a^1}} (which gives {{a^4}} on top instead of {{a^5}}).",
          difficulty: "core",
          guideRef: "index-laws",
          hints: [
            "Simplify the top first, dealing with the a's and the b's separately.",
            "a on its own means {{a^1}}.",
            "Compare the top with the bottom. What is {{a^5 ÷ a^5}}?",
          ],
          strategy: "Use the index laws",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q16",
          question: "Work out {{2^(-1) + 4^(-1)}}. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 3, d: 4, simplest: true },
          traps: [
            { spec: { type: "number", value: -6 }, feedback: "A negative index doesn't make a number negative: {{2^(-1) = 1/2}}." },
            { spec: { type: "fraction", n: 1, d: 6 }, feedback: "You can't add the bases first. Find each one separately — {{2^(-1) = 1/2}} and {{4^(-1) = 1/4}} — then add the fractions." },
          ],
          solution: [
            "An index of −1 gives the reciprocal: {{2^(-1) = 1/2}} and {{4^(-1) = 1/4}}.",
            "{{1/2 + 1/4 = 2/4 + 1/4 = 3/4}}.",
          ],
          difficulty: "core",
          guideRef: "negative-indices",
          hints: [
            "What does an index of −1 do to a number?",
            "{{2^(-1) = 1/2}}. So what is {{4^(-1)}}?",
            "Add the two fractions using a common denominator.",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q17",
          question: "Work out {{1^3 + 2^3 + 3^3 + ... + 10^3}}.",
          answer: { type: "number", value: 3025 },
          traps: [
            { spec: { type: "number", value: 385 }, feedback: "385 is {{1^2 + 2^2 + ... + 10^2}}, the sum of the *squares*. You need the cubes." },
            { spec: { type: "number", value: 55 }, feedback: "55 is 1 + 2 + … + 10. You need to add the *cubes* of these numbers." },
          ],
          solution: [
            "Look at the running totals: 1, 1 + 8 = 9, 9 + 27 = 36, 36 + 64 = 100, 100 + 125 = 225, …",
            "They are all square numbers: {{1^2}}, {{3^2}}, {{6^2}}, {{10^2}}, {{15^2}}, … and 1, 3, 6, 10, 15 are the totals 1, 1 + 2, 1 + 2 + 3, …",
            "So {{1^3 + 2^3 + ... + 10^3 = (1 + 2 + ... + 10)^2 = 55^2}}.",
            "{{55^2 = 3025}}.",
          ],
          solutions: [
            {
              label: "Add them up directly",
              steps: [
                "The cubes are 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.",
                "Running totals: 1, 9, 36, 100, 225, 441, 784, 1296, 2025, 3025.",
                "Answer 3025. Adding directly is fine for ten terms, but the pattern is slicker: it gives {{1^3 + 2^3 + ... + 100^3 = 5050^2}} just as easily.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "squares-cubes-roots",
          hints: [
            "Work out the running totals: {{1^3}}, then {{1^3 + 2^3}}, then {{1^3 + 2^3 + 3^3}}, …",
            "Do the running totals 1, 9, 36, 100, … remind you of anything?",
            "They are square numbers: {{1^2}}, {{3^2}}, {{6^2}}, {{10^2}}, … What is special about 1, 3, 6, 10?",
            "1 + 2 + … + 10 = 55.",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "written",
          id: "integers-powers-p2-q18",
          question:
            "Ravi writes {{2^3 + 2^4 = 2^7}}. Hana says Ravi is wrong, but that {{2^3 + 2^3 = 2^4}} is correct.\n\n(a) Show that Ravi is wrong.\n\n(b) Explain why Hana's statement is correct.\n\n(c) Write {{2^3 + 2^4}} in the form {{k * 2^3}}, where k is a whole number.",
          marks: 4,
          modelAnswer:
            "(a) {{2^3 + 2^4 = 8 + 16 = 24}}, but {{2^7 = 128}}, so Ravi is wrong. The 'add the indices' law is for **multiplying** powers of the same base, not adding them.\n\n(b) {{2^3 + 2^3}} is two lots of {{2^3}}: {{2 * 2^3 = 2^1 * 2^3 = 2^4}}. Check: 8 + 8 = 16 = {{2^4}} ✓\n\n(c) {{2^4 = 2 * 2^3}}, so {{2^3 + 2^4 = 1 * 2^3 + 2 * 2^3 = 3 * 2^3}}. Check: 3 × 8 = 24 ✓",
          markScheme: [
            { point: "Shows {{2^3 + 2^4 = 24}} but {{2^7 = 128}}", keywords: ["24", "128", "8 + 16"] },
            { point: "States the 'add the indices' law is for multiplying, not adding", keywords: ["multiply", "multiplying", "not adding", "times", "product"] },
            { point: "Explains {{2^3 + 2^3 = 2 * 2^3 = 2^4}} (or 8 + 8 = 16)", keywords: ["2 × 2^3", "2 x 2^3", "two lots", "2 lots", "double", "16", "8 + 8"] },
            { point: "Writes {{2^3 + 2^4 = 3 * 2^3}}", keywords: ["3 × 2^3", "3 x 2^3", "k = 3", "3"] },
          ],
          commonError: "Thinking the index laws work for adding — they only work for multiplying and dividing.",
          difficulty: "challenge",
          guideRef: "index-laws",
          hints: [
            "Work out both sides of Ravi's equation as ordinary numbers.",
            "{{2^3 + 2^3}} is 'two lots of {{2^3}}'. How else can you write two lots of something?",
            "{{2^4 = 2 * 2^3}}. So how many lots of {{2^3}} are there in {{2^3 + 2^4}}?",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "written",
          id: "integers-powers-p2-q19",
          question:
            "Is this statement always, sometimes or never true? Explain your answer using examples.\n\n*If a > b, then {{a^2 > b^2}}.*",
          marks: 4,
          modelAnswer:
            "**Sometimes** true. When both numbers are positive it works: 5 > 2 and 25 > 4. But it can fail when negative numbers are involved: 1 > −3, yet {{1^2 = 1}} and {{(-3)^2 = 9}}, so {{a^2 < b^2}}. It even fails when both are negative: −2 > −5, but 4 < 25. Squaring throws away the sign, so what decides which square is bigger is the **distance from zero**: {{a^2 > b^2}} exactly when a is further from 0 than b.",
          markScheme: [
            { point: "States sometimes true", keywords: ["sometimes"] },
            { point: "An example where it is true (e.g. both positive: 5 > 2 and 25 > 4)", keywords: ["5", "25", "positive", "3", "9", "true"] },
            { point: "A counterexample involving a negative number (e.g. 1 > −3 but 1 < 9)", keywords: ["negative", "-3", "−3", "-5", "−5", "counterexample", "9", "25"] },
            { point: "Explains why: squaring removes the sign, so it depends on distance from zero (size)", keywords: ["distance", "sign", "size", "further from 0", "further from zero", "positive"] },
          ],
          commonError: "Testing only positive numbers and concluding 'always'.",
          difficulty: "challenge",
          guideRef: "squares-cubes-roots",
          hints: [
            "Try two positive numbers first.",
            "Now try a positive a and a negative b, for example a = 1 and b = −3.",
            "What does squaring do to the sign of a number? What really decides which square is bigger?",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "integers-powers-p2-q20",
          question: "Find n if {{4^5 + 4^5 + 4^5 + 4^5 = 2^n}}.",
          answer: { type: "number", value: 12 },
          traps: [
            { spec: { type: "number", value: 40 }, feedback: "Adding four equal powers doesn't add their indices. {{4^5 + 4^5 + 4^5 + 4^5 = 4 * 4^5}}." },
            { spec: { type: "number", value: 6 }, feedback: "{{4^6}} is right — but the question asks for a power of **2**. Since {{4 = 2^2}}, {{4^6 = 2^12}}." },
          ],
          solution: [
            "Four equal terms: {{4^5 + 4^5 + 4^5 + 4^5 = 4 * 4^5}}.",
            "{{4 * 4^5 = 4^1 * 4^5 = 4^6}}.",
            "Since {{4 = 2^2}}: {{4^6 = (2^2)^6 = 2^12}}.",
            "So n = 12.",
          ],
          solutions: [
            {
              label: "Powers of 2 from the start",
              steps: [
                "{{4^5 = (2^2)^5 = 2^10}}.",
                "Four lots of {{2^10}} is {{2^2 * 2^10 = 2^12}}.",
                "n = 12. Both routes are equally quick — the key step is turning 'four lots of' into '× 4'.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "index-laws",
          hints: [
            "Adding the same thing four times is the same as multiplying by…?",
            "So the left side is {{4 * 4^5}}. Write that as a single power of 4.",
            "Now write 4 as {{2^2}}.",
          ],
          strategy: "Make it simpler",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE — 10 AoPS / UKMT-style problems (7 short, 3 written), all "challenge"
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "integers-powers-ch-q01",
      question: "Five **different** integers multiply together to give 12. What is their sum?",
      answer: { type: "number", value: 3 },
      traps: [
        { spec: { type: "number", value: -3 }, feedback: "Check the sign of your product: 1 × (−1) × 2 × (−2) × (−3) = −12, not 12." },
      ],
      solution: [
        "Each number is a factor of 12, and negatives are allowed. Think about the **sizes** of the five numbers (ignoring signs).",
        "Only two different integers have size 1 (1 and −1), and only two have size 2 (2 and −2). So, from smallest to largest, the five sizes are at least 1, 1, 2, 2 and 3.",
        "Those smallest possible sizes already multiply to 1 × 1 × 2 × 2 × 3 = 12. Making any size bigger would make the product too big, so the sizes must be exactly 1, 1, 2, 2, 3.",
        "So the numbers are 1, −1, 2, −2 and either 3 or −3. Since 1 × (−1) × 2 × (−2) = 4, the last number must be +3 to give 12.",
        "Sum: 1 + (−1) + 2 + (−2) + 3 = 3.",
      ],
      solutions: [
        {
          label: "Build it up",
          steps: [
            "Start with 1 and −1: they use up two different numbers without making the product any bigger. Their product is −1.",
            "Now you need three more different integers whose product is −12. Using the smallest sizes available, try 2, −2 and 3: 2 × (−2) × 3 = −12 ✓",
            "The numbers are 1, −1, 2, −2, 3, with sum 3.",
            "This finds the answer quickly, but the size argument is slicker because it also *proves* that no other set of five different integers works.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "multiplying-dividing-negatives",
      hints: [
        "Every one of the five numbers must be a factor of 12 — but negative factors are allowed.",
        "Numbers of size 1 don't make the product bigger. How many *different* integers have size 1? Size 2?",
        "The five smallest possible sizes are 1, 1, 2, 2, 3. What is their product?",
        "Now choose the signs so that the product is +12, not −12.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q02",
      question:
        "For any two numbers a and b, the operation ★ is defined by {{a ★ b = a^2 - 3b}}. For example, {{4 ★ 1 = 4^2 - 3 * 1 = 13}}.\n\nFind **all** the integers x for which {{x ★ x = 10}}.",
      answer: { type: "list", values: [5, -2], display: "x = 5 or x = −2" },
      traps: [
        { spec: { type: "list", values: [5, 2] }, feedback: "Check x = 2: {{2^2 - 3 * 2 = 4 - 6 = -2}}, not 10. Try negative values of x." },
      ],
      solution: [
        "{{x ★ x = x^2 - 3x}}, so we need {{x^2 - 3x = 10}}.",
        "Factorise the left side: {{x(x - 3) = 10}}. So x and x − 3 are two integers, 3 apart, that multiply to 10.",
        "Integer pairs with product 10: 1 × 10, 2 × 5, (−1) × (−10), (−2) × (−5). The pairs where one number is exactly 3 more than the other are 5 and 2, and −2 and −5.",
        "So x = 5 (with x − 3 = 2) or x = −2 (with x − 3 = −5).",
        "Check: {{5^2 - 3 * 5 = 25 - 15 = 10}} ✓ and {{(-2)^2 - 3 * (-2) = 4 + 6 = 10}} ✓",
      ],
      solutions: [
        {
          label: "Table, with a reason to stop",
          steps: [
            "Work out {{x^2 - 3x}} for x = −3 to 6: 18, 10, 4, 0, −2, −2, 0, 4, 10, 18.",
            "So x = −2 and x = 5 both give 10.",
            "For x ≥ 6 or x ≤ −3 the value is already 18 or more and keeps growing as you move further out, so there are no other solutions.",
            "The factor-pair method is slicker: it finds both answers at once and shows there are no others without a long table.",
          ],
        },
      ],
      commonError: "Stopping after x = 5, or working out {{(-2)^2}} as −4.",
      difficulty: "challenge",
      guideRef: "order-of-operations",
      hints: [
        "Write {{x ★ x}} in terms of x. Careful: here b is x as well.",
        "You need {{x^2 - 3x = 10}}. Try some positive values of x — then some negative ones, using brackets.",
        "{{x^2 - 3x = x(x - 3)}}: you need two integers that differ by 3 and multiply to 10.",
        "Don't stop at one answer. Negative × negative is positive.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q03",
      question: "You are told that {{2^x = 5}}. Find the value of {{4^x + 8^x}}.",
      answer: { type: "number", value: 150 },
      traps: [
        { spec: { type: "number", value: 60 }, feedback: "{{4^x}} is not 4 × 5. Write 4 as {{2^2}}: then {{4^x = (2^2)^x = (2^x)^2}}." },
        { spec: { type: "number", value: 25 }, feedback: "{{4^x = 2^(2x)}}, which is {{(2^x)^2}} — you need to *square* {{2^x}}, not double it." },
      ],
      solution: [
        "You never need to find x itself. Write everything in terms of {{2^x}} using the power-of-a-power law.",
        "{{4^x = (2^2)^x = 2^(2x) = (2^x)^2 = 5^2 = 25}}.",
        "{{8^x = (2^3)^x = 2^(3x) = (2^x)^3 = 5^3 = 125}}.",
        "{{4^x + 8^x = 25 + 125 = 150}}.",
      ],
      commonError: "Trying to find x first. It isn't a whole number ({{2^2 = 4}} and {{2^3 = 8}}, so x is between 2 and 3) — and you don't need it.",
      difficulty: "challenge",
      guideRef: "index-laws",
      hints: [
        "Don't try to find x! Can you write {{4^x}} using {{2^x}}?",
        "{{4 = 2^2}}, so {{4^x = (2^2)^x = 2^(2x)}}. Now write {{2^(2x)}} as a power of {{2^x}}.",
        "{{4^x = (2^x)^2 = 5^2}}. Do the same for {{8^x}}, using {{8 = 2^3}}.",
        "Add your two answers.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q04",
      question: "What is the units digit (last digit) of {{7^2026 + 3^2026}}?",
      answer: { type: "number", value: 8 },
      traps: [
        { spec: { type: "number", value: 0 }, feedback: "7 + 3 = 10 ends in 0, but that only works for the first powers. Find the last digits of {{7^2026}} and {{3^2026}} separately." },
        { spec: { type: "number", value: 9 }, feedback: "That's the last digit of each power — but you need the last digit of their *sum*: 9 + 9 = 18." },
      ],
      solution: [
        "Last digits of powers of 7: 7, 9, 3, 1, 7, 9, … — a cycle of length 4.",
        "Last digits of powers of 3: 3, 9, 7, 1, 3, 9, … — also a cycle of length 4.",
        "2026 = 4 × 506 + 2, so both powers sit in position 2 of their cycles: {{7^2026}} ends in 9 and {{3^2026}} ends in 9.",
        "9 + 9 = 18, so the sum ends in 8.",
      ],
      solutions: [
        {
          label: "Turn it into powers of 49 and 9",
          steps: [
            "{{7^2026 = (7^2)^1013 = 49^1013}} and {{3^2026 = (3^2)^1013 = 9^1013}}.",
            "Only last digits matter, and 49 and 9 both end in 9.",
            "Powers of a number ending in 9 end in 9, 1, 9, 1, …: odd powers end in 9. 1013 is odd, so both end in 9.",
            "9 + 9 = 18, so the units digit is 8. This is slicker: no remainder needed, just a cycle of length 2.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "index-laws",
      hints: [
        "You can't work out {{7^2026}}! Only the last digit matters — look for a pattern.",
        "List the last digits of {{7^1}}, {{7^2}}, {{7^3}}, {{7^4}}, {{7^5}}. Then do the same for powers of 3.",
        "Both patterns repeat every 4. Where does the power 2026 land in each cycle?",
        "Add the two last digits — then keep only the last digit of that sum.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q05",
      question: "Work out {{1^2 - 2^2 + 3^2 - 4^2 + 5^2 - 6^2 + ... + 19^2 - 20^2}}.",
      answer: { type: "number", value: -210 },
      traps: [
        { spec: { type: "number", value: 210 }, feedback: "Each pair, such as {{1^2 - 2^2 = -3}}, is negative — so the total must be negative." },
      ],
      solution: [
        "Group the terms in pairs: {{(1^2 - 2^2) + (3^2 - 4^2) + ... + (19^2 - 20^2)}}.",
        "Work out the pairs: 1 − 4 = −3, 9 − 16 = −7, 25 − 36 = −11, … Each pair is 4 less than the one before.",
        "The ten pairs are −3, −7, −11, −15, −19, −23, −27, −31, −35, −39.",
        "Pair them from the outside in: (−3) + (−39) = −42, (−7) + (−35) = −42, and so on — five lots of −42.",
        "Total: 5 × (−42) = −210.",
      ],
      solutions: [
        {
          label: "Difference of consecutive squares",
          steps: [
            "Notice {{3^2 - 4^2 = 9 - 16 = -7 = -(3 + 4)}}. In general the gap between consecutive squares is the sum of the two numbers: {{(n+1)^2 - n^2 = n + (n + 1)}}.",
            "So every pair equals minus the sum of its two numbers, and the whole expression is {{-(1 + 2 + 3 + ... + 20)}}.",
            "{{1 + 2 + ... + 20 = (20 * 21)/2 = 210}}.",
            "Answer: −210. This is slicker — it turns a sum of squares into the simple sum 1 + 2 + … + 20.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "squares-cubes-roots",
      hints: [
        "Group the terms in pairs: {{1^2 - 2^2}}, {{3^2 - 4^2}}, …",
        "Work out the first few pairs. What pattern do you see?",
        "Compare {{3^2 - 4^2}} with 3 + 4. Is there a link?",
        "Add up the ten pairs — or add up 1 + 2 + … + 20 and put a minus sign in front.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q06",
      question:
        "How many of the whole numbers from 1 to 1000 (including 1000) are square numbers **or** cube numbers (or both)?",
      answer: { type: "number", value: 38 },
      traps: [
        { spec: { type: "number", value: 41 }, feedback: "Some numbers are both a square and a cube, like {{64 = 8^2 = 4^3}}. You've counted those twice." },
        { spec: { type: "number", value: 39 }, feedback: "Close! Check the numbers that are both squares and cubes again: 1, 64 and one more below 1000." },
      ],
      solution: [
        "Squares: {{1^2, 2^2, ..., 31^2}}, because {{31^2 = 961}} but {{32^2 = 1024}}. That is 31 numbers.",
        "Cubes: {{1^3, 2^3, ..., 10^3 = 1000}}. That is 10 numbers.",
        "A number that is both a square and a cube is a sixth power: {{1^6 = 1}}, {{2^6 = 64}}, {{3^6 = 729}} ({{4^6 = 4096}} is too big). These 3 numbers were counted twice.",
        "Total: 31 + 10 − 3 = 38.",
      ],
      solutions: [
        {
          label: "Check each cube",
          steps: [
            "Instead of thinking about sixth powers, test each of the 10 cubes to see whether it is also a square: 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.",
            "The squares among them are 1 = {{1^2}}, 64 = {{8^2}} and 729 = {{27^2}}: 3 overlaps.",
            "31 + 10 − 3 = 38. The sixth-power idea is slicker: it explains *why* the overlaps are 1, 64 and 729, and it works for much bigger ranges.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "squares-cubes-roots",
      hints: [
        "Count the squares up to 1000 first. What is the biggest one?",
        "Now count the cubes. Is 1000 itself a cube?",
        "Some numbers are on both lists. What kind of power is both a square and a cube?",
        "Total = squares + cubes − (numbers counted twice).",
      ],
      strategy: "Count systematically",
    },
    {
      kind: "short",
      id: "integers-powers-ch-q07",
      question:
        "Write {{2^(-1) + 2^(-2) + 2^(-3) + ... + 2^(-10)}} as a single fraction in its simplest form.",
      answer: { type: "fraction", n: 1023, d: 1024, simplest: true },
      traps: [
        { spec: { type: "number", value: 1 }, feedback: "The total gets closer and closer to 1, but each term only fills half of the gap that is left — so it never quite reaches 1." },
        { spec: { type: "fraction", n: 1, d: 1024 }, feedback: "{{1/1024}} is the gap that is left over — the total is 1 minus that gap." },
      ],
      solution: [
        "Rewrite without negative indices: {{1/2 + 1/4 + 1/8 + ... + 1/1024}}, since {{2^(-n) = 1/2^n}} and {{2^10 = 1024}}.",
        "Running totals: {{1/2}}, {{3/4}}, {{7/8}}, {{15/16}}, … Each running total is 1 minus the last term added.",
        "So after the last term, {{1/1024}}, the total is {{1 - 1/1024 = 1023/1024}}.",
      ],
      solutions: [
        {
          label: "Double and subtract",
          steps: [
            "Call the sum S. Doubling every term gives {{2S = 1 + 1/2 + 1/4 + ... + 1/512}}.",
            "Subtract S from 2S: almost everything cancels, leaving {{2S - S = 1 - 1/1024}}.",
            "So {{S = 1023/1024}}. This is slicker for long sums; the running-total pattern is easier to *see*, especially if you picture a square being cut in half again and again.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "negative-indices",
      hints: [
        "Rewrite each term without a negative index: {{2^(-1) = 1/2}}, {{2^(-2) = 1/4}}, …",
        "Find the running totals: {{1/2}}, then {{1/2 + 1/4}}, then {{1/2 + 1/4 + 1/8}}, … What do you notice?",
        "Each running total is just short of 1. By how much?",
        "After the last term, {{1/1024}}, the total is {{1 - 1/1024}}.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "written",
      id: "integers-powers-ch-q08",
      question:
        "The numbers 1, 2, 3, …, 10 are written on a board. A **move** is: choose any two numbers a and b on the board, rub them out, and write {{a - b}} in their place (it may be negative).\n\nAfter 9 moves only one number is left. Prove that this number can never be 0.",
      marks: 4,
      modelAnswer:
        "Look at the **total** of all the numbers on the board. At the start it is 1 + 2 + … + 10 = 55, which is odd.\n\nIn a move, a and b (which add to {{a + b}}) are replaced by {{a - b}}. So the total changes by {{(a - b) - (a + b) = -2b}}, which is an even number. Every move changes the total by an even amount, so the total stays **odd** after every move.\n\nAt the end the total is just the one number left, so that number is odd. 0 is even, so the last number can never be 0.",
      markScheme: [
        { point: "Considers the total of the numbers on the board (or whether it is odd or even)", keywords: ["sum", "total", "add up", "parity", "odd", "even"] },
        { point: "The starting total is 55, which is odd", keywords: ["55", "odd"] },
        {
          point: "Shows each move changes the total by an even amount ({{-2b}}), so it stays odd",
          keywords: ["-2b", "−2b", "2b", "even", "changes by", "stays odd", "same parity", "invariant"],
        },
        { point: "Concludes the final number is odd, so it cannot be 0", keywords: ["odd", "cannot be 0", "can't be 0", "never 0", "not 0", "0 is even"] },
      ],
      solutions: [
        {
          label: "Count the odd numbers",
          steps: [
            "Track how many **odd** numbers are on the board. At the start there are 5 (1, 3, 5, 7, 9).",
            "Check each case. Both a and b odd: {{a - b}} is even, so the count of odd numbers drops by 2. One odd, one even: {{a - b}} is odd, so the count stays the same. Both even: {{a - b}} is even, so the count stays the same.",
            "So the number of odd numbers stays odd (5, 3, 1, …) and never reaches 0. At the end the single number left must be odd, so it is not 0.",
            "The total-sum argument is slicker: one line of algebra instead of three cases.",
          ],
        },
      ],
      commonError: "Trying a few sequences of moves and saying 'it never came out as 0'. Examples can't prove something *never* happens — you need a reason that works for every possible sequence of moves.",
      difficulty: "challenge",
      guideRef: "adding-subtracting-negatives",
      hints: [
        "Try a smaller version first: 1, 2, 3 on the board. Which final numbers can you get?",
        "Look for something that does *not* change when you make a move — an invariant. Try looking at the total of the numbers.",
        "a and b are replaced by {{a - b}}. By how much does the total change? Is that change odd or even?",
        "The total starts at 55. What can you say about it at the end?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "written",
      id: "integers-powers-ch-q09",
      question:
        "Jun writes this 'proof':\n\n    Line 1:   {{(-3)^2 = 9}} and {{3^2 = 9}}\n    Line 2:   so {{(-3)^2 = 3^2}}\n    Line 3:   square root both sides, so −3 = 3\n\nThe conclusion is obviously false. Find the line with the mistake, explain what goes wrong, and say what you can correctly conclude from Line 2.",
      marks: 3,
      modelAnswer:
        "Lines 1 and 2 are correct: {{(-3)^2 = 9 = 3^2}}. The mistake is in **Line 3**, the square-root step. The symbol √ means the **positive** square root, so {{sqrt((-3)^2) = sqrt(9) = 3}}, not −3. Squaring loses the sign: two different numbers, 3 and −3, have the same square. So from {{a^2 = b^2}} you can only conclude that **a = b or a = −b**. Here that gives −3 = −(3), which is true.",
      markScheme: [
        { point: "Identifies Line 3 (the square-rooting step) as the mistake", keywords: ["line 3", "square root", "third", "last step", "sqrt", "√"] },
        { point: "Explains that {{sqrt(9) = 3}} (the positive root), so {{sqrt((-3)^2)}} is 3, not −3", keywords: ["positive", "√9 = 3", "sqrt(9) = 3", "3 not -3", "3 not −3"] },
        {
          point: "States that {{a^2 = b^2}} means a = b or a = −b (squaring loses the sign)",
          keywords: ["a = -b", "a = −b", "or", "two square roots", "plus or minus", "±", "loses the sign", "same square"],
        },
      ],
      commonError: "Saying 'you can't square a negative number'. You can: {{(-3)^2 = 9}} is perfectly correct.",
      difficulty: "challenge",
      guideRef: "squares-cubes-roots",
      hints: [
        "Check each line on its own. Which lines are definitely true?",
        "What is {{sqrt(9)}}? Is it 3, −3, or both?",
        "If two numbers have the same square, must they be equal? Think of 5 and −5.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "written",
      id: "integers-powers-ch-q10",
      question:
        "Is this statement always, sometimes or never true? Explain, with examples.\n\n*The product of two irrational numbers is irrational.*\n\n(You may use the fact that the square root of a whole number that is not a square number is irrational.)",
      marks: 3,
      modelAnswer:
        "**Sometimes** true.\n\nIt can be true: {{sqrt(2) * sqrt(3) = sqrt(6)}} (check: {{(sqrt(2) * sqrt(3))^2 = 2 * 3 = 6}}). 6 is not a square number, so {{sqrt(6)}} is irrational.\n\nBut it can be false: {{sqrt(2) * sqrt(2) = 2}}, which is rational ({{2 = 2/1}}). Another counterexample with two *different* irrational numbers: {{sqrt(2) * sqrt(8) = sqrt(16) = 4}}.\n\nSo the product of two irrational numbers can be either rational or irrational.",
      markScheme: [
        { point: "States sometimes true", keywords: ["sometimes"] },
        { point: "An example where the product is irrational, e.g. {{sqrt(2) * sqrt(3) = sqrt(6)}}", keywords: ["√6", "sqrt(6)", "root 6", "√2 × √3", "irrational"] },
        {
          point: "A counterexample where the product is rational, e.g. {{sqrt(2) * sqrt(2) = 2}} or {{sqrt(2) * sqrt(8) = 4}}",
          keywords: ["√2 × √2", "sqrt(2) * sqrt(2)", "√8", "sqrt(8)", "√16", "2", "4", "rational"],
        },
      ],
      solutions: [
        {
          label: "Build your own counterexample",
          steps: [
            "Pick any irrational number, say {{sqrt(5)}}. Ask: what must I multiply it by to get a whole number?",
            "{{sqrt(5) * sqrt(5) = 5}}, and {{sqrt(5) * sqrt(20) = sqrt(100) = 10}}.",
            "So irrational × irrational can easily give a rational answer. Working backwards from the answer you want is a slick way to manufacture counterexamples.",
          ],
        },
      ],
      commonError: "Concluding 'always' from a single example such as {{sqrt(2) * sqrt(3)}}.",
      difficulty: "challenge",
      guideRef: "types-of-number",
      hints: [
        "Try multiplying {{sqrt(2)}} by itself. What do you get?",
        "Now try {{sqrt(2) * sqrt(3)}}. Square your answer to see what it is the square root of.",
        "Can you find two *different* irrational numbers whose product is a whole number? Try {{sqrt(2) * sqrt(8)}}.",
      ],
      strategy: "Look for a counterexample",
    },
  ],
};
