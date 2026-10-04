import type { TopicPractice } from "../../types.ts";

// Angles, Parallel Lines & Polygons — quiz, two practice papers and the challenge set.
// Every diagram is drawn to scale from the stated angles.

export const practice: TopicPractice = {
  // ===========================================================================
  // QUIZ — quick check of the whole topic (4 mcq, 5 short, 1 written)
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "angles-polygons-quiz-q01",
      question: "Two straight lines cross. One of the angles formed is 47°. What is the size of the angle vertically opposite it?",
      options: ["47°", "133°", "43°", "313°"],
      answerIndex: 0,
      explanation:
        "Vertically opposite angles are equal, so the answer is 47°. 133° is the angle *next to* the 47° angle: those two sit on a straight line, so they add to 180°. 43° would make a right angle with 47°, and 313° is the rest of a full turn.",
      difficulty: "warmup",
      guideRef: "angle-facts",
      hints: ["Picture the X shape. Which angle is directly across from the 47° angle?", "Vertically opposite angles are equal."],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "angles-polygons-quiz-q02",
      question: "Three angles meet at a point: 72°, 55° and x. Find x, in degrees.",
      answer: { type: "number", value: 233, display: "233°" },
      solution: [
        "Angles around a point add to 360°.",
        "72 + 55 = 127",
        "x = 360 − 127 = 233°",
        "x is a reflex angle (bigger than 180°). That is fine for an angle at a point.",
      ],
      commonError: "Using 180° (the straight-line fact) instead of 360°.",
      traps: [
        {
          spec: { type: "number", value: 53 },
          feedback: "53° would be right for angles on a straight line. These angles go all the way round a point, so they add to 360°.",
        },
      ],
      difficulty: "warmup",
      guideRef: "angle-facts",
      hints: ["What do angles around a point add up to?", "Add the two angles you know, then subtract the total from 360°."],
    },
    {
      kind: "mcq",
      id: "angles-polygons-quiz-q03",
      question: "The arrows show that the two horizontal lines are parallel. Which reason explains why angle a = angle b?",
      diagram: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines crossed by a slanted transversal. Angle a is at the top crossing, below the line and left of the transversal. Angle b is at the bottom crossing, above the line and right of the transversal"><rect width="360" height="220" fill="#ffffff"/><path d="M203.5 60 L179.5 60 A24 24 0 0 0 191.5 80.8 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M140 170 L164 170 A24 24 0 0 0 152 149.2 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="60" x2="340" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="170" x2="340" y2="170" stroke="#1f2937" stroke-width="2"/><line x1="117.5" y1="209" x2="226" y2="21" stroke="#1f2937" stroke-width="2"/><path d="M293.4 55.4 L300 60 L293.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M293.4 165.4 L300 170 L293.4 174.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="170.6" y="84.3" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="172.9" y="156.3" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text></svg>`,
      options: [
        "Corresponding angles are equal",
        "Alternate angles are equal",
        "Co-interior angles are equal",
        "Vertically opposite angles are equal",
      ],
      answerIndex: 1,
      explanation:
        "a and b are both between the parallel lines, on opposite sides of the transversal. They make a Z shape, so they are **alternate** angles, which are equal. Corresponding angles would sit in the *same* position at each crossing (an F shape). Co-interior angles are not equal at all: they add to 180°. Vertically opposite angles share a vertex, but a and b are at different crossings.",
      difficulty: "core",
      guideRef: "parallel-lines",
      hints: [
        "Are a and b at the same crossing point, or at different ones?",
        "Both angles are between the parallel lines, on opposite sides of the slanted line. What letter shape do they make?",
      ],
      strategy: "Look for Z, F and C shapes",
    },
    {
      kind: "short",
      id: "angles-polygons-quiz-q04",
      question: "Two angles of a triangle are 38° and 67°. Find the third angle, in degrees.",
      answer: { type: "number", value: 75, display: "75°" },
      solution: ["Angles in a triangle add to 180°.", "38 + 67 = 105", "180 − 105 = 75°"],
      traps: [
        {
          spec: { type: "number", value: 255 },
          feedback: "You used 360°. That is the total for a quadrilateral or around a point. The angles of a triangle add to 180°.",
        },
      ],
      difficulty: "warmup",
      guideRef: "triangles",
      hints: ["What do the three angles of a triangle add up to?", "Subtract the two known angles from 180°."],
    },
    {
      kind: "short",
      id: "angles-polygons-quiz-q05",
      question: "Angles of (2x + 10)° and (x + 20)° are co-interior angles between a pair of parallel lines. Find the value of x.",
      answer: { type: "number", value: 50, display: "x = 50" },
      solution: [
        "Co-interior angles add to 180°: (2x + 10) + (x + 20) = 180.",
        "3x + 30 = 180",
        "3x = 150, so x = 50.",
        "Check: the angles are 110° and 70°, which add to 180° ✓",
      ],
      commonError: "Setting co-interior angles equal. Alternate and corresponding angles are equal; co-interior angles add to 180°.",
      traps: [
        {
          spec: { type: "number", value: 10 },
          feedback: "You set the two angles equal. Co-interior angles (a C shape) add to 180°. They are only equal when both are 90°.",
        },
      ],
      difficulty: "core",
      guideRef: "parallel-lines",
      hints: [
        "Co-interior angles: are they equal, or do they add to something?",
        "Write an equation: (2x + 10) + (x + 20) = 180.",
        "Collect like terms: 3x + 30 = 180.",
      ],
      strategy: "Form an equation",
    },
    {
      kind: "mcq",
      id: "angles-polygons-quiz-q06",
      question: "Which of these quadrilaterals **always** has diagonals that cross at right angles?",
      options: ["Rectangle", "Parallelogram", "Rhombus", "Isosceles trapezium"],
      answerIndex: 2,
      explanation:
        "A rhombus has four equal sides, and its diagonals always cross at 90° (and cut each other in half). A rectangle's diagonals are equal in length, but they only cross at 90° when the rectangle is a square. A parallelogram's diagonals bisect each other but need not be perpendicular, and an isosceles trapezium's diagonals are equal but not perpendicular in general.",
      difficulty: "core",
      guideRef: "quadrilaterals",
      hints: [
        "Sketch a long, thin rectangle and draw its diagonals. Do they cross at 90°?",
        "Think about the shape with four equal sides. Each of its diagonals is a line of symmetry.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "angles-polygons-quiz-q07",
      question: "Each interior angle of a regular polygon is 150°. How many sides does the polygon have?",
      answer: { type: "number", value: 12 },
      solution: [
        "Interior + exterior = 180°, so each exterior angle is 180 − 150 = 30°.",
        "The exterior angles add to 360°, so n = 360 ÷ 30 = 12.",
      ],
      solutions: [
        {
          label: "Using the interior angle sum",
          steps: [
            "(n − 2) × 180 = 150n",
            "180n − 360 = 150n",
            "30n = 360, so n = 12.",
            "The exterior-angle method is quicker: one subtraction and one division.",
          ],
        },
      ],
      commonError: "Dividing 360 by the interior angle instead of the exterior angle.",
      traps: [
        {
          spec: { type: "number", value: 2.4 },
          feedback: "You divided 360 by the interior angle. Use the exterior angle instead: 180 − 150 = 30°, then 360 ÷ 30.",
        },
      ],
      difficulty: "core",
      guideRef: "polygon-angles",
      hints: [
        "The interior angle is awkward to work with. What is the exterior angle?",
        "Exterior angle = 180° − 150°.",
        "The exterior angles add to 360°. How many 30° angles fit into 360°?",
      ],
      strategy: "Use the exterior angle",
    },
    {
      kind: "mcq",
      id: "angles-polygons-quiz-q08",
      question: "A regular polygon has exactly 10 lines of symmetry. What is the size of each of its interior angles?",
      options: ["36°", "108°", "162°", "144°"],
      answerIndex: 3,
      explanation:
        "A regular polygon has as many lines of symmetry as it has sides, so this is a regular decagon (10 sides). Each exterior angle is 360° ÷ 10 = 36°, so each interior angle is 180° − 36° = 144°. 36° is the exterior angle, not the interior one. 108° comes from thinking each line of symmetry uses up two corners, giving 5 sides; 162° comes from doubling to 20 sides.",
      difficulty: "core",
      guideRef: "regular-polygon-symmetry",
      hints: [
        "How many sides does a regular polygon with 10 lines of symmetry have?",
        "Find the exterior angle first: 360° shared between the sides.",
        "Interior angle = 180° − exterior angle.",
      ],
      strategy: "Use the exterior angle",
    },
    {
      kind: "short",
      id: "angles-polygons-quiz-q09",
      question: "In an isosceles triangle, each of the two equal **base** angles is 34°. Find the size of the third angle, in degrees.",
      answer: { type: "number", value: 112, display: "112°" },
      solution: ["The two base angles are equal, so both are 34°.", "Third angle = 180 − 34 − 34 = 112°."],
      traps: [
        {
          spec: { type: "number", value: 73 },
          feedback: "73° is what you get if 34° is the angle between the equal sides. Here 34° is a *base* angle, so there are two of them.",
        },
      ],
      difficulty: "core",
      guideRef: "triangles",
      hints: ["How many angles of 34° does the triangle have?", "Subtract both base angles from 180°."],
    },
    {
      kind: "written",
      id: "angles-polygons-quiz-q10",
      question:
        "The diagram shows triangle ABC with side BC extended to D. The interior angles are a, b and c, and d is the exterior angle at C. Prove that d = a + b, giving a reason for each step.",
      diagram: `<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with interior angles a at A, b at B and c at C. Side BC is extended to D, making exterior angle d at C"><rect width="380" height="230" fill="#ffffff"/><path d="M120 50 L109.3 71.5 A24 24 0 0 0 136.3 67.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><path d="M50 190 L76 190 A26 26 0 0 0 61.6 166.7 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M250 190 L235 173.9 A22 22 0 0 0 228 190 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M250 190 L280 190 A30 30 0 0 0 229.6 168 Z" fill="#fecaca" stroke="#334155" stroke-width="0.8"/><polygon points="120,50 50,190 250,190" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="250" y1="190" x2="350" y2="190" stroke="#1f2937" stroke-width="2"/><text x="125.4" y="92.5" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="84" y="173.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="217" y="180.5" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">c</text><text x="267.6" y="154.6" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">d</text><text x="120" y="40.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="40" y="210.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="250" y="212.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="350" y="212.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text></svg>`,
      marks: 3,
      modelAnswer:
        "a + b + c = 180°, because angles in a triangle add to 180°.\n\nc + d = 180°, because angles on a straight line add to 180°.\n\nBoth expressions equal 180°, so a + b + c = c + d. Subtracting c from both sides gives d = a + b. Nothing depended on the particular triangle, so this is true for every triangle.",
      markScheme: [
        { point: "a + b + c = 180° with the reason: angles in a triangle", keywords: ["triangle", "a + b + c", "a+b+c", "180"] },
        { point: "c + d = 180° with the reason: angles on a straight line", keywords: ["straight line", "c + d", "c+d", "bcd"] },
        { point: "Equates the two and subtracts c to conclude d = a + b", keywords: ["subtract", "a + b + c = c + d", "d = a + b", "d=a+b", "take away"] },
      ],
      commonError: "Checking with numbers (say a = 50° and b = 60°). One example is not a proof: the argument must work for every triangle.",
      solutions: [
        {
          label: "Draw a parallel line",
          steps: [
            "Through C, draw a line parallel to BA. It splits d into two parts.",
            "The upper part equals a (alternate angles, with AC as the transversal).",
            "The lower part equals b (corresponding angles, with BD as the transversal).",
            "So d = a + b. This is the same idea used to prove the triangle angle sum.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "angle-proofs",
      hints: [
        "Write down two different facts that both equal 180°.",
        "One fact uses the three angles inside the triangle. The other uses the straight line BCD.",
        "If a + b + c and c + d are both 180°, what can you do with c?",
      ],
      strategy: "Use two facts that equal the same thing",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS
  // ===========================================================================
  papers: [
    {
      id: "angles-polygons-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "angles-polygons-p1-q01",
          question: "Angles of 108° and x lie together on a straight line. Find x, in degrees.",
          answer: { type: "number", value: 72, display: "72°" },
          solution: ["Angles on a straight line add to 180°.", "x = 180 − 108 = 72°"],
          traps: [
            { spec: { type: "number", value: 252 }, feedback: "That uses 360°. Angles on a straight line add to 180°." },
          ],
          difficulty: "warmup",
          guideRef: "angle-facts",
          hints: ["What do angles on a straight line add up to?", "Subtract 108° from that total."],
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q02",
          question:
            "Two straight lines cross. One of the four angles is 64°. Find the sizes of the other three angles, in degrees. Give all three, separated by commas.",
          answer: { type: "list", values: [64, 116, 116], display: "64°, 116°, 116°" },
          solution: [
            "The angle vertically opposite 64° is also 64° (vertically opposite angles are equal).",
            "Each of the other two angles sits on a straight line with the 64° angle, so each is 180 − 64 = 116° (angles on a straight line add to 180°).",
            "Check: 64 + 116 + 64 + 116 = 360 ✓",
          ],
          commonError: "Thinking all four angles are equal, or that the angle next to 64° is 26° (that would make a right angle, not a straight line).",
          traps: [
            {
              spec: { type: "list", values: [26, 64, 26] },
              feedback: "26° makes a right angle with 64°. The neighbouring angles share a straight line with 64°, so they add to 180°.",
            },
          ],
          difficulty: "warmup",
          guideRef: "angle-facts",
          hints: ["Which angle is directly opposite the 64° angle?", "An angle next to 64° shares a straight line with it."],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q03",
          question: "A right-angled triangle has one angle of 27°. Find the size of the third angle, in degrees.",
          answer: { type: "number", value: 63, display: "63°" },
          solution: ["The three angles are 90°, 27° and the unknown angle, and they add to 180°.", "180 − 90 − 27 = 63°"],
          traps: [
            { spec: { type: "number", value: 153 }, feedback: "You forgot the right angle. The angles are 90°, 27° and the unknown: 180 − 90 − 27." },
          ],
          difficulty: "warmup",
          guideRef: "triangles",
          hints: ["How many angles do you already know? Don't forget the right angle.", "Subtract 90° and 27° from 180°."],
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q04",
          question: "Three angles of a quadrilateral are 75°, 120° and 95°. Find the fourth angle, in degrees.",
          answer: { type: "number", value: 70, display: "70°" },
          solution: [
            "The angles of a quadrilateral add to 360° (a diagonal splits it into two triangles).",
            "75 + 120 + 95 = 290",
            "360 − 290 = 70°",
          ],
          traps: [
            { spec: { type: "number", value: -110 }, feedback: "An angle can't be negative. You used 180°, but a quadrilateral's angles add to 360°." },
          ],
          difficulty: "warmup",
          guideRef: "quadrilaterals",
          hints: ["What do the angles of a quadrilateral add up to?", "Add the three angles you know, then subtract from 360°."],
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q05",
          question: "Find the size of each exterior angle of a regular dodecagon (12 sides), in degrees.",
          answer: { type: "number", value: 30, display: "30°" },
          solution: [
            "The exterior angles of any polygon add to 360°.",
            "A regular dodecagon has 12 equal exterior angles: 360 ÷ 12 = 30°.",
          ],
          traps: [
            {
              spec: { type: "number", value: 150 },
              feedback: "150° is the interior angle. The exterior angle is 180 − 150 = 30°, or simply 360 ÷ 12.",
            },
          ],
          difficulty: "warmup",
          guideRef: "polygon-angles",
          hints: ["What do the exterior angles of any polygon add up to?", "Share 360° equally between 12 exterior angles."],
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q06",
          question: "The arrows show two parallel lines crossed by a transversal. Find the size of angle x, in degrees.",
          diagram: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines crossed by a transversal. At the top crossing, the angle above the line and left of the transversal is 118 degrees. At the bottom crossing, angle x is above the line and right of the transversal"><rect width="360" height="230" fill="#ffffff"/><path d="M213.8 60 L224.1 40.6 A22 22 0 0 0 191.8 60 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M150 180 L174 180 A24 24 0 0 0 161.3 158.8 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="60" x2="340" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="180" x2="340" y2="180" stroke="#1f2937" stroke-width="2"/><line x1="131.2" y1="215.3" x2="232.6" y2="24.7" stroke="#1f2937" stroke-width="2"/><path d="M303.4 55.4 L310 60 L303.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M303.4 175.4 L310 180 L303.4 184.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="193.2" y="30.3" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">118°</text><text x="182.6" y="165.7" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">x</text></svg>`,
          answer: { type: "number", value: 62, display: "62°" },
          solution: [
            "At the top crossing, the angle to the right of the transversal and above the line sits on a straight line with 118°, so it is 180 − 118 = 62° (angles on a straight line add to 180°).",
            "x is in the same position at the bottom crossing, so x = 62° (corresponding angles are equal).",
          ],
          solutions: [
            {
              label: "Corresponding first, then the straight line",
              steps: [
                "At the bottom crossing, the angle above the line and left of the transversal is 118° (corresponding to the 118° angle).",
                "x sits on a straight line with it: x = 180 − 118 = 62°.",
                "Both routes take two steps; pick whichever chain you spot first.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 118 },
              feedback: "x is not in a matching position to 118°. Look again: x is on the other side of the transversal. Which shape (F, Z or C) links them?",
            },
          ],
          difficulty: "core",
          guideRef: "parallel-lines",
          hints: [
            "Use one fact at the top crossing, then jump to the bottom crossing.",
            "Find the angle next to 118° on the top straight line.",
            "That angle and x are in matching positions: corresponding angles.",
          ],
          strategy: "Chain angle facts",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q07",
          question: "Angles of (4x − 10)°, (2x + 25)° and 45° lie together on a straight line. Find the value of x.",
          answer: { type: "number", value: 20, display: "x = 20" },
          solution: [
            "Angles on a straight line add to 180°: (4x − 10) + (2x + 25) + 45 = 180.",
            "Collect like terms: 6x + 60 = 180.",
            "6x = 120, so x = 20.",
            "Check: the angles are 70°, 65° and 45°, which add to 180° ✓",
          ],
          traps: [
            { spec: { type: "number", value: 50 }, feedback: "You used 360°. Angles on a straight line add to 180°." },
          ],
          difficulty: "core",
          guideRef: "angle-facts",
          hints: [
            "Which angle fact gives you an equation?",
            "Add the three angles and set the total equal to 180.",
            "Collect the x terms (4x + 2x) and the numbers (−10 + 25 + 45) separately.",
          ],
          strategy: "Form an equation",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q08",
          question:
            "Side BC of triangle ABC is extended beyond C to a point D. ∠BAC = x, ∠ABC = 2x and the exterior angle ∠ACD = 126°. Find the value of x.",
          answer: { type: "number", value: 42, display: "x = 42" },
          solution: [
            "The exterior angle of a triangle equals the sum of the two interior opposite angles.",
            "x + 2x = 126",
            "3x = 126, so x = 42.",
            "Check: the angles of the triangle are 42°, 84° and 180 − 126 = 54°, which add to 180° ✓",
          ],
          solutions: [
            {
              label: "Straight line, then the angle sum",
              steps: [
                "∠ACB = 180 − 126 = 54° (angles on a straight line).",
                "x + 2x + 54 = 180 (angles in a triangle).",
                "3x = 126, so x = 42.",
                "The exterior-angle fact does both steps at once, so it is quicker.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 18 },
              feedback: "You treated 126° as an angle inside the triangle. ∠ACD is outside it: the exterior angle equals the sum of the two interior opposite angles.",
            },
          ],
          difficulty: "core",
          guideRef: "triangles",
          hints: [
            "Sketch it. Which two angles of the triangle are 'opposite' the exterior angle at C?",
            "The exterior angle equals the sum of the two interior opposite angles.",
            "Solve x + 2x = 126.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "angles-polygons-p1-q09",
          question:
            "The arrows show two parallel lines. P is on the top line, Q and R are on the bottom line, and PQ = PR. The angle between the top line and PQ is 64°, as shown. Find angle x = ∠QPR, giving a reason for each step.",
          diagram: `<svg viewBox="0 0 380 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines. P is on the top line; Q and R are on the bottom line. PQ and PR are equal. The angle between the top line, to the left of P, and PQ is 64 degrees. Angle x is the angle QPR"><rect width="380" height="280" fill="#ffffff"/><path d="M200 60 L172 60 A28 28 0 0 0 187.7 85.2 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M200 60 L186.8 87 A30 30 0 0 0 213.2 87 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="60" x2="360" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="240" x2="360" y2="240" stroke="#1f2937" stroke-width="2"/><line x1="200" y1="60" x2="112.2" y2="240" stroke="#1f2937" stroke-width="2"/><line x1="200" y1="60" x2="287.8" y2="240" stroke="#1f2937" stroke-width="2"/><path d="M328.4 55.4 L335 60 L328.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M335.4 55.4 L342 60 L335.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M328.4 235.4 L335 240 L328.4 244.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M335.4 235.4 L342 240 L335.4 244.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><line x1="161.5" y1="152.6" x2="150.7" y2="147.4" stroke="#1f2937" stroke-width="1.6"/><line x1="249.3" y1="147.4" x2="238.5" y2="152.6" stroke="#1f2937" stroke-width="1.6"/><text x="162.7" y="87.9" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">64°</text><text x="200" y="111.3" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">x</text><text x="200" y="50.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">P</text><text x="108.2" y="262.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Q</text><text x="291.8" y="262.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">R</text></svg>`,
          marks: 3,
          modelAnswer:
            "∠PQR = 64°, because alternate angles are equal (the lines are parallel).\n\nPQ = PR, so triangle PQR is isosceles and ∠PRQ = ∠PQR = 64°, because base angles of an isosceles triangle are equal.\n\nx = 180° − 64° − 64° = 52°, because angles in a triangle add to 180°.",
          markScheme: [
            { point: "∠PQR = 64° because alternate angles are equal", keywords: ["alternate", "z shape", "z angle", "64"] },
            { point: "∠PRQ = 64° because the triangle is isosceles (base angles equal)", keywords: ["isosceles", "base angles", "base", "pq = pr"] },
            { point: "x = 180 − 64 − 64 = 52° because angles in a triangle add to 180°", keywords: ["52", "triangle", "180"] },
          ],
          commonError: "Writing the numbers with no reasons, or calling the Z-shaped pair 'corresponding' angles.",
          solutions: [
            {
              label: "Finish on the straight line at P",
              steps: [
                "∠PQR = 64° (alternate angles) and ∠PRQ = 64° (isosceles triangle).",
                "The angle between PR and the top line, to the right of P, is also 64° (alternate with ∠PRQ).",
                "Angles on a straight line at P: 64 + x + 64 = 180, so x = 52°.",
              ],
            },
          ],
          difficulty: "core",
          guideRef: "parallel-lines",
          hints: [
            "Start with the 64° angle. Which angle inside the triangle makes a Z shape with it?",
            "PQ = PR. What does that tell you about the angles at Q and R?",
            "Now use the angle sum of triangle PQR.",
          ],
          strategy: "Chain angle facts",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q10",
          question: "PQRS is a parallelogram. ∠P = (3x − 6)° and ∠R = (x + 50)°. Find the size of ∠Q, in degrees.",
          answer: { type: "number", value: 102, display: "102°" },
          solution: [
            "Opposite angles of a parallelogram are equal, so 3x − 6 = x + 50.",
            "2x = 56, so x = 28.",
            "∠P = 3 × 28 − 6 = 78° (check: ∠R = 28 + 50 = 78° ✓).",
            "∠P and ∠Q are co-interior angles between the parallel sides PS and QR, so ∠Q = 180 − 78 = 102°.",
          ],
          traps: [
            { spec: { type: "number", value: 78 }, feedback: "78° is ∠P (and ∠R). ∠Q is a neighbouring angle, so ∠P + ∠Q = 180°." },
            { spec: { type: "number", value: 28 }, feedback: "28 is the value of x, not an angle. Use it to find ∠P, then ∠Q." },
          ],
          difficulty: "core",
          guideRef: "quadrilaterals",
          hints: [
            "Which angle of a parallelogram is equal to ∠P?",
            "Set 3x − 6 = x + 50 and solve for x.",
            "∠P and ∠Q are neighbours. What do neighbouring angles of a parallelogram add up to?",
          ],
          strategy: "Form an equation",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q11",
          question: "The interior angles of a polygon add up to 1980°. How many sides does the polygon have?",
          answer: { type: "number", value: 13 },
          solution: [
            "Interior angle sum = (n − 2) × 180°.",
            "(n − 2) × 180 = 1980, so n − 2 = 1980 ÷ 180 = 11.",
            "n = 13.",
          ],
          traps: [
            { spec: { type: "number", value: 11 }, feedback: "11 is the number of triangles, n − 2. Add 2 to get the number of sides." },
          ],
          difficulty: "core",
          guideRef: "polygon-angles",
          hints: ["Use (n − 2) × 180° and work backwards.", "1980 ÷ 180 = ?", "That number is n − 2, not n."],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q12",
          question: "A pentagon has three right angles. Its other two angles are equal to each other. Find the size of each of these two angles, in degrees.",
          answer: { type: "number", value: 135, display: "135°" },
          solution: [
            "Angle sum of a pentagon = (5 − 2) × 180 = 540°.",
            "Three right angles make 3 × 90 = 270°.",
            "The other two angles share 540 − 270 = 270°, so each is 135°.",
          ],
          traps: [
            {
              spec: { type: "number", value: 45 },
              feedback: "You used 360°, the angle sum of a quadrilateral. A pentagon's angles add to (5 − 2) × 180 = 540°.",
            },
          ],
          difficulty: "core",
          guideRef: "polygon-angles",
          hints: ["Find the angle sum of a pentagon first.", "Subtract the three right angles.", "Share what is left equally between the two angles."],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "angles-polygons-p1-q13",
          question:
            "Mei says: \"A square is not a rectangle, because a rectangle has two long sides and two short sides.\" Is Mei right? Explain, using the properties of rectangles and squares.",
          marks: 3,
          modelAnswer:
            "Mei is wrong. A rectangle is a quadrilateral with four right angles (so its opposite sides are equal and parallel). Nothing in that definition says the sides must be different lengths.\n\nA square has four right angles, and its opposite sides are equal and parallel, so it has every property of a rectangle. A square is a special rectangle whose four sides also happen to be equal.",
          markScheme: [
            { point: "States that Mei is wrong: a square is a rectangle", keywords: ["wrong", "not right", "is a rectangle", "incorrect"] },
            { point: "A rectangle only needs four right angles (opposite sides equal and parallel); equal sides are not ruled out", keywords: ["four right angles", "right angles", "90", "opposite sides"] },
            { point: "A square has all these properties as well as four equal sides, so it is a special rectangle", keywords: ["special", "all the properties", "equal sides", "also", "type of rectangle"] },
          ],
          commonError: "Describing what a typical rectangle looks like instead of using the definition.",
          difficulty: "core",
          guideRef: "quadrilaterals",
          hints: [
            "Write down exactly what a shape needs in order to be a rectangle.",
            "Does a square have every one of those properties?",
            "Does the definition of a rectangle *forbid* equal sides?",
          ],
          strategy: "Check the definition",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q14",
          question: "A regular polygon has rotational symmetry of order 9. Find the size of each of its interior angles, in degrees.",
          answer: { type: "number", value: 140, display: "140°" },
          solution: [
            "A regular polygon's order of rotational symmetry equals its number of sides, so n = 9.",
            "Exterior angle = 360 ÷ 9 = 40°.",
            "Interior angle = 180 − 40 = 140°.",
          ],
          solutions: [
            {
              label: "Through the angle sum",
              steps: ["Interior angle sum = (9 − 2) × 180 = 1260°.", "Each angle = 1260 ÷ 9 = 140°.", "The exterior-angle route uses smaller numbers."],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 40 },
              feedback: "40° is the exterior angle (and the angle of each rotation). The interior angle is 180 − 40.",
            },
          ],
          difficulty: "core",
          guideRef: "regular-polygon-symmetry",
          hints: [
            "How many sides does a regular polygon with rotational symmetry of order 9 have?",
            "Find the exterior angle first.",
            "Interior + exterior = 180°.",
          ],
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q15",
          question:
            "In triangle PQR, PQ = PR. Side RQ is extended beyond Q to a point S, and the exterior angle ∠PQS = 115°. Find ∠QPR, in degrees.",
          answer: { type: "number", value: 50, display: "50°" },
          solution: [
            "∠PQR = 180 − 115 = 65° (angles on a straight line).",
            "PQ = PR, so triangle PQR is isosceles and ∠PRQ = ∠PQR = 65° (base angles of an isosceles triangle).",
            "∠QPR = 180 − 65 − 65 = 50° (angles in a triangle).",
          ],
          solutions: [
            {
              label: "Exterior angle fact",
              steps: [
                "The exterior angle at Q equals the sum of the two interior opposite angles: 115 = ∠QPR + ∠PRQ.",
                "∠PRQ = ∠PQR = 180 − 115 = 65°.",
                "∠QPR = 115 − 65 = 50°.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 65 }, feedback: "65° is ∠PQR (and ∠PRQ). You need the angle at P, between the two equal sides." },
          ],
          difficulty: "core",
          guideRef: "triangles",
          hints: [
            "Sketch it and mark the equal sides PQ and PR. Which two angles are equal?",
            "Start at Q: the exterior angle and ∠PQR lie on a straight line.",
            "Then use the isosceles triangle and the angle sum.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q16",
          question:
            "The arrows show two parallel lines. A bent line goes from A on the top line to B, then to C on the bottom line. Find the size of angle x at B, in degrees.",
          diagram: `<svg viewBox="0 0 360 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines. A bent line goes from A on the top line down to a corner B on the right, then back to C on the bottom line. The angle at A between the top line, to the right, and AB is 34 degrees. The angle at C between the bottom line, to the right, and CB is 47 degrees. Angle x is the angle ABC"><rect width="360" height="280" fill="#ffffff"/><path d="M100 60 L124.9 76.8 A30 30 0 0 0 130 60 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M125.4 240 L155.4 240 A30 30 0 0 0 145.8 218.1 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M218.6 140 L198.7 126.6 A24 24 0 0 0 202.2 157.6 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="60" x2="340" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="240" x2="340" y2="240" stroke="#1f2937" stroke-width="2"/><line x1="100" y1="60" x2="218.6" y2="140" stroke="#1f2937" stroke-width="2"/><line x1="218.6" y1="140" x2="125.4" y2="240" stroke="#1f2937" stroke-width="2"/><path d="M313.4 55.4 L320 60 L313.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M313.4 235.4 L320 240 L313.4 244.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="147.8" y="79.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">34°</text><text x="171.2" y="224.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">47°</text><text x="180.8" y="149.6" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">x</text><text x="100" y="50.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="232.6" y="144.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="125.4" y="262.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text></svg>`,
          answer: { type: "number", value: 81, display: "81°" },
          solution: [
            "Draw a third line through B, parallel to the other two. It splits x into two parts.",
            "The upper part is 34° (alternate angles with the 34° at A).",
            "The lower part is 47° (alternate angles with the 47° at C).",
            "x = 34 + 47 = 81°",
          ],
          commonError: "Treating the shape as a triangle and working out 180 − 34 − 47. There is no triangle here.",
          traps: [
            {
              spec: { type: "number", value: 99 },
              feedback: "You treated it like a triangle, but there is no triangle here. Draw a line through B parallel to the other two and look for Z shapes.",
            },
          ],
          difficulty: "core",
          guideRef: "parallel-lines",
          hints: [
            "There's no triangle here. What extra line could you draw through B?",
            "Draw a line through B parallel to the two given lines. Now look for Z shapes.",
            "x splits into two parts, each alternate to one of the given angles.",
          ],
          strategy: "Add a construction line",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q17",
          question: "In a regular polygon, each interior angle is 140° more than each exterior angle. How many sides does the polygon have?",
          answer: { type: "number", value: 18 },
          solution: [
            "At each vertex, interior + exterior = 180°.",
            "Let the exterior angle be e. Then the interior angle is e + 140.",
            "e + (e + 140) = 180, so 2e = 40 and e = 20°.",
            "n = 360 ÷ 20 = 18 sides.",
          ],
          solutions: [
            {
              label: "Sum and difference",
              steps: [
                "Two angles add to 180° and differ by 140°.",
                "Take away the difference and halve: the smaller angle is (180 − 140) ÷ 2 = 20°.",
                "n = 360 ÷ 20 = 18. This is the same algebra done in your head.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 20 }, feedback: "20° is the exterior angle. The number of sides is 360 ÷ 20." },
          ],
          difficulty: "challenge",
          guideRef: "polygon-angles",
          hints: [
            "What do an interior angle and its exterior angle add up to?",
            "Call the exterior angle e. Write the interior angle in terms of e.",
            "Solve e + (e + 140) = 180, then use 360 ÷ e.",
          ],
          strategy: "Introduce a variable",
        },
        {
          kind: "written",
          id: "angles-polygons-p1-q18",
          question: "Hana says she has drawn a regular polygon in which every interior angle is 100°. Explain why this is impossible.",
          marks: 3,
          modelAnswer:
            "In any polygon, an interior angle and its exterior angle add to 180°, so each exterior angle would be 180° − 100° = 80°.\n\nThe exterior angles of a polygon add to 360°, so the number of sides would be 360 ÷ 80 = 4.5.\n\nA polygon cannot have 4.5 sides: the number of sides must be a whole number. So no regular polygon has interior angles of 100°.",
          markScheme: [
            { point: "Exterior angle would be 180 − 100 = 80°", keywords: ["80", "exterior"] },
            { point: "Number of sides = 360 ÷ 80 = 4.5", keywords: ["4.5", "360", "4 and a half"] },
            { point: "The number of sides must be a whole number, so it is impossible", keywords: ["whole number", "integer", "not whole", "half a side"] },
          ],
          commonError: "Saying \"100 doesn't go into 360\". The test uses the exterior angle (80°), not the interior angle.",
          solutions: [
            {
              label: "Squeeze between neighbours",
              steps: [
                "A square (regular quadrilateral) has interior angles of 90°.",
                "A regular pentagon has interior angles of 108°.",
                "Interior angles grow as n grows, so 100° would need a number of sides between 4 and 5, which is impossible.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "polygon-angles",
          hints: [
            "Interior angles are awkward. Switch to the exterior angle.",
            "How many exterior angles of 80° would make 360°?",
            "Can a polygon have that many sides?",
          ],
          strategy: "Use the exterior angle",
        },
        {
          kind: "short",
          id: "angles-polygons-p1-q19",
          question: "ABCDE is a regular pentagon, and the diagonal AC is drawn. Find ∠ACD, in degrees.",
          diagram: `<svg viewBox="0 0 360 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Regular pentagon ABCDE with the diagonal AC drawn"><rect width="360" height="270" fill="#ffffff"/><polygon points="180,40 284.6,116 244.7,239 115.3,239 75.4,116" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="180" y1="40" x2="244.7" y2="239" stroke="#1f2937" stroke-width="2"/><text x="180" y="28.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="299.8" y="115.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="254.1" y="256.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="105.9" y="256.5" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text><text x="60.2" y="115.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">E</text></svg>`,
          answer: { type: "number", value: 72, display: "72°" },
          solution: [
            "Each interior angle of a regular pentagon is (5 − 2) × 180 ÷ 5 = 108°.",
            "AB = BC (the sides are equal), so triangle ABC is isosceles with ∠ABC = 108°.",
            "∠BCA = ∠BAC = (180 − 108) ÷ 2 = 36°.",
            "∠ACD = ∠BCD − ∠BCA = 108 − 36 = 72°.",
          ],
          solutions: [
            {
              label: "Triangle ACD",
              steps: [
                "By the same isosceles argument in triangle AED, ∠EAD = 36°, so ∠CAD = 108 − 36 − 36 = 36°.",
                "AC = AD (the pentagon is symmetrical about the line through A and the midpoint of CD).",
                "So triangle ACD is isosceles: ∠ACD = (180 − 36) ÷ 2 = 72°.",
                "The first method is quicker; this one shows that triangle ACD is a 36°, 72°, 72° triangle.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 36 }, feedback: "36° is ∠BCA. You need the rest of the angle at C: 108 − 36." },
            { spec: { type: "number", value: 108 }, feedback: "108° is the whole interior angle BCD. The diagonal AC cuts part of it off." },
          ],
          difficulty: "challenge",
          guideRef: "polygon-angles",
          hints: [
            "Find the interior angle of a regular pentagon.",
            "Look at triangle ABC. Which two of its sides are equal?",
            "Find ∠BCA, then subtract it from the interior angle at C.",
          ],
          strategy: "Look for isosceles triangles",
        },
        {
          kind: "written",
          id: "angles-polygons-p1-q20",
          question:
            "Prove that the angles of any triangle add up to 180°. In the diagram, a line has been drawn through A parallel to BC. Use it, and give a reason for each step.",
          diagram: `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with a line through A parallel to BC. At A, angle p is between the parallel line and AB, angle a is inside the triangle, and angle q is between AC and the parallel line. Angles b and c are at B and C"><rect width="380" height="240" fill="#ffffff"/><path d="M160 50 L136 50 A24 24 0 0 0 146.7 70 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><path d="M160 50 L145.6 71.6 A26 26 0 0 0 179.5 67.2 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M160 50 L178 65.9 A24 24 0 0 0 184 50 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M60 200 L86 200 A26 26 0 0 0 74.4 178.4 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><path d="M330 200 L310.5 182.8 A26 26 0 0 0 304 200 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="50" x2="360" y2="50" stroke="#1f2937" stroke-width="2"/><polygon points="160,50 60,200 330,200" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M323.4 45.4 L330 50 L323.4 54.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M203.4 195.4 L210 200 L203.4 204.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="126.5" y="72.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">p</text><text x="165.2" y="94.6" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="195.5" y="68.3" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">q</text><text x="95.3" y="186" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="292.6" y="190.8" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">c</text><text x="160" y="40.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="50" y="220.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="340" y="220.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text></svg>`,
          marks: 4,
          modelAnswer:
            "The line through A is parallel to BC.\n\np = b, because they are alternate angles (AB is the transversal).\n\nq = c, because they are alternate angles (AC is the transversal).\n\np + a + q = 180°, because p, a and q together make the straight line through A.\n\nReplacing p with b and q with c gives b + a + c = 180°. Nothing depended on the particular triangle, so the angles of every triangle add to 180°.",
          markScheme: [
            { point: "p = b because alternate angles are equal", keywords: ["alternate", "p = b", "p=b"] },
            { point: "q = c because alternate angles are equal", keywords: ["alternate", "q = c", "q=c"] },
            { point: "p + a + q = 180° because angles on a straight line add to 180°", keywords: ["straight line", "p + a + q", "p+a+q", "180"] },
            { point: "Substitutes to conclude a + b + c = 180° for any triangle", keywords: ["a + b + c", "a+b+c", "b + a + c", "substitute", "any triangle"] },
          ],
          commonError: "Measuring the angles or tearing off the corners. That shows it for one triangle; a proof must work for all of them.",
          difficulty: "challenge",
          guideRef: "angle-proofs",
          hints: [
            "Look at angle p and angle b. What shape do they make with the parallel lines?",
            "Do the same for q and c.",
            "What do p, a and q add up to?",
          ],
          strategy: "Add a construction line",
        },
      ],
    },
    {
      id: "angles-polygons-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "angles-polygons-p2-q01",
          question: "Five equal angles fit exactly around a point. What is the size of each angle, in degrees?",
          answer: { type: "number", value: 72, display: "72°" },
          solution: ["Angles around a point add to 360°.", "360 ÷ 5 = 72°"],
          traps: [
            { spec: { type: "number", value: 36 }, feedback: "That shares 180°, the total for a straight line. Around a point the total is 360°." },
          ],
          difficulty: "warmup",
          guideRef: "angle-facts",
          hints: ["What do angles around a point add up to?", "Share 360° equally between 5 angles."],
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q02",
          question: "Angle p and an angle of 128° are corresponding angles on a pair of parallel lines. Find p, in degrees.",
          answer: { type: "number", value: 128, display: "128°" },
          solution: ["Corresponding angles (an F shape) are equal.", "p = 128°"],
          traps: [
            { spec: { type: "number", value: 52 }, feedback: "52° would be right for co-interior angles. Corresponding angles are equal." },
          ],
          difficulty: "warmup",
          guideRef: "parallel-lines",
          hints: ["Are corresponding angles equal, or do they add to 180°?", "Think of the F shape: the two angles are in matching positions."],
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q03",
          question: "The angles of a triangle are x, x and 2x. Find x.",
          answer: { type: "number", value: 45, display: "x = 45" },
          solution: [
            "Angles in a triangle add to 180°: x + x + 2x = 180.",
            "4x = 180, so x = 45.",
            "The angles are 45°, 45° and 90°: a right-angled isosceles triangle.",
          ],
          traps: [
            { spec: { type: "number", value: 90 }, feedback: "90° is 2x, the largest angle. The question asks for x." },
          ],
          difficulty: "warmup",
          guideRef: "triangles",
          hints: ["Add the three angles as one expression.", "x + x + 2x = 4x. What must 4x equal?"],
          strategy: "Form an equation",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q04",
          question: "How many lines of symmetry does a regular hexagon have?",
          answer: { type: "number", value: 6 },
          solution: [
            "3 lines join pairs of opposite corners.",
            "3 more lines join the midpoints of opposite sides.",
            "Total: 6. A regular polygon with n sides has n lines of symmetry.",
          ],
          traps: [
            {
              spec: { type: "number", value: 3 },
              feedback: "You've counted the lines through opposite corners. There are also 3 lines through the midpoints of opposite sides.",
            },
          ],
          difficulty: "warmup",
          guideRef: "regular-polygon-symmetry",
          hints: ["Some lines pass through two opposite corners. How many?", "Other lines pass through the midpoints of opposite sides."],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q05",
          question: "Find the sum of the interior angles of an octagon, in degrees.",
          answer: { type: "number", value: 1080, display: "1080°" },
          solution: [
            "Diagonals from one corner split an octagon into 8 − 2 = 6 triangles.",
            "6 × 180 = 1080°",
          ],
          traps: [
            {
              spec: { type: "number", value: 1440 },
              feedback: "8 × 180 counts 8 triangles, but diagonals from one corner split an octagon into only 8 − 2 = 6 triangles.",
            },
          ],
          difficulty: "warmup",
          guideRef: "polygon-angles",
          hints: ["Into how many triangles do the diagonals from one corner split an octagon?", "Use (n − 2) × 180°."],
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q06",
          question:
            "Two straight lines cross. A pair of vertically opposite angles are (5x − 22)° and (3x + 14)°. Find the size of each **obtuse** angle formed, in degrees.",
          answer: { type: "number", value: 112, display: "112°" },
          solution: [
            "Vertically opposite angles are equal: 5x − 22 = 3x + 14.",
            "2x = 36, so x = 18.",
            "Each of these angles is 5 × 18 − 22 = 68° (check: 3 × 18 + 14 = 68 ✓). They are acute.",
            "Each obtuse angle sits on a straight line with a 68° angle: 180 − 68 = 112°.",
          ],
          traps: [
            {
              spec: { type: "number", value: 68 },
              feedback: "68° is the size of the angles given as expressions, and they are acute. The obtuse angles sit on a straight line with them.",
            },
            { spec: { type: "number", value: 18 }, feedback: "18 is x. Substitute it to find the angles." },
          ],
          difficulty: "core",
          guideRef: "angle-facts",
          hints: [
            "What do you know about vertically opposite angles?",
            "Solve 5x − 22 = 3x + 14.",
            "Is your angle acute or obtuse? Use the straight-line fact to get the other one.",
          ],
          strategy: "Form an equation",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q07",
          question: "The arrows show two parallel lines crossed by a transversal. Find the value of x.",
          diagram: `<svg viewBox="0 0 380 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines crossed by a transversal leaning to the left. At the top crossing, the angle above the line and left of the transversal is (3x + 10) degrees. At the bottom crossing, the angle below the line and right of the transversal is (5x − 30) degrees"><rect width="380" height="230" fill="#ffffff"/><path d="M166.3 60 L158.1 37.4 A24 24 0 0 0 142.3 60 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M210 180 L218.2 202.6 A24 24 0 0 0 234 180 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="60" x2="360" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="180" x2="360" y2="180" stroke="#1f2937" stroke-width="2"/><line x1="152.6" y1="22.4" x2="223.7" y2="217.6" stroke="#1f2937" stroke-width="2"/><path d="M328.4 55.4 L335 60 L328.4 64.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M328.4 175.4 L335 180 L328.4 184.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="116.1" y="35.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(3x + 10)°</text><text x="263.7" y="215.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">(5x − 30)°</text></svg>`,
          answer: { type: "number", value: 20, display: "x = 20" },
          solution: [
            "At the bottom crossing, the angle vertically opposite (5x − 30)° is above the line and left of the transversal, so it is also (5x − 30)° (vertically opposite angles are equal).",
            "That angle is in the same position as (3x + 10)° at the top crossing, so they are equal (corresponding angles).",
            "3x + 10 = 5x − 30",
            "40 = 2x, so x = 20.",
            "Check: both angles are 70° ✓",
          ],
          solutions: [
            {
              label: "Through the top crossing instead",
              steps: [
                "At the top crossing, (3x + 10)° is vertically opposite the angle below the line and right of the transversal.",
                "That angle corresponds to (5x − 30)° at the bottom crossing.",
                "So again 3x + 10 = 5x − 30 and x = 20. Either chain works: two equal-angle facts in a row.",
              ],
            },
          ],
          traps: [
            {
              spec: { type: "number", value: 25 },
              feedback: "You made the two angles add to 180°. Follow the chain (vertically opposite, then corresponding): these angles are equal.",
            },
          ],
          difficulty: "core",
          guideRef: "parallel-lines",
          hints: [
            "Can you link the two angles with a chain of two facts?",
            "First move the bottom angle to the opposite side of its own crossing.",
            "Now the two angles are corresponding, so they are equal: 3x + 10 = 5x − 30.",
          ],
          strategy: "Chain angle facts",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q08",
          question: "The angles of a triangle are in the ratio 2 : 3 : 7. Find the size of the largest angle, in degrees.",
          answer: { type: "number", value: 105, display: "105°" },
          solution: [
            "2 + 3 + 7 = 12 parts.",
            "Angles in a triangle add to 180°, so one part = 180 ÷ 12 = 15°.",
            "Largest angle = 7 × 15 = 105°.",
            "Check: 30 + 45 + 105 = 180 ✓",
          ],
          traps: [
            { spec: { type: "number", value: 210 }, feedback: "You shared 360°. The angles of a triangle add to 180°." },
          ],
          difficulty: "core",
          guideRef: "triangles",
          hints: ["How many parts are there altogether?", "What total are the parts sharing?", "Find one part, then multiply by 7."],
          strategy: "Find one part first",
        },
        {
          kind: "written",
          id: "angles-polygons-p2-q09",
          question:
            "Two straight lines cross. One of the angles is 58°, and angle y is next to it, as shown. Wei Ling writes: \"y = 360° − 58° = 302°, because angles around a point add up to 360°.\" Explain her mistake and find the correct value of y.",
          diagram: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two straight lines crossing at a point. One angle is 58 degrees. Angle y is next to it, on the other side of the slanted line"><rect width="360" height="220" fill="#ffffff"/><path d="M180 110 L206 110 A26 26 0 0 0 193.8 88 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M180 110 L191.7 91.3 A22 22 0 0 0 158 110 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="30" y1="110" x2="330" y2="110" stroke="#1f2937" stroke-width="2"/><line x1="119.1" y1="207.5" x2="240.9" y2="12.5" stroke="#1f2937" stroke-width="2"/><text x="220.2" y="92.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">58°</text><text x="160.6" y="80.3" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">y</text></svg>`,
          marks: 3,
          modelAnswer:
            "The 360° fact is about *all four* angles around the crossing point, not just these two. Her answer of 302° is a reflex angle, but y is clearly less than 180°.\n\ny and the 58° angle sit together on one of the straight lines, so they add to 180°.\n\ny = 180° − 58° = 122°. (Check: the four angles are 58°, 122°, 58° and 122°, which do add to 360°.)",
          markScheme: [
            { point: "Explains the error: 360° is the total of all four angles round the point (302° would be reflex)", keywords: ["four angles", "all four", "all the angles", "reflex", "302", "only two"] },
            { point: "y and 58° lie on a straight line, so they add to 180°", keywords: ["straight line", "180"] },
            { point: "y = 122°", keywords: ["122"] },
          ],
          commonError: "Correcting the answer without saying what was wrong with her reason.",
          difficulty: "core",
          guideRef: "angle-facts",
          hints: [
            "Look at the diagram. Is y bigger or smaller than 180°?",
            "Which two angles sit together on one straight line?",
            "Use the straight-line fact instead.",
          ],
          strategy: "Spot the error",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q10",
          question: "ABCD is a kite with AB = AD and CB = CD. ∠BAD = 70° and ∠BCD = 50°. Find ∠ABC, in degrees.",
          answer: { type: "number", value: 120, display: "120°" },
          solution: [
            "The kite is symmetrical about the diagonal AC, so ∠ABC = ∠ADC (the angles between unequal sides).",
            "Angles in a quadrilateral add to 360°: the two equal angles share 360 − 70 − 50 = 240°.",
            "∠ABC = 240 ÷ 2 = 120°.",
          ],
          traps: [
            { spec: { type: "number", value: 240 }, feedback: "240° is the total of the two equal angles. Halve it." },
          ],
          difficulty: "core",
          guideRef: "quadrilaterals",
          hints: [
            "Sketch the kite. Its line of symmetry is AC. Which two angles does the symmetry make equal?",
            "Use the angle sum of a quadrilateral.",
            "Share what is left between the two equal angles.",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q11",
          question: "Each exterior angle of a regular polygon is 18°. Find the sum of its interior angles, in degrees.",
          answer: { type: "number", value: 3240, display: "3240°" },
          solution: ["n = 360 ÷ 18 = 20 sides.", "Interior angle sum = (20 − 2) × 180 = 18 × 180 = 3240°."],
          solutions: [
            {
              label: "Straight-line pairs",
              steps: [
                "At each of the 20 vertices, interior + exterior = 180°, so all 40 angles total 20 × 180 = 3600°.",
                "The exterior angles total 360°, so the interior angles total 3600 − 360 = 3240°.",
                "This is exactly why the (n − 2) × 180° formula works.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 20 }, feedback: "20 is the number of sides. Now use (n − 2) × 180°." },
            { spec: { type: "number", value: 3600 }, feedback: "20 × 180 forgets the −2. The interior sum is (20 − 2) × 180." },
          ],
          difficulty: "core",
          guideRef: "polygon-angles",
          hints: ["Find the number of sides first.", "The exterior angles add to 360°. How many 18° angles is that?", "Use (n − 2) × 180°."],
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q12",
          question: "The exterior angles of a pentagon are 48°, 75°, 62°, 90° and x. Find x, in degrees.",
          answer: { type: "number", value: 85, display: "85°" },
          solution: [
            "The exterior angles of any polygon add to 360°, whether or not it is regular.",
            "48 + 75 + 62 + 90 = 275",
            "x = 360 − 275 = 85°",
          ],
          traps: [
            {
              spec: { type: "number", value: 265 },
              feedback: "540° is the sum of the *interior* angles of a pentagon. The exterior angles of any polygon add to 360°.",
            },
          ],
          difficulty: "core",
          guideRef: "polygon-angles",
          hints: ["Exterior or interior? Which total applies here?", "The exterior angles of every polygon add to the same total."],
        },
        {
          kind: "written",
          id: "angles-polygons-p2-q13",
          question:
            "Zara says: \"One angle of an isosceles triangle is 70°, so the other two angles must be 55° and 55°.\" Explain why Zara might be wrong, and give the other possible pair of angles.",
          marks: 3,
          modelAnswer:
            "Zara has assumed that 70° is the angle between the two equal sides. In that case the other two angles share 180° − 70° = 110°, giving 55° and 55°. That is one possibility.\n\nBut 70° could instead be one of the two equal base angles. Then the other base angle is also 70°.\n\nThe third angle is then 180° − 70° − 70° = 40°. So the other two angles could be 70° and 40°.",
          markScheme: [
            { point: "55° and 55° only works if 70° is the angle between the equal sides", keywords: ["between the equal sides", "apex", "top angle", "55", "110"] },
            { point: "70° could be a base angle, so another angle is also 70°", keywords: ["base angle", "base", "also 70", "two 70", "70 and 70"] },
            { point: "Third angle = 180 − 140 = 40°, giving 70° and 40°", keywords: ["40", "140"] },
          ],
          commonError: "Only finding one case. With isosceles triangles, always ask which angle you have been given.",
          difficulty: "core",
          guideRef: "triangles",
          hints: [
            "In an isosceles triangle, which two angles are equal?",
            "Could 70° be one of the two equal angles instead?",
            "If two angles are 70°, what is the third?",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q14",
          question:
            "Two regular octagons and one other regular polygon fit together exactly around a point, with no gaps or overlaps. How many sides does the other polygon have?",
          answer: { type: "number", value: 4 },
          solution: [
            "Each exterior angle of a regular octagon is 360 ÷ 8 = 45°, so each interior angle is 180 − 45 = 135°.",
            "Two octagons use 2 × 135 = 270° of the 360° around the point.",
            "The gap is 360 − 270 = 90°, the interior angle of a square, which has 4 sides.",
            "This is the octagon-and-square pattern you sometimes see on floor tiles.",
          ],
          traps: [
            { spec: { type: "number", value: 90 }, feedback: "90° is the angle that fills the gap. Which regular polygon has interior angles of 90°?" },
          ],
          difficulty: "core",
          guideRef: "regular-polygon-symmetry",
          hints: [
            "Find the interior angle of a regular octagon.",
            "Angles around a point add to 360°. How much is left after two octagons?",
            "Which regular polygon has that interior angle?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q15",
          question:
            "ABCD is a trapezium with AB parallel to DC. ∠DAB = 64° and ∠BCD = 108°. Find ∠ABC and ∠ADC, in degrees. Give ∠ABC first.",
          answer: { type: "list", values: [72, 116], ordered: true, display: "∠ABC = 72°, ∠ADC = 116°" },
          solution: [
            "AB ∥ DC, so the slanted sides AD and BC are transversals crossing the parallel lines.",
            "∠ABC and ∠BCD are co-interior (between the parallel lines, along BC): ∠ABC = 180 − 108 = 72°.",
            "∠DAB and ∠ADC are co-interior (along AD): ∠ADC = 180 − 64 = 116°.",
            "Check: 64 + 72 + 108 + 116 = 360 ✓",
          ],
          traps: [
            {
              spec: { type: "list", values: [116, 72], ordered: true },
              feedback: "You paired the angles along AB, but AB is one of the parallel sides. Co-interior pairs run along a slanted side: ∠A pairs with ∠D, and ∠B pairs with ∠C.",
            },
          ],
          difficulty: "core",
          guideRef: "quadrilaterals",
          hints: [
            "Sketch the trapezium with AB along the bottom and DC along the top, both horizontal.",
            "Co-interior angles lie along a side that crosses both parallel lines. Which sides do that?",
            "∠A pairs with ∠D, and ∠B pairs with ∠C.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q16",
          question:
            "A ray of light bounces between two parallel mirrors. At each mirror the ray leaves at the same angle to the mirror as it arrives. The ray hits the top mirror at P at 38° to the mirror, travels to Q on the bottom mirror, then bounces off towards R. Find angle y = ∠PQR, in degrees.",
          diagram: `<svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal mirrors. A ray of light rises to P on the top mirror, meeting it at 38 degrees, reflects down to Q on the bottom mirror, then reflects up towards R. Angle y is the angle PQR between the two parts of the ray at Q"><rect width="460" height="250" fill="#ffffff"/><line x1="20" y1="50" x2="28" y2="40" stroke="#334155" stroke-width="1"/><line x1="20" y1="200" x2="12" y2="210" stroke="#334155" stroke-width="1"/><line x1="40" y1="50" x2="48" y2="40" stroke="#334155" stroke-width="1"/><line x1="40" y1="200" x2="32" y2="210" stroke="#334155" stroke-width="1"/><line x1="60" y1="50" x2="68" y2="40" stroke="#334155" stroke-width="1"/><line x1="60" y1="200" x2="52" y2="210" stroke="#334155" stroke-width="1"/><line x1="80" y1="50" x2="88" y2="40" stroke="#334155" stroke-width="1"/><line x1="80" y1="200" x2="72" y2="210" stroke="#334155" stroke-width="1"/><line x1="100" y1="50" x2="108" y2="40" stroke="#334155" stroke-width="1"/><line x1="100" y1="200" x2="92" y2="210" stroke="#334155" stroke-width="1"/><line x1="120" y1="50" x2="128" y2="40" stroke="#334155" stroke-width="1"/><line x1="120" y1="200" x2="112" y2="210" stroke="#334155" stroke-width="1"/><line x1="140" y1="50" x2="148" y2="40" stroke="#334155" stroke-width="1"/><line x1="140" y1="200" x2="132" y2="210" stroke="#334155" stroke-width="1"/><line x1="160" y1="50" x2="168" y2="40" stroke="#334155" stroke-width="1"/><line x1="160" y1="200" x2="152" y2="210" stroke="#334155" stroke-width="1"/><line x1="180" y1="50" x2="188" y2="40" stroke="#334155" stroke-width="1"/><line x1="180" y1="200" x2="172" y2="210" stroke="#334155" stroke-width="1"/><line x1="200" y1="50" x2="208" y2="40" stroke="#334155" stroke-width="1"/><line x1="200" y1="200" x2="192" y2="210" stroke="#334155" stroke-width="1"/><line x1="220" y1="50" x2="228" y2="40" stroke="#334155" stroke-width="1"/><line x1="220" y1="200" x2="212" y2="210" stroke="#334155" stroke-width="1"/><line x1="240" y1="50" x2="248" y2="40" stroke="#334155" stroke-width="1"/><line x1="240" y1="200" x2="232" y2="210" stroke="#334155" stroke-width="1"/><line x1="260" y1="50" x2="268" y2="40" stroke="#334155" stroke-width="1"/><line x1="260" y1="200" x2="252" y2="210" stroke="#334155" stroke-width="1"/><line x1="280" y1="50" x2="288" y2="40" stroke="#334155" stroke-width="1"/><line x1="280" y1="200" x2="272" y2="210" stroke="#334155" stroke-width="1"/><line x1="300" y1="50" x2="308" y2="40" stroke="#334155" stroke-width="1"/><line x1="300" y1="200" x2="292" y2="210" stroke="#334155" stroke-width="1"/><line x1="320" y1="50" x2="328" y2="40" stroke="#334155" stroke-width="1"/><line x1="320" y1="200" x2="312" y2="210" stroke="#334155" stroke-width="1"/><line x1="340" y1="50" x2="348" y2="40" stroke="#334155" stroke-width="1"/><line x1="340" y1="200" x2="332" y2="210" stroke="#334155" stroke-width="1"/><line x1="360" y1="50" x2="368" y2="40" stroke="#334155" stroke-width="1"/><line x1="360" y1="200" x2="352" y2="210" stroke="#334155" stroke-width="1"/><line x1="380" y1="50" x2="388" y2="40" stroke="#334155" stroke-width="1"/><line x1="380" y1="200" x2="372" y2="210" stroke="#334155" stroke-width="1"/><line x1="400" y1="50" x2="408" y2="40" stroke="#334155" stroke-width="1"/><line x1="400" y1="200" x2="392" y2="210" stroke="#334155" stroke-width="1"/><line x1="420" y1="50" x2="428" y2="40" stroke="#334155" stroke-width="1"/><line x1="420" y1="200" x2="412" y2="210" stroke="#334155" stroke-width="1"/><line x1="440" y1="50" x2="448" y2="40" stroke="#334155" stroke-width="1"/><line x1="440" y1="200" x2="432" y2="210" stroke="#334155" stroke-width="1"/><path d="M130 50 L100 50 A30 30 0 0 0 106.4 68.5 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M322 200 L340.9 185.2 A24 24 0 0 0 303.1 185.2 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="10" y1="50" x2="450" y2="50" stroke="#1f2937" stroke-width="3"/><line x1="10" y1="200" x2="450" y2="200" stroke="#1f2937" stroke-width="3"/><polyline points="27.6,130 130,50 322,200 424.4,120" fill="none" stroke="#b45309" stroke-width="2"/><path d="M70.8 90.4 L78.8 90 L76.5 97.7" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M223.7 117.3 L226 125 L218 124.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M365.2 160.4 L373.2 160 L370.8 167.7" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="84.6" y="70.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">38°</text><text x="322" y="167.3" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">y</text><text x="130" y="36.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">P</text><text x="322" y="228.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Q</text><text x="428.4" y="112.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">R</text><text x="400" y="34.2" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">mirror</text><text x="60" y="232.2" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">mirror</text></svg>`,
          answer: { type: "number", value: 104, display: "104°" },
          solution: [
            "The ray arrives at P at 38°, so it leaves at 38°: PQ makes 38° with the top mirror.",
            "The angle between PQ and the bottom mirror at Q is also 38° (alternate angles, because the mirrors are parallel).",
            "The ray leaves Q at 38° to the mirror too.",
            "Angles on a straight line at Q: y = 180 − 38 − 38 = 104°.",
          ],
          traps: [
            {
              spec: { type: "number", value: 38 },
              feedback: "38° is the angle between the ray and a mirror. y is the angle between the two parts of the ray at Q.",
            },
            { spec: { type: "number", value: 76 }, feedback: "76° is 2 × 38°. y sits on the straight mirror between two 38° angles." },
          ],
          difficulty: "core",
          guideRef: "parallel-lines",
          hints: [
            "What angle does PQ make with the top mirror?",
            "Use alternate angles to carry that angle down to Q.",
            "At Q, y sits between two 38° angles on the straight mirror.",
          ],
          strategy: "Chain angle facts",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q17",
          question: "The sum of the interior angles of a polygon is 7 times the sum of its exterior angles. How many sides does the polygon have?",
          answer: { type: "number", value: 16 },
          solution: [
            "The exterior angles of any polygon add to 360°, so the interior angles add to 7 × 360 = 2520°.",
            "(n − 2) × 180 = 2520",
            "n − 2 = 14, so n = 16.",
          ],
          solutions: [
            {
              label: "Count straight-line pairs",
              steps: [
                "At every vertex interior + exterior = 180°, so the total of all the angles is 180n.",
                "That total is the interior sum plus the exterior sum: 7 × 360 + 360 = 8 × 360 = 2880°.",
                "n = 2880 ÷ 180 = 16. No formula needed, and just as quick.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 14 }, feedback: "14 is n − 2, the number of triangles. Add 2." },
          ],
          difficulty: "challenge",
          guideRef: "polygon-angles",
          hints: [
            "What is the sum of the exterior angles of any polygon?",
            "So what do the interior angles add up to?",
            "Work backwards through (n − 2) × 180°.",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "written",
          id: "angles-polygons-p2-q18",
          question:
            "Explain why regular hexagons tessellate (fit together around every point with no gaps or overlaps) but regular pentagons do not.",
          marks: 4,
          modelAnswer:
            "For shapes to tessellate, the angles meeting at each point must add to exactly 360°.\n\nA regular hexagon has interior angles of (6 − 2) × 180 ÷ 6 = 120°, and 3 × 120° = 360°, so three hexagons fit exactly around a point.\n\nA regular pentagon has interior angles of (5 − 2) × 180 ÷ 5 = 108°.\n\nThree pentagons make 324°, leaving a 36° gap, and four make 432°, which overlaps. 108 does not divide exactly into 360, so regular pentagons cannot tessellate.",
          markScheme: [
            { point: "Interior angle of a regular hexagon is 120°", keywords: ["120"] },
            { point: "3 × 120 = 360, so three hexagons fit exactly round a point", keywords: ["3 × 120", "3 x 120", "three", "360"] },
            { point: "Interior angle of a regular pentagon is 108°", keywords: ["108"] },
            { point: "360 is not a multiple of 108: 3 × 108 = 324 leaves a gap, 4 × 108 = 432 overlaps", keywords: ["324", "432", "gap", "overlap", "not a multiple", "does not divide", "doesn't divide"] },
          ],
          commonError: "Saying \"pentagons have an odd number of sides\". The real test is whether the interior angle divides exactly into 360°.",
          difficulty: "challenge",
          guideRef: "regular-polygon-symmetry",
          hints: [
            "What must the angles meeting at a point add up to?",
            "Work out the interior angle of each shape.",
            "Does each interior angle divide exactly into 360°?",
          ],
          strategy: "Use the angle sum around a point",
        },
        {
          kind: "short",
          id: "angles-polygons-p2-q19",
          question:
            "A regular hexagon ABCDEF and a square ABXY share the side AB, and lie on opposite sides of it. F and Y are joined. Find ∠AFY, in degrees.",
          diagram: `<svg viewBox="0 0 340 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A regular hexagon ABCDEF and a square ABXY share the side AB and lie on opposite sides of it. The segment FY is drawn"><rect width="340" height="280" fill="#ffffff"/><polygon points="210,120 210,200 140.7,240 71.4,200 71.4,120 140.7,80" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><polygon points="210,120 210,200 290,200 290,120" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="140.7" y1="80" x2="290" y2="120" stroke="#334155" stroke-width="1.8" stroke-dasharray="6 4"/><path d="M210 131 L221 131 L221 120" fill="none" stroke="#334155" stroke-width="1.2"/><text x="140.7" y="260.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="57.6" y="212.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text><text x="57.6" y="116.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">E</text><text x="140.7" y="68.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">F</text><text x="197" y="138.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="197" y="192.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="302" y="216.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">X</text><text x="302" y="116.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">Y</text></svg>`,
          answer: { type: "number", value: 15, display: "15°" },
          solution: [
            "The interior angle of a regular hexagon is 120°, so ∠FAB = 120°.",
            "∠BAY = 90° (angle of the square).",
            "Angles around point A add to 360°: ∠FAY = 360 − 120 − 90 = 150°.",
            "AF = AB = AY (sides of the hexagon and the square are all equal to AB), so triangle FAY is isosceles.",
            "∠AFY = (180 − 150) ÷ 2 = 15°.",
          ],
          traps: [
            {
              spec: { type: "number", value: 150 },
              feedback: "150° is ∠FAY, the angle at A. The question asks for ∠AFY, an angle at F in the isosceles triangle FAY.",
            },
            { spec: { type: "number", value: 30 }, feedback: "30° is the total of the two base angles of triangle FAY. Halve it." },
          ],
          difficulty: "challenge",
          guideRef: "polygon-angles",
          hints: [
            "Find all the angles that meet at A.",
            "Which angles at A do you know? What is left around the point?",
            "Which sides of triangle AFY are equal?",
          ],
          strategy: "Look for isosceles triangles",
        },
        {
          kind: "written",
          id: "angles-polygons-p2-q20",
          question:
            "Prove that the exterior angles of any convex polygon with n sides add up to 360°. You may use the fact that its interior angles add up to (n − 2) × 180°.",
          marks: 3,
          modelAnswer:
            "At each vertex, the interior angle and the exterior angle lie on a straight line, so they add to 180°.\n\nThere are n vertices, so all the interior and exterior angles together add to 180n degrees.\n\nThe interior angles add to (n − 2) × 180 = 180n − 360 degrees. So the exterior angles add to 180n − (180n − 360) = 360°. This does not depend on n, so it is true for every convex polygon.",
          markScheme: [
            { point: "At each vertex interior + exterior = 180° (angles on a straight line)", keywords: ["straight line", "180", "each vertex"] },
            { point: "So all n interior and n exterior angles together total 180n", keywords: ["180n", "180 × n", "n × 180", "180 x n", "n lots"] },
            { point: "Exterior sum = 180n − (180n − 360) = 360°", keywords: ["360", "180n - 360", "180n − 360", "subtract"] },
          ],
          commonError: "Checking a hexagon or a square only. A proof has to work for every value of n.",
          solutions: [
            {
              label: "Walk around it",
              steps: [
                "Walk around the polygon, turning at each corner through its exterior angle.",
                "When you get back to the start you are facing the way you began, having made exactly one full turn.",
                "So the exterior angles add to 360°. This version doesn't even need the interior-angle formula.",
              ],
            },
          ],
          difficulty: "challenge",
          guideRef: "angle-proofs",
          hints: [
            "What do an interior angle and its exterior angle add up to?",
            "Add this up over all n vertices.",
            "Take away the interior total, (n − 2) × 180°, and simplify.",
          ],
          strategy: "Introduce a variable",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET — AoPS / UKMT Junior flavour
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "angles-polygons-ch-q01",
      question: "In triangle ABC, AB = AC. Point D lies on AC so that AD = BD = BC. Find ∠BAC, in degrees.",
      diagram: `<svg viewBox="0 0 380 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with AB equal to AC. Point D is on AC, and BD is drawn. The marked lengths AD, BD and BC are equal"><rect width="380" height="290" fill="#ffffff"/><polygon points="190,44.6 120,260 260,260" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="260" x2="233.3" y2="177.7" stroke="#1f2937" stroke-width="2"/><path d="M190 44.6 L180.7 73.1 A30 30 0 0 0 199.3 73.1 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><line x1="217.3" y1="109.3" x2="205.9" y2="113" stroke="#1f2937" stroke-width="1.6"/><line x1="173.1" y1="214" x2="180.2" y2="223.7" stroke="#1f2937" stroke-width="1.6"/><line x1="190" y1="254" x2="190" y2="266" stroke="#1f2937" stroke-width="1.6"/><text x="190" y="35.1" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="108" y="278.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="272" y="278.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="247.3" y="184.3" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text><text x="190" y="95.5" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">?</text></svg>`,
      answer: { type: "number", value: 36, display: "36°" },
      solution: [
        "Let ∠BAC = x.",
        "AD = BD, so triangle ABD is isosceles and ∠ABD = ∠BAD = x.",
        "∠BDC is an exterior angle of triangle ABD, so ∠BDC = x + x = 2x.",
        "BD = BC, so triangle BDC is isosceles and ∠BCD = ∠BDC = 2x.",
        "AB = AC, so ∠ABC = ∠ACB = 2x.",
        "Angles in triangle ABC: x + 2x + 2x = 180, so 5x = 180 and x = 36°.",
      ],
      solutions: [
        {
          label: "Start from a base angle",
          steps: [
            "Let ∠ACB = y. Triangle BDC is isosceles (BD = BC), so ∠BDC = y and ∠DBC = 180 − 2y.",
            "AB = AC, so ∠ABC = y too, which makes ∠ABD = y − (180 − 2y) = 3y − 180.",
            "Triangle ABD is isosceles (AD = BD), so ∠BAD = 3y − 180 as well.",
            "Triangle ABC: (3y − 180) + y + y = 180, so 5y = 360, y = 72 and ∠BAC = 3 × 72 − 180 = 36°.",
            "The first method is slicker: naming the *smallest* angle x makes every other angle a simple multiple of x.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 72 }, feedback: "72° is ∠ABC (and ∠ACB). The question asks for the angle at A, the smallest angle." },
      ],
      difficulty: "challenge",
      guideRef: "triangles",
      hints: [
        "Call the angle you want x. Which other angles can you write in terms of x?",
        "Triangle ABD is isosceles (AD = BD). What is ∠ABD?",
        "∠BDC is an exterior angle of triangle ABD, so it is 2x. Now use the other two isosceles triangles.",
        "You should find that the angles of triangle ABC are x, 2x and 2x.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q02",
      question:
        "The diagram shows a five-pointed star drawn with five straight lines. The star is **not** regular. Find a + b + c + d + e, the sum of the angles at its five points, in degrees.",
      diagram: `<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An irregular five-pointed star drawn with five straight lines. The angles at its five points are labelled a, b, c, d and e"><rect width="380" height="300" fill="#ffffff"/><path d="M178.5 26.5 L173.2 47.8 A22 22 0 0 0 185.9 47.2 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M296.9 108.1 L275 108.8 A22 22 0 0 0 280.1 122.3 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><path d="M263.4 262.9 L256 242.1 A22 22 0 0 0 246 249.4 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M121.2 256.3 L138 242.1 A22 22 0 0 0 126.5 235 Z" fill="#fecaca" stroke="#334155" stroke-width="0.8"/><path d="M71.6 114.9 L89 128.3 A22 22 0 0 0 93.6 114.2 Z" fill="#bae6fd" stroke="#334155" stroke-width="0.8"/><polygon points="178.5,26.5 263.4,262.9 71.6,114.9 296.9,108.1 121.2,256.3" fill="none" stroke="#1f2937" stroke-width="2" stroke-linejoin="miter"/><text x="180.3" y="67.4" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">a</text><text x="263.3" y="125.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">b</text><text x="242.2" y="238.6" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">c</text><text x="140.2" y="230.6" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">d</text><text x="105.8" y="130.9" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle">e</text></svg>`,
      answer: { type: "number", value: 180, display: "180°" },
      solution: [
        "Name each point by the capital of its angle: A (angle a), B, C, D, E, going round. The star is made of the lines AC, CE, EB, BD and DA.",
        "Line EB crosses AD at Q and AC at P, giving a triangle APQ with angle a at A.",
        "∠APQ is an exterior angle of triangle PCE, so ∠APQ = c + e.",
        "∠AQP is an exterior angle of triangle QDB, so ∠AQP = b + d.",
        "Angles in triangle APQ: a + (c + e) + (b + d) = 180°.",
      ],
      solutions: [
        {
          label: "Try a special case",
          steps: [
            "If every star gives the same total, a regular star will reveal it.",
            "The pentagon in the middle of a regular star has angles of 108°, so each small point-triangle has base angles of 180 − 108 = 72°.",
            "Each point is 180 − 72 − 72 = 36°, and 5 × 36 = 180°.",
            "This is slicker for *finding* the number, but only the exterior-angle method *proves* it for every star.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 540 }, feedback: "540° is the angle sum of the pentagon in the middle, not of the five points." },
        { spec: { type: "number", value: 360 }, feedback: "Not quite. Try a regular star first: what is each point angle there?" },
      ],
      difficulty: "challenge",
      guideRef: "polygon-angles",
      hints: [
        "Try the easiest star first: a regular one. How big is each point?",
        "For a general star, look at the triangle formed by point a and the line that runs across the star opposite it.",
        "The other two angles of that triangle are exterior angles of smaller triangles. Use the exterior angle fact.",
        "You should reach a + (c + e) + (b + d) = 180°.",
      ],
      strategy: "Try a special case",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q03",
      question: "What is the smaller angle between the hour hand and the minute hand of a clock at 8:20? Give your answer in degrees.",
      answer: { type: "number", value: 130, display: "130°" },
      solution: [
        "The minute hand turns 360° in 60 minutes: 6° per minute. At 20 minutes past, it points 20 × 6 = 120° clockwise from 12.",
        "The hour hand turns 30° per hour, which is 0.5° per minute. At 8:20 it has turned 8 × 30 + 20 × 0.5 = 240 + 10 = 250° from 12.",
        "The angle between the hands is 250 − 120 = 130°. This is less than 180°, so it is the smaller angle.",
      ],
      solutions: [
        {
          label: "Count the hour gaps",
          steps: [
            "Each gap between neighbouring numbers is 360 ÷ 12 = 30°.",
            "From the 4 (where the minute hand points) to the 8 is 4 gaps: 120°.",
            "In 20 minutes the hour hand moves {{20/60}} = {{1/3}} of a gap past the 8, which is 10° further from the minute hand.",
            "Angle = 120 + 10 = 130°. This is quicker for mental work.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 120 },
          feedback: "At 8:20 the hour hand is not exactly on the 8. It has moved a third of the way towards the 9.",
        },
        { spec: { type: "number", value: 110 }, feedback: "The hour hand moves towards the 9, which takes it further from the minute hand, not closer." },
      ],
      difficulty: "challenge",
      guideRef: "angle-facts",
      hints: [
        "Exactly where is the minute hand, in degrees clockwise from 12?",
        "The hour hand doesn't sit still on the 8. How far does it move in 20 minutes?",
        "In 60 minutes the hour hand moves one 30° gap, so in 20 minutes it moves a third of that.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q04",
      question:
        "How many different regular polygons have an interior angle that is a whole number of degrees? (Count each number of sides once: equilateral triangle, square, regular pentagon, …)",
      answer: { type: "number", value: 22 },
      solution: [
        "Interior angle = 180° − exterior angle, so it is a whole number exactly when the exterior angle, 360 ÷ n, is a whole number.",
        "So n must be a factor of 360, and n must be at least 3.",
        "The factors of 360 are 1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180 and 360: 24 factors.",
        "Remove 1 and 2 (there is no polygon with 1 or 2 sides): 24 − 2 = 22.",
      ],
      solutions: [
        {
          label: "Count factors with prime factors",
          steps: [
            "{{360 = 2^3 * 3^2 * 5}}.",
            "A factor uses 2 to the power 0, 1, 2 or 3 (4 choices), 3 to the power 0, 1 or 2 (3 choices) and 5 to the power 0 or 1 (2 choices).",
            "Number of factors = 4 × 3 × 2 = 24.",
            "Remove n = 1 and n = 2: 22 regular polygons. This is slicker than listing, and you can't miss one.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 24 }, feedback: "You counted every factor of 360, including 1 and 2. A polygon needs at least 3 sides." },
        { spec: { type: "number", value: 23 }, feedback: "Close. A 2-sided polygon doesn't exist either." },
      ],
      difficulty: "challenge",
      guideRef: "polygon-angles",
      hints: [
        "Interior angles are awkward. When is the exterior angle a whole number?",
        "The exterior angle is 360 ÷ n. So what must n be?",
        "Count the factors of 360. List them in pairs so you don't miss any.",
        "Which factors are too small to be a number of sides?",
      ],
      strategy: "Clever counting",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q05",
      question:
        "The arrows show two parallel lines. A zig-zag path goes from A on the top line, through B and C, to D on the bottom line, with the angles marked. Find x, in degrees.",
      diagram: `<svg viewBox="0 0 380 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel lines. A zig-zag path goes from A on the top line to B, then to C, then to D on the bottom line. The angle at A between the top line, to the right, and AB is 35 degrees. Angle x is at B, between BA and BC. The angle at C between CB and CD is 70 degrees. The angle at D between DC and the bottom line, to the left, is 45 degrees"><rect width="380" height="310" fill="#ffffff"/><path d="M130 50 L157.9 69.5 A34 34 0 0 0 164 50 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M230 120 L208.7 105.1 A26 26 0 0 0 206.4 131 Z" fill="#c7d2fe" stroke="#334155" stroke-width="0.8"/><path d="M101.3 180 L119.7 198.4 A26 26 0 0 0 124.9 169 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M191.3 270 L170.1 248.8 A30 30 0 0 0 161.3 270 Z" fill="#fecaca" stroke="#334155" stroke-width="0.8"/><line x1="20" y1="50" x2="360" y2="50" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="270" x2="360" y2="270" stroke="#1f2937" stroke-width="2"/><polyline points="130,50 230,120 101.3,180 191.3,270" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M328.4 45.4 L335 50 L328.4 54.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M328.4 265.4 L335 270 L328.4 274.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><text x="183.4" y="71.4" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">35°</text><text x="190.1" y="121.8" font-size="15" font-family="sans-serif" fill="#1f2937" text-anchor="middle">x</text><text x="144.6" y="192.2" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">70°</text><text x="145.1" y="255.4" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">45°</text><text x="130" y="40.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="244" y="124.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="87.3" y="184.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="191.3" y="292.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text></svg>`,
      answer: { type: "number", value: 60, display: "60°" },
      solution: [
        "Draw a line through C parallel to the two given lines. It splits the 70° angle at C into two parts.",
        "The lower part is 45°: alternate angles with the 45° at D.",
        "So the upper part is 70 − 45 = 25°.",
        "Now draw a line through B parallel to the others. It splits x into two parts: the upper part is 35° (alternate with the angle at A) and the lower part is 25° (alternate with the upper part at C).",
        "x = 35 + 25 = 60°.",
      ],
      solutions: [
        {
          label: "Left-pointing corners balance right-pointing corners",
          steps: [
            "Each corner of the path points left or right. A and C point left (their angles open to the right); B and D point right.",
            "Between two parallel lines, the angles at left-pointing corners add to the same total as the angles at right-pointing corners.",
            "35 + 70 = x + 45, so x = 60°.",
            "The rule comes from drawing a parallel line through every corner, as in the first method. Once proved, it is much quicker.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 150 }, feedback: "You added all three given angles. Draw parallel lines through B and C and look for Z shapes." },
      ],
      difficulty: "challenge",
      guideRef: "parallel-lines",
      hints: [
        "There's no triangle to use. What extra lines could help?",
        "Draw a line through C parallel to the two given lines. What does it do to the 70° angle?",
        "Do the same at B. Each part of each angle is alternate to another angle in the diagram.",
        "x splits into 35° and the upper part of the angle at C.",
      ],
      strategy: "Add a construction line",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q06",
      question:
        "A square, a regular pentagon and a regular polygon with n sides fit together exactly around a point, with no gaps or overlaps. Find n.",
      answer: { type: "number", value: 20 },
      solution: [
        "Interior angles: square 90°, regular pentagon 108°.",
        "Around a point: 90 + 108 + third angle = 360, so the third polygon's interior angle is 162°.",
        "Its exterior angle is 180 − 162 = 18°, so n = 360 ÷ 18 = 20.",
      ],
      solutions: [
        {
          label: "The one-half rule",
          steps: [
            "The interior angle of a regular n-gon is {{180 - 360/n}} degrees.",
            "Three regular polygons with a, b and c sides fit around a point exactly when {{1/a + 1/b + 1/c = 1/2}}. (Add the three interior angles, set the total equal to 360 and simplify.)",
            "{{1/4 + 1/5 + 1/n = 1/2}}, so {{1/n = 1/2 - 9/20 = 1/20}} and n = 20.",
            "The first method is easier to follow; the rule is slicker once you know it, and it finds every possible trio quickly.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 18 }, feedback: "18° is the exterior angle of the third polygon. Now n = 360 ÷ 18." },
        { spec: { type: "number", value: 162 }, feedback: "162° is the interior angle of the third polygon. Convert it to a number of sides." },
      ],
      difficulty: "challenge",
      guideRef: "regular-polygon-symmetry",
      hints: [
        "What are the interior angles of a square and a regular pentagon?",
        "How much of the 360° around the point is left for the third polygon?",
        "A regular polygon with interior angle 162° has exterior angle 18°. How many sides is that?",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q07",
      question:
        "A robot on a flat floor repeats one instruction: move forward 1 metre, then turn 25° to the left. After how many moves is it back at its starting point for the first time?",
      answer: { type: "number", value: 72 },
      solution: [
        "Every move is the previous move turned through 25°. So all the corners of the path lie on one circle, spaced 25° apart around its centre, like a regular polygon or star.",
        "The robot is back at the start exactly when it has gone round that centre a whole number of times: its total turning, 25k degrees after k moves, must be a multiple of 360°.",
        "{{25 = 5^2}} and {{360 = 2^3 * 3^2 * 5}}, so LCM(25, 360) = {{2^3 * 3^2 * 5^2}} = 1800.",
        "k = 1800 ÷ 25 = 72 moves. The robot has turned 1800° = 5 full turns, tracing a 72-pointed star.",
      ],
      solutions: [
        {
          label: "List multiples of 360",
          steps: [
            "We need the first multiple of 360 that 25 divides into: 360, 720, 1080, 1440, 1800, …",
            "360 has only one factor of 5 and 25 needs two, so the first one is 5 × 360 = 1800.",
            "1800 ÷ 25 = 72 moves. Same answer by trial; the LCM is slicker.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 14.4 },
          feedback: "360 ÷ 25 = 14.4 is not a whole number of moves. The robot needs a total turn that is a whole number of complete turns.",
        },
        { spec: { type: "number", value: 15 }, feedback: "After 15 moves it has turned 375°, which is not a whole number of turns, so it is not back yet." },
      ],
      difficulty: "challenge",
      guideRef: "polygon-angles",
      hints: [
        "Try easier turns first. If it turned 90° each time, when would it be back? What about 72°?",
        "In those cases the total turning when it gets back is 360°. What must be true about the total turning in general?",
        "After k moves it has turned 25k degrees. Find the smallest k that makes 25k a multiple of 360.",
        "Find the LCM of 25 and 360.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "angles-polygons-ch-q08",
      question:
        "A convex polygon has every interior angle less than 180°, and it can have any number of sides. What is the greatest number of **acute** interior angles it can have?",
      answer: { type: "number", value: 3 },
      solution: [
        "Use exterior angles. If an interior angle is acute (less than 90°), its exterior angle is more than 90°.",
        "The exterior angles of a convex polygon are all positive and add to exactly 360°.",
        "Four exterior angles each greater than 90° would add to more than 360°, which is impossible. So at most 3 interior angles can be acute.",
        "3 is possible: any acute-angled triangle (such as 60°, 60°, 60°), or a quadrilateral with angles 80°, 80°, 80° and 120°.",
      ],
      solutions: [
        {
          label: "Interior angles and an inequality",
          steps: [
            "Suppose an n-sided convex polygon has k acute angles. Each is less than 90° and each other angle is less than 180°.",
            "So the angle sum is less than 90k + 180(n − k) = 180n − 90k.",
            "But the angle sum is exactly 180n − 360. So 180n − 360 < 180n − 90k, which gives 90k < 360 and k < 4.",
            "Same answer with more algebra: the exterior-angle method is slicker.",
          ],
        },
      ],
      traps: [
        {
          spec: { type: "number", value: 4 },
          feedback: "Four acute interior angles would need four exterior angles, each bigger than 90°. Can those fit into a total of 360°?",
        },
      ],
      difficulty: "challenge",
      guideRef: "polygon-angles",
      hints: [
        "Try triangles and quadrilaterals first. How many acute angles can each have?",
        "Switch to exterior angles. If an interior angle is acute, what do you know about its exterior angle?",
        "The exterior angles add to 360°. How many angles bigger than 90° can fit into 360°?",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "angles-polygons-ch-q09",
      question: "In triangle ABC, D is a point on BC such that DA = DB = DC. Prove that ∠BAC = 90°.",
      diagram: `<svg viewBox="0 0 380 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with D on BC. Segment AD is drawn. The marked lengths DA, DB and DC are equal"><rect width="380" height="250" fill="#ffffff"/><polygon points="130.8,93.1 50,220 330,220" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><line x1="130.8" y1="93.1" x2="190" y2="220" stroke="#1f2937" stroke-width="2"/><line x1="155" y1="159.1" x2="165.9" y2="154" stroke="#1f2937" stroke-width="1.6"/><line x1="120" y1="226" x2="120" y2="214" stroke="#1f2937" stroke-width="1.6"/><line x1="260" y1="214" x2="260" y2="226" stroke="#1f2937" stroke-width="1.6"/><circle cx="190" cy="220" r="2.5" fill="#1f2937"/><text x="130.8" y="83.7" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="38" y="238.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="342" y="238.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="190" y="244.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text></svg>`,
      marks: 4,
      modelAnswer:
        "DA = DB, so triangle ABD is isosceles and its base angles are equal. Call them p: ∠DBA = ∠DAB = p.\n\nDA = DC, so triangle ACD is isosceles. Call its base angles q: ∠DCA = ∠DAC = q.\n\nThen ∠BAC = ∠DAB + ∠DAC = p + q.\n\nThe angles of triangle ABC are p (at B), p + q (at A) and q (at C), and they add to 180°: 2p + 2q = 180°, so p + q = 90°. Therefore ∠BAC = 90°.",
      markScheme: [
        { point: "Uses the two isosceles triangles: ∠DAB = ∠DBA and ∠DAC = ∠DCA", keywords: ["isosceles", "base angles", "equal"] },
        { point: "Writes ∠BAC as the sum of the two parts (p + q)", keywords: ["p + q", "p+q", "sum", "add"] },
        { point: "Angle sum of triangle ABC: 2p + 2q = 180", keywords: ["2p + 2q", "2p+2q", "180", "triangle abc"] },
        { point: "Concludes p + q = 90, so ∠BAC = 90°", keywords: ["90", "p + q = 90", "right angle"] },
      ],
      commonError: "Measuring the diagram, or assuming AB = AC. The proof must work wherever A is, as long as DA = DB = DC.",
      solutions: [
        {
          label: "Exterior angle at D",
          steps: [
            "∠ADC is an exterior angle of triangle ABD, so ∠ADC = p + p = 2p.",
            "Angles in triangle ADC: 2p + q + q = 180, so p + q = 90.",
            "So ∠BAC = p + q = 90°. Both routes are equally short; this one uses one small triangle instead of the big one.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "angle-proofs",
      hints: [
        "Mark the equal lengths. How many isosceles triangles can you see?",
        "Call the equal base angles of the left triangle p, and of the right triangle q.",
        "Write ∠BAC in terms of p and q, then use the angle sum of the big triangle ABC.",
        "2p + 2q = 180. What is p + q?",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "angles-polygons-ch-q10",
      question:
        "Always, sometimes or never? \"In a parallelogram ABCD, the bisectors of ∠A and ∠B meet at a right angle.\" Decide, and prove your answer.",
      diagram: `<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram ABCD with AB at the bottom. Dashed lines bisect the angles at A and B and meet at P inside the parallelogram"><rect width="440" height="250" fill="#ffffff"/><polygon points="50,220 310,220 390,81.4 130,81.4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><path d="M50 220 L80 220 A30 30 0 0 0 76 205 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M50 220 L76 205 A30 30 0 0 0 65 194 Z" fill="#fde68a" stroke="#334155" stroke-width="0.8"/><path d="M310 220 L322 199.2 A24 24 0 0 0 298 199.2 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><path d="M310 220 L298 199.2 A24 24 0 0 0 286 220 Z" fill="#bbf7d0" stroke="#334155" stroke-width="0.8"/><line x1="50" y1="220" x2="245" y2="107.4" stroke="#334155" stroke-width="1.8" stroke-dasharray="6 4"/><line x1="310" y1="220" x2="245" y2="107.4" stroke="#334155" stroke-width="1.8" stroke-dasharray="6 4"/><path d="M173.4 215.4 L180 220 L173.4 224.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M333.4 76.8 L340 81.4 L333.4 86" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M82.7 154.1 L90 150.7 L90.7 158.7" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M86.2 148 L93.5 144.7 L94.2 152.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M342.7 154.1 L350 150.7 L350.7 158.7" fill="none" stroke="#1f2937" stroke-width="1.6"/><path d="M346.2 148 L353.5 144.7 L354.2 152.6" fill="none" stroke="#1f2937" stroke-width="1.6"/><circle cx="245" cy="107.4" r="2.5" fill="#1f2937"/><text x="245" y="98" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">P</text><text x="40" y="240.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="320" y="240.6" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text><text x="402" y="80" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">C</text><text x="118" y="80" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle">D</text></svg>`,
      marks: 4,
      modelAnswer:
        "Always.\n\nLet the bisectors of ∠A and ∠B meet at P. AD is parallel to BC and AB crosses both, so ∠A and ∠B are co-interior angles: ∠A + ∠B = 180°.\n\nThe bisectors cut these angles in half, so ∠PAB + ∠PBA = {{1/2}} × 180° = 90°.\n\nThe angles of triangle APB add to 180°, so ∠APB = 180° − 90° = 90°. Nothing depended on the particular parallelogram, so the bisectors always meet at a right angle.",
      markScheme: [
        { point: "States 'always'", keywords: ["always"] },
        { point: "∠A + ∠B = 180° because they are co-interior angles (AD ∥ BC)", keywords: ["co-interior", "allied", "parallel", "180"] },
        { point: "The halves add to 90°: ∠PAB + ∠PBA = 90°", keywords: ["half", "halves", "90", "bisect"] },
        { point: "Angle sum of triangle APB gives ∠APB = 180 − 90 = 90°", keywords: ["triangle", "180 - 90", "180 − 90", "right angle"] },
      ],
      commonError: "Testing one parallelogram (or a rectangle) and stopping. An example shows it can happen; only a proof shows it always does.",
      solutions: [
        {
          label: "Use letters for the angles",
          steps: [
            "Let ∠A = 2a and ∠B = 2b, so the bisectors make angles a and b with AB.",
            "Co-interior angles: 2a + 2b = 180, so a + b = 90.",
            "Triangle APB: ∠APB = 180 − (a + b) = 90°.",
            "Writing the angles as 2a and 2b avoids halving fractions, so it is slightly slicker.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "quadrilaterals",
      hints: [
        "Draw a slanted parallelogram (not a rectangle) and both bisectors. Test a case: if ∠A = 60°, what is ∠B, and what angle do the bisectors make?",
        "∠A and ∠B are co-interior angles. What do they add up to?",
        "What do their halves add up to?",
        "Look at the triangle formed by A, B and the meeting point P.",
      ],
      strategy: "Test a case, then prove",
    },
  ],
};
