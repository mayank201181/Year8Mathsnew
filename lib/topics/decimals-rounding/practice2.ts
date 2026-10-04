import type { Paper } from "../../types.ts";

// Practice Papers 3 and 4 for Decimals, Rounding & Estimation.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, tables/diagrams and reasoning.

export const morePapers: Paper[] = [
  {
    id: "decimals-rounding-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "decimals-rounding-p3-q01",
        question:
          "Bubble tea costs $3.60 a cup. Wei Ling buys 7 cups for her CCA group. How much does she pay altogether? Give your answer in dollars.",
        answer: { type: "number", value: 25.2, display: "$25.20" },
        solution: [
          "Estimate first: about 4 × 7 = $28, so the answer is in the twenties.",
          "Ignore the decimal point: 36 × 7 = 252.",
          "3.6 has one decimal place, so the answer has one decimal place: 25.2.",
          "She pays $25.20.",
        ],
        traps: [
          {
            spec: { type: "number", value: 252 },
            feedback: "That's 36 × 7 — the decimal point has gone missing. An estimate of 4 × 7 = 28 says the answer is about $28.",
          },
          {
            spec: { type: "number", value: 2.52 },
            feedback: "Too small: 7 cups at nearly $4 each must cost about $28. Check where the decimal point goes.",
          },
        ],
        commonError: "Writing 252 or 2.52. A quick estimate (about $28) shows where the point belongs.",
        difficulty: "warmup",
        guideRef: "multiplying-decimals",
        hints: ["Work out 36 × 7 first, then use an estimate to place the decimal point."],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q02",
        question:
          "A 1.5 litre carton of soya bean milk is poured into small cups that each hold 0.25 litres. How many cups can be filled?",
        answer: { type: "number", value: 6 },
        solution: [
          "Number of cups = 1.5 ÷ 0.25.",
          "Multiply both numbers by 100 so the divisor is a whole number: 150 ÷ 25.",
          "150 ÷ 25 = 6.",
          "Check: 6 × 0.25 = 1.5 ✓",
        ],
        solutions: [
          {
            label: "Think in quarters",
            steps: ["0.25 litres is a quarter of a litre, so 1 litre fills 4 cups.", "1.5 litres fills 1.5 × 4 = 6 cups."],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 0.375 },
            feedback: "That's 1.5 × 0.25. You want to know how many 0.25s fit into 1.5, so divide.",
          },
          {
            spec: { type: "number", value: 0.6 },
            feedback: "Scale both numbers by the same amount: 1.5 ÷ 0.25 = 150 ÷ 25, not 15 ÷ 25.",
          },
        ],
        difficulty: "warmup",
        guideRef: "dividing-decimals",
        hints: ["How many quarter-litre cups does one litre fill?"],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q03",
        question:
          "A stopwatch app records Siti's 50 m freestyle time as 38.6749 seconds. The scoreboard shows times correct to 2 decimal places. What time does the scoreboard show? Give your answer in seconds.",
        answer: { type: "number", value: 38.67, allowFraction: false },
        solution: [
          "The second decimal place holds the 7: 38.67|49.",
          "The digit straight after it is 4, which is less than 5, so the 7 stays as it is.",
          "The scoreboard shows 38.67 s.",
        ],
        commonError:
          "Rounding in stages: 38.6749 → 38.675 → 38.68. Round the original number once, looking only at the digit straight after the last one you keep.",
        difficulty: "warmup",
        guideRef: "decimal-places",
        hints: ["Find the digit in the second decimal place. Which single digit decides whether it changes?"],
        strategy: "Look at the next digit",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q04",
        question:
          "At Sports Day the long-jump results are:\n\n| Athlete | Distance |\n|---|---|\n| Aisha | 3.08 m |\n| Mei | 3.8 m |\n| Zara | 3.75 m |\n| Hana | 3.085 m |\n\nThe furthest jump wins gold. What distance won the **silver** medal (second place)? Give your answer in metres.",
        answer: { type: "number", value: 3.75, display: "3.75 m (Zara)" },
        solution: [
          "Pad every distance to 3 decimal places: 3.080, 3.800, 3.750, 3.085.",
          "Compare as thousandths: 3800 > 3750 > 3085 > 3080.",
          "Gold is Mei (3.8 m), silver is Zara with 3.75 m.",
        ],
        traps: [
          {
            spec: { type: "number", value: 3.085 },
            feedback: "More digits doesn't mean bigger. Pad to 3 decimal places: 3.085 has only 0 tenths, while 3.750 has 7 tenths.",
          },
          {
            spec: { type: "number", value: 3.8 },
            feedback: "3.8 = 3.800 is the longest jump — that's the gold medal. Which is next?",
          },
        ],
        difficulty: "warmup",
        guideRef: "ordering-and-shortcuts",
        hints: ["Write every distance with 3 decimal places (fill gaps with zeros), then compare."],
        strategy: "Pad with zeros",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q05",
        question:
          "A drinks stall sold 48,672 cups of teh tarik during a food festival. A newspaper headline gives this number correct to 2 significant figures. What number appears in the headline?",
        answer: { type: "number", value: 49000, display: "49,000" },
        solution: [
          "The first significant figure is the 4 (ten-thousands) and the second is the 8 (thousands).",
          "The next digit is 6, which is 5 or more, so the 8 rounds up to 9.",
          "Fill the remaining places with zeros to keep the size: 49,000.",
        ],
        traps: [
          {
            spec: { type: "number", value: 49 },
            feedback: "Keep the size of the number: 48,672 is nearly fifty thousand, so zeros must hold the places — 49,000.",
          },
          {
            spec: { type: "number", value: 48000 },
            feedback: "That's chopping, not rounding. The digit after the 8 is a 6, so round the 8 up.",
          },
        ],
        difficulty: "warmup",
        guideRef: "significant-figures",
        hints: ["Underline the first two significant figures (4 and 8). What digit comes straight after them?"],
        strategy: "Look at the next digit",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q06",
        question:
          "A school orders 412 workbooks at $7.85 each. Estimate the total cost by rounding each number to 1 significant figure.",
        answer: { type: "number", value: 3200, display: "$3200" },
        solution: [
          "412 to 1 s.f. is 400 (the next digit, 1, rounds down).",
          "7.85 to 1 s.f. is 8 (the next digit, 8, rounds up).",
          "400 × 8 = 3200, so the estimate is $3200.",
          "(The exact cost is $3234.20, so the estimate is very close.)",
        ],
        traps: [
          {
            spec: { type: "number", value: 2800 },
            feedback: "7.85 to 1 significant figure is 8, not 7: the next digit is 8, so round up.",
          },
          {
            spec: { type: "number", value: 320 },
            feedback: "Check the size: 400 books at about $8 each is 4 × 8 hundreds of dollars.",
          },
        ],
        commonError: "Chopping 7.85 to 7 instead of rounding it to 8.",
        difficulty: "core",
        guideRef: "estimation",
        hints: [
          "Round 412 to 1 significant figure. Which digit is the first significant figure?",
          "412 ≈ 400 and 7.85 ≈ 8.",
          "400 × 8 = 4 × 8 × 100.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q07",
        question:
          "A classroom floor is a rectangle 7.5 m long and 6.4 m wide. Vinyl flooring costs $12.80 per square metre. How much does it cost to cover the whole floor? Give your answer in dollars.",
        answer: { type: "number", value: 614.4, display: "$614.40" },
        solution: [
          "Area = 7.5 × 6.4. Work out 75 × 64 = 4800; there are 2 decimal places in total, so the area is 48.00 = 48 m².",
          "Cost = 48 × 12.80.",
          "48 × 12.8 = 50 × 12.8 − 2 × 12.8 = 640 − 25.6 = 614.4.",
          "It costs $614.40.",
        ],
        solutions: [
          {
            label: "Halve and double for the area",
            steps: ["7.5 × 6.4 = 15 × 3.2 (double one number, halve the other).", "15 × 3.2 = 48 m², then 48 × 12.80 = $614.40 as before."],
          },
        ],
        traps: [
          { spec: { type: "number", value: 48 }, feedback: "48 m² is the area. Now multiply by the price of each square metre." },
          {
            spec: { type: "number", value: 355.84 },
            feedback: "You used the perimeter (27.8 m). Flooring covers the area, so multiply length by width.",
          },
        ],
        commonError: "Using the perimeter instead of the area, or stopping after finding the area.",
        difficulty: "core",
        guideRef: "multiplying-decimals",
        hints: [
          "What do you need to know about the floor before you can find the cost?",
          "Area = 7.5 × 6.4. Try 75 × 64, then place the decimal point.",
          "The area is 48 m². Now work out 48 × 12.80.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "written",
        id: "decimals-rounding-p3-q08",
        question:
          "At a school fair, 54.6 litres of chrysanthemum tea is poured into cups that each hold 0.21 litres. Jun uses a calculator to work out how many cups can be filled and writes down **26**.\n\n(a) Without working out the exact answer, use an estimate to show that Jun's answer cannot be right.\n\n(b) Suggest what Jun probably did wrong, and give the correct number of cups.",
        marks: 3,
        modelAnswer:
          "(a) Round to 1 significant figure: 54.6 ≈ 50 and 0.21 ≈ 0.2. There are five 0.2s in every 1, so 50 ÷ 0.2 = 250. The answer should be roughly 250, not 26. Also, dividing by a number less than 1 must give an answer **bigger** than 54.6, so 26 is far too small.\n\n(b) 26 is about 10 times too small, so he probably typed 2.1 instead of 0.21 (54.6 ÷ 2.1 = 26). The correct answer is 54.6 ÷ 0.21 = 5460 ÷ 21 = 260 cups.",
        markScheme: [
          { point: "Estimate of about 250 (e.g. 50 ÷ 0.2)", keywords: ["250", "50 ÷ 0.2", "50/0.2", "500 ÷ 2", "0.2"] },
          {
            point: "Explains that dividing by a number less than 1 gives a bigger answer, so 26 is too small",
            keywords: ["less than 1", "bigger", "larger", "too small", "more than 54.6"],
          },
          { point: "Correct answer 260 cups (error was a factor of 10, e.g. typing 2.1)", keywords: ["260", "2.1", "10 times", "factor of 10"] },
        ],
        commonError: "Saying '26 looks wrong' without giving an estimate or a reason.",
        difficulty: "core",
        guideRef: "dividing-decimals",
        hints: [
          "Round 54.6 and 0.21 to 1 significant figure.",
          "How many 0.2s make 1? So how many 0.2s make 50?",
          "50 ÷ 0.2 = 250. How does that compare with 26?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q09",
        question:
          "Ravi's walking stride is 0.85 m long. How many strides does he take to walk 1.7 km along a park connector?",
        answer: { type: "number", value: 2000 },
        solution: [
          "Use the same units: 1.7 km = 1700 m.",
          "Number of strides = 1700 ÷ 0.85.",
          "Multiply both by 100: 170000 ÷ 85 = 2000.",
          "Check: 2000 × 0.85 = 1700 ✓",
        ],
        solutions: [
          {
            label: "Spot the link",
            steps: ["0.85 × 2 = 1.7, so 1.7 m takes 2 strides.", "1.7 km is 1000 times as far, so 2 × 1000 = 2000 strides."],
          },
        ],
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "2 strides only covers 1.7 m. Change 1.7 km into metres first." },
          { spec: { type: "number", value: 0.5 }, feedback: "That's 0.85 ÷ 1.7 — the division is upside down." },
        ],
        commonError: "Dividing 1.7 by 0.85 without changing kilometres into metres.",
        difficulty: "core",
        guideRef: "dividing-decimals",
        hints: [
          "Are the two lengths in the same units?",
          "1.7 km = 1700 m. Now work out 1700 ÷ 0.85.",
          "Multiply both numbers by 100 to make the divisor whole: 170000 ÷ 85.",
        ],
        strategy: "Same units first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q10",
        question:
          "A ream of 500 sheets of printer paper is 4.8 cm thick. How thick is one sheet? Give your answer in centimetres, correct to 1 significant figure.",
        answer: { type: "number", value: 0.01, display: "0.01 cm" },
        solution: [
          "Exact thickness: 4.8 ÷ 500 = (4.8 ÷ 5) ÷ 100 = 0.96 ÷ 100 = 0.0096 cm.",
          "The first significant figure is the 9 (thousandths). The next digit is 6, so round up.",
          "9 thousandths + 1 thousandth = 10 thousandths = 1 hundredth, so 0.0096 rounds to 0.01 cm (not 0.010 — that zero on the end would make it 2 s.f.).",
          "That's about a tenth of a millimetre — sensible for paper.",
        ],
        traps: [
          { spec: { type: "number", value: 0.0096 }, feedback: "That's the exact thickness. Now round it to 1 significant figure." },
          {
            spec: { type: "number", value: 0.009 },
            feedback: "The digit after the 9 is a 6, so the 9 rounds up — and that carries into the next column: 10 thousandths = 0.01.",
          },
        ],
        commonError: "Chopping 0.0096 to 0.009, or forgetting that rounding a 9 up carries into the next column.",
        difficulty: "core",
        guideRef: "significant-figures",
        hints: [
          "First find the exact thickness. What calculation shares 4.8 cm between 500 sheets?",
          "4.8 ÷ 500 = 4.8 ÷ 5 ÷ 100.",
          "One sheet is 0.0096 cm. Which digit is the first significant figure, and what comes after it?",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q11",
        question:
          "A kitchen scale shows masses in kilograms with **at most 3 decimal places**. A recipe for a fruit cake uses these amounts:\n\n| Ingredient | Mass |\n|---|---|\n| Flour | {{3/8}} kg |\n| Sugar | {{5/12}} kg |\n| Butter | {{7/40}} kg |\n| Cocoa | {{2/9}} kg |\n| Raisins | {{3/16}} kg |\n\nWhich amounts can the scale show **exactly**, with no rounding? Give the scale readings for those amounts only, as decimals, separated by commas (any order).",
        answer: { type: "list", values: [0.375, 0.175], display: "0.375, 0.175 (flour and butter)" },
        solution: [
          "A fraction in its simplest form terminates only if its denominator has no prime factors other than 2 and 5.",
          "12 = 2 × 2 × 3 and 9 = 3 × 3 contain 3s, so {{5/12}} = 0.416̇ and {{2/9}} = 0.2̇ recur — the scale can only show rounded values.",
          "8, 40 and 16 are made of 2s and 5s, so {{3/8}}, {{7/40}} and {{3/16}} terminate.",
          "{{3/8}} = 0.375 and {{7/40}} = {{175/1000}} = 0.175 — both fit in 3 decimal places.",
          "{{3/16}} = 0.1875 needs 4 decimal places, so the scale would have to round it.",
          "Exact readings: 0.375 (flour) and 0.175 (butter).",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.375, 0.175, 0.1875] },
            feedback: "{{3/16}} does terminate, but 0.1875 needs 4 decimal places — this scale only shows 3.",
          },
          {
            spec: { type: "list", values: [0.375, 0.417, 0.175, 0.222] },
            feedback: "0.417 and 0.222 are rounded readings. {{5/12}} and {{2/9}} recur for ever, so the scale can't show them exactly.",
          },
        ],
        commonError: "Forgetting that a terminating decimal can still need more decimal places than the display has.",
        difficulty: "core",
        guideRef: "recurring-decimals",
        hints: [
          "For each fraction, is the denominator made only of 2s and 5s?",
          "8, 40 and 16 pass the test; 12 and 9 contain a 3, so those decimals recur.",
          "Now write the three terminating ones as decimals and count their decimal places.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "written",
        id: "decimals-rounding-p3-q12",
        question:
          "Three friends share a $25.00 taxi fare equally. A phone app tells each of them to pay $8.33.\n\n(a) Explain why the driver receives less than $25.00, and say exactly how much less.\n\n(b) Suggest a fair way to split the fare so that the driver gets exactly $25.00.",
        marks: 3,
        modelAnswer:
          "(a) 25 ÷ 3 = 8.333… — the 3 recurs for ever, so the fare doesn't split into whole cents. The app rounded each share to the nearest cent, $8.33, which is slightly less than a true share. Together they pay 3 × 8.33 = $24.99, which is 1 cent short.\n\n(b) Two friends pay $8.33 and one pays $8.34: 8.33 + 8.33 + 8.34 = $25.00.",
        markScheme: [
          {
            point: "25 ÷ 3 = 8.333… recurs, so $8.33 is a rounded-down share",
            keywords: ["8.333", "recurring", "recurs", "rounded down", "doesn't divide", "does not divide"],
          },
          { point: "3 × 8.33 = 24.99, so the driver is 1 cent short", keywords: ["24.99", "1 cent", "one cent", "0.01"] },
          { point: "Fair fix: one person pays $8.34 (or equivalent)", keywords: ["8.34", "extra cent", "one person"] },
        ],
        commonError: "Saying 'rounding error' without showing the 24.99 or how big the shortfall is.",
        difficulty: "core",
        guideRef: "decimal-places",
        hints: ["What is 25 ÷ 3 exactly?", "Work out 3 × 8.33.", "The missing amount has to be paid by someone."],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q13",
        question:
          "Cinema tickets cost $12.99 each. Marcus books 25 tickets for his class trip. Without a calculator, work out the total cost. Give your answer in dollars.",
        answer: { type: "number", value: 324.75, display: "$324.75" },
        solution: [
          "12.99 is 1 cent less than 13, so 12.99 = 13 − 0.01.",
          "25 × 12.99 = 25 × 13 − 25 × 0.01.",
          "25 × 13 = 325 and 25 × 0.01 = 0.25.",
          "325 − 0.25 = 324.75, so the total is $324.75.",
        ],
        commonError: "Taking off just 1 cent (giving $324.99). Each of the 25 tickets is 1 cent cheaper, so take off 25 cents.",
        difficulty: "core",
        guideRef: "ordering-and-shortcuts",
        hints: [
          "Is there a friendlier price very close to $12.99?",
          "12.99 = 13 − 0.01, so 25 × 12.99 = 25 × 13 − 25 × 0.01.",
          "25 × 13 = 325. How much do the 25 missing cents come to?",
        ],
        strategy: "Round and compensate",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q14",
        question:
          "Two bags of jasmine rice are on sale.\n\n| Bag | Mass | Price |\n|---|---|---|\n| Small | 0.75 kg | $2.85 |\n| Large | 2.5 kg | $9.25 |\n\nWork out the price per kilogram of each bag. By how much per kilogram is the better buy cheaper? Give your answer in dollars.",
        answer: { type: "number", value: 0.1, display: "$0.10 per kg (the large bag)" },
        solution: [
          "Small bag: 2.85 ÷ 0.75 = 285 ÷ 75 = $3.80 per kg.",
          "Large bag: 9.25 ÷ 2.5 = 92.5 ÷ 25 = $3.70 per kg.",
          "The large bag is the better buy, by 3.80 − 3.70 = $0.10 per kg.",
        ],
        solutions: [
          {
            label: "Compare the price of 0.25 kg",
            steps: [
              "Small: 0.75 kg is 3 lots of 0.25 kg, so 0.25 kg costs 2.85 ÷ 3 = $0.95.",
              "Large: 2.5 kg is 10 lots of 0.25 kg, so 0.25 kg costs $0.925.",
              "Difference: 0.025 per 0.25 kg, which is 4 × 0.025 = $0.10 per kg.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 6.4 },
            feedback: "That's the difference in the prices of the bags. Compare like with like: the price of 1 kg of each.",
          },
        ],
        commonError: "Comparing the bag prices directly instead of the price per kilogram.",
        difficulty: "core",
        guideRef: "dividing-decimals",
        hints: [
          "To compare fairly, find the cost of 1 kg from each bag.",
          "Small bag: 2.85 ÷ 0.75. Multiply both by 100: 285 ÷ 75.",
          "Small bag: $3.80 per kg. Large bag: 9.25 ÷ 2.5 = 92.5 ÷ 25.",
        ],
        strategy: "Compare like with like",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q15",
        question:
          "A garden pond holds 2,870 litres of water. Mei fills it with a hose that delivers 19.6 litres per minute. Estimate how many minutes it takes to fill the pond by rounding each number to 1 significant figure.",
        answer: { type: "number", value: 150, display: "150 minutes" },
        solution: [
          "2,870 to 1 s.f. is 3000; 19.6 to 1 s.f. is 20.",
          "3000 ÷ 20 = 300 ÷ 2 = 150.",
          "About 150 minutes (2 and a half hours).",
        ],
        traps: [
          { spec: { type: "number", value: 15 }, feedback: "Check the size: 20 litres a minute for 15 minutes is only 300 litres." },
          { spec: { type: "number", value: 1500 }, feedback: "19.6 to 1 significant figure is 20, not 2." },
        ],
        difficulty: "core",
        guideRef: "estimation",
        hints: ["Round 2,870 and 19.6 to 1 significant figure.", "3000 ÷ 20 — remove a zero from each number first."],
        strategy: "Estimate first",
      },
      {
        kind: "written",
        id: "decimals-rounding-p3-q16",
        question:
          "Siti is buying 38 bottles of water at $1.85 each for a CCA trip. She has $75. She estimates 40 × $2 = $80 and says: 'I don't have enough money.'\n\n(a) Is her estimate an overestimate or an underestimate? Explain how you know without working out the exact cost.\n\n(b) Is Siti right that she doesn't have enough money? Show how you decide.",
        marks: 3,
        modelAnswer:
          "(a) It is an overestimate: she rounded both 38 and 1.85 **up**, so the estimate is bigger than the real cost.\n\n(b) Because $80 is an overestimate, the real cost is less than $80 — it could still be under $75, so the estimate alone can't decide. Work it out exactly: 38 × 1.85 = 40 × 1.85 − 2 × 1.85 = 74 − 3.70 = $70.30. That is less than $75, so Siti **does** have enough, with $4.70 to spare.",
        markScheme: [
          { point: "Overestimate, because both numbers were rounded up", keywords: ["overestimate", "rounded up", "both up", "too big"] },
          {
            point: "Real cost is less than $80, so the estimate can't decide whether $75 is enough",
            keywords: ["less than 80", "can't tell", "cannot tell", "not sure", "could still", "doesn't prove"],
          },
          { point: "Exact cost $70.30, so she does have enough", keywords: ["70.3", "70.30", "enough", "4.70", "4.7"] },
        ],
        commonError: "Trusting an overestimate to prove that you can't afford something.",
        difficulty: "core",
        guideRef: "estimation",
        hints: [
          "Did Siti round each number up or down?",
          "If both numbers in a product go up, what happens to the product?",
          "Work out 38 × 1.85 exactly: try 40 × 1.85 − 2 × 1.85.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q17",
        question: "Without a calculator, work out 2.37 × 48 + 23.7 × 5.2.",
        answer: { type: "number", value: 237 },
        solution: [
          "Move a factor of 10 from one number to the other: 23.7 × 5.2 = 2.37 × 52 (23.7 is 10 times 2.37, 52 is 10 times 5.2).",
          "So the calculation is 2.37 × 48 + 2.37 × 52.",
          "Take out the common factor: 2.37 × (48 + 52) = 2.37 × 100.",
          "2.37 × 100 = 237.",
        ],
        traps: [
          { spec: { type: "number", value: 2370 }, feedback: "Check the size: 2.37 × 100 moves the digits two places, giving 237." },
        ],
        commonError: "Working out both products the long way — and slipping on the decimal point.",
        difficulty: "challenge",
        guideRef: "ordering-and-shortcuts",
        hints: [
          "The two products look different. Can you make them share a factor?",
          "23.7 × 5.2: divide one number by 10 and multiply the other by 10. What do you get?",
          "23.7 × 5.2 = 2.37 × 52. Now use the distributive law on 2.37 × 48 + 2.37 × 52.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q18",
        question:
          "A 1 m rod is cut into n equal pieces. A digital ruler shows lengths in metres with **at most 3 decimal places**. For how many whole numbers n from 2 to 20 (inclusive) will the ruler show the exact length of a piece, with no rounding?",
        answer: { type: "number", value: 6 },
        solution: [
          "Each piece is {{1/n}} m. The ruler is exact only if {{1/n}} is a terminating decimal with at most 3 decimal places.",
          "{{1/n}} has at most 3 decimal places exactly when it is a whole number of thousandths, i.e. when 1000 ÷ n is a whole number.",
          "So n must be a factor of 1000. The factors of 1000 from 2 to 20 are 2, 4, 5, 8, 10 and 20.",
          "Check: 0.5, 0.25, 0.2, 0.125, 0.1, 0.05 ✓",
          "n = 16 is the trap: {{1/16}} = 0.0625 terminates but needs 4 decimal places.",
          "So there are 6 values of n.",
        ],
        traps: [
          {
            spec: { type: "number", value: 7 },
            feedback: "Did you count n = 16? {{1/16}} = 0.0625 terminates, but it needs 4 decimal places — the ruler only shows 3.",
          },
        ],
        commonError: "Counting every terminating decimal and forgetting the 3-decimal-place limit.",
        difficulty: "challenge",
        guideRef: "recurring-decimals",
        hints: [
          "Which values of n make {{1/n}} a terminating decimal at all?",
          "Only denominators built from 2s and 5s terminate: 2, 4, 5, 8, 10, 16, 20. Now check the number of decimal places.",
          "{{1/n}} fits in 3 decimal places exactly when it is a whole number of thousandths — when does 1000 ÷ n come out whole?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "decimals-rounding-p3-q19",
        question:
          "Place the digits 2, 4, 6 and 8, each used once, in the boxes to make the **largest** possible product:\n\n    □.□ × □.□\n\nFind the largest product, and explain why no other arrangement gives a larger one.",
        marks: 4,
        modelAnswer:
          "The units digits matter most, so they should be the two biggest digits, 8 and 6. (If they are not, one number has a units digit of 4 or less, so it is less than 5, and the other is less than 9 — the product is then less than 5 × 9 = 45.) That leaves 2 and 4 for the tenths, giving two options:\n\n    8.2 × 6.4 = 52.48\n    8.4 × 6.2 = 52.08\n\nBoth are bigger than 45, and the largest product is **8.2 × 6.4 = 52.48**.\n\nWhy: both pairs have the same sum, 14.6, and for a fixed sum the product is bigger when the two numbers are closer together (8.2 and 6.4 differ by 1.8; 8.4 and 6.2 differ by 2.2). Another way to see it: expand. 8.2 × 6.4 = 48 + 8 × 0.4 + 6 × 0.2 + 0.08 = 48 + 4.4 + 0.08, but 8.4 × 6.2 = 48 + 8 × 0.2 + 6 × 0.4 + 0.08 = 48 + 4.0 + 0.08. The bigger tenths digit (0.4) should be multiplied by the bigger units digit (8), so it belongs in the other number: 6.4.",
        markScheme: [
          { point: "Units digits must be 8 and 6 (largest digits in the most valuable places; otherwise the product is under 45)", keywords: ["8 and 6", "6 and 8", "units", "ones", "biggest digits", "45"] },
          { point: "Compares 8.2 × 6.4 with 8.4 × 6.2 = 52.08", keywords: ["52.08", "8.4 × 6.2", "8.4 x 6.2"] },
          { point: "Valid reason: same sum so closer numbers give a bigger product, or expanding shows 8 × 0.4 + 6 × 0.2 = 4.4 beats 8 × 0.2 + 6 × 0.4 = 4.0", keywords: ["same sum", "14.6", "closer", "4.4", "multiplied by 8"] },
          { point: "Largest product 52.48", keywords: ["52.48"] },
        ],
        commonError: "Putting the larger tenths digit with the larger units digit (8.4 × 6.2) because it 'makes the biggest number bigger'.",
        difficulty: "challenge",
        guideRef: "multiplying-decimals",
        hints: [
          "Which two digits should go in the units places? Why do they matter most?",
          "With 8 and 6 as units digits there are only two choices: 8.2 × 6.4 or 8.4 × 6.2. Work out both.",
          "Both pairs add up to 14.6. For a fixed sum, when is a product biggest?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "decimals-rounding-p3-q20",
        question:
          "Five friends share a hawker-centre bill equally. The bill is a whole number of cents. Each person's exact share, rounded to the nearest 10 cents, is $7.30. What are the smallest and the largest possible amounts for the whole bill? Give your answers in dollars, smallest first, separated by a comma.",
        answer: { type: "list", values: [36.25, 36.74], ordered: true, display: "$36.25, $36.74" },
        solution: [
          "A share rounds to $7.30 (nearest 10 cents) when 7.25 ≤ share < 7.35.",
          "The bill is 5 × the share, so 36.25 ≤ bill < 36.75.",
          "Smallest: $36.25 works, because 36.25 ÷ 5 = 7.25, which rounds up to 7.30.",
          "Largest: the bill must be less than $36.75 and a whole number of cents, so $36.74 (each share 7.348, which rounds to 7.30).",
          "$36.75 itself fails: 36.75 ÷ 5 = 7.35, which rounds to 7.40.",
        ],
        traps: [
          {
            spec: { type: "list", values: [36.25, 36.75], ordered: true },
            feedback: "The upper bound isn't allowed: $36.75 ÷ 5 = $7.35, which rounds to $7.40. Go down to the next whole number of cents.",
          },
          {
            spec: { type: "list", values: [7.25, 7.35], ordered: true },
            feedback: "Those are the limits for one person's share. The question asks about the whole bill for five people.",
          },
        ],
        commonError: "Using 36.75 as the largest bill — the upper bound of an error interval is never actually reached.",
        difficulty: "challenge",
        guideRef: "error-intervals",
        hints: [
          "Which exact shares would round to $7.30 to the nearest 10 cents?",
          "7.25 ≤ share < 7.35. How is the bill related to one share?",
          "So 36.25 ≤ bill < 36.75. The bill is a whole number of cents — what's the largest amount below 36.75?",
        ],
        strategy: "Work backwards",
      },
    ],
  },
  {
    id: "decimals-rounding-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "decimals-rounding-p4-q01",
        question:
          "During a dry spell, the water level of a reservoir changed each week as shown (a negative change is a fall).\n\n| Week | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|\n| Change (m) | −0.8 | −1.25 | 0.3 | −1.2 | −0.85 |\n\nWrite the five changes in order from smallest to largest, separated by commas.",
        answer: { type: "list", values: [-1.25, -1.2, -0.85, -0.8, 0.3], ordered: true, display: "−1.25, −1.2, −0.85, −0.8, 0.3" },
        solution: [
          "0.3 is the only positive number, so it is the largest.",
          "For the negatives, compare their sizes: 1.25 > 1.20 > 0.85 > 0.80.",
          "The bigger the size of a negative number, the further left it is on the number line, so the smaller it is.",
          "Order: −1.25, −1.2, −0.85, −0.8, 0.3.",
        ],
        traps: [
          {
            spec: { type: "list", values: [-0.8, -0.85, -1.2, -1.25, 0.3], ordered: true },
            feedback: "For negative numbers the order flips: −1.25 is a bigger fall than −0.8, so it is further left and smaller.",
          },
        ],
        difficulty: "warmup",
        guideRef: "ordering-and-shortcuts",
        hints: [
          "Which number is positive? It goes last.",
          "Picture a number line: the biggest fall (the negative with the biggest size) is furthest left.",
        ],
        strategy: "Draw a number line",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q02",
        question:
          "A pack of 6 batteries costs $8.94. A shop also sells single batteries at the same price per battery. How much would 14 single batteries cost? Give your answer in dollars.",
        answer: { type: "number", value: 20.86, display: "$20.86" },
        solution: [
          "One battery: 8.94 ÷ 6 = $1.49.",
          "14 batteries: 14 × 1.49 = 14 × 1.5 − 14 × 0.01 = 21 − 0.14 = $20.86.",
        ],
        traps: [
          { spec: { type: "number", value: 125.16 }, feedback: "That's the cost of 14 packs. Find the price of one battery first." },
        ],
        difficulty: "warmup",
        guideRef: "multiplying-decimals",
        hints: ["First find the price of one battery.", "8.94 ÷ 6 = 1.49. Now multiply by 14."],
        strategy: "Find one first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q03",
        question:
          "A scientist records the mass of a seed as 0.008357 g. Complete the table.\n\n| Accuracy | Rounded mass (g) |\n|---|---|\n| 1 significant figure | ? |\n| 2 significant figures | ? |\n| 3 significant figures | ? |\n\nGive your three answers in order (1 s.f. first), separated by commas.",
        answer: { type: "list", values: [0.008, 0.0084, 0.00836], ordered: true, display: "0.008, 0.0084, 0.00836" },
        solution: [
          "The zeros at the front are place holders. The significant figures are 8, 3, 5, 7.",
          "1 s.f.: keep the 8; the next digit is 3, so round down → 0.008.",
          "2 s.f.: keep 8 and 3; the next digit is 5, so round up → 0.0084.",
          "3 s.f.: keep 8, 3 and 5; the next digit is 7, so round up → 0.00836.",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.008, 0.0083, 0.00835], ordered: true },
            feedback: "Those are chopped, not rounded. Look at the next digit each time: 5 or more rounds up.",
          },
        ],
        difficulty: "warmup",
        guideRef: "significant-figures",
        hints: [
          "The first significant figure is the first non-zero digit. Which is it here?",
          "The significant figures are 8, 3, 5, 7. For 2 s.f. keep 8 and 3 and look at the 5.",
        ],
        strategy: "Look at the next digit",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q04",
        question: "In a survey, 0.36 of the students in Year 8 walk to school. Write 0.36 as a fraction in its simplest form.",
        answer: { type: "fraction", n: 9, d: 25, simplest: true },
        solution: [
          "The last digit, 6, is in the hundredths column, so 0.36 = {{36/100}}.",
          "The HCF of 36 and 100 is 4.",
          "{{36/100 = 9/25}}.",
        ],
        traps: [
          { spec: { type: "fraction", n: 36, d: 10 }, feedback: "0.36 is 36 hundredths, not 36 tenths — {{36/10}} is bigger than 3." },
        ],
        difficulty: "warmup",
        guideRef: "recurring-decimals",
        hints: ["Which column is the last digit in? Write 0.36 over that place value, then simplify."],
        strategy: "Use place value",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q05",
        question:
          "Ethan's calculator has a sticky decimal-point key. He knows that 61.38 ÷ 0.198 is one of 3.1, 31, 310 or 3100, but not which. Use an estimate (round each number to 1 significant figure) to decide. Write down the correct value.",
        answer: { type: "number", value: 310 },
        solution: [
          "61.38 ≈ 60 and 0.198 ≈ 0.2.",
          "60 ÷ 0.2 = 600 ÷ 2 = 300.",
          "The only option near 300 is 310.",
          "Check: 0.198 × 310 = 61.38 ✓",
        ],
        traps: [
          { spec: { type: "number", value: 31 }, feedback: "Dividing by 0.2 makes a number 5 times bigger, so 60 ÷ 0.2 = 300, not 30." },
          { spec: { type: "number", value: 3100 }, feedback: "Too big by a factor of 10: the estimate is 60 ÷ 0.2 = 300." },
        ],
        difficulty: "warmup",
        guideRef: "estimation",
        hints: ["Round 61.38 and 0.198 to 1 significant figure.", "How many 0.2s make 1? So how many 0.2s make 60?"],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q06",
        question:
          "You are told that 46 × 37 = 1702. Use this fact to write down the value of:\n\n(a) 17.02 ÷ 3.7\n\n(b) 1702 ÷ 0.46\n\nGive your answers in order, (a) first, separated by a comma.",
        answer: { type: "list", values: [4.6, 3700], ordered: true, display: "(a) 4.6, (b) 3700" },
        solution: [
          "Division undoes multiplication: 1702 ÷ 37 = 46 and 1702 ÷ 46 = 37.",
          "(a) Multiply both numbers by 10: 17.02 ÷ 3.7 = 170.2 ÷ 37. That is 1702 ÷ 37 divided by 10, so 46 ÷ 10 = 4.6.",
          "(b) Multiply both numbers by 100: 1702 ÷ 0.46 = 170200 ÷ 46. That is 1702 ÷ 46 multiplied by 100, so 37 × 100 = 3700.",
          "Estimate checks: 17 ÷ 4 ≈ 4 ✓ and 1700 ÷ 0.5 = 3400 ✓",
        ],
        traps: [
          {
            spec: { type: "list", values: [4.6, 37], ordered: true },
            feedback: "(b) Dividing by 0.46, a number 100 times smaller than 46, makes the answer 100 times bigger.",
          },
          {
            spec: { type: "list", values: [46, 3700], ordered: true },
            feedback: "(a) 17.02 is 100 times smaller than 1702 but 3.7 is only 10 times smaller than 37, so the answer is 46 ÷ 10.",
          },
        ],
        commonError: "Copying the digits 46 and 37 without thinking about the size — always check with an estimate.",
        difficulty: "core",
        guideRef: "dividing-decimals",
        hints: [
          "Write the related division facts: 1702 ÷ 37 = ? and 1702 ÷ 46 = ?",
          "For (a): scale both numbers by 10 so the divisor is 37. What happens to the answer?",
          "For (b): dividing by 0.46 instead of 46 makes the answer 100 times bigger.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q07",
        question:
          "The diagram shows a rectangular poster 0.84 m wide and 0.6 m tall. A picture is printed in the middle, leaving a plain border 0.05 m wide all the way round. Work out the area of the border, in square metres.",
        diagram: `<svg viewBox="0 0 440 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular poster 0.84 m wide and 0.6 m tall. A smaller rectangle labelled picture sits inside it, leaving a shaded border 0.05 m wide all the way round."><rect x="0" y="0" width="440" height="320" fill="#ffffff"/><rect x="70" y="40" width="336" height="240" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="90" y="60" width="296" height="200" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><text x="238" y="165" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">picture</text><line x1="70" y1="24" x2="406" y2="24" stroke="#1f2937" stroke-width="1"/><line x1="70" y1="18" x2="70" y2="30" stroke="#1f2937" stroke-width="1"/><line x1="406" y1="18" x2="406" y2="30" stroke="#1f2937" stroke-width="1"/><text x="238" y="16" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">0.84 m</text><line x1="54" y1="40" x2="54" y2="280" stroke="#1f2937" stroke-width="1"/><line x1="48" y1="40" x2="60" y2="40" stroke="#1f2937" stroke-width="1"/><line x1="48" y1="280" x2="60" y2="280" stroke="#1f2937" stroke-width="1"/><text x="46" y="165" font-family="sans-serif" font-size="13" text-anchor="end" fill="#1f2937">0.6 m</text><line x1="330" y1="260" x2="330" y2="280" stroke="#1f2937" stroke-width="1.5"/><line x1="325" y1="260" x2="335" y2="260" stroke="#1f2937" stroke-width="1.5"/><line x1="325" y1="280" x2="335" y2="280" stroke="#1f2937" stroke-width="1.5"/><text x="330" y="300" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">0.05 m</text><text x="140" y="300" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">border (shaded)</text></svg>`,
        answer: { type: "number", value: 0.134, display: "0.134 m²" },
        solution: [
          "Whole poster: 0.84 × 0.6 = 0.504 m² (84 × 6 = 504, with 3 decimal places).",
          "The picture loses 0.05 m on **both** sides each way: width 0.84 − 0.1 = 0.74 m, height 0.6 − 0.1 = 0.5 m.",
          "Picture: 0.74 × 0.5 = 0.37 m².",
          "Border = 0.504 − 0.37 = 0.134 m².",
        ],
        solutions: [
          {
            label: "Add up the strips",
            steps: [
              "Top and bottom strips: 2 × (0.84 × 0.05) = 2 × 0.042 = 0.084 m².",
              "Side strips (between them, 0.5 m tall): 2 × (0.5 × 0.05) = 2 × 0.025 = 0.05 m².",
              "Total border: 0.084 + 0.05 = 0.134 m².",
            ],
          },
        ],
        traps: [
          { spec: { type: "number", value: 0.37 }, feedback: "0.37 m² is the picture. The border is what's left of the poster." },
          {
            spec: { type: "number", value: 0.0695 },
            feedback: "The border is on both sides, so take 2 × 0.05 = 0.1 m off each measurement for the picture.",
          },
        ],
        commonError: "Subtracting the border width only once from each side length.",
        difficulty: "core",
        guideRef: "multiplying-decimals",
        hints: [
          "Area of border = area of poster − area of picture.",
          "How much narrower is the picture than the poster? Remember there's a border on both sides.",
          "Poster: 0.84 × 0.6 = 0.504 m². Picture: 0.74 × 0.5.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "decimals-rounding-p4-q08",
        question:
          "Ethan says: 'Multiplying always makes a number bigger, and dividing always makes a number smaller.'\n\nGive a counter-example for **each** half of his statement, and state the rule that tells you when each half is false (for positive numbers).",
        marks: 4,
        modelAnswer:
          "Multiplying: 15 × 0.8 = 12, which is smaller than 15.\n\nDividing: 15 ÷ 0.5 = 30, which is bigger than 15 (there are 30 halves in 15).\n\nRule: multiplying a positive number by a number between 0 and 1 makes it smaller, because you are taking only part of it. Dividing a positive number by a number between 0 and 1 makes it bigger, because more than one of the small pieces fits into each whole.",
        markScheme: [
          { point: "Correct multiplication counter-example, e.g. 15 × 0.8 = 12", keywords: ["× 0.", "x 0.", "0.8", "12", "smaller"] },
          { point: "Correct division counter-example, e.g. 15 ÷ 0.5 = 30", keywords: ["÷ 0.", "/ 0.", "0.5", "30", "bigger"] },
          { point: "Multiplying by a number between 0 and 1 makes it smaller", keywords: ["between 0 and 1", "less than 1", "smaller than 1", "part of"] },
          { point: "Dividing by a number between 0 and 1 makes it bigger", keywords: ["dividing by", "divide by", "bigger", "larger", "fits"] },
        ],
        commonError: "Giving a counter-example with no rule, or a rule with no worked example.",
        difficulty: "core",
        guideRef: "multiplying-decimals",
        hints: [
          "What does 15 × 0.8 mean in words?",
          "How many halves are there in 15? What is 15 ÷ 0.5?",
          "What do 0.8 and 0.5 have in common that makes Ethan's statement fail?",
        ],
        strategy: "Find a counter-example",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q09",
        question:
          "Use a calculator to work out\n\n{{(4.82 + 3.17^2)/(2.6 * 0.35)}}\n\nGive your answer correct to 2 decimal places.",
        answer: { type: "number", value: 16.34, allowFraction: false },
        solution: [
          "Top: 3.17² = 10.0489, so 4.82 + 10.0489 = 14.8689.",
          "Bottom: 2.6 × 0.35 = 0.91.",
          "14.8689 ÷ 0.91 = 16.3394…",
          "Second decimal place: 16.33|94… The next digit is 9, so round up: 16.34.",
          "Sense check: (5 + 9) ÷ (3 × 0.3) ≈ 14 ÷ 0.9 ≈ 16 ✓",
        ],
        traps: [
          {
            spec: { type: "number", value: 6.17 },
            feedback: "Brackets matter: the whole top must be divided by the whole bottom. Work out each part first, or type ( ) around both.",
          },
          {
            spec: { type: "number", value: 2 },
            feedback: "You divided by 2.6 and then multiplied by 0.35. Put brackets round 2.6 × 0.35 so you divide by the whole bottom.",
          },
        ],
        commonError: "Typing the calculation without brackets, so the calculator only divides part of the top by part of the bottom.",
        difficulty: "core",
        guideRef: "decimal-places",
        hints: [
          "Work out the top and the bottom separately first.",
          "Top: 4.82 + 10.0489 = 14.8689. Bottom: 2.6 × 0.35 = 0.91.",
          "14.8689 ÷ 0.91 = 16.3394… Which digit decides the second decimal place?",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q10",
        question:
          "An air-conditioner uses 1.38 kWh of electricity per hour. Priya's family runs it for 7.8 hours a night for 31 nights. Electricity costs $0.294 per kWh. Estimate the cost of running the air-conditioner for the month by rounding every number to 1 significant figure. Give your answer in dollars.",
        answer: { type: "number", value: 72, display: "$72" },
        solution: [
          "Round each number to 1 s.f.: 1.38 → 1, 7.8 → 8, 31 → 30, 0.294 → 0.3.",
          "Electricity used ≈ 1 × 8 × 30 = 240 kWh.",
          "Cost ≈ 240 × 0.3 = $72.",
          "(The exact cost is about $98 — the estimate is low mainly because 1.38 was rounded down to 1.)",
        ],
        traps: [
          { spec: { type: "number", value: 720 }, feedback: "0.294 to 1 significant figure is 0.3, not 3." },
          { spec: { type: "number", value: 7.2 }, feedback: "Check the size: 240 kWh at about 30 cents each is 240 × 0.3." },
        ],
        difficulty: "core",
        guideRef: "estimation",
        hints: [
          "Round each of the four numbers to 1 significant figure.",
          "1 × 8 × 30 kWh at $0.3 each.",
          "8 × 30 = 240, then 240 × 0.3 = 24 × 3.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q11",
        question: "Find the missing number.\n\n    0.36 × □ = 4.5",
        answer: { type: "number", value: 12.5 },
        solution: [
          "Use the inverse: □ = 4.5 ÷ 0.36.",
          "Multiply both by 100 so the divisor is a whole number: 450 ÷ 36.",
          "Divide both by 9: 450 ÷ 36 = 50 ÷ 4 = 12.5.",
          "Check: 0.36 × 12.5 = 4.5 ✓",
        ],
        traps: [
          { spec: { type: "number", value: 0.08 }, feedback: "That's 0.36 ÷ 4.5 — the division is upside down. Divide the answer (4.5) by 0.36." },
          { spec: { type: "number", value: 1.25 }, feedback: "Check: 0.36 × 1.25 = 0.45, not 4.5. Scale both numbers by the same power of 10." },
        ],
        difficulty: "core",
        guideRef: "dividing-decimals",
        hints: [
          "What division undoes '× □'?",
          "□ = 4.5 ÷ 0.36. Multiply both numbers by 100 to make the divisor whole.",
          "450 ÷ 36: divide both by 9 first.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "decimals-rounding-p4-q12",
        question:
          "Ravi says: '{{7/30}} must give a terminating decimal, because 30 is a multiple of 10, and dividing by 10 always gives a terminating decimal.'\n\nIs Ravi right? Explain fully.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong. As a product of primes, 30 = 2 × 3 × 5. A fraction in its simplest form gives a terminating decimal only if its denominator has no prime factors other than 2 and 5 — but 30 has a factor of 3.\n\n{{7/30}} is already in its simplest form (7 and 30 have no common factor), so the 3 cannot cancel. Dividing: 7 ÷ 30 = 0.2333… = 0.23̇, which recurs.\n\n(Compare {{9/30}} = {{3/10}} = 0.3, which terminates because the 3 cancels.)",
        markScheme: [
          { point: "Ravi is wrong: 30 = 2 × 3 × 5 has a prime factor 3 (not just 2s and 5s)", keywords: ["2 × 3 × 5", "2x3x5", "factor of 3", "prime factor", "3"] },
          { point: "7/30 is already in its simplest form, so the 3 cannot cancel", keywords: ["simplest", "cancel", "can't simplify", "cannot simplify", "no common factor"] },
          { point: "Shows 7/30 = 0.2333… which recurs", keywords: ["0.2333", "0.233", "recurring", "recurs", "repeat"] },
        ],
        commonError: "Looking at the denominator before simplifying, or thinking any multiple of 10 terminates.",
        difficulty: "core",
        guideRef: "recurring-decimals",
        hints: [
          "Write 30 as a product of prime factors.",
          "Which primes are allowed in the denominator of a fraction that terminates?",
          "Can {{7/30}} be simplified? Then check by dividing 7 by 30.",
        ],
        strategy: "Find a counter-example",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q13",
        question: "Use the fact that 9.8 = 10 − 0.2 to work out 7.25 × 9.8 without a calculator.",
        answer: { type: "number", value: 71.05 },
        solution: [
          "7.25 × 9.8 = 7.25 × 10 − 7.25 × 0.2.",
          "7.25 × 10 = 72.5.",
          "7.25 × 0.2 = 1.45 (double 7.25 to get 14.5, then divide by 10).",
          "72.5 − 1.45 = 71.05.",
        ],
        solutions: [
          {
            label: "Split 7.25 instead",
            steps: ["7.25 = 7 + 0.25.", "7 × 9.8 = 68.6 and 0.25 × 9.8 = 9.8 ÷ 4 = 2.45.", "68.6 + 2.45 = 71.05."],
          },
        ],
        traps: [
          { spec: { type: "number", value: 72.3 }, feedback: "You need to take away 7.25 × 0.2, not just 0.2." },
          { spec: { type: "number", value: 71.775 }, feedback: "9.8 is 10 − 0.2, so subtract 7.25 × 0.2 = 1.45 (not 7.25 × 0.1)." },
        ],
        commonError: "Subtracting just 0.2 instead of 7.25 × 0.2.",
        difficulty: "core",
        guideRef: "ordering-and-shortcuts",
        hints: [
          "Multiply 7.25 by each part of 10 − 0.2.",
          "7.25 × 9.8 = 7.25 × 10 − 7.25 × 0.2.",
          "7.25 × 0.2: double 7.25, then divide by 10.",
        ],
        strategy: "Round and compensate",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q14",
        question: "Write the recurring decimal 0.1̇8̇ = 0.181818… as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 11, simplest: true },
        solution: [
          "Let x = 0.181818…",
          "The repeating block has 2 digits, so multiply by 100: 100x = 18.181818…",
          "Subtract to cancel the endless tail: 100x − x = 18, so 99x = 18.",
          "x = {{18/99}} = {{2/11}} (divide top and bottom by 9).",
          "Check: 2 ÷ 11 = 0.1818… ✓",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 9, d: 50 },
            feedback: "{{18/100}} = 0.18 exactly — it stops. The dots mean 18 repeats for ever, which is a little bigger.",
          },
        ],
        commonError: "Writing {{18/100}}, which ignores the recurring part.",
        difficulty: "core",
        guideRef: "recurring-decimals",
        hints: [
          "Let x = 0.181818… How many digits are in the repeating block?",
          "Multiply by 100: 100x = 18.1818… What happens when you subtract x?",
          "99x = 18. Now simplify {{18/99}}.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "decimals-rounding-p4-q15",
        question:
          "Zara rounds 0.04052 to 2 significant figures. Here is her working:\n\n    The first two figures after the point are 0 and 4,\n    so 0.04052 = 0.04 (2 s.f.)\n\nExplain her mistake and give the correct answer.",
        marks: 3,
        modelAnswer:
          "Zara counted the zero straight after the decimal point as significant, but zeros in front of the first non-zero digit are only place holders — they are never significant. The significant figures start at the 4.\n\nThe first two significant figures are 4 and 0 (the zero between 4 and 5 **is** significant, because it comes after the first non-zero digit). The next digit is 5, so round up: 0.040|52 → 0.041.\n\nThe correct answer is 0.041.",
        markScheme: [
          {
            point: "Leading zeros are not significant; significant figures start at the first non-zero digit (the 4)",
            keywords: ["first non-zero", "leading zero", "not significant", "place holder", "start at the 4"],
          },
          { point: "Keeps 4 and 0, sees the next digit is 5 and rounds up", keywords: ["4 and 0", "0.040", "5", "round up"] },
          { point: "Correct answer 0.041", keywords: ["0.041"] },
        ],
        commonError: "Treating the zero between the 4 and the 5 as a place holder too — once the significant figures have started, zeros count.",
        difficulty: "core",
        guideRef: "significant-figures",
        hints: [
          "Where do significant figures start?",
          "The significant figures of 0.04052 are 4, 0, 5, 2. Which two do you keep?",
          "Keep 4 and 0, then look at the next digit.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q16",
        question:
          "A pencil is measured as 14.2 cm long, correct to the nearest millimetre. Its actual length is L cm. The error interval for L is {{a <= L < b}}. Find a and b, giving a first, separated by a comma.",
        answer: { type: "list", values: [14.15, 14.25], ordered: true, display: "a = 14.15, b = 14.25" },
        solution: [
          "The nearest millimetre is the nearest 0.1 cm, so the bounds are half of 0.1 = 0.05 cm either side.",
          "Lower bound: 14.2 − 0.05 = 14.15 (included: 14.15 rounds up to 14.2).",
          "Upper bound: 14.2 + 0.05 = 14.25 (not included: 14.25 would round to 14.3).",
          "{{14.15 <= L < 14.25}}.",
        ],
        traps: [
          {
            spec: { type: "list", values: [14.1, 14.3], ordered: true },
            feedback: "Those are the neighbouring rounded values. The bounds are only half a unit (0.05 cm) either side of 14.2.",
          },
          {
            spec: { type: "list", values: [14.15, 14.24], ordered: true },
            feedback: "The upper bound is 14.25. It isn't included — that's what the < sign shows — but it is still the boundary.",
          },
        ],
        commonError: "Using a whole unit (0.1 cm) either side instead of half a unit.",
        difficulty: "core",
        guideRef: "error-intervals",
        hints: [
          "The nearest millimetre is the nearest 0.1 cm. What is half of 0.1?",
          "Go 0.05 cm below and above 14.2.",
        ],
        strategy: "Draw a number line",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q17",
        question:
          "Put these numbers in order from smallest to largest. Answer with the letters, for example D, C, B, A.\n\n| Letter | Number |\n|---|---|\n| A | 0.32̇ |\n| B | 0.3̇2̇ |\n| C | 0.323 |\n| D | 0.3̇ |",
        answer: {
          type: "text",
          accept: ["A, C, B, D", "ACBD", "A,C,B,D", "A<C<B<D", "A;C;B;D", "A C B D", "A-C-B-D", "A/C/B/D"],
          display: "A, C, B, D (0.32̇ < 0.323 < 0.3̇2̇ < 0.3̇)",
        },
        solution: [
          "Write each number out to 6 decimal places.",
          "A = 0.32̇ = 0.322222… (only the 2 repeats).",
          "B = 0.3̇2̇ = 0.323232… (the block 32 repeats).",
          "C = 0.323000 (it stops).",
          "D = 0.3̇ = 0.333333…",
          "Compare column by column: A has 2 thousandths, B and C have 3; B beats C at the 4th decimal place (2 > 0); D has 3 hundredths, the most.",
          "Order: A, C, B, D.",
        ],
        traps: [
          {
            spec: { type: "text", accept: ["A, B, C, D", "ABCD", "A,B,C,D", "A<B<C<D", "A B C D"] },
            feedback: "Compare B and C digit by digit: 0.32323… and 0.32300… At the 4th decimal place B has a 2 and C has a 0, so B is bigger.",
          },
          {
            spec: { type: "text", accept: ["D, A, B, C", "DABC", "D,A,B,C", "D, B, A, C", "DBAC", "D,B,A,C"] },
            feedback: "The dots mean digits repeat for ever: 0.3̇ is 0.333…, not 0.3. Write each number out to 6 decimal places first.",
          },
        ],
        commonError: "Ignoring the dots and reading 0.3̇ as 0.3 or 0.3̇2̇ as 0.32.",
        difficulty: "core",
        guideRef: "ordering-and-shortcuts",
        hints: [
          "Write each number out in full to 6 decimal places.",
          "A = 0.322222…, B = 0.323232…, C = 0.323000, D = 0.333333…",
          "Compare column by column from the left; the first column that differs decides.",
        ],
        strategy: "Write it out in full",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q18",
        question:
          "Arjun says: '0.15 has 2 decimal places, 0.15 has 2 and 0.4 has 1, so 0.15 × 0.15 × 0.4 must have 2 + 2 + 1 = 5 decimal places.'\n\nWork out 0.15 × 0.15 × 0.4, then say how many decimal places the answer really has. Give the product first, then the number of decimal places, separated by a comma.",
        answer: { type: "list", values: [0.009, 3], ordered: true, display: "0.009, 3 decimal places" },
        solution: [
          "Ignore the points: 15 × 15 × 4 = 900.",
          "There are 2 + 2 + 1 = 5 decimal places in the question, so the product is 900 hundred-thousandths: 0.00900.",
          "The two zeros on the end are worth nothing, so 0.00900 = 0.009.",
          "The answer has 3 decimal places, not 5 — Arjun's rule tells you where to put the point, but trailing zeros can then drop off.",
        ],
        traps: [
          {
            spec: { type: "list", values: [0.009, 5], ordered: true },
            feedback: "Right product! But 0.00900 is the same as 0.009 — the trailing zeros vanish, so it has 3 decimal places.",
          },
          {
            spec: { type: "list", values: [0.09, 2], ordered: true },
            feedback: "Check the product: 0.15 × 0.15 = 0.0225, and 0.0225 × 0.4 = 0.009.",
          },
        ],
        commonError: "Trusting the 'count the decimal places' rule for the length of the answer: it places the point, but a product ending in zeros gets shorter.",
        difficulty: "core",
        guideRef: "multiplying-decimals",
        hints: [
          "Work out 15 × 15 × 4 first.",
          "15 × 15 × 4 = 900, so the product is 0.00900 (5 decimal places so far).",
          "What happens to zeros at the end of a decimal?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "short",
        id: "decimals-rounding-p4-q19",
        question:
          "A taxi company uses these fares.\n\n| Charge | Amount |\n|---|---|\n| Flag-down fare (includes the first 1 km) | $4.10 |\n| Every 400 m, or part of 400 m, after the first 1 km | $0.26 |\n\nJun's fare is $9.30. What is the **greatest** distance he could have travelled? Give your answer in km.",
        answer: { type: "number", value: 9, display: "9 km" },
        solution: [
          "Work backwards. Money paid for distance after the first km: 9.30 − 4.10 = $5.20.",
          "Number of 400 m charges: 5.20 ÷ 0.26 = 520 ÷ 26 = 20.",
          "20 charges cover at most 20 × 400 m = 8000 m = 8 km after the first km.",
          "Greatest total distance: 1 + 8 = 9 km. (Even 9.001 km would need a 21st charge.)",
        ],
        traps: [
          { spec: { type: "number", value: 8 }, feedback: "Don't forget the first 1 km, which is included in the flag-down fare." },
          { spec: { type: "number", value: 20 }, feedback: "20 is the number of 400 m charges, not the distance. Convert it to kilometres." },
        ],
        commonError: "Forgetting the first kilometre that is already paid for by the flag-down fare.",
        difficulty: "challenge",
        guideRef: "dividing-decimals",
        hints: [
          "How much of the $9.30 was paid for the 400 m charges?",
          "9.30 − 4.10 = 5.20. How many lots of $0.26 make $5.20?",
          "5.20 ÷ 0.26 = 520 ÷ 26 = 20 charges, which cover up to 8000 m. What else must you add?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "written",
        id: "decimals-rounding-p4-q20",
        question:
          "Hana estimates {{(38.2 * 4.7)/1.8}} as {{(40 * 5)/2}} = 100.\n\nShe says: 'I rounded every number up, so my estimate must be bigger than the exact answer.'\n\nExplain why Hana's reasoning is wrong. Then explain how she could round the numbers so that her estimate is **certain** to be an overestimate, and give such an estimate.",
        marks: 4,
        modelAnswer:
          "Rounding 38.2 up to 40 and 4.7 up to 5 makes the top bigger, which makes the answer bigger. But rounding the divisor 1.8 up to 2 makes the answer **smaller**, because dividing by a bigger number gives a smaller result. The two effects pull in opposite directions, so Hana can't be sure which way her estimate is off. (In fact the exact answer is 99.74…, so 100 happens to be just above it — but that is luck, not a guarantee.)\n\nTo be certain of an overestimate, round the numbers on top **up** and the divisor **down**: for example {{(40 * 5)/1.5}} ≈ 133 or {{(40 * 5)/1}} = 200. Both are definitely bigger than the exact answer.",
        markScheme: [
          { point: "Rounding 38.2 and 4.7 up makes the answer bigger", keywords: ["top", "numerator", "bigger", "larger", "38.2", "4.7"] },
          { point: "Rounding the divisor 1.8 up makes the answer smaller", keywords: ["divisor", "bottom", "denominator", "smaller", "1.8", "dividing by a bigger"] },
          { point: "So the effects pull in opposite directions and she can't be sure", keywords: ["opposite", "can't be sure", "cannot be sure", "not necessarily", "not guaranteed", "cancel"] },
          { point: "Round the divisor down (top up) for a certain overestimate, e.g. 200 or about 133", keywords: ["round down", "1.5", "200", "133", "divisor down"] },
        ],
        commonError: "Assuming that rounding every number up always gives an overestimate — that only works for adding and multiplying.",
        difficulty: "challenge",
        guideRef: "estimation",
        hints: [
          "What happens to the answer when the top of a fraction gets bigger?",
          "What happens to {{200/x}} as x gets bigger: compare {{200/1.8}} and {{200/2}}.",
          "To be sure of an overestimate, which way should the divisor be rounded?",
        ],
        strategy: "Consider extremes",
      },
    ],
  },
];
