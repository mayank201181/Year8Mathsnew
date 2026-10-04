// Area, Surface Area & Volume — Practice Papers 3 and 4.
// Paper 3: problem solving in context and multi-step questions.
// Paper 4: exam style — linked parts, diagrams/tables and reasoning.
import type { Paper } from "../../types.ts";

export const morePapers: Paper[] = [
  // =========================================================================
  // PRACTICE PAPER 3 — problem solving in context
  // =========================================================================
  {
    id: "perimeter-area-volume-p3",
    title: "Practice Paper 3",
    questions: [
      // ------------------------------------------------------------- q01
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q01",
        question:
          "Wei Ling is carpeting her bedroom floor, which is a rectangle 3.5 m long and 3 m wide. Carpet costs $24 per square metre. How much will the carpet cost? Give your answer in dollars.",
        answer: { type: "number", value: 252, display: "$252" },
        traps: [
          {
            spec: { type: "number", value: 312 },
            feedback:
              "$312 is the perimeter (13 m) × $24. Carpet covers the floor, so you need the area in m², not the distance round the edge.",
          },
        ],
        solution: [
          "Carpet covers a surface, so find the area: 3.5 × 3 = 10.5 m².",
          "Each square metre costs $24: 10.5 × 24 = $252.",
        ],
        commonError: "Using the perimeter instead of the area — perimeter is for skirting boards, area is for carpet.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: [
          "Carpet covers the floor. Do you need the area or the perimeter?",
          "Find the area in m², then multiply by the price of one square metre.",
        ],
        strategy: "Make it simpler",
      },
      // ------------------------------------------------------------- q02
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q02",
        question:
          "A flower bed in a community garden is a trapezium. Its parallel sides are 3.5 m and 4.5 m long, and they are 3 m apart. One packet of seeds covers 1.5 m². How many packets does Siti need to sow the whole bed?",
        answer: { type: "number", value: 8, display: "8 packets" },
        traps: [
          {
            spec: { type: "number", value: 16 },
            feedback:
              "16 packets would cover 24 m². You've forgotten the {{1/2}} in the trapezium formula: the bed is {{1/2 * (3.5 + 4.5) * 3 = 12}} m².",
          },
          {
            spec: { type: "number", value: 12 },
            feedback: "12 m² is the area of the bed. Now share it into packets: each packet covers 1.5 m².",
          },
        ],
        solution: [
          "Area of the trapezium: {{1/2 * (3.5 + 4.5) * 3 = 1/2 * 8 * 3 = 12}} m².",
          "Packets: 12 ÷ 1.5 = 8.",
        ],
        commonError: "Forgetting to halve (a + b) × h.",
        difficulty: "warmup",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Area of a trapezium = {{1/2 (a + b) h}}, where a and b are the parallel sides.",
          "Then work out how many 1.5 m² packets fit into that area.",
        ],
      },
      // ------------------------------------------------------------- q03
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q03",
        question:
          "For the Mid-Autumn Festival, Mei builds a lantern frame in the shape of a pentagonal prism (a pentagon at each end). She uses one bamboo stick for every edge and one blob of glue at every vertex. How many sticks and how many blobs of glue does she need? Give the number of sticks first.",
        answer: { type: "list", values: [15, 10], ordered: true, display: "15 sticks, 10 blobs of glue" },
        traps: [
          {
            spec: { type: "list", values: [10, 10], ordered: true },
            feedback:
              "10 edges only counts the two pentagons. Don't forget the 5 sticks that run from one end of the lantern to the other.",
          },
          {
            spec: { type: "list", values: [7, 10], ordered: true },
            feedback: "7 is the number of faces (2 pentagons + 5 rectangles). Sticks go along the edges.",
          },
        ],
        solution: [
          "Edges: 5 round each pentagon, plus 5 joining the two ends: 5 + 5 + 5 = 15 sticks.",
          "Vertices: 5 corners on each pentagon: 2 × 5 = 10 blobs of glue.",
          "Check with Euler: F = 2 + 5 = 7, and V + F − E = 10 + 7 − 15 = 2 ✓",
        ],
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: [
          "Picture the two pentagon ends first, then the sticks that join them.",
          "Each end has 5 edges and 5 corners. How many edges run from one end to the other?",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q04
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q04",
        question:
          "A rectangular planter box is 80 cm long, 25 cm wide and 30 cm deep. How many litres of soil does it take to fill it to the brim?",
        answer: { type: "number", value: 60, display: "60 litres" },
        traps: [
          { spec: { type: "number", value: 60000 }, feedback: "60 000 is the volume in cm³. 1000 cm³ = 1 litre, so divide by 1000." },
          { spec: { type: "number", value: 600 }, feedback: "1 litre is 1000 cm³, not 100 cm³. Divide 60 000 by 1000." },
        ],
        solution: [
          "Volume = 80 × 25 × 30 = 2000 × 30 = 60 000 cm³.",
          "1000 cm³ = 1 litre, so 60 000 ÷ 1000 = 60 litres.",
        ],
        commonError: "Stopping at cm³, or dividing by 100 instead of 1000.",
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["Find the volume in cm³ first.", "1 litre = 1000 cm³."],
        strategy: "Check units",
      },
      // ------------------------------------------------------------- q05
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q05",
        question:
          "Ethan paints all six faces of a wooden cube with edges of 10 cm. One small tin of paint covers 250 cm². How many tins must he buy?",
        answer: { type: "number", value: 3, display: "3 tins" },
        traps: [
          {
            spec: { type: "number", value: 2 },
            feedback: "Two tins only cover 500 cm², but the cube has 600 cm² of surface. You can't buy 0.4 of a tin, so round up.",
          },
          {
            spec: { type: "number", value: 4 },
            feedback: "4 tins comes from the volume, 1000 cm³. Paint covers the outside, so use the surface area: 6 × 100 = 600 cm².",
          },
        ],
        solution: [
          "Each face is 10 × 10 = 100 cm², and there are 6 faces: surface area = 600 cm².",
          "600 ÷ 250 = 2.4 tins.",
          "2 tins are not enough, so Ethan must buy 3.",
        ],
        commonError: "Rounding 2.4 down to 2 — in a 'how many must you buy' question you always round up.",
        difficulty: "warmup",
        guideRef: "surface-area",
        hints: [
          "Paint covers the outside. Which measurement is that: volume or surface area?",
          "There are six faces, each 10 cm by 10 cm. Then think about whether to round up or down.",
        ],
      },
      // ------------------------------------------------------------- q06
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q06",
        question:
          "A rectangular photo has an area of 96 cm² and is 8 cm wide. Priya glues a ribbon all the way round its edge. How long must the ribbon be, in cm?",
        answer: { type: "number", value: 40, display: "40 cm" },
        traps: [
          {
            spec: { type: "number", value: 20 },
            feedback: "12 + 8 = 20 cm only goes half-way round. A rectangle has two lengths and two widths.",
          },
          {
            spec: { type: "number", value: 12 },
            feedback: "12 cm is the missing length — a good first step. The ribbon goes all the way round, so now find the perimeter.",
          },
        ],
        solution: [
          "Area = length × width, so 96 = length × 8.",
          "Length = 96 ÷ 8 = 12 cm.",
          "Ribbon = perimeter = 2 × (12 + 8) = 2 × 20 = 40 cm.",
        ],
        commonError: "Adding the length and width once and forgetting the other two sides.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "The ribbon is the perimeter — but one side length is missing. What do you know that could find it?",
          "Area = length × width, so 96 = length × 8.",
          "The length is 12 cm. Now go all the way round: two lengths and two widths.",
        ],
        strategy: "Use the inverse",
      },
      // ------------------------------------------------------------- q07
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q07",
        question:
          "A rectangular school field is 20 m long and 12 m wide. A path 1 m wide runs all the way round the inside of its edge, as shown. The rest of the field is grass. Find the area of the path, in m².",
        diagram: `<svg viewBox="0 0 380 240" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 20 m by 12 m rectangular field. A path 1 m wide runs round the inside of its edge and surrounds a smaller rectangle of grass."><rect x="0" y="0" width="380" height="240" fill="#ffffff"/><rect x="50" y="35" width="300" height="180" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="65" y="50" width="270" height="150" fill="#bbf7d0" stroke="#334155" stroke-width="1.5"/><text x="200" y="130" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">grass</text><text x="200" y="26" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">20 m</text><text x="44" y="130" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">12 m</text><text x="200" y="211" font-size="11" font-family="sans-serif" text-anchor="middle" fill="#1f2937">path, 1 m wide</text></svg>`,
        answer: { type: "number", value: 60, display: "60 m²" },
        traps: [
          {
            spec: { type: "number", value: 64 },
            feedback:
              "64 m² comes from four strips of 20, 20, 12 and 12 m — but the four 1 m × 1 m corner squares are counted twice. Take them off: 64 − 4 = 60.",
          },
          {
            spec: { type: "number", value: 31 },
            feedback: "The grass is 2 m shorter in each direction, not 1 m: the path runs along both ends and both sides.",
          },
        ],
        solution: [
          "Big minus missing: the whole field is 20 × 12 = 240 m².",
          "The path takes 1 m off both ends and both sides, so the grass is 18 m by 10 m = 180 m².",
          "Path = 240 − 180 = 60 m².",
        ],
        solutions: [
          {
            label: "Split into strips",
            steps: [
              "Two long strips along the 20 m sides: 2 × (20 × 1) = 40 m².",
              "Two short strips fit between them, each 12 − 2 = 10 m long: 2 × (10 × 1) = 20 m².",
              "Total: 40 + 20 = 60 m². Both methods agree, which is a good check.",
            ],
          },
        ],
        commonError: "Counting the corner squares twice when adding strips.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Big minus missing: what size is the grass rectangle?",
          "The path takes 1 m off *both* ends of the length and *both* sides of the width.",
          "The grass is 18 m by 10 m. Subtract its area from the field's area.",
        ],
        strategy: "Big minus missing",
      },
      // ------------------------------------------------------------- q08
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q08",
        question:
          "A bicycle shed has a sloping roof. Each of its two side walls is a trapezium: the front edge is 2.4 m tall, the back edge is 1.8 m tall, and the shed is 3 m deep from front to back. (The front and back edges are both vertical, so they are parallel.)\n\nOne litre of paint covers 3 m², and paint is sold in 1-litre tins. How many tins are needed to give **both** side walls one coat?",
        answer: { type: "number", value: 5, display: "5 tins" },
        traps: [
          {
            spec: { type: "number", value: 4 },
            feedback: "You need 4.2 litres. Four tins only give 4 litres, so you must buy a fifth tin.",
          },
          {
            spec: { type: "number", value: 9 },
            feedback:
              "It looks as if the {{1/2}} is missing. One wall is {{1/2 * (2.4 + 1.8) * 3 = 6.3}} m², not 12.6 m².",
          },
        ],
        solution: [
          "The parallel sides are the vertical edges, 2.4 m and 1.8 m. The distance between them (the height of the trapezium) is the 3 m depth.",
          "One wall: {{1/2 * (2.4 + 1.8) * 3 = 1/2 * 4.2 * 3 = 6.3}} m².",
          "Two walls: 2 × 6.3 = 12.6 m².",
          "Paint: 12.6 ÷ 3 = 4.2 litres, so 5 tins.",
        ],
        commonError: "Painting only one wall (that gives 2.1 litres → 3 tins), or rounding 4.2 down.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Which two edges are parallel? What is the perpendicular distance between them?",
          "The trapezium is lying on its side: the parallel sides are the 2.4 m and 1.8 m edges, and the 'height' is the 3 m depth.",
          "One wall is {{1/2 * (2.4 + 1.8) * 3}} m². There are two walls — and tins only come whole.",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q09
      {
        kind: "written",
        id: "perimeter-area-volume-p3-q09",
        question:
          "Zara has 24 m of fencing to make a rectangular vegetable patch. She says: 'It doesn't matter what shape of rectangle I make. They all use 24 m of fencing, so they all have the same area.'\n\nIs Zara right? Use examples to explain, and say which rectangle with whole-number sides gives her the biggest patch.",
        marks: 3,
        modelAnswer:
          "Zara is wrong. Half of 24 m is 12 m, so the length and width must add to 12 m.\n\nA 10 m by 2 m rectangle has perimeter 2 × (10 + 2) = 24 m and area 20 m². A 6 m by 6 m square also has perimeter 24 m, but its area is 36 m². Same perimeter, different areas.\n\n| Length (m) | Width (m) | Area (m²) |\n|---|---|---|\n| 11 | 1 | 11 |\n| 10 | 2 | 20 |\n| 9 | 3 | 27 |\n| 8 | 4 | 32 |\n| 7 | 5 | 35 |\n| 6 | 6 | 36 |\n\nThe biggest patch is the 6 m by 6 m square, with area 36 m².",
        markScheme: [
          {
            point: "Gives at least two different rectangles with perimeter 24 m (length + width = 12)",
            keywords: ["10", "2", "8", "4", "12", "perimeter", "24"],
          },
          {
            point: "Correct areas that differ, so Zara is wrong",
            keywords: ["20", "32", "36", "different", "not the same", "wrong"],
          },
          {
            point: "Identifies the 6 m by 6 m square, area 36 m², as the biggest",
            keywords: ["6 by 6", "6 x 6", "6 × 6", "square", "36"],
          },
        ],
        commonError: "Assuming that a fixed perimeter fixes the area.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Try a long thin rectangle and a fat one. What must the length and width add up to?",
          "Length + width = 12 m. List the pairs: 11 and 1, 10 and 2, …",
          "Work out the area of each pair. Which is largest — and what shape is it?",
        ],
        strategy: "Consider extremes",
      },
      // ------------------------------------------------------------- q10
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q10",
        question:
          "A model is built from 1 cm cubes. The table is its plan: each number tells you how many cubes are stacked on that square. The front row is the row nearest to you.\n\n| Plan | Left | Middle | Right |\n|---|---|---|---|\n| Back row | 1 | 3 | 2 |\n| Front row | 2 | 1 | 2 |\n\nFind the area of the front elevation, then the area of the side elevation seen from the right. Give both answers in cm², front elevation first.",
        answer: { type: "list", values: [7, 5], ordered: true, display: "7 cm², 5 cm²" },
        traps: [
          {
            spec: { type: "list", values: [5, 4], ordered: true },
            feedback:
              "You've only used the stacks nearest to you. An elevation shows the tallest stack in each line of sight, even if it is behind a shorter one.",
          },
          {
            spec: { type: "list", values: [11, 11], ordered: true },
            feedback: "11 is the total number of cubes. An elevation is a flat view: cubes hidden behind others add no extra area.",
          },
        ],
        solution: [
          "From the front you look along each column. Each column of the view is as tall as the tallest stack in it.",
          "Left: tallest of 1 and 2 is 2. Middle: tallest of 3 and 1 is 3. Right: tallest of 2 and 2 is 2.",
          "Front elevation: 2 + 3 + 2 = 7 squares = 7 cm².",
          "From the right you look along each row. Back row: tallest is 3. Front row: tallest is 2.",
          "Side elevation: 3 + 2 = 5 squares = 5 cm².",
        ],
        commonError: "Adding every stack instead of taking the tallest one in each line of sight.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Imagine standing in front of the model. For each column (left, middle, right), what do you see?",
          "A column of the front view is as tall as the tallest stack in that column — the shorter stacks are hidden.",
          "From the right you look along the rows instead: the back row and the front row.",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q11
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q11",
        question:
          "A model house is made by gluing a square-based pyramid on top of a cube, so that the base of the pyramid exactly covers the top face of the cube. Count the faces, vertices and edges of the new solid. Give F, V and E in that order.",
        answer: { type: "list", values: [9, 9, 16], ordered: true, display: "F = 9, V = 9, E = 16" },
        traps: [
          {
            spec: { type: "list", values: [11, 13, 20], ordered: true },
            feedback:
              "That's the cube and pyramid simply added together. Gluing hides two square faces, and the square's 4 corners and 4 edges are shared, not doubled.",
          },
          {
            spec: { type: "list", values: [10, 9, 16], ordered: true },
            feedback: "The cube's top face is now covered by the pyramid, so it is no longer on the outside. Neither square is a face of the new solid.",
          },
        ],
        solution: [
          "Faces: the cube keeps 5 of its faces (the top is covered), and the pyramid adds 4 triangles: 5 + 4 = 9.",
          "Vertices: the cube's 8 corners, plus the apex of the pyramid: 8 + 1 = 9.",
          "Edges: the cube's 12 edges, plus the pyramid's 4 sloping edges: 12 + 4 = 16.",
          "Check with Euler: V + F − E = 9 + 9 − 16 = 2 ✓",
        ],
        commonError: "Counting the glued squares as faces, or counting the shared corners and edges twice.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "What disappears when the two solids are glued together?",
          "The cube's top face and the pyramid's base both end up inside. The square's 4 corners and 4 edges are shared, not doubled.",
          "Start with the cube (6, 8, 12). What does the pyramid add on top: how many new faces, corners and edges?",
        ],
        strategy: "Look for an invariant",
      },
      // ------------------------------------------------------------- q12
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q12",
        question:
          "A tent is a triangular prism 2 m long. Each triangular end has a base of 1.6 m, two sloping sides of 1 m, and a perpendicular height of 0.6 m. The tent is made of two triangular ends and two sloping rectangular sides — it has **no floor**. How much fabric is needed to make it, in m²?",
        answer: { type: "number", value: 4.96, display: "4.96 m²" },
        traps: [
          {
            spec: { type: "number", value: 8.16 },
            feedback: "8.16 m² includes a 1.6 m × 2 m floor. This tent has no floor, so leave that rectangle out.",
          },
          {
            spec: { type: "number", value: 5.92 },
            feedback: "Each triangle is {{1/2 * 1.6 * 0.6 = 0.48}} m². It looks as if the {{1/2}} has been forgotten.",
          },
        ],
        solution: [
          "Two triangular ends: 2 × {{1/2 * 1.6 * 0.6}} = 2 × 0.48 = 0.96 m².",
          "Two sloping sides, each 1 m by 2 m: 2 × 2 = 4 m².",
          "No floor, so the total is 0.96 + 4 = 4.96 m².",
        ],
        commonError: "Including the floor, or using the sloping side (1 m) as the triangle's height.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Sketch the net, then cross out any face that isn't made of fabric.",
          "You need two triangles and two rectangles. Each rectangle is a sloping side (1 m) by the length of the tent (2 m).",
          "Each triangle is {{1/2 * 1.6 * 0.6}} m².",
        ],
        strategy: "Sketch the net",
      },
      // ------------------------------------------------------------- q13
      {
        kind: "written",
        id: "perimeter-area-volume-p3-q13",
        question:
          "A fish tank is a cuboid 50 cm long, 30 cm wide and 35 cm tall. It holds water 30 cm deep. Ravi is about to pour in a full 9-litre bucket of water. He says: 'There's still 5 cm of space at the top, so 9 litres will easily fit.'\n\nIs Ravi right? Show your working.",
        marks: 3,
        modelAnswer:
          "Ravi is wrong: the tank will overflow.\n\nThe base of the tank is 50 × 30 = 1500 cm². 9 litres = 9000 cm³. Spread over the base, 9000 cm³ raises the water by 9000 ÷ 1500 = 6 cm. The water would need to reach 30 + 6 = 36 cm, but the tank is only 35 cm tall.\n\n(Or: the empty space is 50 × 30 × 5 = 7500 cm³ = 7.5 litres, and 9 litres is more than 7.5 litres, so about 1.5 litres spills over.)",
        markScheme: [
          {
            point: "Converts 9 litres to 9000 cm³ (or the empty space to litres)",
            keywords: ["9000", "1000", "litre"],
          },
          {
            point: "Finds the rise of 6 cm, or the empty space of 7500 cm³ (7.5 litres)",
            keywords: ["6 cm", "rise", "7500", "7.5", "space"],
          },
          {
            point: "Correct conclusion: 36 cm is more than 35 cm (or 9 L > 7.5 L), so it overflows and Ravi is wrong",
            keywords: ["36", "overflow", "spill", "wrong", "more than", "1.5"],
          },
        ],
        solutions: [
          {
            label: "How far would the water rise?",
            steps: ["Base area 50 × 30 = 1500 cm².", "9000 cm³ ÷ 1500 cm² = 6 cm rise.", "30 + 6 = 36 cm > 35 cm: it overflows."],
          },
          {
            label: "How much room is left?",
            steps: ["Empty part: 50 × 30 × (35 − 30) = 7500 cm³ = 7.5 litres.", "9 litres > 7.5 litres: it overflows, and about 1.5 litres spills."],
          },
        ],
        commonError: "Comparing 9 litres with a volume in cm³ without converting — or trusting that '5 cm of space' sounds like plenty.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "How much room is left above the water? Work it out in cm³.",
          "The empty part is a cuboid too: 50 cm × 30 cm × (35 − 30) cm.",
          "1 litre = 1000 cm³. Compare the empty space with 9 litres.",
        ],
        strategy: "Check units",
      },
      // ------------------------------------------------------------- q14
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q14",
        question:
          "A splash pad at a park is made from two 12 m by 4 m rectangles that cross at right angles, meeting at their centres, as shown. A low fence costing $35 per metre goes all the way round its edge, and rubber matting costing $20 per m² covers its surface. Find the total cost of the fence and the matting, in dollars.",
        diagram: `<svg viewBox="0 0 320 265" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A plus-shaped splash pad made from two 12 m by 4 m rectangles crossing at their centres. Dashed lines show the square where they overlap."><rect x="0" y="0" width="320" height="265" fill="#ffffff"/><polygon points="120,30 180,30 180,90 240,90 240,150 180,150 180,210 120,210 120,150 60,150 60,90 120,90" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="90" x2="180" y2="90" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/><line x1="120" y1="150" x2="180" y2="150" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/><line x1="120" y1="90" x2="120" y2="150" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/><line x1="180" y1="90" x2="180" y2="150" stroke="#334155" stroke-width="1" stroke-dasharray="4,4"/><line x1="60" y1="232" x2="240" y2="232" stroke="#334155" stroke-width="1.5"/><line x1="60" y1="226" x2="60" y2="238" stroke="#334155" stroke-width="1.5"/><line x1="240" y1="226" x2="240" y2="238" stroke="#334155" stroke-width="1.5"/><text x="150" y="254" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 m</text><line x1="262" y1="30" x2="262" y2="210" stroke="#334155" stroke-width="1.5"/><line x1="256" y1="30" x2="268" y2="30" stroke="#334155" stroke-width="1.5"/><line x1="256" y1="210" x2="268" y2="210" stroke="#334155" stroke-width="1.5"/><text x="272" y="124" font-size="13" font-family="sans-serif" fill="#1f2937">12 m</text><text x="54" y="125" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 m</text><text x="150" y="23" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 m</text></svg>`,
        answer: { type: "number", value: 3280, display: "$3280" },
        traps: [
          {
            spec: { type: "number", value: 3600 },
            feedback:
              "Your area is 96 m², which counts the 4 m × 4 m centre square twice (once in each rectangle). The pad is 48 + 48 − 16 = 80 m².",
          },
          {
            spec: { type: "number", value: 3840 },
            feedback:
              "A 64 m fence adds the perimeters of both rectangles — but where they cross, those edges are inside the pad. Walk round the outside: 12 edges of 4 m = 48 m.",
          },
        ],
        solution: [
          "The rectangles overlap in a 4 m by 4 m square. Each arm sticks out (12 − 4) ÷ 2 = 4 m beyond it, so all 12 edges of the cross are 4 m long.",
          "Perimeter = 12 × 4 = 48 m. Fence: 48 × 35 = $1680.",
          "Area = 5 squares of 4 m × 4 m = 5 × 16 = 80 m². (Or 48 + 48 − 16 = 80: the centre square was counted twice.)",
          "Matting: 80 × 20 = $1600.",
          "Total: 1680 + 1600 = $3280.",
        ],
        commonError: "Double-counting the overlap in the area, or adding the two rectangles' perimeters.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Where do the two rectangles overlap? What shape is the overlap?",
          "The overlap is a 4 m by 4 m square. How far does each arm stick out beyond it?",
          "Every edge of the cross is 4 m long. Count the edges for the fence, and count 4 m by 4 m squares for the matting.",
        ],
        strategy: "Split into cases",
      },
      // ------------------------------------------------------------- q15
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q15",
        question:
          "A community garden collects rainwater in a cylindrical tank with radius 0.5 m and height 1.2 m. How many litres does the tank hold when full? Use the π button on your calculator, and remember that 1 m³ = 1000 litres. Give your answer to the nearest litre.",
        answer: { type: "number", value: 942, tolerance: 1, display: "942 litres" },
        traps: [
          {
            spec: { type: "number", value: 3770, tolerance: 2 },
            feedback: "That uses a radius of 1 m. The radius is 0.5 m, so the circle's area is {{pi * 0.5^2 = 0.25 pi}} m².",
          },
          {
            spec: { type: "number", value: 0.942, tolerance: 0.01 },
            feedback: "0.942 is the volume in m³. Multiply by 1000 to change m³ into litres.",
          },
        ],
        solution: [
          "A cylinder is a prism: volume = area of the circle × height.",
          "Area of the circle: {{pi * 0.5^2 = 0.25 pi}} m².",
          "Volume: 0.25π × 1.2 = 0.3π = 0.9424… m³.",
          "In litres: 0.9424… × 1000 = 942.4… ≈ 942 litres.",
        ],
        commonError: "Using the diameter as the radius, or forgetting to square the radius.",
        difficulty: "core",
        guideRef: "cylinders",
        hints: [
          "A cylinder is a prism with a circular cross-section. What is the area of that circle?",
          "Volume = {{pi r^2 h}} with r = 0.5 and h = 1.2.",
          "Your volume is in m³. Multiply by 1000 to get litres.",
        ],
        strategy: "Make it simpler",
      },
      // ------------------------------------------------------------- q16
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q16",
        question:
          "A set of concrete steps is a prism. Its side view (the cross-section) is the staircase shape shown: three steps, each 30 cm deep and 15 cm high. The steps are 1.2 m wide. How many cubic metres of concrete are needed to make them?",
        diagram: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of three concrete steps. Each tread is 30 cm deep and each riser is 15 cm high, making a staircase shape 90 cm deep and 45 cm high."><rect x="0" y="0" width="360" height="230" fill="#ffffff"/><polygon points="50,200 320,200 320,65 230,65 230,110 140,110 140,155 50,155" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="95" y="148" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">30 cm</text><text x="185" y="103" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">30 cm</text><text x="275" y="58" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">30 cm</text><text x="56" y="182" font-size="12" font-family="sans-serif" fill="#1f2937">15 cm</text><text x="146" y="137" font-size="12" font-family="sans-serif" fill="#1f2937">15 cm</text><text x="236" y="92" font-size="12" font-family="sans-serif" fill="#1f2937">15 cm</text><text x="185" y="220" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">side view</text></svg>`,
        answer: { type: "number", value: 0.324, display: "0.324 m³" },
        traps: [
          {
            spec: { type: "number", value: 0.486 },
            feedback:
              "0.486 m³ uses the whole 90 cm × 45 cm rectangle. The staircase is missing the empty space above the lower steps: its area is 2700 cm², not 4050 cm².",
          },
          {
            spec: { type: "number", value: 324000 },
            feedback: "324 000 is the volume in cm³. 1 m³ = 100 × 100 × 100 = 1 000 000 cm³, so divide by 1 000 000.",
          },
        ],
        solution: [
          "Split the cross-section into three columns, each 30 cm wide: 15 cm, 30 cm and 45 cm tall.",
          "Area = 30 × 15 + 30 × 30 + 30 × 45 = 450 + 900 + 1350 = 2700 cm².",
          "Width 1.2 m = 120 cm. Volume = 2700 × 120 = 324 000 cm³.",
          "1 m³ = 1 000 000 cm³, so the volume is 324 000 ÷ 1 000 000 = 0.324 m³.",
        ],
        solutions: [
          {
            label: "Work in metres from the start",
            steps: [
              "Cross-section: 0.3 × 0.15 + 0.3 × 0.3 + 0.3 × 0.45 = 0.045 + 0.09 + 0.135 = 0.27 m².",
              "Volume: 0.27 × 1.2 = 0.324 m³. No conversion needed at the end — quicker if you are confident with decimals.",
            ],
          },
        ],
        commonError: "Dividing by 100 or 1000 to change cm³ to m³ — it takes 1 000 000 cm³ to make 1 m³.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "The cross-section is a compound shape. Split it into rectangles.",
          "Three columns, each 30 cm wide, and 15 cm, 30 cm and 45 cm tall. Then multiply by the width.",
          "Put every length in the same unit. 1 m³ = 100 cm × 100 cm × 100 cm.",
        ],
        strategy: "Split into cases",
      },
      // ------------------------------------------------------------- q17
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q17",
        question:
          "A classic football is stitched together from 12 pentagons and 20 hexagons. Every seam joins exactly two panels. Think of the ball as a polyhedron: the panels are faces, the seams are edges and the points where seams meet are vertices. How many edges and how many vertices does it have? Give E first, then V.",
        answer: { type: "list", values: [90, 60], ordered: true, display: "E = 90, V = 60" },
        traps: [
          {
            spec: { type: "list", values: [180, 150], ordered: true },
            feedback: "180 counts every seam twice — each seam is an edge of two panels. Halve it to get E = 90.",
          },
          {
            spec: { type: "list", values: [60, 90], ordered: true },
            feedback: "Right numbers, wrong order: give the edges (90) first, then the vertices (60).",
          },
        ],
        solution: [
          "Count the edges of all the panels separately: 12 × 5 + 20 × 6 = 60 + 120 = 180.",
          "Every seam is shared by two panels, so it has been counted twice: E = 180 ÷ 2 = 90.",
          "F = 12 + 20 = 32. Euler: V + F − E = 2, so V = 2 − 32 + 90 = 60.",
        ],
        solutions: [
          {
            label: "Count the corners directly",
            steps: [
              "The panels have 180 corners between them.",
              "At every vertex of the ball, 3 panels meet (one pentagon and two hexagons), so each vertex is counted 3 times.",
              "V = 180 ÷ 3 = 60 — the same answer, which confirms Euler's formula.",
            ],
          },
        ],
        commonError: "Forgetting that each seam belongs to two panels.",
        difficulty: "challenge",
        guideRef: "nets-and-euler",
        hints: [
          "Count the edges of all 32 panels as if they were separate. How many is that?",
          "When two panels are stitched together, two panel edges become one seam. So your count is double.",
          "You now know F and E. Which formula gives V?",
        ],
        strategy: "Count in two ways",
      },
      // ------------------------------------------------------------- q18
      {
        kind: "short",
        id: "perimeter-area-volume-p3-q18",
        question:
          "A shop packs 12 cube-shaped soaps, each with edges of 2 cm, into a closed cuboid box. The soaps fill the box exactly, with no gaps. Different boxes are possible, depending on how the soaps are arranged. What is the smallest possible surface area of the box, in cm²?",
        answer: { type: "number", value: 128, display: "128 cm²" },
        traps: [
          {
            spec: { type: "number", value: 152 },
            feedback: "152 cm² is the 2 × 6 × 8 cm box — good, but not the best. Try stacking the soaps two deep in two directions.",
          },
          {
            spec: { type: "number", value: 32 },
            feedback: "32 is the number of soap faces showing on the outside. Each soap face is 2 cm × 2 cm = 4 cm².",
          },
        ],
        solution: [
          "The soaps can be arranged as 1 × 1 × 12, 1 × 2 × 6, 1 × 3 × 4 or 2 × 2 × 3 (these are all the ways to multiply three whole numbers to make 12).",
          "Multiply by 2 for the box in cm: 2 × 2 × 24, 2 × 4 × 12, 2 × 6 × 8 and 4 × 4 × 6.",
          "Surface areas with {{2(lw + lh + wh)}}: 2(4 + 48 + 48) = 200, 2(8 + 24 + 48) = 160, 2(12 + 16 + 48) = 152, 2(16 + 24 + 24) = 128.",
          "The smallest is 128 cm², from the 4 cm × 4 cm × 6 cm box — the one closest to a cube.",
        ],
        commonError: "Stopping after one or two arrangements instead of checking them all.",
        difficulty: "challenge",
        guideRef: "surface-area",
        hints: [
          "List every way to arrange 12 soaps as a cuboid: a × b × c = 12.",
          "There are four arrangements. Turn each into box measurements in cm by doubling.",
          "Work out {{2(lw + lh + wh)}} for each. Which box is closest to a cube?",
        ],
        strategy: "Work systematically",
      },
      // ------------------------------------------------------------- q19
      {
        kind: "written",
        id: "perimeter-area-volume-p3-q19",
        question:
          "A solid is built from 1 cm cubes on a 3 by 3 square grid, with at least one cube on every square.\n\n- From the **front**, the tallest stacks in the left, middle and right columns are 3, 1 and 2 cubes high.\n- From the **side**, the tallest stacks in the back, middle and front rows are 2, 3 and 1 cubes high.\n\nWhat is the greatest number of cubes the solid could contain, and what is the least? Explain how you know.",
        marks: 3,
        modelAnswer:
          "**Greatest.** A stack can be no taller than the tallest stack its column shows *or* its row shows, so each stack is at most the smaller of the two. Making every stack as tall as that:\n\n| Plan | Left | Middle | Right |\n|---|---|---|---|\n| Back | 2 | 1 | 2 |\n| Middle | 3 | 1 | 2 |\n| Front | 1 | 1 | 1 |\n\nTotal 5 + 6 + 3 = **14** cubes, and both views are still correct.\n\n**Least.** Every square needs at least 1 cube: 9 cubes. A stack of 3 must be in the left column *and* the middle row, so it adds 2 more. The right column and the back row each need a stack of 2 — one stack in the back-right corner does both jobs, adding 1 more.\n\n| Plan | Left | Middle | Right |\n|---|---|---|---|\n| Back | 1 | 1 | 2 |\n| Middle | 3 | 1 | 1 |\n| Front | 1 | 1 | 1 |\n\nTotal 9 + 2 + 1 = **12** cubes.",
        markScheme: [
          {
            point: "Greatest is 14: each stack is the smaller of its row limit and its column limit",
            keywords: ["14", "smaller", "lower", "limit", "at most"],
          },
          {
            point: "Least is 12",
            keywords: ["12"],
          },
          {
            point: "Explains the least: 9 cubes minimum (one per square), the 3-stack in the left column/middle row, and one 2-stack that serves both the back row and right column",
            keywords: ["9", "at least one", "every square", "both", "back right", "corner"],
          },
        ],
        commonError: "Forgetting that every square must have at least one cube, or not noticing that one stack can satisfy a row and a column at once.",
        difficulty: "challenge",
        guideRef: "plans-elevations",
        hints: [
          "Draw a 3 by 3 plan. Which two views limit each square?",
          "A stack can't be taller than the tallest stack shown for its row, or for its column.",
          "For the least: start with 1 cube on every square. Which stacks *must* be taller? Can one stack do two jobs?",
        ],
        strategy: "Consider extremes",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "written",
        id: "perimeter-area-volume-p3-q20",
        question:
          "A garden trough is a prism 2 m long. Its cross-section is an upside-down isosceles triangle, 40 cm wide across the top and 30 cm deep, as shown. Rain has filled it to a depth of 15 cm.\n\nArjun says: 'The water is half as deep as the trough, so the trough is half full.'\n\nIs Arjun right? Find how many litres of water are in the trough, and explain your answer.",
        diagram: `<svg viewBox="0 0 420 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End view of a trough: an upside-down isosceles triangle 40 cm wide across the top and 30 cm deep. Water fills the bottom of the triangle to a depth of 15 cm."><rect x="0" y="0" width="420" height="250" fill="#ffffff"/><polygon points="90,40 330,40 210,220" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><polygon points="150,130 270,130 210,220" fill="#bae6fd" stroke="#334155" stroke-width="1.5"/><text x="210" y="30" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">40 cm</text><text x="210" y="162" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">water</text><line x1="350" y1="40" x2="350" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="344" y1="40" x2="356" y2="40" stroke="#334155" stroke-width="1.5"/><line x1="344" y1="220" x2="356" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="333" y1="40" x2="344" y2="40" stroke="#334155" stroke-width="1" stroke-dasharray="3,3"/><line x1="216" y1="220" x2="344" y2="220" stroke="#334155" stroke-width="1" stroke-dasharray="3,3"/><text x="360" y="134" font-size="13" font-family="sans-serif" fill="#1f2937">30 cm</text><line x1="100" y1="130" x2="100" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="94" y1="130" x2="106" y2="130" stroke="#334155" stroke-width="1.5"/><line x1="94" y1="220" x2="106" y2="220" stroke="#334155" stroke-width="1.5"/><line x1="106" y1="130" x2="147" y2="130" stroke="#334155" stroke-width="1" stroke-dasharray="3,3"/><line x1="106" y1="220" x2="204" y2="220" stroke="#334155" stroke-width="1" stroke-dasharray="3,3"/><text x="92" y="180" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">15 cm</text><text x="210" y="243" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#334155">end view of the trough</text></svg>`,
        marks: 4,
        modelAnswer:
          "Arjun is wrong: the trough is only a quarter full.\n\nThe sloping sides are straight, so halfway up from the bottom point the trough is half as wide as it is at the top. The water's surface is therefore half of 40 cm = 20 cm wide.\n\nTrough cross-section: {{1/2 * 40 * 30 = 600}} cm². Water cross-section: {{1/2 * 20 * 15 = 150}} cm², which is {{1/4}} of 600.\n\nThe water runs the whole 200 cm length of the trough, so its volume is 150 × 200 = 30 000 cm³ = **30 litres**. The full trough holds 600 × 200 = 120 000 cm³ = 120 litres, so it is a quarter full, not half full.\n\nHalving the depth also halves the width, so the cross-section's area is multiplied by {{1/2 * 1/2 = 1/4}}. Arjun's idea only works when the sides are vertical, as in a cuboid tank.",
        markScheme: [
          {
            point: "The water's surface is 20 cm wide (half of 40 cm), because the sides are straight",
            keywords: ["20", "half as wide", "halfway", "width", "half of 40"],
          },
          {
            point: "Cross-section areas: 600 cm² for the trough and 150 cm² for the water",
            keywords: ["600", "150"],
          },
          {
            point: "Water volume 30 000 cm³ = 30 litres (the full trough holds 120 litres)",
            keywords: ["30000", "30 000", "30 litres", "30 l", "120"],
          },
          {
            point: "Conclusion: only a quarter full, not half, so Arjun is wrong — the depth and the width are both halved",
            keywords: ["quarter", "1/4", "wrong", "not half", "both", "width"],
          },
        ],
        solutions: [
          {
            label: "Work out both volumes",
            steps: [
              "Water surface: half of 40 cm = 20 cm wide.",
              "Areas: trough {{1/2 * 40 * 30 = 600}} cm², water {{1/2 * 20 * 15 = 150}} cm².",
              "Volumes: 600 × 200 = 120 000 cm³ = 120 litres, and 150 × 200 = 30 000 cm³ = 30 litres.",
              "30 litres is a quarter of 120 litres, not a half.",
            ],
          },
          {
            label: "Cut into four (no big numbers)",
            steps: [
              "Join the midpoints of the triangle's three sides. This cuts it into 4 identical triangles.",
              "The water is exactly the bottom one of the four, so it fills {{1/4}} of the cross-section, and so {{1/4}} of the trough.",
              "A quarter of 120 litres is 30 litres. The picture shows *why* it is a quarter, not just *that* it is.",
            ],
          },
        ],
        commonError: "Assuming half the depth means half the volume. That only works when the sides are vertical, like a cuboid tank — here the water is narrower as well as shallower.",
        difficulty: "challenge",
        guideRef: "volume",
        hints: [
          "Halfway down a straight sloping side, how wide is the trough?",
          "The water's cross-section is a smaller upside-down triangle: 15 cm deep and 20 cm across the top.",
          "Compare {{1/2 * 20 * 15}} with {{1/2 * 40 * 30}}. Then multiply by the length (200 cm) and use 1000 cm³ = 1 litre.",
        ],
        strategy: "Draw a diagram",
      },
    ],
  },

  // =========================================================================
  // PRACTICE PAPER 4 — exam style
  // =========================================================================
  {
    id: "perimeter-area-volume-p4",
    title: "Practice Paper 4 — Exam style",
    questions: [
      // ------------------------------------------------------------- q01
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q01",
        question:
          "The diagram shows triangle ABC. The base AC is 9 cm and the perpendicular height is 4 cm. The other two sides are 5 cm and 7.2 cm. Find the area of the triangle in cm², then its perimeter in cm. Give the area first.",
        diagram: `<svg viewBox="0 0 340 215" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle ABC with base AC of 9 cm, a dashed perpendicular height of 4 cm from B to AC, side AB of 5 cm and side BC of 7.2 cm."><rect x="0" y="0" width="340" height="215" fill="#ffffff"/><polygon points="60,180 285,180 135,80" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="135" y1="80" x2="135" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5,4"/><polyline points="135,170 145,170 145,180" fill="none" stroke="#334155" stroke-width="1.5"/><text x="50" y="194" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">A</text><text x="135" y="72" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">B</text><text x="295" y="194" font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937">C</text><text x="172" y="200" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9 cm</text><text x="141" y="140" font-size="13" font-family="sans-serif" fill="#1f2937">4 cm</text><text x="90" y="126" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">5 cm</text><text x="218" y="124" font-size="13" font-family="sans-serif" fill="#1f2937">7.2 cm</text></svg>`,
        answer: { type: "list", values: [18, 21.2], ordered: true, display: "18 cm², 21.2 cm" },
        traps: [
          {
            spec: { type: "list", values: [36, 21.2], ordered: true },
            feedback: "36 cm² is the whole 9 × 4 rectangle. A triangle is half of it.",
          },
          {
            spec: { type: "list", values: [22.5, 21.2], ordered: true },
            feedback: "22.5 cm² uses the 5 cm side as the height. The height must be perpendicular to the base — that's the dashed 4 cm line.",
          },
        ],
        solution: [
          "Area = {{1/2}} × base × perpendicular height = {{1/2 * 9 * 4 = 18}} cm².",
          "Perimeter = 9 + 5 + 7.2 = 21.2 cm.",
        ],
        commonError: "Using a sloping side as the height.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: [
          "Which length meets the base at a right angle?",
          "Area = {{1/2}} × base × perpendicular height. Perimeter = all three sides added.",
        ],
      },
      // ------------------------------------------------------------- q02
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q02",
        question:
          "The diagram shows a parallelogram. Find its area in cm², then its perimeter in cm. Give the area first.",
        diagram: `<svg viewBox="0 0 380 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A parallelogram with a base of 12 cm, sloping sides of 6.5 cm and a dashed perpendicular height of 5 cm."><rect x="0" y="0" width="380" height="225" fill="#ffffff"/><polygon points="50,190 266,190 341,100 125,100" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="125" y1="100" x2="125" y2="190" stroke="#334155" stroke-width="1.5" stroke-dasharray="5,4"/><polyline points="125,180 135,180 135,190" fill="none" stroke="#334155" stroke-width="1.5"/><text x="158" y="208" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text><text x="80" y="146" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">6.5 cm</text><text x="140" y="150" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text></svg>`,
        answer: { type: "list", values: [60, 37], ordered: true, display: "60 cm², 37 cm" },
        traps: [
          {
            spec: { type: "list", values: [78, 37], ordered: true },
            feedback: "78 = 12 × 6.5 uses the sloping side. A parallelogram's area needs the perpendicular height, 5 cm.",
          },
          {
            spec: { type: "list", values: [60, 18.5], ordered: true },
            feedback: "18.5 cm only goes half-way round. There are two 12 cm sides and two 6.5 cm sides.",
          },
        ],
        solution: [
          "Area = base × perpendicular height = 12 × 5 = 60 cm².",
          "Perimeter = 2 × (12 + 6.5) = 2 × 18.5 = 37 cm. The 5 cm height is not a side, so it isn't part of the perimeter.",
        ],
        commonError: "Swapping the roles of the lengths: slant side for area, height for perimeter.",
        difficulty: "warmup",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Area of a parallelogram = base × perpendicular height.",
          "For the perimeter you need the sides you would walk along: two 12 cm sides and two 6.5 cm sides.",
        ],
      },
      // ------------------------------------------------------------- q03
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q03",
        question:
          "Copy and complete the table.\n\n| Solid | Faces F | Vertices V | Edges E |\n|---|---|---|---|\n| Triangular prism | 5 | 6 | ? |\n| Square-based pyramid | ? | 5 | 8 |\n| Hexagonal pyramid | 7 | ? | 12 |\n\nGive the three missing numbers in order: the edges of the triangular prism, the faces of the square-based pyramid, then the vertices of the hexagonal pyramid.",
        answer: { type: "list", values: [9, 5, 7], ordered: true, display: "9, 5, 7" },
        traps: [
          {
            spec: { type: "list", values: [9, 4, 7], ordered: true },
            feedback: "A square-based pyramid has 4 triangles *and* the square base: 5 faces.",
          },
          {
            spec: { type: "list", values: [9, 5, 6], ordered: true },
            feedback: "Don't forget the apex: 6 corners round the hexagon + 1 at the top = 7 vertices.",
          },
        ],
        solution: [
          "Triangular prism: 3 edges on each triangle + 3 joining them = 9. (Euler: 6 + 5 − E = 2 gives E = 9.)",
          "Square-based pyramid: 1 square + 4 triangles = 5 faces. (Euler: 5 + F − 8 = 2 gives F = 5.)",
          "Hexagonal pyramid: 6 corners of the hexagon + 1 apex = 7 vertices. (Euler: V + 7 − 12 = 2 gives V = 7.)",
        ],
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: [
          "You can picture each solid and count — or use {{V + F - E = 2}} on each row.",
          "Triangular prism: 6 + 5 − E = 2.",
        ],
        strategy: "Check by substituting",
      },
      // ------------------------------------------------------------- q04
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q04",
        question:
          "A solid has these three views:\n\n- **Plan** (from above): a rectangle with a line along its middle.\n- **Front elevation**: a rectangle.\n- **Side elevation**: an isosceles triangle.\n\nName the solid.",
        answer: {
          type: "text",
          accept: [
            "triangular prism",
            "a triangular prism",
            "triangle prism",
            "triangular-based prism",
            "triangular based prism",
            "isosceles triangular prism",
            "an isosceles triangular prism",
          ],
          display: "triangular prism",
        },
        traps: [
          {
            spec: {
              type: "text",
              accept: ["square-based pyramid", "square based pyramid", "pyramid", "a pyramid", "rectangular pyramid", "rectangle-based pyramid"],
            },
            feedback: "A pyramid's front *and* side elevations would both be triangles. Here the front view is a rectangle.",
          },
          {
            spec: { type: "text", accept: ["cuboid", "a cuboid"] },
            feedback: "A cuboid looks like a rectangle from every direction. The triangle in the side view rules it out.",
          },
        ],
        solution: [
          "The side view is a triangle, so the solid has a triangular end.",
          "The front view is a rectangle, so that triangle runs the whole length unchanged — it is a prism.",
          "From above you see the two sloping faces meeting at the ridge, which is the line along the middle of the plan.",
          "It is a triangular prism lying on one rectangular face, like a tent.",
        ],
        difficulty: "warmup",
        guideRef: "plans-elevations",
        hints: [
          "Which solid looks like a triangle from the end but a rectangle from the front?",
          "Think of a tent, or a chocolate box with triangular ends.",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q05
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q05",
        question:
          "Hana's water container is a cube. Its inside edges are 30 cm long. How many litres of water does it hold when full?",
        answer: { type: "number", value: 27, display: "27 litres" },
        traps: [
          { spec: { type: "number", value: 27000 }, feedback: "27 000 is the volume in cm³. 1000 cm³ = 1 litre, so divide by 1000." },
          { spec: { type: "number", value: 900 }, feedback: "900 cm² is the area of one face. A cube's volume is edge × edge × edge." },
        ],
        solution: ["Volume = 30 × 30 × 30 = 27 000 cm³.", "1000 cm³ = 1 litre, so the container holds 27 000 ÷ 1000 = 27 litres."],
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["Volume of a cube = edge × edge × edge.", "1000 cm³ = 1 litre."],
      },
      // ------------------------------------------------------------- q06
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q06",
        question:
          "A rectangle measures 9 cm by 4 cm. A triangle has exactly the same area as the rectangle, and its base is 12 cm. Find the perpendicular height of the triangle, in cm.",
        answer: { type: "number", value: 6, display: "6 cm" },
        traps: [
          {
            spec: { type: "number", value: 3 },
            feedback: "12 × 3 = 36 forgets the {{1/2}} in the triangle formula. With h = 3 the triangle would only be 18 cm².",
          },
        ],
        solution: [
          "Area of the rectangle: 9 × 4 = 36 cm².",
          "Triangle: {{1/2 * 12 * h = 36}}, so 6h = 36.",
          "h = 36 ÷ 6 = 6 cm.",
          "Check: {{1/2 * 12 * 6 = 36}} ✓",
        ],
        commonError: "Leaving out the {{1/2}} when working backwards from a triangle's area.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "First find the area that both shapes share.",
          "Write an equation: {{1/2 * 12 * h = 36}}.",
          "{{1/2 * 12 = 6}}, so 6h = 36.",
        ],
        strategy: "Use the inverse",
      },
      // ------------------------------------------------------------- q07
      {
        kind: "written",
        id: "perimeter-area-volume-p4-q07",
        question:
          "Ravi works out the area of this trapezium like this:\n\n    {{1/2 * (6 + 12) * 5 = 45}} cm²\n\nIs Ravi right? Explain any mistake, and find the correct area.",
        diagram: `<svg viewBox="0 0 360 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="An isosceles trapezium with parallel sides of 6 cm on top and 12 cm on the bottom, sloping sides of 5 cm and a dashed perpendicular height of 4 cm."><rect x="0" y="0" width="360" height="225" fill="#ffffff"/><polygon points="60,190 300,190 240,110 120,110" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="110" x2="120" y2="190" stroke="#334155" stroke-width="1.5" stroke-dasharray="5,4"/><polyline points="120,180 130,180 130,190" fill="none" stroke="#334155" stroke-width="1.5"/><text x="180" y="102" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="180" y="208" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text><text x="84" y="146" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">5 cm</text><text x="278" y="146" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text><text x="126" y="155" font-size="13" font-family="sans-serif" fill="#1f2937">4 cm</text></svg>`,
        marks: 3,
        modelAnswer:
          "Ravi is not right. He used 5 cm, which is the length of a sloping side. The h in {{1/2 (a + b) h}} is the **perpendicular** distance between the parallel sides, which is 4 cm.\n\nCorrect area: {{1/2 * (6 + 12) * 4 = 1/2 * 18 * 4 = 36}} cm².\n\nRavi's answer is too big because a sloping side is always longer than the perpendicular gap between the parallel sides.",
        markScheme: [
          {
            point: "Says Ravi is wrong because 5 cm is the sloping side, not the perpendicular height",
            keywords: ["sloping", "slant", "perpendicular", "not the height", "wrong"],
          },
          {
            point: "Uses the perpendicular height of 4 cm",
            keywords: ["4 cm", "height is 4", "× 4", "x 4", "* 4"],
          },
          {
            point: "Correct area of 36 cm²",
            keywords: ["36"],
          },
        ],
        commonError: "Agreeing with Ravi because the parallel sides were added correctly — the height is the error.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "In the formula {{1/2 (a + b) h}}, what exactly does h measure?",
          "h must meet the parallel sides at right angles. Which length in the diagram does that?",
          "Redo the calculation with the 4 cm height.",
        ],
        strategy: "Spot the error",
      },
      // ------------------------------------------------------------- q08
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q08",
        question:
          "This T-shape is symmetrical, and all its corners are right angles. Find its perimeter in cm, then its area in cm². Give the perimeter first.",
        diagram: `<svg viewBox="0 0 360 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A symmetrical T-shape. The top bar is 14 cm wide and 4 cm tall. The stem below it is 6 cm wide and 8 cm tall."><rect x="0" y="0" width="360" height="230" fill="#ffffff"/><polygon points="80,30 276,30 276,86 220,86 220,198 136,198 136,86 80,86" fill="#fecaca" stroke="#1f2937" stroke-width="2"/><text x="178" y="22" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">14 cm</text><text x="72" y="63" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">4 cm</text><text x="228" y="146" font-size="13" font-family="sans-serif" fill="#1f2937">8 cm</text><text x="178" y="216" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text></svg>`,
        answer: { type: "list", values: [52, 104], ordered: true, display: "52 cm, 104 cm²" },
        traps: [
          {
            spec: { type: "list", values: [44, 104], ordered: true },
            feedback: "You've missed the two short edges underneath the top bar (4 cm each). Walk all the way round and count every edge.",
          },
          {
            spec: { type: "list", values: [52, 168], ordered: true },
            feedback: "168 cm² is the full 14 cm × 12 cm rectangle round the T. Subtract the two empty corners, each 4 cm by 8 cm.",
          },
        ],
        solution: [
          "Missing lengths: the bar overhangs the stem by (14 − 6) ÷ 2 = 4 cm on each side, and by symmetry the right end of the bar is also 4 cm.",
          "Perimeter: 14 + 4 + 4 + 8 + 6 + 8 + 4 + 4 = 52 cm.",
          "Check: the T fits in a 14 cm by 12 cm rectangle with only corners cut away, so its perimeter is 2 × (14 + 12) = 52 cm ✓",
          "Area: top bar 14 × 4 = 56 cm², stem 6 × 8 = 48 cm², total 104 cm².",
          "Check: 14 × 12 − 2 × (4 × 8) = 168 − 64 = 104 ✓",
        ],
        commonError: "Missing unlabelled edges when adding up the perimeter.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Label every edge before you add. Which ones have no length written on them?",
          "The overhang on each side of the stem is (14 − 6) ÷ 2.",
          "For the area, split the T into the top bar and the stem.",
        ],
        strategy: "Use symmetry",
      },
      // ------------------------------------------------------------- q09
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q09",
        question:
          "Aisha makes a closed card model of a square-based pyramid. Its base edges are 18 cm, the slant height of each triangular face is 15 cm, and the vertical height of the pyramid is 12 cm. How much card does she need for the outside of the model, in cm²? (Ignore any flaps for glue.)",
        diagram: `<svg viewBox="0 0 400 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A square-based pyramid with base edges of 18 cm. A blue line on the right-hand face shows the slant height of 15 cm, and a red dashed line from the apex to the centre of the base shows the vertical height of 12 cm."><rect x="0" y="0" width="400" height="230" fill="#ffffff"/><polygon points="190,32 40,190 240,190" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><polygon points="190,32 240,190 340,140" fill="#fcd34d" stroke="#1f2937" stroke-width="2"/><line x1="190" y1="32" x2="190" y2="165" stroke="#b91c1c" stroke-width="1.5" stroke-dasharray="4,3"/><line x1="190" y1="32" x2="290" y2="165" stroke="#1d4ed8" stroke-width="2"/><text x="184" y="118" font-size="12" font-family="sans-serif" text-anchor="end" fill="#b91c1c">12 cm</text><text x="268" y="132" font-size="12" font-family="sans-serif" fill="#1d4ed8">15 cm</text><text x="140" y="210" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">18 cm</text><text x="300" y="184" font-size="13" font-family="sans-serif" fill="#1f2937">18 cm</text></svg>`,
        answer: { type: "number", value: 864, display: "864 cm²" },
        traps: [
          {
            spec: { type: "number", value: 756 },
            feedback: "756 cm² uses the vertical height (12 cm) for the triangles. Each triangle's own height is the slant height, 15 cm.",
          },
          {
            spec: { type: "number", value: 1404 },
            feedback: "Each triangular face is {{1/2 * 18 * 15 = 135}} cm², not 270 cm². Don't forget the {{1/2}}.",
          },
          {
            spec: { type: "number", value: 540 },
            feedback: "540 cm² is just the four triangles. The model is closed, so add the 18 cm by 18 cm square base.",
          },
        ],
        solution: [
          "Base: 18 × 18 = 324 cm².",
          "One triangular face: {{1/2 * 18 * 15 = 135}} cm². The slant height is the height of the triangle itself.",
          "Four faces: 4 × 135 = 540 cm².",
          "Total: 324 + 540 = 864 cm². The vertical height (12 cm) is not needed.",
        ],
        commonError: "Using the vertical height of the pyramid instead of the slant height of a face.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Sketch the net: one square and four triangles.",
          "Each triangle has a base of 18 cm. Which height lies flat on the triangle itself?",
          "One triangle is {{1/2 * 18 * 15}} cm². Then add the square base.",
        ],
        strategy: "Sketch the net",
      },
      // ------------------------------------------------------------- q10
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q10",
        question:
          "A wooden ramp for a model railway is a triangular prism with a volume of 168 cm³. Its cross-section is a right-angled triangle, with the right angle between sides of 6 cm and 4 cm. Find the length of the prism, in cm.",
        answer: { type: "number", value: 14, display: "14 cm" },
        traps: [
          {
            spec: { type: "number", value: 7 },
            feedback: "That treats the cross-section as 6 × 4 = 24 cm². It is a triangle, so its area is {{1/2 * 6 * 4 = 12}} cm².",
          },
        ],
        solution: [
          "Area of the cross-section: {{1/2 * 6 * 4 = 12}} cm².",
          "Volume = area of cross-section × length, so 12 × L = 168.",
          "L = 168 ÷ 12 = 14 cm.",
          "Check: 12 × 14 = 168 ✓",
        ],
        commonError: "Forgetting to halve when finding the triangle's area.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "Volume = area of cross-section × length. Which part can you find straight away?",
          "The cross-section is {{1/2 * 6 * 4}} cm².",
          "Now solve 12 × L = 168.",
        ],
        strategy: "Work backwards",
      },
      // ------------------------------------------------------------- q11
      {
        kind: "written",
        id: "perimeter-area-volume-p4-q11",
        question:
          "Priya says: 'Every prism has an even number of vertices and an even number of edges.'\n\nIs she right? Explain your answer. (A prism whose two end faces have n sides is called an n-sided prism.)",
        marks: 3,
        modelAnswer:
          "She is only half right.\n\n**Vertices:** an n-sided prism has n vertices on each end and no others, so V = 2n. That is always even, so this part is true.\n\n**Edges:** there are n edges round each end, plus n edges joining the two ends, so E = n + n + n = 3n. When n is odd, 3n is odd. For example, a triangular prism has 3 × 3 = 9 edges and a pentagonal prism has 15. So the claim about edges is false.",
        markScheme: [
          {
            point: "V = 2n (n vertices at each end), so the number of vertices is always even",
            keywords: ["2n", "each end", "always even", "double"],
          },
          {
            point: "E = 3n (n + n + n)",
            keywords: ["3n", "n + n + n", "joining"],
          },
          {
            point: "Counterexample: a triangular prism has 9 edges (odd), so Priya is wrong about edges",
            keywords: ["9", "15", "triangular", "pentagonal", "odd", "wrong"],
          },
        ],
        commonError: "Testing only a cube or cuboid (12 edges) and deciding she is right.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "Test a triangular prism: count its vertices and its edges.",
          "For an n-sided prism, how many vertices are on each end? How many edges join the two ends?",
          "Is 3n always even?",
        ],
        strategy: "Try small cases",
      },
      // ------------------------------------------------------------- q12
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q12",
        question:
          "An architect's plan of a sports hall is drawn to a scale of 1 : 200, so 1 cm on the plan stands for 200 cm (2 m) in real life. On the plan, the hall is a rectangle 7.5 cm by 4 cm. What is the real floor area of the hall, in m²?",
        answer: { type: "number", value: 120, display: "120 m²" },
        traps: [
          { spec: { type: "number", value: 30 }, feedback: "30 cm² is the area on the plan. Scale the lengths up to real metres first." },
          {
            spec: { type: "number", value: 60 },
            feedback: "Doubling the plan area only scales one direction. Both the length and the width are multiplied by 2 m per cm.",
          },
        ],
        solution: [
          "Scale each length: 7.5 cm → 7.5 × 2 = 15 m, and 4 cm → 4 × 2 = 8 m.",
          "Real area = 15 × 8 = 120 m².",
        ],
        commonError: "Finding the area on the plan and multiplying by the scale only once.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Scale the lengths first, then find the area.",
          "7.5 cm on the plan is 7.5 × 2 = 15 m in real life.",
          "The hall is 15 m by 8 m.",
        ],
        strategy: "Make it simpler",
      },
      // ------------------------------------------------------------- q13
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q13",
        question:
          "A cuboid box has a volume of 280 cm³. It is 10 cm long and 7 cm wide. Find its height in cm, then its total surface area in cm². Give the height first.",
        answer: { type: "list", values: [4, 276], ordered: true, display: "4 cm, 276 cm²" },
        traps: [
          {
            spec: { type: "list", values: [4, 138], ordered: true },
            feedback: "138 counts each kind of face once. A cuboid has two of each (top and bottom, front and back, two ends), so double it.",
          },
          {
            spec: { type: "list", values: [276, 4], ordered: true },
            feedback: "Right numbers, wrong order: give the height (4 cm) first, then the surface area (276 cm²).",
          },
        ],
        solution: [
          "Base area = 10 × 7 = 70 cm², so 70 × height = 280 and height = 4 cm.",
          "Pairs of faces: 10 × 7 = 70, 10 × 4 = 40, 7 × 4 = 28.",
          "Surface area = 2 × (70 + 40 + 28) = 2 × 138 = 276 cm².",
        ],
        commonError: "Adding one of each face and forgetting the opposite faces.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Volume = length × width × height. What is length × width?",
          "70 × height = 280.",
          "Now use the three pairs of faces: 10 × 7, 10 × 4 and 7 × 4.",
        ],
        strategy: "Work backwards",
      },
      // ------------------------------------------------------------- q14
      {
        kind: "written",
        id: "perimeter-area-volume-p4-q14",
        question:
          "A photo is 10 cm by 15 cm. Marcus enlarges it so that every length is 3 times as long. He says: 'The new photo will need 3 times as much paper.'\n\nIs Marcus right? Explain, using the areas.",
        marks: 3,
        modelAnswer:
          "No. The new photo is 30 cm by 45 cm.\n\nOld area: 10 × 15 = 150 cm². New area: 30 × 45 = 1350 cm². 1350 ÷ 150 = 9, so it needs **9 times** as much paper, not 3.\n\nThis is because the length *and* the width are both multiplied by 3, so the area is multiplied by 3 × 3 = 9. You could fit 9 copies of the old photo, in a 3 by 3 grid, on the new one.",
        markScheme: [
          {
            point: "New dimensions 30 cm by 45 cm",
            keywords: ["30", "45"],
          },
          {
            point: "Areas 150 cm² and 1350 cm²",
            keywords: ["150", "1350"],
          },
          {
            point: "9 times as much (3 × 3), because both lengths are scaled, so Marcus is wrong",
            keywords: ["9", "nine", "3 × 3", "3 x 3", "squared", "both", "wrong"],
          },
        ],
        commonError: "Thinking that area scales by the same factor as length.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Work out the new length and width.",
          "Find both areas and divide to compare them.",
          "Why isn't the answer 3? What happens to the length *and* to the width?",
        ],
        strategy: "Draw a diagram",
      },
      // ------------------------------------------------------------- q15
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q15",
        question:
          "A tin of chickpeas is a cylinder with a diameter of 8 cm and a height of 12 cm. Use the π button on your calculator.\n\n1. Find the volume of the tin, in cm³.\n2. A paper label covers the whole curved surface, with no overlap. Find the area of the label, in cm².\n\nGive the volume, then the label area, both to the nearest whole number.",
        answer: { type: "list", values: [603, 302], ordered: true, tolerance: 1, display: "603 cm³, 302 cm²" },
        traps: [
          {
            spec: { type: "list", values: [2413, 603], ordered: true, tolerance: 1 },
            feedback: "You've used 8 cm as the radius. The radius is half the diameter: 4 cm.",
          },
          {
            spec: { type: "list", values: [603, 402], ordered: true, tolerance: 1 },
            feedback: "402 cm² includes the two circular ends. The label only wraps round the curved side.",
          },
        ],
        solution: [
          "Radius = 8 ÷ 2 = 4 cm.",
          "Volume = {{pi * 4^2 * 12 = 192 pi}} = 603.18… ≈ 603 cm³.",
          "Unrolled, the label is a rectangle {{2 pi r}} wide and 12 cm tall: {{2 * pi * 4 * 12 = 96 pi}} = 301.59… ≈ 302 cm².",
        ],
        commonError: "Using the diameter as the radius.",
        difficulty: "core",
        guideRef: "cylinders",
        hints: [
          "The radius is half the diameter.",
          "Volume = {{pi r^2 h}}.",
          "Unroll the label: it becomes a rectangle as wide as the circumference, {{2 pi r}}, and as tall as the tin.",
        ],
        strategy: "Sketch the net",
      },
      // ------------------------------------------------------------- q16
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q16",
        question:
          "A paddling pool is a prism. Its side view is the trapezium shown: the pool is 2.4 m long, 30 cm deep at the shallow end and 50 cm deep at the deep end. The pool is 1.5 m wide. How many litres of water does it hold when full?",
        diagram: `<svg viewBox="0 0 400 180" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Side view of a paddling pool: a trapezium 2.4 m long, 30 cm deep at the shallow end and 50 cm deep at the deep end, with a sloping floor."><rect x="0" y="0" width="400" height="180" fill="#ffffff"/><polygon points="50,50 350,50 350,150 50,110" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><text x="200" y="40" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">2.4 m</text><text x="44" y="85" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">30 cm</text><text x="356" y="105" font-size="13" font-family="sans-serif" fill="#1f2937">50 cm</text><text x="60" y="134" font-size="12" font-family="sans-serif" fill="#334155">shallow end</text><text x="350" y="170" font-size="12" font-family="sans-serif" text-anchor="end" fill="#334155">deep end</text></svg>`,
        answer: { type: "number", value: 1440, display: "1440 litres" },
        traps: [
          {
            spec: { type: "number", value: 1800 },
            feedback: "1800 litres treats the pool as 50 cm deep everywhere. The floor slopes, so the cross-section is a trapezium.",
          },
          {
            spec: { type: "number", value: 1440000 },
            feedback: "1 440 000 is the volume in cm³. Divide by 1000 to get litres.",
          },
        ],
        solution: [
          "Use one unit: 2.4 m = 240 cm and 1.5 m = 150 cm.",
          "Cross-section (trapezium): {{1/2 * (30 + 50) * 240 = 40 * 240 = 9600}} cm².",
          "Volume = 9600 × 150 = 1 440 000 cm³.",
          "1000 cm³ = 1 litre, so the pool holds 1 440 000 ÷ 1000 = 1440 litres.",
        ],
        solutions: [
          {
            label: "Work in metres",
            steps: [
              "Cross-section: {{1/2 * (0.3 + 0.5) * 2.4 = 0.96}} m².",
              "Volume: 0.96 × 1.5 = 1.44 m³.",
              "1 m³ = 1000 litres, so 1440 litres. Fewer zeros to manage, but you must be careful with the decimals.",
            ],
          },
        ],
        commonError: "Mixing metres and centimetres in one calculation.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "Which face is the same all the way across the pool? That is the cross-section.",
          "Put every length in the same unit: 2.4 m = 240 cm and 1.5 m = 150 cm.",
          "Cross-section = {{1/2 * (30 + 50) * 240}} cm². Multiply by the width, then convert to litres.",
        ],
        strategy: "Check units",
      },
      // ------------------------------------------------------------- q17
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q17",
        question:
          "All the corners of this shape are right angles. Overall it is 15 m wide and 9 m tall. A rectangular notch 3 m wide and 2 m deep is cut into its bottom edge. The lengths of the steps are not given. Find the perimeter of the shape, in m.",
        diagram: `<svg viewBox="0 0 380 270" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectilinear shape 15 m wide and 9 m tall. Its top right side is a staircase of unlabelled steps, and a notch 3 m wide and 2 m deep is cut into the bottom edge."><rect x="0" y="0" width="380" height="270" fill="#ffffff"/><polygon points="40,220 160,220 160,180 220,180 220,220 340,220 340,180 260,180 260,120 180,120 180,90 120,90 120,40 40,40" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="242" x2="340" y2="242" stroke="#334155" stroke-width="1.5"/><line x1="40" y1="236" x2="40" y2="248" stroke="#334155" stroke-width="1.5"/><line x1="340" y1="236" x2="340" y2="248" stroke="#334155" stroke-width="1.5"/><text x="190" y="262" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">15 m</text><text x="34" y="135" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">9 m</text><text x="190" y="206" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">3 m</text><text x="154" y="205" font-size="12" font-family="sans-serif" text-anchor="end" fill="#1f2937">2 m</text></svg>`,
        answer: { type: "number", value: 52, display: "52 m" },
        traps: [
          {
            spec: { type: "number", value: 48 },
            feedback: "48 m is the perimeter of the 15 m by 9 m rectangle. The steps don't change that — but the notch adds two extra 2 m walls.",
          },
          {
            spec: { type: "number", value: 50 },
            feedback: "The notch has two walls, one on each side, and each is 2 m deep.",
          },
        ],
        solution: [
          "You can't find each step — and you don't need to. Push the step edges outwards: the horizontal ones slide up to make a 15 m top edge, and the vertical ones slide right to make a 9 m side.",
          "So the steps and the outside edges give the same perimeter as a 15 m by 9 m rectangle: 2 × (15 + 9) = 48 m.",
          "The notch's 3 m top edge just fills the 3 m gap in the bottom edge (slide it down 2 m), but its two side walls are extra: 2 + 2 = 4 m.",
          "Perimeter = 48 + 4 = 52 m.",
        ],
        commonError: "Ignoring the notch walls, or trying (and failing) to find every step length.",
        difficulty: "challenge",
        guideRef: "compound-shapes",
        hints: [
          "You can't find each step length — so don't try. Imagine pushing the step edges outwards. What shape do you get?",
          "All the edges facing up add to 15 m, and all the edges facing right add to 9 m — just like a rectangle.",
          "Now deal with the notch: its 3 m top edge can slide down to fill the gap in the bottom edge, but what about its two sides?",
        ],
        strategy: "Look for an invariant",
      },
      // ------------------------------------------------------------- q18
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q18",
        question:
          "A solid 4 cm cube is painted on all six faces and then cut into 1 cm cubes. How many of the small cubes have exactly 3 painted faces, exactly 2, exactly 1, and none? Give the four numbers in that order.",
        answer: { type: "list", values: [8, 24, 24, 8], ordered: true, display: "8, 24, 24, 8" },
        traps: [
          {
            spec: { type: "list", values: [8, 24, 24, 0], ordered: true },
            feedback:
              "Check the total: 8 + 24 + 24 = 56, but there are 4 × 4 × 4 = 64 small cubes. The other 8 make a hidden 2 × 2 × 2 cube in the middle.",
          },
        ],
        solution: [
          "3 painted faces: the corners of the big cube. There are 8.",
          "2 painted faces: along an edge but not at a corner. Each of the 12 edges has 4 − 2 = 2 of these: 12 × 2 = 24.",
          "1 painted face: in the middle of a face. Each face has a 2 × 2 middle: 6 × 4 = 24.",
          "0 painted faces: the hidden 2 × 2 × 2 core: 8.",
          "Check: 8 + 24 + 24 + 8 = 64 = 4³ ✓, and painted squares: 8 × 3 + 24 × 2 + 24 × 1 = 96 = 6 × 16 = the surface area ✓",
        ],
        commonError: "Counting all 4 cubes along each edge as 'two-face' cubes, which counts the corners again.",
        difficulty: "challenge",
        guideRef: "surface-area",
        hints: [
          "Where are the cubes with 3 painted faces? Where are the ones with 2?",
          "3 faces: corners. 2 faces: on an edge but not a corner. 1 face: in the middle of a face.",
          "Each edge has 4 small cubes, and 2 of them are corners. Check that your four numbers add up to 64.",
        ],
        strategy: "Split into cases",
      },
      // ------------------------------------------------------------- q19
      {
        kind: "written",
        id: "perimeter-area-volume-p4-q19",
        question:
          "Some polyhedra have faces that are all triangles — for example a tetrahedron (4 faces) and an octahedron (8 faces).\n\nExplain why every polyhedron whose faces are all triangles must have an even number of faces.",
        marks: 3,
        modelAnswer:
          "Count the sides of all the faces. Each face is a triangle with 3 sides, so there are 3F sides altogether.\n\nEvery edge of the polyhedron is shared by exactly 2 faces, so each edge has been counted twice. That means 3F = 2E.\n\n2E is even, so 3F is even. 3 is odd, and an odd number times F can only be even if F is even. So F must be even.\n\n(Check: tetrahedron 3 × 4 = 12 = 2 × 6 edges; octahedron 3 × 8 = 24 = 2 × 12 edges.)",
        markScheme: [
          {
            point: "Counts the sides of all the faces: 3 per triangle, 3F in total",
            keywords: ["3f", "3 sides", "three sides", "3 × f", "3 x f"],
          },
          {
            point: "Each edge is shared by two faces, so 3F = 2E",
            keywords: ["shared", "two faces", "2 faces", "counted twice", "2e", "3f = 2e"],
          },
          {
            point: "So 3F is even, and since 3 is odd, F must be even",
            keywords: ["even", "3 is odd", "odd", "f must be even"],
          },
        ],
        commonError: "Checking a few examples (4, 8, 20) and calling that a proof — examples can't show it is true for every case.",
        difficulty: "challenge",
        guideRef: "nets-and-euler",
        hints: [
          "Count the sides of all the triangles together. How many is that, in terms of F?",
          "How many faces meet along each edge of a polyhedron?",
          "If 3F = 2E, what do you know about 3F? What does that tell you about F?",
        ],
        strategy: "Count in two ways",
      },
      // ------------------------------------------------------------- q20
      {
        kind: "short",
        id: "perimeter-area-volume-p4-q20",
        question:
          "A closed box is a cuboid 20 cm long, 10 cm wide and 12 cm tall. It stands on its 20 cm by 10 cm face and holds water 9 cm deep. The box is turned so that it rests on its 20 cm by 12 cm face. Later it is turned again so that it rests on its 10 cm by 12 cm face. How deep is the water each time? Give the two depths in cm, in that order.",
        answer: { type: "list", values: [7.5, 15], ordered: true, display: "7.5 cm, then 15 cm" },
        traps: [
          {
            spec: { type: "list", values: [9, 9], ordered: true },
            feedback: "The volume of water stays the same, not its depth. A bigger base makes the water shallower.",
          },
          {
            spec: { type: "list", values: [15, 7.5], ordered: true },
            feedback: "Right depths, wrong order: the box rests on the 20 cm by 12 cm face first (7.5 cm), then on the 10 cm by 12 cm face (15 cm).",
          },
        ],
        solution: [
          "Volume of water: 20 × 10 × 9 = 1800 cm³. Turning the box doesn't change this.",
          "On the 20 cm by 12 cm face: base area 240 cm², so the depth is 1800 ÷ 240 = 7.5 cm (the box is now 10 cm tall, so it fits).",
          "On the 10 cm by 12 cm face: base area 120 cm², so the depth is 1800 ÷ 120 = 15 cm (the box is now 20 cm tall).",
        ],
        solutions: [
          {
            label: "Fraction full",
            steps: [
              "At first the water fills 9 cm of the 12 cm height, so the box is {{9/12 = 3/4}} full.",
              "However the box is turned, it is still {{3/4}} full, so the depth is {{3/4}} of the new height.",
              "Resting on the 20 × 12 face it is 10 cm tall: {{3/4 * 10 = 7.5}} cm. Resting on the 10 × 12 face it is 20 cm tall: {{3/4 * 20 = 15}} cm. This is quicker — no big numbers at all.",
            ],
          },
        ],
        commonError: "Thinking the depth stays the same when the box is turned.",
        difficulty: "challenge",
        guideRef: "volume",
        hints: [
          "What stays the same when you turn the box over?",
          "The water's volume is 20 × 10 × 9 cm³. What is the new base area each time?",
          "Or: what fraction of the box is full? That fraction doesn't change either.",
        ],
        strategy: "Look for an invariant",
      },
    ],
  },
];
