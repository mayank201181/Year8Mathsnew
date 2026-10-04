// Probability — quiz, practice papers and challenge set.
import type { TopicPractice } from "../../types.ts";

const vennDesserts = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of 50 people. 17 like chendol only, 13 like both chendol and ice kacang, 12 like ice kacang only and 8 like neither."><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><rect x="10" y="10" width="340" height="200" fill="none" stroke="#334155" stroke-width="1.5"/><text x="22" y="32" font-size="14" font-family="sans-serif" fill="#1f2937">ξ</text><circle cx="140" cy="118" r="72" fill="#bbf7d0" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><circle cx="220" cy="118" r="72" fill="#fecaca" fill-opacity="0.7" stroke="#1f2937" stroke-width="1.5"/><text x="105" y="38" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Chendol</text><text x="258" y="38" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Ice kacang</text><text x="102" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">17</text><text x="180" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">13</text><text x="258" y="123" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">12</text><text x="326" y="196" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">8</text></svg>`;

const spinnerAngles = `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A spinner divided into four sectors: red 135 degrees, blue 90 degrees, green 75 degrees and yellow 60 degrees."><rect x="0" y="0" width="360" height="220" fill="#ffffff"/><path d="M120,110 L120,20 A90,90 0 0 1 183.64,173.64 Z" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L183.64,173.64 A90,90 0 0 1 56.36,173.64 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L56.36,173.64 A90,90 0 0 1 42.06,65 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><path d="M120,110 L42.06,65 A90,90 0 0 1 120,20 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="110" r="3" fill="#1f2937"/><text x="171" y="93" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">135°</text><text x="120" y="169" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">90°</text><text x="66" y="121" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">75°</text><text x="93" y="66" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">60°</text><rect x="240" y="52" width="16" height="16" fill="#fecaca" stroke="#1f2937"/><text x="264" y="65" font-size="13" font-family="sans-serif" fill="#1f2937">Red</text><rect x="240" y="82" width="16" height="16" fill="#bae6fd" stroke="#1f2937"/><text x="264" y="95" font-size="13" font-family="sans-serif" fill="#1f2937">Blue</text><rect x="240" y="112" width="16" height="16" fill="#bbf7d0" stroke="#1f2937"/><text x="264" y="125" font-size="13" font-family="sans-serif" fill="#1f2937">Green</text><rect x="240" y="142" width="16" height="16" fill="#fde68a" stroke="#1f2937"/><text x="264" y="155" font-size="13" font-family="sans-serif" fill="#1f2937">Yellow</text></svg>`;

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ — 4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "probability-quiz-q01",
      question: "A fair dice is rolled. What is the probability that the score is a factor of 6?",
      options: ["{{2/3}}", "{{1/2}}", "{{1/3}}", "{{1/6}}"],
      answerIndex: 0,
      explanation:
        "The factors of 6 are 1, 2, 3 and 6 — four of the six equally likely scores — so P = {{4/6 = 2/3}}. {{1/2}} misses one of the factors (usually 1 or 6 itself), {{1/3}} counts only 2 and 3, and {{1/6}} counts only the score 6.",
      difficulty: "warmup",
      guideRef: "probability-scale",
      hints: ["List every number that divides exactly into 6 — don't forget 1 and 6 itself."],
      strategy: "Make a list",
    },
    {
      kind: "short",
      id: "probability-quiz-q02",
      question:
        "A packet of 24 sweets has 9 lime, 6 orange and 9 grape sweets. Mei takes one sweet at random. What is the probability that it is orange? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 1, d: 4, simplest: true },
      solution: ["There are 24 sweets, all equally likely to be picked.", "6 of them are orange.", "P(orange) = {{6/24 = 1/4}}."],
      traps: [
        {
          spec: { type: "fraction", n: 1, d: 3 },
          feedback: "{{6/18}} compares the orange sweets with the sweets that aren't orange. A probability divides by **all** the sweets: 24.",
        },
      ],
      commonError: "Dividing by the number of other sweets (18) instead of the total (24).",
      difficulty: "warmup",
      guideRef: "probability-scale",
      hints: ["P(orange) = number of orange sweets ÷ total number of sweets."],
    },
    {
      kind: "short",
      id: "probability-quiz-q03",
      question:
        "The probability that a randomly chosen student at Wei Ling's school has a younger brother or sister is 0.38. What is the probability that a randomly chosen student does **not** have a younger brother or sister? Give your answer as a decimal.",
      answer: { type: "number", value: 0.62, allowFraction: false },
      solution: [
        "'Has a younger sibling' and 'doesn't' are complementary: exactly one of them is true for each student.",
        "So their probabilities add up to 1: P(not) = 1 − 0.38 = 0.62.",
      ],
      traps: [
        { spec: { type: "number", value: 0.72 }, feedback: "Check the subtraction: 0.38 + 0.72 = 1.1, not 1. Try 1.00 − 0.38." },
      ],
      difficulty: "warmup",
      guideRef: "complementary-events",
      hints: ["The two events together cover every student. What must their probabilities add up to?"],
      strategy: "Use the complement",
    },
    {
      kind: "mcq",
      id: "probability-quiz-q04",
      question:
        "A red, a blue and a green dice are rolled together. How many different outcomes are possible? (Red 2, blue 5, green 2 is one outcome.)",
      options: ["18", "216", "36", "120"],
      answerIndex: 1,
      explanation:
        "Product rule: each of the 6 red scores goes with each of the 6 blue scores and each of the 6 green scores, so 6 × 6 × 6 = 216. 18 adds 6 + 6 + 6 instead of multiplying, 36 is the number of outcomes for only two dice, and 120 = 6 × 5 × 4 wrongly stops two dice from showing the same score.",
      difficulty: "core",
      guideRef: "sample-spaces",
      hints: [
        "How many outcomes are there for the red and blue dice together?",
        "Each of those can be paired with every score on the green dice. Add or multiply?",
        "Can two dice show the same number? Check the example in the question.",
      ],
      strategy: "Use the product rule",
    },
    {
      kind: "short",
      id: "probability-quiz-q05",
      question:
        "Two fair dice are rolled and the scores are added. What is the probability that the total is 4 or less? Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 1, d: 6, simplest: true },
      solution: [
        "Two dice give 6 × 6 = 36 equally likely (first, second) outcomes.",
        "Totals of 4 or less: (1, 1), (1, 2), (2, 1), (1, 3), (2, 2), (3, 1) — that's 6 outcomes.",
        "P(total ≤ 4) = {{6/36 = 1/6}}.",
      ],
      traps: [
        {
          spec: { type: "fraction", n: 3, d: 11 },
          feedback: "3 of the 11 possible totals (2, 3 and 4) are small enough, but the totals aren't equally likely. Count cells in the 36-cell grid.",
        },
        {
          spec: { type: "fraction", n: 1, d: 9 },
          feedback: "Order matters: (1, 2) and (2, 1) are different cells in the grid, and so are (1, 3) and (3, 1). There are 6 cells, not 4.",
        },
      ],
      commonError: "Treating the 11 totals from 2 to 12 as equally likely.",
      difficulty: "core",
      guideRef: "combined-events",
      hints: [
        "How many equally likely outcomes are there when two dice are rolled?",
        "List the (first, second) pairs with a total of 2, then 3, then 4.",
        "Remember that (1, 2) and (2, 1) are different outcomes.",
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
      question: "Which statement about relative frequency is true?",
      options: [
        "After enough trials, the relative frequency will be exactly equal to the true probability",
        "A relative frequency from 10 trials is just as reliable as one from 1000 trials",
        "The more trials you do, the closer the relative frequency is likely to be to the true probability",
        "If a fair coin lands heads 5 times in a row, tails becomes more likely on the next flip",
      ],
      answerIndex: 2,
      explanation:
        "Relative frequency settles down towards the true probability as the number of trials grows, so more trials usually give a better estimate. It almost never hits the probability *exactly*, however many trials you do — it just gets close. 10 trials are far less reliable than 1000, because luck has a big effect on a short run. And a fair coin has no memory: after 5 heads, P(tails) is still {{1/2}}.",
      difficulty: "core",
      guideRef: "relative-frequency",
      hints: [
        "Which is more affected by luck: a short run of trials or a long one?",
        "Does a coin 'remember' its earlier flips?",
        "Is 'exactly equal' too strong?",
      ],
      strategy: "Eliminate options",
    },
    {
      kind: "short",
      id: "probability-quiz-q08",
      question:
        "The probability that the bus Mei catches to school is full when it reaches her stop is 0.15. Over the next 80 school days, on how many days would you expect the bus **not** to be full?",
      answer: { type: "number", value: 68 },
      solution: ["P(not full) = 1 − 0.15 = 0.85.", "Expected number of days = 0.85 × 80 = 68."],
      traps: [
        {
          spec: { type: "number", value: 12 },
          feedback: "12 is the expected number of days when the bus **is** full. The question asks about days when it isn't.",
        },
      ],
      commonError: "Working out 0.15 × 80 and forgetting that the question asks about days when the bus is not full.",
      difficulty: "core",
      guideRef: "expected-outcomes",
      hints: ["What is the probability that the bus is not full?", "Expected number = probability × number of trials."],
      strategy: "Use the complement",
    },
    {
      kind: "mcq",
      id: "probability-quiz-q09",
      question:
        "Jun says: “P(a fair dice shows a 6) = {{1/6}}, so P(it doesn't show a 6) = {{5/6}}.” Hana says: “P(it is sunny tomorrow) = 0.6, so P(it rains tomorrow) = 0.4.” Who has used the complement correctly?",
      options: ["Both of them", "Only Hana", "Neither of them", "Only Jun"],
      answerIndex: 3,
      explanation:
        "Only Jun. On every roll a 6 either shows or it doesn't, so 'not a 6' is the complement of 'a 6' and P(not 6) = 1 − {{1/6}} = {{5/6}}. Hana's mistake is that 'rain' is not the opposite of 'sunny': tomorrow could be cloudy and dry. The complement of 'sunny' is 'not sunny', which has probability 0.4 but includes cloudy days, so P(rain) could be less than 0.4.",
      difficulty: "core",
      guideRef: "complementary-events",
      hints: [
        "The complement of an event is everything else that could happen.",
        "Is 'rain' the only alternative to 'sunny'?",
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
            "The 11 letters of the word MATHEMATICS are written on separate cards. One card is picked at random. What is the probability that it shows an M or a T? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 4, d: 11, simplest: true },
          solution: [
            "M, A, T, H, E, M, A, T, I, C, S: there are 2 Ms and 2 Ts, so 4 cards show M or T.",
            "There are 11 cards, all equally likely to be picked.",
            "P(M or T) = {{4/11}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 2, d: 11 },
              feedback: "MATHEMATICS has **two** Ms and **two** Ts — every card counts.",
            },
            {
              spec: { type: "fraction", n: 1, d: 4 },
              feedback: "There are 8 different letters, but 11 cards. Each card is equally likely, so divide by 11.",
            },
          ],
          difficulty: "warmup",
          guideRef: "probability-scale",
          hints: ["Write out the 11 letters and count the Ms and Ts — some letters appear twice."],
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
            "A school canteen's set lunch is one main dish (3 choices), one drink (5 choices) and one piece of fruit (2 choices). How many different set lunches are possible?",
          answer: { type: "number", value: 30 },
          solution: [
            "Each main can go with each drink: 3 × 5 = 15 main-and-drink pairs.",
            "Each of those pairs can go with either fruit: 15 × 2 = 30.",
            "Product rule: 3 × 5 × 2 = 30 set lunches.",
          ],
          traps: [
            {
              spec: { type: "number", value: 10 },
              feedback: "Adding gives 10, but each main goes with **every** drink and every fruit. Multiply the numbers of choices.",
            },
          ],
          difficulty: "warmup",
          guideRef: "sample-spaces",
          hints: ["How many main-and-drink pairs are there? Then bring in the fruit."],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p1-q04",
          question:
            "Priya throws a paper aeroplane 80 times. It lands the right way up 26 times. What is the relative frequency of it landing the right way up? Give your answer as a decimal.",
          answer: { type: "number", value: 0.325, allowFraction: false },
          solution: [
            "Relative frequency = number of times the event happened ÷ number of trials.",
            "26 ÷ 80 = 0.325.",
          ],
          traps: [
            { spec: { type: "number", value: 0.675 }, feedback: "0.675 is the relative frequency of it **not** landing the right way up: 54 out of 80." },
          ],
          difficulty: "warmup",
          guideRef: "relative-frequency",
          hints: ["Divide the number of 'right way up' landings by the number of throws."],
        },
        {
          kind: "short",
          id: "probability-p1-q05",
          question:
            "Cards numbered 1 to 12 are placed in a bag. Arjun picks a card at random, notes the number and puts it back. He does this 60 times. How many times would you expect him to pick a multiple of 3?",
          answer: { type: "number", value: 20 },
          solution: [
            "The multiples of 3 from 1 to 12 are 3, 6, 9 and 12, so P(multiple of 3) = {{4/12 = 1/3}}.",
            "Expected number = {{1/3}} × 60 = 20.",
          ],
          traps: [
            {
              spec: { type: "number", value: 15 },
              feedback: "Did you miss 12? It's a multiple of 3 too, so P = {{4/12}}, not {{3/12}}.",
            },
          ],
          commonError: "Forgetting that the last number, 12, is a multiple of 3.",
          difficulty: "warmup",
          guideRef: "expected-outcomes",
          hints: ["List the multiples of 3 up to 12.", "Expected number = probability × number of picks."],
        },
        {
          kind: "short",
          id: "probability-p1-q06",
          question:
            "Every counter in a bag is red, blue, green or yellow. For a counter picked at random, P(red or blue) = 0.55, P(blue or green) = 0.5 and P(green) = 0.2. Find P(yellow). Give your answer as a decimal.",
          answer: { type: "number", value: 0.25, allowFraction: false },
          solution: [
            "The four colours are mutually exclusive and cover every counter, so P(red or blue) + P(green) + P(yellow) = 1.",
            "P(yellow) = 1 − 0.55 − 0.2 = 0.25.",
            "Check by finding every colour: P(blue) = 0.5 − 0.2 = 0.3, P(red) = 0.55 − 0.3 = 0.25, and 0.25 + 0.3 + 0.2 + 0.25 = 1 ✓.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.45 },
              feedback: "1 − 0.55 = 0.45 is P(green or yellow). Green is part of that, so take P(green) away too.",
            },
            {
              spec: { type: "number", value: -0.25 },
              feedback: "A probability can't be negative! Subtracting both 0.55 and 0.5 counts blue twice — it is in both groups.",
            },
          ],
          commonError: "Using both 'red or blue' and 'blue or green', so blue is counted twice.",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: [
            "Which groups of colours together cover every counter exactly once?",
            "Red-or-blue, green and yellow are mutually exclusive and cover everything.",
            "You don't need P(blue or green) at all — but it's useful for checking.",
          ],
          strategy: "Look for a shortcut",
        },
        {
          kind: "written",
          id: "probability-p1-q07",
          question:
            "Two events are **mutually exclusive** if they can't happen at the same time. They are **complementary** if they can't happen at the same time **and** one of them must happen.\n\n(a) For one roll of a fair dice, give an example of two events that are mutually exclusive but **not** complementary. Use their probabilities to show they aren't complementary.\n\n(b) Could two complementary events have probabilities 0.3 and 0.6? Explain.",
          marks: 3,
          modelAnswer:
            "(a) For example, 'roll a 1' and 'roll a 2'. They can't both happen on one roll, so they are mutually exclusive. But P(roll a 1) + P(roll a 2) = {{1/6 + 1/6 = 1/3}}, not 1: if you roll a 3, 4, 5 or 6, neither event happens. So they are not complementary.\n\n(b) No. Complementary events are 'A' and 'not A': exactly one of them always happens, so their probabilities must add up to exactly 1. 0.3 + 0.6 = 0.9 would mean that 10% of the time neither happens. (Events with probabilities 0.3 and 0.6 could be mutually exclusive, though.)",
          markScheme: [
            {
              point: "A correct pair of mutually exclusive events on one roll (e.g. 'roll a 1' and 'roll a 2')",
              keywords: ["roll a 1", "roll a 2", "can't both", "cannot both", "same time", "1 and 2"],
            },
            {
              point: "Shows their probabilities add to less than 1 (e.g. {{1/6 + 1/6 = 1/3}}), so some outcomes give neither",
              keywords: ["1/3", "2/6", "less than 1", "neither", "not 1"],
            },
            {
              point: "(b) No: complementary probabilities must add to exactly 1, but 0.3 + 0.6 = 0.9",
              keywords: ["0.9", "add to 1", "add up to 1", "must be 1", "0.7", "no"],
            },
          ],
          commonError: "Thinking 'mutually exclusive' and 'complementary' mean the same thing.",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: [
            "Try two single scores, like 'roll a 1' and 'roll a 2'. Can they happen together?",
            "Add their probabilities. Do the two events cover every possible score?",
            "If A and B are complementary, what must P(A) + P(B) be?",
          ],
        },
        {
          kind: "short",
          id: "probability-p1-q08",
          question:
            "A phone PIN is 4 digits, each from 0 to 9, and repeats are allowed (so every PIN from 0000 to 9999 is possible). A PIN is chosen at random. What is the probability that all four of its digits are **different**? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 63, d: 125, simplest: true },
          solution: [
            "Total number of PINs: 10 × 10 × 10 × 10 = 10 000.",
            "PINs with all four digits different: 10 choices for the first digit, 9 for the second, 8 for the third and 7 for the fourth: 10 × 9 × 8 × 7 = 5040.",
            "P(all different) = {{5040/10000 = 63/125}}.",
          ],
          solutions: [
            {
              label: "Multiply probabilities digit by digit",
              steps: [
                "Whatever the first digit is, the second must differ from it: probability {{9/10}}.",
                "The third must differ from both: {{8/10}}. The fourth must differ from all three: {{7/10}}.",
                "P = {{9/10 * 8/10 * 7/10 = 504/1000 = 63/125}}. This avoids the big counts, so it's a little quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 5040 },
              feedback: "5040 is the **number** of PINs with all digits different. Divide by the total number of PINs, 10 000.",
            },
          ],
          commonError: "Giving the number of PINs (5040) instead of the probability.",
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "How many PINs are there altogether?",
            "How many PINs have four different digits? Fill the four places one at a time.",
            "Divide, then simplify.",
          ],
          strategy: "Use the product rule",
        },
        {
          kind: "short",
          id: "probability-p1-q09",
          question:
            "Siti rolls a fair dice and flips a fair coin. If the coin shows heads, her score is **double** the dice number. If it shows tails, her score is the dice number **plus 3**. What is the probability that her score is greater than 7? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 5, d: 12, simplest: true },
          solution: [
            "There are 6 × 2 = 12 equally likely (dice, coin) outcomes.",
            "Heads: the scores are 2, 4, 6, 8, 10, 12 — three of them (8, 10, 12) are greater than 7.",
            "Tails: the scores are 4, 5, 6, 7, 8, 9 — two of them (8, 9) are greater than 7.",
            "P(score > 7) = {{5/12}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 5, d: 8 },
              feedback: "There aren't 6 + 2 = 8 outcomes. Each dice score pairs with each coin result: 6 × 2 = 12.",
            },
            {
              spec: { type: "fraction", n: 1, d: 4 },
              feedback: "That's only the heads outcomes (3 of 12). Tails can also beat 7: 5 + 3 = 8 and 6 + 3 = 9.",
            },
          ],
          commonError: "Adding the numbers of outcomes (6 + 2) instead of multiplying.",
          difficulty: "core",
          guideRef: "combined-events",
          hints: [
            "Draw a 2 × 6 sample space: heads and tails down the side, dice scores along the top. Fill in each score.",
            "How many cells are there altogether?",
            "Count the cells with a score greater than 7 — in both rows.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q10",
          question:
            "100 visitors to the Singapore Botanic Gardens were asked whether they visited the National Orchid Garden. Some values in the two-way table are missing.\n\n| | Orchid Garden | No Orchid Garden | Total |\n|---|---|---|---|\n| Child | 14 | ? | 30 |\n| Adult | ? | 18 | ? |\n| Senior | 9 | ? | 20 |\n| Total | 55 | ? | 100 |\n\nAn **adult** is chosen at random from these visitors. Find the probability that they visited the Orchid Garden. Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 16, d: 25, simplest: true },
          solution: [
            "Adults who visited the Orchid Garden: 55 − 14 − 9 = 32.",
            "Total adults: 100 − 30 − 20 = 50 (check: 32 + 18 = 50 ✓).",
            "The visitor is chosen from the 50 adults, so P = {{32/50 = 16/25}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 8, d: 25 },
              feedback: "{{32/100}} divides by all 100 visitors. The visitor is chosen from the adults only — 50 of them.",
            },
            {
              spec: { type: "fraction", n: 32, d: 55 },
              feedback: "{{32/55}} is the fraction of Orchid Garden visitors who are adults. We want the fraction of adults who visited, so divide by the adult total.",
            },
          ],
          commonError: "Dividing by the grand total (100) when the visitor is chosen from the adults only.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Use the Orchid Garden column total to find the missing adult value.",
            "How many adults are there altogether?",
            "An adult is chosen — so which total do you divide by?",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "written",
          id: "probability-p1-q11",
          question:
            "Zara has made a spinner from card with four sections labelled 1, 2, 3 and 4. They are meant to be equal, but her cutting wasn't perfect.\n\nDescribe an experiment Zara could do to decide whether her spinner is fair, and explain how she should use her results.",
          marks: 4,
          modelAnswer:
            "Zara should spin the spinner a large number of times — at least 200, say — and record every result in a tally chart or frequency table.\n\nIf the spinner is fair, each number has probability {{1/4}}, so in 200 spins she would expect each number about {{1/4}} × 200 = 50 times. She should work out the relative frequency of each number (frequency ÷ 200) and compare it with 0.25.\n\nSmall differences (say 46 compared with 54) are normal chance variation. But if one number comes up much more or much less often than the others — and the difference stays when she spins even more times — the spinner is probably biased. The more spins she does, the more she can trust her conclusion.",
          markScheme: [
            {
              point: "Spin it many times (e.g. 100 or more) and record the results in a tally chart or table",
              keywords: ["many", "200", "100", "large number", "lots", "tally", "record", "table"],
            },
            {
              point: "States what a fair spinner would give: probability {{1/4}} each, or expected frequency = {{1/4}} × number of spins",
              keywords: ["1/4", "0.25", "25%", "expected", "50"],
            },
            { point: "Compares the relative frequencies (or frequencies) with these expected values", keywords: ["relative frequency", "compare", "frequency", "divide"] },
            {
              point: "Sensible conclusion: small differences are chance; large, persistent differences suggest bias",
              keywords: ["biased", "bias", "chance", "close", "much more", "much less", "big difference", "fair"],
            },
          ],
          commonError: "Spinning only a few times, or expecting every number to come up exactly the same number of times.",
          difficulty: "core",
          guideRef: "relative-frequency",
          hints: [
            "How many times should she spin it — 10, or many more? Why?",
            "If the spinner were fair, what would P(each number) be? How many of each would she expect?",
            "How different would her results need to be before she decides the spinner is biased?",
          ],
          strategy: "Compare with what you'd expect",
        },
        {
          kind: "short",
          id: "probability-p1-q12",
          question:
            "A fair spinner with three equal sectors (red, blue and green) is spun and a fair coin is flipped. Hana does this 150 times. How many times would she expect to get blue **and** tails?",
          answer: { type: "number", value: 25 },
          solution: [
            "The sample space has 3 × 2 = 6 equally likely outcomes, and (blue, tails) is just one of them.",
            "P(blue and tails) = {{1/6}}.",
            "Expected number = {{1/6 * 150 = 25}}.",
          ],
          traps: [
            {
              spec: { type: "number", value: 50 },
              feedback: "50 is the expected number of blues, ignoring the coin. Only about half of those blues come with tails.",
            },
            {
              spec: { type: "number", value: 125 },
              feedback: "Adding {{1/3 + 1/2}} doesn't give 'blue and tails'. Use the 6-outcome sample space: only one outcome is (blue, tails).",
            },
          ],
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: [
            "How many equally likely outcomes are there for the spinner and coin together?",
            "How many of those outcomes are (blue, tails)?",
            "Expected number = probability × number of trials.",
          ],
          strategy: "Draw a sample space diagram",
        },
        {
          kind: "short",
          id: "probability-p1-q13",
          question:
            "The Venn diagram shows which of two desserts 50 people at a hawker centre like.\n\nOne of the people who likes **chendol** is chosen at random. What is the probability that they also like ice kacang? Give your answer as a fraction in its simplest form.",
          diagram: vennDesserts,
          answer: { type: "fraction", n: 13, d: 30, simplest: true },
          solution: [
            "The people who like chendol are everyone inside the chendol circle: 17 + 13 = 30.",
            "Of these, 13 also like ice kacang (the overlap).",
            "P(likes ice kacang) = {{13/30}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 13, d: 50 },
              feedback: "{{13/50}} picks from all 50 people. Here the person is chosen from the chendol lovers only — 30 of them.",
            },
            {
              spec: { type: "fraction", n: 13, d: 25 },
              feedback: "25 is the number who like ice kacang. The person is chosen from the chendol lovers: 17 + 13 = 30.",
            },
          ],
          commonError: "Using only the 'chendol only' region (17) as the total, or dividing by everyone.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Who are we choosing from?",
            "How many people are inside the chendol circle altogether?",
            "Of those, how many are also inside the ice kacang circle?",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "short",
          id: "probability-p1-q14",
          question:
            "A bag contains 3 red and 5 blue counters. Jun removes some of the blue counters (and nothing else) so that the probability of picking a red counter becomes {{3/4}}. How many blue counters does he remove?",
          answer: { type: "number", value: 4 },
          solution: [
            "The 3 red counters stay in the bag.",
            "P(red) = {{3/4}} means 3 out of every 4 counters are red, so the 3 reds must be the whole of 3 'quarters': there are 4 counters in total.",
            "So only 1 blue counter is left, and Jun removes 5 − 1 = 4.",
            "Check: 3 red and 1 blue gives P(red) = {{3/4}} ✓.",
          ],
          traps: [
            {
              spec: { type: "number", value: 1 },
              feedback: "That leaves 4 blue counters, so P(red) = {{3/7}}. {{3/4}} means 3 out of every 4 counters are red, so red : blue = 3 : 1.",
            },
          ],
          commonError: "Reading {{3/4}} as red : blue = 3 : 4 instead of red : total = 3 : 4.",
          difficulty: "core",
          guideRef: "probability-scale",
          hints: [
            "Which counters don't change?",
            "If the 3 red counters are {{3/4}} of the bag, how many counters are in the bag?",
            "How many of those are blue?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "probability-p1-q15",
          question:
            "Ethan is going to roll a fair dice 50 times. He works out the expected number of sixes as {{1/6 * 50 = 8 1/3}}. Then he says: “You can't roll a six a third of a time, so the formula must be wrong — and anyway, I'll definitely get 8 sixes.”\n\nExplain what the expected number really means, and comment on both parts of Ethan's statement.",
          marks: 3,
          modelAnswer:
            "The formula is fine. The expected number, {{8 1/3}}, is a long-run average: if Ethan did his 50 rolls over and over again, the average number of sixes per set of 50 would be close to {{8 1/3}}. An average doesn't have to be a whole number — just as an average family can have 2.4 people.\n\nIt is also a prediction, not a guarantee. In one set of 50 rolls he'll get a whole number of sixes, most likely somewhere around 8 — results like 6, 7, 9 or 10 are all quite normal, and fewer or more is possible. So he should say he expects 'about 8 sixes', not that he will definitely get 8.",
          markScheme: [
            {
              point: "The expected number is a long-run average (over many sets of 50 rolls), so it needn't be a whole number",
              keywords: ["average", "long run", "many", "mean", "whole number", "over and over"],
            },
            {
              point: "It's a prediction, not a guarantee — actual results vary by chance",
              keywords: ["guarantee", "not definitely", "vary", "chance", "could be", "prediction", "estimate"],
            },
            {
              point: "Sensible conclusion: expect 'about 8' sixes; results such as 6, 7, 9 or 10 are normal",
              keywords: ["about 8", "around 8", "roughly 8", "7", "9", "6", "10"],
            },
          ],
          commonError: "Thinking the expected number is what will definitely happen.",
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: [
            "What would happen if Ethan repeated his 50 rolls lots of times and averaged the number of sixes?",
            "Can an average be a non-whole number? Think of the average number of people in a family.",
            "Will every set of 50 rolls give exactly the same number of sixes?",
          ],
        },
        {
          kind: "short",
          id: "probability-p1-q16",
          question:
            "Aisha catches two buses to get to her CCA. The probability that the first bus is late is 0.2, and the probability that the second bus is late is 0.15. The buses are late or on time independently. Find the probability that **neither** bus is late. Give your answer as a decimal.",
          answer: { type: "number", value: 0.68, allowFraction: false },
          solution: [
            "P(first on time) = 1 − 0.2 = 0.8. P(second on time) = 1 − 0.15 = 0.85.",
            "The buses are independent, so multiply along the 'on time, on time' path of the tree diagram.",
            "P(neither late) = 0.8 × 0.85 = 0.68.",
          ],
          traps: [
            {
              spec: { type: "number", value: 0.65 },
              feedback: "1 − 0.2 − 0.15 treats 'first late' and 'second late' as mutually exclusive — but both buses can be late on the same day. Multiply the 'on time' probabilities instead.",
            },
            { spec: { type: "number", value: 0.03 }, feedback: "0.03 = 0.2 × 0.15 is the probability that **both** buses are late." },
          ],
          commonError: "Subtracting both 'late' probabilities from 1, as if the buses couldn't both be late.",
          difficulty: "core",
          guideRef: "tree-diagrams",
          hints: [
            "What is the probability that each bus is on time?",
            "Draw a tree diagram: first bus late or on time, then second bus late or on time.",
            "Multiply along the path where both buses are on time.",
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
                "No factor 3: both scores from {1, 2, 4, 5}: 4 × 4 = 16 cells. No factor 2: both scores odd: 3 × 3 = 9 cells.",
                "Cells with both problems (both scores from {1, 5}): 2 × 2 = 4, counted twice — so there are 16 + 9 − 4 = 21 bad cells.",
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
            "At a large school, 10% of students are in the robotics club. 60% of the robotics club members are in Year 8, but only 30% of the other students are in Year 8.\n\nMarcus says: “Most robotics members are in Year 8, so a Year 8 student is probably in the robotics club.”\n\nImagine 1000 students. Use a two-way table to test Marcus's claim, and explain where his thinking goes wrong.",
          marks: 4,
          modelAnswer:
            "Out of 1000 students, 100 are in robotics and 900 are not. Robotics and Year 8: 60% of 100 = 60, leaving 40 in other years. Not robotics and Year 8: 30% of 900 = 270, leaving 630 in other years.\n\n| | Year 8 | Other years | Total |\n|---|---|---|---|\n| Robotics | 60 | 40 | 100 |\n| Not robotics | 270 | 630 | 900 |\n| Total | 330 | 670 | 1000 |\n\nThere are 330 Year 8 students, and only 60 of them are in robotics. So the probability that a Year 8 student is in robotics is {{60/330 = 2/11}}, about 0.18. A Year 8 student is very **unlikely** to be in the club, so Marcus is wrong.\n\nHe has mixed up 'the fraction of robotics members who are in Year 8' (60%) with 'the fraction of Year 8 students who are in robotics' (about 18%). The club is small — only 10% of the school — so even a big share of it is a small number compared with the whole of Year 8.",
          markScheme: [
            { point: "Correct table entries: robotics 60 Year 8 and 40 other; not robotics 270 Year 8 and 630 other", keywords: ["60", "40", "270", "630", "100", "900"] },
            { point: "Year 8 total 330, of whom 60 are in robotics", keywords: ["330"] },
            {
              point: "Probability a Year 8 student is in robotics = {{60/330 = 2/11}} (about 0.18), so Marcus is wrong",
              keywords: ["60/330", "2/11", "0.18", "18%", "wrong", "unlikely"],
            },
            {
              point: "Explains the mix-up: '60% of robotics members are Year 8' is not the same as 'the chance a Year 8 student is in robotics'; the club is small",
              keywords: ["mixed up", "not the same", "different", "small", "only 10%", "other way round", "reversed", "wrong way"],
            },
          ],
          commonError: "Reading the probability the wrong way round — confusing 'robotics members who are in Year 8' with 'Year 8 students who are in robotics'.",
          difficulty: "challenge",
          guideRef: "two-way-tables-venn",
          hints: [
            "Out of 1000 students, how many are in robotics? How many aren't?",
            "How many robotics members are in Year 8? How many of the other 900 students are in Year 8?",
            "Now look only at the Year 8 column. What fraction of Year 8 students are in robotics?",
            "Is '60% of robotics members are in Year 8' the same as '60% of Year 8 are in robotics'?",
          ],
          strategy: "Make it simpler",
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
            "Every student in Hana's class has exactly one favourite sport: football, badminton or swimming. For a student picked at random, P(football) = {{1/4}} and P(badminton) = {{1/3}}. What is P(swimming)? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 5, d: 12, simplest: true },
          solution: [
            "The three sports are mutually exclusive and cover every student, so the probabilities add up to 1.",
            "{{1/4 + 1/3 = 3/12 + 4/12 = 7/12}}.",
            "P(swimming) = {{1 - 7/12 = 5/12}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 5, d: 7 },
              feedback: "{{1/4 + 1/3}} is not {{2/7}} — never add the denominators. Use twelfths: {{3/12 + 4/12 = 7/12}}.",
            },
          ],
          difficulty: "warmup",
          guideRef: "complementary-events",
          hints: ["What must the three probabilities add up to?", "Add {{1/4}} and {{1/3}} using twelfths."],
        },
        {
          kind: "short",
          id: "probability-p2-q03",
          question:
            "A stall sells 5 different kinds of kuih. Priya buys two **different** kinds. How many different pairs of kuih could she choose?",
          answer: { type: "number", value: 10 },
          solution: [
            "Call the kuih A, B, C, D and E and list the pairs systematically.",
            "Pairs with A: AB, AC, AD, AE (4). New pairs with B: BC, BD, BE (3). With C: CD, CE (2). With D: DE (1).",
            "4 + 3 + 2 + 1 = 10 pairs.",
          ],
          solutions: [
            {
              label: "Count ordered choices, then halve",
              steps: [
                "Choosing a first kuih then a second: 5 × 4 = 20 ordered choices.",
                "Each pair has been counted twice (AB and BA), so there are 20 ÷ 2 = 10 pairs.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 20 },
              feedback: "20 counts every pair twice — A then B is the same pair of kuih as B then A. Halve it.",
            },
            {
              spec: { type: "number", value: 25 },
              feedback: "5 × 5 = 25 lets her pick the same kind twice, and counts each pair twice.",
            },
          ],
          difficulty: "warmup",
          guideRef: "sample-spaces",
          hints: [
            "Label the kuih A to E and list the pairs that include A.",
            "Then list the new pairs that start with B — BA is the same as AB, so don't repeat it.",
          ],
          strategy: "Make a list",
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
            "A bag has 4 red, 5 green and 6 yellow marbles. Ravi picks a marble at random, notes its colour and puts it back. He does this 90 times. How many times would he expect to pick a marble that is **not** green?",
          answer: { type: "number", value: 60 },
          solution: [
            "Marbles that are not green: 4 + 6 = 10 out of 15, so P(not green) = {{10/15 = 2/3}}.",
            "Expected number = {{2/3}} × 90 = 60.",
          ],
          traps: [
            { spec: { type: "number", value: 30 }, feedback: "30 is the expected number of **green** marbles. The question asks for 'not green'." },
          ],
          difficulty: "warmup",
          guideRef: "expected-outcomes",
          hints: ["How many of the 15 marbles are not green?", "Expected number = probability × number of picks."],
        },
        {
          kind: "short",
          id: "probability-p2-q06",
          question:
            "Ravi's school has 300 students. For a student chosen at random, P(walks to school) = 0.28 and P(takes the MRT) = 0.45. Every other student takes the bus. How many of the 300 students take the bus?",
          answer: { type: "number", value: 81 },
          solution: [
            "Walk, MRT and bus are mutually exclusive and cover every student, so P(bus) = 1 − 0.28 − 0.45 = 0.27.",
            "Number taking the bus = 0.27 × 300 = 81.",
          ],
          traps: [
            {
              spec: { type: "number", value: 216 },
              feedback: "0.72 × 300 counts everyone who doesn't walk — and that includes the MRT users. Subtract both 0.28 and 0.45 from 1.",
            },
          ],
          commonError: "Subtracting only one of the two given probabilities from 1.",
          difficulty: "core",
          guideRef: "complementary-events",
          hints: ["First find P(bus).", "Then multiply by the number of students."],
          strategy: "Use the complement",
        },
        {
          kind: "written",
          id: "probability-p2-q07",
          question:
            "A door code is 3 digits chosen from 1 to 9, and the digits must all be **different**. Ethan guesses a code at random. He says: “Each digit has a {{1/9}} chance of being right, so P(my guess is correct) = {{1/9 * 1/9 * 1/9 = 1/729}}.”\n\nExplain Ethan's mistake and find the correct probability.",
          marks: 3,
          modelAnswer:
            "Ethan has treated the digits as if they could repeat. Once the first digit is used, only 8 digits are left for the second place, and then only 7 for the third. So the number of possible codes is 9 × 8 × 7 = 504, not 9 × 9 × 9 = 729.\n\nEach of the 504 codes is equally likely and only one is correct, so P(correct) = {{1/504}}. (Using probabilities instead: {{1/9 * 1/8 * 1/7 = 1/504}}.)",
          markScheme: [
            {
              point: "Identifies the mistake: digits can't repeat, so there are fewer choices for the later digits",
              keywords: ["repeat", "different", "8", "fewer", "can't be used", "cannot be used", "already used"],
            },
            { point: "Correct number of codes: 9 × 8 × 7 = 504", keywords: ["504", "9 × 8 × 7", "9x8x7"] },
            { point: "P(correct) = {{1/504}}", keywords: ["1/504"] },
          ],
          commonError: "Using 9 choices for every digit when repeats aren't allowed.",
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "If the first digit of the code is 1, which digits are possible for the second place?",
            "How many codes are there altogether? Use the product rule, remembering that digits can't repeat.",
            "Only one of the codes is correct.",
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
            "Jun rolls a fair dice twice. The first score is the tens digit and the second score is the units digit of a two-digit number (so rolling 4 then 1 makes 41). What is the probability that the number is prime? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 2, d: 9, simplest: true },
          solution: [
            "There are 6 × 6 = 36 equally likely numbers, from 11 to 66.",
            "A two-digit prime must be odd and not end in 5, so the units digit must be 1 or 3.",
            "Test the 12 numbers ending in 1 or 3: 11 ✓, 13 ✓, 21 ✗, 23 ✓, 31 ✓, 33 ✗, 41 ✓, 43 ✓, 51 ✗ (3 × 17), 53 ✓, 61 ✓, 63 ✗.",
            "That's 8 primes, so P(prime) = {{8/36 = 2/9}}.",
          ],
          traps: [
            { spec: { type: "fraction", n: 1, d: 4 }, feedback: "{{9/36}} includes 51, but 51 = 3 × 17 isn't prime." },
            {
              spec: { type: "fraction", n: 1, d: 2 },
              feedback: "Half the numbers are odd, but not every odd number is prime: 15, 21, 33 and 51 aren't.",
            },
          ],
          commonError: "Counting 51 as prime.",
          difficulty: "core",
          guideRef: "sample-spaces",
          hints: [
            "What must the units digit of a two-digit prime be?",
            "So which units digits from 1 to 6 are possible? Rule out 5 as well.",
            "Test each of the 12 numbers ending in 1 or 3 — be careful with 51.",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "probability-p2-q10",
          question:
            "In a group of 40 students, 18 play the piano, 12 play the guitar and 5 play both. A student is chosen at random. What is the probability that they play neither instrument? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 3, d: 8, simplest: true },
          solution: [
            "Start with the overlap: 5 play both.",
            "Piano only: 18 − 5 = 13. Guitar only: 12 − 5 = 7.",
            "At least one instrument: 13 + 5 + 7 = 25. Neither: 40 − 25 = 15.",
            "P(neither) = {{15/40 = 3/8}}.",
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 4 },
              feedback: "40 − 18 − 12 = 10 counts the 5 students who play both twice. Fill the Venn diagram from the overlap outwards.",
            },
          ],
          commonError: "Subtracting both group totals from 40 and double-counting the overlap.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Draw a Venn diagram and fill in the overlap first.",
            "How many play the piano only? The guitar only?",
            "Subtract everyone inside the circles from 40.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "probability-p2-q11",
          question:
            "In a group of 100 students, 45 are in Year 8 and the rest are in Year 7. 52 of the students own a pet, and 20 of the Year 7 students own a pet.\n\n(a) Draw and complete a two-way table for this information.\n\n(b) Priya says: “If you pick a pet owner at random, they're more likely to be in Year 8 than in Year 7.” Is she right? Use probabilities to explain.",
          marks: 4,
          modelAnswer:
            "(a)\n\n| | Pet | No pet | Total |\n|---|---|---|---|\n| Year 7 | 20 | 35 | 55 |\n| Year 8 | 32 | 13 | 45 |\n| Total | 52 | 48 | 100 |\n\n(b) Priya is right. We choose from the 52 pet owners only: 32 are in Year 8 and 20 are in Year 7. So P(Year 8) = {{32/52 = 8/13}} and P(Year 7) = {{20/52 = 5/13}}, and {{8/13}} is bigger. This is true even though Year 8 is the smaller year group, because a much larger share of Year 8 students own pets (32 out of 45, against 20 out of 55).",
          markScheme: [
            { point: "Year 7 total 55 and Year 8 pet owners 52 − 20 = 32", keywords: ["55", "32"] },
            { point: "Rest of the table correct: Year 7 no pet 35, Year 8 no pet 13, no-pet total 48", keywords: ["35", "13", "48"] },
            {
              point: "Chooses from the 52 pet owners: P(Year 8) = {{32/52 = 8/13}} and P(Year 7) = {{20/52 = 5/13}}",
              keywords: ["32/52", "8/13", "20/52", "5/13", "52"],
            },
            { point: "Concludes that Priya is right ({{8/13}} is bigger than {{5/13}})", keywords: ["right", "correct", "agree", "more likely", "yes"] },
          ],
          commonError: "Dividing by the year-group totals (45 and 55) instead of the 52 pet owners.",
          difficulty: "core",
          guideRef: "two-way-tables-venn",
          hints: [
            "Start with the totals: how many students are in Year 7?",
            "How many Year 8 students own a pet? Then fill in the rest of the table.",
            "Priya picks from the pet owners only. Which total do you divide by?",
          ],
          strategy: "Read the right total",
        },
        {
          kind: "short",
          id: "probability-p2-q12",
          question:
            "Aisha, Jun and Priya each drop the same toy building brick many times and count how often it lands on its side.\n\n| | Aisha | Jun | Priya |\n|---|---|---|---|\n| Drops | 40 | 60 | 100 |\n| On its side | 12 | 21 | 37 |\n\nUsing all the results, what is the best estimate of the probability that the brick lands on its side? Give your answer as a decimal.",
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
            "A factory tests a random sample of 80 light bulbs and finds that 6 of them are faulty. Estimate how many faulty bulbs there are in a batch of 1200 bulbs.",
          answer: { type: "number", value: 90 },
          solution: [
            "Relative frequency of a faulty bulb = 6 ÷ 80 = 0.075.",
            "Estimated number of faulty bulbs = 0.075 × 1200 = 90.",
          ],
          solutions: [
            {
              label: "Scale up the sample",
              steps: [
                "1200 ÷ 80 = 15, so the batch is 15 times the size of the sample.",
                "Estimate: 15 × 6 = 90 faulty bulbs. This avoids decimals, so it's quicker here.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 72 },
              feedback: "6 out of 80 is not 6%. The relative frequency is 6 ÷ 80 = 0.075, which is 7.5%.",
            },
          ],
          difficulty: "core",
          guideRef: "expected-outcomes",
          hints: ["What fraction of the sample was faulty?", "How many times bigger than the sample is the batch?"],
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
            "A bag holds 4 red and 6 blue counters. Hana and Arjun each take two counters at random. Hana puts her first counter back before taking her second; Arjun does not.\n\nWho is more likely to get two red counters? Show your working, and explain why the two answers are different.",
          marks: 4,
          modelAnswer:
            "Hana (with replacement): the bag is the same for both picks, so P(two reds) = {{4/10 * 4/10 = 16/100}} = 0.16.\n\nArjun (without replacement): after a red is taken, only 3 reds are left out of 9 counters, so P(two reds) = {{4/10 * 3/9 = 12/90 = 2/15}} ≈ 0.133.\n\nHana is more likely to get two reds. For Arjun the picks are **dependent**: taking out a red counter leaves fewer reds in the bag, so his second pick is less likely to be red. For Hana the picks are independent, because putting the counter back resets the bag.",
          markScheme: [
            { point: "Hana: {{4/10 * 4/10 = 16/100}} (0.16)", keywords: ["0.16", "16/100", "4/25"] },
            { point: "Arjun: {{4/10 * 3/9 = 2/15}} (about 0.13)", keywords: ["3/9", "2/15", "12/90", "0.13", "0.133"] },
            { point: "Concludes that Hana is more likely", keywords: ["hana", "more likely", "greater", "higher"] },
            {
              point: "Explains: without replacement there are fewer reds left for the second pick (dependent); with replacement the bag resets (independent)",
              keywords: ["fewer", "3 reds", "dependent", "independent", "back", "changes", "resets"],
            },
          ],
          commonError: "Using {{4/10}} for Arjun's second pick as well, as if his first counter had been put back.",
          difficulty: "core",
          guideRef: "tree-diagrams",
          hints: [
            "For Hana, does the bag change between the two picks?",
            "For Arjun, if his first counter is red, how many reds — and how many counters — are left?",
            "Multiply along the 'red, red' branch for each person, then compare.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "probability-p2-q16",
          question:
            "Siti wants to simulate whether her bus is late, using a random number generator that gives a whole number from 1 to 20, each equally likely. The probability that her bus is late is 0.15.\n\n(a) How many of the 20 numbers should she count as 'late'?\n\n(b) She simulates 200 days and gets 'late' on 34 of them. What is the relative frequency of 'late' in her simulation, as a decimal?\n\nGive both answers, (a) first.",
          answer: { type: "list", values: [3, 0.17], ordered: true, display: "3 numbers; 0.17" },
          solution: [
            "(a) P(late) = number of 'late' numbers ÷ 20, and this must be 0.15. So she needs 0.15 × 20 = 3 numbers — for example 1, 2 and 3.",
            "(b) Relative frequency = 34 ÷ 200 = 0.17.",
            "0.17 is close to 0.15: a small difference like this is normal in a simulation of 200 days.",
          ],
          traps: [
            {
              spec: { type: "list", values: [15, 0.17], ordered: true },
              feedback: "0.15 means 15 out of **100**. Out of 20 numbers she needs 0.15 × 20 of them.",
            },
          ],
          difficulty: "core",
          guideRef: "relative-frequency",
          hints: [
            "What number out of 20 is the same as 0.15?",
            "Relative frequency = number of 'late' days ÷ number of simulated days.",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "probability-p2-q17",
          question:
            "A three-digit whole number from 100 to 999 is chosen at random. What is the probability that at least one of its digits is 0? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 19, d: 100, simplest: true },
          solution: [
            "There are 999 − 100 + 1 = 900 three-digit numbers.",
            "Count the complement — numbers with **no** 0. The hundreds digit can be 1 to 9 (9 choices), and the tens and units digits must avoid 0 (9 choices each).",
            "Numbers with no 0: 9 × 9 × 9 = 729.",
            "Numbers with at least one 0: 900 − 729 = 171.",
            "P = {{171/900 = 19/100}}.",
          ],
          solutions: [
            {
              label: "Count directly (watch the overlap)",
              steps: [
                "0 in the tens place: 9 × 10 = 90 numbers (like 105). 0 in the units place: 9 × 10 = 90 numbers (like 150).",
                "100, 200, …, 900 have both, so they've been counted twice: 90 + 90 − 9 = 171.",
                "P = {{171/900 = 19/100}}. The complement avoids the double-counting trap, so it's safer.",
              ],
            },
          ],
          traps: [
            { spec: { type: "fraction", n: 1, d: 5 }, feedback: "{{180/900}} counts 100, 200, …, 900 twice — they have a 0 in both places." },
            {
              spec: { type: "fraction", n: 81, d: 100 },
              feedback: "{{729/900}} is the probability of **no** 0. 'At least one 0' is everything else.",
            },
          ],
          commonError: "Counting numbers like 300 twice.",
          difficulty: "challenge",
          guideRef: "complementary-events",
          hints: [
            "Is it easier to count the numbers with a 0, or the ones without?",
            "How many three-digit numbers have no 0 at all? Think about each digit in turn.",
            "Subtract from the 900 three-digit numbers.",
          ],
          strategy: "Use the complement",
        },
        {
          kind: "short",
          id: "probability-p2-q18",
          question:
            "Two **different** whole numbers are chosen at random from 1 to 10 (for example 3 and 8). What is the probability that their sum is even? Give your answer as a fraction in its simplest form.",
          answer: { type: "fraction", n: 4, d: 9, simplest: true },
          solution: [
            "The sum of two whole numbers is even exactly when both are even or both are odd.",
            "Imagine choosing the numbers one at a time. Whatever the first number is, 9 numbers are left.",
            "Of those 9, exactly 4 are odd-or-even in the same way as the first number — there were 5, and one has been used.",
            "P(sum even) = {{4/9}}.",
          ],
          solutions: [
            {
              label: "Count the pairs",
              steps: [
                "Number of pairs: 10 × 9 ÷ 2 = 45.",
                "Both even (from 2, 4, 6, 8, 10): 5 × 4 ÷ 2 = 10 pairs. Both odd: also 10 pairs.",
                "P = {{20/45 = 4/9}}. The one-at-a-time method is slicker — no big counts needed.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 1, d: 2 },
              feedback: "That would be right if the same number could be chosen twice. Once the first number is used, only 4 of the remaining 9 match it.",
            },
            { spec: { type: "fraction", n: 5, d: 9 }, feedback: "{{5/9}} is the probability that the sum is **odd**." },
          ],
          commonError: "Answering {{1/2}} by ignoring the fact that the two numbers must be different.",
          difficulty: "challenge",
          guideRef: "combined-events",
          hints: [
            "When is the sum of two whole numbers even?",
            "Choose the numbers one at a time. After the first is chosen, how many numbers are left?",
            "How many of those are both-odd or both-even with the first number?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "written",
          id: "probability-p2-q19",
          question:
            "Jun and Mei want a fair way to decide who goes first in a game, but their only coin is bent. They don't know P(heads), but it isn't {{1/2}}.\n\nMei suggests: “Flip the coin twice. If we get heads then tails, Jun goes first. If we get tails then heads, I go first. If both flips match (HH or TT), we start again.”\n\n(a) Suppose P(heads) = 0.7. Find P(heads then tails) and P(tails then heads).\n\n(b) Explain why Mei's method is fair **whatever** the coin's bias.",
          marks: 4,
          modelAnswer:
            "(a) The two flips are independent, so multiply along the tree. P(heads then tails) = 0.7 × 0.3 = 0.21. P(tails then heads) = 0.3 × 0.7 = 0.21. They are equal.\n\n(b) Let P(heads) = {{p}}, so P(tails) = {{1 - p}}. Then P(HT) = {{p(1 - p)}} and P(TH) = {{(1 - p)p}} — the same two numbers multiplied in a different order, so they are always equal. HH and TT just lead to a fresh start, which favours nobody. So every round either ends 'Jun first' or 'Mei first' with equal chances, or starts again — and in the end each of them goes first with probability {{1/2}}.",
          markScheme: [
            { point: "P(heads then tails) = 0.7 × 0.3 = 0.21", keywords: ["0.21", "0.7 × 0.3", "0.7x0.3"] },
            { point: "P(tails then heads) = 0.3 × 0.7 = 0.21, the same", keywords: ["0.21", "0.3 × 0.7", "same", "equal"] },
            {
              point: "General reason: P(HT) = {{p(1 - p)}} and P(TH) = {{(1 - p)p}} are always equal — the same two numbers multiplied",
              keywords: ["p(1-p)", "(1-p)p", "same numbers", "order", "always equal", "whatever", "any"],
            },
            {
              point: "Starting again on HH or TT doesn't favour either player, so each goes first with probability {{1/2}}",
              keywords: ["start again", "restart", "doesn't favour", "neither", "1/2", "fair", "50"],
            },
          ],
          solutions: [
            {
              label: "Symmetry without algebra",
              steps: [
                "Look at the tree for two flips. The HT path and the TH path use exactly the same two branch probabilities, just in the opposite order.",
                "Multiplication doesn't care about order, so the two paths always have equal probability.",
                "The method just ignores the 'matching' paths and waits for one of the two equally likely ones.",
              ],
            },
          ],
          commonError: "Thinking a bent coin can never give a fair result.",
          difficulty: "challenge",
          guideRef: "tree-diagrams",
          hints: [
            "The flips are independent, so multiply along the branches of a tree diagram.",
            "Compare 0.7 × 0.3 with 0.3 × 0.7.",
            "Now use {{p}} for P(heads). What are P(HT) and P(TH)?",
            "Does starting again on HH or TT help either player?",
          ],
          strategy: "Use symmetry",
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
        "A drawer holds 5 red, 7 blue and 9 green socks, all mixed up. Ethan takes socks out at random, one at a time, without looking. What is the smallest number of socks he must take so that the probability of having at least two green socks is **1** (certain)?",
      answer: { type: "number", value: 14 },
      solution: [
        "'Probability 1' means it must happen however unlucky Ethan is, so think about the worst case.",
        "The unluckiest start: he takes all 5 red and all 7 blue socks first — 12 socks and still no green.",
        "After that every sock left is green, so 2 more socks give him 2 greens.",
        "So 12 + 2 = 14 socks make it certain.",
        "Check that 13 is not enough: he might have 5 red, 7 blue and only 1 green.",
      ],
      traps: [
        {
          spec: { type: "number", value: 2 },
          feedback: "Two socks *might* both be green, but that's only possible, not certain. Think about the unluckiest order.",
        },
        { spec: { type: "number", value: 4 }, feedback: "4 socks guarantee two of the **same** colour, but not two **green** ones." },
      ],
      commonError: "Answering with the luckiest case instead of the unluckiest.",
      difficulty: "challenge",
      guideRef: "probability-scale",
      hints: [
        "'Probability 1' means certain. What is the unluckiest way the socks could come out?",
        "How many socks could Ethan take and still have no green at all?",
        "After all the non-green socks are out, how many more does he need?",
        "Check that one fewer sock is not enough.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "probability-ch-q02",
      question:
        "In the 1650s a French gambler, the Chevalier de Méré, asked: how many times must you roll a fair dice for the probability of getting **at least one six** to be more than {{1/2}}? Find the smallest number of rolls. (You may use a calculator.)",
      answer: { type: "number", value: 4 },
      solution: [
        "Use the complement: P(at least one six in {{n}} rolls) = 1 − P(no six in {{n}} rolls).",
        "Each roll misses a six with probability {{5/6}}, and the rolls are independent, so P(no six in {{n}} rolls) = {{(5/6)^n}}.",
        "We need {{(5/6)^n}} to be less than {{1/2}}.",
        "{{(5/6)^3 = 125/216}} ≈ 0.579 — still more than {{1/2}}. So 3 rolls give P(at least one six) ≈ 0.421.",
        "{{(5/6)^4 = 625/1296}} ≈ 0.482 — less than {{1/2}}. So 4 rolls give P(at least one six) ≈ 0.518.",
        "The smallest number of rolls is 4.",
      ],
      solutions: [
        {
          label: "Method 2: no calculator needed",
          steps: [
            "Start at 1 and multiply by {{5/6}} for each roll: 1 → {{5/6}} → {{25/36}} → {{125/216}} → {{625/1296}}.",
            "Compare each with {{1/2}} by doubling the top: 2 × 125 = 250, which is more than 216, so {{125/216 > 1/2}}; but 2 × 625 = 1250, which is less than 1296, so {{625/1296 < 1/2}}.",
            "So 4 rolls are needed. This avoids decimals completely, so it's handy without a calculator.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 3 },
          feedback: "3 × {{1/6}} = {{1/2}} adds the probabilities of events that can overlap (you could roll two sixes). With 3 rolls, P(at least one six) is only about 0.42.",
        },
        { spec: { type: "number", value: 6 }, feedback: "6 rolls is more than enough (about 0.67), but a smaller number already works." },
      ],
      commonError: "Adding {{1/6}} for each roll, which double-counts outcomes with more than one six.",
      difficulty: "challenge",
      guideRef: "complementary-events",
      hints: [
        "What is the opposite of 'at least one six'?",
        "P(no six in one roll) = {{5/6}}. What is P(no six in 2 rolls)? In 3 rolls?",
        "You need P(no six) to drop below {{1/2}}. Try 3 rolls and 4 rolls.",
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
            "1 red, 2 blues: two blues out leaves 1 red and 1 blue (then red, as above); a red and a blue out also leaves 1 red and 1 blue. Always red.",
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
        "Ravi has 4 letters and 4 matching addressed envelopes. He puts one letter in each envelope completely at random. He repeats this 120 times. Altogether, over all 120 goes, how many letters would he expect to put in the correct envelope?",
      answer: { type: "number", value: 120 },
      solution: [
        "Focus on just one letter — say the letter for Aisha. It is equally likely to go in any of the 4 envelopes, so P(it's in the right one) = {{1/4}}.",
        "Over 120 goes, Aisha's letter is expected to be right {{1/4}} × 120 = 30 times.",
        "The same is true for each of the 4 letters.",
        "Expected total = 4 × 30 = 120 — on average exactly one correct letter per go. (Amazingly, the answer would be 1 per go with 10 letters, or 100!)",
      ],
      solutions: [
        {
          label: "Method 2: list all 24 arrangements",
          steps: [
            "There are 4 × 3 × 2 × 1 = 24 equally likely ways to fill the envelopes.",
            "1 arrangement has all 4 letters right. 6 have exactly 2 right (choose which 2; the other 2 must swap). 8 have exactly 1 right (4 choices of the right one; the other 3 can all be wrong in 2 ways). That leaves 24 − 1 − 6 − 8 = 9 with none right.",
            "Exactly 3 right is impossible — if 3 letters are right, so is the 4th!",
            "Total correct letters over the 24 arrangements: 4 + 6 × 2 + 8 × 1 = 24, an average of 1 per go. So 120 goes give 120. Method 1 is far slicker — it never needs the list.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 30 }, feedback: "30 is the expected number for **one** letter. All 4 letters each have a {{1/4}} chance." },
        {
          spec: { type: "number", value: 75 },
          feedback: "75 is the expected number of **goes** with at least one correct letter. Some goes have 2 or 4 correct letters, so count letters, not goes.",
        },
      ],
      commonError: "Trying to list every arrangement and losing track, instead of looking at one letter at a time.",
      difficulty: "challenge",
      guideRef: "expected-outcomes",
      hints: [
        "Forget the other letters for a moment. What is the probability that one particular letter ends up in its own envelope?",
        "How many times would you expect that one letter to be right in 120 goes?",
        "Each of the 4 letters is in exactly the same situation. Add up.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "probability-ch-q08",
      question:
        "Aisha and Ben take turns to shoot at a basketball hoop, Aisha first. Aisha scores with probability 0.4 on each shot and Ben with probability 0.5, independently. The first person to score wins. What is the probability that Aisha wins? Give your answer as a fraction.",
      answer: { type: "fraction", n: 4, d: 7, simplest: true },
      solution: [
        "Think of one round as Aisha's shot followed, if she misses, by Ben's shot.",
        "In a round, Aisha wins with probability 0.4.",
        "Ben wins in that round only if Aisha misses and he scores: 0.6 × 0.5 = 0.3.",
        "Otherwise (0.6 × 0.5 = 0.3) both miss, and the next round is a fresh start, exactly like the first.",
        "In every round, Aisha's and Ben's chances of winning are in the ratio 0.4 : 0.3 = 4 : 3, so P(Aisha wins) = {{4/(4 + 3) = 4/7}}.",
      ],
      solutions: [
        {
          label: "Method 2: an equation",
          steps: [
            "Let {{p}} = P(Aisha wins).",
            "She wins at once (probability 0.4), or both miss (probability 0.3) and the game starts again with her still to shoot first.",
            "So {{p = 0.4 + 0.3p}}, giving {{0.7p = 0.4}} and {{p = 4/7}}.",
            "The ratio method is slicker — but the equation shows clearly why the restarts don't matter.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "fraction", n: 4, d: 9 },
          feedback: "0.4 : 0.5 ignores the order. Ben only shoots if Aisha has missed, so his chance per round is 0.6 × 0.5 = 0.3, not 0.5.",
        },
        {
          spec: { type: "fraction", n: 2, d: 5 },
          feedback: "0.4 is only her chance of winning with her first shot. If both miss, she gets more chances.",
        },
      ],
      commonError: "Comparing 0.4 with 0.5 directly, forgetting that Ben only shoots after Aisha misses.",
      difficulty: "challenge",
      guideRef: "tree-diagrams",
      hints: [
        "What can happen in one round (Aisha shoots, then Ben shoots if needed)?",
        "What's the probability that Ben wins in the first round? Remember he only shoots if Aisha misses.",
        "If both miss, the game starts again exactly as before. So compare the two players' chances in a single round.",
        "Their chances in each round are in the ratio 0.4 : 0.3.",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "written",
      id: "probability-ch-q09",
      question:
        "Bag A holds 2 red counters out of 5, and bag B holds 6 red counters out of 10. Zara tips both bags into one big bag.\n\n(a) Find P(red) for bag A, for bag B and for the big bag.\n\n(b) Is this statement **always**, **sometimes** or **never** true? Explain.\n\n> When two bags are combined, P(red) for the big bag lies between P(red) for the two separate bags (or equals them, if they are the same).\n\n(c) Is P(red) for the big bag always the mean of the two separate probabilities?",
      marks: 4,
      modelAnswer:
        "(a) Bag A: P(red) = {{2/5}} = 0.4. Bag B: P(red) = {{6/10}} = 0.6. Big bag: 2 + 6 = 8 red out of 5 + 10 = 15, so P(red) = {{8/15}} ≈ 0.533 — between 0.4 and 0.6.\n\n(b) **Always** true. Say bag A has {{a}} counters and bag B has {{b}} counters, and bag B has the higher (or equal) probability of red. The number of reds in the big bag is P(A) × {{a}} + P(B) × {{b}}. If we replaced P(A) by the bigger P(B), we would get at least as many: P(B) × ({{a + b}}). So the big bag has at most P(B) × ({{a + b}}) reds, which means its P(red) is at most P(B). In the same way, replacing P(B) by the smaller P(A) shows that its P(red) is at least P(A). So it always lies between them. (In words: every counter from bag A comes in at bag A's rate and every counter from bag B at bag B's rate, so the mixture can't be redder than the redder bag, or less red than the less red bag.)\n\n(c) No. It is the mean only when the two bags are the same size. Here the mean is 0.5, but the big bag gives {{8/15}} ≈ 0.533, closer to bag B's 0.6 because bag B has more counters.",
      markScheme: [
        { point: "(a) {{2/5}} = 0.4, {{6/10}} = 0.6 and the big bag {{8/15}} ≈ 0.53", keywords: ["8/15", "0.53", "0.533", "0.4", "0.6"] },
        { point: "(b) Always true", keywords: ["always"] },
        {
          point: "(b) A convincing reason: reds in the big bag = P(A) × size of A + P(B) × size of B, which lies between P(A) × total and P(B) × total (or a clear 'each counter comes in at its own bag's rate' argument)",
          keywords: ["between", "total", "at most", "at least", "each counter", "rate", "mix", "weighted", "size"],
        },
        {
          point: "(c) No — only when the bags are the same size; here {{8/15}} is not 0.5 because bag B is bigger",
          keywords: ["no", "not the mean", "0.5", "same size", "bigger", "weighted", "more counters"],
        },
      ],
      solutions: [
        {
          label: "A picture: the balance point",
          steps: [
            "Mark 0.4 and 0.6 on a number line. The big bag's P(red) is a balance point between them, weighted by how many counters each bag has.",
            "Bag B has twice as many counters, so the balance point is twice as close to 0.6 as to 0.4: it splits the gap of 0.2 in the ratio 2 : 1, giving 0.4 + {{2/3}} × 0.2 ≈ 0.533 = {{8/15}} ✓.",
            "A balance point always lies between the two ends, which is why the statement is always true — and it's only in the middle when the two weights are equal.",
          ],
        },
      ],
      commonError: "Answering 'sometimes' after one example, or assuming the combined probability is the average of the two.",
      difficulty: "challenge",
      guideRef: "probability-scale",
      hints: [
        "Work out the three probabilities in (a). Where does the big bag's value sit?",
        "Try another pair of bags, such as 1 red out of 2 and 1 red out of 10. Is it still between?",
        "Write the number of reds in the big bag as P(A) × (size of A) + P(B) × (size of B). What happens if you swap P(A) for the bigger P(B)?",
        "For (c): when would the big bag's P(red) be exactly the mean?",
      ],
      strategy: "Try small cases",
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
          label: "See it with an extreme case",
          steps: [
            "Imagine Wei Ling took only 3-pointers and Priya only 2-pointers. Priya's overall rate would obviously be higher — even if Wei Ling were the better shooter at every type of shot.",
            "The real data is a milder version of this: 90 of Wei Ling's 100 shots were 3-pointers, while 90 of Priya's were 2-pointers.",
            "This effect is called Simpson's paradox, and it turns up in real medical and sports data.",
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
