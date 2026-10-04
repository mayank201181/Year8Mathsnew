import type { TopicPractice } from "../../types.ts";

export const practice: TopicPractice = {
  // ===================================================================== QUIZ
  quiz: [
    {
      kind: "mcq",
      id: "ratio-proportion-quiz-q01",
      question: "Which ratio is equivalent to 6 : 15?",
      options: ["2 : 5", "3 : 12", "5 : 2", "2 : 3"],
      answerIndex: 0,
      explanation:
        "The HCF of 6 and 15 is 3, and 6 ÷ 3 = 2, 15 ÷ 3 = 5, so 6 : 15 = 2 : 5. 3 : 12 comes from *subtracting* 3 from both parts — subtracting changes the comparison. 5 : 2 has the order reversed, and 2 : 3 comes from dividing the two parts by different numbers (3 and 5).",
      difficulty: "warmup",
      guideRef: "ratio-basics",
      hints: ["What is the highest number that divides both 6 and 15?", "Divide *both* parts by that same number."],
      strategy: "Divide by the HCF",
    },
    {
      kind: "short",
      id: "ratio-proportion-quiz-q02",
      question: "Arjun and Mei share $56 in the ratio 3 : 4. How much does Mei get? Give your answer in dollars.",
      answer: { type: "number", value: 32, display: "$32" },
      solution: [
        "Total parts: 3 + 4 = 7.",
        "One part: $56 ÷ 7 = $8.",
        "Mei gets 4 parts: 4 × $8 = $32.",
        "Check: Arjun gets 3 × $8 = $24, and $24 + $32 = $56 ✓",
      ],
      commonError: "Dividing by 4 (Mei's number) instead of by the total number of parts, 7.",
      traps: [
        { spec: { type: "number", value: 24 }, feedback: "That's Arjun's share (3 parts). Mei has the 4 parts." },
        { spec: { type: "number", value: 14 }, feedback: "56 ÷ 4 treats 4 as the number of parts. There are 3 + 4 = 7 parts altogether." },
      ],
      difficulty: "warmup",
      guideRef: "sharing-in-a-ratio",
      hints: ["How many equal parts is the money split into?", "Find the value of one part first."],
      strategy: "Use a bar model",
    },
    {
      kind: "short",
      id: "ratio-proportion-quiz-q03",
      question: "Write 600 g : 1.5 kg as a ratio in its simplest form.",
      answer: { type: "ratio", parts: [2, 5], simplest: true },
      solution: [
        "Same units first: 1.5 kg = 1500 g.",
        "The ratio is 600 : 1500.",
        "The HCF of 600 and 1500 is 300.",
        "600 ÷ 300 = 2 and 1500 ÷ 300 = 5, so the ratio is 2 : 5.",
      ],
      commonError: "Writing 600 : 1.5 — the parts must be in the same units before you simplify.",
      traps: [
        {
          spec: { type: "ratio", parts: [400, 1] },
          feedback: "It looks like you used 600 : 1.5 without converting. Change 1.5 kg into grams first.",
        },
      ],
      difficulty: "warmup",
      guideRef: "ratio-basics",
      hints: ["Are both amounts in the same unit?", "Convert 1.5 kg to grams, then divide both parts by their HCF."],
      strategy: "Convert to the same units first",
    },
    {
      kind: "mcq",
      id: "ratio-proportion-quiz-q04",
      question: "In a school CCA, the ratio of boys to girls is 3 : 7. Which statement must be true?",
      options: [
        "{{3/7}} of the members are boys",
        "{{3/10}} of the members are boys",
        "There are {{7/3}} as many boys as girls",
        "{{7/10}} of the members are boys",
      ],
      answerIndex: 1,
      explanation:
        "3 : 7 splits the members into 3 + 7 = 10 equal parts, and the boys have 3 of them, so {{3/10}} of the members are boys. {{3/7}} compares boys with *girls* (part to part), not with the whole CCA. {{7/10}} is the girls' fraction, and {{7/3}} is upside down — there are {{3/7}} as many boys as girls.",
      difficulty: "core",
      guideRef: "ratios-and-fractions",
      hints: [
        "How many equal parts is the whole CCA split into?",
        "A fraction *of the members* needs the total number of parts on the bottom.",
      ],
      strategy: "Draw a bar model",
    },
    {
      kind: "short",
      id: "ratio-proportion-quiz-q05",
      question:
        "Shampoo is sold in a 750 ml bottle for $6.30 and in a 1.2 litre bottle for $9.60. Work out the price per 100 ml for each bottle. What is the price per 100 ml of the better buy? Give your answer in dollars.",
      answer: { type: "number", value: 0.8, display: "$0.80" },
      solution: [
        "Compare the price of the same amount: 100 ml.",
        "750 ml is 7.5 lots of 100 ml: $6.30 ÷ 7.5 = $0.84 per 100 ml.",
        "1.2 litres = 1200 ml, which is 12 lots of 100 ml: $9.60 ÷ 12 = $0.80 per 100 ml.",
        "The 1.2 litre bottle is the better buy at $0.80 per 100 ml.",
      ],
      commonError: "Comparing the prices ($6.30 and $9.60) instead of the price for the same amount.",
      traps: [
        {
          spec: { type: "number", value: 0.84 },
          feedback: "$0.84 is the price per 100 ml of the 750 ml bottle. The better buy has the *lower* unit price.",
        },
        { spec: { type: "number", value: 8 }, feedback: "$8 is the price per litre. Divide by 10 to get the price per 100 ml." },
      ],
      difficulty: "core",
      guideRef: "direct-proportion",
      hints: [
        "Compare like with like: find the cost of the same amount (100 ml) from each bottle.",
        "How many lots of 100 ml are in 750 ml? In 1.2 litres?",
        "Divide each price by its number of 100 ml lots.",
      ],
      strategy: "Compare like with like",
    },
    {
      kind: "mcq",
      id: "ratio-proportion-quiz-q06",
      question: "A map has a scale of 1 : 40 000. A straight road is 5 cm long on the map. How long is the real road?",
      options: ["20 km", "200 m", "2 km", "2000 km"],
      answerIndex: 2,
      explanation:
        "Map → real: 5 × 40 000 = 200 000 cm. Divide by 100 to get 2000 m, then by 1000 to get 2 km. 2000 km comes from stopping at metres but writing km; 200 m comes from dividing 200 000 by 1000 as if it were already metres; 20 km comes from dividing by 10 000 instead of 100 000.",
      difficulty: "core",
      guideRef: "scale-and-maps",
      hints: [
        "What does 1 cm on the map stand for in real life?",
        "Work out 5 × 40 000 cm, then convert: 100 cm in a metre, 1000 m in a kilometre.",
      ],
      strategy: "Keep the same units on both sides",
    },
    {
      kind: "short",
      id: "ratio-proportion-quiz-q07",
      question:
        "Zara books a hotel in Paris that costs €238 per night. The exchange rate is $1 = €0.70. How much is one night in Singapore dollars?",
      answer: { type: "number", value: 340, display: "$340" },
      solution: [
        "Euros → dollars: divide by the rate, because each $1 buys only €0.70.",
        "238 ÷ 0.70 = 340.",
        "So one night costs $340.",
        "Sense check: €1 is worth more than $1, so the dollar amount should be bigger than 238 ✓",
      ],
      commonError: "Multiplying by the exchange rate when converting back into dollars.",
      traps: [
        {
          spec: { type: "number", value: 166.6 },
          feedback: "You multiplied by 0.70 — that converts dollars into euros. To go from euros back to dollars, divide.",
        },
      ],
      difficulty: "core",
      guideRef: "recipes-and-currency",
      hints: [
        "Should the answer in dollars be bigger or smaller than 238?",
        "$1 buys €0.70, so to change euros into dollars, divide by 0.70.",
      ],
      strategy: "Sense-check the size of the answer",
    },
    {
      kind: "short",
      id: "ratio-proportion-quiz-q08",
      question:
        "A bag holds red and green marbles in the ratio 5 : 2. There are 27 more red marbles than green marbles. How many marbles are in the bag altogether?",
      answer: { type: "number", value: 63 },
      solution: [
        "The difference is 5 − 2 = 3 parts.",
        "3 parts = 27 marbles, so one part = 9 marbles.",
        "Altogether there are 5 + 2 = 7 parts = 7 × 9 = 63 marbles.",
        "Check: 45 red and 18 green, and 45 − 18 = 27 ✓",
      ],
      commonError: "Treating 27 as one part, or as the total, instead of as the difference of 3 parts.",
      traps: [
        { spec: { type: "number", value: 45 }, feedback: "45 is the number of red marbles only. Add the green ones." },
        { spec: { type: "number", value: 189 }, feedback: "You multiplied 27 by 7. But 27 is the *difference* (3 parts), not one part." },
      ],
      difficulty: "core",
      guideRef: "sharing-in-a-ratio",
      hints: [
        "In a bar model, how many boxes longer is the red bar than the green bar?",
        "Those 3 boxes are worth 27 marbles.",
        "Find one box, then count all 7 boxes.",
      ],
      strategy: "Use a bar model",
    },
    {
      kind: "mcq",
      id: "ratio-proportion-quiz-q09",
      question:
        "8 friends share the cost of a karaoke room equally, and each pays $15. If only 6 friends share the same room, how much does each pay?",
      options: ["$11.25", "$17", "$90", "$20"],
      answerIndex: 3,
      explanation:
        "The room costs 8 × $15 = $120 whoever shares it. Shared by 6, each pays $120 ÷ 6 = $20 — fewer people, so each pays more (inverse proportion). $11.25 treats it as direct proportion (fewer people, less each). $17 adds $1 for each missing friend, and $90 is what 6 people paying $15 each would raise, not the cost per person.",
      difficulty: "core",
      guideRef: "inverse-proportion",
      hints: ["Should each person pay more or less when fewer people share?", "What is the total cost of the room? That stays the same."],
      strategy: "Find the constant product",
    },
    {
      kind: "written",
      id: "ratio-proportion-quiz-q10",
      question:
        "Wei Ling has two jugs of orange drink. Jug A holds 400 ml of cordial and water mixed in the ratio 1 : 3. Jug B holds 300 ml mixed in the ratio 1 : 5. She pours both jugs into one bowl and says:\n\n> 'The new mix must be 1 : 4, because 4 is halfway between 3 and 5.'\n\nIs she right? Work out the actual ratio of cordial to water in the bowl, in its simplest form, and explain what is wrong with her reasoning.",
      marks: 4,
      modelAnswer:
        "No, she is not right.\n\nJug A: 1 + 3 = 4 parts, so one part = 400 ÷ 4 = 100 ml. It holds 100 ml of cordial and 300 ml of water.\n\nJug B: 1 + 5 = 6 parts, so one part = 300 ÷ 6 = 50 ml. It holds 50 ml of cordial and 250 ml of water.\n\nIn the bowl: cordial = 100 + 50 = 150 ml and water = 300 + 250 = 550 ml, so cordial : water = 150 : 550 = **3 : 11** (about 1 : 3.67), not 1 : 4.\n\nHer mistake is averaging the ratios. You can only combine mixtures by adding the actual amounts. The jugs are different sizes — and the bigger jug A is also the stronger mix — so the bowl is stronger than 1 : 4.",
      markScheme: [
        { point: "Finds jug A holds 100 ml of cordial and 300 ml of water", keywords: ["100", "300"] },
        { point: "Finds jug B holds 50 ml of cordial and 250 ml of water", keywords: ["50", "250"] },
        { point: "Adds to get 150 : 550 and simplifies to 3 : 11", keywords: ["150", "550", "3 : 11", "3:11"] },
        {
          point: "Explains she is wrong: you can't average ratios; you must add actual amounts because the jugs are different sizes",
          keywords: ["no", "not", "average", "different sizes", "amounts", "bigger"],
        },
      ],
      commonError: "Adding the ratios to get 2 : 8 = 1 : 4 — that only works if both jugs contain the same amount of cordial.",
      difficulty: "challenge",
      guideRef: "ratio-basics",
      hints: [
        "A ratio describes a mix, not the amounts. How much cordial is actually in each jug?",
        "Jug A is 4 parts of 100 ml. Jug B is 6 parts of 50 ml.",
        "Add the cordial, add the water, then simplify.",
      ],
      strategy: "Find one part first",
    },
  ],

  // =================================================================== PAPERS
  papers: [
    {
      id: "ratio-proportion-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "ratio-proportion-p1-q01",
          question: "Write 35 minutes : 2 hours as a ratio in its simplest form.",
          answer: { type: "ratio", parts: [7, 24], simplest: true },
          solution: [
            "Same units: 2 hours = 120 minutes.",
            "The ratio is 35 : 120.",
            "The HCF of 35 and 120 is 5.",
            "35 ÷ 5 = 7 and 120 ÷ 5 = 24, so the ratio is 7 : 24.",
          ],
          commonError: "Using 2 hours = 200 minutes. An hour has 60 minutes.",
          traps: [
            { spec: { type: "ratio", parts: [35, 2] }, feedback: "Convert the hours into minutes first — both parts must be in the same unit." },
            { spec: { type: "ratio", parts: [7, 40] }, feedback: "An hour has 60 minutes, not 100. So 2 hours = 120 minutes." },
          ],
          difficulty: "warmup",
          guideRef: "ratio-basics",
          hints: ["Make the units match first.", "How many minutes are in 2 hours?"],
          strategy: "Convert to the same units first",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q02",
          question:
            "A 150 g bag of trail mix contains raisins, nuts and seeds in the ratio 2 : 5 : 3. How many grams of each are in the bag? Give your answers in the order raisins, nuts, seeds.",
          answer: { type: "list", values: [30, 75, 45], ordered: true, display: "30 g, 75 g, 45 g" },
          solution: [
            "Total parts: 2 + 5 + 3 = 10.",
            "One part: 150 ÷ 10 = 15 g.",
            "Raisins: 2 × 15 = 30 g. Nuts: 5 × 15 = 75 g. Seeds: 3 × 15 = 45 g.",
            "Check: 30 + 75 + 45 = 150 ✓",
          ],
          commonError: "Dividing 150 by each number in the ratio instead of by the total number of parts.",
          traps: [
            {
              spec: { type: "list", values: [75, 30, 50], ordered: true },
              feedback: "You divided 150 by each number in the ratio. Find one part first: 150 ÷ (2 + 5 + 3).",
            },
          ],
          difficulty: "warmup",
          guideRef: "sharing-in-a-ratio",
          hints: ["How many parts are there altogether?", "Find the mass of one part, then multiply."],
          strategy: "Find one part first",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q03",
          question:
            "{{2/9}} of the people on a school bus are adults, and the rest are children. Write the ratio adults : children in its simplest form.",
          answer: { type: "ratio", parts: [2, 7], simplest: true },
          solution: [
            "The children are {{1 - 2/9 = 7/9}} of the bus.",
            "So for every 2 adults there are 7 children.",
            "Adults : children = 2 : 7.",
          ],
          commonError: "Writing 2 : 9 — the 9 is the whole bus, not the children.",
          traps: [
            { spec: { type: "ratio", parts: [2, 9] }, feedback: "9 is the whole bus, not the children. The children are the other 7 ninths." },
          ],
          difficulty: "warmup",
          guideRef: "ratios-and-fractions",
          hints: ["What fraction of the bus are children?", "Compare the adults' ninths with the children's ninths."],
          strategy: "Find the rest (1 minus the fraction)",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q04",
          question: "5 identical exercise books cost $6.25. How much do 8 of these books cost? Give your answer in dollars.",
          answer: { type: "number", value: 10, display: "$10.00" },
          solution: ["One book: $6.25 ÷ 5 = $1.25.", "8 books: 8 × $1.25 = $10.00."],
          commonError: "Adding $3 because 8 is 3 more than 5 — proportion problems need multiplying, not adding.",
          traps: [
            {
              spec: { type: "number", value: 9.25 },
              feedback: "You added $3 because 8 is 3 more than 5. Proportion means multiplying: find the cost of one book first.",
            },
          ],
          difficulty: "warmup",
          guideRef: "direct-proportion",
          hints: ["How much does one book cost?"],
          strategy: "Find one unit first (unitary method)",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q05",
          question: "A recipe for 12 oat cookies uses 150 g of butter. How many grams of butter are needed for 30 cookies?",
          answer: { type: "number", value: 375, display: "375 g" },
          solution: [
            "Multiplier = {{30/12 = 2.5}}.",
            "Butter: 150 × 2.5 = 375 g.",
            "(Or via one cookie: 150 ÷ 12 = 12.5 g, and 30 × 12.5 = 375 g.)",
          ],
          traps: [
            { spec: { type: "number", value: 168 }, feedback: "You added 18 g because 30 is 18 more than 12. Recipes scale by multiplying." },
          ],
          difficulty: "warmup",
          guideRef: "recipes-and-currency",
          hints: ["How many times bigger is 30 than 12?", "Or find the butter for one cookie first."],
          strategy: "Find the multiplier",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q06",
          question:
            "A map has a scale of 1 : 25 000. The real distance between two MRT stations is 4.5 km. How far apart are they on the map? Give your answer in cm.",
          answer: { type: "number", value: 18, display: "18 cm" },
          solution: [
            "Convert the real distance to cm: 4.5 km = 4500 m = 450 000 cm.",
            "Real → map: divide by 25 000.",
            "450 000 ÷ 25 000 = 18 cm.",
          ],
          commonError: "Dividing the distance in metres (4500) by 25 000 — both sides of the scale must use the same unit.",
          traps: [
            {
              spec: { type: "number", value: 0.18 },
              feedback: "You divided 4500 m by 25 000. Convert the real distance into centimetres first: 4.5 km = 450 000 cm.",
            },
            { spec: { type: "number", value: 112500 }, feedback: "You multiplied by 25 000. Real → map makes the distance smaller, so divide." },
          ],
          difficulty: "core",
          guideRef: "scale-and-maps",
          hints: [
            "Will the map distance be bigger or smaller than the real distance?",
            "Put the real distance into centimetres first.",
            "4.5 km = 450 000 cm. Now divide by 25 000.",
          ],
          strategy: "Keep the same units on both sides",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q07",
          question:
            "Aisha and Ethan save money in the ratio 7 : 4. Ethan has saved $84. How much have they saved altogether? Give your answer in dollars.",
          answer: { type: "number", value: 231, display: "$231" },
          solution: [
            "Ethan is 4 parts, so 4 parts = $84.",
            "One part = $84 ÷ 4 = $21.",
            "Altogether: 7 + 4 = 11 parts = 11 × $21 = $231.",
            "Check: Aisha has 7 × $21 = $147, and $147 + $84 = $231 ✓",
          ],
          traps: [
            { spec: { type: "number", value: 147 }, feedback: "$147 is Aisha's savings only. Add Ethan's $84." },
            { spec: { type: "number", value: 132 }, feedback: "You treated $84 as 7 parts. Ethan is the 4 in the ratio." },
          ],
          difficulty: "core",
          guideRef: "sharing-in-a-ratio",
          hints: ["Which number in the ratio belongs to Ethan?", "4 parts = $84. Find one part.", "How many parts are there altogether?"],
          strategy: "Use a bar model",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q08",
          question: "Write the ratio 8 : 30 in the form 1 : n. What is the value of n? Give it as a decimal.",
          answer: { type: "number", value: 3.75, allowFraction: false },
          solution: ["To make the first part 1, divide both parts by 8.", "8 ÷ 8 = 1 and 30 ÷ 8 = 3.75.", "So 8 : 30 = 1 : 3.75, and n = 3.75."],
          commonError: "Dividing 8 by 30 — to make the *first* part 1, divide both parts by 8.",
          traps: [
            {
              spec: { type: "number", value: 0.27, tolerance: 0.005 },
              feedback: "You divided 8 by 30. To make the first part equal to 1, divide *both* parts by 8: 30 ÷ 8.",
            },
          ],
          difficulty: "core",
          guideRef: "ratio-basics",
          hints: ["What must you divide 8 by to get 1?", "Do exactly the same to the other part."],
          strategy: "Use the form 1 : n to compare",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q09",
          question:
            "A 360 g box of cereal costs $4.50, and an 850 g box of the same cereal costs $10. Work out how many grams of cereal you get for each dollar from each box. How many more grams per dollar does the better buy give?",
          answer: { type: "number", value: 5, display: "5 g per dollar" },
          solution: [
            "Small box: 360 ÷ 4.50 = 80 g per dollar.",
            "Large box: 850 ÷ 10 = 85 g per dollar.",
            "The large box gives more cereal per dollar, so it is the better buy.",
            "It gives 85 − 80 = 5 g more per dollar.",
          ],
          solutions: [
            {
              label: "Price per 100 g instead",
              steps: [
                "Small: $4.50 ÷ 3.6 = $1.25 per 100 g.",
                "Large: $10 ÷ 8.5 ≈ $1.18 per 100 g.",
                "The large box is cheaper per 100 g — the same conclusion. But grams per dollar gives whole numbers here, so it is the quicker method for this question.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 490 },
              feedback: "490 g is the difference between the box sizes. Compare grams *per dollar*: divide each mass by its price.",
            },
          ],
          difficulty: "core",
          guideRef: "direct-proportion",
          hints: [
            "For 'grams per dollar', which number do you divide by which?",
            "Mass ÷ price gives grams per dollar.",
            "Find both rates, then subtract.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "written",
          id: "ratio-proportion-p1-q10",
          question:
            "A print shop charges for posters as shown.\n\n| Number of posters | 10 | 20 | 50 |\n|---|---|---|---|\n| Cost ($) | 18 | 30 | 66 |\n\nArjun says, 'The cost is directly proportional to the number of posters.' Is he right? Explain using the numbers in the table.",
          marks: 3,
          modelAnswer:
            "No, Arjun is wrong.\n\nIf the cost were directly proportional, the cost per poster would be the same every time. But $18 ÷ 10 = $1.80, $30 ÷ 20 = $1.50 and $66 ÷ 50 = $1.32, which are not equal. Another check: doubling from 10 to 20 posters should double the cost to $36, but it is only $30.\n\nIn fact each extra poster costs $1.20 (10 more posters cost $12 more), plus a fixed $6 set-up fee: $6 + 10 × $1.20 = $18. Because of the fixed fee, 0 posters would still cost $6, so the graph would not pass through the origin.",
          markScheme: [
            {
              point: "Works out the cost per poster for at least two columns ($1.80, $1.50, $1.32) or shows that doubling 10 → 20 posters does not double the cost",
              keywords: ["1.80", "1.8", "1.50", "1.5", "1.32", "36", "double"],
            },
            {
              point: "Concludes it is not directly proportional because the cost per poster is not constant",
              keywords: ["no", "not", "constant", "not the same", "not proportional"],
            },
            {
              point: "Identifies the fixed charge: $1.20 per poster plus a $6 fee, so the graph would not go through the origin",
              keywords: ["6", "fixed", "1.20", "1.2", "origin", "fee", "set-up"],
            },
          ],
          commonError: "Saying 'yes, because the cost goes up when the number of posters goes up' — increasing together is not enough; the ratio must stay constant.",
          difficulty: "core",
          guideRef: "direct-proportion",
          hints: [
            "If cost is directly proportional, what stays the same in every column?",
            "Work out cost ÷ number of posters for each column.",
            "Look at what 10 extra posters add to the cost. Is there something left over?",
          ],
          strategy: "Check for a constant ratio",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q11",
          question:
            "Before a trip to Bangkok, Zara changes $300 into Thai baht at $1 = 26 baht. She spends 6500 baht. When she gets home, she changes the baht she has left back into dollars at the same rate. How many dollars does she get back?",
          answer: { type: "number", value: 50, display: "$50" },
          solution: [
            "Dollars → baht: 300 × 26 = 7800 baht.",
            "Left after spending: 7800 − 6500 = 1300 baht.",
            "Baht → dollars: 1300 ÷ 26 = $50.",
          ],
          solutions: [
            {
              label: "Work in dollars",
              steps: [
                "The 6500 baht she spent is worth 6500 ÷ 26 = $250.",
                "She started with $300, so $300 − $250 = $50 is left.",
                "Only one conversion is needed, so this is the quicker method.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 33800 }, feedback: "You multiplied the leftover baht by 26. Baht → dollars means dividing." },
            { spec: { type: "number", value: 250 }, feedback: "$250 is the value of what she *spent*. Subtract it from $300." },
          ],
          difficulty: "core",
          guideRef: "recipes-and-currency",
          hints: [
            "How many baht does she get for $300?",
            "How many baht are left after she spends 6500?",
            "To change baht back into dollars, divide by 26.",
          ],
          strategy: "Sense-check the size of the answer",
        },
        {
          kind: "written",
          id: "ratio-proportion-p1-q12",
          question:
            "Rectangle P measures 4 cm by 10 cm. Rectangle Q is similar to P, and its shorter side is 10 cm. Arjun works out the longer side of Q like this:\n\n    The short side went from 4 cm to 10 cm, which is 6 cm more.\n    So the long side is 10 + 6 = 16 cm.\n\nExplain what Arjun has done wrong, and find the correct length of the longer side of Q.",
          diagram: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle P, 4 cm by 10 cm, and a larger similar rectangle Q whose short side is 10 cm and whose long side is unknown"><rect x="0" y="0" width="320" height="180" fill="#ffffff"/><rect x="40" y="106" width="60" height="24" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="150" y="70" width="150" height="60" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><g font-family="sans-serif" fill="#1f2937"><text x="70" y="98" font-size="13" font-weight="bold" text-anchor="middle">P</text><text x="70" y="148" font-size="12" text-anchor="middle">10 cm</text><text x="34" y="122" font-size="12" text-anchor="end">4 cm</text><text x="225" y="62" font-size="13" font-weight="bold" text-anchor="middle">Q</text><text x="225" y="148" font-size="13" text-anchor="middle">?</text><text x="144" y="104" font-size="12" text-anchor="end">10 cm</text></g></svg>`,
          marks: 3,
          modelAnswer:
            "Arjun has *added* 6 cm to each side, but similar shapes are enlargements: every length is *multiplied* by the same scale factor. Adding the same amount changes the shape — his rectangle would be 10 cm by 16 cm, which has the ratio 10 : 16 = 5 : 8, but P has the ratio 4 : 10 = 2 : 5.\n\nThe scale factor is 10 ÷ 4 = 2.5, so the longer side of Q is 10 × 2.5 = **25 cm**. Check: 10 : 25 = 2 : 5 ✓",
          markScheme: [
            {
              point: "Explains that he added instead of multiplying — similar shapes use a scale factor (multiplier)",
              keywords: ["added", "add", "multiply", "multiplied", "scale factor", "times"],
            },
            { point: "Finds the scale factor 10 ÷ 4 = 2.5", keywords: ["2.5", "10 ÷ 4", "10/4"] },
            { point: "Correct longer side: 25 cm", keywords: ["25"] },
          ],
          commonError: "Adding the same amount to every side — that changes the shape, so the rectangles are no longer similar.",
          difficulty: "core",
          guideRef: "scale-and-maps",
          hints: [
            "For similar shapes, do the lengths change by adding or by multiplying?",
            "Find the scale factor from the pair of short sides.",
            "Multiply the long side of P by that scale factor.",
          ],
          strategy: "Find the scale factor from corresponding sides",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q13",
          question:
            "In a school library, the ratio of fiction books to non-fiction books is 5 : 3. {{2/5}} of the non-fiction books are science books. There are 96 science books. How many books are in the library altogether?",
          answer: { type: "number", value: 640 },
          solution: [
            "Science books are {{2/5}} of the non-fiction, so {{1/5}} of the non-fiction is 96 ÷ 2 = 48 books.",
            "Non-fiction = 5 × 48 = 240 books.",
            "Non-fiction is 3 parts of the ratio, so one part = 240 ÷ 3 = 80 books.",
            "Total = 5 + 3 = 8 parts = 8 × 80 = 640 books.",
          ],
          traps: [
            { spec: { type: "number", value: 400 }, feedback: "400 is the number of fiction books. Add the 240 non-fiction books." },
            {
              spec: { type: "number", value: 256 },
              feedback: "96 is only the science books, which are {{2/5}} of the non-fiction. Find the number of non-fiction books first.",
            },
          ],
          difficulty: "core",
          guideRef: "ratios-and-fractions",
          hints: [
            "Work backwards: first find how many non-fiction books there are.",
            "96 is {{2/5}} of the non-fiction books. What is {{1/5}} of them?",
            "Non-fiction is 3 parts. Find one part, then all 8 parts.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "ratio-proportion-p1-q14",
          question:
            "Wei Ling mixes pink paint using red and white paint in the ratio 3 : 8. Marcus mixes his pink paint using red and white in the ratio 5 : 13. Whose paint is redder (more red for each part of white)? Show your method clearly.",
          marks: 3,
          modelAnswer:
            "Write both ratios in the form 1 : n by dividing by the red part.\n\nWei Ling: 3 : 8 = 1 : 2.67 (to 2 d.p.).\nMarcus: 5 : 13 = 1 : 2.6.\n\nFor every 1 part of red, Marcus uses 2.6 parts of white but Wei Ling uses about 2.67 parts. Marcus uses less white for the same amount of red, so **Marcus's paint is redder**.\n\n(Another way: make the red parts equal. 3 : 8 = 15 : 40 and 5 : 13 = 15 : 39. With 15 parts of red each, Marcus adds only 39 parts of white, so his paint is redder.)",
          markScheme: [
            {
              point: "Uses a valid method to compare: the form 1 : n, equal red parts (LCM 15), or fractions/decimals",
              keywords: ["1 :", "1:", "15", "lcm", "decimal", "fraction", "divide"],
            },
            {
              point: "Correct values, e.g. 1 : 2.67 and 1 : 2.6, or 15 : 40 and 15 : 39, or 0.375 and 0.385",
              keywords: ["2.67", "2.6", "40", "39", "0.375", "0.385", "0.38"],
            },
            { point: "Correct conclusion with a reason: Marcus's is redder because it has less white for the same red", keywords: ["marcus", "less white", "more red"] },
          ],
          solutions: [
            {
              label: "Make the red parts equal",
              steps: [
                "The LCM of 3 and 5 is 15.",
                "Wei Ling: 3 : 8 = 15 : 40. Marcus: 5 : 13 = 15 : 39.",
                "Same red, less white, so Marcus's paint is redder. This avoids decimals, so it is the neater method here.",
              ],
            },
          ],
          commonError: "Comparing 8 − 3 = 5 with 13 − 5 = 8. Subtracting the parts does not compare ratios.",
          difficulty: "core",
          guideRef: "ratio-basics",
          hints: [
            "You can't compare 3 : 8 and 5 : 13 directly — the red parts are different. How could you make them comparable?",
            "Try writing each ratio in the form 1 : n.",
            "Or make the red parts equal: what is the LCM of 3 and 5?",
          ],
          strategy: "Use the form 1 : n to compare",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q15",
          question:
            "Priya, Arjun and Siti share some money in the ratio 2 : 3 : 7. Siti gets $60 more than Priya. How much does Arjun get? Give your answer in dollars.",
          answer: { type: "number", value: 36, display: "$36" },
          solution: [
            "Siti has 7 parts and Priya has 2, so the difference is 7 − 2 = 5 parts.",
            "5 parts = $60, so one part = $12.",
            "Arjun has 3 parts: 3 × $12 = $36.",
            "Check: Priya $24, Arjun $36, Siti $84, and $84 − $24 = $60 ✓",
          ],
          traps: [
            {
              spec: { type: "number", value: 45 },
              feedback: "You compared Siti with Arjun (7 − 3 = 4 parts). The $60 is the gap between Siti and *Priya*: 7 − 2 = 5 parts.",
            },
            { spec: { type: "number", value: 144 }, feedback: "$144 is the total. The question asks for Arjun's share only." },
          ],
          difficulty: "core",
          guideRef: "sharing-in-a-ratio",
          hints: ["How many more parts does Siti have than Priya?", "Those parts are worth $60. Find one part.", "Arjun has 3 parts."],
          strategy: "Use a bar model",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q16",
          question:
            "6 cleaners can clean a school hall in 2 hours 30 minutes. How many minutes would 5 cleaners take, working at the same rate?",
          answer: { type: "number", value: 180, display: "180 minutes (3 hours)" },
          solution: [
            "Fewer cleaners → more time, so expect more than 150 minutes.",
            "2 hours 30 minutes = 150 minutes.",
            "Total work = 6 × 150 = 900 cleaner-minutes.",
            "With 5 cleaners: 900 ÷ 5 = 180 minutes (3 hours).",
          ],
          commonError: "Treating it as direct proportion — fewer cleaners take *longer*, not less time.",
          traps: [
            {
              spec: { type: "number", value: 125 },
              feedback: "Fewer cleaners should take *longer*, not less time. This is inverse proportion: multiply to find the total work, then divide.",
            },
            { spec: { type: "number", value: 3 }, feedback: "3 is the answer in hours. The question asks for minutes." },
          ],
          difficulty: "core",
          guideRef: "inverse-proportion",
          hints: [
            "Will 5 cleaners take more or less time than 6 cleaners?",
            "Change the time into minutes, then find the total work in 'cleaner-minutes'.",
            "6 × 150 = 900. Share that between 5 cleaners.",
          ],
          strategy: "Find the constant product",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q17",
          question:
            "A map has a scale of 1 : 20 000. A rectangular park measures 6 cm by 4 cm on the map. What is the real area of the park in km²?",
          answer: { type: "number", value: 0.96, display: "0.96 km²" },
          solution: [
            "Convert each side separately. 6 cm on the map = 6 × 20 000 = 120 000 cm = 1.2 km.",
            "4 cm on the map = 4 × 20 000 = 80 000 cm = 0.8 km.",
            "Area = 1.2 × 0.8 = 0.96 km².",
          ],
          solutions: [
            {
              label: "Scale the area directly",
              steps: [
                "1 cm on the map is 20 000 cm = 0.2 km, so 1 cm² on the map stands for 0.2 × 0.2 = 0.04 km².",
                "The map area is 6 × 4 = 24 cm².",
                "Real area = 24 × 0.04 = 0.96 km². Both methods work; converting the sides first is the safer one.",
              ],
            },
          ],
          commonError: "Multiplying the map area by 20 000. Every *length* is multiplied by 20 000, so an area is multiplied by 20 000 × 20 000.",
          traps: [
            {
              spec: { type: "number", value: 4.8 },
              feedback: "You multiplied the map *area* (24 cm²) by 20 000. Areas don't scale like lengths — convert each side to km first, then multiply.",
            },
            { spec: { type: "number", value: 96 }, feedback: "Check your conversion: 120 000 cm is 1.2 km, not 12 km." },
          ],
          difficulty: "challenge",
          guideRef: "scale-and-maps",
          hints: [
            "The scale works on *lengths*. What are the real length and width of the park?",
            "Work out 6 × 20 000 cm and convert it to km. Do the same for 4 cm.",
            "Multiply the real length by the real width.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q18",
          question:
            "A jar contains red, blue and green beads in the ratio 3 : 4 : 5. Hana adds 24 red beads and nothing else. Now the ratio of red beads to blue beads is 3 : 2. How many beads were in the jar at the start?",
          answer: { type: "number", value: 96 },
          solution: [
            "The blue beads don't change, so use them as the anchor. At the start, red : blue = 3 : 4.",
            "Afterwards, red : blue = 3 : 2 = 6 : 4 — the same 4 parts of blue, so the parts are the same size.",
            "Red went from 3 parts to 6 parts, so the 24 added beads are 3 parts: one part = 8 beads.",
            "At the start there were 3 + 4 + 5 = 12 parts = 12 × 8 = 96 beads.",
            "Check: 24 red, 32 blue, 40 green. Adding 24 red gives 48 : 32 = 3 : 2 ✓",
          ],
          solutions: [
            {
              label: "Algebra",
              steps: [
                "Let the start be 3k red, 4k blue and 5k green.",
                "Afterwards {{(3k + 24)/(4k) = 3/2}}, so 6k + 48 = 12k.",
                "6k = 48, so k = 8, and the total is 12k = 96.",
                "The 'match the blue part' method is slicker — no equation needed.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 120 }, feedback: "120 is the number of beads *after* Hana adds 24. The question asks about the start." },
            { spec: { type: "number", value: 8 }, feedback: "8 is the size of one part. There were 3 + 4 + 5 = 12 parts at the start." },
          ],
          difficulty: "challenge",
          guideRef: "sharing-in-a-ratio",
          hints: [
            "Which colour does not change? Use it as your anchor.",
            "Rewrite the new ratio red : blue so that blue is 4 parts, as it was at the start.",
            "How many parts did the red go up by? Those parts are the 24 beads.",
          ],
          strategy: "Look for an invariant",
        },
        {
          kind: "short",
          id: "ratio-proportion-p1-q19",
          question:
            "In Year 8, the ratio of boys to girls is 5 : 4. {{1/3}} of the boys and {{1/2}} of the girls sing in the school choir. What fraction of all the Year 8 students sing in the choir? Give your answer in its simplest form.",
          answer: { type: "fraction", n: 11, d: 27, simplest: true },
          solution: [
            "Boys are {{5/9}} of Year 8 and girls are {{4/9}}.",
            "Choir boys: {{1/3 * 5/9 = 5/27}} of Year 8.",
            "Choir girls: {{1/2 * 4/9 = 2/9 = 6/27}} of Year 8.",
            "Total: {{5/27 + 6/27 = 11/27}}.",
          ],
          solutions: [
            {
              label: "Test a convenient total",
              steps: [
                "Pick a year size that works for every fraction: the boys (5 parts) must split into thirds and the girls (4 parts) into halves. 54 students works (one part = 6).",
                "Boys = 30 and girls = 24.",
                "Choir: {{1/3}} of 30 = 10 and {{1/2}} of 24 = 12, so 22 students.",
                "{{22/54 = 11/27}}. Choosing a number is often quicker and easier to check.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "fraction", n: 5, d: 12 },
              feedback: "That's the average of {{1/3}} and {{1/2}}. There are more boys than girls, so you can't just average — try a year group of 54 students.",
            },
            {
              spec: { type: "fraction", n: 5, d: 6 },
              feedback: "You added {{1/3}} and {{1/2}}, but they are fractions of *different* groups. Find each one as a fraction of the whole year first.",
            },
          ],
          difficulty: "challenge",
          guideRef: "ratios-and-fractions",
          hints: [
            "What fraction of Year 8 are boys? What fraction are girls?",
            "Try a real year size that divides nicely. Why does 54 work?",
            "Find the number of choir boys and choir girls, add them, then write the total as a fraction of the year.",
          ],
          strategy: "Test with a convenient total",
        },
        {
          kind: "written",
          id: "ratio-proportion-p1-q20",
          question:
            "Mei shares an amount of money between Ravi and Jun in the ratio 2 : 3. The next week she shares the *same* amount between them in the ratio 3 : 4.\n\nRavi says, 'I always get more money the second week, whatever the amount.'\n\nIs Ravi right? Explain your answer fully, and say what fraction of the amount Ravi gains.",
          marks: 4,
          modelAnswer:
            "Yes, Ravi is right.\n\nWith the ratio 2 : 3 there are 5 parts, so Ravi gets {{2/5}} of the amount. With 3 : 4 there are 7 parts, so he gets {{3/7}} of the amount.\n\nOver a common denominator: {{2/5 = 14/35}} and {{3/7 = 15/35}}. So in the second week Ravi gets {{15/35}} of the amount instead of {{14/35}} — exactly {{1/35}} of the amount more.\n\nThis is true for *any* amount (more than $0), because Ravi's share is always a fixed fraction of the amount. For example, with $70 he gets $28 the first week and $30 the second week.",
          markScheme: [
            { point: "Writes Ravi's shares as fractions of the amount: {{2/5}} and {{3/7}}", keywords: ["2/5", "3/7"] },
            {
              point: "Compares them correctly, e.g. {{14/35}} and {{15/35}}, or 0.4 and 0.43",
              keywords: ["14/35", "15/35", "35", "0.4", "0.43", "0.428"],
            },
            {
              point: "Concludes Ravi is right for every amount, because the fractions do not depend on the amount",
              keywords: ["always", "right", "yes", "any amount", "whatever"],
            },
            { point: "States that Ravi gains {{1/35}} of the amount", keywords: ["1/35"] },
          ],
          commonError: "Testing just one amount and saying 'always'. One example shows it *can* happen; the fractions show it *always* happens.",
          difficulty: "challenge",
          guideRef: "sharing-in-a-ratio",
          hints: [
            "Ravi's share is a fraction of the amount. What fraction is it each week?",
            "Compare {{2/5}} and {{3/7}}. A common denominator helps.",
            "Does your comparison depend on how much money there is?",
          ],
          strategy: "Convert ratios to fractions",
        },
      ],
    },
    {
      id: "ratio-proportion-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "ratio-proportion-p2-q01",
          question: "Simplify the ratio 2.4 : 0.6 : 1.8.",
          answer: { type: "ratio", parts: [4, 1, 3], simplest: true },
          solution: [
            "Clear the decimals: multiply every part by 10 to get 24 : 6 : 18.",
            "The HCF of 24, 6 and 18 is 6.",
            "Divide every part by 6: 4 : 1 : 3.",
          ],
          commonError: "Stopping at 24 : 6 : 18 — that is equivalent, but every part can still be divided by 6.",
          difficulty: "warmup",
          guideRef: "ratio-basics",
          hints: ["Get rid of the decimals first — multiply every part by the same number.", "Then divide every part by the HCF."],
          strategy: "Divide by the HCF",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q02",
          question:
            "A 1.5 litre jug of drink is made from cordial and water in the ratio 1 : 4. How many millilitres of water are in the jug?",
          answer: { type: "number", value: 1200, display: "1200 ml" },
          solution: [
            "1.5 litres = 1500 ml.",
            "Total parts: 1 + 4 = 5, so one part = 1500 ÷ 5 = 300 ml.",
            "Water is 4 parts: 4 × 300 = 1200 ml.",
          ],
          traps: [
            { spec: { type: "number", value: 375 }, feedback: "You divided 1500 by 4. There are 1 + 4 = 5 parts altogether." },
            { spec: { type: "number", value: 300 }, feedback: "300 ml is the cordial (1 part). The water is 4 parts." },
          ],
          difficulty: "warmup",
          guideRef: "sharing-in-a-ratio",
          hints: ["Change litres into millilitres first.", "How many parts are there altogether?"],
          strategy: "Find one part first",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q03",
          question:
            "At a concert, the ratio of adults to children is 7 : 3. What fraction of the audience are children? Give your answer in its simplest form.",
          answer: { type: "fraction", n: 3, d: 10, simplest: true },
          solution: ["Total parts: 7 + 3 = 10.", "Children are 3 of those 10 equal parts, so {{3/10}} of the audience."],
          traps: [
            {
              spec: { type: "fraction", n: 3, d: 7 },
              feedback: "{{3/7}} compares children with *adults*. A fraction of the audience needs all 7 + 3 = 10 parts on the bottom.",
            },
          ],
          difficulty: "warmup",
          guideRef: "ratios-and-fractions",
          hints: ["How many parts make up the whole audience?"],
          strategy: "Draw a bar model",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q04",
          question: "A car uses 6 litres of petrol to travel 75 km. At the same rate, how many litres of petrol does it need to travel 200 km?",
          answer: { type: "number", value: 16, display: "16 litres" },
          solution: [
            "Find a friendly distance: 75 km uses 6 litres, so 25 km uses 2 litres.",
            "200 km is 8 lots of 25 km, so it uses 8 × 2 = 16 litres.",
          ],
          solutions: [
            {
              label: "Unitary method",
              steps: [
                "1 km uses 6 ÷ 75 = 0.08 litres.",
                "200 km uses 200 × 0.08 = 16 litres. Going via 25 km avoids the decimal, so it is quicker in your head.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 2500 },
              feedback: "That's 75 × 200 ÷ 6 — the calculation is upside down. Find the petrol for a smaller distance first, then scale up.",
            },
          ],
          difficulty: "warmup",
          guideRef: "direct-proportion",
          hints: ["Can you find how much petrol a smaller, friendlier distance uses?"],
          strategy: "Scale by a friendly factor",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q05",
          question:
            "The exchange rate is $1 = HK$5.80. How many Hong Kong dollars does Jun get for $40? Give your answer as a number of Hong Kong dollars.",
          answer: { type: "number", value: 232, display: "HK$232" },
          solution: ["Singapore dollars → Hong Kong dollars: multiply by 5.80.", "40 × 5.80 = 232, so Jun gets HK$232."],
          traps: [
            {
              spec: { type: "number", value: 6.9, tolerance: 0.01 },
              feedback: "You divided. Each Singapore dollar buys HK$5.80, so Jun gets *more* Hong Kong dollars — multiply.",
            },
          ],
          difficulty: "warmup",
          guideRef: "recipes-and-currency",
          hints: ["Each $1 becomes HK$5.80. Should the answer be bigger or smaller than 40?"],
          strategy: "Sense-check the size of the answer",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q06",
          question:
            "A walking map of the Southern Ridges has a scale of 1 : 12 500. A trail is 32 cm long on the map. How long is the real trail? Give your answer in km.",
          answer: { type: "number", value: 4, display: "4 km" },
          solution: ["Map → real: 32 × 12 500 = 400 000 cm.", "Divide by 100 to get metres: 4000 m.", "Divide by 1000 to get kilometres: 4 km."],
          traps: [
            { spec: { type: "number", value: 4000 }, feedback: "4000 is the length in metres. Divide by 1000 to get kilometres." },
            { spec: { type: "number", value: 40 }, feedback: "Check the conversion: 1 km = 100 000 cm, so 400 000 cm = 4 km." },
          ],
          difficulty: "core",
          guideRef: "scale-and-maps",
          hints: ["What does 1 cm on the map represent?", "Multiply, then convert cm → m → km."],
          strategy: "Keep the same units on both sides",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q07",
          question:
            "A fruit punch is made from pineapple juice, orange juice and lime juice in the ratio 6 : 5 : 1. Ravi uses 150 ml of orange juice. How many millilitres of punch does he make?",
          answer: { type: "number", value: 360, display: "360 ml" },
          solution: [
            "Orange is 5 parts, so 5 parts = 150 ml and one part = 30 ml.",
            "Total: 6 + 5 + 1 = 12 parts = 12 × 30 = 360 ml.",
            "Check: 180 + 150 + 30 = 360 ✓",
          ],
          traps: [
            { spec: { type: "number", value: 180 }, feedback: "180 ml is just the pineapple juice. Add all three juices." },
            { spec: { type: "number", value: 1800 }, feedback: "You multiplied 150 by 12. But 150 ml is 5 parts, not 1 part." },
          ],
          difficulty: "core",
          guideRef: "sharing-in-a-ratio",
          hints: ["Which number in the ratio matches the 150 ml?", "Find one part, then count all the parts."],
          strategy: "Find one part first",
        },
        {
          kind: "written",
          id: "ratio-proportion-p2-q08",
          question:
            "{{1/3}} of Ravi's money is equal to {{1/2}} of Hana's money.\n\nRavi says, 'So my money : Hana's money = 1 : 2.'\n\n(a) Explain why Ravi is wrong, and find the correct ratio Ravi : Hana.\n(b) Together they have $150. How much does Ravi have?",
          marks: 4,
          modelAnswer:
            "(a) Draw Ravi's money as a bar cut into 3 equal pieces and Hana's money as a bar cut into 2 equal pieces. One of Ravi's thirds equals one of Hana's halves, so all the pieces are the same size. Ravi's bar is 3 pieces long and Hana's is 2 pieces, so **Ravi : Hana = 3 : 2**. Ravi has *more* money, not less — a smaller fraction of a bigger amount equals a bigger fraction of a smaller amount.\n\n(b) 3 + 2 = 5 parts = $150, so one part = $30. Ravi has 3 × $30 = **$90** (and Hana has $60). Check: {{1/3}} of $90 = $30 = {{1/2}} of $60 ✓",
          markScheme: [
            {
              point: "Explains using equal pieces (bar model) or a numerical example: Ravi's money is 3 equal pieces and Hana's is 2 pieces of the same size",
              keywords: ["pieces", "units", "bar", "equal", "same size", "3 parts", "2 parts"],
            },
            { point: "Correct ratio Ravi : Hana = 3 : 2 (Ravi has more)", keywords: ["3 : 2", "3:2", "more"] },
            { point: "Finds one part = $150 ÷ 5 = $30", keywords: ["30", "5 parts", "150 ÷ 5"] },
            { point: "Ravi has $90", keywords: ["90"] },
          ],
          commonError: "Writing {{1/3}} : {{1/2}} and simplifying to 2 : 3 — that is upside down. Ravi needs a *smaller* fraction of his money to match Hana, so he has more.",
          difficulty: "core",
          guideRef: "ratios-and-fractions",
          hints: [
            "Draw two bars: cut Ravi's into thirds and Hana's into halves.",
            "One third of Ravi's bar is the same size as one half of Hana's. So how many equal pieces long is each bar?",
            "Share $150 in the ratio you found.",
          ],
          strategy: "Draw a bar model",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q09",
          question:
            "Washing powder comes in three sizes: 1.5 kg for $7.20, 2.5 kg for $11.50 and 4 kg for $19.20. What is the price per kg of the best buy? Give your answer in dollars.",
          answer: { type: "number", value: 4.6, display: "$4.60 per kg" },
          solution: [
            "1.5 kg: $7.20 ÷ 1.5 = $4.80 per kg.",
            "2.5 kg: $11.50 ÷ 2.5 = $4.60 per kg.",
            "4 kg: $19.20 ÷ 4 = $4.80 per kg.",
            "The best buy is the 2.5 kg box at $4.60 per kg — the biggest box is not the cheapest per kg.",
          ],
          traps: [
            {
              spec: { type: "number", value: 4.8 },
              feedback: "$4.80 per kg is the price for both the smallest and the largest box. Check the middle size.",
            },
          ],
          difficulty: "core",
          guideRef: "direct-proportion",
          hints: ["Find the cost of 1 kg for each size.", "Divide each price by its mass in kg."],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q10",
          question: "Write 45 g : 0.36 kg in the form 1 : n. What is the value of n?",
          answer: { type: "number", value: 8 },
          solution: ["Same units first: 0.36 kg = 360 g.", "The ratio is 45 : 360.", "Divide both parts by 45: 1 : 8. So n = 8."],
          commonError: "Forgetting to convert the units before dividing.",
          traps: [
            { spec: { type: "number", value: 0.008 }, feedback: "You divided 0.36 by 45 without converting. Change 0.36 kg into grams first." },
          ],
          difficulty: "core",
          guideRef: "ratio-basics",
          hints: ["Units first: how many grams is 0.36 kg?", "Then divide both parts by the first part."],
          strategy: "Convert to the same units first",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q11",
          question: "A pasta recipe for 5 people uses 350 g of pasta. Mei has 980 g of pasta. How many people can she feed using this recipe?",
          answer: { type: "number", value: 14, display: "14 people" },
          solution: ["Pasta per person: 350 ÷ 5 = 70 g.", "980 ÷ 70 = 14 people."],
          solutions: [
            {
              label: "Count batches",
              steps: [
                "980 ÷ 350 = 2.8 batches of the recipe.",
                "2.8 × 5 = 14 people. Going via one person avoids the decimal, so it is slightly quicker.",
              ],
            },
          ],
          traps: [{ spec: { type: "number", value: 2.8 }, feedback: "2.8 is the number of *batches* of the recipe. Each batch feeds 5 people." }],
          difficulty: "core",
          guideRef: "recipes-and-currency",
          hints: ["How much pasta does one person need?", "How many 70 g portions are there in 980 g?"],
          strategy: "Go via one (unitary method)",
        },
        {
          kind: "written",
          id: "ratio-proportion-p2-q12",
          question:
            "A recipe for 12 potato curry puffs uses 360 g of potato, 240 g of flour and 60 g of peas. Priya has 1.5 kg of potato, 900 g of flour and 300 g of peas.\n\nPriya says, 'I've got the least peas, so the peas will run out first.'\n\n(a) Explain why Priya is wrong.\n(b) What is the greatest number of curry puffs she can make?",
          marks: 4,
          modelAnswer:
            "(a) Having the smallest *amount* of peas doesn't matter — the recipe also needs only a small amount of peas. You must compare what she has with what the recipe needs. Peas: 300 ÷ 60 = 5, so she has enough peas for 5 batches.\n\n(b) Potato: 1500 ÷ 360 ≈ 4.17 batches. Flour: 900 ÷ 240 = 3.75 batches. Peas: 5 batches.\n\nThe flour runs out first, so she can make 3.75 batches: 3.75 × 12 = **45 curry puffs**.\n\n(Check by going via one puff: each needs 240 ÷ 12 = 20 g of flour, and 900 ÷ 20 = 45.)",
          markScheme: [
            {
              point: "Explains she must compare what she has with what the recipe needs, e.g. peas: 300 ÷ 60 = 5 batches",
              keywords: ["5 batches", "batches", "recipe needs", "compare", "300 ÷ 60"],
            },
            { point: "Flour: 900 ÷ 240 = 3.75 batches (potato about 4.17 batches)", keywords: ["3.75", "4.17", "4.16"] },
            { point: "Identifies flour as the limiting ingredient", keywords: ["flour"] },
            { point: "Greatest number: 3.75 × 12 = 45 curry puffs", keywords: ["45"] },
          ],
          commonError: "Rounding 3.75 batches down to 3 batches (36 curry puffs). You can scale a recipe by 3.75, so 45 is possible.",
          difficulty: "core",
          guideRef: "recipes-and-currency",
          hints: [
            "For each ingredient, how many batches of the recipe could Priya make?",
            "Divide what she has by what one batch needs — careful with kg and g.",
            "The smallest number of batches decides. Multiply it by 12.",
          ],
          strategy: "Find the limiting ingredient",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q13",
          question:
            "The Merlion statue at Merlion Park is 8.6 m tall. A souvenir model is made to a scale of 1 : 40. How tall is the model? Give your answer in cm.",
          answer: { type: "number", value: 21.5, display: "21.5 cm" },
          solution: ["Real height in cm: 8.6 m = 860 cm.", "Real → model: divide by 40.", "860 ÷ 40 = 21.5 cm."],
          traps: [
            { spec: { type: "number", value: 0.215 }, feedback: "0.215 is the height in metres. Convert it to centimetres." },
            { spec: { type: "number", value: 344 }, feedback: "You multiplied by 40. The model is *smaller* than the real statue, so divide." },
          ],
          difficulty: "core",
          guideRef: "scale-and-maps",
          hints: ["Is the model bigger or smaller than the real statue?", "Convert 8.6 m into cm, then divide by 40."],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q14",
          question:
            "{{3/5}} of the counters in a bag are red. The rest are blue and green in the ratio 3 : 1. Write the ratio red : blue : green in its simplest form.",
          answer: { type: "ratio", parts: [6, 3, 1], simplest: true },
          solution: [
            "Red is {{3/5}} of the bag, so the rest is {{2/5}}.",
            "Blue : green = 3 : 1, so blue is {{3/4}} of the rest: {{3/4 * 2/5 = 3/10}}. Green is {{1/4 * 2/5 = 1/10}}.",
            "Red is {{3/5 = 6/10}}.",
            "Red : blue : green = 6 : 3 : 1.",
          ],
          solutions: [
            {
              label: "Choose a bag size",
              steps: [
                "Try 20 counters (20 splits into fifths, and the rest splits into quarters).",
                "Red: {{3/5}} of 20 = 12. The other 8 split 3 : 1, so blue = 6 and green = 2.",
                "12 : 6 : 2 = 6 : 3 : 1. Picking a number makes it concrete and easy to check.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "ratio", parts: [3, 3, 1] },
              feedback: "Red is {{3/5}} of the *whole bag*, not 3 parts of the same 3 : 1 split. Write every colour as a fraction of the whole bag first.",
            },
          ],
          difficulty: "core",
          guideRef: "ratios-and-fractions",
          hints: ["What fraction of the bag is not red?", "Split that fraction in the ratio 3 : 1.", "Write all three colours as tenths, then compare the numerators."],
          strategy: "Test with a convenient total",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q15",
          question: "y is directly proportional to x. When x = 6, y = 15. Find the value of y when x = 22.",
          answer: { type: "number", value: 55 },
          solution: ["Direct proportion means {{y = kx}}.", "k = 15 ÷ 6 = 2.5.", "When x = 22, y = 2.5 × 22 = 55."],
          traps: [
            { spec: { type: "number", value: 31 }, feedback: "You added 16 because x went up by 16. In direct proportion you multiply: find y ÷ x first." },
          ],
          difficulty: "core",
          guideRef: "direct-proportion",
          hints: ["In direct proportion, what is the same for every pair of values?", "Find k = y ÷ x, then use {{y = kx}}."],
          strategy: "Find the multiplier",
        },
        {
          kind: "written",
          id: "ratio-proportion-p2-q16",
          question:
            "Hana's family records how long a 120 km car journey takes at different average speeds.\n\n| Speed (km/h) | 40 | 60 | 80 |\n|---|---|---|---|\n| Time (hours) | 3 | 2 | 1.5 |\n\n(a) Explain how the table shows that the time is inversely proportional to the speed.\n(b) How long would the journey take at an average speed of 50 km/h? Give your answer in hours and minutes.",
          marks: 4,
          modelAnswer:
            "(a) Multiply each speed by its time: 40 × 3 = 120, 60 × 2 = 120 and 80 × 1.5 = 120. The product is the same every time (it is the distance, 120 km), which is exactly what inverse proportion means. You can also see that doubling the speed from 40 to 80 km/h halves the time from 3 to 1.5 hours.\n\n(b) Time = 120 ÷ 50 = 2.4 hours. 0.4 hours = 0.4 × 60 = 24 minutes, so the journey takes **2 hours 24 minutes**.",
          markScheme: [
            { point: "Shows speed × time = 120 for every column", keywords: ["120", "multiply", "product"] },
            {
              point: "Concludes the product is constant, so it is inverse proportion (or doubling the speed halves the time)",
              keywords: ["constant", "same", "halves", "double"],
            },
            { point: "Time at 50 km/h = 120 ÷ 50 = 2.4 hours", keywords: ["2.4"] },
            { point: "Converts 0.4 hours to 24 minutes: 2 hours 24 minutes", keywords: ["24 minutes", "2 hours 24", "2 h 24", "24 min"] },
          ],
          commonError: "Writing 2.4 hours as 2 hours 40 minutes. 0.4 of an hour is 0.4 × 60 = 24 minutes.",
          difficulty: "core",
          guideRef: "inverse-proportion",
          hints: [
            "For inverse proportion, what stays the same — the ratio or the product?",
            "Multiply speed × time in each column.",
            "Divide the constant by 50, then change the decimal part of an hour into minutes.",
          ],
          strategy: "Find the constant product",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q17",
          question:
            "3 printers print 3 posters in 3 minutes. Every printer works at the same steady rate. How many printers are needed to print 60 posters in 6 minutes?",
          answer: { type: "number", value: 30, display: "30 printers" },
          solution: [
            "3 printers make 3 posters in 3 minutes, so 1 printer makes 1 poster in 3 minutes.",
            "In 6 minutes, 1 printer makes 2 posters.",
            "60 posters ÷ 2 posters per printer = 30 printers.",
          ],
          solutions: [
            {
              label: "Change one quantity at a time",
              steps: [
                "3 printers, 3 minutes → 3 posters.",
                "Double the time: 3 printers, 6 minutes → 6 posters.",
                "Multiply the printers by 10: 30 printers, 6 minutes → 60 posters.",
                "Changing one quantity at a time stops you mixing up direct and inverse proportion. Both methods are about equally quick.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 60 }, feedback: "60 printers would finish in 3 minutes. With 6 minutes, each printer has time to print 2 posters." },
            { spec: { type: "number", value: 3 }, feedback: "3 printers make only 3 posters every 3 minutes — just 6 posters in 6 minutes." },
          ],
          difficulty: "challenge",
          guideRef: "direct-proportion",
          hints: [
            "How long does ONE printer take to print ONE poster?",
            "How many posters can one printer make in 6 minutes?",
            "How many printers are needed to share the 60 posters?",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q18",
          question:
            "On map A, which has a scale of 1 : 25 000, the distance between two hawker centres is 14 cm. On map B the same distance measures 5 cm. The scale of map B is 1 : n. Find n. (Type the number without spaces.)",
          answer: { type: "number", value: 70000, display: "70 000" },
          solution: [
            "Real distance: 14 × 25 000 = 350 000 cm.",
            "On map B, 5 cm stands for 350 000 cm.",
            "So 1 cm stands for 350 000 ÷ 5 = 70 000 cm, and the scale is 1 : 70 000.",
          ],
          solutions: [
            {
              label: "Spot the inverse proportion",
              steps: [
                "For a fixed real distance, map length × n = real length, which is constant.",
                "So 14 × 25 000 = 5 × n.",
                "n = 350 000 ÷ 5 = 70 000. This is slicker: the map length and n are inversely proportional.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 8928.57, tolerance: 1 },
              feedback: "You set it up the wrong way round. Map B shows the distance *shorter*, so each cm on map B must stand for *more* — n must be bigger than 25 000.",
            },
            { spec: { type: "number", value: 3.5 }, feedback: "3.5 km is the real distance. Use it (in cm) to find n: real distance ÷ map distance." },
          ],
          difficulty: "core",
          guideRef: "scale-and-maps",
          hints: [
            "Find the real distance first, using map A.",
            "Map B shows that real distance as 5 cm. What does 1 cm on map B stand for?",
            "Should n be bigger or smaller than 25 000? Map B draws things smaller.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "ratio-proportion-p2-q19",
          question:
            "In a bag of beads, red : blue = 2 : 3 and blue : green = 4 : 5.\n\nJun says, 'So red : blue : green = 2 : 3 : 5.'\n\n(a) Explain why Jun is wrong.\n(b) Find red : blue : green in its simplest form.\n(c) The bag holds 105 beads. How many are green?",
          marks: 4,
          modelAnswer:
            "(a) Blue is 3 parts in the first ratio but 4 parts in the second, so the 'parts' in the two ratios are different sizes. You can't join them until blue is the same number of parts in both. In Jun's answer blue : green would be 3 : 5, but it should be 4 : 5.\n\n(b) The LCM of 3 and 4 is 12. Red : blue = 2 : 3 = 8 : 12 (× 4). Blue : green = 4 : 5 = 12 : 15 (× 3). Now blue matches, so red : blue : green = **8 : 12 : 15**, which is already in its simplest form.\n\n(c) 8 + 12 + 15 = 35 parts. One part = 105 ÷ 35 = 3 beads. Green = 15 × 3 = **45 beads**. (Check: 24 red, 36 blue, 45 green; 24 : 36 = 2 : 3 and 36 : 45 = 4 : 5 ✓)",
          markScheme: [
            {
              point: "Explains that blue is 3 parts in one ratio and 4 parts in the other, so the parts don't match (Jun's blue : green would be 3 : 5, not 4 : 5)",
              keywords: ["blue", "match", "same", "different", "3 : 5", "3:5"],
            },
            { point: "Makes blue the same using 12 (the LCM of 3 and 4): 8 : 12 and 12 : 15", keywords: ["12", "lcm", "8 : 12", "12 : 15"] },
            { point: "Red : blue : green = 8 : 12 : 15", keywords: ["8 : 12 : 15", "8:12:15"] },
            { point: "105 ÷ 35 = 3, so there are 45 green beads", keywords: ["35", "45"] },
          ],
          commonError: "Joining 2 : 3 and 4 : 5 straight into 2 : 3 : 5 or 2 : 7 : 5 without first making the blue parts match.",
          difficulty: "challenge",
          guideRef: "ratio-basics",
          hints: [
            "In Jun's answer, what would blue : green be? Is that 4 : 5?",
            "Blue must be the same number of parts in both ratios. What is the LCM of 3 and 4?",
            "Scale each ratio so that blue is 12, then join them.",
          ],
          strategy: "Make the shared part match",
        },
        {
          kind: "short",
          id: "ratio-proportion-p2-q20",
          question:
            "Mei wants to change Singapore dollars into euros. Bank A gives $1 = €0.68 but charges a fixed $5 fee, which is taken from her dollars before they are changed. A money changer gives $1 = €0.66 with no fee. For what amount in dollars do both options give exactly the same number of euros?",
          answer: { type: "number", value: 170, display: "$170" },
          solution: [
            "Let Mei change x dollars.",
            "Bank: she changes (x − 5) dollars and gets 0.68(x − 5) = 0.68x − 3.4 euros.",
            "Money changer: 0.66x euros.",
            "Set them equal: 0.68x − 3.4 = 0.66x, so 0.02x = 3.4 and x = 170.",
            "Check: 165 × 0.68 = €112.20 and 170 × 0.66 = €112.20 ✓",
          ],
          solutions: [
            {
              label: "Think about what each dollar gains",
              steps: [
                "The fee loses Mei the euros for $5: 5 × 0.68 = €3.40.",
                "But every dollar changed at the bank's rate gives €0.02 more than at the money changer.",
                "To win back €3.40 she needs 3.40 ÷ 0.02 = 170 dollars. This is slicker — no equation needed.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 250 },
              feedback: "Each dollar does gain €0.02 at the bank, but the $5 fee costs 5 × €0.68 = €3.40, not €5. How many lots of €0.02 make €3.40?",
            },
          ],
          difficulty: "challenge",
          guideRef: "recipes-and-currency",
          hints: [
            "Try an amount such as $100. Which option gives more euros? Now try $500.",
            "The fee costs her the euros she would have got for $5. How many euros is that?",
            "Each dollar changed at the bank gives €0.02 more. How many dollars are needed to make up the fee?",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
  ],

  // ================================================================ CHALLENGE
  challenge: [
    {
      kind: "short",
      id: "ratio-proportion-ch-q01",
      question:
        "Wei Ling and Arjun have stamps in the ratio 7 : 3. Wei Ling gives Arjun 30 stamps, and now the ratio is 3 : 2. How many stamps do they have altogether?",
      answer: { type: "number", value: 300 },
      solution: [
        "The total number of stamps doesn't change — stamps only move from one person to the other.",
        "7 : 3 has 10 parts but 3 : 2 has only 5. Rewrite 3 : 2 as 6 : 4 so that both ratios have 10 parts of the same size.",
        "Wei Ling goes from 7 parts to 6 parts: she gave away 1 part, so 1 part = 30 stamps.",
        "Total = 10 parts = 300 stamps.",
        "Check: 210 : 90 becomes 180 : 120 = 3 : 2 ✓",
      ],
      solutions: [
        {
          label: "Algebra",
          steps: [
            "Let Wei Ling have 7k stamps and Arjun 3k stamps.",
            "Afterwards {{(7k - 30)/(3k + 30) = 3/2}}.",
            "Cross-multiply: 14k − 60 = 9k + 90, so 5k = 150 and k = 30.",
            "Total = 10k = 300. The invariant method is slicker — once the totals match, the answer takes one step.",
          ],
        },
      ],
      commonError: "Comparing 7 : 3 with 3 : 2 directly. The two ratios have different numbers of parts, so their parts are different sizes.",
      traps: [
        {
          spec: { type: "number", value: 75 },
          feedback: "You compared 7 : 3 with 3 : 2 directly, but those parts are different sizes. The total is fixed, so write 3 : 2 as 6 : 4 first.",
        },
        { spec: { type: "number", value: 210 }, feedback: "210 is Wei Ling's stamps at the start. The question asks for the total." },
      ],
      difficulty: "challenge",
      guideRef: "sharing-in-a-ratio",
      hints: [
        "When Wei Ling gives stamps to Arjun, what stays the same?",
        "The total is constant, so make both ratios have the same total number of parts.",
        "7 : 3 and 6 : 4 both have 10 parts. How many parts did Wei Ling give away?",
        "That 1 part is 30 stamps.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q02",
      question:
        "Hana's age and her mother's age are in the ratio 2 : 7. In 15 years' time, the ratio of their ages will be 1 : 2. How old is Hana now?",
      answer: { type: "number", value: 10, display: "10 years old" },
      solution: [
        "The *difference* between two people's ages never changes.",
        "Now: 2 : 7, a difference of 5 parts. Later: 1 : 2 = 5 : 10, also a difference of 5 parts — so now the parts are the same size.",
        "Hana goes from 2 parts to 5 parts: 3 parts = 15 years, so 1 part = 5 years.",
        "Hana is now 2 × 5 = 10 (and her mother is 35).",
        "Check: in 15 years they will be 25 and 50, and 25 : 50 = 1 : 2 ✓",
      ],
      solutions: [
        {
          label: "Algebra",
          steps: [
            "Let Hana be 2k and her mother 7k.",
            "{{(2k + 15)/(7k + 15) = 1/2}}, so 4k + 30 = 7k + 15.",
            "3k = 15, so k = 5 and Hana is 10.",
            "The constant-difference method is slicker, and it shows *why* the parts line up.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 25 }, feedback: "25 is Hana's age in 15 years' time. The question asks how old she is now." },
        { spec: { type: "number", value: 35 }, feedback: "35 is her mother's age now. Hana is the 2 in the ratio 2 : 7." },
      ],
      difficulty: "challenge",
      guideRef: "sharing-in-a-ratio",
      hints: [
        "As the years pass, what stays the same about two people's ages?",
        "The difference is constant. Write both ratios so the difference is the same number of parts.",
        "2 : 7 has a difference of 5 parts. Write 1 : 2 with a difference of 5 parts as well.",
        "How many parts did Hana's age grow by in 15 years?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q03",
      question:
        "In a chess club, the ratio of boys to girls is 2 : 3. Among the boys, the ratio of those who wear glasses to those who don't is 1 : 4. Among the girls, the ratio of those who wear glasses to those who don't is 1 : 2. What is the smallest possible number of members in the club?",
      answer: { type: "number", value: 25 },
      solution: [
        "Boys : girls = 2 : 3, so the club has 2k boys and 3k girls (5k members) for some whole number k.",
        "The boys split 1 : 4, so the number of boys must be a multiple of 5.",
        "The girls split 1 : 2, so the number of girls must be a multiple of 3 — and 3k always is.",
        "2k is a multiple of 5 only when k is a multiple of 5. The smallest choice is k = 5: 10 boys and 15 girls, so 25 members.",
        "Check: boys 2 with glasses and 8 without; girls 5 with glasses and 10 without ✓",
      ],
      solutions: [
        {
          label: "Test the possible club sizes",
          steps: [
            "The club size is a multiple of 5: try 5, 10, 15, 20, 25, …",
            "5 → 2 boys (not a multiple of 5). 10 → 4 boys. 15 → 6 boys. 20 → 8 boys. 25 → 10 boys ✓ and 15 girls ✓.",
            "So the answer is 25. Listing works here, but the multiples argument is slicker and would still work if the answer were huge.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 15 },
          feedback: "With 15 members there are 6 boys and 9 girls — but 6 boys can't be split in the ratio 1 : 4. The number of boys must be a multiple of 5.",
        },
        { spec: { type: "number", value: 5 }, feedback: "With 5 members there are only 2 boys, and 2 boys can't be split in the ratio 1 : 4." },
      ],
      difficulty: "challenge",
      guideRef: "ratios-and-fractions",
      hints: [
        "Call the numbers 2k boys and 3k girls. Which of these has to split into a 1 : 4 ratio?",
        "The boys split 1 : 4, so the number of boys must be a multiple of what? What about the girls?",
        "When is 2k a multiple of 5?",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q04",
      question:
        "Working alone, Marcus can paint a fence in 6 hours, Siti can paint it in 3 hours and Zara can paint it in 2 hours. How many minutes will it take if all three paint the fence together, each working at their own steady rate?",
      answer: { type: "number", value: 60, display: "60 minutes" },
      solution: [
        "Think about how much of the fence each person paints in 1 hour.",
        "Marcus: {{1/6}}. Siti: {{1/3}}. Zara: {{1/2}}.",
        "Together in 1 hour: {{1/6 + 1/3 + 1/2 = 1/6 + 2/6 + 3/6 = 1}} whole fence.",
        "So together they take exactly 1 hour = 60 minutes.",
      ],
      solutions: [
        {
          label: "Imagine 6 fences",
          steps: [
            "Suppose they each paint for 6 hours. Marcus paints 1 fence, Siti paints 2 and Zara paints 3.",
            "Together that is 6 fences in 6 hours.",
            "So they paint 1 fence per hour: 60 minutes. Choosing 6 hours (the LCM of 6, 3 and 2) avoids fractions — this is the slicker method.",
          ],
        },
      ],
      commonError: "Adding or averaging the times. Times don't add when people work together — the amounts of work done per hour do.",
      traps: [
        {
          spec: { type: "number", value: 220 },
          feedback: "That's the average of their times (11 ÷ 3 hours). Working together must be *faster* than the fastest painter alone.",
        },
        {
          spec: { type: "number", value: 660 },
          feedback: "11 hours is their times added up. Working together should take *less* time than any one of them alone.",
        },
      ],
      difficulty: "challenge",
      guideRef: "direct-proportion",
      hints: [
        "Times don't add. What *does* add when people work together?",
        "How much of the fence does each person paint in one hour?",
        "Or imagine they all paint for 6 hours. How many fences get painted?",
      ],
      strategy: "Find one unit first (unitary method)",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q05",
      question:
        "Bottle A contains juice and water in the ratio 1 : 4. Bottle B contains juice and water in the ratio 2 : 3. Ravi wants to make 600 ml of drink with juice and water in the ratio 1 : 2, using only these two bottles. How many millilitres should he take from bottle A?",
      answer: { type: "number", value: 200, display: "200 ml" },
      solution: [
        "Turn every ratio into the fraction of juice. A: {{1/5}} juice. B: {{2/5}} juice. Target: {{1/3}} juice, which is 200 ml of juice in 600 ml.",
        "Take x ml from A and (600 − x) ml from B.",
        "Juice: {{x/5 + (2(600 - x))/5 = 200}}. Multiply by 5: x + 1200 − 2x = 1000.",
        "So x = 200 ml from A (and 400 ml from B).",
        "Check: 200 ml of A has 40 ml of juice and 400 ml of B has 160 ml of juice; 40 + 160 = 200 ml ✓",
      ],
      solutions: [
        {
          label: "Balance the see-saw",
          steps: [
            "Write the juice fractions in fifteenths: A is {{3/15}}, the target is {{5/15}} and B is {{6/15}}.",
            "The target is 2 fifteenths above A and 1 fifteenth below B.",
            "To balance, use amounts in the *opposite* ratio of these distances: A : B = 1 : 2.",
            "So {{1/3}} of 600 = 200 ml from A. This see-saw method is slicker once you trust it.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 300 },
          feedback: "Half from each bottle gives 60 + 120 = 180 ml of juice, which is less than {{1/3}} of 600 ml. You need more of the stronger bottle, B.",
        },
        { spec: { type: "number", value: 400 }, feedback: "400 ml is the amount from bottle B. The question asks about bottle A." },
      ],
      difficulty: "challenge",
      guideRef: "ratios-and-fractions",
      hints: [
        "Change each ratio into the fraction of the drink that is juice. What fraction of the target drink is juice?",
        "Try a guess: 300 ml from each bottle. Is that too much juice or too little?",
        "Take x ml from A and (600 − x) ml from B, and write an expression for the total juice.",
        "The total juice must be 200 ml.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q06",
      question:
        "On a map, a rectangular field measures 3 cm by 2 cm. The real field has an area of 15 000 m². The map scale is 1 : n. Find n. (Type the number without spaces.)",
      answer: { type: "number", value: 5000, display: "5000" },
      solution: [
        "If 1 cm on the map stands for n cm, the real field is 3n cm by 2n cm.",
        "Real area = 3n × 2n = 6n² cm².",
        "15 000 m² = 15 000 × 10 000 cm² = 150 000 000 cm² (because 1 m² = 100 cm × 100 cm).",
        "So 6n² = 150 000 000, n² = 25 000 000 and n = 5000.",
        "Check: the field is 150 m by 100 m, and 150 × 100 = 15 000 m² ✓",
      ],
      solutions: [
        {
          label: "Find the real field in metres first",
          steps: [
            "The field is in the ratio 3 : 2, so call it 3L by 2L metres. Its area is 6L² = 15 000, so L² = 2500.",
            "L = 50, so the field is 150 m by 100 m.",
            "On the map, 3 cm stands for 150 m = 15 000 cm, so 1 cm stands for 5000 cm: n = 5000.",
            "Working in metres first keeps the numbers small, so this is the slicker route.",
          ],
        },
      ],
      commonError: "Using 1 m² = 100 cm². A square metre is 100 cm by 100 cm, which is 10 000 cm².",
      traps: [
        { spec: { type: "number", value: 25000000 }, feedback: "That's n × n — the *area* scale. Lengths scale by n, so take the square root." },
        {
          spec: { type: "number", value: 50 },
          feedback: "50 is how many *metres* 1 cm represents. In a scale 1 : n both sides use the same unit, so change 50 m into centimetres.",
        },
      ],
      difficulty: "challenge",
      guideRef: "scale-and-maps",
      hints: [
        "A map scale works on lengths. If the scale is 1 : n, how long and how wide is the real field, in terms of n?",
        "The real field is 3n cm by 2n cm. Write its area.",
        "Convert 15 000 m² into cm² — careful: 1 m² = 100 cm × 100 cm.",
        "Solve 6n² = the real area in cm². You'll need a square root.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "ratio-proportion-ch-q07",
      question:
        "At a hawker stall, the prices of a cup of kopi and a cup of teh are in the ratio 5 : 4. Both prices then go up by the *same* amount (more than 0 cents).\n\nAisha claims the new ratio of the kopi price to the teh price could be 4 : 3.\n\nShow that this is impossible, and explain what *must* happen to the ratio when the same amount is added to both prices.",
      marks: 4,
      modelAnswer:
        "Let the prices be 5k cents (kopi) and 4k cents (teh), and let both rise by a cents, where a > 0.\n\nIf the new ratio were 4 : 3, then 3(5k + a) = 4(4k + a), so 15k + 3a = 16k + 4a, which gives a = −k. That would be a *decrease* of k cents, not an increase — so with a > 0 it is impossible.\n\nWhy: the gap between the prices is always k cents, but adding to both prices makes them bigger, so the same gap becomes a smaller part of each price. The ratio is pushed *towards* 1 : 1. As numbers, 5 : 4 is 1.25 and 4 : 3 is about 1.33, which is further from 1 — so it can never be reached by adding the same amount.\n\nFor example, $1.50 and $1.20 (5 : 4) become $1.80 and $1.50 after a 30-cent rise: 6 : 5 = 1.2, closer to 1.",
      markScheme: [
        {
          point: "Represents the prices as 5 parts and 4 parts (e.g. 5k and 4k), or uses a general argument rather than one example",
          keywords: ["5k", "4k", "5 parts", "4 parts", "parts"],
        },
        {
          point: "Shows 4 : 3 would need a negative increase (a = −k), or compares 5 : 4 = 1.25 with 4 : 3 ≈ 1.33",
          keywords: ["negative", "−k", "-k", "1.25", "1.33", "decrease", "minus"],
        },
        {
          point: "Explains the difference stays the same while the prices grow, so the ratio moves closer to 1 : 1",
          keywords: ["difference", "gap", "closer", "1 : 1", "1:1"],
        },
        { point: "Concludes it is impossible, because 4 : 3 is further from 1 : 1 than 5 : 4", keywords: ["impossible", "further", "cannot", "can't", "never"] },
      ],
      solutions: [
        {
          label: "Think about extremes",
          steps: [
            "Add a tiny amount to both prices: the ratio stays almost 5 : 4 = 1.25.",
            "Add a huge amount, like $1000, to both: the prices are almost equal, so the ratio is almost 1 : 1.",
            "As the amount added grows, the ratio slides from 1.25 down towards 1 — it never climbs to 1.33.",
            "This gives the insight quickly; the algebra (a = −k) is the watertight proof.",
          ],
        },
      ],
      commonError: "Testing one example and saying 'it didn't work, so it's impossible'. One example isn't a proof — use letters, or explain why the ratio always moves towards 1 : 1.",
      difficulty: "challenge",
      guideRef: "ratio-basics",
      hints: [
        "Call the prices 5k and 4k. What is the difference between them, and does it change?",
        "Write 5 : 4 and 4 : 3 as decimals. Which is closer to 1?",
        "Set (5k + a) : (4k + a) = 4 : 3 and solve for a. What do you notice?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q08",
      question:
        "Three gears mesh in a line, as shown. Gear A has 36 teeth, gear B has 24 teeth and gear C has 16 teeth. A turns B, and B turns C. When gear A makes 4 full turns, how many full turns does gear C make?",
      diagram: `<svg viewBox="0 0 260 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three touching gears in a row: a large gear A with 36 teeth, a medium gear B with 24 teeth and a small gear C with 16 teeth"><rect x="0" y="0" width="260" height="150" fill="#ffffff"/><circle cx="70" cy="70" r="54" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-dasharray="4 3"/><circle cx="160" cy="70" r="36" fill="#fde68a" stroke="#1f2937" stroke-width="2" stroke-dasharray="4 3"/><circle cx="220" cy="70" r="24" fill="#bbf7d0" stroke="#1f2937" stroke-width="2" stroke-dasharray="4 3"/><g fill="#1f2937"><circle cx="70" cy="70" r="3"/><circle cx="160" cy="70" r="3"/><circle cx="220" cy="70" r="3"/></g><g font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="70" y="58" font-size="14" font-weight="bold">A</text><text x="70" y="92" font-size="12">36 teeth</text><text x="160" y="60" font-size="14" font-weight="bold">B</text><text x="160" y="90" font-size="11">24 teeth</text><text x="220" y="62" font-size="13" font-weight="bold">C</text><text x="220" y="112" font-size="11">16 teeth</text></g></svg>`,
      answer: { type: "number", value: 9, display: "9 turns" },
      solution: [
        "When two gears mesh, the same number of teeth pass the point where they touch.",
        "A makes 4 turns, so 4 × 36 = 144 teeth pass.",
        "So B also moves 144 teeth (that's 6 turns), and C moves 144 teeth too.",
        "C turns 144 ÷ 16 = 9 times.",
      ],
      solutions: [
        {
          label: "Gear by gear",
          steps: [
            "A to B: turns × teeth stays the same, so B turns 4 × 36 ÷ 24 = 6 times.",
            "B to C: C turns 6 × 24 ÷ 16 = 9 times.",
            "Same answer — but notice that B's 24 teeth cancel out. The 'teeth passing' method shows the middle gear doesn't matter at all, so it is slicker.",
          ],
        },
      ],
      commonError: "Treating it as direct proportion. A smaller gear turns *more* times, because turns × teeth is constant.",
      traps: [
        { spec: { type: "number", value: 6 }, feedback: "6 is the number of turns gear B makes. Keep going to gear C." },
        {
          spec: { type: "number", value: 1.78, tolerance: 0.01 },
          feedback: "You set it up as direct proportion. A smaller gear has to turn *more* times: turns × teeth stays the same.",
        },
      ],
      difficulty: "challenge",
      guideRef: "inverse-proportion",
      hints: [
        "When two gears mesh, what must be the same for both of them?",
        "Count the teeth that pass the meeting point when A makes 4 turns.",
        "Does the middle gear change the number of teeth passing?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "ratio-proportion-ch-q09",
      question:
        "Ethan changes all his Singapore dollars into Malaysian ringgit at $1 = RM 3.40, and spends half of the ringgit in Johor Bahru. He then changes all his remaining ringgit into Thai baht at RM 1 = 7.5 baht, and spends 1000 baht in Hat Yai. He has 2825 baht left. How many Singapore dollars did he start with?",
      answer: { type: "number", value: 300, display: "$300" },
      solution: [
        "Work backwards, undoing each step in reverse order.",
        "Before spending 1000 baht he had 2825 + 1000 = 3825 baht.",
        "The baht came from ringgit at RM 1 = 7.5 baht, so he had 3825 ÷ 7.5 = RM 510.",
        "That was half of his ringgit, so he started with RM 1020.",
        "The ringgit came from dollars at $1 = RM 3.40, so he started with 1020 ÷ 3.40 = $300.",
        "Check forwards: $300 → RM 1020 → RM 510 left → 3825 baht → 2825 baht ✓",
      ],
      solutions: [
        {
          label: "Forwards with a letter",
          steps: [
            "Start with $x. That's 3.4x ringgit; half is 1.7x; in baht that's 1.7x × 7.5 = 12.75x.",
            "12.75x − 1000 = 2825, so 12.75x = 3825 and x = 300.",
            "Working backwards avoids the awkward 12.75, so it is the slicker route here.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 1020 }, feedback: "RM 1020 is what he had in ringgit at the start. Convert it into dollars: divide by 3.40." },
        { spec: { type: "number", value: 150 }, feedback: "You undid the conversions but forgot to double for the half he spent in Johor Bahru." },
      ],
      difficulty: "challenge",
      guideRef: "recipes-and-currency",
      hints: [
        "You know how the story ends. Can you run it backwards?",
        "What undoes 'spend 1000 baht'? What undoes 'change ringgit into baht at 7.5'?",
        "Undo each step in reverse order: add, divide, double, divide.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "written",
      id: "ratio-proportion-ch-q10",
      question:
        "Four jugs, A, B, C and D, each contain squash mixed with water. Jug A is stronger than jug B (a bigger fraction of A is squash), and jug C is stronger than jug D.\n\nZara says, 'If I pour A and C into one bowl, and B and D into another bowl, then the A + C bowl must be stronger than the B + D bowl.'\n\nIs Zara's statement always true, sometimes true or never true? Justify your answer with examples.",
      marks: 4,
      modelAnswer:
        "**Sometimes true.**\n\n*When it works:* if all four jugs hold the same amount, it is true. For example, with 100 ml jugs: A has 30 ml of squash, B 20 ml, C 50 ml and D 40 ml. The A + C bowl has 80 ml of squash in 200 ml (40%) and the B + D bowl has 60 ml in 200 ml (30%), so A + C is stronger.\n\n*When it fails:*\n- A: 20 ml squash + 10 ml water ({{2/3}} squash)\n- B: 300 ml squash + 200 ml water ({{3/5}} squash), weaker than A\n- C: 100 ml squash + 400 ml water ({{1/5}} squash)\n- D: 10 ml squash + 90 ml water ({{1/10}} squash), weaker than C\n\nThe A + C bowl has 120 ml of squash in 530 ml, about 23% squash. The B + D bowl has 310 ml of squash in 600 ml, about 52% squash. So the A + C bowl is much *weaker*.\n\n*Why:* the strength of a bowl depends on how much of each jug goes in, not just on how strong each jug is. In the counterexample the A + C bowl is mostly the large, weak jug C, while the B + D bowl is mostly the large, strong jug B.",
      markScheme: [
        { point: "States that the claim is sometimes true", keywords: ["sometimes"] },
        { point: "Gives a correct example where it is true (e.g. all jugs the same size)", keywords: ["same size", "same amount", "equal", "true"] },
        {
          point: "Gives a correct counterexample with the amounts of squash and the totals worked out for both bowls",
          keywords: ["counterexample", "false", "not true", "weaker", "%"],
        },
        {
          point: "Explains why: the bowls depend on how much of each jug is used — a big weak jug can swamp a small strong one",
          keywords: ["size", "amount", "bigger", "larger", "how much", "volume"],
        },
      ],
      commonError: "Checking only jugs of the same size and concluding 'always true'.",
      difficulty: "challenge",
      guideRef: "ratios-and-fractions",
      hints: [
        "Try it with four jugs of the same size first. Does Zara's claim hold?",
        "Now let the sizes be very different. What if A is tiny and C is huge?",
        "Make the A + C bowl mostly a big, weak jug C, and the B + D bowl mostly a big, strong jug B.",
      ],
      strategy: "Consider extremes",
    },
  ],
};
