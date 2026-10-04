import type { TopicPractice } from "../../types.ts";

// Constructions, Scale Drawings & Bearings — quiz, two practice papers and the challenge set.

export const practice: TopicPractice = {
  // ===========================================================================
  // QUICK-CHECK QUIZ (4 mcq + 5 short + 1 written; 3 warmup, 6 core, 1 challenge)
  // ===========================================================================
  quiz: [
    {
      kind: "mcq",
      id: "constructions-bearings-quiz-q01",
      question: "Ethan faces due West and turns 90° clockwise. On what bearing is he now facing?",
      options: ["180°", "090°", "000°", "270°"],
      answerIndex: 2,
      explanation:
        "West is 270°. A clockwise turn adds: 270° + 90° = 360°, which is a full turn back to North — written 000°. 180° comes from turning anticlockwise (subtracting 90°), 270° ignores the turn completely, and 090° is due East, which would need a half turn from West.",
      difficulty: "warmup",
      guideRef: "bearings",
      hints: ["What bearing is due West?", "Clockwise turns add to the bearing. What happens when you reach 360°?"],
      strategy: "Draw a diagram (North line first)",
    },
    {
      kind: "short",
      id: "constructions-bearings-quiz-q02",
      question: "The obtuse angle between two lines at a point P is 143°. What is the reflex angle at P? Give your answer in degrees.",
      answer: { type: "number", value: 217, display: "217°" },
      solution: [
        "The obtuse angle and the reflex angle together make a full turn, 360°.",
        "Reflex angle = 360° − 143° = 217°.",
        "Check: 217° is between 180° and 360°, so it is reflex.",
      ],
      traps: [
        { spec: { type: "number", value: 37 }, feedback: "37° = 180° − 143° uses a straight line. The angle and its reflex partner go all the way round: 360°." },
      ],
      commonError: "Subtracting from 180° instead of 360°.",
      difficulty: "warmup",
      guideRef: "measuring-angles",
      hints: ["What do the two angles on either side of the lines add up to?"],
      strategy: "Use the inverse",
    },
    {
      kind: "mcq",
      id: "constructions-bearings-quiz-q03",
      question:
        "Hana has ruled AB = 6 cm and drawn an angle of 50° at A. Which **one** extra fact lets her finish the triangle using **SAS** (two sides and the angle between them)?",
      options: ["AC = 4 cm", "BC = 4 cm", "angle ABC = 60°", "angle ACB = 70°"],
      answerIndex: 0,
      explanation:
        "The 50° angle at A sits *between* the sides AB and AC, so knowing AC completes SAS: measure 4 cm along the 50° arm and join up. BC = 4 cm is the side *opposite* the known angle, not next to it, so it is not SAS — a side opposite the known angle can give two triangles or none. The two angle facts give ASA or angle–angle–side, not SAS.",
      difficulty: "warmup",
      guideRef: "constructing-triangles",
      hints: ["Which two sides meet at the corner A?", "SAS needs the known angle to be *between* the two known sides."],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "constructions-bearings-quiz-q04",
      question: "The bearing of B from A is 237°. Find the bearing of A from B. Give your answer as a three-figure bearing.",
      answer: { type: "number", value: 57, display: "057°" },
      solution: [
        "Going back the way you came is a half turn, so the two bearings differ by 180°.",
        "237° is more than 180°, so subtract: 237° − 180° = 57°.",
        "Written with three figures: 057°.",
        "Check: B is south-west of A, so A must be north-east of B — and 057° is in the north-east.",
      ],
      traps: [
        { spec: { type: "number", value: 417 }, feedback: "417° is more than a full turn. 237° is already over 180°, so subtract 180° instead of adding." },
        { spec: { type: "number", value: 123 }, feedback: "123° = 360° − 237° reflects the direction in the North line. A return journey reverses it: ± 180°." },
      ],
      commonError: "Adding 180° to a bearing that is already over 180°, or using 360° − bearing.",
      difficulty: "core",
      guideRef: "back-bearings",
      hints: [
        "Walking straight back is what fraction of a full turn?",
        "Add or subtract 180° — which one keeps the answer between 000° and 360°?",
        "237 is over 180, so subtract 180.",
      ],
      strategy: "Draw a diagram with a North line at every point",
    },
    {
      kind: "mcq",
      id: "constructions-bearings-quiz-q05",
      question:
        "M is the midpoint of AB. Points P and Q are on opposite sides of AB, and each of them is 5 cm from A **and** 5 cm from B. Which statement **must** be true?",
      options: ["APBQ is a square", "PQ = AB", "PM = AM", "P, M and Q lie on one straight line, at right angles to AB"],
      answerIndex: 3,
      explanation:
        "P and Q are each equidistant from A and B, so both lie on the perpendicular bisector of AB — the line through the midpoint M at right angles to AB. APBQ is a rhombus (all four sides are 5 cm), but it is only a square — with PQ = AB and PM = AM — for one particular length of AB, so none of those *must* be true.",
      difficulty: "core",
      guideRef: "perpendicular-bisector",
      hints: [
        "What is the name of the line containing every point equidistant from A and B?",
        "Do P and Q both lie on that line? Where does it cross AB?",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "short",
      id: "constructions-bearings-quiz-q06",
      question:
        "A map has a scale of 1 : 50 000. Two hawker centres are 8.4 cm apart on the map. How far apart are they in real life? Give your answer in km.",
      answer: { type: "number", value: 4.2, display: "4.2 km" },
      solution: [
        "Map → real: multiply by 50 000.",
        "8.4 × 50 000 = 420 000 cm.",
        "420 000 cm ÷ 100 = 4200 m, and 4200 m ÷ 1000 = 4.2 km.",
      ],
      traps: [
        { spec: { type: "number", value: 420 }, feedback: "420 = 420 000 ÷ 1000, which treats centimetres as metres. Divide by 100 to get metres first, then by 1000 to get km." },
      ],
      commonError: "Dividing by 1000 instead of 100 000 when converting centimetres to kilometres.",
      difficulty: "core",
      guideRef: "scale-drawings",
      hints: [
        "1 cm on the map stands for how many centimetres in real life?",
        "Multiply first, then convert cm → m → km.",
        "8.4 × 50 000 = 420 000 cm.",
      ],
      strategy: "Work in one unit, convert at the end",
    },
    {
      kind: "mcq",
      id: "constructions-bearings-quiz-q07",
      question:
        "A bench P is 6 m from a long, straight sea wall, measured at right angles to the wall (N is the foot of that perpendicular). X is a **different** point on the wall. Which of these could be the distance PX?",
      options: ["6 m", "7.5 m", "5.5 m", "3 m"],
      answerIndex: 1,
      explanation:
        "The perpendicular distance PN = 6 m is the **shortest** distance from P to the wall. For any other point X, the path PX slants, and it is the longest side of the right-angled triangle PNX — so PX is more than 6 m, and 7.5 m is possible. 6 m is only the distance to N itself, and 5.5 m or 3 m would be shorter than the shortest distance, which is impossible.",
      difficulty: "core",
      guideRef: "angle-bisector",
      hints: ["Which route from P to the wall is the shortest of all?", "PX is a side of the right-angled triangle PNX. Which side of a right-angled triangle is the longest?"],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "constructions-bearings-quiz-q08",
      question:
        "A ship is sailing on a bearing of 205°. It turns 90° **anticlockwise**. What is its new bearing? Give your answer as a three-figure bearing.",
      answer: { type: "number", value: 115, display: "115°" },
      solution: [
        "Bearings are measured clockwise, so turning anticlockwise **decreases** the bearing.",
        "205° − 90° = 115°.",
        "Check: 205° points roughly south-south-west; a quarter turn to the left from there faces roughly east-south-east, which is about 115°.",
      ],
      traps: [{ spec: { type: "number", value: 295 }, feedback: "295° is a 90° turn **clockwise**. Anticlockwise turns make the bearing smaller." }],
      commonError: "Adding the turn even though it is anticlockwise.",
      difficulty: "core",
      guideRef: "bearings",
      hints: ["Does an anticlockwise turn make a bearing bigger or smaller?", "Bearings increase clockwise, so an anticlockwise turn means subtract."],
      strategy: "Draw a diagram (North line first)",
    },
    {
      kind: "short",
      id: "constructions-bearings-quiz-q09",
      question:
        "Using only compasses and a straight edge, Arjun constructs an angle of 60°. He bisects it, then bisects one of the two halves. How big is each of the smallest angles? Give your answer in degrees.",
      answer: { type: "number", value: 15, display: "15°" },
      solution: ["60° comes from an equilateral triangle drawn with equal arcs.", "Bisect once: 60° ÷ 2 = 30°.", "Bisect again: 30° ÷ 2 = 15°."],
      traps: [{ spec: { type: "number", value: 20 }, feedback: "Bisecting cuts an angle into two equal halves, not three. 60° → 30° → 15°." }],
      difficulty: "core",
      guideRef: "loci",
      hints: ["What does bisecting do to the size of an angle?", "Halve 60°, then halve the answer again."],
      strategy: "Make it simpler",
    },
    {
      kind: "written",
      id: "constructions-bearings-quiz-q10",
      question:
        "Zara's rule for a return journey is: **\"bearing of A from B = 360° − bearing of B from A\"**.\n\n(a) Use a bearing of 065° to show that her rule does not work in general.\n\n(b) Find every bearing for which her rule *happens* to give the right answer, and explain why it works for those directions.",
      marks: 4,
      modelAnswer:
        "(a) If the bearing of B from A is 065°, the true back bearing is a half turn away: 065° + 180° = 245°. Zara's rule gives 360° − 65° = 295°, which is wrong.\n\n(b) Call the bearing x. For x under 180°, the rule works when 360 − x = x + 180, so 2x = 180 and x = 90. For x of 180° or more, it works when 360 − x = x − 180, so 2x = 540 and x = 270. So it only works for 090° (due East) and 270° (due West).\n\nWhy: Zara's rule *reflects* the direction in the North–South line, but a return journey *reverses* it. Reflecting East in the North–South line gives West — which is also exactly the reverse of East. For every other direction, the reflection and the reverse are different.",
      markScheme: [
        { point: "Correct back bearing of 065° is 245° (add 180°)", keywords: ["245", "180", "half turn"] },
        { point: "Shows Zara's rule gives 295°, so it fails", keywords: ["295", "wrong", "fails", "not"] },
        { point: "Finds that the rule works only for 090° and 270° (e.g. by solving 360 − x = x ± 180)", keywords: ["090", "90", "270", "east", "west"] },
        { point: "Explains: her rule reflects in the North–South line; for due East/West the reflection is the same as reversing", keywords: ["reflect", "reverse", "opposite", "mirror", "north-south"] },
      ],
      commonError: "Testing one bearing and deciding the rule is *always* wrong — it does work for due East and due West.",
      difficulty: "challenge",
      guideRef: "back-bearings",
      hints: [
        "For (a): what is the *correct* back bearing of 065°?",
        "Zara's rule is a reflection in the North line. A return journey is a half turn. When could those give the same direction?",
        "Call the bearing x. Solve 360 − x = x + 180 (for x under 180), then 360 − x = x − 180 (for x of 180 or more).",
      ],
      strategy: "Introduce a variable",
    },
  ],

  // ===========================================================================
  // PRACTICE PAPERS (16 short + 4 written each; ≈ 5 warmup, 11 core, 4 challenge)
  // ===========================================================================
  papers: [
    {
      id: "constructions-bearings-p1",
      title: "Practice Paper 1",
      questions: [
        {
          kind: "short",
          id: "constructions-bearings-p1-q01",
          question:
            "A protractor's centre is on the vertex of an angle. The first arm passes through the **0 of the outer scale**. The second arm crosses the scales at 38 (inner) and 142 (outer). How big is the angle, in degrees?",
          answer: { type: "number", value: 142, display: "142°" },
          solution: [
            "The first arm sits on the outer scale's 0, so count along the outer scale.",
            "Where the second arm crosses, the outer scale reads 142, so the angle is 142°.",
            "Check: 38 + 142 = 180, as the two scales always do. A quick sketch would show an obtuse angle.",
          ],
          traps: [{ spec: { type: "number", value: 38 }, feedback: "38 is on the inner scale, which starts from the *other* side. Follow the scale that reads 0 on the first arm." }],
          difficulty: "warmup",
          guideRef: "measuring-angles",
          hints: ["Which scale has its 0 on the first arm?"],
          strategy: "Estimate first",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q02",
          question: "A plane flies **north-east**. Write this direction as a three-figure bearing. Give the number of degrees.",
          answer: { type: "number", value: 45, display: "045°" },
          solution: ["North-east is halfway between North (000°) and East (090°).", "Halfway: 90° ÷ 2 = 45°.", "As a three-figure bearing: 045°."],
          traps: [{ spec: { type: "number", value: 315 }, feedback: "315° is north-*west* — that is 45° measured anticlockwise. Bearings turn clockwise from North." }],
          difficulty: "warmup",
          guideRef: "bearings",
          hints: ["East is 090°. North-east is halfway between North and East."],
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q03",
          question: "The bearing of B from A is 124°. Find the bearing of A from B. Give the number of degrees.",
          answer: { type: "number", value: 304, display: "304°" },
          solution: [
            "124° is less than 180°, so add 180°.",
            "124° + 180° = 304°.",
            "Check: B is south-east of A, so A is north-west of B — and 304° is in the north-west.",
          ],
          traps: [
            { spec: { type: "number", value: 236 }, feedback: "236° = 360° − 124° reflects the direction. A return journey is a half turn, so add 180°." },
            { spec: { type: "number", value: 56 }, feedback: "56° = 180° − 124°. A bearing and its back bearing differ by exactly 180°, so add 180° here." },
          ],
          difficulty: "warmup",
          guideRef: "back-bearings",
          hints: ["A bearing and its back bearing always differ by how much?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q04",
          question: "The perpendicular bisector of a line segment AB meets it at M. AB = 11.6 cm. How long is AM, in cm?",
          answer: { type: "number", value: 5.8, display: "5.8 cm" },
          solution: ["A perpendicular bisector cuts AB into two equal halves at M.", "AM = 11.6 ÷ 2 = 5.8 cm."],
          difficulty: "warmup",
          guideRef: "perpendicular-bisector",
          hints: ["What does *bisect* mean?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q05",
          question:
            "On a plan of a school hall, 1 cm represents 2 m. The stage is 4.5 cm wide on the plan. How wide is the real stage, in metres?",
          answer: { type: "number", value: 9, display: "9 m" },
          solution: ["Each 1 cm on the plan stands for 2 m.", "4.5 × 2 = 9 m."],
          traps: [{ spec: { type: "number", value: 2.25 }, feedback: "Plan → real means multiply by the scale: every centimetre is 2 m, so 4.5 cm is 4.5 × 2 m." }],
          difficulty: "warmup",
          guideRef: "scale-drawings",
          hints: ["Each centimetre on the plan stands for 2 m. How many centimetres are there?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q06",
          question: "How many degrees does the **hour** hand of a clock turn between 9:40 a.m. and 1:10 p.m.?",
          answer: { type: "number", value: 105, display: "105°" },
          solution: [
            "Time taken: 9:40 to 12:40 is 3 hours, then 12:40 to 1:10 is 30 minutes — 3.5 hours altogether.",
            "The hour hand turns 360° in 12 hours, which is 30° per hour.",
            "3.5 × 30° = 105°.",
          ],
          traps: [
            { spec: { type: "number", value: 1260 }, feedback: "1260° is how far the **minute** hand turns (6° per minute for 210 minutes). The hour hand is 12 times slower." },
            { spec: { type: "number", value: 120 }, feedback: "120° counts 4 hours (9 to 1). From 9:40 to 1:10 is only 3 hours 30 minutes." },
          ],
          commonError: "Counting the hours from 9 to 1 and ignoring the minutes.",
          difficulty: "core",
          guideRef: "measuring-angles",
          hints: [
            "How long is it from 9:40 a.m. to 1:10 p.m.?",
            "The hour hand goes all the way round (360°) in 12 hours. How far is that in one hour?",
            "Multiply the time in hours by 30°.",
          ],
          strategy: "Make it simpler",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q07",
          question:
            "Priya must construct triangle PQR with PQ = 7 cm, angle QPR = 36° and angle PRQ = 82°. The 82° angle is at R, which is not on PQ, so she can't draw it straight away. What angle should she draw at Q so that she can construct the triangle using ASA? Give your answer in degrees.",
          answer: { type: "number", value: 62, display: "62°" },
          solution: [
            "ASA needs the known side PQ and the angles at **both** of its ends, P and Q.",
            "The angles of a triangle add to 180°, so angle PQR = 180° − 36° − 82° = 62°.",
            "Now rule PQ = 7 cm, draw 36° at P and 62° at Q on the same side; the lines cross at R. Check: angle R measures 82°.",
          ],
          traps: [
            { spec: { type: "number", value: 82 }, feedback: "82° belongs at R, which is not an end of PQ. ASA needs the angles at P and Q." },
            { spec: { type: "number", value: 98 }, feedback: "98° = 180° − 82° leaves out the 36° at P. All three angles share the 180°." },
          ],
          commonError: "Drawing the 82° angle at Q, which gives a different triangle.",
          difficulty: "core",
          guideRef: "constructing-triangles",
          hints: [
            "ASA needs the side PQ and the angles at both of its ends. Which of those angles is missing?",
            "What do the three angles of a triangle add up to?",
          ],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q08",
          question:
            "A lighthouse L is due South of a harbour H. A boat B is to the **east** of the line HL, and angle LHB = 48°. Find the bearing of B from H. Give the number of degrees.",
          answer: { type: "number", value: 132, display: "132°" },
          solution: [
            "Stand at H with a North line. L is due South, so the line HL is on a bearing of 180°.",
            "B is 48° away from HL, on the east side — that means back towards East (090°), so subtract.",
            "Bearing = 180° − 48° = 132°.",
            "Check: 132° is between 090° (East) and 180° (South), so B is south-east of H, as described.",
          ],
          traps: [
            { spec: { type: "number", value: 228 }, feedback: "228° is 48° past South on the *west* side. B is east of the line HL, so its bearing is between 090° and 180°." },
            { spec: { type: "number", value: 48 }, feedback: "48° is measured from South, not from North. Bearings are always measured clockwise from North." },
          ],
          difficulty: "core",
          guideRef: "bearings",
          hints: ["Draw a North line at H. On what bearing is L from H?", "B is on the east side of HL. Is its bearing more or less than 180°?"],
          strategy: "Draw a diagram (North line first)",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q09",
          question:
            "Priya stands at P and Jun stands at J. The bearing of J from P is 152°. Jun starts facing North and wants to turn to face Priya. Through what angle must he turn **anticlockwise**? Give the number of degrees.",
          answer: { type: "number", value: 28, display: "28°" },
          solution: [
            "Jun needs the bearing of P from J — the back bearing of 152°.",
            "152° is less than 180°, so add 180°: 152° + 180° = 332°.",
            "332° clockwise from North is the same direction as 360° − 332° = 28° anticlockwise.",
          ],
          solutions: [
            {
              label: "Parallel North lines",
              steps: [
                "At P, the line to J is 180° − 152° = 28° away from South, on the east side.",
                "The North–South lines at P and J are parallel, so at J the line back to P is 28° away from North, on the west side (alternate angles).",
                "So Jun turns 28° anticlockwise. This skips the back bearing entirely.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 332 }, feedback: "332° is the clockwise angle (the bearing of P from J). The question asks how far Jun turns anticlockwise." },
            { spec: { type: "number", value: 152 }, feedback: "152° is the bearing of J from P. Jun is at J looking back, so start with the back bearing." },
          ],
          difficulty: "core",
          guideRef: "back-bearings",
          hints: [
            "Jun is at J. Does he need the bearing of P from J, or of J from P?",
            "Find the back bearing of 152°.",
            "A clockwise angle of 332° from North is how many degrees anticlockwise?",
          ],
          strategy: "Draw a diagram with a North line at every point",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q10",
          question:
            "In triangle ABC, angle BAC = 76° and angle ABC = 58°. The bisector of angle BAC meets BC at D. Find angle ADC, in degrees.",
          diagram: `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with base BC. A line from A bisects angle BAC and meets BC at D, between B and C."><rect x="0" y="0" width="420" height="300" fill="#ffffff"/><polygon points="177.9,71.4 60,260 360,260" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="177.9" y1="71.4" x2="197.7" y2="260" stroke="#1f2937" stroke-width="2"/><path d="M163.1 95.1 A28 28 0 0 0 180.8 99.3" fill="none" stroke="#334155" stroke-width="1.5"/><path d="M180.8 99.3 A28 28 0 0 0 197.3 91.5" fill="none" stroke="#334155" stroke-width="1.5"/><text x="172" y="62" font-size="14" font-family="sans-serif" fill="#1f2937">A</text><text x="44" y="276" font-size="14" font-family="sans-serif" fill="#1f2937">B</text><text x="364" y="276" font-size="14" font-family="sans-serif" fill="#1f2937">C</text><text x="192" y="280" font-size="14" font-family="sans-serif" fill="#1f2937">D</text><text x="92" y="252" font-size="12" font-family="sans-serif" fill="#334155">58°</text></svg>`,
          answer: { type: "number", value: 96, display: "96°" },
          solution: [
            "The bisector halves angle A: angle DAC = 76° ÷ 2 = 38°.",
            "Angle ACB = 180° − 76° − 58° = 46°.",
            "In triangle ADC: angle ADC = 180° − 38° − 46° = 96°.",
          ],
          solutions: [
            {
              label: "Through the other triangle",
              steps: [
                "In triangle ABD: angle ADB = 180° − 38° − 58° = 84°.",
                "Angles ADB and ADC sit on the straight line BC, so angle ADC = 180° − 84° = 96°.",
              ],
            },
          ],
          traps: [{ spec: { type: "number", value: 84 }, feedback: "84° is angle ADB, in the other triangle. Angle ADC is next to it on the straight line BC." }],
          difficulty: "core",
          guideRef: "angle-bisector",
          hints: [
            "What does the bisector do to the 76° angle?",
            "Which triangle contains angle ADC? Which of its angles do you know or can you find?",
            "Find angle C first, then use the angles of triangle ADC.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q11",
          question:
            "A path that is 2.4 km long measures 8 cm on a map. The scale of the map is 1 : n. Find n. (Type n without spaces.)",
          answer: { type: "number", value: 30000, display: "30 000" },
          solution: [
            "A ratio scale has no units, so put both lengths in centimetres: 2.4 km = 2400 m = 240 000 cm.",
            "8 cm on the map represents 240 000 cm, so 1 cm represents 240 000 ÷ 8 = 30 000 cm.",
            "The scale is 1 : 30 000, so n = 30 000.",
          ],
          traps: [
            { spec: { type: "number", value: 300 }, feedback: "300 is 2.4 km ÷ 8 measured in *metres*. Both parts of a ratio scale must be in the same unit: convert to centimetres." },
            { spec: { type: "number", value: 0.3 }, feedback: "0.3 is in kilometres per centimetre. A ratio scale compares the same units: 1 cm to how many cm?" },
          ],
          commonError: "Mixing units — dividing kilometres or metres by centimetres.",
          difficulty: "core",
          guideRef: "scale-drawings",
          hints: ["A ratio scale has no units. What unit should both lengths be in?", "2.4 km = 240 000 cm.", "Divide the real length by the map length."],
          strategy: "Work in one unit, convert at the end",
        },
        {
          kind: "written",
          id: "constructions-bearings-p1-q12",
          question:
            "Arjun says: \"With sides of 7 cm, 5 cm and 6 cm, I could construct lots of different triangles.\" Use the compass construction to explain why every triangle with these three sides is exactly the same size and shape.",
          marks: 3,
          modelAnswer:
            "Rule AB = 7 cm. The third corner C must be 5 cm from A, so it lies on the circle of radius 5 cm centred at A. It must also be 6 cm from B, so it lies on the circle of radius 6 cm centred at B. Two circles cross in at most two points, so there are only two places C can go: one above AB and one below it. Those two triangles are reflections of each other in the line AB, so they are congruent — the same size and shape. So SSS fixes the triangle; Arjun can only make copies of it (possibly flipped over).",
          markScheme: [
            { point: "C must be 5 cm from A, so it is on an arc/circle of radius 5 cm centred at A (and on a 6 cm arc centred at B)", keywords: ["arc", "circle", "radius", "5 cm from a", "6 cm from b"] },
            { point: "The two arcs cross in only two points, one on each side of AB", keywords: ["two points", "cross", "intersect", "meet", "only"] },
            { point: "The two possible triangles are mirror images, so they are congruent (same size and shape)", keywords: ["reflection", "mirror", "congruent", "same shape", "identical"] },
          ],
          commonError: "Just describing the steps of the construction without saying why C has no choice about where it goes.",
          difficulty: "core",
          guideRef: "constructing-triangles",
          hints: [
            "Draw the 7 cm side first. Where can the third corner be if it must be 5 cm from A?",
            "It must also be 6 cm from B. Where do both conditions hold at once?",
            "How many crossing points are there, and how are the two triangles related?",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "written",
          id: "constructions-bearings-p1-q13",
          question:
            "To bisect AB, Ethan draws arcs of the same radius from A and from B. The arcs cross at P (above AB) and Q (below AB). Explain why the line PQ passes through the midpoint of AB **and** is at right angles to it.",
          marks: 3,
          modelAnswer:
            "P is on an arc centred at A and an arc centred at B with the same radius, so PA = PB = the radius. The same is true for Q, so QA = QB = the radius. All four sides PA, PB, QA and QB are equal, so APBQ is a rhombus. The diagonals of a rhombus cut each other in half at right angles. PQ and AB are its diagonals, so PQ crosses AB at its midpoint, at 90°. (Or by symmetry: reflecting in the line PQ swaps A and B, so PQ is the mirror line of AB — it crosses AB at its midpoint at right angles.)",
          markScheme: [
            { point: "PA = PB and QA = QB because all the arcs have the same radius", keywords: ["same radius", "equal", "pa = pb", "qa = qb", "equidistant"] },
            { point: "Identifies APBQ as a rhombus (or uses symmetry / congruent triangles)", keywords: ["rhombus", "symmetry", "symmetric", "congruent", "mirror"] },
            { point: "The diagonals of a rhombus bisect each other at right angles, so PQ meets AB at its midpoint at 90°", keywords: ["diagonals", "bisect", "midpoint", "90", "right angle", "perpendicular"] },
          ],
          difficulty: "core",
          guideRef: "perpendicular-bisector",
          hints: [
            "What can you say about the lengths PA and PB? And QA and QB?",
            "Join A, P, B and Q. What special quadrilateral have you drawn?",
            "What do you know about the diagonals of that quadrilateral?",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q14",
          question: "Points A and B are 6 cm apart. How many points are there that are **exactly** 4 cm from A **and** exactly 2 cm from B?",
          answer: { type: "number", value: 1 },
          solution: [
            "Points exactly 4 cm from A lie on a circle of radius 4 cm centred at A.",
            "Points exactly 2 cm from B lie on a circle of radius 2 cm centred at B.",
            "4 + 2 = 6 = AB, so the two circles only just touch, at one point on the segment AB (4 cm from A).",
            "So there is exactly 1 such point.",
          ],
          traps: [{ spec: { type: "number", value: 2 }, feedback: "Two circles usually cross twice — but here 4 + 2 is exactly the 6 cm between the centres, so they only touch. Sketch it." }],
          difficulty: "core",
          guideRef: "loci",
          hints: [
            "Describe each condition as a locus.",
            "You have a circle of radius 4 cm around A and a circle of radius 2 cm around B. How far apart are the centres?",
            "Compare 4 + 2 with 6.",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q15",
          question:
            "A plan of a rectangular sports field uses a scale of 1 : 1500. On the plan the field is 8 cm by 5 cm. Find the real perimeter of the field, in metres.",
          answer: { type: "number", value: 390, display: "390 m" },
          solution: [
            "Real length: 8 × 1500 = 12 000 cm = 120 m.",
            "Real width: 5 × 1500 = 7500 cm = 75 m.",
            "Perimeter = 2 × (120 + 75) = 2 × 195 = 390 m.",
          ],
          solutions: [
            {
              label: "Scale the perimeter directly",
              steps: [
                "Perimeter on the plan = 2 × (8 + 5) = 26 cm.",
                "Every length scales by the same factor, so the real perimeter = 26 × 1500 = 39 000 cm = 390 m. Quicker: one multiplication instead of two.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 26 }, feedback: "26 cm is the perimeter on the plan. Multiply by 1500 to get the real perimeter." },
            { spec: { type: "number", value: 39000 }, feedback: "39 000 is in centimetres. Divide by 100 to give metres." },
          ],
          difficulty: "core",
          guideRef: "scale-drawings",
          hints: [
            "Find the real length and width first — or find the perimeter on the plan first.",
            "1 cm on the plan is 1500 cm in real life. How many metres is that?",
          ],
          strategy: "Work in one unit, convert at the end",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q16",
          question:
            "The bearing of B from A and the bearing of A from B add up to 300°. Find the two bearings. Give the smaller bearing first.",
          answer: { type: "list", values: [60, 240], ordered: true, display: "060° and 240°" },
          solution: [
            "A bearing and its back bearing differ by exactly 180°. Call the smaller one x, so the larger one is x + 180.",
            "x + (x + 180) = 300, so 2x = 120 and x = 60.",
            "The bearings are 060° and 240°. Check: 60 + 240 = 300 and 240 − 60 = 180.",
          ],
          solutions: [
            {
              label: "Sum and difference",
              steps: ["Two numbers add to 300 and differ by 180.", "The larger is (300 + 180) ÷ 2 = 240 and the smaller is (300 − 180) ÷ 2 = 60."],
            },
          ],
          traps: [
            { spec: { type: "list", values: [150, 150], ordered: true }, feedback: "150° and 150° add to 300°, but a bearing and its back bearing must differ by exactly 180°." },
          ],
          difficulty: "core",
          guideRef: "back-bearings",
          hints: ["How are a bearing and its back bearing related?", "Call the smaller bearing x. Write the larger one in terms of x.", "Solve x + (x + 180) = 300."],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q17",
          question:
            "In triangle ABC, the perpendicular bisector of AB passes through C, and the perpendicular bisector of AC passes through B. Find angle BAC, in degrees.",
          answer: { type: "number", value: 60, display: "60°" },
          solution: [
            "C is on the perpendicular bisector of AB, so C is equidistant from A and B: CA = CB.",
            "B is on the perpendicular bisector of AC, so B is equidistant from A and C: BA = BC.",
            "Together: AB = BC = CA, so the triangle is equilateral.",
            "Each angle of an equilateral triangle is 180° ÷ 3 = 60°, so angle BAC = 60°.",
          ],
          traps: [{ spec: { type: "number", value: 90 }, feedback: "The right angles are where each bisector crosses its *side*, not at the corner A. Turn each fact into a pair of equal lengths instead." }],
          difficulty: "challenge",
          guideRef: "perpendicular-bisector",
          hints: [
            "Translate \"C lies on the perpendicular bisector of AB\" into a statement about lengths.",
            "Every point on the perpendicular bisector of AB is equidistant from A and B, so CA = CB. What does the second fact give you?",
            "Put the two pairs of equal lengths together. What kind of triangle is ABC?",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "constructions-bearings-p1-q18",
          question:
            "A, B and C are the corners of an equilateral triangle. The bearing of B from A is 100° and the bearing of C from A is 160°. Find the bearing of C from B. Give your answer as a three-figure bearing.",
          answer: { type: "number", value: 220, display: "220°" },
          solution: [
            "Walk round the triangle A → B → C → A. Seen from A, C (160°) is clockwise from B (100°), so this walk turns clockwise at every corner.",
            "At each corner of an equilateral triangle the walker turns through the exterior angle, 180° − 60° = 120°.",
            "So the leg B → C is on 100° + 120° = 220°: the bearing of C from B is 220°.",
            "Check: turning another 120° gives 340° for the leg C → A, and the back bearing of 160° is indeed 160° + 180° = 340°.",
          ],
          solutions: [
            {
              label: "Back bearing, then the 60° angle",
              steps: [
                "Bearing of A from B = 100° + 180° = 280°.",
                "Angle ABC = 60°. A sketch shows C is south-west of B, so turn anticlockwise from 280°: 280° − 60° = 220°.",
                "This is just as quick, but you need the sketch to know which way to turn; the turning method decides that for you.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 340 }, feedback: "340° = 280° + 60° turns the wrong way at B — it points north-north-west, but C is south-west of B. Sketch it." },
            { spec: { type: "number", value: 60 }, feedback: "60° is the angle inside the triangle, not a bearing. Bearings are measured clockwise from North at B." },
          ],
          difficulty: "challenge",
          guideRef: "bearings",
          hints: [
            "Sketch it: a North line at A, then B on 100° and C on 160°. Roughly where is C compared with B?",
            "What is the bearing of A from B, and what is the angle of the triangle at B?",
            "From the bearing of A from B, turn 60° — which way round points at C?",
          ],
          strategy: "Draw a diagram with a North line at every point",
        },
        {
          kind: "written",
          id: "constructions-bearings-p1-q19",
          question:
            "A yacht sails from A to B on a bearing of 050°, then from B to C on a bearing of 170°, then from C back to A on a bearing of 290°. Prove that triangle ABC is equilateral.",
          marks: 3,
          modelAnswer:
            "At B: the bearing of A from B is 050° + 180° = 230°, and the bearing of C from B is 170°, so angle ABC = 230° − 170° = 60°.\n\nAt C: the bearing of B from C is 170° + 180° = 350°, and the bearing of A from C is 290°, so angle BCA = 350° − 290° = 60°.\n\nThe angles of a triangle add to 180°, so angle CAB = 180° − 60° − 60° = 60°. All three angles are equal, and equal angles face equal sides, so all three sides are equal: the triangle is equilateral.",
          markScheme: [
            { point: "Uses a back bearing at B (230°) to find angle ABC = 60°", keywords: ["230", "60"] },
            { point: "Finds a second angle of 60° (at C using 350° and 290°, or at A using 110°)", keywords: ["350", "110", "60"] },
            { point: "Third angle is 60°; equal angles give equal sides, so the triangle is equilateral", keywords: ["180", "equal sides", "equilateral", "all angles"] },
          ],
          solutions: [
            {
              label: "Turning angles",
              steps: [
                "The yacht's heading goes 050° → 170° → 290° → 050° again: it turns 120° clockwise at every corner.",
                "Each exterior angle is 120°, so each interior angle is 180° − 120° = 60°.",
                "All three angles are 60°, so the triangle is equilateral. This is quicker: no back bearings needed.",
              ],
            },
          ],
          commonError: "Subtracting the two given bearings at a corner (e.g. 170° − 50° = 120°), which gives the turn, not the angle inside the triangle.",
          difficulty: "challenge",
          guideRef: "back-bearings",
          hints: [
            "At each corner you need two bearings measured from the *same* North line. Which one must you reverse?",
            "At B, the bearing of A from B is a back bearing. Compare it with 170°.",
            "Once you have two angles, find the third. What do equal angles tell you about the sides?",
          ],
          strategy: "Draw a diagram with a North line at every point",
        },
        {
          kind: "written",
          id: "constructions-bearings-p1-q20",
          question:
            "To drop a perpendicular from a point P to a line l, Mei draws an arc centred on P that cuts l at G and H. Then, with equal radii, she draws arcs from G and from H on the other side of l, crossing at K.\n\nProve that the line PK meets l at right angles.",
          marks: 3,
          modelAnswer:
            "G and H are on the same arc centred at P, so PG = PH: P is equidistant from G and H.\n\nK was found with equal arcs from G and H, so KG = KH: K is also equidistant from G and H.\n\nEvery point equidistant from G and H lies on the perpendicular bisector of GH. So P and K **both** lie on that perpendicular bisector — and only one straight line passes through two points, so the line PK *is* the perpendicular bisector of GH. A perpendicular bisector crosses its segment at 90°, and GH lies along l, so PK meets l at right angles (at the midpoint of GH).",
          markScheme: [
            { point: "PG = PH (same arc), so P is equidistant from G and H", keywords: ["pg = ph", "same arc", "same radius", "equidistant"] },
            { point: "KG = KH (equal arcs), so K is also equidistant from G and H", keywords: ["kg = kh", "equal arcs", "equal radii", "also equidistant"] },
            { point: "P and K both lie on the perpendicular bisector of GH, so PK is that line and meets l at 90°", keywords: ["perpendicular bisector", "both", "90", "right angle"] },
          ],
          commonError: "Saying \"it looks like 90°\" or measuring it — a proof must work for every point P and every line l.",
          difficulty: "challenge",
          guideRef: "angle-bisector",
          hints: [
            "What can you say about the lengths PG and PH? And KG and KH?",
            "Which line contains every point that is equidistant from G and H?",
            "P and K are both on that line. How many straight lines pass through two given points?",
          ],
          strategy: "Use symmetry",
        },
      ],
    },
    {
      id: "constructions-bearings-p2",
      title: "Practice Paper 2",
      questions: [
        {
          kind: "short",
          id: "constructions-bearings-p2-q01",
          question: "Three angles meet at a point. Two of them measure 47° and 68°. The third is a reflex angle. How big is it, in degrees?",
          answer: { type: "number", value: 245, display: "245°" },
          solution: ["Angles around a point make a full turn: 360°.", "47° + 68° = 115°.", "Reflex angle = 360° − 115° = 245°."],
          traps: [{ spec: { type: "number", value: 65 }, feedback: "65° = 180° − 47° − 68° uses angles on a straight line. Angles around a point make a full turn, 360°." }],
          difficulty: "warmup",
          guideRef: "measuring-angles",
          hints: ["What do angles around a point add up to?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q02",
          question: "Add together the three-figure bearings of due North, due East, due South and due West. What total do you get?",
          answer: { type: "number", value: 540, display: "540°" },
          solution: ["North = 000°, East = 090°, South = 180°, West = 270°.", "0 + 90 + 180 + 270 = 540."],
          traps: [{ spec: { type: "number", value: 900 }, feedback: "North is 000°, not 360°. Bearings start at 000° and stop just before 360°." }],
          difficulty: "warmup",
          guideRef: "bearings",
          hints: ["Write each direction as a bearing first, turning clockwise from North."],
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q03",
          question:
            "Aisha is constructing triangle ABC with AB = 9 cm, AC = 6 cm and BC = 5 cm. She has already ruled AB. When she puts the compass point on **B**, what radius should she set, in cm?",
          answer: { type: "number", value: 5, display: "5 cm" },
          solution: [
            "An arc centred on B marks every point that is a fixed distance from B.",
            "The corner C must be 5 cm from B, because BC = 5 cm.",
            "So set the compasses to 5 cm. (From A she uses 6 cm, and the arcs cross at C.)",
          ],
          traps: [
            { spec: { type: "number", value: 6 }, feedback: "6 cm is AC, the distance from A. An arc centred on B marks points a fixed distance from B, so use BC." },
            { spec: { type: "number", value: 9 }, feedback: "9 cm is AB, the side already drawn. The arc from B must find C." },
          ],
          difficulty: "warmup",
          guideRef: "constructing-triangles",
          hints: ["Which side of the triangle starts at B and ends at the corner she is trying to find?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q04",
          question:
            "From a boat B, a lighthouse L is on a bearing of 260°. What is the bearing of the boat from the lighthouse? Give your answer as a three-figure bearing.",
          answer: { type: "number", value: 80, display: "080°" },
          solution: ["260° is more than 180°, so subtract 180°.", "260° − 180° = 80°, written 080°."],
          traps: [
            { spec: { type: "number", value: 440 }, feedback: "440° is more than a full turn. For a bearing of 180° or more, subtract 180°." },
            { spec: { type: "number", value: 100 }, feedback: "100° = 360° − 260°. Reversing a direction is a half turn: subtract 180°." },
          ],
          difficulty: "warmup",
          guideRef: "back-bearings",
          hints: ["The return direction differs by 180°. Add or subtract?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q05",
          question: "On a map, 1 cm represents 3 km. Two towns are 18 km apart. How far apart are they on the map, in cm?",
          answer: { type: "number", value: 6, display: "6 cm" },
          solution: ["Real → map: divide by the scale.", "18 ÷ 3 = 6 cm."],
          traps: [{ spec: { type: "number", value: 54 }, feedback: "54 = 18 × 3. Going from real life to the map makes things smaller, so divide." }],
          difficulty: "warmup",
          guideRef: "scale-drawings",
          hints: ["How many 3 km steps fit into 18 km?"],
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q06",
          question:
            "Hana's compasses open to at most 7 cm. She wants to construct the perpendicular bisector of a line segment, with arcs from both ends. What is the longest whole number of centimetres the segment can be?",
          answer: { type: "number", value: 13, display: "13 cm" },
          solution: [
            "The arcs must reach past the midpoint so that they cross, so the radius must be **more than** half the length L: 7 > {{L/2}}.",
            "So L < 14 cm.",
            "The longest whole number of centimetres below 14 is 13 cm.",
          ],
          traps: [
            { spec: { type: "number", value: 14 }, feedback: "For a 14 cm segment, 7 cm arcs only just touch at the midpoint — one point, not the two crossings you need." },
            { spec: { type: "number", value: 7 }, feedback: "The radius only has to be more than *half* the segment, so the segment can be almost twice as long as the radius." },
          ],
          difficulty: "core",
          guideRef: "perpendicular-bisector",
          hints: [
            "Where must the arcs from the two ends meet?",
            "The radius must be more than half the length. So the length must be less than …?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q07",
          question:
            "An angle is bisected. One of the two halves is then bisected again. Each of the smallest angles is 19°. How big was the original angle, in degrees?",
          answer: { type: "number", value: 76, display: "76°" },
          solution: [
            "Work backwards: each bisection halved an angle, so undo it by doubling.",
            "The smallest angle came from a half of 2 × 19° = 38°.",
            "That half came from the original angle: 2 × 38° = 76°.",
          ],
          traps: [{ spec: { type: "number", value: 38 }, feedback: "38° is just one of the first two halves. Undo *both* bisections: double, then double again." }],
          difficulty: "core",
          guideRef: "angle-bisector",
          hints: ["Work backwards. What undoes halving?", "Double 19°, then double again."],
          strategy: "Work backwards",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q08",
          question:
            "From a tower T, a temple A is 4 km away on a bearing of 125°, and a bridge B is 4 km away on a bearing of 215°. Find the bearing of B from A. Give your answer as a three-figure bearing.",
          answer: { type: "number", value: 260, display: "260°" },
          solution: [
            "Angle ATB = 215° − 125° = 90°, and TA = TB = 4 km, so triangle ATB is right-angled and isosceles.",
            "Its other two angles are (180° − 90°) ÷ 2 = 45° each, so angle TAB = 45°.",
            "The bearing of T from A is the back bearing of 125°: 125° + 180° = 305°.",
            "From A, B is 45° anticlockwise from T (B lies round to the west of T), so the bearing of B from A = 305° − 45° = 260°.",
          ],
          traps: [
            { spec: { type: "number", value: 350 }, feedback: "350° = 305° + 45° turns the wrong way at A. B is south-west of T, so from A it is round to the west of T, not the north." },
            { spec: { type: "number", value: 80 }, feedback: "080° is the bearing of A from B. The question asks for the bearing of B from A." },
          ],
          difficulty: "core",
          guideRef: "bearings",
          hints: [
            "What is angle ATB? What kind of triangle is ATB?",
            "Find angle TAB, and the bearing of T from A.",
            "From A, turn from the direction of T towards B — which way round?",
          ],
          strategy: "Draw a diagram with a North line at every point",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q09",
          question: "Town B is on a bearing of 063° from town A. Town C is due **West** of B. Find angle ABC, in degrees.",
          answer: { type: "number", value: 27, display: "27°" },
          solution: [
            "Draw a North line at B. The bearing of A from B is the back bearing: 063° + 180° = 243°.",
            "C is due West of B, so the bearing of C from B is 270°.",
            "Both are measured from the same North line, so angle ABC = 270° − 243° = 27°.",
          ],
          solutions: [
            {
              label: "Parallel lines",
              steps: [
                "The North–South lines at A and B are parallel, so the angle between South at B and the line BA is 63° (alternate angles).",
                "West is 90° round from South, so angle ABC = 90° − 63° = 27°.",
              ],
            },
          ],
          traps: [
            { spec: { type: "number", value: 63 }, feedback: "63° is the angle between BA and the *South* line at B. C is due West — another 90° round." },
            { spec: { type: "number", value: 117 }, feedback: "117° = 180° − 63° isn't angle ABC. Find the bearing of A from B (243°), then compare it with West (270°)." },
          ],
          difficulty: "core",
          guideRef: "back-bearings",
          hints: ["Draw North lines at A and B. What is the bearing of A from B?", "What bearing is due West?", "Find the gap between the two bearings at B."],
          strategy: "Use parallel-line angle facts",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q10",
          question:
            "Marcus constructs triangle PQR with PQ = 6.5 cm, angle QPR = 30° and angle PQR = 75°. Without measuring, find the length of PR, in cm.",
          answer: { type: "number", value: 6.5, display: "6.5 cm" },
          solution: [
            "Angle PRQ = 180° − 30° − 75° = 75°.",
            "Angles Q and R are both 75°, so the triangle is isosceles.",
            "Equal angles face equal sides: PR is opposite angle Q, and PQ is opposite angle R.",
            "So PR = PQ = 6.5 cm.",
          ],
          commonError: "Pairing the wrong sides — the equal sides are the ones *opposite* the equal angles.",
          difficulty: "core",
          guideRef: "constructing-triangles",
          hints: [
            "Find the third angle first.",
            "Two equal angles means an isosceles triangle. Which two sides are equal?",
            "The side opposite angle Q is PR; the side opposite angle R is PQ.",
          ],
          strategy: "Use symmetry",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q11",
          question:
            "On a map, a scale bar 2.5 cm long is labelled 1 km. A lake is 7 cm long on this map. How long is the real lake? Give your answer in km.",
          answer: { type: "number", value: 2.8, display: "2.8 km" },
          solution: ["2.5 cm represents 1 km, so 1 cm represents 1 ÷ 2.5 = 0.4 km.", "7 cm represents 7 × 0.4 = 2.8 km."],
          solutions: [
            {
              label: "Count the scale bars",
              steps: ["How many 2.5 cm bars fit along 7 cm? 7 ÷ 2.5 = 2.8.", "Each bar is 1 km, so the lake is 2.8 km long. This is the quickest way."],
            },
          ],
          traps: [{ spec: { type: "number", value: 17.5 }, feedback: "17.5 = 7 × 2.5. It takes 2.5 cm of map to make 1 km, so divide the map length by 2.5." }],
          difficulty: "core",
          guideRef: "scale-drawings",
          hints: ["How many scale bars would fit along the lake?", "Divide 7 by 2.5."],
          strategy: "Use a bar model",
        },
        {
          kind: "written",
          id: "constructions-bearings-p2-q12",
          question:
            "Point X lies on the bisector of angle AOB, where OA = 2 cm and OB = 8 cm.\n\nSiti says: \"X is the same distance from A as from B.\"\n\nEthan says: \"X is the same distance from the line OA as from the line OB.\"\n\nWho is right? Explain, and name a point on the bisector that proves the other person wrong.",
          marks: 3,
          modelAnswer:
            "Ethan is right. Every point on an angle bisector is the same distance from the two **arms** — the lines OA and OB — with distances measured at right angles to the lines.\n\nSiti is describing a different locus: the points equidistant from the two *points* A and B form the perpendicular bisector of AB.\n\nCounterexample: the vertex O itself lies on the bisector, but it is 2 cm from A and 8 cm from B — not equal. (Siti's statement would only hold all along the bisector if OA = OB.)",
          markScheme: [
            { point: "Ethan is right: points on the angle bisector are equidistant from the two arms (lines)", keywords: ["ethan", "arms", "lines", "equidistant", "perpendicular distance"] },
            { point: "Siti is describing the perpendicular bisector of AB, a different locus", keywords: ["perpendicular bisector", "different"] },
            { point: "Counterexample: the vertex O is on the bisector but is 2 cm from A and 8 cm from B", keywords: ["vertex", "2 cm", "8 cm", "counterexample", "not equal"] },
          ],
          difficulty: "core",
          guideRef: "angle-bisector",
          hints: [
            "Does an angle bisector keep distances to two *points* equal, or distances to two *lines*?",
            "Which construction gives all the points equidistant from A and B?",
            "Find a point that is obviously on the bisector. How far is it from A, and from B?",
          ],
          strategy: "Consider extremes",
        },
        {
          kind: "written",
          id: "constructions-bearings-p2-q13",
          question:
            "The bearing of B from A is 070° and the bearing of C from A is 110°. Jun says: \"So the bearing of C from B is 110° − 70° = 040°.\"\n\nExplain why Jun's reasoning is wrong. You could test it with the case AB = AC.",
          marks: 3,
          modelAnswer:
            "110° − 70° = 40° is the **angle BAC** — the angle at A between the two directions. It is not a bearing from B. A bearing of C from B must be measured clockwise from a North line **at B**, and it depends on where B and C actually are (how far they are from A), not just on the angle at A.\n\nTest AB = AC: then B and C are mirror images in the East line through A (070° and 110° are each 20° from 090°), so C is directly below B. The bearing of C from B is 180°, nowhere near 040°.",
          markScheme: [
            { point: "40° is angle BAC, the angle at A between the two directions — not a bearing", keywords: ["angle bac", "angle at a", "between", "40"] },
            { point: "A bearing from B is measured clockwise from a North line at B, and depends on the distances", keywords: ["at b", "from b", "north line", "distance", "depends"] },
            { point: "Counterexample: with AB = AC, C is due South of B, so the bearing is 180°", keywords: ["180", "south", "due south", "isosceles"] },
          ],
          difficulty: "core",
          guideRef: "bearings",
          hints: [
            "What does 110° − 70° actually measure, and at which point?",
            "A bearing from B needs a North line at B. Did Jun use one?",
            "Try AB = AC. Where is C compared with B?",
          ],
          strategy: "Draw a diagram (North line first)",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q14",
          question:
            "A rectangular garden ABCD has AB = 10 m and AD = 6 m. A bench must be closer to corner A than to corner B, **and** closer to corner A than to corner D. What area of the garden is allowed for the bench? Give your answer in m².",
          answer: { type: "number", value: 15, display: "15 m²" },
          solution: [
            "Closer to A than to B: A's side of the perpendicular bisector of AB. That line is parallel to AD, 5 m from A.",
            "Closer to A than to D: A's side of the perpendicular bisector of AD. That line is parallel to AB, 3 m from A.",
            "Both together: a rectangle in the corner at A, 5 m by 3 m.",
            "Area = 5 × 3 = 15 m².",
          ],
          traps: [
            { spec: { type: "number", value: 30 }, feedback: "30 m² uses only one of the two conditions. The bench must obey both, so use both perpendicular bisectors." },
            { spec: { type: "number", value: 60 }, feedback: "60 m² is the whole garden. Only the region closer to A than to B and D is allowed." },
          ],
          difficulty: "core",
          guideRef: "loci",
          hints: [
            "Where are the points that are *equally* close to A and B?",
            "Each condition cuts the garden with a perpendicular bisector. Which side of each line is closer to A?",
            "The allowed region is a smaller rectangle in corner A. Find its sides.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q15",
          question: "An angle is x°. The reflex angle on the other side of its arms is 4 times as big. Find x.",
          answer: { type: "number", value: 72 },
          solution: [
            "The angle and its reflex partner make a full turn: x + 4x = 360.",
            "5x = 360, so x = 72.",
            "Check: the reflex angle is 4 × 72° = 288°, and 72° + 288° = 360°.",
          ],
          traps: [
            { spec: { type: "number", value: 36 }, feedback: "36 comes from x + 4x = 180. The angle and the reflex angle make a full turn, 360°." },
            { spec: { type: "number", value: 288 }, feedback: "288° is the reflex angle. The question asks for x." },
          ],
          difficulty: "core",
          guideRef: "measuring-angles",
          hints: ["What do an angle and its reflex angle add up to?", "Write an equation: x + 4x = …"],
          strategy: "Introduce a variable",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q16",
          question:
            "On a map with scale 1 : 50 000, a lighthouse L is 6 cm due North of a port P. A ship S is on a bearing of 045° from P, and it is due East of L. How far is the ship from the lighthouse in real life? Give your answer in km.",
          answer: { type: "number", value: 3, display: "3 km" },
          solution: [
            "L is due North of P and S is due East of L, so angle PLS = 90°.",
            "PL points North and PS is on 045°, so angle LPS = 45°.",
            "The third angle is 180° − 90° − 45° = 45°, so the triangle is isosceles: LS = LP = 6 cm on the map.",
            "Real distance: 6 × 50 000 = 300 000 cm = 3000 m = 3 km.",
          ],
          traps: [
            { spec: { type: "number", value: 6 }, feedback: "6 cm is the distance on the map. Use the scale to turn it into real kilometres." },
            { spec: { type: "number", value: 30 }, feedback: "Check the conversion: 300 000 cm = 3000 m = 3 km." },
          ],
          difficulty: "core",
          guideRef: "scale-drawings",
          hints: [
            "Sketch it: P at the bottom, L straight above it, S to the right of L. What is angle PLS?",
            "Find all three angles of triangle PLS. Is it a special triangle?",
            "Find LS on the map first, then use the scale.",
          ],
          strategy: "Draw a diagram",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q17",
          question:
            "Three long, straight roads cross each other to form a triangle. A mast must be placed so that it is the same distance from all three roads (the roads carry on forever in both directions). How many possible positions are there for the mast?",
          answer: { type: "number", value: 4 },
          solution: [
            "Points equidistant from two crossing lines lie on the bisectors of the angles between them — and two crossing lines make **two** bisector lines (at right angles to each other), one for each pair of opposite angles.",
            "Inside the triangle, the three angle bisectors meet at one point, the centre of a circle that touches all three roads from the inside.",
            "Outside, beyond each side of the triangle, the outer angle bisectors at two corners meet the inner bisector at the third corner. That is one more point beyond each side: 3 more points, each the centre of a circle touching all three roads.",
            "Total: 1 + 3 = 4 positions.",
          ],
          traps: [
            { spec: { type: "number", value: 1 }, feedback: "The point inside the triangle works — but the roads carry on forever, and there are three more points outside the triangle that are also equidistant from all three roads." },
          ],
          difficulty: "challenge",
          guideRef: "angle-bisector",
          hints: [
            "Start with just two of the roads. Which points are equidistant from two crossing lines?",
            "Two crossing lines make four angles, so there are two bisector lines, not one.",
            "Inside the triangle you get one point. Can a circle touch all three roads from *outside* the triangle?",
          ],
          strategy: "Split into cases",
        },
        {
          kind: "short",
          id: "constructions-bearings-p2-q18",
          question:
            "ABCDEF is a regular hexagon, with its corners labelled in order going **clockwise** round the shape. The bearing of B from A is 030°. Find the bearing of E from A. Give your answer as a three-figure bearing.",
          answer: { type: "number", value: 120, display: "120°" },
          solution: [
            "Walk round the hexagon clockwise: at each corner you turn through the exterior angle, 360° ÷ 6 = 60°. So the sides run on bearings AB 030°, BC 090°, CD 150°, DE 210°, EF 270° and FA 330°.",
            "The bearing of F from A is the back bearing of FA: 330° − 180° = 150°. (Check: the interior angle at A runs from 030° to 150°, which is 120°, as it should be.)",
            "Triangle AFE is isosceles (FA = FE) with angle AFE = 120°, so angle FAE = (180° − 120°) ÷ 2 = 30°.",
            "E is 30° anticlockwise from F as seen from A, so the bearing of E from A is 150° − 30° = 120°.",
          ],
          traps: [
            { spec: { type: "number", value: 150 }, feedback: "150° is the bearing of F from A. E is one corner further round — look at triangle AFE." },
            { spec: { type: "number", value: 210 }, feedback: "210° is the direction of the side DE, not the line from A to E." },
          ],
          difficulty: "challenge",
          guideRef: "bearings",
          hints: [
            "Walk round the hexagon. How much do you turn at each corner of a regular hexagon?",
            "What is the bearing of F from A? (Reverse the side FA.)",
            "Look at triangle AFE. What kind of triangle is it, and what is angle FAE?",
          ],
          strategy: "Draw a diagram with a North line at every point",
        },
        {
          kind: "written",
          id: "constructions-bearings-p2-q19",
          question:
            "A map has a scale of 1 : 25 000. Ravi enlarges it on a photocopier to 125% (every length is multiplied by 1.25). He says: \"The new scale is 1 : 25 000 × 1.25 = 1 : 31 250.\"\n\nExplain why Ravi is wrong, and find the correct scale of the copy.",
          marks: 3,
          modelAnswer:
            "On the original map, 1 cm stands for 25 000 cm. After enlarging, that same real distance is drawn 1.25 cm long, so 1.25 cm represents 25 000 cm. Then 1 cm represents 25 000 ÷ 1.25 = 20 000 cm, and the new scale is 1 : 20 000.\n\nRavi multiplied, but the copy shows everything *bigger*, so each centimetre of the copy stands for *less* real distance — the scale number must get smaller, not bigger. Check: 4 cm on the original is 100 000 cm = 1 km; on the copy that is 5 cm, and 5 × 20 000 = 100 000 cm = 1 km.",
          markScheme: [
            { point: "The copy is bigger, so each cm represents less real distance — the scale number must decrease", keywords: ["smaller", "less", "decrease", "bigger", "divide"] },
            { point: "1.25 cm on the copy represents 25 000 cm", keywords: ["1.25 cm", "1.25", "25 000"] },
            { point: "Correct scale 1 : 20 000", keywords: ["20 000", "20000", "1 : 20 000", "1:20000"] },
          ],
          commonError: "Multiplying the scale number by the enlargement factor instead of dividing.",
          difficulty: "challenge",
          guideRef: "scale-drawings",
          hints: [
            "After enlarging, does 1 cm on the copy stand for more or less real distance than before?",
            "A real distance of 25 000 cm used to be 1 cm on the map. How long is it on the copy?",
            "If 1.25 cm stands for 25 000 cm, what does 1 cm stand for?",
          ],
          strategy: "Spot the error",
        },
        {
          kind: "written",
          id: "constructions-bearings-p2-q20",
          question:
            "Triangle ABC has a right angle at C. M is the midpoint of the hypotenuse AB. Prove that M is the same distance from A, B and C — so the perpendicular bisectors of all three sides pass through M.",
          marks: 4,
          modelAnswer:
            "Complete the rectangle: add a point D so that ACBD is a rectangle (this works because angle C = 90°). Its diagonals are AB and CD.\n\nThe diagonals of a rectangle are equal in length and cut each other in half. So they cross at the midpoint of AB, which is M, and MA = MB = MC = MD (each is half of a diagonal).\n\nSo M is equidistant from A, B and C. Because MA = MB, M lies on the perpendicular bisector of AB; because MB = MC, it lies on the perpendicular bisector of BC; because MA = MC, it lies on the perpendicular bisector of AC. All three perpendicular bisectors pass through M — and the circle through A, B and C has AB as a diameter.",
          markScheme: [
            { point: "Completes the rectangle ACBD (or rotates the triangle 180° about M)", keywords: ["rectangle", "complete", "rotate", "acbd"] },
            { point: "Uses: the diagonals of a rectangle are equal and bisect each other", keywords: ["diagonals", "equal", "bisect"] },
            { point: "Concludes MA = MB = MC", keywords: ["ma = mb = mc", "ma = mc", "mc = ma", "same distance", "equidistant"] },
            { point: "Links to perpendicular bisectors: equidistant from two points means on their perpendicular bisector", keywords: ["perpendicular bisector", "equidistant", "all three"] },
          ],
          difficulty: "challenge",
          guideRef: "perpendicular-bisector",
          hints: [
            "Make a copy of the triangle, turn it through 180° about M, and fit it against the original. What shape do the two copies make?",
            "ACBD is a rectangle. What do you know about the diagonals of a rectangle?",
            "Once MA = MB = MC: which line contains every point equidistant from two given points?",
          ],
          strategy: "Use symmetry",
        },
      ],
    },
  ],

  // ===========================================================================
  // CHALLENGE SET (all challenge; 8 short + 2 written proofs)
  // ===========================================================================
  challenge: [
    {
      kind: "short",
      id: "constructions-bearings-ch-q01",
      question: "Between 12 noon and 12 midnight, how many times are the hour hand and the minute hand of a clock exactly at right angles?",
      answer: { type: "number", value: 22 },
      solution: [
        "The minute hand turns 6° per minute and the hour hand 0.5° per minute, so the minute hand gains 5.5° per minute on the hour hand.",
        "In 12 hours (720 minutes) it gains 720 × 5.5° = 3960° = 11 full laps of 360°. (That is also why the hands overlap only 11 times in 12 hours, not 12.)",
        "During each lap, the gap between the hands passes 90° once and 270° once — two right angles per lap.",
        "11 laps × 2 = 22 times.",
      ],
      solutions: [
        {
          label: "Hour by hour",
          steps: [
            "In most hours the hands are at right angles twice, which would suggest 12 × 2 = 24.",
            "But from 2:00 to 4:00 there are only 3 right angles (about 2:27, exactly 3:00, about 3:33), not 4. The same happens from 8:00 to 10:00 (about 8:27, exactly 9:00, about 9:33).",
            "So 24 − 2 = 22. The laps method is slicker: it never has to look at individual hours, and it explains *why* two are lost.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 24 }, feedback: "Twice an hour sounds right, but the minute hand only laps the hour hand 11 times in 12 hours. Around 3:00 and 9:00 two 'hourly' right angles merge into one." },
        { spec: { type: "number", value: 44 }, feedback: "44 is the count for a whole day. The question asks about 12 hours." },
      ],
      difficulty: "challenge",
      guideRef: "measuring-angles",
      hints: [
        "How many degrees per minute does each hand turn?",
        "How much faster is the minute hand? How many full laps does it gain on the hour hand in 12 hours?",
        "In each lap, how many times is the gap between the hands exactly 90° or 270°?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q02",
      question:
        "A triangle has sides of length (x + 2) cm, (2x − 1) cm and (10 − x) cm, where x is a whole number. For how many values of x can the triangle actually be constructed?",
      answer: { type: "number", value: 4 },
      solution: [
        "Every pair of sides must add to more than the third side. There are three pairs to check.",
        "(x + 2) + (2x − 1) > 10 − x gives 3x + 1 > 10 − x, so 4x > 9 and x > 2.25.",
        "(x + 2) + (10 − x) > 2x − 1 gives 12 > 2x − 1, so 2x < 13 and x < 6.5.",
        "(2x − 1) + (10 − x) > x + 2 gives x + 9 > x + 2, which is **always** true — this pair never causes trouble.",
        "So 2.25 < x < 6.5, which means x = 3, 4, 5 or 6 (all three sides are then positive too). That is **4** values.",
        "Check the ends: x = 3 gives 5, 5, 7 (fine); x = 6 gives 8, 11, 4 (8 + 4 = 12 > 11, fine); x = 2 gives 4, 3, 8 (4 + 3 < 8, impossible); x = 7 gives 9, 13, 3 (9 + 3 < 13, impossible).",
      ],
      solutions: [
        {
          label: "Test values, watching the extremes",
          steps: [
            "Make a table of the three sides for x = 1, 2, 3, … and test whether the two shorter sides beat the longest.",
            "x = 1: 3, 1, 9 — no. x = 2: 4, 3, 8 — no. x = 3: 5, 5, 7 — yes. x = 4: 6, 7, 6 — yes. x = 5: 7, 9, 5 — yes. x = 6: 8, 11, 4 — yes. x = 7: 9, 13, 3 — no. From x = 7 on, the 10 − x side keeps shrinking while 2x − 1 grows, so it only gets worse.",
            "So 4 values. The table is reassuring, but the algebra is slicker: it proves there are no others without testing every case.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 6 }, feedback: "Did you check only one pair of sides? Every pair must add to more than the third — x = 1 and x = 2 fail one of the conditions." },
        { spec: { type: "number", value: 7 }, feedback: "Did you check only one pair of sides? Every pair must add to more than the third — x = 7, 8 and 9 make the (2x − 1) side too long." },
      ],
      commonError: "Checking only one of the three triangle inequalities.",
      difficulty: "challenge",
      guideRef: "constructing-triangles",
      hints: [
        "Try x = 3. Then try x = 7. What goes wrong with the second?",
        "The triangle rule must hold for **every** pair of sides. Write down all three inequalities.",
        "Solve each inequality for x. One of them turns out to be true for every x.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q03",
      question:
        "Ravi rules AB = 12 cm and draws a long arm AX from A, making angle BAX = 30°. He sets his compasses to r cm, puts the point on B, and marks C where the arc crosses the arm AX. This gives a triangle ABC with AB = 12 cm, angle A = 30° and BC = r cm.\n\nFor how many **whole-number** values of r does this give **two different** triangles?",
      diagram: `<svg viewBox="0 0 440 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Segment AB, 12 centimetres, with a long arm AX drawn from A at 30 degrees above AB."><rect x="0" y="0" width="440" height="290" fill="#ffffff"/><line x1="40" y1="250" x2="340" y2="250" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="250" x2="403.7" y2="40" stroke="#1f2937" stroke-width="2"/><path d="M80 250 A40 40 0 0 0 74.6 230" fill="none" stroke="#334155" stroke-width="1.5"/><text x="86" y="242" font-size="12" font-family="sans-serif" fill="#334155">30°</text><circle cx="40" cy="250" r="3" fill="#1f2937"/><circle cx="340" cy="250" r="3" fill="#1f2937"/><text x="24" y="268" font-size="14" font-family="sans-serif" fill="#1f2937">A</text><text x="344" y="268" font-size="14" font-family="sans-serif" fill="#1f2937">B</text><text x="408" y="38" font-size="14" font-family="sans-serif" fill="#1f2937">X</text><text x="170" y="272" font-size="12" font-family="sans-serif" fill="#334155">12 cm</text></svg>`,
      answer: { type: "number", value: 5 },
      solution: [
        "Let N be the foot of the perpendicular from B to the arm AX. BN is the shortest distance from B to the arm.",
        "Reflect B in the line AX to get B′. Then AB′ = AB and angle BAB′ = 30° + 30° = 60°, so triangle ABB′ is equilateral with sides of 12 cm. N is the midpoint of BB′, so BN = 6 cm.",
        "If r < 6, the arc misses the arm: no triangle. If r = 6, it just touches at N: one (right-angled) triangle.",
        "If r is more than 6 but less than 12, the arc crosses the arm twice, once either side of N, and both crossings are beyond A: two triangles.",
        "If r = 12, one crossing is at A itself (no triangle there), so there is only one triangle. If r > 12, the second crossing is behind A, off the arm: one triangle.",
        "So there are two triangles exactly when r = 7, 8, 9, 10 or 11: **5** values.",
      ],
      traps: [
        { spec: { type: "number", value: 6 }, feedback: "Check the two end cases: at r = 6 the arc only touches the arm, and at r = 12 one crossing is at A itself. Only r = 7 to 11 give two triangles." },
      ],
      commonError: "Including r = 6 (the arc only touches) or r = 12 (one of the crossings is A itself).",
      difficulty: "challenge",
      guideRef: "constructing-triangles",
      hints: [
        "Imagine r growing from tiny to huge. When does the arc first reach the arm? When does it cross it twice?",
        "The critical length is the shortest distance from B to the arm. Drop a perpendicular from B to AX.",
        "Reflect B in the arm AX. What kind of triangle do A, B and its image make?",
        "Two triangles need two crossings, both on the arm beyond A. Check r = 12 carefully.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "constructions-bearings-ch-q04",
      question: "Prove that, in any triangle ABC, the perpendicular bisectors of the three sides all pass through **one** point.",
      marks: 4,
      modelAnswer:
        "Let the perpendicular bisectors of AB and BC meet at a point O. (They do meet: they are at right angles to AB and BC, which are not parallel, so the bisectors are not parallel either.)\n\nO is on the perpendicular bisector of AB, so O is equidistant from A and B: OA = OB.\n\nO is on the perpendicular bisector of BC, so OB = OC.\n\nPutting these together, OA = OC, so O is equidistant from A and C. Every point equidistant from A and C lies on the perpendicular bisector of AC — so that third bisector passes through O as well. All three meet at the single point O, which is the centre of the circle through A, B and C.",
      markScheme: [
        { point: "Lets two of the perpendicular bisectors meet at a point (they are not parallel)", keywords: ["meet", "intersect", "cross", "not parallel"] },
        { point: "Being on the bisector of AB gives OA = OB", keywords: ["oa = ob", "oa=ob", "equidistant from a and b"] },
        { point: "Being on the bisector of BC gives OB = OC, so OA = OC", keywords: ["ob = oc", "oa = oc", "oa=oc"] },
        { point: "Equidistant from A and C means O is on the perpendicular bisector of AC, so all three meet at O", keywords: ["perpendicular bisector of ac", "all three", "same point", "circle"] },
      ],
      commonError: "Drawing an accurate diagram and saying \"they meet\" — a drawing can suggest it, but only the equal-distance argument proves it for *every* triangle.",
      difficulty: "challenge",
      guideRef: "perpendicular-bisector",
      hints: [
        "Don't try to handle all three at once. Let just two of the bisectors meet at a point O.",
        "What does O being on the perpendicular bisector of AB tell you about OA and OB?",
        "You now have two equal-length facts. Combine them: which pair of corners is O also equidistant from?",
        "Every point equidistant from A and C lies on which line?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q05",
      question: "In triangle ABC, angle BAC = 64°. The bisectors of angles ABC and ACB meet at I. Find angle BIC, in degrees.",
      answer: { type: "number", value: 122, display: "122°" },
      solution: [
        "You can't find angles B and C separately — but you don't need to. B + C = 180° − 64° = 116°.",
        "The bisectors halve them: angle IBC + angle ICB = 116° ÷ 2 = 58°.",
        "In triangle BIC: angle BIC = 180° − 58° = 122°.",
      ],
      solutions: [
        {
          label: "Try a special case",
          steps: [
            "If the answer doesn't depend on B and C separately, pick an easy case: B = C = 58°.",
            "The halves are 29° and 29°, so angle BIC = 180° − 29° − 29° = 122°.",
            "Quick — but only safe once you're sure the answer is fixed, which the main method proves.",
          ],
        },
        {
          label: "The general formula",
          steps: [
            "In any triangle, angle BIC = 180° − {{1/2}}(B + C) = 180° − {{1/2}}(180° − A) = 90° + {{1/2}}A.",
            "With A = 64°: 90° + 32° = 122°. This is the slickest: one line for any triangle.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 58 }, feedback: "58° is the two half-angles at B and C added together. Angle BIC is what's left in triangle BIC." },
        { spec: { type: "number", value: 32 }, feedback: "32° is half of angle A — but here it's the angles at B and C that are bisected." },
      ],
      difficulty: "challenge",
      guideRef: "angle-bisector",
      hints: [
        "You can't find B and C separately. What CAN you find about B + C?",
        "B + C = 116°. What is half of each, added together?",
        "Now use the angles of triangle BIC.",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "written",
      id: "constructions-bearings-ch-q06",
      question:
        "Always, sometimes or never true? \"In any triangle ABC, the bisector of angle A passes through the midpoint of BC.\"\n\nJustify your answer. For full marks, say exactly which triangles it works for, and prove it.",
      marks: 4,
      modelAnswer:
        "**Sometimes true.**\n\nIt is true when AB = AC: the triangle is isosceles and symmetrical about the bisector of angle A, so that line hits BC at its midpoint.\n\nIt is false in general. Take an extreme case: AB = 1 cm, AC = 10 cm and angle A = 90°. The bisector leaves A at 45°, so it meets BC very close to B, nowhere near the midpoint (an accurate drawing shows this clearly).\n\nProof that it **only** works when AB = AC: suppose the bisector of angle A meets BC at its midpoint M. Extend AM beyond M to A′ so that MA′ = AM. Triangles AMC and A′MB are congruent (SAS: AM = A′M, CM = BM, and the angles at M are vertically opposite). So A′B = AC and angle MA′B = angle MAC. But angle MAC = angle MAB, because AM bisects angle A. So in triangle ABA′ the angles at A and A′ are equal, which makes it isosceles: AB = A′B = AC. So the bisector goes through the midpoint exactly when AB = AC.",
      markScheme: [
        { point: "Verdict: sometimes true", keywords: ["sometimes"] },
        { point: "True for isosceles triangles with AB = AC (by symmetry)", keywords: ["isosceles", "ab = ac", "symmetry", "symmetrical", "equilateral"] },
        { point: "A counterexample where it fails (e.g. AB much shorter than AC), justified by a drawing or reasoning", keywords: ["counterexample", "scalene", "not", "measure", "closer to b"] },
        { point: "Proof that it forces AB = AC (e.g. extend AM to A′ with congruent triangles, giving an isosceles triangle ABA′)", keywords: ["extend", "congruent", "only if", "only when", "parallelogram"] },
      ],
      commonError: "Checking an isosceles or equilateral example only and concluding \"always\".",
      difficulty: "challenge",
      guideRef: "angle-bisector",
      hints: [
        "Try an isosceles triangle with AB = AC. Then try a very lopsided one — AB tiny, AC huge. Where does the bisector land?",
        "So it's 'sometimes'. The hard part: suppose the bisector *does* hit the midpoint M. Extend AM past M to A′ with MA′ = AM.",
        "Compare triangles AMC and A′MB. Which congruence rule fits?",
        "The congruence gives A′B = AC and angle MA′B = angle MAC. Now look at the angles of triangle ABA′.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q07",
      question:
        "A drone flies round and round the edge of a regular polygon, turning **clockwise** by the same angle at every corner. Its 1st leg is on a bearing of 010° and its 5th leg is on a bearing of 130°. How many sides could the polygon have? Give every possible answer.",
      answer: { type: "list", values: [3, 12], display: "3 or 12 sides" },
      solution: [
        "From the 1st leg to the 5th there are 4 turns, each equal to the exterior angle e of the polygon (e = 360° ÷ the number of sides).",
        "The bearing increases by 4e — but bearings wrap round at 360°. So 4e could be 120°, or 120° + 360° = 480°, or 840°, …",
        "4e = 120° gives e = 30°, so 360 ÷ 30 = 12 sides. Legs: 010°, 040°, 070°, 100°, 130°.",
        "4e = 480° gives e = 120°, so 360 ÷ 120 = 3 sides (an equilateral triangle). Legs: 010°, 130°, 250°, 010°, 130° — the drone is on its second lap.",
        "4e = 840° gives e = 210°, which is impossible: a polygon's exterior angle is less than 180°. So the answers are 3 and 12.",
      ],
      commonError: "Stopping at 12 sides — a triangle also works, because the drone goes round more than once.",
      difficulty: "challenge",
      guideRef: "bearings",
      hints: [
        "How many turns happen between the 1st leg and the 5th leg?",
        "Each turn is the exterior angle, 360° ÷ n. So the total turn is 4 times that.",
        "The bearing went from 010° to 130° — but it might have gone right round past North on the way. Try a total turn of 120° + 360°.",
      ],
      strategy: "Split into cases",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q08",
      question:
        "A boat sails from harbour A on a bearing of 020° to a buoy B. It then sails the **same distance** again, on a bearing of 100°, to a buoy C. On what bearing must it sail to go straight back from C to A? Give your answer as a three-figure bearing.",
      answer: { type: "number", value: 240, display: "240°" },
      solution: [
        "At B, the bearing back to A is 020° + 180° = 200°, and the bearing on to C is 100°. So angle ABC = 200° − 100° = 100°.",
        "AB = BC, so triangle ABC is isosceles and its other two angles are (180° − 100°) ÷ 2 = 40° each.",
        "The boat turned clockwise at B, so from A, C is 40° clockwise from B: the bearing of C from A is 020° + 40° = 060°.",
        "Going back from C to A reverses that: 060° + 180° = 240°.",
      ],
      solutions: [
        {
          label: "Average the two directions",
          steps: [
            "Two equal legs make two sides of a rhombus, and the direct route A → C is its diagonal — which bisects the angle between the two directions.",
            "So A → C points exactly halfway between 020° and 100°: (20 + 100) ÷ 2 = 060°.",
            "Back bearing: 060° + 180° = 240°. This is slicker — no triangle angles needed — but it only works because the two legs are equal.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 60 }, feedback: "060° is the bearing of C from A. Going *back* from C to A is the reverse direction." },
        { spec: { type: "number", value: 280 }, feedback: "280° is the bearing from C back to B (100° + 180°). The question asks for the straight route back to A." },
      ],
      difficulty: "challenge",
      guideRef: "back-bearings",
      hints: [
        "Sketch it with a North line at A and at B. What is angle ABC?",
        "AB = BC. What kind of triangle is ABC, and what are its other two angles?",
        "Find the bearing of C from A, then reverse it.",
      ],
      strategy: "Draw a diagram with a North line at every point",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q09",
      question:
        "An island covers 45 cm² on a map with scale 1 : 20 000. What area does it cover on a map with scale 1 : 60 000? Give your answer in cm².",
      answer: { type: "number", value: 5, display: "5 cm²" },
      solution: [
        "Going from 1 : 20 000 to 1 : 60 000, every length is drawn 3 times smaller (60 000 ÷ 20 000 = 3).",
        "Area is length × length, so every area is 3 × 3 = 9 times smaller.",
        "45 ÷ 9 = 5 cm².",
      ],
      solutions: [
        {
          label: "Through the real area",
          steps: [
            "On the 1 : 20 000 map, 1 cm stands for 20 000 cm = 200 m, so 1 cm² stands for 200 m × 200 m = 40 000 m².",
            "Real area = 45 × 40 000 = 1 800 000 m².",
            "On the 1 : 60 000 map, 1 cm stands for 600 m, so 1 cm² stands for 600 m × 600 m = 360 000 m².",
            "1 800 000 ÷ 360 000 = 5 cm². The scale-factor method is slicker: no big numbers at all.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 15 }, feedback: "15 divides by 3, the length factor. An area depends on two lengths, so it shrinks by 3 × 3 = 9." },
        { spec: { type: "number", value: 135 }, feedback: "The 1 : 60 000 map has a bigger scale number, so it draws everything *smaller*, not bigger." },
      ],
      difficulty: "challenge",
      guideRef: "scale-drawings",
      hints: [
        "How many times smaller is every length on the second map?",
        "If every length is 3 times smaller, what happens to a 1 cm by 1 cm square?",
        "Areas scale by the square of the length factor.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "constructions-bearings-ch-q10",
      question: "Points A and B are 10 cm apart. How many points P are there such that triangle PAB is **isosceles** and has an **area of 20 cm²**?",
      answer: { type: "number", value: 10 },
      solution: [
        "Area 20 = {{1/2}} × 10 × height, so the height is 4 cm: P lies on one of two lines parallel to AB, 4 cm either side of it.",
        "Case PA = PB: P is on the perpendicular bisector of AB, which crosses each parallel line once → 2 points.",
        "Case AP = AB = 10 cm: P is on the circle of radius 10 cm centred at A. The parallel lines are only 4 cm from A's level, so the circle crosses each line twice → 4 points.",
        "Case BP = BA = 10 cm: the same with a circle centred at B → 4 points.",
        "No point is counted twice: the points on the bisector are only 5 cm across and 4 cm up from A — much less than 10 cm away — and the two circles cross each other far from the parallel lines. Total = 2 + 4 + 4 = 10.",
      ],
      solutions: [
        {
          label: "Count one side, then reflect",
          steps: [
            "Count only the points above AB, then double — reflecting in AB swaps the two sides.",
            "Above AB: 1 on the perpendicular bisector, 2 on the circle round A, 2 on the circle round B → 5.",
            "Double for below AB: 10. Using the symmetry halves the work.",
          ],
        },
      ],
      traps: [
        { spec: { type: "number", value: 2 }, feedback: "Those are only the points with PA = PB. The two equal sides could also be AP = AB, or BP = BA." },
        { spec: { type: "number", value: 5 }, feedback: "That's the count on one side of AB. Reflect in AB: every point has a mirror twin on the other side." },
      ],
      difficulty: "challenge",
      guideRef: "loci",
      hints: [
        "Deal with the area first: how far from the line AB must P be?",
        "So P lies on two lines parallel to AB. Now: which two sides of the triangle are equal? There are three cases.",
        "Case AP = AB: P lies on a circle of radius 10 cm centred at A. How many times does it cross each parallel line?",
        "Add up the cases, and check that no point has been counted twice.",
      ],
      strategy: "Split into cases",
    },
  ],
};
