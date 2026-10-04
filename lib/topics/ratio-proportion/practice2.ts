// Ratio & Proportion — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, tables/diagrams and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "ratio-proportion-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "ratio-proportion-p3-q01",
        question:
          "For the class party, Jun makes teh tarik using 1.2 litres of tea and 450 ml of condensed milk. Write the ratio tea : condensed milk in its simplest form.",
        answer: { type: "ratio", parts: [8, 3], simplest: true, display: "8 : 3" },
        traps: [
          {
            spec: { type: "ratio", parts: [1, 375] },
            feedback: "Careful — 1.2 is in litres but 450 is in millilitres. Convert to the same unit first: 1.2 litres = 1200 ml.",
          },
        ],
        solution: [
          "Use the same unit for both parts: 1.2 litres = 1200 ml.",
          "tea : condensed milk = 1200 : 450.",
          "The HCF of 1200 and 450 is 150. Divide both parts by 150: **8 : 3**.",
        ],
        commonError: "Writing 1.2 : 450 without converting. A ratio only makes sense when both parts are in the same unit.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["Are both amounts in the same unit?", "1.2 litres = 1200 ml. Now divide 1200 and 450 by their highest common factor."],
        strategy: "Make the units match",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q02",
        question:
          "Marcus and Zara run a stall at the school fun fair and make a profit of $96. They split the profit in the ratio of the hours they worked. Marcus worked 5 hours and Zara worked 3 hours. How much does Zara get?",
        answer: { type: "number", value: 36, display: "$36" },
        traps: [
          { spec: { type: "number", value: 60 }, feedback: "$60 is Marcus's share (5 parts). Zara worked 3 hours, so she gets 3 parts." },
          { spec: { type: "number", value: 32 }, feedback: "96 ÷ 3 splits the money into thirds. The ratio 5 : 3 has 8 parts, so one part is 96 ÷ 8." },
        ],
        solution: [
          "Total parts: 5 + 3 = 8.",
          "One part: $96 ÷ 8 = $12.",
          "Zara gets 3 parts: 3 × $12 = **$36**. (Check: Marcus gets $60, and $60 + $36 = $96.)",
        ],
        commonError: "Dividing by 3 (Zara's number) instead of by the total number of parts, 8.",
        difficulty: "warmup",
        guideRef: "sharing-in-a-ratio",
        hints: ["How many parts is the profit split into altogether?", "5 + 3 = 8 parts share $96. What is one part worth?"],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q03",
        question:
          "On Saturday, {{2/5}} of the fruit sold at a stall in Geylang were durians and the rest were mangosteens. The stall sold 60 durians. How many mangosteens did it sell?",
        answer: { type: "number", value: 90, display: "90 mangosteens" },
        traps: [
          { spec: { type: "number", value: 150 }, feedback: "150 is ALL the fruit sold. Take away the durians to find the mangosteens." },
          {
            spec: { type: "number", value: 40 },
            feedback: "That treats durians : mangosteens as 3 : 2 — the wrong way round. Durians are 2 parts out of 5, so mangosteens are the other 3 parts.",
          },
        ],
        solution: [
          "Durians are {{2/5}} of the fruit, so mangosteens are {{3/5}}.",
          "durians : mangosteens = 2 : 3.",
          "2 parts = 60, so 1 part = 30, and mangosteens = 3 × 30 = **90**.",
        ],
        commonError: "Mixing up a fraction of the whole ({{2/5}}) with a ratio of one part to another (2 : 3).",
        difficulty: "warmup",
        guideRef: "ratios-and-fractions",
        hints: ["If {{2/5}} of the fruit were durians, what fraction were mangosteens?", "durians : mangosteens = 2 : 3, and 2 parts = 60."],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q04",
        question:
          "During a monsoon downpour, a rain gauge collects 14 mm of rain in 20 minutes. If the rain keeps falling at the same rate, how much rain will the gauge have collected after 50 minutes? Give your answer in mm.",
        answer: { type: "number", value: 35, display: "35 mm" },
        traps: [
          {
            spec: { type: "number", value: 44 },
            feedback: "You added 30 because the time went up by 30 minutes. Proportion works by multiplying: 50 minutes is 2.5 times as long as 20 minutes.",
          },
        ],
        solution: ["Rain in 10 minutes: 14 ÷ 2 = 7 mm.", "50 minutes is 5 lots of 10 minutes.", "5 × 7 = **35 mm**."],
        solutions: [
          {
            label: "Use a multiplier",
            steps: ["50 ÷ 20 = 2.5, so the time is multiplied by 2.5.", "The rain is multiplied by 2.5 too: 14 × 2.5 = 35 mm."],
          },
        ],
        commonError: "Adding the change in time to the rainfall instead of scaling it.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["How much rain falls in 10 minutes?", "10 minutes gives 7 mm. How many lots of 10 minutes are there in 50 minutes?"],
        strategy: "Find one unit first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q05",
        question:
          "Priya is visiting her cousins in Chennai. The exchange rate is S$1 = ₹64 (Indian rupees). She changes S$150. How many rupees does she receive?",
        answer: { type: "number", value: 9600, display: "₹9600" },
        traps: [
          {
            spec: { type: "number", value: 2.34, tolerance: 0.01 },
            feedback: "You divided. Each S$1 buys ₹64, so S$150 buys 150 times as much — multiply.",
          },
        ],
        solution: ["Each S$1 buys ₹64.", "S$150 buys 150 × 64 = **₹9600**."],
        commonError: "Dividing by the exchange rate when you should multiply. Ask: should the answer be a bigger or smaller number?",
        difficulty: "warmup",
        guideRef: "recipes-and-currency",
        hints: ["How many rupees does S$1 buy?", "S$150 is 150 lots of S$1."],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q06",
        question:
          "Aisha and Ravi win $240 in a quiz and share it in the ratio 5 : 3. Aisha then gives some of her share to Ravi so that they both have the same amount. How much does Aisha give Ravi?",
        answer: { type: "number", value: 30, display: "$30" },
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback: "$60 is the gap between them. If Aisha gave Ravi all $60, he would end up $60 ahead of her!",
          },
          { spec: { type: "number", value: 120 }, feedback: "$120 is what each of them ends up with — not the amount Aisha hands over." },
        ],
        solution: [
          "8 parts = $240, so 1 part = $30.",
          "Aisha has 5 × $30 = $150 and Ravi has 3 × $30 = $90.",
          "Equal amounts means $240 ÷ 2 = $120 each.",
          "Aisha gives Ravi $150 − $120 = **$30**.",
        ],
        solutions: [
          {
            label: "Half the gap",
            steps: [
              "Aisha has 2 more parts than Ravi.",
              "To make them equal, she gives him half the gap: 1 part.",
              "1 part = $240 ÷ 8 = $30.",
            ],
          },
        ],
        commonError: "Giving away the whole difference. Moving $1 from Aisha to Ravi closes the gap by $2, so she only gives half the gap.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Work out each person's share first.",
          "Aisha has $150 and Ravi has $90. How much will each have when they are equal?",
          "Equal shares means $240 ÷ 2 = $120 each.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q07",
        question:
          "On a map with scale 1 : 50 000, Ethan's cycling route to East Coast Park measures 18 cm. He cycles at an average speed of 15 km/h. How many minutes does the ride take?",
        answer: { type: "number", value: 36, display: "36 minutes" },
        traps: [
          { spec: { type: "number", value: 0.6 }, feedback: "0.6 hours is right — but the question asks for minutes." },
          { spec: { type: "number", value: 360 }, feedback: "Check your unit conversion: 100 000 cm = 1 km, so 900 000 cm = 9 km." },
        ],
        solution: [
          "Real length: 18 × 50 000 = 900 000 cm.",
          "900 000 cm ÷ 100 = 9000 m, and 9000 m ÷ 1000 = 9 km.",
          "At 15 km/h, 9 km takes 9 ÷ 15 = 0.6 hours.",
          "0.6 × 60 = **36 minutes**.",
        ],
        commonError: "Dividing by the wrong power of 10 when converting cm to km. There are 100 000 cm in 1 km.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Find the real length of the route first.",
          "18 × 50 000 = 900 000 cm. How many kilometres is that?",
          "The route is 9 km. At 15 km each hour, what fraction of an hour does it take?",
        ],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q08",
        question:
          "Three shops sell the same brand of rice, but only in the bag sizes shown.\n\n| Shop | Bag size | Price |\n|---|---|---|\n| P | 5 kg | $11.50 |\n| Q | 10 kg | $24.00 |\n| R | 2 kg | $4.50 |\n\nHana says: \"The 10 kg bag must be the best deal.\" Hana needs exactly 10 kg of rice and can buy from any of the shops. What is the least she can pay?",
        answer: { type: "number", value: 22.5, display: "$22.50 (five 2 kg bags from Shop R)" },
        traps: [
          { spec: { type: "number", value: 24 }, feedback: "The 10 kg bag works out at $2.40 per kg — the most expensive per kg of the three!" },
          { spec: { type: "number", value: 23 }, feedback: "Two 5 kg bags cost $23.00, but there is a cheaper way. Compare the cost per kg at each shop." },
        ],
        solution: [
          "Cost per kg: P: $11.50 ÷ 5 = $2.30. Q: $24.00 ÷ 10 = $2.40. R: $4.50 ÷ 2 = $2.25.",
          "Shop R is the cheapest per kg — the smallest bag is the best value here.",
          "Ways to buy exactly 10 kg: one Q bag ($24.00), two P bags ($23.00) or five R bags ($22.50).",
          "The least she can pay is **$22.50**. Hana is wrong: bigger is not always better value.",
        ],
        commonError: "Assuming the biggest bag is the best value without checking the price per kg.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "Work out the price of 1 kg at each shop.",
          "P: $2.30, Q: $2.40, R: $2.25 per kg.",
          "Which combinations of bags make exactly 10 kg? Use the cheapest per kg if you can.",
        ],
        strategy: "Compare like with like",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q09",
        question:
          "Siti's vegetable curry recipe for 4 people uses 300 ml of coconut milk. Coconut milk is sold in 200 ml cartons. Siti is cooking for 14 people. How many cartons must she buy?",
        answer: { type: "number", value: 6, display: "6 cartons" },
        traps: [
          { spec: { type: "number", value: 5.25 }, feedback: "You can't buy a quarter of a carton. Round to a whole number of cartons — and make sure there is enough." },
          { spec: { type: "number", value: 5 }, feedback: "5 cartons hold only 1000 ml, but she needs 1050 ml. Round UP." },
        ],
        solution: [
          "Coconut milk per person: 300 ÷ 4 = 75 ml.",
          "For 14 people: 14 × 75 = 1050 ml.",
          "1050 ÷ 200 = 5.25 cartons, so 5 cartons are not enough.",
          "She must buy **6 cartons**.",
        ],
        commonError: "Rounding 5.25 down to 5. In a 'how many must you buy' question you round UP.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "How much coconut milk does one person need?",
          "75 ml per person, so 14 people need 1050 ml.",
          "How many 200 ml cartons hold at least 1050 ml?",
        ],
        strategy: "Find one unit first",
      },
      {
        kind: "written",
        id: "ratio-proportion-p3-q10",
        question:
          "At a school recycling drive, the masses of plastic, paper and cans collected were in the ratio plastic : paper : cans = 4 : 7 : 1.\n\nPriya says: \"Paper was more than half of everything collected, so there was more paper than plastic and cans put together.\"\n\nMarcus says: \"Plastic was {{4/7}} of everything collected.\"\n\nWho is right? Explain your answers.",
        marks: 4,
        modelAnswer:
          "There are 4 + 7 + 1 = 12 parts altogether, so paper is {{7/12}} of the total.\n\n**Priya is right.** Half of 12 parts is 6 parts, and paper has 7 parts, so paper is more than half. Plastic and cans together are 4 + 1 = 5 parts, which is less than paper's 7 parts.\n\n**Marcus is wrong.** {{4/7}} compares plastic with paper (4 parts against paper's 7), not with everything collected. Plastic is 4 parts out of 12, so it is {{4/12 = 1/3}} of the total.",
        markScheme: [
          { point: "Total number of parts is 12, so paper is {{7/12}}", keywords: ["12", "7/12", "twelve"] },
          { point: "Priya is right: 7 parts is more than half of 12 (or 7 parts against 5 parts)", keywords: ["right", "correct", "more than half", "6/12", "5 parts", "7 > 5"] },
          { point: "Marcus is wrong: {{4/7}} compares plastic with paper, not with the total", keywords: ["wrong", "not right", "paper", "not the total", "compares"] },
          { point: "Plastic is {{4/12}} = {{1/3}} of the total", keywords: ["4/12", "1/3", "third"] },
        ],
        commonError: "Using one part of the ratio as the denominator (like {{4/7}}) instead of the total number of parts.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "How many parts are there altogether?",
          "4 + 7 + 1 = 12 parts. What fraction is paper? Is that more than {{1/2}}?",
          "For Marcus: a fraction of the total needs the total number of parts on the bottom.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q11",
        question:
          "Year 8 students voted for their end-of-year trip. The votes for Sentosa : the Zoo : Gardens by the Bay were in the ratio 7 : 5 : 4. The Zoo got 45 votes. How many more votes did Sentosa get than Gardens by the Bay?",
        answer: { type: "number", value: 27, display: "27 more votes" },
        traps: [
          { spec: { type: "number", value: 144 }, feedback: "144 is the total number of votes. The question asks for the difference between Sentosa and Gardens by the Bay." },
          { spec: { type: "number", value: 63 }, feedback: "63 is Sentosa's total. How many more is that than Gardens by the Bay's votes?" },
        ],
        solution: [
          "The Zoo has 5 parts, so 5 parts = 45 votes and 1 part = 9 votes.",
          "Sentosa has 7 − 4 = 3 more parts than Gardens by the Bay.",
          "3 × 9 = **27 more votes**. (Check: Sentosa 63, Gardens by the Bay 36, and 63 − 36 = 27 ✓)",
        ],
        commonError: "Dividing 45 by the total number of parts (16) instead of by the Zoo's 5 parts.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Which number in the ratio goes with the Zoo's 45 votes?",
          "5 parts = 45, so 1 part = 9.",
          "Sentosa has 3 more parts than Gardens by the Bay. You don't need either total.",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q12",
        question:
          "Siti wants to make a scale drawing of the school field, a rectangle 120 m long and 75 m wide. Her paper is 29.7 cm by 21 cm. She can choose a scale of 1 : 200, 1 : 500 or 1 : 1000, and she wants the **largest** drawing that still fits on the paper. Which scale should she use? Type only the number n from her scale 1 : n.",
        answer: { type: "number", value: 500, display: "1 : 500" },
        traps: [
          { spec: { type: "number", value: 1000 }, feedback: "1 : 1000 fits, but the drawing is only 12 cm by 7.5 cm. Is there a scale that gives a bigger drawing that still fits?" },
          { spec: { type: "number", value: 200 }, feedback: "At 1 : 200 the field would be 60 cm long on paper — far longer than 29.7 cm." },
        ],
        solution: [
          "Convert to cm: 120 m = 12 000 cm and 75 m = 7500 cm.",
          "1 : 200 gives 12 000 ÷ 200 = 60 cm by 7500 ÷ 200 = 37.5 cm. Too big.",
          "1 : 500 gives 24 cm by 15 cm. This fits (24 ≤ 29.7 and 15 ≤ 21).",
          "1 : 1000 gives 12 cm by 7.5 cm. This fits, but it is smaller.",
          "The largest drawing that fits uses **1 : 500**.",
        ],
        commonError: "Choosing the scale with the biggest n — a bigger n means a SMALLER drawing.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Change 120 m and 75 m into centimetres first.",
          "With a scale of 1 : n, length on paper = real length ÷ n.",
          "Test each scale. Does the length fit in 29.7 cm and the width in 21 cm? Which fitting scale gives the biggest drawing?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "ratio-proportion-p3-q13",
        question:
          "Ethan wants to change S$500 into Australian dollars (A$).\n\n- A money changer at Changi Airport offers **S$1 = A$1.12**.\n- A bank in Sydney quotes its rate as **A$1 = S$0.92**.\n\nWhere will Ethan get more Australian dollars, and about how many more? Show your working.",
        marks: 3,
        modelAnswer:
          "**Changi Airport:** S$1 buys A$1.12, so S$500 buys 500 × 1.12 = A$560.\n\n**Sydney bank:** each A$1 costs S$0.92, so S$500 buys 500 ÷ 0.92 ≈ A$543.48.\n\nEthan gets more at **Changi Airport** — about 560 − 543.48 ≈ **A$16.50 more**.",
        markScheme: [
          { point: "Changi: 500 × 1.12 = A$560", keywords: ["560", "1.12"] },
          { point: "Sydney: divides, 500 ÷ 0.92 ≈ A$543.48 (or S$1 buys about A$1.09)", keywords: ["543.48", "543.5", "543", "1.087", "1.09", "divide", "÷"] },
          { point: "Changi gives more, by about A$16.50", keywords: ["changi", "16.52", "16.5", "16.50", "more"] },
        ],
        solutions: [
          {
            label: "Compare the rates directly",
            steps: [
              "Turn the Sydney rate round: S$1 buys 1 ÷ 0.92 ≈ A$1.087.",
              "A$1.087 is less than A$1.12, so Changi gives more for every dollar. You only need the full S$500 conversion to say how many more.",
            ],
          },
        ],
        commonError: "Working out 500 × 0.92 = 460. The Sydney rate says how many Singapore dollars ONE Australian dollar costs, so you divide.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "The two rates are written different ways round. Which one tells you the A$ for S$1?",
          "In Sydney each A$1 costs S$0.92. How many lots of S$0.92 are there in S$500?",
          "Divide: 500 ÷ 0.92. Then compare with 500 × 1.12.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q14",
        question:
          "Water drips steadily from a leaking tap in an HDB kitchen. Jun records how much water collects in a jug.\n\n| Time (minutes) | 2 | 5 | 8 | 12 |\n|---|---|---|---|---|\n| Water (ml) | 30 | 75 | 128 | 180 |\n\nThe amount of water should be directly proportional to the time, but Jun wrote down one reading wrongly. What should that reading have been? Give your answer in ml.",
        answer: { type: "number", value: 120, display: "120 ml (at 8 minutes)" },
        traps: [
          { spec: { type: "number", value: 128 }, feedback: "128 ml is the reading that doesn't fit the pattern. What SHOULD it have been?" },
          { spec: { type: "number", value: 16 }, feedback: "16 ml per minute comes from the wrong reading. The other three readings all give 15 ml per minute." },
        ],
        solution: [
          "In direct proportion, water ÷ time is the same in every column.",
          "30 ÷ 2 = 15, 75 ÷ 5 = 15, 180 ÷ 12 = 15, but 128 ÷ 8 = 16. The 8-minute reading is the odd one out.",
          "At 15 ml per minute, 8 minutes gives 8 × 15 = **120 ml**.",
        ],
        commonError: "Looking at the differences between readings instead of dividing each reading by its time.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "Divide each amount of water by its time. What do you notice?",
          "30 ÷ 2 = 75 ÷ 5 = 180 ÷ 12 = 15 ml per minute. Which column is different?",
          "At 15 ml per minute, how much water should collect in 8 minutes?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q15",
        question:
          "Siti makes a drink with 150 ml of cordial and 900 ml of water. Ethan uses 200 ml of cordial and 1.5 litres of water.\n\n(a) Write each drink as cordial : water in the form 1 : n.\n\n(b) Ethan wants his drink to taste exactly as strong as Siti's, without adding any more water. How many more millilitres of cordial must he add?\n\nType your answer to part (b).",
        answer: { type: "number", value: 50, display: "50 ml" },
        traps: [
          { spec: { type: "number", value: 250 }, feedback: "250 ml is the total cordial he needs — he already has 200 ml in the drink." },
          { spec: { type: "number", value: 1.5 }, feedback: "7.5 − 6 compares the two values of n. Work out how much cordial 1500 ml of water needs at 1 : 6." },
        ],
        solution: [
          "(a) Siti: 150 : 900 = 1 : 6 (divide both parts by 150). Ethan: 200 : 1500 = 1 : 7.5 (divide both parts by 200).",
          "Ethan has more water for each ml of cordial, so his drink is weaker.",
          "(b) To match 1 : 6 with 1500 ml of water he needs 1500 ÷ 6 = 250 ml of cordial.",
          "He already has 200 ml, so he adds 250 − 200 = **50 ml**.",
        ],
        commonError: "Forgetting to convert 1.5 litres to 1500 ml before comparing.",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "To write a ratio as 1 : n, divide both parts by the first part.",
          "Siti: 1 : 6. Ethan: 1 : 7.5. Whose drink is weaker?",
          "At 1 : 6, how much cordial goes with 1500 ml of water?",
        ],
        strategy: "Write in the form 1 : n",
      },
      {
        kind: "written",
        id: "ratio-proportion-p3-q16",
        question:
          "Jun has a photo 10 cm wide and 15 cm tall. He wants to enlarge it to go in a frame 24 cm wide and 30 cm tall, without cutting any of the photo off.\n\nJun says: \"If I enlarge the photo by scale factor 2.4, it will be exactly 24 cm wide, so it will fill the frame perfectly.\"\n\n(a) Explain why Jun is wrong.\n\n(b) Find the largest scale factor he can use, and the size of the enlarged photo.",
        marks: 4,
        modelAnswer:
          "(a) With scale factor 2.4 the height becomes 15 × 2.4 = 36 cm, which is taller than the 30 cm frame — so it does not fit. In fact no enlargement can fill this frame exactly: the photo's width : height is 10 : 15 = 2 : 3, but the frame's is 24 : 30 = 4 : 5, so the shapes are not similar.\n\n(b) The width allows a scale factor of up to 24 ÷ 10 = 2.4, and the height allows up to 30 ÷ 15 = 2. Both lengths must use the same scale factor, so the largest is the smaller one: **2**. The enlarged photo is **20 cm wide and 30 cm tall**, leaving a 4 cm gap across the width.",
        markScheme: [
          { point: "(a) Height at scale factor 2.4 is 36 cm, more than 30 cm, so it doesn't fit (or: the shapes are not similar, 2 : 3 is not 4 : 5)", keywords: ["36", "too tall", "does not fit", "doesn't fit", "taller", "not similar", "2 : 3", "4 : 5"] },
          { point: "(b) Finds the limit set by each side: 24 ÷ 10 = 2.4 for the width and 30 ÷ 15 = 2 for the height", keywords: ["24 ÷ 10", "30 ÷ 15", "24/10", "30/15", "2.4", "height"] },
          { point: "Largest scale factor is 2 — the smaller of the two limits", keywords: ["scale factor 2", "scale factor of 2", "sf 2", "smaller", "= 2"] },
          { point: "Enlarged photo is 20 cm by 30 cm", keywords: ["20 cm", "20 by 30", "20 × 30", "20 x 30", "20"] },
        ],
        commonError: "Choosing the scale factor from one side only. In an enlargement every length is multiplied by the same scale factor, so the tighter side decides.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Work out the height of the photo if the scale factor is 2.4.",
          "Every length must be multiplied by the same scale factor. Which side of the frame limits you?",
          "The width allows up to 24 ÷ 10 = 2.4; the height allows up to 30 ÷ 15 = 2.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q17",
        question:
          "Siti and Ethan had money in the ratio 4 : 5. On a trip to Sentosa they each spent $30. Now the ratio of Siti's money to Ethan's money is 2 : 3. How much money did Siti have at the start?",
        answer: { type: "number", value: 60, display: "$60" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "$30 is what Siti has left after the trip. The question asks how much she had at the start." },
          { spec: { type: "number", value: 75 }, feedback: "$75 is Ethan's starting amount. The question asks about Siti." },
        ],
        solution: [
          "They both spend the same amount, so the **difference** between their amounts does not change.",
          "In 4 : 5 the difference is 1 part, and in 2 : 3 the difference is also 1 part. Since the difference is the same amount of money, the parts are the same size before and after!",
          "Siti goes from 4 parts to 2 parts, so the $30 she spent is 2 parts. 1 part = $15.",
          "At the start Siti had 4 × $15 = **$60**. (Check: $60 and $75 become $30 and $45, and 30 : 45 = 2 : 3 ✓)",
        ],
        solutions: [
          {
            label: "Algebra",
            steps: [
              "Let Siti have 4k dollars and Ethan 5k dollars.",
              "After spending: {{(4k - 30)/(5k - 30) = 2/3}}.",
              "Cross-multiply: 3(4k − 30) = 2(5k − 30), so 12k − 90 = 10k − 60.",
              "2k = 30, so k = 15 and Siti had 4 × 15 = 60. Spotting the fixed difference makes the algebra unnecessary.",
            ],
          },
        ],
        commonError: "Assuming the total stays the same. Both people spend money, so the total drops — it is the DIFFERENCE that stays fixed.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Both of them spend the same amount. What stays the same?",
          "The difference between their amounts doesn't change. How many parts is the difference in 4 : 5? In 2 : 3?",
          "The parts are the same size before and after. Siti drops from 4 parts to 2 parts — and those 2 parts are the $30 she spent.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q18",
        question:
          "8 volunteers can pack all the boxes for a food-bank drive in 45 minutes. After they have worked for 15 minutes, 4 more volunteers join them. Everyone works at the same rate. How long does the whole job take, from the start? Give your answer in minutes.",
        answer: { type: "number", value: 35, display: "35 minutes" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "30 minutes is how long 12 volunteers would take from the very start — but only 8 worked for the first 15 minutes." },
          { spec: { type: "number", value: 20 }, feedback: "20 minutes is the time AFTER the extra volunteers join. Add the first 15 minutes." },
        ],
        solution: [
          "Measure the job in volunteer-minutes: 8 × 45 = 360 volunteer-minutes.",
          "In the first 15 minutes, 8 volunteers do 8 × 15 = 120 volunteer-minutes.",
          "That leaves 360 − 120 = 240 volunteer-minutes for 12 volunteers: 240 ÷ 12 = 20 minutes.",
          "Total time: 15 + 20 = **35 minutes**.",
        ],
        solutions: [
          {
            label: "Fraction of the job",
            steps: [
              "In 15 minutes the 8 volunteers finish {{15/45 = 1/3}} of the job, leaving {{2/3}}.",
              "8 volunteers would need {{2/3}} × 45 = 30 more minutes.",
              "12 volunteers is 1.5 times as many people, so it takes 30 ÷ 1.5 = 20 minutes.",
              "Total: 15 + 20 = 35 minutes.",
            ],
          },
        ],
        commonError: "Treating it as direct proportion (more people → more time), or forgetting the first 15 minutes.",
        difficulty: "challenge",
        guideRef: "inverse-proportion",
        hints: [
          "Measure the job in 'volunteer-minutes'. How many does the whole job need?",
          "8 × 45 = 360 volunteer-minutes. How many are done in the first 15 minutes?",
          "240 volunteer-minutes are left, shared among 12 volunteers.",
        ],
        strategy: "Find the constant product",
      },
      {
        kind: "written",
        id: "ratio-proportion-p3-q19",
        question:
          "Aisha, Jun and Siti share a taxi home from a CCA event. The fare is $36. Aisha gets out after 4 km, Jun after 8 km, and Siti rides the whole 12 km.\n\n**Method 1:** share the fare in the ratio of the distances each person travelled, 4 : 8 : 12.\n\n**Method 2:** split the journey into three 4 km sections, each costing $12. Each section's cost is shared equally by the people in the taxi for that section.\n\n(a) Work out how much each person pays with each method.\n\n(b) Which method do you think is fairer? Give a reason.",
        marks: 4,
        modelAnswer:
          "(a) **Method 1:** 4 : 8 : 12 = 1 : 2 : 3, which is 6 parts. $36 ÷ 6 = $6 per part, so Aisha pays **$6**, Jun **$12** and Siti **$18**.\n\n**Method 2:** the first 4 km is shared by all three: $12 ÷ 3 = $4 each. The second 4 km is shared by Jun and Siti: $12 ÷ 2 = $6 each. The last 4 km is Siti alone: $12. So Aisha pays **$4**, Jun pays $4 + $6 = **$10** and Siti pays $4 + $6 + $12 = **$22**.\n\n(b) Method 2 is fairer, because each person pays only for the sections they rode, and a section that three people share costs each of them less. In Method 1, Aisha pays $6 for 4 km even though she shared every one of those kilometres with two friends. (Arguing for Method 1 can also earn the mark with a sensible reason, e.g. it is simpler and everyone pays the same rate per km.)",
        markScheme: [
          { point: "Method 1: $6, $12 and $18 (from 1 : 2 : 3)", keywords: ["6, 12, 18", "$6", "$18", "1 : 2 : 3", "1:2:3", "18"] },
          { point: "Method 2: $4, $10 and $22", keywords: ["4, 10, 22", "$4", "$10", "$22", "22"] },
          { point: "Explains the difference: shared sections are split between more people in Method 2", keywords: ["share", "shared", "split", "sections", "each section"] },
          { point: "Gives a reasoned opinion on which method is fairer", keywords: ["fairer", "fair", "because", "only pay", "pays for"] },
        ],
        commonError: "In Method 2, forgetting that Jun and Siti also pay a share of the first section.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Method 1: simplify 4 : 8 : 12 and share $36.",
          "Method 2: who is in the taxi for the first 4 km? The second 4 km? The last 4 km?",
          "First section: $12 ÷ 3 = $4 each. Second section: $12 ÷ 2 = $6 each for Jun and Siti.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "ratio-proportion-p3-q20",
        question:
          "Ravi is 1.5 m tall. He stands 6 m away from a lamp post that is 6 m tall, as shown. The light from the top of the lamp post just passes over the top of Ravi's head. How long is Ravi's shadow, s? Give your answer in metres.",
        diagram: `<svg viewBox="0 0 260 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A lamp post 6 m tall stands on level ground. Ravi, 1.5 m tall, stands 6 m from the post. A dashed light ray goes from the top of the lamp post over Ravi's head to the end of his shadow, of length s."><rect x="0" y="0" width="260" height="215" fill="#ffffff"/><line x1="10" y1="180" x2="250" y2="180" stroke="#334155" stroke-width="1.5"/><rect x="36" y="60" width="8" height="120" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.2"/><circle cx="40" cy="56" r="6" fill="#fde68a" stroke="#1f2937" stroke-width="1.2"/><line x1="40" y1="60" x2="200" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><rect x="156" y="150" width="8" height="30" fill="#fecaca" stroke="#1f2937" stroke-width="1.2"/><line x1="160" y1="180" x2="200" y2="180" stroke="#1f2937" stroke-width="4"/><text x="30" y="125" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">6 m</text><text x="150" y="172" font-family="sans-serif" font-size="12" text-anchor="end" fill="#1f2937">1.5 m</text><line x1="40" y1="195" x2="160" y2="195" stroke="#334155" stroke-width="1"/><line x1="40" y1="190" x2="40" y2="200" stroke="#334155" stroke-width="1"/><line x1="160" y1="190" x2="160" y2="200" stroke="#334155" stroke-width="1"/><line x1="200" y1="190" x2="200" y2="200" stroke="#334155" stroke-width="1"/><line x1="160" y1="195" x2="200" y2="195" stroke="#334155" stroke-width="1"/><text x="100" y="210" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">6 m</text><text x="180" y="210" font-family="sans-serif" font-size="13" font-style="italic" text-anchor="middle" fill="#1f2937">s</text></svg>`,
        answer: { type: "number", value: 2, display: "2 m" },
        traps: [
          { spec: { type: "number", value: 1.5 }, feedback: "The big triangle's base isn't just the 6 m gap — it is the 6 m gap PLUS the shadow." },
          { spec: { type: "number", value: 8 }, feedback: "8 m is the base of the big triangle (6 m + the shadow). The shadow itself is shorter." },
        ],
        solution: [
          "There are two similar triangles: the big one (lamp post and ground to the shadow's tip) and the small one (Ravi and his shadow).",
          "Big triangle: height 6 m, base 6 + s. Small triangle: height 1.5 m, base s.",
          "The lamp post is 6 ÷ 1.5 = 4 times as tall as Ravi, so the big base is 4 times the small base: 6 + s = 4s.",
          "So 3s = 6 and s = **2 m**. (Check: big base 8 m = 4 × 2 m ✓)",
        ],
        commonError: "Using 6 m as the base of the big triangle — the base runs all the way to the tip of the shadow.",
        difficulty: "challenge",
        guideRef: "scale-and-maps",
        hints: [
          "Find two similar triangles in the diagram. What is the height and base of each?",
          "Big triangle: height 6 m, base 6 + s. Small triangle: height 1.5 m, base s.",
          "The lamp post is 4 times as tall as Ravi, so 6 + s must be 4 times s.",
        ],
        strategy: "Draw a diagram",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "ratio-proportion-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "ratio-proportion-p4-q01",
        question:
          "A recipe uses {{2 1/2}} cups of flour and {{3/4}} of a cup of sugar. Write the ratio flour : sugar in its simplest form, using whole numbers.",
        answer: { type: "ratio", parts: [10, 3], simplest: true, display: "10 : 3" },
        traps: [
          { spec: { type: "ratio", parts: [2, 3] }, feedback: "Don't drop the whole number: {{2 1/2}} = {{5/2}}, not {{1/2}}." },
          { spec: { type: "ratio", parts: [5, 3] }, feedback: "Comparing numerators only works when the denominators match. Multiply BOTH parts by 4 first." },
        ],
        solution: [
          "Write the mixed number as an improper fraction: {{2 1/2 = 5/2}}.",
          "{{5/2}} : {{3/4}}. Multiply both parts by 4 (the LCM of 2 and 4): 10 : 3.",
          "10 and 3 have no common factor, so the answer is **10 : 3**.",
        ],
        commonError: "Ignoring the whole number in {{2 1/2}}, or comparing the numerators of fractions with different denominators.",
        difficulty: "warmup",
        guideRef: "ratio-basics",
        hints: ["Change {{2 1/2}} into an improper fraction.", "{{5/2}} : {{3/4}}. Multiply both parts by 4 to clear the fractions."],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q02",
        question:
          "A jar holds red, yellow and green sweets in the ratio 2 : 3 : 5. What fraction of the sweets are **not** yellow? Give your answer in its simplest form.",
        answer: { type: "fraction", n: 7, d: 10, simplest: true },
        traps: [
          { spec: { type: "fraction", n: 3, d: 10 }, feedback: "{{3/10}} is the fraction that ARE yellow. The question asks for the sweets that are not yellow." },
          {
            spec: { type: "fraction", n: 7, d: 3 },
            feedback: "7 : 3 compares not-yellow with yellow. A fraction of ALL the sweets needs the total, 10 parts, on the bottom.",
          },
        ],
        solution: ["Total parts: 2 + 3 + 5 = 10.", "Not yellow: red + green = 2 + 5 = 7 parts.", "Fraction not yellow = **{{7/10}}**."],
        difficulty: "warmup",
        guideRef: "ratios-and-fractions",
        hints: ["How many parts are there altogether?", "2 + 3 + 5 = 10 parts. How many of them are not yellow?"],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q03",
        question:
          "y is directly proportional to x. Find the missing values a and b in the table.\n\n| x | 4 | 10 | b |\n|---|---|---|---|\n| y | 14 | a | 63 |\n\nGive a first, then b.",
        answer: { type: "list", values: [35, 18], ordered: true, display: "a = 35, b = 18" },
        traps: [
          {
            spec: { type: "list", values: [20, 53], ordered: true },
            feedback: "That's adding, not multiplying. In direct proportion y is always the same multiple of x (here 3.5 times).",
          },
          { spec: { type: "list", values: [18, 35], ordered: true }, feedback: "Right numbers — but give a first, then b." },
        ],
        solution: [
          "In direct proportion, y ÷ x is the same in every column: 14 ÷ 4 = 3.5, so y = 3.5x.",
          "a = 3.5 × 10 = **35**.",
          "63 = 3.5 × b, so b = 63 ÷ 3.5 = **18**.",
        ],
        commonError: "Looking at the differences (4 → 10 is +6) instead of the multiplier.",
        difficulty: "warmup",
        guideRef: "direct-proportion",
        hints: ["In direct proportion, what stays the same in every column?", "14 ÷ 4 = 3.5, so y is always 3.5 times x."],
        strategy: "Find the multiplier",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q04",
        question:
          "A model of an MRT train carriage is built to a scale of 1 : 50. The model is 46 cm long. How long is the real carriage? Give your answer in metres.",
        answer: { type: "number", value: 23, display: "23 m" },
        traps: [
          { spec: { type: "number", value: 0.92 }, feedback: "You divided. The real carriage is BIGGER than the model, so multiply by 50." },
          { spec: { type: "number", value: 2300 }, feedback: "2300 cm is right — now convert it to metres." },
        ],
        solution: ["Every 1 cm on the model is 50 cm in real life.", "46 × 50 = 2300 cm.", "2300 cm ÷ 100 = **23 m**."],
        difficulty: "warmup",
        guideRef: "scale-and-maps",
        hints: ["Is the real carriage bigger or smaller than the model?", "46 × 50 = 2300 cm. How many metres is that?"],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q05",
        question:
          "A recipe for vegetable fried rice serves 6 people and uses 450 g of rice. Zara is cooking for 8 people. How many grams of rice does she need?",
        answer: { type: "number", value: 600, display: "600 g" },
        traps: [
          { spec: { type: "number", value: 452 }, feedback: "Adding 2 because there are 2 more people doesn't keep the recipe in proportion. Find the rice for one person first." },
          { spec: { type: "number", value: 337.5 }, feedback: "That's less rice for MORE people — you multiplied by {{6/8}} instead of {{8/6}}." },
        ],
        solution: ["Rice for 1 person: 450 ÷ 6 = 75 g.", "Rice for 8 people: 8 × 75 = **600 g**."],
        solutions: [{ label: "Use a multiplier", steps: ["8 people is {{8/6 = 4/3}} of 6 people.", "{{4/3}} × 450 = 600 g."] }],
        difficulty: "warmup",
        guideRef: "recipes-and-currency",
        hints: ["How much rice does one person need?", "450 ÷ 6 = 75 g per person."],
        strategy: "Find one unit first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q06",
        question:
          "Hana, Ethan and Zara share the cost of a birthday present in the ratio 2 : 3 : 4. The bar model shows their shares. Hana and Zara pay $102 altogether. How much does Ethan pay?",
        diagram: `<svg viewBox="0 0 400 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bar model. Hana's bar has 2 equal boxes, Zara's bar has 4 equal boxes and Ethan's bar has 3 equal boxes. A bracket joins Hana's and Zara's bars and is labelled 102 dollars. Ethan's bar is marked with a question mark."><rect x="0" y="0" width="400" height="160" fill="#ffffff"/><text x="10" y="34" font-family="sans-serif" font-size="13" fill="#1f2937">Hana</text><rect x="100" y="15" width="40" height="28" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><rect x="140" y="15" width="40" height="28" fill="#c7d2fe" stroke="#334155" stroke-width="1.5"/><text x="10" y="74" font-family="sans-serif" font-size="13" fill="#1f2937">Zara</text><rect x="100" y="55" width="40" height="28" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><rect x="140" y="55" width="40" height="28" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><rect x="180" y="55" width="40" height="28" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><rect x="220" y="55" width="40" height="28" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><path d="M272 15 H284 V83 H272" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="292" y="54" font-family="sans-serif" font-size="13" fill="#1f2937">$102</text><text x="10" y="134" font-family="sans-serif" font-size="13" fill="#1f2937">Ethan</text><rect x="100" y="115" width="40" height="28" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="140" y="115" width="40" height="28" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><rect x="180" y="115" width="40" height="28" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><text x="234" y="135" font-family="sans-serif" font-size="16" font-weight="bold" fill="#1f2937">?</text></svg>`,
        answer: { type: "number", value: 51, display: "$51" },
        traps: [
          { spec: { type: "number", value: 153 }, feedback: "$153 is the total cost (9 parts). Ethan only pays 3 of those parts." },
          { spec: { type: "number", value: 34 }, feedback: "Check which bars the $102 covers: only Hana's and Zara's — that's 2 + 4 = 6 parts, not all 9 parts." },
        ],
        solution: [
          "Hana and Zara together have 2 + 4 = 6 parts.",
          "6 parts = $102, so 1 part = $102 ÷ 6 = $17.",
          "Ethan has 3 parts: 3 × $17 = **$51**.",
          "Check: Hana $34 and Zara $68 add up to $102 ✓",
        ],
        commonError: "Dividing $102 by all 9 parts, when it only covers 6 of them.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Count the boxes inside the $102 bracket.",
          "Hana and Zara have 2 + 4 = 6 boxes between them. What is one box worth?",
          "One box = $102 ÷ 6. Ethan has 3 boxes.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q07",
        question:
          "The pie chart shows how Ethan uses his monthly pocket money.\n\n(a) Write transport : food : savings as a ratio in its simplest form.\n\n(b) Ethan saves $25 a month. How much does he spend on food each month?\n\nType your answer to part (b).",
        diagram: `<svg viewBox="0 0 260 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pie chart of Ethan's pocket money: transport 120 degrees, food 90 degrees, savings 150 degrees."><rect x="0" y="0" width="260" height="210" fill="#ffffff"/><path d="M120 105 L120 15 A90 90 0 0 1 197.94 150 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M120 105 L197.94 150 A90 90 0 0 1 75 182.94 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><path d="M120 105 L75 182.94 A90 90 0 0 1 120 15 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="160" y="76" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Transport</text><text x="160" y="90" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">120°</text><text x="134" y="148" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Food</text><text x="134" y="162" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">90°</text><text x="74" y="96" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">Savings</text><text x="74" y="110" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">150°</text></svg>`,
        answer: { type: "number", value: 15, display: "$15 (the ratio is 4 : 3 : 5)" },
        traps: [
          { spec: { type: "number", value: 60 }, feedback: "$60 is ALL of his pocket money. The question asks how much goes on food." },
          { spec: { type: "number", value: 20 }, feedback: "$20 is what he spends on transport (4 parts). Food is 3 parts." },
        ],
        solution: [
          "(a) transport : food : savings = 120 : 90 : 150.",
          "Divide every part by 30: **4 : 3 : 5**.",
          "(b) Savings are 5 parts = $25, so 1 part = $5.",
          "Food is 3 parts: 3 × $5 = **$15**.",
        ],
        solutions: [
          {
            label: "Fractions of the circle",
            steps: [
              "Savings are {{150/360 = 5/12}} of his money, so {{5/12}} of the total is $25 and the total is $60.",
              "Food is {{90/360 = 1/4}} of the total: {{1/4}} × $60 = $15.",
            ],
          },
        ],
        commonError: "Forgetting to simplify 120 : 90 : 150 fully — divide by the HCF, 30.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "The angles give the ratio straight away: 120 : 90 : 150. Simplify it.",
          "120 : 90 : 150 = 4 : 3 : 5.",
          "Savings are 5 parts = $25. What is 1 part worth?",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q08",
        question:
          "Triangles ABC and PQR are similar: A matches P, B matches Q and C matches R. AB = 6 cm, BC = 9 cm, AC = 8.4 cm and PQ = 10 cm.\n\nFind the lengths QR and PR. Type the two lengths in cm, QR first, separated by a comma.",
        diagram: `<svg viewBox="0 0 400 185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two similar triangles. Triangle ABC has AB 6 cm, BC 9 cm and AC 8.4 cm. The larger triangle PQR has PQ 10 cm, and sides QR and PR are marked with question marks."><rect x="0" y="0" width="400" height="185" fill="#ffffff"/><polygon points="61,85 30,150 138,150" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><polygon points="241.6,41.7 190,150 370,150" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="61" y="78" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">A</text><text x="26" y="163" font-family="sans-serif" font-size="13" text-anchor="end" fill="#1f2937">B</text><text x="142" y="163" font-family="sans-serif" font-size="13" fill="#1f2937">C</text><text x="241.6" y="34" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">P</text><text x="186" y="163" font-family="sans-serif" font-size="13" text-anchor="end" fill="#1f2937">Q</text><text x="374" y="163" font-family="sans-serif" font-size="13" fill="#1f2937">R</text><text x="38" y="118" font-family="sans-serif" font-size="12" text-anchor="end" fill="#334155">6 cm</text><text x="84" y="168" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">9 cm</text><text x="106" y="112" font-family="sans-serif" font-size="12" fill="#334155">8.4 cm</text><text x="208" y="95" font-family="sans-serif" font-size="12" text-anchor="end" fill="#334155">10 cm</text><text x="280" y="170" font-family="sans-serif" font-size="14" font-weight="bold" text-anchor="middle" fill="#334155">?</text><text x="314" y="92" font-family="sans-serif" font-size="14" font-weight="bold" fill="#334155">?</text></svg>`,
        answer: { type: "list", values: [15, 14], ordered: true, display: "QR = 15 cm, PR = 14 cm" },
        traps: [
          {
            spec: { type: "list", values: [13, 12.4], ordered: true },
            feedback: "Similar shapes are linked by MULTIPLYING by a scale factor, not by adding the same amount. Try PQ ÷ AB = 10 ÷ 6.",
          },
          { spec: { type: "list", values: [14, 15], ordered: true }, feedback: "Right lengths — but give QR first, then PR." },
        ],
        solution: [
          "Scale factor from ABC to PQR: PQ ÷ AB = 10 ÷ 6 = {{5/3}}.",
          "QR = {{5/3}} × 9 = **15 cm**.",
          "PR = {{5/3}} × 8.4 = **14 cm**.",
        ],
        solutions: [
          {
            label: "Ratios inside one triangle",
            steps: [
              "In ABC, BC is 9 ÷ 6 = 1.5 times AB, and AC is 8.4 ÷ 6 = 1.4 times AB.",
              "Similar shapes keep these ratios, so QR = 1.5 × 10 = 15 cm and PR = 1.4 × 10 = 14 cm.",
              "This avoids the awkward scale factor {{5/3}} — here it is the quicker route.",
            ],
          },
        ],
        commonError: "Adding 4 cm to every side because PQ is 4 cm longer than AB.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "Which side of triangle PQR matches AB?",
          "The scale factor is PQ ÷ AB = 10 ÷ 6.",
          "Multiply BC and AC by the scale factor {{5/3}}.",
        ],
        strategy: "Find the multiplier",
      },
      {
        kind: "written",
        id: "ratio-proportion-p4-q09",
        question:
          "A 1-litre carton of soy milk costs $2.35. A pack of 6 small cartons, each holding 250 ml, costs $3.30.\n\nRavi says: \"The pack is better value, because you get 6 cartons instead of 1.\"\n\n(a) Is the pack better value? Show your working.\n\n(b) Comment on Ravi's reason.",
        marks: 4,
        modelAnswer:
          "(a) The pack holds 6 × 250 ml = 1500 ml = 1.5 litres. It costs $3.30 ÷ 1.5 = $2.20 per litre, compared with $2.35 per litre for the big carton. So **yes, the pack is better value** — by 15 cents per litre.\n\n(b) Ravi's conclusion is right but his reason is not. The number of cartons doesn't matter — six tiny cartons could easily hold less milk than one big one. To compare value you must compare the price of the **same amount** of milk (for example, the cost per litre).",
        markScheme: [
          { point: "Finds that the pack holds 1.5 litres (1500 ml)", keywords: ["1.5", "1500", "1500 ml", "1.5 litres"] },
          { point: "Compares like with like, e.g. $2.20 per litre against $2.35 per litre", keywords: ["2.20", "2.2", "per litre", "2.35", "0.55", "0.59", "0.5875", "per 250 ml"] },
          { point: "Concludes the pack is better value", keywords: ["better value", "yes", "pack is better", "cheaper"] },
          { point: "Ravi's reason is wrong: the number of cartons doesn't matter; compare the price of the same amount", keywords: ["reason", "same amount", "number of cartons", "doesn't matter", "does not matter", "not because"] },
        ],
        commonError: "Comparing $2.35 with $3.30 directly, or counting cartons, instead of comparing the price of the same volume.",
        difficulty: "core",
        guideRef: "direct-proportion",
        hints: [
          "To compare value fairly, what must be the same?",
          "How many millilitres are in the pack altogether?",
          "Find the cost of 1 litre for each option.",
        ],
        strategy: "Compare like with like",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q10",
        question:
          "A pair of wireless headphones costs ¥9600 in Tokyo and S$108 in Singapore. The exchange rate is S$1 = ¥120.\n\n(a) Convert the Tokyo price into Singapore dollars.\n\n(b) Where are the headphones cheaper, and by how many Singapore dollars?\n\nType your answer to part (b) as a number of Singapore dollars.",
        answer: { type: "number", value: 28, display: "S$28 (cheaper in Tokyo)" },
        traps: [
          { spec: { type: "number", value: 3360 }, feedback: "¥3360 is the difference in yen. The question asks for the difference in Singapore dollars." },
          { spec: { type: "number", value: 80 }, feedback: "S$80 is the Tokyo price in Singapore dollars — part (a). Now compare it with S$108." },
        ],
        solution: [
          "(a) Each S$1 buys ¥120, so divide: ¥9600 ÷ 120 = S$80.",
          "(b) S$80 in Tokyo against S$108 in Singapore.",
          "The headphones are cheaper in Tokyo by 108 − 80 = **S$28**.",
        ],
        commonError: "Multiplying ¥9600 by 120. Going from yen to S$ makes the number smaller, so divide.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "To change yen into S$, do you multiply or divide by 120?",
          "¥9600 ÷ 120 = S$80.",
          "Compare S$80 with S$108.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q11",
        question:
          "Zara is flying from Singapore to Sydney with a stopover in Tokyo. She knows that S$1 = ¥112 and that A$1 = ¥98 (Australian dollars).\n\n(a) How many yen is S$140 worth?\n\n(b) How many Australian dollars is that amount worth?\n\nType your answer to part (b) as a plain number of Australian dollars (no currency sign).",
        answer: { type: "number", value: 160, display: "A$160" },
        traps: [
          { spec: { type: "number", value: 15680 }, feedback: "¥15 680 is part (a). Now change the yen into Australian dollars." },
          {
            spec: { type: "number", value: 122.5 },
            feedback: "The rates are used upside down. S$1 is worth MORE yen than A$1, so S$140 must be worth more than A$140.",
          },
        ],
        solution: [
          "(a) S$140 = 140 × 112 = ¥15 680.",
          "(b) Each A$1 costs ¥98, so divide: 15 680 ÷ 98 = **A$160**.",
        ],
        solutions: [
          {
            label: "Combine the rates first",
            steps: [
              "S$1 = ¥112 and A$1 = ¥98, so S$1 is worth 112 ÷ 98 = {{8/7}} Australian dollars.",
              "S$140 × {{8/7}} = A$160. This is combining two ratios through the shared currency, yen.",
            ],
          },
        ],
        commonError: "Multiplying by 98 instead of dividing when changing yen into Australian dollars.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "Change the Singapore dollars into yen first.",
          "S$140 = 140 × 112 = ¥15 680.",
          "Each A$1 costs ¥98. How many lots of ¥98 are there in ¥15 680?",
        ],
        strategy: "Use a common unit",
      },
      {
        kind: "written",
        id: "ratio-proportion-p4-q12",
        question:
          "Jun says: \"To make an equivalent ratio, you can add the same number to both parts. For example, 2 : 3 is equivalent to 4 : 5.\"\n\nIs Jun right? Explain, and give a correct example of a ratio equivalent to 2 : 3.",
        marks: 3,
        modelAnswer:
          "**Jun is wrong.** In 2 : 3 the first part is {{2/3}} ≈ 0.67 of the second, but in 4 : 5 it is {{4/5}} = 0.8 of the second, so the ratios are not the same. (Think of squash and water: 2 cups of squash to 3 cups of water tastes weaker than 4 cups to 5.)\n\nEquivalent ratios are made by **multiplying or dividing** both parts by the same number, e.g. 2 : 3 = 4 : 6 = 10 : 15.",
        markScheme: [
          { point: "States that Jun is wrong", keywords: ["wrong", "not right", "no", "is not", "isn't"] },
          { point: "Shows 2 : 3 and 4 : 5 are different, e.g. 0.67 against 0.8, or 10 : 15 against 12 : 15", keywords: ["0.67", "0.8", "2/3", "4/5", "10 : 15", "12 : 15", "10:15", "12:15", "different"] },
          { point: "Equivalent ratios come from multiplying or dividing both parts by the same number, e.g. 4 : 6", keywords: ["multiply", "divide", "4 : 6", "4:6", "times", "×"] },
        ],
        commonError: "Thinking ratios work by adding. Ratios are multiplicative: 2 : 3 → 4 : 6 (× 2), not 4 : 5 (+ 2).",
        difficulty: "core",
        guideRef: "ratio-basics",
        hints: [
          "Test Jun's example. Turn 2 : 3 and 4 : 5 into fractions or decimals — are they equal?",
          "Imagine 2 cups of squash to 3 cups of water, and 4 cups of squash to 5 cups of water. Do they taste the same?",
          "Which operation, done to both parts, keeps a ratio the same?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q13",
        question:
          "The diagram shows the scale bar on a map of Pulau Ubin. On the printed map, each 1.5 km section of the scale bar is 5 cm long.\n\n(a) Write the scale of the map in the form 1 : n.\n\n(b) A boardwalk is 1.8 cm long on the map. How long is the real boardwalk, in metres?\n\nType your answer to part (b).",
        diagram: `<svg viewBox="0 0 360 90" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A map scale bar from 0 to 3 km in two equal sections. The first section, from 0 to 1.5 km, is marked as 5 cm long."><rect x="0" y="0" width="360" height="90" fill="#ffffff"/><line x1="40" y1="20" x2="180" y2="20" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="14" x2="40" y2="26" stroke="#334155" stroke-width="1.5"/><line x1="180" y1="14" x2="180" y2="26" stroke="#334155" stroke-width="1.5"/><text x="110" y="14" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#1f2937">5 cm</text><rect x="40" y="34" width="140" height="14" fill="#1f2937"/><rect x="180" y="34" width="140" height="14" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/><text x="40" y="66" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">0</text><text x="180" y="66" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">1.5 km</text><text x="320" y="66" font-family="sans-serif" font-size="13" text-anchor="middle" fill="#1f2937">3 km</text></svg>`,
        answer: { type: "number", value: 540, display: "540 m (the scale is 1 : 30 000)" },
        traps: [
          { spec: { type: "number", value: 0.54 }, feedback: "0.54 km is right — but the question asks for metres." },
          { spec: { type: "number", value: 2.7 }, feedback: "1 cm on the map is not 1.5 km — it is 5 cm that stands for 1.5 km. Find what 1 cm stands for first." },
        ],
        solution: [
          "(a) 1.5 km = 1500 m = 150 000 cm.",
          "5 cm on the map represents 150 000 cm, so 1 cm represents 150 000 ÷ 5 = 30 000 cm. The scale is 1 : 30 000.",
          "(b) 1.8 cm on the map → 1.8 × 30 000 = 54 000 cm.",
          "54 000 cm ÷ 100 = **540 m**.",
        ],
        commonError: "Treating the scale bar as '1 cm = 1.5 km' instead of '5 cm = 1.5 km'.",
        difficulty: "core",
        guideRef: "scale-and-maps",
        hints: [
          "How many centimetres are there in 1.5 km?",
          "5 cm represents 150 000 cm. What does 1 cm represent?",
          "1 cm represents 30 000 cm = 300 m. Now scale up to 1.8 cm.",
        ],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q14",
        question:
          "A $1200 grant is shared between three CCA clubs — robotics, chess and art — in the ratio 5 : 3 : 4. Later, the art club gives {{1/4}} of its share to the chess club. Write the new ratio robotics : chess : art in its simplest form.",
        answer: { type: "ratio", parts: [5, 4, 3], simplest: true, display: "5 : 4 : 3" },
        traps: [
          { spec: { type: "ratio", parts: [5, 3, 4] }, feedback: "That's the original ratio. The art club's gift changes the chess and art shares." },
          { spec: { type: "ratio", parts: [5, 6, 1] }, feedback: "The art club gives a quarter of its OWN share ($400), not a quarter of the whole grant." },
        ],
        solution: [
          "Total parts: 5 + 3 + 4 = 12, so 1 part = $1200 ÷ 12 = $100.",
          "Shares: robotics $500, chess $300, art $400.",
          "Art gives away {{1/4}} × $400 = $100. Now chess has $400 and art has $300.",
          "New ratio: 500 : 400 : 300 = **5 : 4 : 3**.",
        ],
        commonError: "Taking {{1/4}} of the whole grant instead of {{1/4}} of the art club's share.",
        difficulty: "core",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Start by finding each club's share in dollars.",
          "1 part = $1200 ÷ 12 = $100, so the shares are $500, $300 and $400.",
          "A quarter of $400 moves from art to chess. Then simplify the new amounts.",
        ],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q15",
        question:
          "Siti's recipe for mango sago dessert serves 8 people.\n\n| Ingredient | Amount |\n|---|---|\n| Mangoes | 2 |\n| Sago pearls | 120 g |\n| Coconut milk | 400 ml |\n| Sugar | 60 g |\n\nSiti only has 300 ml of coconut milk, but plenty of everything else. She scales the whole recipe so that she uses all 300 ml. How many grams of sago pearls does she need?",
        answer: { type: "number", value: 90, display: "90 g" },
        traps: [
          {
            spec: { type: "number", value: 20 },
            feedback: "Taking away 100 g because the coconut milk went down by 100 ml doesn't keep the recipe in proportion. Multiply by a scale factor instead.",
          },
          { spec: { type: "number", value: 160 }, feedback: "You multiplied by {{4/3}}. She has LESS coconut milk than the recipe, so she needs less sago." },
        ],
        solution: [
          "300 ml is {{300/400 = 3/4}} of the coconut milk in the recipe.",
          "So every ingredient is multiplied by {{3/4}}.",
          "Sago: {{3/4}} × 120 = **90 g**. (The dessert now serves {{3/4}} × 8 = 6 people.)",
        ],
        commonError: "Subtracting the same amount from every ingredient instead of multiplying by the same scale factor.",
        difficulty: "core",
        guideRef: "recipes-and-currency",
        hints: [
          "What fraction of the recipe's coconut milk does Siti have?",
          "300 ÷ 400 = {{3/4}}.",
          "Multiply the sago by the same fraction.",
        ],
        strategy: "Find the multiplier",
      },
      {
        kind: "written",
        id: "ratio-proportion-p4-q16",
        question:
          "In class 8A, {{3/5}} of the students are in a sports CCA. In class 8B, the ratio of students in a sports CCA to students not in one is 5 : 4.\n\nAisha says: \"8B has a bigger proportion of students in sports CCAs, because 5 is bigger than 3.\"\n\nIs Aisha right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "In 8B there are 5 + 4 = 9 parts, so {{5/9}} of the class are in a sports CCA.\n\nCompare {{3/5}} and {{5/9}} with a common denominator of 45: {{3/5 = 27/45}} and {{5/9 = 25/45}}. (As decimals: 0.6 and about 0.56.)\n\nSo 8A has the bigger proportion and **Aisha is wrong**. She compared the numbers 5 and 3 without first turning both facts into fractions of the whole class.",
        markScheme: [
          { point: "Writes 8B's proportion as {{5/9}} (5 parts out of 9)", keywords: ["5/9", "9 parts", "0.56", "0.556", "56%"] },
          { point: "Compares fairly: {{3/5}} = {{27/45}} = 0.6 against {{5/9}} = {{25/45}} ≈ 0.56", keywords: ["27/45", "25/45", "0.6", "60%", "common denominator"] },
          { point: "Concludes Aisha is wrong — 8A has the bigger proportion", keywords: ["wrong", "not right", "8a", "no"] },
        ],
        commonError: "Comparing a number in a ratio with a number in a fraction directly. Turn the ratio 5 : 4 into the fraction {{5/9}} first.",
        difficulty: "core",
        guideRef: "ratios-and-fractions",
        hints: [
          "The two facts are written in different forms. Make them both fractions of the whole class.",
          "5 : 4 means 5 out of every 9 students, so {{5/9}} of 8B.",
          "Compare {{3/5}} and {{5/9}} using a common denominator or decimals.",
        ],
        strategy: "Compare like with like",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q17",
        question:
          "Ravi, Jun and Mei each have some marbles. Ravi gives {{1/3}} of his marbles to Jun. Then Jun gives {{1/4}} of the marbles he now has to Mei. After this, all three of them have the same number of marbles.\n\nWhat was the ratio Ravi : Jun : Mei at the start? Give your answer in its simplest form.",
        answer: { type: "ratio", parts: [9, 5, 4], simplest: true, display: "9 : 5 : 4" },
        traps: [
          {
            spec: { type: "ratio", parts: [9, 8, 4] },
            feedback: "Jun's 8 is what he had AFTER Ravi's gift. Take away the marbles Ravi gave him to find Jun's starting amount.",
          },
          { spec: { type: "ratio", parts: [1, 1, 1] }, feedback: "That's the ratio at the END. Work backwards to the start." },
        ],
        solution: [
          "Work backwards. Suppose they each finish with 6 marbles (any number will do — 6 avoids fractions).",
          "Jun kept {{3/4}} of what he had, and that is 6. So before giving to Mei he had 8, and he gave her 2. Mei therefore started with 6 − 2 = 4.",
          "Ravi kept {{2/3}} of his marbles, and that is 6. So he started with 9 and gave Jun 3. Jun therefore started with 8 − 3 = 5.",
          "Start: Ravi 9, Jun 5, Mei 4, so the ratio is **9 : 5 : 4**.",
          "Check: Ravi 9 → 6 (gives 3). Jun 5 + 3 = 8 → 6 (gives 2). Mei 4 + 2 = 6 ✓",
        ],
        commonError: "Working forwards with unknowns and getting lost — or forgetting that Jun's amount changes twice.",
        difficulty: "challenge",
        guideRef: "sharing-in-a-ratio",
        hints: [
          "Work backwards from the end. Suppose they each finish with 6 marbles.",
          "Jun keeps {{3/4}} of what he had, and that is 6. How many did he have before giving to Mei? How many did Mei receive?",
          "Ravi keeps {{2/3}} of his marbles, and that is 6. How many did he start with, and how many did he give Jun?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q18",
        question:
          "A sheet of A4 paper has a special property: if you cut it in half so that the long side is halved, each half is **similar** to the whole sheet.\n\nLet the short side be 1 unit and the long side be n units, so long side : short side = n : 1. Use the similarity to find n, correct to 2 decimal places.",
        diagram: `<svg viewBox="0 0 300 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle with long side n and short side 1, cut in half by a dashed line through the middle of its long side. Each half is 1 unit long and n divided by 2 units wide."><rect x="0" y="0" width="300" height="215" fill="#ffffff"/><rect x="40" y="20" width="212" height="150" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><line x1="146" y1="20" x2="146" y2="170" stroke="#1f2937" stroke-width="1.5" stroke-dasharray="6 4"/><text x="30" y="100" font-family="sans-serif" font-size="14" text-anchor="end" fill="#1f2937">1</text><text x="93" y="160" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">n ÷ 2</text><text x="199" y="160" font-family="sans-serif" font-size="12" text-anchor="middle" fill="#334155">n ÷ 2</text><line x1="40" y1="184" x2="252" y2="184" stroke="#334155" stroke-width="1.2"/><line x1="40" y1="179" x2="40" y2="189" stroke="#334155" stroke-width="1.2"/><line x1="252" y1="179" x2="252" y2="189" stroke="#334155" stroke-width="1.2"/><text x="146" y="205" font-family="sans-serif" font-size="14" text-anchor="middle" fill="#1f2937">n</text></svg>`,
        answer: { type: "number", value: 1.41, tolerance: 0.005, display: "1.41 (exactly {{sqrt(2)}})" },
        traps: [
          {
            spec: { type: "number", value: 2 },
            feedback: "If n were 2, each half would be a 1 by 1 square — not similar to a 2 by 1 sheet. Set up the similarity equation.",
          },
        ],
        solution: [
          "Whole sheet: long side n, short side 1.",
          "Half-sheet: the old short side (1) is now the long side, and the new short side is {{n/2}}.",
          "Similar rectangles have the same long ÷ short ratio, so {{n/1 = 1/(n/2)}}, which means {{n = 2/n}}.",
          "Multiply both sides by n: {{n^2 = 2}}, so {{n = sqrt(2)}} ≈ **1.41**.",
          "Check with a real A4 sheet: 297 mm ÷ 210 mm ≈ 1.414 ✓",
        ],
        commonError: "Matching the wrong sides. In the half-sheet the long side is the old SHORT side (1), not {{n/2}}.",
        difficulty: "challenge",
        guideRef: "scale-and-maps",
        hints: [
          "Look at one half in the diagram. What are its two side lengths, and which is the longer one?",
          "A half-sheet is 1 long and {{n/2}} wide. For similar rectangles, long ÷ short must be the same for both.",
          "So {{n/1 = 1/(n/2)}}. Rearrange to find {{n^2}}.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "ratio-proportion-p4-q19",
        question:
          "Hana says: \"If y is directly proportional to x, then every time x goes up by 1, y goes up by the same amount.\"\n\nJun says: \"If y is inversely proportional to x, then every time x goes up by 1, y goes down by the same amount.\"\n\nWho is right? Use examples to explain, and say what DOES stay the same in inverse proportion.",
        marks: 4,
        modelAnswer:
          "**Hana is right.** Direct proportion means y = kx, so each time x goes up by 1, y goes up by k. For example, with y = 3x the values of y for x = 1, 2, 3, 4 are 3, 6, 9, 12 — up by 3 every time.\n\n**Jun is wrong.** Take y = 12 ÷ x. For x = 1, 2, 3, 4 the values of y are 12, 6, 4, 3. So y goes down by 6, then by 2, then by 1 — not the same amount each time.\n\nIn inverse proportion it is the **product** x × y that stays the same (here always 12). So doubling x halves y, and tripling x divides y by 3.",
        markScheme: [
          { point: "Hana is right, with a reason or example (y = kx goes up by k each time)", keywords: ["hana", "right", "kx", "same amount", "3, 6, 9", "up by"] },
          { point: "Jun is wrong", keywords: ["jun", "wrong", "not right"] },
          { point: "Counter-example with unequal decreases, e.g. y = 12 ÷ x gives 12, 6, 4, 3", keywords: ["12, 6, 4", "6, 4, 3", "12 ÷ x", "not the same", "different amounts"] },
          { point: "In inverse proportion the product x × y stays the same (doubling x halves y)", keywords: ["product", "x × y", "xy", "constant", "halves", "same product"] },
        ],
        commonError: "Thinking inverse proportion is a steady 'going down'. It is multiplicative: x × 2 means y ÷ 2.",
        difficulty: "challenge",
        guideRef: "direct-proportion",
        hints: [
          "Test each claim with a real example. Try y = 3x for Hana.",
          "For Jun, try y = 12 ÷ x with x = 1, 2, 3, 4. How much does y drop each time?",
          "In your inverse table, multiply x by y in each column. What do you notice?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "ratio-proportion-p4-q20",
        question:
          "Aisha cycles to school. If she rides at 15 km/h she arrives 4 minutes late. If she rides at 20 km/h she arrives 2 minutes early. How far is it from her home to school? Give your answer in km.",
        answer: { type: "number", value: 6, display: "6 km" },
        traps: [
          { spec: { type: "number", value: 24 }, feedback: "24 minutes is how long the ride takes at 15 km/h. Use it to find the distance." },
          { spec: { type: "number", value: 18 }, feedback: "18 minutes is how long the ride takes at 20 km/h. Use it to find the distance." },
        ],
        solution: [
          "For a fixed distance, time is inversely proportional to speed.",
          "Speeds 15 : 20 = 3 : 4, so the times are in the ratio 4 : 3.",
          "The difference in times is 4 + 2 = 6 minutes, and that is 4 − 3 = 1 part. So 1 part = 6 minutes.",
          "At 15 km/h the ride takes 4 × 6 = 24 minutes = {{24/60 = 2/5}} of an hour.",
          "Distance = 15 × {{2/5}} = **6 km**. (Check: at 20 km/h, 6 km takes {{6/20}} h = 18 minutes, and 24 − 18 = 6 ✓)",
        ],
        solutions: [
          {
            label: "Algebra",
            steps: [
              "Let the distance be d km. Time at 15 km/h is {{d/15}} hours; time at 20 km/h is {{d/20}} hours.",
              "The difference is 6 minutes = {{1/10}} hour: {{d/15 - d/20 = 1/10}}.",
              "{{4d/60 - 3d/60 = d/60}}, so {{d/60 = 1/10}} and d = 6.",
            ],
          },
        ],
        commonError: "Using 4 or 2 minutes on its own. The useful number is the total gap between the two arrival times: 6 minutes.",
        difficulty: "challenge",
        guideRef: "inverse-proportion",
        hints: [
          "For a fixed distance, speed and time are inversely proportional. If the speeds are in the ratio 3 : 4, what is the ratio of the times?",
          "The times are in the ratio 4 : 3. The difference between the two times is 4 + 2 = 6 minutes.",
          "1 part = 6 minutes, so the slower ride takes 24 minutes. How far do you go in 24 minutes at 15 km/h?",
        ],
        strategy: "Use the inverse ratio",
      },
    ],
  },
];
