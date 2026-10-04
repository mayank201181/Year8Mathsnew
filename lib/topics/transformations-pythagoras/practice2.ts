// Transformations & Symmetry (Pythagoras preview) — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "transformations-pythagoras-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q01",
        question:
          "A ceiling fan in an HDB flat has 5 identical blades, equally spaced around its centre. What is the smallest angle the fan can turn through so that it looks exactly the same as before? Give your answer in degrees.",
        answer: { type: "number", value: 72, display: "72°" },
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "5 is the order of rotational symmetry. The question asks for the angle: share one full turn (360°) between the 5 fits." },
          { spec: { type: "number", value: 36 }, feedback: "You divided 180° by 5. A full turn is 360°, so the angle is 360° ÷ 5." },
        ],
        solution: [
          "The 5 identical blades mean the fan fits onto its own outline 5 times in one full turn: rotational symmetry of order 5.",
          "The 5 equal turns share 360° between them.",
          "Smallest turn = 360° ÷ 5 = 72°.",
        ],
        commonError: "Giving the order of rotational symmetry (5) instead of the angle.",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["How many times does the fan fit onto itself in one full turn?", "Share 360° equally between those turns."],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q02",
        question:
          "The hour hand of a clock points at 2. It turns through 90° clockwise. Which number does it point at now?",
        answer: { type: "number", value: 5 },
        traps: [
          { spec: { type: "number", value: 11 }, feedback: "That's 90° anticlockwise. Clockwise is the way the hands normally move: 2 → 3 → 4 → 5." },
          { spec: { type: "number", value: 3 }, feedback: "Neighbouring numbers are only 30° apart, so a 90° turn moves the hand 3 numbers, not 1." },
        ],
        solution: [
          "12 numbers share a full turn of 360°, so neighbouring numbers are 360° ÷ 12 = 30° apart.",
          "90° ÷ 30° = 3, so the hand moves on 3 numbers.",
          "Clockwise from 2: 3, 4, 5. It points at 5.",
        ],
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["How many degrees apart are neighbouring numbers on a clock face?", "360° ÷ 12 = 30°. How many 30° steps make 90°?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q03",
        question:
          "On a map grid, the MRT exit is at (2, −3) and the bus stop is at (−4, 1). Wei Ling walks straight from the MRT exit to the bus stop. Which column vector describes her journey? Type the top number, then the bottom number.",
        answer: { type: "list", values: [-6, 4], ordered: true, display: "(−6 over 4)" },
        traps: [
          { spec: { type: "list", values: [6, -4], ordered: true }, feedback: "That vector goes from the bus stop back to the MRT exit. Work out end − start for each coordinate." },
        ],
        solution: [
          "Across: −4 − 2 = −6, so 6 to the left.",
          "Up or down: 1 − (−3) = 4, so 4 up.",
          "The column vector is (−6 over 4).",
        ],
        commonError: "Working out start − end, which reverses both signs.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["How far across does she go, and which way?", "For each coordinate work out end − start: −4 − 2 across, then 1 − (−3) up."],
        strategy: "Count across first, then up or down",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q04",
        question:
          "A garden designer at Gardens by the Bay plans a flower bed that is symmetrical about the line x = 3. A lamp post stands at (−1, 5). Where must the matching lamp post go? Give its coordinates.",
        answer: { type: "list", values: [7, 5], ordered: true, display: "(7, 5)" },
        traps: [
          { spec: { type: "list", values: [1, 5], ordered: true }, feedback: "That's the reflection in the y-axis (x = 0). The mirror here is x = 3: count 4 units to the line, then 4 more past it." },
          { spec: { type: "list", values: [-1, 1], ordered: true }, feedback: "x = 3 is a vertical line (every point on it has x-coordinate 3), so the y-coordinate stays 5 and only x changes." },
        ],
        solution: [
          "x = 3 is a vertical line, so only the x-coordinate changes.",
          "From x = −1 to the mirror at x = 3 is 4 units to the right.",
          "Go the same 4 units past the mirror: x = 3 + 4 = 7.",
          "The matching lamp post is at (7, 5).",
        ],
        commonError: "Reflecting in the y-axis instead of in x = 3.",
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["Is x = 3 a vertical or a horizontal line?", "How far is the lamp post from the mirror line? Go the same distance on the other side."],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q05",
        question:
          "Priya's photo is 9 cm by 6 cm. She has it enlarged by scale factor 4 to make a poster. What is the perimeter of the poster? Give your answer in cm.",
        answer: { type: "number", value: 120, display: "120 cm" },
        traps: [
          { spec: { type: "number", value: 46 }, feedback: "An enlargement multiplies every length by the scale factor — it doesn't add 4 cm to each side." },
          { spec: { type: "number", value: 864 }, feedback: "864 cm² is the poster's area. The perimeter is the distance around the edge." },
        ],
        solution: [
          "The poster is 9 × 4 = 36 cm by 6 × 4 = 24 cm.",
          "Perimeter = 36 + 24 + 36 + 24 = 120 cm.",
        ],
        solutions: [
          { label: "Scale the perimeter directly", steps: ["The photo's perimeter is 9 + 6 + 9 + 6 = 30 cm.", "Every length is multiplied by 4, so the perimeter is too: 30 × 4 = 120 cm."] },
        ],
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["What happens to every length in an enlargement with scale factor 4?", "Find the poster's width and height, then add all four sides."],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q06",
        question:
          "A decorative cart wheel has 8 spokes, equally spaced. The spokes are painted alternately red and silver. Counting the colours as part of the design, what is the smallest angle the wheel can turn through so that it looks exactly the same? Give your answer in degrees.",
        answer: { type: "number", value: 90, display: "90°" },
        traps: [
          { spec: { type: "number", value: 45 }, feedback: "A 45° turn moves every red spoke to where a silver one was, so the wheel looks different. The colours must match too." },
          { spec: { type: "number", value: 4 }, feedback: "4 is the order of rotational symmetry. The question asks for the angle: 360° ÷ 4." },
        ],
        solution: [
          "Without the colours, 8 equal spokes would give order 8 and a smallest turn of 360° ÷ 8 = 45°.",
          "But a 45° turn moves each red spoke to a silver spoke's position, so the wheel looks different.",
          "A 90° turn moves every red spoke onto a red position and every silver spoke onto a silver position.",
          "So the order of rotational symmetry is 4 and the smallest turn is 360° ÷ 4 = 90°.",
        ],
        commonError: "Ignoring the colours and answering 45°.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Imagine turning the wheel on by one spoke (45°). Do the colours still match?",
          "A turn that works must send every red spoke to a red position. How many red spokes are there?",
          "There are 4 red spokes, so the wheel fits onto itself 4 times in a full turn.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q07",
        question:
          "On a treasure map, a translation maps the jetty J(1, −2) onto the lighthouse L(5, 1). The same translation maps the cave C onto the palm tree P(−2, 6). Where is the cave? Give its coordinates.",
        answer: { type: "list", values: [-6, 3], ordered: true, display: "(−6, 3)" },
        traps: [
          { spec: { type: "list", values: [2, 9], ordered: true }, feedback: "You moved the palm tree forwards. The cave is the START of the translation, so undo it: subtract the vector instead of adding it." },
        ],
        solution: [
          "Jetty to lighthouse: across 5 − 1 = 4, up 1 − (−2) = 3. The translation is (4 over 3).",
          "The cave moves by (4 over 3) to reach the palm tree, so go backwards from P: subtract 4 across and 3 up.",
          "C = (−2 − 4, 6 − 3) = (−6, 3).",
          "Check: (−6 + 4, 3 + 3) = (−2, 6) = P ✓.",
        ],
        commonError: "Adding the vector to P instead of subtracting it.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "First find the column vector that takes J to L.",
          "The cave is where the move starts and the palm tree is where it ends. How do you get back from P to C?",
          "Use the reverse vector (−4 over −3) on P.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q08",
        question:
          "On a park map, a fountain is at F(−3, 4). Its reflection in a straight path is at F′(−3, −10). The path is the mirror line y = k. Find k.",
        answer: { type: "number", value: -3 },
        traps: [
          { spec: { type: "number", value: 7 }, feedback: "7 is the distance from each point to the path (half of 14). The path itself is 7 below F: 4 − 7 = ?" },
          { spec: { type: "number", value: -6 }, feedback: "You added the y-coordinates but didn't halve. The mirror line is at the midpoint: (4 + (−10)) ÷ 2." },
        ],
        solution: [
          "F and F′ have the same x-coordinate, so the mirror line is horizontal: y = k.",
          "The mirror line is halfway between them: k = (4 + (−10)) ÷ 2 = −6 ÷ 2 = −3.",
          "Check: F is 4 − (−3) = 7 units above y = −3, and F′ is −3 − (−10) = 7 units below it ✓.",
        ],
        commonError: "Giving the distance to the mirror (7) instead of the position of the mirror line.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Every point and its image are the same distance from the mirror line.",
          "So the mirror line is exactly halfway between F and F′. Which y-coordinate is halfway between 4 and −10?",
          "Halfway = (4 + (−10)) ÷ 2.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q09",
        question:
          "For her CCA badge, Siti wants a design with rotational symmetry of order 4 but **no** lines of symmetry. Her friend says, \"That's impossible — anything with rotational symmetry of order 4 has 4 lines of symmetry, like a square.\" Is her friend right? Explain, either by describing a design that works or by explaining why none can.",
        marks: 3,
        modelAnswer:
          "No, the friend is wrong. A pinwheel (toy windmill) design works: four identical blades round a centre, each bent the same way, say clockwise. Turning it through 90° moves each blade onto the next one, so it fits onto itself 4 times in a full turn — order 4. But reflecting it in any line makes the blades bend the other way (anticlockwise), so no mirror line maps it onto itself: it has no lines of symmetry. A square has both kinds of symmetry, but rotational symmetry on its own does not force line symmetry.",
        markScheme: [
          { point: "States the friend is wrong (such a design is possible)", keywords: ["wrong", "not right", "possible", "no"] },
          { point: "Gives a valid example, e.g. a pinwheel or four identical blades all bent the same way", keywords: ["pinwheel", "windmill", "blades", "propeller", "same way", "same direction"] },
          { point: "Explains order 4 (fits after every 90° turn) and no lines (a reflection reverses the direction of the blades)", keywords: ["90", "4 times", "quarter", "reverse", "reflection", "mirror", "other way", "flip"] },
        ],
        commonError: "Assuming that rotational symmetry and line symmetry always come together.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Think of a toy windmill, or a fan whose blades all lean the same way.",
          "Turn it a quarter-turn: does it look the same? Now imagine it in a mirror — which way do the blades lean?",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q10",
        question:
          "On a building-site plan, a tower crane's arm turns about its pivot at C(2, 1). The hook is at H(2, 6). The arm turns through 90° clockwise. Where is the hook now? Give its coordinates.",
        answer: { type: "list", values: [7, 1], ordered: true, display: "(7, 1)" },
        traps: [
          { spec: { type: "list", values: [-3, 1], ordered: true }, feedback: "That's a quarter-turn anticlockwise. Clockwise from 'straight up' points to the right." },
          { spec: { type: "list", values: [6, -2], ordered: true }, feedback: "You turned about the origin (0, 0). The arm turns about its pivot C(2, 1), so work with the step from C to the hook." },
        ],
        solution: [
          "Step from the pivot to the hook: (2 − 2, 6 − 1), so 0 across and 5 up.",
          "A quarter-turn clockwise turns 'up' into 'right': the step becomes 5 across and 0 up.",
          "New position: (2 + 5, 1 + 0) = (7, 1).",
          "Check: the hook is still 5 units from the pivot ✓.",
        ],
        commonError: "Using the rule for turning about the origin when the centre is somewhere else.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Where is the hook compared with the pivot — how far across and how far up?",
          "The arm points straight up from C. After a clockwise quarter-turn, which way does it point?",
          "It now points to the right and is still 5 units long.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q11",
        question:
          "Arjun makes a shadow puppet. A small torch is 30 cm from a cardboard cut-out and 120 cm from the wall. The cut-out is 8 cm tall and is parallel to the wall. The shadow is an enlargement of the cut-out with the torch as the centre of enlargement. How tall is the shadow? Give your answer in cm.",
        answer: { type: "number", value: 32, display: "32 cm" },
        traps: [
          { spec: { type: "number", value: 24 }, feedback: "You used 120 − 30 = 90 cm, the gap between the cut-out and the wall. A scale factor compares distances from the centre (the torch): 120 ÷ 30." },
        ],
        solution: [
          "Distances are measured from the centre of enlargement, which is the torch.",
          "Scale factor = 120 ÷ 30 = 4.",
          "Shadow height = 8 × 4 = 32 cm.",
        ],
        commonError: "Measuring from the cut-out to the wall instead of from the torch.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Where is the centre of enlargement?",
          "Compare how far the wall is from the torch with how far the cut-out is from the torch.",
          "Scale factor = 120 ÷ 30.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q12",
        question:
          "Two photo frames are similar rectangles. The small frame is 12 cm by 18 cm. The shorter side of the large frame is 30 cm. How long is the longer side of the large frame? Give your answer in cm.",
        answer: { type: "number", value: 45, display: "45 cm" },
        traps: [
          { spec: { type: "number", value: 36 }, feedback: "Adding the same 18 cm to each side keeps the difference, not the shape. Similar shapes multiply every length by the same scale factor." },
        ],
        solution: [
          "Similar shapes: every length is multiplied by the same scale factor.",
          "Shorter sides: scale factor = 30 ÷ 12 = 2.5.",
          "Longer side = 18 × 2.5 = 45 cm.",
        ],
        solutions: [
          { label: "Compare sides within one frame", steps: ["In the small frame, the longer side is 18 ÷ 12 = 1.5 times the shorter side.", "Similar shapes keep this ratio, so the large frame's longer side is 30 × 1.5 = 45 cm."] },
        ],
        commonError: "Adding the same amount to each side instead of multiplying by a scale factor.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Which side of the small frame matches the 30 cm side?",
          "What do you multiply 12 by to get 30?",
          "Multiply the longer side, 18 cm, by the same number.",
        ],
        strategy: "Find the scale factor",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q13",
        question:
          "A floor pattern at a void deck uses triangular tiles. On the plan, tile T has vertices (1, 1), (3, 1) and (1, 2), and tile U has vertices (−1, −1), (−3, −1) and (−1, −2).\n\nJun says U is a reflection of T. Mei says U is a rotation of T. Who is right? Describe fully the single transformation that maps T onto U, and explain how you know.",
        diagram: `<svg viewBox="0 0 284 224" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle T has vertices (1, 1), (3, 1) and (1, 2). Triangle U has vertices (−1, −1), (−3, −1) and (−1, −2)."><rect x="0" y="0" width="284" height="224" fill="#ffffff"/><path d="M22 202V22M52 202V22M82 202V22M112 202V22M142 202V22M172 202V22M202 202V22M232 202V22M262 202V22M22 202H262M22 172H262M22 142H262M22 112H262M22 82H262M22 52H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="112" x2="262" y2="112" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="202" x2="142" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="172,82 232,82 172,52" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="112,142 52,142 112,172" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="116" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="138" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="52" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="82" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="112" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="172" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="202" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="232" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="262" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="138" y="206" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="138" y="176" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="138" y="146" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="138" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="138" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="138" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="138" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="208" y="49.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">T</text><text x="76" y="190.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">U</text></svg>`,
        marks: 4,
        modelAnswer:
          "Mei is right. Every vertex (x, y) of T goes to (−x, −y) on U: (1, 1) → (−1, −1), (3, 1) → (−3, −1) and (1, 2) → (−1, −2). That is a rotation of 180° about the origin (0, 0): the origin is the midpoint of each vertex and its image. U is not a mirror image of T: going round T from (1, 1) to (3, 1) to (1, 2) turns anticlockwise, and going round the matching vertices of U also turns anticlockwise. A reflection would reverse this, so U cannot be a reflection of T.",
        markScheme: [
          { point: "Mei is right: it is a rotation", keywords: ["mei", "rotation", "rotate"] },
          { point: "Angle 180° (a half-turn)", keywords: ["180", "half turn", "half-turn"] },
          { point: "Centre (0, 0), the origin", keywords: ["(0, 0)", "(0,0)", "origin"] },
          { point: "Reason: (x, y) → (−x, −y), or U is not reversed so it cannot be a reflection", keywords: ["-x", "−x", "not reversed", "same orientation", "same way round", "midpoint"] },
        ],
        commonError: "Giving only the angle, or saying 'reflection in the origin' — a full description of a rotation needs the angle and the centre (and the direction, unless it is 180°).",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Compare each vertex of T with the matching vertex of U. What happens to the coordinates?",
          "Is U a mirror image of T (reversed), or has it just been turned?",
          "(x, y) → (−x, −y) — which rotation does that, and about which point?",
        ],
        strategy: "Track the coordinates",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q14",
        question:
          "A rectangular tablet screen has a diagonal of 25 cm. The screen is 20 cm wide. How tall is it? Give your answer in cm.",
        answer: { type: "number", value: 15, display: "15 cm" },
        traps: [
          { spec: { type: "number", value: 32.0156, tolerance: 0.05 }, feedback: "You added the squares. The diagonal is already the hypotenuse (the longest side), so subtract: 25² − 20²." },
          { spec: { type: "number", value: 5 }, feedback: "Subtracting the lengths doesn't work. Subtract their squares, then square-root." },
        ],
        solution: [
          "The diagonal is the hypotenuse of a right-angled triangle whose shorter sides are the width and the height.",
          "height² = 25² − 20² = 625 − 400 = 225.",
          "height = {{sqrt(225)}} = 15 cm.",
          "Check: 15² + 20² = 225 + 400 = 625 = 25² ✓.",
        ],
        solutions: [
          { label: "Spot a triple", steps: ["20 = 5 × 4 and 25 = 5 × 5.", "So this is the 3, 4, 5 triangle scaled by 5: the sides are 15, 20, 25.", "The height is 15 cm."] },
        ],
        commonError: "Adding the squares when the hypotenuse is already known.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Sketch the screen with its diagonal. Which side of the right-angled triangle is the hypotenuse?",
          "You know the hypotenuse, so subtract: height² = 25² − 20².",
          "Square-root 225.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q15",
        question:
          "Ms Tan's school garden has a rectangular vegetable bed 3 m by 4 m. The school builds a new bed that is an enlargement of the old one with scale factor 3. Compost costs $2 per square metre. How much more does it cost to cover the new bed than the old one? Give your answer in dollars.",
        answer: { type: "number", value: 192, display: "$192" },
        traps: [
          { spec: { type: "number", value: 48 }, feedback: "Lengths are multiplied by 3, but the area is multiplied by 3 × 3 = 9. Work out the new bed's length and width first." },
          { spec: { type: "number", value: 216 }, feedback: "$216 is the cost for the whole new bed. The question asks how much MORE it costs than the old bed." },
        ],
        solution: [
          "Old bed: 3 × 4 = 12 m², costing 12 × $2 = $24.",
          "New bed: 9 m by 12 m, so 9 × 12 = 108 m², costing 108 × $2 = $216.",
          "Extra cost: $216 − $24 = $192.",
        ],
        solutions: [
          { label: "Use the area scale factor", steps: ["Lengths × 3, so area × 3 × 3 = 9.", "New area = 12 × 9 = 108 m², so the extra area is 108 − 12 = 96 m².", "Extra cost = 96 × $2 = $192."] },
        ],
        commonError: "Multiplying the area by 3 instead of by 3² = 9.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Find the new bed's length and width first.",
          "Work out both areas, then both costs.",
          "The new bed is 9 m by 12 m.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q16",
        question:
          "Hana wants to lay a folded beach umbrella, 125 cm long, flat on the bottom of a storage box. The base of the box is a rectangle 120 cm by 50 cm. Hana says, \"It won't fit, because 125 cm is longer than 120 cm.\" Is she right? Show working to support your answer.",
        marks: 4,
        modelAnswer:
          "No, Hana is wrong. The longest straight line on the base is the diagonal, from one corner to the opposite corner. It is the hypotenuse of a right-angled triangle with shorter sides 120 cm and 50 cm, so diagonal² = 120² + 50² = 14 400 + 2500 = 16 900, and the diagonal = {{sqrt(16900)}} = 130 cm. Since 125 cm is less than 130 cm, the umbrella fits if she lays it diagonally.",
        markScheme: [
          { point: "Uses the diagonal of the base as the longest straight line", keywords: ["diagonal", "diagonally", "corner to corner"] },
          { point: "Pythagoras: 120² + 50² = 16 900", keywords: ["16900", "16 900", "14400", "14 400", "2500"] },
          { point: "Diagonal = 130 cm", keywords: ["130"] },
          { point: "Concludes that it fits (125 < 130), so Hana is wrong", keywords: ["fits", "wrong", "less than 130", "125 < 130", "not right"] },
        ],
        solutions: [
          { label: "Spot a triple", steps: ["50 and 120 are 10 × 5 and 10 × 12.", "5, 12, 13 is a Pythagorean triple, so the diagonal is 10 × 13 = 130 cm.", "125 < 130, so the umbrella fits diagonally."] },
        ],
        commonError: "Comparing the umbrella only with the longer side, or adding 120 + 50 instead of using Pythagoras.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Is 120 cm really the longest straight line you can fit on the base?",
          "The diagonal splits the base into two right-angled triangles.",
          "Diagonal² = 120² + 50².",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q17",
        question:
          "A robot on a warehouse floor grid can make only two kinds of move: the translation (2 over 1) or the translation (−1 over 3). It starts at (0, 0) and finishes at (8, 11). How many moves does it make altogether?",
        answer: { type: "number", value: 7 },
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "5 is how many moves of one kind. Add on the moves of the other kind." },
          { spec: { type: "number", value: 2 }, feedback: "2 is how many moves of one kind. Add on the moves of the other kind." },
        ],
        solution: [
          "Suppose the robot makes a moves of (2 over 1) and b moves of (−1 over 3). Translations simply add, so the order of the moves doesn't matter.",
          "Across: 2a − b = 8. Up: a + 3b = 11.",
          "From the across equation, 8 + b = 2a is even, so b is even. Try b = 0, 2, 4, …",
          "b = 0: a = 4, up = 4 + 0 = 4 ✗. b = 2: a = 5, up = 5 + 6 = 11 ✓.",
          "So 5 moves of (2 over 1) and 2 moves of (−1 over 3): 5 + 2 = 7 moves.",
          "Check: 5 × (2, 1) + 2 × (−1, 3) = (10 − 2, 5 + 6) = (8, 11) ✓.",
        ],
        commonError: "Answering with the number of one kind of move only.",
        difficulty: "challenge",
        guideRef: "translation",
        hints: [
          "Call the number of each kind of move a and b. Why doesn't the order of the moves matter?",
          "Write one equation for the total distance across and one for the total distance up.",
          "Across: 2a − b = 8, so b must be even. Try b = 0, 2, 4, … in the 'up' equation.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q18",
        question:
          "A robot arm turns through 90° clockwise about a fixed pivot. It picks up a parcel at A(1, 5) and puts it down at A′(6, 4). Where is the pivot? Give its coordinates.",
        answer: { type: "list", values: [3, 2], ordered: true, display: "(3, 2)" },
        traps: [
          { spec: { type: "list", values: [3.5, 4.5], ordered: true }, feedback: "The midpoint of A and A′ is the centre only for a half-turn (180°). For a quarter-turn the pivot is off to one side." },
          { spec: { type: "list", values: [4, 7], ordered: true }, feedback: "That pivot works for a quarter-turn ANTICLOCKWISE. Check the direction." },
        ],
        solution: [
          "The pivot C is the same distance from A and A′, and turning the step from C to A through 90° clockwise must give the step from C to A′.",
          "A clockwise quarter-turn sends a step (across, up) to (up, −across).",
          "Let C = (p, q). The step from C to A is (1 − p, 5 − q). Turned, it becomes (5 − q, p − 1).",
          "So A′ = (p + 5 − q, q + p − 1) = (6, 4), giving p − q = 1 and p + q = 5.",
          "Adding: 2p = 6, so p = 3 and q = 2. The pivot is (3, 2).",
          "Check: from (3, 2) to A is (−2, 3); turned clockwise it is (3, 2); (3 + 3, 2 + 2) = (6, 4) ✓.",
        ],
        solutions: [
          { label: "Trial with a sketch", steps: ["The pivot is the same distance from A and A′, so it lies on the perpendicular bisector of AA′.", "Test a likely point, such as (3, 2). It is 2 right and 3 down from A, so the step from (3, 2) to A is (−2, 3): 2 left and 3 up.", "Turned 90° clockwise, (−2, 3) becomes (3, 2), and (3, 2) + (3, 2) = (6, 4) = A′ ✓."] },
        ],
        commonError: "Using the midpoint of A and A′, which only works for a half-turn.",
        difficulty: "challenge",
        guideRef: "rotation",
        hints: [
          "The pivot is the same distance from A and from A′. Sketch both points.",
          "A clockwise quarter-turn sends a step (across, up) to (up, −across).",
          "Call the pivot (p, q). Write the step from the pivot to A, turn it, then add it back onto (p, q).",
          "Set your answer equal to (6, 4) and solve the two equations for p and q.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q19",
        question:
          "Ravi's house H is 20 m from a straight river bank, and his vegetable garden G is 70 m from the same bank, on the same side. Measured along the bank, they are 120 m apart. He walks from H to the river to fill a watering can, then on to G. What is the shortest possible total distance he can walk? Give your answer in metres.",
        diagram: `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A straight river bank runs left to right with the river below it. House H is 20 m from the bank and garden G is 70 m from the bank, on the same side. Measured along the bank, H and G are 120 m apart."><rect x="0" y="0" width="380" height="240" fill="#ffffff"/><rect x="10" y="180" width="360" height="50" fill="#bae6fd"/><line x1="10" y1="180" x2="370" y2="180" stroke="#1f2937" stroke-width="2"/><text x="366" y="198" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end">river</text><text x="366" y="174" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end">bank</text><line x1="60" y1="140" x2="60" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="300" y1="40" x2="300" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M60 172H68V180" stroke="#334155" stroke-width="1.2" fill="none"/><path d="M300 172H292V180" stroke="#334155" stroke-width="1.2" fill="none"/><circle cx="60" cy="140" r="5" fill="#1f2937"/><circle cx="300" cy="40" r="5" fill="#1f2937"/><text x="60" y="130" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">H</text><text x="300" y="30" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">G</text><text x="52" y="164" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end">20 m</text><text x="308" y="114" font-size="12" font-family="sans-serif" fill="#1f2937">70 m</text><line x1="60" y1="214" x2="300" y2="214" stroke="#1f2937" stroke-width="1.2"/><path d="M60 209V219M300 209V219" stroke="#1f2937" stroke-width="1.2"/><text x="180" y="209" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">120 m</text></svg>`,
        answer: { type: "number", value: 150, display: "150 m" },
        traps: [
          { spec: { type: "number", value: 130 }, feedback: "{{sqrt(120^2 + 50^2)}} = 130 uses the difference 70 − 20, which is the straight path from H to G — but that never touches the river. Reflect G in the bank: the across distance becomes 20 + 70 = 90 m." },
          { spec: { type: "number", value: 210 }, feedback: "Walking straight to the bank, along it and straight up to G is not the shortest route. Reflect G in the bank and use one straight line." },
        ],
        solution: [
          "Reflect the garden in the river bank to get G′, 70 m on the other side of the bank.",
          "For any point R on the bank, RG = RG′, because the bank is the mirror line. So the walk H → R → G is exactly as long as H → R → G′.",
          "The shortest route from H to G′ is a straight line. It crosses the bank, and that crossing point is the best place to fill the can.",
          "From H to G′ is 120 m along and 20 + 70 = 90 m across.",
          "Distance = {{sqrt(120^2 + 90^2) = sqrt(14400 + 8100) = sqrt(22500)}} = 150 m.",
        ],
        commonError: "Using 70 − 20 = 50 m instead of 20 + 70 = 90 m for the second side.",
        difficulty: "challenge",
        guideRef: "reflection",
        hints: [
          "Try a few places to fill the can and work out each total. Which is best?",
          "Reflect G in the bank to get G′. Why is every point on the bank the same distance from G as from G′?",
          "The shortest path from H to G′ is a straight line. Find its length with Pythagoras.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q20",
        question:
          "In the corner of a dance studio two mirrors meet at right angles. On a plan, they lie along the lines x = 1 and y = 2. Zara notices that reflecting a point in x = 1, and then reflecting the image in y = 2, gives the same result as a single rotation. Show that she is right, describe the rotation fully, and explain whether the order of the two reflections matters.",
        marks: 4,
        modelAnswer:
          "Reflecting (x, y) in x = 1: the point is x − 1 to the right of the mirror, so its image is the same distance to the left: (2 − x, y). Reflecting that in y = 2 gives (2 − x, 4 − y). For example, (3, 5) → (−1, 5) → (−1, −1). The midpoint of (x, y) and (2 − x, 4 − y) is ((x + 2 − x) ÷ 2, (y + 4 − y) ÷ 2) = (1, 2) for every point, so every point ends up directly opposite itself through (1, 2), the same distance away — exactly what a half-turn does. So the double reflection is a rotation of 180° about (1, 2), the corner where the mirrors meet. Reflecting in y = 2 first gives (x, 4 − y) and then (2 − x, 4 − y) — the same result, so here the order does not matter.",
        markScheme: [
          { point: "Reflects in x = 1 correctly, e.g. (x, y) → (2 − x, y), or follows a specific point correctly", keywords: ["2 - x", "2 − x", "2-x"] },
          { point: "Then reflects in y = 2 to get (2 − x, 4 − y)", keywords: ["4 - y", "4 − y", "4-y"] },
          { point: "Identifies a rotation of 180° (half-turn) about (1, 2)", keywords: ["180", "half turn", "half-turn", "(1, 2)", "(1,2)"] },
          { point: "Order does not matter: the other order also gives (2 − x, 4 − y)", keywords: ["does not matter", "doesn't matter", "same result", "either order", "same"] },
        ],
        solutions: [
          { label: "Follow particular points", steps: ["(3, 5) → (−1, 5) → (−1, −1). Midpoint of (3, 5) and (−1, −1) is (1, 2).", "(0, 0) → (2, 0) → (2, 4). Midpoint of (0, 0) and (2, 4) is (1, 2).", "Every point's final image is straight through (1, 2) from it: a half-turn about (1, 2). (To be sure it is always true, do it for a general point (x, y).)"] },
        ],
        commonError: "Checking only one point — a proof needs to work for every point, so use a general point (x, y).",
        difficulty: "challenge",
        guideRef: "describing-transformations",
        hints: [
          "Pick a point, say (3, 5), and follow it through both reflections. Then try another point.",
          "Where is the midpoint of each starting point and its final image?",
          "Now use a general point (x, y): reflecting in x = 1 sends x to 2 − x. What does reflecting in y = 2 do to y?",
        ],
        strategy: "Try small cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "transformations-pythagoras-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q01",
        question:
          "The word SINGAPORE is written in plain capital letters, like this: S I N G A P O R E. How many of its letters have at least one line of symmetry?",
        answer: { type: "number", value: 4 },
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "Check S and N: they look the same after a half-turn (rotational symmetry), but no fold line makes their halves match." },
          { spec: { type: "number", value: 3 }, feedback: "Don't forget horizontal lines of symmetry — fold E along its middle." },
        ],
        solution: [
          "Check each letter: S no, I yes (2 lines), N no, G no, A yes (1 vertical line), P no, O yes (2 lines), R no, E yes (1 horizontal line).",
          "That is 4 letters: I, A, O and E.",
        ],
        commonError: "Counting S or N, which have rotational symmetry but no line symmetry.",
        difficulty: "warmup",
        guideRef: "symmetry",
        hints: ["Imagine folding each letter. Does any fold line make the two halves match?", "A fold line can be horizontal as well as vertical — try E."],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q02",
        question:
          "The diagram shows triangles A and B. Write down the column vector that translates A onto B. Type the top number, then the bottom number.",
        diagram: `<svg viewBox="0 0 284 284" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (−4, 1), (−2, 1) and (−4, 4). Triangle B has vertices (2, −4), (4, −4) and (2, −1)."><rect x="0" y="0" width="284" height="284" fill="#ffffff"/><path d="M22 262V22M46 262V22M70 262V22M94 262V22M118 262V22M142 262V22M166 262V22M190 262V22M214 262V22M238 262V22M262 262V22M22 262H262M22 238H262M22 214H262M22 190H262M22 166H262M22 142H262M22 118H262M22 94H262M22 70H262M22 46H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="142" x2="262" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="262" x2="142" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="46,118 94,118 46,46" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="190,238 238,238 190,166" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="146" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="138" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−5</text><text x="46" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="70" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="94" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="118" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="166" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="190" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="214" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="238" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="262" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="138" y="266" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−5</text><text x="138" y="242" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="138" y="218" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="138" y="194" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="138" y="170" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="138" y="122" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="138" y="98" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="138" y="74" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="138" y="50" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="138" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="138" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="61.6" y="105" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="205.6" y="225" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        answer: { type: "list", values: [6, -5], ordered: true, display: "(6 over −5)" },
        traps: [
          { spec: { type: "list", values: [-6, 5], ordered: true }, feedback: "That vector translates B back onto A. Count from A to B." },
        ],
        solution: [
          "Choose a vertex of A, e.g. the right-angle corner (−4, 1). The matching vertex of B is (2, −4).",
          "Across: 2 − (−4) = 6, so 6 right.",
          "Up or down: −4 − 1 = −5, so 5 down.",
          "Check with another vertex: (−2, 1) → (4, −4) is also 6 right and 5 down ✓. The vector is (6 over −5).",
        ],
        commonError: "Counting from B to A, which reverses both signs.",
        difficulty: "warmup",
        guideRef: "translation",
        hints: ["Pick one corner of A and find the matching corner of B.", "Count squares across first, then up or down."],
        strategy: "Count across first, then up or down",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q03",
        question: "The point K(3, 7) is reflected in the line y = 2. Write down the coordinates of its image.",
        answer: { type: "list", values: [3, -3], ordered: true, display: "(3, −3)" },
        traps: [
          { spec: { type: "list", values: [3, -7], ordered: true }, feedback: "That's the reflection in the x-axis (y = 0). The mirror is y = 2: K is 5 units above it, so the image is 5 units below it." },
          { spec: { type: "list", values: [1, 7], ordered: true }, feedback: "You reflected in the vertical line x = 2. The line y = 2 is horizontal, so the x-coordinate stays 3." },
        ],
        solution: [
          "y = 2 is a horizontal line, so only the y-coordinate changes.",
          "K is 7 − 2 = 5 units above the line.",
          "The image is 5 units below it: y = 2 − 5 = −3. The image is (3, −3).",
        ],
        difficulty: "warmup",
        guideRef: "reflection",
        hints: ["Is y = 2 horizontal or vertical?", "How far is K above the line? Go the same distance below it."],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q04",
        question: "The point P(4, −2) is rotated 90° anticlockwise about the origin. Write down the coordinates of its image.",
        answer: { type: "list", values: [2, 4], ordered: true, display: "(2, 4)" },
        traps: [
          { spec: { type: "list", values: [-2, -4], ordered: true }, feedback: "That's 90° clockwise. Anticlockwise about the origin sends (x, y) to (−y, x)." },
          { spec: { type: "list", values: [-4, 2], ordered: true }, feedback: "That's a half-turn (180°). A quarter-turn swaps the two numbers over." },
        ],
        solution: [
          "A quarter-turn anticlockwise about the origin sends (x, y) to (−y, x).",
          "(4, −2) → (−(−2), 4) = (2, 4).",
          "Check with a sketch: P is in the bottom-right quarter of the grid; a quarter-turn anticlockwise moves it to the top-right quarter ✓.",
        ],
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["Sketch the line from the origin to P and turn it a quarter-turn anticlockwise.", "Anticlockwise quarter-turn about the origin: (x, y) → (−y, x)."],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q05",
        question:
          "Triangle B is an enlargement of triangle A. A side of length 4 cm on A becomes 12 cm on B. Another side of A is 7 cm long. How long is the matching side on B? Give your answer in cm.",
        answer: { type: "number", value: 21, display: "21 cm" },
        traps: [
          { spec: { type: "number", value: 15 }, feedback: "An enlargement multiplies lengths: the scale factor is 12 ÷ 4 = 3, not 12 − 4 = 8 added on." },
        ],
        solution: ["Scale factor = 12 ÷ 4 = 3.", "Matching side = 7 × 3 = 21 cm."],
        commonError: "Adding the difference (8 cm) instead of multiplying by the scale factor.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["First find the scale factor.", "Scale factor = 12 ÷ 4."],
        strategy: "Find the scale factor",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p4-q06",
        question:
          "A designer claims that her logo fits exactly onto itself when it is turned through 50°, and that 50° is the smallest turn that does this. Ravi says, \"That's impossible.\" Is Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "Ravi is right. If the smallest turn is 50°, then turning through 50° again and again must bring the logo back to where it started after exactly one full turn, so 360° would have to be a whole number of 50° turns. But 360 ÷ 50 = 7.2, which is not a whole number. In fact, 8 turns of 50° make 400°, which is a full turn plus 40°, so a turn of 40° would also fit the logo onto itself — and 40° is smaller than 50°. That contradicts 50° being the smallest. The smallest turn must divide 360° exactly (360° ÷ n for a whole number n, such as 45° or 60°).",
        markScheme: [
          { point: "Ravi is right", keywords: ["right", "correct", "impossible", "yes"] },
          { point: "360 ÷ 50 = 7.2 is not a whole number (the order of rotational symmetry must be a whole number)", keywords: ["7.2", "whole number", "not divide", "doesn't divide", "does not divide"] },
          { point: "Shows the contradiction, e.g. 8 turns = 400° = 360° + 40°, so a smaller 40° turn would also work; or states the smallest turn must divide 360°", keywords: ["400", "40", "divide", "factor", "smaller"] },
        ],
        commonError: "Saying it is possible because 50° is less than 360°.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "If a 50° turn works, what about doing it twice? Three times?",
          "How many 50° turns fit into one full turn of 360°?",
          "8 turns of 50° is 400°. What single turn has the same effect?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q07",
        question:
          "Shape S is translated by (a over 3), and then its image is translated by (−2 over b). The overall effect is the same as a single translation by (5 over −1). Find a and b. Type a, then b.",
        answer: { type: "list", values: [7, -4], ordered: true, display: "a = 7, b = −4" },
        traps: [
          { spec: { type: "list", values: [3, 2], ordered: true }, feedback: "Combining translations ADDS the column vectors: a + (−2) = 5 and 3 + b = −1. Solve each equation." },
        ],
        solution: [
          "Doing one translation and then another adds the column vectors, top with top and bottom with bottom.",
          "Top: a + (−2) = 5, so a = 7.",
          "Bottom: 3 + b = −1, so b = −4.",
          "Check: (7 over 3) followed by (−2 over −4) gives (5 over −1) ✓.",
        ],
        commonError: "Subtracting the vectors instead of adding them.",
        difficulty: "core",
        guideRef: "translation",
        hints: [
          "When you do one translation and then another, what happens to the column vectors?",
          "Add the top numbers: a + (−2) must equal 5.",
          "Add the bottom numbers: 3 + b must equal −1.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q08",
        question: "Triangle B is the reflection of triangle A. Write down the equation of the mirror line.",
        diagram: `<svg viewBox="0 0 284 284" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (1, 3), (3, 3) and (3, 4). Triangle B has vertices (−3, −1), (−3, −3) and (−4, −3)."><rect x="0" y="0" width="284" height="284" fill="#ffffff"/><path d="M22 262V22M46 262V22M70 262V22M94 262V22M118 262V22M142 262V22M166 262V22M190 262V22M214 262V22M238 262V22M262 262V22M22 262H262M22 238H262M22 214H262M22 190H262M22 166H262M22 142H262M22 118H262M22 94H262M22 70H262M22 46H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="142" x2="262" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="262" x2="142" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="166,70 214,70 214,46" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="70,166 70,214 46,214" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="146" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="138" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−5</text><text x="46" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="70" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="94" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="118" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="166" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="190" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="214" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="238" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="262" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="138" y="266" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−5</text><text x="138" y="242" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="138" y="218" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="138" y="194" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="138" y="170" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="138" y="122" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="138" y="98" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="138" y="74" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="138" y="50" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="138" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="138" y="155" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="190" y="42.6" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="37.6" y="190.2" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        answer: { type: "text", accept: ["y = −x", "y=-x", "x+y=0", "y+x=0", "-x=y", "x=-y", "-y=x", "y=-1x", "y=0-x"], display: "y = −x" },
        traps: [
          { spec: { type: "text", accept: ["y = x", "y=1x", "x=y"] }, feedback: "y = x slopes up to the right. Reflecting in y = x would send (1, 3) to (3, 1), which is not on B. Check the matching vertices again." },
        ],
        solution: [
          "Match the vertices: (1, 3) ↔ (−3, −1), (3, 3) ↔ (−3, −3) and (3, 4) ↔ (−4, −3).",
          "Midpoints: (1, 3) and (−3, −1) give (−1, 1); (3, 3) and (−3, −3) give (0, 0).",
          "The mirror line passes through (−1, 1) and (0, 0): the line sloping down to the right through the origin, y = −x.",
          "Check with the rule for y = −x, (x, y) → (−y, −x): (3, 4) → (−4, −3) ✓.",
        ],
        commonError: "Mixing up y = x (slopes up to the right) and y = −x (slopes down to the right).",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "Join a vertex of A to its matching vertex on B. Where is the midpoint?",
          "Find the midpoints for two pairs of matching vertices. The mirror line passes through both.",
          "(1, 3) ↔ (−3, −1) has midpoint (−1, 1), and (3, 3) ↔ (−3, −3) has midpoint (0, 0).",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q09",
        question:
          "A shape is rotated about the origin. The table shows three of its vertices and two of their images.\n\n| Vertex | Image |\n|---|---|\n| A(2, 1) | A′(−1, 2) |\n| B(5, 1) | B′(−1, 5) |\n| C(5, 3) | C′ = ? |\n\nUse the first two rows to work out the rotation. Then give the coordinates of C′.",
        answer: { type: "list", values: [-3, 5], ordered: true, display: "(−3, 5)" },
        traps: [
          { spec: { type: "list", values: [3, -5], ordered: true }, feedback: "That uses the clockwise rule (y, −x). Test it on A: (2, 1) would go to (1, −2), not (−1, 2)." },
          { spec: { type: "list", values: [-5, 3], ordered: true }, feedback: "Check your rule on row A: it must send (2, 1) to (−1, 2). Swap the numbers over, THEN change the sign of the new first number." },
        ],
        solution: [
          "A(2, 1) → A′(−1, 2): the numbers swap over and the new first number changes sign.",
          "B(5, 1) → B′(−1, 5) follows the same rule: (x, y) → (−y, x). That is a rotation of 90° anticlockwise about the origin.",
          "C(5, 3) → (−3, 5).",
        ],
        commonError: "Using the clockwise rule (y, −x) instead of the anticlockwise rule (−y, x).",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "Compare A(2, 1) with A′(−1, 2). What has happened to the two numbers?",
          "They swap over and the new first number changes sign: (x, y) → (−y, x). Does B fit this too?",
          "Apply the same rule to C(5, 3).",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q10",
        question:
          "Triangle B is an enlargement of triangle A. Draw ray lines to find the centre of enlargement. Give its coordinates.",
        diagram: `<svg viewBox="0 0 252 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (3, 2), (4, 2) and (3, 4). Triangle B has vertices (5, 3), (7, 3) and (5, 7)."><rect x="0" y="0" width="252" height="252" fill="#ffffff"/><path d="M22 230V22M48 230V22M74 230V22M100 230V22M126 230V22M152 230V22M178 230V22M204 230V22M230 230V22M22 230H230M22 204H230M22 178H230M22 152H230M22 126H230M22 100H230M22 74H230M22 48H230M22 22H230" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="230" x2="230" y2="230" stroke="#334155" stroke-width="1.5"/><line x1="22" y1="230" x2="22" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="100,178 126,178 100,126" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="152,152 204,152 152,48" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="238" y="234" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="18" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="48" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="74" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="100" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="126" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="152" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="178" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="204" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="230" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="18" y="208" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="18" y="182" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="18" y="156" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="18" y="130" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="18" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="18" y="78" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="18" y="52" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">7</text><text x="18" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">8</text><text x="18" y="243" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="88.3" y="163.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="168.9" y="131" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        answer: { type: "list", values: [1, 1], ordered: true, display: "(1, 1)" },
        traps: [
          { spec: { type: "list", values: [0, 0], ordered: true }, feedback: "Not every enlargement has its centre at the origin. Draw lines from B's vertices through A's matching vertices and see where they cross." },
        ],
        solution: [
          "Matching vertices: (3, 2) ↔ (5, 3), (4, 2) ↔ (7, 3) and (3, 4) ↔ (5, 7). The scale factor is 2, because A's base of 1 unit becomes 2 units.",
          "Draw a line from (5, 3) through (3, 2) and keep going: every step is 2 left and 1 down, so it passes through (1, 1).",
          "Draw a line from (7, 3) through (4, 2): every step is 3 left and 1 down, so it also passes through (1, 1).",
          "The ray lines cross at the centre of enlargement, (1, 1).",
        ],
        solutions: [
          { label: "Use the scale factor", steps: ["Scale factor 2: each image vertex is twice as far from the centre as its object vertex.", "So the object vertex is halfway between the centre and the image vertex — the image vertex is the same step from the object vertex as the object vertex is from the centre.", "(5, 3) is 2 right and 1 up from (3, 2), so the centre is 2 left and 1 down from (3, 2): (1, 1)."] },
        ],
        commonError: "Assuming the centre is the origin, or joining the wrong pairs of vertices.",
        difficulty: "core",
        guideRef: "enlargement",
        hints: [
          "Draw a straight line from a vertex of B through the matching vertex of A, and keep going.",
          "Do the same for a second pair of matching vertices.",
          "The line from (5, 3) through (3, 2) keeps going 2 left and 1 down each step. Where does it meet the second ray line?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p4-q11",
        question:
          "The diagram shows triangles A and B. Zara says, \"B is a reflection of A.\" Is she right? Describe fully the single transformation that maps A onto B.",
        diagram: `<svg viewBox="0 0 226 278" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle A has vertices (2, 1), (2, 4) and (4, 1). Triangle B has vertices (2, −1), (5, −1) and (2, −3)."><rect x="0" y="0" width="226" height="278" fill="#ffffff"/><path d="M22 256V22M48 256V22M74 256V22M100 256V22M126 256V22M152 256V22M178 256V22M204 256V22M22 256H204M22 230H204M22 204H204M22 178H204M22 152H204M22 126H204M22 100H204M22 74H204M22 48H204M22 22H204" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="152" x2="204" y2="152" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="256" x2="48" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="100,126 100,48 152,126" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="100,178 178,178 100,230" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="212" y="156" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="44" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="74" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="100" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="126" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="152" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="178" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="204" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="44" y="260" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="44" y="234" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="44" y="208" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="44" y="182" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="44" y="130" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="44" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="44" y="78" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="44" y="52" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="44" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="44" y="165" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="115.6" y="111.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="119.5" y="202.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        marks: 4,
        modelAnswer:
          "Zara is wrong. B is not a mirror image of A: the 3-unit side is vertical in A but horizontal in B, and going round the matching vertices in order turns the same way in both triangles, so B is not reversed. B is a rotation of 90° clockwise about (1, 0). Check: the right-angle vertex (2, 1) is 1 right and 1 up from (1, 0); a clockwise quarter-turn makes that 1 right and 1 down, giving (2, −1) ✓. The top vertex (2, 4) is 1 right and 4 up from (1, 0); turned, that becomes 4 right and 1 down, giving (5, −1) ✓.",
        markScheme: [
          { point: "Zara is wrong, with a reason (B is not reversed / no mirror line works)", keywords: ["wrong", "not a reflection", "not reversed", "same way", "orientation", "turned"] },
          { point: "Rotation", keywords: ["rotation", "rotate"] },
          { point: "90° clockwise (or 270° anticlockwise)", keywords: ["90", "clockwise", "270", "quarter"] },
          { point: "Centre (1, 0)", keywords: ["(1, 0)", "(1,0)", "1, 0"] },
        ],
        commonError: "Leaving out the centre or the direction — a rotation needs centre, angle and direction.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Is B a mirror image of A (reversed), or has it just been turned? Follow the 3-unit side.",
          "The 3-unit side is vertical in A and horizontal in B: a quarter-turn. Which way?",
          "For the centre, try points with tracing paper, or find a point that is the same distance from (2, 1) and (2, −1), and from (2, 4) and (5, −1).",
        ],
        strategy: "Track the coordinates",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q12",
        question:
          "Here are six transformations.\n\n| Number | Transformation |\n|---|---|\n| 1 | Translation by (4 over −1) |\n| 2 | Reflection in the line y = 2 |\n| 3 | Rotation 90° anticlockwise about (1, 3) |\n| 4 | Enlargement, scale factor 3, centre (0, 0) |\n| 5 | Enlargement, scale factor 1, centre (2, 5) |\n| 6 | Enlargement, scale factor 2, centre (1, 1) |\n\nFor how many of them is the image always congruent to the object?",
        answer: { type: "number", value: 4 },
        traps: [
          { spec: { type: "number", value: 3 }, feedback: "Look again at number 5: scale factor 1 multiplies every length by 1, so the image is exactly the same size and shape — congruent." },
          { spec: { type: "number", value: 6 }, feedback: "Enlargements with scale factor 3 or 2 change the size, so those images are similar, not congruent." },
        ],
        solution: [
          "Congruent means the same shape AND the same size.",
          "Translations, reflections and rotations never change lengths or angles: numbers 1, 2 and 3 are congruent.",
          "An enlargement with scale factor 1 multiplies every length by 1, so number 5 is congruent too (the image sits exactly on the object).",
          "Numbers 4 and 6 change the size, so they are similar but not congruent.",
          "That makes 4 transformations.",
        ],
        commonError: "Ruling out every enlargement, even the one with scale factor 1.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Congruent means the same shape and the same size. Which transformations never change lengths?",
          "Translations, reflections and rotations keep every length the same.",
          "What does an enlargement with scale factor 1 do to lengths?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q13",
        question:
          "The diagram shows a 6 by 6 grid with 4 squares shaded and two dashed lines through its centre. What is the smallest number of extra squares that must be shaded so that **both** dashed lines are lines of symmetry of the pattern?",
        diagram: `<svg viewBox="0 0 244 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 6 by 6 grid of squares with a dashed vertical line and a dashed horizontal line through its centre. Four squares are shaded: the top-left corner square; in the second row, the third square from the left; in the third row, the second and fifth squares from the left."><rect x="0" y="0" width="244" height="244" fill="#ffffff"/><rect x="20" y="20" width="34" height="34" fill="#c7d2fe"/><rect x="88" y="54" width="34" height="34" fill="#c7d2fe"/><rect x="54" y="88" width="34" height="34" fill="#c7d2fe"/><rect x="156" y="88" width="34" height="34" fill="#c7d2fe"/><path d="M20 20V224M20 20H224M54 20V224M20 54H224M88 20V224M20 88H224M122 20V224M20 122H224M156 20V224M20 156H224M190 20V224M20 190H224M224 20V224M20 224H224" stroke="#334155" stroke-width="1.2" fill="none"/><line x1="122" y1="8" x2="122" y2="236" stroke="#2563eb" stroke-width="2" stroke-dasharray="7 5"/><line x1="8" y1="122" x2="236" y2="122" stroke="#2563eb" stroke-width="2" stroke-dasharray="7 5"/></svg>`,
        answer: { type: "number", value: 8 },
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "That makes only the vertical line a line of symmetry. Each shaded square also needs a partner across the horizontal line." },
          { spec: { type: "number", value: 12 }, feedback: "12 is the total number of shaded squares at the end. The question asks for the EXTRA squares." },
        ],
        solution: [
          "With both lines as mirrors, each shaded square belongs to a group of 4 squares (one in each quarter of the grid), and all 4 must be shaded.",
          "Top-left corner square: its group is the four corner squares, so 3 more are needed.",
          "Second row, third square: its group is the 2 middle squares of row 2 and of row 5, so 3 more are needed.",
          "Third row, second and fifth squares: these two are already mirror images in the vertical line. Their group also needs the second and fifth squares of row 4: 2 more.",
          "Total: 3 + 3 + 2 = 8 extra squares (12 shaded altogether).",
        ],
        commonError: "Reflecting in only one of the two lines.",
        difficulty: "core",
        guideRef: "symmetry",
        hints: [
          "Take one shaded square. Where is its reflection in the vertical line? In the horizontal line?",
          "With two mirror lines, each shaded square belongs to a group of 4 squares that must all be shaded.",
          "Check whether any square in a group is already shaded before you count.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q14",
        question:
          "In the diagram, A, D and C lie on a straight line and BD is perpendicular to AC. AB = 13 cm, AD = 5 cm and DC = 9 cm. Find the length of BC. Give your answer in cm.",
        diagram: `<svg viewBox="0 0 256 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with A, D and C on a straight horizontal line and B above D. BD is perpendicular to AC. AB = 13 cm, AD = 5 cm and DC = 9 cm. BC is marked with a question mark."><rect x="0" y="0" width="256" height="230" fill="#ffffff"/><polygon points="30,196 226,196 100,28" fill="#c7d2fe" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><line x1="100" y1="28" x2="100" y2="196" stroke="#1f2937" stroke-width="2"/><path d="M100 186H110V196" stroke="#1f2937" stroke-width="1.5" fill="none"/><path d="M100 186H90V196" stroke="#1f2937" stroke-width="1.5" fill="none"/><g font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="20" y="201">A</text><text x="100" y="20">B</text><text x="236" y="201">C</text><text x="100" y="214">D</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="65" y="214">5 cm</text><text x="163" y="214">9 cm</text><text x="45" y="112" text-anchor="end">13 cm</text><text x="177" y="112" text-anchor="start">?</text></g></svg>`,
        answer: { type: "number", value: 15, display: "15 cm" },
        traps: [
          { spec: { type: "number", value: 15.8114, tolerance: 0.05 }, feedback: "13 cm is the hypotenuse of triangle ABD, not the height BD. Find BD first: BD² = 13² − 5²." },
          { spec: { type: "number", value: 16.5831, tolerance: 0.05 }, feedback: "In triangle ABD you know the hypotenuse (13 cm), so subtract to find BD: 13² − 5², not 13² + 5²." },
        ],
        solution: [
          "Triangle ABD is right-angled at D with hypotenuse AB = 13 cm.",
          "BD² = 13² − 5² = 169 − 25 = 144, so BD = 12 cm.",
          "Triangle BDC is right-angled at D with shorter sides 12 cm and 9 cm.",
          "BC² = 12² + 9² = 144 + 81 = 225, so BC = {{sqrt(225)}} = 15 cm.",
        ],
        commonError: "Treating 13 cm as the height, or adding squares when the hypotenuse is already known.",
        difficulty: "core",
        guideRef: "pythagoras",
        hints: [
          "Split the shape into two right-angled triangles. Which one can you solve first?",
          "In triangle ABD you know the hypotenuse AB and the side AD. Find BD.",
          "BD = 12 cm. Now use triangle BDC.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p4-q15",
        question:
          "Triangle P has angles 40°, 60° and 80°. Triangle Q also has angles 40°, 60° and 80°. Hana says, \"P and Q must be congruent.\" Is she right? Explain your answer, using the words *congruent* and *similar*.",
        marks: 3,
        modelAnswer:
          "Hana is not necessarily right. Because their matching angles are equal, P and Q are the same shape, so they are similar — one could be an enlargement of the other. But equal angles don't fix the size. For example, Q could have every side twice as long as P (an enlargement with scale factor 2); its angles would still be 40°, 60° and 80°, but P and Q would be similar, not congruent. They are only congruent if their matching sides are equal too.",
        markScheme: [
          { point: "Hana is wrong / not necessarily right", keywords: ["wrong", "not necessarily", "not always", "not right"] },
          { point: "Equal angles mean the triangles are similar (the same shape)", keywords: ["similar", "same shape"] },
          { point: "The size can differ, e.g. an enlargement with scale factor 2 keeps the angles, so they need not be congruent", keywords: ["size", "bigger", "smaller", "enlargement", "scale factor", "twice", "different sizes"] },
        ],
        commonError: "Thinking that equal angles force equal sides.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "What is the difference between congruent and similar?",
          "Could you draw two triangles with these angles that are different sizes?",
          "Enlarge P by scale factor 2. What happens to its angles? Its sides?",
        ],
        strategy: "Find a counterexample",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q16",
        question:
          "The point P(5, 3) is rotated 180° about the centre C(2, −1) to give Q. Then Q is translated by the column vector (4 over 6) to give R. Find the coordinates of R.",
        answer: { type: "list", values: [3, 1], ordered: true, display: "(3, 1)" },
        traps: [
          { spec: { type: "list", values: [-1, -5], ordered: true }, feedback: "That's Q. Now translate it by (4 over 6) to get R." },
          { spec: { type: "list", values: [-1, 3], ordered: true }, feedback: "You rotated about the origin. The centre is C(2, −1), which must be the midpoint of P and Q." },
        ],
        solution: [
          "For a half-turn, the centre is the midpoint of a point and its image.",
          "From P(5, 3) to C(2, −1) is 3 left and 4 down. Going the same again from C gives Q = (2 − 3, −1 − 4) = (−1, −5).",
          "Translate by (4 over 6): R = (−1 + 4, −5 + 6) = (3, 1).",
        ],
        commonError: "Rotating about the origin instead of about C.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "For a half-turn, where is the centre compared with P and its image Q?",
          "From P to C is 3 left and 4 down. Go the same again from C to reach Q.",
          "Q = (−1, −5). Now add the column vector.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q17",
        question:
          "A 3 by 3 square is drawn on squared paper. It is translated by a column vector whose top and bottom numbers are both whole numbers (they may be negative or zero). How many different translations make the image overlap the original square in a region of area exactly 2 square units?",
        answer: { type: "number", value: 8 },
        traps: [
          { spec: { type: "number", value: 2 }, feedback: "Don't forget negative numbers: moving left or down gives different translations too." },
          { spec: { type: "number", value: 4 }, feedback: "There are two shapes of overlap: 1 wide by 2 tall, and 2 wide by 1 tall. Each comes from 4 translations (choose the signs)." },
        ],
        solution: [
          "Translate by (a over b). The overlap is a rectangle 3 − a wide and 3 − b tall, using the sizes of a and b (ignoring signs), as long as both are less than 3.",
          "The widths and heights can only be 1, 2 or 3, and the area must be 2 = 1 × 2 = 2 × 1.",
          "Width 1, height 2: a is 2 or −2 and b is 1 or −1 — that's 4 translations.",
          "Width 2, height 1: a is 1 or −1 and b is 2 or −2 — another 4 translations.",
          "Total: 4 + 4 = 8.",
        ],
        commonError: "Counting only translations to the right and up, or only one shape of overlap.",
        difficulty: "challenge",
        guideRef: "translation",
        hints: [
          "Try a small case: if the vector is (1 over 0), what shape is the overlap and what is its area?",
          "For the vector (a over b), the overlap is a rectangle. How wide and how tall is it?",
          "Which widths and heights (each 1, 2 or 3) multiply to give 2?",
          "Remember that a and b can be negative.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q18",
        question:
          "The point K(2, 5) is reflected in the x-axis. The image is reflected in the y-axis, that image is reflected in the x-axis, and so on, alternating between the two axes. There are 25 reflections altogether, starting and finishing with the x-axis. Where does K end up?",
        answer: { type: "list", values: [2, -5], ordered: true, display: "(2, −5)" },
        traps: [
          { spec: { type: "list", values: [-2, -5], ordered: true }, feedback: "The y-axis is used 12 times — an even number of sign changes leaves the x-coordinate as 2." },
          { spec: { type: "list", values: [2, 5], ordered: true }, feedback: "The x-axis is used 13 times — an odd number of sign changes, so the y-coordinate ends up negative." },
        ],
        solution: [
          "A reflection in the x-axis changes the sign of y only. A reflection in the y-axis changes the sign of x only.",
          "So the order doesn't matter — just count how many times each axis is used.",
          "The x-axis is used in reflections 1, 3, 5, …, 25: that's 13 times (odd), so y ends as −5.",
          "The y-axis is used in reflections 2, 4, …, 24: that's 12 times (even), so x ends as 2.",
          "K ends up at (2, −5).",
        ],
        solutions: [
          { label: "Pair them up", steps: ["Each pair 'x-axis then y-axis' sends (x, y) to (−x, −y): a half-turn about the origin.", "The first 24 reflections make 12 half-turns, which is 6 full turns — back to (2, 5).", "The 25th reflection, in the x-axis, gives (2, −5)."] },
        ],
        commonError: "Miscounting the reflections: 25 reflections means 13 in the x-axis and 12 in the y-axis.",
        difficulty: "challenge",
        guideRef: "reflection",
        hints: [
          "What does one reflection in the x-axis do to the coordinates? And one in the y-axis?",
          "Each reflection changes the sign of just one coordinate. Does the order matter, then?",
          "How many times is each axis used in 25 reflections?",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q19",
        question:
          "A closed box is a cuboid 12 cm long, 3 cm wide and 2 cm high. An ant walks on the outside of the box from corner A to the opposite corner G. What is the length of the shortest possible route? Give your answer in cm.",
        diagram: `<svg viewBox="0 0 366 140" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A closed cuboid box 12 cm long, 3 cm wide and 2 cm high. Corner A is at the bottom front left and corner G is at the top back right, the corner furthest from A."><rect x="0" y="0" width="366" height="140" fill="#ffffff"/><polygon points="50,60 290,60 326,36 86,36" fill="#fde68a"/><polygon points="290,100 326,76 326,36 290,60" fill="#bbf7d0"/><polygon points="50,100 290,100 290,60 50,60" fill="#c7d2fe"/><path d="M86 76L86 36M86 76L326 76M86 76L50 100" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4" fill="none"/><path d="M50 100L290 100L290 60L50 60ZM50 60L86 36L326 36L290 60M290 100L326 76L326 36" stroke="#1f2937" stroke-width="2" stroke-linejoin="round" fill="none"/><circle cx="50" cy="100" r="4" fill="#1f2937"/><circle cx="326" cy="36" r="4" fill="#1f2937"/><g font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937"><text x="44" y="116" text-anchor="end">A</text><text x="334" y="32">G</text></g><g font-size="13" font-family="sans-serif" fill="#1f2937"><text x="170" y="120" text-anchor="middle">12 cm</text><text x="44" y="85" text-anchor="end">2 cm</text><text x="316" y="100">3 cm</text></g></svg>`,
        answer: { type: "number", value: 13, display: "13 cm" },
        traps: [
          { spec: { type: "number", value: 12.53, tolerance: 0.05 }, feedback: "That's the straight line through the inside of the box. The ant has to walk on the surface." },
          { spec: { type: "number", value: 17 }, feedback: "Walking along the edges (12 + 3 + 2) is not the shortest. Unfold two faces into one flat rectangle and go straight across it." },
          { spec: { type: "number", value: 14.32, tolerance: 0.05 }, feedback: "That is one way to unfold the box, but there is a shorter one. Try putting the 3 cm and 2 cm edges side by side." },
        ],
        solution: [
          "The route crosses two faces that meet along an edge. Unfold them so they lie flat: on the flat net the shortest route is a straight line, the hypotenuse of a right-angled triangle.",
          "There are three ways to pair up the edges. Shorter sides 12 and 3 + 2 = 5: {{sqrt(12^2 + 5^2) = sqrt(169)}} = 13 cm.",
          "Shorter sides 3 and 12 + 2 = 14: {{sqrt(3^2 + 14^2) = sqrt(205)}} ≈ 14.3 cm.",
          "Shorter sides 2 and 12 + 3 = 15: {{sqrt(2^2 + 15^2) = sqrt(229)}} ≈ 15.1 cm.",
          "The shortest route is 13 cm (across the front face and the top face).",
        ],
        commonError: "Using the space diagonal through the inside of the box, or checking only one way of unfolding.",
        difficulty: "challenge",
        guideRef: "pythagoras",
        hints: [
          "Imagine cutting the box and unfolding two faces so they lie flat. What does the ant's route become?",
          "On the flat net, the shortest route is a straight line — the hypotenuse of a right-angled triangle.",
          "The triangle's shorter sides could be 12 and 3 + 2, or 3 and 12 + 2, or 2 and 12 + 3. Which gives the shortest hypotenuse?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p4-q20",
        question:
          "A shape is enlarged by scale factor 2 with centre C(1, 2) to give image I. The same original shape is enlarged by scale factor 2 with centre D(4, 0) to give image J. Ravi says, \"J is just a translation of I.\" Is he right? If so, find the column vector that maps I onto J, and explain why it works for every point of the shape.",
        marks: 4,
        modelAnswer:
          "Ravi is right. Take any point (x, y) of the shape. With centre C(1, 2), the step from C is (x − 1, y − 2); doubled it is (2x − 2, 2y − 4), so the matching point of I is (1 + 2x − 2, 2 + 2y − 4) = (2x − 1, 2y − 2). With centre D(4, 0), the step is (x − 4, y); doubled it is (2x − 8, 2y), so the matching point of J is (2x − 4, 2y). From I to J: across (2x − 4) − (2x − 1) = −3 and up 2y − (2y − 2) = 2. The x and y cancel, so every point of I moves by the same column vector, (−3 over 2). Moving every point by the same vector is exactly a translation, so J is a translation of I by (−3 over 2). For example, (0, 0) goes to (−1, −2) in I and to (−4, 0) in J: 3 left and 2 up.",
        markScheme: [
          { point: "Finds the image of a point under both enlargements, e.g. (x, y) → (2x − 1, 2y − 2) and (2x − 4, 2y), or a specific point such as (0, 0) → (−1, −2) and (−4, 0)", keywords: ["2x - 1", "2x − 1", "2x-1", "2x - 4", "2x − 4", "2x-4", "(-1, -2)", "(−1, −2)", "(-4, 0)", "(−4, 0)"] },
          { point: "Finds the difference (−3 over 2): 3 left and 2 up", keywords: ["-3", "−3", "3 left", "2 up"] },
          { point: "Explains that the difference does not depend on x and y, so it is the same for every point", keywords: ["every point", "all points", "any point", "does not depend", "doesn't depend", "cancel"] },
          { point: "Concludes Ravi is right: J is a translation of I by (−3 over 2)", keywords: ["right", "correct", "translation", "yes"] },
        ],
        solutions: [
          { label: "Start with particular points", steps: ["(0, 0): in I it goes to (−1, −2); in J it goes to (−4, 0). Move: (−3 over 2).", "(1, 0): in I it goes to (1, −2); in J it goes to (−2, 0). Move: (−3 over 2) again.", "To be sure it ALWAYS works, repeat with a general point (x, y) — the x and y cancel out."] },
        ],
        commonError: "Checking only one or two points — to explain why it works for every point you need a general point (x, y).",
        difficulty: "challenge",
        guideRef: "enlargement",
        hints: [
          "Try a simple point such as (0, 0). Where does it go in I? In J?",
          "Try another point, such as (1, 0). Is the move from I to J the same?",
          "For a general point (x, y): image = centre + 2 × (step from the centre to the point). Do this for C and for D, then subtract.",
        ],
        strategy: "Try small cases",
      },
    ],
  },
];
