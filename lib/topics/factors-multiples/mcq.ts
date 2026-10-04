import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Factors, Multiples & Primes — 4 MCQ papers × 20 questions.
// Sections: factors-multiples-primes · prime-factorisation · hcf-lcm ·
// hcf-lcm-problems · squares-cubes-from-primes · counting-factors (stretch)
// ---------------------------------------------------------------------------

const TREE_180 = `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Factor tree: 180 splits into 10 and 18. 10 splits into 2 and 5. 18 splits into 2 and 9. 9 splits into 3 and 3. The primes 2, 5, 2, 3 and 3 are circled."><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><g stroke="#334155" stroke-width="2"><line x1="152" y1="32" x2="108" y2="60"/><line x1="168" y1="32" x2="212" y2="60"/><line x1="94" y1="82" x2="72" y2="108"/><line x1="106" y1="82" x2="128" y2="108"/><line x1="214" y1="82" x2="192" y2="108"/><line x1="226" y1="82" x2="248" y2="108"/><line x1="249" y1="132" x2="232" y2="158"/><line x1="261" y1="132" x2="278" y2="158"/></g><g fill="#bbf7d0" stroke="#334155" stroke-width="2"><circle cx="65" cy="122" r="14"/><circle cx="135" cy="122" r="14"/><circle cx="185" cy="122" r="14"/><circle cx="225" cy="172" r="14"/><circle cx="285" cy="172" r="14"/></g><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="160" y="27" font-weight="bold">180</text><text x="100" y="77">10</text><text x="220" y="77">18</text><text x="65" y="127">2</text><text x="135" y="127">5</text><text x="185" y="127">2</text><text x="255" y="127">9</text><text x="225" y="177">3</text><text x="285" y="177">3</text></g></svg>`;

const VENN_72_120 = `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors. Only in 72: 3. In both: 2, 2, 2 and 3. Only in 120: 5."><rect x="0" y="0" width="360" height="210" fill="#ffffff"/><circle cx="140" cy="115" r="82" fill="#c7d2fe" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><circle cx="220" cy="115" r="82" fill="#fde68a" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="90" y="24" font-size="15" font-weight="bold">72</text><text x="270" y="24" font-size="15" font-weight="bold">120</text><text x="95" y="120" font-size="15">3</text><text x="168" y="102" font-size="15">2</text><text x="192" y="102" font-size="15">2</text><text x="168" y="137" font-size="15">2</text><text x="192" y="137" font-size="15">3</text><text x="265" y="120" font-size="15">5</text></g></svg>`;

const VENN_A_B = `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors of A and B. Only in A: 2 and 3. In both: 2 and 5. Only in B: 7."><rect x="0" y="0" width="360" height="210" fill="#ffffff"/><circle cx="140" cy="115" r="82" fill="#c7d2fe" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><circle cx="220" cy="115" r="82" fill="#bbf7d0" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="90" y="24" font-size="15" font-weight="bold">A</text><text x="270" y="24" font-size="15" font-weight="bold">B</text><text x="88" y="105" font-size="15">2</text><text x="104" y="142" font-size="15">3</text><text x="180" y="105" font-size="15">2</text><text x="180" y="142" font-size="15">5</text><text x="268" y="122" font-size="15">7</text></g></svg>`;

const VENN_90_168 = `<svg viewBox="0 0 360 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of prime factors. Only in 90: 3 and 5. In both: 2 and 3. Only in 168: 2, 2 and 7."><rect x="0" y="0" width="360" height="210" fill="#ffffff"/><circle cx="140" cy="115" r="82" fill="#bae6fd" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><circle cx="220" cy="115" r="82" fill="#fecaca" fill-opacity="0.6" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="90" y="24" font-size="15" font-weight="bold">90</text><text x="270" y="24" font-size="15" font-weight="bold">168</text><text x="88" y="105" font-size="15">3</text><text x="100" y="142" font-size="15">5</text><text x="180" y="105" font-size="15">2</text><text x="180" y="142" font-size="15">3</text><text x="258" y="102" font-size="15">2</text><text x="284" y="127" font-size="15">2</text><text x="262" y="154" font-size="15">7</text></g></svg>`;

const PATIO = `<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular patio 4.2 metres long and 3 metres wide."><rect x="0" y="0" width="320" height="210" fill="#ffffff"/><rect x="55" y="20" width="224" height="160" fill="#bae6fd" stroke="#334155" stroke-width="2"/><g font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle"><text x="167" y="200">4.2 m</text><text x="30" y="105">3 m</text></g></svg>`;

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "factors-multiples-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "factors-multiples-m1-q01",
        question: "Which list shows **all** the factors of 18?",
        options: ["1, 2, 3, 6, 9, 18", "2, 3, 6, 9", "1, 2, 3, 6, 9", "18, 36, 54, 72"],
        answerIndex: 0,
        explanation:
          "Factors come in pairs that multiply to 18: 1 × 18, 2 × 9 and 3 × 6. So the factors are 1, 2, 3, 6, 9 and 18. The list 2, 3, 6, 9 leaves out 1 and 18 — every number has 1 and itself as factors. The list 18, 36, 54, 72 gives *multiples* of 18, not factors.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Find pairs of whole numbers that multiply to make 18, starting with 1 × 18."],
        strategy: "Work systematically",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q02",
        question: "Which of these numbers is prime?",
        options: ["87", "93", "89", "119"],
        answerIndex: 2,
        explanation:
          "89 is prime: it isn't divisible by 2, 3, 5 or 7, and since 10 × 10 = 100 is bigger than 89 there are no other primes to try. 87 looks prime, but its digit sum is 15, so it is divisible by 3 (87 = 3 × 29). Similarly 93 = 3 × 31, and 119 = 7 × 17. Being odd does not make a number prime.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Use the digit-sum test for 3, and try dividing by 7."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q03",
        question: "Which of these is 60 written as a product of prime factors in index form?",
        options: ["{{2 * 3 * 10}}", "{{2^2 * 3 * 5}}", "{{4 * 3 * 5}}", "{{2^2 * 15}}"],
        answerIndex: 1,
        explanation:
          "60 = 2 × 2 × 3 × 5 = {{2^2 * 3 * 5}}, and every base is prime. The other three also multiply to 60, but each contains a number that is not prime: 10 = 2 × 5, 4 = {{2^2}} and 15 = 3 × 5. A prime factorisation must break down all the way to primes.",
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["Check two things: does it multiply to 60, and is every number in it prime?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q04",
        question: "What is the highest common factor (HCF) of 12 and 18?",
        options: ["3", "36", "216", "6"],
        answerIndex: 3,
        explanation:
          "Factors of 12: 1, 2, 3, 4, 6, 12. Factors of 18: 1, 2, 3, 6, 9, 18. The biggest number in both lists is 6. 3 is a common factor, but not the *highest*. 36 is the lowest common multiple — a multiple, not a factor — and 216 is just 12 × 18.",
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: ["List the factors of each number and find the largest one in both lists."],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q05",
        question:
          "Pencils are sold in packs of 6 and erasers in packs of 8. Mei wants exactly the same number of pencils as erasers. What is the smallest number of pencils she can buy?",
        options: ["14", "24", "48", "2"],
        answerIndex: 1,
        explanation:
          "The number must be a multiple of 6 *and* of 8 — the lowest common multiple. Multiples of 8: 8, 16, 24, and 24 = 4 × 6, so the answer is 24 (4 packs of pencils, 3 packs of erasers). 48 = 6 × 8 also works but is not the smallest. 14 comes from adding 6 + 8, and 2 is the HCF — you can't buy 2 pencils in packs of 6.",
        difficulty: "warmup",
        guideRef: "hcf-lcm-problems",
        hints: ["The total must be in the 6 times table *and* the 8 times table."],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q06",
        question: "Which of these numbers is divisible by 9?",
        options: ["4518", "7129", "5214", "2381"],
        answerIndex: 0,
        explanation:
          "A number is divisible by 9 when its digit sum is a multiple of 9. 4 + 5 + 1 + 8 = 18, so 4518 works (4518 = 9 × 502). 7129 ends in 9, but the last digit doesn't matter for 9: its digit sum is 19. 5214 has digit sum 12, so it is divisible by 3 but not by 9. 2381 ends in 81, a multiple of 9, but its digit sum is 14, so it fails.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Which test works for 9 — the last digits or the digit sum?",
          "Add up the digits of each number.",
          "You need a digit sum of 9, 18, 27, …",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q07",
        question: "Arjun says: \"2334 is divisible by 4 because it is even.\" Which statement is correct?",
        options: [
          "2334 is divisible by 4, because every even number is divisible by 4",
          "2334 is divisible by 4, because its digit sum, 12, is a multiple of 4",
          "2334 is divisible by 4, because it ends in 4",
          "2334 is not divisible by 4, because 34 is not a multiple of 4",
        ],
        answerIndex: 3,
        explanation:
          "The test for 4 uses the **last two digits**, because every hundred is a multiple of 4. 34 ÷ 4 = 8.5, so 2334 is not divisible by 4 (2334 ÷ 4 = 583.5). Arjun's reason fails because even numbers such as 6, 10 and 34 are not multiples of 4. Ending in 4 isn't enough either (14 isn't a multiple of 4), and digit sums only test for 3 and 9.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Is every even number a multiple of 4? Try 6 or 10.",
          "Any number of hundreds is a multiple of 4, so only part of the number matters.",
          "Check whether the last two digits, 34, are divisible by 4.",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q08",
        question: "Hana drew this factor tree for 180. Which is 180 as a product of prime factors in index form?",
        diagram: TREE_180,
        options: ["{{2 * 3^2 * 5}}", "{{2^2 * 3 * 5}}", "{{2^2 * 3^2 * 5}}", "{{2^2 * 9 * 5}}"],
        answerIndex: 2,
        explanation:
          "The circled ends of the branches are the primes: 2, 5, 2, 3, 3. So 180 = 2 × 2 × 3 × 3 × 5 = {{2^2 * 3^2 * 5}} (check: 4 × 9 × 5 = 180). {{2 * 3^2 * 5}} = 90 misses the second 2, and {{2^2 * 3 * 5}} = 60 misses a 3. {{2^2 * 9 * 5}} has the right value, but 9 is not prime — the tree keeps going until every branch ends in a prime.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Only the circled numbers (the primes at the ends of the branches) go in the answer.",
          "Count how many 2s, 3s and 5s there are.",
          "Check that your answer multiplies back to 180.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q09",
        question: "What is the value of {{2^3 * 3 * 5^2}}?",
        options: ["180", "600", "120", "36"],
        answerIndex: 1,
        explanation:
          "{{2^3 = 8}} and {{5^2 = 25}}, so the value is 8 × 3 × 25 = 600 (do 8 × 25 = 200 first, then × 3). 180 comes from treating {{2^3}} as 2 × 3 and {{5^2}} as 5 × 2. 120 forgets to square the 5, and 36 adds 8 + 3 + 25 instead of multiplying.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "A power means repeated multiplication: {{2^3 = 2 * 2 * 2}}.",
          "Work out {{2^3}} and {{5^2}} first.",
          "Look for a friendly pair: 8 × 25 = 200.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q10",
        question: "What is the lowest common multiple (LCM) of 18 and 24?",
        options: ["72", "432", "6", "144"],
        answerIndex: 0,
        explanation:
          "{{18 = 2 * 3^2}} and {{24 = 2^3 * 3}}. The LCM takes the highest power of each prime: {{2^3 * 3^2 = 8 * 9 = 72}}. 144 is a common multiple (18 × 8 and 24 × 6), but not the *lowest*. 432 = 18 × 24 counts the shared factor 6 twice, and 6 is the HCF.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Write each number as a product of primes.",
          "The LCM must contain every prime factor of both numbers — but shared ones only once.",
          "Take the highest power of 2 and the highest power of 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q11",
        question: "The Venn diagram shows the prime factors of 72 and 120. What is the HCF of 72 and 120?",
        diagram: VENN_72_120,
        options: ["360", "15", "24", "8"],
        answerIndex: 2,
        explanation:
          "The HCF is the product of the primes in the overlap — the ones shared by both numbers: 2 × 2 × 2 × 3 = 24. 360 multiplies *everything* in the diagram, which gives the LCM. 15 = 3 × 5 multiplies the parts outside the overlap, and 8 uses only the shared 2s, forgetting the shared 3.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Which region holds the prime factors that belong to *both* numbers?",
          "Multiply all the numbers in the overlap.",
          "There is a 3 in the overlap as well as the 2s.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q12",
        question: "Two numbers have HCF 4 and LCM 120. One of the numbers is 24. What is the other number?",
        options: ["5", "30", "480", "20"],
        answerIndex: 3,
        explanation:
          "For two numbers, HCF × LCM = the product of the numbers. So 4 × 120 = 480 = 24 × the other number, giving 480 ÷ 24 = 20. Check: 20 and 24 have HCF 4 and LCM 120. 480 is the product of the pair, not the missing number. 5 = 120 ÷ 24 and 30 = 120 ÷ 4 come from dividing the LCM without using the rule.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "There is a link between the HCF, the LCM and the two numbers.",
          "HCF × LCM = first number × second number.",
          "Work out 4 × 120, then divide by 24.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q13",
        question: "Which of these problems is solved by finding a **lowest common multiple**?",
        options: [
          "Ribbons of 48 cm and 60 cm are cut into equal pieces, as long as possible, with none left over. How long is each piece?",
          "Two lighthouses flash every 20 seconds and every 30 seconds. They flash together now. When will they next flash together?",
          "36 mangoes and 48 rambutans are packed into identical bags with none left over. What is the greatest number of bags?",
          "A rectangle 18 cm by 24 cm is cut into identical squares, as large as possible. What is the side of each square?",
        ],
        answerIndex: 1,
        explanation:
          "\"Flash together again\" needs a time that is a multiple of 20 *and* of 30 — the LCM, 60 seconds. The ribbons, the mangoes and rambutans, and the rectangle are all about splitting things into equal groups or pieces as large as possible, so the answer must divide both numbers: those are HCF problems (12 cm, 12 bags and 6 cm).",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "In each problem, will the answer be bigger than the numbers given, or smaller?",
          "Splitting into equal pieces means the answer divides both numbers → HCF.",
          "Events repeating until they line up means the answer is a multiple of both → LCM.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q14",
        question:
          "At Jurong East bus interchange, bus service A leaves every 12 minutes and bus service B leaves every 16 minutes. Both leave at 7:00 am. When do they next leave at the same time?",
        options: ["7:48 am", "7:04 am", "7:28 am", "10:12 am"],
        answerIndex: 0,
        explanation:
          "They next leave together after a common multiple of 12 and 16 minutes. Multiples of 16: 16, 32, 48 — and 48 = 4 × 12, so the LCM is 48 minutes, giving 7:48 am. 7:04 am uses the HCF (4). 7:28 am adds 12 + 16. 10:12 am uses 12 × 16 = 192 minutes, which is a common multiple but not the first.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Will the gap be shorter or longer than 16 minutes?",
          "List multiples of 16 until you reach one that is also a multiple of 12.",
          "Add that many minutes to 7:00 am.",
        ],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q15",
        question:
          "For a CCA fair, 120 Year 8 students and 84 Year 7 students are put into groups. Each group has students from one year only, all groups are the same size, and the groups are as large as possible. How many students are in each group?",
        options: ["6", "17", "12", "840"],
        answerIndex: 2,
        explanation:
          "The group size must divide 120 and 84 exactly, and be as large as possible: the HCF. {{120 = 2^3 * 3 * 5}} and {{84 = 2^2 * 3 * 7}}, so HCF = {{2^2 * 3 = 12}}. 6 also divides both, but it isn't the largest. 17 is the number of *groups* (10 + 7), not the group size. 840 is the LCM — far bigger than either year group.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Must the group size divide into 120 and 84, or be a multiple of them?",
          "You want the *largest* number that divides both.",
          "Write 120 and 84 as products of primes and take what they share.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q16",
        question: "Given that {{324 = 2^2 * 3^4}}, what is {{sqrt(324)}}?",
        options: ["162", "6", "36", "18"],
        answerIndex: 3,
        explanation:
          "A square root halves every power: {{sqrt(2^2 * 3^4) = 2^1 * 3^2 = 2 * 9 = 18}}. Check: 18 × 18 = 324. 162 is half of 324 — halving the number is not square-rooting it. 6 = 2 × 3 takes each prime once instead of halving the powers, and 36 = {{2^2 * 3^2}} halves only the power of 3.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "{{sqrt(324)}} times itself makes 324. Can you split the prime factors into two identical groups?",
          "Each group gets half of each power.",
          "Halve each power: {{2^2}} becomes {{2^1}} and {{3^4}} becomes {{3^2}}.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q17",
        question: "{{n = 2^3 * 3 * 5^2}}. What is the smallest whole number you can multiply n by to make a square number?",
        options: ["2", "6", "30", "3"],
        answerIndex: 1,
        explanation:
          "A square number has every prime power even. In n the 5 already has power 2, but {{2^3}} and {{3^1}} are odd. One more 2 and one more 3 fix both: n × 6 = {{2^4 * 3^2 * 5^2 = (2^2 * 3 * 5)^2 = 60^2}}. Multiplying by 2 or by 3 alone leaves one power odd. 30 also brings in an extra 5, making {{5^3}} — odd again.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What is special about the prime factorisation of a square number?",
          "Every power must be even. Which powers in n are odd?",
          "Multiply by just enough to make each odd power one bigger.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q18",
        question: "{{72 = 2^3 * 3^2}}. How many factors does 72 have?",
        options: ["6", "5", "12", "7"],
        answerIndex: 2,
        explanation:
          "Every factor of 72 is {{2^a * 3^b}}, with a = 0, 1, 2 or 3 (4 choices) and b = 0, 1 or 2 (3 choices). So there are 4 × 3 = 12 factors: 1, 2, 3, 4, 6, 8, 9, 12, 18, 24, 36, 72. 6 = 3 × 2 multiplies the powers but forgets the choice of power 0 (which gives factors like 1, 3 and 9). 5 = 3 + 2 and 7 = 4 + 3 add instead of multiplying.",
        difficulty: "challenge",
        guideRef: "counting-factors",
        hints: [
          "Any factor of 72 is made only from 2s and 3s. How many 2s can it have?",
          "It can have 0, 1, 2 or 3 twos, and 0, 1 or 2 threes.",
          "Each choice of twos can pair with each choice of threes — multiply the numbers of choices.",
        ],
        strategy: "Count systematically",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q19",
        question: "Is this statement always, sometimes or never true?\n\n> The sum of two prime numbers is even.",
        options: ["Sometimes true", "Always true", "Never true", "True only when the two primes are the same"],
        answerIndex: 0,
        explanation:
          "Sometimes: 3 + 5 = 8 is even, but 2 + 3 = 5 is odd. Every prime except 2 is odd, and odd + odd is even, so the statement fails exactly when one of the primes is 2. \"Always true\" forgets that 2 is prime. \"True only when the two primes are the same\" is wrong because 3 + 5 = 8 already works with different primes.",
        difficulty: "challenge",
        guideRef: "factors-multiples-primes",
        hints: [
          "Try a few pairs of primes — don't forget the smallest prime.",
          "Which prime is the only even one?",
          "What is odd + odd? What is 2 + odd?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m1-q20",
        question:
          "Three warning lights flash every 4 seconds, 6 seconds and 10 seconds. All three flash together at exactly 9:00:00. How many more times do all three flash together, up to and including 9:05:00?",
        options: ["25", "1", "2", "5"],
        answerIndex: 3,
        explanation:
          "All three flash together at multiples of LCM(4, 6, 10). {{4 = 2^2}}, {{6 = 2 * 3}} and {{10 = 2 * 5}}, so the LCM is {{2^2 * 3 * 5 = 60}} seconds. Five minutes is 300 seconds, and 300 ÷ 60 = 5 (at 9:01, 9:02, 9:03, 9:04 and 9:05). 25 uses only the 4 and the 6 (LCM 12). 1 uses the product 4 × 6 × 10 = 240 seconds. 2 uses 120 seconds, from multiplying LCM(4, 6) = 12 by 10 instead of finding the true LCM.",
        difficulty: "challenge",
        guideRef: "hcf-lcm-problems",
        hints: [
          "When do all three line up? You need a multiple of 4, 6 *and* 10.",
          "Find the LCM of all three numbers using prime factors.",
          "How many of those gaps fit into 5 minutes = 300 seconds?",
        ],
        strategy: "Use prime factors",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "factors-multiples-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "factors-multiples-m2-q01",
        question: "Which statement is true?",
        options: ["35 is a factor of 7", "7 is a multiple of 35", "1 is a prime factor of 35", "7 is a factor of 35"],
        answerIndex: 3,
        explanation:
          "35 = 5 × 7, so 7 divides 35 exactly: 7 is a factor of 35 (and 35 is a multiple of 7). \"35 is a factor of 7\" and \"7 is a multiple of 35\" swap the words round — the factor is the number that divides in. 1 is a factor of 35, but not a *prime* factor, because 1 is not prime.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["A factor divides into a number exactly; a multiple is in its times table."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q02",
        question: "Mei says: \"1 is a prime number, because it can only be divided by 1 and itself.\" Why is Mei wrong?",
        options: [
          "1 is a factor of every number, so 1 is composite",
          "A prime has exactly two different factors, but 1 has only one",
          "She isn't wrong: 1 is the smallest prime number",
          "Prime numbers must be greater than 2",
        ],
        answerIndex: 1,
        explanation:
          "A prime number has **exactly two** different factors: 1 and itself. For 1, \"1 and itself\" are the same number, so 1 has only one factor and is not prime. 1 is not composite either — composite numbers have more than two factors. And 2 is prime (factors 1 and 2), so \"greater than 2\" is false: the smallest prime is 2.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["How many different factors does 1 have? How many does 7 have?"],
        strategy: "Use the definition",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q03",
        question: "Which of these is the prime factorisation of 42?",
        options: ["{{2 * 3 * 7}}", "{{6 * 7}}", "{{1 * 2 * 3 * 7}}", "{{2 * 21}}"],
        answerIndex: 0,
        explanation:
          "42 = 2 × 21 = 2 × 3 × 7, and 2, 3 and 7 are all prime. {{6 * 7}} and {{2 * 21}} equal 42, but 6 and 21 are not prime. {{1 * 2 * 3 * 7}} includes 1, which is not prime, so it never appears in a prime factorisation.",
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["Every number in the product must be prime — and 1 is not prime."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q04",
        question: "Ravi lists multiples to find the LCM of 9 and 15. What is the LCM?",
        options: ["135", "3", "45", "90"],
        answerIndex: 2,
        explanation:
          "Multiples of 15: 15, 30, 45 — and 45 = 5 × 9, so the LCM is 45. 90 is a common multiple, but not the lowest. 135 = 9 × 15 is too big because 9 and 15 share the factor 3. 3 is the HCF.",
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: ["List multiples of the bigger number, 15, and stop at the first one that 9 divides."],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q05",
        question: "Which of these numbers is a cube number?",
        options: ["{{2^2 * 5^2}}", "{{2^3 * 5}}", "{{2^3 * 5^3}}", "{{2^3 + 5^3}}"],
        answerIndex: 2,
        explanation:
          "{{2^3 * 5^3 = (2 * 5)^3 = 10^3 = 1000}}: every power is 3, so the factors split into three identical groups. {{2^2 * 5^2}} = 100 is a square, not a cube. {{2^3 * 5}} = 40 has a lone 5. {{2^3 + 5^3}} = 8 + 125 = 133 adds the cubes instead of multiplying, and 133 lies between {{5^3 = 125}} and {{6^3 = 216}}, so it isn't a cube.",
        difficulty: "warmup",
        guideRef: "squares-cubes-from-primes",
        hints: ["A cube number splits into three identical groups of prime factors."],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q06",
        question: "The digits of a whole number add up to 21. Which of these **must** be true?",
        options: [
          "It is divisible by 9",
          "It is divisible by 3, but not by 9",
          "It is divisible by 6",
          "It is divisible by 7",
        ],
        answerIndex: 1,
        explanation:
          "The digit sum tells you about 3 and 9 only. 21 is a multiple of 3 but not of 9, so the number is divisible by 3 and not by 9 — for example 993 = 3 × 331. Divisibility by 6 also needs the number to be even, and 993 is odd. 21 being a multiple of 7 tells you nothing about the number itself: 993 ÷ 7 = 141.85…, not a whole number.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Which divisibility tests use the digit sum?",
          "Is 21 a multiple of 3? Of 9?",
          "To rule out the others, find one number with digit sum 21 that fails them — 993 is a good one to try.",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q07",
        question: "The four-digit number 52□8 is divisible by 9. What digit goes in the box?",
        options: ["0", "6", "9", "3"],
        answerIndex: 3,
        explanation:
          "For 9, the digit sum must be a multiple of 9. 5 + 2 + 8 = 15, so the missing digit must bring the total to 18: it is 3, giving 5238 = 9 × 582. 0 and 6 give digit sums 15 and 21 — multiples of 3, so those numbers are divisible by 3 but not by 9. Putting 9 in the box gives a digit sum of 24, which is not a multiple of 9.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Use the digit-sum test for 9.",
          "Add the digits you know: 5 + 2 + 8.",
          "What is the next multiple of 9 after 15?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q08",
        question:
          "Wei Ling and Jun both find the prime factorisation of 120. Wei Ling's factor tree starts {{120 = 4 * 30}}. Jun's starts {{120 = 10 * 12}}. What happens when they finish?",
        options: [
          "They both get {{2^3 * 3 * 5}}",
          "They get different answers, and both are correct",
          "Wei Ling gets more 2s, because she started with 4 = 2 × 2",
          "Jun's tree is wrong, because a factor tree must start with the smallest prime",
        ],
        answerIndex: 0,
        explanation:
          "Every whole number greater than 1 has exactly **one** prime factorisation (apart from the order). Wei Ling: 4 × 30 = 2 × 2 × 2 × 3 × 5. Jun: 10 × 12 = 2 × 5 × 2 × 2 × 3. Both give {{2^3 * 3 * 5}}. Starting with 4 doesn't create extra 2s — the 2s just turn up on different branches. Any factor pair is a fine place to start a tree.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Finish both trees yourself.",
          "Count the 2s, 3s and 5s in each.",
          "Could a number really have two different prime factorisations?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q09",
        question:
          "Marcus uses the ladder method on 90:\n\n| Divide by | Result |\n|---|---|\n| 2 | 45 |\n| 3 | 15 |\n| 5 | 3 |\n\nHe writes {{90 = 2 * 3 * 5}}. What was his mistake?",
        options: [
          "There is no mistake: 2, 3 and 5 are all prime",
          "He should have divided by 9, giving {{90 = 2 * 5 * 9}}",
          "He stopped at 3 instead of 1, so he lost a factor of 3: {{90 = 2 * 3^2 * 5}}",
          "He should have started with 10, giving {{90 = 10 * 3^2}}",
        ],
        answerIndex: 2,
        explanation:
          "A ladder only ends when the result is 1. The last result, 3, is prime, so it must be divided out too: 90 = 2 × 3 × 3 × 5 = {{2 * 3^2 * 5}}. Quick check: 2 × 3 × 5 = 30, not 90, so \"no mistake\" can't be right. {{2 * 5 * 9}} and {{10 * 3^2}} both equal 90, but 9 and 10 are not prime.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Multiply out Marcus's answer. Do you get 90?",
          "Look at the last number in the Result column. Is the ladder finished?",
          "Keep dividing until the result is 1.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q10",
        question: "{{432 = 2^4 * 3^3}}. Which of these is **not** a factor of 432?",
        options: ["48", "24", "54", "81"],
        answerIndex: 3,
        explanation:
          "A factor of {{2^4 * 3^3}} can use at most four 2s and at most three 3s. {{81 = 3^4}} needs four 3s, so it is not a factor (432 ÷ 81 = 5.33…). The others fit: {{48 = 2^4 * 3}}, {{24 = 2^3 * 3}} and {{54 = 2 * 3^3}}. 54 may look unlikely, but it uses exactly the three 3s available: 432 ÷ 54 = 8.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "A factor can only use primes that 432 has — and no more of each than 432 has.",
          "Write each option as a product of primes.",
          "Compare the power of 3 in each option with {{3^3}}.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q11",
        question: "Priya says: \"The LCM of 6 and 8 is 48, because 6 × 8 = 48.\" What is wrong with her reasoning?",
        options: [
          "48 is a common multiple, but 24 is smaller, so the LCM is 24",
          "Nothing — the LCM of two numbers is always their product",
          "The LCM is 2, the largest number that divides both",
          "The LCM is 14, because you add the numbers",
        ],
        answerIndex: 0,
        explanation:
          "6 × 8 is always a common multiple, but not always the *lowest*. Multiples of 8: 8, 16, 24 — and 24 = 4 × 6, so the LCM is 24. The product counts the shared factor 2 twice. 2 is the HCF (the largest common *factor*), not a multiple, and 14 is not a multiple of either number.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "List the multiples of 8. Which is the first one that 6 divides?",
          "Is 48 the first number in both times tables?",
          "6 and 8 share a factor of 2 — what does that do to the product?",
        ],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q12",
        question:
          "Siti draws a Venn diagram of the prime factors of {{60 = 2^2 * 3 * 5}} and {{84 = 2^2 * 3 * 7}}. Which numbers go in the overlap?",
        options: ["2, 3", "2, 2, 3", "5, 7", "2, 2, 3, 5, 7"],
        answerIndex: 1,
        explanation:
          "The overlap holds the prime factors the two numbers *share*, counting repeats: both have two 2s and one 3, so the overlap is 2, 2, 3 (and the HCF is 12). Writing just 2, 3 loses one of the shared 2s. 5 and 7 go outside the overlap, one in each circle. 2, 2, 3, 5, 7 is the whole diagram — multiplying those gives the LCM, 420.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "The overlap is for prime factors that belong to *both* numbers.",
          "How many 2s do 60 and 84 each have? They share that many.",
          "5 belongs only to 60, and 7 only to 84.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q13",
        question:
          "For a class barbecue, veggie patties come in packs of 10 and burger buns in packs of 8. Aisha wants exactly one bun for every patty, with nothing left over. What is the smallest number of packs of **buns** she can buy?",
        options: ["4", "40", "5", "80"],
        answerIndex: 2,
        explanation:
          "The number of patties must be a multiple of 10 and of 8. Multiples of 10: 10, 20, 30, 40, and 40 = 5 × 8, so the LCM is 40. 40 buns means 40 ÷ 8 = 5 packs of buns. 4 is the number of packs of *patties* (40 ÷ 10). 40 is the number of buns, not packs, and 80 = 10 × 8 is a common multiple that isn't the smallest.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "First find the smallest number of patties that works for both pack sizes.",
          "That number is the LCM of 10 and 8.",
          "Read the question again: it asks for packs of buns.",
        ],
        strategy: "Read the question carefully",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q14",
        question:
          "Zara swims every 4 days and Jun swims every 6 days. They both swim on 1 March. On what date do they next swim on the same day?",
        options: ["3 March", "25 March", "12 March", "13 March"],
        answerIndex: 3,
        explanation:
          "They swim on the same day again after LCM(4, 6) = 12 days, and 12 days after 1 March is 13 March. 12 March is an off-by-one slip: it counts 1 March itself as the first of the 12 days. 3 March uses the HCF (2 days), but Zara doesn't swim then. 25 March uses 4 × 6 = 24 days, a common multiple but not the first.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "How many days until they both swim again? It must be a multiple of 4 and of 6.",
          "LCM(4, 6) = 12.",
          "Add 12 days to 1 March — careful with the counting.",
        ],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q15",
        question: "Which of these numbers is a square number?",
        options: ["{{2^2 * 3^4 * 7^2}}", "{{2^4 * 3^2 * 5}}", "{{2^3 * 3^2}}", "{{2^5 * 3^5}}"],
        answerIndex: 0,
        explanation:
          "A number is a square exactly when every power in its prime factorisation is even, because then the factors split into two identical halves: {{2^2 * 3^4 * 7^2 = (2 * 3^2 * 7)^2 = 126^2}}. {{2^4 * 3^2 * 5}} has a lone 5, and {{2^3 * 3^2}} has an odd power of 2. {{2^5 * 3^5}} has matching powers, but they are odd, so it isn't a square either.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What must be true about the powers for the factors to split into two equal groups?",
          "Look for any prime with an odd power.",
          "Only one option has every power even.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q16",
        question: "Given that {{1728 = 2^6 * 3^3}}, what is {{cbrt(1728)}}?",
        options: ["576", "12", "24", "4"],
        answerIndex: 1,
        explanation:
          "A cube root splits the factors into three identical groups, so divide every power by 3: {{cbrt(2^6 * 3^3) = 2^2 * 3 = 12}}. Check: 12 × 12 × 12 = 1728. 576 is 1728 ÷ 3 — dividing the number by 3, not the powers. 24 = {{2^3 * 3}} halves the power of 2, as if it were a square root. 4 = {{2^2}} forgets the 3.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "{{cbrt(1728)}} is the number that, used three times in a multiplication, gives 1728.",
          "Split the prime factors into three equal groups.",
          "Divide each power by 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q17",
        question:
          "Ethan wants to know whether 221 is prime, so he tries dividing it by the primes in order: 2, 3, 5, 7, … What is the largest prime he needs to try before he can be sure?",
        options: ["109", "11", "13", "17"],
        answerIndex: 2,
        explanation:
          "Factors come in pairs, and in every pair one factor is at most {{sqrt(221)}}. Since 14 × 14 = 196 and 15 × 15 = 225, {{sqrt(221)}} is between 14 and 15, so testing primes up to 13 is enough. In fact 221 = 13 × 17, so 13 shows it is not prime. Stopping at 11 would wrongly call 221 prime. 17 is the partner of 13, which you would already have found. 109 comes from testing up to half of 221 — far more work than needed.",
        difficulty: "challenge",
        guideRef: "factors-multiples-primes",
        hints: [
          "If 221 = a × b, can both a and b be bigger than 15?",
          "Estimate {{sqrt(221)}} using square numbers you know.",
          "You need every prime up to {{sqrt(221)}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q18",
        question: "Is this statement always, sometimes or never true?\n\n> The LCM of two different whole numbers is their product.",
        options: [
          "Always true",
          "Never true",
          "Sometimes true — only when both numbers are prime",
          "Sometimes true — exactly when the numbers have no common factor except 1",
        ],
        answerIndex: 3,
        explanation:
          "LCM(4, 9) = 36 = 4 × 9, but LCM(4, 6) = 12, not 24. Since HCF × LCM = product, the LCM equals the product exactly when the HCF is 1 — when the numbers share no prime factor, so nothing is counted twice. \"Only when both numbers are prime\" is too narrow: 8 and 9 aren't prime, yet LCM(8, 9) = 72 = 8 × 9.",
        difficulty: "challenge",
        guideRef: "hcf-lcm",
        hints: [
          "Test a few pairs: 4 and 9, then 4 and 6.",
          "When does the product count a shared factor twice?",
          "Use HCF × LCM = product of the numbers. When is the LCM equal to the product?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q19",
        question: "Exactly one of these numbers has an **odd** number of factors. Which one?",
        options: ["144", "45", "27", "98"],
        answerIndex: 0,
        explanation:
          "Factors pair up: a × b = n. A factor is left without a different partner only when a × a = n, which happens only for square numbers. 144 = 12 × 12, so 12 is unpaired and 144 has 15 factors. 45 is odd but has 6 factors (1, 3, 5, 9, 15, 45) — an odd number isn't the same as an odd number of factors. 27 = {{3^3}} is a cube, not a square, with 4 factors. 98 = 2 × 49 contains a square but isn't one: it has 6 factors.",
        difficulty: "challenge",
        guideRef: "counting-factors",
        hints: [
          "Factors come in pairs that multiply to the number. When could a factor be left without a partner?",
          "A factor pairs with itself when a × a = the number.",
          "Which option is a square number?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m2-q20",
        question:
          "Hana has three ribbons, 72 cm, 96 cm and 120 cm long. She cuts them all into pieces of the same length, as long as possible, with nothing wasted. How many pieces does she get altogether?",
        options: ["24", "12", "48", "288"],
        answerIndex: 1,
        explanation:
          "The piece length must divide 72, 96 and 120 and be as large as possible: the HCF. {{72 = 2^3 * 3^2}}, {{96 = 2^5 * 3}} and {{120 = 2^3 * 3 * 5}}, so the HCF is {{2^3 * 3 = 24}} cm. Pieces: 72 ÷ 24 + 96 ÷ 24 + 120 ÷ 24 = 3 + 4 + 5 = 12. 24 is the length of each piece, not the number of pieces. 48 comes from cutting 6 cm pieces, which are not the longest possible. 288 is the total length in centimetres.",
        difficulty: "challenge",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Is this an HCF or an LCM problem? Will each piece be shorter or longer than the ribbons?",
          "Find the HCF of all three lengths using prime factors.",
          "Then count how many pieces each ribbon makes.",
        ],
        strategy: "Use prime factors",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "factors-multiples-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "factors-multiples-m3-q01",
        question: "Which of these numbers is a multiple of both 6 and 15?",
        options: ["45", "90", "36", "21"],
        answerIndex: 1,
        explanation:
          "90 ÷ 6 = 15 and 90 ÷ 15 = 6, so 90 is in both times tables. (The common multiples of 6 and 15 are the multiples of their LCM, 30: 30, 60, 90, …) 45 is a multiple of 15, but it is odd, so 6 doesn't divide it. 36 is a multiple of 6 only, and 21 = 6 + 15 just adds the numbers.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Check each number: does 6 divide it? Does 15 divide it?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q02",
        question: "How many prime numbers are there between 20 and 40?",
        options: ["10", "5", "3", "4"],
        answerIndex: 3,
        explanation:
          "Only odd numbers can be prime here. Rule out 21 = 3 × 7, 25 = 5 × 5, 27 = 3 × 9, 33 = 3 × 11, 35 = 5 × 7 and 39 = 3 × 13. That leaves 23, 29, 31 and 37: four primes. 10 counts every odd number, as if odd meant prime. 5 usually means 27 or 39 slipped through — both are multiples of 3. 3 means one prime was missed.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Only odd numbers can be prime here. Test each one for 3, 5 and 7."],
        strategy: "Work systematically",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q03",
        question: "Write {{2 * 2 * 2 * 3 * 3 * 5 * 5 * 5 * 5}} in index form.",
        options: ["{{2 * 3 * 5^9}}", "{{3^2 * 2^3 * 4^5}}", "{{2^3 * 3^2 * 5^4}}", "{{2^3 + 3^2 + 5^4}}"],
        answerIndex: 2,
        explanation:
          "Count each prime: three 2s, two 3s and four 5s, so the answer is {{2^3 * 3^2 * 5^4}}. {{4^5}} swaps the base and the power — four 5s is {{5^4}}. {{2 * 3 * 5^9}} piles all the powers (3 + 2 + 4 = 9) onto one prime, and {{2^3 + 3^2 + 5^4}} adds where it should multiply.",
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["The power tells you how many times that prime is multiplied."],
        strategy: "Count systematically",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q04",
        question: "Which of these is a common factor of 24 and 40?",
        options: ["8", "6", "5", "120"],
        answerIndex: 0,
        explanation:
          "24 = 8 × 3 and 40 = 8 × 5, so 8 divides both (in fact it is their HCF). 6 divides 24 but not 40, and 5 divides 40 but not 24. 120 is the LCM — a common *multiple*, not a factor.",
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: ["A common factor must divide exactly into both numbers."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q05",
        question: "Which of these numbers has **exactly three** factors?",
        options: ["15", "3", "16", "49"],
        answerIndex: 3,
        explanation:
          "49 has the factors 1, 7 and 49 — exactly three. (The square of a prime always does.) 15 has four factors: 1, 3, 5, 15. 3 is prime, so it has exactly two. 16 is a square too, but it has five factors: 1, 2, 4, 8, 16.",
        difficulty: "warmup",
        guideRef: "counting-factors",
        hints: ["List the factors of each number in pairs."],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q06",
        question: "Which of these numbers is divisible by 8?",
        options: ["3148", "3548", "3136", "2060"],
        answerIndex: 2,
        explanation:
          "For 8, test the **last three digits**, because 1000 is a multiple of 8. 136 = 8 × 17, so 3136 is divisible by 8 (3136 = 8 × 392). 3148 passes a last-*two*-digits test (48 is a multiple of 8), but that test only works for 4: 148 ÷ 8 = 18.5. 3548 ends in 8, which isn't enough. 2060 has digit sum 8, but digit sums only work for 3 and 9.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Which part of a number decides whether 8 divides it?",
          "1000 is a multiple of 8, so look at the last three digits.",
          "Halve the last three digits three times — do you stay whole?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q07",
        question: "How many **factor pairs** does 48 have? (2 × 24 and 24 × 2 count as the same pair.)",
        options: ["5", "10", "4", "6"],
        answerIndex: 0,
        explanation:
          "Work up from 1: 1 × 48, 2 × 24, 3 × 16, 4 × 12, 6 × 8. 5 and 7 don't divide 48, and after that the pairs repeat (8 × 6), so there are 5 pairs. 10 is the number of *factors*, not pairs. 4 forgets the pair 1 × 48. 6 usually means a pair was counted twice, such as 6 × 8 and 8 × 6.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Start at 1 × 48 and work upwards.",
          "When can you stop checking?",
          "Once the smaller number passes {{sqrt(48)}}, which is about 6.9, the pairs repeat.",
        ],
        strategy: "Work systematically",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q08",
        question: "Kai writes {{96 = 2^4 * 6}}. What is the correct prime factorisation of 96?",
        options: ["{{2^4 * 3}}", "{{2^5 * 3}}", "{{2^4 * 6}}", "{{2^6 * 3}}"],
        answerIndex: 1,
        explanation:
          "6 is not prime: 6 = 2 × 3. That adds one more 2, so 96 = {{2^4 * 2 * 3 = 2^5 * 3}} (32 × 3 = 96). {{2^4 * 3}} = 48 drops the 2 hidden inside the 6. {{2^4 * 6}} equals 96 but is not a *prime* factorisation. {{2^6 * 3}} = 192 adds two extra 2s instead of one.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "Is every number in Kai's answer prime?",
          "Split 6 into primes.",
          "Combine all the 2s into a single power.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q09",
        question: "The Venn diagram shows the prime factors of two numbers, A and B. What are A and B?",
        diagram: VENN_A_B,
        options: ["6 and 7", "10 and 420", "60 and 420", "60 and 70"],
        answerIndex: 3,
        explanation:
          "Each number is the product of *everything inside its own circle*, including the overlap. A = 2 × 3 × 2 × 5 = 60 and B = 2 × 5 × 7 = 70. \"6 and 7\" ignores the overlap. 10 and 420 are the HCF (the overlap only) and the LCM (the whole diagram) — useful, but not the numbers themselves. \"60 and 420\" gets A right but multiplies the whole diagram for B.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Which regions are inside circle A?",
          "The overlap belongs to *both* circles.",
          "Multiply all the primes inside each circle.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q10",
        question: "What is the HCF of {{2^3 * 3^2 * 5}} and {{2^2 * 3^3 * 7}}?",
        options: ["{{2^3 * 3^3}}", "{{2^2 * 3^2}}", "{{2^3 * 3^3 * 5 * 7}}", "{{2 * 3}}"],
        answerIndex: 1,
        explanation:
          "The HCF uses only the primes both numbers share, each with the **lower** power: {{2^2}} and {{3^2}}, so the HCF is {{2^2 * 3^2 = 36}}. 5 and 7 appear in only one number, so they are left out. {{2^3 * 3^3}} takes the higher powers (that's how you build an LCM). {{2^3 * 3^3 * 5 * 7}} *is* the LCM, and {{2 * 3}} uses each shared prime only once.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Which primes appear in both numbers?",
          "A common factor can't use more 2s than the number with fewer 2s.",
          "Take the lower power of each shared prime.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q11",
        question: "What is the HCF of 24, 36 and 60?",
        options: ["6", "360", "12", "2"],
        answerIndex: 2,
        explanation:
          "{{24 = 2^3 * 3}}, {{36 = 2^2 * 3^2}} and {{60 = 2^2 * 3 * 5}}. All three share {{2^2}} and one 3, so the HCF is {{2^2 * 3 = 12}}. 6 divides all three but isn't the highest. 360 is the LCM of the three numbers. 2 uses only the prime 2, once, and forgets the shared 3.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Write all three numbers as products of primes.",
          "Which primes are in all three, and how many of each?",
          "Take the lowest power of each prime that all three share.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q12",
        question:
          "The table shows the first few departures of two ferries from Tanah Merah ferry terminal.\n\n| Ferry | 1st | 2nd | 3rd | 4th |\n|---|---|---|---|---|\n| A | 07:00 | 07:25 | 07:50 | 08:15 |\n| B | 07:00 | 07:40 | 08:20 | 09:00 |\n\nThe pattern continues all day. When do the two ferries next leave at the same time after 07:00?",
        options: ["10:20", "07:05", "08:05", "23:40"],
        answerIndex: 0,
        explanation:
          "From the table, ferry A leaves every 25 minutes and ferry B every 40 minutes. They line up after LCM(25, 40): {{25 = 5^2}} and {{40 = 2^3 * 5}}, so the LCM is {{2^3 * 5^2 = 200}} minutes = 3 hours 20 minutes, giving 10:20. 07:05 uses the HCF (5 minutes). 08:05 adds 25 + 40. 23:40 uses 25 × 40 = 1000 minutes, a common multiple but not the first.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "First read off how often each ferry leaves.",
          "You need a time that is a multiple of both gaps — the LCM.",
          "Convert the LCM from minutes into hours and minutes.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q13",
        question:
          "Two gear wheels mesh together. Gear P has 12 teeth and gear Q has 20 teeth. A marked tooth on each gear is touching. How many complete turns does gear **P** make before the two marks touch again for the first time?",
        options: ["3", "60", "20", "5"],
        answerIndex: 3,
        explanation:
          "Each time one tooth passes, both gears move on by one tooth. The marks meet again after a number of teeth that is a multiple of 12 and of 20: LCM(12, 20) = 60 teeth. Gear P turns 60 ÷ 12 = 5 times (and gear Q turns 60 ÷ 20 = 3 times). 3 is gear Q's number of turns. 60 is the number of teeth that pass, not turns. 20 comes from 12 × 20 ÷ 12 — using the product instead of the LCM.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "After one full turn of P, how many teeth have passed the meeting point?",
          "Both marks are back when the number of teeth passed is a multiple of 12 *and* of 20.",
          "Find LCM(12, 20), then divide by 12.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q14",
        question:
          "Ethan has 45 roses and 75 lilies. He makes identical bouquets, using every flower. Which of these could **not** be the number of bouquets?",
        options: ["15", "25", "5", "3"],
        answerIndex: 1,
        explanation:
          "The number of bouquets must divide both 45 and 75 — it must be a common factor. The common factors are 1, 3, 5 and 15 (the factors of the HCF, 15). 25 divides 75 but not 45 (45 ÷ 25 = 1.8), so 25 bouquets is impossible. 15 is the largest possible number (3 roses and 5 lilies in each), and 5 and 3 work too.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "If there are b bouquets, b must divide 45 and b must divide 75.",
          "List the common factors of 45 and 75.",
          "Check each option against *both* numbers.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q15",
        question: "Use prime factors to find {{sqrt(784)}}.",
        options: ["28", "392", "14", "196"],
        answerIndex: 0,
        explanation:
          "Halving repeatedly: 784 → 392 → 196 → 98 → 49, so {{784 = 2^4 * 7^2}}. Halve each power: {{sqrt(784) = 2^2 * 7 = 28}}, and 28 × 28 = 784. 392 is half of 784. 14 = 2 × 7 takes each prime once instead of halving the powers. 196 is a quarter of 784 — it is {{14^2}}, a square, not the square root.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Divide 784 by 2 repeatedly.",
          "You should reach {{784 = 2^4 * 7^2}}.",
          "Halve each power, then multiply out.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q16",
        question: "{{108 = 2^2 * 3^3}}. Which statement about {{sqrt(108)}} is true?",
        options: [
          "It equals 54, which is half of 108",
          "It equals 18, from halving the powers to get {{2 * 3^2}}",
          "It is not a whole number, because the power of 3 is odd; it lies between 10 and 11",
          "It equals 6, from taking each prime once: 2 × 3",
        ],
        answerIndex: 2,
        explanation:
          "108 would be a square only if every power were even, and {{3^3}} has an odd power, so {{sqrt(108)}} is not a whole number. Since 10 × 10 = 100 and 11 × 11 = 121, it lies between 10 and 11. 18 rounds the power {{3/2}} up to 2 — but 18 × 18 = 324, not 108. 54 halves the number, and 6 × 6 = 36.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Is 108 a square number? Look at the powers.",
          "If it isn't a square, estimate using nearby squares.",
          "Which square numbers are either side of 108?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q17",
        question: "How many zeros are at the end of the number {{2^5 * 3 * 5^3}} when it is written out in full?",
        options: ["5", "8", "2", "3"],
        answerIndex: 3,
        explanation:
          "Each zero at the end needs a factor of 10 = 2 × 5. There are only three 5s, so you can make three 10s: {{2^5 * 3 * 5^3 = 2^2 * 3 * (2 * 5)^3 = 12 * 1000 = 12000}}. Three zeros. 5 counts the 2s, but each 2 needs a 5 partner to make a 10. 8 adds the powers 5 + 3, and 2 subtracts them.",
        difficulty: "challenge",
        guideRef: "prime-factorisation",
        hints: [
          "What must be a factor of a number for it to end in 0? In 00?",
          "Each zero needs a 10 = 2 × 5.",
          "How many complete (2, 5) pairs can you make?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q18",
        question: "{{1350 = 2 * 3^3 * 5^2}}. What is the smallest whole number you can **divide** 1350 by to get a square number?",
        options: ["2", "6", "54", "3"],
        answerIndex: 1,
        explanation:
          "For a square, every power must be even. Here {{2^1}} and {{3^3}} are odd. Dividing by 2 × 3 = 6 removes one 2 and one 3, leaving {{3^2 * 5^2 = 225 = 15^2}}. Dividing by 2 alone leaves {{3^3}}, and dividing by 3 alone leaves {{2^1}}. Dividing by 54 = {{2 * 3^3}} also leaves a square (25), but 54 isn't the *smallest* divisor that works.",
        difficulty: "challenge",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "Which powers are odd?",
          "Dividing removes prime factors — remove as few as possible.",
          "Remove one 2 and one 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q19",
        question:
          "When 75 is divided by a whole number n, the remainder is 3. When 111 is divided by the same n, the remainder is also 3. What is the **largest** possible value of n?",
        options: ["3", "12", "36", "216"],
        answerIndex: 2,
        explanation:
          "If both leave remainder 3, then n divides 75 − 3 = 72 and 111 − 3 = 108 exactly. The largest such n is HCF(72, 108) = 36. Check: 75 = 2 × 36 + 3 and 111 = 3 × 36 + 3. 3 is HCF(75, 111) — that forgets to remove the remainders first. 12 divides 72 and 108 but isn't the largest, and 216 is LCM(72, 108).",
        difficulty: "challenge",
        guideRef: "hcf-lcm-problems",
        hints: [
          "What can you subtract from 75 and 111 so that n divides them exactly?",
          "n must divide 72 and 108.",
          "The largest number dividing both is their HCF.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m3-q20",
        question:
          "Take any three consecutive whole numbers (starting from 1 or more) and multiply them, for example 4 × 5 × 6 = 120. What is the **largest** number that always divides the product?",
        options: ["6", "3", "24", "120"],
        answerIndex: 0,
        explanation:
          "In any three consecutive numbers at least one is even and exactly one is a multiple of 3, so the product is always divisible by 2 × 3 = 6. Nothing bigger always works, because 1 × 2 × 3 = 6 itself. 3 always divides the product too, but it isn't the largest. 24 divides 2 × 3 × 4 = 24 and 4 × 5 × 6 = 120, but not 1 × 2 × 3 = 6. 120 is just one example product.",
        difficulty: "challenge",
        guideRef: "factors-multiples-primes",
        hints: [
          "Try several cases: 1 × 2 × 3, 2 × 3 × 4, 3 × 4 × 5, …",
          "Among three consecutive numbers, what must you have? Think about even numbers and multiples of 3.",
          "Look at the smallest possible product — anything that always divides must divide that too.",
        ],
        strategy: "Consider extremes",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 4
  // =========================================================================
  {
    id: "factors-multiples-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "factors-multiples-m4-q01",
        question: "Which of these numbers is **neither** prime nor composite?",
        options: ["2", "51", "1", "9"],
        answerIndex: 2,
        explanation:
          "A prime has exactly two factors and a composite number has more than two. 1 has only one factor, so it is neither. 2 is prime (factors 1 and 2), even though it is even. 51 looks prime, but 51 = 3 × 17, so it is composite, and 9 = 3 × 3 is composite too.",
        difficulty: "warmup",
        guideRef: "factors-multiples-primes",
        hints: ["Count the factors of each number."],
        strategy: "Use the definition",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q02",
        question: "Which is 1000 written as a product of prime factors?",
        options: ["{{2^3 * 5^3}}", "{{10^3}}", "{{2 * 5^3}}", "{{2^3 + 5^3}}"],
        answerIndex: 0,
        explanation:
          "1000 = 10 × 10 × 10 and each 10 = 2 × 5, so 1000 = {{2^3 * 5^3}}. {{10^3}} has the right value, but 10 is not prime. {{2 * 5^3}} = 250, and {{2^3 + 5^3}} = 8 + 125 = 133 adds instead of multiplying.",
        difficulty: "warmup",
        guideRef: "prime-factorisation",
        hints: ["Start from 1000 = 10 × 10 × 10 and split each 10 into primes."],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q03",
        question: "What is the HCF of 8 and 24?",
        options: ["4", "24", "192", "8"],
        answerIndex: 3,
        explanation:
          "8 divides 24 exactly (24 = 3 × 8), and nothing bigger than 8 can divide 8, so the HCF is 8. When one number is a factor of the other, the smaller number is the HCF. 4 is a common factor, but not the highest. 24 is the LCM, and 192 = 8 × 24 is the product.",
        difficulty: "warmup",
        guideRef: "hcf-lcm",
        hints: ["Does 8 divide into 24?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q04",
        question:
          "Siti has 24 red beads and 36 blue beads. She makes identical bracelets, using every bead. What is the greatest number of bracelets she can make?",
        options: ["72", "12", "6", "60"],
        answerIndex: 1,
        explanation:
          "The number of bracelets must divide both 24 and 36, and be as large as possible: HCF(24, 36) = 12. Each bracelet then has 2 red and 3 blue beads. 6 also works, but it isn't the greatest. 72 is the LCM, and 60 = 24 + 36 is the total number of beads.",
        difficulty: "warmup",
        guideRef: "hcf-lcm-problems",
        hints: ["Each colour is shared equally between the bracelets, so the number of bracelets divides both 24 and 36."],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q05",
        question:
          "In the prime factorisation of a whole number, **every** power is even — for example {{2^4 * 3^2}}. What kind of number must it be?",
        options: ["A square number", "A cube number", "An even number", "A prime number"],
        answerIndex: 0,
        explanation:
          "If every power is even, the primes split into two identical halves: {{2^4 * 3^2 = (2^2 * 3)^2 = 12^2}}. So it is a square number. It needn't be a cube ({{12^2 = 144}} isn't one), and it needn't be even: {{3^2 * 5^2 = 225}}. A prime has a single prime factor with power 1, which is odd.",
        difficulty: "warmup",
        guideRef: "squares-cubes-from-primes",
        hints: ["Try splitting {{2^4 * 3^2}} into two equal groups."],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q06",
        question: "Two numbers are **coprime** when their HCF is 1. Which pair is coprime?",
        options: ["13 and 26", "15 and 21", "34 and 51", "14 and 15"],
        answerIndex: 3,
        explanation:
          "14 = 2 × 7 and 15 = 3 × 5 share no prime factor, so their HCF is 1: they are coprime, even though neither is prime. 13 and 26 include a prime, but 26 = 2 × 13, so their HCF is 13. 15 and 21 are both odd, but they share 3. 34 and 51 hide a shared factor: 34 = 2 × 17 and 51 = 3 × 17, so their HCF is 17.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Coprime doesn't mean prime — check for shared factors.",
          "Write each number as a product of primes.",
          "Look for a prime that appears in both numbers of a pair.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q07",
        question: "Which of these does **not** divide exactly into 4140?",
        options: ["9", "6", "8", "4"],
        answerIndex: 2,
        explanation:
          "For 8, check the last three digits: 140 ÷ 8 = 17.5, so 8 does not divide 4140. The others do: the digit sum is 4 + 1 + 4 + 0 = 9, so 9 divides it (4140 = 9 × 460); it is even and divisible by 3, so 6 divides it; and its last two digits, 40, are a multiple of 4. Passing the test for 4 doesn't guarantee passing the test for 8.",
        difficulty: "core",
        guideRef: "factors-multiples-primes",
        hints: [
          "Use a divisibility test for each option instead of dividing out fully.",
          "4 and 8 look at the last two and last three digits; 9 uses the digit sum; 6 needs both 2 and 3.",
          "Is 140 a multiple of 8?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q08",
        question: "{{288 = 2^a * 3^b}}, where a and b are whole numbers. What is a + b?",
        options: ["10", "7", "6", "5"],
        answerIndex: 1,
        explanation:
          "Halve until you can't: 288 → 144 → 72 → 36 → 18 → 9, which is five halvings, so a = 5. Then 9 = {{3^2}}, so b = 2. {{288 = 2^5 * 3^2}} (32 × 9 = 288), and a + b = 7. 10 multiplies a and b instead of adding them. 6 comes from {{2^4 * 3^2}} = 144, losing a 2. 5 is the value of a on its own.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "How many times can you halve 288 before you reach an odd number?",
          "That number of halvings is a.",
          "What is left over is a power of 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q09",
        question: "{{252 = 2^2 * 3^2 * 7}}. Which is {{252 * 6}} written as a product of prime factors?",
        options: ["{{2^3 * 3^3 * 7}}", "{{2^2 * 3^2 * 7 * 6}}", "{{2^3 * 3^2 * 7}}", "{{2^4 * 3^4 * 7}}"],
        answerIndex: 0,
        explanation:
          "6 = 2 × 3, so multiplying by 6 adds one more 2 and one more 3: {{2^3 * 3^3 * 7}} (= 8 × 27 × 7 = 1512 = 252 × 6). {{2^2 * 3^2 * 7 * 6}} has the right value, but 6 isn't prime. {{2^3 * 3^2 * 7}} adds only the 2. {{2^4 * 3^4 * 7}} doubles the powers instead of adding 1 to each.",
        difficulty: "core",
        guideRef: "prime-factorisation",
        hints: [
          "You don't need to work out 252 × 6 first.",
          "Write 6 as a product of primes.",
          "Multiplying by 6 adds 1 to the power of 2 and 1 to the power of 3.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q10",
        question: "What is the HCF of {{12x^2 y}} and {{18xy^3}}?",
        options: ["{{6x^2 y^3}}", "{{36x^2 y^3}}", "{{6xy}}", "{{3xy}}"],
        answerIndex: 2,
        explanation:
          "Treat each letter like a prime. Numbers: HCF(12, 18) = 6. Letter x: the lower power is {{x^1}}. Letter y: the lower power is {{y^1}}. So the HCF is {{6xy}}. {{6x^2 y^3}} takes the higher powers of the letters, and {{36x^2 y^3}} is the LCM. {{3xy}} is a common factor, but 3 isn't the highest common factor of 12 and 18.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Deal with the numbers and each letter separately.",
          "{{x^2 = x * x}} and {{x}} share just one x.",
          "Find the HCF of 12 and 18, then take the lower power of each letter.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q11",
        question: "The Venn diagram shows the prime factors of 90 and 168. What is the LCM of 90 and 168?",
        diagram: VENN_90_168,
        options: ["15120", "2520", "6", "210"],
        answerIndex: 1,
        explanation:
          "The LCM is the product of **every** number in the diagram, with the overlap counted once: 3 × 5 × 2 × 3 × 2 × 2 × 7 = 2520, which is {{2^3 * 3^2 * 5 * 7}}. 15120 = 90 × 168 counts the overlap twice. 6 is the HCF (the overlap only), and 210 = 2 × 3 × 5 × 7 uses each prime once and loses the repeats.",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Which numbers are inside either circle?",
          "Multiply every number in the diagram exactly once.",
          "Check: does 90 divide your answer? Does 168?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q12",
        question:
          "Arjun is paving a rectangular patio 4.2 m by 3 m with identical square slabs, with no cutting and no gaps. The slabs must be as large as possible, with sides a whole number of centimetres. How many slabs does he need?",
        diagram: PATIO,
        options: ["60", "140", "12", "35"],
        answerIndex: 3,
        explanation:
          "Work in centimetres: 420 cm by 300 cm. The slab side is HCF(420, 300). {{420 = 2^2 * 3 * 5 * 7}} and {{300 = 2^2 * 3 * 5^2}}, so the HCF is {{2^2 * 3 * 5 = 60}} cm. That gives 420 ÷ 60 = 7 slabs along and 300 ÷ 60 = 5 slabs across: 7 × 5 = 35 slabs. 60 is the slab size, not the number of slabs. 140 comes from 30 cm slabs (14 × 10), which are not the largest. 12 adds 7 + 5 instead of multiplying.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Convert both lengths to centimetres first.",
          "The largest slab side is the HCF of 420 and 300.",
          "How many slabs fit along each side? The slabs make a grid.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q13",
        question:
          "Priya runs a lap of the track in 6 minutes and Marcus runs one in 8 minutes. They start together at the start line. Ethan says: \"HCF(6, 8) = 2, so they are next at the start line together after 2 minutes.\" Which is correct?",
        options: [
          "24 minutes — Ethan needed a common *multiple* of 6 and 8, not a common factor",
          "2 minutes — Ethan is right",
          "48 minutes — Ethan should have multiplied 6 × 8",
          "14 minutes — Ethan should have added 6 + 8",
        ],
        answerIndex: 0,
        explanation:
          "After 2 minutes neither runner has finished a single lap. They are both at the start line only at times that are multiples of 6 *and* of 8, so the answer is LCM(6, 8) = 24 minutes (Priya runs 4 laps, Marcus 3). 48 minutes is also a time they meet, but not the first. 14 minutes isn't a multiple of either lap time.",
        difficulty: "core",
        guideRef: "hcf-lcm-problems",
        hints: [
          "Where is Priya after 2 minutes?",
          "Priya is at the start line at 6, 12, 18, … minutes. When is Marcus there?",
          "Find the first time in both lists.",
        ],
        strategy: "Make a list",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q14",
        question:
          "Jun says: \"If a number is divisible by 4 and by 6, then it must be divisible by 24, because 4 × 6 = 24.\" Which response is correct?",
        options: [
          "Jun is right, because 24 is a common multiple of 4 and 6",
          "Jun is right, because LCM(4, 6) = 24",
          "Jun is wrong: 12 is divisible by 4 and 6 but not by 24; the number must be divisible by LCM(4, 6) = 12",
          "Jun is wrong: the number must be divisible by 10, because 4 + 6 = 10",
        ],
        answerIndex: 2,
        explanation:
          "One counterexample is enough: 12 ÷ 4 = 3 and 12 ÷ 6 = 2, but 12 ÷ 24 is not whole. A number divisible by 4 and 6 is a common multiple of them, so it is a multiple of their LCM, which is 12, not 24 — the product 24 counts the shared 2 twice. Claiming LCM(4, 6) = 24 makes the same product mistake, and 4 + 6 = 10 has nothing to do with it (12 isn't a multiple of 10).",
        difficulty: "core",
        guideRef: "hcf-lcm",
        hints: [
          "Can you find a small number that is divisible by 4 and by 6?",
          "The common multiples of 4 and 6 are the multiples of their LCM.",
          "What is LCM(4, 6)?",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q15",
        question: "Which of these numbers is **both** a square number and a cube number?",
        options: ["{{2^4 * 3^2}}", "{{2^6 * 3^6}}", "{{2^3 * 3^6}}", "{{2^5 * 3^5}}"],
        answerIndex: 1,
        explanation:
          "A square needs every power even, and a cube needs every power to be a multiple of 3. For both, every power must be a multiple of 6: {{2^6 * 3^6 = (2^3 * 3^3)^2 = (2^2 * 3^2)^3}}. {{2^4 * 3^2}} is a square only (4 isn't a multiple of 3). {{2^3 * 3^6}} is a cube only (3 is odd). {{2^5 * 3^5}} has equal powers, but 5 is neither even nor a multiple of 3.",
        difficulty: "core",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What must the powers be for a square? For a cube?",
          "Square: every power even. Cube: every power a multiple of 3.",
          "Which option has every power a multiple of both 2 and 3?",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q16",
        question: "What is the smallest whole number with exactly **six** factors?",
        options: ["12", "6", "32", "64"],
        answerIndex: 0,
        explanation:
          "Work upwards: 6, 8 and 10 each have four factors, and no number below 12 has more than four. 12 has six: 1, 2, 3, 4, 6, 12. In index form, {{12 = 2^2 * 3}} has (2 + 1)(1 + 1) = 6 factors. 6 is the number of factors wanted, not the answer (it has four). {{32 = 2^5}} has six factors but isn't the smallest. {{64 = 2^6}} has seven factors (1, 2, 4, 8, 16, 32, 64) — a prime to the power 6 has 6 + 1 factors, not 6.",
        difficulty: "core",
        guideRef: "counting-factors",
        hints: [
          "Count the factors of 6, 8, 10, 12, … in turn.",
          "Or use index form: add 1 to each power and multiply.",
          "Which small numbers make (a + 1)(b + 1) = 6?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q17",
        question:
          "Wei Ling sorts her stickers into equal piles. Whether she uses piles of 2, 3, 4, 5 or 6, there is always exactly 1 sticker left over. She has more than 1 sticker. What is the smallest number of stickers she could have?",
        options: ["60", "121", "721", "61"],
        answerIndex: 3,
        explanation:
          "Taking away the leftover sticker leaves a number divisible by 2, 3, 4, 5 and 6 — a common multiple. LCM(2, 3, 4, 5, 6) = {{2^2 * 3 * 5 = 60}}, so the answer is 60 + 1 = 61. 60 forgets the leftover sticker. 721 = 2 × 3 × 4 × 5 × 6 + 1 and 121 = 4 × 5 × 6 + 1 do leave remainder 1 every time, but they come from multiplying instead of finding the LCM, so they aren't the smallest.",
        difficulty: "challenge",
        guideRef: "hcf-lcm-problems",
        hints: [
          "What if she put one sticker aside first?",
          "Then the number divides exactly by 2, 3, 4, 5 and 6.",
          "Find LCM(2, 3, 4, 5, 6), then add the extra sticker back.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q18",
        question: "{{1500 = 2^2 * 3 * 5^3}}. What is the smallest whole number k such that 1500 × k is a cube number?",
        options: ["6", "12", "18", "2"],
        answerIndex: 2,
        explanation:
          "A cube needs every power to be a multiple of 3. {{5^3}} is fine. {{2^2}} needs one more 2, and {{3^1}} needs two more 3s. So k = {{2 * 3^2 = 18}}, and 1500 × 18 = {{2^3 * 3^3 * 5^3 = 30^3 = 27000}}. 6 = 2 × 3 adds one of each prime, as if making a square, but leaves {{3^2}}. 12 = {{2^2 * 3}} copies the non-cube part, giving {{2^4 * 3^2}}. 2 fixes only the 2s.",
        difficulty: "challenge",
        guideRef: "squares-cubes-from-primes",
        hints: [
          "What must be true of every power in a cube number?",
          "Each power must be a multiple of 3. How far is each power from the next multiple of 3?",
          "{{2^2}} needs one more 2, and {{3^1}} needs two more 3s.",
        ],
        strategy: "Use prime factors",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q19",
        question: "Two numbers have HCF 12 and LCM 72. Neither number is 12 or 72. What is the sum of the two numbers?",
        options: ["84", "864", "48", "60"],
        answerIndex: 3,
        explanation:
          "Both numbers are multiples of 12, say 12m and 12n, where m and n share no common factor. HCF × LCM = product gives 12m × 12n = 12 × 72, so m × n = 6. Either m and n are 1 and 6 (giving 12 and 72, which aren't allowed) or 2 and 3 (giving 24 and 36). Check: HCF(24, 36) = 12 and LCM(24, 36) = 72. The sum is 60. 84 = 12 + 72 uses the pair that isn't allowed. 864 = 24 × 36 is the product, not the sum. 48 = 24 + 24, but two equal numbers would have HCF 24.",
        difficulty: "challenge",
        guideRef: "hcf-lcm",
        hints: [
          "Both numbers must be multiples of the HCF, 12.",
          "Their product must be HCF × LCM = 864.",
          "Try multiples of 12 that are factors of 72: 24, 36, …",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "factors-multiples-m4-q20",
        question:
          "A corridor has 100 lockers, numbered 1 to 100, all closed. Student 1 opens every locker. Student 2 changes every 2nd locker (closing it if open, opening it if closed). Student 3 changes every 3rd locker, and so on, up to student 100. How many lockers are open at the end?",
        options: ["50", "10", "25", "0"],
        answerIndex: 1,
        explanation:
          "Locker n is changed once for every factor of n, and it ends open only if it is changed an odd number of times. Factors pair up, except when a × a = n, so only **square numbers** have an odd number of factors. The squares from 1 to 100 are 1, 4, 9, …, 100: that's 10 lockers. 50 imagines the odd-numbered lockers stay open. 25 counts the primes up to 100 — but each prime locker is changed exactly twice, so it ends closed.",
        difficulty: "challenge",
        guideRef: "counting-factors",
        hints: [
          "Which students change locker 12? How many is that?",
          "A locker ends open if it is changed an odd number of times.",
          "Which numbers have an odd number of factors?",
        ],
        strategy: "Try small cases",
      },
    ],
  },
];
