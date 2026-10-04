import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "constructions-bearings",
  title: "Constructions, Scale Drawings & Bearings",
  strand: "Geometry & Measure",
  icon: "🧭",
  summary: "Draw geometry exactly with ruler and compasses, then use it to navigate by bearing and map scale.",
  intro:
    "This chapter is about drawing geometry *exactly* — with a ruler, a protractor and a pair of compasses — and then using those drawings to find your way. You will see why a few well-placed arcs can halve a line or an angle perfectly, and how sailors, pilots and orienteers pin down any direction with just three digits. By the end you can turn a journey described in words into an accurate scale drawing and read the answers straight off it.",
  guide: [
    // -----------------------------------------------------------------------
    {
      id: "measuring-angles",
      heading: "Measuring & drawing angles",
      discovery: {
        problem:
          "Arjun puts his protractor on an angle and reads **130°**. Wei Ling measures the same angle and reads **50°**. Both of them read the numbers correctly at the point where the arm crosses the protractor. Who is right — and how could one glance at the angle settle it without measuring at all?",
        idea:
          "A protractor has **two scales** that run in opposite directions, and the two numbers at any mark always add to 180°. Only the scale that starts at **0 on the first arm** gives the angle. A quick estimate settles the argument: if the angle is clearly smaller than a right angle, it must be 50°, not 130°.",
      },
      body:
        "An **angle** measures an amount of turn between two **arms** that meet at a point called the **vertex**. We measure it in **degrees** (°); a full turn is 360°.\n\nName the type of angle *before* you measure — it is your built-in check.\n\n| Type | Size |\n|---|---|\n| Acute | more than 0° and less than 90° |\n| Right | exactly 90° |\n| Obtuse | more than 90° and less than 180° |\n| Straight | exactly 180° |\n| Reflex | more than 180° and less than 360° |\n\n**Estimating.** Compare with angles you can picture: a right angle (90°), half a right angle (45°), a third of a right angle (30°) and a straight line (180°). An angle a little wider than half a right angle is roughly 50°–60°.\n\n**Measuring with a protractor**\n\n1. Estimate first: acute, obtuse or reflex? Roughly how big?\n2. Put the **centre cross** of the protractor exactly on the vertex.\n3. Line up the **baseline** (the 0°–180° line) along one arm.\n4. Find the scale that reads **0** on that arm and count up it until you reach the other arm.\n5. Compare the reading with your estimate. If they disagree, you have probably used the wrong scale.\n\n**Reflex angles.** A semicircular protractor stops at 180°, so measure the angle on the *other* side and subtract it from 360°. If the inside angle is 125°, the reflex angle is 360° − 125° = 235°.\n\n**Drawing an angle**, say 72°: rule one arm, put the centre cross on the end that will be the vertex, count up from the 0 on that arm to 72, mark a small dot, then rule a line from the vertex through the dot. Label the angle.\n\n> Exam mark schemes usually allow a small tolerance — often 2° for angles and 2 mm for lengths — but aim to be exact.",
      diagram: `<svg viewBox="0 0 480 275" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A protractor measuring an angle of 50 degrees. The first arm lies on the zero of the inner scale. Where the second arm crosses, the inner scale reads 50 and the outer scale reads 130."><rect x="0" y="0" width="480" height="275" fill="#ffffff"/><path d="M 65 240 A 175 175 0 0 1 415 240 Z" fill="#e0f2fe" stroke="#334155" stroke-width="1.5"/><line x1="415" y1="240" x2="403" y2="240" stroke="#334155" stroke-width="1"/><line x1="414.3" y1="224.7" x2="408.4" y2="225.3" stroke="#334155" stroke-width="1"/><line x1="412.3" y1="209.6" x2="400.5" y2="211.7" stroke="#334155" stroke-width="1"/><line x1="409" y1="194.7" x2="403.2" y2="196.3" stroke="#334155" stroke-width="1"/><line x1="404.4" y1="180.1" x2="393.2" y2="184.3" stroke="#334155" stroke-width="1"/><line x1="398.6" y1="166" x2="393.2" y2="168.6" stroke="#334155" stroke-width="1"/><line x1="391.6" y1="152.5" x2="381.2" y2="158.5" stroke="#334155" stroke-width="1"/><line x1="383.4" y1="139.6" x2="378.4" y2="143.1" stroke="#334155" stroke-width="1"/><line x1="374.1" y1="127.5" x2="364.9" y2="135.2" stroke="#334155" stroke-width="1"/><line x1="363.7" y1="116.3" x2="359.5" y2="120.5" stroke="#334155" stroke-width="1"/><line x1="352.5" y1="105.9" x2="344.8" y2="115.1" stroke="#334155" stroke-width="1"/><line x1="340.4" y1="96.6" x2="336.9" y2="101.6" stroke="#334155" stroke-width="1"/><line x1="327.5" y1="88.4" x2="321.5" y2="98.8" stroke="#334155" stroke-width="1"/><line x1="314" y1="81.4" x2="311.4" y2="86.8" stroke="#334155" stroke-width="1"/><line x1="299.9" y1="75.6" x2="295.7" y2="86.8" stroke="#334155" stroke-width="1"/><line x1="285.3" y1="71" x2="283.7" y2="76.8" stroke="#334155" stroke-width="1"/><line x1="270.4" y1="67.7" x2="268.3" y2="79.5" stroke="#334155" stroke-width="1"/><line x1="255.3" y1="65.7" x2="254.7" y2="71.6" stroke="#334155" stroke-width="1"/><line x1="240" y1="65" x2="240" y2="77" stroke="#334155" stroke-width="1"/><line x1="224.7" y1="65.7" x2="225.3" y2="71.6" stroke="#334155" stroke-width="1"/><line x1="209.6" y1="67.7" x2="211.7" y2="79.5" stroke="#334155" stroke-width="1"/><line x1="194.7" y1="71" x2="196.3" y2="76.8" stroke="#334155" stroke-width="1"/><line x1="180.1" y1="75.6" x2="184.3" y2="86.8" stroke="#334155" stroke-width="1"/><line x1="166" y1="81.4" x2="168.6" y2="86.8" stroke="#334155" stroke-width="1"/><line x1="152.5" y1="88.4" x2="158.5" y2="98.8" stroke="#334155" stroke-width="1"/><line x1="139.6" y1="96.6" x2="143.1" y2="101.6" stroke="#334155" stroke-width="1"/><line x1="127.5" y1="105.9" x2="135.2" y2="115.1" stroke="#334155" stroke-width="1"/><line x1="116.3" y1="116.3" x2="120.5" y2="120.5" stroke="#334155" stroke-width="1"/><line x1="105.9" y1="127.5" x2="115.1" y2="135.2" stroke="#334155" stroke-width="1"/><line x1="96.6" y1="139.6" x2="101.6" y2="143.1" stroke="#334155" stroke-width="1"/><line x1="88.4" y1="152.5" x2="98.8" y2="158.5" stroke="#334155" stroke-width="1"/><line x1="81.4" y1="166" x2="86.8" y2="168.6" stroke="#334155" stroke-width="1"/><line x1="75.6" y1="180.1" x2="86.8" y2="184.3" stroke="#334155" stroke-width="1"/><line x1="71" y1="194.7" x2="76.8" y2="196.3" stroke="#334155" stroke-width="1"/><line x1="67.7" y1="209.6" x2="79.5" y2="211.7" stroke="#334155" stroke-width="1"/><line x1="65.7" y1="224.7" x2="71.6" y2="225.3" stroke="#334155" stroke-width="1"/><line x1="65" y1="240" x2="77" y2="240" stroke="#334155" stroke-width="1"/><text x="390.4" y="230.8" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">180</text><text x="368.5" y="232.8" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">0</text><text x="370.8" y="168.5" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">150</text><text x="351.7" y="179.5" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">30</text><text x="240" y="93" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">90</text><text x="240" y="115" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">90</text><text x="164.5" y="113.2" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">60</text><text x="175.5" y="132.3" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">120</text><text x="109.2" y="168.5" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">30</text><text x="128.3" y="179.5" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">150</text><text x="89.6" y="230.8" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">0</text><text x="111.5" y="232.8" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#2563eb">180</text><text x="337.1" y="128.3" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#b91c1c">130</text><text x="322.9" y="145.2" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#2563eb">50</text><line x1="232" y1="240" x2="248" y2="240" stroke="#1f2937" stroke-width="1"/><line x1="240" y1="232" x2="240" y2="240" stroke="#1f2937" stroke-width="1"/><line x1="240" y1="240" x2="465" y2="240" stroke="#1f2937" stroke-width="2.5"/><line x1="240" y1="240" x2="384.6" y2="67.6" stroke="#1f2937" stroke-width="2.5"/><path d="M 274 240 A 34 34 0 0 0 261.9 214" fill="none" stroke="#b45309" stroke-width="2"/><text x="288.2" y="224.5" font-size="13" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#b45309">50°</text><text x="240" y="262" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">vertex on the centre</text><text x="10" y="20" font-size="12" font-family="sans-serif" fill="#2563eb">Inner scale (blue): its 0 is on the first arm, so read 50</text><text x="10" y="37" font-size="12" font-family="sans-serif" fill="#b91c1c">Outer scale (grey): reads 130 here, the wrong scale</text></svg>`,
      diagramCaption:
        "The first arm sits on the 0 of the inner (blue) scale, so read the inner scale: 50°. The outer scale gives 130° at the same mark — the two readings always add to 180°.",
      workedExamples: [
        {
          title: "Choosing the right scale",
          problem:
            "A protractor is placed with its centre on the vertex. The first arm passes through the 0 of the **outer** scale. The second arm crosses the scales at 35 (inner) and 145 (outer). What is the angle?",
          steps: [
            "The first arm is on the outer scale's 0, so follow the outer scale.",
            "Where the second arm crosses, the outer scale reads 145.",
            "Check: 35 + 145 = 180, as expected for the two scales. Reading 35° would be the classic wrong-scale error — a sketch would show an obtuse angle.",
          ],
          answer: "145°",
          yourTurn: {
            question:
              "An angle's first arm sits on the 0 of the inner scale. The second arm crosses the inner scale at 62 and the outer scale at 118. How big is the angle, in degrees?",
            answer: { type: "number", value: 62, display: "62°" },
            solution:
              "The first arm is on the inner scale's 0, so read the inner scale: 62°. (118° is the outer-scale reading, from the wrong zero; 62 + 118 = 180.)",
          },
        },
        {
          title: "A reflex angle",
          problem: "The obtuse angle between two arms at P measures 128°. What is the reflex angle at P?",
          steps: [
            "The two angles on either side of the arms make a full turn, so they add to 360°.",
            "Reflex angle = 360° − 128° = 232°.",
            "Check: 232° is between 180° and 360°, so it is reflex.",
          ],
          answer: "232°",
        },
        {
          title: "Drawing a reflex angle",
          problem: "Explain how to draw an angle of 295° using a semicircular protractor.",
          steps: [
            "295° is reflex, so draw its partner instead: 360° − 295° = 65°.",
            "Rule one arm. Put the centre cross on the vertex and count up from the 0 on that arm to 65. Mark a dot.",
            "Rule a line from the vertex through the dot. This makes a 65° angle.",
            "The reflex angle is the one on the **outside**. Mark it with a large arc and label it 295°.",
          ],
          answer: "Draw 65°, then mark and label the outside angle as 295°.",
        },
      ],
      keyPoints: [
        "Estimate first — it tells you which scale is right.",
        "Centre cross on the vertex, baseline on one arm, count up from the 0 on that arm.",
        "The two scale readings at any mark add to 180°.",
        "Reflex angle = 360° − the angle on the other side.",
      ],
      whyItWorks:
        "A protractor is a half-circle split into 180 equal one-degree steps. The inner and outer scales number the *same* marks, but from opposite ends. A mark that is 50 steps from one end is 180 − 50 = 130 steps from the other — so the two readings always add to 180°, and you must count from the end where your first arm lies. Reflex angles work because a full turn is 360°: an angle and its reflex partner together go all the way round.",
      strategies: ["Estimate first", "Use the inverse (360° minus the inside angle)", "Check by reasonableness"],
      thinkDeeper:
        "A clock shows 4:00. Without a protractor, find the reflex angle between the hands. Now try 4:30 — careful: the hour hand has moved too. How far does the hour hand turn in one minute?",
    },
    // -----------------------------------------------------------------------
    {
      id: "constructing-triangles",
      heading: "Constructing triangles",
      discovery: {
        problem:
          "Try to draw a triangle with sides 3 cm, 4 cm and 8 cm. Then try 3 cm, 5 cm and 8 cm, and finally 3 cm, 6 cm and 8 cm. Which of them actually close up into a triangle? What rule decides?",
        idea:
          "The two shorter sides have to *reach* each other. 3 + 4 = 7, which is less than 8, so they can't meet. 3 + 5 = 8 exactly, so they lie flat along the 8 cm side — no triangle. 3 + 6 = 9, which is more than 8, so it works. This is the **triangle inequality**: the two shorter sides must add to **more than** the longest side.",
      },
      body:
        "To **construct** means to draw accurately with instruments: a sharp pencil, a ruler, a protractor and a pair of **compasses** (the instrument that draws circles and arcs). Always **leave your construction arcs showing** — they are your working.\n\nThree pieces of information fix a triangle exactly if they are one of these combinations:\n\n| Given | Short name | Instruments |\n|---|---|---|\n| three sides | **SSS** | ruler and compasses |\n| two sides and the angle *between* them | **SAS** | ruler and protractor |\n| two angles and the side *between* them | **ASA** | ruler and protractor |\n\n**SSS** — for example AB = 7 cm, AC = 5 cm, BC = 6 cm:\n\n1. Sketch the triangle and label it. Rule the base AB = 7 cm.\n2. Set the compasses to 5 cm. Put the point on A and draw an arc above the line.\n3. Set the compasses to 6 cm. Put the point on B and draw an arc that crosses the first arc.\n4. The crossing is C. Rule AC and BC.\n\n**SAS** — for example PQ = 6 cm, angle P = 40°, PR = 4.5 cm: rule PQ, measure 40° at P, then measure 4.5 cm along that new arm to fix R. Join R to Q.\n\n**ASA** — for example XY = 8 cm, angle X = 50°, angle Y = 65°: rule XY, draw a 50° line at X and a 65° line at Y on the same side. Where they cross is Z.\n\n**When is a triangle impossible?**\n\n- Three sides: the two shorter sides must add to **more** than the longest.\n- Two angles: they must add to **less** than 180°, because the three angles of a triangle add to 180°.\n\nThe two arcs in an SSS construction cross twice, once above and once below the base. Either crossing gives a correct triangle — the two are mirror images.",
      diagram: `<svg viewBox="0 0 480 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Constructing triangle ABC with AB 7 cm, AC 5 cm and BC 6 cm. Two compass arcs, one from A and one from B, cross at C."><rect x="0" y="0" width="480" height="290" fill="#ffffff"/><polygon points="90,240 370,240 198.6,72" fill="#c7d2fe" fill-opacity="0.5" stroke="none"/><path d="M 233.6 100.8 A 200 200 0 0 0 164.5 54.4" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 233.8 42.4 A 240 240 0 0 0 169.7 107.8" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="90" y1="240" x2="370" y2="240" stroke="#1f2937" stroke-width="2.5"/><line x1="90" y1="240" x2="198.6" y2="72" stroke="#1f2937" stroke-width="2"/><line x1="370" y1="240" x2="198.6" y2="72" stroke="#1f2937" stroke-width="2"/><circle cx="90" cy="240" r="3" fill="#1f2937"/><text x="74" y="246" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><circle cx="370" cy="240" r="3" fill="#1f2937"/><text x="378" y="246" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><circle cx="198.6" cy="72" r="3" fill="#1f2937"/><text x="193.6" y="60" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">C</text><text x="230" y="262" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">7 cm</text><text x="106.3" y="156" font-size="13" font-family="sans-serif" fill="#2563eb">5 cm</text><text x="298.3" y="156" font-size="13" font-family="sans-serif" fill="#b45309">6 cm</text><text x="239.6" y="118.8" font-size="11" font-family="sans-serif" fill="#2563eb">arc r = 5 cm from A</text><text x="153.7" y="119.8" font-size="11" font-family="sans-serif" text-anchor="end" fill="#b45309">arc r = 6 cm from B</text></svg>`,
      diagramCaption:
        "SSS: rule AB = 7 cm, then an arc of radius 5 cm from A and an arc of radius 6 cm from B cross at C.",
      workedExamples: [
        {
          title: "Possible or impossible?",
          problem:
            "Which of these sets of lengths make a triangle? (a) 4 cm, 9 cm, 4 cm (b) 5 cm, 6 cm, 10 cm (c) 2.5 cm, 2.5 cm, 5 cm",
          steps: [
            "(a) Shorter two: 4 + 4 = 8, which is less than 9. The arcs never meet, so it is impossible.",
            "(b) 5 + 6 = 11, which is more than 10. Possible — a long, flat triangle.",
            "(c) 2.5 + 2.5 = 5, exactly equal to the longest side. The two short sides lie flat along the long one, so there is no triangle.",
          ],
          answer: "Only (b).",
          yourTurn: {
            question:
              "A triangle has sides of 6 cm and 11 cm. The third side is a whole number of centimetres. What is the **smallest** possible length of the third side, in cm?",
            answer: { type: "number", value: 6, display: "6 cm" },
            solution:
              "With 11 cm as the longest side, the other two must add to more than 11: third side + 6 > 11, so the third side is more than 5 cm. The smallest whole number is 6 cm (6 + 6 = 12, which beats 11).",
          },
        },
        {
          title: "SAS, step by step",
          problem: "Construct triangle PQR with PQ = 6 cm, angle QPR = 40° and PR = 4.5 cm. Describe the steps.",
          steps: [
            "Sketch first and label the given parts. The 40° angle is *between* the two given sides, so this is SAS.",
            "Rule PQ = 6 cm.",
            "Put the protractor's centre on P with the baseline along PQ. Count up from the 0 on PQ to 40 and mark a dot. Rule a long, faint line from P through the dot.",
            "Measure 4.5 cm along this line from P and mark R.",
            "Rule RQ. As a check, measure it: it should be about 3.9 cm.",
          ],
          answer: "Triangle PQR, with QR ≈ 3.9 cm as a check.",
        },
        {
          title: "ASA with a built-in check",
          problem:
            "Construct triangle XYZ with XY = 8 cm, angle X = 50° and angle Y = 65°. Before measuring, predict the length of XZ.",
          steps: [
            "Rule XY = 8 cm. Draw a 50° line at X and a 65° line at Y, on the same side of XY. They cross at Z.",
            "Angles in a triangle add to 180°, so angle Z = 180° − 50° − 65° = 65°.",
            "Angle Y = angle Z, so the triangle is **isosceles**: the sides opposite these equal angles are equal.",
            "XZ is opposite angle Y and XY is opposite angle Z, so XZ = XY = 8 cm.",
            "Measure XZ on your drawing — if it isn't close to 8 cm, an angle is out.",
          ],
          answer: "XZ = 8 cm",
        },
      ],
      keyPoints: [
        "Sketch and label first, then construct.",
        "SSS needs compasses; SAS and ASA need a protractor.",
        "The two shorter sides must add to more than the longest side.",
        "Leave every construction arc visible.",
      ],
      whyItWorks:
        "Every point on an arc of radius 5 cm centred at A is exactly 5 cm from A, and every point on an arc of radius 6 cm centred at B is exactly 6 cm from B. The crossing point is the only place (on that side of AB) that is 5 cm from A *and* 6 cm from B, so C has no choice. If 5 + 6 were not more than AB, the two circles would be too small to reach each other and there would be no crossing — that is the triangle inequality, seen with compasses.",
      strategies: ["Draw a diagram (sketch first)", "Consider extremes", "Check by measuring"],
      thinkDeeper:
        "SSS, SAS and ASA each fix exactly one triangle. But try AB = 7 cm, BC = 5 cm and angle A = 40° — the angle is *not* between the two given sides. Draw the 40° line from A, then swing an arc of radius 5 cm from B. Why can you get **two different** triangles? What length of BC would give exactly one?",
    },
    // -----------------------------------------------------------------------
    {
      id: "perpendicular-bisector",
      heading: "Perpendicular bisector & midpoint",
      discovery: {
        problem:
          "Ravi's flat is at A and Mei's flat is at B, 6 km apart. They want to meet at a café that is exactly the same distance from both flats. The midpoint of AB works. Find three more places that work. Where are **all** of them?",
        idea:
          "Every point that is the same distance from A and B lies on one straight line: the line through the midpoint of AB at right angles to it. It is called the **perpendicular bisector** of AB — and a pair of compasses can draw it without measuring a single length or angle.",
      },
      body:
        "**Bisect** means cut into two equal parts. **Perpendicular** means at right angles (90°). So the **perpendicular bisector** of a line segment AB is the line that cuts AB in half *and* crosses it at 90°. The point where it crosses is the **midpoint** M of AB.\n\n**Construction** (compasses and a straight edge only)\n\n1. Open the compasses to **more than half** of AB.\n2. Put the point on A and draw an arc above the line and an arc below it.\n3. **Without changing the width**, put the point on B and draw arcs that cross the first two. Call the crossings P and Q.\n4. Rule the line through P and Q. This is the perpendicular bisector; where it meets AB is the midpoint M.\n\nWhy *more* than half? If the radius is less than half of AB, the arcs from A and B stop short of each other and never cross.\n\n**The big idea: equidistance.** Equidistant means \"the same distance from\". P was drawn with the same radius from A and from B, so PA = PB. The same goes for Q. In fact *every* point on the perpendicular bisector is the same distance from A as from B — and every point that is equidistant from A and B lies on it.\n\n> The perpendicular bisector of AB is the set of all points equidistant from A and B.\n\nReach for it whenever a problem says \"the same distance from two points\": a meeting place, a phone mast between two towns, or the centre of a circle through three points.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Perpendicular bisector of AB. Equal arcs from A and B cross at P and Q. The line PQ crosses AB at its midpoint M at a right angle, and PA equals PB."><rect x="0" y="0" width="480" height="320" fill="#ffffff"/><path d="M 261.3 92.5 A 170 170 0 0 0 212 34" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 212 306 A 170 170 0 0 0 261.3 247.5" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 268 34 A 170 170 0 0 0 218.7 92.5" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 218.7 247.5 A 170 170 0 0 0 268 306" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="110" y1="170" x2="240" y2="60.5" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/><line x1="370" y1="170" x2="240" y2="60.5" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/><text x="157" y="113.3" font-size="13" font-style="italic" font-family="sans-serif" fill="#2563eb">r</text><text x="315" y="113.3" font-size="13" font-style="italic" font-family="sans-serif" fill="#b45309">r</text><line x1="110" y1="170" x2="370" y2="170" stroke="#1f2937" stroke-width="2.5"/><line x1="240" y1="14" x2="240" y2="312" stroke="#15803d" stroke-width="2"/><path d="M 240 158 L 252 158 L 252 170" fill="none" stroke="#1f2937" stroke-width="1.2"/><line x1="175" y1="164" x2="175" y2="176" stroke="#1f2937" stroke-width="1.5"/><line x1="305" y1="164" x2="305" y2="176" stroke="#1f2937" stroke-width="1.5"/><circle cx="110" cy="170" r="3" fill="#1f2937"/><text x="92" y="175" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><circle cx="370" cy="170" r="3" fill="#1f2937"/><text x="378" y="175" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><circle cx="240" cy="60.5" r="3" fill="#1f2937"/><text x="248" y="54.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">P</text><circle cx="240" cy="279.5" r="3" fill="#1f2937"/><text x="248" y="293.5" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">Q</text><circle cx="240" cy="170" r="3" fill="#1f2937"/><text x="224" y="188" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">M</text><text x="252" y="228" font-size="12" font-family="sans-serif" fill="#15803d">perpendicular bisector</text></svg>`,
      diagramCaption:
        "Arcs of the same radius r from A and from B cross at P and Q. PA = PB = r, so P is equidistant from A and B — and so is every point on the line PQ.",
      workedExamples: [
        {
          title: "Using the two properties",
          problem:
            "AB is 9.6 cm long. Its perpendicular bisector meets AB at M. A point P on the bisector is 5.2 cm from A. (a) How long is AM? (b) How far is P from B?",
          steps: [
            "The perpendicular bisector cuts AB in half: AM = 9.6 ÷ 2 = 4.8 cm.",
            "Every point on the perpendicular bisector is equidistant from A and B.",
            "So PB = PA = 5.2 cm — no measuring needed.",
          ],
          answer: "(a) 4.8 cm (b) 5.2 cm",
          yourTurn: {
            question:
              "CD is 13.4 cm long. Its perpendicular bisector meets CD at M. A point X on the bisector is 9 cm from D. Find CM and XC, in cm. Give CM first.",
            answer: { type: "list", values: [6.7, 9], ordered: true, display: "CM = 6.7 cm, XC = 9 cm" },
            solution: "CM = 13.4 ÷ 2 = 6.7 cm. X is on the perpendicular bisector, so XC = XD = 9 cm.",
          },
        },
        {
          title: "How wide must the compasses be?",
          problem:
            "Hana wants to construct the perpendicular bisector of a 7 cm line. Her compasses are set to 3 cm. What goes wrong, and what is the smallest whole number of centimetres that works?",
          steps: [
            "The arcs from each end must reach past the midpoint so that they cross.",
            "Half of 7 cm is 3.5 cm. Arcs of radius 3 cm stop 0.5 cm short of the midpoint from each side, so they never meet.",
            "Any radius **more than** 3.5 cm works. The smallest whole number is 4 cm. (Exactly 3.5 cm makes the arcs just touch at M — one point, not the two you need.)",
          ],
          answer: "3 cm is too short; 4 cm is the smallest whole-number width.",
        },
        {
          title: "A mast between two villages",
          problem:
            "On a map, villages A and B are 8 cm apart. A phone mast must be equidistant from A and B **and** exactly 5 cm from A on the map. How many possible positions are there, and how would you find them?",
          steps: [
            "\"Equidistant from A and B\" means the mast is on the perpendicular bisector of AB. Construct it.",
            "\"5 cm from A\" means the mast is on a circle of radius 5 cm centred at A. Draw it with compasses.",
            "The mast must be on both, so look where they cross. 5 cm is more than half of 8 cm (4 cm), so the circle crosses the bisector twice — once on each side of AB.",
            "So there are 2 positions. (Had the distance been less than 4 cm, there would be none.)",
          ],
          answer: "2 positions, one on each side of AB.",
        },
      ],
      keyPoints: [
        "Compasses wider than half the segment, and the same width from both ends.",
        "The bisector passes through the midpoint at 90°.",
        "Every point on it is equidistant from A and B.",
        "\"Same distance from two points\" → perpendicular bisector.",
      ],
      whyItWorks:
        "Join P and Q to A and B. All four lengths PA, PB, QA and QB equal the compass radius, so APBQ is a **rhombus** (four equal sides). The diagonals of a rhombus always cut each other in half at right angles — so PQ meets AB exactly at its midpoint, at 90°. Another way to see it: the whole figure is symmetrical, and reflecting it in the line PQ swaps A and B. A mirror line always crosses the segment joining a point to its image at right angles, through its midpoint.",
      strategies: ["Use symmetry", "Draw a diagram", "One condition at a time, then find where they overlap"],
      thinkDeeper:
        "Three villages A, B and C are not in a straight line. Where should a mast go to be equidistant from all three? Construct the perpendicular bisectors of AB and BC. Explain why the perpendicular bisector of AC *must* pass through the same point.",
    },
    // -----------------------------------------------------------------------
    {
      id: "angle-bisector",
      heading: "Angle bisector & perpendicular from a point",
      discovery: {
        problem:
          "You are standing at point P in a field, 30 m from a long, straight fence. You want to touch the fence after walking as short a distance as possible. Which direction should you walk? Then: how could you mark that direction exactly with only compasses and a ruler — no protractor?",
        idea:
          "The shortest route meets the fence at **right angles**; any slanting route is longer. Compasses can find that direction: an arc centred at P cuts the fence at two points that are equally far from P, and the perpendicular bisector of those two points passes straight through P.",
      },
      body:
        "**Angle bisector.** The **angle bisector** is the line that splits an angle into two equal angles.\n\n1. Put the compass point on the vertex O. Draw an arc that cuts both arms; call the crossings D and E.\n2. Put the compass point on D and draw an arc inside the angle. **Keeping the same width**, do the same from E so that the two arcs cross at F.\n3. Rule a line from O through F. It bisects the angle.\n\nEvery point on an angle bisector is the **same distance from both arms** — the bisector is the set of points equidistant from two lines that meet.\n\n**Perpendicular from a point to a line.** For a point P that is not on a line l:\n\n1. Put the compass point on P and draw an arc that cuts l twice, at G and H.\n2. From G and from H, draw arcs of equal radius on the **other side** of l so that they cross at K.\n3. Rule the line from P to K. It meets l at 90°; call the meeting point N.\n\n**Shortest distance.** \"The distance from a point to a line\" always means the **perpendicular distance** PN. Any other route from P to the line, such as PX, is the longest side of the right-angled triangle PNX — the side opposite the right angle, called the **hypotenuse** — so it is longer than PN.\n\n**Perpendicular at a point on a line.** If the point is *on* the line, put the compass point on it, mark two points on the line at equal distances either side, then construct the perpendicular bisector of those two marks.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: bisecting an angle at O with compass arcs; the bisector OF splits the angle into two equal parts. Right: dropping a perpendicular from point P to line l; arcs from G and H meet at K, and PK meets l at N at a right angle."><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><line x1="20" y1="250" x2="228" y2="250" stroke="#1f2937" stroke-width="2.5"/><line x1="20" y1="250" x2="161.4" y2="81.5" stroke="#1f2937" stroke-width="2.5"/><path d="M 109.5 259.4 A 90 90 0 0 0 70.3 175.4" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 165.3 199.3 A 75 75 0 0 0 137.5 180.2" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 149.1 204.8 A 75 75 0 0 0 152.2 171.2" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="20" y1="250" x2="221.2" y2="156.2" stroke="#15803d" stroke-width="2"/><path d="M 58 250 A 38 38 0 0 0 54.4 233.9" fill="none" stroke="#7c3aed" stroke-width="1.5"/><line x1="52.2" y1="242.9" x2="62" y2="240.7" stroke="#7c3aed" stroke-width="1.5"/><line x1="46.2" y1="229.9" x2="54.1" y2="223.8" stroke="#7c3aed" stroke-width="1.5"/><path d="M 54.4 233.9 A 38 38 0 0 0 44.4 220.9" fill="none" stroke="#7c3aed" stroke-width="1.5"/><circle cx="20" cy="250" r="3" fill="#1f2937"/><text x="16" y="270" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">O</text><circle cx="110" cy="250" r="3" fill="#1f2937"/><text x="106" y="270" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">D</text><circle cx="77.9" cy="181.1" r="3" fill="#1f2937"/><text x="61.900000000000006" y="177.1" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">E</text><circle cx="152.5" cy="188.2" r="3" fill="#1f2937"/><text x="158.5" y="182.2" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">F</text><text x="12" y="22" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">Angle bisector</text><line x1="246" y1="10" x2="246" y2="290" stroke="#cbd5e1" stroke-width="1"/><line x1="258" y1="220" x2="474" y2="220" stroke="#1f2937" stroke-width="2.5"/><path d="M 267.3 209.1 A 170 170 0 0 0 462.7 209.1" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 352.1 294.2 A 100 100 0 0 0 375 263.6" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 355 263.6 A 100 100 0 0 0 377.9 294.2" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="365" y1="70" x2="365" y2="280" stroke="#15803d" stroke-width="2"/><line x1="365" y1="70" x2="410" y2="220" stroke="#64748b" stroke-width="1.3" stroke-dasharray="4 3"/><text x="397" y="150" font-size="11" font-family="sans-serif" fill="#64748b">longer</text><text x="300" y="150" font-size="11" font-family="sans-serif" fill="#15803d">shortest</text><path d="M 365 208 L 377 208 L 377 220" fill="none" stroke="#1f2937" stroke-width="1.2"/><circle cx="365" cy="70" r="3" fill="#1f2937"/><text x="373" y="66" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">P</text><circle cx="285" cy="220" r="3" fill="#1f2937"/><text x="271" y="212" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">G</text><circle cx="445" cy="220" r="3" fill="#1f2937"/><text x="447" y="212" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">H</text><circle cx="365" cy="280" r="3" fill="#1f2937"/><text x="373" y="284" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">K</text><circle cx="365" cy="220" r="3" fill="#1f2937"/><text x="349" y="238" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">N</text><circle cx="410" cy="220" r="3" fill="#1f2937"/><text x="412" y="238" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">X</text><text x="464" y="238" font-size="13" font-style="italic" font-family="sans-serif" fill="#1f2937">l</text><text x="258" y="22" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">Perpendicular from P</text></svg>`,
      diagramCaption:
        "Left: equal arcs from D and E fix F, and OF cuts the angle into two equal parts. Right: arcs from G and H meet at K; PK meets l at N at 90°, and PN is shorter than any slanting route such as PX.",
      workedExamples: [
        {
          title: "Halving, then halving again",
          problem:
            "An angle of 136° is bisected. One of the two halves is then bisected again. How big is each of the smallest angles?",
          steps: [
            "The first bisector splits 136° into two angles of 136 ÷ 2 = 68°.",
            "Bisecting one of those gives two angles of 68 ÷ 2 = 34°.",
          ],
          answer: "34°",
          yourTurn: {
            question: "A reflex angle of 250° is bisected. How big is each half, in degrees?",
            answer: { type: "number", value: 125, display: "125°" },
            solution: "250 ÷ 2 = 125°. Notice that halving a reflex angle always gives two obtuse angles.",
          },
        },
        {
          title: "An angle bisector inside a triangle",
          problem:
            "In triangle ABC, angle A = 70° and angle B = 50°. The bisector of angle A meets BC at D. Find angle ADB.",
          steps: [
            "The bisector halves angle A: angle BAD = 70° ÷ 2 = 35°.",
            "Look at triangle ABD. Its angles add to 180°.",
            "Angle ADB = 180° − 35° − 50° = 95°.",
            "Check with the other triangle: angle C = 180° − 70° − 50° = 60°, so angle ADC = 180° − 35° − 60° = 85°, and 95° + 85° = 180° on the straight line BC.",
          ],
          answer: "95°",
        },
        {
          title: "Spot the impossible claim",
          problem:
            "A lifeguard tower T is 40 m from a straight shoreline (the perpendicular distance). Ethan says a swimmer standing at point S on the shoreline is 35 m from the tower. Explain why he must be wrong.",
          steps: [
            "The perpendicular distance is the **shortest** distance from T to the shoreline.",
            "So every point on the shoreline is **at least** 40 m from T.",
            "35 m is less than 40 m, so no point on the shoreline can be 35 m from T. Ethan has made a mistake.",
          ],
          answer: "Impossible: nowhere on the shoreline is closer than 40 m to T.",
        },
      ],
      keyPoints: [
        "Angle bisector: one arc from the vertex, then equal arcs from the two crossings.",
        "Every point on an angle bisector is equidistant from the two arms.",
        "Perpendicular from P: an arc from P cuts the line twice; then bisect between those points.",
        "The distance from a point to a line is the perpendicular distance — the shortest one.",
      ],
      whyItWorks:
        "In the angle bisector construction, OD = OE (same arc) and DF = EF (same compass width), and OF is shared. So triangles ODF and OEF have all three sides equal — they are **congruent** (identical in shape and size), by SSS. Matching angles in congruent triangles are equal, so angle DOF = angle EOF: the angle is cut exactly in half. For the perpendicular from P: G and H lie on one arc centred at P, so PG = PH, which means P is equidistant from G and H and so lies on the perpendicular bisector of GH. K is equidistant from G and H too, so the line PK *is* that perpendicular bisector — and it meets l at 90°.",
      strategies: ["Look for congruent triangles", "Consider extremes", "Draw a diagram"],
      thinkDeeper:
        "Construct the bisectors of all three angles of a triangle. They meet at a single point. Why must that point be the same distance from all three sides? What circle could you then draw?",
    },
    // -----------------------------------------------------------------------
    {
      id: "bearings",
      heading: "Three-figure bearings",
      discovery: {
        problem:
          "Aisha tells a friend: \"Walk off at 45°.\" Sketch at least four different directions she could mean. What rules would make a single angle describe exactly one direction — for everyone, everywhere?",
        idea:
          "You need a fixed **starting direction** and a fixed **way of turning**. Navigators agree to start from **North** and turn **clockwise**. With those rules every direction is one angle, written with **three figures** — so 45° becomes **045°** — and nobody can mishear or misread it.",
      },
      body:
        "A **bearing** is a direction given as an angle that is:\n\n1. measured from **North**,\n2. measured **clockwise**,\n3. written with **three figures** (use zeros in front: 7° → 007°, 45° → 045°).\n\nBearings go from 000° round to just under 360° — a full turn of 360° brings you back to North, which is written 000°.\n\n| Direction | Bearing |\n|---|---|\n| North | 000° |\n| North-east | 045° |\n| East | 090° |\n| South-east | 135° |\n| South | 180° |\n| South-west | 225° |\n| West | 270° |\n| North-west | 315° |\n\n**\"The bearing of B from A\"** — the word *from* tells you where to stand. Stand at **A**, draw a North line at A, and turn clockwise until you face B.\n\n**Measuring a bearing**\n\n1. Draw (or find) the North line at the point you are measuring *from*.\n2. Join that point to the other point.\n3. Measure the clockwise angle from North to that line. If it is more than 180°, it is easier to measure the anticlockwise angle and subtract it from 360°.\n\n**Drawing a bearing**, for example 230° from A: draw the North line at A. Because 230° is more than 180°, either measure 230° − 180° = 50° on from South, or measure 360° − 230° = 130° anticlockwise from North. Rule the line and label the bearing.",
      diagram: `<svg viewBox="0 0 480 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Bearings from point A. North is 000 degrees, East 090, South 180, West 270. B is on a bearing of 060 degrees and C is on a bearing of 230 degrees, both measured clockwise from North."><rect x="0" y="0" width="480" height="320" fill="#ffffff"/><line x1="240" y1="290" x2="240" y2="40" stroke="#334155" stroke-width="1.2"/><line x1="115" y1="165" x2="365" y2="165" stroke="#94a3b8" stroke-width="1" stroke-dasharray="3 3"/><polygon points="240,25 233,43 247,43" fill="#1f2937"/><text x="252" y="37" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">N 000°</text><text x="370" y="169" font-size="12" font-family="sans-serif" fill="#334155">E 090°</text><text x="248" y="303" font-size="12" font-family="sans-serif" fill="#334155">S 180°</text><text x="58" y="169" font-size="12" font-family="sans-serif" fill="#334155">W 270°</text><line x1="240" y1="165" x2="361.2" y2="95" stroke="#2563eb" stroke-width="2.5"/><line x1="240" y1="165" x2="132.8" y2="255" stroke="#b45309" stroke-width="2.5"/><path d="M 240 120 A 45 45 0 0 1 279 142.5" fill="none" stroke="#2563eb" stroke-width="2"/><path d="M 240 73 A 92 92 0 1 1 169.5 224.1" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="6 3"/><text x="263.2" y="111.3" font-size="13" font-weight="bold" font-family="sans-serif" fill="#2563eb">060°</text><text x="325.1" y="235.5" font-size="13" font-weight="bold" font-family="sans-serif" fill="#b45309">230°</text><circle cx="240" cy="165" r="3.5" fill="#1f2937"/><text x="248" y="185" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><circle cx="361.2" cy="95" r="3.5" fill="#1f2937"/><text x="367.2" y="91" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><circle cx="132.8" cy="255" r="3.5" fill="#1f2937"/><text x="116.80000000000001" y="267" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">C</text></svg>`,
      diagramCaption:
        "Bearings are measured clockwise from North. B is on a bearing of 060° from A; C is on a bearing of 230° from A.",
      workedExamples: [
        {
          title: "Compass directions as bearings",
          problem: "Write each as a three-figure bearing: (a) due West (b) south-east (c) 8° clockwise from North.",
          steps: [
            "(a) West is three right angles clockwise from North: 3 × 90° = 270°.",
            "(b) South-east is halfway between East (090°) and South (180°): 135°.",
            "(c) 8° is written 008° — always three figures.",
          ],
          answer: "(a) 270° (b) 135° (c) 008°",
          yourTurn: {
            question: "What is the three-figure bearing of north-west? Give the number of degrees.",
            answer: { type: "number", value: 315, display: "315°" },
            solution: "North-west is halfway between West (270°) and North (360°): 270° + 45° = 315°.",
          },
        },
        {
          title: "Turning the other way",
          problem:
            "At A, the angle from the North line to the line AB, measured **anticlockwise**, is 72°. What is the bearing of B from A?",
          steps: [
            "Bearings are clockwise, so go the other way round.",
            "A full turn is 360°, so the clockwise angle is 360° − 72° = 288°.",
          ],
          answer: "288°",
        },
        {
          title: "Building a bearing from angles",
          problem:
            "A lighthouse L is due East of a harbour H. A boat B is south of the line HL, and angle LHB = 35°. Find the bearing of B from H.",
          steps: [
            "Stand at H facing North. The lighthouse, due East, is on 090°.",
            "B is 35° further round clockwise than East, because it is south of the line HL.",
            "Bearing = 090° + 35° = 125°.",
          ],
          answer: "125°",
        },
      ],
      keyPoints: [
        "From North, clockwise, three figures.",
        "\"The bearing of B from A\" → stand at A.",
        "For bearings over 180°, use 360° − the anticlockwise angle.",
        "Know the eight compass points as bearings.",
      ],
      whyItWorks:
        "On a flat map, a distance and an angle pin down any point — but only if everyone measures the angle from the same starting line and turns the same way. North points the same way everywhere on a map, so North lines drawn at different points are all **parallel**. That shared, parallel reference is what makes bearings reliable, and it is exactly what makes back bearings possible in the next section.",
      strategies: ["Draw a diagram (North line first)", "Use the inverse (360° minus the anticlockwise angle)", "Estimate first"],
      thinkDeeper:
        "A ship sails on a bearing of 300°, then turns 90° clockwise. What is its new bearing? It turns 90° clockwise again — and again. After four turns it is back on 300°. Why must that happen, whatever the starting bearing?",
    },
    // -----------------------------------------------------------------------
    {
      id: "back-bearings",
      heading: "Back bearings",
      discovery: {
        problem:
          "Priya walks from her flat F to the MRT station S on a bearing of 065°. Later she walks straight back home. On what bearing is she walking now? Find it *without* working out 360° − 65°.",
        idea:
          "Walking back means facing the exact opposite way — a half turn. So the return bearing is 065° + 180° = **245°**. (360° − 65° = 295° is a classic wrong answer: it reflects the direction in the North line instead of reversing it.)",
      },
      body:
        "The **back bearing** is the bearing for the return journey: if the bearing of B from A is known, the back bearing is the bearing of A from B.\n\nReversing a direction is a half turn, so:\n\n- if the bearing is **less than 180°**, **add** 180°;\n- if the bearing is **180° or more**, **subtract** 180°.\n\nThis keeps the answer between 000° and 360°.\n\n| Bearing of B from A | Bearing of A from B |\n|---|---|\n| 065° | 245° |\n| 120° | 300° |\n| 180° | 000° |\n| 200° | 020° |\n| 310° | 130° |\n\n**Quick checks:** a bearing and its back bearing always differ by exactly 180°. And if B is to the east of A (bearing between 000° and 180°), then A is to the west of B (back bearing between 180° and 360°).\n\n**Angles at a turn.** Where a journey changes direction, draw a North line and use a back bearing to find the angle between the two legs. A boat sails from P to Q on 040°, then from Q to R on 130°. At Q, the bearing back to P is 040° + 180° = 220°, so angle PQR = 220° − 130° = 90°.",
      diagram: `<svg viewBox="0 0 480 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Back bearing. The bearing of B from A is 065 degrees. North lines at A and B are parallel. At B, the angle from South to the line BA is also 65 degrees (alternate angles), so the bearing of A from B is 180 plus 65, which is 245 degrees."><rect x="0" y="0" width="480" height="300" fill="#ffffff"/><line x1="120" y1="255" x2="120" y2="85" stroke="#334155" stroke-width="1.5"/><polygon points="120,75 114,90 126,90" fill="#1f2937"/><text x="115" y="70" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">N</text><line x1="328.5" y1="137.8" x2="328.5" y2="42.80000000000001" stroke="#334155" stroke-width="1.5"/><polygon points="328.5,32.8 322.5,47.8 334.5,47.8" fill="#1f2937"/><text x="323.5" y="27.8" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">N</text><line x1="328.5" y1="137.8" x2="328.5" y2="277.8" stroke="#334155" stroke-width="1.3" stroke-dasharray="5 4"/><text x="334.5" y="275.8" font-size="12" font-family="sans-serif" fill="#334155">S</text><line x1="120" y1="235" x2="328.5" y2="137.8" stroke="#1f2937" stroke-width="2.5"/><path d="M 120 235 L 120 187 A 48 48 0 0 1 163.5 214.7 Z" fill="#bae6fd" fill-opacity="0.6" stroke="none"/><path d="M 120 187 A 48 48 0 0 1 163.5 214.7" fill="none" stroke="#2563eb" stroke-width="2"/><text x="151" y="181.3" font-size="13" font-weight="bold" font-family="sans-serif" fill="#2563eb">65°</text><path d="M 328.5 137.8 L 328.5 185.8 A 48 48 0 0 1 285 158.1 Z" fill="#bae6fd" fill-opacity="0.6" stroke="none"/><path d="M 328.5 185.8 A 48 48 0 0 1 285 158.1" fill="none" stroke="#2563eb" stroke-width="2"/><text x="289.5" y="203.8" font-size="13" font-weight="bold" font-family="sans-serif" fill="#2563eb">65°</text><path d="M 328.5 107.8 A 30 30 0 1 1 301.3 150.5" fill="none" stroke="#b45309" stroke-width="2" stroke-dasharray="5 3"/><text x="372.3" y="145.6" font-size="13" font-weight="bold" font-family="sans-serif" fill="#b45309">245°</text><circle cx="120" cy="235" r="3.5" fill="#1f2937"/><text x="102" y="241" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><circle cx="328.5" cy="137.8" r="3.5" fill="#1f2937"/><text x="308.5" y="131.8" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><text x="12" y="290" font-size="12" font-family="sans-serif" fill="#334155">bearing of A from B = 180° + 65° = 245°</text></svg>`,
      diagramCaption:
        "North lines at A and B are parallel. The 65° at A and the 65° between South and BA at B are alternate angles, so the bearing of A from B is 180° + 65° = 245°.",
      workedExamples: [
        {
          title: "Add or subtract?",
          problem: "The bearing of Q from P is 298°. Find the bearing of P from Q.",
          steps: [
            "298° is more than 180°, so subtract 180°.",
            "298° − 180° = 118°.",
            "Check: 118° + 180° = 298°, and 118° is between 000° and 360°.",
          ],
          answer: "118°",
          yourTurn: {
            question:
              "The bearing of a jetty J from a boat B is 052°. What is the bearing of the boat from the jetty? Give the number of degrees.",
            answer: { type: "number", value: 232, display: "232°" },
            solution: "052° is less than 180°, so add 180°: 052° + 180° = 232°.",
          },
        },
        {
          title: "Proving the 180° rule with parallel lines",
          problem:
            "The bearing of B from A is 065°. Use parallel lines to explain why the bearing of A from B is 245°.",
          steps: [
            "The North lines at A and B are parallel.",
            "Extend the North line at B downwards so that it points South.",
            "The angle between South at B and the line BA equals the 65° at A: they are **alternate angles** (a Z-shape) between parallel lines.",
            "Turning clockwise from North at B: 180° to reach South, then 65° more to face A.",
            "So the bearing of A from B is 180° + 65° = 245°.",
          ],
          answer: "245° = 180° + 65°",
        },
        {
          title: "The angle at a turning point",
          problem:
            "A hiker walks from A to B on a bearing of 075°, then from B to C on a bearing of 190°. Find angle ABC.",
          steps: [
            "Draw a North line at B.",
            "The bearing of A from B is the back bearing: 075° + 180° = 255°.",
            "The bearing of C from B is 190°.",
            "Both are measured clockwise from the same North line, so the angle between BA and BC is 255° − 190° = 65°.",
          ],
          answer: "Angle ABC = 65°",
        },
      ],
      keyPoints: [
        "Back bearing = bearing ± 180°: add if under 180°, subtract if 180° or more.",
        "A bearing and its back bearing always differ by exactly 180°.",
        "North lines are parallel, so alternate and co-interior angle facts apply.",
        "Never use 360° − bearing for a return journey.",
      ],
      whyItWorks:
        "Going back the way you came is a half turn: 180°. The parallel-lines picture proves it. The North lines at A and B are parallel, so the angle between South at B and the line BA equals the bearing at A (alternate angles). From North at B you turn 180° to South, then that same angle again. **Co-interior angles** (a C-shape between parallel lines, adding to 180°) give the same result: the 65° at A and the anticlockwise angle from North at B to BA add to 180°, so that angle is 115° and the clockwise bearing is 360° − 115° = 245°.",
      strategies: ["Draw a diagram with a North line at every point", "Use parallel-line angle facts", "Check by reasonableness"],
      thinkDeeper:
        "The bearing of B from A is x°, where x is less than 180. Write the bearing of A from B as an expression in x. For which value of x is the back bearing exactly **three times** the bearing?",
    },
    // -----------------------------------------------------------------------
    {
      id: "scale-drawings",
      heading: "Scale drawings & maps",
      discovery: {
        problem:
          "A map has a scale of **1 : 50 000**. On it, a beach path on Sentosa measures 6 cm. Is the real path about 300 m, 3 km or 30 km? Decide *before* you calculate — then check.",
        idea:
          "1 : 50 000 means every 1 cm on the map stands for 50 000 cm in real life. So 6 cm stands for 6 × 50 000 = 300 000 cm = 3000 m = **3 km**. The scale multiplies every length by the same number — then you convert to sensible units at the end.",
      },
      body:
        "A **scale drawing** is an accurate drawing in which every length is divided by the same number, while every **angle stays the same**. That is why you can measure bearings straight off a map.\n\nScales are written in two ways:\n\n- **In words:** \"1 cm represents 2 km\" (sometimes written 1 cm : 2 km).\n- **As a ratio:** **1 : 50 000** — no units, because 1 of anything on the map stands for 50 000 of the same unit in real life.\n\n**Converting**\n\n| Map → real | Real → map |\n|---|---|\n| multiply by the scale number | divide by the scale number |\n| 4 cm × 50 000 = 200 000 cm = 2 km | 7 km = 700 000 cm, and 700 000 ÷ 50 000 = 14 cm |\n\nThe unit chain to know:\n\n    1 km = 1000 m = 100 000 cm\n\n**Journey problems** combine a scale with bearings:\n\n1. Choose a sensible scale and draw a North line at the start.\n2. Draw the first leg on its bearing, at its scaled length.\n3. Draw a **new North line** at the end of that leg, parallel to the first.\n4. Draw the next leg from there.\n5. Measure the length and bearing you need, then convert back using the scale.",
      diagram: `<svg viewBox="0 0 480 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Scale drawing of a journey. From port P the boat sails 8 km on a bearing of 070 degrees to Q, then 6 km on a bearing of 160 degrees to R. North lines are drawn at P and Q. The direct route PR is dashed."><rect x="0" y="0" width="480" height="280" fill="#ffffff"/><line x1="70" y1="150" x2="70" y2="55" stroke="#334155" stroke-width="1.5"/><polygon points="70,45 65,57 75,57" fill="#1f2937"/><text x="66" y="41" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">N</text><line x1="235.4" y1="89.8" x2="235.4" y2="39.8" stroke="#334155" stroke-width="1.5"/><polygon points="235.4,29.8 230.4,41.8 240.4,41.8" fill="#1f2937"/><text x="231.4" y="25.8" font-size="12" font-weight="bold" font-family="sans-serif" fill="#1f2937">N</text><line x1="70" y1="150" x2="235.4" y2="89.8" stroke="#2563eb" stroke-width="2.5"/><line x1="235.4" y1="89.8" x2="280.5" y2="213.8" stroke="#b45309" stroke-width="2.5"/><line x1="70" y1="150" x2="280.5" y2="213.8" stroke="#15803d" stroke-width="2" stroke-dasharray="6 4"/><path d="M 70 114 A 36 36 0 0 1 103.8 137.7" fill="none" stroke="#2563eb" stroke-width="1.8"/><text x="92.5" y="107.6" font-size="12" font-weight="bold" font-family="sans-serif" fill="#2563eb">070°</text><path d="M 235.4 61.8 A 28 28 0 0 1 245 116.1" fill="none" stroke="#b45309" stroke-width="1.8"/><text x="273" y="76.1" font-size="12" font-weight="bold" font-family="sans-serif" fill="#b45309">160°</text><path d="M 224.1 93.9 L 228.2 105.2 L 239.5 101.1" fill="none" stroke="#1f2937" stroke-width="1.2"/><text x="138.7" y="105.9" font-size="12" font-family="sans-serif" fill="#2563eb">8 km</text><text x="268" y="151.8" font-size="12" font-family="sans-serif" fill="#b45309">6 km</text><text x="155.3" y="203.9" font-size="12" font-family="sans-serif" fill="#15803d">? km</text><circle cx="70" cy="150" r="3.5" fill="#1f2937"/><text x="52" y="156" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">P</text><circle cx="235.4" cy="89.8" r="3.5" fill="#1f2937"/><text x="243.4" y="93.8" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">Q</text><circle cx="280.5" cy="213.8" r="3.5" fill="#1f2937"/><text x="288.5" y="225.8" font-size="14" font-weight="bold" font-family="sans-serif" fill="#1f2937">R</text><text x="300" y="243" font-size="11" font-family="sans-serif" fill="#334155">Scale: 1 cm represents 2 km</text><rect x="300" y="255" width="44" height="7" fill="#334155" stroke="#334155" stroke-width="1"/><rect x="344" y="255" width="44" height="7" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="388" y="255" width="44" height="7" fill="#334155" stroke="#334155" stroke-width="1"/><rect x="432" y="255" width="44" height="7" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="300" y="275" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">0</text><text x="344" y="275" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">2</text><text x="388" y="275" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">4</text><text x="432" y="275" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">6</text><text x="476" y="275" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">8</text><text x="490" y="263" font-size="11" font-family="sans-serif" fill="#334155">km</text></svg>`,
      diagramCaption:
        "Scale 1 cm : 2 km. P to Q is 8 km on 070°, then Q to R is 6 km on 160°, with a fresh North line at Q. Measuring PR gives the direct route.",
      workedExamples: [
        {
          title: "Map scale both ways",
          problem:
            "A map has a scale of 1 : 25 000. (a) Two MRT stations are 9 cm apart on the map. How far apart are they in real life, in km? (b) A real road is 1.5 km long. How long is it on the map?",
          steps: [
            "(a) 9 × 25 000 = 225 000 cm.",
            "225 000 cm ÷ 100 = 2250 m, and 2250 m ÷ 1000 = 2.25 km.",
            "(b) 1.5 km = 1500 m = 150 000 cm.",
            "150 000 ÷ 25 000 = 6 cm.",
          ],
          answer: "(a) 2.25 km (b) 6 cm",
          yourTurn: {
            question:
              "A map has a scale of 1 : 20 000. A hawker centre and a park are 7.5 cm apart on the map. How far apart are they in real life? Give your answer in km.",
            answer: { type: "number", value: 1.5, display: "1.5 km" },
            solution: "7.5 × 20 000 = 150 000 cm = 1500 m = 1.5 km.",
          },
        },
        {
          title: "A journey with bearings",
          problem:
            "A boat sails 8 km from port P on a bearing of 070° to a buoy Q, then 6 km on a bearing of 160° to a lighthouse R. Using a scale of 1 cm to 2 km, find the distance and bearing of R from P.",
          steps: [
            "Scaled lengths: PQ = 8 ÷ 2 = 4 cm and QR = 6 ÷ 2 = 3 cm.",
            "Draw a North line at P, measure 070° clockwise and rule PQ = 4 cm.",
            "Draw a new North line at Q, measure 160° clockwise and rule QR = 3 cm.",
            "Rule PR and measure it: 5.0 cm, so the real distance is 5 × 2 = 10 km.",
            "Measure the clockwise angle from North at P to PR: about 107°.",
            "Check: the bearing of P from Q is 250°, and 250° − 160° = 90°, so the turn at Q is a right angle. A 3 cm, 4 cm, 5 cm right-angled triangle confirms PR = 5 cm.",
          ],
          answer: "10 km, on a bearing of about 107°",
        },
        {
          title: "Choosing a scale",
          problem:
            "Marcus must draw a park that measures 4.2 km by 2.8 km on A4 paper (about 27 cm by 19 cm). Is a scale of 1 cm : 100 m sensible? Suggest a better one.",
          steps: [
            "At 1 cm : 100 m, 4.2 km = 4200 m becomes 4200 ÷ 100 = 42 cm — far too long for the page.",
            "Try 1 cm : 200 m: 4200 ÷ 200 = 21 cm and 2800 ÷ 200 = 14 cm.",
            "21 cm by 14 cm fits on A4 with room for labels, so 1 cm : 200 m works. As a ratio, 200 m = 20 000 cm, so the scale is 1 : 20 000.",
          ],
          answer: "No; use 1 cm : 200 m (1 : 20 000).",
        },
      ],
      keyPoints: [
        "Lengths are scaled, angles are not — bearings can be measured straight off a map.",
        "Map → real: multiply. Real → map: divide.",
        "Convert units carefully: 1 km = 100 000 cm.",
        "Draw a new, parallel North line at every turning point.",
      ],
      whyItWorks:
        "A scale drawing is an **enlargement** of the real situation by a tiny scale factor, such as {{1/50000}}. An enlargement multiplies every length by the same number but keeps the shape exactly — so every angle, including every bearing, is unchanged. That is why you can draw a journey at 1 cm : 2 km, measure an angle with a protractor, and the angle you measure *is* the real bearing.",
      strategies: ["Draw a diagram to scale", "Estimate first", "Work in one unit, convert at the end"],
      thinkDeeper:
        "On a 1 : 50 000 map, a square park has an area of 4 cm². Is its real area 4 × 50 000 cm²? Work out the real area in km² and explain why areas do not scale in the same way as lengths.",
    },
    // -----------------------------------------------------------------------
    {
      id: "loci",
      heading: "Loci & special angles",
      discovery: {
        problem:
          "A goat is tied by a 5 m rope to a post in the middle of a large field. Shade every point the goat can reach. Now the rope is tied instead to a ring that slides along a straight 10 m rail. What shape can the goat reach now?",
        idea:
          "With the post, the goat reaches every point **within 5 m of a point** — a circle and its inside. With the rail, it reaches every point within 5 m of a **line segment** — a rectangle with a semicircle on each end, like a running track. Describing all the points that obey a rule is called finding a **locus**.",
      },
      body:
        "**Stretch:** A **locus** (plural **loci**) is the set of all points that obey a rule. Four loci to know:\n\n| Rule | Locus |\n|---|---|\n| a fixed distance from a point | a **circle** centred on the point |\n| a fixed distance from a line segment | two parallel lines joined by **semicircles** (a running-track shape) |\n| equidistant from two points A and B | the **perpendicular bisector** of AB |\n| equidistant from two lines that meet | the **angle bisector** |\n\nRead the wording carefully. \"**Less than** 3 cm from P\" is the region *inside* the circle; draw the circle dashed, because points exactly 3 cm away are not included. \"**At least** 3 cm from P\" is the region outside, including the circle itself, so draw it solid. When a problem gives two rules, construct each one and look for where the regions **overlap**.\n\n**Special angles with compasses only**\n\n- **60°:** rule a line and mark A on it. With any radius, draw an arc from A cutting the line at B. With the **same radius**, draw an arc from B to cut the first arc at C. Rule AC: angle CAB = 60°, because triangle ABC is equilateral.\n- **30°:** construct 60°, then bisect it.\n- **90°:** construct the perpendicular at a point on a line.\n- **45°:** construct 90°, then bisect it.\n\n**Regular polygons:** keep the compasses at the radius of a circle and step round its edge — the radius fits exactly **6** times, marking a regular **hexagon**. Joining every other mark gives an **equilateral triangle**.",
      diagram: `<svg viewBox="0 0 480 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three loci and constructions. Left: points 2 centimetres from O form a circle. Middle: points a fixed distance from a line segment form a running-track shape. Right: equal arcs from A and B meet at C, making an equilateral triangle, so angle CAB is 60 degrees."><rect x="0" y="0" width="480" height="250" fill="#ffffff"/><circle cx="80" cy="125" r="50" fill="none" stroke="#15803d" stroke-width="2.5"/><circle cx="80" cy="125" r="3" fill="#1f2937"/><text x="86" y="140" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">O</text><line x1="80" y1="125" x2="30" y2="125" stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3"/><text x="55" y="119" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">2 cm</text><text x="80" y="24" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">From a point</text><text x="80" y="215" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">a circle, centre O</text><path d="M 205 85 L 275 85 A 40 40 0 0 1 275 165 L 205 165 A 40 40 0 0 1 205 85 Z" fill="none" stroke="#15803d" stroke-width="2.5"/><line x1="205" y1="125" x2="275" y2="125" stroke="#1f2937" stroke-width="3"/><circle cx="205" cy="125" r="3" fill="#1f2937"/><circle cx="275" cy="125" r="3" fill="#1f2937"/><line x1="240" y1="125" x2="240" y2="85" stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3"/><line x1="275" y1="125" x2="303.3" y2="96.7" stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3"/><text x="240" y="24" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">From a segment</text><text x="240" y="215" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">a running-track shape</text><line x1="160" y1="10" x2="160" y2="240" stroke="#cbd5e1" stroke-width="1"/><line x1="320" y1="10" x2="320" y2="240" stroke="#cbd5e1" stroke-width="1"/><line x1="338" y1="190" x2="472" y2="190" stroke="#1f2937" stroke-width="2.5"/><path d="M 437.5 200.5 A 100 100 0 0 0 378.7 98.6" fill="none" stroke="#2563eb" stroke-width="1.5" stroke-dasharray="5 3"/><path d="M 400.5 97.3 A 100 100 0 0 0 376.4 111.2" fill="none" stroke="#b45309" stroke-width="1.5" stroke-dasharray="5 3"/><line x1="338" y1="190" x2="408" y2="68.8" stroke="#1f2937" stroke-width="2.5"/><line x1="438" y1="190" x2="388" y2="103.4" stroke="#64748b" stroke-width="1.2" stroke-dasharray="3 3"/><path d="M 364 190 A 26 26 0 0 0 351 167.5" fill="none" stroke="#7c3aed" stroke-width="1.8"/><text x="368" y="180" font-size="12" font-weight="bold" font-family="sans-serif" fill="#7c3aed">60°</text><circle cx="338" cy="190" r="3" fill="#1f2937"/><text x="334" y="210" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">A</text><circle cx="438" cy="190" r="3" fill="#1f2937"/><text x="434" y="210" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">B</text><circle cx="388" cy="103.4" r="3" fill="#1f2937"/><text x="358" y="97.4" font-size="13" font-weight="bold" font-family="sans-serif" fill="#1f2937">C</text><text x="400" y="24" font-size="12" font-weight="bold" font-family="sans-serif" text-anchor="middle" fill="#1f2937">Constructing 60°</text><text x="400" y="235" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">AB = AC = BC</text></svg>`,
      diagramCaption:
        "Left: the points exactly 2 cm from O. Middle: the points a fixed distance from a segment. Right: equal arcs from A and B meet at C, so AB = AC = BC and angle CAB is 60°.",
      workedExamples: [
        {
          title: "Constructing 30°",
          problem: "Using only compasses and a straight edge, construct an angle of 30°. Explain why it is exactly 30°.",
          steps: [
            "Rule a line and mark A. Draw an arc from A that cuts the line at B.",
            "With the same radius, draw an arc from B that cuts the first arc at C. Rule AC.",
            "AB = AC = BC (each equals the compass radius), so triangle ABC is equilateral and angle CAB = 60°.",
            "Bisect angle CAB: an arc from A cutting both arms, then equal arcs from the two crossings, then rule from A through where they meet.",
            "Each half is 60° ÷ 2 = 30°.",
          ],
          answer: "Construct 60° from an equilateral triangle, then bisect it to get 30°.",
          yourTurn: {
            question:
              "You construct a 90° angle, bisect it, then bisect one of the halves. What angle do you end up with, in degrees?",
            answer: { type: "number", value: 22.5, display: "22.5°" },
            solution: "90° ÷ 2 = 45°, then 45° ÷ 2 = 22.5°.",
          },
        },
        {
          title: "Combining two rules",
          problem:
            "A garden is a rectangle ABCD with AB = 8 m and BC = 6 m. A sprinkler at A waters everything within 5 m of A. A tree must be planted so that it is (i) equidistant from A and B, and (ii) **not** watered by the sprinkler. Where can the tree go?",
          steps: [
            "Make a scale drawing, say 1 cm to 1 m.",
            "(i) Equidistant from A and B → the perpendicular bisector of AB. It runs across the garden 4 m from A, parallel to BC.",
            "(ii) Not watered → **more than** 5 m from A → outside the circle of radius 5 m centred at A.",
            "The circle crosses the bisector at one point inside the garden. Measuring shows it is 3 m from AB (a 3 m, 4 m, 5 m right-angled triangle).",
            "So the tree can go anywhere on the bisector that is more than 3 m from AB, up to side DC.",
          ],
          answer: "On the perpendicular bisector of AB, more than 3 m from AB (as far as side DC).",
        },
      ],
      keyPoints: [
        "A locus is every point that obeys a rule.",
        "Fixed distance from a point → circle; equidistant from two points → perpendicular bisector; equidistant from two lines → angle bisector.",
        "60° comes from an equilateral triangle; bisect it for 30°, and bisect 90° for 45°.",
        "\"Less than\" → inside, dashed boundary; \"at least\" → outside, solid boundary.",
      ],
      whyItWorks:
        "Every special angle comes from a shape that compasses make perfectly. Equal arcs give equal lengths, three equal lengths give an equilateral triangle, and an equilateral triangle's angles are each 180° ÷ 3 = 60°. Bisecting halves any angle you already have, so from 60° and 90° you can reach 30°, 45°, 15°, 22.5° and more. And a circle *is* a locus by definition: it is exactly the set of points at a fixed distance from its centre.",
      strategies: ["One rule at a time, then overlap", "Draw a diagram", "Use symmetry"],
      thinkDeeper:
        "Using only compasses and a straight edge, can you construct 75°? (Think: 75 = 60 + 15.) Which whole-number angles do you think can be built this way — can you get 20°? Mathematicians argued about that one for over 2000 years.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is a bearing?", back: "A direction measured clockwise from North, written with three figures, e.g. 045°." },
      { front: "Bearings of due East, South and West?", back: "090°, 180° and 270°." },
      { front: "How do you find a back bearing?", back: "Add 180° if the bearing is less than 180°; subtract 180° if it is 180° or more." },
      { front: "\"The bearing of B from A\" — where do you stand?", back: "At A. Draw the North line at A and turn clockwise to face B." },
      { front: "Triangle inequality", back: "The two shorter sides must add to more than the longest side." },
      { front: "SSS, SAS, ASA", back: "Three sides; two sides and the angle between them; two angles and the side between them. Each fixes one triangle." },
      { front: "Perpendicular bisector of AB", back: "The line through the midpoint of AB at 90°. Every point on it is equidistant from A and B." },
      { front: "Angle bisector", back: "The line that splits an angle into two equal angles. Every point on it is equidistant from the two arms." },
      { front: "Shortest distance from a point to a line", back: "The perpendicular distance." },
      { front: "Measuring a reflex angle with a semicircular protractor", back: "Measure the angle on the other side and subtract it from 360°." },
      { front: "Inner and outer protractor readings at the same mark", back: "They add to 180°. Read the scale that starts at 0 on your first arm." },
      { front: "Scale 1 : 50 000 — what does 1 cm on the map represent?", back: "50 000 cm, which is 500 m." },
      { front: "How many centimetres in 1 km?", back: "100 000 cm (1000 m × 100)." },
      { front: "How do you construct 60° with compasses?", back: "Equal arcs from both ends of a segment make an equilateral triangle; each of its angles is 60°." },
      { front: "What is a locus?", back: "The set of all points that obey a rule, e.g. a circle is every point a fixed distance from its centre." },
    ],
    mustKnow: [
      "I can measure and draw any angle, including reflex angles, to the nearest degree.",
      "I can choose the correct protractor scale and check my reading against an estimate.",
      "I can construct a triangle from SSS, SAS or ASA, leaving my construction arcs visible.",
      "I can decide whether three lengths can make a triangle.",
      "I can construct the perpendicular bisector of a line segment and find its midpoint.",
      "I can construct the bisector of an angle.",
      "I can construct the perpendicular from a point to a line and explain why it is the shortest distance.",
      "I can measure, draw and write three-figure bearings.",
      "I can find a back bearing and explain, using parallel lines, why it differs by 180°.",
      "I can use a map scale to convert between map distances and real distances.",
      "I can draw a journey to scale using bearings and measure a distance and bearing from it.",
      "I can construct 60°, 30°, 90° and 45° angles and describe simple loci (stretch).",
    ],
    misconceptions: [
      { wrong: "A bearing can be written with one or two figures, like 60°.", right: "Bearings always have three figures: 060°." },
      {
        wrong: "The back bearing of 065° is 360° − 065° = 295°.",
        right: "A return journey is a half turn: 065° + 180° = 245°. Subtracting from 360° reflects the direction instead of reversing it.",
      },
      {
        wrong: "Bearings can be measured anticlockwise, or from whichever direction is closest.",
        right: "Always measure from North and always clockwise — even when that makes the angle bigger than 180°.",
      },
      { wrong: "Any three lengths make a triangle.", right: "The two shorter sides must add to more than the longest. 3 cm, 4 cm and 8 cm cannot meet." },
      {
        wrong: "The bearing of A from B is the same as the bearing of B from A.",
        right: "\"From B\" means stand at B. The two bearings always differ by 180°.",
      },
      {
        wrong: "On a 1 : 50 000 map, 4 cm represents 200 000 km.",
        right: "4 × 50 000 = 200 000 **cm**, which is 2000 m = 2 km. A ratio scale uses the same unit on both sides.",
      },
    ],
    examMistakes: [
      "Reading the wrong protractor scale — giving 130° for an angle that is clearly acute. Estimate first.",
      "Writing bearings with fewer than three figures, such as 45° instead of 045°.",
      "Measuring a bearing anticlockwise, or from the wrong point — check which point follows the word \"from\".",
      "Changing the compass width between the two ends of a perpendicular bisector or angle bisector construction.",
      "Rubbing out construction arcs — they are the evidence that you used compasses, and marks can be lost without them.",
      "Forgetting to convert units with a map scale, leaving an answer like 300 000 when the question asks for km.",
      "Not drawing a new North line at each turning point of a journey.",
      "Putting an angle at the wrong end of the base in an SAS or ASA construction — sketch and label first.",
    ],
    mnemonics: [
      {
        topic: "Compass points in clockwise order",
        device: "Never Eat Soggy Waffles",
        explanation: "N, E, S, W go clockwise: 000°, 090°, 180°, 270°. The halfway points NE, SE, SW and NW are 45° further on: 045°, 135°, 225°, 315°.",
      },
      {
        topic: "The three bearing rules",
        device: "North, Clockwise, Three (N-C-3)",
        explanation: "Start at North, turn clockwise, write three digits. If any one of the three is missing, it isn't a bearing.",
      },
      {
        topic: "Where to draw the North line",
        device: "FROM = FEET",
        explanation: "In \"the bearing of B from A\", your feet are at A: draw the North line at A and turn to face B.",
      },
      {
        topic: "Back bearings",
        device: "Under 180, add it on; 180 or more, take it off",
        explanation: "Add 180° to small bearings and subtract 180° from large ones, so the answer always stays between 000° and 360°.",
      },
    ],
    realWorld: [
      {
        title: "Ships in the Singapore Strait",
        detail: "In one of the world's busiest shipping lanes, vessels report their course as a three-figure bearing so that pilots and port control mean exactly the same direction.",
        emoji: "🚢",
      },
      {
        title: "Runway numbers",
        detail: "A runway is named by its bearing divided by 10 and rounded: one pointing about 020° is runway 02, and its other end, pointing the opposite way (about 200°), is 20. Changi's runways carry exactly these numbers — always 18 apart, because back bearings differ by 180°.",
        emoji: "✈️",
      },
      {
        title: "Orienteering",
        detail: "Orienteers take a bearing off a map with a compass and follow it across country — scale and bearings working together, just like a journey problem.",
        emoji: "🗺️",
      },
      {
        title: "Floor plans",
        detail: "Architects draw HDB and condo floor plans as scale drawings, often at 1 : 100, so every angle is true and every real length is 100 times the length on the plan.",
        emoji: "🏗️",
      },
      {
        title: "Placing phone masts",
        detail: "Engineers use perpendicular bisectors to find sites equally far from two towns, and circles to show how far a signal reaches — loci in action.",
        emoji: "📡",
      },
      {
        title: "Search and rescue",
        detail: "Two coastguard stations each take a bearing on a distress signal. Where the two bearing lines cross on the chart is where the boat must be.",
        emoji: "🛟",
      },
    ],
    videos: [
      { title: "Bearings", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+bearings" },
      {
        title: "Constructions: perpendicular and angle bisectors",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+constructions+bisectors",
      },
      { title: "Scale drawings and maps", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+scale+drawings" },
      { title: "Why you can't trisect an angle", channel: "Numberphile", url: "https://www.youtube.com/results?search_query=numberphile+trisect+angle" },
    ],
    formulas: [
      { name: "Three-figure bearing", formula: "Measured from North, clockwise, written with three figures: 000° to 359°", note: "East = 090°, South-west = 225°." },
      { name: "Back bearing", formula: "{{b + 180°}} if {{b < 180°}};  {{b - 180°}} if {{b >= 180°}}", note: "A bearing and its back bearing differ by exactly 180°." },
      { name: "Reflex angle", formula: "reflex angle = 360° − the angle on the other side", note: "Angles at a point add to 360°." },
      { name: "Protractor scales", formula: "inner reading + outer reading = 180°", note: "Read the scale whose 0 is on your first arm." },
      { name: "Triangle inequality", formula: "{{a + b > c}}, where c is the longest side", note: "If {{a + b = c}} the sides lie flat — no triangle." },
      { name: "Angles in a triangle", formula: "{{A + B + C = 180°}}", note: "Two given angles must add to less than 180°." },
      { name: "Map scale 1 : n", formula: "real length = map length × n;  map length = real length ÷ n", note: "1 km = 1000 m = 100 000 cm." },
    ],
  },
};
