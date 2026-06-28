import type { Topic } from "../types";

export const factorsMultiples: Topic = {
  id: "factors-multiples",
  title: "Factors, Multiples & Primes",
  subject: "Maths",
  icon: "🔢",
  strand: "Number",
  intro:
    "Primes are the atoms of arithmetic. Break numbers into their prime factors and you can find HCFs, LCMs, squares and cubes almost without effort — and spot deep structure hiding in plain numbers.",
  guide: [
    {
      heading: "Primes and prime factorisation",
      discovery: {
        problem:
          "Build the number 60 by multiplying together numbers bigger than 1 — keep breaking each factor down until you can't go further. Do two people who start differently (60 = 6 × 10 vs 60 = 4 × 15) end up with the same final list?",
        idea: "However you start, you always finish with the same multiset of primes: 60 = 2 × 2 × 3 × 5. Every whole number has exactly ONE prime factorisation — this is the Fundamental Theorem of Arithmetic.",
      },
      body:
        "A **prime number** has exactly two factors: 1 and itself. The first primes are 2, 3, 5, 7, 11, 13, 17, 19, 23, 29. Note that **1 is not prime** (it has only one factor) and **2 is the only even prime**.\n\nTo find the prime factorisation, use a *factor tree* or a *division ladder*: keep dividing by the smallest prime that fits.\n\n    360 = 2³ × 3² × 5\n\nWriting repeated primes in **index form** keeps the answer short and makes HCF/LCM work easy.",
      keyPoints: [
        "A prime has exactly two factors; 1 is not prime; 2 is the only even prime.",
        "Every whole number > 1 has a unique prime factorisation (order aside).",
        "Write repeated primes in index form, e.g. 72 = 2³ × 3².",
        "To test if n is prime, only trial-divide by primes up to √n.",
      ],
      strategies: [
        "Try small cases",
        "Work systematically (smallest prime first)",
        "Draw a diagram (factor tree)",
      ],
      whyItWorks:
        "You only need to test primes up to √n: if n = a × b with a ≤ b, then a ≤ √n, so a smaller factor (and a prime dividing it) appears at or below √n. Find none, and n is prime.",
      thinkDeeper:
        "There are infinitely many primes (Euclid proved it ~2300 years ago): multiply all known primes and add 1 — the result is divisible by none of them, so a new prime must exist.",
    },
    {
      heading: "Factors, multiples, squares and cubes",
      discovery: {
        problem:
          "Which numbers below 30 have an ODD number of factors? List the factors of 12 (1,2,3,4,6,12) and of 16 (1,2,4,8,16) and compare.",
        idea: "Factors come in pairs (d and n÷d), so the count is usually even. It is odd only when a factor pairs with itself — i.e. for perfect squares like 16 (4 × 4). Square numbers are exactly the numbers with an odd number of factors.",
      },
      body:
        "A **factor** of n divides n exactly; a **multiple** of n is n × (whole number). They are two views of one fact: 3 is a factor of 12 ⇔ 12 is a multiple of 3.\n\nFrom a prime factorisation you can read off structure. A number is a **perfect square** exactly when every prime index is *even* (e.g. 36 = 2²×3²); it is a **perfect cube** when every index is a *multiple of 3* (e.g. 216 = 2³×3³).\n\nYou can even *count* factors: 72 = 2³ × 3² has (3+1)(2+1) = **12 factors**, because each factor uses 0–3 twos and 0–2 threes.",
      keyPoints: [
        "Factor of n ⇔ n is a multiple of it.",
        "Square ⇔ all prime indices even; cube ⇔ all indices multiples of 3.",
        "Number of factors = product of (each index + 1).",
        "1 is a factor of every number; n is both a factor and a multiple of itself.",
      ],
      strategies: ["Find a pattern", "Look for invariants (pairing)", "Use the prime form"],
      whyItWorks:
        "Each factor of 2³×3² chooses an index 0–3 for the 2 and 0–2 for the 3, independently. That's 4 × 3 = 12 choices, so 12 factors — the (index+1) product rule.",
    },
    {
      heading: "HCF and LCM from prime factors",
      discovery: {
        problem:
          "A red light flashes every 12 s and a green every 18 s; they flash together now. When do they next flash together? Separately, what is the biggest tile that exactly fills both a 12 cm and an 18 cm strip?",
        idea: "Next together = LCM(12,18) = 36 s. Biggest shared tile = HCF(12,18) = 6 cm. 'Together again' is an LCM (multiples); 'largest shared piece' is an HCF (factors).",
      },
      body:
        "Write each number in prime form.\n\n• **HCF** (Highest Common Factor) = take each shared prime to its **lowest** power.\n• **LCM** (Lowest Common Multiple) = take every prime that appears to its **highest** power.\n\nFor 12 = 2²×3 and 18 = 2×3²: HCF = 2¹×3¹ = 6, LCM = 2²×3² = 36.\n\nA **Venn diagram** makes this visual: shared primes go in the overlap (their product is the HCF); multiplying *everything* in the Venn gives the LCM.",
      keyPoints: [
        "HCF = lowest power of each common prime.",
        "LCM = highest power of every prime present.",
        "Venn overlap → HCF; whole Venn → LCM.",
        "'Largest shared' = HCF; 'next time together' = LCM.",
      ],
      strategies: ["Draw a diagram (Venn)", "Use the prime form", "Translate the words"],
      whyItWorks:
        "A common factor can't use more of a prime than the smaller number has → lowest power gives the HCF. A common multiple must contain enough of each prime for both → highest power gives the LCM.",
    },
    {
      heading: "The HCF × LCM relationship",
      discovery: {
        problem:
          "For 12 and 18: HCF = 6, LCM = 36. Multiply HCF × LCM = 216. Now multiply the two numbers: 12 × 18 = 216. Coincidence? Try 8 and 20.",
        idea: "HCF × LCM = the product of the two numbers, every time. For 8 and 20: HCF = 4, LCM = 40, and 4 × 40 = 160 = 8 × 20. So given any three of {a, b, HCF, LCM} you can find the fourth.",
      },
      body:
        "For any two positive whole numbers a and b:\n\n    HCF(a, b) × LCM(a, b) = a × b\n\nThis is a powerful shortcut. If you know a, b and the HCF, then `LCM = (a × b) ÷ HCF` — no need to list multiples.\n\n**Example.** Two numbers have product 360 and HCF 6. Then LCM = 360 ÷ 6 = 60.",
      keyPoints: [
        "HCF × LCM = a × b (two numbers only).",
        "LCM = (a × b) ÷ HCF — a fast route.",
        "Lets you work backwards from partial information.",
      ],
      strategies: ["Work backwards", "Use a known identity"],
      whyItWorks:
        "For each prime, HCF takes the lower index and LCM the higher. (lower + higher) equals the sum of the two indices, so multiplying HCF × LCM rebuilds exactly a × b prime-by-prime.",
    },
    {
      heading: "Tests of divisibility",
      discovery: {
        problem:
          "Is 4 716 divisible by 3? You could do the long division — or add its digits: 4 + 7 + 1 + 6 = 18. What does 18 tell you, and why might digit-sums know about divisibility by 3?",
        idea: "18 is a multiple of 3, and that is enough: a number is divisible by 3 exactly when its digit sum is. Divisibility tests let you check factors at a glance, no division needed.",
      },
      body:
        "Quick **divisibility tests** save you from dividing:\n\n• **2** — last digit is even (0,2,4,6,8).\n• **5** — last digit is 0 or 5.\n• **10** — last digit is 0.\n• **4** — the last *two* digits form a multiple of 4 (e.g. …16).\n• **3** — the digit sum is a multiple of 3.\n• **9** — the digit sum is a multiple of 9.\n• **6** — divisible by **both** 2 and 3.\n\n**Example.** 5 274: even (so ÷2 ✓); digits 5+2+7+4 = 18, a multiple of 3 (so ÷3 ✓); therefore it is divisible by 6.",
      keyPoints: [
        "÷2: even last digit; ÷5: ends 0 or 5; ÷10: ends 0.",
        "÷4: last two digits make a multiple of 4.",
        "÷3: digit sum divisible by 3; ÷9: digit sum divisible by 9.",
        "÷6: passes both the 2-test and the 3-test.",
      ],
      strategies: ["Use the digit sum", "Check the last digit(s)", "Combine tests"],
      whyItWorks:
        "10, 100, 1000 … are all 1 more than a multiple of 9 (and of 3). So each digit contributes its face value plus a multiple of 9 to the total. Stripping out the multiples of 9 leaves just the digit sum — which is why 3 and 9 can be tested from the digits alone.",
    },
    {
      heading: "Square and triangular numbers",
      discovery: {
        problem:
          "Stack rows of dots 1, then 2, then 3, then 4 to build a triangle: the totals are 1, 3, 6, 10. Now place two such triangles together (the 4-triangle, 10 dots, twice). What rectangle do they form, and what does that tell you about the 10?",
        idea: "Two copies of the nth triangle fit into an n × (n+1) rectangle, so the nth triangular number is n(n+1)÷2. For n = 4 that's 4×5÷2 = 10. Patterns of dots reveal a formula.",
      },
      body:
        "**Square numbers** count dots in a square: 1, 4, 9, 16, 25, … = 1², 2², 3², …\n\n**Triangular numbers** count dots in a growing triangle: 1, 3, 6, 10, 15, 21, … The nth one is\n\n    Tₙ = n(n + 1) ÷ 2\n\nThe two sequences are linked: **add two consecutive triangular numbers and you always get a square**. For example 6 + 10 = 16 = 4², and 3 + 6 = 9 = 3². Picturing the triangles slotting together to make a square shows why.",
      keyPoints: [
        "Square numbers: 1, 4, 9, 16, 25 … (n²).",
        "Triangular numbers: 1, 3, 6, 10, 15 … with Tₙ = n(n+1)÷2.",
        "Two consecutive triangular numbers add to a square: Tₙ₋₁ + Tₙ = n².",
        "Each new triangular number adds the next whole number (the 'staircase').",
      ],
      strategies: ["Draw a diagram (dot pattern)", "Find a pattern", "Use the formula"],
      whyItWorks:
        "The nth triangular number plus the (n−1)th fills an n×n square: one triangle is the lower-left staircase, the other (rotated) fills the upper-right, together tiling all n² dots.",
      thinkDeeper:
        "Tₙ = n(n+1)÷2 is exactly the number of ways to choose 2 things from n+1 — triangular numbers count handshakes in a room of n+1 people.",
    },
  ],
  learn: {
    cards: [
      { front: "Is 1 a prime number?", back: "No. A prime has exactly two factors; 1 has only one factor." },
      { front: "Only even prime?", back: "2 — every other even number is divisible by 2, so it has more than two factors." },
      { front: "72 in index form", back: "72 = 2³ × 3²." },
      { front: "How do you find the HCF from prime factors?", back: "Take each common prime to its LOWEST power, then multiply." },
      { front: "How do you find the LCM from prime factors?", back: "Take every prime present to its HIGHEST power, then multiply." },
      { front: "HCF × LCM = ?", back: "a × b — the product of the two original numbers." },
      { front: "When is a number a perfect square?", back: "When every prime index in its factorisation is even (e.g. 36 = 2²×3²)." },
      { front: "Number of factors of 2³ × 3²?", back: "(3+1)(2+1) = 12 factors." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "factors-mcq-q01",
        question: "Which of these is a prime number?",
        options: ["51", "57", "61", "91"],
        answerIndex: 2,
        explanation: "51 = 3×17, 57 = 3×19, 91 = 7×13. Only 61 has no factors other than 1 and itself.",
        difficulty: "warmup",
        guideRef: "Primes and prime factorisation",
        strategy: "Trial-divide by small primes",
      },
      {
        id: "factors-mcq-q02",
        question: "Write 84 as a product of prime factors in index form.",
        options: ["2² × 3 × 7", "2 × 3² × 7", "2³ × 3 × 7", "2² × 21"],
        answerIndex: 0,
        explanation: "84 = 2 × 42 = 2 × 2 × 21 = 2 × 2 × 3 × 7 = 2² × 3 × 7.",
        difficulty: "core",
        guideRef: "Primes and prime factorisation",
        hints: ["Divide by the smallest prime that fits.", "84 ÷ 2 = 42, ÷ 2 = 21, then 21 = 3 × 7.", "Collect repeats as indices."],
        strategy: "Work systematically",
      },
      {
        id: "factors-mcq-q03",
        question: "Find the HCF of 24 and 36.",
        options: ["6", "12", "72", "4"],
        answerIndex: 1,
        explanation: "24 = 2³×3, 36 = 2²×3². HCF takes lowest powers: 2² × 3 = 12.",
        difficulty: "core",
        guideRef: "HCF and LCM from prime factors",
        hints: ["Write each in prime form.", "Take each common prime to its lowest power.", "2² × 3 = 12."],
        strategy: "Use the prime form",
      },
      {
        id: "factors-mcq-q04",
        question: "Find the LCM of 8 and 12.",
        options: ["24", "48", "96", "4"],
        answerIndex: 0,
        explanation: "8 = 2³, 12 = 2²×3. LCM takes highest powers: 2³ × 3 = 24.",
        difficulty: "core",
        guideRef: "HCF and LCM from prime factors",
        hints: ["Write each in prime form.", "Take every prime to its highest power.", "2³ × 3 = 24."],
        strategy: "Use the prime form",
      },
      {
        id: "factors-mcq-q05",
        question: "Two numbers have HCF 9 and LCM 90. If one number is 18, what is the other?",
        options: ["45", "30", "81", "10"],
        answerIndex: 0,
        explanation: "HCF × LCM = a × b, so 9 × 90 = 18 × b → 810 = 18b → b = 45.",
        difficulty: "challenge",
        guideRef: "The HCF × LCM relationship",
        hints: ["Use HCF × LCM = product of the two numbers.", "9 × 90 = 18 × b.", "810 ÷ 18 = 45."],
        strategy: "Work backwards",
      },
      {
        id: "factors-mcq-q06",
        question: "How many factors does 360 have?",
        options: ["18", "20", "24", "12"],
        answerIndex: 2,
        explanation: "360 = 2³ × 3² × 5. Number of factors = (3+1)(2+1)(1+1) = 4 × 3 × 2 = 24.",
        difficulty: "challenge",
        guideRef: "Factors, multiples, squares and cubes",
        hints: ["Find the prime factorisation first.", "Multiply (each index + 1).", "(3+1)(2+1)(1+1)."],
        strategy: "Find a pattern (factor-counting)",
      },
      {
        id: "factors-multiples-add-mcq01",
        question: "Which test confirms that 3 426 is divisible by 3?",
        options: [
          "It is even",
          "Its digit sum 3+4+2+6 = 15 is a multiple of 3",
          "It ends in 6",
          "Its last two digits make a multiple of 4",
        ],
        answerIndex: 1,
        explanation: "A number is divisible by 3 when its digit sum is. 3+4+2+6 = 15 = 3×5, a multiple of 3.",
        difficulty: "warmup",
        guideRef: "Tests of divisibility",
        strategy: "Use the digit sum",
      },
      {
        id: "factors-multiples-add-mcq02",
        question: "Which of these numbers is divisible by 6?",
        options: ["514", "732", "405", "238"],
        answerIndex: 1,
        explanation: "Divisible by 6 means divisible by 2 AND 3. 732 is even and 7+3+2 = 12 (a multiple of 3), so 732 passes both.",
        difficulty: "core",
        guideRef: "Tests of divisibility",
        hints: ["6 = 2 × 3, so test for both.", "Even number with digit sum divisible by 3."],
        strategy: "Combine tests",
      },
      {
        id: "factors-multiples-add-mcq03",
        question: "What is the 6th triangular number (1, 3, 6, 10, …)?",
        options: ["15", "21", "28", "18"],
        answerIndex: 1,
        explanation: "T₆ = 6 × 7 ÷ 2 = 21. (The sequence is 1, 3, 6, 10, 15, 21.)",
        difficulty: "core",
        guideRef: "Square and triangular numbers",
        hints: ["Use Tₙ = n(n+1)÷2.", "Here n = 6, so 6 × 7 ÷ 2."],
        strategy: "Use the formula",
      },
      {
        id: "factors-multiples-add-mcq04",
        question: "The triangular numbers 10 and 15 are consecutive. What is 10 + 15?",
        options: ["A prime", "25, a square number", "A cube number", "30, a triangular number"],
        answerIndex: 1,
        explanation: "Two consecutive triangular numbers always add to a square: 10 + 15 = 25 = 5².",
        difficulty: "challenge",
        guideRef: "Square and triangular numbers",
        hints: ["Add them up first.", "Is 25 a square, cube or prime?"],
        strategy: "Find a pattern",
      },
    ],
    qa: [
      {
        id: "factors-qa-q01",
        question: "Express 540 as a product of its prime factors in index form. Show your method.",
        modelAnswer: "540 = 2² × 3³ × 5. Dividing: 540÷2=270, ÷2=135, ÷3=45, ÷3=15, ÷3=5, ÷5=1.",
        markScheme: [
          "Correct factor tree or division ladder shown [1]",
          "All prime factors found: 2, 2, 3, 3, 3, 5 [1]",
          "Written in index form 2² × 3³ × 5 [1]",
        ],
        commonError: "Stopping at 540 = 4 × 135 without breaking 4 and 135 down to primes.",
        difficulty: "core",
        guideRef: "Primes and prime factorisation",
        hints: ["Always divide by the smallest prime that works.", "Keep going until you reach 1."],
        strategy: "Work systematically",
      },
      {
        id: "factors-qa-q02",
        question:
          "Find the HCF and LCM of 48 and 60 using a Venn diagram of their prime factors. State both answers.",
        modelAnswer:
          "48 = 2⁴×3, 60 = 2²×3×5. Shared (overlap): 2²×3. HCF = 2²×3 = 12. LCM (whole Venn) = 2⁴×3×5 = 240.",
        markScheme: [
          "48 = 2⁴×3 and 60 = 2²×3×5 [1]",
          "Venn: overlap 2,2,3; left extra 2,2; right extra 5 [1]",
          "HCF = 12 [1]",
          "LCM = 240 [1]",
        ],
        difficulty: "core",
        guideRef: "HCF and LCM from prime factors",
        hints: ["Prime-factorise both numbers.", "Put shared primes in the overlap.", "Overlap → HCF; whole Venn → LCM."],
        strategy: "Draw a diagram (Venn)",
        solutions: [
          {
            label: "Prime-factor / Venn method",
            steps: [
              "48 = 2⁴ × 3, 60 = 2² × 3 × 5",
              "Overlap = 2² × 3 → HCF = 12",
              "Whole Venn = 2⁴ × 3 × 5 → LCM = 240",
            ],
          },
          {
            label: "Listing method",
            steps: [
              "Factors of 48: 1,2,3,4,6,8,12,16,24,48; factors of 60: 1,2,3,4,5,6,10,12,15,20,30,60 → highest common = 12",
              "Multiples of 48: 48,96,144,192,240…; multiples of 60: 60,120,180,240… → lowest common = 240",
            ],
          },
        ],
      },
      {
        id: "factors-qa-q03",
        question:
          "Challenge: n = 2³ × 3 × 5². What is the smallest whole number you must multiply n by to make the result a perfect square? Justify your answer.",
        modelAnswer:
          "A perfect square needs every prime index even. n has indices 3 (for 2), 1 (for 3), 2 (for 5). The odd ones are 2³ and 3¹, so multiply by 2 × 3 = 6 to raise them to 2⁴ and 3². Then n×6 = 2⁴×3²×5² = (2²×3×5)² = 60² = 3600.",
        markScheme: [
          "States a square needs all indices even [1]",
          "Identifies odd indices: the 2 (power 3) and the 3 (power 1) [1]",
          "Multiplier = 2 × 3 = 6 [1]",
          "Confirms 6n = 3600 = 60² [1]",
        ],
        commonError: "Multiplying by every prime present (e.g. 30) instead of only those with odd indices.",
        difficulty: "challenge",
        guideRef: "Factors, multiples, squares and cubes",
        hints: ["Squares have all-even prime indices.", "Which indices in n are odd?", "Multiply only by the primes that are 'one short'."],
        strategy: "Look for invariants (even indices)",
      },
      {
        id: "factors-qa-q04",
        question:
          "Challenge: Two numbers are both less than 50, have HCF 8 and LCM 120. Find the two numbers.",
        modelAnswer:
          "Both are multiples of 8: write them 8a and 8b with HCF(a,b)=1. Product = HCF×LCM = 8×120 = 960, so 64ab = 960 → ab = 15. Coprime pairs with product 15: (1,15) or (3,5). (1,15) gives 8 and 120 (120 > 50, reject). (3,5) gives 24 and 40, both < 50. Answer: 24 and 40.",
        markScheme: [
          "Uses HCF × LCM = product → product = 960 [1]",
          "Writes numbers as 8a, 8b with a, b coprime, so ab = 15 [1]",
          "Tests coprime pairs and applies the 'under 50' condition [1]",
          "Answer: 24 and 40 [1]",
        ],
        difficulty: "challenge",
        guideRef: "The HCF × LCM relationship",
        hints: ["Both numbers are multiples of the HCF, 8.", "Use HCF × LCM = product to get the product.", "Strip out the HCF and look for coprime pairs."],
        strategy: "Work backwards",
      },
      {
        id: "factors-multiples-add-qa01",
        question:
          "Using divisibility tests only (no long division), state with reasons whether 2 340 is divisible by 4, by 9 and by 10.",
        modelAnswer:
          "By 4: last two digits 40 = 4 × 10, a multiple of 4, so yes. By 9: digit sum 2+3+4+0 = 9, a multiple of 9, so yes. By 10: it ends in 0, so yes.",
        markScheme: [
          "÷4: last two digits 40 is a multiple of 4 → yes [1]",
          "÷9: digit sum 9 is a multiple of 9 → yes [1]",
          "÷10: ends in 0 → yes [1]",
        ],
        commonError: "Adding all digits for the 4-test instead of checking the last two digits.",
        difficulty: "core",
        guideRef: "Tests of divisibility",
        hints: ["For 4, look only at the last two digits.", "For 9, add the digits.", "For 10, check the last digit."],
        strategy: "Use the digit sum and last digits",
      },
      {
        id: "factors-multiples-add-qa02",
        question:
          "Challenge: Show that the 7th triangular number plus the 8th triangular number is a square, and say which square it is.",
        modelAnswer:
          "T₇ = 7×8÷2 = 28 and T₈ = 8×9÷2 = 36. Sum = 28 + 36 = 64 = 8². In general Tₙ₋₁ + Tₙ = n², and here n = 8, so the sum is 8² = 64.",
        markScheme: [
          "T₇ = 28 and T₈ = 36 [1]",
          "Sum = 64 [1]",
          "Identifies 64 = 8² and links to Tₙ₋₁ + Tₙ = n² [1]",
        ],
        difficulty: "challenge",
        guideRef: "Square and triangular numbers",
        hints: ["Use Tₙ = n(n+1)÷2 for n = 7 and n = 8.", "Add the two results.", "Which square is 64?"],
        strategy: "Use the formula, then spot the pattern",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "factors-mcq-paper-1",
        title: "Factors, Multiples & Primes — MCQ Set A",
        questions: [
          {
            id: "factors-mcq-b1-q01",
            question: "How many factors does the number 1 have?",
            options: ["0", "1", "2", "Infinitely many"],
            answerIndex: 1,
            explanation: "1 has exactly one factor (itself), which is why it is not counted as prime.",
            difficulty: "warmup",
          },
          {
            id: "factors-mcq-b1-q02",
            question: "Which number is a multiple of both 6 and 9?",
            options: ["27", "36", "45", "48"],
            answerIndex: 1,
            explanation: "36 = 6×6 = 9×4. The others fail one test (e.g. 27 is not a multiple of 6).",
            difficulty: "warmup",
          },
          {
            id: "factors-mcq-b1-q03",
            question: "Write 126 in prime index form.",
            options: ["2 × 3² × 7", "2 × 3 × 21", "2² × 3 × 7", "2 × 63"],
            answerIndex: 0,
            explanation: "126 = 2 × 63 = 2 × 7 × 9 = 2 × 3² × 7.",
            difficulty: "core",
            hints: ["Divide by 2 first, then factor 63.", "63 = 9 × 7 = 3² × 7."],
            strategy: "Work systematically",
          },
          {
            id: "factors-mcq-b1-q04",
            question: "The HCF of two numbers is 1. These numbers are described as…",
            options: ["Equal", "Coprime", "Both prime", "Both even"],
            answerIndex: 1,
            explanation: "Numbers whose only common factor is 1 are called coprime (e.g. 8 and 15).",
            difficulty: "core",
            hints: ["They share no prime factors.", "The word starts with 'co-'."],
            strategy: "Recall the definition",
          },
          {
            id: "factors-mcq-b1-q05",
            question: "Find the LCM of 9, 12 and 15.",
            options: ["90", "180", "60", "360"],
            answerIndex: 1,
            explanation: "9 = 3², 12 = 2²×3, 15 = 3×5. Highest powers: 2²×3²×5 = 180.",
            difficulty: "core",
            hints: ["Prime-factorise all three.", "Take the highest power of each prime: 2², 3², 5."],
            strategy: "Use the prime form",
          },
          {
            id: "factors-mcq-b1-q06",
            question: "What is the smallest number with exactly 3 factors?",
            options: ["3", "4", "6", "9"],
            answerIndex: 1,
            explanation: "Exactly 3 factors means (index+1)=3, so the number is a prime squared. Smallest is 2² = 4 (factors 1, 2, 4).",
            difficulty: "challenge",
            hints: ["3 factors means one (index+1) = 3, so the number is p².", "Use the smallest prime."],
            strategy: "Reason from the factor-count rule",
          },
        ],
      },
      {
        id: "factors-mcq-paper-2",
        title: "Factors, Multiples & Primes — MCQ Set B",
        questions: [
          {
            id: "factors-mcq-b2-q01",
            question: "Which of these is NOT a prime?",
            options: ["29", "37", "39", "41"],
            answerIndex: 2,
            explanation: "39 = 3 × 13, so it is composite. The rest are prime.",
            difficulty: "warmup",
          },
          {
            id: "factors-mcq-b2-q02",
            question: "What is the HCF of 2³ × 3² × 5 and 2² × 3 × 7?",
            options: ["2² × 3", "2³ × 3²", "2² × 3 × 5 × 7", "6"],
            answerIndex: 0,
            explanation: "Take lowest common powers: 2² (min of 3,2) × 3¹ (min of 2,1) = 2² × 3 = 12.",
            difficulty: "core",
            hints: ["Only primes in BOTH count.", "Take the lower index of each shared prime."],
            strategy: "Use the prime form",
          },
          {
            id: "factors-mcq-b2-q03",
            question: "Which number below 100 is both a perfect square and a perfect cube?",
            options: ["16", "27", "64", "81"],
            answerIndex: 2,
            explanation: "64 = 2⁶ = 8² = 4³. Numbers that are both squares and cubes are perfect 6th powers.",
            difficulty: "challenge",
            hints: ["Both square and cube means a perfect 6th power.", "Try 2⁶."],
            strategy: "Combine conditions on indices",
          },
          {
            id: "factors-mcq-b2-q04",
            question: "Two bells ring every 15 and 18 minutes, starting together. After how many minutes do they next ring together?",
            options: ["90", "45", "180", "33"],
            answerIndex: 0,
            explanation: "'Together again' = LCM. 15 = 3×5, 18 = 2×3²; LCM = 2×3²×5 = 90 minutes.",
            difficulty: "core",
            hints: ["'Together again' is an LCM question.", "Prime-factorise 15 and 18, take highest powers."],
            strategy: "Translate the words",
          },
          {
            id: "factors-mcq-b2-q05",
            question: "Two numbers have product 540 and HCF 6. What is their LCM?",
            options: ["90", "60", "108", "3240"],
            answerIndex: 0,
            explanation: "LCM = (a × b) ÷ HCF = 540 ÷ 6 = 90.",
            difficulty: "core",
            hints: ["Use HCF × LCM = product.", "LCM = product ÷ HCF."],
            strategy: "Use a known identity",
          },
          {
            id: "factors-mcq-b2-q06",
            question: "How many numbers from 1 to 100 are NOT divisible by 2 or 5?",
            options: ["40", "50", "30", "45"],
            answerIndex: 0,
            explanation: "In every block of 10, the numbers ending 1,3,7,9 avoid 2 and 5 → 4 per ten × 10 = 40.",
            difficulty: "challenge",
            hints: ["Look at the last digit.", "Which last digits avoid both 2 and 5?", "1,3,7,9 → 4 in every 10."],
            strategy: "Clever counting",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "factors-qa-paper-1",
        title: "Factors, Multiples & Primes — Written Set A",
        questions: [
          {
            id: "factors-qa-b1-q01",
            question: "List all the factors of 36.",
            modelAnswer: "1, 2, 3, 4, 6, 9, 12, 18, 36 (nine factors).",
            markScheme: ["At least 7 correct factors with no wrong ones [1]", "All nine factors listed [1]"],
            commonError: "Writing 6 twice; since 36 = 6×6, the factor 6 is listed only once.",
            difficulty: "warmup",
          },
          {
            id: "factors-qa-b1-q02",
            question:
              "Find the HCF and LCM of 30 and 42 by first writing each as a product of primes.",
            modelAnswer:
              "30 = 2×3×5, 42 = 2×3×7. HCF = 2×3 = 6. LCM = 2×3×5×7 = 210.",
            markScheme: [
              "30 = 2×3×5 and 42 = 2×3×7 [1]",
              "HCF = 6 [1]",
              "LCM = 210 [1]",
            ],
            difficulty: "core",
            hints: ["Prime-factorise both.", "Shared primes → HCF; all primes (highest power) → LCM."],
            strategy: "Use the prime form",
          },
          {
            id: "factors-qa-b1-q03",
            question:
              "Challenge: Explain why every prime number greater than 3 leaves a remainder of 1 or 5 when divided by 6.",
            modelAnswer:
              "Every integer is one of 6k, 6k+1, 6k+2, 6k+3, 6k+4, 6k+5. The forms 6k, 6k+2, 6k+4 are even (divisible by 2) and 6k+3 is divisible by 3, so none of those can be a prime above 3. Only 6k+1 and 6k+5 remain, giving remainders 1 and 5.",
            markScheme: [
              "Splits integers into the six residue classes mod 6 [1]",
              "Eliminates the even classes (6k, 6k+2, 6k+4) [1]",
              "Eliminates 6k+3 as a multiple of 3 [1]",
              "Concludes only 6k±1 survive [1]",
            ],
            difficulty: "challenge",
            hints: ["Write a number as 6k + r where r is 0–5.", "Which of those six forms are automatically composite?"],
            strategy: "Reason about remainders (invariants)",
          },
          {
            id: "factors-qa-b1-q04",
            question:
              "Challenge: Two cogs have 24 and 40 teeth and mesh together. A tooth on each is marked and they start aligned. After how many teeth pass the meshing point are both marks aligned again, and how many full turns has each cog made?",
            modelAnswer:
              "They realign after LCM(24,40) teeth. 24 = 2³×3, 40 = 2³×5, LCM = 2³×3×5 = 120 teeth. The 24-tooth cog makes 120÷24 = 5 turns; the 40-tooth cog makes 120÷40 = 3 turns.",
            markScheme: [
              "Recognises realignment = LCM of tooth counts [1]",
              "LCM(24,40) = 120 [1]",
              "24-cog: 5 turns [1]",
              "40-cog: 3 turns [1]",
            ],
            commonError: "Using the HCF (8) instead of the LCM for 'aligned again'.",
            difficulty: "challenge",
            hints: ["Marks realign when a whole number of each cog's teeth have passed — an LCM.", "Find LCM(24,40), then divide by each tooth count for the turns."],
            strategy: "Translate the words (LCM model)",
          },
        ],
      },
    ],
  },
};
