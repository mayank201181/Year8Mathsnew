import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "linear-graphs",
  title: "Straight-Line & Real-Life Graphs",
  strand: "Algebra",
  icon: "📈",
  summary: "Coordinates, gradients and y = mx + c — then graphs that tell real stories.",
  intro:
    "A straight-line graph is a picture of a rule: every point on the line makes the equation true, and no other point does. In this chapter you'll move around all four quadrants, discover why y = mx + c always draws a straight line, and learn to read the gradient as a rate — a speed, a price per kilogram, an exchange rate. By the end, a graph will read like a story.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "coordinates-midpoints",
      heading: "Coordinates & midpoints",
      discovery: {
        problem:
          "A drone flies in a straight line from A(−3, −2) to B(5, 4) and stops exactly halfway. Where does it stop?\n\nBefore reaching for a formula, ask yourself: how far is it **across** from A to B, and how far **up**?",
        idea:
          "From A to B is 8 across and 6 up. Halfway means 4 across and 3 up, so the drone stops at (−3 + 4, −2 + 3) = (1, 1).\n\nNow look closely: 1 is the **mean** of −3 and 5, and 1 is also the mean of −2 and 4. The midpoint is simply the average of the x-coordinates and the average of the y-coordinates.",
      },
      body:
        "A **coordinate pair** (x, y) fixes a point on the **coordinate plane** (also called the Cartesian plane). The horizontal **x-axis** and the vertical **y-axis** cross at the **origin**, (0, 0). The first number tells you how far to go **across** (right if positive, left if negative); the second tells you how far **up** (positive) or **down** (negative).\n\n> Along the corridor, then up (or down) the stairs: x first, then y.\n\nThe axes cut the plane into four **quadrants**, numbered anticlockwise starting from the top right:\n\n| Quadrant | Sign of x | Sign of y | Example |\n|---|---|---|---|\n| First | + | + | (3, 2) |\n| Second | − | + | (−3, 2) |\n| Third | − | − | (−3, −2) |\n| Fourth | + | − | (3, −2) |\n\nA point on an axis belongs to no quadrant: (0, 5) is on the y-axis and (−4, 0) is on the x-axis.\n\nThe **midpoint** of a line segment is the point exactly halfway between its two ends. Halfway between two numbers is their **mean**, so for ends {{(x_1, y_1)}} and {{(x_2, y_2)}}:\n\n    {{\"midpoint\" = ((x_1 + x_2)/2, (y_1 + y_2)/2)}}\n\nAdd the two x-coordinates and halve; add the two y-coordinates and halve. Take care with signs: the midpoint of (−7, 2) and (3, −6) is {{((-7 + 3)/2, (2 + (-6))/2) = (-2, -2)}}.",
      diagram: `<svg viewBox="0 0 336 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid with four labelled quadrants. A at (−3, −2) is joined to B at (5, 4). The path from A to B is 8 across and 6 up; the midpoint M at (1, 1) is 4 across and 3 up from A."><rect x="0" y="0" width="336" height="300" fill="#ffffff"/><line x1="30" y1="264" x2="30" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="264" x2="52" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="74" y1="264" x2="74" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="96" y1="264" x2="96" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="118" y1="264" x2="118" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="140" y1="264" x2="140" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="162" y1="264" x2="162" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="184" y1="264" x2="184" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="206" y1="264" x2="206" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="228" y1="264" x2="228" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="250" y1="264" x2="250" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="272" y1="264" x2="272" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="294" y1="264" x2="294" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="264" x2="294" y2="264" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="242" x2="294" y2="242" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="220" x2="294" y2="220" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="198" x2="294" y2="198" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="176" x2="294" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="154" x2="294" y2="154" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="132" x2="294" y2="132" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="110" x2="294" y2="110" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="88" x2="294" y2="88" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="66" x2="294" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="44" x2="294" y2="44" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="22" x2="294" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="154" x2="294" y2="154" stroke="#334155" stroke-width="1.5"/><line x1="162" y1="264" x2="162" y2="22" stroke="#334155" stroke-width="1.5"/><text x="33.3" y="36.3" font-size="11" font-family="sans-serif" fill="#475569" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Second (−, +)</text><text x="290.7" y="36.3" font-size="11" font-family="sans-serif" fill="#475569" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">First (+, +)</text><text x="33.3" y="258.5" font-size="11" font-family="sans-serif" fill="#475569" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Third (−, −)</text><text x="290.7" y="258.5" font-size="11" font-family="sans-serif" fill="#475569" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Fourth (+, −)</text><line x1="96" y1="198" x2="272" y2="198" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="5 3"/><line x1="272" y1="198" x2="272" y2="66" stroke="#ea580c" stroke-width="1.8" stroke-dasharray="5 3"/><line x1="184" y1="132" x2="184" y2="198" stroke="#64748b" stroke-width="1.2" stroke-dasharray="2 3"/><line x1="184" y1="132" x2="272" y2="132" stroke="#64748b" stroke-width="1.2" stroke-dasharray="2 3"/><line x1="96" y1="198" x2="272" y2="66" stroke="#2563eb" stroke-width="2.4"/><text x="30" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−6</text><text x="52" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="74" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="96" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="118" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="140" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="184" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="206" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="228" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="250" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="272" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="294" y="167" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="158" y="268" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="158" y="246" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="158" y="224" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="158" y="202" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="158" y="180" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="158" y="136" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="158" y="114" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="158" y="92" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="158" y="70" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="158" y="48" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="158" y="26" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="300" y="158" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="162" y="16" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><text x="140" y="213" font-size="12" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="228" y="213" font-size="12" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="278" y="184.4" font-size="12" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="278" y="103" font-size="12" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="206" y="228" font-size="11" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">8 across</text><text x="298" y="136" font-size="11" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6 up</text><circle cx="96" cy="198" r="3.5" fill="#1f2937"/><circle cx="272" cy="66" r="3.5" fill="#1f2937"/><circle cx="184" cy="132" r="4.5" fill="#dc2626"/><text x="90" y="202" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">A(−3, −2)</text><text x="266" y="59" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">B(5, 4)</text><text x="191" y="149" font-size="12" font-family="sans-serif" fill="#dc2626" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">M(1, 1)</text></svg>`,
      diagramCaption:
        "From A(−3, −2) to B(5, 4) is 8 across and 6 up. Halfway is 4 across and 3 up, which lands on the midpoint M(1, 1).",
      workedExamples: [
        {
          title: "Midpoint with negative coordinates",
          problem: "Find the midpoint of P(−4, 7) and Q(6, −1).",
          steps: [
            "Add the x-coordinates: −4 + 6 = 2. Halve: 2 ÷ 2 = 1.",
            "Add the y-coordinates: 7 + (−1) = 6. Halve: 6 ÷ 2 = 3.",
            "Write the midpoint as a coordinate pair, x first.",
          ],
          answer: "(1, 3)",
          yourTurn: {
            question: "Your turn: find the midpoint of R(−5, 4) and S(3, −8). Give your answer as coordinates (x, y).",
            answer: { type: "list", values: [-1, -2], ordered: true, display: "(−1, −2)" },
            solution: "x: {{(-5 + 3)/2 = (-2)/2 = -1}}. y: {{(4 + (-8))/2 = (-4)/2 = -2}}. Midpoint (−1, −2).",
          },
        },
        {
          title: "When the midpoint is not on a grid point",
          problem: "Find the midpoint of (2, 5) and (7, −4).",
          steps: [
            "x: {{(2 + 7)/2 = 9/2 = 4.5}}.",
            "y: {{(5 + (-4))/2 = 1/2 = 0.5}}.",
            "Midpoints don't have to be whole numbers — halfway between two grid points can fall between grid lines.",
          ],
          answer: "(4.5, 0.5)",
        },
        {
          title: "Working backwards to a missing end",
          problem: "M(2, −1) is the midpoint of A(−3, 4) and B. Find B.",
          steps: [
            "Find the step from A to M: x goes from −3 to 2 (+5); y goes from 4 to −1 (−5).",
            "M is halfway, so B is the **same step again** from M: (2 + 5, −1 − 5) = (7, −6).",
            "Check by averaging: {{((-3 + 7)/2, (4 + (-6))/2) = (2, -1)}}. ✓",
            "Algebra route: {{(-3 + x)/2 = 2}} gives −3 + x = 4, so x = 7; {{(4 + y)/2 = -1}} gives 4 + y = −2, so y = −6.",
          ],
          answer: "B(7, −6)",
        },
      ],
      keyPoints: [
        "(x, y): across first, then up or down. Negative x is left of the y-axis; negative y is below the x-axis.",
        "Quadrants are numbered anticlockwise from the top right; points on an axis are in no quadrant.",
        "Midpoint = (mean of the x-coordinates, mean of the y-coordinates).",
        "To find a missing end, take the step from the known end to the midpoint, then take the same step again.",
      ],
      whyItWorks:
        "Going from one end to the other is a fixed amount across and a fixed amount up, so going halfway means half of each. Starting at {{x_1}} and adding half the gap gives {{x_1 + 1/2(x_2 - x_1) = 1/2 x_1 + 1/2 x_2 = (x_1 + x_2)/2}} — exactly the mean. The same algebra works for the y-coordinates.",
      strategies: ["Draw a diagram", "Use the inverse (work backwards from the midpoint)", "Check by substituting"],
      thinkDeeper:
        "The midpoint of A and B is (3, 2), and A is somewhere in the third quadrant. Which quadrant must B be in? Can you say even more — for example, how large B's x-coordinate must be? Could B ever lie on an axis?",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "special-lines",
      heading: "Lines x = a, y = b, y = x and y = −x",
      discovery: {
        problem:
          "Write down five points whose x-coordinate is 3, such as (3, 0) and (3, 5), and plot them. What do you notice?\n\nNow write down five points whose y-coordinate **equals** their x-coordinate. What shape do *those* make?",
        idea:
          "Every point with x-coordinate 3 lies on one **vertical** line. Its equation is simply x = 3, because that is the one rule all its points obey — y is free to be anything.\n\nPoints like (−2, −2), (0, 0) and (4, 4) make a diagonal line through the origin: the line y = x.",
      },
      body:
        "The **equation of a line** is a rule that every point on the line obeys — and that no point off the line obeys.\n\n- **x = a** is a **vertical** line through (a, 0). Every point on it has x-coordinate a; y can be anything. The y-axis itself is the line x = 0.\n- **y = b** is a **horizontal** line through (0, b). Every point on it has y-coordinate b. The x-axis itself is the line y = 0.\n- **y = x** is the diagonal through the origin that rises at 45°: (−3, −3), (0, 0), (2, 2), …\n- **y = −x** is the diagonal through the origin that falls at 45°: (−3, 3), (0, 0), (2, −2), …\n\n> The classic trap: x = 3 is **vertical**, even though 3 is marked on the x-axis. Think: x is stuck at 3, y is free to roam — and a free y means up and down.\n\nTwo of these lines cross at a point you can read straight off. For example, x = 4 and y = −1 meet at (4, −1).\n\nThe diagonals y = x and y = −x cross at right angles at the origin. They are also mirror lines: reflecting (5, 2) in y = x swaps the coordinates to give (2, 5).",
      diagram: `<svg viewBox="0 0 386 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from −5 to 5 showing four lines: the vertical line x = 3, the horizontal line y = −2, and the diagonals y = x and y = −x through the origin. x = 3 and y = −2 cross at (3, −2)."><rect x="0" y="0" width="386" height="300" fill="#ffffff"/><line x1="66" y1="276" x2="66" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="91" y1="276" x2="91" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="116" y1="276" x2="116" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="141" y1="276" x2="141" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="166" y1="276" x2="166" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="191" y1="276" x2="191" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="216" y1="276" x2="216" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="241" y1="276" x2="241" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="266" y1="276" x2="266" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="291" y1="276" x2="291" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="316" y1="276" x2="316" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="276" x2="316" y2="276" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="251" x2="316" y2="251" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="226" x2="316" y2="226" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="201" x2="316" y2="201" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="176" x2="316" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="151" x2="316" y2="151" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="126" x2="316" y2="126" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="101" x2="316" y2="101" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="76" x2="316" y2="76" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="51" x2="316" y2="51" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="26" x2="316" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="151" x2="316" y2="151" stroke="#334155" stroke-width="1.5"/><line x1="191" y1="276" x2="191" y2="26" stroke="#334155" stroke-width="1.5"/><line x1="66" y1="276" x2="316" y2="26" stroke="#16a34a" stroke-width="2.4"/><line x1="66" y1="26" x2="316" y2="276" stroke="#9333ea" stroke-width="2.4"/><line x1="266" y1="276" x2="266" y2="26" stroke="#2563eb" stroke-width="2.4"/><line x1="66" y1="201" x2="316" y2="201" stroke="#ea580c" stroke-width="2.4"/><text x="66" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="91" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="116" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="141" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="166" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="216" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="241" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="266" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="291" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="316" y="164" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="187" y="280" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="187" y="255" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="187" y="230" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="187" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="187" y="180" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="187" y="130" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="187" y="105" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="187" y="80" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="187" y="55" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="187" y="30" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="322" y="155" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="191" y="20" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><text x="266" y="18" font-size="13" font-family="sans-serif" fill="#2563eb" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x = 3</text><text x="61" y="205" font-size="13" font-family="sans-serif" fill="#ea580c" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = −2</text><text x="321" y="36" font-size="13" font-family="sans-serif" fill="#16a34a" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = x</text><text x="61" y="36" font-size="13" font-family="sans-serif" fill="#9333ea" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = −x</text><circle cx="266" cy="201" r="4.5" fill="#dc2626"/><text x="273" y="218" font-size="12" font-family="sans-serif" fill="#dc2626" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(3, −2)</text></svg>`,
      diagramCaption:
        "x = 3 is vertical and y = −2 is horizontal; they cross at (3, −2). The diagonals y = x and y = −x both pass through the origin.",
      workedExamples: [
        {
          title: "Naming a vertical line",
          problem: "Write down the equation of the straight line through (−2, 6) and (−2, −1).",
          steps: [
            "Compare the points: both have x-coordinate −2, while the y-coordinates differ.",
            "So every point on the line has x = −2, and y can take any value.",
            "A line with a fixed x-coordinate is vertical.",
          ],
          answer: "x = −2",
          yourTurn: {
            question: "Your turn: write down the equation of the straight line through (5, −3) and (5, 8).",
            answer: { type: "text", accept: ["x=5", "5=x"], display: "x = 5" },
            solution: "Both points have x-coordinate 5 and different y-coordinates, so the line is vertical: x = 5.",
          },
        },
        {
          title: "Where special lines cross",
          problem: "Find where (a) y = x meets x = −3, and (b) y = −x meets y = 4.",
          steps: [
            "(a) On x = −3, every point has x = −3. On y = x, y equals x, so y = −3. They meet at (−3, −3).",
            "(b) On y = 4, every point has y = 4. On y = −x, y is the negative of x, so 4 = −x, giving x = −4. They meet at (−4, 4).",
            "Check (b): is 4 the negative of −4? Yes. ✓",
          ],
          answer: "(a) (−3, −3)   (b) (−4, 4)",
        },
        {
          title: "A rectangle made of lines",
          problem:
            "A rectangle is bounded by the lines x = −1, x = 5, y = 2 and y = −3. Find its area and the coordinates of its centre.",
          steps: [
            "Width: from x = −1 to x = 5 is 5 − (−1) = 6 units.",
            "Height: from y = −3 to y = 2 is 2 − (−3) = 5 units.",
            "Area = 6 × 5 = 30 square units.",
            "The centre is the midpoint of opposite corners (−1, −3) and (5, 2): {{((-1 + 5)/2, (-3 + 2)/2) = (2, -0.5)}}.",
          ],
          answer: "Area 30 square units; centre (2, −0.5)",
        },
      ],
      keyPoints: [
        "x = a is vertical (x fixed, y free); y = b is horizontal (y fixed, x free).",
        "The x-axis is y = 0 and the y-axis is x = 0.",
        "y = x rises at 45° through the origin; y = −x falls at 45° through the origin.",
        "Points on y = x have equal coordinates; points on y = −x have opposite coordinates.",
      ],
      whyItWorks:
        "An equation picks out exactly the points that satisfy it. The rule x = 3 says nothing about y, so every value of y is allowed — that sweeps out a whole vertical line. The rule y = x says that whatever x is, y must match it, so each step of 1 to the right forces a step of 1 up: a straight line at 45°.",
      strategies: ["Try small cases (list a few points)", "Draw a diagram", "Check by substituting"],
      thinkDeeper:
        "The lines x = 2, x = −2, y = 2 and y = −2 enclose a square. Do y = x and y = −x pass through its corners? How many points with whole-number coordinates lie strictly inside the square, and how many of those lie on y = x or y = −x?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "plotting-lines",
      heading: "Plotting straight lines",
      discovery: {
        problem:
          "Complete this table for y = 2x − 1, then plot the points.\n\n| x | −2 | −1 | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|---|---|\n| y | −5 | −3 | ? | ? | ? | ? |\n\nWhat do you notice about the y-values? What do you notice about the points?",
        idea:
          "The missing values are −1, 1, 3 and 5. Each time x goes up by 1, y goes up by 2 — **the same amount every time**. Equal steps across giving equal steps up is exactly what makes the points line up in a **straight line**.",
      },
      body:
        "A **linear equation** such as y = 2x − 1 or y = 5 − 3x contains x but no {{x^2}}, {{1/x}} or other powers. Its graph is always a straight line. To draw one:\n\n1. Make a **table of values**: choose some x-values (exam questions usually give them, e.g. −2 to 3).\n2. **Substitute** each x into the equation to find y. Brackets protect negatives: y = 2 × (−2) − 1 = −5.\n3. **Plot** each pair (x, y) with a small, neat cross.\n4. Join the points with **one ruled straight line** across the whole range — not dot-to-dot segments.\n\n**Check the table before you plot.** In a linear table, y changes by the **same amount** every time x goes up by 1. If one difference is out of step, that entry is wrong.\n\n| x | −1 | 0 | 1 | 2 | 3 |\n|---|---|---|---|---|---|\n| y = 3 − 2x | 5 | 3 | 1 | −1 | −3 |\n\nHere the y-values fall by 2 each time, so the line slopes downwards. Two points are enough to fix a straight line; a third point is your safety check.\n\n**Is a point on the line?** Substitute its x-coordinate. If the equation gives its y-coordinate, the point is on the line; otherwise it is not.",
      diagram: `<svg viewBox="0 0 320 320" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of y = 2x − 1 with crosses at (−2, −5), (−1, −3), (0, −1), (1, 1) and (3, 5) on a straight line. A table beside it wrongly gives y = 4 when x = 2; the point (2, 4) is circled in red because it sits off the line."><rect x="0" y="0" width="320" height="320" fill="#ffffff"/><line x1="30" y1="276" x2="30" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="51" y1="276" x2="51" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="72" y1="276" x2="72" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="93" y1="276" x2="93" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="114" y1="276" x2="114" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="135" y1="276" x2="135" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="156" y1="276" x2="156" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="177" y1="276" x2="177" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="276" x2="177" y2="276" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="255" x2="177" y2="255" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="234" x2="177" y2="234" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="213" x2="177" y2="213" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="192" x2="177" y2="192" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="171" x2="177" y2="171" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="150" x2="177" y2="150" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="129" x2="177" y2="129" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="108" x2="177" y2="108" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="87" x2="177" y2="87" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="66" x2="177" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="45" x2="177" y2="45" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="24" x2="177" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="150" x2="177" y2="150" stroke="#334155" stroke-width="1.5"/><line x1="93" y1="276" x2="93" y2="24" stroke="#334155" stroke-width="1.5"/><line x1="40.5" y1="276" x2="166.5" y2="24" stroke="#2563eb" stroke-width="2.2"/><text x="30" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="51" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="72" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="114" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="135" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="156" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="177" y="163" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="26" y="280" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−6</text><text x="26" y="259" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="26" y="238" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="26" y="217" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="26" y="196" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="26" y="175" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="26" y="133" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="26" y="112" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="26" y="91" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="26" y="70" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="26" y="49" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="26" y="28" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="183" y="154" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="93" y="18" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><line x1="47" y1="251" x2="55" y2="259" stroke="#1f2937" stroke-width="1.8"/><line x1="47" y1="259" x2="55" y2="251" stroke="#1f2937" stroke-width="1.8"/><line x1="68" y1="209" x2="76" y2="217" stroke="#1f2937" stroke-width="1.8"/><line x1="68" y1="217" x2="76" y2="209" stroke="#1f2937" stroke-width="1.8"/><line x1="89" y1="167" x2="97" y2="175" stroke="#1f2937" stroke-width="1.8"/><line x1="89" y1="175" x2="97" y2="167" stroke="#1f2937" stroke-width="1.8"/><line x1="110" y1="125" x2="118" y2="133" stroke="#1f2937" stroke-width="1.8"/><line x1="110" y1="133" x2="118" y2="125" stroke="#1f2937" stroke-width="1.8"/><line x1="152" y1="41" x2="160" y2="49" stroke="#1f2937" stroke-width="1.8"/><line x1="152" y1="49" x2="160" y2="41" stroke="#1f2937" stroke-width="1.8"/><circle cx="135" cy="66" r="8" fill="none" stroke="#dc2626" stroke-width="1.8"/><line x1="131" y1="62" x2="139" y2="70" stroke="#dc2626" stroke-width="1.8"/><line x1="131" y1="70" x2="139" y2="62" stroke="#dc2626" stroke-width="1.8"/><text x="141" y="54" font-size="11" font-family="sans-serif" fill="#dc2626" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(2, 4)?</text><text x="116.1" y="246.6" font-size="13" font-family="sans-serif" fill="#2563eb" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = 2x − 1</text><rect x="222" y="40" width="40" height="26" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><rect x="262" y="40" width="40" height="26" fill="#c7d2fe" stroke="#334155" stroke-width="1"/><text x="242" y="57" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">x</text><text x="282" y="57" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">y</text><rect x="222" y="66" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="66" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="242" y="83" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">−2</text><text x="282" y="83" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">−5</text><rect x="222" y="92" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="92" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="242" y="109" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">−1</text><text x="282" y="109" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">−3</text><rect x="222" y="118" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="118" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="242" y="135" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">0</text><text x="282" y="135" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">−1</text><rect x="222" y="144" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="144" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="242" y="161" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">1</text><text x="282" y="161" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">1</text><rect x="222" y="170" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="170" width="40" height="26" fill="#fecaca" stroke="#334155" stroke-width="1"/><text x="242" y="187" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">2</text><text x="282" y="187" font-size="12" font-family="sans-serif" fill="#dc2626" text-anchor="middle" font-weight="bold">4</text><rect x="222" y="196" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><rect x="262" y="196" width="40" height="26" fill="#ffffff" stroke="#334155" stroke-width="1"/><text x="242" y="213" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">3</text><text x="282" y="213" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle">5</text><text x="262" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Differences:</text><text x="262" y="255" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">+2, +2, +2,</text><text x="262" y="270" font-size="11" font-family="sans-serif" fill="#dc2626" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">+3, +1  ✗</text></svg>`,
      diagramCaption:
        "The points from the table for y = 2x − 1 lie on one straight line. A slip in the table (y = 4 when x = 2) shows up twice: as a jump in the differences, and as a point that refuses to line up.",
      workedExamples: [
        {
          title: "A table with a negative coefficient",
          problem: "Complete a table of values for y = 4 − 3x for x = −1, 0, 1, 2 and 3.",
          steps: [
            "x = −1: y = 4 − 3 × (−1) = 4 + 3 = 7.",
            "x = 0: y = 4 − 0 = 4.",
            "x = 1: y = 4 − 3 = 1.",
            "x = 2: y = 4 − 6 = −2.",
            "x = 3: y = 4 − 9 = −5.",
            "Check the differences: 7, 4, 1, −2, −5 falls by 3 every time. ✓",
          ],
          answer: "y = 7, 4, 1, −2, −5",
          yourTurn: {
            question:
              "Your turn: for y = 5 − 2x, find the y-values when x = −2, x = 0 and x = 3. Give them in that order, separated by commas.",
            answer: { type: "list", values: [9, 5, -1], ordered: true, display: "9, 5, −1" },
            solution: "x = −2: 5 − 2 × (−2) = 5 + 4 = 9. x = 0: 5 − 0 = 5. x = 3: 5 − 6 = −1.",
          },
        },
        {
          title: "Spot the error",
          problem:
            "Mei's table for y = 3x + 2 gives these y-values for x = −2, −1, 0, 1, 2: −4, −1, 2, 6, 8. Which entry is wrong?",
          steps: [
            "Find the differences: −4 → −1 → 2 → 6 → 8 gives +3, +3, +4, +2.",
            "For y = 3x + 2 every difference should be +3 (the number multiplying x). The pattern breaks around x = 1.",
            "Check x = 1 directly: 3 × 1 + 2 = 5, not 6.",
          ],
          answer: "When x = 1, y should be 5 (not 6).",
        },
        {
          title: "On the line or not?",
          problem: "Does (−3, −10) lie on y = 3x − 1? Does (4, 12)?",
          steps: [
            "For (−3, −10): 3 × (−3) − 1 = −9 − 1 = −10. This matches the y-coordinate, so the point is on the line.",
            "For (4, 12): 3 × 4 − 1 = 11, not 12. The point is not on the line (it sits just above it).",
          ],
          answer: "(−3, −10) is on the line; (4, 12) is not.",
        },
      ],
      keyPoints: [
        "Table → substitute → plot → join with one ruled line across the whole range.",
        "Use brackets when substituting negatives: 2 × (−3) = −6.",
        "In a linear table, y changes by the same amount for each step of 1 in x — use this to catch errors.",
        "A point is on a line exactly when its coordinates make the equation true.",
      ],
      whyItWorks:
        "In y = mx + c, increasing x by 1 adds exactly m to the mx part and leaves c alone. So y changes by m for every step of 1 across — the same step everywhere on the graph. A path that always goes 1 across and m up never bends, so it is a straight line.",
      strategies: ["Make a table", "Find a pattern (check the differences)", "Check by substituting"],
      thinkDeeper:
        "Look-ahead: make a table for y = {{x^2}} − 4 with x from −3 to 3. Are the differences still equal? Plot the points. What shape appears — and using the differences, explain why it cannot be a straight line.",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "gradient-intercept",
      heading: "Gradient & y-intercept",
      discovery: {
        problem:
          "Three ramps at a skate park:\n\n- Ramp A rises 2 m over a horizontal distance of 4 m.\n- Ramp B rises 3 m over a horizontal distance of 5 m.\n- Ramp C rises 1 m over a horizontal distance of 2 m.\n\nWhich ramp is steepest? Are any two exactly as steep as each other?",
        idea:
          "Steepness depends on the rise **compared with** the run, not the rise alone. A: {{2/4 = 0.5}}. B: {{3/5 = 0.6}}. C: {{1/2 = 0.5}}.\n\nSo B is steepest, and A and C are exactly as steep as each other, even though A is bigger. The ratio rise ÷ run is called the **gradient**.",
      },
      body:
        "The **gradient** of a straight line measures how steep it is:\n\n    {{\"gradient\" = \"rise\"/\"run\" = \"change in y\"/\"change in x\"}}\n\nPick two points on the line. The **run** is how far you move across (always measured left to right); the **rise** is how far you move up (positive) or down (negative).\n\n- **Positive gradient**: the line goes uphill from left to right.\n- **Negative gradient**: the line goes downhill from left to right.\n- **Zero gradient**: the line is horizontal (y = b).\n- A vertical line (x = a) has no gradient you can calculate: the run is 0, and you cannot divide by 0.\n\nThere is a second way to read a gradient: it is **how much y changes when x increases by 1**. A gradient of 3 means up 3 for every 1 across; a gradient of {{-1/2}} means down 1 for every 2 across.\n\nThe **y-intercept** is where the line crosses the y-axis. Every point on the y-axis has x = 0, so the y-intercept is the point (0, c).\n\nEvery straight line except a vertical one can be written as\n\n    {{y = mx + c}}\n\nwhere **m is the gradient** and **c is the y-intercept**.\n\n| Equation | Gradient m | y-intercept c |\n|---|---|---|\n| y = 3x + 2 | 3 | 2 |\n| y = −2x + 5 | −2 | 5 |\n| y = 5 − 2x | −2 | 5 |\n| y = {{1/2}}x | {{1/2}} | 0 |\n| y = x − 4 | 1 | −4 |\n| y = 7 | 0 | 7 |\n\nLook at y = 5 − 2x: the gradient is the number multiplying x, **sign included**, wherever it sits in the equation.",
      diagram: `<svg viewBox="0 0 420 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two graphs. Left: y = 2x + 1 with a rise-and-run triangle showing a run of 2 and a rise of 4, so the gradient is 2; it crosses the y-axis at (0, 1). Right: y = −½x + 3 with a triangle showing a run of 4 and a fall of 2, so the gradient is −½; it crosses the y-axis at (0, 3)."><rect x="0" y="0" width="420" height="300" fill="#ffffff"/><line x1="34" y1="276" x2="34" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="58" y1="276" x2="58" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="82" y1="276" x2="82" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="106" y1="276" x2="106" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="130" y1="276" x2="130" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="154" y1="276" x2="154" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="276" x2="154" y2="276" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="252" x2="154" y2="252" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="228" x2="154" y2="228" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="204" x2="154" y2="204" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="180" x2="154" y2="180" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="156" x2="154" y2="156" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="132" x2="154" y2="132" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="108" x2="154" y2="108" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="84" x2="154" y2="84" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="60" x2="154" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="228" x2="154" y2="228" stroke="#334155" stroke-width="1.5"/><line x1="82" y1="276" x2="82" y2="60" stroke="#334155" stroke-width="1.5"/><polygon points="82,204 130,204 130,108" fill="#fde68a" fill-opacity="0.7" stroke="#ea580c" stroke-width="1.5"/><line x1="46" y1="276" x2="154" y2="60" stroke="#2563eb" stroke-width="2.2"/><text x="34" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="58" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="106" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="130" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="154" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="78" y="280" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="78" y="256" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="78" y="208" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="78" y="184" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="78" y="160" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="78" y="136" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="78" y="112" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="78" y="88" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="78" y="64" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="160" y="232" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="82" y="54" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><text x="108.4" y="219" font-size="11" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">run 2</text><text x="135" y="160" font-size="11" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">rise 4</text><circle cx="82" cy="204" r="4.5" fill="#dc2626"/><text x="76" y="197" font-size="11" font-family="sans-serif" fill="#dc2626" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(0, 1)</text><text x="94" y="20" font-size="13" font-family="sans-serif" fill="#2563eb" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = 2x + 1</text><text x="94" y="36" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">m = 4 ÷ 2 = 2,  c = 1</text><line x1="222" y1="276" x2="222" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="246" y1="276" x2="246" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="270" y1="276" x2="270" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="294" y1="276" x2="294" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="318" y1="276" x2="318" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="342" y1="276" x2="342" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="366" y1="276" x2="366" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="390" y1="276" x2="390" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="276" x2="390" y2="276" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="252" x2="390" y2="252" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="228" x2="390" y2="228" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="204" x2="390" y2="204" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="180" x2="390" y2="180" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="156" x2="390" y2="156" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="132" x2="390" y2="132" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="108" x2="390" y2="108" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="84" x2="390" y2="84" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="60" x2="390" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="222" y1="228" x2="390" y2="228" stroke="#334155" stroke-width="1.5"/><line x1="246" y1="276" x2="246" y2="60" stroke="#334155" stroke-width="1.5"/><polygon points="246,156 342,156 342,204" fill="#fde68a" fill-opacity="0.7" stroke="#ea580c" stroke-width="1.5"/><line x1="222" y1="144" x2="390" y2="228" stroke="#9333ea" stroke-width="2.2"/><text x="222" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="270" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="294" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="318" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="342" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="366" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="390" y="241" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="242" y="280" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="242" y="256" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="242" y="208" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="242" y="184" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="242" y="160" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="242" y="136" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="242" y="112" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="242" y="88" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="242" y="64" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="396" y="232" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="246" y="54" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><text x="315.6" y="150" font-size="11" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">run 4</text><text x="347" y="184" font-size="11" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">fall 2</text><circle cx="246" cy="156" r="4.5" fill="#dc2626"/><text x="252" y="149" font-size="11" font-family="sans-serif" fill="#dc2626" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(0, 3)</text><text x="306" y="20" font-size="13" font-family="sans-serif" fill="#9333ea" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = −½x + 3</text><text x="306" y="36" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">m = −2 ÷ 4 = −½,  c = 3</text></svg>`,
      diagramCaption:
        "Left: y = 2x + 1 rises 4 for a run of 2, so m = 2, and it crosses the y-axis at (0, 1). Right: y = {{-1/2}}x + 3 falls 2 for a run of 4, so m = {{-1/2}}, and it crosses the y-axis at (0, 3).",
      workedExamples: [
        {
          title: "Reading m and c from an equation",
          problem:
            "Write down the gradient and y-intercept of (a) y = 4x − 7, (b) y = 6 − x, (c) y = {{x/3}} + 2.",
          steps: [
            "(a) Already in the form y = mx + c: m = 4 and c = −7 (keep the minus sign).",
            "(b) Reorder: y = −x + 6. Here −x means −1 × x, so m = −1 and c = 6.",
            "(c) {{x/3}} means {{1/3}} of x, so m = {{1/3}} and c = 2.",
          ],
          answer: "(a) m = 4, c = −7   (b) m = −1, c = 6   (c) m = {{1/3}}, c = 2",
          yourTurn: {
            question: "Your turn: what is the gradient of the line y = 8 − 5x?",
            answer: { type: "number", value: -5 },
            solution: "Reorder as y = −5x + 8. The gradient is the number multiplying x, sign included: m = −5.",
          },
        },
        {
          title: "Gradient from two points on a graph",
          problem:
            "A straight line passes through (−1, 5) and (3, −3). Find its gradient, its y-intercept and its equation.",
          steps: [
            "Run (left to right): from x = −1 to x = 3 is 4.",
            "Rise: from y = 5 to y = −3 is −8 (down 8).",
            "Gradient = {{(-8)/4 = -2}}.",
            "Step from (−1, 5) one unit right to x = 0: y changes by −2, giving (0, 3). So c = 3.",
            "Equation: y = −2x + 3. Check (3, −3): −2 × 3 + 3 = −3. ✓",
          ],
          answer: "m = −2, c = 3, so y = −2x + 3",
        },
        {
          title: "Gradient as a ratio",
          problem:
            "A road sign warns of a hill with gradient 1 in 8 (up 1 m for every 8 m across). Another road rises 15 m over 100 m across. Which is steeper?",
          steps: [
            "First road: gradient = {{1/8 = 0.125}}.",
            "Second road: gradient = {{15/100 = 0.15}}.",
            "0.15 > 0.125, so the second road is steeper — even though '1 in 8' sounds dramatic.",
          ],
          answer: "The road rising 15 m over 100 m is steeper.",
        },
      ],
      keyPoints: [
        "Gradient = rise ÷ run = change in y ÷ change in x; always measure the run from left to right.",
        "Uphill means a positive gradient, downhill a negative one, and horizontal a gradient of 0.",
        "In y = mx + c, m is the gradient (the number multiplying x, with its sign) and c is the y-intercept, at (0, c).",
        "The gradient is the change in y for each increase of 1 in x.",
      ],
      whyItWorks:
        "Draw a rise/run triangle under a straight line, then slide to a different pair of points. The new triangle is an enlargement of the first — same shape, same angles — so rise ÷ run comes out the same. That is why a straight line has a single gradient.\n\nAnd in y = mx + c, putting x = 0 makes the mx term vanish, leaving y = c. So the line meets the y-axis at (0, c).",
      strategies: ["Draw a diagram (the rise/run triangle)", "Use friendly points where the line crosses grid corners", "Check by substituting"],
      thinkDeeper:
        "A line has gradient 3 and passes through (2, 5). Without drawing it, find where it crosses the y-axis. Then explain why no line with gradient 3 can pass through both (0, 0) and (1, 2).",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "equations-of-lines",
      heading: "Matching & writing line equations",
      discovery: {
        problem:
          "Here are four equations: y = 2x + 3, y = 2x − 1, y = −2x + 3 and y = 3 + 2x.\n\nWithout plotting anything: which two are actually the **same** line? Which pair are **parallel**? Which pair meet **on the y-axis**?",
        idea:
          "y = 2x + 3 and y = 3 + 2x are the same line — the order of adding doesn't matter.\n\ny = 2x + 3 and y = 2x − 1 are **parallel**: same gradient 2, different intercepts.\n\ny = 2x + 3 and y = −2x + 3 share c = 3, so both pass through (0, 3) — they meet on the y-axis, and they are mirror images in it.",
      },
      body:
        "**Matching an equation to a graph.** Read three features:\n\n1. The **sign of m**: uphill (positive) or downhill (negative)?\n2. The **size of m**: steep (big number) or shallow (small number)?\n3. The **value of c**: where does the line cross the y-axis?\n\n| Equation | Direction | Steepness | Crosses y-axis at |\n|---|---|---|---|\n| y = 3x + 1 | uphill | steep | (0, 1) |\n| y = {{-1/2}}x + 4 | downhill | shallow | (0, 4) |\n| y = x − 3 | uphill | 45° | (0, −3) |\n\nIf two graphs still look similar, test one extra point.\n\n**Parallel lines have equal gradients.** Lines that never meet must rise at the same rate, so they share m and differ only in c. For example, y = 2x + 3, y = 2x and y = 2x − 2 are all parallel.\n\n**Writing the equation of a line from its graph.** Read c where the line crosses the y-axis, find m from a rise/run triangle, then write y = mx + c.\n\n**Words → equation.** Many real rules have the shape 'starting value + rate × amount'. Any letters can play the parts of x and y.\n\n| In words | m | c | Equation |\n|---|---|---|---|\n| A gym charges a $30 joining fee plus $25 a month | 25 | 30 | C = 25n + 30 |\n| A phone starts at 80% charge and loses 5% each hour | −5 | 80 | B = 80 − 5t |\n| Multiply by 3, then subtract 7 | 3 | −7 | y = 3x − 7 |\n\n**Other forms (stretch).** An equation like 2x + y = 6 is still a straight line. Make y the subject to read off m and c: y = −2x + 6, so m = −2 and c = 6.",
      diagram: `<svg viewBox="0 0 340 310" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three parallel straight lines on one grid: y = 2x + 3 crossing the y-axis at 3, y = 2x through the origin, and y = 2x − 2 crossing at −2. All have gradient 2."><rect x="0" y="0" width="340" height="310" fill="#ffffff"/><line x1="30" y1="284" x2="30" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="50" y1="284" x2="50" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="70" y1="284" x2="70" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="90" y1="284" x2="90" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="110" y1="284" x2="110" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="130" y1="284" x2="130" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="150" y1="284" x2="150" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="170" y1="284" x2="170" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="190" y1="284" x2="190" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="284" x2="190" y2="284" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="264" x2="190" y2="264" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="244" x2="190" y2="244" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="224" x2="190" y2="224" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="204" x2="190" y2="204" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="184" x2="190" y2="184" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="164" x2="190" y2="164" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="144" x2="190" y2="144" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="124" x2="190" y2="124" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="104" x2="190" y2="104" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="84" x2="190" y2="84" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="64" x2="190" y2="64" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="44" x2="190" y2="44" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="24" x2="190" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="30" y1="164" x2="190" y2="164" stroke="#334155" stroke-width="1.5"/><line x1="110" y1="284" x2="110" y2="24" stroke="#334155" stroke-width="1.5"/><line x1="30" y1="264" x2="150" y2="24" stroke="#2563eb" stroke-width="2.2"/><line x1="50" y1="284" x2="180" y2="24" stroke="#16a34a" stroke-width="2.2"/><line x1="70" y1="284" x2="190" y2="44" stroke="#ea580c" stroke-width="2.2"/><text x="30" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="50" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="70" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="90" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="130" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="150" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="170" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="190" y="177" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="26" y="288" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−6</text><text x="26" y="268" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−5</text><text x="26" y="248" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−4</text><text x="26" y="228" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="26" y="208" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="26" y="188" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="26" y="148" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="26" y="128" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="26" y="108" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="26" y="88" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="26" y="68" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="26" y="48" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="26" y="28" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="196" y="168" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="110" y="18" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><circle cx="110" cy="104" r="4" fill="#2563eb"/><circle cx="110" cy="164" r="4" fill="#16a34a"/><circle cx="110" cy="204" r="4" fill="#ea580c"/><text x="222" y="48" font-size="12" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">All have m = 2</text><line x1="222" y1="70" x2="246" y2="70" stroke="#2563eb" stroke-width="3"/><text x="252" y="74" font-size="12" font-family="sans-serif" fill="#2563eb" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = 2x + 3</text><text x="252" y="89" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">c = 3</text><line x1="222" y1="110" x2="246" y2="110" stroke="#16a34a" stroke-width="3"/><text x="252" y="114" font-size="12" font-family="sans-serif" fill="#16a34a" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = 2x</text><text x="252" y="129" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">c = 0</text><line x1="222" y1="150" x2="246" y2="150" stroke="#ea580c" stroke-width="3"/><text x="252" y="154" font-size="12" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y = 2x − 2</text><text x="252" y="169" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">c = −2</text><text x="222" y="196" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Same steepness,</text><text x="222" y="210" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">different starts:</text><text x="222" y="224" font-size="11" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">they never meet.</text></svg>`,
      diagramCaption:
        "y = 2x + 3, y = 2x and y = 2x − 2 all have gradient 2, so they are parallel. Changing c just slides the line up or down.",
      workedExamples: [
        {
          title: "Equation from a graph",
          problem: "A straight line crosses the y-axis at (0, −2) and passes through (3, 4). Find its equation.",
          steps: [
            "The y-intercept is (0, −2), so c = −2.",
            "From (0, −2) to (3, 4): run 3, rise 6. Gradient m = {{6/3 = 2}}.",
            "Write y = mx + c: y = 2x − 2.",
            "Check (3, 4): 2 × 3 − 2 = 4. ✓",
          ],
          answer: "y = 2x − 2",
          yourTurn: {
            question:
              "Your turn: a straight line crosses the y-axis at (0, 5) and passes through (2, −1). Write its equation in the form y = mx + c.",
            answer: { type: "expression", expr: "y=-3x+5", display: "y = −3x + 5" },
            solution: "c = 5. From (0, 5) to (2, −1): run 2, change in y −6, so m = −6 ÷ 2 = −3. The line is y = −3x + 5.",
          },
        },
        {
          title: "A parallel line through a point",
          problem: "Find the equation of the line parallel to y = 2x + 7 that passes through (3, 1).",
          steps: [
            "Parallel means the same gradient, so m = 2: the line is y = 2x + c.",
            "The point (3, 1) is on it, so substitute x = 3 and y = 1: 1 = 2 × 3 + c.",
            "1 = 6 + c, so c = −5.",
            "Check: 2 × 3 − 5 = 1. ✓",
          ],
          answer: "y = 2x − 5",
        },
        {
          title: "From words to a graph and back",
          problem:
            "A 200-litre water tank drains at 15 litres per minute. (a) Write an equation for the volume V litres after t minutes. (b) What do the gradient and the intercept mean? (c) When is the tank empty?",
          steps: [
            "(a) Start at 200 and lose 15 each minute: V = 200 − 15t.",
            "(b) Gradient −15: the volume changes by −15 litres every minute (negative because it is draining). Intercept 200: the volume at t = 0.",
            "(c) Empty means V = 0: 200 − 15t = 0, so 15t = 200 and t = {{200/15 = 13 1/3}}.",
            "{{1/3}} of a minute is 20 seconds.",
          ],
          answer: "V = 200 − 15t; empty after {{13 1/3}} minutes (13 minutes 20 seconds).",
        },
      ],
      keyPoints: [
        "Match graphs using the sign of m (uphill or downhill), its size (steepness) and c (where the line crosses the y-axis).",
        "Parallel lines have equal gradients; lines with the same c meet on the y-axis.",
        "Words to equation: y = rate × amount + starting value, i.e. y = mx + c.",
        "Rearrange forms like 2x + y = 6 into y = mx + c before reading off m and c.",
      ],
      whyItWorks:
        "Two lines with the same gradient go up by the same amount for every step across, so the vertical gap between them never changes — it is always the difference between their c values. A gap that never changes never closes, so the lines never meet: they are parallel.\n\nIf the gradients differ, the gap changes by a fixed amount every step, so going one way or the other along the x-axis it shrinks to zero and the lines cross.",
      strategies: ["Read the features (sign of m, size of m, value of c)", "Check by substituting a point", "Introduce a variable (for word problems)"],
      thinkDeeper:
        "Stretch: the line 3x + 2y = 12 crosses both axes. Find both crossing points without rearranging (on the x-axis, what is y?). Use them to find the gradient. For drawing this line, which is quicker — a table of values, or the two intercepts?",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "direct-proportion-graphs",
      heading: "Direct proportion graphs",
      discovery: {
        problem:
          "Two mobile data plans:\n\n- Plan P: $3 per GB used.\n- Plan Q: $6 a month, plus $2 per GB.\n\nMake a small table of the cost of 0, 1, 2 and 4 GB on each plan. If you double the data, does the cost double? Which graph passes through (0, 0)?",
        idea:
          "Plan P: $0, $3, $6, $12. Plan Q: $6, $8, $10, $14.\n\nOn Plan P, zero data costs nothing and doubling the data always doubles the cost — the cost is **directly proportional** to the data, and its graph is a straight line **through the origin**. Plan Q's graph is also straight, but the $6 fixed charge lifts it off the origin: 2 GB costs $10, but 4 GB costs $14, not $20.",
      },
      body:
        "Two quantities are in **direct proportion** when one is always the same multiple of the other:\n\n    {{y = kx}}\n\nThe fixed multiplier k is the **constant of proportionality**.\n\nA direct proportion graph has two signature features — and it needs **both**:\n\n- it is a **straight line**, and\n- it passes through the **origin** (0, 0): no input, no output.\n\ny = 2x + 6 is straight but misses the origin, so it is not direct proportion.\n\n**k is the gradient.** y = kx is just y = mx + c with m = k and c = 0. The gradient is also the **rate** or **unit value**: the cost of 1 GB, the number of km in 1 mile, the number of ringgit per Singapore dollar. Find it from any point on the line (other than the origin): {{k = y/x}}.\n\n**Conversion graphs** are direct proportion graphs used to change units. Go from the value on one axis to the line, then across (or down) to the other axis. For values beyond the edge of the graph, use the rate or scale up: if 10 miles ≈ 16 km, then 100 miles ≈ 160 km.\n\n| Miles | 0 | 5 | 10 | 25 | 50 |\n|---|---|---|---|---|---|\n| Kilometres | 0 | 8 | 16 | 40 | 80 |\n\nkm ÷ miles = 1.6 for every pair. A constant ratio is the test for direct proportion in a table.",
      diagram: `<svg viewBox="0 0 330 276" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Conversion graph with miles from 0 to 50 across and kilometres from 0 to 80 up. A straight line runs from the origin to (50, 80). Dashed red guide lines go up from 25 miles to the line and across to 40 km."><rect x="0" y="0" width="330" height="276" fill="#ffffff"/><line x1="52" y1="226" x2="52" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="77" y1="226" x2="77" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="102" y1="226" x2="102" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="127" y1="226" x2="127" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="152" y1="226" x2="152" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="177" y1="226" x2="177" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="202" y1="226" x2="202" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="227" y1="226" x2="227" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="252" y1="226" x2="252" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="277" y1="226" x2="277" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="302" y1="226" x2="302" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="226" x2="302" y2="226" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="201" x2="302" y2="201" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="176" x2="302" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="151" x2="302" y2="151" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="126" x2="302" y2="126" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="101" x2="302" y2="101" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="76" x2="302" y2="76" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="51" x2="302" y2="51" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="26" x2="302" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="226" x2="302" y2="226" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="226" x2="52" y2="26" stroke="#334155" stroke-width="1.5"/><text x="52" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">0</text><text x="102" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">10</text><text x="152" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">20</text><text x="202" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">30</text><text x="252" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">40</text><text x="302" y="240" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">50</text><text x="47" y="230" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">0</text><text x="47" y="180" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">20</text><text x="47" y="130" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">40</text><text x="47" y="80" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">60</text><text x="47" y="30" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">80</text><text x="177" y="258" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Miles</text><text x="16" y="126" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" transform="rotate(-90 16 126)" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Kilometres</text><line x1="52" y1="226" x2="302" y2="26" stroke="#2563eb" stroke-width="2.4"/><line x1="177" y1="226" x2="177" y2="126" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5 3"/><line x1="177" y1="126" x2="52" y2="126" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5 3"/><polygon points="173,180 177,172 181,180" fill="#dc2626"/><polygon points="118.5,122 110.5,126 118.5,130" fill="#dc2626"/><circle cx="177" cy="126" r="3.5" fill="#dc2626"/><text x="184" y="141" font-size="11" font-family="sans-serif" fill="#dc2626" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(25, 40)</text><text x="202" y="46" font-size="12" font-family="sans-serif" fill="#2563eb" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">km = 1.6 × miles</text><circle cx="52" cy="226" r="3.5" fill="#1f2937"/></svg>`,
      diagramCaption:
        "A conversion graph: from 25 miles go up to the line, then across to read about 40 km. The gradient, 1.6, is the number of kilometres in one mile.",
      workedExamples: [
        {
          title: "Finding k, then using it",
          problem:
            "The cost $C of rice is directly proportional to its mass, w kg. 5 kg costs $9. (a) Find a formula for C in terms of w. (b) Find the cost of 12 kg.",
          steps: [
            "(a) C = kw. Use the known pair: 9 = k × 5, so k = 9 ÷ 5 = 1.8.",
            "So C = 1.8w. In words: rice costs $1.80 per kg — that is the gradient.",
            "(b) C = 1.8 × 12 = 21.6.",
          ],
          answer: "C = 1.8w; 12 kg costs $21.60",
          yourTurn: {
            question:
              "Your turn: the cost of printing is directly proportional to the number of pages. 40 pages cost $6. How much do 150 pages cost, in dollars?",
            answer: { type: "number", value: 22.5, display: "$22.50" },
            solution: "k = 6 ÷ 40 = 0.15 dollars per page. Cost = 0.15 × 150 = $22.50.",
          },
        },
        {
          title: "Is it direct proportion?",
          problem:
            "Table 1: when x = 2, 5 and 8, y = 7, 17.5 and 28. Table 2: when x = 2, 5 and 8, y = 9, 18 and 27. Which table shows direct proportion?",
          steps: [
            "Table 1: y ÷ x = 7 ÷ 2 = 3.5, 17.5 ÷ 5 = 3.5, 28 ÷ 8 = 3.5. Always 3.5, so y = 3.5x — direct proportion.",
            "Table 2: 9 ÷ 2 = 4.5 but 18 ÷ 5 = 3.6. Not constant, so not direct proportion.",
            "Table 2 is still linear (y goes up by 9 every time x goes up by 3): it is y = 3x + 3, a straight line that misses the origin.",
          ],
          answer: "Table 1 only (y = 3.5x).",
        },
        {
          title: "Reading a conversion backwards",
          problem:
            "Suppose $1 (Singapore dollar) = RM 3.40 (Malaysian ringgit). A durian in Johor Bahru costs RM 51. What is that in Singapore dollars?",
          steps: [
            "The conversion line is RM = 3.4 × SGD: a straight line through the origin with gradient 3.4.",
            "Going from ringgit back to dollars reverses the multiplication, so divide by the gradient.",
            "51 ÷ 3.4 = 15.",
            "Check: 15 × 3.4 = 51. ✓",
          ],
          answer: "$15",
        },
      ],
      keyPoints: [
        "Direct proportion means y = kx: a straight line through the origin.",
        "k is the gradient, the rate and the unit value: {{k = y/x}} for any point on the line.",
        "A straight line that misses the origin (y = mx + c with c ≠ 0) is NOT direct proportion.",
        "In a table, y ÷ x is the same for every pair.",
      ],
      whyItWorks:
        "If y = kx, then x = 0 gives y = 0, so the graph has to start at the origin. Doubling x takes y from kx to 2kx — so doubling one quantity doubles the other.\n\nAdd a fixed charge c and the doubling breaks: doubling x gives 2kx + c, which is not 2(kx + c) = 2kx + 2c.",
      strategies: ["Find the unit value (one part first)", "Use a ratio table", "Check by substituting"],
      thinkDeeper:
        "Is the number of wheels in a bicycle rack directly proportional to the number of bicycles in it? Is your age directly proportional to your mother's age? For each, sketch the graph and decide, using both the origin test and the doubling test.",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "real-life-graphs",
      heading: "Real-life & distance–time graphs",
      discovery: {
        problem:
          "Priya cycles from home to East Coast Park, rests, then cycles home. Her distance from home is plotted against time:\n\n- 0 to 30 minutes: a straight line rising from 0 km to 6 km.\n- 30 to 50 minutes: flat at 6 km.\n- 50 to 70 minutes: a straight line falling back to 0 km.\n\nWhen was she resting? Was she faster going or coming back — and how can you tell from the *shape* alone?",
        idea:
          "Flat means her distance from home wasn't changing, so she rested from 30 to 50 minutes.\n\nThe return line is **steeper**: 6 km in 20 minutes instead of 6 km in 30 minutes. So she was faster coming home. On a distance–time graph, **steepness is speed** — the gradient is distance ÷ time.",
      },
      body:
        "Real-life graphs tell stories. Before reading any numbers, read the **axes** (what is plotted, and in what units) and then the **shape**.\n\n**Distance–time graphs** plot distance from a starting point (up) against time (across).\n\n- **Gradient = speed** (distance ÷ time). Steeper means faster.\n- A **horizontal** section means stationary — not moving.\n- A section going **down** means travelling back towards the start.\n- A **curve** means the speed is changing: getting steeper means speeding up; flattening out means slowing down.\n\n    {{\"speed\" = \"distance\"/\"time\"}}\n\nWatch the units. If time is in minutes but you want km/h, convert: 6 km in 30 minutes is 6 km in {{1/2}} an hour, which is 12 km/h.\n\n**Multi-part graphs** are made of several straight pieces. Treat each piece separately: find its gradient (the rate) and say what it means in context.\n\n**Where two graphs cross**, both quantities are equal at the same moment. On two distance–time graphs drawn on the same axes, a crossing point means the two travellers are in the same place at the same time — they meet. On two cost graphs, the crossing is the **break-even point**, where both options cost the same.\n\nThe same reading skills work for other real-life graphs: water depth as a container fills, temperature through the day, a phone bill against data used.",
      diagram: `<svg viewBox="0 0 360 246" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance–time graph of a bike ride. Distance from home in km goes up to 7; time in minutes goes across to 70. Section A rises from 0 km at 0 minutes to 6 km at 30 minutes. Section B is flat at 6 km from 30 to 50 minutes. Section C falls back to 0 km at 70 minutes, and is steeper than A."><rect x="0" y="0" width="360" height="246" fill="#ffffff"/><line x1="56" y1="200" x2="56" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="96" y1="200" x2="96" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="136" y1="200" x2="136" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="176" y1="200" x2="176" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="216" y1="200" x2="216" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="256" y1="200" x2="256" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="296" y1="200" x2="296" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="336" y1="200" x2="336" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="200" x2="336" y2="200" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="175" x2="336" y2="175" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="150" x2="336" y2="150" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="125" x2="336" y2="125" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="100" x2="336" y2="100" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="75" x2="336" y2="75" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="50" x2="336" y2="50" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="25" x2="336" y2="25" stroke="#e5e7eb" stroke-width="1"/><line x1="56" y1="200" x2="336" y2="200" stroke="#334155" stroke-width="1.5"/><line x1="56" y1="200" x2="56" y2="25" stroke="#334155" stroke-width="1.5"/><text x="56" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">0</text><text x="96" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">10</text><text x="136" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">20</text><text x="176" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">30</text><text x="216" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">40</text><text x="256" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">50</text><text x="296" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">60</text><text x="336" y="214" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">70</text><text x="51" y="204" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">0</text><text x="51" y="179" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="51" y="154" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="51" y="129" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="51" y="104" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="51" y="79" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="51" y="54" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="51" y="29" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="196" y="232" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Time (minutes)</text><text x="18" y="112.5" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" transform="rotate(-90 18 112.5)" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Distance from home (km)</text><polyline points="56,200 176,50 256,50 336,200" fill="none" stroke="#2563eb" stroke-width="2.6"/><circle cx="176" cy="50" r="3.5" fill="#1f2937"/><circle cx="256" cy="50" r="3.5" fill="#1f2937"/><text x="88" y="72.5" font-size="14" font-family="sans-serif" fill="#2563eb" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">A</text><text x="88" y="87.5" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">12 km/h</text><text x="216" y="40" font-size="12" font-family="sans-serif" fill="#2563eb" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">B: resting</text><text x="308" y="72.5" font-size="14" font-family="sans-serif" fill="#2563eb" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">C</text><text x="308" y="87.5" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">18 km/h</text></svg>`,
      diagramCaption:
        "Priya's ride. A: 6 km in 30 minutes (12 km/h). B: flat, so resting. C: 6 km back in 20 minutes (18 km/h) — the steeper line is the faster journey.",
      workedExamples: [
        {
          title: "Speed from a distance–time graph",
          problem: "Using Priya's graph, find her speed in km/h (a) on the way to the park, (b) on the way home.",
          steps: [
            "(a) 6 km in 30 minutes. 30 minutes = {{1/2}} hour, so speed = 6 ÷ {{1/2}} = 12 km/h.",
            "(b) 6 km in 20 minutes. 20 minutes = {{1/3}} hour, so speed = 6 ÷ {{1/3}} = 18 km/h.",
            "Sense check: section C is steeper on the graph, and 18 > 12. ✓",
          ],
          answer: "(a) 12 km/h   (b) 18 km/h",
          yourTurn: {
            question:
              "Your turn: Jun walks 3 km in 45 minutes at a steady speed. What is the gradient of his distance–time graph, as a speed in km/h?",
            answer: { type: "number", value: 4, display: "4 km/h" },
            solution: "45 minutes = {{3/4}} hour. Speed = 3 ÷ {{3/4}} = 4 km/h.",
          },
        },
        {
          title: "When and where do they meet?",
          problem:
            "At 9:00, Aisha leaves home and walks towards the library, 6 km away, at 4 km/h. At the same moment Ethan leaves the library and cycles towards Aisha's home along the same road at 8 km/h. When and where do they meet?",
          steps: [
            "Measure distance from Aisha's home and time t in hours after 9:00.",
            "Aisha's graph starts at (0, 0) with gradient 4: d = 4t.",
            "Ethan's graph starts at (0, 6) with gradient −8 (coming towards her home): d = 6 − 8t.",
            "They meet where the lines cross: 4t = 6 − 8t, so 12t = 6 and t = {{1/2}} hour.",
            "Distance: d = 4 × {{1/2}} = 2 km from Aisha's home. Check Ethan: 6 − 8 × {{1/2}} = 2. ✓",
            "Another way: they close the gap at 4 + 8 = 12 km/h, and 6 km at 12 km/h takes {{1/2}} hour.",
          ],
          answer: "At 9:30, 2 km from Aisha's home.",
        },
        {
          title: "A break-even point",
          problem:
            "Bike hire: Shop X charges $8 plus $3 per hour. Shop Y charges $5 per hour with no fixed fee. When do they cost the same? Which shop is cheaper for a 6-hour ride?",
          steps: [
            "Shop X: C = 3h + 8 (starts at $8, gradient 3). Shop Y: C = 5h (through the origin, gradient 5).",
            "Same cost where the graphs cross: 3h + 8 = 5h, so 8 = 2h and h = 4.",
            "At 4 hours both cost 5 × 4 = $20.",
            "For 6 hours: X costs 3 × 6 + 8 = $26 and Y costs 5 × 6 = $30.",
            "Y's line is steeper, so after the crossing it stays above X's line.",
          ],
          answer: "Same cost at 4 hours ($20). For 6 hours, Shop X is cheaper ($26 vs $30).",
        },
      ],
      keyPoints: [
        "Distance–time: gradient = speed; flat = stopped; going down = returning towards the start.",
        "Check the units before calculating a speed (convert minutes to hours for km/h).",
        "A crossing point means equal values at the same moment: a meeting point or a break-even point.",
        "Steeper means a faster rate of change; a curve means the rate is changing.",
      ],
      whyItWorks:
        "A gradient is the change in the up-quantity divided by the change in the across-quantity. On a distance–time graph that is change in distance ÷ change in time — which is exactly the definition of speed.\n\nIn general, the gradient of any real-life graph is a **rate**, and its units are 'up-units per across-unit': km per hour, dollars per GB, litres per minute.",
      strategies: ["Read the axes first", "Split into cases (one section at a time)", "Draw a diagram (sketch both graphs on one set of axes)"],
      thinkDeeper:
        "A glass is narrow at the bottom and wider at the top. Water is poured in at a steady rate. Sketch a graph of the depth of water against time. Is it a straight line? Does it get steeper or less steep as the glass fills — and why?",
    },
    // ------------------------------------------------------------------ 8
    {
      id: "line-through-two-points",
      heading: "The line through two points",
      discovery: {
        problem:
          "A straight line passes through (2, 1) and (6, 7). Without drawing it accurately, can you work out where it crosses the y-axis?\n\nHint: how much does y change for each step of 1 in x?",
        idea:
          "From x = 2 to x = 6 is 4 steps, and y rises by 6, so each step of 1 adds {{6/4 = 3/2}}. Getting from x = 2 back to x = 0 is 2 steps backwards, so y falls by {{2 * 3/2 = 3}}: from 1 down to −2.\n\nThe line is {{y = 3/2 x - 2}}.",
      },
      body:
        "**Stretch:** two points fix a straight line, so you can always find its equation from two points — no graph needed.\n\n**Step 1 — the gradient.** For points {{(x_1, y_1)}} and {{(x_2, y_2)}}:\n\n    {{m = (y_2 - y_1)/(x_2 - x_1)}}\n\nSubtract in the **same order** on the top and the bottom (second point minus first point, both times).\n\n**Step 2 — the intercept.** Substitute m and either point into y = mx + c, then solve for c.\n\n**Step 3 — check** with the other point.\n\nA second route to c is to step along the line to x = 0 using the gradient, as in the discovery problem. This is often quicker when a point is close to the y-axis.\n\nIf the two points have the same x-coordinate, the run is zero: the line is vertical, x = a, and has no y = mx + c form.",
      diagram: `<svg viewBox="0 0 260 290" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A straight line through P(2, 1) and Q(6, 7). A triangle between them shows a run of 4 and a rise of 6, so the gradient is 6 ÷ 4 = 1.5. Extended back, the line crosses the y-axis at (0, −2)."><rect x="0" y="0" width="260" height="290" fill="#ffffff"/><line x1="34" y1="255" x2="34" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="55" y1="255" x2="55" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="76" y1="255" x2="76" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="97" y1="255" x2="97" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="118" y1="255" x2="118" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="139" y1="255" x2="139" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="160" y1="255" x2="160" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="181" y1="255" x2="181" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="202" y1="255" x2="202" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="255" x2="202" y2="255" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="234" x2="202" y2="234" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="213" x2="202" y2="213" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="192" x2="202" y2="192" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="171" x2="202" y2="171" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="150" x2="202" y2="150" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="129" x2="202" y2="129" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="108" x2="202" y2="108" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="87" x2="202" y2="87" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="66" x2="202" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="45" x2="202" y2="45" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="24" x2="202" y2="24" stroke="#e5e7eb" stroke-width="1"/><line x1="34" y1="192" x2="202" y2="192" stroke="#334155" stroke-width="1.5"/><line x1="55" y1="255" x2="55" y2="24" stroke="#334155" stroke-width="1.5"/><polygon points="97,171 181,171 181,45" fill="#fde68a" fill-opacity="0.7" stroke="#ea580c" stroke-width="1.5"/><line x1="41" y1="255" x2="195" y2="24" stroke="#2563eb" stroke-width="2.2"/><text x="34" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="76" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="97" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="118" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="139" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="160" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="181" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="202" y="205" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="51" y="259" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−3</text><text x="51" y="238" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−2</text><text x="51" y="217" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">−1</text><text x="51" y="175" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">1</text><text x="51" y="154" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">2</text><text x="51" y="133" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">3</text><text x="51" y="112" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">4</text><text x="51" y="91" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">5</text><text x="51" y="70" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">6</text><text x="51" y="49" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">7</text><text x="51" y="28" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">8</text><text x="208" y="196" font-size="13" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">x</text><text x="55" y="18" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">y</text><text x="154.8" y="165" font-size="11" font-family="sans-serif" fill="#ea580c" text-anchor="middle" font-weight="bold">run 4</text><text x="186" y="112" font-size="11" font-family="sans-serif" fill="#ea580c" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">rise 6</text><circle cx="97" cy="171" r="3.5" fill="#1f2937"/><circle cx="181" cy="45" r="3.5" fill="#1f2937"/><text x="103" y="187" font-size="12" font-family="sans-serif" fill="#1f2937" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">P(2, 1)</text><text x="174" y="41" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="end" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">Q(6, 7)</text><circle cx="55" cy="234" r="4.5" fill="#dc2626"/><text x="63" y="238" font-size="12" font-family="sans-serif" fill="#dc2626" font-weight="bold" stroke="#ffffff" stroke-width="3" stroke-linejoin="round" paint-order="stroke">(0, −2)</text></svg>`,
      diagramCaption:
        "Between P(2, 1) and Q(6, 7) the run is 4 and the rise is 6, so m = {{6/4 = 3/2}}. Extending the line back to the y-axis shows c = −2.",
      workedExamples: [
        {
          title: "Two points to y = mx + c",
          problem: "Find the equation of the line through (1, 5) and (4, 14).",
          steps: [
            "Gradient: {{m = (14 - 5)/(4 - 1) = 9/3 = 3}}.",
            "Substitute (1, 5) into y = 3x + c: 5 = 3 × 1 + c, so c = 2.",
            "Check (4, 14): 3 × 4 + 2 = 14. ✓",
          ],
          answer: "y = 3x + 2",
          yourTurn: {
            question:
              "Your turn: find the equation of the line through (2, 3) and (5, 15). Give it in the form y = mx + c.",
            answer: { type: "expression", expr: "y=4x-5", display: "y = 4x − 5" },
            solution: "m = {{(15 - 3)/(5 - 2) = 12/3 = 4}}. Substitute (2, 3): 3 = 4 × 2 + c, so c = −5. Line: y = 4x − 5. Check (5, 15): 20 − 5 = 15.",
          },
        },
        {
          title: "Negative gradient, negative coordinates",
          problem: "Find the equation of the line through (−2, 7) and (3, −8).",
          steps: [
            "Gradient: {{m = (-8 - 7)/(3 - (-2)) = (-15)/5 = -3}}.",
            "Substitute (−2, 7) into y = −3x + c: 7 = −3 × (−2) + c = 6 + c, so c = 1.",
            "Check (3, −8): −3 × 3 + 1 = −8. ✓",
          ],
          answer: "y = −3x + 1",
        },
        {
          title: "A fractional gradient",
          problem: "Find the equation of the line through (−4, 0) and (4, 6).",
          steps: [
            "Gradient: {{m = (6 - 0)/(4 - (-4)) = 6/8 = 3/4}}.",
            "Substitute (4, 6): {{6 = 3/4 * 4 + c = 3 + c}}, so c = 3.",
            "Shortcut: the midpoint of the two points is {{((-4 + 4)/2, (0 + 6)/2) = (0, 3)}}. It lies on the y-axis, so it *is* the y-intercept.",
          ],
          answer: "y = {{3/4}}x + 3",
        },
      ],
      keyPoints: [
        "{{m = (y_2 - y_1)/(x_2 - x_1)}}: subtract in the same order on top and bottom.",
        "Then substitute one point into y = mx + c to find c.",
        "Check with the second point: a sign slip shows up immediately.",
        "Two points with the same x-coordinate give a vertical line, x = a.",
      ],
      whyItWorks:
        "Between the two points the line rises {{y_2 - y_1}} over a run of {{x_2 - x_1}}, and a straight line has the same gradient everywhere, so that ratio is m.\n\nOnce m is known, the only unknown left in y = mx + c is c. Any point on the line must satisfy the equation, so substituting one point pins c down.",
      strategies: ["Work backwards (step along the line to x = 0)", "Check by substituting", "Use the inverse (solve for c)"],
      thinkDeeper:
        "Do the points (1, 2), (4, 8) and (7, 13) all lie on one straight line? Decide by comparing gradients. Then find the point with x = 10 that lies on the line through the first two points.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What does the point (−3, 5) mean?", back: "Start at the origin, go 3 left, then 5 up. x (across) first, then y (up/down)." },
      { front: "Which quadrant contains (4, −2)?", back: "The fourth quadrant: x positive, y negative (bottom right)." },
      { front: "Midpoint of {{(x_1, y_1)}} and {{(x_2, y_2)}}", back: "{{((x_1 + x_2)/2, (y_1 + y_2)/2)}}: the mean of the x's and the mean of the y's." },
      { front: "Is x = 4 vertical or horizontal?", back: "Vertical. x is stuck at 4 while y can be anything." },
      { front: "Equation of the x-axis? Of the y-axis?", back: "x-axis: y = 0. y-axis: x = 0." },
      { front: "Describe the line y = −x.", back: "A straight line through the origin falling at 45°; its points have opposite coordinates, like (3, −3)." },
      { front: "What is the gradient of a line?", back: "Rise ÷ run = change in y ÷ change in x: how much y goes up when x goes up by 1." },
      { front: "In y = mx + c, what are m and c?", back: "m is the gradient; c is the y-intercept, the point (0, c)." },
      { front: "Gradient and y-intercept of y = 7 − 2x?", back: "m = −2 and c = 7. The gradient is the number multiplying x, sign included." },
      { front: "How can you tell from the equations that two lines are parallel?", back: "They have the same gradient m (once both are written as y = mx + c)." },
      { front: "How do you spot an error in a table of values for y = mx + c?", back: "y should change by m every time x goes up by 1. A difference that is out of step marks the wrong entry." },
      { front: "What does a direct proportion graph look like?", back: "A straight line through the origin: y = kx, where k is the gradient." },
      { front: "On a distance–time graph, what does the gradient tell you?", back: "The speed. A flat section means stopped; steeper means faster." },
      { front: "What does the crossing point of two real-life graphs mean?", back: "Both quantities are equal at that moment — e.g. two travellers meet, or two price plans cost the same." },
      { front: "How do you find the line through two points?", back: "{{m = (y_2 - y_1)/(x_2 - x_1)}}, then substitute one point into y = mx + c to find c." },
      { front: "Gradient of 2x + y = 6?", back: "Rearrange to y = −2x + 6: gradient −2, y-intercept 6." },
    ],
    mustKnow: [
      "I can plot and read coordinates in all four quadrants.",
      "I can find the midpoint of a line segment, and find a missing end from the midpoint.",
      "I can recognise and draw the lines x = a, y = b, y = x and y = −x.",
      "I can complete a table of values for y = mx + c (including negative x-values) and plot the line.",
      "I can spot an error in a table of values by checking the differences.",
      "I can find the gradient of a line as rise ÷ run, including negative gradients.",
      "I can read the gradient and y-intercept from y = mx + c, even when it is written as y = c + mx.",
      "I can match equations to graphs and recognise parallel lines from equal gradients.",
      "I can turn a description in words into y = mx + c and explain what m and c mean in context.",
      "I can recognise direct proportion as a straight line through the origin, find k, and use conversion graphs.",
      "I can interpret distance–time and other multi-part graphs, including speed as a gradient and the meaning of crossing points.",
      "I can find the equation of the line through two points (stretch).",
    ],
    misconceptions: [
      {
        wrong: "x = 3 is a horizontal line, because 3 is on the x-axis.",
        right: "x = 3 is vertical: every point on it has x-coordinate 3 while y varies, e.g. (3, −1), (3, 0), (3, 5).",
      },
      {
        wrong: "(2, 5) and (5, 2) are the same point.",
        right: "Order matters. (2, 5) is 2 across and 5 up; (5, 2) is 5 across and 2 up. They are different points (reflections of each other in y = x).",
      },
      {
        wrong: "In y = 5 − 2x the gradient is 5, because it comes first.",
        right: "The gradient is the number multiplying x, with its sign: m = −2 and c = 5.",
      },
      {
        wrong: "Gradient = run ÷ rise (across ÷ up).",
        right: "Gradient = rise ÷ run = change in y ÷ change in x. A steeper line must have a bigger gradient, so the rise goes on top.",
      },
      {
        wrong: "Any straight-line graph shows direct proportion.",
        right: "Only straight lines through the origin, y = kx. y = 3x + 2 is straight but not proportional: doubling x does not double y.",
      },
      {
        wrong: "On a distance–time graph, a horizontal line means moving at a steady speed.",
        right: "Horizontal means the distance isn't changing, so the object is stationary. A steady speed is a sloping straight line.",
      },
    ],
    examMistakes: [
      "Plotting (x, y) the wrong way round — always across first, then up or down.",
      "Sign slips when substituting negatives: for y = 4 − 3x at x = −2, y = 4 − 3 × (−2) = 10, not −2.",
      "Joining plotted points dot-to-dot instead of drawing one ruled straight line across the full range.",
      "Counting squares for a gradient when the two axes have different scales — use the values on the axes, not the squares.",
      "Losing the minus sign on a downhill gradient.",
      "Mixing minutes and hours when finding a speed from a distance–time graph.",
      "Subtracting coordinates in different orders on the top and bottom of the gradient formula.",
      "Finding a midpoint by adding the coordinates but forgetting to halve (or halving only one of them).",
    ],
    mnemonics: [
      {
        topic: "Order of coordinates",
        device: "Along the corridor, then up (or down) the stairs.",
        explanation: "In (x, y) you move across first (x), then up or down (y).",
      },
      {
        topic: "Vertical and horizontal lines",
        device: "The line runs parallel to the OTHER axis.",
        explanation: "x = 3 runs parallel to the y-axis (vertical); y = 3 runs parallel to the x-axis (horizontal).",
      },
      {
        topic: "Gradient",
        device: "Rise over run — you rise from your seat before you run.",
        explanation: "Gradient = rise ÷ run = vertical change ÷ horizontal change. Rise comes first, on top.",
      },
      {
        topic: "y = mx + c",
        device: "m for mountain, c for crossing.",
        explanation: "m tells you how steep the mountain is (the gradient); c tells you where the line crosses the y-axis.",
      },
    ],
    realWorld: [
      {
        title: "Maps and GPS",
        detail: "Street directories and map apps use coordinate grids, and GPS gives every place on Earth a pair of coordinates (latitude, longitude).",
        emoji: "🗺️",
      },
      {
        title: "Train timetables",
        detail: "Railway planners draw distance–time graphs for every train on a line. Steeper lines are faster trains, and where two lines cross, two trains pass each other.",
        emoji: "🚆",
      },
      {
        title: "Changing money",
        detail: "Converting Singapore dollars to ringgit, yen or euros is direct proportion: the exchange rate is the gradient of the conversion graph.",
        emoji: "💱",
      },
      {
        title: "Phone and electricity bills",
        detail: "A fixed monthly charge plus a price per unit is y = mx + c. Comparing two plans means finding where their graphs cross.",
        emoji: "📱",
      },
      {
        title: "Ramps and roads",
        detail: "Building rules limit how steep a wheelchair ramp may be (often no steeper than 1 : 12), and road signs warn drivers about steep gradients.",
        emoji: "♿",
      },
      {
        title: "Temperature scales",
        detail: "°F = 1.8 × °C + 32 is a straight-line graph that is NOT direct proportion: 0 °C is 32 °F, so the line misses the origin.",
        emoji: "🌡️",
      },
    ],
    videos: [
      {
        title: "Midpoint of a line segment",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+midpoint+of+a+line+segment",
      },
      {
        title: "Straight line graphs: y = mx + c",
        channel: "Maths Genie",
        url: "https://www.youtube.com/results?search_query=maths+genie+straight+line+graphs+y+%3D+mx+%2B+c",
      },
      {
        title: "Introduction to slope (gradient)",
        channel: "Khan Academy",
        url: "https://www.youtube.com/results?search_query=khan+academy+introduction+to+slope",
      },
      {
        title: "Distance–time graphs",
        channel: "Corbettmaths",
        url: "https://www.youtube.com/results?search_query=corbettmaths+distance+time+graphs",
      },
    ],
    formulas: [
      { name: "Midpoint", formula: "{{M = ((x_1 + x_2)/2, (y_1 + y_2)/2)}}", note: "Mean of the x-coordinates, mean of the y-coordinates." },
      { name: "Gradient", formula: "{{m = \"rise\"/\"run\" = (y_2 - y_1)/(x_2 - x_1)}}", note: "Change in y for each increase of 1 in x." },
      { name: "Equation of a straight line", formula: "{{y = mx + c}}", note: "m = gradient, c = y-intercept at (0, c)." },
      { name: "Vertical and horizontal lines", formula: "{{x = a}} (vertical) and {{y = b}} (horizontal)", note: "The y-axis is x = 0; the x-axis is y = 0." },
      { name: "Parallel lines", formula: "{{m_1 = m_2}}", note: "Parallel lines have equal gradients." },
      { name: "Direct proportion", formula: "{{y = kx}}", note: "A straight line through the origin; {{k = y/x}} is the gradient." },
      { name: "Speed from a distance–time graph", formula: "{{\"speed\" = \"distance\"/\"time\"}}", note: "Speed is the gradient of a distance–time graph." },
    ],
  },
};
