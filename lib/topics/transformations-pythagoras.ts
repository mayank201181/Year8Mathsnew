import type { Topic } from "../types";

export const transformationsPythagoras: Topic = {
  id: "transformations-pythagoras",
  title: "Transformations & Pythagoras",
  subject: "Maths",
  icon: "🔺",
  strand: "Geometry & Measure",
  intro:
    "Slide, flip, turn and resize shapes with reflections, rotations, translations and enlargements — then unlock right-angled triangles with Pythagoras' theorem.",
  guide: [
    {
      heading: "Reflections, rotations and translations",
      discovery: {
        problem:
          "A triangle has corners at (1, 1), (4, 1) and (1, 3). Reflect it in the y-axis. Where do the three corners land — and what happens to each x-coordinate?",
        idea:
          "Reflecting in the y-axis flips the sign of every x-coordinate: (1, 1) → (−1, 1), (4, 1) → (−4, 1), (1, 3) → (−1, 3). The shape is the same size — only its position and 'handedness' change.",
      },
      body:
        "A **transformation** moves or resizes a shape. The starting shape is the **object** and the result is the **image**.\n\nThree transformations keep the shape exactly the same size (they are **congruent**):\n\n- **Reflection** flips a shape across a *mirror line*. Each point and its image are the same distance from the line, on opposite sides. Common mirror lines: the x-axis (y = 0), the y-axis (x = 0), y = x and y = −x.\n- **Rotation** turns a shape about a fixed *centre* by an *angle* in a *direction* (clockwise or anticlockwise). You must state all three to describe it fully.\n- **Translation** slides a shape with no turning or flipping, described by a **column vector** (x, y): x is the move right (or left if negative), y is the move up (or down if negative).",
      keyPoints: [
        "Reflection in the x-axis: (x, y) → (x, −y). In the y-axis: (x, y) → (−x, y).",
        "To describe a rotation fully you need centre, angle and direction.",
        "A translation by column vector (3, −2) means 3 right and 2 down.",
        "Reflections, rotations and translations all preserve length and angle — the image is congruent to the object.",
      ],
      strategies: ["Track one point at a time", "Use tracing paper for rotations"],
      diagrams: [
        '<svg viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangle reflected across a vertical mirror line">\n  <line x1="100" y1="10" x2="100" y2="110" stroke="#888" stroke-dasharray="4 4" />\n  <polygon points="40,100 80,100 40,40" fill="#9cf" stroke="#036" />\n  <polygon points="160,100 120,100 160,40" fill="#fc9" stroke="#630" />\n  <text x="48" y="115" font-size="10">object</text>\n  <text x="128" y="115" font-size="10">image</text>\n</svg>',
      ],
    },
    {
      heading: "Enlargements, congruence and similarity",
      discovery: {
        problem:
          "A photo 6 cm wide and 4 cm tall is enlarged by scale factor 3. What are its new dimensions, and how many times bigger is its area?",
        idea:
          "Lengths multiply by the scale factor: 6 × 3 = 18 cm and 4 × 3 = 12 cm. But area multiplies by the scale factor squared: 3² = 9, so the area becomes 9 times bigger. The enlarged photo is the same shape (similar) but not the same size.",
      },
      body:
        "An **enlargement** changes a shape's size by a **scale factor** from a fixed point called the **centre of enlargement**.\n\nEvery length is multiplied by the scale factor. A scale factor greater than 1 makes the shape bigger; a factor between 0 and 1 makes it smaller. The distance of each point from the centre is also multiplied by the scale factor.\n\nTwo shapes are **congruent** if they are *exactly the same size and shape* (one fits on the other after a reflection, rotation or translation). Two shapes are **similar** if they are *the same shape but different sizes* — one is an enlargement of the other, so matching angles are equal and matching sides are in the same ratio.",
      keyPoints: [
        "Enlargement needs a scale factor AND a centre of enlargement.",
        "Lengths × scale factor; area × (scale factor)².",
        "Congruent = same shape and same size (scale factor 1).",
        "Similar = same shape, equal angles, sides in the same ratio.",
      ],
      strategies: ["Measure distances from the centre", "Compare matching sides as a ratio"],
      whyItWorks:
        "Area scales by the square of the scale factor because area depends on two lengths multiplied together. If each length triples, the product 3 × 3 = 9, so the area is 9 times larger.",
    },
    {
      heading: "Pythagoras: finding the hypotenuse",
      discovery: {
        problem:
          "Draw squares on the three sides of a right-angled triangle with shorter sides 3 and 4. Those squares have areas 9 and 16. The square on the longest side has what area — and so how long is that side?",
        idea:
          "The square on the longest side has area 9 + 16 = 25, so the side is √25 = 5. The areas of the two smaller squares add up to the area of the largest. This is Pythagoras' theorem: a² + b² = c².",
      },
      body:
        "In any right-angled triangle, the longest side — opposite the right angle — is the **hypotenuse**.\n\n**Pythagoras' theorem** states that the square of the hypotenuse equals the sum of the squares of the other two sides:\n\n**a² + b² = c²**, where c is the hypotenuse.\n\nTo find the hypotenuse, square the two shorter sides, add them, then take the square root.\n\nExample: shorter sides 6 and 8. c² = 6² + 8² = 36 + 64 = 100, so c = √100 = 10.",
      keyPoints: [
        "The hypotenuse is the longest side, opposite the right angle.",
        "a² + b² = c² where c is the hypotenuse.",
        "Hypotenuse: add the squares, then square-root.",
        "Always check the answer is longer than each shorter side.",
      ],
      strategies: ["Label the hypotenuse first", "Square, add, then root"],
      whyItWorks:
        "Place four copies of the right-angled triangle inside a large square of side (a + b). The leftover space is a tilted square of side c, area c². Rearranging the same four triangles instead leaves two squares of areas a² and b². Same leftover space, so a² + b² = c².",
      diagrams: [
        '<svg viewBox="0 0 160 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Right-angled triangle with squares on its sides showing 9 plus 16 equals 25">\n  <polygon points="40,100 100,100 40,60" fill="#fff" stroke="#000" />\n  <rect x="40" y="100" width="60" height="20" fill="#cfc" stroke="#063" />\n  <text x="62" y="115" font-size="9">16</text>\n  <rect x="20" y="60" width="20" height="40" fill="#ccf" stroke="#006" />\n  <text x="24" y="84" font-size="9">9</text>\n  <text x="105" y="72" font-size="9">25</text>\n  <rect x="40" y="94" width="6" height="6" fill="none" stroke="#000" />\n</svg>',
      ],
    },
    {
      heading: "Pythagoras: shorter sides, triples and real life",
      discovery: {
        problem:
          "A ladder 5 m long leans against a wall, with its foot 3 m from the wall. How far up the wall does it reach? You know the hypotenuse and one short side — not two short sides.",
        idea:
          "Rearrange Pythagoras: the missing short side b satisfies b² = c² − a² = 5² − 3² = 25 − 9 = 16, so b = 4 m. When you know the hypotenuse, you *subtract* the squares instead of adding.",
      },
      body:
        "To find a **shorter side**, rearrange the theorem to **a² = c² − b²**: square the hypotenuse, subtract the square of the known side, then square-root.\n\nA **Pythagorean triple** is a set of three whole numbers that fit a² + b² = c² exactly. Knowing a few saves time:\n\n- **3, 4, 5** (and multiples like 6, 8, 10 and 9, 12, 15)\n- **5, 12, 13**\n- **8, 15, 17**\n\nReal-life problems — ladders, ramps, diagonals of rectangles, distances 'as the crow flies' — are almost always Pythagoras in disguise. Sketch a right-angled triangle and label what you know.",
      keyPoints: [
        "Shorter side: a² = c² − b² (subtract, then root).",
        "Recognise triples: 3-4-5, 5-12-13, 8-15-17 and their multiples.",
        "Subtract only when the hypotenuse is one of the known sides.",
        "Always draw and label the right-angled triangle first.",
      ],
      thinkDeeper:
        "If the three sides satisfy a² + b² = c², the triangle is right-angled. If a² + b² < c² the largest angle is obtuse; if a² + b² > c² it is acute. Pythagoras is also a test for right angles.",
      strategies: ["Decide: add or subtract?", "Look for a known triple first"],
    },
  ],
  learn: {
    cards: [
      { front: "Reflection in the x-axis maps (x, y) to …?", back: "(x, −y) — the y-coordinate changes sign." },
      { front: "Reflection in the y-axis maps (x, y) to …?", back: "(−x, y) — the x-coordinate changes sign." },
      { front: "What three things describe a rotation?", back: "Centre of rotation, angle, and direction (clockwise/anticlockwise)." },
      { front: "What does the column vector (4, −3) mean?", back: "Translate 4 right and 3 down." },
      { front: "Enlargement needs which two pieces of information?", back: "A scale factor and a centre of enlargement." },
      { front: "Congruent vs similar?", back: "Congruent = same shape AND size. Similar = same shape, different size (equal angles, sides in ratio)." },
      { front: "Pythagoras' theorem", back: "a² + b² = c², where c is the hypotenuse (longest side, opposite the right angle)." },
      { front: "Name two Pythagorean triples.", back: "3, 4, 5 and 5, 12, 13 (also 8, 15, 17)." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "trans-mcq-q01",
        question: "Which transformation slides a shape using a column vector, with no turning or flipping?",
        options: ["Reflection", "Rotation", "Translation", "Enlargement"],
        answerIndex: 2,
        explanation: "A translation slides every point by the same column vector; the shape's orientation is unchanged.",
        difficulty: "warmup",
        guideRef: "Reflections, rotations and translations",
        strategy: "Match the description to the name",
      },
      {
        id: "trans-mcq-q02",
        question: "The point (5, 2) is reflected in the x-axis. What is its image?",
        options: ["(−5, 2)", "(5, −2)", "(−5, −2)", "(2, 5)"],
        answerIndex: 1,
        explanation: "Reflecting in the x-axis keeps x the same and flips the sign of y: (5, 2) → (5, −2).",
        difficulty: "core",
        guideRef: "Reflections, rotations and translations",
        hints: ["The x-axis is the line y = 0.", "Reflecting in the x-axis changes only the sign of y."],
        strategy: "Track one point's coordinates",
      },
      {
        id: "trans-mcq-q03",
        question: "A right-angled triangle has shorter sides 9 cm and 12 cm. How long is the hypotenuse?",
        options: ["15 cm", "21 cm", "√21 cm", "225 cm"],
        answerIndex: 0,
        explanation: "c² = 9² + 12² = 81 + 144 = 225, so c = √225 = 15 cm. (It is the 3-4-5 triple ×3.)",
        difficulty: "core",
        guideRef: "Pythagoras: finding the hypotenuse",
        hints: ["Use a² + b² = c².", "Square each shorter side and add.", "81 + 144 = 225; now square-root."],
        strategy: "Square, add, then root",
      },
      {
        id: "trans-mcq-q04",
        question: "A rectangle of area 12 cm² is enlarged by scale factor 4. What is the area of the image?",
        options: ["48 cm²", "16 cm²", "192 cm²", "96 cm²"],
        answerIndex: 2,
        explanation: "Area multiplies by the scale factor squared: 4² = 16, so 12 × 16 = 192 cm².",
        difficulty: "challenge",
        guideRef: "Enlargements, congruence and similarity",
        hints: ["Lengths scale by 4 — but does area scale by 4?", "Area scales by the scale factor squared.", "4² = 16, so multiply the area by 16."],
        strategy: "Use area scales by (scale factor)²",
      },
      {
        id: "trans-mcq-q05",
        question: "A ladder 13 m long has its foot 5 m from a wall. How far up the wall does it reach?",
        options: ["8 m", "12 m", "18 m", "√194 m"],
        answerIndex: 1,
        explanation: "The hypotenuse is 13. b² = 13² − 5² = 169 − 25 = 144, so b = 12 m. (5-12-13 triple.)",
        difficulty: "challenge",
        guideRef: "Pythagoras: shorter sides, triples and real life",
        hints: ["The ladder is the hypotenuse.", "To find a shorter side, subtract: c² − a².", "169 − 25 = 144; √144 = 12."],
        strategy: "Subtract the squares to find a shorter side",
      },
    ],
    qa: [
      {
        id: "trans-qa-q01",
        question:
          "Triangle T has vertices A(1, 2), B(4, 2) and C(1, 4). Translate T by the column vector (−2, 3). Give the coordinates of the image A′B′C′.",
        modelAnswer: "Add (−2, 3) to each vertex: A′(−1, 5), B′(2, 5), C′(−1, 7).",
        markScheme: ["A′ = (1 − 2, 2 + 3) = (−1, 5) [1]", "B′ = (4 − 2, 2 + 3) = (2, 5) [1]", "C′ = (1 − 2, 4 + 3) = (−1, 7) [1]"],
        commonError: "Adding the vector to only the first vertex, or mixing up the order of x and y.",
        difficulty: "core",
        guideRef: "Reflections, rotations and translations",
        hints: ["A translation adds the same vector to every vertex.", "Add −2 to each x and +3 to each y."],
        strategy: "Apply the vector to every vertex",
      },
      {
        id: "trans-qa-q02",
        question:
          "A right-angled triangle has a hypotenuse of 17 cm and one shorter side of 8 cm. Find the other shorter side. Show your working.",
        modelAnswer: "a² = 17² − 8² = 289 − 64 = 225, so a = √225 = 15 cm. (This is the 8-15-17 triple.)",
        markScheme: ["Uses a² = c² − b² with c = 17 [1]", "289 − 64 = 225 [1]", "a = √225 = 15 cm [1]"],
        commonError: "Adding the squares (17² + 8²) instead of subtracting, because the hypotenuse is known.",
        difficulty: "core",
        guideRef: "Pythagoras: shorter sides, triples and real life",
        hints: ["The hypotenuse is the 17 cm side.", "Subtract the squares to find a shorter side."],
        strategy: "Subtract when the hypotenuse is known",
        solutions: [
          { label: "Rearranged Pythagoras", steps: ["a² = 17² − 8²", "= 289 − 64 = 225", "a = √225 = 15 cm"] },
          { label: "Recognise the triple", steps: ["8 and 17 appear in the triple 8, 15, 17.", "The missing side must be 15.", "Check: 8² + 15² = 64 + 225 = 289 = 17². ✓"] },
        ],
      },
      {
        id: "trans-qa-q03",
        question:
          "Challenge: A 10 m ladder rests against a wall, reaching 8 m up. The foot slips so the ladder now reaches only 6 m up the wall. How much further from the wall is the foot now?",
        modelAnswer:
          "The ladder length (hypotenuse) stays 10 m. At first the foot is √(10² − 8²) = √(100 − 64) = √36 = 6 m from the wall. After slipping the foot is √(10² − 6²) = √(100 − 36) = √64 = 8 m from the wall. It moved 8 − 6 = 2 m further out.",
        markScheme: [
          "Recognises the ladder (hypotenuse) stays 10 m [1]",
          "First distance √(100 − 64) = 6 m [1]",
          "New distance √(100 − 36) = 8 m [1]",
          "Difference 8 − 6 = 2 m [1]",
        ],
        commonError: "Assuming the foot moves the same 2 m that the top dropped — the relationship is not linear.",
        difficulty: "challenge",
        guideRef: "Pythagoras: shorter sides, triples and real life",
        hints: [
          "The ladder length never changes — it is the hypotenuse both times.",
          "Find the foot's distance before and after using a² = c² − b².",
          "Before: √(100 − 64). After: √(100 − 36).",
          "Subtract the two distances.",
        ],
        strategy: "Apply Pythagoras twice, then compare",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "trans-mcq-paper-1",
        title: "Transformations & Pythagoras — MCQ Set A",
        questions: [
          {
            id: "trans-mcq-b1-q01",
            question: "Which transformation always produces a shape congruent to the original?",
            options: ["Enlargement scale factor 2", "Enlargement scale factor 0.5", "Reflection", "None of these"],
            answerIndex: 2,
            explanation: "Reflections preserve length and angle, so the image is congruent. Enlargements (other than scale factor 1) change the size.",
            difficulty: "warmup",
          },
          {
            id: "trans-mcq-b1-q02",
            question: "What does the column vector (0, −5) describe?",
            options: ["5 left", "5 right", "5 up", "5 down"],
            answerIndex: 3,
            explanation: "The first number is horizontal (0, no sideways move) and the second is vertical: −5 means 5 down.",
            difficulty: "warmup",
          },
          {
            id: "trans-mcq-b1-q03",
            question: "The point (3, 4) is reflected in the y-axis. What is its image?",
            options: ["(−3, 4)", "(3, −4)", "(−3, −4)", "(4, 3)"],
            answerIndex: 0,
            explanation: "Reflecting in the y-axis changes the sign of x only: (3, 4) → (−3, 4).",
            difficulty: "core",
            hints: ["The y-axis is x = 0; reflecting flips x's sign."],
            strategy: "Track the coordinates",
          },
          {
            id: "trans-mcq-b1-q04",
            question: "A right-angled triangle has shorter sides 5 cm and 12 cm. Find the hypotenuse.",
            options: ["13 cm", "17 cm", "√17 cm", "169 cm"],
            answerIndex: 0,
            explanation: "c² = 5² + 12² = 25 + 144 = 169, so c = √169 = 13 cm.",
            difficulty: "core",
            hints: ["Square both shorter sides and add.", "25 + 144 = 169, then square-root."],
            strategy: "Square, add, then root",
          },
          {
            id: "trans-mcq-b1-q05",
            question: "Two shapes are similar but not congruent. Which statement is true?",
            options: [
              "They have the same area",
              "Their matching angles are equal and matching sides are in the same ratio",
              "One is a reflection of the other only",
              "They are exactly the same size",
            ],
            answerIndex: 1,
            explanation: "Similar shapes have equal matching angles and matching sides in a constant ratio (the scale factor); they differ in size, so areas differ.",
            difficulty: "core",
            strategy: "Recall the definition of similar",
          },
          {
            id: "trans-mcq-b1-q06",
            question: "A triangle has sides 7 cm, 24 cm and 25 cm. Is it right-angled?",
            options: ["Yes, because 7² + 24² = 25²", "No, because 7 + 24 > 25", "Yes, because 7 + 24 = 31", "Cannot tell without the angles"],
            answerIndex: 0,
            explanation: "7² + 24² = 49 + 576 = 625 = 25². Since a² + b² = c², the triangle is right-angled (the 7-24-25 triple).",
            difficulty: "challenge",
            hints: ["Test whether a² + b² = c² for the longest side.", "49 + 576 = ?  Compare with 25² = 625."],
            strategy: "Use Pythagoras as a right-angle test",
          },
        ],
      },
      {
        id: "trans-mcq-paper-2",
        title: "Transformations & Pythagoras — MCQ Set B",
        questions: [
          {
            id: "trans-mcq-b2-q01",
            question: "A shape is rotated 90° clockwise. What is needed to describe this rotation fully?",
            options: ["Just the angle", "Angle and direction only", "Centre, angle and direction", "A column vector"],
            answerIndex: 2,
            explanation: "A rotation is fully described by its centre, angle and direction.",
            difficulty: "warmup",
          },
          {
            id: "trans-mcq-b2-q02",
            question: "A square of side 4 cm is enlarged by scale factor 3. What is the new side length?",
            options: ["7 cm", "12 cm", "1.33 cm", "36 cm"],
            answerIndex: 1,
            explanation: "Lengths multiply by the scale factor: 4 × 3 = 12 cm.",
            difficulty: "warmup",
          },
          {
            id: "trans-mcq-b2-q03",
            question: "Reflecting (−2, 6) in the x-axis gives:",
            options: ["(2, 6)", "(−2, −6)", "(2, −6)", "(6, −2)"],
            answerIndex: 1,
            explanation: "Reflecting in the x-axis flips the sign of y only: (−2, 6) → (−2, −6).",
            difficulty: "core",
            hints: ["Only the y-coordinate changes sign."],
            strategy: "Track the coordinates",
          },
          {
            id: "trans-mcq-b2-q04",
            question: "A rectangle is 6 m by 8 m. How long is its diagonal?",
            options: ["10 m", "14 m", "48 m", "√14 m"],
            answerIndex: 0,
            explanation: "The diagonal is the hypotenuse: √(6² + 8²) = √(36 + 64) = √100 = 10 m.",
            difficulty: "core",
            hints: ["The diagonal splits the rectangle into right-angled triangles.", "Use the two sides as a and b."],
            strategy: "Diagonal = hypotenuse",
          },
          {
            id: "trans-mcq-b2-q05",
            question: "Which set of side lengths is NOT a Pythagorean triple?",
            options: ["6, 8, 10", "5, 12, 13", "8, 15, 17", "4, 5, 6"],
            answerIndex: 3,
            explanation: "4² + 5² = 16 + 25 = 41, but 6² = 36, so 4, 5, 6 do not satisfy a² + b² = c². The others do.",
            difficulty: "core",
            hints: ["Check whether a² + b² = c² for the largest side."],
            strategy: "Test each set",
          },
          {
            id: "trans-mcq-b2-q06",
            question:
              "Point P is enlarged from centre O(0, 0) by scale factor 2. If P is at (3, 5), where is its image P′?",
            options: ["(6, 10)", "(5, 7)", "(1.5, 2.5)", "(3, 5)"],
            answerIndex: 0,
            explanation: "From the origin, multiply each coordinate by the scale factor: (3 × 2, 5 × 2) = (6, 10).",
            difficulty: "challenge",
            hints: ["The distance from the centre is multiplied by the scale factor.", "With centre at the origin, just multiply both coordinates by 2."],
            strategy: "Scale coordinates from the centre",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "trans-qa-paper-1",
        title: "Transformations & Pythagoras — Written Set A",
        questions: [
          {
            id: "trans-qa-b1-q01",
            question: "Describe fully the single transformation that maps a shape onto its image when each point (x, y) becomes (x + 5, y − 2).",
            modelAnswer: "A translation by the column vector (5, −2): 5 right and 2 down.",
            markScheme: ["Identifies it as a translation [1]", "Gives the column vector (5, −2) [1]"],
            difficulty: "warmup",
          },
          {
            id: "trans-qa-b1-q02",
            question:
              "A flagpole is supported by a straight wire from its top to a point on the ground 9 m from its base. The pole is 12 m tall. How long is the wire?",
            modelAnswer: "The wire is the hypotenuse: √(12² + 9²) = √(144 + 81) = √225 = 15 m.",
            markScheme: ["Sets up 12² + 9² [1]", "144 + 81 = 225 [1]", "Wire = √225 = 15 m [1]"],
            commonError: "Subtracting instead of adding — here both shorter sides are known, so add.",
            difficulty: "core",
            hints: ["Sketch a right-angled triangle: pole, ground, wire.", "The wire is the longest side, so add the squares."],
            strategy: "Square, add, then root",
          },
          {
            id: "trans-qa-b1-q03",
            question:
              "Two similar rectangles have matching sides in the ratio 2 : 5. The smaller has area 8 cm². Find the area of the larger.",
            modelAnswer:
              "Area scale factor = (5 ÷ 2)² = (2.5)² = 6.25. Larger area = 8 × 6.25 = 50 cm².",
            markScheme: ["Length scale factor 5 ÷ 2 = 2.5 [1]", "Area scale factor 2.5² = 6.25 [1]", "8 × 6.25 = 50 cm² [1]"],
            commonError: "Multiplying the area by the length ratio 2.5 instead of by its square.",
            difficulty: "challenge",
            hints: ["Find the length scale factor first.", "Area scales by the square of the length scale factor.", "Multiply 8 by 2.5²."],
            strategy: "Use area scales by (scale factor)²",
            solutions: [
              { label: "Scale-factor squared", steps: ["Length scale factor = 5/2 = 2.5", "Area scale factor = 2.5² = 6.25", "8 × 6.25 = 50 cm²"] },
              { label: "Ratio of areas", steps: ["Areas are in ratio 2² : 5² = 4 : 25", "Smaller area 8 corresponds to 4 parts, so 1 part = 2", "Larger area = 25 × 2 = 50 cm²"] },
            ],
          },
          {
            id: "trans-qa-b1-q04",
            question:
              "Challenge: A square has a diagonal of 10 cm. Find the side length of the square, giving your answer to 1 decimal place.",
            modelAnswer:
              "Let the side be s. The diagonal is the hypotenuse of a right-angled triangle with both shorter sides s, so s² + s² = 10², i.e. 2s² = 100, s² = 50, s = √50 ≈ 7.1 cm.",
            markScheme: ["Sets up s² + s² = 10² [1]", "2s² = 100 so s² = 50 [1]", "s = √50 [1]", "≈ 7.1 cm [1]"],
            commonError: "Treating the diagonal as a side, or forgetting both shorter sides are equal.",
            difficulty: "challenge",
            hints: ["The diagonal cuts the square into two right-angled triangles.", "Both shorter sides equal the side length s.", "So s² + s² = 10². Solve for s."],
            strategy: "Set up Pythagoras with two equal sides",
          },
        ],
      },
    ],
  },
};
