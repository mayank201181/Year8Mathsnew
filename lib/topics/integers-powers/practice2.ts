// Practice Papers 3 and 4 for "Integers, Powers & Roots".
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style (linked parts, diagrams and tables, reasoning).
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "integers-powers-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "integers-powers-p3-q01",
        question:
          "Wei Ling's freezer keeps food at −18 °C. She takes out a tub of mango sorbet and leaves it on the kitchen counter until it reaches 4 °C.\n\nBy how many degrees Celsius did its temperature rise?",
        answer: { type: "number", value: 22, display: "22 °C" },
        solution: [
          "Rise = final temperature − starting temperature = 4 − (−18).",
          "Subtracting a negative is the same as adding: 4 + 18 = 22.",
          "The temperature rose by 22 °C.",
        ],
        solutions: [
          {
            label: "Thermometer jumps",
            steps: ["From −18 °C up to 0 °C is 18 degrees.", "From 0 °C up to 4 °C is 4 more degrees.", "18 + 4 = 22 degrees."],
          },
        ],
        commonError: "Working out 18 − 4 = 14, forgetting that the temperature has to climb all the way up to 0 first.",
        traps: [
          {
            spec: { type: "number", value: 14 },
            feedback: "14 is 18 − 4. But the sorbet climbs 18 degrees just to reach 0 °C, then 4 more degrees after that.",
          },
        ],
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Picture a thermometer. How far is it from −18 up to 0? Then from 0 up to 4?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q02",
        question:
          "Zara says every integer is also a rational number, because any integer can be written as a fraction of two integers.\n\nFind the integer n that makes {{n/3 = -6}} true.",
        answer: { type: "number", value: -18 },
        solution: [
          "{{n/3 = -6}} means n ÷ 3 = −6.",
          "Use the inverse: n = −6 × 3 = −18.",
          "So {{-6 = (-18)/3}}. Writing −6 as a fraction of two integers is exactly why −6 is a rational number.",
        ],
        traps: [
          { spec: { type: "number", value: -2 }, feedback: "−2 is −6 ÷ 3. You need the top number that gives −6 when you divide it by 3." },
          { spec: { type: "number", value: 18 }, feedback: "Check the sign: {{18/3}} is +6, not −6." },
        ],
        difficulty: "warmup",
        guideRef: "types-of-number",
        hints: ["Which number, divided by 3, gives −6? Undo the division."],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q03",
        question:
          "In a maths quiz, a correct answer scores +4 points and a wrong answer scores −2 points.\n\nJun answers 8 questions: 3 correct and 5 wrong. What is his total score?",
        answer: { type: "number", value: 2 },
        solution: ["Correct answers: 3 × 4 = 12 points.", "Wrong answers: 5 × (−2) = −10 points.", "Total: 12 + (−10) = 2 points."],
        commonError: "Adding the 10 points from wrong answers instead of taking them away.",
        traps: [
          { spec: { type: "number", value: 22 }, feedback: "Five wrong answers give 5 × (−2) = −10. They lower the score, so 12 + (−10)." },
        ],
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Work out the points from the correct answers and from the wrong answers separately, then combine them."],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q04",
        question:
          "A square community garden next to an HDB block has an area of 225 m².\n\nHow many metres of fencing are needed to go all the way round it?",
        answer: { type: "number", value: 60, display: "60 m" },
        solution: ["Side length = {{sqrt(225)}} = 15 m, because 15 × 15 = 225.", "Perimeter = 4 × 15 = 60 m."],
        commonError: "Dividing the area by 4. Find the side length with a square root first.",
        traps: [
          { spec: { type: "number", value: 15 }, feedback: "15 m is one side. The fence goes round all four sides." },
          { spec: { type: "number", value: 56.25 }, feedback: "You divided the area by 4. First find the side: which number times itself makes 225?" },
        ],
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["What length, multiplied by itself, gives 225?"],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q05",
        question:
          "Arjun starts a chain message. On day 1 he sends it to 3 friends. Every person who receives it forwards it to 3 new people the next day.\n\nSo 3 people receive it on day 1, {{3^2}} = 9 people on day 2, and so on. How many people receive it on day 6?",
        answer: { type: "number", value: 729 },
        solution: [
          "Day 1: {{3^1}}, day 2: {{3^2}}, day 3: {{3^3}} … so day n: {{3^n}} people.",
          "Day 6: {{3^6}} = 3 × 3 × 3 × 3 × 3 × 3.",
          "Group in pairs: 9 × 9 × 9 = 81 × 9 = 729 people.",
        ],
        commonError: "Working out 3 × 6 = 18. The number triples each day; it doesn't go up by 3.",
        traps: [
          { spec: { type: "number", value: 18 }, feedback: "18 is 3 × 6. The number of people is multiplied by 3 each day, so you need {{3^6}}." },
          { spec: { type: "number", value: 243 }, feedback: "{{3^5}} = 243 is day 5. One more day triples it again." },
        ],
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["Day 1 is {{3^1}} and day 2 is {{3^2}}. What will day 6 be?"],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q06",
        question:
          "Marcus starts the week with $35 in his bank account. The table shows his transactions, in order.\n\n| Day | Transaction |\n|---|---|\n| Monday | spends $52 |\n| Tuesday | earns $20 |\n| Wednesday | spends $18 |\n| Thursday | earns $40 |\n\nWhat was his **lowest** balance during the week? (A negative balance means he is overdrawn.)",
        answer: { type: "number", value: -17, display: "−$17" },
        solution: [
          "Monday: 35 − 52 = −17.",
          "Tuesday: −17 + 20 = 3.",
          "Wednesday: 3 − 18 = −15.",
          "Thursday: −15 + 40 = 25.",
          "Compare the balances: −17 < −15 < 3 < 25. The lowest balance was −$17, on Monday.",
        ],
        commonError: "Thinking −15 is lower than −17. On a number line −17 is further left, so it is lower.",
        traps: [
          { spec: { type: "number", value: 25 }, feedback: "$25 is his balance at the end of the week. Track the balance after every day and find the lowest one." },
          { spec: { type: "number", value: -15 }, feedback: "−15 is Wednesday's balance. Check Monday's too: which is lower, −15 or −17?" },
          { spec: { type: "number", value: 17 }, feedback: "Being $17 overdrawn means a balance of −$17. Give the balance as a negative number." },
        ],
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Work out the balance after each day, one day at a time.",
          "After Monday: 35 − 52. Is that above or below zero?",
          "Monday leaves −17. Keep going, then compare all four balances.",
        ],
        strategy: "Make a table",
      },
      {
        kind: "written",
        id: "integers-powers-p3-q07",
        question:
          "Singapore's highest natural point, Bukit Timah Hill, is about 164 m above sea level. A section of a deep tunnel runs 55 m below sea level.\n\nSiti says: \"The difference in height between the top of the hill and the tunnel is 164 − 55 = 109 m.\"\n\nIs Siti right? Explain, and find the correct difference.",
        marks: 3,
        modelAnswer:
          "Siti is wrong. Measured from sea level, the hilltop is at +164 m and the tunnel is at −55 m. The difference is 164 − (−55) = 164 + 55 = 219 m. Siti treated the tunnel as if it were 55 m above sea level. Because it is below, you go 164 m down to sea level and then a further 55 m.",
        markScheme: [
          { point: "Writes the heights as +164 and −55, or says the tunnel is below sea level so the two distances add", keywords: ["-55", "−55", "below", "sea level", "negative"] },
          { point: "Calculates 164 − (−55) = 219 m (or 164 + 55 = 219)", keywords: ["219", "164 + 55", "164 - (-55)", "164 − (−55)"] },
          { point: "Concludes Siti is wrong, with a reason (she treated the tunnel as being above sea level)", keywords: ["wrong", "not right", "incorrect", "above"] },
        ],
        commonError: "Agreeing with Siti because 164 − 55 looks like a difference. The tunnel's height is −55, not 55.",
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Draw a vertical number line with sea level at 0.",
          "Where is the tunnel on that line: at +55 or at −55?",
          "Difference = higher − lower = 164 − (−55).",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q08",
        question:
          "During a dry spell, the water level in a reservoir changes by −48 mm every day for 31 days. Then monsoon rain raises the level by 395 mm.\n\nEstimate the overall change in the water level by rounding every number to 1 significant figure. Give your answer in mm.",
        answer: { type: "number", value: -1100, display: "−1100 mm" },
        solution: [
          "Round: −48 ≈ −50, 31 ≈ 30 and 395 ≈ 400.",
          "Dry spell: −50 × 30 = −1500 mm.",
          "Add the rain: −1500 + 400 = −1100 mm.",
          "Check: the exact change is −48 × 31 + 395 = −1488 + 395 = −1093 mm, very close to the estimate.",
        ],
        commonError: "Losing the negative sign. A falling water level is a negative change.",
        traps: [
          { spec: { type: "number", value: 1100 }, feedback: "The level falls overall: −1500 + 400 is still below zero, so the change is negative." },
          { spec: { type: "number", value: -1900 }, feedback: "The rain *raises* the level, so add 400 to −1500. Don't subtract it." },
        ],
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Round each number first: −48, 31 and 395.",
          "The dry spell changes the level by about −50 × 30.",
          "Then add the effect of the rain: −1500 + 400.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q09",
        question:
          "Ethan wants the mean of four temperatures: −7 °C, 3 °C, −5 °C and 1 °C. He types this into his calculator:\n\n    −7 + 3 + −5 + 1 ÷ 4\n\nWhat number does his calculator show, and what is the correct mean? Give the calculator's answer first, then the correct mean.",
        answer: { type: "list", values: [-8.75, -2], ordered: true, display: "−8.75, then −2 °C" },
        solution: [
          "A calculator follows the order of operations, so it divides first: 1 ÷ 4 = 0.25.",
          "Then it adds: −7 + 3 + (−5) + 0.25 = −8.75.",
          "The correct mean divides the whole total by 4: (−7 + 3 + (−5) + 1) ÷ 4 = −8 ÷ 4 = −2 °C.",
          "Ethan should type (−7 + 3 + −5 + 1) ÷ 4, with brackets round the total.",
        ],
        commonError: "Forgetting that the calculator divides before it adds, so only the 1 gets divided by 4.",
        traps: [
          { spec: { type: "list", values: [-2, -2], ordered: true }, feedback: "The calculator does not know you want a mean. It divides only the 1 by 4 before adding." },
          { spec: { type: "list", values: [-2, -8.75], ordered: true }, feedback: "Right numbers, wrong order: give the calculator's answer first, then the correct mean." },
        ],
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "A calculator obeys the order of operations. Which operation in Ethan's line comes first?",
          "It works out 1 ÷ 4 first, then does the additions.",
          "For the true mean, the whole total must be divided by 4, which needs brackets.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q10",
        question:
          "Priya thinks of a number. She squares it, then subtracts 20. Her answer is 29.\n\nWhat could her number have been? Give both possible values.",
        answer: { type: "list", values: [7, -7], display: "7 or −7" },
        solution: [
          "Work backwards. Before subtracting 20, the number was 29 + 20 = 49.",
          "So her number squared is 49.",
          "7 × 7 = 49 and (−7) × (−7) = 49, so her number was 7 or −7.",
        ],
        commonError: "Giving only 7. A negative number squared is positive too, so −7 also works.",
        traps: [
          { spec: { type: "list", values: [3, -3] }, feedback: "You subtracted 20 from 29. To undo 'subtract 20' you add 20: 29 + 20 = 49." },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Work backwards: undo each step in reverse order.",
          "Undo 'subtract 20' first. What was the square?",
          "Which numbers square to 49? There are two of them.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "integers-powers-p3-q11",
        question:
          "A blast freezer cools a tray of food. The temperature starts at 26 °C and changes by −4 °C every 3 minutes.\n\nRavi says the food will reach −10 °C within 25 minutes. Is he right? Show your working.",
        marks: 4,
        modelAnswer:
          "No, Ravi is wrong. The temperature must change from 26 °C to −10 °C, a change of −10 − 26 = −36 °C. Each 3 minutes the change is −4 °C, so it needs −36 ÷ (−4) = 9 lots of 3 minutes, which is 9 × 3 = 27 minutes. 27 minutes is more than 25 minutes. (After 24 minutes it has only reached 26 + 8 × (−4) = −6 °C.)",
        markScheme: [
          { point: "Finds the total change needed: 36 °C (or −36 °C)", keywords: ["36", "-36", "−36"] },
          { point: "Finds the number of 3-minute steps: 36 ÷ 4 = 9 (or −36 ÷ −4 = 9)", keywords: ["9", "nine", "36 ÷ 4", "36/4"] },
          { point: "Finds the time needed, 27 minutes (or shows the temperature is only −6 °C after 24 minutes)", keywords: ["27", "-6", "−6"] },
          { point: "Concludes Ravi is wrong because 27 minutes is more than 25", keywords: ["wrong", "no", "not", "more than 25", "longer"] },
        ],
        commonError: "Working out 26 − 10 = 16 degrees, forgetting that the temperature has to go below zero.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "How many degrees does the temperature need to change by altogether?",
          "From 26 down to 0 is 26 degrees; from 0 down to −10 is 10 more.",
          "A change of −36 at −4 per step: how many 3-minute steps is that?",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q12",
        question:
          "Weather websites in the USA give temperatures in degrees Fahrenheit (°F). To convert to degrees Celsius (°C) you can use\n\n    {{C = (5(F - 32))/9}}\n\nOne winter night in Alaska the temperature was −4 °F. What was it in °C?",
        answer: { type: "number", value: -20, display: "−20 °C" },
        solution: [
          "Bracket first: F − 32 = −4 − 32 = −36.",
          "Multiply: 5 × (−36) = −180.",
          "Divide: −180 ÷ 9 = −20.",
          "So −4 °F is −20 °C.",
        ],
        commonError: "Working out −4 − 32 as −28 or +36. Moving 32 further down from −4 gives −36.",
        traps: [
          { spec: { type: "number", value: 20 }, feedback: "Check the sign: −4 − 32 = −36, so the top of the fraction is negative and so is the answer." },
          { spec: { type: "number", value: -36 }, feedback: "−36 is just the bracket, F − 32. Now multiply by 5 and divide by 9." },
        ],
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "Substitute F = −4. What is the bracket, F − 32?",
          "−4 − 32 = −36. Now multiply by 5.",
          "Divide −180 by 9.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q13",
        question:
          "A cuboid has length {{2a^2}} cm, width {{3a}} cm and height {{a^4}} cm.\n\nWrite a simplified expression for its volume in cm³.",
        answer: { type: "expression", expr: "6a^7", form: "simplified", display: "{{6a^7}} cm³" },
        solution: [
          "Volume = length × width × height = {{2a^2 * 3a * a^4}}.",
          "Numbers: 2 × 3 = 6.",
          "Letters: {{a^2 * a^1 * a^4 = a^(2+1+4) = a^7}}.",
          "Volume = {{6a^7}} cm³.",
        ],
        commonError: "Forgetting that a plain {{a}} means {{a^1}}, which gives {{6a^6}}.",
        traps: [
          { spec: { type: "expression", expr: "6a^6" }, feedback: "{{3a}} means {{3a^1}}, so the indices to add are 2 + 1 + 4 = 7." },
          { spec: { type: "expression", expr: "6a^8" }, feedback: "When you multiply powers of the same base you add the indices; you don't multiply them." },
        ],
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Volume = length × width × height. Deal with the numbers and the letters separately.",
          "Numbers: 2 × 3. Letters: {{a^2 * a * a^4}}.",
          "A lone {{a}} is {{a^1}}. Add the indices 2 + 1 + 4.",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "written",
        id: "integers-powers-p3-q14",
        question:
          "Hana's phone has {{2^7}} GB of free space. Each video she films uses {{2^9}} MB, and 1 GB = {{2^10}} MB.\n\nHana says she has room for exactly {{2^8}} videos. Is she right? Show your working using the index laws.",
        marks: 3,
        modelAnswer:
          "Yes, Hana is right. Free space in MB: {{2^7 * 2^10 = 2^(7+10) = 2^17}} MB. Number of videos: {{2^17 ÷ 2^9 = 2^(17-9) = 2^8}}. So she has room for {{2^8}} = 256 videos.",
        markScheme: [
          { point: "Converts the free space to MB: {{2^7 * 2^10 = 2^17}} (adds the indices)", keywords: ["2^17", "17", "131072"] },
          { point: "Divides by the video size: {{2^17 ÷ 2^9 = 2^8}} (subtracts the indices)", keywords: ["2^8", "17 - 9", "17 − 9", "256"] },
          { point: "Concludes that Hana is right", keywords: ["right", "correct", "yes", "true"] },
        ],
        commonError: "Dividing {{2^7}} by {{2^9}} straight away, without first changing GB into MB.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Get both amounts in the same unit first: MB.",
          "{{2^7}} GB is {{2^7 * 2^10}} MB. Which index law helps?",
          "Then divide by the size of one video, {{2^9}} MB.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q15",
        question:
          "Mei folds a sheet of paper in half, then in half again, and keeps going until she has made 5 folds. When she unfolds it, the creases split the sheet into equal sections.\n\nEach section is {{2^n}} of the whole sheet. Find n.",
        answer: { type: "number", value: -5 },
        solution: [
          "Each fold doubles the number of sections: 2, 4, 8, 16, 32.",
          "So each section is {{1/32}} of the sheet.",
          "{{1/32 = 1/2^5 = 2^(-5)}}, so n = −5.",
        ],
        commonError: "Answering 5. {{2^5}} = 32 counts the sections, but one section is a fraction of the sheet, so the index is negative.",
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "{{2^5}} = 32 is the *number* of sections. Each section is {{1/32}} of the sheet, and {{1/32 = 2^(-5)}}." },
        ],
        difficulty: "core",
        guideRef: "negative-indices",
        hints: [
          "How many sections are there after 1 fold? 2 folds? 3 folds?",
          "After 5 folds there are 32 sections, so each one is {{1/32}} of the sheet.",
          "How do you write {{1/2^5}} as a single power of 2?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "written",
        id: "integers-powers-p3-q16",
        question:
          "Is this statement **always**, **sometimes** or **never** true?\n\n> The square of an integer is bigger than the integer itself.\n\nExplain your answer, using examples.",
        marks: 3,
        modelAnswer:
          "Sometimes true. It is true for every negative integer, because the square of a negative number is positive: for example {{(-3)^2 = 9}} and 9 > −3. It is also true for 2, 3, 4, …, for example {{5^2 = 25}} and 25 > 5. But it is false for 0 and 1, because {{0^2 = 0}} and {{1^2 = 1}}: the square equals the number, so it is not bigger.",
        markScheme: [
          { point: "Gives an example where it is true (a negative integer, or an integer of 2 or more)", keywords: ["-3", "−3", "9", "25", "negative", "positive"] },
          { point: "Gives a counterexample: 0 or 1, where the square equals the number", keywords: ["0", "1", "zero", "one", "equal", "same"] },
          { point: "Concludes 'sometimes'", keywords: ["sometimes"] },
        ],
        commonError: "Testing only 3, 4 and 5 and deciding 'always'. Always test 0, 1 and a negative number too.",
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Test lots of integers: try a negative one, 0, 1 and a large one.",
          "What is {{0^2}}? What is {{1^2}}?",
          "One counterexample rules out 'always'; one example where it works rules out 'never'.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q17",
        question:
          "Kofi plays a game on a number line, starting at 0. On turn 1 he moves 1 step right, on turn 2 he moves 2 steps left, on turn 3 he moves 3 steps right, on turn 4 he moves 4 steps left, and so on: right on odd-numbered turns, left on even-numbered turns.\n\nOn which turn does he first land on −20?",
        answer: { type: "number", value: 40 },
        solution: [
          "Try small cases: after turns 1, 2, 3, 4, 5, 6 he is at 1, −1, 2, −2, 3, −3.",
          "Pair the turns: (+1 − 2), (+3 − 4), (+5 − 6), … Each pair moves him 1 step left overall.",
          "After an odd turn he is always at a positive number, so −20 must come straight after an even turn.",
          "After turn 2k he is at −k. So he first reaches −20 after turn 40.",
        ],
        commonError: "Answering 20. After 20 turns he has only made 10 pairs of moves, so he is at −10.",
        traps: [
          { spec: { type: "number", value: 20 }, feedback: "After turn 20 he is at −10. Each right-then-left pair of turns only moves him 1 step left." },
          { spec: { type: "number", value: 39 }, feedback: "After turn 39 he is at +20, not −20. Odd turns always leave him on the positive side." },
        ],
        difficulty: "challenge",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Try small cases: write down where he is after each of the first 6 turns.",
          "Look only at where he is after turns 2, 4, 6, … What do you notice?",
          "After turn 2k he is at −k. When is −k equal to −20?",
        ],
        strategy: "Try small cases, then find a pattern",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q18",
        question:
          "Aisha has six number cards:\n\n    −5    −3    −1    2    4    6\n\nShe picks three different cards and multiplies their numbers together. What is the **greatest** possible product, and what is the **least** possible product? Give the greatest first.",
        answer: { type: "list", values: [90, -120], ordered: true, display: "90, then −120" },
        solution: [
          "Greatest: the product must be positive, so use 0 or 2 negative cards.",
          "No negatives: 2 × 4 × 6 = 48. Two negatives: (−5) × (−3) × 6 = 90. So the greatest is 90.",
          "Least: the product must be negative, so use 1 or 3 negative cards.",
          "Three negatives: (−5) × (−3) × (−1) = −15. One negative: (−5) × 4 × 6 = −120. So the least is −120.",
        ],
        commonError: "Choosing the three biggest numbers for the greatest product. Two large negatives multiply to a large positive.",
        traps: [
          { spec: { type: "list", values: [48, -120], ordered: true }, feedback: "Two negatives make a positive: (−5) × (−3) × 6 = 90, which beats 2 × 4 × 6 = 48." },
          { spec: { type: "list", values: [90, -15], ordered: true }, feedback: "Three negatives only give −15. One big negative times two big positives is much lower: (−5) × 4 × 6 = −120." },
        ],
        difficulty: "challenge",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "For a positive product, how many of the three cards can be negative?",
          "Two negatives make a positive. Compare (−5) × (−3) × 6 with 2 × 4 × 6.",
          "For the least product you want a negative answer as far from zero as possible. One negative card, or three?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q19",
        question:
          "How many integers n satisfy **both** of these conditions?\n\n    {{n^2 < 150}}    and    {{n^3 > -50}}",
        answer: { type: "number", value: 16 },
        solution: [
          "{{n^2 < 150}}: {{12^2 = 144}} and {{13^2 = 169}}, so n can be any integer from −12 to 12 (negatives square to positives).",
          "{{n^3 > -50}}: {{(-3)^3 = -27}} is fine, but {{(-4)^3 = -64}} is too small. Every positive n works. So n ≥ −3.",
          "Both conditions: n = −3, −2, −1, 0, 1, 2, …, 12.",
          "That is 3 + 1 + 12 = 16 integers.",
        ],
        commonError: "Forgetting 0 and the negative integers, or forgetting that the cube condition removes −12 to −4.",
        traps: [
          { spec: { type: "number", value: 12 }, feedback: "Don't forget 0 and the negative integers: {{(-2)^2 = 4}} is less than 150 and {{(-2)^3 = -8}} is more than −50." },
          { spec: { type: "number", value: 25 }, feedback: "That counts −12 to 12. But {{(-4)^3 = -64}}, which is less than −50, so the cube condition rules out −12 to −4." },
        ],
        difficulty: "challenge",
        guideRef: "squares-cubes-roots",
        hints: [
          "Deal with one condition at a time. Which integers have a square less than 150? Remember the negative ones.",
          "{{12^2 = 144}} and {{13^2 = 169}}. Now the cube condition: which negative integers have a cube bigger than −50?",
          "{{(-3)^3 = -27}} but {{(-4)^3 = -64}}. Count the integers from −3 up to 12.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "integers-powers-p3-q20",
        question:
          "A legend tells of a king who put rice on a chessboard: 1 grain on square 1, 2 grains on square 2, 4 on square 3, 8 on square 4, doubling every time. So square n holds {{2^(n-1)}} grains, and square 21 holds {{2^20}} grains.\n\nHow many **more** grains are on square 21 than on squares 1 to 20 put together?",
        answer: { type: "number", value: 1 },
        solution: [
          "The numbers are huge, so try small cases: squares 1–2 hold 1 + 2 = 3 and square 3 holds 4.",
          "Squares 1–3 hold 7 and square 4 holds 8. Squares 1–4 hold 15 and square 5 holds 16.",
          "Each time, the next square holds exactly 1 more grain than all the earlier squares together.",
          "Why it continues: if the first k squares hold {{2^k - 1}}, adding square k + 1 (which holds {{2^k}}) gives {{2^k - 1 + 2^k = 2^(k+1) - 1}}, again one less than the next square.",
          "So squares 1–20 hold {{2^20 - 1}} grains and square 21 holds {{2^20}}: exactly 1 more.",
        ],
        solutions: [
          {
            label: "The doubling trick",
            steps: [
              "Let S = 1 + 2 + 4 + … + {{2^19}}.",
              "Then 2S = 2 + 4 + … + {{2^19}} + {{2^20}}.",
              "Subtract: 2S − S = {{2^20}} − 1, because everything else cancels. So S = {{2^20 - 1}}.",
              "Square 21 has {{2^20}}, which is 1 more than S.",
            ],
          },
        ],
        traps: [
          { spec: { type: "number", value: 0 }, feedback: "Very close, but not equal. Check a small case: squares 1–2 hold 3 grains and square 3 holds 4." },
        ],
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "The numbers are far too big to add. Try small cases: compare square 3 with squares 1–2 together.",
          "Squares 1–3 hold 1 + 2 + 4 = 7 and square 4 holds 8. Squares 1–4 hold 15 and square 5 holds 16.",
          "The total of the first few squares is always one less than the next square. Can you see why the pattern keeps going?",
        ],
        strategy: "Try small cases, then find a pattern",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "integers-powers-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "integers-powers-p4-q01",
        question:
          "The number line has a mark at every integer.\n\n(a) Write down the number at P.\n(b) Work out Q − P.\n\nGive your answers to (a) and (b) in order.",
        diagram: `<svg viewBox="0 0 440 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from −8 to 8 with a mark at every integer. Only −8, −4, 0, 4 and 8 are labelled. Point P is 6 marks to the left of 0 and point Q is 5 marks to the right of 0."><rect x="0" y="0" width="440" height="100" fill="#ffffff"/><line x1="14" y1="60" x2="426" y2="60" stroke="#1f2937" stroke-width="2"/><polygon points="8,60 18,55 18,65" fill="#1f2937"/><polygon points="432,60 422,55 422,65" fill="#1f2937"/><g stroke="#1f2937" stroke-width="1.5"><line x1="28" y1="52" x2="28" y2="68"/><line x1="52" y1="55" x2="52" y2="65"/><line x1="76" y1="55" x2="76" y2="65"/><line x1="100" y1="55" x2="100" y2="65"/><line x1="124" y1="52" x2="124" y2="68"/><line x1="148" y1="55" x2="148" y2="65"/><line x1="172" y1="55" x2="172" y2="65"/><line x1="196" y1="55" x2="196" y2="65"/><line x1="220" y1="52" x2="220" y2="68"/><line x1="244" y1="55" x2="244" y2="65"/><line x1="268" y1="55" x2="268" y2="65"/><line x1="292" y1="55" x2="292" y2="65"/><line x1="316" y1="52" x2="316" y2="68"/><line x1="340" y1="55" x2="340" y2="65"/><line x1="364" y1="55" x2="364" y2="65"/><line x1="388" y1="55" x2="388" y2="65"/><line x1="412" y1="52" x2="412" y2="68"/></g><g font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937"><text x="28" y="86">−8</text><text x="124" y="86">−4</text><text x="220" y="86">0</text><text x="316" y="86">4</text><text x="412" y="86">8</text></g><circle cx="76" cy="60" r="5" fill="#c7d2fe" stroke="#334155"/><circle cx="340" cy="60" r="5" fill="#c7d2fe" stroke="#334155"/><line x1="76" y1="24" x2="76" y2="44" stroke="#334155" stroke-width="2"/><polygon points="71,43 81,43 76,51" fill="#334155"/><line x1="340" y1="24" x2="340" y2="44" stroke="#334155" stroke-width="2"/><polygon points="335,43 345,43 340,51" fill="#334155"/><g font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#1f2937"><text x="76" y="18">P</text><text x="340" y="18">Q</text></g></svg>`,
        answer: { type: "list", values: [-6, 11], ordered: true, display: "(a) −6, (b) 11" },
        solution: [
          "Each mark is 1 unit. P is 6 marks to the left of 0, so P = −6. Q is 5 marks to the right of 0, so Q = 5.",
          "Q − P = 5 − (−6) = 5 + 6 = 11.",
          "Check on the line: from −6 to 0 is 6 steps and from 0 to 5 is 5 steps; 6 + 5 = 11.",
        ],
        commonError: "Working out 5 − 6 = −1. Subtracting a negative number adds.",
        traps: [
          { spec: { type: "list", values: [-6, -1], ordered: true }, feedback: "Q − P = 5 − (−6). Subtracting a negative is the same as adding: 5 + 6 = 11." },
          { spec: { type: "list", values: [6, 11], ordered: true }, feedback: "P is to the left of 0, so it is a negative number." },
        ],
        difficulty: "warmup",
        guideRef: "adding-subtracting-negatives",
        hints: ["Count the marks from 0 to P. Which side of 0 is P on?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q02",
        question:
          "Here is part of a multiplication grid.\n\n| × | −4 | A |\n|---|---|---|\n| 3 | −12 | 18 |\n| B | 20 | −30 |\n\nFind the numbers A and B. Give A first, then B.",
        answer: { type: "list", values: [6, -5], ordered: true, display: "A = 6, B = −5" },
        solution: [
          "Row for 3: 3 × A = 18, so A = 18 ÷ 3 = 6.",
          "Column for −4: B × (−4) = 20, so B = 20 ÷ (−4) = −5.",
          "Check the last box: B × A = (−5) × 6 = −30 ✓",
        ],
        commonError: "Writing B = 5. To get a positive answer from × (−4), B must also be negative.",
        traps: [
          { spec: { type: "list", values: [6, 5], ordered: true }, feedback: "B × (−4) = 20. A positive answer from multiplying by a negative needs another negative, so B = −5." },
        ],
        difficulty: "warmup",
        guideRef: "multiplying-dividing-negatives",
        hints: ["Use the row for 3: 3 × A = 18. Then use the column for −4 to find B."],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q03",
        question: "Work out 18 − 12 ÷ (−3).",
        answer: { type: "number", value: 22 },
        solution: ["Division comes before subtraction: 12 ÷ (−3) = −4.", "Then 18 − (−4) = 18 + 4 = 22."],
        commonError: "Working left to right: (18 − 12) ÷ (−3) = −2.",
        traps: [
          { spec: { type: "number", value: -2 }, feedback: "Division comes before subtraction. Work out 12 ÷ (−3) first; don't start with 18 − 12." },
          { spec: { type: "number", value: 14 }, feedback: "12 ÷ (−3) = −4, and 18 − (−4) means 18 + 4." },
        ],
        difficulty: "warmup",
        guideRef: "order-of-operations",
        hints: ["Which comes first, the subtraction or the division?"],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q04",
        question: "Work out {{(-3)^2 + (-2)^3}}.",
        answer: { type: "number", value: 1 },
        solution: [
          "{{(-3)^2 = (-3) * (-3) = 9}} (two negatives make a positive).",
          "{{(-2)^3 = (-2) * (-2) * (-2) = -8}} (three negatives make a negative).",
          "9 + (−8) = 1.",
        ],
        commonError: "Making both powers positive. An odd power of a negative number stays negative.",
        traps: [
          { spec: { type: "number", value: 17 }, feedback: "{{(-2)^3}} = (−2) × (−2) × (−2) = −8. Three negatives multiply to a negative." },
          { spec: { type: "number", value: -17 }, feedback: "{{(-3)^2}} = (−3) × (−3) = +9. Two negatives multiply to a positive." },
        ],
        difficulty: "warmup",
        guideRef: "squares-cubes-roots",
        hints: ["Write each power out as a multiplication, for example {{(-3)^2 = (-3) * (-3)}}."],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q05",
        question: "Which is bigger, {{2^5}} or {{5^2}}? Work out the difference between them (bigger minus smaller).",
        answer: { type: "number", value: 7 },
        solution: ["{{2^5}} = 2 × 2 × 2 × 2 × 2 = 32.", "{{5^2}} = 5 × 5 = 25.", "{{2^5}} is bigger, by 32 − 25 = 7."],
        commonError: "Treating {{2^5}} as 2 × 5 = 10 and {{5^2}} as 5 × 2 = 10.",
        traps: [
          { spec: { type: "number", value: 0 }, feedback: "{{2^5}} is not 2 × 5. It means 2 × 2 × 2 × 2 × 2 = 32, and {{5^2}} = 5 × 5 = 25." },
          { spec: { type: "number", value: -7 }, feedback: "Bigger minus smaller: {{2^5}} = 32 is the bigger one." },
        ],
        difficulty: "warmup",
        guideRef: "index-laws",
        hints: ["Write each one out as repeated multiplication."],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q06",
        question:
          "The diagram shows how the number families fit inside one another. The regions are numbered 1 to 4.\n\nHow many of these numbers belong in **region 3**?\n\n{{-20/4}},   0.6,   {{sqrt(49)}},   −2.5,   {{sqrt(5)}},   0,   {{22/7}}",
        diagram: `<svg viewBox="0 0 420 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nested sets diagram. A rectangle labelled Real numbers contains an oval labelled Rational numbers, which contains an oval labelled Integers, which contains an oval labelled Natural numbers. Region 1 is inside Natural numbers. Region 2 is inside Integers but outside Natural numbers. Region 3 is inside Rational numbers but outside Integers. Region 4 is inside the rectangle but outside Rational numbers."><rect x="0" y="0" width="420" height="240" fill="#ffffff"/><rect x="6" y="6" width="408" height="228" rx="12" fill="#ffffff" stroke="#334155" stroke-width="2"/><text x="16" y="26" font-family="sans-serif" font-size="13" font-weight="bold" fill="#1f2937">Real numbers</text><ellipse cx="190" cy="125" rx="170" ry="100" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><text x="190" y="47" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Rational numbers</text><ellipse cx="180" cy="140" rx="115" ry="70" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="180" y="92" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">Integers</text><ellipse cx="180" cy="160" rx="58" ry="38" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="180" y="146" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Natural</text><text x="180" y="160" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">numbers</text><g fill="#ffffff" stroke="#334155" stroke-width="1.5"><circle cx="180" cy="181" r="10"/><circle cx="100" cy="146" r="10"/><circle cx="325" cy="121" r="10"/><circle cx="390" cy="206" r="10"/></g><g font-family="sans-serif" font-size="13" font-weight="bold" text-anchor="middle" fill="#1f2937"><text x="180" y="186">1</text><text x="100" y="151">2</text><text x="325" y="126">3</text><text x="390" y="211">4</text></g></svg>`,
        answer: { type: "number", value: 3 },
        solution: [
          "Region 3 holds rational numbers that are not integers.",
          "Simplify the numbers in disguise: {{-20/4 = -5}} (an integer, region 2) and {{sqrt(49) = 7}} (a natural number, region 1). 0 is an integer, so it is not in region 3 either.",
          "{{sqrt(5)}} is irrational because 5 is not a square number, so it goes in region 4.",
          "0.6 = {{3/5}}, −2.5 = {{-5/2}} and {{22/7}} are fractions of integers but not whole numbers: region 3.",
          "So 3 of the numbers belong in region 3.",
        ],
        commonError: "Putting {{22/7}} outside the rational numbers because it is close to π. It is a fraction of two integers, so it is rational.",
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "{{22/7}} is a fraction of two integers, so it is rational and not an integer: region 3. It is only an *approximation* to π." },
          { spec: { type: "number", value: 4 }, feedback: "Check {{-20/4}}, which simplifies to −5 (an integer), and {{sqrt(5)}}, which is irrational (region 4)." },
        ],
        difficulty: "core",
        guideRef: "types-of-number",
        hints: [
          "Region 3 is inside 'Rational numbers' but outside 'Integers'. What kind of number lives there?",
          "Simplify the numbers in disguise first: {{-20/4}} and {{sqrt(49)}}.",
          "Which numbers can be written as a fraction of two integers but are not whole numbers?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q07",
        question:
          "The table shows the lowest temperature in five cities on one day in January.\n\n| City | Lowest temperature (°C) |\n|---|---|\n| Harbin | −23 |\n| Moscow | −9 |\n| Oslo | −14 |\n| Singapore | 24 |\n| Tokyo | 2 |\n\nWork out (a) the range of these temperatures and (b) the mean temperature. Give the range first, then the mean, in °C.",
        answer: { type: "list", values: [47, -4], ordered: true, display: "(a) 47 °C, (b) −4 °C" },
        solution: [
          "Highest: 24 °C (Singapore). Lowest: −23 °C (Harbin).",
          "Range = 24 − (−23) = 24 + 23 = 47 °C.",
          "Total = −23 + (−9) + (−14) + 24 + 2 = −46 + 26 = −20.",
          "Mean = −20 ÷ 5 = −4 °C.",
        ],
        commonError: "Working out the range as 24 − 23 = 1. The lowest value is −23, and subtracting a negative adds.",
        traps: [
          { spec: { type: "list", values: [1, -4], ordered: true }, feedback: "Range = highest − lowest = 24 − (−23) = 24 + 23 = 47." },
          { spec: { type: "list", values: [47, -20], ordered: true }, feedback: "−20 is the total. For the mean, divide the total by the number of cities, 5." },
        ],
        difficulty: "core",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "Range = highest − lowest. Which temperature is the lowest?",
          "24 − (−23): subtracting a negative adds.",
          "For the mean, add all five temperatures (watch the signs), then divide by 5.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q08",
        question:
          "A research submersible starts at the sea surface (0 m) and descends at a steady rate. After 12 minutes its height relative to the surface is −84 m.\n\n(a) What is its change in height each minute?\n(b) At the same rate, how many minutes after starting will it be at −119 m?\n\nGive your answers to (a) and (b) in order.",
        answer: { type: "list", values: [-7, 17], ordered: true, display: "(a) −7 m, (b) 17 minutes" },
        solution: [
          "(a) Change per minute = −84 ÷ 12 = −7 m.",
          "(b) Number of minutes = −119 ÷ (−7) = 17 (negative ÷ negative is positive).",
          "Check: 17 × (−7) = −119 ✓",
        ],
        commonError: "Giving the rate as +7. The submersible goes down, so its height changes by a negative amount each minute.",
        traps: [
          { spec: { type: "list", values: [7, 17], ordered: true }, feedback: "It is going *down*, so the change each minute is negative: −84 ÷ 12 = −7." },
          { spec: { type: "list", values: [-7, -17], ordered: true }, feedback: "A time can't be negative: −119 ÷ (−7) = +17, because two negatives make a positive." },
        ],
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "Change per minute = total change ÷ number of minutes.",
          "−84 ÷ 12: a negative divided by a positive gives what sign?",
          "For (b): how many lots of −7 make −119?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "written",
        id: "integers-powers-p4-q09",
        question:
          "Zara and Ethan both work out {{-3^2}}.\n\nZara says the answer is 9, \"because a negative times a negative is a positive.\"\nEthan's calculator shows −9.\n\nWho is right? Explain, and show how Zara should write the calculation if she means 'negative three, squared'.",
        marks: 3,
        modelAnswer:
          "Ethan's calculator is right: {{-3^2 = -9}}. Indices come before the minus sign, so only the 3 is squared: {{-3^2 = -(3^2) = -(3 * 3) = -9}}. Zara's reasoning is about {{(-3)^2 = (-3) * (-3) = 9}}, where the brackets make the whole of −3 the base. If she means 'negative three, squared' she must write the brackets: {{(-3)^2}} = 9.",
        markScheme: [
          { point: "States that {{-3^2}} = −9, so Ethan (the calculator) is right", keywords: ["-9", "−9", "ethan", "calculator"] },
          { point: "Explains that the index applies only to the 3 (indices are done before the minus sign)", keywords: ["only the 3", "indices", "order of operations", "-(3", "−(3", "before"] },
          { point: "Gives {{(-3)^2}} = 9, with brackets, as what Zara meant", keywords: ["brackets", "(-3)", "(−3)", "= 9"] },
        ],
        commonError: "Thinking {{-3^2}} and {{(-3)^2}} mean the same thing. Without brackets, only the 3 is squared.",
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "In {{-3^2}}, what exactly is being squared: 3, or −3?",
          "In the order of operations, indices come before the minus sign is applied.",
          "Compare with {{(-3)^2}}. What do the brackets change?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q10",
        question:
          "(a) Work out {{(-2)^4}}.\n(b) Hence work out {{3 - 2 * (-2)^4 ÷ 8}}.\n\nGive your answers to (a) and (b) in order.",
        answer: { type: "list", values: [16, -1], ordered: true, display: "(a) 16, (b) −1" },
        solution: [
          "(a) {{(-2)^4}} = (−2) × (−2) × (−2) × (−2) = 16 (an even number of negatives gives a positive).",
          "(b) Use (a): {{3 - 2 * 16 ÷ 8}}.",
          "× and ÷ next, left to right: 2 × 16 = 32, then 32 ÷ 8 = 4.",
          "Finally 3 − 4 = −1.",
        ],
        commonError: "Working left to right: 3 − 2 = 1, then 1 × 16 ÷ 8 = 2.",
        traps: [
          { spec: { type: "list", values: [16, 2], ordered: true }, feedback: "You worked left to right. × and ÷ come before −, so 2 × 16 ÷ 8 = 4 first, then 3 − 4." },
          { spec: { type: "list", values: [-16, 7], ordered: true }, feedback: "{{(-2)^4}}: four negatives multiply to a positive, so it is 16, not −16." },
        ],
        difficulty: "core",
        guideRef: "order-of-operations",
        hints: [
          "(a) Does an even number of negatives multiply to a positive or a negative?",
          "(b) Order: the power first, then × and ÷ from left to right, then −.",
          "2 × 16 ÷ 8 = 4. Now work out 3 − 4.",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "written",
        id: "integers-powers-p4-q11",
        question:
          "Jun works out −589 ÷ 31 × (−4) and gets −7.6.\n\nWithout working out the exact answer, use the sign rules and an estimate to explain why Jun's answer cannot be right.",
        marks: 3,
        modelAnswer:
          "The sign is wrong: −589 ÷ 31 is negative, and a negative × (−4) is positive, so the answer must be positive. The size is wrong too: −589 ÷ 31 ≈ −600 ÷ 30 = −20, and −20 × (−4) = 80. So the answer should be about +80, not about −8. (The exact answer is 76.)",
        markScheme: [
          { point: "Sign: there are two negative numbers, −589 and −4, so the answer must be positive", keywords: ["positive", "two negatives", "sign"] },
          { point: "Estimates −589 ÷ 31 ≈ −600 ÷ 30 = −20 (or similar rounding)", keywords: ["600", "30", "-20", "−20", "20"] },
          { point: "Estimate × (−4) gives about 80, so Jun's answer is far too small", keywords: ["80", "too small", "size", "76"] },
        ],
        commonError: "Checking only the sign, or only the size. A good check looks at both.",
        difficulty: "core",
        guideRef: "multiplying-dividing-negatives",
        hints: [
          "First think only about the signs. How many negative numbers are in the calculation?",
          "Round to 1 significant figure: −589 ≈ −600 and 31 ≈ 30.",
          "Work out −600 ÷ 30 × (−4) and compare it with −7.6.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q12",
        question: "{{y^2 = 49}} and {{z^3 = -27}}.\n\nFind the **greatest** possible value of {{y - z}}.",
        answer: { type: "number", value: 10 },
        solution: [
          "{{y^2 = 49}}, so y = 7 or y = −7.",
          "{{z^3 = -27}}, so z = −3. There is only one cube root: (−3) × (−3) × (−3) = −27.",
          "y − z = 7 − (−3) = 10, or y − z = −7 − (−3) = −4.",
          "The greatest possible value is 10.",
        ],
        commonError: "Taking {{cbrt(-27)}} as 3. The cube root of a negative number is negative.",
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "{{cbrt(-27)}} is −3, not 3, because (−3) × (−3) × (−3) = −27. So y − z = 7 − (−3)." },
          { spec: { type: "number", value: -4 }, feedback: "That uses y = −7. But y could also be 7, which gives a bigger answer." },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "How many values can y have? How many can z have?",
          "y = 7 or −7. The cube root of a negative number is negative, so what is z?",
          "Try each value of y with z = −3 and choose the bigger result.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q13",
        question: "A solid cube has a volume of 216 000 cm³.\n\nWork out its total surface area. Give your answer in cm².",
        answer: { type: "number", value: 21600, display: "21 600 cm²" },
        solution: [
          "Edge length = {{cbrt(216000)}}. Since 216 000 = 216 × 1000, the edge is 6 × 10 = 60 cm.",
          "Check: 60 × 60 × 60 = 216 000 ✓",
          "One face: 60 × 60 = 3600 cm².",
          "Six faces: 6 × 3600 = 21 600 cm².",
        ],
        commonError: "Stopping at the area of one face. A cube has 6 faces.",
        traps: [
          { spec: { type: "number", value: 3600 }, feedback: "3600 cm² is one face. A cube has 6 identical faces." },
          { spec: { type: "number", value: 360 }, feedback: "One face is 60 × 60 = 3600 cm², not 60 × 6. Then multiply by the 6 faces." },
        ],
        difficulty: "core",
        guideRef: "squares-cubes-roots",
        hints: [
          "Find the edge length first: which number cubed gives 216 000?",
          "216 000 = 216 × 1000, and {{cbrt(216) = 6}}, {{cbrt(1000) = 10}}.",
          "With an edge of 60 cm, find the area of one face, then multiply by the number of faces.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q14",
        question:
          "A rectangle has area {{24p^7 q^3}} cm² and width {{6p^2 q}} cm.\n\nFind an expression for its length. Simplify your answer fully.",
        answer: { type: "expression", expr: "4p^5q^2", form: "simplified", display: "{{4p^5 q^2}} cm" },
        solution: [
          "Length = area ÷ width = {{(24p^7 q^3)/(6p^2 q)}}.",
          "Numbers: 24 ÷ 6 = 4.",
          "{{p^7 ÷ p^2 = p^5}} and {{q^3 ÷ q^1 = q^2}}.",
          "Length = {{4p^5 q^2}} cm.",
          "Check: {{6p^2 q * 4p^5 q^2 = 24p^7 q^3}} ✓",
        ],
        commonError: "Forgetting that {{q}} means {{q^1}}, and leaving {{q^3}} unchanged.",
        traps: [
          { spec: { type: "expression", expr: "4p^5q^3" }, feedback: "{{q}} on its own is {{q^1}}, so {{q^3 ÷ q = q^2}}." },
          { spec: { type: "expression", expr: "18p^5q^2" }, feedback: "Divide the numbers: 24 ÷ 6 = 4. Don't subtract them." },
        ],
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Length = area ÷ width.",
          "Divide the numbers, then deal with each letter separately.",
          "{{p^7 ÷ p^2}}: subtract the indices. And {{q^3 ÷ q^1}}.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "integers-powers-p4-q15",
        question:
          "Ravi says: \"{{3^4 * 2^3 = 6^7}}, because you multiply the bases and add the powers.\"\n\nIs Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong. The rule 'add the indices' only works when the bases are the same, for example {{3^4 * 3^3 = 3^7}}. Here the bases, 3 and 2, are different. Working it out: {{3^4 * 2^3 = 81 * 8 = 648}}, but {{6^7}} = 279 936, which is far bigger. (In factors: the left side is four 3s and three 2s multiplied together, but {{6^7}} would need seven 3s and seven 2s.)",
        markScheme: [
          { point: "States that Ravi is wrong", keywords: ["wrong", "no", "not right", "incorrect"] },
          { point: "Explains that the index law only applies when the bases are the same", keywords: ["same base", "different bases", "different base", "same number"] },
          { point: "Shows it numerically: {{3^4 * 2^3}} = 648 but {{6^7}} = 279 936 (or another valid check)", keywords: ["648", "81", "279936", "279 936"] },
        ],
        commonError: "Saying he should have multiplied the indices instead. No index law combines powers with different bases.",
        difficulty: "core",
        guideRef: "index-laws",
        hints: [
          "Test Ravi's claim by working out both sides.",
          "{{3^4 = 81}} and {{2^3 = 8}}. Is {{6^7}} anywhere near 81 × 8?",
          "When does 'add the indices' actually work?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q16",
        question:
          "(a) Write {{1/8}} as a power of 2.\n(b) Hence find x when {{2^x = 1/8 * 2^10}}.\n\nGive the index from (a) first, then x.",
        answer: { type: "list", values: [-3, 7], ordered: true, display: "(a) {{2^(-3)}}, (b) x = 7" },
        solution: [
          "(a) {{8 = 2^3}}, so {{1/8 = 1/2^3 = 2^(-3)}}. The index is −3.",
          "(b) {{2^x = 2^(-3) * 2^10 = 2^(-3 + 10) = 2^7}}, so x = 7.",
          "Check: {{2^10}} = 1024 and 1024 ÷ 8 = 128 = {{2^7}} ✓",
        ],
        commonError: "Writing {{1/8 = 2^3}}. A number less than 1 needs a negative index.",
        traps: [
          { spec: { type: "list", values: [3, 7], ordered: true }, feedback: "{{1/8}} is less than 1, so its index is negative: {{1/8 = 1/2^3 = 2^(-3)}}." },
          { spec: { type: "list", values: [-3, 13], ordered: true }, feedback: "Add the indices carefully: −3 + 10 = 7, not 13." },
        ],
        difficulty: "core",
        guideRef: "negative-indices",
        hints: [
          "{{8 = 2^3}}. What does a negative index mean?",
          "{{1/2^3 = 2^(-3)}}.",
          "So {{2^x = 2^(-3) * 2^10}}. Add the indices.",
        ],
        strategy: "Use the index laws",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q17",
        question:
          "In a magic square, every row, every column and both diagonals add up to the same total. Some of the numbers in this magic square are shown.\n\nFind the number that goes in the square marked **?**.",
        diagram: `<svg viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 3 by 3 magic square. Top row: blank, 0, blank. Middle row: blank, −2, −6. Bottom row: a question mark, blank, 1."><rect x="0" y="0" width="140" height="140" fill="#ffffff"/><rect x="10" y="90" width="40" height="40" fill="#fde68a"/><g fill="none" stroke="#1f2937" stroke-width="1.5"><rect x="10" y="10" width="120" height="120"/><line x1="50" y1="10" x2="50" y2="130"/><line x1="90" y1="10" x2="90" y2="130"/><line x1="10" y1="50" x2="130" y2="50"/><line x1="10" y1="90" x2="130" y2="90"/></g><g font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937"><text x="70" y="35">0</text><text x="70" y="75">−2</text><text x="110" y="75">−6</text><text x="110" y="115">1</text><text x="30" y="115" font-weight="bold">?</text></g></svg>`,
        answer: { type: "number", value: -3 },
        solution: [
          "Call the magic total S.",
          "Diagonal from top-left: top-left + (−2) + 1 = S, so top-left = S + 1.",
          "Top row: (S + 1) + 0 + top-right = S, so top-right = −1.",
          "Right-hand column: −1 + (−6) + 1 = −6, so S = −6.",
          "Other diagonal: −1 + (−2) + ? = −6, so ? = −3.",
          "The full square is −5, 0, −1 / 2, −2, −6 / −3, −4, 1, and every line adds to −6 ✓",
        ],
        commonError: "Assuming the magic total is 0. You have to work it out from the numbers you are given.",
        traps: [
          { spec: { type: "number", value: 3 }, feedback: "Check with the diagonal through the top-right corner: −1 + (−2) + ? must equal −6." },
        ],
        difficulty: "challenge",
        guideRef: "adding-subtracting-negatives",
        hints: [
          "You don't know the magic total yet. Call it S and look for lines you can write equations for.",
          "The diagonal through −2 and 1 tells you the top-left number is S + 1. Now use the top row: (S + 1) + 0 + top-right = S.",
          "That gives top-right = −1. Then the right-hand column, −1 + (−6) + 1, tells you S.",
          "S = −6. Now use the other diagonal, which runs through the top-right corner, the centre and the square marked ?.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q18",
        question:
          "How many integers from −100 to 100 (inclusive) are **both** a square number **and** a cube number?\n\n(Here a square number is the square of an integer, such as {{(-4)^2 = 16}}, and a cube number is the cube of an integer, such as {{(-2)^3 = -8}}.)",
        answer: { type: "number", value: 3 },
        solution: [
          "A square is never negative, because {{(-a)^2 = a^2}}. So only 0 to 100 matters.",
          "Cubes from 0 to 100: 0, 1, 8, 27, 64.",
          "Which of these are also squares? {{0 = 0^2}}, {{1 = 1^2}} and {{64 = 8^2}}. 8 and 27 are not squares.",
          "So there are 3 such integers: 0, 1 and 64. (They are the sixth powers {{0^6}}, {{1^6}} and {{2^6}}.)",
        ],
        commonError: "Forgetting the smallest cases, 0 and 1, or counting negative cubes, which can never be squares.",
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "Check the smallest cases: {{0 = 0^2 = 0^3}} and {{1 = 1^2 = 1^3}} both count, and so does 64." },
          { spec: { type: "number", value: 5 }, feedback: "Negative numbers can't be squares (a square is never negative), so −1 and −64 don't count." },
        ],
        difficulty: "challenge",
        guideRef: "squares-cubes-roots",
        hints: [
          "Can a square number ever be negative? Which part of the range can you ignore?",
          "List the cube numbers from 0 to 100. Which of them are also squares?",
          "Don't forget the smallest cases, 0 and 1.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "written",
        id: "integers-powers-p4-q19",
        question:
          "Wei Ling says: \"{{2^100}} is smaller than {{10^30}}.\"\n\nWithout a calculator, show whether she is right. You may use the fact that {{2^10 = 1024}}.",
        marks: 3,
        modelAnswer:
          "She is wrong. {{2^10 = 1024}}, which is more than {{1000 = 10^3}}. Using the power of a power law, {{2^100 = (2^10)^10}}, which is ten lots of 1024 multiplied together, and {{10^30 = (10^3)^10}}, which is ten lots of 1000 multiplied together. Each 1024 is bigger than the matching 1000, so {{2^100 > 10^30}}.",
        markScheme: [
          { point: "Compares {{2^10 = 1024}} with {{10^3 = 1000}}", keywords: ["1024", "1000", "10^3"] },
          { point: "Writes {{2^100 = (2^10)^10}} and {{10^30 = (10^3)^10}} (power of a power)", keywords: ["(2^10)^10", "(10^3)^10", "power of a power", "ten lots", "10 times"] },
          { point: "Concludes that {{2^100}} is bigger, so Wei Ling is wrong", keywords: ["wrong", "bigger", "greater", "larger", "not right"] },
        ],
        commonError: "Comparing only the indices (100 > 30) or only the bases (2 < 10). You have to compare like with like.",
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "{{2^100}} is far too big to work out. Can you build it from {{2^10}}?",
          "{{2^100 = (2^10)^10}}. Can you write {{10^30}} in the same way, as something to the power 10?",
          "{{10^30 = (10^3)^10}}. Now compare 1024 with 1000.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "integers-powers-p4-q20",
        question: "Find the value of x if {{5^(x+1) - 5^x = 500}}.",
        answer: { type: "number", value: 3 },
        solution: [
          "{{5^(x+1) = 5 * 5^x}}.",
          "So {{5^(x+1) - 5^x = 5 * 5^x - 1 * 5^x = 4 * 5^x}}.",
          "{{4 * 5^x = 500}}, so {{5^x = 125 = 5^3}}.",
          "x = 3. Check: {{5^4 - 5^3 = 625 - 125 = 500}} ✓",
        ],
        solutions: [
          {
            label: "Trial and improvement",
            steps: [
              "x = 1: 25 − 5 = 20. x = 2: 125 − 25 = 100. x = 3: 625 − 125 = 500 ✓",
              "Quick here, but the factorising method still works when the numbers are far too big to try.",
            ],
          },
        ],
        commonError: "Subtracting the indices: {{5^(x+1) - 5^x}} is not {{5^1}}. The index laws are for multiplying and dividing, not subtracting.",
        traps: [
          { spec: { type: "number", value: 1 }, feedback: "{{5^(x+1) - 5^x}} is not {{5^1}}: there is no index law for subtracting powers. Try writing {{5^(x+1)}} as {{5 * 5^x}}." },
          { spec: { type: "number", value: 4 }, feedback: "Check: {{5^5 - 5^4 = 3125 - 625 = 2500}}, which is too big." },
        ],
        difficulty: "challenge",
        guideRef: "index-laws",
        hints: [
          "Try small cases: work out {{5^(x+1) - 5^x}} for x = 1 and x = 2.",
          "{{5^(x+1)}} is 5 lots of {{5^x}}. So {{5^(x+1) - 5^x}} is how many lots of {{5^x}}?",
          "{{4 * 5^x = 500}}, so what is {{5^x}}?",
        ],
        strategy: "Look for a common factor",
      },
    ],
  },
];
