// MCQ papers for "Transformations & Symmetry" (transformations-pythagoras).
// 4 papers × 20 questions. Column vectors are written inline as (top over bottom),
// matching the guide; plain (x, y) is always a coordinate.
import type { Paper } from "../../types.ts";

export const mcqPapers: Paper[] = [
  // ===========================================================================
  // MCQ PAPER 1
  // ===========================================================================
  {
    id: "transformations-pythagoras-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q01",
        question: "How many lines of symmetry does a regular hexagon have?",
        options: ["3", "2", "6", "12"],
        answerIndex: 2,
        explanation:
          "A regular hexagon has 6 lines of symmetry: 3 join opposite corners and 3 join the midpoints of opposite sides. 3 comes from counting only the corner-to-corner lines. 12 counts each line twice, once from each end. A regular polygon with n sides always has n lines of symmetry.",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["Picture the folds: a line can go corner to corner, OR from the middle of one edge to the middle of the opposite edge."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q02",
        question:
          "The point P(2, 5) is translated by the column vector (3 over −4), which has 3 on top and −4 underneath. Where does P land?",
        options: ["(5, 1)", "(−1, 9)", "(−2, 8)", "(5, 9)"],
        answerIndex: 0,
        explanation:
          "The top number moves you across and the bottom number moves you up (negative means down): (2 + 3, 5 − 4) = (5, 1). (−2, 8) uses the top number for the y-coordinate, but the top number is always the across move. (5, 9) treats −4 as 4 up instead of 4 down.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["Top number: how far right (or left). Bottom number: how far up (or down)."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q03",
        question: "The point (4, 3) is reflected in the y-axis. Where is its image?",
        options: ["(4, −3)", "(−4, 3)", "(−4, −3)", "(3, 4)"],
        answerIndex: 1,
        explanation:
          "The y-axis is the vertical line x = 0. Reflecting in it sends the point the same distance to the other side, so the x-coordinate changes sign and y stays the same: (−4, 3). (4, −3) is the reflection in the x-axis: an easy slip if you mix up the names of the two axes. (−4, −3) changes both signs, which is a 180° rotation about the origin.",
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["Is the y-axis horizontal or vertical? Which coordinate does a flip across it change?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q04",
        question: "To describe a rotation fully, what must you state?",
        options: [
          "The angle and the direction only",
          "The centre and the scale factor",
          "The mirror line and the angle",
          "The centre, the angle and the direction",
        ],
        answerIndex: 3,
        explanation:
          "A rotation needs three facts: the point it turns about (the centre), how far it turns (the angle) and which way (clockwise or anticlockwise). With only the angle and the direction, the image could be anywhere: turning 90° about (0, 0) and turning 90° about (5, 5) give images in different places. A scale factor belongs to enlargements and a mirror line belongs to reflections.",
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["Imagine pinning tracing paper with a pencil point and turning it. What do you need to know?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q05",
        question: "A rectangle 3 cm by 5 cm is enlarged by scale factor 2. What are the dimensions of the image?",
        options: ["6 cm by 10 cm", "5 cm by 7 cm", "6 cm by 5 cm", "1.5 cm by 2.5 cm"],
        answerIndex: 0,
        explanation:
          "Scale factor 2 multiplies every length by 2: 3 × 2 = 6 cm and 5 × 2 = 10 cm. 5 cm by 7 cm adds 2 instead of multiplying, which would change the shape of the rectangle. 1.5 cm by 2.5 cm divides by 2, which would make it smaller.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["A scale factor tells you what to multiply every length by."],
        strategy: "Multiply every length",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q06",
        question:
          "This parallelogram has no right angles, and its top and bottom sides are longer than its slanted sides. What is its order of rotational symmetry, and how many lines of symmetry does it have?",
        diagram: `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A parallelogram with no right angles. Its bottom and top sides are longer than its two slanted sides."><rect x="0" y="0" width="320" height="190" fill="#ffffff"/><polygon points="50,150 210,150 270,40 110,40" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><path d="M127 155L134 150L127 145" stroke="#1f2937" stroke-width="1.5" fill="none"/><path d="M187 45L194 40L187 35" stroke="#1f2937" stroke-width="1.5" fill="none"/><path d="M81.3 103.1L80.2 94.6L72.5 98.3M84.6 97L83.6 88.4L75.8 92.2" stroke="#1f2937" stroke-width="1.5" fill="none"/><path d="M241.3 103.1L240.2 94.6L232.5 98.3M244.6 97L243.6 88.4L235.8 92.2" stroke="#1f2937" stroke-width="1.5" fill="none"/></svg>`,
        options: [
          "Order 2 and 2 lines of symmetry",
          "Order 0 and 0 lines of symmetry",
          "Order 2 and 0 lines of symmetry",
          "Order 4 and 2 lines of symmetry",
        ],
        answerIndex: 2,
        explanation:
          "A half turn (180°) about its centre fits it back onto itself, and so does a full turn, so the order is 2. But no fold works: folding along a diagonal does not make the corners meet (try it with a paper parallelogram). 2 lines of symmetry comes from assuming the diagonals are mirror lines, which is only true for a rhombus. Order 0 is impossible: every shape fits onto itself after a full turn, so the lowest order is 1.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Imagine tracing it and turning the tracing. How many times does it fit during one full turn?",
          "Now imagine folding along each diagonal. Do the corners land on top of each other?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q07",
        question:
          "Under a translation, vertex A(−3, 2) of a triangle moves to A′(1, −1). Which column vector describes the translation?",
        options: ["(−4 over 3)", "(4 over −3)", "(−3 over 4)", "(−2 over 1)"],
        answerIndex: 1,
        explanation:
          "The vector is image minus object. Across: 1 − (−3) = 4. Up: −1 − 2 = −3. So the vector is (4 over −3). (−4 over 3) subtracts the wrong way round: it is the vector that takes A′ back to A. (−2 over 1) adds the coordinates instead of finding the change.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "How far right does the point move? How far up or down?",
          "For the across move, work out 1 − (−3).",
          "For the up/down move, work out −1 − 2.",
        ],
        strategy: "Find the change: image − object",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q08",
        question: "The point (−2, 5) is reflected in the line y = x. Where is its image?",
        options: ["(−5, 2)", "(2, 5)", "(−2, −5)", "(5, −2)"],
        answerIndex: 3,
        explanation:
          "Reflecting in y = x swaps the coordinates: (−2, 5) → (5, −2). Check: the midpoint of (−2, 5) and (5, −2) is (1.5, 1.5), which lies on y = x. (−5, 2) uses the rule for y = −x (swap AND change both signs). (2, 5) is the reflection in the y-axis.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Try an easy point first: where does (1, 0) go when it is reflected in y = x?",
          "(1, 0) goes to (0, 1). What happened to the two coordinates?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q09",
        question: "The point (5, 1) is reflected in the line x = 2. Where is its image?",
        options: ["(−1, 1)", "(5, 3)", "(−5, 1)", "(−3, 1)"],
        answerIndex: 0,
        explanation:
          "x = 2 is a vertical line. (5, 1) is 3 units to the right of it, so the image is 3 units to the left of it: x = 2 − 3 = −1, giving (−1, 1). (5, 3) reflects in the horizontal line y = 2 instead. (−3, 1) measures the 3 units from the y-axis instead of from the mirror line.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Is x = 2 a vertical or a horizontal line? Sketch it.",
          "How far is (5, 1) from the line?",
          "Go the same distance on the other side of the line.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q10",
        question: "The point (4, 1) is rotated 90° clockwise about the origin. Where does it land?",
        options: ["(−1, 4)", "(−4, −1)", "(1, −4)", "(1, 4)"],
        answerIndex: 2,
        explanation:
          "Turning clockwise from just right of the origin heads downwards. The 4 across becomes 4 down and the 1 up becomes 1 across, so (4, 1) → (1, −4). (The rule is (x, y) → (y, −x).) (−1, 4) is the anticlockwise image. (1, 4) only swaps the coordinates, which is the reflection in y = x, not a rotation.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "A quarter turn clockwise from the top-right quarter of the grid takes you into which quarter?",
          "Imagine turning the line from (0, 0) to (4, 1) a quarter turn clockwise, like tracing paper.",
          "The 4 across becomes 4 down, and the 1 up becomes 1 across.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q11",
        question: "The point (3, 2) is rotated 180° about the point (1, 1). Where is its image?",
        options: ["(−3, −2)", "(−1, 0)", "(−2, −1)", "(2, −1)"],
        answerIndex: 1,
        explanation:
          "From the centre (1, 1), the point is 2 right and 1 up. A half turn reverses that move: 2 left and 1 down from the centre gives (1 − 2, 1 − 1) = (−1, 0). Notice that the centre is the midpoint of the point and its image. (−3, −2) rotates about the origin instead. (−2, −1) is the reversed move without adding the centre back on. (2, −1) is only a quarter turn.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Describe the point's position from the centre: how far across, how far up?",
          "A 180° turn reverses both of those moves.",
          "Start at (1, 1) and make the reversed move.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q12",
        question:
          "The point (3, 2) is a vertex of a shape. The shape is enlarged by scale factor 3 with centre (1, 1). Where does this vertex go?",
        options: ["(9, 6)", "(6, 3)", "(9, 5)", "(7, 4)"],
        answerIndex: 3,
        explanation:
          "From the centre (1, 1), the vertex is 2 right and 1 up. Scale factor 3 makes that 6 right and 3 up from the centre: (1 + 6, 1 + 3) = (7, 4). (9, 6) multiplies the coordinates by 3, which only works when the centre is the origin. (9, 5) measures the stretched move from the vertex instead of from the centre.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "In an enlargement everything is measured from the centre. How far is (3, 2) from (1, 1)?",
          "Multiply that move (2 right, 1 up) by 3.",
          "Add the stretched move on to the centre, not on to the vertex.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q13",
        question:
          "A rectangle 2 cm by 3 cm is enlarged to a rectangle 8 cm by 12 cm. Mei says, \"The scale factor is 6, because 8 − 2 = 6.\" What is her mistake?",
        options: [
          "She subtracted; the scale factor is 8 ÷ 2 = 4",
          "There is no mistake; the scale factor is 6",
          "She used the wrong sides; it should be 12 − 3 = 9",
          "The scale factor is 16, because the area is 16 times bigger",
        ],
        answerIndex: 0,
        explanation:
          "A scale factor multiplies, so you divide to find it: 8 ÷ 2 = 4 and 12 ÷ 3 = 4, the same for both pairs of sides, as it must be. Subtracting gives 6 for one pair but 9 for the other, which shows subtraction can't be right. 16 is how many times bigger the area is (4 × 4 = 16), not the length scale factor.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Does an enlargement add to lengths or multiply them?",
          "Test Mei's method on the other pair of sides. Does it give the same number?",
          "Work out 8 ÷ 2 and 12 ÷ 3.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q14",
        question: "Shape B is the image of shape A after a single transformation. Which description is correct?",
        diagram: `<svg viewBox="0 0 324 212" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Shape A has vertices (−3, 1), (0, 1), (0, 2) and (−2, 4). Shape B has vertices (5, 1), (2, 1), (2, 2) and (4, 4)."><rect x="0" y="0" width="324" height="212" fill="#ffffff"/><path d="M22 22V190M50 22V190M78 22V190M106 22V190M134 22V190M162 22V190M190 22V190M218 22V190M246 22V190M274 22V190M302 22V190M22 190H302M22 162H302M22 134H302M22 106H302M22 78H302M22 50H302M22 22H302" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="162" x2="302" y2="162" stroke="#334155" stroke-width="1.5"/><line x1="134" y1="190" x2="134" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="50,134 134,134 134,106 78,50" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="274,134 190,134 190,106 246,50" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="310" y="166" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="130" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="50" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="78" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="106" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="162" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="190" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="218" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="246" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="274" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="302" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="130" y="194" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="130" y="138" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="130" y="110" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="130" y="82" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="130" y="54" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="130" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="130" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="94.8" y="111" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="229.2" y="111" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: [
          "Reflection in the line y = 1",
          "Translation by the column vector (5 over 0)",
          "Reflection in the line x = 1",
          "Reflection in the y-axis",
        ],
        answerIndex: 2,
        explanation:
          "B is a mirror image of A: A's short vertical edge is on its right, but B's is on its left, so it is a reflection. Matching vertices pair up as (0, 1) ↔ (2, 1) and (−3, 1) ↔ (5, 1), and the mirror line is halfway between each pair: x = 1. Reflection in the y-axis would keep (0, 1) where it is, but that vertex moved. Translation by (5 over 0) slides A without flipping it, so the short vertical edge would still be on the right.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Does B face the same way as A, or is it a mirror image?",
          "Pair up matching corners, for example the bottom of the short vertical edge in each shape.",
          "The mirror line passes through the midpoint of every matching pair.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q15",
        question: "Shape B is an enlargement of shape A with scale factor 2. Which statement is true?",
        options: [
          "A and B are congruent, because their angles are equal",
          "A and B are similar but not congruent",
          "Each angle in B is twice the matching angle in A",
          "The area of B is twice the area of A",
        ],
        answerIndex: 1,
        explanation:
          "An enlargement keeps every angle and multiplies every length by 2, so B is the same shape but a different size: similar, not congruent. Equal angles are not enough for congruence, because the lengths must match too. Angles never change in an enlargement, and the area becomes 2 × 2 = 4 times bigger, not twice as big.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Congruent means same shape AND same size. Similar means same shape, any size.",
          "What happens to the lengths? What happens to the angles?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q16",
        question: "A right-angled triangle has shorter sides 6 cm and 8 cm. How long is the hypotenuse?",
        options: ["14 cm", "100 cm", "{{sqrt(14)}} cm", "10 cm"],
        answerIndex: 3,
        explanation:
          "{{6^2 + 8^2 = 36 + 64 = 100}}, so the hypotenuse is {{sqrt(100) = 10}} cm. 14 cm just adds the two sides, but the hypotenuse must be shorter than the other two sides put together. 100 cm stops one step early: 100 is {{c^2}}, not c.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "What does Pythagoras' theorem say about the squares of the three sides?",
          "Square the two shorter sides and add.",
          "You have found {{c^2}}. What is the last step?",
        ],
        strategy: "Square, add, square-root",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q17",
        question:
          "Always, sometimes or never true? \"A flat shape with exactly two lines of symmetry has rotational symmetry of order 2.\"",
        options: [
          "Always true",
          "Sometimes true",
          "Never true",
          "Only true if the two lines are horizontal and vertical",
        ],
        answerIndex: 0,
        explanation:
          "Always true. If you reflect one line of symmetry in the other, the result must also be a line of symmetry. With exactly two lines, that can't create a third line, so the two lines must meet at 90°. Reflecting in two perpendicular lines, one after the other, is a half turn about the point where they cross: for example (3, 1) → (3, −1) → (−3, −1). So the shape fits after a half turn and after a full turn: order 2. Examples: a rectangle, a rhombus, the letter H. 'Sometimes' is tempting if you only test a few shapes, but there is no counterexample. Tilting a shape doesn't change its symmetry, so the lines needn't be horizontal and vertical.",
        difficulty: "challenge",
        guideRef: "symmetry",
        hints: [
          "Test some shapes with exactly two lines of symmetry: a rectangle, a rhombus, the letter H. What angle do the two lines meet at?",
          "If one line of symmetry is reflected in the other, the result is also a line of symmetry. When does that NOT give a third line?",
          "Follow the point (3, 1) through a reflection in the x-axis and then in the y-axis. Which single transformation is that?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q18",
        question:
          "Hana rotates the point (5, 3) by 90° clockwise about the centre (2, 1). She writes: \"Clockwise quarter turn: (x, y) → (y, −x), so the image is (3, −5).\" What has gone wrong?",
        options: [
          "She should have turned anticlockwise; the image is (−3, 5)",
          "She forgot to add the centre back on; the image is (2, −3)",
          "She rotated about the origin, not about (2, 1); the image is (4, −2)",
          "Nothing; (3, −5) is correct",
        ],
        answerIndex: 2,
        explanation:
          "Her rule only works for rotations about the origin. Measure from the centre instead: (5, 3) is 3 right and 2 up from (2, 1). A quarter turn clockwise turns that into 2 right and 3 down, so the image is (2 + 2, 1 − 3) = (4, −2). (2, −3) is the turned move on its own; it still needs adding on to the centre. (−3, 5) turns the wrong way and still uses the origin as the centre.",
        difficulty: "challenge",
        guideRef: "rotation",
        hints: [
          "When does the rule (x, y) → (y, −x) work? Is the centre here (0, 0)?",
          "Describe (5, 3) as a move from the centre (2, 1).",
          "Turn that move a quarter turn clockwise, then make the turned move starting from the centre.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q19",
        question:
          "An enlargement maps P(2, 1) to P′(5, 7) and Q(3, 1) to Q′(7, 7). What are the scale factor and the centre of enlargement?",
        options: [
          "Scale factor 2, centre (0, 0)",
          "Scale factor 2, centre (−1, −5)",
          "Scale factor 2.5, centre (0, 0)",
          "Scale factor 2, centre (1, 5)",
        ],
        answerIndex: 1,
        explanation:
          "PQ is 1 unit long and P′Q′ is 2 units long, so the scale factor is 2. With scale factor 2, the centre C, P and P′ lie on one line and P is exactly halfway between C and P′. Working backwards from P′(5, 7) through P(2, 1): that's 3 left and 6 down, so another 3 left and 6 down reaches C = (−1, −5). Check with Q: from (−1, −5) to Q(3, 1) is 4 right and 6 up; doubled, that's 8 right and 12 up, landing on (7, 7). Scale factor 2.5 comes from 5 ÷ 2, dividing coordinates, which only works if the centre is the origin; it would send Q to (7.5, 2.5). (1, 5) has the signs the wrong way round.",
        difficulty: "challenge",
        guideRef: "enlargement",
        hints: [
          "Compare a length in the object with the matching length in the image: PQ and P′Q′.",
          "With scale factor 2, P is exactly halfway between the centre and P′.",
          "Start at P′, step to P, then take the same step again.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m1-q20",
        question:
          "A shape is reflected in the x-axis, and then its image is reflected in the line y = x. Which single transformation has the same overall effect?",
        options: [
          "Rotation 90° clockwise about (0, 0)",
          "Rotation 180° about (0, 0)",
          "Reflection in the line y = −x",
          "Rotation 90° anticlockwise about (0, 0)",
        ],
        answerIndex: 3,
        explanation:
          "Follow a point: (2, 1) → reflect in the x-axis → (2, −1) → reflect in y = x (swap) → (−1, 2). Going from (2, 1) to (−1, 2) is a quarter turn anticlockwise about the origin. Two reflections flip the shape twice, so it ends up facing the original way: the result is a rotation (or a translation), never a reflection. That rules out y = −x. 90° clockwise is what you get if you do the two reflections in the other order: order matters!",
        difficulty: "challenge",
        guideRef: "describing-transformations",
        hints: [
          "Pick a simple point, like (2, 1), and follow it through both reflections.",
          "Reflecting in the x-axis changes the sign of y; reflecting in y = x swaps the coordinates.",
          "Compare where (2, 1) started and where it finished. Which turn does that?",
        ],
        strategy: "Track one point",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 2
  // ===========================================================================
  {
    id: "transformations-pythagoras-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q01",
        question: "Which capital letter has rotational symmetry of order 2 but no lines of symmetry?",
        options: ["H", "N", "A", "T"],
        answerIndex: 1,
        explanation:
          "N looks the same after a half turn, but no fold makes it match. H also has order 2, but it has two lines of symmetry as well. A and T each have one vertical line of symmetry and no rotational symmetry (order 1).",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["Turn each letter upside down in your head. Which ones still look the same? Then check for folds."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q02",
        question: "A shape is translated 5 squares left and 2 squares up. Which column vector describes this translation?",
        options: ["(5 over 2)", "(2 over −5)", "(−5 over −2)", "(−5 over 2)"],
        answerIndex: 3,
        explanation:
          "The top number is the across move, with left negative: −5. The bottom number is the up move, positive: 2. So the vector is (−5 over 2). (5 over 2) forgets that left is negative, and (2 over −5) puts the moves in the wrong order.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["Which direction is negative for the top number? Which for the bottom number?"],
        strategy: "Use signs for direction",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q03",
        question: "The point (−3, −4) is reflected in the x-axis. Where is its image?",
        options: ["(−3, 4)", "(3, −4)", "(3, 4)", "(−4, −3)"],
        answerIndex: 0,
        explanation:
          "The x-axis is horizontal, so the point flips up or down: x stays −3 and y changes sign to 4, giving (−3, 4). (3, −4) is the reflection in the y-axis, and (3, 4) changes both signs, which is a half turn about the origin.",
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["The x-axis is the horizontal line y = 0. Does reflecting in it move a point sideways or up and down?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q04",
        question: "A shape is rotated 90° clockwise about a point C. Which other rotation about C always gives exactly the same image?",
        options: ["90° anticlockwise", "270° clockwise", "270° anticlockwise", "180° clockwise"],
        answerIndex: 2,
        explanation:
          "A full turn is 360°, so a quarter turn clockwise ends in the same place as 360° − 90° = 270° anticlockwise. 90° anticlockwise ends up on the opposite side from 90° clockwise, and 270° clockwise is the same as 90° anticlockwise.",
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["If you go the other way round, how far must you turn to reach the same place?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q05",
        question: "After which of these transformations is the image NOT congruent to the object?",
        options: [
          "Reflection in the line y = 2",
          "Enlargement with scale factor 3",
          "Rotation of 90° clockwise about (1, 4)",
          "Translation by the column vector (−2 over 6)",
        ],
        answerIndex: 1,
        explanation:
          "Reflections, rotations and translations only move a shape, so lengths and angles are kept and the image is congruent. An enlargement with scale factor 3 triples every length, so the image is similar (same shape) but not congruent (different size).",
        difficulty: "warmup",
        guideRef: "describing-transformations",
        hints: ["Congruent means identical in shape and size. Which transformation changes the size?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q06",
        question:
          "Zara made this table. One row has a mistake in it. Which shape's row is wrong?\n\n| Shape | Lines of symmetry | Order of rotational symmetry |\n|---|---|---|\n| Rectangle (not a square) | 2 | 2 |\n| Kite | 1 | 1 |\n| Regular pentagon | 5 | 5 |\n| Isosceles trapezium | 1 | 2 |",
        options: ["Rectangle (not a square)", "Kite", "Regular pentagon", "Isosceles trapezium"],
        answerIndex: 3,
        explanation:
          "An isosceles trapezium has one line of symmetry (through the midpoints of its parallel sides), but a half turn puts the longer parallel side on top, so it only fits after a full turn: order 1, not 2. The rectangle row is right, because its diagonals are not lines of symmetry, so it has 2 lines, not 4. A kite has one line and order 1, and a regular pentagon has 5 of each.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Check each row by imagining the shape turned upside down (a half turn).",
          "After a half turn, which parallel side of an isosceles trapezium ends up on top?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q07",
        question:
          "Shape A is translated by the column vector (3 over −2) to give shape B. Then B is translated by (−5 over 4) to give shape C. Which single column vector translates A straight to C?",
        options: ["(−2 over 2)", "(8 over −6)", "(2 over −2)", "(−15 over −8)"],
        answerIndex: 0,
        explanation:
          "Two slides in a row add up. Across: 3 + (−5) = −2. Up: −2 + 4 = 2. So the vector is (−2 over 2). (8 over −6) subtracts the second vector instead of adding it. (2 over −2) is the vector from C back to A.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "Translate a single point, such as (0, 0), through both moves.",
          "(0, 0) → (3, −2) → ?",
          "The single vector is the total change from start to finish.",
        ],
        strategy: "Track one point",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q08",
        question: "A reflection maps A(1, 4) to A′(5, 4) and B(2, 1) to B′(4, 1). What is the equation of the mirror line?",
        options: ["y = 3", "x = 4", "x = 3", "x = 2"],
        answerIndex: 2,
        explanation:
          "The mirror line is exactly halfway between each point and its image. Halfway between x = 1 and x = 5 is x = 3, and halfway between x = 2 and x = 4 is also 3. Only x changes, so the line is vertical: x = 3. y = 3 has the right number but is a horizontal line. x = 4 is the distance from A to A′, not the halfway point, and x = 2 is half that distance measured from the y-axis instead of from A.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Where must the mirror line be, compared with a point and its image?",
          "Find the midpoint of A and A′.",
          "Only x changed. Is the mirror line vertical (x = …) or horizontal (y = …)?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q09",
        question: "The point (3, −1) is reflected in the line y = −x. Where is its image?",
        options: ["(−1, 3)", "(1, −3)", "(−3, 1)", "(−3, −1)"],
        answerIndex: 1,
        explanation:
          "Reflecting in y = −x swaps the coordinates AND changes both signs: (3, −1) → (1, −3). Check: the midpoint of the two points is (2, −2), which lies on y = −x. (−1, 3) is the reflection in y = x (swap only). (−3, 1) changes the signs without swapping, which is a half turn about the origin.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Find where an easy point goes first: (1, 0) reflected in y = −x.",
          "(1, 0) lands on (0, −1). What happened to the coordinates?",
          "Swap the coordinates, then change both signs.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q10",
        question: "Triangle B is the image of triangle A after a single transformation. Which description is correct?",
        diagram: `<svg viewBox="0 0 304 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (1, 1), (4, 1) and (1, 3). Triangle B has vertices (−1, 1), (−1, 4) and (−3, 1)."><rect x="0" y="0" width="304" height="200" fill="#ffffff"/><path d="M22 22V178M48 22V178M74 22V178M100 22V178M126 22V178M152 22V178M178 22V178M204 22V178M230 22V178M256 22V178M282 22V178M22 178H282M22 152H282M22 126H282M22 100H282M22 74H282M22 48H282M22 22H282" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="152" x2="282" y2="152" stroke="#334155" stroke-width="1.5"/><line x1="152" y1="178" x2="152" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="178,126 256,126 178,74" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="126,126 126,48 74,126" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="290" y="156" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="148" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−5</text><text x="48" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="74" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="100" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="126" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="178" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="204" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="230" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="256" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="282" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="148" y="182" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="148" y="130" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="148" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="148" y="78" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="148" y="52" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="148" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="148" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="204" y="113.7" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="108.7" y="105" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: [
          "Rotation 90° anticlockwise about (0, 0)",
          "Rotation 90° clockwise about (0, 0)",
          "Reflection in the y-axis",
          "Rotation 180° about (0, 0)",
        ],
        answerIndex: 0,
        explanation:
          "A's bottom side runs from (1, 1) to (4, 1), pointing right. In B the matching side runs from (−1, 1) to (−1, 4), pointing straight up. Turning 'right' into 'up' is a quarter turn anticlockwise, and a vertex check confirms it: (4, 1) → (−1, 4) using (x, y) → (−y, x). A reflection in the y-axis would keep that side horizontal, running from (−1, 1) to (−4, 1). A 90° clockwise turn would send A below the x-axis.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Find the side of A that lies along y = 1. Which way does the matching side of B point?",
          "Going from 'pointing right' to 'pointing up': is that a clockwise or an anticlockwise quarter turn?",
          "Check one vertex: where should (4, 1) go?",
        ],
        strategy: "Track one point",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q11",
        question: "The point (5, 2) is rotated 90° anticlockwise about the centre (2, 1). Where is its image?",
        options: ["(−2, 5)", "(3, −2)", "(−1, 3)", "(1, 4)"],
        answerIndex: 3,
        explanation:
          "Measure from the centre: (5, 2) is 3 right and 1 up from (2, 1). A quarter turn anticlockwise turns 'right' into 'up' and 'up' into 'left', so the move becomes 3 up and 1 left. From the centre that gives (2 − 1, 1 + 3) = (1, 4). (−2, 5) rotates about the origin instead. (3, −2) turns clockwise. (−1, 3) is the turned move without adding the centre back on.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Describe (5, 2) as a move from the centre (2, 1).",
          "It's 3 right and 1 up. After a quarter turn anticlockwise, 'right' becomes 'up' and 'up' becomes 'left'.",
          "Start at (2, 1) and make the turned move.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q12",
        question: "Triangle B is an enlargement of triangle A. What are the scale factor and the centre of enlargement?",
        diagram: `<svg viewBox="0 0 284 224" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (2, 2), (4, 2) and (2, 3). Triangle B has vertices (3, 3), (7, 3) and (3, 5)."><rect x="0" y="0" width="284" height="224" fill="#ffffff"/><path d="M22 22V202M52 22V202M82 22V202M112 22V202M142 22V202M172 22V202M202 22V202M232 22V202M262 22V202M22 202H262M22 172H262M22 142H262M22 112H262M22 82H262M22 52H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="202" x2="262" y2="202" stroke="#334155" stroke-width="1.5"/><line x1="22" y1="202" x2="22" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="82,142 142,142 82,112" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="112,112 232,112 112,52" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="206" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="18" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="52" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="82" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="112" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="142" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="172" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="202" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="232" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="262" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="18" y="176" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="18" y="146" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="18" y="116" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="18" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="18" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="18" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="18" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="100" y="139.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="148" y="100.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: [
          "Scale factor 2, centre (0, 0)",
          "Scale factor 3, centre (1, 1)",
          "Scale factor 2, centre (1, 1)",
          "Scale factor {{1/2}}, centre (1, 1)",
        ],
        answerIndex: 2,
        explanation:
          "A's base is 2 units long and B's base is 4 units, so the scale factor is 4 ÷ 2 = 2 (B is bigger, so it can't be {{1/2}}). Join matching vertices: (2, 2) to (3, 3), (4, 2) to (7, 3) and (2, 3) to (3, 5). Extended backwards, all three lines meet at (1, 1). From (0, 0), scale factor 2 would send (2, 2) to (4, 4), which is not a vertex of B. Scale factor 3 comes from counting the 3 squares across from (4, 2) to (7, 3) instead of comparing matching lengths.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Compare the base of A with the base of B.",
          "Join each vertex of A to the matching vertex of B and extend the lines backwards.",
          "Where do those three lines cross?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q13",
        question:
          "A photo 6 cm by 4 cm is enlarged so that its longer side becomes 18 cm. How long is the shorter side of the enlarged photo?",
        options: ["16 cm", "12 cm", "27 cm", "8 cm"],
        answerIndex: 1,
        explanation:
          "The scale factor is 18 ÷ 6 = 3, so the shorter side becomes 4 × 3 = 12 cm. 16 cm adds 12 cm to the shorter side as well, which would stretch the photo out of shape. 27 cm can't be right, because the shorter side can't be longer than the 18 cm side; it comes from 18 × {{6/4}}, using the ratio of the sides the wrong way round.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Which pair of matching sides do you know both lengths for?",
          "Find the scale factor from the longer sides.",
          "Use the same scale factor on the shorter side.",
        ],
        strategy: "Find the scale factor first",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q14",
        question:
          "This table shows the vertices of a triangle and of its image after a single transformation.\n\n| Object | Image |\n|---|---|\n| (1, 2) | (2, 1) |\n| (3, 2) | (2, 3) |\n| (3, 5) | (5, 3) |\n\nWhich transformation is it?",
        options: [
          "Reflection in the line y = x",
          "Translation by the column vector (1 over −1)",
          "Rotation 90° clockwise about (0, 0)",
          "Reflection in the line y = −x",
        ],
        answerIndex: 0,
        explanation:
          "Every row has its coordinates swapped, which is exactly what a reflection in y = x does. Translation by (1 over −1) works for the first row, (1, 2) → (2, 1), but it would send (3, 2) to (4, 1), so it fails: always check every vertex, not just one. A 90° clockwise turn about the origin would send (1, 2) to (2, −1), and a reflection in y = −x would send it to (−2, −1).",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Look at what happens to the two numbers in each row.",
          "Test each option on ALL three rows, not just the first one.",
          "Which transformation swaps x and y?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q15",
        question: "Triangle T has sides 3 cm, 4 cm and 5 cm. Which triangle is similar to T but NOT congruent to it?",
        options: ["3 cm, 4 cm, 5 cm", "5 cm, 6 cm, 7 cm", "4 cm, 5 cm, 6 cm", "6 cm, 8 cm, 10 cm"],
        answerIndex: 3,
        explanation:
          "Similar shapes have every length multiplied by the same scale factor: 3 × 2 = 6, 4 × 2 = 8 and 5 × 2 = 10. 5 cm, 6 cm, 7 cm adds 2 to each side instead of multiplying, which changes the shape (its angles are different). 3 cm, 4 cm, 5 cm is congruent to T, so it fails the 'not congruent' part.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Similar means one shape is an enlargement of the other.",
          "Is there one number you can multiply all three sides of T by?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q16",
        question:
          "Arjun flies a kite on a 17 m string. The kite is directly above a point that is 8 m from his hand, measured horizontally. Treating the string as straight, how high is the kite above his hand?",
        options: ["9 m", "225 m", "15 m", "{{sqrt(353)}} m"],
        answerIndex: 2,
        explanation:
          "The string is the hypotenuse (it is opposite the right angle), so subtract the squares: {{17^2 - 8^2 = 289 - 64 = 225}}, and {{sqrt(225) = 15}} m. {{sqrt(353)}} m (about 18.8 m) adds the squares, but the height must be shorter than the 17 m string. 9 m is 17 − 8, subtracting the lengths instead of their squares.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Sketch it. Where is the right angle, and which side is the hypotenuse?",
          "When you know the hypotenuse, do you add or subtract the squares?",
          "{{17^2 - 8^2}} gives the square of the height.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q17",
        question:
          "Two squares of this 4 × 4 grid are shaded. What is the smallest number of EXTRA squares you must shade so that the pattern has rotational symmetry of order 4 about the centre of the grid?",
        diagram: `<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 4 by 4 grid of squares. The top-left corner square and the square immediately to its right are shaded."><rect x="0" y="0" width="200" height="200" fill="#ffffff"/><rect x="20" y="20" width="40" height="40" fill="#93c5fd"/><rect x="60" y="20" width="40" height="40" fill="#93c5fd"/><path d="M20 20V180M20 20H180M60 20V180M20 60H180M100 20V180M20 100H180M140 20V180M20 140H180M180 20V180M20 180H180" stroke="#1f2937" stroke-width="2" fill="none"/></svg>`,
        options: ["6", "2", "8", "4"],
        answerIndex: 0,
        explanation:
          "A quarter turn about the centre of the grid moves every square to a different square, so the shaded squares must come in sets of 4 that swap round. The shaded corner needs the other 3 corners. The square next to it needs 3 partners too: one in the matching position along each of the other three edges. That's 3 + 3 = 6 extra. 2 extra squares in the half-turn positions only give order 2 about the centre. (Shading the 2 squares underneath makes a 2 × 2 block, which has order 4 about its own centre, but not about the centre of the grid.) 8 is the total number of shaded squares, not the number of extra ones.",
        difficulty: "challenge",
        guideRef: "symmetry",
        hints: [
          "Under a quarter turn about the centre of the grid, where does the top-left corner square go? And after another quarter turn?",
          "Each shaded square must belong to a group of 4 squares that swap places under quarter turns.",
          "Count the partners each shaded square still needs.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q18",
        question:
          "A shape is reflected in the line x = 3, and then its image is reflected in the line x = 7. Which single transformation has the same effect?",
        options: [
          "Translation by the column vector (4 over 0)",
          "Translation by the column vector (8 over 0)",
          "Translation by the column vector (−8 over 0)",
          "Reflection in the line x = 5",
        ],
        answerIndex: 1,
        explanation:
          "Follow some points. (3, 1) is on the first mirror so it stays put, then it reflects in x = 7 to (11, 1): it moved 8 right. (0, 1) → (6, 1) → (8, 1): again 8 right. Reflecting in two parallel mirrors is a translation by twice the gap between them: 2 × 4 = 8. (4 over 0) uses the gap without doubling it, and (−8 over 0) is what happens if you use the mirrors in the other order. A single reflection in x = 5 would flip the shape, but two flips cancel each other out.",
        difficulty: "challenge",
        guideRef: "reflection",
        hints: [
          "Pick a point on the line x = 3 and follow it through both reflections.",
          "Now try a different point, such as (0, 1). Did it move by the same amount?",
          "Does the final image face the same way as the original shape?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q19",
        question: "A rotation of 90° anticlockwise maps the point A(6, 2) to A′(2, 6). Where is the centre of rotation?",
        options: ["(0, 0)", "(4, 4)", "(6, 6)", "(2, 2)"],
        answerIndex: 3,
        explanation:
          "From (2, 2), A is 4 units right. A quarter turn anticlockwise turns that into 4 units up, which lands on (2, 6). (0, 0) is the same distance from A and A′, but the angle there isn't 90°: turning (6, 2) a quarter turn anticlockwise about the origin gives (−2, 6). (4, 4) is the midpoint of A and A′, which is only the centre for a 180° turn. (6, 6) is the centre for a clockwise quarter turn, not an anticlockwise one.",
        difficulty: "challenge",
        guideRef: "rotation",
        hints: [
          "The centre must be the same distance from A and A′, but that isn't enough. Test each option.",
          "For each possible centre, describe A as a move from the centre, then turn that move a quarter turn anticlockwise.",
          "From (2, 2), A is 4 right. After a quarter turn anticlockwise, where does that move point?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m2-q20",
        question:
          "A rectangle 2 cm by 5 cm is enlarged by scale factor 3. Wei Ling says, \"The area is multiplied by 3 too.\" What is the actual area of the image?",
        options: ["30 cm²", "60 cm²", "90 cm²", "40 cm²"],
        answerIndex: 2,
        explanation:
          "The image is 6 cm by 15 cm, so its area is 6 × 15 = 90 cm². The original area is 10 cm², so the area was multiplied by 9 = 3 × 3, because the length AND the width are both tripled. 30 cm² is Wei Ling's claim (only × 3). 40 cm² comes from adding 3 cm to each side (5 cm by 8 cm).",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Don't trust the claim: work out the new length and width first.",
          "Find the area of the image, then compare it with the original area of 10 cm².",
          "How many times bigger is it? Can you explain why, using the length and the width?",
        ],
        strategy: "Test the claim",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 3
  // ===========================================================================
  {
    id: "transformations-pythagoras-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q01",
        question: "How many lines of symmetry does a rhombus that is not a square have?",
        options: ["4", "0", "1", "2"],
        answerIndex: 3,
        explanation:
          "A rhombus folds onto itself along both of its diagonals, so it has 2 lines of symmetry. The lines through the midpoints of opposite sides don't work for a rhombus (those are a rectangle's lines). It only has 4 lines when it is also a square.",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["Imagine folding a diamond shape. Which folds make the corners meet?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q02",
        question: "Which statement about a translation is always true?",
        options: [
          "The image is a mirror image of the object",
          "The image is turned to face a different way",
          "The image is congruent to the object and faces the same way",
          "The image is bigger if the vector is longer",
        ],
        answerIndex: 2,
        explanation:
          "A translation slides every point the same distance in the same direction, so nothing turns or flips and no lengths change: the image is congruent and faces the same way. A longer vector only moves the shape further; it doesn't make it bigger. Mirror images come from reflections, and turning comes from rotations.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["Picture sliding a book across a table without turning it."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q03",
        question: "A point does not move when it is reflected in the line y = x. Which point could it be?",
        options: ["(4, 0)", "(4, 4)", "(0, 4)", "(4, −4)"],
        answerIndex: 1,
        explanation:
          "Points ON the mirror line stay where they are. On y = x the two coordinates are equal, so (4, 4) is unchanged: swapping 4 and 4 changes nothing. (4, 0) and (0, 4) swap places with each other. (4, −4) lies on the line y = −x, not y = x, and it moves to (−4, 4).",
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["Which points does a mirror leave exactly where they are?"],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q04",
        question: "The point (5, 2) is rotated 180° about the origin. Where is its image?",
        options: ["(−5, −2)", "(5, −2)", "(−5, 2)", "(−2, 5)"],
        answerIndex: 0,
        explanation:
          "A half turn about the origin sends a point to the opposite side of the origin, so both coordinates change sign: (−5, −2). The origin is the midpoint of the point and its image. (5, −2) is a reflection in the x-axis, and (−2, 5) is only a quarter turn (anticlockwise).",
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["After a half turn, the origin is exactly halfway between the point and its image."],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q05",
        question: "A triangle is enlarged by scale factor 3. Which of these stays the same?",
        options: ["The side lengths", "The perimeter", "The area", "The angles"],
        answerIndex: 3,
        explanation:
          "An enlargement keeps the shape, so every angle stays the same. The side lengths and the perimeter are multiplied by 3, and the area is multiplied by 3 × 3 = 9.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["An enlargement changes the size but keeps the shape. What decides the shape of a triangle?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q06",
        question:
          "This logo is made from three identical blades. What is its order of rotational symmetry, and how many lines of symmetry does it have?",
        diagram: `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A logo made of three identical lopsided blades arranged evenly around a central circle, each blade swept to one side."><rect x="0" y="0" width="320" height="220" fill="#ffffff"/><polygon points="150,101 170,101 204,31 164,45" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="177.1,113.3 167.1,130.7 210.7,195.1 218.6,153.5" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="152.9,130.7 142.9,113.3 65.3,118.9 97.4,146.5" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><circle cx="160" cy="115" r="16" fill="#fde68a" stroke="#1f2937" stroke-width="2"/></svg>`,
        options: [
          "Order 3 and 3 lines of symmetry",
          "Order 3 and 0 lines of symmetry",
          "Order 6 and 0 lines of symmetry",
          "Order 1 and 0 lines of symmetry",
        ],
        answerIndex: 1,
        explanation:
          "Turning by 120° moves each blade onto the next one, so the logo fits onto itself 3 times in a full turn: order 3. But each blade is lopsided, so any fold would need to turn a blade into its mirror image, which doesn't match: 0 lines. Order 3 with 3 lines would need symmetrical blades: the order and the number of lines don't have to be equal. Order 6 counts the gaps as well as the blades.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "How many times does the logo fit onto itself during one full turn?",
          "Now look at a single blade. Is it symmetrical? What would a fold do to it?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q07",
        question: "Triangle A has been translated to triangle B. Which column vector describes the translation?",
        diagram: `<svg viewBox="0 0 296 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (−3, 1), (−1, 1) and (−3, 4). Triangle B has vertices (2, −1), (4, −1) and (2, 2)."><rect x="0" y="0" width="296" height="240" fill="#ffffff"/><path d="M22 22V218M50 22V218M78 22V218M106 22V218M134 22V218M162 22V218M190 22V218M218 22V218M246 22V218M274 22V218M22 218H274M22 190H274M22 162H274M22 134H274M22 106H274M22 78H274M22 50H274M22 22H274" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="162" x2="274" y2="162" stroke="#334155" stroke-width="1.5"/><line x1="134" y1="218" x2="134" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="50,134 106,134 50,50" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="190,190 246,190 190,106" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="282" y="166" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="130" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="50" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="78" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="106" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="162" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="190" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="218" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="246" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="274" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="130" y="222" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="130" y="194" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="130" y="138" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="130" y="110" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="130" y="82" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="130" y="54" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="130" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="130" y="175" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="66.8" y="119.4" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="202.6" y="150.2" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: ["(−5 over 2)", "(3 over −2)", "(5 over −2)", "(−2 over 5)"],
        answerIndex: 2,
        explanation:
          "Follow one vertex: the right-angle corner moves from (−3, 1) to (2, −1), which is 5 right and 2 down: (5 over −2). (3 over −2) counts the gap between the shapes (from A's right-hand corner to B's left-hand corner) instead of following one vertex to its own image. (−5 over 2) is the journey back from B to A.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "Choose one vertex of A and find the matching vertex of B.",
          "Count how far right and how far down that vertex moved.",
          "Down is negative in the bottom number.",
        ],
        strategy: "Track one point",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q08",
        question: "Triangle B is the reflection of triangle A. What is the equation of the mirror line?",
        diagram: `<svg viewBox="0 0 284 284" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (1, 2), (4, 2) and (1, 4). Triangle B has vertices (−2, −1), (−2, −4) and (−4, −1)."><rect x="0" y="0" width="284" height="284" fill="#ffffff"/><path d="M22 22V262M46 22V262M70 22V262M94 22V262M118 22V262M142 22V262M166 22V262M190 22V262M214 22V262M238 22V262M262 22V262M22 262H262M22 238H262M22 214H262M22 190H262M22 166H262M22 142H262M22 118H262M22 94H262M22 70H262M22 46H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="142" x2="262" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="262" x2="142" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="166,94 238,94 166,46" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="94,166 94,238 46,166" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="146" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="138" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−5</text><text x="46" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="70" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="94" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="118" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="166" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="190" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="214" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="238" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="262" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="138" y="266" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−5</text><text x="138" y="242" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="138" y="218" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="138" y="194" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="138" y="170" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="138" y="122" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="138" y="98" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="138" y="74" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="138" y="50" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="138" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="138" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="190" y="83" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="78" y="195" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: ["y = −x", "y = x", "y = 0 (the x-axis)", "x = 0 (the y-axis)"],
        answerIndex: 0,
        explanation:
          "Match the right-angle corners: (1, 2) ↔ (−2, −1). Their midpoint is (−0.5, 0.5), which lies on y = −x. The same works for (4, 2) ↔ (−2, −4), with midpoint (1, −1). Reflecting in y = −x swaps and negates the coordinates: (1, 2) → (−2, −1). Reflecting in y = x would only swap them, giving (2, 1), still in the top-right quarter of the grid. The x-axis would send (1, 2) to (1, −2).",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Pair a vertex of A with its matching vertex of B. The right-angle corners are easiest.",
          "Find the midpoint of that pair. The mirror line must pass through it.",
          "Which line passes through the midpoint of every pair?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q09",
        question:
          "Priya rotates the point (2, 5) by 90° anticlockwise about the origin and gets (5, −2). What was her mistake?",
        options: [
          "She only needed to swap the coordinates: (5, 2)",
          "She turned 180°; the image should be (−2, −5)",
          "There was no mistake",
          "She turned clockwise; the image should be (−5, 2)",
        ],
        answerIndex: 3,
        explanation:
          "(2, 5) is in the top-right quarter of the grid. A quarter turn anticlockwise moves it into the top-left quarter, so the new x-coordinate must be negative: (−5, 2), using (x, y) → (−y, x). Priya's (5, −2) is in the bottom-right quarter, which is where a clockwise turn goes. Just swapping to (5, 2) is a reflection in y = x, not a rotation.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Which quarter of the grid is (2, 5) in? Which quarter is a quarter turn anticlockwise from there?",
          "Is Priya's answer in that quarter?",
          "Use (x, y) → (−y, x) for 90° anticlockwise about the origin.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q10",
        question: "The point (4, −1) is rotated 270° clockwise about the origin. Where is its image?",
        options: ["(−1, −4)", "(1, 4)", "(−4, 1)", "(4, 1)"],
        answerIndex: 1,
        explanation:
          "270° clockwise ends in the same place as 90° anticlockwise (360° − 270° = 90°). A quarter turn anticlockwise takes (4, −1) to (1, 4), using (x, y) → (−y, x). (−1, −4) is only 90° clockwise, and (−4, 1) is a half turn.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Is there a shorter turn, the other way round, that ends in the same place?",
          "270° clockwise is the same as 90° anticlockwise.",
          "(4, −1) is in the bottom-right quarter. A quarter turn anticlockwise moves it into which quarter?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q11",
        question:
          "A triangle has vertices (1, 2), (3, 2) and (1, 3). It is enlarged by scale factor 2 with centre (0, 0). What are the vertices of the image?",
        options: [
          "(3, 4), (5, 4), (3, 5)",
          "(2, 2), (6, 2), (2, 3)",
          "(2, 4), (6, 4), (2, 6)",
          "(1, 2), (5, 2), (1, 4)",
        ],
        answerIndex: 2,
        explanation:
          "With centre (0, 0), a point's coordinates are its moves from the centre, so doubling the distances doubles the coordinates: (2, 4), (6, 4), (2, 6). (3, 4), (5, 4), (3, 5) adds 2 instead of multiplying. (1, 2), (5, 2), (1, 4) is the right size, but it is enlarged from the vertex (1, 2) instead of from the origin.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "When the centre is (0, 0), how are a point's coordinates related to its moves from the centre?",
          "Multiply each move from the centre by 2.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q12",
        question:
          "A projector enlarges a picture from a slide onto a screen. A tree on the slide is 4 cm tall, and on the screen it is 1.2 m tall. What is the scale factor of the enlargement?",
        options: ["30", "3", "116", "{{1/30}}"],
        answerIndex: 0,
        explanation:
          "Use the same units for both: 1.2 m = 120 cm, and 120 ÷ 4 = 30. A scale factor of 3 comes from 12 ÷ 4, ignoring the units. 116 is the difference 120 − 4, but scale factors multiply rather than add. {{1/30}} is the scale factor from the screen back to the slide.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Are both heights in the same units?",
          "Convert 1.2 m into centimetres.",
          "Scale factor = image length ÷ object length.",
        ],
        strategy: "Convert to the same units",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q13",
        question: "Shape A is rotated 90° clockwise about (1, 2) to give shape B. Which single transformation maps B back onto A?",
        options: [
          "Rotation 90° clockwise about (1, 2)",
          "Rotation 90° anticlockwise about (2, 1)",
          "Reflection in the line x = 1",
          "Rotation 90° anticlockwise about (1, 2)",
        ],
        answerIndex: 3,
        explanation:
          "To undo a turn, turn back by the same angle the other way, about the same centre: 90° anticlockwise about (1, 2). Another 90° clockwise turn would make a half turn altogether instead of undoing it. (2, 1) is a different point, but the centre must stay at (1, 2).",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: ["How do you undo a quarter turn clockwise?", "Does the centre change when you undo the turn?"],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q14",
        question: "Which shape is a reflection of shape A?",
        diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Squared grid with five shapes. Shape A is an L shape: a column of three squares with one extra square to the right of the bottom square. Shapes P, Q, R and S are other shapes made from squares."><rect x="0" y="0" width="400" height="240" fill="#ffffff"/><path d="M10 10V230M30 10V230M50 10V230M70 10V230M90 10V230M110 10V230M130 10V230M150 10V230M170 10V230M190 10V230M210 10V230M230 10V230M250 10V230M270 10V230M290 10V230M310 10V230M330 10V230M350 10V230M370 10V230M390 10V230M10 10H390M10 30H390M10 50H390M10 70H390M10 90H390M10 110H390M10 130H390M10 150H390M10 170H390M10 190H390M10 210H390M10 230H390" stroke="#e2e8f0" stroke-width="1" fill="none"/><polygon points="30,30 50,30 50,70 70,70 70,90 30,90" fill="#bae6fd" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><text x="40" y="65" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><polygon points="190,30 170,30 170,70 150,70 150,90 190,90" fill="#fde68a" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><text x="180" y="65" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">R</text><polygon points="250,30 310,30 310,50 270,50 270,70 250,70" fill="#bbf7d0" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><text x="280" y="45" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Q</text><polygon points="110,130 130,130 130,170 150,170 150,190 110,190" fill="#fecaca" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><text x="120" y="165" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">P</text><polygon points="270,90 310,90 310,170 350,170 350,210 270,210" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><text x="290" y="155" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">S</text></svg>`,
        options: ["Shape Q", "Shape R", "Shape P", "Shape S"],
        answerIndex: 1,
        explanation:
          "A is an L with its foot pointing right. R is its mirror image, with the foot pointing left, and no amount of turning can make A look like that: only a flip can. Q looks different from A, but it is A turned a quarter turn clockwise, so it is a rotation. P is a translation (same way round, just slid), and S is an enlargement (twice the size).",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "A reflection flips a shape over. Rotations and translations never flip it.",
          "Imagine turning each shape until its long bar stands upright like A's. Which way does its foot point?",
          "Which shape can only be matched to A by flipping it over?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q15",
        question:
          "In a board game, a counter is translated by the column vector (2 over 3) on every turn. It starts at (−5, −7). After how many turns will it be at (3, 5)?",
        options: ["4", "8", "12", "20"],
        answerIndex: 0,
        explanation:
          "The counter needs to move 3 − (−5) = 8 across and 5 − (−7) = 12 up. Each turn moves it 2 across and 3 up, so it takes 8 ÷ 2 = 4 turns, and 12 ÷ 3 = 4 confirms it. 8 and 12 are the total distances, not the numbers of turns, and 20 adds those distances together.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "How far across and how far up must the counter travel altogether?",
          "Careful with the negatives: 3 − (−5) and 5 − (−7).",
          "How many moves of 2 make the distance across? Does the up direction agree?",
        ],
        strategy: "Break it into components",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q16",
        question: "What is the straight-line distance between the points (1, 2) and (4, 6)?",
        options: ["7 units", "25 units", "5 units", "{{sqrt(7)}} units"],
        answerIndex: 2,
        explanation:
          "Draw a right-angled triangle under the line: across 4 − 1 = 3 and up 6 − 2 = 4. The distance is the hypotenuse: {{3^2 + 4^2 = 25}}, so it is {{sqrt(25) = 5}} units. 7 units walks along the grid lines (3 + 4), but the direct route is shorter. 25 units forgets the square root.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Make a right-angled triangle whose hypotenuse is the line between the two points.",
          "The other two sides are the distance across and the distance up.",
          "Use {{a^2 + b^2 = c^2}}.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q17",
        question:
          "Exactly 3 squares of a 3 × 3 grid are to be shaded so that the pattern has rotational symmetry of order 2 about the centre of the grid. How many different patterns are possible? (Patterns that are turns or reflections of each other count as different.)",
        options: ["0, because an odd number of squares can't have this symmetry", "2", "4", "8"],
        answerIndex: 2,
        explanation:
          "A half turn swaps the squares in pairs: each corner with the opposite corner, and each edge square with the opposite edge square. Only the centre square stays put. With 3 shaded squares (an odd number), one of them can't be in a pair, so the centre must be shaded, plus one opposite pair. There are 4 pairs (two diagonal pairs of corners, the top and bottom pair, the left and right pair), so there are 4 patterns. The answer 0 forgets the centre square, which pairs with itself. 2 counts the types of pair (corners or edges) instead of the actual patterns.",
        difficulty: "challenge",
        guideRef: "symmetry",
        hints: [
          "Under a half turn about the centre, where does each square go? Which square goes to itself?",
          "Shaded squares must come in swapping pairs, except possibly one. Which one?",
          "With 3 shaded squares, the centre must be one of them. How many opposite pairs are there?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q18",
        question:
          "The point P(2, 7) is reflected in the line x = k. The image is then translated by the column vector (6 over 0) and lands back on P. What is k?",
        options: ["5", "−4", "−2", "−1"],
        answerIndex: 3,
        explanation:
          "Work backwards. The translation moved the point 6 right to reach (2, 7), so just before it the point was at (−4, 7). That is the reflection of P, so the mirror line is halfway between x = 2 and x = −4: {{k = (2 + (-4))/2 = -1}}. −4 is where the reflected point is, not the mirror line. −2 halves −4 instead of finding the midpoint. 5 comes from doing the steps in the wrong order (translating P first, to (8, 7)).",
        difficulty: "challenge",
        guideRef: "reflection",
        hints: [
          "Work backwards from the end: where was the point just before the translation?",
          "Undo the translation by moving 6 left from P.",
          "The mirror line is exactly halfway between P and its reflection.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q19",
        question:
          "Always, sometimes or never true? \"If a triangle is enlarged by scale factor 2 from a centre inside the triangle, the original triangle fits completely inside its image.\"",
        options: [
          "Always true",
          "Sometimes true",
          "Never true",
          "Only true if the centre is exactly in the middle of the triangle",
        ],
        answerIndex: 0,
        explanation:
          "Always true. Take any point Q of the original triangle. The point M halfway between the centre and Q is also in the triangle, because a triangle has no dents and both the centre and Q are in it. Scale factor 2 sends M exactly onto Q. So every point of the original triangle is the image of a point of the triangle, which means it lies inside the image. The centre doesn't have to be in the middle: any inside point works. 'Sometimes' is tempting if you picture the image sliding off to one side, but that only happens when the centre is outside the triangle.",
        difficulty: "challenge",
        guideRef: "enlargement",
        hints: [
          "Try it: sketch a triangle, choose a centre close to one corner, and enlarge by scale factor 2.",
          "Pick any point Q in the original triangle. Which point M is sent onto Q by the enlargement?",
          "M is halfway between the centre and Q. Is M inside the original triangle?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m3-q20",
        question: "Which single transformations map triangle A onto triangle B?",
        diagram: `<svg viewBox="0 0 284 194" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (1, 1), (3, 1) and (2, 3). Triangle B has vertices (−3, 1), (−1, 1) and (−2, 3)."><rect x="0" y="0" width="284" height="194" fill="#ffffff"/><path d="M22 22V172M52 22V172M82 22V172M112 22V172M142 22V172M172 22V172M202 22V172M232 22V172M262 22V172M22 172H262M22 142H262M22 112H262M22 82H262M22 52H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="142" x2="262" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="172" x2="142" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="172,112 232,112 202,52" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="52,112 112,112 82,52" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="146" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="138" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="52" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="82" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="112" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="172" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="202" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="232" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="262" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="138" y="176" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="138" y="116" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="138" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="138" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="138" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="138" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="202" y="97" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="82" y="97" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: [
          "Only a reflection in the y-axis",
          "Both a reflection in the y-axis and a translation by the column vector (−4 over 0)",
          "Only a translation by the column vector (−4 over 0)",
          "Only a rotation of 180° about (0, 0)",
        ],
        answerIndex: 1,
        explanation:
          "Triangle A is isosceles, so it is symmetrical about its own vertical centre line. Reflecting in the y-axis sends (1, 1) → (−1, 1), (3, 1) → (−3, 1) and (2, 3) → (−2, 3): exactly B. Translating by (−4 over 0) sends (1, 1) → (−3, 1), (3, 1) → (−1, 1) and (2, 3) → (−2, 3): also exactly B. A symmetrical shape can have more than one correct description! A half turn about (0, 0) would send the top vertex (2, 3) to (−2, −3), below the x-axis.",
        difficulty: "challenge",
        guideRef: "describing-transformations",
        hints: [
          "Test each transformation on all three vertices of A.",
          "Try the reflection first, then the translation by (−4 over 0).",
          "Could two different transformations give the same image? What is special about A's shape?",
        ],
        strategy: "Check by substituting",
      },
    ],
  },

  // ===========================================================================
  // MCQ PAPER 4
  // ===========================================================================
  {
    id: "transformations-pythagoras-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q01",
        question: "Which of these shapes has exactly one line of symmetry?",
        options: [
          "Kite",
          "Rectangle (not a square)",
          "Parallelogram with no right angles and unequal sides",
          "Equilateral triangle",
        ],
        answerIndex: 0,
        explanation:
          "A kite has one line of symmetry, through the corner where its two short sides meet and the corner where its two long sides meet. A rectangle has 2 lines and an equilateral triangle has 3. A parallelogram like this one has none: its diagonals look like mirror lines, but folding along them doesn't make the halves match.",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["Imagine folding each shape. How many different folds make the two halves match exactly?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q02",
        question: "The point (−1, 4) is translated by the column vector (−3 over −5). Where does it land?",
        options: ["(2, 9)", "(−4, −1)", "(−6, 1)", "(−4, 9)"],
        answerIndex: 1,
        explanation:
          "Add the top number to x and the bottom number to y: (−1 + (−3), 4 + (−5)) = (−4, −1). (2, 9) subtracts the vector instead of adding it, and (−6, 1) adds the top number to y and the bottom number to x.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["The vector means 3 left and 5 down. Start at (−1, 4) and move."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q03",
        question: "A shape is reflected in a mirror line. What is different about the image?",
        options: [
          "Its side lengths",
          "Its angles",
          "Its area",
          "The way it faces: it is a mirror image",
        ],
        answerIndex: 3,
        explanation:
          "A reflection keeps every length and every angle, so the area is unchanged too: the image is congruent. What changes is the way it faces, called its orientation. It is flipped over, like your left hand compared with your right hand.",
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["Hold your right hand up to a mirror. What is the same about the reflection, and what is different?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q04",
        question: "The minute hand of a clock moves from pointing at 12 to pointing at 3. Which rotation describes this?",
        options: [
          "90° anticlockwise about the centre of the clock",
          "180° clockwise about the centre of the clock",
          "90° clockwise about the centre of the clock",
          "3° clockwise about the tip of the hand",
        ],
        answerIndex: 2,
        explanation:
          "From 12 to 3 is a quarter of the way round the clock face, in the direction clock hands go (clockwise). A quarter turn is 360° ÷ 4 = 90°. The hand turns about the centre of the clock, not about its tip. 3° mixes up the number on the clock face with the angle.",
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["What fraction of a full turn is it from 12 round to 3?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q05",
        question: "A shape with a perimeter of 9 cm is enlarged by scale factor 4. What is the perimeter of the image?",
        options: ["13 cm", "36 cm", "144 cm", "9 cm"],
        answerIndex: 1,
        explanation:
          "Every side is multiplied by 4, so their total is multiplied by 4 too: 9 × 4 = 36 cm. 13 cm adds 4 instead of multiplying. 144 cm multiplies by 4 × 4 = 16, which is what happens to the area, not to a length like the perimeter.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["The perimeter is a length. What happens to every length in an enlargement?"],
        strategy: "Multiply every length",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q06",
        question:
          "Always, sometimes or never true? \"A shape with rotational symmetry of order 2 also has at least one line of symmetry.\"",
        options: [
          "Sometimes true",
          "Always true",
          "Never true",
          "Always true for quadrilaterals, but never for other shapes",
        ],
        answerIndex: 0,
        explanation:
          "Sometimes true. A rectangle and the letter H have order 2 and two lines of symmetry, so it can be true. But the letters S, N and Z have order 2 and no lines of symmetry at all, so it isn't always true. One counterexample is enough to rule out 'always'. A parallelogram with no right angles and unequal sides is a quadrilateral counterexample too, which also rules out the claim about quadrilaterals.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Find a shape where the statement is true. Then hunt for one where it is false.",
          "Think about the letters S, N and Z. What happens after a half turn? Does any fold work?",
        ],
        strategy: "Look for a counterexample",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q07",
        question:
          "Siti works out the column vector that translates A(4, −2) to B(1, 3). She writes (3 over −5). What has she done wrong?",
        options: [
          "She swapped the top and bottom numbers; it should be (−5 over 3)",
          "Nothing; (3 over −5) is correct",
          "She should have added the coordinates; it should be (5 over 1)",
          "She subtracted the wrong way round; it should be (−3 over 5)",
        ],
        answerIndex: 3,
        explanation:
          "The vector is the change from A to B, which is B minus A. Across: 1 − 4 = −3. Up: 3 − (−2) = 5. So it should be (−3 over 5). Siti worked out A minus B, which gives (3 over −5), the vector from B back to A. A quick check: B is to the left of A, so the top number must be negative.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "Is B to the left or right of A? Above or below it?",
          "Work out finish minus start for each coordinate.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q08",
        question: "The point (−1, −4) is reflected in the line y = −1. Where is its image?",
        options: ["(−1, 4)", "(−1, −4), because it does not move", "(−1, 2)", "(−1, 3)"],
        answerIndex: 2,
        explanation:
          "y = −1 is a horizontal line. The point is 3 units below it (from −4 up to −1), so the image is 3 units above it: y = −1 + 3 = 2, giving (−1, 2). (−1, 4) reflects in the x-axis instead. Saying it doesn't move mixes up y = −1 with x = −1: the point does lie on the vertical line x = −1, but not on y = −1. (−1, 3) counts the 3 units up from the x-axis instead of from the mirror line.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Sketch the line y = −1. Is it horizontal or vertical?",
          "How far is (−1, −4) from the line?",
          "Go the same distance on the other side of the line.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q09",
        question:
          "A shape is translated. This table shows some of its vertices and their images, but one entry is missing.\n\n| Object | Image |\n|---|---|\n| (1, 2) | (−3, 5) |\n| (4, 2) | (0, 5) |\n| (2, −1) | ? |\n\nWhat is the missing image?",
        options: ["(6, −4)", "(−2, 2)", "(−2, −4)", "(−2, 5)"],
        answerIndex: 1,
        explanation:
          "Use a complete row to find the translation: (1, 2) → (−3, 5) is 4 left and 3 up, the vector (−4 over 3). The row (4, 2) → (0, 5) agrees. So (2, −1) → (2 − 4, −1 + 3) = (−2, 2). (−2, 5) copies the 5 from the other rows, but those points started at y = 2 and this one starts at y = −1. (6, −4) moves the wrong way, subtracting the vector.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "Use a complete row to find the translation vector.",
          "How far across and how far up does (1, 2) move?",
          "Apply exactly the same move to (2, −1).",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q10",
        question: "Triangle B is the image of triangle A after a single transformation. Which description is correct?",
        diagram: `<svg viewBox="0 0 296 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (2, 1), (5, 1) and (2, 3). Triangle B has vertices (1, 2), (1, 5) and (−1, 2)."><rect x="0" y="0" width="296" height="240" fill="#ffffff"/><path d="M22 22V218M50 22V218M78 22V218M106 22V218M134 22V218M162 22V218M190 22V218M218 22V218M246 22V218M274 22V218M22 218H274M22 190H274M22 162H274M22 134H274M22 106H274M22 78H274M22 50H274M22 22H274" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="190" x2="274" y2="190" stroke="#334155" stroke-width="1.5"/><line x1="106" y1="218" x2="106" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="162,162 246,162 162,106" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="134,134 134,50 78,134" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="282" y="194" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="102" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="50" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="78" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="134" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="162" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="190" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="218" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="246" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="274" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="102" y="222" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="102" y="166" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="102" y="138" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="102" y="110" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="102" y="82" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="102" y="54" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="102" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="102" y="203" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="187.2" y="151.6" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="118.6" y="118" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        options: [
          "Rotation 90° clockwise about (1, 1)",
          "Rotation 90° anticlockwise about (0, 0)",
          "Reflection in the line y = x",
          "Rotation 90° anticlockwise about (1, 1)",
        ],
        answerIndex: 3,
        explanation:
          "From (1, 1), the vertex (5, 1) is 4 right. A quarter turn anticlockwise makes that 4 up, landing on (1, 5), a vertex of B. The other vertices work too: (2, 1) → (1, 2) and (2, 3) → (−1, 2). Reflection in y = x is tempting because (2, 1) → (1, 2) and (5, 1) → (1, 5) both fit, but it sends (2, 3) to (3, 2), not (−1, 2). Rotating anticlockwise about (0, 0) gives the right direction but lands one square too far left: (5, 1) → (−1, 5).",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Which way has A's bottom side, from (2, 1) to (5, 1), turned?",
          "Test each option on all three vertices. One option fits two vertices but not the third.",
          "Measure each vertex of A as a move from (1, 1), then turn that move.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q11",
        question:
          "A shape is rotated 90° clockwise about a point C, and then its image is rotated 180° clockwise about the same point C. Which single rotation about C has the same effect?",
        options: ["90° anticlockwise", "90° clockwise", "270° anticlockwise", "180° clockwise"],
        answerIndex: 0,
        explanation:
          "Turns about the same centre add up: 90° + 180° = 270° clockwise. Turning 270° clockwise ends in the same place as turning 360° − 270° = 90° anticlockwise. 270° anticlockwise is the right size of turn in the wrong direction; it is the same as 90° clockwise.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Rotations about the same centre combine by adding the angles.",
          "Can a 270° clockwise turn be written as a smaller turn the other way?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q12",
        question:
          "A triangle has vertices (4, 2), (8, 2) and (4, 6). It is enlarged by scale factor {{1/2}} with centre (0, 0). What are the vertices of the image?",
        options: [
          "(8, 4), (16, 4), (8, 12)",
          "(3.5, 1.5), (7.5, 1.5), (3.5, 5.5)",
          "(2, 1), (4, 1), (2, 3)",
          "(4, 2), (6, 2), (4, 4)",
        ],
        answerIndex: 2,
        explanation:
          "A scale factor of {{1/2}} halves every distance from the centre, so with centre (0, 0) you halve the coordinates: (2, 1), (4, 1), (2, 3). The image is smaller and closer to the centre: an 'enlargement' with a fractional scale factor shrinks the shape. (8, 4), (16, 4), (8, 12) doubles instead of halving. (3.5, 1.5), (7.5, 1.5), (3.5, 5.5) subtracts {{1/2}} instead of multiplying. (4, 2), (6, 2), (4, 4) uses the vertex (4, 2) as the centre.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Multiplying by {{1/2}} is the same as halving.",
          "With centre (0, 0), halve every coordinate.",
        ],
        strategy: "Measure from the centre",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q13",
        question:
          "A vertex P of a shape is 2 cm from the centre of enlargement C. The shape is enlarged by scale factor 4. How far is P′, the image of P, from P?",
        options: ["8 cm", "6 cm", "2 cm", "10 cm"],
        answerIndex: 1,
        explanation:
          "P′ is on the ray from C through P, 4 × 2 = 8 cm from C. P is 2 cm along that same ray, so P′ is 8 − 2 = 6 cm beyond P. 8 cm is the distance from C, not from P. 10 cm adds the 2 cm on instead of taking it away.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Draw C, P and P′ on one straight line.",
          "How far is P′ from C?",
          "P is part of the way along that line. How much further is P′?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q14",
        question:
          "Mei made this table. Which row is wrong?\n\n| Transformation | Is the image congruent to the object? |\n|---|---|\n| Translation by (2 over 5) | Yes |\n| Reflection in y = x | Yes |\n| Rotation 90° clockwise about (1, 1) | No |\n| Enlargement, scale factor 2 | No |",
        options: [
          "Translation by (2 over 5)",
          "Reflection in y = x",
          "Enlargement, scale factor 2",
          "Rotation 90° clockwise about (1, 1)",
        ],
        answerIndex: 3,
        explanation:
          "A rotation only turns the shape, so its lengths and angles are kept and the image IS congruent: the 'No' in that row is wrong. Mei may think that facing a different way stops shapes being congruent, but congruence only cares about shape and size. The enlargement row is correct: scale factor 2 doubles the lengths, so the image is similar but not congruent.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Congruent means same shape and same size. Position and direction don't matter.",
          "Which of these transformations changes the size?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q15",
        question: "Every point (x, y) of a shape is mapped to (3x, 3y). Which is a full description of this transformation?",
        options: [
          "Enlargement, scale factor 3, centre (0, 0)",
          "Enlargement, scale factor 3",
          "Translation by the column vector (3 over 3)",
          "Enlargement, scale factor 9, centre (0, 0)",
        ],
        answerIndex: 0,
        explanation:
          "Each coordinate measures a distance from the origin, and each one is tripled, so this is an enlargement with scale factor 3 and centre (0, 0). 'Enlargement, scale factor 3' is correct but not full: an enlargement must always state its centre. Scale factor 9 is the area factor, not the length factor. A translation would add 3, not multiply by 3.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Does multiplying the coordinates slide the shape, or change its size?",
          "What two facts must every enlargement description include?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q16",
        question:
          "A right-angled triangle has shorter sides 4 cm and 7 cm. Without a calculator, which is the best estimate for the length of the hypotenuse?",
        options: ["11 cm", "65 cm", "Just over 8 cm", "About 5.7 cm"],
        answerIndex: 2,
        explanation:
          "{{4^2 + 7^2 = 16 + 49 = 65}}. Since {{8^2 = 64}}, {{sqrt(65)}} is just over 8 cm. 11 cm adds the sides, but the hypotenuse must be shorter than that. 65 cm forgets the square root. About 5.7 cm is {{sqrt(49 - 16)}}, subtracting the squares, which is only right when you are finding a shorter side; the hypotenuse is the longest side, so it must be more than 7 cm.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Find {{c^2}} first.",
          "Which square number is closest to 65?",
          "The hypotenuse is the longest side. Use that to rule options out.",
        ],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q17",
        question:
          "The smallest angle you can turn a regular polygon through so that it fits exactly onto itself is 24°. How many lines of symmetry does the polygon have?",
        options: ["24", "30", "156", "15"],
        answerIndex: 3,
        explanation:
          "It fits onto itself after every 24° turn, so it fits 360 ÷ 24 = 15 times in a full turn: rotational symmetry of order 15. So it is a regular 15-sided polygon, and a regular polygon has as many lines of symmetry as it has sides: 15. 24 mixes up the angle with the count. 30 counts each line twice (once at each end). 156 is the size of each interior angle in degrees (180° − 24°), not a number of lines.",
        difficulty: "challenge",
        guideRef: "symmetry",
        hints: [
          "How many 24° turns make one full turn?",
          "That tells you the order of rotational symmetry, and how many sides the polygon has.",
          "How many lines of symmetry does a regular polygon with n sides have?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q18",
        question:
          "The point (3, 1) is rotated 90° anticlockwise about the origin. The image is rotated 90° anticlockwise about the origin again, and this is repeated until there have been 2026 quarter turns altogether. Where does the point end up?",
        options: ["(3, 1)", "(−3, −1)", "(−1, 3)", "(1, −3)"],
        answerIndex: 1,
        explanation:
          "Four quarter turns make a full turn, so the positions repeat in a cycle of 4: (3, 1) → (−1, 3) → (−3, −1) → (1, −3) → (3, 1) → … Since 2026 = 4 × 506 + 2, the first 2024 turns bring the point back to the start, and the last 2 quarter turns make a half turn: (−3, −1). (3, 1) assumes that any even number of turns gets you home, but you need a multiple of 4. (−1, 3) is where the point is after just 1 turn.",
        difficulty: "challenge",
        guideRef: "rotation",
        hints: [
          "Work out the first few positions. When does the point get back to (3, 1)?",
          "The pattern repeats every 4 turns. What is the remainder when 2026 is divided by 4?",
          "2024 is a multiple of 4. How many turns are left over after that?",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q19",
        question:
          "A shape is enlarged by scale factor 2 with centre (0, 0). The image is then enlarged by scale factor {{1/2}} with centre (2, 0). Which single transformation has the same overall effect?",
        options: [
          "Translation by the column vector (1 over 0)",
          "No change at all, because the scale factors cancel out",
          "Translation by the column vector (2 over 0)",
          "Enlargement, scale factor {{5/2}}, centre (0, 0)",
        ],
        answerIndex: 0,
        explanation:
          "Follow some points. (0, 0) stays at (0, 0), then halves its distance from (2, 0) to land on (1, 0). (4, 2) goes to (8, 4); from (2, 0) that is 6 right and 4 up, which halves to 3 right and 2 up, landing on (5, 2). Both points moved 1 right. The sizes cancel (2 × {{1/2}} = 1), so the image is congruent, but because the two centres are different it ends up shifted: a translation by (1 over 0). 'No change' would only be true if both centres were the same point. Scale factor {{5/2}} adds the scale factors instead of multiplying them.",
        difficulty: "challenge",
        guideRef: "enlargement",
        hints: [
          "Choose an easy point, such as (0, 0), and follow it through both enlargements.",
          "Then follow a second point, such as (4, 2). Compare how the two points moved.",
          "What is the overall scale factor? If the size doesn't change, what kind of transformation is left?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "transformations-pythagoras-m4-q20",
        question:
          "The diagram shows a large square with side a + b. Inside it are four copies of a right-angled triangle with shorter sides a and b and hypotenuse c, leaving a tilted square of side c in the middle. Writing the area of the large square in two ways gives which equation?",
        diagram: `<svg viewBox="0 0 280 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A large square of side a plus b. Its four corners hold four identical right-angled triangles with shorter sides a and b. In the middle is a tilted square whose sides are the hypotenuses, each of length c."><rect x="0" y="0" width="280" height="280" fill="#ffffff"/><polygon points="120,40 240,120 160,240 40,160" fill="#fde68a" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="40,40 120,40 40,160" fill="#bae6fd" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="120,40 240,40 240,120" fill="#bae6fd" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="240,120 240,240 160,240" fill="#bae6fd" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="160,240 40,240 40,160" fill="#bae6fd" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><path d="M50 40V50H40M230 40V50H240M230 240V230H240M50 240V230H40" stroke="#1f2937" stroke-width="1.5" fill="none"/><text x="80" y="32" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="180" y="32" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="254" y="85" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="254" y="185" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="200" y="260" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="100" y="260" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="26" y="205" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="26" y="105" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="170" y="98" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">c</text><text x="110" y="190" font-size="14" font-style="italic" font-family="sans-serif" fill="#1f2937" text-anchor="middle">c</text></svg>`,
        options: [
          "{{(a+b)^2 = c^2 + 4ab}}",
          "{{a^2 + b^2 = c^2 + 2ab}}",
          "{{(a+b)^2 = c^2 + 2ab}}",
          "{{(a+b)^2 = c^2 + ab}}",
        ],
        answerIndex: 2,
        explanation:
          "One way: the side is a + b, so the area is {{(a+b)^2}}. The other way: the tilted square ({{c^2}}) plus four triangles of {{1/2 ab}} each, which is {{c^2 + 2ab}} altogether. Expanding the brackets gives {{a^2 + 2ab + b^2 = c^2 + 2ab}}, and taking 2ab from both sides proves {{a^2 + b^2 = c^2}}. {{(a+b)^2 = c^2 + 4ab}} forgets that each triangle is half of an a by b rectangle. {{a^2 + b^2 = c^2 + 2ab}} wrongly treats {{(a+b)^2}} as {{a^2 + b^2}}.",
        difficulty: "challenge",
        guideRef: "pythagoras",
        hints: [
          "Find the area of the big square using its side length.",
          "Now add up the pieces: one tilted square and four triangles. What is the area of one triangle?",
          "Set the two expressions equal. Then expand the brackets and see what cancels!",
        ],
        strategy: "Count the same thing two ways",
      },
    ],
  },
];
