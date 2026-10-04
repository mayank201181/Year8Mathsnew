import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "probability",
  title: "Probability",
  strand: "Statistics & Probability",
  icon: "🎲",
  summary: "Put a number on chance — then count it, test it and predict it.",
  intro:
    "Probability puts a number on chance, from 0 (impossible) to 1 (certain). You'll learn to count outcomes cleverly with lists, grids, tables and Venn diagrams, to estimate probabilities from experiments when theory runs out, and to predict how often things should happen. It's the same thinking behind weather forecasts, medical trials and every game that uses dice.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "probability-scale",
      heading: "The probability scale",
      discovery: {
        problem:
          "Bag A holds 3 red and 5 blue marbles. Bag B holds 5 red and 9 blue marbles. You win a prize if you pull out a red marble without looking. Bag B has more red marbles — so should you pick Bag B? Decide before reading on.",
        idea:
          "What matters is the **fraction** of the marbles that are red, not how many red ones there are. Bag A: P(red) = {{3/8}} = 0.375. Bag B: P(red) = {{5/14}} ≈ 0.357. Bag A is (just) the better bet. A probability always compares the outcomes you want with **all** the possible outcomes.",
      },
      body:
        "**Probability** is a number that measures how likely something is to happen. First, some words you'll use all the time:\n\n- An **experiment** (or **trial**) is any action with an uncertain result: rolling a dice, spinning a spinner, picking a card.\n- An **outcome** is one possible result, such as rolling a 4.\n- An **event** is the outcome, or group of outcomes, you care about, such as \"rolling an even number\" (the outcomes 2, 4 and 6).\n\nEvery probability sits on a scale from **0** to **1**. A probability of 0 means the event is **impossible**; 1 means it is **certain**; {{1/2}} is an **even chance**. A probability can never be negative and can never be bigger than 1.\n\n| Word | Probability |\n|---|---|\n| Impossible | 0 |\n| Unlikely | between 0 and {{1/2}} |\n| Even chance | {{1/2}} = 0.5 = 50% |\n| Likely | between {{1/2}} and 1 |\n| Certain | 1 |\n\nWrite a probability as a fraction, a decimal or a percentage: {{3/4}} = 0.75 = 75%. Never write it as a ratio like 3 : 4, and in exams avoid \"3 out of 4\" as a final answer.\n\nOutcomes are **equally likely** when none of them is favoured: a fair (unbiased) coin, a fair dice, a spinner with equal sectors, or choosing \"at random\". Then\n\n    P(event) = {{\"number of favourable outcomes\"/\"total number of outcomes\"}}\n\nA **favourable outcome** is one that makes the event happen. For a fair dice, P(even) = {{3/6 = 1/2}}.\n\n> This formula only works when the outcomes are equally likely. \"Win or lose\" is two outcomes, but that does **not** make P(win) = {{1/2}}!",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A probability scale from 0 to 1 labelled impossible, unlikely, even chance, likely and certain, with events for one dice roll or one coin flip marked at 0, one sixth, one half, five sixths and 1"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><rect x="50" y="90" width="190" height="10" fill="#fecaca"/><rect x="240" y="90" width="190" height="10" fill="#bbf7d0"/><line x1="50" y1="95" x2="430" y2="95" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="84" x2="50" y2="106" stroke="#1f2937" stroke-width="1.5"/><text x="50" y="122" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">0</text><text x="50" y="142" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">impossible</text><line x1="145" y1="84" x2="145" y2="106" stroke="#1f2937" stroke-width="1.5"/><text x="145" y="122" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">1/4</text><text x="145" y="142" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">unlikely</text><line x1="240" y1="84" x2="240" y2="106" stroke="#1f2937" stroke-width="1.5"/><text x="240" y="122" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">1/2</text><text x="240" y="142" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">even chance</text><line x1="335" y1="84" x2="335" y2="106" stroke="#1f2937" stroke-width="1.5"/><text x="335" y="122" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">3/4</text><text x="335" y="142" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">likely</text><line x1="430" y1="84" x2="430" y2="106" stroke="#1f2937" stroke-width="1.5"/><text x="430" y="122" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">1</text><text x="430" y="142" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">certain</text><line x1="50" y1="39" x2="50" y2="89" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="50" cy="95" r="5" fill="#4f46e5" stroke="#1f2937"/><text x="50" y="34" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Roll a 7</text><line x1="113.33" y1="65" x2="113.33" y2="89" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="113.33" cy="95" r="5" fill="#4f46e5" stroke="#1f2937"/><text x="113.33" y="60" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Roll a 6 (1/6)</text><line x1="240" y1="39" x2="240" y2="89" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="240" cy="95" r="5" fill="#4f46e5" stroke="#1f2937"/><text x="240" y="34" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Heads on a coin (1/2)</text><line x1="366.67" y1="65" x2="366.67" y2="89" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="366.67" cy="95" r="5" fill="#4f46e5" stroke="#1f2937"/><text x="366.67" y="60" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Not a 6 (5/6)</text><line x1="430" y1="39" x2="430" y2="89" stroke="#334155" stroke-width="1.5" stroke-dasharray="3 3"/><circle cx="430" cy="95" r="5" fill="#4f46e5" stroke="#1f2937"/><text x="430" y="34" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Roll under 7</text><text x="240" y="162" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">One roll of a fair dice (and one coin flip)</text></svg>`,
      diagramCaption:
        "The probability scale. Rolling a 7 on a normal dice is impossible (0); rolling under 7 is certain (1); everything else lies in between.",
      workedExamples: [
        {
          title: "Counters in a bag",
          problem: "A bag holds 4 red, 7 green and 9 yellow counters. One counter is taken at random. Find P(green).",
          steps: [
            "Total number of counters: 4 + 7 + 9 = 20. These are the 20 equally likely outcomes.",
            "Favourable outcomes (green): 7.",
            "P(green) = {{7/20}}. It doesn't simplify, because 7 and 20 have no common factor.",
          ],
          answer: "{{7/20}} (= 0.35 = 35%)",
          yourTurn: {
            question:
              "Your turn: a bag holds 5 red, 6 blue and 4 white counters. One is taken at random. Find P(blue). Give your answer as a fraction in its simplest form.",
            answer: { type: "fraction", n: 2, d: 5, simplest: true },
            solution: "Total = 5 + 6 + 4 = 15 counters, 6 of them blue. P(blue) = {{6/15 = 2/5}}.",
          },
        },
        {
          title: "Number cards",
          problem: "Cards numbered 1 to 20 are shuffled and one is picked. Find the probability that its number is prime.",
          steps: [
            "There are 20 equally likely outcomes.",
            "Primes up to 20: 2, 3, 5, 7, 11, 13, 17, 19. That's 8 of them (remember, 1 is **not** prime).",
            "P(prime) = {{8/20 = 2/5}}.",
          ],
          answer: "{{2/5}}",
        },
        {
          title: "A spinner with unequal sectors",
          problem:
            "A spinner has three sectors: red with an angle of 150°, blue with 90° and green with 120°. Find P(blue).",
          steps: [
            "There are three colours, but they are **not** equally likely, so P(blue) is not {{1/3}}.",
            "Make it simpler: cut the spinner into 12 equal 30° slices. Red covers 150 ÷ 30 = 5 slices, blue covers 3 and green covers 4.",
            "The 12 slices are equally likely, so P(blue) = {{3/12 = 1/4}}. Straight from the angle: {{90/360 = 1/4}}.",
          ],
          answer: "{{1/4}}",
        },
      ],
      keyPoints: [
        "Probability runs from 0 (impossible) to 1 (certain); {{1/2}} is an even chance.",
        "For equally likely outcomes: P(event) = favourable outcomes ÷ total outcomes.",
        "Write probabilities as fractions, decimals or percentages — never as ratios.",
        "Outcomes not equally likely? Split them into equal parts first.",
      ],
      whyItWorks:
        "Think of certainty as 1 whole. If there are *n* equally likely outcomes, fairness means each one gets the same share of that whole: {{1/n}}. An event made of *k* of those outcomes collects *k* shares, so its probability is {{k/n}}. Since *k* is somewhere from 0 (no outcomes) to *n* (all of them), the probability is always between {{0/n = 0}} and {{n/n = 1}}. That is exactly why the scale runs from 0 to 1.",
      strategies: ["Count the total first", "Make it simpler (split into equal parts)", "Convert to decimals to compare"],
      thinkDeeper:
        "A bag contains only red and blue counters, and P(red) = {{3/7}}. Could the bag hold 7 counters? 10? 21? What must be true about the total? If the bag holds 14 counters and you add 2 more red ones, what is the new P(red)?",
    },

    // ------------------------------------------------------------------ 2
    {
      id: "complementary-events",
      heading: "Complementary & mutually exclusive events",
      discovery: {
        problem:
          "A whole number from 1 to 100 is chosen at random. What is the probability that it is **not** a perfect square? You could count all the non-squares… or is there a much quicker way?",
        idea:
          "There are only 10 perfect squares from 1 to 100 (1, 4, 9, …, 100), so P(square) = {{10/100}}. Every number is either a square or not a square, never both, so the two probabilities must add to 1: P(not a square) = {{1 - 10/100 = 90/100 = 9/10}}. Counting the **opposite** is often far quicker.",
      },
      body:
        "Two events are **mutually exclusive** if they cannot happen at the same time. On one roll of a dice, \"roll a 2\" and \"roll an odd number\" are mutually exclusive. \"Roll a 2\" and \"roll an even number\" are **not** — rolling a 2 does both.\n\nFor mutually exclusive events you can add the probabilities:\n\n    P(A or B) = P(A) + P(B)\n\nIf a list of mutually exclusive outcomes covers **every** possibility, their probabilities add up to exactly 1 — something is certain to happen.\n\nThe **complement** of an event A is \"not A\": everything that isn't A. A and not A are mutually exclusive and together they cover everything, so\n\n    P(A) + P(not A) = 1,   so   P(not A) = 1 − P(A)\n\n**Missing probabilities.** A probability table lists every outcome once. The outcomes are mutually exclusive and cover everything, so a missing value is 1 minus the total of the others.\n\n| Colour | Red | Blue | Green | Yellow |\n|---|---|---|---|---|\n| Probability | 0.25 | 0.4 | ? | 0.15 |\n\nGreen = 1 − (0.25 + 0.4 + 0.15) = 1 − 0.8 = 0.2.\n\n> Only add probabilities when the events can't overlap. P(even) + P(more than 3) = {{3/6 + 3/6 = 1}}, which would make it certain — yet rolling a 1 or a 3 is neither! The overlap (4 and 6) was counted twice. The true answer is {{4/6 = 2/3}}.",
      diagram: `<svg viewBox="0 0 480 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A bar of total length 1 split into red 0.25, blue 0.4, green unknown and yellow 0.15; the green part is 1 minus 0.8, which is 0.2"><rect x="0" y="0" width="480" height="170" fill="#ffffff"/><line x1="40" y1="40" x2="440" y2="40" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="34" x2="40" y2="48" stroke="#334155" stroke-width="1.5"/><line x1="440" y1="34" x2="440" y2="48" stroke="#334155" stroke-width="1.5"/><text x="240" y="30" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">Total = 1 (something certainly happens)</text><rect x="40" y="55" width="100" height="50" fill="#fecaca" stroke="#334155" stroke-width="1.2"/><text x="90" y="76" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Red</text><text x="90" y="95" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">0.25</text><rect x="140" y="55" width="160" height="50" fill="#bae6fd" stroke="#334155" stroke-width="1.2"/><text x="220" y="76" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Blue</text><text x="220" y="95" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">0.4</text><rect x="300" y="55" width="80" height="50" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="340" y="76" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Green</text><text x="340" y="95" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">?</text><rect x="380" y="55" width="60" height="50" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="410" y="76" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Yellow</text><text x="410" y="95" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">0.15</text><line x1="340" y1="108" x2="340" y2="122" stroke="#334155" stroke-width="1.5"/><text x="340" y="138" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">? = 1 − 0.8 = 0.2</text><text x="40" y="160" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">Known: 0.25 + 0.4 + 0.15 = 0.8</text></svg>`,
      diagramCaption:
        "A bar model of certainty. The four colours are mutually exclusive pieces that fill the whole bar, so the missing piece is 1 − 0.8 = 0.2.",
      workedExamples: [
        {
          title: "Using the complement",
          problem: "The probability that Mei's MRT train is delayed is 0.14. What is the probability that it is not delayed?",
          steps: ["\"Delayed\" and \"not delayed\" are complements: exactly one of them happens.", "P(not delayed) = 1 − 0.14 = 0.86."],
          answer: "0.86",
          yourTurn: {
            question:
              "Your turn: the probability of rain in Singapore on a particular afternoon is 0.38. What is the probability that it does **not** rain? Give your answer as a decimal.",
            answer: { type: "number", value: 0.62, allowFraction: false },
            solution: "P(no rain) = 1 − 0.38 = 0.62.",
          },
        },
        {
          title: "A missing probability",
          problem:
            "A spinner lands on red, blue, green or yellow. P(red) = 0.25, P(blue) = 0.4 and P(yellow) = 0.15. Find P(green), then P(red or blue).",
          steps: [
            "The four colours are mutually exclusive and cover every outcome, so their probabilities sum to 1.",
            "P(green) = 1 − (0.25 + 0.4 + 0.15) = 1 − 0.8 = 0.2.",
            "Red and blue can't happen on the same spin, so P(red or blue) = 0.25 + 0.4 = 0.65.",
          ],
          answer: "P(green) = 0.2 and P(red or blue) = 0.65",
        },
        {
          title: "Algebra in a probability table",
          problem:
            "A biased four-sided spinner has P(1) = 0.1, P(2) = 0.3, P(3) = *x* and P(4) = 2*x*. Find *x* and P(4).",
          steps: [
            "All four probabilities must sum to 1: 0.1 + 0.3 + *x* + 2*x* = 1.",
            "So 0.4 + 3*x* = 1, which gives 3*x* = 0.6 and *x* = 0.2.",
            "P(4) = 2*x* = 0.4. Check: 0.1 + 0.3 + 0.2 + 0.4 = 1 ✓",
          ],
          answer: "*x* = 0.2 and P(4) = 0.4",
        },
      ],
      keyPoints: [
        "Mutually exclusive means the events cannot happen together.",
        "Mutually exclusive outcomes that cover everything add up to 1.",
        "P(not A) = 1 − P(A).",
        "Use P(A or B) = P(A) + P(B) only when A and B can't overlap.",
      ],
      whyItWorks:
        "Picture certainty as a bar of length 1. Mutually exclusive events are pieces of the bar that don't overlap, so their lengths simply add. If the pieces cover the whole bar, they must add up to 1. Shade the piece for A: whatever is left is \"not A\", and its length is 1 − P(A).",
      strategies: ["Use the complement", "Draw a bar model", "Check the total is 1"],
      thinkDeeper:
        "P(A) = 0.6 and P(B) = 0.5. Explain why A and B **cannot** be mutually exclusive. What is the smallest possible probability that A and B both happen?",
    },

    // ------------------------------------------------------------------ 3
    {
      id: "sample-spaces",
      heading: "Listing outcomes & sample spaces",
      discovery: {
        problem:
          "A hawker stall's meal deal lets you choose 1 of 4 mains (vegetable fried rice, vegetarian mee goreng, vegetable laksa, roti prata), 1 of 3 drinks (teh, kopi, lime juice) and 1 of 2 desserts (chendol, ice kacang). How many different meal deals are possible? Start listing them… is there a faster way?",
        idea:
          "For each of the 4 mains there are 3 drinks, giving 4 × 3 = 12 main-and-drink pairs. Each of those pairs can go with 2 desserts: 12 × 2 = **24** meal deals. Multiplying the number of choices at each stage is called the **product rule**.",
      },
      body:
        "The **sample space** is the complete list of possible outcomes of an experiment. To find probabilities when two things happen together, you first need the full sample space, with nothing missed and nothing counted twice.\n\n**List systematically.** Fix the first item and run through every option for the second, then move on to the next first item. For two coins: HH, HT, TH, TT. That's 4 outcomes, not 3 — HT (first coin heads, second tails) and TH are different outcomes.\n\n**Sample space diagrams.** When two experiments are combined, a grid is quickest: one experiment along the top, the other down the side, and one combined outcome in each cell. A coin and a dice give a 2 × 6 grid of 12 outcomes; two dice give 6 × 6 = 36.\n\n**The product rule for counting.** If one choice can be made in *m* ways and a second choice in *n* ways, the two together can be made in *m* × *n* ways. It extends to more stages: 4 × 3 × 2 = 24 meal deals.\n\n| Experiment | Number of outcomes |\n|---|---|\n| Two coins | 2 × 2 = 4 |\n| A coin and a dice | 2 × 6 = 12 |\n| Two dice | 6 × 6 = 36 |\n| Three coins | 2 × 2 × 2 = 8 |\n\nWhen the choices shrink as you go — like arranging people in a line — the product rule still works: 3 people can stand in a line in 3 × 2 × 1 = 6 ways.",
      diagram: `<svg viewBox="0 0 480 186" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sample space grid for a coin and a dice: rows H and T, columns 1 to 6, giving 12 cells from H1 to T6"><rect x="0" y="0" width="480" height="186" fill="#ffffff"/><text x="258" y="24" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">Dice</text><text x="118" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">1</text><text x="174" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">2</text><text x="230" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">3</text><text x="286" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">4</text><text x="342" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">5</text><text x="398" y="46" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">6</text><text x="72" y="83" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">H</text><rect x="90" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="118" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H1</text><rect x="146" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="174" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H2</text><rect x="202" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="230" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H3</text><rect x="258" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="286" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H4</text><rect x="314" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="342" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H5</text><rect x="370" y="56" width="56" height="44" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="398" y="83" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">H6</text><text x="72" y="127" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">T</text><rect x="90" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="118" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T1</text><rect x="146" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="174" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T2</text><rect x="202" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="230" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T3</text><rect x="258" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="286" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T4</text><rect x="314" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="342" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T5</text><rect x="370" y="100" width="56" height="44" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="398" y="127" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">T6</text><text x="40" y="100" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937" text-anchor="middle" transform="rotate(-90 40 100)">Coin</text><text x="258" y="170" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">2 rows × 6 columns = 12 equally likely outcomes</text></svg>`,
      diagramCaption:
        "The sample space for flipping a coin and rolling a dice. Each cell is one outcome; the grid shows why there are 2 × 6 = 12.",
      workedExamples: [
        {
          title: "A coin and a spinner",
          problem:
            "A fair coin is flipped and a fair four-sided spinner, numbered 1 to 4, is spun. List the sample space. How many outcomes are there?",
          steps: [
            "Fix the coin as H and run through the spinner: H1, H2, H3, H4.",
            "Now fix the coin as T: T1, T2, T3, T4.",
            "That's 8 outcomes, matching the product rule: 2 × 4 = 8.",
          ],
          answer: "8 outcomes: H1, H2, H3, H4, T1, T2, T3, T4",
          yourTurn: {
            question: "Your turn: a fair coin is flipped and a fair six-sided dice is rolled. How many outcomes are in the sample space?",
            answer: { type: "number", value: 12 },
            solution: "2 coin outcomes × 6 dice outcomes = 12: H1 to H6 and T1 to T6.",
          },
        },
        {
          title: "Arranging people",
          problem: "Aisha, Ben and Chen line up for a photo. In how many different orders can they stand?",
          steps: [
            "List systematically using initials. Aisha first: ABC, ACB. Ben first: BAC, BCA. Chen first: CAB, CBA.",
            "That's 6 orders.",
            "Product rule check: 3 choices for the first place, then 2 people left for the second place, then 1 for the last: 3 × 2 × 1 = 6.",
          ],
          answer: "6 orders",
        },
        {
          title: "Locker codes",
          problem:
            "A locker code is two letters, each chosen from A, B, C, D, E, followed by one digit from 0 to 9. (a) How many codes are possible? (b) How many are possible if the two letters must be different?",
          steps: [
            "(a) 5 choices for the first letter × 5 for the second × 10 for the digit = 250.",
            "(b) Still 5 choices for the first letter, but now only 4 for the second: 5 × 4 × 10 = 200.",
          ],
          answer: "(a) 250 (b) 200",
        },
      ],
      keyPoints: [
        "The sample space lists every possible outcome — none missed, none repeated.",
        "Order matters: HT and TH are different outcomes.",
        "Product rule: *m* ways then *n* ways gives *m* × *n* ways together.",
        "Two coins: 4 outcomes. A coin and a dice: 12. Two dice: 36.",
      ],
      whyItWorks:
        "Draw the choices as a grid with *m* rows (one for each first choice) and *n* columns (one for each second choice). Every cell is a different combined outcome, and every combined outcome has exactly one cell. A grid with *m* rows and *n* columns has *m* × *n* cells — the same reason a rectangle's area is length × width.",
      strategies: ["Be systematic", "Draw a sample space diagram", "Use the product rule"],
      thinkDeeper:
        "Mei says two dice only have 21 outcomes, because \"a 2 and a 5\" is the same as \"a 5 and a 2\". Check that there really are 21 such unordered pairs. Then explain why the 36-cell grid is the better one for working out probabilities. (Hint: is a double six as likely as \"a 5 and a 6\"?)",
    },

    // ------------------------------------------------------------------ 4
    {
      id: "combined-events",
      heading: "Probability of combined events",
      discovery: {
        problem:
          "Ethan rolls two fair dice and adds the scores. He says: \"There are 11 possible totals, from 2 to 12, so each total has probability {{1/11}}.\" Before reading on: how many ways can you make a total of 2? A total of 7? Do you believe Ethan?",
        idea:
          "Only one pair gives 2: (1, 1). Six pairs give 7: (1, 6), (2, 5), (3, 4), (4, 3), (5, 2), (6, 1). The 11 totals are **not** equally likely — but the 36 ordered pairs are. So P(total 7) = {{6/36 = 1/6}}, while P(total 2) = only {{1/36}}.",
      },
      body:
        "For combined events, the reliable method has three steps:\n\n1. Draw a sample space in which every cell is **equally likely**.\n2. Count the cells where the event happens (the favourable outcomes).\n3. P(event) = favourable cells ÷ total cells.\n\nThe grid can show any rule for combining the two results: the total, the difference, the product, or which dice is higher. For two dice, each total turns up this many times out of 36:\n\n| Total | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n| Ways | 1 | 2 | 3 | 4 | 5 | 6 | 5 | 4 | 3 | 2 | 1 |\n\nThe counts climb to a peak at 7, fall away again, and add up to 36. Each total's probability is its count over 36, so P(total 8) = {{5/36}}.\n\n**\"At least one\" events.** For P(at least one six), you can count the cells containing a six (a whole row plus a whole column, minus the cell they share: 6 + 6 − 1 = 11), or use the complement. There is no six in 5 × 5 = 25 cells, so\n\n    P(at least one six) = {{1 - 25/36 = 11/36}}",
      diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 6 by 6 grid of totals for a red dice and a blue dice. The six cells with total 7 lie on a diagonal and are shaded yellow; the six cells with total 10 or more are in the bottom-right corner and shaded green"><rect x="0" y="0" width="480" height="290" fill="#ffffff"/><text x="178" y="24" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">Blue dice</text><text x="88" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">1</text><text x="124" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">2</text><text x="160" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">3</text><text x="196" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">4</text><text x="232" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">5</text><text x="268" y="48" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">6</text><text x="56" y="79" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">1</text><rect x="70" y="56" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="88" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">2</text><rect x="106" y="56" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="124" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">3</text><rect x="142" y="56" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="160" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">4</text><rect x="178" y="56" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="196" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">5</text><rect x="214" y="56" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="232" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">6</text><rect x="250" y="56" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="268" y="79" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><text x="56" y="115" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">2</text><rect x="70" y="92" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="88" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">3</text><rect x="106" y="92" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="124" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">4</text><rect x="142" y="92" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="160" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">5</text><rect x="178" y="92" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="196" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">6</text><rect x="214" y="92" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="232" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><rect x="250" y="92" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="268" y="115" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">8</text><text x="56" y="151" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">3</text><rect x="70" y="128" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="88" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">4</text><rect x="106" y="128" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="124" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">5</text><rect x="142" y="128" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="160" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">6</text><rect x="178" y="128" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="196" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><rect x="214" y="128" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="232" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">8</text><rect x="250" y="128" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="268" y="151" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">9</text><text x="56" y="187" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">4</text><rect x="70" y="164" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="88" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">5</text><rect x="106" y="164" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="124" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">6</text><rect x="142" y="164" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="160" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><rect x="178" y="164" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="196" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">8</text><rect x="214" y="164" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="232" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">9</text><rect x="250" y="164" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="268" y="187" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">10</text><text x="56" y="223" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">5</text><rect x="70" y="200" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="88" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">6</text><rect x="106" y="200" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="124" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><rect x="142" y="200" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="160" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">8</text><rect x="178" y="200" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="196" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">9</text><rect x="214" y="200" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="232" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">10</text><rect x="250" y="200" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="268" y="223" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">11</text><text x="56" y="259" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">6</text><rect x="70" y="236" width="36" height="36" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="88" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">7</text><rect x="106" y="236" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="124" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">8</text><rect x="142" y="236" width="36" height="36" fill="#ffffff" stroke="#334155" stroke-width="1.2"/><text x="160" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">9</text><rect x="178" y="236" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="196" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">10</text><rect x="214" y="236" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="232" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">11</text><rect x="250" y="236" width="36" height="36" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="268" y="259" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle">12</text><text x="26" y="164" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937" text-anchor="middle" transform="rotate(-90 26 164)">Red dice</text><rect x="305" y="86" width="18" height="18" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="332" y="100" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">Total 7: 6 cells</text><rect x="305" y="122" width="18" height="18" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><text x="332" y="136" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">Total ≥ 10: 6 cells</text><text x="305" y="184" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">36 equally likely cells,</text><text x="305" y="202" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">each has P = 1/36</text><text x="305" y="236" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start" font-weight="bold">Both events: 6/36 = 1/6</text></svg>`,
      diagramCaption:
        "All 36 outcomes for two dice, showing the totals. Total 7 fills the long diagonal; totals of 10 or more fill the corner. Both events have 6 cells, so both have probability {{1/6}}.",
      workedExamples: [
        {
          title: "Two-dice totals",
          problem: "Two fair dice are rolled and the scores added. Find P(total is 8).",
          steps: [
            "Sample space: 6 × 6 = 36 equally likely ordered pairs.",
            "Pairs that make 8: (2, 6), (3, 5), (4, 4), (5, 3), (6, 2). That's 5 cells.",
            "P(total 8) = {{5/36}}.",
          ],
          answer: "{{5/36}}",
          yourTurn: {
            question:
              "Your turn: two fair dice are rolled and the scores added. Find P(total is 9). Give your answer as a fraction in its simplest form.",
            answer: { type: "fraction", n: 1, d: 9, simplest: true },
            solution: "Pairs making 9: (3, 6), (4, 5), (5, 4), (6, 3), so 4 cells out of 36. {{4/36 = 1/9}}.",
          },
        },
        {
          title: "Multiplying two spinners",
          problem:
            "Spinner A is numbered 1, 2, 3. Spinner B is numbered 1, 2, 3, 4. Both are fair. The two scores are multiplied. Find P(the product is even).",
          steps: [
            "Grid: 3 × 4 = 12 equally likely outcomes.",
            "Products — A = 1: 1, 2, 3, 4. A = 2: 2, 4, 6, 8. A = 3: 3, 6, 9, 12.",
            "Even products: 2 + 4 + 2 = 8 cells, so P(even) = {{8/12 = 2/3}}.",
            "Check with the complement: a product is odd only when **both** scores are odd, which is 2 × 2 = 4 cells. P(even) = {{1 - 4/12 = 8/12}} ✓",
          ],
          answer: "{{2/3}}",
        },
        {
          title: "At least one six",
          problem: "Two fair dice are rolled. Find the probability of getting at least one six.",
          steps: [
            "Method 1, count directly: the row for six has 6 cells, the column for six has 6 cells, but (6, 6) is in both. 6 + 6 − 1 = 11 cells.",
            "Method 2, use the complement: no six on either dice means 5 choices × 5 choices = 25 cells.",
            "P(at least one six) = {{1 - 25/36 = 11/36}}. Both methods agree; the complement is quicker when \"at least one\" gets complicated (try it with three dice).",
          ],
          answer: "{{11/36}}",
        },
      ],
      keyPoints: [
        "Use a sample space in which every cell is equally likely (ordered pairs).",
        "P(event) = favourable cells ÷ total cells.",
        "With two dice, 7 is the most likely total: P = {{6/36 = 1/6}}.",
        "For \"at least one\", the complement is often quickest.",
      ],
      whyItWorks:
        "Each fair dice gives each face probability {{1/6}}, and one dice can't influence the other. So all 36 ordered pairs are equally likely, each with probability {{1/36}}. The totals differ because they collect different numbers of cells: 7 runs along the whole long diagonal of the grid, while 2 and 12 are lonely corners.",
      strategies: ["Draw a sample space diagram", "Use the complement", "Count systematically"],
      thinkDeeper:
        "With **three** dice, a total of 9 and a total of 10 can each be made from six different sets of numbers (for 9: 1+2+6, 1+3+5, 1+4+4, 2+2+5, 2+3+4, 3+3+3). Yet 17th-century Italian gamblers noticed that 10 came up more often. Count the *ordered* ways of making each total, out of 6 × 6 × 6 = 216, to explain why. (Galileo solved this one!)",
    },

    // ------------------------------------------------------------------ 5
    {
      id: "two-way-tables-venn",
      heading: "Two-way tables & Venn diagrams",
      discovery: {
        problem:
          "In a class of 30 students, 18 play badminton, 15 play chess and 7 do neither. How many play **both**? (Notice that 18 + 15 = 33, which is more than the whole class!)",
        idea:
          "30 − 7 = 23 students do at least one. Adding 18 + 15 = 33 counts the students who do both **twice**, so both = 33 − 23 = **10**. Then badminton only = 18 − 10 = 8 and chess only = 15 − 10 = 5. Check: 8 + 10 + 5 + 7 = 30 ✓. A Venn diagram shows all of this at a glance.",
      },
      body:
        "A **two-way table** sorts one group of people or things by two features at once. Every row and every column has a total, and the **grand total** sits in the corner. Here are 80 customers at a hawker centre:\n\n| | Hot drink | Cold drink | Total |\n|---|---|---|---|\n| Adult | 22 | 18 | 40 |\n| Child | 6 | 34 | 40 |\n| Total | 28 | 52 | 80 |\n\nTo find a probability, pick the right cell and divide by the right total:\n\n- A customer is chosen at random from all 80: P(child with a cold drink) = {{34/80 = 17/40}}.\n- A **child** is chosen at random: now only the 40 children count, so P(cold drink) = {{34/40 = 17/20}}.\n\nA **Venn diagram** shows events as circles inside a rectangle that holds everything (the **universal set**, written ξ). The overlap holds the items in **both** A and B; the space outside both circles holds those in **neither**. Every item sits in exactly one region, so the regions add up to the total.\n\n- P(A and B) = number in the overlap ÷ total.\n- P(A or B) means A, or B, or both. Add every region inside the circles, counting the overlap only once:\n\n    P(A or B) = P(A) + P(B) − P(A and B)\n\nYou may also meet the symbols A ∩ B (\"A and B\", the **intersection**) and A ∪ B (\"A or B\", the **union**).",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Venn diagram for 30 students: 8 play badminton only, 10 play both badminton and chess, 5 play chess only and 7 play neither"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><rect x="20" y="15" width="440" height="230" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><circle cx="195" cy="140" r="88" fill="#c7d2fe" fill-opacity="0.7" stroke="#334155" stroke-width="1.5"/><circle cx="285" cy="140" r="88" fill="#fde68a" fill-opacity="0.7" stroke="#334155" stroke-width="1.5"/><text x="160" y="40" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">Badminton (18)</text><text x="330" y="40" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle" font-weight="bold">Chess (15)</text><text x="150" y="147" font-family="sans-serif" font-size="20" fill="#1f2937" text-anchor="middle" font-weight="bold">8</text><text x="240" y="147" font-family="sans-serif" font-size="20" fill="#1f2937" text-anchor="middle" font-weight="bold">10</text><text x="330" y="147" font-family="sans-serif" font-size="20" fill="#1f2937" text-anchor="middle" font-weight="bold">5</text><text x="150" y="167" font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">only</text><text x="240" y="167" font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">both</text><text x="330" y="167" font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">only</text><text x="425" y="214" font-family="sans-serif" font-size="20" fill="#1f2937" text-anchor="middle" font-weight="bold">7</text><text x="425" y="232" font-family="sans-serif" font-size="11" fill="#1f2937" text-anchor="middle">neither</text><text x="30" y="236" font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="start">ξ = 30 students</text></svg>`,
      diagramCaption:
        "The class from the discovery problem. Fill a Venn diagram from the middle outwards: overlap first, then each circle's \"only\" region, then \"neither\".",
      workedExamples: [
        {
          title: "Completing a two-way table",
          problem:
            "The two-way table shows how 60 students travel to school. Complete it, then find the probability that a student picked at random is in Year 7 and walks.\n\n| | MRT | Bus | Walk | Total |\n|---|---|---|---|---|\n| Year 7 | 12 | 9 | ? | 30 |\n| Year 8 | ? | 6 | 8 | 30 |\n| Total | 28 | 15 | 17 | 60 |",
          steps: [
            "Year 7 walkers: 30 − 12 − 9 = 9.",
            "Year 8 by MRT: 30 − 6 − 8 = 16. Check the MRT column: 12 + 16 = 28 ✓ and the Walk column: 9 + 8 = 17 ✓",
            "P(Year 7 and walks) = {{9/60 = 3/20}}.",
          ],
          answer: "{{3/20}}",
          yourTurn: {
            question:
              "Your turn: using the same completed table, find the probability that a student picked at random is in Year 8 and takes the MRT. Give your answer as a fraction in its simplest form.",
            answer: { type: "fraction", n: 4, d: 15, simplest: true },
            solution: "Year 8 by MRT = 30 − 6 − 8 = 16 students out of all 60: {{16/60 = 4/15}}.",
          },
        },
        {
          title: "Reading a Venn diagram",
          problem:
            "Use the Venn diagram of 30 students (8 badminton only, 10 both, 5 chess only, 7 neither). Find (a) P(a random student plays exactly one of the two), (b) P(a random student plays badminton or chess), (c) the probability that a randomly chosen **badminton player** also plays chess.",
          steps: [
            "(a) Exactly one: 8 + 5 = 13 students, so {{13/30}}.",
            "(b) Badminton or chess (or both): 8 + 10 + 5 = 23, so {{23/30}}. The formula agrees: {{18/30 + 15/30 - 10/30 = 23/30}} ✓",
            "(c) Now only the 18 badminton players count, and 10 of them play chess: {{10/18 = 5/9}}.",
          ],
          answer: "(a) {{13/30}} (b) {{23/30}} (c) {{5/9}}",
        },
        {
          title: "Building a Venn diagram",
          problem:
            "A number from 1 to 20 is chosen at random. A is the event \"even\" and B is the event \"multiple of 3\". Draw a Venn diagram, then find P(A and B) and P(A or B).",
          steps: [
            "Overlap first: numbers that are even **and** multiples of 3 are multiples of 6: 6, 12, 18. That's 3.",
            "Even only: there are 10 even numbers, so 10 − 3 = 7. Multiples of 3 only: 3, 9, 15, which is 3.",
            "Neither: 20 − (7 + 3 + 3) = 7. (They are 1, 5, 7, 11, 13, 17, 19 ✓)",
            "P(A and B) = {{3/20}}. P(A or B) = {{(7 + 3 + 3)/20 = 13/20}}.",
          ],
          answer: "P(A and B) = {{3/20}} and P(A or B) = {{13/20}}",
        },
      ],
      keyPoints: [
        "Probability from a table = the cell ÷ the total of the group you're choosing from.",
        "In a Venn diagram every item is in exactly one region, and the regions add to the total.",
        "\"A or B\" includes both — count the overlap once.",
        "Fill a Venn diagram from the overlap outwards.",
      ],
      whyItWorks:
        "Both pictures sort a group so that each member sits in exactly one place. That turns probability back into counting: P = (members in the event) ÷ (members you're choosing from). Adding the two circles' totals counts the overlap twice — once in each circle — so you subtract it once: P(A or B) = P(A) + P(B) − P(A and B).",
      strategies: ["Draw a diagram", "Start with the overlap", "Check that the totals add up"],
      thinkDeeper:
        "In a group of 40 people, 25 like durian and 22 like mango. What is the smallest possible number who like both? What is the largest? Sketch a Venn diagram for each extreme.",
    },

    // ------------------------------------------------------------------ 6
    {
      id: "relative-frequency",
      heading: "Experiments & relative frequency",
      discovery: {
        problem:
          "Zara says a bottle cap must land \"top up\" with probability {{1/2}}, because it can only land two ways. Her friends test it. After 10 drops: 7 top up. After 100 drops: 41 top up. After 1000 drops: 384 top up. What would you now say P(top up) is — and which result do you trust most?",
        idea:
          "Two outcomes don't make them equally likely, so there's no theory to lean on. Instead use the **relative frequency**: top-up results ÷ drops. 10 drops: 0.7. 100 drops: 0.41. 1000 drops: 0.384. The estimate settles down as the trials pile up, so the best estimate is about **0.38** — clearly not {{1/2}}.",
      },
      body:
        "**Relative frequency** (also called **experimental probability**) is the fraction of trials in which an event happened:\n\n    relative frequency = {{\"number of times the event happens\"/\"number of trials\"}}\n\nUse it when you can't list equally likely outcomes: a bottle cap, a biased dice, whether a bus will be late, how often a footballer scores a penalty. A probability worked out from equally likely outcomes is called a **theoretical probability**.\n\n**More trials give a better estimate.** In a short run, luck dominates: a fair coin can easily give 7 heads in 10 flips. Over many trials the relative frequency settles down close to the true probability (mathematicians call this the **law of large numbers**). So:\n\n- Always use the biggest set of results you have.\n- To combine several experiments, add up **all** the successes and **all** the trials, then divide. Don't average the separate relative frequencies.\n\n**Is it fair?** A coin, dice or spinner is **fair** (unbiased) if every outcome is equally likely; otherwise it is **biased**. To test one, compare the relative frequency with the theoretical probability:\n\n- Small differences are normal — chance always wobbles.\n- A big difference that persists over a **large** number of trials is evidence of bias.\n- A handful of trials proves nothing either way.\n\nA **simulation** uses random numbers (a calculator, a spreadsheet, or slips of paper drawn from a hat) to imitate an experiment many times, quickly.",
      diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line graph of the relative frequency of heads after every 20 flips of a fair coin, from 20 to 200 flips. It starts at 0.65 and settles close to the dashed line at 0.5. The vertical axis runs from 0.3 to 0.7"><rect x="0" y="0" width="480" height="290" fill="#ffffff"/><line x1="64" y1="240" x2="70" y2="240" stroke="#334155" stroke-width="1.5"/><text x="60" y="244" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0.3</text><line x1="70" y1="190" x2="450" y2="190" stroke="#e2e8f0" stroke-width="1"/><line x1="64" y1="190" x2="70" y2="190" stroke="#334155" stroke-width="1.5"/><text x="60" y="194" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0.4</text><line x1="70" y1="140" x2="450" y2="140" stroke="#e2e8f0" stroke-width="1"/><line x1="64" y1="140" x2="70" y2="140" stroke="#334155" stroke-width="1.5"/><text x="60" y="144" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0.5</text><line x1="70" y1="90" x2="450" y2="90" stroke="#e2e8f0" stroke-width="1"/><line x1="64" y1="90" x2="70" y2="90" stroke="#334155" stroke-width="1.5"/><text x="60" y="94" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0.6</text><line x1="70" y1="40" x2="450" y2="40" stroke="#e2e8f0" stroke-width="1"/><line x1="64" y1="40" x2="70" y2="40" stroke="#334155" stroke-width="1.5"/><text x="60" y="44" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0.7</text><line x1="70" y1="240" x2="70" y2="246" stroke="#334155" stroke-width="1.5"/><text x="70" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">0</text><line x1="146" y1="240" x2="146" y2="246" stroke="#334155" stroke-width="1.5"/><text x="146" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">40</text><line x1="222" y1="240" x2="222" y2="246" stroke="#334155" stroke-width="1.5"/><text x="222" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">80</text><line x1="298" y1="240" x2="298" y2="246" stroke="#334155" stroke-width="1.5"/><text x="298" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">120</text><line x1="374" y1="240" x2="374" y2="246" stroke="#334155" stroke-width="1.5"/><text x="374" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">160</text><line x1="450" y1="240" x2="450" y2="246" stroke="#334155" stroke-width="1.5"/><text x="450" y="260" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">200</text><line x1="70" y1="140" x2="450" y2="140" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6 4"/><line x1="70" y1="240" x2="450" y2="240" stroke="#1f2937" stroke-width="1.5"/><line x1="70" y1="30" x2="70" y2="240" stroke="#1f2937" stroke-width="1.5"/><polyline points="108,65 146,102.5 184,115 222,121.25 260,130 298,148.33 336,136.43 374,136.88 412,142.78 450,137.5" fill="none" stroke="#4f46e5" stroke-width="2"/><circle cx="108" cy="65" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="146" cy="102.5" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="184" cy="115" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="222" cy="121.25" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="260" cy="130" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="298" cy="148.33" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="336" cy="136.43" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="374" cy="136.88" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="412" cy="142.78" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><circle cx="450" cy="137.5" r="3.5" fill="#4f46e5" stroke="#1f2937" stroke-width="0.8"/><text x="400" y="168" font-family="sans-serif" font-size="11" fill="#475569" text-anchor="middle">fair coin: 0.5</text><text x="260" y="282" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">Number of flips</text><text x="18" y="135" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 135)">Relative frequency of heads</text></svg>`,
      diagramCaption:
        "Relative frequency of heads for one fair coin, recorded every 20 flips (13 heads in the first 20, 101 in 200). Early results swing about; the line settles towards 0.5. Note the vertical axis starts at 0.3.",
      workedExamples: [
        {
          title: "Finding a relative frequency",
          problem: "A dice is rolled 80 times and shows a six 18 times. Find the relative frequency of a six, as a decimal.",
          steps: [
            "Relative frequency = {{18/80}}.",
            "{{18/80 = 0.225}}.",
            "Compare: the theoretical P(six) is {{1/6}} ≈ 0.167. With only 80 rolls, a gap this size could easily be chance.",
          ],
          answer: "0.225",
          yourTurn: {
            question:
              "Your turn: a spinner is spun 120 times and lands on green 42 times. Find the relative frequency of green. Give your answer as a decimal.",
            answer: { type: "number", value: 0.35, allowFraction: false },
            solution: "Relative frequency = {{42/120 = 0.35}}.",
          },
        },
        {
          title: "Is the dice fair?",
          problem:
            "Marcus rolls a dice 300 times. His results:\n\n| Score | 1 | 2 | 3 | 4 | 5 | 6 |\n|---|---|---|---|---|---|---|\n| Frequency | 41 | 44 | 39 | 42 | 39 | 95 |\n\nIs the dice fair?",
          steps: [
            "If the dice were fair, each score would have probability {{1/6}}, so you'd expect about {{1/6 * 300 = 50}} of each.",
            "Scores 1 to 5 all came up between 39 and 44 times — a little under 50, because the sixes took more than their share.",
            "Six came up 95 times: a relative frequency of {{95/300}} ≈ 0.32, almost double the theoretical {{1/6}} ≈ 0.17.",
            "300 is a large number of trials, so a gap this big is strong evidence of bias.",
          ],
          answer: "Very probably not fair — it looks biased towards six.",
        },
        {
          title: "Pooling results",
          problem:
            "Three friends test the same spinner. Hana gets 9 reds in 20 spins, Jun gets 18 reds in 50 spins and Priya gets 47 reds in 130 spins. What is the best estimate of P(red)?",
          steps: [
            "Pool all the results. Total reds: 9 + 18 + 47 = 74. Total spins: 20 + 50 + 130 = 200.",
            "Best estimate = {{74/200 = 0.37}}.",
            "Averaging the three relative frequencies (0.45, 0.36 and about 0.36) would give Hana's 20 spins as much say as Priya's 130 — that's why you pool instead.",
          ],
          answer: "0.37",
        },
      ],
      keyPoints: [
        "Relative frequency = number of times the event happened ÷ number of trials.",
        "More trials give a more reliable estimate.",
        "Combine experiments by pooling the totals, not by averaging.",
        "Claiming bias needs a large, persistent gap over many trials.",
      ],
      whyItWorks:
        "Suppose a fair coin lands 5 heads more than the expected half. After 10 flips that makes 10 heads, a relative frequency of 1.0 — wildly off. After 1000 flips, 5 extra heads make 505 heads, a relative frequency of 0.505. Random wobbles in the *count* don't vanish, but dividing by a huge number of trials shrinks their effect on the *proportion*.",
      strategies: ["Use the biggest sample", "Compare with theory", "Pool the data"],
      thinkDeeper:
        "A fair coin lands heads 7 times in a row. Arjun says tails is now \"due\". Is he right? If the coin can't remember what it did, how *does* the relative frequency get back towards 0.5?",
    },

    // ------------------------------------------------------------------ 7
    {
      id: "expected-outcomes",
      heading: "Expected outcomes",
      discovery: {
        problem:
          "At the school carnival, a game costs $1 to play. You spin a fair spinner with 5 equal sectors; one sector wins a $3 prize. If 200 people play, roughly how many will win? Will the stall make money — and about how much?",
        idea:
          "P(win) = {{1/5}}, so expect about {{1/5 * 200 = 40}} winners. The stall takes 200 × $1 = $200 and pays out about 40 × $3 = $120, so it expects to make about $80. The key move: **expected number = probability × number of trials**.",
      },
      body:
        "The **expected number** (or **expected frequency**) of an event is how many times you'd predict it to happen in a given number of trials:\n\n    expected number = probability × number of trials\n\nRoll a fair dice 120 times and you'd expect about {{1/6 * 120 = 20}} sixes.\n\nThe probability can be theoretical or an estimate from relative frequency. If a basketball player has scored 72% of her free throws this season, you'd expect about 0.72 × 50 = 36 baskets from her next 50 throws.\n\n**Expected doesn't mean guaranteed.** It's a long-run prediction. Roll 120 times and you might get 17 or 24 sixes — perfectly normal. The expected number needn't be a whole number either: 50 rolls give {{1/6 * 50 = 8 1/3}} expected sixes, which you'd describe as \"about 8\".\n\n**Working backwards.** If you know the expected number, divide to find the probability: expecting 80 reds in 200 picks means P(red) = {{80/200 = 0.4}}.\n\n**Stretch: expected vs observed.** The **observed** frequency is what actually happened. Comparing observed with expected is how scientists test whether a dice is fair or a new medicine works: small gaps are chance; big gaps over many trials need an explanation.",
      diagram: `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar chart of 60 rolls of a fair dice: scores 1 to 6 came up 8, 12, 9, 11, 13 and 7 times. A dashed line at 10 shows the expected frequency for each score"><rect x="0" y="0" width="480" height="280" fill="#ffffff"/><line x1="54" y1="230" x2="60" y2="230" stroke="#334155" stroke-width="1.5"/><text x="50" y="234" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">0</text><line x1="60" y1="206" x2="450" y2="206" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="206" x2="60" y2="206" stroke="#334155" stroke-width="1.5"/><text x="50" y="210" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">2</text><line x1="60" y1="182" x2="450" y2="182" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="182" x2="60" y2="182" stroke="#334155" stroke-width="1.5"/><text x="50" y="186" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">4</text><line x1="60" y1="158" x2="450" y2="158" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="158" x2="60" y2="158" stroke="#334155" stroke-width="1.5"/><text x="50" y="162" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">6</text><line x1="60" y1="134" x2="450" y2="134" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="134" x2="60" y2="134" stroke="#334155" stroke-width="1.5"/><text x="50" y="138" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">8</text><line x1="60" y1="110" x2="450" y2="110" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="110" x2="60" y2="110" stroke="#334155" stroke-width="1.5"/><text x="50" y="114" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">10</text><line x1="60" y1="86" x2="450" y2="86" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="86" x2="60" y2="86" stroke="#334155" stroke-width="1.5"/><text x="50" y="90" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">12</text><line x1="60" y1="62" x2="450" y2="62" stroke="#e2e8f0" stroke-width="1"/><line x1="54" y1="62" x2="60" y2="62" stroke="#334155" stroke-width="1.5"/><text x="50" y="66" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="end">14</text><rect x="92" y="134" width="36" height="96" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="110" y="128" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">8</text><text x="110" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">1</text><rect x="152" y="86" width="36" height="144" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="170" y="80" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">12</text><text x="170" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">2</text><rect x="212" y="122" width="36" height="108" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="230" y="116" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">9</text><text x="230" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">3</text><rect x="272" y="98" width="36" height="132" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="290" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">11</text><text x="290" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">4</text><rect x="332" y="74" width="36" height="156" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="350" y="68" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">13</text><text x="350" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">5</text><rect x="392" y="146" width="36" height="84" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="410" y="140" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">7</text><text x="410" y="248" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">6</text><line x1="60" y1="110" x2="450" y2="110" stroke="#b91c1c" stroke-width="2" stroke-dasharray="7 4"/><text x="456" y="104" font-family="sans-serif" font-size="12" fill="#b91c1c" text-anchor="end" font-weight="bold">expected = 10</text><line x1="60" y1="230" x2="450" y2="230" stroke="#1f2937" stroke-width="1.5"/><line x1="60" y1="50" x2="60" y2="230" stroke="#1f2937" stroke-width="1.5"/><text x="255" y="272" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">Score on the dice (60 rolls)</text><text x="18" y="140" font-family="sans-serif" font-size="12" font-weight="bold" fill="#1f2937" text-anchor="middle" transform="rotate(-90 18 140)">Frequency</text></svg>`,
      diagramCaption:
        "60 rolls of a fair dice. The observed frequencies (bars) scatter around the expected 10 for each score (dashed line). Gaps of up to 3 like these are ordinary chance, not bias.",
      workedExamples: [
        {
          title: "Seeds",
          problem: "The probability that a seed germinates is 0.85. Siti plants 240 seeds. How many would she expect to germinate?",
          steps: ["Expected number = probability × number of trials.", "0.85 × 240 = 204."],
          answer: "About 204 seeds",
          yourTurn: {
            question:
              "Your turn: the probability that Jun's bus is late on any school day is 0.12. How many late days would he expect in 75 school days?",
            answer: { type: "number", value: 9 },
            solution: "Expected number = 0.12 × 75 = 9 days.",
          },
        },
        {
          title: "Two dice, many times",
          problem: "Two fair dice are rolled 180 times. How many times would you expect (a) a total of 7, (b) a double six?",
          steps: [
            "(a) P(total 7) = {{6/36 = 1/6}}, so expect {{1/6 * 180 = 30}}.",
            "(b) P(double six) = {{1/36}}, so expect {{1/36 * 180 = 5}}.",
          ],
          answer: "(a) 30 (b) 5",
        },
        {
          title: "Working backwards",
          problem:
            "A bag holds 15 counters, some of them red. Priya picks a counter, notes its colour and puts it back. For 200 picks, the expected number of reds is 80. How many red counters are in the bag?",
          steps: [
            "P(red) × 200 = 80, so P(red) = {{80/200 = 2/5}}.",
            "Red counters = {{2/5}} of 15 = 6.",
            "Check: with 6 red out of 15, expected reds = {{6/15 * 200 = 80}} ✓",
          ],
          answer: "6 red counters",
        },
      ],
      keyPoints: [
        "Expected number = probability × number of trials.",
        "It's a prediction, not a promise — real results vary around it.",
        "Work backwards: probability = expected number ÷ number of trials.",
        "Stretch: compare observed with expected to judge whether something is fair.",
      ],
      whyItWorks:
        "A probability of {{1/6}} means that, in the long run, the event happens in about 1 out of every 6 trials. 120 trials split into 20 groups of 6, so you expect about 20 sixes. In general you're finding a fraction of an amount: P of *n* is P × *n*.",
      strategies: ["Multiply probability by trials", "Work backwards", "Estimate first"],
      thinkDeeper:
        "A fair coin is flipped 10 times, so the expected number of heads is 5. Yet exactly 5 heads happens only about 1 time in 4. How can the \"expected\" result be unlikely? Is any other number of heads more likely than 5?",
    },

    // ------------------------------------------------------------------ 8
    {
      id: "tree-diagrams",
      heading: "Tree diagrams & independence",
      discovery: {
        problem:
          "A biased spinner lands red with probability 0.7 and blue with probability 0.3. You spin it twice. There's no grid of equally likely outcomes now, so how could you find P(red, then red)? Hint: imagine doing the double-spin 100 times.",
        idea:
          "In about 70 of the 100 double-spins the first spin is red. In about 70% of **those** 70, the second spin is red too: 0.7 × 70 = 49. So P(red, red) = 0.49 = 0.7 × 0.7. To find the probability of one thing **and then** another, **multiply**.",
      },
      body:
        "**Stretch:** this section looks ahead to Year 9.\n\nTwo events are **independent** if one happening doesn't change the probability of the other: two coin flips, a dice and a spinner, or picking a counter and **putting it back**. If the first result changes what can happen next — picking **without** replacement — the events are **dependent**.\n\nA **tree diagram** shows a two-stage experiment:\n\n- The first set of branches shows the outcomes of stage 1, labelled with their probabilities.\n- From the end of each branch, a second set of branches shows stage 2.\n- The branches from any one point add up to 1.\n\nThen:\n\n- **Multiply along** a path to get the probability of that combined outcome (this AND then that).\n- **Add** the results of different paths when several of them give the event you want (this OR that). Different paths are mutually exclusive, so adding is allowed.\n- All the path results together add up to 1 — a great check.\n\nFor the spinner: P(exactly one red) = P(R, B) + P(B, R) = 0.21 + 0.21 = 0.42.\n\n**Dependent events.** Take two sweets from a bag of 3 strawberry and 2 lemon, without replacement. P(first is strawberry) = {{3/5}}. Now only 2 strawberry are left out of 4, so P(both strawberry) = {{3/5 * 2/4 = 6/20 = 3/10}}. The second-stage branches change because the bag has changed.",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tree diagram for spinning a biased spinner twice, with P(red) 0.7 and P(blue) 0.3 on every pair of branches. The four outcomes are RR 0.49, RB 0.21, BR 0.21 and BB 0.09, which add to 1"><rect x="0" y="0" width="480" height="260" fill="#ffffff"/><text x="85" y="18" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">1st spin</text><text x="215" y="18" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">2nd spin</text><text x="370" y="18" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">Outcome</text><line x1="20" y1="130" x2="140" y2="70" stroke="#334155" stroke-width="1.5"/><line x1="20" y1="130" x2="140" y2="190" stroke="#334155" stroke-width="1.5"/><text x="150" y="75" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">R</text><text x="150" y="195" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="72" y="92" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.7</text><text x="72" y="178" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.3</text><line x1="160" y1="70" x2="270" y2="40" stroke="#334155" stroke-width="1.5"/><text x="280" y="45" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">R</text><text x="210" y="45" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.7</text><text x="300" y="45" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">RR:  0.7 × 0.7 = 0.49</text><line x1="160" y1="70" x2="270" y2="100" stroke="#334155" stroke-width="1.5"/><text x="280" y="105" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="210" y="102" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.3</text><text x="300" y="105" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">RB:  0.7 × 0.3 = 0.21</text><line x1="160" y1="190" x2="270" y2="160" stroke="#334155" stroke-width="1.5"/><text x="280" y="165" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">R</text><text x="210" y="165" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.7</text><text x="300" y="165" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">BR:  0.3 × 0.7 = 0.21</text><line x1="160" y1="190" x2="270" y2="220" stroke="#334155" stroke-width="1.5"/><text x="280" y="225" font-family="sans-serif" font-size="14" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><text x="210" y="222" font-family="sans-serif" font-size="12" fill="#4f46e5" text-anchor="middle" font-weight="bold">0.3</text><text x="300" y="225" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="start">BB:  0.3 × 0.3 = 0.09</text><text x="240" y="252" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle" font-weight="bold">Check: 0.49 + 0.21 + 0.21 + 0.09 = 1</text></svg>`,
      diagramCaption:
        "A tree diagram for spinning the biased spinner twice. Multiply along each path; the four results add up to 1.",
      workedExamples: [
        {
          title: "Late two days running",
          problem:
            "The probability that Mei's bus is late is 0.2 on any day, independently of other days. Find the probability that it is late on both Monday and Tuesday.",
          steps: ["The days are independent, so multiply along the path \"late, then late\".", "0.2 × 0.2 = 0.04."],
          answer: "0.04",
          yourTurn: {
            question:
              "Your turn: in the monsoon season, the probability that it rains on any given day is 0.6, independently of other days. Find the probability that it rains on both of two days. Give your answer as a decimal.",
            answer: { type: "number", value: 0.36, allowFraction: false },
            solution: "Multiply along the path \"rain, then rain\": 0.6 × 0.6 = 0.36.",
          },
        },
        {
          title: "Exactly one",
          problem:
            "Mei's bus is late with probability 0.2 on any day, independently. Find the probability that it is late on exactly one of two days.",
          steps: [
            "P(not late) = 1 − 0.2 = 0.8.",
            "Two paths give exactly one late day: (late, on time) = 0.2 × 0.8 = 0.16 and (on time, late) = 0.8 × 0.2 = 0.16.",
            "Add the paths: 0.16 + 0.16 = 0.32.",
            "Check all four paths: 0.04 + 0.16 + 0.16 + 0.64 = 1 ✓",
          ],
          answer: "0.32",
        },
        {
          title: "Without replacement",
          problem:
            "A bag holds 4 mango sweets and 3 lychee sweets. Ravi takes two sweets without replacement. Find the probability that both are the same flavour.",
          steps: [
            "The events are dependent: the second branch depends on what was taken first.",
            "Both mango: {{4/7 * 3/6 = 12/42}}.",
            "Both lychee: {{3/7 * 2/6 = 6/42}}.",
            "Same flavour = {{12/42 + 6/42 = 18/42 = 3/7}}.",
          ],
          answer: "{{3/7}}",
        },
      ],
      keyPoints: [
        "Independent: one result doesn't change the other's probabilities.",
        "Multiply along branches for AND; add the paths for OR.",
        "Each set of branches adds to 1, and so do all the final results.",
        "Without replacement, the second-stage fractions change.",
      ],
      whyItWorks:
        "Draw a 1 × 1 square. Shade 0.7 of its width for \"first spin red\" and 0.7 of its height for \"second spin red\". The rectangle that is red both ways has area 0.7 × 0.7 = 0.49. Multiplying is just taking a fraction of a fraction: in 0.7 of all cases the first spin is red, and in 0.7 of **those** the second is red too.",
      strategies: ["Draw a tree diagram", "Use the complement", "Check the ends add to 1"],
      thinkDeeper:
        "You flip a fair coin until you get a head. What is the probability that you need exactly 3 flips? Exactly *n* flips? Add up the probabilities for 1, 2, 3, 4, … flips. What total do they get closer and closer to — and why must that be the answer?",
    },
  ],
  learn: {
    flashcards: [
      { front: "What do 0, {{1/2}} and 1 mean on the probability scale?", back: "0 = impossible, {{1/2}} = even chance, 1 = certain. No probability is below 0 or above 1." },
      { front: "P(event) when the outcomes are equally likely", back: "{{\"favourable outcomes\"/\"total outcomes\"}}. For example, P(even on a dice) = {{3/6 = 1/2}}." },
      { front: "What are mutually exclusive events?", back: "Events that cannot happen at the same time, such as rolling a 2 and rolling a 5 with one dice." },
      { front: "The complement rule", back: "P(not A) = 1 − P(A). If P(rain) = 0.3, then P(no rain) = 0.7." },
      { front: "A probability table has one value missing. How do you find it?", back: "Subtract the total of the others from 1." },
      { front: "What is a sample space?", back: "The complete list of possible outcomes of an experiment." },
      { front: "The product rule for counting", back: "*m* ways then *n* ways gives *m* × *n* ways. For example, 4 mains × 3 drinks = 12 combinations." },
      { front: "How many outcomes for two coins? For two dice?", back: "Two coins: 4 (HH, HT, TH, TT). Two dice: 6 × 6 = 36." },
      { front: "The most likely total with two dice, and its probability", back: "7, with probability {{6/36 = 1/6}}." },
      { front: "P(at least one six) with two dice", back: "{{1 - 25/36 = 11/36}} (25 of the 36 cells have no six)." },
      { front: "How do you find P(A or B) from a Venn diagram?", back: "Add every region inside A or B (or both), counting the overlap once, then divide by the total." },
      { front: "Relative frequency", back: "{{\"times the event happened\"/\"number of trials\"}}: an estimate of the probability from an experiment." },
      { front: "Why do more trials give a better estimate?", back: "Random wobbles get divided by a bigger number of trials, so the relative frequency settles near the true probability." },
      { front: "Expected number", back: "Probability × number of trials. P(six) = {{1/6}} over 60 rolls → expect about 10 sixes." },
      { front: "How do you test whether a dice is fair?", back: "Roll it many times and compare each relative frequency with {{1/6}}. A large gap that persists over many trials suggests bias." },
      { front: "Tree diagrams (stretch): multiply or add?", back: "Multiply along a path (AND). Add different paths (OR)." },
    ],
    mustKnow: [
      "I can place an event on the probability scale and describe it in words.",
      "I can find a probability as favourable outcomes ÷ total outcomes and write it as a fraction, decimal or percentage.",
      "I can use P(not A) = 1 − P(A).",
      "I can find a missing probability in a table, using the fact that the probabilities add to 1.",
      "I can decide whether two events are mutually exclusive, and add their probabilities when they are.",
      "I can list outcomes systematically and draw a sample space diagram for two dice, coins or spinners.",
      "I can use the product rule to count combined outcomes.",
      "I can find the probability of a combined event from a sample space.",
      "I can find probabilities from two-way tables and Venn diagrams.",
      "I can calculate a relative frequency and explain why more trials give a better estimate.",
      "I can compare experimental and theoretical probability to judge whether a dice or spinner is fair.",
      "I can work out an expected number as probability × number of trials.",
    ],
    misconceptions: [
      {
        wrong: "There are two outcomes, win or lose, so P(win) = {{1/2}}.",
        right: "Only equally likely outcomes give {{1/2}}. A lottery ticket either wins or loses, but P(win) is tiny.",
      },
      {
        wrong: "After five heads in a row, tails is more likely next time.",
        right: "A coin has no memory. P(tails) is still {{1/2}} on every flip.",
      },
      {
        wrong: "Two dice give 11 totals (2 to 12), so P(total 7) = {{1/11}}.",
        right: "The totals aren't equally likely; the 36 ordered pairs are. Six pairs give 7, so P(total 7) = {{6/36 = 1/6}}.",
      },
      {
        wrong: "HT and TH are the same, so two coins have three outcomes, each with probability {{1/3}}.",
        right: "There are four equally likely outcomes. One head and one tail happens in 2 of them, so its probability is {{2/4 = 1/2}}.",
      },
      {
        wrong: "Roll a dice 60 times and you will get exactly 10 sixes.",
        right: "You'd *expect* about 10. The actual number varies — 7 or 13 would be quite normal.",
      },
      {
        wrong: "P(A or B) = P(A) + P(B), always.",
        right: "Only when A and B are mutually exclusive. If they overlap, subtract the overlap: P(A) + P(B) − P(A and B).",
      },
    ],
    examMistakes: [
      "Writing a probability as a ratio (3 : 10) or as \"3 out of 10\" instead of {{3/10}}, 0.3 or 30%.",
      "Giving a probability bigger than 1 — a sure sign of an error somewhere.",
      "Missing outcomes when listing, such as counting HT but forgetting TH.",
      "Dividing by the grand total when the question picks from just one group of a two-way table (\"a child is chosen…\").",
      "Counting the overlap of a Venn diagram twice when finding P(A or B).",
      "Averaging relative frequencies from experiments of different sizes instead of pooling the totals.",
      "Answering an expected-number question with a probability, such as {{1/6}} instead of 20 sixes in 120 rolls.",
      "Adding along the branches of a tree diagram instead of multiplying.",
    ],
    mnemonics: [
      {
        topic: "Basic probability",
        device: "Wanted over All",
        explanation: "P(event) = the outcomes you *want* ÷ *all* the equally likely outcomes.",
      },
      {
        topic: "Complements",
        device: "NOT means 1 minus",
        explanation: "P(not A) = 1 − P(A): whatever doesn't belong to A is left over for \"not A\".",
      },
      {
        topic: "Expected number",
        device: "P times the tries",
        explanation: "Expected number = probability × number of trials.",
      },
      {
        topic: "Tree diagrams (stretch)",
        device: "AND → multiply, OR → add",
        explanation: "Multiply along a path for \"this and then that\"; add separate paths for \"this or that\".",
      },
    ],
    realWorld: [
      {
        title: "Weather forecasts",
        detail: "A 70% chance of thunderstorms means that on days with conditions like these, storms have happened about 7 times in 10. It's a relative frequency built from years of records.",
        emoji: "🌦️",
      },
      {
        title: "Lotteries",
        detail: "In Singapore Pools' TOTO you choose 6 numbers from 1 to 49. There are 13 983 816 possible combinations, so one ticket's chance of the jackpot is about 1 in 14 million.",
        emoji: "🎟️",
      },
      {
        title: "Medicine trials",
        detail: "New medicines are tested on thousands of volunteers. Comparing the observed number of recoveries with the number expected by chance shows whether a medicine really works.",
        emoji: "💊",
      },
      {
        title: "Insurance",
        detail: "Insurers use relative frequencies — how often phones are dropped or cars crash — to predict the expected number of claims and set their prices.",
        emoji: "🛡️",
      },
      {
        title: "Game design",
        detail: "Board-game designers use sample spaces to balance their games. Knowing that 7 is the most common two-dice total changes where you'd want to build!",
        emoji: "🎲",
      },
      {
        title: "Quality control",
        detail: "A factory tests a sample of its products. The relative frequency of faults lets it estimate how many faulty items to expect in a batch of 10 000.",
        emoji: "🏭",
      },
    ],
    videos: [
      { title: "Probability basics", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+probability" },
      { title: "Sample space diagrams", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+sample+space+diagrams" },
      {
        title: "Experimental versus theoretical probability",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+experimental+versus+theoretical+probability",
      },
      { title: "Tree diagrams (stretch)", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+tree+diagrams" },
    ],
    formulas: [
      {
        name: "Probability (equally likely outcomes)",
        formula: "{{P(A) = \"number of favourable outcomes\"/\"total number of outcomes\"}}",
        note: "Every probability lies between 0 (impossible) and 1 (certain).",
      },
      { name: "Complement", formula: "P(not A) = 1 − P(A)" },
      {
        name: "Mutually exclusive events",
        formula: "P(A or B) = P(A) + P(B)",
        note: "Only when A and B can't happen together. Mutually exclusive outcomes covering everything add up to 1.",
      },
      { name: "Product rule for counting", formula: "*m* ways then *n* ways → *m* × *n* ways", note: "Two dice: 6 × 6 = 36 outcomes." },
      { name: "Overlapping events (Venn diagram)", formula: "P(A or B) = P(A) + P(B) − P(A and B)" },
      { name: "Relative frequency", formula: "{{\"relative frequency\" = \"number of successes\"/\"number of trials\"}}" },
      { name: "Expected number", formula: "expected number = probability × number of trials" },
      {
        name: "Independent events (stretch)",
        formula: "P(A and B) = P(A) × P(B)",
        note: "Multiply along the branches of a tree diagram.",
      },
    ],
  },
};
