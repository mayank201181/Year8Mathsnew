// Probability — quiz, practice papers and challenge set.
import type { TopicPractice } from "../../types.ts";

const vennDurian = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 50 people. 17 like durian only, 13 like both durian and mangosteen, 12 like mangosteen only and 8 like neither."><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="none" stroke="#334155" stroke-width="1.5"/><text x="22" y="32" font-size="14" font-family="sans-serif" fill="#1f2937">ξ</text><circle cx="140" cy="118" r="72" fill="#c7d2fe" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#fde68a" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><text x="105" y="38" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Durian</text><text x="258" y="38" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Mangosteen</text><text x="102" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">17</text><text x="180" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">13</text><text x="258" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">12</text><text x="326" y="196" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">8</text></svg>`;

const spinnerAngles = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A spinner divided into four sectors: red 135 degrees, blue 90 degrees, green 75 degrees and yellow 60 degrees."><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><path d="M120,110 L120,20 A90,90 0 0 1 183.64,173.64 Z" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L183.64,173.64 A90,90 0 0 1 56.36,173.64 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L56.36,173.64 A90,90 0 0 1 42.06,65 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L42.06,65 A90,90 0 0 1 120,20 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="110" r="3" fill="#1f2937"/><text x="171" y="93" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">135°</text><text x="120" y="169" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">90°</text><text x="66" y="121" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">75°</text><text x="93" y="66" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">60°</text><rect x="240" y="52" width="16" height="16" fill="#fecaca" stroke="#1f2937"/><text x="264" y="65" font-size="13" font-family="sans-serif" fill="#1f2937">Red</text><rect x="240" y="82" width="16" height="16" fill="#bae6fd" stroke="#1f2937"/><text x="264" y="95" font-size="13" font-family="sans-serif" fill="#1f2937">Blue</text><rect x="240" y="112" width="16" height="16" fill="#bbf7d0" stroke="#1f2937"/><text x="264" y="125" font-size="13" font-family="sans-serif" fill="#1f2937">Green</text><rect x="240" y="142" width="16" height="16" fill="#fde68a" stroke="#1f2937"/><text x="264" y="155" font-size="13" font-family="sans-serif" fill="#1f2937">Yellow</text></svg>`;

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "probability-quiz-q01",
      question: "Which of these could **not** be the probability of an event?",
      options: ["{{5/4}}", "0", "1", "0.05"],
      answerIndex: 0,
      explanation:
        "Every probability lies between 0 and 1. {{5/4}} is bigger than 1, which would mean 'more likely than certain', so it can't be a probability. 0 is allowed — it's the probability of an impossible event — and 1 is the probability of a certain event. 0.05 is simply a small chance (5%).",
      difficulty: "warmup",
      guideRef: "probability-scale",
      hints: ["What are the smallest and largest values a probability can take?"],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "probability-quiz-q02",
      question:
        "A bag holds 5 red, 3 green and 4 yellow counters. One counter is taken at random. What is the probability that it is green? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 1, d: 4, simplest: true },
      solution: ["Total number of counters: 5 + 3 + 4 = 12.", "Green counters: 3.", "P(green) = {{3/12 = 1/4}}."],
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 3 },
          feedback: "{{3/9}} compares the green counters with the counters that aren't green. A probability divides by **all** the counters: 12.",
        },
      ],
      commonError: "Dividing by the number of non-green counters (9) instead of the total (12).",
      difficulty: "warmup",
      guideRef: "probability-scale",
      hints: ["How many counters are there altogether?", "P(green) = number of green ÷ total number of counters."],
    },
    {
      kind: "short",
      id: "probability-quiz-q03",
      question:
        "The probability that it rains during Arjun's football match on Saturday is 0.35. What is the probability that it does **not** rain during the match? Give your answer as a decimal.",
      answer: { type: "number", value: 0.65, allowFraction: false },
      solution: [
        "'Rain' and 'no rain' are complementary: one of them must happen, and they can't both happen.",
        "So their probabilities add up to 1: P(no rain) = 1 − 0.35 = 0.65.",
      ],
      traps: [
        {
          spec: { type: "number", value: 0.75 },
          feedback: "Check the subtraction: 0.35 + 0.75 = 1.1, not 1. Try 1.00 − 0.35.",
        },
      ],
      difficulty: "warmup",
      guideRef: "complementary-events",
      hints: ["Rain and no rain together cover every possibility. What must their probabilities add up to?"],
      strategy: "Use the complement",
    },
    {
      kind: "mcq",
      id: "probability-quiz-q04",
      question:
        "A student ID is one letter (A, B, C, D or E) followed by two digits, each from 0 to 9. Digits may repeat, so C07 and A55 are both allowed. How many different IDs are possible?",
      options: ["25", "500", "50", "450"],
      answerIndex: 1,
      explanation:
        "Product rule: 5 choices of letter × 10 choices for the first digit × 10 for the second digit = 500. 25 comes from adding 5 + 10 + 10, but every letter can go with every pair of digits, so you multiply. 50 forgets one of the digits, and 450 (5 × 10 × 9) wrongly stops the digits from repeating.",
      difficulty: "core",
      guideRef: "sample-spaces",
      hints: [
        "Imagine filling three boxes: letter, digit, digit. How many choices are there for each box?",
        "Each letter can be followed by any pair of digits. Do you add or multiply the choices?",
        "Multiply the numbers of choices for the three boxes (the product rule).",
      ],
      strategy: "Use the product rule",
    },
    {
      kind: "short",
      id: "probability-quiz-q05",
      question:
        "Two fair dice are rolled and the scores are added. What is the probability that the total is 9? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 1, d: 9, simplest: true },
      solution: [
        "Two dice give 6 × 6 = 36 equally likely outcomes.",
        "Totals of 9: (3, 6), (4, 5), (5, 4) and (6, 3) — that's 4 outcomes.",
        "P(total 9) = {{4/36 = 1/9}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 11 },
          feedback: "There are 11 possible totals, but they aren't equally likely — a total of 7 can be made in 6 ways, a total of 2 in only one. Count cells in the 36-cell grid.",
        },
        {
          spec: { type: "fraction", n: 1, d: 18 },
          feedback: "Order matters: (3, 6) and (6, 3) are different cells in the grid. There are 4 ways to make 9, not 2.",
        },
      ],
      commonError: "Treating the 11 totals from 2 to 12 as equally likely.",
      difficulty: "core",
      guideRef: "combined-events",
      hints: [
        "How many equally likely outcomes are there when two dice are rolled?",
        "List the pairs (first dice, second dice) that make 9.",
        "Remember that (4, 5) and (5, 4) are different outcomes.",
      ],
      strategy: "Draw a sample space diagram",
    },
    {
      kind: "short",
      id: "probability-quiz-q06",
      question:
        "The two-way table shows how 60 visitors travelled to a viewpoint on Sentosa.\n\n| | Cable car | Tram | Total |\n|---|---|---|---|\n| Adult | 14 | 22 | 36 |\n| Child | 18 | 6 | 24 |\n| Total | 32 | 28 | 60 |\n\nOne of the **children** is chosen at random. What is the probability that this child took the cable car? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 3, d: 4, simplest: true },
      solution: [
        "We are choosing from the children only, so the total is the children's total: 24.",
        "Children who took the cable car: 18.",
        "P(cable car) = {{18/24 = 3/4}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 3, d: 10 },
          feedback: "{{18/60}} divides by all 60 visitors — but the person is chosen from the 24 children only.",
        },
        {
          spec: { type: "fraction", n: 9, d: 16 },
          feedback: "{{18/32}} is the fraction of cable-car riders who are children. We want the fraction of children who took the cable car, so divide by the children's total.",
        },
      ],
      commonError: "Dividing by the grand total (60) when the person is chosen from one group.",
      difficulty: "core",
      guideRef: "two-way-tables-venn",
      hints: [
        "Who are we choosing from: all the visitors, or just one group?",
        "Find the children's row and its total.",
        "Divide the right cell by the total of that row.",
      ],
      strategy: "Read the right total",
    },
    {
      kind: "mcq",
      id: "probability-quiz-q07",
      question: "Ethan suspects his dice is biased. He rolls it 600 times and gets 160 sixes. Which conclusion is best?",
      options: [
        "The dice is fair, because every number still came up",
        "The dice is definitely biased towards six",
        "The dice is probably biased towards six",
        "Nothing can be concluded, because every roll is random",
      ],
      answerIndex: 2,
      explanation:
        "A fair dice would give about {{1/6}} × 600 = 100 sixes. 160 is far more than that over a large number of rolls, so bias towards six is very likely. 'Definitely' goes too far: an experiment gives strong evidence, never proof. Every number coming up says nothing about whether they come up equally often, and randomness doesn't stop a large experiment from telling us something.",
      difficulty: "core",
      guideRef: "relative-frequency",
      hints: [
        "How many sixes would a fair dice give, roughly, in 600 rolls?",
        "Is 160 close to that? And is 600 a lot of rolls?",
        "Can an experiment ever prove something for certain?",
      ],
      strategy: "Compare with what you'd expect",
    },
    {
      kind: "short",
      id: "probability-quiz-q08",
      question:
        "The probability that an MRT train arrives on time is 0.92. Out of 250 trains, how many would you expect to be **late**?",
      answer: { type: "number", value: 20 },
      solution: ["P(late) = 1 − 0.92 = 0.08.", "Expected number of late trains = 0.08 × 250 = 20."],
      traps: [
        {
          spec: { type: "number", value: 230 },
          feedback: "230 is the expected number of trains **on time**. The question asks about late trains.",
        },
      ],
      commonError: "Working out 0.92 × 250 and forgetting that the question asks about late trains.",
      difficulty: "core",
      guideRef: "expected-outcomes",
      hints: ["What is the probability that a train is late?", "Expected number = probability × number of trials."],
      strategy: "Use the complement",
    },
    {
      kind: "mcq",
      id: "probability-quiz-q09",
      question: "A fair dice is rolled once. Which pair of events are **mutually exclusive**?",
      options: [
        "Rolling a 2 and rolling an even number",
        "Rolling a number less than 4 and rolling an odd number",
        "Rolling a 6 and rolling a factor of 12",
        "Rolling a 5 and rolling an even number",
      ],
      answerIndex: 3,
      explanation:
        "Mutually exclusive events can't happen at the same time. 5 is not even, so 'rolling a 5' and 'rolling an even number' never happen together. Every other pair overlaps: 2 is even; 1 and 3 are both less than 4 and odd; and 6 is a factor of 12.",
      difficulty: "core",
      guideRef: "complementary-events",
      hints: [
        "Mutually exclusive means the two events can't both happen on the same roll.",
        "For each pair, look for a score that fits both descriptions.",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "written",
      id: "probability-quiz-q10",
      question:
        "Ravi rolls two fair dice. He says: “Either both scores are even, both are odd, or there's one of each. That's three possibilities, so P(one even and one odd) = {{1/3}}.”\n\nExplain what is wrong with Ravi's reasoning, and find the correct probability.",
      marks: 3,
      modelAnswer:
        "Ravi's three possibilities are not equally likely, so he can't give each one {{1/3}}. Each dice is even or odd with probability {{1/2}}, so the four ordered results EE, EO, OE and OO are equally likely. 'One of each' covers two of them (EO and OE), so P(one even and one odd) = {{2/4 = 1/2}}.\n\nCheck with the 36-cell grid: both even = 3 × 3 = 9 cells, both odd = 9 cells, so one of each = 36 − 18 = 18 cells, and {{18/36 = 1/2}}.",
      markScheme: [
        { point: "States that Ravi's three possibilities are not equally likely", keywords: ["not equally likely", "equally likely", "not equal", "different chances"] },
        {
          point: "Uses an equally likely sample space: EE, EO, OE, OO (or the 36-cell grid with 9, 9 and 18)",
          keywords: ["eo", "oe", "ee", "oo", "36", "18", "order"],
        },
        { point: "Correct probability {{1/2}}", keywords: ["1/2", "0.5", "18/36", "2/4", "half"] },
      ],
      solutions: [
        {
          label: "Sample space grid",
          steps: [
            "Rows: first dice 1–6. Columns: second dice 1–6. 36 equally likely cells.",
            "Both even: 3 × 3 = 9 cells. Both odd: 3 × 3 = 9 cells.",
            "One of each: 36 − 9 − 9 = 18 cells, so P = {{18/36 = 1/2}}.",
          ],
        },
      ],
      commonError: "Saying Ravi 'forgot something' without showing why the three cases have different probabilities.",
      difficulty: "challenge",
      guideRef: "combined-events",
      hints: [
        "Are Ravi's three possibilities equally likely?",
        "Think about the first dice and the second dice separately: each is either even or odd.",
        "List the four ordered pairs EE, EO, OE and OO. How many of them are 'one of each'?",
      ],
      strategy: "Draw a sample space diagram",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS — 16 short + 4 written each; 5 warmup, 11 core, 4 challenge
  // ===========================================================================
  papers: [
    {
      id: "probability-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "probability-p1-q01",
          question:
            "The 9 letters of the word SINGAPORE are written on separate cards. One card is picked at random. What is the probability that it shows a vowel (A, E, I, O or U)? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 4, d: 9, simplest: true },
          solution: [
            "The vowels in S, I, N, G, A, P, O, R, E are I, A, O and E: 4 cards.",
            "There are 9 cards, all equally likely to be picked.",
            "P(vowel) = {{4/9}}.",
          ],
          traps: [
            { spec: { type: "fraction", n: 5, d: 9 }, feedback: "{{5/9}} is the probability of a consonant (S, N, G, P, R)." },
          ],
          difficulty: "warmup",
          guideRef: "probability-scale",
          hints: ["Go through the word one letter at a time and count the vowels."],
        },
        {
          kind: "short",
          id: "probability-p1-q02",
          question:
            "The probability that Hana's school bus is late is {{3/20}}. What is the probability that it is **not** late? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 17, d: 20, simplest: true },
          solution: [
            "'Late' and 'not late' are complementary, so their probabilities add up to 1.",
            "P(not late) = {{1 - 3/20 = 20/20 - 3/20 = 17/20}}.",
          ],
          traps: [
            { spec: { type: "fraction", n: 3, d: 20 }, feedback: "That's the probability that the bus **is** late. Subtract it from 1." },
          ],
          difficulty: "warmup",
          guideRef: "complementary-events",
          hints: ["P(not late) = 1 − P(late). Write 1 as {{20/20}}."],
          strategy: "Use the complement",
        },
        {
          kind: "short",
          id: "probability-p1-q03",
          question:
            "A hawker stall sells 3 vegetarian noodle dishes and 5 different drinks. Jun buys one noodle dish and one drink. How many different combinations could he choose?",
          answer: { type: "number", value: 15 },
          solution: [
            "Each of the 3 noodle dishes can go with any of the 5 drinks.",
            "Product rule: 3 × 5 = 15 combinations.",
          ],
          traps: [
            {
              spec: { type: "number", value: 8 },
              feedback: "Adding gives 8, but each noodle dish pairs with **every** drink — picture a table with 3 rows and 5 columns. Multiply.",
            },
          ],
          difficulty: "warmup",
          guideRef: "sample-spaces",
          hints: ["Picture a table: noodle dishes down the side, drinks along the top. How many cells does it have?"],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p1-q04",
          question:
            "Arjun drops a drawing pin 50 times. It lands point up 18 times. What is the relative frequency of the pin landing point up? Give your answer as a decimal.",
          answer: { type: "number", value: 0.36, allowFraction: false },
          solution: [
            "Relative frequency = number of times the event happened ÷ number of trials.",
            "18 ÷ 50 = 0.36.",
          ],
          traps: [
            { spec: { type: "number", value: 0.64 }, feedback: "0.64 is the relative frequency of point **down**: 32 out of 50." },
          ],
          difficulty: "warmup",
          guideRef: "relative-frequency",
          hints: ["Divide the number of 'point up' results by the number of drops."],
        },
        {
          kind: "short",
          id: "probability-p1-q05",
          question: "A fair dice is rolled 90 times. How many times would you expect it to show a number greater than 4?",
          answer: { type: "number", value: 30 },
          solution: [
            "The numbers greater than 4 are 5 and 6, so P(greater than 4) = {{2/6 = 1/3}}.",
            "Expected number = {{1/3}} × 90 = 30.",
          ],
          traps: [
            {
              spec: { type: "number", value: 45 },
              feedback: "4 is not greater than 4. Only 5 and 6 count, so the probability is {{2/6}}, not {{3/6}}.",
            },
          ],
          commonError: "Including 4 as 'greater than 4'.",
          difficulty: "warmup",
          guideRef: "expected-outcomes",
          hints: ["Which scores are greater than 4?", "Expected number = probability × number of rolls."],
        },
        {
          kind: "short",
          id: "probability-p1-q06",
          question:
            "A biased spinner can land on red, blue, green or yellow. The table shows the probabilities.\n\n| Colour | Red | Blue | Green | Yellow |\n|---|---|---|---|---|\n| Probability | 0.16 | {{x}} | {{2x}} | {{3x}} |\n\nFind the probability that the spinner lands on yellow. Give your answer as a decimal.",
          answer: { type: "number", value: 0.42, allowFraction: false },
          solution: [
            "The four colours are mutually exclusive and cover every possibility, so the probabilities add up to 1.",
            "{{0.16 + x + 2x + 3x = 1}}, so {{6x = 0.84}}.",
            "{{x = 0.84 ÷ 6 = 0.14}}.",
            "P(yellow) = {{3x}} = 3 × 0.14 = 0.42.",
          ],
          traps: [
            { spec: { type: "number", value: 0.14 }, feedback: "0.14 is the value of {{x}}. Yellow is {{3x}}." },
            {
              spec: { type: "number", value: 0.84 },
              feedback: "Blue and green belong in the total too: {{x + 2x + 3x = 6x}}, so {{6x = 0.84}}.",
            },
          ],
          commonError: "Stopping at {{x = 0.14}} instead of going on to find {{3x}}.",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: [
            "What must the four probabilities add up to?",
            "Collect the {{x}} terms: {{x + 2x + 3x}}.",
            "Solve {{0.16 + 6x = 1}}, then remember that yellow is {{3x}}.",
          ],
          strategy: "Form an equation",
        },
        {
          kind: "written",
          id: "probability-p1-q07",
          question:
            "A fair dice is rolled. Jun says: “P(prime) = {{3/6}} and P(even) = {{3/6}}, so P(prime or even) = {{3/6 + 3/6 = 1}}. Rolling a prime or an even number is certain!”\n\nExplain Jun's mistake and find the correct probability of rolling a prime or an even number.",
          marks: 3,
          modelAnswer:
            "The primes on a dice are 2, 3 and 5, and the even numbers are 2, 4 and 6. The number 2 is on both lists, so the two events are **not** mutually exclusive. Adding {{3/6 + 3/6}} counts the 2 twice — you may only add probabilities when the events can't happen together.\n\nThe scores that are prime or even (or both) are 2, 3, 4, 5 and 6: five scores. So P(prime or even) = {{5/6}}. It isn't certain, because a 1 is neither prime nor even.",
          markScheme: [
            {
              point: "Notes that 2 is both prime and even, so the events overlap (they are not mutually exclusive)",
              keywords: ["2", "both", "overlap", "mutually exclusive"],
            },
            {
              point: "Explains that adding counts the 2 twice — probabilities can only be added when the events can't happen together",
              keywords: ["twice", "double", "counted", "can't happen together", "cannot happen together"],
            },
            { point: "Lists 2, 3, 4, 5, 6 and gives P(prime or even) = {{5/6}}", keywords: ["5/6", "five", "2, 3, 4, 5, 6", "1 is neither"] },
          ],
          commonError: "Saying 'a probability of 1 is too big' without spotting that the 2 has been counted twice.",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: [
            "List the prime numbers on a dice, then the even numbers.",
            "Does any number appear on both lists?",
            "Which scores are prime **or** even? Is there a score that is neither?",
          ],
          strategy: "Make a list",
        },
        {
          kind: "short",
          id: "probability-p1-q08",
          question:
            "A phone PIN is made of 4 digits, each from 0 to 9. How many different PINs are possible if all four digits must be **different**?",
          answer: { type: "number", value: 5040 },
          solution: [
            "First digit: 10 choices.",
            "Second digit: any digit except the first — 9 choices.",
            "Third digit: 8 choices. Fourth digit: 7 choices.",
            "Product rule: 10 × 9 × 8 × 7 = 5040.",
          ],
          traps: [
            {
              spec: { type: "number", value: 10000 },
              feedback: "10 000 allows repeated digits like 1121. Once a digit is used, there is one fewer choice for the next place.",
            },
            {
              spec: { type: "number", value: 34 },
              feedback: "10 + 9 + 8 + 7 adds the choices, but each first digit can go with every possible second digit (and so on), so multiply.",
            },
          ],
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "How many choices are there for the first digit?",
            "Once the first digit is used, how many choices are left for the second?",
            "Multiply the numbers of choices for all four places.",
          ],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p1-q09",
          question:
            "Two fair dice are rolled. What is the probability that the difference between the two scores is 2? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 2, d: 9, simplest: true },
          solution: [
            "Draw a 6 × 6 sample space of differences (larger score − smaller score): 36 equally likely cells.",
            "A difference of 2 comes from (1, 3), (2, 4), (3, 5), (4, 6) and the reverses (3, 1), (4, 2), (5, 3), (6, 4) — 8 cells.",
            "P(difference 2) = {{8/36 = 2/9}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 9 },
              feedback: "You've found 4 pairs, but (1, 3) and (3, 1) are different outcomes — different cells in the grid. There are 8 cells.",
            },
            {
              spec: { type: "fraction", n: 1, d: 6 },
              feedback: "The six differences 0 to 5 aren't equally likely: a difference of 1 happens in 10 cells, a difference of 5 in only 2.",
            },
          ],
          commonError: "Forgetting that the reversed pairs, such as (3, 1), are separate outcomes.",
          difficulty: "core",
          guideRef: "combined-events",
          hints: [
            "Draw the 6 × 6 grid and fill each cell with the difference between the scores.",
            "Which pairs differ by 2? Don't forget both orders.",
            "Count the cells, then divide by 36.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q10",
          question:
            "The two-way table shows the CCA groups of 80 students. Some values are missing.\n\n| | Sports | Arts | Uniformed | Total |\n|---|---|---|---|---|\n| Year 7 | 18 | ? | 9 | 40 |\n| Year 8 | ? | 10 | ? | 40 |\n| Total | 34 | 23 | ? | 80 |\n\nA **Year 8** student is chosen at random. Find the probability that they are in a uniformed group. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 7, d: 20, simplest: true },
          solution: [
            "Year 8 sports = 34 − 18 = 16.",
            "Year 8 uniformed = 40 − 16 − 10 = 14.",
            "The student is chosen from the 40 Year 8 students, so P(uniformed) = {{14/40 = 7/20}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 7, d: 40 },
              feedback: "{{14/80}} divides by all 80 students. The student is chosen from Year 8 only, so divide by 40.",
            },
            {
              spec: { type: "fraction", n: 14, d: 23 },
              feedback: "{{14/23}} divides by the uniformed-group total. We're choosing from Year 8, so divide by the Year 8 total, 40.",
            },
          ],
          commonError: "Dividing by the grand total (80) when the student is chosen from Year 8 only.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Fill in the Year 8 row first. Which column total helps you find Year 8 sports?",
            "Year 8 sports = 34 − 18. Then use the Year 8 total of 40.",
            "A Year 8 student is chosen — so which total do you divide by?",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "written",
          id: "probability-p1-q11",
          question:
            "Wei Ling flips a coin 10 times and gets 7 heads. She says: “The relative frequency of heads is 0.7, so P(head) = 0.7 — my coin is biased.”\n\nIs Wei Ling right? Explain.",
          marks: 3,
          modelAnswer:
            "Not necessarily. The relative frequency 7 ÷ 10 = 0.7 is only an **estimate** of P(head), and 10 flips is far too few to rely on. A perfectly fair coin gives 7 or more heads in 10 flips about 1 time in 6, just by chance.\n\nTo judge properly she should flip the coin many more times — several hundred, say. If the relative frequency of heads still stayed well away from 0.5 over all those flips, she would have good evidence that the coin is biased.",
          markScheme: [
            { point: "Says 0.7 is only an estimate (a relative frequency, not the true probability)", keywords: ["estimate", "relative frequency", "experimental"] },
            {
              point: "10 flips is too few — a fair coin can easily give 7 heads in 10 by chance",
              keywords: ["too few", "only 10", "small", "chance", "luck", "not enough", "easily"],
            },
            {
              point: "She needs many more flips; bias is only suggested if the relative frequency stays far from 0.5",
              keywords: ["more flips", "more trials", "hundreds", "100", "1000", "many more", "0.5"],
            },
          ],
          commonError: "Agreeing that the coin is biased just because 0.7 isn't 0.5.",
          difficulty: "core",
          guideRef: "relative-frequency",
          hints: [
            "How reliable is an estimate based on only 10 trials?",
            "Could a perfectly fair coin give 7 heads in 10 flips?",
            "What should she do to find out properly?",
          ],
        },
        {
          kind: "short",
          id: "probability-p1-q12",
          question:
            "Mei flips a fair coin and rolls a fair dice at the same time. She does this 240 times. How many times would she expect to get a head **and** a six together?",
          answer: { type: "number", value: 20 },
          solution: [
            "A coin and a dice give 2 × 6 = 12 equally likely outcomes, and (head, 6) is just one of them.",
            "P(head and 6) = {{1/12}}.",
            "Expected number = {{1/12 * 240 = 20}}.",
          ],
          traps: [
            {
              spec: { type: "number", value: 40 },
              feedback: "40 is the expected number of sixes, ignoring the coin. Only about half of those sixes come with a head.",
            },
            {
              spec: { type: "number", value: 160 },
              feedback: "Adding {{1/2 + 1/6}} doesn't give 'head and six'. Use the 12-outcome sample space: only one outcome is (head, 6).",
            },
          ],
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: [
            "How many equally likely outcomes are there for a coin and a dice together?",
            "How many of those outcomes are (head, 6)?",
            "Expected number = probability × number of trials.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q13",
          question:
            "The Venn diagram shows which of two fruits 50 people at a fruit stall like.\n\nOne of the people who likes **durian** is chosen at random. What is the probability that they also like mangosteen? Give your answer as a fraction in its simplest form.",
          diagram: vennDurian,
          answer: { type: "fraction", n: 13, d: 30, simplest: true },
          solution: [
            "The people who like durian are everyone inside the durian circle: 17 + 13 = 30.",
            "Of these, 13 also like mangosteen (the overlap).",
            "P(likes mangosteen) = {{13/30}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 13, d: 50 },
              feedback: "{{13/50}} picks from all 50 people. Here the person is chosen from the durian lovers only — 30 of them.",
            },
            {
              spec: { type: "fraction", n: 13, d: 25 },
              feedback: "25 is the number who like mangosteen. The person is chosen from the durian lovers: 17 + 13 = 30.",
            },
          ],
          commonError: "Using only the 'durian only' region (17) as the total, or dividing by everyone.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Who are we choosing from?",
            "How many people are inside the durian circle altogether?",
            "Of those, how many are also inside the mangosteen circle?",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "short",
          id: "probability-p1-q14",
          question:
            "A bag contains only red and white counters. The probability of picking a red counter is {{3/8}}. There are 15 red counters. How many **white** counters are in the bag?",
          answer: { type: "number", value: 25 },
          solution: [
            "{{3/8}} of the counters are red: think of the bag as 8 equal parts, with 3 parts red.",
            "3 parts = 15 counters, so 1 part = 5 counters.",
            "Total = 8 × 5 = 40 counters.",
            "White = 40 − 15 = 25.",
          ],
          solutions: [
            {
              label: "Use the white fraction directly",
              steps: [
                "P(white) = {{1 - 3/8 = 5/8}}, so red : white = 3 : 5.",
                "3 parts = 15, so 1 part = 5.",
                "White = 5 parts = 25. This skips finding the total, so it's slightly quicker.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 40 }, feedback: "40 is the total number of counters. Subtract the 15 red ones." },
          ],
          commonError: "Working out {{3/8}} of 15 instead of scaling up from 15 red counters.",
          difficulty: "core",
          guideRef: "probability-scale",
          hints: [
            "What does {{3/8}} tell you about how the bag is made up?",
            "If 3 parts of the bag are 15 counters, how big is one part?",
            "How many parts are white?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "probability-p1-q15",
          question:
            "Siti wants to test whether her dice is fair. She rolls it 120 times.\n\n| Score | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Frequency | 19 | 22 | 18 | 21 | 17 | 23 |\n\nDo her results give evidence that the dice is biased? Use expected frequencies to explain your answer.",
          marks: 3,
          modelAnswer:
            "If the dice is fair, each score has probability {{1/6}}, so the expected frequency of each score is {{1/6}} × 120 = 20.\n\nSiti's frequencies run from 17 to 23 — every one is within 3 of 20. Real results always vary a little by chance, and differences this small are normal, so there is **no real evidence** that the dice is biased. (Rolling it many more times would make her more confident.)",
          markScheme: [
            { point: "Expected frequency for each score = {{1/6}} × 120 = 20", keywords: ["20", "1/6", "expected"] },
            {
              point: "Compares the results with 20: all are close (17 to 23, within 3)",
              keywords: ["close", "within", "17", "23", "near", "around 20", "about 20"],
            },
            {
              point: "Concludes there is no real evidence of bias — small differences are normal chance variation",
              keywords: ["no evidence", "no real evidence", "fair", "chance", "variation", "not biased", "normal"],
            },
          ],
          commonError: "Deciding the dice is biased because the frequencies aren't all exactly 20.",
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: [
            "If the dice were fair, how many of each score would you expect in 120 rolls?",
            "How far is each frequency from that expected number?",
            "Are those differences big, or the kind of variation you'd expect from chance?",
          ],
          strategy: "Compare with what you'd expect",
        },
        {
          kind: "short",
          id: "probability-p1-q16",
          question:
            "During the monsoon season, the probability that it rains on any given day in Marcus's town is 0.3, independently of other days. Find the probability that it rains on **exactly one** of Saturday and Sunday. Give your answer as a decimal.",
          answer: { type: "number", value: 0.42, allowFraction: false },
          solution: [
            "Exactly one wet day can happen in two ways: rain then dry, or dry then rain.",
            "P(rain, dry) = 0.3 × 0.7 = 0.21.",
            "P(dry, rain) = 0.7 × 0.3 = 0.21.",
            "These two paths can't both happen, so add them: 0.21 + 0.21 = 0.42.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.21 },
              feedback: "That's only one of the two ways. It could be dry on Saturday and wet on Sunday instead — add both paths.",
            },
            {
              spec: { type: "number", value: 0.6 },
              feedback: "0.3 + 0.3 ignores the other day being dry. Multiply along each path of a tree diagram, then add the paths.",
            },
          ],
          commonError: "Counting only one of the two paths (rain on Saturday) and forgetting the other order.",
          difficulty: "core",
          guideRef: "tree-diagrams",
          hints: [
            "Draw a tree diagram: Saturday rain or dry, then Sunday rain or dry.",
            "Which paths give exactly one wet day?",
            "Multiply along each of those paths, then add the paths.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q17",
          question:
            "Two fair dice are rolled and the two scores are **multiplied**. What is the probability that the product is a multiple of 6? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 5, d: 12, simplest: true },
          solution: [
            "There are 36 equally likely (first, second) cells.",
            "A product is a multiple of 6 when, between them, the two scores provide a factor 2 **and** a factor 3.",
            "Count row by row (first dice 1 to 6): 1 → second must be 6 (1 cell); 2 → 3 or 6 (2 cells); 3 → 2, 4 or 6 (3 cells); 4 → 3 or 6 (2 cells); 5 → 6 only (1 cell); 6 → any score (6 cells).",
            "Total: 1 + 2 + 3 + 2 + 1 + 6 = 15 cells.",
            "P = {{15/36 = 5/12}}.",
          ],
          solutions: [
            {
              label: "Count the complement",
              steps: [
                "A product fails to be a multiple of 6 if it has no factor 3 or no factor 2.",
                "No factor 3: both scores from {1, 2, 4, 5}: 4 × 4 = 16 cells. No factor 2: both odd: 3 × 3 = 9 cells.",
                "Both at once (both from {1, 5}): 2 × 2 = 4 cells, counted twice — so 16 + 9 − 4 = 21 bad cells.",
                "Good cells: 36 − 21 = 15, so P = {{15/36 = 5/12}}. Row by row is quicker here; this method shows the structure.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 11, d: 36 },
              feedback: "{{11/36}} is the probability of at least one six. But products like 2 × 3 = 6 and 3 × 4 = 12 are multiples of 6 with no six rolled.",
            },
          ],
          commonError: "Only counting the cells that contain a 6.",
          difficulty: "challenge",
          guideRef: "combined-events",
          hints: [
            "Draw the 6 × 6 grid of products, or think about what a multiple of 6 needs.",
            "6 = 2 × 3. Between them, the two scores need a factor 2 and a factor 3.",
            "Go row by row: if the first dice shows 3, which second scores work? If it shows 4?",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q18",
          question:
            "Ravi makes a three-digit number using three of the digits 1, 2, 3 and 4, each at most once (so 412 is allowed but 442 is not). Every such number is equally likely. What is the probability that his number is divisible by 4? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 1, d: 4, simplest: true },
          solution: [
            "Count all the possible numbers: 4 choices for the hundreds digit, 3 for the tens, 2 for the units: 4 × 3 × 2 = 24.",
            "A number is divisible by 4 exactly when its last two digits make a multiple of 4.",
            "Endings that use two different digits from 1 to 4 and are multiples of 4: 12, 24 and 32. (14, 34 and 42 are even but not multiples of 4.)",
            "For each ending, the hundreds digit can be either of the 2 unused digits: 3 × 2 = 6 numbers (312, 412, 124, 324, 132, 432).",
            "P = {{6/24 = 1/4}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 2 },
              feedback: "{{1/2}} is the probability of an **even** number. Even isn't enough: 314 and 342 are even but not multiples of 4.",
            },
          ],
          commonError: "Treating 'divisible by 4' as 'even'.",
          difficulty: "challenge",
          guideRef: "sample-spaces",
          hints: [
            "How many three-digit numbers can Ravi make altogether?",
            "What's the quick test for divisibility by 4? Look at the last two digits.",
            "List the two-digit endings (different digits from 1 to 4) that are multiples of 4.",
            "For each good ending, how many choices are left for the first digit?",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "written",
          id: "probability-p1-q19",
          question:
            "Two events A and B have P(A) = 0.6 and P(B) = 0.5.\n\n(a) Explain why A and B cannot be mutually exclusive.\n\n(b) What is the smallest possible value of P(A and B)? Explain how you know, and describe a situation where it happens.",
          marks: 4,
          modelAnswer:
            "(a) If A and B were mutually exclusive, P(A or B) would be 0.6 + 0.5 = 1.1. No probability can be bigger than 1, so A and B must overlap: they must be able to happen together.\n\n(b) On a Venn diagram, A or B covers 0.6 + 0.5 − P(A and B) = 1.1 − P(A and B), because the overlap is counted twice when you add. This can be at most 1, so P(A and B) is at least 1.1 − 1 = 0.1.\n\nThe smallest value, 0.1, happens when every outcome is in A or B: A only = 0.5, both = 0.1, B only = 0.4, neither = 0. For example, pick a whole number from 1 to 10 at random, with A = 'the number is from 1 to 6' and B = 'the number is from 6 to 10'. Only 6 is in both, so P(A and B) = 0.1.",
          markScheme: [
            { point: "0.6 + 0.5 = 1.1, which is more than 1", keywords: ["1.1", "more than 1", "greater than 1", "bigger than 1"] },
            {
              point: "So they must overlap: if mutually exclusive, P(A or B) would be 1.1, which is impossible",
              keywords: ["overlap", "impossible", "both", "together", "can't", "cannot"],
            },
            { point: "Smallest P(A and B) = 0.1, since the overlap must be at least 1.1 − 1", keywords: ["0.1", "1.1 - 1", "at least"] },
            {
              point: "A valid example or Venn diagram: A only 0.5, both 0.1, B only 0.4, neither 0",
              keywords: ["0.5", "0.4", "neither", "venn", "example", "1 to 10"],
            },
          ],
          commonError: "Saying the smallest value is 0 — that would make A and B mutually exclusive, which part (a) rules out.",
          difficulty: "challenge",
          guideRef: "two-way-tables-venn",
          hints: [
            "What would P(A or B) be if A and B couldn't happen together?",
            "Can any probability be more than 1?",
            "Draw a Venn diagram. Its four regions add up to 1 — how small can the overlap be?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "probability-p1-q20",
          question:
            "A pencil case holds 5 blue pens and 3 red pens. Ethan takes out two pens at random, one after the other, **without** putting the first one back. What is the probability that at least one of the two pens is red? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 9, d: 14, simplest: true },
          solution: [
            "Use the complement: 'at least one red' is the opposite of 'both blue'.",
            "P(first blue) = {{5/8}}. That leaves 4 blue pens out of 7, so P(second blue) = {{4/7}}.",
            "P(both blue) = {{5/8 * 4/7 = 20/56 = 5/14}}.",
            "P(at least one red) = {{1 - 5/14 = 9/14}}.",
          ],
          solutions: [
            {
              label: "Add the paths on a tree diagram",
              steps: [
                "P(red, red) = {{3/8 * 2/7 = 6/56}}.",
                "P(red, blue) = {{3/8 * 5/7 = 15/56}}.",
                "P(blue, red) = {{5/8 * 3/7 = 15/56}}.",
                "Total = {{36/56 = 9/14}}. The complement needs one path instead of three, so it's quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 39, d: 64 },
              feedback: "{{39/64}} treats the first pen as if it were put back. Without replacement, the second pick is from 7 pens, not 8.",
            },
            {
              spec: { type: "fraction", n: 15, d: 28 },
              feedback: "{{15/28}} is the probability of **exactly** one red. 'At least one' also includes two reds.",
            },
          ],
          commonError: "Keeping the denominator as 8 for the second pick.",
          difficulty: "challenge",
          guideRef: "tree-diagrams",
          hints: [
            "What is the opposite of 'at least one red'?",
            "Find P(both blue). After one blue pen is taken, how many pens — and how many blue pens — are left?",
            "Subtract P(both blue) from 1.",
          ],
          strategy: "Use the complement",
        },
      ],
    },
    {
      id: "probability-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "probability-p2-q01",
          question:
            "This spinner is fair, but its four sectors are different sizes: red 135°, blue 90°, green 75° and yellow 60°. What is the probability that it lands on red? Give your answer as a fraction in its simplest form.",
          diagram: spinnerAngles,
          answer: { type: "fraction", n: 3, d: 8, simplest: true },
          solution: [
            "A full turn is 360°, and the chance of red is the fraction of the turn that is red.",
            "P(red) = {{135/360}}.",
            "Divide the top and bottom by 45: {{135/360 = 3/8}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 4 },
              feedback: "There are 4 sectors, but they're different sizes, so they aren't equally likely. Use the angles.",
            },
          ],
          difficulty: "warmup",
          guideRef: "probability-scale",
          hints: ["What fraction of the whole 360° is the red sector?", "Simplify {{135/360}} — try dividing by 45."],
        },
        {
          kind: "short",
          id: "probability-p2-q02",
          question:
            "In a football match, the probability that Ethan's team wins is 0.45 and the probability of a draw is 0.2. What is the probability that the team loses? Give your answer as a decimal.",
          answer: { type: "number", value: 0.35, allowFraction: false },
          solution: [
            "Win, draw and lose are mutually exclusive and cover every possibility, so their probabilities add up to 1.",
            "P(lose) = 1 − 0.45 − 0.2 = 0.35.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.55 },
              feedback: "1 − 0.45 is P(not win), and 'not win' includes draws. Subtract the draw as well.",
            },
          ],
          difficulty: "warmup",
          guideRef: "complementary-events",
          hints: ["What are all the possible results of a match?", "Their probabilities must add up to 1."],
        },
        {
          kind: "short",
          id: "probability-p2-q03",
          question:
            "Hana flips three different coins: a 10-cent, a 20-cent and a 50-cent coin. Each lands heads or tails. How many different outcomes are possible?",
          answer: { type: "number", value: 8 },
          solution: [
            "Each coin has 2 outcomes.",
            "Product rule: 2 × 2 × 2 = 8.",
            "Listed systematically: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.",
          ],
          traps: [
            {
              spec: { type: "number", value: 4 },
              feedback: "4 counts the possible numbers of heads (0, 1, 2 or 3). But HHT, HTH and THH are different outcomes — the heads are on different coins.",
            },
            {
              spec: { type: "number", value: 6 },
              feedback: "2 + 2 + 2 adds the choices. Each result for the first coin goes with every result for the others, so multiply.",
            },
          ],
          difficulty: "warmup",
          guideRef: "sample-spaces",
          hints: ["How many outcomes does each coin have?", "Try listing them: start with every outcome where the 10-cent coin shows heads."],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p2-q04",
          question: "A spinner is spun 400 times. The relative frequency of it landing on red is 0.3. How many times did it land on red?",
          answer: { type: "number", value: 120 },
          solution: [
            "Relative frequency = number of reds ÷ 400, so number of reds = 0.3 × 400.",
            "0.3 × 400 = 120.",
          ],
          traps: [
            { spec: { type: "number", value: 280 }, feedback: "280 is the number of times it did **not** land on red." },
          ],
          difficulty: "warmup",
          guideRef: "relative-frequency",
          hints: ["Relative frequency = number of reds ÷ number of spins. Undo the division."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "probability-p2-q05",
          question:
            "A fair spinner has 5 equal sectors numbered 1, 2, 3, 4 and 5. It is spun 150 times. How many times would you expect it to land on an even number?",
          answer: { type: "number", value: 60 },
          solution: ["The even numbers are 2 and 4, so P(even) = {{2/5}}.", "Expected number = {{2/5}} × 150 = 60."],
          traps: [
            {
              spec: { type: "number", value: 75 },
              feedback: "Half of 150 is 75 — but only 2 of the 5 numbers are even, so P(even) = {{2/5}}, not {{1/2}}.",
            },
          ],
          difficulty: "warmup",
          guideRef: "expected-outcomes",
          hints: ["Which numbers on the spinner are even?", "Expected number = probability × number of spins."],
        },
        {
          kind: "short",
          id: "probability-p2-q06",
          question:
            "A bag contains only red, blue and green counters. When a counter is picked at random, P(red) = 0.35 and P(blue) = 0.25. There are 24 green counters. How many counters are in the bag altogether?",
          answer: { type: "number", value: 60 },
          solution: [
            "P(green) = 1 − 0.35 − 0.25 = 0.4.",
            "So 0.4 of all the counters are green: 0.4 × total = 24.",
            "Total = 24 ÷ 0.4 = 60.",
            "Check: 0.35 × 60 = 21 red, 0.25 × 60 = 15 blue, 24 green; 21 + 15 + 24 = 60 ✓.",
          ],
          traps: [
            {
              spec: { type: "number", value: 40 },
              feedback: "0.6 is P(red or blue), not P(green). P(green) = 1 − 0.6 = 0.4, so the total is 24 ÷ 0.4.",
            },
          ],
          commonError: "Dividing 24 by 0.6 (red or blue) instead of 0.4 (green).",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: ["Start by finding P(green).", "If 0.4 of the bag is 24 counters, how many counters is the whole bag?", "Total = 24 ÷ P(green)."],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "probability-p2-q07",
          question:
            "A padlock has 3 dials, each showing a digit from 0 to 9. Arjun says: “There are 10 + 10 + 10 = 30 possible codes.”\n\n(a) Explain why Arjun is wrong and find the correct number of codes.\n\n(b) Find the probability that a random guess opens the lock first time.",
          marks: 3,
          modelAnswer:
            "(a) Arjun should multiply, not add. Each of the 10 digits on the first dial can be followed by any of the 10 digits on the second, giving 10 × 10 = 100 pairs (00 to 99). Each pair can be followed by any of the 10 digits on the third dial, so there are 10 × 10 × 10 = 1000 codes — every number from 000 to 999.\n\n(b) Exactly one of the 1000 equally likely codes is correct, so P(opens first time) = {{1/1000}} = 0.001.",
          markScheme: [
            {
              point: "Explains that each choice on one dial goes with every choice on the others, so multiply (product rule) rather than add",
              keywords: ["multiply", "each", "every", "product rule", "times", "not add"],
            },
            { point: "Correct total: 10 × 10 × 10 = 1000 codes (000 to 999)", keywords: ["1000", "000", "999", "10 × 10 × 10", "10x10x10"] },
            { point: "P(opens first time) = {{1/1000}}", keywords: ["1/1000", "0.001", "1 in 1000"] },
          ],
          commonError: "Adding the choices for each dial instead of multiplying.",
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "Fix the first dial at 0. How many different codes start with 0?",
            "So how many codes are there for each first digit — and how many first digits are there?",
            "Exactly one code out of all of them is correct.",
          ],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p2-q08",
          question:
            "A fair dice is rolled and a fair spinner numbered 1, 2, 3 and 4 is spun. The two scores are added. What is the probability that the total is a prime number? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 11, d: 24, simplest: true },
          solution: [
            "Sample space: 6 × 4 = 24 equally likely (dice, spinner) pairs.",
            "The totals run from 2 to 10, and the primes among them are 2, 3, 5 and 7.",
            "Count by spinner score. Spinner 1: dice 1, 2, 4, 6 (totals 2, 3, 5, 7) — 4 ways. Spinner 2: dice 1, 3, 5 (totals 3, 5, 7) — 3 ways. Spinner 3: dice 2, 4 (totals 5, 7) — 2 ways. Spinner 4: dice 1, 3 (totals 5, 7) — 2 ways.",
            "4 + 3 + 2 + 2 = 11 cells, so P(prime total) = {{11/24}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 4, d: 9 },
              feedback: "4 of the 9 possible totals (2 to 10) are prime, but the totals aren't equally likely. Count the 24 equally likely cells instead.",
            },
          ],
          commonError: "Treating the possible totals as equally likely, or forgetting that 2 is prime.",
          difficulty: "core",
          guideRef: "combined-events",
          hints: [
            "Draw a 6 × 4 sample space grid of totals.",
            "Which totals from 2 to 10 are prime?",
            "Count the cells with a prime total and divide by 24.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p2-q09",
          question:
            "Aisha, Ben, Chen and Dev line up in a random order for a photo. What is the probability that they stand in alphabetical order (Aisha, Ben, Chen, Dev) from left to right? Give your answer as a fraction.",
          answer: { type: "fraction", n: 1, d: 24, simplest: true },
          solution: [
            "Number of possible orders: 4 choices for the left-most place, then 3, then 2, then 1: 4 × 3 × 2 × 1 = 24.",
            "All 24 orders are equally likely, and exactly one of them is alphabetical.",
            "P(alphabetical) = {{1/24}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 4 },
              feedback: "{{1/4}} is just the chance that Aisha is on the left. The other three must also be in order.",
            },
            {
              spec: { type: "fraction", n: 1, d: 16 },
              feedback: "4 × 4 = 16 would let one person stand in two places. Once a person is placed, there's one fewer choice: 4 × 3 × 2 × 1.",
            },
          ],
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "How many people could stand in the left-most place?",
            "Once that place is filled, how many choices are there for the next place?",
            "How many of all the possible orders are alphabetical?",
          ],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p2-q10",
          question:
            "In a class of 32 students, 14 are in the choir, 11 are in the robotics club and 4 are in both. A student is chosen at random. What is the probability that they are in neither the choir nor the robotics club? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 11, d: 32, simplest: true },
          solution: [
            "Start with the overlap: 4 students do both.",
            "Choir only: 14 − 4 = 10. Robotics only: 11 − 4 = 7.",
            "In at least one: 10 + 4 + 7 = 21. Neither: 32 − 21 = 11.",
            "P(neither) = {{11/32}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 7, d: 32 },
              feedback: "32 − 14 − 11 = 7 counts the 4 students who do both twice. Fill the Venn diagram from the overlap outwards.",
            },
          ],
          commonError: "Subtracting both club totals from 32 and double-counting the overlap.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Draw a Venn diagram and fill in the overlap first.",
            "How many students are in the choir only? In robotics only?",
            "Subtract everyone inside the circles from 32.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "probability-p2-q11",
          question:
            "A survey of 100 customers at a hawker centre recorded their age group and the drink they chose.\n\n| | Kopi | Teh | Juice | Total |\n|---|---|---|---|---|\n| Under 30 | 12 | 8 | 20 | 40 |\n| 30 and over | 25 | 15 | 20 | 60 |\n| Total | 37 | 23 | 40 | 100 |\n\nRani says: “20 people in each age group chose juice, so age makes no difference to choosing juice.” Marcus disagrees.\n\nWho is right? Use probabilities to explain.",
          marks: 4,
          modelAnswer:
            "Marcus is right. You have to compare the probability **within** each age group, not the raw counts.\n\nFor a customer under 30, P(juice) = {{20/40 = 1/2}}. For a customer aged 30 and over, P(juice) = {{20/60 = 1/3}}. Since {{1/2}} is bigger than {{1/3}}, an under-30 customer is more likely to choose juice.\n\nThe counts are equal only because the groups are different sizes: 20 out of 40 is a much bigger share than 20 out of 60.",
          markScheme: [
            { point: "P(juice) for under 30 = {{20/40 = 1/2}}", keywords: ["20/40", "1/2", "0.5", "50%"] },
            { point: "P(juice) for 30 and over = {{20/60 = 1/3}}", keywords: ["20/60", "1/3", "0.33", "33"] },
            {
              point: "Concludes Marcus is right: under-30s are more likely to choose juice",
              keywords: ["marcus", "more likely", "greater", "bigger", "rani is wrong", "higher"],
            },
            {
              point: "Explains that equal counts don't mean equal probabilities because the groups are different sizes",
              keywords: ["different sizes", "different size", "out of", "40", "60", "group size", "share"],
            },
          ],
          commonError: "Comparing the counts (20 and 20) instead of the probabilities within each group.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "The counts are equal — but are the two groups the same size?",
            "Find P(juice) for a customer under 30, using that row's total.",
            "Now do the same for the 30-and-over row, and compare.",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "short",
          id: "probability-p2-q12",
          question:
            "Aisha, Jun and Priya each drop the same paper cup many times and count how often it lands on its side.\n\n| | Aisha | Jun | Priya |\n|---|---|---|---|\n| Drops | 40 | 60 | 100 |\n| On its side | 12 | 21 | 37 |\n\nUsing all the results, what is the best estimate of the probability that the cup lands on its side? Give your answer as a decimal.",
          answer: { type: "number", value: 0.35, allowFraction: false },
          solution: [
            "Pool all the results: 12 + 21 + 37 = 70 times on its side.",
            "Total drops: 40 + 60 + 100 = 200.",
            "Best estimate = 70 ÷ 200 = 0.35.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.34 },
              feedback: "0.34 is the mean of the three relative frequencies (0.3, 0.35 and 0.37). That treats Aisha's 40 drops as just as reliable as Priya's 100. Pool the totals instead.",
            },
            {
              spec: { type: "number", value: 0.37 },
              feedback: "Priya did the most drops, but using **all** 200 drops gives an even better estimate.",
            },
          ],
          commonError: "Averaging the three relative frequencies instead of pooling the results.",
          difficulty: "core",
          guideRef: "relative-frequency",
          hints: [
            "Which gives the most reliable estimate: one person's results, or everyone's together?",
            "Add up all the 'on its side' results, and all the drops.",
            "Divide the total number of successes by the total number of drops.",
          ],
          strategy: "Pool the results",
        },
        {
          kind: "short",
          id: "probability-p2-q13",
          question:
            "At a school carnival, a game costs $2 to play. The probability of winning is {{1/8}}, and each winner gets a $10 prize. 240 people play. How much profit should the stall expect to make? Give your answer in dollars.",
          answer: { type: "number", value: 180, display: "$180" },
          solution: [
            "Money taken: 240 × $2 = $480.",
            "Expected number of winners: {{1/8}} × 240 = 30.",
            "Expected prize money: 30 × $10 = $300.",
            "Expected profit: $480 − $300 = $180.",
          ],
          traps: [
            { spec: { type: "number", value: 480 }, feedback: "$480 is the money taken in. Subtract the prize money the stall expects to pay out." },
            { spec: { type: "number", value: 300 }, feedback: "$300 is the expected prize money, not the profit. Profit = money in − money out." },
          ],
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: [
            "How much money does the stall take in from 240 players?",
            "How many winners would you expect out of 240 players?",
            "Profit = money taken in − prize money paid out.",
          ],
        },
        {
          kind: "short",
          id: "probability-p2-q14",
          question:
            "Four fair coins are flipped. What is the probability of getting at least one head? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 15, d: 16, simplest: true },
          solution: [
            "There are 2 × 2 × 2 × 2 = 16 equally likely outcomes.",
            "The only outcome with no heads is TTTT, so P(no heads) = {{1/16}}.",
            "P(at least one head) = 1 − P(no heads) = {{1 - 1/16 = 15/16}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 4, d: 5 },
              feedback: "The numbers of heads (0, 1, 2, 3 or 4) aren't equally likely. Use the 16 equally likely outcomes.",
            },
            {
              spec: { type: "fraction", n: 1, d: 16 },
              feedback: "{{1/16}} is the probability of **no** heads. 'At least one head' is everything else.",
            },
          ],
          difficulty: "core",
          guideRef: "complementary-events",
          hints: [
            "How many equally likely outcomes are there for four coins?",
            "What is the opposite of 'at least one head'?",
            "Subtract the probability of that opposite event from 1.",
          ],
          strategy: "Use the complement",
        },
        {
          kind: "written",
          id: "probability-p2-q15",
          question:
            "A fair coin has just landed heads 6 times in a row. Siti says: “The next flip is more likely to be tails — tails is due.” Mei says: “The next flip is more likely to be heads — the coin is on a streak.”\n\nWho is right? Explain.",
          marks: 3,
          modelAnswer:
            "Neither of them. Flips of a fair coin are **independent**: the coin has no memory of what happened before, so on the next flip P(tails) is still {{1/2}}, and so is P(heads).\n\nSix heads in a row is unusual — its probability is {{(1/2)^6 = 1/64}} — but it has already happened and doesn't change the next flip. Over a very long run the proportion of heads does get close to {{1/2}}, not because tails 'catch up', but because thousands of later flips swamp a short streak.",
          markScheme: [
            { point: "Neither is right: on the next flip P(tails) = P(heads) = {{1/2}}", keywords: ["neither", "1/2", "0.5", "50%", "still"] },
            {
              point: "The flips are independent — the coin has no memory of earlier results",
              keywords: ["independent", "memory", "remember", "not affected", "doesn't affect", "does not affect"],
            },
            {
              point: "Deals with the streak: it is unusual ({{1/64}}) but later flips swamp it rather than tails 'catching up'",
              keywords: ["1/64", "long run", "unusual", "swamp", "catch up", "many flips", "more flips"],
            },
          ],
          commonError: "Agreeing with Siti that tails is 'due' (the gambler's fallacy).",
          difficulty: "core",
          guideRef: "tree-diagrams",
          hints: [
            "Does the coin know what it landed on before?",
            "What is P(tails) for any single flip of a fair coin?",
            "Does six heads in a row mean the results have to 'balance out' soon?",
          ],
        },
        {
          kind: "short",
          id: "probability-p2-q16",
          question:
            "In any game of chess, the probability that Ravi beats Jun is 0.6, independently of other games, and there are no draws. They play two games. What is the probability that Ravi wins at least one game? Give your answer as a decimal.",
          answer: { type: "number", value: 0.84, allowFraction: false },
          solution: [
            "The opposite of 'Ravi wins at least one' is 'Jun wins both'.",
            "P(Jun wins a game) = 1 − 0.6 = 0.4.",
            "P(Jun wins both) = 0.4 × 0.4 = 0.16.",
            "P(Ravi wins at least one) = 1 − 0.16 = 0.84.",
          ],
          solutions: [
            {
              label: "Add the tree-diagram paths",
              steps: [
                "Paths with at least one Ravi win: win–win, win–lose, lose–win.",
                "0.6 × 0.6 + 0.6 × 0.4 + 0.4 × 0.6 = 0.36 + 0.24 + 0.24 = 0.84.",
                "The complement uses one path instead of three, so it's quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 1.2 },
              feedback: "0.6 + 0.6 = 1.2 is more than 1, so it can't be a probability. Adding counts 'wins both' twice.",
            },
            { spec: { type: "number", value: 0.48 }, feedback: "0.48 is the probability that Ravi wins **exactly** one game. Include winning both." },
          ],
          difficulty: "core",
          guideRef: "tree-diagrams",
          hints: [
            "What is the opposite of 'Ravi wins at least one game'?",
            "Find P(Jun wins both) by multiplying along the tree.",
            "Subtract that from 1.",
          ],
          strategy: "Use the complement",
        },
        {
          kind: "short",
          id: "probability-p2-q17",
          question:
            "A bag contains only red, blue and green marbles. When a marble is picked at random, P(red) = {{1/4}} and P(blue) = {{1/3}}. There are 10 more green marbles than red marbles. How many marbles are in the bag?",
          answer: { type: "number", value: 60 },
          solution: [
            "P(green) = {{1 - 1/4 - 1/3 = 12/12 - 3/12 - 4/12 = 5/12}}.",
            "In twelfths of the bag: red is {{3/12}} and green is {{5/12}}.",
            "Green − red = {{2/12 = 1/6}} of the bag, and this is 10 marbles.",
            "So the bag holds 6 × 10 = 60 marbles. Check: 15 red, 20 blue, 25 green, and 25 − 15 = 10 ✓.",
          ],
          solutions: [
            {
              label: "Introduce a variable",
              steps: [
                "Let the total be {{n}}. Red = {{1/4 n}} and green = {{5/12 n}}.",
                "{{5/12 n - 3/12 n = 10}}, so {{2/12 n = 10}}.",
                "{{n = 60}}. Thinking in twelfths (the first method) is the same idea without the algebra, and a bar model makes it quick.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 120 },
              feedback: "{{5/12 - 4/12 = 1/12}} compares green with **blue**. The 10 extra marbles are compared with red: {{5/12 - 3/12}}.",
            },
          ],
          commonError: "Comparing green with the wrong colour, or forgetting to find P(green) first.",
          difficulty: "challenge",
          guideRef: "complementary-events",
          hints: [
            "What is P(green)?",
            "Write all three probabilities in twelfths.",
            "The difference between green and red is how many twelfths of the bag? That's 10 marbles.",
          ],
          strategy: "Use a bar model",
        },
        {
          kind: "short",
          id: "probability-p2-q18",
          question:
            "Two fair dice are rolled. Find the probability that the **larger** of the two scores is 4. (If both dice show the same score, that score counts as the larger one.) Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 7, d: 36, simplest: true },
          solution: [
            "Larger score at most 4 means both scores are in {1, 2, 3, 4}: 4 × 4 = 16 cells.",
            "Larger score at most 3 means both scores are in {1, 2, 3}: 3 × 3 = 9 cells.",
            "Larger score exactly 4: 16 − 9 = 7 cells.",
            "P = {{7/36}}.",
          ],
          solutions: [
            {
              label: "List the cells",
              steps: [
                "The larger score is 4 when one dice shows 4 and the other shows 4 or less.",
                "(4, 1), (4, 2), (4, 3), (4, 4), (1, 4), (2, 4), (3, 4) — 7 cells.",
                "P = {{7/36}}. Listing works here, but the square-counting method is slicker: for a larger score of 6 it gives 36 − 25 = 11 cells instantly.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 11, d: 36 },
              feedback: "{{11/36}} is the probability of at least one 4. But (4, 6) has a larger score of 6, not 4 — the other dice must show 4 or less.",
            },
            {
              spec: { type: "fraction", n: 1, d: 6 },
              feedback: "The six possible larger scores aren't equally likely: a larger score of 1 needs (1, 1), but a larger score of 6 happens in 11 ways.",
            },
          ],
          commonError: "Counting every cell that contains a 4, including ones like (4, 6).",
          difficulty: "challenge",
          guideRef: "combined-events",
          hints: [
            "Shade the cells of the 6 × 6 grid where the larger score is 4. What shape do they make?",
            "How many cells have both scores 4 or less? How many have both scores 3 or less?",
            "The cells you want are the difference between those two squares.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "written",
          id: "probability-p2-q19",
          question:
            "Priya says: “On one roll of a dice, P(six) = {{1/6}}. So if I roll a dice 6 times, P(at least one six) = {{6 * 1/6 = 1}}. I'm certain to get a six!”\n\nExplain what is wrong with Priya's argument, and describe a correct way to find P(at least one six in 6 rolls).",
          marks: 4,
          modelAnswer:
            "Priya's answer can't be right: it's possible to roll no sixes at all (for example 1, 3, 2, 5, 4, 1), so getting a six is not certain. Her method would also give 7 rolls a probability of {{7/6}}, which is impossible.\n\nHer mistake is adding the probabilities of events that are **not mutually exclusive**: she could get a six on roll 1 **and** on roll 2, so outcomes with several sixes are counted more than once.\n\nA correct method uses the complement. The rolls are independent and P(not six) = {{5/6}} each time, so P(no six in 6 rolls) = {{(5/6)^6}} ≈ 0.335. So P(at least one six) = 1 − 0.335 ≈ 0.665 — about two chances in three.",
          markScheme: [
            {
              point: "It isn't certain: you could roll no sixes (gives an example, or notes 7 rolls would give more than 1)",
              keywords: ["no sixes", "no six", "not certain", "possible", "could", "7/6", "more than 1"],
            },
            {
              point: "Adding only works for mutually exclusive events; sixes on different rolls can happen together, so outcomes are counted more than once",
              keywords: ["mutually exclusive", "twice", "more than once", "overlap", "double", "together"],
            },
            { point: "Uses the complement: P(no six in 6 rolls) = {{(5/6)^6}}", keywords: ["5/6", "complement", "1 -", "(5/6)^6"] },
            { point: "Gets P(at least one six) ≈ 0.665 (about 0.67)", keywords: ["0.665", "0.67", "0.66", "0.335", "2/3", "two thirds"] },
          ],
          solutions: [
            {
              label: "The calculation",
              steps: [
                "P(no six on one roll) = {{5/6}}.",
                "P(no six in 6 independent rolls) = {{(5/6)^6 = 15625/46656}} ≈ 0.335.",
                "P(at least one six) = 1 − 0.335 ≈ 0.665.",
              ],
            },
          ],
          commonError: "Saying 'it's just unlikely' without explaining why adding the probabilities is wrong.",
          difficulty: "challenge",
          guideRef: "complementary-events",
          hints: [
            "Is it really impossible to roll a dice 6 times and get no sixes?",
            "When are you allowed to add probabilities? Can 'six on roll 1' and 'six on roll 2' both happen?",
            "What's the opposite of 'at least one six'? Find its probability by multiplying along a tree.",
          ],
          strategy: "Use the complement",
        },
        {
          kind: "short",
          id: "probability-p2-q20",
          question:
            "A coin is hidden under one of three cups, each equally likely. Mei points to one cup. Then Ravi, who knows where the coin is, lifts one of the **other two** cups — always one that is empty — and shows it to Mei. Mei can stick with her cup or switch to the last cup. What is the probability that she finds the coin if she **switches**? Give your answer as a fraction.",
          answer: { type: "fraction", n: 2, d: 3, simplest: true },
          solution: [
            "Mei's first pick is right with probability {{1/3}} and wrong with probability {{2/3}}.",
            "If her first pick is right, switching loses.",
            "If her first pick is wrong, the coin is under one of the other two cups. Ravi must lift the empty one, so the last cup has the coin — switching wins.",
            "So switching wins exactly when her first pick was wrong: P = {{2/3}}.",
          ],
          solutions: [
            {
              label: "List every case",
              steps: [
                "Call Mei's cup A. The coin is under A, B or C, each with probability {{1/3}}.",
                "Coin under A: Ravi lifts B or C, and switching loses.",
                "Coin under B: Ravi must lift C, and switching to B wins.",
                "Coin under C: Ravi must lift B, and switching to C wins.",
                "Switching wins in 2 of the 3 equally likely cases: {{2/3}}. The first method is slicker — it needs only one idea.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 2 },
              feedback: "Two cups are left, but they aren't equally likely. Ravi's choice wasn't random — he had to avoid the coin — so it gives information. When does switching win?",
            },
            { spec: { type: "fraction", n: 1, d: 3 }, feedback: "{{1/3}} is the chance of winning by **sticking**. Switching wins in all the other cases." },
          ],
          commonError: "Assuming the two remaining cups must be equally likely.",
          difficulty: "challenge",
          guideRef: "combined-events",
          hints: [
            "What is the probability that Mei's first pick is correct?",
            "Suppose her first pick is wrong. Ravi can't lift the coin's cup — so where must the coin be?",
            "Switching wins exactly when her first pick was wrong.",
          ],
          strategy: "Split into cases",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET — AoPS / UKMT Junior style; all difficulty "challenge"
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "probability-ch-q01",
      question:
        "A bag contains only red and green counters. If a counter is picked at random, P(red) = {{2/5}}. Ravi adds 6 more red counters to the bag, and now P(red) = {{1/2}}. How many counters were in the bag **before** Ravi added any?",
      answer: { type: "number", value: 30 },
      solution: [
        "Let the starting total be {{n}}. Then red = {{2/5 n}} and green = {{3/5 n}}.",
        "Key insight: adding red counters doesn't change the number of **green** counters.",
        "At the end P(red) = {{1/2}}, so there are equal numbers of red and green: {{2/5 n + 6 = 3/5 n}}.",
        "So {{1/5 n = 6}}, giving {{n = 30}}.",
        "Check: 12 red and 18 green at the start ({{12/30 = 2/5}} ✓). After adding 6 red: 18 red and 18 green, so P(red) = {{1/2}} ✓.",
      ],
      solutions: [
        {
          label: "Method 2: an equation for the new probability (slower)",
          steps: [
            "After adding 6 red counters: {{(2/5 n + 6)/(n + 6) = 1/2}}.",
            "Multiply both sides by {{2(n + 6)}}: {{4/5 n + 12 = n + 6}}.",
            "So {{6 = 1/5 n}}, giving {{n = 30}}.",
            "This works, but spotting the invariant (green never changes) gives {{2/5 n + 6 = 3/5 n}} straight away — the slicker route.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 12 }, feedback: "12 is the number of red counters at the start. The question asks for all the counters." },
        { spec: { type: "number", value: 36 }, feedback: "36 is the total **after** Ravi adds 6 counters. How many were there before?" },
      ],
      commonError: "Treating the total as fixed — it changes from {{n}} to {{n + 6}}.",
      difficulty: "challenge",
      guideRef: "probability-scale",
      hints: [
        "When Ravi adds red counters, what stays the same?",
        "What fraction of the starting bag is green? What does P(red) = {{1/2}} at the end tell you about red and green?",
        "At the end, red = green. Write both in terms of the starting total {{n}}.",
        "The 6 new counters close the gap between {{2/5 n}} and {{3/5 n}}.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "probability-ch-q02",
      question:
        "A whole number from 1 to 100 inclusive is chosen at random. What is the probability that at least one of its digits is a 7? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 19, d: 100, simplest: true },
      solution: [
        "Numbers with a 7 in the units place: 7, 17, 27, …, 97 — that's 10 numbers.",
        "Numbers with a 7 in the tens place: 70, 71, …, 79 — another 10.",
        "77 is on both lists, so it has been counted twice: 10 + 10 − 1 = 19 numbers.",
        "P(at least one 7) = {{19/100}}.",
      ],
      solutions: [
        {
          label: "Method 2: count the complement",
          steps: [
            "Count the numbers with **no** 7. Write 0 to 99 as two-digit strings 00 to 99.",
            "Each digit can be any of the 9 digits other than 7: 9 × 9 = 81 strings have no 7.",
            "Swap 00 for 100 (neither contains a 7): so 81 of the numbers 1 to 100 have no 7, and 100 − 81 = 19 do.",
            "P = {{19/100}}. This method is slicker for bigger ranges: from 1 to 1000, 9 × 9 × 9 = 729 numbers have no 7, so 271 contain one — no fiddly double-counting needed.",
          ],
        },
      ],
      traps: [
        { spec: { type: "fraction", n: 1, d: 5 }, feedback: "{{20/100}} counts 77 twice — it has a 7 in both places." },
        {
          spec: { type: "fraction", n: 1, d: 10 },
          feedback: "{{10/100}} only counts a 7 in one place. Numbers like 70 to 79 have a 7 in the tens place.",
        },
      ],
      commonError: "Counting 77 twice.",
      difficulty: "challenge",
      guideRef: "complementary-events",
      hints: [
        "Would it be easier to count the numbers that **do** contain a 7, or the ones that don't?",
        "Count the numbers with a 7 in the units place, then those with a 7 in the tens place.",
        "Has any number been counted twice?",
      ],
      strategy: "Use the complement",
    },
    {
      kind: "short",
      id: "probability-ch-q03",
      question:
        "Three fair dice are rolled and the scores are added. There are 6 × 6 × 6 = 216 equally likely outcomes (first dice, second dice, third dice). A total of 9 and a total of 10 can each be split into three dice scores in exactly six ways — for example 10 = 6 + 3 + 1 = 6 + 2 + 2 = 5 + 4 + 1 = 5 + 3 + 2 = 4 + 4 + 2 = 4 + 3 + 3. Yet 400 years ago, Italian gamblers noticed that 10 turns up more often than 9.\n\nHow many of the 216 outcomes give a total of 10, and how many give a total of 9? Give the two numbers, the total-10 count first.",
      answer: { type: "list", values: [27, 25], ordered: true, display: "27 (total 10), 25 (total 9)" },
      solution: [
        "A split is not one outcome: the three dice can show its scores in different orders.",
        "Three different scores (like 6, 3, 1) can be arranged in 3 × 2 × 1 = 6 orders. Two the same (like 6, 2, 2) in 3 orders — the odd one out can be on any of the 3 dice. All three the same (3, 3, 3) in just 1 order.",
        "Total 10: 6+3+1 (6), 6+2+2 (3), 5+4+1 (6), 5+3+2 (6), 4+4+2 (3), 4+3+3 (3). Sum: 27.",
        "Total 9: 6+2+1 (6), 5+3+1 (6), 5+2+2 (3), 4+4+1 (3), 4+3+2 (6), 3+3+3 (1). Sum: 25.",
        "So P(10) = {{27/216 = 1/8}} and P(9) = {{25/216}}. The culprit is 3 + 3 + 3, which can happen in only one way.",
      ],
      solutions: [
        {
          label: "Method 2: fix the first dice",
          steps: [
            "With two dice, a total of {{s}} can be made in {{s - 1}} ways when {{s <= 7}}, and in {{13 - s}} ways when {{s >= 7}}.",
            "Total 10: the first dice shows 1 to 6, so the other two must make 9, 8, 7, 6, 5 or 4: 4 + 5 + 6 + 5 + 4 + 3 = 27.",
            "Total 9: the other two must make 8, 7, 6, 5, 4 or 3: 5 + 6 + 5 + 4 + 3 + 2 = 25.",
            "This is quicker if you know the two-dice table, but Method 1 explains **why** the two totals differ.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "list", values: [6, 6], ordered: true },
          feedback: "Six splits each — but the splits aren't equally likely. (6, 3, 1) can be rolled in 6 different orders, (6, 2, 2) in 3 and (3, 3, 3) in only 1.",
        },
        { spec: { type: "list", values: [25, 27], ordered: true }, feedback: "Right numbers, wrong order — give the count for a total of 10 first." },
      ],
      commonError: "Treating each split as a single outcome, as the gamblers did.",
      difficulty: "challenge",
      guideRef: "sample-spaces",
      hints: [
        "Is rolling 6, 3, 1 one outcome or several? Imagine the dice are red, blue and green.",
        "How many orders are there for three different scores? For two the same and one different? For all three the same?",
        "Give each split a weight — 6, 3 or 1 — and add up the weights for each total.",
        "Compare the splits for 9 and 10. Which split has the smallest weight?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "probability-ch-q04",
      question:
        "A red dice and a blue dice, both fair, are rolled. What is the probability that the red score is **higher** than the blue score? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 5, d: 12, simplest: true },
      solution: [
        "P(the two scores are equal) = {{6/36 = 1/6}} — the six doubles.",
        "So P(the scores are different) = {{1 - 1/6 = 5/6}}.",
        "By symmetry, when the scores differ, red is just as likely to be higher as blue is: swapping the colours swaps the two events.",
        "P(red higher) = {{1/2 * 5/6 = 5/12}}.",
      ],
      solutions: [
        {
          label: "Method 2: count the cells",
          steps: [
            "If blue shows 1, red can be 2 to 6: 5 ways. Blue 2: 4 ways. Blue 3: 3. Blue 4: 2. Blue 5: 1. Blue 6: 0.",
            "5 + 4 + 3 + 2 + 1 = 15 cells out of 36.",
            "P = {{15/36 = 5/12}}. The symmetry method is slicker: it only needs the doubles, and for two 20-sided dice it gives {{1/2 * 19/20 = 19/40}} just as fast.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 2 },
          feedback: "Don't forget ties. Red and blue are equally likely to be higher, but {{1/6}} of the time the scores are equal.",
        },
        {
          spec: { type: "fraction", n: 5, d: 6 },
          feedback: "{{5/6}} is the chance that the scores are **different**. Red is higher in only half of those cases.",
        },
      ],
      commonError: "Answering {{1/2}} and forgetting that the scores can be equal.",
      difficulty: "challenge",
      guideRef: "combined-events",
      hints: [
        "How likely is it that the two scores are equal?",
        "If the scores are different, is red or blue more likely to be the higher one?",
        "Split the 'different' probability fairly between red and blue.",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "probability-ch-q05",
      question:
        "A bag holds 3 red and 4 blue counters. Zara repeats this move: she takes out two counters at random. If they are the **same** colour, she puts one blue counter into the bag (from a big spare pile). If they are **different** colours, she puts one red counter into the bag. Each move leaves one fewer counter in the bag, so in the end only one counter is left.\n\nWhat is the probability that the last counter is red? Give your answer as a number.",
      answer: { type: "number", value: 1, display: "1 (certain)" },
      solution: [
        "Track the number of **red** counters through each kind of move.",
        "Two reds out, one blue in: the reds go down by 2.",
        "Two blues out, one blue in: the reds don't change.",
        "One red and one blue out, one red in: the reds don't change.",
        "So the number of reds always changes by 0 or 2. It starts at 3, so it stays **odd** for ever.",
        "An odd number is never 0, so there is always at least one red counter in the bag. When only one counter is left, it must be red.",
        "So the probability is 1: it's certain, however the draws go.",
      ],
      solutions: [
        {
          label: "Method 2: try small cases first",
          steps: [
            "1 red, 1 blue: the only move takes one of each and puts in a red. Last counter: red.",
            "1 red, 2 blues: two blues out leaves 1 red and 1 blue (then red, as above); a red and a blue out leaves 1 red and 1 blue again. Always red.",
            "2 reds, 1 blue: two reds out leaves 2 blues, then 1 blue; a red and a blue out leaves 2 reds, then 1 blue. Always blue!",
            "Pattern: the answer depends only on whether the number of reds is odd or even. Explaining **why** — the invariant in the main solution — is the slicker, complete argument.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 3, d: 7 },
          feedback: "{{3/7}} is the chance of picking a red at the start, but the bag keeps changing. Track what each move does to the number of reds.",
        },
        { spec: { type: "number", value: 0 }, feedback: "Can the number of red counters ever reach 0? Look at how it changes in each kind of move." },
      ],
      commonError: "Trying to multiply probabilities through every possible sequence of moves — there are far too many.",
      difficulty: "challenge",
      guideRef: "probability-scale",
      hints: [
        "Try a smaller bag first: 1 red and 1 blue, then 1 red and 2 blue.",
        "For each kind of move (two reds, two blues, one of each), how does the number of **red** counters change?",
        "The number of reds changes by 0 or 2. What property of that number never changes?",
        "The reds start at 3, an odd number. Can an odd number ever reach 0?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "probability-ch-q06",
      question:
        "In a class of 30 students, 20 like maths and 18 like art. Some may like both, and some may like neither. What are the smallest and largest possible numbers of students who like both? Give the smallest first.",
      answer: { type: "list", values: [8, 18], ordered: true, display: "8 and 18" },
      solution: [
        "Let {{x}} be the number who like both. Then maths only = {{20 - x}} and art only = {{18 - x}}.",
        "Neither = {{30 - (20 - x) - x - (18 - x) = x - 8}}.",
        "Every region of the Venn diagram must be 0 or more. 'Neither' ≥ 0 gives {{x >= 8}}. 'Art only' ≥ 0 gives {{x <= 18}}.",
        "Smallest: 8 (when nobody likes neither). Largest: 18 (every art-lover also likes maths; then 2 like maths only and 10 like neither).",
        "So a randomly chosen student likes both with probability somewhere from {{8/30 = 4/15}} to {{18/30 = 3/5}}.",
      ],
      traps: [
        {
          spec: { type: "list", values: [0, 18], ordered: true },
          feedback: "The overlap can't be 0: 20 + 18 = 38 is more than the 30 students, so at least 38 − 30 = 8 students must be in both groups.",
        },
        {
          spec: { type: "list", values: [8, 20], ordered: true },
          feedback: "The overlap can't be bigger than the smaller group: only 18 students like art.",
        },
      ],
      commonError: "Assuming the smallest overlap is 0 without checking whether everyone fits.",
      difficulty: "challenge",
      guideRef: "two-way-tables-venn",
      hints: [
        "Draw a Venn diagram with {{x}} in the overlap, and write every region in terms of {{x}}.",
        "For the largest overlap: could every art-lover also like maths?",
        "For the smallest overlap: 20 + 18 = 38, but there are only 30 students. What does that force?",
        "Every region of the Venn diagram must be at least 0.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "probability-ch-q07",
      question:
        "Marcus offers Hana a game. Hana rolls two fair dice. If the total is 7, Marcus pays Hana {{x}} dollars. Otherwise, Hana pays Marcus $1. What value of {{x}} makes the game fair, so that in the long run neither of them expects to win or lose money? Give your answer in dollars.",
      answer: { type: "number", value: 5, display: "$5" },
      solution: [
        "P(total 7) = {{6/36 = 1/6}}.",
        "Imagine 36 games. Hana expects 6 sevens and 30 other totals.",
        "In the 30 losing games she expects to pay Marcus 30 × $1 = $30.",
        "For a fair game she must expect to win the same amount back: {{6x = 30}}, so {{x = 5}}.",
        "So Marcus should pay $5 for a 7 — odds of 5 to 1, not 6 to 1.",
      ],
      solutions: [
        {
          label: "Method 2: expected gain per game",
          steps: [
            "Each game, Hana wins {{x}} dollars with probability {{1/6}} and loses $1 with probability {{5/6}}.",
            "Fair means her expected gain is 0: {{1/6 x - 5/6 = 0}}.",
            "So {{x = 5}}. This is quicker once you're used to it; imagining 36 games avoids fractions and makes the idea concrete.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 6 },
          feedback: "With $6, over 36 games Hana expects to win 6 × $6 = $36 but lose only $30 — the game favours her. Compare her winnings with the 30 losing games.",
        },
      ],
      commonError: "Thinking a 1-in-6 chance needs a $6 prize — that forgets the $1 Hana keeps paying when she loses.",
      difficulty: "challenge",
      guideRef: "expected-outcomes",
      hints: [
        "What's the probability of rolling a total of 7?",
        "Imagine playing 36 games. How many wins and how many losses would Hana expect?",
        "Fair means expected money won = expected money lost.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "probability-ch-q08",
      question:
        "Aisha and Ben take turns to roll a fair dice, with Aisha going first. The first person to roll a six wins. What is the probability that Aisha wins? Give your answer as a fraction.",
      answer: { type: "fraction", n: 6, d: 11, simplest: true },
      solution: [
        "Let {{p}} = P(Aisha wins).",
        "Aisha's first roll is a six with probability {{1/6}}. If it isn't (probability {{5/6}}), Ben is now in exactly Aisha's starting position: he is the one about to roll first.",
        "So P(Ben wins) = {{5/6 p}}.",
        "Someone wins (the chance that nobody ever rolls a six is 0), so {{p + 5/6 p = 1}}.",
        "{{11/6 p = 1}}, so {{p = 6/11}}. Going first is worth a little: {{6/11}} is just over {{1/2}}.",
      ],
      solutions: [
        {
          label: "Method 2: look at one round",
          steps: [
            "Think of one round as Aisha's roll followed by Ben's roll.",
            "Aisha wins in this round with probability {{1/6 = 6/36}}. Ben wins in this round with probability {{5/6 * 1/6 = 5/36}}. Otherwise the next round is a fresh start.",
            "Every round, the chances of Aisha winning and Ben winning are in the ratio 6 : 5.",
            "So P(Aisha wins) = {{6/(6 + 5) = 6/11}}. This is the slickest method — no equation needed.",
          ],
        },
      ],
      traps: [
        { spec: { type: "fraction", n: 1, d: 2 }, feedback: "Going first is an advantage: Aisha gets the first chance at a six in every round." },
        {
          spec: { type: "fraction", n: 1, d: 6 },
          feedback: "{{1/6}} is only her chance of winning with her very first roll. If both miss, she gets more chances.",
        },
      ],
      commonError: "Trying to add up infinitely many paths on a tree diagram instead of spotting that the game repeats itself.",
      difficulty: "challenge",
      guideRef: "tree-diagrams",
      hints: [
        "What happens if Aisha and Ben both miss with their first rolls?",
        "If Aisha misses her first roll, what position is Ben in?",
        "Let {{p}} = P(Aisha wins). Explain why P(Ben wins) = {{5/6 p}}.",
        "Someone must win, so P(Aisha wins) + P(Ben wins) = 1.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "probability-ch-q09",
      question:
        "Three fair dice have unusual numbers on their faces:\n\n| Dice | Faces |\n|---|---|\n| A | 2, 2, 4, 4, 9, 9 |\n| B | 1, 1, 6, 6, 8, 8 |\n| C | 3, 3, 5, 5, 7, 7 |\n\nTwo players each roll a different dice, and the higher score wins. Jun says: “If A usually beats B, and B usually beats C, then A must usually beat C.”\n\nWork out P(A beats B), P(B beats C) and P(C beats A), and explain whether Jun is right.",
      marks: 4,
      modelAnswer:
        "Each dice shows each of its three numbers with probability {{1/3}}, so each pair of dice gives a 3 × 3 grid of 9 equally likely outcomes. No two dice share a number, so there are never any draws.\n\n- **A against B:** A wins with (2, 1), (4, 1), (9, 1), (9, 6) and (9, 8) — 5 of the 9 cells. P(A beats B) = {{5/9}}.\n- **B against C:** B wins with (6, 3), (6, 5), (8, 3), (8, 5) and (8, 7). P(B beats C) = {{5/9}}.\n- **C against A:** C wins with (3, 2), (5, 2), (5, 4), (7, 2) and (7, 4). P(C beats A) = {{5/9}}.\n\nSo A usually beats B and B usually beats C — but C usually beats A. Jun is wrong: 'usually beats' doesn't pass along a chain, just like rock–paper–scissors. Whichever dice your opponent picks, you can choose one that beats it with probability {{5/9}}.",
      markScheme: [
        { point: "Uses a 3 × 3 (or 6 × 6) grid of equally likely outcomes and finds P(A beats B) = {{5/9}}", keywords: ["5/9", "20/36", "grid", "9"] },
        { point: "P(B beats C) = {{5/9}}", keywords: ["5/9", "20/36"] },
        { point: "P(C beats A) = {{5/9}}", keywords: ["5/9", "20/36"] },
        {
          point: "Concludes Jun is wrong: C usually beats A, so 'usually beats' is not transitive (like rock–paper–scissors)",
          keywords: ["wrong", "c beats a", "rock", "scissors", "not transitive", "cycle", "circle"],
        },
      ],
      solutions: [
        {
          label: "Using the full 6 × 6 grid",
          steps: [
            "Each cell of the 3 × 3 grid stands for 2 × 2 = 4 cells of the full 36-cell grid, so 5 winning cells become 20.",
            "P(A beats B) = P(B beats C) = P(C beats A) = {{20/36 = 5/9}}.",
            "The 3 × 3 grid is slicker: the repeated faces don't change the probabilities.",
          ],
        },
      ],
      commonError: "Assuming 'beats' works like 'is bigger than' and not checking C against A.",
      difficulty: "challenge",
      guideRef: "combined-events",
      hints: [
        "Each dice shows each of its three different numbers with probability {{1/3}}. How many equally likely pairs are there for two dice?",
        "Draw a 3 × 3 grid for A against B and mark who wins in each cell.",
        "Do the same for B against C, and for C against A.",
        "Compare P(C beats A) with what Jun predicts.",
      ],
      strategy: "Draw a sample space diagram",
    },
    {
      kind: "written",
      id: "probability-ch-q10",
      question:
        "Wei Ling and Priya record their basketball shots this term.\n\n| | 2-point shots | 3-point shots |\n|---|---|---|\n| Wei Ling | 8 scored out of 10 | 30 scored out of 90 |\n| Priya | 70 scored out of 90 | 3 scored out of 10 |\n\nWei Ling says she is the better shooter, because her relative frequency of scoring is higher for **both** kinds of shot. Priya says she is better, because her **overall** relative frequency of scoring is higher.\n\nCheck both claims, and explain how they can both be true. Who would you choose to take a 3-point shot?",
      marks: 4,
      modelAnswer:
        "**2-point shots:** Wei Ling 8 ÷ 10 = 0.8; Priya 70 ÷ 90 ≈ 0.78. Wei Ling is higher.\n\n**3-point shots:** Wei Ling 30 ÷ 90 ≈ 0.33; Priya 3 ÷ 10 = 0.3. Wei Ling is higher again.\n\n**Overall:** Wei Ling scored 38 out of 100 = 0.38; Priya scored 73 out of 100 = 0.73. Priya is much higher.\n\nSo both claims are true. This happens because they took very different **mixes** of shots: most of Wei Ling's shots were hard 3-pointers, while most of Priya's were easier 2-pointers. The overall figures mostly compare the types of shot, not the shooters.\n\nFor a 3-point shot, choose Wei Ling — comparing like with like, she does better (0.33 against 0.3), although Priya's 3 out of 10 comes from very few shots, so it is only a rough estimate.",
      markScheme: [
        {
          point: "Compares by type of shot: 2-point 0.8 against 0.78, 3-point 0.33 against 0.3 — Wei Ling higher in both",
          keywords: ["0.8", "0.78", "0.33", "0.3", "8/10", "70/90", "30/90", "3/10"],
        },
        { point: "Overall: Wei Ling 38 out of 100 = 0.38, Priya 73 out of 100 = 0.73 — Priya higher overall", keywords: ["38", "73", "0.38", "0.73", "100"] },
        {
          point: "Explains why: they took different mixes of shots — Wei Ling mostly hard 3-pointers, Priya mostly easier 2-pointers",
          keywords: ["mostly", "mix", "most of", "harder", "easier", "more 3-point", "different numbers", "90"],
        },
        { point: "Chooses Wei Ling for a 3-point shot, comparing like with like", keywords: ["wei ling", "like with like", "3-point"] },
      ],
      solutions: [
        {
          label: "See it with extreme cases",
          steps: [
            "Imagine Wei Ling took only 3-pointers and Priya only 2-pointers. Priya's overall rate would obviously be higher — even if Wei Ling were the better shooter at every type of shot.",
            "The real data is a milder version of this: 90 of Wei Ling's 100 shots were 3-pointers, while 90 of Priya's were 2-pointers.",
            "This effect has a name — Simpson's paradox — and it turns up in real medical and sports data.",
          ],
        },
      ],
      commonError: "Assuming that being better in every category must mean being better overall.",
      difficulty: "challenge",
      guideRef: "relative-frequency",
      hints: [
        "Work out each player's relative frequency for 2-point shots, then for 3-point shots.",
        "Now combine: how many shots did each player score out of 100 altogether?",
        "Look at **which** shots each player mostly took. Which kind is harder?",
        "To decide who is better at 3-pointers, which figures should you compare?",
      ],
      strategy: "Consider extremes",
    },
  ],
};
