import type { Topic } from "../types";

export const sequencesGraphs: Topic = {
  id: "sequences-graphs",
  title: "Sequences & Graphs",
  subject: "Maths",
  icon: "📈",
  strand: "Algebra",
  intro:
    "Spotting the rule behind a sequence, finding the nth term, special number patterns, and plotting straight-line graphs with gradient and y-intercept.",
  guide: [
    {
      heading: "Term-to-term and position-to-term rules",
      discovery: {
        problem:
          "The sequence 4, 7, 10, 13, … keeps going. Without listing all the terms, how could you jump straight to the 100th term? Listing 100 terms would take ages — is there a shortcut?",
        idea:
          "Each term is 3 more than the last (term-to-term), but that still needs every step. A position-to-term rule connects the term directly to its position: here term = 3 × position + 1, so the 100th term = 3 × 100 + 1 = 301. One formula, no listing.",
      },
      body:
        "A **sequence** is an ordered list of numbers; each one is a **term**.\n\nA **term-to-term rule** tells you how to get from one term to the next, e.g. 'add 3'. It is quick for the next term but slow for far-away terms.\n\nA **position-to-term rule** links a term to its position number n (1st, 2nd, 3rd…). It lets you jump straight to any term. For 4, 7, 10, 13 the rule is 3n + 1.",
      keyPoints: [
        "Term-to-term: how to step from one term to the next.",
        "Position-to-term (nth term): a formula in n for any term.",
        "n stands for the position: n = 1 for the 1st term, etc.",
        "Position-to-term rules let you reach the 100th term instantly.",
      ],
      strategies: ["Find the common difference", "Connect position to term", "Use n for the position number"],
    },
    {
      heading: "Finding the nth term of a linear sequence",
      discovery: {
        problem:
          "Look at 5, 8, 11, 14, … The numbers go up by 3 each time, just like the multiples 3, 6, 9, 12 (which are 3n). Compare each term with 3n. What do you have to add to 3n to land on the sequence?",
        idea:
          "3n gives 3, 6, 9, 12 but the sequence is 5, 8, 11, 14 — always 2 more. So the nth term is 3n + 2. Step 1: the common difference is the coefficient of n. Step 2: adjust by comparing with the multiples.",
      },
      body:
        "For a **linear sequence** (one with a constant difference), the nth term is always **(difference)×n + (adjustment)**.\n\nMethod: (1) find the common difference d — that is the number in front of n; (2) write dn and compare it with the actual terms; (3) add or subtract a constant to match.\n\nExample: 9, 7, 5, 3, … goes down by 2, so d = −2. −2n gives −2, −4, −6, …; we need 9, 7, 5, …, which is 11 more. So the nth term is −2n + 11.",
      keyPoints: [
        "nth term = dn + c, where d is the common difference.",
        "A decreasing sequence has a negative d.",
        "Find c by comparing dn with the real first term.",
        "Test your rule on the 2nd or 3rd term to be sure.",
      ],
      strategies: ["Common difference gives the coefficient of n", "Compare with the multiples of d", "Verify on another term"],
      whyItWorks:
        "Each step adds d, so after n steps from a 'zeroth term' c you reach dn + c. The constant c is whatever the 0th term would be, one step before the 1st term.",
    },
    {
      heading: "Special sequences: square and triangular",
      discovery: {
        problem:
          "Draw dots in a growing triangle: 1, then 3, then 6, then 10. Each new row adds one more dot than the last. Is 50 ever a triangular number? And what about the square numbers 1, 4, 9, 16 — what is their nth term?",
        idea:
          "Triangular numbers are 1, 3, 6, 10, 15, 21, 28, 36, 45, 55 — 50 is skipped, so 50 is NOT triangular. The square numbers have nth term n², a non-linear rule. Some patterns are not linear at all.",
      },
      body:
        "Not every sequence has a constant difference.\n\n**Square numbers**: 1, 4, 9, 16, 25, … with nth term n² (the differences themselves grow: 3, 5, 7, …).\n\n**Triangular numbers**: 1, 3, 6, 10, 15, … made by stacking rows of dots; you add 2, then 3, then 4, … The nth term is n(n + 1)/2.\n\nRecognising these lets you decide quickly whether a number such as 50 belongs to a pattern.",
      keyPoints: [
        "Square numbers: 1, 4, 9, 16, 25, 36, 49, 64, 81, 100; nth term n².",
        "Triangular numbers: 1, 3, 6, 10, 15, 21, 28, 36, 45, 55; nth term n(n + 1)/2.",
        "Their differences are not constant, so they are non-linear.",
        "Check membership by generating terms until you pass the target.",
      ],
      thinkDeeper:
        "Add two consecutive triangular numbers, e.g. 6 + 10 = 16 or 10 + 15 = 25. You always get a square number! Can you see why from the dot pictures?",
      strategies: ["Recognise the standard patterns", "Use dot diagrams", "Generate terms to test membership"],
    },
    {
      heading: "Coordinates and straight-line graphs y = mx + c",
      discovery: {
        problem:
          "Plot (0, 1), (1, 3), (2, 5), (3, 7) on a grid. They line up perfectly. Going from one point to the next, how far right and how far up do you move — and where does the line cross the y-axis?",
        idea:
          "Each step is 1 right and 2 up, so the gradient (steepness) is 2. The line crosses the y-axis at 1. That is exactly y = 2x + 1: m = 2 is the gradient, c = 1 is the y-intercept.",
      },
      body:
        "A **coordinate** (x, y) gives a position: x across, y up, from the origin (0, 0). The plane has **four quadrants** — points can have negative coordinates such as (−3, 2).\n\nEvery straight line has equation **y = mx + c**, where **m** is the gradient (rise ÷ run — how steep) and **c** is the y-intercept (where it crosses the y-axis).\n\nTo plot a line, build a small table of x and y values, plot the points, and join them. To read a graph, the gradient is the change in y for each step of 1 in x.",
      keyPoints: [
        "Coordinates (x, y): x across first, then y up; 4 quadrants allow negatives.",
        "y = mx + c: m = gradient, c = y-intercept.",
        "Gradient = rise ÷ run = change in y ÷ change in x.",
        "A bigger m means a steeper line; negative m slopes downhill.",
      ],
      strategies: ["Make a table of values", "Read m and c straight from the equation", "Use rise over run for gradient"],
      whyItWorks:
        "Adding 1 to x adds m to y (because of the mx term), giving a constant slope — that constant rate of change is exactly what makes the graph a straight line.",
    },
  ],
  learn: {
    cards: [
      { front: "Term-to-term rule of 4, 7, 10, 13", back: "Add 3 each time." },
      { front: "nth term of 4, 7, 10, 13", back: "3n + 1." },
      { front: "How do you find the coefficient of n?", back: "It is the common difference between terms." },
      { front: "nth term of 9, 7, 5, 3", back: "−2n + 11 (difference is −2)." },
      { front: "First five square numbers", back: "1, 4, 9, 16, 25 — nth term n²." },
      { front: "First five triangular numbers", back: "1, 3, 6, 10, 15 — nth term n(n + 1)/2." },
      { front: "In y = mx + c, what is m?", back: "The gradient (steepness), rise ÷ run." },
      { front: "In y = mx + c, what is c?", back: "The y-intercept — where the line crosses the y-axis." },
      { front: "Gradient formula", back: "Change in y ÷ change in x (rise over run)." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "seq-mcq-q01",
        question: "What is the next term in 2, 6, 10, 14, …?",
        options: ["18", "16", "20", "28"],
        answerIndex: 0,
        explanation: "The term-to-term rule is 'add 4', so 14 + 4 = 18.",
        difficulty: "warmup",
        guideRef: "Term-to-term and position-to-term rules",
        strategy: "Find the common difference",
      },
      {
        id: "seq-mcq-q02",
        question: "Find the nth term of the sequence 5, 8, 11, 14, …",
        options: ["3n + 2", "3n + 5", "n + 3", "5n + 3"],
        answerIndex: 0,
        explanation: "The difference is 3, so start with 3n (3, 6, 9, 12). The terms are 2 more, so 3n + 2.",
        difficulty: "core",
        guideRef: "Finding the nth term of a linear sequence",
        hints: ["The common difference goes in front of n.", "Compare 3n = 3, 6, 9 with the sequence.", "The terms are always 2 bigger: 3n + 2."],
        strategy: "Common difference gives the coefficient of n",
      },
      {
        id: "seq-mcq-q03",
        question: "The nth term of a sequence is 4n − 1. What is the 10th term?",
        options: ["39", "40", "41", "36"],
        answerIndex: 0,
        explanation: "Substitute n = 10: 4 × 10 − 1 = 40 − 1 = 39.",
        difficulty: "core",
        guideRef: "Finding the nth term of a linear sequence",
        hints: ["Put n = 10 into 4n − 1.", "4 × 10 = 40.", "40 − 1 = 39."],
        strategy: "Substitute the position into the rule",
      },
      {
        id: "seq-mcq-q04",
        question: "Which of these is a triangular number?",
        options: ["28", "30", "32", "35"],
        answerIndex: 0,
        explanation: "Triangular numbers are 1, 3, 6, 10, 15, 21, 28, 36, … — 28 is the 7th one.",
        difficulty: "core",
        guideRef: "Special sequences: square and triangular",
        hints: ["List 1, 3, 6, 10, … adding 2, 3, 4, … each time.", "Keep going until you reach the 20s.", "1, 3, 6, 10, 15, 21, 28 — 28 appears."],
        strategy: "Generate terms to test membership",
      },
      {
        id: "seq-mcq-q05",
        question: "For the line y = 2x − 3, what are the gradient and y-intercept?",
        options: [
          "Gradient 2, y-intercept −3",
          "Gradient −3, y-intercept 2",
          "Gradient 2, y-intercept 3",
          "Gradient −2, y-intercept −3",
        ],
        answerIndex: 0,
        explanation: "In y = mx + c, m = 2 is the gradient and c = −3 is the y-intercept.",
        difficulty: "core",
        guideRef: "Coordinates and straight-line graphs y = mx + c",
        hints: ["Compare with y = mx + c.", "m is the number multiplying x.", "c is the constant on its own."],
        strategy: "Read m and c straight from the equation",
      },
      {
        id: "seq-mcq-q06",
        question:
          "The nth term of a sequence is 3n + 1. Is 50 a term of this sequence?",
        options: [
          "No, because (50 − 1) ÷ 3 is not a whole number",
          "Yes, it is the 16th term",
          "Yes, it is the 17th term",
          "No, because 50 is even",
        ],
        answerIndex: 0,
        explanation:
          "Set 3n + 1 = 50 → 3n = 49 → n = 49/3, which is not a whole number, so 50 is not a term.",
        difficulty: "challenge",
        guideRef: "Finding the nth term of a linear sequence",
        hints: [
          "A number is a term only if it gives a whole-number position.",
          "Set 3n + 1 = 50 and solve for n.",
          "3n = 49, so n = 49/3 — not whole, so 50 is not a term.",
        ],
        strategy: "Solve nth term = target and check n is a whole number",
      },
    ],
    qa: [
      {
        id: "seq-qa-q01",
        question:
          "A sequence begins 7, 12, 17, 22, … Find an expression for the nth term, then use it to find the 20th term.",
        modelAnswer:
          "The common difference is 5, so start with 5n (5, 10, 15, 20). The terms are 2 more, so the nth term is 5n + 2. The 20th term is 5 × 20 + 2 = 102.",
        markScheme: [
          "Common difference 5 ⇒ 5n [1]",
          "Adjust by +2: nth term = 5n + 2 [1]",
          "20th term = 5 × 20 + 2 = 102 [1]",
        ],
        commonError: "Writing 5n + 7 by using the first term instead of comparing with 5n.",
        difficulty: "core",
        guideRef: "Finding the nth term of a linear sequence",
        hints: ["Find the difference first.", "Compare 5n with the actual terms.", "Then substitute n = 20."],
        strategy: "Common difference then adjust",
      },
      {
        id: "seq-qa-q02",
        question:
          "Matchsticks make a row of squares: 1 square uses 4 matches, 2 squares use 7, 3 squares use 10. Find a rule for the number of matches for n squares, and find how many squares can be made with 100 matches.",
        modelAnswer:
          "The pattern 4, 7, 10, … goes up by 3, so matches = 3n + 1. Setting 3n + 1 = 100 gives 3n = 99, n = 33. So 33 squares use exactly 100 matches.",
        markScheme: [
          "Identify difference 3 and rule 3n + 1 [1]",
          "Set 3n + 1 = 100 [1]",
          "3n = 99, n = 33 squares [1]",
        ],
        difficulty: "challenge",
        guideRef: "Finding the nth term of a linear sequence",
        hints: [
          "Write the match counts and find the common difference.",
          "The first square needs 4, then each extra adds 3: 3n + 1.",
          "Solve 3n + 1 = 100.",
        ],
        strategy: "Find the nth term of a pattern, then solve for n",
        solutions: [
          {
            label: "nth-term rule",
            steps: [
              "Counts 4, 7, 10 increase by 3, so matches = 3n + 1.",
              "Set 3n + 1 = 100 → 3n = 99 → n = 33.",
              "33 squares use exactly 100 matches.",
            ],
          },
          {
            label: "Table / counting on",
            steps: [
              "Build a table: 1→4, 2→7, 3→10, … each row adds 3.",
              "Count on in 3s from 4 toward 100: 4, 7, 10, …, 97, 100.",
              "100 is reached at the 33rd square, matching the rule.",
            ],
          },
        ],
      },
      {
        id: "seq-qa-q03",
        question:
          "Plot the line y = 2x + 1 for x from 0 to 3, and state its gradient and y-intercept.",
        modelAnswer:
          "Table: x = 0 → y = 1; x = 1 → y = 3; x = 2 → y = 5; x = 3 → y = 7. Plotting (0, 1), (1, 3), (2, 5), (3, 7) and joining them gives a straight line. The gradient is 2 (up 2 for each 1 across) and the y-intercept is 1.",
        markScheme: [
          "Correct table of values for y = 2x + 1 [1]",
          "Points plotted and joined as a straight line [1]",
          "Gradient 2 and y-intercept 1 [1]",
        ],
        commonError: "Mixing up the gradient and intercept, or plotting (x, y) the wrong way round.",
        difficulty: "core",
        guideRef: "Coordinates and straight-line graphs y = mx + c",
        hints: ["Substitute x = 0, 1, 2, 3 to get y.", "Plot each (x, y) carefully.", "Gradient is the up-step per 1 across; intercept is y when x = 0."],
        strategy: "Make a table of values",
      },
      {
        id: "seq-qa-q04",
        question:
          "Challenge: The lines y = x + 1 and y = 2x − 1 cross at one point. Find the coordinates of that point.",
        modelAnswer:
          "Where they meet, the y-values are equal: x + 1 = 2x − 1. Subtract x: 1 = x − 1, so x = 2. Then y = 2 + 1 = 3. They meet at (2, 3). Check: 2(2) − 1 = 3. ✓",
        markScheme: [
          "Set x + 1 = 2x − 1 [1]",
          "Solve for x = 2 [1]",
          "Find y = 3 and state the point (2, 3) [1]",
        ],
        difficulty: "challenge",
        guideRef: "Coordinates and straight-line graphs y = mx + c",
        hints: [
          "At the crossing point both equations give the same y.",
          "Set the two expressions for y equal to each other.",
          "Solve x + 1 = 2x − 1, then find y.",
        ],
        strategy: "Set the equations equal to find the intersection",
        solutions: [
          {
            label: "Algebra (set equal)",
            steps: [
              "Equate: x + 1 = 2x − 1.",
              "Solve: 1 + 1 = 2x − x, so x = 2.",
              "Substitute back: y = 2 + 1 = 3 → point (2, 3).",
            ],
          },
          {
            label: "Table of values",
            steps: [
              "List y = x + 1: (0,1), (1,2), (2,3), (3,4).",
              "List y = 2x − 1: (0,−1), (1,1), (2,3), (3,5).",
              "The shared point is (2, 3) — where both tables agree.",
            ],
          },
        ],
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "seq-mcq-paper-1",
        title: "Sequences & Graphs — MCQ Set A",
        questions: [
          {
            id: "seq-mcq-b1-q01",
            question: "What is the next term in 3, 8, 13, 18, …?",
            options: ["23", "22", "24", "21"],
            answerIndex: 0,
            explanation: "Add 5 each time: 18 + 5 = 23.",
            difficulty: "warmup",
          },
          {
            id: "seq-mcq-b1-q02",
            question: "What is the 5th square number?",
            options: ["25", "20", "16", "10"],
            answerIndex: 0,
            explanation: "Square numbers are 1, 4, 9, 16, 25 — the 5th is 5² = 25.",
            difficulty: "warmup",
          },
          {
            id: "seq-mcq-b1-q03",
            question: "Find the nth term of 6, 10, 14, 18, …",
            options: ["4n + 2", "4n + 6", "6n + 4", "n + 4"],
            answerIndex: 0,
            explanation: "Difference 4 gives 4n (4, 8, 12, 16); the terms are 2 more, so 4n + 2.",
            difficulty: "core",
            hints: ["Common difference is the coefficient of n.", "Compare 4n with the sequence."],
            strategy: "Common difference then adjust",
          },
          {
            id: "seq-mcq-b1-q04",
            question: "The nth term is 7n − 2. What is the 6th term?",
            options: ["40", "42", "44", "47"],
            answerIndex: 0,
            explanation: "n = 6: 7 × 6 − 2 = 42 − 2 = 40.",
            difficulty: "core",
            strategy: "Substitute the position into the rule",
          },
          {
            id: "seq-mcq-b1-q05",
            question: "In which quadrant does the point (−4, 3) lie?",
            options: ["Second (top-left)", "First (top-right)", "Third (bottom-left)", "Fourth (bottom-right)"],
            answerIndex: 0,
            explanation: "x is negative and y is positive, which is the top-left, second quadrant.",
            difficulty: "core",
            hints: ["x negative means left of the y-axis.", "y positive means above the x-axis."],
            strategy: "Use the signs of the coordinates",
          },
          {
            id: "seq-mcq-b1-q06",
            question:
              "The nth term of a sequence is 4n + 3. Is 90 a term of the sequence?",
            options: [
              "No, because (90 − 3) ÷ 4 is not a whole number",
              "Yes, it is the 21st term",
              "Yes, it is the 22nd term",
              "No, because 90 is even",
            ],
            answerIndex: 0,
            explanation: "4n + 3 = 90 → 4n = 87 → n = 87/4, not a whole number, so 90 is not a term.",
            difficulty: "challenge",
            hints: ["Set 4n + 3 = 90.", "Solve for n and check it is whole.", "n = 87/4 is not whole."],
            strategy: "Solve nth term = target and check n is whole",
          },
        ],
      },
      {
        id: "seq-mcq-paper-2",
        title: "Sequences & Graphs — MCQ Set B",
        questions: [
          {
            id: "seq-mcq-b2-q01",
            question: "What is the term-to-term rule of 20, 17, 14, 11, …?",
            options: ["Subtract 3", "Add 3", "Subtract 4", "Divide by 2"],
            answerIndex: 0,
            explanation: "Each term is 3 less than the one before, so 'subtract 3'.",
            difficulty: "warmup",
          },
          {
            id: "seq-mcq-b2-q02",
            question: "Which point is the origin?",
            options: ["(0, 0)", "(1, 1)", "(0, 1)", "(1, 0)"],
            answerIndex: 0,
            explanation: "The origin is where the axes cross: (0, 0).",
            difficulty: "warmup",
          },
          {
            id: "seq-mcq-b2-q03",
            question: "Find the nth term of the decreasing sequence 20, 17, 14, 11, …",
            options: ["−3n + 23", "3n + 20", "−3n + 20", "23 − n"],
            answerIndex: 0,
            explanation: "Difference −3 gives −3n (−3, −6, −9, −12); add 23 to match 20, 17, 14: −3n + 23.",
            difficulty: "core",
            hints: ["A decreasing sequence has a negative coefficient of n.", "Compare −3n with the terms."],
            strategy: "Common difference then adjust",
          },
          {
            id: "seq-mcq-b2-q04",
            question: "Which equation has gradient 3 and passes through (0, −2)?",
            options: ["y = 3x − 2", "y = −2x + 3", "y = 3x + 2", "y = 2x − 3"],
            answerIndex: 0,
            explanation: "Gradient 3 means m = 3; passing through (0, −2) means c = −2: y = 3x − 2.",
            difficulty: "core",
            hints: ["m is the gradient.", "The point (0, c) is the y-intercept."],
            strategy: "Read m and c into y = mx + c",
          },
          {
            id: "seq-mcq-b2-q05",
            question: "What is the gradient of the line through (1, 2) and (4, 11)?",
            options: ["3", "9", "1/3", "13"],
            answerIndex: 0,
            explanation: "Gradient = change in y ÷ change in x = (11 − 2) ÷ (4 − 1) = 9 ÷ 3 = 3.",
            difficulty: "core",
            hints: ["Find the change in y and the change in x.", "Divide rise by run: 9 ÷ 3."],
            strategy: "Rise over run",
          },
          {
            id: "seq-mcq-b2-q06",
            question:
              "The lines y = x + 4 and y = 3x meet at a point. What is the x-coordinate of that point?",
            options: ["2", "4", "1", "6"],
            answerIndex: 0,
            explanation: "Set x + 4 = 3x → 4 = 2x → x = 2 (and y = 6).",
            difficulty: "challenge",
            hints: ["At the meeting point the y-values are equal.", "Set x + 4 = 3x.", "4 = 2x, so x = 2."],
            strategy: "Set the equations equal",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "seq-qa-paper-1",
        title: "Sequences & Graphs — Written Set A",
        questions: [
          {
            id: "seq-qa-b1-q01",
            question: "Write the first four terms of the sequence with nth term 2n + 5.",
            modelAnswer: "n = 1: 7; n = 2: 9; n = 3: 11; n = 4: 13. So 7, 9, 11, 13.",
            markScheme: ["Substitute n = 1, 2, 3, 4 [1]", "Terms 7, 9, 11, 13 [1]"],
            difficulty: "warmup",
          },
          {
            id: "seq-qa-b1-q02",
            question:
              "A sequence is 2, 5, 8, 11, … Find the nth term and use it to find the 50th term.",
            modelAnswer:
              "Difference 3 ⇒ 3n (3, 6, 9, 12). Terms are 1 less, so nth term = 3n − 1. 50th term = 3 × 50 − 1 = 149.",
            markScheme: [
              "Difference 3 ⇒ 3n [1]",
              "nth term = 3n − 1 [1]",
              "50th term = 149 [1]",
            ],
            commonError: "Writing 3n + 2 by adding the first term instead of comparing with 3n.",
            difficulty: "core",
            hints: ["Find the common difference.", "Compare 3n with 2, 5, 8.", "Then substitute n = 50."],
            strategy: "Common difference then adjust",
          },
          {
            id: "seq-qa-b1-q03",
            question:
              "Draw the graph of y = −x + 4 for x from 0 to 4, and state its gradient and y-intercept.",
            modelAnswer:
              "Table: x = 0 → 4; x = 1 → 3; x = 2 → 2; x = 3 → 1; x = 4 → 0. Plot (0,4), (1,3), (2,2), (3,1), (4,0) and join. Gradient −1 (down 1 for each 1 across), y-intercept 4.",
            markScheme: [
              "Correct table of values [1]",
              "Straight line plotted [1]",
              "Gradient −1 and y-intercept 4 [1]",
            ],
            commonError: "Forgetting the line slopes downhill because the gradient is negative.",
            difficulty: "core",
            hints: ["Substitute each x to find y.", "A negative gradient slopes down.", "y-intercept is y when x = 0."],
            strategy: "Make a table of values",
          },
          {
            id: "seq-qa-b1-q04",
            question:
              "Challenge: Triangular numbers are 1, 3, 6, 10, 15, … with nth term n(n + 1)/2. Show that 78 is a triangular number and state its position.",
            modelAnswer:
              "Solve n(n + 1)/2 = 78, so n(n + 1) = 156. Test consecutive products: 12 × 13 = 156. So n = 12, meaning 78 is the 12th triangular number.",
            markScheme: [
              "Form n(n + 1) = 156 [1]",
              "Find 12 × 13 = 156 [1]",
              "Conclude 78 is the 12th triangular number [1]",
            ],
            difficulty: "challenge",
            hints: [
              "Set the nth-term formula equal to 78.",
              "Double both sides: n(n + 1) = 156.",
              "Find two consecutive numbers whose product is 156.",
            ],
            strategy: "Solve the formula and find consecutive factors",
          },
        ],
      },
    ],
  },
};
