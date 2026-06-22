import type { Topic } from "../types";

export const probability: Topic = {
  id: "probability",
  title: "Probability",
  subject: "Maths",
  icon: "🎲",
  strand: "Statistics & Probability",
  intro:
    "From the 0–1 probability scale to two-dice sample spaces and relative frequency — how to measure chance, predict the long run, and reason about events that cannot happen together.",
  guide: [
    {
      heading: "The probability scale and equally likely outcomes",
      discovery: {
        problem:
          "A bag holds 3 red, 2 blue and 5 green counters. You take one without looking. Which colour are you most likely to draw, and how would you put a number on 'how likely' green is?",
        idea:
          "There are 3 + 2 + 5 = 10 equally likely counters. Green has 5 of them, so P(green) = 5/10 = 1/2. Probability counts favourable outcomes out of the total: P(event) = favourable ÷ total.",
      },
      body:
        "Probability measures how likely something is, on a scale from **0 (impossible)** to **1 (certain)**. A probability of 1/2 (0.5, 50%) means an even chance.\n\nThe same probability can be written as a *fraction*, a *decimal* or a *percentage*: 1/4 = 0.25 = 25%.\n\nWhen every outcome is **equally likely**, P(event) = (number of favourable outcomes) ÷ (total number of outcomes). For one fair die, P(rolling a 4) = 1/6 because one face out of six gives a 4.",
      keyPoints: [
        "Probabilities run from 0 (impossible) to 1 (certain); 1/2 is an even chance.",
        "The same chance can be a fraction, decimal or %: 3/4 = 0.75 = 75%.",
        "Equally likely outcomes: P(event) = favourable ÷ total.",
        "Always simplify fractions where you can: 5/10 = 1/2.",
      ],
      strategies: ["Count the total first", "Convert between fraction, decimal and %"],
      whyItWorks:
        "If all outcomes are equally likely, sharing one whole 'unit of certainty' equally between them gives each outcome a share of 1 ÷ total. An event's probability is just how many of those equal shares it owns.",
    },
    {
      heading: "Complement and mutually exclusive events",
      discovery: {
        problem:
          "The probability it rains tomorrow is 0.3. Without any extra information, what is the probability it does NOT rain? How are the two numbers linked?",
        idea:
          "Rain and no-rain are the only options and cannot both happen, so their probabilities must total 1. P(no rain) = 1 − 0.3 = 0.7. This is the complement rule: P(not A) = 1 − P(A).",
      },
      body:
        "Two events are **mutually exclusive** if they cannot happen at the same time (e.g. rolling a 2 and rolling a 5 on one die).\n\nIf a set of mutually exclusive events covers every possibility, their probabilities **add up to 1**.\n\nThe most useful special case is an event A and its opposite 'not A'. They are mutually exclusive and cover everything, so **P(not A) = 1 − P(A)**. This shortcut often saves a lot of counting.",
      keyPoints: [
        "Mutually exclusive events cannot occur together.",
        "Probabilities of all mutually exclusive outcomes covering everything sum to 1.",
        "Complement rule: P(not A) = 1 − P(A).",
        "For mutually exclusive A and B, P(A or B) = P(A) + P(B).",
      ],
      strategies: ["Use 1 − P(A) instead of counting the opposite", "Check probabilities sum to 1"],
      whyItWorks:
        "Something is certain to happen, so the probabilities of all the separate, non-overlapping outcomes must fill up the whole '1'. Removing the part belonging to A leaves exactly 1 − P(A) for everything that is 'not A'.",
    },
    {
      heading: "Listing outcomes and sample-space diagrams",
      discovery: {
        problem:
          "Two fair dice are rolled and the scores added. Is a total of 7 more likely, less likely, or equally likely compared with a total of 12? Try to justify it before reading on.",
        idea:
          "List the ways: 12 only comes from (6,6) — one way. But 7 comes from (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — six ways. A grid of all 36 outcomes shows 7 is the most common total, so it is far more likely than 12.",
      },
      body:
        "To find probabilities for two events together (two dice, two coins, a spinner and a coin), list **every** possible outcome. A **sample-space diagram** is a neat grid that does this without missing any.\n\nFor two dice there are 6 × 6 = 36 equally likely ordered outcomes. For two coins there are 4: HH, HT, TH, TT.\n\nOnce the grid is drawn, count the outcomes that match your event and divide by the total. For example, P(total = 7) = 6/36 = 1/6.",
      diagrams: [
        '<svg viewBox="0 0 268 268" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sample-space grid of totals for two dice, with the diagonal giving total 7 highlighted"><rect x="0" y="0" width="268" height="268" fill="#ffffff"/><text x="134" y="16" text-anchor="middle" font-size="12" font-family="sans-serif">Two-dice totals (Die 1 across, Die 2 down)</text><g font-family="sans-serif" font-size="12" text-anchor="middle"><rect x="44" y="40" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="61" y="62">2</text><rect x="80" y="40" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="97" y="62">3</text><rect x="116" y="40" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="133" y="62">4</text><rect x="152" y="40" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="169" y="62">5</text><rect x="188" y="40" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="205" y="62">6</text><rect x="224" y="40" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="241" y="62">7</text><rect x="44" y="76" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="61" y="98">3</text><rect x="80" y="76" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="97" y="98">4</text><rect x="116" y="76" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="133" y="98">5</text><rect x="152" y="76" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="169" y="98">6</text><rect x="188" y="76" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="205" y="98">7</text><rect x="224" y="76" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="241" y="98">8</text><rect x="44" y="112" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="61" y="134">4</text><rect x="80" y="112" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="97" y="134">5</text><rect x="116" y="112" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="133" y="134">6</text><rect x="152" y="112" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="169" y="134">7</text><rect x="188" y="112" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="205" y="134">8</text><rect x="224" y="112" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="241" y="134">9</text><rect x="44" y="148" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="61" y="170">5</text><rect x="80" y="148" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="97" y="170">6</text><rect x="116" y="148" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="133" y="170">7</text><rect x="152" y="148" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="169" y="170">8</text><rect x="188" y="148" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="205" y="170">9</text><rect x="224" y="148" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="241" y="170">10</text><rect x="44" y="184" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="61" y="206">6</text><rect x="80" y="184" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="97" y="206">7</text><rect x="116" y="184" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="133" y="206">8</text><rect x="152" y="184" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="169" y="206">9</text><rect x="188" y="184" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="205" y="206">10</text><rect x="224" y="184" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="241" y="206">11</text><rect x="44" y="220" width="34" height="34" fill="#ffe08a" stroke="#999"/><text x="61" y="242">7</text><rect x="80" y="220" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="97" y="242">8</text><rect x="116" y="220" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="133" y="242">9</text><rect x="152" y="220" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="169" y="242">10</text><rect x="188" y="220" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="205" y="242">11</text><rect x="224" y="220" width="34" height="34" fill="#f4f4f4" stroke="#999"/><text x="241" y="242">12</text><text x="61" y="34">1</text><text x="97" y="34">2</text><text x="133" y="34">3</text><text x="169" y="34">4</text><text x="205" y="34">5</text><text x="241" y="34">6</text><text x="30" y="62">1</text><text x="30" y="98">2</text><text x="30" y="134">3</text><text x="30" y="170">4</text><text x="30" y="206">5</text><text x="30" y="242">6</text></g></svg>',
      ],
      keyPoints: [
        "A sample-space diagram lists every equally likely outcome with none missing.",
        "Two dice: 36 outcomes. Two coins: 4 outcomes (HH, HT, TH, TT).",
        "Count the matches, then divide by the total number of cells.",
        "(2,5) and (5,2) are different outcomes — order matters in the grid.",
      ],
      strategies: ["Draw a grid for two-stage experiments", "Be systematic so you miss nothing"],
      whyItWorks:
        "Each cell of the grid is one equally likely outcome, so the grid restores the 'equally likely' setting from Section 1 — even when the totals themselves (like dice sums) are not equally likely.",
    },
    {
      heading: "Experimental probability, relative frequency & expected frequency",
      discovery: {
        problem:
          "A drawing pin is dropped 200 times and lands 'point up' 130 times. The theory for a fair coin says 1/2 — but a pin is not symmetrical. What is the best estimate of P(point up), and how many 'point up' results would you expect in 1000 drops?",
        idea:
          "When outcomes are not equally likely, estimate the probability from data: relative frequency = successes ÷ trials = 130/200 = 0.65. Expected frequency for 1000 drops = 0.65 × 1000 = 650.",
      },
      body:
        "Some probabilities cannot be worked out by theory (a bent coin, a real drawing pin). Instead we run an experiment and use the **relative frequency**: (number of successes) ÷ (number of trials). This is the *experimental probability*.\n\nThe more trials you do, the closer the relative frequency tends to settle towards the true probability — this is why a single coin flip tells you little but 1000 flips tell you a lot.\n\nTo predict results, use **expected frequency = probability × number of trials**. If P(six) = 1/6 and you roll 60 times, you expect about 1/6 × 60 = 10 sixes (not exactly — chance still varies).",
      keyPoints: [
        "Experimental probability (relative frequency) = successes ÷ trials.",
        "More trials → relative frequency usually settles closer to the true value.",
        "Expected frequency = probability × number of trials.",
        "Expected does not mean exact — real results scatter around it.",
      ],
      strategies: ["Use data when outcomes aren't equally likely", "Multiply probability by trials to predict"],
      whyItWorks:
        "Over many independent trials the proportion of successes averages out towards the true probability, so probability × trials is the natural prediction for how many successes to expect.",
      thinkDeeper:
        "If two players each estimate P(point up) from 20 drops, their answers may differ a lot. Whose estimate would you trust more: one based on 20 drops or one based on 2000? Why?",
    },
  ],
  learn: {
    cards: [
      {
        front: "What does probability 0 mean? And 1?",
        back: "0 = impossible, 1 = certain. Everything else lies between, with 1/2 an even chance.",
      },
      {
        front: "P(event) for equally likely outcomes",
        back: "favourable outcomes ÷ total outcomes. E.g. P(roll a 4) = 1/6.",
      },
      {
        front: "Complement rule",
        back: "P(not A) = 1 − P(A). If P(A) = 0.3 then P(not A) = 0.7.",
      },
      {
        front: "Mutually exclusive events",
        back: "Events that cannot happen together; if they cover everything their probabilities sum to 1.",
      },
      {
        front: "How many outcomes for two dice? Two coins?",
        back: "Two dice: 6 × 6 = 36. Two coins: 4 (HH, HT, TH, TT).",
      },
      {
        front: "Most likely total with two dice",
        back: "7, because it has the most combinations (6 out of 36) — P(7) = 1/6.",
      },
      {
        front: "Experimental probability (relative frequency)",
        back: "successes ÷ number of trials. Used when outcomes are not equally likely.",
      },
      {
        front: "Expected frequency",
        back: "probability × number of trials. E.g. P = 1/6 over 60 rolls → expect 10.",
      },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "prob-mcq-q01",
        question: "On the 0 to 1 scale, which value best describes an event that is impossible?",
        options: ["0", "1/2", "1", "100"],
        answerIndex: 0,
        explanation: "Impossible events have probability 0; certain events have probability 1.",
        difficulty: "warmup",
        guideRef: "The probability scale and equally likely outcomes",
        strategy: "Recall the scale endpoints",
      },
      {
        id: "prob-mcq-q02",
        question: "A fair die is rolled. What is the probability of rolling an even number?",
        options: ["1/6", "1/3", "1/2", "2/3"],
        answerIndex: 2,
        explanation: "Even faces are 2, 4, 6 — that's 3 out of 6, so 3/6 = 1/2.",
        difficulty: "warmup",
        guideRef: "The probability scale and equally likely outcomes",
        hints: ["List the even numbers on a die.", "There are 3 even faces out of 6."],
        strategy: "Count favourable ÷ total",
      },
      {
        id: "prob-mcq-q03",
        question: "The probability a bus is late is 0.15. What is the probability it is NOT late?",
        options: ["0.15", "0.85", "0.5", "1.15"],
        answerIndex: 1,
        explanation: "P(not late) = 1 − P(late) = 1 − 0.15 = 0.85.",
        difficulty: "core",
        guideRef: "Complement and mutually exclusive events",
        hints: ["Use the complement rule.", "P(not A) = 1 − P(A)."],
        strategy: "Apply P(not A) = 1 − P(A)",
      },
      {
        id: "prob-mcq-q04",
        question:
          "Two fair dice are rolled and the scores added. Which total is the MOST likely?",
        options: ["2", "6", "7", "12"],
        answerIndex: 2,
        explanation:
          "7 has the most combinations: (1,6),(2,5),(3,4),(4,3),(5,2),(6,1) — 6 ways out of 36, more than any other total.",
        difficulty: "challenge",
        guideRef: "Listing outcomes and sample-space diagrams",
        hints: [
          "List the ordered pairs that give each total.",
          "Count how many ways make 7 compared with 2 or 12.",
          "7 can be made in 6 ways; 2 and 12 only in 1 way each.",
        ],
        strategy: "Use a sample-space grid and count combinations",
      },
      {
        id: "prob-mcq-q05",
        question:
          "A spinner is spun 80 times and lands on red 20 times. What is the experimental probability of red?",
        options: ["1/20", "1/4", "1/3", "20"],
        answerIndex: 1,
        explanation: "Relative frequency = successes ÷ trials = 20/80 = 1/4.",
        difficulty: "core",
        guideRef: "Experimental probability, relative frequency & expected frequency",
        hints: ["Divide the number of reds by the number of spins.", "20 ÷ 80 = 1/4."],
        strategy: "Use relative frequency = successes ÷ trials",
      },
      {
        id: "prob-mcq-q06",
        question:
          "The probability a seed germinates is 0.9. A gardener plants 200 seeds. About how many are expected to germinate?",
        options: ["20", "90", "180", "200"],
        answerIndex: 2,
        explanation: "Expected frequency = probability × trials = 0.9 × 200 = 180.",
        difficulty: "core",
        guideRef: "Experimental probability, relative frequency & expected frequency",
        hints: ["Expected frequency = probability × number of trials.", "0.9 × 200 = 180."],
        strategy: "Multiply probability by number of trials",
      },
    ],
    qa: [
      {
        id: "prob-qa-q01",
        question:
          "A bag contains 4 red, 3 blue and 5 yellow counters. One counter is taken at random. Find (a) P(blue), (b) P(not blue). Give answers as fractions in simplest form.",
        modelAnswer:
          "Total = 4 + 3 + 5 = 12. (a) P(blue) = 3/12 = 1/4. (b) P(not blue) = 1 − 1/4 = 3/4.",
        markScheme: [
          "Total = 12 [1]",
          "P(blue) = 3/12 = 1/4 [1]",
          "P(not blue) = 1 − 1/4 = 3/4 [1]",
        ],
        commonError: "Forgetting to add all colours to get the total, or not simplifying 3/12.",
        difficulty: "core",
        guideRef: "Complement and mutually exclusive events",
        hints: ["Find the total number of counters first.", "Use P(not blue) = 1 − P(blue)."],
        strategy: "Count total, then use the complement rule",
      },
      {
        id: "prob-qa-q02",
        question:
          "Two fair coins are flipped. (a) List all the possible outcomes. (b) Find the probability of getting exactly one head.",
        modelAnswer:
          "(a) The outcomes are HH, HT, TH, TT — four equally likely outcomes. (b) Exactly one head occurs in HT and TH, so P(one head) = 2/4 = 1/2.",
        markScheme: [
          "Lists all four outcomes HH, HT, TH, TT [1]",
          "Identifies HT and TH as 'exactly one head' [1]",
          "P = 2/4 = 1/2 [1]",
        ],
        commonError: "Listing only 3 outcomes by treating HT and TH as the same.",
        difficulty: "core",
        guideRef: "Listing outcomes and sample-space diagrams",
        hints: ["Write the second coin for each result of the first.", "HT and TH are different outcomes."],
        strategy: "List systematically, then count favourable outcomes",
        solutions: [
          {
            label: "Sample-space grid",
            steps: [
              "Make a 2×2 grid: rows = coin 1 (H, T), columns = coin 2 (H, T).",
              "Cells are HH, HT, TH, TT — 4 equally likely outcomes.",
              "Exactly one head: HT and TH → 2 cells.",
              "P(one head) = 2/4 = 1/2.",
            ],
          },
          {
            label: "Counting by cases",
            steps: [
              "Each coin is H or T, so there are 2 × 2 = 4 outcomes.",
              "'Exactly one head' means one H and one T in some order.",
              "Orders: HT, TH → 2 outcomes.",
              "P = 2/4 = 1/2.",
            ],
          },
        ],
      },
      {
        id: "prob-qa-q03",
        question:
          "A spinner has only red and green sectors. P(red) = 2/5. The spinner is spun 150 times. Estimate how many times it lands on green. Show your reasoning.",
        modelAnswer:
          "P(green) = 1 − 2/5 = 3/5. Expected frequency = 3/5 × 150 = 90, so it is expected to land on green about 90 times.",
        markScheme: [
          "P(green) = 1 − 2/5 = 3/5 [1]",
          "Expected = 3/5 × 150 [1]",
          "= 90 times [1]",
        ],
        commonError: "Using P(red) = 2/5 instead of P(green), giving 60.",
        difficulty: "challenge",
        guideRef: "Experimental probability, relative frequency & expected frequency",
        hints: [
          "First find P(green) using the complement rule.",
          "Then multiply by the number of spins.",
          "3/5 × 150 = 90.",
        ],
        strategy: "Complement to find P(green), then expected = P × trials",
      },
      {
        id: "prob-qa-q04",
        question:
          "Challenge (work backwards): A bag holds red and white counters only. P(red) = 3/8. There are 15 red counters. How many counters are in the bag altogether, and how many are white?",
        modelAnswer:
          "P(red) = red ÷ total = 3/8, and there are 15 red. Since 15 = 3 × 5, scale up: total = 8 × 5 = 40. White = 40 − 15 = 25.",
        markScheme: [
          "Recognises red/total = 3/8 with red = 15 [1]",
          "15 = 3 × 5 so total = 8 × 5 = 40 [1]",
          "White = 40 − 15 = 25 [1]",
        ],
        commonError: "Computing 3/8 of 15 instead of scaling the fraction up to match 15 reds.",
        difficulty: "challenge",
        guideRef: "The probability scale and equally likely outcomes",
        hints: [
          "Write the probability as red ÷ total = 3/8.",
          "What do you multiply 3 by to get 15 reds?",
          "Multiply the bottom (8) by the same number to get the total.",
        ],
        strategy: "Work backwards: scale the probability fraction to the known count",
        solutions: [
          {
            label: "Scale the fraction",
            steps: [
              "P(red) = 3/8 means 3 reds for every 8 counters.",
              "15 ÷ 3 = 5, so the bag is 5 'lots' of this ratio.",
              "Total = 8 × 5 = 40.",
              "White = 40 − 15 = 25.",
            ],
          },
          {
            label: "Equation",
            steps: [
              "Let total = n. Then 15/n = 3/8.",
              "Cross-multiply: 3n = 15 × 8 = 120.",
              "n = 40, so total = 40.",
              "White = 40 − 15 = 25.",
            ],
          },
        ],
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "prob-mcq-paper-1",
        title: "Probability — MCQ Set A",
        questions: [
          {
            id: "prob-mcq-b1-q01",
            question: "Which word describes an event with probability 1?",
            options: ["Impossible", "Unlikely", "Even chance", "Certain"],
            answerIndex: 3,
            explanation: "A probability of 1 means the event is certain to happen.",
            difficulty: "warmup",
          },
          {
            id: "prob-mcq-b1-q02",
            question: "Write 1/4 as a percentage.",
            options: ["14%", "25%", "40%", "75%"],
            answerIndex: 1,
            explanation: "1/4 = 0.25 = 25%.",
            difficulty: "warmup",
          },
          {
            id: "prob-mcq-b1-q03",
            question:
              "A letter is chosen at random from the word BANANA. What is the probability it is an A?",
            options: ["1/6", "1/3", "1/2", "2/3"],
            answerIndex: 2,
            explanation: "BANANA has 6 letters and 3 are A, so P(A) = 3/6 = 1/2.",
            difficulty: "core",
            hints: ["Count the A's and the total letters."],
            strategy: "Count favourable ÷ total",
          },
          {
            id: "prob-mcq-b1-q04",
            question:
              "P(A) = 0.2, P(B) = 0.5 and P(C) = 0.3 for three mutually exclusive events covering all outcomes. What is P(A or C)?",
            options: ["0.1", "0.3", "0.5", "0.7"],
            answerIndex: 2,
            explanation:
              "For mutually exclusive events P(A or C) = P(A) + P(C) = 0.2 + 0.3 = 0.5.",
            difficulty: "core",
            hints: ["Add the probabilities of A and C.", "0.2 + 0.3 = 0.5."],
            strategy: "Add probabilities of mutually exclusive events",
          },
          {
            id: "prob-mcq-b1-q05",
            question:
              "Two fair dice are rolled. What is the probability the two numbers are the same (a double)?",
            options: ["1/36", "1/6", "1/3", "1/2"],
            answerIndex: 1,
            explanation:
              "Doubles are (1,1),(2,2),(3,3),(4,4),(5,5),(6,6) — 6 out of 36, so 6/36 = 1/6.",
            difficulty: "core",
            hints: ["List the doubles.", "There are 6 doubles out of 36 outcomes."],
            strategy: "Count matches in the sample space",
          },
          {
            id: "prob-mcq-b1-q06",
            question:
              "A coin is biased so that P(heads) = 0.6. It is flipped 50 times. About how many heads are expected?",
            options: ["6", "25", "30", "60"],
            answerIndex: 2,
            explanation: "Expected frequency = 0.6 × 50 = 30.",
            difficulty: "core",
            hints: ["Expected = probability × number of trials."],
            strategy: "Multiply probability by trials",
          },
        ],
      },
      {
        id: "prob-mcq-paper-2",
        title: "Probability — MCQ Set B",
        questions: [
          {
            id: "prob-mcq-b2-q01",
            question: "Which of these probabilities is impossible to be correct?",
            options: ["0.05", "0", "1", "1.4"],
            answerIndex: 3,
            explanation: "Probabilities must lie between 0 and 1, so 1.4 is impossible.",
            difficulty: "warmup",
          },
          {
            id: "prob-mcq-b2-q02",
            question: "A fair die is rolled. What is P(rolling a number greater than 4)?",
            options: ["1/6", "1/3", "1/2", "2/3"],
            answerIndex: 1,
            explanation: "Numbers greater than 4 are 5 and 6 — 2 out of 6, so 2/6 = 1/3.",
            difficulty: "warmup",
          },
          {
            id: "prob-mcq-b2-q03",
            question:
              "The probability of picking a winning ticket is 7%. What is the probability of NOT winning?",
            options: ["7%", "70%", "93%", "100%"],
            answerIndex: 2,
            explanation: "P(not win) = 100% − 7% = 93%.",
            difficulty: "core",
            hints: ["Complement in percentages: 100% − P(win)."],
            strategy: "Apply the complement rule",
          },
          {
            id: "prob-mcq-b2-q04",
            question:
              "Two fair dice are rolled and added. What is the probability the total is 10?",
            options: ["1/12", "1/9", "1/6", "1/10"],
            answerIndex: 0,
            explanation:
              "Total 10 comes from (4,6),(5,5),(6,4) — 3 ways out of 36, so 3/36 = 1/12.",
            difficulty: "challenge",
            hints: [
              "List the pairs that add to 10.",
              "There are 3 such pairs out of 36 outcomes.",
              "3/36 simplifies to 1/12.",
            ],
            strategy: "Count combinations in the sample space, then simplify",
          },
          {
            id: "prob-mcq-b2-q05",
            question:
              "In an experiment a dice landed on six 45 times out of 270 rolls. What is the relative frequency of six?",
            options: ["1/4", "1/5", "1/6", "1/9"],
            answerIndex: 2,
            explanation:
              "Relative frequency = 45/270 = 1/6. (Close to the theoretical 1/6 for a fair die.)",
            difficulty: "core",
            hints: ["Divide successes by trials.", "45 ÷ 270 simplifies."],
            strategy: "Use relative frequency = successes ÷ trials",
          },
          {
            id: "prob-mcq-b2-q06",
            question:
              "A bag has red and blue counters only. P(red) = 2/3 and there are 8 blue counters. How many counters are there in total?",
            options: ["12", "16", "24", "32"],
            answerIndex: 2,
            explanation:
              "P(blue) = 1 − 2/3 = 1/3. If 1/3 of the bag is 8 counters, the total is 8 × 3 = 24.",
            difficulty: "challenge",
            hints: [
              "Find P(blue) using the complement.",
              "If 1/3 of the total is 8, what is the whole?",
              "8 × 3 = 24.",
            ],
            strategy: "Work backwards from a known count using the complement",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "prob-qa-paper-1",
        title: "Probability — Written Set A",
        questions: [
          {
            id: "prob-qa-b1-q01",
            question:
              "A spinner has 8 equal sectors numbered 1 to 8. Find P(landing on an odd number). Give your answer as a fraction in simplest form.",
            modelAnswer:
              "Odd numbers are 1, 3, 5, 7 — that is 4 out of 8, so P(odd) = 4/8 = 1/2.",
            markScheme: ["Identifies 4 odd numbers out of 8 [1]", "P = 4/8 = 1/2 [1]"],
            difficulty: "warmup",
          },
          {
            id: "prob-qa-b1-q02",
            question:
              "The probability that Maya wins a game is 0.45 and the probability of a draw is 0.2. Work out the probability that Maya loses.",
            modelAnswer:
              "Win, draw and lose cover all outcomes and are mutually exclusive, so they sum to 1. P(lose) = 1 − 0.45 − 0.2 = 0.35.",
            markScheme: [
              "Uses total probability = 1 [1]",
              "1 − 0.45 − 0.2 [1]",
              "= 0.35 [1]",
            ],
            commonError: "Only subtracting one of the two known probabilities.",
            difficulty: "core",
            hints: ["All three outcomes' probabilities add to 1.", "Subtract both known values from 1."],
            strategy: "Use 'all outcomes sum to 1'",
          },
          {
            id: "prob-qa-b1-q03",
            question:
              "Two fair dice are rolled and the scores multiplied together. (a) Use a sample-space diagram to find how many of the 36 outcomes give a product greater than 20. (b) Hence write P(product > 20) as a fraction in simplest form.",
            modelAnswer:
              "(a) Products over 20: (4,6)=24, (6,4)=24, (5,5)=25, (5,6)=30, (6,5)=30, (6,6)=36 — that is 6 outcomes. (b) P(product > 20) = 6/36 = 1/6.",
            markScheme: [
              "Systematically searches the grid for products > 20 [1]",
              "Finds all 6 outcomes (24, 24, 25, 30, 30, 36) [1]",
              "P = 6/36 = 1/6 [1]",
            ],
            commonError: "Missing that (4,6) and (6,4) are two separate outcomes, or including a product of 20.",
            difficulty: "challenge",
            hints: [
              "Build the 6×6 grid of products.",
              "Only count products strictly greater than 20 (not equal to 20).",
              "Remember (4,6) and (6,4) are different cells.",
            ],
            strategy: "Use a sample-space grid and search systematically",
            solutions: [
              {
                label: "Sample-space grid",
                steps: [
                  "Fill a 6×6 grid with each product (Die 1 × Die 2).",
                  "Scan for cells with value > 20: 24, 24, 25, 30, 30, 36.",
                  "That is 6 cells out of 36.",
                  "P = 6/36 = 1/6.",
                ],
              },
              {
                label: "Reasoning about factors",
                steps: [
                  "A product over 20 needs large factors, so consider only dice showing 4, 5 or 6.",
                  "Check pairs: 4×6 and 6×4 (24), 5×5 (25), 5×6 and 6×5 (30), 6×6 (36).",
                  "All other pairs give 20 or less, so there are 6 winning outcomes.",
                  "P = 6/36 = 1/6.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
