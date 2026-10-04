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
          "Aisha is facing east. She turns 90° anticlockwise, and then she turns 180° clockwise. Which direction is she facing now? (Answer north, south, east or west.)",
        answer: { type: "text", accept: ["south", "s", "facing south"], display: "South" },
        traps: [
          { spec: { type: "text", accept: ["north", "n"] }, feedback: "A quarter-turn anticlockwise from east does face north — but then the half-turn (180°) points her the opposite way." },
        ],
        solution: [
          "Anticlockwise is the opposite way to the hands of a clock. A quarter-turn anticlockwise from east is north.",
          "180° is a half-turn, so she then faces the opposite way to north: south.",
          "(A half-turn lands in the same place whether you turn clockwise or anticlockwise.)",
        ],
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["Sketch a compass with N at the top and E on the right.", "Do one turn at a time: first a quarter-turn anticlockwise from east."],
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
          "Ethan zooms in on a map on his phone. Zooming enlarges the map by scale factor 3. Before zooming, the MRT station and his school were 2.5 cm apart on the screen. How far apart are they on the screen after zooming? Give your answer in cm.",
        answer: { type: "number", value: 7.5, display: "7.5 cm" },
        traps: [
          { spec: { type: "number", value: 5.5 }, feedback: "Zooming multiplies every distance by 3 — it doesn't add 3 cm." },
          { spec: { type: "number", value: 22.5 }, feedback: "You multiplied by 9. Distances are multiplied by the scale factor, 3. (It is areas that get multiplied by 9.)" },
        ],
        solution: [
          "In an enlargement every distance is multiplied by the scale factor — not only the sides of shapes, but the distance between any two points.",
          "2.5 × 3 = 7.5 cm.",
        ],
        commonError: "Adding the scale factor instead of multiplying by it.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["What happens to every length in an enlargement with scale factor 3?", "Multiply 2.5 cm by 3."],
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
          "A condo garden is designed to be symmetrical about a straight path along the line y = x. Garden lamps already stand at (1, 4), (4, 1), (3, 3), (−2, 5) and (0, −2). What is the smallest number of extra lamps needed so that the lamps are symmetrical about the path?",
        answer: { type: "number", value: 2 },
        traps: [
          { spec: { type: "number", value: 5 }, feedback: "Some lamps already have partners, and one doesn't need a partner at all. Is (4, 1) the mirror image of (1, 4)? Where is (3, 3)?" },
          { spec: { type: "number", value: 4 }, feedback: "(1, 4) and (4, 1) are already mirror images of each other in y = x, so neither needs a new partner." },
          { spec: { type: "number", value: 3 }, feedback: "(3, 3) lies ON the line y = x, so it is its own mirror image — it doesn't need a partner." },
        ],
        solution: [
          "Reflecting in y = x swaps the coordinates: (x, y) → (y, x).",
          "(1, 4) and (4, 1) are each other's mirror images, and both are already there.",
          "(3, 3) lies on the line y = x, so it is its own mirror image.",
          "(−2, 5) needs a partner at (5, −2), and (0, −2) needs a partner at (−2, 0).",
          "So 2 extra lamps are needed.",
        ],
        commonError: "Forgetting that a point on the mirror line is its own image.",
        difficulty: "core",
        guideRef: "reflection",
        hints: [
          "What does reflecting in y = x do to the coordinates of a point?",
          "Find the mirror image of each lamp. Is it already in the list?",
          "Watch out for a lamp that stands on the path itself.",
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
          "A craft shop sells triangular tiles. The table gives the side lengths of five tiles.\n\n| Tile | Side lengths (cm) |\n|---|---|\n| A | 3, 4, 5 |\n| B | 6, 8, 10 |\n| C | 5, 3, 4 |\n| D | 4.5, 6, 7.5 |\n| E | 3, 4, 6 |\n\nHow many of tiles B, C, D and E are congruent to tile A, and how many are similar to A but **not** congruent? Type the number that are congruent first, then the number that are similar but not congruent.",
        answer: { type: "list", values: [1, 2], ordered: true, display: "1 congruent (C); 2 similar but not congruent (B and D)" },
        traps: [
          { spec: { type: "list", values: [0, 3], ordered: true }, feedback: "Tile C has exactly the same three lengths as A, just listed in a different order — so it is congruent to A." },
          { spec: { type: "list", values: [1, 3], ordered: true }, feedback: "Check tile E: two sides match A, but 6 is not 5. Its sides are not all multiplied by the same number, so E is not similar to A." },
          { spec: { type: "list", values: [2, 1], ordered: true }, feedback: "Right numbers, wrong order: type the number of congruent tiles first, then the number that are similar but not congruent." },
        ],
        solution: [
          "Congruent: exactly the same side lengths, in any order. Similar: every side multiplied by the same scale factor.",
          "C: 3, 4, 5 in a different order — congruent to A.",
          "B: 6, 8, 10 is 2 × (3, 4, 5) — similar with scale factor 2, but not congruent.",
          "D: 4.5, 6, 7.5 is 1.5 × (3, 4, 5) — similar with scale factor 1.5, but not congruent.",
          "E: 3 ÷ 3 = 1 but 6 ÷ 5 = 1.2, so the sides are not in the same ratio — not similar.",
          "Answer: 1 congruent and 2 similar but not congruent.",
        ],
        commonError: "Calling E similar because two of its sides match A.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Put each tile's sides in order from shortest to longest before comparing them with 3, 4, 5.",
          "Similar means every side is multiplied by the SAME number. Divide each side by the matching side of A.",
          "Check E carefully: do all three divisions give the same answer?",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q13",
        question:
          "A row of triangular tiles decorates a wall at a hawker centre. On a grid drawn over the wall, tile K has vertices (1, 1), (3, 1) and (1, 2), and tile L has vertices (7, 1), (5, 1) and (7, 2).\n\nJun says L is a translation of K, because it has just been slid along the wall. Mei says L is a reflection of K. Who is right? Describe fully the single transformation that maps K onto L, and give a reason.",
        diagram: `<svg viewBox="0 0 284 134" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Triangle K has vertices (1, 1), (3, 1) and (1, 2). Triangle L has vertices (7, 1), (5, 1) and (7, 2)."><rect x="0" y="0" width="284" height="134" fill="#ffffff"/><path d="M22 112V22M52 112V22M82 112V22M112 112V22M142 112V22M172 112V22M202 112V22M232 112V22M262 112V22M22 112H262M22 82H262M22 52H262M22 22H262" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="112" x2="262" y2="112" stroke="#334155" stroke-width="1.5"/><line x1="22" y1="112" x2="22" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="52,82 112,82 52,52" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="232,82 172,82 232,52" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="270" y="116" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="18" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="52" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="82" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="112" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="142" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="172" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="202" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="232" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="262" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="18" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="18" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="18" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="18" y="125" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="91" y="54" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">K</text><text x="193" y="54" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">L</text></svg>`,
        marks: 4,
        modelAnswer:
          "Mei is right. L faces the opposite way to K: K's right angle is at its left end, (1, 1), with its long side pointing right, but L's right angle is at its right end, (7, 1), with its long side pointing left. A translation never changes which way a shape faces, so it cannot be a translation. L is the reflection of K in the line x = 4. Check: each vertex and its image are the same distance from x = 4, on opposite sides — (1, 1) and (7, 1) are both 3 units away, (3, 1) and (5, 1) are both 1 unit away, and (1, 2) and (7, 2) are both 3 units away.",
        markScheme: [
          { point: "Mei is right: it is a reflection", keywords: ["mei", "reflection", "reflect"] },
          { point: "Mirror line x = 4", keywords: ["x = 4", "x=4"] },
          { point: "Reason it is not a translation: L is reversed / faces the other way", keywords: ["reversed", "opposite way", "other way", "faces", "mirror image", "flipped", "back to front"] },
          { point: "Checks using distances or midpoints, e.g. (1, 1) and (7, 1) are both 3 units from x = 4", keywords: ["midpoint", "same distance", "3 units", "equal distance", "(4, 1)", "halfway"] },
        ],
        commonError: "Calling it a translation by (6 over 0). That would move the right angle to (7, 1) but the long side would still point right, to (9, 1).",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Look at where the right angle is in each tile. Do the two tiles face the same way?",
          "If it is a reflection, the mirror line is halfway between each vertex and its image.",
          "Halfway between (1, 1) and (7, 1) is (4, 1). Check the other vertices too.",
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
          "In a computer game, a *teleport* moves a piece by a translation. Its column vector must have whole numbers on top and bottom (positive, negative or zero). One level only allows teleports that move a piece a distance of exactly 5 units. How many different teleports are allowed?",
        answer: { type: "number", value: 12 },
        traps: [
          { spec: { type: "number", value: 4 }, feedback: "Those are the straight moves: 5 left, right, up or down. Slanting moves can be 5 units long too — think of the 3, 4, 5 triangle." },
          { spec: { type: "number", value: 8 }, feedback: "You have found the slanting 3-and-4 moves. Don't forget the straight moves (5 over 0), (0 over 5) and their opposites." },
          { spec: { type: "number", value: 3 }, feedback: "Each move can point in several directions. Use positive and negative numbers." },
        ],
        solution: [
          "A translation by (a over b) moves every point a distance of {{sqrt(a^2 + b^2)}}: the hypotenuse of a right-angled triangle with shorter sides a and b.",
          "So we need whole numbers with a² + b² = 25.",
          "The square numbers up to 25 are 0, 1, 4, 9, 16 and 25. The pairs that add up to 25 are 0 + 25, 25 + 0, 9 + 16 and 16 + 9.",
          "Straight moves: (0 over 5), (0 over −5), (5 over 0) and (−5 over 0) — that's 4.",
          "a = 3 or −3 with b = 4 or −4: 4 moves. a = 4 or −4 with b = 3 or −3: 4 more.",
          "Total: 4 + 4 + 4 = 12 teleports.",
        ],
        commonError: "Forgetting the negative numbers, or forgetting the straight moves.",
        difficulty: "challenge",
        guideRef: "translation",
        hints: [
          "How far does the translation (3 over 4) move a point? Draw the right-angled triangle.",
          "A move (a over b) has length {{sqrt(a^2 + b^2)}}. So you need whole numbers with a² + b² = 25.",
          "Which two square numbers (0, 1, 4, 9, 16 or 25) add up to 25?",
          "Count every sign choice: (3 over 4), (−3 over 4), (3 over −4), …",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q18",
        question:
          "At 3:00 the hands of a clock are exactly 90° apart. What is the smaller angle between the hour hand and the minute hand at 3:20? Give your answer in degrees.",
        answer: { type: "number", value: 20, display: "20°" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "At 3:20 the hour hand is no longer pointing exactly at 3 — it has turned a third of the way towards 4." },
          { spec: { type: "number", value: 10 }, feedback: "10° is how far the hour hand turns in 20 minutes. Now work out where each hand points." },
        ],
        solution: [
          "Both hands turn clockwise about the centre. Measure every angle clockwise from 12.",
          "The minute hand turns 360° in 60 minutes: 6° per minute. At 3:20 it has turned 20 × 6 = 120°.",
          "The hour hand turns 30° in 60 minutes (one number per hour): {{1/2}}° per minute.",
          "At 3:00 the hour hand is at 90°. In 20 minutes it turns a further 20 × {{1/2}} = 10°, so at 3:20 it is at 100°.",
          "Angle between the hands: 120° − 100° = 20°.",
        ],
        commonError: "Leaving the hour hand pointing exactly at 3.",
        difficulty: "challenge",
        guideRef: "rotation",
        hints: [
          "How many degrees does the minute hand turn in one minute?",
          "Where does the minute hand point at 3:20? Measure clockwise from 12.",
          "The hour hand moves too: it turns 30° every hour. How far does it turn in 20 minutes?",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p3-q19",
        question:
          "A sign-maker has plenty of the capital letters A, B, E, H, M, O, S and T in a plain font. She makes 4-letter 'words' — any string of 4 of these letters, with repeats allowed, such as MATH or BOSS. How many of these 4-letter words look exactly the same when you see them in a mirror held upright beside them?",
        answer: { type: "number", value: 25 },
        traps: [
          { spec: { type: "number", value: 625 }, feedback: "You have the right 5 letters, but a mirror also reverses the ORDER of the letters. The word must read the same backwards, so only the first two letters are free choices." },
          { spec: { type: "number", value: 64 }, feedback: "B, E and S change in an upright mirror — B and E only have a horizontal line of symmetry, and S has none. Use only the letters with a vertical line of symmetry." },
        ],
        solution: [
          "An upright mirror reflects the word in a vertical line. That reverses the order of the letters AND reflects each letter.",
          "So each letter must have a vertical line of symmetry. A, H, M, O and T do; B and E have only a horizontal line, and S has none. That leaves 5 letters.",
          "The word must also read the same backwards: the 1st letter matches the 4th, and the 2nd matches the 3rd (like TOOT or MAAM).",
          "Choose the 1st letter (5 ways) and the 2nd letter (5 ways). The last two letters are then fixed.",
          "5 × 5 = 25 words.",
        ],
        commonError: "Forgetting that a mirror reverses the order of the letters as well as each letter.",
        difficulty: "challenge",
        guideRef: "reflection",
        hints: [
          "Imagine the word TOOT in a mirror. What happens to the order of the letters? To each letter?",
          "Which of the eight letters look the same when reflected in a vertical line?",
          "The word must also read the same backwards. Once you choose the first two letters, are the last two fixed?",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "transformations-pythagoras-p3-q20",
        question:
          "A sheet of A4 paper is 210 mm by 297 mm. Folding it in half, so that the long side is halved, gives A5 paper, 148.5 mm by 210 mm.\n\n(a) Show that A4 and A5 are (very nearly) similar rectangles.\n\n(b) Suppose a rectangle has short side s and long side l, and the rectangle you get by halving its long side is *exactly* similar to it. Prove that {{l^2 = 2s^2}}, so the long side is {{sqrt(2)}} times the short side.",
        marks: 4,
        modelAnswer:
          "(a) For A4, long side ÷ short side = 297 ÷ 210 ≈ 1.414. For A5, long side ÷ short side = 210 ÷ 148.5 ≈ 1.414. The ratios match, so A5 is the same shape as A4, just smaller: they are similar, with scale factor about 1.414 from A5 to A4.\n\n(b) Halving the long side gives a rectangle {{l/2}} by s. Its long side is now s and its short side is {{l/2}}. For the two rectangles to be similar, long side ÷ short side must be the same for both: {{l/s = s/(l/2) = (2s)/l}}. Multiplying both sides by s and by l gives {{l^2 = 2s^2}}, so {{l = sqrt(2) * s}}: the long side is {{sqrt(2)}} ≈ 1.414 times the short side. Check: 210 × 1.414 ≈ 297 ✓.",
        markScheme: [
          { point: "(a) Compares long ÷ short for both sheets: 297 ÷ 210 ≈ 1.414 and 210 ÷ 148.5 ≈ 1.414", keywords: ["1.414", "1.41", "297 ÷ 210", "210 ÷ 148.5", "same ratio", "scale factor"] },
          { point: "(b) The half rectangle is {{l/2}} by s, so its long side is s and its short side is {{l/2}}", keywords: ["l/2", "half", "long side is s", "by s"] },
          { point: "Sets the ratios equal: {{l/s = s/(l/2) = (2s)/l}}", keywords: ["l/s", "l ÷ s", "s/(l/2)", "2s/l", "2s ÷ l", "equal"] },
          { point: "Rearranges to {{l^2 = 2s^2}}, so {{l = sqrt(2) * s}}", keywords: ["l² = 2s²", "l^2 = 2s^2", "2s²", "2s^2", "√2", "sqrt(2)", "root 2"] },
        ],
        commonError: "Matching the wrong sides: after halving, the old short side s becomes the NEW long side.",
        difficulty: "challenge",
        guideRef: "describing-transformations",
        hints: [
          "For (a), work out long side ÷ short side for each sheet.",
          "For (b), write the sides of the half rectangle in terms of l and s. Which is its long side now?",
          "Similar means long ÷ short is the same for both: {{l/s = s/(l/2)}}.",
          "Simplify {{s/(l/2)}} to {{(2s)/l}}, then multiply both sides by l and by s.",
        ],
        strategy: "Introduce a variable",
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
        question: "The point P(−1, 4) is rotated 90° clockwise about the origin. Write down the coordinates of its image.",
        answer: { type: "list", values: [4, 1], ordered: true, display: "(4, 1)" },
        traps: [
          { spec: { type: "list", values: [-4, -1], ordered: true }, feedback: "That's 90° anticlockwise. Clockwise about the origin sends (x, y) to (y, −x)." },
          { spec: { type: "list", values: [1, -4], ordered: true }, feedback: "That's a half-turn (180°). A quarter-turn swaps the two numbers over." },
        ],
        solution: [
          "A quarter-turn clockwise about the origin sends (x, y) to (y, −x).",
          "(−1, 4) → (4, −(−1)) = (4, 1).",
          "Check with a sketch: P is in the top-left quarter of the grid; a clockwise quarter-turn moves it to the top-right quarter ✓.",
        ],
        difficulty: "warmup",
        guideRef: "rotation",
        hints: ["Sketch the line from the origin to P and turn it a quarter-turn clockwise.", "Clockwise quarter-turn about the origin: (x, y) → (y, −x)."],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "transformations-pythagoras-p4-q05",
        question:
          "Triangle B is an enlargement of triangle A with scale factor 3. One side of B is 18 cm long. How long is the matching side of A? Give your answer in cm.",
        answer: { type: "number", value: 6, display: "6 cm" },
        traps: [
          { spec: { type: "number", value: 54 }, feedback: "You multiplied by 3. B is the bigger triangle, so to go back from B to A you divide by 3." },
          { spec: { type: "number", value: 15 }, feedback: "Scale factors multiply and divide — they don't add or subtract." },
        ],
        solution: [
          "B is A enlarged by scale factor 3, so every length on B is 3 times the matching length on A.",
          "Going back from B to A, divide by 3: 18 ÷ 3 = 6 cm.",
        ],
        commonError: "Multiplying by the scale factor when you need to go from the image back to the object.",
        difficulty: "warmup",
        guideRef: "enlargement",
        hints: ["Which triangle is bigger, A or B?", "To go from B back to A, use the inverse of × 3."],
        strategy: "Use the inverse",
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
          "The diagram shows shapes A and B. Zara says, \"B is the reflection of A in the x-axis.\" Is she right? Describe fully the single transformation that maps A onto B.",
        diagram: `<svg viewBox="0 0 226 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid. Shape A has vertices (2, 2), (5, 2), (5, 3) and (3, 3). Shape B has vertices (4, −2), (1, −2), (1, −3) and (3, −3)."><rect x="0" y="0" width="226" height="252" fill="#ffffff"/><path d="M22 230V22M48 230V22M74 230V22M100 230V22M126 230V22M152 230V22M178 230V22M204 230V22M22 230H204M22 204H204M22 178H204M22 152H204M22 126H204M22 100H204M22 74H204M22 48H204M22 22H204" stroke="#e2e8f0" stroke-width="1" fill="none"/><line x1="22" y1="126" x2="204" y2="126" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="230" x2="48" y2="22" stroke="#334155" stroke-width="1.5"/><polygon points="100,74 178,74 178,48 126,48" fill="#bae6fd" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><polygon points="152,178 74,178 74,204 126,204" fill="#fde68a" fill-opacity="0.9" stroke="#1f2937" stroke-width="2" stroke-linejoin="round"/><g stroke="#ffffff" stroke-width="3" paint-order="stroke"><text x="212" y="130" font-size="12" font-family="sans-serif" fill="#334155">x</text><text x="44" y="14" font-size="12" font-family="sans-serif" fill="#334155">y</text><text x="22" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="74" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="100" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="126" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="152" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="178" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="204" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="44" y="234" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="44" y="208" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="44" y="182" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="44" y="156" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="44" y="104" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="44" y="78" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="44" y="52" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="44" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="44" y="139" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text></g><text x="152" y="41.3" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">A</text><text x="100" y="228.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937" text-anchor="middle">B</text></svg>`,
        marks: 4,
        modelAnswer:
          "Zara is wrong. Reflecting A in the x-axis would send (2, 2) to (2, −2), which is not a vertex of B, and the image would have its sloping side on the left. In B the sloping side is on the right. Instead, each vertex of A goes to the point directly opposite it through (3, 0), the same distance away: (2, 2) → (4, −2), (5, 2) → (1, −2), (5, 3) → (1, −3) and (3, 3) → (3, −3). Each time, (3, 0) is the midpoint of the vertex and its image. So B is a rotation of 180° about (3, 0).",
        markScheme: [
          { point: "Zara is wrong, with a reason (e.g. reflecting in the x-axis sends (2, 2) to (2, −2), or the sloping side would be on the other side)", keywords: ["wrong", "not right", "(2, -2)", "(2, −2)", "sloping", "other side", "wrong side"] },
          { point: "Rotation", keywords: ["rotation", "rotate"] },
          { point: "180° (a half-turn)", keywords: ["180", "half turn", "half-turn"] },
          { point: "Centre (3, 0)", keywords: ["(3, 0)", "(3,0)", "3, 0"] },
        ],
        commonError: "Mistaking a half-turn for a reflection. Check where each vertex goes — and remember a rotation needs its centre.",
        difficulty: "core",
        guideRef: "describing-transformations",
        hints: [
          "Reflect one vertex of A, such as (2, 2), in the x-axis. Does it land on a vertex of B?",
          "Compare where the sloping side and the right angles are in A and in B.",
          "For a half-turn, the centre is the midpoint of any vertex and its image. Find the midpoint of (2, 2) and (4, −2).",
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
          "Triangle P has angles 40°, 60° and 80°. Triangle Q also has angles 40°, 60° and 80°. Marcus says, \"P and Q must be congruent.\" Is he right? Explain your answer, using the words *congruent* and *similar*.",
        marks: 3,
        modelAnswer:
          "Marcus is not necessarily right. Because their matching angles are equal, P and Q are the same shape, so they are similar — one could be an enlargement of the other. But equal angles don't fix the size. For example, Q could have every side twice as long as P (an enlargement with scale factor 2); its angles would still be 40°, 60° and 80°, but P and Q would be similar, not congruent. They are only congruent if their matching sides are equal too.",
        markScheme: [
          { point: "Marcus is wrong / not necessarily right", keywords: ["wrong", "not necessarily", "not always", "not right"] },
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
          "The point P(−3, 4) is rotated 180° about the centre C(1, 2) to give Q. Then Q is translated by the column vector (−4 over 3) to give R. Find the coordinates of R.",
        answer: { type: "list", values: [1, 3], ordered: true, display: "(1, 3)" },
        traps: [
          { spec: { type: "list", values: [5, 0], ordered: true }, feedback: "That's Q. Now translate it by (−4 over 3) to get R." },
          { spec: { type: "list", values: [-1, -1], ordered: true }, feedback: "You rotated about the origin. The centre is C(1, 2), which must be the midpoint of P and Q." },
        ],
        solution: [
          "For a half-turn, the centre is the midpoint of a point and its image.",
          "From P(−3, 4) to C(1, 2) is 4 right and 2 down. Going the same again from C gives Q = (1 + 4, 2 − 2) = (5, 0).",
          "Translate by (−4 over 3): R = (5 − 4, 0 + 3) = (1, 3).",
        ],
        commonError: "Rotating about the origin instead of about C.",
        difficulty: "core",
        guideRef: "rotation",
        hints: [
          "For a half-turn, where is the centre compared with P and its image Q?",
          "From P to C is 4 right and 2 down. Go the same again from C to reach Q.",
          "Once you have Q, add the column vector.",
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
