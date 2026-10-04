import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "angles-polygons",
  title: "Angles, Parallel Lines & Polygons",
  strand: "Geometry & Measure",
  icon: "📐",
  summary: "A handful of angle facts, chained with reasons, unlocks any line, triangle or polygon.",
  intro:
    "You can find almost any angle in a diagram without a protractor, as long as you know a few facts and can chain them together with reasons. This chapter builds from straight lines and crossing lines to parallel lines, triangles, quadrilaterals and polygons with any number of sides. It finishes by proving why the facts are true, so you never have to take them on trust.",
  guide: [
    // -----------------------------------------------------------------------
    {
      id: "angle-facts",
      heading: "Angle facts",
      discovery: {
        problem:
          "Two straight lines cross, making four angles. One of them is 38°. Without a protractor, find the other three. Then ask yourself: would your method work whatever the first angle was?",
        idea:
          "Each neighbour of the 38° angle sits with it on a straight line, so it is 180° − 38° = 142°. The angle opposite the 38° sits on a straight line with a 142° angle, so it is 38° again. Two crossing lines always make two pairs of equal **vertically opposite** angles, and all four angles add to 360°.",
      },
      body:
        "An **angle** measures an amount of turn, in degrees (°). A full turn is 360°, so a half turn (a straight line) is 180° and a quarter turn is a **right angle**, 90°, marked with a small square.\n\n" +
        "| Type | Size |\n|---|---|\n| Acute | less than 90° |\n| Right | exactly 90° |\n| Obtuse | between 90° and 180° |\n| Straight | exactly 180° |\n| Reflex | between 180° and 360° |\n\n" +
        "Three facts do most of the work:\n\n" +
        "| Fact | Rule | Reason to write |\n|---|---|---|\n| Angles on a straight line | add to 180° | angles on a straight line add to 180° |\n| Angles around a point | add to 360° | angles around a point add to 360° |\n| Vertically opposite angles | are equal | vertically opposite angles are equal |\n\n" +
        "**Vertically opposite** angles are the pairs directly across from each other where two straight lines cross. They touch only at their tips, like the top and bottom of an X.\n\n" +
        "**Naming angles.** ∠ABC (say \"angle ABC\") means the angle at the *middle* letter B, between the arms BA and BC. Diagrams often use a single lower-case letter instead.\n\n" +
        "**Giving reasons.** \"Give reasons\" means that for every angle you find, you write the fact you used, in words. A number on its own earns only part of the marks. Never measure a diagram marked *not drawn to scale*.\n\n" +
        "> When an angle is given as an expression like {{2x + 15}}, the angle fact gives you an **equation** to solve.",
      diagram: `<svg viewBox="0 0 360 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two straight lines crossing at a point, making angles of 38 degrees, a, b and c"><rect width="360" height="220" fill="#ffffff"/><path d="M180 110 L210 110 A30 30 0 0 0 203.6 91.5 Z" fill="#fde68a"/><path d="M180 110 L150 110 A30 30 0 0 0 156.4 128.5 Z" fill="#fde68a"/><path d="M180 110 L197.3 96.5 A22 22 0 0 0 158 110 Z" fill="#c7d2fe"/><path d="M180 110 L162.7 123.5 A22 22 0 0 0 202 110 Z" fill="#c7d2fe"/><line x1="40" y1="110" x2="320" y2="110" stroke="#1f2937" stroke-width="2.5"/><line x1="69.7" y1="196.2" x2="290.3" y2="23.8" stroke="#1f2937" stroke-width="2.5"/><circle cx="180" cy="110" r="3" fill="#1f2937"/><text x="239" y="94" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">38°</text><text x="128" y="132" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">a</text><text x="167" y="76" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">b</text><text x="193" y="152" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">c</text></svg>`,
      diagramCaption:
        "Two straight lines crossing. a is vertically opposite 38°, so a = 38°. Angles b and c each sit on a straight line with 38°, so b = c = 142°.",
      workedExamples: [
        {
          title: "Angles on a straight line",
          problem: "Three angles, 52°, x and 73°, sit side by side on a straight line. Find x, giving a reason.",
          steps: [
            "Together the three angles make a straight line, so they add to 180°.",
            "x = 180° − 52° − 73°",
            "x = 55°  (angles on a straight line add to 180°)",
          ],
          answer: "x = 55°",
          yourTurn: {
            question: "Your turn: angles of 64°, 29° and y sit together on a straight line. Find y in degrees.",
            answer: { type: "number", value: 87, display: "87°" },
            solution: "Angles on a straight line add to 180°, so y = 180 − 64 − 29 = 87°.",
          },
        },
        {
          title: "Angles around a point (with algebra)",
          problem: "Four angles meet at a point: 3x, 2x, 4x and a right angle. Find x and the size of each angle.",
          steps: [
            "Angles around a point add to 360°, so 3x + 2x + 4x + 90 = 360.",
            "Collect like terms: 9x + 90 = 360.",
            "Subtract 90: 9x = 270, so x = 30.",
            "The angles are 3 × 30 = 90°, 2 × 30 = 60°, 4 × 30 = 120° and 90°.",
            "Check: 90 + 60 + 120 + 90 = 360 ✓",
          ],
          answer: "x = 30; the angles are 90°, 60°, 120° and 90°",
        },
        {
          title: "Vertically opposite angles (with algebra)",
          problem:
            "Two straight lines cross. A pair of vertically opposite angles are (3x + 10)° and (5x − 30)°. Find x and all four angles.",
          steps: [
            "Vertically opposite angles are equal: 3x + 10 = 5x − 30.",
            "Subtract 3x from both sides: 10 = 2x − 30.",
            "Add 30: 40 = 2x, so x = 20.",
            "Each of these angles is 3 × 20 + 10 = 70°. (Check: 5 × 20 − 30 = 70 ✓)",
            "The other two angles each sit on a straight line with a 70° angle, so each is 180° − 70° = 110° (angles on a straight line add to 180°).",
          ],
          answer: "x = 20; the four angles are 70°, 110°, 70° and 110°",
        },
      ],
      keyPoints: [
        "Straight line: angles add to 180°. Around a point: 360°. Vertically opposite angles are equal.",
        "Every angle you find needs a reason, written in words.",
        "If angles are given as expressions, the angle fact becomes an equation.",
        "Never measure a diagram marked \"not drawn to scale\".",
      ],
      whyItWorks:
        "Why are vertically opposite angles equal? Call the four angles round the crossing p, q, r and s, in order.\n\n" +
        "    p + q = 180°   (angles on a straight line)\n    q + r = 180°   (angles on a straight line)\n\n" +
        "Both p and r are \"180° minus q\", so p = r. The same argument using r + s = 180° shows q = s. No measuring needed: the straight lines force it.",
      strategies: ["Introduce a variable", "Write the reason as you go", "Check by substituting"],
      thinkDeeper:
        "Five straight lines all pass through the same point, making ten angles around it. What do the ten angles add up to? Explain why at least one of them must be 36° or less. Could all ten be exactly 36°?",
    },
    // -----------------------------------------------------------------------
    {
      id: "parallel-lines",
      heading: "Angles in parallel lines",
      discovery: {
        problem:
          "A straight road crosses two parallel railway tracks, making eight angles: four at each track. At the first track, one of the angles is 115°. How many *different* sizes of angle are there among all eight? Find them without measuring.",
        idea:
          "Only two sizes: 115° and 65°. Because the tracks are parallel, the road crosses both at exactly the same angle. Slide the first crossing along the road and it lands perfectly on the second, so the four angles at one track copy the four at the other. Straight lines and vertically opposite angles do the rest.",
      },
      body:
        "**Parallel** lines point in exactly the same direction, so they never meet. Diagrams mark them with matching arrows. A **transversal** is a line that crosses two or more other lines.\n\n" +
        "When a transversal crosses two parallel lines, three special pairs of angles appear:\n\n" +
        "| Pair | Where they sit | Rule | Letter shape |\n|---|---|---|---|\n| Corresponding | in the same position at each crossing | equal | F |\n| Alternate | between the parallels, on opposite sides of the transversal | equal | Z |\n| Co-interior (allied) | between the parallels, on the same side of the transversal | add to 180° | C or U |\n\n" +
        "The letter shapes help you *spot* a pair, and they may be stretched, flipped or back to front. In a written reason, though, use the proper name: \"alternate angles are equal\", never \"Z angles\".\n\n" +
        "**Only for parallel lines.** If the lines are not parallel, these pairs are not equal, so check for the arrows. The facts also work backwards: if a pair of alternate (or corresponding) angles are equal, the lines *must* be parallel.\n\n" +
        "**Angle chains.** Harder problems need several steps. Find one new angle at a time, write its value on your sketch, and state the fact you used each time. You will often combine a parallel-line fact with a straight line, a point or a triangle. If no fact links the angles you have, try adding a **construction line**, such as an extra parallel line.",
      diagram: `<svg viewBox="0 0 480 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three diagrams of a transversal crossing two parallel lines at 65 degrees, highlighting corresponding, alternate and co-interior angles"><rect width="480" height="200" fill="#ffffff"/><path d="M142.3 60 L107.3 60 L64.2 152.5 M70 140 L105 140" fill="none" stroke="#2563eb" stroke-width="5" stroke-opacity="0.35"/><path d="M107.3 60 L125.3 60 A18 18 0 0 0 114.9 43.7 Z" fill="#fde68a"/><path d="M70 140 L88 140 A18 18 0 0 0 77.6 123.7 Z" fill="#fde68a"/><line x1="10" y1="60" x2="150" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="10" y1="140" x2="150" y2="140" stroke="#1f2937" stroke-width="2"/><path d="M27 56 L33 60 L27 64 M27 136 L33 140 L27 144" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="58.3" y1="165" x2="121.3" y2="30" stroke="#1f2937" stroke-width="2"/><text x="134" y="47" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">65°</text><text x="97" y="127" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">65°</text><text x="80" y="192" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Corresponding: equal</text><path d="M232.3 60 L267.3 60 L230 140 L265 140" fill="none" stroke="#2563eb" stroke-width="5" stroke-opacity="0.35"/><path d="M267.3 60 L249.3 60 A18 18 0 0 0 259.7 76.3 Z" fill="#fde68a"/><path d="M230 140 L248 140 A18 18 0 0 0 237.6 123.7 Z" fill="#fde68a"/><line x1="170" y1="60" x2="310" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="170" y1="140" x2="310" y2="140" stroke="#1f2937" stroke-width="2"/><path d="M187 56 L193 60 L187 64 M187 136 L193 140 L187 144" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="218.3" y1="165" x2="281.3" y2="30" stroke="#1f2937" stroke-width="2"/><text x="240" y="81" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">65°</text><text x="257" y="127" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">65°</text><text x="240" y="192" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Alternate: equal</text><path d="M462.3 60 L427.3 60 L390 140 L425 140" fill="none" stroke="#2563eb" stroke-width="5" stroke-opacity="0.35"/><path d="M427.3 60 L419.7 76.3 A18 18 0 0 0 445.3 60 Z" fill="#bbf7d0"/><path d="M390 140 L408 140 A18 18 0 0 0 397.6 123.7 Z" fill="#fde68a"/><line x1="330" y1="60" x2="470" y2="60" stroke="#1f2937" stroke-width="2"/><line x1="330" y1="140" x2="470" y2="140" stroke="#1f2937" stroke-width="2"/><path d="M347 56 L353 60 L347 64 M347 136 L353 140 L347 144" fill="none" stroke="#1f2937" stroke-width="1.5"/><line x1="378.3" y1="165" x2="441.3" y2="30" stroke="#1f2937" stroke-width="2"/><text x="446" y="93" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">115°</text><text x="417" y="127" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">65°</text><text x="400" y="192" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Co-interior: sum 180°</text></svg>`,
      diagramCaption:
        "The transversal meets both parallel lines at 65°. Corresponding angles (F) and alternate angles (Z) are equal; co-interior angles (C) add to 180°, here 115° + 65°.",
      workedExamples: [
        {
          title: "Co-interior angles",
          problem: "A transversal crosses two parallel lines. An angle of 128° and angle p are co-interior. Find p, giving a reason.",
          steps: [
            "Co-interior angles sit between the parallel lines, on the same side of the transversal.",
            "They add to 180°, so p = 180° − 128°.",
            "p = 52°  (co-interior angles add to 180°)",
          ],
          answer: "p = 52°",
          yourTurn: {
            question: "Your turn: angle q and an angle of 47° are co-interior angles between two parallel lines. Find q in degrees.",
            answer: { type: "number", value: 133, display: "133°" },
            solution: "Co-interior angles add to 180°, so q = 180 − 47 = 133°.",
          },
        },
        {
          title: "Corresponding angles with algebra",
          problem:
            "Two parallel lines are cut by a transversal. A pair of corresponding angles are (3x + 15)° and (5x − 25)°. Find x and the size of the angles.",
          steps: [
            "Corresponding angles are equal: 3x + 15 = 5x − 25.",
            "Subtract 3x from both sides: 15 = 2x − 25.",
            "Add 25: 40 = 2x, so x = 20.",
            "Angle = 3 × 20 + 15 = 75°. Check: 5 × 20 − 25 = 75 ✓",
          ],
          answer: "x = 20; each angle is 75°",
        },
        {
          title: "A chain with a construction line",
          problem:
            "Two parallel lines run left to right. B is on the top line and D is on the bottom line. Point E lies between the lines, to the right of B and D, and is joined to both. The angle between BE and the top line (on the right of B) is 40°. The angle between DE and the bottom line (on the right of D) is 35°. Find ∠BED.",
          steps: [
            "Sketch it: BE and DE make an arrowhead pointing right, with its tip at E.",
            "No single fact links B and D, so add a **construction line**: through E, draw a third line parallel to the other two.",
            "The angle between EB and the new line (on the left of E) is alternate to the 40° angle, so it is 40° (alternate angles are equal).",
            "In the same way, the angle between ED and the new line is alternate to the 35° angle, so it is 35°.",
            "∠BED is made of these two parts: 40° + 35° = 75°.",
          ],
          answer: "∠BED = 75°",
        },
      ],
      keyPoints: [
        "Corresponding angles are equal (F shape).",
        "Alternate angles are equal (Z shape).",
        "Co-interior angles add to 180° (C shape).",
        "These facts need parallel lines, and in reasons you use the names, not the letters.",
      ],
      whyItWorks:
        "Start with the one fact that *is* what parallel means: the transversal crosses both lines at the same angle, so **corresponding angles are equal**. Call them a.\n\n" +
        "- The alternate angle is vertically opposite the corresponding angle at its own crossing, so it equals a too.\n" +
        "- The co-interior partner sits on a straight line with that same angle a, so it equals 180° − a.\n\n" +
        "So one idea about parallel lines, plus the facts from the last section, gives all three rules.",
      strategies: ["Spot the F, Z or C shape", "Add a construction line", "Find one angle at a time"],
      thinkDeeper:
        "A transversal crosses two lines that are *nearly* parallel, making co-interior angles of 89° and 92° on the same side. Are the lines parallel? If you extend them far enough, do they meet, and on which side of the transversal? Explain using the angle sum of a triangle.",
    },
    // -----------------------------------------------------------------------
    {
      id: "triangles",
      heading: "Angles in triangles",
      discovery: {
        problem:
          "Draw any triangle. Through its top corner, draw a line parallel to the bottom side. Look for pairs of alternate angles. Can you explain why the three angles add to 180° for *every* triangle, not just the one you drew?",
        idea:
          "The two bottom angles reappear at the top corner as alternate angles. Together with the top angle they fill a straight line, so a + b + c = 180°. The argument never used any particular sizes, so it works for every triangle.",
      },
      body:
        "**The angle sum.** The three interior angles of any triangle add to **180°**. To find a missing angle, subtract the known angles from 180°.\n\n" +
        "**Special triangles.** Small tick marks on sides show which sides are equal.\n\n" +
        "| Triangle | Sides | Angles |\n|---|---|---|\n| Equilateral | all 3 equal | all 60° |\n| Isosceles | 2 equal | the 2 **base angles** (opposite the equal sides) are equal |\n| Scalene | all different | all different |\n| Right-angled | any | one angle is 90°, so the other two add to 90° |\n\n" +
        "In an isosceles triangle, the angle between the two equal sides is the **apex** angle.\n\n" +
        "- Apex known: each base angle = (180° − apex) ÷ 2.\n" +
        "- Base angle known: apex = 180° − 2 × base angle.\n\n" +
        "**The exterior angle.** Extend one side of a triangle past a corner. The angle between the extension and the next side is an **exterior angle**. The two interior angles *not* next to it are the **interior opposite angles**.\n\n" +
        "> The exterior angle of a triangle equals the sum of the two interior opposite angles.\n\n" +
        "This is a shortcut: you can find an exterior angle in one step, without working out the third interior angle first.",
      diagram: `<svg viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A triangle with angles a, b and c. A line through the top corner is parallel to the base, and copies of a and b appear there as alternate angles beside c"><rect width="400" height="240" fill="#ffffff"/><path d="M60 200 L80 200 A20 20 0 0 0 74.1 185.9 Z" fill="#c7d2fe"/><path d="M300 200 L288.4 183.7 A20 20 0 0 0 280 200 Z" fill="#fde68a"/><path d="M200 60 L181.6 78.4 A26 26 0 0 0 215.1 81.2 Z" fill="#bbf7d0"/><path d="M200 60 L174 60 A26 26 0 0 0 181.6 78.4 Z" fill="#c7d2fe"/><path d="M200 60 L215.1 81.2 A26 26 0 0 0 226 60 Z" fill="#fde68a"/><polygon points="60,200 300,200 200,60" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="30" y1="60" x2="370" y2="60" stroke="#334155" stroke-width="2" stroke-dasharray="6 4"/><path d="M177 196 L183 200 L177 204 M327 56 L333 60 L327 64" fill="none" stroke="#1f2937" stroke-width="1.5"/><text x="86" y="193" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">a</text><text x="275" y="191" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">b</text><text x="197" y="104" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">c</text><text x="166" y="77" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">a</text><text x="233" y="80" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">b</text><text x="200" y="230" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">a + b + c = 180°</text></svg>`,
      diagramCaption:
        "The dashed line through the top corner is parallel to the base, so the base angles a and b reappear there as alternate angles. Together with c they make a straight line: 180°.",
      workedExamples: [
        {
          title: "Isosceles triangle",
          problem: "An isosceles triangle has an apex angle of 40°. Find each base angle.",
          steps: [
            "The angles add to 180°, so the two base angles share 180° − 40° = 140°.",
            "The base angles are equal: 140° ÷ 2 = 70°.",
            "Check: 40 + 70 + 70 = 180 ✓",
          ],
          answer: "Each base angle is 70°",
          yourTurn: {
            question: "Your turn: an isosceles triangle has an apex angle of 52°. Find the size of one base angle in degrees.",
            answer: { type: "number", value: 64, display: "64°" },
            solution: "(180 − 52) ÷ 2 = 128 ÷ 2 = 64°.",
          },
        },
        {
          title: "Exterior angle",
          problem:
            "An exterior angle of a triangle is 117°. The two interior opposite angles are x and 2x. Find x and all three interior angles.",
          steps: [
            "Exterior angle = sum of the interior opposite angles: x + 2x = 117.",
            "3x = 117, so x = 39.",
            "The interior opposite angles are 39° and 78°.",
            "The third interior angle sits on a straight line with the exterior angle: 180° − 117° = 63°.",
            "Check: 39 + 78 + 63 = 180 ✓",
          ],
          answer: "x = 39; the angles are 39°, 78° and 63°",
        },
        {
          title: "Two possible answers",
          problem: "One angle of an isosceles triangle is 50°. Find the other two angles. (There is more than one answer.)",
          steps: [
            "The question doesn't say *which* angle is 50°, so **split into cases**.",
            "Case 1: 50° is a base angle. The other base angle is also 50°, and the apex is 180° − 50° − 50° = 80°.",
            "Case 2: 50° is the apex. The base angles are (180° − 50°) ÷ 2 = 65° each.",
            "Both triangles can be drawn, so both answers are valid.",
          ],
          answer: "Either 50° and 80°, or 65° and 65°",
        },
      ],
      keyPoints: [
        "The angles in a triangle add to 180°.",
        "Isosceles: the two base angles (opposite the equal sides) are equal. Equilateral: every angle is 60°.",
        "Exterior angle = sum of the two interior opposite angles.",
        "If it isn't clear which angle you have been given, consider every case.",
      ],
      whyItWorks:
        "**Angle sum.** In the diagram, the dashed line through the top corner is parallel to the base. The top-left angle is alternate to a, and the top-right angle is alternate to b. At the top corner, a, c and b sit together on a straight line, so a + b + c = 180°.\n\n" +
        "**Exterior angle.** Now call a triangle's angles a, b and c, extend a side at the corner with angle c, and call the exterior angle there d.\n\n" +
        "    c + d = 180°        (angles on a straight line)\n    a + b + c = 180°    (angles in a triangle)\n\n" +
        "Both d and a + b equal 180° − c, so d = a + b.",
      strategies: ["Add a construction line", "Split into cases", "Check by substituting"],
      thinkDeeper:
        "Can a triangle have two obtuse angles? Two right angles? What is the *largest* that the smallest angle of a triangle can be, and which triangle achieves it? Use the angle sum to explain each answer.",
    },
    // -----------------------------------------------------------------------
    {
      id: "quadrilaterals",
      heading: "Quadrilaterals",
      discovery: {
        problem:
          "True or false? (1) Every square is a rectangle. (2) Every rectangle is a square. (3) Every rhombus is a parallelogram. (4) A kite can have four equal sides. Decide using only what each name *guarantees*.",
        idea:
          "A shape's name is a list of guaranteed properties. A rectangle guarantees four right angles with opposite sides equal and parallel. A square has all of that, so (1) is true; but a rectangle need not have four equal sides, so (2) is false. (3) is true: a rhombus has both pairs of opposite sides parallel. (4) is true: a rhombus is a kite whose two pairs of equal sides happen to match. The special quadrilaterals form a **family tree**.",
      },
      body:
        "A **quadrilateral** is any shape with four straight sides. Its four interior angles always add to **360°**.\n\n" +
        "The special quadrilaterals are defined by their sides and angles, but their **diagonals** (lines joining opposite corners) are just as useful for telling them apart. Two diagonals **bisect** each other when each cuts the other exactly in half.\n\n" +
        "| Shape | Sides | Angles | Diagonals |\n|---|---|---|---|\n" +
        "| Square | 4 equal; 2 pairs parallel | all 90° | equal; bisect each other at 90° |\n" +
        "| Rectangle | opposite sides equal and parallel | all 90° | equal; bisect each other |\n" +
        "| Rhombus | 4 equal; 2 pairs parallel | opposite angles equal | bisect each other at 90° |\n" +
        "| Parallelogram | opposite sides equal and parallel | opposite angles equal | bisect each other |\n" +
        "| Kite | 2 pairs of equal adjacent sides | 1 pair of opposite angles equal | cross at 90°; one bisects the other |\n" +
        "| Trapezium | 1 pair of parallel sides | the two angles along each non-parallel side add to 180° | equal only in an isosceles trapezium |\n\n" +
        "In a parallelogram (and so in a rectangle, rhombus and square), **neighbouring angles add to 180°**: they are co-interior angles between parallel sides.\n\n" +
        "**The hierarchy.** A more special shape inherits every property of the families above it. A square is a rectangle *and* a rhombus; a rhombus is a parallelogram *and* a kite.\n\n" +
        "> Definitions vary for the trapezium. Most UK books say *exactly one* pair of parallel sides; some say *at least one*, which would make every parallelogram a trapezium too.",
      diagram: `<svg viewBox="0 0 460 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Family tree of quadrilaterals. Quadrilateral at the top; trapezium, parallelogram and kite below it; isosceles trapezium under trapezium; rectangle and rhombus under parallelogram; rhombus also under kite; square under both rectangle and rhombus"><rect width="460" height="250" fill="#ffffff"/><g stroke="#334155" stroke-width="1.5"><line x1="230" y1="39" x2="70" y2="76"/><line x1="230" y1="39" x2="230" y2="76"/><line x1="230" y1="39" x2="390" y2="76"/><line x1="70" y1="104" x2="70" y2="146"/><line x1="230" y1="104" x2="190" y2="146"/><line x1="230" y1="104" x2="300" y2="146"/><line x1="390" y1="104" x2="300" y2="146"/><line x1="190" y1="174" x2="245" y2="211"/><line x1="300" y1="174" x2="245" y2="211"/></g><g stroke="#334155" stroke-width="1.5"><rect x="170" y="11" width="120" height="28" rx="6" fill="#e2e8f0"/><rect x="20" y="76" width="100" height="28" rx="6" fill="#bae6fd"/><rect x="175" y="76" width="110" height="28" rx="6" fill="#bae6fd"/><rect x="345" y="76" width="90" height="28" rx="6" fill="#bae6fd"/><rect x="10" y="146" width="120" height="28" rx="6" fill="#c7d2fe"/><rect x="142" y="146" width="96" height="28" rx="6" fill="#c7d2fe"/><rect x="252" y="146" width="96" height="28" rx="6" fill="#c7d2fe"/><rect x="200" y="211" width="90" height="28" rx="6" fill="#fde68a"/></g><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="230" y="30">Quadrilateral</text><text x="70" y="95">Trapezium</text><text x="230" y="95">Parallelogram</text><text x="390" y="95">Kite</text><text x="70" y="164" font-size="11">Isosceles trapezium</text><text x="190" y="165">Rectangle</text><text x="300" y="165">Rhombus</text><text x="245" y="230">Square</text></g></svg>`,
      diagramCaption:
        "Each line joins a shape to a more general family above it. Follow the lines up: a square is a rectangle, a rhombus, a parallelogram and a kite, and every one of them is a quadrilateral.",
      workedExamples: [
        {
          title: "Missing angle in a quadrilateral",
          problem: "A quadrilateral has angles of 85°, 110° and 72°. Find the fourth angle.",
          steps: [
            "Angles in a quadrilateral add to 360°.",
            "85 + 110 + 72 = 267",
            "Fourth angle = 360° − 267° = 93°.",
          ],
          answer: "93°",
          yourTurn: {
            question: "Your turn: a quadrilateral has angles of 95°, 64° and 128°. Find the fourth angle in degrees.",
            answer: { type: "number", value: 73, display: "73°" },
            solution: "95 + 64 + 128 = 287, and 360 − 287 = 73°.",
          },
        },
        {
          title: "Angles in a kite (with algebra)",
          problem:
            "A kite has angles of 2x, 3x, 3x and 80°, where the two 3x angles are its pair of equal angles. Find x and the four angles.",
          steps: [
            "Angles in a quadrilateral add to 360°: 2x + 3x + 3x + 80 = 360.",
            "8x + 80 = 360, so 8x = 280 and x = 35.",
            "The angles are 2 × 35 = 70°, 3 × 35 = 105°, 105° and 80°.",
            "Check: 70 + 105 + 105 + 80 = 360 ✓",
          ],
          answer: "x = 35; the angles are 70°, 105°, 105° and 80°",
        },
        {
          title: "Name that quadrilateral",
          problem:
            "A quadrilateral's diagonals bisect each other at right angles, but they are **not** equal in length. What is the most specific name for the shape?",
          steps: [
            "Diagonals that bisect each other: the shape is in the parallelogram family.",
            "Diagonals crossing at 90°: in that family, only the rhombus and the square do this.",
            "Diagonals not equal: a square's diagonals are equal, so it is not a square.",
            "Only one option is left.",
          ],
          answer: "A rhombus",
        },
      ],
      keyPoints: [
        "The angles in any quadrilateral add to 360°.",
        "Parallelogram family: opposite angles are equal and neighbouring angles add to 180°.",
        "Diagonals identify shapes: equal (rectangle, square); at 90° (rhombus, square, kite); bisecting each other (the parallelogram family).",
        "A square is a special rectangle and a special rhombus, so it has all their properties.",
      ],
      whyItWorks:
        "Draw one diagonal of a quadrilateral. It splits the shape into two triangles, and the angles of the two triangles exactly make up the four corners. So the total is 2 × 180° = 360°.\n\n" +
        "In a parallelogram, each pair of neighbouring angles are co-interior angles between parallel sides, so they add to 180°. If one angle is p, its neighbours are 180° − p, and the angle opposite is 180° − (180° − p) = p. That is why opposite angles are equal.",
      strategies: ["Eliminate options", "Draw a diagram", "Introduce a variable"],
      thinkDeeper:
        "A quadrilateral has three right angles. Must it be a rectangle? Another quadrilateral has two pairs of equal opposite angles. Must it be a parallelogram? Justify each answer. Then check that the 360° rule still works for an arrowhead, a quadrilateral with one reflex angle.",
    },
    // -----------------------------------------------------------------------
    {
      id: "polygon-angles",
      heading: "Angles in polygons",
      discovery: {
        problem:
          "A robot drives around a path shaped like a regular pentagon. At each corner it turns left by the same amount. After five turns it is facing exactly the way it started. How big is each turn? What does that tell you about the angle *inside* each corner?",
        idea:
          "Facing the same way again means the robot has turned through one full turn, 360°. So each turn, the **exterior angle**, is 360° ÷ 5 = 72°. Each turn and the inside angle sit on a straight line, so the **interior angle** is 180° − 72° = 108°.",
      },
      body:
        "A **polygon** is a closed shape with straight sides. A **regular** polygon has all its sides equal *and* all its angles equal.\n\n" +
        "At each corner there are two angles to know:\n\n" +
        "- the **interior angle**, inside the shape;\n" +
        "- the **exterior angle**, between one side and the next side extended. It is the turn you make walking round the shape.\n\n" +
        "They sit on a straight line, so **interior + exterior = 180°**.\n\n" +
        "**Two big facts** for a polygon with n sides:\n\n" +
        "    sum of exterior angles = 360°\n    sum of interior angles = {{(n - 2) * 180°}}\n\n" +
        "For a **regular** polygon every angle is the same, so share the sum equally:\n\n" +
        "    each exterior angle = {{(360°)/n}}\n    each interior angle = 180° − exterior angle\n\n" +
        "| Polygon | n | Interior sum | Regular: exterior | Regular: interior |\n|---|---|---|---|---|\n" +
        "| Triangle | 3 | 180° | 120° | 60° |\n| Quadrilateral | 4 | 360° | 90° | 90° |\n| Pentagon | 5 | 540° | 72° | 108° |\n| Hexagon | 6 | 720° | 60° | 120° |\n| Heptagon | 7 | 900° | about 51.4° | about 128.6° |\n| Octagon | 8 | 1080° | 45° | 135° |\n| Nonagon | 9 | 1260° | 40° | 140° |\n| Decagon | 10 | 1440° | 36° | 144° |\n| Dodecagon | 12 | 1800° | 30° | 150° |\n\n" +
        "**Finding n.** Work backwards through the exterior angle. If each interior angle of a regular polygon is 150°, each exterior angle is 30°, so n = 360 ÷ 30 = 12. If 360 ÷ exterior angle is not a whole number, no such regular polygon exists.\n\n" +
        "**Irregular polygons** still have interior angles adding to {{(n - 2) * 180°}}, but the angles are not equal, so you cannot just divide by n.",
      diagram: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a regular hexagon split from one corner into four triangles. Right: a regular pentagon with its sides extended, showing five exterior angles of 72 degrees"><rect width="480" height="240" fill="#ffffff"/><polygon points="20,120 65,42.1 155,42.1" fill="#c7d2fe"/><polygon points="20,120 155,42.1 200,120" fill="#fde68a"/><polygon points="20,120 200,120 155,197.9" fill="#bbf7d0"/><polygon points="20,120 155,197.9 65,197.9" fill="#fecaca"/><polygon points="200,120 155,42.1 65,42.1 20,120 65,197.9 155,197.9" fill="none" stroke="#1f2937" stroke-width="2"/><g stroke="#334155" stroke-width="1.5"><line x1="20" y1="120" x2="155" y2="42.1"/><line x1="20" y1="120" x2="200" y2="120"/><line x1="20" y1="120" x2="155" y2="197.9"/></g><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="80" y="72">1</text><text x="125" y="98">2</text><text x="125" y="150">3</text><text x="80" y="176">4</text><text x="110" y="228" font-size="12">4 triangles: 4 × 180° = 720°</text></g><polygon points="340,50 273.4,98.4 298.9,176.6 381.1,176.6 406.6,98.4" fill="#f8fafc" stroke="#1f2937" stroke-width="2"/><g stroke="#334155" stroke-width="1.5" stroke-dasharray="5 3"><line x1="273.4" y1="98.4" x2="245.1" y2="119"/><line x1="298.9" y1="176.6" x2="309.7" y2="209.9"/><line x1="381.1" y1="176.6" x2="416.1" y2="176.6"/><line x1="406.6" y1="98.4" x2="417.4" y2="65.1"/><line x1="340" y1="50" x2="311.7" y2="29.4"/></g><g fill="#fde68a" stroke="#b45309" stroke-width="0.8"><path d="M273.4 98.4 L258.8 109 A18 18 0 0 0 279 115.5 Z"/><path d="M298.9 176.6 L304.5 193.7 A18 18 0 0 0 316.9 176.6 Z"/><path d="M381.1 176.6 L399.1 176.6 A18 18 0 0 0 386.7 159.5 Z"/><path d="M406.6 98.4 L412.2 81.3 A18 18 0 0 0 392 87.8 Z"/><path d="M340 50 L325.4 39.4 A18 18 0 0 0 325.4 60.6 Z"/></g><g font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="262" y="138">72°</text><text x="330" y="203">72°</text><text x="412" y="158">72°</text><text x="395" y="66">72°</text><text x="302" y="54">72°</text><text x="340" y="232" font-size="12">5 turns × 72° = 360°</text></g></svg>`,
      diagramCaption:
        "Left: from one corner, a hexagon splits into 6 − 2 = 4 triangles, so its interior angles add to 720°. Right: walking round a regular pentagon you turn through the exterior angle, 72°, at each corner, and five turns make one full turn.",
      workedExamples: [
        {
          title: "Interior angle sum",
          problem: "Find the sum of the interior angles of a decagon (10 sides).",
          steps: [
            "From one corner, a decagon splits into 10 − 2 = 8 triangles.",
            "Sum = 8 × 180° = 1440°.",
          ],
          answer: "1440°",
          yourTurn: {
            question: "Your turn: find the sum of the interior angles of a 15-sided polygon, in degrees.",
            answer: { type: "number", value: 2340, display: "2340°" },
            solution: "(15 − 2) × 180 = 13 × 180 = 2340°.",
          },
        },
        {
          title: "Finding n from an interior angle",
          problem: "Each interior angle of a regular polygon is 160°. How many sides does it have?",
          steps: [
            "Find the exterior angle first: 180° − 160° = 20°.",
            "The exterior angles add to 360°, so n = 360 ÷ 20 = 18.",
            "Check: (18 − 2) × 180 = 2880, and 2880 ÷ 18 = 160 ✓",
          ],
          answer: "18 sides",
        },
        {
          title: "An irregular hexagon (with algebra)",
          problem: "A hexagon has interior angles of x, x, 2x, 2x, 130° and 110°. Find x.",
          steps: [
            "A hexagon's interior angles add to (6 − 2) × 180° = 720°.",
            "x + x + 2x + 2x + 130 + 110 = 720, so 6x + 240 = 720.",
            "6x = 480, so x = 80.",
            "The angles are 80°, 80°, 160°, 160°, 130° and 110°. Check: they add to 720 ✓",
          ],
          answer: "x = 80",
        },
      ],
      keyPoints: [
        "The exterior angles of any polygon add to 360°.",
        "The interior angles of an n-sided polygon add to (n − 2) × 180°.",
        "Regular polygon: exterior angle = 360° ÷ n, and interior angle = 180° − exterior angle.",
        "To find n, go via the exterior angle: n = 360 ÷ exterior angle.",
      ],
      whyItWorks:
        "**Interior sum.** Pick one corner and draw every diagonal from it. It can't join to itself or to its two neighbours, so there are n − 3 diagonals, cutting the polygon into **n − 2 triangles**. Their angles exactly fill the polygon's corners, so the sum is (n − 2) × 180°.\n\n" +
        "**Exterior sum.** Walk once around the outside, turning at each corner. You end up facing the way you started, so the turns add to one full turn: 360°.\n\n" +
        "**The two facts agree.** At each of the n corners, interior + exterior = 180°, so all the angles together make 180n degrees. Take away the 360° of exterior angles and the interior sum is 180n − 360 = (n − 2) × 180°.",
      strategies: ["Find the exterior angle first", "Try small cases, then find a pattern", "Work backwards"],
      thinkDeeper:
        "Which of these could be the interior-angle sum of a polygon: 1980°, 2000°, 2160°? For each one that works, how many sides does the polygon have? Then: could a *regular* polygon have interior angles of 130°? What about 144°?",
    },
    // -----------------------------------------------------------------------
    {
      id: "regular-polygon-symmetry",
      heading: "Symmetry of regular polygons",
      discovery: {
        problem:
          "How many lines of symmetry does a regular hexagon have? In how many positions does it fit exactly onto its outline as you rotate it through one full turn? Now try an equilateral triangle, a square and a regular pentagon. Spot the pattern, then test it on a rectangle.",
        idea:
          "A regular polygon with n sides has **n lines of symmetry** and **rotational symmetry of order n**: sides = lines = order. A rectangle breaks the pattern (4 sides, but only 2 lines and order 2) because its sides are not all equal, so it is not regular.",
      },
      body:
        "A shape has **line symmetry** if a mirror line splits it into two halves that are reflections of each other: fold along the line and the halves match exactly.\n\n" +
        "A shape has **rotational symmetry** if it fits onto its own outline more than once during a full turn. The **order** is the number of times it fits in one full turn, counting the starting position. Order 1 means no rotational symmetry. The smallest angle of rotation is 360° ÷ order.\n\n" +
        "**Regular polygons.** For a regular polygon with n sides:\n\n" +
        "- number of lines of symmetry = n\n" +
        "- order of rotational symmetry = n\n" +
        "- smallest turn that maps it onto itself = 360° ÷ n, the same as its exterior angle\n\n" +
        "If n is **odd**, every mirror line runs from a corner to the midpoint of the opposite side. If n is **even**, half the lines join opposite corners and half join the midpoints of opposite sides.\n\n" +
        "Non-regular shapes have less symmetry:\n\n" +
        "| Quadrilateral | Lines of symmetry | Rotational order |\n|---|---|---|\n| Square | 4 | 4 |\n| Rectangle | 2 | 2 |\n| Rhombus | 2 | 2 |\n| Parallelogram | 0 | 2 |\n| Kite | 1 | 1 |\n| Isosceles trapezium | 1 | 1 |\n\n" +
        "**Tessellation (stretch).** Shapes **tessellate** when copies fit together to cover a flat surface with no gaps and no overlaps. Wherever corners meet at a point, the angles must add to exactly 360°.\n\n" +
        "- Only three regular polygons tessellate on their own: equilateral triangles (6 × 60°), squares (4 × 90°) and regular hexagons (3 × 120°).\n" +
        "- Mixtures can work: two regular octagons and a square meet as 135° + 135° + 90° = 360°.\n" +
        "- **Every** triangle and **every** quadrilateral tessellates, because copies can be arranged so that their angles make 360° at each point.",
      diagram: `<svg viewBox="0 0 440 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A regular hexagon with its 6 lines of symmetry and a regular pentagon with its 5 lines of symmetry"><rect width="440" height="250" fill="#ffffff"/><polygon points="195,115 152.5,41.4 67.5,41.4 25,115 67.5,188.6 152.5,188.6" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><g stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="6 4"><line x1="210" y1="115" x2="10" y2="115"/><line x1="160" y1="28.4" x2="60" y2="201.6"/><line x1="60" y1="28.4" x2="160" y2="201.6"/></g><g stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="2 3"><line x1="196.6" y1="65" x2="23.4" y2="165"/><line x1="110" y1="15" x2="110" y2="215"/><line x1="23.4" y1="65" x2="196.6" y2="165"/></g><polygon points="330,35 249.2,93.7 280,188.8 380,188.8 410.8,93.7" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><g stroke="#1d4ed8" stroke-width="1.5" stroke-dasharray="6 4"><line x1="330" y1="20" x2="330" y2="205"/><line x1="234.9" y1="89.1" x2="410.8" y2="146.3"/><line x1="271.2" y1="200.9" x2="380" y2="51.2"/><line x1="388.8" y1="200.9" x2="280" y2="51.2"/><line x1="425.1" y1="89.1" x2="249.2" y2="146.3"/></g><g font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="110" y="240">6 sides, 6 lines, order 6</text><text x="330" y="240">5 sides, 5 lines, order 5</text></g></svg>`,
      diagramCaption:
        "Even n (hexagon): mirror lines join opposite corners (blue) or the midpoints of opposite sides (red). Odd n (pentagon): each mirror line runs from a corner to the midpoint of the opposite side.",
      workedExamples: [
        {
          title: "Symmetry of a regular octagon",
          problem:
            "For a regular octagon, find the number of lines of symmetry, the order of rotational symmetry, and the smallest angle it can be turned through to look the same.",
          steps: [
            "It is regular with 8 sides, so it has 8 lines of symmetry.",
            "Its order of rotational symmetry is 8.",
            "Smallest angle of rotation = 360° ÷ 8 = 45°.",
          ],
          answer: "8 lines of symmetry; order 8; 45°",
          yourTurn: {
            question:
              "Your turn: what is the smallest angle, in degrees, that a regular decagon (10 sides) can be rotated through so that it fits exactly onto itself?",
            answer: { type: "number", value: 36, display: "36°" },
            solution: "A regular decagon has rotational symmetry of order 10, so the smallest turn is 360 ÷ 10 = 36°.",
          },
        },
        {
          title: "From symmetry to angles",
          problem:
            "A regular polygon fits onto itself after a rotation of 24°, and not after any smaller turn. How many sides does it have, and what is each interior angle?",
          steps: [
            "The smallest turn is 360° ÷ n, so n = 360 ÷ 24 = 15 sides.",
            "That smallest turn equals the exterior angle: 24°.",
            "Interior angle = 180° − 24° = 156°.",
          ],
          answer: "15 sides; each interior angle is 156°",
        },
        {
          title: "Will it tessellate?",
          problem: "Can regular pentagons tessellate on their own? Can regular octagons and squares tessellate together?",
          steps: [
            "Each interior angle of a regular pentagon is 108°.",
            "Three at a point make 3 × 108° = 324°, leaving a 36° gap; four would make 432°, which overlaps. No whole number of 108° angles makes 360°, so pentagons alone **do not** tessellate.",
            "Each interior angle of a regular octagon is 135°. Two octagons and a square give 135° + 135° + 90° = 360°, so they **do** tessellate (a common floor-tile pattern).",
          ],
          answer: "Regular pentagons alone: no. Regular octagons with squares: yes.",
        },
      ],
      keyPoints: [
        "A regular n-sided polygon has n lines of symmetry and rotational symmetry of order n.",
        "Smallest angle of rotation = 360° ÷ order. For a regular polygon this equals the exterior angle.",
        "To tessellate there must be no gaps and no overlaps: the angles at every meeting point add to 360°.",
        "Only equilateral triangles, squares and regular hexagons tessellate on their own.",
      ],
      whyItWorks:
        "Turn a regular n-gon about its centre by 360° ÷ n. Every corner moves to the next corner, and because all the sides and angles are equal, the shape lands exactly on its old outline. You can do this n times before you are back at the start, so the order is n.\n\n" +
        "For the mirror lines: each one passes through the centre and through two of the 2n special points (the n corners and the n side-midpoints), and every special point lies on exactly one mirror line. So there are 2n ÷ 2 = n lines.\n\n" +
        "**Why only three regular polygons tessellate alone:** a whole number of copies must meet at each point, so the interior angle must divide exactly into 360°. At least 3 copies must meet (2 would need 180° angles), and at most 6 (the smallest interior angle is 60°). So the angle is 360 ÷ 3, 360 ÷ 4, 360 ÷ 5 or 360 ÷ 6: 120°, 90°, 72° or 60°. No regular polygon has a 72° angle (its exterior angle would be 108°, and 360 ÷ 108 is not whole), which leaves the hexagon, square and triangle.",
      strategies: ["Try small cases, then find a pattern", "Use symmetry", "Work backwards"],
      thinkDeeper:
        "Explain why no regular polygon with more than 6 sides can tessellate on its own: how big is its interior angle, and how many copies could meet at a point? Bonus: a regular 12-sided polygon (interior angle 150°) *can* tessellate together with equilateral triangles. Find the combination of angles that meets at each point.",
    },
    // -----------------------------------------------------------------------
    {
      id: "angle-proofs",
      heading: "Geometric reasoning & proof",
      discovery: {
        problem:
          "Mei measures 20 different triangles, and every time the exterior angle equals the sum of the two interior opposite angles. Has she *proved* the fact is always true? What would convince you that it holds for a triangle nobody has ever drawn?",
        idea:
          "Checking examples builds confidence but can never cover every triangle, because there are infinitely many. A **proof** uses letters for the angles and only facts that are always true, so one argument covers every case at once. By contrast, a single counterexample is enough to *disprove* a claim.",
      },
      body:
        "**Stretch:** A **proof** is a chain of statements leading from what you are given to what you want to show. Every statement is justified by a known fact or by an earlier line.\n\n" +
        "A good layout:\n\n" +
        "1. Draw a diagram and label general angles with letters (a, b, x …), not numbers.\n" +
        "2. Write each step as *statement, then reason*.\n" +
        "3. Finish with a sentence saying what has been proved.\n\n" +
        "Here is a proof that an exterior angle of a triangle equals the sum of the interior opposite angles. The interior angles are a, b and c, and d is the exterior angle next to c.\n\n" +
        "| Statement | Reason |\n|---|---|\n| c + d = 180° | angles on a straight line add to 180° |\n| a + b + c = 180° | angles in a triangle add to 180° |\n| d = 180° − c and a + b = 180° − c | rearranging each line |\n| d = a + b | both equal 180° − c |\n\n" +
        "**Rules of the game.**\n\n" +
        "- Never use a measurement or \"it looks like\". Diagrams in proofs are only sketches.\n" +
        "- Don't assume the thing you are trying to prove (that is *circular reasoning*).\n" +
        "- Don't secretly use a special case, such as assuming a triangle is isosceles or right-angled.\n" +
        "- A **construction line**, such as a new parallel line, is allowed and often unlocks a proof.\n" +
        "- To show a claim is **false**, one counterexample is enough.",
      diagram: `<svg viewBox="0 0 400 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with side AB extended beyond B. A dashed line through B parallel to AC splits the exterior angle d at B into a copy of a and a copy of b"><rect width="400" height="220" fill="#ffffff"/><path d="M60 190 L80 190 A20 20 0 0 0 70.8 173.2 Z" fill="#c7d2fe"/><path d="M150 50 L139.2 66.8 A20 20 0 0 0 161.6 66.3 Z" fill="#fde68a"/><path d="M250 190 L238.4 173.7 A20 20 0 0 0 230 190 Z" fill="#bbf7d0"/><path d="M250 190 L272 190 A22 22 0 0 0 261.9 171.5 Z" fill="#c7d2fe"/><path d="M250 190 L261.9 171.5 A22 22 0 0 0 237.2 172.1 Z" fill="#fde68a"/><path d="M305 190 A55 55 0 0 0 218 145.25" fill="none" stroke="#1f2937" stroke-width="1.2"/><polygon points="60,190 250,190 150,50" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="250" y1="190" x2="370" y2="190" stroke="#1f2937" stroke-width="2"/><line x1="250" y1="190" x2="309.5" y2="97.5" stroke="#334155" stroke-width="1.5" stroke-dasharray="6 4"/><path d="M100 120.3 L107.2 116.6 L106.8 124.7 M277.5 139.8 L284.7 136.1 L284.3 144.2" fill="none" stroke="#1f2937" stroke-width="1.5"/><g font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="50" y="206">A</text><text x="250" y="208">B</text><text x="150" y="40">C</text><text x="86" y="181">a</text><text x="151" y="84">b</text><text x="225" y="181">c</text><text x="286" y="175">a</text><text x="249" y="154">b</text><text x="238" y="127">d</text></g></svg>`,
      diagramCaption:
        "A second proof: through B, draw a line parallel to AC. The exterior angle d splits into a copy of a (corresponding angles) and a copy of b (alternate angles), so d = a + b.",
      workedExamples: [
        {
          title: "Proof: the exterior angle (parallel-line method)",
          problem:
            "Prove that the exterior angle d of a triangle equals a + b, the sum of the two interior opposite angles, by drawing a parallel line.",
          steps: [
            "Label the triangle ABC with angle a at A, b at C and c at B. Extend AB beyond B to make the exterior angle d.",
            "Construction: through B, draw a line parallel to AC.",
            "The lower part of d equals a: corresponding angles are equal (AC is parallel to the new line, and line AB is the transversal).",
            "The upper part of d equals b: alternate angles are equal (BC is the transversal).",
            "So d = a + b, as required. Nothing depended on the actual sizes, so this holds for every triangle.",
          ],
          answer: "d = a + b for every triangle",
          yourTurn: {
            question:
              "Your turn: an exterior angle of a triangle is (5x)°, and the two interior opposite angles are (2x + 10)° and (x + 20)°. Find x.",
            answer: { type: "number", value: 15 },
            solution:
              "Exterior angle = sum of interior opposite angles: 5x = (2x + 10) + (x + 20) = 3x + 30. So 2x = 30 and x = 15. Check: 40° + 35° = 75° = 5 × 15° ✓",
          },
        },
        {
          title: "Proof: opposite angles of a parallelogram",
          problem: "PQRS is a parallelogram. Prove that ∠P = ∠R.",
          steps: [
            "Let ∠P = x.",
            "PS is parallel to QR, so ∠P + ∠Q = 180° (co-interior angles add to 180°). So ∠Q = 180° − x.",
            "PQ is parallel to SR, so ∠Q + ∠R = 180° (co-interior angles add to 180°).",
            "So ∠R = 180° − (180° − x) = x.",
            "Therefore ∠P = ∠R. The same argument, starting from ∠Q, shows ∠Q = ∠S.",
          ],
          answer: "∠P = ∠R (and likewise ∠Q = ∠S)",
        },
        {
          title: "Proof: bisectors of co-interior angles",
          problem:
            "A transversal crosses two parallel lines. The two co-interior angles on one side are each bisected (cut exactly in half), and the two bisectors meet at X. Prove that the bisectors meet at 90°.",
          steps: [
            "Call the co-interior angles 2p and 2q, so their halves are p and q. (Using 2p avoids halves of letters.)",
            "Co-interior angles add to 180°: 2p + 2q = 180°, so p + q = 90°.",
            "The two bisectors and the transversal form a triangle with angles p, q and the angle at X.",
            "Angle at X = 180° − (p + q) = 180° − 90° = 90° (angles in a triangle add to 180°).",
            "So the bisectors always meet at right angles, whatever the angles were.",
          ],
          answer: "The bisectors meet at 90°",
        },
      ],
      keyPoints: [
        "A proof works for every case; examples only check some.",
        "Use letters for angles, and give a reason for every line.",
        "A construction line (often a parallel line) can unlock a proof.",
        "One counterexample is enough to disprove a claim.",
      ],
      whyItWorks:
        "Why letters instead of numbers? If you show d = a + b using a = 50° and b = 60°, you have only checked one triangle. With letters, every step is true *whatever* the values are, so the conclusion holds for all triangles at once: infinitely many cases in a few lines. That is the power of algebra in geometry.",
      strategies: ["Add a construction line", "Introduce a variable", "Work backwards from what you want to prove"],
      thinkDeeper:
        "Prove that the three exterior angles of any triangle (one at each corner) add to 360°, using only the triangle angle sum and angles on a straight line. Then explain how the same idea proves that the exterior angles of a pentagon add to 360°.",
    },
  ],
  learn: {
    flashcards: [
      { front: "Angles on a straight line; angles around a point", back: "Add to 180°; add to 360°." },
      { front: "Vertically opposite angles", back: "Are equal: the pairs directly across from each other where two straight lines cross." },
      { front: "Corresponding angles (F shape)", back: "Equal, when the lines are parallel." },
      { front: "Alternate angles (Z shape)", back: "Equal, when the lines are parallel." },
      { front: "Co-interior angles (C shape)", back: "Add to 180°, when the lines are parallel." },
      { front: "Angles in a triangle", back: "Add to 180°." },
      { front: "Exterior angle of a triangle", back: "Equals the sum of the two interior opposite angles." },
      { front: "Base angles of an isosceles triangle", back: "Are equal. They are the angles opposite the two equal sides." },
      { front: "Angles in a quadrilateral", back: "Add to 360°: a diagonal splits it into two triangles." },
      { front: "Diagonals of a rhombus", back: "Bisect each other at 90° (but are only equal if it is a square)." },
      { front: "Sum of the interior angles of an n-sided polygon", back: "{{(n - 2) * 180°}}" },
      { front: "Sum of the exterior angles of any polygon", back: "360°: one full turn." },
      { front: "Each exterior angle of a regular n-sided polygon", back: "{{(360°)/n}}. Each interior angle is 180° minus this." },
      { front: "Find n from a regular polygon's interior angle", back: "Exterior = 180° − interior, then n = 360 ÷ exterior." },
      { front: "Symmetry of a regular n-sided polygon", back: "n lines of symmetry and rotational symmetry of order n." },
      { front: "Which regular polygons tessellate on their own?", back: "Equilateral triangles, squares and regular hexagons: their angles (60°, 90°, 120°) divide exactly into 360°." },
    ],
    mustKnow: [
      "I can find missing angles on a straight line, around a point and using vertically opposite angles.",
      "I can identify corresponding, alternate and co-interior angles and use them with parallel lines.",
      "I can solve multi-step angle problems, writing a correct reason for each step.",
      "I can form and solve an equation when angles are given as expressions.",
      "I can use the angle sum of a triangle, including isosceles, equilateral and right-angled triangles.",
      "I can use the fact that an exterior angle of a triangle equals the sum of the interior opposite angles.",
      "I can describe the special quadrilaterals by their sides, angles and diagonals, and place them in a hierarchy.",
      "I can use the angle sum of a quadrilateral to find missing angles.",
      "I can work out the interior angle sum of any polygon using (n − 2) × 180°.",
      "I can find the interior and exterior angles of a regular polygon, and find the number of sides from an angle.",
      "I can state the number of lines of symmetry and the order of rotational symmetry of a regular polygon.",
      "I can explain why some shapes tessellate and others don't, and write a short angle proof.",
    ],
    misconceptions: [
      {
        wrong: "Alternate angles are always equal.",
        right: "Alternate (and corresponding) angles are only equal when the lines are parallel. Look for the arrows.",
      },
      {
        wrong: "Co-interior angles are equal.",
        right: "Co-interior angles add to 180°. They are only equal in the special case where both are 90°.",
      },
      {
        wrong: "The interior angles of a polygon with n sides add to n × 180°.",
        right: "They add to (n − 2) × 180°, because the polygon splits into n − 2 triangles from one corner.",
      },
      {
        wrong: "For a regular polygon, 360 ÷ n gives the interior angle.",
        right: "360 ÷ n gives the *exterior* angle; interior = 180° − exterior. For a regular hexagon: exterior 60°, interior 120°.",
      },
      {
        wrong: "A square is not a rectangle, because a rectangle has two long sides and two short sides.",
        right: "A rectangle only needs four right angles (which makes opposite sides equal and parallel). A square has all of these, so every square is a special rectangle.",
      },
      {
        wrong: "Polygons with more sides have a bigger total of exterior angles.",
        right: "The exterior angles of every polygon add to 360°. With more sides, each exterior angle is simply smaller.",
      },
    ],
    examMistakes: [
      "Writing \"Z angles\" or \"F angles\" as a reason instead of \"alternate angles are equal\" or \"corresponding angles are equal\".",
      "Giving a number without a reason when the question says \"give reasons\".",
      "Measuring with a protractor when the diagram says \"not drawn to scale\".",
      "Using 360 ÷ n as the interior angle of a regular polygon; it is the exterior angle.",
      "Finding x but forgetting to work out the angle the question asked for, such as 3x + 10.",
      "Assuming lines are parallel, or a triangle is isosceles, because it looks that way. Use only the marks (arrows, ticks) and the facts given.",
      "Dividing the interior-angle sum by n for an irregular polygon. Only regular polygons have equal angles.",
      "In an isosceles triangle, assuming the given angle is the apex when it could be a base angle. Check both cases.",
    ],
    mnemonics: [
      {
        topic: "Parallel-line angles",
        device: "F and Z are equal; C Completes 180",
        explanation:
          "Corresponding (F) and alternate (Z) angles are equal. Co-interior (C) angles complete a straight angle: they add to 180°.",
      },
      {
        topic: "Regular polygons",
        device: "EXterior EXits first",
        explanation:
          "For a regular polygon, find the exterior angle first (360 ÷ n), then interior = 180 − exterior. Going backwards: interior → exterior → n = 360 ÷ exterior.",
      },
      {
        topic: "Interior angle sum",
        device: "Minus two, times one-eighty",
        explanation: "An n-sided polygon splits into n − 2 triangles from one corner, so its interior angles add to (n − 2) × 180°.",
      },
      {
        topic: "Symmetry of regular polygons",
        device: "n sides, n lines, n turns",
        explanation: "A regular polygon with n sides has n lines of symmetry and fits onto itself n times in a full turn.",
      },
    ],
    realWorld: [
      {
        title: "Honeycomb",
        detail:
          "Bees build hexagonal cells. Three 120° corners meet at each point (3 × 120° = 360°), so the cells tessellate with no gaps, and hexagons enclose a lot of space for the wax used.",
        emoji: "🐝",
      },
      {
        title: "A football's panels",
        detail:
          "A classic football has 12 pentagons and 20 hexagons. At each corner, 108° + 120° + 120° = 348°, which is 12° short of 360°. That shortfall is what lets the flat panels curve round into a ball.",
        emoji: "⚽",
      },
      {
        title: "Floor tiles",
        detail:
          "Octagon-and-square floor patterns work because 135° + 135° + 90° = 360°. Look for them in older shophouses, hotel lobbies and bathrooms.",
        emoji: "🏠",
      },
      {
        title: "Parking bays",
        detail:
          "Slanted car-park bays are painted as parallel lines crossing the kerb line. Painting every line at the same angle to the kerb (equal corresponding angles) keeps the bays parallel.",
        emoji: "🅿️",
      },
      {
        title: "Bridges and roof trusses",
        detail:
          "Engineers build frames from triangles because a triangle cannot change shape without changing a side length. Once two angles are set, the 180° angle sum fixes the third.",
        emoji: "🌉",
      },
      {
        title: "Navigation",
        detail:
          "Pilots and ship navigators draw parallel North lines at each point. Alternate and co-interior angles then give the bearing for the return journey.",
        emoji: "🧭",
      },
    ],
    videos: [
      {
        title: "Angles in parallel lines",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+angles+in+parallel+lines",
      },
      {
        title: "Interior and exterior angles of polygons",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+interior+and+exterior+angles+of+polygons",
      },
      {
        title: "Proof that the angles in a triangle add to 180°",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+triangle+angle+sum+proof",
      },
      {
        title: "Tessellations and pentagon tilings",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+pentagon+tiling",
      },
    ],
    formulas: [
      { name: "Angles on a straight line", formula: "{{a + b = 180°}}", note: "Angles around a point add to 360°." },
      {
        name: "Parallel lines",
        formula: "Corresponding and alternate angles are equal; co-interior angles: {{a + b = 180°}}",
      },
      { name: "Triangle angle sum", formula: "{{a + b + c = 180°}}" },
      {
        name: "Exterior angle of a triangle",
        formula: "{{d = a + b}}",
        note: "d is the exterior angle; a and b are the two interior opposite angles.",
      },
      { name: "Quadrilateral angle sum", formula: "{{a + b + c + d = 360°}}" },
      { name: "Interior angle sum of an n-sided polygon", formula: "{{S = (n - 2) * 180°}}" },
      {
        name: "Regular polygon angles",
        formula: "{{e = (360°)/n}} and {{i = 180° - e}}",
        note: "e is each exterior angle and i is each interior angle.",
      },
      { name: "Number of sides of a regular polygon", formula: "{{n = (360°)/e}}", note: "e is the exterior angle." },
    ],
  },
};
