import type { TopicPractice } from "../../types.ts";

// Transformations & Symmetry (with a Pythagoras preview) — quiz, two practice
// papers and a challenge set. Column vectors are written "(top over bottom)",
// matching the guide.

export const practice: TopicPractice = {
  // ======================================================================
  // QUICK-CHECK QUIZ — 4 mcq, 5 short, 1 written · 3 warmup, 6 core, 1 challenge
  // ======================================================================
  quiz: [
    {
      kind: "mcq",
      id: "transformations-pythagoras-quiz-q01",
      question:
        "A regular pentagon has 5 equal sides and 5 equal angles. How many lines of symmetry does it have, and what is its order of rotational symmetry?",
      options: [
        "10 lines of symmetry; rotational symmetry of order 5",
        "5 lines of symmetry; rotational symmetry of order 72",
        "5 lines of symmetry; rotational symmetry of order 5",
        "5 lines of symmetry; rotational symmetry of order 1",
      ],
      answerIndex: 2,
      explanation:
        "Each line of symmetry runs from a vertex to the midpoint of the opposite side, so there is one line per vertex: 5 lines. A turn of {{360/5}} = 72° fits the pentagon onto itself, and it fits 5 times in one full turn, so the order is 5.\n\n10 comes from counting 'lines through vertices' and 'lines through midpoints of sides' separately — in a polygon with an odd number of sides they are the same lines. 72 is the *angle* of the smallest turn, not the order. Order 1 comes from testing only a half-turn: a pentagon upside down doesn't fit, but a 72° turn does.",
      difficulty: "warmup",
      guideRef: "symmetry",
      hints: ["Draw a line of symmetry through one vertex of a pentagon. Where does it come out on the other side?"],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-quiz-q02",
      question:
        "The point (−3, 5) is translated by the column vector (4 over −7). Give the coordinates of its image as (x, y).",
      answer: { type: "list", values: [1, -2], ordered: true, display: "(1, −2)" },
      solution: [
        "Top number 4: move 4 right, so x = −3 + 4 = 1.",
        "Bottom number −7: move 7 down, so y = 5 − 7 = −2.",
        "The image is (1, −2).",
      ],
      commonError: "Swapping the jobs of the two numbers: the top number is the move across, the bottom number is the move up or down.",
      traps: [
        { spec: { type: "list", values: [-10, 9], ordered: true }, feedback: "You used the bottom number for x and the top number for y. The top number (4) is the move across." },
        { spec: { type: "list", values: [-7, 12], ordered: true }, feedback: "You moved the opposite way. Add the vector to the point: −3 + 4 and 5 + (−7)." },
      ],
      difficulty: "warmup",
      guideRef: "translation",
      hints: ["Add the top number to x and the bottom number to y."],
    },
    {
      kind: "mcq",
      id: "transformations-pythagoras-quiz-q03",
      question: "The point (−4, 3) is reflected in the line y = x. Where is its image?",
      options: ["(−3, 4)", "(3, −4)", "(4, −3)", "(−4, −3)"],
      answerIndex: 1,
      explanation:
        "Reflecting in y = x swaps the coordinates: (−4, 3) → (3, −4). (−3, 4) is what the line y = −x would give (swap *and* change both signs); (4, −3) is a half-turn about the origin (both signs change, no swap); (−4, −3) is a reflection in the x-axis.",
      difficulty: "warmup",
      guideRef: "reflection",
      hints: ["What happens to the two coordinates of a point when you reflect it in the line y = x?"],
      strategy: "Track one point",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-quiz-q04",
      question:
        "The point P(4, 3) is rotated 90° clockwise about the centre C(1, 2). Give the coordinates of the image of P as (x, y).",
      answer: { type: "list", values: [2, -1], ordered: true, display: "(2, −1)" },
      solution: [
        "Step from C to P: across 4 − 1 = 3, up 3 − 2 = 1.",
        "Turn the step 90° clockwise: 'right' becomes 'down' and 'up' becomes 'right'. So 3 right, 1 up becomes 1 right, 3 down: (1, −3). (Rule: (a, b) → (b, −a).)",
        "Add the new step to C: (1 + 1, 2 − 3) = (2, −1).",
        "Check: the steps (3, 1) and (1, −3) are the same length, so P′ is as far from C as P is ✓.",
      ],
      commonError: "Rotating about the origin instead of about C, or turning anticlockwise.",
      traps: [
        { spec: { type: "list", values: [0, 5], ordered: true }, feedback: "That's a 90° turn anticlockwise. Clockwise turns 'right' into 'down'." },
        { spec: { type: "list", values: [3, -4], ordered: true }, feedback: "You turned P about the origin. Work with the step from C(1, 2) to P instead." },
      ],
      difficulty: "core",
      guideRef: "rotation",
      hints: [
        "Don't turn P about the origin. What is the step from C to P?",
        "The step is 3 right, 1 up. Picture turning that arrow a quarter-turn clockwise.",
        "Clockwise turns 'right' into 'down' and 'up' into 'right'. Add the new step on to C.",
      ],
      strategy: "Work in steps from the centre",
    },
    {
      kind: "mcq",
      id: "transformations-pythagoras-quiz-q05",
      question:
        "Point A(1, −2) is a vertex of a shape. The shape is enlarged by scale factor 2 with centre of enlargement C(−1, 0). Where is the image of A?",
      options: ["(2, −4)", "(4, −4)", "(5, −6)", "(3, −4)"],
      answerIndex: 3,
      explanation:
        "Measure from the centre: C to A is 2 right, 2 down. Double it: 4 right, 4 down. From C(−1, 0) that lands on (3, −4).\n\n(2, −4) doubles the coordinates of A, as if the centre were the origin. (4, −4) is the doubled step, never added back on to C. (5, −6) adds the doubled step to A instead of to C.",
      difficulty: "core",
      guideRef: "enlargement",
      hints: [
        "Everything in an enlargement is measured from the centre. What is the step from C to A?",
        "The step is 2 right, 2 down. Double it.",
        "Add the doubled step to C — not to A.",
      ],
      strategy: "Work in steps from the centre",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-quiz-q06",
      question:
        "A reflection maps the point (4, 1) onto (−1, −4), and maps the point (2, 0) onto (0, −2). Give the equation of the mirror line.",
      answer: { type: "text", accept: ["y = −x", "y=-x", "x+y=0", "y+x=0", "x=-y", "-x=y", "-y=x"], display: "y = −x" },
      solution: [
        "The mirror line passes through the midpoint of each point and its image.",
        "Midpoint of (4, 1) and (−1, −4): ({{(4 + (-1))/2}}, {{(1 + (-4))/2}}) = (1.5, −1.5).",
        "Midpoint of (2, 0) and (0, −2): (1, −1).",
        "In both midpoints the y-coordinate is the negative of the x-coordinate, so the mirror is the line y = −x.",
        "Check with the rule for y = −x, (x, y) → (−y, −x): (4, 1) → (−1, −4) ✓ and (2, 0) → (0, −2) ✓.",
      ],
      commonError: "Noticing that the coordinates swap but missing the sign change — that would be y = x.",
      traps: [
        { spec: { type: "text", accept: ["y = x", "y=x", "x=y"] }, feedback: "Check a midpoint: (1.5, −1.5) is not on y = x. Here the coordinates swap *and* change sign." },
      ],
      difficulty: "core",
      guideRef: "reflection",
      hints: [
        "Where does the mirror line sit compared with a point and its image?",
        "Find the midpoint of (4, 1) and (−1, −4), and the midpoint of (2, 0) and (0, −2).",
        "Look at the two midpoints. How is each y-coordinate connected to its x-coordinate?",
      ],
      strategy: "Use midpoints",
    },
    {
      kind: "mcq",
      id: "transformations-pythagoras-quiz-q07",
      question:
        "A single transformation maps every point (x, y) onto (−x, −y). Which description is correct and complete?",
      options: [
        "Rotation of 180° about (0, 0)",
        "Reflection in the line y = −x",
        "Reflection in the x-axis",
        "Rotation of 90° clockwise about (0, 0)",
      ],
      answerIndex: 0,
      explanation:
        "Test a point: (3, 1) → (−3, −1). That is the half-turn rule, so the transformation is a rotation of 180° about the origin (a half-turn needs no direction).\n\nReflection in y = −x would send (3, 1) to (−1, −3): it swaps the coordinates as well as changing their signs. Reflection in the x-axis only changes the sign of y, giving (3, −1). A 90° clockwise turn gives (1, −3).",
      difficulty: "core",
      guideRef: "describing-transformations",
      hints: [
        "Pick a point such as (3, 1) and see where the rule sends it.",
        "(3, 1) → (−3, −1). Which of the four transformations sends (3, 1) there?",
      ],
      strategy: "Track one point",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-quiz-q08",
      question:
        "Shape A has an area of 12 cm². It is rotated 90° about the origin, then enlarged by scale factor 3, then reflected in the y-axis. What is the area of the final shape? Give your answer in cm².",
      answer: { type: "number", value: 108, display: "108 cm²" },
      solution: [
        "Rotations and reflections give congruent images, so they don't change the area.",
        "An enlargement by scale factor 3 multiplies every length by 3, so it multiplies the area by 3 × 3 = 9.",
        "Final area = 12 × 9 = 108 cm².",
      ],
      solutions: [
        {
          label: "Picture a rectangle",
          steps: [
            "Suppose A is a 3 cm by 4 cm rectangle (area 12 cm²).",
            "Turning it and flipping it leave it 3 cm by 4 cm. Enlarging by scale factor 3 makes it 9 cm by 12 cm.",
            "Area = 9 × 12 = 108 cm². Trying a simple example like this is a quick way to check the 'area × 9' rule.",
          ],
        },
      ],
      commonError: "Multiplying the area by the scale factor (3) instead of by its square (9).",
      traps: [
        { spec: { type: "number", value: 36 }, feedback: "Area doesn't multiply by the scale factor. Each length is multiplied by 3, and area uses two lengths, so the area is multiplied by 3 × 3 = 9." },
        { spec: { type: "number", value: 12 }, feedback: "The rotation and the reflection don't change the size — but the enlargement does." },
      ],
      difficulty: "core",
      guideRef: "describing-transformations",
      hints: [
        "Which of the three transformations change the size of the shape?",
        "Only the enlargement does. Lengths are multiplied by 3 — what happens to the area?",
        "Try it on a 3 cm by 4 cm rectangle.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-quiz-q09",
      question:
        "A straight loading ramp 2.6 m long runs from level ground up to the back of a lorry. Measured along the ground, the ramp covers 2.4 m. How high is the back of the lorry above the ground? Give your answer in metres.",
      answer: { type: "number", value: 1, display: "1 m" },
      solution: [
        "The height and the distance along the ground meet at a right angle. The ramp is opposite the right angle, so the ramp is the hypotenuse.",
        "A shorter side is missing, so subtract the squares: {{h^2 = 2.6^2 - 2.4^2 = 6.76 - 5.76 = 1}}.",
        "{{h = sqrt(1) = 1}} m.",
        "Check: 1 m is shorter than the 2.6 m ramp ✓.",
      ],
      solutions: [
        {
          label: "Spot a scaled triple",
          steps: [
            "In tenths of a metre, the ramp is 26 and the ground distance is 24.",
            "10, 24, 26 is the triple 5, 12, 13 doubled, so the height is 10 tenths = 1 m. Quicker if you know your triples.",
          ],
        },
      ],
      commonError: "Adding the squares even though the hypotenuse (the ramp) is already known.",
      traps: [
        { spec: { type: "number", value: 3.54, tolerance: 0.05 }, feedback: "You added the squares. The ramp is the hypotenuse, so subtract: {{2.6^2 - 2.4^2}}." },
        { spec: { type: "number", value: 0.2 }, feedback: "You subtracted the lengths. Pythagoras' theorem works with the *squares* of the sides." },
      ],
      difficulty: "core",
      guideRef: "pythagoras",
      hints: [
        "Sketch the ground, the height and the ramp. Which side is the hypotenuse?",
        "The ramp is the hypotenuse, so you subtract the squares.",
        "Work out {{2.6^2 - 2.4^2}}, then square-root.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "written",
      id: "transformations-pythagoras-quiz-q10",
      question:
        "Triangle ABC has vertices A(1, 1), B(4, 2) and C(3, 5). Show that ABC is a right-angled isosceles triangle, and say which angle is the right angle.",
      marks: 3,
      modelAnswer:
        "Use the horizontal and vertical gaps between the points as the shorter sides of right-angled triangles:\n\n    AB² = 3² + 1² = 9 + 1 = 10\n    BC² = 1² + 3² = 1 + 9 = 10\n    AC² = 2² + 4² = 4 + 16 = 20\n\nAB² = BC², so AB = BC and the triangle is **isosceles**.\n\nAlso AB² + BC² = 10 + 10 = 20 = AC², so the sides fit Pythagoras' theorem with AC as the hypotenuse. That only happens in a right-angled triangle, and the right angle is opposite the hypotenuse — so the **right angle is at B**.",
      markScheme: [
        { point: "Finds the squared lengths 10, 10 and 20 (or the lengths √10, √10, √20) from the coordinate gaps", keywords: ["10", "20", "3^2", "3²", "squared"] },
        { point: "AB = BC, so the triangle is isosceles", keywords: ["ab = bc", "equal", "isosceles", "same length"] },
        { point: "AB² + BC² = AC² (10 + 10 = 20), so the right angle is at B", keywords: ["10 + 10 = 20", "right angle", "angle b", "at b", "90"] },
      ],
      solutions: [
        {
          label: "Turn a step through 90°",
          steps: [
            "Step from B to A: 3 left, 1 down, i.e. (−3, −1). Step from B to C: 1 left, 3 up, i.e. (−1, 3).",
            "Rotating (−3, −1) through 90° clockwise with (x, y) → (y, −x) gives (−1, 3) — exactly the step from B to C.",
            "A quarter-turn keeps the length and turns the direction through 90°, so BC = BA and angle ABC = 90°. Slicker: one check proves both facts at once.",
          ],
        },
      ],
      commonError: "Proving two sides are equal but never checking for the right angle (or the other way round).",
      difficulty: "challenge",
      guideRef: "pythagoras",
      hints: [
        "You need the lengths of all three sides. How can you get a length from two points on a grid?",
        "Make a right-angled triangle from the horizontal and vertical gaps — for example, A to B is 3 across and 1 up.",
        "Compare AB², BC² and AC². Does the biggest equal the sum of the other two?",
      ],
      strategy: "Draw a diagram",
    },
  ],

  // ======================================================================
  // PRACTICE PAPERS — 16 short + 4 written each · 5 warmup, 11 core, 4 challenge
  // ======================================================================
  papers: [
    {
      id: "transformations-pythagoras-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q01",
          question:
            "An observation wheel has 20 identical capsules, equally spaced around its rim. Ignoring the supports, what is the smallest angle the wheel must turn through so that the capsules look exactly as they did before? Give your answer in degrees.",
          answer: { type: "number", value: 18, display: "18°" },
          solution: [
            "The capsules look the same again as soon as each capsule has moved into the position of the next one.",
            "20 equally spaced capsules split the full turn of 360° into 20 equal steps, so the wheel has rotational symmetry of order 20.",
            "Smallest turn = 360° ÷ 20 = 18°.",
          ],
          traps: [
            { spec: { type: "number", value: 20 }, feedback: "20 is the order of rotational symmetry. The question asks for the *angle* of the smallest turn." },
            { spec: { type: "number", value: 9 }, feedback: "A full turn is 360°, not 180°." },
          ],
          difficulty: "warmup",
          guideRef: "symmetry",
          hints: ["Into how many equal steps do the capsules split one full turn of 360°?"],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q02",
          question:
            "The point (5, −2) is translated by the column vector (−7 over 3). Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-2, 1], ordered: true, display: "(−2, 1)" },
          solution: [
            "Top number −7: move 7 left, so x = 5 − 7 = −2.",
            "Bottom number 3: move 3 up, so y = −2 + 3 = 1.",
            "The image is (−2, 1).",
          ],
          traps: [
            { spec: { type: "list", values: [8, -9], ordered: true }, feedback: "You used the top number for y and the bottom number for x. The top number (−7) is the move across." },
            { spec: { type: "list", values: [12, -5], ordered: true }, feedback: "You moved the opposite way. Add the vector: 5 + (−7) and −2 + 3." },
          ],
          difficulty: "warmup",
          guideRef: "translation",
          hints: ["Top number → change x. Bottom number → change y."],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q03",
          question: "The point (6, −1) is reflected in the y-axis. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-6, -1], ordered: true, display: "(−6, −1)" },
          solution: [
            "The y-axis is the vertical line x = 0.",
            "(6, −1) is 6 squares to the right of it, so the image is 6 squares to the left: x = −6.",
            "Points move straight across a vertical mirror, so y stays −1. The image is (−6, −1).",
          ],
          traps: [{ spec: { type: "list", values: [6, 1], ordered: true }, feedback: "That's a reflection in the x-axis. The y-axis is the vertical line x = 0, so it's the x-coordinate that changes sign." }],
          difficulty: "warmup",
          guideRef: "reflection",
          hints: ["Is the y-axis vertical or horizontal? So which coordinate changes?"],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q04",
          question: "The point (3, −4) is rotated 180° about the origin. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-3, 4], ordered: true, display: "(−3, 4)" },
          solution: [
            "A half-turn about the origin sends (x, y) to (−x, −y).",
            "(3, −4) → (−3, 4).",
            "Check: the origin is exactly halfway between (3, −4) and (−3, 4) ✓.",
          ],
          traps: [
            { spec: { type: "list", values: [-3, -4], ordered: true }, feedback: "You only changed the sign of x — that's a reflection in the y-axis. A half-turn changes the sign of both coordinates." },
            { spec: { type: "list", values: [4, 3], ordered: true }, feedback: "That's a quarter-turn (90° anticlockwise). A half-turn is two quarter-turns: (x, y) → (−x, −y)." },
          ],
          difficulty: "warmup",
          guideRef: "rotation",
          hints: ["A half-turn about the origin changes the sign of both coordinates."],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q05",
          question:
            "A shape is enlarged by scale factor 5. One side of the image is 35 cm long. How long is the matching side of the original shape? Give your answer in cm.",
          answer: { type: "number", value: 7, display: "7 cm" },
          solution: [
            "Every length on the image is 5 times the matching length on the original.",
            "So the original length = 35 ÷ 5 = 7 cm.",
            "Check: 7 × 5 = 35 ✓.",
          ],
          traps: [
            { spec: { type: "number", value: 175 }, feedback: "You multiplied by 5 again. The image is the bigger shape, so divide to get back to the original." },
            { spec: { type: "number", value: 30 }, feedback: "You subtracted 5. An enlargement multiplies lengths, so undo it by dividing." },
          ],
          difficulty: "warmup",
          guideRef: "enlargement",
          hints: ["The image is 5 times as long. How do you undo multiplying by 5?"],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q06",
          question: "Each interior angle of a regular polygon is 140°. How many lines of symmetry does the polygon have?",
          answer: { type: "number", value: 9 },
          solution: [
            "Each exterior angle is 180° − 140° = 40°.",
            "The exterior angles of any polygon add up to 360°, so the number of sides is 360 ÷ 40 = 9.",
            "A regular polygon with 9 sides has 9 lines of symmetry.",
          ],
          solutions: [
            {
              label: "Use the interior angle sum",
              steps: [
                "A polygon with n sides has interior angles adding up to (n − 2) × 180°.",
                "So 140n = 180(n − 2), which gives 140n = 180n − 360, so 40n = 360 and n = 9.",
                "9 sides, so 9 lines of symmetry. The exterior-angle method is quicker.",
              ],
            },
          ],
          commonError: "Dividing 360° by the interior angle instead of by the exterior angle.",
          traps: [{ spec: { type: "number", value: 2.57, tolerance: 0.04 }, feedback: "You divided 360° by the interior angle. Use the exterior angle, 180° − 140° = 40°." }],
          difficulty: "core",
          guideRef: "symmetry",
          hints: [
            "How is the number of sides of a regular polygon linked to its exterior angle?",
            "Exterior angle = 180° − 140°.",
            "Number of sides = 360° ÷ exterior angle — and a regular polygon with n sides has n lines of symmetry.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q07",
          question:
            "A translation maps the point (2, −3) onto (−4, 1). Where does the same translation map the origin, (0, 0)? Give the coordinates as (x, y).",
          answer: { type: "list", values: [-6, 4], ordered: true, display: "(−6, 4)" },
          solution: [
            "Find the vector: across −4 − 2 = −6, up 1 − (−3) = 4, so the column vector is (−6 over 4).",
            "Every point moves by the same vector, so the origin moves to (0 − 6, 0 + 4) = (−6, 4).",
            "Notice: the image of the origin always has the same two numbers as the column vector.",
          ],
          commonError: "Subtracting the wrong way round (object − image), which reverses both signs.",
          traps: [
            { spec: { type: "list", values: [6, -4], ordered: true }, feedback: "You subtracted the wrong way round (object − image). The vector goes *from* the object *to* the image." },
            { spec: { type: "list", values: [-2, -2], ordered: true }, feedback: "You added the coordinates of the two points. Find the vector by subtracting: image − object." },
          ],
          difficulty: "core",
          guideRef: "translation",
          hints: [
            "First find the column vector of the translation.",
            "Image − object: across −4 − 2, up 1 − (−3).",
            "Add that vector to (0, 0).",
          ],
          strategy: "Track one point",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q08",
          question: "A reflection maps the point (2, 7) onto (2, −2). Give the equation of the mirror line.",
          answer: { type: "text", accept: ["y = 2.5", "y=2.5", "y = 5/2", "y=5/2", "2.5 = y"], display: "y = 2.5" },
          solution: [
            "The segment from (2, 7) to (2, −2) is vertical, so the mirror line, which crosses it at right angles, is horizontal: y = something.",
            "The mirror passes through the midpoint: y = {{(7 + (-2))/2}} = {{5/2}} = 2.5.",
            "Check: 7 is 4.5 above 2.5, and −2 is 4.5 below it ✓.",
            "The mirror line is y = 2.5.",
          ],
          commonError: "Naming a horizontal line x = …, or slipping when one of the coordinates is negative.",
          traps: [
            { spec: { type: "text", accept: ["x = 2", "x=2"] }, feedback: "x = 2 is the vertical line through both points. The mirror must cross the segment between them at right angles, exactly halfway along." },
            { spec: { type: "text", accept: ["y = 4.5", "y=4.5", "y=9/2"] }, feedback: "4.5 is half the *distance* between the points. The mirror is halfway *between* them: {{(7 + (-2))/2}} = 2.5." },
            { spec: { type: "text", accept: ["2.5", "5/2"] }, feedback: "Right value — now write the full equation of the line, like y = …" },
          ],
          difficulty: "core",
          guideRef: "reflection",
          hints: [
            "Which way does the segment joining the two points run? So which way must the mirror run?",
            "The mirror crosses that segment exactly halfway along.",
            "Find the y-coordinate halfway between 7 and −2.",
          ],
          strategy: "Use midpoints",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p1-q09",
          question:
            "Ravi says: 'If a shape fits exactly onto its outline after a turn of 120° about its centre, it must be an equilateral triangle.' Is Ravi right? Explain your answer.",
          marks: 3,
          modelAnswer:
            "Ravi is **wrong**. Fitting after a 120° turn means the shape fits 3 times in every full turn (360 ÷ 120 = 3), so its order of rotational symmetry is 3 or a multiple of 3 — and lots of shapes besides the equilateral triangle do that.\n\nCounterexamples:\n- A **regular hexagon** fits after every 60° turn, so it also fits after 120° (two steps of 60°).\n- A three-bladed fan or propeller fits after 120°, but it isn't a triangle at all.\n\nAll Ravi can say is that the order of rotational symmetry is a multiple of 3.",
          markScheme: [
            { point: "Says Ravi is wrong", keywords: ["wrong", "no", "not", "incorrect", "isn't"] },
            { point: "Gives a valid counterexample (e.g. regular hexagon, three-bladed fan or logo)", keywords: ["hexagon", "fan", "propeller", "blade", "logo", "nonagon"] },
            { point: "Explains that 360 ÷ 120 = 3, so the order must be 3 or a multiple of 3", keywords: ["360 ÷ 120", "360/120", "3 times", "multiple of 3", "order 3", "order 6"] },
          ],
          commonError: "Agreeing because an equilateral triangle does work. One example that works doesn't show it *must* be that shape.",
          difficulty: "core",
          guideRef: "symmetry",
          hints: [
            "An equilateral triangle does fit after 120°. But is it the *only* shape that does?",
            "How many 120° turns make a full turn? What does that tell you about the order of rotational symmetry?",
            "Try a regular hexagon: it fits after every 60° turn. Does it fit after 120°?",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q10",
          question: "The point (3, −5) is reflected in the line y = −x. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [5, -3], ordered: true, display: "(5, −3)" },
          solution: [
            "For the line y = −x the rule is (x, y) → (−y, −x): swap the coordinates, then change both signs.",
            "(3, −5) → swap → (−5, 3) → change both signs → (5, −3).",
            "Check: the midpoint of (3, −5) and (5, −3) is (4, −4), which lies on y = −x ✓.",
          ],
          commonError: "Using the y = x rule (just swapping) for the line y = −x.",
          traps: [
            { spec: { type: "list", values: [-5, 3], ordered: true }, feedback: "That only swaps the coordinates — the rule for y = x. For y = −x, swap them *and* change both signs." },
            { spec: { type: "list", values: [-3, 5], ordered: true }, feedback: "You changed both signs but didn't swap — that's a half-turn about the origin." },
          ],
          difficulty: "core",
          guideRef: "reflection",
          hints: [
            "Sketch y = −x: it passes through (1, −1), (2, −2), (3, −3) …",
            "The rule for y = −x: swap the coordinates and change both signs.",
            "Check your answer: the midpoint of the point and its image must lie on y = −x.",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q11",
          question:
            "The point A(3, −1) is rotated 90° anticlockwise about the centre C(1, 2). Give the coordinates of the image of A as (x, y).",
          answer: { type: "list", values: [4, 4], ordered: true, display: "(4, 4)" },
          solution: [
            "Step from C to A: across 3 − 1 = 2, up −1 − 2 = −3 (2 right, 3 down).",
            "Turn the step 90° anticlockwise: 'right' becomes 'up' and 'down' becomes 'right'. So 2 right, 3 down becomes 2 up, 3 right: (3, 2). (Rule: (a, b) → (−b, a).)",
            "Add the new step to C: (1 + 3, 2 + 2) = (4, 4).",
            "Check: both steps have length {{sqrt(13)}}, so A′ is the same distance from C as A ✓.",
          ],
          commonError: "Rotating about the origin instead of about C.",
          traps: [
            { spec: { type: "list", values: [-2, 0], ordered: true }, feedback: "That's 90° clockwise. Anticlockwise turns 'right' into 'up'." },
            { spec: { type: "list", values: [1, 3], ordered: true }, feedback: "You rotated A about the origin. Use the step from the centre C(1, 2) instead." },
          ],
          difficulty: "core",
          guideRef: "rotation",
          hints: [
            "Work from the centre: what is the step from C to A?",
            "The step is 2 right and 3 down. Turn that arrow a quarter-turn anticlockwise.",
            "Anticlockwise: (a, b) → (−b, a). Then add the new step on to C.",
          ],
          strategy: "Work in steps from the centre",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q12",
          question:
            "An enlargement with centre (1, 2) maps the point (3, 3) onto (9, 6). Where does the same enlargement map the point (2, 5)? Give the coordinates as (x, y).",
          answer: { type: "list", values: [5, 14], ordered: true, display: "(5, 14)" },
          solution: [
            "Step from the centre (1, 2) to (3, 3): across 2, up 1.",
            "Step from the centre to the image (9, 6): across 8, up 4. That is 4 times as far, so the scale factor is 4.",
            "Step from the centre to (2, 5): across 1, up 3. Times 4: across 4, up 12.",
            "Image: (1 + 4, 2 + 12) = (5, 14).",
          ],
          commonError: "Finding the scale factor by dividing coordinates (9 ÷ 3 = 3). That only works when the centre is the origin.",
          traps: [
            { spec: { type: "list", values: [4, 11], ordered: true }, feedback: "The scale factor isn't 9 ÷ 3 = 3 — dividing coordinates only works when the centre is the origin. Compare the steps from the centre: (8, 4) is 4 times (2, 1)." },
            { spec: { type: "list", values: [8, 20], ordered: true }, feedback: "You multiplied the coordinates of (2, 5) by 4, as if the centre were the origin. Measure the step from the centre (1, 2)." },
          ],
          difficulty: "core",
          guideRef: "enlargement",
          hints: [
            "Find the scale factor first — but measure from the centre, not from the origin.",
            "Compare the step from the centre to (3, 3) with the step from the centre to (9, 6).",
            "The scale factor is 4. Now multiply the step from the centre to (2, 5) by 4, and add it to the centre.",
          ],
          strategy: "Work in steps from the centre",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p1-q13",
          question:
            "Triangle P has vertices (0, 1), (2, 1) and (0, 3). Triangle Q has vertices (2, 2), (6, 2) and (2, 6). Describe fully the single transformation that maps P onto Q. Show how you found each detail.",
          diagram: `<svg viewBox="0 0 324 256" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from x = −3 to 7 and y = −1 to 7. Triangle P has vertices (0, 1), (2, 1) and (0, 3). Triangle Q has vertices (2, 2), (6, 2) and (2, 6)."><rect x="0" y="0" width="324" height="256" fill="#ffffff"/><line x1="40" y1="232" x2="40" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="66" y1="232" x2="66" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="92" y1="232" x2="92" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="118" y1="232" x2="118" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="144" y1="232" x2="144" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="170" y1="232" x2="170" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="196" y1="232" x2="196" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="222" y1="232" x2="222" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="248" y1="232" x2="248" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="274" y1="232" x2="274" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="300" y1="232" x2="300" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="232" x2="300" y2="232" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="206" x2="300" y2="206" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="180" x2="300" y2="180" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="154" x2="300" y2="154" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="128" x2="300" y2="128" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="102" x2="300" y2="102" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="76" x2="300" y2="76" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="50" x2="300" y2="50" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="24" x2="300" y2="24" stroke="#e2e8f0" stroke-width="1"/><line x1="40" y1="206" x2="300" y2="206" stroke="#334155" stroke-width="1.5"/><line x1="118" y1="232" x2="118" y2="24" stroke="#334155" stroke-width="1.5"/><text x="40" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="66" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="92" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="144" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="170" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="196" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="222" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="248" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="274" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="300" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="113" y="236" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="113" y="184" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="113" y="158" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="113" y="132" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="113" y="106" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="113" y="80" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="113" y="54" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="113" y="28" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">7</text><text x="113" y="219" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><text x="310" y="210" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="126" y="16" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">y</text><polygon points="118,180 170,180 118,128" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="170,154 274,154 170,50" fill="#bbf7d0" fill-opacity="0.8" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="133.60000000000002" y="168.29999999999998" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" text-anchor="middle">P</text><text x="203.79999999999998" y="125.39999999999999" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" text-anchor="middle">Q</text></svg>`,
          marks: 3,
          modelAnswer:
            "Q is the same shape as P but bigger, so the transformation is an **enlargement**.\n\n**Scale factor:** the side of P from (0, 1) to (2, 1) has length 2; the matching side of Q, from (2, 2) to (6, 2), has length 4. Scale factor = 4 ÷ 2 = **2**. (The vertical sides are 2 and 4 as well ✓.)\n\n**Centre:** draw ray lines from each vertex of Q through the matching vertex of P. From (2, 2) to (0, 1) is 2 left, 1 down; one more step of 2 left, 1 down reaches (−2, 0). From (6, 2) to (2, 1) is 4 left, 1 down; one more step reaches (−2, 0) as well. So the centre is **(−2, 0)**.\n\nCheck: from (−2, 0) to (0, 3) is 2 across, 3 up; doubled, that is 4 across, 6 up, which reaches (2, 6) ✓.\n\nThe transformation is an enlargement, scale factor 2, centre (−2, 0).",
          markScheme: [
            { point: "States that it is an enlargement", keywords: ["enlargement", "enlarge", "enlarged"] },
            { point: "Scale factor 2, from matching lengths (4 ÷ 2)", keywords: ["scale factor 2", "sf 2", "4 ÷ 2", "4/2", "twice"] },
            { point: "Centre (−2, 0), found with ray lines or steps from the centre", keywords: ["(-2, 0)", "-2, 0", "(-2,0)", "ray"] },
          ],
          commonError: "Giving the scale factor but no centre (or a centre but no scale factor). Both are needed to describe an enlargement fully.",
          difficulty: "core",
          guideRef: "enlargement",
          hints: [
            "Same shape, different size — which transformation is it, and which two details does it need?",
            "Compare matching sides of P and Q to get the scale factor.",
            "Join each vertex of Q to the matching vertex of P and keep going. Where do these ray lines meet?",
          ],
          strategy: "Draw ray lines",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q14",
          question:
            "Triangle X has sides 4 cm, 7 cm and 8 cm. Triangle Y is similar to X, and the longest side of Y is 6 cm. How long is the shortest side of Y? Give your answer in cm.",
          answer: { type: "number", value: 3, display: "3 cm" },
          solution: [
            "Matching sides: the longest side of X (8 cm) matches the longest side of Y (6 cm).",
            "Scale factor = 6 ÷ 8 = {{3/4}} = 0.75. It is less than 1, so Y is smaller than X.",
            "Shortest side of Y = 4 × 0.75 = 3 cm.",
            "Check the ratios: {{4/8}} = {{3/6}} ✓.",
          ],
          solutions: [
            {
              label: "Ratio inside the triangle",
              steps: [
                "In X, the shortest side is half the longest side (4 is half of 8).",
                "Similar triangles keep that ratio, so the shortest side of Y is half of 6 = 3 cm. Quicker here, because the ratio inside the shape is so simple.",
              ],
            },
          ],
          commonError: "Subtracting 2 cm from every side instead of multiplying by the scale factor.",
          traps: [
            { spec: { type: "number", value: 2 }, feedback: "You took 2 cm off each side (8 − 2 = 6). Similar shapes are linked by multiplying: the scale factor is 6 ÷ 8." },
            { spec: { type: "number", value: 5.25 }, feedback: "5.25 cm matches the 7 cm side — that's the middle side of Y. The shortest side matches the 4 cm side." },
          ],
          difficulty: "core",
          guideRef: "describing-transformations",
          hints: [
            "Which side of X matches the 6 cm side of Y?",
            "The longest sides match, so the scale factor is 6 ÷ 8.",
            "Multiply the shortest side of X by that scale factor.",
          ],
          strategy: "Compare matching sides",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p1-q15",
          question:
            "Hana says: 'All rectangles are similar, because every rectangle has four right angles.' Is Hana right? Explain, using an example.",
          marks: 3,
          modelAnswer:
            "Hana is **wrong**. For two shapes to be similar, matching angles must be equal **and** matching sides must be in the same ratio — one shape must be an enlargement of the other. Equal angles are not enough for rectangles.\n\nExample: a 2 cm by 2 cm square and a 1 cm by 4 cm rectangle both have four right angles. To turn one 2 cm side into 1 cm needs a scale factor of {{1/2}}, but to turn the other 2 cm side into 4 cm needs a scale factor of 2. The scale factors don't match, so the shapes are not similar — one is long and thin, the other isn't.",
          markScheme: [
            { point: "Says Hana is wrong: not all rectangles are similar", keywords: ["wrong", "not", "no", "isn't", "incorrect"] },
            { point: "Similar shapes need matching sides in the same ratio (one scale factor), not just equal angles", keywords: ["ratio", "scale factor", "proportion", "enlargement", "same shape"] },
            { point: "Gives a valid counterexample with numbers (e.g. 2 by 2 and 1 by 4)", keywords: ["2 by 2", "1 by 4", "square", "long", "thin", "example"] },
          ],
          commonError: "Saying 'no, because they can be different sizes' — similar shapes are *allowed* to be different sizes.",
          difficulty: "core",
          guideRef: "describing-transformations",
          hints: [
            "What two things must be true for two shapes to be similar?",
            "Angles are only half the story. What about the sides?",
            "Try a square and a long, thin rectangle. Is one an enlargement of the other?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q16",
          question:
            "A rectangular plot in a community garden is 8 m wide and 15 m long. A straight path runs from one corner to the opposite corner. How long is the path? Give your answer in metres.",
          answer: { type: "number", value: 17, display: "17 m" },
          solution: [
            "The path is the diagonal, which is the hypotenuse of a right-angled triangle with shorter sides 8 m and 15 m.",
            "The hypotenuse is unknown, so add the squares: {{c^2 = 8^2 + 15^2 = 64 + 225 = 289}}.",
            "{{c = sqrt(289) = 17}} m.",
            "Check: 17 m is longer than both sides ✓ (8, 15, 17 is a Pythagorean triple).",
          ],
          commonError: "Adding the two sides (8 + 15 = 23) instead of using their squares.",
          traps: [
            { spec: { type: "number", value: 23 }, feedback: "You added the lengths. Square them, add the squares, then square-root." },
            { spec: { type: "number", value: 12.69, tolerance: 0.02 }, feedback: "You subtracted the squares. The path is the hypotenuse — the unknown — so add them." },
          ],
          difficulty: "core",
          guideRef: "pythagoras",
          hints: [
            "The diagonal splits the rectangle into two right-angled triangles. Which side is the hypotenuse?",
            "Square both sides of the rectangle and add.",
            "Find the square root of 289.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q17",
          question:
            "The point (2, 5) is reflected in the line y = x. The image is then rotated 90° clockwise about the origin. Give the coordinates of the final point as (x, y).",
          answer: { type: "list", values: [2, -5], ordered: true, display: "(2, −5)" },
          solution: [
            "Reflect in y = x by swapping the coordinates: (2, 5) → (5, 2).",
            "Rotate 90° clockwise about the origin with (x, y) → (y, −x): (5, 2) → (2, −5).",
            "The final point is (2, −5).",
            "Notice: (2, 5) has ended up exactly where a reflection in the x-axis would send it — see the second method.",
          ],
          solutions: [
            {
              label: "Find the single transformation first",
              steps: [
                "Follow a general point: (x, y) → (y, x) after the reflection → (x, −y) after the clockwise quarter-turn.",
                "(x, y) → (x, −y) is a reflection in the x-axis. The two moves together are one reflection!",
                "So (2, 5) → (2, −5). Slicker if you have lots of points to transform.",
              ],
            },
          ],
          commonError: "Doing the two transformations in the wrong order, or turning anticlockwise.",
          traps: [{ spec: { type: "list", values: [-2, 5], ordered: true }, feedback: "You either turned anticlockwise or did the steps in the wrong order. Reflect first, then use the clockwise rule (x, y) → (y, −x)." }],
          difficulty: "challenge",
          guideRef: "describing-transformations",
          hints: [
            "Do the transformations one at a time, in the order given.",
            "Reflecting in y = x swaps the coordinates.",
            "A 90° clockwise turn about the origin sends (x, y) to (y, −x).",
          ],
          strategy: "Track one point",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q18",
          question: "An isosceles triangle has two sides of 13 cm and a base of 10 cm. Find its area in cm².",
          answer: { type: "number", value: 60, display: "60 cm²" },
          solution: [
            "The line of symmetry from the top vertex down to the base is the perpendicular height. It meets the base at 90° and cuts it in half: 5 cm on each side.",
            "Each half is a right-angled triangle with hypotenuse 13 cm and one shorter side 5 cm.",
            "Height: {{h^2 = 13^2 - 5^2 = 169 - 25 = 144}}, so h = 12 cm.",
            "Area = {{1/2}} × base × height = {{1/2}} × 10 × 12 = 60 cm².",
          ],
          solutions: [
            {
              label: "Rearrange into a rectangle",
              steps: [
                "Cut along the line of symmetry. Each half is a 5, 12, 13 right-angled triangle.",
                "Turn one half round and fit the two halves together along their 13 cm sides: they make a rectangle 5 cm by 12 cm.",
                "Area = 5 × 12 = 60 cm². A nice picture — but you still needed Pythagoras for the 12.",
              ],
            },
          ],
          commonError: "Using the sloping side (13 cm) as the height.",
          traps: [
            { spec: { type: "number", value: 65 }, feedback: "You used the sloping side, 13 cm, as the height. The height must be perpendicular to the base — find it with Pythagoras." },
            { spec: { type: "number", value: 120 }, feedback: "That's base × height. A triangle's area is *half* of that." },
          ],
          difficulty: "challenge",
          guideRef: "pythagoras",
          hints: [
            "Area needs a perpendicular height. Where is it in an isosceles triangle?",
            "Draw the line of symmetry. It splits the triangle into two right-angled triangles.",
            "Each half has hypotenuse 13 and base 5. Find the height, then use {{1/2}} × base × height.",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p1-q19",
          question:
            "A shape is rotated 90° clockwise about (0, 0), and then the image is rotated 90° clockwise about (2, 0). The overall effect is a single rotation of 180°. Find its centre, giving the coordinates as (x, y).",
          answer: { type: "list", values: [1, 1], ordered: true, display: "(1, 1)" },
          solution: [
            "For a half-turn, the centre is the midpoint of any point and its image — so follow one point through both rotations.",
            "Take the origin. Rotating about (0, 0) leaves it at (0, 0).",
            "Now rotate (0, 0) 90° clockwise about (2, 0). The step from (2, 0) is 2 left, (−2, 0). Clockwise, (a, b) → (b, −a), gives (0, 2): 2 up. So it lands on (2, 2).",
            "The centre is the midpoint of (0, 0) and (2, 2): (1, 1).",
            "Check with (2, 0): about (0, 0) it goes to (0, −2); the step from (2, 0) is then (−2, −2), which turns clockwise to (−2, 2), landing on (0, 2). The midpoint of (2, 0) and (0, 2) is (1, 1) ✓.",
          ],
          solutions: [
            {
              label: "Follow a general point",
              steps: [
                "About (0, 0): (x, y) → (y, −x).",
                "About (2, 0): the step from (2, 0) is (y − 2, −x); turned clockwise it becomes (−x, 2 − y); so the point lands on (2 − x, 2 − y).",
                "Overall (x, y) → (2 − x, 2 − y). The point that doesn't move solves 2 − x = x and 2 − y = y: (1, 1).",
                "This proves the combination really is a half-turn about (1, 1). The midpoint method is the slicker way to find the centre.",
              ],
            },
          ],
          commonError: "Guessing the midpoint of the two centres, (1, 0).",
          traps: [
            { spec: { type: "list", values: [1, 0], ordered: true }, feedback: "Test it: (1, 0) → (0, −1) → (1, 2). It moves, so it can't be the centre. Follow one point and use a midpoint." },
            { spec: { type: "list", values: [2, 2], ordered: true }, feedback: "(2, 2) is where the origin lands. The centre of a half-turn is halfway between a point and its image." },
          ],
          difficulty: "challenge",
          guideRef: "rotation",
          hints: [
            "For a half-turn, where is the centre compared with a point and its image?",
            "Pick an easy point — the origin — and follow it through both rotations.",
            "The origin stays put at first, then lands on (2, 2). Now find the midpoint.",
          ],
          strategy: "Track one point",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p1-q20",
          question:
            "The diagonal of a square is 10 cm long. Show that the area of the square is exactly 50 cm², without working out the side length as a decimal.",
          marks: 3,
          modelAnswer:
            "Let the side of the square be s cm. The diagonal splits the square into two right-angled triangles, each with shorter sides s and s and hypotenuse 10 cm.\n\nBy Pythagoras' theorem: {{s^2 + s^2 = 10^2}}, so {{2s^2 = 100}} and {{s^2 = 50}}.\n\nThe area of the square is {{s * s = s^2}}, so the area is exactly **50 cm²**. (We never needed s itself, which is {{sqrt(50)}} ≈ 7.07 cm.)",
          markScheme: [
            { point: "Uses Pythagoras with two equal shorter sides: s² + s² = 10²", keywords: ["s^2 + s^2", "s² + s²", "2s^2", "2s²", "pythagoras", "100"] },
            { point: "Deduces s² = 50", keywords: ["s^2 = 50", "s² = 50", "= 50"] },
            { point: "Links the area of the square to s², so the area is 50 cm²", keywords: ["area = s", "area is s", "s squared", "area", "50 cm"] },
          ],
          solutions: [
            {
              label: "Cut along both diagonals (no Pythagoras)",
              steps: [
                "The two diagonals of a square are both 10 cm long and cross at right angles at their midpoints.",
                "They cut the square into 4 right-angled triangles, each with shorter sides 5 cm and 5 cm, so each has area {{1/2}} × 5 × 5 = 12.5 cm².",
                "Area = 4 × 12.5 = 50 cm². Slicker — no squares or square roots at all.",
              ],
            },
          ],
          commonError: "Working out s ≈ 7.07 and then 7.07² ≈ 49.98 — that only shows the area is *about* 50.",
          difficulty: "challenge",
          guideRef: "pythagoras",
          hints: [
            "Call the side s. What does the diagonal do to the square?",
            "Each half is a right-angled triangle whose two shorter sides are both s.",
            "Pythagoras gives {{s^2 + s^2 = 100}}. What is the area of the square in terms of s?",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
    {
      id: "transformations-pythagoras-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q01",
          question:
            "A regular polygon has 12 lines of symmetry. What is the smallest angle it can be turned through about its centre so that it fits exactly onto its outline? Give your answer in degrees.",
          answer: { type: "number", value: 30, display: "30°" },
          solution: [
            "A regular polygon with 12 lines of symmetry has 12 sides.",
            "So it has rotational symmetry of order 12.",
            "Smallest turn = 360° ÷ 12 = 30°.",
          ],
          traps: [{ spec: { type: "number", value: 12 }, feedback: "12 is the order of rotational symmetry. The question asks for the *angle* of the smallest turn." }],
          difficulty: "warmup",
          guideRef: "symmetry",
          hints: ["A regular polygon with n sides has n lines of symmetry and rotational symmetry of order n."],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q02",
          question:
            "A shape is translated by the column vector (−4 over 6). Which column vector translates the image back to where the shape started? Give it as two numbers, top number first.",
          answer: { type: "list", values: [4, -6], ordered: true, display: "(4 over −6)" },
          solution: [
            "The translation moved the shape 4 left and 6 up.",
            "To undo it, move 4 right and 6 down.",
            "The column vector is (4 over −6): both signs change.",
          ],
          traps: [
            { spec: { type: "list", values: [-4, 6], ordered: true }, feedback: "That's the same vector — it would move the shape even further away. Reverse both directions." },
            { spec: { type: "list", values: [6, -4], ordered: true }, feedback: "You swapped the top and bottom numbers. Keep them in place and change both signs." },
          ],
          difficulty: "warmup",
          guideRef: "translation",
          hints: ["Undo each part of the move: left becomes right, and up becomes down."],
          strategy: "Use the inverse",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q03",
          question: "The point (−2, 6) is reflected in the line y = 1. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-2, -4], ordered: true, display: "(−2, −4)" },
          solution: [
            "y = 1 is a horizontal line, so the x-coordinate stays −2.",
            "The point is 6 − 1 = 5 squares above the line, so the image is 5 squares below it: y = 1 − 5 = −4.",
            "The image is (−2, −4).",
          ],
          traps: [
            { spec: { type: "list", values: [-2, -6], ordered: true }, feedback: "That's a reflection in the x-axis (y = 0). Count the squares from the point to the line y = 1." },
            { spec: { type: "list", values: [4, 6], ordered: true }, feedback: "You reflected in x = 1, a vertical line. y = 1 is horizontal." },
          ],
          difficulty: "warmup",
          guideRef: "reflection",
          hints: ["Is y = 1 horizontal or vertical? How many squares is the point from it?"],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q04",
          question:
            "The point (6, −1) is rotated 90° anticlockwise about the origin. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [1, 6], ordered: true, display: "(1, 6)" },
          solution: [
            "A 90° anticlockwise turn about the origin sends (x, y) to (−y, x).",
            "(6, −1) → (−(−1), 6) = (1, 6).",
            "Sense check: (6, −1) is just below the positive x-axis. A quarter-turn anticlockwise lifts it to just right of the positive y-axis ✓.",
          ],
          traps: [
            { spec: { type: "list", values: [-1, -6], ordered: true }, feedback: "That's 90° clockwise. Anticlockwise is (x, y) → (−y, x)." },
            { spec: { type: "list", values: [-6, 1], ordered: true }, feedback: "That's a half-turn (180°). A quarter-turn swaps the coordinates as well." },
          ],
          difficulty: "warmup",
          guideRef: "rotation",
          hints: ["Anticlockwise quarter-turn: (x, y) → (−y, x). Watch the double negative."],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q05",
          question:
            "A triangle has shortest side 5 cm and longest side 9 cm. After an enlargement, its shortest side is 20 cm. How long is its longest side now? Give your answer in cm.",
          answer: { type: "number", value: 36, display: "36 cm" },
          solution: ["Scale factor = 20 ÷ 5 = 4.", "Longest side of the image = 9 × 4 = 36 cm."],
          traps: [{ spec: { type: "number", value: 24 }, feedback: "You added 15 cm to each side. An enlargement multiplies every length by the same scale factor." }],
          difficulty: "warmup",
          guideRef: "enlargement",
          hints: ["How many times longer did the shortest side get?"],
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q06",
          question:
            "Quadrilateral ABCD is a kite with line of symmetry y = 3. The vertices A(0, 3) and C(7, 3) lie on the line of symmetry, and B is at (2, 6). Find the coordinates of D, giving your answer as (x, y).",
          answer: { type: "list", values: [2, 0], ordered: true, display: "(2, 0)" },
          solution: [
            "A line of symmetry works like a mirror, so D is the reflection of B in the line y = 3.",
            "B(2, 6) is 3 units above y = 3, so D is 3 units below it: y = 0.",
            "The x-coordinate doesn't change, so D = (2, 0).",
            "Check: AB and AD both go 2 across and 3 up or down, so they are equal, as in any kite ✓.",
          ],
          traps: [{ spec: { type: "list", values: [2, -6], ordered: true }, feedback: "You reflected B in the x-axis. The kite's line of symmetry is y = 3, not y = 0." }],
          difficulty: "core",
          guideRef: "symmetry",
          hints: [
            "A line of symmetry is a mirror line. Which vertex is D the mirror image of?",
            "B is 3 units above the line y = 3.",
            "Go 3 units below the line instead, keeping x the same.",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q07",
          question:
            "A drone flies by the column vector (3 over −2) four times in a row, and then once by (−5 over 1). It finishes at (4, −6). Where did it start? Give the coordinates as (x, y).",
          answer: { type: "list", values: [-3, 1], ordered: true, display: "(−3, 1)" },
          solution: [
            "Total movement: 4 × (3 over −2) = (12 over −8). Adding (−5 over 1) gives (7 over −7).",
            "Work backwards: start = finish − total movement = (4 − 7, −6 − (−7)) = (−3, 1).",
            "Check: (−3, 1) moved by (7 over −7) lands on (4, −6) ✓.",
          ],
          commonError: "Adding the total movement to the finishing point instead of subtracting it.",
          traps: [
            { spec: { type: "list", values: [11, -13], ordered: true }, feedback: "You added the movement to the finishing point. Work backwards: subtract it." },
            { spec: { type: "list", values: [6, -5], ordered: true }, feedback: "You used (3 over −2) only once — the drone flew it four times." },
          ],
          difficulty: "core",
          guideRef: "translation",
          hints: [
            "Combine all the moves into one column vector first.",
            "4 lots of (3 over −2) is (12 over −8). Now add (−5 over 1).",
            "The total is (7 over −7). Undo it from the finishing point.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q08",
          question: "The point (3, 4) is reflected in the line x = −1. Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-5, 4], ordered: true, display: "(−5, 4)" },
          solution: [
            "x = −1 is a vertical line, so the y-coordinate stays 4.",
            "(3, 4) is 3 − (−1) = 4 squares to the right of the line, so the image is 4 squares to the left of it: x = −1 − 4 = −5.",
            "The image is (−5, 4). Rule check: 2 × (−1) − 3 = −5 ✓.",
          ],
          commonError: "Reflecting in the y-axis (x = 0) instead of the line x = −1.",
          traps: [
            { spec: { type: "list", values: [-3, 4], ordered: true }, feedback: "You reflected in the y-axis (x = 0). The mirror here is x = −1, one square further left." },
            { spec: { type: "list", values: [3, -6], ordered: true }, feedback: "You reflected in y = −1, a horizontal line. x = −1 is vertical." },
          ],
          difficulty: "core",
          guideRef: "reflection",
          hints: [
            "Is x = −1 horizontal or vertical?",
            "How many squares is (3, 4) from the line? Careful: the line is at x = −1, not x = 0.",
            "Count the same number of squares on the other side of the line.",
          ],
          strategy: "Count squares to the mirror",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p2-q09",
          question:
            "Triangle T has vertices (1, 4), (2, 6) and (1, 6). Triangle U has vertices (4, 1), (6, 2) and (6, 1). Describe fully the single transformation that maps T onto U, and explain how you know.",
          marks: 3,
          modelAnswer:
            "Match the vertices: (1, 4) → (4, 1), (2, 6) → (6, 2) and (1, 6) → (6, 1). Every vertex has had its coordinates **swapped**, which is exactly what a reflection in the line y = x does.\n\nCheck with a midpoint: the midpoint of (1, 4) and (4, 1) is (2.5, 2.5), which lies on y = x, and the segment joining them goes 3 right and 3 down — at right angles to the line y = x ✓.\n\nThe transformation is a **reflection in the line y = x**.",
          markScheme: [
            { point: "States that it is a reflection", keywords: ["reflection", "reflect", "reflected"] },
            { point: "Gives the mirror line as y = x", keywords: ["y = x", "y=x"] },
            { point: "Justifies: the coordinates swap, or a midpoint lies on y = x", keywords: ["swap", "swapped", "switch", "midpoint", "2.5"] },
          ],
          commonError: "Writing 'reflection in the diagonal' instead of giving the equation of the mirror line, y = x.",
          difficulty: "core",
          guideRef: "describing-transformations",
          hints: [
            "Match each vertex of T with a vertex of U. What do you notice about the numbers?",
            "In every pair, the coordinates have been swapped.",
            "Which mirror line swaps x and y? Check with a midpoint.",
          ],
          strategy: "Track one point",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q10",
          question: "The point (5, 2) is rotated 180° about the centre (2, −1). Give the coordinates of its image as (x, y).",
          answer: { type: "list", values: [-1, -4], ordered: true, display: "(−1, −4)" },
          solution: [
            "Step from the centre (2, −1) to (5, 2): across 3, up 3.",
            "A half-turn sends the step the opposite way: across −3, up −3.",
            "Image: (2 − 3, −1 − 3) = (−1, −4).",
            "Check: the centre (2, −1) is the midpoint of (5, 2) and (−1, −4) ✓.",
          ],
          solutions: [
            {
              label: "The centre is the midpoint",
              steps: [
                "In a half-turn the centre is exactly halfway between a point and its image.",
                "So image = 2 × centre − point = (4 − 5, −2 − 2) = (−1, −4). Quickest for half-turns.",
              ],
            },
          ],
          traps: [{ spec: { type: "list", values: [-5, -2], ordered: true }, feedback: "You turned the point about the origin. Use the step from the centre (2, −1)." }],
          difficulty: "core",
          guideRef: "rotation",
          hints: [
            "What is the step from the centre to the point?",
            "A half-turn sends that step in exactly the opposite direction.",
            "Add the reversed step on to the centre.",
          ],
          strategy: "Work in steps from the centre",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q11",
          question:
            "Triangle P has vertices (1, 2), (3, 2) and (1, 5). A rotation of 180° maps P onto triangle Q with vertices (7, 0), (5, 0) and (7, −3), listed in matching order. Find the centre of rotation, giving its coordinates as (x, y).",
          answer: { type: "list", values: [4, 1], ordered: true, display: "(4, 1)" },
          solution: [
            "In a half-turn, the centre is the midpoint of each point and its image.",
            "Midpoint of (1, 2) and (7, 0): ({{(1 + 7)/2}}, {{(2 + 0)/2}}) = (4, 1).",
            "Check with another pair: the midpoint of (1, 5) and (7, −3) is ({{8/2}}, {{2/2}}) = (4, 1) ✓.",
          ],
          traps: [
            { spec: { type: "list", values: [8, 2], ordered: true }, feedback: "You added the coordinates but forgot to halve them. The midpoint is the *average*." },
            { spec: { type: "list", values: [6, -2], ordered: true }, feedback: "That's the step from (1, 2) to (7, 0), not the midpoint. Average the coordinates instead." },
          ],
          difficulty: "core",
          guideRef: "rotation",
          hints: [
            "For a half-turn, where is the centre compared with a point and its image?",
            "(1, 2) and (7, 0) are a matching pair.",
            "Find their midpoint, then check with another pair.",
          ],
          strategy: "Use midpoints",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q12",
          question:
            "Triangle ABC has vertices A(1, 1), B(3, 1) and C(1, 4). It is enlarged by scale factor 3 with centre A. Give the coordinates of the image of C as (x, y).",
          answer: { type: "list", values: [1, 10], ordered: true, display: "(1, 10)" },
          solution: [
            "The centre A(1, 1) is a vertex of the triangle, so A stays where it is.",
            "Step from A to C: across 0, up 3.",
            "Times 3: across 0, up 9.",
            "C′ = (1 + 0, 1 + 9) = (1, 10).",
            "Check: AC = 3 and AC′ = 9 = 3 × 3 ✓.",
          ],
          traps: [{ spec: { type: "list", values: [3, 12], ordered: true }, feedback: "You multiplied the coordinates of C by 3, which uses the origin as the centre. Measure from A." }],
          difficulty: "core",
          guideRef: "enlargement",
          hints: [
            "When the centre is a vertex of the shape, what happens to that vertex?",
            "Find the step from A to C.",
            "Multiply the step by 3 and measure it from A.",
          ],
          strategy: "Work in steps from the centre",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p2-q13",
          question:
            "Siti enlarges the triangle with vertices (3, 1), (5, 1) and (3, 4) by scale factor 2, centre (1, 0). She writes the image vertices as (6, 2), (10, 2) and (6, 8). Explain what Siti has done wrong, and find the correct image vertices.",
          marks: 3,
          modelAnswer:
            "Siti has doubled the coordinates of each vertex. That only works when the centre of enlargement is the origin (0, 0) — she has ignored the centre (1, 0).\n\nThe correct method measures every step from the centre:\n\n    (3, 1): step from (1, 0) is (2, 1); doubled (4, 2); image (5, 2)\n    (5, 1): step (4, 1); doubled (8, 2); image (9, 2)\n    (3, 4): step (2, 4); doubled (4, 8); image (5, 8)\n\nThe image vertices are **(5, 2), (9, 2) and (5, 8)**. Siti's triangle is the right size and shape, but it is in the wrong place — 1 square too far right.",
          markScheme: [
            { point: "Explains that doubling the coordinates uses the origin as the centre, not (1, 0)", keywords: ["origin", "(0, 0)", "ignored the centre", "doubled the coordinates", "centre"] },
            { point: "Uses steps from the centre (1, 0), multiplied by 2", keywords: ["step", "from the centre", "(2, 1)", "(4, 1)", "(2, 4)"] },
            { point: "Correct image vertices (5, 2), (9, 2) and (5, 8)", keywords: ["(5, 2)", "(9, 2)", "(5, 8)", "5, 2", "9, 2", "5, 8"] },
          ],
          commonError: "Saying 'she used the wrong scale factor'. Her image is the right size — it's the position that is wrong.",
          difficulty: "core",
          guideRef: "enlargement",
          hints: [
            "Siti's image is the right size. Is it in the right place?",
            "Doubling the coordinates measures everything from (0, 0). What should everything be measured from?",
            "Find the step from (1, 0) to each vertex, double it, and add it back on to (1, 0).",
          ],
          strategy: "Work in steps from the centre",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q14",
          question:
            "Triangle X has sides 5 cm, 7 cm and 9 cm. Triangle Y is similar to X and has a perimeter of 63 cm. How long is the longest side of Y? Give your answer in cm.",
          answer: { type: "number", value: 27, display: "27 cm" },
          solution: [
            "Perimeter of X = 5 + 7 + 9 = 21 cm.",
            "A perimeter is a length, so it scales by the same factor as the sides: scale factor = 63 ÷ 21 = 3.",
            "Longest side of Y = 9 × 3 = 27 cm.",
            "Check: Y has sides 15, 21 and 27 cm, and 15 + 21 + 27 = 63 ✓.",
          ],
          commonError: "Sharing the perimeter equally between the three sides, or adding the extra perimeter on to one side.",
          traps: [
            { spec: { type: "number", value: 21 }, feedback: "That's 63 ÷ 3, as if all of Y's sides were equal. Find the scale factor by comparing perimeters: 63 ÷ 21." },
            { spec: { type: "number", value: 51 }, feedback: "You added 42 cm (the difference between the perimeters) to the longest side. Similar shapes are linked by multiplying, not adding." },
          ],
          difficulty: "core",
          guideRef: "describing-transformations",
          hints: [
            "What is the perimeter of X?",
            "Perimeters of similar shapes are in the same ratio as their sides. Find the scale factor.",
            "Multiply the longest side of X by the scale factor.",
          ],
          strategy: "Compare matching sides",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p2-q15",
          question:
            "Triangle A has vertices (2, 1), (4, 1) and (2, 2). Triangle B has vertices (3, −2), (3, −4) and (4, −2), listed in matching order. Describe fully the single transformation that maps A onto B.",
          marks: 3,
          modelAnswer:
            "The side of A from (2, 1) to (4, 1) points right; its image, from (3, −2) to (3, −4), points down. Right → down is a quarter-turn **clockwise**, and B is not a mirror image of A, so this is a **rotation of 90° clockwise**.\n\n**Centre:** test (1, −1). The step from (1, −1) to (2, 1) is 1 across, 2 up; turned clockwise it becomes 2 across, 1 down, landing on (3, −2) ✓. The step to (4, 1) is 3 across, 2 up; turned clockwise it becomes 2 across, 3 down, landing on (3, −4) ✓. The step to (2, 2) is 1 across, 3 up; turned clockwise it becomes 3 across, 1 down, landing on (4, −2) ✓.\n\nThe transformation is a **rotation of 90° clockwise about (1, −1)** (the same as 270° anticlockwise about (1, −1)).",
          markScheme: [
            { point: "States that it is a rotation", keywords: ["rotation", "rotate", "rotated"] },
            { point: "Angle and direction: 90° clockwise (or 270° anticlockwise)", keywords: ["90", "clockwise", "270", "quarter"] },
            { point: "Centre (1, −1)", keywords: ["(1, -1)", "1, -1", "(1,-1)"] },
          ],
          commonError: "Leaving out the centre or the direction — a rotation needs a centre, an angle and a direction.",
          difficulty: "core",
          guideRef: "rotation",
          hints: [
            "Same size and not a mirror image — which transformation is it, and which three details does it need?",
            "Compare the side from (2, 1) to (4, 1) with its image. Which way has it turned?",
            "The centre is equally far from each point and its image. Test grid points between the triangles: turn the step to (2, 1) clockwise and see whether you land on (3, −2).",
          ],
          strategy: "Check by substituting",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q16",
          question:
            "A straight support cable runs from the top of a vertical pole to a point on level ground 7 m from the foot of the pole. The cable is 25 m long. How tall is the pole? Give your answer in metres.",
          answer: { type: "number", value: 24, display: "24 m" },
          solution: [
            "The pole meets the ground at a right angle, and the cable is opposite it, so the cable is the hypotenuse.",
            "A shorter side is missing, so subtract the squares: {{h^2 = 25^2 - 7^2 = 625 - 49 = 576}}.",
            "{{h = sqrt(576) = 24}} m.",
            "Check: 7, 24, 25 is a Pythagorean triple ✓.",
          ],
          commonError: "Adding the squares when the hypotenuse is already known.",
          traps: [
            { spec: { type: "number", value: 25.96, tolerance: 0.05 }, feedback: "You added the squares. The cable is the hypotenuse, so subtract: {{25^2 - 7^2}}." },
            { spec: { type: "number", value: 18 }, feedback: "You subtracted the lengths. Pythagoras' theorem works with the squares of the sides." },
          ],
          difficulty: "core",
          guideRef: "pythagoras",
          hints: [
            "Sketch the pole, the ground and the cable. Which side is the hypotenuse?",
            "The cable is the hypotenuse, so subtract the squares.",
            "{{25^2 - 7^2 = 625 - 49}}. Now square-root.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q17",
          question:
            "A ladder 2.5 m long leans against a vertical wall, with its top 2.4 m above level ground. The top slides 0.4 m down the wall and the ladder stays straight. How far does the foot of the ladder move away from the wall? Give your answer in metres.",
          answer: { type: "number", value: 0.8, display: "0.8 m" },
          solution: [
            "The ladder is the hypotenuse both times: 2.5 m.",
            "Before: foot distance = {{sqrt(2.5^2 - 2.4^2) = sqrt(6.25 - 5.76) = sqrt(0.49) = 0.7}} m.",
            "After: the top is 2.4 − 0.4 = 2 m up, so the foot distance = {{sqrt(2.5^2 - 2^2) = sqrt(6.25 - 4) = sqrt(2.25) = 1.5}} m.",
            "The foot moves 1.5 − 0.7 = 0.8 m.",
          ],
          solutions: [
            {
              label: "Spot the triples",
              steps: [
                "Work in tenths of a metre: the ladder is 25. Before, the top is 24 up, so the foot is 7 out (7, 24, 25).",
                "After, the top is 20 up, so the foot is 15 out (15, 20, 25 is 3, 4, 5 times 5).",
                "The foot moves 15 − 7 = 8 tenths = 0.8 m. Faster if you know your triples — and no decimals to square.",
              ],
            },
          ],
          commonError: "Assuming the foot moves the same 0.4 m as the top.",
          traps: [
            { spec: { type: "number", value: 0.4 }, feedback: "The foot doesn't move the same distance as the top. Use Pythagoras for the foot's distance before and after." },
            { spec: { type: "number", value: 1.5 }, feedback: "1.5 m is the foot's new distance from the wall. How far was it before?" },
          ],
          difficulty: "challenge",
          guideRef: "pythagoras",
          hints: [
            "What stays the same as the ladder slides?",
            "Use Pythagoras twice: once for the starting position, once after the slide.",
            "Before: {{2.5^2 - 2.4^2}}. After: the top is at 2 m.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q18",
          question:
            "A shape is rotated 90° anticlockwise about the origin, and then the image is reflected in the x-axis. This combination has the same effect as a single reflection. Give the equation of its mirror line.",
          answer: {
            type: "text",
            accept: ["y = −x", "y=-x", "x+y=0", "y+x=0", "x=-y", "-x=y", "-y=x", "y=-1x"],
            display: "y = −x",
          },
          solution: [
            "Follow a general point. Rotating 90° anticlockwise about the origin: (x, y) → (−y, x).",
            "Reflecting in the x-axis changes the sign of the y-coordinate: (−y, x) → (−y, −x).",
            "Overall (x, y) → (−y, −x): swap and change both signs. That is the rule for a reflection in y = −x.",
            "Check with (2, 0): → (0, 2) → (0, −2). The midpoint of (2, 0) and (0, −2) is (1, −1), which is on y = −x ✓.",
          ],
          solutions: [
            {
              label: "Find the points that don't move",
              steps: [
                "A mirror line is made of exactly the points that end up where they started.",
                "Try (1, −1): rotate → (1, 1); reflect in the x-axis → (1, −1). It's back home!",
                "Try (2, −2): → (2, 2) → (2, −2). Also fixed.",
                "The fixed points (1, −1), (2, −2), … lie on y = −x, so that is the mirror line. Slicker when you can't remember the coordinate rules.",
              ],
            },
          ],
          commonError: "Guessing y = x without testing a point.",
          traps: [{ spec: { type: "text", accept: ["y = x", "y=x", "x=y"] }, feedback: "Test a point: (1, 0) → (0, 1) → (0, −1). A reflection in y = x would send (1, 0) to (0, 1), not (0, −1)." }],
          difficulty: "challenge",
          guideRef: "describing-transformations",
          hints: [
            "Follow a general point (x, y), or a specific one such as (2, 0), through both steps.",
            "Anticlockwise quarter-turn: (x, y) → (−y, x). Reflection in the x-axis: change the sign of y.",
            "You should end with (x, y) → (−y, −x). Which mirror line does that?",
          ],
          strategy: "Track one point",
        },
        {
          kind: "short",
          id: "transformations-pythagoras-p2-q19",
          question:
            "All the lines of symmetry of a regular polygon pass through its centre. The angle between two neighbouring lines of symmetry is 15°. How many sides does the polygon have?",
          answer: { type: "number", value: 12 },
          solution: [
            "Try a small case: a square has 4 lines of symmetry, 45° apart — and 4 × 45° = 180°, not 360°.",
            "Why? Each line of symmetry runs right through the centre, so a turn of 180° brings every line back onto itself. So n equally spaced lines are {{180/n}}° apart.",
            "{{180/n}} = 15, so n = 12.",
            "A regular polygon with 12 lines of symmetry has 12 sides (a regular dodecagon).",
          ],
          solutions: [
            {
              label: "Via the rotation angle",
              steps: [
                "Reflecting in one line of symmetry and then in its neighbour gives a rotation through twice the angle between them: 2 × 15° = 30°.",
                "So the smallest turn that fits the polygon onto itself is 30°, and the order of rotational symmetry is 360 ÷ 30 = 12.",
                "So the polygon has 12 sides. Elegant — but the small-case check with a square is quicker to trust.",
              ],
            },
          ],
          commonError: "Dividing 360° by 15° — that treats each line as a single ray from the centre.",
          traps: [{ spec: { type: "number", value: 24 }, feedback: "That assumes the lines are {{360/n}}° apart. Check with a square: 4 lines, but they are 45° apart, not 90°." }],
          difficulty: "challenge",
          guideRef: "symmetry",
          hints: [
            "Try a shape you know: how many lines of symmetry does a square have, and how far apart are they?",
            "A square's 4 lines are 45° apart — and 4 × 45° is 180°, not 360°. Why?",
            "Each line passes right through the centre, so n lines share 180°. Solve {{180/n}} = 15.",
          ],
          strategy: "Try small cases",
        },
        {
          kind: "written",
          id: "transformations-pythagoras-p2-q20",
          question:
            "Priya knows that 5, 12, 13 is a Pythagorean triple. She claims: 'If I enlarge any right-angled triangle by a scale factor k, the new side lengths still fit Pythagoras' theorem.'\n\n(a) Use her claim with k = 3 to write down a new Pythagorean triple from 5, 12, 13.\n\n(b) Prove that her claim is always true.",
          marks: 3,
          modelAnswer:
            "(a) Multiply every side by 3: **15, 36, 39**. Check: {{15^2 + 36^2 = 225 + 1296 = 1521 = 39^2}} ✓.\n\n(b) Let the original triangle have shorter sides a and b and hypotenuse c, so {{a^2 + b^2 = c^2}}. After an enlargement by scale factor k, the sides are ka, kb and kc. Then\n\n    {{(ka)^2 + (kb)^2 = k^2 a^2 + k^2 b^2 = k^2(a^2 + b^2) = k^2 c^2 = (kc)^2}}\n\nso the new sides fit Pythagoras' theorem too, for every value of k.\n\nA quicker reason: an enlargement never changes angles, so the image still has a right angle — and Pythagoras' theorem holds in every right-angled triangle.",
          markScheme: [
            { point: "(a) 15, 36, 39", keywords: ["15", "36", "39"] },
            { point: "(b) Writes the enlarged sides as ka, kb and kc (every side multiplied by k)", keywords: ["ka", "kb", "kc", "multiplied by k", "times k"] },
            { point: "(b) Shows (ka)² + (kb)² = k²(a² + b²) = k²c² = (kc)², or argues that the right angle is unchanged by an enlargement", keywords: ["k^2", "k²", "factor", "right angle", "angles", "same angles"] },
          ],
          commonError: "Checking one example (such as 15, 36, 39) and calling it a proof. An example shows it works once; a proof shows it works for every k.",
          difficulty: "challenge",
          guideRef: "pythagoras",
          hints: [
            "For (a), what does an enlargement do to every length?",
            "For (b), call the sides a, b and c, with {{a^2 + b^2 = c^2}}. What are the new sides?",
            "Expand {{(ka)^2 + (kb)^2}} and take out the common factor {{k^2}}.",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
  ],

  // ======================================================================
  // CHALLENGE SET — AoPS / UKMT-Junior style, all difficulty "challenge"
  // ======================================================================
  challenge: [
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q01",
      question:
        "You are going to shade **exactly 4** of the 16 squares of a 4 × 4 grid. In how many different ways can you do this so that the pattern has rotational symmetry of order 2 about the centre of the grid, but **not** order 4? (Two patterns are different if they shade different squares.)",
      answer: { type: "number", value: 24 },
      solution: [
        "Under a half-turn about the centre, each square swaps with exactly one partner square. No square stays put, because the centre of the grid is a corner where four squares meet, not the middle of a square. So the 16 squares form 8 pairs.",
        "A pattern has half-turn symmetry exactly when it shades whole pairs. With exactly 4 squares shaded, that means choosing 2 of the 8 pairs: {{(8 * 7)/2}} = 28 ways.",
        "Some of these also survive a quarter-turn (order 4). Under quarter-turns the squares form 4 groups of 4: the 4 corners, the 4 middle squares, and two groups of 4 edge squares. A 4-square pattern with order 4 must be exactly one of these groups: 4 patterns.",
        "Each of those groups is made of 2 half-turn pairs, so all 4 are among the 28.",
        "Order exactly 2: 28 − 4 = 24.",
      ],
      solutions: [
        {
          label: "Pick a pair, then avoid its quarter-turn twin",
          steps: [
            "Each half-turn pair has exactly one 'twin' pair that completes a quarter-turn group of 4 with it.",
            "Choose a first pair (8 ways), then a second pair that is neither the same pair nor its twin (6 ways): 8 × 6 = 48.",
            "Every pattern has been counted twice (either pair could have been picked first), so there are 48 ÷ 2 = 24. Slicker — there is nothing to subtract at the end.",
          ],
        },
      ],
      commonError: "Counting all 28 half-turn patterns and forgetting that 4 of them have order 4.",
      traps: [
        { spec: { type: "number", value: 28 }, feedback: "That counts every pattern with half-turn symmetry — but 4 of them also fit after a quarter-turn, so they have order 4." },
        { spec: { type: "number", value: 56 }, feedback: "You counted ordered choices of 2 pairs. Choosing pair X then pair Y gives the same pattern as Y then X." },
      ],
      difficulty: "challenge",
      guideRef: "symmetry",
      hints: [
        "A half-turn about the centre moves each square onto a partner square. How many partner pairs are there?",
        "16 squares make 8 pairs. A pattern with half-turn symmetry must shade both squares of a pair or neither — so 4 shaded squares means choosing 2 pairs.",
        "Count the ways to choose 2 of the 8 pairs.",
        "Now remove the patterns that also survive a quarter-turn. What do they look like, and how many are there?",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q02",
      question:
        "A robot starts at (0, 0). Each move is a translation by one of the four column vectors (2 over 1), (1 over 2), (−2 over −1) or (−1 over −2). It may make as many moves as it likes, in any order, and may go anywhere on the way. How many of the 36 points (x, y), where x and y are both whole numbers from 0 to 5, can the robot reach? (Count (0, 0) as reachable.)",
      answer: { type: "number", value: 12 },
      solution: [
        "Each move changes x + y by +3 or −3, and x + y starts at 0. So x + y is **always a multiple of 3** — an invariant. Points such as (1, 0) or (2, 2) can never be reached.",
        "Every such point *can* be reached. (3, 0) = (2 over 1) + (2 over 1) + (−1 over −2), and (−1, 1) = (1 over 2) + (−2 over −1). If x + y = 3m, then (x, y) is m lots of (3, 0) plus y lots of (−1, 1).",
        "So the reachable points are exactly those with x + y = 0, 3, 6 or 9.",
        "Count them: x + y = 0 gives 1 point, x + y = 3 gives 4, x + y = 6 gives 5 ((1, 5) to (5, 1)) and x + y = 9 gives 2 ((4, 5) and (5, 4)).",
        "Total: 1 + 4 + 5 + 2 = 12.",
      ],
      solutions: [
        {
          label: "Solve for the number of moves",
          steps: [
            "Suppose the robot makes a net total of a moves of (2 over 1) and b moves of (1 over 2), where reverse moves count as negative. Then 2a + b = x and a + 2b = y.",
            "Solving: a = {{(2x - y)/3}} and b = {{(2y - x)/3}}.",
            "2x − y = 2(x + y) − 3y, so a is a whole number exactly when x + y is a multiple of 3 (and then b is too). That proves both directions at once, giving the same 12 points. The invariant is quicker to spot; this method is the tidier proof.",
          ],
        },
      ],
      commonError: "Only counting points reachable with the two 'forward' moves, or assuming every point can be reached.",
      traps: [
        { spec: { type: "number", value: 36 }, feedback: "Not every point can be reached. Look at what happens to x + y after each move." },
        { spec: { type: "number", value: 8 }, feedback: "That counts only points you can reach with forward moves. Reverse moves help too: (3, 0) = (2 over 1) + (2 over 1) + (−1 over −2)." },
      ],
      difficulty: "challenge",
      guideRef: "translation",
      hints: [
        "Make a few moves and work out x + y each time. What do you notice?",
        "Each move changes x + y by 3 or −3, so x + y is always a multiple of 3. That rules out lots of points.",
        "Now check the other direction: can the robot reach (3, 0) and (−1, 1)? If so, it can reach every point whose x + y is a multiple of 3.",
        "Count the grid points with x + y = 0, 3, 6 or 9.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q03",
      question:
        "On a map where 1 unit = 1 km, Aisha's house is at A(1, 3) and Mei's house is at B(7, 5). A straight river runs along the x-axis. Aisha walks in a straight line from A to a point on the river bank to fill a water bottle, then in a straight line on to B. What is the shortest possible total distance she can walk? Give your answer in km.",
      diagram: `<svg viewBox="0 0 316 254" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Map with axes. Aisha's house A at (1, 3) and Mei's house B at (7, 5) are both above a straight river that runs along the x-axis."><rect x="0" y="0" width="316" height="254" fill="#ffffff"/><line x1="34" y1="214" x2="34" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="66" y1="214" x2="66" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="98" y1="214" x2="98" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="130" y1="214" x2="130" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="162" y1="214" x2="162" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="194" y1="214" x2="194" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="226" y1="214" x2="226" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="258" y1="214" x2="258" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="290" y1="214" x2="290" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="214" x2="290" y2="214" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="182" x2="290" y2="182" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="150" x2="290" y2="150" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="118" x2="290" y2="118" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="86" x2="290" y2="86" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="54" x2="290" y2="54" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="22" x2="290" y2="22" stroke="#e2e8f0" stroke-width="1"/><rect x="34" y="214" width="256" height="12" fill="#bae6fd"/><line x1="34" y1="214" x2="290" y2="214" stroke="#334155" stroke-width="1.5"/><line x1="34" y1="214" x2="34" y2="22" stroke="#334155" stroke-width="1.5"/><text x="162" y="224" font-size="10" font-family="sans-serif" fill="#1f2937" text-anchor="middle">river</text><text x="66" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="98" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="130" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="162" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="194" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="226" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="258" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="290" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="28" y="186" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="28" y="154" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="28" y="122" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="28" y="90" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="28" y="58" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="28" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="28" y="240" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><text x="298" y="218" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="34" y="14" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><circle cx="66" cy="118" r="5" fill="#1f2937"/><text x="75" y="111" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold">A(1, 3)</text><circle cx="258" cy="54" r="5" fill="#1f2937"/><text x="249" y="45" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" text-anchor="end">B(7, 5)</text></svg>`,
      answer: { type: "number", value: 10, display: "10 km" },
      solution: [
        "Reflect A in the river (the x-axis): A′ = (1, −3).",
        "For any point P on the river, AP = A′P, because the river is the perpendicular bisector of AA′. So the walk A → P → B is exactly as long as A′ → P → B.",
        "A′ → P → B is shortest when it is a straight line, and a straight line from A′ (below the river) to B (above it) does cross the river.",
        "Length of A′B: across 7 − 1 = 6, up 5 − (−3) = 8, so {{A'B = sqrt(6^2 + 8^2) = sqrt(100) = 10}} km.",
        "The shortest walk is 10 km.",
      ],
      solutions: [
        {
          label: "Find the crossing point, then add",
          steps: [
            "The straight line from A′(1, −3) to B(7, 5) rises 8 while going 6 across. It must rise 3 to reach the river, which takes {{3/8}} of the 6 across: 2.25. So P = (3.25, 0).",
            "AP: across 2.25, down 3: {{sqrt(2.25^2 + 3^2) = sqrt(5.0625 + 9) = sqrt(14.0625) = 3.75}} km.",
            "PB: across 3.75, up 5: {{sqrt(3.75^2 + 5^2) = sqrt(14.0625 + 25) = sqrt(39.0625) = 6.25}} km.",
            "Total: 3.75 + 6.25 = 10 km. Same answer with far more work — the reflection makes finding P unnecessary.",
          ],
        },
      ],
      commonError: "Walking straight down to the river first (3 km) and then across to B — that route is about 10.8 km.",
      traps: [
        { spec: { type: "number", value: 6.32, tolerance: 0.02 }, feedback: "That's the straight line from A to B — but Aisha must touch the river on the way." },
        { spec: { type: "number", value: 10.81, tolerance: 0.02 }, feedback: "Walking straight down to the river first isn't the shortest route. Think of the river as a mirror." },
      ],
      difficulty: "challenge",
      guideRef: "reflection",
      hints: [
        "Imagine the river is a mirror. Where is the reflection of A?",
        "A′ = (1, −3). For any point P on the river, how does AP compare with A′P?",
        "So you want the shortest route from A′ to B. What shape is that route?",
        "Use Pythagoras for the straight line from A′(1, −3) to B(7, 5).",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q04",
      question:
        "A point P is rotated 90° clockwise about the centre (1, 1). The image is then reflected in the line y = x, and lands at (4, −2). Find the coordinates of P, giving your answer as (x, y).",
      answer: { type: "list", values: [-2, -2], ordered: true, display: "(−2, −2)" },
      solution: [
        "Work backwards: undo the last transformation first.",
        "A reflection undoes itself, so reflect (4, −2) in y = x again: (−2, 4).",
        "Undo the 90° clockwise rotation about (1, 1) by rotating 90° anticlockwise about (1, 1). The step from (1, 1) to (−2, 4) is (−3, 3). Anticlockwise, (a, b) → (−b, a): (−3, −3). Add to the centre: (1 − 3, 1 − 3) = (−2, −2).",
        "Check forwards: the step from (1, 1) to (−2, −2) is (−3, −3); clockwise, (a, b) → (b, −a), gives (−3, 3), landing on (−2, 4); reflecting in y = x gives (4, −2) ✓.",
      ],
      solutions: [
        {
          label: "Find the single transformation",
          steps: [
            "Follow a general point (x, y). The step from (1, 1) is (x − 1, y − 1). Turned clockwise: (y − 1, 1 − x). Added to (1, 1): (y, 2 − x).",
            "Reflect in y = x by swapping: (2 − x, y).",
            "So the combination is (x, y) → (2 − x, y) — a single reflection in the line x = 1!",
            "A reflection undoes itself, so P is the reflection of (4, −2) in x = 1: (2 − 4, −2) = (−2, −2). Slicker once you spot it.",
          ],
        },
      ],
      commonError: "Undoing the steps in the original order, or 'undoing' the clockwise turn with another clockwise turn.",
      traps: [{ spec: { type: "list", values: [4, 4], ordered: true }, feedback: "Undo the steps in reverse order, and reverse each one: undo the reflection first, then turn 90° *anticlockwise* about (1, 1)." }],
      difficulty: "challenge",
      guideRef: "rotation",
      hints: [
        "Work backwards. What is the last thing that happened to P? Undo that first.",
        "Reflecting (4, −2) in y = x again undoes the reflection: you get (−2, 4).",
        "To undo a 90° clockwise turn about (1, 1), turn 90° anticlockwise about (1, 1).",
        "The step from (1, 1) to (−2, 4) is (−3, 3). Turn it anticlockwise and add it back on to (1, 1).",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q05",
      question:
        "Shape S is enlarged by scale factor 3 with centre (0, 0). The image is then enlarged by scale factor 2 with centre (10, 0). The result is a single enlargement of S with scale factor 6. Find the centre of this single enlargement, giving its coordinates as (x, y).",
      answer: { type: "list", values: [2, 0], ordered: true, display: "(2, 0)" },
      solution: [
        "The centre of an enlargement (scale factor not 1) is the one point that doesn't move. So look for a point that ends up where it started.",
        "Both centres lie on the x-axis, so the y-coordinate is multiplied by 3 and then by 2: 6y = y only when y = 0. Follow a point (x, 0).",
        "First enlargement (scale factor 3, centre (0, 0)): (x, 0) → (3x, 0).",
        "Second (scale factor 2, centre (10, 0)): the step from (10, 0) to (3x, 0) is 3x − 10; doubled it is 6x − 20; so the point lands at 10 + 6x − 20 = 6x − 10.",
        "Fixed point: 6x − 10 = x, so 5x = 10 and x = 2. The centre is (2, 0).",
        "Check: (2, 0) → (6, 0) → 10 + 2 × (6 − 10) = 2, so (2, 0) ✓.",
      ],
      solutions: [
        {
          label: "Track one point, then use the scale factor",
          steps: [
            "Follow (1, 0): the first enlargement sends it to (3, 0); the second sends it to 10 + 2 × (3 − 10) = −4, so (−4, 0).",
            "The single enlargement has scale factor 6, so the step from the centre (c, 0) to (−4, 0) is 6 times the step from (c, 0) to (1, 0).",
            "−4 − c = 6(1 − c), so −4 − c = 6 − 6c, giving 5c = 10 and c = 2. The centre is (2, 0). This is the same algebra in disguise — the 'point that doesn't move' idea is the slicker way to see it.",
          ],
        },
      ],
      commonError: "Guessing the midpoint of the two centres, (5, 0).",
      traps: [{ spec: { type: "list", values: [5, 0], ordered: true }, feedback: "The centre isn't simply halfway between the two centres. Test it: (5, 0) → (15, 0) → (20, 0), so it moves." }],
      difficulty: "challenge",
      guideRef: "enlargement",
      hints: [
        "The centre of an enlargement is the one point that doesn't move. Which point ends up exactly where it started?",
        "The centre must lie on the x-axis. Take a point (x, 0) and follow it through both enlargements.",
        "After the first enlargement it is at (3x, 0). After the second it is at 10 + 2(3x − 10).",
        "Set 10 + 2(3x − 10) equal to x and solve.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q06",
      question:
        "Squares are drawn outwards on all three sides of a right-angled triangle. The total area of the three squares is 200 cm². How long is the hypotenuse of the triangle? Give your answer in cm.",
      answer: { type: "number", value: 10, display: "10 cm" },
      solution: [
        "Let the shorter sides be a and b and the hypotenuse c. The squares have areas {{a^2}}, {{b^2}} and {{c^2}}.",
        "Total: {{a^2 + b^2 + c^2 = 200}}.",
        "Pythagoras: {{a^2 + b^2 = c^2}}, so the total is {{c^2 + c^2 = 2c^2 = 200}}.",
        "{{c^2 = 100}}, so c = 10 cm.",
        "We never needed a or b: any right-angled triangle with hypotenuse 10 cm works, for example 6, 8, 10.",
      ],
      solutions: [
        {
          label: "Think about the picture",
          steps: [
            "Pythagoras' theorem says the two smaller squares together have exactly the same area as the big square.",
            "So the big square is half of the 200 cm² total: 100 cm².",
            "Its side, the hypotenuse, is {{sqrt(100) = 10}} cm. Same idea with no letters — the picture makes it quicker.",
          ],
        },
      ],
      commonError: "Assuming the three squares are equal, or treating 200 cm² as the square on the hypotenuse alone.",
      traps: [
        { spec: { type: "number", value: 14.14, tolerance: 0.02 }, feedback: "That treats 200 cm² as the square on the hypotenuse alone. It is the total of all three squares." },
        { spec: { type: "number", value: 8.16, tolerance: 0.02 }, feedback: "You assumed the three squares are equal. The biggest square equals the other two together." },
      ],
      difficulty: "challenge",
      guideRef: "pythagoras",
      hints: [
        "Call the sides a, b and hypotenuse c. Write the total area using a, b and c.",
        "{{a^2 + b^2 + c^2 = 200}}. What does Pythagoras' theorem say about {{a^2 + b^2}}?",
        "Replace {{a^2 + b^2}} with {{c^2}}, then solve.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q07",
      question:
        "A rectangle has a diagonal of length 13 cm and a perimeter of 34 cm. What is its area? Give your answer in cm².",
      answer: { type: "number", value: 60, display: "60 cm²" },
      solution: [
        "Let the sides be a and b. Perimeter: 2(a + b) = 34, so a + b = 17.",
        "The diagonal is the hypotenuse of a right-angled triangle with shorter sides a and b: {{a^2 + b^2 = 13^2 = 169}}.",
        "Square a + b = 17: {{(a + b)^2 = a^2 + 2ab + b^2 = 289}}.",
        "Subtract the diagonal equation: 2ab = 289 − 169 = 120, so ab = 60.",
        "The area is 60 cm². (The sides are 5 cm and 12 cm, but we never needed them.)",
      ],
      solutions: [
        {
          label: "Spot the triple",
          steps: [
            "A diagonal of 13 suggests the triple 5, 12, 13.",
            "Check the perimeter: 2 × (5 + 12) = 34 ✓.",
            "Area = 5 × 12 = 60 cm². Quicker here — but the algebra works even when the sides aren't whole numbers.",
          ],
        },
      ],
      commonError: "Stopping at 2ab = 120 and forgetting to halve.",
      traps: [
        { spec: { type: "number", value: 120 }, feedback: "120 is 2ab, twice the area. Halve it." },
        { spec: { type: "number", value: 289 }, feedback: "289 is (a + b)². You want ab: compare (a + b)² with a² + b²." },
      ],
      difficulty: "challenge",
      guideRef: "pythagoras",
      hints: [
        "Call the sides a and b. Write down one fact from the perimeter and one from the diagonal.",
        "a + b = 17 and {{a^2 + b^2 = 169}}. You want ab.",
        "Square the first fact: {{(a + b)^2 = a^2 + 2ab + b^2}}. Compare it with the second.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "transformations-pythagoras-ch-q08",
      question:
        "Always, sometimes or never true? 'If you reflect a shape in one mirror line, and then reflect the image in a second, different mirror line, the result is the same as a single translation.' Decide, and justify your answer with examples.",
      marks: 4,
      modelAnswer:
        "**Sometimes.**\n\n**When it is true — parallel mirrors.** Reflect in x = 1, then in x = 4. A point (x, y) goes to (2 − x, y), then to (8 − (2 − x), y) = (x + 6, y). Every point moves 6 right, so the result is a translation by (6 over 0). For example (0, 5) → (2, 5) → (6, 5). In general, parallel mirrors give a translation of twice the gap between them, at right angles to the mirrors.\n\n**When it is false — mirrors that cross.** Reflect in the x-axis, then in the y-axis: (x, y) → (x, −y) → (−x, −y). That is a rotation of 180° about (0, 0), not a translation: (3, 1) moves to (−3, −1), 6 left and 2 down, but (1, 0) moves to (−1, 0), only 2 left. In a translation every point moves by the same vector.\n\nSo it depends on the mirrors: parallel mirror lines give a translation; mirror lines that cross give a rotation about the crossing point.",
      markScheme: [
        { point: "Answer: sometimes", keywords: ["sometimes"] },
        { point: "Correct example where it is true: parallel mirror lines give a translation (e.g. x = 1 then x = 4 gives (6 over 0))", keywords: ["parallel", "translation", "6 right", "twice"] },
        { point: "Correct example where it is false: crossing mirror lines give a rotation (e.g. x-axis then y-axis gives a 180° rotation)", keywords: ["rotation", "180", "cross", "intersect", "half-turn", "perpendicular"] },
        { point: "Justifies with coordinates, e.g. shows that different points move by different vectors in the crossing case", keywords: ["(x, y)", "different", "every point", "same vector", "coordinates"] },
      ],
      commonError: "Testing just one pair of mirror lines and then answering 'always' or 'never'.",
      difficulty: "challenge",
      guideRef: "describing-transformations",
      hints: [
        "Try two parallel mirror lines, such as x = 1 and x = 4. Track a point through both reflections.",
        "Now try two mirror lines that cross, such as the x-axis and the y-axis. Track (3, 1) and (1, 0).",
        "A translation moves every point by the same vector. In which of your two cases does that happen?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "written",
      id: "transformations-pythagoras-ch-q09",
      question: "Prove that no triangle can have exactly two lines of symmetry.",
      marks: 4,
      modelAnswer:
        "**Step 1: every line of symmetry passes through a vertex.** Reflecting in a line of symmetry maps the triangle onto itself, so it sends the 3 vertices to vertices. A reflection swaps points in pairs, and 3 is odd, so at least one vertex is sent to itself — and the only points a reflection leaves where they are lie on the mirror line. (It can't fix all three vertices, or they would all lie on one line.) So each line of symmetry passes through one vertex, say A, and swaps the other two, B and C.\n\n**Step 2: that makes two sides equal.** The reflection maps side AB onto side AC, so AB = AC.\n\n**Step 3: two lines of symmetry make the triangle equilateral.** A line of symmetry through A must swap B and C, so it is the perpendicular bisector of BC — there is only one such line. So two different lines of symmetry pass through two different vertices, say A and B. The line through A gives AB = AC; the line through B gives BA = BC. So AB = BC = CA: the triangle is equilateral.\n\n**Step 4: contradiction.** An equilateral triangle has **three** lines of symmetry, one through each vertex. So any triangle with at least two lines of symmetry has three. A triangle can have 0, 1 or 3 lines of symmetry — never exactly 2.",
      markScheme: [
        { point: "Explains why a line of symmetry must pass through a vertex (vertices are swapped in pairs; 3 is odd, so one is fixed)", keywords: ["vertex", "corner", "odd", "fixed", "through a vertex"] },
        { point: "A line of symmetry through a vertex makes the two sides meeting there equal (isosceles)", keywords: ["ab = ac", "two sides equal", "equal sides", "isosceles"] },
        { point: "Two lines of symmetry make all three sides equal (equilateral)", keywords: ["equilateral", "all three sides", "all sides equal", "ab = bc"] },
        { point: "An equilateral triangle has 3 lines of symmetry, so exactly 2 is impossible", keywords: ["three lines", "3 lines", "contradiction", "impossible", "0, 1 or 3"] },
      ],
      commonError: "Checking a few triangles and saying 'I couldn't find one'. That is evidence, not a proof.",
      difficulty: "challenge",
      guideRef: "symmetry",
      hints: [
        "Reflecting in a line of symmetry sends each vertex to a vertex. With 3 vertices, what must happen to at least one of them?",
        "At least one vertex stays put, so it lies on the mirror line. What does the reflection do to the two sides that meet at that vertex?",
        "Two lines of symmetry give two pairs of equal sides. What kind of triangle is that?",
        "How many lines of symmetry does that kind of triangle really have?",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "transformations-pythagoras-ch-q10",
      question:
        "A shape is reflected in the line y = x, and then the image is translated by the column vector (2 over −2). The combined effect is a single reflection. Find the equation of its mirror line.",
      answer: {
        type: "text",
        accept: [
          "y = x − 2",
          "y=x-2",
          "y=-2+x",
          "x-y=2",
          "-y+x=2",
          "x=y+2",
          "x=2+y",
          "y+2=x",
          "2+y=x",
          "x-2=y",
          "-2+x=y",
          "y-x=-2",
          "-x+y=-2",
          "x-y-2=0",
          "y-x+2=0",
        ],
        display: "y = x − 2",
      },
      solution: [
        "The points on the mirror line of a reflection are exactly the points that don't move.",
        "Try (2, 0): reflect in y = x → (0, 2); translate by (2 over −2) → (2, 0). It's back where it started!",
        "Try (3, 1): → (1, 3) → (3, 1). Fixed too. And (4, 2) → (2, 4) → (4, 2).",
        "The fixed points (2, 0), (3, 1), (4, 2) lie on a line with gradient 1 that crosses the x-axis at 2, so the mirror line is y = x − 2.",
        "Check with a point that does move: (0, 0) → (0, 0) → (2, −2). The midpoint (1, −1) lies on y = x − 2 ✓, and the move 2 right, 2 down is at right angles to the line ✓.",
      ],
      solutions: [
        {
          label: "Algebra with a general point",
          steps: [
            "Follow (x, y): reflecting in y = x gives (y, x); translating gives (y + 2, x − 2).",
            "A point is fixed when y + 2 = x and x − 2 = y — and both equations say y = x − 2.",
            "So the mirror line is y = x − 2. Slicker, and it proves that *every* point of that line stays put.",
          ],
        },
      ],
      commonError: "Answering y = x, the first mirror — the translation moves the line.",
      traps: [
        { spec: { type: "text", accept: ["y = x + 2", "y=x+2", "x=y-2", "y-x=2", "x-y=-2", "x+2=y"] }, feedback: "Check with a point that doesn't move: (2, 0) → (0, 2) → (2, 0). So (2, 0) is on the mirror line — but it isn't on y = x + 2." },
        { spec: { type: "text", accept: ["y = x", "y=x", "x=y"] }, feedback: "y = x is only the first mirror. Find points that end up exactly where they started — they make up the new mirror line." },
      ],
      difficulty: "challenge",
      guideRef: "describing-transformations",
      hints: [
        "A mirror line is made of the points that don't move. Can you find a point that ends where it started?",
        "Try points such as (2, 0), (3, 1) and (4, 2). Follow each one through both steps.",
        "(2, 0) → (0, 2) → (2, 0). Find another fixed point, then the equation of the line through them.",
      ],
      strategy: "Look for an invariant",
    },
  ],
};
