// ---------------------------------------------------------------------------
// Straight-Line & Real-Life Graphs — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams and tables, reasoning.
// ---------------------------------------------------------------------------
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3
  // =========================================================================
  {
    id: "linear-graphs-p3",
    title: "Practice Paper 3",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "linear-graphs-p3-q01",
        question:
          "Arjun flies a drone in a straight line from the launch pad L(−6, −1) to the landing pad P(4, 7). It takes a photo exactly halfway along the flight. Where is the drone when it takes the photo? Give your answer as coordinates (x, y).",
        answer: { type: "list", values: [-1, 3], ordered: true, display: "(−1, 3)" },
        traps: [
          {
            spec: { type: "list", values: [5, 4], ordered: true },
            feedback:
              "(5, 4) is half of the *change* in x and y — the size of the step from L to the halfway point. Add that step to L(−6, −1), or simply average the coordinates.",
          },
          {
            spec: { type: "list", values: [-2, 6], ordered: true },
            feedback: "You've added the coordinates but not halved them. The midpoint is the *mean*: divide each total by 2.",
          },
        ],
        solution: [
          "Halfway along a straight flight is the midpoint of LP: the mean of the x-coordinates and the mean of the y-coordinates.",
          "x: {{(-6 + 4)/2 = (-2)/2 = -1}}.",
          "y: {{(-1 + 7)/2 = 6/2 = 3}}.",
          "The photo is taken at (−1, 3).",
        ],
        commonError: "Halving the difference between the coordinates instead of averaging them.",
        difficulty: "warmup",
        guideRef: "coordinates-midpoints",
        hints: ["Halfway along a straight line is the midpoint.", "Find the mean of −6 and 4, then the mean of −1 and 7."],
        strategy: "Average the coordinates",
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "linear-graphs-p3-q02",
        question:
          "On a park plan, Hana plants a row of trees at (−2, 6), (1, 6), (4, 6) and (7, 6). All the trees lie on one straight line. Write down the equation of that line.",
        answer: { type: "text", accept: ["y=6", "6=y", "y=6.0"], display: "y = 6" },
        traps: [
          {
            spec: { type: "text", accept: ["x=6", "6=x"] },
            feedback:
              "x = 6 is a *vertical* line. Here the x-coordinates change but the y-coordinate stays at 6 — so the line is y = 6.",
          },
        ],
        solution: [
          "Every tree has y-coordinate 6, whatever its x-coordinate.",
          "So the trees lie on the line where y is always 6: a horizontal line.",
          "Equation: y = 6.",
        ],
        commonError: "Writing x = 6 because the line is 'at 6'. Ask yourself which coordinate stays the same.",
        difficulty: "warmup",
        guideRef: "special-lines",
        hints: ["Which coordinate is the same for every tree?", "If y never changes, the equation just says what y always is."],
        strategy: "Find a pattern",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "linear-graphs-p3-q03",
        question:
          "A glass lift at a shopping mall starts 3 m above the ground and rises at a steady speed. Its height, h metres, after t seconds is h = 2.5t + 3.\n\n| t (seconds) | 0 | 2 | 4 | 6 |\n|---|---|---|---|---|\n| h (metres) | ? | ? | ? | ? |\n\nComplete the table. Type the four heights in order, separated by commas.",
        answer: { type: "list", values: [3, 8, 13, 18], ordered: true, display: "3, 8, 13, 18" },
        traps: [
          {
            spec: { type: "list", values: [3, 5.5, 8, 10.5], ordered: true },
            feedback:
              "You've added 2.5 for each column — but each column is 2 seconds later, so h goes up by 2 × 2.5 = 5 each time.",
          },
        ],
        solution: [
          "t = 0: h = 2.5 × 0 + 3 = 3.",
          "t = 2: h = 2.5 × 2 + 3 = 8.",
          "t = 4: h = 2.5 × 4 + 3 = 13.",
          "t = 6: h = 2.5 × 6 + 3 = 18.",
          "Check: t goes up in steps of 2, so h goes up in steps of 2 × 2.5 = 5. ✓",
        ],
        commonError: "Adding the gradient (2.5) for each column when the t-values go up in steps of 2.",
        difficulty: "warmup",
        guideRef: "plotting-lines",
        hints: ["Substitute each value of t into h = 2.5t + 3.", "Check: t goes up by 2 each time, so how much should h go up by?"],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "linear-graphs-p3-q04",
        question:
          "A ferry leaves Changi Point with a full tank of fuel. The fuel left, F litres, t hours later is F = 180 − 15t. The graph of F against t is a straight line. What is its gradient?",
        answer: { type: "number", value: -15, display: "−15" },
        traps: [
          { spec: { type: "number", value: 180 }, feedback: "180 is the intercept — the fuel in the tank at t = 0. The gradient is the number multiplying t." },
          { spec: { type: "number", value: 15 }, feedback: "The fuel is going *down* as time passes, so the line slopes downwards: the gradient is negative." },
        ],
        solution: [
          "Rewrite in the form y = mx + c: F = −15t + 180.",
          "The number multiplying t is the gradient: m = −15.",
          "It is negative because the fuel goes down by 15 litres every hour. (180 is the intercept: the full tank.)",
        ],
        difficulty: "warmup",
        guideRef: "gradient-intercept",
        hints: ["Which number is multiplied by t?", "Does the fuel go up or down as time passes?"],
        strategy: "Read m and c from the equation",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "linear-graphs-p3-q05",
        question:
          "Wei Ling's 3D printer uses plastic filament at a steady rate. Her graph of filament used (in grams) against time (in minutes) is a straight line through the origin and the point (20, 30). How many grams of filament does a 50-minute print use?",
        answer: { type: "number", value: 75, display: "75 g" },
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback:
              "Adding 30 g for the extra 30 minutes treats the rate as 1 g per minute. Find the rate first: 30 g ÷ 20 minutes.",
          },
        ],
        solution: [
          "The graph goes through the origin, so filament used = k × time.",
          "Gradient: k = 30 ÷ 20 = 1.5 g per minute.",
          "50 minutes: 1.5 × 50 = 75 g.",
        ],
        solutions: [
          { label: "Scale up", steps: ["50 minutes is {{50/20 = 2.5}} times as long as 20 minutes.", "So it uses 2.5 × 30 = 75 g."] },
        ],
        difficulty: "warmup",
        guideRef: "direct-proportion-graphs",
        hints: ["How many grams does it use per minute?", "30 g in 20 minutes — divide to find the rate."],
        strategy: "Find the rate (unitary method)",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "linear-graphs-p3-q06",
        question:
          "Zara cycles from home to a friend's house and back. The graph shows her distance from home during the trip.\n\nFind her speed, in km/h, during the section of the trip where she was cycling fastest.",
        diagram: `<svg viewBox="0 0 378 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance–time graph of Zara's ride. Distance from home in km goes up to 9; time in minutes goes across to 70. Section P rises from 0 km at 0 minutes to 4 km at 20 minutes. Section Q is flat at 4 km from 20 to 30 minutes. Section R rises from 4 km at 30 minutes to 8 km at 40 minutes. Section S falls from 8 km at 40 minutes to 0 km at 70 minutes."><rect x="0" y="0" width="378" height="260" fill="#ffffff"/><line x1="52" y1="214" x2="52" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="96" y1="214" x2="96" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="140" y1="214" x2="140" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="184" y1="214" x2="184" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="228" y1="214" x2="228" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="272" y1="214" x2="272" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="316" y1="214" x2="316" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="360" y1="214" x2="360" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="214" x2="360" y2="214" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="192" x2="360" y2="192" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="170" x2="360" y2="170" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="148" x2="360" y2="148" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="126" x2="360" y2="126" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="104" x2="360" y2="104" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="82" x2="360" y2="82" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="60" x2="360" y2="60" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="38" x2="360" y2="38" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="16" x2="360" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="214" x2="366" y2="214" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="214" x2="52" y2="10" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="214" x2="52" y2="218" stroke="#334155" stroke-width="1.5"/><text x="52" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">0</text><line x1="96" y1="214" x2="96" y2="218" stroke="#334155" stroke-width="1.5"/><text x="96" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">10</text><line x1="140" y1="214" x2="140" y2="218" stroke="#334155" stroke-width="1.5"/><text x="140" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">20</text><line x1="184" y1="214" x2="184" y2="218" stroke="#334155" stroke-width="1.5"/><text x="184" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">30</text><line x1="228" y1="214" x2="228" y2="218" stroke="#334155" stroke-width="1.5"/><text x="228" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">40</text><line x1="272" y1="214" x2="272" y2="218" stroke="#334155" stroke-width="1.5"/><text x="272" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">50</text><line x1="316" y1="214" x2="316" y2="218" stroke="#334155" stroke-width="1.5"/><text x="316" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">60</text><line x1="360" y1="214" x2="360" y2="218" stroke="#334155" stroke-width="1.5"/><text x="360" y="230" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">70</text><line x1="48" y1="214" x2="52" y2="214" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="192" x2="52" y2="192" stroke="#334155" stroke-width="1.5"/><text x="45" y="196" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><line x1="48" y1="170" x2="52" y2="170" stroke="#334155" stroke-width="1.5"/><text x="45" y="174" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><line x1="48" y1="148" x2="52" y2="148" stroke="#334155" stroke-width="1.5"/><text x="45" y="152" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><line x1="48" y1="126" x2="52" y2="126" stroke="#334155" stroke-width="1.5"/><text x="45" y="130" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><line x1="48" y1="104" x2="52" y2="104" stroke="#334155" stroke-width="1.5"/><text x="45" y="108" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><line x1="48" y1="82" x2="52" y2="82" stroke="#334155" stroke-width="1.5"/><text x="45" y="86" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">6</text><line x1="48" y1="60" x2="52" y2="60" stroke="#334155" stroke-width="1.5"/><text x="45" y="64" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">7</text><line x1="48" y1="38" x2="52" y2="38" stroke="#334155" stroke-width="1.5"/><text x="45" y="42" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">8</text><line x1="48" y1="16" x2="52" y2="16" stroke="#334155" stroke-width="1.5"/><text x="45" y="20" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">9</text><text x="206" y="252" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">Time (minutes)</text><text x="14" y="115" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" transform="rotate(-90 14 115)">Distance from home (km)</text><polyline points="52,214 140,126 184,126 228,38 360,214" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="140" cy="126" r="3" fill="#1f2937"/><circle cx="184" cy="126" r="3" fill="#1f2937"/><circle cx="228" cy="38" r="3" fill="#1f2937"/><text x="87.2" y="150.2" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">P</text><text x="162" y="116.1" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">Q</text><text x="197.2" y="68.8" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">R</text><text x="302.8" y="112.8" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">S</text></svg>`,
        answer: { type: "number", value: 24, display: "24 km/h (section R)" },
        traps: [
          {
            spec: { type: "number", value: 16 },
            feedback: "Section S covers the most distance, but it takes 30 minutes: that's 16 km/h. Look for the *steepest* section, not the longest.",
          },
          { spec: { type: "number", value: 0.4 }, feedback: "0.4 is in km per *minute* (4 ÷ 10). Multiply by 60 to get km per hour." },
        ],
        solution: [
          "Q is flat, so she was stopped. Compare the sloping sections: P is 4 km in 20 minutes, R is 4 km in 10 minutes, S is 8 km in 30 minutes.",
          "R is the steepest. 10 minutes = {{1/6}} hour.",
          "Speed = 4 ÷ {{1/6}} = 24 km/h.",
          "Check the others: P = 4 ÷ {{1/3}} = 12 km/h and S = 8 ÷ {{1/2}} = 16 km/h, so R really is the fastest.",
        ],
        commonError: "Choosing the section with the biggest distance instead of the steepest one, or leaving the speed in km per minute.",
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "On a distance–time graph, steeper means faster.",
          "For each sloping section, read off the distance covered and the time taken.",
          "Section R: 4 km in 10 minutes. How far would that be in 60 minutes?",
        ],
        strategy: "Read the axes first",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "linear-graphs-p3-q07",
        question:
          "A swimming pool is drained at a steady rate of 6000 litres per hour. One hour after draining starts, 54 000 litres are left. Write a formula for the volume, V litres, left in the pool t hours after draining starts. Use V and t. (Type large numbers without spaces, e.g. 54000.)",
        answer: { type: "expression", expr: "V=60000-6000t", display: "V = 60 000 − 6000t" },
        traps: [
          {
            spec: { type: "expression", expr: "V=54000-6000t" },
            feedback: "54 000 litres is the volume after 1 hour, not at the start. At t = 0 the pool held 6000 litres more.",
          },
          {
            spec: { type: "expression", expr: "V=60000+6000t" },
            feedback: "The pool is emptying, so V must go down as t goes up: the gradient is negative.",
          },
        ],
        solution: [
          "The volume falls by 6000 litres each hour, so the gradient is −6000.",
          "At t = 1, V = 54 000. One hour earlier, at t = 0, there was 6000 litres more: 60 000 litres. That's the intercept.",
          "V = 60 000 − 6000t.",
          "Check: t = 1 gives 60 000 − 6000 = 54 000. ✓",
        ],
        commonError: "Using 54 000 as the starting volume. The constant in V = c − 6000t is the volume when t = 0.",
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Is V going up or down each hour, and by how much? That's the gradient.",
          "The intercept is the value of V when t = 0. What was the volume one hour *before* it was 54 000?",
          "V = (volume at the start) − 6000t.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "written",
        id: "linear-graphs-p3-q08",
        question:
          "Siti runs a vegetarian noodle stall at a hawker centre. Her profit for a day, P dollars, when she sells n bowls is\n\n    P = 4n − 120\n\n(a) What does the 4 tell you about her stall, and which feature of the graph of P against n is it?\n\n(b) What does the −120 tell you, and which feature of the graph is it?\n\n(c) How many bowls must she sell in a day to break even (make a profit of $0)?",
        marks: 3,
        modelAnswer:
          "(a) 4 is the **gradient**: each extra bowl sold adds $4 to her profit, so she makes $4 profit on every bowl.\n\n(b) −120 is the **intercept** on the P-axis: if she sells no bowls she makes a loss of $120. These are her fixed costs for the day, such as stall rent and gas.\n\n(c) Break even when P = 0: 4n − 120 = 0, so 4n = 120 and n = 30 bowls.",
        markScheme: [
          {
            point: "4 is the gradient: profit goes up by $4 for each bowl sold",
            keywords: ["gradient", "per bowl", "each bowl", "$4", "slope", "steepness"],
          },
          {
            point: "−120 is the intercept: a loss of $120 when no bowls are sold (fixed costs)",
            keywords: ["intercept", "loss", "lose", "120", "no bowls", "fixed", "rent", "costs"],
          },
          { point: "Break even at n = 30 (from 4n = 120)", keywords: ["30", "4n = 120", "120 ÷ 4"] },
        ],
        commonError: "Saying −120 means she sells −120 bowls. It is her *profit* when n = 0 — a loss.",
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "Compare P = 4n − 120 with y = mx + c. Which number is m and which is c?",
          "What is her profit if she sells 0 bowls? What happens to P each time n goes up by 1?",
          "Break even means P = 0. Solve 4n − 120 = 0.",
        ],
        strategy: "Interpret m and c in context",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "short",
        id: "linear-graphs-p3-q09",
        question:
          "Jun has $150 in savings and spends $12 every week, so his balance after w weeks is B = 150 − 12w dollars. He makes this table of values to draw the graph, but **one** entry is wrong.\n\n| w | 0 | 1 | 2 | 3 | 4 | 5 |\n|---|---|---|---|---|---|---|\n| B | 150 | 138 | 126 | 116 | 102 | 90 |\n\nWhich value of w has the wrong B, and what should B be? Give w first, then the correct value of B.",
        answer: { type: "list", values: [3, 114], ordered: true, display: "w = 3; B should be 114" },
        traps: [
          { spec: { type: "list", values: [3, 116], ordered: true }, feedback: "116 is the wrong value in the table. What *should* it be? Work out 150 − 12 × 3." },
          {
            spec: { type: "list", values: [4, 104], ordered: true },
            feedback: "If 116 were right, 102 would be wrong — and then 90 would be wrong too. Only one entry is wrong, so check each one with the formula.",
          },
        ],
        solution: [
          "In a straight-line table, B changes by the same amount every step: here −12.",
          "The differences are −12, −12, −10, −14, −12. The pattern breaks around w = 3.",
          "Check with the formula: B = 150 − 12 × 3 = 150 − 36 = 114, not 116.",
          "The other entries fit (for example 150 − 12 × 4 = 102). So w = 3 is wrong, and B should be 114.",
        ],
        commonError: "Spotting that the differences go wrong but then 'correcting' the wrong entry. Always check suspects with the formula.",
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "In a linear table, the differences between the B values are all the same. What should the difference be?",
          "Work out the differences: where does the pattern break?",
          "Substitute w = 3 and w = 4 into B = 150 − 12w and compare with the table.",
        ],
        strategy: "Find a pattern",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "linear-graphs-p3-q10",
        question:
          "A sign-maker designs a triangular sign on a coordinate grid. Its three edges lie along the lines y = x, y = −x and y = 6. Find the area of the triangle, in square units.",
        answer: { type: "number", value: 36, display: "36 square units" },
        traps: [
          { spec: { type: "number", value: 72 }, feedback: "72 is base × height — the area of the rectangle around the triangle. A triangle is half of that." },
          { spec: { type: "number", value: 18 }, feedback: "Check the base: y = −x meets y = 6 at (−6, 6), so the base runs from x = −6 to x = 6, a length of 12." },
        ],
        solution: [
          "Find the corners. y = x and y = −x meet at the origin (0, 0).",
          "y = x meets y = 6 at (6, 6). y = −x meets y = 6 where −x = 6, at (−6, 6).",
          "The base lies along y = 6, from x = −6 to x = 6: length 12.",
          "The height is the distance from the origin up to the line y = 6: 6.",
          "Area = {{1/2}} × 12 × 6 = 36 square units.",
        ],
        difficulty: "core",
        guideRef: "special-lines",
        hints: [
          "Sketch the three lines. Where does each pair meet?",
          "On the line y = −x, if y = 6 then x = ?",
          "The base lies along y = 6. How far below it is the third corner?",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "short",
        id: "linear-graphs-p3-q11",
        question:
          "At a community garden, Tank A holds 800 litres and is being emptied at 25 litres per minute. At the same moment, Tank B holds 200 litres and is being filled at 15 litres per minute.\n\nOn a graph of volume against time, the point where the two lines cross shows when the tanks hold the same amount. After how many minutes does that happen?",
        answer: { type: "number", value: 15, display: "15 minutes" },
        traps: [
          {
            spec: { type: "number", value: 60 },
            feedback:
              "You divided by 25 − 15 = 10. But one tank is falling while the other is rising, so the gap between them closes by 25 + 15 = 40 litres each minute.",
          },
          { spec: { type: "number", value: 425 }, feedback: "425 litres is how much each tank holds when they match. The question asks *when*: after how many minutes?" },
        ],
        solution: [
          "Tank A: V = 800 − 25t. Tank B: V = 200 + 15t.",
          "The lines cross where the volumes are equal: 800 − 25t = 200 + 15t.",
          "So 600 = 40t, and t = 15 minutes.",
          "Check: A holds 800 − 375 = 425 litres and B holds 200 + 225 = 425 litres. ✓",
        ],
        solutions: [
          {
            label: "Closing the gap",
            steps: [
              "The gap starts at 800 − 200 = 600 litres.",
              "A loses 25 litres and B gains 15 litres each minute, so the gap shrinks by 40 litres per minute.",
              "600 ÷ 40 = 15 minutes. (Quicker — no equations needed.)",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "Write a formula for each tank's volume after t minutes.",
          "Where the graphs cross, the two volumes are equal. Set your formulas equal to each other.",
          "Or think about the gap of 600 litres: how quickly is it closing?",
        ],
        strategy: "Draw a diagram (sketch both lines)",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "written",
        id: "linear-graphs-p3-q12",
        question:
          "At a swimming complex, 4 visits cost $26 and 8 visits cost $46. Marcus says:\n\n> \"The more visits you make, the more you pay. So the cost is directly proportional to the number of visits.\"\n\nIs Marcus right? Explain, and describe how the graph of cost against number of visits differs from a direct proportion graph.",
        marks: 3,
        modelAnswer:
          "No, Marcus is wrong. Two quantities going up together is not enough for direct proportion: doubling the visits must double the cost.\n\nDoubling 4 visits to 8 would make the cost $52, but it is only $46. (Or: the cost per visit is $26 ÷ 4 = $6.50 for 4 visits but $46 ÷ 8 = $5.75 for 8 visits, so cost ÷ visits is not constant.)\n\nThe extra 4 visits cost $20, so each visit costs $5. Then 4 visits should cost $20, so the other $6 must be a fixed fee: C = 5n + 6. Its graph is a straight line with gradient 5 that crosses the cost axis at 6 — it does **not** pass through the origin, which every direct proportion graph must.",
        markScheme: [
          { point: "States Marcus is wrong (not directly proportional)", keywords: ["no", "wrong", "not directly proportional", "not proportional"] },
          {
            point: "Valid test: doubling the visits does not double the cost ($52 ≠ $46), or the cost per visit is not constant ($6.50 vs $5.75)",
            keywords: ["double", "52", "6.5", "5.75", "ratio", "per visit", "not constant"],
          },
          {
            point: "Graph does not pass through the origin: intercept $6 (a fixed fee), e.g. C = 5n + 6",
            keywords: ["origin", "(0, 0)", "intercept", "6", "fixed fee", "5n + 6"],
          },
        ],
        commonError: "Thinking 'both go up' means direct proportion. Direct proportion needs a constant ratio — and a graph through the origin.",
        difficulty: "core",
        guideRef: "direct-proportion-graphs",
        hints: [
          "What happens to the cost when the number of visits doubles? What *should* happen in direct proportion?",
          "Work out the cost per visit in each case.",
          "Find the cost of each extra visit, then work out what 0 visits would cost.",
        ],
        strategy: "Test a special case",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "short",
        id: "linear-graphs-p3-q13",
        question:
          "A straight road up a hill has a gradient of {{1/12}}: it rises 1 m for every 12 m measured horizontally. The road covers a horizontal distance of 1.5 km. How many metres higher is the top of the road than the bottom?",
        answer: { type: "number", value: 125, display: "125 m" },
        traps: [
          {
            spec: { type: "number", value: 18000 },
            feedback: "You multiplied by 12. For every 12 m across the road rises only 1 m, so divide the horizontal distance by 12.",
          },
          { spec: { type: "number", value: 0.125 }, feedback: "That's the rise in kilometres. The question asks for metres: 0.125 km = 125 m." },
        ],
        solution: [
          "Use the same units: 1.5 km = 1500 m.",
          "Gradient = rise ÷ run, so rise = gradient × run.",
          "Rise = {{1/12}} × 1500 = 125 m.",
        ],
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "Gradient = rise ÷ run. Which one do you know, and which do you want?",
          "Change 1.5 km into metres first.",
          "Every 12 m across gives 1 m up. How many lots of 12 m are there in 1500 m?",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "short",
        id: "linear-graphs-p3-q14",
        question:
          "On a park plan, a straight path has equation 2y + x = 8. A second straight path must be parallel to it and pass through the fountain at (4, 1). Find the equation of the second path in the form y = mx + c.",
        answer: { type: "expression", expr: "y=-0.5x+3", display: "y = −{{1/2}}x + 3" },
        traps: [
          {
            spec: { type: "expression", expr: "y=-x+5" },
            feedback: "The gradient isn't −1. Make y the subject first: divide every term of 2y = −x + 8 by 2.",
          },
          {
            spec: { type: "expression", expr: "y=-0.5x+4" },
            feedback: "That's the first path itself. A parallel path has the same gradient but a different intercept — use (4, 1) to find the new c.",
          },
        ],
        solution: [
          "Rearrange the first path: 2y = −x + 8, so y = −{{1/2}}x + 4.",
          "Parallel lines have the same gradient, so the second path has m = −{{1/2}}.",
          "Substitute (4, 1) into y = −{{1/2}}x + c: 1 = −2 + c, so c = 3.",
          "Second path: y = −{{1/2}}x + 3. Check: −{{1/2}} × 4 + 3 = 1. ✓",
        ],
        commonError: "Reading the gradient straight from 2y + x = 8 without making y the subject.",
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Get the first equation into the form y = mx + c.",
          "Parallel lines have the same gradient.",
          "Substitute x = 4 and y = 1 into y = mx + c to find c.",
        ],
        strategy: "Make it simpler (rearrange first)",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "linear-graphs-p3-q15",
        question:
          "An oven heats up at a steady rate from 25 °C to 205 °C in 12 minutes, then stays at 205 °C. Priya puts her tray of vegetable lasagne in as soon as the oven reaches 175 °C and bakes it for 25 minutes. How many minutes after switching the oven on does she take the tray out?",
        answer: { type: "number", value: 35, display: "35 minutes" },
        traps: [
          {
            spec: { type: "number", value: 37 },
            feedback: "The oven reaches 175 °C *before* it finishes heating at 12 minutes. Work out when the temperature is exactly 175 °C.",
          },
          {
            spec: { type: "number", value: 36.67, tolerance: 0.05 },
            feedback: "Remember the oven starts at 25 °C, not 0 °C. It only needs to rise 150 °C to reach 175 °C.",
          },
        ],
        solution: [
          "The heating part of the graph is a straight line: it rises 205 − 25 = 180 °C in 12 minutes.",
          "Rate = 180 ÷ 12 = 15 °C per minute.",
          "To reach 175 °C it must rise 175 − 25 = 150 °C, which takes 150 ÷ 15 = 10 minutes.",
          "Tray out at 10 + 25 = 35 minutes after switching on.",
        ],
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "Sketch temperature against time: a sloping part, then a flat part.",
          "How many degrees per minute does the oven heat up?",
          "How far must the temperature rise from its *starting* value to reach 175 °C?",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "written",
        id: "linear-graphs-p3-q16",
        question:
          "Two e-scooter rental apps charge like this:\n\n- **Scoot:** $1.00 to unlock, then $0.40 per minute.\n- **Zoom:** $2.50 to unlock, then $0.40 per minute.\n\nEthan says: \"If I ride for long enough, Scoot and Zoom will end up costing the same.\"\n\nUsing the graphs of cost against time, explain why Ethan is wrong.",
        marks: 3,
        modelAnswer:
          "With t minutes and cost C dollars: Scoot is C = 0.4t + 1 and Zoom is C = 0.4t + 2.5.\n\nBoth graphs have the same gradient, 0.4, because both charge $0.40 per minute — so the lines are **parallel**.\n\nThey have different intercepts (1 and 2.5), so Zoom's line is always $1.50 above Scoot's. Parallel lines never meet, so the costs are never equal: Zoom always costs exactly $1.50 more, however long Ethan rides.",
        markScheme: [
          {
            point: "Both have gradient 0.4 (the same charge per minute)",
            keywords: ["gradient", "0.4", "0.40", "same rate", "per minute", "same slope", "steepness"],
          },
          { point: "So the lines are parallel", keywords: ["parallel"] },
          {
            point: "Different intercepts, so the lines never meet: Zoom is always $1.50 more",
            keywords: ["never meet", "never cross", "1.5", "1.50", "always more", "intercept", "never the same"],
          },
        ],
        commonError: "Thinking any two lines must cross eventually. Lines with equal gradients never get any closer together.",
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Write a formula for the cost of each app after t minutes.",
          "Compare the gradients. What does that tell you about the two lines?",
          "What is the difference in cost after 1 minute? After 100 minutes?",
        ],
        strategy: "Look for an invariant",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "linear-graphs-p3-q17",
        question:
          "The midpoints of the sides of triangle PQR are L(1, 2) on side PQ, M(4, 3) on side QR and N(2, −1) on side RP. Find the coordinates of P. Give your answer as (x, y).",
        answer: { type: "list", values: [-1, -2], ordered: true, display: "(−1, −2)" },
        traps: [
          {
            spec: { type: "list", values: [3, 6], ordered: true },
            feedback: "(3, 6) is Q, not P. P is the corner between sides PQ and RP — next to midpoints L and N, and opposite M.",
          },
          {
            spec: { type: "list", values: [5, 0], ordered: true },
            feedback: "(5, 0) is R, not P. P is the corner next to midpoints L and N.",
          },
        ],
        solution: [
          "Key fact: the segment joining the midpoints of two sides of a triangle is parallel to the third side and half as long.",
          "So NM is parallel to PQ and half its length — the same as PL. That makes PLMN a parallelogram.",
          "In parallelogram PLMN, the step from M to L equals the step from N to P. From M(4, 3) to L(1, 2) the step is (−3, −1).",
          "P = (2 − 3, −1 − 1) = (−1, −2).",
          "Check: L is the midpoint of PQ, so Q = (3, 6); N is the midpoint of RP, so R = (5, 0). The midpoint of QR is {{((3 + 5)/2, (6 + 0)/2)}} = (4, 3) = M. ✓",
        ],
        solutions: [
          {
            label: "Algebra with midpoints",
            steps: [
              "Let P = (a, b). L(1, 2) is the midpoint of PQ, so Q = (2 − a, 4 − b).",
              "N(2, −1) is the midpoint of RP, so R = (4 − a, −2 − b).",
              "M(4, 3) is the midpoint of QR: {{((2 - a) + (4 - a))/2 = 4}}, so 6 − 2a = 8 and a = −1.",
              "And {{((4 - b) + (-2 - b))/2 = 3}}, so 2 − 2b = 6 and b = −2.",
              "P = (−1, −2).",
            ],
          },
        ],
        commonError: "Using the wrong pair of midpoints. Draw a sketch: P is next to L and N, and opposite M.",
        difficulty: "challenge",
        guideRef: "coordinates-midpoints",
        hints: [
          "Draw a sketch of a triangle with its three midpoints marked. Which two midpoints are next to P?",
          "P, L, M and N form a parallelogram. (The segment joining two midpoints is parallel to the third side and half its length.)",
          "In parallelogram PLMN, the step from M to L is the same as the step from N to P.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "short",
        id: "linear-graphs-p3-q18",
        question:
          "Aisha cycles 6 km to her grandmother's flat at 12 km/h, then comes straight back along the same route at 18 km/h. What is her average speed for the whole round trip, in km/h?",
        answer: { type: "number", value: 14.4, display: "14.4 km/h" },
        traps: [
          {
            spec: { type: "number", value: 15 },
            feedback:
              "15 is the mean of 12 and 18 — but she spends *longer* at the slower speed, so her average is pulled below 15. Use total distance ÷ total time.",
          },
        ],
        solution: [
          "Average speed = total distance ÷ total time.",
          "There: 6 ÷ 12 = {{1/2}} hour. Back: 6 ÷ 18 = {{1/3}} hour.",
          "Total time = {{1/2 + 1/3 = 5/6}} hour. Total distance = 12 km.",
          "Average speed = 12 ÷ {{5/6}} = 14.4 km/h.",
        ],
        commonError: "Averaging the two speeds. On a distance–time graph the slow section lasts longer, so it counts for more.",
        difficulty: "challenge",
        guideRef: "real-life-graphs",
        hints: [
          "Sketch her distance–time graph. Which half of the trip takes longer?",
          "Work out the time for each half of the trip.",
          "Average speed = total distance ÷ total time.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "linear-graphs-p3-q19",
        question:
          "Always, sometimes or never true?\n\n> *If A and B are any two points on the line y = 3x − 2, then the midpoint of AB is also on the line y = 3x − 2.*\n\nDecide, and prove your answer. (Testing one example is not a proof.)",
        marks: 3,
        modelAnswer:
          "**Always true.**\n\nAny point on the line has coordinates of the form (a, 3a − 2). So let A = (a, 3a − 2) and B = (b, 3b − 2).\n\nThe midpoint of AB is\n\n    {{((a + b)/2, (3a - 2 + 3b - 2)/2)}}\n\nThe y-coordinate simplifies: {{(3a + 3b - 4)/2 = 3 * (a + b)/2 - 2}}.\n\nSo the midpoint's y-coordinate is 3 × (its x-coordinate) − 2. That means it satisfies y = 3x − 2, so it lies on the line — whatever a and b are.\n\n(Example check: A(0, −2) and B(2, 4) have midpoint (1, 1), and 3 × 1 − 2 = 1. ✓)",
        markScheme: [
          { point: "States 'always true'", keywords: ["always"] },
          {
            point: "Uses general points on the line, such as (a, 3a − 2) and (b, 3b − 2)",
            keywords: ["3a", "3b", "(a,", "general", "any point", "3p", "3q"],
          },
          {
            point: "Shows the midpoint's y-coordinate is 3 × its x-coordinate − 2, so it satisfies the equation",
            keywords: ["(a + b)/2", "(a+b)/2", "3(a + b)", "3(a+b)", "satisfies", "on the line"],
          },
        ],
        commonError: "Checking one or two examples and stopping. Examples can suggest 'always', but only a general argument proves it.",
        difficulty: "challenge",
        guideRef: "plotting-lines",
        hints: [
          "Try it first: (0, −2) and (2, 4) are on the line. Is their midpoint?",
          "Write a general point on the line using a letter: if x = a, what is y?",
          "Let A = (a, 3a − 2) and B = (b, 3b − 2). Find the midpoint and test it in y = 3x − 2.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "linear-graphs-p3-q20",
        question:
          "Two karaoke places charge by the whole hour.\n\n- **SingStar** charges a fixed booking fee plus an hourly rate. 2 hours cost $38 and 5 hours cost $71.\n- **MicDrop** charges $15 per hour, with no booking fee.\n\nWhat is the greatest whole number of hours for which MicDrop is **cheaper** than SingStar?",
        answer: { type: "number", value: 3, display: "3 hours" },
        traps: [
          {
            spec: { type: "number", value: 4 },
            feedback: "At 4 hours both places cost $60 — the same, so MicDrop isn't *cheaper*. Look just before the crossing point.",
          },
          {
            spec: { type: "number", value: 5 },
            feedback: "Check 5 hours: MicDrop costs $75 but SingStar costs $71. Find where the two cost lines cross.",
          },
        ],
        solution: [
          "SingStar's graph is a straight line through (2, 38) and (5, 71).",
          "Gradient = {{(71 - 38)/(5 - 2) = 33/3 = 11}}: $11 per hour.",
          "Intercept: 38 = 11 × 2 + c, so c = 16. SingStar: C = 11h + 16.",
          "MicDrop: C = 15h. The lines cross where 15h = 11h + 16, so 4h = 16 and h = 4.",
          "At 4 hours both cost $60. MicDrop's line is steeper, so it is below SingStar's line only *before* the crossing.",
          "Check 3 hours: MicDrop $45, SingStar $49. So the answer is 3 hours.",
        ],
        commonError: "Giving the crossing point (4 hours) — where the costs are equal, not where MicDrop is cheaper.",
        difficulty: "challenge",
        guideRef: "line-through-two-points",
        hints: [
          "Find SingStar's hourly rate: how much do the extra 3 hours cost?",
          "Then find the booking fee, and write SingStar's formula C = mh + c.",
          "Where do C = 15h and SingStar's line cross? Which line is lower before that point?",
        ],
        strategy: "Split into cases",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — EXAM STYLE
  // =========================================================================
  {
    id: "linear-graphs-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      // ---------------------------------------------------------------- q01
      {
        kind: "short",
        id: "linear-graphs-p4-q01",
        question: "The grid shows the points A and B. Find the coordinates of the midpoint of AB. Give your answer as (x, y).",
        diagram: `<svg viewBox="0 0 284 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from −5 to 5 across and −4 to 5 up, with point A plotted at (−4, 3) and point B plotted at (2, −1)"><rect x="0" y="0" width="284" height="260" fill="#ffffff"/><line x1="22" y1="238" x2="22" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="46" y1="238" x2="46" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="70" y1="238" x2="70" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="94" y1="238" x2="94" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="118" y1="238" x2="118" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="142" y1="238" x2="142" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="166" y1="238" x2="166" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="190" y1="238" x2="190" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="214" y1="238" x2="214" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="238" y1="238" x2="238" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="262" y1="238" x2="262" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="238" x2="262" y2="238" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="214" x2="262" y2="214" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="190" x2="262" y2="190" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="166" x2="262" y2="166" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="142" x2="262" y2="142" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="118" x2="262" y2="118" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="94" x2="262" y2="94" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="70" x2="262" y2="70" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="46" x2="262" y2="46" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="22" x2="262" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="142" x2="272" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="238" x2="142" y2="12" stroke="#334155" stroke-width="1.5"/><text x="268" y="156" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">x</text><text x="148" y="18" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">y</text><text x="22" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−5</text><text x="46" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="70" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="94" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="118" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="166" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="190" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="214" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="238" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="262" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="137" y="242" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="137" y="218" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="137" y="194" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="137" y="170" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="137" y="122" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="137" y="98" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="137" y="74" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="137" y="50" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="137" y="26" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><circle cx="46" cy="70" r="4" fill="#1f2937"/><text x="54" y="64" font-size="13" text-anchor="start" font-weight="bold" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">A</text><circle cx="190" cy="166" r="4" fill="#1f2937"/><text x="198" y="160" font-size="13" text-anchor="start" font-weight="bold" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">B</text></svg>`,
        answer: { type: "list", values: [-1, 1], ordered: true, display: "(−1, 1)" },
        traps: [
          {
            spec: { type: "list", values: [3, -2], ordered: true },
            feedback: "(3, −2) is half of the step from A to B (6 across, 4 down). Add it to A's coordinates — or just average the coordinates.",
          },
          {
            spec: { type: "list", values: [1, -1], ordered: true },
            feedback: "Check how you read the points: (x, y) means across first, then up or down. A is (−4, 3).",
          },
        ],
        solution: [
          "Read the points: A(−4, 3) and B(2, −1).",
          "Mean of the x-coordinates: {{(-4 + 2)/2 = -1}}.",
          "Mean of the y-coordinates: {{(3 + (-1))/2 = 1}}.",
          "Midpoint (−1, 1). On the grid it sits exactly halfway along AB.",
        ],
        difficulty: "warmup",
        guideRef: "coordinates-midpoints",
        hints: ["Read A and B carefully: across first, then up or down.", "Average the x-coordinates, then average the y-coordinates."],
        strategy: "Average the coordinates",
      },
      // ---------------------------------------------------------------- q02
      {
        kind: "short",
        id: "linear-graphs-p4-q02",
        question:
          "The grid shows two straight lines, A and B.\n\nThe point (k, −7) lies on line A. The point (5, h) lies on line B. Find k and h. Give k first, then h.",
        diagram: `<svg viewBox="0 0 284 284" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from −5 to 5 on both axes. Line A slopes down from top left to bottom right through (−4, 4), the origin and (4, −4). Line B is horizontal through (−4, −2) and (4, −2)."><rect x="0" y="0" width="284" height="284" fill="#ffffff"/><line x1="22" y1="262" x2="22" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="46" y1="262" x2="46" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="70" y1="262" x2="70" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="94" y1="262" x2="94" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="118" y1="262" x2="118" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="142" y1="262" x2="142" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="166" y1="262" x2="166" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="190" y1="262" x2="190" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="214" y1="262" x2="214" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="238" y1="262" x2="238" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="262" y1="262" x2="262" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="262" x2="262" y2="262" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="238" x2="262" y2="238" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="214" x2="262" y2="214" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="190" x2="262" y2="190" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="166" x2="262" y2="166" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="142" x2="262" y2="142" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="118" x2="262" y2="118" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="94" x2="262" y2="94" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="70" x2="262" y2="70" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="46" x2="262" y2="46" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="22" x2="262" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="142" x2="272" y2="142" stroke="#334155" stroke-width="1.5"/><line x1="142" y1="262" x2="142" y2="12" stroke="#334155" stroke-width="1.5"/><text x="268" y="156" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">x</text><text x="148" y="18" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">y</text><line x1="22" y1="22" x2="262" y2="262" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/><text x="58" y="41.4" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#2563eb" stroke="#ffffff" stroke-width="3" paint-order="stroke">A</text><line x1="22" y1="190" x2="262" y2="190" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/><text x="34" y="183" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#ea580c" stroke="#ffffff" stroke-width="3" paint-order="stroke">B</text><text x="22" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−5</text><text x="46" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="70" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="94" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="118" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="166" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="190" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="214" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="238" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="262" y="156" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="137" y="266" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−5</text><text x="137" y="242" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="137" y="218" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="137" y="194" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="137" y="170" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="137" y="122" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="137" y="98" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="137" y="74" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="137" y="50" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="137" y="26" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text></svg>`,
        answer: { type: "list", values: [7, -2], ordered: true, display: "k = 7, h = −2" },
        traps: [
          {
            spec: { type: "list", values: [-7, -2], ordered: true },
            feedback: "Line A slopes *down* — it is y = −x, not y = x. On y = −x, if y = −7 then x = 7.",
          },
          {
            spec: { type: "list", values: [7, 5], ordered: true },
            feedback: "Line B is horizontal, so every point on it has the same y-coordinate. Read where B crosses the y-axis.",
          },
        ],
        solution: [
          "Line A passes through (−3, 3), (0, 0) and (3, −3): the y-coordinate is always the negative of the x-coordinate. Its equation is y = −x.",
          "On line A, y = −7 means −7 = −k, so k = 7.",
          "Line B is horizontal through y = −2: its equation is y = −2. Every point on it has y-coordinate −2, so h = −2.",
        ],
        difficulty: "warmup",
        guideRef: "special-lines",
        hints: ["Write down the equation of each line first.", "On line A, how are the x- and y-coordinates of each point related?"],
        strategy: "Find a pattern",
      },
      // ---------------------------------------------------------------- q03
      {
        kind: "short",
        id: "linear-graphs-p4-q03",
        question:
          "Here is a partly completed table of values for y = {{1/2}}x − 3.\n\n| x | −4 | −2 | 0 | 2 | 4 | 6 |\n|---|---|---|---|---|---|---|\n| y | ? | −4 | −3 | −2 | −1 | ? |\n\nFind the two missing values. Give the value for x = −4 first.",
        answer: { type: "list", values: [-5, 0], ordered: true, display: "−5, then 0" },
        traps: [
          {
            spec: { type: "list", values: [-1, 0], ordered: true },
            feedback: "Check x = −4: half of −4 is −2, and −2 − 3 = −5 (not −1).",
          },
        ],
        solution: [
          "x = −4: y = {{1/2}} × (−4) − 3 = −2 − 3 = −5.",
          "x = 6: y = {{1/2}} × 6 − 3 = 3 − 3 = 0.",
          "Check the pattern: y goes up by 1 each time x goes up by 2. ✓",
        ],
        difficulty: "warmup",
        guideRef: "plotting-lines",
        hints: ["Substitute each missing x into y = {{1/2}}x − 3.", "Or use the pattern: when x goes up by 2, how much does y go up by?"],
        strategy: "Find a pattern",
      },
      // ---------------------------------------------------------------- q04
      {
        kind: "short",
        id: "linear-graphs-p4-q04",
        question: "Find the gradient of the straight line shown. Give your answer as a fraction or a decimal.",
        diagram: `<svg viewBox="0 0 220 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from −2 to 6 across and −5 to 5 up. A straight line slopes upwards through the marked points (0, −3) and (4, 3)."><rect x="0" y="0" width="220" height="264" fill="#ffffff"/><line x1="22" y1="242" x2="22" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="44" y1="242" x2="44" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="242" x2="66" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="88" y1="242" x2="88" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="110" y1="242" x2="110" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="132" y1="242" x2="132" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="154" y1="242" x2="154" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="176" y1="242" x2="176" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="198" y1="242" x2="198" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="242" x2="198" y2="242" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="220" x2="198" y2="220" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="198" x2="198" y2="198" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="176" x2="198" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="154" x2="198" y2="154" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="132" x2="198" y2="132" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="110" x2="198" y2="110" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="88" x2="198" y2="88" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="66" x2="198" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="44" x2="198" y2="44" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="22" x2="198" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="132" x2="208" y2="132" stroke="#334155" stroke-width="1.5"/><line x1="66" y1="242" x2="66" y2="12" stroke="#334155" stroke-width="1.5"/><text x="204" y="146" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">x</text><text x="72" y="18" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">y</text><line x1="36.67" y1="242" x2="183.33" y2="22" stroke="#1f2937" stroke-width="2.5" stroke-linecap="round"/><text x="22" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="44" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="88" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="110" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="132" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="154" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="176" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="198" y="146" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">6</text><text x="61" y="246" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−5</text><text x="61" y="224" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="61" y="202" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="61" y="180" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="61" y="158" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="61" y="114" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="61" y="92" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="61" y="70" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="61" y="48" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="61" y="26" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><circle cx="66" cy="198" r="4" fill="#1f2937"/><text x="74" y="202" font-size="13" text-anchor="start" font-weight="bold" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">(0, −3)</text><circle cx="154" cy="66" r="4" fill="#1f2937"/><text x="162" y="70" font-size="13" text-anchor="start" font-weight="bold" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">(4, 3)</text></svg>`,
        answer: { type: "fraction", n: 3, d: 2, allowDecimal: true, display: "{{3/2}} (= 1.5)" },
        traps: [
          { spec: { type: "fraction", n: 2, d: 3 }, feedback: "That's run ÷ rise. Gradient = rise ÷ run: how far up for each 1 across." },
          { spec: { type: "number", value: -3 }, feedback: "−3 is the y-intercept — where the line crosses the y-axis. The gradient measures steepness: rise ÷ run." },
        ],
        solution: [
          "Use the two marked points, (0, −3) and (4, 3).",
          "Rise: from −3 up to 3 is 6. Run: from 0 across to 4 is 4.",
          "Gradient = rise ÷ run = {{6/4 = 3/2}} = 1.5.",
        ],
        difficulty: "warmup",
        guideRef: "gradient-intercept",
        hints: ["Use two points that are exactly on the line — the marked ones are ideal.", "How far up and how far across is it from (0, −3) to (4, 3)?"],
        strategy: "Rise over run",
      },
      // ---------------------------------------------------------------- q05
      {
        kind: "short",
        id: "linear-graphs-p4-q05",
        question:
          "The mass of a copper wire is directly proportional to its length. 15 m of the wire has a mass of 0.6 kg.\n\n(a) Find k in the formula M = kL, where M is the mass in kg and L is the length in m.\n\n(b) Hence find the length of wire that has a mass of 2 kg.\n\nType your final answer to (b), in metres.",
        answer: { type: "number", value: 50, display: "50 m" },
        traps: [
          {
            spec: { type: "number", value: 0.08 },
            feedback: "0.04 × 2 gives the mass of 2 *metres* of wire. You know the mass (2 kg) and want the length, so divide: 2 ÷ 0.04.",
          },
        ],
        solution: [
          "(a) k = M ÷ L = 0.6 ÷ 15 = 0.04 (kg per metre).",
          "(b) 2 = 0.04L, so L = 2 ÷ 0.04 = 50 m.",
          "Check: 50 m of wire has mass 0.04 × 50 = 2 kg. ✓",
        ],
        difficulty: "warmup",
        guideRef: "direct-proportion-graphs",
        hints: ["k is the mass of 1 metre of wire.", "Once you know k, solve 2 = kL."],
        strategy: "Find the rate (unitary method)",
      },
      // ---------------------------------------------------------------- q06
      {
        kind: "short",
        id: "linear-graphs-p4-q06",
        question:
          "The grid shows three straight lines, A, B and C. Here are four equations:\n\n1. y = 3 − x\n2. y = 2x + 3\n3. y = {{1/2}}x − 1\n4. y = 2x − 1\n\nMatch each line to its equation (one equation is not used). Type the equation numbers for A, B and C, in that order — for example, typing 4, 1, 2 would mean A is equation 4, B is equation 1 and C is equation 2.",
        diagram: `<svg viewBox="0 0 264 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from −5 to 5 across and −4 to 6 up showing three straight lines. Line A is steep and rises through (−3, −3), (0, 3) and (1, 5). Line B rises gently through (−4, −3), (0, −1) and (4, 1). Line C falls through (−3, 6), (0, 3) and (5, −2)."><rect x="0" y="0" width="264" height="264" fill="#ffffff"/><line x1="22" y1="242" x2="22" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="44" y1="242" x2="44" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="66" y1="242" x2="66" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="88" y1="242" x2="88" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="110" y1="242" x2="110" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="132" y1="242" x2="132" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="154" y1="242" x2="154" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="176" y1="242" x2="176" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="198" y1="242" x2="198" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="220" y1="242" x2="220" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="242" y1="242" x2="242" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="242" x2="242" y2="242" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="220" x2="242" y2="220" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="198" x2="242" y2="198" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="176" x2="242" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="154" x2="242" y2="154" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="132" x2="242" y2="132" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="110" x2="242" y2="110" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="88" x2="242" y2="88" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="66" x2="242" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="44" x2="242" y2="44" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="22" x2="242" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="154" x2="252" y2="154" stroke="#334155" stroke-width="1.5"/><line x1="132" y1="242" x2="132" y2="12" stroke="#334155" stroke-width="1.5"/><text x="248" y="168" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">x</text><text x="138" y="18" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">y</text><line x1="55" y1="242" x2="165" y2="22" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/><text x="173.8" y="35.8" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#2563eb" stroke="#ffffff" stroke-width="3" paint-order="stroke">A</text><line x1="22" y1="231" x2="242" y2="121" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round"/><text x="233.2" y="121.6" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#16a34a" stroke="#ffffff" stroke-width="3" paint-order="stroke">B</text><line x1="66" y1="22" x2="242" y2="198" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/><text x="235.4" y="178.8" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#ea580c" stroke="#ffffff" stroke-width="3" paint-order="stroke">C</text><text x="22" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−5</text><text x="44" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="66" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="88" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="110" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="154" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="176" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="198" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="220" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="242" y="168" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="127" y="246" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−4</text><text x="127" y="224" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−3</text><text x="127" y="202" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−2</text><text x="127" y="180" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">−1</text><text x="127" y="136" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="127" y="114" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="127" y="92" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="127" y="70" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="127" y="48" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="127" y="26" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">6</text></svg>`,
        answer: { type: "list", values: [2, 3, 1], ordered: true, display: "A: 2, B: 3, C: 1" },
        traps: [
          {
            spec: { type: "list", values: [4, 3, 1], ordered: true },
            feedback: "Line A crosses the y-axis at 3, not −1. y = 2x − 1 has the right steepness but the wrong intercept.",
          },
          {
            spec: { type: "list", values: [2, 4, 1], ordered: true },
            feedback: "Line B does cross the y-axis at −1, but it is much less steep than A: up 1 for every 2 across, so its gradient is {{1/2}}, not 2.",
          },
        ],
        solution: [
          "Use the direction of slope and the y-intercept.",
          "Line C slopes downwards, so its gradient is negative. Only equation 1 (y = 3 − x) has a negative gradient: C is 1.",
          "Line A crosses the y-axis at 3 and is steep — up 2 for every 1 across: y = 2x + 3. A is 2.",
          "Line B crosses the y-axis at −1 and rises gently — up 1 for every 2 across: y = {{1/2}}x − 1. B is 3.",
          "Equation 4 (gradient 2, intercept −1) would be parallel to A, crossing the y-axis at −1. No such line is drawn.",
        ],
        commonError: "Matching on the intercept alone. A and C share the intercept 3, and equations 2 and 4 share the gradient 2 — you need both clues.",
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Start with the line that slopes downwards. Which equation has a negative gradient?",
          "Where does each line cross the y-axis? That's c.",
          "Lines A and C cross the y-axis at the same point. Use steepness to sort out the rest.",
        ],
        strategy: "Eliminate options",
      },
      // ---------------------------------------------------------------- q07
      {
        kind: "short",
        id: "linear-graphs-p4-q07",
        question: "The points (−3, a) and (b, −13) both lie on the line y = 2 − 3x. Find a and b. Give a first, then b.",
        answer: { type: "list", values: [11, 5], ordered: true, display: "a = 11, b = 5" },
        traps: [
          { spec: { type: "list", values: [-7, 5], ordered: true }, feedback: "Check a: −3 × (−3) = +9, so a = 2 + 9 = 11." },
          {
            spec: { type: "list", values: [11, -5], ordered: true },
            feedback: "Check b: −15 = −3b gives b = (−15) ÷ (−3) = +5. Substitute to check: 2 − 3 × 5 = −13. ✓",
          },
        ],
        solution: [
          "For (−3, a), substitute x = −3: a = 2 − 3 × (−3) = 2 + 9 = 11.",
          "For (b, −13), substitute y = −13: −13 = 2 − 3b.",
          "Subtract 2 from both sides: −15 = −3b, so b = 5.",
          "Check: 2 − 3 × 5 = 2 − 15 = −13. ✓",
        ],
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "For the first point you know x. For the second you know y.",
          "Substitute x = −3 to find a — careful with the signs.",
          "For b, solve the equation −13 = 2 − 3b.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q08
      {
        kind: "written",
        id: "linear-graphs-p4-q08",
        question:
          "Hana says:\n\n> \"The point (−5, 5) lies on the line y = x, because both of its coordinates are 5.\"\n\n(a) Is Hana right? Explain.\n\n(b) Write down the equation of the straight line through the origin that **does** pass through (−5, 5), and show that it works.",
        marks: 3,
        modelAnswer:
          "(a) No. On the line y = x, the y-coordinate must **equal** the x-coordinate. For (−5, 5), x = −5 and y = 5, and −5 ≠ 5, so the point is not on y = x. (Points like (−5, −5) and (5, 5) are on y = x.)\n\n(b) The line is y = −x. Check: when x = −5, y = −(−5) = 5. ✓ It passes through the origin too, because when x = 0, y = 0.",
        markScheme: [
          {
            point: "No — on y = x the two coordinates must be equal, and −5 ≠ 5",
            keywords: ["no", "equal", "same", "−5 ≠ 5", "-5", "not on"],
          },
          { point: "Equation y = −x", keywords: ["y = -x", "y=-x", "y = −x", "y=−x"] },
          {
            point: "Shows it works: when x = −5, y = −(−5) = 5 (and it passes through the origin)",
            keywords: ["-(-5)", "−(−5)", "= 5", "origin", "(0, 0)"],
          },
        ],
        commonError: "Ignoring the sign: −5 and 5 are different numbers.",
        difficulty: "core",
        guideRef: "special-lines",
        hints: [
          "On y = x, what must be true about the two coordinates of every point?",
          "Are −5 and 5 equal?",
          "Which special line through the origin has y equal to the *negative* of x?",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q09
      {
        kind: "short",
        id: "linear-graphs-p4-q09",
        question: "A straight line passes through the points (2, k) and (6, 13). Its gradient is 2.5. Find k.",
        answer: { type: "number", value: 3 },
        traps: [
          {
            spec: { type: "number", value: 23 },
            feedback: "The gradient is positive, so the line rises from left to right: the point with the smaller x is *lower*. k = 13 − 10, not 13 + 10.",
          },
          { spec: { type: "number", value: 10 }, feedback: "10 is the rise from (2, k) to (6, 13). Now work back down from 13." },
        ],
        solution: [
          "Gradient = rise ÷ run. The run from x = 2 to x = 6 is 4.",
          "Rise = gradient × run = 2.5 × 4 = 10.",
          "So the line rises 10 from (2, k) to (6, 13): k = 13 − 10 = 3.",
          "Check: {{(13 - 3)/(6 - 2) = 10/4 = 2.5}}. ✓",
        ],
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "How far across is it from x = 2 to x = 6?",
          "A gradient of 2.5 means up 2.5 for each 1 across. How far up over the whole run?",
          "The point (6, 13) is that much higher than (2, k).",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "linear-graphs-p4-q10",
        question:
          "The graph shows a delivery van's distance from its depot one morning. It leaves at 8:00 a.m., stops once to make a delivery, drives further out, and then returns to the depot.\n\nFind the van's average speed, in km/h, for the whole trip from 8:00 a.m. until it is back at the depot (including the stop).",
        diagram: `<svg viewBox="0 0 418 272" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance–time graph of a delivery van. Distance from the depot in km goes up to 50; time after 8 a.m. in minutes goes across to 120. Section A rises from 0 km at 0 minutes to 18 km at 30 minutes. Section B is flat at 18 km from 30 to 45 minutes. Section C rises from 18 km at 45 minutes to 48 km at 75 minutes. Section D falls from 48 km at 75 minutes to 0 km at 120 minutes."><rect x="0" y="0" width="418" height="272" fill="#ffffff"/><line x1="52" y1="226" x2="52" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="95.5" y1="226" x2="95.5" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="139" y1="226" x2="139" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="182.5" y1="226" x2="182.5" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="226" y1="226" x2="226" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="269.5" y1="226" x2="269.5" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="313" y1="226" x2="313" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="356.5" y1="226" x2="356.5" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="400" y1="226" x2="400" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="226" x2="400" y2="226" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="205" x2="400" y2="205" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="184" x2="400" y2="184" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="163" x2="400" y2="163" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="142" x2="400" y2="142" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="121" x2="400" y2="121" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="100" x2="400" y2="100" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="79" x2="400" y2="79" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="58" x2="400" y2="58" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="37" x2="400" y2="37" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="16" x2="400" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="226" x2="406" y2="226" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="226" x2="52" y2="10" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="226" x2="52" y2="230" stroke="#334155" stroke-width="1.5"/><text x="52" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">0</text><line x1="95.5" y1="226" x2="95.5" y2="230" stroke="#334155" stroke-width="1.5"/><text x="95.5" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">15</text><line x1="139" y1="226" x2="139" y2="230" stroke="#334155" stroke-width="1.5"/><text x="139" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">30</text><line x1="182.5" y1="226" x2="182.5" y2="230" stroke="#334155" stroke-width="1.5"/><text x="182.5" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">45</text><line x1="226" y1="226" x2="226" y2="230" stroke="#334155" stroke-width="1.5"/><text x="226" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">60</text><line x1="269.5" y1="226" x2="269.5" y2="230" stroke="#334155" stroke-width="1.5"/><text x="269.5" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">75</text><line x1="313" y1="226" x2="313" y2="230" stroke="#334155" stroke-width="1.5"/><text x="313" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">90</text><line x1="356.5" y1="226" x2="356.5" y2="230" stroke="#334155" stroke-width="1.5"/><text x="356.5" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">105</text><line x1="400" y1="226" x2="400" y2="230" stroke="#334155" stroke-width="1.5"/><text x="400" y="242" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">120</text><line x1="48" y1="226" x2="52" y2="226" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="184" x2="52" y2="184" stroke="#334155" stroke-width="1.5"/><text x="45" y="188" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">10</text><line x1="48" y1="142" x2="52" y2="142" stroke="#334155" stroke-width="1.5"/><text x="45" y="146" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">20</text><line x1="48" y1="100" x2="52" y2="100" stroke="#334155" stroke-width="1.5"/><text x="45" y="104" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">30</text><line x1="48" y1="58" x2="52" y2="58" stroke="#334155" stroke-width="1.5"/><text x="45" y="62" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">40</text><line x1="48" y1="16" x2="52" y2="16" stroke="#334155" stroke-width="1.5"/><text x="45" y="20" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">50</text><text x="226" y="264" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">Time after 8:00 a.m. (minutes)</text><text x="14" y="121" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" transform="rotate(-90 14 121)">Distance from depot (km)</text><polyline points="52,226 139,150.4 182.5,150.4 269.5,24.4 400,226" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="139" cy="150.4" r="3" fill="#1f2937"/><circle cx="182.5" cy="150.4" r="3" fill="#1f2937"/><circle cx="269.5" cy="24.4" r="3" fill="#1f2937"/><circle cx="400" cy="226" r="3" fill="#1f2937"/><text x="83.9" y="173.5" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">A</text><text x="160.75" y="139.9" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">B</text><text x="214.4" y="70.6" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">C</text><text x="350.7" y="112.6" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">D</text></svg>`,
        answer: { type: "number", value: 48, display: "48 km/h" },
        traps: [
          {
            spec: { type: "number", value: 0 },
            feedback: "The van ends where it started, but it still travelled a long way. Average speed uses the total distance travelled: 48 km out and 48 km back.",
          },
          {
            spec: { type: "number", value: 40 },
            feedback: "Averaging the four section speeds (36, 0, 60 and 64) doesn't work, because the sections last different lengths of time. Use total distance ÷ total time.",
          },
        ],
        solution: [
          "Total distance travelled: 18 km (A) + 0 km (B) + 30 km (C) + 48 km back (D) = 96 km.",
          "Total time: from 0 to 120 minutes = 2 hours.",
          "Average speed = total distance ÷ total time = 96 ÷ 2 = 48 km/h.",
        ],
        commonError: "Using the final distance from the depot (0 km), or averaging the section speeds.",
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "Average speed = total distance travelled ÷ total time.",
          "How far does the van travel on the way out? How far on the way back?",
          "The trip lasts from 0 to 120 minutes. Change that into hours.",
        ],
        strategy: "Read the axes first",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "short",
        id: "linear-graphs-p4-q11",
        question:
          "A is the point (−1, 4) and B is the point (5, 2). Line L is parallel to y = 2x − 5 and passes through the midpoint of AB. Find the equation of L in the form y = mx + c.",
        answer: { type: "expression", expr: "y=2x-1", display: "y = 2x − 1" },
        traps: [
          {
            spec: { type: "expression", expr: "y=2x-5" },
            feedback: "That's the line you were given. L has the same gradient, but it must pass through the midpoint (2, 3) — find a new c.",
          },
          {
            spec: { type: "expression", expr: "y=2x+3" },
            feedback: "3 is the y-coordinate of the midpoint, not the y-intercept. Substitute (2, 3) into y = 2x + c to find c.",
          },
        ],
        solution: [
          "Midpoint of AB: {{((-1 + 5)/2, (4 + 2)/2)}} = (2, 3).",
          "L is parallel to y = 2x − 5, so it has gradient 2: y = 2x + c.",
          "Substitute (2, 3): 3 = 2 × 2 + c, so c = −1.",
          "L: y = 2x − 1.",
        ],
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Find the midpoint of AB first.",
          "Parallel lines have the same gradient.",
          "Substitute the midpoint into y = 2x + c and solve for c.",
        ],
        strategy: "Work in stages",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "short",
        id: "linear-graphs-p4-q12",
        question:
          "At any one time of day, the length of a shadow is directly proportional to the height of the object casting it. Some measurements taken at the same time are shown.\n\n| Height of pole, h (m) | 1.5 | 4 | ? |\n|---|---|---|---|\n| Length of shadow, s (m) | 2.4 | ? | 12 |\n\nFind the two missing values. Give the missing shadow length first, then the missing height.",
        answer: { type: "list", values: [6.4, 7.5], ordered: true, display: "6.4 m, then 7.5 m" },
        traps: [
          {
            spec: { type: "list", values: [4.9, 11.1], ordered: true },
            feedback: "Adding 0.9 each time is an *additive* rule, not proportion. In direct proportion you multiply by the same number k: k = 2.4 ÷ 1.5.",
          },
        ],
        solution: [
          "Direct proportion means s = kh. From the complete column, k = 2.4 ÷ 1.5 = 1.6.",
          "Missing shadow: s = 1.6 × 4 = 6.4 m.",
          "Missing height: 12 = 1.6h, so h = 12 ÷ 1.6 = 7.5 m.",
          "On a graph of s against h, all three points lie on a straight line through the origin with gradient 1.6.",
        ],
        difficulty: "core",
        guideRef: "direct-proportion-graphs",
        hints: [
          "Direct proportion means s = kh. Use the complete column to find k.",
          "k = 2.4 ÷ 1.5.",
          "Multiply by k to find a shadow; divide by k to find a height.",
        ],
        strategy: "Find the multiplier",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "written",
        id: "linear-graphs-p4-q13",
        question:
          "Mei runs a bath, gets in, and later gets out and lets the water drain away. The graph shows the depth of water in the bath.\n\nDescribe what is happening, and explain how the shape of the graph tells you:\n\n- why section Q is less steep than section P\n- what happens at R and at T\n- what is happening during S\n- what is happening during U, and at what rate",
        diagram: `<svg viewBox="0 0 394 262" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Graph of the depth of water in a bath in cm against time in minutes. Section P rises from 0 cm at 0 minutes to 20 cm at 4 minutes. Section Q rises less steeply from 20 cm at 4 minutes to 28 cm at 8 minutes. Section R is a vertical jump at 8 minutes from 28 cm to 34 cm. Section S is flat at 34 cm from 8 to 20 minutes. Section T is a vertical drop at 20 minutes from 34 cm to 28 cm. Section U falls steadily from 28 cm at 20 minutes to 0 cm at 34 minutes."><rect x="0" y="0" width="394" height="262" fill="#ffffff"/><line x1="52" y1="216" x2="52" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="70" y1="216" x2="70" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="88" y1="216" x2="88" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="106" y1="216" x2="106" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="124" y1="216" x2="124" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="142" y1="216" x2="142" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="160" y1="216" x2="160" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="178" y1="216" x2="178" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="196" y1="216" x2="196" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="214" y1="216" x2="214" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="232" y1="216" x2="232" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="250" y1="216" x2="250" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="268" y1="216" x2="268" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="286" y1="216" x2="286" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="304" y1="216" x2="304" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="322" y1="216" x2="322" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="340" y1="216" x2="340" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="358" y1="216" x2="358" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="376" y1="216" x2="376" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="216" x2="376" y2="216" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="206" x2="376" y2="206" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="196" x2="376" y2="196" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="186" x2="376" y2="186" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="176" x2="376" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="166" x2="376" y2="166" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="156" x2="376" y2="156" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="146" x2="376" y2="146" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="136" x2="376" y2="136" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="126" x2="376" y2="126" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="116" x2="376" y2="116" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="106" x2="376" y2="106" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="96" x2="376" y2="96" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="86" x2="376" y2="86" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="76" x2="376" y2="76" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="66" x2="376" y2="66" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="56" x2="376" y2="56" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="46" x2="376" y2="46" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="36" x2="376" y2="36" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="26" x2="376" y2="26" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="16" x2="376" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="216" x2="382" y2="216" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="216" x2="52" y2="10" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="216" x2="52" y2="220" stroke="#334155" stroke-width="1.5"/><text x="52" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">0</text><line x1="88" y1="216" x2="88" y2="220" stroke="#334155" stroke-width="1.5"/><text x="88" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><line x1="124" y1="216" x2="124" y2="220" stroke="#334155" stroke-width="1.5"/><text x="124" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">8</text><line x1="160" y1="216" x2="160" y2="220" stroke="#334155" stroke-width="1.5"/><text x="160" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">12</text><line x1="196" y1="216" x2="196" y2="220" stroke="#334155" stroke-width="1.5"/><text x="196" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">16</text><line x1="232" y1="216" x2="232" y2="220" stroke="#334155" stroke-width="1.5"/><text x="232" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">20</text><line x1="268" y1="216" x2="268" y2="220" stroke="#334155" stroke-width="1.5"/><text x="268" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">24</text><line x1="304" y1="216" x2="304" y2="220" stroke="#334155" stroke-width="1.5"/><text x="304" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">28</text><line x1="340" y1="216" x2="340" y2="220" stroke="#334155" stroke-width="1.5"/><text x="340" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">32</text><line x1="376" y1="216" x2="376" y2="220" stroke="#334155" stroke-width="1.5"/><text x="376" y="232" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">36</text><line x1="48" y1="216" x2="52" y2="216" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="166" x2="52" y2="166" stroke="#334155" stroke-width="1.5"/><text x="45" y="170" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">10</text><line x1="48" y1="116" x2="52" y2="116" stroke="#334155" stroke-width="1.5"/><text x="45" y="120" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">20</text><line x1="48" y1="66" x2="52" y2="66" stroke="#334155" stroke-width="1.5"/><text x="45" y="70" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">30</text><line x1="48" y1="16" x2="52" y2="16" stroke="#334155" stroke-width="1.5"/><text x="45" y="20" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">40</text><text x="214" y="254" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">Time (minutes)</text><text x="14" y="116" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" transform="rotate(-90 14 116)">Depth of water (cm)</text><polyline points="52,216 88,116 124,76 124,46 232,46 232,76 358,216" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="88" cy="116" r="3" fill="#1f2937"/><circle cx="124" cy="76" r="3" fill="#1f2937"/><circle cx="124" cy="46" r="3" fill="#1f2937"/><circle cx="232" cy="46" r="3" fill="#1f2937"/><circle cx="232" cy="76" r="3" fill="#1f2937"/><circle cx="358" cy="216" r="3" fill="#1f2937"/><text x="61" y="158.5" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">P</text><text x="114.1" y="108" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">Q</text><text x="113.2" y="63" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">R</text><text x="178" y="35" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">S</text><text x="244.6" y="63" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">T</text><text x="309.4" y="148.5" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#1f2937" stroke="#ffffff" stroke-width="3" paint-order="stroke">U</text></svg>`,
        marks: 4,
        modelAnswer:
          "**P and Q:** the bath is filling. P rises 20 cm in 4 minutes (5 cm per minute) but Q rises only 8 cm in 4 minutes (2 cm per minute), so water is coming in more slowly during Q — for example, one tap has been turned off.\n\n**R and T:** at 8 minutes the depth jumps up 6 cm with no time passing — Mei gets into the bath and her body pushes the water level up. At 20 minutes it drops straight down 6 cm: she gets out.\n\n**S:** the line is flat, so the depth is not changing. The taps are off and the plug is in while Mei is in the bath (from 8 to 20 minutes).\n\n**U:** the depth falls steadily from 28 cm to 0 cm in 14 minutes. The plug has been pulled and the water drains at a constant 2 cm per minute until the bath is empty at 34 minutes.",
        markScheme: [
          {
            point: "Q is less steep than P because water is coming in more slowly (e.g. one tap turned off): 5 cm per minute, then 2 cm per minute",
            keywords: ["slower", "less steep", "one tap", "tap", "5 cm", "2 cm", "rate"],
          },
          {
            point: "R: Mei gets in (sudden rise with no time passing); T: she gets out",
            keywords: ["gets in", "got in", "gets out", "got out", "vertical", "sudden", "instant"],
          },
          {
            point: "S is flat: the depth is constant — taps off, plug in",
            keywords: ["flat", "constant", "taps off", "not changing", "same depth", "stays"],
          },
          {
            point: "U: plug pulled, water drains at a steady 2 cm per minute until empty at 34 minutes",
            keywords: ["drain", "plug", "steady", "2 cm", "empty", "34", "decreas"],
          },
        ],
        commonError: "Describing the graph like a journey ('going up a hill'). Read the axes: the height of the line is the depth of the water.",
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "Read the axes first: up is the depth of water, across is time.",
          "Steeper means the depth is changing faster. Flat means it is not changing at all.",
          "A vertical jump means the depth changed with no time passing. What could do that in a bath?",
        ],
        strategy: "Read the axes first",
      },
      // ---------------------------------------------------------------- q14
      {
        kind: "short",
        id: "linear-graphs-p4-q14",
        question:
          "These points all lie on one straight line.\n\n| x | −2 | 1 | 4 | p |\n|---|---|---|---|---|\n| y | 11 | 5 | −1 | −15 |\n\nFind the equation of the line, and hence find the value of p.",
        answer: { type: "number", value: 11, display: "p = 11" },
        traps: [
          { spec: { type: "number", value: -11 }, feedback: "Check the sign: −2p = −22 gives p = +11. Substitute back: −2 × 11 + 7 = −15. ✓" },
          { spec: { type: "number", value: 7 }, feedback: "7 is the y-intercept, c. Now put y = −15 into y = −2x + 7 and solve for x." },
        ],
        solution: [
          "Gradient from (−2, 11) and (1, 5): {{(5 - 11)/(1 - (-2)) = (-6)/3 = -2}}.",
          "Substitute (1, 5) into y = −2x + c: 5 = −2 + c, so c = 7. The line is y = −2x + 7.",
          "Check (4, −1): −2 × 4 + 7 = −1. ✓",
          "Now −15 = −2p + 7, so −2p = −22 and p = 11.",
        ],
        solutions: [
          {
            label: "Continue the pattern",
            steps: [
              "Each time x goes up by 3, y goes down by 6 — so y goes down by 2 for every 1 across.",
              "From y = −1 down to y = −15 is a drop of 14, which needs 14 ÷ 2 = 7 more across.",
              "p = 4 + 7 = 11.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "line-through-two-points",
        hints: [
          "Use two of the complete columns to find the gradient.",
          "Substitute one point to find c, then check with the third point.",
          "Put y = −15 into your equation and solve for p.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "linear-graphs-p4-q15",
        question:
          "Not every graph is a straight line: the graph of y = {{x^2 - 5}} is a curve. Find the x-coordinates of the two points where it meets the line y = 11.",
        answer: { type: "list", values: [-4, 4], display: "x = −4 and x = 4" },
        traps: [
          {
            spec: { type: "list", values: [-2.449, 2.449], tolerance: 0.01 },
            feedback: "Check the first step: {{x^2 - 5 = 11}} means {{x^2 = 11 + 5 = 16}}, not 11 − 5.",
          },
          { spec: { type: "list", values: [-8, 8] }, feedback: "8 is half of 16. You need the numbers that *square* to give 16." },
        ],
        solution: [
          "Where the graphs meet, the y-values are equal: {{x^2 - 5 = 11}}.",
          "Add 5 to both sides: {{x^2 = 16}}.",
          "x = 4 or x = −4, because {{4^2 = 16}} and {{(-4)^2 = 16}}.",
          "The curve is symmetrical about the y-axis, so the two meeting points are (−4, 11) and (4, 11).",
        ],
        commonError: "Giving only x = 4. A negative number squared is positive too, so there are two answers.",
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "Where two graphs meet, their y-values are equal. Write an equation.",
          "Solve {{x^2 - 5 = 11}}. What is {{x^2}}?",
          "There are two numbers that square to 16.",
        ],
        strategy: "Use the inverse",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "written",
        id: "linear-graphs-p4-q16",
        question:
          "Ravi says:\n\n> \"Any two straight lines cross somewhere if you extend them far enough. So the lines y = 2x + 3 and 2y = 4x − 1 must meet.\"\n\nIs Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong.\n\nMake y the subject of the second equation by dividing every term by 2: y = 2x − {{1/2}}.\n\nNow both lines have gradient 2, so they are **parallel**. Their y-intercepts are different (3 and −{{1/2}}), so they are not the same line.\n\nParallel lines stay the same distance apart and never meet. (Trying to solve 2x + 3 = 2x − {{1/2}} gives 3 = −{{1/2}}, which is impossible — there is no crossing point.)",
        markScheme: [
          {
            point: "Rearranges 2y = 4x − 1 to y = 2x − 1/2",
            keywords: ["2x - 1/2", "2x − 1/2", "2x - 0.5", "2x − 0.5", "2x - ½", "2x − ½", "divide by 2", "divide"],
          },
          { point: "Both lines have gradient 2, so they are parallel", keywords: ["gradient 2", "same gradient", "parallel", "both 2"] },
          {
            point: "Different intercepts, so they never meet: Ravi is wrong",
            keywords: ["never meet", "never cross", "different intercept", "wrong", "not right", "no"],
          },
        ],
        commonError: "Reading the gradient of 2y = 4x − 1 as 4. Make y the subject first.",
        difficulty: "core",
        guideRef: "equations-of-lines",
        hints: [
          "Make y the subject of 2y = 4x − 1.",
          "Compare the gradients of the two lines.",
          "What do you know about two lines with the same gradient but different intercepts?",
        ],
        strategy: "Make it simpler (rearrange first)",
      },
      // ---------------------------------------------------------------- q17
      {
        kind: "short",
        id: "linear-graphs-p4-q17",
        question:
          "The lines y = 3x − 2 and y = mx + 6 meet at a point on the x-axis. Find the area of the triangle enclosed by these two lines and the y-axis. Give your answer as a fraction.",
        answer: { type: "fraction", n: 8, d: 3, display: "{{8/3}} square units" },
        traps: [
          { spec: { type: "fraction", n: 16, d: 3 }, feedback: "{{16/3}} is base × height. The area of a triangle is half of that." },
          { spec: { type: "number", value: -9 }, feedback: "−9 is the value of m. The question asks for the area of the triangle." },
        ],
        solution: [
          "The corners of the triangle are where each pair of lines meets.",
          "y = 3x − 2 meets the y-axis at (0, −2). y = mx + 6 meets the y-axis at (0, 6).",
          "The two lines meet on the x-axis, where y = 0: 3x − 2 = 0, so x = {{2/3}}. Third corner: ({{2/3}}, 0).",
          "Take the side on the y-axis as the base: from −2 up to 6 is 8.",
          "The height is the horizontal distance from the y-axis to ({{2/3}}, 0), which is {{2/3}}.",
          "Area = {{1/2 * 8 * 2/3 = 8/3}} square units.",
          "Notice that you never needed m. (It is −9, but the area doesn't depend on it.)",
        ],
        commonError: "Trying to find m first and getting stuck. Draw the triangle: its corners can all be found without m.",
        difficulty: "challenge",
        guideRef: "equations-of-lines",
        hints: [
          "Sketch it. The triangle has one side on the y-axis. Where does each line cross the y-axis?",
          "Where does y = 3x − 2 cross the x-axis? That is the third corner.",
          "Use the side on the y-axis as the base; the height is the horizontal distance to the third corner. Do you even need m?",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q18
      {
        kind: "short",
        id: "linear-graphs-p4-q18",
        question:
          "The point (k, 2k) lies on the straight line through (1, 7) and (4, 1). Find k. Give your answer as a fraction or a decimal.",
        answer: { type: "fraction", n: 9, d: 4, allowDecimal: true, display: "{{9/4}} (= 2.25)" },
        traps: [
          {
            spec: { type: "fraction", n: 9, d: 2, allowDecimal: true },
            feedback: "Check your algebra: 2k = −2k + 9 means 4k = 9. (And {{9/2}} = 4.5 is the value of 2k, the y-coordinate — not k.)",
          },
        ],
        solution: [
          "Gradient of the line: {{(1 - 7)/(4 - 1) = (-6)/3 = -2}}.",
          "Substitute (1, 7) into y = −2x + c: 7 = −2 + c, so c = 9. The line is y = −2x + 9.",
          "The point (k, 2k) has x = k and y = 2k, so 2k = −2k + 9.",
          "4k = 9, so k = {{9/4}} = 2.25.",
          "Check: the point is (2.25, 4.5), and −2 × 2.25 + 9 = 4.5. ✓",
        ],
        solutions: [
          {
            label: "Two lines crossing",
            steps: [
              "Every point of the form (k, 2k) lies on the line y = 2x.",
              "So the point is where y = 2x crosses y = −2x + 9: 2x = −2x + 9, giving x = {{9/4}}.",
            ],
          },
        ],
        difficulty: "challenge",
        guideRef: "line-through-two-points",
        hints: [
          "Find the equation of the line through (1, 7) and (4, 1) first.",
          "The point (k, 2k) is on the line, so its coordinates fit the equation. Substitute x = k and y = 2k.",
          "Solve 2k = −2k + 9.",
        ],
        strategy: "Introduce a variable",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "linear-graphs-p4-q19",
        question:
          "Three corners of a parallelogram are O(0, 0), P(4, 1) and Q(1, 3). There are **three** different places where the fourth corner could be.\n\nFind all three, and explain why there are exactly three.",
        marks: 4,
        modelAnswer:
          "The new corner R must be **opposite** one of the three given corners, so there are three cases. In a parallelogram the diagonals bisect each other, so the two diagonals share a midpoint. That gives R = (sum of R's two neighbours) − (the corner opposite R).\n\n- R opposite O: R = P + Q − O = (4 + 1 − 0, 1 + 3 − 0) = **(5, 4)**. Check: diagonals OR and PQ both have midpoint (2.5, 2).\n- R opposite P: R = O + Q − P = (0 + 1 − 4, 0 + 3 − 1) = **(−3, 2)**. Check: diagonals PR and OQ both have midpoint (0.5, 1.5).\n- R opposite Q: R = O + P − Q = (0 + 4 − 1, 0 + 1 − 3) = **(3, −2)**. Check: diagonals QR and OP both have midpoint (2, 0.5).\n\nThere are exactly three because the fourth corner must be opposite exactly one of O, P and Q, and each choice fixes R in one place. The three points are all different.",
        markScheme: [
          { point: "Fourth corner (5, 4)", keywords: ["(5, 4)", "(5,4)", "5, 4", "5,4"] },
          { point: "Fourth corner (−3, 2)", keywords: ["(-3, 2)", "(−3, 2)", "(-3,2)", "-3, 2", "−3, 2"] },
          { point: "Fourth corner (3, −2)", keywords: ["(3, -2)", "(3, −2)", "(3,-2)", "3, -2", "3, −2"] },
          {
            point: "Explains the three cases: the new corner is opposite O, P or Q (e.g. using diagonals sharing a midpoint, or equal steps along opposite sides)",
            keywords: ["opposite", "diagonal", "midpoint", "three cases", "bisect", "each"],
          },
        ],
        commonError: "Finding only (5, 4) and forgetting that any of the three given points could be the corner opposite the new one.",
        difficulty: "challenge",
        guideRef: "coordinates-midpoints",
        hints: [
          "Sketch the three points and draw one parallelogram. Can you draw a *different* one using the same three corners?",
          "Opposite sides of a parallelogram are equal steps: for example, the step from O to P must match the step from Q to the new corner.",
          "Or use diagonals: they have the same midpoint. The new corner could be opposite O, opposite P or opposite Q.",
        ],
        strategy: "Split into cases",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "linear-graphs-p4-q20",
        question:
          "A bus leaves Changi at 10:00 and travels towards Jurong, 45 km away, at a steady 60 km/h. A cyclist leaves Jurong at 10:15 and rides along the same road towards Changi at a steady 20 km/h. How far from Changi are they when they meet? Give your answer in km.",
        answer: { type: "number", value: 37.5, display: "37.5 km" },
        traps: [
          {
            spec: { type: "number", value: 33.75 },
            feedback: "That's where they would meet if both left at 10:00. The cyclist starts 15 minutes later, so the bus gets a 15 km head start.",
          },
          { spec: { type: "number", value: 7.5 }, feedback: "7.5 km is how far they are from Jurong. The question asks for the distance from Changi." },
        ],
        solution: [
          "Let t be the time in hours after 10:00 and d the distance from Changi in km.",
          "Bus: d = 60t.",
          "Cyclist: at t = {{1/4}} she is at d = 45, and d then falls by 20 every hour: d = 45 − 20(t − {{1/4}}) = 50 − 20t.",
          "They meet where the lines cross: 60t = 50 − 20t, so 80t = 50 and t = {{5/8}} hour (at 10:37:30).",
          "d = 60 × {{5/8}} = 37.5 km. Check with the cyclist: 50 − 20 × {{5/8}} = 50 − 12.5 = 37.5. ✓",
        ],
        solutions: [
          {
            label: "Head start first",
            steps: [
              "By 10:15 the bus has gone 60 × {{1/4}} = 15 km, so the gap is 45 − 15 = 30 km.",
              "From then on they close the gap at 60 + 20 = 80 km/h: 30 ÷ 80 = {{3/8}} hour.",
              "In that time the bus goes 60 × {{3/8}} = 22.5 km more: 15 + 22.5 = 37.5 km from Changi. (Quicker — no equations of lines needed.)",
            ],
          },
        ],
        commonError: "Ignoring the 15-minute delay, or giving the distance from the wrong end.",
        difficulty: "challenge",
        guideRef: "real-life-graphs",
        hints: [
          "Sketch both journeys on one distance–time graph, measuring distance from Changi.",
          "Where is the bus at 10:15? How big is the gap between them then?",
          "After 10:15 the gap closes at 60 + 20 km per hour.",
        ],
        strategy: "Draw a diagram",
      },
    ],
  },
];
