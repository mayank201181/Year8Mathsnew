import type { Topic } from "../types";

export const perimeterAreaVolume: Topic = {
  id: "perimeter-area-volume",
  title: "Perimeter, Area & Volume",
  subject: "Maths",
  icon: "🟦",
  strand: "Geometry & Measure",
  intro:
    "Areas of rectangles, triangles, parallelograms and trapezia; compound shapes; the circumference and area of circles; and the surface area and volume of cuboids and prisms — measuring how far around, how much surface, and how much space a shape takes up.",
  guide: [
    {
      heading: "Area of rectangles, triangles and parallelograms",
      discovery: {
        problem:
          "A rectangle is 8 cm by 5 cm. Cut it along a diagonal into two identical triangles. What is the area of one triangle? Now slide a sloping parallelogram's triangular end across to the other side — what rectangle does it become?",
        idea: "The rectangle has area 8 × 5 = 40 cm², so each triangle is half of it: 20 cm². A parallelogram rearranges into a rectangle of the same base and height, so its area is base × height too.",
      },
      body:
        "**Area** is the amount of flat space inside a shape, measured in square units (cm², m²).\n\n- Rectangle: **area = length × width**.\n- Triangle: **area = ½ × base × height** (the height is the perpendicular height).\n- Parallelogram: **area = base × height** (again the perpendicular height, not the slant side).\n\n**Perimeter** is the distance all the way around — just add up the side lengths.",
      diagrams: [
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangle with base b and perpendicular height h, area equals half base times height"><polygon points="20,100 180,100 70,20" fill="none" stroke="black" stroke-width="2"/><line x1="70" y1="20" x2="70" y2="100" stroke="gray" stroke-dasharray="4" stroke-width="1"/><text x="95" y="115" font-size="13">base b</text><text x="74" y="65" font-size="13">h</text></svg>',
      ],
      keyPoints: [
        "Rectangle area = length × width.",
        "Triangle area = ½ × base × height.",
        "Parallelogram area = base × height.",
        "Always use the perpendicular height, not the slant side.",
      ],
      strategies: ["Identify base and perpendicular height", "Keep area in square units (cm²)"],
      whyItWorks:
        "A triangle is exactly half of a rectangle (or parallelogram) on the same base and height, so its area is ½ × base × height. A parallelogram cut at one end and reassembled forms a rectangle of equal base and height, so it has area base × height.",
    },
    {
      heading: "Trapezia and compound shapes",
      discovery: {
        problem:
          "A trapezium has parallel sides 6 cm and 10 cm, 4 cm apart. Two copies placed together make a parallelogram with base 6 + 10 = 16 cm and height 4 cm. What is the trapezium's area?",
        idea: "The parallelogram has area 16 × 4 = 64 cm², and the trapezium is half of that: 32 cm². This is the rule area = ½ × (a + b) × h.",
      },
      body:
        "A **trapezium** has one pair of parallel sides, lengths a and b, a distance h apart:\n\n**Area = ½ × (a + b) × h**\n\nA **compound shape** is built from simpler shapes. Split it into rectangles and triangles, find each area, then add them up (or subtract a cut-out). Find any missing lengths from the sides you are given.",
      diagrams: [
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A trapezium with parallel sides a and b that are height h apart"><polygon points="50,25 150,25 185,95 15,95" fill="none" stroke="black" stroke-width="2"/><text x="92" y="20" font-size="13">a</text><text x="92" y="112" font-size="13">b</text><line x1="100" y1="25" x2="100" y2="95" stroke="gray" stroke-dasharray="4" stroke-width="1"/><text x="104" y="62" font-size="13">h</text></svg>',
      ],
      keyPoints: [
        "Trapezium area = ½ × (a + b) × h, where a and b are the parallel sides.",
        "Split compound shapes into rectangles and triangles.",
        "Add the parts (or subtract a removed piece).",
        "Work out missing lengths from the given sides.",
      ],
      strategies: ["Split, then add or subtract", "Find missing lengths before calculating"],
      whyItWorks:
        "Two identical trapezia rotated together form a parallelogram of base (a + b) and height h, with area (a + b) × h. One trapezium is half of this, giving ½ × (a + b) × h.",
    },
    {
      heading: "Circles: circumference and area",
      discovery: {
        problem:
          "Wrap a string once around any circular tin and then straighten it. The wrapped length is always a little more than 3 times across the tin. About how many 'diameters' fit around a circle — and what do we call that number?",
        idea: "The distance around (circumference) is always π ≈ 3.14 times the diameter, for every circle. π is the fixed ratio of circumference to diameter.",
      },
      body:
        "For a circle of radius r (and diameter d = 2r), using **π ≈ 3.14**:\n\n- **Circumference = π × d = 2 × π × r** (the distance around).\n- **Area = π × r²** (square the radius first, then multiply by π).\n\nA common slip is squaring the diameter instead of the radius — area always uses **r²**.",
      diagrams: [
        '<svg viewBox="0 0 160 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle with centre marked, radius r and diameter d"><circle cx="80" cy="80" r="60" fill="none" stroke="black" stroke-width="2"/><line x1="80" y1="80" x2="140" y2="80" stroke="gray" stroke-width="2"/><circle cx="80" cy="80" r="2" fill="black"/><text x="100" y="74" font-size="14">r</text><text x="55" y="100" font-size="12">d = 2r</text></svg>',
      ],
      keyPoints: [
        "Circumference = π × d = 2 × π × r.",
        "Area = π × r² (square the radius, not the diameter).",
        "Diameter d = 2 × radius r.",
        "Use π ≈ 3.14 when a number is needed.",
      ],
      strategies: ["Find r first if given the diameter", "Square the radius before multiplying by π"],
      whyItWorks:
        "π is defined as circumference ÷ diameter, the same for every circle, so circumference = π × d follows directly. The area π × r² comes from slicing a circle into thin sectors and rearranging them into a near-rectangle of width π × r and height r.",
    },
    {
      heading: "Surface area and volume of cuboids and prisms",
      discovery: {
        problem:
          "A cuboid is 4 cm by 3 cm by 2 cm. How many 1 cm cubes fit inside it? And if you wanted to gift-wrap it, how much paper covers the outside?",
        idea: "It holds 4 × 3 × 2 = 24 unit cubes, so the volume is 24 cm³. The surface area is the total of all six rectangular faces: 2(4×3 + 4×2 + 3×2) = 52 cm².",
      },
      body:
        "**Volume** is the space inside a solid, measured in cubic units (cm³, m³).\n\n- Cuboid: **volume = length × width × height**.\n- Any **prism**: **volume = cross-sectional area × length**.\n\n**Surface area** is the total area of all the faces (measured in cm²). For a cuboid this is 2(lw + lh + wh). For a prism, add the two end faces to the area of all the rectangular sides.",
      diagrams: [
        '<svg viewBox="0 0 200 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A cuboid with length, width and height labelled"><polygon points="30,50 130,50 130,110 30,110" fill="none" stroke="black" stroke-width="2"/><polygon points="30,50 60,25 160,25 130,50" fill="none" stroke="black" stroke-width="2"/><polygon points="130,50 160,25 160,85 130,110" fill="none" stroke="black" stroke-width="2"/><text x="70" y="128" font-size="12">length</text><text x="138" y="85" font-size="12">height</text><text x="95" y="42" font-size="12">width</text></svg>',
      ],
      keyPoints: [
        "Cuboid volume = length × width × height (cm³).",
        "Prism volume = cross-sectional area × length.",
        "Cuboid surface area = 2(lw + lh + wh) (cm²).",
        "Volume uses cm³; area/surface area uses cm².",
      ],
      strategies: [
        "For a prism, find the cross-section area first",
        "List all faces so none are missed for surface area",
      ],
      whyItWorks:
        "A prism is many identical thin layers stacked along its length; each layer's size is the cross-sectional area, so total volume = cross-section × length. A cuboid is the special case where the cross-section is a rectangle.",
    },
  ],
  learn: {
    cards: [
      { front: "Area of a rectangle", back: "length × width." },
      { front: "Area of a triangle", back: "½ × base × height (perpendicular height)." },
      { front: "Area of a parallelogram", back: "base × height." },
      { front: "Area of a trapezium", back: "½ × (a + b) × h, a and b the parallel sides." },
      { front: "Circumference of a circle", back: "π × d = 2 × π × r." },
      { front: "Area of a circle", back: "π × r² (square the radius)." },
      { front: "Volume of a cuboid", back: "length × width × height (cm³)." },
      { front: "Volume of a prism", back: "cross-sectional area × length." },
      { front: "Surface area of a cuboid", back: "2(lw + lh + wh)." },
      { front: "Value of π (for calculating)", back: "About 3.14." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "area-mcq-q01",
        question: "What is the area of a rectangle 9 cm long and 4 cm wide?",
        options: ["13 cm²", "26 cm²", "36 cm²", "36 cm"],
        answerIndex: 2,
        explanation: "Area = length × width = 9 × 4 = 36 cm².",
        difficulty: "warmup",
        guideRef: "Area of rectangles, triangles and parallelograms",
        strategy: "length × width",
      },
      {
        id: "area-mcq-q02",
        question: "A triangle has base 10 cm and perpendicular height 6 cm. Its area is:",
        options: ["16 cm²", "30 cm²", "60 cm²", "30 cm"],
        answerIndex: 1,
        explanation: "Area = ½ × base × height = ½ × 10 × 6 = 30 cm².",
        difficulty: "warmup",
        guideRef: "Area of rectangles, triangles and parallelograms",
        strategy: "½ × base × height",
      },
      {
        id: "area-mcq-q03",
        question:
          "A trapezium has parallel sides 7 cm and 11 cm, which are 5 cm apart. Its area is:",
        options: ["45 cm²", "90 cm²", "55 cm²", "38.5 cm²"],
        answerIndex: 0,
        explanation: "Area = ½ × (7 + 11) × 5 = ½ × 18 × 5 = 45 cm².",
        difficulty: "core",
        guideRef: "Trapezia and compound shapes",
        hints: ["Use ½ × (a + b) × h.", "Add the parallel sides first: 7 + 11 = 18.", "½ × 18 × 5 = 45 cm²."],
        strategy: "½ × (a + b) × h",
      },
      {
        id: "area-mcq-q04",
        question:
          "A circle has radius 5 cm. Using π ≈ 3.14, its area is closest to:",
        options: ["15.7 cm²", "31.4 cm²", "78.5 cm²", "157 cm²"],
        answerIndex: 2,
        explanation: "Area = π × r² = 3.14 × 5² = 3.14 × 25 = 78.5 cm².",
        difficulty: "core",
        guideRef: "Circles: circumference and area",
        hints: ["Area uses r², not the diameter.", "Square the radius: 5² = 25.", "3.14 × 25 = 78.5 cm²."],
        strategy: "π × r² (square r first)",
      },
      {
        id: "area-mcq-q05",
        question: "A cuboid measures 5 cm by 4 cm by 3 cm. Its volume is:",
        options: ["12 cm³", "47 cm³", "60 cm³", "94 cm³"],
        answerIndex: 2,
        explanation: "Volume = 5 × 4 × 3 = 60 cm³.",
        difficulty: "core",
        guideRef: "Surface area and volume of cuboids and prisms",
        strategy: "length × width × height",
      },
      {
        id: "area-mcq-q06",
        question:
          "A triangular prism has a cross-section of area 12 cm² and length 9 cm. Its volume is:",
        options: ["21 cm³", "108 cm³", "54 cm³", "108 cm²"],
        answerIndex: 1,
        explanation: "Volume = cross-sectional area × length = 12 × 9 = 108 cm³.",
        difficulty: "challenge",
        guideRef: "Surface area and volume of cuboids and prisms",
        hints: [
          "Volume of a prism = cross-section area × length.",
          "Multiply the given area by the length.",
          "12 × 9 = 108 cm³.",
        ],
        strategy: "cross-section area × length",
      },
    ],
    qa: [
      {
        id: "area-qa-q01",
        question:
          "A circle has diameter 14 cm. Using π ≈ 3.14, work out its circumference. Show your working.",
        modelAnswer:
          "Circumference = π × d = 3.14 × 14 = 43.96 cm.",
        markScheme: ["Use C = π × d [1]", "3.14 × 14 [1]", "= 43.96 cm [1]"],
        commonError: "Using the radius in the diameter formula, or squaring anything (that is for area).",
        difficulty: "core",
        guideRef: "Circles: circumference and area",
        hints: ["Circumference uses the diameter directly.", "C = π × d.", "3.14 × 14 = 43.96 cm."],
        strategy: "C = π × d",
        solutions: [
          {
            label: "Using the diameter",
            steps: ["C = π × d", "= 3.14 × 14", "= 43.96 cm"],
          },
          {
            label: "Using the radius",
            steps: ["r = 14 ÷ 2 = 7 cm", "C = 2 × π × r = 2 × 3.14 × 7", "= 43.96 cm"],
          },
        ],
      },
      {
        id: "area-qa-q02",
        question:
          "An L-shaped compound floor is made from a 6 cm by 4 cm rectangle joined to a 3 cm by 2 cm rectangle. Find the total area.",
        modelAnswer:
          "Area of the larger rectangle = 6 × 4 = 24 cm². Area of the smaller = 3 × 2 = 6 cm². Total = 24 + 6 = 30 cm².",
        markScheme: ["6 × 4 = 24 cm² [1]", "3 × 2 = 6 cm² [1]", "Total = 30 cm² [1]"],
        difficulty: "core",
        guideRef: "Trapezia and compound shapes",
        hints: ["Split the L-shape into two rectangles.", "Find each area separately.", "Add them together."],
        strategy: "Split into rectangles, then add",
      },
      {
        id: "area-qa-q03",
        question:
          "A cuboid measures 6 cm by 4 cm by 2 cm. Work out (a) its volume and (b) its surface area.",
        modelAnswer:
          "(a) Volume = 6 × 4 × 2 = 48 cm³. (b) Surface area = 2(6×4 + 6×2 + 4×2) = 2(24 + 12 + 8) = 2 × 44 = 88 cm².",
        markScheme: [
          "Volume = 6 × 4 × 2 = 48 cm³ [1]",
          "Pairs: 6×4 = 24, 6×2 = 12, 4×2 = 8 [1]",
          "Surface area = 2(24 + 12 + 8) = 88 cm² [1]",
        ],
        commonError: "Mixing units — volume is cm³ but surface area is cm².",
        difficulty: "challenge",
        guideRef: "Surface area and volume of cuboids and prisms",
        hints: [
          "Volume = length × width × height.",
          "Surface area uses three different face pairs.",
          "2(lw + lh + wh).",
        ],
        strategy: "Volume by multiplying; surface area face by face",
      },
      {
        id: "area-qa-q04",
        question:
          "Challenge: A rectangle has a perimeter of 24 cm. Show that a 6 cm by 6 cm square gives a larger area than a 4 cm by 8 cm rectangle, and state the largest possible area.",
        modelAnswer:
          "Both have perimeter 24 cm (since 2(6+6) = 24 and 2(4+8) = 24). Square area = 6 × 6 = 36 cm²; rectangle area = 4 × 8 = 32 cm². The square is larger. For a fixed perimeter the area is greatest when the shape is a square, so the largest area is 36 cm².",
        markScheme: [
          "Confirms both perimeters are 24 cm [1]",
          "Square area = 36 cm², rectangle area = 32 cm² [1]",
          "States the square gives the maximum area, 36 cm² [1]",
        ],
        commonError: "Assuming a longer, thinner rectangle has the most area for a fixed perimeter.",
        difficulty: "challenge",
        guideRef: "Area of rectangles, triangles and parallelograms",
        hints: [
          "Check both rectangles really have perimeter 24 cm.",
          "Work out each area and compare.",
          "For a fixed perimeter, area is largest when length = width (a square).",
        ],
        strategy: "Compare areas for a fixed perimeter; the square is optimal",
        solutions: [
          {
            label: "Compare the two shapes",
            steps: [
              "Square: 2(6 + 6) = 24 cm, area 6 × 6 = 36 cm²",
              "Rectangle: 2(4 + 8) = 24 cm, area 4 × 8 = 32 cm²",
              "36 > 32, so the square is larger",
            ],
          },
          {
            label: "Test the pattern",
            steps: [
              "With perimeter 24, length + width = 12",
              "Try 1×11=11, 3×9=27, 5×7=35, 6×6=36",
              "Area peaks at 6×6 = 36 cm² (the square)",
            ],
          },
        ],
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "area-mcq-paper-1",
        title: "Perimeter, Area & Volume — MCQ Set A",
        questions: [
          {
            id: "area-mcq-b1-q01",
            question: "What is the perimeter of a square of side 7 cm?",
            options: ["14 cm", "28 cm", "49 cm", "21 cm"],
            answerIndex: 1,
            explanation: "Perimeter = 4 × 7 = 28 cm.",
            difficulty: "warmup",
          },
          {
            id: "area-mcq-b1-q02",
            question: "A parallelogram has base 8 cm and height 5 cm. Its area is:",
            options: ["13 cm²", "20 cm²", "40 cm²", "26 cm²"],
            answerIndex: 2,
            explanation: "Area = base × height = 8 × 5 = 40 cm².",
            difficulty: "warmup",
          },
          {
            id: "area-mcq-b1-q03",
            question:
              "A circle has diameter 10 cm. Using π ≈ 3.14, its circumference is:",
            options: ["15.7 cm", "31.4 cm", "62.8 cm", "78.5 cm"],
            answerIndex: 1,
            explanation: "C = π × d = 3.14 × 10 = 31.4 cm.",
            difficulty: "core",
            hints: ["Circumference uses the diameter.", "3.14 × 10 = 31.4 cm."],
            strategy: "C = π × d",
          },
          {
            id: "area-mcq-b1-q04",
            question:
              "A triangle has area 24 cm² and base 8 cm. Its perpendicular height is:",
            options: ["3 cm", "6 cm", "12 cm", "16 cm"],
            answerIndex: 1,
            explanation: "Area = ½ × base × height, so 24 = ½ × 8 × h = 4h, giving h = 6 cm.",
            difficulty: "core",
            hints: ["Put the numbers into ½ × base × height.", "24 = 4 × h.", "h = 24 ÷ 4 = 6 cm."],
            strategy: "Rearrange the area formula",
          },
          {
            id: "area-mcq-b1-q05",
            question: "A cube has edge 3 cm. Its volume is:",
            options: ["9 cm³", "18 cm³", "27 cm³", "54 cm³"],
            answerIndex: 2,
            explanation: "Volume = 3 × 3 × 3 = 27 cm³.",
            difficulty: "core",
            strategy: "edge × edge × edge",
          },
          {
            id: "area-mcq-b1-q06",
            question:
              "A circle has radius 10 cm. Using π ≈ 3.14, which is its area?",
            options: ["31.4 cm²", "62.8 cm²", "314 cm²", "628 cm²"],
            answerIndex: 2,
            explanation: "Area = π × r² = 3.14 × 10² = 3.14 × 100 = 314 cm².",
            difficulty: "challenge",
            hints: ["Area uses r², not the diameter.", "10² = 100.", "3.14 × 100 = 314 cm²."],
            strategy: "π × r²",
          },
        ],
      },
      {
        id: "area-mcq-paper-2",
        title: "Perimeter, Area & Volume — MCQ Set B",
        questions: [
          {
            id: "area-mcq-b2-q01",
            question: "The perimeter of a rectangle 12 cm by 5 cm is:",
            options: ["17 cm", "34 cm", "60 cm", "30 cm"],
            answerIndex: 1,
            explanation: "Perimeter = 2(12 + 5) = 2 × 17 = 34 cm.",
            difficulty: "warmup",
          },
          {
            id: "area-mcq-b2-q02",
            question: "1 m² is the same as:",
            options: ["100 cm²", "1000 cm²", "10 000 cm²", "1 000 000 cm²"],
            answerIndex: 2,
            explanation: "1 m = 100 cm, so 1 m² = 100 × 100 = 10 000 cm².",
            difficulty: "core",
            hints: ["1 m = 100 cm.", "Square both sides: 100 × 100."],
            strategy: "Convert lengths, then square",
          },
          {
            id: "area-mcq-b2-q03",
            question:
              "A trapezium has parallel sides 5 cm and 9 cm, 6 cm apart. Its area is:",
            options: ["42 cm²", "84 cm²", "27 cm²", "21 cm²"],
            answerIndex: 0,
            explanation: "Area = ½ × (5 + 9) × 6 = ½ × 14 × 6 = 42 cm².",
            difficulty: "core",
            strategy: "½ × (a + b) × h",
          },
          {
            id: "area-mcq-b2-q04",
            question:
              "A prism has a cross-section of area 15 cm² and length 8 cm. Its volume is:",
            options: ["23 cm³", "120 cm³", "60 cm³", "120 cm²"],
            answerIndex: 1,
            explanation: "Volume = cross-section × length = 15 × 8 = 120 cm³.",
            difficulty: "core",
            strategy: "cross-section area × length",
          },
          {
            id: "area-mcq-b2-q05",
            question:
              "A rectangle has area 48 cm² and width 6 cm. Its length is:",
            options: ["6 cm", "8 cm", "12 cm", "42 cm"],
            answerIndex: 1,
            explanation: "Length = area ÷ width = 48 ÷ 6 = 8 cm.",
            difficulty: "core",
            strategy: "Rearrange area = length × width",
          },
          {
            id: "area-mcq-b2-q06",
            question:
              "A rectangle is 10 cm by 6 cm. A quarter-circle of radius 6 cm is cut from one corner. Using π ≈ 3.14, the remaining area is closest to:",
            options: ["31.7 cm²", "60 cm²", "88.3 cm²", "28.3 cm²"],
            answerIndex: 0,
            explanation:
              "Rectangle = 10 × 6 = 60 cm². Quarter-circle = ¼ × 3.14 × 6² = ¼ × 3.14 × 36 = 28.26 cm². Remaining = 60 − 28.26 = 31.74 ≈ 31.7 cm².",
            difficulty: "challenge",
            hints: [
              "Find the full rectangle area first.",
              "Quarter-circle area = ¼ × π × r².",
              "Subtract the quarter-circle from the rectangle.",
            ],
            strategy: "Subtract a part-circle from a rectangle",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "area-qa-paper-1",
        title: "Perimeter, Area & Volume — Written Set A",
        questions: [
          {
            id: "area-qa-b1-q01",
            question:
              "A rectangular garden is 12 m long and 7 m wide. Find (a) its area and (b) its perimeter.",
            modelAnswer:
              "(a) Area = 12 × 7 = 84 m². (b) Perimeter = 2(12 + 7) = 2 × 19 = 38 m.",
            markScheme: ["Area = 12 × 7 = 84 m² [1]", "Perimeter = 2(12 + 7) [1]", "= 38 m [1]"],
            difficulty: "core",
            strategy: "Area = l × w; perimeter = 2(l + w)",
          },
          {
            id: "area-qa-b1-q02",
            question:
              "A circle has radius 8 cm. Using π ≈ 3.14, find (a) its circumference and (b) its area.",
            modelAnswer:
              "(a) Circumference = 2 × π × r = 2 × 3.14 × 8 = 50.24 cm. (b) Area = π × r² = 3.14 × 8² = 3.14 × 64 = 200.96 cm².",
            markScheme: [
              "C = 2 × 3.14 × 8 = 50.24 cm [1]",
              "8² = 64 [1]",
              "Area = 3.14 × 64 = 200.96 cm² [1]",
            ],
            commonError: "Using the diameter for area, or forgetting to square the radius.",
            difficulty: "core",
            guideRef: "Circles: circumference and area",
            strategy: "C = 2πr; A = πr²",
          },
          {
            id: "area-qa-b1-q03",
            question:
              "Challenge: A swimming pool is a prism. Its cross-section is a trapezium with parallel sides (depths) 1 m and 3 m, 25 m apart, and the pool is 10 m wide. Find the volume of water it holds when full.",
            modelAnswer:
              "Cross-section area = ½ × (1 + 3) × 25 = ½ × 4 × 25 = 50 m². Volume = cross-section × width = 50 × 10 = 500 m³.",
            markScheme: [
              "Cross-section = ½ × (1 + 3) × 25 = 50 m² [1]",
              "Volume = cross-section × length [1]",
              "= 50 × 10 = 500 m³ [1]",
            ],
            difficulty: "challenge",
            guideRef: "Surface area and volume of cuboids and prisms",
            hints: [
              "The pool is a prism: find the trapezium cross-section first.",
              "Trapezium area = ½ × (a + b) × h.",
              "Volume = cross-section area × width (10 m).",
            ],
            strategy: "Trapezium cross-section × length",
            solutions: [
              {
                label: "Cross-section then length",
                steps: ["½ × (1 + 3) × 25 = 50 m²", "Volume = 50 × 10", "= 500 m³"],
              },
              {
                label: "Average-depth view",
                steps: [
                  "Average depth = (1 + 3) ÷ 2 = 2 m",
                  "Surface area of pool = 25 × 10 = 250 m²",
                  "Volume = 250 × 2 = 500 m³",
                ],
              },
            ],
          },
          {
            id: "area-qa-b1-q04",
            question:
              "Challenge: A solid cube has edge 2 cm. Each edge is doubled to 4 cm. Show how many times bigger the volume becomes, and explain why.",
            modelAnswer:
              "Small cube volume = 2 × 2 × 2 = 8 cm³. Large cube volume = 4 × 4 × 4 = 64 cm³. 64 ÷ 8 = 8, so the volume is 8 times bigger. Doubling each of the three dimensions multiplies the volume by 2 × 2 × 2 = 8.",
            markScheme: [
              "Small volume 8 cm³ and large volume 64 cm³ [1]",
              "64 ÷ 8 = 8 times bigger [1]",
              "Explains scale factor cubed: 2³ = 8 [1]",
            ],
            commonError: "Thinking doubling the length only doubles the volume.",
            difficulty: "challenge",
            guideRef: "Surface area and volume of cuboids and prisms",
            hints: [
              "Work out both volumes separately.",
              "Divide the big volume by the small one.",
              "Volume scales by (length factor)³.",
            ],
            strategy: "Compute both volumes, then compare (scale factor cubed)",
          },
        ],
      },
    ],
  },
};
