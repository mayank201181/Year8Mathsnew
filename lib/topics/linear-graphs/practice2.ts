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
          "On a plan of a community garden, a rectangular vegetable plot has corners at (−3, 5), (6, 5), (6, −2) and (−3, −2). Write down the equation of the straight line along the plot's right-hand edge.",
        answer: { type: "text", accept: ["x=6", "6=x", "x=6.0"], display: "x = 6" },
        traps: [
          {
            spec: { type: "text", accept: ["y=6", "6=y"] },
            feedback: "y = 6 is a *horizontal* line. Along the right-hand edge the y-coordinate changes, but the x-coordinate stays at 6 — so the edge is x = 6.",
          },
          {
            spec: { type: "text", accept: ["x=-3", "-3=x"] },
            feedback: "x = −3 is the left-hand edge. The right-hand edge is the one with the bigger x-coordinate.",
          },
        ],
        solution: [
          "The right-hand edge joins (6, 5) and (6, −2).",
          "Every point on that edge has x-coordinate 6, whatever its y-coordinate.",
          "So the edge lies on the vertical line x = 6.",
        ],
        commonError: "Writing y = 6 because the line is 'at 6'. Ask yourself which coordinate stays the same along the edge.",
        difficulty: "warmup",
        guideRef: "special-lines",
        hints: ["Which two corners are on the right-hand edge?", "Which coordinate is the same for both of those corners?"],
        strategy: "Draw a diagram",
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
          "Zara cycles from home to East Coast Park. Her brother Jun leaves home later and gets a lift to the same place in a car. The graph shows both journeys.\n\nHow many km/h faster than Zara was Jun travelling?",
        diagram: `<svg viewBox="0 0 370 254" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Distance–time graph of two journeys from home to a park 10 km away. Zara's line (solid) rises steadily from 0 km at 0 minutes to 10 km at 40 minutes, then stays flat at 10 km. Jun's line (dashed) stays at 0 km until 10 minutes, rises steadily to 10 km at 30 minutes, then stays flat at 10 km."><rect x="0" y="0" width="370" height="254" fill="#ffffff"/><line x1="52" y1="208" x2="52" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="82" y1="208" x2="82" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="112" y1="208" x2="112" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="142" y1="208" x2="142" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="172" y1="208" x2="172" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="202" y1="208" x2="202" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="232" y1="208" x2="232" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="262" y1="208" x2="262" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="292" y1="208" x2="292" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="322" y1="208" x2="322" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="352" y1="208" x2="352" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="208" x2="352" y2="208" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="192" x2="352" y2="192" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="176" x2="352" y2="176" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="160" x2="352" y2="160" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="144" x2="352" y2="144" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="128" x2="352" y2="128" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="112" x2="352" y2="112" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="96" x2="352" y2="96" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="80" x2="352" y2="80" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="64" x2="352" y2="64" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="48" x2="352" y2="48" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="32" x2="352" y2="32" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="16" x2="352" y2="16" stroke="#e5e7eb" stroke-width="1"/><line x1="52" y1="208" x2="358" y2="208" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="208" x2="52" y2="10" stroke="#334155" stroke-width="1.5"/><line x1="52" y1="208" x2="52" y2="212" stroke="#334155" stroke-width="1.5"/><text x="52" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">0</text><line x1="112" y1="208" x2="112" y2="212" stroke="#334155" stroke-width="1.5"/><text x="112" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">10</text><line x1="172" y1="208" x2="172" y2="212" stroke="#334155" stroke-width="1.5"/><text x="172" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">20</text><line x1="232" y1="208" x2="232" y2="212" stroke="#334155" stroke-width="1.5"/><text x="232" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">30</text><line x1="292" y1="208" x2="292" y2="212" stroke="#334155" stroke-width="1.5"/><text x="292" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">40</text><line x1="352" y1="208" x2="352" y2="212" stroke="#334155" stroke-width="1.5"/><text x="352" y="224" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">50</text><line x1="48" y1="208" x2="52" y2="208" stroke="#334155" stroke-width="1.5"/><line x1="48" y1="176" x2="52" y2="176" stroke="#334155" stroke-width="1.5"/><text x="45" y="180" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><line x1="48" y1="144" x2="52" y2="144" stroke="#334155" stroke-width="1.5"/><text x="45" y="148" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><line x1="48" y1="112" x2="52" y2="112" stroke="#334155" stroke-width="1.5"/><text x="45" y="116" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">6</text><line x1="48" y1="80" x2="52" y2="80" stroke="#334155" stroke-width="1.5"/><text x="45" y="84" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">8</text><line x1="48" y1="48" x2="52" y2="48" stroke="#334155" stroke-width="1.5"/><text x="45" y="52" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">10</text><line x1="48" y1="16" x2="52" y2="16" stroke="#334155" stroke-width="1.5"/><text x="45" y="20" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">12</text><text x="202" y="246" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">Time after Zara leaves home (minutes)</text><text x="14" y="112" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#334155" transform="rotate(-90 14 112)">Distance from home (km)</text><polyline points="52,208 292,48 352,48" fill="none" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/><polyline points="52,208 112,208 232,48 352,48" fill="none" stroke="#ea580c" stroke-width="2.5" stroke-dasharray="7 5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="292" cy="48" r="3" fill="#1f2937"/><circle cx="112" cy="208" r="3" fill="#1f2937"/><circle cx="232" cy="48" r="3" fill="#1f2937"/><text x="232" y="124.8" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#2563eb" stroke="#ffffff" stroke-width="3" paint-order="stroke">Zara</text><text x="190" y="73.6" font-size="13" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#ea580c" stroke="#ffffff" stroke-width="3" paint-order="stroke">Jun</text></svg>`,
        answer: { type: "number", value: 15, display: "15 km/h faster" },
        traps: [
          {
            spec: { type: "number", value: 30 },
            feedback: "30 km/h is Jun's speed. The question asks how much *faster* he was than Zara — subtract her speed.",
          },
          {
            spec: { type: "number", value: 0.25 },
            feedback: "0.25 is in km per *minute*. Change both speeds into km per hour first (multiply by 60).",
          },
        ],
        solution: [
          "Speed is the gradient of each line. Read where each sloping line starts and ends.",
          "Zara: 10 km in 40 minutes = {{2/3}} hour, so her speed is 10 ÷ {{2/3}} = 15 km/h.",
          "Jun: from 10 minutes to 30 minutes he goes 10 km — 10 km in 20 minutes = {{1/3}} hour, so 10 ÷ {{1/3}} = 30 km/h.",
          "Jun was 30 − 15 = 15 km/h faster. (His line is twice as steep as hers.)",
        ],
        commonError: "Using 30 minutes for Jun's journey. He didn't leave until 10 minutes, so his journey took 20 minutes.",
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "On a distance–time graph, speed is the gradient: distance ÷ time.",
          "Jun's line is flat at the start. When does he actually set off, and when does he arrive?",
          "Change each speed into km per hour before you compare them.",
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
          "A zipline at an adventure park starts 30 m above the ground and runs in a straight line downhill. Its height, y metres, at a horizontal distance of x metres from the start is y = 30 − 0.15x.\n\nA tree 15 m tall stands directly under the zipline, 80 m (measured horizontally) from the start. How many metres above the top of the tree does the zipline pass?",
        answer: { type: "number", value: 3, display: "3 m" },
        traps: [
          {
            spec: { type: "number", value: 18 },
            feedback: "18 m is the height of the zipline above the *ground* at x = 80. The tree is 15 m tall, so how far above the tree is it?",
          },
          {
            spec: { type: "number", value: -3 },
            feedback: "0.15 × 80 = 12 m is how far the zipline has *dropped*, not its height. Its height is 30 − 12 = 18 m.",
          },
        ],
        solution: [
          "Substitute x = 80 into y = 30 − 0.15x.",
          "0.15 × 80 = 12, so y = 30 − 12 = 18. The zipline is 18 m above the ground there.",
          "The tree is 15 m tall, so the zipline passes 18 − 15 = 3 m above the top of the tree.",
        ],
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "Which value do you know: x or y?",
          "Substitute x = 80 to find the height of the zipline above the tree.",
          "Compare that height with the height of the tree.",
        ],
        strategy: "Check by substituting",
      },
      // ---------------------------------------------------------------- q10
      {
        kind: "short",
        id: "linear-graphs-p3-q10",
        question:
          "On a city map grid, a new MRT line runs straight along the line y = −x, and a main road runs along the line x = 4. A station is built where the MRT line crosses the road. A bus interchange is at (−2, 6). A bicycle-hire point is placed exactly halfway between the station and the bus interchange. Where is the bicycle-hire point? Give your answer as coordinates (x, y).",
        answer: { type: "list", values: [1, 1], ordered: true, display: "(1, 1)" },
        traps: [
          {
            spec: { type: "list", values: [1, 5], ordered: true },
            feedback: "Check the station. On y = −x, when x = 4 the y-coordinate is −4, not 4 — so the station is at (4, −4).",
          },
          {
            spec: { type: "list", values: [4, -4], ordered: true },
            feedback: "(4, −4) is the station. Now find the point halfway between the station and the bus interchange (−2, 6).",
          },
        ],
        solution: [
          "The station is on both lines. On x = 4, x is 4; on y = −x, y = −4. Station: (4, −4).",
          "Halfway between (4, −4) and (−2, 6) is the midpoint.",
          "x: {{(4 + (-2))/2 = 2/2 = 1}}. y: {{(-4 + 6)/2 = 2/2 = 1}}.",
          "The bicycle-hire point is at (1, 1).",
        ],
        difficulty: "core",
        guideRef: "special-lines",
        hints: [
          "First find the station: which point is on both x = 4 and y = −x?",
          "On the line y = −x, the y-coordinate is the negative of the x-coordinate.",
          "Then average the coordinates of the station and the bus interchange.",
        ],
        strategy: "Work in stages",
      },
      // ---------------------------------------------------------------- q11
      {
        kind: "short",
        id: "linear-graphs-p3-q11",
        question:
          "At a community garden, Tank A holds 800 litres and is being emptied at 25 litres per minute. At the same moment, Tank B holds 200 litres and is being filled at 15 litres per minute.\n\nOn a graph of volume against time, the two lines cross when the tanks hold the same amount. How many litres are in each tank at that moment?",
        answer: { type: "number", value: 425, display: "425 litres" },
        traps: [
          {
            spec: { type: "number", value: 500 },
            feedback: "500 litres is halfway between 800 and 200 — but the tanks change at different rates, so they don't meet halfway. Find *when* they are equal first.",
          },
          {
            spec: { type: "number", value: 15 },
            feedback: "15 minutes is *when* the tanks hold the same amount. Now work out how much is in each tank at that time.",
          },
        ],
        solution: [
          "Tank A: V = 800 − 25t. Tank B: V = 200 + 15t.",
          "The lines cross where the volumes are equal: 800 − 25t = 200 + 15t.",
          "So 600 = 40t, and t = 15 minutes.",
          "Volume: A holds 800 − 25 × 15 = 425 litres. Check B: 200 + 15 × 15 = 425 litres. ✓",
        ],
        solutions: [
          {
            label: "Closing the gap",
            steps: [
              "The gap starts at 800 − 200 = 600 litres.",
              "A loses 25 litres and B gains 15 litres each minute, so the gap shrinks by 40 litres per minute: it closes after 600 ÷ 40 = 15 minutes.",
              "In that time B gains 15 × 15 = 225 litres: 200 + 225 = 425 litres.",
            ],
          },
        ],
        commonError: "Assuming the tanks meet halfway (500 litres). That only happens if they change at the same rate.",
        difficulty: "core",
        guideRef: "real-life-graphs",
        hints: [
          "Write a formula for each tank's volume after t minutes.",
          "Where the graphs cross, the two volumes are equal. Set your formulas equal and find t.",
          "The question wants the *volume* at the crossing point — the y-coordinate, not the t-coordinate.",
        ],
        strategy: "Draw a diagram (sketch both lines)",
      },
      // ---------------------------------------------------------------- q12
      {
        kind: "written",
        id: "linear-graphs-p3-q12",
        question:
          "Mr Lim's car uses petrol at a steady rate. The graph of petrol used, P litres, against distance driven, d km, is a straight line through the origin with gradient 0.06.\n\n(a) What does the gradient 0.06 tell you about the car?\n\n(b) Mr Lim says: \"If I drive 3 times as far, I will use 3 times as much petrol.\" Explain how the graph shows that he is right.\n\n(c) The car's tank holds 45 litres. How far can the car go on a full tank?",
        marks: 3,
        modelAnswer:
          "(a) The car uses 0.06 litres of petrol for every kilometre it drives: P = 0.06d.\n\n(b) The graph is a straight line through the origin, so P is directly proportional to d. Multiplying d by 3 multiplies 0.06d by 3, so the petrol used is 3 times as much. For example, 100 km uses 6 litres and 300 km uses 18 litres. (If the line did not go through the origin — say there were a fixed amount added on — this would not be true.)\n\n(c) 45 = 0.06d, so d = 45 ÷ 0.06 = 750 km.",
        markScheme: [
          { point: "The car uses 0.06 litres of petrol per km driven", keywords: ["0.06", "per km", "each km", "every km", "litres per", "for every"] },
          {
            point: "Straight line through the origin means direct proportion, so tripling d triples P (e.g. 100 km → 6 L, 300 km → 18 L)",
            keywords: ["origin", "(0, 0)", "proportional", "proportion", "3 times", "triple", "18"],
          },
          { point: "750 km, from 45 ÷ 0.06", keywords: ["750", "45 ÷ 0.06"] },
        ],
        commonError: "In (c), multiplying 45 × 0.06. That gives the petrol for 45 km — you know the petrol and want the distance, so divide.",
        difficulty: "core",
        guideRef: "direct-proportion-graphs",
        hints: [
          "The gradient is the change in P for each 1 km of distance.",
          "What is special about a straight-line graph that goes through the origin?",
          "For (c), solve 45 = 0.06d.",
        ],
        strategy: "Interpret the gradient as a rate",
      },
      // ---------------------------------------------------------------- q13
      {
        kind: "short",
        id: "linear-graphs-p3-q13",
        question:
          "A hot-air balloon is coming down at a steady rate. At 9:05 a.m. it is 840 m above the ground, and at 9:20 a.m. it is 390 m above the ground. The graph of height (m) against time (minutes) is a straight line.\n\n(a) Find the gradient of the graph and say what it means.\n\n(b) If the balloon keeps coming down at the same rate, how many minutes after 9:20 a.m. will it reach the ground?\n\nType your answer to (b).",
        answer: { type: "number", value: 13, display: "13 minutes (at 9:33 a.m.)" },
        traps: [
          {
            spec: { type: "number", value: 28 },
            feedback: "28 minutes is measured from 9:05 a.m. (840 ÷ 30). The question asks how long after 9:20 a.m., when 390 m are left.",
          },
          {
            spec: { type: "number", value: 26 },
            feedback: "26 is 390 ÷ 15. Divide the height left by the *rate* of descent (metres per minute), not by the 15-minute gap.",
          },
        ],
        solution: [
          "(a) In 15 minutes the height changes by 390 − 840 = −450 m.",
          "Gradient = {{(-450)/15 = -30}}: the balloon comes down 30 m every minute.",
          "(b) At 9:20 it has 390 m left to fall. At 30 m per minute that takes 390 ÷ 30 = 13 minutes.",
          "It lands at 9:33 a.m.",
        ],
        commonError: "Forgetting that the gradient is negative, or dividing by the time gap instead of the rate.",
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "Gradient = change in height ÷ change in time. How much time passes between the two readings?",
          "The height goes down, so the gradient is negative. How many metres does it fall each minute?",
          "From 9:20, how long does it take to fall the last 390 m at that rate?",
        ],
        strategy: "Interpret the gradient as a rate",
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
          "At an MRT station, Mei stands still on a moving escalator and reaches the top in 60 seconds. One day the escalator is switched off, and she walks up it in 90 seconds. How many seconds would it take her to reach the top if she walks up the *moving* escalator at her usual pace?",
        answer: { type: "number", value: 36, display: "36 seconds" },
        traps: [
          {
            spec: { type: "number", value: 75 },
            feedback: "75 is the mean of 60 and 90. But walking on a moving escalator should be *faster* than either on its own — the two speeds add.",
          },
          {
            spec: { type: "number", value: 150 },
            feedback: "Adding the times would make her slower than standing still! It's the *speeds* that add, not the times.",
          },
        ],
        solution: [
          "Make it concrete: pick a length that 60 and 90 both divide into, say 180 steps.",
          "The escalator moves her 180 ÷ 60 = 3 steps per second. Walking, she covers 180 ÷ 90 = 2 steps per second.",
          "Walking on the moving escalator, the speeds add: 3 + 2 = 5 steps per second.",
          "Time = 180 ÷ 5 = 36 seconds.",
        ],
        solutions: [
          {
            label: "Fractions of the escalator",
            steps: [
              "Each second the escalator carries her {{1/60}} of the way, and her walking covers {{1/90}} of the way.",
              "Together: {{1/60 + 1/90 = 3/180 + 2/180 = 5/180 = 1/36}} of the way each second.",
              "So the whole escalator takes 36 seconds.",
            ],
          },
        ],
        commonError: "Averaging or adding the times. On a distance–time graph, the gradients (speeds) add — the times don't.",
        difficulty: "challenge",
        guideRef: "real-life-graphs",
        hints: [
          "Should the answer be more or less than 60 seconds? Use that to rule out some guesses.",
          "Make it simpler: suppose the escalator is 180 steps long. How many steps per second does each method cover?",
          "When she walks on the moving escalator, what happens to the two speeds?",
        ],
        strategy: "Make it simpler (try a specific number)",
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
        question:
          "The grid shows two straight lines, A and B, both starting at the origin. Which line is steeper? Find the gradient of the **steeper** line. Give your answer as a fraction or a decimal.",
        diagram: `<svg viewBox="0 0 268 204" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Coordinate grid from 0 to 7 across and 0 to 5 up. Line A starts at the origin and passes through the marked point (4, 3). Line B starts at the origin and passes through the marked point (6, 4)."><rect x="0" y="0" width="268" height="204" fill="#ffffff"/><line x1="22" y1="182" x2="22" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="54" y1="182" x2="54" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="86" y1="182" x2="86" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="118" y1="182" x2="118" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="150" y1="182" x2="150" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="182" y1="182" x2="182" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="214" y1="182" x2="214" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="246" y1="182" x2="246" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="182" x2="246" y2="182" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="150" x2="246" y2="150" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="118" x2="246" y2="118" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="86" x2="246" y2="86" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="54" x2="246" y2="54" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="22" x2="246" y2="22" stroke="#e5e7eb" stroke-width="1"/><line x1="22" y1="182" x2="256" y2="182" stroke="#334155" stroke-width="1.5"/><line x1="22" y1="182" x2="22" y2="12" stroke="#334155" stroke-width="1.5"/><text x="252" y="196" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">x</text><text x="28" y="18" font-size="13" font-style="italic" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">y</text><line x1="22" y1="182" x2="235.33" y2="22" stroke="#2563eb" stroke-width="2.5" stroke-linecap="round"/><text x="222" y="17.4" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#2563eb" stroke="#ffffff" stroke-width="3" paint-order="stroke">A</text><line x1="22" y1="182" x2="246" y2="32.67" stroke="#ea580c" stroke-width="2.5" stroke-linecap="round"/><text x="255.6" y="49.4" font-size="14" text-anchor="middle" font-weight="bold" font-family="sans-serif" fill="#ea580c" stroke="#ffffff" stroke-width="3" paint-order="stroke">B</text><text x="54" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="86" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="118" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="150" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="182" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><text x="214" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">6</text><text x="246" y="196" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">7</text><text x="17" y="154" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">1</text><text x="17" y="122" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">2</text><text x="17" y="90" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">3</text><text x="17" y="58" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">4</text><text x="17" y="26" font-size="11" text-anchor="end" font-family="sans-serif" fill="#334155" stroke="#ffffff" stroke-width="3" paint-order="stroke">5</text><circle cx="150" cy="86" r="4" fill="#2563eb"/><circle cx="214" cy="54" r="4" fill="#ea580c"/></svg>`,
        answer: { type: "fraction", n: 3, d: 4, allowDecimal: true, display: "{{3/4}} (line A)" },
        traps: [
          {
            spec: { type: "fraction", n: 2, d: 3 },
            feedback: "{{2/3}} is the gradient of line B, the *less* steep line. Line B looks longer, but length isn't steepness: compare rise ÷ run.",
          },
          { spec: { type: "fraction", n: 4, d: 3 }, feedback: "That's run ÷ rise. Gradient = rise ÷ run: how far up for each 1 across." },
        ],
        solution: [
          "Line A passes through (4, 3): rise 3, run 4, so its gradient is {{3/4}} = 0.75.",
          "Line B passes through (6, 4): rise 4, run 6, so its gradient is {{4/6 = 2/3}} ≈ 0.67.",
          "{{3/4}} > {{2/3}} (as twelfths: {{9/12}} > {{8/12}}), so line A is steeper, with gradient {{3/4}}.",
        ],
        difficulty: "warmup",
        guideRef: "gradient-intercept",
        hints: ["Find a point where each line crosses grid lines exactly.", "Work out rise ÷ run for each line, then compare."],
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
        question:
          "Hana draws the graph of y = 2 − 3x for values of x from −2 to 3. What are the greatest and the least values of y on her graph? Give the greatest value first.",
        answer: { type: "list", values: [8, -7], ordered: true, display: "greatest 8, least −7" },
        traps: [
          {
            spec: { type: "list", values: [-7, 8], ordered: true },
            feedback: "The gradient is −3, so y gets *smaller* as x gets bigger. The greatest y is at the left end, x = −2.",
          },
          {
            spec: { type: "list", values: [-4, -7], ordered: true },
            feedback: "Check x = −2: −3 × (−2) = +6, so y = 2 + 6 = 8.",
          },
        ],
        solution: [
          "The graph is a straight line with gradient −3, so it slopes downwards: y is largest at the smallest x, and smallest at the largest x.",
          "x = −2: y = 2 − 3 × (−2) = 2 + 6 = 8 (greatest).",
          "x = 3: y = 2 − 3 × 3 = 2 − 9 = −7 (least).",
        ],
        commonError: "Assuming the biggest x gives the biggest y. That's only true when the gradient is positive.",
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "Does the line slope up or down from left to right? Look at the gradient.",
          "So which end of the graph is highest — x = −2 or x = 3?",
          "Substitute x = −2 and x = 3. Be careful with −3 × (−2).",
        ],
        strategy: "Consider extremes",
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
        question: "A straight line has gradient −{{3/4}}. It passes through the points (−2, 5) and (6, k). Find k.",
        answer: { type: "number", value: -1, display: "−1" },
        traps: [
          {
            spec: { type: "number", value: 11 },
            feedback: "The gradient is negative, so the line goes *down* as x increases: k = 5 − 6, not 5 + 6.",
          },
          { spec: { type: "number", value: -6 }, feedback: "−6 is the change in y from (−2, 5) to (6, k). Add it to the starting y-value, 5." },
        ],
        solution: [
          "The run from x = −2 to x = 6 is 6 − (−2) = 8.",
          "Change in y = gradient × run = −{{3/4}} × 8 = −6.",
          "So k = 5 + (−6) = −1.",
          "Check: {{(-1 - 5)/(6 - (-2)) = (-6)/8 = -3/4}}. ✓",
        ],
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "How far across is it from x = −2 to x = 6?",
          "A gradient of −{{3/4}} means y goes down 3 for every 4 across. How far down over the whole run?",
          "Start at y = 5 and apply that change.",
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
          "These points all lie on one straight line. Notice that the x-values do **not** go up in equal steps.\n\n| x | −3 | 1 | 3 | p |\n|---|---|---|---|---|\n| y | 13 | 1 | −5 | −26 |\n\nFind the equation of the line, and hence find the value of p.",
        answer: { type: "number", value: 10, display: "p = 10" },
        traps: [
          { spec: { type: "number", value: -10 }, feedback: "Check the sign: −3p = −30 gives p = +10. Substitute back: −3 × 10 + 4 = −26. ✓" },
          { spec: { type: "number", value: 5 }, feedback: "The x-values don't go up in equal steps, so you can't just continue the table one column at a time. Find the equation first." },
        ],
        solution: [
          "Gradient from (−3, 13) and (1, 1): {{(1 - 13)/(1 - (-3)) = (-12)/4 = -3}}.",
          "Substitute (1, 1) into y = −3x + c: 1 = −3 + c, so c = 4. The line is y = −3x + 4.",
          "Check (3, −5): −3 × 3 + 4 = −5. ✓",
          "Now −26 = −3p + 4, so −3p = −30 and p = 10.",
        ],
        solutions: [
          {
            label: "Steps of the gradient",
            steps: [
              "y goes down 3 for every 1 across.",
              "From y = −5 down to y = −26 is a drop of 21, which needs 21 ÷ 3 = 7 more across.",
              "p = 3 + 7 = 10.",
            ],
          },
        ],
        difficulty: "core",
        guideRef: "line-through-two-points",
        hints: [
          "Use two of the complete columns to find the gradient — divide the change in y by the change in x.",
          "Substitute one point to find c, then check with the third point.",
          "Put y = −26 into your equation and solve for p.",
        ],
        strategy: "Work backwards",
      },
      // ---------------------------------------------------------------- q15
      {
        kind: "short",
        id: "linear-graphs-p4-q15",
        question:
          "The line y = 12 − 3x crosses the x-axis at A and the y-axis at B. Find the coordinates of the midpoint of AB. Give your answer as (x, y).",
        answer: { type: "list", values: [2, 6], ordered: true, display: "(2, 6)" },
        traps: [
          {
            spec: { type: "list", values: [4, 12], ordered: true },
            feedback: "(4, 12) puts the two intercepts together but isn't halfway. A is (4, 0) and B is (0, 12): average their coordinates.",
          },
          {
            spec: { type: "list", values: [-2, 6], ordered: true },
            feedback: "Check A: on the x-axis y = 0, so 0 = 12 − 3x, giving 3x = 12 and x = +4.",
          },
        ],
        solution: [
          "On the x-axis, y = 0: 0 = 12 − 3x, so 3x = 12 and x = 4. A is (4, 0).",
          "On the y-axis, x = 0: y = 12 − 0 = 12. B is (0, 12).",
          "Midpoint of AB: {{((4 + 0)/2, (0 + 12)/2)}} = (2, 6).",
          "Check: (2, 6) is on the line too, since 12 − 3 × 2 = 6. ✓",
        ],
        difficulty: "core",
        guideRef: "plotting-lines",
        hints: [
          "What is y for every point on the x-axis? What is x for every point on the y-axis?",
          "Substitute to find A and B.",
          "Then average the coordinates of A and B.",
        ],
        strategy: "Work in stages",
      },
      // ---------------------------------------------------------------- q16
      {
        kind: "written",
        id: "linear-graphs-p4-q16",
        question:
          "Ravi says:\n\n> \"The line y = −4x + 1 is less steep than the line y = 2x + 7, because −4 is less than 2.\"\n\nIs Ravi right? Explain your answer.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong — the line y = −4x + 1 is **steeper**.\n\nSteepness depends on the *size* of the gradient, ignoring its sign. On y = −4x + 1, y changes by 4 for every 1 across; on y = 2x + 7, y changes by only 2 for every 1 across. Since 4 > 2, the first line is steeper.\n\nThe minus sign only tells you the direction: y = −4x + 1 slopes **downwards** from left to right, while y = 2x + 7 slopes upwards. (The intercepts, 1 and 7, have nothing to do with steepness.)",
        markScheme: [
          { point: "Ravi is wrong: y = −4x + 1 is steeper", keywords: ["wrong", "no", "steeper", "not right"] },
          {
            point: "Steepness is the size of the gradient (ignore the sign): 4 > 2, or y changes by 4 per 1 across compared with 2",
            keywords: ["size", "4 > 2", "ignore the sign", "4 for every", "magnitude", "bigger number", "4 is bigger"],
          },
          {
            point: "The negative sign shows direction: it slopes downwards (left to right)",
            keywords: ["down", "downwards", "direction", "negative means", "slopes down", "decreas"],
          },
        ],
        commonError: "Treating 'less steep' as 'smaller gradient'. A gradient of −4 is steeper than a gradient of 2 — it just goes the other way.",
        difficulty: "core",
        guideRef: "gradient-intercept",
        hints: [
          "Sketch both lines. For each 1 step across, how far does each line go up or down?",
          "Which is the bigger change: 4 down or 2 up?",
          "What does the minus sign in −4 tell you about the line?",
        ],
        strategy: "Draw a diagram",
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
          "A straight line passes through (1, 2) and has gradient m. It also passes through the point (m, 8). Find both possible values of m.",
        answer: { type: "list", values: [3, -2], display: "m = 3 or m = −2" },
        traps: [
          {
            spec: { type: "list", values: [3, 2] },
            feedback: "m = 3 works, but m = 2 doesn't: then m(m − 1) = 2 × 1 = 2, not 6. Look for a *negative* value of m too.",
          },
        ],
        solution: [
          "The gradient between (1, 2) and (m, 8) must equal m: {{(8 - 2)/(m - 1) = m}}.",
          "Multiply both sides by m − 1: 6 = m(m − 1).",
          "So m and m − 1 are two numbers, one bigger than the other by 1, that multiply to 6.",
          "3 × 2 = 6 gives m = 3. And (−2) × (−3) = 6 gives m = −2.",
          "Check m = 3: the line is y = 3x − 1, and at x = 3, y = 8. ✓ Check m = −2: the line is y = −2x + 4, and at x = −2, y = 8. ✓",
        ],
        commonError: "Stopping at m = 3. Two negative numbers can also multiply to 6.",
        difficulty: "challenge",
        guideRef: "line-through-two-points",
        hints: [
          "Write the gradient between (1, 2) and (m, 8) as a fraction. It must equal m.",
          "Rearrange to get m(m − 1) = 6. Which two numbers, 1 apart, multiply to 6?",
          "Don't forget negative numbers: can two negative numbers that are 1 apart multiply to 6?",
        ],
        strategy: "Try small cases",
      },
      // ---------------------------------------------------------------- q19
      {
        kind: "written",
        id: "linear-graphs-p4-q19",
        question:
          "A(1, 2) and B(4, 3) are two neighbouring corners of a square (so AB is one side of the square).\n\nThere are **two** different squares like this. Find the other two corners of each square, and explain your method.",
        marks: 4,
        modelAnswer:
          "From A to B the step is 3 right and 1 up. The next side of a square is the same length and turns through 90°. Turning the step '3 right, 1 up' through 90° gives either '1 left, 3 up' or '1 right, 3 down'.\n\n**Square 1** (turning anticlockwise): from B go 1 left, 3 up to C(3, 6); from A go 1 left, 3 up to D(0, 5). The corners are A(1, 2), B(4, 3), **C(3, 6)**, **D(0, 5)**.\n\n**Square 2** (turning clockwise): from B go 1 right, 3 down to (5, 0); from A go 1 right, 3 down to (2, −1). The corners are A(1, 2), B(4, 3), **(5, 0)**, **(2, −1)**.\n\nThere are two squares because the square can sit on either side of AB.\n\nCheck square 1: the diagonals AC and BD both have midpoint (2, 4). Check square 2: the diagonals from A to (5, 0) and from B to (2, −1) both have midpoint (3, 1). (Every side is a step of 3 and 1 in some direction, so all four sides are equal.)",
        markScheme: [
          { point: "Square 1: (3, 6) and (0, 5)", keywords: ["(3, 6)", "(3,6)", "(0, 5)", "(0,5)", "3, 6", "0, 5"] },
          { point: "Square 2: (5, 0) and (2, −1)", keywords: ["(5, 0)", "(5,0)", "(2, -1)", "(2, −1)", "(2,-1)", "5, 0", "2, -1", "2, −1"] },
          {
            point: "Method: step from A to B is 3 right, 1 up; the next side is that step turned through 90° (1 left 3 up, or 1 right 3 down)",
            keywords: ["3 right", "1 up", "1 left", "3 up", "1 right", "3 down", "90", "turn", "rotate", "step"],
          },
          {
            point: "Explains there are two squares (one on each side of AB), with a check such as diagonals sharing a midpoint or equal sides",
            keywords: ["each side", "either side", "both sides", "two squares", "midpoint", "diagonal", "check"],
          },
        ],
        commonError: "Drawing a 'square' with sides 3 right and 3 up — a tilted side has to be turned through 90°, not copied.",
        difficulty: "challenge",
        guideRef: "coordinates-midpoints",
        hints: [
          "Plot A and B on squared paper. What step takes you from A to B?",
          "The next side of the square must be the same length and at 90°. Turn your step '3 right, 1 up' through a quarter turn — what step do you get?",
          "There are two ways to turn: a quarter turn anticlockwise or clockwise. Each gives a different square. Check each with the midpoints of the diagonals.",
        ],
        strategy: "Draw a diagram",
      },
      // ---------------------------------------------------------------- q20
      {
        kind: "short",
        id: "linear-graphs-p4-q20",
        question:
          "A tank is made of two cuboids, one on top of the other. The bottom part has a base of area 100 cm² and is 10 cm tall. The top part is narrower: its base has area 25 cm² and it is 8 cm tall. Water is poured in at a steady 50 cm³ per second.\n\nThe graph of depth of water against time is made of two straight sections. Find the depth of the water after 22 seconds, in cm.",
        diagram: `<svg viewBox="0 0 330 280" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Front view of a tank made of two cuboids. The bottom part is wide, 10 cm tall, with base area 100 cm squared. On top of it, centred, is a narrower part 8 cm tall with base area 25 cm squared. An arrow shows water pouring in at 50 cm cubed per second."><rect x="0" y="0" width="330" height="280" fill="#ffffff"/><rect x="40" y="140" width="110" height="110" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><rect x="67.5" y="52" width="55" height="88" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><line x1="69.5" y1="140" x2="120.5" y2="140" stroke="#ffffff" stroke-width="3"/><line x1="69.5" y1="52" x2="120.5" y2="52" stroke="#ffffff" stroke-width="3"/><line x1="164" y1="250" x2="164" y2="140" stroke="#334155" stroke-width="1.2"/><text x="170" y="199" font-size="12" font-family="sans-serif" fill="#334155">10 cm</text><line x1="136.5" y1="140" x2="136.5" y2="52" stroke="#334155" stroke-width="1.2"/><text x="142.5" y="100" font-size="12" font-family="sans-serif" fill="#334155">8 cm</text><text x="95" y="199" font-size="12" text-anchor="middle" font-family="sans-serif" fill="#1f2937">base 100 cm²</text><text x="95" y="92" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#1f2937">base</text><text x="95" y="106" font-size="11" text-anchor="middle" font-family="sans-serif" fill="#1f2937">25 cm²</text><line x1="95" y1="6" x2="95" y2="44" stroke="#2563eb" stroke-width="2.5"/><polygon points="89,40 101,40 95,50" fill="#2563eb"/><text x="105" y="20" font-size="12" font-family="sans-serif" fill="#334155">water in: 50 cm³ per second</text></svg>`,
        answer: { type: "number", value: 14, display: "14 cm" },
        traps: [
          {
            spec: { type: "number", value: 11 },
            feedback: "You used the bottom part's rate (0.5 cm per second) all the way. Once the bottom is full, the water rises in the narrow part — much faster.",
          },
          {
            spec: { type: "number", value: 44 },
            feedback: "You used the top part's rate (2 cm per second) all the way — and the tank is only 18 cm tall! The bottom part fills first, more slowly.",
          },
        ],
        solution: [
          "Bottom part: each second, 50 cm³ spreads over 100 cm², so the depth rises 50 ÷ 100 = 0.5 cm per second.",
          "The bottom part is 10 cm tall, so it is full after 10 ÷ 0.5 = 20 seconds. (Check: its volume is 100 × 10 = 1000 cm³, and 1000 ÷ 50 = 20.)",
          "Top part: 50 cm³ spreads over only 25 cm², so the depth rises 50 ÷ 25 = 2 cm per second — the graph gets 4 times steeper.",
          "After 22 seconds: 2 seconds in the top part, so the depth is 10 + 2 × 2 = 14 cm.",
        ],
        commonError: "Using one rate for the whole tank. The graph changes gradient where the tank changes width.",
        difficulty: "challenge",
        guideRef: "real-life-graphs",
        hints: [
          "In the bottom part, how many cm does the depth rise each second? (Think: 50 cm³ spread over a base of 100 cm².)",
          "When does the bottom part become full?",
          "After that, the water rises in the narrow part. How fast does the depth rise there, and for how many more seconds?",
        ],
        strategy: "Split into cases",
      },
    ],
  },
];
