import type { Paper } from "../../types.ts";

// Fractions — Practice Papers 3 and 4 (20 questions each: 16 short + 4 written;
// 5 warm-up, 11 core, 4 challenge, easy → hard).
//   Paper 3: problem solving in context and multi-step questions.
//   Paper 4: exam style — linked parts, tables/diagrams and reasoning.

export const morePapers: Paper[] = [
  // ===========================================================================
  // Practice Paper 3 — problem solving in context
  // ===========================================================================
  {
    id: "fractions-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "fractions-p3-q01",
        question:
          "Mr Tan's hawker stall sold 120 plates of vegetarian fried bee hoon on Saturday. {{5/8}} of the plates were sold **before** noon. How many plates were sold **after** noon?",
        answer: { type: "number", value: 45 },
        solution: [
          "One eighth of 120 is 120 ÷ 8 = 15.",
          "Before noon: 5 × 15 = 75 plates.",
          "After noon: 120 − 75 = 45 plates.",
        ],
        solutions: [
          {
            label: "Use the other fraction",
            steps: ["If {{5/8}} were sold before noon, the other {{3/8}} were sold after noon.", "{{3/8}} of 120 = 3 × 15 = 45 plates."],
          },
        ],
        traps: [
          { spec: { type: "number", value: 75 }, feedback: "75 plates were sold **before** noon. The question asks about after noon — what fraction of the plates is that?" },
        ],
        commonError: "Stopping at 75, the number sold before noon.",
        difficulty: "warmup",
        guideRef: "fractions-of-amounts",
        hints: ["Find {{1/8}} of 120 first.", "What fraction of the plates were sold after noon?"],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "fractions-p3-q02",
        question:
          "Marcus walks {{3/4}} km from home to the MRT station, then {{2/5}} km from the station to school. How far does he walk altogether? Give your answer in km as a mixed number in its simplest form.",
        answer: { type: "fraction", n: 23, d: 20, form: "mixed", simplest: true },
        solution: [
          "Estimate: about 0.75 + 0.4 ≈ 1.15 km, so a little more than 1 km.",
          "The LCM of 4 and 5 is 20: {{3/4 = 15/20}} and {{2/5 = 8/20}}.",
          "{{15/20 + 8/20 = 23/20}}.",
          "{{23/20 = 1 3/20}} km. ✓ close to the estimate.",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 5, d: 9 },
            feedback: "{{5/9}} comes from adding the tops and the bottoms. It's less than {{3/4}} on its own — impossible for a total! Use a common denominator of 20.",
          },
        ],
        commonError: "Adding the numerators and adding the denominators.",
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["Can you add quarters and fifths straight away, or do the pieces need to be the same size?", "Twentieths work for both."],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "fractions-p3-q03",
        question:
          "A park connector path is {{5/6}} km long. {{3/10}} of its length has a covered walkway. How long is the covered part? Give your answer in **metres**.",
        answer: { type: "number", value: 250, display: "250 m" },
        solution: [
          "'{{3/10}} of' means multiply: {{3/10 × 5/6}}.",
          "Cancel the 3 with the 6 and the 5 with the 10: {{1/2 × 1/2 = 1/4}} km.",
          "{{1/4}} km = 1000 ÷ 4 = 250 m.",
        ],
        traps: [
          { spec: { type: "number", value: 0.25 }, feedback: "{{1/4}} is right — but that's in km. The question asks for metres: 1 km = 1000 m." },
        ],
        commonError: "Leaving the answer in kilometres.",
        difficulty: "warmup",
        guideRef: "multiplying",
        hints: ["What does the word 'of' mean in maths?", "Work out {{3/10 × 5/6}} in km, then change to metres."],
        strategy: "Cancel before you multiply",
      },
      {
        kind: "short",
        id: "fractions-p3-q04",
        question:
          "Siti has a 9 m string of bunting for the class party. She cuts it into pieces that are each {{3/4}} m long. How many pieces does she get?",
        answer: { type: "number", value: 12 },
        solution: [
          "9 m is 36 quarter-metres (4 in each metre).",
          "Each piece uses 3 quarter-metres: 36 ÷ 3 = 12 pieces.",
          "This is {{9 ÷ 3/4 = 9 × 4/3 = 12}}.",
        ],
        traps: [
          {
            spec: { type: "number", value: 6.75 },
            feedback: "6.75 is {{9 × 3/4}}. Cutting into pieces asks 'how many {{3/4}}s fit into 9?' — a division. Each piece is less than 1 m, so there are more than 9 pieces.",
          },
        ],
        commonError: "Multiplying by {{3/4}} instead of dividing.",
        difficulty: "warmup",
        guideRef: "dividing",
        hints: ["How many quarter-metres are there in 9 m?", "Each piece uses three of those quarters."],
        strategy: "Ask 'how many fit?'",
      },
      {
        kind: "short",
        id: "fractions-p3-q05",
        question:
          "In a spelling test, Ethan scored 14 out of 18 and Zara scored 16 out of 20. Write each score as a fraction in its simplest form. Which is the **greater** fraction? Type that fraction in its simplest form.",
        answer: { type: "fraction", n: 4, d: 5, simplest: true },
        solution: [
          "Ethan: {{14/18 = 7/9}} (divide by 2).",
          "Zara: {{16/20 = 4/5}} (divide by 4).",
          "Common denominator 45: {{7/9 = 35/45}} and {{4/5 = 36/45}}.",
          "36 > 35, so {{4/5 > 7/9}}: Zara's score is the greater fraction (only just!).",
        ],
        solutions: [
          {
            label: "Look at what's missing",
            steps: [
              "Ethan is {{2/9}} short of full marks; Zara is {{1/5}} short.",
              "{{1/5 = 9/45}} and {{2/9 = 10/45}}, so Zara is closer to 1 — her fraction is greater.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 7, d: 9 },
            feedback: "Close contest! But {{7/9 = 35/45}} and {{4/5 = 36/45}}, so Zara's {{4/5}} is (just) the greater fraction.",
          },
        ],
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["Simplify each score first.", "Use a common denominator (45) to compare them."],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p3-q06",
        question:
          "A roll of batik cloth is {{7 1/6}} m long. Mei cuts off {{2 3/4}} m for a dance costume and {{1 5/6}} m for a table runner. How much cloth is left on the roll? Give your answer as a mixed number in its simplest form.",
        answer: { type: "fraction", n: 31, d: 12, form: "mixed", simplest: true },
        solution: [
          "Estimate: about 7.2 − 2.8 − 1.8 ≈ 2.6 m.",
          "Total cut off: {{2 3/4 + 1 5/6 = 2 9/12 + 1 10/12 = 3 19/12 = 4 7/12}} m.",
          "Left: {{7 1/6 - 4 7/12 = 7 2/12 - 4 7/12}}.",
          "{{2/12}} is too small to take {{7/12}} from, so borrow a whole: {{6 14/12 - 4 7/12 = 2 7/12}} m. ✓ matches the estimate.",
        ],
        solutions: [
          {
            label: "Improper fractions",
            steps: [
              "In twelfths: {{7 1/6 = 86/12}}, {{2 3/4 = 33/12}} and {{1 5/6 = 22/12}}.",
              "{{86/12 - 33/12 - 22/12 = 31/12 = 2 7/12}} m.",
            ],
          },
        ],
        traps: [
          { spec: { type: "fraction", n: 55, d: 12 }, feedback: "{{4 7/12}} m is the total length cut **off**. How much is left on the roll?" },
          {
            spec: { type: "fraction", n: 41, d: 12 },
            feedback: "{{3 5/12}} comes from taking {{2/12}} away from {{7/12}} — the wrong way round. Borrow a whole first: {{7 2/12 = 6 14/12}}.",
          },
        ],
        commonError: "Subtracting the fraction parts the wrong way round when the first fraction part is smaller.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Estimate first: roughly how much is left?",
          "Add the two pieces that are cut off — twelfths work for quarters and sixths.",
          "In {{7 2/12 - 4 7/12}}, is {{2/12}} big enough to take {{7/12}} from? If not, borrow a whole.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "written",
        id: "fractions-p3-q07",
        question:
          "Two drink stalls at a hawker centre sell the same sugarcane juice at the same normal price.\n\n- Stall A: **Buy 3, pay for 2.**\n- Stall B: **{{1/4}} off every drink.**\n\nPriya wants to buy 3 drinks for her friends. Which stall should she choose? Explain your answer using fractions.",
        marks: 3,
        modelAnswer:
          "At Stall A she pays for 2 of the 3 drinks, so she pays {{2/3}} of the normal cost — a saving of {{1/3}}.\n\nAt Stall B she pays {{3/4}} of the normal cost — a saving of {{1/4}}.\n\nOver 12: {{2/3 = 8/12}} and {{3/4 = 9/12}}. Since 8 < 9, she pays less at **Stall A**. (Check with a price: if a drink normally costs $2, Stall A charges $4 for three and Stall B charges 3 × $1.50 = $4.50.)\n\nNote: if she only wanted 1 or 2 drinks, Stall B would be better, because the Stall A offer only works when you buy 3.",
        markScheme: [
          { point: "Stall A: she pays {{2/3}} of the normal cost (saves {{1/3}})", keywords: ["2/3", "1/3", "pay for 2", "two thirds", "one third"] },
          { point: "Stall B: she pays {{3/4}} of the normal cost (saves {{1/4}})", keywords: ["3/4", "three quarters", "1/4", "a quarter"] },
          {
            point: "Compares correctly ({{8/12 < 9/12}}, or a saving of {{1/3}} beats {{1/4}}) and chooses Stall A",
            keywords: ["8/12", "9/12", "stall a", "a is cheaper", "cheaper", "1/3 is bigger", "twelfths"],
          },
        ],
        commonError: "Thinking '{{1/4}} off' must be the better deal because it applies to every drink.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "At Stall A, what fraction of the normal cost of 3 drinks does she actually pay?",
          "At Stall B, what fraction of the normal price does she pay for each drink?",
          "Compare {{2/3}} and {{3/4}} using twelfths — or try a price such as $2 a drink.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p3-q08",
        question:
          "Ravi's journey to school takes 50 minutes. Zara's journey takes 1 hour 20 minutes. Write Zara's journey time as a fraction of Ravi's journey time. Give your answer as a mixed number in its simplest form.",
        answer: { type: "fraction", n: 8, d: 5, form: "mixed", simplest: true },
        solution: [
          "Same units first: 1 hour 20 minutes = 80 minutes.",
          "Zara's time as a fraction of Ravi's: {{80/50}}.",
          "Simplify (÷ 10): {{8/5}}.",
          "As a mixed number: {{1 3/5}}. Zara's journey is {{1 3/5}} times as long as Ravi's.",
        ],
        traps: [
          { spec: { type: "fraction", n: 12, d: 5 }, feedback: "1 hour 20 minutes is 80 minutes, not 120. Change both times into minutes first." },
          {
            spec: { type: "fraction", n: 5, d: 8 },
            feedback: "That's Ravi's time as a fraction of Zara's — the wrong way round. 'Zara's as a fraction of Ravi's' puts Zara's time on top.",
          },
        ],
        commonError: "Treating 1 hour 20 minutes as 120 minutes, or putting the times the wrong way round.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Put both times in the same units.",
          "'A as a fraction of B' means {{A/B}} — which time goes on top?",
          "Simplify {{80/50}}, then write it as a mixed number.",
        ],
        strategy: "Convert to the same units",
      },
      {
        kind: "short",
        id: "fractions-p3-q09",
        question:
          "Ravi is filling a planter box with soil. The box is {{2 1/2}} m long and {{3/4}} m wide, and the soil must be {{1/3}} m deep. Soil is sold in bags that each hold {{1/20}} m³. How many bags must he buy?",
        answer: { type: "number", value: 13, display: "13 bags" },
        solution: [
          "Volume of soil = {{2 1/2 × 3/4 × 1/3 = 5/2 × 3/4 × 1/3}}.",
          "Cancel the 3s: {{5/2 × 1/4 = 5/8}} m³.",
          "Bags: {{5/8 ÷ 1/20 = 5/8 × 20 = 100/8 = 12 1/2}}.",
          "12 bags are not quite enough, so he must buy **13** bags.",
        ],
        traps: [
          {
            spec: { type: "number", value: 12 },
            feedback: "12 bags hold only {{12/20 = 3/5}} m³, which is less than the {{5/8}} m³ needed. You must round **up**.",
          },
          { spec: { type: "number", value: 12.5 }, feedback: "{{12 1/2}} bags is the exact amount — but you can't buy half a bag. How many must he buy?" },
        ],
        commonError: "Rounding {{12 1/2}} down to 12 — then part of the planter isn't filled.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "First find the volume of soil: length × width × depth.",
          "{{2 1/2 × 3/4 × 1/3}}: change to improper fractions and cancel.",
          "How many {{1/20}} m³ bags fit into {{5/8}} m³? Can he buy part of a bag?",
        ],
        strategy: "Ask 'how many fit?'",
      },
      {
        kind: "short",
        id: "fractions-p3-q10",
        question:
          "Wei Ling has 2 hours for homework. She spends {{2/5}} of the time on maths and {{1/3}} of the time on science. She spends the rest of the time on English. How many **minutes** does she spend on English?",
        answer: { type: "number", value: 32, display: "32 minutes" },
        solution: ["2 hours = 120 minutes.", "Maths: {{2/5}} of 120 = 48 minutes. Science: {{1/3}} of 120 = 40 minutes.", "English: 120 − 48 − 40 = 32 minutes."],
        solutions: [
          {
            label: "Fraction first",
            steps: [
              "English fraction: {{1 - 2/5 - 1/3 = 15/15 - 6/15 - 5/15 = 4/15}}.",
              "{{4/15}} of 120 = 8 × 4 = 32 minutes.",
            ],
          },
        ],
        traps: [
          { spec: { type: "fraction", n: 4, d: 15 }, feedback: "{{4/15}} is the **fraction** of the time spent on English. Now find {{4/15}} of 120 minutes." },
          { spec: { type: "number", value: 88 }, feedback: "88 minutes is maths and science together (48 + 40). English is the time that's left." },
        ],
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: ["Change 2 hours into minutes first.", "Find the maths time and the science time.", "English is whatever is left over."],
        strategy: "Find one part first",
      },
      {
        kind: "written",
        id: "fractions-p3-q11",
        question:
          "Jun's CCA is raising $480 for new equipment. In week 1 they raise {{3/8}} of the target. In week 2 they raise {{2/5}} of the target.\n\n(a) Jun says they have now raised more than {{3/4}} of the target. Is he right? Show how you know.\n\n(b) How much more money do they still need to raise?",
        marks: 3,
        modelAnswer:
          "(a) Raised so far: {{3/8 + 2/5 = 15/40 + 16/40 = 31/40}} of the target. {{3/4 = 30/40}}, and 31 > 30, so Jun **is right** — just! (In money: $180 + $192 = $372, which is more than {{3/4}} of $480 = $360.)\n\n(b) Still needed: {{1 - 31/40 = 9/40}} of $480 = 480 ÷ 40 × 9 = **$108**. Check: 480 − 372 = 108. ✓",
        markScheme: [
          { point: "Total raised {{3/8 + 2/5 = 31/40}} (or $180 + $192 = $372)", keywords: ["31/40", "40", "372", "180", "192"] },
          { point: "Compares with {{3/4 = 30/40}} (or $360) and says Jun is right", keywords: ["30/40", "360", "yes", "right", "more than"] },
          { point: "Still needs {{9/40}} of $480 = $108", keywords: ["108", "9/40"] },
        ],
        commonError: "Adding the fractions without a common denominator, e.g. {{3/8 + 2/5 = 5/13}}.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "Add the two fractions using a common denominator of 40.",
          "Write {{3/4}} in fortieths so you can compare.",
          "What fraction of the target is still needed? Find that fraction of $480.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p3-q12",
        question: "Hana walks at a steady speed of {{4 1/2}} km/h. How far does she walk in 40 minutes? Give your answer in km.",
        answer: { type: "number", value: 3, display: "3 km" },
        solution: [
          "40 minutes = {{40/60 = 2/3}} of an hour.",
          "Distance = speed × time = {{4 1/2 × 2/3}}.",
          "{{9/2 × 2/3 = 18/6 = 3}} km.",
        ],
        solutions: [
          {
            label: "Unitary method",
            steps: [
              "In 60 minutes she walks {{4 1/2}} km, so in 20 minutes she walks {{4 1/2 ÷ 3 = 1 1/2}} km.",
              "40 minutes is twice as long: 3 km.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 180 },
            feedback: "180 comes from {{4 1/2 × 40}} — but the speed is per **hour** and 40 is in minutes. 40 minutes is {{2/3}} of an hour.",
          },
          { spec: { type: "fraction", n: 27, d: 4 }, feedback: "{{6 3/4}} is {{4 1/2 ÷ 2/3}}. Distance = speed × time, so multiply." },
        ],
        commonError: "Multiplying the speed by 40 without changing minutes into hours.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: ["What fraction of an hour is 40 minutes?", "Distance = speed × time, with the time in hours.", "{{9/2 × 2/3}} — cancel before you multiply."],
        strategy: "Convert to the same units",
      },
      {
        kind: "short",
        id: "fractions-p3-q13",
        question:
          "Two identical jugs hold water. Jug A is {{3/4}} full and jug B is {{1/3}} full. Wei Ling pours water from jug A into jug B until both jugs hold the **same** amount. What fraction of a full jug does she pour? Give your answer in its simplest form.",
        diagram: `<svg viewBox="0 0 280 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two identical jugs. Jug A is filled to three quarters of its height and jug B is filled to one third of its height."><rect x="0" y="0" width="280" height="190" fill="#ffffff"/><rect x="40" y="60" width="80" height="90" fill="#bae6fd"/><rect x="160" y="110" width="80" height="40" fill="#bae6fd"/><path d="M40 30 V150 H120 V30" fill="none" stroke="#334155" stroke-width="2"/><path d="M120 50 C142 50 142 110 120 110" fill="none" stroke="#334155" stroke-width="2"/><path d="M160 30 V150 H240 V30" fill="none" stroke="#334155" stroke-width="2"/><path d="M240 50 C262 50 262 110 240 110" fill="none" stroke="#334155" stroke-width="2"/><g stroke="#334155" stroke-width="1"><line x1="40" y1="120" x2="48" y2="120"/><line x1="40" y1="90" x2="48" y2="90"/><line x1="40" y1="60" x2="48" y2="60"/><line x1="160" y1="110" x2="168" y2="110"/><line x1="160" y1="70" x2="168" y2="70"/></g><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="80" y="20">Jug A</text><text x="200" y="20">Jug B</text><text x="80" y="174">3/4 full</text><text x="200" y="174">1/3 full</text></g></svg>`,
        answer: { type: "fraction", n: 5, d: 24, simplest: true },
        solution: [
          "Difference in levels: {{3/4 - 1/3 = 9/12 - 4/12 = 5/12}} of a jug.",
          "To make them equal, A must lose half of the difference and B must gain it.",
          "Pour {{1/2 × 5/12 = 5/24}} of a jug.",
          "Check: A ends with {{18/24 - 5/24 = 13/24}}; B ends with {{8/24 + 5/24 = 13/24}}. ✓",
        ],
        solutions: [
          {
            label: "Find the target first",
            steps: [
              "Total water: {{3/4 + 1/3 = 13/12}} of a jug.",
              "Shared equally, each jug ends with {{13/24}}.",
              "A pours {{3/4 - 13/24 = 18/24 - 13/24 = 5/24}} of a jug.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 5, d: 12 },
            feedback: "{{5/12}} is the whole difference. If she poured all of it, B would be {{3/4}} full and A only {{1/3}} — they'd just swap! Pour **half** the difference.",
          },
          { spec: { type: "fraction", n: 13, d: 24 }, feedback: "{{13/24}} is how full each jug ends up, not how much is poured." },
        ],
        commonError: "Pouring the whole difference instead of half of it.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: [
          "When both jugs hold the same, how much will each one hold? Think about the total.",
          "The total water is {{3/4 + 1/3}}; each jug ends with half of that.",
          "Amount poured = what A starts with − what A ends with.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "fractions-p3-q14",
        question: "A bicycle costs {{1 3/4}} times as much as a scooter. The bicycle costs $245. How much does the scooter cost?",
        answer: { type: "number", value: 140, display: "$140" },
        solution: [
          "Scooter price × {{1 3/4}} = $245.",
          "So the scooter price = {{245 ÷ 1 3/4 = 245 ÷ 7/4}}.",
          "{{245 × 4/7 = 35 × 4 = 140}}. The scooter costs $140.",
          "Check: {{140 × 1 3/4 = 140 + 105 = 245}}. ✓",
        ],
        solutions: [
          {
            label: "Bar model",
            steps: [
              "{{1 3/4}} is 7 quarters. Draw the scooter as 4 equal blocks and the bicycle as 7 of the same blocks.",
              "7 blocks = $245, so 1 block = $35.",
              "Scooter = 4 blocks = $140.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 428.75 },
            feedback: "You multiplied by {{1 3/4}}. The scooter is the **cheaper** item, so its price must be less than $245 — divide instead.",
          },
          { spec: { type: "number", value: 61.25 }, feedback: "Taking {{3/4}} of $245 away is not the same as dividing by {{1 3/4}}. Try a bar model with quarters." },
        ],
        commonError: "Multiplying by {{1 3/4}} when the question needs the smaller, original amount.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Will the scooter cost more or less than $245?",
          "Write {{1 3/4}} in quarters. The bicycle is how many quarters of the scooter's price?",
          "Divide $245 by {{7/4}} — or find the value of one quarter-block first.",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "written",
        id: "fractions-p3-q15",
        question:
          "A pair of running shoes normally costs $72. Two shops have a sale.\n\n- Shop A: **{{1/3}} off**.\n- Shop B: **{{1/4}} off**, and then a further **{{1/10}} off** the reduced price.\n\nMarcus says: 'Shop B takes off {{1/4 + 1/10}}, which is more than {{1/3}}, so Shop B is cheaper.'\n\nWork out the price at each shop and explain whether Marcus is right.",
        marks: 3,
        modelAnswer:
          "Shop A: {{1/3}} of $72 is $24, so the price is 72 − 24 = **$48**.\n\nShop B: {{1/4}} of $72 is $18, so the price drops to $54. Then {{1/10}} of $54 is $5.40, so the final price is **$48.60**.\n\nMarcus is wrong. The second discount is {{1/10}} of the *reduced* price ($54), not {{1/10}} of $72, so Shop B only takes off $23.40 altogether — less than the $24 that Shop A takes off. Shop A is cheaper by 60 cents.\n\n(In fractions: Shop B charges {{3/4 × 9/10 = 27/40}} of the price and Shop A charges {{2/3}}; {{27/40 = 81/120}} is more than {{2/3 = 80/120}}.)",
        markScheme: [
          { point: "Shop A price: {{2/3}} of $72 = $48", keywords: ["48", "24 off", "2/3"] },
          { point: "Shop B price: $72 → $54 → $48.60", keywords: ["54", "48.60", "48.6", "5.40", "5.4"] },
          {
            point: "Marcus is wrong: the {{1/10}} is of the reduced price, so Shop A is cheaper (by 60 cents)",
            keywords: ["reduced price", "of 54", "not of 72", "shop a", "cheaper", "60", "0.60", "wrong"],
          },
        ],
        commonError: "Adding the two discounts as if both were fractions of the original price.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: [
          "Find the Shop A price first: what is {{1/3}} of $72?",
          "For Shop B, do the discounts one at a time. What is the price after {{1/4}} off?",
          "The {{1/10}} is taken off which price — $72 or the new price?",
        ],
        strategy: "Work in stages",
      },
      {
        kind: "short",
        id: "fractions-p3-q16",
        question: "A strip of paper is {{(3x)/4}} m long. Hana cuts it into pieces that are each {{x/8}} m long (x > 0). How many pieces does she get?",
        answer: { type: "number", value: 6, display: "6 pieces" },
        solution: [
          "How many pieces fit? {{(3x)/4 ÷ x/8}}.",
          "Keep, Change, Flip: {{(3x)/4 × 8/x}}.",
          "Cancel the x's, and cancel 4 into 8: {{3/1 × 2/1 = 6}}.",
          "6 pieces — whatever the value of x!",
        ],
        solutions: [
          {
            label: "Try a number first",
            steps: [
              "Let x = 8: the strip is 6 m long and each piece is 1 m, so there are 6 pieces.",
              "Let x = 4: the strip is 3 m and each piece is {{1/2}} m — 6 pieces again.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 1, d: 6 },
            feedback: "That's {{x/8 ÷ (3x)/4}} — the wrong way round. How many **small** pieces fit into the long strip?",
          },
        ],
        commonError: "Dividing the piece length by the strip length.",
        difficulty: "core",
        guideRef: "algebraic-fractions",
        hints: [
          "Try a value, say x = 8. How long is the strip, and how long is each piece?",
          "In general it's {{(3x)/4 ÷ x/8}}. Flip the second fraction and multiply.",
          "The x on the top cancels with the x underneath.",
        ],
        strategy: "Make it simpler (try numbers first)",
      },
      {
        kind: "short",
        id: "fractions-p3-q17",
        question:
          "Hana spent {{2/5}} of her savings on a badminton racket and {{1/3}} of the **remaining** savings on books. She spent $24 more on the racket than on the books. How much were her savings at the start?",
        answer: { type: "number", value: 120, display: "$120" },
        solution: [
          "Racket: {{2/5}} of the savings, leaving {{3/5}}.",
          "Books: {{1/3}} of {{3/5}} = {{1/5}} of the savings.",
          "Difference: {{2/5 - 1/5 = 1/5}} of the savings = $24.",
          "Savings: 24 × 5 = $120.",
          "Check: racket $48, books $24 (a third of the remaining $72), difference $24. ✓",
        ],
        solutions: [
          {
            label: "Bar model",
            steps: [
              "Draw the savings as 5 equal blocks. The racket takes 2 blocks; 3 blocks remain.",
              "A third of the 3 remaining blocks is 1 block for books.",
              "Racket − books = 2 blocks − 1 block = 1 block = $24, so 5 blocks = $120.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "number", value: 360 },
            feedback: "$360 treats the books as {{1/3}} of the **whole** savings ({{2/5 - 1/3 = 1/15}}). The books are {{1/3}} of the remaining {{3/5}}, which is {{1/5}} of the savings.",
          },
          { spec: { type: "number", value: 48 }, feedback: "$48 is the price of the racket. The question asks for her savings at the start." },
        ],
        commonError: "Taking {{1/3}} of the whole savings for the books instead of {{1/3}} of what was left.",
        difficulty: "challenge",
        guideRef: "fractions-of-amounts",
        hints: [
          "Draw a bar for her savings, split into fifths.",
          "After the racket, 3 fifths are left. What is {{1/3}} of 3 fifths?",
          "The racket is 2 blocks and the books are 1 block. What is the $24 difference worth in blocks?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "fractions-p3-q18",
        question:
          "A jug is full of pure orange juice. Ravi pours out {{1/4}} of the jug, tops it up with water and stirs. He does this two more times (pour out {{1/4}} of the mixture, top up with water, stir). What fraction of the jug is orange juice now? Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 27, d: 64, simplest: true },
        solution: [
          "Each time, {{1/4}} of whatever is in the jug is poured away, so {{3/4}} of the juice stays.",
          "After pour 1: {{3/4}} of the jug is juice.",
          "After pour 2: {{3/4}} of {{3/4}} = {{9/16}}.",
          "After pour 3: {{3/4 × 9/16 = 27/64}}.",
        ],
        solutions: [
          {
            label: "Track the juice poured away",
            steps: [
              "Pour 1 removes {{1/4}} of the juice → {{3/4}} left.",
              "Pour 2 removes {{1/4}} of {{3/4}} = {{3/16}} → {{12/16 - 3/16 = 9/16}} left.",
              "Pour 3 removes {{1/4}} of {{9/16}} = {{9/64}} → {{36/64 - 9/64 = 27/64}} left.",
            ],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 1, d: 4 },
            feedback: "That assumes each pour removes {{1/4}} of a jug of **pure juice**. After the first top-up the jug is part water, so later pours remove less juice.",
          },
          { spec: { type: "fraction", n: 9, d: 16 }, feedback: "{{9/16}} is the amount after two pours. Ravi pours three times altogether." },
        ],
        commonError: "Subtracting {{1/4}} three times from 1, as if every pour were pure juice.",
        difficulty: "challenge",
        guideRef: "calculating-with-fractions",
        hints: [
          "After the first pour and top-up, what fraction of the jug is juice?",
          "The second pour removes {{1/4}} of the **mixture** — so what fraction of the juice stays in the jug?",
          "Each step multiplies the amount of juice by the same fraction.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "written",
        id: "fractions-p3-q19",
        question:
          "A twist on a famous old puzzle: a gardener leaves 17 identical orchid pots to three nieces. Aisha is to get {{1/2}} of the pots, Mei {{1/3}} and Zara {{1/9}}. Nobody wants to split a pot!\n\nA neighbour lends them one extra pot, making 18. Aisha takes {{1/2}} of 18 = 9, Mei takes {{1/3}} of 18 = 6 and Zara takes {{1/9}} of 18 = 2. That uses 17 pots, so they give the borrowed pot back.\n\nExplain why the trick works. In your answer, add the three fractions, and compare each niece's share with what she was supposed to get from 17 pots.",
        marks: 3,
        modelAnswer:
          "Over 18: {{1/2 + 1/3 + 1/9 = 9/18 + 6/18 + 2/18 = 17/18}}. The fractions do **not** add up to a whole — {{1/18}} of the pots was never left to anyone.\n\nWith 18 pots the shares are 9, 6 and 2, which use only {{17/18}} of 18 = 17 pots, so exactly one pot (the borrowed one) is left over to give back.\n\nFrom 17 pots the nieces were supposed to get {{1/2 × 17 = 8 1/2}}, {{1/3 × 17 = 5 2/3}} and {{1/9 × 17 = 1 8/9}}. They actually get 9, 6 and 2 — each a little more. The unallocated {{1/18}} of the pots has been shared out among them, which is why everyone gains and nobody has to split a pot.",
        markScheme: [
          { point: "{{1/2 + 1/3 + 1/9 = 17/18}}", keywords: ["17/18", "eighteenths", "9/18", "6/18", "2/18"] },
          {
            point: "The fractions don't make a whole: {{1/18}} is left over, which is the one borrowed pot when there are 18",
            keywords: ["not 1", "less than 1", "1/18", "left over", "one pot", "not a whole", "doesn't add up"],
          },
          {
            point: "Compares shares: {{8 1/2}} → 9, {{5 2/3}} → 6, {{1 8/9}} → 2, so each niece gets a bit more than her fraction of 17",
            keywords: ["8 1/2", "8.5", "5 2/3", "1 8/9", "more than", "extra"],
          },
        ],
        commonError: "Saying the trick 'creates' a pot — really the three fractions only add up to {{17/18}}.",
        difficulty: "challenge",
        guideRef: "adding-subtracting",
        hints: [
          "Add {{1/2 + 1/3 + 1/9}}. Is the total a whole?",
          "Use eighteenths: what fraction of the pots is left to nobody?",
          "Work out {{1/2}}, {{1/3}} and {{1/9}} of 17. How do they compare with 9, 6 and 2?",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p3-q20",
        question:
          "The school fair poster is a rectangle. The designer makes it {{2/5}} longer (the new length is the old length plus {{2/5}} of it). To keep the **area** exactly the same, by what fraction of itself must the width be **reduced**? Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 2, d: 7, simplest: true },
        solution: [
          "New length = {{7/5}} × old length.",
          "For the area to stay the same, the width must be multiplied by the reciprocal of {{7/5}}, which is {{5/7}}.",
          "Keeping {{5/7}} of the width means reducing it by {{1 - 5/7 = 2/7}} of itself.",
          "Check with numbers: 5 cm by 7 cm (area 35 cm²) becomes 7 cm by 5 cm (area 35 cm²). The length went up by {{2/5}} of 5 and the width went down by {{2/7}} of 7. ✓",
        ],
        traps: [
          {
            spec: { type: "fraction", n: 2, d: 5 },
            feedback: "Try it: length × {{7/5}} and width × {{3/5}} gives {{21/25}} of the area — smaller! Reducing by the same fraction doesn't undo an increase.",
          },
          { spec: { type: "fraction", n: 5, d: 7 }, feedback: "{{5/7}} is what the width must be **multiplied by**. The question asks how much it is **reduced** by." },
        ],
        commonError: "Assuming you undo 'increase by {{2/5}}' by reducing by {{2/5}}.",
        difficulty: "challenge",
        guideRef: "dividing",
        hints: [
          "Try numbers: a poster 5 cm long and 7 cm wide. What is the new length?",
          "Area = length × width. If the length is multiplied by {{7/5}}, what must the width be multiplied by?",
          "A number times its reciprocal is 1. The width keeps {{5/7}} of itself — how much does it lose?",
        ],
        strategy: "Try small cases",
      },
    ],
  },

  // ===========================================================================
  // Practice Paper 4 — exam style
  // ===========================================================================
  {
    id: "fractions-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "fractions-p4-q01",
        question:
          "The number line shows the first two jumps of size {{2/3}}, starting at 0. The jumps carry on in the same way.\n\nHow many jumps does it take to land exactly on 4?",
        diagram: `<svg viewBox="0 0 420 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line from 0 to 4 marked in thirds. Two jumps of two thirds are drawn from 0 to 2 thirds and from 2 thirds to 4 thirds, followed by a dashed jump."><rect x="0" y="0" width="420" height="110" fill="#ffffff"/><line x1="30" y1="70" x2="390" y2="70" stroke="#1f2937" stroke-width="2"/><g stroke="#334155" stroke-width="1"><line x1="60" y1="65" x2="60" y2="75"/><line x1="90" y1="65" x2="90" y2="75"/><line x1="150" y1="65" x2="150" y2="75"/><line x1="180" y1="65" x2="180" y2="75"/><line x1="240" y1="65" x2="240" y2="75"/><line x1="270" y1="65" x2="270" y2="75"/><line x1="330" y1="65" x2="330" y2="75"/><line x1="360" y1="65" x2="360" y2="75"/></g><g stroke="#1f2937" stroke-width="2"><line x1="30" y1="60" x2="30" y2="80"/><line x1="120" y1="60" x2="120" y2="80"/><line x1="210" y1="60" x2="210" y2="80"/><line x1="300" y1="60" x2="300" y2="80"/><line x1="390" y1="60" x2="390" y2="80"/></g><path d="M30 68 Q60 28 90 68" fill="none" stroke="#334155" stroke-width="2"/><path d="M90 68 Q120 28 150 68" fill="none" stroke="#334155" stroke-width="2"/><path d="M150 68 Q180 28 210 68" fill="none" stroke="#334155" stroke-width="2" stroke-dasharray="4 3"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="60" y="40">2/3</text><text x="120" y="40">2/3</text><text x="30" y="97">0</text><text x="120" y="97">1</text><text x="210" y="97">2</text><text x="300" y="97">3</text><text x="390" y="97">4</text></g></svg>`,
        answer: { type: "number", value: 6 },
        solution: ["Each whole is 3 thirds, so 4 wholes are 12 thirds.", "Each jump covers 2 thirds, so 12 ÷ 2 = 6 jumps.", "The number line shows {{4 ÷ 2/3 = 6}}."],
        traps: [
          {
            spec: { type: "fraction", n: 8, d: 3 },
            feedback: "{{8/3}} is {{4 × 2/3}}. You want how many {{2/3}}s fit into 4 — that's {{4 ÷ 2/3}}. Each jump is less than 1, so it takes more than 4 jumps.",
          },
        ],
        commonError: "Multiplying 4 by {{2/3}} instead of dividing.",
        difficulty: "warmup",
        guideRef: "dividing",
        hints: ["How many thirds are there in 4?", "Each jump covers two of those thirds."],
        strategy: "Draw a number line",
      },
      {
        kind: "short",
        id: "fractions-p4-q02",
        question: "There is exactly one fraction with denominator 10 that lies between {{-3/4}} and {{-2/3}}. What is it?",
        answer: { type: "fraction", n: -7, d: 10 },
        solution: [
          "As decimals: {{-3/4}} = −0.75 and {{-2/3}} ≈ −0.667.",
          "The tenths near there are {{-6/10}} = −0.6, {{-7/10}} = −0.7 and {{-8/10}} = −0.8.",
          "Only −0.7 lies between −0.75 and −0.667, so the answer is {{-7/10}}.",
          "Check over 60: {{-3/4 = -45/60}}, {{-7/10 = -42/60}} and {{-2/3 = -40/60}}, and −45 < −42 < −40. ✓",
        ],
        traps: [
          { spec: { type: "fraction", n: -8, d: 10 }, feedback: "{{-8/10}} = −0.8 is less than {{-3/4}} = −0.75, so it's outside the range (further left on the number line)." },
          { spec: { type: "fraction", n: -6, d: 10 }, feedback: "{{-6/10}} = −0.6 is greater than {{-2/3}} ≈ −0.667, so it's outside the range (closer to 0)." },
        ],
        difficulty: "warmup",
        guideRef: "equivalence-ordering",
        hints: ["Write {{-3/4}} and {{-2/3}} as decimals, or both over 60.", "Which tenth lies between −0.75 and about −0.67?"],
        strategy: "Draw a number line",
      },
      {
        kind: "short",
        id: "fractions-p4-q03",
        question:
          "Zara recorded how she spent one school day.\n\n| Activity | Fraction of the day |\n|---|---|\n| Sleeping | {{3/8}} |\n| School | {{1/3}} |\n| CCA and homework | {{1/8}} |\n| Everything else | ? |\n\nWhat fraction of the day is 'everything else'? Give your answer in its simplest form.",
        answer: { type: "fraction", n: 1, d: 6, simplest: true },
        solution: [
          "All the fractions together must make 1 whole day.",
          "Common denominator 24: {{3/8 = 9/24}}, {{1/3 = 8/24}}, {{1/8 = 3/24}}.",
          "Listed activities: {{9/24 + 8/24 + 3/24 = 20/24}}.",
          "Everything else: {{24/24 - 20/24 = 4/24 = 1/6}}.",
        ],
        solutions: [
          {
            label: "Use hours",
            steps: [
              "A day is 24 hours: sleeping 9 h, school 8 h, CCA and homework 3 h.",
              "9 + 8 + 3 = 20 h, which leaves 4 h.",
              "{{4/24 = 1/6}} of the day.",
            ],
          },
        ],
        traps: [
          { spec: { type: "fraction", n: 5, d: 6 }, feedback: "{{5/6}} is the total of the three activities in the table. 'Everything else' is what's left of the whole day." },
        ],
        difficulty: "warmup",
        guideRef: "adding-subtracting",
        hints: ["All the fractions in the table must add up to 1.", "Try 24ths — there are 24 hours in a day!"],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p4-q04",
        question:
          "The pie chart shows how 240 students travel to school. The angle of the 'Walk' sector is 135°.\n\nHow many of the students walk to school?",
        diagram: `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pie chart with three sectors: Walk with an angle of 135 degrees, Bus and MRT."><rect x="0" y="0" width="220" height="220" fill="#ffffff"/><path d="M110 110 L110 25 A85 85 0 0 1 170.1 170.1 Z" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M110 110 L170.1 170.1 A85 85 0 0 1 27.9 132 Z" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><path d="M110 110 L27.9 132 A85 85 0 0 1 110 25 Z" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937" text-anchor="middle"><text x="156" y="88">Walk</text><text x="156" y="104">135°</text><text x="97" y="162">Bus</text><text x="70" y="84">MRT</text></g></svg>`,
        answer: { type: "number", value: 90, display: "90 students" },
        solution: [
          "A full circle is 360°, so 'Walk' is {{135/360}} of the students.",
          "{{135/360 = 3/8}} (divide top and bottom by 45).",
          "{{3/8}} of 240 = 30 × 3 = 90 students.",
        ],
        traps: [
          { spec: { type: "number", value: 135 }, feedback: "135 is the angle, not the number of students. What fraction of the full 360° is it?" },
          { spec: { type: "fraction", n: 3, d: 8 }, feedback: "{{3/8}} is the **fraction** of students who walk. Now find {{3/8}} of 240." },
        ],
        difficulty: "warmup",
        guideRef: "fractions-of-amounts",
        hints: ["What fraction of a full turn (360°) is 135°?", "Simplify {{135/360}} — both numbers divide by 45."],
        strategy: "Find one part first",
      },
      {
        kind: "short",
        id: "fractions-p4-q05",
        question:
          "The diagram shows a square with sides of 1 m, divided into 4 equal columns and 5 equal rows. The shaded rectangle is {{3/4}} m wide and {{2/5}} m tall.\n\nWhat is the area of the shaded rectangle? Give your answer in m² as a fraction in its simplest form.",
        diagram: `<svg viewBox="0 0 320 265" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 1 metre by 1 metre square divided into 4 columns and 5 rows. A rectangle 3 columns wide and 2 rows tall in the bottom left corner is shaded."><rect x="0" y="0" width="320" height="265" fill="#ffffff"/><rect x="70" y="146" width="157.5" height="84" fill="#c7d2fe"/><g stroke="#334155" stroke-width="1"><line x1="122.5" y1="20" x2="122.5" y2="230"/><line x1="175" y1="20" x2="175" y2="230"/><line x1="227.5" y1="20" x2="227.5" y2="230"/><line x1="70" y1="62" x2="280" y2="62"/><line x1="70" y1="104" x2="280" y2="104"/><line x1="70" y1="146" x2="280" y2="146"/><line x1="70" y1="188" x2="280" y2="188"/></g><rect x="70" y="20" width="210" height="210" fill="none" stroke="#1f2937" stroke-width="2"/><rect x="70" y="146" width="157.5" height="84" fill="none" stroke="#1f2937" stroke-width="2.5"/><g stroke="#334155" stroke-width="1"><line x1="70" y1="242" x2="227.5" y2="242"/><line x1="70" y1="237" x2="70" y2="247"/><line x1="227.5" y1="237" x2="227.5" y2="247"/><line x1="58" y1="146" x2="58" y2="230"/><line x1="53" y1="146" x2="63" y2="146"/><line x1="53" y1="230" x2="63" y2="230"/></g><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="148.75" y="259" text-anchor="middle">3/4 m</text><text x="50" y="192" text-anchor="end">2/5 m</text><text x="175" y="14" text-anchor="middle">1 m</text><text x="288" y="129" text-anchor="start">1 m</text></g></svg>`,
        answer: { type: "fraction", n: 3, d: 10, simplest: true },
        solution: [
          "The square is cut into 4 × 5 = 20 equal small rectangles, each {{1/20}} m².",
          "The shaded part covers 3 columns × 2 rows = 6 small rectangles.",
          "Area = {{6/20 = 3/10}} m² — exactly {{3/4 × 2/5}}.",
        ],
        traps: [
          { spec: { type: "fraction", n: 23, d: 20 }, feedback: "That's {{3/4 + 2/5}}. Area means multiply — count the shaded small rectangles." },
          { spec: { type: "fraction", n: 5, d: 9 }, feedback: "{{5/9}} comes from adding the tops and the bottoms. Count the shaded small rectangles out of 20 instead." },
        ],
        difficulty: "warmup",
        guideRef: "multiplying",
        hints: ["How many small rectangles make the whole square? How many of them are shaded?", "Simplify your fraction at the end."],
        strategy: "Draw an area model",
      },
      {
        kind: "short",
        id: "fractions-p4-q06",
        question:
          "Ravi works out {{5/6 - 1/6 ÷ 2/3}} like this:\n\n    {{5/6 - 1/6 = 2/3}},  then  {{2/3 ÷ 2/3 = 1}}\n\nRavi's answer is wrong. What is the correct value of {{5/6 - 1/6 ÷ 2/3}}? Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 7, d: 12, simplest: true },
        solution: [
          "Division comes before subtraction: {{1/6 ÷ 2/3 = 1/6 × 3/2 = 3/12 = 1/4}}.",
          "Then {{5/6 - 1/4 = 10/12 - 3/12 = 7/12}}.",
        ],
        traps: [
          { spec: { type: "number", value: 1 }, feedback: "That's Ravi's answer. He worked from left to right, but division comes before subtraction." },
          {
            spec: { type: "fraction", n: 13, d: 18 },
            feedback: "You multiplied {{1/6 × 2/3}} instead of dividing. Flip the {{2/3}}: {{1/6 × 3/2 = 1/4}}.",
          },
        ],
        commonError: "Working from left to right instead of dividing before subtracting.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: ["Which comes first: − or ÷?", "Work out {{1/6 ÷ 2/3}} first, using Keep, Change, Flip.", "Subtract your result from {{5/6}} using twelfths."],
        strategy: "Follow the order of operations",
      },
      {
        kind: "written",
        id: "fractions-p4-q07",
        question:
          "Hana says:\n\n> {{-3/7}} is smaller than {{-2/5}}, because 7 is bigger than 5.\n\n(a) Is {{-3/7}} smaller than {{-2/5}}? Show how you know.\n\n(b) Explain why Hana's **reason** is not a good one.",
        marks: 3,
        modelAnswer:
          "(a) Over 35: {{-3/7 = -15/35}} and {{-2/5 = -14/35}}. {{-15/35}} is further left on the number line (further below 0), so **yes**, {{-3/7 < -2/5}}.\n\n(b) Her conclusion is right but her reason isn't. You can't compare fractions just by looking at the denominators — the numerators matter too. For example, compare {{-1/7}} and {{-1/5}}: 7 is bigger than 5, but {{-1/7}} is **greater** than {{-1/5}}, because it is closer to 0.",
        markScheme: [
          {
            point: "Writes both over a common denominator, {{-15/35}} and {{-14/35}} (or as decimals −0.43 and −0.4)",
            keywords: ["35", "-15/35", "-14/35", "15/35", "14/35", "0.43", "0.428", "0.4"],
          },
          { point: "Concludes yes, {{-3/7 < -2/5}} (it is further from 0 / further left)", keywords: ["yes", "smaller", "further from 0", "more negative", "further left", "true"] },
          {
            point: "Explains the reason fails, e.g. counterexample {{-1/7 > -1/5}}, or 'the numerators matter too'",
            keywords: ["counterexample", "-1/7", "1/7", "numerator", "not always", "doesn't work", "denominator alone"],
          },
        ],
        commonError: "Agreeing with Hana's reason because her final answer happens to be right.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "Compare {{3/7}} and {{2/5}} first, using a common denominator of 35.",
          "For negative numbers, the one that is further from 0 is the smaller one.",
          "Can you find two negative fractions where Hana's rule gives the wrong answer? Try numerators of 1.",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "short",
        id: "fractions-p4-q08",
        question:
          "In a **magic square**, every row, every column and both diagonals add up to the same total.\n\n| | Col 1 | Col 2 | Col 3 |\n|---|---|---|---|\n| Row 1 | {{1/6}} | {{7/12}} | {{1/2}} |\n| Row 2 | {{3/4}} | {{5/12}} | |\n| Row 3 | B | | A |\n\nFind the values of A and B. Type A first, then B, as fractions separated by a comma.",
        answer: { type: "list", values: [2 / 3, 1 / 3], ordered: true, display: "A = {{2/3}}, B = {{1/3}}" },
        solution: [
          "Magic total from row 1: {{1/6 + 7/12 + 1/2 = 2/12 + 7/12 + 6/12 = 15/12}}.",
          "A is on the diagonal with {{1/6}} and {{5/12}}: A = {{15/12 - 2/12 - 5/12 = 8/12 = 2/3}}.",
          "B is in column 1 with {{1/6}} and {{3/4}}: B = {{15/12 - 2/12 - 9/12 = 4/12 = 1/3}}.",
          "Check the other diagonal: {{1/2 + 5/12 + 1/3 = 6/12 + 5/12 + 4/12 = 15/12}}. ✓",
        ],
        traps: [
          {
            spec: { type: "list", values: [5 / 12, 1 / 12], ordered: true },
            feedback: "The magic total isn't 1. Work it out from the complete row: {{1/6 + 7/12 + 1/2 = 15/12}}.",
          },
          { spec: { type: "list", values: [1 / 3, 2 / 3], ordered: true }, feedback: "Right values, wrong order — type A (bottom right) first, then B (bottom left)." },
        ],
        commonError: "Assuming each line adds up to 1 instead of finding the total from the complete row.",
        difficulty: "core",
        guideRef: "adding-subtracting",
        hints: [
          "Which line is already complete? Use it to find the magic total.",
          "Twelfths work for every fraction in the square.",
          "A is on a diagonal with two known numbers; B is in a column with two known numbers.",
        ],
        strategy: "Find a common denominator",
      },
      {
        kind: "short",
        id: "fractions-p4-q09",
        question: "An MRT train travels {{25 1/2}} km in {{3/4}} of an hour. Find its average speed in km/h.",
        answer: { type: "number", value: 34, display: "34 km/h" },
        solution: [
          "Speed = distance ÷ time = {{25 1/2 ÷ 3/4}}.",
          "{{51/2 × 4/3 = 204/6 = 34}} km/h.",
          "Sense check: in a whole hour (longer than {{3/4}} h) the train goes further than {{25 1/2}} km, so the answer must be more than {{25 1/2}}. ✓",
        ],
        solutions: [
          {
            label: "Unitary method",
            steps: ["In {{3/4}} h it travels {{25 1/2}} km, so in {{1/4}} h it travels {{25 1/2 ÷ 3 = 8 1/2}} km.", "In 1 hour: {{4 × 8 1/2 = 34}} km."],
          },
        ],
        traps: [
          { spec: { type: "number", value: 19.125 }, feedback: "That's distance × time. Speed = distance ÷ time." },
          { spec: { type: "fraction", n: 1, d: 34 }, feedback: "That's time ÷ distance — upside down. Speed = distance ÷ time." },
        ],
        commonError: "Multiplying the distance by the time.",
        difficulty: "core",
        guideRef: "dividing",
        hints: ["Speed = distance ÷ time.", "How far does the train go in {{1/4}} of an hour?", "Multiply that by 4 to get the distance in a whole hour."],
        strategy: "Use the unitary method",
      },
      {
        kind: "short",
        id: "fractions-p4-q10",
        question:
          "The table shows the rainfall measured at a weather station in Singapore in four months.\n\n| Month | Rainfall (mm) |\n|---|---|\n| February | 120 |\n| July | 160 |\n| November | 240 |\n| December | 280 |\n\nWhat fraction of the total rainfall for these four months fell in December? Give your answer in its simplest form.",
        answer: { type: "fraction", n: 7, d: 20, simplest: true },
        solution: ["Total: 120 + 160 + 240 + 280 = 800 mm.", "December's share: {{280/800}}.", "Simplify (÷ 40): {{7/20}}."],
        traps: [
          {
            spec: { type: "fraction", n: 7, d: 13 },
            feedback: "{{7/13}} compares December with the **other three** months (280 out of 520). You need December out of the total for all four months.",
          },
          { spec: { type: "fraction", n: 7, d: 6 }, feedback: "{{7/6}} compares December with November only. You need December out of the total for all four months." },
        ],
        commonError: "Leaving December out of the total.",
        difficulty: "core",
        guideRef: "fractions-of-amounts",
        hints: ["Find the total rainfall for all four months.", "December's share is December's rainfall ÷ the total.", "Simplify — both numbers divide by 40."],
        strategy: "Use the HCF",
      },
      {
        kind: "written",
        id: "fractions-p4-q11",
        question:
          "Wei Ling has a bag of rice. She says:\n\n> Using {{3/4}} of {{2/3}} of the bag gives exactly the same amount as using {{2/3}} of {{3/4}} of the bag.\n\nRavi says the amounts must be different, because the fractions are used in a different order.\n\nWho is right? Explain, using a calculation **and** a reason that would work for any two fractions. (A sketch of an area model may help.)",
        marks: 3,
        modelAnswer:
          "{{3/4}} of {{2/3}} is {{3/4 × 2/3 = 6/12 = 1/2}} of the bag. {{2/3}} of {{3/4}} is {{2/3 × 3/4 = 6/12 = 1/2}} of the bag. They are the same, so **Wei Ling is right**.\n\nThis always happens. To multiply fractions you multiply the tops and multiply the bottoms, and 3 × 2 = 2 × 3 and 4 × 3 = 3 × 4 — multiplication can be done in any order (it is *commutative*).\n\nIn an area model, '{{3/4}} of {{2/3}}' and '{{2/3}} of {{3/4}}' are the same shaded rectangle turned round, so the area is the same.",
        markScheme: [
          { point: "{{3/4 × 2/3 = 6/12 = 1/2}}", keywords: ["1/2", "6/12", "half"] },
          { point: "{{2/3 × 3/4 = 1/2}} as well, so Wei Ling is right", keywords: ["wei ling", "same", "equal", "both"] },
          {
            point: "General reason: multiplication can be done in any order (commutative), e.g. tops 3 × 2 = 2 × 3 and bottoms 4 × 3 = 3 × 4, or the area model is the same rectangle turned round",
            keywords: ["any order", "commutative", "order doesn't matter", "order does not matter", "area model", "rectangle", "turned", "rotate"],
          },
        ],
        commonError: "Checking only one example and not giving a reason that works for all fractions.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Work out each one — 'of' means multiply.",
          "Do you get the same fraction both times?",
          "Look at what happens to the numerators and to the denominators when you swap the order.",
        ],
        strategy: "Draw an area model",
      },
      {
        kind: "short",
        id: "fractions-p4-q12",
        question: "Work out {{(3/4 - 1/3) ÷ 5/6}}. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 1, d: 2, simplest: true },
        solution: [
          "Brackets first: {{3/4 - 1/3 = 9/12 - 4/12 = 5/12}}.",
          "Then divide: {{5/12 ÷ 5/6 = 5/12 × 6/5}}.",
          "Cancel the 5s, and 6 into 12: {{1/2 × 1/1 = 1/2}}.",
        ],
        solutions: [
          {
            label: "Same denominators",
            steps: ["{{5/12 ÷ 5/6 = 5/12 ÷ 10/12}}.", "How many 10-twelfths fit into 5-twelfths? 5 ÷ 10 = {{1/2}}."],
          },
        ],
        traps: [
          {
            spec: { type: "fraction", n: 7, d: 20 },
            feedback: "{{7/20}} comes from dividing before subtracting, as if the brackets weren't there. Brackets come first.",
          },
          { spec: { type: "fraction", n: 25, d: 72 }, feedback: "You multiplied by {{5/6}} instead of dividing. Flip it: × {{6/5}}." },
        ],
        commonError: "Ignoring the brackets and dividing {{1/3}} by {{5/6}} first.",
        difficulty: "core",
        guideRef: "calculating-with-fractions",
        hints: ["What must you work out first?", "Work out the bracket using twelfths.", "Dividing by {{5/6}} is the same as multiplying by {{6/5}}."],
        strategy: "Follow the order of operations",
      },
      {
        kind: "short",
        id: "fractions-p4-q13",
        question:
          "Here are five statements.\n\n1. {{-2/3 < -3/5}}\n2. {{14/16 >= 7/8}}\n3. {{-5/6 > -4/5}}\n4. {{3/7 != 9/21}}\n5. {{-3/8 <= -1/2}}\n\nWhich statements are **true**? Type the statement numbers, separated by commas.",
        answer: { type: "list", values: [1, 2], display: "Statements 1 and 2" },
        solution: [
          "1. Over 15: {{-10/15 < -9/15}}. **True.**",
          "2. {{14/16 = 7/8}}, and ≥ means 'greater than **or equal to**'. **True.**",
          "3. Over 30: {{-25/30}} and {{-24/30}}. {{-25/30}} is further left, so it is smaller, not greater. **False.**",
          "4. {{9/21 = 3/7}} (divide by 3), so they are equal and ≠ is false. **False.**",
          "5. {{-1/2 = -4/8}}, so {{-3/8}} is closer to 0 and is the **greater** number. **False.**",
          "The true statements are 1 and 2.",
        ],
        traps: [
          {
            spec: { type: "list", values: [2, 3, 5] },
            feedback: "You've compared the negative fractions as if they were positive. On the number line {{-5/6}} is further left than {{-4/5}}, so it's smaller. Check statements 1, 3 and 5 again.",
          },
          { spec: { type: "list", values: [1, 2, 4] }, feedback: "{{9/21}} simplifies to {{3/7}} (divide by 3), so the two fractions are equal and '≠' is false." },
        ],
        commonError: "Ordering negative fractions as if they were positive.",
        difficulty: "core",
        guideRef: "equivalence-ordering",
        hints: [
          "For each statement, put both fractions over a common denominator.",
          "For negatives, picture the number line: the further left, the smaller.",
          "≥ and ≤ are true when the two sides are equal.",
        ],
        strategy: "Draw a number line",
      },
      {
        kind: "short",
        id: "fractions-p4-q14",
        question:
          "Siti tiles a wall with one straight row of 14 square tiles, each {{8 3/4}} cm wide. There is a gap of {{1/4}} cm between each pair of neighbouring tiles, and no gap at either end. How long is the row of tiles? Give your answer in cm.",
        answer: { type: "fraction", n: 503, d: 4, allowDecimal: true, display: "{{125 3/4}} cm" },
        solution: [
          "Tiles: {{14 × 8 3/4 = 14 × 8 + 14 × 3/4 = 112 + 10 1/2 = 122 1/2}} cm.",
          "Gaps: 14 tiles in a row have 13 gaps between them, so {{13 × 1/4 = 3 1/4}} cm.",
          "Total: {{122 1/2 + 3 1/4 = 125 3/4}} cm.",
        ],
        traps: [
          { spec: { type: "number", value: 126 }, feedback: "126 cm counts 14 gaps. Between 14 tiles there are only 13 gaps — try drawing 3 tiles and counting." },
          { spec: { type: "number", value: 122.5 }, feedback: "{{122 1/2}} cm is just the tiles. Don't forget the gaps between them." },
        ],
        commonError: "Counting one gap per tile (14) instead of 13.",
        difficulty: "core",
        guideRef: "multiplying",
        hints: [
          "Find the total width of the tiles first: {{14 × 8 3/4}}.",
          "Draw 3 tiles in a row. How many gaps are there? So how many gaps are there for 14 tiles?",
          "Add the tile widths and the gaps together.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "written",
        id: "fractions-p4-q15",
        question:
          "Aisha's homework:\n\n    {{5/6 ÷ 3/4 = 6/5 × 3/4 = 18/20 = 9/10}}\n\n(a) Without calculating, explain how you can tell that her answer must be wrong.\n\n(b) Describe her mistake, and find the correct answer as a mixed number.",
        marks: 3,
        modelAnswer:
          "(a) {{5/6}} is bigger than {{3/4}}, so {{3/4}} fits into {{5/6}} **more than once** — the answer must be bigger than 1. But {{9/10}} is less than 1, so it can't be right.\n\n(b) Aisha flipped the **first** fraction. Keep, Change, Flip means keep {{5/6}} and flip the **second** fraction:\n\n    {{5/6 ÷ 3/4 = 5/6 × 4/3 = 20/18 = 10/9 = 1 1/9}}",
        markScheme: [
          {
            point: "Since {{5/6 > 3/4}}, the answer must be more than 1, but {{9/10}} is less than 1",
            keywords: ["more than 1", "bigger than 1", "greater than 1", "less than 1", "more than once", "5/6 is bigger", "5/6 > 3/4"],
          },
          { point: "Her mistake: she flipped the first fraction instead of the second", keywords: ["first fraction", "wrong fraction", "flipped the first", "should flip", "second", "4/3"] },
          { point: "Correct answer {{5/6 × 4/3 = 10/9 = 1 1/9}}", keywords: ["10/9", "1 1/9", "20/18"] },
        ],
        commonError: "Flipping the wrong fraction in Keep, Change, Flip.",
        difficulty: "core",
        guideRef: "dividing",
        hints: [
          "Is {{5/6}} bigger or smaller than {{3/4}}? So does {{3/4}} fit into {{5/6}} more or less than once?",
          "In Keep, Change, Flip, which fraction gets flipped?",
          "Work out {{5/6 × 4/3}}, simplify, then write it as a mixed number.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "fractions-p4-q16",
        question:
          "A rectangle has an area of {{(2x^2)/3}} cm² and a length of {{(4x)/9}} cm (x > 0). Find an expression for its width. (Type just the expression, without units.)",
        answer: { type: "expression", expr: "3x/2", display: "{{(3x)/2}} cm" },
        solution: [
          "Width = area ÷ length = {{(2x^2)/3 ÷ (4x)/9}}.",
          "Keep, Change, Flip: {{(2x^2)/3 × 9/(4x)}}.",
          "Multiply: {{(18x^2)/(12x)}}.",
          "Cancel 6x from the top and bottom: {{(3x)/2}}.",
          "Check with x = 3: the area is 6 and the length is {{4/3}}, so the width is {{6 ÷ 4/3 = 9/2}}; and {{(3 × 3)/2 = 9/2}}. ✓",
        ],
        traps: [
          { spec: { type: "expression", expr: "8x^3/27" }, feedback: "You multiplied the area by the length. Width = area ÷ length." },
          { spec: { type: "expression", expr: "2/(3x)" }, feedback: "That's length ÷ area — you flipped the wrong fraction. Keep the area, flip the length." },
        ],
        commonError: "Flipping the first fraction instead of the second.",
        difficulty: "core",
        guideRef: "algebraic-fractions",
        hints: [
          "Area = length × width, so width = area ÷ length.",
          "Dividing by {{(4x)/9}} is the same as multiplying by {{9/(4x)}}.",
          "{{x^2 ÷ x = x}}. Simplify the numbers too.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "written",
        id: "fractions-p4-q17",
        question:
          "Ravi says:\n\n> When you square a fraction, the answer is always smaller than the fraction you started with.\n\nIs this **always** true, **sometimes** true or **never** true? Give examples, and describe exactly which fractions get smaller when you square them. (Think about fractions greater than 1, and negative fractions too.)",
        marks: 3,
        modelAnswer:
          "**Sometimes** true.\n\n- {{(2/3)^2 = 4/9}}, and {{4/9 < 6/9 = 2/3}}, so it gets smaller. Squaring means taking {{2/3}} *of* {{2/3}} — a part of a part.\n- {{(3/2)^2 = 9/4 = 2 1/4}}, which is **bigger** than {{1 1/2}}.\n- {{(-1/2)^2 = 1/4}}, which is bigger than {{-1/2}} (a square is never negative).\n- {{1^2 = 1}} and {{0^2 = 0}} stay the same.\n\nSo a fraction gets smaller when you square it exactly when it is **between 0 and 1**: multiplying a positive number by a number less than 1 makes it smaller.",
        markScheme: [
          { point: "An example that gets smaller, e.g. {{(2/3)^2 = 4/9 < 2/3}}", keywords: ["4/9", "smaller", "2/3", "1/4", "less"] },
          {
            point: "A counterexample that does not get smaller, e.g. {{(3/2)^2 = 9/4}} or {{(-1/2)^2 = 1/4}}",
            keywords: ["9/4", "3/2", "bigger", "negative", "-1/2", "improper", "greater than 1"],
          },
          { point: "Conclusion: sometimes — exactly for fractions between 0 and 1", keywords: ["sometimes", "between 0 and 1", "proper", "less than 1"] },
        ],
        commonError: "Testing only proper fractions like {{1/2}} and {{2/3}} and concluding 'always'.",
        difficulty: "challenge",
        guideRef: "multiplying",
        hints: [
          "Try {{1/2}} and {{2/3}}. What happens?",
          "Now try an improper fraction such as {{3/2}}, and a negative one such as {{-1/2}}.",
          "Squaring x means x × x. When does multiplying by x make a number smaller?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "fractions-p4-q18",
        question:
          "Two candles are the same length. Candle A burns down completely in 3 hours and candle B in 4 hours, each at a steady rate. Both are lit at the same time. After how many **minutes** is candle B exactly twice as long as candle A?",
        answer: { type: "number", value: 144, display: "144 minutes" },
        solution: [
          "After t hours, candle A has burnt {{t/3}} of its length, so {{1 - t/3}} is left. Candle B has {{1 - t/4}} left.",
          "We need {{1 - t/4 = 2(1 - t/3)}}, that is {{1 - t/4 = 2 - (2t)/3}}.",
          "Rearrange: {{(2t)/3 - t/4 = 1}}, so {{(8t)/12 - (3t)/12 = (5t)/12 = 1}}.",
          "{{t = 12/5 = 2 2/5}} hours = 2 hours 24 minutes = 144 minutes.",
          "Check: A has {{1 - 4/5 = 1/5}} left and B has {{1 - 3/5 = 2/5}} left. ✓ Twice as long.",
        ],
        solutions: [
          {
            label: "Try values",
            steps: [
              "After 2 h: A has {{1/3}} left and B has {{1/2}} left — B is only {{1 1/2}} times as long.",
              "After {{2 1/2}} h: A has {{1/6}} left and B has {{3/8}} left — B is {{2 1/4}} times as long. So the time is between 2 h and {{2 1/2}} h.",
              "Try 2 h 24 min = {{2 2/5}} h: A has {{1/5}} left and B has {{2/5}} left. ✓",
            ],
          },
        ],
        traps: [
          { spec: { type: "number", value: 2.4 }, feedback: "2.4 is the time in **hours**. The question asks for minutes." },
          {
            spec: { type: "number", value: 120 },
            feedback: "After 2 hours, A has {{1/3}} left and B has {{1/2}} left — B is only {{1 1/2}} times as long. Keep going a little longer.",
          },
        ],
        commonError: "Giving the time in hours, or guessing a round number of hours without checking.",
        difficulty: "challenge",
        guideRef: "calculating-with-fractions",
        hints: [
          "What fraction of candle A is left after 1 hour? After 2 hours?",
          "After t hours, A has {{1 - t/3}} of its length left. Write the same for B.",
          "Set B's length equal to twice A's and solve — or try times between 2 and 3 hours.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "fractions-p4-q19",
        question:
          "Siti's age is {{3/4}} of her brother Jun's age. In 4 years' time, Siti's age will be {{4/5}} of Jun's age. How old are they now? Type Siti's age first, then Jun's.",
        answer: { type: "list", values: [12, 16], ordered: true, display: "Siti 12, Jun 16" },
        solution: [
          "Siti is {{3/4}} of Jun's age, so try pairs: (3, 4), (6, 8), (9, 12), (12, 16), …",
          "Add 4 to each age and test for {{4/5}}: (7, 8) gives {{7/8}} ✗; (10, 12) gives {{5/6}} ✗; (13, 16) gives {{13/16}} ✗; (16, 20) gives {{16/20 = 4/5}} ✓.",
          "Siti is 12 and Jun is 16.",
        ],
        solutions: [
          {
            label: "Algebra",
            steps: [
              "Let Jun be j years old. Siti is {{3/4 j}}.",
              "In 4 years: {{3/4 j + 4 = 4/5 (j + 4)}}.",
              "Multiply both sides by 20: 15j + 80 = 16j + 64, so j = 16.",
              "Siti = {{3/4}} × 16 = 12.",
            ],
          },
        ],
        traps: [
          { spec: { type: "list", values: [16, 20], ordered: true }, feedback: "Those are their ages **in 4 years' time**. How old are they now?" },
          {
            spec: { type: "list", values: [3, 4], ordered: true },
            feedback: "3 and 4 fit the first fact, but in 4 years they'd be 7 and 8, and {{7/8 != 4/5}}. Keep trying pairs.",
          },
        ],
        commonError: "Stopping at the first pair that fits {{3/4}} without testing the second fact.",
        difficulty: "challenge",
        guideRef: "fractions-of-amounts",
        hints: [
          "Siti's age must be {{3/4}} of Jun's — list some possible pairs of ages.",
          "For each pair, add 4 to both ages. Is the new Siti age {{4/5}} of the new Jun age?",
          "Or let Jun's age be j and write an equation; multiply by 20 to clear the fractions.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "fractions-p4-q20",
        question: "Two fractions add up to {{5/6}} and multiply to give {{1/6}}. What are the two fractions? Type both, separated by a comma.",
        answer: { type: "list", values: [1 / 2, 1 / 3], display: "{{1/2}} and {{1/3}}" },
        solution: [
          "Start with the product: pairs that multiply to {{1/6}} include {{1/2 × 1/3}}, {{1/6 × 1}}, {{2/3 × 1/4}} and {{1/12 × 2}}.",
          "Check the sums: {{1/2 + 1/3 = 5/6}} ✓, {{1/6 + 1 = 7/6}} ✗, {{2/3 + 1/4 = 11/12}} ✗, {{1/12 + 2 = 2 1/12}} ✗.",
          "The fractions are {{1/2}} and {{1/3}}.",
        ],
        traps: [
          { spec: { type: "list", values: [1 / 6, 1] }, feedback: "These multiply to {{1/6}}, but they add up to {{7/6}}, not {{5/6}}." },
          { spec: { type: "list", values: [5 / 12, 5 / 12] }, feedback: "These add up to {{5/6}}, but they multiply to {{25/144}}, not {{1/6}}." },
        ],
        commonError: "Satisfying only one of the two conditions.",
        difficulty: "challenge",
        guideRef: "calculating-with-fractions",
        hints: [
          "Which is easier to list: pairs that add to {{5/6}}, or pairs that multiply to {{1/6}}?",
          "Unit fractions are a good place to start: {{1/6}} is {{1/2 × 1/3}}.",
          "Check the sum of each pair you try.",
        ],
        strategy: "Try small cases",
      },
    ],
  },
];
