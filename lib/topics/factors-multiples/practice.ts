import type { Paper, Question, TopicPractice } from "../../types.ts";

// ===========================================================================
// Factors, Multiples & Primes — quiz, two practice papers, challenge set.
// Section ids: factors-multiples-primes · prime-factorisation · hcf-lcm ·
// hcf-lcm-problems · squares-cubes-from-primes · counting-factors (stretch)
// ===========================================================================

// --------------------------------- QUIZ ------------------------------------
const quiz: Question[] = [
  {
    kind: "mcq",
    id: "factors-multiples-quiz-q01",
    question: "Which of these numbers is prime?",
    options: ["1", "51", "53", "91"],
    answerIndex: 2,
    explanation:
      "53 has exactly two factors, 1 and 53. It isn't divisible by 2, 3, 5 or 7, and {{8^2 = 64}} is already bigger than 53, so there is nothing else to test. 51 looks prime, but its digit sum is 6, so 51 = 3 × 17. 91 is the classic trap: 91 = 7 × 13. And 1 has only one factor, so it is not prime.",
    difficulty: "warmup",
    guideRef: "factors-multiples-primes",
    hints: ["A prime has exactly two factors. Try the divisibility tests on each option, and remember to try 7 as well."],
    strategy: "Eliminate options",
  },
  {
    kind: "short",
    id: "factors-multiples-quiz-q02",
    question: "List all the factors of 54, separated by commas.",
    answer: { type: "list", values: [1, 2, 3, 6, 9, 18, 27, 54] },
    solution: [
      "Work in pairs from 1 upwards: 1 × 54, 2 × 27, 3 × 18, 6 × 9.",
      "4, 5, 7 and 8 don't divide 54 exactly. The next number to try is 9, which is already paired with 6, so the pairs have met: stop.",
      "Factors: 1, 2, 3, 6, 9, 18, 27, 54.",
    ],
    commonError: "Forgetting 1 and 54 themselves, or stopping too early and missing the pair 6 × 9.",
    difficulty: "warmup",
    guideRef: "factors-multiples-primes",
    hints: ["Find the factors in pairs: 1 × 54, 2 × ?, 3 × ? …"],
    strategy: "Work systematically in pairs",
  },
  {
    kind: "mcq",
    id: "factors-multiples-quiz-q03",
    question: "Which of these numbers is divisible by 9?",
    options: ["4839", "7362", "9124", "4372"],
    answerIndex: 1,
    explanation:
      "Add the digits: 7 + 3 + 6 + 2 = 18, a multiple of 9, so 7362 is divisible by 9 (7362 = 9 × 818). 4839 has digit sum 24: that is a multiple of 3 but not of 9, so 4839 is divisible by 3 only. 9124 starts with a 9 and 4372 ends in 72 = 9 × 8, but neither of those is the test for 9: both have digit sum 16.",
    difficulty: "warmup",
    guideRef: "factors-multiples-primes",
    hints: ["The test for 9 uses the digit sum, not the first or last digits."],
    strategy: "Use divisibility tests",
  },
  {
    kind: "short",
    id: "factors-multiples-quiz-q04",
    question:
      "Write 600 as a product of prime factors in the form {{2^a * 3^b * 5^c}}. Give the values of a, b and c, in that order, separated by commas.",
    answer: { type: "list", values: [3, 1, 2], ordered: true, display: "3, 1, 2, so {{600 = 2^3 * 3 * 5^2}}" },
    traps: [
      {
        spec: { type: "list", values: [2, 1, 2], ordered: true },
        feedback:
          "That multiplies to {{2^2 * 3 * 5^2 = 300}}, not 600. If you split 600 = 6 × 100, remember that 6 brings its own factor of 2: {{2 * 2^2 = 2^3}}.",
      },
    ],
    solution: [
      "Split into friendly factors: 600 = 6 × 100.",
      "{{6 = 2 * 3}} and {{100 = 2^2 * 5^2}}.",
      "Collect the 2s: {{2 * 2^2 = 2^3}}. So {{600 = 2^3 * 3 * 5^2}}, giving a = 3, b = 1, c = 2.",
      "Check: 8 × 3 × 25 = 600 ✓",
    ],
    solutions: [
      {
        label: "Ladder method",
        steps: [
          "600 ÷ 2 = 300, 300 ÷ 2 = 150, 150 ÷ 2 = 75: three 2s.",
          "75 ÷ 3 = 25: one 3. 25 ÷ 5 = 5, 5 ÷ 5 = 1: two 5s.",
          "So a = 3, b = 1, c = 2. Splitting into 6 × 100 is quicker if you spot it; the ladder never misses a prime.",
        ],
      },
    ],
    commonError: "Forgetting to combine the 2 from 6 with the 2s from 100.",
    difficulty: "core",
    guideRef: "prime-factorisation",
    hints: [
      "Split 600 into two numbers you already know well.",
      "600 = 6 × 100. Break each of those into primes.",
      "Count how many 2s, 3s and 5s you have altogether.",
    ],
    strategy: "Make it simpler",
  },
  {
    kind: "mcq",
    id: "factors-multiples-quiz-q05",
    question: "What is the HCF of {{2^4 * 3 * 5^2}} and {{2^2 * 3^3 * 5}}?",
    options: ["{{2^4 * 3^3 * 5^2}}", "{{2^6 * 3^4 * 5^3}}", "{{2 * 3 * 5}}", "{{2^2 * 3 * 5}}"],
    answerIndex: 3,
    explanation:
      "For the HCF, take each shared prime to its **lower** power: {{2^2}}, {{3^1}} and {{5^1}}, giving {{2^2 * 3 * 5 = 60}}. {{2^4 * 3^3 * 5^2}} uses the higher powers, which gives the LCM. {{2^6 * 3^4 * 5^3}} adds the powers, which is the product of the two numbers. {{2 * 3 * 5}} picks out the shared primes but ignores the powers: both numbers contain at least {{2^2}}, so the HCF does too.",
    difficulty: "core",
    guideRef: "hcf-lcm",
    hints: [
      "The HCF has to divide both numbers.",
      "One number only contains {{2^2}}. How many 2s can a common factor have at most? Do the same for 3 and 5.",
    ],
    strategy: "Use the prime factorisation",
  },
  {
    kind: "short",
    id: "factors-multiples-quiz-q06",
    question: "Find the lowest common multiple (LCM) of 28 and 42.",
    answer: { type: "number", value: 84 },
    traps: [
      {
        spec: { type: "number", value: 1176 },
        feedback:
          "28 × 42 = 1176 is a common multiple, but not the lowest. 28 and 42 share a factor of 14, and multiplying counts it twice.",
      },
      {
        spec: { type: "number", value: 14 },
        feedback: "14 is the HCF: the biggest number that goes into both. The LCM is the smallest number that both go into.",
      },
    ],
    solution: [
      "{{28 = 2^2 * 7}} and {{42 = 2 * 3 * 7}}.",
      "LCM: every prime at its higher power: {{2^2 * 3 * 7 = 84}}.",
      "Check: 84 ÷ 28 = 3 and 84 ÷ 42 = 2 ✓",
    ],
    solutions: [
      {
        label: "Listing (quick here)",
        steps: [
          "Multiples of the bigger number, 42: 42, 84, …",
          "28 doesn't divide 42, but 84 = 3 × 28. So the LCM is 84. With small numbers like these, listing is just as fast as prime factors.",
        ],
      },
    ],
    difficulty: "core",
    guideRef: "hcf-lcm",
    hints: [
      "The LCM is a multiple of both numbers. Start listing multiples of the bigger one.",
      "Test 42, then 84. Which is the first one that 28 divides?",
    ],
    strategy: "Work systematically",
  },
  {
    kind: "mcq",
    id: "factors-multiples-quiz-q07",
    question:
      "At an evening water show on Sentosa, one fountain jet shoots up every 20 seconds and another every 45 seconds. They both shoot up together when the show starts. How long is it until they next shoot up together?",
    options: ["180 seconds", "900 seconds", "5 seconds", "90 seconds"],
    answerIndex: 0,
    explanation:
      "They shoot up together at common multiples of 20 and 45, and 'next' means the lowest. {{20 = 2^2 * 5}} and {{45 = 3^2 * 5}}, so the LCM is {{2^2 * 3^2 * 5 = 180}} seconds. 900 = 20 × 45 is a later common multiple: the shared 5 has been counted twice. 5 is the HCF, a time when neither jet has fired again yet. 90 is a multiple of 45 but not of 20.",
    difficulty: "core",
    guideRef: "hcf-lcm-problems",
    hints: [
      "Is this building up (multiples) or breaking down (factors)?",
      "List the multiples of 45 and stop at the first one that 20 divides.",
    ],
    strategy: "Ask: building up or breaking down?",
  },
  {
    kind: "short",
    id: "factors-multiples-quiz-q08",
    question: "Use prime factors to find {{sqrt(1296)}}.",
    answer: { type: "number", value: 36 },
    traps: [
      {
        spec: { type: "number", value: 648 },
        feedback:
          "648 is half of 1296. A square root is the number that multiplies by *itself* to make 1296: halve the **powers**, not the number.",
      },
    ],
    solution: [
      "Ladder: 1296 ÷ 2 = 648, ÷ 2 = 324, ÷ 2 = 162, ÷ 2 = 81, and {{81 = 3^4}}.",
      "So {{1296 = 2^4 * 3^4}}. Both powers are even, so 1296 is a square.",
      "Halve each power: {{sqrt(1296) = 2^2 * 3^2 = 4 * 9 = 36}}.",
      "Check: 36 × 36 = 1296 ✓",
    ],
    difficulty: "core",
    guideRef: "squares-cubes-from-primes",
    hints: [
      "Write 1296 as a product of primes first.",
      "{{1296 = 2^4 * 3^4}}. What happens to each power when you take a square root?",
    ],
    strategy: "Use the prime factorisation",
  },
  {
    kind: "short",
    id: "factors-multiples-quiz-q09",
    question:
      "{{540 = 2^2 * 3^3 * 5}}. What is the smallest whole number you can multiply 540 by to make a square number?",
    answer: { type: "number", value: 15 },
    traps: [
      {
        spec: { type: "number", value: 5 },
        feedback:
          "540 × 5 = 2700 = {{2^2 * 3^3 * 5^2}}, but {{3^3}} still has an odd power. The 3s need fixing too.",
      },
      {
        spec: { type: "number", value: 3 },
        feedback: "540 × 3 = 1620 = {{2^2 * 3^4 * 5}}. The 3s are now even, but the 5 still has power 1.",
      },
    ],
    solution: [
      "A square number has every power in its prime factorisation even.",
      "In {{2^2 * 3^3 * 5}}, the powers of 3 and of 5 are odd.",
      "Multiply by one more 3 and one more 5: 3 × 5 = 15.",
      "Check: 540 × 15 = 8100 = {{2^2 * 3^4 * 5^2}} = {{90^2}} ✓",
    ],
    commonError: "Fixing only the prime with power 1 and missing that {{3^3}} also has an odd power.",
    difficulty: "core",
    guideRef: "squares-cubes-from-primes",
    hints: [
      "What is true about the powers in a square number's prime factorisation?",
      "Which powers in {{2^2 * 3^3 * 5}} are odd?",
      "Multiply by just enough to make each odd power even.",
    ],
    strategy: "Use the prime factorisation",
  },
  {
    kind: "written",
    id: "factors-multiples-quiz-q10",
    question:
      "Mei says: \"Every whole number has an even number of factors, because factors always come in pairs.\"\n\nFind a number that proves Mei wrong. Then explain exactly which numbers break her rule, and why.",
    marks: 3,
    modelAnswer:
      "Mei is wrong: 36 has 9 factors (1, 2, 3, 4, 6, 9, 12, 18, 36), and 9 is odd.\n\nFactors do pair up, as 1 × 36, 2 × 18, 3 × 12 and 4 × 9, but in 6 × 6 the factor 6 is paired with *itself*, so it is only counted once. That leaves an odd total.\n\nA factor can only pair with itself when the number is that factor times itself, which means the number is a square. So the square numbers, and only the square numbers, have an odd number of factors. Every other number really does have an even number.",
    markScheme: [
      {
        point: "Gives a valid counterexample: a square number with its odd number of factors (e.g. 36 has 9, 16 has 5, 9 has 3)",
        keywords: ["36", "16", "25", "9 factors", "odd", "square"],
      },
      {
        point: "Explains that in a square one factor pairs with itself (e.g. 6 × 6), so it is counted only once",
        keywords: ["itself", "6 × 6", "6x6", "4 × 4", "counted once", "only once", "same number"],
      },
      {
        point: "Concludes that exactly the square numbers have an odd number of factors (all other numbers have an even number)",
        keywords: ["square numbers", "only squares", "only square", "perfect square", "squares"],
      },
    ],
    commonError: "Giving a prime as the counterexample. Primes have 2 factors, which is even.",
    difficulty: "challenge",
    guideRef: "counting-factors",
    hints: [
      "Count the factors of a few numbers: 12, 16, 20, 25.",
      "Which of those counts were odd? What do those numbers have in common?",
      "Write out the factor pairs of 16. Is anything unusual about one of the pairs?",
    ],
    strategy: "Try small cases",
  },
];

// ------------------------------ PAPER 1 ------------------------------------
const paper1: Paper = {
  id: "factors-multiples-p1",
  title: "Practice Paper 1",
  questions: [
    {
      kind: "short",
      id: "factors-multiples-p1-q01",
      question: "List all the prime numbers between 30 and 50, separated by commas.",
      answer: { type: "list", values: [31, 37, 41, 43, 47] },
      traps: [
        { spec: { type: "list", values: [31, 37, 39, 41, 43, 47] }, feedback: "39 isn't prime: its digit sum is 12, so 39 = 3 × 13." },
        { spec: { type: "list", values: [31, 37, 41, 43, 47, 49] }, feedback: "49 isn't prime: 49 = 7 × 7." },
      ],
      solution: [
        "Rule out the even numbers and the numbers ending in 5. That leaves 31, 33, 37, 39, 41, 43, 47, 49.",
        "Test these with 3 and 7 ({{7^2 = 49}}, so 7 is the biggest prime you need): 33 = 3 × 11, 39 = 3 × 13 and 49 = 7 × 7.",
        "The primes are 31, 37, 41, 43 and 47.",
      ],
      difficulty: "warmup",
      guideRef: "factors-multiples-primes",
      hints: ["Cross out the even numbers and the multiples of 5 first, then test what's left with 3 and 7."],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q02",
      question: "Write down all the multiples of 12 that lie between 50 and 100, separated by commas.",
      answer: { type: "list", values: [60, 72, 84, 96] },
      traps: [
        {
          spec: { type: "list", values: [1, 2, 3, 4, 6, 12] },
          feedback: "Those are the factors of 12: numbers that go *into* 12. Multiples are 12 × 1, 12 × 2, 12 × 3, … and keep going for ever.",
        },
      ],
      solution: ["The multiples of 12 are 12, 24, 36, 48, 60, 72, 84, 96, 108, …", "The ones between 50 and 100 are 60, 72, 84 and 96."],
      commonError: "Mixing up multiples (12, 24, 36, …) with factors (1, 2, 3, 4, 6, 12).",
      difficulty: "warmup",
      guideRef: "factors-multiples-primes",
      hints: ["Count up in 12s: 12, 24, 36, …"],
      strategy: "Work systematically",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q03",
      question:
        "Write 90 as a product of prime factors. Type the primes separated by commas, including any repeats (for 12 you would type 2, 2, 3).",
      answer: { type: "list", values: [2, 3, 3, 5], display: "2, 3, 3, 5, so {{90 = 2 * 3^2 * 5}}" },
      solution: ["90 ÷ 2 = 45.", "45 ÷ 3 = 15, then 15 ÷ 3 = 5, and 5 is prime.", "So 90 = 2 × 3 × 3 × 5 = {{2 * 3^2 * 5}}. Check: 2 × 9 × 5 = 90 ✓"],
      commonError: "Stopping at a composite number such as 9 or 45. Every number in the final answer must be prime.",
      difficulty: "warmup",
      guideRef: "prime-factorisation",
      hints: ["Divide by the smallest prime that goes in exactly: 90 ÷ 2 = ? Then keep going."],
      strategy: "Work systematically (smallest prime first)",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q04",
      question: "Find the highest common factor (HCF) of 24 and 40.",
      answer: { type: "number", value: 8 },
      traps: [
        { spec: { type: "number", value: 120 }, feedback: "120 is the LCM: the smallest number that both go into. The HCF is the biggest number that goes into both." },
        { spec: { type: "number", value: 4 }, feedback: "4 is a common factor, but not the highest. Does 8 go into both?" },
      ],
      solution: [
        "Factors of 24: 1, 2, 3, 4, 6, 8, 12, 24.",
        "Factors of 40: 1, 2, 4, 5, 8, 10, 20, 40.",
        "Common factors: 1, 2, 4, 8. The highest is 8.",
      ],
      solutions: [{ label: "Prime factors", steps: ["{{24 = 2^3 * 3}} and {{40 = 2^3 * 5}}.", "The only shared prime is 2, at power 3 in both: HCF = {{2^3 = 8}}."] }],
      difficulty: "warmup",
      guideRef: "hcf-lcm",
      hints: ["List the factors of each number and look for the biggest one that is in both lists."],
      strategy: "Work systematically",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q05",
      question: "Given that {{216 = 2^3 * 3^3}}, find {{cbrt(216)}}.",
      answer: { type: "number", value: 6 },
      traps: [
        {
          spec: { type: "number", value: 72 },
          feedback: "72 is 216 ÷ 3. The cube root is the number that, used three times in a multiplication, makes 216. Divide the **powers** by 3, not the number.",
        },
      ],
      solution: ["For a cube root, divide every power by 3.", "{{cbrt(2^3 * 3^3) = 2 * 3 = 6}}.", "Check: 6 × 6 × 6 = 216 ✓"],
      difficulty: "warmup",
      guideRef: "squares-cubes-from-primes",
      hints: ["Cubing a number triples every power in its prime factorisation. What undoes that?"],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q06",
      question: "The four-digit number 52▢4 is divisible by 9. The ▢ stands for a single missing digit. What is the missing digit?",
      answer: { type: "number", value: 7 },
      traps: [
        {
          spec: { type: "number", value: 1 },
          feedback: "With a 1 the digit sum is 12: a multiple of 3, but not of 9. You need a digit sum of 9, 18, 27, …",
        },
      ],
      solution: [
        "Digit sum so far: 5 + 2 + 4 = 11.",
        "For divisibility by 9 the digit sum must be a multiple of 9. The missing digit is 0 to 9, so the total is between 11 and 20, and the only multiple of 9 in that range is 18.",
        "Missing digit = 18 − 11 = 7. Check: 5274 = 9 × 586 ✓",
      ],
      difficulty: "core",
      guideRef: "factors-multiples-primes",
      hints: [
        "What is the test for divisibility by 9?",
        "Add up the digits you know. Which multiple of 9 can the total reach by adding a single digit from 0 to 9?",
      ],
      strategy: "Use divisibility tests",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q07",
      question: "Write 1176 in the form {{2^a * 3^b * 7^c}}. Give a, b and c in that order, separated by commas.",
      answer: { type: "list", values: [3, 1, 2], ordered: true, display: "3, 1, 2, so {{1176 = 2^3 * 3 * 7^2}}" },
      traps: [
        {
          spec: { type: "list", values: [3, 1, 1], ordered: true },
          feedback: "That gives {{2^3 * 3 * 7 = 168}}, and 1176 ÷ 168 = 7. There is another 7 hiding: 49 = 7 × 7.",
        },
      ],
      solution: [
        "1176 ÷ 2 = 588, 588 ÷ 2 = 294, 294 ÷ 2 = 147: three 2s.",
        "147 has digit sum 12, so 147 ÷ 3 = 49: one 3.",
        "{{49 = 7^2}}: two 7s.",
        "So {{1176 = 2^3 * 3 * 7^2}}, giving a = 3, b = 1, c = 2. Check: 8 × 3 × 49 = 1176 ✓",
      ],
      difficulty: "core",
      guideRef: "prime-factorisation",
      hints: [
        "1176 is even, so keep dividing by 2 while you can.",
        "After three divisions by 2 you reach 147. Its digit sum is 12, so try 3.",
        "147 ÷ 3 = 49. Is 49 prime?",
      ],
      strategy: "Work systematically (smallest prime first)",
    },
    {
      kind: "written",
      id: "factors-multiples-p1-q08",
      question:
        "Ethan wants to know whether 179 is prime. He says he must try dividing 179 by every whole number from 2 up to 178.\n\nExplain why he only needs to test the primes 2, 3, 5, 7, 11 and 13. Then decide whether 179 is prime, showing your checks.",
      marks: 3,
      modelAnswer:
        "**Only primes:** if a composite number such as 6 divided 179, then its prime factors (2 and 3) would divide 179 too. So if no prime divides 179, no composite number can either.\n\n**Only up to 13:** factors come in pairs that multiply to 179. In each pair, one factor is at most {{sqrt(179)}}, which is between 13 and 14 because {{13^2 = 169}} and {{14^2 = 196}}. So if 179 had a factor pair, testing up to 13 would find the smaller factor.\n\n**The checks:** 179 is odd (not 2); its digit sum is 17 (not 3); it ends in 9 (not 5); 179 = 7 × 25 + 4, 179 = 11 × 16 + 3 and 179 = 13 × 13 + 10. None of them divides exactly, so **179 is prime**.",
      markScheme: [
        {
          point: "Explains why composite divisors needn't be tested: their prime factors would already divide the number",
          keywords: ["prime factors", "composite", "already", "would divide", "made of primes"],
        },
        {
          point: "Explains stopping at 13: one factor in every pair is at most the square root, and 13² = 169 < 179 < 196 = 14²",
          keywords: ["square root", "sqrt", "169", "196", "pair", "14"],
        },
        {
          point: "Tests 2, 3, 5, 7, 11 and 13 (with remainders or reasons) and concludes that 179 is prime",
          keywords: ["remainder", "not divisible", "179 is prime", "is prime"],
        },
      ],
      commonError: "Testing only 2, 3 and 5 and declaring the number prime. You must go up to the largest prime p with {{p^2 <= 179}}.",
      difficulty: "core",
      guideRef: "factors-multiples-primes",
      hints: [
        "If 6 went into 179, what else would have to go into 179?",
        "Think about factor pairs. Could both numbers in a pair be bigger than 14?",
        "{{13^2 = 169}} and {{14^2 = 196}}. Now test each prime up to 13.",
      ],
      strategy: "Consider extremes: stop at the square root",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q09",
      question: "Find the HCF of 84 and 126.",
      answer: { type: "number", value: 42 },
      traps: [
        { spec: { type: "number", value: 252 }, feedback: "252 is the LCM. The HCF can't be bigger than the smaller number, 84." },
        {
          spec: { type: "number", value: 14 },
          feedback: "14 is a common factor, but 84 and 126 also share a factor of 3 (both digit sums are multiples of 3). Look for a bigger one.",
        },
      ],
      solution: [
        "{{84 = 2^2 * 3 * 7}} and {{126 = 2 * 3^2 * 7}}.",
        "Shared primes at the lower power: {{2 * 3 * 7 = 42}}.",
        "Check: 84 = 2 × 42 and 126 = 3 × 42 ✓",
      ],
      solutions: [
        {
          label: "Using the difference (a shortcut)",
          steps: [
            "Any common factor of 84 and 126 also divides their difference, 126 − 84 = 42.",
            "So the HCF is at most 42, and 42 divides both: 84 = 2 × 42 and 126 = 3 × 42.",
            "So the HCF is 42. That's quicker here, but the prime factor method always works.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: ["Write both numbers as products of primes.", "Which primes are shared, and at what power?"],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q10",
      question:
        "The Venn diagram shows the prime factors of two numbers, A and B. The primes in the overlap are factors of both numbers.\n\nFind the HCF and the LCM of A and B. Give the HCF first, then the LCM, separated by a comma.",
      diagram: `<svg viewBox="0 0 360 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors. Circle A only: 2 and 2. Overlap of A and B: 3 and 5. Circle B only: 3 and 7."><rect x="0" y="0" width="360" height="200" fill="#ffffff"/><circle cx="140" cy="105" r="80" fill="#c7d2fe" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="105" r="80" fill="#fde68a" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><text x="66" y="30" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">A</text><text x="284" y="30" font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937">B</text><g font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="95" y="98">2</text><text x="95" y="124">2</text><text x="180" y="98">3</text><text x="180" y="124">5</text><text x="265" y="98">3</text><text x="265" y="124">7</text></g></svg>`,
      answer: { type: "list", values: [15, 1260], ordered: true, display: "HCF = 15, LCM = 1260" },
      traps: [
        { spec: { type: "list", values: [1260, 15], ordered: true }, feedback: "Right numbers, wrong order: give the HCF (the smaller one) first." },
        {
          spec: { type: "list", values: [60, 315], ordered: true },
          feedback: "Those are the numbers A and B themselves. The HCF is the product of the overlap only; the LCM is the product of everything in the diagram.",
        },
      ],
      solution: [
        "The overlap holds 3 and 5, so HCF = 3 × 5 = 15.",
        "Everything in the diagram: 2 × 2 × 3 × 5 × 3 × 7 = 1260, so LCM = 1260.",
        "Check: A = 2 × 2 × 3 × 5 = 60 and B = 3 × 5 × 3 × 7 = 315. HCF × LCM = 15 × 1260 = 18900 and A × B = 60 × 315 = 18900 ✓",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: [
        "Which region shows the primes that A and B share?",
        "HCF: multiply the primes in the overlap. LCM: multiply every prime in the diagram, each one once.",
      ],
      strategy: "Draw a diagram (Venn)",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q11",
      question:
        "For the Mid-Autumn Festival, Mei buys paper lanterns, which come in boxes of 15, and tea-light candles, which come in boxes of 25. She wants exactly one candle for each lantern, with none left over, and she wants to buy as few boxes as possible. How many boxes of lanterns and how many boxes of candles should she buy? Give the number of boxes of lanterns first.",
      answer: { type: "list", values: [5, 3], ordered: true, display: "5 boxes of lanterns, 3 boxes of candles" },
      traps: [
        { spec: { type: "list", values: [3, 5], ordered: true }, feedback: "Swapped round: 75 lanterns need 75 ÷ 15 = 5 boxes, and 75 candles need 75 ÷ 25 = 3 boxes." },
        {
          spec: { type: "list", values: [25, 15], ordered: true },
          feedback: "That gives 375 of each. It works, but it isn't the fewest boxes: 15 and 25 share a factor of 5, so 15 × 25 overshoots.",
        },
      ],
      solution: [
        "The same number of lanterns and candles means a common multiple of 15 and 25; the fewest boxes means the lowest one.",
        "{{15 = 3 * 5}} and {{25 = 5^2}}, so LCM = {{3 * 5^2 = 75}}.",
        "Lanterns: 75 ÷ 15 = 5 boxes. Candles: 75 ÷ 25 = 3 boxes.",
      ],
      commonError: "Answering 75. That's the number of lanterns, but the question asks for numbers of boxes.",
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: [
        "Will the total number of lanterns be a multiple or a factor of 15?",
        "You need the smallest number that is a multiple of both 15 and 25.",
        "Once you have that number, how many boxes of each make it?",
      ],
      strategy: "Ask: building up or breaking down?",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q12",
      question:
        "A rectangular patio measures 4.2 m by 3.6 m. It is to be covered with identical square tiles, as large as possible, with no cutting and no gaps. How many tiles are needed?",
      answer: { type: "number", value: 42 },
      traps: [
        { spec: { type: "number", value: 60 }, feedback: "60 cm is the side length of each tile. Now work out how many tiles fit along each side." },
        { spec: { type: "number", value: 13 }, feedback: "That's 7 + 6. The tiles make a grid of 7 by 6, so multiply." },
      ],
      solution: [
        "Work in centimetres: 420 cm by 360 cm.",
        "The tile side must divide both 420 and 360 exactly, and be as large as possible: that's the HCF.",
        "{{420 = 2^2 * 3 * 5 * 7}} and {{360 = 2^3 * 3^2 * 5}}, so HCF = {{2^2 * 3 * 5 = 60}} cm.",
        "Tiles: 420 ÷ 60 = 7 along the length and 360 ÷ 60 = 6 along the width, so 7 × 6 = 42 tiles.",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: [
        "Convert to centimetres so that you are working with whole numbers.",
        "The tile's side must fit exactly into 420 and into 360. What's the biggest such number?",
        "Once you know the tile size, how many fit along each side?",
      ],
      strategy: "Ask: building up or breaking down?",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q13",
      question: "Two numbers have HCF 12 and LCM 360. One of the numbers is 72. What is the other number?",
      answer: { type: "number", value: 60 },
      traps: [
        { spec: { type: "number", value: 4320 }, feedback: "4320 = 12 × 360 is the product of the two numbers. Divide by 72 to find the other one." },
        { spec: { type: "number", value: 5 }, feedback: "360 ÷ 72 = 5, but that ignores the HCF. Use HCF × LCM = the product of the two numbers." },
      ],
      solution: [
        "For two numbers, HCF × LCM = the product of the numbers.",
        "12 × 360 = 4320, so 72 × (other number) = 4320.",
        "Other number = 4320 ÷ 72 = 60.",
        "Check: {{72 = 2^3 * 3^2}} and {{60 = 2^2 * 3 * 5}} give HCF {{2^2 * 3 = 12}} and LCM {{2^3 * 3^2 * 5 = 360}} ✓",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: ["Which rule links the HCF, the LCM and the two numbers?", "HCF × LCM = a × b. Fill in the three values you know."],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q14",
      question: "Use prime factors to find {{sqrt(3136)}}.",
      answer: { type: "number", value: 56 },
      traps: [
        { spec: { type: "number", value: 1568 }, feedback: "1568 is half of 3136. For a square root, halve the **powers** in the prime factorisation, not the number." },
      ],
      solution: [
        "Divide by 2 repeatedly: 3136 → 1568 → 784 → 392 → 196 → 98 → 49. That's six 2s.",
        "{{49 = 7^2}}, so {{3136 = 2^6 * 7^2}}.",
        "Halve each power: {{sqrt(3136) = 2^3 * 7 = 56}}.",
        "Check: 56 × 56 = 3136 ✓",
      ],
      difficulty: "core",
      guideRef: "squares-cubes-from-primes",
      hints: [
        "Write 3136 as a product of primes. It's even, so start with 2.",
        "You should reach {{2^6 * 7^2}}. How do you take the square root of a power?",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "written",
      id: "factors-multiples-p1-q15",
      question:
        "Aisha is making identical goodie bags for her CCA. She will use all of 54 pencils and 72 erasers, with nothing left over, and she wants as many bags as possible. She works out {{LCM(54, 72) = 216}} and says she can make 216 bags.\n\nExplain why Aisha is wrong. Then find the greatest number of bags, and say what goes in each bag.",
      marks: 3,
      modelAnswer:
        "216 bags is impossible: with only 54 pencils she can't put even one pencil in each of 216 bags. The number of bags must divide **both** 54 and 72 exactly, so that the pencils and erasers share out with none left over. That makes it a common **factor**, and 'as many as possible' means the HCF, not the LCM.\n\n{{54 = 2 * 3^3}} and {{72 = 2^3 * 3^2}}, so HCF = {{2 * 3^2 = 18}}.\n\nShe can make **18 bags**, each with 54 ÷ 18 = **3 pencils** and 72 ÷ 18 = **4 erasers**.",
      markScheme: [
        {
          point: "Explains why the LCM is wrong: the number of bags must be a common factor of 54 and 72 (and 216 bags is more than the number of pencils)",
          keywords: ["factor", "divide", "hcf", "too many", "more than 54", "only 54"],
        },
        { point: "Finds HCF(54, 72) = 18 bags", keywords: ["18"] },
        { point: "States that each bag has 3 pencils and 4 erasers", keywords: ["3 pencils", "4 erasers", "3 and 4"] },
      ],
      commonError: "Reaching for the LCM whenever two numbers appear in a word problem. Ask: building up or breaking down?",
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: [
        "Could Aisha really fill 216 bags with only 54 pencils?",
        "The number of bags must divide 54 and 72 exactly. Is that a factor or a multiple?",
        "Find HCF(54, 72), then share the pencils and erasers between the bags.",
      ],
      strategy: "Ask: building up or breaking down?",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q16",
      question: "Find the smallest whole number k such that 96k is a cube number.",
      answer: { type: "number", value: 18 },
      traps: [
        {
          spec: { type: "number", value: 6 },
          feedback: "96 × 6 = 576 = {{24^2}}, which is a square, not a cube. For a cube, every power must be a multiple of 3.",
        },
        {
          spec: { type: "number", value: 9 },
          feedback: "96 × 9 = 864 = {{2^5 * 3^3}}. The 3s are fixed, but {{2^5}} still needs one more 2 to reach {{2^6}}.",
        },
      ],
      solution: [
        "{{96 = 2^5 * 3}}.",
        "For a cube, every power must be a multiple of 3. Raise {{2^5}} to {{2^6}} (one more 2) and {{3^1}} to {{3^3}} (two more 3s).",
        "k = {{2 * 3^2 = 18}}.",
        "Check: 96 × 18 = 1728 = {{2^6 * 3^3}} = {{12^3}} ✓",
      ],
      difficulty: "core",
      guideRef: "squares-cubes-from-primes",
      hints: [
        "Write 96 as a product of prime factors.",
        "In a cube number, what must be true of every power?",
        "{{96 = 2^5 * 3}}. What is the next multiple of 3 at or above 5? And at or above 1?",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q17",
      question:
        "Two different whole numbers are both less than 100. Their HCF is 12 and their LCM is 144. Find the two numbers, separated by a comma.",
      answer: { type: "list", values: [36, 48] },
      traps: [
        { spec: { type: "list", values: [12, 144] }, feedback: "12 and 144 do have HCF 12 and LCM 144, but 144 isn't less than 100." },
        {
          spec: { type: "list", values: [24, 72] },
          feedback: "24 × 72 = 1728 = 12 × 144, but HCF(24, 72) = 24, not 12. A pair needs the right product *and* the right HCF.",
        },
      ],
      solution: [
        "Both numbers are multiples of the HCF, so write them as 12m and 12n.",
        "HCF × LCM = product: 12 × 144 = 12m × 12n, so mn = 12.",
        "m and n can share no common factor, otherwise the HCF would be bigger than 12. Pairs with mn = 12: (1, 12) and (3, 4) work; (2, 6) shares a 2, so it fails.",
        "(1, 12) gives 12 and 144, but 144 is too big. (3, 4) gives 36 and 48.",
        "Check: {{36 = 2^2 * 3^2}} and {{48 = 2^4 * 3}} give HCF {{2^2 * 3 = 12}} and LCM {{2^4 * 3^2 = 144}} ✓",
      ],
      solutions: [
        {
          label: "Hand out the prime powers",
          steps: [
            "{{12 = 2^2 * 3}} and {{144 = 2^4 * 3^2}}.",
            "For each prime, one number has the HCF's power and the other has the LCM's power. So one number has {{2^2}} and the other {{2^4}}; one has {{3^1}} and the other {{3^2}}.",
            "Either {{2^4 * 3^2 = 144}} with {{2^2 * 3 = 12}} (144 is too big), or {{2^4 * 3 = 48}} with {{2^2 * 3^2 = 36}}. So 36 and 48. This is slicker: no list of pairs to check.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "hcf-lcm",
      hints: [
        "Both numbers must be multiples of 12. Write them as 12 × something.",
        "Use HCF × LCM = product to find what the two 'somethings' multiply to.",
        "The two 'somethings' can't share a factor. Which pairs work, and which give numbers under 100?",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "factors-multiples-p1-q18",
      question: "{{720 = 2^4 * 3^2 * 5}}. How many factors does 720 have?",
      answer: { type: "number", value: 30 },
      traps: [
        {
          spec: { type: "number", value: 8 },
          feedback: "4 × 2 × 1 = 8 multiplies the powers. Each power needs + 1, because using none of that prime (power 0) is also a choice.",
        },
        {
          spec: { type: "number", value: 7 },
          feedback: "Adding the powers counts the prime factors, not the factors. Each factor chooses how many 2s, 3s and 5s to use, so multiply the numbers of choices.",
        },
      ],
      solution: [
        "A factor of 720 can use 0, 1, 2, 3 or 4 twos: 5 choices.",
        "It can use 0, 1 or 2 threes (3 choices), and 0 or 1 five (2 choices).",
        "Every combination gives a different factor, so there are 5 × 3 × 2 = 30 factors.",
      ],
      difficulty: "challenge",
      guideRef: "counting-factors",
      hints: [
        "Every factor of 720 is made of some 2s, some 3s and some 5s. How many choices are there for the 2s?",
        "Don't forget the choice of 'no 2s at all', because {{2^0 = 1}}.",
        "Multiply the numbers of choices for each prime.",
      ],
      strategy: "Count the choices",
    },
    {
      kind: "written",
      id: "factors-multiples-p1-q19",
      question:
        "Hana is listing the powers of 6: 6, 36, 216, 1296, 7776, … She claims that if she keeps going, one of them will eventually end in the digit 0.\n\nUse prime factorisation to prove that Hana is wrong.",
      marks: 3,
      modelAnswer:
        "A number ending in 0 is a multiple of 10, and {{10 = 2 * 5}}, so it would have to have 5 as a prime factor.\n\nBut {{6^n = (2 * 3)^n = 2^n * 3^n}}, so the only primes in any power of 6 are 2 and 3.\n\nEvery whole number has exactly one prime factorisation, so a power of 6 can't secretly contain a 5 as well. So no power of 6 is a multiple of 10, and none of them ends in 0.",
      markScheme: [
        { point: "Ending in 0 means being a multiple of 10, which needs a prime factor of 5", keywords: ["multiple of 10", "10", "factor of 5", "5"] },
        { point: "Powers of 6 are {{2^n * 3^n}}: their only prime factors are 2 and 3", keywords: ["2 and 3", "only 2", "2^n", "3^n", "only primes"] },
        {
          point: "Uses uniqueness of prime factorisation to conclude that 5 can never appear, so no power of 6 ends in 0",
          keywords: ["unique", "only one", "one way", "never", "no 5"],
        },
      ],
      solutions: [
        {
          label: "Second method: track the last digit",
          steps: [
            "6 ends in 6, and a number ending in 6 multiplied by 6 ends in the last digit of 6 × 6 = 36, which is 6 again.",
            "So every power of 6 ends in 6, never 0. That's quicker, but the prime factor proof explains *why*, and it also answers questions like 'can a power of 6 ever be divisible by 7?'",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "prime-factorisation",
      hints: [
        "What must be true of a number that ends in 0?",
        "Which primes make 10? Which primes make 6, 36, 216, …?",
        "Prime factorisation is unique. Could a power of 6 have a different prime factorisation that includes a 5?",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "written",
      id: "factors-multiples-p1-q20",
      question:
        "Jun says: \"If you multiply two numbers that are *not* square numbers, the answer can never be a square number.\"\n\nShow that Jun is wrong. Then use prime factorisation to explain when the product of two non-square numbers *is* a square.",
      marks: 3,
      modelAnswer:
        "Jun is wrong: 2 and 8 are not squares, but 2 × 8 = 16 = {{4^2}}. (So are 3 × 12 = 36 and 12 × 27 = 324 = {{18^2}}.)\n\nWhen you multiply two numbers, the powers of each prime **add**. For example, {{12 = 2^2 * 3}} and {{27 = 3^3}} give {{12 * 27 = 2^2 * 3^4}}.\n\nThe product is a square exactly when every one of these totals is even. An odd power plus an even power is odd, so the primes with **odd** powers in the first number must be exactly the primes with odd powers in the second number; then odd + odd makes even. In 12 and 27, the only odd power in each is the power of 3. So the product of two non-squares is *sometimes* a square.",
      markScheme: [
        {
          point: "Gives a correct counterexample, e.g. 2 × 8 = 16 or 3 × 12 = 36",
          keywords: ["2 × 8", "2x8", "16", "3 × 12", "36", "counterexample"],
        },
        { point: "States that multiplying adds the powers of each prime, and a square needs every power even", keywords: ["add", "even", "powers", "indices"] },
        {
          point: "Explains the condition: the primes with odd powers must be the same in both numbers, so the odd powers pair up",
          keywords: ["same primes", "odd powers", "odd + odd", "match", "same"],
        },
      ],
      difficulty: "challenge",
      guideRef: "squares-cubes-from-primes",
      hints: [
        "Try multiplying some small non-squares together: 2 × 8, 3 × 12, 2 × 3 …",
        "When you multiply {{2^a * 3^b}} by {{2^c * 3^d}}, what happens to the powers?",
        "For the product to be a square, each total power must be even. When is a sum of two whole numbers even?",
      ],
      strategy: "Try small cases",
    },
  ],
};

// ------------------------------ PAPER 2 ------------------------------------
const paper2: Paper = {
  id: "factors-multiples-p2",
  title: "Practice Paper 2",
  questions: [
    {
      kind: "short",
      id: "factors-multiples-p2-q01",
      question: "Which of these numbers are factors of 96?\n\n6, 9, 12, 16, 18, 32\n\nType all the ones that are factors, separated by commas.",
      answer: { type: "list", values: [6, 12, 16, 32] },
      traps: [
        {
          spec: { type: "list", values: [6, 12, 16, 18, 32] },
          feedback: "18 is not a factor: 96 ÷ 18 = 5 remainder 6. {{96 = 2^5 * 3}} has only one 3, but 18 needs two.",
        },
        { spec: { type: "list", values: [6, 9, 12, 16, 32] }, feedback: "9 is not a factor: the digit sum of 96 is 15, which isn't a multiple of 9." },
      ],
      solution: [
        "96 ÷ 6 = 16, 96 ÷ 12 = 8, 96 ÷ 16 = 6 and 96 ÷ 32 = 3, so 6, 12, 16 and 32 are factors.",
        "9 and 18 don't divide 96 exactly: the digit sum 15 isn't a multiple of 9, and 18 = 2 × 9.",
        "Factors: 6, 12, 16, 32.",
      ],
      difficulty: "warmup",
      guideRef: "factors-multiples-primes",
      hints: ["Divide 96 by each number in turn. Does it go exactly?"],
      strategy: "Use divisibility tests",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q02",
      question: "What is the smallest prime number greater than 90?",
      answer: { type: "number", value: 97 },
      traps: [
        { spec: { type: "number", value: 91 }, feedback: "91 isn't prime: 91 = 7 × 13." },
        { spec: { type: "number", value: 93 }, feedback: "93 has digit sum 12, so it is a multiple of 3: 93 = 3 × 31." },
      ],
      solution: [
        "Even numbers are out, and so is 95 = 5 × 19.",
        "91 = 7 × 13 and 93 = 3 × 31, so they are out too.",
        "97 is not divisible by 2, 3, 5 or 7, and {{11^2 = 121}} is bigger than 97, so 97 is prime.",
      ],
      difficulty: "warmup",
      guideRef: "factors-multiples-primes",
      hints: ["Test 91, 93, 95 and 97 in turn. Remember to try 7!"],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q03",
      question: "Write 140 in the form {{2^a * 5^b * 7^c}}. Give a, b and c in that order, separated by commas.",
      answer: { type: "list", values: [2, 1, 1], ordered: true, display: "2, 1, 1, so {{140 = 2^2 * 5 * 7}}" },
      traps: [
        { spec: { type: "list", values: [1, 1, 1], ordered: true }, feedback: "{{2 * 5 * 7 = 70}}, not 140. Multiply back to check: there is one more 2." },
      ],
      solution: ["140 ÷ 2 = 70, 70 ÷ 2 = 35, 35 ÷ 5 = 7, and 7 is prime.", "So {{140 = 2^2 * 5 * 7}}: a = 2, b = 1, c = 1."],
      difficulty: "warmup",
      guideRef: "prime-factorisation",
      hints: ["Divide by 2 as many times as you can, then by 5, then by 7."],
      strategy: "Work systematically (smallest prime first)",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q04",
      question: "Find the LCM of 9 and 15.",
      answer: { type: "number", value: 45 },
      traps: [
        { spec: { type: "number", value: 135 }, feedback: "9 × 15 = 135 is a common multiple, but not the lowest: 9 and 15 share a factor of 3." },
        { spec: { type: "number", value: 3 }, feedback: "3 is the HCF. The LCM is the smallest number that both 9 and 15 go into." },
      ],
      solution: ["Multiples of 15: 15, 30, 45, …", "9 doesn't divide 15 or 30, but 45 = 9 × 5. So the LCM is 45."],
      difficulty: "warmup",
      guideRef: "hcf-lcm",
      hints: ["List the multiples of the bigger number and stop at the first one that 9 goes into."],
      strategy: "Work systematically",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q05",
      question:
        "Ravi's phone reminder beeps every 6 minutes and Hana's beeps every 10 minutes. Both beep at 4:00 pm. After how many minutes do they next beep at the same time?",
      answer: { type: "number", value: 30, display: "30 minutes" },
      traps: [
        { spec: { type: "number", value: 60 }, feedback: "They do beep together after 60 minutes, but they line up sooner: 6 and 10 share a factor of 2." },
        { spec: { type: "number", value: 2 }, feedback: "2 is the HCF of 6 and 10. Neither reminder has beeped again after 2 minutes." },
      ],
      solution: [
        "Ravi's reminder beeps 6, 12, 18, 24, 30, … minutes after 4:00 pm.",
        "Hana's beeps 10, 20, 30, … minutes after 4:00 pm.",
        "The first shared time is LCM(6, 10) = 30 minutes, at 4:30 pm.",
      ],
      difficulty: "warmup",
      guideRef: "hcf-lcm-problems",
      hints: ["List the times (in minutes after 4:00 pm) when each reminder beeps."],
      strategy: "Draw a diagram (timeline)",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q06",
      question:
        "The four-digit number 47▢2 is divisible by 8, where ▢ is a missing digit. Find all the possible missing digits, separated by commas.",
      answer: { type: "list", values: [1, 5, 9] },
      traps: [
        {
          spec: { type: "list", values: [1, 3, 5, 7, 9] },
          feedback: "Those make the last *two* digits a multiple of 4, which is the test for 4. For 8 you need the last *three* digits, 7▢2, to be a multiple of 8.",
        },
      ],
      solution: [
        "A number is divisible by 8 exactly when its last three digits are. So 7▢2 must be a multiple of 8.",
        "Multiples of 8 between 700 and 799 that end in 2: 712 = 8 × 89, 752 = 8 × 94 and 792 = 8 × 99.",
        "So the missing digit is 1, 5 or 9.",
      ],
      commonError: "Using the last two digits (the test for 4) instead of the last three.",
      difficulty: "core",
      guideRef: "factors-multiples-primes",
      hints: [
        "Which digits does the divisibility test for 8 look at?",
        "You need 7▢2 to be a multiple of 8. Which multiples of 8 between 700 and 800 end in 2?",
      ],
      strategy: "Use divisibility tests",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q07",
      question: "Write 4725 in the form {{3^a * 5^b * 7^c}}. Give a, b and c in that order, separated by commas.",
      answer: { type: "list", values: [3, 2, 1], ordered: true, display: "3, 2, 1, so {{4725 = 3^3 * 5^2 * 7}}" },
      traps: [
        {
          spec: { type: "list", values: [2, 2, 1], ordered: true },
          feedback: "{{3^2 * 5^2 * 7 = 1575}}, which is only a third of 4725. Keep dividing by 3 while the digit sum allows it.",
        },
      ],
      solution: [
        "4725 is odd, so 2 is not a factor. Its digit sum is 18, so divide by 3: 4725 ÷ 3 = 1575.",
        "1575 has digit sum 18: 1575 ÷ 3 = 525. 525 has digit sum 12: 525 ÷ 3 = 175.",
        "175 has digit sum 13, so there are no more 3s. 175 ÷ 5 = 35 and 35 ÷ 5 = 7.",
        "So {{4725 = 3^3 * 5^2 * 7}}: a = 3, b = 2, c = 1. Check: 27 × 25 × 7 = 675 × 7 = 4725 ✓",
      ],
      solutions: [
        {
          label: "Start with the 5s instead",
          steps: [
            "4725 ends in 5: 4725 ÷ 5 = 945, then 945 ÷ 5 = 189.",
            "{{189 = 27 * 7 = 3^3 * 7}}.",
            "Same answer, {{3^3 * 5^2 * 7}}. This route is a little quicker, and the order you divide in can't change the answer, because the prime factorisation is unique.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "prime-factorisation",
      hints: [
        "4725 is odd, so 2 is out. Use the digit sum to check whether 3 goes in.",
        "Keep dividing by 3 until the digit sum says stop, then move on to 5.",
      ],
      strategy: "Work systematically",
    },
    {
      kind: "written",
      id: "factors-multiples-p2-q08",
      question:
        "Priya and Ethan both write 360 as a product of factors.\n\n- Priya: {{360 = 2^3 * 3^2 * 5}}\n- Ethan: {{360 = 2^2 * 3^2 * 10}}\n\nEthan says: \"Both of these are correct, so a number can have two different prime factorisations.\" Explain what is wrong with Ethan's reasoning.",
      marks: 3,
      modelAnswer:
        "Both products do equal 360, but Ethan's is not a *prime* factorisation, because 10 is not prime.\n\nSplitting 10 = 2 × 5 turns his answer into {{2^2 * 3^2 * 2 * 5 = 2^3 * 3^2 * 5}}, which is exactly Priya's answer.\n\nEvery whole number greater than 1 has only one prime factorisation (apart from the order of the primes), so two correct prime factorisations of 360 must always match.",
      markScheme: [
        {
          point: "Points out that 10 is not prime, so Ethan's answer is not a prime factorisation",
          keywords: ["10 is not prime", "not prime", "10 = 2 × 5", "composite"],
        },
        { point: "Shows that Ethan's version becomes {{2^3 * 3^2 * 5}}, the same as Priya's", keywords: ["2 × 5", "same", "2^3", "priya"] },
        { point: "States that prime factorisation is unique (only one way, apart from order)", keywords: ["unique", "only one", "one way", "order"] },
      ],
      commonError: "Saying Ethan is wrong because his product doesn't equal 360. It does (4 × 9 × 10 = 360). The problem is that 10 isn't prime.",
      difficulty: "core",
      guideRef: "prime-factorisation",
      hints: ["Check each number in Ethan's product. Are they all prime?", "Split any number that isn't prime. What do you end up with?"],
      strategy: "Spot the error",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q09",
      question: "Find the LCM of 90 and 168.",
      answer: { type: "number", value: 2520 },
      traps: [
        {
          spec: { type: "number", value: 15120 },
          feedback: "90 × 168 = 15120 is a common multiple, but 90 and 168 share a factor of 6, so it is 6 times too big.",
        },
        { spec: { type: "number", value: 6 }, feedback: "6 is the HCF. The LCM must be at least as big as 168." },
      ],
      solution: [
        "{{90 = 2 * 3^2 * 5}} and {{168 = 2^3 * 3 * 7}}.",
        "LCM: every prime at its higher power: {{2^3 * 3^2 * 5 * 7}}.",
        "8 × 9 × 35 = 72 × 35 = 2520.",
      ],
      solutions: [
        {
          label: "Using HCF × LCM = product",
          steps: ["HCF = shared primes at the lower power = 2 × 3 = 6.", "LCM = 90 × 168 ÷ 6 = 15 × 168 = 2520."],
        },
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: ["Write both numbers as products of primes.", "Every prime that appears in either number goes into the LCM, at its higher power."],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q10",
      question: "Find the HCF of {{20a^2 b}} and {{30a b^3}}.",
      answer: { type: "expression", expr: "10ab", display: "{{10ab}}" },
      traps: [
        {
          spec: { type: "expression", expr: "60a^2b^3" },
          feedback: "That's the LCM: the highest powers of everything. The HCF only takes what both terms share, at the lower power.",
        },
        {
          spec: { type: "expression", expr: "10a^2b^3" },
          feedback: "The number part is right, but the HCF takes the *lower* power of each letter: {{a^1}} and {{b^1}}.",
        },
      ],
      solution: [
        "Numbers: HCF(20, 30) = 10.",
        "Letter a: the terms have {{a^2}} and {{a^1}}, so the lower power is {{a^1}}.",
        "Letter b: the terms have {{b^1}} and {{b^3}}, so the lower power is {{b^1}}.",
        "HCF = {{10ab}}. Check: {{20a^2 b = 10ab * 2a}} and {{30a b^3 = 10ab * 3b^2}} ✓",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: [
        "Treat the letters like primes: a and b are building blocks, just like 2 and 3.",
        "Find the HCF of 20 and 30, then the lower power of a, then the lower power of b.",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q11",
      question:
        "Siti has 84 rambutans and 63 mangosteens. She packs them all into identical bags, so that every bag has the same number of rambutans and the same number of mangosteens, with no fruit left over. What is the greatest number of bags she can make?",
      answer: { type: "number", value: 21 },
      traps: [
        {
          spec: { type: "number", value: 252 },
          feedback: "252 is the LCM. Siti can't make 252 bags from 84 rambutans! The number of bags must go *into* both 84 and 63.",
        },
        { spec: { type: "number", value: 7 }, feedback: "7 bags works, but it isn't the greatest. 84 and 63 are both multiples of 3 as well." },
      ],
      solution: [
        "The number of bags must divide both 84 and 63 exactly, so it is a common factor; 'greatest' means the HCF.",
        "{{84 = 2^2 * 3 * 7}} and {{63 = 3^2 * 7}}, so HCF = 3 × 7 = 21.",
        "21 bags, each with 84 ÷ 21 = 4 rambutans and 63 ÷ 21 = 3 mangosteens.",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: ["Is the number of bags a factor or a multiple of 84?", "You need the biggest number that divides both 84 and 63."],
      strategy: "Ask: building up or breaking down?",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q12",
      question:
        "Two gear wheels mesh together. One has 18 teeth and the other has 30 teeth. A tooth on each wheel is marked with paint, and the two marked teeth start off touching. How many complete turns does each wheel make before the marked teeth next touch? Give the number of turns of the 18-tooth wheel first.",
      answer: { type: "list", values: [5, 3], ordered: true, display: "18-tooth wheel: 5 turns; 30-tooth wheel: 3 turns" },
      traps: [
        {
          spec: { type: "list", values: [3, 5], ordered: true },
          feedback: "Swapped: the smaller wheel has to turn more times. 90 ÷ 18 = 5 and 90 ÷ 30 = 3.",
        },
        {
          spec: { type: "list", values: [30, 18], ordered: true },
          feedback: "That's what happens after 18 × 30 = 540 teeth. The marks do touch then, but they already touched earlier: 18 and 30 share a factor of 6.",
        },
      ],
      solution: [
        "Each time one tooth passes the meeting point, both wheels move on by one tooth.",
        "The small wheel's mark is back after 18, 36, 54, 72, 90, … teeth; the big wheel's mark after 30, 60, 90, … teeth.",
        "They meet again after LCM(18, 30) teeth. {{18 = 2 * 3^2}} and {{30 = 2 * 3 * 5}}, so the LCM is {{2 * 3^2 * 5 = 90}}.",
        "Turns: 90 ÷ 18 = 5 for the small wheel and 90 ÷ 30 = 3 for the big wheel.",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: [
        "After how many teeth is each marked tooth back at the meeting point?",
        "Both must be back at the same time, so you need a common multiple of 18 and 30.",
        "Find the LCM, then divide it by each wheel's number of teeth.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q13",
      question:
        "At a bus interchange, service A leaves every 14 minutes and service B leaves every 21 minutes. Both leave together at 6:50 am. How many times do they leave together from 6:50 am up to and including 10:50 am?",
      answer: { type: "number", value: 6 },
      traps: [
        { spec: { type: "number", value: 5 }, feedback: "You've missed the shared departure at 6:50 am itself. The question says *from* 6:50 am." },
        {
          spec: { type: "number", value: 7 },
          feedback: "240 ÷ 42 is about 5.7, so only 5 more shared departures fit after 6:50 am (the last at 10:20 am). The next one, at 11:02 am, is too late.",
        },
      ],
      solution: [
        "They leave together every LCM(14, 21) minutes. {{14 = 2 * 7}} and {{21 = 3 * 7}}, so the LCM is 2 × 3 × 7 = 42 minutes.",
        "From 6:50 am to 10:50 am is 4 hours = 240 minutes.",
        "Shared departures are 0, 42, 84, 126, 168 and 210 minutes after 6:50 am. The next would be 252 minutes, which is too late.",
        "That's 6 times: 6:50, 7:32, 8:14, 8:56, 9:38 and 10:20 am.",
      ],
      difficulty: "core",
      guideRef: "hcf-lcm-problems",
      hints: [
        "How often do the two services leave together?",
        "Find LCM(14, 21). How many minutes are there from 6:50 am to 10:50 am?",
        "List the shared departure times, and don't forget 6:50 am itself.",
      ],
      strategy: "Draw a diagram (timeline)",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q14",
      question: "Use prime factors to find {{cbrt(9261)}}.",
      answer: { type: "number", value: 21 },
      traps: [
        {
          spec: { type: "number", value: 3087 },
          feedback: "3087 is 9261 ÷ 3. The cube root is the number that, used three times in a multiplication, makes 9261.",
        },
      ],
      solution: [
        "9261 is odd and its digit sum is 18, so divide by 3: 9261 ÷ 3 = 3087, 3087 ÷ 3 = 1029, 1029 ÷ 3 = 343.",
        "343 = 7 × 7 × 7, so {{9261 = 3^3 * 7^3}}.",
        "Divide each power by 3: {{cbrt(9261) = 3 * 7 = 21}}.",
        "Check: 21 × 21 × 21 = 441 × 21 = 9261 ✓",
      ],
      difficulty: "core",
      guideRef: "squares-cubes-from-primes",
      hints: [
        "9261 is odd. Use the digit sum to test for 3.",
        "Keep dividing by 3. What is left when you can't any more?",
        "Once every power is a multiple of 3, divide each power by 3.",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "written",
      id: "factors-multiples-p2-q15",
      question:
        "Hana says: \"To find the LCM of two numbers, just multiply them together.\"\n\nGive an example where Hana's method works and an example where it doesn't. Then use the HCF to explain exactly when her method works.",
      marks: 3,
      modelAnswer:
        "**Works:** 4 and 9. 4 × 9 = 36, and LCM(4, 9) = 36.\n\n**Doesn't work:** 4 and 6. 4 × 6 = 24, but LCM(4, 6) = 12.\n\n**Why:** for any two numbers, HCF × LCM = the product of the numbers, so LCM = product ÷ HCF. The LCM equals the product exactly when the HCF is 1, which means the two numbers share no prime factor. When they do share a factor (like the 2 in 4 and 6), multiplying counts it twice, so the product is bigger than the LCM.",
      markScheme: [
        {
          point: "A correct example where it works (two numbers with HCF 1, e.g. 4 and 9, or 5 and 7)",
          keywords: ["4 and 9", "36", "5 and 7", "35", "coprime", "hcf 1", "hcf = 1"],
        },
        {
          point: "A correct example where it fails (numbers that share a factor, e.g. 4 and 6 give 24 but the LCM is 12)",
          keywords: ["4 and 6", "12", "24", "6 and 8", "too big"],
        },
        {
          point: "Explains that it works exactly when HCF = 1 (no common prime factors), using HCF × LCM = product",
          keywords: ["hcf = 1", "hcf is 1", "no common", "share no", "product ÷ hcf", "hcf × lcm"],
        },
      ],
      difficulty: "core",
      guideRef: "hcf-lcm",
      hints: [
        "Try a few pairs: 3 and 5, 4 and 6, 6 and 8, 4 and 9.",
        "In the pairs where it fails, what do the two numbers have in common?",
        "Use HCF × LCM = a × b. When is the LCM equal to a × b?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q16",
      question: "{{n = 2^5 * 3^2 * 5^3}}. What is the smallest whole number you can **divide** n by so that the answer is a square number?",
      answer: { type: "number", value: 10 },
      traps: [
        { spec: { type: "number", value: 2 }, feedback: "Dividing by 2 makes the power of 2 even ({{2^4}}), but {{5^3}} still has an odd power." },
        {
          spec: { type: "number", value: 30 },
          feedback: "Dividing by 3 as well spoils the 3s: {{3^2}} becomes {{3^1}}, which is odd. Only remove primes that have odd powers.",
        },
      ],
      solution: [
        "A square number has every power even.",
        "In {{2^5 * 3^2 * 5^3}}, the powers 5 (for the 2s) and 3 (for the 5s) are odd. The power of 3 is already even.",
        "Divide by one 2 and one 5: 2 × 5 = 10.",
        "Check: n ÷ 10 = {{2^4 * 3^2 * 5^2 = (2^2 * 3 * 5)^2 = 60^2}} = 3600 ✓",
      ],
      difficulty: "core",
      guideRef: "squares-cubes-from-primes",
      hints: [
        "What must be true of every power in a square number?",
        "Which powers in n are odd?",
        "Dividing by a prime lowers its power by 1.",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q17",
      question: "What is the smallest whole number that has exactly 10 factors?",
      answer: { type: "number", value: 48 },
      traps: [
        { spec: { type: "number", value: 512 }, feedback: "{{512 = 2^9}} does have 10 factors, but a number made from two different primes can be much smaller." },
        { spec: { type: "number", value: 80 }, feedback: "{{80 = 2^4 * 5}} has 10 factors, but using 3 instead of 5 gives something smaller." },
      ],
      solution: [
        "If {{n = p^a * q^b * …}}, it has {{(a + 1)(b + 1)…}} factors, so the brackets must multiply to 10.",
        "10 = 10 or 10 = 5 × 2. So n is {{p^9}}, or {{p^4 * q}} with p and q different primes.",
        "Smallest {{p^9}}: {{2^9 = 512}}. Smallest {{p^4 * q}}: give the big power to the smallest prime, {{2^4 * 3 = 48}}.",
        "48 is smaller than 512, so the answer is 48. Check: 1, 2, 3, 4, 6, 8, 12, 16, 24, 48 is ten factors ✓",
      ],
      difficulty: "challenge",
      guideRef: "counting-factors",
      hints: [
        "How does the number of factors depend on the powers in the prime factorisation?",
        "Write 10 as a product of whole numbers bigger than 1 in every possible way.",
        "For each way, build the smallest number you can: use the smallest primes and give the biggest power to 2.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "factors-multiples-p2-q18",
      question:
        "Three runners set off together from the start line of a track. Aisha runs a lap every 60 seconds, Marcus every 72 seconds and Priya every 90 seconds. When they are next all at the start line together, how many laps has each runner completed? Give the answers for Aisha, Marcus and Priya, in that order.",
      answer: { type: "list", values: [6, 5, 4], ordered: true, display: "Aisha 6, Marcus 5, Priya 4" },
      traps: [
        {
          spec: { type: "list", values: [4, 5, 6], ordered: true },
          feedback: "Reversed: Aisha has the shortest lap time, so she is the fastest and completes the most laps.",
        },
      ],
      solution: [
        "They are all back together after a common multiple of 60, 72 and 90 seconds, and 'next' means the lowest.",
        "{{60 = 2^2 * 3 * 5}}, {{72 = 2^3 * 3^2}} and {{90 = 2 * 3^2 * 5}}.",
        "LCM: every prime at its highest power: {{2^3 * 3^2 * 5 = 360}} seconds (6 minutes).",
        "Laps: Aisha 360 ÷ 60 = 6, Marcus 360 ÷ 72 = 5, Priya 360 ÷ 90 = 4.",
      ],
      solutions: [
        {
          label: "Two at a time",
          steps: [
            "LCM(60, 72): the multiples of 72 are 72, 144, 216, 288, 360, and 360 is the first one that 60 divides.",
            "Does 90 divide 360? Yes, 360 = 4 × 90. So all three meet after 360 seconds.",
            "This works because LCM(a, b, c) = LCM(LCM(a, b), c). Prime factors are quicker when there are three or more numbers.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "hcf-lcm-problems",
      hints: [
        "Each runner is at the start line after a whole number of laps. When are all three there at once?",
        "Find the LCM of 60, 72 and 90 using prime factors: take every prime at its highest power.",
        "Divide the LCM by each runner's lap time.",
      ],
      strategy: "Use the prime factorisation",
    },
    {
      kind: "written",
      id: "factors-multiples-p2-q19",
      question:
        "Wei Ling picks a two-digit number, reverses its digits and adds the two numbers. For example, 47 + 74 = 121 = 11 × 11.\n\n1. Prove that the answer is always a multiple of 11.\n2. Prove that if she *subtracts* the smaller number from the larger one instead, the answer is always a multiple of 9.",
      marks: 4,
      modelAnswer:
        "1. Call the tens digit a and the units digit b. Then the number is {{10a + b}} and the reversed number is {{10b + a}}.\n\n    {{(10a + b) + (10b + a) = 11a + 11b = 11(a + b)}}\n\nThat is 11 times a whole number, so it is always a multiple of 11. (For 47: 11 × (4 + 7) = 121 ✓)\n\n2. With a bigger than b:\n\n    {{(10a + b) - (10b + a) = 9a - 9b = 9(a - b)}}\n\nThat is 9 times a whole number, so it is always a multiple of 9. (74 − 47 = 27 = 9 × 3 ✓)",
      markScheme: [
        {
          point: "Writes the number and its reverse using place value, e.g. 10a + b and 10b + a",
          keywords: ["10a + b", "10a+b", "10b + a", "10b+a", "tens", "place value"],
        },
        { point: "Shows the sum is 11a + 11b = 11(a + b), a multiple of 11", keywords: ["11a + 11b", "11a+11b", "11(a + b)", "11(a+b)"] },
        { point: "Shows the difference is 9a − 9b = 9(a − b)", keywords: ["9a - 9b", "9a − 9b", "9(a - b)", "9(a − b)", "9(a-b)"] },
        {
          point: "Concludes each is a whole number times 11 (or 9), so it is always a multiple, not just for the examples tried",
          keywords: ["always", "multiple of 11", "multiple of 9", "any", "whole number"],
        },
      ],
      commonError: "Checking lots of examples and calling that a proof. Examples can only show it *might* be true; algebra shows it is *always* true.",
      difficulty: "challenge",
      guideRef: "factors-multiples-primes",
      hints: [
        "Examples aren't a proof. Use letters: call the tens digit a and the units digit b.",
        "47 means 4 × 10 + 7. Write the number and its reverse using a and b.",
        "Add them and collect like terms. Can you take out a common factor?",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "factors-multiples-p2-q20",
      question:
        "A number has **exactly three** factors. Prove that it must be the square of a prime number. (For example, 4, 9, 25 and 49 each have exactly three factors.)",
      marks: 3,
      modelAnswer:
        "Factors come in pairs that multiply to the number. Three is odd, so one factor must pair with itself. That means the number is a square, say {{n = m^2}} with m bigger than 1, and its factors include 1, m and {{m^2}}. These are already three different factors, so there can be no others.\n\nAny factor of m is also a factor of n. If m had a factor other than 1 and m (say m = 6, with factor 2), that would be a fourth factor of n. So m has no factors except 1 and itself: **m is prime**.\n\nSo n is the square of a prime.",
      markScheme: [
        {
          point: "Uses factor pairs: an odd number of factors means one factor pairs with itself, so n is a square",
          keywords: ["pair", "itself", "odd", "square"],
        },
        { point: "Identifies the three factors as 1, m and m² (where n = m²)", keywords: ["1, m", "m^2", "m²", "three factors", "1, p"] },
        {
          point: "Argues that m must be prime, because any other factor of m would be an extra factor of n (or uses (a + 1)(b + 1)… = 3 with 3 prime)",
          keywords: ["prime", "extra factor", "fourth factor", "a + 1 = 3", "a+1=3", "only one bracket", "more than three"],
        },
      ],
      solutions: [
        {
          label: "Second method: the factor-counting rule (slicker, if you know it)",
          steps: [
            "If {{n = p^a * q^b * …}}, the number of factors is {{(a + 1)(b + 1)…}}.",
            "This must equal 3. Since 3 is prime, it can't be split into a product of two numbers bigger than 1, so there is only one prime: {{n = p^a}} with a + 1 = 3.",
            "So a = 2 and {{n = p^2}}.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "counting-factors",
      hints: [
        "Factors come in pairs. How can a number have an odd number of factors?",
        "So n is a square, {{m^2}}. Write down three factors you know it has.",
        "If m were not prime, say m = 6, what extra factors would n have?",
      ],
      strategy: "Try small cases",
    },
  ],
};

// ------------------------------ CHALLENGE ----------------------------------
const challenge: Question[] = [
  {
    kind: "short",
    id: "factors-multiples-ch-q01",
    question: "How many of the whole numbers from 1 to 100 are divisible by 4 or by 6 (or by both)?",
    answer: { type: "number", value: 33 },
    traps: [
      { spec: { type: "number", value: 41 }, feedback: "25 + 16 = 41 counts numbers like 12, 24 and 36 twice: they are multiples of both 4 and 6." },
      {
        spec: { type: "number", value: 37 },
        feedback: "Close! You subtracted the multiples of 24, but a number divisible by both 4 and 6 is a multiple of LCM(4, 6) = 12, not of 4 × 6. Think of 12 or 36.",
      },
    ],
    solution: [
      "Multiples of 4 up to 100: 100 ÷ 4 = 25 of them.",
      "Multiples of 6 up to 100: 100 ÷ 6 = 16 remainder 4, so 16 of them (up to 96).",
      "Numbers in both lists are divisible by 4 and by 6, which means they are multiples of LCM(4, 6) = 12. There are 8 of them: 12, 24, …, 96.",
      "Those were counted twice, so subtract them once: 25 + 16 − 8 = 33.",
    ],
    solutions: [
      {
        label: "Second method: repeating blocks of 12",
        steps: [
          "Whether a number is divisible by 4 or 6 repeats every 12 numbers, because 12 = LCM(4, 6).",
          "In 1 to 12 the hits are 4, 6, 8 and 12: four of them.",
          "1 to 96 is 8 blocks of 12, giving 8 × 4 = 32.",
          "In 97 to 100 only 100 is a hit. Total: 32 + 1 = 33.",
          "Both are quick here. The block method can't double-count, but adding and subtracting (inclusion–exclusion) is slicker for awkward ranges like 1 to 1000.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "factors-multiples-primes",
    hints: [
      "Count the multiples of 4 and the multiples of 6 separately.",
      "Some numbers are in both lists. Which ones? Try 12, 24, 36 …",
      "A number divisible by both 4 and 6 is a multiple of what? (Careful: it isn't 24.)",
      "Add the two counts, then subtract the overlap once.",
    ],
    strategy: "Count the overlap once",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q02",
    question: "Find the largest five-digit number that is divisible by 36 and has five *different* digits.",
    answer: { type: "number", value: 98712 },
    traps: [
      { spec: { type: "number", value: 99972 }, feedback: "99972 = 36 × 2777 is the largest five-digit multiple of 36, but its digits aren't all different." },
      { spec: { type: "number", value: 98748 }, feedback: "98748 is divisible by 36, but the digit 8 appears twice." },
    ],
    solution: [
      "36 = 4 × 9, and 4 and 9 share no factor, so the number must pass the tests for 4 and for 9.",
      "Divisible by 9: the digit sum is a multiple of 9. Five different digits add up to at most 9 + 8 + 7 + 6 + 5 = 35, so the digit sum is 9, 18 or 27.",
      "To be as large as possible, start with 9 and 8. Then the digit sum is at least 9 + 8 + 0 + 1 + 2 = 20, so it must be 27, and the last three digits add up to 27 − 17 = 10.",
      "Make the middle digit as big as possible: 7. The last two digits then add up to 3, using different digits: {0, 3} or {1, 2}.",
      "Divisible by 4: the last two digits must make a multiple of 4. Of 30, 03, 12 and 21, only 12 works.",
      "So the number is 98712. Check: 98712 = 36 × 2742 ✓",
    ],
    commonError: "Testing for 36 using 6 and 6, or 3 and 12. The two tests must have no common factor, so use 4 and 9.",
    difficulty: "challenge",
    guideRef: "factors-multiples-primes",
    hints: [
      "36 = 4 × 9. Which two divisibility tests does that give you?",
      "Five different digits can add up to at most 35. Which multiples of 9 could the digit sum be?",
      "Start with 98 to be as big as possible. What must the last three digits add up to?",
      "Make the third digit as large as you can, then use the test for 4 on the last two digits.",
    ],
    strategy: "Consider extremes",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q03",
    question: "The number 1 × 2 × 3 × … × 50 is written out in full. How many zeros are there at the end of it?",
    answer: { type: "number", value: 12 },
    traps: [
      {
        spec: { type: "number", value: 10 },
        feedback: "You've counted one 5 for each multiple of 5. But 25 and 50 each contain *two* 5s: {{25 = 5^2}} and {{50 = 2 * 5^2}}.",
      },
      {
        spec: { type: "number", value: 5 },
        feedback: "Counting only 10, 20, 30, 40, 50 misses the zeros made when a 5 (from 5, 15, 25, …) pairs up with one of the many spare 2s.",
      },
    ],
    solution: [
      "Each zero at the end comes from a factor of 10 = 2 × 5, so count how many pairs of a 2 and a 5 the product contains.",
      "There are far more 2s than 5s (every even number gives at least one 2), so the number of 5s decides it.",
      "Multiples of 5 up to 50: 5, 10, 15, …, 50. That's 10 numbers, each giving one 5.",
      "25 and 50 are multiples of {{25 = 5^2}}, so each gives one extra 5: 2 more.",
      "Total 5s: 10 + 2 = 12. So there are 12 factors of 10, and 12 zeros at the end.",
    ],
    solutions: [
      {
        label: "Second method: count the 5s by division (slicker for big numbers)",
        steps: [
          "Multiples of 5 up to 50: 50 ÷ 5 = 10.",
          "Multiples of 25 up to 50: 50 ÷ 25 = 2. (Each of these has a second 5.)",
          "Add: 10 + 2 = 12 zeros. For 1 × 2 × … × 1000 this gives 200 + 40 + 8 + 1 = 249 zeros in seconds, with no listing at all.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "prime-factorisation",
    hints: [
      "What makes a zero appear at the end of a number?",
      "Each end zero needs a factor of 10 = 2 × 5. In this product, which are rarer: 2s or 5s?",
      "Count the 5s. Watch out for numbers that contain more than one 5.",
    ],
    strategy: "Use the prime factorisation",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q04",
    question:
      "One number is removed from the list 1, 2, 3, …, 10 so that the product of the nine numbers left is a square number. Which number is removed? And the product of the nine numbers left is the square of which whole number? Give the removed number first, then that whole number, separated by a comma.",
    answer: { type: "list", values: [7, 720], ordered: true, display: "Remove 7; the product is {{720^2}}" },
    traps: [
      { spec: { type: "list", values: [7, 518400], ordered: true }, feedback: "518400 is the product itself. The question asks for the number it is the square of." },
      {
        spec: { type: "list", values: [7, 360], ordered: true },
        feedback:
          "Right number removed, but {{360^2 = 129600}} is only a quarter of the product. Recount the 2s (8 alone gives three of them): there are eight 2s, so the square root contains {{2^4}}, giving {{2^4 * 3^2 * 5 = 720}}.",
      },
    ],
    solution: [
      "Find the prime factorisation of 1 × 2 × … × 10 by counting each prime.",
      "2s: 2 gives one, 4 gives two, 6 gives one, 8 gives three, 10 gives one: 8 in total. 3s: 3, 6 and 9 give 1 + 1 + 2 = 4. 5s: 5 and 10 give 2. 7s: just one.",
      "So the product is {{2^8 * 3^4 * 5^2 * 7}}. The only odd power is {{7^1}}.",
      "Remove 7: the rest is {{2^8 * 3^4 * 5^2 = (2^4 * 3^2 * 5)^2 = 720^2}}.",
      "No other number works: 7 is the only number in the list containing a 7, so removing anything else leaves the 7 with an odd power.",
    ],
    solutions: [
      {
        label: "Second method: group into squares (slicker)",
        steps: [
          "4 and 9 are already squares, and 2 × 8 = 16 = {{4^2}}.",
          "3 × 6 × 5 × 10 = 900 = {{30^2}}.",
          "That uses everything except 1 (which changes nothing) and 7. So remove 7, and the product is {{2^2 * 3^2 * 4^2 * 30^2 = (2 * 3 * 4 * 30)^2 = 720^2}}.",
          "Spotting the groups is quicker, but the prime count proves that 7 is the only possible answer.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "squares-cubes-from-primes",
    hints: [
      "A product is a square when every prime appears an even number of times.",
      "Count how many 2s, 3s, 5s and 7s there are in 1 × 2 × … × 10.",
      "Which prime appears an odd number of times? Which single number in the list could fix that?",
      "For the square root, halve every power.",
    ],
    strategy: "Use the prime factorisation",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q05",
    question:
      "When Mei counts her stickers in 2s, 3s, 4s, 5s or 6s, there is always exactly 1 sticker left over. When she counts them in 7s, there are none left over. What is the smallest number of stickers she could have?",
    answer: { type: "number", value: 301 },
    traps: [
      {
        spec: { type: "number", value: 61 },
        feedback: "61 leaves remainder 1 when divided by 2, 3, 4, 5 and 6, but 61 = 7 × 8 + 5, so the 7s condition fails.",
      },
      {
        spec: { type: "number", value: 421 },
        feedback: "421 is 1 more than LCM(2, 3, 4, 5, 6, 7) = 420, so it leaves remainder 1 when divided by 7, not 0. The 7s condition is different from the others.",
      },
    ],
    solution: [
      "Exactly 1 left over every time means (number − 1) is a multiple of 2, 3, 4, 5 and 6.",
      "LCM(2, 3, 4, 5, 6) = {{2^2 * 3 * 5 = 60}}. So the number is 61, 121, 181, 241, 301, …",
      "Test each for 7: 61 = 56 + 5, 121 = 119 + 2, 181 = 175 + 6, 241 = 238 + 3, 301 = 7 × 43 ✓",
      "The smallest is 301.",
    ],
    solutions: [
      {
        label: "Second method: track the remainder (slicker for bigger numbers)",
        steps: [
          "61 leaves remainder 5 when divided by 7.",
          "Each step of + 60 adds 60 = 56 + 4, so it adds 4 to the remainder (going back round past 7).",
          "The remainders go 5, 2, 6, 3, 0. Zero comes after four steps, so the answer is 61 + 4 × 60 = 301.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "hcf-lcm-problems",
    hints: [
      "If there is always 1 left over, what can you say about the number of stickers minus 1?",
      "The number minus 1 is a multiple of 2, 3, 4, 5 and 6. What is the smallest such multiple?",
      "So the number is 1 more than a multiple of 60. Which of these is divisible by 7?",
    ],
    strategy: "Work backwards",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q06",
    question: "How many pairs of whole numbers a and b, with a < b, have HCF 6 and LCM 360?",
    answer: { type: "number", value: 4 },
    traps: [
      {
        spec: { type: "number", value: 6 },
        feedback: "Some of your pairs have the right product but the wrong HCF. For example, 12 and 180 multiply to 2160 = 6 × 360, but their HCF is 12, not 6.",
      },
      { spec: { type: "number", value: 8 }, feedback: "You've counted each pair twice, once as (a, b) and once as (b, a). The question asks for a < b." },
    ],
    solution: [
      "Both numbers are multiples of 6: write a = 6m and b = 6n.",
      "HCF × LCM = ab, so 6 × 360 = 36mn, giving mn = 60.",
      "m and n must have no common factor, otherwise the HCF would be bigger than 6.",
      "Pairs with mn = 60 and m < n: (1, 60), (2, 30), (3, 20), (4, 15), (5, 12), (6, 10). The pairs (2, 30) and (6, 10) share a factor of 2, so they fail.",
      "That leaves 4 pairs: 6 and 360, 18 and 120, 24 and 90, 30 and 72.",
    ],
    solutions: [
      {
        label: "Second method: hand out the prime powers (slicker)",
        steps: [
          "{{6 = 2 * 3}} and {{360 = 2^3 * 3^2 * 5}}.",
          "For each prime, one number gets the HCF's power and the other gets the LCM's power. The 2s ({{2^1}} or {{2^3}}), the 3s ({{3^1}} or {{3^2}}) and the 5s ({{5^0}} or {{5^1}}) each give one decision.",
          "Three decisions with two choices each: 2 × 2 × 2 = 8 ordered pairs.",
          "Each pair has been counted twice (as a, b and as b, a), so there are 8 ÷ 2 = 4 pairs with a < b. This is slicker because it needs no list, and it works just as well for huge numbers.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "hcf-lcm",
    hints: [
      "Both numbers must be multiples of the HCF. Write them as 6m and 6n.",
      "Use HCF × LCM = a × b to find what m × n must be.",
      "List the factor pairs of mn. Which ones would make the HCF bigger than 6?",
    ],
    strategy: "Introduce a variable",
  },
  {
    kind: "short",
    id: "factors-multiples-ch-q07",
    question: "How many of the factors of 3600 are square numbers? (Count 1 as a square number.)",
    answer: { type: "number", value: 12 },
    traps: [
      { spec: { type: "number", value: 45 }, feedback: "45 is the total number of factors of 3600. Only the ones with every power even are squares." },
      { spec: { type: "number", value: 11 }, feedback: "Did you leave out 1? {{1 = 1^2}} counts as a square here." },
    ],
    solution: [
      "{{3600 = 2^4 * 3^2 * 5^2}}.",
      "A factor is a square exactly when all of its powers are even.",
      "Powers of 2 it can use: 0, 2 or 4 (3 choices). Powers of 3: 0 or 2 (2 choices). Powers of 5: 0 or 2 (2 choices).",
      "Square factors: 3 × 2 × 2 = 12.",
      "They are 1, 4, 9, 16, 25, 36, 100, 144, 225, 400, 900 and 3600.",
    ],
    solutions: [
      {
        label: "Second method: square roots (slicker)",
        steps: [
          "{{3600 = 60^2}}. A square {{d^2}} divides {{60^2}} exactly when d divides 60, because squaring just doubles every power on both sides.",
          "So the square factors of 3600 match up one-to-one with the factors of 60.",
          "{{60 = 2^2 * 3 * 5}} has (2 + 1)(1 + 1)(1 + 1) = 12 factors, so 3600 has 12 square factors. One small factor count replaces the even-powers bookkeeping.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "counting-factors",
    hints: [
      "Write 3600 as a product of prime factors.",
      "A square number has every power even. Which powers of 2 can a square factor of 3600 use?",
      "Count the choices for each prime and multiply.",
    ],
    strategy: "Count the choices",
  },
  {
    kind: "written",
    id: "factors-multiples-ch-q08",
    question:
      "Always, sometimes or never true?\n\n> If a whole number is divisible by 6 and by 10, then it is divisible by 60.\n\nDecide, giving examples. Then use prime factors to state and justify the correct rule: what number *must* it be divisible by?",
    marks: 4,
    modelAnswer:
      "**Sometimes true.** 60 and 120 are divisible by 6, by 10 and by 60. But 30 is divisible by 6 (30 = 6 × 5) and by 10 (30 = 10 × 3), and it is **not** divisible by 60. So the statement is not always true.\n\nWhy: {{6 = 2 * 3}} and {{10 = 2 * 5}}. A number divisible by 6 contains a 2 and a 3, and a number divisible by 10 contains a 2 and a 5. These can be the **same** 2, so the number only has to contain 2, 3 and 5, not two 2s. But {{60 = 2^2 * 3 * 5}} needs two 2s.\n\n**Correct rule:** a number divisible by 6 and by 10 must be divisible by LCM(6, 10) = 2 × 3 × 5 = **30**, not by 6 × 10 = 60.",
    markScheme: [
      { point: "States 'sometimes', with a counterexample (e.g. 30, 90 or 150 is divisible by 6 and by 10 but not by 60)", keywords: ["sometimes", "30", "90", "150", "210"] },
      { point: "Gives an example where it is true (e.g. 60 or 120)", keywords: ["60", "120", "180"] },
      {
        point: "Prime factor reason: 6 = 2 × 3 and 10 = 2 × 5 share the factor 2, so only one 2 is needed (60 needs two)",
        keywords: ["share", "shared", "same 2", "one 2", "2 × 3", "2 × 5", "common factor"],
      },
      { point: "Correct rule: it must be divisible by LCM(6, 10) = 30", keywords: ["lcm", "30"] },
    ],
    solutions: [
      {
        label: "Second method: list and compare",
        steps: [
          "The numbers divisible by 6 and by 10 are the common multiples of 6 and 10: 30, 60, 90, 120, …",
          "Every second one (60, 120, …) is a multiple of 60, but 30, 90, 150, … are not.",
          "The list is exactly the multiples of 30 = LCM(6, 10). The prime factor argument is slicker because it explains *why* the answer is 30 and not 60.",
        ],
      },
    ],
    commonError: "Multiplying the two divisors (6 × 10 = 60) instead of finding their LCM.",
    difficulty: "challenge",
    guideRef: "hcf-lcm",
    hints: [
      "Try some numbers that are divisible by both 6 and 10. Are they all multiples of 60?",
      "Write 6 and 10 as products of primes. What do they share?",
      "What is the smallest number that is divisible by both 6 and 10? How is it related to all the others?",
    ],
    strategy: "Try small cases",
  },
  {
    kind: "written",
    id: "factors-multiples-ch-q09",
    question:
      "Jun has read Euclid's proof that the primes go on for ever. He claims:\n\n> \"Multiply the first few primes together and add 1. The answer is always a new prime. For example, 2 × 3 + 1 = 7, 2 × 3 × 5 + 1 = 31 and 2 × 3 × 5 × 7 + 1 = 211 are all prime.\"\n\n1. Show that Jun's claim is false, given that {{2 * 3 * 5 * 7 * 11 * 13 + 1 = 30031}} and that 59 is a factor of 30031.\n2. Explain why none of 2, 3, 5, 7, 11 and 13 can be a factor of 30031.\n3. So what does Euclid's argument *actually* prove?",
    marks: 4,
    modelAnswer:
      "1. 30031 ÷ 59 = 509, so 30031 = 59 × 509. It has factors other than 1 and itself, so it is **not prime**, and Jun's claim is false.\n\n2. 30030 = 2 × 3 × 5 × 7 × 11 × 13 is a multiple of each of these primes. So 30031 is 1 more than a multiple of each of them: dividing 30031 by any of them leaves remainder 1. None of them divides it exactly.\n\n3. 30031 still has prime factors (here 59 and 509), and by part 2 they are *not* on the list 2, 3, 5, 7, 11, 13. So 'product plus one' isn't always prime, but its prime factors are always **new primes** that weren't on the list. Whatever finite list of primes you start with, this finds a prime missing from it. So no list can contain every prime, and there is no largest prime: the primes go on for ever.",
    markScheme: [
      { point: "Shows 30031 = 59 × 509, so it is not prime", keywords: ["509", "59 × 509", "59 x 509", "not prime", "composite"] },
      {
        point: "Explains that dividing 30031 by any of 2, 3, 5, 7, 11, 13 leaves remainder 1 (because 30030 is a multiple of each)",
        keywords: ["remainder 1", "remainder of 1", "30030", "one more", "1 more", "leaves 1"],
      },
      {
        point: "Concludes that the prime factors of 30031 are new primes, not on the list",
        keywords: ["new prime", "not on the list", "not in the list", "other primes", "different primes"],
      },
      {
        point: "States what Euclid actually proves: no finite list contains every prime, so there are infinitely many primes (not that the number itself is prime)",
        keywords: ["infinitely", "infinite", "for ever", "forever", "no largest", "never ends"],
      },
    ],
    commonError: "Thinking Euclid's proof says the new number is prime. It only says the new number has a prime factor that wasn't on the list.",
    difficulty: "challenge",
    guideRef: "prime-factorisation",
    hints: [
      "For part 1: what is 30031 ÷ 59?",
      "For part 2: 30030 is a multiple of 2, 3, 5, 7, 11 and 13. What remainder does 30031 leave?",
      "For part 3: 30031 must have *some* prime factors. Could any of them be on Jun's list?",
      "The argument works for *any* finite list of primes. What does that tell you about a list that claims to contain them all?",
    ],
    strategy: "Spot the flaw",
  },
  {
    kind: "written",
    id: "factors-multiples-ch-q10",
    question:
      "Try a few primes bigger than 3: {{5^2 - 1 = 24}}, {{7^2 - 1 = 48}}, {{11^2 - 1 = 120}}. All of them are multiples of 24!\n\nProve that for **every** prime p bigger than 3, {{p^2 - 1}} is a multiple of 24.",
    marks: 4,
    modelAnswer:
      "First, {{p^2 - 1 = (p - 1)(p + 1)}}, because {{(p - 1)(p + 1) = p^2 + p - p - 1}}.\n\n**A factor of 3:** of any three consecutive whole numbers p − 1, p, p + 1, one is a multiple of 3. It isn't p, because p is a prime bigger than 3. So p − 1 or p + 1 is a multiple of 3.\n\n**A factor of 8:** p is odd (it is a prime bigger than 2), so p − 1 and p + 1 are both even. They are consecutive even numbers, so one of them is a multiple of 4. Their product therefore contains 2 × 4 = 8.\n\n**Putting it together:** (p − 1)(p + 1) is a multiple of 3 and a multiple of 8. Since 3 and 8 have no common factor, it is a multiple of 3 × 8 = 24.",
    markScheme: [
      {
        point: "Rewrites p² − 1 as (p − 1)(p + 1)",
        keywords: ["(p - 1)(p + 1)", "(p-1)(p+1)", "(p − 1)(p + 1)", "p - 1", "p − 1"],
      },
      {
        point: "Multiple of 3: one of the three consecutive numbers p − 1, p, p + 1 is a multiple of 3, and it can't be p",
        keywords: ["consecutive", "multiple of 3", "three", "not p"],
      },
      {
        point: "Multiple of 8: p − 1 and p + 1 are consecutive even numbers, one of them a multiple of 4, so the product has a factor of 8",
        keywords: ["even", "multiple of 4", "2 × 4", "consecutive even", "8"],
      },
      { point: "Combines: 3 and 8 share no factor, so the product is a multiple of 24", keywords: ["24", "3 × 8", "no common factor", "coprime", "hcf"] },
    ],
    solutions: [
      {
        label: "Second method: remainders on division by 6",
        steps: [
          "Every whole number is 6m, 6m + 1, 6m + 2, 6m + 3, 6m + 4 or 6m + 5. A prime bigger than 3 can't be 6m, 6m + 2 or 6m + 4 (even) or 6m + 3 (a multiple of 3). So p = 6m + 1 or p = 6m + 5, which is 6(m + 1) − 1. Either way, p is 1 more or 1 less than a multiple of 6.",
          "If p = 6m ± 1, then {{p^2 - 1 = 36m^2 +- 12m = 12m(3m +- 1)}}.",
          "If m is even, 12m is a multiple of 24. If m is odd, 3m is odd, so 3m ± 1 is even. Either way the product is 12 × (an even number), which is a multiple of 24.",
          "This works, but the consecutive-numbers proof is slicker: it needs only one expansion, and it shows exactly where the 3 and the 8 come from.",
        ],
      },
    ],
    commonError: "Checking several primes and stopping there. The examples suggest the pattern; the proof must work for every prime p bigger than 3.",
    difficulty: "challenge",
    guideRef: "factors-multiples-primes",
    hints: [
      "Can you write {{p^2 - 1}} as a product of two brackets?",
      "{{p^2 - 1 = (p - 1)(p + 1)}}. Think about the three consecutive numbers p − 1, p and p + 1. Which one must be a multiple of 3?",
      "p is odd. What does that tell you about p − 1 and p + 1? Can you find a factor of 8, not just 4?",
      "If a number is a multiple of 3 and a multiple of 8, why must it be a multiple of 24?",
    ],
    strategy: "Find a pattern, then prove it",
  },
];

export const practice: TopicPractice = { quiz, papers: [paper1, paper2], challenge };
