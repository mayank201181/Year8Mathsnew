import type { Paper } from "../../types.ts";

// Circles — four 20-question MCQ papers (5 warmup, 11 core, 4 challenge each).
// Every distractor is a specific misconception; explanations name the error by value.

export const mcqPapers: Paper[] = [
  // ===========================================================================
  // MCQ PAPER 1
  // ===========================================================================
  {
    id: "circles-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "circles-m1-q01",
        question: "A round table at a hawker centre has a diameter of 1.2 m. What is its radius?",
        options: ["0.6 m", "2.4 m", "1.2 m", "3.8 m"],
        answerIndex: 0,
        explanation:
          "The radius runs from the centre to the edge, which is half of the way across: 1.2 ÷ 2 = 0.6 m. 2.4 m comes from doubling, which is how you get from a radius to a diameter, not the other way. 3.8 m is roughly the distance *round* the table (its circumference), not across to the centre.",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["The radius goes from the centre to the edge. What fraction of the way across the table is that?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m1-q02",
        question: "Which word means *a straight line segment joining two points on a circle*?",
        options: ["Radius", "Arc", "Chord", "Tangent"],
        answerIndex: 2,
        explanation:
          "A **chord** joins two points on the circle; a diameter is just the longest chord, the one through the centre. A radius is tempting, but it has one end at the centre, not on the circle. An arc is part of the curved edge, so it isn't straight, and a tangent only touches the circle at one point.",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["Picture the line. Where are its two ends?"],
      },
      {
        kind: "mcq",
        id: "circles-m1-q03",
        question: "For **every** circle, big or small, circumference ÷ diameter is…",
        options: ["about 2", "about 3.14, the number π", "about 6.28", "different for big and small circles"],
        answerIndex: 1,
        explanation:
          "Every circle is an enlargement of every other circle, so the ratio circumference ÷ diameter never changes. It is π ≈ 3.14159… About 6.28 is 2π, which is circumference ÷ **radius**. The idea that it changes with size is wrong: a circle twice as wide is exactly twice as far round.",
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["Imagine wrapping a string once round a tin, then laying it across the top. How many times does it fit across?"],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "circles-m1-q04",
        question: "A circle has diameter 10 cm. Using π = 3.14, what is its circumference?",
        options: ["15.7 cm", "78.5 cm", "314 cm", "31.4 cm"],
        answerIndex: 3,
        explanation:
          "C = πd = 3.14 × 10 = 31.4 cm. 15.7 cm uses the radius 5 in C = πd, which gives only half the circumference. 78.5 cm is the area (πr² = 3.14 × 25), which is a different quantity measured in cm². 314 cm squares the diameter (3.14 × 10²), mixing up the circumference and area formulas.",
        difficulty: "warmup",
        guideRef: "circumference",
        hints: ["Which circumference formula uses the diameter directly?"],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m1-q05",
        question: "A circle has radius 3 cm. Which calculation gives its area?",
        options: ["{{pi * 3^2}}", "{{pi * 6}}", "{{pi * 6^2}}", "{{(pi * 3)^2}}"],
        answerIndex: 0,
        explanation:
          "Area = πr², and only the radius is squared: {{pi * 3^2 = 9pi}} ≈ 28.3 cm². {{pi * 6}} is the circumference (πd), a length. {{pi * 6^2}} squares the diameter, giving 4 times too much. {{(pi * 3)^2}} squares π as well.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["In A = πr², which part gets squared?"],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m1-q06",
        question: "O is the centre of the circle. What is the shaded region called?",
        diagram: `<svg viewBox="0 0 240 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre O. A chord below the centre cuts off a small shaded region between the chord and the arc."><rect width="240" height="200" fill="#ffffff"/><path d="M 59.38 135 A 70 70 0 0 0 180.62 135 Z" fill="#fde68a" stroke="none"/><circle cx="120" cy="100" r="70" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="59.38" y1="135" x2="180.62" y2="135" stroke="#1f2937" stroke-width="2"/><circle cx="120" cy="100" r="3" fill="#1f2937"/><text x="126" y="96" font-size="13" font-family="sans-serif" fill="#1f2937">O</text></svg>`,
        options: ["Sector", "Segment", "Semicircle", "Arc"],
        answerIndex: 1,
        explanation:
          "The shaded region is bounded by a **chord** and an arc, so it is a **segment**. A sector is the tempting mix-up, but a sector is bounded by **two radii** and an arc (a pizza slice) and always reaches the centre. It isn't a semicircle because the chord doesn't pass through O, and an arc is only the curved line, not a region.",
        difficulty: "core",
        guideRef: "parts-of-a-circle",
        hints: [
          "What are the edges of the shaded region: two radii, or something else?",
          "Two radii and an arc make a sector. A straight cut that doesn't go to the centre makes the other one.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "circles-m1-q07",
        question:
          "Siti measured four round objects. One row of her table has a measuring mistake. Which one?\n\n| Object | Diameter (cm) | Circumference (cm) |\n|---|---|---|\n| Coin | 2.4 | 7.5 |\n| Mug | 8.0 | 25.1 |\n| Plate | 26 | 52 |\n| Clock | 30 | 94.2 |",
        options: ["Coin", "Mug", "Plate", "Clock"],
        answerIndex: 2,
        explanation:
          "For every circle, circumference ÷ diameter should be about 3.1. Coin: 7.5 ÷ 2.4 ≈ 3.1. Mug: 25.1 ÷ 8 ≈ 3.1. Clock: 94.2 ÷ 30 = 3.14. **Plate**: 52 ÷ 26 = 2, which is far too small; its circumference should be about 26 × 3.14 ≈ 82 cm. The coin looks suspicious because its numbers are small, but its ratio is fine.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "What should circumference ÷ diameter be for any circle?",
          "Work out circumference ÷ diameter for each row.",
          "Three rows give about 3.1. Which one doesn't?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "circles-m1-q08",
        question: "A circle has radius 7 cm. What is its circumference, **in terms of π**?",
        options: ["{{7pi}} cm", "{{49pi}} cm", "{{28pi}} cm", "{{14pi}} cm"],
        answerIndex: 3,
        explanation:
          "C = 2πr = 2 × π × 7 = {{14pi}} cm (about 44 cm). {{49pi}} is the area, πr². {{7pi}} uses the radius in C = πd, so it is half the circumference. {{28pi}} doubles twice: it puts the diameter 14 into 2πr.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "There are two circumference formulas: C = πd and C = 2πr. Which fits what you know?",
          "With r = 7, the diameter is 14 cm.",
          "π × 14: leave π as a symbol rather than multiplying it out.",
        ],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m1-q09",
        question: "A round vegetarian pizza has diameter 30 cm. Using π = 3.14, what is the area of its top?",
        options: ["706.5 cm²", "2826 cm²", "94.2 cm²", "1413 cm²"],
        answerIndex: 0,
        explanation:
          "r = 30 ÷ 2 = 15 cm, so A = 3.14 × 15² = 3.14 × 225 = 706.5 cm². 2826 cm² squares the diameter instead of the radius. 1413 cm² squares the diameter and then halves, but halving 30² does not give 15²; you would need to divide by 4. 94.2 cm² is the circumference, which is a length.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "The area formula needs the radius. What is it here?",
          "r = 15 cm. Square it before multiplying by π.",
          "3.14 × 225",
        ],
        strategy: "Find the radius first",
      },
      {
        kind: "mcq",
        id: "circles-m1-q10",
        question: "A circular pond has radius 9.8 m. Which is the best **estimate** of its area?",
        options: ["60 m²", "300 m²", "1200 m²", "30 m²"],
        answerIndex: 1,
        explanation:
          "Round to easy numbers: π ≈ 3 and r ≈ 10, so A ≈ 3 × 10² = 300 m² (the exact value is about 301.7 m²). 1200 m² comes from squaring the diameter 20 instead of the radius. 60 m² estimates the circumference, 2 × 3 × 10, not the area. 30 m² forgets to square the radius.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Round π and the radius to numbers you can multiply in your head.",
          "Use π ≈ 3 and r ≈ 10.",
          "3 × 10² = ?",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "circles-m1-q11",
        question: "A semicircle has diameter 12 cm. Using π = 3.14, what is its area?",
        options: ["113.04 cm²", "226.08 cm²", "56.52 cm²", "18.84 cm²"],
        answerIndex: 2,
        explanation:
          "The full circle has r = 6, so its area is 3.14 × 36 = 113.04 cm². Half of that is **56.52 cm²**. 113.04 cm² forgets to halve. 226.08 cm² uses 12 as the radius and then halves. 18.84 cm² is half the circumference, a length rather than an area.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Find the area of the whole circle first.",
          "The radius is 6 cm, so the whole circle is 3.14 × 36 = 113.04 cm².",
          "A semicircle is half of the whole circle.",
        ],
        strategy: "Whole circle first, then take the fraction",
      },
      {
        kind: "mcq",
        id: "circles-m1-q12",
        question: "Using π = 3.14, what is the **perimeter** of this semicircle?",
        diagram: `<svg viewBox="0 0 260 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A semicircle with its straight edge along the bottom labelled 20 cm."><rect width="260" height="160" fill="#ffffff"/><path d="M 30 120 A 100 100 0 0 1 230 120 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><text x="130" y="142" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20 cm</text></svg>`,
        options: ["31.4 cm", "62.8 cm", "41.4 cm", "51.4 cm"],
        answerIndex: 3,
        explanation:
          "The boundary has two parts. Curved part = half of πd = 3.14 × 20 ÷ 2 = 31.4 cm. Straight part = the diameter, 20 cm. Perimeter = 31.4 + 20 = **51.4 cm**. 31.4 cm forgets the straight edge. 41.4 cm adds the radius (10 cm) instead of the diameter. 62.8 cm is the full circle's circumference.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Trace round the edge with your finger. How many pieces is the boundary made of?",
          "Curved part = half of π × 20.",
          "Now add the straight edge: 31.4 + 20.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m1-q13",
        question: "A bicycle wheel has a circumference of 207 cm. Using the π button, what is its diameter, to the nearest cm?",
        options: ["66 cm", "33 cm", "650 cm", "8 cm"],
        answerIndex: 0,
        explanation:
          "C = πd, so d = C ÷ π = 207 ÷ π ≈ 65.9, which is **66 cm**. 33 cm is the radius (207 ÷ 2π). 650 cm multiplies by π instead of dividing. A diameter bigger than the circumference is impossible. 8 cm comes from treating 207 as an area: √(207 ÷ π) ≈ 8.1.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Write C = πd and put in the number you know.",
          "207 = π × d. What undoes ‘multiply by π’?",
          "d = 207 ÷ π",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "circles-m1-q14",
        question: "The shape is a 10 cm by 6 cm rectangle with a semicircle joined onto one 6 cm end. Using π = 3.14, what is its area?",
        diagram: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle 10 cm long and 6 cm high with a semicircle attached to its right-hand end, bulging outwards."><rect width="360" height="220" fill="#ffffff"/><path d="M 60 60 L 260 60 A 60 60 0 0 1 260 180 L 60 180 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="260" y1="60" x2="260" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="160" y="50" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text><text x="52" y="124" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">6 cm</text></svg>`,
        options: ["88.26 cm²", "74.13 cm²", "116.52 cm²", "45.87 cm²"],
        answerIndex: 1,
        explanation:
          "Rectangle: 10 × 6 = 60 cm². The semicircle has diameter 6, so r = 3: ½ × 3.14 × 9 = 14.13 cm². Total = 60 + 14.13 = **74.13 cm²**. 88.26 cm² adds a whole circle, not half. 116.52 cm² uses 6 as the radius. 45.87 cm² subtracts the semicircle, but here it sticks out, so it adds to the area.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Split the shape into pieces you know how to find.",
          "The semicircle sits on the 6 cm end, so its radius is 3 cm.",
          "Rectangle 60 cm² plus half of 3.14 × 3².",
        ],
        strategy: "Split into simpler shapes",
      },
      {
        kind: "mcq",
        id: "circles-m1-q15",
        question: "A circle fits exactly inside a square of side 10 cm. Using π = 3.14, what is the area of the shaded part (inside the square but outside the circle)?",
        diagram: `<svg viewBox="0 0 280 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 10 cm with a circle touching all four sides. The four corner regions outside the circle are shaded."><rect width="280" height="250" fill="#ffffff"/><rect x="40" y="20" width="200" height="200" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="140" cy="120" r="100" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><text x="140" y="240" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text></svg>`,
        options: ["78.5 cm²", "68.6 cm²", "21.5 cm²", "84.3 cm²"],
        answerIndex: 2,
        explanation:
          "The circle's diameter is 10 cm, so r = 5 and its area is 3.14 × 25 = 78.5 cm². Shaded = square − circle = 100 − 78.5 = **21.5 cm²**. 78.5 cm² is the circle itself, the unshaded part. 68.6 cm² subtracts the circumference (31.4 cm), which is a length, not an area. 84.3 cm² subtracts 3.14 × 5 without squaring the radius.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Shaded = (big shape) − (the part that is not shaded).",
          "The circle touches all four sides, so its diameter is 10 cm.",
          "100 − 3.14 × 5²",
        ],
        strategy: "Subtract the unshaded part",
      },
      {
        kind: "mcq",
        id: "circles-m1-q16",
        question: "Which statement about π is true?",
        options: [
          "π is exactly {{22/7}}",
          "π is exactly 3.14",
          "π is bigger for bigger circles",
          "π is a decimal that never ends and never repeats",
        ],
        answerIndex: 3,
        explanation:
          "π = 3.14159265… goes on for ever without a repeating pattern; it is **irrational**, so no fraction or terminating decimal is exactly equal to it. {{22/7}} = 3.142857… is a good approximation but not exact, and 3.14 is also only a rounded value. π is the same for every circle because it is a ratio.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "Type 22 ÷ 7 into a calculator and compare it with the π button.",
          "22 ÷ 7 = 3.142857… and π = 3.141592…. Are they the same?",
        ],
        strategy: "Check by calculating",
      },
      {
        kind: "mcq",
        id: "circles-m1-q17",
        question:
          "A circle's circumference is exactly 10 cm more than 3 times its diameter. Using the π button, what is its diameter, to 1 d.p.?",
        options: ["70.6 cm", "1.4 cm", "3.2 cm", "1.6 cm"],
        answerIndex: 0,
        explanation:
          "Let the diameter be d. Then πd = 3d + 10, so πd − 3d = 10, so d(π − 3) = 10, and d = 10 ÷ 0.14159… ≈ **70.6 cm**. π is only a little more than 3, so the circle must be big for the ‘bit extra’ to reach 10 cm. 1.4 cm multiplies 10 by (π − 3) instead of dividing. 3.2 cm is 10 ÷ π, which ignores the 3d. 1.6 cm divides by (π + 3) after a sign slip. Rounding π to 3.14 here would give 71.4 cm, because π − 3 is so small that any rounding of π is magnified; that's why the question asks for the π button.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "Call the diameter d. Write the circumference two ways.",
          "πd = 3d + 10. Collect the d terms on one side.",
          "d(π − 3) = 10. What is π − 3 as a decimal?",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "circles-m1-q18",
        question: "Circle B has 3 times the radius of circle A. How many times bigger is the **area** of circle B?",
        options: ["3", "9", "6", "27"],
        answerIndex: 1,
        explanation:
          "If A has radius r, B has radius 3r, and its area is π(3r)² = 9πr²: **9 times** as big. Both length directions are stretched by 3, so the area is stretched by 3 × 3. The answer 3 is true for the circumference, which is a length. 6 doubles the scale factor instead of squaring it. 27 would be the scale factor for a volume.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "Try it with numbers: radius 1 and radius 3.",
          "Areas: π × 1² and π × 3².",
          "Compare π and 9π.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "circles-m1-q19",
        question:
          "Four circles, each of radius 1 cm, fit exactly inside a square. Each touches two sides of the square and two of the other circles. What fraction of the square do the circles cover?",
        diagram: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square containing four equal circles in a 2 by 2 arrangement, each touching two sides and two neighbouring circles. One radius is labelled 1 cm."><rect width="240" height="240" fill="#ffffff"/><rect x="20" y="20" width="200" height="200" fill="none" stroke="#1f2937" stroke-width="2"/><circle cx="70" cy="70" r="50" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><circle cx="170" cy="70" r="50" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><circle cx="70" cy="170" r="50" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><circle cx="170" cy="170" r="50" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><line x1="70" y1="70" x2="120" y2="70" stroke="#334155" stroke-width="1.5"/><circle cx="70" cy="70" r="2.5" fill="#334155"/><text x="95" y="64" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 cm</text></svg>`,
        options: ["{{pi/16}}", "{{pi/2}}", "{{pi/4}}", "{{4/pi}}"],
        answerIndex: 2,
        explanation:
          "The square's side is 4 radii = 4 cm, so its area is 16 cm². The circles cover 4 × π × 1² = 4π cm². Fraction = {{(4pi)/16 = pi/4}} ≈ 0.785. That is exactly the same as **one** circle in its own square, because each quarter of the picture is one circle in a 2 cm square. {{pi/16}} counts only one circle. {{pi/2}} uses each circle's circumference, 2π, instead of its area, π. {{4/pi}} is upside down and is more than 1, which is impossible.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "How long is the side of the square, in radii?",
          "Square: 4 cm by 4 cm. Circles: four of area π × 1² each.",
          "Or use symmetry: cut the picture into four identical quarters.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "circles-m1-q20",
        question: "A sector of a circle has radius 6 cm and angle 60°. What is its arc length, in terms of π?",
        options: ["{{6pi}} cm", "{{12pi}} cm", "{{pi}} cm", "{{2pi}} cm"],
        answerIndex: 3,
        explanation:
          "60° is {{60/360 = 1/6}} of a full turn. The full circumference is 2π × 6 = 12π, so the arc is {{1/6}} × 12π = **{{2pi}} cm**. {{6pi}} is the sector's *area* ({{1/6}} × 36π), not its arc length. {{12pi}} is the whole circumference, and {{pi}} uses π × 6 as if 6 were the diameter.",
        difficulty: "challenge",
        guideRef: "arcs-sectors",
        hints: [
          "What fraction of a full turn is 60°?",
          "The full circumference is 2 × π × 6 = 12π cm.",
          "Take {{1/6}} of 12π.",
        ],
        strategy: "Fraction of the whole circle",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 2
  // ===========================================================================
  {
    id: "circles-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "circles-m2-q01",
        question: "O is the centre of the circle. Which line is a **tangent**?",
        diagram: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre O and four labelled lines: p from O to the circle, q joining two points on the circle, r touching the circle at the bottom only, and s passing through O from one side of the circle to the other."><rect width="300" height="220" fill="#ffffff"/><circle cx="150" cy="110" r="80" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="150" y1="110" x2="80.72" y2="150" stroke="#334155" stroke-width="2"/><line x1="190" y1="40.72" x2="228.78" y2="123.89" stroke="#334155" stroke-width="2"/><line x1="60" y1="190" x2="240" y2="190" stroke="#334155" stroke-width="2"/><line x1="80.72" y1="70" x2="219.28" y2="150" stroke="#334155" stroke-width="2"/><circle cx="150" cy="110" r="3" fill="#1f2937"/><text x="150" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">O</text><text x="104" y="148" font-size="14" font-family="sans-serif" font-style="italic" fill="#1f2937">p</text><text x="194" y="92" font-size="14" font-family="sans-serif" font-style="italic" fill="#1f2937">q</text><text x="246" y="194" font-size="14" font-family="sans-serif" font-style="italic" fill="#1f2937">r</text><text x="66" y="68" font-size="14" font-family="sans-serif" font-style="italic" fill="#1f2937">s</text></svg>`,
        options: ["p", "r", "q", "s"],
        answerIndex: 1,
        explanation:
          "Line r touches the circle at exactly one point and never goes inside it, so r is the **tangent**. Line q joins two points on the circle, so it is a chord. Line s is a chord through O, so it is a diameter. Line p goes from the centre to the circle, so it is a radius.",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["A tangent touches the circle at one point but never cuts inside it."],
      },
      {
        kind: "mcq",
        id: "circles-m2-q02",
        question: "Which formula gives the circumference C of a circle with radius r?",
        options: ["{{C = pi r^2}}", "{{C = pi r}}", "{{C = 2pi r}}", "{{C = pi d^2}}"],
        answerIndex: 2,
        explanation:
          "C = πd, and the diameter is 2r, so **C = 2πr**. {{C = pi r^2}} is the *area* formula; a squared length gives cm², not cm. {{C = pi r}} uses the radius where the diameter belongs, so it gives only half the circumference.",
        difficulty: "warmup",
        guideRef: "circumference",
        hints: ["Start from C = πd. How is the diameter related to the radius?"],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m2-q03",
        question: "Jun wraps a piece of string exactly once round a tin of diameter 7 cm. About how long is the string?",
        options: ["14 cm", "44 cm", "154 cm", "22 cm"],
        answerIndex: 3,
        explanation:
          "Once round is the circumference, which is just over 3 diameters: π × 7 ≈ 3.14 × 7 ≈ **22 cm**. 14 cm is only 2 diameters, which is too short. 44 cm uses 7 as the radius (2π × 7), but 7 cm is the distance across. 154 cm is the area (π × 7²), which isn't a length at all.",
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["Once round a circle is about how many diameters?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "circles-m2-q04",
        question: "Hana says: ‘A circle with radius 4 cm has area π × 8 cm².’ What did she do wrong?",
        options: [
          "She doubled the radius instead of squaring it",
          "She should have used the diameter instead",
          "She should have used 2πr",
          "Nothing, because π × 8 is correct",
        ],
        answerIndex: 0,
        explanation:
          "r² means r × r = 4 × 4 = 16, not 4 × 2 = 8. The area is **16π ≈ 50.3 cm²**. Using 2πr would give the circumference, which is a length, not an area. Using the diameter in πr² would make the answer 4 times too big.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["What does the little 2 in r² mean: ‘times 2’ or ‘times itself’?"],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "circles-m2-q05",
        question: "A circle has area 100 cm². What is the area of a quarter circle cut from it?",
        options: ["50 cm²", "25 cm²", "400 cm²", "75 cm²"],
        answerIndex: 1,
        explanation:
          "Four quarter circles make the whole circle, so one is 100 ÷ 4 = **25 cm²**. 75 cm² is what is *left* after the quarter is cut away. 50 cm² would be a semicircle. 400 cm² multiplies by 4 instead of dividing.",
        difficulty: "warmup",
        guideRef: "semicircles-quarter-circles",
        hints: ["How many quarter circles make a whole circle?"],
      },
      {
        kind: "mcq",
        id: "circles-m2-q06",
        question:
          "Priya cuts a thin slice from a round cake using two straight cuts, each going from the centre to the edge. What is the top of her slice called?",
        options: ["A segment", "A semicircle", "A sector", "A chord"],
        answerIndex: 2,
        explanation:
          "Two radii and the arc between them make a **sector**, the classic ‘pizza slice’. A segment is the tempting mix-up, but a segment is cut off by **one** straight cut (a chord) and doesn't reach the centre. A thin slice is much less than half, so it isn't a semicircle, and a chord is a line, not a region.",
        difficulty: "core",
        guideRef: "parts-of-a-circle",
        hints: [
          "Which lines make the edges of the slice?",
          "Each cut goes from the centre to the edge. What is that line called?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m2-q07",
        question: "π = 3.14159… Which of these approximations is **closest** to π?",
        options: ["3", "3.1", "3.14", "{{22/7}}"],
        answerIndex: 3,
        explanation:
          "{{22/7}} = 3.142857…, which is about 0.0013 from π. 3.14 is about 0.0016 from π, so **{{22/7}}** is just closer. Many people assume 3.14 must be closer because it ‘looks like’ π, but {{22/7}} overshoots by less than 3.14 undershoots. Neither is exact, because π is irrational.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "Write {{22/7}} as a decimal.",
          "22 ÷ 7 = 3.142857…. Now find how far each option is from 3.14159.",
          "Compare 3.14159 − 3.14 with 3.142857 − 3.14159.",
        ],
        strategy: "Convert to the same form",
      },
      {
        kind: "mcq",
        id: "circles-m2-q08",
        question: "A circular running track has radius 40 m. Mei runs round it 3 times. Using π = 3.14, how far does she run?",
        options: ["753.6 m", "376.8 m", "15 072 m", "251.2 m"],
        answerIndex: 0,
        explanation:
          "One lap is the circumference: 2 × 3.14 × 40 = 251.2 m. Three laps: 3 × 251.2 = **753.6 m**. 251.2 m is only one lap. 376.8 m uses π × 40 per lap, which forgets the 2 in 2πr. 15 072 m uses the area, which doesn't measure distance.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "How far is one lap?",
          "One lap = 2 × π × 40.",
          "Then multiply by the number of laps.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "mcq",
        id: "circles-m2-q09",
        question:
          "A circle of radius r is cut into lots of thin sectors. They are laid side by side, alternately pointing up and down, to make a shape that is almost a rectangle. Roughly how long and how tall is it?",
        diagram: `<svg viewBox="0 0 260 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Eight equal sectors of a circle laid side by side, alternately pointing up and down, forming a shape close to a rectangle with wavy top and bottom edges."><rect width="260" height="120" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><path d="M 50 30 L 27.04 85.43 A 60 60 0 0 0 72.96 85.43 Z" fill="#c7d2fe"/><path d="M 95.92 30 L 72.96 85.43 A 60 60 0 0 0 118.88 85.43 Z" fill="#c7d2fe"/><path d="M 141.84 30 L 118.88 85.43 A 60 60 0 0 0 164.8 85.43 Z" fill="#c7d2fe"/><path d="M 187.76 30 L 164.8 85.43 A 60 60 0 0 0 210.72 85.43 Z" fill="#c7d2fe"/><path d="M 72.96 90 L 50 34.57 A 60 60 0 0 1 95.92 34.57 Z" fill="#fde68a"/><path d="M 118.88 90 L 95.92 34.57 A 60 60 0 0 1 141.84 34.57 Z" fill="#fde68a"/><path d="M 164.8 90 L 141.84 34.57 A 60 60 0 0 1 187.76 34.57 Z" fill="#fde68a"/><path d="M 210.72 90 L 187.76 34.57 A 60 60 0 0 1 233.68 34.57 Z" fill="#fde68a"/></g></svg>`,
        options: ["Length 2πr, height r", "Length πr, height r", "Length πr, height 2r", "Length 2r, height πr"],
        answerIndex: 1,
        explanation:
          "The curved edges of all the sectors add up to the whole circumference, 2πr. Half of them face up and half face down, so each long side is about **πr**. The short side is a sector's straight edge, which is a radius, so the height is about **r**. That makes the area ≈ πr × r = πr², which is why A = πr². ‘Length 2πr’ puts the whole circumference along one side, but it is shared between the top and the bottom. ‘Height 2r’ mixes up the radius with the diameter.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Which parts of each sector make the wavy long sides, and which make the short sides?",
          "All the curved edges together make the whole circumference, but they are split between the top and the bottom.",
          "Each long side ≈ half of 2πr; each short side is a radius.",
        ],
        strategy: "Rearrange into a known shape",
      },
      {
        kind: "mcq",
        id: "circles-m2-q10",
        question: "A circle has circumference {{18pi}} cm. What is its radius?",
        options: ["18 cm", "36 cm", "9 cm", "4.24 cm"],
        answerIndex: 2,
        explanation:
          "Match with C = 2πr: 2 × π × r = 18 × π, so 2r = 18 and r = **9 cm**. 18 cm is the diameter (from C = πd). 36 cm doubles instead of halving. 4.24 cm (√18) treats {{18pi}} as an area, πr², but this is a circumference.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Write C = 2πr and put in what you know.",
          "2 × π × r = 18 × π. The π appears on both sides.",
          "So 2r = 18.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "circles-m2-q11",
        question: "The diagram shows a quarter circle of radius 8 cm. Using π = 3.14, what is its perimeter?",
        diagram: `<svg viewBox="0 0 220 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A quarter circle with a right angle at the centre and two straight radii each 8 cm."><rect width="220" height="200" fill="#ffffff"/><path d="M 40 170 L 40 30 A 140 140 0 0 1 180 170 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><path d="M 40 156 L 54 156 L 54 170" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="110" y="190" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text><text x="32" y="104" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">8 cm</text></svg>`,
        options: ["12.56 cm", "20.56 cm", "50.24 cm", "28.56 cm"],
        answerIndex: 3,
        explanation:
          "Curved part = {{1/4}} of 2 × 3.14 × 8 = 50.24 ÷ 4 = 12.56 cm. The two straight edges are both radii: 8 + 8 = 16 cm. Perimeter = 12.56 + 16 = **28.56 cm**. 12.56 cm forgets the straight edges. 20.56 cm adds only one radius. 50.24 cm is the whole circle's circumference.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "The boundary has three pieces. What are they?",
          "Curved part = a quarter of the full circumference, 2 × 3.14 × 8.",
          "Add the two straight radii.",
        ],
        strategy: "Whole circle first, then take the fraction",
      },
      {
        kind: "mcq",
        id: "circles-m2-q12",
        question: "A circular rug has radius 1.35 m. Using the π button, what is its area, to 3 significant figures?",
        options: ["5.73 m²", "5.72 m²", "8.48 m²", "22.9 m²"],
        answerIndex: 0,
        explanation:
          "A = π × 1.35² = π × 1.8225 = 5.7255… m². The fourth significant figure is 5, so round up to **5.73 m²**. 5.72 m² chops off the extra digits (truncates) instead of rounding; using 3.14 instead of the π button also gives 5.72, which is why the question asks for the π button. 8.48 m² is the circumference, 2π × 1.35. 22.9 m² uses the diameter, 2.7 m, as the radius.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Square the radius first: 1.35² = ?",
          "1.8225 × π = 5.7255…",
          "To 3 s.f., look at the 4th significant figure to decide whether to round up.",
        ],
        strategy: "Round only at the end",
      },
      {
        kind: "mcq",
        id: "circles-m2-q13",
        question:
          "A running track is made of two straight sides of 100 m and two semicircular ends. The straight sides are 60 m apart. Using π = 3.14, what is the length of the outside edge?",
        diagram: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A running track shape: two straight sides of 100 metres joined by two semicircular ends. Dashed lines 60 metres long mark where each semicircle joins the straight part."><rect width="400" height="220" fill="#ffffff"/><path d="M 100 50 L 300 50 A 60 60 0 0 1 300 170 L 100 170 A 60 60 0 0 1 100 50 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="100" y1="50" x2="100" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="300" y1="50" x2="300" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="200" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">100 m</text><text x="108" y="114" font-size="13" font-family="sans-serif" fill="#1f2937">60 m</text></svg>`,
        options: ["508.4 m", "388.4 m", "294.2 m", "288.4 m"],
        answerIndex: 1,
        explanation:
          "The two semicircular ends together make one whole circle of diameter 60 m: 3.14 × 60 = 188.4 m. Add the two straights: 188.4 + 200 = **388.4 m**. 508.4 m also adds the two dashed 60 m lines, but they are inside the shape, not part of the edge. 294.2 m counts only one semicircle, and 288.4 m counts only one straight.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Trace the outside edge. Which lines do you actually walk along?",
          "Two semicircles of diameter 60 m make one full circle.",
          "Circle: 3.14 × 60. Then add 100 + 100.",
        ],
        strategy: "Split into simpler shapes",
      },
      {
        kind: "mcq",
        id: "circles-m2-q14",
        question:
          "A circular garden of radius 5 m has a path 1 m wide all the way round it, so the outer edge of the path has radius 6 m. Using π = 3.14, what is the area of the path?",
        diagram: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circular garden of radius 5 m surrounded by a ring-shaped path 1 m wide."><rect width="240" height="240" fill="#ffffff"/><circle cx="120" cy="120" r="108" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><circle cx="120" cy="120" r="90" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="120" x2="210" y2="120" stroke="#334155" stroke-width="1.5"/><circle cx="120" cy="120" r="2.5" fill="#334155"/><text x="165" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5 m</text><text x="219" y="104" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 m</text><line x1="210" y1="120" x2="228" y2="120" stroke="#b91c1c" stroke-width="2"/></svg>`,
        options: ["3.14 m²", "113.04 m²", "34.54 m²", "78.5 m²"],
        answerIndex: 2,
        explanation:
          "Path = big circle − garden = 3.14 × 6² − 3.14 × 5² = 113.04 − 78.5 = **34.54 m²**. 3.14 m² treats the path as a circle of radius 1, but the path is a ring that goes all the way round. 113.04 m² is the whole outer circle, garden included, and 78.5 m² is just the garden.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "The path is what's left of the big circle after the garden is removed.",
          "Big circle radius 6 m, garden radius 5 m.",
          "3.14 × 36 − 3.14 × 25",
        ],
        strategy: "Subtract the unshaded part",
      },
      {
        kind: "mcq",
        id: "circles-m2-q15",
        question:
          "The Singapore Flyer is a giant wheel of diameter 150 m. Suppose a capsule goes round once in 30 minutes. Using the π button, what is the capsule's average speed, to 1 d.p.?",
        options: ["5.0 metres per minute", "31.4 metres per minute", "589.0 metres per minute", "15.7 metres per minute"],
        answerIndex: 3,
        explanation:
          "In one turn the capsule travels the circumference: π × 150 ≈ 471.2 m. Speed = 471.2 ÷ 30 ≈ **15.7 metres per minute**. 5.0 metres per minute uses the diameter as the distance travelled. 31.4 metres per minute uses 150 m as the radius (2π × 150). 589.0 metres per minute divides the *area* by the time.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "How far does a capsule travel in one full turn?",
          "Distance = π × 150 m.",
          "Speed = distance ÷ time.",
        ],
        strategy: "Break it into steps",
      },
      {
        kind: "mcq",
        id: "circles-m2-q16",
        question: "A semicircle has radius 4 cm. What is its exact perimeter?",
        options: ["{{4pi + 8}} cm", "{{4pi}} cm", "{{8pi + 8}} cm", "{{4pi + 4}} cm"],
        answerIndex: 0,
        explanation:
          "Curved part = half of 2π × 4 = 4π cm. Straight part = the diameter, 8 cm. Perimeter = **{{4pi + 8}} cm** (about 20.6 cm). {{4pi}} forgets the straight edge. {{4pi + 4}} adds the radius instead of the diameter. {{8pi + 8}} uses the whole circumference, not half.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "The perimeter is a curved part plus a straight part.",
          "Curved part = half of 2πr with r = 4.",
          "The straight edge goes all the way across: it is a diameter.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m2-q17",
        question:
          "Zara draws a regular hexagon inside a circle of radius 1, with every corner on the circle. Each side of the hexagon is also 1, so its perimeter is 6. The circle's diameter is 2. What does this prove about π?",
        diagram: `<svg viewBox="0 0 240 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A regular hexagon drawn inside a circle with all six corners on the circle. One radius and one side are each labelled 1."><rect width="240" height="220" fill="#ffffff"/><circle cx="120" cy="110" r="90" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><polygon points="210,110 165,32.06 75,32.06 30,110 75,187.94 165,187.94" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="110" x2="210" y2="110" stroke="#334155" stroke-width="1.5"/><circle cx="120" cy="110" r="2.5" fill="#334155"/><text x="165" y="126" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1</text><text x="197" y="66" font-size="13" font-family="sans-serif" fill="#1f2937">1</text></svg>`,
        options: ["π equals 3", "π is greater than 3", "π is less than 3", "Nothing, because a hexagon is not a circle"],
        answerIndex: 1,
        explanation:
          "Each hexagon side is a straight chord, and a straight line is the shortest path between its ends, so each arc of the circle is longer than its chord. So the circumference is **more than 6**, and π = C ÷ d > 6 ÷ 2 = 3. ‘π equals 3’ ignores the corners the hexagon cuts. The hexagon doesn't tell us π exactly, but it does prove a lower limit; this is how Archimedes started trapping π.",
        difficulty: "challenge",
        guideRef: "discovering-pi",
        hints: [
          "Which is longer: the hexagon's perimeter or the circle's circumference?",
          "Compare one straight side with the arc it cuts off.",
          "If C > 6 and d = 2, what can you say about C ÷ d?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m2-q18",
        question:
          "For one particular circle, the circumference in cm and the area in cm² are the **same number**. What is its radius?",
        options: ["1 cm", "No such circle exists", "2 cm", "4 cm"],
        answerIndex: 2,
        explanation:
          "Set 2πr = πr². Divide both sides by πr (r isn't 0): 2 = r, so r = **2 cm**. Check: C = 4π ≈ 12.57 and A = 4π ≈ 12.57. 1 cm comes from using C = πr, which forgets the 2. 4 cm is the diameter of that circle, not its radius. Such a circle does exist; the units differ, but the numbers can match.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "Write an equation: circumference formula = area formula.",
          "2πr = πr². What can you divide both sides by?",
          "Check your answer by working out both C and A.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "circles-m2-q19",
        question:
          "AB is the diameter of a semicircle. P is any point on AB. Two smaller semicircles are drawn on AP and PB. How does the total length of the two small curved arcs compare with the length of the big curved arc?",
        diagram: `<svg viewBox="0 0 300 175" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large semicircle on diameter AB. Point P lies on AB, and two smaller semicircles are drawn on AP and PB inside the large one."><rect width="300" height="175" fill="#ffffff"/><path d="M 30 150 A 120 120 0 0 1 270 150 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><path d="M 30 150 A 40 40 0 0 1 110 150" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><path d="M 110 150 A 80 80 0 0 1 270 150" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="150" x2="270" y2="150" stroke="#1f2937" stroke-width="2"/><text x="30" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="110" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">P</text><text x="270" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text></svg>`,
        options: ["Always equal", "Always shorter", "Always longer", "Equal only when P is the midpoint"],
        answerIndex: 0,
        explanation:
          "A semicircular arc on a diameter d has length {{1/2 pi d}}. With AP = a and PB = b, the small arcs total {{1/2 pi a + 1/2 pi b = 1/2 pi (a + b)}}, which is exactly the big arc, since AB = a + b. So they are **always equal**, wherever P is. ‘Shorter’ is the natural guess, because the small arcs look as if they cut inside, but the arc length is proportional to the diameter. It works for every P, not only the midpoint.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Try a case: AB = 10, AP = 4, PB = 6. Work out each arc in terms of π.",
          "A semicircle's arc is half of π × diameter.",
          "Call AP = a and PB = b, and add the two small arcs.",
        ],
        strategy: "Try small cases, then generalise",
      },
      {
        kind: "mcq",
        id: "circles-m2-q20",
        question: "A sector has radius 10 cm and angle 72°. What is its exact area?",
        options: ["{{4pi}} cm²", "{{72pi}} cm²", "{{100pi}} cm²", "{{20pi}} cm²"],
        answerIndex: 3,
        explanation:
          "72° is {{72/360 = 1/5}} of a full turn. The whole circle has area π × 10² = 100π, so the sector is {{1/5}} × 100π = **{{20pi}} cm²**. {{72pi}} treats 72° as 72% (using {{72/100}}), but a full turn is 360°, not 100. {{4pi}} is the arc length, {{1/5}} of 20π. {{100pi}} is the whole circle.",
        difficulty: "challenge",
        guideRef: "arcs-sectors",
        hints: [
          "What fraction of 360° is 72°?",
          "{{72/360}} simplifies to {{1/5}}.",
          "Take {{1/5}} of the whole circle's area, 100π.",
        ],
        strategy: "Fraction of the whole circle",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 3
  // ===========================================================================
  {
    id: "circles-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "circles-m3-q01",
        question: "What is the **circumference** of a circle?",
        options: [
          "The distance across the circle through its centre",
          "The space inside the circle",
          "The distance all the way round the circle",
          "The distance from the centre to the edge",
        ],
        answerIndex: 2,
        explanation:
          "The circumference is the circle's perimeter, the **distance all the way round**. The distance across through the centre is the diameter, and centre to edge is the radius. The space inside is the area, which is measured in square units.",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["‘Circum-’ means ‘around’, as in circumnavigate."],
      },
      {
        kind: "mcq",
        id: "circles-m3-q02",
        question: "A hula hoop has diameter 80 cm. Which is the best **estimate** of its circumference?",
        options: ["240 cm", "160 cm", "480 cm", "120 cm"],
        answerIndex: 0,
        explanation:
          "C = πd ≈ 3 × 80 = **240 cm** (the exact value is about 251 cm). 160 cm is only 2 diameters. 480 cm uses 80 as the radius (2 × 3 × 80). 120 cm uses the radius 40 in C = πd.",
        difficulty: "warmup",
        guideRef: "circumference",
        hints: ["Use π ≈ 3. Which formula uses the diameter directly?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "circles-m3-q03",
        question: "Which circle has the **largest** area?",
        options: ["Diameter 11 cm", "Radius 5 cm", "Diameter 8 cm", "Radius 6 cm"],
        answerIndex: 3,
        explanation:
          "Compare like with like by turning everything into a radius: 5.5 cm, 5 cm, 4 cm and 6 cm. The biggest radius gives the biggest area, so **radius 6 cm** wins. Diameter 11 cm is tempting because 11 is the biggest number, but its radius is only 5.5 cm.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["Change every measurement into a radius before comparing."],
        strategy: "Convert to the same form",
      },
      {
        kind: "mcq",
        id: "circles-m3-q04",
        question: "A quarter circle has radius 10 cm. Which calculation gives its area?",
        options: ["{{1/4 * 2 * pi * 10}}", "{{1/4 * pi * 10^2}}", "{{1/2 * pi * 10^2}}", "{{pi * 10^2 - 4}}"],
        answerIndex: 1,
        explanation:
          "A quarter circle is {{1/4}} of the whole circle, so its area is **{{1/4 * pi * 10^2}}** = 25π ≈ 78.5 cm². {{1/4 * 2 * pi * 10}} is a quarter of the *circumference*, which gives the curved edge's length. {{1/2 * pi * 10^2}} is a semicircle. {{pi * 10^2 - 4}} subtracts 4 instead of dividing by 4.",
        difficulty: "warmup",
        guideRef: "semicircles-quarter-circles",
        hints: ["Area of the whole circle first; then what fraction do you need?"],
        strategy: "Whole circle first, then take the fraction",
      },
      {
        kind: "mcq",
        id: "circles-m3-q05",
        question: "π is the ratio of which two measurements of a circle?",
        options: [
          "Area ÷ radius",
          "Circumference ÷ radius",
          "Circumference ÷ diameter",
          "Diameter ÷ circumference",
        ],
        answerIndex: 2,
        explanation:
          "π is defined as **circumference ÷ diameter**, and it is the same for every circle. Circumference ÷ radius is 2π ≈ 6.28, because the radius is half the diameter. Diameter ÷ circumference is the ratio upside down, about 0.318.",
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["C = πd. Rearrange it to make π the subject."],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "circles-m3-q06",
        question: "Always, sometimes or never true? *A chord of a circle is longer than the radius of the circle.*",
        options: ["Sometimes true", "Always true", "Never true", "True only for a diameter"],
        answerIndex: 0,
        explanation:
          "Chords can be any length from almost 0 up to the diameter, 2r. A diameter (2r) is longer than r, but a tiny chord near the edge is shorter. So it is **sometimes true**. ‘True only for a diameter’ is wrong because chords slightly shorter than a diameter are still longer than r. ‘Never’ assumes the radius is the longest line in a circle, but the diameter is twice as long.",
        difficulty: "core",
        guideRef: "parts-of-a-circle",
        hints: [
          "Draw a few chords: some long, some very short.",
          "What is the longest possible chord? How short can a chord be?",
          "Is there a chord longer than r and also a chord shorter than r?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "circles-m3-q07",
        question:
          "Wei Ling measured the diameter and circumference of five round objects and plotted circumference against diameter. Her points lie close to a straight line through the origin. What is the gradient of that line, roughly?",
        diagram: `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of circumference in cm against diameter in cm. Five plotted points lie close to a straight line through the origin; at diameter 10 the line reaches about 31.4."><rect width="300" height="230" fill="#ffffff"/><line x1="40" y1="190" x2="290" y2="190" stroke="#1f2937" stroke-width="1.5"/><line x1="40" y1="190" x2="40" y2="20" stroke="#1f2937" stroke-width="1.5"/><g stroke="#334155" stroke-width="1"><line x1="88" y1="190" x2="88" y2="195"/><line x1="136" y1="190" x2="136" y2="195"/><line x1="184" y1="190" x2="184" y2="195"/><line x1="232" y1="190" x2="232" y2="195"/><line x1="280" y1="190" x2="280" y2="195"/><line x1="35" y1="140" x2="40" y2="140"/><line x1="35" y1="90" x2="40" y2="90"/><line x1="35" y1="40" x2="40" y2="40"/></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="40" y="206">0</text><text x="88" y="206">2</text><text x="136" y="206">4</text><text x="184" y="206">6</text><text x="232" y="206">8</text><text x="280" y="206">10</text><text x="160" y="224">diameter (cm)</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="32" y="144">10</text><text x="32" y="94">20</text><text x="32" y="44">30</text></g><text x="46" y="16" font-size="11" font-family="sans-serif" fill="#1f2937">circumference (cm)</text><line x1="40" y1="190" x2="280" y2="33" stroke="#6366f1" stroke-width="1.5"/><g fill="#b91c1c"><circle cx="64" cy="174" r="3.5"/><circle cx="112" cy="143" r="3.5"/><circle cx="160" cy="111" r="3.5"/><circle cx="208" cy="80" r="3.5"/><circle cx="256" cy="49" r="3.5"/></g></svg>`,
        options: ["About 0.32", "About 3.14", "About 6.28", "About 1"],
        answerIndex: 1,
        explanation:
          "Gradient = rise ÷ run = circumference ÷ diameter. For example, at diameter 10 the line is at about 31.4, and 31.4 ÷ 10 = 3.14. The gradient is **π ≈ 3.14**. The graph shows that C = πd is a direct proportion. About 0.32 is diameter ÷ circumference, which is upside down. About 6.28 is 2π, which would be circumference ÷ radius.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "Gradient = change in y ÷ change in x.",
          "Read a point on the line, such as diameter 10. What circumference is it at?",
          "Circumference ÷ diameter is a famous number.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "circles-m3-q08",
        question:
          "Ravi works out the circumference of a circle with radius 6 cm: ‘C = π × 6 = 18.85 cm.’ What was his mistake?",
        options: [
          "He should have squared the 6",
          "He should have divided 6 by π",
          "He put the radius into C = πd; he needed the diameter, 12 cm",
          "He should have used π = 3",
        ],
        answerIndex: 2,
        explanation:
          "C = πd needs the diameter: π × 12 ≈ 37.7 cm (or use 2πr = 2 × π × 6). Ravi's answer is exactly half of this. Squaring the 6 would give the *area*, πr², which isn't what was asked. Using π = 3 would only make the answer less accurate; it doesn't fix the halving.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Which measurement does C = πd use?",
          "Is 6 cm the radius or the diameter here?",
          "Compare Ravi's answer with π × 12.",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "circles-m3-q09",
        question:
          "A 30 cm (diameter) pizza costs $24 and a 20 cm pizza costs $12. Both are the same thickness. Which is better value for money?",
        options: [
          "The 20 cm pizza: $12 buys 20 cm but $24 buys only 30 cm, so you get more pizza per dollar",
          "Neither: twice the price buys twice the pizza",
          "You can't tell without knowing π exactly",
          "The 30 cm pizza: it has 2.25 times the area for 2 times the price",
        ],
        answerIndex: 3,
        explanation:
          "Compare areas: radius 15 gives 225π cm²; radius 10 gives 100π cm². The ratio is 225 ÷ 100 = 2.25, so the big pizza has **2.25 times the area for 2 times the price**, which is better value. The 20 cm answer compares *diameters*, but you eat area. π doesn't need to be known exactly, because it cancels when you compare 225π with 100π.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "When you eat a pizza, which measurement matters: the diameter or the area?",
          "Areas: π × 15² and π × 10².",
          "How many times bigger is 225π than 100π? Compare that with how many times dearer it is.",
        ],
        strategy: "Compare ratios",
      },
      {
        kind: "mcq",
        id: "circles-m3-q10",
        question: "Circle P has circumference 50 cm. Circle Q has diameter 16 cm. Which is bigger?",
        options: [
          "Q, but only just",
          "P, by a lot",
          "They are exactly the same size",
          "You can't compare a circumference with a diameter",
        ],
        answerIndex: 0,
        explanation:
          "Convert one to match the other. P's diameter = 50 ÷ π ≈ 15.9 cm, which is a little less than 16 cm. Or Q's circumference = π × 16 ≈ 50.3 cm, a little more than 50 cm. So **Q is bigger, but only just**. ‘P, by a lot’ comes from comparing 50 with 16 directly, mixing a distance round with a distance across. They *can* be compared once both are the same kind of measurement.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Turn both into the same kind of measurement.",
          "Find P's diameter: d = C ÷ π.",
          "50 ÷ π ≈ ? Compare it with 16.",
        ],
        strategy: "Convert to the same form",
      },
      {
        kind: "mcq",
        id: "circles-m3-q11",
        question: "A semicircle has diameter 14 cm. Using π = {{22/7}}, what is its area?",
        options: ["154 cm²", "77 cm²", "308 cm²", "22 cm²"],
        answerIndex: 1,
        explanation:
          "r = 7, so the whole circle is {{22/7}} × 49 = 22 × 7 = 154 cm². Half of it is **77 cm²**. 154 cm² forgets to halve. 308 cm² uses 14 as the radius. 22 cm² is half the circumference ({{22/7}} × 14 ÷ 2), which is a length. Using {{22/7}} makes this easy, because 7 cancels into 49.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Find the radius first.",
          "Whole circle: {{22/7 * 7^2}}. Cancel the 7 before multiplying.",
          "Then halve it.",
        ],
        strategy: "Whole circle first, then take the fraction",
      },
      {
        kind: "mcq",
        id: "circles-m3-q12",
        question:
          "A 20 cm by 10 cm rectangle has a semicircle of diameter 10 cm cut out of each short end. Using π = 3.14, what is the shaded area that is left?",
        diagram: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 20 cm by 10 cm rectangle with a semicircular notch of diameter 10 cm cut into each of its two short ends. The remaining shape is shaded."><rect width="400" height="230" fill="#ffffff"/><path d="M 40 30 L 360 30 A 80 80 0 0 0 360 190 L 40 190 A 80 80 0 0 0 40 30 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="30" x2="40" y2="190" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="360" y1="30" x2="360" y2="190" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="200" y="22" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20 cm</text><text x="32" y="114" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">10 cm</text></svg>`,
        options: ["278.5 cm²", "160.75 cm²", "121.5 cm²", "168.6 cm²"],
        answerIndex: 2,
        explanation:
          "Rectangle = 20 × 10 = 200 cm². The two semicircles of diameter 10 make one whole circle of radius 5: 3.14 × 25 = 78.5 cm². Shaded = 200 − 78.5 = **121.5 cm²**. 278.5 cm² adds the semicircles, but they are cut out. 160.75 cm² removes only one semicircle. 168.6 cm² subtracts the circumference, 31.4, instead of an area.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Start with the full rectangle, then take away what's missing.",
          "Two semicircles of diameter 10 cm make one whole circle.",
          "200 − 3.14 × 5²",
        ],
        strategy: "Subtract the unshaded part",
      },
      {
        kind: "mcq",
        id: "circles-m3-q13",
        question: "A circle has area 50.24 cm². Using π = 3.14, what is its radius?",
        options: ["16 cm", "8 cm", "25.12 cm", "4 cm"],
        answerIndex: 3,
        explanation:
          "πr² = 50.24, so r² = 50.24 ÷ 3.14 = 16, and r = √16 = **4 cm**. Check: 3.14 × 4² = 50.24 ✓. 16 cm forgets the square root, because 16 is r², not r. 8 cm is the diameter; you also get it by dividing by 2π, as if 50.24 were a circumference. 25.12 cm just halves the area.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Work backwards through A = πr².",
          "First undo ‘× π’: 50.24 ÷ 3.14 = ?",
          "That gives r². What undoes squaring?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "circles-m3-q14",
        question:
          "The minute hand of a clock is 10 cm long. How far does its tip travel in 20 minutes? Use π = 3.14.",
        options: ["About 20.9 cm", "About 10.5 cm", "About 104.7 cm", "About 12.6 cm"],
        answerIndex: 0,
        explanation:
          "In 60 minutes the tip goes once round: 2 × 3.14 × 10 = 62.8 cm. 20 minutes is {{20/60 = 1/3}} of a turn, so it travels 62.8 ÷ 3 ≈ **20.9 cm**. 12.6 cm treats 20 minutes as 20% of a turn, but an hour has 60 minutes, not 100. 10.5 cm uses π × 10, which forgets the 2 in 2πr. 104.7 cm uses the area.",
        difficulty: "core",
        guideRef: "arcs-sectors",
        hints: [
          "How far does the tip go in a whole hour?",
          "One full turn = 2 × 3.14 × 10 = 62.8 cm.",
          "What fraction of an hour is 20 minutes?",
        ],
        strategy: "Fraction of the whole circle",
      },
      {
        kind: "mcq",
        id: "circles-m3-q15",
        question:
          "The shape is a square of side 10 cm with a semicircle on its top edge. Using π = 3.14, what is its perimeter?",
        diagram: `<svg viewBox="0 0 260 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 10 cm with a semicircle sitting on its top edge. A dashed line shows the join between the square and the semicircle."><rect width="260" height="310" fill="#ffffff"/><path d="M 50 280 L 50 120 A 80 80 0 0 1 210 120 L 210 280 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="50" y1="120" x2="210" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="130" y="300" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text></svg>`,
        options: ["55.7 cm", "45.7 cm", "61.4 cm", "139.25 cm"],
        answerIndex: 1,
        explanation:
          "Walk round the outside: three sides of the square (3 × 10 = 30 cm) plus the semicircle's arc (half of 3.14 × 10 = 15.7 cm). Perimeter = **45.7 cm**. 55.7 cm also counts the dashed top edge, but that edge is inside the shape. 61.4 cm uses a whole circumference. 139.25 cm is the *area* (100 + 39.25), and it has the wrong units.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Perimeter means the outside edge only. Which square sides are on the outside?",
          "The arc is half of π × 10.",
          "30 + 15.7",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m3-q16",
        question: "O is the centre of the circle. A and B are on the circle, and angle OAB = 35°. What is angle AOB?",
        diagram: `<svg viewBox="0 0 300 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre O. Points A and B on the circle are joined to O and to each other, forming triangle OAB. The angle at A is marked 35 degrees."><rect width="300" height="230" fill="#ffffff"/><circle cx="150" cy="120" r="90" fill="none" stroke="#1f2937" stroke-width="2"/><polygon points="150,120 76.28,171.62 223.72,171.62" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><path d="M 98.28 171.62 A 22 22 0 0 0 94.3 159" fill="none" stroke="#1f2937" stroke-width="1.5"/><circle cx="150" cy="120" r="3" fill="#1f2937"/><text x="150" y="110" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">O</text><text x="66" y="182" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">A</text><text x="234" y="182" font-size="13" font-family="sans-serif" fill="#1f2937">B</text><text x="104" y="166" font-size="12" font-family="sans-serif" fill="#1f2937">35°</text></svg>`,
        options: ["35°", "145°", "110°", "55°"],
        answerIndex: 2,
        explanation:
          "OA and OB are both radii, so triangle OAB is **isosceles** and angle OBA = 35° too. Angle AOB = 180° − 35° − 35° = **110°**. 145° (180° − 35°) forgets the second equal angle. 55° assumes a right angle somewhere, but nothing here is 90°. 35° assumes all three angles are equal, but the triangle would then have to be equilateral with 60° angles.",
        difficulty: "core",
        guideRef: "parts-of-a-circle",
        hints: [
          "What do you know about the lengths OA and OB?",
          "Both are radii, so the triangle is isosceles. Which angles are equal?",
          "Angles in a triangle add up to 180°.",
        ],
        strategy: "Spot equal lengths",
      },
      {
        kind: "mcq",
        id: "circles-m3-q17",
        question:
          "A rope fits tightly round the equator of a perfectly round Earth (circumference about 40 000 km). The rope is made 2 m longer and lifted so that it is the same height above the ground all the way round. About how high is the gap?",
        options: ["Less than 1 mm", "About 64 cm", "About 2 m", "About 32 cm"],
        answerIndex: 3,
        explanation:
          "Call the Earth's radius R and the gap h. Before: rope = 2πR. After: rope = 2π(R + h) = 2πR + 2πh. The extra length is 2πh = 2, so h = 2 ÷ 2π ≈ 0.32 m, **about 32 cm**, whatever the size of the Earth! ‘Less than 1 mm’ is the gut feeling that 2 m is nothing compared with 40 000 km, but R cancels out completely. 64 cm comes from dividing by π instead of 2π. 2 m mixes up the extra length with the extra height.",
        difficulty: "challenge",
        guideRef: "circumference",
        hints: [
          "Call the Earth's radius R and the gap h. Write the rope's length before and after.",
          "Before: 2πR. After: 2π(R + h). Expand the bracket.",
          "The difference is 2πh, and that equals 2 m. Solve for h.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "circles-m3-q18",
        question:
          "A square and a circle both have a perimeter of 16 cm. Using the π button, which has the larger area?",
        options: [
          "The circle, by about 4 cm²",
          "The square, by about 4 cm²",
          "Neither: equal perimeters mean equal areas",
          "The square, because its corners take up extra space",
        ],
        answerIndex: 0,
        explanation:
          "Square: side 4 cm, area 16 cm². Circle: 2πr = 16, so r = 8 ÷ π ≈ 2.55 cm, and the area is π × 2.55² ≈ 20.4 cm². So **the circle wins by about 4 cm²**. Equal perimeters do *not* force equal areas. In fact, of all shapes with a given perimeter, the circle encloses the most area (the 3D version of this fact is why soap bubbles are round). The square's corners are the tempting answer, but they actually ‘waste’ boundary.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "Find the square's side, then its area.",
          "For the circle, use 2πr = 16 to find r.",
          "r = 8 ÷ π ≈ 2.55 cm. Now find πr².",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "circles-m3-q19",
        question:
          "In a 10 cm square, two quarter circles of radius 10 cm are drawn, centred at opposite corners. Using π = 3.14, what is the area of the shaded leaf shape where they overlap?",
        diagram: `<svg viewBox="0 0 320 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 10 cm square with two quarter-circle arcs of radius 10 cm, centred at the bottom-left and top-right corners. The leaf-shaped overlap along the diagonal is shaded."><rect width="320" height="250" fill="#ffffff"/><rect x="60" y="20" width="200" height="200" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M 60 20 A 200 200 0 0 1 260 220 A 200 200 0 0 1 60 20 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="60" cy="220" r="3" fill="#1f2937"/><circle cx="260" cy="20" r="3" fill="#1f2937"/><text x="160" y="240" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text></svg>`,
        options: ["78.5 cm²", "57 cm²", "43 cm²", "21.5 cm²"],
        answerIndex: 1,
        explanation:
          "Each quarter circle has area {{1/4}} × 3.14 × 100 = 78.5 cm². Together they cover the whole square, but the leaf is counted twice. So 78.5 + 78.5 = 100 + leaf, and leaf = 157 − 100 = **57 cm²**. 78.5 cm² is one quarter circle. 43 cm² is the unshaded part of the square, 100 − 57. 21.5 cm² is just one unshaded corner, 100 − 78.5.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Add the two quarter circles. Which part gets counted twice?",
          "The two quarter circles together cover the square, with the leaf covered twice.",
          "Quarter + quarter = square + leaf.",
        ],
        strategy: "Add and subtract overlapping areas",
      },
      {
        kind: "mcq",
        id: "circles-m3-q20",
        question: "A sector of a circle with radius 9 cm has an arc length of {{6pi}} cm. What is the angle of the sector?",
        options: ["240°", "60°", "26.7°", "120°"],
        answerIndex: 3,
        explanation:
          "The full circumference is 2π × 9 = 18π. The arc is {{(6pi)/(18pi) = 1/3}} of it, so the angle is {{1/3}} × 360° = **120°**. 240° uses π × 9 for the full circle, which forgets the 2. 60° takes {{1/3}} of 180° instead of 360°. 26.7° compares the arc with the area, 81π.",
        difficulty: "challenge",
        guideRef: "arcs-sectors",
        hints: [
          "What is the circumference of the whole circle?",
          "What fraction of 18π is 6π?",
          "Take that fraction of 360°.",
        ],
        strategy: "Fraction of the whole circle",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 4
  // ===========================================================================
  {
    id: "circles-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "circles-m4-q01",
        question: "A circle has diameter 15 cm and centre O. Point P is 8 cm from O. Where is P?",
        options: ["Inside the circle", "Exactly on the circle", "You can't tell without a diagram", "Outside the circle"],
        answerIndex: 3,
        explanation:
          "The radius is 15 ÷ 2 = 7.5 cm, so every point on the circle is 7.5 cm from O. P is 8 cm away, which is further, so P is **outside the circle**. ‘Inside’ comes from comparing 8 with the diameter 15, but distance from the centre must be compared with the radius.",
        difficulty: "warmup",
        guideRef: "parts-of-a-circle",
        hints: ["How far from O is every point on the circle?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m4-q02",
        question: "Using π = 3.14, what is the area of a circle with radius 10 cm?",
        options: ["314 cm²", "62.8 cm²", "31.4 cm²", "1256 cm²"],
        answerIndex: 0,
        explanation:
          "A = πr² = 3.14 × 10² = 3.14 × 100 = **314 cm²**. 62.8 cm² is the circumference (2πr), a length. 31.4 cm² forgets to square the radius. 1256 cm² squares the diameter 20 instead of the radius.",
        difficulty: "warmup",
        guideRef: "area-of-a-circle",
        hints: ["Square the radius first, then multiply by 3.14."],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m4-q03",
        question: "What is the exact circumference of a circle with diameter 9 cm?",
        options: ["{{18pi}} cm", "{{9pi}} cm", "{{81pi}} cm", "{{4.5pi}} cm"],
        answerIndex: 1,
        explanation:
          "C = πd = π × 9 = **{{9pi}} cm** (about 28.3 cm). {{18pi}} treats 9 as the radius in 2πr. {{4.5pi}} halves the diameter and then uses πd, which gives half the circumference. {{81pi}} squares the 9, as if finding an area.",
        difficulty: "warmup",
        guideRef: "circumference",
        hints: ["You are given the diameter. Which formula uses it directly?"],
        strategy: "Use the formula",
      },
      {
        kind: "mcq",
        id: "circles-m4-q04",
        question: "Which shape's perimeter is made of one curved edge and **two** straight edges?",
        options: ["A semicircle", "A full circle", "A quarter circle", "A segment"],
        answerIndex: 2,
        explanation:
          "A **quarter circle** is bounded by an arc and two radii. A semicircle has only one straight edge, its diameter. A segment also has just one straight edge (a chord), and a full circle has none.",
        difficulty: "warmup",
        guideRef: "semicircles-quarter-circles",
        hints: ["Sketch each shape and count its straight edges."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "circles-m4-q05",
        question: "A circle has diameter exactly 1 m. What is its exact circumference?",
        options: ["{{2pi}} m", "{{pi/2}} m", "{{1/pi}} m", "{{pi}} m"],
        answerIndex: 3,
        explanation:
          "π is *defined* as circumference ÷ diameter, so when d = 1, C = **π m** ≈ 3.14 m. {{2pi}} m treats the 1 m as a radius. {{pi/2}} m halves the diameter first and then uses C = πd. {{1/pi}} m divides by π instead of multiplying.",
        difficulty: "warmup",
        guideRef: "discovering-pi",
        hints: ["π = circumference ÷ diameter. What happens when the diameter is 1?"],
      },
      {
        kind: "mcq",
        id: "circles-m4-q06",
        question: "Which statement is **false**?",
        options: [
          "Every diameter is a chord",
          "Every chord is a diameter",
          "Every diameter passes through the centre",
          "Every diameter is twice as long as a radius",
        ],
        answerIndex: 1,
        explanation:
          "A diameter is a special chord, the one through the centre, so ‘every diameter is a chord’ is true. But most chords miss the centre, so **‘every chord is a diameter’ is false**. It's like saying every rectangle is a square: the special case doesn't work backwards.",
        difficulty: "core",
        guideRef: "parts-of-a-circle",
        hints: [
          "Draw a chord that is near the edge of a circle. Is it a diameter?",
          "A diameter is a chord with one extra property. Which one?",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "mcq",
        id: "circles-m4-q07",
        question:
          "Siti draws a circle of radius 10 squares on squared paper and counts about 314 squares inside it. Which calculation turns her count into an estimate of π?",
        options: ["314 ÷ 100", "314 ÷ 10", "314 ÷ 20", "314 ÷ 400"],
        answerIndex: 0,
        explanation:
          "A = πr², so π = A ÷ r² = 314 ÷ 10² = **314 ÷ 100** = 3.14. 314 ÷ 10 divides by r instead of r², giving 31.4. 314 ÷ 20 divides by the diameter. 314 ÷ 400 divides by the area of the surrounding 20 × 20 square, which gives {{pi/4}} ≈ 0.785, the fraction of the square that the circle fills.",
        difficulty: "core",
        guideRef: "discovering-pi",
        hints: [
          "Which formula links area, radius and π?",
          "A = πr². Rearrange it to make π the subject.",
          "π = A ÷ r²",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "circles-m4-q08",
        question:
          "Marcus runs laps of a circular track of diameter 50 m. Using the π button, what is the smallest number of complete laps he must run to cover **at least** 1 km?",
        options: ["6", "13", "7", "4"],
        answerIndex: 2,
        explanation:
          "One lap = π × 50 ≈ 157.1 m. 1000 ÷ 157.1 ≈ 6.37, so 6 laps (about 942 m) is not quite enough and he needs **7 laps**. 6 comes from rounding down, but ‘at least’ means you must round up. 13 uses the radius in C = πd (π × 25 per lap). 4 uses 50 as the radius (2π × 50 per lap).",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "How long is one lap?",
          "One lap = π × 50 m. How many of those fit into 1000 m?",
          "If the answer isn't a whole number, should you round up or down here?",
        ],
        strategy: "Interpret the answer in context",
      },
      {
        kind: "mcq",
        id: "circles-m4-q09",
        question: "A circle has area {{49pi}} cm². What is its exact circumference?",
        options: ["{{7pi}} cm", "{{98pi}} cm", "{{14pi}} cm", "{{49pi}} cm"],
        answerIndex: 2,
        explanation:
          "πr² = 49π, so r² = 49 and r = 7. Then C = 2π × 7 = **{{14pi}} cm**. {{7pi}} uses the radius in C = πd. {{98pi}} puts 49 into 2πr as if it were the radius, but 49 is r², not r. {{49pi}} treats r² as 2r: then 2r = 49, so the diameter would be 49 and C = 49π.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Use the area to find the radius first.",
          "πr² = 49π, so r² = 49.",
          "r = 7. Now use C = 2πr.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "circles-m4-q10",
        question:
          "Zara writes: ‘A circle of radius 5 cm has circumference 2 × π × 5 = 10π = 31.4 cm exactly.’ What is wrong?",
        options: [
          "{{10pi}} is right, but 31.4 cm is only an approximation, so ‘exactly’ is wrong",
          "It should be {{25pi}}",
          "It should be {{5pi}}",
          "Nothing: 31.4 cm is exact",
        ],
        answerIndex: 0,
        explanation:
          "{{10pi}} cm is the exact answer. Because π is irrational, 10π = 31.4159…, so **31.4 cm is a rounded value, not an exact one**. That's why questions say ‘in terms of π’ when they want an exact answer. {{25pi}} is the area, πr². {{5pi}} uses the radius in C = πd.",
        difficulty: "core",
        guideRef: "circumference",
        hints: [
          "Check the method first: is 2 × π × 5 right for a circumference?",
          "Now think about π: does its decimal ever end?",
          "Is 10 × 3.14159… exactly 31.4?",
        ],
        strategy: "Spot the error",
      },
      {
        kind: "mcq",
        id: "circles-m4-q11",
        question:
          "A semicircular window has a straight bottom edge of 1.2 m. Using π = 3.14, what is the area of glass?",
        options: ["1.1304 m²", "2.2608 m²", "1.884 m²", "0.5652 m²"],
        answerIndex: 3,
        explanation:
          "The straight edge is the diameter, so r = 0.6 m. Whole circle: 3.14 × 0.36 = 1.1304 m². Half of it: **0.5652 m²**. 1.1304 m² forgets to halve. 2.2608 m² uses 1.2 m as the radius. 1.884 m² is half the circumference, a length.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "Is the straight edge of a semicircle a radius or a diameter?",
          "r = 0.6 m, and 0.6² = 0.36.",
          "Find the whole circle's area, then halve it.",
        ],
        strategy: "Find the radius first",
      },
      {
        kind: "mcq",
        id: "circles-m4-q12",
        question:
          "A semicircle and a quarter circle both have radius 6 cm. Using π = 3.14, how much longer is the semicircle's perimeter than the quarter circle's?",
        options: ["9.42 cm", "15.42 cm", "28.26 cm", "6 cm"],
        answerIndex: 0,
        explanation:
          "Semicircle: arc 18.84 + diameter 12 = 30.84 cm. Quarter circle: arc 9.42 + two radii 12 = 21.42 cm. Difference = **9.42 cm**. Neat shortcut: both have 12 cm of straight edges, so the difference is just the arcs, 18.84 − 9.42. 15.42 cm gives the quarter circle only one radius. 6 cm assumes the only difference is one extra radius, ignoring the arcs. 28.26 cm is the difference in *areas*.",
        difficulty: "core",
        guideRef: "semicircles-quarter-circles",
        hints: [
          "List the edges of each shape: curved parts and straight parts.",
          "The semicircle has a diameter; the quarter circle has two radii. Compare their totals.",
          "If the straight parts are equal, you only need to compare the arcs.",
        ],
        strategy: "Look for what's the same",
      },
      {
        kind: "mcq",
        id: "circles-m4-q13",
        question:
          "A triangle is drawn inside a semicircle of diameter 10 cm. Its corners are at both ends of the diameter and at the top of the arc. Using π = 3.14, what is the shaded area inside the semicircle but outside the triangle?",
        diagram: `<svg viewBox="0 0 320 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A semicircle on a 10 cm diameter. A triangle joins both ends of the diameter to the top of the arc. The two regions between the triangle and the arc are shaded."><rect width="320" height="215" fill="#ffffff"/><path d="M 40 180 A 120 120 0 0 1 280 180 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="40,180 160,60 280,180" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><circle cx="160" cy="180" r="3" fill="#1f2937"/><text x="160" y="200" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text></svg>`,
        options: ["39.25 cm²", "14.25 cm²", "53.5 cm²", "64.25 cm²"],
        answerIndex: 1,
        explanation:
          "Semicircle: r = 5, so the area is ½ × 3.14 × 25 = 39.25 cm². The triangle has base 10 and height 5 (the top of the arc is one radius above the centre), so its area is ½ × 10 × 5 = 25 cm². Shaded = 39.25 − 25 = **14.25 cm²**. 39.25 cm² is the whole semicircle. 53.5 cm² subtracts the triangle from a *full* circle. 64.25 cm² adds instead of subtracting.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Shaded = semicircle − triangle.",
          "How tall is the triangle? The top of the arc is directly above the centre.",
          "Height = radius = 5 cm. Triangle = ½ × 10 × 5.",
        ],
        strategy: "Subtract the unshaded part",
      },
      {
        kind: "mcq",
        id: "circles-m4-q14",
        question:
          "An ice-cream cone shape is a triangle (base 8 cm, height 12 cm) with a semicircle of diameter 8 cm on its base. Using π = 3.14, what is its total area?",
        diagram: `<svg viewBox="0 0 320 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An ice-cream shape: a triangle pointing downwards with base 8 cm and height 12 cm, and a semicircle of diameter 8 cm sitting on its base."><rect width="320" height="310" fill="#ffffff"/><path d="M 96 100 A 64 64 0 0 1 224 100 L 160 292 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="96" y1="100" x2="224" y2="100" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="160" y1="100" x2="160" y2="292" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M 160 112 L 172 112 L 172 100" fill="none" stroke="#334155" stroke-width="1.5"/><text x="160" y="90" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text><text x="168" y="210" font-size="13" font-family="sans-serif" fill="#1f2937">12 cm</text></svg>`,
        options: ["98.24 cm²", "121.12 cm²", "148.48 cm²", "73.12 cm²"],
        answerIndex: 3,
        explanation:
          "Triangle: ½ × 8 × 12 = 48 cm². Semicircle: r = 4, so ½ × 3.14 × 16 = 25.12 cm². Total = **73.12 cm²**. 121.12 cm² forgets the ½ in the triangle formula (96 + 25.12). 98.24 cm² adds a whole circle, not half. 148.48 cm² uses 8 as the radius.",
        difficulty: "core",
        guideRef: "compound-circle-shapes",
        hints: [
          "Split the shape into a triangle and a semicircle.",
          "Triangle = ½ × base × height.",
          "The semicircle's radius is half of 8 cm.",
        ],
        strategy: "Split into simpler shapes",
      },
      {
        kind: "mcq",
        id: "circles-m4-q15",
        question: "A circular clock face has diameter 28 cm. Using π = {{22/7}}, what is its area?",
        options: ["88 cm²", "2464 cm²", "616 cm²", "44 cm²"],
        answerIndex: 2,
        explanation:
          "r = 14, so A = {{22/7}} × 14² = {{22/7}} × 196 = 22 × 28 = **616 cm²**. 88 cm² is the circumference ({{22/7}} × 28), a length. 2464 cm² squares the diameter instead of the radius. 44 cm² is {{22/7}} × 14, which forgets to square.",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Find the radius first.",
          "r² = 14² = 196.",
          "196 ÷ 7 = 28, then multiply by 22.",
        ],
        strategy: "Cancel before multiplying",
      },
      {
        kind: "mcq",
        id: "circles-m4-q16",
        question:
          "Ethan filled in this table using π = 3.14. Exactly one entry is wrong. Which one?\n\n| Radius (cm) | Diameter (cm) | Circumference (cm) | Area (cm²) |\n|---|---|---|---|\n| 2 | 4 | 12.56 | 12.56 |\n| 5 | 10 | 31.4 | 78.5 |\n| 10 | 20 | 62.8 | 628 |",
        options: [
          "12.56, the circumference when r = 2",
          "12.56, the area when r = 2",
          "31.4, the circumference when r = 5",
          "628, the area when r = 10",
        ],
        answerIndex: 3,
        explanation:
          "When r = 10, the area is 3.14 × 10² = 314 cm², so **628** is wrong; it is double, perhaps from 2πr². The two 12.56 entries look suspicious, but both are right: when r = 2, 2πr = 4π and πr² = 4π. That is the one radius where the numbers match. The circumference 31.4 for r = 5 is correct (3.14 × 10).",
        difficulty: "core",
        guideRef: "area-of-a-circle",
        hints: [
          "Check each entry with C = 2πr and A = πr².",
          "Don't assume two equal numbers in one row must be a mistake. Check them.",
          "What is 3.14 × 10²?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "circles-m4-q17",
        question:
          "O is the centre of a circle of radius 7 cm. A and B are points on the circle with angle AOB = 60°. How long is the chord AB?",
        options: ["14 cm", "7 cm", "3.5 cm", "{{7pi/3}} cm"],
        answerIndex: 1,
        explanation:
          "OA = OB = 7 cm (radii), so triangle OAB is isosceles. Its base angles are (180° − 60°) ÷ 2 = 60° each, so all three angles are 60° and the triangle is **equilateral**: AB = **7 cm**. {{7pi/3}} cm (about 7.33 cm) is the *arc* AB, which is the curved route and a little longer than the straight chord. 14 cm is the diameter, the longest possible chord. 3.5 cm halves the radius, but nothing here is halved.",
        difficulty: "challenge",
        guideRef: "parts-of-a-circle",
        hints: [
          "Sketch it. What do you know about OA and OB?",
          "Triangle OAB is isosceles. Work out its other two angles.",
          "What kind of triangle has three 60° angles?",
        ],
        strategy: "Spot equal lengths",
      },
      {
        kind: "mcq",
        id: "circles-m4-q18",
        question:
          "A cylindrical glass of radius 3 cm holds water 10 cm deep. All the water is poured into a cylindrical jug of radius 6 cm. How deep is the water in the jug? (Volume of water = area of circular base × depth.)",
        options: ["2.5 cm", "5 cm", "40 cm", "1.25 cm"],
        answerIndex: 0,
        explanation:
          "Volume = π × 3² × 10 = 90π cm³. In the jug, π × 6² × depth = 90π, so 36 × depth = 90 and depth = **2.5 cm**. Doubling the radius makes the base area 2² = 4 times bigger, so the depth is 4 times smaller. 5 cm assumes that doubling the radius only doubles the area. 40 cm multiplies by 4 instead of dividing; a wider jug can't make the water deeper. 1.25 cm divides by 2³ = 8, as if it were a volume scale factor.",
        difficulty: "challenge",
        guideRef: "area-of-a-circle",
        hints: [
          "The amount of water doesn't change. Work out its volume.",
          "Glass: π × 3² × 10 = 90π cm³.",
          "Jug: π × 6² × depth = 90π. Solve for depth, or ask how many times bigger the base area is.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "circles-m4-q19",
        question:
          "Four semicircles are drawn inside a 4 cm square, each with one side of the square as its diameter. Using π = 3.14, what is the total area of the four shaded petals where the semicircles overlap?",
        diagram: `<svg viewBox="0 0 320 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 4 cm square with a semicircle drawn inwards on each side. The semicircles overlap in four petal shapes that meet at the centre, and the petals are shaded."><rect width="320" height="260" fill="#ffffff"/><rect x="60" y="20" width="200" height="200" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><g fill="#fecaca" stroke="none"><path d="M 60 220 A 100 100 0 0 1 160 120 A 100 100 0 0 1 60 220 Z"/><path d="M 60 20 A 100 100 0 0 1 160 120 A 100 100 0 0 1 60 20 Z"/><path d="M 260 20 A 100 100 0 0 1 160 120 A 100 100 0 0 1 260 20 Z"/><path d="M 260 220 A 100 100 0 0 1 160 120 A 100 100 0 0 1 260 220 Z"/></g><g fill="none" stroke="#1f2937" stroke-width="1.5"><path d="M 60 220 A 100 100 0 0 1 260 220"/><path d="M 60 20 A 100 100 0 0 1 60 220"/><path d="M 260 20 A 100 100 0 0 1 60 20"/><path d="M 260 220 A 100 100 0 0 1 260 20"/></g><text x="160" y="242" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text></svg>`,
        options: ["25.12 cm²", "6.88 cm²", "9.12 cm²", "12.56 cm²"],
        answerIndex: 2,
        explanation:
          "Each semicircle has r = 2, so its area is ½ × 3.14 × 4 = 6.28 cm², and all four total 25.12 cm². Together they cover the whole square once, and the petals twice. So 25.12 = 16 + petals, and petals = **9.12 cm²**. 25.12 cm² is the four semicircles, with the petals counted twice. 6.88 cm² is the unshaded part, 16 − 9.12. 12.56 cm² is only two semicircles.",
        difficulty: "challenge",
        guideRef: "compound-circle-shapes",
        hints: [
          "Add up the four semicircles. Which regions get counted more than once?",
          "Every point of the square is inside at least one semicircle; the petals are inside two.",
          "Total of semicircles = square + petals.",
        ],
        strategy: "Add and subtract overlapping areas",
      },
      {
        kind: "mcq",
        id: "circles-m4-q20",
        question: "A sector has radius 12 cm and angle 30°. What is its exact **perimeter**?",
        options: ["{{2pi}} cm", "{{2pi + 24}} cm", "{{12pi + 24}} cm", "{{2pi + 12}} cm"],
        answerIndex: 1,
        explanation:
          "30° is {{30/360 = 1/12}} of a turn. Arc = {{1/12}} × 2π × 12 = 2π cm. The perimeter also includes **two** radii: 12 + 12 = 24 cm. Perimeter = **{{2pi + 24}} cm**. {{2pi}} is the arc alone. {{2pi + 12}} adds only one radius. {{12pi + 24}} uses the sector's *area*, {{1/12}} × 144π, in place of the arc length.",
        difficulty: "challenge",
        guideRef: "arcs-sectors",
        hints: [
          "A sector's edge is an arc plus two straight radii.",
          "What fraction of a full turn is 30°?",
          "Arc = {{1/12}} of 2π × 12. Then add 12 + 12.",
        ],
        strategy: "Fraction of the whole circle",
      },
    ],
  },
];
