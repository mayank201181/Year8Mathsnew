import type { Paper } from "../../types.ts";

// Practice Papers 3 and 4 for "Constructions, Scale Drawings & Bearings".
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "constructions-bearings-p3",
    title: "Practice Paper 3",
    questions: [
      {
        kind: "short",
        id: "constructions-bearings-p3-q01",
        question:
          "A ceiling fan has 5 identical blades, equally spaced around its centre. What is the **reflex** angle between two neighbouring blades? Give your answer in degrees.",
        answer: { type: "number", value: 288, display: "288°" },
        traps: [
          {
            spec: { type: "number", value: 72 },
            feedback:
              "72° is the smaller angle between neighbouring blades. The reflex angle goes the long way round: 360° − 72°.",
          },
        ],
        solution: [
          "The 5 equal angles at the centre make a full turn: 360° ÷ 5 = 72°.",
          "The reflex angle is the rest of the turn: 360° − 72° = 288°.",
          "Check: 288° is between 180° and 360°, so it is reflex.",
        ],
        commonError: "Stopping at 72°, which is the smaller angle between the blades, not the reflex one.",
        difficulty: "warmup",
        guideRef: "measuring-angles",
        hints: [
          "How many degrees are in a full turn, and how many equal gaps are there between the blades?",
          "Each gap is 360° ÷ 5. The reflex angle is everything else.",
        ],
        strategy: "Use the inverse (360° minus the inside angle)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q02",
        question:
          "A drone takes off flying due East. It turns 120° clockwise, then 45° anticlockwise. On what three-figure bearing is it now flying? Give the number of degrees.",
        answer: { type: "number", value: 165, display: "165°" },
        traps: [
          {
            spec: { type: "number", value: 255 },
            feedback: "An anticlockwise turn makes a bearing *smaller* — you added the 45° instead of subtracting it.",
          },
          {
            spec: { type: "number", value: 210 },
            feedback: "210° is the bearing after the first turn. Now turn 45° anticlockwise.",
          },
        ],
        solution: [
          "Due East is 090°.",
          "A clockwise turn adds: 090° + 120° = 210°.",
          "An anticlockwise turn subtracts: 210° − 45° = 165°.",
        ],
        difficulty: "warmup",
        guideRef: "bearings",
        hints: ["What bearing is due East?", "Clockwise turns add to a bearing; anticlockwise turns subtract."],
        strategy: "Draw a diagram (North line first)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q03",
        question:
          "Wei Ling's CCA is planning a school garden. The plan uses a scale of 1 : 200. A raised flower bed is 3.5 cm long on the plan. How long is the real flower bed? Give your answer in metres.",
        answer: { type: "number", value: 7, display: "7 m" },
        traps: [
          {
            spec: { type: "number", value: 700 },
            feedback: "700 is the length in **centimetres**. Divide by 100 to change it to metres.",
          },
          {
            spec: { type: "number", value: 0.7 },
            feedback: "Check the conversion: 100 cm = 1 m, so 700 cm = 7 m.",
          },
        ],
        solution: [
          "1 : 200 means every 1 cm on the plan stands for 200 cm in real life.",
          "3.5 × 200 = 700 cm.",
          "700 cm ÷ 100 = 7 m.",
        ],
        commonError: "Giving 700 — the right number of centimetres, but the question asks for metres.",
        difficulty: "warmup",
        guideRef: "scale-drawings",
        hints: ["What does 1 cm on the plan stand for in real life?", "Multiply by 200, then change cm into m."],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q04",
        question:
          "Siti kayaks from a jetty to a small island on a bearing of 155°. On what bearing must she paddle to come straight back to the jetty? Give the number of degrees.",
        answer: { type: "number", value: 335, display: "335°" },
        traps: [
          {
            spec: { type: "number", value: 205 },
            feedback:
              "205° = 360° − 155° reflects the direction in the North line instead of reversing it. Coming back is a half turn: add 180°.",
          },
        ],
        solution: [
          "Coming straight back means facing the opposite way — a half turn of 180°.",
          "155° is less than 180°, so add: 155° + 180° = 335°.",
          "Check: the island is south-east of the jetty, so the jetty is north-west of the island — and 335° points north-west-ish.",
        ],
        commonError: "Using 360° − 155° = 205°, which points south-west, not back towards the jetty.",
        difficulty: "warmup",
        guideRef: "back-bearings",
        hints: ["Coming straight back is what fraction of a full turn?", "155° is under 180°, so add 180°."],
        strategy: "Check by reasonableness",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q05",
        question:
          "Hana has two sticks, 6 cm and 9 cm long. She wants a third stick, a whole number of centimetres long, that will be the **longest** side of a triangle. What is the longest third stick she can use? Give your answer in cm.",
        answer: { type: "number", value: 14, display: "14 cm" },
        traps: [
          {
            spec: { type: "number", value: 15 },
            feedback:
              "With 15 cm, 6 + 9 = 15 exactly, so the two short sticks lie flat along the long one — no triangle. They must add to *more than* the longest side.",
          },
        ],
        solution: [
          "The two shorter sides must add to more than the longest side.",
          "6 + 9 = 15, so the third stick must be shorter than 15 cm.",
          "The longest whole number below 15 is 14. Check: 6 + 9 = 15, which is more than 14.",
        ],
        commonError: "Allowing the longest side to equal the sum of the other two.",
        difficulty: "warmup",
        guideRef: "constructing-triangles",
        hints: [
          "What must the two shorter sides do compared with the longest side?",
          "6 + 9 = 15. Can the longest side be exactly 15 cm?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q06",
        question:
          "Priya has four wooden rods, of lengths 3 cm, 5 cm, 9 cm and 11 cm. She picks any three of them and tries to join them end to end into a triangle. How many different triangles can she make?",
        answer: { type: "number", value: 2 },
        traps: [
          {
            spec: { type: "number", value: 4 },
            feedback:
              "There are 4 ways to choose three rods, but not every choice closes up. For each set, check whether the two shorter rods add to more than the longest.",
          },
          {
            spec: { type: "number", value: 3 },
            feedback: "One of your sets fails. Look again at any set containing both the 3 cm and the 5 cm rods.",
          },
        ],
        solution: [
          "Choosing 3 rods from 4 means leaving one out, so there are only 4 sets to test.",
          "3, 5, 9: 3 + 5 = 8, not more than 9 — impossible.",
          "3, 5, 11: 3 + 5 = 8, not more than 11 — impossible.",
          "3, 9, 11: 3 + 9 = 12, more than 11 — possible.",
          "5, 9, 11: 5 + 9 = 14, more than 11 — possible.",
          "So Priya can make 2 triangles.",
        ],
        commonError: "Counting every set of three rods without testing the triangle inequality.",
        difficulty: "core",
        guideRef: "constructing-triangles",
        hints: [
          "How many ways are there to choose 3 rods out of 4? List them.",
          "For each set, add the two shorter rods. Is the total more than the longest rod?",
          "3 + 5 = 8 is too short to beat 9 or 11. Which sets does that rule out?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q07",
        question:
          "Two school gates, A and B, are 640 m apart along a straight path. A drinks stall S stands on the perpendicular bisector of AB, 410 m from gate A. Jun walks from A to the stall, then from the stall to B, then back to A along the path. How far does he walk altogether? Give your answer in metres.",
        answer: { type: "number", value: 1460, display: "1460 m" },
        traps: [
          {
            spec: { type: "number", value: 1050 },
            feedback:
              "You've missed out the stall-to-B leg. Every point on the perpendicular bisector is the **same distance** from A and B, so SB = 410 m too.",
          },
          {
            spec: { type: "number", value: 1140 },
            feedback: "The last leg is the whole path from B back to A — 640 m, not half of it.",
          },
        ],
        solution: [
          "S is on the perpendicular bisector of AB, so S is equidistant from A and B: SB = SA = 410 m.",
          "Total = AS + SB + BA = 410 + 410 + 640.",
          "= 1460 m.",
        ],
        commonError: "Thinking SB can't be found without measuring. The perpendicular bisector gives it for free.",
        difficulty: "core",
        guideRef: "perpendicular-bisector",
        hints: [
          "What is special about every point on the perpendicular bisector of AB?",
          "SB is equal to a length you already know.",
          "Add the three legs: AS + SB + BA.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "constructions-bearings-p3-q08",
        question:
          "A bus stop P is near a long, straight canal path. The council wants to build a footpath from P to the canal path that is **as short as possible**.\n\n(a) Describe how to construct this footpath accurately, using only compasses and a straight edge.\n\n(b) Explain why this footpath is shorter than any other straight path from P to the canal path.",
        marks: 3,
        modelAnswer:
          "(a) Put the compass point on P and draw an arc that cuts the canal path at two points, G and H. Keeping the compasses at the same width, draw an arc from G and an arc from H on the other side of the canal path, so that they cross at K. Rule the line from P towards K. It meets the canal path at N, and PN is the footpath.\n\n(b) PN meets the canal path at 90°. Take any other point X on the canal path. Triangle PNX has a right angle at N, which is its largest angle, so the side opposite it — PX — is the longest side of the triangle. So PX is longer than PN: every slanting path is longer than the perpendicular one.",
        markScheme: [
          {
            point: "Draws an arc centred on P that cuts the canal path at two points",
            keywords: ["arc", "centre p", "centred on p", "two points", "cuts"],
          },
          {
            point: "Equal arcs from the two crossing points meet at a point; joins P to it (the perpendicular)",
            keywords: ["equal arcs", "same width", "same radius", "cross", "join", "perpendicular"],
          },
          {
            point: "Explains it is shortest: it meets the path at 90°, and any other path is the longest side (hypotenuse) of a right-angled triangle",
            keywords: ["90", "right angle", "hypotenuse", "longest side", "slant", "shortest"],
          },
        ],
        commonError: "Bisecting an angle instead of constructing a perpendicular, or saying 'go straight down' without any construction.",
        difficulty: "core",
        guideRef: "angle-bisector",
        hints: [
          "At what angle should the shortest route meet a straight line?",
          "An arc centred on P cuts the line at two points that are the same distance from P. Which construction uses two such points?",
          "Compare the perpendicular path with a slanting one. What kind of triangle do they make together?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q09",
        question:
          "From a coastguard tower, a yacht is on a bearing of 038° and a kayak is on a bearing of 152°. The tower's searchlight starts pointing at the yacht, then sweeps **clockwise** at 3° per second.\n\nHow many seconds until it first points at the kayak? How many **more** seconds after that until it points at the yacht again? Give the two answers in that order.",
        answer: { type: "list", values: [38, 82], ordered: true, display: "38 seconds, then 82 more seconds" },
        traps: [
          {
            spec: { type: "list", values: [114, 246], ordered: true },
            feedback: "Those are the angles the light turns through. Divide each one by 3° per second to get the times.",
          },
          {
            spec: { type: "list", values: [38, 120], ordered: true },
            feedback:
              "120 seconds is a whole turn. From the kayak, the light only has to turn the rest of the way round: 360° − 114°.",
          },
        ],
        solution: [
          "Clockwise from 038° to 152° is 152° − 38° = 114°.",
          "Time: 114 ÷ 3 = 38 seconds.",
          "From the kayak, carrying on clockwise past North and back to the yacht, is the rest of the full turn: 360° − 114° = 246°.",
          "Time: 246 ÷ 3 = 82 seconds.",
        ],
        commonError: "Using 360° for the second sweep instead of the remaining 246°.",
        difficulty: "core",
        guideRef: "bearings",
        hints: [
          "Bearings are measured clockwise. How far does the light turn from 038° to 152°?",
          "After the kayak, the light keeps turning clockwise, past North, round to 038°. What is the rest of the full turn?",
          "Divide each angle by 3.",
        ],
        strategy: "Draw a diagram (North line first)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q10",
        question:
          "Mei cycles from A to B on a bearing of 125°. At B she turns and cycles to C on a bearing of 230°. Find the size of angle ABC, in degrees.",
        answer: { type: "number", value: 75, display: "75°" },
        traps: [
          {
            spec: { type: "number", value: 105 },
            feedback:
              "105° (230° − 125°) is how far Mei *turned* at B. Angle ABC is the angle between the two legs, which is 180° − 105°.",
          },
          {
            spec: { type: "number", value: 305 },
            feedback: "305° is the bearing of A from B. Now compare it with the bearing of C from B.",
          },
        ],
        solution: [
          "Draw a North line at B.",
          "The bearing of A from B is the back bearing of 125°: 125° + 180° = 305°.",
          "The bearing of C from B is 230°.",
          "Both are measured from the same North line, so angle ABC = 305° − 230° = 75°.",
        ],
        solutions: [
          {
            label: "Using the turn",
            steps: [
              "Mei's direction changes from 125° to 230°: a clockwise turn of 105°.",
              "The turn and angle ABC sit together on the straight line through A and B, so angle ABC = 180° − 105° = 75°.",
            ],
          },
        ],
        commonError: "Giving the turn (105°) instead of the angle between the legs.",
        difficulty: "core",
        guideRef: "back-bearings",
        hints: [
          "Draw a North line at B. Which two directions from B make angle ABC?",
          "Find the bearing of A from B — it is a back bearing.",
          "Angle ABC is the difference between the bearing of A from B and the bearing of C from B.",
        ],
        strategy: "Draw a diagram with a North line at every point",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q11",
        question:
          "A river walk measures 9 cm on Map A, which has a scale of 1 : 20 000. Map B has a scale of 1 cm to 500 m. How long is the same river walk on Map B? Give your answer in cm.",
        answer: { type: "number", value: 3.6, display: "3.6 cm" },
        traps: [
          {
            spec: { type: "number", value: 360 },
            feedback: "Change 180 000 cm into metres (1800 m) before dividing by 500 m.",
          },
          {
            spec: { type: "number", value: 22.5 },
            feedback: "Map B shows things *smaller* than Map A (1 cm covers more ground), so the walk must be shorter than 9 cm on Map B.",
          },
        ],
        solution: [
          "Real length: 9 × 20 000 = 180 000 cm.",
          "180 000 cm ÷ 100 = 1800 m.",
          "On Map B, each 1 cm stands for 500 m: 1800 ÷ 500 = 3.6 cm.",
        ],
        solutions: [
          {
            label: "Compare the scales",
            steps: [
              "500 m = 50 000 cm, so Map B is 1 : 50 000.",
              "50 000 ÷ 20 000 = 2.5, so Map B shrinks lengths 2.5 times more than Map A.",
              "9 ÷ 2.5 = 3.6 cm. Quicker once you see both scales as ratios.",
            ],
          },
        ],
        commonError: "Mixing centimetres and metres when using the second scale.",
        difficulty: "core",
        guideRef: "scale-drawings",
        hints: [
          "Find the real length of the walk first.",
          "Change the real length into metres to match Map B's scale.",
          "How many 500 m pieces fit into the real length?",
        ],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "written",
        id: "constructions-bearings-p3-q12",
        question:
          "On an orienteering course, Hana walks 400 m due East and then 300 m due South. Her friend Marcus says: \"To get straight back to the start, walk 500 m on a bearing of 315°.\"\n\nMake a scale drawing (1 cm to 100 m) or reason carefully. Is Marcus right about the **distance**? Is he right about the **bearing**? Explain.",
        marks: 3,
        modelAnswer:
          "Scale drawing: 4 cm East, then 3 cm South. The straight line back to the start measures 5 cm, so the distance is 5 × 100 = 500 m. Marcus is right about the distance.\n\nA bearing of 315° is exactly north-west, halfway between West and North. That would mean going the **same** distance west as north. Hana has to go 400 m west but only 300 m north, so her direction leans further towards West than north-west does. The bearing is between 270° and 315°, a little less than 315° — measuring gives about 307°. So Marcus is wrong about the bearing.",
        markScheme: [
          { point: "The distance 500 m is correct (the scale drawing measures 5 cm)", keywords: ["500", "5 cm", "right", "correct"] },
          {
            point: "315° is exactly north-west, which needs equal distances west and north",
            keywords: ["north-west", "45", "equal", "same distance", "halfway"],
          },
          {
            point: "She needs more west (400 m) than north (300 m), so the bearing is less than 315° (about 307°): Marcus is wrong",
            keywords: ["307", "less than 315", "more west", "towards west", "wrong", "between 270"],
          },
        ],
        commonError: "Assuming any direction that is 'roughly north-west' is exactly 315°.",
        difficulty: "core",
        guideRef: "bearings",
        hints: [
          "Sketch the walk: East, then South. Where is the start, seen from the finish?",
          "To get back, how far west and how far north must Hana go? Are they equal?",
          "What would the two distances have to be for the bearing to be exactly 315°?",
        ],
        strategy: "Draw a diagram to scale",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q13",
        question:
          "Two straight hedges meet at a corner O, making an angle of 124°. A gardener plants a row of bulbs along the bisector of this angle. She then plants a second row along the bisector of the angle between the first row and one of the hedges. What is the angle between the second row and the **other** hedge — the one it is further from? Give your answer in degrees.",
        answer: { type: "number", value: 93, display: "93°" },
        traps: [
          {
            spec: { type: "number", value: 31 },
            feedback: "31° is the angle to the **nearer** hedge. The further hedge is another 62° beyond the first row.",
          },
          {
            spec: { type: "number", value: 62 },
            feedback: "62° is the angle between the *first* row and either hedge. Where is the second row?",
          },
        ],
        solution: [
          "The first row halves 124°: two angles of 62°.",
          "The second row halves one of those: two angles of 31°.",
          "From the second row to the far hedge you cross 31° (to the first row) and then 62° (to the far hedge).",
          "31° + 62° = 93°.",
        ],
        solutions: [
          {
            label: "Subtract from the whole angle",
            steps: ["The second row is 31° from the nearer hedge.", "The whole corner is 124°, so the angle to the far hedge is 124° − 31° = 93°."],
          },
        ],
        difficulty: "core",
        guideRef: "angle-bisector",
        hints: [
          "Sketch the corner with both rows of bulbs. Label every angle you know.",
          "First bisector: 124° ÷ 2. Second bisector: halve again.",
          "The angle you want is made of two pieces — or it is the whole angle minus one piece.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q14",
        question:
          "Jun puts the centre of his protractor on the vertex of an angle, but he lines the first arm up with the **20** on the inner scale instead of with 0. The second arm crosses the inner scale at **95**. What is the true size of the angle? Give your answer in degrees.",
        answer: { type: "number", value: 75, display: "75°" },
        traps: [
          {
            spec: { type: "number", value: 95 },
            feedback: "95 is the reading, but the counting started at 20, not at 0. How many degrees is it from 20 up to 95?",
          },
          {
            spec: { type: "number", value: 115 },
            feedback: "The angle runs *from* the 20 mark *to* the 95 mark, so take the 20 away rather than adding it.",
          },
          {
            spec: { type: "number", value: 85 },
            feedback: "85° = 180° − 95° switches to the outer scale. Both arms were read on the inner scale, so just subtract.",
          },
        ],
        solution: [
          "A protractor reading counts degree steps along the scale.",
          "The first arm is at 20 and the second arm is at 95, on the same scale.",
          "The angle between them is 95 − 20 = 75°.",
        ],
        commonError: "Reading the second arm (95) as if the first arm were on 0.",
        difficulty: "core",
        guideRef: "measuring-angles",
        hints: [
          "What does a number on the protractor actually count?",
          "Count the degrees from the 20 mark to the 95 mark.",
        ],
        strategy: "Check by reasonableness",
      },
      {
        kind: "written",
        id: "constructions-bearings-p3-q15",
        question:
          "On a map with scale 1 : 10 000, a rectangular park measures 3 cm by 2 cm. Arjun says: \"The park's area on the map is 6 cm², so its real area is 6 × 10 000 = 60 000 cm².\"\n\nExplain Arjun's mistake, and find the real area of the park in m².",
        marks: 3,
        modelAnswer:
          "On a 1 : 10 000 map, 1 cm stands for 10 000 cm = 100 m. So the real park is 3 × 100 = 300 m long and 2 × 100 = 200 m wide.\n\nReal area = 300 × 200 = 60 000 m².\n\nArjun multiplied the area by 10 000 only once. But **both** the length and the width are multiplied by 10 000, so the area is multiplied by 10 000 × 10 000 = 100 000 000. His answer of 60 000 cm² is only 6 m² — about the size of a small bedroom, not a park.",
        markScheme: [
          { point: "Converts lengths: 300 m by 200 m (1 cm represents 100 m)", keywords: ["300", "200", "100 m"] },
          { point: "Real area 60 000 m²", keywords: ["60 000 m", "60000 m", "60 000", "60000"] },
          {
            point: "Explains that area is scaled by the scale factor twice (10 000 × 10 000), not once",
            keywords: ["both", "twice", "squared", "10 000 × 10 000", "100 000 000", "length and width"],
          },
        ],
        commonError: "Scaling an area by the length scale factor only once.",
        difficulty: "core",
        guideRef: "scale-drawings",
        hints: [
          "What real length, in metres, does 1 cm on this map stand for?",
          "Find the park's real length and width first, then multiply them.",
          "How many lengths get multiplied by 10 000 when you work out an area?",
        ],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q16",
        question:
          "**Stretch.** Two security cameras are fixed at A and B on a long, straight wall, 20 m apart. Each camera records everything within 12 m of it. What length of the wall is recorded by **both** cameras? Give your answer in metres.",
        answer: { type: "number", value: 4, display: "4 m" },
        traps: [
          {
            spec: { type: "number", value: 24 },
            feedback: "24 m is the two ranges added together. You need only the part of the wall that is inside *both* ranges.",
          },
          {
            spec: { type: "number", value: 8 },
            feedback: "8 m from A is where B's range *begins*. The overlap carries on until 12 m from A.",
          },
        ],
        solution: [
          "Measure everything as a distance along the wall from A, towards B.",
          "Camera A covers the wall up to 12 m from A.",
          "Camera B covers up to 12 m from B, which starts at 20 − 12 = 8 m from A.",
          "Both cameras: from 8 m to 12 m along the wall, which is 12 − 8 = 4 m.",
        ],
        solutions: [
          {
            label: "Overlap in one step",
            steps: ["Together the two ranges stretch 12 + 12 = 24 m across a 20 m gap.", "So they overlap by 24 − 20 = 4 m."],
          },
        ],
        difficulty: "core",
        guideRef: "loci",
        hints: [
          "Each camera covers a circle. Where does each circle meet the wall?",
          "Measure from A. Where along the wall does B's range start?",
          "The overlap is the stretch covered by both circles.",
        ],
        strategy: "One condition at a time, then find where they overlap",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q17",
        question:
          "A buoy B is 6 km from a harbour A, on a bearing of 070°. A lighthouse C is due East of A, and is also 6 km from B. Find the bearing of C from B. Give the number of degrees.",
        answer: { type: "number", value: 110, display: "110°" },
        traps: [
          {
            spec: { type: "number", value: 250 },
            feedback: "250° is the bearing of A from B. C is on the other side of B.",
          },
          {
            spec: { type: "number", value: 140 },
            feedback: "140° is the size of angle ABC, not a bearing. Use it to turn from the direction of A to the direction of C.",
          },
        ],
        solution: [
          "At A, due East is 090°, so angle BAC = 90° − 70° = 20°.",
          "BA = BC = 6 km, so triangle ABC is isosceles and angle BCA = angle BAC = 20°.",
          "Angle ABC = 180° − 20° − 20° = 140°.",
          "At B, the bearing of A is the back bearing of 070°: 070° + 180° = 250°.",
          "B is north of the line AC, so C is to the south-east of B: turn 140° anticlockwise from BA, giving 250° − 140° = 110°.",
        ],
        solutions: [
          {
            label: "Use symmetry",
            steps: [
              "Triangle ABC is isosceles with BA = BC, so its line of symmetry goes through B and is perpendicular to AC.",
              "AC runs East–West, so the line of symmetry runs North–South through B.",
              "Reflecting in a North–South line turns a bearing into 360° minus that bearing.",
              "The bearing of A from B is 250°, so the bearing of C from B is 360° − 250° = 110°.",
            ],
          },
        ],
        commonError: "Answering with an angle of the triangle instead of a bearing measured clockwise from North at B.",
        difficulty: "challenge",
        guideRef: "bearings",
        hints: [
          "Sketch it: A, a line due East towards C, and B up on 070°. What is angle BAC?",
          "BA = BC. What kind of triangle is ABC, and what does that tell you about its angles?",
          "Find the bearing of A from B, then turn through angle ABC towards C.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q18",
        question:
          "The art club bends a 15 cm piece of wire into a triangle. Each side must be a whole number of centimetres. How many **different** triangles are possible? (Triangles with the same three side lengths count as the same triangle.)",
        answer: { type: "number", value: 7 },
        traps: [
          {
            spec: { type: "number", value: 19 },
            feedback: "19 counts every way to split 15 into three positive whole numbers (ignoring order) — but many of those fail the triangle inequality, such as 1, 1, 13.",
          },
        ],
        solution: [
          "Call the sides a ≤ b ≤ c. They add to 15, and a + b must be more than c.",
          "a + b = 15 − c, so 15 − c > c, which means c is less than 7.5: c ≤ 7. Also c is the largest of three numbers adding to 15, so c ≥ 5.",
          "c = 7: a + b = 8 with b ≤ 7 → (1, 7), (2, 6), (3, 5), (4, 4): 4 triangles.",
          "c = 6: a + b = 9 with b ≤ 6 → (3, 6), (4, 5): 2 triangles.",
          "c = 5: a + b = 10 with b ≤ 5 → (5, 5): 1 triangle.",
          "Total: 4 + 2 + 1 = 7.",
        ],
        commonError: "Counting the same triangle more than once (3, 5, 7 and 5, 3, 7), or forgetting the triangle inequality.",
        difficulty: "challenge",
        guideRef: "constructing-triangles",
        hints: [
          "Call the sides a ≤ b ≤ c. Using a + b > c and a + b + c = 15, what is the biggest c can be?",
          "c must be less than half of 15. And what is the smallest the *largest* side can be?",
          "Go through c = 7, 6 and 5 in turn, and list the pairs a ≤ b for each.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "constructions-bearings-p3-q19",
        question:
          "Zara says: \"The perpendicular bisector of one side of a triangle always passes through the opposite corner.\"\n\nIs this **always**, **sometimes** or **never** true? Explain your answer, and give an example.",
        marks: 3,
        modelAnswer:
          "**Sometimes** true.\n\nThe perpendicular bisector of AB is exactly the set of points that are equidistant from A and B. So it passes through the opposite corner C only when CA = CB.\n\n- True example: an isosceles triangle with CA = CB = 5 cm and AB = 6 cm (or any equilateral triangle). The perpendicular bisector of AB is the line of symmetry and passes through C.\n- False example: a triangle with CA = 3 cm, CB = 4 cm and AB = 5 cm. C is closer to A than to B, so C is not on the perpendicular bisector of AB.",
        markScheme: [
          { point: "States 'sometimes'", keywords: ["sometimes"] },
          {
            point: "Reason: points on the perpendicular bisector are equidistant from the two ends, so it passes through C only when CA = CB (isosceles)",
            keywords: ["equidistant", "same distance", "isosceles", "ca = cb", "equal sides", "equilateral"],
          },
          {
            point: "Gives a counterexample with unequal sides where it fails",
            keywords: ["scalene", "3, 4, 5", "not equal", "unequal", "counterexample", "different lengths"],
          },
        ],
        commonError: "Answering 'always' after testing only an equilateral or isosceles triangle.",
        difficulty: "challenge",
        guideRef: "perpendicular-bisector",
        hints: [
          "Try an equilateral triangle. Then try a long, thin triangle with three different sides. What happens?",
          "What do all the points on the perpendicular bisector of AB have in common?",
          "So exactly when is C on it?",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "short",
        id: "constructions-bearings-p3-q20",
        question:
          "A yacht race goes round a closed course with legs of equal length. At each buoy the yacht turns **clockwise** through the same angle, which is less than 180°. The first leg is on a bearing of 020° and the third leg is on a bearing of 164°. After going round the course once, the yacht is back at the start. How many legs does the course have?",
        answer: { type: "number", value: 5 },
        traps: [
          {
            spec: { type: "number", value: 2.5 },
            feedback: "144° is the change over **two** turns (leg 1 → leg 2 → leg 3). Find one turn first.",
          },
          {
            spec: { type: "number", value: 3 },
            feedback: "The third leg is not the last one. A 3-leg course would need three turns of 360° ÷ 3 = 120°, but here the bearing changes by only 144° over two turns. Find the size of one turn.",
          },
        ],
        solution: [
          "From leg 1 to leg 3 the yacht turns twice: 164° − 20° = 144° altogether.",
          "Each turn is 144° ÷ 2 = 72°.",
          "Going once round a closed course, the turns add up to one full turn, 360° — they are the exterior angles of the course.",
          "Number of legs = 360° ÷ 72° = 5: the course is a regular pentagon.",
          "Check the bearings: 020°, 092°, 164°, 236°, 308°, and then 308° + 72° = 380°, which is 020° again.",
        ],
        commonError: "Dividing 360° by 144° instead of by a single turn.",
        difficulty: "challenge",
        guideRef: "bearings",
        hints: [
          "How many turns happen between leg 1 and leg 3?",
          "Every turn is the same. How big is each one?",
          "The turns are the exterior angles of the course. What do the exterior angles of any polygon add up to?",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "constructions-bearings-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      {
        kind: "short",
        id: "constructions-bearings-p4-q01",
        question:
          "Ravi measures four angles with a protractor. Before measuring, he writes down what each angle **looks like**.\n\n| Angle | Looks like | Protractor reading |\n|---|---|---|\n| P | acute | 35° |\n| Q | obtuse | 65° |\n| R | obtuse | 148° |\n| S | acute | 82° |\n\nOne reading was taken from the wrong scale of the protractor. What is the true size of that angle? Give your answer in degrees.",
        answer: { type: "number", value: 115, display: "115° (angle Q)" },
        traps: [
          {
            spec: { type: "number", value: 65 },
            feedback: "Angle Q looks obtuse, so 65° can't be right — it is the reading from the wrong scale.",
          },
          {
            spec: { type: "number", value: 32 },
            feedback: "R looks obtuse and 148° is obtuse, so that reading fits. Find the reading that doesn't match its description.",
          },
        ],
        solution: [
          "Compare each reading with what the angle looks like.",
          "P: 35° is acute — fine. R: 148° is obtuse — fine. S: 82° is acute — fine.",
          "Q looks obtuse but reads 65°, which is acute. So Q was read on the wrong scale.",
          "The two scale readings at any mark add to 180°, so the true angle is 180° − 65° = 115°.",
        ],
        difficulty: "warmup",
        guideRef: "measuring-angles",
        hints: ["Which reading doesn't match what its angle looks like?", "The two scale readings at any mark add to 180°."],
        strategy: "Estimate first",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q02",
        question:
          "In the diagram, the dashed line from A points due East. The line from A to B is 28° below the East line. Find the bearing of B from A. Give the number of degrees.",
        diagram: `<svg viewBox="0 0 360 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A North arrow at A. A dashed line from A points due East. The line from A to B goes down to the right, 28 degrees below the East line."><rect x="0" y="0" width="360" height="240" fill="#ffffff"/><line x1="150" y1="120" x2="150" y2="22" stroke="#1f2937" stroke-width="2"/><polygon points="150,14 145,26 155,26" fill="#1f2937"/><text x="150" y="11" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">N</text><line x1="150" y1="120" x2="305" y2="120" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><text x="312" y="124" font-size="13" font-family="sans-serif" fill="#334155">E</text><line x1="150" y1="120" x2="282.4" y2="190.4" stroke="#1f2937" stroke-width="2"/><path d="M 205 120 A 55 55 0 0 1 198.6 145.8" fill="none" stroke="#b45309" stroke-width="1.5"/><text x="214" y="142" font-size="12" font-family="sans-serif" fill="#b45309">28°</text><circle cx="150" cy="120" r="3" fill="#1f2937"/><circle cx="282.4" cy="190.4" r="3" fill="#1f2937"/><text x="136" y="136" font-size="13" font-family="sans-serif" fill="#1f2937">A</text><text x="290" y="204" font-size="13" font-family="sans-serif" fill="#1f2937">B</text></svg>`,
        answer: { type: "number", value: 118, display: "118°" },
        traps: [
          {
            spec: { type: "number", value: 62 },
            feedback: "62° = 90° − 28° would put B *above* the East line. B is below it — further round clockwise from North.",
          },
          {
            spec: { type: "number", value: 28 },
            feedback: "Bearings are measured from North, not from East.",
          },
        ],
        solution: ["Due East is 090°.", "B is 28° further round clockwise than East (below the East line, towards South).", "090° + 28° = 118°."],
        difficulty: "warmup",
        guideRef: "bearings",
        hints: ["What bearing is due East?", "Turning clockwise from North, do you pass East before you reach the line AB?"],
        strategy: "Draw a diagram (North line first)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q03",
        question:
          "Copy and complete the table.\n\n| Bearing of B from A | Bearing of A from B |\n|---|---|\n| 035° | ? |\n| 190° | ? |\n| 260° | ? |\n\nGive the three missing bearings in order, top to bottom, separated by commas.",
        answer: { type: "list", values: [215, 10, 80], ordered: true, display: "215°, 010°, 080°" },
        traps: [
          {
            spec: { type: "list", values: [325, 170, 100], ordered: true },
            feedback: "You worked out 360° − each bearing, which reflects the direction instead of reversing it. A back bearing is the bearing ± 180°.",
          },
          {
            spec: { type: "list", values: [215, 370, 440], ordered: true },
            feedback: "Bearings must be less than 360°. When a bearing is 180° or more, *subtract* 180°.",
          },
        ],
        solution: [
          "035° is less than 180°, so add 180°: 215°.",
          "190° is 180° or more, so subtract 180°: 010°.",
          "260° − 180° = 080°.",
        ],
        difficulty: "warmup",
        guideRef: "back-bearings",
        hints: [
          "A bearing and its back bearing always differ by exactly 180°.",
          "Add 180° if the bearing is less than 180°; otherwise subtract 180°.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q04",
        question:
          "A map has a scale of 1 : 50 000. Complete the sentence: \"1 cm on the map represents ___ km in real life.\"",
        answer: { type: "number", value: 0.5, display: "0.5 km" },
        traps: [
          { spec: { type: "number", value: 500 }, feedback: "500 is right in **metres**. Change to km: 500 m = 0.5 km." },
          { spec: { type: "number", value: 50000 }, feedback: "50 000 is the distance in **centimetres**. Divide by 100 000 to get km." },
          { spec: { type: "number", value: 5 }, feedback: "Check the conversion: 50 000 cm = 500 m = 0.5 km." },
        ],
        solution: ["1 cm on the map stands for 50 000 cm in real life.", "50 000 cm ÷ 100 = 500 m.", "500 m ÷ 1000 = 0.5 km."],
        commonError: "Forgetting that a ratio scale uses the same unit on both sides, so the 50 000 is in centimetres.",
        difficulty: "warmup",
        guideRef: "scale-drawings",
        hints: ["What unit is the 50 000 in, if the 1 is 1 cm?", "1 km = 1000 m = 100 000 cm."],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q05",
        question:
          "Siti wants to construct triangle PQR using **SAS** (two sides and the included angle). She knows PQ = 6 cm and QR = 4 cm. Which angle does she also need to know? Write it using three letters, like angle ABC.",
        answer: {
          type: "text",
          accept: ["PQR", "angle PQR", "RQP", "angle RQP", "∠PQR", "∠RQP", "<PQR", "<RQP", "Q", "angle Q", "∠Q", "angle at Q", "the angle at Q"],
          display: "angle PQR (the angle at Q)",
        },
        traps: [
          {
            spec: { type: "text", accept: ["QPR", "angle QPR", "RPQ", "angle RPQ", "P", "angle P", "∠QPR", "∠RPQ"] },
            feedback: "That angle is at P, which is not between PQ and QR. SAS needs the angle *between* the two known sides.",
          },
          {
            spec: { type: "text", accept: ["PRQ", "angle PRQ", "QRP", "angle QRP", "R", "angle R", "∠PRQ", "∠QRP"] },
            feedback: "That angle is at R, which is not between PQ and QR. SAS needs the angle *between* the two known sides.",
          },
        ],
        solution: [
          "SAS needs the angle **between** the two given sides (the included angle).",
          "PQ and QR meet at Q.",
          "So Siti needs angle PQR — the angle at Q.",
        ],
        difficulty: "warmup",
        guideRef: "constructing-triangles",
        hints: ["Which corner do PQ and QR share?"],
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q06",
        question:
          "AB is 10 cm long. Hana constructs the perpendicular bisector of AB with her compasses set to 6.5 cm. Her arcs cross at P and Q, and the line PQ meets AB at M.\n\nWithout measuring, find (a) the length AM and (b) the perimeter of the quadrilateral APBQ. Give your answers in cm, (a) first.",
        diagram: `<svg viewBox="0 0 380 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Line segment AB with construction arcs from A and B crossing at P above and Q below. The dashed sides AP, PB, BQ and QA form a quadrilateral. The line PQ crosses AB at M at right angles."><rect x="0" y="0" width="380" height="300" fill="#ffffff"/><polygon points="90,160 190,76.9 290,160 190,243.1" fill="#c7d2fe" fill-opacity="0.45" stroke="#334155" stroke-width="1.2" stroke-dasharray="5 4"/><line x1="90" y1="160" x2="290" y2="160" stroke="#1f2937" stroke-width="2"/><line x1="190" y1="62" x2="190" y2="258" stroke="#1f2937" stroke-width="1.5"/><path d="M 173.6 60.4 A 130 130 0 0 1 202.6 95" fill="none" stroke="#2563eb" stroke-width="1.5"/><path d="M 202.6 225 A 130 130 0 0 1 173.6 259.6" fill="none" stroke="#2563eb" stroke-width="1.5"/><path d="M 206.4 60.4 A 130 130 0 0 0 177.4 95" fill="none" stroke="#b45309" stroke-width="1.5"/><path d="M 177.4 225 A 130 130 0 0 0 206.4 259.6" fill="none" stroke="#b45309" stroke-width="1.5"/><polyline points="190,150 200,150 200,160" fill="none" stroke="#1f2937" stroke-width="1"/><circle cx="90" cy="160" r="3" fill="#1f2937"/><circle cx="290" cy="160" r="3" fill="#1f2937"/><text x="72" y="165" font-size="13" font-family="sans-serif" fill="#1f2937">A</text><text x="298" y="165" font-size="13" font-family="sans-serif" fill="#1f2937">B</text><text x="166" y="72" font-size="13" font-family="sans-serif" fill="#1f2937">P</text><text x="166" y="256" font-size="13" font-family="sans-serif" fill="#1f2937">Q</text><text x="176" y="176" font-size="13" font-family="sans-serif" fill="#1f2937">M</text><text x="240" y="178" font-size="12" font-family="sans-serif" fill="#334155">AB = 10 cm</text><text x="20" y="290" font-size="12" font-family="sans-serif" fill="#334155">Compass width 6.5 cm</text></svg>`,
        answer: { type: "list", values: [5, 26], ordered: true, display: "AM = 5 cm; perimeter = 26 cm" },
        traps: [
          {
            spec: { type: "list", values: [5, 20], ordered: true },
            feedback: "20 cm would be 2 × AB. The sides of APBQ are AP, PB, BQ and QA — and each one is a compass radius.",
          },
          {
            spec: { type: "list", values: [6.5, 26], ordered: true },
            feedback: "AM is half of AB — the perpendicular bisector passes through the midpoint. It isn't the compass width.",
          },
        ],
        solution: [
          "(a) The perpendicular bisector cuts AB in half: AM = 10 ÷ 2 = 5 cm.",
          "(b) P and Q were made by arcs of radius 6.5 cm from both A and B, so AP = PB = BQ = QA = 6.5 cm.",
          "APBQ is a rhombus with perimeter 4 × 6.5 = 26 cm.",
        ],
        commonError: "Trying to measure or calculate PM, which isn't needed: the four sides are all compass radii.",
        difficulty: "core",
        guideRef: "perpendicular-bisector",
        hints: [
          "Where does the perpendicular bisector cross AB?",
          "How far is P from A? And from B? Think about how P was drawn.",
          "All four sides of APBQ equal the compass width.",
        ],
        strategy: "Use symmetry",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q07",
        question:
          "Two straight walls, OX and OY, meet at a corner O at an angle of 84°. A lamp L is fixed on the bisector of angle XOY, 2.5 m from wall OX (measured at right angles to the wall).\n\nFind (a) the distance from L to wall OY, in metres, and (b) the size of angle LOY, in degrees. Give (a) first.",
        answer: { type: "list", values: [2.5, 42], ordered: true, display: "2.5 m; 42°" },
        traps: [
          {
            spec: { type: "list", values: [2.5, 84], ordered: true },
            feedback: "L is on the bisector, so angle LOY is **half** of 84°.",
          },
          {
            spec: { type: "list", values: [5, 42], ordered: true },
            feedback: "A point on an angle bisector is the **same** distance from both arms — not double.",
          },
        ],
        solution: [
          "(a) Every point on an angle bisector is the same distance from both arms, so L is also 2.5 m from OY.",
          "(b) The bisector halves the angle: angle LOY = 84° ÷ 2 = 42°.",
        ],
        difficulty: "core",
        guideRef: "angle-bisector",
        hints: ["What is true about the distances from any point on an angle bisector to the two arms?", "What does 'bisector' do to the 84° angle?"],
        strategy: "Use symmetry",
      },
      {
        kind: "written",
        id: "constructions-bearings-p4-q08",
        question:
          "The diagram shows a North line at Q and the line from Q to P. Ravi says: \"The bearing of P from Q is 040°, because the angle between the North line and QP is 40°.\"\n\nIs Ravi right? Explain, and give the correct bearing of P from Q.",
        diagram: `<svg viewBox="0 0 300 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A North line at Q. The line from Q to P goes up and to the left. The angle between the North line and QP, on the West side of the North line, is marked 40 degrees."><rect x="0" y="0" width="300" height="220" fill="#ffffff"/><line x1="180" y1="170" x2="180" y2="32" stroke="#1f2937" stroke-width="2"/><polygon points="180,24 175,36 185,36" fill="#1f2937"/><text x="180" y="20" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">N</text><line x1="180" y1="170" x2="90" y2="62.8" stroke="#1f2937" stroke-width="2"/><path d="M 180 125 A 45 45 0 0 0 151.1 135.5" fill="none" stroke="#b45309" stroke-width="1.5"/><text x="158" y="112" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#b45309">40°</text><circle cx="180" cy="170" r="3" fill="#1f2937"/><circle cx="90" cy="62.8" r="3" fill="#1f2937"/><text x="188" y="186" font-size="13" font-family="sans-serif" fill="#1f2937">Q</text><text x="74" y="58" font-size="13" font-family="sans-serif" fill="#1f2937">P</text></svg>`,
        marks: 3,
        modelAnswer:
          "Ravi is wrong. Bearings are always measured **clockwise** from North. In the diagram, P is on the West side of the North line, so the 40° is measured **anticlockwise**. Turning clockwise from North round to QP is the rest of the full turn: 360° − 40° = 320°. So the bearing of P from Q is 320°.",
        markScheme: [
          { point: "States that Ravi is wrong", keywords: ["wrong", "no", "not right", "incorrect"] },
          { point: "Bearings are measured clockwise; the 40° is anticlockwise (P is to the west)", keywords: ["clockwise", "anticlockwise", "west"] },
          { point: "Correct bearing 320° (360° − 40°)", keywords: ["320", "360 - 40", "360 − 40"] },
        ],
        commonError: "Reading any angle next to the North line as the bearing, without checking which way it turns.",
        difficulty: "core",
        guideRef: "bearings",
        hints: [
          "Which way are bearings always measured from North?",
          "Is the 40° in the diagram turned clockwise or anticlockwise from North?",
          "A full turn is 360°. How much is left after 40° the other way?",
        ],
        strategy: "Use the inverse (360° minus the anticlockwise angle)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q09",
        question:
          "The bearing of B from A is 064°. The bearing of C from B is 155°.\n\n(a) Find the bearing of A from B. (b) Find the size of angle ABC.\n\nGive both answers in degrees, (a) first.",
        answer: { type: "list", values: [244, 89], ordered: true, display: "(a) 244° (b) 89°" },
        traps: [
          {
            spec: { type: "list", values: [244, 91], ordered: true },
            feedback: "91° (155° − 64°) is how far the direction *turns* at B. Angle ABC is between the two legs: 244° − 155°.",
          },
          {
            spec: { type: "list", values: [296, 141], ordered: true },
            feedback: "The bearing of A from B is 064° + 180°, not 360° − 064°.",
          },
        ],
        solution: [
          "(a) 064° is less than 180°, so add 180°: 064° + 180° = 244°.",
          "(b) At B, the bearing of A is 244° and the bearing of C is 155°, both measured from the same North line.",
          "Angle ABC = 244° − 155° = 89°.",
        ],
        solutions: [
          {
            label: "Using the turn",
            steps: [
              "The direction of travel changes from 064° to 155°: a clockwise turn of 91°.",
              "The turn and angle ABC make a straight line at B, so angle ABC = 180° − 91° = 89°.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "back-bearings",
        hints: [
          "For (a): add or subtract 180°?",
          "For (b): draw a North line at B and mark the directions to A and to C.",
          "Both bearings at B are measured from the same North line, so subtract them.",
        ],
        strategy: "Draw a diagram with a North line at every point",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q10",
        question:
          "A ranger station R is 2.4 km from a waterfall W. The bearing of R from W is 305°. Jun is drawing them on a map with a scale of 1 : 30 000.\n\n(a) How far apart should R and W be on his map, in cm? (b) Jun has already drawn R. On what bearing must he measure from R to place W?\n\nGive (a) first, then (b) in degrees.",
        answer: { type: "list", values: [8, 125], ordered: true, display: "(a) 8 cm (b) 125°" },
        traps: [
          {
            spec: { type: "list", values: [0.8, 125], ordered: true },
            feedback: "Check the conversion: 2.4 km = 2400 m = 240 000 cm, and 240 000 ÷ 30 000 = 8.",
          },
          {
            spec: { type: "list", values: [8, 55], ordered: true },
            feedback: "55° = 360° − 305° reflects the direction instead of reversing it. Use 305° − 180°.",
          },
          {
            spec: { type: "list", values: [8, 305], ordered: true },
            feedback: "305° is the bearing of R from W. Standing at R, you need the back bearing.",
          },
        ],
        solution: [
          "(a) 2.4 km = 2400 m = 240 000 cm.",
          "240 000 ÷ 30 000 = 8 cm.",
          "(b) He needs the bearing of W from R — the back bearing of 305°.",
          "305° is 180° or more, so subtract: 305° − 180° = 125°.",
        ],
        difficulty: "core",
        guideRef: "scale-drawings",
        hints: [
          "Change 2.4 km into centimetres before using the scale.",
          "Real → map: divide by 30 000.",
          "Part (b) asks for the opposite direction to 305°.",
        ],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q11",
        question:
          "From the top of a tower T, four landmarks are on these bearings.\n\n| Landmark | Bearing from T |\n|---|---|\n| Lighthouse | 038° |\n| Jetty | 112° |\n| Temple | 247° |\n| Radio mast | 331° |\n\nAs seen from T, which two landmarks have the **smallest** angle between them? Give the size of that angle in degrees.",
        answer: { type: "number", value: 67, display: "67° (radio mast and lighthouse)" },
        traps: [
          {
            spec: { type: "number", value: 74 },
            feedback: "74° is the gap between the lighthouse and the jetty. Don't forget the gap that crosses North, from 331° round to 038°.",
          },
          {
            spec: { type: "number", value: 293 },
            feedback: "293° is the long way round from 038° to 331°. Going the short way, across North, gives 360° − 293°.",
          },
        ],
        solution: [
          "Go round clockwise and find the gap between each pair of neighbours.",
          "Lighthouse → jetty: 112° − 38° = 74°.",
          "Jetty → temple: 247° − 112° = 135°.",
          "Temple → radio mast: 331° − 247° = 84°.",
          "Radio mast → lighthouse, across North: (360° − 331°) + 38° = 29° + 38° = 67°.",
          "The smallest is 67°, between the radio mast and the lighthouse. Check: 74 + 135 + 84 + 67 = 360.",
        ],
        commonError: "Missing the pair either side of North because their bearings look far apart (331° and 038°).",
        difficulty: "core",
        guideRef: "bearings",
        hints: [
          "Sketch the four directions around T, with North at the top.",
          "Find the angle between each pair of neighbours as you go round.",
          "Don't forget the two landmarks either side of North.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "constructions-bearings-p4-q12",
        question:
          "Describe how to construct triangle ABC with AB = 8 cm, AC = 6 cm and BC = 5 cm, using a ruler and compasses. Then explain why the point C you find is the only possible position for C on that side of AB.",
        marks: 3,
        modelAnswer:
          "Check first: 5 + 6 = 11, which is more than 8, so the triangle exists.\n\n1. Rule AB = 8 cm.\n2. Open the compasses to 6 cm, put the point on A and draw an arc above AB.\n3. Open the compasses to 5 cm, put the point on B and draw an arc that crosses the first arc. The crossing point is C.\n4. Join AC and BC, leaving the arcs showing.\n\nEvery point on the first arc is exactly 6 cm from A, and every point on the second arc is exactly 5 cm from B. C has to be 6 cm from A **and** 5 cm from B, so it must lie on both arcs — and on one side of AB the two arcs cross at only one point.",
        markScheme: [
          { point: "Draws the 8 cm side AB first, with a ruler", keywords: ["8 cm", "rule ab", "draw ab", "base"] },
          {
            point: "Arc of radius 6 cm from A and arc of radius 5 cm from B, crossing at C; then joins up",
            keywords: ["arc", "compasses", "6 cm", "5 cm", "cross", "intersect"],
          },
          {
            point: "Explains: points on the arcs are 6 cm from A and 5 cm from B, so the crossing is the only point that is both",
            keywords: ["6 cm from a", "5 cm from b", "both", "only", "every point"],
          },
        ],
        commonError: "Using the same compass width for both arcs, or rubbing out the construction arcs.",
        difficulty: "core",
        guideRef: "constructing-triangles",
        hints: [
          "Which side is easiest to draw first?",
          "Which instrument draws every point that is exactly 6 cm from A?",
          "C must be 6 cm from A and 5 cm from B at the same time.",
        ],
        strategy: "Draw a diagram (sketch first)",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q13",
        question:
          "**Stretch.** A dog is tied to a post P by a rope 5 m long. The post is 3 m from a long, straight fence. Make a scale drawing with 1 cm to 1 m: draw the fence, mark P, and draw the locus of points 5 m from P.\n\nWhat length of the fence can the dog reach? Give your answer in metres, to the nearest metre.",
        answer: { type: "number", value: 8, display: "8 m" },
        traps: [
          {
            spec: { type: "number", value: 10 },
            feedback: "10 m is the diameter of the rope's circle. The fence is 3 m from P, so it cuts the circle in a shorter line.",
          },
          {
            spec: { type: "number", value: 4 },
            feedback: "4 m is how far the dog can reach in one direction from the point nearest P. It can go both ways along the fence.",
          },
        ],
        solution: [
          "The dog can reach every point within 5 m of P: on the drawing, a circle of radius 5 cm centred on P.",
          "Draw the perpendicular from P to the fence; it is 3 cm long and meets the fence at N.",
          "The circle crosses the fence at two points. Measuring, each is 4 cm from N.",
          "So the dog can reach 4 + 4 = 8 cm of fence on the drawing, which is 8 m in real life.",
          "(The 3–4–5 triangle is right-angled — you will meet the reason later as Pythagoras' theorem.)",
        ],
        commonError: "Giving the diameter of the circle (10 m) instead of the part of the fence inside it.",
        difficulty: "core",
        guideRef: "loci",
        hints: [
          "What shape is the set of points within 5 m of P?",
          "Where does that circle cross the fence? Measure from the point of the fence nearest P.",
          "Remember the dog can go both ways along the fence.",
        ],
        strategy: "Draw a diagram to scale",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q14",
        question:
          "On a map grid, 1 unit represents 100 m. A straight canal runs along the line *x* = 2. A house H is at the point (9, 5). A path is to be built from H to the canal by the shortest possible route, meeting the canal at N.\n\nGive the coordinates of N, then the length of the path in metres. (Type three numbers: the *x*-coordinate, the *y*-coordinate, then the length.)",
        answer: { type: "list", values: [2, 5, 700], ordered: true, display: "N(2, 5); 700 m" },
        traps: [
          {
            spec: { type: "list", values: [2, 5, 7], ordered: true },
            feedback: "7 is the length in grid **units**. Each unit is 100 m.",
          },
          {
            spec: { type: "list", values: [0, 5, 900], ordered: true },
            feedback: "The canal is the line *x* = 2, not the *y*-axis.",
          },
        ],
        solution: [
          "The shortest route from a point to a line meets the line at 90°.",
          "The canal *x* = 2 is a vertical line, so the shortest path is horizontal: the *y*-coordinate stays at 5.",
          "So N = (2, 5).",
          "Length: 9 − 2 = 7 units, and 7 × 100 = 700 m.",
        ],
        difficulty: "core",
        guideRef: "angle-bisector",
        hints: [
          "At what angle does the shortest path meet the canal?",
          "The canal is vertical, so the shortest path is horizontal. Which coordinate stays the same along it?",
          "Count the units from *x* = 9 to *x* = 2, then use the scale.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "written",
        id: "constructions-bearings-p4-q15",
        question:
          "The bearing of B from A is 130°. Siti says: \"The bearing of A from B is 230°, because 360° − 130° = 230°.\"\n\nShow that Siti is wrong. Use the North lines at A and B, which are parallel, to explain why the bearing of A from B is 310°.",
        marks: 3,
        modelAnswer:
          "Going back from B to A means facing the opposite way — a half turn — so the two bearings should differ by 180°, not add up to 360°. Siti's method reflects the direction in the North line instead of reversing it.\n\nDraw the North lines at A and B; they are parallel, and AB crosses both. At A, the angle from North round to AB is 130°. At B, the angle between the North line and BA (on the same side of AB) and the 130° at A are **co-interior angles**, so they add to 180°. That angle is 180° − 130° = 50°, measured anticlockwise from North at B.\n\nTurning clockwise from North at B to BA is the rest of the full turn: 360° − 50° = 310°. Check: 130° + 180° = 310°.",
        markScheme: [
          { point: "Correct back bearing 310° (130° + 180°)", keywords: ["310", "130 + 180", "add 180", "+ 180"] },
          {
            point: "North lines are parallel, so the angles at A and B are co-interior (add to 180°) — or uses alternate angles",
            keywords: ["parallel", "co-interior", "alternate", "180"],
          },
          {
            point: "Angle at B is 50°, so the bearing is 360° − 50° = 310°; Siti's 360° − bearing reflects instead of reversing",
            keywords: ["50", "360 - 50", "360 − 50", "reflect", "half turn", "opposite"],
          },
        ],
        commonError: "Using 360° − bearing for a return journey.",
        difficulty: "core",
        guideRef: "back-bearings",
        hints: [
          "Sketch A, B and a North line at each. Mark the 130° at A.",
          "The North lines are parallel and AB crosses both. Which pair of angles add up to 180°?",
          "Find the anticlockwise angle from North at B to BA, then turn it into a clockwise bearing.",
        ],
        strategy: "Use parallel-line angle facts",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q16",
        question:
          "The diagram is drawn on a grid of 1 cm squares, with a scale of 1 cm to 2 km. A boat sails from A due East to B, then due North to C.\n\n(a) How far does the boat sail altogether, in km? (b) The direct line from A to C measures 7.2 cm on the diagram. How many km shorter is the direct route?\n\nGive (a) first, then (b).",
        diagram: `<svg viewBox="0 0 400 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A grid of 8 by 7 squares. A boat sails from A six squares due East to B, then four squares due North to C. A dashed line joins A directly to C. A North arrow points up."><rect x="0" y="0" width="400" height="320" fill="#ffffff"/><g stroke="#cbd5e1" stroke-width="1"><line x1="20" y1="20" x2="20" y2="300"/><line x1="60" y1="20" x2="60" y2="300"/><line x1="100" y1="20" x2="100" y2="300"/><line x1="140" y1="20" x2="140" y2="300"/><line x1="180" y1="20" x2="180" y2="300"/><line x1="220" y1="20" x2="220" y2="300"/><line x1="260" y1="20" x2="260" y2="300"/><line x1="300" y1="20" x2="300" y2="300"/><line x1="340" y1="20" x2="340" y2="300"/><line x1="20" y1="20" x2="340" y2="20"/><line x1="20" y1="60" x2="340" y2="60"/><line x1="20" y1="100" x2="340" y2="100"/><line x1="20" y1="140" x2="340" y2="140"/><line x1="20" y1="180" x2="340" y2="180"/><line x1="20" y1="220" x2="340" y2="220"/><line x1="20" y1="260" x2="340" y2="260"/><line x1="20" y1="300" x2="340" y2="300"/></g><line x1="60" y1="220" x2="300" y2="220" stroke="#1f2937" stroke-width="2.5"/><line x1="300" y1="220" x2="300" y2="60" stroke="#1f2937" stroke-width="2.5"/><line x1="60" y1="220" x2="300" y2="60" stroke="#b45309" stroke-width="2" stroke-dasharray="7 5"/><circle cx="60" cy="220" r="4" fill="#1f2937"/><circle cx="300" cy="220" r="4" fill="#1f2937"/><circle cx="300" cy="60" r="4" fill="#1f2937"/><text x="44" y="240" font-size="14" font-family="sans-serif" fill="#1f2937">A</text><text x="308" y="240" font-size="14" font-family="sans-serif" fill="#1f2937">B</text><text x="308" y="56" font-size="14" font-family="sans-serif" fill="#1f2937">C</text><text x="150" y="128" font-size="12" font-family="sans-serif" fill="#b45309">7.2 cm</text><line x1="370" y1="110" x2="370" y2="48" stroke="#1f2937" stroke-width="2"/><polygon points="370,40 365,52 375,52" fill="#1f2937"/><text x="370" y="34" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">N</text></svg>`,
        answer: { type: "list", values: [20, 5.6], ordered: true, display: "(a) 20 km (b) 5.6 km" },
        traps: [
          {
            spec: { type: "list", values: [10, 2.8], ordered: true },
            feedback: "Those are lengths on the diagram, in cm. Multiply by 2 to turn them into km.",
          },
          {
            spec: { type: "list", values: [20, 14.4], ordered: true },
            feedback: "14.4 km is the length of the direct route. The question asks how much **shorter** it is.",
          },
        ],
        solution: [
          "AB is 6 squares and BC is 4 squares: 6 + 4 = 10 cm on the diagram.",
          "(a) 10 × 2 = 20 km.",
          "(b) AC = 7.2 cm, so the direct route is 7.2 × 2 = 14.4 km.",
          "20 − 14.4 = 5.6 km shorter.",
        ],
        solutions: [
          {
            label: "Subtract on the diagram first",
            steps: ["On the diagram the difference is 10 − 7.2 = 2.8 cm.", "2.8 × 2 = 5.6 km — one multiplication instead of two."],
          },
        ],
        difficulty: "core",
        guideRef: "scale-drawings",
        hints: ["Count the squares along each leg.", "Every 1 cm on the diagram stands for 2 km.", "For (b), find the real length of AC and compare it with your answer to (a)."],
        strategy: "Work in one unit, convert at the end",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q17",
        question:
          "**Stretch.** With only compasses and a straight edge you can construct 60° (from an equilateral triangle) and 90° (from a perpendicular bisector). You can also bisect any angle you have made, and put angles you have made side by side to add or subtract them.\n\nWhich of these angles can be made this way?\n\n15°, 40°, 75°, 105°, 135°, 7.5°\n\nHow many of the six can be made?",
        answer: { type: "number", value: 5 },
        traps: [
          {
            spec: { type: "number", value: 6 },
            feedback:
              "One of them can't be reached. Every angle you can make is built from 60° and 90° by halving, adding and subtracting. Look at what all those angles have in common — does 40° fit?",
          },
          {
            spec: { type: "number", value: 4 },
            feedback: "Check again: 7.5° is 15° bisected, and 15° is 60° bisected twice.",
          },
        ],
        solution: [
          "15° = 60° bisected twice (60° → 30° → 15°): yes.",
          "75° = 60° + 15°: yes.",
          "105° = 60° + 45°, where 45° is 90° bisected: yes.",
          "135° = 90° + 45°: yes.",
          "7.5° = 15° bisected: yes.",
          "40°: both starting angles are multiples of 15° (60 = 4 × 15 and 90 = 6 × 15). Halving, adding and subtracting only ever give 15° × (a whole number) ÷ (a power of 2): multiples of 15°, 7.5°, 3.75° and so on. But 40 ÷ 15 = {{8/3}}, which is not a whole number divided by a power of 2. So 40° can't be made.",
          "So 5 of the six angles can be made.",
        ],
        commonError: "Assuming that any angle can be built with enough bisecting.",
        difficulty: "challenge",
        guideRef: "loci",
        hints: [
          "Try each angle: can you build it from 60°, 90° and halves of these?",
          "75 = 60 + 15. What about 105 and 135?",
          "Every angle you can make is 15° × (whole number) ÷ (a power of 2). Test 40° against that.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q18",
        question:
          "The bearing of Q from P is (3*y* + 10)°. The bearing of P from Q is (*y* + 50)°. Both are bearings between 000° and 360°. Find *y*.",
        answer: { type: "number", value: 110, display: "y = 110" },
        traps: [
          {
            spec: { type: "number", value: -70 },
            feedback:
              "If y = −70, the bearing of Q from P would be 3 × (−70) + 10 = −200°, which is not a bearing. Try the other case.",
          },
          {
            spec: { type: "number", value: 75 },
            feedback: "A bearing and its back bearing differ by 180° — they don't add up to 360°.",
          },
        ],
        solution: [
          "A bearing and its back bearing differ by exactly 180°. You don't know which is bigger, so split into two cases.",
          "Case 1: y + 50 = (3y + 10) + 180, so y + 50 = 3y + 190, so −2y = 140 and y = −70. Then the bearing of Q from P is 3 × (−70) + 10 = −200°: impossible.",
          "Case 2: y + 50 = (3y + 10) − 180, so y + 50 = 3y − 170, so 220 = 2y and y = 110.",
          "Check: bearing of Q from P = 3 × 110 + 10 = 340°; bearing of P from Q = 110 + 50 = 160°; 340° − 160° = 180°, and both are between 000° and 360°.",
        ],
        commonError: "Writing only 'back bearing = bearing + 180' and stopping at the impossible y = −70.",
        difficulty: "challenge",
        guideRef: "back-bearings",
        hints: [
          "How are a bearing and its back bearing related?",
          "You don't know which one is bigger. Try both: back = forward + 180 and back = forward − 180.",
          "Solve each equation, then check that both bearings come out between 0° and 360°.",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "written",
        id: "constructions-bearings-p4-q19",
        question:
          "Three villages A, B and C are not in a straight line. A phone mast M must be the same distance from all three villages.\n\nRavi says: \"You need to construct all three perpendicular bisectors — of AB, BC and AC — and check that they meet.\"\n\nMei says: \"Two of them are enough.\"\n\nWho is right? Explain why.",
        marks: 3,
        modelAnswer:
          "Mei is right.\n\nConstruct the perpendicular bisectors of AB and BC; they cross at a point M. M is on the perpendicular bisector of AB, so MA = MB. M is also on the perpendicular bisector of BC, so MB = MC. Therefore MA = MB = MC, and M is the same distance from all three villages.\n\nBecause MA = MC, M is equidistant from A and C, so it automatically lies on the perpendicular bisector of AC too. The third bisector must pass through the same point, so drawing it is only a check.",
        markScheme: [
          { point: "Mei is right: two bisectors are enough", keywords: ["mei", "two", "2", "enough"] },
          {
            point: "Uses equidistance on each bisector: MA = MB and MB = MC",
            keywords: ["ma = mb", "mb = mc", "equidistant", "same distance"],
          },
          {
            point: "Concludes MA = MC, so M is automatically on the third bisector (of AC)",
            keywords: ["ma = mc", "third", "ac", "automatically", "must pass", "also"],
          },
        ],
        commonError: "Saying 'two lines always meet at one point' without explaining why that point is the same distance from all three villages.",
        difficulty: "challenge",
        guideRef: "perpendicular-bisector",
        hints: [
          "What do you know about any point on the perpendicular bisector of AB?",
          "Let M be where the bisectors of AB and BC cross. Write down two equal-length facts about M.",
          "Put those two facts together. What do they tell you about MA and MC?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "short",
        id: "constructions-bearings-p4-q20",
        question:
          "From a harbour A, buoy B is on a bearing of 040° and buoy C is on a bearing of 100°. From B, buoy C is on a bearing of 135°. Find the size of angle ACB, in degrees.",
        answer: { type: "number", value: 35, display: "35°" },
        traps: [
          { spec: { type: "number", value: 60 }, feedback: "60° is angle BAC, the angle at A. You want the angle at C." },
          { spec: { type: "number", value: 85 }, feedback: "85° is angle ABC, the angle at B. One more step to reach the angle at C." },
        ],
        solution: [
          "At A: angle BAC = 100° − 40° = 60°.",
          "At B: the bearing of A from B is 040° + 180° = 220°, and the bearing of C from B is 135°. So angle ABC = 220° − 135° = 85°.",
          "Angles in triangle ABC add to 180°: angle ACB = 180° − 60° − 85° = 35°.",
        ],
        solutions: [
          {
            label: "Work at C with two back bearings",
            steps: [
              "The bearing of A from C is the back bearing of 100°: 280°.",
              "The bearing of B from C is the back bearing of 135°: 315°.",
              "Both are measured from the North line at C, so angle ACB = 315° − 280° = 35°. This route skips the triangle altogether.",
            ],
          },
        ],
        commonError: "Stopping at an angle at A or B instead of finding the angle at C.",
        difficulty: "challenge",
        guideRef: "bearings",
        hints: [
          "Draw a North line at A and at B, and mark all three bearings.",
          "Find angle BAC at A, then use a back bearing to find angle ABC at B.",
          "Angles in a triangle add to 180° — or go straight to C and use two back bearings.",
        ],
        strategy: "Draw a diagram with a North line at every point",
      },
    ],
  },
];
