import type { Topic } from "../types";

export const anglesPolygons: Topic = {
  id: "angles-polygons",
  title: "Angles & Polygons",
  subject: "Maths",
  icon: "📐",
  strand: "Geometry & Measure",
  intro:
    "Angle facts on lines and around points, the angle sums of triangles and quadrilaterals, the special angles made by parallel lines, and the interior and exterior angles of any polygon — the rules that let you find a missing angle without measuring.",
  guide: [
    {
      heading: "Angles on lines and around points",
      discovery: {
        problem:
          "Three angles meet on a straight line at one point. Two of them are 90° and 35°. What is the third? And if four angles met all the way around a single point instead, what would they add to?",
        idea: "Angles on a straight line add to 180°, so the third is 180 − 90 − 35 = 55°. Angles all the way around a point add to 360°. A straight line is 'half a full turn', a point is 'a full turn'.",
      },
      body:
        "An angle measures a turn, in degrees (°). A full turn is **360°**, a half turn (a straight line) is **180°**, and a quarter turn (a right angle) is **90°**.\n\nWhen several angles sit on a straight line, they add to 180°. When several angles fill the space around a single point, they add to 360°.\n\nWhen two straight lines cross, the angles **opposite** each other are equal — these are *vertically opposite* angles.",
      diagrams: [
        '<svg viewBox="0 0 220 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two angles a and b sitting on a straight line, adding to 180 degrees"><line x1="10" y1="90" x2="210" y2="90" stroke="black" stroke-width="2"/><line x1="110" y1="90" x2="160" y2="20" stroke="black" stroke-width="2"/><text x="70" y="80" font-size="16">a</text><text x="140" y="78" font-size="16">b</text><text x="40" y="112" font-size="13">a + b = 180°</text></svg>',
      ],
      keyPoints: [
        "Angles on a straight line add to 180°.",
        "Angles around a point add to 360°.",
        "Vertically opposite angles (where two lines cross) are equal.",
        "A right angle is 90°; the small square marks it.",
      ],
      strategies: ["Label the angle you want as a letter", "Write an equation from the angle fact"],
      whyItWorks:
        "A straight line is half of a full turn, so it is 360° ÷ 2 = 180°. Vertically opposite angles are equal because each of the two crossing angles makes 180° with the same neighbour, so they must match.",
    },
    {
      heading: "Angles in triangles and quadrilaterals",
      discovery: {
        problem:
          "Tear the three corners off a paper triangle and place them side by side, points touching. They always form a straight line. What does that tell you their angles must add to? What about a four-sided shape?",
        idea: "The three corners fit exactly onto a straight line, so a triangle's angles add to 180°. A quadrilateral splits into two triangles, so its angles add to 2 × 180 = 360°.",
      },
      body:
        "The angles inside a **triangle** always add to **180°**. The angles inside a **quadrilateral** always add to **360°**.\n\nThis lets you find a missing angle: add the known angles, then subtract from the total.\n\nWatch for special triangles: an *isosceles* triangle has two equal sides and the two **base angles** are equal; an *equilateral* triangle has all three angles 60°.",
      diagrams: [
        '<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangle with angles labelled a, b and c that add to 180 degrees"><polygon points="20,110 180,110 70,20" fill="none" stroke="black" stroke-width="2"/><text x="30" y="103" font-size="15">a</text><text x="158" y="103" font-size="15">b</text><text x="66" y="40" font-size="15">c</text><text x="40" y="128" font-size="13">a + b + c = 180°</text></svg>',
      ],
      keyPoints: [
        "Triangle angle sum = 180°.",
        "Quadrilateral angle sum = 360°.",
        "Isosceles triangle: the two base angles are equal.",
        "Equilateral triangle: every angle is 60°.",
      ],
      strategies: ["Subtract known angles from the total", "Use equal base angles in isosceles triangles"],
      whyItWorks:
        "Any quadrilateral can be cut by one diagonal into two triangles. Each triangle contributes 180°, and together their angles make up the quadrilateral's, so the total is 2 × 180 = 360°.",
    },
    {
      heading: "Angles in parallel lines",
      discovery: {
        problem:
          "A straight line crosses two parallel lines. One angle measures 110°. Several other angles in the picture are also 110° and the rest are 70°. Can you predict which is which before measuring?",
        idea: "Where a transversal cuts parallel lines, angles in matching positions (corresponding, like an F-shape) are equal, and alternate angles (a Z-shape) are equal. Co-interior angles (a C/U-shape) add to 180°.",
      },
      body:
        "When a straight line (a **transversal**) crosses two **parallel** lines, special pairs of angles appear:\n\n- **Corresponding angles** are equal — they sit in matching positions (an *F-shape*).\n- **Alternate angles** are equal — on opposite sides of the transversal, between the lines (a *Z-shape*).\n- **Co-interior** (allied) angles add to 180° — same side, between the lines (a *C* or *U-shape*).",
      diagrams: [
        '<svg viewBox="0 0 220 150" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A transversal crossing two parallel lines, showing equal alternate angles x"><line x1="10" y1="45" x2="210" y2="45" stroke="black" stroke-width="2"/><line x1="10" y1="110" x2="210" y2="110" stroke="black" stroke-width="2"/><line x1="60" y1="20" x2="170" y2="135" stroke="black" stroke-width="2"/><text x="95" y="40" font-size="14">x</text><text x="118" y="125" font-size="14">x</text><text x="20" y="148" font-size="12">alternate angles equal</text></svg>',
      ],
      keyPoints: [
        "Corresponding angles (F-shape) are equal.",
        "Alternate angles (Z-shape) are equal.",
        "Co-interior angles (C/U-shape) add to 180°.",
        "These only hold when the lines are parallel (look for the arrows).",
      ],
      strategies: ["Spot the F, Z or C shape", "Step across the figure one angle fact at a time"],
      whyItWorks:
        "Alternate angles are equal because each equals the same corresponding (or vertically opposite) angle. Co-interior angles add to 180° because one of them sits on a straight line with the alternate of the other.",
    },
    {
      heading: "Interior and exterior angles of polygons",
      discovery: {
        problem:
          "A pentagon (5 sides) can be split from one corner into triangles. How many triangles do you get, and so what do its interior angles add to? Now imagine walking once around the outside — through what total angle do you turn?",
        idea: "A pentagon splits into 5 − 2 = 3 triangles, so its interior angles total 3 × 180 = 540°. Walking once round any polygon you turn through one full circle, so the exterior angles always add to 360°.",
      },
      body:
        "Split a polygon with **n** sides into triangles from one corner: you always get **(n − 2)** triangles. So the interior angles add to:\n\n**Sum of interior angles = (n − 2) × 180°**\n\nThe **exterior angle** at each corner is the angle you turn through; the exterior angles of any polygon add to **360°**.\n\nIn a **regular** polygon all sides and angles are equal, so each exterior angle = 360° ÷ n, and each interior angle = 180° − (360° ÷ n).",
      diagrams: [
        '<svg viewBox="0 0 200 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pentagon split from one vertex into three triangles, interior angles total 540 degrees"><polygon points="100,15 175,70 145,150 55,150 25,70" fill="none" stroke="black" stroke-width="2"/><line x1="100" y1="15" x2="145" y2="150" stroke="gray" stroke-width="1"/><line x1="100" y1="15" x2="55" y2="150" stroke="gray" stroke-width="1"/><text x="55" y="100" font-size="12">3 triangles → 540°</text></svg>',
      ],
      keyPoints: [
        "Interior angle sum = (n − 2) × 180°.",
        "Exterior angles of any polygon add to 360°.",
        "Regular polygon: each exterior angle = 360° ÷ n.",
        "Regular polygon: each interior angle = 180° − exterior angle.",
      ],
      strategies: [
        "For regular polygons, find the exterior angle first (360 ÷ n)",
        "To find n from an angle, work back through the exterior angle",
      ],
      whyItWorks:
        "Drawing all diagonals from one vertex of an n-sided polygon makes exactly (n − 2) triangles, each with angle sum 180°, so the interior total is (n − 2) × 180°. The exterior angles total 360° because walking once around the shape is one complete turn.",
    },
  ],
  learn: {
    cards: [
      { front: "Angles on a straight line add to…", back: "180°." },
      { front: "Angles around a point add to…", back: "360°." },
      { front: "Vertically opposite angles are…", back: "Equal (where two lines cross)." },
      { front: "Angle sum of a triangle", back: "180°." },
      { front: "Angle sum of a quadrilateral", back: "360°." },
      { front: "Alternate angles (Z-shape) are…", back: "Equal — on parallel lines." },
      { front: "Co-interior angles (C-shape)…", back: "Add to 180° — on parallel lines." },
      { front: "Interior angle sum of an n-gon", back: "(n − 2) × 180°." },
      { front: "Exterior angles of any polygon add to…", back: "360°." },
      { front: "Each exterior angle of a regular n-gon", back: "360° ÷ n." },
    ],
  },
  quiz: {
    mcq: [
      {
        id: "angles-mcq-q01",
        question: "Two angles lie on a straight line. One is 125°. What is the other?",
        options: ["55°", "65°", "75°", "235°"],
        answerIndex: 0,
        explanation: "Angles on a straight line add to 180°: 180 − 125 = 55°.",
        difficulty: "warmup",
        guideRef: "Angles on lines and around points",
        strategy: "Subtract from 180°",
      },
      {
        id: "angles-mcq-q02",
        question: "A triangle has angles 40° and 75°. What is the third angle?",
        options: ["55°", "65°", "75°", "115°"],
        answerIndex: 1,
        explanation: "Triangle angles add to 180°: 180 − 40 − 75 = 65°.",
        difficulty: "warmup",
        guideRef: "Angles in triangles and quadrilaterals",
        strategy: "Subtract known angles from 180°",
      },
      {
        id: "angles-mcq-q03",
        question:
          "A transversal crosses two parallel lines. An angle of 72° is marked. Its co-interior angle (same side, between the lines) is:",
        options: ["72°", "108°", "118°", "288°"],
        answerIndex: 1,
        explanation: "Co-interior angles add to 180°: 180 − 72 = 108°.",
        difficulty: "core",
        guideRef: "Angles in parallel lines",
        hints: [
          "Which parallel-line pair adds to 180° rather than being equal?",
          "Co-interior (C/U-shape) angles are supplementary.",
          "180 − 72 = 108°.",
        ],
        strategy: "Identify the C-shape, then use 180°",
      },
      {
        id: "angles-mcq-q04",
        question: "What is the sum of the interior angles of a hexagon (6 sides)?",
        options: ["540°", "720°", "900°", "1080°"],
        answerIndex: 1,
        explanation: "(n − 2) × 180 = (6 − 2) × 180 = 4 × 180 = 720°.",
        difficulty: "core",
        guideRef: "Interior and exterior angles of polygons",
        hints: ["Use (n − 2) × 180°.", "n = 6, so (6 − 2) = 4 triangles.", "4 × 180 = 720°."],
        strategy: "Apply (n − 2) × 180°",
      },
      {
        id: "angles-mcq-q05",
        question: "Each exterior angle of a regular polygon is 40°. How many sides does it have?",
        options: ["8", "9", "10", "12"],
        answerIndex: 1,
        explanation: "Exterior angles add to 360°, so n = 360 ÷ 40 = 9 sides.",
        difficulty: "challenge",
        guideRef: "Interior and exterior angles of polygons",
        hints: [
          "The exterior angles of any polygon add to 360°.",
          "For a regular polygon each is 360° ÷ n.",
          "Solve 360 ÷ n = 40, so n = 360 ÷ 40.",
        ],
        strategy: "Work back through the exterior angle",
      },
      {
        id: "angles-mcq-q06",
        question: "Each interior angle of a regular polygon is 156°. How many sides does it have?",
        options: ["12", "15", "18", "20"],
        answerIndex: 1,
        explanation: "Exterior angle = 180 − 156 = 24°. Then n = 360 ÷ 24 = 15 sides.",
        difficulty: "challenge",
        guideRef: "Interior and exterior angles of polygons",
        hints: [
          "Interior and exterior angles at a corner add to 180°.",
          "Find the exterior angle: 180 − 156 = 24°.",
          "n = 360 ÷ 24.",
        ],
        strategy: "Interior → exterior → 360 ÷ exterior",
      },
    ],
    qa: [
      {
        id: "angles-qa-q01",
        question:
          "Three angles meet around a point. They are x, 2x and 150°. Form an equation and find x.",
        modelAnswer: "Around a point: x + 2x + 150 = 360, so 3x = 210 and x = 70°.",
        markScheme: ["x + 2x + 150 = 360 [1]", "3x = 210 [1]", "x = 70° [1]"],
        commonError: "Using 180° instead of 360° for angles around a point.",
        difficulty: "core",
        guideRef: "Angles on lines and around points",
        hints: ["Angles around a point add to 360°.", "Collect: x + 2x = 3x.", "Subtract 150, then divide by 3."],
        strategy: "Write an equation and solve",
      },
      {
        id: "angles-qa-q02",
        question:
          "An isosceles triangle has an apex angle of 50°. Find each base angle, explaining your method.",
        modelAnswer:
          "The two base angles are equal. They share 180 − 50 = 130°, so each is 130 ÷ 2 = 65°.",
        markScheme: [
          "States base angles are equal [1]",
          "180 − 50 = 130° remaining [1]",
          "Each base angle = 130 ÷ 2 = 65° [1]",
        ],
        difficulty: "core",
        guideRef: "Angles in triangles and quadrilaterals",
        hints: ["Two angles in an isosceles triangle are equal.", "Subtract the apex from 180° first.", "Share the rest equally."],
        strategy: "Use equal base angles",
        solutions: [
          {
            label: "Subtract then halve",
            steps: ["Remaining = 180 − 50 = 130°", "Two equal base angles share it", "Each = 130 ÷ 2 = 65°"],
          },
          {
            label: "Algebra",
            steps: ["Let each base angle be b", "50 + b + b = 180", "2b = 130, so b = 65°"],
          },
        ],
      },
      {
        id: "angles-qa-q03",
        question:
          "The interior angles of a quadrilateral are 3x, 4x, 5x and 6x. Find the value of x and the size of the largest angle.",
        modelAnswer:
          "Sum = 360°: 3x + 4x + 5x + 6x = 18x = 360, so x = 20°. Largest = 6x = 120°.",
        markScheme: ["18x = 360 [1]", "x = 20° [1]", "Largest = 6 × 20 = 120° [1]"],
        difficulty: "challenge",
        guideRef: "Angles in triangles and quadrilaterals",
        hints: [
          "Quadrilateral angles add to 360°.",
          "Add the multiples of x: 3 + 4 + 5 + 6 = 18.",
          "Solve 18x = 360, then work out 6x.",
        ],
        strategy: "Sum the parts, solve for x, then evaluate",
      },
      {
        id: "angles-qa-q04",
        question:
          "Challenge: Each interior angle of a regular polygon is 160°. How many sides does it have, and what is the sum of its interior angles? Show full reasoning.",
        modelAnswer:
          "Exterior angle = 180 − 160 = 20°. Number of sides n = 360 ÷ 20 = 18. Interior sum = (18 − 2) × 180 = 16 × 180 = 2880°.",
        markScheme: [
          "Exterior angle = 180 − 160 = 20° [1]",
          "n = 360 ÷ 20 = 18 [1]",
          "Sum = (18 − 2) × 180 = 2880° [1]",
        ],
        commonError: "Trying to divide 160 into 360, instead of using the exterior angle.",
        difficulty: "challenge",
        guideRef: "Interior and exterior angles of polygons",
        hints: [
          "Find the exterior angle first (it pairs with the interior to 180°).",
          "n = 360 ÷ exterior angle.",
          "Then use (n − 2) × 180 for the interior sum.",
        ],
        strategy: "Interior → exterior → n → interior sum",
      },
    ],
  },
  questionBank: {
    mcqPapers: [
      {
        id: "angles-mcq-paper-1",
        title: "Angles & Polygons — MCQ Set A",
        questions: [
          {
            id: "angles-mcq-b1-q01",
            question: "What is the size of a right angle?",
            options: ["45°", "90°", "180°", "360°"],
            answerIndex: 1,
            explanation: "A right angle is a quarter turn = 90°.",
            difficulty: "warmup",
          },
          {
            id: "angles-mcq-b1-q02",
            question: "Two lines cross. One angle is 63°. The angle vertically opposite it is:",
            options: ["27°", "63°", "117°", "297°"],
            answerIndex: 1,
            explanation: "Vertically opposite angles are equal, so it is 63°.",
            difficulty: "warmup",
          },
          {
            id: "angles-mcq-b1-q03",
            question: "A transversal crosses two parallel lines. An alternate angle to 48° measures:",
            options: ["42°", "48°", "132°", "312°"],
            answerIndex: 1,
            explanation: "Alternate angles (Z-shape) are equal, so it is 48°.",
            difficulty: "core",
            strategy: "Spot the Z-shape",
          },
          {
            id: "angles-mcq-b1-q04",
            question: "What is each interior angle of a regular hexagon?",
            options: ["108°", "120°", "135°", "144°"],
            answerIndex: 1,
            explanation: "Exterior angle = 360 ÷ 6 = 60°, so interior = 180 − 60 = 120°.",
            difficulty: "core",
            hints: ["Find the exterior angle first: 360 ÷ 6.", "Interior = 180 − exterior."],
            strategy: "Exterior first, then 180 − exterior",
          },
          {
            id: "angles-mcq-b1-q05",
            question: "A right-angled triangle has one other angle of 31°. The third angle is:",
            options: ["59°", "69°", "149°", "61°"],
            answerIndex: 0,
            explanation: "180 − 90 − 31 = 59°.",
            difficulty: "core",
            strategy: "Subtract from 180°",
          },
          {
            id: "angles-mcq-b1-q06",
            question: "The interior angles of a polygon add to 1080°. How many sides has it?",
            options: ["6", "7", "8", "9"],
            answerIndex: 2,
            explanation: "(n − 2) × 180 = 1080, so n − 2 = 6, giving n = 8.",
            difficulty: "challenge",
            hints: ["Use (n − 2) × 180 = 1080.", "Divide both sides by 180.", "n − 2 = 6, so n = 8."],
            strategy: "Solve (n − 2) × 180 = sum",
          },
        ],
      },
      {
        id: "angles-mcq-paper-2",
        title: "Angles & Polygons — MCQ Set B",
        questions: [
          {
            id: "angles-mcq-b2-q01",
            question: "Angles around a point are 90°, 130° and y. Find y.",
            options: ["50°", "140°", "150°", "220°"],
            answerIndex: 1,
            explanation: "360 − 90 − 130 = 140°.",
            difficulty: "warmup",
          },
          {
            id: "angles-mcq-b2-q02",
            question: "Every angle of an equilateral triangle is:",
            options: ["45°", "60°", "90°", "120°"],
            answerIndex: 1,
            explanation: "180 ÷ 3 = 60°.",
            difficulty: "warmup",
          },
          {
            id: "angles-mcq-b2-q03",
            question: "A transversal crosses parallel lines. A corresponding angle to 115° is:",
            options: ["65°", "115°", "245°", "25°"],
            answerIndex: 1,
            explanation: "Corresponding angles (F-shape) are equal, so 115°.",
            difficulty: "core",
            strategy: "Spot the F-shape",
          },
          {
            id: "angles-mcq-b2-q04",
            question: "What is each exterior angle of a regular octagon?",
            options: ["40°", "45°", "60°", "135°"],
            answerIndex: 1,
            explanation: "Exterior angles add to 360°: 360 ÷ 8 = 45°.",
            difficulty: "core",
            strategy: "360 ÷ n",
          },
          {
            id: "angles-mcq-b2-q05",
            question: "A quadrilateral has angles 100°, 80°, 100° and z. Find z.",
            options: ["60°", "70°", "80°", "100°"],
            answerIndex: 2,
            explanation: "360 − 100 − 80 − 100 = 80°.",
            difficulty: "core",
            strategy: "Subtract from 360°",
          },
          {
            id: "angles-mcq-b2-q06",
            question: "A regular polygon has an interior angle of 162°. How many sides has it?",
            options: ["18", "20", "24", "30"],
            answerIndex: 1,
            explanation: "Exterior angle = 180 − 162 = 18°, so n = 360 ÷ 18 = 20.",
            difficulty: "challenge",
            hints: [
              "Find the exterior angle: 180 − 162.",
              "n = 360 ÷ exterior angle.",
              "360 ÷ 18 = 20.",
            ],
            strategy: "Interior → exterior → 360 ÷ exterior",
          },
        ],
      },
    ],
    qaPapers: [
      {
        id: "angles-qa-paper-1",
        title: "Angles & Polygons — Written Set A",
        questions: [
          {
            id: "angles-qa-b1-q01",
            question: "Angles on a straight line are 2a, 3a and 40°. Form an equation and find a.",
            modelAnswer: "2a + 3a + 40 = 180, so 5a = 140 and a = 28°.",
            markScheme: ["2a + 3a + 40 = 180 [1]", "5a = 140 [1]", "a = 28° [1]"],
            difficulty: "core",
            strategy: "Write an equation from the 180° fact",
          },
          {
            id: "angles-qa-b1-q02",
            question:
              "Explain, using triangles, why the interior angles of a hexagon add to 720°.",
            modelAnswer:
              "A hexagon can be split from one corner into 6 − 2 = 4 triangles. Each triangle's angles add to 180°, so the total is 4 × 180 = 720°.",
            markScheme: [
              "Splits hexagon into 4 triangles (n − 2) [1]",
              "Each triangle = 180° [1]",
              "4 × 180 = 720° [1]",
            ],
            difficulty: "core",
            guideRef: "Interior and exterior angles of polygons",
            strategy: "Split into triangles",
          },
          {
            id: "angles-qa-b1-q03",
            question:
              "Challenge: In a triangle, the angles are in the ratio 2 : 3 : 4. Find all three angles.",
            modelAnswer:
              "The parts total 2 + 3 + 4 = 9, sharing 180°. One part = 180 ÷ 9 = 20°. Angles: 2 × 20 = 40°, 3 × 20 = 60°, 4 × 20 = 80°.",
            markScheme: [
              "Total parts 2 + 3 + 4 = 9 [1]",
              "One part = 180 ÷ 9 = 20° [1]",
              "Angles 40°, 60°, 80° [1]",
            ],
            commonError: "Forgetting the angles must add to 180° before sharing.",
            difficulty: "challenge",
            guideRef: "Angles in triangles and quadrilaterals",
            hints: [
              "The three angles add to 180°.",
              "Add the ratio parts and divide 180 by the total.",
              "Multiply that one part by 2, 3 and 4.",
            ],
            strategy: "Ratio sharing within an angle sum",
            solutions: [
              {
                label: "Unitary (one part)",
                steps: ["2 + 3 + 4 = 9 parts", "180 ÷ 9 = 20° per part", "40°, 60°, 80°"],
              },
              {
                label: "Algebra",
                steps: ["Angles 2x, 3x, 4x", "2x + 3x + 4x = 180 → 9x = 180", "x = 20 → 40°, 60°, 80°"],
              },
            ],
          },
          {
            id: "angles-qa-b1-q04",
            question:
              "Challenge: In a regular polygon the interior angle is 3 times the exterior angle. How many sides does the polygon have?",
            modelAnswer:
              "Interior + exterior = 180° at each corner. With interior = 3 × exterior, let the exterior be e: e + 3e = 180, so 4e = 180 and e = 45°. Then n = 360 ÷ 45 = 8 sides (a regular octagon).",
            markScheme: [
              "e + 3e = 180 (interior + exterior = 180) [1]",
              "4e = 180, e = 45° [1]",
              "n = 360 ÷ 45 = 8 [1]",
            ],
            difficulty: "challenge",
            guideRef: "Interior and exterior angles of polygons",
            hints: [
              "Interior + exterior = 180° at each corner.",
              "Interior is 3 × the exterior, so 3e + e = 180.",
              "Find e, then n = 360 ÷ e.",
            ],
            strategy: "Set up interior + exterior = 180, then 360 ÷ e",
          },
        ],
      },
    ],
  },
};
