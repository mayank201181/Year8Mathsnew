import type { Topic } from "../types";

export const expressions: Topic = {
  id: "expressions",
  title: "Expressions & Formulae",
  subject: "Maths",
  icon: "🅰️",
  strand: "Algebra",
  intro:
    "Algebra is arithmetic with letters standing in for numbers. Collect like terms, multiply and divide terms, expand and factorise brackets, and substitute values — the grammar of every formula you will ever use.",
  guide: [
    {
      heading: "Collecting like terms",
      discovery: {
        problem:
          "You have 3 red pens and 2 blue pens, then someone gives you 4 more red pens and 1 more blue pen. You cannot add reds to blues. Write the total tidily. Now replace 'red' with x and 'blue' with y — what is the simplified expression?",
        idea: "Only items of the same kind combine: 3 red + 4 red = 7 red, 2 blue + 1 blue = 3 blue. So 3x + 2y + 4x + y = 7x + 3y. 'Like terms' have exactly the same letters (and powers); only their number coefficients add.",
      },
      body:
        "An **expression** is a collection of **terms** joined by + and − signs, such as 4x + 3 − 2x.\n\n**Like terms** have identical letter parts: 4x and −2x are like terms, but 4x and 4x² are not, and 4x and 4y are not.\n\nTo **simplify**, add or subtract the coefficients of like terms, keeping the letter part the same. Watch the sign in front of each term — it travels with the term.",
      keyPoints: [
        "Like terms have exactly the same letters and powers (e.g. 5ab and −2ab).",
        "Add/subtract only the coefficients; the letter part is unchanged.",
        "The sign in front of a term belongs to that term.",
        "x means 1x and −x means −1x.",
      ],
      strategies: ["Group like terms together", "Track the sign with each term", "Underline matching terms in the same way"],
      whyItWorks:
        "x is just an unknown number, so 4x + (−2x) is 4 lots of x minus 2 lots of x, leaving 2 lots of x by the distributive law: (4 − 2)x = 2x. Unlike terms cannot combine because x and y could be different numbers.",
    },
    {
      heading: "Multiplying and dividing terms (index notation)",
      discovery: {
        problem:
          "A rectangle is 3x long and 2x wide. What is its area? You are multiplying 3x by 2x — what happens to the numbers, and what happens to the x's?",
        idea: "Area = 3x × 2x. Multiply the numbers (3 × 2 = 6) and multiply the letters (x × x = x²), giving 6x². The numbers multiply; identical letters combine using the index law x × x = x².",
      },
      body:
        "When **multiplying terms**, multiply the number coefficients and combine the letters using index laws: x × x = x², and aᵐ × aⁿ = aᵐ⁺ⁿ.\n\nWhen **dividing terms**, divide the coefficients and subtract indices: aᵐ ÷ aⁿ = aᵐ⁻ⁿ. So 12x⁵ ÷ 3x² = 4x³.\n\nBy convention we write the number first, then letters in alphabetical order: 2 × a × b = 2ab, and 5 × y × x = 5xy.",
      keyPoints: [
        "Multiply terms: multiply coefficients, add indices of like letters (3x × 2x = 6x²).",
        "Divide terms: divide coefficients, subtract indices (12x⁵ ÷ 3x² = 4x³).",
        "Write the number first, then letters alphabetically (5xy, not y5x).",
        "x × x = x² (NOT 2x); 2x means x + x.",
      ],
      strategies: ["Deal with numbers and letters separately", "Use the index laws", "Write terms in standard order"],
      whyItWorks:
        "Multiplication can be rearranged in any order, so 3x × 2x = 3 × 2 × x × x = 6 × x² = 6x². Division cancels matching factors top and bottom, which is exactly what subtracting the indices records.",
    },
    {
      heading: "Expanding brackets and factorising",
      discovery: {
        problem:
          "A garden is (x + 5) metres long and 3 metres wide. Its area is 3(x + 5). Split the garden into two rectangles in your mind — one 3 by x and one 3 by 5. What are their areas, and what does that tell you about 3(x + 5)?",
        idea: "The two parts have areas 3x and 15, so 3(x + 5) = 3x + 15. To EXPAND, multiply the outside term by EVERYTHING inside. To FACTORISE is the reverse: spot the common factor 3 in 3x + 15 and write it back outside as 3(x + 5).",
      },
      body:
        "To **expand** a single bracket, multiply the term outside by each term inside: a(b + c) = ab + ac. For example 4(2x − 3) = 8x − 12. A negative outside flips the signs inside: −2(x − 5) = −2x + 10.\n\n**Expanding two brackets** uses the same rule applied twice (FOIL): (x + 2)(x + 3) = x² + 3x + 2x + 6 = x² + 5x + 6.\n\nTo **factorise** with a common factor, find the highest factor shared by every term and place it outside the bracket: 6x + 9 = 3(2x + 3). Check by expanding back.",
      keyPoints: [
        "Expand: multiply the outside term by every term inside (a(b + c) = ab + ac).",
        "A negative multiplier changes the sign of each term inside.",
        "Two brackets: multiply each term in the first by each term in the second (FOIL), then collect.",
        "Factorise: take out the highest common factor; check by expanding back.",
      ],
      strategies: ["Multiply outside by every inside term", "Use FOIL for two brackets", "Take out the HCF to factorise", "Always check by re-expanding"],
      whyItWorks:
        "Expanding is the distributive law: a sum of areas equals the area of the whole. Factorising reverses it — every term must contain the common factor, so pulling it out and dividing each term by it leaves the bracket.",
    },
    {
      heading: "Substitution and writing expressions",
      discovery: {
        problem:
          "A formula says the cost £C of hiring a bike is C = 5 + 3h, where h is the number of hours. Before plugging in, predict: which part is fixed and which grows? Then find the cost for 4 hours, and write a formula for hiring TWO bikes for h hours each.",
        idea: "The 5 is a fixed charge; the 3h grows with time. For 4 hours: C = 5 + 3 × 4 = 5 + 12 = £17. Two bikes double the variable part: C = 5 + 5 + 3h + 3h, or 10 + 6h. Writing expressions means turning words into letters and operations.",
      },
      body:
        "**Substitution** means replacing each letter with its value and evaluating, using BIDMAS. Be careful with negatives: if x = −3 then x² = (−3)² = 9 (positive), but −x² = −9.\n\nTo **write an expression from words**, pick a letter for the unknown and translate each phrase: 'a number multiplied by 4' is 4n; '7 more than twice a number' is 2n + 7; 'the cost of n tickets at £8 each plus a £2 fee' is 8n + 2.",
      keyPoints: [
        "Substitute values, then evaluate using BIDMAS.",
        "Squaring a negative gives a positive: (−4)² = 16.",
        "−x² means square first, then negate: if x = 4, −x² = −16.",
        "Translate words step by step: 'twice a number then add 7' → 2n + 7.",
      ],
      strategies: ["Replace letters with brackets around the values", "Apply BIDMAS after substituting", "Translate each phrase in order"],
      whyItWorks:
        "A formula is a general rule true for every value of the letter. Substituting a number turns the general rule into a specific calculation, and BIDMAS guarantees everyone gets the same answer.",
    },
  ],
  learn: {
    cards: [
      { front: "Simplify 5x + 3x − 2x", back: "6x — add and subtract the coefficients of like terms." },
      { front: "Are 4x and 4x² like terms?", back: "No — the powers differ (x vs x²), so they cannot be combined." },
      { front: "Multiply 3x × 4x", back: "12x² — multiply numbers (3×4=12) and letters (x×x=x²)." },
      { front: "Divide 20x⁴ ÷ 5x", back: "4x³ — divide coefficients, subtract indices (4 − 1 = 3)." },
      { front: "Expand 4(2x − 3)", back: "8x − 12 — multiply 4 by each term inside." },
      { front: "Factorise 6x + 9", back: "3(2x + 3) — take out the HCF, 3." },
      { front: "If x = −2, find x²", back: "4 — (−2)² = (−2) × (−2) = +4." },
      { front: "Write 'double a number, then add 5'", back: "2n + 5." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "expr-mcq-q01",
        question: "Simplify 7a + 4b − 2a + b.",
        options: ["5a + 5b", "9a + 5b", "5a + 3b", "5ab"],
        answerIndex: 0,
        explanation: "Collect like terms: 7a − 2a = 5a and 4b + b = 5b, giving 5a + 5b.",
        difficulty: "warmup",
        guideRef: "Collecting like terms",
        strategy: "Group like terms together",
      },
      {
        id: "expr-mcq-q02",
        question: "Simplify 4x × 3x².",
        options: ["12x³", "7x³", "12x²", "12x⁶"],
        answerIndex: 0,
        explanation: "Multiply coefficients (4 × 3 = 12) and add indices (x¹ × x² = x³), giving 12x³.",
        difficulty: "core",
        guideRef: "Multiplying and dividing terms (index notation)",
        hints: [
          "Deal with the numbers and the letters separately.",
          "4 × 3 = 12; for the letters use x × x² and add the indices.",
          "1 + 2 = 3, so x¹ × x² = x³.",
        ],
        strategy: "Use the index laws",
      },
      {
        id: "expr-mcq-q03",
        question: "Expand 5(2x − 4).",
        options: ["10x − 20", "10x − 4", "7x − 20", "10x + 20"],
        answerIndex: 0,
        explanation: "Multiply 5 by each term inside: 5 × 2x = 10x and 5 × (−4) = −20, giving 10x − 20.",
        difficulty: "core",
        guideRef: "Expanding brackets and factorising",
        hints: [
          "Multiply the 5 by EVERY term inside the bracket.",
          "5 × 2x and 5 × (−4).",
          "Keep the minus sign with the 4.",
        ],
        strategy: "Multiply outside by every inside term",
      },
      {
        id: "expr-mcq-q04",
        question: "Factorise fully 12x + 8.",
        options: ["4(3x + 2)", "2(6x + 4)", "4(3x + 8)", "12(x + 8)"],
        answerIndex: 0,
        explanation: "The HCF of 12 and 8 is 4: 12x + 8 = 4(3x + 2). Check: 4 × 3x = 12x, 4 × 2 = 8.",
        difficulty: "core",
        guideRef: "Expanding brackets and factorising",
        hints: [
          "Find the highest number that divides both 12 and 8.",
          "The HCF is 4 — divide each term by 4.",
          "12 ÷ 4 = 3x and 8 ÷ 4 = 2.",
        ],
        strategy: "Take out the HCF to factorise",
      },
      {
        id: "expr-mcq-q05",
        question: "If x = −3, evaluate 2x² − 5x.",
        options: ["33", "3", "−3", "−33"],
        answerIndex: 0,
        explanation: "x² = (−3)² = 9, so 2 × 9 = 18. Then −5x = −5 × (−3) = +15. Total: 18 + 15 = 33.",
        difficulty: "challenge",
        guideRef: "Substitution and writing expressions",
        hints: [
          "Put brackets around −3 wherever x appears.",
          "(−3)² = 9 (a positive), so 2x² = 18.",
          "−5 × (−3) = +15; then add.",
        ],
        strategy: "Replace letters with brackets around the values",
      },
      {
        id: "expr-mcq-q06",
        question: "Expand and simplify (x + 4)(x + 2).",
        options: ["x² + 6x + 8", "x² + 8x + 6", "x² + 6x + 6", "x² + 8"],
        answerIndex: 0,
        explanation: "FOIL: x² + 2x + 4x + 8 = x² + 6x + 8.",
        difficulty: "challenge",
        guideRef: "Expanding brackets and factorising",
        hints: [
          "Multiply each term in the first bracket by each term in the second.",
          "x×x = x², x×2 = 2x, 4×x = 4x, 4×2 = 8.",
          "Collect the like terms 2x + 4x = 6x.",
        ],
        strategy: "Use FOIL for two brackets",
      },
    ],
    qa: [
      {
        id: "expr-qa-q01",
        question: "Simplify 6x + 2y − 4x + 5y − 3. Show the like terms you combine.",
        modelAnswer: "Combine x-terms: 6x − 4x = 2x. Combine y-terms: 2y + 5y = 7y. The −3 has no like term. Result: 2x + 7y − 3.",
        markScheme: ["6x − 4x = 2x [1]", "2y + 5y = 7y [1]", "Answer 2x + 7y − 3 [1]"],
        commonError: "Combining the unlike terms x and y, or dropping the constant −3.",
        difficulty: "core",
        guideRef: "Collecting like terms",
        hints: ["Group all the x-terms, then all the y-terms.", "The number on its own stays as it is."],
        strategy: "Group like terms together",
      },
      {
        id: "expr-qa-q02",
        question: "Expand and simplify 3(2x + 5) − 2(x − 4). Show your working.",
        modelAnswer:
          "Expand each bracket: 3(2x + 5) = 6x + 15 and −2(x − 4) = −2x + 8. Combine: 6x − 2x = 4x and 15 + 8 = 23. Result: 4x + 23.",
        markScheme: [
          "3(2x + 5) = 6x + 15 [1]",
          "−2(x − 4) = −2x + 8 [1]",
          "Collect to 4x + 23 [1]",
        ],
        commonError: "Forgetting that −2 × (−4) = +8, writing −8 instead.",
        difficulty: "core",
        guideRef: "Expanding brackets and factorising",
        hints: ["Expand both brackets first, watching the signs.", "−2 × −4 is +8.", "Then collect like terms."],
        strategy: "Multiply outside by every inside term",
        solutions: [
          {
            label: "Expand then collect",
            steps: [
              "3(2x + 5) = 6x + 15.",
              "−2(x − 4) = −2x + 8.",
              "x-terms: 6x − 2x = 4x.",
              "Constants: 15 + 8 = 23, giving 4x + 23.",
            ],
          },
          {
            label: "Check by substituting x = 1",
            steps: [
              "Original: 3(2+5) − 2(1−4) = 3×7 − 2×(−3) = 21 + 6 = 27.",
              "Answer: 4(1) + 23 = 27.",
              "Both give 27, so 4x + 23 is correct.",
            ],
          },
        ],
      },
      {
        id: "expr-qa-q03",
        question:
          "Challenge: A rectangle has length (2x + 3) cm and width 4 cm. (a) Write and simplify an expression for its perimeter. (b) Write and expand an expression for its area. (c) Find both when x = 5.",
        modelAnswer:
          "(a) Perimeter = 2(length + width) = 2((2x + 3) + 4) = 2(2x + 7) = 4x + 14 cm. (b) Area = length × width = 4(2x + 3) = 8x + 12 cm². (c) When x = 5: perimeter = 4 × 5 + 14 = 34 cm; area = 8 × 5 + 12 = 52 cm².",
        markScheme: [
          "Perimeter set up as 2(2x + 3 + 4) and simplified to 4x + 14 [1]",
          "Area = 4(2x + 3) expanded to 8x + 12 [1]",
          "Perimeter at x = 5 is 34 cm [1]",
          "Area at x = 5 is 52 cm² [1]",
        ],
        commonError: "Adding only one length and one width for the perimeter, or forgetting to double.",
        difficulty: "challenge",
        guideRef: "Substitution and writing expressions",
        hints: [
          "Perimeter is twice (length + width).",
          "Area is length × width — expand the bracket.",
          "Substitute x = 5 into your two simplified expressions.",
        ],
        strategy: "Translate the situation into expressions, then substitute",
        solutions: [
          {
            label: "Build, simplify, substitute",
            steps: [
              "Perimeter = 2(2x + 3 + 4) = 2(2x + 7) = 4x + 14.",
              "Area = 4(2x + 3) = 8x + 12.",
              "x = 5: perimeter = 20 + 14 = 34 cm.",
              "x = 5: area = 40 + 12 = 52 cm².",
            ],
          },
        ],
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "expr-mcq-paper-1",
        title: "Expressions & Formulae — MCQ Set A",
        questions: [
          {
            id: "expr-mcq-b1-q01",
            question: "Simplify 3x + 5x.",
            options: ["8x", "8x²", "15x", "8"],
            answerIndex: 0,
            explanation: "Like terms add: 3x + 5x = 8x. The letter part stays as x.",
            difficulty: "warmup",
          },
          {
            id: "expr-mcq-b1-q02",
            question: "Simplify 9y − 4y + 2y.",
            options: ["7y", "11y", "5y", "15y"],
            answerIndex: 0,
            explanation: "9 − 4 + 2 = 7, so the result is 7y.",
            difficulty: "warmup",
          },
          {
            id: "expr-mcq-b1-q03",
            question: "Simplify 2a × 5b.",
            options: ["10ab", "7ab", "10a + b", "10ab²"],
            answerIndex: 0,
            explanation: "Multiply coefficients 2 × 5 = 10 and write the different letters together: 10ab.",
            difficulty: "core",
            hints: ["Multiply the numbers, then write the letters alphabetically.", "2 × 5 = 10 and a × b = ab."],
            strategy: "Deal with numbers and letters separately",
          },
          {
            id: "expr-mcq-b1-q04",
            question: "Expand 3(x + 7).",
            options: ["3x + 21", "3x + 7", "x + 21", "3x + 10"],
            answerIndex: 0,
            explanation: "3 × x = 3x and 3 × 7 = 21, giving 3x + 21.",
            difficulty: "core",
            hints: ["Multiply the 3 by both terms inside."],
            strategy: "Multiply outside by every inside term",
          },
          {
            id: "expr-mcq-b1-q05",
            question: "Factorise 10x − 15.",
            options: ["5(2x − 3)", "5(2x − 15)", "2(5x − 3)", "10(x − 15)"],
            answerIndex: 0,
            explanation: "HCF of 10 and 15 is 5: 10x − 15 = 5(2x − 3).",
            difficulty: "core",
            hints: ["Find the highest number dividing both 10 and 15.", "Divide each term by 5."],
            strategy: "Take out the HCF to factorise",
          },
          {
            id: "expr-mcq-b1-q06",
            question: "If a = 4 and b = 3, evaluate 5a − 2b.",
            options: ["14", "26", "20", "9"],
            answerIndex: 0,
            explanation: "5 × 4 = 20 and 2 × 3 = 6, so 20 − 6 = 14.",
            difficulty: "challenge",
            hints: ["Substitute the values in for a and b.", "5 × 4 = 20 and 2 × 3 = 6, then subtract."],
            strategy: "Substitute then evaluate with BIDMAS",
          },
        ],
      },
      {
        id: "expr-mcq-paper-2",
        title: "Expressions & Formulae — MCQ Set B",
        questions: [
          {
            id: "expr-mcq-b2-q01",
            question: "Which of these is a like term to 6x²?",
            options: ["−2x²", "6x", "6y²", "12x³"],
            answerIndex: 0,
            explanation: "Like terms must have the same letter and power: −2x² matches x², so it is the like term.",
            difficulty: "warmup",
          },
          {
            id: "expr-mcq-b2-q02",
            question: "Simplify 18x⁶ ÷ 6x².",
            options: ["3x⁴", "3x³", "12x⁴", "3x⁸"],
            answerIndex: 0,
            explanation: "Divide coefficients 18 ÷ 6 = 3 and subtract indices 6 − 2 = 4, giving 3x⁴.",
            difficulty: "core",
            hints: ["Divide the numbers, then subtract the indices.", "18 ÷ 6 = 3 and 6 − 2 = 4."],
            strategy: "Use the index laws",
          },
          {
            id: "expr-mcq-b2-q03",
            question: "Expand −4(2x − 3).",
            options: ["−8x + 12", "−8x − 12", "8x − 12", "−8x − 3"],
            answerIndex: 0,
            explanation: "−4 × 2x = −8x and −4 × (−3) = +12, giving −8x + 12.",
            difficulty: "core",
            hints: ["A negative outside flips the sign of each inside term.", "−4 × −3 = +12."],
            strategy: "Multiply outside by every inside term",
          },
          {
            id: "expr-mcq-b2-q04",
            question: "Write an expression for 'the cost of n tickets at £6 each plus a £3 booking fee'.",
            options: ["6n + 3", "n + 9", "6n − 3", "3n + 6"],
            answerIndex: 0,
            explanation: "n tickets at £6 each cost 6n, plus the fixed £3 fee: 6n + 3.",
            difficulty: "core",
            hints: ["'Each' tells you to multiply by n.", "Add the fixed fee at the end."],
            strategy: "Translate each phrase in order",
          },
          {
            id: "expr-mcq-b2-q05",
            question: "Factorise fully 6x² + 9x.",
            options: ["3x(2x + 3)", "3(2x² + 3x)", "x(6x + 9)", "3x(2x + 9)"],
            answerIndex: 0,
            explanation: "Both terms share 3 and x, so the HCF is 3x: 6x² + 9x = 3x(2x + 3).",
            difficulty: "challenge",
            hints: [
              "Look for a number AND a letter common to both terms.",
              "Both share a factor of 3 and a factor of x.",
              "Take out 3x; 6x² ÷ 3x = 2x and 9x ÷ 3x = 3.",
            ],
            strategy: "Take out the highest common factor (number and letter)",
          },
          {
            id: "expr-mcq-b2-q06",
            question: "If x = −2, evaluate −x² + 3x.",
            options: ["−10", "−2", "10", "2"],
            answerIndex: 0,
            explanation: "x² = (−2)² = 4, so −x² = −4. Then 3x = 3 × (−2) = −6. Total: −4 + (−6) = −10.",
            difficulty: "challenge",
            hints: [
              "−x² means square first, then make it negative.",
              "(−2)² = 4, so −x² = −4.",
              "3 × (−2) = −6; add to −4.",
            ],
            strategy: "Apply BIDMAS carefully with negatives",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "expr-qa-paper-1",
        title: "Expressions & Formulae — Written Set A",
        questions: [
          {
            id: "expr-qa-b1-q01",
            question: "Simplify 8m − 3m + m.",
            modelAnswer: "All terms are like terms: 8 − 3 + 1 = 6, so the answer is 6m.",
            markScheme: ["Recognise m as 1m [1]", "8 − 3 + 1 = 6m [1]"],
            difficulty: "warmup",
          },
          {
            id: "expr-qa-b1-q02",
            question: "Expand and simplify 2(3x + 1) + 4(x + 2).",
            modelAnswer: "2(3x + 1) = 6x + 2 and 4(x + 2) = 4x + 8. Collect: 6x + 4x = 10x and 2 + 8 = 10, giving 10x + 10.",
            markScheme: ["6x + 2 [1]", "4x + 8 [1]", "Collect to 10x + 10 [1]"],
            commonError: "Only multiplying the first term inside each bracket.",
            difficulty: "core",
            hints: ["Expand each bracket separately.", "Then add the like terms."],
            strategy: "Multiply outside by every inside term",
          },
          {
            id: "expr-qa-b1-q03",
            question:
              "Challenge: A formula for the surface area of a cuboid box is S = 2(lw + lh + wh). A box has l = 4 cm, w = 3 cm and h = 2 cm. (a) Substitute to find S. (b) Explain why doubling every length multiplies S by 4, not 2.",
            modelAnswer:
              "(a) lw = 12, lh = 8, wh = 6, so lw + lh + wh = 26, and S = 2 × 26 = 52 cm². (b) Each product like lw becomes (2l)(2w) = 4lw, so every term — and therefore S — is multiplied by 4 (area scales by the square of the length scale factor).",
            markScheme: [
              "lw = 12, lh = 8, wh = 6 [1]",
              "Sum = 26, S = 52 cm² [1]",
              "Doubling lengths gives (2l)(2w) = 4lw for each product [1]",
              "Conclude S × 4 (area scale = length scale squared) [1]",
            ],
            commonError: "Assuming doubling lengths only doubles the area.",
            difficulty: "challenge",
            hints: [
              "Work out each product lw, lh, wh, then add and double.",
              "For part (b), replace l with 2l, w with 2w in a single product.",
              "(2l)(2w) = 4lw — what does that do to every term?",
            ],
            strategy: "Substitute carefully, then reason about scale factors",
            solutions: [
              {
                label: "Substitute and reason",
                steps: [
                  "lw = 4×3 = 12, lh = 4×2 = 8, wh = 3×2 = 6.",
                  "Sum = 26, so S = 2 × 26 = 52 cm².",
                  "Doubling: (2l)(2w) = 4lw for every product.",
                  "So S is multiplied by 4 — area scales as (length scale)² = 2² = 4.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
