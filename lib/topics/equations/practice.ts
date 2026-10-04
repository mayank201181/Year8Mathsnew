import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "equations-quiz-q01",
      question: "Solve {{x - 8 = -3}}.",
      options: ["{{x = 5}}", "{{x = -11}}", "{{x = 11}}", "{{x = -5}}"],
      answerIndex: 0,
      explanation:
        "Undo − 8 by adding 8 to both sides: {{x = -3 + 8 = 5}}. Check: 5 − 8 = −3 ✓. {{x = -11}} comes from subtracting 8 instead of doing the inverse, and {{x = 11}} comes from ignoring the minus sign on the 3.",
      difficulty: "warmup",
      guideRef: "solving-equations",
      hints: ["What has been done to x? Do the inverse to both sides.", "Add 8 to both sides: {{x = -3 + 8}}."],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "equations-quiz-q02",
      question: "Solve {{5x + 7 = 2}}.",
      answer: { type: "number", value: -1 },
      solution: [
        "Subtract 7 from both sides: {{5x = 2 - 7 = -5}}.",
        "Divide both sides by 5: {{x = -1}}.",
        "Check: 5 × (−1) + 7 = −5 + 7 = 2 ✓.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 9, d: 5 },
          feedback: "It looks like you added 7 to the 2. To undo + 7, subtract 7 from both sides: {{5x = -5}}.",
        },
      ],
      commonError: "Getting {{5x = 9}} by adding 7 instead of subtracting it, or losing the minus sign in −5 ÷ 5.",
      difficulty: "warmup",
      guideRef: "solving-equations",
      hints: ["Undo the + 7 first, then the × 5.", "{{5x = 2 - 7}}. What is 2 − 7?"],
      strategy: "Undo in reverse order",
    },
    {
      kind: "mcq",
      id: "equations-quiz-q03",
      question: "Which inequality is shown on the number line?",
      diagram: `<svg viewBox="0 0 400 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from negative 4 to 5 with an open circle at negative 1, a filled circle at 3, and the line between them shaded"><rect width="400" height="76" fill="#ffffff"/><line x1="12" y1="34" x2="388" y2="34" stroke="#1f2937" stroke-width="1.5"/><line x1="30" y1="28" x2="30" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="30" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−4</text><line x1="68" y1="28" x2="68" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="68" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−3</text><line x1="106" y1="28" x2="106" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="106" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2</text><line x1="144" y1="28" x2="144" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="144" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><line x1="182" y1="28" x2="182" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="182" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><line x1="220" y1="28" x2="220" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="220" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="258" y1="28" x2="258" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="258" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="296" y1="28" x2="296" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="296" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><line x1="334" y1="28" x2="334" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="334" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><line x1="372" y1="28" x2="372" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="372" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><line x1="150" y1="34" x2="290" y2="34" stroke="#4f46e5" stroke-width="5"/><circle cx="144" cy="34" r="6.5" fill="#ffffff" stroke="#4f46e5" stroke-width="2.5"/><circle cx="296" cy="34" r="6.5" fill="#4f46e5" stroke="#4f46e5" stroke-width="2.5"/></svg>`,
      options: ["{{-1 <= x < 3}}", "{{-1 < x <= 3}}", "{{-1 < x < 3}}", "{{-1 <= x <= 3}}"],
      answerIndex: 1,
      explanation:
        "The open circle at −1 means −1 is **not** included, so the left end is {{-1 < x}}. The filled circle at 3 means 3 **is** included, so the right end is {{x <= 3}}. Together: {{-1 < x <= 3}}. {{-1 <= x < 3}} has the two circles the wrong way round — open means < or >, filled means ≤ or ≥.",
      difficulty: "warmup",
      guideRef: "inequalities",
      hints: [
        "Look at each end separately: is the circle open or filled?",
        "Open circle = not included (< or >). Filled circle = included (≤ or ≥).",
      ],
      strategy: "Draw a diagram (number line)",
    },
    {
      kind: "short",
      id: "equations-quiz-q04",
      question: "Solve {{3(2x - 5) = 21}}.",
      answer: { type: "number", value: 6 },
      solution: [
        "Divide both sides by 3: {{2x - 5 = 7}}.",
        "Add 5 to both sides: {{2x = 12}}.",
        "Divide both sides by 2: {{x = 6}}.",
        "Check: 3 × (12 − 5) = 3 × 7 = 21 ✓.",
      ],
      solutions: [
        {
          label: "Expand first",
          steps: [
            "{{3(2x - 5) = 6x - 15}}, so {{6x - 15 = 21}}.",
            "Add 15: {{6x = 36}}.",
            "Divide by 6: {{x = 6}}. Dividing first saved a step here because 21 is a multiple of 3.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 13, d: 3 },
          feedback: "It looks like you expanded to 6x − 5. The 3 multiplies **both** terms: {{3(2x - 5) = 6x - 15}}.",
        },
        {
          spec: { type: "number", value: 1 },
          feedback: "From {{6x - 15 = 21}}, undo − 15 by **adding** 15 to both sides: {{6x = 36}}.",
        },
      ],
      commonError: "Multiplying only the first term in the bracket: {{3(2x - 5)}} is 6x − 15, not 6x − 5.",
      difficulty: "core",
      guideRef: "equations-with-brackets",
      hints: [
        "You could expand the bracket, or divide both sides by 3 first. Which is neater here?",
        "21 ÷ 3 = 7, so {{2x - 5 = 7}}.",
        "Now it's a two-step equation: add 5, then divide by 2.",
      ],
      strategy: "Expand first or divide first",
    },
    {
      kind: "mcq",
      id: "equations-quiz-q05",
      question: "Solve {{7x - 3 = 3x + 13}}.",
      options: ["{{x = 2.5}}", "{{x = 1.6}}", "{{x = 4}}", "{{x = 16}}"],
      answerIndex: 2,
      explanation:
        "Subtract 3x from both sides: {{4x - 3 = 13}}. Add 3: {{4x = 16}}, so {{x = 4}}. Check: 28 − 3 = 25 and 12 + 13 = 25 ✓. 2.5 comes from subtracting 3 instead of adding it ({{4x = 10}}); 1.6 comes from adding 3x instead of subtracting it ({{10x = 16}}); 16 is the value of 4x, not of x.",
      difficulty: "core",
      guideRef: "unknowns-both-sides",
      hints: [
        "Get the x-terms together on one side first. Which side has more x's?",
        "Subtract 3x from both sides: {{4x - 3 = 13}}.",
        "Then add 3 to both sides and divide by 4.",
      ],
      strategy: "Collect the unknown on one side",
    },
    {
      kind: "short",
      id: "equations-quiz-q06",
      question: "Solve {{(2x - 1)/5 = 3}}.",
      answer: { type: "number", value: 8 },
      solution: [
        "The whole of 2x − 1 is divided by 5, so multiply both sides by 5: {{2x - 1 = 15}}.",
        "Add 1: {{2x = 16}}.",
        "Divide by 2: {{x = 8}}.",
        "Check: (16 − 1) ÷ 5 = 15 ÷ 5 = 3 ✓.",
      ],
      traps: [
        { spec: { type: "number", value: 2 }, feedback: "You need to undo the ÷ 5 too: multiply both sides by 5 to get {{2x - 1 = 15}}." },
        { spec: { type: "number", value: 7 }, feedback: "From {{2x - 1 = 15}}, undo − 1 by **adding** 1: {{2x = 16}}." },
      ],
      commonError: "Forgetting that the whole top, 2x − 1, is divided by 5 — clear the 5 first.",
      difficulty: "core",
      guideRef: "fractional-equations",
      hints: [
        "The whole top, 2x − 1, has been divided by 5. What undoes ÷ 5?",
        "Multiply both sides by 5: {{2x - 1 = 15}}.",
        "Now add 1 and divide by 2.",
      ],
      strategy: "Clear the fraction",
    },
    {
      kind: "mcq",
      id: "equations-quiz-q07",
      question: "The three angles of a triangle are x°, 2x° and (x + 40)°. What is the size of the largest angle?",
      options: ["35°", "70°", "160°", "75°"],
      answerIndex: 3,
      explanation:
        "Angles in a triangle add to 180°: {{x + 2x + x + 40 = 180}}, so {{4x + 40 = 180}}, {{4x = 140}} and {{x = 35}}. The angles are 35°, 70° and 75°, so the largest is 75° (check: 35 + 70 + 75 = 180 ✓). 70° assumes 2x must be the biggest — always work out every angle. 160° comes from using 360° (angles at a point) instead of 180°, and 35° is x itself.",
      difficulty: "core",
      guideRef: "forming-equations",
      hints: [
        "What do the angles in a triangle add up to?",
        "Form the equation {{x + 2x + (x + 40) = 180}} and collect like terms.",
        "Once you know x, work out all three angles before choosing the largest.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "equations-quiz-q08",
      question: "Solve {{5x - 4 >= 2x + 11}}. Type your answer as an inequality, such as x < 2 (type ≥ as >=).",
      answer: { type: "text", accept: ["x>=5", "5<=x"], display: "{{x >= 5}}" },
      solution: [
        "Subtract 2x from both sides: {{3x - 4 >= 11}}.",
        "Add 4 to both sides: {{3x >= 15}}.",
        "Divide both sides by 3 (a positive number, so the sign stays the same): {{x >= 5}}.",
        "Test x = 6: 26 ≥ 23 ✓. Test x = 0: −4 ≥ 11 ✗. So the direction is right.",
      ],
      traps: [
        {
          spec: { type: "text", accept: ["x=5", "5"] },
          feedback: "5 is the boundary, but every number above 5 works too. Write the answer as an inequality: {{x >= 5}}.",
        },
        {
          spec: { type: "text", accept: ["x<=5", "5>=x"] },
          feedback: "The sign has flipped by mistake. Dividing by +3 keeps the direction — test x = 6 in the original.",
        },
      ],
      difficulty: "core",
      guideRef: "solving-inequalities",
      hints: [
        "Solve it just like an equation — collect the x-terms on one side.",
        "Subtract 2x from both sides: {{3x - 4 >= 11}}.",
        "Add 4, then divide by 3. Dividing by a positive number keeps the sign the same.",
      ],
      strategy: "Solve like an equation",
    },
    {
      kind: "short",
      id: "equations-quiz-q09",
      question: "Find the smallest integer n for which {{4n - 7 > 18}}.",
      answer: { type: "number", value: 7 },
      solution: [
        "Add 7 to both sides: {{4n > 25}}.",
        "Divide by 4: {{n > 6.25}}.",
        "The smallest integer greater than 6.25 is 7.",
        "Check: 4 × 7 − 7 = 21, which is > 18 ✓; but 4 × 6 − 7 = 17, which is not.",
      ],
      traps: [
        {
          spec: { type: "number", value: 6 },
          feedback: "6 is less than 6.25, so it fails: 4 × 6 − 7 = 17, which is not more than 18. Round **up** here.",
        },
        {
          spec: { type: "number", value: 6.25 },
          feedback: "6.25 isn't an integer — and n must be *greater* than 6.25. Which integer comes next?",
        },
      ],
      difficulty: "core",
      guideRef: "solving-inequalities",
      hints: [
        "Solve the inequality first, just like an equation.",
        "{{4n > 25}}, so n > 6.25.",
        "Which is the first whole number bigger than 6.25?",
      ],
      strategy: "Test the endpoints",
    },
    {
      kind: "written",
      id: "equations-quiz-q10",
      question:
        "Arjun says: 'Every equation with x on both sides, like {{5x + 3 = 2x + 9}}, has exactly one solution.'\n\nIs he right? Explain, using examples.",
      marks: 3,
      modelAnswer:
        "Not always. {{5x + 3 = 2x + 9}} does have exactly one solution: subtract 2x to get {{3x + 3 = 9}}, so {{x = 2}}.\n\nBut if the x-terms on both sides are the same, they cancel. {{2x + 1 = 2x + 5}} becomes {{1 = 5}}, which is false whatever x is, so there is **no solution**. And {{2(x + 3) = 2x + 6}} becomes {{6 = 6}}, which is true for every x, so there are **infinitely many** solutions — it is an identity.\n\nSo an equation with x on both sides has exactly one solution only when the coefficients of x on the two sides are different.",
      markScheme: [
        { point: "Says Arjun is wrong / it is only sometimes true", keywords: ["not always", "sometimes", "wrong", "not true", "not right", "incorrect"] },
        {
          point: "Gives an example with no solution (same x-coefficient, different numbers, e.g. 2x + 1 = 2x + 5)",
          keywords: ["no solution", "impossible", "1 = 5", "never", "false"],
        },
        {
          point: "Gives an example with infinitely many solutions (an identity), or explains that this happens when the x-coefficients are equal",
          keywords: ["infinitely many", "every", "identity", "any value", "same coefficient", "cancel"],
        },
      ],
      commonError: "Only trying equations with different x-coefficients — those always do have exactly one solution.",
      difficulty: "challenge",
      guideRef: "unknowns-both-sides",
      hints: [
        "Try to make the x's disappear completely. What would the equation need to look like?",
        "Try {{2x + 1 = 2x + 5}}. Subtract 2x from both sides — what is left?",
        "Now try {{2(x + 3) = 2x + 6}}. Which values of x work?",
      ],
      strategy: "Look for a counterexample",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each; 5 warmup, 11 core, 4 challenge
  // ===========================================================================
  papers: [
    {
      id: "equations-p1",
      title: "Practice Paper 1",
      questions: [
        // ---------------------------------------------------------------- warmup
        {
          kind: "short",
          id: "equations-p1-q01",
          question: "Solve {{x + 15 = 6}}.",
          answer: { type: "number", value: -9 },
          solution: ["Subtract 15 from both sides: {{x = 6 - 15}}.", "{{x = -9}}.", "Check: −9 + 15 = 6 ✓."],
          traps: [{ spec: { type: "number", value: 21 }, feedback: "You added 15. To undo + 15, subtract 15 from both sides." }],
          difficulty: "warmup",
          guideRef: "solving-equations",
          hints: ["What undoes + 15? Do it to both sides."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "equations-p1-q02",
          question: "Solve {{7x = 3}}. Give your answer as a fraction.",
          answer: { type: "fraction", n: 3, d: 7 },
          solution: [
            "7x means 7 × x, so divide both sides by 7.",
            "x = 3 ÷ 7 = {{3/7}}.",
            "Check: {{7 * 3/7 = 3}} ✓. Answers don't have to be whole numbers — the fraction is exact.",
          ],
          traps: [
            { spec: { type: "fraction", n: 7, d: 3 }, feedback: "That's upside down. x = 3 ÷ 7, so 3 goes on top: {{3/7}}." },
            { spec: { type: "number", value: -4 }, feedback: "7x means 7 × x, so undo it by dividing by 7, not by subtracting 7." },
          ],
          commonError: "Writing {{7/3}} — the number you divide by goes on the bottom.",
          difficulty: "warmup",
          guideRef: "solving-equations",
          hints: ["7x means 7 × x. What undoes × 7?"],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "equations-p1-q03",
          question: "Solve {{3x - 8 = 13}}.",
          answer: { type: "number", value: 7 },
          solution: ["Add 8 to both sides: {{3x = 21}}.", "Divide both sides by 3: {{x = 7}}.", "Check: 3 × 7 − 8 = 21 − 8 = 13 ✓."],
          traps: [{ spec: { type: "fraction", n: 5, d: 3 }, feedback: "You subtracted 8. To undo − 8, add 8: {{3x = 21}}." }],
          difficulty: "warmup",
          guideRef: "solving-equations",
          hints: ["Undo the − 8 first, then the × 3."],
          strategy: "Undo in reverse order",
        },
        {
          kind: "short",
          id: "equations-p1-q04",
          question: "Write down the inequality shown on the number line. Use x, and type it like x < 2.",
          diagram: `<svg viewBox="0 0 400 76" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Number line from negative 5 to 4 with an open circle at negative 2 and a shaded arrow pointing to the right"><rect width="400" height="76" fill="#ffffff"/><line x1="12" y1="34" x2="388" y2="34" stroke="#1f2937" stroke-width="1.5"/><line x1="30" y1="28" x2="30" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="30" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−5</text><line x1="68" y1="28" x2="68" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="68" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−4</text><line x1="106" y1="28" x2="106" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="106" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−3</text><line x1="144" y1="28" x2="144" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="144" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−2</text><line x1="182" y1="28" x2="182" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="182" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">−1</text><line x1="220" y1="28" x2="220" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="220" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><line x1="258" y1="28" x2="258" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="258" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><line x1="296" y1="28" x2="296" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="296" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2</text><line x1="334" y1="28" x2="334" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="334" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3</text><line x1="372" y1="28" x2="372" y2="40" stroke="#1f2937" stroke-width="1.5"/><text x="372" y="58" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><line x1="150" y1="34" x2="384" y2="34" stroke="#4f46e5" stroke-width="5"/><polygon points="396,34 382,26 382,42" fill="#4f46e5"/><circle cx="144" cy="34" r="6.5" fill="#ffffff" stroke="#4f46e5" stroke-width="2.5"/></svg>`,
          answer: { type: "text", accept: ["x>-2", "-2<x"], display: "{{x > -2}}" },
          solution: [
            "The circle at −2 is open, so −2 is **not** included: use < or >, not ≤ or ≥.",
            "The arrow points right, towards bigger numbers, so x is greater than −2.",
            "{{x > -2}} (which is the same as {{-2 < x}}).",
          ],
          traps: [
            { spec: { type: "text", accept: ["x>=-2", "-2<=x"] }, feedback: "The circle at −2 is open, so −2 itself is not included. Use > rather than ≥." },
            { spec: { type: "text", accept: ["x<-2", "-2>x"] }, feedback: "The arrow points to the right, towards the bigger numbers, so x is greater than −2." },
          ],
          difficulty: "warmup",
          guideRef: "inequalities",
          hints: ["Is the circle open or filled? Which way does the arrow point?"],
          strategy: "Draw a diagram (number line)",
        },
        {
          kind: "short",
          id: "equations-p1-q05",
          question: "List all the integers n that satisfy {{-2 <= n < 3}}. Separate them with commas.",
          answer: { type: "list", values: [-2, -1, 0, 1, 2], display: "−2, −1, 0, 1, 2" },
          solution: [
            "Left end: ≤ means −2 **is** included.",
            "Right end: < means 3 is **not** included.",
            "So the integers are −2, −1, 0, 1, 2.",
          ],
          traps: [
            {
              spec: { type: "list", values: [-2, -1, 0, 1, 2, 3] },
              feedback: "< leaves the end value out, so 3 is not a solution.",
            },
          ],
          difficulty: "warmup",
          guideRef: "inequalities",
          hints: ["Check each end: does the symbol include the end value or not? Don't forget 0 is an integer."],
          strategy: "Test the endpoints",
        },
        // ------------------------------------------------------------------ core
        {
          kind: "short",
          id: "equations-p1-q06",
          question: "Solve {{4(x + 3) = 30}}.",
          answer: { type: "number", value: 4.5, display: "4.5 (or {{9/2}})" },
          solution: [
            "Expand the bracket: {{4x + 12 = 30}}.",
            "Subtract 12: {{4x = 18}}.",
            "Divide by 4: {{x = 4.5}}.",
            "Check: 4 × (4.5 + 3) = 4 × 7.5 = 30 ✓.",
          ],
          solutions: [
            {
              label: "Divide first",
              steps: [
                "Divide both sides by 4: {{x + 3 = 7.5}}.",
                "Subtract 3: {{x = 4.5}}.",
                "Dividing first takes one step fewer, but it brings in a decimal (7.5) straight away; expanding keeps whole numbers until the last step because 30 isn't a multiple of 4. Either route is fine.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 6.75 }, feedback: "The 4 multiplies both terms in the bracket: {{4(x + 3) = 4x + 12}}, not 4x + 3." },
          ],
          commonError: "Expanding {{4(x + 3)}} as 4x + 3.",
          difficulty: "core",
          guideRef: "equations-with-brackets",
          hints: [
            "Expand the bracket, or divide both sides by 4 first.",
            "{{4(x + 3) = 4x + 12}}.",
            "{{4x + 12 = 30}}, so {{4x = 18}}.",
          ],
          strategy: "Expand first or divide first",
        },
        {
          kind: "short",
          id: "equations-p1-q07",
          question: "Solve {{5 - 2(x - 4) = 1}}.",
          answer: { type: "number", value: 6 },
          solution: [
            "Expand carefully: {{-2(x - 4) = -2x + 8}} (negative × negative = positive).",
            "So {{5 - 2x + 8 = 1}}, which simplifies to {{13 - 2x = 1}}.",
            "Add 2x and subtract 1: {{12 = 2x}}, so {{x = 6}}.",
            "Check: 5 − 2 × (6 − 4) = 5 − 4 = 1 ✓.",
          ],
          traps: [
            { spec: { type: "number", value: -2 }, feedback: "Careful with −2 × −4: it's **+8**, so the left side is {{13 - 2x}}." },
            {
              spec: { type: "fraction", n: 13, d: 3 },
              feedback: "You can't work out 5 − 2 first — the 2 is multiplying the bracket, and multiplication comes before subtraction.",
            },
          ],
          commonError: "Writing −2 × −4 as −8, or working out 5 − 2 = 3 before multiplying.",
          difficulty: "core",
          guideRef: "equations-with-brackets",
          hints: [
            "The −2 multiplies everything in the bracket. What is −2 × −4?",
            "{{5 - 2(x - 4) = 5 - 2x + 8 = 13 - 2x}}.",
            "Solve {{13 - 2x = 1}}: add 2x to both sides, then subtract 1.",
          ],
          strategy: "Expand first",
        },
        {
          kind: "short",
          id: "equations-p1-q08",
          question: "Solve {{9x + 2 = 4x + 27}}.",
          answer: { type: "number", value: 5 },
          solution: [
            "Subtract 4x from both sides (the smaller x-term): {{5x + 2 = 27}}.",
            "Subtract 2: {{5x = 25}}.",
            "Divide by 5: {{x = 5}}.",
            "Check: 9 × 5 + 2 = 47 and 4 × 5 + 27 = 47 ✓.",
          ],
          traps: [
            { spec: { type: "fraction", n: 29, d: 5 }, feedback: "To undo + 2, subtract 2 from both sides: {{5x = 25}}." },
            { spec: { type: "fraction", n: 25, d: 13 }, feedback: "Moving 4x across means **subtracting** 4x from both sides: 9x − 4x = 5x." },
          ],
          difficulty: "core",
          guideRef: "unknowns-both-sides",
          hints: [
            "Get all the x-terms on one side. Which side has more x's?",
            "Subtract 4x from both sides.",
            "{{5x + 2 = 27}} — now it's a two-step equation.",
          ],
          strategy: "Collect the unknown on one side",
        },
        {
          kind: "written",
          id: "equations-p1-q09",
          question:
            "Priya solves {{3x + 10 = 7x - 6}}. Her working is:\n\n    {{3x + 10 = 7x - 6}}\n    {{10 = 4x - 6}}\n    {{4 = 4x}}\n    {{x = 1}}\n\n(a) Find the line where she goes wrong and explain her mistake.\n\n(b) Find the correct solution and check it by substitution.",
          marks: 3,
          modelAnswer:
            "(a) Her first step is right: subtracting 3x from both sides gives {{10 = 4x - 6}}. The mistake is in the next line. To undo − 6 she must **add** 6 to both sides, giving {{16 = 4x}}. Priya subtracted 6 instead.\n\n(b) {{16 = 4x}}, so {{x = 4}}.\n\nCheck: left side 3 × 4 + 10 = 22; right side 7 × 4 − 6 = 22. Both sides are equal ✓. (Her answer x = 1 gives 13 on the left but 1 on the right.)",
          markScheme: [
            {
              point: "Identifies the error going from 10 = 4x − 6 to 4 = 4x: she subtracted 6 instead of adding 6",
              keywords: ["add 6", "added", "subtracted 6", "16 = 4x", "+ 6", "third line"],
            },
            { point: "Correct working 16 = 4x giving x = 4", keywords: ["16", "x = 4", "x=4"] },
            { point: "Checks by substitution: both sides equal 22 when x = 4", keywords: ["22", "both sides", "substitute", "check"] },
          ],
          commonError: "Undoing − 6 by subtracting 6 — the inverse of subtracting is adding.",
          difficulty: "core",
          guideRef: "unknowns-both-sides",
          hints: [
            "Substitute her answer, x = 1, into the original equation. Do both sides match?",
            "The step from line 1 to line 2 subtracts 3x from both sides. Is that fine?",
            "Look at how she dealt with the − 6. What is the inverse of subtracting 6?",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "equations-p1-q10",
          question: "Solve {{x/3 + 2 = 7}}.",
          answer: { type: "number", value: 15 },
          solution: ["Subtract 2 from both sides: {{x/3 = 5}}.", "Multiply both sides by 3: {{x = 15}}.", "Check: 15 ÷ 3 + 2 = 5 + 2 = 7 ✓."],
          solutions: [
            {
              label: "Clear the fraction first",
              steps: [
                "Multiply **every** term by 3: {{x + 6 = 21}}.",
                "Subtract 6: {{x = 15}}.",
                "Same answer. Undoing the + 2 first is slightly quicker here because only one term is a fraction.",
              ],
            },
          ],
          traps: [
            { spec: { type: "fraction", n: 5, d: 3 }, feedback: "{{x/3 = 5}} means x divided by 3 is 5, so x = 5 × 3, not 5 ÷ 3." },
            { spec: { type: "number", value: 19 }, feedback: "If you multiply by 3, multiply **every** term: {{x + 6 = 21}}, not x + 2 = 21." },
          ],
          difficulty: "core",
          guideRef: "fractional-equations",
          hints: ["Undo the + 2 first — or multiply every term by 3.", "{{x/3 = 5}}. What undoes ÷ 3?"],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "equations-p1-q11",
          question: "Solve {{(3x + 4)/2 = x + 5}}.",
          answer: { type: "number", value: 6 },
          solution: [
            "Multiply both sides by 2 — the whole right side doubles: {{3x + 4 = 2(x + 5) = 2x + 10}}.",
            "Subtract 2x: {{x + 4 = 10}}.",
            "Subtract 4: {{x = 6}}.",
            "Check: (18 + 4) ÷ 2 = 11 and 6 + 5 = 11 ✓.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1 },
              feedback: "When you multiply both sides by 2, the **whole** right side doubles: {{2(x + 5) = 2x + 10}}, not 2x + 5.",
            },
          ],
          commonError: "Multiplying only part of the right-hand side by 2.",
          difficulty: "core",
          guideRef: "fractional-equations",
          hints: [
            "Clear the fraction: what should you multiply both sides by?",
            "Put the right side in a bracket before multiplying: {{3x + 4 = 2(x + 5)}}.",
            "Expand: {{3x + 4 = 2x + 10}}, then collect the x-terms.",
          ],
          strategy: "Clear the fraction",
        },
        {
          kind: "short",
          id: "equations-p1-q12",
          question: "A rectangle has length (2x + 3) cm and width (x − 1) cm. Its perimeter is 40 cm. Find the value of x.",
          diagram: `<svg viewBox="0 0 360 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle with length labelled 2x plus 3 centimetres and width labelled x minus 1 centimetres"><rect width="360" height="160" fill="#ffffff"/><rect x="90" y="40" width="240" height="80" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="210" y="30" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">(2x + 3) cm</text><text x="82" y="85" font-size="14" font-family="sans-serif" text-anchor="end" fill="#1f2937">(x − 1) cm</text></svg>`,
          answer: { type: "number", value: 6 },
          solution: [
            "Perimeter = length + width + length + width = {{2(2x + 3) + 2(x - 1)}}.",
            "Expand and simplify: {{4x + 6 + 2x - 2 = 6x + 4}}.",
            "{{6x + 4 = 40}}, so {{6x = 36}} and {{x = 6}}.",
            "Check: the rectangle is 15 cm by 5 cm, and 15 + 5 + 15 + 5 = 40 ✓.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 38, d: 3 },
              feedback: "A rectangle has **two** lengths and **two** widths. It looks like you added only one of each.",
            },
          ],
          commonError: "Adding one length and one width (that's half the perimeter).",
          difficulty: "core",
          guideRef: "forming-equations",
          hints: [
            "How many sides does a rectangle have, and which ones are equal?",
            "Perimeter = 2 × length + 2 × width.",
            "{{2(2x + 3) + 2(x - 1) = 40}}. Expand and collect like terms.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "equations-p1-q13",
          question: "The sum of three consecutive even numbers is 138. What is the largest of the three numbers?",
          answer: { type: "number", value: 48 },
          solution: [
            "Let the smallest be n. Consecutive even numbers go up in 2s: n, n + 2, n + 4.",
            "{{n + (n + 2) + (n + 4) = 138}}, so {{3n + 6 = 138}}.",
            "{{3n = 132}}, so {{n = 44}}. The numbers are 44, 46 and 48.",
            "Check: 44 + 46 + 48 = 138 ✓. The largest is 48.",
          ],
          solutions: [
            {
              label: "Use the middle number",
              steps: [
                "For three evenly spaced numbers, the middle one is the mean.",
                "Middle = 138 ÷ 3 = 46.",
                "So the numbers are 44, 46, 48 and the largest is 48. This is quicker — no equation needed.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 44 }, feedback: "44 is the smallest. The question asks for the largest." },
            { spec: { type: "number", value: 46 }, feedback: "46 is the middle number. The largest is 2 more." },
          ],
          commonError: "Using n, n + 1, n + 2 — those are consecutive numbers, not consecutive even numbers.",
          difficulty: "core",
          guideRef: "forming-equations",
          hints: [
            "Call the smallest number n. How do you write the next two even numbers?",
            "n, n + 2, n + 4. Add them up.",
            "{{3n + 6 = 138}}.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "equations-p1-q14",
          question:
            "Solve {{7(x + 4) = 63}} in two different ways:\n\n1. by expanding the bracket first;\n2. by dividing both sides by 7 first.\n\nWhich method is quicker here, and why? Give an example of an equation where expanding first would be the better choice.",
          marks: 4,
          modelAnswer:
            "Expanding first: {{7x + 28 = 63}}, so {{7x = 35}} and {{x = 5}}.\n\nDividing first: {{x + 4 = 9}}, so {{x = 5}}.\n\nDividing first is quicker here: 63 is a multiple of 7, so you get small whole numbers straight away and there is one fewer step.\n\nExpanding first is better when x also appears outside the bracket, or when the other side doesn't divide exactly. For example, in {{3(x + 4) = x + 20}} you can't neatly divide by 3, so expand: {{3x + 12 = x + 20}}, giving {{2x = 8}} and {{x = 4}}.",
          markScheme: [
            { point: "Expands correctly (7x + 28 = 63) and reaches x = 5", keywords: ["7x + 28", "7x+28", "7x = 35", "35"] },
            { point: "Divides first correctly (x + 4 = 9) and reaches x = 5", keywords: ["x + 4 = 9", "x+4=9", "63 ÷ 7", "divide"] },
            {
              point: "Says dividing first is quicker, with a reason (63 is a multiple of 7 / fewer steps)",
              keywords: ["quicker", "faster", "multiple", "fewer steps", "divides exactly", "dividing first"],
            },
            {
              point: "Gives a sensible example where expanding is better (x outside the bracket, or the other side not a multiple)",
              keywords: ["expand", "x on both sides", "not a multiple", "fraction", "decimal", "outside the bracket"],
            },
          ],
          difficulty: "core",
          guideRef: "equations-with-brackets",
          hints: [
            "For method 1, multiply both terms in the bracket by 7.",
            "For method 2, what is 63 ÷ 7?",
            "Dividing first only works neatly when everything on the other side divides by 7. When might that fail?",
          ],
          strategy: "Compare two methods",
        },
        {
          kind: "short",
          id: "equations-p1-q15",
          question: "Solve {{2(x + 6) < 5x}}. Type your answer as an inequality, such as x < 2.",
          answer: { type: "text", accept: ["x>4", "4<x"], display: "{{x > 4}}" },
          solution: [
            "Expand: {{2x + 12 < 5x}}.",
            "Subtract 2x from both sides: {{12 < 3x}}.",
            "Divide by 3: {{4 < x}}, which is the same as {{x > 4}}.",
            "Test x = 5: 22 < 25 ✓. Test x = 4: 20 < 20 ✗ — so 4 itself is not included.",
          ],
          traps: [
            {
              spec: { type: "text", accept: ["x<4", "4>x"] },
              feedback: "{{4 < x}} means x is **bigger** than 4. Read it from x's point of view: {{x > 4}}.",
            },
            {
              spec: { type: "text", accept: ["x>=4", "4<=x"] },
              feedback: "Test x = 4: 2 × 10 = 20, and 20 < 20 is false. So 4 is not included — use >.",
            },
          ],
          difficulty: "core",
          guideRef: "solving-inequalities",
          hints: [
            "Expand the bracket first.",
            "{{2x + 12 < 5x}}. Collect x on the side with more x's.",
            "Subtract 2x: {{12 < 3x}}. Divide by 3, then read the result carefully.",
          ],
          strategy: "Collect x on the positive side",
        },
        {
          kind: "short",
          id: "equations-p1-q16",
          question:
            "A taxi charges a $4.20 flag-down fare plus $0.70 per km. Marcus has $25. By forming an inequality, find the greatest whole number of kilometres he can travel.",
          answer: { type: "number", value: 29 },
          solution: [
            "Let k be the number of km. The cost in dollars is {{4.20 + 0.70k}}.",
            "He can spend at most $25: {{4.20 + 0.70k <= 25}}.",
            "Subtract 4.20: {{0.70k <= 20.80}}.",
            "Divide by 0.70: k ≤ 29.71… .",
            "The greatest whole number is 29. Check: 4.20 + 0.70 × 29 = $24.50 ✓, but 30 km would cost $25.20 ✗.",
          ],
          traps: [
            { spec: { type: "number", value: 30 }, feedback: "30 km would cost 4.20 + 21.00 = $25.20, which is more than $25. Round **down** here." },
          ],
          commonError: "Rounding 29.71… to the nearest whole number (30) — but 30 km is over budget.",
          difficulty: "core",
          guideRef: "solving-inequalities",
          hints: [
            "Write an expression for the cost of k km.",
            "'Has $25' means the cost must be at most 25: {{4.20 + 0.70k <= 25}}.",
            "Solve it, then decide whether to round up or down.",
          ],
          strategy: "Form an inequality",
        },
        // ------------------------------------------------------------- challenge
        {
          kind: "short",
          id: "equations-p1-q17",
          question: "Solve the simultaneous equations {{3x + 2y = 16}} and {{2x - y = 6}}. Give x first, then y.",
          answer: { type: "list", values: [4, 2], ordered: true, display: "x = 4, y = 2" },
          solution: [
            "Make the y-coefficients match: multiply the second equation by 2 to get {{4x - 2y = 12}}.",
            "The y-terms now have opposite signs, so add the equations: {{7x = 28}}, so {{x = 4}}.",
            "Substitute into {{2x - y = 6}}: {{8 - y = 6}}, so {{y = 2}}.",
            "Check in the first equation: 3 × 4 + 2 × 2 = 12 + 4 = 16 ✓.",
          ],
          solutions: [
            {
              label: "Substitution",
              steps: [
                "Rearrange the second equation: {{y = 2x - 6}}.",
                "Substitute into the first: {{3x + 2(2x - 6) = 16}}, so {{7x - 12 = 16}}.",
                "{{7x = 28}}, so {{x = 4}}, and {{y = 8 - 6 = 2}}.",
                "Both work. Substitution is quick here because y is easy to make the subject; elimination avoids brackets.",
              ],
            },
          ],
          traps: [{ spec: { type: "list", values: [4, -2], ordered: true }, feedback: "From {{8 - y = 6}}, y = 2 (check: 8 − 2 = 6)." }],
          commonError: "Adding the equations before the coefficients match, so neither letter cancels.",
          difficulty: "challenge",
          guideRef: "simultaneous-equations",
          hints: [
            "Neither letter cancels yet. Can you multiply one equation so the y-terms match?",
            "Multiply {{2x - y = 6}} by 2: {{4x - 2y = 12}}.",
            "Now you have +2y and −2y: add the equations to eliminate y.",
          ],
          strategy: "Eliminate a variable",
        },
        {
          kind: "written",
          id: "equations-p1-q18",
          question: "Is the statement {{2x > x}} always true, sometimes true or never true? Explain your answer using examples and algebra.",
          marks: 3,
          modelAnswer:
            "**Sometimes true.**\n\nIf x = 3: 2x = 6, and 6 > 3 is true.\nIf x = −3: 2x = −6, and −6 > −3 is false, because −6 is further left on the number line. If x = 0: 0 > 0 is false too.\n\nIn general, subtract x from both sides: {{2x > x}} is equivalent to {{x > 0}}. So the statement is true for every positive number and false for zero and every negative number.",
          markScheme: [
            { point: "States 'sometimes true'", keywords: ["sometimes"] },
            {
              point: "Gives an example where it is true (positive x) and one where it is false (zero or negative x)",
              keywords: ["zero", "negative", "-3", "−3", "-1", "−1", "false"],
            },
            {
              point: "Explains in general: subtracting x from both sides gives x > 0, so it is true exactly when x is positive",
              keywords: ["x > 0", "x>0", "subtract x", "positive", "greater than 0", "greater than zero"],
            },
          ],
          commonError: "Only testing positive whole numbers and concluding 'always' — doubling a negative number makes it *smaller*.",
          difficulty: "challenge",
          guideRef: "solving-inequalities",
          hints: [
            "Test a few different kinds of number: positive, zero, negative.",
            "Try x = −3. Is −6 > −3?",
            "Treat it like an equation: subtract x from both sides. What is left?",
          ],
          strategy: "Always, sometimes, never: test cases",
        },
        {
          kind: "short",
          id: "equations-p1-q19",
          question: "Hana is three times as old as her brother Jun. In 6 years' time, Hana will be twice as old as Jun. How old is Hana now?",
          answer: { type: "number", value: 18 },
          solution: [
            "Let Jun's age now be j. Then Hana's age is 3j.",
            "In 6 years: Jun will be j + 6 and Hana will be 3j + 6.",
            "Hana will be twice Jun's age: {{3j + 6 = 2(j + 6)}}.",
            "{{3j + 6 = 2j + 12}}, so {{j = 6}}.",
            "Hana is 3 × 6 = 18. Check: in 6 years they'll be 24 and 12, and 24 = 2 × 12 ✓.",
          ],
          solutions: [
            {
              label: "Bar model: the age gap never changes",
              steps: [
                "Now Hana = 3 bars and Jun = 1 bar, so the gap is 2 bars.",
                "In 6 years Hana is twice Jun, so the gap then equals Jun's age then. The gap is still 2 bars, so Jun will be 2 bars old.",
                "Jun goes from 1 bar to 2 bars in 6 years, so 1 bar = 6.",
                "Hana now = 3 bars = 18. Spotting the invariant (the constant gap) makes this quick.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 6 }, feedback: "6 is Jun's age. Hana is three times as old." },
            { spec: { type: "number", value: 24 }, feedback: "24 is Hana's age **in 6 years**. The question asks for her age now." },
          ],
          commonError: "Adding 6 to only one person's age, or writing 2j + 6 instead of {{2(j + 6)}}.",
          difficulty: "challenge",
          guideRef: "forming-equations",
          hints: [
            "Use a letter for Jun's age now. What is Hana's age in terms of it?",
            "Add 6 to **both** ages.",
            "Write 'Hana's future age = 2 × Jun's future age' as an equation: {{3j + 6 = 2(j + 6)}}.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "equations-p1-q20",
          question:
            "(a) Prove that the sum of any three consecutive integers is a multiple of 3.\n\n(b) Use algebra to explain why three consecutive integers can never add up to 100.",
          marks: 3,
          modelAnswer:
            "(a) Let the smallest integer be n. The next two are n + 1 and n + 2. Their sum is {{n + (n + 1) + (n + 2) = 3n + 3 = 3(n + 1)}}. Since n + 1 is an integer, the sum is 3 times an integer — a multiple of 3.\n\n(b) 100 is not a multiple of 3 (100 ÷ 3 = 33 remainder 1), so by part (a) it can't be the sum. Using algebra: {{3n + 3 = 100}} gives {{3n = 97}} and {{n = 97/3}}, which is not an integer — so no three consecutive integers work.",
          markScheme: [
            { point: "Writes the integers as n, n + 1, n + 2 and the sum as 3n + 3", keywords: ["n + 1", "n+1", "n + 2", "3n + 3", "3n+3"] },
            {
              point: "Shows 3n + 3 = 3(n + 1), so the sum is a multiple of 3",
              keywords: ["3(n + 1)", "3(n+1)", "factor", "multiple of 3", "divisible by 3"],
            },
            {
              point: "Explains 100 is not a multiple of 3 (or 3n + 3 = 100 gives {{n = 97/3}}, not an integer)",
              keywords: ["97/3", "not a multiple", "not divisible", "not an integer", "remainder", "32.3"],
            },
          ],
          solutions: [
            {
              label: "Use the middle number (slicker)",
              steps: [
                "Call the middle integer m. The three integers are m − 1, m and m + 1.",
                "Sum = {{(m - 1) + m + (m + 1) = 3m}} — the −1 and +1 cancel.",
                "So the sum is always 3 × the middle number. Symmetry does the work, and 100 ÷ 3 is not a whole number.",
              ],
            },
          ],
          commonError: "Checking a few examples (1 + 2 + 3 = 6, 4 + 5 + 6 = 15) and calling it a proof — examples can't cover every case.",
          difficulty: "challenge",
          guideRef: "forming-equations",
          hints: [
            "Use a letter for the first integer. How do you write the next two?",
            "Add them and simplify. Can you factorise the result?",
            "For (b): if the sum were 100, what would n have to be?",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
    {
      id: "equations-p2",
      title: "Practice Paper 2",
      questions: [
        // ---------------------------------------------------------------- warmup
        {
          kind: "short",
          id: "equations-p2-q01",
          question: "Solve {{12 - x = 20}}.",
          answer: { type: "number", value: -8 },
          solution: ["Add x to both sides: {{12 = 20 + x}}.", "Subtract 20 from both sides: {{x = -8}}.", "Check: 12 − (−8) = 12 + 8 = 20 ✓."],
          traps: [
            { spec: { type: "number", value: 32 }, feedback: "x is being subtracted from 12, so x isn't 12 + 20. Try adding x to both sides first." },
          ],
          commonError: "Answering x = 8 — check: 12 − 8 = 4, not 20.",
          difficulty: "warmup",
          guideRef: "solving-equations",
          hints: ["The x is being subtracted. Try adding x to both sides so it becomes positive."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "equations-p2-q02",
          question: "Solve {{6x + 5 = 2}}.",
          answer: { type: "number", value: -0.5, display: "{{-1/2}} (or −0.5)" },
          solution: ["Subtract 5 from both sides: {{6x = -3}}.", "Divide both sides by 6: {{x = -3/6 = -1/2}}.", "Check: 6 × (−0.5) + 5 = −3 + 5 = 2 ✓."],
          traps: [
            { spec: { type: "fraction", n: 7, d: 6 }, feedback: "To undo + 5, subtract 5 from both sides: 2 − 5 = −3." },
            { spec: { type: "number", value: -2 }, feedback: "{{6x = -3}} means x = −3 ÷ 6, not 6 ÷ (−3)." },
          ],
          difficulty: "warmup",
          guideRef: "solving-equations",
          hints: ["Undo the + 5, then the × 6. The answer doesn't have to be a whole number."],
          strategy: "Undo in reverse order",
        },
        {
          kind: "short",
          id: "equations-p2-q03",
          question: "A lift can safely carry a load of at most 900 kg. Write an inequality for the load, L kg, that the lift can carry. (Type ≤ as <=.)",
          answer: { type: "text", accept: ["L<=900", "900>=L", "L<=900kg", "900kg>=L", "0<=L<=900", "0<L<=900"], display: "{{L <= 900}}" },
          solution: ["'At most 900' means 900 or less — exactly 900 kg is allowed.", "So use 'less than or equal to': {{L <= 900}}."],
          traps: [
            { spec: { type: "text", accept: ["L<900", "900>L"] }, feedback: "'At most 900' means 900 kg itself is allowed, so use ≤ (type <=)." },
            { spec: { type: "text", accept: ["L>=900", "900<=L", "L>900"] }, feedback: "'At most' means 900 or **less**, so the load is less than or equal to 900." },
          ],
          difficulty: "warmup",
          guideRef: "inequalities",
          hints: ["Is a load of exactly 900 kg allowed? Is 901 kg?"],
          strategy: "Translate words into symbols",
        },
        {
          kind: "short",
          id: "equations-p2-q04",
          question: "x is an integer and {{-6 < x <= -1}}. What are the smallest and largest possible values of x? Give the smallest first.",
          answer: { type: "list", values: [-5, -1], ordered: true, display: "−5, −1" },
          solution: [
            "The left end is <, so −6 is **not** included. The next integer up is −5.",
            "The right end is ≤, so −1 **is** included.",
            "Smallest −5, largest −1.",
          ],
          traps: [
            { spec: { type: "list", values: [-6, -1], ordered: true }, feedback: "< leaves −6 out, so the smallest integer is the next one up: −5." },
            { spec: { type: "list", values: [-5, -2], ordered: true }, feedback: "≤ includes the end value, so −1 itself is allowed." },
          ],
          difficulty: "warmup",
          guideRef: "inequalities",
          hints: ["Check each end: is it included? Remember −5 is bigger than −6."],
          strategy: "Test the endpoints",
        },
        {
          kind: "short",
          id: "equations-p2-q05",
          question: "Solve {{2(x + 7) = 20}}.",
          answer: { type: "number", value: 3 },
          solution: ["Divide both sides by 2: {{x + 7 = 10}}.", "Subtract 7: {{x = 3}}.", "Check: 2 × (3 + 7) = 2 × 10 = 20 ✓."],
          traps: [{ spec: { type: "number", value: 6.5 }, feedback: "The 2 multiplies the 7 too: {{2(x + 7) = 2x + 14}}." }],
          difficulty: "warmup",
          guideRef: "equations-with-brackets",
          hints: ["Divide both sides by 2 first, or expand the bracket."],
          strategy: "Expand first or divide first",
        },
        // ------------------------------------------------------------------ core
        {
          kind: "short",
          id: "equations-p2-q06",
          question: "Solve {{-3(2x - 5) = 27}}.",
          answer: { type: "number", value: -2 },
          solution: [
            "Divide both sides by −3: {{2x - 5 = -9}}.",
            "Add 5: {{2x = -4}}.",
            "Divide by 2: {{x = -2}}.",
            "Check: −3 × (2 × (−2) − 5) = −3 × (−9) = 27 ✓.",
          ],
          solutions: [
            {
              label: "Expand first",
              steps: [
                "{{-3(2x - 5) = -6x + 15}}, because −3 × −5 = +15.",
                "{{-6x + 15 = 27}}, so {{-6x = 12}}.",
                "{{x = -2}}. Dividing by −3 first avoids multiplying out two negatives, so it is a little safer.",
              ],
            },
          ],
          traps: [{ spec: { type: "number", value: -7 }, feedback: "−3 × −5 = **+15**, not −15. So {{-6x + 15 = 27}}." }],
          commonError: "Getting −3 × −5 = −15.",
          difficulty: "core",
          guideRef: "equations-with-brackets",
          hints: [
            "You could divide both sides by −3 first. What is 27 ÷ (−3)?",
            "{{2x - 5 = -9}}.",
            "Add 5, then divide by 2.",
          ],
          strategy: "Expand first or divide first",
        },
        {
          kind: "short",
          id: "equations-p2-q07",
          question: "Solve {{4(x - 1) = 2(x + 5)}}.",
          answer: { type: "number", value: 7 },
          solution: [
            "Expand both sides: {{4x - 4 = 2x + 10}}.",
            "Subtract 2x: {{2x - 4 = 10}}.",
            "Add 4: {{2x = 14}}, so {{x = 7}}.",
            "Check: 4 × 6 = 24 and 2 × 12 = 24 ✓.",
          ],
          solutions: [
            {
              label: "Halve both sides first",
              steps: [
                "Every term is even, so divide both sides by 2: {{2(x - 1) = x + 5}}.",
                "{{2x - 2 = x + 5}}, so {{x = 7}}.",
                "Halving first keeps the numbers smaller.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback: "Multiply out each bracket fully: {{4(x - 1) = 4x - 4}} and {{2(x + 5) = 2x + 10}}.",
            },
          ],
          difficulty: "core",
          guideRef: "equations-with-brackets",
          hints: [
            "Expand both brackets first.",
            "{{4x - 4 = 2x + 10}}.",
            "Collect the x-terms on the left (subtract 2x) and the numbers on the right.",
          ],
          strategy: "Expand first",
        },
        {
          kind: "short",
          id: "equations-p2-q08",
          question: "Solve {{2 - 5x = 20 + x}}.",
          answer: { type: "number", value: -3 },
          solution: [
            "The right side has the larger x-coefficient (1 is bigger than −5), so add 5x to both sides: {{2 = 20 + 6x}}.",
            "Subtract 20: {{-18 = 6x}}.",
            "Divide by 6: {{x = -3}}.",
            "Check: 2 − 5 × (−3) = 2 + 15 = 17 and 20 + (−3) = 17 ✓.",
          ],
          traps: [
            { spec: { type: "number", value: -4.5 }, feedback: "Adding 5x to x gives 6x, not 4x. Keep track of the signs: {{2 = 20 + 6x}}." },
          ],
          commonError: "Collecting −5x and x as −4x.",
          difficulty: "core",
          guideRef: "unknowns-both-sides",
          hints: [
            "Which side has the larger coefficient of x? (Careful: −5 is smaller than 1.)",
            "Add 5x to both sides so the x-term is positive: {{2 = 20 + 6x}}.",
            "Subtract 20, then divide by 6.",
          ],
          strategy: "Collect x on the positive side",
        },
        {
          kind: "short",
          id: "equations-p2-q09",
          question: "Solve {{8x - 3 = 5x + 4}}. Give your answer as a mixed number.",
          answer: { type: "fraction", n: 7, d: 3, form: "mixed", display: "{{2 1/3}}" },
          solution: [
            "Subtract 5x: {{3x - 3 = 4}}.",
            "Add 3: {{3x = 7}}.",
            "Divide by 3: {{x = 7/3 = 2 1/3}}.",
            "Check: {{8 * 7/3 - 3 = 56/3 - 9/3 = 47/3}} and {{5 * 7/3 + 4 = 35/3 + 12/3 = 47/3}} ✓.",
          ],
          traps: [{ spec: { type: "fraction", n: 1, d: 3 }, feedback: "To undo − 3, add 3 to both sides: 4 + 3 = 7, so {{3x = 7}}." }],
          difficulty: "core",
          guideRef: "unknowns-both-sides",
          hints: [
            "Collect the x-terms on the left: subtract 5x.",
            "{{3x - 3 = 4}}. Undo the − 3.",
            "{{3x = 7}}. Answers can be fractions: write 7 ÷ 3 as a mixed number.",
          ],
          strategy: "Collect the unknown on one side",
        },
        {
          kind: "written",
          id: "equations-p2-q10",
          question:
            "Zara solves {{(x + 4)/3 = x - 2}}. Her working is:\n\n    {{x + 4 = 3x - 2}}\n    {{6 = 2x}}\n    {{x = 3}}\n\nExplain her mistake, then solve the equation correctly and check your answer.",
          marks: 3,
          modelAnswer:
            "When Zara multiplied both sides by 3, she multiplied the x on the right but not the −2. The whole right-hand side must be multiplied: {{3(x - 2) = 3x - 6}}.\n\nCorrect working: {{x + 4 = 3x - 6}}, so {{10 = 2x}} and {{x = 5}}.\n\nCheck: left side {{(5 + 4)/3 = 9/3 = 3}}; right side 5 − 2 = 3 ✓. (Her answer x = 3 gives {{7/3}} on the left but 1 on the right.)",
          markScheme: [
            {
              point: "Explains that the whole right-hand side must be multiplied by 3: 3(x − 2) = 3x − 6, not 3x − 2",
              keywords: ["3x - 6", "3x − 6", "3(x - 2)", "3(x − 2)", "whole", "both terms"],
            },
            { point: "Correct solution: x + 4 = 3x − 6, so 10 = 2x and x = 5", keywords: ["10 = 2x", "x = 5", "x=5"] },
            { point: "Checks by substitution: both sides equal 3 when x = 5", keywords: ["9/3", "9 ÷ 3", "both sides", "check", "= 3"] },
          ],
          commonError: "Multiplying only the first term on one side when clearing a fraction.",
          difficulty: "core",
          guideRef: "fractional-equations",
          hints: [
            "Substitute her answer, x = 3, into the original equation. Do both sides match?",
            "When you multiply both sides by 3, every term on the right must be multiplied.",
            "{{3(x - 2) = 3x - 6}}.",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "equations-p2-q11",
          question: "Solve {{x/4 + x/6 = 5}}.",
          answer: { type: "number", value: 12 },
          solution: [
            "The LCM of 4 and 6 is 12. Multiply **every** term by 12: {{3x + 2x = 60}}.",
            "{{5x = 60}}, so {{x = 12}}.",
            "Check: 12 ÷ 4 + 12 ÷ 6 = 3 + 2 = 5 ✓.",
          ],
          solutions: [
            {
              label: "Add the fractions first",
              steps: [
                "{{x/4 + x/6 = 3x/12 + 2x/12 = 5x/12}}.",
                "{{5x/12 = 5}}, so {{5x = 60}} and {{x = 12}}.",
                "Same working in a different order; multiplying every term by the LCM straight away is usually quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 50 },
              feedback: "You can't add fractions by adding the denominators: {{x/4 + x/6}} is not {{x/10}}. Use a common denominator of 12.",
            },
          ],
          commonError: "Adding the denominators, or multiplying only some of the terms by 12.",
          difficulty: "core",
          guideRef: "fractional-equations",
          hints: [
            "What single number could you multiply every term by to clear both denominators?",
            "The LCM of 4 and 6 is 12. What is 12 × {{x/4}}? And 12 × {{x/6}}?",
            "{{3x + 2x = 60}}.",
          ],
          strategy: "Clear the fractions",
        },
        {
          kind: "short",
          id: "equations-p2-q12",
          question: "Solve {{(5x - 3)/4 = (x + 6)/2}}.",
          answer: { type: "number", value: 5 },
          solution: [
            "Multiply both sides by 4 (the LCM of 4 and 2): {{5x - 3 = 2(x + 6)}}.",
            "Expand: {{5x - 3 = 2x + 12}}.",
            "Subtract 2x and add 3: {{3x = 15}}, so {{x = 5}}.",
            "Check: (25 − 3) ÷ 4 = 5.5 and (5 + 6) ÷ 2 = 5.5 ✓.",
          ],
          solutions: [
            {
              label: "Cross-multiply",
              steps: [
                "{{2(5x - 3) = 4(x + 6)}}.",
                "{{10x - 6 = 4x + 24}}, so {{6x = 30}} and {{x = 5}}.",
                "This works too, but multiplying by the LCM (4) keeps the numbers smaller.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 9, d: 4 },
              feedback: "Multiplying {{(x + 6)/2}} by 4 gives {{2(x + 6)}}, not x + 6 — a factor of 2 is left over.",
            },
          ],
          difficulty: "core",
          guideRef: "fractional-equations",
          hints: [
            "What number clears both denominators at once?",
            "Multiply both sides by 4. What happens to {{(x + 6)/2}}?",
            "{{5x - 3 = 2(x + 6)}}.",
          ],
          strategy: "Clear the fractions",
        },
        {
          kind: "short",
          id: "equations-p2-q13",
          question: "The four angles of a quadrilateral are 2x°, (3x + 10)°, (x + 20)° and 90°. Find the size of the largest angle, in degrees.",
          answer: { type: "number", value: 130 },
          solution: [
            "Angles in a quadrilateral add to 360°.",
            "{{2x + (3x + 10) + (x + 20) + 90 = 360}}.",
            "Collect like terms: {{6x + 120 = 360}}, so {{6x = 240}} and {{x = 40}}.",
            "The angles are 80°, 130°, 60° and 90°. Check: 80 + 130 + 60 + 90 = 360 ✓. The largest is 130°.",
          ],
          traps: [
            { spec: { type: "number", value: 40 }, feedback: "40 is x, not an angle. Substitute it back to find all four angles." },
            {
              spec: { type: "number", value: 90 },
              feedback: "Find x first using the angle sum of a quadrilateral, 360°. One of the other angles turns out to be bigger than 90°.",
            },
          ],
          difficulty: "core",
          guideRef: "forming-equations",
          hints: [
            "What do the angles in a quadrilateral add up to?",
            "Add all four angles and set the total equal to 360.",
            "{{6x + 120 = 360}}. Find x, then work out each angle.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "equations-p2-q14",
          question:
            "Ravi has $x. Siti has $15 more than Ravi. Arjun has twice as much as Siti. Altogether they have $193. How much money does Arjun have?",
          answer: { type: "number", value: 104, display: "$104" },
          solution: [
            "Ravi: x. Siti: x + 15. Arjun: {{2(x + 15)}}.",
            "{{x + (x + 15) + 2(x + 15) = 193}}.",
            "{{x + x + 15 + 2x + 30 = 193}}, so {{4x + 45 = 193}}.",
            "{{4x = 148}}, so {{x = 37}}.",
            "Arjun has 2 × (37 + 15) = 2 × 52 = $104. Check: 37 + 52 + 104 = 193 ✓.",
          ],
          traps: [
            { spec: { type: "number", value: 37 }, feedback: "That's Ravi's amount. Arjun has twice Siti's, and Siti has $15 more than Ravi." },
            { spec: { type: "number", value: 52 }, feedback: "That's Siti's amount. Arjun has twice as much." },
          ],
          commonError: "Writing Arjun's amount as 2x + 15 instead of {{2(x + 15)}}.",
          difficulty: "core",
          guideRef: "forming-equations",
          hints: [
            "Write each person's money in terms of x.",
            "Arjun has twice Siti's amount: {{2(x + 15)}}.",
            "Add all three, set the total equal to 193 and solve. Then answer the question that was asked.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "equations-p2-q15",
          question:
            "Jun has $38 saved. He saves $7 every week. He wants to have **more than** $150 so he can buy a bike.\n\n(a) Write an inequality for the number of weeks, w.\n\n(b) Solve it to find the smallest whole number of weeks he must save. Explain carefully why the answer is not 16.",
          marks: 3,
          modelAnswer:
            "(a) After w weeks he has {{38 + 7w}} dollars, and this must be more than 150: {{38 + 7w > 150}}.\n\n(b) Subtract 38: {{7w > 112}}. Divide by 7: {{w > 16}}.\n\nAfter exactly 16 weeks he has 38 + 112 = $150, which is **not** more than $150, so 16 weeks is not enough. The smallest whole number greater than 16 is **17 weeks** (he then has $157).",
          markScheme: [
            { point: "Forms 38 + 7w > 150", keywords: ["38 + 7w", "38+7w", "7w + 38", "> 150", ">150"] },
            { point: "Solves to w > 16 (via 7w > 112)", keywords: ["112", "w > 16", "w>16"] },
            {
              point: "Answer 17 weeks, with the reason: after 16 weeks he has exactly $150, which is not more than $150",
              keywords: ["17", "exactly", "not more than", "equal", "only 150"],
            },
          ],
          commonError: "Giving 16 weeks — but the inequality is strict (> 150), and 16 weeks gives exactly $150.",
          difficulty: "core",
          guideRef: "solving-inequalities",
          hints: [
            "Write an expression for his savings after w weeks.",
            "'More than $150' means >: {{38 + 7w > 150}}.",
            "You should get {{w > 16}}. Does w = 16 itself work? Test it.",
          ],
          strategy: "Form an inequality",
        },
        {
          kind: "short",
          id: "equations-p2-q16",
          question: "Solve {{x/4 - 3 > 2}}. Type your answer as an inequality, such as x < 2.",
          answer: { type: "text", accept: ["x>20", "20<x"], display: "{{x > 20}}" },
          solution: [
            "Add 3 to both sides: {{x/4 > 5}}.",
            "Multiply both sides by 4 (positive, so the sign stays the same): {{x > 20}}.",
            "Test x = 24: 6 − 3 = 3 > 2 ✓. Test x = 20: 5 − 3 = 2, which is not > 2, so 20 is not included.",
          ],
          traps: [
            {
              spec: { type: "text", accept: ["x>1.25", "x>5/4", "1.25<x", "5/4<x"] },
              feedback: "{{x/4 > 5}} means x divided by 4 is more than 5, so x is more than 5 × 4.",
            },
            {
              spec: { type: "text", accept: ["x>=20", "20<=x"] },
              feedback: "Test x = 20: 20 ÷ 4 − 3 = 2, and 2 > 2 is false. So 20 is not included — use >.",
            },
          ],
          difficulty: "core",
          guideRef: "solving-inequalities",
          hints: ["Solve it like an equation: undo the − 3 first.", "{{x/4 > 5}}. What undoes ÷ 4?"],
          strategy: "Solve like an equation",
        },
        // ------------------------------------------------------------- challenge
        {
          kind: "short",
          id: "equations-p2-q17",
          question:
            "At a kopitiam, 2 slices of kaya toast and 3 cups of teh tarik cost $8.10. 3 slices of kaya toast and 1 cup of teh tarik cost $6.90. Find the cost of one slice of kaya toast and of one cup of teh tarik. Give the toast price first.",
          answer: { type: "list", values: [1.8, 1.5], ordered: true, display: "$1.80, $1.50" },
          solution: [
            "Let k = the cost of a slice of toast and t = the cost of a teh tarik, in dollars.",
            "{{2k + 3t = 8.10}} and {{3k + t = 6.90}}.",
            "Multiply the second equation by 3: {{9k + 3t = 20.70}}.",
            "Subtract the first equation: {{7k = 12.60}}, so {{k = 1.80}}.",
            "Substitute: 3 × 1.80 + t = 6.90, so t = 6.90 − 5.40 = 1.50.",
            "Check: 2 × 1.80 + 3 × 1.50 = 3.60 + 4.50 = 8.10 ✓. Toast $1.80, teh tarik $1.50.",
          ],
          solutions: [
            {
              label: "Substitution",
              steps: [
                "From the second equation, {{t = 6.90 - 3k}}.",
                "Substitute into the first: {{2k + 3(6.90 - 3k) = 8.10}}, so {{2k + 20.70 - 9k = 8.10}}.",
                "{{-7k = -12.60}}, so {{k = 1.80}} and {{t = 1.50}}.",
                "Elimination is tidier here — fewer negatives to track.",
              ],
            },
          ],
          commonError: "Multiplying only the left-hand side of an equation by 3 — the $6.90 must be multiplied too.",
          difficulty: "challenge",
          guideRef: "simultaneous-equations",
          hints: [
            "Use two letters, k and t, and write two equations.",
            "Make the t-terms match: multiply {{3k + t = 6.90}} by 3.",
            "{{9k + 3t = 20.70}}. Subtract {{2k + 3t = 8.10}} to eliminate t.",
          ],
          strategy: "Eliminate a variable",
        },
        {
          kind: "written",
          id: "equations-p2-q18",
          question:
            "Wei Ling solves {{12 - 2x > 4}} like this:\n\n    {{-2x > -8}}\n    {{x > 4}}\n\n(a) Test x = 5 in the original inequality to show that her answer is wrong.\n\n(b) Explain her mistake and give the correct solution.",
          marks: 3,
          modelAnswer:
            "(a) When x = 5: 12 − 2 × 5 = 2, and 2 > 4 is **false**. But 5 > 4, so x = 5 fits her answer — her answer must be wrong.\n\n(b) Her first step is fine. The mistake is dividing both sides by −2 without reversing the sign. Dividing by a negative number reverses the order of numbers, so the inequality sign must flip: {{-2x > -8}} becomes {{x < 4}}.\n\nCheck x = 0: 12 > 4 ✓, and 0 < 4 ✓.",
          markScheme: [
            {
              point: "Tests x = 5: 12 − 10 = 2, and 2 > 4 is false, even though 5 > 4",
              keywords: ["12 - 10", "12 − 10", "2 > 4", "false", "not greater", "does not work", "doesn't work"],
            },
            {
              point: "Explains that dividing (or multiplying) by a negative number reverses the inequality sign",
              keywords: ["negative", "reverse", "flip", "change direction", "-2", "−2"],
            },
            { point: "Correct solution x < 4", keywords: ["x < 4", "x<4", "4 > x", "less than 4"] },
          ],
          solutions: [
            {
              label: "Avoid dividing by a negative",
              steps: [
                "Add 2x to both sides: {{12 > 4 + 2x}}.",
                "Subtract 4: {{8 > 2x}}.",
                "Divide by 2 (positive): {{4 > x}}, i.e. {{x < 4}}. Keeping the x-term positive means you never need to flip.",
              ],
            },
          ],
          commonError: "Treating an inequality exactly like an equation when dividing by a negative number.",
          difficulty: "challenge",
          guideRef: "solving-inequalities",
          hints: [
            "Work out 12 − 2 × 5. Is it bigger than 4?",
            "Which step divides by a negative number? What does multiplying by −1 do to the order of 2 and 3?",
            "Try a safer route: add 2x to both sides so the x-term is positive.",
          ],
          strategy: "Test a value",
        },
        {
          kind: "written",
          id: "equations-p2-q19",
          question:
            "Two mobile phone plans charge:\n\n| Plan | Monthly fee | Cost per minute of calls |\n|---|---|---|\n| A | $18 | $0.12 |\n| B | $30 | $0.04 |\n\nUse algebra to find the numbers of minutes, m, for which Plan A is cheaper. Explain what happens at the boundary.",
          marks: 3,
          modelAnswer:
            "Monthly cost of A: {{18 + 0.12m}} dollars. Monthly cost of B: {{30 + 0.04m}} dollars.\n\nA is cheaper when {{18 + 0.12m < 30 + 0.04m}}.\n\n    Subtract 0.04m: {{18 + 0.08m < 30}}\n    Subtract 18: {{0.08m < 12}}\n    Divide by 0.08: {{m < 150}}\n\nSo Plan A is cheaper for fewer than 150 minutes a month. At exactly 150 minutes both plans cost $36 (18 + 18 = 30 + 6). For more than 150 minutes, Plan B is cheaper.",
          markScheme: [
            {
              point: "Forms 18 + 0.12m < 30 + 0.04m (or the equation 18 + 0.12m = 30 + 0.04m)",
              keywords: ["18 + 0.12m", "0.12m", "30 + 0.04m", "0.04m"],
            },
            { point: "Solves to m < 150 (or m = 150), e.g. via 0.08m < 12", keywords: ["0.08m", "0.08", "150"] },
            {
              point: "Concludes: A is cheaper below 150 minutes, both cost $36 at exactly 150, B is cheaper above 150",
              keywords: ["fewer than 150", "less than 150", "36", "same", "equal", "more than 150"],
            },
          ],
          commonError: "Comparing only the monthly fees, or only the per-minute rates, instead of the total cost.",
          difficulty: "challenge",
          guideRef: "solving-inequalities",
          hints: [
            "Write an expression for the monthly cost of each plan for m minutes.",
            "'A is cheaper' means cost of A < cost of B.",
            "Collect the m-terms on one side: {{0.08m < 12}}.",
          ],
          strategy: "Form an inequality",
        },
        {
          kind: "short",
          id: "equations-p2-q20",
          question: "A water bottle is {{2/5}} full. After 180 ml more water is poured in, it is {{5/8}} full. What is the capacity of the bottle, in ml?",
          answer: { type: "number", value: 800 },
          solution: [
            "Let the capacity be C ml.",
            "{{2/5 C + 180 = 5/8 C}}.",
            "Multiply every term by 40 (the LCM of 5 and 8): {{16C + 7200 = 25C}}.",
            "{{9C = 7200}}, so {{C = 800}}.",
            "Check: {{2/5}} of 800 = 320; 320 + 180 = 500; {{5/8}} of 800 = 500 ✓.",
          ],
          solutions: [
            {
              label: "Find the fraction the 180 ml fills (slicker)",
              steps: [
                "The 180 ml fills the gap between {{2/5}} and {{5/8}} of the bottle.",
                "{{5/8 - 2/5 = 25/40 - 16/40 = 9/40}}.",
                "So {{9/40}} of the bottle is 180 ml, {{1/40}} is 20 ml, and the whole bottle is 40 × 20 = 800 ml. Quicker: it goes straight to the key fraction.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 180 },
              feedback: "The 180 ml isn't the whole bottle — it fills the gap between {{2/5}} and {{5/8}} of it. Subtract those fractions using a common denominator.",
            },
          ],
          difficulty: "challenge",
          guideRef: "fractional-equations",
          hints: [
            "Call the capacity C. Write 'two-fifths of C, plus 180, equals five-eighths of C' as an equation.",
            "What fraction of the bottle does the 180 ml fill?",
            "{{5/8 - 2/5 = 9/40}}. So {{9/40}} of the bottle is 180 ml.",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET — AoPS / UKMT-Junior flavour; all difficulty "challenge"
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "equations-ch-q01",
      question:
        "In this number wall, each brick is the sum of the two bricks directly below it. The bottom row is 5, x, 2x and 4, and the top brick is 72. Find x.",
      diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number wall of ten bricks. The bottom row reads 5, x, 2x, 4. The top brick is 72. The bricks in between are blank."><rect width="320" height="180" fill="#ffffff"/><rect x="20" y="140" width="70" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="55" y="163" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5</text><rect x="90" y="140" width="70" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="125" y="163" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-style="italic">x</text><rect x="160" y="140" width="70" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="195" y="163" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937" font-style="italic">2x</text><rect x="230" y="140" width="70" height="34" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="265" y="163" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4</text><rect x="55" y="106" width="70" height="34" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="125" y="106" width="70" height="34" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="195" y="106" width="70" height="34" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="90" y="72" width="70" height="34" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="160" y="72" width="70" height="34" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="125" y="38" width="70" height="34" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="160" y="61" font-size="15" font-family="sans-serif" text-anchor="middle" fill="#1f2937">72</text></svg>`,
      answer: { type: "number", value: 7 },
      solution: [
        "Build the wall upwards. Second row: {{5 + x}}, {{x + 2x = 3x}}, {{2x + 4}}.",
        "Third row: {{(5 + x) + 3x = 4x + 5}} and {{3x + (2x + 4) = 5x + 4}}.",
        "Top: {{(4x + 5) + (5x + 4) = 9x + 9}}.",
        "{{9x + 9 = 72}}, so {{9x = 63}} and {{x = 7}}.",
        "Check: bottom row 5, 7, 14, 4 → 12, 21, 18 → 33, 39 → 72 ✓.",
      ],
      solutions: [
        {
          label: "Count the routes to the top (slicker)",
          steps: [
            "Each bottom brick is added into the top once for every upward route from it to the top.",
            "The end bricks have 1 route each; the two middle bricks have 3 routes each — the pattern 1, 3, 3, 1 from Pascal's triangle.",
            "Top = 1 × 5 + 3 × x + 3 × 2x + 1 × 4 = {{9x + 9}}.",
            "{{9x + 9 = 72}} gives {{x = 7}}. Slicker: no wall-building, and it works for any bottom row of four.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 8 }, feedback: "Did you write the top brick as 9x? The 5 and the 4 feed into the top as well: {{9x + 9 = 72}}." },
      ],
      difficulty: "challenge",
      guideRef: "forming-equations",
      hints: [
        "Fill in the second row using algebra — what goes in the brick above 5 and x?",
        "Keep going up, collecting like terms in every brick.",
        "The top brick should simplify to {{9x + 9}}. Set it equal to 72.",
        "Shortcut to look for: how many times is each bottom number counted in the top brick?",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "equations-ch-q02",
      question: "Given that {{3a + 2b = 17}} and {{2a + 3b = 13}}, find the value of {{a + b}}.",
      answer: { type: "number", value: 6 },
      solution: [
        "Notice the symmetry in the coefficients: add the two equations.",
        "{{(3a + 2b) + (2a + 3b) = 17 + 13}}, so {{5a + 5b = 30}}.",
        "Divide by 5: {{a + b = 6}}.",
      ],
      solutions: [
        {
          label: "Solve fully, then add",
          steps: [
            "Multiply the first equation by 2 and the second by 3: {{6a + 4b = 34}} and {{6a + 9b = 39}}.",
            "Subtract: {{5b = 5}}, so {{b = 1}}. Then {{3a + 2 = 17}}, so {{a = 5}}.",
            "So {{a + b = 6}}. This works but takes longer — adding the equations is slicker because the question only asks for a + b, not a and b separately.",
          ],
        },
      ],
      traps: [{ spec: { type: "number", value: 4 }, feedback: "4 is {{a - b}} (from subtracting the equations). Try adding them instead." }],
      difficulty: "challenge",
      guideRef: "simultaneous-equations",
      hints: [
        "Do you really need a and b separately? Look at the coefficients: 3, 2 and then 2, 3.",
        "What happens if you add the two equations together?",
        "{{5a + 5b = 30}}. Now divide.",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "equations-ch-q03",
      question: "The sum of seven consecutive integers is 2002. What is the largest of these integers?",
      answer: { type: "number", value: 289 },
      solution: [
        "Let the middle integer be m. The seven integers are m − 3, m − 2, m − 1, m, m + 1, m + 2, m + 3.",
        "The −3 and +3, −2 and +2, −1 and +1 cancel, so the sum is {{7m}}.",
        "{{7m = 2002}}, so {{m = 286}}.",
        "The largest is m + 3 = 289. Check: 283 + 284 + 285 + 286 + 287 + 288 + 289 = 7 × 286 = 2002 ✓.",
      ],
      solutions: [
        {
          label: "Start from the smallest",
          steps: [
            "Let the smallest be n. The sum is n + (n + 1) + (n + 2) + … + (n + 6) = 7n + 21, since 0 + 1 + 2 + 3 + 4 + 5 + 6 = 21.",
            "{{7n + 21 = 2002}}, so {{7n = 1981}} and {{n = 283}}.",
            "Largest = n + 6 = 289. Same answer, but centring on the middle number is slicker — the extras cancel by symmetry.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 286 }, feedback: "286 is the middle integer (the mean). The largest is 3 more." },
        { spec: { type: "number", value: 283 }, feedback: "283 is the smallest. The question asks for the largest." },
      ],
      difficulty: "challenge",
      guideRef: "forming-equations",
      hints: [
        "For evenly spaced numbers, the mean is the middle number.",
        "What is 2002 ÷ 7?",
        "286 is the 4th of 7 numbers. How far above the middle is the largest?",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "equations-ch-q04",
      question:
        "Priya spends half of her money, plus $2 more, on a book. She then spends half of what is left, plus $2 more, on lunch at a hawker centre. She now has $5 left. How much money did she start with?",
      answer: { type: "number", value: 32, display: "$32" },
      solution: [
        "Work backwards, undoing each step in reverse order.",
        "Lunch: before the extra $2 she had 5 + 2 = $7 left, and that was half of her money before lunch. So before lunch she had 2 × 7 = $14.",
        "Book: before the extra $2 she had 14 + 2 = $16 left, and that was half of her starting money. So she started with 2 × 16 = $32.",
        "Check: from $32 she spends 16 + 2 = $18, leaving $14; then she spends 7 + 2 = $9, leaving $5 ✓.",
      ],
      solutions: [
        {
          label: "Algebra",
          steps: [
            "Let her starting amount be x dollars. After the book she has {{x/2 - 2}}.",
            "After lunch she has half of that, minus 2: {{x/4 - 1 - 2 = x/4 - 3}}.",
            "{{x/4 - 3 = 5}}, so {{x/4 = 8}} and {{x = 32}}.",
            "Working backwards is slicker here: each step is a simple inverse, with no fractions of expressions.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 26 },
          feedback: "Undo the steps in reverse order: first add back the $2, then double. Doubling first gives the wrong total.",
        },
      ],
      commonError: "Undoing 'halve, then subtract 2' as 'double, then add 2' — the inverse steps must come in reverse order: add 2, then double.",
      difficulty: "challenge",
      guideRef: "solving-equations",
      hints: [
        "Start from the end: she has $5. What did she have just before the last $2 was spent?",
        "Each 'spend half, plus $2' is undone by 'add $2, then double'.",
        "Before lunch she had $14. Now undo the book step the same way.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "equations-ch-q05",
      question:
        "An old puzzle about the mathematician Diophantus says: his boyhood lasted {{1/6}} of his life; his beard grew after a further {{1/12}}; after a further {{1/7}} he married; 5 years later his son was born; the son lived exactly half as long as his father's whole life; and Diophantus died 4 years after his son. How many years did Diophantus live?",
      answer: { type: "number", value: 84 },
      solution: [
        "Let his whole life be L years. All the stages add up to his whole life:",
        "{{L/6 + L/12 + L/7 + 5 + L/2 + 4 = L}}.",
        "Multiply every term by 84 (the LCM of 6, 12, 7 and 2): {{14L + 7L + 12L + 420 + 42L + 336 = 84L}}.",
        "{{75L + 756 = 84L}}, so {{9L = 756}} and {{L = 84}}.",
        "Check: 14 + 7 + 12 + 5 + 42 + 4 = 84 ✓.",
      ],
      solutions: [
        {
          label: "Think about divisibility (quicker, but needs an assumption)",
          steps: [
            "If {{L/6}}, {{L/12}}, {{L/7}} and {{L/2}} are whole numbers of years, L must be a multiple of 6, 12, 7 and 2 — a multiple of 84.",
            "84 is the only sensible human lifespan (168 is not). Test it: 14 + 7 + 12 + 5 + 42 + 4 = 84 ✓.",
            "This is quicker, but it rests on the assumption of whole numbers. The equation is the real proof that 84 is the only answer.",
          ],
        },
      ],
      commonError: "Forgetting to multiply the 5 and the 4 by 84 when clearing the fractions.",
      difficulty: "challenge",
      guideRef: "fractional-equations",
      hints: [
        "Let his life be L years. Write each stage in terms of L.",
        "All the stages together make his whole life: {{L/6 + L/12 + L/7 + 5 + L/2 + 4 = L}}.",
        "Clear the fractions: what is the LCM of 6, 12, 7 and 2?",
        "Multiplying by 84 gives {{75L + 756 = 84L}}.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "equations-ch-q06",
      question: "How many integers n satisfy {{1/4 < 3/n < 1/2}}?",
      answer: { type: "number", value: 5 },
      solution: [
        "{{3/n}} must be positive, so n is positive (a negative n makes {{3/n}} negative, which is not bigger than {{1/4}}).",
        "Rewrite the outer fractions with numerator 3: {{1/4 = 3/12}} and {{1/2 = 3/6}}.",
        "So {{3/12 < 3/n < 3/6}}. With equal numerators, a bigger fraction has a smaller denominator, so {{6 < n < 12}}.",
        "n = 7, 8, 9, 10 or 11 — that's **5** integers. (n = 6 gives exactly {{1/2}} and n = 12 gives exactly {{1/4}}, so both are excluded.)",
      ],
      solutions: [
        {
          label: "Solve two inequalities",
          steps: [
            "n is positive, so you can multiply through by n without flipping any signs.",
            "{{3/n > 1/4}}: multiply both sides by 4n to get {{12 > n}}.",
            "{{3/n < 1/2}}: multiply both sides by 2n to get {{6 < n}}.",
            "So {{6 < n < 12}}: 5 integers. Matching the numerators is slicker — one step, and it shows why the order of the denominators reverses.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 7 },
          feedback: "Check the ends: n = 6 gives {{3/6 = 1/2}}, which is not less than {{1/2}}; n = 12 gives exactly {{1/4}}. Both are excluded.",
        },
        { spec: { type: "number", value: 6 }, feedback: "One endpoint has slipped in. Test n = 6 and n = 12 separately — the inequalities are strict." },
      ],
      difficulty: "challenge",
      guideRef: "solving-inequalities",
      hints: [
        "Can n be negative? What sign would {{3/n}} have?",
        "Write {{1/4}} and {{1/2}} as fractions with numerator 3.",
        "{{3/12 < 3/n < 3/6}}. With the same numerator, how must the denominators compare?",
        "So {{6 < n < 12}}. Count carefully — are 6 and 12 included?",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "written",
      id: "equations-ch-q07",
      question:
        "Ethan writes:\n\n    {{3(x - 2) = 5(x - 2)}}\n    Divide both sides by (x − 2):\n    {{3 = 5}}\n\n'That's impossible, so this equation has no solution.'\n\nFind the flaw in Ethan's argument, then solve the equation correctly.",
      marks: 3,
      modelAnswer:
        "Ethan divided both sides by {{x - 2}}. That is only allowed if {{x - 2}} is not zero — you can never divide by 0. If x = 2, then {{x - 2 = 0}}, so his step throws away exactly the solution.\n\nCorrect method: expand both sides: {{3x - 6 = 5x - 10}}. Subtract 3x and add 10: {{4 = 2x}}, so {{x = 2}}.\n\nCheck: 3 × (2 − 2) = 0 and 5 × (2 − 2) = 0 ✓. In fact Ethan's working shows that for any x ≠ 2 the equation would need 3 = 5, which is false — so x = 2 is the **only** solution.",
      markScheme: [
        {
          point: "Identifies that dividing by (x − 2) is not allowed when x − 2 = 0 (you cannot divide by zero)",
          keywords: ["zero", "divide by 0", "dividing by 0", "divide by zero", "dividing by zero", "x - 2 = 0", "x − 2 = 0"],
        },
        { point: "Solves correctly: 3x − 6 = 5x − 10, so 4 = 2x and x = 2", keywords: ["3x - 6", "3x − 6", "5x - 10", "5x − 10", "x = 2", "x=2"] },
        { point: "Checks: both sides are 0 when x = 2 (and it is the only solution)", keywords: ["both sides", "0 = 0", "only solution", "check"] },
      ],
      solutions: [
        {
          label: "Treat (x − 2) as one block (slicker)",
          steps: [
            "Subtract {{3(x - 2)}} from both sides: {{0 = 2(x - 2)}}.",
            "A product is zero only if one of its factors is zero, so {{x - 2 = 0}} and {{x = 2}}.",
            "Slicker — no expanding — and it shows exactly why dividing by {{x - 2}} lost the answer.",
          ],
        },
      ],
      commonError: "Agreeing with Ethan because '3 = 5 is impossible' — the impossible line only appears because of an illegal step.",
      difficulty: "challenge",
      guideRef: "equations-with-brackets",
      hints: [
        "Is there any value of x that makes both sides equal? Try x = 2.",
        "When x = 2, what is {{x - 2}}? What is special about dividing by that?",
        "Now solve properly by expanding both brackets.",
      ],
      strategy: "Spot the error",
    },
    {
      kind: "short",
      id: "equations-ch-q08",
      question: "For how many integer values of k does the equation {{kx - 5 = 7}} have a solution x that is an integer?",
      answer: { type: "number", value: 12 },
      solution: [
        "Add 5: {{kx = 12}}. If k = 0 there is no solution at all (0 = 12 is false).",
        "Otherwise {{x = 12/k}}, which is an integer exactly when k is a factor of 12.",
        "Positive factors: 1, 2, 3, 4, 6, 12. Negative factors work too — for example k = −3 gives x = −4 — so also −1, −2, −3, −4, −6, −12.",
        "Total: 6 + 6 = **12** values of k.",
      ],
      traps: [
        { spec: { type: "number", value: 6 }, feedback: "Don't forget negative values of k: k = −4 gives x = −3, which is an integer." },
        { spec: { type: "number", value: 13 }, feedback: "k = 0 doesn't work: {{0 * x = 12}} has no solution." },
      ],
      commonError: "Counting only the positive factors of 12.",
      difficulty: "challenge",
      guideRef: "solving-equations",
      hints: [
        "Simplify the equation first. What is kx equal to?",
        "{{x = 12/k}}. When is that a whole number?",
        "k must be a factor of 12. Have you counted the negative factors? What about k = 0?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "written",
      id: "equations-ch-q09",
      question:
        "Suppose {{a < b}} and {{c < d}}. Decide whether each statement is **always**, **sometimes** or **never** true. Justify each answer.\n\n(i) {{a + c < b + d}}\n\n(ii) {{a - c < b - d}}",
      marks: 4,
      modelAnswer:
        "(i) **Always true.** Add c to both sides of {{a < b}}: {{a + c < b + c}}. Add b to both sides of {{c < d}}: {{b + c < b + d}}. Chaining these: {{a + c < b + c < b + d}}. (Or: {{(b + d) - (a + c) = (b - a) + (d - c)}}, a positive plus a positive, so it is positive.)\n\n(ii) **Sometimes true.**\nTrue: a = 1, b = 5, c = 0, d = 1 gives 1 − 0 = 1 and 5 − 1 = 4, and 1 < 4 ✓.\nFalse: a = 1, b = 2, c = 0, d = 5 gives 1 − 0 = 1 and 2 − 5 = −3, and 1 < −3 is false.\n\nSubtracting the bigger number d can wipe out the lead b has over a. You can **add** inequalities that point the same way, but you cannot subtract them.",
      markScheme: [
        { point: "(i) always true", keywords: ["always"] },
        {
          point: "(i) valid reason, e.g. a + c < b + c < b + d, or (b + d) − (a + c) = (b − a) + (d − c) is positive",
          keywords: ["b + c", "b+c", "positive", "b - a", "b − a", "d - c", "d − c", "add"],
        },
        { point: "(ii) sometimes true", keywords: ["sometimes"] },
        { point: "(ii) gives one example where it is true and one where it is false", keywords: ["example", "counterexample", "e.g.", "a =", "a=", "d =", "d="] },
      ],
      solutions: [
        {
          label: "Think of it as a race",
          steps: [
            "(i) If b is ahead of a, and d is ahead of c, then b and d together are ahead of a and c together — always.",
            "(ii) Subtracting d takes away more than subtracting c, so whether b − d stays ahead of a − c depends on which gap is bigger: d − c or b − a. So it is only sometimes true.",
          ],
        },
      ],
      commonError: "Assuming that because you can add inequalities, you can subtract them too.",
      difficulty: "challenge",
      guideRef: "inequalities",
      hints: [
        "Try some numbers first. Pick a < b and c < d, and test both statements.",
        "For (i): add c to both sides of {{a < b}}. How does {{b + c}} compare with {{b + d}}?",
        "For (ii): try making d much bigger than c. What happens to {{b - d}}?",
      ],
      strategy: "Always, sometimes, never: test cases",
    },
    {
      kind: "short",
      id: "equations-ch-q10",
      question:
        "Mei cycles to school. If she rides at 15 km/h she arrives 4 minutes late. If she rides at 20 km/h she arrives 2 minutes early. How far is it to school, in km?",
      answer: { type: "number", value: 6 },
      solution: [
        "Let the distance be d km. Time = distance ÷ speed, so the two journey times are {{d/15}} and {{d/20}} hours.",
        "The slower journey takes 4 + 2 = 6 minutes longer, and 6 minutes = {{6/60 = 1/10}} of an hour.",
        "{{d/15 - d/20 = 1/10}}.",
        "Multiply every term by 60: {{4d - 3d = 6}}, so {{d = 6}}.",
        "Check: 6 km at 15 km/h takes 24 minutes; at 20 km/h it takes 18 minutes. The difference is 6 minutes ✓.",
      ],
      solutions: [
        {
          label: "Use the ratio of the times (slicker)",
          steps: [
            "The speeds are in the ratio 15 : 20 = 3 : 4, so for the same distance the times are in the ratio 4 : 3.",
            "The difference, 1 part, is 6 minutes, so the slow journey takes 4 × 6 = 24 minutes.",
            "Distance = 15 km/h × {{24/60}} h = 6 km. Slicker — no fractions in d at all.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 2 }, feedback: "The gap between 4 minutes late and 2 minutes early is 4 + 2 = 6 minutes, not 4 − 2 = 2." },
        {
          spec: { type: "number", value: 360 },
          feedback: "The speeds are in km per **hour**, so the 6 minutes must be written as {{1/10}} of an hour.",
        },
      ],
      commonError: "Mixing minutes and hours, or using 4 − 2 = 2 minutes as the time difference.",
      difficulty: "challenge",
      guideRef: "fractional-equations",
      hints: [
        "Let the distance be d km. Write each journey time, in hours, in terms of d.",
        "How many minutes longer is the slow journey than the fast one? Convert that to hours.",
        "{{d/15 - d/20 = 1/10}}. Clear the fractions by multiplying by 60.",
        "Another route: the speeds are in the ratio 3 : 4. What is the ratio of the times?",
      ],
      strategy: "Introduce a variable",
    },
  ],
};
