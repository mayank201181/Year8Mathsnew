import type { Paper } from "../../types.ts";

// Circles — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables, reasoning.

export const morePapers: Paper[] = [
  // ==========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // ==========================================================================
  {
    id: "circles-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "circles-p3-q01",
        question:
          "Wei Ling sets her compasses to 4.5 cm and draws a circle. She wants to cut out the smallest square of card that the whole circle fits on. What side length must the square have? Give your answer in cm.",
        answer: { type: "number", value: 9, display: "9 cm" },
        traps: [
          {
            spec: { type: "number", value: 4.5 },
            feedback:
              "4.5 cm is the gap between the compass point and the pencil, which is the **radius**. The circle reaches 4.5 cm on *both* sides of the centre.",
          },
        ],
        solution: [
          "The compass gap is the distance from the centre to the edge: the **radius**, 4.5 cm.",
          "The widest measurement of the circle is its **diameter**: {{d = 2r = 2 * 4.5 = 9}} cm.",
          "The square must be as wide as the circle, so each side is 9 cm.",
        ],
        commonError: "Confusing the radius (the compass gap) with the diameter (the full width of the circle).",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: [
          "The compass gap is the distance from the centre to the edge. What is that called?",
          "How wide is the circle, measured straight across through the centre?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p3-q02",
        question:
          "Ethan and Jun each work out the circumference of a circular coaster with diameter 14 cm. Ethan uses π ≈ {{22/7}}. Jun uses π ≈ 3.14. How many centimetres bigger is Ethan's answer than Jun's?",
        answer: { type: "number", value: 0.04, display: "0.04 cm" },
        traps: [
          {
            spec: { type: "number", value: 44 },
            feedback: "44 cm is Ethan's answer. Now work out Jun's answer and find the difference.",
          },
        ],
        solution: [
          "Ethan: {{22/7 * 14 = 22 * 2 = 44}} cm.",
          "Jun: 3.14 × 14 = 43.96 cm.",
          "Difference: 44 − 43.96 = 0.04 cm.",
          "With the π button, {{pi * 14 = 43.98…}} cm. Both approximations are within 0.03 cm of it, and {{22/7}} happens to be slightly closer to π than 3.14 is.",
        ],
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["Work out each person's answer separately.", "For Ethan's answer, divide 14 by 7 first."],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q03",
        question:
          "A round mirror has a diameter of 90 cm. Priya glues gold trim once around its edge. How long is the trim? Give your answer in cm, to the nearest cm.",
        answer: { type: "number", value: 283, allowFraction: false, display: "283 cm" },
        traps: [
          {
            spec: { type: "number", value: 565 },
            feedback:
              "565 cm comes from {{2 pi * 90}}. The 2 in {{2 pi r}} turns a radius into a diameter, but 90 cm is already the diameter. Use {{C = pi d}}.",
          },
          {
            spec: { type: "number", value: 6362 },
            feedback:
              "6362 cm² is the **area** of the mirror (the glass inside). The trim goes *around* the edge, so you need the circumference.",
          },
        ],
        solution: [
          "The trim goes once round the edge, so you need the **circumference**.",
          "A diameter is given, so use {{C = pi d}}.",
          "{{C = pi * 90 = 282.74…}} cm.",
          "To the nearest cm: 283 cm.",
          "Check: 3 × 90 = 270, a little less than 283. ✓",
        ],
        commonError: "Using {{2 pi d}}, which doubles a length that is already a diameter.",
        difficulty: "warmup",
        guideRef: "circumference",
        hints: [
          "Is the trim measuring the space inside the mirror, or the distance around it?",
          "You know the diameter, so use {{C = pi d}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "circles-p3-q04",
        question:
          "The floor of a circular bandstand in a park has a radius of 6 m. Find the area of the floor in m², in terms of π. (Type it like 5π or 5pi, with no units.)",
        answer: { type: "expression", expr: "36pi", display: "{{36 pi}} m²" },
        traps: [
          {
            spec: { type: "expression", expr: "12pi" },
            feedback: "{{12 pi}} is the circumference, {{2 pi r}}. Area is {{pi r^2}}: square the radius.",
          },
          {
            spec: { type: "number", value: 113.1, tolerance: 0.06 },
            feedback:
              "That's the right size, but the question asks for an exact answer **in terms of π**. Leave π as a symbol.",
          },
        ],
        solution: ["Area {{= pi r^2}}.", "{{r^2 = 6^2 = 36}}.", "So {{A = 36 pi}} m² (about 113.1 m²)."],
        commonError: "Working out {{2 pi r}} (the circumference) or π × 6 × 2 instead of squaring the radius.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["Which formula gives the area of a circle?", "Square the radius first, then multiply by π."],
      },
      {
        kind: "short",
        id: "circles-p3-q05",
        question:
          "A half-moon doormat outside an HDB flat is a semicircle with a diameter of 80 cm. Find its area in cm², correct to the nearest whole number.",
        answer: { type: "number", value: 2513, allowFraction: false, display: "2513 cm²" },
        traps: [
          {
            spec: { type: "number", value: 10053 },
            feedback: "You used 80 cm as the radius. The radius is half the diameter: 40 cm.",
          },
          {
            spec: { type: "number", value: 5027 },
            feedback: "That's the area of the whole circle. A semicircle is half of it.",
          },
        ],
        solution: [
          "Radius = 80 ÷ 2 = 40 cm.",
          "Whole circle: {{pi * 40^2 = 1600 pi}} cm².",
          "Semicircle: {{1/2 * 1600 pi = 800 pi = 2513.27…}} cm².",
          "To the nearest whole number: 2513 cm².",
        ],
        commonError: "Squaring the diameter instead of the radius, which makes the area 4 times too big.",
        difficulty: "warmup",
        guideRef: "semicircles-quarter-circles",
        hints: ["What is the radius?", "Find the area of the whole circle, then halve it."],
      },
      {
        kind: "short",
        id: "circles-p3-q06",
        question:
          "A trundle wheel is used to measure distances along the ground. Each full turn of the wheel rolls out exactly 1 metre. What must the diameter of the wheel be? Give your answer in cm, to the nearest cm.",
        answer: { type: "number", value: 32, display: "32 cm" },
        traps: [
          {
            spec: { type: "number", value: 16 },
            feedback: "That's the radius, {{100/(2 pi) = 15.9…}} cm. The question asks for the diameter.",
          },
          {
            spec: { type: "number", value: 314 },
            feedback:
              "You multiplied 100 by π. You know the circumference and want the diameter, so undo the × π: divide by π.",
          },
        ],
        solution: [
          "One full turn rolls out one circumference, so {{C = 1}} m = 100 cm.",
          "{{C = pi d}}, so {{d = C/pi}}.",
          "{{d = 100/pi = 31.83…}} cm.",
          "To the nearest cm: 32 cm.",
          "Check: {{pi * 32 = 100.5…}} cm, very close to 1 m. ✓",
        ],
        commonError: "Multiplying by π instead of dividing when working backwards from a circumference.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "When the wheel turns once, how far does it roll? Which measurement of the circle is that?",
          "So the circumference is 100 cm. Write {{pi d = 100}}.",
          "Undo the × π: divide 100 by π.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "circles-p3-q07",
        question:
          "For the Mid-Autumn Festival, Zara decorates a round paper lantern with a diameter of 25 cm. She wraps a ribbon once around its widest part, with the two ends overlapping by 2 cm. How long must the ribbon be? Give your answer in cm, to 1 decimal place.",
        answer: { type: "number", value: 80.5, allowFraction: false, display: "80.5 cm" },
        traps: [
          {
            spec: { type: "number", value: 159.1 },
            feedback: "You used {{2 pi * 25}}, but 25 cm is the diameter. Use {{C = pi d}}.",
          },
          {
            spec: { type: "number", value: 78.5 },
            feedback: "That's just the distance round the lantern. Don't forget the 2 cm overlap.",
          },
        ],
        solution: [
          "The ribbon goes once round the lantern's widest circle: that's a circumference.",
          "{{C = pi d = pi * 25 = 78.53…}} cm.",
          "Add the overlap: 78.53… + 2 = 80.53… cm.",
          "To 1 decimal place: 80.5 cm.",
        ],
        commonError: "Forgetting the overlap, or using {{2 pi r}} with the diameter.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "The ribbon goes once round the lantern. Which circle measurement is that?",
          "Find {{pi * 25}}, then think about the overlap.",
          "Add the 2 cm before you round.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "circles-p3-q08",
        question:
          "Arjun wants to estimate π without wrapping string round anything. He marks a point on the edge of a can of tomato soup, which has a diameter of 8.0 cm. He rolls the can in a straight line along the floor for exactly 5 complete turns, and it travels 125.6 cm.\n\n(a) Use his results to estimate π. Show your working.\n\n(b) His sister says rolling it for just 1 turn would be simpler. Explain why rolling 5 turns gives a more reliable estimate.",
        marks: 3,
        modelAnswer:
          "(a) In one turn, the can rolls exactly one circumference. So one circumference is 125.6 ÷ 5 = 25.12 cm, and π ≈ C ÷ d = 25.12 ÷ 8.0 = 3.14.\n\n(b) Every measurement has a small error, for example 0.5 cm when reading the tape measure. Over 5 turns that error is shared between 5 circumferences, so each circumference is only out by about 0.1 cm instead of 0.5 cm. The estimate of π is about 5 times more accurate. (A long distance is also easier to measure precisely than a short one.)",
        markScheme: [
          {
            point: "One turn rolls one circumference: 125.6 ÷ 5 = 25.12 cm",
            keywords: ["25.12", "÷ 5", "/5", "one turn", "circumference"],
          },
          { point: "π ≈ 25.12 ÷ 8 = 3.14", keywords: ["3.14", "÷ 8", "/8"] },
          {
            point: "Explains that the measuring error is shared over 5 turns, so it is about 5 times smaller per turn",
            keywords: ["error", "accurate", "5 times", "shared", "spread", "divided", "smaller"],
          },
        ],
        commonError: "Dividing 125.6 by 8 without first dividing by the 5 turns, which gives about 15.7: five times too big.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "How far does the can travel in ONE complete turn? Which measurement of the circle is that?",
          "Divide the total distance by the number of turns, then use π = C ÷ d.",
          "Suppose the tape-measure reading is out by 0.5 cm. How much does that affect one circumference once you divide by 5?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q09",
        question:
          "Ravi's bike computer counts how many times his front wheel turns and works out the distance from that. It is set for a wheel of diameter 70 cm, but Ravi has fitted a smaller wheel, of diameter 66 cm. After a ride, the computer shows 21.0 km. How far did Ravi really ride? Give your answer in km, to 1 decimal place.",
        answer: { type: "number", value: 19.8, allowFraction: false, display: "19.8 km" },
        traps: [
          {
            spec: { type: "number", value: 22.3 },
            feedback:
              "That's 21 × 70 ÷ 66, the wrong way round. The real wheel is smaller, so each turn moves the bike *less* far than the computer thinks.",
          },
          {
            spec: { type: "number", value: 21 },
            feedback:
              "The computer counts turns, but each turn of the real wheel covers {{pi * 66}} cm, not {{pi * 70}} cm. So the true distance is different.",
          },
        ],
        solution: [
          "The computer counts turns. For each turn it adds {{pi * 70}} cm, but the bike really moves {{pi * 66}} cm.",
          "So the true distance is {{(pi * 66)/(pi * 70) = 66/70}} of the displayed distance. The π cancels!",
          "{{66/70 * 21.0 = 19.8}} km.",
        ],
        solutions: [
          {
            label: "Count the turns",
            steps: [
              "Turns = 21 000 m ÷ ({{pi * 0.70}} m) = 9549.2…",
              "True distance = 9549.2… × ({{pi * 0.66}} m) = 19 800 m = 19.8 km.",
              "Same answer, but the ratio method avoids the big numbers.",
            ],
          },
        ],
        commonError: "Using the ratio upside down, which makes the true distance bigger than the display.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "What does the computer actually count?",
          "For one turn, how far does the computer think the bike moved, and how far did it really move?",
          "The true distance is {{66/70}} of the displayed distance.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q10",
        question:
          "Arjun is sowing grass seed on a circular lawn of diameter 9 m in a community garden. One box of seed covers 15 m² and costs $12.90. Boxes are only sold whole. How much does Arjun spend on seed? Give your answer in dollars.",
        answer: { type: "number", value: 64.5, display: "$64.50" },
        traps: [
          {
            spec: { type: "number", value: 51.6 },
            feedback:
              "4 boxes cover only 60 m², but the lawn is about 63.6 m². When you buy enough to cover something, round **up**: he needs 5 boxes.",
          },
          {
            spec: { type: "number", value: 219.3 },
            feedback:
              "You used the diameter in {{pi r^2}}, which makes the area 4 times too big. The radius is 4.5 m.",
          },
        ],
        solution: [
          "Radius = 9 ÷ 2 = 4.5 m.",
          "Area = {{pi * 4.5^2 = 20.25 pi = 63.61…}} m².",
          "Boxes: 63.61… ÷ 15 = 4.24…, so 4 boxes are not enough. He needs 5.",
          "Cost: 5 × $12.90 = $64.50.",
        ],
        commonError: "Rounding 4.24 boxes down to 4, which leaves part of the lawn bare.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "First find the area of the lawn. What is the radius?",
          "Area {{= pi * 4.5^2}}. How many 15 m² boxes does that need?",
          "4.24 boxes means 4 is not quite enough. Round up, then find the cost.",
        ],
      },
      {
        kind: "written",
        id: "circles-p3-q11",
        question:
          "For a CCA party, Siti can buy **either** one round cake of diameter 24 cm **or** two round cakes, each of diameter 16 cm. All the cakes are the same height, and both options cost the same.\n\nSiti thinks the two cakes must give more cake, because 16 + 16 = 32 cm is more than 24 cm. Is she right? Show your working.",
        marks: 3,
        modelAnswer:
          "The cakes are the same height, so compare the areas of their tops.\n\nOne large cake: radius 12 cm, area {{pi * 12^2 = 144 pi ~= 452}} cm².\n\nTwo small cakes: radius 8 cm, total area {{2 * pi * 8^2 = 128 pi ~= 402}} cm².\n\n144π is more than 128π, so Siti is wrong: the one large cake gives more cake (about 50 cm² more top area). Adding diameters doesn't work, because area depends on the radius *squared*.",
        markScheme: [
          {
            point: "Area of the large cake's top: 144π or about 452 cm² (radius 12 cm)",
            keywords: ["144", "452", "radius 12", "r = 12"],
          },
          {
            point: "Total area of the two small tops: 128π or about 402 cm² (radius 8 cm)",
            keywords: ["128", "402", "64", "201"],
          },
          {
            point: "Correct conclusion: Siti is wrong, the one large cake gives more cake",
            keywords: ["wrong", "not right", "one cake", "large cake", "big cake", "more cake"],
          },
        ],
        commonError: "Comparing diameters (or circumferences) instead of areas.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "The heights are the same, so what do you need to compare?",
          "Find the radius of each cake, then the area of each top.",
          "Compare {{pi * 12^2}} with {{2 * pi * 8^2}}. You can even compare 144 with 128 and leave π out.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q12",
        question:
          "A sprinkler stands at the middle of one straight edge of a lawn. It sprays water up to 5 m away and turns through 180°, so it waters a semicircle. What area of lawn does it water? Give your answer in m², to 1 decimal place.",
        answer: { type: "number", value: 39.3, allowFraction: false, display: "39.3 m²" },
        traps: [
          {
            spec: { type: "number", value: 78.5 },
            feedback: "That's a full circle. The sprinkler only turns through 180°, half of a full turn.",
          },
          {
            spec: { type: "number", value: 15.7 },
            feedback:
              "That's the length of the curved edge, half of the circumference. The question asks for an area: use {{pi r^2}}.",
          },
        ],
        solution: [
          "180° is half a turn, so the watered region is a semicircle of radius 5 m.",
          "Full circle: {{pi * 5^2 = 25 pi}} m².",
          "Half of it: {{1/2 * 25 pi = 12.5 pi = 39.26…}} m².",
          "To 1 decimal place: 39.3 m².",
        ],
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "What fraction of a full circle does a 180° turn cover?",
          "Find the area of the full circle of radius 5 m first.",
          "Take half of {{25 pi}}.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q13",
        question:
          "Hana's grandparents have a square lawn of side 10 m. It has a circular flowerbed of diameter 4 m in the middle and a quarter-circle pond of radius 3 m in one corner, as shown. Grass covers the rest. Find the area of grass, in m², to 3 significant figures.",
        diagram: `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square lawn of side 10 m. In the middle is a circular flowerbed of diameter 4 m. In the bottom-left corner is a quarter-circle pond of radius 3 m."><rect width="300" height="230" fill="#ffffff"/><rect x="60" y="20" width="180" height="180" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><circle cx="150" cy="110" r="36" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><line x1="114" y1="110" x2="186" y2="110" stroke="#334155" stroke-width="1.2"/><text x="150" y="104" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 m</text><text x="150" y="162" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">flowerbed</text><path d="M60,200 L60,146 A54,54 0 0,1 114,200 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><line x1="60" y1="200" x2="98.18" y2="161.82" stroke="#334155" stroke-width="1.2"/><text x="82" y="195" font-size="11" font-family="sans-serif" fill="#1f2937">3 m</text><text x="64" y="140" font-size="11" font-family="sans-serif" fill="#1f2937">pond</text><text x="150" y="218" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 m</text><text x="52" y="114" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">10 m</text></svg>`,
        answer: { type: "number", value: 80.4, allowFraction: false, display: "80.4 m²" },
        traps: [
          {
            spec: { type: "number", value: 42.7 },
            feedback: "You used the flowerbed's diameter, 4 m, as its radius. Its radius is 2 m.",
          },
          {
            spec: { type: "number", value: 59.2 },
            feedback: "The pond is only a **quarter** of a circle of radius 3 m, not a whole circle.",
          },
        ],
        solution: [
          "Square lawn: 10 × 10 = 100 m².",
          "Flowerbed: radius 2 m, area {{pi * 2^2 = 4 pi}} m².",
          "Pond: {{1/4 * pi * 3^2 = 2.25 pi}} m².",
          "Grass = {{100 - 4 pi - 2.25 pi = 100 - 6.25 pi = 80.36…}} m².",
          "To 3 significant figures: 80.4 m².",
        ],
        commonError: "Using the flowerbed's diameter as its radius, or treating the pond as a whole circle.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Start with the whole square, then take away the parts that are not grass.",
          "Find the area of the flowerbed (diameter or radius?) and of the quarter-circle pond.",
          "Grass = 100 − flowerbed − pond. Keep π exact until the end.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q14",
        question:
          "Mei wants a round rug that covers at least 5 m² of floor. The shop sells round rugs with diameters of 2.2 m, 2.4 m, 2.6 m and 2.8 m. What is the smallest diameter she can buy? Give your answer in metres.",
        answer: { type: "number", value: 2.6, display: "2.6 m" },
        traps: [
          {
            spec: { type: "number", value: 2.4 },
            feedback: "A 2.4 m rug has radius 1.2 m and covers {{pi * 1.2^2 ~= 4.52}} m², which is less than 5 m².",
          },
          {
            spec: { type: "number", value: 2.52 },
            feedback:
              "2.52 m is the exact diameter for 5 m², but the shop only sells the sizes listed. Choose the smallest one that is big enough.",
          },
        ],
        solution: [
          "Work backwards: {{pi r^2 = 5}}, so {{r^2 = 5/pi = 1.59…}} and r = 1.26… m.",
          "So the diameter must be at least 2.52… m.",
          "2.4 m is too small. The smallest size that is big enough is 2.6 m.",
          "Check: a 2.6 m rug covers {{pi * 1.3^2 ~= 5.31}} m². ✓",
        ],
        solutions: [
          {
            label: "Test the sizes",
            steps: [
              "2.2 m: {{pi * 1.1^2 ~= 3.80}} m². Too small.",
              "2.4 m: {{pi * 1.2^2 ~= 4.52}} m². Too small.",
              "2.6 m: {{pi * 1.3^2 ~= 5.31}} m². Big enough, so the answer is 2.6 m.",
              "Testing is quick here because there are only four sizes; working backwards works for any list.",
            ],
          },
        ],
        commonError: "Forgetting to halve each diameter before using {{pi r^2}}.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "For each rug, what is the radius?",
          "Either test each size with {{pi r^2}}, or work backwards from {{pi r^2 = 5}}.",
          "She needs at least 5 m², so go UP to the next size on the list.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "circles-p3-q15",
        question:
          "Aisha's school has a flowerbed shaped like a rectangle 6 m long and 4 m wide, with a semicircle on one of its 4 m ends, as shown. The school has 23 m of plastic edging. Is that enough to go all the way round the outside of the flowerbed? Show your working.",
        diagram: `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flowerbed made of a rectangle 6 m long and 4 m wide with a semicircle on its right-hand 4 m end. A dashed line shows where the semicircle joins the rectangle."><rect width="340" height="220" fill="#ffffff"/><path d="M240,50 L60,50 L60,170 L240,170 A60,60 0 0,0 240,50 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="50" x2="240" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="150" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 m</text><text x="52" y="115" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 m</text></svg>`,
        marks: 3,
        modelAnswer:
          "The curved edge is half the circumference of a circle with diameter 4 m: {{1/2 * pi * 4 = 2 pi ~= 6.28}} m.\n\nThe straight edges on the outside are 6 + 6 + 4 = 16 m. The dashed 4 m line where the semicircle joins the rectangle is inside the shape, so it is not part of the perimeter.\n\nPerimeter = 16 + 6.28 = 22.28 m, about 22.3 m.\n\nYes, 23 m of edging is enough, with about 0.7 m to spare.",
        markScheme: [
          { point: "Curved edge = half of π × 4 = 2π ≈ 6.28 m", keywords: ["6.28", "2π", "2pi", "6.3"] },
          {
            point: "Adds only the outside straight edges (16 m), giving a perimeter of about 22.3 m",
            keywords: ["22.3", "22.28", "16"],
          },
          { point: "Conclusion: yes, 23 m is enough, with about 0.7 m spare", keywords: ["yes", "enough", "0.7", "0.72", "spare"] },
        ],
        commonError: "Including the dashed join line, which gives 26.3 m and the wrong conclusion.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Trace the outside edge with your finger. Which edges do you pass?",
          "The curved part is half the circumference of a circle with diameter 4 m.",
          "Don't count the dashed line: it's inside the shape.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p3-q16",
        question:
          "A playground swing hangs on chains 2.5 m long. When it swings from one side to the other, the chains turn through an angle of 72°. How far does the seat travel in one swing from one side to the other? Give your answer in metres, to 2 decimal places.",
        answer: { type: "number", value: 3.14, allowFraction: false, display: "3.14 m" },
        traps: [
          {
            spec: { type: "number", value: 1.57 },
            feedback: "You used 2.5 m as a diameter. The chain is a radius: the seat moves round a circle of radius 2.5 m.",
          },
          {
            spec: { type: "number", value: 3.93 },
            feedback: "That's the area swept out by the chains, in m². The seat travels a length: use the circumference.",
          },
        ],
        solution: [
          "The seat moves along an arc of a circle with radius 2.5 m.",
          "72° is {{72/360 = 1/5}} of a full turn.",
          "Full circumference: {{2 pi * 2.5 = 5 pi}} m.",
          "Arc: {{1/5 * 5 pi = pi = 3.14159…}} m, so 3.14 m.",
          "A neat surprise: the seat travels exactly π metres!",
        ],
        difficulty: "core",
        guideRef: "arcs-sectors",
        hints: [
          "The seat moves along part of a circle. What is that circle's radius?",
          "What fraction of a full turn is 72°?",
          "Find {{1/5}} of {{2 pi * 2.5}}.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q17",
        question:
          "On Jun's bicycle, the chain goes round a front gear wheel of diameter 20 cm, turned by the pedals, and a back gear wheel of diameter 8 cm, fixed to the back wheel. The back wheel has a diameter of 66 cm. How far does the bicycle travel for one complete turn of the pedals? Give your answer in metres, to 2 decimal places.",
        answer: { type: "number", value: 5.18, allowFraction: false, display: "5.18 m" },
        traps: [
          {
            spec: { type: "number", value: 2.07 },
            feedback:
              "That's one turn of the back wheel. But one turn of the pedals pulls enough chain to turn the small back gear more than once.",
          },
          {
            spec: { type: "number", value: 518, tolerance: 1 },
            feedback: "Your working is right, but that's in centimetres. The question asks for metres: divide by 100.",
          },
        ],
        solution: [
          "One turn of the pedals pulls the chain once round the front gear: {{pi * 20 = 20 pi}} cm of chain.",
          "The same length of chain goes round the back gear, whose circumference is {{8 pi}} cm. So the back gear turns {{(20 pi)/(8 pi) = 2.5}} times.",
          "The back wheel is fixed to the back gear, so it also turns 2.5 times.",
          "Distance: {{2.5 * pi * 66 = 165 pi = 518.3…}} cm, which is 5.18 m.",
        ],
        commonError: "Assuming the back wheel turns once for each turn of the pedals.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "When the pedals turn once, how much chain passes round the front gear?",
          "That same length of chain goes round the back gear. How many turns of the back gear is that?",
          "The back wheel turns as often as the back gear. Multiply by the wheel's circumference.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p3-q18",
        question:
          "A round table of diameter 1.2 m is pushed into the corner of a room so that it touches both walls, as shown in the view from above. Find the area of the shaded part of the floor, between the table and the corner. Give your answer in cm², to the nearest cm².",
        diagram: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="View from above of the corner of a room. A round table of diameter 1.2 m touches both walls. The small region of floor between the table and the corner is shaded."><rect width="300" height="220" fill="#ffffff"/><path d="M30,30 L102,30 A72,72 0 0,0 30,102 Z" fill="#fecaca" stroke="#1f2937" stroke-width="1.5"/><circle cx="102" cy="102" r="72" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="30" x2="280" y2="30" stroke="#334155" stroke-width="5"/><line x1="30" y1="30" x2="30" y2="210" stroke="#334155" stroke-width="5"/><text x="102" y="100" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">table</text><text x="102" y="116" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">diameter 1.2 m</text><text x="220" y="22" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">wall</text><text x="38" y="204" font-size="12" font-family="sans-serif" fill="#1f2937">wall</text></svg>`,
        answer: { type: "number", value: 773, display: "773 cm²" },
        traps: [
          {
            spec: { type: "number", value: 3090 },
            feedback: "You used 1.2 m (120 cm) as the radius. The radius is half of that: 60 cm.",
          },
          {
            spec: { type: "number", value: 2827 },
            feedback: "That's the quarter of the table nearest the corner. The shaded part is the floor *outside* the table.",
          },
        ],
        solution: [
          "Work in cm: the radius is 60 cm.",
          "The table touches each wall, so its centre is exactly 60 cm from each wall. The centre, the two touching points and the corner make a 60 cm by 60 cm square.",
          "Square: 60 × 60 = 3600 cm².",
          "The part of the table inside that square is a quarter circle: {{1/4 * pi * 60^2 = 900 pi = 2827.4…}} cm².",
          "Shaded = 3600 − 2827.4… = 772.56… cm², which is 773 cm² to the nearest cm².",
        ],
        commonError: "Not spotting the hidden square, or mixing metres and centimetres.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Draw the radii from the centre of the table to the two points where it touches the walls. What shape do they make with the walls?",
          "The centre is 60 cm from each wall, so you get a 60 cm by 60 cm square.",
          "Shaded part = square − quarter circle.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p3-q19",
        question:
          "A car's windscreen wiper arm turns about a pivot through an angle of 120°. The rubber blade lies along the arm, from 15 cm to 60 cm away from the pivot, as shown. What area of windscreen does the blade wipe? Give your answer in cm², to 3 significant figures.",
        diagram: `<svg viewBox="0 0 400 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A wiper arm turns about a pivot through 120 degrees. The blade covers the part of the arm from 15 cm to 60 cm from the pivot, so the wiped region is a 120 degree sector of radius 60 cm with a 120 degree sector of radius 15 cm missing next to the pivot."><rect width="400" height="235" fill="#ffffff"/><path d="M70.1,135 A150,150 0 0,1 329.9,135 L232.48,191.25 A37.5,37.5 0 0,0 167.52,191.25 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="200" y1="210" x2="167.52" y2="191.25" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><line x1="200" y1="210" x2="232.48" y2="191.25" stroke="#334155" stroke-width="2.5"/><line x1="232.48" y1="191.25" x2="329.9" y2="135" stroke="#1f2937" stroke-width="5"/><path d="M187.88,203 A14,14 0 0,1 212.12,203" fill="none" stroke="#334155" stroke-width="1.2"/><circle cx="200" cy="210" r="4" fill="#1f2937"/><text x="200" y="188" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">120°</text><text x="294" y="184" font-size="12" font-family="sans-serif" fill="#1f2937">blade</text><text x="222" y="222" font-size="11" font-family="sans-serif" fill="#1f2937">15 cm</text><text x="126" y="188" font-size="11" font-family="sans-serif" text-anchor="end" fill="#1f2937">60 cm</text><text x="200" y="228" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">pivot</text></svg>`,
        answer: { type: "number", value: 3530, allowFraction: false, display: "3530 cm²" },
        traps: [
          {
            spec: { type: "number", value: 3770 },
            feedback:
              "That's the whole 120° sector of radius 60 cm. The blade doesn't reach the part within 15 cm of the pivot, so take that away.",
          },
          {
            spec: { type: "number", value: 3534, tolerance: 0.6 },
            feedback: "Your working is right. Now round to 3 significant figures, as the question asks.",
          },
        ],
        solution: [
          "120° is {{120/360 = 1/3}} of a full turn.",
          "Big sector, radius 60 cm: {{1/3 * pi * 60^2 = 1200 pi}} cm².",
          "Small sector the blade misses, radius 15 cm: {{1/3 * pi * 15^2 = 75 pi}} cm².",
          "Wiped area: {{1200 pi - 75 pi = 1125 pi = 3534.2…}} cm².",
          "To 3 significant figures: 3530 cm².",
        ],
        commonError: "Forgetting the unwiped part near the pivot, or working out {{pi(60 - 15)^2}}.",
        difficulty: "challenge",
        guideRef: "arcs-sectors",
        hints: [
          "What fraction of a full circle does a 120° sweep cover?",
          "The wiped region is a big sector with a small sector missing near the pivot.",
          "Find {{1/3}} of {{pi * 60^2}} and {{1/3}} of {{pi * 15^2}}, then subtract.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "circles-p3-q20",
        question:
          "A drawing of a tree trunk's cross-section shows a central disc of radius 1 cm, surrounded by rings that are each exactly 1 cm wide.\n\n(a) Find the area of the central disc and of each of the first three rings, in terms of π. What pattern do you notice?\n\n(b) Show that the ring between radius n cm and radius n + 1 cm has area {{(2n + 1) pi}} cm².\n\n(c) Use the drawing to explain why 1 + 3 + 5 + … + 19 = 100.",
        marks: 4,
        modelAnswer:
          "(a) Central disc: {{pi * 1^2 = pi}}. Ring 1 (radius 1 to 2): {{4 pi - pi = 3 pi}}. Ring 2 (radius 2 to 3): {{9 pi - 4 pi = 5 pi}}. Ring 3 (radius 3 to 4): {{16 pi - 9 pi = 7 pi}}. The areas are π times the odd numbers 1, 3, 5, 7, …\n\n(b) Ring area {{= pi (n + 1)^2 - pi n^2 = pi (n^2 + 2n + 1 - n^2) = (2n + 1) pi}} cm².\n\n(c) The disc and the first 9 rings fill a circle of radius 10 cm, whose area is {{100 pi}}. Their areas are {{pi + 3 pi + 5 pi + … + 19 pi}}. So {{(1 + 3 + 5 + … + 19) pi = 100 pi}}, and dividing by π gives 1 + 3 + 5 + … + 19 = 100.",
        markScheme: [
          {
            point: "Finds π, 3π, 5π, 7π and notices the odd numbers",
            keywords: ["3π", "5π", "7π", "3pi", "5pi", "7pi", "odd"],
          },
          {
            point: "Shows π(n + 1)² − πn² = (2n + 1)π",
            keywords: ["(n + 1)²", "(n+1)^2", "n² + 2n + 1", "n^2 + 2n + 1", "2n + 1", "2n+1"],
          },
          {
            point: "Explains that the disc and 9 rings make a circle of radius 10 cm, area 100π",
            keywords: ["radius 10", "100π", "100pi", "whole circle", "10²", "10^2"],
          },
          { point: "Divides by π to get 1 + 3 + … + 19 = 100", keywords: ["divide", "÷ π", "/π", "= 100", "sum"] },
        ],
        commonError: "Thinking every ring has the same area because each is 1 cm wide. Outer rings are longer, so they have more area.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "Each ring is a big circle with a smaller circle removed. Ring 1 is {{pi * 2^2 - pi * 1^2}}.",
          "For (b), the ring lies between radius n and radius n + 1. Expand {{(n + 1)^2}}.",
          "For (c), the disc and the rings have areas 1π, 3π, …, 19π. What circle do they fill together?",
        ],
        strategy: "Find a pattern",
      },
    ],
  },

  // ==========================================================================
  // PRACTICE PAPER 4 — exam style
  // ==========================================================================
  {
    id: "circles-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "circles-p4-q01",
        question:
          "In the diagram, O is the centre of the circle and the line PQ touches the circle at T. Which line segment is a **chord** that is **not** a diameter? (Type its two letters, like XY.)",
        diagram: `<svg viewBox="0 0 320 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre O. A line PQ touches the circle at T at the top. Segment OA goes from the centre to the circle. Segment BC passes through O with both ends on the circle. Segment DE joins two points on the upper left of the circle and does not pass through O."><rect width="320" height="230" fill="#ffffff"/><circle cx="160" cy="130" r="80" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="80" y1="50" x2="240" y2="50" stroke="#1f2937" stroke-width="2"/><line x1="84.82" y1="157.36" x2="235.18" y2="102.64" stroke="#1f2937" stroke-width="2"/><line x1="160" y1="130" x2="200" y2="199.28" stroke="#1f2937" stroke-width="2"/><line x1="108.58" y1="68.72" x2="80.3" y2="123.03" stroke="#1f2937" stroke-width="2"/><circle cx="160" cy="130" r="3" fill="#1f2937"/><circle cx="160" cy="50" r="3" fill="#1f2937"/><circle cx="84.82" cy="157.36" r="3" fill="#1f2937"/><circle cx="235.18" cy="102.64" r="3" fill="#1f2937"/><circle cx="200" cy="199.28" r="3" fill="#1f2937"/><circle cx="108.58" cy="68.72" r="3" fill="#1f2937"/><circle cx="80.3" cy="123.03" r="3" fill="#1f2937"/><text x="154" y="124" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">O</text><text x="72" y="55" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">P</text><text x="248" y="55" font-size="13" font-family="sans-serif" fill="#1f2937">Q</text><text x="160" y="42" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">T</text><text x="74" y="168" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">B</text><text x="244" y="100" font-size="13" font-family="sans-serif" fill="#1f2937">C</text><text x="207" y="215" font-size="13" font-family="sans-serif" fill="#1f2937">A</text><text x="100" y="64" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">D</text><text x="70" y="127" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">E</text></svg>`,
        answer: { type: "text", accept: ["DE", "ED", "chord DE", "chord ED"], display: "DE" },
        traps: [
          {
            spec: { type: "text", accept: ["BC", "CB"] },
            feedback:
              "BC passes through the centre O, so it is a diameter. A diameter is a special chord, but the question asks for one that is **not** a diameter.",
          },
          {
            spec: { type: "text", accept: ["PQ", "QP", "PT", "TP", "TQ", "QT"] },
            feedback: "PQ touches the circle at only one point, T: it is a **tangent**, not a chord. A chord joins two points on the circle.",
          },
        ],
        solution: [
          "A **chord** is a straight line joining two points on the circle.",
          "BC joins two points on the circle but passes through O, so it is a diameter.",
          "OA goes from the centre to the circle, so it is a radius. PQ touches the circle at one point, so it is a tangent.",
          "DE joins two points on the circle and misses O, so the answer is DE.",
        ],
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["A chord joins two points on the circle. Which segments do that?", "Of those, which one passes through the centre O?"],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "circles-p4-q02",
        question:
          "A circular badge has a radius of 6.5 cm. A gold border runs once round its edge. Find the length of the border in cm, in terms of π. (Type it like 5π or 5pi, with no units.)",
        answer: { type: "expression", expr: "13pi", display: "{{13 pi}} cm" },
        traps: [
          { spec: { type: "expression", expr: "6.5pi" }, feedback: "{{pi r}} is only half of the circumference. Use {{C = 2 pi r}}." },
          { spec: { type: "expression", expr: "42.25pi" }, feedback: "That's {{pi r^2}}, the area. The border is the circumference, {{2 pi r}}." },
        ],
        solution: ["The border is the circumference. A radius is given, so use {{C = 2 pi r}}.", "{{C = 2 * pi * 6.5 = 13 pi}} cm."],
        difficulty: "warmup",
        guideRef: "circumference",
        hints: ["Which circumference formula uses the radius?", "{{C = 2 pi r}}: multiply 2 by 6.5 and keep the π."],
      },
      {
        kind: "short",
        id: "circles-p4-q03",
        question:
          "A round floor cushion has a diameter of 45 cm. Find the area of its top surface in cm², correct to 3 significant figures.",
        answer: { type: "number", value: 1590, allowFraction: false, display: "1590 cm²" },
        traps: [
          { spec: { type: "number", value: 6360 }, feedback: "You used 45 cm as the radius. Halve the diameter first: r = 22.5 cm." },
          { spec: { type: "number", value: 141 }, feedback: "That's the circumference, {{pi * 45}}. The question asks for the area." },
        ],
        solution: [
          "Radius = 45 ÷ 2 = 22.5 cm.",
          "{{A = pi * 22.5^2 = 506.25 pi = 1590.43…}} cm².",
          "To 3 significant figures: 1590 cm².",
        ],
        commonError: "Giving 1590.4 (that's 5 significant figures), or using the diameter in {{pi r^2}}.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["Area uses the radius. What is it?", "Square 22.5 first, then multiply by π. Round to 3 significant figures at the end."],
      },
      {
        kind: "short",
        id: "circles-p4-q04",
        question:
          "Over 2000 years ago, Archimedes proved that π lies between {{223/71}} and {{22/7}}. Work out {{22/7 - 223/71}}. Give your answer as a fraction in its simplest form.",
        answer: { type: "fraction", n: 1, d: 497, simplest: true, display: "{{1/497}}" },
        traps: [
          {
            spec: { type: "fraction", n: 201, d: 64 },
            feedback: "You subtracted the tops and the bottoms separately. Use a common denominator: 7 × 71 = 497.",
          },
        ],
        solution: [
          "A common denominator is 7 × 71 = 497.",
          "{{22/7 = (22 * 71)/497 = 1562/497}}.",
          "{{223/71 = (223 * 7)/497 = 1561/497}}.",
          "{{1562/497 - 1561/497 = 1/497}}.",
          "So Archimedes trapped π in a gap of only about 0.002: π = 3.14159… lies between 3.1408… and 3.1428…",
        ],
        commonError: "Subtracting the numerators and the denominators separately.",
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["To subtract fractions you need a common denominator. Try 7 × 71.", "Work out 22 × 71 and 223 × 7."],
      },
      {
        kind: "short",
        id: "circles-p4-q05",
        question:
          "A semicircle has a diameter of 20 cm. Find (a) its area in cm² and (b) its perimeter in cm. Give both answers to 1 decimal place. Type (a) first, then (b), separated by a comma.",
        answer: { type: "list", values: [157.1, 51.4], ordered: true, tolerance: 0.05, display: "157.1 cm², 51.4 cm" },
        traps: [
          {
            spec: { type: "list", values: [157.1, 31.4], ordered: true, tolerance: 0.05 },
            feedback: "Your perimeter is only the curved part. The perimeter also includes the straight edge: the 20 cm diameter.",
          },
          {
            spec: { type: "list", values: [314.2, 51.4], ordered: true, tolerance: 0.05 },
            feedback: "314.2 cm² is the area of the whole circle. A semicircle is half of it.",
          },
        ],
        solution: [
          "Radius = 10 cm.",
          "(a) Whole circle {{= pi * 10^2 = 100 pi}}, so the semicircle is {{50 pi = 157.07…}}, about 157.1 cm².",
          "(b) Curved edge = half of {{pi * 20}} = {{10 pi = 31.41…}} cm.",
          "Add the straight diameter: 31.41… + 20 = 51.41…, about 51.4 cm.",
        ],
        commonError: "Leaving the 20 cm diameter out of the perimeter.",
        difficulty: "warmup",
        guideRef: "semicircles-quarter-circles",
        hints: ["Find the radius first.", "Area: half of {{pi r^2}}. Perimeter: half the circumference PLUS the straight edge."],
      },
      {
        kind: "short",
        id: "circles-p4-q06",
        question:
          "Circle A has circumference {{12 pi}} cm and circle B has circumference {{18 pi}} cm. Find the ratio area of circle A : area of circle B. Give your answer in its simplest form.",
        answer: { type: "ratio", parts: [4, 9], simplest: true, display: "4 : 9" },
        traps: [
          {
            spec: { type: "ratio", parts: [2, 3] },
            feedback: "2 : 3 is the ratio of the radii (and of the circumferences). Area depends on r², so square both parts.",
          },
        ],
        solution: [
          "{{C = 2 pi r}}, so circle A has radius 6 cm and circle B has radius 9 cm.",
          "Areas: {{pi * 6^2 = 36 pi}} cm² and {{pi * 9^2 = 81 pi}} cm².",
          "Ratio 36π : 81π = 36 : 81 = 4 : 9 (divide both parts by 9).",
        ],
        solutions: [
          {
            label: "Scale factor",
            steps: [
              "Circle B is an enlargement of circle A with scale factor {{18/12 = 3/2}}.",
              "Areas scale by the square of the scale factor: {{(3/2)^2 = 9/4}}, so the ratio is 4 : 9.",
            ],
          },
        ],
        commonError: "Giving the ratio of the radii, 2 : 3, instead of the ratio of the areas.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Find each radius from {{C = 2 pi r}}.",
          "Work out each area, keeping π.",
          "The πs cancel in the ratio. Simplify 36 : 81.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "circles-p4-q07",
        question:
          "A protractor is a semicircle. Its perimeter (the curved edge plus the straight edge) is 25.7 cm. Find the diameter of the protractor, to the nearest cm.",
        answer: { type: "number", value: 10, display: "10 cm" },
        traps: [
          {
            spec: { type: "number", value: 16 },
            feedback: "You used only the curved edge. The perimeter also includes the straight edge, which is the diameter.",
          },
          { spec: { type: "number", value: 5 }, feedback: "That's the radius. The question asks for the diameter." },
        ],
        solution: [
          "Let the radius be r. The curved edge is {{pi r}} and the straight edge is {{2r}}.",
          "Perimeter: {{pi r + 2r = r(pi + 2) = 25.7}}.",
          "{{r = 25.7/(pi + 2) = 4.998…}} cm.",
          "Diameter = 2r = 9.99… cm, so 10 cm to the nearest cm.",
          "Check: {{pi * 5 + 10 = 25.7…}} cm. ✓",
        ],
        commonError: "Dividing 25.7 by π only, which forgets the straight edge.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Call the radius r. Write the curved edge and the straight edge in terms of r.",
          "Perimeter {{= pi r + 2r}}. Can you take out r as a common factor?",
          "{{r(pi + 2) = 25.7}}, so divide 25.7 by {{pi + 2}}.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "circles-p4-q08",
        question:
          "Ravi says: 'When the radius of a circle goes up by 1 cm, its area always goes up by the same amount, whatever size the circle was to begin with.' Is Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong.\n\nExample: radius 1 cm → 2 cm: the area goes from {{pi}} to {{4 pi}}, an increase of {{3 pi}} cm². Radius 10 cm → 11 cm: the area goes from {{100 pi}} to {{121 pi}}, an increase of {{21 pi}} cm². The increases are different.\n\nIn general, {{pi (r + 1)^2 - pi r^2 = pi (2r + 1)}}, which gets bigger as r gets bigger: a bigger circle gains a longer, bigger ring. (Ravi would be right about the circumference, which always goes up by {{2 pi}}.)",
        markScheme: [
          {
            point: "Two worked examples showing different increases (e.g. 3π and 21π)",
            keywords: ["3π", "21π", "3pi", "21pi", "increase", "different"],
          },
          { point: "States that Ravi is wrong", keywords: ["wrong", "no", "not right", "incorrect"] },
          {
            point: "General reason: the increase is π(2r + 1), which depends on r",
            keywords: ["2r + 1", "2r+1", "depends", "bigger", "larger", "r²"],
          },
        ],
        commonError: "Mixing this up with the circumference, which really does go up by the same amount ({{2 pi}}) every time.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Test it: work out the increase in area from radius 1 to 2, and from radius 10 to 11.",
          "In general, compare {{pi (r + 1)^2}} with {{pi r^2}}. Expand the bracket.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "circles-p4-q09",
        question:
          "The shape is made from a square of side 8 cm. A semicircle has been added on top, and an identical semicircle has been cut out of the bottom, as shown. Find the area of the shaded shape, in cm².",
        diagram: `<svg viewBox="0 0 290 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A shaded shape made from a square of side 8 cm with a semicircle of diameter 8 cm added on top and an identical semicircle cut out of the bottom. Dashed lines show the top and bottom sides of the original square."><rect width="290" height="240" fill="#ffffff"/><path d="M80,80 A64,64 0 0,1 208,80 L208,208 A64,64 0 0,0 80,208 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="80" y1="80" x2="208" y2="80" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="80" y1="208" x2="208" y2="208" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><text x="72" y="148" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">8 cm</text><text x="144" y="226" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text></svg>`,
        answer: { type: "number", value: 64, display: "64 cm²" },
        traps: [
          {
            spec: { type: "number", value: 89.1, tolerance: 0.1 },
            feedback: "You added the semicircle on top but didn't take away the one cut out of the bottom.",
          },
          {
            spec: { type: "number", value: 38.9, tolerance: 0.1 },
            feedback: "You took away the bottom semicircle but forgot to add the one on top.",
          },
        ],
        solution: [
          "Each semicircle has diameter 8 cm, so radius 4 cm and area {{1/2 * pi * 4^2 = 8 pi}} cm².",
          "Area = square + top semicircle − bottom semicircle = {{64 + 8 pi - 8 pi = 64}} cm².",
          "The bump exactly fills the bite, so the area is the same as the square's.",
        ],
        solutions: [
          {
            label: "Slide it (no calculation)",
            steps: [
              "Imagine sliding the top semicircle straight down by 8 cm.",
              "It fits exactly into the gap at the bottom, and the square is complete again: 8 × 8 = 64 cm². No π needed!",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Compare the piece added at the top with the piece removed from the bottom.",
          "Both are semicircles of diameter 8 cm. What happens to the area if you add one and remove an identical one?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "circles-p4-q10",
        question:
          "Copy and complete the table. Give A and B to the nearest whole number.\n\n| Wheel | Diameter (cm) | Circumference (cm) |\n|---|---|---|\n| Scooter wheel | 15 | A |\n| Wheelchair wheel | B | 190 |\n\nType A first, then B, separated by a comma.",
        answer: { type: "list", values: [47, 60], ordered: true, tolerance: 0.5, display: "A = 47, B = 60" },
        traps: [
          {
            spec: { type: "list", values: [94, 60], ordered: true, tolerance: 0.5 },
            feedback: "Check A: you used {{2 pi * 15}}, but 15 cm is the diameter. Use {{C = pi d}}.",
          },
          {
            spec: { type: "list", values: [47, 30], ordered: true, tolerance: 0.5 },
            feedback: "Check B: 30 cm is the radius, {{190/(2 pi)}}. The table asks for the diameter, {{190/pi}}.",
          },
        ],
        solution: [
          "A: the diameter is given, so {{C = pi d = pi * 15 = 47.12…}}, about 47 cm.",
          "B: work backwards: {{d = C/pi = 190/pi = 60.47…}}, about 60 cm.",
          "Sense check: each circumference is just over 3 times its diameter: 3 × 15 = 45 and 3 × 60 = 180. ✓",
        ],
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Which row needs C from d, and which needs d from C?",
          "For A use {{C = pi d}}. For B, undo it: {{d = C/pi}}.",
          "Round each value to the nearest whole number at the end.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "circles-p4-q11",
        question:
          "A condo swimming pool is a rectangle with a semicircle at each end, as shown. The pool is 20 m long overall and 8 m wide. Find the area of the surface of the pool, in m², to 3 significant figures.",
        diagram: `<svg viewBox="0 0 380 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pool shaped like a rectangle with a semicircle at each end. Its overall length, including both curved ends, is 20 m and its width is 8 m."><rect width="380" height="215" fill="#ffffff"/><path d="M96,44 L264,44 A56,56 0 0,1 264,156 L96,156 A56,56 0 0,1 96,44 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="100" x2="40" y2="179" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/><line x1="320" y1="100" x2="320" y2="179" stroke="#334155" stroke-width="1" stroke-dasharray="4 3"/><line x1="40" y1="185" x2="320" y2="185" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="179" x2="40" y2="191" stroke="#334155" stroke-width="1.5"/><line x1="320" y1="179" x2="320" y2="191" stroke="#334155" stroke-width="1.5"/><text x="180" y="204" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20 m</text><line x1="340" y1="44" x2="340" y2="156" stroke="#334155" stroke-width="1.5"/><line x1="334" y1="44" x2="346" y2="44" stroke="#334155" stroke-width="1.5"/><line x1="334" y1="156" x2="346" y2="156" stroke="#334155" stroke-width="1.5"/><text x="351" y="104" font-size="13" font-family="sans-serif" fill="#1f2937">8 m</text></svg>`,
        answer: { type: "number", value: 146, allowFraction: false, display: "146 m²" },
        traps: [
          {
            spec: { type: "number", value: 210 },
            feedback: "The 20 m includes the curved ends. The rectangle in the middle is only 20 − 4 − 4 = 12 m long.",
          },
          {
            spec: { type: "number", value: 121 },
            feedback: "There are two semicircular ends. Together they make one whole circle of radius 4 m.",
          },
        ],
        solution: [
          "Each end is a semicircle of diameter 8 m, so radius 4 m.",
          "Each curved end sticks out 4 m, so the rectangle in the middle is 20 − 4 − 4 = 12 m long: 12 × 8 = 96 m².",
          "The two semicircles make one whole circle: {{pi * 4^2 = 16 pi = 50.26…}} m².",
          "Total: 96 + 50.26… = 146.26… m², which is 146 m² to 3 significant figures.",
        ],
        commonError: "Using 20 m as the length of the rectangle.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "The overall 20 m includes the curved ends. How far does each end stick out?",
          "Each end sticks out by one radius, 4 m. So how long is the rectangle?",
          "Two semicircles make one circle of radius 4 m.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p4-q12",
        question:
          "A round vegetarian pizza has a diameter of 36 cm. It is cut from the centre into equal slices, and the crust on each slice is {{3 pi}} cm long. (a) How many slices are there? (b) What is the angle at the tip of each slice, in degrees? Type (a) first, then (b), separated by a comma.",
        answer: { type: "list", values: [12, 30], ordered: true, display: "12 slices, 30°" },
        traps: [
          {
            spec: { type: "list", values: [6, 60], ordered: true },
            feedback: "You found the circumference as {{pi * 18}}, using the radius. With a diameter of 36 cm, {{C = pi * 36 = 36 pi}}.",
          },
          {
            spec: { type: "list", values: [24, 15], ordered: true },
            feedback: "You used {{2 pi * 36}}, doubling a diameter. The circumference is {{pi d = 36 pi}}.",
          },
        ],
        solution: [
          "All the crusts together make the whole circumference: {{pi * 36 = 36 pi}} cm.",
          "Number of slices = {{(36 pi)/(3 pi) = 12}}.",
          "The 12 equal angles at the centre make 360°, so each is 360° ÷ 12 = 30°.",
        ],
        difficulty: "core",
        guideRef: "arcs-sectors",
        hints: [
          "All the crusts together make the whole circumference. What is it?",
          "How many lots of {{3 pi}} make {{36 pi}}?",
          "The equal angles at the centre add up to 360°.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "circles-p4-q13",
        question:
          "Jun was asked to find the area of a semicircle with diameter 18 cm. Here is his working:\n\n    Area = π × 18² ÷ 2\n    = 1017.87… ÷ 2\n    = 508.9 cm²\n\n(a) Explain the mistake Jun made.\n\n(b) Work out the correct area, to 1 decimal place.",
        marks: 3,
        modelAnswer:
          "(a) Jun used the diameter, 18 cm, in {{pi r^2}}, but the formula needs the radius, 18 ÷ 2 = 9 cm. Using the diameter makes the answer 4 times too big. A quick check shows 508.9 cm² is impossible: the semicircle fits inside an 18 cm × 9 cm rectangle, whose area is only 162 cm².\n\n(b) Area {{= 1/2 * pi * 9^2 = 40.5 pi = 127.23…}}, so the area is 127.2 cm² to 1 decimal place.",
        markScheme: [
          {
            point: "Explains that he used the diameter instead of the radius",
            keywords: ["diameter", "radius", "instead", "should be 9", "r = 9"],
          },
          { point: "Correct method: ½ × π × 9² (= 40.5π)", keywords: ["40.5", "9²", "9^2", "81π", "81pi", "254.5"] },
          { point: "Correct answer: 127.2 cm²", keywords: ["127.2", "127.23"] },
        ],
        commonError: "Saying the mistake was dividing by 2. Halving is right for a semicircle; the error is using the diameter.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "What does r stand for in {{pi r^2}}?",
          "Halve the diameter first, then square it.",
          "Find half of {{pi * 9^2}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "circles-p4-q14",
        question:
          "A square paving slab has sides of 50 cm. A round paving slab has exactly the same area. Find the diameter of the round slab, in cm, to 1 decimal place.",
        answer: { type: "number", value: 56.4, allowFraction: false, display: "56.4 cm" },
        traps: [
          { spec: { type: "number", value: 28.2 }, feedback: "That's the radius. Double it for the diameter." },
          {
            spec: { type: "number", value: 795.8 },
            feedback: "{{2500/pi = 795.7…}} is {{r^2}}. Take the square root to find r, then double it.",
          },
        ],
        solution: [
          "Area of the square: 50 × 50 = 2500 cm².",
          "{{pi r^2 = 2500}}, so {{r^2 = 2500/pi = 795.77…}}",
          "Square root: r = 28.209… cm.",
          "Diameter = 2r = 56.418… cm, which is 56.4 cm to 1 decimal place.",
          "Sense check: the round slab is wider than the square (56.4 cm against 50 cm). That makes sense, because a circle that fits inside a 50 cm square has less area than the square.",
        ],
        commonError: "Forgetting the square root, or stopping at the radius.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "First find the area of the square slab.",
          "Set {{pi r^2}} equal to that area and undo the operations: ÷ π, then square root.",
          "Remember the question asks for the diameter.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "circles-p4-q15",
        question:
          "A phone screen is a rectangle 15 cm by 7 cm, but its four corners are rounded: each corner is a quarter circle of radius 1 cm, as shown. Find the perimeter of the screen, in cm, to 1 decimal place.",
        diagram: `<svg viewBox="0 0 370 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle 15 cm by 7 cm whose four corners are rounded into quarter circles of radius 1 cm."><rect width="370" height="210" fill="#ffffff"/><rect x="40" y="30" width="270" height="126" rx="18" ry="18" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="58" cy="48" r="2" fill="#1f2937"/><line x1="58" y1="48" x2="45.27" y2="35.27" stroke="#1f2937" stroke-width="1.2"/><text x="66" y="58" font-size="11" font-family="sans-serif" fill="#1f2937">radius 1 cm</text><line x1="40" y1="176" x2="310" y2="176" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="170" x2="40" y2="182" stroke="#334155" stroke-width="1.5"/><line x1="310" y1="170" x2="310" y2="182" stroke="#334155" stroke-width="1.5"/><text x="175" y="196" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">15 cm</text><line x1="330" y1="30" x2="330" y2="156" stroke="#334155" stroke-width="1.5"/><line x1="324" y1="30" x2="336" y2="30" stroke="#334155" stroke-width="1.5"/><line x1="324" y1="156" x2="336" y2="156" stroke="#334155" stroke-width="1.5"/><text x="338" y="97" font-size="13" font-family="sans-serif" fill="#1f2937">7 cm</text></svg>`,
        answer: { type: "number", value: 42.3, allowFraction: false, display: "42.3 cm" },
        traps: [
          {
            spec: { type: "number", value: 44 },
            feedback:
              "44 cm is the perimeter of a sharp-cornered rectangle. Rounding the corners cuts 1 cm off each end of every straight edge and replaces the corners with arcs.",
          },
          {
            spec: { type: "number", value: 50.3 },
            feedback: "You added the four arcs but didn't shorten the straight edges. Each straight edge loses 1 cm at each end.",
          },
        ],
        solution: [
          "Each straight edge loses 1 cm at both ends: the long edges are 15 − 2 = 13 cm and the short edges are 7 − 2 = 5 cm.",
          "Straight parts: 2 × 13 + 2 × 5 = 36 cm.",
          "The four quarter-circle corners make one whole circle of radius 1 cm: {{2 pi * 1 = 2 pi = 6.28…}} cm.",
          "Perimeter: 36 + 6.28… = 42.28… cm, which is 42.3 cm to 1 decimal place.",
        ],
        commonError: "Adding the corner arcs without shortening the straight edges.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Split the edge into straight parts and curved corners.",
          "How long is each straight part once 1 cm is cut from each end?",
          "Put the four quarter circles together. What do they make?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "circles-p4-q16",
        question:
          "The diagram shows a square of side 8 cm. At each corner, a quarter circle of radius 4 cm is drawn, centred on that corner. Show that the area of the shaded region in the middle is {{16(4 - pi)}} cm².",
        diagram: `<svg viewBox="0 0 260 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 8 cm with a quarter circle of radius 4 cm at each corner. The quarter circles meet at the midpoints of the sides. The region in the middle, outside all four quarter circles, is shaded."><rect width="260" height="210" fill="#ffffff"/><rect x="50" y="20" width="160" height="160" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><path d="M50,20 L130,20 A80,80 0 0,1 50,100 Z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><path d="M210,20 L210,100 A80,80 0 0,1 130,20 Z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><path d="M210,180 L130,180 A80,80 0 0,1 210,100 Z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><path d="M50,180 L50,100 A80,80 0 0,1 130,180 Z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><text x="90" y="14" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="130" y="198" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text><text x="42" y="104" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">8 cm</text></svg>`,
        marks: 3,
        modelAnswer:
          "Area of the square = 8 × 8 = 64 cm².\n\nEach quarter circle has area {{1/4 * pi * 4^2 = 4 pi}} cm². The four quarter circles together make one whole circle of radius 4 cm: {{4 * 4 pi = 16 pi}} cm².\n\nShaded area {{= 64 - 16 pi}}. Taking out the common factor 16: {{64 - 16 pi = 16(4 - pi)}} cm², as required (about 13.7 cm²).",
        markScheme: [
          { point: "Area of the square is 64 cm²", keywords: ["64", "8 × 8", "8x8", "8²"] },
          {
            point: "The four quarter circles total 16π cm² (one whole circle of radius 4 cm)",
            keywords: ["16π", "16pi", "full circle", "one circle", "4π", "4pi"],
          },
          {
            point: "Writes 64 − 16π as 16(4 − π) by taking out the factor 16",
            keywords: ["64 − 16π", "64 - 16π", "64-16pi", "factor", "16(4"],
          },
        ],
        commonError: "Writing 64 − 16π = 48π. The 64 and the 16π are not like terms.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Shaded area = square − the four corner pieces.",
          "Fit the four quarter circles together. What do they make?",
          "You should get {{64 - 16 pi}}. What common factor can you take out?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "circles-p4-q17",
        question:
          "On a penny-farthing bicycle, the front wheel has a diameter of 1.5 m and the back wheel has a diameter of 0.5 m. On one ride, the back wheel makes 400 more complete turns than the front wheel. How far was the ride? Give your answer in metres, to the nearest metre.",
        answer: { type: "number", value: 942, display: "942 m" },
        traps: [
          {
            spec: { type: "number", value: 1885 },
            feedback: "400 is the *difference* between the numbers of turns, not the number of front-wheel turns.",
          },
          {
            spec: { type: "number", value: 628 },
            feedback: "400 is how many *more* turns the back wheel makes, not its total number of turns.",
          },
        ],
        solution: [
          "Both wheels travel the same distance.",
          "The back wheel's circumference ({{0.5 pi}} m) is a third of the front wheel's ({{1.5 pi}} m), so the back wheel turns 3 times for every 1 turn of the front wheel.",
          "So for each front-wheel turn, the back wheel makes 2 extra turns. 400 extra turns means 400 ÷ 2 = 200 front-wheel turns.",
          "Distance = {{200 * 1.5 pi = 300 pi = 942.4…}} m, which is 942 m.",
        ],
        solutions: [
          {
            label: "Introduce a variable",
            steps: [
              "Let the distance be D metres. Front turns {{= D/(1.5 pi)}}, back turns {{= D/(0.5 pi)}}.",
              "{{D/(0.5 pi) - D/(1.5 pi) = 400}}. Multiply every term by {{1.5 pi}}: {{3D - D = 600 pi}}.",
              "{{2D = 600 pi}}, so {{D = 300 pi ~= 942}} m.",
              "The ratio method is quicker; the algebra works even when the numbers are less friendly.",
            ],
          },
        ],
        commonError: "Treating 400 as the total number of turns of one wheel.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "Both wheels cover the same distance. How many times does the back wheel turn for each turn of the front wheel?",
          "The back wheel is a third of the size, so it turns 3 times as often. How many EXTRA turns is that per front-wheel turn?",
          "400 extra turns ÷ 2 extra per front turn = number of front-wheel turns. Then use the front circumference.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p4-q18",
        question:
          "Rectangle ABCD has AB = 4 cm, BC = 3 cm and diagonal AC = 5 cm. It stands on a line with AB along the line. It is rolled to the right without slipping: first it turns 90° about B, then 90° about the next corner on the line, and so on, until it has made four turns and is the right way up again. Find the total length of the path travelled by corner A. Give your answer in cm, in terms of π. (Type it like 5π or 5pi, with no units.)",
        diagram: `<svg viewBox="0 0 300 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle ABCD, 4 cm by 3 cm with diagonal AC 5 cm, stands on a line. A dashed outline shows it after its first quarter turn about corner B, and a dashed red arc shows corner A moving round B to its new position."><rect width="300" height="235" fill="#ffffff"/><line x1="15" y1="202" x2="290" y2="202" stroke="#334155" stroke-width="2"/><rect x="40" y="130" width="96" height="72" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="202" x2="136" y2="130" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><rect x="136" y="106" width="72" height="96" fill="none" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M40,202 A96,96 0 0,1 136,106" fill="none" stroke="#dc2626" stroke-width="2" stroke-dasharray="5 4"/><circle cx="40" cy="202" r="3.5" fill="#dc2626"/><circle cx="136" cy="106" r="3.5" fill="#dc2626"/><text x="40" y="220" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="136" y="220" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text><text x="142" y="146" font-size="13" font-family="sans-serif" fill="#1f2937">C</text><text x="34" y="128" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">D</text><text x="130" y="100" font-size="13" font-family="sans-serif" text-anchor="end" fill="#dc2626">A</text><text x="88" y="196" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="34" y="170" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">3 cm</text><text x="100" y="150" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5 cm</text><text x="20" y="100" font-size="11" font-family="sans-serif" fill="#dc2626">path of A</text></svg>`,
        answer: { type: "expression", expr: "6pi", display: "{{6 pi}} cm" },
        traps: [
          {
            spec: { type: "expression", expr: "10pi" },
            feedback:
              "Not every arc has radius 5 cm. Corner A's distance from the pivot changes from turn to turn: 4 cm, then 5 cm, then 3 cm, then 0 cm.",
          },
          {
            spec: { type: "number", value: 18.85, tolerance: 0.06 },
            feedback: "Right size! Now give the exact answer in terms of π.",
          },
        ],
        solution: [
          "In each 90° turn, corner A moves along a quarter circle centred on the pivot. Its radius is A's distance from that pivot.",
          "Turn 1, about B: radius AB = 4 cm. Arc {{= 1/4 * 2 pi * 4 = 2 pi}} cm.",
          "Turn 2, about C: radius AC = 5 cm. Arc {{= 1/4 * 2 pi * 5 = 5/2 pi}} cm.",
          "Turn 3, about D: radius AD = 3 cm. Arc {{= 1/4 * 2 pi * 3 = 3/2 pi}} cm.",
          "Turn 4, about A itself: A doesn't move.",
          "Total: {{2 pi + 5/2 pi + 3/2 pi = 6 pi}} cm (about 18.8 cm).",
        ],
        commonError: "Using the same radius for every turn, or forgetting that A stays still when it is the pivot.",
        difficulty: "challenge",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "During each 90° turn, the rectangle spins about one corner. What path does corner A follow?",
          "Each path is a quarter circle. Its radius is A's distance from the pivot. Which corners are the pivots, in order?",
          "The radii are AB, AC, AD and then 0. Add the four quarter-circle arcs.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "circles-p4-q19",
        question:
          "In a 200 m race, each runner runs round one semicircular bend and then along a straight. The straight is the same length in every lane, but the bends are not.\n\n| Lane | 1 | 2 | 3 | … | 6 |\n|---|---|---|---|---|---|\n| Radius of bend (m) | 36.5 | 37.7 | 38.9 | … | ? |\n\nTo make the race fair, how many metres further forward than the lane 1 runner must the lane 6 runner start? Give your answer to 2 decimal places.",
        answer: { type: "number", value: 18.85, allowFraction: false, display: "18.85 m" },
        traps: [
          {
            spec: { type: "number", value: 22.62, tolerance: 0.01 },
            feedback:
              "Count the gaps carefully: lane 6 is 5 lane-widths outside lane 1, not 6. Its radius is 36.5 + 5 × 1.2 = 42.5 m.",
          },
          {
            spec: { type: "number", value: 37.7, tolerance: 0.01 },
            feedback: "That's the difference for a full circle. The race has one bend, which is a semicircle.",
          },
        ],
        solution: [
          "Each lane's radius is 1.2 m more than the lane inside it, so lane 6's radius is 36.5 + 5 × 1.2 = 42.5 m.",
          "A semicircular bend has length {{1/2 * 2 pi r = pi r}}.",
          "Lane 6 bend − lane 1 bend {{= pi * 42.5 - pi * 36.5 = pi(42.5 - 36.5) = 6 pi}} m.",
          "{{6 pi = 18.849…}}, so 18.85 m.",
          "Notice that the 36.5 m cancelled: the stagger only depends on how far out the lane is.",
        ],
        commonError: "Counting 6 lane-widths from lane 1 to lane 6 instead of 5 (a fence-post error).",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "What is the radius of the lane 6 bend? Look at how the radius changes from lane to lane.",
          "A semicircular bend has length {{pi r}}. Find the difference between lane 6 and lane 1.",
          "{{pi * 42.5 - pi * 36.5 = pi(42.5 - 36.5)}}.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "written",
        id: "circles-p4-q20",
        question:
          "Always, sometimes or never true?\n\n*A semicircle has a bigger area than a quarter circle with the same perimeter.*\n\nShow working to support your answer, and explain why your answer works for every perimeter.",
        marks: 4,
        modelAnswer:
          "**Never true:** the quarter circle always has the bigger area.\n\nTry a perimeter of 10 cm.\n\n- Semicircle, radius r: {{pi r + 2r = r(pi + 2) = 10}}, so {{r = 10/(pi + 2) ~= 1.945}} cm. Area {{= 1/2 pi r^2 ~= 5.94}} cm².\n- Quarter circle, radius R: {{1/2 pi R + 2R = R(1/2 pi + 2) = 10}}, so {{R = 10/(1/2 pi + 2) ~= 2.800}} cm. Area {{= 1/4 pi R^2 ~= 6.16}} cm².\n\nThe quarter circle has the bigger area.\n\nFor any other perimeter, both shapes are just enlargements of these two. If the perimeter is multiplied by k, both radii are multiplied by k and both areas are multiplied by {{k^2}}, so the quarter circle stays bigger (by about 3.7%). So the statement is never true.",
        markScheme: [
          {
            point: "Chooses a perimeter and finds each radius, e.g. r = 10 ÷ (π + 2) ≈ 1.94 and R = 10 ÷ (½π + 2) ≈ 2.80",
            keywords: ["π + 2", "pi + 2", "1.94", "2.80", "2.8", "radius"],
          },
          { point: "Finds both areas: semicircle ≈ 5.94 cm², quarter circle ≈ 6.16 cm²", keywords: ["5.94", "6.16", "5.9", "6.2"] },
          {
            point: "Explains why the result is the same for every perimeter (enlarging multiplies both areas by the same factor)",
            keywords: ["scale", "k²", "k^2", "enlarge", "every perimeter", "any perimeter", "same factor"],
          },
          { point: "Concludes the statement is never true: the quarter circle always wins", keywords: ["never", "quarter circle is bigger", "quarter"] },
        ],
        commonError: "Assuming the semicircle must be bigger because it is 'half a circle'. With the same perimeter, the quarter circle has a bigger radius.",
        difficulty: "challenge",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Pick a perimeter, say 10 cm. For each shape, write its perimeter in terms of its radius.",
          "Semicircle: {{r(pi + 2) = 10}}. Quarter circle: {{R(1/2 pi + 2) = 10}}. Find r and R, then the two areas.",
          "If you doubled the perimeter, what would happen to each area? Could the winner change?",
        ],
        strategy: "Try small cases",
      },
    ],
  },
];
