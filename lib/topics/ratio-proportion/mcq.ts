// Ratio & Proportion — MCQ papers (4 × 20). Audited content: see docs/CONTENT.md.
import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ PAPER 1
  // =========================================================================
  {
    id: "ratio-proportion-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q01",
        question: "Simplify the ratio 18 : 24 fully.",
        options: ["3 : 4", "9 : 12", "6 : 8", "4 : 3"],
        answerIndex: 0,
        explanation:
          "The HCF of 18 and 24 is 6, so divide both parts by 6: 18 : 24 = 3 : 4. 9 : 12 is equivalent but not fully simplified — 9 and 12 still share a factor of 3. 4 : 3 has the parts the wrong way round.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["What is the largest number that divides into both 18 and 24?"],
        strategy: "Divide by the HCF",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q02",
        question: "Siti and Ravi share $40 in the ratio 3 : 5. How much does Ravi get?",
        options: ["$15", "$25", "$24", "$8"],
        answerIndex: 1,
        explanation:
          "There are 3 + 5 = 8 equal parts, so one part is $40 ÷ 8 = $5 and Ravi gets 5 × $5 = $25. $24 comes from dividing by 5 instead of by the total of 8 parts (that finds {{3/5}} of $40, not anyone's share). $15 is Siti's share.",
        difficulty: "warmup",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many equal parts is the $40 split into altogether?"],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q03",
        question: "A bag holds red and green beads in the ratio 2 : 7. What fraction of the beads are red?",
        options: ["{{2/7}}", "{{7/9}}", "{{2/9}}", "{{7/2}}"],
        answerIndex: 2,
        explanation:
          "2 : 7 means 2 red for every 7 green, so each group of 9 beads has 2 red: {{2/9}} of the beads are red. {{2/7}} compares red with green, not red with the whole bag. {{7/9}} is the fraction that are green.",
        difficulty: "warmup",
        guideRef: "ratios-and-fractions",
        hints: ["How many beads are in one complete group of 2 red and 7 green?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q04",
        question: "4 notebooks cost $6. At the same price each, how much do 10 notebooks cost?",
        options: ["$12", "$60", "$24", "$15"],
        answerIndex: 3,
        explanation:
          "One notebook costs $6 ÷ 4 = $1.50, so 10 cost 10 × $1.50 = $15. $12 comes from adding: '6 more notebooks, so add $6' — but proportion works by multiplying, not adding. $60 multiplies by 10 and forgets to divide by 4.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["What does one notebook cost?"],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q05",
        question: "A map has a scale of 1 : 50 000. Two villages are 3 cm apart on the map. How far apart are they in real life?",
        options: ["1.5 km", "15 km", "150 m", "150 km"],
        answerIndex: 0,
        explanation:
          "3 cm on the map is 3 × 50 000 = 150 000 cm in real life. 150 000 cm = 1500 m = 1.5 km. 150 m and 150 km both come from the wrong conversion — there are 100 cm in a metre and 1000 m in a kilometre, so 100 000 cm in a kilometre.",
        difficulty: "warmup",
        guideRef: "scale-and-maps",
        hints: ["Multiply by 50 000 first, then change the centimetres into kilometres."],
        strategy: "Convert units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q06",
        question: "Write 40 cm : 2 m as a ratio in its simplest form.",
        options: ["20 : 1", "1 : 50", "1 : 5", "5 : 1"],
        answerIndex: 2,
        explanation:
          "Use the same units first: 2 m = 200 cm, so the ratio is 40 : 200. Dividing both parts by 40 gives 1 : 5. 20 : 1 comes from ignoring the units and simplifying 40 : 2 — but 40 cm is much shorter than 2 m, so the first part must be the smaller one. 1 : 50 uses 2 m = 2000 cm.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "Can you compare centimetres with metres directly?",
          "Write 2 m in centimetres.",
          "Simplify 40 : 200 by dividing both parts by the same number.",
        ],
        strategy: "Convert to the same units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q07",
        question: "Write the ratio 8 : 20 in the form 1 : n.",
        options: ["1 : 13", "2 : 5", "1 : 0.4", "1 : 2.5"],
        answerIndex: 3,
        explanation:
          "To make the first part 1, divide both parts by 8: 8 ÷ 8 = 1 and 20 ÷ 8 = 2.5, giving 1 : 2.5. 1 : 13 comes from subtracting 7 from both parts — subtracting changes a ratio, dividing keeps it the same. 2 : 5 is the simplest whole-number form, but its first part is not 1. 1 : 0.4 divides 8 by 20.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "What must you divide 8 by to get 1?",
          "Whatever you do to one part of a ratio, do to the other.",
          "Divide 20 by 8 as well.",
        ],
        strategy: "Divide both parts by the first part",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q08",
        question:
          "The ratio of Aisha's stickers to Wei Ling's stickers is 5 : 3. Aisha has 14 more stickers than Wei Ling. How many stickers does Wei Ling have?",
        options: ["35", "21", "42", "56"],
        answerIndex: 1,
        explanation:
          "The difference between their shares is 5 − 3 = 2 parts, and that is 14 stickers, so one part is 7. Wei Ling has 3 × 7 = 21. 42 comes from treating the 14 as one part instead of two. 35 is Aisha's total, and 56 is both of them together.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Draw a bar model: 5 boxes for Aisha, 3 boxes for Wei Ling. Where are the extra 14 stickers?",
          "The 14 extra stickers fill 5 − 3 = 2 boxes.",
          "Find what one box is worth, then multiply by 3.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q09",
        question:
          "In a school chess CCA, {{3/8}} of the members are boys and the rest are girls. What is the ratio of boys to girls?",
        options: ["3 : 5", "3 : 8", "5 : 3", "3 : 11"],
        answerIndex: 0,
        explanation:
          "Out of every 8 members, 3 are boys and 8 − 3 = 5 are girls, so boys : girls = 3 : 5. 3 : 8 compares the boys with all the members, not with the girls. 3 : 11 wrongly adds 3 and 8.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: ["If the CCA had exactly 8 members, how many would be boys?", "How many of those 8 would be girls?"],
        strategy: "Try a specific number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q10",
        question:
          "A 400 g jar of peanut butter costs $5.20. A 250 g jar of the same brand costs $3.50. Which jar is better value?",
        options: [
          "The 250 g jar, because it costs less",
          "Both are equal value: each costs $1.30 per 100 g",
          "The 250 g jar, because $1.40 per 100 g means more peanut butter for your money",
          "The 400 g jar: $1.30 per 100 g against $1.40 per 100 g",
        ],
        answerIndex: 3,
        explanation:
          "Compare the price of the same amount. Per 100 g: $5.20 ÷ 4 = $1.30 and $3.50 ÷ 2.5 = $1.40, so the 400 g jar is cheaper for each 100 g. Choosing the 250 g jar because it 'costs less' compares total prices for different amounts of peanut butter. And $1.40 per 100 g is a higher price, not more peanut butter.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "Is a lower price the same thing as better value?",
          "Find the cost of 100 g from each jar.",
          "400 g is 4 lots of 100 g; 250 g is 2.5 lots of 100 g.",
        ],
        strategy: "Compare unit prices",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q11",
        question:
          "A recipe for 12 vegetable curry puffs uses 180 g of potato. How much potato is needed for 20 curry puffs?",
        options: ["188 g", "300 g", "108 g", "360 g"],
        answerIndex: 1,
        explanation:
          "One curry puff needs 180 ÷ 12 = 15 g of potato, so 20 need 20 × 15 = 300 g. 108 g comes from multiplying by {{12/20}} instead of {{20/12}} — more curry puffs must need more potato, not less. 188 g adds 8 g for the 8 extra puffs, which is adding, not scaling.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Will you need more or less than 180 g of potato?",
          "Find the potato needed for one curry puff.",
          "Multiply the amount for one puff by 20.",
        ],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q12",
        question:
          "The exchange rate is S$1 = RM3.40 (Malaysian ringgit). After a trip to Johor Bahru, Hana has RM170 left. How many Singapore dollars is that worth?",
        options: ["S$578", "S$166.60", "S$50", "S$5"],
        answerIndex: 2,
        explanation:
          "Each S$1 is worth RM3.40, so count the lots of RM3.40 in RM170: 170 ÷ 3.40 = 50, giving S$50. S$578 multiplies by 3.40, which converts the wrong way. Quick check: the same amount of money is a bigger number in ringgit than in dollars, so the dollar answer must be less than 170. S$166.60 subtracts the rate, which is not a conversion at all.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Should the number of Singapore dollars be more or less than 170?",
          "How many lots of RM3.40 make RM170?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q13",
        question: "A model car is built to a scale of 1 : 18. The real car is 4.5 m long. How long is the model?",
        options: ["25 cm", "8100 cm", "2.5 cm", "432 cm"],
        answerIndex: 0,
        explanation:
          "Every real length is 18 times the model length, so divide: 4.5 m = 450 cm and 450 ÷ 18 = 25 cm. 8100 cm (81 m) multiplies by 18 — that would make the model much bigger than the car. 432 cm subtracts 18 cm, but a scale is a multiplier, not something you take away.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Is the model bigger or smaller than the real car?",
          "Change 4.5 m into centimetres.",
          "Divide the real length in centimetres by 18.",
        ],
        strategy: "Use the scale as a multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q14",
        question:
          "Arjun, Priya and Marcus share $360 in the ratio 2 : 3 : 4. How much more does Marcus get than Arjun?",
        options: ["$40", "$160", "$90", "$80"],
        answerIndex: 3,
        explanation:
          "There are 2 + 3 + 4 = 9 parts, so one part is $360 ÷ 9 = $40. Marcus has 4 − 2 = 2 more parts than Arjun: 2 × $40 = $80. $40 is just one part — the gap is two parts — and $160 is Marcus's whole share, not the difference.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "How many parts are there in total?",
          "Find the value of one part.",
          "How many more parts does Marcus have than Arjun?",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q15",
        question: "Mei and Jun share some money in the ratio 4 : 5. Which statement is true?",
        options: [
          "Mei gets {{4/5}} of the money",
          "Jun gets {{1/5}} more than Mei",
          "Jun gets {{5/9}} of the money",
          "Mei's share is {{4/9}} of Jun's share",
        ],
        answerIndex: 2,
        explanation:
          "There are 4 + 5 = 9 parts and Jun has 5 of them, so Jun gets {{5/9}} of the money. Mei gets {{4/9}} of the money — {{4/5}} is Mei's share compared with Jun's, not with the total. Jun has one extra part on top of Mei's 4, so he gets {{1/4}} more than Mei, not {{1/5}} more. Check with $90: Mei $40, Jun $50.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "How many parts are there altogether?",
          "For each statement ask: a fraction of WHAT — the total, or the other person's share?",
          "Try it with $90: Mei gets $40 and Jun gets $50.",
        ],
        strategy: "Try a specific number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q16",
        question:
          "A taxi's fares are shown below.\n\n| Distance (km) | 2 | 4 | 6 |\n|---|---|---|---|\n| Fare ($) | 6 | 9 | 12 |\n\nIs the fare directly proportional to the distance?",
        options: [
          "Yes, because the fare goes up by $3 for every 2 km",
          "No, because doubling the distance does not double the fare",
          "Yes, because fare ÷ distance is the same in every column",
          "Yes, because both quantities increase together",
        ],
        answerIndex: 1,
        explanation:
          "In direct proportion, doubling one quantity doubles the other. Here 2 km → 4 km doubles the distance, but $6 → $9 does not double the fare (there is a fixed starting charge of $3). Going up by $3 each time makes a steady pattern, but not a proportional one. Fare ÷ distance gives 3, 2.25 and 2, which are not equal, and 'both increase together' is true of many relationships that are not proportional.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "What should happen to the fare if the distance doubles?",
          "Work out fare ÷ distance for each column.",
          "Following the pattern backwards, what would a 0 km ride cost?",
        ],
        strategy: "Check for a constant multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q17",
        question:
          "In a hall, the ratio of boys to girls is 3 : 5. Then 12 more boys come in and nobody leaves. Now there are equal numbers of boys and girls. How many girls are in the hall?",
        options: ["30", "18", "60", "48"],
        answerIndex: 0,
        explanation:
          "The girls don't change, so keep them at 5 parts. To draw level, the boys must grow from 3 parts to 5 parts, so the 12 new boys are 2 parts: one part is 6 and there are 5 × 6 = 30 girls. 60 comes from treating the 12 boys as one part. 18 is the number of boys at the start.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Which group stays the same size?",
          "For the numbers to be equal, how many parts must the boys grow to?",
          "The 12 new boys fill the gap between 3 parts and 5 parts.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q18",
        question:
          "On a map with scale 1 : 25 000, a rectangular park measures 4 cm by 6 cm. What is the real area of the park?",
        diagram: `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular park drawn on a map, 6 cm wide and 4 cm tall, with the map scale 1 : 25 000 written underneath"><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><rect x="70" y="30" width="180" height="120" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><text x="160" y="95" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Park</text><text x="160" y="22" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="62" y="94" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 cm</text><text x="160" y="180" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#334155">Scale 1 : 25 000</text></svg>`,
        options: ["60 m²", "6 km²", "24 km²", "1.5 km²"],
        answerIndex: 3,
        explanation:
          "Change each length first: 4 × 25 000 = 100 000 cm = 1 km and 6 × 25 000 = 150 000 cm = 1.5 km. So the real area is 1 × 1.5 = 1.5 km². 60 m² comes from multiplying the map area (24 cm²) by 25 000 — but the scale multiplies lengths, and an area uses two lengths, so the area is really multiplied by 25 000 × 25 000. 24 km² pretends each centimetre is a kilometre.",
        difficulty: "challenge",
        guideRef: "scale-and-maps",
        hints: [
          "The scale tells you how lengths change. Is an area a length?",
          "Turn each side of the park into a real length in kilometres first.",
          "4 cm on the map is 4 × 25 000 = 100 000 cm in real life.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q19",
        question:
          "A pancake recipe for 8 people uses 200 g of flour, 3 eggs and 500 ml of milk. Zara has 750 g of flour, 10 eggs and 1.5 litres of milk. Keeping the recipe in proportion, what is the greatest number of people she can make pancakes for?",
        options: ["30", "26", "24", "27"],
        answerIndex: 2,
        explanation:
          "Check every ingredient. Flour: 750 ÷ 200 = 3.75 batches (30 people). Eggs: 10 ÷ 3 ≈ 3.33 batches (about 26 people). Milk: 1500 ÷ 500 = 3 batches (24 people). The milk runs out first, so 24 people — which needs 600 g flour, 9 eggs and 1500 ml milk. 30 only checks the flour; the ingredient that runs out first sets the limit.",
        difficulty: "challenge",
        guideRef: "recipes-and-currency",
        hints: [
          "Which ingredient will run out first?",
          "Work out how many 'batches for 8' each ingredient allows.",
          "Change 1.5 litres into millilitres before you compare.",
        ],
        strategy: "Find the limiting ingredient",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m1-q20",
        question:
          "6 workers can build a wall in 10 days. After 4 days, 3 more workers join them. Everyone works at the same rate. How many days does the whole job take?",
        options: ["4 days", "8 days", "{{6 2/3}} days", "13 days"],
        answerIndex: 1,
        explanation:
          "The job is 6 × 10 = 60 worker-days. In the first 4 days, 6 × 4 = 24 worker-days are done, leaving 36. Nine workers finish that in 36 ÷ 9 = 4 more days, so the total is 4 + 4 = 8 days. {{6 2/3}} days pretends all 9 workers were there from the start. 4 days is only the time after the new workers arrive. 13 days treats it as direct proportion — more workers can't take longer.",
        difficulty: "challenge",
        guideRef: "inverse-proportion",
        hints: [
          "Measure the whole job in 'worker-days'.",
          "How much of the job is done in the first 4 days?",
          "Share the remaining worker-days between 9 workers.",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 2
  // =========================================================================
  {
    id: "ratio-proportion-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q01",
        question: "A smoothie recipe for 2 people uses 3 bananas. How many bananas are needed for 8 people?",
        options: ["9", "24", "12", "6"],
        answerIndex: 2,
        explanation:
          "8 people is 4 times as many as 2 people, so use 4 × 3 = 12 bananas. 9 comes from adding 6 bananas because there are 6 more people — proportion multiplies rather than adds. 24 multiplies by 8 instead of by 4.",
        difficulty: "warmup",
        guideRef: "recipes-and-currency",
        hints: ["How many times bigger is 8 than 2?"],
        strategy: "Find the scale factor",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q02",
        question: "Which ratio is equivalent to 6 : 15?",
        options: ["2 : 5", "3 : 12", "1 : 10", "12 : 21"],
        answerIndex: 0,
        explanation:
          "Divide both parts by 3: 6 : 15 = 2 : 5. 3 : 12 subtracts 3 from each part, 1 : 10 subtracts 5, and 12 : 21 adds 6 — adding or subtracting the same number changes a ratio. Only multiplying or dividing both parts by the same number keeps it equivalent.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["What number divides into both 6 and 15?"],
        strategy: "Divide by the HCF",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q03",
        question:
          "A scale drawing of a classroom uses 1 cm to represent 2 m. The classroom is 9 m long. How long is it on the drawing?",
        options: ["18 cm", "7 cm", "11 cm", "4.5 cm"],
        answerIndex: 3,
        explanation:
          "Each 1 cm stands for 2 m, so 9 m needs 9 ÷ 2 = 4.5 cm. 18 cm multiplies by 2 — that would stand for 36 m. 7 cm and 11 cm subtract or add 2, but a scale works by multiplying and dividing.",
        difficulty: "warmup",
        guideRef: "scale-and-maps",
        hints: ["How many lots of 2 m are there in 9 m?"],
        strategy: "Use the scale as a multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q04",
        question: "At an animal shelter, the ratio of cats to dogs is 4 : 1. Which statement must be true?",
        options: [
          "{{1/4}} of the animals are dogs",
          "{{1/5}} of the animals are dogs",
          "There are 4 more cats than dogs",
          "{{4/5}} of the animals are dogs",
        ],
        answerIndex: 1,
        explanation:
          "For every 4 cats there is 1 dog, so each group of 5 animals has 1 dog: {{1/5}} of the animals are dogs. {{1/4}} compares dogs with cats instead of with all the animals. '4 more cats' reads the ratio as a difference — with 20 cats and 5 dogs there are 15 more cats. {{4/5}} is the fraction that are cats.",
        difficulty: "warmup",
        guideRef: "ratios-and-fractions",
        hints: ["How many animals are in one group of 4 cats and 1 dog?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q05",
        question: "A printer prints 45 pages in 3 minutes. At this rate, how many pages does it print in 7 minutes?",
        options: ["49", "315", "105", "135"],
        answerIndex: 2,
        explanation:
          "In one minute it prints 45 ÷ 3 = 15 pages, so in 7 minutes it prints 7 × 15 = 105 pages. 315 multiplies 45 by 7, forgetting that 45 pages took 3 minutes, not 1. 49 adds 4 pages for the 4 extra minutes.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["How many pages does it print in one minute?"],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q06",
        question: "Simplify the ratio 1.2 : 0.8 fully, using whole numbers.",
        options: ["3 : 2", "3 : 20", "12 : 8", "2 : 3"],
        answerIndex: 0,
        explanation:
          "Multiply both parts by 10 to clear the decimals: 12 : 8. Then divide by the HCF, 4, to get 3 : 2. 3 : 20 comes from multiplying the parts by different numbers (1.2 × 10 = 12 but 0.8 × 100 = 80) — both parts must be multiplied by the same number. 12 : 8 is right so far but not fully simplified.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "How can you turn both decimals into whole numbers at the same time?",
          "Multiply both parts by 10.",
          "Now simplify 12 : 8 using the HCF.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q07",
        question:
          "Ethan and Zara share some sweets in the ratio 4 : 7. Zara gets 35 sweets. How many sweets were there altogether?",
        options: ["20", "55", "385", "77"],
        answerIndex: 1,
        explanation:
          "Zara's 7 parts are 35 sweets, so one part is 35 ÷ 7 = 5. Altogether there are 4 + 7 = 11 parts: 11 × 5 = 55 sweets. 20 is Ethan's share, not the total. 385 multiplies 35 by 11, treating Zara's whole share as one part. 77 treats the 7 in the ratio as the size of one part.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Zara's 35 sweets are how many parts?",
          "Find the value of one part.",
          "How many parts are there altogether?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q08",
        question:
          "At a hawker centre, the ratio of vegetarian stalls to other stalls is 2 : 9. There are 44 stalls. How many are vegetarian?",
        options: ["About 9.8", "36", "4", "8"],
        answerIndex: 3,
        explanation:
          "There are 2 + 9 = 11 parts, so vegetarian stalls are {{2/11}} of the 44 stalls: 44 ÷ 11 = 4 per part, and 2 × 4 = 8. About 9.8 comes from using {{2/9}}, which compares vegetarian stalls with the other stalls rather than with all of them (and a number of stalls can't be 9.8!). 4 is one part, and 36 is the other stalls.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "What fraction of ALL the stalls are vegetarian?",
          "There are 2 + 9 = 11 parts in total.",
          "Find {{2/11}} of 44.",
        ],
        strategy: "Turn the ratio into a fraction",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q09",
        question:
          "A shop sells bottled water in three pack sizes.\n\n| Pack | Price |\n|---|---|\n| 6 bottles | $3.30 |\n| 12 bottles | $6.00 |\n| 24 bottles | $12.48 |\n\nWhich pack is the best value?",
        options: ["The 6-bottle pack", "The 24-bottle pack", "The 12-bottle pack", "All three are the same value"],
        answerIndex: 2,
        explanation:
          "Price per bottle: $3.30 ÷ 6 = $0.55, $6.00 ÷ 12 = $0.50 and $12.48 ÷ 24 = $0.52. The 12-bottle pack is cheapest per bottle. The 24-bottle pack is tempting because 'bigger packs are always better value', but at $0.52 a bottle it costs more per bottle than the 12-pack.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "Compare like with like: the price of one bottle in each pack.",
          "Divide each price by the number of bottles.",
          "Is the biggest pack always the cheapest per bottle? Check.",
        ],
        strategy: "Compare unit prices",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q10",
        question:
          "The exchange rate is S$1 = US$0.75. Mei changes S$240 into US dollars before a trip. How many US dollars does she get?",
        options: ["US$180", "US$320", "US$240.75", "US$239.25"],
        answerIndex: 0,
        explanation:
          "Each S$1 gives US$0.75, so S$240 gives 240 × 0.75 = US$180. US$320 divides by 0.75 instead — but each Singapore dollar buys less than one US dollar, so she must get fewer US dollars than the 240 she started with. Adding or subtracting 0.75 is not a conversion.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Does S$1 buy more or less than US$1 at this rate?",
          "So should the answer be more or less than 240?",
          "Each of her 240 dollars becomes US$0.75.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q11",
        question:
          "Rectangle B is an enlargement of rectangle A. A is 4 cm by 6 cm. The shorter side of B is 10 cm. How long is the longer side of B?",
        diagram: `<svg viewBox="0 0 330 170" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle A is 4 cm by 6 cm. Rectangle B, an enlargement of A, has a shorter side of 10 cm and an unknown longer side"><rect x="0" y="0" width="330" height="170" fill="#ffffff"/><rect x="50" y="100" width="60" height="40" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="80" y="125" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="80" y="93" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="44" y="124" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 cm</text><rect x="160" y="40" width="150" height="100" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="235" y="95" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text><text x="235" y="33" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">?</text><text x="154" y="94" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">10 cm</text></svg>`,
        options: ["12 cm", "2.5 cm", "16 cm", "15 cm"],
        answerIndex: 3,
        explanation:
          "The scale factor is 10 ÷ 4 = 2.5, so every length is multiplied by 2.5: 6 × 2.5 = 15 cm. 12 cm adds 6 cm to each side (4 + 6 = 10, so 6 + 6 = 12) — adding keeps the difference the same, but an enlargement keeps the ratio the same: 4 : 6 = 10 : 15. 2.5 is the scale factor, not a length.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "What do you multiply 4 cm by to get 10 cm?",
          "Use the same multiplier on the other side.",
          "The scale factor is 10 ÷ 4.",
        ],
        strategy: "Use the scale factor as a multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q12",
        question:
          "A trail mix uses 250 g of raisins, 1.5 kg of peanuts and 750 g of cashews. Write the ratio raisins : peanuts : cashews in its simplest form.",
        options: ["1 : 60 : 3", "1 : 6 : 3", "5 : 3 : 15", "1 : 0.006 : 3"],
        answerIndex: 1,
        explanation:
          "Put everything in grams: 250 : 1500 : 750. Dividing every part by 250 gives 1 : 6 : 3. 5 : 3 : 15 uses 1.5 kg = 150 g and 1 : 60 : 3 uses 1.5 kg = 15 000 g — but 1 kg = 1000 g, so 1.5 kg = 1500 g. 1 : 0.006 : 3 forgets to convert at all.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "Are all three amounts in the same unit?",
          "Write 1.5 kg in grams.",
          "Divide all three parts by 250.",
        ],
        strategy: "Convert to the same units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q13",
        question:
          "This vegetable soup recipe serves 6.\n\n| Ingredient | Amount |\n|---|---|\n| Carrots | 450 g |\n| Red lentils | 180 g |\n| Vegetable stock | 1.2 litres |\n\nWei Ling makes the soup for 4 people. How much stock does she need?",
        options: ["0.6 litres", "1.8 litres", "0.8 litres", "1 litre"],
        answerIndex: 2,
        explanation:
          "For one person: 1.2 ÷ 6 = 0.2 litres. For 4 people: 4 × 0.2 = 0.8 litres. 1.8 litres multiplies by {{6/4}} instead of {{4/6}} — fewer people must need less stock, not more. 0.6 litres halves the recipe, but 4 people is {{2/3}} of 6, not half.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Will she need more or less than 1.2 litres?",
          "Find the stock needed for one person.",
          "Multiply the amount for one person by 4.",
        ],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q14",
        question:
          "Jun, Hana and Ravi share some cards in the ratio 1 : 3 : 5. Ravi gets 24 more cards than Jun. How many cards are there altogether?",
        options: ["54", "216", "30", "72"],
        answerIndex: 0,
        explanation:
          "Ravi has 5 − 1 = 4 more parts than Jun, and that gap is 24 cards, so one part is 24 ÷ 4 = 6. Altogether there are 1 + 3 + 5 = 9 parts: 9 × 6 = 54 cards. 216 treats the 24 as a single part. 30 is only Ravi's share.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "How many more parts does Ravi have than Jun?",
          "Those extra parts are worth 24 cards. What is one part worth?",
          "Find the total of all 9 parts.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q15",
        question:
          "After a monsoon storm, 4 pumps take 9 hours to empty a flooded car park. How long would 6 identical pumps take?",
        options: ["13.5 hours", "6 hours", "11 hours", "7 hours"],
        answerIndex: 1,
        explanation:
          "The job needs 4 × 9 = 36 pump-hours. Shared between 6 pumps, that is 36 ÷ 6 = 6 hours. 13.5 hours treats it as direct proportion — but more pumps should finish faster, not slower. 7 hours takes off 1 hour per extra pump, which is not how rates work.",
        difficulty: "core",
        guideRef: "inverse-proportion",
        hints: [
          "With more pumps, will the job take more or less time?",
          "How many 'pump-hours' does the whole job need?",
          "Share the pump-hours among 6 pumps.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q16",
        question:
          "A map has a scale of 1 : 200 000. Two towns are 7 km apart in real life. How far apart are they on the map?",
        options: ["35 cm", "0.35 cm", "1 400 000 km", "3.5 cm"],
        answerIndex: 3,
        explanation:
          "Real distances are 200 000 times map distances, so divide. 7 km = 7000 m = 700 000 cm, and 700 000 ÷ 200 000 = 3.5 cm. 35 cm and 0.35 cm come from converting 7 km to centimetres wrongly (1 km = 100 000 cm). 1 400 000 km multiplies by the scale — going from real to map you divide.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Going from real life to the map — multiply or divide?",
          "Change 7 km into centimetres: 1 km = 1000 m and 1 m = 100 cm.",
          "Divide 700 000 by 200 000.",
        ],
        strategy: "Convert units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q17",
        question:
          "In a class, the ratio of girls to boys is 3 : 4. {{2/3}} of the girls and {{1/2}} of the boys walk to school. What fraction of the whole class walks to school?",
        options: ["{{7/12}}", "{{3/5}}", "{{4/7}}", "{{2/7}}"],
        answerIndex: 2,
        explanation:
          "Pick a class that fits: 18 girls and 24 boys (ratio 3 : 4, 42 pupils). Walkers: {{2/3}} of 18 = 12 and {{1/2}} of 24 = 12, so 24 of the 42 walk, and {{24/42 = 4/7}}. {{7/12}} is the mean of {{2/3}} and {{1/2}}, which ignores that there are more boys than girls. {{3/5}} adds tops and bottoms, and {{2/7}} counts only the girls who walk.",
        difficulty: "challenge",
        guideRef: "ratios-and-fractions",
        hints: [
          "Choose actual numbers of girls and boys in the ratio 3 : 4.",
          "Pick numbers that {{2/3}} and {{1/2}} work nicely on — try 18 girls.",
          "Count all the walkers, then divide by the size of the class.",
        ],
        strategy: "Try a specific number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q18",
        question:
          "The exchange rates are S$1 = RM3.40 and S$1 = ¥110. Using these rates, how many Japanese yen is RM1 worth, to the nearest yen?",
        options: ["¥32", "¥374", "¥113", "¥107"],
        answerIndex: 0,
        explanation:
          "Both rates describe S$1, so RM3.40 and ¥110 are worth the same. Then RM1 = 110 ÷ 3.40 ≈ ¥32.4, which is ¥32 to the nearest yen. ¥374 multiplies 110 by 3.40 — but one ringgit is worth less than one Singapore dollar, so it must buy fewer than 110 yen. ¥113 and ¥107 add or subtract 3.40, which mixes up two different currencies.",
        difficulty: "challenge",
        guideRef: "recipes-and-currency",
        hints: [
          "Both rates start from S$1. What does that tell you about RM3.40 and ¥110?",
          "Is RM1 worth more or less than S$1? So more or less than ¥110?",
          "If RM3.40 = ¥110, divide both sides by 3.40.",
        ],
        strategy: "Link through a common amount",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q19",
        question:
          "8 identical machines make 240 bottles in 5 minutes. At the same rate, how many bottles do 6 machines make in 7 minutes?",
        options: ["336", "252", "180", "448"],
        answerIndex: 1,
        explanation:
          "Find the rate for one machine for one minute: 240 ÷ 8 ÷ 5 = 6 bottles. Then 6 machines for 7 minutes make 6 × 6 × 7 = 252 bottles. 336 adjusts only for the time and forgets there are fewer machines. 180 adjusts only for the machines. 448 multiplies by {{8/6}} instead of {{6/8}}, giving more bottles from fewer machines.",
        difficulty: "challenge",
        guideRef: "direct-proportion",
        hints: [
          "Two things change here: the number of machines and the time.",
          "How many bottles does ONE machine make in ONE minute?",
          "240 bottles ÷ 8 machines ÷ 5 minutes.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m2-q20",
        question:
          "The ratio of Aisha's money to Jun's money is 2 : 3. The ratio of Jun's money to Priya's money is 4 : 5. Together they have $105. How much does Priya have?",
        options: ["$52.50", "$36", "$24", "$45"],
        answerIndex: 3,
        explanation:
          "Jun is in both ratios, as 3 parts and as 4 parts, so make his parts match: 2 : 3 = 8 : 12 and 4 : 5 = 12 : 15. Now Aisha : Jun : Priya = 8 : 12 : 15, which is 35 parts, so one part is $105 ÷ 35 = $3 and Priya has 15 × $3 = $45. $52.50 comes from gluing the ratios together as 2 : 3 : 5 — but Jun's '3' and '4' are parts of different sizes. $36 is Jun's share and $24 is Aisha's.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Jun appears in both ratios. Is he 3 parts or 4 parts?",
          "Rewrite both ratios so that Jun has the same number of parts — 12 works.",
          "Aisha : Jun : Priya = 8 : 12 : 15. Now share $105.",
        ],
        strategy: "Make the common part match",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 3
  // =========================================================================
  {
    id: "ratio-proportion-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q01",
        question: "The bar model shows how Marcus and Siti share $56. How much does Siti get?",
        diagram: `<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model: Marcus has 3 equal boxes and Siti has 4 equal boxes of the same size; all 7 boxes together are worth 56 dollars"><rect x="0" y="0" width="320" height="110" fill="#ffffff"/><text x="70" y="39" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">Marcus</text><rect x="80" y="20" width="40" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="120" y="20" width="40" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="160" y="20" width="40" height="28" fill="#c7d2fe" stroke="#1f2937"/><text x="70" y="79" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">Siti</text><rect x="80" y="60" width="40" height="28" fill="#fde68a" stroke="#1f2937"/><rect x="120" y="60" width="40" height="28" fill="#fde68a" stroke="#1f2937"/><rect x="160" y="60" width="40" height="28" fill="#fde68a" stroke="#1f2937"/><rect x="200" y="60" width="40" height="28" fill="#fde68a" stroke="#1f2937"/><path d="M252 20 H262 V88 H252" fill="none" stroke="#334155" stroke-width="2"/><text x="270" y="59" font-size="14" font-family="sans-serif" fill="#1f2937">$56</text></svg>`,
        options: ["$24", "$32", "$14", "$8"],
        answerIndex: 1,
        explanation:
          "The bar has 3 + 4 = 7 equal boxes worth $56 altogether, so one box is $56 ÷ 7 = $8 and Siti's 4 boxes are worth $32. $14 comes from dividing $56 by Siti's 4 boxes only, forgetting that Marcus's boxes are part of the $56 too. $24 is Marcus's share.",
        difficulty: "warmup",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many equal boxes are there altogether?"],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q02",
        question: "Write 45 minutes : 2 hours as a ratio in its simplest form.",
        options: ["45 : 2", "9 : 24", "9 : 40", "3 : 8"],
        answerIndex: 3,
        explanation:
          "2 hours = 120 minutes, so the ratio is 45 : 120. The HCF is 15, giving 3 : 8. 9 : 40 uses 2 hours = 200 minutes — there are 60 minutes in an hour, not 100. 9 : 24 is equivalent but can still be divided by 3. 45 : 2 mixes units.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["Write both times in minutes first."],
        strategy: "Convert to the same units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q03",
        question: "The exchange rate is S$1 = 25 Thai baht. How many baht do you get for S$40?",
        options: ["1000 baht", "1.6 baht", "65 baht", "100 baht"],
        answerIndex: 0,
        explanation:
          "Each S$1 gives 25 baht, so S$40 gives 40 × 25 = 1000 baht. 1.6 baht divides instead of multiplying — that would give you less for S$40 than for S$1! 65 baht adds 40 and 25.",
        difficulty: "warmup",
        guideRef: "recipes-and-currency",
        hints: ["Each dollar gives 25 baht. How many dollars are being changed?"],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q04",
        question: "A tap fills 12 litres in 4 minutes. At the same rate, how long does it take to fill 30 litres?",
        options: ["40 minutes", "22 minutes", "10 minutes", "7.5 minutes"],
        answerIndex: 2,
        explanation:
          "The tap fills 12 ÷ 4 = 3 litres per minute, so 30 litres takes 30 ÷ 3 = 10 minutes. 22 minutes adds 18 minutes for the 18 extra litres — but each minute gives 3 litres, not 1. 7.5 minutes divides 30 by 4, and 40 minutes multiplies by {{4/3}} the wrong way round.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["How many litres flow in one minute?"],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q05",
        question:
          "On a scale drawing, 1 cm represents 5 m. A garden is 3.5 cm wide on the drawing. How wide is the real garden?",
        options: ["8.5 m", "17.5 m", "0.7 m", "175 m"],
        answerIndex: 1,
        explanation:
          "Each centimetre stands for 5 m, so 3.5 cm stands for 3.5 × 5 = 17.5 m. 0.7 m divides by 5 instead of multiplying — the real garden must be bigger than the drawing. 8.5 m adds 5 instead of multiplying.",
        difficulty: "warmup",
        guideRef: "scale-and-maps",
        hints: ["Each 1 cm is 5 m. How many centimetres are there?"],
        strategy: "Use the scale as a multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q06",
        question: "In a school, the ratio of boys to girls is 7 : 8. Which of these could be the total number of pupils?",
        options: ["560", "700", "1000", "600"],
        answerIndex: 3,
        explanation:
          "Every 'group' of 7 boys and 8 girls has 15 pupils, so the total must be a multiple of 15 — boys are {{7/15}} of the school. 600 = 40 × 15, giving 280 boys and 320 girls. 560 is a multiple of 7 × 8 = 56, but you add the parts to get the group size, you don't multiply them. 700 is a multiple of 7 only and 1000 of 8 only.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "How many pupils are in one complete group of 7 boys and 8 girls?",
          "So the total must be a multiple of what?",
          "Test each number: does it divide exactly?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q07",
        question:
          "Ravi simplifies 2.5 : 4 like this:\n\n    2.5 : 4 → 25 : 4, which cannot be simplified.\n\nWhat was his mistake?",
        options: [
          "He multiplied only the first part by 10; it should be 25 : 40 = 5 : 8",
          "He should have rounded 2.5 to 3 to get 3 : 4",
          "He should have subtracted 1.5 from both parts to get 1 : 2.5",
          "Nothing — 25 : 4 is the correct simplest form",
        ],
        answerIndex: 0,
        explanation:
          "Both parts must be multiplied by the same number: 2.5 : 4 = 25 : 40, which simplifies (÷ 5) to 5 : 8. Multiplying only one part changes the ratio — 25 : 4 has the first part bigger, but 2.5 is smaller than 4. Rounding to 3 : 4 changes the values, and subtracting 1.5 from both gives 1 : 2.5, which is a different ratio.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "In 2.5 : 4, which part is bigger? What about in 25 : 4?",
          "Whatever you do to one part of a ratio, you must do to the other.",
          "Multiply both parts by 10, then simplify.",
        ],
        strategy: "Check your answer makes sense",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q08",
        question:
          "Wei Ling, Jun and Mei share some marbles in the ratio 2 : 5 : 6. Mei gets 42 marbles. How many marbles does Wei Ling get?",
        options: ["84", "21", "14", "35"],
        answerIndex: 2,
        explanation:
          "Mei's 6 parts are 42 marbles, so one part is 42 ÷ 6 = 7. Wei Ling has 2 parts: 2 × 7 = 14. 84 treats Mei's 42 as one part. 21 halves 42 instead of finding one part. 35 is Jun's share.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many parts is Mei's share?", "Find the value of one part.", "Wei Ling has 2 parts."],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q09",
        question: "A 1.5 kg bag of flour costs $4.85. Estimate the cost of 6 kg of the same flour.",
        options: ["About $15", "About $20", "About $29", "About $10"],
        answerIndex: 1,
        explanation:
          "6 kg is 4 bags of 1.5 kg (4 × 1.5 = 6), and each bag is about $5, so about 4 × $5 = $20 (exactly $19.40). About $29 multiplies $4.85 by 6, treating it as the price of 1 kg. About $10 just doubles, and about $15 assumes 6 kg is 3 bags.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: ["How many 1.5 kg bags make 6 kg?", "Round $4.85 to a friendly number first."],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q10",
        question:
          "Triangle Q is an enlargement of triangle P. P has sides 3 cm, 4 cm and 5 cm. The side of Q that matches P's 3 cm side is 4.5 cm. How long is Q's longest side?",
        diagram: `<svg viewBox="0 0 360 185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right-angled triangle P with sides 3 cm, 4 cm and 5 cm, and a larger right-angled triangle Q whose shortest side is 4.5 cm and whose longest side is unknown"><rect x="0" y="0" width="360" height="185" fill="#ffffff"/><polygon points="40,150 120,150 40,90" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><path d="M40 140 H50 V150" fill="none" stroke="#1f2937"/><text x="58" y="142" font-size="13" font-family="sans-serif" fill="#1f2937">P</text><text x="34" y="124" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">3 cm</text><text x="80" y="168" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="88" y="112" font-size="12" font-family="sans-serif" fill="#1f2937">5 cm</text><polygon points="190,150 310,150 190,60" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><path d="M190 140 H200 V150" fill="none" stroke="#1f2937"/><text x="208" y="142" font-size="13" font-family="sans-serif" fill="#1f2937">Q</text><text x="184" y="109" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">4.5 cm</text><text x="258" y="98" font-size="13" font-family="sans-serif" fill="#1f2937">?</text></svg>`,
        options: ["6.5 cm", "6 cm", "3.3 cm", "7.5 cm"],
        answerIndex: 3,
        explanation:
          "Matching sides: P's 3 cm side becomes 4.5 cm on Q, so the scale factor is 4.5 ÷ 3 = 1.5. The longest side becomes 5 × 1.5 = 7.5 cm. 6.5 cm adds 1.5 cm instead of multiplying by 1.5. 6 cm is the image of the 4 cm side, not the 5 cm side. 3.3 cm divides by 1.5 — but Q is the bigger triangle.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Which side of Q matches the 3 cm side of P?",
          "Find the scale factor from that pair of matching sides.",
          "Multiply P's longest side by the scale factor.",
        ],
        strategy: "Use the scale factor as a multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q11",
        question:
          "This recipe makes 16 cookies.\n\n| Ingredient | Amount |\n|---|---|\n| Butter | 120 g |\n| Sugar | 90 g |\n| Flour | 200 g |\n\nAisha has only 150 g of flour but plenty of everything else. She uses all her flour and keeps the recipe in proportion. How much sugar should she use?",
        options: ["67.5 g", "40 g", "120 g", "90 g"],
        answerIndex: 0,
        explanation:
          "She has {{150/200 = 3/4}} of the flour, so she makes {{3/4}} of the recipe: {{3/4}} of 90 g = 67.5 g of sugar. 40 g subtracts the same 50 g she is short of flour — recipes scale by multiplying, not subtracting. 120 g multiplies by {{4/3}}, which means more sugar for less flour. 90 g forgets to scale the sugar at all.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "What fraction of the recipe's flour does she have?",
          "Every ingredient must be scaled by the same multiplier.",
          "Multiply 90 g by {{3/4}}.",
        ],
        strategy: "Find the multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q12",
        question:
          "Hana and Ethan share 60 sweets in the ratio 3 : 7. Then Ethan gives Hana 9 of his sweets. What is the new ratio of Hana's sweets to Ethan's, in its simplest form?",
        options: ["9 : 14", "1 : 1", "9 : 11", "11 : 9"],
        answerIndex: 2,
        explanation:
          "First share: 10 parts, so 6 sweets per part — Hana 18, Ethan 42. After the gift: Hana 18 + 9 = 27 and Ethan 42 − 9 = 33. So 27 : 33 = 9 : 11. 9 : 14 (which is 27 : 42) adds 9 to Hana but forgets to take 9 from Ethan. 11 : 9 has the parts in the wrong order.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "First find how many sweets each of them has.",
          "Add 9 to Hana's share and take 9 from Ethan's.",
          "Simplify the new ratio using the HCF.",
        ],
        strategy: "Work step by step",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q13",
        question:
          "Arjun changes S$500 into yen at S$1 = ¥110. In Japan he spends ¥43 000. At the airport he changes his leftover yen back at ¥120 = S$1. How many Singapore dollars does he get back?",
        options: ["S$109.09", "S$141.67", "S$1 440 000", "S$100"],
        answerIndex: 3,
        explanation:
          "S$500 buys 500 × 110 = ¥55 000. After spending ¥43 000 he has ¥12 000 left, and 12 000 ÷ 120 = 100, so he gets S$100. S$109.09 changes the yen back at the old rate of ¥110. S$1 440 000 multiplies by 120 instead of dividing — a huge amount for some leftover holiday money.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "How many yen does he get at the start?",
          "How many yen are left over?",
          "How many lots of ¥120 are in the yen left over?",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q14",
        question:
          "At 80 km/h, a coach takes 3 hours for a journey. How long would the same journey take at 60 km/h?",
        options: ["2.25 hours", "4 hours", "3 hours 45 minutes", "3 hours 20 minutes"],
        answerIndex: 1,
        explanation:
          "The distance stays the same: 80 × 3 = 240 km. At 60 km/h it takes 240 ÷ 60 = 4 hours. 2.25 hours treats speed and time as directly proportional — but going slower must take longer. 3 hours 45 minutes assumes '25% slower means 25% longer', which is not how inverse proportion works.",
        difficulty: "core",
        guideRef: "inverse-proportion",
        hints: [
          "Going slower — will it take more time or less?",
          "What stays the same for both journeys?",
          "Find the distance, then divide it by the new speed.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q15",
        question:
          "Drink X is made with cordial and water in the ratio 2 : 9. Drink Y uses cordial and water in the ratio 3 : 13. Which drink is stronger (more cordial for the amount of water)?",
        options: [
          "Drink Y: written as 1 : n, it is 1 : 4.33… against 1 : 4.5",
          "Drink X, because 9 parts of water is less than 13",
          "Drink X, because its water is only 7 parts more than its cordial, while Drink Y's is 10 more",
          "They are equally strong, because both are about 1 : 4",
        ],
        answerIndex: 0,
        explanation:
          "Write both in the form 1 : n by dividing by the cordial part: 2 : 9 = 1 : 4.5 and 3 : 13 = 1 : 4.33…. Drink Y has less water for each part of cordial, so it is stronger. (Or scale to 6 parts of cordial: 6 : 27 against 6 : 26.) Comparing 9 with 13 ignores that the drinks use different amounts of cordial, and comparing 7 with 10 compares by subtracting, not by ratio.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "Make the cordial part the same in both ratios.",
          "Write each ratio in the form 1 : n.",
          "Less water for each part of cordial means a stronger drink.",
        ],
        strategy: "Write in the form 1 : n",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q16",
        question: "Jun's savings are {{3/4}} of Zara's savings. What is the ratio of Jun's savings to Zara's savings?",
        options: ["3 : 7", "3 : 1", "3 : 4", "4 : 3"],
        answerIndex: 2,
        explanation:
          "If Zara has 4 parts, Jun has {{3/4}} of that, which is 3 parts — so Jun : Zara = 3 : 4. 3 : 1 would be right if Jun had {{3/4}} of the *total*, but here the fraction is of Zara's savings. 4 : 3 has the order reversed. Check with numbers: Zara $40, Jun $30.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "Is {{3/4}} a fraction of the total, or a fraction of Zara's savings?",
          "Suppose Zara has $40. How much does Jun have?",
        ],
        strategy: "Try a specific number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q17",
        question:
          "Is this statement always, sometimes or never true?\n\n> If you add the same positive number to both parts of a ratio a : b, you get an equivalent ratio.",
        options: [
          "Always true",
          "Sometimes true: only when a = b",
          "Sometimes true: only when a and b are both even",
          "Never true",
        ],
        answerIndex: 1,
        explanation:
          "Try cases. 2 : 3 → add 1 → 3 : 4, a different ratio because {{2/3}} ≠ {{3/4}}. But 5 : 5 → add 1 → 6 : 6, still 1 : 1. Adding the same amount keeps the ratio only when the two parts are equal. 'Always true' is the adding misconception. 'Never true' forgets the 1 : 1 case. Even numbers don't help: 2 : 4 → 3 : 5 changes the ratio.",
        difficulty: "challenge",
        guideRef: "ratio-basics",
        hints: [
          "Try a few examples, such as 2 : 3, 2 : 4 and 4 : 4.",
          "Did any of your examples stay equivalent? What was special about it?",
          "Think about a ratio where both parts are equal.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q18",
        question:
          "Shop A sells rice in 1.2 kg bags for $3.00. Shop B sells the same rice in 500 g packs for $1.40 each, with an offer: buy 2 packs, get a 3rd free. Which statement is correct?",
        options: [
          "Shop A is better value: $2.50 per kg against $2.80 per kg",
          "Shop A is better value, because one big bag is always cheaper than small packs",
          "Shop B is better value, because $1.40 is less than $3.00",
          "Shop B is better value: 1.5 kg for $2.80 is about $1.87 per kg",
        ],
        answerIndex: 3,
        explanation:
          "With the offer, 3 packs (1.5 kg) cost only 2 × $1.40 = $2.80, which is $2.80 ÷ 1.5 ≈ $1.87 per kg. Shop A is $3.00 ÷ 1.2 = $2.50 per kg, so Shop B wins. '$2.50 against $2.80 per kg' ignores the free pack, and '$1.40 is less than $3.00' compares prices for different amounts of rice.",
        difficulty: "challenge",
        guideRef: "direct-proportion",
        hints: [
          "With the offer, how much rice do you get from Shop B, and for how much money?",
          "Find the price per kilogram at each shop.",
          "3 packs = 1.5 kg for the price of 2 packs.",
        ],
        strategy: "Compare unit prices",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q19",
        question:
          "Two maps show the same island. On Map A, which has a scale of 1 : 50 000, the island is 12 cm long. On Map B the island is 4 cm long. What is the scale of Map B?",
        options: ["1 : 150 000", "1 : 16 667", "1 : 200 000", "1 : 600 000"],
        answerIndex: 0,
        explanation:
          "Real length = 12 × 50 000 = 600 000 cm. On Map B that is 4 cm, so the scale is 4 : 600 000 = 1 : 150 000. Map B shows the island smaller, so its n must be bigger than 50 000 — that rules out 1 : 16 667, which divides the scale by 3 instead of multiplying. 1 : 600 000 forgets to divide the real length by 4.",
        difficulty: "challenge",
        guideRef: "scale-and-maps",
        hints: [
          "Which map shows the island bigger? So which scale has the bigger n?",
          "Find the real length of the island first.",
          "Write 4 cm : real length in the form 1 : n.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m3-q20",
        question:
          "The ratio of Ravi's money to Siti's money is 5 : 3. Each of them spends $12. Now the ratio of Ravi's money to Siti's is 3 : 1. How much did Ravi have at first?",
        options: ["$60", "$18", "$30", "$20"],
        answerIndex: 2,
        explanation:
          "They spend the same amount, so the difference between them doesn't change. In 5 : 3 the difference is 2 parts; in 3 : 1 it is also 2 parts — so the parts are the same size in both ratios. Siti drops from 3 parts to 1 part by spending $12, so one part is $6 and Ravi started with 5 × $6 = $30. Check: $30 and $18 become $18 and $6, which is 3 : 1. $18 is what Ravi has *after* spending; $60 treats the $12 as one part.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "When both people spend the same amount, what stays the same?",
          "Compare the difference between the parts in 5 : 3 and in 3 : 1.",
          "Siti goes from 3 parts to 1 part. What are those 2 parts worth?",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },

  // =========================================================================
  // MCQ PAPER 4
  // =========================================================================
  {
    id: "ratio-proportion-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q01",
        question: "Write the ratio 15 : 6 in the form n : 1.",
        options: ["5 : 2", "10 : 1", "1 : 0.4", "2.5 : 1"],
        answerIndex: 3,
        explanation:
          "To make the second part 1, divide both parts by 6: 15 ÷ 6 = 2.5, so 15 : 6 = 2.5 : 1. 10 : 1 subtracts 5 from both parts, which changes the ratio. 1 : 0.4 is equivalent but is in the form 1 : n, not n : 1. 5 : 2 is the simplest whole-number form.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["What must you divide 6 by to make it 1? Do the same to 15."],
        strategy: "Divide both parts by the same number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q02",
        question: "A 2 m plank is cut into two pieces in the ratio 1 : 4. How long is the shorter piece?",
        options: ["50 cm", "1.6 m", "40 cm", "20 cm"],
        answerIndex: 2,
        explanation:
          "1 + 4 = 5 parts make 2 m = 200 cm, so one part is 200 ÷ 5 = 40 cm, and that is the shorter piece. 50 cm divides by 4 instead of by the 5 parts altogether. 1.6 m is the longer piece. 20 cm uses 2 m = 100 cm.",
        difficulty: "warmup",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many parts are there altogether?"],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q03",
        question:
          "A strip of 10 floor tiles is shown. What is the ratio of shaded to unshaded tiles, and what fraction of the tiles is shaded?",
        diagram: `<svg viewBox="0 0 320 70" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A strip of 10 square tiles; 4 of them are shaded and 6 are unshaded"><rect x="0" y="0" width="320" height="70" fill="#ffffff"/><rect x="10" y="20" width="28" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="40" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/><rect x="70" y="20" width="28" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="100" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/><rect x="130" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/><rect x="160" y="20" width="28" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="190" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/><rect x="220" y="20" width="28" height="28" fill="#c7d2fe" stroke="#1f2937"/><rect x="250" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/><rect x="280" y="20" width="28" height="28" fill="#ffffff" stroke="#1f2937"/></svg>`,
        options: [
          "Ratio 2 : 5, fraction {{2/5}}",
          "Ratio 2 : 3, fraction {{2/5}}",
          "Ratio 2 : 3, fraction {{2/3}}",
          "Ratio 3 : 2, fraction {{3/5}}",
        ],
        answerIndex: 1,
        explanation:
          "4 tiles are shaded and 6 are not, so shaded : unshaded = 4 : 6 = 2 : 3. The fraction shaded compares shaded tiles with all 10: {{4/10 = 2/5}}. Ratio 2 : 5 compares shaded with the whole strip, which is the fraction's job, not the ratio's. Fraction {{2/3}} compares shaded with unshaded. 3 : 2 and {{3/5}} describe the unshaded tiles.",
        difficulty: "warmup",
        guideRef: "ratios-and-fractions",
        hints: ["Count the shaded tiles, the unshaded tiles and all the tiles."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q04",
        question: "A recipe for 6 mango lassis uses 3 mangoes and 750 ml of yoghurt. How much yoghurt is needed for 2 lassis?",
        options: ["250 ml", "125 ml", "1500 ml", "375 ml"],
        answerIndex: 0,
        explanation:
          "2 lassis is a third of 6, so use a third of the yoghurt: 750 ÷ 3 = 250 ml. 1500 ml doubles because there is a '2' in the question — but 2 lassis is fewer than 6, so you need less. 125 ml is the yoghurt for just one lassi. 375 ml halves the recipe.",
        difficulty: "warmup",
        guideRef: "recipes-and-currency",
        hints: ["What fraction of 6 lassis is 2 lassis?"],
        strategy: "Find the scale factor",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q05",
        question: "Which pair of lists shows y directly proportional to x?",
        options: [
          "x = 1, 2, 3 and y = 5, 6, 7",
          "x = 1, 2, 4 and y = 3, 6, 10",
          "x = 2, 4, 6 and y = 6, 9, 12",
          "x = 2, 4, 6 and y = 5, 10, 15",
        ],
        answerIndex: 3,
        explanation:
          "In direct proportion y ÷ x is the same every time. For x = 2, 4, 6 and y = 5, 10, 15 it is always 2.5. For y = 5, 6, 7, y goes up steadily but 5 ÷ 1, 6 ÷ 2 and 7 ÷ 3 are all different — going up by the same amount is not the same as being proportional. With y = 3, 6, 10 the first two pairs work, but 4 would need y = 12; one matching pair is not enough.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["Work out y ÷ x for every pair. What must be true?"],
        strategy: "Check for a constant multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q06",
        question:
          "The exchange rate is S$1 = £0.58. A train ticket in London costs £29. Which calculation gives the price in Singapore dollars?",
        options: ["29 × 0.58", "29 ÷ 0.58", "0.58 ÷ 29", "29 − 0.58"],
        answerIndex: 1,
        explanation:
          "Each S$1 is worth £0.58, so count the lots of £0.58 in £29: 29 ÷ 0.58 = 50, so the ticket costs S$50. 29 × 0.58 = 16.82 converts the wrong way — here £1 is worth more than S$1, so the price in dollars must be the bigger number. 0.58 ÷ 29 divides the wrong way round, and subtracting is not a conversion.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Is £1 worth more or less than S$1 at this rate?",
          "So should the price in dollars be bigger or smaller than 29?",
          "How many lots of £0.58 make £29?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q07",
        question: "Write the ratio {{1/2}} : {{2/3}} using whole numbers, in its simplest form.",
        options: ["1 : 2", "2 : 3", "3 : 4", "4 : 3"],
        answerIndex: 2,
        explanation:
          "Multiply both parts by 6 (the LCM of 2 and 3): {{1/2}} × 6 = 3 and {{2/3}} × 6 = 4, giving 3 : 4. 1 : 2 just takes the numerators and 2 : 3 just takes the denominators — both ignore that halves and thirds are different-sized pieces. 4 : 3 has the order reversed.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "What could you multiply both fractions by to make whole numbers?",
          "Try the LCM of the denominators.",
          "Multiply both parts by 6.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q08",
        question:
          "Concrete is made by mixing cement, sand and gravel in the ratio 1 : 2 : 4. A builder has 18 kg of sand. Using all the sand, how much concrete can he make?",
        options: ["63 kg", "126 kg", "36 kg", "54 kg"],
        answerIndex: 0,
        explanation:
          "Sand is 2 parts, so one part is 18 ÷ 2 = 9 kg. The whole mix is 1 + 2 + 4 = 7 parts: 7 × 9 = 63 kg. 126 kg treats the 18 kg of sand as one part. 36 kg is just the gravel, and 54 kg adds the sand and gravel but forgets the cement.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many parts is the sand?", "Find the mass of one part.", "How many parts make the whole mix?"],
        strategy: "Find one part first",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q09",
        question: "The scale bar of a map is shown. What is the scale of the map, written in the form 1 : n?",
        diagram: `<svg viewBox="0 0 300 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A map scale bar from 0 to 1 km, with a mark at 0.5 km; the whole bar measures 2 cm on the map"><rect x="0" y="0" width="300" height="110" fill="#ffffff"/><rect x="50" y="40" width="100" height="10" fill="#334155" stroke="#1f2937"/><rect x="150" y="40" width="100" height="10" fill="#ffffff" stroke="#1f2937"/><text x="50" y="32" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0</text><text x="150" y="32" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">0.5 km</text><text x="250" y="32" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 km</text><line x1="50" y1="70" x2="250" y2="70" stroke="#334155" stroke-width="1.5"/><line x1="50" y1="64" x2="50" y2="76" stroke="#334155" stroke-width="1.5"/><line x1="250" y1="64" x2="250" y2="76" stroke="#334155" stroke-width="1.5"/><text x="150" y="92" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2 cm on the map</text></svg>`,
        options: ["1 : 0.5", "1 : 5000", "1 : 200 000", "1 : 50 000"],
        answerIndex: 3,
        explanation:
          "2 cm on the map stands for 1 km = 100 000 cm, so the scale is 2 : 100 000. Divide both parts by 2: 1 : 50 000. 1 : 200 000 multiplies by 2 instead of dividing — at that scale, 2 cm would be 4 km. 1 : 0.5 forgets the units: a ratio scale needs both parts in the same unit. 1 : 5000 uses 1 km = 10 000 cm.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Write 1 km in centimetres.",
          "The scale bar says 2 cm : 100 000 cm.",
          "Make the first part 1 by dividing both parts by 2.",
        ],
        strategy: "Convert to the same units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q10",
        question:
          "y is directly proportional to x. When x = 6, y = 15. Ravi says: \"When x = 10, y = 19, because x went up by 4, so y goes up by 4.\" What is the correct value of y when x = 10?",
        options: ["19", "25", "4", "150"],
        answerIndex: 1,
        explanation:
          "In this proportion y is always 15 ÷ 6 = 2.5 times x, so when x = 10, y = 2.5 × 10 = 25. Ravi's 19 adds 4 to both — proportion multiplies, it doesn't add. 150 multiplies 15 by 10 but forgets to divide by 6. 4 uses the multiplier upside down ({{6/15}} instead of {{15/6}}).",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "What do you multiply x by to get y when x = 6?",
          "Use the same multiplier when x = 10.",
          "15 ÷ 6 = 2.5.",
        ],
        strategy: "Find the multiplier",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q11",
        question: "A sack of rice can feed 12 people at a camp for 5 days. How many days would the same sack feed 20 people?",
        options: ["{{8 1/3}} days", "60 days", "3 days", "13 days"],
        answerIndex: 2,
        explanation:
          "The sack holds 12 × 5 = 60 'person-days' of food. Shared among 20 people it lasts 60 ÷ 20 = 3 days. {{8 1/3}} days treats this as direct proportion — but more people eat the rice faster, so it must last fewer days. 60 days is the person-days total, not the number of days.",
        difficulty: "core",
        guideRef: "inverse-proportion",
        hints: [
          "With more people, will the rice last longer or not as long?",
          "How many 'person-days' of food are in the sack?",
          "Divide the person-days by 20.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q12",
        question: "The ratio of Hana's height to her brother's height is 5 : 6. What fraction of her brother's height is Hana's height?",
        options: ["{{5/6}}", "{{5/11}}", "{{6/5}}", "{{1/6}}"],
        answerIndex: 0,
        explanation:
          "Hana is 5 parts and her brother is 6 parts, so Hana's height is {{5/6}} of his. {{5/11}} would be Hana's share of their *combined* height, which is not what is asked. {{6/5}} compares her brother with Hana, and {{1/6}} is the difference as a fraction of his height.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "Is the question comparing Hana with her brother, or with both of them together?",
          "Write Hana's parts over her brother's parts.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q13",
        question:
          "A fruit punch recipe for 8 people uses 1.2 litres of orange juice. Juice is sold in 1-litre cartons. How many cartons must Marcus buy to make punch for 30 people?",
        options: ["4 cartons", "5 cartons", "4.5 cartons", "36 cartons"],
        answerIndex: 1,
        explanation:
          "One person needs 1.2 ÷ 8 = 0.15 litres, so 30 people need 30 × 0.15 = 4.5 litres. You can't buy half a carton, and 4 cartons (4 litres) is not enough, so he must buy 5. 4 cartons rounds 4.5 down — in a 'how many must you buy' question you round up. 36 cartons multiplies 1.2 by 30 and forgets the recipe was for 8 people.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "How much juice does one person need?",
          "How many litres are needed for 30 people?",
          "Cartons come whole. Would 4 cartons be enough?",
        ],
        strategy: "Unitary method",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q14",
        question:
          "A 750 g box of cereal costs $6.00 and a 500 g box costs $4.20. Ethan says: \"The 500 g box is better value because it's cheaper.\" Which statement is correct?",
        options: [
          "Ethan is right, because the 500 g box costs less money",
          "Ethan is wrong, because bigger boxes are always better value",
          "Neither is better: both cost about $0.01 per gram",
          "Ethan is wrong: the 750 g box is $0.80 per 100 g and the 500 g box is $0.84 per 100 g",
        ],
        answerIndex: 3,
        explanation:
          "Compare the price of the same amount: $6.00 ÷ 7.5 = $0.80 per 100 g and $4.20 ÷ 5 = $0.84 per 100 g, so the 750 g box is better value. 'Bigger boxes are always better value' is false — shops don't always price that way, so you must check. 'About $0.01 per gram' rounds too early: $0.008 and $0.0084 both round to $0.01, which hides the difference.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "Is a lower price the same thing as better value?",
          "Find the cost of 100 g from each box.",
          "750 g is 7.5 lots of 100 g; 500 g is 5 lots.",
        ],
        strategy: "Compare unit prices",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q15",
        question:
          "A plan of an HDB flat is drawn to a scale of 1 : 50. On the plan, a bedroom measures 6 cm by 7 cm. What are the real measurements of the bedroom?",
        options: ["30 m by 35 m", "56 cm by 57 cm", "3 m by 3.5 m", "0.12 cm by 0.14 cm"],
        answerIndex: 2,
        explanation:
          "Real lengths are 50 times the plan lengths: 6 × 50 = 300 cm = 3 m and 7 × 50 = 350 cm = 3.5 m. 30 m by 35 m is a conversion slip — 300 cm is 3 m, not 30 m (a 30 m bedroom would be enormous!). 56 cm by 57 cm adds 50 instead of multiplying, and 0.12 cm by 0.14 cm divides by 50, making the real room smaller than the plan.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Is the real room bigger or smaller than the plan?",
          "Multiply each plan length by 50.",
          "Change your answers from centimetres into metres.",
        ],
        strategy: "Convert units",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q16",
        question:
          "Priya shares $45 between her two cousins in the ratio 2 : 3. She writes:\n\n    45 ÷ 2 = 22.50 and 45 ÷ 3 = 15, so they get $22.50 and $15.\n\nWhat did she do wrong?",
        options: [
          "She divided by each part instead of by the total of 5 parts; they should get $18 and $27",
          "She should have multiplied instead: $90 and $135",
          "Nothing — $22.50 and $15 are the correct shares",
          "She should have divided by 2 × 3 = 6 parts: $15 and $22.50",
        ],
        answerIndex: 0,
        explanation:
          "Her shares add to $37.50, not $45, so something is wrong. There are 2 + 3 = 5 parts, so one part is $9: the cousins get 2 × $9 = $18 and 3 × $9 = $27. Dividing by 2 × 3 = 6 multiplies the parts, but the total number of parts comes from adding them — and $15 + $22.50 still isn't $45.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Do Priya's two amounts add up to $45?",
          "How many parts are there altogether?",
          "Find the value of one part.",
        ],
        strategy: "Check by adding the shares",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q17",
        question:
          "x and y are in inverse proportion. If x is increased by 25%, what happens to y?",
        options: ["It decreases by 25%", "It decreases by 75%", "It decreases by 80%", "It decreases by 20%"],
        answerIndex: 3,
        explanation:
          "Inverse proportion keeps x × y constant. If x becomes 1.25 times as big ({{5/4}} of its value), y must become {{4/5}} of its value — that is 80% of what it was, a decrease of 20%. Try x = 4, y = 10: x becomes 5, so y must be 40 ÷ 5 = 8, which is 20% less. 'Decreases by 25%' assumes the change mirrors the increase. 'Decreases by 80%' confuses the new value (80% of y) with the decrease.",
        difficulty: "challenge",
        guideRef: "inverse-proportion",
        hints: [
          "Try numbers: let x = 4 and y = 10. What is x × y?",
          "Increase x by 25%. What must y be now to keep the same product?",
          "Compare the new y with 10.",
        ],
        strategy: "Try a specific number",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q18",
        question:
          "In a class, {{3/5}} of the pupils are girls. Then 4 girls leave the class and 4 boys join it. Now the ratio of girls to boys is 1 : 1. How many pupils are in the class?",
        options: ["20", "40", "80", "24"],
        answerIndex: 1,
        explanation:
          "The class size doesn't change: 4 leave and 4 join. The girls drop from {{3/5}} to {{1/2}} of the class, a fall of {{3/5 - 1/2 = 1/10}} of the class — and that fall is the 4 girls who left. So {{1/10}} of the class is 4 pupils, and the class has 40. Check: 24 girls and 16 boys become 20 and 20. 20 treats the 4 girls as {{1/5}} of the class. 24 is the number of girls at the start.",
        difficulty: "challenge",
        guideRef: "ratios-and-fractions",
        hints: [
          "Does the total number of pupils change?",
          "What fraction of the class are girls at the end?",
          "The drop from {{3/5}} to {{1/2}} of the class is the 4 girls who left.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q19",
        question:
          "A photo is enlarged by scale factor 1.5. The copy is then enlarged again by scale factor 2. The final picture is 27 cm wide. How wide was the original photo?",
        options: ["13.5 cm", "7.7 cm", "9 cm", "81 cm"],
        answerIndex: 2,
        explanation:
          "Two enlargements combine by multiplying: 1.5 × 2 = 3, so the final picture is 3 times as wide as the original: 27 ÷ 3 = 9 cm. Working backwards gives the same: 27 ÷ 2 = 13.5, then 13.5 ÷ 1.5 = 9. 7.7 cm comes from adding the scale factors (1.5 + 2 = 3.5) instead of multiplying them. 13.5 cm undoes only the second enlargement, and 81 cm multiplies when it should divide.",
        difficulty: "challenge",
        guideRef: "scale-and-maps",
        hints: [
          "Work backwards: how wide was the picture before the second enlargement?",
          "Undo each enlargement by dividing by its scale factor.",
          "Or: what single scale factor does the same as both enlargements together?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "ratio-proportion-m4-q20",
        question:
          "Money changer A offers S$1 = RM3.45 with no fee. Money changer B offers S$1 = RM3.50, but first takes a S$5 fee from the money you hand over. For what amount of Singapore dollars do A and B give exactly the same number of ringgit?",
        options: ["S$350", "S$100", "S$345", "They never give the same amount"],
        answerIndex: 0,
        explanation:
          "At B, the S$5 fee costs you 5 × 3.50 = RM17.50, but every dollar B changes earns RM0.05 more than at A. You need 17.50 ÷ 0.05 = 350 dollars for the extra to make up for the fee. Check: A gives 350 × 3.45 = RM1207.50 and B gives 345 × 3.50 = RM1207.50. S$100 divides the S$5 fee by RM0.05 without first turning the fee into ringgit. S$345 values the fee at A's rate instead of B's.",
        difficulty: "challenge",
        guideRef: "recipes-and-currency",
        hints: [
          "At B, how many ringgit does the S$5 fee cost you?",
          "For each dollar changed, how many more ringgit does B give than A?",
          "How many dollars does it take for those extra ringgit to cover the fee?",
        ],
        strategy: "Compare the gain with the loss",
      },
    ],
  },
];
