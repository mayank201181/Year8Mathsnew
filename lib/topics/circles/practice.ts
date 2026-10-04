import type { TopicPractice } from "../../types.ts";

// ---------------------------------------------------------------------------
// Circles — quick quiz, two practice papers and an AoPS-style challenge set.
// ---------------------------------------------------------------------------

export const practice: TopicPractice = {
  // ============================== QUIZ ======================================
  quiz: [
    {
      kind: "mcq",
      id: "circles-quiz-q01",
      question: "A chord of a circle passes through the centre of the circle. What is a chord like this called?",
      options: ["A radius", "A diameter", "A tangent", "An arc"],
      answerIndex: 1,
      explanation:
        "A chord joins two points on the circle. If it goes through the centre it is a **diameter**, the longest possible chord. A radius only goes from the centre to the circle (half a diameter). A tangent touches the circle at just one point, and an arc is curved, not straight.",
      difficulty: "warmup",
      guideRef: "parts-of-a-circle",
      hints: ["A chord is a straight line joining two points on the circle. What is special about one that goes right through the middle?"],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "circles-quiz-q02",
      question: "A circle has radius 5 cm. Find its circumference in terms of π. (Type it like 3π or 3pi.)",
      answer: { type: "expression", expr: "10pi", display: "{{10 pi}} cm" },
      solution: ["A radius is given, so use {{C = 2 pi r}}.", "{{C = 2 * pi * 5 = 10 pi}} cm."],
      traps: [
        { spec: { type: "expression", expr: "5pi" }, feedback: "That's {{pi r}}. The circumference is π × the **diameter**, and the diameter is 2 × 5 = 10 cm." },
        { spec: { type: "expression", expr: "25pi" }, feedback: "{{25 pi}} is {{pi r^2}}, the **area**. The distance round the circle is {{2 pi r}}." },
      ],
      commonError: "Using {{pi r}} (forgetting that the diameter is twice the radius), or mixing up circumference with area.",
      difficulty: "warmup",
      guideRef: "circumference",
      hints: ["Which formula uses the radius: {{C = pi d}} or {{C = 2 pi r}}?"],
    },
    {
      kind: "short",
      id: "circles-quiz-q03",
      question: "A circular coaster has radius 4 cm. Using π = 3.14, find its area in cm².",
      answer: { type: "number", value: 50.24 },
      solution: ["{{A = pi r^2}}. Square the radius first: {{4^2 = 16}}.", "{{A = 3.14 * 16 = 50.24}} cm²."],
      traps: [
        { spec: { type: "number", value: 25.12 }, feedback: "25.12 is {{2 pi r}}, the circumference. For area, square the radius: {{3.14 * 4^2}}." },
      ],
      commonError: "Working out {{2 pi r}} or {{(pi r)^2}} instead of {{pi * r * r}}.",
      difficulty: "warmup",
      guideRef: "area-of-a-circle",
      hints: ["Area is {{pi r^2}}. Which do you do first: multiply by π, or square the radius?"],
    },
    {
      kind: "mcq",
      id: "circles-quiz-q04",
      question:
        "Siti measures four round objects for a π investigation.\n\n| Object | Diameter (cm) | Circumference (cm) |\n|---|---|---|\n| Coin | 2.5 | 7.9 |\n| Mug | 8.0 | 25.1 |\n| Plate | 12.0 | 75.4 |\n| Clock | 30.0 | 94.2 |\n\nOne row contains a big measuring mistake. Which object is it?",
      options: ["The coin", "The mug", "The plate", "The clock"],
      answerIndex: 2,
      explanation:
        "Work out circumference ÷ diameter for each: coin ≈ 3.16, mug ≈ 3.14, plate ≈ 6.28, clock = 3.14. Every circle should give about 3.14 (π). The plate gives about {{2 * 3.14}}, so Siti probably measured the **radius** (12 cm) instead of the diameter (24 cm). The coin's 3.16 is not exactly π, but a small difference like that is normal measuring error on a tiny object.",
      difficulty: "core",
      guideRef: "discovering-pi",
      hints: [
        "What should circumference ÷ diameter be for every circle?",
        "Divide each circumference by its diameter.",
        "One ratio is about double the others. What measuring slip would double it?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "circles-quiz-q05",
      question: "A circular trampoline has a circumference of 314 cm. Using π = 3.14, find its **radius** in cm.",
      answer: { type: "number", value: 50 },
      solution: [
        "{{C = pi d}}, so {{d = C / pi = 314 / 3.14 = 100}} cm.",
        "The radius is half the diameter: {{100 / 2 = 50}} cm.",
        "Check: {{2 * 3.14 * 50 = 314}} ✓",
      ],
      traps: [
        { spec: { type: "number", value: 100 }, feedback: "100 cm is the diameter. The question asks for the radius, so halve it." },
        { spec: { type: "number", value: 157 }, feedback: "You halved 314, but you need to divide by π first: {{314 / 3.14}} gives the diameter." },
      ],
      commonError: "Stopping at the diameter when the question asks for the radius.",
      difficulty: "core",
      guideRef: "circumference",
      hints: [
        "Work backwards. Which formula links the circumference and the diameter?",
        "{{d = C / pi}}.",
        "You now have the diameter. Is that what the question asks for?",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "short",
      id: "circles-quiz-q06",
      question: "A window is a semicircle with diameter 120 cm. Using π = 3.14, find the perimeter of the window in cm.",
      answer: { type: "number", value: 308.4 },
      solution: [
        "Curved edge = half the circumference: {{1/2 * 3.14 * 120 = 188.4}} cm.",
        "Add the straight edge, which is the diameter: {{188.4 + 120 = 308.4}} cm.",
      ],
      traps: [
        { spec: { type: "number", value: 188.4 }, feedback: "That's only the curved edge. A semicircle's perimeter also includes its straight edge, the 120 cm diameter." },
        { spec: { type: "number", value: 376.8 }, feedback: "376.8 cm is the circumference of the **whole** circle. Take half of it, then add the diameter." },
      ],
      commonError: "Forgetting the straight edge (the diameter).",
      difficulty: "core",
      guideRef: "semicircles-quarter-circles",
      hints: [
        "Trace the edge of a semicircle with your finger. Which two kinds of edge do you go along?",
        "The curved part is half of {{pi d}}.",
        "Don't forget the straight edge.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "mcq",
      id: "circles-quiz-q07",
      question: "Arjun says: *A circle with diameter 10 cm has area {{100 pi}} cm².* What is the correct area?",
      options: ["{{25 pi}} cm²", "{{100 pi}} cm²", "{{10 pi}} cm²", "{{50 pi}} cm²"],
      answerIndex: 0,
      explanation:
        "Halve the diameter to get the radius, 5 cm. Then {{A = pi r^2 = pi * 5^2 = 25 pi}} cm². Arjun's {{100 pi}} squares the diameter, which makes the area 4 times too big. {{10 pi}} is the circumference, and {{50 pi}} comes from halving {{100 pi}} instead of halving the diameter before squaring.",
      difficulty: "core",
      guideRef: "area-of-a-circle",
      hints: ["The formula {{pi r^2}} needs the radius. What is the radius here?", "The radius is 5 cm. Now square it."],
    },
    {
      kind: "short",
      id: "circles-quiz-q08",
      question:
        "The diagram shows a square of side 10 cm. A quarter circle of radius 10 cm is drawn with its centre at one corner of the square. Using π = 3.14, find the area of the shaded region in cm².",
      diagram: `<svg viewBox="0 0 250 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 10 cm. A quarter circle of radius 10 cm is centred at the bottom-left corner. The part of the square outside the quarter circle, in the top-right corner, is shaded."><rect x="0" y="0" width="250" height="210" fill="#ffffff"/><path d="M 220 180 L 220 20 L 60 20 A 160 160 0 0 1 220 180 Z" fill="#fde68a"/><rect x="60" y="20" width="160" height="160" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M 60 20 A 160 160 0 0 1 220 180" fill="none" stroke="#1f2937" stroke-width="2"/><circle cx="60" cy="180" r="3" fill="#1f2937"/><text x="140" y="198" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text><text x="54" y="104" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">10 cm</text></svg>`,
      answer: { type: "number", value: 21.5 },
      solution: [
        "Area of the square: {{10 * 10 = 100}} cm².",
        "Area of the quarter circle: {{1/4 * 3.14 * 10^2 = 78.5}} cm².",
        "Shaded = square − quarter circle = {{100 - 78.5 = 21.5}} cm².",
      ],
      traps: [
        { spec: { type: "number", value: 78.5 }, feedback: "78.5 cm² is the quarter circle. The shaded part is what is **left** of the square." },
      ],
      difficulty: "core",
      guideRef: "compound-circle-shapes",
      hints: [
        "Is the shaded part something added on, or what's left after something is taken away?",
        "Find the area of the whole square and the area of the quarter circle.",
        "Quarter circle = {{1/4}} of {{pi * 10^2}}.",
      ],
      strategy: "Subtract the unshaded part",
    },
    {
      kind: "mcq",
      id: "circles-quiz-q09",
      question: "A sector of a circle has radius 6 cm and angle 120°. What is its area?",
      options: ["{{4 pi}} cm²", "{{36 pi}} cm²", "{{24 pi}} cm²", "{{12 pi}} cm²"],
      answerIndex: 3,
      explanation:
        "120° is {{120/360 = 1/3}} of a full turn, so the sector is {{1/3}} of the circle: {{1/3 * pi * 6^2 = 1/3 * 36 pi = 12 pi}} cm². {{4 pi}} is the arc length ({{1/3}} of the circumference {{12 pi}}), {{36 pi}} is the whole circle, and {{24 pi}} is the other, larger sector (240°).",
      difficulty: "core",
      guideRef: "arcs-sectors",
      hints: ["What fraction of a full turn is 120°?", "Find the area of the whole circle, then take that fraction of it."],
      strategy: "Find the fraction of the circle",
    },
    {
      kind: "written",
      id: "circles-quiz-q10",
      question:
        "For one particular circle, its area (in cm²) and its circumference (in cm) are **the same number**. Find the radius of this circle, and explain why there is only one circle like this.",
      marks: 3,
      modelAnswer:
        "Set the two formulas equal: {{pi r^2 = 2 pi r}}. A real circle has a radius bigger than 0, so I can divide both sides by {{pi r}}, giving {{r = 2}}. The radius is **2 cm**. Check: area {{= pi * 2^2 = 4 pi}} and circumference {{= 2 * pi * 2 = 4 pi}}, the same number.\n\nThere is only one such circle because area ÷ circumference {{= (pi r^2)/(2 pi r) = r/2}}. This equals 1 only when {{r = 2}}. For a bigger radius the area number is bigger; for a smaller radius the circumference number is bigger.",
      markScheme: [
        { point: "Sets area equal to circumference: πr² = 2πr", keywords: ["πr² = 2πr", "pi r^2 = 2 pi r", "equal", "same", "2πr"] },
        { point: "Divides by πr (r is not 0) to get r = 2 cm", keywords: ["divide", "r = 2", "r=2", "2 cm"] },
        { point: "Checks (both 4π) and explains why only one, e.g. area ÷ circumference = r/2", keywords: ["4π", "4pi", "r/2", "only", "bigger", "smaller"] },
      ],
      commonError: "Just trying numbers until one works, without explaining why no other radius can work.",
      difficulty: "challenge",
      guideRef: "area-of-a-circle",
      hints: [
        "Write both formulas using the same letter r and set them equal.",
        "Both sides have a π and an r in common. What can you divide both sides by?",
        "Think about area ÷ circumference. It simplifies to something very simple.",
      ],
      strategy: "Introduce a variable",
    },
  ],

  // ============================= PAPERS =====================================
  papers: [
    {
      id: "circles-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "circles-p1-q01",
          question: "The face of a round clock at an MRT station has radius 45 cm. What is its diameter, in cm?",
          answer: { type: "number", value: 90 },
          solution: ["A diameter goes right across the circle through the centre, so it is two radii.", "{{d = 2r = 2 * 45 = 90}} cm."],
          traps: [{ spec: { type: "number", value: 22.5 }, feedback: "You halved it. The diameter is **twice** the radius: it goes all the way across." }],
          difficulty: "warmup",
          guideRef: "parts-of-a-circle",
          hints: ["How many radii fit across a diameter?"],
        },
        {
          kind: "short",
          id: "circles-p1-q02",
          question:
            "Name the region of a circle that is bounded by **two radii and an arc** (shaped like a slice of pizza). Type one word.",
          answer: { type: "text", accept: ["sector", "a sector", "sectors"], display: "Sector" },
          solution: ["Two radii and the arc between them enclose a **sector**.", "Compare: a chord and an arc enclose a **segment**."],
          traps: [
            { spec: { type: "text", accept: ["segment", "a segment"] }, feedback: "A segment is cut off by a **chord** and an arc. Two radii and an arc make a different region." },
            { spec: { type: "text", accept: ["arc", "an arc"] }, feedback: "An arc is just the curved line. The region it makes with two radii has another name." },
          ],
          difficulty: "warmup",
          guideRef: "parts-of-a-circle",
          hints: ["Think of a slice of pizza: two straight cuts from the centre and a piece of crust."],
        },
        {
          kind: "short",
          id: "circles-p1-q03",
          question: "A circle has diameter 8 cm. Find its circumference in terms of π. (Type it like 3π or 3pi.)",
          answer: { type: "expression", expr: "8pi", display: "{{8 pi}} cm" },
          solution: ["A diameter is given, so use {{C = pi d}}.", "{{C = pi * 8 = 8 pi}} cm."],
          traps: [
            {
              spec: { type: "expression", expr: "16pi" },
              feedback: "{{16 pi}} comes from {{2 * pi * 8}}, which treats 8 as a radius. It's a diameter, so {{C = pi d}}. (By coincidence, {{16 pi}} is also this circle's area.)",
            },
            { spec: { type: "expression", expr: "4pi" }, feedback: "{{4 pi}} uses the radius, 4 cm, in {{C = pi d}}. Either use {{pi * 8}} or {{2 * pi * 4}}." },
          ],
          difficulty: "warmup",
          guideRef: "circumference",
          hints: ["Which circumference formula uses the diameter directly?"],
        },
        {
          kind: "short",
          id: "circles-p1-q04",
          question: "A circle has radius 3 cm. Find its area in terms of π. (Type it like 5π or 5pi.)",
          answer: { type: "expression", expr: "9pi", display: "{{9 pi}} cm²" },
          solution: ["{{A = pi r^2 = pi * 3^2}}.", "{{3^2 = 9}}, so {{A = 9 pi}} cm²."],
          traps: [
            { spec: { type: "expression", expr: "6pi" }, feedback: "{{6 pi}} is {{2 pi r}}, the circumference (or you doubled 3 instead of squaring it). Area is {{pi * 3^2}}." },
            { spec: { type: "expression", expr: "36pi" }, feedback: "{{36 pi}} uses 6 cm, but 3 cm is already the radius. Don't double it." },
          ],
          difficulty: "warmup",
          guideRef: "area-of-a-circle",
          hints: ["Square the radius, then multiply by π."],
        },
        {
          kind: "short",
          id: "circles-p1-q05",
          question:
            "Wei Ling wraps a tape measure round a tin. The circumference is 47.1 cm and the diameter is 15.0 cm. Work out circumference ÷ diameter. Give your answer as a decimal to 2 decimal places.",
          answer: { type: "number", value: 3.14, allowFraction: false },
          solution: ["{{47.1 / 15.0 = 3.14}}.", "That is very close to π = 3.14159…, as it should be for any circle."],
          traps: [
            { spec: { type: "number", value: 0.32, tolerance: 0.005 }, feedback: "You divided diameter ÷ circumference. Divide the circumference (the bigger number) by the diameter." },
          ],
          difficulty: "warmup",
          guideRef: "discovering-pi",
          hints: ["Circumference ÷ diameter: which number goes first? Should the answer be bigger or smaller than 1?"],
        },
        {
          kind: "short",
          id: "circles-p1-q06",
          question:
            "A round pond in a park has radius 12.5 m. Using the π button on your calculator, find its circumference in metres. Give your answer to 1 decimal place.",
          answer: { type: "number", value: 78.5, allowFraction: false },
          solution: ["{{C = 2 pi r = 2 * pi * 12.5 = 25 pi}}.", "{{25 pi = 78.539…}}", "To 1 decimal place: 78.5 m."],
          traps: [
            { spec: { type: "number", value: 39.3, tolerance: 0.05 }, feedback: "That is {{pi * 12.5}}: you used the radius in {{C = pi d}}. The diameter is 25 m." },
            { spec: { type: "number", value: 490.9, tolerance: 0.05 }, feedback: "That is the **area** ({{pi r^2}}). The distance round the edge is {{2 pi r}}." },
          ],
          commonError: "Using the radius in {{C = pi d}}, which gives half the right answer.",
          difficulty: "core",
          guideRef: "circumference",
          hints: ["You are given the radius. Which circumference formula fits?", "{{C = 2 pi r}}.", "Keep all the digits until the end, then round to 1 decimal place."],
        },
        {
          kind: "short",
          id: "circles-p1-q07",
          question: "A circle has circumference 50 cm. Find its diameter in cm. Give your answer to 3 significant figures.",
          answer: { type: "number", value: 15.9, allowFraction: false },
          solution: [
            "{{C = pi d}}, so {{d = C / pi}}.",
            "{{d = 50 / pi = 15.915…}} cm.",
            "To 3 significant figures: 15.9 cm.",
            "Check: {{pi * 15.9 ~= 49.95}}, which is about 50 ✓",
          ],
          traps: [
            { spec: { type: "number", value: 7.96, tolerance: 0.005 }, feedback: "7.96 cm is the **radius**, {{50 / (2 pi)}}. The diameter is twice that." },
            { spec: { type: "number", value: 157, tolerance: 0.5 }, feedback: "157 is {{50 * pi}}. To undo {{C = pi d}} you **divide** by π, not multiply." },
          ],
          commonError: "Multiplying by π instead of dividing.",
          difficulty: "core",
          guideRef: "circumference",
          hints: [
            "Work backwards from {{C = pi d}}. What undoes 'multiply by π'?",
            "{{d = C / pi}}.",
            "The first three significant figures of 15.915… are 1, 5 and 9. Look at the next digit to round.",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "circles-p1-q08",
          question:
            "A circular rug has a diameter of 2.4 m. Using the π button, find its area in m². Give your answer to 2 decimal places.",
          answer: { type: "number", value: 4.52, allowFraction: false },
          solution: ["Radius = {{2.4 / 2 = 1.2}} m.", "{{A = pi r^2 = pi * 1.2^2 = 1.44 pi}}.", "{{1.44 pi = 4.5238…}}, so the area is 4.52 m² to 2 decimal places."],
          traps: [
            { spec: { type: "number", value: 18.1, tolerance: 0.005 }, feedback: "This squares the diameter instead of the radius, which makes the area 4 times too big. Halve 2.4 first." },
            { spec: { type: "number", value: 7.54, tolerance: 0.005 }, feedback: "7.54 m is the circumference ({{pi d}}). Area needs {{pi r^2}}." },
          ],
          commonError: "Squaring the diameter instead of the radius: the answer is then 4 times too big.",
          difficulty: "core",
          guideRef: "area-of-a-circle",
          hints: ["The area formula needs the radius. What is it?", "{{r = 1.2}} m. Square it first.", "Work out {{pi * 1.44}}, then round to 2 decimal places."],
        },
        {
          kind: "short",
          id: "circles-p1-q09",
          question: "A flower bed is a semicircle with diameter 12 m. Using π = 3.14, find its area in m².",
          answer: { type: "number", value: 56.52 },
          solution: ["Radius = 6 m.", "Whole circle: {{3.14 * 6^2 = 3.14 * 36 = 113.04}} m².", "Semicircle = half of that: {{113.04 / 2 = 56.52}} m²."],
          traps: [
            { spec: { type: "number", value: 113.04 }, feedback: "113.04 m² is the whole circle. A semicircle is half of it." },
            { spec: { type: "number", value: 226.08 }, feedback: "226.08 m² comes from squaring 12, the diameter. Use the radius, 6 m." },
          ],
          difficulty: "core",
          guideRef: "semicircles-quarter-circles",
          hints: ["A semicircle is what fraction of a whole circle?", "Find the radius, then the area of the whole circle.", "Now halve it."],
          strategy: "Whole circle first, then take the fraction",
        },
        {
          kind: "short",
          id: "circles-p1-q10",
          question: "A floor tile is a quarter circle of radius 20 cm. Using π = 3.14, find the perimeter of the tile in cm.",
          answer: { type: "number", value: 71.4 },
          solution: [
            "Curved edge = {{1/4}} of the circumference: {{1/4 * 2 * 3.14 * 20 = 31.4}} cm.",
            "The two straight edges are radii: {{20 + 20 = 40}} cm.",
            "Perimeter = {{31.4 + 40 = 71.4}} cm.",
          ],
          traps: [
            { spec: { type: "number", value: 31.4 }, feedback: "31.4 cm is only the curved edge. A quarter circle also has **two** straight edges (two radii)." },
            { spec: { type: "number", value: 51.4 }, feedback: "You added only one radius. A quarter circle has two straight edges, each 20 cm." },
          ],
          commonError: "Leaving out one or both straight edges.",
          difficulty: "core",
          guideRef: "semicircles-quarter-circles",
          hints: ["Sketch the tile. How many edges does it have, and which ones are curved?", "Curved edge: a quarter of {{2 pi r}}.", "Add both straight edges."],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "circles-p1-q11",
          question: "Jun says: *π is exactly {{22/7}}.* Explain why Jun is wrong, and give one reason why {{22/7}} is still a useful value.",
          marks: 3,
          modelAnswer:
            "π is **irrational**: its decimal 3.14159… goes on for ever without repeating, so it cannot be written exactly as a fraction of whole numbers. In fact {{22/7 = 3.142857…}}, which is about 0.0013 bigger than π, so {{22/7}} is only an approximation.\n\nIt is still useful because it is very close to π, and when a radius or diameter is a multiple of 7 the 7s cancel, so you can work without a calculator. For example, {{22/7 * 14 = 44}}.",
          markScheme: [
            { point: "π is irrational: it cannot be written exactly as a fraction / its decimal never ends or repeats", keywords: ["irrational", "not a fraction", "cannot be written", "never ends", "never repeats", "doesn't repeat"] },
            { point: "Compares values: 22/7 = 3.1428… but π = 3.1415…, so they are different", keywords: ["3.142", "3.1415", "3.14159", "too big", "bigger", "different"] },
            { point: "Useful as a close approximation, especially when the radius or diameter is a multiple of 7 (it cancels)", keywords: ["approximation", "close", "multiple of 7", "cancel", "without a calculator", "estimate"] },
          ],
          commonError: "Saying {{22/7}} is wrong just because it is a fraction, without comparing its value with π.",
          difficulty: "core",
          guideRef: "discovering-pi",
          hints: [
            "Work out {{22/7}} as a decimal and compare it with π = 3.14159…",
            "What special name is given to a number whose decimal never ends and never repeats?",
            "When does dividing by 7 make a calculation easy?",
          ],
        },
        {
          kind: "short",
          id: "circles-p1-q12",
          question: "A circle has circumference {{20 pi}} cm. Find its area in terms of π. (Type it like 5π or 5pi.)",
          answer: { type: "expression", expr: "100pi", display: "{{100 pi}} cm²" },
          solution: ["{{C = 2 pi r = 20 pi}}, so {{2r = 20}} and {{r = 10}} cm.", "{{A = pi r^2 = pi * 10^2 = 100 pi}} cm²."],
          traps: [
            {
              spec: { type: "expression", expr: "400pi" },
              feedback: "{{400 pi}} uses 20 as the radius. But {{C = pi d}}, so 20 cm is the **diameter**: the radius is 10 cm.",
            },
          ],
          commonError: "Treating the 20 in {{20 pi}} as the radius.",
          difficulty: "core",
          guideRef: "area-of-a-circle",
          hints: [
            "Work backwards: what radius gives a circumference of {{20 pi}}?",
            "{{2 pi r = 20 pi}}. Divide both sides by {{2 pi}}.",
            "Now use {{A = pi r^2}}.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "circles-p1-q13",
          question:
            "A running track is a rectangle 80 m long with a semicircle on each 40 m end, as shown. Using π = 3.14, find the distance once round the outside edge of the track, in metres.",
          diagram: `<svg viewBox="0 0 320 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A running track: a rectangle 80 m long and 40 m wide with a semicircle on each 40 m end. The ends of the rectangle are shown as dashed lines inside the shape."><rect x="0" y="0" width="320" height="150" fill="#ffffff"/><path d="M 80 40 L 240 40 A 40 40 0 0 1 240 120 L 80 120 A 40 40 0 0 1 80 40 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="80" y1="40" x2="80" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="240" y1="40" x2="240" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="160" y="32" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">80 m</text><text x="234" y="84" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">40 m</text></svg>`,
          answer: { type: "number", value: 285.6 },
          solution: [
            "The two semicircles together make one whole circle of diameter 40 m: {{3.14 * 40 = 125.6}} m.",
            "The two straight sides: {{2 * 80 = 160}} m.",
            "Total: {{160 + 125.6 = 285.6}} m. The dashed 40 m ends are inside the track, so they are not part of the perimeter.",
          ],
          traps: [
            { spec: { type: "number", value: 365.6 }, feedback: "365.6 m includes the two dashed 40 m lines. They are inside the shape, not on its edge." },
            { spec: { type: "number", value: 411.2 }, feedback: "411.2 m treats 40 m as the radius. The semicircles have **diameter** 40 m." },
          ],
          difficulty: "core",
          guideRef: "compound-circle-shapes",
          hints: [
            "Which edges would a runner actually run along?",
            "Put the two semicircles together. What do they make?",
            "One whole circle of diameter 40 m, plus two straights of 80 m.",
          ],
          strategy: "Split into parts",
        },
        {
          kind: "written",
          id: "circles-p1-q14",
          question: "Explain how cutting a circle of radius {{r}} into sectors and rearranging them shows that its area is {{pi r^2}}.",
          marks: 3,
          modelAnswer:
            "Cut the circle into lots of equal sectors, like pizza slices, and lay them side by side, alternately point-up and point-down. Together they make a shape very like a parallelogram (or rectangle).\n\nHalf of the curved edge (the circumference) runs along the top and half along the bottom, so the long side is {{1/2 * 2 pi r = pi r}}. The height is the straight side of a sector, which is the radius {{r}}.\n\nSo the area is length × height {{= pi r * r = pi r^2}}. The more sectors you use, the straighter the edges and the closer the shape is to a true rectangle, so the area of the circle is exactly {{pi r^2}}.",
          markScheme: [
            { point: "Cuts the circle into many equal sectors and arranges them alternately into a (near) parallelogram or rectangle", keywords: ["sectors", "slices", "alternate", "rearrange", "parallelogram", "rectangle"] },
            { point: "Long side = half the circumference = πr, and height = the radius r", keywords: ["half the circumference", "πr", "pi r", "height", "radius"] },
            { point: "Area = πr × r = πr²; with more, thinner sectors the shape becomes a rectangle exactly", keywords: ["πr²", "pi r^2", "length × height", "more sectors", "thinner", "closer"] },
          ],
          commonError: "Saying the long side is the whole circumference {{2 pi r}}, forgetting half the crust is on each side.",
          difficulty: "core",
          guideRef: "area-of-a-circle",
          hints: [
            "Picture slicing a pizza into many thin slices and laying them in a row, alternately up and down.",
            "The crust is shared between the top edge and the bottom edge. How long is each edge?",
            "What is the height of the new shape?",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "circles-p1-q15",
          question:
            "Two circles, each of diameter 10 cm, fit exactly inside a 20 cm by 10 cm rectangle, as shown. Using π = 3.14, find the shaded area (inside the rectangle but outside both circles), in cm².",
          diagram: `<svg viewBox="0 0 280 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 20 cm by 10 cm rectangle containing two circles of diameter 10 cm side by side, touching each other and the sides of the rectangle. The space between the circles and the rectangle is shaded."><rect x="0" y="0" width="280" height="160" fill="#ffffff"/><rect x="55" y="20" width="200" height="100" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><circle cx="105" cy="70" r="50" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><circle cx="205" cy="70" r="50" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><text x="155" y="140" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20 cm</text><text x="49" y="74" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">10 cm</text></svg>`,
          answer: { type: "number", value: 43 },
          solution: [
            "Rectangle: {{20 * 10 = 200}} cm².",
            "Each circle has radius 5 cm: {{3.14 * 5^2 = 78.5}} cm².",
            "Two circles: {{2 * 78.5 = 157}} cm².",
            "Shaded: {{200 - 157 = 43}} cm².",
          ],
          traps: [
            { spec: { type: "number", value: 121.5 }, feedback: "121.5 cm² takes away only one circle. There are two." },
            { spec: { type: "number", value: 137.2 }, feedback: "You subtracted the circumferences, which are lengths. Subtract the circles' **areas**." },
          ],
          difficulty: "core",
          guideRef: "compound-circle-shapes",
          hints: [
            "Shaded = whole rectangle − the parts that are not shaded.",
            "Each circle has radius 5 cm.",
            "Find one circle's area, double it, then subtract from 200.",
          ],
          strategy: "Subtract the unshaded part",
        },
        {
          kind: "short",
          id: "circles-p1-q16",
          question: "A sector has radius 9 cm and angle 40°. Find its **arc length** in terms of π. (Type it like 5π or 5pi.)",
          answer: { type: "expression", expr: "2pi", display: "{{2 pi}} cm" },
          solution: [
            "40° is {{40/360 = 1/9}} of a full turn.",
            "Whole circumference: {{2 * pi * 9 = 18 pi}} cm.",
            "Arc length: {{1/9 * 18 pi = 2 pi}} cm.",
          ],
          traps: [
            { spec: { type: "expression", expr: "9pi" }, feedback: "{{9 pi}} is the sector's **area** ({{1/9 * 81 pi}}). Arc length is a fraction of the circumference." },
            { spec: { type: "expression", expr: "18pi" }, feedback: "{{18 pi}} is the whole circumference. Take only the 40° fraction of it." },
          ],
          difficulty: "core",
          guideRef: "arcs-sectors",
          hints: ["What fraction of the full 360° is 40°?", "Find the circumference of the whole circle.", "Take {{1/9}} of it."],
          strategy: "Find the fraction of the circle",
        },
        {
          kind: "written",
          id: "circles-p1-q17",
          question:
            "At a pizza shop, a 30 cm diameter vegetable pizza costs $18 and a 20 cm diameter one costs $9. Priya says: *The 20 cm pizza is better value. It's half the price but much more than half the size.* Is she right? Show working to support your answer.",
          marks: 3,
          modelAnswer:
            "Compare **areas**, not diameters. 30 cm pizza: radius 15 cm, area {{pi * 15^2 = 225 pi ~= 707}} cm². 20 cm pizza: radius 10 cm, area {{pi * 10^2 = 100 pi ~= 314}} cm².\n\nPizza per dollar: {{707 / 18 ~= 39.3}} cm² per $1 for the large one and {{314 / 9 ~= 34.9}} cm² per $1 for the small one. So the **30 cm pizza is better value** and Priya is wrong.\n\nHer mistake is comparing diameters: 20 cm is {{2/3}} of 30 cm, but the area is only {{(2/3)^2 = 4/9}} of the large pizza, which is *less* than half.",
          markScheme: [
            { point: "Finds both areas using the radii: 225π ≈ 707 cm² and 100π ≈ 314 cm²", keywords: ["225π", "225pi", "706", "707", "100π", "100pi", "314"] },
            { point: "Makes a fair comparison: area per dollar (≈ 39.3 and 34.9) or cost per cm², or shows the small one is less than half the area", keywords: ["per dollar", "per $", "39.3", "34.9", "less than half", "353", "4/9"] },
            { point: "Concludes Priya is wrong: the 30 cm pizza is better value", keywords: ["wrong", "not right", "30 cm", "larger", "bigger pizza", "better value"] },
          ],
          commonError: "Comparing diameters (lengths) instead of areas.",
          difficulty: "challenge",
          guideRef: "area-of-a-circle",
          hints: [
            "Value means how much pizza you get for each dollar. Is 'how much pizza' a length or an area?",
            "Find each pizza's area. Remember to halve the diameters.",
            "Work out area ÷ price for each pizza, or compare the small pizza's area with half of the large one's.",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "circles-p1-q18",
          question: "A circular garden has an area of 154 m². Using π = {{22/7}}, find its circumference in metres.",
          answer: { type: "number", value: 44 },
          solution: [
            "{{pi r^2 = 154}}, so {{22/7 * r^2 = 154}}.",
            "{{r^2 = 154 * 7/22 = 49}}, so {{r = 7}} m.",
            "{{C = 2 pi r = 2 * 22/7 * 7 = 44}} m.",
          ],
          traps: [
            { spec: { type: "number", value: 22 }, feedback: "22 m is {{pi r}}, only half the circumference. {{C = 2 pi r}}." },
            { spec: { type: "number", value: 49 }, feedback: "49 is {{r^2}}. Take the square root to find the radius, then find the circumference." },
          ],
          commonError: "Forgetting to square-root {{r^2}}, or stopping at the radius.",
          difficulty: "challenge",
          guideRef: "area-of-a-circle",
          hints: [
            "Work backwards: what radius gives an area of 154 m²?",
            "{{r^2 = 154 / (22/7)}}. Dividing by {{22/7}} is the same as multiplying by {{7/22}}.",
            "{{r^2 = 49}}, so what is r? Then use {{C = 2 pi r}}.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "circles-p1-q19",
          question:
            "Three tins, each of radius 4 cm, stand touching each other. A tight elastic band is stretched round all three, as shown in the view from above. Find the length of the band in terms of π. Do not type units. (Type it like 10 + 5π.)",
          diagram: `<svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three equal circles of radius 4 cm touching each other, seen from above, with a tight band around them made of three straight parts and three curved parts."><rect x="0" y="0" width="240" height="190" fill="#ffffff"/><circle cx="88" cy="130" r="32" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="152" cy="130" r="32" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="120" cy="74.57" r="32" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M 88 162 L 152 162 A 32 32 0 0 0 179.71 114 L 147.71 58.57 A 32 32 0 0 0 92.29 58.57 L 60.29 114 A 32 32 0 0 0 88 162 Z" fill="none" stroke="#1f2937" stroke-width="3"/><line x1="120" y1="74.57" x2="152" y2="74.57" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="74.57" r="2" fill="#1f2937"/><text x="136" y="70" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text></svg>`,
          answer: { type: "expression", expr: "24+8pi", display: "{{24 + 8 pi}} cm" },
          solution: [
            "The band is made of 3 straight parts and 3 curved parts.",
            "Each straight part is as long as the distance between two centres: {{4 + 4 = 8}} cm. So the straight parts total {{3 * 8 = 24}} cm.",
            "At each tin the band turns a corner. Each curved part is a 120° arc (360° − 90° − 90° − 60°), and {{3 * 120 = 360}}°, so together the three arcs make exactly one whole circle of radius 4 cm: {{2 * pi * 4 = 8 pi}} cm.",
            "Length = {{24 + 8 pi}} cm (about 49.1 cm).",
          ],
          traps: [
            {
              spec: { type: "expression", expr: "24+12pi" },
              feedback: "Each tin's curved part is not a semicircle. The band only wraps round a third of each tin (120°), so the three arcs make **one** full circle, {{8 pi}}.",
            },
            { spec: { type: "expression", expr: "8pi" }, feedback: "That's just the curved parts. Add the three straight parts, 8 cm each." },
          ],
          difficulty: "challenge",
          guideRef: "compound-circle-shapes",
          hints: [
            "Split the band into straight bits and curved bits.",
            "How long is each straight bit? Compare it with the distance between two centres.",
            "Add up the angles of the three curved bits. What do they make together?",
          ],
          strategy: "Split into parts",
        },
        {
          kind: "written",
          id: "circles-p1-q20",
          question:
            "Always, sometimes or never true? *If you make the radius of a circle 1 m longer, its circumference increases by the same amount, whatever size the circle was to start with.* Explain your answer.",
          marks: 3,
          modelAnswer:
            "**Always** true. A circle of radius {{r}} has circumference {{2 pi r}}. With radius {{r + 1}} the circumference is {{2 pi (r + 1) = 2 pi r + 2 pi}}.\n\nThe increase is {{2 pi r + 2 pi - 2 pi r = 2 pi}} m ≈ 6.28 m. The {{r}} has cancelled out, so the increase is the same for a 1 m hoop or for a rope round the whole Earth.\n\nThis works because circumference is directly proportional to radius: every extra metre of radius always adds {{2 pi}} metres of circumference.",
          markScheme: [
            { point: "States always (true)", keywords: ["always"] },
            { point: "Uses algebra: 2π(r + 1) = 2πr + 2π, so the increase is 2π", keywords: ["2π(r + 1)", "2π(r+1)", "2pi(r+1)", "2πr + 2π", "2π", "2pi"] },
            { point: "Increase ≈ 6.28 m does not depend on r (e.g. same for a coin and the Earth)", keywords: ["6.28", "6.3", "doesn't depend", "does not depend", "any radius", "whatever", "earth", "cancel"] },
          ],
          commonError: "Testing one example only. One example can show 'sometimes', but 'always' needs an argument that works for every radius.",
          difficulty: "challenge",
          guideRef: "circumference",
          hints: [
            "Try two very different circles, e.g. radius 1 m and radius 100 m. What happens to each circumference?",
            "Write the new circumference using {{r + 1}} and expand the bracket.",
            "Subtract the old circumference. Is there any r left?",
          ],
          strategy: "Introduce a variable",
          solutions: [
            {
              label: "Try cases first",
              steps: [
                "Radius 1 m → 2 m: circumference {{2 pi}} → {{4 pi}}, increase {{2 pi}}.",
                "Radius 100 m → 101 m: {{200 pi}} → {{202 pi}}, increase {{2 pi}}.",
                "The same each time, which suggests 'always'. The algebra proves it for every radius, so it is the stronger method.",
              ],
            },
          ],
        },
      ],
    },
    {
      id: "circles-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "circles-p2-q01",
          question: "A circle has radius 7.5 cm. What is the length of the **longest** chord you can draw in it, in cm?",
          answer: { type: "number", value: 15 },
          solution: ["A chord joins two points on the circle. The longest one goes through the centre, so it is a diameter.", "{{d = 2 * 7.5 = 15}} cm."],
          traps: [{ spec: { type: "number", value: 7.5 }, feedback: "7.5 cm is the radius, and a radius is not a chord (it stops at the centre). The longest chord goes all the way across." }],
          difficulty: "warmup",
          guideRef: "parts-of-a-circle",
          hints: ["Try drawing several chords. Which one is longest, and where does it go?"],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "circles-p2-q02",
          question: "Using π = 3.14, find the circumference of a circle with radius 10 cm, in cm.",
          answer: { type: "number", value: 62.8 },
          solution: ["{{C = 2 pi r = 2 * 3.14 * 10 = 62.8}} cm."],
          traps: [
            { spec: { type: "number", value: 31.4 }, feedback: "31.4 cm is {{3.14 * 10}}: that uses the radius as if it were the diameter. {{C = 2 pi r}}." },
            { spec: { type: "number", value: 314 }, feedback: "314 is the area ({{pi r^2}}), not the distance round." },
          ],
          difficulty: "warmup",
          guideRef: "circumference",
          hints: ["A radius is given, so use {{C = 2 pi r}}."],
        },
        {
          kind: "short",
          id: "circles-p2-q03",
          question: "Using π = 3.14, find the area of a circle with diameter 6 cm, in cm².",
          answer: { type: "number", value: 28.26 },
          solution: ["Radius = {{6 / 2 = 3}} cm.", "{{A = 3.14 * 3^2 = 3.14 * 9 = 28.26}} cm²."],
          traps: [
            { spec: { type: "number", value: 113.04 }, feedback: "113.04 cm² squares the diameter. Halve 6 first: the radius is 3 cm." },
            { spec: { type: "number", value: 18.84 }, feedback: "18.84 cm is the circumference ({{pi d}}). Area is {{pi r^2}}." },
          ],
          difficulty: "warmup",
          guideRef: "area-of-a-circle",
          hints: ["The area formula needs the radius. What is half of 6?"],
        },
        {
          kind: "short",
          id: "circles-p2-q04",
          question:
            "In a class π investigation, Arjun's four results for circumference ÷ diameter were 3.12, 3.17, 3.13 and 3.15. Find the mean of his results. Give your answer as a decimal to 2 decimal places.",
          answer: { type: "number", value: 3.14, allowFraction: false },
          solution: [
            "Total: {{3.12 + 3.17 + 3.13 + 3.15 = 12.57}}.",
            "Mean: {{12.57 / 4 = 3.1425}}.",
            "To 2 decimal places: 3.14, very close to π. Averaging several measurements helps cancel out measuring errors.",
          ],
          difficulty: "warmup",
          guideRef: "discovering-pi",
          hints: ["Mean = total ÷ number of results."],
        },
        {
          kind: "short",
          id: "circles-p2-q05",
          question: "Find the area of a quarter circle of radius 4 cm, in terms of π. (Type it like 5π or 5pi.)",
          answer: { type: "expression", expr: "4pi", display: "{{4 pi}} cm²" },
          solution: ["Whole circle: {{pi * 4^2 = 16 pi}} cm².", "Quarter: {{16 pi / 4 = 4 pi}} cm²."],
          traps: [
            { spec: { type: "expression", expr: "16pi" }, feedback: "{{16 pi}} is the whole circle. A quarter circle is {{1/4}} of it." },
            { spec: { type: "expression", expr: "2pi" }, feedback: "{{2 pi}} is the length of the curved edge (a quarter of {{8 pi}}), not the area." },
          ],
          difficulty: "warmup",
          guideRef: "semicircles-quarter-circles",
          hints: ["Find the area of the whole circle first, then take a quarter."],
        },
        {
          kind: "short",
          id: "circles-p2-q06",
          question:
            "The minute hand of a large clock is 35 cm long. How far does the tip of the minute hand travel in one hour? Use π = {{22/7}} and give your answer in cm.",
          answer: { type: "number", value: 220 },
          solution: [
            "In one hour the tip goes once round a circle of radius 35 cm.",
            "{{C = 2 pi r = 2 * 22/7 * 35}}.",
            "Cancel first: {{35 / 7 = 5}}, so {{C = 2 * 22 * 5 = 220}} cm.",
          ],
          traps: [
            { spec: { type: "number", value: 110 }, feedback: "110 cm is {{pi * 35}}. The tip goes round a circle of **radius** 35 cm, so use {{C = 2 pi r}}." },
            { spec: { type: "number", value: 3850 }, feedback: "3850 is the area swept out ({{pi r^2}}, in cm²). The tip travels a distance: the circumference." },
          ],
          difficulty: "core",
          guideRef: "circumference",
          hints: [
            "What shape does the tip trace in one hour, and what is its radius?",
            "Use {{C = 2 pi r}} with {{pi = 22/7}}.",
            "Cancel the 7 into the 35 before multiplying.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "circles-p2-q07",
          question:
            "A bicycle wheel has diameter 64 cm. How many **complete** turns does the wheel make while the bicycle travels 1 km? Use the π button.",
          answer: { type: "number", value: 497 },
          solution: [
            "In one turn the bike moves one circumference: {{C = pi * 64 = 201.06…}} cm.",
            "1 km = 1000 m = 100 000 cm.",
            "Turns: {{100000 / 201.06… = 497.35…}}.",
            "Only **complete** turns count, so the answer is 497 (the 498th turn is not finished).",
          ],
          traps: [
            {
              spec: { type: "number", value: 994.7, tolerance: 1 },
              feedback: "That's about twice too many: you used the radius (32 cm) in {{C = pi d}}. One turn moves the bike {{pi * 64}} cm.",
            },
          ],
          commonError: "Mixing kilometres and centimetres, or using the radius in {{C = pi d}}.",
          difficulty: "core",
          guideRef: "circumference",
          hints: [
            "How far does the bike move in one complete turn of the wheel?",
            "Change 1 km into cm so that the units match.",
            "Divide, then decide: for *complete* turns, do you round up or down?",
          ],
          strategy: "Convert to the same units",
        },
        {
          kind: "written",
          id: "circles-p2-q08",
          question:
            "Ethan wraps a tape round a tree trunk and measures its circumference as 1.9 m, to the nearest 0.1 m. He works out the diameter of the trunk and writes: *d = 0.6047887837 m*\n\n(a) Show how Ethan found the diameter.\n\n(b) Explain what is wrong with the way he has written his answer, and give a more sensible answer.",
          marks: 3,
          modelAnswer:
            "(a) {{C = pi d}}, so {{d = C / pi = 1.9 / pi = 0.604788…}} m.\n\n(b) The circumference was only measured to the nearest 0.1 m (2 significant figures), and a tree trunk is not a perfect circle. Ten decimal places claims an accuracy of a ten-billionth of a metre, which is false accuracy. A sensible answer is **0.60 m** (2 significant figures), or about 60 cm.",
          markScheme: [
            { point: "Shows d = C ÷ π = 1.9 ÷ π", keywords: ["1.9 ÷ π", "1.9/π", "1.9 / pi", "divide by π", "divide by pi", "c ÷ π", "c/π"] },
            { point: "Explains the answer is far more accurate than the measurement (only to the nearest 0.1 m / 2 s.f.)", keywords: ["too many", "decimal places", "accurate", "accuracy", "nearest 0.1", "significant figures", "s.f."] },
            { point: "Gives a sensible rounded answer: 0.60 m, 0.6 m or 60 cm", keywords: ["0.60", "0.6", "60 cm", "2 s.f.", "2 significant"] },
          ],
          commonError: "Copying every digit from the calculator display.",
          difficulty: "core",
          guideRef: "circumference",
          hints: [
            "Which formula links C and d? Rearrange it to make d the subject.",
            "How accurate was the original measurement?",
            "An answer should not claim to be more accurate than the measurement it came from.",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "circles-p2-q09",
          question: "A circular pond has an area of 50 m². Find its radius in metres. Give your answer to 3 significant figures.",
          answer: { type: "number", value: 3.99, allowFraction: false },
          solution: [
            "{{pi r^2 = 50}}, so {{r^2 = 50 / pi = 15.915…}}.",
            "{{r = sqrt(15.915…) = 3.9894…}} m.",
            "To 3 significant figures: 3.99 m.",
            "Check: {{pi * 3.99^2 ~= 50.0}} ✓",
          ],
          traps: [
            { spec: { type: "number", value: 15.9, tolerance: 0.05 }, feedback: "15.9 is {{r^2}}. You still need to take the square root." },
            { spec: { type: "number", value: 7.96, tolerance: 0.005 }, feedback: "That uses {{C = 2 pi r}}. The 50 m² is an area, so use {{A = pi r^2}}." },
          ],
          commonError: "Forgetting the square root at the end.",
          difficulty: "core",
          guideRef: "area-of-a-circle",
          hints: [
            "Work backwards through {{A = pi r^2}}: what was done to r, and in what order?",
            "Undo '× π' first, then undo 'squared'.",
            "{{r = sqrt(50 / pi)}}.",
          ],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "circles-p2-q10",
          question: "A semicircle has diameter 14 cm. Find its exact perimeter. Do not type units. (Type it like 10 + 5π.)",
          answer: { type: "expression", expr: "14+7pi", display: "{{14 + 7 pi}} cm" },
          solution: [
            "Curved edge: half of {{pi d}}, which is {{1/2 * pi * 14 = 7 pi}} cm.",
            "Straight edge: the diameter, 14 cm.",
            "Perimeter = {{14 + 7 pi}} cm (about 36.0 cm).",
          ],
          traps: [
            { spec: { type: "expression", expr: "7pi" }, feedback: "{{7 pi}} cm is only the curved edge. Add the straight edge, 14 cm." },
            {
              spec: { type: "expression", expr: "21pi" },
              feedback: "14 and {{7 pi}} are not like terms, so they can't be added to make {{21 pi}}, just as {{14 + 7x != 21x}}. Leave it as {{14 + 7 pi}}.",
            },
            { spec: { type: "expression", expr: "14+14pi" }, feedback: "{{14 pi}} is the whole circumference. A semicircle's curved edge is half of it." },
          ],
          difficulty: "core",
          guideRef: "semicircles-quarter-circles",
          hints: [
            "What two kinds of edge does a semicircle have?",
            "The curved edge is half of {{pi d}}.",
            "Can 14 and {{7 pi}} be combined into one term?",
          ],
        },
        {
          kind: "written",
          id: "circles-p2-q11",
          question:
            "Which has the longer perimeter: a semicircle of radius 6 cm, or a whole circle of radius 3 cm? Explain your answer without rounding.",
          marks: 3,
          modelAnswer:
            "The semicircle's curved edge is half the circumference of a circle of radius 6 cm: {{1/2 * 2 * pi * 6 = 6 pi}} cm.\n\nThe whole circle of radius 3 cm has circumference {{2 * pi * 3 = 6 pi}} cm, exactly the same length.\n\nBut the semicircle's perimeter also includes its straight edge, the 12 cm diameter, so its perimeter is {{6 pi + 12}} cm. The **semicircle is longer, by exactly 12 cm**.",
          markScheme: [
            { point: "Semicircle's curved edge = half of 2π × 6 = 6π cm", keywords: ["6π", "6pi", "half"] },
            { point: "Circle's circumference = 2π × 3 = 6π cm, the same as the curved edge", keywords: ["same", "equal", "2π × 3", "6π"] },
            { point: "Semicircle also has the 12 cm diameter, so it is longer by 12 cm", keywords: ["12", "diameter", "straight", "longer", "semicircle"] },
          ],
          commonError: "Comparing only the curved parts and saying they are equal, forgetting the straight edge.",
          difficulty: "core",
          guideRef: "semicircles-quarter-circles",
          hints: [
            "Write each perimeter in terms of π before comparing.",
            "Compare the curved part of the semicircle with the circumference of the small circle.",
            "What else is on the edge of a semicircle?",
          ],
          strategy: "Compare like with like",
        },
        {
          kind: "short",
          id: "circles-p2-q12",
          question:
            "A doorway is a rectangle 80 cm wide and 150 cm tall with a semicircle on top, as shown. Using π = 3.14, find the area of the doorway in cm².",
          diagram: `<svg viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A doorway: a rectangle 80 cm wide and 150 cm tall with a semicircle of diameter 80 cm on top. A dashed line marks where the rectangle meets the semicircle."><rect x="0" y="0" width="220" height="250" fill="#ffffff"/><path d="M 70 230 L 70 80 A 40 40 0 0 1 150 80 L 150 230 Z" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="70" y1="80" x2="150" y2="80" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><text x="110" y="246" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">80 cm</text><text x="158" y="160" font-size="13" font-family="sans-serif" fill="#1f2937">150 cm</text></svg>`,
          answer: { type: "number", value: 14512 },
          solution: [
            "Rectangle: {{80 * 150 = 12000}} cm².",
            "Semicircle: radius 40 cm, so {{1/2 * 3.14 * 40^2 = 1/2 * 3.14 * 1600 = 2512}} cm².",
            "Total: {{12000 + 2512 = 14512}} cm².",
          ],
          traps: [
            { spec: { type: "number", value: 17024 }, feedback: "17 024 cm² adds a **whole** circle on top. It is only a semicircle." },
            { spec: { type: "number", value: 22048 }, feedback: "22 048 cm² uses 80 cm as the radius. The semicircle's diameter is 80 cm, so its radius is 40 cm." },
          ],
          difficulty: "core",
          guideRef: "compound-circle-shapes",
          hints: [
            "Split the doorway into shapes you know.",
            "The semicircle sits on the 80 cm width. What is its radius?",
            "Add the rectangle and the semicircle.",
          ],
          strategy: "Split into parts",
        },
        {
          kind: "short",
          id: "circles-p2-q13",
          question:
            "A circular pond of radius 5 m is surrounded by a path 2 m wide, as shown. Find the area of the path in terms of π. (Type it like 5π or 5pi.)",
          diagram: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circular pond of radius 5 m surrounded by a ring-shaped path 2 m wide."><rect x="0" y="0" width="240" height="240" fill="#ffffff"/><circle cx="120" cy="120" r="98" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><circle cx="120" cy="120" r="70" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="120" x2="190" y2="120" stroke="#1f2937" stroke-width="1.5"/><line x1="190" y1="120" x2="218" y2="120" stroke="#b45309" stroke-width="2"/><circle cx="120" cy="120" r="2.5" fill="#1f2937"/><text x="155" y="113" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5 m</text><text x="204" y="112" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2 m</text><text x="120" y="150" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">pond</text><text x="120" y="40" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">path</text></svg>`,
          answer: { type: "expression", expr: "24pi", display: "{{24 pi}} m²" },
          solution: [
            "The outer edge of the path has radius {{5 + 2 = 7}} m.",
            "Big circle: {{pi * 7^2 = 49 pi}}. Pond: {{pi * 5^2 = 25 pi}}.",
            "Path: {{49 pi - 25 pi = 24 pi}} m² (about 75.4 m²).",
          ],
          traps: [
            { spec: { type: "expression", expr: "4pi" }, feedback: "{{4 pi}} is a circle of radius 2 m. The path is a ring: the big circle (radius 7 m) minus the pond (radius 5 m)." },
            { spec: { type: "expression", expr: "49pi" }, feedback: "{{49 pi}} is the pond **and** the path together. Subtract the pond." },
          ],
          commonError: "Squaring the path width ({{pi * 2^2}}) instead of subtracting two circles.",
          difficulty: "core",
          guideRef: "compound-circle-shapes",
          hints: [
            "The path is the space between two circles. What are their radii?",
            "Outer radius = 5 + 2 = 7 m.",
            "Big circle − small circle.",
          ],
          strategy: "Subtract the unshaded part",
        },
        {
          kind: "short",
          id: "circles-p2-q14",
          question:
            "A semicircle is cut out of a square of side 8 cm, as shown. The diameter of the semicircle is one whole side of the square. Using the π button, find the perimeter of the shape that is left. Give your answer in cm to 1 decimal place.",
          diagram: `<svg viewBox="0 0 250 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square of side 8 cm with a semicircle cut out of its top side. The diameter of the semicircle is the whole top side, shown dashed because it has been removed."><rect x="0" y="0" width="250" height="220" fill="#ffffff"/><path d="M 40 30 A 80 80 0 0 0 200 30 L 200 190 L 40 190 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="30" x2="200" y2="30" stroke="#94a3b8" stroke-width="1.5" stroke-dasharray="5 4"/><text x="120" y="208" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text><text x="206" y="114" font-size="13" font-family="sans-serif" fill="#1f2937">8 cm</text></svg>`,
          answer: { type: "number", value: 36.6, allowFraction: false },
          solution: [
            "Three straight sides of the square are left: {{3 * 8 = 24}} cm.",
            "The cut makes a new curved edge: half the circumference of a circle with diameter 8 cm, {{1/2 * pi * 8 = 4 pi = 12.566…}} cm.",
            "Perimeter = {{24 + 4 pi = 36.566…}}, so 36.6 cm to 1 decimal place.",
            "Notice: cutting a piece out made the area smaller but the perimeter bigger (the square's was 32 cm).",
          ],
          traps: [
            { spec: { type: "number", value: 44.6, tolerance: 0.05 }, feedback: "44.6 cm counts all four sides of the square. The dashed side has been cut away and replaced by the curved edge." },
            { spec: { type: "number", value: 24 }, feedback: "24 cm is just the three straight sides. The curved edge of the cut-out is part of the perimeter too." },
          ],
          difficulty: "core",
          guideRef: "compound-circle-shapes",
          hints: [
            "Trace round the edge of the shape. Which straight sides are still there?",
            "The cut-out leaves a curved edge. What fraction of a circle is it?",
            "Add the three straight sides and the semicircular arc.",
          ],
          strategy: "Trace the boundary",
        },
        {
          kind: "short",
          id: "circles-p2-q15",
          question:
            "A slice of a round cake is a sector with radius 15 cm and angle 60°. Using the π button, find the perimeter of the slice. Give your answer in cm to 1 decimal place.",
          answer: { type: "number", value: 45.7, allowFraction: false },
          solution: [
            "60° is {{60/360 = 1/6}} of a full turn.",
            "Arc length: {{1/6 * 2 * pi * 15 = 5 pi = 15.707…}} cm.",
            "Add the two straight edges (radii): {{15.707… + 15 + 15 = 45.707…}}.",
            "Perimeter ≈ 45.7 cm.",
          ],
          traps: [
            { spec: { type: "number", value: 15.7, tolerance: 0.05 }, feedback: "15.7 cm is only the curved edge (the arc). The slice also has two straight edges of 15 cm." },
            { spec: { type: "number", value: 117.8, tolerance: 0.05 }, feedback: "117.8 is the sector's **area** in cm², not its perimeter." },
          ],
          difficulty: "core",
          guideRef: "arcs-sectors",
          hints: ["What fraction of the whole cake is a 60° slice?", "Arc = that fraction of {{2 pi r}}.", "Perimeter = arc + two radii."],
          strategy: "Find the fraction of the circle",
        },
        {
          kind: "short",
          id: "circles-p2-q16",
          question:
            "A cylindrical rainwater barrel has radius 30 cm and height 50 cm. A cylinder is a prism, so its volume = area of the circular end × height. Using π = 3.14, find the volume of the barrel in cm³.",
          answer: { type: "number", value: 141300 },
          solution: [
            "Area of the circular end: {{3.14 * 30^2 = 3.14 * 900 = 2826}} cm².",
            "Volume = end area × height: {{2826 * 50 = 141300}} cm³.",
            "That is 141.3 litres, because 1 litre = 1000 cm³.",
          ],
          traps: [
            { spec: { type: "number", value: 565200 }, feedback: "565 200 cm³ uses the diameter (60 cm) instead of the radius. The end's area is {{3.14 * 30^2}}." },
            { spec: { type: "number", value: 4710 }, feedback: "4710 multiplies by the radius once instead of squaring it: the end's area is {{pi * 30 * 30}}." },
          ],
          difficulty: "core",
          guideRef: "area-of-a-circle",
          hints: ["Find the area of the circular end first.", "{{pi r^2 = 3.14 * 900}}.", "Multiply by the height."],
          strategy: "Area of cross-section × length",
        },
        {
          kind: "written",
          id: "circles-p2-q17",
          question: "Prove that a quarter circle of radius {{2r}} has exactly the same area as a whole circle of radius {{r}}.",
          marks: 3,
          modelAnswer:
            "A whole circle of radius {{2r}} has area {{pi (2r)^2 = pi * 4r^2 = 4 pi r^2}}.\n\nA quarter of it is {{1/4 * 4 pi r^2 = pi r^2}}.\n\nA circle of radius {{r}} has area {{pi r^2}}. These are equal whatever the value of {{r}}. (The reason: doubling the radius multiplies the area by {{2^2 = 4}}, and taking a quarter divides it by 4 again.)",
          markScheme: [
            { point: "Area of the circle of radius 2r = π(2r)² = 4πr² (squares the 2 as well)", keywords: ["4r²", "4r^2", "4πr²", "4pi r^2", "(2r)²", "(2r)^2"] },
            { point: "Quarter of it: ¼ × 4πr² = πr²", keywords: ["quarter", "÷ 4", "divide by 4", "1/4", "πr²", "pi r^2"] },
            { point: "Equal to the area of a circle of radius r, for any r", keywords: ["same", "equal", "radius r", "any"] },
          ],
          commonError: "Writing {{(2r)^2 = 2r^2}}, which squares only the r.",
          difficulty: "challenge",
          guideRef: "area-of-a-circle",
          hints: [
            "Write the area of a whole circle of radius {{2r}}. Be careful: what is {{(2r)^2}}?",
            "{{(2r)^2 = 2r * 2r}}.",
            "Now take a quarter, and compare with {{pi r^2}}.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "circles-p2-q18",
          question:
            "ABCD is a square of side 10 cm. Two quarter circles of radius 10 cm are drawn inside it, one centred at A and one centred at C, as shown. They overlap in a leaf shape. Using the π button, find the area of the leaf. Give your answer in cm² to 1 decimal place.",
          diagram: `<svg viewBox="0 0 250 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square ABCD of side 10 cm with A bottom-left, B bottom-right, C top-right and D top-left. A quarter circle centred at A and a quarter circle centred at C both pass through B and D. Their overlap, a leaf shape along the diagonal from B to D, is shaded."><rect x="0" y="0" width="250" height="210" fill="#ffffff"/><path d="M 50 20 A 160 160 0 0 1 210 180 A 160 160 0 0 1 50 20 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><rect x="50" y="20" width="160" height="160" fill="none" stroke="#1f2937" stroke-width="2"/><circle cx="50" cy="180" r="3" fill="#1f2937"/><circle cx="210" cy="20" r="3" fill="#1f2937"/><text x="42" y="196" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">A</text><text x="218" y="196" font-size="13" font-family="sans-serif" fill="#1f2937">B</text><text x="218" y="18" font-size="13" font-family="sans-serif" fill="#1f2937">C</text><text x="42" y="18" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">D</text><text x="130" y="198" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text></svg>`,
          answer: { type: "number", value: 57.1, allowFraction: false },
          solution: [
            "Each quarter circle has area {{1/4 * pi * 10^2 = 25 pi ~= 78.54}} cm².",
            "Together the two quarter circles cover the whole square, and the leaf is covered **twice**.",
            "So quarter + quarter = square + leaf. Calling the leaf's area L: {{25 pi + 25 pi = 100 + L}}.",
            "{{L = 50 pi - 100 = 57.079…}}, so the leaf is 57.1 cm².",
          ],
          solutions: [
            {
              label: "Two segments",
              steps: [
                "The diagonal BD cuts the leaf into two identical halves.",
                "The half nearer C is the quarter circle centred at A with triangle ABD removed: {{25 pi - 1/2 * 10 * 10 = 25 pi - 50}}.",
                "Leaf = {{2(25 pi - 50) = 50 pi - 100 ~= 57.1}} cm².",
                "Both work; the 'counted twice' method is slicker because it needs no triangle at all.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 78.5, tolerance: 0.05 }, feedback: "78.5 cm² is one whole quarter circle. The leaf is only the part covered by **both**." },
            { spec: { type: "number", value: 42.9, tolerance: 0.05 }, feedback: "42.9 cm² is the two unshaded corners of the square together. The leaf is the rest of the square." },
          ],
          difficulty: "challenge",
          guideRef: "compound-circle-shapes",
          hints: [
            "Add the areas of the two quarter circles. Compare the total with the area of the square. Why is it bigger?",
            "Which part of the square has been counted twice?",
            "Quarter + quarter = square + leaf.",
          ],
          strategy: "Look for an overlap",
        },
        {
          kind: "short",
          id: "circles-p2-q19",
          question:
            "A piece of wire 40 cm long is bent into a square. An identical piece of wire is bent into a circle. How much bigger is the area of the circle than the area of the square? Use the π button and give your answer in cm² to 1 decimal place.",
          answer: { type: "number", value: 27.3, allowFraction: false },
          solution: [
            "Square: side {{40 / 4 = 10}} cm, area 100 cm².",
            "Circle: {{2 pi r = 40}}, so {{r = 40/(2 pi) = 20/pi = 6.366…}} cm.",
            "Circle area: {{pi r^2 = pi * (20/pi)^2 = 400/pi = 127.32…}} cm².",
            "Difference: {{127.32… - 100 = 27.32…}}, so 27.3 cm².",
          ],
          traps: [
            { spec: { type: "number", value: 127.3, tolerance: 0.05 }, feedback: "127.3 cm² is the circle's whole area. The question asks how much **bigger** it is than the square." },
          ],
          commonError: "Rounding the radius early (e.g. to 6.37), which throws the final answer off.",
          difficulty: "challenge",
          guideRef: "compound-circle-shapes",
          hints: [
            "Both shapes have a perimeter of 40 cm. Find the side of the square and the radius of the circle.",
            "{{2 pi r = 40}}. Keep the exact value {{r = 20/pi}} in your calculator.",
            "Area of circle − area of square.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "circles-p2-q20",
          question:
            "Without using the value of π, explain why the area of any circle of radius {{r}} must be more than {{2r^2}} but less than {{4r^2}}. Use the diagram: one square is drawn round the circle and one is drawn inside it.",
          diagram: `<svg viewBox="0 0 220 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle of radius r with a square drawn around it touching the circle, and a smaller square drawn inside it with its four corners on the circle. The inner square's diagonals are diameters of the circle."><rect x="0" y="0" width="220" height="220" fill="#ffffff"/><rect x="30" y="30" width="160" height="160" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><circle cx="110" cy="110" r="80" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><path d="M 110 30 L 190 110 L 110 190 L 30 110 Z" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="110" y1="30" x2="110" y2="190" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="30" y1="110" x2="190" y2="110" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="110" cy="110" r="2.5" fill="#1f2937"/><text x="150" y="104" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">r</text></svg>`,
          marks: 3,
          modelAnswer:
            "**Upper bound.** The outer square touches the circle, so its side is a diameter, {{2r}}. Its area is {{(2r)^2 = 4r^2}}. The circle lies inside this square, so the circle's area is less than {{4r^2}}.\n\n**Lower bound.** The inner square has its corners on the circle, so its diagonals are diameters, crossing at the centre at right angles. They split it into 4 right-angled triangles, each with two sides of length {{r}}. Each triangle has area {{1/2 * r * r}}, so the inner square has area {{4 * 1/2 r^2 = 2r^2}}. This square lies inside the circle, so the circle's area is more than {{2r^2}}.\n\nSo {{2r^2 < A < 4r^2}}. (This fits with {{A = pi r^2}}, because π is between 2 and 4.)",
          markScheme: [
            { point: "Outer square has side 2r (a diameter), area 4r², and the circle is inside it, so area < 4r²", keywords: ["2r", "4r²", "4r^2", "outside", "around", "less than"] },
            { point: "Inner square: diagonals are diameters, making 4 triangles of area ½r² each, so its area is 2r²", keywords: ["2r²", "2r^2", "diagonal", "triangles", "1/2", "½"] },
            { point: "Circle contains the inner square, so 2r² < area < 4r²", keywords: ["between", "more than", "greater than", "inside the circle", "contains"] },
          ],
          commonError: "Thinking the inner square's side is {{r}}. Its diagonal is {{2r}}, so split it into triangles instead.",
          difficulty: "challenge",
          guideRef: "area-of-a-circle",
          hints: [
            "Start with the outer square. How long is its side, compared with the circle?",
            "Now the inner square. Its diagonals are dashed in the diagram. How long is each one?",
            "Split the inner square into 4 triangles using its diagonals. What is the area of each?",
          ],
          strategy: "Draw a diagram",
        },
      ],
    },
  ],

  // ============================ CHALLENGE ===================================
  challenge: [
    {
      kind: "short",
      id: "circles-ch-q01",
      question:
        "Four coins, each of radius 1 cm, lie flat in a square box of side 4 cm. Each coin touches two other coins and two sides of the box, as shown. Find the exact area of the shaded region enclosed between the four coins. Do not type units. (Type it like 5 − π.)",
      diagram: `<svg viewBox="0 0 220 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square box of side 4 cm containing four coins of radius 1 cm arranged two by two, touching each other and the sides. The curved region in the middle, enclosed between the four coins, is shaded."><rect x="0" y="0" width="220" height="225" fill="#ffffff"/><rect x="30" y="30" width="160" height="160" fill="none" stroke="#1f2937" stroke-width="2"/><circle cx="70" cy="70" r="40" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="150" cy="70" r="40" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="70" cy="150" r="40" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="150" cy="150" r="40" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><path d="M 110 70 A 40 40 0 0 0 150 110 A 40 40 0 0 0 110 150 A 40 40 0 0 0 70 110 A 40 40 0 0 0 110 70 Z" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><line x1="70" y1="70" x2="30" y2="70" stroke="#1f2937" stroke-width="1.5"/><circle cx="70" cy="70" r="2" fill="#1f2937"/><text x="50" y="64" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1 cm</text><text x="110" y="212" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text></svg>`,
      answer: { type: "expression", expr: "4-pi", display: "{{4 - pi}} cm²" },
      solution: [
        "Join the centres of the four coins. They form a square of side {{1 + 1 = 2}} cm, with area 4 cm².",
        "Each corner of that square is a right angle at a coin's centre, so a **quarter** of each coin lies inside the square.",
        "Four quarter coins make one whole coin: area {{pi * 1^2 = pi}} cm².",
        "Shaded area = {{4 - pi}} cm² (about 0.86 cm²).",
      ],
      solutions: [
        {
          label: "Fit the corners together",
          steps: [
            "Look at one corner of the box: a 1 cm by 1 cm square with a quarter of a coin in it. The gap there is {{1 - pi/4}}.",
            "The shaded middle piece is made of four of these gaps (split the 2 cm square of centres into four 1 cm squares: each is a 1 cm square with a quarter coin in one corner).",
            "Shaded = {{4 * (1 - pi/4) = 4 - pi}} cm².",
            "The centres method is slicker: one square minus one circle.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "expression", expr: "16-4pi" },
          feedback: "{{16 - 4 pi}} is all of the box not covered by coins, including the corners and edges. The shaded part is only the middle piece.",
        },
        {
          spec: { type: "number", value: 0.86, tolerance: 0.01 },
          feedback: "That's the right size, but the question asks for the exact answer: write it using π.",
        },
      ],
      difficulty: "challenge",
      guideRef: "compound-circle-shapes",
      hints: [
        "Join the centres of the four coins. What shape do you get, and how long are its sides?",
        "How much of each coin lies inside that shape?",
        "Four quarter coins make one whole coin.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "circles-ch-q02",
      question:
        "An archery target is a circle of radius 10 cm. It is split into a central disc and an outer ring, and these two parts have **equal areas**. Find the radius of the central disc, in cm, to 1 decimal place.",
      answer: { type: "number", value: 7.1, allowFraction: false },
      solution: [
        "Whole target: {{pi * 10^2 = 100 pi}} cm².",
        "The central disc must have half of that: {{pi r^2 = 50 pi}}.",
        "Cancel π: {{r^2 = 50}}, so {{r = sqrt(50) = 7.071…}} cm.",
        "Radius ≈ 7.1 cm, much more than half of 10!",
      ],
      solutions: [
        {
          label: "Scale factors",
          steps: [
            "The central disc is an enlargement of the whole target with some scale factor k.",
            "Areas scale by {{k^2}}, so {{k^2 = 1/2}}.",
            "{{k = sqrt(1/2) ~= 0.7071}}, so {{r ~= 0.7071 * 10 ~= 7.1}} cm.",
            "Both are quick. The scale-factor view is slicker because it shows the answer is about 71% of the radius for **any** target.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 5 },
          feedback: "Halving the radius gives only a **quarter** of the area ({{25 pi}} out of {{100 pi}}). Area depends on {{r^2}}.",
        },
      ],
      difficulty: "challenge",
      guideRef: "area-of-a-circle",
      hints: [
        "Guess first: is it 5 cm? Check the areas of the disc and the ring.",
        "The central disc needs half of the total area. What is the total area?",
        "{{pi r^2 = 50 pi}}. Cancel π and solve.",
      ],
      strategy: "Estimate first",
    },
    {
      kind: "short",
      id: "circles-ch-q03",
      question: "The area of a circle increases by 69%. By what percentage does its radius increase?",
      answer: { type: "number", value: 30 },
      solution: [
        "Increasing by 69% means multiplying the area by 1.69.",
        "Area depends on {{r^2}}: if the radius is multiplied by k, the area is multiplied by {{k^2}}.",
        "{{k^2 = 1.69}}, so {{k = sqrt(1.69) = 1.3}}.",
        "Multiplying by 1.3 is a **30%** increase.",
      ],
      solutions: [
        {
          label: "Try a number",
          steps: [
            "Start with radius 10: area {{100 pi}}.",
            "69% more: {{169 pi}}.",
            "{{r^2 = 169}}, so the new radius is 13.",
            "10 → 13 is a 30% increase. With friendly numbers like these, this is the slicker route.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 69 }, feedback: "Area and radius don't grow by the same percentage, because area depends on {{r^2}}." },
        { spec: { type: "number", value: 34.5 }, feedback: "Halving 69% doesn't work. The radius is squared, not doubled, so undo it with a square root." },
      ],
      difficulty: "challenge",
      guideRef: "area-of-a-circle",
      hints: [
        "Pick a starting radius, say 10. What is the area?",
        "What is the new area after a 69% increase?",
        "Which radius gives that new area? Compare it with 10.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "circles-ch-q04",
      question:
        "A circle has area 64 cm². A square is drawn inside it with all four corners on the circle. Then a circle is drawn inside that square, touching all four sides. Then a square is drawn inside that circle, and so on, alternating, as shown. Counting the original circle as the 1st circle, what is the area of the 4th circle, in cm²?",
      diagram: `<svg viewBox="0 0 240 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Nested shapes: a large circle, a square inside it with corners on the circle, a circle inside that square touching its sides, a tilted square inside that circle, a smaller circle, another square and the smallest circle."><rect x="0" y="0" width="240" height="240" fill="#ffffff"/><circle cx="120" cy="120" r="100" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><rect x="49.29" y="49.29" width="141.42" height="141.42" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="120" r="70.71" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><path d="M 120 49.29 L 190.71 120 L 120 190.71 L 49.29 120 Z" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="120" r="50" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"/><rect x="84.64" y="84.64" width="70.71" height="70.71" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><circle cx="120" cy="120" r="35.36" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="120" y="38" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">1st: 64 cm²</text><text x="120" y="124" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4th?</text></svg>`,
      answer: { type: "number", value: 8 },
      solution: [
        "Draw a square round circle 1 as well. The square inside circle 1 has its corners at the midpoints of the outer square's sides (rotate it 45° in your head), so it has exactly **half** the outer square's area: fold the outer square's four corners in and they cover the inner square exactly.",
        "Circle 2 sits inside the inner square in exactly the same way as circle 1 sits inside the outer square. So the whole picture for circle 2 is a scaled copy of the picture for circle 1, with half the area.",
        "So each circle has **half** the area of the circle before it.",
        "1st: 64, 2nd: 32, 3rd: 16, 4th: **8 cm²**.",
      ],
      solutions: [
        {
          label: "Algebra with the radius",
          steps: [
            "Let circle 1 have radius r. The square inside it has diagonals of length 2r, which split it into 4 triangles, so its area is {{4 * 1/2 * r * r = 2r^2}}.",
            "Circle 2 fits inside this square, so its diameter equals the square's side s, where {{s^2 = 2r^2}}.",
            "Circle 2's area is {{pi (s/2)^2 = (pi s^2)/4 = (pi * 2r^2)/4 = 1/2 pi r^2}}: half of circle 1.",
            "Halving three times: {{64 / 2 / 2 / 2 = 8}} cm². The folding picture is slicker; the algebra is more convincing.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 16 }, feedback: "16 cm² is the 3rd circle. Count again: 64 cm² is the 1st." },
        { spec: { type: "number", value: 1 }, feedback: "Each circle is **half** the one before, not a quarter: 64 → 32 → 16 → 8." },
      ],
      difficulty: "challenge",
      guideRef: "compound-circle-shapes",
      hints: [
        "Draw the first few steps carefully. Compare circle 2 with circle 1.",
        "Draw a square round circle 1 too. How does the square inside circle 1 compare with the square around it? Try folding the outer square's corners inwards.",
        "Each 'circle → square → circle' step multiplies the area by the same number. What is it?",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "circles-ch-q05",
      question:
        "Three circles and two straight lines are drawn on a page. What is the **largest** possible number of points where two of them cross?",
      answer: { type: "number", value: 19 },
      solution: [
        "Count pair by pair, using the most crossings each kind of pair can have.",
        "Circle and circle: at most 2 points. There are 3 pairs of circles: {{3 * 2 = 6}}.",
        "Line and circle: at most 2 points (the line cuts a chord). There are {{2 * 3 = 6}} line–circle pairs: {{6 * 2 = 12}}.",
        "Line and line: at most 1 point.",
        "Total: {{6 + 12 + 1 = 19}}. This can really happen: draw three overlapping circles round the same middle area and two lines crossing in the middle, with all the crossing points different.",
      ],
      solutions: [
        {
          label: "Add one shape at a time",
          steps: [
            "Start with the two lines: 1 crossing.",
            "Add circle 1: it can cut each line twice: +4, total 5.",
            "Add circle 2: +2 with circle 1, +4 with the lines: total 11.",
            "Add circle 3: +4 with the two circles, +4 with the lines: total 19.",
            "Both give 19. Counting pairs is slicker once you see it, and it scales to any number of shapes.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 18 }, feedback: "Don't forget that the two lines can also cross each other once." },
        { spec: { type: "number", value: 16 }, feedback: "Two circles can cross at **two** points, not just one." },
      ],
      difficulty: "challenge",
      guideRef: "parts-of-a-circle",
      hints: [
        "What is the most number of points where two circles can cross? A line and a circle? Two lines?",
        "List every pair of shapes. How many circle–circle pairs are there? Line–circle pairs?",
        "Add up the maximum for each pair, then check that all of them can happen at once.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "circles-ch-q06",
      question:
        "Points A, C and B lie in that order on a straight line. Semicircles are drawn on AB, AC and CB, all on the same side of the line, as shown. Prove that the perimeter of the shaded shape equals the circumference of a circle with diameter AB, **wherever** C is placed between A and B.",
      diagram: `<svg viewBox="0 0 300 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large semicircle on AB with two smaller semicircles on AC and CB on the same side. The region inside the large semicircle but outside the two small ones is shaded."><rect x="0" y="0" width="300" height="180" fill="#ffffff"/><path d="M 30 150 A 120 120 0 0 1 270 150 A 40 40 0 0 0 190 150 A 80 80 0 0 0 30 150 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="150" x2="280" y2="150" stroke="#334155" stroke-width="1.5"/><circle cx="30" cy="150" r="3" fill="#1f2937"/><circle cx="190" cy="150" r="3" fill="#1f2937"/><circle cx="270" cy="150" r="3" fill="#1f2937"/><text x="30" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="190" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">C</text><text x="270" y="168" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text></svg>`,
      marks: 4,
      modelAnswer:
        "Let {{AC = a}} and {{CB = b}}, so {{AB = a + b}}.\n\nThe curved edge of a semicircle with diameter {{x}} is half of {{pi x}}, which is {{1/2 pi x}}. So the three arcs have lengths {{1/2 pi a}}, {{1/2 pi b}} and {{1/2 pi (a + b)}}.\n\nThe shaded shape's perimeter is made of all three arcs:\n\n    {{1/2 pi a + 1/2 pi b + 1/2 pi (a + b) = 1/2 pi (a + b) + 1/2 pi (a + b) = pi (a + b)}}\n\nand {{pi (a + b) = pi * AB}} is the circumference of a circle with diameter AB. Nothing depended on the values of {{a}} and {{b}}, so this is true wherever C is.",
      markScheme: [
        { point: "Introduces letters: AC = a, CB = b, so AB = a + b", keywords: ["a + b", "a+b", "let"] },
        { point: "Arc of a semicircle with diameter x is ½πx, giving ½πa, ½πb and ½π(a + b)", keywords: ["½π", "1/2 π", "1/2 pi", "πa/2", "half", "πa", "πb"] },
        { point: "The two small arcs add to ½π(a + b), the same as the big arc, so the total is π(a + b)", keywords: ["π(a + b)", "π(a+b)", "pi(a+b)", "same as", "equal"] },
        { point: "π(a + b) = π × AB is the circumference of the circle on AB, for any position of C", keywords: ["circumference", "πd", "any", "wherever", "always"] },
      ],
      commonError: "Checking one position of C with numbers. That shows it works once; a proof needs letters so it covers every position.",
      solutions: [
        {
          label: "Try numbers first",
          steps: [
            "AB = 10, AC = 6, CB = 4: arcs {{5 pi}}, {{3 pi}}, {{2 pi}}. Total {{10 pi = pi * 10}}.",
            "AB = 10, AC = 9, CB = 1: arcs {{5 pi}}, {{4.5 pi}}, {{0.5 pi}}. Total {{10 pi}} again.",
            "The two small arcs always add up to the big arc, because their diameters add up to AB. Numbers convince you; the algebra proves it.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "semicircles-quarter-circles",
      hints: [
        "Try a case: AB = 10 with C in the middle. Then put C 2 units from A. What do you notice?",
        "Call AC = a and CB = b. What is AB?",
        "Write each arc length as {{1/2 pi}} × its diameter, then add them up.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "circles-ch-q07",
      question:
        "A coin of radius 1 cm rolls, without slipping, all the way round the outside of a fixed coin of radius 3 cm, until it is back where it started. How many complete turns does the rolling coin make about its own centre?",
      answer: { type: "number", value: 4 },
      solution: [
        "Follow the **centre** of the rolling coin. It always stays {{3 + 1 = 4}} cm from the centre of the fixed coin, so it travels round a circle of radius 4 cm.",
        "That path has length {{2 * pi * 4 = 8 pi}} cm.",
        "When a coin of radius 1 cm rolls without slipping, its centre moves {{2 pi * 1 = 2 pi}} cm for each complete turn.",
        "Turns = {{8 pi / (2 pi) = 4}}.",
      ],
      solutions: [
        {
          label: "Unroll, then add the loop",
          steps: [
            "If the fixed coin's edge were straightened into a line {{6 pi}} cm long, the small coin would turn {{6 pi / (2 pi) = 3}} times.",
            "But this track bends round through a full 360°, and going once round a loop adds one more turn (walk round a table always facing the edge: you turn round once).",
            "3 + 1 = 4 turns. Try it with two equal coins: you get 2 turns, not 1!",
            "The centre-path method is slicker because it avoids the tricky 'extra turn' argument.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 3 },
          feedback: "3 is the ratio of the circumferences: the turns you'd get rolling along a **straight** track {{6 pi}} cm long. Going round a curve adds something. Follow the path of the rolling coin's centre.",
        },
      ],
      difficulty: "challenge",
      guideRef: "circumference",
      hints: [
        "If you have two equal coins, try it: roll one round the other. Does it turn once or twice?",
        "Watch the centre of the rolling coin. What path does it follow, and what is that path's radius?",
        "Each complete turn moves the centre forward by the rolling coin's own circumference.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "circles-ch-q08",
      question:
        "A goat is tied to corner A of a shed by a rope 10 m long. The shed is a 6 m by 4 m rectangle, and the goat cannot go inside it. The rope can bend round the corners of the shed. Find the area of ground the goat can reach, in m², in terms of π. (Type it like 5π or 5pi.)",
      diagram: `<svg viewBox="0 0 240 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangular shed 6 m long and 4 m wide seen from above. A rope 10 m long is tied to its bottom-left corner A, with a goat at the other end."><rect x="0" y="0" width="240" height="190" fill="#ffffff"/><rect x="120" y="70" width="60" height="40" fill="#fecaca" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="110" x2="33.4" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><circle cx="120" cy="110" r="3" fill="#1f2937"/><circle cx="33.4" cy="160" r="5" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><text x="150" y="94" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">shed</text><text x="150" y="64" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 m</text><text x="186" y="94" font-size="12" font-family="sans-serif" fill="#1f2937">4 m</text><text x="124" y="126" font-size="12" font-family="sans-serif" fill="#1f2937">A</text><text x="66" y="128" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 m</text><text x="33.4" y="180" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">goat</text></svg>`,
      answer: { type: "expression", expr: "88pi", display: "{{88 pi}} m²" },
      solution: [
        "Main region: the shed blocks one quarter of the circle round A, so the goat can sweep {{3/4}} of a circle of radius 10 m: {{3/4 * pi * 10^2 = 75 pi}}.",
        "Round the far end of the 6 m side: {{10 - 6 = 4}} m of rope is left, which sweeps a quarter circle: {{1/4 * pi * 4^2 = 4 pi}}.",
        "Round the far end of the 4 m side: {{10 - 4 = 6}} m of rope is left, which sweeps a quarter circle: {{1/4 * pi * 6^2 = 9 pi}}.",
        "These two extra quarter circles just meet at the shed's far corner (4 m and 6 m are exactly the lengths of the back walls), so they don't overlap.",
        "Total: {{75 pi + 4 pi + 9 pi = 88 pi}} m² (about 276 m²).",
      ],
      traps: [
        {
          spec: { type: "expression", expr: "75pi" },
          feedback: "{{75 pi}} is just the big {{3/4}} circle. The rope can also bend round the two corners next to A, letting the goat reach behind the shed.",
        },
        { spec: { type: "expression", expr: "100pi" }, feedback: "The shed blocks part of the circle, so the goat can't reach a whole circle of radius 10 m." },
      ],
      difficulty: "challenge",
      guideRef: "compound-circle-shapes",
      hints: [
        "Without the shed, the goat could reach a full circle of radius 10 m. Which part does the shed block?",
        "When the rope bends round a corner of the shed, how much rope is left beyond that corner?",
        "Each bend gives an extra quarter circle. Do the two extra pieces overlap behind the shed?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "circles-ch-q09",
      question:
        "Six points are placed on a circle so that no three of the chords joining them pass through the same point. Every pair of points is joined by a chord. Into how many regions is the inside of the circle divided?",
      answer: { type: "number", value: 31 },
      solution: [
        "Small cases: 2 points → 2 regions, 3 → 4, 4 → 8, 5 → 16. It looks like doubling, but don't trust it yet!",
        "Draw the chords one at a time. A new chord that crosses k chords already drawn is cut into k + 1 pieces, and each piece splits one region into two. So it adds k + 1 regions.",
        "Starting from 1 region: regions = 1 + (number of chords) + (number of crossing points).",
        "Chords: one for each pair of the 6 points: {{(6 * 5)/2 = 15}}.",
        "Crossings: any 4 of the points make a quadrilateral whose two diagonals cross exactly once, and every crossing comes from such a set of 4. Choosing 4 points from 6 is the same as choosing the 2 to leave out: 15 ways.",
        "Regions = 1 + 15 + 15 = **31**, not 32! (Check the formula on 5 points: 1 + 10 + 5 = 16 ✓)",
      ],
      traps: [
        {
          spec: { type: "number", value: 32 },
          feedback: "The pattern 2, 4, 8, 16 suggests 32, but the doubling breaks at 6 points! Count it properly: regions = 1 + chords + crossing points.",
        },
        {
          spec: { type: "number", value: 30 },
          feedback: "30 is what you get with 6 *equally spaced* points, where three long diagonals meet at the centre. Here no three chords meet at one point.",
        },
      ],
      difficulty: "challenge",
      guideRef: "parts-of-a-circle",
      hints: [
        "Try 2, 3, 4 and 5 points first. What pattern do you see? Do you trust it?",
        "When you draw a new chord, how many new regions does it create? Think about how many chords it crosses.",
        "Regions = 1 + number of chords + number of crossing points. Each crossing point comes from a choice of 4 of the points.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "written",
      id: "circles-ch-q10",
      question:
        "Marcus 'proves' that π = 2.\n\n1. Draw a semicircle on a line segment of length 2. Its curved length is π.\n2. Replace it with two semicircles on the two halves of the segment, then four semicircles on the quarters, and so on.\n3. The wiggly curve gets closer and closer to the straight segment, which has length 2.\n4. So the length of the wiggly curve gets closer and closer to 2, which means π = 2.\n\nFind the flaw. Your answer should include the length of the wiggly curve at each stage.",
      diagram: `<svg viewBox="0 0 280 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three stages on a segment of length 2: one large semicircle, then two semicircles on the halves, then four semicircles on the quarters."><rect x="0" y="0" width="280" height="250" fill="#ffffff"/><line x1="70" y1="110" x2="270" y2="110" stroke="#94a3b8" stroke-width="1.5"/><path d="M 70 110 A 100 100 0 0 1 270 110" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="70" y1="175" x2="270" y2="175" stroke="#94a3b8" stroke-width="1.5"/><path d="M 70 175 A 50 50 0 0 1 170 175 A 50 50 0 0 1 270 175" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="70" y1="235" x2="270" y2="235" stroke="#94a3b8" stroke-width="1.5"/><path d="M 70 235 A 25 25 0 0 1 120 235 A 25 25 0 0 1 170 235 A 25 25 0 0 1 220 235 A 25 25 0 0 1 270 235" fill="none" stroke="#1f2937" stroke-width="2"/><text x="10" y="110" font-size="12" font-family="sans-serif" fill="#1f2937">Stage 1</text><text x="10" y="175" font-size="12" font-family="sans-serif" fill="#1f2937">Stage 2</text><text x="10" y="235" font-size="12" font-family="sans-serif" fill="#1f2937">Stage 3</text></svg>`,
      marks: 3,
      modelAnswer:
        "Work out the length of the curve at each stage.\n\n- Stage 1: one semicircle of diameter 2 has length {{1/2 * pi * 2 = pi}}.\n- Stage 2: two semicircles of diameter 1 have length {{2 * 1/2 * pi * 1 = pi}}.\n- Stage 3: four semicircles of diameter {{1/2}} have length {{4 * 1/2 * pi * 1/2 = pi}}.\n- In general, n semicircles of diameter {{2/n}} have length {{n * 1/2 * pi * 2/n = pi}}.\n\nSo the wiggly curve is **always** π long (about 3.14) at every stage: its length never gets closer to 2. Steps 1–3 are true, but step 4 is the flaw. A curve can get closer and closer to a line in *position* while its *length* stays the same: the bumps get smaller, but there are more of them. So π is not 2.",
      markScheme: [
        { point: "Works out the stages: two semicircles of diameter 1 give π; four of diameter ½ give π", keywords: ["2 semicircles", "4 semicircles", "diameter 1", "still π", "still pi", "= π", "each stage"] },
        { point: "States that the length never changes: it is always π (≈ 3.14), never approaching 2", keywords: ["never changes", "stays", "always π", "always pi", "same length", "constant", "3.14"] },
        { point: "Identifies the flaw in step 4: being close in position does not mean being close in length", keywords: ["step 4", "position", "doesn't mean", "does not mean", "length", "flaw", "more bumps"] },
      ],
      commonError: "Saying 'the curve never actually reaches the line', which is not the real problem. Even very close, its length is still π.",
      solutions: [
        {
          label: "A quicker way to see it",
          steps: [
            "Each time you halve the diameters, every semicircle's length halves, but the number of semicircles doubles.",
            "Halving and doubling cancel, so the total length never changes from π.",
            "This is slicker than computing each stage, and it shows why step 4 must fail.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "discovering-pi",
      hints: [
        "Work out the length of the curve in stage 2: two semicircles, each with diameter 1.",
        "Now try stage 3: four semicircles, each with diameter {{1/2}}. Notice anything?",
        "Which step jumps from 'close in *position*' to 'close in *length*'? Is that jump justified?",
      ],
      strategy: "Spot the flaw",
    },
  ],
};
