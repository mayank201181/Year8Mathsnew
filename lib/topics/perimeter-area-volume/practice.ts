import type { TopicPractice } from "../../types.ts";

// ---------------------------------------------------------------------------
// Area, Surface Area & Volume — quiz, two practice papers and a challenge set.
// ---------------------------------------------------------------------------

export const practice: TopicPractice = {
  // ============================== QUIZ =====================================
  quiz: [
    {
      kind: "mcq",
      id: "perimeter-area-volume-quiz-q01",
      question:
        "The triangle has a base of 12 cm, a sloping side of 8 cm and a perpendicular height of 7 cm. What is its area?",
      diagram: `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle with a base of 12 cm, a sloping left side of 8 cm and a dashed perpendicular height of 7 cm from the top vertex down to the base."><rect x="0" y="0" width="360" height="240" fill="#ffffff"/><polygon points="30,210 330,210 127,35" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="127" y1="35" x2="127" y2="210" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><path d="M127,198 L139,198 L139,210" fill="none" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="180" y="230" text-anchor="middle">12 cm</text><text x="66" y="116" text-anchor="end">8 cm</text><text x="133" y="135">7 cm</text></g></svg>`,
      options: ["84 cm²", "48 cm²", "42 cm²", "27 cm²"],
      answerIndex: 2,
      explanation:
        "Area = {{1/2 * 12 * 7 = 42}} cm². Use the perpendicular height: the 7 cm line meets the base at a right angle. 48 cm² comes from using the sloping side, {{1/2 * 12 * 8}}, and 84 cm² forgets to halve — the triangle is only half of a 12 cm by 7 cm rectangle.",
      difficulty: "warmup",
      guideRef: "rectangles-triangles",
      hints: ["Which length meets the base at a right angle?", "A triangle is half of a rectangle with the same base and height."],
      strategy: "Use the perpendicular height",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-quiz-q02",
      question:
        "A trapezium has parallel sides of 7 cm and 11 cm. The perpendicular distance between them is 6 cm. Find its area in cm².",
      answer: { type: "number", value: 54, display: "54 cm²" },
      traps: [
        { spec: { type: "number", value: 108 }, feedback: "That is the area of two copies of the trapezium (they fit together into a parallelogram). Halve it." },
        { spec: { type: "number", value: 462 }, feedback: "You multiplied all three lengths. Add the parallel sides first, then multiply by the height and halve." },
      ],
      solution: [
        "Add the parallel sides: 7 + 11 = 18 cm.",
        "Multiply by the height: 18 × 6 = 108.",
        "Halve: {{1/2 * 108 = 54}} cm².",
      ],
      commonError: "Forgetting to halve, which gives the area of a parallelogram made from two trapezia.",
      difficulty: "warmup",
      guideRef: "parallelograms-trapezia",
      hints: ["Area = {{1/2 (a + b) h}}, where a and b are the parallel sides.", "Start with 7 + 11."],
      strategy: "Use the formula",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-quiz-q03",
      question: "How many edges does a pentagonal prism have?",
      answer: { type: "number", value: 15 },
      traps: [
        { spec: { type: "number", value: 10 }, feedback: "You have counted the edges round the two pentagon ends. Don't forget the 5 edges running along the prism, joining the ends." },
        { spec: { type: "number", value: 7 }, feedback: "7 is the number of faces (2 pentagons + 5 rectangles), not edges." },
      ],
      solution: [
        "A pentagonal prism has a pentagon at each end.",
        "5 edges round each pentagon: 5 + 5 = 10.",
        "Plus 5 edges joining the two ends: 10 + 5 = 15.",
      ],
      difficulty: "warmup",
      guideRef: "nets-and-euler",
      hints: ["Picture the two pentagon ends.", "Count the edges round each end, then the edges joining them."],
      strategy: "Draw a diagram",
    },
    {
      kind: "mcq",
      id: "perimeter-area-volume-quiz-q04",
      question:
        "A solid is made from 1 cm cubes. Its plan shows the number of cubes in each stack:\n\n| | Left | Middle | Right |\n|---|---|---|---|\n| Back row | 3 | 1 | 2 |\n| Front row | 1 | 2 | 1 |\n\nWhich describes the **front elevation** (the view from the front)?",
      options: [
        "Three columns of heights 3, 2 and 2 cm, from left to right",
        "Three columns of heights 1, 2 and 1 cm, from left to right",
        "Three columns of heights 3, 1 and 2 cm, from left to right",
        "Three columns of heights 4, 3 and 3 cm, from left to right",
      ],
      answerIndex: 0,
      explanation:
        "From the front you see the **tallest** stack in each column, because a taller stack at the back still shows above a shorter one in front. Left: the taller of 3 and 1 is 3. Middle: the taller of 1 and 2 is 2. Right: the taller of 2 and 1 is 2. Heights 1, 2, 1 show only the front row, as if the back row were invisible; heights 4, 3, 3 add the stacks together, but cubes standing one behind another don't pile up in a flat view.",
      difficulty: "core",
      guideRef: "plans-elevations",
      hints: [
        "Stand in front of the solid. Which cubes in the left column can you see?",
        "A stack at the back still shows if it is taller than the stack in front of it.",
        "Take the taller stack in each column.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-quiz-q05",
      question:
        "Find the perimeter of this L-shaped flower bed. All its corners are right angles. Give your answer in metres.",
      diagram: `<svg viewBox="0 0 320 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shaped flower bed with right-angled corners. The bottom is 10 m, the left side 8 m, the top 4 m and the right side 5 m. The other two sides, the step down and the inner horizontal edge, are not labelled."><rect x="0" y="0" width="320" height="240" fill="#ffffff"/><polygon points="50,210 270,210 270,100 138,100 138,34 50,34" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="160" y="228" text-anchor="middle">10 m</text><text x="42" y="126" text-anchor="end">8 m</text><text x="94" y="26" text-anchor="middle">4 m</text><text x="278" y="160">5 m</text></g></svg>`,
      answer: { type: "number", value: 36, display: "36 m" },
      traps: [
        { spec: { type: "number", value: 27 }, feedback: "You have only added the four labelled sides. The shape has six sides — find the two missing ones first." },
        { spec: { type: "number", value: 62 }, feedback: "62 m² is the area. Perimeter is the distance all the way round the edge." },
      ],
      solution: [
        "Missing horizontal side: 10 − 4 = 6 m.",
        "Missing vertical side: 8 − 5 = 3 m.",
        "Perimeter: 10 + 5 + 6 + 3 + 4 + 8 = 36 m.",
      ],
      solutions: [
        {
          label: "Push the edges out",
          steps: [
            "Slide the two inner edges outwards: they exactly fill in the missing corner of a 10 m by 8 m rectangle.",
            "So the perimeter equals the rectangle's: 2 × (10 + 8) = 36 m.",
            "Quicker — but it only works when every edge can slide out to the surrounding rectangle. It fails for a U-shape with a notch cut into one side.",
          ],
        },
      ],
      commonError: "Adding only the labelled sides, or mixing up perimeter (m) with area (m²).",
      difficulty: "core",
      guideRef: "compound-shapes",
      hints: [
        "How many sides does the shape have? Which two are missing?",
        "The two top edges together must match the 10 m bottom edge.",
        "Missing sides: 10 − 4 and 8 − 5.",
      ],
      strategy: "Find the missing lengths",
    },
    {
      kind: "mcq",
      id: "perimeter-area-volume-quiz-q06",
      question: "What is the surface area of a cuboid 5 cm long, 3 cm wide and 2 cm high?",
      options: ["30 cm²", "31 cm²", "50 cm²", "62 cm²"],
      answerIndex: 3,
      explanation:
        "There are three pairs of matching faces: 5 × 3 = 15, 5 × 2 = 10 and 3 × 2 = 6. Each appears twice, so the surface area is 2 × (15 + 10 + 6) = 62 cm². 31 cm² counts each pair only once (a cuboid has 6 faces, not 3); 30 is the volume, 5 × 3 × 2, which is measured in cm³; 50 cm² leaves out the two 3 cm by 2 cm end faces.",
      difficulty: "core",
      guideRef: "surface-area",
      hints: ["How many faces does a cuboid have? Which ones match?", "Find the three different face areas.", "Double their total."],
      strategy: "Sketch the net",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-quiz-q07",
      question:
        "A rectangular basin is 45 cm long, 30 cm wide and 20 cm deep. Mei pours in water until the basin is three-quarters full. How many litres of water are in the basin?",
      answer: { type: "number", value: 20.25, display: "20.25 litres" },
      traps: [
        { spec: { type: "number", value: 27 }, feedback: "27 litres would fill the basin to the brim. It is only three-quarters full." },
        { spec: { type: "number", value: 20250 }, feedback: "That is the volume in cm³ (which is the same as ml). Divide by 1000 to get litres." },
      ],
      solution: [
        "Volume of the full basin: 45 × 30 × 20 = 27 000 cm³.",
        "Three-quarters of it: 27 000 × 0.75 = 20 250 cm³.",
        "1000 cm³ = 1 litre, so 20 250 ÷ 1000 = 20.25 litres.",
      ],
      commonError: "Stopping at cm³ (or ml) when the question asks for litres.",
      difficulty: "core",
      guideRef: "volume",
      hints: ["Find the volume of the whole basin first.", "Then take three-quarters of it.", "Remember 1000 cm³ = 1 litre."],
      strategy: "Check units",
    },
    {
      kind: "mcq",
      id: "perimeter-area-volume-quiz-q08",
      question:
        "A parallelogram has a base of 9 cm and sloping sides of 5 cm. Its perpendicular height is 4 cm. What is its area?",
      options: ["18 cm²", "36 cm²", "45 cm²", "28 cm²"],
      answerIndex: 1,
      explanation:
        "Cut the triangle off one end and slide it to the other: the parallelogram becomes a 9 cm by 4 cm rectangle, so its area is 9 × 4 = 36 cm². 45 cm² uses the sloping side, which is longer than the true height; 18 cm² halves as if the shape were a triangle; 28 is the perimeter, 2 × (9 + 5), which is a length in cm.",
      difficulty: "core",
      guideRef: "parallelograms-trapezia",
      hints: [
        "Which length is at right angles to the base?",
        "Cut off a triangle from one end and move it to the other end. What shape do you get?",
        "Area = base × perpendicular height.",
      ],
      strategy: "Cut and rearrange",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-quiz-q09",
      question: "A triangle has an area of 36 cm² and a base of 8 cm. Find its perpendicular height in cm.",
      answer: { type: "number", value: 9, display: "9 cm" },
      traps: [
        { spec: { type: "number", value: 4.5 }, feedback: "8 × 4.5 = 36 is the area of a *rectangle*. A triangle is half of that, so its height must be twice as big." },
      ],
      solution: ["Area = {{1/2 * b * h}}, so {{1/2 * 8 * h = 36}}.", "4h = 36.", "h = 9 cm."],
      commonError: "Dividing the area by the base without doubling, which forgets the half in the formula.",
      difficulty: "core",
      guideRef: "rectangles-triangles",
      hints: ["Write the area formula with h as the unknown.", "{{1/2 * 8 = 4}}, so 4 × h = 36."],
      strategy: "Use the inverse",
    },
    {
      kind: "written",
      id: "perimeter-area-volume-quiz-q10",
      question:
        "Arjun says: \"If two cuboids have the same volume, they must have the same surface area.\" Is he right? Use cuboids made from 12 one-centimetre cubes to explain.",
      marks: 3,
      modelAnswer:
        "No, he is wrong. A 1 cm × 1 cm × 12 cm cuboid has volume 12 cm³ and surface area 2 × (1 + 12 + 12) = 50 cm². A 2 cm × 2 cm × 3 cm cuboid also has volume 12 cm³, but its surface area is 2 × (4 + 6 + 6) = 32 cm². Same volume, different surface areas. Volume counts the cubes; surface area counts the faces on the outside, and a compact shape hides more faces inside it.",
      markScheme: [
        { point: "States that Arjun is wrong (the statement is not always true)", keywords: ["no", "wrong", "false", "not always", "different"] },
        { point: "Gives two different cuboids with volume 12 cm³, e.g. 1 × 1 × 12 and 2 × 2 × 3", keywords: ["1 × 1 × 12", "2 × 2 × 3", "1x1x12", "2x2x3", "1 by 1 by 12", "2 by 2 by 3", "1 × 2 × 6", "1 × 3 × 4"] },
        { point: "Works out both surface areas correctly and shows they differ (e.g. 50 cm² and 32 cm²)", keywords: ["50", "32", "40", "38", "surface area"] },
      ],
      commonError: "Showing two cuboids with the same volume but never actually working out their surface areas.",
      difficulty: "core",
      guideRef: "surface-area",
      hints: [
        "List some cuboids you can build from exactly 12 cubes.",
        "Work out the surface area of a long thin one and of a chunky one.",
        "Compare 1 × 1 × 12 with 2 × 2 × 3.",
      ],
      strategy: "Find a counterexample",
    },
  ],

  // ============================== PAPERS ===================================
  papers: [
    {
      id: "perimeter-area-volume-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q01",
          question: "Priya's rectangular HDB bedroom floor is 4.5 m long and 3 m wide. What is its area in m²?",
          answer: { type: "number", value: 13.5, display: "13.5 m²" },
          traps: [
            { spec: { type: "number", value: 15 }, feedback: "15 m is the perimeter, 2 × (4.5 + 3). Area multiplies the length by the width." },
          ],
          solution: ["Area of a rectangle = length × width.", "4.5 × 3 = 13.5 m²."],
          difficulty: "warmup",
          guideRef: "rectangles-triangles",
          hints: ["Area of a rectangle = length × width."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q02",
          question:
            "A right-angled triangle has sides of 6 cm, 8 cm and 10 cm. The right angle is between the 6 cm and 8 cm sides. Find its area in cm².",
          answer: { type: "number", value: 24, display: "24 cm²" },
          traps: [
            { spec: { type: "number", value: 48 }, feedback: "6 × 8 = 48 is the rectangle. The triangle is half of it." },
            { spec: { type: "number", value: 40 }, feedback: "You used the 10 cm side. The base and height must be the two sides that meet at the right angle: 6 cm and 8 cm." },
          ],
          solution: [
            "The 6 cm and 8 cm sides are perpendicular, so they are the base and the height.",
            "Area = {{1/2 * 6 * 8 = 24}} cm².",
          ],
          difficulty: "warmup",
          guideRef: "rectangles-triangles",
          hints: ["In a right-angled triangle, which two sides are perpendicular?", "Use those two sides as the base and height."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q03",
          question:
            "A parallelogram has a base of 13 cm and sloping sides of 8 cm. Its perpendicular height is 6 cm. Find its area in cm².",
          answer: { type: "number", value: 78, display: "78 cm²" },
          traps: [
            { spec: { type: "number", value: 104 }, feedback: "13 × 8 uses the sloping side. The height must be measured at right angles to the base." },
            { spec: { type: "number", value: 42 }, feedback: "42 cm is the perimeter, 2 × (13 + 8). The question asks for the area." },
          ],
          solution: ["Area of a parallelogram = base × perpendicular height.", "13 × 6 = 78 cm²."],
          difficulty: "warmup",
          guideRef: "parallelograms-trapezia",
          hints: ["Area of a parallelogram = base × perpendicular height.", "Which given length is perpendicular to the base?"],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q04",
          question: "A polyhedron has 9 faces and 16 edges. Use Euler's formula to find how many vertices it has.",
          answer: { type: "number", value: 9 },
          traps: [
            { spec: { type: "number", value: 23 }, feedback: "Check the signs. {{V + F - E = 2}} gives V + 9 − 16 = 2." },
            { spec: { type: "number", value: 5 }, feedback: "V − 7 = 2 means V is 7 *more* than 2, so add: V = 2 + 7. Working out 7 − 2 undoes the subtraction the wrong way round." },
          ],
          solution: [
            "{{V + F - E = 2}}",
            "V + 9 − 16 = 2, so V − 7 = 2.",
            "V = 9. (An octagon-based pyramid fits: 9 faces, 9 vertices and 16 edges.)",
          ],
          difficulty: "warmup",
          guideRef: "nets-and-euler",
          hints: ["Euler's formula: {{V + F - E = 2}}.", "Substitute F = 9 and E = 16, then solve for V."],
          strategy: "Use the formula",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q05",
          question: "A shoebox is a cuboid 30 cm long, 18 cm wide and 10 cm tall. Find its volume in cm³.",
          answer: { type: "number", value: 5400, display: "5400 cm³" },
          traps: [
            { spec: { type: "number", value: 2040 }, feedback: "2040 cm² is the surface area — the cardboard on the outside. Volume is the space inside: length × width × height." },
            { spec: { type: "number", value: 58 }, feedback: "You added the lengths. Volume multiplies them." },
          ],
          solution: ["Volume of a cuboid = length × width × height.", "30 × 18 × 10 = 540 × 10 = 5400 cm³."],
          difficulty: "warmup",
          guideRef: "volume",
          hints: ["Volume of a cuboid = l × w × h."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q06",
          question: "A rectangle has a perimeter of 38 cm. One of its sides is 12 cm long. Find the area of the rectangle in cm².",
          answer: { type: "number", value: 84, display: "84 cm²" },
          traps: [
            { spec: { type: "number", value: 312 }, feedback: "You used 38 − 12 = 26 cm as the other side. The perimeter goes round all four sides, so one length plus one width is only 38 ÷ 2 = 19 cm." },
            { spec: { type: "number", value: 168 }, feedback: "38 − 24 = 14 cm is the total of the *two* short sides. Each one is 7 cm." },
          ],
          solution: [
            "Two lengths and two widths make 38 cm, so length + width = 19 cm.",
            "Width = 19 − 12 = 7 cm.",
            "Area = 12 × 7 = 84 cm².",
          ],
          commonError: "Subtracting 12 from the whole perimeter and using 26 cm as the width.",
          difficulty: "core",
          guideRef: "rectangles-triangles",
          hints: ["What do one length and one width add up to?", "Half the perimeter is 19 cm.", "So the width is 19 − 12."],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p1-q07",
          question:
            "Two identical trapezia, each with parallel sides a and b and perpendicular height h, are fitted together — one turned upside down — to make a parallelogram, as shown. Use this to explain why the area of the trapezium is {{1/2 (a + b) h}}.",
          diagram: `<svg viewBox="0 0 380 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two identical trapezia fitted together into a parallelogram. The left trapezium has a long bottom side b, a short top side a and height h. The right one is the same trapezium turned upside down, with a short bottom side a and a long top side b."><rect x="0" y="0" width="380" height="200" fill="#ffffff"/><polygon points="20,160 200,160 160,60 60,60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="200,160 300,160 340,60 160,60" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="100" y1="60" x2="100" y2="160" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><path d="M100,148 L112,148 L112,160" fill="none" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="15" font-style="italic" fill="#1f2937"><text x="110" y="180" text-anchor="middle">b</text><text x="110" y="52" text-anchor="middle">a</text><text x="250" y="180" text-anchor="middle">a</text><text x="250" y="52" text-anchor="middle">b</text><text x="84" y="116">h</text></g></svg>`,
          marks: 3,
          modelAnswer:
            "The two copies fit together because the sloping sides match. The bottom edge of the new shape is b + a, and the top edge is a + b, so it is a parallelogram with base (a + b) and the same perpendicular height h. A parallelogram's area is base × height, so its area is (a + b) × h. The parallelogram is made of two identical trapezia, so one trapezium is half of it: area = {{1/2 (a + b) h}}.",
          markScheme: [
            { point: "The base of the parallelogram is a + b", keywords: ["a + b", "a+b", "b + a", "b+a"] },
            { point: "Its height is still h, so the parallelogram's area is (a + b) × h", keywords: ["(a + b)h", "(a+b)h", "(a + b) × h", "base × height", "base x height", "height h"] },
            { point: "The trapezium is half of the parallelogram, so its area is {{1/2 (a + b) h}}", keywords: ["half", "halve", "÷ 2", "1/2", "two copies", "two trapezia"] },
          ],
          commonError: "Saying the base is a × b, or forgetting to explain why the answer is halved.",
          difficulty: "core",
          guideRef: "parallelograms-trapezia",
          hints: [
            "How long is the bottom edge of the parallelogram?",
            "What is the area of a parallelogram with that base and height h?",
            "How many trapezia make up the parallelogram?",
          ],
          strategy: "Use two copies",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q08",
          question:
            "Siti is painting the end wall of a play-house. The wall is a rectangle 3 m wide with vertical sides 2 m tall, topped by a triangle. The peak of the triangle is 3.2 m above the ground. Find the area of the end wall in m².",
          diagram: `<svg viewBox="0 0 330 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End wall of a play-house: a rectangle 3 m wide with vertical sides 2 m tall, topped by a triangle whose peak is 3.2 m above the ground."><rect x="0" y="0" width="330" height="260" fill="#ffffff"/><polygon points="70,230 250,230 250,110 160,38 70,110" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="70" y1="110" x2="250" y2="110" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><line x1="160" y1="38" x2="285" y2="38" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/><line x1="285" y1="38" x2="285" y2="230" stroke="#334155" stroke-width="1.5"/><line x1="279" y1="38" x2="291" y2="38" stroke="#334155" stroke-width="1.5"/><line x1="279" y1="230" x2="291" y2="230" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="160" y="250" text-anchor="middle">3 m</text><text x="62" y="174" text-anchor="end">2 m</text><text x="291" y="140">3.2 m</text></g></svg>`,
          answer: { type: "number", value: 7.8, display: "7.8 m²" },
          traps: [
            { spec: { type: "number", value: 9.6 }, feedback: "9.6 m² treats the triangle as if it were a rectangle (or the whole wall as a 3 m by 3.2 m rectangle). The triangle is half of its surrounding rectangle." },
            { spec: { type: "number", value: 10.8 }, feedback: "The triangle's height is only the part above the walls: 3.2 − 2 = 1.2 m, not 3.2 m." },
          ],
          solution: [
            "Split the wall into a rectangle and a triangle.",
            "Rectangle: 3 × 2 = 6 m².",
            "Triangle height: 3.2 − 2 = 1.2 m, so the triangle's area is {{1/2 * 3 * 1.2 = 1.8}} m².",
            "Total: 6 + 1.8 = 7.8 m².",
          ],
          commonError: "Using the full 3.2 m as the height of the triangle.",
          difficulty: "core",
          guideRef: "compound-shapes",
          hints: ["Split the wall into two shapes you know.", "How tall is the triangle on its own?", "Triangle height = 3.2 − 2."],
          strategy: "Split into parts",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q09",
          question:
            "A rectangular photo mount is 30 cm by 20 cm. A rectangular window 24 cm by 14 cm is cut out of its middle. What area of card is left, in cm²?",
          answer: { type: "number", value: 264, display: "264 cm²" },
          traps: [
            { spec: { type: "number", value: 36 }, feedback: "(30 − 24) × (20 − 14) is a 6 cm by 6 cm square — it doesn't match the shape of the border. Subtract the whole window from the whole mount." },
            { spec: { type: "number", value: 936 }, feedback: "You added the two areas. The window is cut *out*, so subtract it." },
          ],
          solution: [
            "Whole mount: 30 × 20 = 600 cm².",
            "Window: 24 × 14 = 336 cm².",
            "Card left: 600 − 336 = 264 cm².",
          ],
          solutions: [
            {
              label: "Add up the border strips",
              steps: [
                "The border is (30 − 24) ÷ 2 = 3 cm wide all round.",
                "Top and bottom strips: 2 × (30 × 3) = 180 cm².",
                "Side strips (between them): 2 × (14 × 3) = 84 cm².",
                "Total: 180 + 84 = 264 cm². Subtracting is quicker, and you don't need the border width at all.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "compound-shapes",
          hints: ["Is it easier to add up the border pieces or to subtract?", "Find the area of the whole mount and of the window."],
          strategy: "Subtract",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p1-q10",
          question:
            "Priya says she has made a polyhedron with 10 vertices, 7 faces and 14 edges. Explain how you know she has made a mistake. If her numbers of vertices and faces are correct, how many edges should it have?",
          marks: 3,
          modelAnswer:
            "For any polyhedron (without holes), Euler's formula says V + F − E = 2. With Priya's numbers, 10 + 7 − 14 = 3, which is not 2, so her numbers cannot all be right. If V = 10 and F = 7, then 10 + 7 − E = 2, so E = 15. (A pentagonal prism has exactly 10 vertices, 7 faces and 15 edges.)",
          markScheme: [
            { point: "Uses Euler's formula V + F − E = 2", keywords: ["euler", "v + f - e", "v + f − e", "v+f-e", "= 2"] },
            { point: "Shows 10 + 7 − 14 = 3, which is not 2", keywords: ["3", "not 2", "≠ 2", "should be 2"] },
            { point: "Finds the correct number of edges, 15 (e.g. a pentagonal prism)", keywords: ["15", "pentagonal prism"] },
          ],
          difficulty: "core",
          guideRef: "nets-and-euler",
          hints: ["Which formula links V, F and E?", "Work out V + F − E for her numbers.", "Solve 10 + 7 − E = 2."],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q11",
          question:
            "A solid is made from 1 cm cubes. The plan shows how many cubes are in each stack:\n\n| | Left | Middle | Right |\n|---|---|---|---|\n| Back row | 2 | 3 | 1 |\n| Middle row | 1 | 1 | 1 |\n| Front row | 1 | 1 | 2 |\n\nWhat is the area of the **side elevation** (the view from the right-hand side), in cm²?",
          answer: { type: "number", value: 6, display: "6 cm²" },
          traps: [
            { spec: { type: "number", value: 7 }, feedback: "7 cm² is the front elevation (the tallest stack in each column: 2, 3, 2). From the side, each *row* shows up as one column." },
            { spec: { type: "number", value: 13 }, feedback: "13 is the number of cubes. In a flat view, cubes hidden behind other cubes add no area." },
          ],
          solution: [
            "From the right-hand side, the stacks in each row line up one behind another, so each row shows up as a single column.",
            "Each column is as tall as the tallest stack in that row: back row 3, middle row 1, front row 2.",
            "Area = 3 + 1 + 2 = 6 squares = 6 cm².",
          ],
          commonError: "Reading the columns of the plan (which gives the front elevation) instead of the rows.",
          difficulty: "core",
          guideRef: "plans-elevations",
          hints: [
            "Standing at the right-hand side, which stacks are lined up one behind another?",
            "Each row of the plan shows up as one column in the side view.",
            "Use the tallest stack in each row.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q12",
          question:
            "A box is a triangular prism 20 cm long. Its cross-section is an isosceles triangle with sides 5 cm, 5 cm and 6 cm; the perpendicular height from the 6 cm side to the opposite corner is 4 cm. Find the total surface area of the box in cm².",
          answer: { type: "number", value: 344, display: "344 cm²" },
          traps: [
            { spec: { type: "number", value: 320 }, feedback: "You have found the three rectangles but left out the two triangular ends." },
            { spec: { type: "number", value: 350 }, feedback: "The triangle's height is 4 cm, not 5 cm — 5 cm is a sloping side." },
          ],
          solution: [
            "Each triangular end: {{1/2 * 6 * 4 = 12}} cm², so the two ends make 24 cm².",
            "Rectangles: two of 5 × 20 = 100 cm² and one of 6 × 20 = 120 cm², total 320 cm².",
            "Total surface area: 24 + 320 = 344 cm².",
          ],
          solutions: [
            {
              label: "Perimeter shortcut",
              steps: [
                "Unfolded, the three rectangles make one strip as long as the prism (20 cm) and as wide as the triangle's perimeter (5 + 5 + 6 = 16 cm): 16 × 20 = 320 cm².",
                "Add the two ends: 320 + 24 = 344 cm².",
                "Quicker for any prism: surface area = 2 × cross-section + perimeter × length.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "surface-area",
          hints: [
            "How many faces does a triangular prism have, and what shapes are they?",
            "Two triangles plus three rectangles.",
            "Use the 4 cm height for the triangles.",
          ],
          strategy: "Sketch the net",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q13",
          question:
            "A wooden ramp is a triangular prism. Its cross-section is a right-angled triangle with a base of 40 cm and a height of 15 cm, and the ramp is 60 cm wide (so the prism is 60 cm long). Find its volume in cm³.",
          answer: { type: "number", value: 18000, display: "18 000 cm³" },
          traps: [
            { spec: { type: "number", value: 36000 }, feedback: "That is the volume of a cuboid 40 × 15 × 60. The cross-section is a triangle, so halve." },
          ],
          solution: [
            "Area of the cross-section: {{1/2 * 40 * 15 = 300}} cm².",
            "Volume = area of cross-section × length = 300 × 60 = 18 000 cm³.",
          ],
          commonError: "Multiplying the three lengths together, which gives the volume of a cuboid twice as big.",
          difficulty: "core",
          guideRef: "volume",
          hints: ["Find the area of the triangular cross-section first.", "Volume of a prism = cross-section × length."],
          strategy: "Find the cross-section first",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q14",
          question:
            "During a monsoon downpour, 2.5 cm of rain falls into an empty rectangular tray that is 80 cm long and 40 cm wide. How many litres of rainwater does the tray collect?",
          answer: { type: "number", value: 8, display: "8 litres" },
          traps: [
            { spec: { type: "number", value: 8000 }, feedback: "8000 cm³ is right — but that is 8000 ml. Divide by 1000 for litres." },
            { spec: { type: "number", value: 80 }, feedback: "There are 1000 cm³ in a litre, not 100." },
          ],
          solution: [
            "The rainwater is a cuboid 80 cm × 40 cm × 2.5 cm.",
            "Volume: 80 × 40 = 3200 cm², and 3200 × 2.5 = 8000 cm³.",
            "1000 cm³ = 1 litre, so 8000 ÷ 1000 = 8 litres.",
          ],
          difficulty: "core",
          guideRef: "volume",
          hints: ["What shape is the layer of rainwater?", "Its depth is 2.5 cm.", "Find the volume in cm³, then use 1000 cm³ = 1 litre."],
          strategy: "Check units",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q15",
          question:
            "A square-based pyramid has a base with sides of 10 cm. Each triangular face has a slant height of 13 cm, and the vertical height of the pyramid is 12 cm. Find its total surface area in cm².",
          answer: { type: "number", value: 360, display: "360 cm²" },
          traps: [
            { spec: { type: "number", value: 340 }, feedback: "You used the vertical height (12 cm). Each triangle's own height is the slant height, 13 cm." },
            { spec: { type: "number", value: 260 }, feedback: "That is just the four triangles. Add the square base." },
          ],
          solution: [
            "Base: 10 × 10 = 100 cm².",
            "One triangular face: {{1/2 * 10 * 13 = 65}} cm².",
            "Four faces: 4 × 65 = 260 cm².",
            "Total: 100 + 260 = 360 cm². (The vertical height isn't needed.)",
          ],
          commonError: "Using the vertical height of the pyramid instead of the slant height of each triangle.",
          difficulty: "core",
          guideRef: "surface-area",
          hints: [
            "Sketch the net: a square with a triangle on each side.",
            "The height of each triangle is measured along its face — which height is that?",
            "Use the slant height, 13 cm, for the triangles.",
          ],
          strategy: "Sketch the net",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p1-q16",
          question:
            "A square-based pyramid stands on a table. Its base has sides of 6 cm and its apex is 4 cm above the table, directly above the centre of the base. Wei Ling draws its plan as a plain 6 cm square. (a) What has she missed out of the plan? (b) Describe the front elevation, giving its measurements.",
          marks: 3,
          modelAnswer:
            "(a) From above you can see the four sloping edges running up from the corners of the base to the apex, so the plan should be a 6 cm square with both diagonals drawn in, crossing at the centre (where the apex is). (b) From the front you see a triangle with a base of 6 cm and a height of 4 cm, with its top vertex directly above the middle of the base — an isosceles triangle. (The side elevation is the same triangle.)",
          markScheme: [
            { point: "The plan needs lines from the corners to the centre (the two diagonals), showing the sloping edges", keywords: ["diagonal", "diagonals", "corners", "centre", "center", "sloping edges", "lines"] },
            { point: "The front elevation is an isosceles triangle", keywords: ["triangle", "isosceles"] },
            { point: "Its base is 6 cm and its height is 4 cm, with the apex above the middle of the base", keywords: ["6", "4", "middle", "centre", "height"] },
          ],
          commonError: "Drawing the plan without the edges that slope up to the apex, or giving the front elevation the slant height instead of the vertical height.",
          difficulty: "core",
          guideRef: "plans-elevations",
          hints: [
            "Looking down from above, can you see the sloping edges of the pyramid?",
            "Where do those edges meet on the plan?",
            "From the front, what shape does the pyramid look like, and how tall is it?",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q17",
          question:
            "A cuboid tank has a base 40 cm long and 25 cm wide, and contains water 12 cm deep. Marcus lowers a solid metal block measuring 10 cm by 10 cm by 8 cm into the tank. It sinks to the bottom and is completely covered by the water. By how many centimetres does the water level rise?",
          answer: { type: "number", value: 0.8, display: "0.8 cm" },
          traps: [
            { spec: { type: "number", value: 12.8 }, feedback: "12.8 cm is the new depth of the water. The question asks how much the level *rises*." },
            { spec: { type: "number", value: 8 }, feedback: "Check the division: 800 ÷ 1000 is less than 1." },
          ],
          solution: [
            "The block pushes aside its own volume of water: 10 × 10 × 8 = 800 cm³.",
            "That volume spreads over the whole base of the tank: 40 × 25 = 1000 cm².",
            "Rise = 800 ÷ 1000 = 0.8 cm. (New depth 12.8 cm, which is more than 8 cm, so the block is covered.)",
          ],
          solutions: [
            {
              label: "Track the total volume",
              steps: [
                "Water: 1000 × 12 = 12 000 cm³. Water + block: 12 000 + 800 = 12 800 cm³.",
                "Water and block together fill the tank to a depth of 12 800 ÷ 1000 = 12.8 cm.",
                "Rise: 12.8 − 12 = 0.8 cm. The first method is quicker: the rise is just (volume added) ÷ (base area).",
              ],
            },
          ],
          commonError: "Dividing by the wrong area, or giving the new depth instead of the rise.",
          difficulty: "challenge",
          guideRef: "volume",
          hints: [
            "What happens to the water when the block goes in?",
            "The water level rises by the block's volume spread over the base of the tank.",
            "Rise = (volume of block) ÷ (base area of tank).",
          ],
          strategy: "Track what changes",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q18",
          question:
            "A cylindrical glass has an internal radius of 3 cm and contains water 10 cm deep. Ethan pours all of the water into an empty cuboid container whose base measures 6 cm by 5 cm. How deep is the water now? Give your answer in cm to 1 decimal place.",
          answer: { type: "number", value: 9.4, allowFraction: false, display: "9.4 cm" },
          traps: [
            { spec: { type: "number", value: 6.3 }, feedback: "It looks as if you worked out 2 × 3 instead of 3². The area of the circle is {{pi r^2 = pi * 9}}." },
            { spec: { type: "number", value: 37.7 }, feedback: "You used 6 cm (the diameter) as the radius. The radius is 3 cm." },
          ],
          solution: [
            "Volume of water: {{pi r^2 h = pi * 3^2 * 10 = 90 pi}} ≈ 282.7 cm³.",
            "Base of the cuboid: 6 × 5 = 30 cm².",
            "Depth = 282.7 ÷ 30 ≈ 9.42, which is 9.4 cm to 1 decimal place.",
          ],
          solutions: [
            {
              label: "Keep π until the end",
              steps: [
                "Depth = {{(90 pi)/30 = 3 pi}} cm.",
                "{{3 pi}} ≈ 9.42, so 9.4 cm.",
                "Slicker: keeping π exact avoids rounding errors part-way through and shows the neat exact answer {{3 pi}}.",
              ],
            },
          ],
          commonError: "Squaring the diameter instead of the radius, or rounding too early.",
          difficulty: "core",
          guideRef: "cylinders",
          hints: [
            "The volume of water doesn't change when it is poured.",
            "Volume of a cylinder = {{pi r^2 h}}.",
            "Depth in the cuboid = volume ÷ base area.",
          ],
          strategy: "Look for an invariant",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p1-q19",
          question:
            "Zara says: \"If you increase the perimeter of a rectangle, you always increase its area too.\" Is she right? Explain, using examples.",
          marks: 3,
          modelAnswer:
            "She is not right — the statement is only sometimes true. A 5 cm by 5 cm square has perimeter 20 cm and area 25 cm². A 1 cm by 12 cm rectangle has a bigger perimeter, 26 cm, but a smaller area, 12 cm². So increasing the perimeter can decrease the area. It can also work: a 6 cm by 6 cm square has a bigger perimeter (24 cm) and a bigger area (36 cm²) than the 5 by 5 square. Perimeter and area measure different things: long, thin rectangles have a large perimeter but a small area.",
          markScheme: [
            { point: "States that it is not always true (it is sometimes true)", keywords: ["sometimes", "not always", "no", "wrong"] },
            { point: "A correct counterexample with a larger perimeter but smaller area, with both values worked out", keywords: ["1 by 12", "1 × 12", "1x12", "26", "counterexample", "smaller area", "less area"] },
            { point: "An example where both increase, or a reason why (long thin rectangles have small areas)", keywords: ["6 by 6", "36", "24", "thin", "both increase", "both go up"] },
          ],
          commonError: "Giving only examples that agree with Zara — one counterexample is what disproves an 'always' claim.",
          difficulty: "challenge",
          guideRef: "rectangles-triangles",
          hints: [
            "Try a square first, then a long thin rectangle.",
            "Find a rectangle with a bigger perimeter than a 5 by 5 square but less area.",
            "Is the statement ever true? Try making the square bigger.",
          ],
          strategy: "Find a counterexample",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p1-q20",
          question:
            "A solid wooden cube has edges of 4 cm. A square hole, 2 cm by 2 cm, is cut straight through the centre of the cube from the front face to the back face. Find the total surface area of what remains, including the inside of the hole, in cm².",
          answer: { type: "number", value: 120, display: "120 cm²" },
          traps: [
            { spec: { type: "number", value: 88 }, feedback: "You took away the two 2 × 2 squares but forgot the four new walls inside the hole." },
            { spec: { type: "number", value: 96 }, feedback: "96 cm² is the surface area of the original cube. Cutting the hole changes it." },
          ],
          solution: [
            "Original cube: 6 × 4 × 4 = 96 cm².",
            "Surface lost: two 2 cm × 2 cm squares (front and back): 96 − 8 = 88 cm².",
            "Surface gained: the hole has four inside walls, each 2 cm wide and 4 cm long: 4 × 8 = 32 cm².",
            "Total: 88 + 32 = 120 cm².",
          ],
          solutions: [
            {
              label: "Face by face",
              steps: [
                "Front and back: each 16 − 4 = 12 cm², so 24 cm².",
                "Top, bottom, left and right are untouched: 4 × 16 = 64 cm².",
                "Inside the hole: 4 walls × (2 × 4) = 32 cm².",
                "Total: 24 + 64 + 32 = 120 cm². The 'lost and gained' method is quicker to set up; this one is easier to check.",
              ],
            },
          ],
          commonError: "Forgetting the inside walls of the hole, which are new surface.",
          difficulty: "challenge",
          guideRef: "surface-area",
          hints: [
            "What surface disappears when the hole is cut? What new surface appears?",
            "Two 2 × 2 squares vanish from the front and back faces.",
            "The tunnel has four inside walls, each 2 cm by 4 cm.",
          ],
          strategy: "Track what changes",
        },
      ],
    },
    {
      id: "perimeter-area-volume-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q01",
          question:
            "Ravi's rectangular CCA banner is 2.4 m long and 0.5 m wide. He sews ribbon all the way round its edge. How many metres of ribbon does he need?",
          answer: { type: "number", value: 5.8, display: "5.8 m" },
          traps: [
            { spec: { type: "number", value: 1.2 }, feedback: "1.2 m² is the area. The ribbon goes round the edge: that is the perimeter." },
            { spec: { type: "number", value: 2.9 }, feedback: "2.4 + 0.5 covers only two of the four sides. Double it." },
          ],
          solution: ["Perimeter = 2 × (length + width).", "2 × (2.4 + 0.5) = 2 × 2.9 = 5.8 m."],
          difficulty: "warmup",
          guideRef: "rectangles-triangles",
          hints: ["The ribbon goes along all four sides.", "Perimeter = 2 × (length + width)."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q02",
          question: "A trapezium has parallel sides of 5 cm and 9 cm, which are 4 cm apart. Find its area in cm².",
          answer: { type: "number", value: 28, display: "28 cm²" },
          traps: [
            { spec: { type: "number", value: 56 }, feedback: "That's (5 + 9) × 4 — you forgot to halve." },
            { spec: { type: "number", value: 180 }, feedback: "You multiplied all three numbers. Add the parallel sides first." },
          ],
          solution: ["Area = {{1/2 (a + b) h}}.", "{{1/2 * (5 + 9) * 4 = 1/2 * 14 * 4 = 28}} cm²."],
          difficulty: "warmup",
          guideRef: "parallelograms-trapezia",
          hints: ["Area = {{1/2 (a + b) h}}.", "Add the parallel sides: 5 + 9."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q03",
          question:
            "A net is made of one pentagon and five triangles. It folds up into a solid. How many edges does the solid have?",
          answer: { type: "number", value: 10 },
          traps: [
            { spec: { type: "number", value: 20 }, feedback: "You counted the sides of every polygon in the net: 5 + 5 × 3 = 20. When the net folds up, two sides meet to make each edge, so halve it." },
            { spec: { type: "number", value: 6 }, feedback: "6 is the number of faces. Edges are where two faces meet." },
          ],
          solution: [
            "The solid is a pentagonal pyramid.",
            "5 edges round the pentagon base.",
            "5 more edges from the corners of the base up to the apex.",
            "Total: 5 + 5 = 10 edges.",
          ],
          difficulty: "warmup",
          guideRef: "nets-and-euler",
          hints: ["What solid has one pentagon and five triangles as faces?", "Count the edges round the base, then the edges going up to the apex."],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q04",
          question: "A cube has edges of 5 cm. Find its total surface area in cm².",
          answer: { type: "number", value: 150, display: "150 cm²" },
          traps: [
            { spec: { type: "number", value: 125 }, feedback: "125 cm³ is the volume (5 × 5 × 5). Surface area adds up the areas of the six faces." },
            { spec: { type: "number", value: 25 }, feedback: "That's the area of one face. A cube has six faces." },
          ],
          solution: ["One face: 5 × 5 = 25 cm².", "Six identical faces: 6 × 25 = 150 cm²."],
          difficulty: "warmup",
          guideRef: "surface-area",
          hints: ["How many faces does a cube have, and what shape is each one?"],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q05",
          question: "A juice carton is a cuboid 6 cm by 6 cm by 20 cm. How many millilitres of juice does it hold when full?",
          answer: { type: "number", value: 720, display: "720 ml" },
          traps: [
            { spec: { type: "number", value: 0.72 }, feedback: "0.72 is the answer in litres. The question asks for millilitres, and 1 cm³ = 1 ml." },
            { spec: { type: "number", value: 32 }, feedback: "You added the lengths. Volume multiplies them." },
          ],
          solution: ["Volume: 6 × 6 × 20 = 720 cm³.", "1 cm³ = 1 ml, so the carton holds 720 ml."],
          difficulty: "warmup",
          guideRef: "volume",
          hints: ["Find the volume in cm³.", "1 cm³ holds exactly 1 ml."],
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q06",
          question: "Find the area of triangle ABC in cm².",
          diagram: `<svg viewBox="0 0 340 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Obtuse triangle ABC with base AB of 5 cm and side BC of 10 cm. The base is extended past B with a dashed line, and a dashed perpendicular height of 8 cm drops from C to meet this extension outside the triangle."><rect x="0" y="0" width="340" height="240" fill="#ffffff"/><polygon points="40,210 150,210 282,34" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="150" y1="210" x2="282" y2="210" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><line x1="282" y1="34" x2="282" y2="210" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><path d="M270,210 L270,198 L282,198" fill="none" stroke="#334155" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="32" y="226" text-anchor="end">A</text><text x="152" y="228" text-anchor="middle">B</text><text x="282" y="26" text-anchor="middle">C</text><text x="95" y="228" text-anchor="middle">5 cm</text><text x="234" y="138">10 cm</text><text x="290" y="126">8 cm</text></g></svg>`,
          answer: { type: "number", value: 20, display: "20 cm²" },
          traps: [
            { spec: { type: "number", value: 25 }, feedback: "You used the sloping side BC = 10 cm. The height must be perpendicular to the base — here it is the dashed 8 cm line outside the triangle." },
            { spec: { type: "number", value: 40 }, feedback: "5 × 8 = 40 is a parallelogram. The triangle is half of it." },
          ],
          solution: [
            "The base is AB = 5 cm.",
            "The perpendicular height is the distance from C straight down to the line AB (extended): 8 cm. It lies outside the triangle, but it is still the height.",
            "Area = {{1/2 * 5 * 8 = 20}} cm².",
          ],
          commonError: "Thinking the height must be inside the triangle, and using the sloping side instead.",
          difficulty: "core",
          guideRef: "rectangles-triangles",
          hints: [
            "Which length is perpendicular to the base AB (or to AB extended)?",
            "For an obtuse triangle the height can fall outside the triangle.",
            "Use base 5 cm and height 8 cm.",
          ],
          strategy: "Use the perpendicular height",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q07",
          question:
            "A trapezium has an area of 84 cm² and a height of 7 cm. One of its parallel sides is 10 cm long. Find the length of the other parallel side in cm.",
          answer: { type: "number", value: 14, display: "14 cm" },
          traps: [
            { spec: { type: "number", value: 2 }, feedback: "That would make (10 + b) × 7 = 84 — you forgot the half in the formula." },
          ],
          solution: [
            "{{1/2 (10 + b) * 7 = 84}}",
            "Double both sides: (10 + b) × 7 = 168.",
            "Divide by 7: 10 + b = 24.",
            "So b = 14 cm.",
          ],
          solutions: [
            {
              label: "Average width",
              steps: [
                "Area = (average of the parallel sides) × height, so the average is 84 ÷ 7 = 12 cm.",
                "The two parallel sides add to 2 × 12 = 24 cm.",
                "Other side: 24 − 10 = 14 cm. Slicker — thinking of the trapezium as 'average width × height' avoids the fraction.",
              ],
            },
          ],
          commonError: "Forgetting the half, which gives 2 cm — shorter than the side you were given and too small to make an area of 84 cm².",
          difficulty: "core",
          guideRef: "parallelograms-trapezia",
          hints: [
            "Put the numbers you know into {{A = 1/2 (a + b) h}}.",
            "Undo the operations one at a time: double, then divide by 7.",
            "10 + b = 24.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q08",
          question:
            "The diagram shows the side view of a set of concrete steps at a void deck. All corners are right angles, and the three steps are equal in width and equal in height. Find the area of the side view in m².",
          diagram: `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of three equal concrete steps: a staircase shape 9 m along the bottom and 6 m up the left side."><rect x="0" y="0" width="300" height="210" fill="#ffffff"/><polygon points="40,180 265,180 265,130 190,130 190,80 115,80 115,30 40,30" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="152" y="198" text-anchor="middle">9 m</text><text x="32" y="108" text-anchor="end">6 m</text></g></svg>`,
          answer: { type: "number", value: 36, display: "36 m²" },
          traps: [
            { spec: { type: "number", value: 54 }, feedback: "9 × 6 = 54 is the whole surrounding rectangle. The steps leave a staircase-shaped gap at the top right." },
            { spec: { type: "number", value: 30 }, feedback: "30 m is the perimeter. The question asks for the area." },
          ],
          solution: [
            "Three equal steps: each step is 9 ÷ 3 = 3 m wide and 6 ÷ 3 = 2 m tall.",
            "Slice into horizontal layers: bottom layer 9 × 2 = 18 m², middle layer 6 × 2 = 12 m², top layer 3 × 2 = 6 m².",
            "Total: 18 + 12 + 6 = 36 m².",
          ],
          solutions: [
            {
              label: "Count the blocks",
              steps: [
                "Each step is 3 m by 2 m, a 6 m² block.",
                "The shape is a staircase of 3 + 2 + 1 = 6 such blocks.",
                "Area: 6 × 6 = 36 m². Equally quick — and it shows why the answer is 1 + 2 + 3 blocks.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "compound-shapes",
          hints: [
            "How wide and how tall is each step?",
            "Split the shape into horizontal layers (or into equal blocks).",
            "The layers are 9 m, 6 m and 3 m long, each 2 m tall.",
          ],
          strategy: "Split into parts",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p2-q09",
          question:
            "Jun works out the area of this L-shaped room like this:\n\n    Tall part: 4 × 7 = 28 m²\n    Wide part: 9 × 3 = 27 m²\n    Area = 28 + 27 = 55 m²\n\nExplain Jun's mistake and find the correct area.",
          diagram: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shaped room with right-angled corners. The bottom is 9 m, the left side 7 m, the top 4 m and the right side 3 m."><rect x="0" y="0" width="300" height="220" fill="#ffffff"/><polygon points="50,195 266,195 266,123 146,123 146,27 50,27" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="158" y="213" text-anchor="middle">9 m</text><text x="42" y="115" text-anchor="end">7 m</text><text x="98" y="19" text-anchor="middle">4 m</text><text x="274" y="163">3 m</text></g></svg>`,
          marks: 3,
          modelAnswer:
            "Jun's two rectangles overlap. The 4 m by 3 m rectangle in the bottom-left corner is inside both the tall part and the wide part, so he has counted it twice. That overlap has area 4 × 3 = 12 m². The correct area is 55 − 12 = 43 m². Check by splitting without overlap: the tall part 4 × 7 = 28 m² plus the rest of the bottom strip, (9 − 4) × 3 = 15 m², gives 43 m².",
          markScheme: [
            { point: "Identifies that the two rectangles overlap, so part of the room is counted twice", keywords: ["overlap", "twice", "double", "counted"] },
            { point: "The overlap is 4 × 3 = 12 m²", keywords: ["12", "4 × 3", "4 x 3", "corner"] },
            { point: "Correct area 43 m²", keywords: ["43"] },
          ],
          commonError: "Saying Jun 'used the wrong numbers' without spotting that his rectangles overlap.",
          difficulty: "core",
          guideRef: "compound-shapes",
          hints: [
            "Shade Jun's two rectangles on the diagram. Do they share any part?",
            "Which region is inside both rectangles?",
            "Find the overlap's area and take it off once.",
          ],
          strategy: "Spot the error",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p2-q10",
          question:
            "(a) Explain why a prism whose end faces have n sides always has 3n edges. (b) Hence explain why no prism can have exactly 20 edges.",
          marks: 4,
          modelAnswer:
            "(a) Each end face is a polygon with n sides, so it has n edges; the two ends together give 2n edges. Each of the n corners of one end is joined to the matching corner of the other end by one more edge running along the prism, giving n more edges. Total: 2n + n = 3n. (b) So the number of edges of any prism is a multiple of 3. 20 is not a multiple of 3 (20 ÷ 3 = 6 remainder 2), so no prism has 20 edges. The nearest are 18 edges (hexagonal prism) and 21 edges (heptagonal prism).",
          markScheme: [
            { point: "n edges round each end face, so 2n for the two ends", keywords: ["2n", "each end", "n edges", "both ends"] },
            { point: "n more edges join the ends, giving 3n in total", keywords: ["join", "joining", "connect", "along", "3n"] },
            { point: "So the number of edges is always a multiple of 3", keywords: ["multiple of 3", "divisible by 3", "3 times table"] },
            { point: "20 is not a multiple of 3 (18 and 21 are)", keywords: ["20", "not a multiple", "remainder", "18", "21", "not divisible"] },
          ],
          difficulty: "core",
          guideRef: "nets-and-euler",
          hints: [
            "Count the edges round one end face.",
            "How many edges run along the length of the prism, joining the two ends?",
            "Is 20 in the 3 times table?",
          ],
          strategy: "Find a pattern",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q11",
          question:
            "On a plan drawn to a scale of 1 : 50, a rectangular classroom measures 16 cm by 12 cm. Find the real floor area of the classroom in m².",
          answer: { type: "number", value: 48, display: "48 m²" },
          traps: [
            { spec: { type: "number", value: 0.96 }, feedback: "You multiplied the plan's area by 50. But *both* lengths are 50 times bigger, so the area is 50 × 50 = 2500 times bigger. Convert the lengths first." },
            { spec: { type: "number", value: 480000 }, feedback: "480 000 cm² is right in cm². Convert to m²: 1 m² = 100 × 100 = 10 000 cm²." },
          ],
          solution: [
            "Real length: 16 × 50 = 800 cm = 8 m.",
            "Real width: 12 × 50 = 600 cm = 6 m.",
            "Real area: 8 × 6 = 48 m².",
          ],
          commonError: "Scaling the area by 50 instead of converting each length first.",
          difficulty: "core",
          guideRef: "plans-elevations",
          hints: [
            "Change each measurement on the plan to a real length first.",
            "1 cm on the plan is 50 cm = 0.5 m in real life.",
            "Real room: 8 m by 6 m.",
          ],
          strategy: "Convert lengths first",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q12",
          question:
            "A cuboid is 8 cm long and 5 cm wide. Its total surface area is 184 cm². Find its height in cm.",
          answer: { type: "number", value: 4, display: "4 cm" },
          traps: [
            { spec: { type: "number", value: 4.6 }, feedback: "184 ÷ 40 treats 184 as a volume. Surface area adds up face areas: set up 2(40 + 8h + 5h) = 184." },
          ],
          solution: [
            "Surface area = 2(lw + lh + wh).",
            "2(8 × 5 + 8h + 5h) = 184, so 40 + 13h = 92.",
            "13h = 52, so h = 4 cm.",
            "Check: 2 × (40 + 32 + 20) = 2 × 92 = 184 ✓",
          ],
          solutions: [
            {
              label: "Peel off the top and bottom",
              steps: [
                "Top and bottom: 2 × (8 × 5) = 80 cm².",
                "The four side faces make 184 − 80 = 104 cm².",
                "Unfolded, the sides form one strip as long as the perimeter of the base (8 + 5 + 8 + 5 = 26 cm) and h tall: 26h = 104, so h = 4 cm. Slicker — no brackets to expand.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "surface-area",
          hints: [
            "Write the surface area formula with h as the unknown.",
            "The top and bottom are known. How much area is left for the four side faces?",
            "The four sides together have area (perimeter of the base) × h.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q13",
          question:
            "A swimming pool is 25 m long and 10 m wide. The bottom slopes evenly, so the water is 1 m deep at the shallow end and 2 m deep at the deep end. Its side view (cross-section) is a trapezium. How many cubic metres of water does it hold when full?",
          answer: { type: "number", value: 375, display: "375 m³" },
          traps: [
            { spec: { type: "number", value: 750 }, feedback: "The trapezium's area is {{1/2 (1 + 2) * 25}} — you forgot to halve." },
            { spec: { type: "number", value: 500 }, feedback: "That treats the whole pool as 2 m deep. It is only 2 m deep at one end." },
          ],
          solution: [
            "The pool is a prism with a trapezium cross-section: parallel sides 1 m and 2 m, 25 m apart.",
            "Cross-section area: {{1/2 (1 + 2) * 25 = 37.5}} m².",
            "Volume = 37.5 × 10 = 375 m³.",
          ],
          solutions: [
            {
              label: "Average depth",
              steps: [
                "The bottom slopes evenly, so the average depth is (1 + 2) ÷ 2 = 1.5 m.",
                "Volume = 25 × 10 × 1.5 = 375 m³.",
                "Slicker: a trapezium-ended prism holds the same as a cuboid at the average depth.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "volume",
          hints: [
            "Which face of the pool has the same shape all the way across?",
            "The cross-section is a trapezium with parallel sides 1 m and 2 m, and 'height' 25 m.",
            "Volume = cross-section area × 10.",
          ],
          strategy: "Find the cross-section first",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q14",
          question:
            "A cuboid drinks dispenser at a hawker centre is 40 cm long, 30 cm wide and 25 cm tall inside, and it is full of sugarcane juice. How many 250 ml cups can be filled from it?",
          answer: { type: "number", value: 120, display: "120 cups" },
          traps: [
            { spec: { type: "number", value: 30 }, feedback: "30 is the number of litres. Each cup is 250 ml, so change 30 litres into millilitres first." },
          ],
          solution: [
            "Volume: 40 × 30 × 25 = 30 000 cm³ = 30 000 ml.",
            "Number of cups: 30 000 ÷ 250 = 120.",
          ],
          solutions: [
            {
              label: "Cups per litre",
              steps: [
                "30 000 cm³ = 30 litres.",
                "Each litre fills 1000 ÷ 250 = 4 cups.",
                "30 × 4 = 120 cups. Quicker mental arithmetic than dividing by 250.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "volume",
          hints: ["Find the volume in cm³.", "1 cm³ = 1 ml.", "How many lots of 250 ml are in that volume?"],
          strategy: "Check units",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q15",
          question: "A cylindrical tin has a radius of 5 cm and a height of 14 cm. Using {{pi = 22/7}}, find its volume in cm³.",
          answer: { type: "number", value: 1100, display: "1100 cm³" },
          traps: [
            { spec: { type: "number", value: 4400 }, feedback: "You used 10 cm (the diameter) in place of the radius. The radius is 5 cm." },
            { spec: { type: "number", value: 440 }, feedback: "{{2 pi r h}} is the area of the curved side. Volume is {{pi r^2 h}}." },
          ],
          solution: [
            "Volume = {{pi r^2 h}}.",
            "{{22/7 * 5^2 * 14 = 22/7 * 25 * 14}}.",
            "14 ÷ 7 = 2, so this is 22 × 25 × 2 = 1100 cm³.",
          ],
          commonError: "Using the diameter as the radius.",
          difficulty: "core",
          guideRef: "cylinders",
          hints: [
            "Volume of a cylinder = area of the circular base × height.",
            "Area of the base = {{22/7 * 5^2}}.",
            "Cancel the 7 with the 14 before multiplying.",
          ],
          strategy: "Cancel before multiplying",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p2-q16",
          question:
            "Ethan is asked for the surface area of a cuboid 5 cm long, 4 cm wide and 3 cm high. He writes: 5 × 4 × 3 = 60 cm². Explain what he has actually calculated, and work out the correct surface area.",
          marks: 3,
          modelAnswer:
            "5 × 4 × 3 = 60 is the volume of the cuboid, in cm³ — the number of 1 cm cubes that would fill it. Surface area is the total area of the six faces: top and bottom are 5 × 4 = 20 cm² each, front and back are 5 × 3 = 15 cm² each, and the two ends are 4 × 3 = 12 cm² each. Total = 2 × (20 + 15 + 12) = 2 × 47 = 94 cm².",
          markScheme: [
            { point: "He has found the volume (measured in cm³)", keywords: ["volume", "cm³", "cm3", "cubes", "space inside"] },
            { point: "The three different face areas: 20, 15 and 12 cm²", keywords: ["20", "15", "12", "faces"] },
            { point: "Correct surface area: 94 cm²", keywords: ["94"] },
          ],
          difficulty: "core",
          guideRef: "surface-area",
          hints: [
            "What does multiplying length × width × height usually give?",
            "How many faces does a cuboid have, and which ones match?",
            "Find the three different face areas and double their total.",
          ],
          strategy: "Spot the error",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q17",
          question:
            "Square ABCD has sides of 7 cm. Points P, Q, R and S lie on AB, BC, CD and DA so that AP = BQ = CR = DS = 3 cm, and PQRS is a square. Find the area of PQRS in cm².",
          diagram: `<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Square ABCD with a tilted square PQRS inside it. P is on AB, Q on BC, R on CD and S on DA, each 3 cm along from a corner, leaving four right-angled triangles in the corners."><rect x="0" y="0" width="280" height="280" fill="#ffffff"/><rect x="35" y="35" width="210" height="210" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="125,35 245,125 155,245 35,155" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="27" y="30" text-anchor="end">A</text><text x="253" y="30">B</text><text x="253" y="258">C</text><text x="27" y="258" text-anchor="end">D</text><text x="125" y="26" text-anchor="middle">P</text><text x="253" y="129">Q</text><text x="155" y="262" text-anchor="middle">R</text><text x="27" y="159" text-anchor="end">S</text><text x="80" y="52" text-anchor="middle" font-size="12">3 cm</text></g></svg>`,
          answer: { type: "number", value: 25, display: "25 cm²" },
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "Each corner triangle is *half* of a 3 cm by 4 cm rectangle: 6 cm², not 12 cm²." },
            { spec: { type: "number", value: 16 }, feedback: "The side of PQRS is a sloping line, so it is longer than 4 cm. Find the area by subtracting the corner triangles." },
          ],
          solution: [
            "Each corner triangle is right-angled, with shorter sides 3 cm and 7 − 3 = 4 cm.",
            "Each has area {{1/2 * 3 * 4 = 6}} cm², so the four together make 24 cm².",
            "Area of PQRS = 7 × 7 − 24 = 49 − 24 = 25 cm². (So its side is 5 cm — a 3-4-5 triangle in disguise.)",
          ],
          solutions: [
            {
              label: "Pair up the triangles",
              steps: [
                "Two corner triangles fit together into a 3 cm by 4 cm rectangle, so the four make two such rectangles: 2 × 12 = 24 cm².",
                "Area of PQRS = 49 − 24 = 25 cm².",
                "If you know Pythagoras' theorem, it is quickest of all: PQ² = 3² + 4² = 25, and the area of the square is PQ², so 25 cm².",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "compound-shapes",
          hints: [
            "The sides of PQRS are slanted. What shapes are left over in the corners of ABCD?",
            "Each corner triangle has a right angle. How long are its two shorter sides?",
            "Big square minus four triangles.",
          ],
          strategy: "Box it in",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q18",
          question:
            "Siti builds a model of a room at a scale of 1 : 20. The floor of the model has an area of 1500 cm². What is the floor area of the real room, in m²?",
          answer: { type: "number", value: 60, display: "60 m²" },
          traps: [
            { spec: { type: "number", value: 3 }, feedback: "1500 × 20 scales the area as if it were a length. Both the length *and* the width are 20 times bigger, so area is 20 × 20 = 400 times bigger." },
            { spec: { type: "number", value: 600000 }, feedback: "600 000 cm² is correct in cm². Now convert: 1 m² = 10 000 cm²." },
          ],
          solution: [
            "Every length in the real room is 20 times the model's length.",
            "Area depends on two lengths, so it scales by 20 × 20 = 400.",
            "Real area: 1500 × 400 = 600 000 cm².",
            "1 m² = 100 × 100 = 10 000 cm², so 600 000 ÷ 10 000 = 60 m².",
          ],
          solutions: [
            {
              label: "Pick some dimensions",
              steps: [
                "Imagine the model floor is 50 cm by 30 cm (area 1500 cm²).",
                "Real room: 50 × 20 = 1000 cm = 10 m and 30 × 20 = 600 cm = 6 m.",
                "Real area: 10 × 6 = 60 m². Choosing easy numbers makes the area scale factor obvious — a good check on the first method, which is quicker once you trust it.",
              ],
            },
          ],
          commonError: "Multiplying the area by the length scale factor (20) instead of its square (400).",
          difficulty: "challenge",
          guideRef: "plans-elevations",
          hints: [
            "A 1 cm by 1 cm square on the model is what size in real life?",
            "It becomes a 20 cm by 20 cm square — how many times the area?",
            "Area scale factor = 20² = 400. Then convert cm² to m².",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "written",
          id: "perimeter-area-volume-p2-q19",
          question:
            "Mei says: \"If you double the length of a prism, its surface area doubles.\" Is this always, sometimes or never true? Explain your answer.",
          marks: 3,
          modelAnswer:
            "Never true. The surface area of a prism is 2 × (area of cross-section) + (perimeter of cross-section) × length. Doubling the length doubles the rectangular side faces (perimeter × length), but the two end faces stay exactly the same size. Double the old surface area would need the ends to double too, and they don't, so the new surface area is always less than double. Example: a 1 cm cube has surface area 6 cm². Doubling its length gives a 1 × 1 × 2 cuboid with surface area 2 × (1 + 2 + 2) = 10 cm², not 12 cm².",
          markScheme: [
            { point: "States 'never'", keywords: ["never"] },
            { point: "Explains that the side (rectangular) faces double but the two end faces stay the same", keywords: ["ends", "end faces", "stay the same", "don't change", "cross-section", "rectangles double", "sides double"] },
            { point: "Shows the total is less than double, e.g. 6 cm² becomes 10 cm², not 12 cm²", keywords: ["less than double", "10", "12", "not double", "example"] },
          ],
          commonError: "Testing one example and saying 'never' without explaining why it can never work for any prism.",
          difficulty: "challenge",
          guideRef: "surface-area",
          hints: [
            "Try it: a 1 cm cube becomes a 1 × 1 × 2 cuboid. What happens to its surface area?",
            "Which faces change when a prism gets longer, and which stay the same?",
            "Write surface area = (two ends) + (perimeter × length).",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "short",
          id: "perimeter-area-volume-p2-q20",
          question:
            "Jun makes an open-topped box from a square sheet of card 20 cm by 20 cm. He cuts an x cm by x cm square from each corner and folds up the sides. If x must be a whole number of centimetres, what is the largest possible volume of the box, in cm³?",
          answer: { type: "number", value: 588, display: "588 cm³" },
          traps: [
            { spec: { type: "number", value: 576 }, feedback: "Close — that's x = 4. Check x = 3 as well: the volume rises and then falls." },
            { spec: { type: "number", value: 512 }, feedback: "That's x = 2. Keep going: try x = 3 and x = 4." },
          ],
          solution: [
            "After folding, the base is (20 − 2x) by (20 − 2x) and the height is x.",
            "Volume = x(20 − 2x)².",
            "x = 1: 1 × 18² = 324. x = 2: 2 × 16² = 512. x = 3: 3 × 14² = 588. x = 4: 4 × 12² = 576. x = 5: 5 × 10² = 500.",
            "The volume rises to a peak at x = 3, then falls. Largest volume: 588 cm³.",
          ],
          commonError: "Taking 20 − x for the base instead of 20 − 2x — a square is cut from *both* ends of each side.",
          difficulty: "challenge",
          guideRef: "volume",
          hints: [
            "Sketch the net. What are the length, width and height of the box?",
            "Each side of the base loses x from both ends, so it is 20 − 2x.",
            "Make a table of x(20 − 2x)² for x = 1, 2, 3, … and watch it rise then fall.",
          ],
          strategy: "Make a table",
        },
      ],
    },
  ],

  // ============================ CHALLENGE ==================================
  challenge: [
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q01",
      question:
        "P is a point inside rectangle ABCD, which has an area of 60 cm². Joining P to the four corners makes triangles PAB, PBC, PCD and PDA. Triangle PAB has area 13 cm² and triangle PBC has area 21 cm². Find the area of triangle PDA in cm².",
      diagram: `<svg viewBox="0 0 340 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle ABCD with A bottom left, B bottom right, C top right and D top left. A point P inside is joined to all four corners, making four triangles. Triangle PAB is labelled 13 square centimetres, triangle PBC 21 square centimetres, and triangle PDA has a question mark."><rect x="0" y="0" width="340" height="220" fill="#ffffff"/><g stroke="#1f2937" stroke-width="2"><polygon points="30,190 310,190 114,121" fill="#c7d2fe"/><polygon points="310,190 310,30 114,121" fill="#fde68a"/><polygon points="310,30 30,30 114,121" fill="#bbf7d0"/><polygon points="30,30 30,190 114,121" fill="#fecaca"/></g><circle cx="114" cy="121" r="3.5" fill="#1f2937"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="22" y="204" text-anchor="end">A</text><text x="318" y="204">B</text><text x="318" y="26">C</text><text x="22" y="26" text-anchor="end">D</text><text x="104" y="114" text-anchor="end">P</text><text x="151" y="172" text-anchor="middle">13 cm²</text><text x="245" y="118" text-anchor="middle">21 cm²</text><text x="58" y="122" text-anchor="middle">?</text></g></svg>`,
      answer: { type: "number", value: 9, display: "9 cm²" },
      traps: [
        { spec: { type: "number", value: 26 }, feedback: "60 − 13 − 21 = 26 is the total of PCD and PDA together. You need a way to split it." },
        { spec: { type: "number", value: 17 }, feedback: "17 cm² is triangle PCD, which sits opposite PAB. PDA is opposite PBC." },
      ],
      solution: [
        "Triangles PAB and PCD have equal bases (AB = DC, the rectangle's length).",
        "Their heights are the distances from P to AB and from P to DC, which add up to the rectangle's width BC.",
        "So PAB + PCD = {{1/2 * AB * BC}} = half the rectangle = 30 cm², whatever the position of P. The same argument shows PBC + PDA = 30 cm².",
        "Therefore PDA = 30 − 21 = 9 cm².",
      ],
      solutions: [
        {
          label: "Guess with a special case, then justify",
          steps: [
            "Put P at the centre: all four triangles are 15 cm², and opposite triangles add up to 30 cm² — half the rectangle.",
            "Now slide P straight up: PAB grows exactly as fast as PCD shrinks (same base, and their heights trade off), so the pair still totals 30 cm². Sliding sideways does the same for PBC and PDA.",
            "So PDA = 30 − 21 = 9 cm². The special case is the fastest way to *spot* the invariant; the first method is the cleanest *proof*.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "rectangles-triangles",
      hints: [
        "Try P at the centre of the rectangle. What do opposite triangles add up to?",
        "Triangles PAB and PCD have equal bases. What do their two heights add up to?",
        "PAB + PCD is half the rectangle, wherever P is. Is the same true for the other pair?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "written",
      id: "perimeter-area-volume-ch-q02",
      question:
        "A rectangle has whole-number side lengths a cm and b cm, and its area (in cm²) is numerically equal to its perimeter (in cm). Prove that the rectangle must be either 4 cm by 4 cm or 3 cm by 6 cm.",
      marks: 4,
      modelAnswer:
        "Area = perimeter gives ab = 2a + 2b, so ab − 2a − 2b = 0. Add 4 to both sides: ab − 2a − 2b + 4 = 4, which factorises as (a − 2)(b − 2) = 4 (expand to check). Neither side can be 1 or 2: if a = 1 then b = 2 + 2b, which is impossible, and if a = 2 then 2b = 4 + 2b, which is also impossible; the same goes for b. So a − 2 and b − 2 are positive whole numbers that multiply to 4. The only options are 1 × 4, 2 × 2 and 4 × 1, giving a = 3, b = 6; a = 4, b = 4; or a = 6, b = 3. So the rectangle is 3 cm by 6 cm (area 18 cm², perimeter 18 cm) or 4 cm by 4 cm (area 16 cm², perimeter 16 cm), and there are no others.",
      markScheme: [
        { point: "Forms the equation ab = 2a + 2b (or ab = 2(a + b))", keywords: ["ab = 2a + 2b", "ab = 2(a + b)", "2a + 2b", "2(a + b)", "ab"] },
        { point: "Rearranges to (a − 2)(b − 2) = 4, or to {{b = 2 + 4/(a - 2)}}", keywords: ["(a - 2)(b - 2)", "(a-2)(b-2)", "(a − 2)(b − 2)", "= 4", "4/(a-2)", "4/(a - 2)", "factorise"] },
        { point: "Explains why a and b must be more than 2, so only positive factor pairs of 4 count", keywords: ["a = 1", "a = 2", "impossible", "positive", "factor pairs", "1 × 4", "2 × 2", "1 and 4"] },
        { point: "Concludes the only rectangles are 3 by 6 and 4 by 4, and checks them (18 and 16)", keywords: ["3 by 6", "4 by 4", "3 and 6", "4 and 4", "18", "16"] },
      ],
      solutions: [
        {
          label: "Factorise (slicker)",
          steps: [
            "ab = 2a + 2b, so ab − 2a − 2b + 4 = 4.",
            "(a − 2)(b − 2) = 4.",
            "a − 2 and b − 2 are positive whole numbers multiplying to 4: (1, 4), (2, 2), (4, 1).",
            "So (a, b) = (3, 6), (4, 4) or (6, 3). This is slicker: it treats a and b the same way, and the factor pairs give every solution at once.",
          ],
        },
        {
          label: "Make b the subject",
          steps: [
            "ab − 2b = 2a, so b(a − 2) = 2a and {{b = (2a)/(a - 2)}}.",
            "Rewrite: {{(2a)/(a - 2) = (2(a - 2) + 4)/(a - 2) = 2 + 4/(a - 2)}}.",
            "a must be more than 2 (a = 2 makes b(a − 2) = 0, not 4, and a = 1 makes b negative), so a − 2 is positive.",
            "For b to be a whole number, a − 2 must divide 4, so a − 2 = 1, 2 or 4 and a = 3, 4 or 6, giving b = 6, 4 or 3.",
          ],
        },
      ],
      commonError: "Finding the two rectangles by trial and stopping — the question asks you to prove that no others exist.",
      difficulty: "challenge",
      guideRef: "rectangles-triangles",
      hints: [
        "Write 'area = perimeter' as an equation in a and b.",
        "Try small cases: for a = 3, 4, 5, 6, 7, what must b be? Which give whole numbers?",
        "Expand (a − 2)(b − 2). Can you make ab − 2a − 2b = 0 look like that?",
        "(a − 2)(b − 2) = 4. Which pairs of positive whole numbers multiply to 4?",
      ],
      strategy: "Introduce a variable, then factorise",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q03",
      question:
        "A parallelogram is drawn on a centimetre grid with its vertices at (0, 0), (5, 1), (7, 4) and (2, 3). Find its area in cm².",
      diagram: `<svg viewBox="0 0 320 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A parallelogram drawn on a centimetre grid with vertices at (0, 0), (5, 1), (7, 4) and (2, 3). The grid runs from 0 to 7 across and 0 to 4 up."><rect x="0" y="0" width="320" height="210" fill="#ffffff"/><g stroke="#cbd5e1" stroke-width="1"><line x1="40" y1="36" x2="40" y2="180"/><line x1="76" y1="36" x2="76" y2="180"/><line x1="112" y1="36" x2="112" y2="180"/><line x1="148" y1="36" x2="148" y2="180"/><line x1="184" y1="36" x2="184" y2="180"/><line x1="220" y1="36" x2="220" y2="180"/><line x1="256" y1="36" x2="256" y2="180"/><line x1="292" y1="36" x2="292" y2="180"/><line x1="40" y1="180" x2="292" y2="180"/><line x1="40" y1="144" x2="292" y2="144"/><line x1="40" y1="108" x2="292" y2="108"/><line x1="40" y1="72" x2="292" y2="72"/><line x1="40" y1="36" x2="292" y2="36"/></g><polygon points="40,180 220,144 292,36 112,72" fill="#c7d2fe" fill-opacity="0.7" stroke="#1f2937" stroke-width="2"/><g fill="#1f2937"><circle cx="40" cy="180" r="3.5"/><circle cx="220" cy="144" r="3.5"/><circle cx="292" cy="36" r="3.5"/><circle cx="112" cy="72" r="3.5"/></g><g font-family="sans-serif" font-size="11" fill="#334155" text-anchor="middle"><text x="40" y="196">0</text><text x="76" y="196">1</text><text x="112" y="196">2</text><text x="148" y="196">3</text><text x="184" y="196">4</text><text x="220" y="196">5</text><text x="256" y="196">6</text><text x="292" y="196">7</text><text x="28" y="184">0</text><text x="28" y="148">1</text><text x="28" y="112">2</text><text x="28" y="76">3</text><text x="28" y="40">4</text></g></svg>`,
      answer: { type: "number", value: 13, display: "13 cm²" },
      traps: [
        { spec: { type: "number", value: 28 }, feedback: "28 cm² is the 7 by 4 rectangle around the parallelogram. Cut away the corner pieces that lie outside it." },
        { spec: { type: "number", value: 15 }, feedback: "15 cm² is the total of the pieces *outside* the parallelogram. Subtract it from the rectangle." },
      ],
      solution: [
        "Surround the parallelogram with the smallest rectangle on grid lines: 7 by 4, area 28 cm².",
        "Bottom right of the box: a triangle with corners (0, 0), (5, 0), (5, 1), area {{1/2 * 5 * 1 = 2.5}} cm², and a trapezium between x = 5 and x = 7 with vertical sides 1 and 4: {{1/2 (1 + 4) * 2 = 5}} cm².",
        "Top left of the box: a triangle with corners (2, 3), (2, 4), (7, 4), area 2.5 cm², and a trapezium between x = 0 and x = 2 with vertical sides 4 and 1: 5 cm².",
        "Outside pieces: 2.5 + 5 + 2.5 + 5 = 15 cm². Parallelogram: 28 − 15 = 13 cm².",
      ],
      solutions: [
        {
          label: "Pick's theorem (slicker, if you know it)",
          steps: [
            "Count grid points: B = 4 on the boundary (just the four corners, since no edge passes through another grid point) and I = 12 strictly inside (4 on each of the lines y = 1, 2 and 3).",
            "Pick's theorem: area = I + {{B/2}} − 1 = 12 + 2 − 1 = 13 cm².",
            "Quick — but only if you count the inside points carefully. Boxing it in needs no special theorem.",
          ],
        },
      ],
      commonError: "Measuring the sloping sides with a ruler and multiplying them — that doesn't give the area of a parallelogram.",
      difficulty: "challenge",
      guideRef: "parallelograms-trapezia",
      hints: [
        "The sides are slanted, so base × height is awkward. Can you surround the shape with a rectangle on grid lines?",
        "The surrounding rectangle is 7 by 4. What is left over at its corners?",
        "The left-over pieces are two right-angled triangles and two trapezia. Find each area, then subtract them all from 28.",
      ],
      strategy: "Box it in",
    },
    {
      kind: "written",
      id: "perimeter-area-volume-ch-q04",
      question:
        "Ravi cuts an 8 cm by 8 cm square into four pieces — two right-angled triangles and two trapezia — and rearranges them into what looks like a 13 cm by 5 cm rectangle, as shown. The square has area 64 cm², but the rectangle seems to have area 65 cm². Ravi says he has created 1 cm² out of nothing. Explain what has really happened.",
      diagram: `<svg viewBox="0 0 460 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: an 8 by 8 square cut into two right-angled triangles with shorter sides 3 and 8, and two trapezia with parallel sides 3 and 5 and height 5. Right: the same four pieces rearranged into what looks like a 13 by 5 rectangle, with the pieces meeting along its long diagonal."><rect x="0" y="0" width="460" height="200" fill="#ffffff"/><g stroke="#1f2937" stroke-width="1.5"><polygon points="20,84 164,84 20,30" fill="#fde68a"/><polygon points="164,84 164,30 20,30" fill="#fde68a"/><polygon points="20,174 74,174 110,84 20,84" fill="#bbf7d0"/><polygon points="74,174 164,174 164,84 110,84" fill="#bbf7d0"/><polygon points="210,140 354,140 354,86" fill="#fde68a"/><polygon points="354,140 444,140 444,50 354,86" fill="#bbf7d0"/><polygon points="444,50 300,50 300,104" fill="#fde68a"/><polygon points="300,50 210,50 210,140 300,104" fill="#bbf7d0"/></g><g font-family="sans-serif" font-size="12" fill="#1f2937"><text x="92" y="24" text-anchor="middle">8</text><text x="14" y="133" text-anchor="end">5</text><text x="14" y="61" text-anchor="end">3</text><text x="47" y="190" text-anchor="middle">3</text><text x="119" y="190" text-anchor="middle">5</text><text x="282" y="156" text-anchor="middle">8</text><text x="399" y="156" text-anchor="middle">5</text><text x="452" y="99">5</text><text x="187" y="108" text-anchor="middle" font-size="22">→</text></g></svg>`,
      marks: 4,
      modelAnswer:
        "Cutting up a shape and moving the pieces can't change the total area, so the four pieces can't really make a perfect 13 by 5 rectangle — something must be slightly wrong with it. Look at the long 'diagonal'. Along the triangle's sloping edge the height rises 3 cm over 8 cm across, a gradient of {{3/8}} = 0.375. Along the trapezium's sloping edge it rises 2 cm (from 3 cm to 5 cm) over 5 cm across, a gradient of {{2/5}} = 0.4. These are different, so the two edges do not form one straight line: the 'diagonal' bends slightly where the pieces meet. When the two halves are put together, a very thin parallelogram-shaped gap is left along the diagonal — too thin to notice. Its area is exactly 65 − 64 = 1 cm², which is the 'extra' square. No area was created.",
      markScheme: [
        { point: "Says cutting and rearranging can't change area, so the 13 by 5 shape is not a true rectangle", keywords: ["can't create", "cannot create", "same area", "not a rectangle", "not a real rectangle", "64"] },
        { point: "Compares the slopes of the sloping edges: {{3/8}} for the triangle and {{2/5}} for the trapezium", keywords: ["3/8", "2/5", "0.375", "0.4", "gradient", "slope", "steep"] },
        { point: "Concludes the 'diagonal' is not straight, leaving a thin gap along it", keywords: ["not straight", "gap", "bend", "bends", "thin", "sliver", "parallelogram"] },
        { point: "The gap has area 1 cm² (65 − 64)", keywords: ["1 cm", "65 - 64", "65 − 64", "area 1", "extra"] },
      ],
      solutions: [
        {
          label: "Compare the gradients",
          steps: [
            "Triangle edge: up 3 across 8, gradient {{3/8}} = 0.375.",
            "Trapezium edge: up 2 across 5, gradient {{2/5}} = 0.4.",
            "Different gradients, so the 'diagonal' bends and a thin gap of area 65 − 64 = 1 cm² opens along it.",
          ],
        },
        {
          label: "Check one point (slicker)",
          steps: [
            "If the diagonal of a 13 by 5 rectangle were straight, then 8 cm along it, it would be {{8 * 5/13 = 40/13}} ≈ 3.08 cm high.",
            "But the corner of the triangle is only 3 cm high, so the pieces meet just below the true diagonal.",
            "The other half does the same, upside down, so a thin gap opens along the diagonal. Checking one point needs less work than comparing two gradients.",
          ],
        },
      ],
      commonError: "Saying 'the pieces were measured wrong' without explaining exactly where the extra 1 cm² comes from.",
      difficulty: "challenge",
      guideRef: "compound-shapes",
      hints: [
        "Can cutting and moving pieces ever change the total area? So what must be wrong with the 'rectangle'?",
        "Look closely at the long diagonal. Is it really one straight line?",
        "Compare how steep the triangle's sloping edge is with how steep the trapezium's sloping edge is.",
        "Triangle: up 3 across 8. Trapezium: up 2 across 5. Are {{3/8}} and {{2/5}} equal?",
      ],
      strategy: "Spot the flaw",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q05",
      question:
        "A ball is stitched together from pentagons and hexagons only. Exactly three faces meet at every vertex, and every edge is shared by exactly two faces. The ball has 30 hexagons. Treating the ball as a polyhedron, how many vertices does it have?",
      answer: { type: "number", value: 80 },
      traps: [
        { spec: { type: "number", value: 240 }, feedback: "240 counts every vertex three times — once for each face that meets there. Divide by 3." },
        { spec: { type: "number", value: 60 }, feedback: "60 is the number of vertices of a standard football, which has 20 hexagons. This ball has 30." },
      ],
      solution: [
        "Let the number of pentagons be P. Then F = P + 30.",
        "Count the sides of every face: 5P + 180. Each edge is shared by 2 faces, so {{E = (5P + 180)/2}}.",
        "Count the corners of every face: also 5P + 180. Each vertex is shared by 3 faces, so {{V = (5P + 180)/3}}.",
        "Euler: V + F − E = 2. Multiply every term by 6: 2(5P + 180) + 6(P + 30) − 3(5P + 180) = 12.",
        "10P + 360 + 6P + 180 − 15P − 540 = 12, so P = 12.",
        "V = (5 × 12 + 180) ÷ 3 = 240 ÷ 3 = 80. (Check: E = 120, F = 42, and 80 + 42 − 120 = 2 ✓)",
      ],
      solutions: [
        {
          label: "Let the hexagons cancel (slicker)",
          steps: [
            "With P pentagons and H hexagons: {{V = (5P + 6H)/3}}, {{E = (5P + 6H)/2}}, F = P + H.",
            "Then V + F − E = {{(5P + 6H)/3 - (5P + 6H)/2 + P + H = P/6}}. The H terms cancel completely!",
            "So {{P/6 = 2}} and P = 12 for *every* such ball, whatever H is.",
            "With P = 12 and H = 30: V = (60 + 180) ÷ 3 = 80. Seeing that H cancels is the slicker insight — it explains why every football has exactly 12 pentagons.",
          ],
        },
      ],
      commonError: "Forgetting that each edge belongs to two faces and each vertex to three, so face-by-face counts must be divided.",
      difficulty: "challenge",
      guideRef: "nets-and-euler",
      hints: [
        "Call the number of pentagons P. Try to write F, E and V in terms of P.",
        "Count the sides of all the faces — each edge gets counted twice. Count the corners of all the faces — each vertex gets counted three times.",
        "Substitute your expressions into {{V + F - E = 2}} and solve for P.",
        "You should find P = 12. Now V = (5 × 12 + 6 × 30) ÷ 3.",
      ],
      strategy: "Count in two ways",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q06",
      question:
        "A solid is built from 1 cm cubes. Its plan is a rectangle 3 squares wide and 2 squares deep, and every square of the plan has at least one cube on it. The front elevation shows three columns of heights 3 cm, 1 cm and 2 cm from left to right. The side elevation shows that the tallest stack in the back row is 2 cm high and the tallest stack in the front row is 3 cm high. What are the least and the greatest numbers of cubes the solid could contain? Give the least first.",
      answer: { type: "list", values: [9, 11], ordered: true, display: "9, 11" },
      traps: [
        { spec: { type: "list", values: [11, 9], ordered: true }, feedback: "Right numbers — but give the least first." },
        { spec: { type: "list", values: [6, 11], ordered: true }, feedback: "6 puts one cube on each square, but then no stack would be 3 or 2 cm tall. Some stacks *must* be taller to match the elevations." },
        { spec: { type: "list", values: [9, 12], ordered: true }, feedback: "12 needs a stack of 3 in the back row, but the side elevation says the back row is at most 2 cm tall." },
      ],
      solution: [
        "Greatest: each stack can be as tall as both views allow — the smaller of its column's height and its row's height.",
        "Back row (max 2): 2, 1, 2 — that's 5 cubes. Front row (max 3): 3, 1, 2 — that's 6 cubes. Greatest = 11.",
        "Least: start with 1 cube on each of the 6 squares.",
        "The left column needs a stack of 3, and it must be in the front row (the back row is at most 2): 2 extra cubes.",
        "The right column needs a stack of 2, and so does the back row. One stack of 2 at the back right does both jobs: 1 extra cube.",
        "Least = 6 + 2 + 1 = 9.",
      ],
      solutions: [
        {
          label: "Check the least with a plan",
          steps: [
            "Back row: 1, 1, 2. Front row: 3, 1, 1.",
            "Front view (tallest in each column): 3, 1, 2 ✓. Side view (tallest in each row): back 2, front 3 ✓.",
            "Total 9 — and every extra cube was forced, so 9 is the least. Writing the plan out is the surest way to check an 'extreme' answer.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "plans-elevations",
      hints: [
        "For the greatest, how tall can each stack be without breaking either view?",
        "A stack can be no taller than its column's height in the front view, or its row's height in the side view.",
        "For the least, start with one cube per square. Which stacks *must* be taller?",
        "Can one tall stack satisfy a column and a row at the same time?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q07",
      question:
        "A large cube is built from small 1 cm cubes, and its whole outside is painted red. When it is taken apart, exactly 96 of the small cubes have paint on exactly one face. How many small cubes have no paint at all?",
      answer: { type: "number", value: 64 },
      traps: [
        { spec: { type: "number", value: 216 }, feedback: "216 is the total number of small cubes (6 × 6 × 6). The unpainted ones are hidden inside, in a smaller core." },
        { spec: { type: "number", value: 16 }, feedback: "16 is the number of one-face cubes on a single face, (n − 2)². The unpainted core is a cube, (n − 2)³." },
      ],
      solution: [
        "Say the large cube is n small cubes along each edge.",
        "On each face, the cubes with exactly one painted face form the inner (n − 2) by (n − 2) square — the ones not on an edge.",
        "So 6(n − 2)² = 96, giving (n − 2)² = 16, so n − 2 = 4 and n = 6.",
        "The unpainted cubes form the hidden core: (n − 2)³ = 4³ = 64.",
      ],
      solutions: [
        {
          label: "Try small cases",
          steps: [
            "n = 3: 6 × 1 = 6 one-face cubes. n = 4: 6 × 4 = 24. n = 5: 6 × 9 = 54. n = 6: 6 × 16 = 96 ✓",
            "For n = 6, peeling off the painted outer layer leaves a 4 × 4 × 4 core: 64 cubes.",
            "Working backwards with algebra is slicker; the table is a good check and shows the pattern.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "surface-area",
      hints: [
        "Picture one face of the big cube. Which small cubes on it have only one painted face?",
        "If the big cube is n cubes along an edge, how many one-face cubes are on one face? How many on all six?",
        "6 × (n − 2)² = 96. Work backwards to find n.",
        "The unpainted cubes form a smaller cube hidden inside.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q08",
      question:
        "A staircase is built from 1 cm cubes in a single layer, one cube deep. From left to right, its columns are 10, 9, 8, …, 2, 1 cubes tall (55 cubes in all). What is the total surface area of the staircase, in cm²?",
      answer: { type: "number", value: 150, display: "150 cm²" },
      traps: [
        { spec: { type: "number", value: 330 }, feedback: "6 × 55 counts every face of every cube, including the faces glued together and hidden inside." },
        { spec: { type: "number", value: 75 }, feedback: "55 + 10 + 10 counts the view from the front, top and one side once each. Every view has a matching view from the opposite direction." },
      ],
      solution: [
        "Front and back: 55 squares each, so 110 cm².",
        "Top: each column has one top face showing (at different heights): 10. Bottom: 10. Total 20 cm².",
        "Left side: only the tallest column's side shows: 10 cm². Right side: each column sticks up 1 cube above the next, so the 'risers' total 1 + 1 + … + 1 = 10 cm².",
        "Total: 110 + 20 + 10 + 10 = 150 cm².",
      ],
      solutions: [
        {
          label: "Look from six directions (slicker)",
          steps: [
            "From the front you see 55 squares, from above 10, and from the left 10.",
            "The back, bottom and right views show the same amounts: 55, 10 and 10.",
            "Total: 2 × (55 + 10 + 10) = 150 cm². This works here because no exposed face is hidden behind another face pointing the same way — for shapes with dents or overhangs you must count more carefully.",
          ],
        },
      ],
      commonError: "Multiplying the number of cubes by 6, which counts the hidden glued faces.",
      difficulty: "challenge",
      guideRef: "surface-area",
      hints: [
        "Try a small case first: a staircase of columns 2 and 1 (3 cubes). Count its outside faces.",
        "Instead of counting cube by cube, look at the staircase from the front, from above and from the side. What do you see each time?",
        "Front: 55 squares. Top: 10. Side: 10. What about the back, the bottom and the other side?",
      ],
      strategy: "Use the views",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q09",
      question: "A cuboid has three different faces with areas 24 cm², 30 cm² and 80 cm². Find its volume in cm³.",
      answer: { type: "number", value: 240, display: "240 cm³" },
      traps: [
        { spec: { type: "number", value: 57600 }, feedback: "24 × 30 × 80 = 57 600 is the volume *squared* — every edge appears twice in that product. Take the square root." },
        { spec: { type: "number", value: 134 }, feedback: "Adding the face areas doesn't give a volume. Think about which edges make up each face." },
      ],
      solution: [
        "Call the edges l, w and h, with lw = 24, wh = 30 and lh = 80.",
        "Multiply all three: (lw) × (wh) × (lh) = {{l^2 w^2 h^2 = (lwh)^2}}.",
        "So {{(lwh)^2}} = 24 × 30 × 80 = 57 600.",
        "Volume = lwh = {{sqrt(57600)}} = 240 cm³.",
      ],
      solutions: [
        {
          label: "Find the edges first",
          steps: [
            "Look for whole numbers: lw = 24 and wh = 30 share w. Try w = 3: then l = 8 and h = 10.",
            "Check: 8 × 3 = 24 ✓, 3 × 10 = 30 ✓, 8 × 10 = 80 ✓.",
            "Volume = 8 × 3 × 10 = 240 cm³. Trial works here, but multiplying the three areas is slicker — it still works when the edges are not whole numbers.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "volume",
      hints: [
        "Call the edge lengths l, w and h. Write the three face areas in terms of them.",
        "What do you get if you multiply all three face areas together?",
        "Each of l, w and h appears twice in that product. How does it compare with the volume lwh?",
      ],
      strategy: "Introduce variables",
    },
    {
      kind: "short",
      id: "perimeter-area-volume-ch-q10",
      question:
        "A rectangular sheet of card measures 22 cm by 14 cm. It can be rolled into an open tube (a cylinder with no ends) in two ways: with the 22 cm edge going round the tube, or with the 14 cm edge going round. Using {{pi = 22/7}}, how many more cubic centimetres does the larger tube hold than the smaller one?",
      answer: { type: "number", value: 196, display: "196 cm³" },
      traps: [
        { spec: { type: "number", value: 0 }, feedback: "Same card, but not the same volume! The radius gets squared, so the wider tube holds more." },
        { spec: { type: "number", value: 539 }, feedback: "539 cm³ is the volume of the larger tube. The question asks how much *more* it holds than the smaller one." },
      ],
      solution: [
        "Tube A — 22 cm round, 14 cm tall: {{2 pi r = 22}}, so r = 22 × {{7/44}} = 3.5 cm. Volume = {{22/7 * 3.5^2 * 14}} = 22 × 12.25 × 2 = 539 cm³.",
        "Tube B — 14 cm round, 22 cm tall: r = 14 × {{7/44}} = {{49/22}} cm. Volume = {{22/7 * (49/22)^2 * 22 = 2401/7}} = 343 cm³.",
        "Difference: 539 − 343 = 196 cm³.",
      ],
      solutions: [
        {
          label: "A formula in C and h (slicker)",
          steps: [
            "If the edge going round is C, then {{r = C/(2 pi)}}, so {{V = pi r^2 h = (C^2 h)/(4 pi)}}.",
            "Tube A: {{(22^2 * 14)/(4 pi)}}. Tube B: {{(14^2 * 22)/(4 pi)}}. Their ratio is 22 : 14 = 11 : 7.",
            "With {{4 pi = 88/7}}: A = 484 × 14 × {{7/88}} = 539 and B = 196 × 22 × {{7/88}} = 343, a difference of 196 cm³.",
            "Slicker, and it shows at once why the short, fat tube wins: the edge that goes round gets squared.",
          ],
        },
      ],
      commonError: "Using the edge length as the diameter or radius — it is the circumference of the tube.",
      difficulty: "challenge",
      guideRef: "cylinders",
      hints: [
        "The edge that goes round the tube becomes its circumference. Find the radius from {{C = 2 pi r}}.",
        "For the 22 cm edge going round: {{2 * 22/7 * r = 22}}, so r = 3.5 cm.",
        "For the 14 cm edge going round, r = 14 × {{7/44}} = {{49/22}} cm. Keep {{22/7}} as a fraction — lots will cancel.",
        "Work out each volume with {{V = pi r^2 h}}, then subtract.",
      ],
      strategy: "Compare two cases",
    },
  ],
};
