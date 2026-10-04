// Practice content for "Sequences & Functions" (topic id: sequences-graphs).
// Quick-check quiz, two practice papers and an AoPS-style challenge set.
import type { Paper, Question, TopicPractice } from "../../types.ts";

// ------------------------------- diagrams ----------------------------------

const HEX_ROW = `<svg viewBox="0 0 400 120" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A row of hexagons made of matchsticks. Pattern 1 is one hexagon, pattern 2 is two hexagons sharing a side, pattern 3 is three hexagons in a row."><rect x="0" y="0" width="400" height="120" fill="#ffffff"/><g fill="none" stroke="#334155" stroke-width="3" stroke-linejoin="round"><polygon points="45.6,40 61.2,49 61.2,67 45.6,76 30,67 30,49"/><polygon points="140.6,40 156.2,49 156.2,67 140.6,76 125,67 125,49"/><polygon points="171.8,40 187.4,49 187.4,67 171.8,76 156.2,67 156.2,49"/><polygon points="270.6,40 286.2,49 286.2,67 270.6,76 255,67 255,49"/><polygon points="301.8,40 317.4,49 317.4,67 301.8,76 286.2,67 286.2,49"/><polygon points="332.9,40 348.5,49 348.5,67 332.9,76 317.4,67 317.4,49"/></g><text x="45.6" y="106" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 1</text><text x="156.2" y="106" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 2</text><text x="301.8" y="106" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 3</text></svg>`;

const TRIANGLE_ROW = `<svg viewBox="0 0 400 110" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Matchstick triangles in a row. Pattern 1 is one triangle, pattern 2 is two triangles (one pointing up, one pointing down) sharing a side, pattern 3 is three triangles in a row."><rect x="0" y="0" width="400" height="110" fill="#ffffff"/><g stroke="#334155" stroke-width="3" stroke-linecap="round"><line x1="30" y1="59.7" x2="62" y2="59.7"/><line x1="30" y1="59.7" x2="46" y2="32"/><line x1="46" y1="32" x2="62" y2="59.7"/><line x1="120" y1="59.7" x2="152" y2="59.7"/><line x1="120" y1="59.7" x2="136" y2="32"/><line x1="136" y1="32" x2="152" y2="59.7"/><line x1="136" y1="32" x2="168" y2="32"/><line x1="152" y1="59.7" x2="168" y2="32"/><line x1="245" y1="59.7" x2="277" y2="59.7"/><line x1="245" y1="59.7" x2="261" y2="32"/><line x1="261" y1="32" x2="277" y2="59.7"/><line x1="261" y1="32" x2="293" y2="32"/><line x1="277" y1="59.7" x2="293" y2="32"/><line x1="277" y1="59.7" x2="309" y2="59.7"/><line x1="293" y1="32" x2="309" y2="59.7"/></g><text x="46" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 1</text><text x="144" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 2</text><text x="277" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 3</text></svg>`;

const TILE_PATTERNS = `<svg viewBox="0 0 380 112" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Tile patterns. Pattern 1 is one grey tile surrounded by 8 white tiles, pattern 2 is a row of 2 grey tiles surrounded by 10 white tiles, pattern 3 is a row of 3 grey tiles surrounded by 12 white tiles."><rect x="0" y="0" width="380" height="112" fill="#ffffff"/><rect x="24" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="42" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="60" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="24" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="42" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="60" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="24" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="42" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="60" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><text x="51" y="94" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 1</text><rect x="110" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="128" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="146" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="164" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="110" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="128" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="146" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="164" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="110" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="128" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="146" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="164" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><text x="146" y="94" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 2</text><rect x="232" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="250" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="268" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="286" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="304" y="18" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="232" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="250" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="268" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="286" y="36" width="18" height="18" fill="#94a3b8" stroke="#334155" stroke-width="1.5"/><rect x="304" y="36" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="232" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="250" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="268" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="286" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><rect x="304" y="54" width="18" height="18" fill="#ffffff" stroke="#334155" stroke-width="1.5"/><text x="277" y="94" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Pattern 3</text></svg>`;

const GRID_TWO_ROWS = `<svg viewBox="0 0 330 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Matchstick grids two squares tall. With n = 1 the grid is 1 square long, with n = 2 it is 2 squares long and with n = 3 it is 3 squares long."><rect x="0" y="0" width="330" height="100" fill="#ffffff"/><g stroke="#334155" stroke-width="3" stroke-linecap="round"><line x1="26" y1="16" x2="48" y2="16"/><line x1="26" y1="42" x2="48" y2="42"/><line x1="26" y1="68" x2="48" y2="68"/><line x1="24" y1="18" x2="24" y2="40"/><line x1="50" y1="18" x2="50" y2="40"/><line x1="24" y1="44" x2="24" y2="66"/><line x1="50" y1="44" x2="50" y2="66"/><line x1="102" y1="16" x2="124" y2="16"/><line x1="128" y1="16" x2="150" y2="16"/><line x1="102" y1="42" x2="124" y2="42"/><line x1="128" y1="42" x2="150" y2="42"/><line x1="102" y1="68" x2="124" y2="68"/><line x1="128" y1="68" x2="150" y2="68"/><line x1="100" y1="18" x2="100" y2="40"/><line x1="126" y1="18" x2="126" y2="40"/><line x1="152" y1="18" x2="152" y2="40"/><line x1="100" y1="44" x2="100" y2="66"/><line x1="126" y1="44" x2="126" y2="66"/><line x1="152" y1="44" x2="152" y2="66"/><line x1="208" y1="16" x2="230" y2="16"/><line x1="234" y1="16" x2="256" y2="16"/><line x1="260" y1="16" x2="282" y2="16"/><line x1="208" y1="42" x2="230" y2="42"/><line x1="234" y1="42" x2="256" y2="42"/><line x1="260" y1="42" x2="282" y2="42"/><line x1="208" y1="68" x2="230" y2="68"/><line x1="234" y1="68" x2="256" y2="68"/><line x1="260" y1="68" x2="282" y2="68"/><line x1="206" y1="18" x2="206" y2="40"/><line x1="232" y1="18" x2="232" y2="40"/><line x1="258" y1="18" x2="258" y2="40"/><line x1="284" y1="18" x2="284" y2="40"/><line x1="206" y1="44" x2="206" y2="66"/><line x1="232" y1="44" x2="232" y2="66"/><line x1="258" y1="44" x2="258" y2="66"/><line x1="284" y1="44" x2="284" y2="66"/></g><text x="37" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">n = 1</text><text x="126" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">n = 2</text><text x="245" y="92" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">n = 3</text></svg>`;

const BIG_TRIANGLES = `<svg viewBox="0 0 360 130" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Large triangles made of matchsticks. Side 1 is one small triangle. Side 2 is made of 4 small triangles. Side 3 is made of 9 small triangles."><rect x="0" y="0" width="360" height="130" fill="#ffffff"/><g fill="none" stroke="#334155" stroke-width="3" stroke-linejoin="round"><polygon points="45,66 60,91.9 30,91.9"/><polygon points="140,40 155,66 125,66"/><polygon points="125,66 140,91.9 110,91.9"/><polygon points="155,66 170,91.9 140,91.9"/><polygon points="275,14 290,40 260,40"/><polygon points="260,40 275,66 245,66"/><polygon points="290,40 305,66 275,66"/><polygon points="245,66 260,91.9 230,91.9"/><polygon points="275,66 290,91.9 260,91.9"/><polygon points="305,66 320,91.9 290,91.9"/></g><text x="45" y="113.9" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Side 1</text><text x="140" y="113.9" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Side 2</text><text x="275" y="113.9" font-family="sans-serif" font-size="12" fill="#1f2937" text-anchor="middle">Side 3</text></svg>`;

// --------------------------------- quiz ------------------------------------

const quiz: Question[] = [
  {
    kind: "mcq",
    id: "sequences-graphs-quiz-q01",
    question: "A sequence starts at 5. Its term-to-term rule is 'multiply by 2, then subtract 3'. What is the 4th term?",
    options: ["19", "35", "−2", "37"],
    answerIndex: 0,
    explanation:
      "Apply the whole rule once per step: 5 → 7 → 11 → 19, so the 4th term is 19. 35 is one step too far: the first term already counts, so only three steps are needed to reach the 4th term. −2 comes from subtracting 3 *before* doubling, and 37 from doubling three times and subtracting 3 only once at the end.",
    difficulty: "warmup",
    guideRef: "term-to-term",
    hints: [
      "How many steps take you from the 1st term to the 4th term?",
      "One step means: double, then subtract 3. From 5 the next term is 5 × 2 − 3 = 7.",
    ],
  },
  {
    kind: "short",
    id: "sequences-graphs-quiz-q02",
    question: "The nth term of a sequence is 20 − 4n. Work out the 7th term.",
    answer: { type: "number", value: -8 },
    traps: [
      {
        spec: { type: "number", value: 112 },
        feedback: "That is (20 − 4) × 7. Multiply before you subtract: 4 × 7 = 28 first, then 20 − 28.",
      },
    ],
    solution: ["Substitute n = 7.", "Multiply first: 4 × 7 = 28.", "20 − 28 = −8."],
    commonError: "Working out (20 − 4) × 7 = 112. The rule means 20 take away four lots of n.",
    difficulty: "warmup",
    guideRef: "using-nth-term",
    hints: ["Replace n with 7.", "Do 4 × 7 before the subtraction."],
  },
  {
    kind: "mcq",
    id: "sequences-graphs-quiz-q03",
    question: "Which of these sequences is **geometric**?",
    options: ["3, 6, 9, 12, …", "3, 6, 12, 24, …", "1, 4, 9, 16, …", "2, 3, 5, 8, …"],
    answerIndex: 1,
    explanation:
      "In 3, 6, 12, 24, … every term is the one before multiplied by 2 (a common ratio of 2), so it is geometric. 3, 6, 9, 12, … also starts 3, 6 but *adds* 3 each time, so it is arithmetic. The square numbers 1, 4, 9, 16 have ratios 4, 2.25, … which are not constant, and 2, 3, 5, 8 is Fibonacci-type (each term is the sum of the two before).",
    difficulty: "warmup",
    guideRef: "special-sequences",
    hints: [
      "Geometric means *multiply by the same number* each time.",
      "Divide each term by the one before it. Which sequence gives the same answer every time?",
    ],
    strategy: "Eliminate options",
  },
  {
    kind: "short",
    id: "sequences-graphs-quiz-q04",
    question: "Find the nth term of the sequence 13, 9, 5, 1, … (type an expression in n).",
    answer: { type: "expression", expr: "17-4n", display: "{{17 - 4n}}" },
    traps: [
      {
        spec: { type: "expression", expr: "4n+9" },
        feedback: "The terms go *down*, so the coefficient of n must be negative: the difference is −4, not 4.",
      },
      {
        spec: { type: "expression", expr: "13-4n" },
        feedback: "Your rule gives 9 when n = 1. The constant is the zero term, one step *before* 13: 13 + 4 = 17.",
      },
    ],
    solution: [
      "Common difference: 9 − 13 = −4, so the rule contains −4n.",
      "Zero term: step back from 13 by reversing the rule: 13 + 4 = 17.",
      "nth term = 17 − 4n.",
      "Check n = 3: 17 − 12 = 5 ✓",
    ],
    commonError: "Writing 4n + … for a decreasing sequence. If the terms go down, the n-term is negative.",
    difficulty: "core",
    guideRef: "finding-nth-term",
    hints: [
      "What is the difference between consecutive terms? Careful with the sign.",
      "The difference is the coefficient of n. What would the term *before* 13 be (the zero term)?",
      "The zero term is 13 + 4 = 17. Put the two pieces together.",
    ],
    strategy: "Check by substituting",
  },
  {
    kind: "mcq",
    id: "sequences-graphs-quiz-q05",
    question: "A function machine does 'divide by 3', then 'add 5'. The output is 9. What was the input?",
    options: ["22", "8", "12", "{{4/3}}"],
    answerIndex: 2,
    explanation:
      "Undo the steps in reverse order: 9 − 5 = 4, then 4 × 3 = 12. Check: 12 ÷ 3 + 5 = 9 ✓. 22 comes from undoing the steps in the wrong order (9 × 3 − 5), 8 from running the machine forwards on 9, and {{4/3}} from dividing by 3 again instead of multiplying to undo the division.",
    difficulty: "core",
    guideRef: "functions",
    hints: [
      "To go backwards, undo the *last* step first.",
      "The inverse of 'add 5' is 'subtract 5'. The inverse of 'divide by 3' is 'multiply by 3'.",
    ],
    strategy: "Work backwards",
  },
  {
    kind: "short",
    id: "sequences-graphs-quiz-q06",
    question: "The nth term of a sequence is 6n + 5. Which term of the sequence is equal to 131? (Give the position n.)",
    answer: { type: "number", value: 21 },
    traps: [
      {
        spec: { type: "number", value: 791 },
        feedback: "You used 131 as the position. Here 131 is a *term*: solve 6n + 5 = 131 to find its position.",
      },
    ],
    solution: [
      "Set the nth term equal to 131: 6n + 5 = 131.",
      "Subtract 5: 6n = 126.",
      "Divide by 6: n = 21.",
      "Check: 6 × 21 + 5 = 131 ✓, so 131 is the 21st term.",
    ],
    difficulty: "core",
    guideRef: "is-it-a-term",
    hints: ["Is 131 a position or a term? Which letter does it replace?", "Solve 6n + 5 = 131."],
    strategy: "Use the inverse",
  },
  {
    kind: "short",
    id: "sequences-graphs-quiz-q07",
    question:
      "Ravi builds rows of hexagons from matchsticks, as shown. Pattern 1 uses 6 matches, pattern 2 uses 11 and pattern 3 uses 16. How many matches does pattern 25 use?",
    diagram: HEX_ROW,
    answer: { type: "number", value: 126 },
    traps: [
      {
        spec: { type: "number", value: 150 },
        feedback: "25 × 6 assumes every hexagon needs 6 new matches. After the first one, each hexagon shares a side with its neighbour, so it needs only 5 more.",
      },
      {
        spec: { type: "number", value: 131 },
        feedback: "One step too many. From pattern 1 to pattern 25 there are 24 steps, not 25.",
      },
    ],
    solution: [
      "Each new hexagon shares one side with the one before, so it adds 5 matches: 6, 11, 16, …",
      "From pattern 1 to pattern 25 is 24 steps of 5.",
      "6 + 24 × 5 = 6 + 120 = 126.",
      "Check with the nth term 5n + 1: 5 × 25 + 1 = 126 ✓",
    ],
    solutions: [
      {
        label: "Count the pieces",
        steps: [
          "Think of each hexagon as 5 matches (a hexagon missing its left side), plus 1 extra match to close the left end of the row.",
          "Pattern 25: 25 × 5 + 1 = 126. This is quicker once you see it, and it explains where 5n + 1 comes from.",
        ],
      },
    ],
    difficulty: "core",
    guideRef: "term-to-term",
    hints: [
      "How many *new* matches does each extra hexagon need? Look at the picture.",
      "From pattern 1 to pattern 25, how many hexagons are added?",
      "Work out 6 + 24 × 5.",
    ],
    strategy: "Draw a diagram",
  },
  {
    kind: "mcq",
    id: "sequences-graphs-quiz-q08",
    question: "A function maps 2 → 7 and 5 → 16. Which rule could it be?",
    options: ["x → x + 5", "x → 4x − 1", "x → 2x + 3", "x → 3x + 1"],
    answerIndex: 3,
    explanation:
      "Test both pairs. 3 × 2 + 1 = 7 and 3 × 5 + 1 = 16 ✓. The other rules all fit 2 → 7 but fail for 5: x + 5 gives 10, 4x − 1 gives 19 and 2x + 3 gives 13. One matching pair is not enough evidence; a rule must work for every input.",
    difficulty: "core",
    guideRef: "functions",
    hints: [
      "Test each rule with **both** inputs, not just the first.",
      "The input went up by 3 and the output went up by 9. What does that say about the multiplier?",
    ],
    strategy: "Check by substituting",
  },
  {
    kind: "written",
    id: "sequences-graphs-quiz-q09",
    question: "Is 300 a term of the sequence 7, 11, 15, 19, …? Explain how you know.",
    marks: 3,
    modelAnswer:
      "The sequence goes up in 4s and the zero term is 7 − 4 = 3, so the nth term is 4n + 3. If 300 were a term, 4n + 3 = 300, so 4n = 297 and n = 74.25. That is not a whole number, so 300 is **not** a term: the 74th term is 299 and the 75th is 303, so the sequence jumps over 300. (A quicker reason: every term is odd, and 300 is even.)",
    markScheme: [
      {
        point: "Finds the nth term 4n + 3 (or notes that every term is odd)",
        keywords: ["4n + 3", "4n+3", "odd"],
      },
      {
        point: "Solves 4n + 3 = 300 to get n = 74.25, or shows the terms either side are 299 and 303, or notes 300 is even",
        keywords: ["74.25", "297", "299", "303", "even"],
      },
      {
        point: "Concludes 300 is not a term because n is not a whole number (or because of odd/even)",
        keywords: ["not a whole number", "not a term", "not in", "whole number", "never"],
      },
    ],
    commonError: "Saying 'no' without a reason, or checking only that 300 is not in the first few terms.",
    difficulty: "core",
    guideRef: "is-it-a-term",
    hints: [
      "Find the nth term first.",
      "Set your nth term equal to 300 and solve. What kind of number must n be?",
      "Is there an even quicker reason? Look at whether the terms are odd or even.",
    ],
    strategy: "Use the inverse",
  },
  {
    kind: "short",
    id: "sequences-graphs-quiz-q10",
    question:
      "In a Fibonacci-type sequence, each term after the second is the sum of the two terms before it. The 1st term is 2 and the 6th term is 46. What is the 2nd term?",
    answer: { type: "number", value: 8 },
    traps: [
      {
        spec: { type: "number", value: 10.8 },
        feedback: "That treats the sequence as arithmetic (equal steps). Here each term is the *sum of the two before it*.",
      },
    ],
    solution: [
      "Call the 2nd term b. Build the sequence: 2, b, 2 + b, 2 + 2b, 4 + 3b, 6 + 5b.",
      "The 6th term is 6 + 5b = 46, so 5b = 40 and b = 8.",
      "Check: 2, 8, 10, 18, 28, 46 ✓",
    ],
    difficulty: "challenge",
    guideRef: "special-sequences",
    hints: [
      "You don't know the 2nd term, so give it a letter.",
      "Call it b. Write the 3rd, 4th, 5th and 6th terms in terms of b.",
      "The 6th term is 6 + 5b. Set it equal to 46.",
    ],
    strategy: "Introduce a variable",
  },
];

// -------------------------------- paper 1 ----------------------------------

const paper1: Paper = {
  id: "sequences-graphs-p1",
  title: "Practice Paper 1",
  questions: [
    {
      kind: "short",
      id: "sequences-graphs-p1-q01",
      question: "Write down the next term of the sequence 4.8, 4.35, 3.9, 3.45, …",
      answer: { type: "number", value: 3, display: "3 (or 3.00)" },
      traps: [
        {
          spec: { type: "number", value: 2.9 },
          feedback: "Check the gap. Line up the decimal points: 4.80 − 4.35 = 0.45, not 0.55.",
        },
      ],
      solution: [
        "Find the gap: 4.80 − 4.35 = 0.45, and 4.35 − 3.90 = 0.45.",
        "The rule is 'subtract 0.45'.",
        "3.45 − 0.45 = 3.",
      ],
      commonError: "Misaligning the decimals. Write 4.8 as 4.80 before subtracting 4.35.",
      difficulty: "warmup",
      guideRef: "term-to-term",
      hints: ["Find the gap between the first two terms. Write 4.8 as 4.80 to line up the digits."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q02",
      question: "The nth term of a sequence is 5n − 7. Write down the first three terms, in order.",
      answer: { type: "list", values: [-2, 3, 8], ordered: true, display: "−2, 3, 8" },
      traps: [
        {
          spec: { type: "list", values: [-7, -2, 3], ordered: true },
          feedback: "You started at n = 0. The first term uses n = 1: 5 × 1 − 7 = −2.",
        },
      ],
      solution: ["n = 1: 5 − 7 = −2.", "n = 2: 10 − 7 = 3.", "n = 3: 15 − 7 = 8.", "The terms go up in 5s, the coefficient of n."],
      difficulty: "warmup",
      guideRef: "using-nth-term",
      hints: ["Substitute n = 1, then n = 2, then n = 3."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q03",
      question: "The first term of a sequence is 96. The term-to-term rule is 'multiply by {{3/4}}'. Work out the 3rd term.",
      answer: { type: "number", value: 54 },
      traps: [
        {
          spec: { type: "number", value: 40.5 },
          feedback: "That is the 4th term. The 1st term is already 96, so only two steps take you to the 3rd term.",
        },
      ],
      solution: [
        "2nd term: {{96 * 3/4}} = 72 (96 ÷ 4 = 24, then × 3).",
        "3rd term: {{72 * 3/4}} = 54 (72 ÷ 4 = 18, then × 3).",
      ],
      difficulty: "warmup",
      guideRef: "term-to-term",
      hints: ["To multiply by {{3/4}}, divide by 4 and then multiply by 3.", "Only two steps take you from the 1st term to the 3rd."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q04",
      question: "Each term of this sequence is the sum of the two terms before it: 3, 4, 7, 11, 18, … Write down the next two terms, in order.",
      answer: { type: "list", values: [29, 47], ordered: true, display: "29, 47" },
      traps: [
        {
          spec: { type: "list", values: [25, 32], ordered: true },
          feedback: "The differences 1, 3, 4, 7 are not constant, so the rule is not 'add 7'. Add the two previous terms: 11 + 18.",
        },
      ],
      solution: ["11 + 18 = 29.", "18 + 29 = 47."],
      difficulty: "warmup",
      guideRef: "special-sequences",
      hints: ["Add the last two terms to get the next one."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q05",
      question: "A function machine does '× 4', then '− 7'. What is the output when the input is {{1/2}}?",
      answer: { type: "number", value: -5 },
      traps: [
        {
          spec: { type: "number", value: -26 },
          feedback: "You subtracted 7 first. The machine multiplies first: {{1/2 * 4 = 2}}, then 2 − 7.",
        },
      ],
      solution: ["{{1/2 * 4 = 2}}.", "2 − 7 = −5."],
      difficulty: "warmup",
      guideRef: "functions",
      hints: ["Follow the operations in order, left to right.", "Half of 4 is 2."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q06",
      question: "Find the nth term of the sequence 5, 11, 17, 23, … (type an expression in n).",
      answer: { type: "expression", expr: "6n-1", display: "{{6n - 1}}" },
      traps: [
        {
          spec: { type: "expression", expr: "n+6" },
          feedback: "That is the term-to-term rule (add 6). The nth term must give the 1st term when n = 1, the 2nd term when n = 2, and so on.",
        },
        {
          spec: { type: "expression", expr: "6n+5" },
          feedback: "Your rule gives 11 when n = 1. The constant is the zero term, one step *before* the first term: 5 − 6 = −1.",
        },
      ],
      solution: [
        "The difference is 6, so the rule starts 6n.",
        "Zero term: 5 − 6 = −1.",
        "nth term = 6n − 1.",
        "Check n = 4: 24 − 1 = 23 ✓",
      ],
      solutions: [
        {
          label: "Compare with the 6 times table",
          steps: ["6n gives 6, 12, 18, 24, …", "Every term of the sequence is 1 less.", "So the nth term is 6n − 1."],
        },
      ],
      difficulty: "core",
      guideRef: "finding-nth-term",
      hints: [
        "What is the common difference?",
        "Compare the sequence with the 6 times table: 6, 12, 18, 24. How far is each term from it?",
        "Every term is 1 less than a multiple of 6.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q07",
      question: "The nth term of a sequence is {{(5n - 2)/3}}. Work out the 8th term. Give your answer as a fraction or a mixed number.",
      answer: { type: "fraction", n: 38, d: 3, display: "{{38/3}} = {{12 2/3}}" },
      traps: [
        {
          spec: { type: "fraction", n: 34, d: 3 },
          feedback: "That is {{(5 * 8)/3}} − 2. The line means the *whole* of 5n − 2 is divided by 3, so work out the top first.",
        },
      ],
      solution: ["Numerator: 5 × 8 − 2 = 38.", "Divide by 3: {{38/3}} = {{12 2/3}}."],
      commonError: "Dividing only the 5n by 3. The fraction line acts like a bracket around 5n − 2.",
      difficulty: "core",
      guideRef: "using-nth-term",
      hints: ["Work out the numerator 5n − 2 with n = 8 first.", "Then divide the whole numerator by 3."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q08",
      question: "Which term of the sequence 11, 18, 25, 32, … is equal to 249? (Give the position n.)",
      answer: { type: "number", value: 35 },
      traps: [
        {
          spec: { type: "number", value: 34 },
          feedback: "Check your nth term. The zero term is 11 − 7 = 4, so the nth term is 7n + 4, not 7n + 11.",
        },
        {
          spec: { type: "number", value: 1747 },
          feedback: "You used 249 as the position. 249 is a *term*: solve 7n + 4 = 249.",
        },
      ],
      solution: [
        "Difference 7; zero term 11 − 7 = 4; nth term 7n + 4.",
        "7n + 4 = 249, so 7n = 245 and n = 35.",
        "Check: 7 × 35 + 4 = 249 ✓",
      ],
      solutions: [
        {
          label: "Count the steps",
          steps: [
            "From 11 up to 249 is 249 − 11 = 238.",
            "238 ÷ 7 = 34 steps of 7.",
            "34 steps after the 1st term is the 35th term. Quick in your head, but the nth-term method also tells you when a number is *not* a term.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "is-it-a-term",
      hints: [
        "Find the nth term first.",
        "Set the nth term equal to 249 and solve.",
        "Or: how many steps of 7 take you from 11 to 249?",
      ],
      strategy: "Use the inverse",
    },
    {
      kind: "written",
      id: "sequences-graphs-p1-q09",
      question:
        "Matchstick triangles are joined in a row, as shown. Pattern 1 uses 3 matches, pattern 2 uses 5 and pattern 3 uses 7.\n\nArjun says: 'Pattern 1 uses 3 matches, so pattern 10 uses 10 × 3 = 30 matches.'\n\nExplain why Arjun is wrong, and find the correct number of matches for pattern 10.",
      diagram: TRIANGLE_ROW,
      marks: 3,
      modelAnswer:
        "Each new triangle shares a side with the triangle before it, so it needs only **2** new matches, not 3. The counts go 3, 5, 7, … (add 2), not 3, 6, 9, …, so you cannot just multiply the pattern number by 3. Pattern 10 is 9 steps after pattern 1, so it uses 3 + 9 × 2 = **21** matches. (The nth term is 2n + 1, and 2 × 10 + 1 = 21.)",
      markScheme: [
        {
          point: "Each new triangle adds only 2 matches because a side is shared",
          keywords: ["shares", "shared", "share", "2 new", "2 more", "adds 2", "add 2"],
        },
        {
          point: "So the counts are not the 3 times table (3, 5, 7 not 3, 6, 9): multiplying by 3 does not work",
          keywords: ["3, 6, 9", "not 3", "times table", "proportional", "not multiply", "can't multiply"],
        },
        {
          point: "Correct answer 21 (e.g. 3 + 9 × 2 or 2n + 1)",
          keywords: ["21", "2n + 1", "2n+1"],
        },
      ],
      commonError: "Assuming you can multiply for any pattern. That only works when the sequence is a times table (its zero term is 0).",
      difficulty: "core",
      guideRef: "term-to-term",
      hints: [
        "How many *new* matches does each extra triangle need? Look at the picture.",
        "Do the counts go 3, 6, 9, …? What do they actually go up by?",
        "Pattern 10 is 9 steps after pattern 1.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q10",
      question: "Find the nth term of the sequence {{3/4}}, {{5/4}}, {{7/4}}, {{9/4}}, … (type an expression in n).",
      answer: { type: "expression", expr: "(2n+1)/4", display: "{{(2n + 1)/4}}, which is the same as {{1/2 n + 1/4}}" },
      traps: [
        {
          spec: { type: "expression", expr: "n/2+3/4" },
          feedback: "Your rule gives {{5/4}} when n = 1. The constant is the zero term, one step *before* {{3/4}}: {{3/4 - 1/2 = 1/4}}.",
        },
        {
          spec: { type: "expression", expr: "2n+1" },
          feedback: "That gives the numerators 3, 5, 7, 9. Every term is that many *quarters*, so divide by 4.",
        },
      ],
      solution: [
        "Difference: {{5/4 - 3/4 = 2/4 = 1/2}}, so the rule starts {{1/2 n}}.",
        "Zero term: {{3/4 - 1/2 = 1/4}}.",
        "nth term = {{1/2 n + 1/4}}, which is the same as {{(2n + 1)/4}}.",
        "Check n = 3: {{(6 + 1)/4 = 7/4}} ✓",
      ],
      solutions: [
        {
          label: "Look at the numerators",
          steps: [
            "Every term is a number of quarters: 3, 5, 7, 9 quarters.",
            "The numerators 3, 5, 7, 9 have nth term 2n + 1.",
            "So the nth term is {{(2n + 1)/4}}. This is quicker whenever all the terms share a denominator.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "finding-nth-term",
      hints: [
        "What is the difference between terms? Write it as a fraction.",
        "The difference is {{1/2}}. What is the zero term?",
        "Or: look only at the numerators 3, 5, 7, 9.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q11",
      question: "A geometric sequence begins 2, −6, 18, … Work out the 6th term.",
      answer: { type: "number", value: -486 },
      traps: [
        {
          spec: { type: "number", value: 1458 },
          feedback: "That is one multiplication too many. From the 1st term to the 6th term there are five multiplications by −3.",
        },
      ],
      solution: [
        "Common ratio: −6 ÷ 2 = −3.",
        "Keep multiplying by −3: 2, −6, 18, −54, 162, −486.",
        "The 6th term is −486. (The signs alternate, so every even-numbered term is negative.)",
      ],
      difficulty: "core",
      guideRef: "special-sequences",
      hints: [
        "Divide a term by the one before it to find the common ratio.",
        "The ratio is −3. Keep going, watching the signs.",
        "The signs alternate: +, −, +, −, …",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q12",
      question: "A function machine does '× {{2/3}}', then '+ 4'. The output is 10. What was the input?",
      answer: { type: "number", value: 9 },
      traps: [
        {
          spec: { type: "number", value: 4 },
          feedback: "You multiplied by {{2/3}} again. The inverse of × {{2/3}} is ÷ {{2/3}}, which is the same as × {{3/2}}.",
        },
        {
          spec: { type: "number", value: 11 },
          feedback: "Undo the *last* step first: subtract 4 before you deal with the {{2/3}}.",
        },
      ],
      solution: [
        "Undo '+ 4': 10 − 4 = 6.",
        "Undo '× {{2/3}}': {{6 * 3/2 = 9}}.",
        "Check: {{9 * 2/3 = 6}}, and 6 + 4 = 10 ✓",
      ],
      difficulty: "core",
      guideRef: "functions",
      hints: [
        "Work backwards. Which step do you undo first?",
        "After undoing '+ 4' you have 6. What number times {{2/3}} gives 6?",
        "Dividing by {{2/3}} is the same as multiplying by {{3/2}}.",
      ],
      strategy: "Work backwards",
    },
    {
      kind: "written",
      id: "sequences-graphs-p1-q13",
      question:
        "Jun is asked for the nth term of 40, 34, 28, 22, … He writes:\n\n    difference = 6, so the rule starts 6n\n    40 − 6 = 34, so nth term = 6n + 34\n\nExplain Jun's mistakes and write down the correct nth term.",
      marks: 3,
      modelAnswer:
        "The sequence goes **down** by 6, so the difference is −6 and the rule must contain −6n, not 6n. (Jun's rule gives 40, 46, 52, …, which goes up.) The zero term is one step *before* 40, so you reverse the rule: 40 + 6 = 46, not 40 − 6 = 34. The correct nth term is **46 − 6n**. Check: n = 2 gives 46 − 12 = 34 ✓ and n = 4 gives 46 − 24 = 22 ✓.",
      markScheme: [
        {
          point: "The difference is −6 because the terms decrease, so the coefficient of n is −6",
          keywords: ["-6", "−6", "negative", "decreas", "goes down", "going down"],
        },
        {
          point: "The zero term is 40 + 6 = 46 (not 34)",
          keywords: ["46", "zero term"],
        },
        {
          point: "Correct nth term 46 − 6n",
          keywords: ["46 - 6n", "46-6n", "46 − 6n", "46−6n", "-6n + 46", "-6n+46", "−6n + 46"],
        },
      ],
      commonError: "Using the size of the difference but ignoring its sign.",
      difficulty: "core",
      guideRef: "finding-nth-term",
      hints: [
        "Test Jun's rule: what does it give when n = 2?",
        "The terms go down. What sign must the coefficient of n have?",
        "To step back from 40, reverse the rule: the term before 40 is 40 + 6.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q14",
      question: "The nth term of a sequence is 9n + 4. What is the first term of the sequence that is greater than 200?",
      answer: { type: "number", value: 202 },
      traps: [
        {
          spec: { type: "number", value: 22 },
          feedback: "22 is the position. The question asks for the term itself: 9 × 22 + 4.",
        },
        {
          spec: { type: "number", value: 193 },
          feedback: "193 is the 21st term, but it is less than 200. Go one term further.",
        },
      ],
      solution: [
        "Solve 9n + 4 > 200: 9n > 196, so n > 21.77…",
        "The first whole number above 21.77… is n = 22.",
        "The 22nd term is 9 × 22 + 4 = 202.",
        "Check: the 21st term is 193, which is not above 200 ✓",
      ],
      difficulty: "core",
      guideRef: "is-it-a-term",
      hints: [
        "Pretend it is an equation: solve 9n + 4 = 200.",
        "n = 21.77… is not a whole number. Which position comes next?",
        "Now work out the term at that position.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q15",
      question: "The triangular numbers are 1, 3, 6, 10, 15, … Work out the 20th triangular number.",
      answer: { type: "number", value: 210 },
      traps: [
        {
          spec: { type: "number", value: 200 },
          feedback: "That is 20 × 20 ÷ 2. Two staircases of dots make an n by (n + 1) rectangle, not an n by n square.",
        },
        {
          spec: { type: "number", value: 190 },
          feedback: "That is the 19th triangular number. Test your method on a small case: the 4th should be 10.",
        },
      ],
      solution: ["The nth triangular number is {{(n(n + 1))/2}}.", "{{(20 * 21)/2 = 420/2 = 210}}."],
      solutions: [
        {
          label: "Pair them up",
          steps: [
            "The 20th triangular number is 1 + 2 + 3 + … + 20.",
            "Pair 1 with 20, 2 with 19, 3 with 18, …: 10 pairs, each adding to 21.",
            "10 × 21 = 210. This pairing trick is the same idea as two staircases making a rectangle.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "special-sequences",
      hints: [
        "The nth triangular number is 1 + 2 + 3 + … + n.",
        "Two copies of the staircase fit together into a rectangle. What size is it for n = 20?",
        "A 20 × 21 rectangle holds 420 dots, and one staircase is half of it.",
      ],
      strategy: "Use symmetry",
    },
    {
      kind: "written",
      id: "sequences-graphs-p1-q16",
      question: "Mei says: 'The rule *square the input* is not a function, because 3 and −3 both give 9.'\n\nIs Mei right? Explain your answer.",
      marks: 3,
      modelAnswer:
        "Mei is **wrong**. A function must give each input **exactly one** output. Squaring does that: 3 → 9 only, and −3 → 9 only. Two different inputs sharing the same output is allowed. What would break the rule is one input having two outputs, for example 'give a number whose square is the input', where the input 9 has two outputs, 3 and −3.",
      markScheme: [
        {
          point: "A function needs each input to have exactly one output",
          keywords: ["one output", "each input", "exactly one", "only one"],
        },
        {
          point: "Squaring gives each input only one output; two inputs sharing an output is allowed",
          keywords: ["allowed", "can share", "same output", "both give 9", "doesn't matter"],
        },
        {
          point: "Concludes Mei is wrong: squaring is a function (ideally with a non-example such as 'number whose square is the input')",
          keywords: ["wrong", "not right", "is a function", "square root", "two outputs"],
        },
      ],
      commonError: "Thinking that two inputs with the same output breaks the rule. It is one input with two outputs that is not allowed.",
      difficulty: "core",
      guideRef: "functions",
      hints: [
        "What is the definition of a function: one input gives how many outputs?",
        "Does any single input of 'square it' give two different answers?",
        "Is it a problem if two *different* inputs give the same output?",
      ],
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q17",
      question: "Sequence A has nth term 4n + 1. Sequence B has nth term 6n − 1. How many numbers less than 100 appear in **both** sequences?",
      answer: { type: "number", value: 8 },
      traps: [
        {
          spec: { type: "number", value: 4 },
          feedback: "The common terms go up by 12, the LCM of 4 and 6, not by 4 × 6 = 24. List them to check.",
        },
        {
          spec: { type: "number", value: 9 },
          feedback: "Check the end: after 89 the next common term is 101, which is not less than 100.",
        },
      ],
      solution: [
        "Start listing. A: 5, 9, 13, 17, 21, 25, 29, … B: 5, 11, 17, 23, 29, …",
        "Common terms: 5, 17, 29, … They go up by 12, the LCM of the two differences 4 and 6.",
        "Below 100: 5, 17, 29, 41, 53, 65, 77, 89. The next one, 101, is too big.",
        "That is 8 numbers.",
      ],
      solutions: [
        {
          label: "An nth term for the common terms",
          steps: [
            "The common terms start at 5 and go up in 12s, so their nth term is 12n − 7.",
            "12n − 7 < 100 gives 12n < 107, so n < 8.9…",
            "n = 1 to 8 gives 8 numbers. Slicker than listing when the limit is large, say 1000.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "is-it-a-term",
      hints: [
        "Write out the first few terms of each sequence. Which numbers appear in both?",
        "Look at the gaps between the common terms. Why is it that gap?",
        "The common terms go up in 12s from 5. Count the ones below 100.",
      ],
      strategy: "Try small cases",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q18",
      question: "**Stretch.** Find the nth term of the quadratic sequence 3, 9, 19, 33, 51, … (type an expression in n, using ^ for powers, e.g. n^2).",
      answer: { type: "expression", expr: "2n^2+1", display: "{{2n^2 + 1}}" },
      traps: [
        {
          spec: { type: "expression", expr: "4n^2-1" },
          feedback: "The coefficient of {{n^2}} is *half* the second difference: 4 ÷ 2 = 2.",
        },
        {
          spec: { type: "expression", expr: "n^2+2" },
          feedback: "{{n^2}} has a second difference of 2, but this sequence has a second difference of 4. You need {{2n^2}}.",
        },
      ],
      solution: [
        "First differences: 6, 10, 14, 18. Second differences: 4, 4, 4.",
        "Half of 4 is 2, so the sequence contains {{2n^2}}: 2, 8, 18, 32, 50.",
        "Subtract: 3 − 2 = 1, 9 − 8 = 1, 19 − 18 = 1, … always 1.",
        "nth term = {{2n^2 + 1}}.",
      ],
      difficulty: "challenge",
      guideRef: "quadratic-sequences",
      hints: [
        "Find the first differences, then the differences between those.",
        "The second difference is 4. What multiple of {{n^2}} does that point to?",
        "Write out {{2n^2}}: 2, 8, 18, 32, 50. Compare with the sequence.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "written",
      id: "sequences-graphs-p1-q19",
      question:
        "Hana says: 'The sequence 2, 7, 12, 17, 22, … goes on forever, so it must contain a square number somewhere.'\n\nShow that Hana is wrong: no term of this sequence is a square number.",
      marks: 3,
      modelAnswer:
        "The terms start at 2 and go up in 5s, so every term ends in **2 or 7**: 2, 7, 12, 17, 22, 27, … The last digit of a square number depends only on the last digit of the number being squared, and {{0^2}}, {{1^2}}, {{2^2}}, …, {{9^2}} end in 0, 1, 4, 9, 6, 5, 6, 9, 4, 1. So square numbers can only end in **0, 1, 4, 5, 6 or 9**, never in 2 or 7. Therefore no term of the sequence is a square, even though the sequence goes on forever.",
      markScheme: [
        {
          point: "Every term ends in 2 or 7 (the nth term is 5n − 3)",
          keywords: ["ends in 2", "end in 2", "2 or 7", "last digit", "units digit", "5n - 3", "5n-3", "5n − 3"],
        },
        {
          point: "Square numbers can only end in 0, 1, 4, 5, 6 or 9 (checked by squaring 0 to 9)",
          keywords: ["0, 1, 4, 5, 6", "1, 4, 9, 6, 5", "squares end", "never end in 2", "never end in 7"],
        },
        {
          point: "Concludes no term can be square: going on forever does not mean every kind of number appears",
          keywords: ["never", "no term", "cannot", "can't", "not a square"],
        },
      ],
      commonError: "Checking the first few terms only. A proof must explain why *no* term, however far along, can be square.",
      difficulty: "challenge",
      guideRef: "is-it-a-term",
      hints: [
        "Look at the last digits of the terms. What do you notice?",
        "Now look at the last digits of the square numbers: {{1^2}}, {{2^2}}, …, {{9^2}}, {{10^2}}.",
        "Why is it enough to square 0 to 9 to know every possible last digit of a square?",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "sequences-graphs-p1-q20",
      question: "A function machine does '− 2', then '× 3'. For one input, the output is equal to the input. What is that input?",
      answer: { type: "number", value: 3 },
      traps: [
        {
          spec: { type: "number", value: 1 },
          feedback: "That works for '× 3, then − 2'. This machine subtracts first, so its output is 3(x − 2).",
        },
      ],
      solution: [
        "Call the input x. The output is 3(x − 2) = 3x − 6.",
        "Output = input: 3x − 6 = x.",
        "2x = 6, so x = 3.",
        "Check: 3 − 2 = 1, then 1 × 3 = 3 ✓",
      ],
      solutions: [
        {
          label: "Table of values",
          steps: [
            "Input 0 → −6, input 4 → 6, input 5 → 9: the output is behind at first, then ahead.",
            "Each +1 on the input adds 3 to the output, so the output gains 2 on the input every step. Starting 6 behind at 0, it catches up after 3 steps: input 3 → 3 ✓",
            "Algebra is quicker; the table shows *why* there is exactly one answer.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "functions",
      hints: [
        "Call the input x. Write the output in terms of x.",
        "The output is 3(x − 2). Set it equal to x.",
        "Solve 3x − 6 = x.",
      ],
      strategy: "Introduce a variable",
    },
  ],
};

// -------------------------------- paper 2 ----------------------------------

const paper2: Paper = {
  id: "sequences-graphs-p2",
  title: "Practice Paper 2",
  questions: [
    {
      kind: "short",
      id: "sequences-graphs-p2-q01",
      question: "Write down the next term of {{2/3}}, {{11/12}}, {{7/6}}, {{17/12}}, … Give your answer as a fraction in its simplest form.",
      answer: { type: "fraction", n: 5, d: 3, simplest: true, display: "{{5/3}} (or {{1 2/3}})" },
      solution: [
        "Write every term in twelfths: {{8/12}}, {{11/12}}, {{14/12}}, {{17/12}}.",
        "The rule is 'add {{3/12}}', which is 'add {{1/4}}'.",
        "Next term: {{20/12 = 5/3}} (or {{1 2/3}}).",
      ],
      commonError: "Comparing the numerators 2, 11, 7, 17 before giving the fractions a common denominator.",
      difficulty: "warmup",
      guideRef: "term-to-term",
      hints: ["Rewrite all the fractions with the same denominator.", "In twelfths the numerators are 8, 11, 14, 17."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q02",
      question: "The nth term of a sequence is 4(n − 3). Work out the 12th term.",
      answer: { type: "number", value: 36 },
      traps: [
        {
          spec: { type: "number", value: 45 },
          feedback: "That is 4 × 12 − 3. The bracket comes first: 12 − 3 = 9, then 4 × 9.",
        },
      ],
      solution: ["Bracket first: 12 − 3 = 9.", "4 × 9 = 36."],
      difficulty: "warmup",
      guideRef: "using-nth-term",
      hints: ["Substitute n = 12 and work out the bracket first."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q03",
      question: "A sequence has the term-to-term rule 'subtract 1.2'. The 4th term is 5. What is the 1st term?",
      answer: { type: "number", value: 8.6 },
      traps: [
        {
          spec: { type: "number", value: 1.4 },
          feedback: "You subtracted, but you are going *backwards*. Undo 'subtract 1.2' by adding 1.2.",
        },
        {
          spec: { type: "number", value: 9.8 },
          feedback: "From the 4th term back to the 1st is 3 steps, not 4.",
        },
      ],
      solution: [
        "Going backwards, use the inverse: add 1.2.",
        "3rd term 6.2, 2nd term 7.4, 1st term 8.6.",
        "Or in one go: 5 + 3 × 1.2 = 8.6.",
      ],
      difficulty: "warmup",
      guideRef: "term-to-term",
      hints: ["To go backwards, do the opposite of 'subtract 1.2'.", "How many steps back is the 1st term from the 4th?"],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q04",
      question: "Is 36 a square number, a triangular number, both, or neither? Type one word: square, triangular, both or neither.",
      answer: {
        type: "text",
        accept: ["both", "both square and triangular", "square and triangular", "triangular and square", "it is both"],
        display: "both",
      },
      traps: [
        {
          spec: { type: "text", accept: ["square"] },
          feedback: "36 = {{6^2}}, yes. But keep going: the triangular numbers are 1, 3, 6, 10, 15, 21, 28, 36, …",
        },
        {
          spec: { type: "text", accept: ["triangular"] },
          feedback: "36 is triangular, yes. But is it also a whole number times itself?",
        },
      ],
      solution: [
        "36 = 6 × 6, so it is a square number.",
        "Triangular numbers (add 2, then 3, then 4, …): 1, 3, 6, 10, 15, 21, 28, 36. So 36 is the 8th triangular number.",
        "36 is **both**. (It is the smallest number bigger than 1 that is both.)",
      ],
      difficulty: "warmup",
      guideRef: "special-sequences",
      hints: ["Is 36 a whole number times itself?", "List the triangular numbers by adding 2, 3, 4, … until you reach or pass 36."],
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q05",
      question: "A function machine does '+ 5', then '× 3'. What is the output when the input is −8?",
      answer: { type: "number", value: -9 },
      traps: [
        {
          spec: { type: "number", value: -19 },
          feedback: "You multiplied first. This machine adds 5 first: −8 + 5 = −3, then × 3.",
        },
      ],
      solution: ["−8 + 5 = −3.", "−3 × 3 = −9."],
      difficulty: "warmup",
      guideRef: "functions",
      hints: ["Follow the boxes in order. What is −8 + 5?"],
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q06",
      question: "Find the nth term of the sequence −7, −3, 1, 5, … (type an expression in n).",
      answer: { type: "expression", expr: "4n-11", display: "{{4n - 11}}" },
      traps: [
        {
          spec: { type: "expression", expr: "4n-3" },
          feedback: "Careful with negatives: the zero term is −7 − 4 = −11, not −3.",
        },
        {
          spec: { type: "expression", expr: "4n-7" },
          feedback: "Your rule gives −3 when n = 1. The constant is the zero term, one step *before* −7: −7 − 4 = −11.",
        },
      ],
      solution: [
        "Difference: −3 − (−7) = 4, so the rule starts 4n.",
        "Zero term: −7 − 4 = −11.",
        "nth term = 4n − 11.",
        "Check n = 4: 16 − 11 = 5 ✓",
      ],
      difficulty: "core",
      guideRef: "finding-nth-term",
      hints: [
        "What is the difference? Work out −3 − (−7).",
        "Step back one term from −7.",
        "−7 − 4 = −11. Put the pieces together.",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q07",
      question:
        "Grey tiles are laid in a row and surrounded by white tiles, as shown. Write an expression for the number of **white** tiles in pattern n (type an expression in n).",
      diagram: TILE_PATTERNS,
      answer: { type: "expression", expr: "2n+6", display: "{{2n + 6}}" },
      traps: [
        {
          spec: { type: "expression", expr: "2n+8" },
          feedback: "Your rule gives 10 white tiles for pattern 1. The zero term is 8 − 2 = 6.",
        },
        {
          spec: { type: "expression", expr: "8n" },
          feedback: "Pattern 2 does not have double the white tiles of pattern 1 (it has 10, not 16). The white tiles go up by 2 each time.",
        },
      ],
      solution: [
        "Count: pattern 1 has 8 white tiles, pattern 2 has 10, pattern 3 has 12.",
        "Difference 2; zero term 8 − 2 = 6.",
        "White tiles = 2n + 6.",
      ],
      solutions: [
        {
          label: "See it in the picture",
          steps: [
            "The top row and the bottom row each have n + 2 white tiles: 2(n + 2).",
            "There is 1 more white tile at each end of the grey row: + 2.",
            "Total: 2(n + 2) + 2 = 2n + 6. Seeing the structure explains *why* the rule works, not just that it fits.",
          ],
        },
      ],
      difficulty: "core",
      guideRef: "term-to-term",
      hints: [
        "Count the white tiles in each pattern.",
        "By how many do they go up each time? What would 'pattern 0' have?",
        "Or look at the picture: how many white tiles are in the top row of pattern n?",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q08",
      question: "A tiling design uses 2n + 6 white tiles for pattern n. Siti has 75 white tiles. What is the largest pattern number she can make?",
      answer: { type: "number", value: 34 },
      traps: [
        {
          spec: { type: "number", value: 35 },
          feedback: "Pattern 35 needs 2 × 35 + 6 = 76 white tiles, one more than Siti has. Round *down* here.",
        },
        {
          spec: { type: "number", value: 34.5 },
          feedback: "Pattern numbers are whole numbers. There is no pattern 34.5.",
        },
      ],
      solution: [
        "She needs 2n + 6 ≤ 75.",
        "2n ≤ 69, so n ≤ 34.5.",
        "The largest whole number is 34. Pattern 34 uses 74 tiles; pattern 35 would need 76.",
      ],
      difficulty: "core",
      guideRef: "is-it-a-term",
      hints: ["Solve 2n + 6 = 75 first.", "You get n = 34.5. Pattern numbers are whole numbers: should you round up or down?"],
      strategy: "Consider extremes",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q09",
      question: "The nth term of a sequence is {{n/(n + 1)}}. Write down the first three terms as fractions, in order.",
      answer: { type: "list", values: [0.5, 2 / 3, 0.75], ordered: true, display: "{{1/2}}, {{2/3}}, {{3/4}}" },
      traps: [
        {
          spec: { type: "list", values: [2, 1.5, 4 / 3], ordered: true },
          feedback: "Those are upside down. The top is n and the bottom is n + 1.",
        },
      ],
      solution: [
        "n = 1: {{1/(1 + 1) = 1/2}}.",
        "n = 2: {{2/(2 + 1) = 2/3}}.",
        "n = 3: {{3/(3 + 1) = 3/4}}.",
        "(The terms creep closer and closer to 1 but never reach it.)",
      ],
      commonError: "Substituting into the top only, or forgetting that the bottom is n + 1, not 1.",
      difficulty: "core",
      guideRef: "using-nth-term",
      hints: ["Substitute n = 1 into the top *and* the bottom.", "The top is n and the bottom is one more than n."],
    },
    {
      kind: "written",
      id: "sequences-graphs-p2-q10",
      question:
        "Aisha saves $50 in week 1, and each week she saves $10 more than the week before. Marcus saves $1 in week 1, and each week he saves double the week before.\n\nIn which week does Marcus first save more than Aisha *in that week*? Show your working, and explain why Marcus was bound to overtake Aisha eventually.",
      marks: 4,
      modelAnswer:
        "Aisha's amounts form an **arithmetic** sequence (add $10): 50, 60, 70, 80, 90, 100, 110, 120, … Marcus's form a **geometric** sequence (multiply by 2): 1, 2, 4, 8, 16, 32, 64, 128, … In week 7 Aisha saves $110 and Marcus $64; in week 8 Aisha saves $120 and Marcus $128. So **week 8** is the first week Marcus saves more. He was bound to overtake her because doubling adds more each week (his increase equals his whole amount, which keeps growing), while Aisha's increase is always just $10. From week 5 on his weekly increase is more than $10, so he gains on her every week after that.",
      markScheme: [
        {
          point: "Aisha's amounts are arithmetic: add $10 each week",
          keywords: ["arithmetic", "add 10", "+10", "adds 10", "10 more"],
        },
        {
          point: "Marcus's amounts are geometric: double each week",
          keywords: ["geometric", "double", "×2", "x2", "times 2", "multiply by 2"],
        },
        {
          point: "Week 8: Aisha $120, Marcus $128 (week 7: $110 and $64)",
          keywords: ["week 8", "128", "120"],
        },
        {
          point: "Doubling eventually overtakes adding: Marcus's increases keep growing while Aisha's stay at $10",
          keywords: ["overtake", "faster", "eventually", "keeps growing", "increase"],
        },
      ],
      commonError: "Comparing totals saved instead of the amounts saved in each week, or stopping at week 7.",
      difficulty: "core",
      guideRef: "special-sequences",
      hints: [
        "Make a table of weeks 1 to 8 for both people.",
        "Which sequence is arithmetic and which is geometric?",
        "Compare how much each person's amount *increases* by from one week to the next.",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q11",
      question: "A function machine does '× 3', then '+ 1', then '÷ 4'. The output is {{5/2}}. What was the input?",
      answer: { type: "number", value: 3 },
      traps: [
        {
          spec: { type: "number", value: 2.125 },
          feedback: "You ran the machine forwards on {{5/2}}. To find the input, undo each step, starting with the last.",
        },
      ],
      solution: [
        "Undo '÷ 4': {{5/2 * 4 = 10}}.",
        "Undo '+ 1': 10 − 1 = 9.",
        "Undo '× 3': 9 ÷ 3 = 3.",
        "Check: 3 × 3 + 1 = 10, and 10 ÷ 4 = {{5/2}} ✓",
      ],
      difficulty: "core",
      guideRef: "functions",
      hints: ["Which step must you undo first?", "Undo '÷ 4' by multiplying by 4. Then keep working backwards."],
      strategy: "Work backwards",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q12",
      question: "The nth term of a sequence is 200 − 7n. What is the first negative term of the sequence?",
      answer: { type: "number", value: -3 },
      traps: [
        {
          spec: { type: "number", value: 29 },
          feedback: "29 is the position. The question asks for the term: 200 − 7 × 29.",
        },
        {
          spec: { type: "number", value: 4 },
          feedback: "4 is the 28th term, but it is still positive. Go one more term.",
        },
      ],
      solution: [
        "The terms are negative when 200 − 7n < 0, that is when 7n > 200.",
        "n > 28.57…, so the first whole number that works is n = 29.",
        "29th term: 200 − 203 = −3.",
        "Check: the 28th term is 200 − 196 = 4, still positive ✓",
      ],
      difficulty: "core",
      guideRef: "is-it-a-term",
      hints: [
        "When does 200 − 7n become less than 0?",
        "Solve 7n = 200, then decide which whole number comes next.",
        "Work out the term at that position.",
      ],
      strategy: "Consider extremes",
    },
    {
      kind: "written",
      id: "sequences-graphs-p2-q13",
      question:
        "Arjun and Priya are each asked to continue the sequence 1, 2, 4, …\n\nArjun writes 1, 2, 4, 8, 16. Priya writes 1, 2, 4, 7, 11.\n\nExplain the rule each of them used. Who is right?",
      marks: 3,
      modelAnswer:
        "Arjun **multiplies by 2** each time: a geometric sequence with common ratio 2. Priya **adds 1, then 2, then 3, then 4**: the differences go up by 1 each time. Both rules fit 1, 2, 4, so **both are right**. Three terms on their own do not fix a sequence; to know which one is meant you need the rule itself, or more terms.",
      markScheme: [
        {
          point: "Arjun multiplies by 2 (doubles): geometric",
          keywords: ["double", "×2", "x2", "times 2", "multiply by 2", "multiplies by 2", "geometric"],
        },
        {
          point: "Priya adds 1, 2, 3, 4 (the differences go up by 1)",
          keywords: ["add 1", "adds 1", "differences", "add 3", "add 4", "increase by 1", "up by 1"],
        },
        {
          point: "Both are right: three terms are not enough to fix the rule, so you need the rule or more terms",
          keywords: ["both", "not enough", "more terms", "the rule", "either"],
        },
      ],
      difficulty: "core",
      guideRef: "special-sequences",
      hints: [
        "How could you get from 1 to 2 to 4 by multiplying?",
        "Work out the differences in Priya's sequence.",
        "Do both rules fit the three terms you were given?",
      ],
      strategy: "Find a pattern",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q14",
      question: "Find the nth term of the sequence 6, 5.5, 5, 4.5, … (type an expression in n).",
      answer: { type: "expression", expr: "6.5-0.5n", display: "{{6.5 - 0.5n}}" },
      traps: [
        {
          spec: { type: "expression", expr: "0.5n+5.5" },
          feedback: "The terms go *down*, so the coefficient of n is −0.5, not 0.5.",
        },
        {
          spec: { type: "expression", expr: "6-0.5n" },
          feedback: "Your rule gives 5.5 when n = 1. The constant is the zero term, one step *before* 6: 6 + 0.5 = 6.5.",
        },
      ],
      solution: [
        "Difference: 5.5 − 6 = −0.5, so the rule contains −0.5n.",
        "Zero term: 6 − (−0.5) = 6.5.",
        "nth term = 6.5 − 0.5n, which you could also write as {{(13 - n)/2}}.",
        "Check n = 4: 6.5 − 2 = 4.5 ✓",
      ],
      difficulty: "core",
      guideRef: "finding-nth-term",
      hints: [
        "What is the difference? Watch the sign.",
        "Step back one term from 6.",
        "nth term = (difference) × n + (zero term).",
      ],
      strategy: "Check by substituting",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q15",
      question: "**Stretch.** The nth term of a sequence is {{n^2 + 6}}. Which term of the sequence is equal to 150? (Give the position n.)",
      answer: { type: "number", value: 12 },
      traps: [
        {
          spec: { type: "number", value: 144 },
          feedback: "144 is {{n^2}}. Which positive whole number squared gives 144?",
        },
        {
          spec: { type: "number", value: 72 },
          feedback: "{{n^2}} means n × n, not 2 × n.",
        },
      ],
      solution: [
        "{{n^2 + 6 = 150}}, so {{n^2 = 144}}.",
        "n = 12 (positions are positive, so ignore −12).",
        "Check: {{12^2 + 6 = 150}} ✓",
      ],
      difficulty: "core",
      guideRef: "quadratic-sequences",
      hints: ["Set {{n^2 + 6}} equal to 150.", "Subtract 6, then undo the squaring."],
      strategy: "Use the inverse",
    },
    {
      kind: "written",
      id: "sequences-graphs-p2-q16",
      question:
        "Machine A does '× 4', then '+ 2'. Machine B does '+ 2', then '× 4'.\n\nZara says: 'They use the same operations, so there must be some input that gives the same output from both.' Is she right? Explain using algebra.",
      marks: 3,
      modelAnswer:
        "Call the input x. Machine A gives 4x + 2. Machine B gives 4(x + 2) = 4x + 8. For every input, B's output is exactly **6 more** than A's, so the outputs can never be equal. Zara is **wrong**: there is no such input. (Check with x = 1: A gives 6 and B gives 12.)",
      markScheme: [
        {
          point: "Machine A gives 4x + 2",
          keywords: ["4x + 2", "4x+2"],
        },
        {
          point: "Machine B gives 4(x + 2) = 4x + 8",
          keywords: ["4x + 8", "4x+8", "4(x + 2)", "4(x+2)"],
        },
        {
          point: "The outputs always differ by 6, so they are never equal: Zara is wrong",
          keywords: ["6 more", "differ by 6", "never", "always", "wrong", "no input"],
        },
      ],
      commonError: "Testing one or two inputs and concluding 'no' without explaining why it can never happen.",
      difficulty: "core",
      guideRef: "functions",
      hints: [
        "Call the input x. Write each machine's output as an expression.",
        "Expand Machine B's expression.",
        "Compare 4x + 2 with 4x + 8. What is the difference, and does it depend on x?",
      ],
      strategy: "Introduce a variable",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q17",
      question:
        "Marcus makes grids of squares that are 2 squares tall and n squares long from matchsticks, as shown. The n = 1 grid uses 7 matches, n = 2 uses 12 and n = 3 uses 17. He has 500 matchsticks. What is the longest grid he can make? (Give n.)",
      diagram: GRID_TWO_ROWS,
      answer: { type: "number", value: 99 },
      traps: [
        {
          spec: { type: "number", value: 100 },
          feedback: "n = 100 needs 5 × 100 + 2 = 502 matches, two more than Marcus has.",
        },
        {
          spec: { type: "number", value: 71 },
          feedback: "Each new column shares its left side with the column before, so it needs 5 new matches, not 7.",
        },
      ],
      solution: [
        "Each extra column adds 3 horizontal and 2 vertical matches: 5 more. So 7, 12, 17, … has nth term 5n + 2.",
        "5n + 2 ≤ 500 gives 5n ≤ 498, so n ≤ 99.6.",
        "The longest grid is n = 99 (it uses 497 matches).",
      ],
      solutions: [
        {
          label: "Count the matches by direction",
          steps: [
            "Horizontal: 3 rows of n matches = 3n.",
            "Vertical: n + 1 columns of 2 matches = 2n + 2.",
            "Total: 5n + 2. Counting by direction gives the formula straight from the picture, without a table, so it is the slicker way.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "term-to-term",
      hints: [
        "How many *new* matches does each extra column need?",
        "Find the nth term of 7, 12, 17, …",
        "Solve 5n + 2 ≤ 500 and choose a whole number.",
      ],
      strategy: "Draw a diagram",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q18",
      question: "In a linear sequence the 4th term is 6 and the 10th term is 9. Find the nth term (type an expression in n).",
      answer: { type: "expression", expr: "0.5n+4", display: "{{1/2 n + 4}} (or 0.5n + 4)" },
      traps: [
        {
          spec: { type: "expression", expr: "3n-6" },
          feedback: "From the 4th term to the 10th term is 6 steps, so each step is 3 ÷ 6, not 3.",
        },
        {
          spec: { type: "expression", expr: "0.5n+6" },
          feedback: "Your rule gives 8 for the 4th term. To find the zero term, step back 4 steps from the 4th term.",
        },
      ],
      solution: [
        "From the 4th term to the 10th term is 6 steps, and the terms rise by 9 − 6 = 3.",
        "So each step is 3 ÷ 6 = 0.5: the common difference is 0.5.",
        "The zero term is 4 steps before the 4th term: 6 − 4 × 0.5 = 4.",
        "nth term = 0.5n + 4. Check: 0.5 × 10 + 4 = 9 ✓",
      ],
      solutions: [
        {
          label: "Simultaneous equations",
          steps: [
            "Let the nth term be an + b.",
            "4a + b = 6 and 10a + b = 9.",
            "Subtract: 6a = 3, so a = 0.5, and then b = 4.",
            "Same answer. Counting steps is quicker in your head; the equations are safer if the numbers are awkward.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "finding-nth-term",
      hints: [
        "How many steps are there from the 4th term to the 10th term?",
        "The terms rise by 3 over those steps. How much is one step?",
        "The difference is 0.5. Now step back from the 4th term to the zero term.",
      ],
      strategy: "Make it simpler",
    },
    {
      kind: "written",
      id: "sequences-graphs-p2-q19",
      question:
        "Ravi adds pairs of consecutive terms of the sequence 5, 9, 13, 17, … (nth term 4n + 1).\n\nIs the total always, sometimes or never a multiple of 4? Prove your answer.",
      marks: 3,
      modelAnswer:
        "**Never.** Two consecutive terms are the nth and the (n + 1)th: 4n + 1 and 4(n + 1) + 1 = 4n + 5. Their total is 8n + 6 = 4(2n + 1) + 2, which is always 2 more than a multiple of 4, so it is never a multiple of 4. Examples agree: 5 + 9 = 14, 9 + 13 = 22 and 13 + 17 = 30 all leave remainder 2 when divided by 4.",
      markScheme: [
        {
          point: "Writes two consecutive terms as 4n + 1 and 4n + 5 (or 4(n + 1) + 1)",
          keywords: ["4n + 5", "4n+5", "4(n + 1) + 1", "4(n+1)+1", "n + 1", "n+1"],
        },
        {
          point: "Their total is 8n + 6",
          keywords: ["8n + 6", "8n+6"],
        },
        {
          point: "8n + 6 = 4(2n + 1) + 2 leaves remainder 2, so it is never a multiple of 4",
          keywords: ["never", "remainder 2", "4(2n + 1) + 2", "4(2n+1)+2", "2 more", "not a multiple"],
        },
      ],
      solutions: [
        {
          label: "Remainders only",
          steps: [
            "Every term leaves remainder 1 when divided by 4.",
            "So the total of any two terms leaves remainder 1 + 1 = 2.",
            "Remainder 2 means never a multiple of 4. This is slicker, and it proves more: it works for *any* two terms, not just consecutive ones.",
          ],
        },
      ],
      commonError: "Testing a few pairs and stopping. Examples suggest an answer; algebra proves it for every pair.",
      difficulty: "challenge",
      guideRef: "using-nth-term",
      hints: [
        "Try a few pairs: 5 + 9, 9 + 13, 13 + 17. Divide each total by 4.",
        "If one term is 4n + 1, what is the next term?",
        "Add the two expressions and write the total as (a multiple of 4) + something.",
      ],
      strategy: "Look for an invariant",
    },
    {
      kind: "short",
      id: "sequences-graphs-p2-q20",
      question:
        "**Stretch.** A function is {{f(x) = 2x + 3}}. Hana works out {{f(f(x))}}: she puts x into f, then puts the answer into f again. She gets 47. What was x?",
      answer: { type: "number", value: 9.5, display: "9.5 (or {{19/2}})" },
      traps: [
        {
          spec: { type: "number", value: 22 },
          feedback: "22 is f(x), the result after one go. Undo f once more: (22 − 3) ÷ 2.",
        },
        {
          spec: { type: "number", value: 97 },
          feedback: "That is f(47): you ran the function forwards. Work backwards instead.",
        },
      ],
      solution: [
        "The last step was f, and its output was 47. Undo f (subtract 3, then divide by 2): (47 − 3) ÷ 2 = 22. So f(x) = 22.",
        "Undo f again: (22 − 3) ÷ 2 = 9.5.",
        "Check: f(9.5) = 19 + 3 = 22 and f(22) = 44 + 3 = 47 ✓",
      ],
      solutions: [
        {
          label: "Build f(f(x)) first",
          steps: [
            "f(f(x)) = 2(2x + 3) + 3 = 4x + 9.",
            "4x + 9 = 47 gives 4x = 38, so x = 9.5.",
            "Working backwards is quicker here; building the formula is better if you need to try many inputs.",
          ],
        },
      ],
      difficulty: "challenge",
      guideRef: "functions",
      hints: [
        "The last thing that happened was f. What went into it to give 47?",
        "The inverse of f is 'subtract 3, then divide by 2'.",
        "Apply the inverse twice.",
      ],
      strategy: "Work backwards",
    },
  ],
};

// ------------------------------- challenge ---------------------------------

const challenge: Question[] = [
  {
    kind: "short",
    id: "sequences-graphs-ch-q01",
    question:
      "The numbers 4, x, 25 are the first three terms of a sequence. If the sequence is arithmetic, x = p. If the sequence is geometric with positive terms, x = q. Find p − q.",
    answer: { type: "number", value: 4.5, display: "4.5 (or {{9/2}})" },
    traps: [
      {
        spec: { type: "number", value: 14.5 },
        feedback: "14.5 is p. You still need q, and then p − q.",
      },
      {
        spec: { type: "number", value: 10 },
        feedback: "10 is q. You still need p, and then p − q.",
      },
    ],
    solution: [
      "Arithmetic: the gaps are equal, so x is halfway between 4 and 25: p = {{(4 + 25)/2}} = 14.5.",
      "Geometric: the ratios are equal, so {{x/4 = 25/x}}, which gives {{x^2 = 100}}. With positive terms, q = 10.",
      "p − q = 14.5 − 10 = 4.5.",
    ],
    solutions: [
      {
        label: "Two equal steps",
        steps: [
          "Arithmetic: two equal *added* steps take 4 to 25. The total rise is 21, so each step is 10.5 and p = 14.5.",
          "Geometric: two equal *multiplying* steps take 4 to 25. The total multiplier is {{25/4}}, so each step multiplies by {{sqrt(25/4) = 5/2}}, and q = {{4 * 5/2}} = 10.",
          "p − q = 4.5. Seeing both as 'two equal steps' is the slicker idea: adding steps for arithmetic, multiplying steps for geometric.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "special-sequences",
    hints: [
      "In an arithmetic sequence, where must the middle term sit between 4 and 25?",
      "In a geometric sequence the ratios are equal. Write that as an equation in x.",
      "{{x/4 = 25/x}} means x × x = 100.",
      "Now subtract: p − q.",
    ],
    strategy: "Introduce a variable",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q02",
    question: "The first three terms of a linear sequence are 2x + 1, 5x − 2 and 6x + 3. Find the 20th term of the sequence.",
    answer: { type: "number", value: 180 },
    traps: [
      {
        spec: { type: "number", value: 4 },
        feedback: "4 is the value of x. Now work out the terms and then the 20th term.",
      },
      {
        spec: { type: "number", value: 189 },
        feedback: "Check your count: the nth term is 9n, so the 20th term is 9 × 20. Starting at 9 and adding 20 steps lands on the 21st term.",
      },
    ],
    solution: [
      "In a linear sequence the gaps are equal: (5x − 2) − (2x + 1) = (6x + 3) − (5x − 2).",
      "So 3x − 3 = x + 5, giving 2x = 8 and x = 4.",
      "The terms are 9, 18, 27: difference 9 and zero term 0, so the nth term is 9n.",
      "20th term = 9 × 20 = 180.",
    ],
    solutions: [
      {
        label: "The middle term is the mean of its neighbours",
        steps: [
          "In a linear sequence, the middle one of three consecutive terms is the average of the other two.",
          "5x − 2 = {{((2x + 1) + (6x + 3))/2}} = 4x + 2, so x = 4.",
          "The terms are 9, 18, 27 and the 20th term is 180. Slightly slicker: one simpler equation.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "finding-nth-term",
    hints: [
      "What must be true about the gaps between terms in a linear sequence?",
      "Write expressions for the two gaps and set them equal.",
      "You should find x = 4. Write out the three terms.",
      "Find the nth term of 9, 18, 27, … and use n = 20.",
    ],
    strategy: "Introduce a variable",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q03",
    question:
      "In a sequence, every term after the second is the sum of the two terms before it. The 5th term is 23 and the 8th term is 97. What is the 1st term?",
    answer: { type: "number", value: 4 },
    traps: [
      {
        spec: { type: "number", value: 37 },
        feedback: "37 is the 6th term. Keep working backwards: each earlier term is a *difference* of two later ones.",
      },
      {
        spec: { type: "number", value: 5 },
        feedback: "5 is the 2nd term. One more step back: 1st term = 3rd term − 2nd term.",
      },
    ],
    solution: [
      "Let the 6th term be x. Then the 7th term is 23 + x and the 8th term is x + (23 + x) = 2x + 23.",
      "2x + 23 = 97, so x = 37.",
      "Now work backwards with 'earlier term = later term − the term just before it': 4th = 37 − 23 = 14, 3rd = 23 − 14 = 9, 2nd = 14 − 9 = 5, 1st = 9 − 5 = 4.",
      "Check: 4, 5, 9, 14, 23, 37, 60, 97 ✓",
    ],
    solutions: [
      {
        label: "Start from the first two terms",
        steps: [
          "Call them a and b: a, b, a + b, a + 2b, 2a + 3b, 3a + 5b, 5a + 8b, 8a + 13b.",
          "So 2a + 3b = 23 and 8a + 13b = 97.",
          "Multiply the first by 4: 8a + 12b = 92. Subtract: b = 5, then a = 4.",
          "This works, but naming the 6th term is slicker: one unknown instead of two.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "special-sequences",
    hints: [
      "You can't work backwards from 97 on its own, because you don't know the 7th term. What could you give a letter to?",
      "Call the 6th term x. Write the 7th and 8th terms in terms of x.",
      "Once you know the 6th term, earlier terms come from subtracting: the 4th term is the 6th minus the 5th.",
    ],
    strategy: "Work backwards",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q04",
    question: "In the sequence 1, 2, 2, 3, 3, 3, 4, 4, 4, 4, 5, … each whole number n appears n times in a row. What is the 100th term?",
    answer: { type: "number", value: 14 },
    traps: [
      {
        spec: { type: "number", value: 13 },
        feedback: "The last 13 is at position 1 + 2 + … + 13 = 91. Positions 92 to 105 are all 14.",
      },
      {
        spec: { type: "number", value: 10 },
        feedback: "The blocks get longer as you go, so it is not as simple as 100 ÷ 10 or {{sqrt(100)}}. Find where each block ends.",
      },
    ],
    solution: [
      "The last copy of n is at position 1 + 2 + … + n, the nth triangular number {{(n(n + 1))/2}}.",
      "{{(13 * 14)/2 = 91}} and {{(14 * 15)/2 = 105}}.",
      "So positions 92 to 105 are all 14, and the 100th term is 14.",
    ],
    solutions: [
      {
        label: "Estimate first",
        steps: [
          "The block of n's ends at roughly half of {{n^2}}.",
          "Half of {{n^2}} ≈ 100 means {{n^2}} ≈ 200, so n is about 14 (as {{14^2 = 196}}).",
          "Confirm exactly: the 14s fill positions 92 to 105 ✓. The estimate gets you close fast; the triangular numbers make it certain.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "special-sequences",
    hints: [
      "At which position is the last 1? The last 2? The last 3? The last 4?",
      "Those positions are 1, 3, 6, 10, … Do you recognise them?",
      "Find the triangular numbers either side of 100.",
    ],
    strategy: "Find a pattern",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q05",
    question:
      "Large triangles are made from matchsticks, as shown. Side 1 uses 3 matches, side 2 uses 9 and side 3 uses 18. How many matches are needed for a large triangle of side 10?",
    diagram: BIG_TRIANGLES,
    answer: { type: "number", value: 165 },
    traps: [
      {
        spec: { type: "number", value: 300 },
        feedback: "A side-10 triangle has 100 small triangles, but 3 × 100 counts every inside match twice, because each one is shared by two small triangles.",
      },
      {
        spec: { type: "number", value: 135 },
        feedback: "135 is the side-9 triangle. Check how many rows you have counted.",
      },
    ],
    solution: [
      "Look only at the small triangles that point **up**. Every match is a side of exactly one of them.",
      "The rows of a side-10 triangle hold 1, 2, 3, …, 10 upward triangles: 55 altogether.",
      "Matches = 3 × 55 = 165. (Check: side 3 has 1 + 2 + 3 = 6 upward triangles and 3 × 6 = 18 ✓)",
    ],
    solutions: [
      {
        label: "Count by direction",
        steps: [
          "Horizontal matches: the rows have 1, 2, 3, …, 10 of them, so 55 altogether.",
          "Turning the triangle round shows there are also 55 in each of the two sloping directions.",
          "3 × 55 = 165. Both methods use symmetry; the upward-triangle idea is the slickest because it needs no turning.",
        ],
      },
      {
        label: "Differences",
        steps: [
          "3, 9, 18, … rises by 6, 9, 12, … (3 × 2, 3 × 3, 3 × 4, …).",
          "Keep going: 30, 45, 63, 84, 108, 135, 165.",
          "Reliable but slow, and it doesn't explain *why* the numbers are 3 times the triangular numbers.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "term-to-term",
    hints: [
      "Check the given numbers by counting. Is there a smarter way than counting every match?",
      "Look only at the small triangles pointing **up**. Does every match belong to exactly one of them?",
      "How many upward triangles are in a side-10 triangle? The rows have 1, 2, 3, … of them.",
    ],
    strategy: "Use symmetry",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q06",
    question:
      "Hana's function machine doubles the input and then subtracts 6. She puts in 7, then feeds each output back in as the next input. How many times does the machine run before an output is greater than 1000 for the first time?",
    answer: { type: "number", value: 10 },
    traps: [
      {
        spec: { type: "number", value: 9 },
        feedback: "After 9 runs the output is 518, not yet above 1000.",
      },
      {
        spec: { type: "number", value: 1030 },
        feedback: "1030 is the output. The question asks how many times the machine runs.",
      },
    ],
    solution: [
      "Outputs: 8, 10, 14, 22, 38, 70, 134, 262, 518, 1030.",
      "Notice the distance from 6: 7 is 1 above 6, then the outputs are 2, 4, 8, 16, … above 6. The distance **doubles** every run.",
      "After k runs the output is 6 + {{2^k}}, so we need {{2^k}} > 994.",
      "{{2^9 = 512}} is too small and {{2^10 = 1024}} works, so the answer is 10 runs.",
    ],
    solutions: [
      {
        label: "Why 6 is special",
        steps: [
          "6 is a *fixed point*: 2 × 6 − 6 = 6, so 6 comes out unchanged.",
          "If the input is 6 + d, the output is 2(6 + d) − 6 = 6 + 2d: the distance from 6 doubles.",
          "So after k runs from 7 the output is 6 + {{2^k}}. This is the slick way: 'more than a million' would be just as quick ({{2^20}} is over a million, so 20 runs). Listing outputs is fine for 1000 but slow for bigger targets.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "functions",
    hints: [
      "Run the machine a few times and write down the outputs.",
      "Is there an input that comes out unchanged? Compare every output with that number.",
      "How far above 6 is each output? What happens to that distance each run?",
    ],
    strategy: "Look for an invariant",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q07",
    question:
      "A sequence starts with 2025. Each term after that is the sum of the squares of the digits of the term before. So the 2nd term is {{2^2 + 0^2 + 2^2 + 5^2 = 33}}. What is the 100th term?",
    answer: { type: "number", value: 4 },
    traps: [
      {
        spec: { type: "number", value: 20 },
        feedback: "So close: that is the 99th term. Recount where the 100th term falls in the cycle.",
      },
      {
        spec: { type: "number", value: 16 },
        feedback: "So close: that is the 101st term. Recount where the 100th term falls in the cycle.",
      },
    ],
    solution: [
      "Terms: 2025, 33, 18, 65, 61, 37, 58, 89, 145, 42, 20, 4, 16, 37, …",
      "The 14th term (37) repeats the 6th term, so from the 6th term on the sequence cycles every 8 terms: 37, 58, 89, 145, 42, 20, 4, 16.",
      "So the 6th, 14th, 22nd, …, 94th terms are all 37 (94 = 6 + 8 × 11).",
      "Count on from the 94th: 95th 58, 96th 89, 97th 145, 98th 42, 99th 20, 100th **4**.",
    ],
    solutions: [
      {
        label: "Use remainders",
        steps: [
          "The cycle starts at the 6th term and has length 8.",
          "100 − 6 = 94, and 94 = 8 × 11 + 6.",
          "So the 100th term is 6 places after a 37 in the cycle: 37 → 58 → 89 → 145 → 42 → 20 → 4. Quicker than counting on when the position is huge, like the 1000th term.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "term-to-term",
    hints: [
      "Work out the next twelve or so terms carefully.",
      "Watch for a number you've seen before. What must happen after that?",
      "The cycle has length 8 and starts at the 6th term. Which positions hold 37?",
    ],
    strategy: "Find a pattern",
  },
  {
    kind: "short",
    id: "sequences-graphs-ch-q08",
    question: "How many of the first 1000 terms of the sequence with nth term 3n + 1 are multiples of 7?",
    answer: { type: "number", value: 143 },
    traps: [
      {
        spec: { type: "number", value: 142 },
        feedback: "Check the ends. The positions are n = 2, 9, 16, …, 996. That is (996 − 2) ÷ 7 + 1 positions: don't forget the + 1.",
      },
      {
        spec: { type: "number", value: 428 },
        feedback: "That counts every multiple of 7 up to 3001, but only every third whole number is a term of 3n + 1.",
      },
    ],
    solution: [
      "List the start: 4, 7, 10, 13, 16, 19, 22, 25, 28, … The multiples of 7 are 7 (n = 2), 28 (n = 9), 49 (n = 16), …",
      "Why every 7 positions? Adding 7 to n adds 21 to the term, and 21 is a multiple of 7, so the pattern repeats every 7 positions.",
      "So the positions are 2, 9, 16, …, which has nth term 7k − 5. The largest one up to 1000 is 996 = 7 × 143 − 5.",
      "That is k = 1 to 143: **143** terms.",
    ],
    solutions: [
      {
        label: "Count the multiples of 7 that are terms",
        steps: [
          "The multiples of 7 in the sequence are 7, 28, 49, … (up in 21s), with nth term 21k − 14.",
          "The 1000th term of 3n + 1 is 3001, so we need 21k − 14 ≤ 3001, that is 21k ≤ 3015, so k ≤ 143.57…",
          "So there are 143. Both methods work; counting positions is a little slicker because the numbers stay small.",
        ],
      },
    ],
    difficulty: "challenge",
    guideRef: "is-it-a-term",
    hints: [
      "Write out the first 10 terms and circle the multiples of 7. At which positions are they?",
      "The positions go up in 7s. Why? What happens to the term when n increases by 7?",
      "Count the positions 2, 9, 16, … that are at most 1000. Watch the ends.",
    ],
    strategy: "Find a pattern",
  },
  {
    kind: "written",
    id: "sequences-graphs-ch-q09",
    question:
      "Always, sometimes or never true?\n\n'In a linear sequence, the sum of any three consecutive terms is three times the middle term.'\n\nProve your answer.",
    marks: 3,
    modelAnswer:
      "**Always true.** In a linear sequence consecutive terms differ by the same amount, d. Call the middle term m. Then the three terms are m − d, m and m + d. Their sum is (m − d) + m + (m + d) = 3m, because the −d and +d cancel. So the sum is always three times the middle term, whatever the sequence and wherever you start. (Example: 7 + 11 + 15 = 33 = 3 × 11. It works for decreasing sequences and fractional ones too.)",
    markScheme: [
      {
        point: "Writes three consecutive terms algebraically, e.g. m − d, m, m + d or a, a + d, a + 2d",
        keywords: ["m - d", "m + d", "m − d", "a + d", "a+d", "a + 2d", "a+2d"],
      },
      {
        point: "Shows the sum simplifies to 3m (or 3a + 3d = 3(a + d))",
        keywords: ["3m", "3a + 3d", "3a+3d", "3(a + d)", "3(a+d)", "cancel"],
      },
      {
        point: "Concludes it is always true, for any linear sequence (examples alone are not a proof)",
        keywords: ["always", "any", "every"],
      },
    ],
    solutions: [
      {
        label: "Balancing (no algebra)",
        steps: [
          "The first term is d less than the middle term and the last term is d more.",
          "Move d from the last term to the first: now all three equal the middle term.",
          "Moving an amount from one term to another doesn't change the total, so the sum is 3 × the middle term. This picture proof is slicker; the algebra is easier to write down convincingly.",
        ],
      },
    ],
    commonError: "Checking two or three examples and calling it a proof. Examples can only suggest; algebra shows it works every time.",
    difficulty: "challenge",
    guideRef: "finding-nth-term",
    hints: [
      "Test a few examples first, including a decreasing sequence and one with fractions.",
      "Call the middle term m and the common difference d. What are the terms either side of it?",
      "Add your three expressions. What happens to the d's?",
    ],
    strategy: "Introduce a variable",
  },
  {
    kind: "written",
    id: "sequences-graphs-ch-q10",
    question:
      "Jun works out the first ten terms of the sequence with nth term {{n^2 + n + 41}}: 43, 47, 53, 61, 71, 83, 97, 113, 131, 151. They are all prime, so he says: 'Every term of this sequence is prime.'\n\nExplain the flaw in Jun's reasoning, and show that he is wrong.",
    marks: 3,
    modelAnswer:
      "Checking examples, even lots of them, does not prove a statement about **every** term; a single counterexample is enough to disprove it. Try n = 41: every part is a multiple of 41, so {{41^2 + 41 + 41 = 41 * (41 + 1 + 1) = 41 * 43}} = 1763, which is not prime. (n = 40 also works: {{40^2 + 40 + 41 = 40 * 41 + 41 = 41 * 41}} = 1681.) So Jun is wrong. Amazingly, the terms are prime for n = 1 to 39, which is exactly why patterns need proof.",
    markScheme: [
      {
        point: "Checking some cases is not a proof; one counterexample disproves 'every'",
        keywords: ["not a proof", "counterexample", "only checked", "examples", "doesn't prove", "does not prove"],
      },
      {
        point: "Chooses n = 41 (or n = 40)",
        keywords: ["41", "40"],
      },
      {
        point: "Shows that term is not prime: 41 × 43 = 1763 (or 1681 = 41 × 41)",
        keywords: ["41 × 43", "41 x 43", "41*43", "1763", "1681", "divisible by 41", "41 × 41"],
      },
    ],
    solutions: [
      {
        label: "Use n = 40",
        steps: [
          "{{40^2 + 40 = 40 * 41}}, so {{40^2 + 40 + 41 = 40 * 41 + 41 = 41 * 41 = 1681}}.",
          "1681 is not prime. Both counterexamples work; n = 41 is slicker because the common factor 41 jumps out of every part.",
        ],
      },
    ],
    commonError: "Testing more and more values one by one instead of choosing n cleverly so that every part shares a factor.",
    difficulty: "challenge",
    guideRef: "quadratic-sequences",
    hints: [
      "Does checking ten examples prove something about *every* term?",
      "Look for a value of n that makes every part of {{n^2 + n + 41}} share a common factor.",
      "Try n = 41. What do {{41^2}}, 41 and 41 have in common?",
    ],
    strategy: "Find a counterexample",
  },
];

export const practice: TopicPractice = {
  quiz,
  papers: [paper1, paper2],
  challenge,
};
