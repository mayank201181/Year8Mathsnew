import type { Paper } from "../../types.ts";

// ---------------------------------------------------------------------------
// Diagrams (inline SVG). Lengths are drawn to scale unless stated.
// ---------------------------------------------------------------------------

// Parallelogram: base 8, slant 6, height 5 (20 px per cm).
const PARALLELOGRAM_8_6_5 = `<svg viewBox="0 0 320 190" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram with a base of 8 cm, a sloping side of 6 cm and a dashed perpendicular height of 5 cm"><rect x="0" y="0" width="320" height="190" fill="#ffffff"/><polygon points="40,150 200,150 266.3,50 106.3,50" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><line x1="106.3" y1="50" x2="106.3" y2="150" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M106.3 140 h10 v10" fill="none" stroke="#334155" stroke-width="1.5"/><text x="120" y="172" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">8 cm</text><text x="64" y="104" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">6 cm</text><text x="112" y="106" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text></svg>`;

// L-shape 10 x 8 with a 4 x 3 corner missing (20 px per cm).
const L_SHAPE_AREA = `<svg viewBox="0 0 290 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shaped floor plan with a bottom edge of 10 cm, a left edge of 8 cm, a top edge of 6 cm and a short right edge of 5 cm"><rect x="0" y="0" width="290" height="235" fill="#ffffff"/><polygon points="40,200 240,200 240,100 160,100 160,40 40,40" fill="#bae6fd" stroke="#1f2937" stroke-width="2"/><text x="140" y="220" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">10 cm</text><text x="32" y="124" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">8 cm</text><text x="100" y="32" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="248" y="154" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text></svg>`;

// Pinwheel: 12 cm square from four 8 x 4 rectangles round a 4 cm hole (15 px per cm).
const PINWHEEL = `<svg viewBox="0 0 320 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A 12 cm square made from four identical rectangles arranged round a 4 cm square hole"><rect x="0" y="0" width="320" height="235" fill="#ffffff"/><rect x="70" y="20" width="120" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="190" y="20" width="60" height="120" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="130" y="140" width="120" height="60" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><rect x="70" y="80" width="60" height="120" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><rect x="130" y="80" width="60" height="60" fill="#ffffff" stroke="#1f2937" stroke-width="2" stroke-dasharray="5 4"/><text x="160" y="106" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="160" y="124" font-size="12" font-family="sans-serif" text-anchor="middle" fill="#1f2937">hole</text><text x="160" y="222" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text></svg>`;

// Obtuse triangle: base 6, side 10, external height 8 (18 px per cm).
const OBTUSE_TRIANGLE = `<svg viewBox="0 0 300 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Obtuse triangle with a base of 6 cm and a right-hand side of 10 cm; the base line is extended and a dashed perpendicular height of 8 cm is drawn outside the triangle"><rect x="0" y="0" width="300" height="210" fill="#ffffff"/><line x1="138" y1="180" x2="246" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><line x1="246" y1="36" x2="246" y2="180" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M236 180 v-10 h10" fill="none" stroke="#334155" stroke-width="1.5"/><polygon points="30,180 138,180 246,36" fill="#c7d2fe" stroke="#1f2937" stroke-width="2"/><text x="84" y="198" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">6 cm</text><text x="200" y="126" font-size="13" font-family="sans-serif" fill="#1f2937">10 cm</text><text x="252" y="112" font-size="13" font-family="sans-serif" fill="#1f2937">8 cm</text></svg>`;

// Isosceles trapezium: parallel sides 5 and 11, height 4, slant sides 5 (20 px per cm).
const TRAPEZIUM_5_11 = `<svg viewBox="0 0 300 185" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Trapezium with parallel sides of 5 cm and 11 cm, two sloping sides of 5 cm and a dashed perpendicular height of 4 cm"><rect x="0" y="0" width="300" height="185" fill="#ffffff"/><polygon points="40,150 260,150 200,70 100,70" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><line x1="100" y1="70" x2="100" y2="150" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M100 140 h10 v10" fill="none" stroke="#334155" stroke-width="1.5"/><text x="150" y="170" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">11 cm</text><text x="150" y="62" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">5 cm</text><text x="64" y="112" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">5 cm</text><text x="236" y="112" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text><text x="106" y="116" font-size="13" font-family="sans-serif" fill="#1f2937">4 cm</text></svg>`;

// L-shape 9 x 7 with two unlabelled sides (20 px per cm).
const L_SHAPE_PERIMETER = `<svg viewBox="0 0 280 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="L-shape with a bottom edge of 9 cm, a left edge of 7 cm, a top edge of 4 cm and a short right edge of 3 cm; two inner edges are not labelled"><rect x="0" y="0" width="280" height="225" fill="#ffffff"/><polygon points="40,190 220,190 220,130 120,130 120,50 40,50" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><text x="130" y="210" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">9 cm</text><text x="32" y="124" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">7 cm</text><text x="80" y="42" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="228" y="164" font-size="13" font-family="sans-serif" fill="#1f2937">3 cm</text></svg>`;

// Cube net with lettered faces: A above B; strip B C D E; F below D.
const CUBE_NET_LETTERS = `<svg viewBox="0 0 240 160" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Net of a cube: a row of four squares B, C, D, E, with square A attached above B and square F attached below D"><rect x="0" y="0" width="240" height="160" fill="#ffffff"/><g fill="#bae6fd" stroke="#1f2937" stroke-width="2"><rect x="40" y="20" width="40" height="40"/><rect x="40" y="60" width="40" height="40"/><rect x="80" y="60" width="40" height="40"/><rect x="120" y="60" width="40" height="40"/><rect x="160" y="60" width="40" height="40"/><rect x="120" y="100" width="40" height="40"/></g><g font-size="14" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="60" y="45">A</text><text x="60" y="85">B</text><text x="100" y="85">C</text><text x="140" y="85">D</text><text x="180" y="85">E</text><text x="140" y="125">F</text></g></svg>`;

// Triangular prism with a 3-4-5 right-angled cross-section, length 10.
const PRISM_3_4_5 = `<svg viewBox="0 0 340 210" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangular prism 10 cm long whose end is a right-angled triangle with sides 3 cm, 4 cm and 5 cm"><rect x="0" y="0" width="340" height="210" fill="#ffffff"/><polygon points="40,105 140,180 300,120 200,45" fill="#c7d2fe" stroke="none"/><polygon points="40,180 140,180 40,105" fill="#fde68a" stroke="none"/><g stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4" fill="none"><line x1="40" y1="180" x2="200" y2="120"/><line x1="200" y1="120" x2="300" y2="120"/><line x1="200" y1="120" x2="200" y2="45"/></g><g stroke="#1f2937" stroke-width="2" fill="none"><polygon points="40,180 140,180 40,105"/><line x1="140" y1="180" x2="300" y2="120"/><line x1="40" y1="105" x2="200" y2="45"/><line x1="200" y1="45" x2="300" y2="120"/></g><path d="M40 168 h12 v12" fill="none" stroke="#334155" stroke-width="1.5"/><text x="90" y="198" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 cm</text><text x="32" y="146" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">3 cm</text><text x="98" y="136" font-size="13" font-family="sans-serif" fill="#1f2937">5 cm</text><text x="232" y="166" font-size="13" font-family="sans-serif" fill="#1f2937">10 cm</text></svg>`;

// Shed end wall: 4 m by 2.5 m rectangle with a triangle reaching 3.7 m (40 px per m).
const SHED_WALL = `<svg viewBox="0 0 320 220" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="End wall of a shed: a rectangle 4 m wide and 2.5 m high with a triangle on top whose peak is 3.7 m above the ground"><rect x="0" y="0" width="320" height="220" fill="#ffffff"/><polygon points="60,190 220,190 220,90 140,42 60,90" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="60" y1="90" x2="220" y2="90" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><g stroke="#334155" stroke-width="1.5"><line x1="44" y1="90" x2="44" y2="190"/><line x1="39" y1="90" x2="49" y2="90"/><line x1="39" y1="190" x2="49" y2="190"/><line x1="250" y1="42" x2="250" y2="190"/><line x1="245" y1="42" x2="255" y2="42"/><line x1="245" y1="190" x2="255" y2="190"/></g><text x="140" y="210" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">4 m</text><text x="38" y="144" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">2.5 m</text><text x="258" y="120" font-size="13" font-family="sans-serif" fill="#1f2937">3.7 m</text></svg>`;

// Four six-square shapes P, Q, R, S (R is not a cube net).
const FOUR_NETS = `<svg viewBox="0 0 340 230" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four shapes each made of six squares, labelled P, Q, R and S. P is a cross. Q is two rows of three squares offset like a staircase. R is a row of four squares with one square above each end. S is a row of four squares with one square above the left end and one below the right end."><rect x="0" y="0" width="340" height="230" fill="#ffffff"/><g font-size="14" font-family="sans-serif" font-weight="bold" fill="#1f2937"><text x="20" y="22">P</text><text x="210" y="22">Q</text><text x="20" y="142">R</text><text x="210" y="142">S</text></g><g fill="#bae6fd" stroke="#1f2937" stroke-width="1.5"><rect x="20" y="50" width="20" height="20"/><rect x="40" y="50" width="20" height="20"/><rect x="60" y="50" width="20" height="20"/><rect x="80" y="50" width="20" height="20"/><rect x="40" y="30" width="20" height="20"/><rect x="40" y="70" width="20" height="20"/><rect x="210" y="30" width="20" height="20"/><rect x="230" y="30" width="20" height="20"/><rect x="250" y="30" width="20" height="20"/><rect x="250" y="50" width="20" height="20"/><rect x="270" y="50" width="20" height="20"/><rect x="290" y="50" width="20" height="20"/><rect x="20" y="170" width="20" height="20"/><rect x="40" y="170" width="20" height="20"/><rect x="60" y="170" width="20" height="20"/><rect x="80" y="170" width="20" height="20"/><rect x="20" y="150" width="20" height="20"/><rect x="80" y="150" width="20" height="20"/><rect x="210" y="170" width="20" height="20"/><rect x="230" y="170" width="20" height="20"/><rect x="250" y="170" width="20" height="20"/><rect x="270" y="170" width="20" height="20"/><rect x="210" y="150" width="20" height="20"/><rect x="270" y="190" width="20" height="20"/></g></svg>`;

// Parallelogram ABCD with P on DC; triangle ABP shaded.
const PARALLELOGRAM_ABP = `<svg viewBox="0 0 320 200" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Parallelogram ABCD with AB along the bottom and DC along the top; P is a point on DC and triangle ABP is shaded; a dashed perpendicular runs from P down to AB"><rect x="0" y="0" width="320" height="200" fill="#ffffff"/><polygon points="40,170 220,170 280,60 100,60" fill="#ffffff" stroke="#1f2937" stroke-width="2"/><polygon points="40,170 220,170 175,60" fill="#c7d2fe" stroke="#1f2937" stroke-width="1.5"/><line x1="175" y1="60" x2="175" y2="170" stroke="#334155" stroke-width="1.5" stroke-dasharray="5 4"/><path d="M175 160 h10 v10" fill="none" stroke="#334155" stroke-width="1.5"/><g font-size="14" font-family="sans-serif" fill="#1f2937"><text x="28" y="186">A</text><text x="222" y="186">B</text><text x="284" y="58">C</text><text x="86" y="58">D</text><text x="170" y="50">P</text></g></svg>`;

// Rectangle cut into four: widths 4 and 6, heights 3 and 7.5 (20 px per unit).
const FOUR_RECTANGLES = `<svg viewBox="0 0 280 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A rectangle divided into four smaller rectangles by one cut across and one cut down; top-left 12 square centimetres, top-right 18, bottom-left 30, bottom-right unknown"><rect x="0" y="0" width="280" height="250" fill="#ffffff"/><rect x="40" y="20" width="200" height="210" fill="#fde68a" stroke="#1f2937" stroke-width="2"/><line x1="120" y1="20" x2="120" y2="230" stroke="#1f2937" stroke-width="2"/><line x1="40" y1="80" x2="240" y2="80" stroke="#1f2937" stroke-width="2"/><g font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937"><text x="80" y="55">12 cm²</text><text x="180" y="55">18 cm²</text><text x="80" y="160">30 cm²</text><text x="180" y="160">?</text></g></svg>`;

// Staircase: base 12, height 9, three equal steps (18 px per cm).
const STAIRCASE = `<svg viewBox="0 0 300 235" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Staircase shape with right angles, a base of 12 cm and a left side of 9 cm; the step edges are not labelled"><rect x="0" y="0" width="300" height="235" fill="#ffffff"/><polygon points="40,200 256,200 256,146 184,146 184,92 112,92 112,38 40,38" fill="#bbf7d0" stroke="#1f2937" stroke-width="2"/><text x="148" y="220" font-size="13" font-family="sans-serif" text-anchor="middle" fill="#1f2937">12 cm</text><text x="32" y="124" font-size="13" font-family="sans-serif" text-anchor="end" fill="#1f2937">9 cm</text></svg>`;

// Triangle (1,1), (6,2), (3,5) on a 1 cm grid (30 px per unit).
const GRID_TRIANGLE = `<svg viewBox="0 0 260 225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Triangle on a 1 cm grid with corners at (1, 1), (6, 2) and (3, 5)"><rect x="0" y="0" width="260" height="225" fill="#ffffff"/><g stroke="#cbd5e1" stroke-width="1"><line x1="60" y1="20" x2="60" y2="200"/><line x1="90" y1="20" x2="90" y2="200"/><line x1="120" y1="20" x2="120" y2="200"/><line x1="150" y1="20" x2="150" y2="200"/><line x1="180" y1="20" x2="180" y2="200"/><line x1="210" y1="20" x2="210" y2="200"/><line x1="240" y1="20" x2="240" y2="200"/><line x1="30" y1="170" x2="240" y2="170"/><line x1="30" y1="140" x2="240" y2="140"/><line x1="30" y1="110" x2="240" y2="110"/><line x1="30" y1="80" x2="240" y2="80"/><line x1="30" y1="50" x2="240" y2="50"/><line x1="30" y1="20" x2="240" y2="20"/></g><g stroke="#334155" stroke-width="1.5"><line x1="30" y1="200" x2="240" y2="200"/><line x1="30" y1="20" x2="30" y2="200"/></g><polygon points="60,170 210,140 120,50" fill="#c7d2fe" fill-opacity="0.85" stroke="#1f2937" stroke-width="2"/><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="middle"><text x="30" y="214">0</text><text x="60" y="214">1</text><text x="90" y="214">2</text><text x="120" y="214">3</text><text x="150" y="214">4</text><text x="180" y="214">5</text><text x="210" y="214">6</text><text x="240" y="214">7</text></g><g font-size="11" font-family="sans-serif" fill="#1f2937" text-anchor="end"><text x="24" y="174">1</text><text x="24" y="144">2</text><text x="24" y="114">3</text><text x="24" y="84">4</text><text x="24" y="54">5</text><text x="24" y="24">6</text></g></svg>`;

// ---------------------------------------------------------------------------
// MCQ papers
// ---------------------------------------------------------------------------

export const mcqPapers: Paper[] = [
  // =========================================================================
  // MCQ Paper 1
  // =========================================================================
  {
    id: "perimeter-area-volume-m1",
    title: "MCQ Paper 1",
    questions: [
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q01",
        question: "A rectangular bedroom floor in an HDB flat is 4 m long and 3 m wide. What is the area of the floor?",
        options: ["12 m²", "14 m²", "7 m²", "24 m²"],
        answerIndex: 0,
        explanation:
          "Area of a rectangle = length × width = 4 × 3 = 12 m² — 3 rows of 4 one-metre squares. 14 is the perimeter (4 + 3 + 4 + 3), which measures the distance round the edge, not the space inside. 7 comes from adding the two sides.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: ["Area counts the 1 m by 1 m squares that cover the floor. How many rows, and how many squares in each row?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q02",
        question: "A triangle has a base of 10 cm and a perpendicular height of 6 cm. What is its area?",
        options: ["60 cm²", "30 cm²", "16 cm²", "8 cm²"],
        answerIndex: 1,
        explanation:
          "A triangle is half of the rectangle with the same base and height: {{1/2}} × 10 × 6 = 30 cm². 60 cm² forgets to halve — that is the area of the whole 10 by 6 rectangle around the triangle. 16 adds the lengths instead of multiplying them.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: ["Picture the rectangle that fits exactly round the triangle. What fraction of it is the triangle?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q03",
        question: "How many faces, edges and vertices does a cuboid have?",
        options: [
          "6 faces, 8 edges, 12 vertices",
          "8 faces, 12 edges, 6 vertices",
          "6 faces, 12 edges, 8 vertices",
          "4 faces, 12 edges, 8 vertices",
        ],
        answerIndex: 2,
        explanation:
          "A cuboid has 6 rectangular faces (top, bottom, front, back, left, right), 12 edges (4 round the top, 4 round the bottom, 4 upright) and 8 vertices (4 on top, 4 underneath). Euler checks it: 8 + 6 − 12 = 2. \"8 edges, 12 vertices\" swaps the two words — a vertex is a corner; an edge is a line where two faces meet.",
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: ["Picture a shoebox. Count the corners on the lid, then the corners underneath."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q04",
        question: "A cuboid measures 5 cm by 4 cm by 3 cm. What is its volume?",
        options: ["12 cm³", "20 cm³", "94 cm³", "60 cm³"],
        answerIndex: 3,
        explanation:
          "Volume = length × width × height = 5 × 4 × 3 = 60 cm³: a bottom layer of 5 × 4 = 20 one-centimetre cubes, stacked 3 layers high. 20 is just one layer. 94 is the surface area (which is measured in cm², not cm³), and 12 adds the three edges.",
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["How many 1 cm cubes fit in the bottom layer? How many layers are there?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q05",
        question:
          "The parallelogram has a base of 8 cm, a sloping side of 6 cm and a perpendicular height of 5 cm. What is its area?",
        diagram: PARALLELOGRAM_8_6_5,
        options: ["48 cm²", "40 cm²", "20 cm²", "28 cm²"],
        answerIndex: 1,
        explanation:
          "Area of a parallelogram = base × perpendicular height = 8 × 5 = 40 cm². Cut the triangle off one end, slide it to the other end, and you have an 8 by 5 rectangle. 48 cm² uses the sloping 6 cm side, which is not at right angles to the base. 20 halves as if it were a triangle, and 28 is the perimeter.",
        difficulty: "warmup",
        guideRef: "parallelograms-trapezia",
        hints: ["Which length meets the base at a right angle?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q06",
        question: "A triangle has an area of 42 cm² and a base of 12 cm. What is its perpendicular height?",
        options: ["7 cm", "3.5 cm", "14 cm", "30 cm"],
        answerIndex: 0,
        explanation:
          "Area = {{1/2}} × base × height, so 42 = {{1/2}} × 12 × h = 6h, giving h = 7 cm. 3.5 cm comes from 42 ÷ 12, which forgets that the triangle is only half of a 12 by h rectangle. 30 subtracts instead of dividing.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Write the formula with the numbers you know: 42 = {{1/2}} × 12 × h.",
          "What is {{1/2}} × 12?",
          "6 × h = 42. Use the inverse to find h.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q07",
        question:
          "A trapezium has parallel sides of 6 cm and 10 cm, and the perpendicular distance between them is 4 cm. What is its area?",
        options: ["64 cm²", "240 cm²", "30 cm²", "32 cm²"],
        answerIndex: 3,
        explanation:
          "Area = {{1/2}}(a + b)h = {{1/2}} × (6 + 10) × 4 = 8 × 4 = 32 cm². 64 cm² forgets the half — it is the area of the parallelogram made from two copies of the trapezium. 240 multiplies all three numbers, and 30 uses the parallel sides as if they were a base and a height.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Which two lengths are parallel, and which is the height?",
          "Average the parallel sides first: (6 + 10) ÷ 2.",
          "The trapezium has the same area as a rectangle 8 cm by 4 cm.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q08",
        question: "Find the area of this L-shaped floor plan. All the corners are right angles.",
        diagram: L_SHAPE_AREA,
        options: ["80 cm²", "98 cm²", "68 cm²", "36 cm²"],
        answerIndex: 2,
        explanation:
          "Split it with a vertical cut: a 6 by 8 rectangle (48 cm²) and a 4 by 5 rectangle (20 cm²), total 68 cm². Or subtract: 10 × 8 − 4 × 3 = 80 − 12 = 68 cm². 98 cm² comes from 10 × 5 + 6 × 8, which counts the 6 by 5 overlap twice. 80 forgets the missing corner, and 36 is the perimeter.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Can you split the shape into two rectangles that don't overlap — or see it as a big rectangle with a corner missing?",
          "The missing corner is (10 − 6) cm wide and (8 − 5) cm tall.",
          "80 − 4 × 3 = ?",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q09",
        question: "A cube has edges of length 4 cm. What is its total surface area?",
        options: ["64 cm²", "16 cm²", "96 cm²", "48 cm²"],
        answerIndex: 2,
        explanation:
          "A cube has 6 identical square faces, each 4 × 4 = 16 cm², so the surface area is 6 × 16 = 96 cm². 64 is the volume (4 × 4 × 4, in cm³). 48 cm² counts only the 3 faces you can see in a drawing — the 3 hidden faces count too. 16 is just one face.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: ["Imagine unfolding the cube into its net. How many squares are there?", "Each face is 4 cm by 4 cm."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q10",
        question:
          "A triangular prism has a cross-section that is a triangle with base 6 cm and perpendicular height 4 cm. The prism is 10 cm long. What is its volume?",
        options: ["240 cm³", "12 cm³", "60 cm³", "120 cm³"],
        answerIndex: 3,
        explanation:
          "Volume of a prism = area of cross-section × length. The cross-section is {{1/2}} × 6 × 4 = 12 cm², so the volume is 12 × 10 = 120 cm³. 240 cm³ forgets to halve the triangle — that is the 6 by 4 by 10 cuboid, which this prism is exactly half of. 12 is only the area of the triangular end.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "A prism is the same shape all the way through. What is the area of the triangular end?",
          "Triangle area = {{1/2}} × 6 × 4.",
          "Multiply the end area by the length.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q11",
        question:
          "A solid has a circle as its plan (the view from above). Its front elevation and side elevation are identical rectangles. What is the solid?",
        options: ["A cylinder", "A cone", "A sphere", "A cuboid"],
        answerIndex: 0,
        explanation:
          "An upright cylinder looks like a circle from above and a rectangle from the front and from the side. A cone would show a triangle from the front and side; a sphere looks like a circle from every direction; a cuboid has a rectangular plan.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: ["Which of these solids look round from directly above?", "Of those, which one looks like a rectangle from the side?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q12",
        question: "A cylinder has a radius of 5 cm and a height of 10 cm. What is its volume? Give your answer in terms of π.",
        options: ["100π cm³", "250π cm³", "1000π cm³", "500π cm³"],
        answerIndex: 1,
        explanation:
          "A cylinder is a prism with a circular cross-section, so volume = {{pi r^2 h}} = π × 5² × 10 = π × 25 × 10 = 250π cm³. 1000π cm³ uses the diameter 10 cm as if it were the radius. 100π is 2πrh, the curved surface area — it measures the outside, not the space inside.",
        difficulty: "core",
        guideRef: "cylinders",
        hints: [
          "What shape is the cross-section, and what is its area?",
          "Circle area = {{pi r^2}} = π × 5².",
          "Multiply the cross-section area by the height.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q13",
        question:
          "The table is the plan view of a solid made from 1 cm cubes. Each number shows how many cubes are stacked in that position. The front of the solid is the bottom row of the table.\n\n| | Left | Middle | Right |\n|---|---|---|---|\n| **Back** | 3 | 1 | 2 |\n| **Front** | 1 | 0 | 1 |\n\nHow many squares are in the front elevation?",
        options: ["8", "2", "4", "6"],
        answerIndex: 3,
        explanation:
          "From the front you see each column at the height of its *tallest* stack: left 3, middle 1, right 2, so 3 + 1 + 2 = 6 squares. 8 is the total number of cubes, but cubes hidden behind others don't add extra squares. 2 counts only the front row, ignoring the taller stacks behind it, which stick up above it. 4 is the side elevation (back row tallest 3, front row tallest 1).",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Stand at the front and look at each column, left to right. How tall does each column look?",
          "A short stack at the front does not hide a taller stack behind it.",
          "Take the largest number in each column and add them.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q14",
        question: "A box is 6 cm long, 5 cm wide and 2 cm high. What is its total surface area?",
        options: ["52 cm²", "104 cm²", "60 cm²", "180 cm²"],
        answerIndex: 1,
        explanation:
          "There are three pairs of matching faces: 6 × 5 = 30, 6 × 2 = 12 and 5 × 2 = 10. Surface area = 2 × (30 + 12 + 10) = 104 cm². 52 cm² counts each different face only once, but every face has an identical partner opposite it. 180 cm² is 6 × the largest face, as if the box were a cube, and 60 is the volume.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Sketch the net. How many different sizes of rectangle are there?",
          "Find the area of the top, the front and one end.",
          "Each of those faces appears twice.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q15",
        question:
          "A fish tank is a cuboid 50 cm long, 30 cm wide and 20 cm high. How many litres of water does it hold when full? (1 litre = 1000 cm³)",
        options: ["30 000 litres", "300 litres", "30 litres", "3 litres"],
        answerIndex: 2,
        explanation:
          "Volume = 50 × 30 × 20 = 30 000 cm³. Since 1000 cm³ = 1 litre, that is 30 000 ÷ 1000 = 30 litres. 30 000 litres forgets to convert from cm³ at all. 300 litres divides by 100 instead of 1000 — remember 1 cm³ = 1 ml, and 1000 ml make a litre.",
        difficulty: "core",
        guideRef: "volume",
        hints: ["Find the volume in cm³ first.", "50 × 30 × 20 = 30 000 cm³.", "How many lots of 1000 cm³ is that?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q16",
        question:
          "A rectangular garden is 8 m by 5 m. A path 1 m wide runs all the way round the outside of it. What is the area of the path?",
        options: ["30 m²", "26 m²", "70 m²", "13 m²"],
        answerIndex: 0,
        explanation:
          "The garden plus path makes a rectangle (8 + 2) by (5 + 2) = 10 m by 7 m = 70 m². Take away the garden, 8 × 5 = 40 m², and the path is 30 m². 26 m² comes from 2 × (8 + 5) × 1 — four strips along the sides — which misses the four 1 m by 1 m squares at the corners. 70 m² forgets to subtract the garden.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Draw it. The path adds 1 m at *both* ends of each side.",
          "The outer rectangle is (8 + 1 + 1) m by (5 + 1 + 1) m.",
          "Path = outer area − garden area.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q17",
        question:
          "Ten 1 cm cubes are glued face to face in a straight line to make a rod 10 cm long. What is the surface area of the rod?",
        options: ["60 cm²", "42 cm²", "40 cm²", "10 cm²"],
        answerIndex: 1,
        explanation:
          "The rod is a 10 by 1 by 1 cuboid: four long faces of 10 × 1 = 10 cm² each, plus two 1 × 1 ends, so 40 + 2 = 42 cm². 60 cm² is 10 separate cubes × 6 faces, but each of the 9 joins hides 2 faces, and 60 − 18 = 42. 40 cm² forgets the two square ends; 10 is the volume.",
        difficulty: "challenge",
        guideRef: "surface-area",
        hints: [
          "Try small cases: what is the surface area of 2 cubes glued together? Of 3?",
          "Each join hides one face from each of the two cubes it connects.",
          "Or treat the whole rod as a cuboid 10 cm by 1 cm by 1 cm.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q18",
        question: "A prism has a cross-section with n sides. Which expression gives the number of edges of the prism?",
        options: ["n + 2", "2n", "6n", "3n"],
        answerIndex: 3,
        explanation:
          "Each end has n edges (2n altogether), and n more edges run along the length joining the ends: 3n. Check with a triangular prism: n = 3 gives 9 edges ✓. n + 2 counts the faces (n rectangles + 2 ends) and 2n counts the vertices — Euler confirms 2n + (n + 2) − 3n = 2. 6n adds up the edges of every face separately, but each edge is shared by two faces, so it counts every edge twice.",
        difficulty: "challenge",
        guideRef: "nets-and-euler",
        hints: [
          "Try small cases: count the edges of a triangular prism (n = 3) and a cuboid (n = 4).",
          "Group the edges: those round the two ends, and those running along the length.",
          "Check your expression with Euler's formula, using V = 2n and F = n + 2.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q19",
        question:
          "Four identical rectangles are arranged round a square hole to make a large square with sides of 12 cm. The hole is a square with sides of 4 cm. What is the area of one rectangle?",
        diagram: PINWHEEL,
        options: ["32 cm²", "36 cm²", "40 cm²", "128 cm²"],
        answerIndex: 0,
        explanation:
          "The four rectangles cover the big square except the hole: 144 − 16 = 128 cm², so one rectangle is 128 ÷ 4 = 32 cm². (Check: each rectangle is 8 cm by 4 cm, because long side + short side = 12 and long side − short side = 4.) 36 cm² is 144 ÷ 4, which ignores the hole; 40 cm² adds the hole instead of subtracting it; 128 cm² is all four rectangles together.",
        difficulty: "challenge",
        guideRef: "compound-shapes",
        hints: [
          "You don't need the rectangle's length and width. What area do the four rectangles cover together?",
          "Big square − hole.",
          "Share that equally between the four rectangles.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m1-q20",
        question:
          "Solid cubes with 4 cm edges are packed into a cube-shaped box whose inside edges are 10 cm. The small cubes cannot be cut. What is the greatest number that will fit?",
        options: ["15", "27", "8", "16"],
        answerIndex: 2,
        explanation:
          "Along each 10 cm edge only 2 cubes fit (2 × 4 = 8 cm; a third would need 12 cm). So 2 × 2 × 2 = 8 cubes. 15 comes from dividing volumes, 1000 ÷ 64 = 15.6…, which assumes the 2 cm gaps can be filled with bits of cubes. 27 rounds 10 ÷ 4 = 2.5 up to 3 along each edge — but half a cube can't stick out of the box.",
        difficulty: "challenge",
        guideRef: "volume",
        hints: [
          "How many 4 cm cubes fit along one 10 cm edge?",
          "Dividing the volumes assumes you can fill every gap. Can you?",
          "Count along each edge, then multiply for length, width and height.",
        ],
        strategy: "Consider extremes",
      },
    ],
  },

  // =========================================================================
  // MCQ Paper 2
  // =========================================================================
  {
    id: "perimeter-area-volume-m2",
    title: "MCQ Paper 2",
    questions: [
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q01",
        question: "A rectangle is 12 cm long and 5 cm wide. What is its perimeter?",
        options: ["60 cm", "17 cm", "34 cm", "22 cm"],
        answerIndex: 2,
        explanation:
          "Perimeter is the distance all the way round: 12 + 5 + 12 + 5 = 34 cm, or 2 × (12 + 5). 60 is the area (and would be in cm²). 17 cm only goes halfway round — one length and one width.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: ["Trace round the rectangle with your finger. How many sides do you pass, and how long is each?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q02",
        question: "A net is made of 2 triangles and 3 rectangles. What solid does it fold up into?",
        options: ["A triangular prism", "A square-based pyramid", "A tetrahedron (triangle-based pyramid)", "A cuboid"],
        answerIndex: 0,
        explanation:
          "The 2 triangles are the identical ends and the 3 rectangles join their matching edges — a triangular prism with 5 faces. A square-based pyramid's net is 1 square and 4 triangles; a tetrahedron's is 4 triangles; a cuboid's is 6 rectangles.",
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: ["Prisms have two identical ends joined by rectangles. Pyramids have one base and triangles that meet at a point."],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q03",
        question: "A cube has a volume of 64 cm³. What is the length of one edge?",
        options: ["8 cm", "16 cm", "21.3 cm", "4 cm"],
        answerIndex: 3,
        explanation:
          "Volume of a cube = edge × edge × edge, so the edge is the cube root: {{cbrt(64)}} = 4 cm, because 4 × 4 × 4 = 64. 8 cm is the square root — 8 × 8 = 64, but a cube has three dimensions, and 8 × 8 × 8 = 512. 21.3 cm divides by 3 instead of taking the cube root.",
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["Which number multiplied by itself three times gives 64?"],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q04",
        question:
          "On isometric dot paper, the vertical edges of a solid are drawn vertically. At what angle to the horizontal are the other edges drawn?",
        options: ["45°", "30°", "60°", "90°"],
        answerIndex: 1,
        explanation:
          "Isometric drawings use vertical lines plus lines at 30° to the horizontal (sloping up to the left and up to the right) — that is why isometric paper is a grid of equilateral triangles. 45° is used in oblique drawings, where the front face is drawn flat and the depth goes back at 45°. 60° is the angle *inside* each triangle of the grid, between a sloping line and the vertical.",
        difficulty: "warmup",
        guideRef: "plans-elevations",
        hints: [
          "The dots make equilateral triangles, so a sloping grid line meets the vertical at 60°. What angle does that leave between the sloping line and the horizontal?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q05",
        question: "One face of a cube has an area of 9 cm². What is the total surface area of the cube?",
        options: ["54 cm²", "27 cm²", "81 cm²", "36 cm²"],
        answerIndex: 0,
        explanation:
          "A cube has 6 identical faces, so the surface area is 6 × 9 = 54 cm². 27 is the cube's volume (edge 3 cm, 3 × 3 × 3 = 27 cm³). 36 cm² counts only 4 faces, like the walls of a room without the floor and ceiling. 81 squares the face area, which doesn't measure anything here.",
        difficulty: "warmup",
        guideRef: "surface-area",
        hints: ["How many faces does a cube have, and are they all the same size?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q06",
        question:
          "Find the area of the shaded triangle. Its base is 6 cm, its right-hand side is 10 cm, and its perpendicular height (measured outside the triangle) is 8 cm.",
        diagram: OBTUSE_TRIANGLE,
        options: ["30 cm²", "48 cm²", "24 cm²", "40 cm²"],
        answerIndex: 2,
        explanation:
          "The perpendicular height can lie outside the triangle — it still measures how far the top corner is above the line of the base. Area = {{1/2}} × 6 × 8 = 24 cm². 30 cm² uses the sloping 10 cm side as if it were the height, but it isn't at right angles to the base. 48 cm² forgets to halve.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Which length is at right angles to the base line (extended)?",
          "The 10 cm side slopes, so it is not a height.",
          "Area = {{1/2}} × base × perpendicular height.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q07",
        question:
          "This trapezium has parallel sides of 5 cm and 11 cm. Its sloping sides are both 5 cm and its perpendicular height is 4 cm. What is its area?",
        diagram: TRAPEZIUM_5_11,
        options: ["40 cm²", "32 cm²", "64 cm²", "26 cm²"],
        answerIndex: 1,
        explanation:
          "Area = {{1/2}}(a + b)h = {{1/2}} × (5 + 11) × 4 = 8 × 4 = 32 cm². 40 cm² uses the 5 cm sloping side as the height, but the height must be at right angles to the parallel sides. 64 cm² forgets the half, and 26 is the perimeter (5 + 11 + 5 + 5).",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Which length meets the parallel sides at a right angle?",
          "Add the parallel sides and halve: (5 + 11) ÷ 2 = 8.",
          "Multiply by the perpendicular height.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q08",
        question: "All the angles in this L-shape are right angles. What is its perimeter?",
        diagram: L_SHAPE_PERIMETER,
        options: ["23 cm", "43 cm", "28 cm", "32 cm"],
        answerIndex: 3,
        explanation:
          "The two unlabelled sides are 9 − 4 = 5 cm (across) and 7 − 3 = 4 cm (up). Perimeter = 9 + 3 + 5 + 4 + 4 + 7 = 32 cm. Shortcut: the top edges add up to 9 and the right-hand edges add up to 7, so it's the same as a 9 by 7 rectangle: 2 × (9 + 7) = 32 cm. 23 cm adds only the four labelled sides; 43 is the area.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Two sides have no label. Can you work them out from the others?",
          "The two top edges must add up to the bottom edge, 9 cm.",
          "Now add all six sides.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q09",
        question: "This net is folded to make a cube. Which face ends up opposite face A?",
        diagram: CUBE_NET_LETTERS,
        options: ["F", "E", "C", "D"],
        answerIndex: 0,
        explanation:
          "Fold the strip B–C–D–E into a loop: B ends up opposite D, and C opposite E. A folds up from B to become the lid, and F folds down from D to become the base — so A is opposite F. E is tempting because it is furthest from A in the net, but distance in the net doesn't decide it: E becomes a side face touching the lid.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "Fold the long strip of four squares into a loop first. Which pairs end up opposite?",
          "The four squares in the strip become the sides. Where do the other two squares go?",
          "One becomes the lid, the other the base.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q10",
        question:
          "This triangular prism has a right-angled triangle at each end, with sides 3 cm, 4 cm and 5 cm. The prism is 10 cm long. What is its total surface area?",
        diagram: PRISM_3_4_5,
        options: ["144 cm²", "126 cm²", "60 cm²", "132 cm²"],
        answerIndex: 3,
        explanation:
          "Two triangular ends: 2 × ({{1/2}} × 3 × 4) = 12 cm². Three rectangles, one on each side of the triangle: 3 × 10 + 4 × 10 + 5 × 10 = 120 cm². Total 132 cm². 144 cm² forgets to halve the triangles; 126 cm² includes only one triangular end; 60 is the volume in cm³.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Picture the net: how many triangles and how many rectangles?",
          "Each rectangle is 10 cm long, and its width is one side of the triangle.",
          "Shortcut for the rectangles: perimeter of the triangle × length.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q11",
        question: "How many 2 cm cubes fit exactly into a box measuring 10 cm by 6 cm by 4 cm?",
        options: ["120", "240", "30", "60"],
        answerIndex: 2,
        explanation:
          "Count along each edge: 10 ÷ 2 = 5, 6 ÷ 2 = 3 and 4 ÷ 2 = 2, so 5 × 3 × 2 = 30 cubes. (Check by volume: 240 cm³ ÷ 8 cm³ = 30.) 120 divides the volume by 2, but a 2 cm cube has volume 2 × 2 × 2 = 8 cm³, not 2 cm³. 240 is the number of 1 cm cubes.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "How many 2 cm cubes fit along the 10 cm edge?",
          "Do the same for the 6 cm and 4 cm edges.",
          "Multiply the three counts.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q12",
        question:
          "A square-based pyramid stands on its base, with its top point directly above the centre of the base. Which describes its plan view (looking straight down from above)?",
        options: [
          "A triangle",
          "A square with both diagonals drawn",
          "A square with no lines inside",
          "A square with one diagonal drawn",
        ],
        answerIndex: 1,
        explanation:
          "From directly above you see the square outline of the base, and the four sloping edges run from the corners to the point in the middle — a square with both diagonals. A triangle is the front (and side) elevation. \"A square with no lines inside\" misses the four sloping edges, which show up as lines in a plan view.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Imagine looking straight down on the point of the pyramid. Where does the point appear?",
          "Every edge you can see is drawn. Where do the four sloping edges go?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q13",
        question:
          "\"If one rectangle has a bigger perimeter than another, it must also have a bigger area.\" Is this always, sometimes or never true?",
        options: ["Sometimes true", "Always true", "Never true", "Only true when both shapes are squares"],
        answerIndex: 0,
        explanation:
          "Sometimes. A 10 cm by 1 cm rectangle has perimeter 22 cm and area 10 cm², while a 5 cm by 5 cm square has a smaller perimeter (20 cm) but a bigger area (25 cm²). Yet a 6 by 4 rectangle beats a 3 by 2 one on both. \"Always true\" is tempting because perimeter and area feel linked, but a long, thin shape can have a big perimeter and a small area.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Look for a counter-example: compare a long, thin rectangle with a square.",
          "Try a 10 by 1 rectangle and a 5 by 5 square.",
          "Can you also find a pair where the statement *is* true?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q14",
        question:
          "The end wall of a garden shed is a rectangle 4 m wide and 2.5 m high, with a triangle on top. The top of the triangle is 3.7 m above the ground. What is the area of the end wall?",
        diagram: SHED_WALL,
        options: ["14.8 m²", "17.4 m²", "12.4 m²", "7.4 m²"],
        answerIndex: 2,
        explanation:
          "Rectangle: 4 × 2.5 = 10 m². The triangle's own height is 3.7 − 2.5 = 1.2 m, so its area is {{1/2}} × 4 × 1.2 = 2.4 m². Total 12.4 m². 17.4 m² uses 3.7 m as the triangle's height, but that is measured from the ground, not from the triangle's base. 14.8 m² forgets to halve the triangle.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Split the wall into a rectangle and a triangle.",
          "How tall is the triangle itself, from its base to its top?",
          "3.7 − 2.5 = 1.2 m.",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q15",
        question:
          "A chocolate bar is a prism. Its cross-section is a trapezium with parallel sides of 4 cm and 8 cm and a perpendicular height of 3 cm. The bar is 10 cm long. What is its volume?",
        options: ["360 cm³", "960 cm³", "18 cm³", "180 cm³"],
        answerIndex: 3,
        explanation:
          "Cross-section area = {{1/2}} × (4 + 8) × 3 = 18 cm². Volume = 18 × 10 = 180 cm³. 360 cm³ forgets the half in the trapezium formula. 960 multiplies every number given, and 18 is just the area of the end.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "Find the area of the trapezium-shaped end first.",
          "{{1/2}} × (4 + 8) × 3 = ?",
          "Multiply the end area by the length.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q16",
        question:
          "Wei Ling makes an open-topped box (no lid) from card. The box is 10 cm long, 6 cm wide and 4 cm high. What area of card does she need?",
        options: ["248 cm²", "188 cm²", "240 cm²", "124 cm²"],
        answerIndex: 1,
        explanation:
          "Base: 10 × 6 = 60 cm². Two long sides: 2 × (10 × 4) = 80 cm². Two short sides: 2 × (6 × 4) = 48 cm². Total 60 + 80 + 48 = 188 cm². 248 cm² includes a lid, which this box doesn't have. 124 cm² counts each different face once, missing the matching pairs; 240 is the volume.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "List the faces: which ones are there, and how many of each?",
          "There is a base but no top. The four sides come in two matching pairs.",
          "60 + 2 × 40 + 2 × 24.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q17",
        question:
          "\"A parallelogram with sides of 10 cm and 6 cm has an area of 60 cm².\" Is this always, sometimes or never true?",
        options: [
          "Always true",
          "Never true",
          "Sometimes true — only if the 10 cm side is used as the base",
          "Sometimes true — only if it is a rectangle",
        ],
        answerIndex: 3,
        explanation:
          "Area = base × *perpendicular* height. With the 10 cm side as base, the height can be at most 6 cm, and it equals 6 cm only when the 6 cm side stands upright — when the parallelogram is a rectangle. Push it over and the height shrinks, so the area drops below 60 cm². \"Always true\" multiplies the two sides, treating the sloping side as the height. Swapping which side is the base can't help: the area is the same whichever side you choose.",
        difficulty: "challenge",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Imagine a parallelogram made of four hinged rods. What happens to its area as you push it over?",
          "Area = base × perpendicular height. Can the height be more than 6 cm? When is it exactly 6 cm?",
          "Only one shape gives a height of exactly 6 cm.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q18",
        question:
          "A fish tank has a base 40 cm long and 25 cm wide and already contains some water. Ethan pours in another 3 litres. By how much does the water level rise?",
        options: ["3 cm", "0.3 cm", "30 cm", "It depends how much water was already in the tank"],
        answerIndex: 0,
        explanation:
          "The extra water forms a cuboid-shaped layer on top, with the same 40 cm by 25 cm base. 3 litres = 3000 cm³ and the base area is 40 × 25 = 1000 cm², so the layer is 3000 ÷ 1000 = 3 cm deep. The starting depth doesn't matter — as long as the tank doesn't overflow, the new layer is the same shape wherever it sits. 0.3 cm comes from treating 3 litres as 300 cm³, but 1 litre is 1000 cm³.",
        difficulty: "challenge",
        guideRef: "volume",
        hints: [
          "What shape does the *extra* water make in the tank?",
          "Change 3 litres into cm³.",
          "Volume = base area × depth, so depth = volume ÷ base area.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q19",
        question:
          "Ravi builds a solid from 1 cm cubes on a base with a back row and a front row, each with 3 positions. His front elevation shows columns of heights 3, 1 and 2 (left to right). His side elevation shows that the back row is 3 cubes tall and the front row is 2 cubes tall. What is the greatest number of cubes he could have used?",
        options: ["12", "6", "11", "18"],
        answerIndex: 2,
        explanation:
          "Each stack is limited by its column (front elevation) *and* by its row (side elevation), so it can hold at most the smaller of the two. Back row: 3, 1, 2. Front row: 2, 1, 2. That makes 6 + 5 = 11 cubes, and this solid really does have both elevations. 12 assumes both rows match the front elevation, but the front row is only 2 tall. 6 is the *least* number of cubes, and 18 fills a 3 by 3 by 2 box, which would make every column 3 tall.",
        difficulty: "challenge",
        guideRef: "plans-elevations",
        hints: [
          "Draw a 2 by 3 grid for the plan view. What is the most cubes each square could hold?",
          "A stack can't be taller than its column in the front view, or taller than its row in the side view.",
          "Fill each square with the smaller of its two limits, then check both elevations still work.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m2-q20",
        question:
          "Hana has a rectangular sheet of card 22 cm by 10 cm. She can roll it into an open tube (a cylinder with no ends) in two ways: with the 22 cm side going round, or with the 10 cm side going round. Using π ≈ {{22/7}}, which tube holds more?",
        options: [
          "They hold the same amount, because both use the same card",
          "The tube with the 22 cm side going round",
          "The tube with the 10 cm side going round, because it is taller",
          "It can't be decided without knowing the thickness of the card",
        ],
        answerIndex: 1,
        explanation:
          "22 cm round: diameter = 22 ÷ {{22/7}} = 7 cm, so r = 3.5 cm and V = {{22/7}} × 3.5² × 10 = 385 cm³. 10 cm round: r ≈ 1.59 cm and V ≈ {{22/7}} × 1.59² × 22 ≈ 175 cm³. Volume depends on r², so a wider circle matters more than a taller tube. \"The same amount\" is tempting, but using the same card only means the same curved *surface area* (220 cm²), not the same volume.",
        difficulty: "challenge",
        guideRef: "cylinders",
        hints: [
          "For each tube, the side that goes round is the circumference.",
          "Circumference = πd, so for the first tube d = 22 ÷ {{22/7}} = 7 cm.",
          "Volume = {{pi r^2 h}}. Which matters more — r, which is squared, or h?",
        ],
        strategy: "Split into cases",
      },
    ],
  },

  // =========================================================================
  // MCQ Paper 3
  // =========================================================================
  {
    id: "perimeter-area-volume-m3",
    title: "MCQ Paper 3",
    questions: [
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q01",
        question:
          "A parallelogram is cut along its perpendicular height, and the triangle that comes off one end is slid across to the other end. What shape do you get?",
        options: [
          "A triangle with the same base and height",
          "A rectangle with the same base and height",
          "A square",
          "A trapezium with twice the area",
        ],
        answerIndex: 1,
        explanation:
          "The cut-off triangle fits exactly against the other sloping end, making a rectangle with the same base b and height h. Nothing is added or lost, so the parallelogram's area is b × h. It can't be a triangle (that would halve the area) or have twice the area — the pieces are only rearranged.",
        difficulty: "warmup",
        guideRef: "parallelograms-trapezia",
        hints: ["Nothing is added or taken away when you cut and slide — the pieces are only rearranged."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q02",
        question: "How many faces, edges and vertices does a square-based pyramid have?",
        options: [
          "4 faces, 8 edges, 5 vertices",
          "5 faces, 5 edges, 8 vertices",
          "5 faces, 4 edges, 5 vertices",
          "5 faces, 8 edges, 5 vertices",
        ],
        answerIndex: 3,
        explanation:
          "Faces: 1 square base + 4 triangles = 5. Edges: 4 round the base + 4 sloping up to the top = 8. Vertices: 4 base corners + 1 at the top = 5. Euler checks it: 5 + 5 − 8 = 2. \"4 faces\" forgets that the square base is a face too, and \"4 edges\" counts only the sloping ones.",
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: ["Count the base and the sloping parts separately."],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q03",
        question:
          "A triangular prism lies on one of its rectangular faces, like a tent, with a triangular end facing you. What shape is its front elevation?",
        options: ["A triangle", "A rectangle", "A rectangle with a line along the middle", "A pentagon"],
        answerIndex: 0,
        explanation:
          "From the front you see exactly the triangular end — the rest of the prism is hidden directly behind it. A rectangle is what you see from the side, and a rectangle with a line along the middle (the ridge of the tent) is the plan from above.",
        difficulty: "warmup",
        guideRef: "plans-elevations",
        hints: ["Imagine standing at the entrance of a tent. What shape do you see?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q04",
        question: "A carton of soya milk holds 1 litre. What is that volume in cm³?",
        options: ["100 cm³", "10 cm³", "1000 cm³", "10 000 cm³"],
        answerIndex: 2,
        explanation:
          "1 cm³ holds exactly 1 ml, and 1 litre = 1000 ml, so 1 litre = 1000 cm³ — the space inside a 10 cm by 10 cm by 10 cm cube. 100 cm³ mixes it up with 1 m = 100 cm.",
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["1 cm³ = 1 ml. How many ml are in a litre?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q05",
        question: "A square has a perimeter of 36 cm. What is its area?",
        options: ["36 cm²", "144 cm²", "1296 cm²", "81 cm²"],
        answerIndex: 3,
        explanation:
          "Each side is 36 ÷ 4 = 9 cm, so the area is 9 × 9 = 81 cm². 1296 cm² squares the perimeter instead of the side length. 36 cm² assumes the area and perimeter are the same number, which only happens for a 4 cm square.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: ["First find the length of one side."],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q06",
        question:
          "Five squares, each with sides of 3 cm, are joined edge to edge to make a plus sign: one square in the middle with one on each of its sides. What is the perimeter of the plus sign?",
        options: ["60 cm", "36 cm", "45 cm", "48 cm"],
        answerIndex: 1,
        explanation:
          "Count the outside edges: each of the 4 arms has 3 edges on the outside, so 12 edges × 3 cm = 36 cm. 60 cm adds the perimeters of 5 separate squares, but the 4 places where squares touch are inside the shape. 48 cm takes each join off only once, but each join hides two edges — one from each square. 45 is the area.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Sketch it and trace the outline. How many 3 cm edges do you go along?",
          "The middle square has no outside edges. How many does each arm have?",
          "4 arms × 3 edges × 3 cm.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q07",
        question:
          "An isosceles triangle has a base of 10 cm, two sloping sides of 13 cm and a perpendicular height of 12 cm. Ravi works out its area as {{1/2}} × 10 × 13 = 65 cm². What was his mistake?",
        options: [
          "He used a sloping side, 13 cm, instead of the perpendicular height, 12 cm",
          "He should not have halved",
          "He should have multiplied all three side lengths together",
          "He should have added the sides: 13 + 13 + 10",
        ],
        answerIndex: 0,
        explanation:
          "The height must be at right angles to the base. The 13 cm sides slope, so the area is really {{1/2}} × 10 × 12 = 60 cm². Halving was correct — the triangle is half of a 10 by 12 rectangle. Adding the sides, 13 + 13 + 10 = 36 cm, gives the perimeter, not the area.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "Which of the lengths meets the base at a right angle?",
          "Would the triangle fit exactly inside a 10 by 13 rectangle, or a 10 by 12 one?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q08",
        question: "Each of these shapes is made of 6 squares. Which one can NOT be folded to make a cube?",
        diagram: FOUR_NETS,
        options: ["P", "Q", "R", "S"],
        answerIndex: 2,
        explanation:
          "In R, the row of four squares wraps round to make the four sides, and *both* extra squares fold up to the same place — the top — so they overlap and the bottom is left open. S looks similar, but one extra square folds up to make the top and the other folds down to make the bottom, so it works. P (the cross) and Q (the 3–3 staircase) both fold into cubes. Six squares is not enough on its own: each square must land on a different face.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "Find a row of four squares in each shape. When it folds into a loop, where must the other two squares go?",
          "One extra square must become the top and the other the bottom.",
          "In which shape do both extra squares end up in the same place?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q09",
        question:
          "A square-based pyramid has a base of side 6 cm. Its vertical height (from the centre of the base to the top) is 4 cm, and the height of each triangular face, measured up the middle of the face, is 5 cm. What is its total surface area?",
        options: ["84 cm²", "96 cm²", "156 cm²", "60 cm²"],
        answerIndex: 1,
        explanation:
          "The net is 1 square and 4 identical triangles. Square: 6 × 6 = 36 cm². Each triangle: {{1/2}} × 6 × 5 = 15 cm², and 4 × 15 = 60 cm². Total 96 cm². 84 cm² uses the 4 cm vertical height, but that line is inside the pyramid, not on a face. 156 cm² forgets to halve the triangles, and 60 cm² leaves out the base.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "Sketch the net. What shapes is it made of?",
          "Which height belongs to a triangular face — the one inside the pyramid, or the one drawn on the face?",
          "Add the square to four triangles, each with base 6 cm and height 5 cm.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q10",
        question:
          "A trapezium has parallel sides of 4 cm and 10 cm and a perpendicular height of 6 cm. Mei writes: area = {{1/2}} × 4 + 10 × 6 = 62 cm². What went wrong?",
        options: [
          "She halved only the 4, instead of halving the total of the parallel sides",
          "She should have multiplied 4 by 10 instead of adding",
          "She should not have halved anything",
          "She should have divided by the height instead of multiplying",
        ],
        answerIndex: 0,
        explanation:
          "The formula is {{1/2}}(a + b)h — the brackets matter. Without them, Mei's line means 2 + 60 = 62. Correctly: {{1/2}} × (4 + 10) × 6 = 7 × 6 = 42 cm². Multiplying 4 by 10 is a tempting fix, but the parallel sides are added (and then averaged), never multiplied.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Use the order of operations on Mei's line. What does it actually work out?",
          "Where do the brackets go in {{1/2}}(a + b)h?",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q11",
        question:
          "During a monsoon storm, 20 mm of rain falls on a flat roof that is 10 m by 6 m. All of it drains into a tank. How many litres is that? (1 m³ = 1000 litres)",
        options: ["120 litres", "12 000 litres", "1 200 000 litres", "1200 litres"],
        answerIndex: 3,
        explanation:
          "20 mm = 2 cm = 0.02 m. The rain makes a very thin cuboid: 10 × 6 × 0.02 = 1.2 m³, and 1.2 × 1000 = 1200 litres. 120 litres comes from writing 20 mm as 0.002 m — there are 1000 mm in a metre, so 20 mm = 0.02 m. 1 200 000 is the volume in cm³, not litres.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "Put all three lengths in metres first.",
          "There are 1000 mm in 1 m, so 20 mm = 0.02 m.",
          "Volume = length × width × depth, then change m³ to litres.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q12",
        question:
          "An architect draws the front elevation of a house at a scale of 1 : 50. The house is 9 m wide. How wide is it on the drawing?",
        options: ["0.18 cm", "450 cm", "18 cm", "1.8 cm"],
        answerIndex: 2,
        explanation:
          "1 : 50 means every 1 cm on the drawing stands for 50 cm in real life. 9 m = 900 cm, and 900 ÷ 50 = 18 cm. 0.18 cm divides 9 by 50 but forgets that the answer is still in metres (0.18 m = 18 cm). 450 cm multiplies by 50, which goes from drawing to real life — the wrong way.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Change 9 m into centimetres first.",
          "A drawing is smaller than real life. Do you multiply or divide by 50?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q13",
        question:
          "\"If you cut a small rectangle out of one corner of a larger rectangle, the perimeter of the shape stays the same.\" Is this always, sometimes or never true?",
        options: [
          "Never true — cutting a piece out always makes the perimeter smaller",
          "Sometimes true — only if the piece cut out is a square",
          "Always true",
          "Sometimes true — only if the piece cut out is less than half the rectangle",
        ],
        answerIndex: 2,
        explanation:
          "Always. The two new inside edges are exactly as long as the two bits of the original edges that were removed — push them outwards and you rebuild the original outline. For example, a 10 by 6 rectangle with a 3 by 2 corner removed still has perimeter 32. The area goes down but the perimeter doesn't, so \"Never true\" is wrong: area and perimeter don't have to change together. (A notch cut from the *middle* of a side would add length, though.)",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Draw one and label the lengths. Which edges disappear, and which new edges appear?",
          "Compare the new horizontal edge with the piece of the top edge that was removed.",
          "Test it: a 10 by 6 rectangle with a 3 by 2 corner cut out.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q14",
        question: "A rectangular field is 48.7 m by 19.6 m. Which is the best estimate of its area?",
        options: ["1000 m²", "136 m²", "100 m²", "10 000 m²"],
        answerIndex: 0,
        explanation:
          "Round each length to 1 significant figure: 50 × 20 = 1000 m² (the exact area is 954.52 m²). 136 is an estimate of the *perimeter*, 2 × (50 + 18), which is a length in metres. 100 and 10 000 slip a place value when multiplying 5 × 2.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: ["Round each length to 1 significant figure.", "50 × 20 = ?"],
        strategy: "Estimate first",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q15",
        question:
          "A closed cylinder has a radius of 3 cm and a height of 5 cm. What is its total surface area? Give your answer in terms of π.",
        options: ["39π cm²", "48π cm²", "30π cm²", "45π cm²"],
        answerIndex: 1,
        explanation:
          "The net is two circles and a rectangle. Circles: 2 × π × 3² = 18π. The rectangle wraps round the circle, so its length is the circumference, 2π × 3 = 6π, and its width is the height: 6π × 5 = 30π. Total 48π cm². 39π includes only one circular end; 30π is the curved surface alone; 45π is the volume (π × 3² × 5) in cm³.",
        difficulty: "core",
        guideRef: "cylinders",
        hints: [
          "Sketch the net of a cylinder. What shapes make it up?",
          "The rectangle wraps round the circle, so its length is the circumference, 2πr.",
          "Add two circles to the rectangle.",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q16",
        question:
          "A wooden building block is a prism. Its cross-section is an L-shape made from a 6 cm by 5 cm rectangle with a 3 cm by 2 cm rectangle cut from one corner. The block is 8 cm long. What is its volume?",
        options: ["240 cm³", "24 cm³", "288 cm³", "192 cm³"],
        answerIndex: 3,
        explanation:
          "Cross-section area = 6 × 5 − 3 × 2 = 30 − 6 = 24 cm². Volume = 24 × 8 = 192 cm³. 240 cm³ ignores the missing corner; 288 cm³ adds the corner piece instead of subtracting it; 24 is only the area of the L-shaped end.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "For any prism: volume = area of cross-section × length.",
          "Find the area of the L-shape first: big rectangle minus the corner.",
          "24 × 8 = ?",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q17",
        question:
          "ABCD is a parallelogram. P can be any point on the side DC. What fraction of the parallelogram's area is triangle ABP?",
        diagram: PARALLELOGRAM_ABP,
        options: ["{{1/2}}", "{{1/3}}", "{{1/4}}", "It depends where P is"],
        answerIndex: 0,
        explanation:
          "Triangle ABP has base AB, and its height is the distance between the parallel lines AB and DC — the same as the parallelogram's height, wherever P is. So its area is {{1/2}} × AB × h, exactly half of AB × h. \"It depends where P is\" is tempting because the triangle changes shape as P slides, but its base and height never change, so neither does its area.",
        difficulty: "challenge",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Try putting P exactly at D. What fraction of the parallelogram is triangle ABD?",
          "As P slides along DC, does the base AB change? Does the height?",
          "Compare {{1/2}} × base × height with base × height.",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q18",
        question: "A pyramid has 30 edges. How many faces does it have?",
        options: ["12", "16", "15", "32"],
        answerIndex: 1,
        explanation:
          "A pyramid with an n-sided base has n edges round the base and n sloping edges: 2n = 30, so n = 15. Faces = 15 triangles + the base = 16. (Euler: V = 15 + 1 = 16, and 16 + F − 30 = 2 gives F = 16 ✓.) 12 treats it as a prism (3n = 30, so n = 10 and faces = n + 2). 15 counts the triangles but forgets the base.",
        difficulty: "challenge",
        guideRef: "nets-and-euler",
        hints: [
          "Try small cases: how many edges does a triangle-based pyramid have? A square-based one?",
          "For an n-sided base, the number of edges is 2n.",
          "Faces = triangles + base.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q19",
        question:
          "A 3 cm cube is painted red all over, then cut into twenty-seven 1 cm cubes. How many of the small cubes have paint on exactly two faces?",
        options: ["8", "6", "12", "24"],
        answerIndex: 2,
        explanation:
          "A small cube has two painted faces when it sits on an edge of the big cube but not at a corner. Each of the 12 edges has 3 small cubes, and the 2 at the ends are corners (3 painted faces), leaving 1 per edge: 12 cubes. 8 counts the corner cubes, which have three painted faces. 6 counts the cubes in the middle of each face, which have only one. 24 counts 2 cubes per edge, but those end cubes are corners. (Check: 8 + 12 + 6 + 1 hidden in the centre = 27.)",
        difficulty: "challenge",
        guideRef: "surface-area",
        hints: [
          "Where on the big cube would a small cube need to be to have exactly two painted faces?",
          "Corner cubes have 3 painted faces; cubes in the middle of a face have 1.",
          "How many edges does a cube have, and how many non-corner cubes lie on each?",
        ],
        strategy: "Split into cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m3-q20",
        question:
          "A rectangle is divided into four smaller rectangles by one straight cut across and one straight cut down. The top-left piece has area 12 cm², the top-right piece 18 cm² and the bottom-left piece 30 cm². What is the area of the bottom-right piece?",
        diagram: FOUR_RECTANGLES,
        options: ["36 cm²", "24 cm²", "20 cm²", "45 cm²"],
        answerIndex: 3,
        explanation:
          "The top two pieces share a height, so the right-hand column is {{18/12}} = 1.5 times as wide as the left-hand one. The bottom two pieces also share a height, so the bottom-right piece is 1.5 × 30 = 45 cm². (Check: 12 × 45 = 18 × 30 = 540.) 36 cm² assumes the areas go up by the same *amount* (+6), but a wider piece multiplies the area, so the pattern is about ratios, not differences. 20 cm² pairs up the wrong pieces.",
        difficulty: "challenge",
        guideRef: "compound-shapes",
        hints: [
          "The top-left and top-right pieces have the same height. What does the ratio of their areas tell you about their widths?",
          "The right-hand pieces are 1.5 times as wide as the left-hand pieces.",
          "So the bottom-right piece is 1.5 times the bottom-left piece.",
        ],
        strategy: "Introduce a variable",
      },
    ],
  },

  // =========================================================================
  // MCQ Paper 4
  // =========================================================================
  {
    id: "perimeter-area-volume-m4",
    title: "MCQ Paper 4",
    questions: [
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q01",
        question:
          "A carton of soya milk is a cuboid 6 cm long, 4 cm wide and 10 cm tall. How many millilitres does it hold when full?",
        options: ["24 ml", "2400 ml", "248 ml", "240 ml"],
        answerIndex: 3,
        explanation:
          "Volume = 6 × 4 × 10 = 240 cm³, and 1 cm³ = 1 ml, so it holds 240 ml. 248 is the carton's surface area in cm² — the card on the outside, not the space inside. 2400 and 24 slip a place value; no conversion is needed because 1 cm³ is exactly 1 ml.",
        difficulty: "warmup",
        guideRef: "volume",
        hints: ["Find the volume in cm³. How many ml is 1 cm³?"],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q02",
        question: "To find the area of a triangle you need its base and which other length?",
        options: ["The longest side", "Any one of the other sides", "The perpendicular height", "The perimeter"],
        answerIndex: 2,
        explanation:
          "Area = {{1/2}} × base × perpendicular height — the height measured at right angles to the base, up to the opposite corner. A sloping side, even the longest one, isn't at right angles to the base, so using it gives too big an answer.",
        difficulty: "warmup",
        guideRef: "rectangles-triangles",
        hints: ["A triangle is half of a rectangle. Which length is that rectangle's height?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q03",
        question: "A polyhedron is a solid whose faces are all flat polygons. Which of these is NOT a polyhedron?",
        options: ["Cube", "Cylinder", "Square-based pyramid", "Triangular prism"],
        answerIndex: 1,
        explanation:
          "A cylinder has a curved surface, so it is not a polyhedron, and Euler's formula V + F − E = 2 isn't meant for it. The cube, the square-based pyramid and the triangular prism have only flat polygon faces, straight edges and corners.",
        difficulty: "warmup",
        guideRef: "nets-and-euler",
        hints: ["Which solid has a surface that isn't flat?"],
        strategy: "Eliminate options",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q04",
        question:
          "The three different faces of a cuboid have areas of 12 cm², 20 cm² and 15 cm². What is its total surface area?",
        options: ["94 cm²", "47 cm²", "282 cm²", "3600 cm²"],
        answerIndex: 0,
        explanation:
          "A cuboid has 6 faces in 3 matching pairs, so surface area = 2 × (12 + 20 + 15) = 2 × 47 = 94 cm². 47 cm² forgets that each face has an identical partner opposite it. 282 cm² multiplies the total of the three faces by 6, but those three already cover one of each pair, so you only need 2 copies. 3600 multiplies the areas together.",
        difficulty: "warmup",
        guideRef: "surface-area",
        hints: ["How many faces does a cuboid have, and how many of each size?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q05",
        question: "Which view of a solid is called its plan?",
        options: [
          "The view from the front",
          "The view from the side",
          "The view from directly above",
          "The view from underneath",
        ],
        answerIndex: 2,
        explanation:
          "The plan is the bird's-eye view from directly above, like the floor plan of a flat. The view from the front is the front elevation and the view from the side is the side elevation.",
        difficulty: "warmup",
        guideRef: "plans-elevations",
        hints: ["Think of the floor plan of a flat. Where are you looking from?"],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q06",
        question:
          "A trapezium has an area of 45 cm² and parallel sides of 7 cm and 8 cm. What is its perpendicular height?",
        options: ["3 cm", "30 cm", "12 cm", "6 cm"],
        answerIndex: 3,
        explanation:
          "{{1/2}} × (7 + 8) × h = 45, so 7.5h = 45 and h = 45 ÷ 7.5 = 6 cm. 3 cm comes from 45 ÷ 15, which forgets the half in the formula. 30 subtracts 15 from 45 instead of dividing.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Put the numbers into the formula: 45 = {{1/2}} × (7 + 8) × h.",
          "{{1/2}} × 15 = 7.5.",
          "7.5 × h = 45. Use the inverse.",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q07",
        question:
          "This staircase shape has only right angles. Its base is 12 cm and its left-hand side is 9 cm. The step edges are not labelled. What is its perimeter?",
        diagram: STAIRCASE,
        options: ["42 cm", "21 cm", "108 cm", "It can't be found without the length of each step"],
        answerIndex: 0,
        explanation:
          "Slide all the horizontal step edges up onto one line: together they are exactly as long as the 12 cm base. Slide the vertical step edges across: together they match the 9 cm side. So the perimeter equals that of a 12 by 9 rectangle: 2 × (12 + 9) = 42 cm. \"It can't be found\" is tempting, but the individual steps are never needed. 21 cm goes only halfway round, and 108 is 12 × 9, the area of the surrounding rectangle.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Look at all the horizontal edges. What must they add up to?",
          "Imagine pushing the step edges outwards until they make a rectangle.",
          "The perimeter is the same as a 12 cm by 9 cm rectangle's.",
        ],
        strategy: "Look for an invariant",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q08",
        question: "A cube has a total surface area of 150 cm². How long is each edge?",
        options: ["25 cm", "5 cm", "12.5 cm", "about 5.3 cm"],
        answerIndex: 1,
        explanation:
          "The 6 faces share the 150 cm², so each face is 150 ÷ 6 = 25 cm², and a square of area 25 cm² has sides of 5 cm. 25 cm stops at the area of one face. 12.5 cm divides by 12, the number of edges, but surface area is about faces. About 5.3 cm is the cube root of 150, which treats the surface area as if it were the volume.",
        difficulty: "core",
        guideRef: "surface-area",
        hints: [
          "How many faces share the 150 cm²?",
          "Area of one face = 150 ÷ 6.",
          "Which length, squared, gives that area?",
        ],
        strategy: "Work backwards",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q09",
        question: "A cuboid has a volume of 360 cm³. Its base is 8 cm by 9 cm. How tall is it?",
        options: ["45 cm", "288 cm", "2.5 cm", "5 cm"],
        answerIndex: 3,
        explanation:
          "Volume = base area × height. The base area is 8 × 9 = 72 cm², so the height is 360 ÷ 72 = 5 cm. 45 cm divides by only one edge (360 ÷ 8). 288 subtracts the base area instead of dividing by it, and 2.5 cm halves the answer as if the solid were a triangular prism.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "How many 1 cm cubes fit in one layer on the 8 by 9 base?",
          "How many of those layers make 360 cubes?",
          "360 ÷ 72 = ?",
        ],
        strategy: "Use the inverse",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q10",
        question:
          "Jun says he has made a polyhedron with 7 faces, 10 vertices and 14 edges. Which statement is true?",
        options: [
          "It is possible — it is a pentagonal prism",
          "It is possible, because F + V is bigger than E",
          "It is impossible, because V + F − E = 3, not 2",
          "It is impossible, because no polyhedron has an odd number of faces",
        ],
        answerIndex: 2,
        explanation:
          "Euler's formula says V + F − E = 2 for every polyhedron without holes. Here 10 + 7 − 14 = 3, so Jun has miscounted. A pentagonal prism does have 7 faces and 10 vertices, but it has 15 edges, not 14 (and 10 + 7 − 15 = 2 ✓). An odd number of faces is fine: a square-based pyramid has 5.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "Test Jun's numbers in V + F − E.",
          "What should the answer be for a polyhedron?",
          "Count the edges of a pentagonal prism: round each end, plus the ones joining the ends.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q11",
        question:
          "A shipping container is 6 m long, 2.5 m wide and 2.6 m tall. Its plan is drawn at a scale of 1 : 100. What are the measurements of the rectangle in the plan?",
        options: ["6 cm by 2.6 cm", "6 cm by 2.5 cm", "2.5 cm by 2.6 cm", "60 cm by 25 cm"],
        answerIndex: 1,
        explanation:
          "From directly above you see the length and the width, 6 m by 2.5 m, and at 1 : 100 each metre (100 cm) becomes 1 cm: 6 cm by 2.5 cm. 6 cm by 2.6 cm is the front elevation (length by height), and 2.5 cm by 2.6 cm is the side elevation. 60 cm by 25 cm uses 1 m = 10 cm.",
        difficulty: "core",
        guideRef: "plans-elevations",
        hints: [
          "Which two measurements can you see when you look straight down on the container?",
          "At 1 : 100, how long is 1 m on the paper?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q12",
        question:
          "The triangle is drawn on a grid of 1 cm squares, with corners at (1, 1), (6, 2) and (3, 5). What is its area?",
        diagram: GRID_TRIANGLE,
        options: ["9 cm²", "10 cm²", "11 cm²", "20 cm²"],
        answerIndex: 0,
        explanation:
          "Box it in: the surrounding rectangle is 5 by 4 = 20 cm². Cut away the three right-angled triangles in its corners: {{1/2}} × 5 × 1 = 2.5, {{1/2}} × 3 × 3 = 4.5 and {{1/2}} × 2 × 4 = 4, total 11 cm². Area = 20 − 11 = 9 cm². 10 cm² halves the surrounding rectangle, which only works when a whole side of the triangle lies along the rectangle. 11 cm² is the area of the three outside pieces, not the triangle.",
        difficulty: "core",
        guideRef: "rectangles-triangles",
        hints: [
          "No side is horizontal or vertical, so base × height is awkward. Can you fit a rectangle round the triangle?",
          "The surrounding rectangle runs from x = 1 to 6 and from y = 1 to 5.",
          "Subtract the three right-angled triangles in the corners of the rectangle.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q13",
        question:
          "Two identical trapezia, each with parallel sides a and b and height h, are placed side by side — one turned upside down — to make a parallelogram. What are the base and height of the parallelogram?",
        options: ["Base 2a, height h", "Base a + b, height h", "Base a + b, height 2h", "Base a × b, height h"],
        answerIndex: 1,
        explanation:
          "Turning one copy upside down puts its side b next to the other copy's side a, so the base is a + b, and the height is still h. The parallelogram's area is (a + b)h, and one trapezium is half of it: {{1/2}}(a + b)h. Height 2h would come from stacking the trapezia on top of each other, but here they sit side by side.",
        difficulty: "core",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Sketch it: put a second copy upside down next to the first.",
          "Which lengths line up along the bottom edge?",
        ],
        strategy: "Draw a diagram",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q14",
        question:
          "A rectangular school garden is 15 m by 10 m. It contains a rectangular pond 4 m by 3 m and a triangular flower bed with base 6 m and perpendicular height 4 m. The rest is grass. What area is grass?",
        options: ["114 m²", "138 m²", "174 m²", "126 m²"],
        answerIndex: 3,
        explanation:
          "Garden: 15 × 10 = 150 m². Pond: 4 × 3 = 12 m². Flower bed: {{1/2}} × 6 × 4 = 12 m². Grass = 150 − 12 − 12 = 126 m². 114 m² forgets to halve the triangle (taking away 24). 138 m² removes only one of the two features, and 174 m² adds the pond and bed instead of subtracting them.",
        difficulty: "core",
        guideRef: "compound-shapes",
        hints: [
          "Start with the whole garden, then take away everything that isn't grass.",
          "The flower bed is a triangle — remember the half.",
          "150 − 12 − 12 = ?",
        ],
        strategy: "Split into parts",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q15",
        question:
          "One corner of a wooden cube is sliced off, making a new small triangular face. How many vertices does the new solid have?",
        options: ["10", "7", "11", "8"],
        answerIndex: 0,
        explanation:
          "Slicing off a corner removes that 1 vertex but creates 3 new ones — the corners of the new triangle — so V = 8 − 1 + 3 = 10. Check with Euler: the solid has 6 + 1 = 7 faces and 12 + 3 = 15 edges, and 10 + 7 − 15 = 2 ✓. 7 only removes the old corner; 11 adds the three new vertices but forgets that the original corner has gone.",
        difficulty: "core",
        guideRef: "nets-and-euler",
        hints: [
          "What happens to the corner that the cut slices through?",
          "The new triangular face has 3 corners of its own.",
          "Check your answer with V + F − E = 2.",
        ],
        strategy: "Check by substituting",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q16",
        question:
          "A water tank on the roof of an HDB block is a cuboid 2 m by 1.5 m by 1 m. How many litres does it hold when full?",
        options: ["30 litres", "300 litres", "3000 litres", "3 000 000 litres"],
        answerIndex: 2,
        explanation:
          "Volume = 2 × 1.5 × 1 = 3 m³. A 1 m cube is 100 cm × 100 cm × 100 cm = 1 000 000 cm³ = 1000 litres, so 3 m³ = 3000 litres. 3 000 000 is the volume in cm³ (millilitres), not litres. 300 litres comes from thinking 1 m³ = 100 litres — scaling by 100 in only one direction instead of all three.",
        difficulty: "core",
        guideRef: "volume",
        hints: [
          "Find the volume in m³ first.",
          "How many litres fit in a 1 m by 1 m by 1 m cube? Think 100 cm × 100 cm × 100 cm.",
          "1 m³ = 1000 litres.",
        ],
        strategy: "Make it simpler",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q17",
        question: "Every edge of a cube is doubled in length. What is its total surface area multiplied by?",
        options: ["2", "8", "4", "It depends on how big the cube was"],
        answerIndex: 2,
        explanation:
          "Each face is a square whose side doubles, so its area becomes 2 × 2 = 4 times as big. All six faces do this, so the total is multiplied by 4 — for any cube. (Edge 1 cm: 6 cm². Edge 2 cm: 24 cm².) 2 assumes area grows like length. 8 is the scale factor for the *volume* (2 × 2 × 2), which grows in three directions.",
        difficulty: "challenge",
        guideRef: "surface-area",
        hints: [
          "Try it: the surface area of a 1 cm cube, then of a 2 cm cube.",
          "What happens to the area of one square face when its side doubles?",
          "Area grows in two directions at once.",
        ],
        strategy: "Try small cases",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q18",
        question:
          "A trapezium has an area of 60 cm² and a perpendicular height of 5 cm. One of its parallel sides is three times as long as the other. How long is the shorter parallel side?",
        options: ["3 cm", "6 cm", "4 cm", "18 cm"],
        answerIndex: 1,
        explanation:
          "Call the shorter side a, so the longer side is 3a. Then {{1/2}} × (a + 3a) × 5 = 60, which simplifies to 10a = 60, so a = 6 cm (and the longer side is 18 cm). Check: {{1/2}} × 24 × 5 = 60 ✓. 3 cm forgets the half. 18 cm is the longer side. 4 cm treats 60 ÷ 5 = 12 as the longer side, but the formula needs the *sum* of the parallel sides, halved.",
        difficulty: "challenge",
        guideRef: "parallelograms-trapezia",
        hints: [
          "Introduce a variable: call the shorter side a. What is the longer side?",
          "Substitute into {{1/2}}(a + b)h = 60.",
          "{{1/2}} × 4a × 5 simplifies to 10a.",
        ],
        strategy: "Introduce a variable",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q19",
        question:
          "Six 1 cm squares are joined edge to edge, with whole edges touching, to make one shape. What is the greatest possible perimeter of the shape?",
        options: ["24 cm", "12 cm", "10 cm", "14 cm"],
        answerIndex: 3,
        explanation:
          "Six separate squares have a total perimeter of 24 cm. Every join hides 2 cm (one edge from each square). To make one connected shape you need at least 5 joins, so the greatest perimeter is 24 − 5 × 2 = 14 cm — a straight 1 by 6 strip does it, and so does any shape with no 2 by 2 block in it. 10 cm is the *smallest* perimeter (a 2 by 3 rectangle, with 7 joins). 24 cm ignores the hidden edges, and 12 cm comes from a shape that contains a 2 by 2 block.",
        difficulty: "challenge",
        guideRef: "compound-shapes",
        hints: [
          "Start with six separate squares. What happens to the total perimeter each time two squares share an edge?",
          "Each shared edge removes 2 cm, so you want as few shared edges as possible.",
          "What is the fewest joins that still makes one connected shape?",
        ],
        strategy: "Consider extremes",
      },
      {
        kind: "mcq",
        id: "perimeter-area-volume-m4-q20",
        question:
          "Cylinder A has radius 2 cm and height 9 cm. Cylinder B has radius 3 cm and height 4 cm. Both are closed. Which statement is true?",
        options: [
          "They have the same volume, but A has the larger total surface area",
          "They have the same volume and the same total surface area",
          "A has the larger volume, because 2 × 9 is more than 3 × 4",
          "B has the larger volume, because it is wider",
        ],
        answerIndex: 0,
        explanation:
          "Volume = {{pi r^2 h}}: A is π × 4 × 9 = 36π cm³ and B is π × 9 × 4 = 36π cm³ — exactly equal. Surface area = {{2 pi r^2 + 2 pi r h}}: A is 8π + 36π = 44π cm² and B is 18π + 24π = 42π cm², so A has more. \"The same surface area\" is tempting, but equal volumes don't force equal surface areas — a tall, thin shape uses more surface. \"2 × 9 is more than 3 × 4\" forgets that the radius is squared.",
        difficulty: "challenge",
        guideRef: "cylinders",
        hints: [
          "Work out both volumes in terms of π using {{pi r^2 h}}.",
          "Now work out both total surface areas: two circles plus the curved rectangle.",
          "Compare the volumes first, then the surface areas.",
        ],
        strategy: "Split into cases",
      },
    ],
  },
];
