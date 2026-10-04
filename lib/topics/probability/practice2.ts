import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Diagrams (inline SVG)
// ---------------------------------------------------------------------------

const spinnerEight = `<svg viewBox="0 0 240 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A fair circular spinner with 8 equal sectors. Going clockwise from the top the sectors show 1, 3, 2, 5, 3, 4, 3, 2"><rect x="0" y="0" width="240" height="230" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><path d="M120,115 L120,20 A95,95 0 0,1 187.18,47.82 Z" fill="#c7d2fe"/><path d="M120,115 L187.18,47.82 A95,95 0 0,1 215,115 Z" fill="#fde68a"/><path d="M120,115 L215,115 A95,95 0 0,1 187.18,182.18 Z" fill="#c7d2fe"/><path d="M120,115 L187.18,182.18 A95,95 0 0,1 120,210 Z" fill="#fde68a"/><path d="M120,115 L120,210 A95,95 0 0,1 52.82,182.18 Z" fill="#c7d2fe"/><path d="M120,115 L52.82,182.18 A95,95 0 0,1 25,115 Z" fill="#fde68a"/><path d="M120,115 L25,115 A95,95 0 0,1 52.82,47.82 Z" fill="#c7d2fe"/><path d="M120,115 L52.82,47.82 A95,95 0 0,1 120,20 Z" fill="#fde68a"/></g><g font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937" text-anchor="middle"><text x="143.7" y="62.7">1</text><text x="177.3" y="96.3">3</text><text x="177.3" y="143.7">2</text><text x="143.7" y="177.3">5</text><text x="96.3" y="177.3">3</text><text x="62.7" y="143.7">4</text><text x="62.7" y="96.3">3</text><text x="96.3" y="62.7">2</text></g><line x1="120" y1="115" x2="144" y2="105" stroke="#1f2937" stroke-width="3"/><polygon points="152.3,101.6 145.9,109.6 142.1,100.4" fill="#1f2937"/><circle cx="120" cy="115" r="5" fill="#1f2937"/></svg>`;

const vennMrtBus = `<svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram of probabilities for a randomly chosen student. MRT only 0.35, both MRT and bus 0.1, bus only shown as a question mark, neither 0.2"><rect x="0" y="0" width="340" height="210" fill="#ffffff"/><rect x="10" y="10" width="320" height="190" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="135" cy="110" r="72" fill="#bae6fd" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><circle cx="205" cy="110" r="72" fill="#bbf7d0" fill-opacity="0.6" stroke="#1f2937" stroke-width="1.5"/><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="62" y="36">MRT</text><text x="278" y="36">Bus</text></g><g font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="100" y="115">0.35</text><text x="170" y="115">0.1</text><text x="242" y="115">?</text><text x="300" y="188">0.2</text></g></svg>`;

const treePenalties = `<svg viewBox="0 0 330 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tree diagram for two penalty kicks. First kick: score 0.8, miss unknown. After scoring, second kick: score 0.9, miss unknown. After missing, second kick: score 0.6, miss unknown"><rect x="0" y="0" width="330" height="240" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><line x1="20" y1="125" x2="105" y2="66"/><line x1="20" y1="125" x2="105" y2="184"/><line x1="152" y1="66" x2="250" y2="36"/><line x1="152" y1="66" x2="250" y2="96"/><line x1="145" y1="184" x2="250" y2="154"/><line x1="145" y1="184" x2="250" y2="214"/></g><circle cx="20" cy="125" r="3" fill="#1f2937"/><g font-size="13" font-family="sans-serif" fill="#1f2937"><text x="128" y="18" text-anchor="middle">1st kick</text><text x="276" y="18" text-anchor="middle">2nd kick</text><text x="110" y="71">Score</text><text x="110" y="189">Miss</text><text x="255" y="41">Score</text><text x="255" y="101">Miss</text><text x="255" y="159">Score</text><text x="255" y="219">Miss</text></g><g font-size="13" font-family="sans-serif" fill="#1e40af" text-anchor="middle"><text x="52" y="88">0.8</text><text x="52" y="172">?</text><text x="192" y="42">0.9</text><text x="196" y="99">?</text><text x="190" y="160">0.6</text><text x="192" y="216">?</text></g></svg>`;

// ---------------------------------------------------------------------------
// Practice Papers 3 and 4
// ---------------------------------------------------------------------------

export const morePapers: Paper[] = [
  // ======================================================================
  // Practice Paper 3 — problem solving in context, multi-step
  // ======================================================================
  {
    id: "probability-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "probability-p3-q01",
        question:
          "At a Mid-Autumn Festival party there is a box of 40 mini mooncakes: 14 lotus paste, 10 red bean and 16 pandan. Siti takes one without looking. What is the probability that it is pandan? Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 5, simplest: true },
        solution: [
          "Total number of mooncakes: 14 + 10 + 16 = 40.",
          "Pandan mooncakes (the outcomes you want): 16.",
          "P(pandan) = {{16/40}} = {{2/5}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 2, d: 3 },
            feedback:
              "You compared pandan with the *other* mooncakes (16 to 24). A probability compares the outcomes you want with **all** 40 mooncakes.",
          },
        ],
        commonError: "Dividing by the number of non-pandan mooncakes instead of the total.",
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["How many mooncakes could she pick altogether? P = (number of pandan) ÷ (total number)."],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "short",
        id: "probability-p3-q02",
        question:
          "At a hawker centre, every customer pays in exactly one way: QR code, card or cash. For a customer chosen at random, P(QR code) = 0.73 and P(card) = 0.15. Find P(cash). Give your answer as a decimal.",
        answer: { type: "number", value: 0.12, allowFraction: false },
        solution: [
          "The three ways of paying cannot happen together and cover every customer, so their probabilities add up to 1.",
          "0.73 + 0.15 = 0.88.",
          "P(cash) = 1 − 0.88 = 0.12.",
        ],
        traps: [
          {
            spec: { type: "number", value: 0.27 },
            feedback:
              "0.27 is P(not QR code). Card payers are inside that 0.27 too — take away P(card) as well.",
          },
          {
            spec: { type: "number", value: 0.88 },
            feedback: "0.88 is P(QR code or card). Cash is everything else: subtract from 1.",
          },
        ],
        commonError: "Working out 1 − 0.73 and stopping, forgetting the card payments.",
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["What must the three probabilities add up to? Add the two you know, then subtract from 1."],
        strategy: "Use the complement",
      },
      {
        kind: "short",
        id: "probability-p3-q03",
        question:
          "Ravi's bike lock has 3 wheels, and each wheel shows a digit from 0 to 9. He has forgotten his code, but he remembers that the first digit is 7. What is the greatest number of codes he might have to try?",
        answer: { type: "number", value: 100 },
        solution: [
          "First wheel: 1 choice (it must be 7).",
          "Second wheel: 10 choices. Third wheel: 10 choices.",
          "Product rule: 1 × 10 × 10 = 100 codes — every code from 700 to 799.",
        ],
        traps: [
          {
            spec: { type: "number", value: 1000 },
            feedback:
              "1000 is every possible code. Ravi already knows the first digit, so only the last two wheels are unknown.",
          },
          {
            spec: { type: "number", value: 20 },
            feedback:
              "Choices multiply, they don't add: each of the 10 second digits can go with each of the 10 third digits.",
          },
        ],
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["How many choices are left for each wheel? Then multiply the numbers of choices."],
        strategy: "Use the product rule",
      },
      {
        kind: "short",
        id: "probability-p3-q04",
        question:
          "A durian seller in Geylang opens 80 durians from a new farm and finds that 12 of them are not good. Use his results to estimate the probability that the next durian from this farm is not good. Give your answer as a decimal.",
        answer: { type: "number", value: 0.15, allowFraction: false },
        solution: [
          "Relative frequency = number of times it happened ÷ number of trials.",
          "{{12/80}} = 0.15.",
          "So P(not good) is estimated as 0.15.",
        ],
        traps: [
          {
            spec: { type: "number", value: 0.176, tolerance: 0.006 },
            feedback: "You divided by the good durians (68). Divide by all 80 durians that were opened.",
          },
          {
            spec: { type: "number", value: 0.85 },
            feedback: "0.85 is the estimate that a durian **is** good. The question asks about not good.",
          },
        ],
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["Relative frequency = successes ÷ trials. Here a 'success' is a durian that is not good."],
        strategy: "Use relative frequency as an estimate",
      },
      {
        kind: "short",
        id: "probability-p3-q05",
        question:
          "At a charity stall outside an MRT station, the probability that a person walking past stops to donate is 0.08. On Saturday morning 650 people walk past. How many people would you expect to donate?",
        answer: { type: "number", value: 52 },
        solution: ["Expected number = probability × number of trials.", "0.08 × 650 = 52 people."],
        traps: [
          {
            spec: { type: "number", value: 520 },
            feedback: "Check the decimal: 0.08 means 8 in every 100 people, not 80 in every 100.",
          },
        ],
        difficulty: "warmup",
        guideRef: "expected-outcomes",
        hints: ["Expected number = probability × number of trials. Think: 8 in every 100 people."],
        strategy: "Expected number = probability × trials",
      },
      {
        kind: "short",
        id: "probability-p3-q06",
        question:
          "A whole number from 1 to 50 is chosen at random. What is the probability that the number contains the digit 3 (for example 3, 23 or 34)? Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 7, d: 25, simplest: true },
        solution: [
          "Numbers ending in 3: 3, 13, 23, 33, 43 — that's 5.",
          "Numbers in the thirties: 30, 31, …, 39 — that's 10.",
          "33 is in both lists, so it has been counted twice: 5 + 10 − 1 = 14 numbers.",
          "P(contains a 3) = {{14/50}} = {{7/25}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 3, d: 10 },
            feedback: "That's {{15/50}} — you counted 33 twice. It has a 3 in both places, but it's only one number.",
          },
          {
            spec: { type: "fraction", n: 1, d: 10 },
            feedback: "You've only counted numbers *ending* in 3. What about 30 to 39?",
          },
        ],
        commonError: "Counting 33 twice, or forgetting the numbers in the thirties.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "Split into cases: a 3 in the units place, and a 3 in the tens place.",
          "How many numbers from 1 to 50 end in 3? How many are in the thirties?",
          "Is any number in both of your lists?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "probability-p3-q07",
        question:
          "A lucky dip at a school carnival holds only red, green and yellow capsules. A capsule is picked at random. P(red) = 0.4, and picking a green capsule is twice as likely as picking a yellow one. There are 12 yellow capsules. How many capsules are in the lucky dip altogether?",
        answer: { type: "number", value: 60 },
        solution: [
          "Green and yellow together: 1 − 0.4 = 0.6.",
          "Green is twice as likely as yellow, so split 0.6 in the ratio 2 : 1. P(yellow) = 0.6 ÷ 3 = 0.2 and P(green) = 0.4.",
          "The 12 yellow capsules make up 0.2 (one fifth) of the lucky dip.",
          "Total = 12 ÷ 0.2 = 60 capsules.",
          "Check: 24 red, 24 green and 12 yellow make 60, and {{24/60}} = 0.4 ✓.",
        ],
        traps: [
          {
            spec: { type: "number", value: 0.2 },
            feedback: "0.2 is P(yellow) — a good first step. Now use it: 12 capsules are 0.2 of the total.",
          },
          {
            spec: { type: "number", value: 36 },
            feedback:
              "Red takes 0.4 first. Green and yellow share only the remaining 0.6, so P(yellow) is 0.2, not {{1/3}}.",
          },
        ],
        commonError: "Sharing the whole probability 1 between green and yellow and forgetting red.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "What do P(green) and P(yellow) add up to?",
          "If P(yellow) = {{p}}, then P(green) = {{2p}}. Solve {{0.4 + 2p + p = 1}}.",
          "12 yellow capsules are what fraction of the whole lucky dip?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "probability-p3-q08",
        question:
          "Arjun flips three fair coins. He lists the outcomes:\n\nHHH, HHT, HTT, TTT, THH, TTH\n\nHe says: \"There are 6 outcomes and 2 of them have exactly two heads, so P(exactly two heads) = {{2/6}}.\"\n\nExplain what is wrong with Arjun's list, and find the correct probability.",
        marks: 3,
        modelAnswer:
          "Arjun has not listed systematically, so he has missed some outcomes. Each coin has 2 outcomes, so there are 2 × 2 × 2 = 8 equally likely outcomes. In order: HHH, HHT, HTH, HTT, THH, THT, TTH, TTT. He missed HTH and THT. The outcomes with exactly two heads are HHT, HTH and THH, so P(exactly two heads) = {{3/8}}.",
        markScheme: [
          {
            point: "Identifies the missing outcomes HTH and THT (or says the list is incomplete because it isn't systematic)",
            keywords: ["hth", "tht", "missing", "missed", "systematic"],
          },
          {
            point: "States there are 2 × 2 × 2 = 8 equally likely outcomes",
            keywords: ["8", "eight", "2 × 2 × 2", "2x2x2"],
          },
          {
            point: "Correct probability {{3/8}} (from HHT, HTH and THH)",
            keywords: ["3/8", "three", "hht", "hth", "thh"],
          },
        ],
        commonError:
          "Thinking HHT, HTH and THH are the same outcome because they all have two heads — which coin shows the tail matters.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "Use the product rule: how many outcomes should three coins give?",
          "List systematically: fix the first coin as H and list the four possibilities for the other two coins, then do the same with T.",
          "Which outcomes with exactly two heads did Arjun miss?",
        ],
        strategy: "List systematically",
      },
      {
        kind: "short",
        id: "probability-p3-q09",
        question:
          "Hana rolls a fair four-sided dice (numbered 1 to 4) and a fair six-sided dice (numbered 1 to 6), and multiplies the two scores. Find the probability that the product is a square number. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 1, d: 4, simplest: true },
        solution: [
          "There are 4 × 6 = 24 equally likely outcomes.",
          "The largest product is 4 × 6 = 24, so the possible square numbers are 1, 4, 9 and 16.",
          "Writing the four-sided score first: 1 = 1 × 1; 4 = 1 × 4, 2 × 2 or 4 × 1; 9 = 3 × 3; 16 = 4 × 4.",
          "That's 6 outcomes, so P(square) = {{6/24}} = {{1/4}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 5, d: 24 },
            feedback:
              "You're one outcome short. Did you remember that 1 = 1 × 1 is a square number, and that 4 can be 1 × 4 **and** 4 × 1?",
          },
          {
            spec: { type: "fraction", n: 1, d: 6 },
            feedback:
              "You counted the square *products* (1, 4, 9, 16). Some products can be made in more than one way — count outcomes (pairs of scores), not products.",
          },
        ],
        commonError: "Forgetting that 1 is a square number, or counting each product once instead of each outcome.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "How many equally likely outcomes are there? Picture a 4 by 6 grid.",
          "Which square numbers are possible when the biggest product is 24?",
          "For each square number, list every pair (four-sided score, six-sided score) that makes it.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "probability-p3-q10",
        question:
          "At a Year 8 camp on Pulau Ubin, each of the 120 students chose one activity: kayaking or cycling. 55 of the students are girls. 70 students chose cycling. 30 boys chose kayaking. One student is chosen at random. Find the probability that the student is a girl who chose cycling. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 7, d: 24, simplest: true },
        solution: [
          "Boys: 120 − 55 = 65.",
          "Boys who cycled: 65 − 30 = 35.",
          "Girls who cycled: 70 − 35 = 35.",
          "| | Kayaking | Cycling | Total |\n|---|---|---|---|\n| Boys | 30 | 35 | 65 |\n| Girls | 20 | 35 | 55 |\n| Total | 50 | 70 | 120 |",
          "P(girl who chose cycling) = {{35/120}} = {{7/24}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 7, d: 11 },
            feedback:
              "{{35/55}} is the probability that a *girl* chose cycling. Here the student is picked from all 120 students.",
          },
          {
            spec: { type: "fraction", n: 1, d: 2 },
            feedback: "{{35/70}} is the fraction of cyclists who are girls. Divide by all 120 students.",
          },
        ],
        commonError: "Dividing by the wrong total (the girls or the cyclists instead of all 120 students).",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Put the facts into a two-way table: Boys and Girls down the side, Kayaking and Cycling across the top.",
          "How many boys are there? How many of them cycled?",
          "Girls who cycled = all cyclists − boys who cycled.",
        ],
        strategy: "Draw a two-way table",
      },
      {
        kind: "short",
        id: "probability-p3-q11",
        question:
          "Jun throws a paper cup 200 times and records how it lands.\n\n| Landing | Upright | Upside down | On its side |\n|---|---|---|---|\n| Frequency | 38 | 22 | ? |\n\nHe is going to throw the cup another 1000 times. Use his results to estimate how many of these throws will land on its side.",
        answer: { type: "number", value: 700 },
        solution: [
          "On its side: 200 − 38 − 22 = 140 throws.",
          "Relative frequency of 'on its side' = {{140/200}} = 0.7.",
          "Estimate for 1000 throws: 0.7 × 1000 = 700.",
        ],
        traps: [
          {
            spec: { type: "number", value: 140 },
            feedback: "140 is from the first 200 throws. Scale it up for 1000 throws.",
          },
          {
            spec: { type: "number", value: 333, tolerance: 1 },
            feedback:
              "The three landings are not equally likely — a cup isn't a fair dice. Use Jun's results, not {{1/3}}.",
          },
        ],
        commonError: "Assuming each way of landing is equally likely instead of using the experiment.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "First find the missing frequency.",
          "What fraction of the 200 throws landed on its side?",
          "Use that relative frequency for 1000 throws.",
        ],
        strategy: "Use relative frequency as an estimate",
      },
      {
        kind: "written",
        id: "probability-p3-q12",
        question:
          "A survey asks 100 Year 8 students whether they bring a reusable water bottle to school.\n\n| | Brings a bottle | Does not | Total |\n|---|---|---|---|\n| Boys | 36 | 24 | 60 |\n| Girls | 28 | 12 | 40 |\n| Total | 64 | 36 | 100 |\n\nZara says: \"More boys than girls bring a bottle, so a boy is more likely to bring a bottle than a girl.\"\n\nIs Zara right? Explain, using probabilities.",
        marks: 3,
        modelAnswer:
          "No. There are more boys than girls in the survey, so comparing the counts 36 and 28 is unfair — you need to compare proportions. P(a boy brings a bottle) = {{36/60}} = 0.6. P(a girl brings a bottle) = {{28/40}} = 0.7. Since 0.7 > 0.6, a girl is more likely to bring a bottle than a boy, so Zara is wrong.",
        markScheme: [
          {
            point: "P(a boy brings a bottle) = {{36/60}} = 0.6 (or 60%, {{3/5}})",
            keywords: ["36/60", "0.6", "60%", "3/5"],
          },
          {
            point: "P(a girl brings a bottle) = {{28/40}} = 0.7 (or 70%, {{7/10}})",
            keywords: ["28/40", "0.7", "70%", "7/10"],
          },
          {
            point: "Concludes Zara is wrong — a girl is more likely — because the groups are different sizes, so proportions (not counts) must be compared",
            keywords: ["wrong", "girl", "more boys", "proportion", "not right", "different sizes"],
          },
        ],
        commonError: "Comparing raw counts (36 and 28) when the two groups are different sizes.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "There are 60 boys but only 40 girls. Is comparing 36 with 28 fair?",
          "Find the fraction of the boys who bring a bottle, and the fraction of the girls who do.",
          "Compare the two probabilities.",
        ],
        strategy: "Compare proportions, not counts",
      },
      {
        kind: "short",
        id: "probability-p3-q13",
        question:
          "In a class of 40 students, 22 have visited Malaysia, 13 have visited Indonesia and 11 have visited neither country. A student who has visited Indonesia is chosen at random. What is the probability that this student has also visited Malaysia? Give your answer as a fraction.",
        answer: { type: "fraction", n: 6, d: 13 },
        solution: [
          "Students who visited at least one of the countries: 40 − 11 = 29.",
          "22 + 13 = 35, which is 6 more than 29. So 6 students were counted twice: they visited both.",
          "Venn diagram: Malaysia only 16, both 6, Indonesia only 7, neither 11 (total 40 ✓).",
          "Choose only from the 13 students who visited Indonesia: P(also visited Malaysia) = {{6/13}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 3, d: 20 },
            feedback:
              "{{6/40}} is the chance that a student from the whole class visited both. Here you choose only from the 13 who visited Indonesia.",
          },
          {
            spec: { type: "fraction", n: 7, d: 13 },
            feedback: "7 is the number who visited Indonesia **only**. You want the ones who visited both countries.",
          },
        ],
        commonError: "Dividing by the whole class (40) instead of the 13 Indonesia visitors.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "How many students visited at least one of the two countries?",
          "22 + 13 is more than that number. Why?",
          "Now look only inside the Indonesia circle: how many of those 13 are also in the Malaysia circle?",
        ],
        strategy: "Draw a Venn diagram",
      },
      {
        kind: "written",
        id: "probability-p3-q14",
        question:
          "A quiz has 20 multiple-choice questions, each with 4 options and exactly one correct option. A correct answer scores +3 marks and a wrong answer scores −1 mark. Mei guesses every answer at random.\n\nShow that Mei's expected score is 0, and explain what this tells you about guessing in this quiz.",
        marks: 3,
        modelAnswer:
          "For each question P(correct) = {{1/4}}, so Mei expects 20 × {{1/4}} = 5 correct answers and 20 − 5 = 15 wrong answers. Expected score = 5 × 3 − 15 × 1 = 15 − 15 = 0. So, on average, random guessing gains nothing: the marks lost on wrong answers exactly cancel the marks from lucky guesses. On a real attempt she could score a bit more or less than 0 — 0 is the long-run average.",
        markScheme: [
          {
            point: "Expected number correct = 20 × {{1/4}} = 5",
            keywords: ["5", "five", "1/4", "0.25"],
          },
          {
            point: "Expected wrong = 15, so expected score = 5 × 3 − 15 × 1 = 0",
            keywords: ["15", "15 − 15", "15 - 15", "0", "zero"],
          },
          {
            point: "Interprets: guessing gives no advantage on average (the penalty cancels the gains), though an actual score can vary",
            keywords: ["average", "nothing", "cancel", "penalty", "vary", "no advantage"],
          },
        ],
        commonError: "Forgetting to subtract the marks lost on the 15 expected wrong answers (which gives 15).",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "What is the probability of guessing one question correctly?",
          "How many correct answers would you expect out of 20? How many wrong?",
          "Work out the marks gained from the expected correct answers and the marks lost on the expected wrong ones.",
        ],
        strategy: "Expected number = probability × trials",
      },
      {
        kind: "short",
        id: "probability-p3-q15",
        question:
          "Six students — 4 girls and 2 boys — stand for election as House Captain and Vice-Captain. The captain is picked at random from the six; then the vice-captain is picked at random from the other five. Find the probability that both roles go to girls. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 5, simplest: true },
        solution: [
          "Product rule: 6 choices for captain, then 5 for vice-captain, so 6 × 5 = 30 equally likely (captain, vice-captain) pairs.",
          "Both girls: 4 choices for a girl captain, then 3 girls left for vice-captain: 4 × 3 = 12 pairs.",
          "P(both girls) = {{12/30}} = {{2/5}}.",
        ],
        solutions: [
          {
            label: "Multiply probabilities (tree diagram)",
            steps: [
              "P(captain is a girl) = {{4/6}}.",
              "Then 3 of the remaining 5 students are girls: P(vice-captain is a girl) = {{3/5}}.",
              "{{4/6 * 3/5 = 12/30 = 2/5}}. Same answer — the product rule and the tree are the same idea.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 4, d: 9 },
            feedback:
              "That's {{4/6 * 4/6}}. The same student can't hold both roles, so the vice-captain comes from only 5 students — and only 3 of them are girls.",
          },
          {
            spec: { type: "fraction", n: 2, d: 3 },
            feedback: "{{4/6}} is only P(the captain is a girl). The vice-captain must be a girl too.",
          },
        ],
        commonError: "Forgetting that once a girl is captain, there are fewer girls (and fewer students) left.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "How many (captain, vice-captain) pairs are possible? Remember the same person can't do both.",
          "How many of those pairs have a girl in both roles?",
          "4 choices for a girl captain — then how many girls are left to be vice-captain?",
        ],
        strategy: "Use the product rule",
      },
      {
        kind: "short",
        id: "probability-p3-q16",
        question:
          "On his walk to school, Ravi crosses at two sets of traffic lights. The probability that the first is green when he arrives is 0.6, and the probability that the second is green when he arrives is 0.5. The two lights work independently. Find the probability that Ravi has to stop at least once (at least one light is not green). Give your answer as a decimal.",
        answer: { type: "number", value: 0.7, allowFraction: false },
        solution: [
          "The opposite of 'stops at least once' is 'both lights are green'.",
          "The lights are independent, so multiply: P(green, green) = 0.6 × 0.5 = 0.3.",
          "P(stops at least once) = 1 − 0.3 = 0.7.",
        ],
        solutions: [
          {
            label: "Add the branches of a tree diagram",
            steps: [
              "P(stop, then green) = 0.4 × 0.5 = 0.2.",
              "P(green, then stop) = 0.6 × 0.5 = 0.3.",
              "P(stop, then stop) = 0.4 × 0.5 = 0.2.",
              "Total: 0.2 + 0.3 + 0.2 = 0.7. The complement method is quicker — one branch instead of three.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 0.2 },
            feedback: "0.2 is P(he stops at **both** lights). 'At least once' also includes stopping at just one of them.",
          },
          {
            spec: { type: "number", value: 0.9 },
            feedback:
              "Adding 0.4 + 0.5 counts 'stops at both' twice. Use the opposite event: he never stops.",
          },
        ],
        commonError: "Adding the probabilities of stopping at each light instead of using the complement.",
        difficulty: "core",
        guideRef: "tree-diagrams",
        hints: [
          "'At least once' has several cases. What is the only case where he does NOT stop?",
          "For independent events, multiply along the branches.",
          "Subtract that probability from 1.",
        ],
        strategy: "Use the complement",
      },
      {
        kind: "written",
        id: "probability-p3-q17",
        question:
          "Ethan and Ravi play a game with two fair six-sided dice. They roll both dice and work out the difference between the scores (larger minus smaller, so it could be 0). Ethan wins if the difference is 0 or 1. Ravi wins if the difference is 2, 3, 4 or 5.\n\n(a) Is the game fair? Show how you decide.\n\n(b) Find a different way to share out the differences 0 to 5 between the two players so that each player is equally likely to win.",
        marks: 4,
        modelAnswer:
          "A 6 × 6 sample space has 36 equally likely outcomes. Counting the differences: 0 in 6 ways, 1 in 10 ways, 2 in 8 ways, 3 in 6 ways, 4 in 4 ways and 5 in 2 ways (total 36 ✓).\n\n(a) Ethan wins in 6 + 10 = 16 outcomes, so P(Ethan wins) = {{16/36}}. Ravi wins in 8 + 6 + 4 + 2 = 20 outcomes, so P(Ravi wins) = {{20/36}}. The game is not fair: Ravi is more likely to win, even though Ethan has the two most common differences.\n\n(b) For a fair game each player needs 18 of the 36 outcomes. For example, Ethan wins on a difference of 1 or 2 (10 + 8 = 18) and Ravi wins on 0, 3, 4 or 5 (6 + 6 + 4 + 2 = 18).",
        markScheme: [
          {
            point: "Uses a 36-outcome sample space and counts the differences correctly (6, 10, 8, 6, 4, 2)",
            keywords: ["36", "10", "8", "grid", "sample space"],
          },
          {
            point: "P(Ethan wins) = {{16/36}} and P(Ravi wins) = {{20/36}}",
            keywords: ["16/36", "20/36", "4/9", "5/9", "16", "20"],
          },
          {
            point: "Concludes the game is not fair — Ravi is more likely to win",
            keywords: ["not fair", "unfair", "ravi"],
          },
          {
            point: "Gives a fair split with 18 outcomes each, e.g. Ethan wins on 1 or 2 and Ravi wins on 0, 3, 4 or 5",
            keywords: ["18", "18/36", "1/2", "1 or 2", "half"],
          },
        ],
        commonError:
          "Judging fairness by how many *differences* each player has, instead of how many *outcomes* give each difference.",
        difficulty: "challenge",
        guideRef: "combined-events",
        hints: [
          "Draw a 6 by 6 grid and write the difference in every cell.",
          "How many cells show 0? 1? 2? … Check that your counts add up to 36.",
          "For a fair game, how many cells should each player have? Which differences can you combine to make exactly that number?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "probability-p3-q18",
        question:
          "A whole number from 1 to 100 is chosen at random. Find the probability that it is a multiple of 4 or a multiple of 6 (or both). Give your answer as a fraction.",
        answer: { type: "fraction", n: 33, d: 100 },
        solution: [
          "Multiples of 4 up to 100: 100 ÷ 4 = 25 of them.",
          "Multiples of 6 up to 100: 6, 12, …, 96 — that's 16 of them (96 = 6 × 16).",
          "Numbers that are multiples of both 4 and 6 are multiples of their LCM, 12: 12, 24, …, 96 — that's 8.",
          "Venn diagram: multiple of 4 only = 25 − 8 = 17, both = 8, multiple of 6 only = 16 − 8 = 8.",
          "Total = 17 + 8 + 8 = 33, so P = {{33/100}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 41, d: 100 },
            feedback:
              "25 + 16 = 41 counts the multiples of 12 twice — they are multiples of 4 **and** of 6. Put them in the overlap of a Venn diagram.",
          },
          {
            spec: { type: "fraction", n: 37, d: 100 },
            feedback:
              "The overlap is the multiples of 12 (the LCM of 4 and 6), not the multiples of 24 — 12 and 36 are multiples of both 4 and 6.",
          },
        ],
        commonError: "Adding the two counts without removing the numbers that are in both sets.",
        difficulty: "challenge",
        guideRef: "two-way-tables-venn",
        hints: [
          "Draw a Venn diagram with circles 'multiple of 4' and 'multiple of 6'. What goes in the overlap?",
          "A number in the overlap is a multiple of 4 and of 6 — so it is a multiple of which number?",
          "Count each region separately so that no number is counted twice.",
        ],
        strategy: "Draw a Venn diagram",
      },
      {
        kind: "short",
        id: "probability-p3-q19",
        question:
          "Priya is testing a spinner. After 50 spins, the relative frequency of red is 0.3. She keeps spinning and, amazingly, every one of her next spins lands on red. How many more spins does she need before the relative frequency of red reaches 0.5?",
        answer: { type: "number", value: 20 },
        solution: [
          "Reds so far: 0.3 × 50 = 15.",
          "Suppose she needs {{k}} more spins, all red. Then there are {{15 + k}} reds in {{50 + k}} spins.",
          "Set {{(15 + k)/(50 + k) = 1/2}}, so {{2(15 + k) = 50 + k}}.",
          "{{30 + 2k = 50 + k}}, so {{k = 20}}.",
          "Check: 35 reds in 70 spins is {{35/70}} = 0.5 ✓.",
        ],
        solutions: [
          {
            label: "Look for an invariant",
            steps: [
              "There are 50 − 15 = 35 spins that were not red. Extra red spins never change this number.",
              "A relative frequency of 0.5 means reds = non-reds, so she needs 35 reds.",
              "She has 15, so she needs 35 − 15 = 20 more. No algebra needed!",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 10 },
            feedback:
              "With 10 more reds she'd have {{25/60}}, not {{1/2}} — every extra spin also adds 1 to the total number of spins.",
          },
          {
            spec: { type: "number", value: 35 },
            feedback: "35 is the number of reds she ends with. How many **more** spins does that take?",
          },
        ],
        commonError: "Forgetting that each extra spin increases the total as well as the number of reds.",
        difficulty: "challenge",
        guideRef: "relative-frequency",
        hints: [
          "How many reds has she had so far?",
          "Each extra red spin adds 1 to the reds AND 1 to the total. Is there anything that stays the same?",
          "The number of non-red spins never changes. For a relative frequency of 0.5, how many reds must there be?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "probability-p3-q20",
        question:
          "A three-digit whole number (from 100 to 999) is chosen at random. Find the probability that its digits add up to 5. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 1, d: 60, simplest: true },
        solution: [
          "There are 999 − 100 + 1 = 900 three-digit numbers.",
          "Split into cases by the hundreds digit (it can't be 0).",
          "Hundreds digit 1: the other two digits add to 4 → 104, 113, 122, 131, 140 (5 numbers).",
          "Hundreds digit 2: the other two add to 3 → 4 numbers. Digit 3: 3 numbers. Digit 4: 2 numbers. Digit 5: just 500.",
          "Total: 5 + 4 + 3 + 2 + 1 = 15 numbers.",
          "P = {{15/900}} = {{1/60}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 5, d: 333 },
            feedback: "There are 900 three-digit numbers (100 to 999), not 999.",
          },
          {
            spec: { type: "number", value: 15 },
            feedback: "15 is how many numbers work. Now divide by how many three-digit numbers there are.",
          },
        ],
        commonError: "Using 999 as the number of three-digit numbers, or missing cases such as 500 and 140.",
        difficulty: "challenge",
        guideRef: "combined-events",
        hints: [
          "How many three-digit numbers are there? (Careful — it isn't 999.)",
          "Split into cases by the hundreds digit. If it's 1, what must the other two digits add up to?",
          "If the last two digits add to 4, the tens digit can be 0, 1, 2, 3 or 4. Spot the pattern for the other cases.",
        ],
        strategy: "Split into cases",
      },
    ],
  },

  // ======================================================================
  // Practice Paper 4 — exam style
  // ======================================================================
  {
    id: "probability-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "probability-p4-q01",
        question:
          "The fair spinner in the diagram has 8 equal sectors.\n\n(a) Find the probability that it lands on 3.\n\n(b) Find the probability that it lands on an odd number.\n\nGive both answers as fractions, (a) first.",
        diagram: spinnerEight,
        answer: { type: "list", values: [0.375, 0.625], ordered: true, display: "(a) {{3/8}}, (b) {{5/8}}" },
        solution: [
          "There are 8 equally likely sectors.",
          "(a) Three sectors show 3, so P(3) = {{3/8}}.",
          "(b) Odd sectors: 1, 3, 3, 3 and 5 — that's 5 sectors, so P(odd) = {{5/8}}.",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.375, 0.6], ordered: true },
            feedback:
              "For (b), count **sectors**, not different numbers. The numbers 1 to 5 aren't equally likely — three sectors show 3.",
          },
        ],
        difficulty: "warmup",
        guideRef: "probability-scale",
        hints: ["Count sectors, not different numbers: each of the 8 sectors is equally likely."],
        strategy: "Count equally likely outcomes",
      },
      {
        kind: "short",
        id: "probability-p4-q02",
        question:
          "The table shows how a visitor to the Singapore Zoo, chosen at random, travelled there. Each visitor used exactly one way.\n\n| Travel | Bus | Car | Taxi | Shuttle |\n|---|---|---|---|---|\n| Probability | 0.35 | 0.25 | 0.1 | ? |\n\n(a) Find P(shuttle).\n\n(b) Find the probability that the visitor did **not** travel by car.\n\nGive both answers as decimals, (a) first.",
        answer: { type: "list", values: [0.3, 0.75], ordered: true, display: "(a) 0.3, (b) 0.75" },
        solution: [
          "(a) The four probabilities add to 1: 0.35 + 0.25 + 0.1 = 0.7, so P(shuttle) = 1 − 0.7 = 0.3.",
          "(b) P(not car) = 1 − P(car) = 1 − 0.25 = 0.75.",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.7, 0.75], ordered: true },
            feedback: "For (a), 0.7 is the total of the three you know. P(shuttle) is 1 minus that.",
          },
        ],
        difficulty: "warmup",
        guideRef: "complementary-events",
        hints: ["The four probabilities must add up to 1, and P(not car) = 1 − P(car)."],
        strategy: "Use the complement",
      },
      {
        kind: "short",
        id: "probability-p4-q03",
        question:
          "Spinner A is numbered 1, 2, 3 and spinner B is numbered 2, 4, 6, 8. Both are fair. Mei spins both and adds the scores. She starts a sample space diagram:\n\n| + | 2 | 4 | 6 | 8 |\n|---|---|---|---|---|\n| 1 | 3 | 5 | ? | ? |\n| 2 | 4 | ? | ? | ? |\n| 3 | ? | ? | ? | 11 |\n\n(a) How many outcomes are in the sample space?\n\n(b) How many of the outcomes give a total greater than 7?\n\nGive your answers in order, (a) first.",
        answer: { type: "list", values: [12, 5], ordered: true, display: "(a) 12, (b) 5" },
        solution: [
          "(a) 3 × 4 = 12 outcomes.",
          "Completed totals — row 1: 3, 5, 7, 9; row 2: 4, 6, 8, 10; row 3: 5, 7, 9, 11.",
          "(b) Totals greater than 7: 9, 8, 10, 9, 11 — that's 5 outcomes.",
        ],
        traps: [
          {
            spec: { type: "list", values: [12, 7], ordered: true },
            feedback: "'Greater than 7' doesn't include 7 itself — leave out the two cells showing 7.",
          },
          {
            spec: { type: "list", values: [7, 5], ordered: true },
            feedback: "For (a), each of A's 3 numbers pairs with each of B's 4 numbers: multiply, 3 × 4.",
          },
        ],
        difficulty: "warmup",
        guideRef: "sample-spaces",
        hints: ["Fill in every cell of the table, then count the cells bigger than 7."],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "short",
        id: "probability-p4-q04",
        question:
          "Wei Ling spins a three-colour spinner 60 times.\n\n| Colour | Red | Blue | Green |\n|---|---|---|---|\n| Frequency | 27 | 21 | 12 |\n\nShe will spin it another 300 times. Use her results to estimate how many of those spins will land on blue.",
        answer: { type: "number", value: 105 },
        solution: [
          "Relative frequency of blue = {{21/60}} = 0.35.",
          "Estimate for 300 spins: 0.35 × 300 = 105.",
        ],
        traps: [
          {
            spec: { type: "number", value: 100 },
            feedback:
              "Her results suggest the colours aren't equally likely — use the relative frequency {{21/60}}, not {{1/3}}.",
          },
          {
            spec: { type: "number", value: 0.35 },
            feedback: "0.35 is the relative frequency. Multiply it by the 300 spins.",
          },
        ],
        difficulty: "warmup",
        guideRef: "relative-frequency",
        hints: ["What fraction of her 60 spins landed on blue? Use that fraction of 300."],
        strategy: "Use relative frequency as an estimate",
      },
      {
        kind: "short",
        id: "probability-p4-q05",
        question:
          "A fair ten-sided dice is numbered 0 to 9. It is rolled 250 times. How many times would you expect the score to be a prime number?",
        answer: { type: "number", value: 100 },
        solution: [
          "Primes from 0 to 9: 2, 3, 5, 7 — that's 4 of the 10 scores.",
          "P(prime) = {{4/10}} = 0.4.",
          "Expected number = 0.4 × 250 = 100.",
        ],
        traps: [
          {
            spec: { type: "number", value: 125 },
            feedback: "Check your primes: only 2, 3, 5 and 7. (1 is not prime, and 9 = 3 × 3.)",
          },
          {
            spec: { type: "number", value: 0.4 },
            feedback: "0.4 is the probability of a prime. Multiply by the 250 rolls.",
          },
        ],
        difficulty: "warmup",
        guideRef: "expected-outcomes",
        hints: ["Which of 0 to 9 are prime? Then expected number = probability × number of rolls."],
        strategy: "Expected number = probability × trials",
      },
      {
        kind: "short",
        id: "probability-p4-q06",
        question:
          "The Venn diagram shows probabilities for a student chosen at random from a school of 600 students. MRT = uses the MRT on the way to school; Bus = uses a bus on the way to school. Some students use both, and some walk (neither).\n\nHow many of the 600 students would you expect to use a bus on the way to school?",
        diagram: vennMrtBus,
        answer: { type: "number", value: 270 },
        solution: [
          "All the probabilities in the Venn diagram add to 1: 0.35 + 0.1 + ? + 0.2 = 1, so the missing 'bus only' probability is 1 − 0.65 = 0.35.",
          "Students who use a bus are in the whole Bus circle: P(bus) = 0.35 + 0.1 = 0.45.",
          "Expected number = 0.45 × 600 = 270 students.",
        ],
        traps: [
          {
            spec: { type: "number", value: 210 },
            feedback:
              "210 is only the 'bus only' students. The students in the overlap use a bus too — include the 0.1.",
          },
          {
            spec: { type: "number", value: 0.45 },
            feedback: "0.45 is P(uses a bus). Multiply by the 600 students.",
          },
        ],
        commonError: "Using only the 'bus only' region and forgetting the overlap.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "What must all four probabilities in the diagram add up to?",
          "Which regions are inside the Bus circle?",
          "Expected number = probability × number of students.",
        ],
        strategy: "Draw a Venn diagram",
      },
      {
        kind: "short",
        id: "probability-p4-q07",
        question:
          "The two-way table shows the tickets used by 80 visitors to the Science Centre one morning.\n\n| | Single ticket | Annual pass | Total |\n|---|---|---|---|\n| Child | 18 | ? | 30 |\n| Adult | ? | 14 | ? |\n| Total | ? | ? | 80 |\n\nOne of the visitors **with a single ticket** is chosen at random. Find the probability that this visitor is an adult. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 3, simplest: true },
        solution: [
          "Child with annual pass: 30 − 18 = 12.",
          "Adults: 80 − 30 = 50, so adults with a single ticket: 50 − 14 = 36.",
          "Single tickets altogether: 18 + 36 = 54.",
          "Choose only from the 54 single-ticket holders: P(adult) = {{36/54}} = {{2/3}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 9, d: 20 },
            feedback:
              "{{36/80}} chooses from all 80 visitors. Here you choose only from the visitors with a single ticket.",
          },
          {
            spec: { type: "fraction", n: 18, d: 25 },
            feedback:
              "{{36/50}} is the fraction of adults who have a single ticket — the other way round. You are choosing from the single-ticket holders.",
          },
        ],
        commonError: "Dividing by the wrong total — read carefully which group the visitor is chosen from.",
        difficulty: "core",
        guideRef: "two-way-tables-venn",
        hints: [
          "Complete the table first — start with the cells you can find straight away.",
          "How many visitors have a single ticket altogether?",
          "You are choosing only from the single-ticket holders. How many of them are adults?",
        ],
        strategy: "Draw a two-way table",
      },
      {
        kind: "written",
        id: "probability-p4-q08",
        question:
          "Jun rolls a fair six-sided dice. He says:\n\n> P(even number) = {{1/2}} and P(number greater than 3) = {{1/2}}. So P(even number or number greater than 3) = {{1/2 + 1/2 = 1}}, which means it is certain.\n\nExplain what is wrong with Jun's reasoning, and find the correct probability.",
        marks: 3,
        modelAnswer:
          "The two events are not mutually exclusive — they can happen at the same time. The scores 4 and 6 are both even and greater than 3, so adding the probabilities counts them twice. You can only add probabilities like this when the events cannot happen together. Listing: even = {2, 4, 6} and greater than 3 = {4, 5, 6}, so 'even or greater than 3' = {2, 4, 5, 6}, which is 4 of the 6 scores. The correct probability is {{4/6}} = {{2/3}}. It isn't certain: a 1 or a 3 gives neither.",
        markScheme: [
          {
            point: "Says the events are not mutually exclusive (they overlap / can happen together)",
            keywords: ["mutually exclusive", "overlap", "both", "same time", "together"],
          },
          {
            point: "Identifies that 4 and 6 are in both events, so they are counted twice",
            keywords: ["4 and 6", "twice", "double", "counted"],
          },
          {
            point: "Correct probability {{4/6}} = {{2/3}} (scores 2, 4, 5, 6)",
            keywords: ["2/3", "4/6", "2, 4, 5, 6"],
          },
        ],
        commonError: "Adding the probabilities of events that overlap.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "List the scores for each event. Do the two lists share anything?",
          "When are you allowed to add two probabilities?",
          "List every score that is even or greater than 3 (or both), counting each score only once.",
        ],
        strategy: "List the outcomes",
      },
      {
        kind: "short",
        id: "probability-p4-q09",
        question:
          "Zara must choose one subject from each group for next year:\n\n- Language: French, Malay or Japanese\n- Arts: Art, Drama, Music or Design\n- Sport: Swimming, Dance, Tennis, Football or Netball\n\nDrama and Dance happen at the same time, so she cannot choose both. How many different combinations can she choose?",
        answer: { type: "number", value: 57 },
        solution: [
          "Ignoring the clash: 3 × 4 × 5 = 60 combinations.",
          "Combinations with Drama **and** Dance: the language can be any of the 3, so 3 × 1 × 1 = 3.",
          "Allowed combinations: 60 − 3 = 57.",
        ],
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback: "60 includes the combinations with both Drama and Dance. How many of those are there?",
          },
          {
            spec: { type: "number", value: 36 },
            feedback:
              "Removing Drama and Dance altogether goes too far — Drama with Tennis is fine. Only remove the combinations that contain both.",
          },
        ],
        commonError: "Removing every combination with Drama or Dance, instead of only those with both.",
        difficulty: "core",
        guideRef: "sample-spaces",
        hints: [
          "Ignore the clash first: how many combinations are there?",
          "How many of those combinations contain both Drama and Dance?",
          "Subtract them from the total.",
        ],
        strategy: "Count what you don't want, then subtract",
      },
      {
        kind: "written",
        id: "probability-p4-q10",
        question:
          "Siti's group makes a spinner with four equal sections: red, blue, green and yellow. They spin it 200 times.\n\n| Colour | Red | Blue | Green | Yellow |\n|---|---|---|---|---|\n| Frequency | 62 | 45 | 48 | 45 |\n\nSiti says: \"Red came up most often, so the spinner must be biased towards red.\"\n\nWei Ling says: \"We can't be sure yet.\"\n\nWho do you agree with? Use expected frequencies in your answer, and describe how the group could get stronger evidence.",
        marks: 4,
        modelAnswer:
          "If the spinner were fair, each colour would have probability {{1/4}}, so we would expect about 200 × {{1/4}} = 50 of each colour. Blue, green and yellow are close to 50. Red (62) is 12 more than expected, a relative frequency of {{62/200}} = 0.31 instead of 0.25. But results from an experiment always vary a little from the expected numbers, and one colour has to come up most often, so this doesn't prove the spinner is biased. I agree with Wei Ling: red might be favoured, but 200 spins is not enough to be sure. The group should spin it many more times (for example 1000 or more). If the relative frequency of red stays well above 0.25, that is strong evidence of bias; if it settles close to 0.25, the spinner is probably fair.",
        markScheme: [
          {
            point: "Expected frequency for a fair spinner = 200 × {{1/4}} = 50 for each colour",
            keywords: ["50", "1/4", "0.25", "expected"],
          },
          {
            point: "Compares red with expected (12 more, relative frequency 0.31) and notes that results naturally vary, so it isn't proof",
            keywords: ["12", "0.31", "vary", "chance", "luck", "not proof"],
          },
          {
            point: "Agrees with Wei Ling — you can't be sure from 200 spins",
            keywords: ["wei ling", "agree", "can't be sure", "not sure", "not enough"],
          },
          {
            point: "Suggests many more spins and checking whether the relative frequency of red stays above 0.25 or settles near 0.25",
            keywords: ["more spins", "more trials", "1000", "spin more", "relative frequency"],
          },
        ],
        commonError: "Treating any difference from the expected frequency as proof of bias.",
        difficulty: "core",
        guideRef: "relative-frequency",
        hints: [
          "If the spinner were fair, how many of each colour would you expect in 200 spins?",
          "Is 62 very far from that? Would a fair spinner always give exactly the expected numbers?",
          "What makes an estimate from an experiment more reliable?",
        ],
        strategy: "Compare with expected frequencies",
      },
      {
        kind: "short",
        id: "probability-p4-q11",
        question:
          "A five-sided spinner is biased. The table shows the probability of each score.\n\n| Score | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Probability | 0.3 | 0.15 | 0.2 | {{x}} | 0.1 |\n\nThe spinner is spun 400 times. How many times would you expect it to land on an even number?",
        answer: { type: "number", value: 160 },
        solution: [
          "The probabilities add to 1: 0.3 + 0.15 + 0.2 + {{x}} + 0.1 = 1, so 0.75 + {{x}} = 1 and {{x = 0.25}}.",
          "P(even) = P(2) + P(4) = 0.15 + 0.25 = 0.4.",
          "Expected number = 0.4 × 400 = 160.",
        ],
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback: "60 counts only the 2s. The even scores are 2 **and** 4.",
          },
          {
            spec: { type: "number", value: 100 },
            feedback: "100 counts only the 4s. Add the expected number of 2s as well.",
          },
        ],
        commonError: "Finding {{x}} correctly but then using only one of the even scores.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "First find {{x}} — what must all the probabilities add up to?",
          "Which scores are even? Add their probabilities.",
          "Expected number = probability × number of spins.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "short",
        id: "probability-p4-q12",
        question:
          "Zara takes two penalty kicks. If she scores with her first kick she feels more confident, so the probability that she scores with her second kick depends on what happened with the first. The tree diagram shows some of the probabilities.\n\nFind the probability that Zara scores **exactly one** goal. Give your answer as a decimal.",
        diagram: treePenalties,
        answer: { type: "number", value: 0.2, allowFraction: false },
        solution: [
          "Fill in the gaps — branches from the same point add up to 1. First kick: P(miss) = 0.2. After a goal: P(miss) = 0.1. After a miss: P(miss) = 0.4.",
          "Exactly one goal happens in two ways: (score, miss) or (miss, score).",
          "P(score, miss) = 0.8 × 0.1 = 0.08.",
          "P(miss, score) = 0.2 × 0.6 = 0.12.",
          "Add the two paths: 0.08 + 0.12 = 0.2.",
        ],
        traps: [
          {
            spec: { type: "number", value: 0.08 },
            feedback: "0.08 is only 'score then miss'. Exactly one goal can also happen as 'miss then score'.",
          },
          {
            spec: { type: "number", value: 0.7 },
            feedback:
              "0.7 is 0.1 + 0.6 — only the second-kick branches. Multiply **along** each path (first kick × second kick), then add the two paths together.",
          },
        ],
        commonError: "Using only one of the two paths, or adding along a path instead of multiplying.",
        difficulty: "core",
        guideRef: "tree-diagrams",
        hints: [
          "Fill in the missing probabilities: the branches from the same point add up to 1.",
          "Which two paths through the tree give exactly one goal?",
          "Multiply along each path, then add the two paths.",
        ],
        strategy: "Draw a tree diagram",
      },
      {
        kind: "short",
        id: "probability-p4-q13",
        question:
          "A six-sided dice is biased so that a 6 is three times as likely as each of the other scores. The scores 1, 2, 3, 4 and 5 are equally likely.\n\n(a) Find P(1).\n\n(b) Find P(6).\n\nGive your answers as fractions, (a) first.",
        answer: { type: "list", values: [0.125, 0.375], ordered: true, display: "(a) {{1/8}}, (b) {{3/8}}" },
        solution: [
          "Let P(1) = {{p}}. Then P(2) = P(3) = P(4) = P(5) = {{p}} and P(6) = {{3p}}.",
          "The probabilities add to 1: {{p + p + p + p + p + 3p = 8p = 1}}.",
          "(a) {{p = 1/8}}.",
          "(b) P(6) = {{3 * 1/8 = 3/8}}.",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.1666666667, 0.5], ordered: true, tolerance: 0.001 },
            feedback:
              "With P(1) = {{1/6}} and P(6) = {{3/6}}, the six probabilities add up to more than 1. Call P(1) {{p}} and solve {{5p + 3p = 1}}.",
          },
          {
            spec: { type: "list", values: [0.1, 0.5], ordered: true },
            feedback:
              "If P(6) were {{1/2}}, each other score would be 0.1 — then a 6 would be five times as likely, not three times.",
          },
        ],
        commonError: "Starting from the fair-dice value {{1/6}} instead of using the fact that the probabilities add to 1.",
        difficulty: "core",
        guideRef: "complementary-events",
        hints: [
          "Call the probability of a 1 {{p}}. What is the probability of a 6?",
          "All six probabilities add up to 1: {{p + p + p + p + p + 3p = 1}}.",
          "Solve {{8p = 1}}.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "probability-p4-q14",
        question:
          "Mei rolls a fair six-sided dice and spins a fair spinner numbered 1, 2 and 3. Her score is the dice number minus the spinner number, so it can be negative. Find the probability that her score is positive (greater than 0). Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 3, simplest: true },
        solution: [
          "Sample space: 6 × 3 = 18 equally likely outcomes.",
          "| Dice ↓ Spinner → | 1 | 2 | 3 |\n|---|---|---|---|\n| 1 | 0 | −1 | −2 |\n| 2 | 1 | 0 | −1 |\n| 3 | 2 | 1 | 0 |\n| 4 | 3 | 2 | 1 |\n| 5 | 4 | 3 | 2 |\n| 6 | 5 | 4 | 3 |",
          "Positive scores: 0 + 1 + 2 + 3 + 3 + 3 = 12 cells (0 is not positive).",
          "P(positive) = {{12/18}} = {{2/3}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 5, d: 6 },
            feedback: "A score of 0 is not positive — leave out the three cells (1, 1), (2, 2) and (3, 3).",
          },
        ],
        commonError: "Counting a score of 0 as positive.",
        difficulty: "core",
        guideRef: "combined-events",
        hints: [
          "Draw a sample space grid: dice scores down the side, spinner scores across the top.",
          "Fill each cell with dice − spinner.",
          "Count the cells greater than 0. Is 0 positive?",
        ],
        strategy: "Draw a sample space diagram",
      },
      {
        kind: "written",
        id: "probability-p4-q15",
        question:
          "A small airline flies a plane with 150 seats. From past records, the probability that a passenger with a ticket does not turn up is 0.05. The airline sells 160 tickets for one flight.\n\n(a) How many passengers would the airline expect to turn up?\n\n(b) Ravi says: \"That's more than 150, so some passengers will definitely have no seat.\" Is Ravi right? Explain.",
        marks: 4,
        modelAnswer:
          "(a) Expected number who do not turn up = 0.05 × 160 = 8, so the expected number who turn up = 160 − 8 = 152 (or 0.95 × 160 = 152).\n\n(b) Ravi is not right. 152 is an expected (average) number, not a guarantee — the actual number who turn up changes from flight to flight. If 10 or more passengers don't turn up, everyone gets a seat. On many flights there will be too many passengers, so it is likely that someone sometimes has no seat, but it is not definite on any one flight.",
        markScheme: [
          {
            point: "Expected no-shows = 0.05 × 160 = 8",
            keywords: ["8", "0.05", "eight"],
          },
          {
            point: "Expected to turn up = 160 − 8 = 152 (or 0.95 × 160)",
            keywords: ["152", "0.95"],
          },
          {
            point: "Ravi is not right: an expected number is an average, not a guarantee — the actual number varies",
            keywords: ["average", "not definitely", "vary", "not guaranteed", "not right", "wrong"],
          },
          {
            point: "Gives a specific case, e.g. if 10 or more passengers don't turn up everyone gets a seat",
            keywords: ["10", "ten", "more than 10", "fewer", "everyone"],
          },
        ],
        commonError: "Treating an expected number as exactly what will happen every time.",
        difficulty: "core",
        guideRef: "expected-outcomes",
        hints: [
          "Expected number = probability × number of trials. What is a 'trial' here?",
          "Work out the expected number of no-shows first, then the expected number who turn up.",
          "Is an expected number a guarantee? What happens if 12 people don't turn up?",
        ],
        strategy: "Expected number = probability × trials",
      },
      {
        kind: "short",
        id: "probability-p4-q16",
        question:
          "A school sells exactly 500 raffle tickets, and one winning ticket is drawn at random. Aisha has bought some tickets, and the probability that she wins is 0.03. Ethan has bought twice as many tickets as Aisha. Find the probability that neither Aisha nor Ethan wins. Give your answer as a decimal.",
        answer: { type: "number", value: 0.91, allowFraction: false },
        solution: [
          "Aisha: 0.03 × 500 = 15 tickets. Ethan has twice as many: 30 tickets.",
          "P(Ethan wins) = {{30/500}} = 0.06 (twice Aisha's probability).",
          "Only one ticket wins, so 'Aisha wins' and 'Ethan wins' can't both happen: P(one of them wins) = 0.03 + 0.06 = 0.09.",
          "P(neither wins) = 1 − 0.09 = 0.91.",
        ],
        traps: [
          {
            spec: { type: "number", value: 0.09 },
            feedback: "0.09 is the probability that one of them **does** win. 'Neither' is the complement.",
          },
          {
            spec: { type: "number", value: 0.97 },
            feedback: "You've only taken away Aisha's chance. Ethan's chance is 0.06 — take that away too.",
          },
        ],
        commonError: "Forgetting Ethan, or forgetting to subtract from 1 at the end.",
        difficulty: "core",
        guideRef: "probability-scale",
        hints: [
          "If Ethan has twice as many tickets, what is his probability of winning?",
          "Can Aisha and Ethan both win? So can you add their probabilities?",
          "'Neither wins' is the opposite of 'one of them wins'.",
        ],
        strategy: "Use the complement",
      },
      {
        kind: "short",
        id: "probability-p4-q17",
        question:
          "Aisha, Jun, Mei and Ravi sit in a row of 4 seats in a random order. Find the probability that Aisha and Jun sit next to each other. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 1, d: 2, simplest: true },
        solution: [
          "Total orders: 4 × 3 × 2 × 1 = 24.",
          "Glue Aisha and Jun together as one block. Now arrange 3 things (the block, Mei, Ravi): 3 × 2 × 1 = 6 ways.",
          "Inside the block they can sit Aisha–Jun or Jun–Aisha: 6 × 2 = 12 orders.",
          "P(next to each other) = {{12/24}} = {{1/2}}.",
        ],
        solutions: [
          {
            label: "Only look at the two seats they get",
            steps: [
              "Aisha and Jun end up in 2 of the 4 seats. The possible pairs of seats are 1&2, 1&3, 1&4, 2&3, 2&4, 3&4 — 6 equally likely pairs.",
              "Adjacent pairs: 1&2, 2&3, 3&4 — 3 of them.",
              "P = {{3/6}} = {{1/2}}. Quicker — Mei and Ravi don't matter at all!",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 1, d: 4 },
            feedback: "That's {{6/24}}. Aisha and Jun can sit as Aisha–Jun **or** Jun–Aisha — double it.",
          },
          {
            spec: { type: "fraction", n: 1, d: 8 },
            feedback:
              "That's {{3/24}}. There are 3 places for the pair, but also 2 orders for the pair and 2 orders for Mei and Ravi.",
          },
        ],
        commonError: "Forgetting that the 'block' can be in either order.",
        difficulty: "challenge",
        guideRef: "sample-spaces",
        hints: [
          "How many ways can 4 people sit in a row?",
          "Try gluing Aisha and Jun together into one block. How many things are you arranging now?",
          "Don't forget the block can be Aisha–Jun or Jun–Aisha.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "probability-p4-q18",
        question:
          "Hana's class wants to estimate how many beads are in a large jar without counting them all. They take out 60 beads, mark each one with a dot of paint, put them back and mix the jar thoroughly. Then they take out 50 beads at random and find that 4 of them are marked. Estimate the total number of beads in the jar.",
        answer: { type: "number", value: 750 },
        solution: [
          "In the sample, the relative frequency of marked beads is {{4/50}} = 0.08.",
          "If the jar is well mixed, about 0.08 of all the beads in the jar are marked.",
          "60 marked beads ≈ 0.08 of the total, so total ≈ 60 ÷ 0.08 = 750 beads.",
        ],
        solutions: [
          {
            label: "Equivalent fractions",
            steps: [
              "Marked in sample : sample size = 4 : 50 = 1 : 12.5.",
              "So marked in jar : total ≈ 60 : 60 × 12.5 = 60 : 750.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 110 },
            feedback:
              "Adding doesn't help here. Use proportion: the fraction of marked beads in the sample should match the fraction in the whole jar.",
          },
          {
            spec: { type: "number", value: 4.8 },
            feedback: "60 × 0.08 finds 8% of 60. You want the total that 60 is 8% **of**: divide instead.",
          },
        ],
        commonError: "Multiplying by 0.08 instead of dividing by it.",
        difficulty: "challenge",
        guideRef: "relative-frequency",
        hints: [
          "What fraction of the 50-bead sample was marked?",
          "In a well-mixed jar, about the same fraction of ALL the beads should be marked.",
          "60 is about 8% of the total. What is the total?",
        ],
        strategy: "Use relative frequency as an estimate",
      },
      {
        kind: "written",
        id: "probability-p4-q19",
        question:
          "Three fair spinners each have three equal sections:\n\n| Spinner | Numbers |\n|---|---|\n| A | 2, 4, 9 |\n| B | 1, 6, 8 |\n| C | 3, 5, 7 |\n\nTwo players each pick a different spinner and spin once. The higher number wins.\n\nMarcus says: \"A beats B more often than not, and B beats C more often than not, so A must beat C more often than not.\"\n\nIs Marcus right? Show your working.",
        marks: 4,
        modelAnswer:
          "Each game has 3 × 3 = 9 equally likely outcomes.\n\nA against B: A wins with (2, 1), (4, 1), (9, 1), (9, 6), (9, 8) — 5 outcomes, so P(A beats B) = {{5/9}}.\n\nB against C: B wins with (6, 3), (6, 5), (8, 3), (8, 5), (8, 7) — so P(B beats C) = {{5/9}}.\n\nA against C: A wins only with (4, 3), (9, 3), (9, 5), (9, 7) — so P(A beats C) = {{4/9}} and P(C beats A) = {{5/9}}.\n\nMarcus is wrong: A beats B and B beats C, yet C beats A. 'Beats more often' doesn't pass along the way 'taller than' does — whichever spinner your opponent picks, there is another spinner that beats it.",
        markScheme: [
          {
            point: "Uses 9 equally likely outcomes for each pair of spinners (a grid or a systematic list)",
            keywords: ["9", "nine", "3 × 3", "grid", "list"],
          },
          {
            point: "P(A beats B) = {{5/9}}",
            keywords: ["5/9", "a beats b"],
          },
          {
            point: "P(B beats C) = {{5/9}}",
            keywords: ["5/9", "b beats c"],
          },
          {
            point: "P(A beats C) = {{4/9}}, so C beats A more often: Marcus is wrong",
            keywords: ["4/9", "c beats a", "wrong", "not right"],
          },
        ],
        commonError: "Assuming 'beats' works like 'is bigger than' without testing A against C.",
        difficulty: "challenge",
        guideRef: "combined-events",
        hints: [
          "For each pair of spinners, draw a 3 by 3 grid of outcomes.",
          "Count the cells where each spinner wins. Check A against B, and B against C, first.",
          "Now actually test A against C. Does the result Marcus expects happen?",
        ],
        strategy: "Test the claim",
      },
      {
        kind: "short",
        id: "probability-p4-q20",
        question:
          "Hana and Jun take turns to roll a fair six-sided dice, Hana first. The first person to roll a 6 wins. Find the probability that Hana wins on her first or her second roll. Give your answer as a fraction.",
        answer: { type: "fraction", n: 61, d: 216 },
        solution: [
          "Hana wins on her 1st roll: {{1/6}}.",
          "Hana wins on her 2nd roll: she misses, Jun misses, then she rolls a 6: {{5/6 * 5/6 * 1/6 = 25/216}}.",
          "These two paths can't both happen, so add: {{1/6 + 25/216 = 36/216 + 25/216 = 61/216}}.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 1, d: 3 },
            feedback:
              "Hana only gets a second roll if she AND Jun both miss first. That path has probability {{5/6 * 5/6 * 1/6}}, not {{1/6}}.",
          },
          {
            spec: { type: "fraction", n: 11, d: 36 },
            feedback: "You skipped Jun's roll. Between Hana's first and second rolls, Jun must miss too.",
          },
        ],
        commonError: "Forgetting that Jun's roll (a miss, {{5/6}}) sits between Hana's two rolls.",
        difficulty: "challenge",
        guideRef: "tree-diagrams",
        hints: [
          "What has to happen for Hana to get a second roll at all?",
          "Draw a tree: Hana's roll, then Jun's roll, then Hana's roll again. Label '6' and 'not 6' on each branch.",
          "Multiply along the path to 'Hana wins on her 2nd roll', then add the probability that she wins on her 1st.",
        ],
        strategy: "Draw a tree diagram",
      },
    ],
  },
];
