import type { TopicGuide } from "../../types.ts";

export const guide: TopicGuide = {
  id: "transformations-pythagoras",
  title: "Transformations & Symmetry",
  strand: "Geometry & Measure",
  icon: "🔄",
  summary: "Slide, flip, turn and scale shapes — then describe every move precisely.",
  intro:
    "Every transformation answers one question: where does each point go? Translations slide, reflections flip, rotations turn and enlargements resize — once you can track a single point, you can move any shape and describe the move exactly. Along the way you'll meet symmetry, the difference between congruent and similar shapes and, as a stretch, Pythagoras' theorem.",
  guide: [
    // ------------------------------------------------------------------ 1
    {
      id: "symmetry",
      heading: "Line & rotational symmetry",
      discovery: {
        problem:
          "Write the capital letters A, E, H, I, M, N, O, S, W and Z in a plain font. Which of them look exactly the same after a half-turn (turn the page upside down)? Then explain why the word SWIMS still reads SWIMS upside down — and find another word that does.",
        idea:
          "H, I, N, O, S and Z survive a half-turn: they have **rotational symmetry of order 2**. W and M turn into each other, so SWIMS upside down still reads S-W-I-M-S (the order of the letters reverses, and the W and M swap). NOON works too. A, E, M and W have a different kind of symmetry — a mirror line — but they look wrong after a half-turn.",
      },
      body:
        "A shape has **line symmetry** (also called reflective symmetry) if a line divides it into two halves that are mirror images of each other. Fold along this **line of symmetry** and the halves match exactly.\n\nA shape has **rotational symmetry** if it fits exactly onto its own outline after a turn of less than 360° about its centre. The **order of rotational symmetry** is the number of positions in one full turn where the shape fits its outline. Every shape fits once per full turn, so a shape with *no* rotational symmetry has **order 1**.\n\n- **Counting lines:** imagine folding, or stand a mirror on the line. Check diagonals carefully — they work for a square but not for a rectangle.\n- **Finding the order:** trace the shape, hold the centre with a pencil point, turn the tracing paper and count how many times it fits before you are back at the start.\n- If the order is n, the smallest turn that works is {{360/n}}°.\n\n| Shape | Lines of symmetry | Order of rotational symmetry |\n|---|---|---|\n| Square | 4 | 4 |\n| Rectangle | 2 | 2 |\n| Rhombus | 2 | 2 |\n| Parallelogram | 0 | 2 |\n| Kite | 1 | 1 |\n| Isosceles trapezium | 1 | 1 |\n| Equilateral triangle | 3 | 3 |\n| Regular polygon with n sides | n | n |",
      diagram: `<svg viewBox="0 0 480 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An equilateral triangle with three dashed lines of symmetry, a rectangle with two, and a parallelogram with none; each has a dot at its centre of rotation"><rect x="0" y="0" width="480" height="220" fill="#ffffff"/><line x1="120" y1="22" x2="150" y2="22" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><text x="156" y="26" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="start" font-weight="normal">line of symmetry</text><circle cx="292" cy="22" r="3.5" fill="#1f2937"/><text x="300" y="26" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="start" font-weight="normal">centre of rotation</text><polygon points="80,50 133.7,143 26.3,143" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><line x1="80" y1="40" x2="80" y2="155" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><line x1="142.4" y1="148" x2="42.8" y2="90.5" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><line x1="17.6" y1="148" x2="117.2" y2="90.5" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><circle cx="80" cy="112" r="3.5" fill="#1f2937"/><rect x="190" y="82" width="100" height="60" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><line x1="240" y1="70" x2="240" y2="154" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><line x1="178" y1="112" x2="302" y2="112" stroke="#2563eb" stroke-width="1.8" stroke-dasharray="6 4"/><circle cx="240" cy="112" r="3.5" fill="#1f2937"/><polygon points="352,142 442,142 468,82 378,82" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><circle cx="410" cy="112" r="3.5" fill="#1f2937"/><text x="80" y="178" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">Equilateral triangle</text><text x="80" y="198" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">3 lines · order 3</text><text x="240" y="178" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">Rectangle</text><text x="240" y="198" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">2 lines · order 2</text><text x="410" y="178" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">Parallelogram</text><text x="410" y="198" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">0 lines · order 2</text></svg>`,
      diagramCaption:
        "Dashed lines are lines of symmetry; the dot is the centre of rotation. The parallelogram has no line of symmetry, but it still fits onto itself after a half-turn.",
      workedExamples: [
        {
          title: "A regular polygon",
          problem:
            "How many lines of symmetry does a regular hexagon have? What is its order of rotational symmetry, and what is the smallest angle you can turn it through so that it fits onto itself?",
          steps: [
            "Lines through opposite vertices (corners): 6 vertices make 3 such lines.",
            "Lines through the midpoints of opposite sides: 6 sides make 3 more lines.",
            "Total: 3 + 3 = 6 lines of symmetry.",
            "Turning: any vertex can be moved onto any of the 6 vertex positions, so the order is 6.",
            "Smallest turn: {{360/6}} = 60°.",
          ],
          answer: "6 lines of symmetry, rotational symmetry of order 6, smallest turn 60°.",
          yourTurn: {
            question: "Your turn: how many lines of symmetry does a regular octagon have?",
            answer: { type: "number", value: 8 },
            solution:
              "4 lines join opposite vertices and 4 lines join the midpoints of opposite sides: 8 lines. (Its order of rotational symmetry is 8 too.)",
          },
        },
        {
          title: "Letters with both kinds of symmetry",
          problem:
            "In a plain capital font, give the number of lines of symmetry and the order of rotational symmetry of H, N, T, E and Z.",
          steps: [
            "H: a vertical and a horizontal line of symmetry. Upside down it is still H, so order 2.",
            "N: no line of symmetry (fold it and the slanted stroke goes the wrong way). A half-turn maps it onto itself, so order 2.",
            "T: one vertical line. Upside down it looks like ⊥, so order 1.",
            "E: one horizontal line. Order 1.",
            "Z: no line of symmetry, but order 2.",
          ],
          answer: "H: 2 lines, order 2 · N: 0 lines, order 2 · T: 1 line, order 1 · E: 1 line, order 1 · Z: 0 lines, order 2.",
        },
        {
          title: "Working backwards from the angle",
          problem:
            "A hubcap design fits onto itself when it is turned through 40°, and 40° is the smallest turn that works. What is its order of rotational symmetry?",
          steps: [
            "The smallest turn × the order = one full turn = 360°.",
            "So the order is 360 ÷ 40 = 9.",
            "Check: 9 turns of 40° make 360°, back to the start ✓.",
          ],
          answer: "Order 9.",
        },
      ],
      keyPoints: [
        "Line symmetry: fold so the two halves match. Rotational symmetry: turn so the shape fits its outline.",
        "The order of rotational symmetry counts the fits in one full turn; no rotational symmetry means order 1.",
        "A regular polygon with n sides has n lines of symmetry and rotational symmetry of order n.",
        "For order n, the smallest turn that works is {{360/n}}°.",
      ],
      whyItWorks:
        "Why does a regular n-sided polygon have order n? Number the vertices 1 to n. Any turn that fits the polygon onto itself must send vertex 1 to one of the vertex positions — there are exactly n choices, giving the turns {{360/n}}°, twice that, … up to 360°. The same kind of counting gives n lines of symmetry: every mirror line passes through the centre and through two of the 2n special points (the n vertices and the n midpoints of sides), and each special point lies on exactly one mirror line, so there are {{(2n)/2}} = n lines.",
      strategies: ["Use symmetry", "Draw a diagram (tracing paper)", "Work backwards"],
      thinkDeeper:
        "Can a shape have exactly 2 lines of symmetry but rotational symmetry of order 4? What about exactly 2 lines and order 1? Experiment with sketches, then explain what having two lines of symmetry forces on a shape's rotational symmetry.",
    },
    // ------------------------------------------------------------------ 2
    {
      id: "translation",
      heading: "Translations & vectors",
      discovery: {
        problem:
          "A delivery robot on a grid follows two instructions: 'move 3 right and 2 up', then 'move 1 left and 5 down'. Where does it finish compared with where it started? Could one instruction have done the same job? Which single instruction would send it straight back home?",
        idea:
          "Overall it moves 3 − 1 = 2 to the right and 2 − 5 = −3 up, which means 3 down. One instruction does it: '2 right, 3 down'. To get home it reverses both parts: '2 left, 3 up'. Moves like these are **vectors**: you add them part by part, and you undo one by changing both signs.",
      },
      body:
        "A **translation** slides every point of a shape the same distance in the same direction. Nothing turns, flips or changes size, so the **image** (the new shape) is **congruent** to the **object** (the original shape) and faces the same way.\n\nA translation is described by a **column vector**: two numbers stacked inside tall brackets. The **top** number is the move across (positive = right, negative = left). The **bottom** number is the move up or down (positive = up, negative = down). Numbers can't be stacked in a line of text, so this guide writes a column vector as **(top over bottom)** — the diagram shows how it looks on paper.\n\n| Column vector | Meaning |\n|---|---|\n| (5 over −2) | 5 right, 2 down |\n| (−3 over 4) | 3 left, 4 up |\n| (0 over −6) | 6 down, no sideways move |\n\n**To translate a shape:** move each vertex (corner) by the vector, then join the new vertices in the same order.\n\n**To describe a translation:** choose a vertex on the object and the matching vertex on the image. Count across first, then up or down. Check with a second vertex.\n\n**Undoing and combining:** the reverse of (a over b) is (−a over −b). Translating by (a over b) and then by (c over d) is the same as one translation by ((a + c) over (b + d)).",
      diagram: `<svg viewBox="0 0 480 232" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid showing triangle A with vertices (1, 3), (3, 3), (1, 5) translated 5 right and 2 down to triangle B with vertices (6, 1), (8, 1), (6, 3), next to the column vector with 5 on top and minus 2 underneath"><rect x="0" y="0" width="480" height="232" fill="#ffffff"/><line x1="30" y1="202" x2="30" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="60" y1="202" x2="60" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="90" y1="202" x2="90" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="120" y1="202" x2="120" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="150" y1="202" x2="150" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="180" y1="202" x2="180" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="210" y1="202" x2="210" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="240" y1="202" x2="240" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="270" y1="202" x2="270" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="300" y1="202" x2="300" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="330" y1="202" x2="330" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="202" x2="330" y2="202" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="172" x2="330" y2="172" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="142" x2="330" y2="142" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="112" x2="330" y2="112" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="82" x2="330" y2="82" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="52" x2="330" y2="52" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="22" x2="330" y2="22" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="202" x2="330" y2="202" stroke="#334155" stroke-width="1.5"/><line x1="30" y1="202" x2="30" y2="22" stroke="#334155" stroke-width="1.5"/><text x="335" y="199" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="30" y="17" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="60" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="90" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="120" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="150" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="180" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="210" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="240" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="270" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="300" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">9</text><text x="330" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">10</text><text x="26" y="176" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="26" y="146" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="26" y="116" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="26" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="26" y="56" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="26" y="26" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="26" y="215" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><polygon points="60,112 120,112 60,52" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="210,172 270,172 210,112" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="80" y="97" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="230" y="157" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><line x1="60" y1="52" x2="202" y2="52" stroke="#1d4ed8" stroke-width="2"/><polygon points="210,52 202,56 202,48" fill="#1d4ed8"/><line x1="210" y1="52" x2="210" y2="104" stroke="#1d4ed8" stroke-width="2"/><polygon points="210,112 206,104 214,104" fill="#1d4ed8"/><text x="135" y="46" font-size="12" font-family="sans-serif" fill="#1d4ed8" text-anchor="middle" font-weight="bold">5 right</text><text x="216" y="86" font-size="12" font-family="sans-serif" fill="#1d4ed8" text-anchor="start" font-weight="bold">2 down</text><text x="415" y="70" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">column vector</text><path d="M 396 84 Q 384 114 396 144" fill="none" stroke="#1f2937" stroke-width="1.8"/><path d="M 434 84 Q 446 114 434 144" fill="none" stroke="#1f2937" stroke-width="1.8"/><text x="415" y="108" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">5</text><text x="415" y="136" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">−2</text><text x="415" y="168" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">top: 5 right</text><text x="415" y="186" font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">bottom: 2 down</text></svg>`,
      diagramCaption:
        "Triangle A is translated by the column vector (5 over −2) to give triangle B: every vertex moves 5 right and 2 down.",
      workedExamples: [
        {
          title: "Translating a shape",
          problem: "Triangle A has vertices (1, 3), (3, 3) and (1, 5). Translate it by the column vector (5 over −2).",
          steps: [
            "Top number 5: add 5 to every x-coordinate.",
            "Bottom number −2: subtract 2 from every y-coordinate.",
            "(1, 3) → (6, 1); (3, 3) → (8, 1); (1, 5) → (6, 3).",
            "Join the new vertices in the same order. The image has the same size, shape and orientation as A.",
          ],
          answer: "The image (triangle B in the diagram) has vertices (6, 1), (8, 1) and (6, 3).",
          yourTurn: {
            question:
              "Your turn: the point (−2, 4) is translated by the column vector (3 over −5). Give the coordinates of its image.",
            answer: { type: "list", values: [1, -1], ordered: true, display: "(1, −1)" },
            solution: "x: −2 + 3 = 1. y: 4 + (−5) = −1. The image is (1, −1).",
          },
        },
        {
          title: "Describing a translation",
          problem:
            "A vertex of shape P is at (4, −1). After a translation, the matching vertex of the image Q is at (−2, 3). Describe the translation, and give the translation that maps Q back onto P.",
          steps: [
            "Across: −2 − 4 = −6, so 6 left.",
            "Up or down: 3 − (−1) = 4, so 4 up.",
            "The translation is the column vector (−6 over 4).",
            "To undo it, change both signs: (6 over −4).",
          ],
          answer: "Translation by (−6 over 4); the reverse is (6 over −4).",
        },
        {
          title: "Combining translations",
          problem:
            "Ethan translates a shape by (2 over 5), then translates the image by (−7 over −1). Siti says one translation could have done both. Find it.",
          steps: [
            "Add the top numbers: 2 + (−7) = −5.",
            "Add the bottom numbers: 5 + (−1) = 4.",
            "The single translation is (−5 over 4): 5 left and 4 up.",
          ],
          answer: "(−5 over 4)",
        },
      ],
      keyPoints: [
        "Column vector: top = right (+) or left (−); bottom = up (+) or down (−).",
        "A translation keeps size, shape and orientation, so the image is congruent to the object.",
        "To find the vector, subtract: image coordinate − object coordinate, for x and then for y.",
        "Reverse a translation by changing both signs; combine translations by adding the parts.",
      ],
      whyItWorks:
        "A translation adds the same vector to every point. Take any two points of the object: both move by exactly the same amount, so the gap between them — its length *and* its direction — is unchanged. That is why every side keeps its length, every angle stays the same, and the image can't end up flipped or turned: every side still points in exactly the same direction as before.",
      strategies: ["Track one point", "Use the inverse", "Check with a second vertex"],
      thinkDeeper:
        "Start at (0, 0). You may use the translations (2 over 1) and (−1 over 3), and their reverses, as many times as you like in any order. Can you reach (7, 0)? Can you reach (1, 1)? How would you convince someone that a point is impossible to reach?",
    },
    // ------------------------------------------------------------------ 3
    {
      id: "reflection",
      heading: "Reflections",
      discovery: {
        problem:
          "Reflect the points (3, 1), (5, 2) and (−1, 4) in the diagonal mirror line y = x (the line through (0, 0), (1, 1), (2, 2), …). Count squares diagonally, at right angles to the mirror, if you need to. What happens to the coordinates every time — and why might that be?",
        idea:
          "(3, 1) → (1, 3), (5, 2) → (2, 5) and (−1, 4) → (4, −1): the coordinates **swap**. The mirror y = x is made of exactly the points whose x and y are equal, and flipping across it swaps the roles of x and y.",
      },
      body:
        "A **reflection** flips a shape over a **mirror line**. Each point and its image are the same perpendicular distance from the mirror, on opposite sides, and the segment joining them crosses the mirror at 90°. Points on the mirror line don't move. The image is congruent to the object but **reversed**, like a left hand becoming a right hand.\n\nMirror lines on a grid are named by their equations:\n- **x = a** is a **vertical** line: every point on it has x-coordinate a. The y-axis is x = 0.\n- **y = b** is a **horizontal** line: every point on it has y-coordinate b. The x-axis is y = 0.\n- **y = x** is the diagonal through the origin sloping up to the right; **y = −x** slopes down to the right.\n\n| Mirror line | (x, y) maps to |\n|---|---|\n| x-axis (y = 0) | (x, −y) |\n| y-axis (x = 0) | (−x, y) |\n| x = a | (2a − x, y) |\n| y = b | (x, 2b − y) |\n| y = x | (y, x) |\n| y = −x | (−y, −x) |\n\nYou don't need to memorise the table. For a vertical or horizontal mirror, count the squares from the point to the line, then count the same number on the other side. For a diagonal mirror, count diagonally through the corners of squares, or use the swap rules.\n\n**Finding the mirror line:** join a point to its image and find the midpoint. Do this for two pairs of points. The mirror line passes through both midpoints — it is the **perpendicular bisector** of every object–image segment.",
      diagram: `<svg viewBox="0 0 300 264" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid showing triangle A with vertices (3, 1), (5, 1), (5, 2) reflected in the dashed line y = x to triangle A prime with vertices (1, 3), (1, 5), (2, 5); a dotted segment joins (5, 1) to (1, 5) and meets the mirror at a right angle at (3, 3)"><rect x="0" y="0" width="300" height="264" fill="#ffffff"/><line x1="34" y1="242" x2="34" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="66" y1="242" x2="66" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="98" y1="242" x2="98" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="130" y1="242" x2="130" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="162" y1="242" x2="162" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="194" y1="242" x2="194" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="226" y1="242" x2="226" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="258" y1="242" x2="258" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="242" x2="258" y2="242" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="210" x2="258" y2="210" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="178" x2="258" y2="178" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="146" x2="258" y2="146" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="114" x2="258" y2="114" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="82" x2="258" y2="82" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="50" x2="258" y2="50" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="18" x2="258" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="34" y1="210" x2="258" y2="210" stroke="#334155" stroke-width="1.5"/><line x1="66" y1="242" x2="66" y2="18" stroke="#334155" stroke-width="1.5"/><text x="263" y="207" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="66" y="13" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="34" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="98" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="130" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="162" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="194" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="226" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="258" y="223" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="62" y="246" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="62" y="182" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="62" y="150" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="62" y="118" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="62" y="86" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="62" y="54" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="62" y="22" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><line x1="34" y1="242" x2="258" y2="18" stroke="#2563eb" stroke-width="2" stroke-dasharray="7 4"/><text x="197.2" y="38.8" font-size="13" font-family="sans-serif" fill="#1d4ed8" text-anchor="middle" font-weight="bold">y = x</text><line x1="226" y1="178" x2="98" y2="50" stroke="#475569" stroke-width="1.5" stroke-dasharray="2 3"/><polygon points="162,178 226,178 226,146" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="98,114 98,50 130,50" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polyline points="168.3,107.7 162,101.3 155.7,107.7" fill="none" stroke="#1f2937" stroke-width="1.2"/><text x="204.7" y="172.3" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="108.7" y="76.3" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A′</text><text x="230" y="193" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">(5, 1)</text><text x="98" y="43" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">(1, 5)</text></svg>`,
      diagramCaption:
        "Triangle A reflected in y = x gives A′. The dotted segment from (5, 1) to its image (1, 5) meets the mirror at a right angle at (3, 3), exactly halfway along.",
      workedExamples: [
        {
          title: "Reflecting in a vertical line",
          problem: "Triangle T has vertices (1, 1), (3, 1) and (1, 4). Reflect it in the line x = 4.",
          steps: [
            "x = 4 is a vertical line through (4, 0), so the y-coordinates don't change.",
            "(1, 1) is 3 squares left of the line, so its image is 3 squares right of it: (7, 1).",
            "(3, 1) is 1 square left of the line, so its image is (5, 1).",
            "(1, 4) is 3 squares left, so its image is (7, 4).",
            "Check with the rule x → 2 × 4 − x = 8 − x: 8 − 1 = 7 ✓ and 8 − 3 = 5 ✓.",
          ],
          answer: "The image has vertices (7, 1), (5, 1) and (7, 4).",
          yourTurn: {
            question: "Your turn: reflect the point (6, 2) in the line x = 3. Give the coordinates of the image.",
            answer: { type: "list", values: [0, 2], ordered: true, display: "(0, 2)" },
            solution: "(6, 2) is 3 squares right of x = 3, so the image is 3 squares left of it: (0, 2). Rule check: 2 × 3 − 6 = 0.",
          },
        },
        {
          title: "Reflecting in y = −x",
          problem: "Reflect the triangle with vertices (1, 2), (4, 2) and (4, 3) in the line y = −x.",
          steps: [
            "The rule for y = −x is (x, y) → (−y, −x): swap the coordinates, then change both signs.",
            "(1, 2) → (−2, −1).",
            "(4, 2) → (−2, −4).",
            "(4, 3) → (−3, −4).",
            "Check one pair: the midpoint of (1, 2) and (−2, −1) is (−0.5, 0.5), and 0.5 = −(−0.5), so the midpoint lies on y = −x ✓.",
          ],
          answer: "The image has vertices (−2, −1), (−2, −4) and (−3, −4).",
        },
        {
          title: "Finding the mirror line",
          problem:
            "Shape P is reflected to give shape Q. Vertex (2, 5) of P maps to (2, −1) on Q, and vertex (6, 4) maps to (6, 0). Find the equation of the mirror line.",
          steps: [
            "Midpoint of (2, 5) and (2, −1): ({{(2 + 2)/2}}, {{(5 + (-1))/2}}) = (2, 2).",
            "Midpoint of (6, 4) and (6, 0): (6, 2).",
            "Both midpoints have y-coordinate 2, so the mirror is the horizontal line through them.",
            "Check: (2, 5) is 3 above y = 2 and (2, −1) is 3 below it ✓.",
          ],
          answer: "y = 2",
        },
      ],
      keyPoints: [
        "Object and image are the same distance from the mirror, on opposite sides, joined by a segment at 90° to it.",
        "x = a is a vertical line; y = b is a horizontal line.",
        "Reflecting in y = x swaps the coordinates; in y = −x it swaps them and changes both signs.",
        "The mirror line passes through the midpoint of every object–image pair.",
      ],
      whyItWorks:
        "Why does reflecting in y = x swap coordinates? Take a point (p, q) and its swapped partner (q, p). Their midpoint is ({{(p + q)/2}}, {{(p + q)/2}}), whose two coordinates are equal, so it lies on y = x. The step from (p, q) to (q, p) goes across q − p and up p − q — equal amounts in opposite directions, so it runs at 45° the other way, at right angles to the mirror. Same distance, opposite sides, perpendicular: exactly a reflection. The rule for x = a works the same way: the mirror sits halfway between the old x-coordinate and the new one, so the new one is 2a − x.",
      strategies: ["Count squares to the mirror", "Use midpoints", "Check by substituting"],
      thinkDeeper:
        "Reflect the point (5, 1) in the x-axis, then reflect that image in the line y = x. Where does it end up? Now do the two reflections in the opposite order. Do you land in the same place? Which single transformation could replace each pair?",
    },
    // ------------------------------------------------------------------ 4
    {
      id: "rotation",
      heading: "Rotations",
      discovery: {
        problem:
          "Hold a pencil point on the origin O and imagine an arm from O to P(4, 1). Turn the arm a quarter-turn (90°) anticlockwise, keeping its length the same. Where does P land? Do the same for Q(2, 3). Can you predict where any point (x, y) lands?",
        idea:
          "P(4, 1) → (−1, 4) and Q(2, 3) → (−3, 2). The step 'across 4, up 1' becomes 'up 4, left 1'. In general a 90° anticlockwise turn about O sends (x, y) → (−y, x): the coordinates swap and the new first coordinate changes sign.",
      },
      body:
        "A **rotation** turns a shape about a fixed point called the **centre of rotation**. To describe one you need three things: the **centre**, the **angle** and the **direction** (clockwise, the way clock hands move, or anticlockwise). Every point stays the same distance from the centre, so the image is congruent to the object. A half-turn (180°) needs no direction, because both ways land in the same place.\n\n**Rotating with tracing paper:** trace the shape and mark the centre. Hold the centre still with your pencil point, turn the paper through the angle (a quarter-turn for 90°) and mark where the vertices land.\n\n**Rules for turning about the origin** (handy for checking):\n| Rotation about (0, 0) | (x, y) maps to |\n|---|---|\n| 90° anticlockwise | (−y, x) |\n| 90° clockwise | (y, −x) |\n| 180° | (−x, −y) |\n\nA turn of 90° clockwise is the same as 270° anticlockwise.\n\n**About any other centre C:** find the step from C to the point (across, up), turn that step, then add it back on to C.\n\n**Finding the centre:** the centre is the same distance from a point and its image, so it lies on the perpendicular bisector of the segment joining them. For a half-turn this is even easier — the centre is the **midpoint** of any point and its image. For a quarter-turn, test likely points with tracing paper, or draw the perpendicular bisectors for two pairs of points and see where they cross.",
      diagram: `<svg viewBox="0 0 330 226" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid showing a triangle with vertices (1, 1), (4, 1), (1, 3) rotated 90 degrees anticlockwise about the origin O to a triangle with vertices (−1, 1), (−1, 4), (−3, 1); dashed arms from O to P(4, 1) and to P prime (−1, 4) with a 90 degree arc between them"><rect x="0" y="0" width="330" height="226" fill="#ffffff"/><line x1="30" y1="198" x2="30" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="60" y1="198" x2="60" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="90" y1="198" x2="90" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="120" y1="198" x2="120" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="150" y1="198" x2="150" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="180" y1="198" x2="180" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="210" y1="198" x2="210" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="240" y1="198" x2="240" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="270" y1="198" x2="270" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="300" y1="198" x2="300" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="198" x2="300" y2="198" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="168" x2="300" y2="168" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="138" x2="300" y2="138" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="108" x2="300" y2="108" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="78" x2="300" y2="78" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="48" x2="300" y2="48" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="18" x2="300" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="168" x2="300" y2="168" stroke="#334155" stroke-width="1.5"/><line x1="150" y1="198" x2="150" y2="18" stroke="#334155" stroke-width="1.5"/><text x="305" y="165" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="150" y="13" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="30" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="60" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="90" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="120" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="180" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="210" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="240" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="270" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="300" y="181" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="146" y="202" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="146" y="142" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="146" y="112" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="146" y="82" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="146" y="52" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="146" y="22" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><polygon points="180,138 270,138 180,78" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="120,138 120,48 60,138" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><line x1="150" y1="168" x2="270" y2="138" stroke="#b91c1c" stroke-width="1.8" stroke-dasharray="5 3"/><line x1="150" y1="168" x2="120" y2="48" stroke="#b91c1c" stroke-width="1.8" stroke-dasharray="5 3"/><path d="M 171.8 162.5 A 22.5 22.5 0 0 0 147.2 145.7" fill="none" stroke="#b91c1c" stroke-width="1.8"/><polygon points="144.5,146.2 150.5,141.1 152.2,147.9" fill="#b91c1c"/><text x="152.4" y="136.5" font-size="12" font-family="sans-serif" fill="#b91c1c" text-anchor="start" font-weight="bold">90°</text><circle cx="150" cy="168" r="3.5" fill="#1f2937"/><text x="156" y="182" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="start" font-weight="bold">O</text><text x="276" y="142" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="start" font-weight="normal">P(4, 1)</text><text x="120" y="40" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">P′(−1, 4)</text></svg>`,
      diagramCaption:
        "The triangle with vertices (1, 1), (4, 1) and (1, 3) is rotated 90° anticlockwise about O. The arm OP turns through 90° and keeps its length, so P(4, 1) lands on P′(−1, 4).",
      workedExamples: [
        {
          title: "A quarter-turn about the origin",
          problem: "Rotate the triangle with vertices (1, 1), (4, 1) and (1, 3) through 90° anticlockwise about the origin.",
          steps: [
            "Use the rule (x, y) → (−y, x).",
            "(1, 1) → (−1, 1).",
            "(4, 1) → (−1, 4).",
            "(1, 3) → (−3, 1).",
            "Sense check: the side from (1, 1) to (4, 1) pointed right. After an anticlockwise quarter-turn it should point up — and (−1, 1) to (−1, 4) does.",
          ],
          answer: "The image has vertices (−1, 1), (−1, 4) and (−3, 1).",
          yourTurn: {
            question: "Your turn: rotate the point (5, 2) through 90° anticlockwise about the origin. Give the coordinates of the image.",
            answer: { type: "list", values: [-2, 5], ordered: true, display: "(−2, 5)" },
            solution: "(x, y) → (−y, x), so (5, 2) → (−2, 5). Check: 'across 5, up 2' became 'up 5, left 2'.",
          },
        },
        {
          title: "A centre that isn't the origin",
          problem: "Rotate the point A(5, 2) through 90° clockwise about the centre C(2, 1).",
          steps: [
            "Step from C to A: across 5 − 2 = 3, up 2 − 1 = 1.",
            "Turn the step 90° clockwise using (x, y) → (y, −x): across 3, up 1 becomes across 1, up −3 (that is, 1 right and 3 down).",
            "Add the new step to C: (2 + 1, 1 − 3) = (3, −2).",
            "Check: the step '3 across, 1 up' and the step '1 across, 3 down' are the same length, so A′ is as far from C as A is ✓.",
          ],
          answer: "A′ = (3, −2)",
        },
        {
          title: "Finding the centre of a half-turn",
          problem:
            "Triangle P has vertices (1, 2), (3, 2) and (1, 3). A rotation of 180° maps it onto triangle Q with vertices (5, 4), (3, 4) and (5, 3). Find the centre of rotation.",
          steps: [
            "In a half-turn, the centre is exactly halfway between each point and its image.",
            "Midpoint of (1, 2) and (5, 4): ({{(1 + 5)/2}}, {{(2 + 4)/2}}) = (3, 3).",
            "Check with another pair: the midpoint of (3, 2) and (3, 4) is (3, 3) ✓.",
          ],
          answer: "A rotation of 180° about (3, 3).",
        },
      ],
      keyPoints: [
        "A rotation needs a centre, an angle and a direction (a half-turn needs no direction).",
        "About the origin: 90° anticlockwise (x, y) → (−y, x); 90° clockwise (x, y) → (y, −x); 180° (x, y) → (−x, −y).",
        "Every point keeps its distance from the centre, so the image is congruent.",
        "For a half-turn, the centre is the midpoint of any point and its image.",
      ],
      whyItWorks:
        "Picture the step from O to (x, y) as a staircase: x across, then y up — the two shorter sides of a right-angled triangle. Turn that whole triangle a quarter-turn anticlockwise. The 'across x' side now points up, so it becomes 'up x'; the 'up y' side now points left, so it becomes 'left y'. The far corner lands at (−y, x). Apply the rule twice and (x, y) → (−y, x) → (−x, −y), which is why two quarter-turns give the half-turn rule.",
      strategies: ["Use tracing paper", "Track one point", "Use midpoints"],
      thinkDeeper:
        "A shape is rotated 90° clockwise about (0, 0), then rotated 90° clockwise about (0, 0) again, then reflected in the y-axis. Which single transformation does the same job? Test your idea on the point (3, 1) before you decide.",
    },
    // ------------------------------------------------------------------ 5
    {
      id: "enlargement",
      heading: "Enlargements",
      discovery: {
        problem:
          "A small torch bulb shines on a cardboard square of side 5 cm, held 20 cm from the bulb and parallel to a wall. The wall is 60 cm from the bulb. How wide is the square's shadow? What if the wall were 100 cm from the bulb?",
        idea:
          "Light travels in straight lines from the bulb, so every distance from the bulb is stretched by the same factor. The wall is {{60/20}} = 3 times as far away as the card, so the shadow is 3 × 5 = 15 cm wide. At 100 cm the factor is 5, giving 25 cm. The shadow is an **enlargement** with the bulb as its **centre** and **scale factor** 3 (or 5).",
      },
      body:
        "An **enlargement** changes the size of a shape but not its shape. It needs two things: the **scale factor** (how many times longer every length becomes) and the **centre of enlargement** (the fixed point everything is measured from).\n\nFor an enlargement with scale factor k:\n- every length on the image is k times the matching length on the object;\n- every angle stays the same, so the image is **similar** to the object (same shape) — but it is not congruent unless k = 1;\n- every image point is k times as far from the centre as its object point, **along the same straight line** from the centre.\n\n**To enlarge from a centre C:** for each vertex, find the step from C (across, up), multiply both parts by k, and measure that new step from C. Join the image vertices.\n\n**Where the centre is matters.** If C is outside the shape, the image is pushed away from C. If C is a vertex of the shape, that vertex stays where it is. If C is inside the shape, the image surrounds the object.\n\n**To find the scale factor:** divide a length on the image by the matching length on the object.\n\n**To find the centre:** draw straight lines, called **ray lines**, through at least two pairs of matching vertices, from the image vertex through the object vertex and beyond. The point where the ray lines meet is the centre.\n\n**Stretch:** a scale factor between 0 and 1, such as {{1/2}}, makes the shape *smaller* — each point moves to half its distance from the centre. Mathematicians still call this an enlargement.",
      diagram: `<svg viewBox="0 0 320 252" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid showing triangle A with vertices (3, 2), (5, 2), (3, 4) enlarged by scale factor 2 from centre C(1, 1) to triangle A prime with vertices (5, 3), (9, 3), (5, 7); ray lines run from C through each vertex of A to the matching vertex of A prime"><rect x="0" y="0" width="320" height="252" fill="#ffffff"/><line x1="30" y1="226" x2="30" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="56" y1="226" x2="56" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="82" y1="226" x2="82" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="108" y1="226" x2="108" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="134" y1="226" x2="134" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="160" y1="226" x2="160" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="186" y1="226" x2="186" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="212" y1="226" x2="212" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="238" y1="226" x2="238" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="264" y1="226" x2="264" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="290" y1="226" x2="290" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="226" x2="290" y2="226" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="200" x2="290" y2="200" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="174" x2="290" y2="174" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="148" x2="290" y2="148" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="122" x2="290" y2="122" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="96" x2="290" y2="96" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="70" x2="290" y2="70" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="44" x2="290" y2="44" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="18" x2="290" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="30" y1="226" x2="290" y2="226" stroke="#334155" stroke-width="1.5"/><line x1="30" y1="226" x2="30" y2="18" stroke="#334155" stroke-width="1.5"/><text x="295" y="223" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="30" y="13" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="56" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="82" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="108" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="134" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="160" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="186" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">6</text><text x="212" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">7</text><text x="238" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">8</text><text x="264" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">9</text><text x="290" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">10</text><text x="26" y="204" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="26" y="178" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="26" y="152" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="26" y="126" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="26" y="100" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="26" y="74" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><text x="26" y="48" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">7</text><text x="26" y="22" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">8</text><text x="26" y="239" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">0</text><polygon points="160,148 264,148 160,44" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="108,174 160,174 108,122" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><line x1="56" y1="200" x2="160" y2="148" stroke="#b91c1c" stroke-width="1.3" stroke-dasharray="5 3"/><line x1="56" y1="200" x2="264" y2="148" stroke="#b91c1c" stroke-width="1.3" stroke-dasharray="5 3"/><line x1="56" y1="200" x2="160" y2="44" stroke="#b91c1c" stroke-width="1.3" stroke-dasharray="5 3"/><circle cx="56" cy="200" r="3.5" fill="#b91c1c"/><text x="50" y="215" font-size="12" font-family="sans-serif" fill="#b91c1c" text-anchor="start" font-weight="bold">C(1, 1)</text><text x="123.3" y="162.7" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><text x="196.7" y="121.3" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A′</text></svg>`,
      diagramCaption:
        "Triangle A, with vertices (3, 2), (5, 2) and (3, 4), is enlarged by scale factor 2 from C(1, 1) to give A′. Each ray line from C passes through a vertex of A and on to the matching vertex of A′, which is twice as far from C.",
      workedExamples: [
        {
          title: "Enlarging from a centre",
          problem: "Enlarge triangle A with vertices (3, 2), (5, 2) and (3, 4) by scale factor 2, centre C(1, 1).",
          steps: [
            "Step from C to (3, 2): across 2, up 1. Doubled: across 4, up 2. Image: (1 + 4, 1 + 2) = (5, 3).",
            "Step from C to (5, 2): across 4, up 1. Doubled: across 8, up 2. Image: (9, 3).",
            "Step from C to (3, 4): across 2, up 3. Doubled: across 4, up 6. Image: (5, 7).",
            "Check: the base of A has length 2 and the base of A′, from (5, 3) to (9, 3), has length 4 = 2 × 2 ✓.",
          ],
          answer: "A′ has vertices (5, 3), (9, 3) and (5, 7).",
          yourTurn: {
            question: "Your turn: enlarge the point (4, 3) by scale factor 3, centre (2, 2). Give the coordinates of the image.",
            answer: { type: "list", values: [8, 5], ordered: true, display: "(8, 5)" },
            solution: "Step from the centre: across 2, up 1. Times 3: across 6, up 3. Image: (2 + 6, 2 + 3) = (8, 5).",
          },
        },
        {
          title: "Finding the scale factor and centre",
          problem:
            "Triangle P has vertices (1, 2), (2, 2) and (1, 3). Triangle Q has vertices (3, 4), (6, 4) and (3, 7). Q is an enlargement of P. Find the scale factor and the centre of enlargement.",
          steps: [
            "Matching sides: P's base from (1, 2) to (2, 2) has length 1; Q's base from (3, 4) to (6, 4) has length 3.",
            "Scale factor = 3 ÷ 1 = 3. (Heights: 1 on P and 3 on Q ✓.)",
            "Draw ray lines from (3, 4) through (1, 2), and from (6, 4) through (2, 2), and extend them past P. They meet at (0, 1).",
            "Check by counting: from (0, 1) to (1, 2) is across 1, up 1; from (0, 1) to (3, 4) is across 3, up 3 — three times as far ✓.",
            "Second check: (0, 1) to (2, 2) is across 2, up 1; (0, 1) to (6, 4) is across 6, up 3 ✓.",
          ],
          answer: "Enlargement, scale factor 3, centre (0, 1).",
        },
        {
          title: "Lengths, perimeter … and area",
          problem:
            "A rectangle 2 cm by 3 cm is enlarged by scale factor 4. Find the dimensions, perimeter and area of the image.",
          steps: [
            "Every length × 4: the image is 8 cm by 12 cm.",
            "Perimeter: 2 × (8 + 12) = 40 cm. The object's perimeter is 10 cm, and 40 = 4 × 10 — perimeter is a length, so it scales by 4.",
            "Area: 8 × 12 = 96 cm². The object's area is 6 cm², and 96 = 16 × 6 — area scales by 4 × 4 = 16, not by 4.",
          ],
          answer: "8 cm by 12 cm; perimeter 40 cm; area 96 cm².",
        },
      ],
      keyPoints: [
        "An enlargement needs a scale factor and a centre.",
        "Scale factor = image length ÷ matching object length; angles never change.",
        "Each image point is (scale factor) × as far from the centre as its object point, on the same ray.",
        "Find the centre by drawing ray lines through matching vertices: they meet at the centre.",
      ],
      whyItWorks:
        "Take two vertices of the object joined by a side that goes, say, 2 across and 1 up. Measured from the centre, each vertex has its step multiplied by k, so the difference between them — the side itself — becomes 2k across and k up. It points in the same direction and is k times as long. Every side is scaled by k and keeps its direction, so every angle is unchanged: the image is a similar shape.",
      strategies: ["Work in steps from the centre", "Draw ray lines", "Check with a second vertex"],
      thinkDeeper:
        "Triangle P is enlarged by scale factor 2 to give Q, and then Q is enlarged by scale factor 3, from a different centre, to give R. Is R an enlargement of P? If so, with what scale factor? How many times larger is the area of R than the area of P?",
    },
    // ------------------------------------------------------------------ 6
    {
      id: "describing-transformations",
      heading: "Describing transformations, congruence & similarity",
      discovery: {
        problem:
          "Mei rotates a triangle and tells Arjun, 'I rotated it 90°.' Arjun follows her instruction but draws his image in a different place from hers. How many different images could Arjun have drawn? What extra words would make Mei's instruction impossible to misread?",
        idea:
          "Infinitely many! He could turn clockwise or anticlockwise, about *any* point as the centre. Only an instruction like 'rotate 90° clockwise about (2, 1)' pins down a single image. **Describing a transformation fully** means giving every detail needed to reproduce it exactly.",
      },
      body:
        "When a question says **describe fully the single transformation**, name the transformation *and* give every detail it needs:\n\n| Transformation | Name it, then give… | Example |\n|---|---|---|\n| Translation | the column vector | translation by (−6 over 2) |\n| Reflection | the equation of the mirror line | reflection in y = −x |\n| Rotation | the centre, angle and direction | rotation 90° clockwise about (1, −2) |\n| Enlargement | the scale factor and centre | enlargement, scale factor 3, centre (0, 1) |\n\n**Which one is it?** Compare the object and the image:\n- Same size, facing the same way, just moved → **translation**.\n- Same size, but a mirror image (reversed) → **reflection**.\n- Same size, turned but not reversed → **rotation**.\n- Same shape, different size → **enlargement**.\n\n**Congruent** shapes are identical in shape *and* size: one fits exactly on top of the other, even if you have to turn it or flip it over first. Translations, reflections and rotations always produce a congruent image. **Similar** shapes have the same shape but can be a different size: matching angles are equal and matching sides are in the same ratio. An enlargement produces a similar image. Congruent shapes are a special case of similar shapes, with scale factor 1.\n\n**Stretch — combining transformations:** doing one transformation and then another to the image is a *combined* transformation. Often a single transformation does the same job: two reflections in perpendicular mirror lines make a half-turn about the point where the lines cross, and two reflections in parallel mirror lines make a translation. Always apply them in the order given — order can change the result.",
      diagram: `<svg viewBox="0 0 290 260" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Grid showing shape A with vertices (1, 1), (4, 1), (1, 3); shape B with vertices (−5, 3), (−2, 3), (−5, 5); shape C with vertices (1, −1), (4, −1), (1, −3); and shape D with vertices (−1, −1), (−4, −1), (−1, −3)"><rect x="0" y="0" width="290" height="260" fill="#ffffff"/><line x1="22" y1="238" x2="22" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="44" y1="238" x2="44" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="66" y1="238" x2="66" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="88" y1="238" x2="88" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="110" y1="238" x2="110" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="132" y1="238" x2="132" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="154" y1="238" x2="154" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="176" y1="238" x2="176" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="198" y1="238" x2="198" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="220" y1="238" x2="220" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="242" y1="238" x2="242" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="264" y1="238" x2="264" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="238" x2="264" y2="238" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="216" x2="264" y2="216" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="194" x2="264" y2="194" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="172" x2="264" y2="172" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="150" x2="264" y2="150" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="128" x2="264" y2="128" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="106" x2="264" y2="106" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="84" x2="264" y2="84" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="62" x2="264" y2="62" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="40" x2="264" y2="40" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="18" x2="264" y2="18" stroke="#e2e8f0" stroke-width="1"/><line x1="22" y1="150" x2="264" y2="150" stroke="#334155" stroke-width="1.5"/><line x1="154" y1="238" x2="154" y2="18" stroke="#334155" stroke-width="1.5"/><text x="269" y="147" font-size="12" font-family="sans-serif" fill="#1f2937" font-style="italic">x</text><text x="154" y="13" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-style="italic">y</text><text x="22" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−6</text><text x="44" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−5</text><text x="66" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−4</text><text x="88" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−3</text><text x="110" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−2</text><text x="132" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">−1</text><text x="176" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">1</text><text x="198" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">2</text><text x="220" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">3</text><text x="242" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">4</text><text x="264" y="163" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="middle">5</text><text x="150" y="242" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−4</text><text x="150" y="220" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−3</text><text x="150" y="198" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−2</text><text x="150" y="176" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">−1</text><text x="150" y="132" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">1</text><text x="150" y="110" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">2</text><text x="150" y="88" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">3</text><text x="150" y="66" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">4</text><text x="150" y="44" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">5</text><text x="150" y="22" font-size="11" font-family="sans-serif" fill="#334155" text-anchor="end">6</text><polygon points="176,128 242,128 176,84" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="198" y="118.3" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">A</text><polygon points="44,84 110,84 44,40" fill="#fde68a" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="66" y="74.3" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">B</text><polygon points="176,172 242,172 176,216" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="198" y="191.7" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">C</text><polygon points="132,172 66,172 132,216" fill="#fecaca" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="110" y="191.7" font-size="13" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">D</text></svg>`,
      diagramCaption:
        "Shape A and three of its images. B is a translation of A, C is a reflection of A and D is a rotation of A. Which details would you give for each?",
      workedExamples: [
        {
          title: "Describing a translation",
          problem: "Describe fully the single transformation that maps shape A onto shape B in the diagram.",
          steps: [
            "B is the same size as A and faces the same way, so it is a translation.",
            "Track one vertex: (1, 1) on A matches (−5, 3) on B.",
            "Across: −5 − 1 = −6. Up: 3 − 1 = 2.",
            "Check with another vertex: (4, 1) → (−2, 3), again 6 left and 2 up ✓.",
          ],
          answer: "A translation by the column vector (−6 over 2).",
          yourTurn: {
            question:
              "Your turn: a translation maps a vertex of shape P at (2, −1) onto (−3, 4). Give the column vector of the translation as two numbers, top number first.",
            answer: { type: "list", values: [-5, 5], ordered: true, display: "(−5 over 5)" },
            solution: "Across: −3 − 2 = −5. Up: 4 − (−1) = 5. The column vector is (−5 over 5).",
          },
        },
        {
          title: "Reflection or rotation?",
          problem: "Describe fully the single transformation that maps A onto C, and the one that maps A onto D.",
          steps: [
            "Matching points of A and C have the same x-coordinate and opposite y-coordinates: (1, 1) ↔ (1, −1), (4, 1) ↔ (4, −1), (1, 3) ↔ (1, −3). C is A's mirror image across the x-axis.",
            "So A → C is a reflection in the x-axis, whose equation is y = 0.",
            "For D: (1, 1) → (−1, −1), (4, 1) → (−4, −1), (1, 3) → (−1, −3). Every point goes to (−x, −y), so D is A turned upside down but not mirrored.",
            "That is a half-turn. Its centre is the midpoint of (1, 1) and (−1, −1), which is (0, 0).",
          ],
          answer: "A → C: reflection in the line y = 0 (the x-axis). A → D: rotation of 180° about (0, 0).",
        },
        {
          title: "Stretch: two reflections make one rotation",
          problem: "Reflect shape A in the x-axis, then reflect that image in the y-axis. Which single transformation does the same job?",
          steps: [
            "Reflecting in the x-axis: (x, y) → (x, −y). This gives shape C.",
            "Reflecting C in the y-axis: (x, −y) → (−x, −y). This lands exactly on D.",
            "Overall every point goes (x, y) → (−x, −y), which is the rule for a 180° rotation about the origin.",
            "It can't be a reflection: the second flip undoes the 'mirror reversal' of the first, so D is not reversed compared with A.",
          ],
          answer: "A rotation of 180° about (0, 0).",
        },
      ],
      keyPoints: [
        "Translation → column vector; reflection → mirror line; rotation → centre, angle, direction; enlargement → scale factor, centre.",
        "Translations, reflections and rotations give congruent images; enlargements give similar images.",
        "Similar shapes have equal angles and sides in the same ratio; congruent shapes are also the same size.",
        "Asked for a *single* transformation? Give exactly one, never 'a reflection then a translation'.",
      ],
      whyItWorks:
        "Why these details and no fewer? Each one removes a choice. 'Rotation' alone leaves the centre, the angle and the direction open; fix all three and only one image is possible. A mirror line is pinned down only by its equation, and an enlargement only by both its centre and its scale factor. Congruence comes from the moves themselves: translations, reflections and rotations move every point but never change the distance between any two points, so all lengths and angles survive. An enlargement multiplies every distance by the scale factor, so only the angles and the ratios of sides survive — which is exactly what similar means.",
      strategies: ["Track one point", "Eliminate options", "Check with a second vertex"],
      thinkDeeper:
        "Can a reflection followed by another reflection ever be the same as a single reflection? Try a few pairs of mirror lines on a grid, then explain your answer using what a reflection does to a shape's 'handedness' (left hand ↔ right hand).",
    },
    // ------------------------------------------------------------------ 7
    {
      id: "pythagoras",
      heading: "Pythagoras' theorem",
      discovery: {
        problem:
          "Draw a right-angled triangle whose two shorter sides are 3 cm and 4 cm, and measure the longest side. Repeat with shorter sides of 5 cm and 12 cm. Now square all three side lengths in each triangle. What do you notice?",
        idea:
          "The longest sides measure 5 cm and 13 cm. Squaring gives {{3^2 + 4^2 = 9 + 16 = 25 = 5^2}} and {{5^2 + 12^2 = 25 + 144 = 169 = 13^2}}. Each time, the squares of the two shorter sides add up to the square of the longest side. This is **Pythagoras' theorem**.",
      },
      body:
        "**Stretch:** Pythagoras' theorem is usually met in Year 9, but it only needs squares and square roots, so you can master it now.\n\nIn a right-angled triangle, the longest side, opposite the right angle, is called the **hypotenuse**. Call the hypotenuse c and the two shorter sides a and b. **Pythagoras' theorem** says:\n\n    {{a^2 + b^2 = c^2}}\n\nIn words: the square of the hypotenuse equals the sum of the squares of the other two sides. It works for *every* right-angled triangle and *only* for right-angled triangles.\n\n**Finding the hypotenuse:** square the two shorter sides, **add**, then square-root.\n\n    {{c = sqrt(a^2 + b^2)}}\n\n**Finding a shorter side:** square the hypotenuse, **subtract** the square of the known shorter side, then square-root.\n\n    {{a = sqrt(c^2 - b^2)}}\n\nAlways identify the hypotenuse first, and check your answer: the hypotenuse must be the longest side.\n\n**Pythagorean triples** are whole-number solutions worth recognising: 3, 4, 5 · 5, 12, 13 · 8, 15, 17 · 7, 24, 25 — and their multiples, such as 6, 8, 10.",
      diagram: `<svg viewBox="0 0 420 212" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two squares of side a plus b. The left one holds four copies of a right-angled triangle around a tilted square of area c squared. The right one holds the same four triangles arranged as two rectangles, leaving a square of area a squared and a square of area b squared"><rect x="0" y="0" width="420" height="212" fill="#ffffff"/><rect x="20" y="30" width="140" height="140" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/><polygon points="80,30 160,90 100,170 20,110" fill="#fde68a" stroke="#1f2937" stroke-width="1.5"/><polygon points="20,30 80,30 20,110" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="80,30 160,30 160,90" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="160,90 160,170 100,170" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="100,170 20,170 20,110" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="90" y="106" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">c²</text><text x="113" y="74" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">c</text><text x="50" y="22" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">a</text><text x="120" y="22" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">b</text><text x="10" y="74" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">b</text><text x="10" y="144" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">a</text><rect x="260" y="30" width="140" height="140" fill="#ffffff" stroke="#1f2937" stroke-width="1.5"/><rect x="260" y="30" width="60" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><rect x="320" y="90" width="80" height="80" fill="#bbf7d0" stroke="#1f2937" stroke-width="1.5"/><polygon points="320,30 400,30 320,90" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="400,30 400,90 320,90" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="260,90 320,90 260,170" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><polygon points="320,90 320,170 260,170" fill="#bae6fd" stroke="#1f2937" stroke-width="1.5" stroke-linejoin="round"/><text x="290" y="65" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">a²</text><text x="360" y="135" font-size="14" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="bold">b²</text><text x="290" y="22" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">a</text><text x="360" y="22" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">b</text><text x="250" y="64" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">a</text><text x="250" y="134" font-size="13" font-family="sans-serif" fill="#334155" text-anchor="middle" font-weight="bold">b</text><text x="210" y="98" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">same</text><text x="210" y="114" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">area</text><text x="90" y="194" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">4 triangles + c²</text><text x="330" y="194" font-size="12" font-family="sans-serif" fill="#1f2937" text-anchor="middle" font-weight="normal">4 triangles + a² + b²</text></svg>`,
      diagramCaption:
        "Both big squares have side a + b and contain four copies of the same right-angled triangle. On the left the space left over is one tilted square, {{c^2}}; on the right it is two squares, {{a^2}} and {{b^2}}. Equal areas minus equal triangles leave equal areas: {{a^2 + b^2 = c^2}}.",
      workedExamples: [
        {
          title: "Finding the hypotenuse",
          problem: "A right-angled triangle has shorter sides 9 cm and 12 cm. Find the length of the hypotenuse.",
          steps: [
            "The hypotenuse is the unknown, so add the squares.",
            "{{c^2 = 9^2 + 12^2 = 81 + 144 = 225}}",
            "{{c = sqrt(225) = 15}}",
            "Check: 15 is longer than both 9 and 12 ✓ (this is the 3, 4, 5 triple scaled by 3).",
          ],
          answer: "15 cm",
          yourTurn: {
            question: "Your turn: a right-angled triangle has shorter sides 5 cm and 12 cm. Find the length of the hypotenuse in cm.",
            answer: { type: "number", value: 13 },
            solution: "{{c^2 = 5^2 + 12^2 = 25 + 144 = 169}}, so {{c = sqrt(169) = 13}} cm.",
          },
        },
        {
          title: "Finding a shorter side",
          problem:
            "A 6.5 m ladder leans against the wall of an HDB block, with its foot on flat ground 2.5 m from the wall. How high up the wall does the ladder reach?",
          steps: [
            "The wall meets the ground at a right angle. The ladder is opposite that right angle, so it is the hypotenuse: c = 6.5.",
            "A shorter side is missing, so subtract: {{h^2 = 6.5^2 - 2.5^2 = 42.25 - 6.25 = 36}}",
            "{{h = sqrt(36) = 6}}",
            "Check: 6 is less than the hypotenuse, 6.5 ✓.",
          ],
          answer: "6 m",
        },
        {
          title: "When the answer isn't a whole number",
          problem: "A phone screen is a rectangle 7 cm wide and 15 cm tall. Find the length of its diagonal, correct to 1 decimal place.",
          steps: [
            "The diagonal splits the rectangle into two right-angled triangles, and the diagonal is their hypotenuse.",
            "{{d^2 = 7^2 + 15^2 = 49 + 225 = 274}}",
            "{{d = sqrt(274) = 16.552…}}",
            "Estimate check: {{sqrt(256) = 16}} and {{sqrt(289) = 17}}, so the answer must be between 16 and 17 ✓.",
          ],
          answer: "16.6 cm (to 1 d.p.)",
        },
      ],
      keyPoints: [
        "{{a^2 + b^2 = c^2}}, where c is the hypotenuse — the side opposite the right angle.",
        "Hypotenuse: square, add, square-root. Shorter side: square, subtract, square-root.",
        "Pythagoras' theorem works only in right-angled triangles.",
        "Check that the hypotenuse is the longest side.",
      ],
      whyItWorks:
        "Look at the diagram. Each big square has side a + b, so both have the same area. Each contains four copies of the same right-angled triangle, with shorter sides a and b and hypotenuse c. Take the four triangles away from each big square, and what is left must have equal areas. On the left, what is left is a square of side c (its corners are right angles because the two acute angles of the triangle add up to 90°). On the right, it is a square of side a plus a square of side b. So {{c^2 = a^2 + b^2}} — for every right-angled triangle, not just the ones we measured.",
      strategies: ["Draw a diagram", "Identify the hypotenuse first", "Estimate first"],
      thinkDeeper:
        "A triangle has sides 6 cm, 8 cm and 11 cm. Is it right-angled? Compare {{6^2 + 8^2}} with {{11^2}}. If the two smaller squares add up to *less* than the biggest square, is the largest angle more or less than 90°? Explain using a sketch.",
    },
  ],
  learn: {
    flashcards: [
      { front: "What is the order of rotational symmetry?", back: "The number of times a shape fits onto its own outline in one full turn. No rotational symmetry means order 1." },
      { front: "Lines of symmetry and order of rotational symmetry of a regular n-sided polygon?", back: "n lines of symmetry and order n." },
      { front: "What does the column vector (−3 over 5) mean?", back: "3 left and 5 up. Top number = across, bottom number = up or down." },
      { front: "How do you reverse the translation (a over b)?", back: "Translate by (−a over −b): change both signs." },
      { front: "Is the line x = 4 vertical or horizontal?", back: "Vertical: every point on it has x-coordinate 4." },
      { front: "Reflection in y = x: (x, y) → ?", back: "(y, x): swap the coordinates." },
      { front: "Reflection in y = −x: (x, y) → ?", back: "(−y, −x): swap the coordinates and change both signs." },
      { front: "Rotation of 90° anticlockwise about the origin: (x, y) → ?", back: "(−y, x). For 90° clockwise: (y, −x). For 180°: (−x, −y)." },
      { front: "Three facts needed to describe a rotation", back: "Centre, angle and direction (a half-turn needs no direction)." },
      { front: "Two facts needed to describe an enlargement", back: "Scale factor and centre of enlargement." },
      { front: "How do you find a scale factor?", back: "Divide an image length by the matching object length." },
      { front: "How do you find the centre of an enlargement?", back: "Draw ray lines through pairs of matching vertices; they meet at the centre." },
      { front: "Congruent vs similar", back: "Congruent: same shape and same size. Similar: same shape, equal angles, sides in the same ratio (size may differ)." },
      { front: "Which transformations always give a congruent image?", back: "Translations, reflections and rotations. An enlargement gives a similar image." },
      { front: "Pythagoras' theorem", back: "{{a^2 + b^2 = c^2}} in a right-angled triangle, where c is the hypotenuse." },
      { front: "Pythagoras: finding a shorter side", back: "Subtract: {{a^2 = c^2 - b^2}}, then square-root." },
    ],
    mustKnow: [
      "I can count lines of symmetry and find the order of rotational symmetry of shapes and letters.",
      "I can translate a shape by a column vector, and describe a translation with a column vector.",
      "I can reflect a shape in the lines x = a, y = b, y = x and y = −x.",
      "I can find the equation of a mirror line from an object and its image.",
      "I can rotate a shape through 90° or 180°, clockwise or anticlockwise, about a given centre.",
      "I can find the centre of a rotation, especially for a half-turn.",
      "I can enlarge a shape by a positive whole-number scale factor from a centre on or outside the shape.",
      "I can find the scale factor and the centre of an enlargement using ray lines.",
      "I can describe a single transformation fully, giving every detail it needs.",
      "I can explain the difference between congruent and similar shapes, and say which transformations give each.",
      "Stretch: I can use Pythagoras' theorem to find the hypotenuse or a shorter side of a right-angled triangle.",
    ],
    misconceptions: [
      {
        wrong: "A rectangle has 4 lines of symmetry — the diagonals count too.",
        right: "A rectangle that isn't a square has only 2. Fold it along a diagonal and the corners don't meet. A square has 4.",
      },
      {
        wrong: "The column vector (2 over 5) means 2 up and 5 right.",
        right: "The top number is the move across and the bottom number is the move up: (2 over 5) means 2 right and 5 up — the same order as coordinates.",
      },
      {
        wrong: "The line y = 3 is vertical, because it goes through 3 on the y-axis.",
        right: "y = 3 is horizontal: every point on it has y-coordinate 3, such as (−1, 3), (0, 3) and (5, 3). Vertical lines have equations x = …",
      },
      {
        wrong: "To rotate a shape, you just spin it on the spot where it is.",
        right: "A rotation turns about its given centre. Every point keeps its distance from that centre, so the shape usually ends up somewhere else.",
      },
      {
        wrong: "An enlargement with scale factor 2 doubles the area.",
        right: "Lengths double, so the area is multiplied by {{2^2}} = 4. A 1 cm by 1 cm square becomes 2 cm by 2 cm.",
      },
      {
        wrong: "To find a shorter side with Pythagoras, add the squares as usual.",
        right: "Adding the squares gives the hypotenuse. For a shorter side, subtract: {{a^2 = c^2 - b^2}}, then square-root.",
      },
    ],
    examMistakes: [
      "Writing just 'rotation' or 'rotation 90°' — without the centre and direction you lose marks.",
      "Giving two transformations, such as 'reflect then translate', when the question asks for a single transformation.",
      "Mixing up x = a (a vertical line) and y = b (a horizontal line) when drawing a mirror line.",
      "Swapping the top and bottom numbers of a column vector, or forgetting the minus sign for a move left or down.",
      "Measuring an enlargement from the edge of the shape instead of from the centre of enlargement.",
      "Rotating the wrong way: clockwise is the direction clock hands move.",
      "Leaving a Pythagoras answer as {{c^2}} — forgetting the final square root.",
      "Reflecting in y = x by counting squares straight across instead of at right angles to the mirror.",
    ],
    mnemonics: [
      {
        topic: "Column vectors",
        device: "Along the corridor, then up (or down) the stairs",
        explanation: "The top number is the move across (right +, left −); the bottom number is the move up (+) or down (−) — the same order as coordinates.",
      },
      {
        topic: "Describing a rotation or an enlargement",
        device: "Rotations need CAD; enlargements need SC",
        explanation: "Rotation: Centre, Angle, Direction. Enlargement: Scale factor and Centre. (A translation needs its vector; a reflection needs its mirror line's equation.)",
      },
      {
        topic: "Horizontal and vertical lines",
        device: "y = b lies down; x = a stands up",
        explanation: "On y = 3 every point has y-coordinate 3, so the line lies flat across the page. On x = 3 every point has x-coordinate 3, so the line stands upright.",
      },
      {
        topic: "Pythagoras: add or subtract?",
        device: "Longest side? Add. Shorter side? Subtract.",
        explanation: "Looking for the hypotenuse, add the two squares. Looking for a shorter side, subtract the smaller square from the larger one. Then square-root.",
      },
    ],
    realWorld: [
      {
        title: "Peranakan tiles",
        detail: "The patterned tiles on Singapore shophouses are often designed with 4 lines of symmetry and rotational symmetry of order 4, so they line up whichever way round they are laid.",
        emoji: "🏠",
      },
      {
        title: "Video games",
        detail: "When a character walks across the screen, the game translates its picture by a small vector every frame — for example (3 over 0) to move 3 pixels right.",
        emoji: "🎮",
      },
      {
        title: "Projectors and shadows",
        detail: "A projector enlarges a picture from its lens, which acts as the centre of enlargement. Move it twice as far from the screen and the picture becomes twice as wide.",
        emoji: "📽️",
      },
      {
        title: "Snowflakes",
        detail: "Snowflakes have rotational symmetry of order 6, because water molecules freeze into a hexagonal pattern.",
        emoji: "❄️",
      },
      {
        title: "The builders' 3-4-5 rule",
        detail: "To mark a perfect right angle, builders measure 3 m along one edge and 4 m along the other, then adjust until the diagonal is exactly 5 m — Pythagoras in reverse.",
        emoji: "🏗️",
      },
      {
        title: "Screen sizes",
        detail: "A '6.1-inch' phone is measured along its diagonal, which you can work out from the screen's width and height with Pythagoras' theorem.",
        emoji: "📱",
      },
    ],
    videos: [
      { title: "Lines of symmetry and rotational symmetry", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+rotational+symmetry" },
      { title: "Translations and column vectors", channel: "Corbettmaths", url: "https://www.youtube.com/results?search_query=corbettmaths+translations+column+vectors" },
      { title: "Describing transformations", channel: "Maths Genie", url: "https://www.youtube.com/results?search_query=maths+genie+describing+transformations" },
      { title: "Pythagorean theorem and a visual proof", channel: "Khan Academy", url: "https://www.youtube.com/results?search_query=khan+academy+pythagorean+theorem+proof" },
    ],
    formulas: [
      { name: "Rotational symmetry", formula: "smallest turn = {{360/n}}°", note: "For a shape with rotational symmetry of order n." },
      { name: "Translation", formula: "(x, y) translated by (a over b) → (x + a, y + b)", note: "Top number across, bottom number up." },
      { name: "Reflections", formula: "y = x: (x, y) → (y, x) · y = −x: (x, y) → (−y, −x) · x = a: (x, y) → (2a − x, y) · y = b: (x, y) → (x, 2b − y)" },
      { name: "Rotations about the origin", formula: "90° anticlockwise: (x, y) → (−y, x) · 90° clockwise: (x, y) → (y, −x) · 180°: (x, y) → (−x, −y)" },
      { name: "Scale factor", formula: "{{\"scale factor\" = \"image length\" / \"object length\"}}", note: "Angles stay the same; distances from the centre are multiplied by the scale factor." },
      { name: "Pythagoras' theorem (stretch)", formula: "{{a^2 + b^2 = c^2}}", note: "Right-angled triangles only; c is the hypotenuse." },
      { name: "Pythagoras rearranged (stretch)", formula: "{{c = sqrt(a^2 + b^2)}} · {{a = sqrt(c^2 - b^2)}}" },
    ],
  },
};
