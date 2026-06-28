import type { Topic } from "../types";

export const equations: Topic = {
  id: "equations",
  title: "Equations & Inequalities",
  subject: "Maths",
  icon: "🟰",
  strand: "Algebra",
  intro:
    "Solving linear equations by keeping the balance, forming equations from words, and solving and drawing inequalities on a number line.",
  guide: [
    {
      heading: "The balance: solving one- and two-step equations",
      discovery: {
        problem:
          "A pan balance holds 3 identical bags plus a 4 kg weight on the left, and a single 19 kg weight on the right — and it balances. How heavy is one bag? Write down what you did to both pans.",
        idea:
          "Take 4 kg off both pans: 3 bags balance 15 kg. Split both pans into 3 equal parts: one bag = 5 kg. Whatever you do to one side of an equation you must do to the other — that keeps it balanced. So 3x + 4 = 19 gives x = 5.",
      },
      body:
        "An equation says two expressions are **equal**. Solving means finding the value of the unknown that makes it true.\n\nThink of the = sign as a balance. To keep it level, do the **same operation to both sides**. Undo operations in reverse order of BIDMAS: deal with + and − first, then × and ÷.\n\nFor 3x + 4 = 19: subtract 4 from both sides to get 3x = 15, then divide both sides by 3 to get x = 5.",
      keyPoints: [
        "Do the same thing to both sides to keep the balance.",
        "Undo + and − first, then × and ÷ (reverse of BIDMAS).",
        "One-step: 1 operation to undo. Two-step: 2 operations to undo.",
        "Always check by substituting your answer back in.",
      ],
      strategies: ["Keep the balance", "Undo in reverse order", "Check by substitution"],
      whyItWorks:
        "If a = b, then a − 4 and b − 4 are still equal, and a ÷ 3 and b ÷ 3 are still equal. Equality is preserved by any identical operation, so the unknown is unchanged while the equation gets simpler.",
    },
    {
      heading: "Unknowns on both sides and brackets",
      discovery: {
        problem:
          "Solve 5x − 2 = 2x + 13. The x's are on both sides — you cannot just undo one number. What single move collects all the x's on one side?",
        idea:
          "Subtract 2x from both sides: 3x − 2 = 13. Now it is an ordinary two-step equation: add 2 (3x = 15), divide by 3 (x = 5). Gather the unknowns on one side, the numbers on the other.",
      },
      body:
        "When the unknown appears on **both sides**, first collect the x-terms on one side (usually the side with more x's) and the numbers on the other, then solve as usual.\n\nWhen there are **brackets**, expand first: 4(x + 3) = 4x + 12. Then solve. Alternatively, if the whole side is over a bracket, you can divide both sides by the multiplier first: 4(x + 3) = 20 → x + 3 = 5 → x = 2.",
      keyPoints: [
        "Collect x's on one side, numbers on the other.",
        "Subtract the smaller x-term to avoid negatives where you can.",
        "Expand brackets first, e.g. 3(2x − 1) = 6x − 3.",
        "Check the solution works in the ORIGINAL equation.",
      ],
      strategies: ["Collect like terms", "Expand brackets first", "Choose the side with more x's"],
      whyItWorks:
        "Subtracting 2x from both sides of 5x − 2 = 2x + 13 keeps equality (both sides drop by the same amount), but removes x entirely from the right, leaving a simple equation in one place.",
    },
    {
      heading: "Equations with fractions and forming equations",
      discovery: {
        problem:
          "I think of a number, multiply it by 3, then add 7, and the result is 25. Call the number n and write an equation. Then a tougher one: a number divided by 4 gives 6 — what is the number?",
        idea:
          "Turn words into algebra: 3n + 7 = 25 → 3n = 18 → n = 6. For x/4 = 6, multiply both sides by 4: x = 24. The denominator is undone by multiplying.",
      },
      body:
        "To clear a **fraction**, multiply both sides by the denominator: x/5 = 4 means x = 20. If the whole side is a fraction like (x + 1)/3 = 4, multiply both sides by 3 first: x + 1 = 12, so x = 11.\n\nTo **form an equation from words**, name the unknown with a letter, translate each phrase into algebra, then solve. 'Three times a number, less 2, is 19' becomes 3n − 2 = 19.",
      keyPoints: [
        "Multiply both sides by the denominator to clear a fraction.",
        "(x + 1)/3 = 4 → multiply by 3 → x + 1 = 12.",
        "Choose a letter, translate phrases, then solve.",
        "Perimeter, angles and 'consecutive numbers' often give equations.",
      ],
      strategies: ["Clear fractions by multiplying", "Translate words to symbols", "Let a letter stand for the unknown"],
      whyItWorks:
        "x/5 and 4 are equal, so multiplying both by 5 keeps them equal: x = 20. Multiplying by the denominator is just 'doing the same thing to both sides' to undo the division.",
    },
    {
      heading: "Inequalities and the number line",
      discovery: {
        problem:
          "Solve −2x < 6. If you divide both sides by −2 you get x < −3. Test x = 0: is −2(0) < 6 true? It is (0 < 6). But 0 < −3 is false! What went wrong?",
        idea:
          "Dividing or multiplying an inequality by a NEGATIVE reverses the sign. −2x < 6 gives x > −3, not x < −3. Test x = 0 again: 0 > −3 is true. The flip fixes it.",
      },
      body:
        "An **inequality** uses <, >, ≤ or ≥ instead of =. Solve it almost exactly like an equation — but with one extra rule.\n\n**If you multiply or divide both sides by a negative number, reverse the inequality sign.** So −3x ≥ 12 becomes x ≤ −4.\n\nOn a number line, use an **open circle (○)** for < or > (not included) and a **closed circle (●)** for ≤ or ≥ (included), with an arrow showing the direction of all the values that work.",
      keyPoints: [
        "Solve like an equation: same steps to both sides.",
        "Multiply or divide by a negative ⇒ FLIP the sign.",
        "Open circle ○ = strict (<, >); closed circle ● = inclusive (≤, ≥).",
        "x ≥ 2 shades 2 and everything to its right.",
      ],
      strategies: ["Solve like an equation", "Flip when dividing by a negative", "Test a value to check direction"],
      whyItWorks:
        "On a number line, multiplying by −1 reflects every value across zero, which reverses their order: if 2 < 5 then −2 > −5. So the inequality sign must flip to stay true.",
    },
    {
      heading: "Integer solutions of an inequality",
      discovery: {
        problem:
          "Solve −1 < x ≤ 4, then list only the WHOLE-NUMBER (integer) solutions. How many are there, and why must you be careful at each end?",
        idea: "−1 < x means x is bigger than −1 (so −1 is NOT allowed). x ≤ 4 means x can equal 4. The integers are 0, 1, 2, 3, 4 — five of them. The strict end (−1, open) is excluded; the inclusive end (4, closed) is included.",
      },
      body:
        "Sometimes you only want the **integer** (whole-number) solutions of an inequality. First solve the inequality as usual, then list the integers that satisfy it — watching carefully which endpoints are included.\n\nFor a single inequality like 2x + 1 ≤ 9, solve to x ≤ 4; the integer solutions are … 2, 3, 4 (and all integers below). If the question also says x is positive, the list is 1, 2, 3, 4.\n\nFor a **double inequality** like −3 ≤ x < 2, the solution is everything from −3 up to (but not including) 2. The integer solutions are −3, −2, −1, 0, 1 — include −3 because of ≤, but exclude 2 because of <.\n\nThe key is the endpoint rule: ≤ or ≥ **includes** the end value; < or > **excludes** it.",
      keyPoints: [
        "Solve the inequality first, then list the integers that fit.",
        "≤ or ≥ includes the boundary value; < or > excludes it.",
        "A double inequality a ≤ x < b means a is included, b is not.",
        "Check whether the question restricts to positive integers or a range.",
      ],
      strategies: ["Solve first, then list integers", "Check each endpoint: included or excluded?", "Mark the boundaries on a number line"],
      whyItWorks:
        "The solved inequality describes a continuous stretch of the number line; the integers in that stretch are simply the whole numbers lying inside it. Open ends (<, >) sit just short of the boundary, so the boundary integer is left out; closed ends (≤, ≥) reach the boundary, so it is counted.",
    },
  ],
  learn: {
    cards: [
      { front: "Solve 2x = 14", back: "Divide both sides by 2: x = 7." },
      { front: "Solve x + 9 = 4", back: "Subtract 9 from both sides: x = −5." },
      { front: "Golden rule of equations", back: "Do the same thing to both sides to keep the balance." },
      { front: "Solve 3x + 4 = 19", back: "−4: 3x = 15, then ÷3: x = 5." },
      { front: "Solve 5x = 2x + 12", back: "−2x: 3x = 12, then ÷3: x = 4." },
      { front: "Expand 4(x + 3)", back: "4x + 12 — multiply each term inside by 4." },
      { front: "Solve x/5 = 4", back: "Multiply both sides by 5: x = 20." },
      { front: "Divide an inequality by a negative — what happens?", back: "The inequality sign reverses, e.g. −2x < 6 → x > −3." },
      { front: "Open vs closed circle", back: "Open ○ for < or >; closed ● for ≤ or ≥." },
      { front: "Integer solutions of −1 < x ≤ 3", back: "0, 1, 2, 3 — exclude −1 (strict <), include 3 (≤)." },
      { front: "Does ≤ include the boundary value?", back: "Yes — ≤ and ≥ include the end value; < and > exclude it." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "equations-mcq-q01",
        question: "Solve 4x = 28.",
        options: ["x = 7", "x = 24", "x = 32", "x = 112"],
        answerIndex: 0,
        explanation: "Divide both sides by 4: 28 ÷ 4 = 7.",
        difficulty: "warmup",
        guideRef: "The balance: solving one- and two-step equations",
        strategy: "Undo the multiplication",
      },
      {
        id: "equations-mcq-q02",
        question: "Solve 3x − 5 = 16.",
        options: ["x = 7", "x = 3", "x = 11", "x = 21"],
        answerIndex: 0,
        explanation: "Add 5: 3x = 21. Divide by 3: x = 7.",
        difficulty: "core",
        guideRef: "The balance: solving one- and two-step equations",
        hints: ["Undo the −5 first.", "Then undo the ×3 by dividing.", "3x = 21, so x = 7."],
        strategy: "Undo in reverse order",
      },
      {
        id: "equations-mcq-q03",
        question: "Solve 6x − 1 = 4x + 9.",
        options: ["x = 5", "x = 4", "x = 8", "x = 2"],
        answerIndex: 0,
        explanation: "Subtract 4x: 2x − 1 = 9. Add 1: 2x = 10. Divide by 2: x = 5.",
        difficulty: "core",
        guideRef: "Unknowns on both sides and brackets",
        hints: ["Collect the x's on one side.", "Subtract 4x from both sides first.", "2x − 1 = 9 → 2x = 10 → x = 5."],
        strategy: "Collect like terms",
      },
      {
        id: "equations-mcq-q04",
        question: "Solve 2(x + 4) = 18.",
        options: ["x = 5", "x = 7", "x = 9", "x = 11"],
        answerIndex: 0,
        explanation: "Divide both sides by 2: x + 4 = 9. Subtract 4: x = 5. (Or expand: 2x + 8 = 18.)",
        difficulty: "core",
        guideRef: "Unknowns on both sides and brackets",
        hints: ["Either expand the bracket or divide both sides by 2.", "x + 4 = 9.", "x = 5."],
        strategy: "Expand brackets first",
      },
      {
        id: "equations-mcq-q05",
        question: "Solve the inequality −2x < 6.",
        options: ["x > −3", "x < −3", "x > 3", "x < 3"],
        answerIndex: 0,
        explanation: "Divide both sides by −2 and FLIP the sign: x > −3.",
        difficulty: "challenge",
        guideRef: "Inequalities and the number line",
        hints: [
          "You are dividing by a negative number.",
          "What special rule applies when dividing an inequality by a negative?",
          "Flip the sign: x > −3. Check x = 0: −2(0) = 0 < 6 ✓ and 0 > −3 ✓.",
        ],
        strategy: "Flip when dividing by a negative",
      },
      {
        id: "equations-mcq-q06",
        question:
          "I think of a number, double it, then add 3. The result is the same as adding 11 to the number. What was the number?",
        options: ["8", "7", "14", "4"],
        answerIndex: 0,
        explanation: "Form 2n + 3 = n + 11. Subtract n: n + 3 = 11. Subtract 3: n = 8.",
        difficulty: "challenge",
        guideRef: "Equations with fractions and forming equations",
        hints: [
          "Let the number be n and write both descriptions as expressions.",
          "Doubled and add 3 is 2n + 3; add 11 is n + 11.",
          "2n + 3 = n + 11 → n = 8.",
        ],
        strategy: "Form an equation from words",
      },
    ],
    qa: [
      {
        id: "equations-qa-q01",
        question: "Solve 5x + 2 = 3x + 14. Show your working and check your answer.",
        modelAnswer:
          "Subtract 3x: 2x + 2 = 14. Subtract 2: 2x = 12. Divide by 2: x = 6. Check: 5(6) + 2 = 32 and 3(6) + 14 = 32. ✓",
        markScheme: [
          "Subtract 3x: 2x + 2 = 14 [1]",
          "Subtract 2: 2x = 12 [1]",
          "Divide by 2: x = 6 [1]",
          "Valid check by substitution [1]",
        ],
        commonError: "Subtracting 5x instead of the smaller 3x, creating a negative x-term.",
        difficulty: "core",
        guideRef: "Unknowns on both sides and brackets",
        hints: ["Collect x's on the side with more of them.", "Subtract 3x from both sides.", "Then solve the two-step equation."],
        strategy: "Collect like terms then check",
      },
      {
        id: "equations-qa-q02",
        question:
          "The length of a rectangle is 3 cm more than its width. The perimeter is 26 cm. Form an equation and find the width and length.",
        modelAnswer:
          "Let the width be w. Length = w + 3. Perimeter = 2(w + w + 3) = 26, so 2(2w + 3) = 26 → 4w + 6 = 26 → 4w = 20 → w = 5. Width = 5 cm, length = 8 cm.",
        markScheme: [
          "Define width as w and length as w + 3 [1]",
          "Form 2(2w + 3) = 26 or equivalent [1]",
          "Solve to w = 5 [1]",
          "Width 5 cm and length 8 cm [1]",
        ],
        commonError: "Using perimeter = w + (w + 3) and forgetting there are two of each side.",
        difficulty: "core",
        guideRef: "Equations with fractions and forming equations",
        hints: ["Name the width with a letter.", "Perimeter is twice the sum of length and width.", "2(2w + 3) = 26."],
        strategy: "Form an equation from a shape",
      },
      {
        id: "equations-qa-q03",
        question:
          "Solve the equation (x + 1)/2 + x = 8. Use any valid method, and show your reasoning.",
        modelAnswer:
          "Multiply every term by 2: (x + 1) + 2x = 16, so 3x + 1 = 16 → 3x = 15 → x = 5. Check: (5 + 1)/2 + 5 = 3 + 5 = 8. ✓",
        markScheme: [
          "Multiply through by 2 (or rearrange) [1]",
          "(x + 1) + 2x = 16 → 3x + 1 = 16 [1]",
          "3x = 15, x = 5 [1]",
        ],
        difficulty: "challenge",
        guideRef: "Equations with fractions and forming equations",
        hints: [
          "The fraction makes this awkward — clear it first.",
          "Multiply EVERY term by the denominator 2.",
          "Remember 2 × x = 2x and 2 × 8 = 16.",
        ],
        strategy: "Clear fractions, then solve",
        solutions: [
          {
            label: "Clear the fraction first",
            steps: [
              "Multiply every term by 2: (x + 1) + 2x = 16.",
              "Simplify: 3x + 1 = 16.",
              "Subtract 1: 3x = 15. Divide by 3: x = 5.",
            ],
          },
          {
            label: "Trial and improvement",
            steps: [
              "Try x = 4: (5)/2 + 4 = 2.5 + 4 = 6.5 — too small.",
              "Try x = 6: (7)/2 + 6 = 3.5 + 6 = 9.5 — too big.",
              "Try x = 5: (6)/2 + 5 = 3 + 5 = 8 ✓ — so x = 5.",
            ],
          },
        ],
      },
      {
        id: "equations-qa-q04",
        question:
          "Solve the inequality 4 − 3x ≥ 13 and show the solution on a number line.",
        modelAnswer:
          "Subtract 4: −3x ≥ 9. Divide by −3 and FLIP: x ≤ −3. On the number line, a closed circle ● at −3 with an arrow pointing left.",
        markScheme: [
          "Subtract 4: −3x ≥ 9 [1]",
          "Divide by −3 and reverse the sign: x ≤ −3 [1]",
          "Closed circle at −3, arrow to the left [1]",
        ],
        commonError: "Forgetting to reverse the sign when dividing by −3, giving x ≥ −3.",
        difficulty: "challenge",
        guideRef: "Inequalities and the number line",
        hints: ["Treat it like an equation to start.", "Watch the division by a negative.", "Reverse ≥ to ≤; closed circle because of the ≥."],
        strategy: "Flip when dividing by a negative",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "equations-mcq-paper-1",
        title: "Equations & Inequalities — MCQ Set A",
        questions: [
          {
            id: "equations-mcq-b1-q01",
            question: "Solve x + 7 = 12.",
            options: ["x = 5", "x = 19", "x = 84", "x = −5"],
            answerIndex: 0,
            explanation: "Subtract 7 from both sides: x = 5.",
            difficulty: "warmup",
          },
          {
            id: "equations-mcq-b1-q02",
            question: "Solve x/3 = 6.",
            options: ["x = 18", "x = 2", "x = 9", "x = 3"],
            answerIndex: 0,
            explanation: "Multiply both sides by 3: x = 18.",
            difficulty: "warmup",
          },
          {
            id: "equations-mcq-b1-q03",
            question: "Solve 5x + 3 = 23.",
            options: ["x = 4", "x = 5", "x = 20", "x = 26"],
            answerIndex: 0,
            explanation: "Subtract 3: 5x = 20. Divide by 5: x = 4.",
            difficulty: "core",
            hints: ["Undo the +3 first.", "Then divide by 5."],
            strategy: "Undo in reverse order",
          },
          {
            id: "equations-mcq-b1-q04",
            question: "Solve 3(x − 2) = 12.",
            options: ["x = 6", "x = 4", "x = 2", "x = 14"],
            answerIndex: 0,
            explanation: "Divide by 3: x − 2 = 4. Add 2: x = 6.",
            difficulty: "core",
            hints: ["Divide both sides by 3, or expand to 3x − 6 = 12."],
            strategy: "Expand brackets first",
          },
          {
            id: "equations-mcq-b1-q05",
            question: "Solve 7x − 4 = 2x + 11.",
            options: ["x = 3", "x = 5", "x = 2", "x = 15"],
            answerIndex: 0,
            explanation: "Subtract 2x: 5x − 4 = 11. Add 4: 5x = 15. Divide by 5: x = 3.",
            difficulty: "core",
            strategy: "Collect like terms",
          },
          {
            id: "equations-mcq-b1-q06",
            question:
              "Which inequality describes 'x is at least −2 and less than 4'?",
            options: ["−2 ≤ x < 4", "−2 < x ≤ 4", "−2 < x < 4", "−2 ≤ x ≤ 4"],
            answerIndex: 0,
            explanation: "'At least −2' includes −2 (≤) and 'less than 4' excludes 4 (<): −2 ≤ x < 4.",
            difficulty: "challenge",
            hints: ["'At least' means it can equal that value.", "'Less than' does not include the value.", "Use ≤ for −2 and < for 4."],
            strategy: "Translate words to symbols",
          },
        ],
      },
      {
        id: "equations-mcq-paper-2",
        title: "Equations & Inequalities — MCQ Set B",
        questions: [
          {
            id: "equations-mcq-b2-q01",
            question: "Solve 2x − 9 = 1.",
            options: ["x = 5", "x = 4", "x = 10", "x = −4"],
            answerIndex: 0,
            explanation: "Add 9: 2x = 10. Divide by 2: x = 5.",
            difficulty: "warmup",
          },
          {
            id: "equations-mcq-b2-q02",
            question: "Solve 8 − x = 3.",
            options: ["x = 5", "x = 11", "x = −5", "x = 24"],
            answerIndex: 0,
            explanation: "Subtract 8: −x = −5, so x = 5. (Or add x then subtract 3.)",
            difficulty: "warmup",
          },
          {
            id: "equations-mcq-b2-q03",
            question: "Solve (x + 5)/2 = 7.",
            options: ["x = 9", "x = 12", "x = 4", "x = 19"],
            answerIndex: 0,
            explanation: "Multiply by 2: x + 5 = 14. Subtract 5: x = 9.",
            difficulty: "core",
            hints: ["Clear the fraction by multiplying both sides by 2."],
            strategy: "Clear fractions",
          },
          {
            id: "equations-mcq-b2-q04",
            question: "Solve 4(2x − 1) = 28.",
            options: ["x = 4", "x = 3.5", "x = 8", "x = 3"],
            answerIndex: 0,
            explanation: "Divide by 4: 2x − 1 = 7. Add 1: 2x = 8. Divide by 2: x = 4.",
            difficulty: "core",
            strategy: "Expand brackets first",
          },
          {
            id: "equations-mcq-b2-q05",
            question: "Solve the inequality 3x + 1 ≤ 16.",
            options: ["x ≤ 5", "x ≥ 5", "x ≤ 6", "x < 5"],
            answerIndex: 0,
            explanation: "Subtract 1: 3x ≤ 15. Divide by 3 (positive, no flip): x ≤ 5.",
            difficulty: "core",
            hints: ["Solve like an equation.", "Dividing by +3 does not flip the sign."],
            strategy: "Solve like an equation",
          },
          {
            id: "equations-mcq-b2-q06",
            question:
              "Three consecutive integers add up to 72. What is the largest of them?",
            options: ["25", "24", "23", "26"],
            answerIndex: 0,
            explanation:
              "Let them be n, n+1, n+2. Then 3n + 3 = 72 → 3n = 69 → n = 23. The largest is n + 2 = 25.",
            difficulty: "challenge",
            hints: [
              "Call the smallest n and write the next two.",
              "Their sum is 3n + 3 = 72.",
              "n = 23, so the largest is 25.",
            ],
            strategy: "Form an equation from consecutive numbers",
          },
        ],
      },
      {
        id: "equations-mcq-paper-3",
        title: "Equations & Inequalities — MCQ Set C",
        questions: [
          {
            id: "equations-add-mcq01",
            question: "x is an integer and 2 ≤ x < 6. Which list gives ALL its integer solutions?",
            options: ["2, 3, 4, 5", "2, 3, 4, 5, 6", "3, 4, 5", "3, 4, 5, 6"],
            answerIndex: 0,
            explanation: "2 ≤ x includes 2; x < 6 excludes 6. So the integers are 2, 3, 4, 5.",
            difficulty: "warmup",
            guideRef: "Integer solutions of an inequality",
            hints: ["≤ includes the boundary; < excludes it.", "Start at 2 (included) and stop before 6 (excluded)."],
            strategy: "Check each endpoint: included or excluded?",
          },
          {
            id: "equations-add-mcq02",
            question: "How many integers satisfy −3 < x ≤ 2?",
            options: ["5", "6", "4", "3"],
            answerIndex: 0,
            explanation: "−3 is excluded (strict <), 2 is included (≤). The integers are −2, −1, 0, 1, 2 — that is 5 values.",
            difficulty: "core",
            guideRef: "Integer solutions of an inequality",
            hints: [
              "List the integers from just above −3 up to 2.",
              "−3 is NOT included, but 2 IS.",
              "−2, −1, 0, 1, 2 — count them.",
            ],
            strategy: "Solve first, then list integers",
          },
          {
            id: "equations-add-mcq03",
            question: "Solve 3x − 4 ≥ 11, then give the smallest integer value of x that works.",
            options: ["5", "4", "6", "15"],
            answerIndex: 0,
            explanation: "3x − 4 ≥ 11 → 3x ≥ 15 → x ≥ 5. The smallest integer satisfying x ≥ 5 is 5.",
            difficulty: "core",
            guideRef: "Integer solutions of an inequality",
            hints: ["Solve the inequality first.", "Add 4, then divide by 3: x ≥ 5.", "≥ 5 includes 5 itself."],
            strategy: "Solve first, then list integers",
          },
          {
            id: "equations-add-mcq04",
            question: "Solve x/4 + 3 = 7.",
            options: ["x = 16", "x = 10", "x = 28", "x = 1"],
            answerIndex: 0,
            explanation: "Subtract 3: x/4 = 4. Multiply by 4: x = 16.",
            difficulty: "core",
            guideRef: "Equations with fractions and forming equations",
            hints: ["Undo the +3 first.", "x/4 = 4.", "Multiply both sides by 4."],
            strategy: "Clear fractions",
          },
          {
            id: "equations-add-mcq05",
            question: "Solve the inequality 5 − 2x ≥ 1.",
            options: ["x ≤ 2", "x ≥ 2", "x ≤ 3", "x ≥ −2"],
            answerIndex: 0,
            explanation: "Subtract 5: −2x ≥ −4. Divide by −2 and FLIP: x ≤ 2.",
            difficulty: "challenge",
            guideRef: "Inequalities and the number line",
            hints: [
              "Get the x-term alone: subtract 5 to get −2x ≥ −4.",
              "Dividing by −2 means flipping the sign.",
              "x ≤ 2. Check x = 0: 5 − 0 = 5 ≥ 1 ✓.",
            ],
            strategy: "Flip when dividing by a negative",
          },
          {
            id: "equations-add-mcq06",
            question: "n is a positive integer and 4n − 3 < 17. What is the largest possible value of n?",
            options: ["4", "5", "3", "20"],
            answerIndex: 0,
            explanation: "4n − 3 < 17 → 4n < 20 → n < 5. The largest positive integer less than 5 is 4.",
            difficulty: "challenge",
            guideRef: "Integer solutions of an inequality",
            hints: [
              "Solve for n: add 3, then divide by 4.",
              "n < 5 (strict, so 5 is NOT allowed).",
              "The largest integer below 5 is 4.",
            ],
            strategy: "Solve first, then list integers",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "equations-qa-paper-1",
        title: "Equations & Inequalities — Written Set A",
        questions: [
          {
            id: "equations-qa-b1-q01",
            question: "Solve 6x + 5 = 41.",
            modelAnswer: "Subtract 5: 6x = 36. Divide by 6: x = 6.",
            markScheme: ["6x = 36 [1]", "x = 6 [1]"],
            difficulty: "warmup",
          },
          {
            id: "equations-qa-b1-q02",
            question: "Solve 4x + 7 = 6x − 5. Show each step clearly.",
            modelAnswer:
              "Subtract 4x: 7 = 2x − 5. Add 5: 12 = 2x. Divide by 2: x = 6. Check: 4(6) + 7 = 31 and 6(6) − 5 = 31. ✓",
            markScheme: [
              "Collect x's: 7 = 2x − 5 (or 2x − 5 = 7) [1]",
              "Add 5: 2x = 12 [1]",
              "x = 6 [1]",
            ],
            commonError: "Subtracting 6x instead of the smaller 4x, leading to −2x.",
            difficulty: "core",
            hints: ["Move the x's to the side with more x's.", "Subtract 4x from both sides."],
            strategy: "Collect like terms",
          },
          {
            id: "equations-qa-b1-q03",
            question:
              "Solve the inequality −5x > 20 and show the result on a number line.",
            modelAnswer:
              "Divide both sides by −5 and FLIP: x < −4. Number line: open circle ○ at −4, arrow pointing left.",
            markScheme: [
              "Divide by −5 and reverse the sign: x < −4 [1]",
              "Open circle at −4 [1]",
              "Arrow to the left [1]",
            ],
            commonError: "Not reversing the sign, giving x > −4.",
            difficulty: "challenge",
            hints: ["Dividing by a negative.", "Flip > to <.", "Open circle because it is a strict inequality."],
            strategy: "Flip when dividing by a negative",
          },
          {
            id: "equations-qa-b1-q04",
            question:
              "Challenge: In a triangle the angles are x, 2x and (x + 40) degrees. Form an equation and find all three angles.",
            modelAnswer:
              "Angles in a triangle sum to 180: x + 2x + (x + 40) = 180 → 4x + 40 = 180 → 4x = 140 → x = 35. The angles are 35°, 70° and 75°.",
            markScheme: [
              "Use angle sum: x + 2x + x + 40 = 180 [1]",
              "Simplify: 4x + 40 = 180 [1]",
              "x = 35 [1]",
              "Angles 35°, 70°, 75° (and they sum to 180) [1]",
            ],
            difficulty: "challenge",
            hints: ["What do the three angles of a triangle add up to?", "Add the three expressions and set equal to 180.", "4x + 40 = 180."],
            strategy: "Form an equation from a geometric fact",
          },
        ],
      },
      {
        id: "equations-qa-paper-2",
        title: "Equations & Inequalities — Written Set B",
        questions: [
          {
            id: "equations-add-qa01",
            question:
              "Solve the inequality 2x + 1 ≤ 9. List all the integer values of x that satisfy it AND are greater than 0.",
            modelAnswer:
              "Subtract 1: 2x ≤ 8. Divide by 2: x ≤ 4. Integers greater than 0 and at most 4 are 1, 2, 3, 4.",
            markScheme: [
              "2x ≤ 8 [1]",
              "x ≤ 4 [1]",
              "Integers 1, 2, 3, 4 [1]",
            ],
            commonError: "Including 0 (not greater than 0) or 5 (since x must be ≤ 4).",
            difficulty: "core",
            guideRef: "Integer solutions of an inequality",
            hints: ["Solve the inequality first.", "x ≤ 4, and x must also be more than 0.", "List 1, 2, 3, 4."],
            strategy: "Solve first, then list integers",
          },
          {
            id: "equations-add-qa02",
            question:
              "Solve 3(2x − 1) = x + 12, showing each step, and check your answer in the original equation.",
            modelAnswer:
              "Expand: 6x − 3 = x + 12. Subtract x: 5x − 3 = 12. Add 3: 5x = 15. Divide by 5: x = 3. Check: 3(2×3 − 1) = 3 × 5 = 15 and x + 12 = 3 + 12 = 15. ✓",
            markScheme: [
              "Expand brackets: 6x − 3 = x + 12 [1]",
              "Collect x's: 5x − 3 = 12 [1]",
              "Solve: 5x = 15, x = 3 [1]",
              "Valid check by substitution [1]",
            ],
            commonError: "Forgetting to multiply BOTH terms inside the bracket by 3, or not subtracting x from both sides.",
            difficulty: "core",
            guideRef: "Unknowns on both sides and brackets",
            hints: ["Expand the bracket first.", "Then collect the x's on one side.", "5x = 15."],
            strategy: "Expand brackets first",
            solutions: [
              {
                label: "Expand then collect",
                steps: [
                  "3(2x − 1) = 6x − 3.",
                  "6x − 3 = x + 12 → subtract x: 5x − 3 = 12.",
                  "Add 3: 5x = 15. Divide by 5: x = 3.",
                  "Check: both sides equal 15. ✓",
                ],
              },
            ],
          },
          {
            id: "equations-add-qa03",
            question:
              "Challenge: (a) Solve the equation (2x − 1)/3 = (x + 4)/2. (b) Solve the inequality −4 ≤ 3x − 1 < 8 and state all the integer values of x.",
            modelAnswer:
              "(a) Multiply both sides by 6: 2(2x − 1) = 3(x + 4) → 4x − 2 = 3x + 12 → x = 14. (b) Add 1 to all parts: −3 ≤ 3x < 9. Divide all by 3: −1 ≤ x < 3. Integers: −1, 0, 1, 2.",
            markScheme: [
              "(a) Multiply by 6 to clear fractions: 2(2x − 1) = 3(x + 4) [1]",
              "(a) 4x − 2 = 3x + 12, x = 14 [1]",
              "(b) Solve to −1 ≤ x < 3 [1]",
              "(b) Integers −1, 0, 1, 2 [1]",
            ],
            commonError: "In (a) multiplying only one side, or in (b) including 3 (excluded by <) or dropping −1 (included by ≤).",
            difficulty: "challenge",
            guideRef: "Integer solutions of an inequality",
            hints: [
              "(a) Multiply both sides by the lowest common denominator, 6.",
              "(b) Do the SAME operation to all three parts of the inequality.",
              "(b) −1 is included (≤) but 3 is not (<).",
            ],
            strategy: "Clear fractions, then solve",
            solutions: [
              {
                label: "Clear fractions / operate on all parts",
                steps: [
                  "(a) ×6: 2(2x − 1) = 3(x + 4) → 4x − 2 = 3x + 12 → x = 14.",
                  "(b) +1 to all parts: −3 ≤ 3x < 9.",
                  "÷3 all parts: −1 ≤ x < 3.",
                  "Integers: −1, 0, 1, 2.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
