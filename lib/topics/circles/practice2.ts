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
          "A circular paddling pool has a radius of 3 m. Find the area of its floor in m², in terms of π. (Type it like 5π or 5pi, with no units.)",
        answer: { type: "expression", expr: "9pi", display: "{{9 pi}} m²" },
        traps: [
          {
            spec: { type: "expression", expr: "6pi" },
            feedback: "{{6 pi}} is the circumference, {{2 pi r}}. Area is {{pi r^2}}: square the radius.",
          },
          {
            spec: { type: "number", value: 28.3, tolerance: 0.06 },
            feedback:
              "That's the right size, but the question asks for an exact answer **in terms of π**. Leave π as a symbol.",
          },
        ],
        solution: ["Area {{= pi r^2}}.", "{{r^2 = 3^2 = 9}}.", "So {{A = 9 pi}} m² (about 28.3 m²)."],
        commonError: "Working out {{2 pi r}} (the circumference) or π × 3 × 2 instead of squaring the radius.",
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
          "A paper label is wrapped once around a tin of baked beans with a diameter of 7.5 cm. The two ends of the label must overlap by 1 cm so they can be glued. How long must the label be? Give your answer in cm, to 1 decimal place.",
        answer: { type: "number", value: 24.6, allowFraction: false, display: "24.6 cm" },
        traps: [
          {
            spec: { type: "number", value: 48.1 },
            feedback: "You used {{2 pi * 7.5}}, but 7.5 cm is the diameter. Use {{C = pi d}}.",
          },
          {
            spec: { type: "number", value: 23.6 },
            feedback: "That's just the distance round the tin. Don't forget the 1 cm overlap.",
          },
        ],
        solution: [
          "The label goes once round the tin: that's the circumference.",
          "{{C = pi d = pi * 7.5 = 23.56…}} cm.",
          "Add the overlap: 23.56… + 1 = 24.56… cm.",
          "To 1 decimal place: 24.6 cm.",
        ],
        commonError: "Forgetting the overlap, or using {{2 pi r}} with the diameter.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "The label goes once round the tin. Which circle measurement is that?",
          "Find {{pi * 7.5}}, then think about the overlap.",
          "Add the 1 cm before you round.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "circles-p3-q08",
        question:
          "Hana measured the circumference C and the diameter d of some round objects using string and a ruler. Then she worked out C ÷ d.\n\n| Object | C (cm) | d (cm) | C ÷ d |\n|---|---|---|---|\n| Coin | 7.9 | 2.5 | 3.16 |\n| Mug | 25.2 | 8.0 | 3.15 |\n| Plate | 81.6 | 26.0 | 3.14 |\n| Bin lid | 94.2 | 15.0 | 6.28 |\n| Wall clock | 94.0 | 30.0 | 3.13 |\n\n(a) One result does not fit the pattern. Which one, and what mistake do you think Hana made?\n\n(b) The other values of C ÷ d are close to each other but not all the same. Explain why, and what they tell you.",
        marks: 4,
        modelAnswer:
          "(a) The bin lid: its C ÷ d is 6.28, about double the others. Hana probably measured the **radius** (15 cm) instead of the diameter. With d = 30 cm, C ÷ d = 94.2 ÷ 30 = 3.14, which fits. (Its circumference is almost the same as the wall clock's, and the clock's diameter is 30 cm.)\n\n(b) For every circle, C ÷ d is the same number, π = 3.14159… The values differ slightly because real measurements are never exact: string stretches or slips, and lengths are only measured to the nearest 0.1 cm. All of them are close to 3.14, which is good evidence that C ÷ d is a constant: π.",
        markScheme: [
          {
            point: "Identifies the bin lid as the odd one out (6.28 is about double the others)",
            keywords: ["bin lid", "bin", "6.28", "double", "twice"],
          },
          {
            point: "Suggests she measured the radius instead of the diameter (the diameter should be 30 cm)",
            keywords: ["radius", "instead", "30", "half"],
          },
          {
            point: "Explains the small differences by measurement error or limited accuracy",
            keywords: ["measure", "measurement", "error", "accurate", "accuracy", "string", "nearest", "rounding"],
          },
          {
            point: "States that C ÷ d is the same for every circle: about 3.14, which is π",
            keywords: ["3.14", "π", "pi", "same", "every circle", "constant"],
          },
        ],
        commonError: "Saying the bin lid is 'just a bigger object'. Size doesn't change C ÷ d: every circle gives π.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "For any circle, roughly how many diameters fit around the circumference?",
          "Which C ÷ d is about twice the others? Which measurement is half of a diameter?",
          "Think about how accurately you can measure round a mug with a piece of string.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "circles-p3-q09",
        question:
          "The tyres on Marcus's family car have a diameter of 62 cm. The drive from his home to the MRT station is exactly 1 km. How many **complete** turns does each tyre make on this drive?",
        answer: { type: "number", value: 513, display: "513 turns" },
        traps: [
          {
            spec: { type: "number", value: 514 },
            feedback:
              "The tyre makes 513.4… turns, so the 514th turn is not finished. The question asks for **complete** turns: round down.",
          },
          {
            spec: { type: "number", value: 256 },
            feedback:
              "You used {{2 pi * 62}}, treating the diameter as a radius. One turn rolls out {{pi * 62}} cm.",
          },
        ],
        solution: [
          "In one turn, the car moves one circumference: {{C = pi * 62 = 194.77…}} cm.",
          "Convert the distance: 1 km = 1000 m = 100 000 cm.",
          "Number of turns = 100 000 ÷ 194.77… = 513.4…",
          "Only 513 of these turns are complete, so the answer is 513.",
        ],
        commonError: "Rounding 513.4 up to 514, or dividing before converting km to cm.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "How far does the car move during ONE turn of a tyre?",
          "One turn = one circumference. Write 1 km in centimetres so the units match.",
          "Divide 100 000 by the circumference. For *complete* turns, do you round up or down?",
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
          "A sprinkler sits in the corner of a rectangular lawn. It sprays water up to 5 m away and turns through 90°, so it waters a quarter circle. What area of lawn does it water? Give your answer in m², to 1 decimal place.",
        answer: { type: "number", value: 19.6, allowFraction: false, display: "19.6 m²" },
        traps: [
          {
            spec: { type: "number", value: 78.5 },
            feedback: "That's a full circle. The sprinkler only turns through 90°, a quarter of a full turn.",
          },
          {
            spec: { type: "number", value: 7.9 },
            feedback:
              "That's a quarter of the circumference, which is a length. The question asks for an area: use {{pi r^2}}.",
          },
        ],
        solution: [
          "90° is {{90/360 = 1/4}} of a full turn, so the watered region is a quarter circle of radius 5 m.",
          "Full circle: {{pi * 5^2 = 25 pi}} m².",
          "Quarter: {{1/4 * 25 pi = 6.25 pi = 19.63…}} m².",
          "To 1 decimal place: 19.6 m².",
        ],
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "What fraction of a full circle does a 90° turn cover?",
          "Find the area of the full circle of radius 5 m first.",
          "Take a quarter of {{25 pi}}.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q13",
        question:
          "A CD has a diameter of 12 cm. The hole in the middle has a diameter of 1.5 cm. Find the area of one face of the CD, not counting the hole. Give your answer in cm², to 3 significant figures.",
        answer: { type: "number", value: 111, allowFraction: false, display: "111 cm²" },
        traps: [
          {
            spec: { type: "number", value: 86.6 },
            feedback:
              "You subtracted the radii first: {{pi(6 - 0.75)^2}}. That is a smaller whole circle, not a ring. Subtract the two **areas**: {{pi * 6^2 - pi * 0.75^2}}.",
          },
          {
            spec: { type: "number", value: 445 },
            feedback: "You used the diameters in {{pi r^2}}. Halve them first: the radii are 6 cm and 0.75 cm.",
          },
        ],
        solution: [
          "Radii: 12 ÷ 2 = 6 cm and 1.5 ÷ 2 = 0.75 cm.",
          "Whole disc: {{pi * 6^2 = 36 pi}} cm².",
          "Hole: {{pi * 0.75^2 = 0.5625 pi}} cm².",
          "Ring: {{36 pi - 0.5625 pi = 35.4375 pi = 111.33…}} cm².",
          "To 3 significant figures: 111 cm².",
        ],
        solutions: [
          {
            label: "Factorise first",
            steps: ["{{pi R^2 - pi r^2 = pi(R^2 - r^2)}}.", "{{pi(36 - 0.5625) = 35.4375 pi = 111.33…}} cm². One multiplication by π instead of two."],
          },
        ],
        commonError: "Working out {{pi(R - r)^2}} instead of {{pi R^2 - pi r^2}}.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "The face is a big circle with a small circle removed. Do you add or subtract?",
          "Find both radii, then both areas.",
          "Subtract the hole's area from the area of the whole disc.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q14",
        question:
          "A circular rug covers 5 m² of floor. What is the diameter of the rug? Give your answer in metres, to 2 decimal places.",
        answer: { type: "number", value: 2.52, allowFraction: false, display: "2.52 m" },
        traps: [
          { spec: { type: "number", value: 1.26 }, feedback: "That's the radius. Double it to get the diameter." },
          {
            spec: { type: "number", value: 1.59 },
            feedback: "{{5/pi = 1.59…}} is {{r^2}}, not r. Take the square root to find r, then double it.",
          },
        ],
        solution: [
          "{{pi r^2 = 5}}.",
          "Divide both sides by π: {{r^2 = 5/pi = 1.5915…}}",
          "Take the square root: r = 1.2615… m.",
          "Diameter: d = 2r = 2.523… m, which is 2.52 m to 2 decimal places.",
          "Check: {{pi * 1.26^2 ~= 4.99}} m². ✓",
        ],
        commonError: "Forgetting the square root, or stopping at the radius.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Write the area formula with what you know: {{pi r^2 = 5}}.",
          "Undo the operations in reverse order: first undo × π, then undo the squaring.",
          "{{r = sqrt(5/pi)}}. Then remember the question wants the diameter.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "circles-p3-q15",
        question:
          "Aisha's school has a flowerbed shaped like a rectangle 6 m long and 4 m wide, with a semicircle on one of its 4 m ends, as shown. The school has 23 m of plastic edging. Is that enough to go all the way round the outside of the flowerbed? Show your working.",
        diagram: `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A flowerbed made of a rectangle 6 m long and 4 m wide with a semicircle on its right-hand 4 m end. A dashed line shows where the semicircle joins the rectangle."><rect width="340" height="220" fill="#ffffff"/><path d="M240,50 L60,50 L60,170 L240,170 A60,60 0 0,0 240,50 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="50" x2="240" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="150" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 m</text><text x="52" y="115" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 m</text><text x="150" y="190" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">(not to scale)</text></svg>`,
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
          "The minute hand of a wall clock is 12 cm long. How far does the tip of the minute hand travel between 3:00 and 3:20? Give your answer in cm, to 1 decimal place.",
        answer: { type: "number", value: 25.1, allowFraction: false, display: "25.1 cm" },
        traps: [
          {
            spec: { type: "number", value: 75.4 },
            feedback: "That's a full turn (the whole circumference). In 20 minutes the hand only goes a third of the way round.",
          },
          {
            spec: { type: "number", value: 150.8 },
            feedback: "That's the **area** swept out by the hand, in cm². The tip travels a length: use the circumference.",
          },
        ],
        solution: [
          "In 20 minutes the minute hand turns {{20/60 = 1/3}} of a full turn (120°).",
          "The tip moves round a circle of radius 12 cm, whose circumference is {{2 pi * 12 = 24 pi}} cm.",
          "A third of that: {{1/3 * 24 pi = 8 pi = 25.13…}} cm.",
          "To 1 decimal place: 25.1 cm.",
        ],
        difficulty: "core",
        guideRef: "arcs-sectors",
        hints: [
          "What fraction of a full turn does the minute hand make in 20 minutes?",
          "The tip moves along part of a circle. What is that circle's radius?",
          "Find {{1/3}} of {{2 pi * 12}}.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p3-q17",
        question:
          "Mei rolls cookie dough into a rectangle 30 cm by 20 cm. With a round cutter of diameter 5 cm, she cuts circles in neat rows and columns, each circle touching its neighbours and the edges, and gets 24 cookies. Her brother says a smaller cutter, of diameter 2.5 cm, would waste less dough.\n\nUsing the 2.5 cm cutter in the same way, what percentage of the dough is wasted? Give your answer to 1 decimal place.",
        answer: { type: "number", value: 21.5, allowFraction: false, display: "21.5%" },
        traps: [
          {
            spec: { type: "number", value: 78.5 },
            feedback: "That's the percentage of the dough that is **used** for cookies. The question asks what percentage is wasted.",
          },
          {
            spec: { type: "number", value: 128.8 },
            feedback: "That's the wasted area in cm². Now write it as a percentage of the 600 cm² of dough.",
          },
        ],
        solution: [
          "Along 30 cm: 30 ÷ 2.5 = 12 circles. Along 20 cm: 20 ÷ 2.5 = 8 circles. So there are 12 × 8 = 96 cookies.",
          "Each has radius 1.25 cm, so area {{pi * 1.25^2 = 1.5625 pi}} cm².",
          "Total cookie area: {{96 * 1.5625 pi = 150 pi = 471.2…}} cm².",
          "Wasted: 600 − 471.2… = 128.76… cm², which is {{128.76/600 * 100 = 21.46…}}%.",
          "To 1 decimal place: 21.5%. That's exactly the same as with the 5 cm cutter ({{24 * 6.25 pi = 150 pi}} too), so her brother is wrong.",
        ],
        solutions: [
          {
            label: "One circle, one square (quicker)",
            steps: [
              "Each cookie sits in its own little square whose side is the diameter, 2r.",
              "Circle ÷ square {{= (pi r^2)/((2r)^2) = (pi r^2)/(4r^2) = pi/4 = 0.785…}}",
              "So {{1 - pi/4 = 0.2146…}} of every square is wasted, whatever size the cutter is: 21.5%.",
              "This also explains *why* the cutter size makes no difference.",
            ],
          },
        ],
        commonError: "Assuming smaller cutters waste less. Every circle fills the same fraction, {{pi/4}}, of its square.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "How many 2.5 cm circles fit along each side of the rectangle?",
          "Find the total area of all the cookies and compare it with the 600 cm² of dough.",
          "Compare with the 5 cm cutter. What do you notice? Can you explain it with one circle inside one square?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "circles-p3-q18",
        question:
          "A goat is tied to the corner of a shed by a rope 5 m long. The shed is a rectangle 6 m by 4 m, and the goat cannot go inside it or through its walls. There is open grass everywhere else. What area of grass can the goat reach? Give your answer in m², in terms of π. (Type it like 5π or 5pi, with no units.)",
        diagram: `<svg viewBox="0 0 340 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Top view of a rectangular shed 6 m long and 4 m wide on open grass. A goat is tied to the bottom-left corner of the shed by a rope 5 m long."><rect width="340" height="250" fill="#ffffff"/><rect x="10" y="10" width="320" height="230" fill="#bbf7d0"/><rect x="170" y="70" width="120" height="80" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="230" y="115" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">shed</text><text x="230" y="62" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 m</text><text x="298" y="114" font-size="12" font-family="sans-serif" fill="#1f2937">4 m</text><line x1="170" y1="150" x2="99.3" y2="220.7" stroke="#dc2626" stroke-width="2"/><circle cx="170" cy="150" r="4" fill="#1f2937"/><circle cx="99.3" cy="220.7" r="6" fill="#334155"/><text x="146" y="198" font-size="12" font-family="sans-serif" fill="#1f2937">rope 5 m</text><text x="68" y="214" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">goat</text></svg>`,
        answer: { type: "expression", expr: "19pi", display: "{{19 pi}} m²" },
        traps: [
          {
            spec: { type: "expression", expr: "18.75pi" },
            feedback:
              "You found the {{3/4}}-circle of radius 5 m. But when the rope lies along the 4 m wall, 1 m is left over at the far corner, and it can swing round that corner too.",
          },
          {
            spec: { type: "number", value: 59.7, tolerance: 0.05 },
            feedback: "Right size! Now give the exact answer in terms of π.",
          },
        ],
        solution: [
          "From its corner, the rope can point in any direction except into the shed: that's 270° out of 360°, so {{3/4}} of a circle of radius 5 m.",
          "Area: {{3/4 * pi * 5^2 = 75/4 pi = 18.75 pi}} m².",
          "Along the 6 m wall: the 5 m rope doesn't reach the far corner, so there is nothing extra there.",
          "Along the 4 m wall: the rope reaches the far corner with 5 − 4 = 1 m to spare. That 1 m swings round the corner, sweeping a quarter circle of radius 1 m: {{1/4 * pi * 1^2 = 0.25 pi}} m².",
          "Total: {{18.75 pi + 0.25 pi = 19 pi}} m² (about 59.7 m²).",
        ],
        commonError: "Forgetting that the rope can bend round a corner of the shed.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Sketch it. Which directions can the rope point in without passing through the shed?",
          "The goat can sweep {{3/4}} of a circle of radius 5 m. What happens when the rope is pulled tight along each wall?",
          "Along the 4 m wall, 1 m of rope is left at the far corner. What shape can that last metre sweep out?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "circles-p3-q19",
        question:
          "Two identical coins lie flat on a table, touching. One coin is held still. The other coin rolls all the way round the outside of it, without slipping, until it is back where it started. How many complete turns does the rolling coin make?",
        answer: { type: "number", value: 2, display: "2 turns" },
        traps: [
          {
            spec: { type: "number", value: 1 },
            feedback:
              "It feels like 1, because the two edges are the same length. Try it with two real coins and watch the head on the rolling coin! Then follow the path of its centre.",
          },
        ],
        solution: [
          "Let each coin have radius r. Follow the **centre** of the rolling coin.",
          "The coins always touch, so their centres are always 2r apart. The rolling coin's centre travels round a circle of radius 2r.",
          "That path has length {{2 pi * 2r = 4 pi r}}.",
          "A rolling coin makes one full turn each time its centre moves one of its own circumferences, {{2 pi r}}.",
          "{{(4 pi r)/(2 pi r) = 2}}, so it makes 2 complete turns.",
        ],
        commonError: "Answering 1 because the circumferences are equal. That forgets the extra turn the coin makes by going round the curve.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "Try it with two real coins! Watch which way the head on the rolling coin is facing.",
          "Follow the CENTRE of the rolling coin. What shape is its path, and what is the radius of that path?",
          "The centre travels round a circle of radius 2r. How many of the coin's own circumferences fit into that path?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "circles-p3-q20",
        question:
          "A rope is pulled tight around the equator of a perfectly round Earth, of radius 6400 km. The rope is then made **1 metre longer** and lifted evenly all the way round, so that it forms a slightly bigger circle with the same centre.\n\n(a) How high above the ground is the rope now?\n\n(b) Zara says: 'If you did the same with a rope around a football, the gap would be much smaller, because a football is so much smaller than the Earth.' Is Zara right? Explain.",
        marks: 4,
        modelAnswer:
          "(a) Let the Earth's radius be R metres and the gap be h metres. The new rope is a circle of radius R + h, and it is 1 m longer than the old one:\n\n    {{2 pi (R + h) = 2 pi R + 1}}\n    {{2 pi R + 2 pi h = 2 pi R + 1}}\n    {{2 pi h = 1}}\n    {{h = 1/(2 pi) ~= 0.16}} m\n\nSo the rope is about 16 cm above the ground: enough for a cat to crawl under!\n\n(b) Zara is wrong. The {{2 pi R}} cancelled out, so the gap does not depend on the radius at all. Adding 1 m to a rope round a football also lifts it by {{1/(2 pi)}} m, about 16 cm.",
        markScheme: [
          {
            point: "Forms the equation 2π(R + h) = 2πR + 1 (or says extra radius = extra length ÷ 2π)",
            keywords: ["2π(r + h)", "2pi(r+h)", "r + h", "÷ 2π", "/2π", "/ 2pi", "2π"],
          },
          { point: "Finds h = 1/(2π) ≈ 0.16 m, about 16 cm", keywords: ["0.16", "16 cm", "0.159", "15.9", "16"] },
          {
            point: "Explains that R cancels, so the gap does not depend on the radius",
            keywords: ["cancel", "does not depend", "doesn't depend", "any size", "any radius", "whatever"],
          },
          { point: "Concludes Zara is wrong: the gap is about 16 cm for the football too", keywords: ["wrong", "not right", "football", "same gap", "also 16"] },
        ],
        commonError: "Typing 2π × 6 400 000 into a calculator and losing accuracy. The algebra shows R isn't needed at all.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "Call the gap h. What is the radius of the new, bigger circle?",
          "Write the new rope length two ways: {{2 pi (R + h)}} and {{2 pi R + 1}}.",
          "Expand the bracket. What cancels? What does that tell you about Zara's idea?",
        ],
        strategy: "Introduce a variable",
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
        question: "A circle has a radius of 6.5 cm. Find its circumference in cm, in terms of π. (Type it like 5π or 5pi, with no units.)",
        answer: { type: "expression", expr: "13pi", display: "{{13 pi}} cm" },
        traps: [
          { spec: { type: "expression", expr: "6.5pi" }, feedback: "{{pi r}} is only half of the circumference. Use {{C = 2 pi r}}." },
          { spec: { type: "expression", expr: "42.25pi" }, feedback: "That's {{pi r^2}}, the area. The circumference is {{2 pi r}}." },
        ],
        solution: ["A radius is given, so use {{C = 2 pi r}}.", "{{C = 2 * pi * 6.5 = 13 pi}} cm."],
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
          "Aisha wraps a string once round a plate and finds that its circumference is 69.1 cm. She measures its diameter as 22.0 cm. Use her measurements to estimate the value of π, correct to 3 significant figures.",
        answer: { type: "number", value: 3.14, allowFraction: false, display: "3.14" },
        traps: [
          {
            spec: { type: "number", value: 0.318 },
            feedback: "That's d ÷ C. π is the circumference divided by the diameter, so it's a bit more than 3.",
          },
        ],
        solution: [
          "π = circumference ÷ diameter.",
          "69.1 ÷ 22.0 = 3.1409…",
          "To 3 significant figures: 3.14, very close to the true value 3.14159…",
        ],
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: [
          "π compares the circumference with the diameter. Which way round do you divide?",
          "Work out 69.1 ÷ 22.0, then round to 3 significant figures.",
        ],
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
          "Hana cuts a circle of radius 5 cm into 8 equal sectors. She rearranges them top-to-tail, as shown, to make a shape that is almost a parallelogram. What is the total length of the wavy bottom edge of the shape? Give your answer in cm, in terms of π. (Type it like 5π or 5pi, with no units.)",
        diagram: `<svg viewBox="0 0 290 135" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Eight equal sectors of a circle of radius 5 cm arranged top-to-tail: four point upwards with their arcs along the bottom, and four point downwards with their arcs along the top. The shape is almost a parallelogram with a slanted side of 5 cm and a wavy bottom edge."><rect width="290" height="135" fill="#ffffff"/><path d="M60,34.57 L82.96,90 A60,60 0 0,1 37.04,90 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M105.92,34.57 L128.88,90 A60,60 0 0,1 82.96,90 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M151.84,34.57 L174.8,90 A60,60 0 0,1 128.88,90 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M197.76,34.57 L220.72,90 A60,60 0 0,1 174.8,90 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><path d="M82.96,90 L60,34.57 A60,60 0 0,1 105.92,34.57 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><path d="M128.88,90 L105.92,34.57 A60,60 0 0,1 151.84,34.57 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><path d="M174.8,90 L151.84,34.57 A60,60 0 0,1 197.76,34.57 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><path d="M220.72,90 L197.76,34.57 A60,60 0 0,1 243.68,34.57 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><text x="42" y="60" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">5 cm</text><line x1="37.04" y1="110" x2="220.72" y2="110" stroke="#334155" stroke-width="1.5"/><line x1="37.04" y1="104" x2="37.04" y2="116" stroke="#334155" stroke-width="1.5"/><line x1="220.72" y1="104" x2="220.72" y2="116" stroke="#334155" stroke-width="1.5"/><text x="129" y="128" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">wavy bottom edge</text></svg>`,
        answer: { type: "expression", expr: "5pi", display: "{{5 pi}} cm" },
        traps: [
          {
            spec: { type: "expression", expr: "10pi" },
            feedback: "{{10 pi}} is the whole circumference. Look again: half of the arcs are on the top edge and half on the bottom.",
          },
          {
            spec: { type: "number", value: 5 },
            feedback: "5 cm is the radius, which is the slanted side of the shape. The wavy edge is made of arcs.",
          },
        ],
        solution: [
          "The 8 arcs together make the whole circumference: {{2 pi * 5 = 10 pi}} cm.",
          "4 of the arcs are on the bottom edge and 4 are on the top edge.",
          "So the bottom edge is half the circumference: {{1/2 * 10 pi = 5 pi}} cm.",
          "This is why a circle's area is {{pi r^2}}: with more and more sectors, the shape becomes a rectangle with base {{pi r}} and height r, so its area is {{pi r * r = pi r^2}}.",
        ],
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Where did all the curved edges of the sectors come from?",
          "Count the arcs on the bottom edge. What fraction of all the arcs is that?",
          "The bottom edge is half of the circle's circumference.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "circles-p4-q07",
        question:
          "The diagram shows a quarter circle of radius 12 cm. Find its perimeter in cm, in terms of π. (Type it like 3π + 5, with no units.)",
        diagram: `<svg viewBox="0 0 260 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A quarter circle with two straight edges of 12 cm meeting at a right angle, and a curved edge joining their ends."><rect width="260" height="220" fill="#ffffff"/><path d="M60,190 L60,46 A144,144 0 0,1 204,190 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><path d="M60,176 L74,176 L74,190" fill="none" stroke="#334155" stroke-width="1.5"/><text x="132" y="207" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text><text x="52" y="122" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">12 cm</text></svg>`,
        answer: { type: "expression", expr: "6pi+24", display: "{{6 pi + 24}} cm" },
        traps: [
          {
            spec: { type: "expression", expr: "6pi" },
            feedback: "{{6 pi}} is just the curved edge. The perimeter also includes the two straight edges, 12 cm each.",
          },
          { spec: { type: "expression", expr: "6pi+12" }, feedback: "There are **two** straight edges, each 12 cm long." },
        ],
        solution: [
          "Curved edge: {{1/4}} of the circumference, {{1/4 * 2 pi * 12 = 6 pi}} cm.",
          "Straight edges: two radii, 12 + 12 = 24 cm.",
          "Perimeter = {{6 pi + 24}} cm (about 42.8 cm). These are not like terms, so they stay separate.",
        ],
        commonError: "Forgetting one or both of the straight edges.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Trace round the shape. How many straight edges and how many curved edges are there?",
          "The curved edge is a quarter of a full circumference.",
          "Add the two 12 cm radii to {{1/4 * 2 pi * 12}}.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "circles-p4-q08",
        question:
          "Ravi says: 'If you double the radius of a circle, its area doubles too.' Is Ravi right? Explain your answer, using an example or algebra.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong.\n\nExample: a circle of radius 3 cm has area {{pi * 3^2 = 9 pi}} cm². Doubling the radius to 6 cm gives area {{pi * 6^2 = 36 pi}} cm², which is 4 times as big, not 2 times.\n\nIn general, {{pi (2r)^2 = 4 pi r^2}}, because the radius is squared. Doubling the radius always multiplies the area by 4. (It is the *circumference* that doubles.)",
        markScheme: [
          { point: "States that Ravi is wrong", keywords: ["no", "wrong", "not right", "incorrect"] },
          {
            point: "Correct example or algebra, e.g. 9π becomes 36π, or π(2r)² = 4πr²",
            keywords: ["36", "9π", "9pi", "4πr²", "4pi r^2", "(2r)", "squared"],
          },
          {
            point: "Concludes that the area is multiplied by 4",
            keywords: ["4 times", "four times", "×4", "x4", "quadruple", "multiplied by 4"],
          },
        ],
        commonError: "Checking only the circumference, which really does double.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Test it: choose a radius and work out the area. Then double the radius and work it out again.",
          "In {{pi r^2}}, the radius is squared. What is {{2^2}}?",
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
          "Copy and complete the table. Give A and B to the nearest whole number.\n\n| Wheel | Diameter (cm) | Circumference (cm) |\n|---|---|---|\n| Scooter wheel | 15 | A |\n| Bicycle wheel | B | 210 |\n\nType A first, then B, separated by a comma.",
        answer: { type: "list", values: [47, 67], ordered: true, tolerance: 0.2, display: "A = 47, B = 67" },
        traps: [
          {
            spec: { type: "list", values: [94, 67], ordered: true, tolerance: 0.2 },
            feedback: "Check A: you used {{2 pi * 15}}, but 15 cm is the diameter. Use {{C = pi d}}.",
          },
          {
            spec: { type: "list", values: [47, 33], ordered: true, tolerance: 0.2 },
            feedback: "Check B: 33 cm is the radius, {{210/(2 pi)}}. The table asks for the diameter, {{210/pi}}.",
          },
        ],
        solution: [
          "A: the diameter is given, so {{C = pi d = pi * 15 = 47.12…}}, about 47 cm.",
          "B: work backwards: {{d = C/pi = 210/pi = 66.84…}}, about 67 cm.",
          "Sense check: each circumference is just over 3 times its diameter: 3 × 15 = 45 and 3 × 67 = 201. ✓",
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
          "A flowerbed at Gardens by the Bay is a sector of a circle with radius 6 m and angle 60°. Edging is fitted all the way round it: along the curved edge and both straight edges. What length of edging is needed? Give your answer in metres, to 1 decimal place.",
        answer: { type: "number", value: 18.3, allowFraction: false, display: "18.3 m" },
        traps: [
          { spec: { type: "number", value: 6.3 }, feedback: "That's only the curved edge. Add the two straight edges, each 6 m." },
          { spec: { type: "number", value: 12.3 }, feedback: "A sector has **two** straight edges (two radii), each 6 m." },
        ],
        solution: [
          "60° is {{60/360 = 1/6}} of a full turn.",
          "Arc: {{1/6 * 2 pi * 6 = 2 pi = 6.28…}} m.",
          "Add the two radii: 6.28… + 6 + 6 = 18.28… m.",
          "To 1 decimal place: 18.3 m.",
        ],
        difficulty: "core",
        guideRef: "arcs-sectors",
        hints: [
          "What fraction of a whole circle is a 60° sector?",
          "The curved edge is {{1/6}} of the circumference {{2 pi * 6}}.",
          "Then add both straight edges.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "circles-p4-q13",
        question:
          "Jun was asked to find the area of a semicircle with diameter 10 cm. Here is his working:\n\n    Area = π × 10² ÷ 2\n    = 314.159… ÷ 2\n    = 157.1 cm²\n\n(a) Explain the mistake Jun made.\n\n(b) Work out the correct area, to 1 decimal place.",
        marks: 3,
        modelAnswer:
          "(a) Jun used the diameter, 10 cm, in {{pi r^2}}, but the formula needs the radius, 10 ÷ 2 = 5 cm. Using the diameter makes the answer 4 times too big. A quick check shows 157.1 is impossible: the semicircle fits inside a 10 cm × 5 cm rectangle, whose area is only 50 cm².\n\n(b) Area {{= 1/2 * pi * 5^2 = 12.5 pi = 39.26…}}, so the area is 39.3 cm² to 1 decimal place.",
        markScheme: [
          {
            point: "Explains that he used the diameter instead of the radius",
            keywords: ["diameter", "radius", "instead", "should be 5", "r = 5"],
          },
          { point: "Correct method: ½ × π × 5² (= 12.5π)", keywords: ["12.5", "5²", "5^2", "25π", "25pi", "78.5"] },
          { point: "Correct answer: 39.3 cm²", keywords: ["39.3", "39.27"] },
        ],
        commonError: "Saying the mistake was dividing by 2. Halving is right for a semicircle; the error is using the diameter.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "What does r stand for in {{pi r^2}}?",
          "Halve the diameter first, then square it.",
          "Find half of {{pi * 5^2}}.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "circles-p4-q14",
        question:
          "A circular lawn has an area of 154 m². Using π = {{22/7}}, (a) find the radius of the lawn, then (b) find its circumference. Give your final answer, the circumference, in metres.",
        answer: { type: "number", value: 44, display: "44 m" },
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "7 m is the radius, part (a). Part (b) asks for the circumference." },
          {
            spec: { type: "number", value: 22 },
            feedback: "{{22/7 * 7 = 22}} is {{pi r}}, which is only half of the circumference. Use {{C = 2 pi r}}.",
          },
        ],
        solution: [
          "{{pi r^2 = 154}}, so {{22/7 * r^2 = 154}}.",
          "{{r^2 = 154 * 7/22 = 7 * 7 = 49}}, so r = 7 m.",
          "{{C = 2 pi r = 2 * 22/7 * 7 = 44}} m.",
        ],
        commonError: "Stopping at {{r^2 = 49}} or at r = 7.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Start with {{pi r^2 = 154}} and put in π = {{22/7}}.",
          "Multiply both sides by {{7/22}}. Notice 154 ÷ 22 = 7.",
          "Once you have r, use {{C = 2 pi r}}.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "circles-p4-q15",
        question:
          "The diagram shows a square of side 12 cm. A quarter circle of radius 12 cm is drawn with its centre at one corner of the square. Find the area of the shaded region, in cm², to 1 decimal place.",
        diagram: `<svg viewBox="0 0 270 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 12 cm. A quarter circle of radius 12 cm is centred at the bottom-left corner and reaches the top-left and bottom-right corners. The region of the square outside the quarter circle, in the top-right corner, is shaded."><rect width="270" height="220" fill="#ffffff"/><rect x="60" y="30" width="156" height="156" fill="#fecaca" stroke="#1f2937" stroke-width="2"/><path d="M60,186 L60,30 A156,156 0 0,1 216,186 Z" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><circle cx="60" cy="186" r="3" fill="#1f2937"/><text x="138" y="204" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text><text x="52" y="112" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">12 cm</text></svg>`,
        answer: { type: "number", value: 30.9, allowFraction: false, display: "30.9 cm²" },
        traps: [
          {
            spec: { type: "number", value: 113.1 },
            feedback: "113.1 cm² is the quarter circle, which is the unshaded part. The shaded region is what is left of the square.",
          },
        ],
        solution: [
          "Square: 12 × 12 = 144 cm².",
          "Quarter circle: {{1/4 * pi * 12^2 = 36 pi = 113.09…}} cm².",
          "Shaded = 144 − 113.09… = 30.90… cm².",
          "To 1 decimal place: 30.9 cm².",
        ],
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Is the shaded part the quarter circle, or what's left of the square?",
          "Shaded = square − quarter circle.",
          "Quarter circle {{= 1/4 * pi * 12^2}}.",
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
          "Three pipes, each with diameter 10 cm, are strapped together tightly with a band, as shown in the end view. Each pipe touches the other two. Find the length of the band, in cm, to 1 decimal place.",
        diagram: `<svg viewBox="0 0 300 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End view of three circular pipes of diameter 10 cm, each touching the other two, arranged in a triangle. A tight red band goes round the outside of all three pipes, made of three straight parts and three curved parts."><rect width="300" height="190" fill="#ffffff"/><circle cx="150" cy="80" r="30" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><circle cx="120" cy="131.96" r="30" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><circle cx="180" cy="131.96" r="30" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><path d="M124.02,65 A30,30 0 0,1 175.98,65 L205.98,116.96 A30,30 0 0,1 180,161.96 L120,161.96 A30,30 0 0,1 94.02,116.96 Z" fill="none" stroke="#dc2626" stroke-width="3"/><line x1="90" y1="131.96" x2="150" y2="131.96" stroke="#334155" stroke-width="1.5"/><text x="120" y="126" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text><text x="214" y="92" font-size="12" font-family="sans-serif" fill="#dc2626">band</text></svg>`,
        answer: { type: "number", value: 61.4, allowFraction: false, display: "61.4 cm" },
        traps: [
          {
            spec: { type: "number", value: 77.1 },
            feedback:
              "Each curved part is not a semicircle. Going once round the bundle, the band turns through exactly 360°, so the three curved parts add up to one full circumference.",
          },
          {
            spec: { type: "number", value: 31.4 },
            feedback: "That's the curved parts only. Add the three straight parts as well.",
          },
        ],
        solution: [
          "Split the band into straight parts and curved parts.",
          "Straight parts: each one is parallel to the line joining two centres and just as long. Touching pipes have centres 5 + 5 = 10 cm apart, so the 3 straight parts total 3 × 10 = 30 cm.",
          "Curved parts: the centres form an equilateral triangle (angles 60°). At each pipe the band turns through 360° − 90° − 90° − 60° = 120°. Three lots of 120° make 360°, so together the curved parts make one whole circumference: {{pi * 10 = 31.41…}} cm.",
          "Total: 30 + 31.41… = 61.41… cm, which is 61.4 cm to 1 decimal place.",
        ],
        commonError: "Treating each curved part as a semicircle.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Split the band into straight pieces and curved pieces.",
          "How far apart are the centres of two touching pipes? How long is each straight piece?",
          "As you go once round the bundle, the band turns through a full 360°. What do the three curved pieces add up to?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "circles-p4-q18",
        question:
          "A circle fits exactly inside a large square. A small square fits exactly inside the circle, with its four corners on the circle, as shown. What percentage of the circle's area is **not** covered by the small square? Give your answer to 1 decimal place.",
        diagram: `<svg viewBox="0 0 280 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large square with a circle fitting exactly inside it. Inside the circle is a small square, turned 45 degrees, with its four corners on the circle. Dashed lines join opposite corners of the small square through the centre."><rect width="280" height="200" fill="#ffffff"/><rect x="60" y="20" width="160" height="160" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><circle cx="140" cy="100" r="80" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="140,20 220,100 140,180 60,100" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="140" y1="20" x2="140" y2="180" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="60" y1="100" x2="220" y2="100" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><circle cx="140" cy="100" r="3" fill="#1f2937"/></svg>`,
        answer: { type: "number", value: 36.3, allowFraction: false, display: "36.3%" },
        traps: [
          {
            spec: { type: "number", value: 63.7 },
            feedback: "That's the percentage of the circle that the small square **does** cover.",
          },
          {
            spec: { type: "number", value: 21.5 },
            feedback: "That's the part of the **large** square outside the circle. The question compares the small square with the circle.",
          },
        ],
        solution: [
          "No size is given, so call the circle's radius r (or choose r = 1).",
          "The small square's diagonals are diameters, of length 2r, crossing at right angles at the centre. They split the small square into 4 right-angled triangles, each with two sides of length r: area {{4 * 1/2 * r * r = 2r^2}}.",
          "Circle area {{= pi r^2}}.",
          "Uncovered fraction {{= (pi r^2 - 2r^2)/(pi r^2) = 1 - 2/pi = 0.3633…}}",
          "So 36.3% of the circle is not covered. The answer is the same for every size of circle.",
        ],
        solutions: [
          {
            label: "Choose r = 1",
            steps: [
              "Circle area = π ≈ 3.1416.",
              "Small square: 4 triangles, each {{1/2 * 1 * 1}}, total 2.",
              "Uncovered: (3.1416 − 2) ÷ 3.1416 = 0.363…, which is 36.3%.",
            ],
          },
        ],
        commonError: "Assuming the small square's side is equal to the radius.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "No lengths are given. Choose a radius (r = 1 is easiest). Will the percentage depend on your choice?",
          "Look at the dashed diagonals of the small square. How long are they, and how do they split the square?",
          "The small square is 4 right-angled triangles with two sides of length r. Compare its area with {{pi r^2}}.",
        ],
        strategy: "Introduce a variable",
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
        guideRef: "semicircles-quarter-circles",
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
          "Points P, X and Q lie on a straight line, with PX = 4 cm and XQ = 6 cm. A large semicircle is drawn on PQ, and two small semicircles are drawn on PX and XQ, all on the same side of the line, as shown. Ant A walks from P to Q along the large semicircle. Ant B walks from P to Q along the two small semicircles.\n\n(a) Ethan says Ant A walks further, because its semicircle is much bigger. Is Ethan right? Show your working.\n\n(b) Would your answer change if X were somewhere else on PQ? Explain.",
        diagram: `<svg viewBox="0 0 360 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Points P, X and Q on a straight line with PX 4 cm and XQ 6 cm. A large semicircle on PQ is Ant A's path. Two small blue semicircles on PX and XQ form Ant B's path."><rect width="360" height="215" fill="#ffffff"/><line x1="40" y1="170" x2="320" y2="170" stroke="#334155" stroke-width="1.5"/><path d="M60,170 A120,120 0 0,1 300,170" fill="none" stroke="#1f2937" stroke-width="2.5"/><path d="M60,170 A48,48 0 0,1 156,170" fill="none" stroke="#2563eb" stroke-width="2.5"/><path d="M156,170 A72,72 0 0,1 300,170" fill="none" stroke="#2563eb" stroke-width="2.5"/><circle cx="60" cy="170" r="3" fill="#1f2937"/><circle cx="156" cy="170" r="3" fill="#1f2937"/><circle cx="300" cy="170" r="3" fill="#1f2937"/><text x="60" y="188" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">P</text><text x="156" y="188" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">X</text><text x="300" y="188" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Q</text><text x="108" y="206" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="228" y="206" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="270" y="66" font-size="12" font-family="sans-serif" fill="#1f2937">Ant A</text><text x="228" y="90" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#2563eb">Ant B</text></svg>`,
        marks: 4,
        modelAnswer:
          "(a) Large semicircle: diameter 10 cm, curved length {{1/2 * pi * 10 = 5 pi}} cm.\n\nSmall semicircles: {{1/2 * pi * 4 + 1/2 * pi * 6 = 2 pi + 3 pi = 5 pi}} cm.\n\nBoth ants walk {{5 pi ~= 15.7}} cm, so Ethan is wrong: the distances are equal.\n\n(b) No. If PX = a and XQ = b, Ant B walks {{1/2 pi a + 1/2 pi b = 1/2 pi(a + b)}}, which is exactly Ant A's distance, because PQ = a + b. The distances are always equal, wherever X is.",
        markScheme: [
          { point: "Large semicircle's arc = 5π (about 15.7 cm)", keywords: ["5π", "5pi", "15.7"] },
          { point: "Small arcs: 2π + 3π = 5π", keywords: ["2π", "3π", "2pi", "3pi", "6.28", "9.42"] },
          { point: "Ethan is wrong: both distances are equal", keywords: ["same", "equal", "wrong", "not right"] },
          {
            point: "General argument: ½πa + ½πb = ½π(a + b), so the distances are always equal wherever X is",
            keywords: ["always", "a + b", "any", "wherever", "anywhere", "factor"],
          },
        ],
        commonError: "Judging by how big the curves look instead of calculating.",
        difficulty: "challenge",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Find the curved length of each semicircle: half of {{pi d}}.",
          "Compare {{1/2 * pi * 10}} with {{1/2 * pi * 4 + 1/2 * pi * 6}}.",
          "For (b), call the two parts a and b. Can you factorise {{1/2 pi a + 1/2 pi b}}?",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },
];
