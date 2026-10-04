// Angles, Parallel Lines & Polygons — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "angles-polygons-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "angles-polygons-p3-q01",
        question:
          "A round pandan chiffon cake is cut into slices from its centre. Four slices have angles of 70°, 85°, 95° and 60° at the centre. The rest of the cake is cut into two equal slices. What is the angle at the centre of each of these two slices? Give your answer in degrees.",
        answer: { type: "number", value: 25, display: "25°" },
        traps: [
          {
            spec: { type: "number", value: 50 },
            feedback: "50° is the angle left over altogether. It is shared between **two** equal slices.",
          },
        ],
        solution: [
          "The angles at the centre make a full turn, so they add up to 360°.",
          "Used so far: 70 + 85 + 95 + 60 = 310°.",
          "Left over: 360 − 310 = 50°.",
          "Two equal slices: 50 ÷ 2 = 25° each.",
        ],
        commonError: "Forgetting to share the leftover angle between the two slices.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["What do all the angles around the centre of the cake add up to?", "Subtract the four slices you know, then share what is left."],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q02",
        question:
          "Mei opens a pair of scissors so that the two blades make an angle of 34°. Each half of the scissors is one straight piece of metal, with a blade on one side of the pivot and a handle on the other. What is the angle between the two handles? Give your answer in degrees.",
        answer: { type: "number", value: 34, display: "34°" },
        traps: [
          {
            spec: { type: "number", value: 146 },
            feedback: "146° is the angle between a blade and the *neighbouring* handle (angles on a straight line). The two handles are opposite the two blades.",
          },
        ],
        solution: [
          "Each half of the scissors is a straight line through the pivot.",
          "So the scissors are two straight lines crossing at the pivot.",
          "The angle between the handles is vertically opposite the angle between the blades, so it is also 34°.",
        ],
        commonError: "Using angles on a straight line (180 − 34) instead of vertically opposite angles.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["Picture each half of the scissors as one straight line through the pivot. What do two crossing lines make?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q03",
        question:
          "The end of a bus shelter roof is an isosceles triangle: the two sloping edges are equal and the base is horizontal. The angle at the top, between the two sloping edges, is 110°. What angle does each sloping edge make with the base? Give your answer in degrees.",
        answer: { type: "number", value: 35, display: "35°" },
        traps: [
          {
            spec: { type: "number", value: 70 },
            feedback: "70° is the total of the two base angles. They are equal, so each one is half of that.",
          },
        ],
        solution: [
          "The two base angles of an isosceles triangle are equal.",
          "Together they make 180 − 110 = 70°.",
          "Each base angle = 70 ÷ 2 = 35°.",
        ],
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["Which two angles of an isosceles triangle are equal?", "Take the top angle away from 180°, then share the rest."],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q04",
        question:
          "Jun walks once around the edge of a gazebo whose floor is a regular octagon. He walks along one side, turns at the corner, walks along the next side, and so on, until he is back where he started, facing the way he began. Through what angle does he turn at each corner? Give your answer in degrees.",
        answer: { type: "number", value: 45, display: "45°" },
        traps: [
          {
            spec: { type: "number", value: 135 },
            feedback: "135° is the interior angle of the octagon. Jun turns through the *exterior* angle — how much his direction changes.",
          },
        ],
        solution: [
          "In one lap Jun turns through exactly one full turn: 360°.",
          "He makes 8 equal turns, one at each corner.",
          "Each turn = 360 ÷ 8 = 45°. This is the exterior angle of a regular octagon.",
        ],
        commonError: "Giving the interior angle (135°) instead of the turn, which is the exterior angle.",
        difficulty: "warmup",
        guideRef: "polygon-angles",
        hints: ["When Jun is back at the start facing the same way, how far has he turned altogether?", "That total is shared equally between the 8 corners."],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q05",
        question:
          "The frame of a wall clock is a regular polygon. When the frame is rotated about its centre, it first fits exactly onto its outline again after a turn of 30°. How many lines of symmetry does the frame have?",
        answer: { type: "number", value: 12 },
        traps: [
          {
            spec: { type: "number", value: 6 },
            feedback: "Did you count only the lines through opposite corners? With an even number of sides there are also lines through the midpoints of opposite sides.",
          },
        ],
        solution: [
          "A full turn is 360°, and the frame fits onto itself every 30°.",
          "Order of rotational symmetry = 360 ÷ 30 = 12, so the frame is a regular 12-sided polygon (a dodecagon).",
          "A regular polygon has as many lines of symmetry as it has sides: 12.",
        ],
        difficulty: "warmup",
        guideRef: "regular-polygon-symmetry",
        hints: ["How many 30° turns make a full turn?", "For a regular polygon: sides = lines of symmetry = order of rotational symmetry."],
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q06",
        question:
          "The two straight banks of a canal are parallel. A straight footbridge crosses them, making an angle of 62° with one bank, as shown. Find angle x between the footbridge and the other bank. Give your answer in degrees.",
        diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal canal banks, marked with arrows, crossed by a straight footbridge sloping down to the right. At the upper bank, the angle below the bank and to the right of the bridge is 62 degrees. At the lower bank, angle x is above the bank and to the right of the bridge."><rect width="480" height="250" fill="#ffffff"/><line x1="30" y1="70" x2="450" y2="70" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="200" x2="450" y2="200" stroke="#1f2937" stroke-width="2"/><path d="M84,64 L92,70 L84,76 M84,194 L92,200 L84,206" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="181.2" y1="34.7" x2="287.9" y2="235.3" stroke="#334155" stroke-width="4"/><path d="M218,70 A18,18 0 0 1 208.45,85.89" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M285.13,200 A16,16 0 0 0 261.62,185.87" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="224" y="94">62°</text><text x="282" y="184" font-style="italic">x</text><text x="390" y="62">bank</text><text x="390" y="192">bank</text><text x="296" y="236">footbridge</text></g></svg>`,
        answer: { type: "number", value: 118, display: "118°" },
        traps: [
          {
            spec: { type: "number", value: 62 },
            feedback: "x and the 62° are both between the banks, on the same side of the bridge. That makes them co-interior angles, which add to 180° — they are not equal.",
          },
        ],
        solution: [
          "The 62° and x are both between the parallel banks, on the same side of the bridge: they are co-interior angles (a C-shape).",
          "Co-interior angles add up to 180°.",
          "x = 180 − 62 = 118°.",
        ],
        solutions: [
          {
            label: "Through an alternate angle",
            steps: [
              "At the lower bank, the angle on the left of the bridge (between the bank and the bridge, inside the canal) is alternate to the 62°, so it is 62°.",
              "That angle and x lie on a straight line: x = 180 − 62 = 118°.",
            ],
          },
        ],
        commonError: "Assuming every angle made with parallel lines is equal — co-interior angles add to 180° instead.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Is x in an F, Z or C position compared with the 62°?",
          "Both angles are between the parallel banks, on the same side of the bridge.",
          "Co-interior angles add up to 180°.",
        ],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q07",
        question:
          "Siti is planning a triangular herb garden. She wants the largest angle to be three times the smallest angle, and the third angle to be 15° more than the smallest. Find the size of the largest angle, in degrees.",
        answer: { type: "number", value: 99, display: "99°" },
        traps: [
          {
            spec: { type: "number", value: 33 },
            feedback: "33° is the smallest angle, x. The largest angle is three times as big.",
          },
          {
            spec: { type: "number", value: 48 },
            feedback: "48° is the third angle (x + 15). The largest angle is 3x.",
          },
        ],
        solution: [
          "Let the smallest angle be x. Then the largest is 3x and the third is x + 15.",
          "Angles in a triangle add to 180°: x + 3x + x + 15 = 180.",
          "5x + 15 = 180, so 5x = 165 and x = 33.",
          "Largest angle = 3 × 33 = 99°.",
          "Check: 33 + 99 + 48 = 180 ✓",
        ],
        difficulty: "core",
        guideRef: "triangles",
        hints: [
          "Call the smallest angle x. Write the other two angles in terms of x.",
          "All three add to 180°: x + 3x + (x + 15) = 180.",
          "Solve 5x + 15 = 180, then work out 3x.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q08",
        question:
          "Five straight footpaths meet at a fountain in a park. The angles between neighbouring paths, going round the fountain, are in the ratio 2 : 3 : 3 : 4 : 6. Find the size of the largest of these angles, in degrees.",
        answer: { type: "number", value: 120, display: "120°" },
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback: "You shared 180°. The angles go all the way round the fountain, so they add up to 360°.",
          },
        ],
        solution: [
          "The five angles go all the way round a point, so they add up to 360°.",
          "Total number of parts: 2 + 3 + 3 + 4 + 6 = 18.",
          "One part = 360 ÷ 18 = 20°.",
          "Largest angle = 6 × 20 = 120°.",
          "Check: 40 + 60 + 60 + 80 + 120 = 360 ✓",
        ],
        difficulty: "core",
        guideRef: "angle-facts",
        hints: ["What do angles around a point add up to?", "How many parts are there altogether?", "Find the size of one part, then the largest share."],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q09",
        question:
          "The four arms of a scissor car jack form a rhombus PQRS. P is at the top, R is at the bottom, and the side corners Q and S are joined by a horizontal screw QS. When angle QPS = 50°, what is angle PQS, the angle between arm PQ and the screw? Give your answer in degrees.",
        diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rhombus PQRS with P at the top, Q on the right, R at the bottom and S on the left. A horizontal screw joins S and Q. Angle QPS at the top is 50 degrees. The angle between arm PQ and the screw, at Q, is marked with a question mark."><rect width="480" height="300" fill="#ffffff"/><polygon points="240,30 299.17,156.88 240,283.76 180.83,156.88" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="180.83" y1="156.88" x2="299.17" y2="156.88" stroke="#334155" stroke-width="3" stroke-dasharray="6 3"/><path d="M230.7,49.94 A22,22 0 0 0 249.3,49.94" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M289.87,136.94 A22,22 0 0 0 277.17,156.88" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="240" y="22" text-anchor="middle">P</text><text x="306" y="162">Q</text><text x="250" y="294">R</text><text x="166" y="162">S</text><text x="240" y="72" text-anchor="middle">50°</text><text x="266" y="146">?</text><text x="240" y="178" text-anchor="middle" font-size="12">screw</text></g></svg>`,
        answer: { type: "number", value: 65, display: "65°" },
        traps: [
          {
            spec: { type: "number", value: 130 },
            feedback: "130° is the whole angle PQR at the side corner. The screw QS is a diagonal, and it cuts that angle in half.",
          },
          {
            spec: { type: "number", value: 25 },
            feedback: "25° is the angle between arm PQ and the *vertical* diagonal PR. The question asks about the horizontal screw QS.",
          },
        ],
        solution: [
          "All four sides of a rhombus are equal, so PQ = PS and triangle PQS is isosceles.",
          "Its base angles PQS and PSQ are equal, and together they make 180 − 50 = 130°.",
          "Angle PQS = 130 ÷ 2 = 65°.",
        ],
        solutions: [
          {
            label: "Using the diagonals",
            steps: [
              "The diagonals of a rhombus cross at right angles, and each one cuts the corner angles in half.",
              "PR halves angle P, so the angle between PQ and PR is 25°.",
              "In the right-angled triangle where PR meets QS: angle PQS = 180 − 90 − 25 = 65°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "Which sides of a rhombus are equal? Look at triangle PQS.",
          "Triangle PQS is isosceles, with PQ = PS.",
          "Its two equal base angles share 180° − 50°.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "angles-polygons-p3-q10",
        question:
          "Arjun fixes two shelves to a wall and adds a straight diagonal brace between them. He measures the two angles shown: 72° at the top shelf and 106° at the bottom shelf. Both angles are between the shelves, on the same side of the brace.\n\nAre the shelves exactly parallel? Explain your answer using an angle fact.",
        diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two shelves joined by a diagonal brace. The top shelf is horizontal; the bottom shelf rises very slightly to the right. At the top shelf, the angle between the shelf and the brace, below the shelf and right of the brace, is 72 degrees. At the bottom shelf, the angle between the shelf and the brace, above the shelf and right of the brace, is 106 degrees."><rect width="480" height="250" fill="#ffffff"/><line x1="40" y1="80" x2="440" y2="80" stroke="#1f2937" stroke-width="4"/><line x1="40" y1="217.06" x2="440" y2="203.09" stroke="#1f2937" stroke-width="4"/><line x1="200" y1="80" x2="242.24" y2="210" stroke="#334155" stroke-width="3"/><path d="M218,80 A18,18 0 0 1 205.56,97.12" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M260.23,209.37 A18,18 0 0 0 236.68,192.88" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="224" y="104">72°</text><text x="258" y="184">106°</text><text x="48" y="70">top shelf</text><text x="48" y="240">bottom shelf</text><text x="234" y="150">brace</text></g></svg>`,
        marks: 3,
        modelAnswer:
          "No, they are not exactly parallel.\n\nThe 72° and 106° angles are **co-interior** angles: both lie between the shelves, on the same side of the brace. If the shelves were parallel, co-interior angles would add up to 180°.\n\nBut 72 + 106 = 178°, not 180°. So the shelves are **not** parallel — they get very slightly closer together on that side of the brace.",
        markScheme: [
          { point: "Identifies the angles as co-interior (between the shelves, same side of the brace)", keywords: ["co-interior", "allied", "c-shape", "same side", "interior"] },
          { point: "Adds the angles: 72 + 106 = 178°", keywords: ["178"] },
          { point: "Concludes not parallel, because co-interior angles on parallel lines add to 180° and 178 ≠ 180", keywords: ["not parallel", "180", "no"] },
        ],
        commonError: "Saying 'they look parallel'. A 2° difference is invisible by eye — that is exactly why the angle fact is needed.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "If the shelves were parallel, what would have to be true about these two angles?",
          "They are between the shelves, on the same side of the brace. What kind of pair is that?",
          "Co-interior angles on parallel lines add up to 180°. Do these?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q11",
        question:
          "The diagram shows the side view of a playground slide. The ladder makes an angle of 70° with the ground, and the angle between the ladder and the slide at the top is 80°. Find angle x, the angle between the slide and the ground measured *outside* the triangle, as shown. Give your answer in degrees.",
        diagram: `<svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of a slide. The ground is horizontal. The ladder rises from the ground at 70 degrees to the top, where it meets the slide at an angle of 80 degrees. The slide comes down to the ground on the right. Angle x is between the slide and the ground beyond the bottom of the slide, outside the triangle."><rect width="460" height="240" fill="#ffffff"/><polygon points="120,200 154.73,104.58 320,200" fill="#fde68a"/><line x1="40" y1="200" x2="440" y2="200" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="200" x2="154.73" y2="104.58" stroke="#334155" stroke-width="3"/><line x1="154.73" y1="104.58" x2="320" y2="200" stroke="#334155" stroke-width="3"/><path d="M140,200 A20,20 0 0 0 126.84,181.21" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M147.89,123.37 A20,20 0 0 0 172.05,114.58" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M342,200 A22,22 0 0 0 300.95,189" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="142" y="190" font-size="12">70°</text><text x="166" y="142" text-anchor="middle" font-size="12">80°</text><text x="326" y="178" font-style="italic">x</text><text x="128" y="150" text-anchor="end">ladder</text><text x="248" y="144">slide</text><text x="52" y="220">ground</text></g></svg>`,
        answer: { type: "number", value: 150, display: "150°" },
        traps: [
          {
            spec: { type: "number", value: 30 },
            feedback: "30° is the angle *inside* the triangle at the bottom of the slide. x is the exterior angle next to it.",
          },
        ],
        solution: [
          "x is an exterior angle of the triangle made by the ladder, the slide and the ground.",
          "An exterior angle of a triangle equals the sum of the two interior opposite angles.",
          "x = 70 + 80 = 150°.",
        ],
        solutions: [
          {
            label: "Inside angle first",
            steps: [
              "Angle inside the triangle at the bottom of the slide = 180 − 70 − 80 = 30°.",
              "x and that angle lie on a straight line: x = 180 − 30 = 150°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "triangles",
        hints: [
          "Which triangle can you see? Is x inside it or outside it?",
          "x sits next to the interior angle at the bottom of the slide.",
          "An exterior angle equals the sum of the two interior opposite angles.",
        ],
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q12",
        question:
          "A Ferris wheel has 20 capsules equally spaced around it. Straight beams join each capsule to the next one, making a regular 20-sided polygon, and straight spokes join the centre of the wheel to every capsule. At a capsule, what is the angle between a spoke and a beam? Give your answer in degrees.",
        answer: { type: "number", value: 81, display: "81°" },
        traps: [
          {
            spec: { type: "number", value: 162 },
            feedback: "162° is the whole interior angle between two beams. The spoke splits that angle into two equal parts.",
          },
          {
            spec: { type: "number", value: 18 },
            feedback: "18° is the angle between neighbouring spokes at the centre. The question asks for the angle at a capsule.",
          },
        ],
        solution: [
          "The 20 spokes split the full turn at the centre equally: 360 ÷ 20 = 18° between neighbouring spokes.",
          "Two neighbouring spokes and one beam make a triangle. The spokes are equal, so it is isosceles.",
          "Its two base angles are equal: (180 − 18) ÷ 2 = 81°.",
          "So the angle between a spoke and a beam is 81°.",
        ],
        solutions: [
          {
            label: "Using the interior angle",
            steps: [
              "Exterior angle of a regular 20-gon = 360 ÷ 20 = 18°, so each interior angle = 180 − 18 = 162°.",
              "By symmetry the spoke cuts the interior angle exactly in half: 162 ÷ 2 = 81°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "What angle is there at the centre between two neighbouring spokes?",
          "Two spokes and one beam form a triangle. What kind of triangle?",
          "It is isosceles: the two base angles share 180° minus the angle at the centre.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "angles-polygons-p3-q13",
        question:
          "Priya measures every interior angle of her hexagon-shaped garden bed. She gets 95°, 140°, 128°, 117°, 106° and 139°.\n\n1. Explain how you know that at least one of her measurements is wrong.\n2. Can she tell from her total *which* angle is wrong? Explain.",
        marks: 4,
        modelAnswer:
          "1. A hexagon splits into 6 − 2 = 4 triangles, so its interior angles add up to 4 × 180 = 720°. Priya's angles add up to 95 + 140 + 128 + 117 + 106 + 139 = 725°. That is 5° too much, so at least one measurement must be wrong.\n\n2. No. The total only shows that her measurements are 5° too big *altogether*. One angle could be 5° too big, or several angles could each be a little out. She would have to measure again to find out which.",
        markScheme: [
          { point: "Interior angles of a hexagon add up to (6 − 2) × 180 = 720°", keywords: ["720", "4 triangles", "four triangles"] },
          { point: "Her six angles total 725°", keywords: ["725"] },
          { point: "725 ≠ 720, so at least one is wrong (the total is 5° too big)", keywords: ["5", "too big", "not equal", "more than", "wrong"] },
          { point: "No — the total cannot show which angle is wrong; the error could be in any angle, or spread over several", keywords: ["no", "any", "several", "cannot tell", "can't tell", "could be"] },
        ],
        commonError: "Using 360° as the total — that is the sum for a quadrilateral (or for the exterior angles), not for a hexagon's interior angles.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "What should the interior angles of any hexagon add up to?",
          "Use (n − 2) × 180° with n = 6, then add up Priya's six angles.",
          "Compare the two totals. Does the difference point to one particular angle?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q14",
        question:
          "The diagram shows the side view of a folding stool. The seat is parallel to the floor, and the two straight legs cross at a hinge H. One leg makes an angle of 58° with the floor, and the angle between the two legs above the hinge is 70°. Find angle y between the other leg and the seat. Give your answer in degrees.",
        diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of a folding stool. A horizontal seat at the top is parallel to the floor. Two straight legs cross at hinge H. The leg rising to the right makes 58 degrees with the floor. The angle between the legs above the hinge is 70 degrees. Angle y is between the other leg and the seat, at the left end of the seat."><rect width="480" height="250" fill="#ffffff"/><line x1="150" y1="70" x2="320" y2="70" stroke="#1f2937" stroke-width="5"/><line x1="100" y1="220" x2="400" y2="220" stroke="#1f2937" stroke-width="2"/><line x1="196.26" y1="220" x2="290" y2="70" stroke="#334155" stroke-width="3"/><line x1="294.69" y1="220" x2="177.5" y2="70" stroke="#334155" stroke-width="3"/><circle cx="240" cy="150" r="3.5" fill="#1f2937"/><path d="M218.26,220 A22,22 0 0 0 207.92,201.34" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M249.54,134.74 A18,18 0 0 0 228.92,135.82" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M191.04,87.34 A22,22 0 0 0 199.5,70" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="224" y="210" font-size="12">58°</text><text x="239" y="124" text-anchor="middle" font-size="12">70°</text><text x="206" y="94" font-style="italic">y</text><text x="252" y="155">H</text><text x="326" y="74">seat</text><text x="340" y="238">floor</text></g></svg>`,
        answer: { type: "number", value: 52, display: "52°" },
        traps: [
          {
            spec: { type: "number", value: 58 },
            feedback: "58° is the angle between the *first* leg and the seat (alternate to its angle with the floor). y is in a different corner of the triangle.",
          },
        ],
        solution: [
          "Look at the triangle above the hinge, made by the two legs and the seat.",
          "The first leg meets the seat at 58°: alternate angles with the 58° at the floor, because the seat is parallel to the floor.",
          "Angles in a triangle add to 180°: y = 180 − 70 − 58 = 52°.",
        ],
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Find a triangle that contains both y and the 70° angle.",
          "Use the parallel seat and floor to move the 58° angle up to the seat (Z-shape).",
          "Now use the angle sum of the triangle.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "written",
        id: "angles-polygons-p3-q15",
        question:
          "Marcus says: \"My quadrilateral's diagonals are equal in length, so it must be a rectangle.\"\n\nIs Marcus right? Explain your answer. Then say what extra fact about the diagonals *would* guarantee a rectangle.",
        marks: 3,
        modelAnswer:
          "No, Marcus is not necessarily right.\n\nAn **isosceles trapezium** (exactly one pair of parallel sides, with the two non-parallel sides equal) has diagonals that are equal in length, but it has no right angles, so it is not a rectangle. One counter-example is enough to show his claim is false.\n\nEqual diagonals are not enough on their own. If the diagonals are equal **and** cut each other in half (bisect each other), then the quadrilateral must be a rectangle.",
        markScheme: [
          { point: "States that Marcus is not (necessarily) right", keywords: ["no", "not", "wrong", "not necessarily"] },
          { point: "Gives a valid counter-example, e.g. an isosceles trapezium (or a sketch of a non-rectangle with equal diagonals)", keywords: ["isosceles trapezium", "trapezium", "kite"] },
          { point: "States the extra condition: equal diagonals that also bisect each other give a rectangle", keywords: ["bisect", "cut each other in half", "half", "midpoint"] },
        ],
        commonError: "Using a square as the counter-example — a square *is* a rectangle, so it doesn't disprove Marcus.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "To show a claim is false, one counter-example is enough.",
          "Think of a symmetrical quadrilateral with exactly one pair of parallel sides.",
          "For the extra fact: a rectangle is a special parallelogram. What do the diagonals of every parallelogram do to each other?",
        ],
        strategy: "Find a counter-example",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q16",
        question:
          "A fence around a pond is made of identical straight panels, each 1.5 m long. The panels are joined end to end so that every interior angle of the fence is 168°, and the fence closes up exactly. What is the total length of the fence, in metres?",
        answer: { type: "number", value: 45, display: "45 m" },
        traps: [
          {
            spec: { type: "number", value: 30 },
            feedback: "30 is the number of panels. Each panel is 1.5 m long, so there is one more step.",
          },
        ],
        solution: [
          "Equal sides and equal angles: the fence is a regular polygon.",
          "Each exterior angle = 180 − 168 = 12°.",
          "Exterior angles add up to 360°, so the number of panels = 360 ÷ 12 = 30.",
          "Total length = 30 × 1.5 = 45 m.",
        ],
        commonError: "Dividing 360 by the interior angle (168°) instead of the exterior angle.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "The fence is a regular polygon. Which angle is easier to work with — interior or exterior?",
          "Each exterior angle is 180 − 168 = 12°, and the exterior angles add up to 360°.",
          "Number of panels = 360 ÷ 12. Then use the length of one panel.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q17",
        question:
          "Wei Ling designs a 9-sided badge with no reflex angles. Every interior angle is either 150° or 120°. How many of the interior angles are 150°?",
        answer: { type: "number", value: 6 },
        traps: [
          {
            spec: { type: "number", value: 3 },
            feedback: "3 is the number of 120° angles. The question asks how many are 150°.",
          },
        ],
        solution: [
          "Use exterior angles: a 150° interior angle has a 30° exterior angle, and a 120° interior angle has a 60° exterior angle.",
          "Let a angles be 150° and b angles be 120°. There are 9 corners, so a + b = 9.",
          "The exterior angles add up to 360°: 30a + 60b = 360, so a + 2b = 12.",
          "Subtract the two equations: b = 12 − 9 = 3, so a = 9 − 3 = 6.",
          "Check with interior angles: 6 × 150 + 3 × 120 = 900 + 360 = 1260 = (9 − 2) × 180 ✓",
        ],
        solutions: [
          {
            label: "Start from all 120°",
            steps: [
              "The interior angles of a 9-sided polygon add up to (9 − 2) × 180 = 1260°.",
              "If all nine angles were 120°, the total would be 9 × 120 = 1080° — that is 180° short.",
              "Swapping one 120° angle for a 150° angle adds 30°.",
              "So we need 180 ÷ 30 = 6 swaps: 6 angles are 150°.",
            ],
          },
        ],
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "The exterior angle sum of 360° works for any polygon without reflex angles — not just regular ones.",
          "Which exterior angles go with interior angles of 150° and 120°?",
          "If a angles are 150° and b are 120°, then a + b = 9 and 30a + 60b = 360.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q18",
        question:
          "A craft club makes two coasters, each shaped like a regular polygon. The second coaster has 3 more sides than the first, and each of its exterior angles is 6° smaller. How many sides does the first coaster have?",
        answer: { type: "number", value: 12 },
        traps: [
          {
            spec: { type: "number", value: 15 },
            feedback: "15 sides is the second coaster. The question asks about the first one.",
          },
        ],
        solution: [
          "Each exterior angle of a regular n-sided polygon is 360 ÷ n.",
          "Try values of n: n = 9 gives 40°, and 9 + 3 = 12 sides gives 30°. The difference is 10° — too big.",
          "n = 12 gives 30°, and 12 + 3 = 15 sides gives 24°. The difference is 6° ✓",
          "As n gets bigger, the difference keeps shrinking (n = 15: 24° − 20° = 4°), so n = 12 is the only answer.",
        ],
        solutions: [
          {
            label: "Algebra",
            steps: [
              "{{360/n - 360/(n + 3) = 6}}",
              "Multiply both sides by n(n + 3): 360(n + 3) − 360n = 6n(n + 3).",
              "The left side simplifies to 1080, so n(n + 3) = 180.",
              "12 × 15 = 180, so n = 12.",
            ],
          },
        ],
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "Write the exterior angle of each coaster in terms of its number of sides.",
          "Make a table: n, 360 ÷ n and 360 ÷ (n + 3). Look for a difference of 6°.",
          "The difference gets smaller as n grows. Start at n = 9 and try a few bigger values.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "angles-polygons-p3-q19",
        question:
          "A regular polygon looks exactly the same after it is rotated through 100° about its centre. What is the smallest number of sides it could have?",
        answer: { type: "number", value: 18 },
        traps: [
          {
            spec: { type: "number", value: 4 },
            feedback: "A square only fits back onto itself after turns of 90°, 180°, 270° and 360°. 100° is not one of them.",
          },
          {
            spec: { type: "number", value: 36 },
            feedback: "A 36-sided polygon does work (its steps are 10°), but there is a polygon with fewer sides that also works.",
          },
        ],
        solution: [
          "A regular n-sided polygon fits onto itself after turns of {{360/n}}, 2 × {{360/n}}, 3 × {{360/n}}, … — whole-number multiples of one 'step' of {{360/n}}.",
          "So the step size must divide exactly into 100° **and** into 360°.",
          "The common factors of 100 and 360 are 1, 2, 4, 5, 10 and 20. The biggest step, 20°, gives the fewest sides.",
          "Step of 20°: n = 360 ÷ 20 = 18 sides. Check: 5 steps of 20° make 100° ✓",
        ],
        solutions: [
          {
            label: "Try small cases",
            steps: [
              "100 = k × {{360/n}}, so n = 3.6k for some whole number k.",
              "k = 1, 2, 3, 4 give n = 3.6, 7.2, 10.8, 14.4 — not whole numbers.",
              "k = 5 gives n = 18, the first whole number.",
            ],
          },
        ],
        commonError: "Thinking the polygon only fits after a turn of exactly {{360/n}} — it also fits after any whole number of those turns.",
        difficulty: "challenge",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "A regular n-sided polygon fits onto itself after a turn of 360° ÷ n. Is that the only turn that works?",
          "It also fits after 2, 3, 4, … of those turns. So 100° must be a whole number of steps.",
          "The step size has to go exactly into both 100 and 360. Which step size gives the fewest sides?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "written",
        id: "angles-polygons-p3-q20",
        question:
          "ABCD is a parallelogram: AB is parallel to DC, and AD is parallel to BC.\n\nUsing facts about parallel lines, prove that angle DAB = angle BCD (the opposite angles of a parallelogram are equal). Give a reason for each step.",
        diagram: `<svg viewBox="0 0 460 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram ABCD with A at the bottom left, B at the bottom right, C at the top right and D at the top left. AB and DC are marked with single arrows; AD and BC are marked with double arrows."><rect width="460" height="240" fill="#ffffff"/><polygon points="60,200 300,200 400,70 160,70" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><path d="M174,194 L182,200 L174,206 M274,64 L282,70 L274,76" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M105.54,130.94 L114.57,129.05 L115.06,138.26 M100.06,138.08 L109.09,136.19 L109.58,145.4 M345.54,130.94 L354.57,129.05 L355.06,138.26 M340.06,138.08 L349.09,136.19 L349.58,145.4" fill="none" stroke="#1f2937" stroke-width="2"/><g font-family="sans-serif" font-size="14" fill="#1f2937"><text x="46" y="216">A</text><text x="304" y="216">B</text><text x="404" y="66">C</text><text x="146" y="66">D</text></g></svg>`,
        marks: 3,
        modelAnswer:
          "Call the angles at A, B and C a, b and c.\n\n- AD is parallel to BC, and AB crosses them. Angles a and b are co-interior, so a + b = 180°.\n- AB is parallel to DC, and BC crosses them. Angles b and c are co-interior, so b + c = 180°.\n- So a = 180° − b and c = 180° − b, which means a = c.\n\nNothing here depends on the actual sizes of the angles, so the opposite angles of **every** parallelogram are equal.",
        markScheme: [
          { point: "Angle A + angle B = 180°: co-interior angles, because AD is parallel to BC", keywords: ["co-interior", "allied", "a + b", "180"] },
          { point: "Angle B + angle C = 180°: co-interior angles, because AB is parallel to DC", keywords: ["co-interior", "b + c", "180"] },
          { point: "Concludes angle A = 180° − angle B = angle C", keywords: ["180 - b", "180 − b", "a = c", "equal", "same"] },
        ],
        solutions: [
          {
            label: "Extend a side",
            steps: [
              "Extend AB beyond B to a point E.",
              "Angle CBE = angle DAB: corresponding angles, because AD is parallel to BC.",
              "Angle CBE = angle BCD: alternate angles, because AB is parallel to DC.",
              "So angle DAB = angle BCD.",
            ],
          },
        ],
        commonError: "Measuring the angles in one drawing. A proof has to work for every parallelogram, so it must use angle facts, not measurements.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: [
          "Pick one pair of parallel sides. Which side crosses both of them?",
          "Angles A and B are between AD and BC, on the same side of AB. What kind of pair is that?",
          "You get a + b = 180°. Now find a second equation involving b and c.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "angles-polygons-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "angles-polygons-p4-q01",
        question:
          "A, O and B lie on a straight line, and angle COD is a right angle. Angle AOC = 40°.\n\nFind angle a, then the reflex angle AOD, marked b. Give a first, then b.",
        diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A straight line AB with point O on it. Rays OC and OD rise above the line, with a right angle between them. Angle AOC is 40 degrees. Angle a is between OD and OB. The reflex angle AOD, marked b, goes round underneath the line."><rect width="480" height="250" fill="#ffffff"/><line x1="50" y1="190" x2="430" y2="190" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="190" x2="132.75" y2="100.01" stroke="#1f2937" stroke-width="2"/><line x1="240" y1="190" x2="329.99" y2="82.75" stroke="#1f2937" stroke-width="2"/><path d="M229.28,181 L238.28,170.28 L249,179.28" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M217.02,170.72 A30,30 0 0 0 210,190" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M270,190 A30,30 0 0 0 259.28,167.02" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M204,190 A36,36 0 1 0 263.14,162.42" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="190" y="180" text-anchor="middle" font-size="12">40°</text><text x="290" y="168" font-style="italic">a</text><text x="262" y="238" font-style="italic">b</text><text x="44" y="210">A</text><text x="236" y="210">O</text><text x="424" y="210">B</text><text x="120" y="96">C</text><text x="334" y="78">D</text></g></svg>`,
        answer: { type: "list", values: [50, 230], ordered: true, display: "a = 50°, b = 230°" },
        traps: [
          {
            spec: { type: "list", values: [50, 130], ordered: true },
            feedback: "130° is the ordinary angle AOD (40° + 90°). The reflex angle goes the long way round: 360° − 130°.",
          },
        ],
        solution: [
          "Angles on a straight line add to 180°: a = 180 − 40 − 90 = 50°.",
          "The ordinary angle AOD = 40 + 90 = 130°.",
          "Angles around a point add to 360°, so the reflex angle b = 360 − 130 = 230°.",
        ],
        commonError: "Giving the ordinary angle AOD (130°) when the question asks for the reflex angle.",
        difficulty: "warmup",
        guideRef: "angle-facts",
        hints: ["Which three angles sit together on the straight line AB?", "The reflex angle and the ordinary angle AOD make a full turn."],
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q02",
        question:
          "Hana measures two of the angles in each of four triangles.\n\n| Triangle | First angle | Second angle |\n|---|---|---|\n| P | 48° | 66° |\n| Q | 72° | 56° |\n| R | 30° | 80° |\n| S | 100° | 35° |\n\nExactly one of the triangles is isosceles. Which one? Type its letter.",
        answer: { type: "text", accept: ["P", "triangle P", "P only", "only P"], display: "P" },
        traps: [
          {
            spec: { type: "text", accept: ["Q", "R", "S", "triangle Q", "triangle R", "triangle S"] },
            feedback: "Work out the missing third angle of each triangle — the two equal angles might not both be in the table.",
          },
        ],
        solution: [
          "Find each third angle by taking the two given angles away from 180°.",
          "P: 180 − 48 − 66 = 66°. Its angles are 48°, 66°, 66° — two are equal, so P is isosceles.",
          "Q: 180 − 72 − 56 = 52°. Angles 72°, 56°, 52° — all different.",
          "R: 180 − 30 − 80 = 70°. Angles 30°, 80°, 70° — all different.",
          "S: 180 − 100 − 35 = 45°. Angles 100°, 35°, 45° — all different.",
        ],
        commonError: "Only comparing the two angles in the table. The equal pair can include the missing third angle.",
        difficulty: "warmup",
        guideRef: "triangles",
        hints: ["An isosceles triangle has two equal angles — but they may not both be in the table.", "Find the third angle of each triangle."],
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q03",
        question:
          "I am a quadrilateral. My diagonals cross at right angles and cut each other in half, but they are **not** equal in length. What is the most precise name for me?",
        answer: { type: "text", accept: ["rhombus", "a rhombus"], display: "rhombus" },
        traps: [
          {
            spec: { type: "text", accept: ["square", "a square"] },
            feedback: "A square's diagonals are equal in length. These diagonals are not.",
          },
          {
            spec: { type: "text", accept: ["kite", "a kite"] },
            feedback: "In a kite, only one diagonal is cut in half by the other. Here both diagonals are cut in half.",
          },
        ],
        solution: [
          "Diagonals that cut each other in half (bisect each other) belong to the parallelogram family: parallelogram, rectangle, rhombus or square.",
          "Diagonals at right angles narrow it to a rhombus or a square.",
          "The diagonals are not equal, so it is not a square.",
          "So it is a **rhombus**.",
        ],
        difficulty: "warmup",
        guideRef: "quadrilaterals",
        hints: ["Which quadrilaterals have diagonals that bisect each other?", "Of those, which have diagonals at right angles? And which of those has equal diagonals?"],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q04",
        question:
          "A regular polygon has 20 lines of symmetry. Write down its order of rotational symmetry, then the size of each of its exterior angles. Give the order first.",
        answer: { type: "list", values: [20, 18], ordered: true, display: "order 20, exterior angle 18°" },
        traps: [
          {
            spec: { type: "list", values: [20, 162], ordered: true },
            feedback: "162° is the interior angle. Each exterior angle is 360° ÷ 20.",
          },
        ],
        solution: [
          "A regular polygon has as many lines of symmetry as sides, so it has 20 sides.",
          "Order of rotational symmetry = number of sides = 20.",
          "Each exterior angle = 360 ÷ 20 = 18°.",
        ],
        difficulty: "warmup",
        guideRef: "regular-polygon-symmetry",
        hints: ["For a regular polygon: sides = lines of symmetry = order of rotational symmetry.", "The exterior angles of any polygon add up to 360°."],
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q05",
        question:
          "The two lines marked with arrows are parallel. Find angles a and b. Give a first, then b.",
        diagram: `<svg viewBox="0 0 400 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines marked with arrows, crossed by a transversal sloping up to the right. At the upper line, the angle above the line and to the right of the transversal is 72 degrees, and angle b is below the upper line to the right of the transversal. At the lower line, angle a is above the line to the right of the transversal."><rect width="400" height="250" fill="#ffffff"/><line x1="20" y1="80" x2="380" y2="80" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="200" x2="380" y2="200" stroke="#1f2937" stroke-width="2"/><path d="M326,74 L334,80 L326,86 M326,194 L334,200 L326,206" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="141.7" y1="228.5" x2="205.5" y2="32.4" stroke="#334155" stroke-width="2"/><path d="M210,80 A20,20 0 0 0 196.18,60.98" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M184.44,97.12 A18,18 0 0 0 208,80" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><path d="M171.01,200 A20,20 0 0 0 157.19,180.98" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="214" y="64">72°</text><text x="208" y="108" font-style="italic">b</text><text x="178" y="186" font-style="italic">a</text></g></svg>`,
        answer: { type: "list", values: [72, 108], ordered: true, display: "a = 72°, b = 108°" },
        traps: [
          {
            spec: { type: "list", values: [72, 72], ordered: true },
            feedback: "b is not 72°. b and the 72° angle sit together on a straight line, so they add up to 180°.",
          },
        ],
        solution: [
          "a and the 72° angle are corresponding angles (an F-shape), so a = 72°.",
          "b and the 72° angle lie on a straight line, so b = 180 − 72 = 108°.",
          "Check: a and b are co-interior angles, and 72 + 108 = 180 ✓",
        ],
        difficulty: "warmup",
        guideRef: "parallel-lines",
        hints: ["Find the angle at the lower line that is in the same position as the 72°.", "b and the 72° share a straight line."],
        strategy: "Spot the F, Z or C shape",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q06",
        question:
          "Three angles meet at a point: (3x − 5)°, (2x + 40)° and a reflex angle of (4x + 100)°. Find the size of the reflex angle, in degrees.",
        diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three rays from a point O. The angles between them are (3x minus 5) degrees, (2x plus 40) degrees and a reflex angle of (4x plus 100) degrees."><rect width="400" height="240" fill="#ffffff"/><line x1="200" y1="140" x2="310" y2="140" stroke="#1f2937" stroke-width="2"/><line x1="200" y1="140" x2="237.62" y2="36.63" stroke="#1f2937" stroke-width="2"/><line x1="200" y1="140" x2="96.63" y2="102.38" stroke="#1f2937" stroke-width="2"/><path d="M222,140 A22,22 0 0 0 207.52,119.33" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M208.89,115.57 A26,26 0 0 0 175.57,131.11" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><path d="M171.81,129.74 A30,30 0 1 0 230,140" fill="none" stroke="#15803d" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="236" y="122">(3x − 5)°</text><text x="168" y="92" text-anchor="middle">(2x + 40)°</text><text x="200" y="198" text-anchor="middle">(4x + 100)°</text></g></svg>`,
        answer: { type: "number", value: 200, display: "200°" },
        traps: [
          {
            spec: { type: "number", value: 25 },
            feedback: "25 is the value of x. Substitute it into 4x + 100 to find the reflex angle.",
          },
        ],
        solution: [
          "Angles around a point add up to 360°: (3x − 5) + (2x + 40) + (4x + 100) = 360.",
          "Collect like terms: 9x + 135 = 360.",
          "9x = 225, so x = 25.",
          "Reflex angle = 4 × 25 + 100 = 200°.",
          "Check: 70 + 90 + 200 = 360 ✓",
        ],
        commonError: "Stopping at x = 25 instead of substituting back to find the angle.",
        difficulty: "core",
        guideRef: "angle-facts",
        hints: [
          "What do angles around a point add up to?",
          "Add the three expressions: collect the x terms and the numbers separately.",
          "Solve 9x + 135 = 360, then substitute x into 4x + 100.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q07",
        question:
          "Find the **total** number of lines of symmetry of these four shapes:\n\n- a rhombus that is not a square\n- a parallelogram that is not a rectangle and not a rhombus\n- a kite that is not a rhombus\n- an isosceles trapezium (exactly one pair of parallel sides)",
        answer: { type: "number", value: 4 },
        traps: [
          {
            spec: { type: "number", value: 6 },
            feedback: "A general parallelogram has **no** lines of symmetry: fold it along a diagonal or a middle line and the halves don't match. (It does have rotational symmetry of order 2.)",
          },
        ],
        solution: [
          "Rhombus (not a square): 2 lines — its two diagonals.",
          "Parallelogram (not a rectangle or rhombus): 0 lines.",
          "Kite (not a rhombus): 1 line — the diagonal through the corners where the equal sides meet.",
          "Isosceles trapezium: 1 line — through the midpoints of the two parallel sides.",
          "Total: 2 + 0 + 1 + 1 = 4.",
        ],
        commonError: "Giving a parallelogram 2 lines of symmetry. It has rotational symmetry, but no mirror lines.",
        difficulty: "core",
        guideRef: "regular-polygon-symmetry",
        hints: [
          "Take each shape in turn and imagine folding it so the two halves match exactly.",
          "Be careful with the parallelogram: does folding along a diagonal really work?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "angles-polygons-p4-q08",
        question:
          "Zara says: \"I have drawn a quadrilateral with exactly three right angles.\"\n\nExplain why this is impossible.",
        marks: 3,
        modelAnswer:
          "The interior angles of any quadrilateral add up to 360°. Three right angles make 3 × 90 = 270°, so the fourth angle must be 360 − 270 = 90°.\n\nThat is also a right angle, so the shape would have **four** right angles (it would be a rectangle). A quadrilateral can never have exactly three right angles.",
        markScheme: [
          { point: "The angles in a quadrilateral add up to 360°", keywords: ["360"] },
          { point: "Three right angles total 270°, so the fourth angle is 360 − 270 = 90°", keywords: ["270", "90"] },
          { point: "So the fourth angle is a right angle too — there would be four right angles, not exactly three", keywords: ["four", "4 right angles", "also a right angle", "not exactly three", "rectangle"] },
        ],
        commonError: "Just saying 'you can't draw it'. The explanation needs the 360° angle sum and the size of the fourth angle.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: ["What do the angles in a quadrilateral add up to?", "If three of the angles are 90°, what must the fourth one be?"],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q09",
        question:
          "The two lines marked with arrows are parallel. Find x, then angle y. Give x first.",
        diagram: `<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines marked with arrows, crossed by a transversal sloping up to the right. At the upper line, the angle above the line and to the right of the transversal is (3x plus 15) degrees, and angle y is below the upper line to the right of the transversal. At the lower line, the angle above the line and to the right of the transversal is (5x minus 25) degrees."><rect width="420" height="250" fill="#ffffff"/><line x1="20" y1="80" x2="400" y2="80" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="200" x2="400" y2="200" stroke="#1f2937" stroke-width="2"/><path d="M356,74 L364,80 L356,86 M356,194 L364,200 L356,206" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="180.1" y1="229" x2="232.9" y2="31.7" stroke="#334155" stroke-width="2"/><path d="M240,80 A20,20 0 0 0 225.18,60.68" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M215.34,97.39 A18,18 0 0 0 238,80" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><path d="M207.85,200 A20,20 0 0 0 193.03,180.68" fill="none" stroke="#b91c1c" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="244" y="62">(3x + 15)°</text><text x="238" y="108" font-style="italic">y</text><text x="214" y="184">(5x − 25)°</text></g></svg>`,
        answer: { type: "list", values: [20, 105], ordered: true, display: "x = 20, y = 105°" },
        traps: [
          {
            spec: { type: "list", values: [20, 75], ordered: true },
            feedback: "75° is the size of the two marked angles. y sits on a straight line with (3x + 15)°, so it is 180° − 75°.",
          },
        ],
        solution: [
          "(3x + 15)° and (5x − 25)° are corresponding angles (an F-shape), so they are equal.",
          "5x − 25 = 3x + 15, so 2x = 40 and x = 20.",
          "Each of these angles is 3 × 20 + 15 = 75°.",
          "y and (3x + 15)° lie on a straight line: y = 180 − 75 = 105°.",
        ],
        solutions: [
          {
            label: "Co-interior angles",
            steps: [
              "y and (5x − 25)° are both between the parallel lines, on the same side of the transversal: they are co-interior.",
              "So y = 180 − 75 = 105°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Which angle fact links (3x + 15)° and (5x − 25)°?",
          "Corresponding angles are equal, so set the two expressions equal and solve.",
          "Once you know the 75° angle, y is on a straight line with it.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q10",
        question:
          "Here are six quadrilaterals: square, rectangle, rhombus, parallelogram, kite, isosceles trapezium.\n\nHow many of them **always** have diagonals that bisect each other (cut each other exactly in half)?",
        answer: { type: "number", value: 4 },
        traps: [
          {
            spec: { type: "number", value: 5 },
            feedback: "Check the kite: its diagonals cross at right angles, but only one of them is cut in half — the other is not.",
          },
        ],
        solution: [
          "Diagonals that bisect each other are the mark of the parallelogram family.",
          "Square ✓, rectangle ✓, rhombus ✓, parallelogram ✓.",
          "Kite ✗: only one diagonal is cut in half. Isosceles trapezium ✗: its diagonals are equal, but they cross nearer the shorter parallel side.",
          "So 4 of the shapes.",
        ],
        commonError: "Counting the kite. One of its diagonals is cut in half, but not both.",
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "Sketch each shape with its diagonals. Is the crossing point the midpoint of **both** diagonals?",
          "The square, rectangle and rhombus are all special parallelograms.",
          "For the kite and the trapezium, check both diagonals, not just one.",
        ],
        strategy: "Eliminate options",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q11",
        question:
          "Side BC of triangle ABC is extended to D. Angle BAC = 2x°, angle ABC = (x + 30)° and the exterior angle ACD = (5x − 4)°.\n\nFind x, then the interior angle ACB. Give x first.",
        diagram: `<svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with base BC horizontal and A high above, slightly to the right of C. Side BC is extended beyond C to D. Angle A is 2x degrees, angle B is (x plus 30) degrees and the exterior angle ACD is (5x minus 4) degrees."><rect width="460" height="250" fill="#ffffff"/><polygon points="80,220 230,220 260.69,26.24" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="230" y1="220" x2="430" y2="220" stroke="#1f2937" stroke-width="2"/><path d="M245.69,42.33 A22,22 0 0 0 257.25,47.97" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M106,220 A26,26 0 0 0 97.73,200.98" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M252,220 A22,22 0 0 0 233.44,198.27" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="244" y="70" text-anchor="middle" font-size="12">2x</text><text x="112" y="210" font-size="12">x + 30</text><text x="262" y="202" font-size="12">5x − 4</text><text x="266" y="24">A</text><text x="68" y="238">B</text><text x="224" y="238">C</text><text x="424" y="238">D</text></g></svg>`,
        answer: { type: "list", values: [17, 99], ordered: true, display: "x = 17, angle ACB = 99°" },
        traps: [
          {
            spec: { type: "list", values: [17, 81], ordered: true },
            feedback: "81° is the exterior angle ACD. Angle ACB is inside the triangle, on a straight line with it.",
          },
        ],
        solution: [
          "An exterior angle of a triangle equals the sum of the two interior opposite angles: 5x − 4 = 2x + (x + 30).",
          "5x − 4 = 3x + 30, so 2x = 34 and x = 17.",
          "Exterior angle ACD = 5 × 17 − 4 = 81°.",
          "Angles on a straight line: angle ACB = 180 − 81 = 99°.",
          "Check: A = 34°, B = 47°, C = 99°, and 34 + 47 + 99 = 180 ✓",
        ],
        solutions: [
          {
            label: "Angle sum of the triangle",
            steps: [
              "Angle ACB = 180 − (5x − 4) = 184 − 5x (angles on a straight line).",
              "Angles in the triangle: 2x + (x + 30) + (184 − 5x) = 180.",
              "214 − 2x = 180, so x = 17 and angle ACB = 184 − 85 = 99°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "triangles",
        hints: [
          "Which two angles of the triangle are the interior opposite angles for the exterior angle at C?",
          "Exterior angle = sum of interior opposite angles: 5x − 4 = 2x + x + 30.",
          "Find x, then use the straight line BCD.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "written",
        id: "angles-polygons-p4-q12",
        question:
          "WY is parallel to XZ (single arrows), and WX is parallel to YZ (double arrows). The line XW is extended beyond W, and the angle between this extension and WY is 65°.\n\nFind angle XZY, marked x. Give a reason for each step of your working.",
        diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two horizontal parallel lines marked with single arrows, and two parallel lines sloping up to the right marked with double arrows, forming parallelogram WXZY. W and Y are on the upper line, X and Z on the lower line. At W, the angle above the upper line, between WY and the extension of XW, is 65 degrees. Angle x is angle XZY inside the parallelogram at Z."><rect width="480" height="260" fill="#ffffff"/><polygon points="180.62,70 360.62,70 300,200 120,200" fill="#bae6fd"/><line x1="40" y1="70" x2="460" y2="70" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="200" x2="460" y2="200" stroke="#1f2937" stroke-width="2"/><line x1="101.35" y1="240" x2="199.27" y2="30" stroke="#334155" stroke-width="2"/><line x1="281.35" y1="240" x2="379.27" y2="30" stroke="#334155" stroke-width="2"/><path d="M424,64 L432,70 L424,76 M424,194 L432,200 L424,206" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M155.05,136.66 L153.48,128.2 L145.99,132.44 M151.25,144.82 L149.68,136.36 L142.19,140.6 M335.05,136.66 L333.48,128.2 L325.99,132.44 M331.25,144.82 L329.68,136.36 L322.19,140.6" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M200.62,70 A20,20 0 0 0 189.07,51.87" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M308.45,181.87 A20,20 0 0 0 280,200" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="206" y="56">65°</text><text x="282" y="178" font-style="italic">x</text><text x="164" y="62">W</text><text x="342" y="62">Y</text><text x="126" y="218">X</text><text x="306" y="218">Z</text></g></svg>`,
        marks: 4,
        modelAnswer:
          "At X, the angle between XZ and XW (inside the shape) is 65° — **corresponding angles**, because WY is parallel to XZ.\n\nAt Z, the angle between the extension of XZ beyond Z and ZY is also 65° — **corresponding angles**, because WX is parallel to YZ.\n\nx and that 65° angle lie together on the straight line XZ, so x = 180 − 65 = 115° — **angles on a straight line add up to 180°**.",
        markScheme: [
          { point: "First step: finds a 65° angle (e.g. angle WXZ) with a correct reason such as corresponding angles", keywords: ["corresponding", "alternate", "65"] },
          { point: "Second step: moves the angle across using the other pair of parallel lines, with a reason", keywords: ["corresponding", "alternate", "co-interior", "vertically opposite", "parallel"] },
          { point: "Uses angles on a straight line (or co-interior angles) to get from 65° to x", keywords: ["straight line", "co-interior", "180"] },
          { point: "x = 115°", keywords: ["115"] },
        ],
        solutions: [
          {
            label: "Another route",
            steps: [
              "At Y, the angle above WY and to the right of YZ is 65°: corresponding angles, because WX is parallel to YZ.",
              "Angle WYZ = 65°: vertically opposite angles.",
              "x and angle WYZ are co-interior angles between the parallel lines WY and XZ, so x = 180 − 65 = 115°.",
            ],
          },
        ],
        commonError: "Writing 'F-angles' or 'Z-angles' as reasons. Use the proper names: corresponding angles, alternate angles, co-interior angles.",
        difficulty: "core",
        guideRef: "parallel-lines",
        hints: [
          "Move the 65° one step at a time. Which angle at X is in the same position as the 65° at W?",
          "Then use the double-arrow lines to move it from X across to Z.",
          "At Z, x and the angle you found share a straight line.",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q13",
        question:
          "The interior angles of a hexagon ABCDEF are shown in the table.\n\n| Angle | A | B | C | D | E | F |\n|---|---|---|---|---|---|---|\n| Size (°) | 3x | 4x | 2x + 50 | x + 95 | 125 | 100 |\n\nFind x, then the size of the largest angle of the hexagon. Give x first.",
        answer: { type: "list", values: [35, 140], ordered: true, display: "x = 35, largest angle = 140°" },
        traps: [
          {
            spec: { type: "list", values: [17, 125], ordered: true },
            feedback: "Did you use 540°? That is the angle sum of a pentagon. A hexagon's interior angles add up to (6 − 2) × 180 = 720°.",
          },
        ],
        solution: [
          "The interior angles of a hexagon add up to (6 − 2) × 180 = 720°.",
          "Add the table: 3x + 4x + (2x + 50) + (x + 95) + 125 + 100 = 10x + 370.",
          "10x + 370 = 720, so 10x = 350 and x = 35.",
          "The angles are A = 105°, B = 140°, C = 120°, D = 130°, E = 125°, F = 100°.",
          "The largest angle is B = 140°. Check: 105 + 140 + 120 + 130 + 125 + 100 = 720 ✓",
        ],
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "What do the interior angles of a hexagon add up to?",
          "Collect the x terms and the number terms from the table separately.",
          "Once you have x, work out every angle — the largest one isn't obvious until you do.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q14",
        question:
          "ABCD is a rectangle. Its diagonals AC and BD cross at O, and angle AOB = 118°. Find angle OBC, in degrees.",
        diagram: `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rectangle ABCD with A at the top left, B at the top right, C at the bottom right and D at the bottom left. The diagonals AC and BD cross at O. Angle AOB is 118 degrees. Angle OBC, at corner B between the diagonal and side BC, is marked with a question mark."><rect width="480" height="280" fill="#ffffff"/><polygon points="111.42,62.74 368.58,62.74 368.58,217.26 111.42,217.26" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="111.42" y1="62.74" x2="368.58" y2="217.26" stroke="#334155" stroke-width="2"/><line x1="368.58" y1="62.74" x2="111.42" y2="217.26" stroke="#334155" stroke-width="2"/><path d="M121.42,62.74 L121.42,72.74 L111.42,72.74 M358.58,217.26 L358.58,207.26 L368.58,207.26 M121.42,217.26 L121.42,207.26 L111.42,207.26" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M255.43,130.73 A18,18 0 0 0 224.57,130.73" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M349.72,74.07 A22,22 0 0 0 368.58,84.74" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="240" y="114" text-anchor="middle">118°</text><text x="350" y="100">?</text><text x="98" y="58">A</text><text x="374" y="58">B</text><text x="374" y="234">C</text><text x="98" y="234">D</text><text x="240" y="164" text-anchor="middle">O</text></g></svg>`,
        answer: { type: "number", value: 59, display: "59°" },
        traps: [
          {
            spec: { type: "number", value: 31 },
            feedback: "31° is angle OBA, between the diagonal and the top side. Angle OBC is the rest of the right angle at B.",
          },
        ],
        solution: [
          "The diagonals of a rectangle are equal and bisect each other, so OA = OB.",
          "Triangle AOB is isosceles: angle OAB = angle OBA = (180 − 118) ÷ 2 = 31°.",
          "Each corner of a rectangle is 90°, so angle OBC = 90 − 31 = 59°.",
        ],
        solutions: [
          {
            label: "Using triangle BOC",
            steps: [
              "Angle BOC = 180 − 118 = 62° (angles on the straight line AC).",
              "OB = OC, so triangle BOC is isosceles: angle OBC = (180 − 62) ÷ 2 = 59°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "quadrilaterals",
        hints: [
          "What do you know about the diagonals of a rectangle? Compare OA and OB.",
          "Triangle AOB is isosceles — find its two base angles.",
          "The corner at B is 90°. Angle OBC is what is left.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q15",
        question:
          "Each interior angle of a regular polygon is 160°. Find:\n\n1. the number of sides,\n2. the smallest angle it can be rotated through to fit onto its outline again,\n3. the sum of its interior angles.\n\nGive your three answers in this order.",
        answer: { type: "list", values: [18, 20, 2880], ordered: true, display: "18 sides, 20°, 2880°" },
        traps: [
          {
            spec: { type: "list", values: [18, 160, 2880], ordered: true },
            feedback: "The smallest turn is not the interior angle. It is 360° ÷ 18 — the same as the exterior angle.",
          },
        ],
        solution: [
          "Exterior angle = 180 − 160 = 20°.",
          "Number of sides = 360 ÷ 20 = 18.",
          "Smallest angle of rotation = 360 ÷ 18 = 20° (the same as the exterior angle).",
          "Sum of interior angles = (18 − 2) × 180 = 16 × 180 = 2880°. Check: 18 × 160 = 2880 ✓",
        ],
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "Find the exterior angle first.",
          "Number of sides = 360 ÷ exterior angle. A regular polygon with n sides fits onto itself every 360° ÷ n.",
          "For the sum, use (n − 2) × 180° — or simply multiply the number of sides by 160°.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "written",
        id: "angles-polygons-p4-q16",
        question:
          "Ravi says: \"A regular polygon with more sides has bigger exterior angles, because its interior angles are bigger.\"\n\nIs Ravi right? Explain your answer, using an example.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong.\n\nThe exterior angles of any polygon add up to 360°, so each exterior angle of a regular n-sided polygon is 360° ÷ n. With more sides, the 360° is shared between more corners, so each exterior angle is **smaller**.\n\nRavi is right that the interior angles get bigger, but at each corner interior + exterior = 180°, so a bigger interior angle means a smaller exterior angle. For example, an equilateral triangle has exterior angles of 120° (interior 60°), but a regular hexagon has exterior angles of only 60° (interior 120°).",
        markScheme: [
          { point: "States that Ravi is wrong: more sides means smaller exterior angles", keywords: ["no", "wrong", "smaller", "not right"] },
          { point: "Exterior angles always add up to 360°, so each is 360 ÷ n — shared between more corners", keywords: ["360", "shared", "divided", "÷ n"] },
          { point: "Interior + exterior = 180°, so bigger interior means smaller exterior, or a correct numerical example (e.g. triangle 120° vs hexagon 60°)", keywords: ["180", "120", "60", "triangle", "hexagon", "square"] },
        ],
        commonError: "Agreeing with Ravi because the interior angles do get bigger. The exterior angle is the turn at each corner, and that gets smaller.",
        difficulty: "core",
        guideRef: "polygon-angles",
        hints: [
          "Test Ravi's claim: compare an equilateral triangle with a regular hexagon.",
          "What do the exterior angles of any polygon add up to?",
          "At each corner, interior + exterior = 180°. If one goes up, what happens to the other?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q17",
        question:
          "The three exterior angles of a triangle (one at each corner) are in the ratio 4 : 5 : 6. Find the size of the largest **interior** angle of the triangle, in degrees.",
        answer: { type: "number", value: 84, display: "84°" },
        traps: [
          {
            spec: { type: "number", value: 72 },
            feedback: "72° comes from sharing 180° in the ratio 4 : 5 : 6. But the ratio is for the *exterior* angles, which add up to 360°.",
          },
          {
            spec: { type: "number", value: 144 },
            feedback: "144° is the largest *exterior* angle. The largest interior angle sits next to the smallest exterior angle.",
          },
        ],
        solution: [
          "The exterior angles of any polygon, including a triangle, add up to 360°.",
          "4 + 5 + 6 = 15 parts, so one part = 360 ÷ 15 = 24°.",
          "Exterior angles: 4 × 24 = 96°, 5 × 24 = 120°, 6 × 24 = 144°.",
          "Interior angles: 180 − 96 = 84°, 180 − 120 = 60°, 180 − 144 = 36°. Check: 84 + 60 + 36 = 180 ✓",
          "The largest interior angle is 84° — next to the smallest exterior angle.",
        ],
        commonError: "Sharing 180° in the ratio, as if the ratio described the interior angles.",
        difficulty: "challenge",
        guideRef: "triangles",
        hints: [
          "What do the three exterior angles of a triangle add up to? (It isn't 180°.)",
          "Share that total in the ratio 4 : 5 : 6.",
          "Each interior angle is 180° minus its exterior angle. Which exterior angle gives the biggest interior angle?",
        ],
        strategy: "Use a bar model",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q18",
        question:
          "In the diagram, B, D and F lie on one straight line from A, and C and E lie on another straight line from A. AB = BC = CD = DE, and angle BAC = 20°.\n\nFind angle EDF, in degrees.",
        diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two straight lines meet at A with an angle of 20 degrees between them. B, D and F lie on the lower line; C and E lie on the upper line. A zig-zag goes from B to C to D to E. Segments AB, BC, CD and DE are all equal, shown with single tick marks. Angle EDF, between DE and the lower line beyond D, is marked with a question mark."><rect width="480" height="290" fill="#ffffff"/><line x1="30" y1="260" x2="460" y2="260" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="260" x2="440" y2="110.8" stroke="#1f2937" stroke-width="2"/><path d="M150,260 L241.9,182.9 L333.8,260 L354.8,141.8" fill="none" stroke="#334155" stroke-width="2"/><path d="M115,254 L115,266 M199.8,226 L192.1,216.9 M284,226 L291.7,216.9 M350.2,201.95 L338.4,199.85" fill="none" stroke="#1f2937" stroke-width="1.5"/><path d="M70,260 A40,40 0 0 0 67.59,246.32" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M353.8,260 A20,20 0 0 0 337.27,240.3" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><circle cx="440" cy="260" r="3" fill="#1f2937"/><g font-family="sans-serif" font-size="13" fill="#1f2937"><text x="80" y="256" font-size="12">20°</text><text x="358" y="246">?</text><text x="14" y="266">A</text><text x="144" y="280">B</text><text x="230" y="174">C</text><text x="328" y="280">D</text><text x="342" y="134">E</text><text x="436" y="280">F</text></g></svg>`,
        answer: { type: "number", value: 80, display: "80°" },
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback: "60° is angle DEC (and angle DCE). Go one more step: angle EDF is an exterior angle of triangle ADE.",
          },
          {
            spec: { type: "number", value: 40 },
            feedback: "40° is angle CBD (and angle CDB). Keep going along the zig-zag — the angles keep growing.",
          },
        ],
        solution: [
          "AB = BC, so triangle ABC is isosceles: angle BCA = angle BAC = 20°.",
          "Exterior angle of triangle ABC at B: angle CBD = 20 + 20 = 40°.",
          "BC = CD, so triangle BCD is isosceles: angle CDB = angle CBD = 40°.",
          "Exterior angle of triangle ACD at C: angle DCE = 20 + 40 = 60°.",
          "CD = DE, so triangle CDE is isosceles: angle DEC = angle DCE = 60°.",
          "Exterior angle of triangle ADE at D: angle EDF = 20 + 60 = 80°.",
          "Notice the pattern: 20°, 40°, 60°, 80° — each new zig-zag angle is 20° more.",
        ],
        difficulty: "challenge",
        guideRef: "triangles",
        hints: [
          "Equal lengths mean isosceles triangles. Start with triangle ABC.",
          "Use the exterior angle fact at B, then at C. The angles go 20°, 40°, …",
          "Angle DEC = 60°. Angle EDF is an exterior angle of triangle ADE.",
        ],
        strategy: "Find a pattern",
      },
      {
        kind: "short",
        id: "angles-polygons-p4-q19",
        question:
          "Aisha adds up the interior angles of a polygon with no reflex angles, but she accidentally leaves one angle out. The total of the others is 1000°. How many sides does the polygon have, and what is the missing angle? Give the number of sides first.",
        answer: { type: "list", values: [8, 80], ordered: true, display: "8 sides, missing angle 80°" },
        traps: [
          {
            spec: { type: "list", values: [9, 260], ordered: true },
            feedback: "A missing angle of 260° would be a reflex angle — but this polygon has none, so every angle is less than 180°.",
          },
        ],
        solution: [
          "The full interior angle sum is (n − 2) × 180°, so it must be a multiple of 180°.",
          "The missing angle is more than 0° and less than 180° (no reflex angles), so the full sum is between 1000° and 1180°.",
          "Multiples of 180°: …, 900, 1080, 1260, … Only 1080° lies in that range.",
          "(n − 2) × 180 = 1080 gives n − 2 = 6, so n = 8 sides.",
          "Missing angle = 1080 − 1000 = 80°.",
        ],
        commonError: "Taking the next multiple of 180° after 1080° as well — that would make the missing angle reflex.",
        difficulty: "challenge",
        guideRef: "polygon-angles",
        hints: [
          "The true total is (n − 2) × 180°. What kind of number must it be?",
          "The missing angle is less than 180°. So between which two values must the true total lie?",
          "Find the multiple of 180 just above 1000.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "written",
        id: "angles-polygons-p4-q20",
        question:
          "AB is parallel to CD. Point P lies between the two lines. Angle BAP = a and angle DCP = c, as shown.\n\nProve that angle APC = a + c. Give a reason for each step.",
        diagram: `<svg viewBox="0 0 440 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two parallel horizontal lines, AB on top and CD underneath, marked with arrows. Point P lies between them, to the right of A and C. Lines AP and CP are drawn. Angle a is at A, between AB and AP. Angle c is at C, between CD and CP. Angle APC is marked at P."><rect width="440" height="260" fill="#ffffff"/><line x1="40" y1="50" x2="420" y2="50" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="230" x2="420" y2="230" stroke="#1f2937" stroke-width="2"/><path d="M376,44 L384,50 L376,56 M376,224 L384,230 L376,236" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="50" x2="300" y2="140" stroke="#334155" stroke-width="2"/><line x1="100" y1="230" x2="300" y2="140" stroke="#334155" stroke-width="2"/><path d="M141.47,60.73 A24,24 0 0 0 144,50" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M124,230 A24,24 0 0 0 121.88,220.15" fill="none" stroke="#b91c1c" stroke-width="1.5"/><path d="M280.32,130.16 A22,22 0 0 0 279.94,149.03" fill="none" stroke="#1d4ed8" stroke-width="1.5"/><g font-family="sans-serif" font-size="14" fill="#1f2937"><text x="158" y="64" font-style="italic">a</text><text x="140" y="226" font-style="italic">c</text><text x="114" y="40">A</text><text x="412" y="42">B</text><text x="94" y="250">C</text><text x="412" y="250">D</text><text x="308" y="145">P</text></g></svg>`,
        marks: 3,
        modelAnswer:
          "Draw a line through P parallel to AB. It is then also parallel to CD, and it splits angle APC into an upper part and a lower part.\n\n- The upper part and angle a are **alternate angles** (AB is parallel to the new line), so the upper part = a.\n- The lower part and angle c are **alternate angles** (CD is parallel to the new line), so the lower part = c.\n\nSo angle APC = a + c. Nothing depended on the actual sizes of a and c, so this is true for every diagram like this one: P between the lines, with a and c marked as shown.",
        markScheme: [
          { point: "Draws (or describes) a line through P parallel to AB and CD", keywords: ["parallel", "line through p", "draw a line", "extra line"] },
          { point: "Upper part of angle APC equals a, because they are alternate angles", keywords: ["alternate", "= a"] },
          { point: "Lower part equals c (alternate angles), so angle APC = a + c", keywords: ["= c", "a + c"] },
        ],
        solutions: [
          {
            label: "Using a triangle",
            steps: [
              "Extend AP beyond P until it meets CD at a point E.",
              "Angle PEC = a: alternate angles, because AB is parallel to CD.",
              "Angle APC is an exterior angle of triangle PEC, so angle APC = angle PEC + angle PCE = a + c.",
            ],
          },
        ],
        commonError: "Measuring the angles in the diagram. A proof must work for every diagram of this kind, wherever P is, so it uses angle facts, not a protractor.",
        difficulty: "challenge",
        guideRef: "angle-proofs",
        hints: [
          "The parallel lines are far away from P. Could you add a parallel line that goes through P?",
          "Draw a line through P parallel to AB. It splits angle APC into two parts.",
          "Each part matches a or c in a Z-shape. Which angle fact is that?",
        ],
        strategy: "Draw a diagram",
      },
    ],
  },
];
