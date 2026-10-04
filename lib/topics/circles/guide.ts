import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "circles",
  title: "Circles",
  strand: "Geometry & Measure",
  icon: "⭕",
  summary: "One remarkable number, π, measures the way round and the space inside every circle.",
  intro:
    "Every circle, from a 5-cent coin to the Singapore Flyer, is an exact scaled copy of every other circle. That is why one number, π, links the distance across a circle to the distance around it and to the space inside it. In this chapter you will discover π for yourself, see exactly where {{C = pi d}} and {{A = pi r^2}} come from, and use them on semicircles, sectors and tricky shaded shapes.",
  guide: [
    // ------------------------------------------------------------------------
    {
      id: "parts-of-a-circle",
      heading: "Parts of a circle",
      discovery: {
        problem:
          "Put a dot on your page and call it O. Mark a point exactly 3 cm from O. Then another, and another — twenty of them, pointing in all directions. What shape are your points building?\n\nNow look at all the straight lines that join two of your points. Which one is the longest, and how long is it?",
        idea:
          "Your points trace out a **circle**: every point on it is exactly 3 cm from the **centre** O, and that 3 cm is the **radius**. The longest line joining two points goes straight through the centre. It is the **diameter**, and it is two radii long: 6 cm.",
      },
      body:
        "A **circle** is the set of all points that are exactly the same distance from one fixed point, the **centre** (often labelled O). That fixed distance is the **radius**, {{r}} (plural: *radii*). Every radius of a circle has the same length, and that is what makes it a circle.\n\n| Part | What it is |\n|---|---|\n| **Centre** | The fixed point in the middle |\n| **Radius** {{r}} | A straight line from the centre to the circle |\n| **Diameter** {{d}} | A straight line across the circle *through the centre*, so {{d = 2r}} |\n| **Circumference** {{C}} | The whole distance around the circle (its perimeter) |\n| **Chord** | A straight line joining any two points on the circle |\n| **Arc** | Part of the circumference, a curved piece of the circle |\n| **Sector** | A region bounded by two radii and an arc, shaped like a pizza slice |\n| **Segment** | A region bounded by a chord and an arc |\n| **Tangent** | A straight line that touches the circle at exactly one point |\n\nIt helps to sort these into two families:\n\n- **Lines and curves (lengths):** radius, diameter, chord, tangent, arc, circumference.\n- **Regions (areas):** sector, segment, and the whole circle.\n\nA chord cuts a circle into two segments, and two radii cut it into two sectors. The smaller piece is called **minor** (minor arc, minor sector, minor segment) and the larger piece is **major**.\n\n> A tangent always meets the radius at the point where it touches at a right angle (90°). You will use this fact a lot in later years.",
      diagram: `<svg viewBox="0 0 480 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two circles. The left circle shows the centre O, a radius, a diameter, a chord and the circumference. The right circle shows a red arc, a yellow sector, a green segment, and a tangent that meets a radius at a right angle."><rect width="480" height="260" fill="#ffffff"/><text x="110" y="20" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Lines</text><text x="330" y="20" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Arcs, regions and a tangent</text><circle cx="110" cy="150" r="90" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="20" y1="150" x2="200" y2="150" stroke="#2563eb" stroke-width="2.5"/><line x1="110" y1="150" x2="155" y2="72.06" stroke="#16a34a" stroke-width="2.5"/><line x1="41.06" y1="207.85" x2="178.94" y2="207.85" stroke="#9333ea" stroke-width="2.5"/><circle cx="110" cy="150" r="3" fill="#1f2937"/><text x="110" y="168" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">O</text><text x="145" y="110" font-size="12" font-family="sans-serif" fill="#16a34a">radius</text><text x="62" y="143" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#2563eb">diameter</text><text x="110" y="200" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#9333ea">chord</text><line x1="38" y1="46" x2="46.36" y2="86.36" stroke="#334155" stroke-width="1"/><text x="8" y="40" font-size="12" font-family="sans-serif" fill="#1f2937">circumference</text><path d="M330,150 L398.94,92.15 A90,90 0 0,0 299.22,65.43 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M272.15,218.94 A90,90 0 0,0 387.85,218.94 Z" fill="#bbf7d0" stroke="#334155" stroke-width="1.2"/><circle cx="330" cy="150" r="90" fill="none" stroke="#1f2937" stroke-width="2"/><path d="M261.06,92.15 A90,90 0 0,0 245.43,180.78" fill="none" stroke="#dc2626" stroke-width="4"/><line x1="330" y1="150" x2="420" y2="150" stroke="#334155" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="420" y1="62" x2="420" y2="238" stroke="#1f2937" stroke-width="2"/><path d="M410,150 L410,140 L420,140" fill="none" stroke="#334155" stroke-width="1.2"/><circle cx="420" cy="150" r="3" fill="#1f2937"/><circle cx="330" cy="150" r="3" fill="#1f2937"/><text x="330" y="166" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">O</text><text x="234" y="140" font-size="12" font-family="sans-serif" text-anchor="end" fill="#dc2626">arc</text><text x="343" y="106" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">sector</text><text x="330" y="234" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">segment</text><text x="426" y="80" font-size="12" font-family="sans-serif" fill="#1f2937">tangent</text></svg>`,
      diagramCaption:
        "Left: a radius, a diameter, a chord and the circumference. Right: an arc (red), a sector (yellow), a segment (green) and a tangent meeting the radius at 90°.",
      workedExamples: [
        {
          title: "Radius and diameter",
          problem:
            "A round table at a hawker centre has radius 45 cm. What is its diameter? What is the longest straight stick that could lie flat on the table without poking over the edge?",
          steps: [
            "A diameter is two radii in a straight line: {{d = 2r}}.",
            "{{d = 2 * 45 = 90}} cm.",
            "The longest straight line that fits inside a circle is a chord through the centre, which is a diameter.",
          ],
          answer: "Diameter 90 cm, so the longest stick is 90 cm.",
          yourTurn: {
            question: "Your turn: a circular clock face has diameter 23 cm. What is its radius, in cm?",
            answer: { type: "number", value: 11.5 },
            solution: "The radius is half the diameter: {{r = d/2 = 23/2 = 11.5}} cm.",
          },
        },
        {
          title: "Name the part",
          problem:
            "In a circle with centre O, points A and B lie on the circle and the straight line AB does not pass through O. Name (a) the line AB, (b) the smaller region between AB and the circle, (c) the region bounded by OA, OB and the shorter arc AB.",
          steps: [
            "(a) AB joins two points on the circle, so it is a **chord**. It is not a diameter, because it misses O.",
            "(b) A region cut off by a chord is a **segment**. It is the smaller one, so it is the **minor segment**.",
            "(c) Two radii and an arc make a **sector**. With the shorter arc it is the **minor sector**.",
          ],
          answer: "(a) chord (b) minor segment (c) minor sector",
        },
        {
          title: "Can it fit?",
          problem: "Zara says she has drawn a chord 13 cm long in a circle of radius 6 cm. Is that possible?",
          steps: [
            "The longest chord in any circle is the diameter.",
            "Here {{d = 2 * 6 = 12}} cm.",
            "13 cm is longer than 12 cm, so no chord in this circle can be 13 cm long.",
          ],
          answer: "Impossible: no chord can be longer than the 12 cm diameter.",
        },
      ],
      keyPoints: [
        "{{d = 2r}} and {{r = d/2}}. Always check which one you have been given.",
        "Lines: radius, diameter, chord, tangent. Curves: arc, circumference.",
        "A **sector** has its corner at the centre (two radii and an arc); a **segment** is cut off by a chord.",
        "A tangent touches the circle once and is perpendicular to the radius at that point.",
      ],
      whyItWorks:
        "Why is the diameter the longest chord? Take any chord AB and join A and B to the centre O. The route from A to O to B has length {{r + r = 2r}}. A straight line is the shortest route between two points, so {{AB <= 2r}}. The two are equal only when O lies *on* AB, which is exactly when AB is a diameter.",
      strategies: ["Draw a diagram", "Consider extremes"],
      thinkDeeper:
        "Fix a point A on a circle of radius 5 cm. How many chords of length 8 cm start at A? How many of length 10 cm? Of length 12 cm? Explain each answer using what you know about the diameter.",
    },
    // ------------------------------------------------------------------------
    {
      id: "discovering-pi",
      heading: "Discovering π",
      discovery: {
        problem:
          "Arjun measured some round objects with a tape measure:\n\n| Object | Diameter (cm) | Circumference (cm) |\n|---|---|---|\n| Coin | 2.5 | 7.8 |\n| Mug | 8.0 | 25.2 |\n| Dinner plate | 26.0 | 81.6 |\n| Bicycle wheel | 66.0 | 207.5 |\n\nWork out circumference ÷ diameter for each object, to 2 decimal places. What do you notice? Why aren't the answers *exactly* the same?",
        idea:
          "The ratios are 3.12, 3.15, 3.14 and 3.14: every one is just over 3. For a perfect circle the ratio is *always the same number*, about 3.14, and mathematicians call it **π** (pi). The small differences come from measuring errors, such as a stretchy tape or reading the scale.",
      },
      body:
        "**π** (the Greek letter pi) is *defined* as the number you get when you divide any circle's circumference by its diameter:\n\n    {{pi = C/d}}\n\nIt is the same for every circle, from a coin to a planet's orbit, because every circle is an enlargement of every other circle.\n\n**So what is π?** Its decimal begins\n\n    {{pi = 3.14159265358979…}}\n\nand the digits never end and never settle into a repeating pattern. A number like this is called **irrational**: it cannot be written exactly as a fraction {{a/b}} of whole numbers, and its decimal neither stops nor recurs. So any number we actually write down for π is an *approximation*.\n\n| Approximation | Value | How far off? |\n|---|---|---|\n| 3 | 3 | about 0.14 too small |\n| 3.14 | 3.14 | about 0.0016 too small |\n| {{22/7}} | 3.142857… | about 0.0013 too big |\n| {{355/113}} | 3.1415929… | about 0.0000003 too big |\n\n**Which value should you use?**\n\n- With a calculator: use the **π button**. It holds π to many more decimal places than you will ever need.\n- Without a calculator: use **3.14**, or {{22/7}} when the radius or diameter is a multiple of 7 (the 7s cancel nicely).\n- If you are asked for an *exact* answer, leave π as a symbol, as in {{12 pi}} cm.",
      diagram: `<svg viewBox="0 0 480 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle drawn between a regular hexagon inside it and a square around it. One triangle of the hexagon is shaded and its three sides are each labelled r. The hexagon has perimeter 6r, which is 3d. The square has perimeter 4d. So 3d is less than C, which is less than 4d."><rect width="480" height="252" fill="#ffffff"/><g transform="translate(0,-34)"><rect x="50" y="50" width="200" height="200" fill="none" stroke="#dc2626" stroke-width="2"/><circle cx="150" cy="150" r="100" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><polygon points="250,150 200,63.4 100,63.4 50,150 100,236.6 200,236.6" fill="none" stroke="#2563eb" stroke-width="2"/><polygon points="150,150 250,150 200,63.4" fill="#fde68a" stroke="#334155" stroke-width="1.5"/><circle cx="150" cy="150" r="3" fill="#1f2937"/><text x="200" y="144" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">r</text><text x="222" y="116" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">r</text><text x="180" y="116" font-size="13" font-family="sans-serif" fill="#1f2937">r</text><text x="150" y="272" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#dc2626">square side = d</text><text x="275" y="70" font-size="13" font-family="sans-serif" font-weight="bold" fill="#2563eb">Inside: hexagon</text><text x="275" y="90" font-size="12" font-family="sans-serif" fill="#1f2937">6 sides, each of length r</text><text x="275" y="108" font-size="12" font-family="sans-serif" fill="#1f2937">perimeter = 6r = 3d</text><text x="275" y="145" font-size="13" font-family="sans-serif" font-weight="bold" fill="#dc2626">Outside: square</text><text x="275" y="165" font-size="12" font-family="sans-serif" fill="#1f2937">perimeter = 4d</text><text x="275" y="202" font-size="13" font-family="sans-serif" font-weight="bold" fill="#1f2937">Circle in between:</text><text x="275" y="222" font-size="13" font-family="sans-serif" fill="#1f2937">3d &lt; C &lt; 4d</text><text x="275" y="242" font-size="13" font-family="sans-serif" fill="#1f2937">so 3 &lt; π &lt; 4</text></g></svg>`,
      diagramCaption:
        "The circumference is longer than the hexagon inside it (6r = 3d) and shorter than the square around it (4d), so π lies between 3 and 4.",
      workedExamples: [
        {
          title: "Estimating π from measurements",
          problem:
            "Mei measures a round table. Its circumference is 534 cm and its diameter is 170 cm. Use her measurements to estimate π to 2 decimal places.",
          steps: ["{{pi ~= C/d = 534/170}}", "534 ÷ 170 = 3.1411…", "To 2 decimal places this is 3.14."],
          answer: "π ≈ 3.14",
          yourTurn: {
            question:
              "Your turn: a hula hoop measures 251 cm around and 80 cm across. Work out circumference ÷ diameter, giving your answer to 2 decimal places.",
            answer: { type: "number", value: 3.14, allowFraction: false },
            solution: "251 ÷ 80 = 3.1375, which is 3.14 to 2 decimal places.",
          },
        },
        {
          title: "Which approximation is closer?",
          problem: "Which is closer to π: 3.14 or {{22/7}}?",
          steps: [
            "π = 3.14159… and {{22/7}} = 3.142857…",
            "π is above 3.14 by 3.14159… − 3.14 = 0.00159…",
            "{{22/7}} is above π by 3.142857… − 3.14159… = 0.00126…",
            "0.00126 is smaller than 0.00159.",
          ],
          answer: "{{22/7}} is closer, but only just. Both are approximations; neither is exactly π.",
        },
        {
          title: "Is π a fraction?",
          problem: "Ravi says: 'π equals {{22/7}}, so π is a fraction.' Explain what is wrong.",
          steps: [
            "{{22/7}} = 3.142857142857…, where the block 142857 repeats forever. Every fraction's decimal either stops or repeats like this.",
            "π = 3.14159265… already differs from {{22/7}} in the third decimal place, and its digits never repeat.",
            "So {{22/7}} is only a close approximation, and π itself is irrational.",
          ],
          answer: "π is irrational; {{22/7}} is a handy rational approximation, not π itself.",
        },
      ],
      keyPoints: [
        "π is defined as {{C/d}}, and it is the same for every circle.",
        "π = 3.14159… is irrational: its decimal never ends and never repeats.",
        "3.14 and {{22/7}} are approximations. Use the π button when you have a calculator.",
        "{{3 < pi < 4}}: a circumference is just over 3 diameters.",
      ],
      whyItWorks:
        "Why is {{C/d}} the same for every circle? Enlarge a circle by scale factor 3: its diameter triples *and* its circumference triples, so {{(3C)/(3d) = C/d}} and the ratio does not change. Why is π between 3 and 4? In the diagram, a regular hexagon fits inside the circle. It is made of 6 equilateral triangles with sides {{r}}, so its perimeter is {{6r = 3d}}. Each hexagon side is a straight chord, shorter than the arc beside it, so {{C > 3d}}. The square around the circle has perimeter {{4d}} and the circle sits inside it, so {{C < 4d}}. Dividing by {{d}} gives {{3 < pi < 4}}. Around 250 BC, Archimedes used polygons with 96 sides to squeeze π between {{3 10/71}} and {{3 1/7}}.",
      strategies: ["Find a pattern", "Estimate first", "Consider extremes"],
      thinkDeeper:
        "Archimedes trapped π between polygons. If you swapped the inside hexagon for a regular 12-sided polygon, would your lower estimate for π go up or down? What happens as the number of sides keeps doubling? Could a polygon ever give π *exactly*?",
    },
    // ------------------------------------------------------------------------
    {
      id: "circumference",
      heading: "Circumference",
      discovery: {
        problem:
          "A bicycle wheel has diameter 70 cm. You push the bike forward until the wheel has turned exactly once. Has the bike moved more or less than 2 metres? Decide before you calculate.",
        idea:
          "In one turn, every point of the tyre touches the ground once, so the bike moves exactly one **circumference**. That is π diameters: {{pi * 70 ~= 219.9}} cm, about 2.2 m. So it moves a little *more* than 2 m.",
      },
      body:
        "Rearranging the definition {{pi = C/d}} gives the formula for the circumference:\n\n    {{C = pi d}}\n    {{C = 2 pi r}}  (because {{d = 2r}})\n\nUse whichever matches the information you are given: {{pi d}} for a diameter, {{2 pi r}} for a radius.\n\n**Exact or rounded?**\n\n- **Exact form (in terms of π):** keep π as a symbol. A circle of radius 5 cm has {{C = 2 * pi * 5 = 10 pi}} cm. This is perfectly accurate.\n- **Rounded form:** use the π button: {{10 pi = 31.4159…}}, so {{C ~= 31.4}} cm to 1 decimal place. If no accuracy is given, 3 significant figures is sensible for a measurement.\n- Round **once, at the end**. Rounding halfway through makes final answers drift.\n\n**Working backwards.** If you know the circumference, undo the multiplication by π:\n\n| You know | You want | Use |\n|---|---|---|\n| {{d}} | {{C}} | {{C = pi d}} |\n| {{r}} | {{C}} | {{C = 2 pi r}} |\n| {{C}} | {{d}} | {{d = C/pi}} |\n| {{C}} | {{r}} | {{r = C/(2 pi)}} |\n\n**Sense check:** a circumference is always just over 3 times the diameter. If yours isn't, look for a mix-up between radius and diameter.",
      diagram: `<svg viewBox="0 0 480 172" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A wheel of diameter 70 cm rolls along the ground through one full turn. A red point that starts at the bottom of the wheel touches the ground again after the wheel has moved one circumference. The distance is marked as three diameters plus a little bit, about 219.9 cm."><rect width="480" height="172" fill="#ffffff"/><g transform="translate(0,-130)"><line x1="10" y1="240" x2="340" y2="240" stroke="#334155" stroke-width="2"/><circle cx="60" cy="205" r="35" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="25" y1="205" x2="95" y2="205" stroke="#2563eb" stroke-width="2"/><text x="60" y="160" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#2563eb">d = 70 cm</text><circle cx="60" cy="240" r="4" fill="#dc2626"/><circle cx="279.91" cy="205" r="35" fill="none" stroke="#1f2937" stroke-width="2" stroke-dasharray="5 4"/><circle cx="279.91" cy="240" r="4" fill="#dc2626"/><line x1="105" y1="195" x2="226" y2="195" stroke="#334155" stroke-width="1.5"/><polygon points="234,195 225,190.5 225,199.5" fill="#334155"/><text x="168" y="186" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">one full turn</text><line x1="60" y1="258" x2="279.91" y2="258" stroke="#dc2626" stroke-width="2"/><line x1="60" y1="252" x2="60" y2="264" stroke="#dc2626" stroke-width="1.5"/><line x1="130" y1="252" x2="130" y2="264" stroke="#dc2626" stroke-width="1.5"/><line x1="200" y1="252" x2="200" y2="264" stroke="#dc2626" stroke-width="1.5"/><line x1="270" y1="252" x2="270" y2="264" stroke="#dc2626" stroke-width="1.5"/><line x1="279.91" y1="252" x2="279.91" y2="264" stroke="#dc2626" stroke-width="1.5"/><text x="95" y="276" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">d</text><text x="165" y="276" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">d</text><text x="235" y="276" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">d</text><text x="288" y="262" font-size="11" font-family="sans-serif" fill="#1f2937">+ a bit</text><text x="170" y="294" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">one turn = circumference = π × d</text><text x="360" y="150" font-size="13" font-family="sans-serif" fill="#1f2937">C = π × d</text><text x="372" y="172" font-size="13" font-family="sans-serif" fill="#1f2937">= π × 70</text><text x="372" y="194" font-size="13" font-family="sans-serif" fill="#1f2937">≈ 219.9 cm</text><text x="372" y="216" font-size="13" font-family="sans-serif" fill="#1f2937">≈ 2.2 m</text></g></svg>`,
      diagramCaption:
        "In one turn the wheel rolls out its circumference: three diameters and a bit, π × 70 ≈ 219.9 cm.",
      workedExamples: [
        {
          title: "Exact and rounded",
          problem: "A circle has radius 4.5 cm. Find its circumference (a) in terms of π, (b) correct to 1 decimal place.",
          steps: [
            "A radius is given, so use {{C = 2 pi r}}.",
            "{{C = 2 * pi * 4.5 = 9 pi}} cm. That is (a).",
            "{{9 pi = 28.274…}}, so {{C ~= 28.3}} cm to 1 decimal place. That is (b).",
            "Check: the diameter is 9 cm and 3 × 9 = 27, a little under 28.3. ✓",
          ],
          answer: "(a) {{9 pi}} cm (b) 28.3 cm",
          yourTurn: {
            question: "Your turn: a circle has radius 6 cm. Find its circumference in terms of π. (Type it like 5π or 5pi.)",
            answer: { type: "expression", expr: "12pi", display: "{{12 pi}} cm" },
            solution: "{{C = 2 pi r = 2 * pi * 6 = 12 pi}} cm.",
          },
        },
        {
          title: "The Singapore Flyer",
          problem:
            "The wheel of the Singapore Flyer has a diameter of 150 m. How far does a point on the rim travel in one complete rotation? Give your answer to 3 significant figures.",
          steps: [
            "A diameter is given, so use {{C = pi d}}.",
            "{{C = pi * 150 = 471.238…}} m.",
            "To 3 significant figures: 471 m.",
          ],
          answer: "471 m",
        },
        {
          title: "Working backwards",
          problem: "Siti walks once around a circular pond and measures 40 m. Find the radius of the pond, correct to 1 decimal place.",
          steps: [
            "{{C = 2 pi r}}, so {{2 pi r = 40}}.",
            "Divide both sides by {{2 pi}}: {{r = 40/(2 pi)}}.",
            "{{r = 6.366…}}, so {{r ~= 6.4}} m.",
            "Check: {{2 * pi * 6.4 = 40.2…}}, close to 40. ✓",
          ],
          answer: "6.4 m",
        },
      ],
      keyPoints: [
        "{{C = pi d = 2 pi r}}.",
        "Exact answers keep π as a symbol, for example {{12 pi}} cm.",
        "Round only at the end: to 1 d.p. or 3 s.f. if you are not told.",
        "Backwards: {{d = C/pi}} and {{r = C/(2 pi)}}.",
      ],
      whyItWorks:
        "The formula is just the definition of π rearranged. If {{C/d = pi}}, multiplying both sides by {{d}} gives {{C = pi d}}. A diameter is two radii, so {{C = pi * 2r = 2 pi r}}. Because {{C = pi d}}, circumference is **directly proportional** to diameter: double the wheel and you double the distance it travels in one turn.",
      strategies: ["Use the inverse", "Estimate first", "Keep π exact until the end"],
      thinkDeeper:
        "Imagine a rope pulled tight around the Earth's equator (about 40 000 km long). You add just 1 metre to the rope and lift it evenly so it hovers above the ground all the way round. Could a cat crawl under it? Work out the height of the gap, then explain why the answer does not depend on the size of the Earth at all.",
    },
    // ------------------------------------------------------------------------
    {
      id: "area-of-a-circle",
      heading: "Area of a circle",
      discovery: {
        problem:
          "A circle of radius 10 cm fits snugly inside a square of side 20 cm. A smaller square fits inside the circle with its four corners on the circle, so its diagonals are diameters, 20 cm long.\n\n- What is the area of the big square?\n- Split the small square into 4 right-angled triangles meeting at the centre. What is its area?\n- So the circle's area lies between which two numbers? How many 10 cm × 10 cm 'radius squares' do you think the circle holds?",
        idea:
          "The big square is 400 cm². The small square is {{4 * 1/2 * 10 * 10 = 200}} cm². So the circle's area is between 200 and 400 cm², which is between 2 and 4 radius squares. The exact answer is π radius squares: {{A = pi r^2 = 100 pi ~= 314}} cm².",
      },
      body:
        "The **area** of a circle is the amount of flat space inside it:\n\n    {{A = pi r^2}}\n\nRead it as 'π times the radius squared': **square the radius first**, then multiply by π. Area is measured in square units such as cm² and m².\n\n**Three things to watch:**\n\n- **Radius, not diameter.** If you are given the diameter, halve it first. Using {{d}} by mistake makes the answer **4 times** too big, because {{(2r)^2 = 4r^2}}.\n- **Only r is squared.** {{pi r^2}} means {{pi * r * r}}, not {{(pi r)^2}}.\n- **Exact or rounded.** A circle of radius 5 cm has area exactly {{25 pi}} cm², or 78.5 cm² to 1 decimal place.\n\n**Where does {{pi r^2}} come from?** Cut a circle into equal sectors, like a pizza. Line them up alternately, point up then point down, as in the diagram. Half of the crust runs along the top and half along the bottom, so each long edge is half the circumference: {{1/2 * 2 pi r = pi r}}. The slanted sides are radii, so the height is about {{r}}. With more and thinner slices the shape gets closer and closer to a rectangle {{pi r}} long and {{r}} tall:\n\n    {{A = pi r * r = pi r^2}}\n\n**Working backwards.** If you know the area, divide by π and then take the square root: {{r = sqrt(A/pi)}}.\n\n> **Stretch link:** a cylinder is a stack of identical circles, so its volume is the circle's area × the height: {{V = pi r^2 h}}.",
      diagram: `<svg viewBox="0 0 480 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle of radius r cut into 8 equal sectors, the top half yellow and the bottom half blue. The sectors are rearranged alternately point-up and point-down into a shape like a parallelogram. Its top and bottom edges are each half the circumference, pi r, and its height is about r, so the area is about pi r times r, which is pi r squared."><rect width="480" height="190" fill="#ffffff"/><g transform="translate(0,-60)"><path d="M90,150 L150,150 A60,60 0 0,0 132.43,107.57 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L132.43,107.57 A60,60 0 0,0 90,90 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L90,90 A60,60 0 0,0 47.57,107.57 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L47.57,107.57 A60,60 0 0,0 30,150 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L30,150 A60,60 0 0,0 47.57,192.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L47.57,192.43 A60,60 0 0,0 90,210 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L90,210 A60,60 0 0,0 132.43,192.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M90,150 L132.43,192.43 A60,60 0 0,0 150,150 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><text x="120" y="146" font-size="13" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">r</text><text x="90" y="232" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">cut into 8 sectors</text><line x1="160" y1="128" x2="204" y2="128" stroke="#334155" stroke-width="1.5"/><polygon points="212,128 203,123.5 203,132.5" fill="#334155"/><path d="M250,100 L227.04,155.43 A60,60 0 0,0 272.96,155.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M272.96,155.43 L250,100 A60,60 0 0,1 295.92,100 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M295.92,100 L272.96,155.43 A60,60 0 0,0 318.88,155.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M318.88,155.43 L295.92,100 A60,60 0 0,1 341.84,100 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M341.84,100 L318.88,155.43 A60,60 0 0,0 364.81,155.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M364.81,155.43 L341.84,100 A60,60 0 0,1 387.77,100 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><path d="M387.77,100 L364.81,155.43 A60,60 0 0,0 410.73,155.43 Z" fill="#c7d2fe" stroke="#334155" stroke-width="1.2"/><path d="M410.73,155.43 L387.77,100 A60,60 0 0,1 433.69,100 Z" fill="#fde68a" stroke="#334155" stroke-width="1.2"/><text x="330" y="86" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">top: half the circumference (πr)</text><text x="319" y="180" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">bottom: the other half (πr)</text><line x1="446" y1="100" x2="446" y2="155.43" stroke="#334155" stroke-width="1.2" stroke-dasharray="3 3"/><line x1="441" y1="100" x2="451" y2="100" stroke="#334155" stroke-width="1.2"/><line x1="441" y1="155.43" x2="451" y2="155.43" stroke="#334155" stroke-width="1.2"/><text x="454" y="132" font-size="12" font-family="sans-serif" fill="#1f2937">≈ r</text><text x="330" y="214" font-size="14" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">area ≈ πr × r = πr²</text><text x="330" y="236" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">more, thinner slices → a perfect rectangle</text></g></svg>`,
      diagramCaption:
        "Eight sectors rearranged: the top and bottom edges are each half the circumference (πr) and the height is about r, so the area is about πr × r = πr².",
      workedExamples: [
        {
          title: "Radius given",
          problem: "Find the area of a circle of radius 7 cm, (a) in terms of π, (b) to 3 significant figures.",
          steps: [
            "{{A = pi r^2 = pi * 7^2}}",
            "{{7^2 = 49}}, so {{A = 49 pi}} cm². That is (a).",
            "{{49 pi = 153.93…}}, so {{A ~= 154}} cm² to 3 significant figures. That is (b).",
          ],
          answer: "(a) {{49 pi}} cm² (b) 154 cm²",
          yourTurn: {
            question: "Your turn: find the area of a circle of radius 9 cm. Give your answer in cm², correct to 1 decimal place.",
            answer: { type: "number", value: 254.5, allowFraction: false },
            solution: "{{A = pi * 9^2 = 81 pi = 254.469…}}, so 254.5 cm².",
          },
        },
        {
          title: "Diameter given",
          problem: "A circular lawn at a community club has diameter 12 m. Find its area to 3 significant figures.",
          steps: [
            "Diameter 12 m, so the radius is {{r = 6}} m.",
            "{{A = pi * 6^2 = 36 pi = 113.09…}}",
            "{{A ~= 113}} m².",
            "Watch out: {{pi * 12^2 ~= 452}} m² is 4 times too big, because it uses the diameter.",
          ],
          answer: "113 m²",
        },
        {
          title: "Working backwards",
          problem: "A circular pizza has an area of 450 cm². Find its diameter to the nearest centimetre.",
          steps: [
            "{{pi r^2 = 450}}",
            "{{r^2 = 450/pi = 143.23…}}",
            "{{r = sqrt(143.23…) = 11.96…}} cm",
            "{{d = 2r = 23.93…}}, so {{d ~= 24}} cm.",
            "Check: {{pi * 12^2 ~= 452}}, close to 450. ✓",
          ],
          answer: "24 cm",
        },
      ],
      keyPoints: [
        "{{A = pi r^2}}: square the radius, then multiply by π.",
        "Given the diameter? Halve it first.",
        "Area units are squared: cm², m².",
        "Backwards: {{r = sqrt(A/pi)}}.",
      ],
      whyItWorks:
        "Slice the circle into {{n}} equal sectors and arrange them top-to-tail. Whatever {{n}} is, the top edge and the bottom edge are each made of half of the arcs, so each is half the circumference, {{pi r}}, and the slanted sides are radii. As {{n}} grows, the arcs flatten out and the sides stand up straight, so the shape becomes a rectangle with base {{pi r}} and height {{r}}. Its area, {{pi r * r}}, is the circle's area: {{pi r^2}}.",
      strategies: ["Halve the diameter first", "Make it simpler", "Use the inverse"],
      thinkDeeper:
        "A 30 cm margherita pizza costs $24 and a 20 cm one costs $12 (the sizes are diameters). The big one costs twice as much, but is it twice as much pizza? Which is better value, and by how much? What happens to a circle's area whenever you double its diameter?",
    },
    // ------------------------------------------------------------------------
    {
      id: "semicircles-quarter-circles",
      heading: "Semicircles & quarter circles",
      discovery: {
        problem:
          "Priya says: 'A semicircle is half a circle, so its perimeter is half the circumference.' Draw a semicircle with diameter 10 cm and run your finger all the way round its edge. Is Priya right? What has she forgotten?",
        idea:
          "The **area** of a semicircle really is half the circle's area. But the **perimeter** is the whole boundary: the curved half *plus* the straight diameter. Priya's {{1/2 * pi * 10 ~= 15.7}} cm is only the curved part. The full perimeter is {{15.7 + 10 = 25.7}} cm.",
      },
      body:
        "A **semicircle** is half a circle, cut along a diameter. A **quarter circle** (also called a *quadrant*) is a quarter of a circle, cut along two radii at right angles.\n\n**Area: just take the fraction.**\n\n- Semicircle: {{A = 1/2 pi r^2}}\n- Quarter circle: {{A = 1/4 pi r^2}}\n\n**Perimeter: curved part + straight edges.** Cutting a circle creates new straight edges, and they are part of the boundary.\n\n| Shape | Curved part | Straight edges | Perimeter |\n|---|---|---|---|\n| Semicircle | {{1/2 * 2 pi r = pi r}} | one diameter, {{2r}} | {{pi r + 2r}} |\n| Quarter circle | {{1/4 * 2 pi r = 1/2 pi r}} | two radii, {{2r}} | {{1/2 pi r + 2r}} |\n\nA reliable method:\n\n1. Find the radius (halve the diameter if necessary).\n2. Work out the full-circle value: {{pi r^2}} for area or {{2 pi r}} for circumference.\n3. Take the fraction: {{1/2}} or {{1/4}}.\n4. For a perimeter, **add the straight edges**.\n5. Round at the end.\n\nIn exact form, the perimeter of a semicircle of radius 3 cm is {{3 pi + 6}} cm. You cannot combine {{3 pi}} and 6 into a single term, just as you cannot simplify {{3x + 6}}.",
      diagram: `<svg viewBox="0 0 480 178" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A semicircle with a 10 cm diameter and a quarter circle with two 8 cm radii at right angles. In both shapes the curved part is drawn thick in blue and the straight edges thick in red. A key says perimeter equals blue plus red."><rect width="480" height="178" fill="#ffffff"/><g transform="translate(0,-104)"><path d="M30,220 A60,60 0 0,1 150,220 Z" fill="#bae6fd"/><path d="M30,220 A60,60 0 0,1 150,220" fill="none" stroke="#2563eb" stroke-width="4"/><line x1="30" y1="220" x2="150" y2="220" stroke="#dc2626" stroke-width="4"/><circle cx="90" cy="220" r="3" fill="#1f2937"/><text x="90" y="240" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#dc2626">10 cm</text><text x="90" y="268" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Semicircle</text><path d="M210,220 L306,220 A96,96 0 0,0 210,124 Z" fill="#bae6fd"/><path d="M306,220 A96,96 0 0,0 210,124" fill="none" stroke="#2563eb" stroke-width="4"/><line x1="210" y1="220" x2="306" y2="220" stroke="#dc2626" stroke-width="4"/><line x1="210" y1="220" x2="210" y2="124" stroke="#dc2626" stroke-width="4"/><path d="M222,220 L222,208 L210,208" fill="none" stroke="#334155" stroke-width="1.2"/><text x="258" y="240" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#dc2626">8 cm</text><text x="203" y="176" font-size="12" font-family="sans-serif" text-anchor="end" fill="#dc2626">8 cm</text><text x="258" y="268" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Quarter circle</text><line x1="330" y1="140" x2="360" y2="140" stroke="#2563eb" stroke-width="4"/><text x="368" y="144" font-size="12" font-family="sans-serif" fill="#1f2937">curved part</text><line x1="330" y1="170" x2="360" y2="170" stroke="#dc2626" stroke-width="4"/><text x="368" y="174" font-size="12" font-family="sans-serif" fill="#1f2937">straight edges</text><text x="330" y="205" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1f2937">perimeter =</text><text x="330" y="223" font-size="12" font-family="sans-serif" font-weight="bold" fill="#1f2937">blue + red</text><text x="330" y="250" font-size="11" font-family="sans-serif" fill="#334155">area = fraction of πr²</text></g></svg>`,
      diagramCaption:
        "Blue: the curved part, a fraction of the circumference. Red: the straight edges you must add to get the perimeter.",
      workedExamples: [
        {
          title: "Semicircle: area and perimeter",
          problem: "A semicircle has diameter 10 cm. Find (a) its area, (b) its perimeter. Give both to 1 decimal place.",
          steps: [
            "The radius is {{r = 5}} cm.",
            "(a) The full circle is {{pi * 5^2 = 25 pi}}. Half of it is {{12.5 pi = 39.26…}}, so the area is 39.3 cm².",
            "(b) The curved part is half of {{pi d = pi * 10}}, which is {{5 pi = 15.70…}} cm.",
            "Add the diameter: {{15.70… + 10 = 25.70…}}, so the perimeter is 25.7 cm.",
          ],
          answer: "(a) 39.3 cm² (b) 25.7 cm",
          yourTurn: {
            question: "Your turn: a semicircle has diameter 16 cm. Find its perimeter in cm, correct to 1 decimal place.",
            answer: { type: "number", value: 41.1, allowFraction: false },
            solution: "Curved part: {{1/2 * pi * 16 = 8 pi = 25.13…}} cm. Add the 16 cm diameter: 41.13…, so 41.1 cm.",
          },
        },
        {
          title: "Quarter circle",
          problem: "A quarter circle has radius 8 cm. Find (a) its area, (b) its perimeter, both to 1 decimal place.",
          steps: [
            "(a) {{1/4 * pi * 8^2 = 16 pi = 50.26…}}, so the area is 50.3 cm².",
            "(b) Curved part: {{1/4 * 2 * pi * 8 = 4 pi = 12.56…}} cm.",
            "Add the two radii: {{12.56… + 8 + 8 = 28.56…}}, so the perimeter is 28.6 cm.",
          ],
          answer: "(a) 50.3 cm² (b) 28.6 cm",
        },
        {
          title: "Working backwards",
          problem: "A quarter circle has area {{25 pi}} cm². Find its radius.",
          steps: [
            "{{1/4 pi r^2 = 25 pi}}",
            "Divide both sides by π: {{1/4 r^2 = 25}}.",
            "Multiply both sides by 4: {{r^2 = 100}}.",
            "{{r = 10}} cm.",
          ],
          answer: "10 cm",
        },
      ],
      keyPoints: [
        "Area: take the fraction of {{pi r^2}}.",
        "Perimeter = curved part **+ straight edges**.",
        "Semicircle perimeter {{pi r + 2r}}; quarter-circle perimeter {{1/2 pi r + 2r}}.",
      ],
      whyItWorks:
        "A diameter is a line of symmetry, so it splits the circle into two identical halves. Each half has exactly half the area and half the curved length. Two perpendicular diameters make four identical quarters in the same way. But the cut itself becomes new boundary: a semicircle gains a diameter ({{2r}}) and a quarter circle gains two radii (also {{2r}} in total). That is why perimeters need the extra {{2r}} and areas don't.",
      strategies: ["Whole circle first, then take the fraction", "Trace the boundary", "Draw a diagram"],
      thinkDeeper:
        "For a semicircle of radius {{r}}, the perimeter is {{pi r + 2r}} and the area is {{1/2 pi r^2}}. Is there a radius where the perimeter (in cm) and the area (in cm²) are the *same number*? Set the two expressions equal, divide both sides by {{r}} and solve. Is your radius bigger or smaller than 3 cm?",
    },
    // ------------------------------------------------------------------------
    {
      id: "compound-circle-shapes",
      heading: "Compound shapes with circles",
      discovery: {
        problem:
          "A school running track has two straights, each 100 m long, joined by two semicircular ends. The distance across the track between the straights is 60 m. How far is one lap of the inside edge?\n\nBefore you calculate: what do the two semicircular ends make if you push them together?",
        idea:
          "The two semicircles make one whole circle of diameter 60 m. So one lap is {{2 * 100 + pi * 60 = 200 + 188.49… ~= 388.5}} m. Spotting a whole circle hidden among the pieces makes the problem easy.",
      },
      body:
        "A **compound shape** is built from simpler shapes: rectangles, triangles and parts of circles. There are only two moves:\n\n- **Add** pieces that sit side by side, like a rectangle with a semicircle on top.\n- **Subtract** a piece that has been cut out, like a square with a circular hole, or a ring.\n\nThe building blocks are shapes you already know: rectangles ({{l * w}}), triangles ({{1/2 * b * h}}), circles ({{pi r^2}}), semicircles and quarter circles. For example, the segment cut off a quarter circle by a chord is the quarter circle minus a right-angled triangle.\n\n**Method**\n\n1. Sketch the shape and label every length you know. Work out missing lengths: a radius is often hiding in a side length.\n2. Decide: add, subtract, or both?\n3. Find each piece, keeping π exact if you can.\n4. Combine, then round once at the end.\n\n**Perimeter is different from area.** For a perimeter, trace the *outside* of the shape only. A line where two pieces join is inside the shape, so it is **not** part of the perimeter.\n\n**A useful shape: the ring (annulus).** The region between two circles with the same centre, outer radius {{R}} and inner radius {{r}}, has area\n\n    {{A = pi R^2 - pi r^2 = pi(R^2 - r^2)}}\n\nThis is **not** {{pi(R - r)^2}}. Subtract the areas, not the radii.",
      diagram: `<svg viewBox="0 0 460 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: a window made of a rectangle 80 cm wide and 120 cm tall with a semicircle on top; the line where they join is dashed. Right: a circle fitting exactly inside a square of side 10 cm, with the four corners outside the circle shaded red."><rect width="460" height="290" fill="#ffffff"/><text x="108" y="36" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Add: rectangle + semicircle</text><rect x="60" y="110" width="96" height="144" fill="#c7d2fe"/><path d="M60,110 A48,48 0 0,1 156,110 Z" fill="#fde68a"/><path d="M60,110 L60,254 L156,254 L156,110 A48,48 0 0,0 60,110" fill="none" stroke="#1f2937" stroke-width="2"/><line x1="60" y1="110" x2="156" y2="110" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><text x="108" y="272" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">80 cm</text><text x="54" y="186" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">120 cm</text><text x="340" y="36" font-size="12" font-family="sans-serif" font-weight="bold" text-anchor="middle" fill="#1f2937">Subtract: square − circle</text><rect x="270" y="100" width="140" height="140" fill="#fecaca" stroke="#1f2937" stroke-width="2"/><circle cx="340" cy="170" r="70" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="270" y1="170" x2="410" y2="170" stroke="#334155" stroke-width="1.2" stroke-dasharray="4 3"/><text x="340" y="163" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">diameter = 10 cm</text><text x="340" y="258" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text><text x="340" y="280" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#334155">shaded = square − circle</text></svg>`,
      diagramCaption:
        "The two moves: add the pieces (the window) or subtract the hole (shaded corners = square − circle). The dashed line inside the window is not part of its perimeter.",
      workedExamples: [
        {
          title: "Add: a window",
          problem:
            "A window is a rectangle 80 cm wide and 120 cm tall, with a semicircle on top whose diameter is the 80 cm width. Find (a) its area, (b) its perimeter. Give both to 3 significant figures.",
          steps: [
            "Rectangle: 80 × 120 = 9600 cm².",
            "Semicircle: radius 40 cm, so its area is {{1/2 * pi * 40^2 = 800 pi = 2513.2…}} cm².",
            "(a) Total area = 9600 + 2513.2… = 12 113.2… cm², which is 12 100 cm² to 3 significant figures.",
            "(b) The two sides and the bottom give 120 + 120 + 80 = 320 cm. The curved top is {{1/2 * pi * 80 = 40 pi = 125.6…}} cm.",
            "The 80 cm line where the semicircle meets the rectangle is inside the window, so it is not counted.",
            "Perimeter = 320 + 125.6… = 445.6… cm, which is 446 cm to 3 significant figures.",
          ],
          answer: "(a) 12 100 cm² (b) 446 cm",
          yourTurn: {
            question:
              "Your turn: an ice-cream cone shape is a triangle with base 6 cm and perpendicular height 10 cm, with a semicircle of diameter 6 cm sitting on the base. Find the area of the whole shape in cm², correct to 1 decimal place.",
            answer: { type: "number", value: 44.1, allowFraction: false },
            solution: "Triangle: {{1/2 * 6 * 10 = 30}} cm². Semicircle: {{1/2 * pi * 3^2 = 4.5 pi = 14.13…}} cm². Total 44.13…, so 44.1 cm².",
          },
        },
        {
          title: "Subtract: shaded corners",
          problem:
            "A circle fits exactly inside a square of side 10 cm. The four corners of the square outside the circle are shaded. Find the shaded area to 1 decimal place.",
          steps: [
            "The circle's diameter equals the square's side, 10 cm, so {{r = 5}} cm.",
            "Square: {{10^2 = 100}} cm².",
            "Circle: {{pi * 5^2 = 25 pi = 78.53…}} cm².",
            "Shaded = square − circle = {{100 - 25 pi = 21.46…}}, so 21.5 cm².",
          ],
          answer: "21.5 cm² (exactly {{100 - 25 pi}} cm²)",
        },
        {
          title: "A ring-shaped path",
          problem: "A circular pond of radius 3 m is surrounded by a path 1 m wide. Find the area of the path to 1 decimal place.",
          steps: [
            "Outer radius {{R = 3 + 1 = 4}} m; inner radius {{r = 3}} m.",
            "Path = big circle − pond = {{pi * 4^2 - pi * 3^2 = 16 pi - 9 pi = 7 pi}}.",
            "{{7 pi = 21.99…}}, so the path is 22.0 m².",
            "Trap: {{pi * (4 - 3)^2 = pi}} m² is far too small. Subtract areas, not radii.",
          ],
          answer: "22.0 m² (exactly {{7 pi}} m²)",
        },
      ],
      keyPoints: [
        "Split into simple pieces: **add** pieces side by side, **subtract** holes.",
        "Look for hidden radii: a circle inside a square has diameter = side.",
        "Perimeter: trace the outside only. Internal join lines don't count.",
        "Ring: {{pi(R^2 - r^2)}}, not {{pi(R - r)^2}}.",
      ],
      whyItWorks:
        "Area is *additive*: if a shape is split into pieces that don't overlap, the areas of the pieces add up to the whole. Turn that around and you get subtraction: what is left = the whole − the part removed. Perimeter does **not** add like this. When two pieces are joined, the edge they share disappears inside the shape, so you cannot just add their two perimeters.",
      strategies: ["Split into simple shapes", "Whole minus part", "Trace the boundary"],
      thinkDeeper:
        "In a square of side 10 cm, draw two quarter circles of radius 10 cm, centred at two *opposite* corners. They overlap in a leaf shape in the middle. Find the exact area of the leaf. (Hint: add the areas of the two quarter circles. Which part have you counted twice?)",
    },
    // ------------------------------------------------------------------------
    {
      id: "arcs-sectors",
      heading: "Arc length & sector area",
      discovery: {
        problem:
          "A pizza of radius 15 cm is cut into 8 equal slices.\n\n- What angle is at the tip of each slice?\n- What fraction of the whole pizza is one slice?\n- How long is the crust on one slice, and what is the area of one slice?",
        idea:
          "The 8 tips share 360°, so each is 45°, and each slice is {{45/360 = 1/8}} of the pizza. So one crust is {{1/8}} of the circumference, {{1/8 * 30 pi ~= 11.8}} cm, and one slice is {{1/8}} of the area, {{1/8 * 225 pi ~= 88.4}} cm². Every sector is just a fraction of a circle.",
      },
      body:
        "**Stretch:** this section extends semicircles and quarter circles to sectors with *any* angle.\n\nA **sector** with angle {{theta}} at the centre is the fraction {{theta/360}} of the whole circle. So its arc and its area are that same fraction of the full circumference and the full area:\n\n    Arc length {{= theta/360 * 2 pi r}}\n    Sector area {{= theta/360 * pi r^2}}\n\n| Angle | Fraction of the circle |\n|---|---|\n| 180° | {{1/2}} |\n| 120° | {{1/3}} |\n| 90° | {{1/4}} |\n| 72° | {{1/5}} |\n| 60° | {{1/6}} |\n| 45° | {{1/8}} |\n\nThe **perimeter of a sector** is the arc length **plus two radii**: {{theta/360 * 2 pi r + 2r}}.\n\nSemicircles ({{theta = 180}}°) and quarter circles ({{theta = 90}}°) are just special cases of these formulas, which is a good way to check you have remembered them correctly.",
      diagram: `<svg viewBox="0 0 480 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A sector with radius 9 cm and an angle of 80 degrees at the centre. The arc is drawn thick in red and labelled arc length. Working beside it shows that the arc is 4 pi, about 12.6 cm, and the area is 18 pi, about 56.5 square centimetres."><rect width="480" height="240" fill="#ffffff"/><g transform="translate(0,-50)"><path d="M60,260 L240,260 A180,180 0 0,0 91.26,82.73 Z" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><path d="M240,260 A180,180 0 0,0 91.26,82.73" fill="none" stroke="#dc2626" stroke-width="4"/><path d="M90,260 A30,30 0 0,0 65.21,230.46" fill="none" stroke="#334155" stroke-width="1.5"/><circle cx="60" cy="260" r="3" fill="#1f2937"/><text x="96" y="236" font-size="12" font-family="sans-serif" fill="#1f2937">80°</text><text x="150" y="278" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9 cm</text><text x="68" y="176" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">9 cm</text><text x="207" y="137" font-size="12" font-family="sans-serif" fill="#dc2626">arc length</text><text x="290" y="80" font-size="12" font-family="sans-serif" fill="#1f2937">Angle: 80° out of 360°</text><text x="290" y="125" font-size="12" font-family="sans-serif" fill="#1f2937">Arc = (80 ÷ 360) × 2π × 9</text><text x="318" y="145" font-size="12" font-family="sans-serif" fill="#1f2937">= 4π ≈ 12.6 cm</text><text x="290" y="185" font-size="12" font-family="sans-serif" fill="#1f2937">Area = (80 ÷ 360) × π × 9²</text><text x="318" y="205" font-size="12" font-family="sans-serif" fill="#1f2937">= 18π ≈ 56.5 cm²</text><text x="290" y="245" font-size="12" font-family="sans-serif" fill="#1f2937">Perimeter = 4π + 9 + 9</text><text x="318" y="265" font-size="12" font-family="sans-serif" fill="#1f2937">≈ 30.6 cm</text></g></svg>`,
      diagramCaption:
        "A sector of radius 9 cm and angle 80° is {{80/360 = 2/9}} of the circle, so its arc is {{4 pi}} cm and its area is {{18 pi}} cm².",
      workedExamples: [
        {
          title: "Arc, area and perimeter",
          problem:
            "A sector has radius 9 cm and angle 80°. Find (a) its arc length, (b) its area, (c) its perimeter. Give your answers to 1 decimal place.",
          steps: [
            "Fraction of the circle: {{80/360 = 2/9}}.",
            "(a) Arc = {{2/9 * 2 * pi * 9 = 4 pi = 12.56…}}, so 12.6 cm.",
            "(b) Area = {{2/9 * pi * 9^2 = 18 pi = 56.54…}}, so 56.5 cm².",
            "(c) Perimeter = arc + two radii = {{4 pi + 18 = 30.56…}}, so 30.6 cm.",
          ],
          answer: "(a) 12.6 cm (b) 56.5 cm² (c) 30.6 cm",
          yourTurn: {
            question: "Your turn: a sector has radius 6 cm and angle 150°. Find its arc length in cm, correct to 1 decimal place.",
            answer: { type: "number", value: 15.7, allowFraction: false },
            solution: "{{150/360 = 5/12}}, so the arc is {{5/12 * 2 * pi * 6 = 5 pi = 15.70…}}, which is 15.7 cm.",
          },
        },
        {
          title: "Sector area",
          problem: "Find the area of a sector of radius 12 cm and angle 135°, to 1 decimal place.",
          steps: [
            "Fraction of the circle: {{135/360 = 3/8}}.",
            "Area = {{3/8 * pi * 12^2 = 3/8 * 144 pi = 54 pi}}.",
            "{{54 pi = 169.64…}}, so the area is 169.6 cm².",
          ],
          answer: "169.6 cm²",
        },
        {
          title: "Find the angle",
          problem: "A sector of radius 10 cm has an arc length of {{5 pi}} cm. Find its angle.",
          steps: [
            "The full circumference is {{2 * pi * 10 = 20 pi}} cm.",
            "Fraction of the circle = {{(5 pi)/(20 pi) = 1/4}}.",
            "Angle = {{1/4 * 360 = 90}}°.",
          ],
          answer: "90°",
        },
      ],
      keyPoints: [
        "A sector with angle {{theta}} is {{theta/360}} of the circle.",
        "Arc length {{= theta/360 * 2 pi r}}; sector area {{= theta/360 * pi r^2}}.",
        "Sector perimeter = arc length + {{2r}}.",
      ],
      whyItWorks:
        "Spin a radius once around the centre and it sweeps out 360°, the whole circumference and the whole area. By symmetry, equal angles sweep out equal arcs and equal areas. So a 1° sector gets {{1/360}} of everything, and a {{theta}}° sector gets {{theta/360}} of everything.",
      strategies: ["Find the fraction first", "Use the inverse", "Check with a special case"],
      thinkDeeper:
        "Which sector has the bigger area: radius 10 cm with angle 40°, or radius 20 cm with angle 10°? Predict first, then calculate. Can you explain the result without calculating anything?",
    },
  ],
  learn: {
    flashcards: [
      { front: "Radius", back: "The distance from the centre to any point on the circle. Symbol {{r}}." },
      { front: "Diameter", back: "A chord through the centre: {{d = 2r}}. It is the longest chord in the circle." },
      { front: "Chord", back: "A straight line joining two points on the circle." },
      { front: "Arc", back: "Part of the circumference: a curved piece of the circle." },
      { front: "Sector or segment?", back: "Sector: two radii and an arc (a pizza slice). Segment: a chord and an arc." },
      { front: "Tangent", back: "A straight line touching the circle at exactly one point. It meets the radius there at 90°." },
      { front: "What is π?", back: "Circumference ÷ diameter, the same for every circle: 3.14159…, an irrational number." },
      { front: "Circumference formula", back: "{{C = pi d = 2 pi r}}" },
      { front: "Area formula", back: "{{A = pi r^2}}: square the radius, then multiply by π." },
      { front: "Radius from the circumference", back: "{{r = C/(2 pi)}}" },
      { front: "Radius from the area", back: "{{r = sqrt(A/pi)}}" },
      { front: "Perimeter of a semicircle", back: "{{pi r + 2r}}: the curved half plus the diameter." },
      { front: "Perimeter of a quarter circle", back: "{{1/2 pi r + 2r}}: the curved quarter plus two radii." },
      { front: "Area of a ring (annulus)", back: "{{pi(R^2 - r^2)}}: big circle minus small circle." },
      { front: "Arc length (stretch)", back: "{{theta/360 * 2 pi r}}" },
      { front: "Sector area (stretch)", back: "{{theta/360 * pi r^2}}" },
    ],
    mustKnow: [
      "I can name and draw a radius, diameter, chord, arc, sector, segment and tangent.",
      "I can explain that π is circumference ÷ diameter and is the same for every circle.",
      "I can explain why π is irrational and use 3.14 or {{22/7}} as approximations.",
      "I can find a circumference using {{C = pi d}} or {{C = 2 pi r}}, in terms of π or rounded.",
      "I can find the radius or diameter when I am given the circumference.",
      "I can find the area of a circle with {{A = pi r^2}}, halving a diameter first.",
      "I can explain where {{A = pi r^2}} comes from by rearranging sectors.",
      "I can find the area and perimeter of semicircles and quarter circles, including the straight edges.",
      "I can find areas and perimeters of compound shapes and shaded regions that include parts of circles.",
      "I can round answers to a sensible accuracy (1 d.p. or 3 s.f.), and only at the end.",
      "Stretch: I can find arc lengths and sector areas as fractions of a circle.",
    ],
    misconceptions: [
      {
        wrong: "The area of a circle with diameter 10 cm is {{pi * 10^2 ~= 314}} cm².",
        right: "Area uses the radius. Here {{r = 5}}, so {{A = pi * 5^2 = 25 pi ~= 78.5}} cm². Using the diameter makes the answer 4 times too big.",
      },
      {
        wrong: "{{pi r^2}} means {{(pi r)^2}}.",
        right: "Only {{r}} is squared. Square the radius first, then multiply by π. {{(pi r)^2 = pi^2 r^2}}, which is π times (about 3 times) too big.",
      },
      {
        wrong: "The perimeter of a semicircle is half the circumference.",
        right: "Half the circumference is only the curved part. Add the diameter: perimeter {{= pi r + 2r}}.",
      },
      {
        wrong: "π is exactly 3.14 (or exactly {{22/7}}).",
        right: "π is irrational: 3.14159… goes on forever without repeating. 3.14 and {{22/7}} are useful approximations.",
      },
      {
        wrong: "Doubling the radius doubles the area.",
        right: "Doubling the radius doubles the circumference but multiplies the area by 4, because {{pi(2r)^2 = 4 pi r^2}}.",
      },
      {
        wrong: "A sector and a segment are the same thing.",
        right: "A sector is bounded by two radii and an arc (a pizza slice). A segment is bounded by a chord and an arc.",
      },
    ],
    examMistakes: [
      "Using the diameter instead of the radius in {{A = pi r^2}}.",
      "Multiplying by π before squaring, which works out {{(pi r)^2}} instead of {{pi r^2}}.",
      "Forgetting the straight edges in the perimeter of a semicircle, quarter circle or sector.",
      "Dividing the circumference by π and calling it the radius: {{C/pi}} gives the diameter.",
      "Rounding too early (for example using 3.1, or a rounded middle step), so the final answer is out.",
      "Giving the wrong units: area in cm instead of cm², or a length in cm².",
      "Giving a decimal when the question says 'in terms of π', or leaving π in when a rounded answer is asked for.",
      "Counting internal join lines as part of the perimeter of a compound shape.",
    ],
    mnemonics: [
      {
        topic: "Circumference and area",
        device: "Cherry Pie Delicious; Apple Pies are too",
        explanation:
          "**C**herry **P**ie **D**elicious gives {{C = pi d}}. **A**pple **P**ies **are too** ('r two') gives {{A = pi r^2}}. The area formula is the one with the square, because area is measured in square units.",
      },
      {
        topic: "Sector or segment?",
        device: "seCtor reaches the Centre",
        explanation:
          "A seCtor always reaches the Centre: it is a pizza slice made of two radii and an arc. A segment never touches the centre; it is the piece a chord slices off, like cutting the edge off a round cake with one straight cut.",
      },
      {
        topic: "Perimeter of part-circles",
        device: "Trace it with your finger",
        explanation:
          "Run a finger all the way round the boundary. Every curve and every straight edge your finger travels along is in the perimeter. Lines inside the shape, which your finger never touches, are not.",
      },
      {
        topic: "Radius or diameter?",
        device: "D is for Double",
        explanation: "The Diameter is Double the radius. Before you use {{pi r^2}}, halve a diameter, every single time.",
      },
    ],
    realWorld: [
      {
        title: "Bike computers",
        detail:
          "A sensor counts wheel turns. Each turn moves the bike one circumference, {{pi d}}, so distance = number of turns × {{pi d}}. Enter the wrong wheel size and every distance is wrong.",
        emoji: "🚲",
      },
      {
        title: "The Singapore Flyer",
        detail:
          "Its wheel is 150 m across, so a point on the rim travels {{pi * 150 ~= 471}} m in one rotation, which takes about half an hour.",
        emoji: "🎡",
      },
      {
        title: "Which pizza is better value?",
        detail:
          "Area grows with the *square* of the radius. A 30 cm pizza has {{2 1/4}} times the area of a 20 cm pizza, so the big one is often the better deal.",
        emoji: "🍕",
      },
      {
        title: "Staggered starts on a running track",
        detail:
          "Runners in outer lanes go round bigger semicircles, so they start further forward. Each lane is about 1.22 m wide, which adds roughly {{2 pi * 1.22 ~= 7.7}} m to a full lap of the two bends.",
        emoji: "🏃",
      },
      {
        title: "Phone mast coverage",
        detail:
          "A mast that reaches 5 km in every direction covers a circle of area {{pi * 5^2 ~= 79}} km². Doubling its range would cover four times the area.",
        emoji: "📡",
      },
    ],
    videos: [
      {
        title: "Circumference of a circle",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+circumference+of+a+circle",
      },
      {
        title: "Area of a circle",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+area+of+a+circle",
      },
      {
        title: "Why the area of a circle is πr²",
        channel: "3Blue1Brown",
        url: "https://www.youtube.com/results?search_query=3blue1brown+area+of+a+circle",
      },
      {
        title: "The endless digits of pi",
        channel: "Numberphile",
        url: "https://www.youtube.com/results?search_query=numberphile+pi",
      },
    ],
    formulas: [
      { name: "Diameter and radius", formula: "{{d = 2r}} and {{r = d/2}}" },
      { name: "Pi", formula: "{{pi = C/d ~= 3.14159}}", note: "Irrational. 3.14 and {{22/7}} are approximations." },
      { name: "Circumference", formula: "{{C = pi d = 2 pi r}}" },
      { name: "Area of a circle", formula: "{{A = pi r^2}}", note: "Square the radius, not the diameter." },
      {
        name: "Semicircle and quarter-circle perimeters",
        formula: "Semicircle {{pi r + 2r}}; quarter circle {{1/2 pi r + 2r}}",
        note: "Curved part plus the straight edges.",
      },
      { name: "Arc length (stretch)", formula: "{{theta/360 * 2 pi r}}" },
      { name: "Sector area (stretch)", formula: "{{theta/360 * pi r^2}}" },
      { name: "Volume of a cylinder (stretch)", formula: "{{V = pi r^2 h}}", note: "Area of the circular end × height." },
    ],
  },
};
